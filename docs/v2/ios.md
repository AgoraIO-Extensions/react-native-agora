# React native Agora iOS Installation
#### Minimum compatibility
* React native 0.58.x
* IOS SDK 8.0+
* Android 5.0+ x86 arm64 armv7a

#### 1. open up your terminal and write this :
When it comes to the version nr you can put any version you like as long as it it compatibility
```sh
$ react-native init agoraguide --version react-native@0.58
```

#### 2. cd into your project folder
```sh
$ cd agoraguide
```
#### 3. install npm package react-native-agora

with npm


```sh
$ npm install --save react-native-agora
```

or yarn

```sh
$ yarn add react-native-agora
```


#### 5. cd into your ios folder
```sh
$ cd ios
```

#### 6. we need to initialize pod
if you don't have cocopods installed run this command in your terminal
```sh
$ sudo gem install Cocoapods
```
after you have installed Cocopods run this command inside of your ios folder
```sh
$ pod init
```
and then we need to install the pods
```sh
$ pod install
```
if you get a error from Cocopods saying something like this :
![Step 6](./IOS_INSTALLATION/06.png)
then you need to open up your "Podfile" and remove the part that is blue marked in the picture below

#### *before*
![Step 6](./IOS_INSTALLATION/06a.png)

#### *after*
![Step 6](./IOS_INSTALLATION/06b.png)

we need to add this code at the bottom to our pod file
```sh
post_install do |installer|
  installer.pods_project.targets.each do |target|

    # The following is needed to ensure the "archive" step works in XCode.
    # It removes React & Yoga from the Pods project, as it is already included in the main project.
    # Without this, you'd see errors when you archive like:
    # "Multiple commands produce ... libReact.a"
    # "Multiple commands produce ... libyoga.a"

    targets_to_ignore = %w(React yoga)
    
    if targets_to_ignore.include? target.name
      target.remove_from_project
    end

  end
end
```
This is how your podfile should look like
![Step 6](./IOS_INSTALLATION/06c.png)
after that you can run this command again
```sh
$ pod install
```

#### 7. Open up your xcode project *[project name].xcworkspace* inside in ios folder
![Step 7](./IOS_INSTALLATION/07.png)

#### 8. expand your project folder and right click on the *"Libraries"* folder and choose *"add files to [project name]"*
![Step 8](./IOS_INSTALLATION/08.png)

#### 9. follow the image below to find the RCTAgora lib

![Step 9](./IOS_INSTALLATION/09a.png)
the path is  node_modules => react-native-agora => ios => RCTAgora.xcodeproj

make sure you check so that those are checked

![Step 9](./IOS_INSTALLATION/09b.png)

If the file is greyed out it means you already have it inside of you library folder.
Check so that RCTAgora.xcodeproj are inside of your "Libraries" folder
![Step 9](./IOS_INSTALLATION/09c.png)

#### 10. we need to add the framework
expand your "Frameworks" folder and you should see the "AgoraRtcEngineKit.framework" are red.
![Step 10](./IOS_INSTALLATION/10a.png)
right click and delete that
Left click on your "RCTAgora.xcodeproj" and clöick on "Build Phases"
![Step 10](./IOS_INSTALLATION/10b.png)
left click on the "AgoraRtcEngineKit.framework" in the list and click on the "-"(minus sign) to remove it from the list.
![Step 10](./IOS_INSTALLATION/10c.png)
then click on the "+"(plus sign) so that we can add the framework.
Click on the "Add other..." button
![Step 10](./IOS_INSTALLATION/10d.png)
then we need to navigate and find our framwork
![Step 10](./IOS_INSTALLATION/10e.png)
the path is : ios => Pods => AgoraRtcEngine_iOS => AgoraRtcEngineKit.framework and click on "add"

#### 11. at last we need to link the library
click on your project on the left and then click on "Build Phases" and then expand "Link Binary With Libraries" and then click on the "+"(plug sign)
![Step 11](./IOS_INSTALLATION/11.png)
Search for libRCTAGora and click on add
![Step 11](./IOS_INSTALLATION/12.png)
if you cant find it in your list check so that you dont already have it

----------------------------------------------
### Troubleshooting

if you get some errors like the pictures below
![Step t1](./IOS_INSTALLATION/t01.png)
![Step t2](./IOS_INSTALLATION/t02.png)

the chances are that you have some framework that already have imported time.h something like firestore.

Expand your "Libraries" and then click on "RCTAgora.xcodeproj". Then click on "Build settings" and search for "Header search paths" 
![Step t3](./IOS_INSTALLATION/t03.png)
Doubble click on the path
![Step t4](./IOS_INSTALLATION/t04.png)
and change the Pods path from "recursive" to non-recursive
![Step t5](./IOS_INSTALLATION/t05.png)






