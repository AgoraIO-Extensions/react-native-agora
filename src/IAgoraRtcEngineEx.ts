import './extension/IAgoraRtcEngineExExtension';
import {
  IRtcEngine,
  ChannelMediaOptions,
  LeaveChannelOptions,
} from './IAgoraRtcEngine';
import {
  VideoEncoderConfiguration,
  VideoCanvas,
  VideoStreamType,
  VideoSubscriptionOptions,
  SpatialAudioParams,
  VideoMirrorModeType,
  ConnectionStateType,
  EncryptionConfig,
  DataStreamConfig,
  WatermarkOptions,
  LiveTranscoding,
  ChannelMediaRelayConfiguration,
  UserInfo,
  SimulcastStreamConfig,
  SimulcastStreamMode,
} from './AgoraBase';
import { RenderModeType } from './AgoraMediaBase';
/* class_rtcconnection */
export class RtcConnection {
  /* class_rtcconnection_channelId */
  channelId?: string;
  /* class_rtcconnection_localUid */
  localUid?: number;
}

/* class_irtcengineex */
export abstract class IRtcEngineEx extends IRtcEngine {
  /* api_irtcengineex_joinchannelex */
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  /* api_irtcengineex_leavechannelex */
  abstract leaveChannelEx(
    connection: RtcConnection,
    options?: LeaveChannelOptions
  ): number;

  /* api_irtcengineex_updatechannelmediaoptionsex */
  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setvideoencoderconfigurationex */
  abstract setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setupremotevideoex */
  abstract setupRemoteVideoEx(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_muteremoteaudiostreamex */
  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_muteremotevideostreamex */
  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setremotevideostreamtypeex */
  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_mutelocalaudiostreamex */
  abstract muteLocalAudioStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_mutelocalvideostreamex */
  abstract muteLocalVideoStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_muteallremoteaudiostreamsex */
  abstract muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_muteallremotevideostreamsex */
  abstract muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setsubscribeaudioblocklistex */
  abstract setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setsubscribeaudioallowlistex */
  abstract setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setsubscribevideoblocklistex */
  abstract setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setsubscribevideoallowlistex */
  abstract setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setremotevideosubscriptionoptionsex */
  abstract setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setremotevoicepositionex */
  abstract setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setremoteuserspatialaudioparamsex */
  abstract setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setremoterendermodeex */
  abstract setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_enableloopbackrecordingex */
  abstract enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number;

  /* api_irtcengineex_adjustuserplaybacksignalvolumeex */
  abstract adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_getconnectionstateex */
  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  /* api_irtcengineex_enableencryptionex */
  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  /* api_irtcengineex_createdatastreamex */
  abstract createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_sendstreammessageex */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_addvideowatermarkex */
  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_clearvideowatermarkex */
  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  /* api_irtcengineex_sendcustomreportmessageex */
  abstract sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_enableaudiovolumeindicationex */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_startrtmpstreamwithouttranscodingex */
  abstract startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_startrtmpstreamwithtranscodingex */
  abstract startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_updatertmptranscodingex */
  abstract updateRtmpTranscodingEx(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_stoprtmpstreamex */
  abstract stopRtmpStreamEx(url: string, connection: RtcConnection): number;

  /* api_irtcengineex_startchannelmediarelayex */
  abstract startChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_updatechannelmediarelayex */
  abstract updateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_stopchannelmediarelayex */
  abstract stopChannelMediaRelayEx(connection: RtcConnection): number;

  /* api_irtcengineex_pauseallchannelmediarelayex */
  abstract pauseAllChannelMediaRelayEx(connection: RtcConnection): number;

  /* api_irtcengineex_resumeallchannelmediarelayex */
  abstract resumeAllChannelMediaRelayEx(connection: RtcConnection): number;

  /* api_irtcengineex_getuserinfobyuseraccountex */
  abstract getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo;

  /* api_irtcengineex_getuserinfobyuidex */
  abstract getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo;

  /* api_irtcengineex_setvideoprofileex */
  abstract setVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): number;

  /* api_irtcengineex_enabledualstreammodeex */
  abstract enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_setdualstreammodeex */
  abstract setDualStreamModeEx(
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /* api_irtcengineex_enablewirelessaccelerate */
  abstract enableWirelessAccelerate(enabled: boolean): number;

  /* api_irtcengineex_takesnapshotex */
  abstract takeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): number;
}
