# [中文版本](./README.zh.md)

# Android Setup

## Prerequisites
  * You should installed and linked `react-native-agora`
  * Android Studio
  * Android SDK
  * Reliable USB Cable
  * Android Device

## Build
  [More Android Setup details read the doc](../../docs/ANDROID_INSTALLATION.md)
  ```bash
  adb reverse tcp:8081 tcp:8081
  adb reverse tcp:8097 tcp:8097
  npm install
  npm run android
  ```

# iOS Setup

## Prerequisites
  * You should installed and linked `react-native-agora`
  * Xcode 10.0+
  * iOS Device
  * Reliable iOS Device Cable

## Build
  [More iOS Setup details read the doc](../../docs/IOS_INSTALLATION.md)
  ```bash
  npm install
  npm run ios
  ```