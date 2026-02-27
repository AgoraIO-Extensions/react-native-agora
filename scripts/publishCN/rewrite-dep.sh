#!/bin/bash
set -e
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/../..)
. ${PROJECT_ROOT}/scripts/publishCN/common.sh

change_file=${PROJECT_ROOT}/package.json
sed "s/${old_package_name}/${new_package_name}/g" ${change_file} > tmp && mv tmp ${change_file}
echo "${change_file} rewritten successfully"

change_file2=${PROJECT_ROOT}/yarn.lock
sed "s/${old_package_name}/${new_package_name}/g" ${change_file2} > tmp && mv tmp ${change_file2}
echo "${change_file2} rewritten successfully"
