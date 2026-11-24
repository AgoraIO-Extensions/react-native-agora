#!/usr/bin/env ruby
require 'cocoapods'

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
  iris_pod = pods.dependencies.find { |dep| dep.name == 'AgoraIrisRTC_iOS2' }
  iris_version = iris_pod.requirement.requirements.first.last.to_s
  check(File.read(File.join(ROOT, 'Package.swift')).include?("#{iris_pod.name}-#{iris_version}.zip"), 'SPM and CocoaPods Iris binaries differ')
  check(SPM.instance_variable_get(:@dependencies_by_pod).empty?, 'Default mode registered SPM packages')

  ENV['AGORA_USE_SPM'] = '1'
  spec = Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  check(spec.dependencies.none? { |dep| dep.name.start_with?('Agora') }, 'SPM mode also installs Agora pods')
  dependencies = SPM.instance_variable_get(:@dependencies_by_pod).fetch(spec.name)
  check(dependencies.size == 2, 'Expected RTC and Iris Swift packages')
  rtc, iris = dependencies
  check(rtc[:requirement] == { kind: 'exactVersion', version: '4.6.2' }, 'RTC version must stay pinned')
  check(rtc[:products].include?('RtcBasic') && rtc[:products].include?('ReplayKit'), 'RTC products missing')
  check(iris[:products] == ['AgoraRtcWrapper'], 'Iris product missing')
  check(iris[:requirement] == { kind: 'exactVersion', version: spec.version.to_s }, 'Iris package must match the npm release')

  ENV['AGORA_SPM_REVISION'] = '0123456789abcdef0123456789abcdef01234567'
  Pod::Specification.from_file(File.join(ROOT, 'react-native-agora.podspec'))
  revision = SPM.instance_variable_get(:@dependencies_by_pod).fetch(spec.name).last
  check(revision[:requirement] == { kind: 'revision', revision: ENV['AGORA_SPM_REVISION'] }, 'Development revision ignored')

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
