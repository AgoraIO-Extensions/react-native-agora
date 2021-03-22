# Android Installation v2

# Prerequisites
* Android SDK
* Android Studio

# Step 1. Add `AndroidManifest.xml`
```xml
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
```

# Step 2. Add `react-native-agora` to `settings.gradle`
```groovy
...
include ':react-native-agora'
project(':react-native-agora').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-agora/android')
```

# To set android sdk version Create `local.properties` in android root directory
```bash
cd android
echo "sdk.dir = <Your Local Android Path>" > local.properties
```

# For Obfuscation Code Edit `android/proguard-rules.pro`
```java
-keep class io.agora.**{*;}
```

# build for development
```bash
react-native run-android
react-native log-android
```

# build for Release
```bash
mkdir -p android/app/src/main/assets
curl "localhost:8081/index.bundle?platform=android&dev=false&minify=true" -o "android/app/src/main/assets/index.android.bundle"
cd android
./gradlew assembleRelease

```
