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

##### RtcEngine Methods

| Property                         | Arguments                                     | Description                           |
| -------------------------------- | ---------------------------------------- | ------------------------------------- |
| init | [Option](#Option) | create and initialize AgoraRtcEngine instance, notice: invoke this method, it will start subscribe events |
| Promise<any> joinChannel | String channelName, Number uid, String? token, String? extraInfo | join channel|
| on | [Events](#Events), Handler: Function | addEventListener for native module events |
| off | [Events](#Events) | removeEventListeners for native module events |
| removeAllListeners | void | remove all event listeners |
| destroy | void | destroy AgoraRtcEngine instance |
| getSdkVersion | Function: callback | get sdk version |
| Promise<any> enableLastmileTest | void | enable network quality test |
| Promise<any> disableLastmileTest | void | disable network quality test |
| Promise<any> leaveChannel | void | quit channel |
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
| Promise<any> setCameraAutoFocusFaceModeEnabled | Boolean: enabled | set camera auto focus face mode |
| setDefaultAudioRouteToSpeakerphone | Boolean: enabled | set default audio route to speaker phone |
| Promise<any> setCameraTorchOn  | Boolean: enabled | set camera torch on |
| muteLocalAudioStream  | Boolean: enabled | mute/unmute local audio |
| muteRemoteAudioStream  | Number: uid, Boolean: enabled | mute/unmute remote audio by uid |
| muteAllRemoteAudioStreams | Boolean: enabled | mute/unmute all remote audio |
| muteLocalVideoStream  | Boolean: enabled | mute/unmute local video stream |
| enableLocalVideo | Boolean: enabled | set enabled status to local video |
| muteAllRemoteVideoStreams | void | mute/unmute all remote videos |
| muteRemoteVideoStream | Number: uid, Boolean: enabled | mute/unmute remote video by uid |
| Promise<any> createDataStream | Boolean: reliable, Boolean: ordered | createDataStream |
| Promise<any> renewToken | String: token | renew token |
| Promise<any> getConnectionState | void | return connection state |
| setClientRole | Number: role(1: host, 2: audience) | change client role |
| enableAudio | void | enable audio |
| disableAudio | void | disable audio |
| enableLocalAudio | Boolean: enable | enable/disable local audio |
| muteLocalAudioStream | Boolean: mute | enable/disable local audio stream |
| muteAllRemoteAudioStreams | Boolean: mute | enable/disable all remote audio streams |
| muteRemoteAudioStream | Number: uid, Boolean: mute | mute/unmute remote audio stream by uid |
| adjustRecordingSignalVolume | Number: volume | Adjusts the recording volume. |
| adjustPlaybackSignalVolume | Number: volume | Adjusts the playback volume. |
| enableAudioVolumeIndication | Number: interval, Number: smooth | Enables the onAudioVolumeIndication callback at a set time interval to report on which users are speaking and the speakers' volume. |
| Promise<any> startAudioRecording | {filePath: String, quality: int} | start audio recording |
| Promise<any> stopAudioRecoding | void | stop audio recording |
| methodisSpeakerphoneEnabled | void | Checks whether the speakerphone is enabled.|| enableInEarMonitoring | Boolean: enabled | enable/disable in-ear monitoring | 
| setInEarMonitoringVolume | Number: volume | Sets the volume of the in-ear monitor. |
| setLocalVoicePitch | Number(double): pitch | Changes the voice pitch of the local speaker. |
| setLocalVoiceEqualization | Number: bandFrequency, Number: bandGain | Sets the local voice equalization effect. |
| setLocalVoiceReverb | Number: reverbKey, Number: value | Sets the local voice reverberation.|
| startAudioMixing | {filepath: String, loopback: Boolean, replace: Boolean, cycle: Int} | [android](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#ac56ceea1a143a4898382bce10b04df09)
 & [ios](https://docs.agora.io/en/Voice/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/startAudioMixing:loopback:replace:cycle:) |
 | stopAudioMixing | void | stop audio mixing |
 | pauseAudioMixing | void | [android](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#ab2d4fb72ec3031f59da72b55857e0da7) & [ios](https://docs.agora.io/en/Voice/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/pauseAudioMixing) |
 | resumeAudioMixing | void | resume audio mixing |
 | adjustAudioMixingVolume | Number: volume | adjust audio mixing volume, call this method when you are in a channel |
 | adjustAudioMixingPlayoutVolume | Number: volume | adjust audio mixing playout volume, call this method when you are in a channel |
 | adjustAudioMixingPublishVolume | Number: volume | Adjusts the volume of audio mixing for publishing (sending to other users). call this method when you are in a channel. |
 | Promise<any> getAudioMixingDuration | void | Gets the duration (ms) of the music file. Call this method when you are in a channel. |
 | Promise<any> getAudioMixingCurrentPosition | void | Gets the playback position (ms) of the music file. Call this method when you are in a channel. |
 | Promise<any> setAudioMixingPosition | Number: pos | Sets the playback position (ms) of the music file to a different starting position (the default plays from the beginning). |
 | Promise<any> getEffectsVolume | void | Retrieves the volume of the audio effects. |
 | Promise<any> setEffectsVolume | Number(double): volume | Sets the volume of the audio effects. |
 | Promise<any> setVolumeOfEffect | Number: soundId, Number(double): volume | Sets the volume of a specified audio effect. |
 | Promise<any> playEffect | {soundId: Number, filePath: String, loopCount: Number, pitch: Number(double), gain: Boolean, publish: Boolean} | Plays a specified audio effect. [android](https://docs.agora.io/en/Video/API%20Reference/java/interfaceio_1_1agora_1_1rtc_1_1_i_audio_effect_manager.html#a6fd330db3e3e5735f7f8d5c36bc3fea1) & [ios](https://docs.agora.io/en/Voice/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/playEffect:filePath:loopCount:pitch:pan:gain:publish:) |
 | Promise<any> stopEffect | Number: soundId | Stops playing a specified audio effect. |
 | Promise<any> stopAllEffects | void | Stops all playing audio effects. |
 | Promise<any> preloadEffect | Number: soundid, String: filepath | Preloads a specified audio effect file into the memory. Supported audio formats: mp3, aac, m4a, 3gp, wav.|
 | Promise<any> unloadEffect | Number: soundId | Releases a specified preloaded audio effect from the memory. |
 | Promise<any> pauseEffect | Number: soundId | Pauses a specified audio effect. |
 | Promise<any> pauseAllEffects | void | Pauses all audio effects. |
 | Promise<any> resumeEffect | void | Resumes playing a specified audio effect. |
 | Promise<any> resumeAllEffects | void | Resumes playing all audio effects. |
 | setAudioSessionOperationRestriction | void | [ios only](https://docs.agora.io/en/Voice/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/setAudioSessionOperationRestriction:) |
 | Promise<any> startEchoTest | void | Starts an audio call test. |
 | Promise<any> stopEchoTest | void | Stop the audio call test. |
 | Promise<any> setRecordingAudioFrameParameters | {sampleRate: Number, channel: Number, mode: Number, samplesPerCall: Number } | Sets the audio recording format for the RecordFrame callback.  |
 | Promise<any> setPlaybackAudioFrameParameters | {sampleRate: Number, channel: Number, mode: Number, samplesPerCall: Number } | Sets the audio playback format for the onPlaybackFrame callback. |
 | Promise<any> addVideoWatermark | {url: String, x: Number, y: Number, width: Number, height: Number } | add video watermark |
 | clearVideoWatermarks | void | remove the watermark image from the video stream added by addVideoWatermark |
 | setLocalPublishFallbackOption | Number: [option(0, 1, 2)](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_constants.html#a3e453c93766e783a7e5eca05b1776238)| [android](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#ac8c08e79844a4e62e0670553484cbe90) & [ios](https://docs.agora.io/en/Voice/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/setLocalPublishFallbackOption:) |
 | setRemoteSubscribeFallbackOption  | Number: [option (0, 1, 2)](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_constants.html#a3e453c93766e783a7e5eca05b1776238)| [android](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#af64301ea1788dad0561aa678f3fe6ad3) & [ios](https://docs.agora.io/en/Voice/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/setRemoteSubscribeFallbackOption:) |
 | Promise<any> enableDualStreamMode | Boolean: enabled | Enables/disables dual-stream mode. |
 | setRemoteVideoStreamType | { uid: Number, streamType: Number } | Sets the video stream type of the remotely subscribed video stream. |
 | setRemoteDefaultVideoStreamType | { streamType: Number } | Sets the default video stream type of the remotely subscribed video stream. |
 | Promise<any> addInjectStreamUrl | [InjectionStream](#InjectionStream) | Injects an online media stream to a live broadcast. |
 | Promise<any> removePublishStreamUrl | String: url | Removes a CDN live stream URL address. |
 | Promise<any> setVideoQualityParameters | Boolean: quality | 
Sets the preference option for the video quality (Live broadcast only). |
 | Promise<any> setLocalVideoMirrorMode | Number: mode | Sets the local video mirror mode. |
 | Promise<any> switchCamera | void | Switches between front and rear cameras. | 
 | Promise<any> isCameraZoomSupported | void | Checks whether the camera zoom function is supported. |
 | Promise<any> isCameraTorchSupported	| void | Checks whether the camera flash function is supported. |
 | Promise<any> isCameraFocusSupported	| void | Checks whether the camera manual focus function is supported. |
 | Promise<any> isCameraExposurePositionSupported | void |Checks whether the camera exposure function is supported. |
 | Promise<any> isCameraAutoFocusFaceModeSupported | void | Checks whether the camera face auto-focus function is supported. |
 | Promise<any> setCameraZoomFactor | Number(float): zoomFactor |	Sets the camera zoom ratio. |
 | Promise<any> getCameraMaxZoomFactor | void |	Gets the maximum zoom ratio of the camera.[android only](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#a1084b42001cc5c008d58ec938fc0b7f3) |
 | Promise<any>  setCameraFocusPositionInPreview | {x: Number(double), y: Number(double) } | Sets the camera manual focus position.|
 | Promise<any>  setCameraExposurePosition | {x: Number(double), y: Number(double) } |	Sets the camera exposure position.|
 | Promise<any>  setCameraTorchOn | Boolean isOn | Enables the camera flash function. |
 | Promise<any>  setCameraAutoFocusFaceModeEnabled | Boolean enabled | Enables the camera auto-face focus function. |
 | Promise<any> getCallId | void | getcalll id |
 | Promise<any> setLog | filePath: String, level: Number | specifies an SDK output log file. |
 | addPublishStreamUrl | { url: String, enabled: Boolean } | Adds a CDN live stream URL address. it must be invoked after invoking setLiveTranscoding |
 | removePublishStreamUrl | { url: String } | Removes a CDN live stream URL address. |

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


#### InjectionStream
```typescript
export interface InjectionStream {
  config: {
    size: {
      width: Number,
      height: Number,
    },
    videoGop: Number,
    videoBitrate: Number,
    audioBitrate: Number,
    audioSampleRate: Number,
    videoFrameRate: Number
    audioChannels: Number
  }
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