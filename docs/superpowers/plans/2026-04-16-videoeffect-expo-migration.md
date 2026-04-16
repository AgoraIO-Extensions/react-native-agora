# VideoEffect Expo Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-featured `VideoEffect` advanced example to the Expo demo, including shipped beauty-material resources, automatic bundle preparation, `IVideoEffectObject` lifecycle controls, and Beauty/Style Makeup/Filter/Sticker operations on both Android and iOS.

**Architecture:** Ship the full `AgoraBeautyMaterial` resource root into both native app bundles, prepare a writable runtime copy under cache storage, and pass the prepared `beauty_material_functional` subdirectory to `createVideoEffectObject`. Keep the Expo example screen focused on RTC and UI state while moving bundle preparation and template parsing into adjacent helper modules with unit coverage for the pure logic.

**Tech Stack:** React Native, Expo prebuild app, `react-native-agora`, `react-native-fs`, Android assets, iOS Xcode resources, Jest

---

## File Structure

- `examples/expo/android/app/src/main/assets/AgoraBeautyMaterial/**`
  Responsibility: Android-shipped VideoEffect material root copied from the Electron example.
- `examples/expo/ios/Resources/AgoraBeautyMaterial/**`
  Responsibility: iOS-shipped VideoEffect material root copied from the Electron example.
- `examples/expo/ios/reactnativeagoraexampleexpo.xcodeproj/project.pbxproj`
  Responsibility: include `AgoraBeautyMaterial` in the iOS app resources build phase.
- `examples/expo/app/examples/advanced/VideoEffect/VideoEffect.tsx`
  Responsibility: Expo advanced example UI, RTC lifecycle, bundle readiness state, and `IVideoEffectObject` interactions.
- `examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.ts`
  Responsibility: prepare, validate, and return the runtime writable bundle root/path using `react-native-fs`.
- `examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.ts`
  Responsibility: shared constants, template parsing, template classification, Beauty defaults extraction, effect operation builders, and cleanup helpers.
- `examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts`
  Responsibility: unit tests for prepared-path calculation and bundle-root validation helpers.
- `examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts`
  Responsibility: unit tests for template parsing and effect-operation builders.
- `examples/expo/app/examples/advanced/index.ts`
  Responsibility: register the new advanced example.
- `examples/expo/README.md`
  Responsibility: document the new Expo advanced example.

## Task 1: Stage the Shipped VideoEffect Resources

**Files:**
- Create: `examples/expo/android/app/src/main/assets/AgoraBeautyMaterial/**`
- Create: `examples/expo/ios/Resources/AgoraBeautyMaterial/**`
- Modify: `examples/expo/ios/reactnativeagoraexampleexpo.xcodeproj/project.pbxproj`

- [ ] **Step 1: Verify the source Electron resource root contains both the bundle and sibling shared assets**

Run:

```bash
test -f ../Electron-SDK/example/extraResources/AgoraBeautyMaterial/beauty_material_functional/config.json
test -d ../Electron-SDK/example/extraResources/AgoraBeautyMaterial/resource
```

Expected: both commands exit successfully.

- [ ] **Step 2: Verify the Expo Android and iOS resource targets do not already contain the copied root**

Run:

```bash
test ! -e examples/expo/android/app/src/main/assets/AgoraBeautyMaterial
test ! -e examples/expo/ios/Resources/AgoraBeautyMaterial
```

Expected: both commands exit successfully before copying.

- [ ] **Step 3: Copy the entire `AgoraBeautyMaterial` root into Android assets**

Run:

```bash
mkdir -p examples/expo/android/app/src/main/assets
cp -R ../Electron-SDK/example/extraResources/AgoraBeautyMaterial examples/expo/android/app/src/main/assets/
```

Expected: `examples/expo/android/app/src/main/assets/AgoraBeautyMaterial/beauty_material_functional/config.json` exists.

- [ ] **Step 4: Copy the entire `AgoraBeautyMaterial` root into iOS resources**

Run:

```bash
mkdir -p examples/expo/ios/Resources
cp -R ../Electron-SDK/example/extraResources/AgoraBeautyMaterial examples/expo/ios/Resources/
```

Expected: `examples/expo/ios/Resources/AgoraBeautyMaterial/beauty_material_functional/config.json` exists.

- [ ] **Step 5: Add the iOS folder reference and resource build entry in `project.pbxproj`**

Add a folder-reference-style file entry for:

```text
examples/expo/ios/Resources/AgoraBeautyMaterial
```

and ensure the app target copies it in the Resources build phase.

