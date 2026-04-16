# VideoEffect Expo Migration Design

## Summary

This document defines the design for migrating the Electron `VideoEffect` advanced example into the current Expo demo in `react-native-agora`.

The migration goal is feature parity with the Electron example while adapting the user experience to the Expo sample app:

- keep the full `IVideoEffectObject` workflow
- keep Beauty, Style Makeup, Filter, and Sticker effect nodes
- keep template-driven configuration from the shipped beauty material bundle
- keep `Save` and `Reset` behavior
- remove manual bundle path input from the UI
- support both Android and iOS

The resulting Expo example should feel native to the current sample app, while still demonstrating the full `VideoEffectObject` capability instead of a reduced subset.

## Goals

- Add a new Expo advanced example named `VideoEffect`.
- Migrate the Electron demo's end-user capabilities:
  - create and destroy `IVideoEffectObject`
  - apply and remove Beauty templates
  - adjust Beauty parameters
  - apply and remove Style Makeup templates
  - apply and remove Filter templates
  - apply and remove Sticker templates
  - persist Beauty configuration via `Save`
  - restore Beauty configuration via `Reset`
- Ship the `AgoraBeautyMaterial` resource root with the Expo demo so the example works out of the box.
- Automatically prepare a valid local bundle directory without exposing a bundle path input to the user.
- Keep Android and iOS behavior aligned as much as possible.

## Non-Goals

- Reproducing the Electron UI layout exactly.
- Introducing a large new native resource-management module.
- Refactoring unrelated Expo example infrastructure.
- Generalizing bundle preparation for all future asset bundle use cases beyond what this demo needs.

## Existing Context

The current Expo demo already contains patterns relevant to this migration:

- `BaseComponent` provides the common example lifecycle, local preview, join/leave channel controls, and standard configuration/action rendering.
- `VirtualBackground` already demonstrates a path-preparation pattern where an app resource is converted into an absolute file path before being passed to the SDK.
- `BeautyEffect` already enables the clear vision extension and demonstrates an Expo-style advanced effect page.

The React Native SDK surface already exposes the required `VideoEffectObject` APIs, including:

- `createVideoEffectObject`
- `destroyVideoEffectObject`
- `addOrUpdateVideoEffect`
- `removeVideoEffect`
- `performVideoEffectAction`
- `setVideoEffectFloatParam`
- `setVideoEffectIntParam`
- `setVideoEffectBoolParam`
- `getVideoEffectFloatParam`
- `getVideoEffectIntParam`
- `getVideoEffectBoolParam`

The Electron example additionally depends on a shipped resource root:

- `AgoraBeautyMaterial`

and reads bundle metadata from:

- `config.json`
- `saved.json`
- `saved.cache`

The full `AgoraBeautyMaterial` root is required, not just `beauty_material_functional`, because some templates reference sibling assets such as `../../resource`.

This resource-driven behavior must remain part of the Expo migration.

## High-Level Architecture

The migration will be implemented in three layers.

### 1. Resource Preparation Layer

This layer is responsible for shipping and preparing the beauty material bundle on both platforms.

Responsibilities:

- include `AgoraBeautyMaterial` in Android and iOS app resources
- materialize the bundle root into a stable absolute directory, then pass the `beauty_material_functional` subdirectory inside that prepared root to `createVideoEffectObject`
- avoid repeated full copies when a prepared directory already exists and contains the required files
- expose status and failure information to the demo page

Design choice:

- both Android and iOS should use a writable local prepared directory instead of directly reading from their original packaged resource location

Reasoning:

- `Save` and `Reset` semantics are simpler and more consistent when both platforms operate on a writable copy
- a unified runtime path model reduces platform conditionals in the page logic
- it avoids treating iOS bundle resources as writable state

### 2. VideoEffect Helper Layer

This layer ports the Electron helper logic into React Native-safe utilities.

Responsibilities:

- parse bundle UI options from `config.json`
- classify templates into Beauty, Style Makeup, Filter, and Sticker groups
- derive default Beauty values from template config
- build effect operations for style and filter strength
- manage `enableExtension`/`disableExtension`
- manage `destroyVideoEffectObject` cleanup
- synchronize `saved.json` and `saved.cache` behavior after `Save` and `Reset`
- centralize option names and parameter keys used by the SDK

Adaptations from Electron:

- remove Node `fs` usage in the page component
- replace direct filesystem access with React Native-compatible helpers
- preserve the same effect node ids, option names, and parameter names to stay aligned with Electron and SDK semantics

### 3. Expo Demo Screen Layer

This layer adds the user-facing advanced example.

Responsibilities:

- initialize RTC and start local preview
- prepare bundle resources asynchronously
- allow explicit `Create Effect Object` and `Destroy Effect Object`
- expose Beauty, Style Makeup, Filter, and Sticker controls
- disable effect interactions while resources or effect object are not ready
- keep the UI aligned with current Expo example conventions

The screen should not expose raw bundle path editing. Instead, it should show a status-driven UX:

- `preparing`
- `ready`
- `failed`

## Resource Packaging Design

### Android

The `AgoraBeautyMaterial` directory will be added to the Expo Android app assets.

At runtime:

- the app prepares a target directory under a writable location such as `ExternalCachesDirectoryPath`
- the bundled asset root is recursively copied into that prepared directory
- the returned prepared absolute path for `AgoraBeautyMaterial/beauty_material_functional` becomes the bundle path for `createVideoEffectObject`

If existing utilities cannot recursively copy an Android assets directory, a minimal Android native helper will be added for this purpose only.

### iOS

The same `AgoraBeautyMaterial` root directory will be added to the iOS project resources in Xcode.

At runtime:

