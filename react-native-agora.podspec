require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
    s.name           = "react-native-agora"
    s.version        = package["version"]
    s.summary        = package["description"]
    s.homepage       = package['homepage']
    s.license        = package['license']
    s.authors        = package["authors"]
    s.platform       = :ios, "9.0"
    s.static_framework = true
    s.swift_version = "5.0"

    s.source         = { :git => package["repository"]["url"] }
    s.source_files   = 'ios/RCTAgora/**/*.{h,m,swift}'

    s.dependency 'React'
    s.dependency "AgoraRtcEngine_iOS_Crypto", "3.0.1.1"
end
