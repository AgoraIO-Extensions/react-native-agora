# iOS Installation

# Prerequisites
* You should installed and linked `react-native-agora`
* Xcode 10.0+

# Step 1. Open Project in Xcode
Open `ios/projectName.xcodeproj` with XCode
![Step 1](./IOS_INSTALLATION/1.1_Open_iOS_ProjectFile.png)
# Step 2. Add Link Binary With Libraries 
Build Phases -> Link Binary With Libraries -> +
![Step 2](./IOS_INSTALLATION/1.2_LinkBinaryWithLibraries.png)

    libresolv.tbd
    libc++.tbd
    AVFoundation.framework
    AudioToolbox.framework
    VideoToolbox.framework
    CoreMotion.framework
    CoreMedia.framework
    CoreTelephony.framework


# Step 3. Add Other Link Binary With Libraries From `node_modules`
Build Phases -> Link Binary With Libraries -> + -> Add Other
![Step 3](./IOS_INSTALLATION/1.3_Add_Other_Libraries.png)

    node_modules/react-native-agora/ios/RCTAgora/libs/libcrypto.a
    node_modules/react-native-agora/ios/RCTAgora/libs/AgoraRtcCryptoLoader.framework
    node_modules/react-native-agora/ios/RCTAgora/libs/AgoraRtcEngineKit.framework


# Step 4. Add Framework Search Paths
Build Settings -> Framework Search Paths -> + 
![Step 4](./IOS_INSTALLATION/1.4_Add_Framework_Search_Paths.png)
"$(SRCROOT)/../node_modules/react-native-agora/ios/RCTAgora/libs"


# Step 5. Add Library Search Paths
Build Settings -> Library Search Paths -> + 
![Step 5](./IOS_INSTALLATION/1.5_Add_Library_Search_Paths.png)

"$(SRCROOT)/../node_modules/react-native-agora/ios/RCTAgora/libs"


# Step 6. Set Build Settings Enable Bitcode No
Build Settings -> Enable Bitcode -> ...
![Step 6](./IOS_INSTALLATION/1.6_Set_Build_Settings_Enable_Bitcode_No.png)

# Step 7. Set Capabilities Background Modes
Capabilities -> Background Modes -> Audio, Airplay, and Picture in Picture
![Step 7](./IOS_INSTALLATION/1.7_Set_Capabilities_Background_Modes.png)

# Step 8.1 Set info.plist
Change info.plist  
"Privacy - Camera Usage Description":"use camera to start video call"  
"Privacy - Microphone Usage Description":"use microphone to start video call"  

![Step 8.1](./IOS_INSTALLATION/1.8.1_Set_info_plist.png)

![Step 8.2](./IOS_INSTALLATION/1.8.2_Set_camera_and_microphone.png)