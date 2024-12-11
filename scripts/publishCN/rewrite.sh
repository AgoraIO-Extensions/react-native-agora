#!/bin/bash
set -e
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/../..)

old_package_name='react-native-agora'
new_package_name='react-native-shenwang'

old_native_sdk_android_rtc='io.agora.rtc:full-sdk'
new_native_sdk_android_rtc='io.shengwang.rtc:full-sdk'
old_native_sdk_android_rtc_special='io.agora.rtc:agora-special-full'
new_native_sdk_android_rtc_special='io.shengwang.rtc:agora-special-full'
old_native_sdk_android_rtc_screen='io.agora.rtc:full-screen-sharing'
new_native_sdk_android_rtc_screen='io.shengwangw.rtc:full-screen-sharing'

old_native_sdk_iOS_rtc='AgoraRtcEngine_iOS'
new_native_sdk_iOS_rtc='AgoraRtcEngine_iOS'
old_native_sdk_iOS_rtc_special='AgoraRtcEngine_Special_iOS'
new_native_sdk_iOS_rtc_special='ShengwangRtcEngine_Special_iOS'

change_file=${PROJECT_ROOT}/react-native-agora.podspec
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
sed "s/${old_native_sdk_iOS_rtc}/${new_native_sdk_iOS_rtc}/g" ${change_file} > tmp && mv tmp ${change_file}
sed "s/${old_native_sdk_iOS_rtc_special}/${new_native_sdk_iOS_rtc_special}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

change_file=${PROJECT_ROOT}/android/build.gradle
sed "s/${old_native_sdk_android_rtc}/${new_native_sdk_android_rtc}/g" ${change_file} > tmp && mv tmp ${change_file}
sed "s/${old_native_sdk_android_rtc_special}/${new_native_sdk_android_rtc_special}/g" ${change_file} > tmp && mv tmp ${change_file}
sed "s/${old_native_sdk_android_rtc_screen}/${new_native_sdk_android_rtc_screen}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

change_file=${PROJECT_ROOT}/package.json
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

