#!/usr/bin/env ruby
require 'logger'
require 'cocoapods'
require 'tmpdir'

ROOT = File.expand_path('..', __dir__)
require File.join(ROOT, 'node_modules/react-native/scripts/cocoapods/spm')

def install_modules_dependencies(spec)
  spec.dependency 'React-Core'
end

def spm_dependency(spec, **options)
  SPM.dependency(spec, **options)
end

def check(condition, message)
  raise message unless condition
end

original_linkage = ENV['USE_FRAMEWORKS']
original_revision = ENV.delete('AGORA_SPM_REVISION')
begin
  ENV.delete('USE_FRAMEWORKS')
  pods = Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  iris_pod = pods.dependencies.find { |dep| dep.name == 'AgoraIrisRTC_iOS' }
  rtc_pod = pods.dependencies.find { |dep| dep.name == 'AgoraRtcEngine_Special_iOS' }
  check(iris_pod && iris_pod.requirement.to_s == '= 4.6.4.2-build.1', 'Default Iris pod must match the SPM release')
  check(rtc_pod && rtc_pod.requirement.to_s == '= 4.6.4.2', 'Default RTC pod must match the SPM release')
  manifest = File.read(File.join(ROOT, 'Package.swift'))
  check(manifest.include?('AgoraIrisRTC_iOS-4.6.4.2-build.1.zip'), 'SPM Iris version must stay pinned')
  check(SPM.instance_variable_get(:@dependencies_by_pod).empty?, 'Default mode registered SPM packages')
  AgoraReactNativeSPM.post_install(nil)

  ENV['USE_FRAMEWORKS'] = 'static'
  static = Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  check(static.dependencies == pods.dependencies, 'Static linkage must use the same CocoaPods dependencies')
  check(SPM.instance_variable_get(:@dependencies_by_pod).empty?, 'Static linkage registered SPM packages')

  ENV['USE_FRAMEWORKS'] = 'dynamic'
  spec = Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  check(spec.dependencies.none? { |dep| dep.name.start_with?('Agora') }, 'SPM mode also installs Agora pods')
  dependencies = SPM.instance_variable_get(:@dependencies_by_pod).fetch(spec.name)
  check(dependencies.size == 2, 'Expected RTC and Iris Swift packages')
  rtc, iris = dependencies
  check(rtc[:requirement] == { kind: 'exactVersion', version: '4.6.4-rc.2' }, 'RTC version must stay pinned')
  check(rtc[:products].include?('RtcBasic') && rtc[:products].include?('ReplayKit'), 'RTC products missing')
  check(iris[:products] == ['AgoraRtcWrapper'], 'Iris product missing')
  check(iris[:requirement] == { kind: 'exactVersion', version: spec.version.to_s }, 'Iris package must match the npm release')
  check(!AgoraReactNativeSPM::RTC_FRAMEWORKS.include?('video_enc'), 'RTC 4.6.4-rc.2 has no standalone video_enc framework')

  ENV['AGORA_SPM_REVISION'] = '0123456789abcdef0123456789abcdef01234567'
  Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  revision = SPM.instance_variable_get(:@dependencies_by_pod).fetch(spec.name).last
  check(revision[:requirement] == { kind: 'revision', revision: ENV['AGORA_SPM_REVISION'] }, 'Development revision ignored')

  Dir.mktmpdir('agora-spm-uuid') do |dir|
    project = Pod::Project.new(File.join(dir, 'Pods.xcodeproj'))
    project.new_target(:framework, spec.name, :ios, '15.1')
    root = project.root_object
    collision = true
    project.define_singleton_method(:generate_uuid) do
      if collision
        collision = false
        root.uuid
      else
        super()
      end
    end
    SPM.apply_on_post_install(Struct.new(:pods_project).new(project))
    check(project.objects_by_uuid[root.uuid].equal?(root), 'SPM UUID collision overwrote the root project')
    project.save
    reloaded = Xcodeproj::Project.open(project.path)
    check(reloaded.root_object.isa == 'PBXProject', 'Generated Pods project cannot be reopened')
  end

  Dir.mktmpdir('agora-spm') do |dir|
    path = File.join(dir, 'frameworks.sh')
    File.write(path, "#!/bin/sh\nif [ \"${COCOAPODS_PARALLEL_CODE_SIGN}\" == \"true\" ]; then\n  wait\nfi\n")
    target = Struct.new(:pod_targets, :embed_frameworks_script_path).new([spec], path)
    installer = Struct.new(:aggregate_targets).new([target])
    AgoraReactNativeSPM.post_install(installer)
    script = File.read(path)
    check(script.include?('/AgoraRtcKit.framework') && script.include?('/AgoraRtcWrapper.framework'), 'Dynamic RTC/Iris embedding missing')
    check(script.include?('/aosl.framework'), 'Transitive infrastructure framework missing')
    check(system('bash', '-n', path), 'Invalid embed shell script')
    AgoraReactNativeSPM.post_install(installer)
    check(File.read(path) == script, 'Embedding must be idempotent')
    File.delete(path)
    begin
      AgoraReactNativeSPM.post_install(installer)
      raise 'Missing app embed phase was accepted'
    rescue RuntimeError => error
      check(error.message.include?('use_frameworks!'), 'Missing actionable framework linkage error')
    end
  end

  # Newer RN versions receive actual framework names, which differ from SPM product names.
  native_frameworks = []
  Object.send(:define_method, :spm_dependency) do |pod_spec, url:, requirement:, products:, embed_frameworks: products|
    native_frameworks << embed_frameworks
    SPM.dependency(pod_spec, url: url, requirement: requirement, products: products)
  end
  Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  check(native_frameworks == [AgoraReactNativeSPM::RTC_FRAMEWORKS, ['AgoraRtcWrapper']], 'Native RN embedding received product names instead of framework names')
  Dir.mktmpdir('agora-spm-signatures') do |dir|
    path = File.join(dir, 'frameworks.sh')
    File.write(path, "#!/bin/sh\n")
    target = Struct.new(:pod_targets, :embed_frameworks_script_path).new([spec], path)
    installer = Struct.new(:aggregate_targets).new([target])
    AgoraReactNativeSPM.post_install(installer)
    script = File.read(path)
    check(!script.include?('install_framework'), 'Native RN embedding was duplicated')
    signatures = %w[AgoraRtcKit.xcframework-ios.signature AgoraRtcWrapper.xcframework-ios-simulator.signature]
    signatures.each { |file| File.write(File.join(dir, file), 'signature') }
    unrelated = File.join(dir, 'OtherSDK.xcframework-ios.signature')
    File.write(unrelated, 'keep')
    check(system({ 'ACTION' => 'build', 'CONFIGURATION_BUILD_DIR' => dir }, 'bash', path), 'Signature script failed during build')
    check(signatures.all? { |file| File.file?(File.join(dir, file)) }, 'Normal build removed provenance')
    check(system({ 'ACTION' => 'install', 'CONFIGURATION_BUILD_DIR' => dir }, 'bash', path), 'Signature script failed during Archive')
    check(signatures.none? { |file| File.exist?(File.join(dir, file)) }, 'Duplicate Archive provenance remains')
    check(File.read(unrelated) == 'keep', 'Unrelated SDK provenance was removed')
    AgoraReactNativeSPM.post_install(installer)
    check(File.read(path) == script, 'Signature workaround must be idempotent')
  end

  Object.send(:remove_method, :spm_dependency)
  SPM.instance_variable_get(:@dependencies_by_pod).clear
  older_rn = Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  check(older_rn.dependencies == pods.dependencies, 'Older RN must fall back to the same CocoaPods dependencies')
  check(SPM.instance_variable_get(:@dependencies_by_pod).empty?, 'Older RN registered SPM packages')
  AgoraReactNativeSPM.post_install(nil)
  puts 'iOS SPM dependency checks passed'
ensure
  ENV['USE_FRAMEWORKS'] = original_linkage
  ENV['AGORA_SPM_REVISION'] = original_revision
end
