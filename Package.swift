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
            url: "https://download.agora.io/sdk/release/AgoraIrisRTC_iOS-4.6.4.2-build.1.zip",
            checksum: "a2acafd2b1a0a6038b42e6e8e4d1e719ceeb3367deab5fb3bca57d1ceaf58b9c"
        )
    ]
)
