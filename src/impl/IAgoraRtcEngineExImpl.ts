import {
  ChannelMediaRelayConfiguration,
  ConnectionStateType,
  DataStreamConfig,
  EncryptionConfig,
  LiveTranscoding,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  SpatialAudioParams,
  UserInfo,
  VideoCanvas,
  VideoEncoderConfiguration,
  VideoMirrorModeType,
  VideoStreamType,
  VideoSubscriptionOptions,
  WatermarkOptions,
} from '../AgoraBase';
import { ContentInspectConfig, RenderModeType } from '../AgoraMediaBase';
import {
  ChannelMediaOptions,
  LeaveChannelOptions,
  StreamFallbackOptions,
} from '../IAgoraRtcEngine';
import { IRtcEngineEx, RtcConnection } from '../IAgoraRtcEngineEx';

import { IRtcEngineImpl } from './IAgoraRtcEngineImpl';

// @ts-ignore
export class IRtcEngineExImpl extends IRtcEngineImpl implements IRtcEngineEx {
  joinChannelEx(): {
    token: string;
    connection: RtcConnection;
    options: ChannelMediaOptions;
  } {
    const apiType = this.getApiTypeFromJoinChannelEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    const connection = jsonResults.connection;
    const options = jsonResults.options;
    return {
      token,
      connection,
      options,
    };
  }

  protected getApiTypeFromJoinChannelEx(): string {
    return 'RtcEngineEx_joinChannelEx';
  }

  leaveChannelEx(): {
    connection: RtcConnection;
    options: LeaveChannelOptions;
  } {
    const apiType = this.getApiTypeFromLeaveChannelEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    const options = jsonResults.options;
    return {
      connection,
      options,
    };
  }

  protected getApiTypeFromLeaveChannelEx(): string {
    return 'RtcEngineEx_leaveChannelEx';
  }

  updateChannelMediaOptionsEx(): {
    options: ChannelMediaOptions;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromUpdateChannelMediaOptionsEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    const connection = jsonResults.connection;
    return {
      options,
      connection,
    };
  }

  protected getApiTypeFromUpdateChannelMediaOptionsEx(): string {
    return 'RtcEngineEx_updateChannelMediaOptionsEx';
  }

  setVideoEncoderConfigurationEx(): {
    config: VideoEncoderConfiguration;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromSetVideoEncoderConfigurationEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    const connection = jsonResults.connection;
    return {
      config,
      connection,
    };
  }

  protected getApiTypeFromSetVideoEncoderConfigurationEx(): string {
    return 'RtcEngineEx_setVideoEncoderConfigurationEx';
  }

  setupRemoteVideoEx(): { canvas: VideoCanvas; connection: RtcConnection } {
    const apiType = this.getApiTypeFromSetupRemoteVideoEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const canvas = jsonResults.canvas;
    const connection = jsonResults.connection;
    return {
      canvas,
      connection,
    };
  }

  protected getApiTypeFromSetupRemoteVideoEx(): string {
    return 'RtcEngineEx_setupRemoteVideoEx';
  }

