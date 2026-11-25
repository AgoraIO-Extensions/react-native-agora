require 'yaml'
require 'json'
require 'xcodeproj'

mode, app_root, report_root = ARGV
lock = YAML.load_file(File.join(app_root, 'ios/Podfile.lock'))
if mode == 'cocoapods'
  expected = %w[AgoraRtcEngine_Special_iOS AgoraIrisRTC_iOS]
  actual = lock.fetch('SPEC REPOS').fetch('https://download.agora.io/cocoapods/')
  raise 'SDKs resolved outside Agora CDN' unless (expected - actual).empty?
else
  entries = lock.fetch('PODS').map { |p| p.is_a?(Hash) ? p.keys.first : p }
  raise 'SPM path also installed Agora binary pods' if entries.any? { |p| p.start_with?('Agora') }
  project = Xcodeproj::Project.open(File.join(app_root, 'ios/Pods/Pods.xcodeproj'))
  packages = project.root_object.package_references.map do |ref|
    { url: ref.respond_to?(:repositoryURL) ? ref.repositoryURL : nil,
      requirement: ref.respond_to?(:requirement) ? ref.requirement : nil }
  end
  File.write(File.join(report_root, 'swift-packages.json'), JSON.pretty_generate(packages))
  raise 'Native RTC Swift package missing' unless packages.any? { |p| p[:url]&.include?('AgoraRtcEngine_iOS') }
  raise 'Iris Swift package missing' unless packages.any? { |p| p[:url]&.include?('react-native-agora') }
end
File.write(File.join(report_root, 'pod-origin.json'), JSON.pretty_generate(lock.fetch('SPEC REPOS')))
