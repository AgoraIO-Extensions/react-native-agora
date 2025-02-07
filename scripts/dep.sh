#!/bin/bash
set -e
set -x
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/..)

# Check if INPUT is provided
if [ "$#" -lt 1 ]; then
    exit 1
fi
INPUT=$1

echo $INPUT
