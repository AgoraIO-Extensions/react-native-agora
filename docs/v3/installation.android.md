# Android Installation v3

## Prerequisites

* Android SDK 28+
* Android Studio

## Step 1. Migrating to AndroidX.

We use Kotlin and AndroidX in the native module.

Android Studio -> Refactor -> Migrate to AndroidX... -> Migrate

[Google Official Doc](https://developer.android.com/jetpack/androidx/migrate)

## Step 2. Define the `react-native-agora` project in `android/settings.gradle`:

```groovy
...
include ':react-native-agora'
project(':react-native-agora').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-agora/android')
```

## Step 3. Add the `react-native-agora` as an dependency of your app in `android/app/build.gradle`:

```groovy
...
dependencies {
  ...
  implementation project(':react-native-agora')
}
```

## Step 4. If you've defined *[project-wide properties](https://developer.android.com/studio/build/gradle-tips.html)* (**recommended**) in your root `build.gradle`, this library will detect the presence of the following properties:

```groovy
buildscript {...}
allprojects {...}

/**
 * Project-wide Gradle configuration properties
 */
ext {
    compileSdkVersion = 28
    buildToolsVersion = "28.0.3"
    minSdkVersion = 16
    targetSdkVersion = 28
    kotlin_version = "1.3.72"
}
```
or do
```groovy
buildscript {
    ext {
        compileSdkVersion = 28
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        targetSdkVersion = 28
        kotlin_version = "1.3.72"
    }
}
...
```

## Step 5. Add `android:networkSecurityConfig` to your manifest file (`android/app/src/main/AndroidManifest.xml`):

```xml
<application android:networkSecurityConfig="@xml/network_security_config">
...
</application>
```

[Google Official Doc](https://developer.android.com/training/articles/security-config)

## Step 6. Add `import io.agora.rtc.react.RCTAgoraRtcPackage;` and `new RCTAgoraRtcPackage()` in your `MainApplication.java`:

```java
import io.agora.rtc.react.RCTAgoraRtcPackage;
...
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RCTAgoraRtcPackage()
        );
    }
```
