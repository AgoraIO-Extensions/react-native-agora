import { View, ViewProps } from 'react-native';

declare module "IAgora"

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

export interface LiveTranscodingOption {
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
  uid: number,
  renderMode: number,
  reactTag: number
}

export interface AudioRecordingOption {
  filepath: String,
  quality: number
}

export type Callback<T> = (err: any, data: any) => T;

export type Nullable<T> = T | null | undefined;

export type String = Nullable<string>;
export type Number = Nullable<number> | 0;

export interface AgoraViewProps extends ViewProps {
  showLocalVideo: boolean,
  remoteUid: number,
  zOrderMediaOverlay: boolean,
  [key:string]: any;
}

export interface DataStreamOption {
  streamId: number,
  ordered: boolean,
  reliable: boolean
}

export interface AudioMixingOption {
  filepath: String,
  loopback: boolean,
  replace: boolean,
  cycle: number
}

export interface PlayEffectOption {
  soundId: number,
  filepath: String,
  loopcount: number,
  pitch: number,
  pan: number,
  gain: number,
  publish: boolean
}

export interface AudioFrameOption {
  sampleRate: number,
  channel: number,
  mode: number,
  samplesPerCall: number
}

export interface MixedAudioFrameOption {
  sampleRate: number,
  samplesPerCall: number
}

export interface ImageOption {
  url: String,
  height: number,
  width: number,
  x: number,
  y: number
}

export interface VideoStreamOption {
  uid: number,
  streamType: number
}

export interface DefaultVideoStreamOption {
  streamType: number
}

export interface InjectStreamOption {
  url: String,
  config: {
    size: {
      width: number,
      height: number,
    },
    videoGop: number,
    videoBitrate: number,
    videoFramerate: number,
    audioBitrate: number,
    audioSampleRate: number,
    audioChannels: number
  }
}

export interface RemoveInjectStreamOption {
  url: String
}

export interface PublishStreamOption {
  url: String,
  enable: boolean
}

export interface RemovePublishStreamOption {
  url: String
}

export interface PositionOption {
  x: number,
  y: number
}