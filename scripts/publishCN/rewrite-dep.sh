#!/bin/bash
set -e
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/../..)
source ${PROJECT_ROOT}/scripts/publishCN/common.sh

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