Expected result after edit:

- the project file contains a file reference for `AgoraBeautyMaterial`
- the app target has a corresponding `PBXBuildFile`
- the Resources build phase includes the folder reference

- [ ] **Step 6: Re-run the filesystem assertions for both platforms**

Run:

```bash
test -f examples/expo/android/app/src/main/assets/AgoraBeautyMaterial/beauty_material_functional/config.json
test -d examples/expo/android/app/src/main/assets/AgoraBeautyMaterial/resource
test -f examples/expo/ios/Resources/AgoraBeautyMaterial/beauty_material_functional/config.json
test -d examples/expo/ios/Resources/AgoraBeautyMaterial/resource
```

Expected: all commands exit successfully.

- [ ] **Step 7: Commit the resource staging**

```bash
git add examples/expo/android/app/src/main/assets/AgoraBeautyMaterial \
  examples/expo/ios/Resources/AgoraBeautyMaterial \
  examples/expo/ios/reactnativeagoraexampleexpo.xcodeproj/project.pbxproj
git commit -m "chore: add VideoEffect material resources"
```

## Task 2: Add Bundle Preparation Helpers With Tests

**Files:**
- Create: `examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.ts`
- Create: `examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts`

- [ ] **Step 1: Write the failing unit tests for prepared-path calculation and bundle validation**

Create `examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts` with tests for:

```ts
import {
  getPreparedVideoEffectPaths,
  isPreparedVideoEffectRootValid,
} from './VideoEffectBundle';

describe('VideoEffectBundle', () => {
  it('returns the prepared root and bundle path under cache storage', () => {
    expect(
      getPreparedVideoEffectPaths('/cache')
    ).toEqual({
      preparedRoot: '/cache/AgoraBeautyMaterial',
      preparedBundlePath:
        '/cache/AgoraBeautyMaterial/beauty_material_functional',
    });
  });

  it('requires both the prepared bundle config and the sibling resource directory', () => {
    expect(
      isPreparedVideoEffectRootValid([
        '/cache/AgoraBeautyMaterial/beauty_material_functional/config.json',
      ])
    ).toBe(false);
  });
});
```

- [ ] **Step 2: Run the new test file to confirm it fails because the module does not exist yet**

Run:

```bash
yarn workspace react-native-agora-example-expo jest app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts --runInBand
```

Expected: FAIL with module-not-found or missing-export errors.

- [ ] **Step 3: Implement the minimal pure helpers first**

Create `examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.ts` with the pure helpers below before adding filesystem code:

```ts
export const VIDEO_EFFECT_RESOURCE_ROOT = 'AgoraBeautyMaterial';
export const VIDEO_EFFECT_BUNDLE_DIR = 'beauty_material_functional';

export function getPreparedVideoEffectPaths(cacheRoot: string) {
  const preparedRoot = `${cacheRoot}/${VIDEO_EFFECT_RESOURCE_ROOT}`;
  return {
    preparedRoot,
    preparedBundlePath: `${preparedRoot}/${VIDEO_EFFECT_BUNDLE_DIR}`,
  };
}

export function isPreparedVideoEffectRootValid(files: string[]) {
  return (
    files.some((file) =>
      file.endsWith(
        `/${VIDEO_EFFECT_RESOURCE_ROOT}/${VIDEO_EFFECT_BUNDLE_DIR}/config.json`
      )
    ) &&
    files.some((file) =>
      file.endsWith(`/${VIDEO_EFFECT_RESOURCE_ROOT}/resource`)
    )
  );
}
```

- [ ] **Step 4: Extend `VideoEffectBundle.ts` with the runtime preparation implementation**

Add the real exported runtime helpers using `react-native-fs`:

- recursive copy from Android assets with `readDirAssets` + `copyFileAssets`
- recursive copy from iOS filesystem resources with `readDir` + `copyFile`
- prepared-root cleanup and recreation with `unlink`, `mkdir`, and `exists`
- a `prepareVideoEffectBundle()` function that returns:

```ts
type PreparedVideoEffectBundle = {
  preparedRoot: string;
  preparedBundlePath: string;
};
```

- [ ] **Step 5: Expand the tests to cover validation edge cases**

Add cases for:

- missing `beauty_material_functional/config.json`
- missing `resource`
- fully valid root

- [ ] **Step 6: Run the test file again**

Run:

```bash
yarn workspace react-native-agora-example-expo jest app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts --runInBand
```

Expected: PASS.

- [ ] **Step 7: Commit the bundle helper and tests**

