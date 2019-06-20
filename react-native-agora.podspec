#
#  Be sure to run `pod spec lint react-native-agora.podspec' to ensure this is a
#  valid spec and to remove all comments including this before submitting the spec.
#
#  To learn more about Podspec attributes see http://docs.cocoapods.org/specification.html
#  To see working Podspecs in the CocoaPods repo see https://github.com/CocoaPods/Specs/
#
require 'json'

package = JSON.parse File.read File.join __dir__, "package.json"
Pod::Spec.new do |s|
  s.name         = package["name"]
  s.version      = package["version"]
  s.summary      = package["summary"]
  s.description  = package["description"]

  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["authors"]

  # ――― Platform Specifics ――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  If this Pod runs only on iOS or OS X, then specify the platform and
  #  the deployment target. You can optionally include the target after the platform.
  #

  s.platform     = :ios
  s.platform     = :ios, "5.0"

  #  When using multiple platforms
  # s.ios.deployment_target = "5.0"
  # s.osx.deployment_target = "10.7"
  # s.watchos.deployment_target = "2.0"
  # s.tvos.deployment_target = "9.0"


  # ――― Source Location ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  Specify the location from where the source should be retrieved.
  #  Supports git, hg, bzr, svn and HTTP.
  #

  #s.source       = { :http => "file:///./ios" }
  s.source        = { :git => package["repository"]["url"], :tag => "#{s.version}" }
  #s.source        = { :git => package["repository"]["url"] , :tag => "#{s.version}" }

  s.source_files  = "RCTAgora", "RCTAgora/**/*.{h,m}"
  # s.public_header_files = "Classes/**/*.h"


  # ――― Resources ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  A list of resources included with the Pod. These are copied into the
  #  target bundle with a build phase script. Anything else will be cleaned.
  #  You can preserve files from being cleaned, please don't preserve
  #  non-essential files like tests, examples and documentation.
  #

  # s.resource  = "icon.png"
  # s.resources = "Resources/*.png"

  # s.preserve_paths = "FilesToSave", "MoreFilesToSave"


  # ――― Project Linking ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  Link your library with frameworks, or libraries. Libraries do not include
  #  the lib prefix of their name.
  #

  # s.framework  = "SomeFramework"
  # s.frameworks = "SomeFramework", "AnotherFramework"

  # s.library   = "iconv"
  # s.libraries = "iconv", "xml2"


  # ――― Project Settings ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  If your library depends on compiler flags you can set them in the xcconfig hash
  #  where they will only apply to your library. If you depend on other Podspecs
  #  you can include multiple dependencies to ensure it works.

  # s.requires_arc = true
  s.subspec 'AgoraRtcCryptoLoader' do |sp|
    sp.source_files = './ios/RCTAgora/libs/AgoraRtcCryptoLoader.framework/**/*.{c,h,m,mm,S,cpp}'
    sp.vendored_libraries = 'libcrypto.a'
  end

  s.xcconfig = {
    "HEADER_SEARCH_PATHS" => [
      "$(SDKROOT)../../node_modules/react-native/React",
      "$(SDKROOT)../../ios/Pods"
    ]
  }
  s.dependency "AgoraRtcEngine_iOS", "2.4.0.1"
  s.dependency 'React'

end
