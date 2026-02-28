#!/bin/bash
set -e
export LC_ALL=C
export LANG=C
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/../..)
. ${PROJECT_ROOT}/scripts/publishCN/common.sh

change_dir_legacy="${PROJECT_ROOT}/examples/legacy/src"
change_dir_expo="${PROJECT_ROOT}/examples/expo/app"
change_dir_expo2="${PROJECT_ROOT}/examples/expo/src"

# echo "Remove expo example podfile.lock"
# rm -rf "${PROJECT_ROOT}/examples/expo/ios/Podfile.lock"

# find "$change_dir_legacy" -type f | while read -r file; do
#     sed -i.bak "s/${old_package_name}/${new_package_name}/g" "$file"
#     echo "Replaced in $file"
# done

# find "$change_dir_legacy" -name "*.bak" -type f -delete

# echo "All replacements completed successfully, and backup files have been deleted."

find "$change_dir_expo" -type f | while read -r file; do
    sed -i.bak "s/${old_package_name}/${new_package_name}/g" "$file"
    echo "Replaced in $file"
done

find "$change_dir_expo" -name "*.bak" -type f -delete

echo "All replacements completed successfully, and backup files have been deleted."

find "$change_dir_expo2" -type f | while read -r file; do
    sed -i.bak "s/${old_package_name}/${new_package_name}/g" "$file"
    echo "Replaced in $file"
done

find "$change_dir_expo2" -name "*.bak" -type f -delete

echo "All replacements completed successfully, and backup files have been deleted."


# change_file=${PROJECT_ROOT}/examples/expo/package.json
# sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
# echo "${change_file} rewritten successfully"

# change_file=${PROJECT_ROOT}/examples/legacy/package.json
# sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
# echo "${change_file} rewritten successfully"

change_file=${PROJECT_ROOT}/examples/expo/react-native.config.js
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

change_file=${PROJECT_ROOT}/examples/expo/metro.config.js
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

change_file=${PROJECT_ROOT}/examples/expo/tsconfig.json
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"
