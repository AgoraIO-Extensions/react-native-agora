# [English](./README.md)

# Android环境搭建

## 依赖以下环境
  * linked `react-native-agora`
  * Android Studio
  * Android SDK
  * 可靠的USB数据线
  * Android 设备

## 构建步骤
  [详情请参阅文档](../../docs/ANDROID_INSTALLATION.zh.md)
  ```bash
  adb reverse tcp:8081 tcp:8081
  adb reverse tcp:8097 tcp:8097
  npm install
  npm run android
  ```

# iOS环境搭建

## 依赖以下环境
  * linked `react-native-agora`
  * Xcode 10.0+
  * iOS 设备
  * 可靠的苹果设备数据线

## 构建步骤
  [详情请参阅文档](../../docs/IOS_INSTALLATION.zh.md)
  ```bash
  npm install
  npm run ios
  ```