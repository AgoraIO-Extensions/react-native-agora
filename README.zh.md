# react-native-agora

[![npm](https://img.shields.io/npm/v/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dm/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dt/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/l/react-native-agora.svg)](LICENSE)

[English](README.md)

此 SDK 基于 React Native 和 Agora Android 和 iOS 的视频 SDK 实现。

## 社区贡献者

声网社区开发者 [Syanbo](https://github.com/syanbo) 于 2016 年 - 2017 年期间，基于声网 Native SDK 独自完成了最初的 1.0 版本 React Native SDK。随着社区对于 React Native SDK 的需求增长，声网官方与 Syanbo 达成正式合作关系，目前该项目由声网官方进行更新维护。感谢 Syanbo 对于该项目长期以来的贡献。

## 发版说明
[变更日志](CHANGELOG.md)

## 集成文档

### 安装在 (React Native >= 0.60.0)

安装 `react-native-agora`(^3.0.0)：

```shell script
yarn add react-native-agora
```
或者
```shell script
npm i --save react-native-agora
```

前往你的 **ios** 目录并执行:

```shell script
pod install
```

**_ 重要信息 _**

[原生模块现在已经是自动链接](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md)

[迁移至Swift](https://github.com/AgoraIO-Community/react-native-agora/blob/master/docs/v3/installation.ios.md#step-1-migrating-to-swift)

### 安装在 (React Native == 0.59.x)

安装 `react-native-agora`(^3.0.0)：

```shell script
yarn add react-native-agora
```
或者
```shell script
npm i --save react-native-agora
```

**_ 重要信息 _**

[Android 集成文档](./docs/v3/installation.android.md)

[iOS 集成文档](./docs/v3/installation.ios.md)

### 安装在 (React Native <= 0.58.x)

**_ 重要信息 _**

我们已经不再支持，你可以尝试老版本。

[安装 `react-native-agora`(^1.0.0)](./docs/v1/README.md)

[安装 `react-native-agora`(^2.0.0)](./docs/v2/README.md)

## 如何使用

```javascript
import RtcEngine from 'react-native-agora';
RtcEngine.create('YOUR APP ID');
```
或者
```javascript
const RtcEngine = require('react-native-agora');
RtcEngine.create('YOUR APP ID');
```

## 使用 TypeScript

我们建议你使用 TypeScript 进行开发，或者使用 TypeScript eslint 来检查你的代码。

* [快速开始 TypeScript](https://reactnative.dev/docs/typescript#getting-started-with-typescript)
* [将 TypeScript 添加至现有项目](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project)

## 常见错误

### Pod install 失败 (React Native >= 0.62.0) 

错误日志：

```
[!] The 'xxx' target has libraries with conflicting names: libcrypto.a.
```

你应该禁用 Flipper， 你可以在 Podfile 中找到它， 并且注释掉 AppDelegate 中有关 Flipper 的代码。

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

错误日志：

```
Swift class extensions and categories on Swift classes are not allowed to have +load methods
```

React Native 0.59.3 已修复。

参考：https://github.com/facebook/react-native/issues/24139

### XCode 11 Beta App Launch Crash

错误日志：

```
Exception '*** -[__NSArrayM objectAtIndexedSubscript:]: index 1 beyond bounds [0 .. 0]' was thrown while invoking getCurrentAppState on target AppState with params (
2,
3
)
```

React Native 0.59.9 已修复。

参考：https://github.com/facebook/react-native/issues/25154

## API文档

* [React Native API](https://agoraio-community.github.io/react-native-agora/globals.html)
* [Android API](https://docs.agora.io/en/Video/API%20Reference/java/index.html)
* [iOS API](https://docs.agora.io/en/Video/API%20Reference/oc/docs/headers/Agora-Objective-C-API-Overview.html)

## 资源

* 完整的 [API Doc](https://docs.agora.io/cn/) 在开发者中心
* [反馈问题](https://github.com/AgoraIO-Community/react-native-agora/issues)
* [React Native 快速开始](https://facebook.github.io/react-native/docs/getting-started.html)

许可证
--------

    Copyright (c) 2020 syanbo luxuhui
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
