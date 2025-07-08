> NOTE: These sdk and samples only for the Agora Video 4.x APIs. For examples using previous releases please see the following branches:
>
> - [3.x](https://github.com/AgoraIO-Extensions/react-native-agora/tree/3.x)

> To improve our support and provide better responses to your questions, we have migrated GitHub issues to [Agora Support](https://agoraio.zendesk.com/hc/en-us/)
> If you encounter any problems, please submit your issues through this new support platform.

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

Go to your **ios** folder and run:

```shell script
pod install
```

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
