# react-native-agora

[![npm](https://img.shields.io/npm/v/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dm/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dt/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/l/react-native-agora.svg)](LICENSE)

[中文](README.zh.md)

This SDK takes advantage of React Native and Agora RTC Video SDK on Android && iOS.

## Community Contributor

The community developer [Syanbo](https://github.com/syanbo) developed 1.0 version React Native SDK based on the Agora Native SDK from 2016 to 2017. As the community's demand for React Native SDK keeps growing, Agora has achieved official cooperation with Syanbo, this project now is officially maintained by Agora. Thanks to Syanbo for his long-term contributions to React Native SDK.

## Release Note
[Changelog](CHANGELOG.md)

## Installation

### Installing (React Native >= 0.60.0)

Install `react-native-agora`(^3.0.0):

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

**_ IMPORTANT _**

[Native Modules are now Autolinked.](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md)

[Migrating to Swift.](https://github.com/AgoraIO-Community/react-native-agora/blob/master/docs/v3/installation.ios.md#step-1-migrating-to-swift)

### Installing (React Native == 0.59.x)

Install `react-native-agora`(^3.0.0):

```shell script
yarn add react-native-agora
```
or
```shell script
npm i --save react-native-agora
```

**_ IMPORTANT _**

[Android Installation](./docs/v3/installation.android.md)

[iOS Installation](./docs/v3/installation.ios.md)

### Installing (React Native <= 0.58.x)

**_ IMPORTANT _**

We no longer support, you can try the older version.

[Install `react-native-agora`(^1.0.0)](./docs/v1/README.md)

[Install `react-native-agora`(^2.0.0)](./docs/v2/README.md)

## General Usage

```javascript
import RtcEngine from 'react-native-agora';
RtcEngine.create('YOUR APP ID');
```
or
```javascript
const RtcEngine = require('react-native-agora');
RtcEngine.create('YOUR APP ID');
```

## Using TypeScript

We suggest you use TypeScript to develop, or use TypeScript eslint to lint your code.

* [Getting Started with TypeScript](https://reactnative.dev/docs/typescript#getting-started-with-typescript)
* [Adding TypeScript to an Existing Project](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project)

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

## API

* [React Native API](https://agoraio-community.github.io/react-native-agora/globals.html)
* [Android API](https://docs.agora.io/en/Video/API%20Reference/java/index.html)
* [iOS API](https://docs.agora.io/en/Video/API%20Reference/oc/docs/headers/Agora-Objective-C-API-Overview.html)

## Resources

* Complete [API Doc](https://docs.agora.io/en/) at the Developer Center
* [File bugs about this sample](https://github.com/AgoraIO-Community/react-native-agora/issues)
* [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
