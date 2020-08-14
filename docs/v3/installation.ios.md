# iOS Installation v3

## Prerequisites

* iOS SDK 9.0+
* Xcode
* Swift

## Step 1. Migrating to Swift.

We use Swift in the native module.

You should **create a swift file by Xcode** to make your project support swift.

[Apple Official Doc](https://developer.apple.com/documentation/swift/migrating_your_objective-c_code_to_swift)

## Step 2. Link the library.

### Using without CocoaPods.

Use `react-native link` to add the library to your project:

```shell script
react-native link react-native-agora
```

#### Download native SDK

We provide a shell script to help you download the correct version of SDK.

```shell script
cd node_modules/react-native-agora
sh ./install.sh
```

Then frameworks will be saved to this path:

```shell script
node_modules/react-native-agora/ios/RCTAgora/Libs/*.framework
```

You should **copy frameworks to your root project** and [embedding](https://developer.apple.com/library/archive/technotes/tn2435/_index.html#//apple_ref/doc/uid/DTS40017543-CH1-EMBED_IN_APP_SECTION) these because they are dynamic libraries.

### Using with CocoaPods. (**recommended**)

Install CocoaPods.

[CocoaPods Official Doc](https://guides.cocoapods.org/using/getting-started.html)

```shell script
cd ios
pod init
```

Setup your `Podfile` (found at `ios/Podfile` as below, replacing all references to `_YOUR_PROJECT_TARGET_` with your project target (it's the same as project name by default).

[CocoaPods Official Doc](https://guides.cocoapods.org/using/using-cocoapods.html)

```ruby
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target '_YOUR_PROJECT_TARGET_' do
  # Comment the next line if you don't want to use dynamic frameworks

  # https://reactnative.dev/docs/0.59/integration-with-existing-apps#configuring-cocoapods-dependencies
  # Your 'node_modules' directory is probably in the root of your project,
  # but if not, adjust the `:path` accordingly
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # needed for debugging
    # Add any other subspecs you want to use in your project
    'RCTActionSheet',
    'RCTAnimation',
    'RCTBlob',
    'RCTCameraRoll',
    'RCTGeolocation',
    'RCTImage',
    'RCTPushNotification',
    'RCTSettings',
    'RCTVibration',
    'RCTLinkingIOS',
  ], :modular_headers => true
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod "yoga", :path => "../node_modules/react-native/ReactCommon/yoga", :modular_headers => true
  
  # Third party deps podspec link
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec', :modular_headers => false
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec', :modular_headers => false
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec', :modular_headers => false

  # Pods for _YOUR_PROJECT_TARGET_
end

```

Use `react-native link` to add the library to your project:

```shell script
react-native link react-native-agora
```

Then run in the `ios` folder:

```shell script
pod install
```

Open the produced workspace file (`.xcworkspace`) in XCode to build your project.

## Step 3. App store submission.

The app's `Info.plist` file must contain `Privacy - Microphone Usage Description` and `Privacy - Camera Usage Description` with a user-facing purpose string explaining clearly and completely why your app needs the permission, otherwise Apple will reject your app submission.
