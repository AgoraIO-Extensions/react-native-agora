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
            url: "https://download.agora.io/sdk/release/AgoraIrisRTC_iOS2-4.6.2-build.1.zip",
            checksum: "eba8f9fc5b3d93d9d083d0c3f16e6c98fcd993e49989fb851e6df2941ca29825"
        )
    ]
)
