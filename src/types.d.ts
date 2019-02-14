import { View, ViewProps } from 'react-native';

declare module "IAgora";

export interface VideoEncoderConfig {
  width: number,
  height: number,
  bitrate: number,
  frameRate: number,
  orientationMode: number,
}

export interface Option {
  appid: String,
  videoProfile: number
  channelProfile: number,
  videoEncoderConfig: VideoEncoderConfig,
  clientRole: number,
  audioProfile: number,
  audioScenario: number
}

export interface PublisherConfig {
  width: number,
  height: number,
  framerate: number,
  bitrate: number,
  defaultLayout: number,
  lifeCycle: number,
  pubishUrl: string,
  rawStreamUrl: string,
  extraInfo: String,
  owner: boolean
}

export interface BackgroundImage {
  url: string,
  x: number,
  y: number,
  width: number,
  height: number
}

export interface Rect {
  x: number,
  y: number,
  width: number,
  height: number
}

export interface Size {
  width: number,
  height: number
}

export interface TranscodingUser {
  uid: number,
  zOrder: number,
  rect: Rect,
  alpha: number,
  audioChannel: number
}

export interface Color {
  red: number,
  green: number,
  blue: number,
  alpha: number
}

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

export interface VideoOption {
  uid: Number,
  renderMode: number,
  reactTag: number
}

export interface EventScheduler {
  onWarning: Function,
 
  onError: Function,
   
  onJoinChannelSuccess: Function,
   
  onRejoinChannelSuccess: Function,
   
  onLeaveChannel: Function,
   
  onClientRoleChanged: Function,
   
  onUserJoined: Function,
   
  onUserOffline: Function,
   
  onConnectionStateChanged: Function,
   
  onConnectionInterrupted?: Function,
   
  onConnectionLost: Function,
   
  onConnectionBanned: Function,
   
  onApiCallExecuted: Function,
   
  onTokenPrivilegeWillExpire: Function,
   
  onRequestToken: Function,
   
  onMicrophoneEnabled: Function,
   
  onAudioVolumeIndication: Function,
   
  onActiveSpeaker: Function,
   
  onFirstLocalAudioFrame: Function,
   
  onFirstRemoteAudioFrame: Function,
   
  onVideoStopped: Function,
   
  onFirstLocalVideoFrame: Function,
   
  onFirstRemoteVideoDecoded: Function,
   
  onFirstRemoteVideoFrame: Function,
   
  onUserMuteAudio: Function,
   
  onUserMuteVideo: Function,
   
  onUserEnableVideo: Function,
   
  onUserEnableLocalVideo: Function,
   
  onVideoSizeChanged: Function,
   
  onRemoteVideoStateChanged: Function,
   
  onLocalPublishFallbackToAudioOnly: Function,
   
  onRemoteSubscribeFallbackToAudioOnly: Function,
   
  onAudioRouteChanged: Function,
   
  onCameraReady: Function,
   
  onCameraFocusAreaChanged: Function,
   
  onCameraExposureAreaChanged: Function,
   
  onAudioQuality: Function,
   
  onRtcStats: Function,
   
  onLastmileQuality: Function,
   
  onNetworkQuality: Function,
   
  onLocalVideoStats: Function,
   
  onRemoteVideoStats: Function,
   
  onRemoteAudioStats: Function,
   
  onLocalVideoStat: Function,
   
  onRemoteVideoStat: Function,
   
  onRemoteAudioTransportStats: Function,
   
  onRemoteVideoTransportStats: Function,
   
  onAudioMixingFinished: Function,
   
  onAudioEffectFinished: Function,
   
  onStreamPublished: Function,
   
  onStreamUnpublished: Function,
   
  onTranscodingUpdated: Function,
   
  onStreamInjectedStatus: Function,
   
  onStreamMessage: Function,
   
  onStreamMessageError: Function,
   
  onMediaEngineLoadSuccess: Function,
   
  onMediaEngineStartCallSuccess: Function,
  // onWarning: Function,
  // onError: Function,
  // onJoinChannelSuccess: Function,
  // onRejoinChannelSuccess: Function,
  // onLeaveChannel: Function,
  // onApiCallExecute: Function,
  // onClientRoleChanged: Function,
  // onUserJoined: Function,
  // onUserOffline: Function,
  // onConnectionStateChanged: Function,
  // onConnectionInterrupted: Function,
  // onTokenPrivilegeWillExpire: Function,
  // onRequestToken: Function,
  
  // DidMicrophoneEnabled: Function,
  // ReportAudioVolumeIndicationOfSpeakers: Function,
  // ActiveSpeaker: Function,
  // FirstLocalAudioFrame: Function,
  // FirstRemoteAudioFrameOfUid: Function,
  // VideoDidStop: Function,
  // FirstLocalVideoFrameWithSize: Function,
  // FirstRemoteVideoDecodedOfUid: Function,
  // FirstRemoteVideoFrameOfUid: Function,
  // DidAudioMuted: Function,
  // DidVideoMuted: Function,
  // DidVideoEnabled: Function,
  // DidLocalVideoEnabled: Function,
  // VideoSizeChangedOfUid: Function,
  // RemoteVideoStateChangedOfUid: Function,
  // DidLocalPublishFallbackToAudioOnly: Function,
  // DidRemoteSubscribeFallbackToAudioOnly: Function,
  
  // DeviceTypeStateChanged: Function,
  // DidAudioRouteChanged: Function,
  // CameraDidReady: Function,
  // CameraFocusDidChangedToRect: Function,
  // CameraExposureDidChangedToRect: Function,
  
  // ReportRtcStats: Function,
  // LastmileQuality: Function,
  // NetworkQuality: Function,
  // LocalVideoStats: Function,
  // RemoteVideoStats: Function,
  // RemoteAudioStats: Function,
  // AudioTransportStatsOfUid: Function,
  // VideoTransportStatsOfUid: Function,
  
  // LocalAudioMixingDidFinish: Function,
  // RemoteAudioMixingDidStart: Function,
  // RemoteAudioMixingDidFinish: Function,
  // DidAudioEffectFinish: Function,
  
  // StreamPublished: Function,
  // StreamUnpublish: Function,
  // TranscodingUpdated: Function,
  
  // StreamInjectedStatus: Function,
  
  // ReceiveStreamMessage: Function,
  // DidOccurStreamMessageError: Function,
  
  // MediaEngineDidLoaded: Function,
  // MediaEngineDidStartCall: Function,
  
  // ConnectionDidInterrupted: Function,
  // ConnectionDidBanned: Function,
  // AudioQualityOfUi: Function
}

export type Callback<T> = (err: any, data: any) => T;

export type Nullable<T> = T | null | undefined;

export type String = Nullable<string>;
export type Number = Nullable<number> | 0;

export interface AgoraViewProps extends ViewProps {
  showLocalVideo: boolean,
  remoteUid: Number,
  zOrderMediaOverlay: boolean,
  [key:string]: any;
}