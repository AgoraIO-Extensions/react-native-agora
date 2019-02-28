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

### [iOS Installation](docs/IOS_INSTALLATION.md)
### [iOS 开发环境安装指南](docs/IOS_INSTALLATION.zh.md)

### [Android Installation](docs/ANDROID_INSTALLATION.md)
### [Android 开发环境安装指南](docs/ANDROID_INSTALLATION.zh.md)

## Documentation

[声网API文档](https://docs.agora.io/cn/Video/API%20Reference/java/index.html)

[Agora.io API DOCS](https://docs.agora.io/en/Video/API%20Reference/java/index.html)

##### RtcEngine方法

| Property                         | Arguments                                     | Description                           |
| -------------------------------- | ---------------------------------------- | ------------------------------------- |
| init | [Option](#Option) | create and initialize AgoraRtcEngine instance                     
| Promise<any> joinChannel | String channelName, Number uid | join channel|
| eventEmitter | [Events](#Events) | registe event emitters|
| removeEmitter | void | remove event emitter |
| Promise<any> enableLastmileTest | void | enable network quality test |
| Promise<any> disableLastmileTest | void | disable network quality test |
| Promise<any> leaveChannel | void | quit channel |
| destroy | void | destroy AgoraRtcEngine instance |
| setupLocalVideo | Number: uid, Number: renderMode, Number: reactTag | setup local video |
| setupRemoteVideo | Number: uid, Number: renderMode, Number: reactTag | setup remote video |
| startPreview | void | open video preview |
| stopPreview | void | close video preview |
| setLiveTranscoding | [LiveTranscoding](#LiveTranscoding) | start live trancoding |
| setLocalRenderMode | Number: mode | set local video render mode  |
| setRemoteRenderMode | Number: uid, Number: mode | set remote video render mode |
| enableAudioVolumeIndication | Number: interval, Number smooth | enable speaker volume notification|
| Promise<any> switchCamera | void | switch mobile camera |
| enableVideo | void | enable video  |
| disableVideo | void | disable video |
| setEnableSpeakerphone | Boolean: enabled | set enable speaker phone |
| setCameraAutoFocusFaceModeEnabled | Boolean: enabled | set camera auto focus face mode |
| setDefaultAudioRouteToSpeakerphone | Boolean: enabled | set default audio route to speaker phone |
| setCameraTorchOn  | Boolean: enabled | set camera torch on |
| muteLocalAudioStream  | Boolean: enabled | mute/unmute local audio |
| muteRemoteAudioStream  | Number: uid, Boolean: enabled | mute/unmute remote audio by uid |
| muteAllRemoteAudioStreams | Boolean: enabled | mute/unmute all remote audio |
| muteLocalVideoStream  | Boolean: enabled | mute/unmute local video stream |
| enableLocalVideo | Boolean: enabled | set enabled status to local video |
| muteAllRemoteVideoStreams | void | mute/unmute all remote videos |
| muteRemoteVideoStream | Number: uid, Boolean: enabled | mute/unmute remote video by uid |
| getSdkVersion | Function: callback | get sdk version |
| createDataStream | Boolean: reliable, Boolean: ordered | createDataStream |
| sendStreamMessage | Number: streamId, String data | send data with uid |


#### Option
```typescript
export interface Option {
  appid: String,
  videoProfile: number
  channelProfile: number,
  videoEncoderConfig: VideoEncoderConfig,
  clientRole: number,
  audioProfile: number,
  audioScenario: number
}

export interface VideoEncoderConfig {
  width: number,
  height: number,
  bitrate: number,
  frameRate: number,
  orientationMode: number,
}
```

#### LiveTranscoding
```typescript
export interface LiveTranscoding {
  size: Size,
  videoBitrate: number,
  videoFramerate: number,
  lowLatency: boolean,
  videoGop: number,
  videoCodecProfile: number,
  transcodingUsers: Array<TranscodingUser>,
  transcodingExtraInfo: string,
  watermark: BackgroundImage,
  backgroundImage: BackgroundImage,
  backgroundColor: Color,
  audioSampleRate: number,
  audioBitrate: number,
  audioChannels: number,
}
```

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

##### AgoraView Component

| Name           | Description          |
| -------------- | -------------------- |
| showLocalVideo | boolean: (true | false) enable/disable video view  | 
| remoteUid      | uid for remote |
| zOrderMediaOverlay (Android only)      | enable zorder to media overlay |


## samples

- need react-native 0.58.+

[Samples](./samples/README.md)