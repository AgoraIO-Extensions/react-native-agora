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
  // onFirstRemoteVideoDecoded: Function,
  // onJoinChannelSuccess: Function,
  // onUserOffline: Function,
  // onUserJoined: Function,
  // onError: Function,
  // onWarning: Function,
  // onLeaveChannel: Function,
  // onAudioVolumeIndication: Function,
  // onStreamMessage: Function,
  // onStreamMessageError: Function
  DidOccurWarning: Function,
  DidOccurError: Function,
  DidApiCallExecute: Function,
  DidJoinChannel: Function,
  DidRejoinChannel: Function,
  DidLeaveChannel: Function,
  LeaveChannel: Function,
  DidClientRoleChanged: Function,
  DidJoinedOfUid: Function,
  DidOfflineOfUid: Function,
  ConnectionChangedToState: Function,
  ConnectionDidLost: Function,
  TokenPrivilegeWillExpire: Function,
  RequestToken: Function,
  
  DidMicrophoneEnabled: Function,
  ReportAudioVolumeIndicationOfSpeakers: Function,
  ActiveSpeaker: Function,
  FirstLocalAudioFrame: Function,
  FirstRemoteAudioFrameOfUid: Function,
  VideoDidStop: Function,
  FirstLocalVideoFrameWithSize: Function,
  FirstRemoteVideoDecodedOfUid: Function,
  FirstRemoteVideoFrameOfUid: Function,
  DidAudioMuted: Function,
  DidVideoMuted: Function,
  DidVideoEnabled: Function,
  DidLocalVideoEnabled: Function,
  VideoSizeChangedOfUid: Function,
  RemoteVideoStateChangedOfUid: Function,
  DidLocalPublishFallbackToAudioOnly: Function,
  DidRemoteSubscribeFallbackToAudioOnly: Function,
  
  DeviceTypeStateChanged: Function,
  DidAudioRouteChanged: Function,
  CameraDidReady: Function,
  CameraFocusDidChangedToRect: Function,
  CameraExposureDidChangedToRect: Function,
  
  ReportRtcStats: Function,
  LastmileQuality: Function,
  NetworkQuality: Function,
  LocalVideoStats: Function,
  RemoteVideoStats: Function,
  RemoteAudioStats: Function,
  AudioTransportStatsOfUid: Function,
  VideoTransportStatsOfUid: Function,
  
  LocalAudioMixingDidFinish: Function,
  RemoteAudioMixingDidStart: Function,
  RemoteAudioMixingDidFinish: Function,
  DidAudioEffectFinish: Function,
  
  StreamPublished: Function,
  StreamUnpublish: Function,
  TranscodingUpdated: Function,
  
  StreamInjectedStatus: Function,
  
  ReceiveStreamMessage: Function,
  DidOccurStreamMessageError: Function,
  
  MediaEngineDidLoaded: Function,
  MediaEngineDidStartCall: Function,
  
  ConnectionDidInterrupted: Function,
  ConnectionDidBanned: Function,
  AudioQualityOfUi: Function
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