#
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html.
# Run `pod lib lint agora_rtc_engine.podspec` to validate before publishing.
#

Pod::Spec.new do |s|
  s.name             = 'AgoraRtcWrapper'
  s.version          = '3.8.201'
  s.summary          = 'AgoraRtcWrapper'
  s.description      = 'project.description'
  s.homepage         = 'https://www.agora.io/'
  s.license          = { :file => '../LICENSE' }
  s.author           = { 'Agora' => 'developer@agora.io' }
  s.source           = { :path => '.' }
  s.dependency 'AgoraRtcEngine_iOS_Beta', '4.0.0-beta.1'
  s.vendored_frameworks = 'AgoraRtcWrapper.xcframework'
end
