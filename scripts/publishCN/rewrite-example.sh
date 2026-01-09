#!/bin/bash
set -e
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/../..)
. ${PROJECT_ROOT}/scripts/publishCN/common.sh

change_dir_legacy="${PROJECT_ROOT}/examples/legacy/src"
change_dir_expo="${PROJECT_ROOT}/examples/expo/app/examples"

find "$change_dir_legacy" -type f | while read -r file; do
    sed -i.bak "s/${old_package_name}/${new_package_name}/g" "$file"
    echo "Replaced in $file"
done

find "$change_dir_legacy" -name "*.bak" -type f -delete

echo "All replacements completed successfully, and backup files have been deleted."

change_file=${PROJECT_ROOT}/examples/legacy/ios/Podfile
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
sed "s/${old_native_sdk_iOS_rtc}/${new_native_sdk_iOS_rtc}/g" ${change_file} > tmp && mv tmp ${change_file}
sed "s/${old_native_sdk_iOS_rtc_special}/${new_native_sdk_iOS_rtc_special}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

change_file2=${PROJECT_ROOT}/examples/expo/ios/Podfile
sed "s/${old_package_name}/${new_package_name}/g" ${change_file2} > tmp && mv tmp ${change_file2}
sed "s/${old_native_sdk_iOS_rtc}/${new_native_sdk_iOS_rtc}/g" ${change_file2} > tmp && mv tmp ${change_file2}
sed "s/${old_native_sdk_iOS_rtc_special}/${new_native_sdk_iOS_rtc_special}/g" ${change_file2} > tmp && mv tmp ${change_file2}
echo "${change_file2} rewritten successfully"
