# iOS Installation v3

## Prerequisites

* iOS SDK 9.0+
* Xcode

## Step 1. Migrating to Swift.

We use Swift in the native module.

You should **create a swift file by Xcode** to make your project support swift.

[Apple Official Doc](https://developer.apple.com/documentation/swift/migrating_your_objective-c_code_to_swift)

## Step 2. Using CocoaPods.

Install CocoaPods.

[CocoaPod Official Doc](https://guides.cocoapods.org/using/getting-started.html)

```shell script
cd ios
pod init
```

Setup your `Podfile` (found at `ios/Podfile` as below, replacing all references to `_YOUR_PROJECT_TARGET_` with your project target (it's the same as project name by default).

[CocoaPod Official Doc](https://guides.cocoapods.org/using/using-cocoapods.html)

```ruby
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target '_YOUR_PROJECT_TARGET_' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for _YOUR_PROJECT_TARGET_
  pod "AgoraRtcEngine_iOS_Crypto", "3.0.0"

  target '_YOUR_PROJECT_TARGET_Tests' do
    inherit! :search_paths
    # Pods for testing
  end

end

target '_YOUR_PROJECT_TARGET_-tvOS' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for _YOUR_PROJECT_TARGET_-tvOS

  target '_YOUR_PROJECT_TARGET_-tvOSTests' do
    inherit! :search_paths
    # Pods for testing
  end

end
```

Then run in the `ios` folder:

```shell script
pod install
```

Open the produced workspace file (`.xcworkspace`) in XCode to build your project.

## Step 3. App store submission.

The app's `Info.plist` file must contain `Privacy - Microphone Usage Description` and `Privacy - Camera Usage Description` with a user-facing purpose string explaining clearly and completely why your app needs the permission, otherwise Apple will reject your app submission.


