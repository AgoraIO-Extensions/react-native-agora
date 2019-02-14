# Android 开发搭建指南

# Prerequisites
* Android SDK
* Android Studio

# Step 1. 新增 `AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

# Step 2. 在android目录里的`settings.gradle`新增`react-native-agora`的依赖管理
```groovy
include ':react-native-agora'
project(':react-native-agora').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-agora/android')
```

# 可以创建`local.properties`设置android sdk
```bash
cd android
echo "sdk.dir = <你的android目录>" > local.properties
```

# 当您在写混淆代码时，请在``添加以下代码 到 `android/proguard-rules.pro`
```java
-keep class io.agora.**{*;}
```

# 构建开发环境
```bash
react-native run-android
react-native log-android
```

# 开发环境打包
```bash
mkdir -p android/app/src/main/assets
curl "localhost:8081/index.bundle?platform=android&dev=false&minify=true" -o "android/app/src/main/assets/index.android.bundle"
cd android
./gradlew assembleRelease

```