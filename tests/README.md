# Test execution

SDK unit tests run with Jest on Node. They do not start an App, Simulator, emulator
or Metro. In a clean CI checkout, install only the SDK workspace:

```sh
POD_INSTALL=0 yarn workspaces focus react-native-agora
yarn test --runInBand
```

`focus` changes the installed workspace dependency layout. Use the ordinary
`yarn install --immutable` when working on the Demo too. Library declaration
builds exclude unit-test files so imports in tests cannot pull Demo UI types
into the published SDK declarations. Unit tests still run separately.

The two Demos use platform tests for their three page smoke checks: home,
JoinChannelAudio and JoinChannelVideo. These are UI checks, not proof of RTC
joining or media delivery. Detail tests wait for `join Channel`, which is absent
from the menu, before accepting navigation. Demo pages and startup code do not
contain test-specific branches.

Android uses AndroidJUnitRunner and UI Automator. With an API 28+ device/emulator:

```sh
yarn example test:android
# or: yarn legacy test:android
```

Release App and test APKs use the existing test signing configuration. CI runs
both React Native architectures on API 31 and requires all three JUnit cases,
with no failures, errors or skips. It retains XML/HTML reports, logcat, a screen
capture and the final UI hierarchy. No test retries are configured.
Page checks navigate back to home before closing the Activity so asynchronous
React Native unmounting can release RTC resources while the Activity is alive.
The CI build targets only the emulator's x86_64 ABI and uses a 4 GiB Gradle heap
with two workers; local Demo build defaults are unchanged.

iOS uses XCUITest with a generated test-only target and scheme:

```sh
cd examples/expo
yarn build:test:ios
yarn test:ios
```

Use the corresponding scripts in the legacy workspace for that Demo. The helper
adds the test target idempotently to the local generated project. CI uses Release,
Xcode 16.4 and iOS 18.5, builds once, then runs the existing `.xctestrun` directly.
The controller selects one exclusively created device, has bounded runtime,
creation and execution deadlines, and retains `.xcresult` plus stage logs. All
three cases must pass; empty or skipped results fail. Cleanup deletes only its
own UUID and verifies removal. It does not reset global Simulator services.
Each invocation creates a uniquely named `.xcresult`, so the same local command
can run again without overwriting the previous test result. Stage logs and
`summary.json` describe the latest invocation.
The outer Xcode process budget is 20 minutes, including the first launch of the
test runner. Individual test methods retain their 120-second default and
180-second maximum. Stage durations are printed in CI and saved in the summary;
the CI step allows 30 minutes for setup, execution and owned-device cleanup.
Home readiness waits for the title to exist and be hittable before each case;
the visibility assertion remains enabled. CI also uploads logs and the summary
as a separate text artifact, and artifact names include the workflow attempt
so reruns retain earlier diagnostics without name collisions.

Run result/cleanup policy checks on Linux or macOS with Python's standard library:

```sh
python3 -m unittest discover -s tests -p test_native_ui_runners.py -v
```

The image-tool dependency remains pinned to the same source commit. Its HTTPS
source archive avoids the old Yarn Git clone argument incompatibility with new
Git; this changes dependency transport without upgrading the library version.
