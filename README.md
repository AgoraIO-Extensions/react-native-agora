##### 有任何问题欢迎加入QQ群进行反馈  471757030

## [for 1.x old version](README.old.md)

# react-native-agora
[![npm](https://img.shields.io/npm/v/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dm/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dt/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/l/react-native-agora.svg)](https://github.com/syanbo/react-native-agora/blob/master/LICENSE)
[![join chat](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/react-native-agora/community)

## Description

The react-native-agora is an open-source wrapper for react-native developers. This SDK takes advantage of React Native and Agora RTC Video SDKs on Android/iOS.

## Compatibility
  * react native 0.58.x
  * iOS SDK 8.0+
  * Android 5.0+ x86 arm64 armv7a

## [quick start](https://github.com/AgoraIO-Community/Agora-RN-Quickstart)

## Installation

Install with npm:

 `npm install --save react-native-agora`

Or, install with yarn:

 `yarn add react-native-agora`

Either way, then link with:

 `react-native link react-native-agora`

### iOS Installation
  [中文](docs/IOS_INSTALLATION.zh.md)
  [English](docs/IOS_INSTALLATION.md)

### Android Installation
  [中文](docs/ANDROID_INSTALLATION.zh.md) 
  [English](docs/ANDROID_INSTALLATION.md)

## Agora Native API Documentation

### Android
  [中文](https://docs.agora.io/cn/Video/API%20Reference/java/index.html) 
  [English](https://docs.agora.io/en/Video/API%20Reference/java/index.html)

## iOS
  [中文](https://docs.agora.io/cn/Video/API%20Reference/oc/docs/headers/Agora-Objective-C-API-Overview.html)
  [English](https://docs.agora.io/en/Video/API%20Reference/oc/docs/headers/Agora-Objective-C-API-Overview.html)


## [API DOCS](https://syanbo.github.io/react-native-agora/globals.html)

#### Events

```javascript
RtcEngine.on('eventName', (data) => {
    console.log(data);
});
```

| Name                      | Description  | Platform |
| ------------------------- | ------------ | ------- |
| warning                 | warning | all |
| error                   | error | all |
| apiCallExecute | capture agora native api call executed| all |
| joinChannelSuccess      | join channel success | all |
| reJoinChannelSuccess      | rejoin channel success | all |
| leaveChannel            | quit channel | all |
| clientRoleChanged | when changed client role | all |
| userJoined              | when user joined channel | all |
| userOffline             | when user left channel | all |
| connectionStateChanged | when connection state changed | all |
| connectionLost | when connection lost | all |
| tokenPrivilegeWillExpire | when token will expire | all |
| requestToken | when token expired | all |
| microphoneEnabled | when microphone enabled | all |
| audioVolumeIndication | notice audio volume | all |
| activeSpeaker | reports which user is the loudest speaker | all |
| firstLocalAudioFrame | when the first local audio frame is sent | all |
| firstRemoteAudioFrame | when the first remote audio frame is sent | all |
| videoStopped | when video stopped | all |
| firstLocalVideoFrame | when first local video frame is sent | all |
| firstRemoteVideoDecoded | when first remote video is decoded | all |
| firstRemoteVideoFrame | when first remote video frame is rendered | all |
| userMuteAudio | when a remote user's audio stream is muted/unmuted | all |
| userMuteVideo | when a remote user's video stream is muted/unmuted | all |
| userEnableVideo | when a remote user enables/disables the video module | all |
| userEnableLocalVideo | when a remote user enables/disables the local video capture function | all |
| videoSizeChanged | when the video size or rotation information of a specified remote user changes | all|
| remoteVideoStateChanged | when the remote video stream state changes | all |
| localPublishFallbackToAudioOnly | Occurs when the published video stream falls back to an audio-only stream due to unreliable network conditions or switches back to the video when the network conditions improve. | all |
| remoteSubscribeFallbackToAudioOnly | Occurs when the remote video stream falls back to an audio-only stream due to unreliable network conditions or switches back to the video after the network conditions improve. | all |
| audioRouteChanged | when the local audio pkayout route changes | all |
| cameraReady | when the camera is turned on and ready to capture video | all |
| cameraFocusAreaChanged | when the camera focus area is changed | all |
| cameraExposureAreaChanged | The camera exposure area has changed | all |
| remoteAudioStats | Reports the statistics of the audio stream from each remote user/host. | all |
| rtcStats | Reports the statistics of the RtcEngine once every two seconds | all |
| lastmileQuality | Reports the last mile network quality of the local user once every two seconds before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server. After the application calls the enableLastmileTest method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel. | all |
| networkQuality | Reports the last mile network quality of each user in the channel once every two seconds. Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the uplink last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times. | all |
| localVideoStats | Reports the statistics of the uploading local video streams. This callback is triggered once every two seconds for each individual user/host. If there are multiple users/hosts in the channel, this callback is triggered multiple times every 2 seconds. | all |
| remoteVideoStats | Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times. This callback reports statistics more closely linked to the real-user experience of the video transmission quality than the statistics that the onRemoteVideoTransportStats callback reports | all |
| audioTransportStatsOfUid | Reports the transport-layer statistics of each remote audio stream. | all |
| videoTransportStatsOfUid | Reports the transport-layer statistics of each remote video stream. | all |
| localAudioMixingFinish | Occurs when the audio mixing file playback finishes. | all |
| remoteAudioMixingStart | Occurs when a remote user starts audio mixing. | ios |
| remoteAudioMixingFinish | Occurs when a remote user finishes audio mixing. | ios |
| audioEffectFinish | Occurs when the audio effect file playback finishes. | all |
| streamPublished | Occurs when a CDN live stream is published. | all |
| streamUnpublish | Occurs when CDN live streaming stops. This callback notifies the host that the CDN live stream is unpublished. | all |
| transcodingUpdate | Occurs when the publisher's transcoding settings are updated. | all |
| streamInjectedStatus | Reports the status of the injected online media stream. | all |
| receiveStreamMessage | Occurs when the local user receives a remote data stream within five seconds. | all |
| occurStreamMessageError | Occurs when the local user fails to receive a remote data stream. | all |
| mediaEngineLoaded | Occurs when the media engine is loaded. | all |
| mediaEngineStartCall | Occurs when the media engine starts. | all |
| startEchoTestWithInterval | Occurs when you startEchoTestWithInterval | all |
| audioMixingStateChanged | Occurs when audio mixing state changed | all |
| lastmileProbeTestResult | Reports the last-mile network probe result. | all|

## Resources
* Complete [API documentation](https://docs.agora.io/en/) at the Developer Center
* [File bugs about this sample](https://github.com/syanbo/react-native-agora/issues)
* [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)