#!/bin/bash
set -e
set -x
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/..)

sed -i "" '1i\
npmRegistryServer: https://registry.npmmirror.com
' ${PROJECT_ROOT}/.yarnrc.yml

