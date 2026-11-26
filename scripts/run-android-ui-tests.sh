#!/usr/bin/env bash
set -euo pipefail
app_dir="$(cd "$1" && pwd)"
report_dir="$2"
mkdir -p "$report_dir"
report_dir="$(cd "$report_dir" && pwd)"
script_dir="$(cd "$(dirname "$0")" && pwd)"
result=0
(cd "$app_dir/android" && ./gradlew :app:connectedReleaseAndroidTest -DtestBuildType=release --no-daemon --console=plain) || result=$?
adb logcat -d > "$report_dir/logcat.txt" 2>&1 || true
adb exec-out screencap -p > "$report_dir/screen.png" 2>/dev/null || true
adb shell uiautomator dump /sdcard/agora-window.xml >/dev/null 2>&1 || true
adb pull /sdcard/agora-window.xml "$report_dir/window.xml" >/dev/null 2>&1 || true
cp -R "$app_dir/android/app/build/outputs/androidTest-results" "$report_dir/results" 2>/dev/null || true
if [ "$result" -ne 0 ]; then exit "$result"; fi
python3 "$script_dir/verify-android-ui-tests.py" "$report_dir/results"
