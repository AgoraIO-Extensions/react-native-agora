import { View, ViewProps } from 'react-native';

declare module "IAgora";

export interface IRtcEngineOption {
  appid: string,
  videoProfile: number
  channelProfile: number,
}

export interface IRTCEngineEventScheduler {
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

export type Nullable<T> = T | null | undefined;

export type String = Nullable<string>;
export type Integer = Nullable<number> | 0;

export interface IAgoraViewProps extends ViewProps {
  showLocalVideo: boolean,
  remoteUid: Integer,
  zOrderMediaOverlay: boolean
}