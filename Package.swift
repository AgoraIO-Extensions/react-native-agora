// swift-tools-version:5.3

import PackageDescription

// The React Native bridge is autolinked through CocoaPods. This package supplies
// its Iris binary when the podspec's SPM mode is enabled.
let package = Package(
    name: "AgoraReactNativeIris",
    platforms: [.iOS("12.4")],
    products: [
        .library(name: "AgoraRtcWrapper", targets: ["AgoraRtcWrapper"])
    ],
    targets: [
        .binaryTarget(
            name: "AgoraRtcWrapper",
            url: "https://download.agora.io/sdk/release/AgoraIrisRTC_iOS-4.6.4-build.7.zip",
            checksum: "39ca1110275d831a0a2572eb05bde56818e6d7f4e07e61b9e705b2bc4d10f178"
        )
    ]
)
