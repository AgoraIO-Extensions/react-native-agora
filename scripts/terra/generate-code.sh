#!/usr/bin/env bash
set -e
set -x

MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/../..)

# rm -rf node_modules
# rm -rf .terra
# yarn

npm exec terra -- run \
    --config ${PROJECT_ROOT}/scripts/terra/config/types_config.yaml  \
    --output-dir=${PROJECT_ROOT}/src

npm exec terra -- run \
    --config ${PROJECT_ROOT}/scripts/terra/config/impl_config.yaml  \
    --output-dir=${PROJECT_ROOT}/src

cd ${PROJECT_ROOT}

yarn build:ts-interface

yarn lint --fix
