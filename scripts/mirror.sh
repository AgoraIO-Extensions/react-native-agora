#!/bin/bash
set -e
set -x
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/..)

LINE="npmRegistryServer: https://registry.npmmirror.com"
if ! grep -q "$LINE" ${PROJECT_ROOT}/.yarnrc.yml; then
  sed -i "" "1i\\
$LINE
" ${PROJECT_ROOT}/.yarnrc.yml
fi

echo ".yarnrc.yml updated"

sed -i "" 's#"react-native-agora-rawdata": "github:AgoraLibrary/react-native-agora-rawdata"#"react-native-agora-rawdata": "git+https://gitee.com/agoraio-community/react-native-agora-rawdata.git"#g' ${PROJECT_ROOT}/example/package.json
sed -i "" 's#"react-native-image-tool": "github:LichKing-2234/react-native-image-tools"#"react-native-image-tool": "git+https://gitee.com/agoraio-community/react-native-image-tools.git"#g' ${PROJECT_ROOT}/example/package.json

echo "example/package.json updated"
