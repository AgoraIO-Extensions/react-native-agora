import { View, ViewProps } from 'react-native';

declare module "IAgora";

export interface IVideoEncoderConfig {
  width: number,
  height: number,
  bitrate: number,
  frameRate: number,
  orientationMode: number,
};
export interface IOption {
  appid: String,
  videoProfile: number
  channelProfile: number,
  videoEncoderConfig: IVideoEncoderConfig,
  clientRole: number
}

export interface IPublisherConfig {
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

export interface IBackgroundImage {
  url: string,
  x: number,
  y: number,
  width: number,
  height: number
}

export interface IRect {
  x: number,
  y: number,
  width: number,
  height: number
};

export interface ISize {
  width: number,
  height: number
};

export interface ITranscodingUser {
  uid: number,
  zOrder: number,
  rect: Rect,
  alpha: number,
  audioChannel: number
};

export interface IColor {
  red: number,
  green: number,
  blue: number,
  alpha: number
};

export interface ILiveTranscoding {
  size: ISize,
  videoBitrate: number,
  videoFramerate: number,
  lowLatency: boolean,
  videoGop: number,
  videoCodecProfile: number,
  transcodingUsers: Array<ITranscodingUser>,
  transcodingExtraInfo: string,
  watermark: IBackgroundImage,
  backgroundImage: IBackgroundImage,
  backgroundColor: IColor,
  audioSampleRate: number,
  audioBitrate: number,
  audioChannels: number,
};

export interface IVideoOption {
  uid: Number,
  renderMode: number,
  reactTag: number
}

export interface IEventScheduler {
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

export type ICallback<T> = (err, data) => T;

export type Nullable<T> = T | null | undefined;

export type String = Nullable<string>;
export type Number = Nullable<number> | 0;

export interface IAgoraViewProps extends ViewProps {
  showLocalVideo: boolean,
  remoteUid: Number,
  zOrderMediaOverlay: boolean
}