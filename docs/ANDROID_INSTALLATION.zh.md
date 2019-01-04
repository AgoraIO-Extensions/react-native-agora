# Android 开发搭建指南

# 环境准备
* Android SDK
* Android Studio

# Step 1. 新增 `AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

# 当您在写混淆代码时，请在``添加以下代码:
```script
    -keep class io.agora.**{*;}
```