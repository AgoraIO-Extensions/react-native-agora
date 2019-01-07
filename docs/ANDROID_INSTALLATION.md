# Android Installation

# Prerequisites
* Android SDK
* Android Studio

# Step 1. Add `AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

# Obfuscation Code Edit `android/proguard-rules.pro`
```java
-keep class io.agora.**{*;}
```