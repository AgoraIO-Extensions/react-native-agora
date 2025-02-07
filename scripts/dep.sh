#!/bin/bash
set -e
set +x
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/..)
ANDROID_BUILD_GRADLE_PATH="${PROJECT_ROOT}/android/build.gradle"
iOS_PODSPEC_PATH="${PROJECT_ROOT}/react-native-agora.podspec"
EXAMPLE_IOS_PODFILE_PATH="${PROJECT_ROOT}/example/ios/Podfile"
if [ "$#" -lt 1 ]; then
    exit 1
fi
INPUT=$1

MAVEN_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "Android") | .maven[]')
IRIS_MAVEN_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "Android") | .iris_maven[]')

if [ -z "$MAVEN_DEPENDENCIES" ] && [ -z "$IRIS_MAVEN_DEPENDENCIES" ]; then
  echo "No Android maven dependencies need to change."
  exit 0
else
  ALL_DEPENDENCIES=$(printf "%s\n%s" "$MAVEN_DEPENDENCIES" "$IRIS_MAVEN_DEPENDENCIES" | sed 's/^/  /')
  sed -i.bak -e '/\/\/\/ dependencies start/,/\/\/\/ dependencies end/{//!d;}' -e "/\/\/\/ dependencies start/r /dev/stdin" "$ANDROID_BUILD_GRADLE_PATH" <<< "$ALL_DEPENDENCIES"
  rm "${ANDROID_BUILD_GRADLE_PATH}.bak"
  echo "android/build.gradle updated."
fi

COCOAPODS_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "iOS") | .cocoapods[]')
IRIS_COCOAPODS_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "iOS") | .iris_cocoapods[]')

if [ -z "$COCOAPODS_DEPENDENCIES" ] && [ -z "$IRIS_COCOAPODS_DEPENDENCIES" ]; then
  echo "No iOS cocoapods dependencies need to change."
  exit 0
else
  ALL_DEPENDENCIES=$(printf "%s\n%s" "$COCOAPODS_DEPENDENCIES" "$IRIS_COCOAPODS_DEPENDENCIES" | sed 's/^pod /s.dependency /' | sed 's/^/  /')
  # ALL_DEPENDENCIES=$(printf "%s\n%s" "$COCOAPODS_DEPENDENCIES" "$IRIS_COCOAPODS_DEPENDENCIES" | sed 's/^/  /' | sed "s/^pod /s.dependency /")
  sed -i.bak -e '/#dependencies start/,/#dependencies end/{//!d;}' -e "/#dependencies start/r /dev/stdin" "$iOS_PODSPEC_PATH" <<< "$ALL_DEPENDENCIES"
  rm "${iOS_PODSPEC_PATH}.bak"
  echo "react-native-agora.podspec updated."

  EXAMPLE_DEPENDENCIES=$(printf "%s\n%s" "$COCOAPODS_DEPENDENCIES" | sed 's/^/  /')
  sed -i.bak -e '/#dependencies start/,/#dependencies end/{//!d;}' -e "/#dependencies start/r /dev/stdin" "$EXAMPLE_IOS_PODFILE_PATH" <<< "$EXAMPLE_DEPENDENCIES"
  rm "${EXAMPLE_IOS_PODFILE_PATH}.bak"
  echo "example/ios/Podfile updated."
fi
