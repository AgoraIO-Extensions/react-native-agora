# common.sh
#!/bin/bash

old_package_name='react-native-agora'
new_package_name='react-native-shenwang'

#iOS
old_native_sdk_iOS_rtc=AgoraRtcEngine_iOS
new_native_sdk_iOS_rtc=ShengwangRtcEngine_iOS
old_native_sdk_iOS_rtc_special=AgoraRtcEngine_Special_iOS
new_native_sdk_iOS_rtc_special=ShengwangRtcEngine_Special_iOS


#Android
old_native_sdk_android_rtc=io.agora.rtc:full-sdk
new_native_sdk_android_rtc=io.shengwang.rtc:full-sdk
old_native_sdk_android_rtc_special=io.agora.rtc:agora-special-full
new_native_sdk_android_rtc_special=io.shengwang.rtc:agora-special-full
old_native_sdk_android_rtc_screen=io.agora.rtc:full-screen-sharing
new_native_sdk_android_rtc_screen=io.shengwangw.rtc:full-screen-sharing
