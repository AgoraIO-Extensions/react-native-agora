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
## Build Signed App
### Generate keystore file.

  ```bash
    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
  ```
### Edit android/app/build.gradle

  ```java
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
  ```

### Edit android/gradle.properties

  ```
  MYAPP_RELEASE_STORE_FILE=my-release-key.keystore # your keystore file name
  MYAPP_RELEASE_KEY_ALIAS=my-key-alias # key alias
  MYAPP_RELEASE_STORE_PASSWORD=****** # password
  MYAPP_RELEASE_KEY_PASSWORD=****** # password confirm
  ```

### Build
  ```
  npm run build-android
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
