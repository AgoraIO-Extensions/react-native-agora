import { IRtcEngine, ChannelMediaOptions } from './IAgoraRtcEngine';
import {
  VideoEncoderConfiguration,
  VideoCanvas,
  VideoStreamType,
  SpatialAudioParams,
  VideoMirrorModeType,
  ConnectionStateType,
  EncryptionConfig,
  DataStreamConfig,
  WatermarkOptions,
  UserInfo,
  VideoSourceType,
  SimulcastStreamConfig,
} from './AgoraBase';
import { RenderModeType } from './AgoraMediaBase';

export class RtcConnection {
  channelId?: string;
  localUid?: number;
}

export abstract class IRtcEngineEx extends IRtcEngine {
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  abstract leaveChannelEx(connection: RtcConnection): number;

  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  abstract setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number;

  abstract setupRemoteVideoEx(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): number;

  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  abstract setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number;

  abstract setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number;

  abstract setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number;

  abstract enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number;

  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  abstract createDataStreamEx(
    reliable: boolean,
    ordered: boolean,
    connection: RtcConnection
  ): number;

  abstract createDataStreamEx2(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;

  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  abstract sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number;

  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  abstract getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo;

  abstract getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo;

  abstract setVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): number;

  abstract enableDualStreamModeEx(
    sourceType: VideoSourceType,
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  abstract addPublishStreamUrlEx(
    url: string,
    transcodingEnabled: boolean,
    connection: RtcConnection
  ): number;
}
