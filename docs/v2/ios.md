# iOS Installation

# Prerequisites
* You should installed and linked `react-native-agora`
* Xcode 10.0+
* cocoapods

```bash
# installed ruby first then run it
gem install cocoapods
```

# Step 1. install pod dependencies
```bash
pod install
```

# Step 2. Open Workspace Project in Xcode  
Open `ios/projectName.xcworkspace` with XCode
![Step 2](./IOS_INSTALLATION/1.2_OpenProject.png)

# Step 3. Add RCTAgora to the Project Libraries folder
![Step 3.1](./IOS_INSTALLATION/1.3_Add_Files_To_Project.png)
![Step 3.2](./IOS_INSTALLATION/1.3.1_RCTAgora.png)

# Step 4. Add Linked Library to the xcode project
![Step 4.1](./IOS_INSTALLATION/1.4.1_SET_LINKED_LIBARIES.png)
![Step 4.2](./IOS_INSTALLATION/1.4.1_SET_LINKED_LIBARIES.png)
![Step 4.3](./IOS_INSTALLATION/1.4.2_SET_RCTAgora.a.png)

# Step 5. Set Framework and Libraries Search Paths
![Step 5.1](./IOS_INSTALLATION/1.5.1_Add_Framework_Search_Paths.png)
![Step 5.2](./IOS_INSTALLATION/1.5.2_Add_Library_Search_Paths.png)


# Step 6. build and run it with xcode