```bash
git add examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.ts \
  examples/expo/app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts
git commit -m "feat: add VideoEffect bundle preparation helpers"
```

## Task 3: Port Template Parsing and Effect Helpers With Tests

**Files:**
- Create: `examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.ts`
- Create: `examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts`

- [ ] **Step 1: Write the failing unit tests for template parsing and effect builders**

Create `examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts` with tests for:

```ts
import {
  buildStyleEffectOperations,
  classifyBundleTemplates,
  extractSdkDrivenBeautyOptionsFromConfig,
  parseBundleUiOptions,
} from './VideoEffectHelpers';

describe('VideoEffectHelpers', () => {
  it('parses bundle UI options into label/relativePath/templateName triples', () => {
    expect(
      parseBundleUiOptions({
        user_interface_option: {
          'Beauty-Basic': 'beauty_normal_basic/',
        },
      })
    ).toEqual([
      {
        label: 'Beauty-Basic',
        relativePath: 'beauty_normal_basic/',
        templateName: 'Beauty-Basic',
      },
    ]);
  });

  it('classifies templates by effect type prefix', () => {
    const groups = classifyBundleTemplates([
      {
        label: 'Filter-Whitetea',
        relativePath: 'filter_baicha/',
        templateName: 'Filter-Whitetea',
      },
    ]);
    expect(groups.filter).toHaveLength(1);
    expect(groups.beauty).toHaveLength(0);
  });

  it('extracts Beauty defaults from template config', () => {
    expect(
      extractSdkDrivenBeautyOptionsFromConfig({
        beauty_effect_option: { smoothness: 0.7, lightness: 0.7, redness: 0.3 },
        face_buffing_option: { eye_pouch: 0.8 },
        face_shape_beauty_option: { style: -1, intensity: 50 },
      })
    ).toMatchObject({
      smoothness: 0.7,
      lightness: 0.7,
      redness: 0.3,
      eyePouch: 0.8,
      faceStyle: -1,
      faceIntensity: 50,
    });
  });

  it('builds style/filter strength operations with the correct keys', () => {
    expect(
      buildStyleEffectOperations('filter_effect_option', 0.5)
    ).toEqual([
      {
        kind: 'float',
        option: 'filter_effect_option',
        key: 'strength',
        value: 0.5,
      },
    ]);
  });
});
```

- [ ] **Step 2: Run the helper test file to confirm it fails before implementation**

Run:

```bash
yarn workspace react-native-agora-example-expo jest app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts --runInBand
```

Expected: FAIL because `VideoEffectHelpers.ts` does not exist yet.

- [ ] **Step 3: Implement the shared types, constants, and pure helper functions**

Create `examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.ts` with:

- `CLEAR_VISION_EXTENSION_PROVIDER`
- `CLEAR_VISION_EXTENSION_NAME`
- `BundleTemplateOption`
- `BundleTemplateGroups`
- `SdkDrivenBeautyOptions`
- `parseBundleUiOptions`
- `classifyBundleTemplates`
- `extractSdkDrivenBeautyOptionsFromConfig`
- `buildStyleEffectOperations`
- cleanup helpers for enabling/disabling the extension and destroying the object

- [ ] **Step 4: Add filesystem-backed config readers for the screen to consume**

In the same helper module, add functions that:

- read the root `config.json`
- read a template config from a selected relative path
- return template groups and initial Beauty defaults
- gracefully fall back when optional `saved.json` is absent

- [ ] **Step 5: Re-run the helper tests**

Run:

```bash
yarn workspace react-native-agora-example-expo jest app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts --runInBand
```

Expected: PASS.

- [ ] **Step 6: Commit the helper module and tests**

```bash
git add examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.ts \
  examples/expo/app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts
git commit -m "feat: add VideoEffect parsing helpers"
```

## Task 4: Implement the Expo `VideoEffect` Example Screen

**Files:**
- Create: `examples/expo/app/examples/advanced/VideoEffect/VideoEffect.tsx`
- Modify: `examples/expo/app/examples/advanced/index.ts`

- [ ] **Step 1: Write the failing screen smoke test or runtime assertion checklist**

Because the repo does not already contain component tests for Expo advanced examples, create a checklist comment at the top of the implementation branch or task notes with these expected runtime states:

- bundle status transitions `preparing -> ready`
- `Create Effect Object` disabled until bundle ready
- Beauty/Style Makeup/Filter/Sticker controls disabled until object creation

This task does not add a Jest component test; validation is runtime-focused.

- [ ] **Step 2: Scaffold the screen with state and lifecycle wiring**

