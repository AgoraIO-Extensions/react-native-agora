#!/bin/bash
set -e
set -x
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/..)

LINE="npmRegistryServer: https://registry.npmmirror.com"
grep -q "$LINE" ${PROJECT_ROOT}/.yarnrc.yml || echo -e "$LINE\n$(cat ${PROJECT_ROOT}/.yarnrc.yml)" > ${PROJECT_ROOT}/.yarnrc.yml.tmp && mv ${PROJECT_ROOT}/.yarnrc.yml.tmp ${PROJECT_ROOT}/.yarnrc.yml

echo ".yarnrc.yml updated"

old2='"react-native-image-tool": "github:LichKing-2234/react-native-image-tools"'
new2='"react-native-image-tool": "git+https://gitee.com/agoraio-community/react-native-image-tools.git"'

sed "s#${old2}#${new2}#g" ${PROJECT_ROOT}/examples/legacy/package.json > tmp && mv tmp ${PROJECT_ROOT}/examples/legacy/package.json

echo "examples/legacy/package.json updated"
