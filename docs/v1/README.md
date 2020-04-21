##### 有任何问题欢迎加入QQ群进行反馈  471757030

# react-native-agora

[![npm](https://img.shields.io/npm/v/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dm/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/dt/react-native-agora.svg)](https://www.npmjs.com/package/react-native-agora)
[![npm](https://img.shields.io/npm/l/react-native-agora.svg)](https://github.com/syanbo/react-native-agora/blob/master/LICENSE)
[![join chat](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/react-native-agora/community)

## 功能介绍

- 支持 iOS Android  声网Agora视频通讯SDK
- 支持 直播 多人视频会议 语音 功能

## 安装使用

Install with npm:

 `npm install --save react-native-agora`

Or, install with yarn:

 `yarn add react-native-agora`

Either way, then link with:

 `react-native link react-native-agora`

### [iOS Installation](installation.ios.md)
### [iOS 开发环境安装指南](installation.ios.zh.md)

### [Android Installation](installation.android.md)
### [Android 开发环境安装指南](installation.android.zh.md)

## Documentation

[声网API文档](https://docs.agora.io/cn/2.0.2/product/Video/API%20Reference/communication_android_video?platform=Android)

##### RtcEngine方法

| Property                         | Type                                     | Description                           |
| -------------------------------- | ---------------------------------------- | ------------------------------------- |
| init                             | object {appid: 'agora注册的应用id', channelProfile: '频道模式', videoProfile: '视频模式', clientRole: '角色', swapWidthAndHeight: 'bool值'} | 初始化Agora引擎                            |
| joinChannel                      | string channelName （房间名称）   number uid （用户设置的uid 传0系统会自动分配） | 加入房间                                  |
| leaveChannel                     |                                          | 离开频道                                  |
| destroy                          |                                          | 销毁引擎实例                                |
| configPublisher                     | object{} config参数请前往Agora文档查看                                        | 配置旁路直播推流方法                               |
| setLocalRenderMode                     | number mode (1 2 3)                                        | 设置本地视频显示模式                                |
| setRemoteRenderMode                     | number uid  number mode (1 2 3)                                          | 设置远端视频显示模式                                |
| enableAudioVolumeIndication                     | number interval (时间间隔) number smooth(平滑系数。可以设置为 3)                                         | 启用说话者音量提示                                |
| startPreview                     |                                          | 开启视频预览                                |
| stopPreview                      |                                          | 关闭视频预览                                |
| switchCamera                     |                                          | 切换前置/后置摄像头                            |
| enableVideo                      |                                          | 开启视频模式                                |
| disableVideo                     |                                          | 关闭视频                                  |
| setCameraAutoFocusFaceModeEnabled                     |                                          | 是否开启人脸对焦功能                                  |
| setDefaultAudioRouteToSpeakerphone                     |                                          | 修改默认的语音路由                                  |
| setCameraTorchOn                     |                                          | 是否打开闪光灯                                  |
| setEnableSpeakerphone            | bool                                     | 开启扬声器  trun: 音频输出至扬声器  false: 音频输出至听筒 |
| muteLocalAudioStream             | bool (default false)                     | 将自己静音                                 |
| muteAllRemoteAudioStreams        | bool (default false)                     | 静音所有远端 音频                             |
| muteRemoteAudioStream            | number uid（用户uid） bool  mute（是否静音）       | 静音指定用户 音频                             |
| muteLocalVideoStream             | bool (default false)                     | 暂停发送本地 视频流                            |
| enableLocalVideo                 | bool (default false)                     | 禁用本地视频功能                              |
| muteAllRemoteVideoStreams        | bool (default false)                     | 暂停所有远端视频流                             |
| muteRemoteVideoStream            | number uid（用户uid） bool  mute（是否暂停）       | 暂停指定远端视频流                             |
| startRecordingService (iOS only) | string  recordingKey                     | 启动服务端录制服务                             |
| stopRecordingService (iOS only)  | string  recordingKey                     | 停止服务端录制服务                             |
| getSdkVersion                    | callback                                 | 获取版本号                                 |
| createDataStream | (boolean reliable, boolean ordered, (streamId) => {}), 其中 reliable, ordered 请参考官方文档同名方法说明 | 创建数据流通道 |
| sendStreamMessage | (number streamId, string message, (errorCode) => {})| 发送数据 |

##### 原生通知事件

```
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
| onFirstRemoteVideoDecoded | 远端首帧视频接收解码回调 |
| onJoinChannelSuccess      | 加入频道成功的回调    |
| onUserOffline             | 其他用户离开当前频道   |
| onUserJoined              | 其他用户加入当前频道   |
| onError                   | 错误信息         |
| onWarning                 | 警告           |
| onLeaveChannel            | 退出频道         |
| onAudioVolumeIndication            | 音量提示回调         |
| onStreamMessage | 接收到对方数据流消息的回调 |
| onStreamMessageError | 接收到对方数据流消息错误的回调 |


##### AgoraView 组件

| Name           | Description          |
| -------------- | -------------------- |
| showLocalVideo | 是否显示本地视频（bool）       |
| remoteUid      | 显示远程视频（number 传入uid） |
| zOrderMediaOverlay (Android only)      | 多视频界面覆盖 设置为true优先在上层（bool） |


## 运行示例

- 更新示例 React-Native为0.51
- 优化代码

[Samples](../../samples/README.md)


## 更新信息
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
