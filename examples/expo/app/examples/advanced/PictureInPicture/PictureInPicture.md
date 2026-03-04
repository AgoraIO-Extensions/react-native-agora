# Picture-in-Picture (PiP)

## Overview

The Picture-in-Picture (PiP) feature allows you to display video content in a small floating window while users interact with other parts of your app. You can show local and remote video streams in the PiP window, or display your own custom UI content. This feature is supported on Android and iOS platforms.

## Features

- Custom control style for PiP window (iOS only)
- Automatic PiP mode activation when app goes to background
- Customizable PiP window size and aspect ratio
- Dynamic size/aspect ratio adjustment during active PiP mode
- Support for multiple video streams in PiP mode
- Custom content view integration with PiP window
- Flexible layout configuration for multiple video streams in PiP mode

## Platform Support

- iOS: 15.0 and above
- Android: 8.0 and above

## Integration Guide

### Android Setup

1. **Declare PiP Support in AndroidManifest.xml**

   > For detailed information, see [Add videos using picture-in-picture (PiP)](https://developer.android.com/develop/ui/views/picture-in-picture#declaring)

   ```xml
   <activity android:name=".MainActivity"
       android:supportsPictureInPicture="true"
       android:configChanges=
           "screenSize|smallestScreenSize|screenLayout|orientation"
       ...
   ```

   Example: [AndroidManifest.xml](../../../../android/app/src/main/AndroidManifest.xml#L25)

2. **Configure Main Activity**

   > According to the [Switch your activity to PiP](https://developer.android.com/develop/ui/views/picture-in-picture#pip_button), automatic PiP mode entry when the app goes to background is only supported on Android 12 and above. For earlier Android versions, you need to explicitly call `enterPictureInPictureMode()` in `onUserLeaveHint()`. This functionality is already implemented in `AgoraPIPActivity`, so you don't need to implement it yourself. However, if you want to customize the behavior, you can implement `AgoraPIPActivityProxy` interface and override its methods in your own activity.

   ```kotlin
   import io.agora.rtc.ng.react.AgoraPIPActivity

   class MainActivity: AgoraPIPActivity() {
       ...
   }
   ```

   Example: [MainActivity.kt](../../../../android/app/src/main/java/com/agorartcngexample/MainActivity.kt#L9)

### iOS Setup

1. **Configure Media Playback Capability**

   > For detailed information, see [Configuring your app for media playback](https://developer.apple.com/documentation/avfoundation/configuring-your-app-for-media-playback?language=objc)

   Steps in Xcode:

   1. Select your app's target and go to Signing & Capabilities tab
   2. Click + Capability button
   3. Add Background Modes capability
   4. Select "Audio, AirPlay, and Picture in Picture" under Background Modes

   Additional Resources:

   - [Background Execution Modes](https://developer.apple.com/documentation/xcode/configuring-background-execution-modes#Specify-the-background-modes-your-app-requires)
   - [Adding Capabilities](https://developer.apple.com/documentation/xcode/adding-capabilities-to-your-app#Add-a-capability)

2. **Camera Access in Multitasking Mode (Optional)**

   > Note: You can skip this step if your app doesn't require camera access during multitasking (for example, if you don't need to show the local video stream in the PiP window).

   > When your app enters a multitasking mode, you should have [com.apple.developer.avfoundation.multitasking-camera-access](https://developer.apple.com/documentation/BundleResources/Entitlements/com.apple.developer.avfoundation.multitasking-camera-access?language=objc) entitlement or set `multitaskingCameraAccessEnabled` to `true` of the capture session. Multitasking modes include Slide Over, Split View, and Picture in Picture (PiP).

   > To learn about best practices for using the camera while multitasking, see [Accessing the camera while multitasking on iPad](https://developer.apple.com/documentation/avkit/accessing-the-camera-while-multitasking-on-ipad?language=objc).

   Requirements:

   - iOS < 16: Requires [com.apple.developer.avfoundation.multitasking-camera-access](https://developer.apple.com/documentation/BundleResources/Entitlements/com.apple.developer.avfoundation.multitasking-camera-access?language=objc) entitlement
     - [Contact Apple](https://developer.apple.com/contact/request/multitasking-camera-access/) for permission
   - iOS ≥ 16: Set `multitaskingCameraAccessEnabled` to `true` in capture session (coming soon)

### React Native Implementation

> Complete example: [picture_in_picture.tsx](./PictureInPicture.tsx)

## Important Notes

1. **iOS User Initiation Requirement**

   > PiP must be initiated by user action on iOS. Programmatic or automatic activation may result in App Store rejection. See [Handle User-Initiated Requests](https://developer.apple.com/documentation/avkit/adopting-picture-in-picture-in-a-custom-player?language=objc#Handle-User-Initiated-Requests)

2. **Memory Management**

   - Always dispose `AgoraPipController` when no longer needed
   - Failure to dispose may result in memory leaks

3. **Control Styles (iOS)**
   - 0: All system controls (default)
   - 1: Hide forward/backward buttons
   - 2: Hide play/pause and progress bar (recommended for video conferencing)
   - 3: Hide all controls

## Known issues

[https://github.com/facebook/react-native/issues/50820](https://github.com/facebook/react-native/issues/50820)
