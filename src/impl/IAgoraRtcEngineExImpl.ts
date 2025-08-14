import {
  ChannelMediaRelayConfiguration,
  ConnectionStateType,
  DataStreamConfig,
  EncryptionConfig,
  LiveTranscoding,
  SimulcastConfig,
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
import {
  ContentInspectConfig,
  RenderModeType,
  SnapshotConfig,
} from '../AgoraMediaBase';
import {
  ChannelMediaOptions,
  LeaveChannelOptions,
  StreamFallbackOptions,
} from '../IAgoraRtcEngine';
import { IRtcEngineEx, RtcConnection } from '../IAgoraRtcEngineEx';

import { callIrisApi } from '../index';

import { IRtcEngineImpl } from './IAgoraRtcEngineImpl';

// @ts-ignore
export class IRtcEngineExImpl extends IRtcEngineImpl implements IRtcEngineEx {
  joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number {
    const apiType = this.getApiTypeFromJoinChannelEx(
      token,
      connection,
      options
    );
    const jsonParams = {
      token: token,
      connection: connection,
      options: options,
      toJSON: () => {
        return {
          token: token,
          connection: connection,
          options: options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromJoinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): string {
    return 'RtcEngineEx_joinChannelEx_a3cd08c';
  }

  leaveChannelEx(
    connection: RtcConnection,
    options?: LeaveChannelOptions
  ): number {
    const apiType = this.getApiTypeFromLeaveChannelEx(connection, options);
    const jsonParams = {
      connection: connection,
      options: options,
      toJSON: () => {
        return {
          connection: connection,
          options: options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromLeaveChannelEx(
    connection: RtcConnection,
    options?: LeaveChannelOptions
  ): string {
    return 'RtcEngineEx_leaveChannelEx_b03ee9a';
  }

  leaveChannelWithUserAccountEx(
    channelId: string,
    userAccount: string,
    options?: LeaveChannelOptions
  ): number {
    const apiType = this.getApiTypeFromLeaveChannelWithUserAccountEx(
      channelId,
      userAccount,
      options
    );
    const jsonParams = {
      channelId: channelId,
      userAccount: userAccount,
      options: options,
      toJSON: () => {
        return {
          channelId: channelId,
          userAccount: userAccount,
          options: options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromLeaveChannelWithUserAccountEx(
    channelId: string,
    userAccount: string,
    options?: LeaveChannelOptions
  ): string {
    return 'RtcEngineEx_leaveChannelWithUserAccountEx_8bbe372';
  }

  updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromUpdateChannelMediaOptionsEx(
      options,
      connection
    );
    const jsonParams = {
      options: options,
      connection: connection,
      toJSON: () => {
        return {
          options: options,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_updateChannelMediaOptionsEx_457bb35';
  }

  setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetVideoEncoderConfigurationEx(
      config,
      connection
    );
    const jsonParams = {
      config: config,
      connection: connection,
      toJSON: () => {
        return {
          config: config,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setVideoEncoderConfigurationEx_4670c1e';
  }

  setupRemoteVideoEx(canvas: VideoCanvas, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromSetupRemoteVideoEx(canvas, connection);
    const jsonParams = {
      canvas: canvas,
      connection: connection,
      toJSON: () => {
        return {
          canvas: canvas,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetupRemoteVideoEx(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setupRemoteVideoEx_522a409';
  }

  muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromMuteRemoteAudioStreamEx(
      uid,
      mute,
      connection
    );
    const jsonParams = {
      uid: uid,
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteRemoteAudioStreamEx_6d93082';
  }

  muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromMuteRemoteVideoStreamEx(
      uid,
      mute,
      connection
    );
    const jsonParams = {
      uid: uid,
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteRemoteVideoStreamEx_6d93082';
  }

  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetRemoteVideoStreamTypeEx(
      uid,
      streamType,
      connection
    );
    const jsonParams = {
      uid: uid,
      streamType: streamType,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          streamType: streamType,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setRemoteVideoStreamTypeEx_01dc428';
  }

  muteLocalAudioStreamEx(mute: boolean, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromMuteLocalAudioStreamEx(mute, connection);
    const jsonParams = {
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteLocalAudioStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteLocalAudioStreamEx_3cf17a4';
  }

  muteLocalVideoStreamEx(mute: boolean, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromMuteLocalVideoStreamEx(mute, connection);
    const jsonParams = {
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteLocalVideoStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteLocalVideoStreamEx_3cf17a4';
  }

  muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromMuteAllRemoteAudioStreamsEx(
      mute,
      connection
    );
    const jsonParams = {
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteAllRemoteAudioStreamsEx_3cf17a4';
  }

  muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromMuteAllRemoteVideoStreamsEx(
      mute,
      connection
    );
    const jsonParams = {
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteAllRemoteVideoStreamsEx_3cf17a4';
  }

  setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeAudioBlocklistEx(
      uidList,
      uidNumber,
      connection
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      connection: connection,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeAudioBlocklistEx_9f1e85c';
  }

  setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeAudioAllowlistEx(
      uidList,
      uidNumber,
      connection
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      connection: connection,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeAudioAllowlistEx_9f1e85c';
  }

  setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeVideoBlocklistEx(
      uidList,
      uidNumber,
      connection
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      connection: connection,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeVideoBlocklistEx_9f1e85c';
  }

  setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeVideoAllowlistEx(
      uidList,
      uidNumber,
      connection
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      connection: connection,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeVideoAllowlistEx_9f1e85c';
  }

  setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetRemoteVideoSubscriptionOptionsEx(
      uid,
      options,
      connection
    );
    const jsonParams = {
      uid: uid,
      options: options,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          options: options,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setRemoteVideoSubscriptionOptionsEx_3cd36bc';
  }

  setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetRemoteVoicePositionEx(
      uid,
      pan,
      gain,
      connection
    );
    const jsonParams = {
      uid: uid,
      pan: pan,
      gain: gain,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          pan: pan,
          gain: gain,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setRemoteVoicePositionEx_fc0471c';
  }

  setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetRemoteUserSpatialAudioParamsEx(
      uid,
      params,
      connection
    );
    const jsonParams = {
      uid: uid,
      params: params,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          params: params,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setRemoteUserSpatialAudioParamsEx_40ca9fb';
  }

  setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetRemoteRenderModeEx(
      uid,
      renderMode,
      mirrorMode,
      connection
    );
    const jsonParams = {
      uid: uid,
      renderMode: renderMode,
      mirrorMode: mirrorMode,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          renderMode: renderMode,
          mirrorMode: mirrorMode,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setRemoteRenderModeEx_a72fe4e';
  }

  enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number {
    const apiType = this.getApiTypeFromEnableLoopbackRecordingEx(
      connection,
      enabled,
      deviceName
    );
    const jsonParams = {
      connection: connection,
      enabled: enabled,
      deviceName: deviceName,
      toJSON: () => {
        return {
          connection: connection,
          enabled: enabled,
          deviceName: deviceName,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): string {
    return 'RtcEngineEx_enableLoopbackRecordingEx_4f41542';
  }

  adjustRecordingSignalVolumeEx(
    volume: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromAdjustRecordingSignalVolumeEx(
      volume,
      connection
    );
    const jsonParams = {
      volume: volume,
      connection: connection,
      toJSON: () => {
        return {
          volume: volume,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustRecordingSignalVolumeEx(
    volume: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_adjustRecordingSignalVolumeEx_e84d10e';
  }

  muteRecordingSignalEx(mute: boolean, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromMuteRecordingSignalEx(mute, connection);
    const jsonParams = {
      mute: mute,
      connection: connection,
      toJSON: () => {
        return {
          mute: mute,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRecordingSignalEx(
    mute: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_muteRecordingSignalEx_3cf17a4';
  }

  adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromAdjustUserPlaybackSignalVolumeEx(
      uid,
      volume,
      connection
    );
    const jsonParams = {
      uid: uid,
      volume: volume,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          volume: volume,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_adjustUserPlaybackSignalVolumeEx_adbd29c';
  }

  getConnectionStateEx(connection: RtcConnection): ConnectionStateType {
    const apiType = this.getApiTypeFromGetConnectionStateEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetConnectionStateEx(
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_getConnectionStateEx_c81e1a4';
  }

  enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number {
    const apiType = this.getApiTypeFromEnableEncryptionEx(
      connection,
      enabled,
      config
    );
    const jsonParams = {
      connection: connection,
      enabled: enabled,
      config: config,
      toJSON: () => {
        return {
          connection: connection,
          enabled: enabled,
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): string {
    return 'RtcEngineEx_enableEncryptionEx_10cd872';
  }

  createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromCreateDataStreamEx(config, connection);
    const jsonParams = {
      config: config,
      connection: connection,
      toJSON: () => {
        return {
          config: config,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamId = jsonResults.streamId;
    return streamId;
  }

  protected getApiTypeFromCreateDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_createDataStreamEx_9f641b6';
  }

  sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSendStreamMessageEx(
      streamId,
      data,
      length,
      connection
    );
    const jsonParams = {
      streamId: streamId,
      data: data,
      length: length,
      connection: connection,
      toJSON: () => {
        return {
          streamId: streamId,
          length: length,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_sendStreamMessageEx_0c34857';
  }

  addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromAddVideoWatermarkEx(
      watermarkUrl,
      options,
      connection
    );
    const jsonParams = {
      watermarkUrl: watermarkUrl,
      options: options,
      connection: connection,
      toJSON: () => {
        return {
          watermarkUrl: watermarkUrl,
          options: options,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAddVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_addVideoWatermarkEx_ad7daa3';
  }

  clearVideoWatermarkEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromClearVideoWatermarkEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromClearVideoWatermarkEx(
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_clearVideoWatermarkEx_c81e1a4';
  }

  sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSendCustomReportMessageEx(
      id,
      category,
      event,
      label,
      value,
      connection
    );
    const jsonParams = {
      id: id,
      category: category,
      event: event,
      label: label,
      value: value,
      connection: connection,
      toJSON: () => {
        return {
          id: id,
          category: category,
          event: event,
          label: label,
          value: value,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_sendCustomReportMessageEx_833b8a5';
  }

  enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromEnableAudioVolumeIndicationEx(
      interval,
      smooth,
      reportVad,
      connection
    );
    const jsonParams = {
      interval: interval,
      smooth: smooth,
      reportVad: reportVad,
      connection: connection,
      toJSON: () => {
        return {
          interval: interval,
          smooth: smooth,
          reportVad: reportVad,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_enableAudioVolumeIndicationEx_ac84f2a';
  }

  startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromStartRtmpStreamWithoutTranscodingEx(
      url,
      connection
    );
    const jsonParams = {
      url: url,
      connection: connection,
      toJSON: () => {
        return {
          url: url,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_startRtmpStreamWithoutTranscodingEx_e405325';
  }

  startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromStartRtmpStreamWithTranscodingEx(
      url,
      transcoding,
      connection
    );
    const jsonParams = {
      url: url,
      transcoding: transcoding,
      connection: connection,
      toJSON: () => {
        return {
          url: url,
          transcoding: transcoding,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_startRtmpStreamWithTranscodingEx_ab121b5';
  }

  updateRtmpTranscodingEx(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromUpdateRtmpTranscodingEx(
      transcoding,
      connection
    );
    const jsonParams = {
      transcoding: transcoding,
      connection: connection,
      toJSON: () => {
        return {
          transcoding: transcoding,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdateRtmpTranscodingEx(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_updateRtmpTranscodingEx_77f3ee8';
  }

  stopRtmpStreamEx(url: string, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromStopRtmpStreamEx(url, connection);
    const jsonParams = {
      url: url,
      connection: connection,
      toJSON: () => {
        return {
          url: url,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopRtmpStreamEx(
    url: string,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_stopRtmpStreamEx_e405325';
  }

  startOrUpdateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromStartOrUpdateChannelMediaRelayEx(
      configuration,
      connection
    );
    const jsonParams = {
      configuration: configuration,
      connection: connection,
      toJSON: () => {
        return {
          configuration: configuration,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartOrUpdateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_startOrUpdateChannelMediaRelayEx_4ad39a8';
  }

  stopChannelMediaRelayEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromStopChannelMediaRelayEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopChannelMediaRelayEx(
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_stopChannelMediaRelayEx_c81e1a4';
  }

  pauseAllChannelMediaRelayEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromPauseAllChannelMediaRelayEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPauseAllChannelMediaRelayEx(
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_pauseAllChannelMediaRelayEx_c81e1a4';
  }

  resumeAllChannelMediaRelayEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromResumeAllChannelMediaRelayEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResumeAllChannelMediaRelayEx(
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_resumeAllChannelMediaRelayEx_c81e1a4';
  }

  getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo {
    const apiType = this.getApiTypeFromGetUserInfoByUserAccountEx(
      userAccount,
      connection
    );
    const jsonParams = {
      userAccount: userAccount,
      connection: connection,
      toJSON: () => {
        return {
          userAccount: userAccount,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  protected getApiTypeFromGetUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_getUserInfoByUserAccountEx_ca39cc6';
  }

  getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo {
    const apiType = this.getApiTypeFromGetUserInfoByUidEx(uid, connection);
    const jsonParams = {
      uid: uid,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  protected getApiTypeFromGetUserInfoByUidEx(
    uid: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_getUserInfoByUidEx_1e78da1';
  }

  enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromEnableDualStreamModeEx(
      enabled,
      streamConfig,
      connection
    );
    const jsonParams = {
      enabled: enabled,
      streamConfig: streamConfig,
      connection: connection,
      toJSON: () => {
        return {
          enabled: enabled,
          streamConfig: streamConfig,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableDualStreamModeEx(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_enableDualStreamModeEx_4b18f41';
  }

  setDualStreamModeEx(
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetDualStreamModeEx(
      mode,
      streamConfig,
      connection
    );
    const jsonParams = {
      mode: mode,
      streamConfig: streamConfig,
      connection: connection,
      toJSON: () => {
        return {
          mode: mode,
          streamConfig: streamConfig,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDualStreamModeEx(
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setDualStreamModeEx_622d0f3';
  }

  setSimulcastConfigEx(
    simulcastConfig: SimulcastConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSimulcastConfigEx(
      simulcastConfig,
      connection
    );
    const jsonParams = {
      simulcastConfig: simulcastConfig,
      connection: connection,
      toJSON: () => {
        return {
          simulcastConfig: simulcastConfig,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSimulcastConfigEx(
    simulcastConfig: SimulcastConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSimulcastConfigEx_bd8d7d0';
  }

  setHighPriorityUserListEx(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetHighPriorityUserListEx(
      uidList,
      uidNum,
      option,
      connection
    );
    const jsonParams = {
      uidList: uidList,
      uidNum: uidNum,
      option: option,
      connection: connection,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNum: uidNum,
          option: option,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetHighPriorityUserListEx(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setHighPriorityUserListEx_8736b5c';
  }

  takeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): number {
    const apiType = this.getApiTypeFromTakeSnapshotEx(
      connection,
      uid,
      filePath
    );
    const jsonParams = {
      connection: connection,
      uid: uid,
      filePath: filePath,
      toJSON: () => {
        return {
          connection: connection,
          uid: uid,
          filePath: filePath,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromTakeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): string {
    return 'RtcEngineEx_takeSnapshotEx_de1c015';
  }

  enableContentInspectEx(
    enabled: boolean,
    config: ContentInspectConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromEnableContentInspectEx(
      enabled,
      config,
      connection
    );
    const jsonParams = {
      enabled: enabled,
      config: config,
      connection: connection,
      toJSON: () => {
        return {
          enabled: enabled,
          config: config,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableContentInspectEx(
    enabled: boolean,
    config: ContentInspectConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_enableContentInspectEx_c4e7f69';
  }

  startMediaRenderingTracingEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromStartMediaRenderingTracingEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartMediaRenderingTracingEx(
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_startMediaRenderingTracingEx_c81e1a4';
  }

  setParametersEx(connection: RtcConnection, parameters: string): number {
    const apiType = this.getApiTypeFromSetParametersEx(connection, parameters);
    const jsonParams = {
      connection: connection,
      parameters: parameters,
      toJSON: () => {
        return {
          connection: connection,
          parameters: parameters,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetParametersEx(
    connection: RtcConnection,
    parameters: string
  ): string {
    return 'RtcEngineEx_setParametersEx_8225ea3';
  }

  getCallIdEx(connection: RtcConnection): string {
    const apiType = this.getApiTypeFromGetCallIdEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const callId = jsonResults.callId;
    return callId;
  }

  protected getApiTypeFromGetCallIdEx(connection: RtcConnection): string {
    return 'RtcEngineEx_getCallIdEx_b13f7c4';
  }

  sendAudioMetadataEx(
    connection: RtcConnection,
    metadata: string,
    length: number
  ): number {
    const apiType = this.getApiTypeFromSendAudioMetadataEx(
      connection,
      metadata,
      length
    );
    const jsonParams = {
      connection: connection,
      metadata: metadata,
      length: length,
      toJSON: () => {
        return {
          connection: connection,
          metadata: metadata,
          length: length,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSendAudioMetadataEx(
    connection: RtcConnection,
    metadata: string,
    length: number
  ): string {
    return 'RtcEngineEx_sendAudioMetadataEx_e2bf1c4';
  }

  takeSnapshotWithConfigEx(
    connection: RtcConnection,
    uid: number,
    config: SnapshotConfig
  ): number {
    const apiType = this.getApiTypeFromTakeSnapshotWithConfigEx(
      connection,
      uid,
      config
    );
    const jsonParams = {
      connection: connection,
      uid: uid,
      config: config,
      toJSON: () => {
        return {
          connection: connection,
          uid: uid,
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromTakeSnapshotWithConfigEx(
    connection: RtcConnection,
    uid: number,
    config: SnapshotConfig
  ): string {
    return 'RtcEngineEx_takeSnapshotEx_b856417';
  }
}
