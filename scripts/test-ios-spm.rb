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

original_mode = ENV['AGORA_USE_SPM']
original_revision = ENV.delete('AGORA_SPM_REVISION')
begin
  ENV.delete('AGORA_USE_SPM')
  pods = Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  check(pods.dependencies.map(&:name).include?('AgoraIrisRTC_iOS2'), 'Default Iris pod missing')
  check(pods.dependencies.map(&:name).include?('AgoraVideo_Special_iOS'), 'Default RTC pod missing')
  manifest = File.read(File.join(ROOT, 'Package.swift'))
  check(manifest.include?('AgoraIrisRTC_iOS-4.6.4-build.7.zip'), 'SPM Iris version must stay pinned')
  check(SPM.instance_variable_get(:@dependencies_by_pod).empty?, 'Default mode registered SPM packages')
  AgoraReactNativeSPM.post_install(nil)

  ENV['AGORA_USE_SPM'] = '1'
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
  AgoraReactNativeSPM.post_install(nil)

  Object.send(:remove_method, :spm_dependency)
  begin
    Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
    raise 'SPM mode accepted a React Native version without spm_dependency'
  rescue Pod::DSLError => error
    check(error.message.include?('React Native 0.75 or newer'), 'Missing actionable version error')
  end
  puts 'iOS SPM dependency checks passed'
ensure
  ENV['AGORA_USE_SPM'] = original_mode
  ENV['AGORA_SPM_REVISION'] = original_revision
end
