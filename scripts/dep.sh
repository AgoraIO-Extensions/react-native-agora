#!/bin/bash
set -e
set -x
MY_PATH=$(realpath $(dirname "$0"))
PROJECT_ROOT=$(realpath ${MY_PATH}/..)
ANDROID_BUILD_GRADLE_PATH="${PROJECT_ROOT}/android/build.gradle"
# Check if INPUT is provided
if [ "$#" -lt 1 ]; then
    exit 1
fi
INPUT=$1

echo $INPUT

MAVEN_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "Android") | .maven[] | .[]')
IRIS_MAVEN_DEPENDENCIES=$(echo "$INPUT" | jq -r '.[] | select(.platform == "Android") | .iris_maven[] | .[]')

# Combine dependencies into a single array
DEPENDENCIES=($MAVEN_DEPENDENCIES $IRIS_MAVEN_DEPENDENCIES)

# Use awk to clear existing dependencies and insert new ones
awk -v deps="${DEPENDENCIES[*]}" '
    BEGIN {
        split(deps, dep_array, " ")
        in_deps_block = 0
    }
    /\/\/\/ dependencies start/ {
        print
        for (i in dep_array) {
            if (dep_array[i] != "") {
                print dep_array[i]
            }
        }
        in_deps_block = 1
        next
    }
    /\/\/\/ dependencies end/ {
        print
        in_deps_block = 0
        next
    }
    {
        if (!in_deps_block) {
            print
        }
    }
' "$ANDROID_BUILD_GRADLE_PATH" > "$ANDROID_BUILD_GRADLE_PATH.tmp"

# Move the temporary file back to the original file
mv "$ANDROID_BUILD_GRADLE_PATH.tmp" "$ANDROID_BUILD_GRADLE_PATH"
