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
  clientRole: number
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
  onFirstRemoteVideoDecoded: Function,
  onJoinChannelSuccess: Function,
  onUserOffline: Function,
  onUserJoined: Function,
  onError: Function,
  onWarning: Function,
  onLeaveChannel: Function,
  onAudioVolumeIndication: Function,
  onStreamMessage: Function,
  onStreamMessageError: Function
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