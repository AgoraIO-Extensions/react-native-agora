# iOS 开发搭建指南

# 环境
* 请先在项目里安装 `react-native-agora` & `react-native link react-native-agora`
* Xcode 10.0+
* 安装cocoapods

```bash
# 需要首先安装好ruby
gem install cocoapods
```

# Step 1. 首先安装
```bash
pod install
```

# Step 2. 使用xcode开启项目  
打开 `ios/projectName.xcworkspace`
![Step 2](./IOS_INSTALLATION/1.2_OpenProject.png)

# Step 3. 在项目里新增RCTAgora项目到Libraries目录里
![Step 3.1](./IOS_INSTALLATION/1.3_Add_Files_To_Project.png)
![Step 3.2](./IOS_INSTALLATION/1.3.1_RCTAgora.png)
根据以下的步骤。重新加载RCTAgora里面的AgoraRtcEngineKit。
![Step 3.3](./IOS_INSTALLATION/1.3.3_UPDATE_RCTAgora_AgoraRtcEngineKit_Framework.png)
![Step 3.4](./IOS_INSTALLATION/1.3.4_SELECT_AgoraRtcEngineKit_from_iOS_Pods_folder.png)
![Step 3.5](./IOS_INSTALLATION/1.3.5_DRAG_IT_INTO_Link_Binary_With_Libraries.png)

# Step 4. 把RCTAgora.a 添加到linked libraries里
![Step 4.3](./IOS_INSTALLATION/1.4.1_SET_RCTAgora.a.png)

# Step 5. xcode 编译并运行

