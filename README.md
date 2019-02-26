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
RtcEngine.eventEmitter({
  onFirstRemoteVideoDecoded: data => {},
  onJoinChannelSuccess: data => {},
  onUserOffline: data => {},
  onUserJoined: data => {},
  onError: data => {},
  onWarning: data => {},
  onLeaveChannel: data => {},
  onAudioVolumeIndication: data => {},
  onStreamMessage: ({uid, streamId, data}) => {},
  onStreamMessageError: ({uid, streamId, error, missed, cached}) => {},
})
```

| Name                      | Description  |
| ------------------------- | ------------ |
| onWarning                 | warning |
| onError                   | error |
| onFirstRemoteVideoDecoded | when received first frame send from remote decoded stream |
| onJoinChannelSuccess      | join channel success |
| onReJoinChannelSuccess      | rejoin channel success |
| onLeaveChannel            | quit channel |
| onClientRoleChanged | when changed client role |
| onUserJoined              | when user joined channel |
| onUserOffline             | when user left channel |
| onConnectionStateChanged | when connection state changed |
| onConnectionInterrupted | when connection interrupted |
| onConnectionLost | when connection lost |
| onConnectionBanned | when connection banned |
| onApiCallExecuted | capture api call executed |
| onTokenPrivilegeWillExpire | when token will expire |
| onRequestToken | when token expired |
| onMicrophoneEnabled | when microphone enabled |
| onAudioVolumeIndication | notice audio volume |
| onActiveSpeaker | reports which user is the loudest speaker |
| onFirstLocalAudioFrame | when the first local audio frame is sent |
| onFirstRemoteAudioFrame | when the first remote audio frame is sent |
| onVideoStopped | when video stopped |
| onFirstLocalVideoFrame | when first local video frame is sent |
| onFirstRemoteVideoDecoded | when first remote video is decoded |
| onFirstRemoteVideoFrame | when first remote video frame is rendered |
| onUserMuteAudio | when a remote user's audio stream is muted/unmuted |
| onUserMuteVideo | when a remote user's video stream is muted/unmuted |
| onUserEnableVideo | when a remote user enables/disables the video module |
| onUserEnableLocalVideo | when a remote user enables/disables the local video capture function |
| onVideoSizeChanged | when the video size or rotation information of a specified remote user changes |
| onRemoteVideoStateChanged | when the remote video stream state changes |
| onLocalPublishFallbackToAudioOnly | when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve |
| onRemoteSubscribeFallbackToAudioOnly | when the subscribed media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve |
| onAudioRouteChanged | when the local audio pkayout route changes |
| onCameraReady | when the camera is turned on and ready to capture video |
| onCameraFocusAreaChanged | when the camera focus area is changed |
| onCameraExposureAreaChanged | The camera exposure area has changed |
| onAudioQuality | Reports the statistics of the audio stream from each remote user/host |
| onRtcStats | Reports the statistics of the RtcEngine once every two seconds |
| onLastmileQuality | Reports the last mile network quality of the local user once every two seconds before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server. After the application calls the enableLastmileTest method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel. |
| onNetworkQuality | Reports the last mile network quality of each user in the channel once every two seconds. Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the uplink last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times. |
| onLocalVideoStats | Reports the statistics of the uploading local video streams. This callback is triggered once every two seconds for each individual user/host. If there are multiple users/hosts in the channel, this callback is triggered multiple times every 2 seconds. |
| onRemoteVideoStats | Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times. This callback reports statistics more closely linked to the real-user experience of the video transmission quality than the statistics that the onRemoteVideoTransportStats callback reports |
| onRemoteAudioStats | Reports the statistics of the audio stream from each remote user/host |
| onLocalVideoStat | Reports the statistics of the uploading local video streams |
| onRemoteVideoStat | Reports the statistics of the video stream from each remote user/host.|
| onRemoteAudioTransportStats | Reports the transport-layer statistics of each remote audio stream.This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives an audio packet from a remote user. |
| onRemoteVideoTransportStats | Reports the transport-layer statistics of each remote video stream.This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives the video packet from a remote user. |
| onAudioMixingFinished | when the audio mixing file playback finishes. |
| onAudioEffectFinished | when the audio effect file playback finishes. |
| onStreamPublished | when a CDN live stream is published. |
| onStreamUnpublished | when CDN live streaming stops. |
| onTranscodingUpdated | when the publisher's transcoding settings are updated. |
| onStreamInjectedStatus | Reports the status of the injected online media stream. |
| onStreamMessage | recevied stream message peer endpoint |
| onStreamMessageError | recevied error message from peer endpoint stream message |
| onMediaEngineLoadSuccess | when the media engine is loaded. |
| onMediaEngineStartCallSuccess | when the media engine starts. |

##### AgoraView 组件

| Name           | Description          |
| -------------- | -------------------- |
| showLocalVideo | 是否显示本地视频（bool）       |
| remoteUid      | 显示远程视频（number 传入uid） |
| zOrderMediaOverlay (Android only)      | 多视频界面覆盖 设置为true优先在上层（bool） |


## 运行示例

- 更新示例 React-Native为0.58

[Samples](./samples/README.md)


## 更新信息
#### 2.3.3-alpha
- support agora video sdk 2.3.3
- release 2.3.3-alpha.3
- release 2.3.3-alpha.4 (remove deprecated native api)


#### 1.1.2
- 增加onVideoMute
- 新增onAudioMute回调

#### 1.1.1

- 新增方法 创建数据流通道 createDataStream
- 新增方法 发送数据流 sendStreamMessage
- 新增监听数据流事件 onStreamMessage

#### 1.0.9

- 更新Agora SDK 为 2.0.2

- 新增方法 是否开启人脸对焦功能 setCameraAutoFocusFaceModeEnabled

- 新增方法 修改默认的语音路由 setDefaultAudioRouteToSpeakerphone

- 新增方法 是否打开闪光灯 setCameraTorchOn

- 修复 Android 说话者音量提示bug

#### 1.0.8

 - 更新 Agora SDK 为 1.12

 - init 不再默认开启视频预览 根据自己需求和时机调用startPreview

 - init options 新增参数  是否交换宽和高 swapWidthAndHeight 默认false

 - 新增方法 配置旁路直播推流方法 configPublisher

 - 新增方法 设置本地视频显示模式 setLocalRenderMode

 - 新增方法 设置远端视频显示模式 setRemoteRenderMode

 - 新增方法 启用说话者音量提示 enableAudioVolumeIndication

 - 新增音量提示回调 onAudioVolumeIndication

 - Android AgoraView 新增zOrderMediaOverlay属性 解决多视频界面覆盖 设置为true优先在上层
