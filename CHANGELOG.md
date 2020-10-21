## [3.1.4-rc.0](https://github.com/AgoraIO-Community/react-native-agora/compare/3.1.2-rc.2...v3.1.4-rc.0) (2020-10-21)


### Features

* migrating to @react-native-community/bob ([c72a527](https://github.com/AgoraIO-Community/react-native-agora/commit/c72a5278b2e990081d34e2e765e2e6a26ba792bb))

## 3.1.3
  - fix iOS `deinit` `[weak self]` crash
  - make `RtcChannel.channelId` public
  - add `setAudioSessionOperationRestriction` and `sendCustomReportMessage` method

## 3.1.2-rc.2
  - fix iOS `deinit` `[weak self]` crash
  - fix `engine()` build error

## 3.1.2-rc.1
  - make `RtcChannel.channelId` public

## 3.1.2
  - support 3.1.2 native sdk
  - fix `RejoinChannelSuccess` bug

## 3.0.1
  - release version

## 3.0.1-rc.5
  - fix `Xcode10` `Swift4` compile error

## 3.0.1-rc.4
  - fix crash when rendering view without `channelId` property
  - fix `RtcLocalView` freezes after rendering remote view

## 3.0.1-rc.3
  - fix multiple channel render bug
  - remove `Types` from export, you can import enum or class by `import {} from 'react-native-agora'`
  - optimize ts code and doc

## 3.0.1-rc.2
  - add `startPreview` `stopPreview`

## 3.0.1-rc.1
  - prerelease 3.0.1-rc.1

## 3.0.1-beta.9
  - add `constructor` for typescript
  - fix Android `mapToChannelMediaInfo` crash
  - fix iOS `switchChannel` `sendMetadata` crash

## 3.0.1-beta.8
  - fix iOS event warn
  - fix ts array declare error

## 3.0.1-beta.7
  - fix lib ignore bug

## 3.0.1-beta.6
  - support 3.0.1.1 native sdk
  - fix iOS `RtcChannelEvent` `NetworkQuality` crash

## 3.0.1-beta.5
  - fix lib ignore bug

## 3.0.1-beta.4
  - fix android `setCameraCapturerConfiguration` bug

## 3.0.1-beta.3
  - fix iOS `mirrorMode` bug

## 3.0.1-beta.2
  - fix `createWithAreaCode` bug
  - fix render black screen bug

## 3.0.1-beta.1
  - support 3.0.1 native sdk

## 3.0.0-beta.6
  - fix iOS link bug

## 3.0.0-beta.5
  - optimize doc

## 3.0.0-beta.4
  - optimize code

## 3.0.0-beta.3
  - optimize doc

## 3.0.0-beta.2
  - optimize

## 3.0.0-beta.1
  - support 3.0.0 native sdk

## 2.9.1-alpha.7
  - fix `setBeautyEffectOptions` bugs

## 2.9.1-alpha.6
  - fix bugs

## 2.9.1-alpha.5
  - upgrade android sdk to 2.9.4

## 2.9.1-alpha.4
  - remove `AgoraRtcCryptoLoader` `libcrypto`

## 2.9.1-alpha.3
  - upgrade android sdk to 2.9.4

## 2.9.1-alpha.2
  - upgrade 2.9.2 fro android

## 2.9.1-alpha.1
  - support 2.9.1 native sdk

## 2.9.0-alpha.3
  - hotfix ios compile error

## 2.9.0-alpha.2
  - fix ios dictionary stringValue type cast

## 2.9.0-alpha.1
  - fix typo: rename `methodisSpeakerphoneEnabled` to `isSpeakerphoneEnabled`
  - events deprecated & instead:
    * `microphoneEnabled` instead `localAudioStateChanged`
    * `audioTransportStatsOfUid` instead `remoteAudioStats`
    * `videoTransportStatsOfUid` instead `remoteVideoStats`
    * `userMuteVideo`, `userEnableVideo`, `userEnableLocalVideo` & `firstRemoteVideoDecoded` instead `remoteVideoStateChanged`
  - events enhancement:
    * `rtcStats`, `leaveChannel` add channel stats `txAudioBytes`, `txVideoBytes`, `rxAudioBytes`, `rxVideoBytes`, `txPacketLossRate`, `rxPacketLossRate`
  - new events:
    * `remoteAudioStateChanged` subscribe for remote audio state
    * `localAudioStateChanged` subscribe for local audio state
    * `localAudioStats` subscribe for local audio stats
    * `mediaRelayStateChanged`, `receivedChannelMediaRelay`
  - new apis:
    * `switchChannel` switch to specified channel
    * `startChannelMediaRelay`, `updateChannelMediaRelay`, `stopChannelMediaRelay`, `removeChannelMediaRelay` relay media streams operation for across channels.

## 2.8.0-alpha.1
  - add `string uid` api support
  - android: deprecate `lowLatency` member of LiveTranscoding
  - add methods `getUserInfoByUserAccount`, `getUserInfoByUid`, `joinChannelWithUserAccount`, `registerLocalUserAccount`
  - add events `localUserRegistered`, `userInfoUpdated`
  - add `totalFrozenTime`, `frozenRate` to events `remoteVideoStats` & `remoteAudioStats`.
  - add `numChannels` & `receivedSampleRate` & `receivedBitrate` to `remoteAudioStats`
  - android: upgrade native sdk to 2.8.2
  - ios: upgrade native sdk to 2.8.0

## 2.4.1-alpha.3
- refactor setLiveTranscoding: rename ios & android native parameters. export enum for javascript/typescript api.
- fix negative number case in android platform.
- improve api doc.

## 2.4.1-alpha.2
- deprecated `sendMessage` & `createDataStream` & `removeAllListeners` & `off`
- refactor event system
- fix `android` enum convert failed.

## 2.4.1-alpha
- support 2.4.1-alpha.1 agora video sdk android-2.4.1 / iOS-2.4.1
  1. Deprecate iOS manual link operator, instead using cocoapods resolve compile dependencies.
  2. Add methods getAudioMixingPlayoutVolume, getAudioMixingPublishVolume for audio mixing troubleshooting.
  3. Add `txPacketLossRate`, `rxPacketLossRate` on `rtcStats` interface. usage: `RtcEngine.on('rtcStats', (data) => console.log(data))`.
  4. Rename `receivedFrameRate` to `rendererOutputFrameRate` this property related on `localVideoStats` and `remoteVideoStats`.
  5. Add event 'localVideoChanged' and Deprecate events `cameraReady` and `videoStopped`. You can listen `localVideoChanged` event instead  `cameraReady` & `videoStopped`.
  6. Add event `rtmpStreamingStateChanged` for rtmp streaming troubleshooting
  7. Add event `audioCodecProfile` on `liveTranscoding` interface.
  8. Add event `networkTypeChanged` for network troubleshooting.
  9. Add method `registerMediaMetadataObserver` method, this method enables you to add synchronized metadata in the video stream for more diversified live broadcast interactions, such as sending shopping links, digital coupons, and online quizzes. note: Call this method before the joinChannel method. and applies to `channelProfile` with 1.
  10. Add method `sendMediaData`, this method enables you send media data under the live broadcast mode (`channelProfile` = 1) note: call this method after the `registerMediaMetadataObserver` method.
  11. Add event `audioMixingStateChanged` and Deprecate event 'localAudioMixingFinish`.
  11. Add `firstRemoteAudioDecoded` event you can get more detail [here](https://docs.agora.io/en/Interactive%20Broadcast/release_android_video?platform=Android#v241)

## 2.4.0-alpha
- support 2.4.0-alpha.1 agora video sdk android-2.4.0 / iOS-2.4.0.1 and add sendMessage support in the same channel. Deprecate: startEchoTest and setVideoQualityParameters
- support 2.4.0-alpha.2 using 0.55.1 as peerDependency and support typescript
- support 2.4.0-alpha.3 bugfix iOS receiveStreamMessage data is null
- support 2.4.0-alpha.4 bugfix iOS videoSizeChanged field rotation typo
- support 2.4.0-alpha.5 bugfix Android & iOS side not support fit mode and hidden mode.
  1. Deprecate & Remove: setupLocalVideo & setupRemoteVideo
  2. rename iOS side constants
  ```
  "AgoraVideoMirrorModeAuto" to "VideoMirrorModeAuto"
  "AgoraVideoMirrorModeEnabled" to "VideoMirrorModeEnabled"
  "AgoraVideoMirrorModeDisabled" to "VideoMirrorModeDisabled"
  "AgoraChannelProfileCommunication" to "ChannelProfileCommunication"
  "AgoraChannelProfileLiveBroadcasting" to "ChannelProfileLiveBroadcasting"
  "AgoraChannelProfileGame" to "ChannelProfileGame"
  "AgoraVideoMode" to "VideoMode"
  "AgoraAudioMode" to "AudioMode"
  ```

## 2.3.3-alpha
- support agora video sdk 2.3.3
- release 2.3.3-alpha.3
- release 2.3.3-alpha.4 (remove deprecated native api)
- release 2.3.3-alpha.5 (refactor event react api & refactor native wrapper)
- release 2.3.3-alpha.6 (refactor with typescript & fix. iOS platform binding bug)
- release 2.3.3-alpha.7 (refactor RtcEngine#init method support audio / video mode and switch dualStream)


## 1.1.2
- add onVideoMute
- add onAudioMute

## 1.1.1

- add createDataStream
- add sendStreamMessage
- add onStreamMessage

## 1.0.9

- update to agora sdk version 2.0.2

- add setCameraAutoFocusFaceModeEnabled

- add setDefaultAudioRouteToSpeakerphone

- add setCameraTorchOn

- fix bug: Android speaker's volume indication

## 1.0.8

 - update to agora sdk version 1.12

 - init wouldn't start video preview. Should manually use startPreview.

 - init options add new boolean parameter `swapWidthAndHeight` to support swap width and height.

 - add configPublisher

 - add setLocalRenderMode

 - add setRemoteRenderMode

 - add enableAudioVolumeIndication

 - add onAudioVolumeIndication

 - add zOrderMediaOverlay for android platform, support media overlay
