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
