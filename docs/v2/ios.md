# iOS Installation

# Prerequisites
* You should installed and linked `react-native-agora`
* Xcode 10.0+
* cocoapods

```bash
# Use npm
npm install react-native-agora
```
or

```bash
# Use yarn
yarn add react-native-agora
```
then you need to link the library

```bash
# Link the library
react-native link react-native-agora
```


```bash
# installed ruby first then run it
gem install cocoapods
```

# Step 1. install pod dependencies
```bash
cd ios
pod install
```
pod install success will create `<projectName>`.xcworkspace file in ios folder.

# Step 2. Open the xcworkspace Project in Xcode  
Open `ios/projectName.xcworkspace` with XCode
![Step 2](./IOS_INSTALLATION/1.2_OpenProject.png)

# Step 3. Add RCTAgora to the Project Libraries folder
![Step 3.1](./IOS_INSTALLATION/1.3_Add_Files_To_Project.png)
![Step 3.2](./IOS_INSTALLATION/1.3.1_RCTAgora.png)
select the AgoraRtcEngineKit and re-added by below steps.
![Step 3.3](./IOS_INSTALLATION/1.3.3_UPDATE_RCTAgora_AgoraRtcEngineKit_Framework.png)
![Step 3.4](./IOS_INSTALLATION/1.3.4_SELECT_AgoraRtcEngineKit_from_iOS_Pods_folder.png)
![Step 3.5](./IOS_INSTALLATION/1.3.5_DRAG_IT_INTO_Link_Binary_With_Libraries.png)

# Step 4. Only Add Linked Library to the xcode project
![Step 4.3](./IOS_INSTALLATION/1.4.1_SET_RCTAgora.a.png)

# Step 5. build and run it with xcode