  muteRemoteAudioStreamEx(uid: number, mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteRemoteAudioStreamEx(uid, mute);
    const jsonParams = {
      uid: uid,
      mute: mute,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteRemoteAudioStreamEx(
    uid: number,
    mute: boolean
  ): string {
    return 'RtcEngineEx_muteRemoteAudioStreamEx';
  }

  muteRemoteVideoStreamEx(uid: number, mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteRemoteVideoStreamEx(uid, mute);
    const jsonParams = {
      uid: uid,
      mute: mute,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteRemoteVideoStreamEx(
    uid: number,
    mute: boolean
  ): string {
    return 'RtcEngineEx_muteRemoteVideoStreamEx';
  }

  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetRemoteVideoStreamTypeEx(
      uid,
      streamType
    );
    const jsonParams = {
      uid: uid,
      streamType: streamType,
      toJSON: () => {
        return {
          uid: uid,
          streamType: streamType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType
  ): string {
    return 'RtcEngineEx_setRemoteVideoStreamTypeEx';
  }

  muteLocalAudioStreamEx(mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteLocalAudioStreamEx(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteLocalAudioStreamEx(mute: boolean): string {
    return 'RtcEngineEx_muteLocalAudioStreamEx';
  }

  muteLocalVideoStreamEx(mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteLocalVideoStreamEx(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteLocalVideoStreamEx(mute: boolean): string {
    return 'RtcEngineEx_muteLocalVideoStreamEx';
  }

  muteAllRemoteAudioStreamsEx(mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteAllRemoteAudioStreamsEx(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteAllRemoteAudioStreamsEx(mute: boolean): string {
    return 'RtcEngineEx_muteAllRemoteAudioStreamsEx';
  }

  muteAllRemoteVideoStreamsEx(mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteAllRemoteVideoStreamsEx(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteAllRemoteVideoStreamsEx(mute: boolean): string {
    return 'RtcEngineEx_muteAllRemoteVideoStreamsEx';
  }

  setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetSubscribeAudioBlocklistEx(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngineEx_setSubscribeAudioBlocklistEx';
  }

  setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetSubscribeAudioAllowlistEx(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngineEx_setSubscribeAudioAllowlistEx';
  }

  setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetSubscribeVideoBlocklistEx(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngineEx_setSubscribeVideoBlocklistEx';
  }

  setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetSubscribeVideoAllowlistEx(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngineEx_setSubscribeVideoAllowlistEx';
  }

  setRemoteVideoSubscriptionOptionsEx(uid: number): {
    options: VideoSubscriptionOptions;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromSetRemoteVideoSubscriptionOptionsEx(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    const connection = jsonResults.connection;
    return {
      options,
      connection,
    };
  }

  protected getApiTypeFromSetRemoteVideoSubscriptionOptionsEx(
    uid: number
  ): string {
    return 'RtcEngineEx_setRemoteVideoSubscriptionOptionsEx';
  }

  setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetRemoteVoicePositionEx(uid, pan, gain);
    const jsonParams = {
      uid: uid,
      pan: pan,
      gain: gain,
      toJSON: () => {
        return {
          uid: uid,
          pan: pan,
          gain: gain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number
  ): string {
    return 'RtcEngineEx_setRemoteVoicePositionEx';
  }

  setRemoteUserSpatialAudioParamsEx(uid: number): {
    params: SpatialAudioParams;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromSetRemoteUserSpatialAudioParamsEx(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const params = jsonResults.params;
    const connection = jsonResults.connection;
    return {
      params,
      connection,
    };
  }

  protected getApiTypeFromSetRemoteUserSpatialAudioParamsEx(
    uid: number
  ): string {
    return 'RtcEngineEx_setRemoteUserSpatialAudioParamsEx';
  }

  setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetRemoteRenderModeEx(
      uid,
      renderMode,
      mirrorMode
    );
    const jsonParams = {
      uid: uid,
      renderMode: renderMode,
      mirrorMode: mirrorMode,
      toJSON: () => {
        return {
          uid: uid,
          renderMode: renderMode,
          mirrorMode: mirrorMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): string {
    return 'RtcEngineEx_setRemoteRenderModeEx';
  }

  enableLoopbackRecordingEx(enabled: boolean): {
    connection: RtcConnection;
    deviceName: string;
  } {
    const apiType = this.getApiTypeFromEnableLoopbackRecordingEx(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    const deviceName = jsonResults.deviceName;
    return {
      connection,
      deviceName,
    };
  }

  protected getApiTypeFromEnableLoopbackRecordingEx(enabled: boolean): string {
    return 'RtcEngineEx_enableLoopbackRecordingEx';
  }

  adjustRecordingSignalVolumeEx(volume: number): RtcConnection {
    const apiType = this.getApiTypeFromAdjustRecordingSignalVolumeEx(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromAdjustRecordingSignalVolumeEx(
    volume: number
  ): string {
    return 'RtcEngineEx_adjustRecordingSignalVolumeEx';
  }

  muteRecordingSignalEx(mute: boolean): RtcConnection {
    const apiType = this.getApiTypeFromMuteRecordingSignalEx(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromMuteRecordingSignalEx(mute: boolean): string {
    return 'RtcEngineEx_muteRecordingSignalEx';
  }

  adjustUserPlaybackSignalVolumeEx(uid: number, volume: number): RtcConnection {
    const apiType = this.getApiTypeFromAdjustUserPlaybackSignalVolumeEx(
      uid,
      volume
    );
    const jsonParams = {
      uid: uid,
      volume: volume,
      toJSON: () => {
        return {
          uid: uid,
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromAdjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number
  ): string {
    return 'RtcEngineEx_adjustUserPlaybackSignalVolumeEx';
  }

  getConnectionStateEx(): {
    connection: RtcConnection;
    result: ConnectionStateType;
  } {
    const apiType = this.getApiTypeFromGetConnectionStateEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    const result = jsonResults.result;
    return {
      connection,
      result,
    };
  }

  protected getApiTypeFromGetConnectionStateEx(): string {
    return 'RtcEngineEx_getConnectionStateEx';
  }

  enableEncryptionEx(enabled: boolean): {
    connection: RtcConnection;
    config: EncryptionConfig;
  } {
    const apiType = this.getApiTypeFromEnableEncryptionEx(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    const config = jsonResults.config;
    return {
      connection,
      config,
    };
  }

  protected getApiTypeFromEnableEncryptionEx(enabled: boolean): string {
    return 'RtcEngineEx_enableEncryptionEx';
  }

  createDataStreamEx(config: DataStreamConfig): {
    streamId: number;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromCreateDataStreamEx(config);
    const jsonParams = {
      config: config,
      toJSON: () => {
        return {
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamId = jsonResults.streamId;
    const connection = jsonResults.connection;
    return {
      streamId,
      connection,
    };
  }

  protected getApiTypeFromCreateDataStreamEx(config: DataStreamConfig): string {
    return 'RtcEngineEx_createDataStreamEx';
  }

  sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number
  ): RtcConnection {
    const apiType = this.getApiTypeFromSendStreamMessageEx(
      streamId,
      data,
      length
    );
    const jsonParams = {
      streamId: streamId,
      data: data,
      length: length,
      toJSON: () => {
        return {
          streamId: streamId,
          length: length,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number
  ): string {
    return 'RtcEngineEx_sendStreamMessageEx';
  }

  addVideoWatermarkEx(): {
    watermarkUrl: string;
    options: WatermarkOptions;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromAddVideoWatermarkEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const watermarkUrl = jsonResults.watermarkUrl;
    const options = jsonResults.options;
    const connection = jsonResults.connection;
    return {
      watermarkUrl,
      options,
      connection,
    };
  }

  protected getApiTypeFromAddVideoWatermarkEx(): string {
    return 'RtcEngineEx_addVideoWatermarkEx';
  }

  clearVideoWatermarkEx(): RtcConnection {
    const apiType = this.getApiTypeFromClearVideoWatermarkEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromClearVideoWatermarkEx(): string {
    return 'RtcEngineEx_clearVideoWatermarkEx';
  }

  sendCustomReportMessageEx(value: number): {
    id: string;
    category: string;
    event: string;
    label: string;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromSendCustomReportMessageEx(value);
    const jsonParams = {
      value: value,
      toJSON: () => {
        return {
          value: value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const id = jsonResults.id;
    const category = jsonResults.category;
    const event = jsonResults.event;
    const label = jsonResults.label;
    const connection = jsonResults.connection;
    return {
      id,
      category,
      event,
      label,
      connection,
    };
  }

  protected getApiTypeFromSendCustomReportMessageEx(value: number): string {
    return 'RtcEngineEx_sendCustomReportMessageEx';
  }

  enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): RtcConnection {
    const apiType = this.getApiTypeFromEnableAudioVolumeIndicationEx(
      interval,
      smooth,
      reportVad
    );
    const jsonParams = {
      interval: interval,
      smooth: smooth,
      reportVad: reportVad,
      toJSON: () => {
        return {
          interval: interval,
          smooth: smooth,
          reportVad: reportVad,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromEnableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): string {
    return 'RtcEngineEx_enableAudioVolumeIndicationEx';
  }

  startRtmpStreamWithoutTranscodingEx(): {
    url: string;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromStartRtmpStreamWithoutTranscodingEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const url = jsonResults.url;
    const connection = jsonResults.connection;
    return {
      url,
      connection,
    };
  }

  protected getApiTypeFromStartRtmpStreamWithoutTranscodingEx(): string {
    return 'RtcEngineEx_startRtmpStreamWithoutTranscodingEx';
  }

  startRtmpStreamWithTranscodingEx(): {
    url: string;
    transcoding: LiveTranscoding;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromStartRtmpStreamWithTranscodingEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const url = jsonResults.url;
    const transcoding = jsonResults.transcoding;
    const connection = jsonResults.connection;
    return {
      url,
      transcoding,
      connection,
    };
  }

  protected getApiTypeFromStartRtmpStreamWithTranscodingEx(): string {
    return 'RtcEngineEx_startRtmpStreamWithTranscodingEx';
  }

  updateRtmpTranscodingEx(): {
    transcoding: LiveTranscoding;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromUpdateRtmpTranscodingEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const transcoding = jsonResults.transcoding;
    const connection = jsonResults.connection;
    return {
      transcoding,
      connection,
    };
  }

  protected getApiTypeFromUpdateRtmpTranscodingEx(): string {
    return 'RtcEngineEx_updateRtmpTranscodingEx';
  }

  stopRtmpStreamEx(): { url: string; connection: RtcConnection } {
    const apiType = this.getApiTypeFromStopRtmpStreamEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const url = jsonResults.url;
    const connection = jsonResults.connection;
    return {
      url,
      connection,
    };
  }

  protected getApiTypeFromStopRtmpStreamEx(): string {
    return 'RtcEngineEx_stopRtmpStreamEx';
  }

  startOrUpdateChannelMediaRelayEx(): {
    configuration: ChannelMediaRelayConfiguration;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromStartOrUpdateChannelMediaRelayEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const configuration = jsonResults.configuration;
    const connection = jsonResults.connection;
    return {
      configuration,
      connection,
    };
  }

  protected getApiTypeFromStartOrUpdateChannelMediaRelayEx(): string {
    return 'RtcEngineEx_startOrUpdateChannelMediaRelayEx';
  }

  startChannelMediaRelayEx(): {
    configuration: ChannelMediaRelayConfiguration;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromStartChannelMediaRelayEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const configuration = jsonResults.configuration;
    const connection = jsonResults.connection;
    return {
      configuration,
      connection,
    };
  }

  protected getApiTypeFromStartChannelMediaRelayEx(): string {
    return 'RtcEngineEx_startChannelMediaRelayEx';
  }

  updateChannelMediaRelayEx(): {
    configuration: ChannelMediaRelayConfiguration;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromUpdateChannelMediaRelayEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const configuration = jsonResults.configuration;
    const connection = jsonResults.connection;
    return {
      configuration,
      connection,
    };
  }

  protected getApiTypeFromUpdateChannelMediaRelayEx(): string {
    return 'RtcEngineEx_updateChannelMediaRelayEx';
  }

  stopChannelMediaRelayEx(): RtcConnection {
    const apiType = this.getApiTypeFromStopChannelMediaRelayEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromStopChannelMediaRelayEx(): string {
    return 'RtcEngineEx_stopChannelMediaRelayEx';
  }

  pauseAllChannelMediaRelayEx(): RtcConnection {
    const apiType = this.getApiTypeFromPauseAllChannelMediaRelayEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromPauseAllChannelMediaRelayEx(): string {
    return 'RtcEngineEx_pauseAllChannelMediaRelayEx';
  }

  resumeAllChannelMediaRelayEx(): RtcConnection {
    const apiType = this.getApiTypeFromResumeAllChannelMediaRelayEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromResumeAllChannelMediaRelayEx(): string {
    return 'RtcEngineEx_resumeAllChannelMediaRelayEx';
  }

  getUserInfoByUserAccountEx(): {
    userAccount: string;
    userInfo: UserInfo;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromGetUserInfoByUserAccountEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userAccount = jsonResults.userAccount;
    const userInfo = jsonResults.userInfo;
    const connection = jsonResults.connection;
    return {
      userAccount,
      userInfo,
      connection,
    };
  }

  protected getApiTypeFromGetUserInfoByUserAccountEx(): string {
    return 'RtcEngineEx_getUserInfoByUserAccountEx';
  }

  getUserInfoByUidEx(uid: number): {
    userInfo: UserInfo;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromGetUserInfoByUidEx(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    const connection = jsonResults.connection;
    return {
      userInfo,
      connection,
    };
  }

  protected getApiTypeFromGetUserInfoByUidEx(uid: number): string {
    return 'RtcEngineEx_getUserInfoByUidEx';
  }

  enableDualStreamModeEx(enabled: boolean): {
    streamConfig: SimulcastStreamConfig;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromEnableDualStreamModeEx(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamConfig = jsonResults.streamConfig;
    const connection = jsonResults.connection;
    return {
      streamConfig,
      connection,
    };
  }

  protected getApiTypeFromEnableDualStreamModeEx(enabled: boolean): string {
    return 'RtcEngineEx_enableDualStreamModeEx';
  }

  setDualStreamModeEx(mode: SimulcastStreamMode): {
    streamConfig: SimulcastStreamConfig;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromSetDualStreamModeEx(mode);
    const jsonParams = {
      mode: mode,
      toJSON: () => {
        return {
          mode: mode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamConfig = jsonResults.streamConfig;
    const connection = jsonResults.connection;
    return {
      streamConfig,
      connection,
    };
  }

  protected getApiTypeFromSetDualStreamModeEx(
    mode: SimulcastStreamMode
  ): string {
    return 'RtcEngineEx_setDualStreamModeEx';
  }

  setHighPriorityUserListEx(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): RtcConnection {
    const apiType = this.getApiTypeFromSetHighPriorityUserListEx(
      uidList,
      uidNum,
      option
    );
    const jsonParams = {
      uidList: uidList,
      uidNum: uidNum,
      option: option,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNum: uidNum,
          option: option,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromSetHighPriorityUserListEx(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): string {
    return 'RtcEngineEx_setHighPriorityUserListEx';
  }

  takeSnapshotEx(uid: number): { connection: RtcConnection; filePath: string } {
    const apiType = this.getApiTypeFromTakeSnapshotEx(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    const filePath = jsonResults.filePath;
    return {
      connection,
      filePath,
    };
  }

  protected getApiTypeFromTakeSnapshotEx(uid: number): string {
    return 'RtcEngineEx_takeSnapshotEx';
  }

  enableContentInspectEx(enabled: boolean): {
    config: ContentInspectConfig;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromEnableContentInspectEx(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    const connection = jsonResults.connection;
    return {
      config,
      connection,
    };
  }

  protected getApiTypeFromEnableContentInspectEx(enabled: boolean): string {
    return 'RtcEngineEx_enableContentInspectEx';
  }

  startMediaRenderingTracingEx(): RtcConnection {
    const apiType = this.getApiTypeFromStartMediaRenderingTracingEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromStartMediaRenderingTracingEx(): string {
    return 'RtcEngineEx_startMediaRenderingTracingEx';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