Start from the current advanced example pattern and implement:

- `createState`
- `initRtcEngine`
- `joinChannel`
- `leaveChannel`
- `releaseRtcEngine`

Use:

```ts
this.engine?.enableExtension(
  'agora_video_filters_clear_vision',
  'clear_vision',
  true
);
```

and kick off `prepareVideoEffectBundle()` during initialization.

- [ ] **Step 3: Add bundle-readiness state and render the status UI**

Render:

- status text for `preparing`, `ready`, or `failed`
- `Create Effect Object`
- `Destroy Effect Object`

Disable object creation until `preparedBundlePath` exists.

- [ ] **Step 4: Add effect-object lifecycle handlers**

Implement:

- `createVideoEffectObject`
- `destroyVideoEffectObject`
- cleanup of pending timers on leave/unmount

Creation must pass:

```ts
this.engine?.createVideoEffectObject(
  preparedBundlePath,
  MediaSourceType.PrimaryCameraSource
);
```

- [ ] **Step 5: Port the Beauty section**

Implement:

- Beauty template dropdown
- `Apply/Remove`
- sliders for `smoothness`, `lightness`, `redness`, `eye_pouch`
- dropdown for `faceStyle`
- slider for `faceIntensity`
- throttled updates while sliding and direct commit on release
- `Save` and `Reset`

- [ ] **Step 6: Port Style Makeup, Filter, and Sticker**

Implement:

- Style Makeup template dropdown + `styleIntensity`
- Filter template dropdown + `strength`
- Sticker template dropdown

All three should use `addOrUpdateVideoEffect`/`removeVideoEffect` and the helper operation builders.

- [ ] **Step 7: Register the example**

Modify `examples/expo/app/examples/advanced/index.ts` to:

- import `VideoEffect`
- add `{ name: 'VideoEffect', component: VideoEffect }`

- [ ] **Step 8: Run TypeScript verification**

Run:

```bash
yarn tsc --noEmit -p examples/expo/tsconfig.json
```

Expected: PASS.

- [ ] **Step 9: Commit the new screen and registration**

```bash
git add examples/expo/app/examples/advanced/VideoEffect/VideoEffect.tsx \
  examples/expo/app/examples/advanced/index.ts
git commit -m "feat: add Expo VideoEffect example"
```

## Task 5: Update Documentation and Final Verification

**Files:**
- Modify: `examples/expo/README.md`

- [ ] **Step 1: Add `VideoEffect` to the Expo advanced examples list**

Update `examples/expo/README.md` to mention:

- `VideoEffect: Full VideoEffectObject demo with Beauty, Style Makeup, Filter, and Sticker`

- [ ] **Step 2: Run the two unit test files together**

Run:

```bash
yarn workspace react-native-agora-example-expo jest \
  app/examples/advanced/VideoEffect/VideoEffectBundle.test.ts \
  app/examples/advanced/VideoEffect/VideoEffectHelpers.test.ts \
  --runInBand
```

Expected: PASS.

- [ ] **Step 3: Build the Android Expo app**

Run:

```bash
./gradlew :app:assembleDebug
```

Workdir: `examples/expo/android`

Expected: PASS and produce a debug APK/AAB output tree.

- [ ] **Step 4: Build the iOS Expo app**

Run:

```bash
xcodebuild \
  -workspace reactnativeagoraexampleexpo.xcworkspace \
  -scheme reactnativeagoraexampleexpo \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  build
```

Workdir: `examples/expo/ios`

Expected: PASS.

- [ ] **Step 5: Run manual runtime verification on Android**

Checklist:

- open `VideoEffect`
- confirm status becomes `ready`
- create the object
- apply Beauty and adjust sliders
- apply Style Makeup
- apply Filter and adjust strength
- apply Sticker
- save and reset Beauty config
- destroy the object

- [ ] **Step 6: Run manual runtime verification on iOS**

Checklist:

- open `VideoEffect`
- confirm status becomes `ready`
- create the object
- repeat Beauty/Style Makeup/Filter/Sticker flow
- confirm `Save` and `Reset` do not crash and restore UI state

- [ ] **Step 7: Commit the documentation and verification-backed changes**

```bash
git add examples/expo/README.md
git commit -m "docs: document Expo VideoEffect example"
```

- [ ] **Step 8: Create the final feature commit if the work spans multiple commits**

If multiple commits above were created, keep them as-is unless the human requests squashing. If a single final integration commit is preferred instead, stage all remaining changes and create:

```bash
git add examples/expo
git commit -m "feat: migrate VideoEffect to Expo demo"
```