- the app copies the bundled root directory into a writable prepared directory
- the prepared absolute path for `AgoraBeautyMaterial/beauty_material_functional` is used as the bundle path for `createVideoEffectObject`

If React Native filesystem utilities are insufficient for the required directory-copy behavior, a minimal iOS helper will be added to copy a bundled directory into the target cache directory.

### Prepared Directory Contract

The prepared bundle directory must satisfy these requirements:

- absolute path
- contains `config.json`
- contains all referenced template subdirectories
- preserves sibling resources required by relative paths such as `../../resource`
- writable for `saved.json` and `saved.cache` synchronization
- reusable across screen openings unless invalidated

## UI and State Design

The new Expo `VideoEffect` page will follow the current advanced example pattern and contain these states:

- RTC lifecycle state
- bundle preparation state
- effect object lifecycle state
- template selection state
- slider and dropdown parameter state

### Bundle Preparation State

Fields:

- preparation status: `idle | preparing | ready | failed`
- prepared bundle path
- error message if failed
- template groups parsed from the bundle

Behavior:

- page mount triggers bundle preparation
- success parses template metadata and default values
- failure keeps preview and channel controls available, but disables effect object creation and effect controls

### Effect Object State

Effect object lifecycle is explicit and separate from bundle readiness.

Behavior:

- bundle ready does not automatically create the effect object
- the user taps `Create Effect Object` to create it
- `Destroy Effect Object` destroys it and clears effect-node runtime state
- destroying the effect object does not re-copy the bundle or release the RTC engine

### Beauty Behavior

Beauty keeps the full Electron semantics:

- select a Beauty template
- call `addOrUpdateVideoEffect(VideoEffectNodeId.Beauty, templateName)`
- expose:
  - `smoothness`
  - `lightness`
  - `redness`
  - `eye_pouch`
  - `faceStyle`
  - `faceIntensity`
- update float parameters with throttled slider changes and final commit on release
- keep `Apply/Remove`, `Save`, and `Reset`

`Save` and `Reset` remain SDK-driven through `performVideoEffectAction`, followed by local cache synchronization and UI refresh.

### Style Makeup, Filter, and Sticker Behavior

These nodes remain independent and composable:

- Style Makeup:
  - template dropdown
  - `styleIntensity` slider
- Filter:
  - template dropdown
  - `strength` slider
- Sticker:
  - template dropdown

All three sections are visible but disabled until the effect object exists.

## Files and Responsibilities

Expected file additions and updates:

### New or Updated Expo Demo Files

- `examples/expo/app/examples/advanced/VideoEffect/VideoEffect.tsx`
  - new advanced example page
- `examples/expo/app/examples/advanced/index.ts`
  - register the new example
- `examples/expo/README.md`
  - add `VideoEffect` to the advanced example list

### New or Updated Expo Utility Files

- `examples/expo/src/utils/index.ts`
  - extend resource-path utilities if useful for shared path helpers
- new helper files near the Expo example or under Expo utils, for example:
  - video effect bundle preparation
  - video effect template parsing
  - video effect operation builders

### New Resource Files

- Expo Android assets for `AgoraBeautyMaterial`
- Expo iOS resources for `AgoraBeautyMaterial`

### Optional Minimal Native Helpers

Only if required by platform limitations:

- minimal Android helper for recursive assets-directory copy
- minimal iOS helper for copying bundled directories to cache

## Error Handling

The example should fail loudly but safely.

Error cases to handle:

- bundle resources missing from app package
- prepared directory missing required files
- `createVideoEffectObject` returns an empty pointer
- template config parse failure
- `addOrUpdateVideoEffect` returns non-zero
- save/reset synchronization failure

UX behavior:

- show an actionable status message in the page
- disable controls that depend on unavailable resources or object state
- do not crash the example or block preview/channel usage when bundle preparation fails

## Testing Strategy

### Static Verification

- TypeScript compiles successfully for the Expo example
- Android project builds with the added assets
- iOS project builds with the added resources

### Runtime Verification

On both Android and iOS:

- open the `VideoEffect` advanced example
- confirm bundle preparation reaches `ready`
- create the effect object successfully
- apply and remove a Beauty template
- modify Beauty parameters and confirm no runtime errors
- save and reset Beauty configuration
- apply Style Makeup
- apply Filter and modify strength
- apply Sticker
- destroy the effect object and confirm controls reset correctly
- leave the channel and unmount the page without leaks or stale object behavior

### Regression Checks

- existing advanced examples still appear and function
- resource-path helpers used by `VirtualBackground` continue to work

## Risks and Mitigations

### Resource Size Growth

Risk:

- repository and app package size increase

Mitigation:

- include only the required `AgoraBeautyMaterial` root from the Electron demo, not unrelated Electron resources

### Android Asset Directory Copy Complexity

Risk:

- React Native filesystem utilities may not recursively copy asset directories

Mitigation:

- add a minimal Android helper only for recursive asset directory extraction if necessary

### iOS Resource Copy Semantics

Risk:

- copying bundled directories into writable runtime storage may require platform-specific handling

Mitigation:

- add a minimal iOS helper only if RN filesystem utilities are insufficient

### Save/Reset Semantics Diverging by Platform

Risk:

- save/reset behavior differs if one platform reads directly from packaged resources

Mitigation:

- standardize both platforms on a prepared writable runtime directory

## Recommended Implementation Direction

Implement the full migration using the resource-preparation model described above.

This approach preserves the Electron demo's capability and material-driven behavior while adapting the UX to the Expo sample app:

- full feature coverage
- no user-entered bundle path
- Android and iOS support
- minimal native additions only when platform filesystem limitations require them
