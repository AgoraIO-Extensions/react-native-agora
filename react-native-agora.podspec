require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
    s.name           = "react-native-agora"
    s.version        = package["version"]
    s.summary        = package["description"]
    s.homepage       = package['homepage']
    s.license        = package['license']
    s.authors        = package["authors"]
    s.platform       = :ios, "7.0"

    s.source         = { :git => package["repository"]["url"] }
    s.source_files   = 'ios/RCTAgora/*.{h,m}'

    s.subspec 'AgoraRtcCryptoLoader' do |sp|
        sp.source_files = './ios/RCTAgora/libs/AgoraRtcCryptoLoader.framework/**/*.{c,h,m,mm,S,cpp}'
        sp.vendored_libraries = 'libcrypto.a'
    end
      
    s.dependency 'React'
    s.dependency "AgoraRtcEngine_iOS", "2.4.1"
end