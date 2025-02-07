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

# Function to modify dependencies
modify_dependencies() {
  local dependencies="$1"
  local modified_dependencies=""
  while IFS= read -r line; do
    if [[ "$line" == *"agora-special-full"* || "$line" == *"full-sdk"* || "$line" == *"agora-full-preview"* ]]; then
      modified_dependencies+="${line/implementation/api}"$'\n'
    else
      modified_dependencies+="$line"$'\n'
    fi
  done <<< "$dependencies"
  echo "$modified_dependencies"
}

if [ -z "$MAVEN_DEPENDENCIES" ] && [ -z "$IRIS_MAVEN_DEPENDENCIES" ]; then
  echo "No Android maven dependencies need to change."
  exit 0
else
  ALL_DEPENDENCIES=$(printf "%s\n%s" "$MAVEN_DEPENDENCIES" "$IRIS_MAVEN_DEPENDENCIES" | sed 's/^/  /')
  ALL_DEPENDENCIES=$(modify_dependencies "$ALL_DEPENDENCIES")
  TEMP_FILE=$(mktemp)
  echo "$ALL_DEPENDENCIES" > "$TEMP_FILE"
  sed -i.bak -e '/\/\/\/ dependencies start/,/\/\/\/ dependencies end/{//!d;}' -e "/\/\/\/ dependencies start/r $TEMP_FILE" "$ANDROID_BUILD_GRADLE_PATH"
  rm "${ANDROID_BUILD_GRADLE_PATH}.bak"
  rm "$TEMP_FILE"
  echo "android/build.gradle updated."
fi

COCOAPODS_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "iOS") | .cocoapods[]')
IRIS_COCOAPODS_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "iOS") | .iris_cocoapods[]')

if [ -z "$COCOAPODS_DEPENDENCIES" ] && [ -z "$IRIS_COCOAPODS_DEPENDENCIES" ]; then
  echo "No iOS cocoapods dependencies need to change."
  exit 0
else
  ALL_DEPENDENCIES=$(printf "%s\n%s" "$COCOAPODS_DEPENDENCIES" "$IRIS_COCOAPODS_DEPENDENCIES" | sed 's/^pod /s.dependency /' | sed 's/^/  /')
  TEMP_FILE=$(mktemp)
  echo "$ALL_DEPENDENCIES" > "$TEMP_FILE"
  sed -i.bak -e '/#dependencies start/,/#dependencies end/{//!d;}' -e "/#dependencies start/r $TEMP_FILE" "$iOS_PODSPEC_PATH"
  rm "${iOS_PODSPEC_PATH}.bak"
  rm "$TEMP_FILE"
  echo "react-native-agora.podspec updated."

  EXAMPLE_DEPENDENCIES=$(printf "%s\n%s" "$COCOAPODS_DEPENDENCIES" | sed 's/^/  /')
  TEMP_FILE=$(mktemp)
  echo "$EXAMPLE_DEPENDENCIES" > "$TEMP_FILE"
  sed -i.bak -e '/#dependencies start/,/#dependencies end/{//!d;}' -e "/#dependencies start/r $TEMP_FILE" "$EXAMPLE_IOS_PODFILE_PATH"
  rm "${EXAMPLE_IOS_PODFILE_PATH}.bak"
  rm "$TEMP_FILE"
  echo "example/ios/Podfile updated."
fi
