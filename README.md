> ⚠️ **Note**: To provide you with better and higher quality technical support services, we will no longer provide technical support through GitHub issues. If you need help, please contact us directly through [Agora Support](https://www.agora.io/en/customer-support/).

> NOTE: These sdk and samples only for the Agora Video 4.x APIs. For examples using previous releases please see the following branches:
>
> - [3.x](https://github.com/AgoraIO-Extensions/react-native-agora/tree/3.x)

# react-native-agora

[![npm](https://img.shields.io/npm/v/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dm/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dt/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/l/react-native-agora.svg)](LICENSE)

This SDK takes advantage of React Native and Agora RTC Video SDK on Android && iOS.

## Community Contributor

The community developer [Syanbo](https://github.com/syanbo) developed 1.0 version React Native SDK based on the Agora
Native SDK from 2016 to 2017. As the community's demand for React Native SDK keeps growing, Agora has achieved official
cooperation with Syanbo, this project now is officially maintained by Agora. Thanks to Syanbo for his long-term
contributions to React Native SDK.

## Release Note

[Changelog](CHANGELOG.md)

## Installation

### Installing (React Native >= 0.60.0)

Install `react-native-agora`(^4.0.0):

```shell script
yarn add react-native-agora
```

or

```shell script
npm i --save react-native-agora
```

### iOS dependency options

Both options below require `pod install`. CocoaPods builds the React Native
bridge from the installed npm package in `node_modules`; that local podspec
does not need to be published to CocoaPods Trunk. The option changes how the
Native RTC and Iris SDKs are resolved:

| Application configuration | Native RTC / Iris dependencies | Customer setup |
| --- | --- | --- |
| Default/static linkage, or RN without `spm_dependency` | CocoaPods from Agora's Specs CDN | Add the two Podfile sources below |
| RN 0.75+ with `USE_FRAMEWORKS=dynamic` | Swift Package Manager | Enable dynamic frameworks and add the SPM post-install hook below |

There is no Agora-specific mode switch. Applications already setting
`USE_FRAMEWORKS=dynamic` select SPM after upgrading and must configure its hook.

### iOS native dependencies through CocoaPods (default)

Add these sources at the **top level** of `ios/Podfile`, before the target blocks:

```ruby
source 'https://download.agora.io/cocoapods/'
source 'https://cdn.cocoapods.org/'
```

The first URL is Agora's public, self-hosted **Podspec index**, not an SDK ZIP
download URL. It supplies the Native/Iris podspecs and their SDK download
locations without publishing new versions to CocoaPods Trunk. Keep the official
CocoaPods source too, for other dependencies; declaring a custom source removes
the implicit official source. No Agora source login is required.

Then install:

```sh
cd ios
pod install --repo-update
```

The RN bridge declares the exact Native/Iris pod dependencies automatically.
There is no need to add them separately to the application's Podfile.

### iOS native dependencies through Swift Package Manager

For RN 0.75+ applications, make sure the Podfile honors `USE_FRAMEWORKS`. The
standard RN template normally already contains this at the top level:

```ruby
linkage = ENV['USE_FRAMEWORKS']
use_frameworks! :linkage => linkage.to_sym if linkage
```

In the existing `post_install` block, immediately **after** the existing
`react_native_post_install(...)` call, add:

```ruby
AgoraReactNativeSPM.post_install(installer)
```

This embeds the dynamic SDK frameworks on older RN versions. Newer versions
with built-in SPM framework embedding use that implementation instead.

Run this command for **every** install, including CI:

```sh
cd ios
USE_FRAMEWORKS=dynamic pod install
```

The environment setting selects the SPM path; a hard-coded
`use_frameworks! :linkage => :dynamic` without that setting does not select it.
The Agora Specs CDN source is not required for Native/Iris in this path, and
the Swift packages are registered automatically. The RN bridge and RN itself
still use CocoaPods; this is RN's `spm_dependency` integration.

### Pinned iOS SDK versions and upgrading

Both paths use the same special Native/Iris release:

| SDK | CocoaPods dependency from Agora's CDN | SPM dependency |
| --- | --- | --- |
| Native RTC 4.6.4.2 | `AgoraRtcEngine_Special_iOS` 4.6.4.2 | `AgoraRtcEngine_iOS` tag 4.6.4-rc.2 |
| Iris 4.6.4.2-build.1 | `AgoraIrisRTC_iOS` 4.6.4.2-build.1 | `AgoraRtcWrapper` binary 4.6.4.2-build.1 |

This upgrades the previous CocoaPods baseline of RTC 4.6.2.70 / Iris
4.6.2-build.1. When upgrading an existing CocoaPods installation, add the CDN
sources above and remove explicit old `AgoraVideo_Special_iOS` /
`AgoraIrisRTC_iOS2` declarations or duplicate manually installed Agora SDKs.
After upgrading the npm package, update the wrapper pod so CocoaPods can migrate
its Native/Iris dependencies to their new pod names:

```sh
cd ios
pod update react-native-agora
```

Commit the resulting `Podfile.lock` and regression-test the Native SDK upgrade.
If a screen-sharing extension declares its own Native pod, change it to
`AgoraRtcEngine_Special_iOS` 4.6.4.2 as well. When switching to SPM, remove direct
Agora SDK pod declarations so the same binaries are not installed twice.

The Iris Swift package comes from the matching `react-native-agora` release tag.
SPM mode therefore requires a release containing `Package.swift`; older tags do
not support it. `Package.swift` supplies Iris only and does not expose the React
Native bridge as a standalone Swift package.

When testing an unreleased commit, set `AGORA_SPM_REVISION` to the full commit
SHA containing its `Package.swift`. Omit this variable for released packages.

## General Usage

```typescript
import { createAgoraRtcEngine } from 'react-native-agora';

const engine = createAgoraRtcEngine();
engine.initialize({ appId: 'YOUR APP ID' });
```

or

```javascript
const createAgoraRtcEngine = require('react-native-agora');
const engine = createAgoraRtcEngine();
engine.initialize({ appId: 'YOUR APP ID' });
```

## Using TypeScript

We suggest you use TypeScript to develop, or use TypeScript eslint to lint your code.

- [Getting Started with TypeScript](https://reactnative.dev/docs/typescript#getting-started-with-typescript)
- [Adding TypeScript to an Existing Project](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project)

## Troubleshooting

### Pod install failed (React Native >= 0.62.0)

The error log:

```
[!] The 'xxx' target has libraries with conflicting names: libcrypto.a.
```

You should disable Flipper, you can found it in the Podfile, and comment the code about Flipper in AppDelegate.

```
  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable these next few lines.
  add_flipper_pods!
  post_install do |installer|
    flipper_post_install(installer)
  end
```

### RCT_EXTERN_MODULE Swift modules broken in Xcode 10.2

The error log:

```
Swift class extensions and categories on Swift classes are not allowed to have +load methods
```

Fixed in React Native 0.59.3.

Source: https://github.com/facebook/react-native/issues/24139

### XCode 11 Beta App Launch Crash

The error log:

```
Exception '*** -[__NSArrayM objectAtIndexedSubscript:]: index 1 beyond bounds [0 .. 0]' was thrown while invoking getCurrentAppState on target AppState with params (
2,
3
)
```

Fixed in React Native 0.59.9.

Source: https://github.com/facebook/react-native/issues/25154

### FOREGROUND_SERVICE_MEDIA_PROJECTION permission

If you are not using screen sharing feature in your app, you should exclude Screen Sharing extension as below:

```
// build.gradle (project-level)
signingConfigs{
 ....
}

configurations.configureEach {
    exclude group: "io.agora.rtc", module: "full-screen-sharing"
}
compileOptions{
 ...
}
```

## API

- [React Native API](https://api-ref.agora.io/en/video-sdk/react-native/4.x/API/rtc_api_overview_ng.html)
- [Android API](https://api-ref.agora.io/en/video-sdk/android/4.x/API/rtc_api_overview_ng.html)
- [iOS API](https://api-ref.agora.io/en/video-sdk/ios/4.x/API/rtc_api_overview_ng.html)

## Resources

- Complete [API Doc](https://docs.agora.io/en/) at the Developer Center
- [Changelog](CHANGELOG.md)
- [Release Notes](https://docs.agora.io/en/video-calling/reference/release-notes?platform=react-native)
- [File bugs about this sample](https://github.com/AgoraIO-Extensions/react-native-agora/issues)
- [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)
- [Picture in Picture](./example/src/examples/advanced/PictureInPicture/PictureInPicture.md)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
