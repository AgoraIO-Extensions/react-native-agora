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
import { RenderModeType } from '../AgoraMediaBase';
import {
  ChannelMediaOptions,
  LeaveChannelOptions,
  StreamFallbackOptions,
} from '../IAgoraRtcEngine';
import { IRtcEngineEx, RtcConnection } from '../IAgoraRtcEngineEx';

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
    return 'RtcEngineEx_joinChannelEx';
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
    return 'RtcEngineEx_leaveChannelEx';
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
    return 'RtcEngineEx_updateChannelMediaOptionsEx';
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
    return 'RtcEngineEx_setVideoEncoderConfigurationEx';
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
    return 'RtcEngineEx_setupRemoteVideoEx';
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
    return 'RtcEngineEx_muteRemoteAudioStreamEx';
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
    return 'RtcEngineEx_muteRemoteVideoStreamEx';
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
    return 'RtcEngineEx_setRemoteVideoStreamTypeEx';
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
    return 'RtcEngineEx_muteLocalAudioStreamEx';
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
    return 'RtcEngineEx_muteLocalVideoStreamEx';
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
    return 'RtcEngineEx_muteAllRemoteAudioStreamsEx';
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
    return 'RtcEngineEx_muteAllRemoteVideoStreamsEx';
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
    return 'RtcEngineEx_setSubscribeAudioBlocklistEx';
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
    return 'RtcEngineEx_setSubscribeAudioAllowlistEx';
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
    return 'RtcEngineEx_setSubscribeVideoBlocklistEx';
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
    return 'RtcEngineEx_setSubscribeVideoAllowlistEx';
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
    return 'RtcEngineEx_setRemoteVideoSubscriptionOptionsEx';
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
    return 'RtcEngineEx_setRemoteVoicePositionEx';
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
    return 'RtcEngineEx_setRemoteUserSpatialAudioParamsEx';
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
    return 'RtcEngineEx_setRemoteRenderModeEx';
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
    return 'RtcEngineEx_enableLoopbackRecordingEx';
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
    return 'RtcEngineEx_adjustRecordingSignalVolumeEx';
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
    return 'RtcEngineEx_muteRecordingSignalEx';
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
    return 'RtcEngineEx_adjustUserPlaybackSignalVolumeEx';
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
    return 'RtcEngineEx_getConnectionStateEx';
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
    return 'RtcEngineEx_enableEncryptionEx';
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
    return 'RtcEngineEx_createDataStreamEx';
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
    return 'RtcEngineEx_sendStreamMessageEx';
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
    return 'RtcEngineEx_addVideoWatermarkEx';
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
    return 'RtcEngineEx_clearVideoWatermarkEx';
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
    return 'RtcEngineEx_sendCustomReportMessageEx';
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
    return 'RtcEngineEx_enableAudioVolumeIndicationEx';
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
    return 'RtcEngineEx_startRtmpStreamWithoutTranscodingEx';
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
    return 'RtcEngineEx_startRtmpStreamWithTranscodingEx';
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
    return 'RtcEngineEx_updateRtmpTranscodingEx';
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
    return 'RtcEngineEx_stopRtmpStreamEx';
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
    return 'RtcEngineEx_startOrUpdateChannelMediaRelayEx';
  }

  startChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromStartChannelMediaRelayEx(
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

  protected getApiTypeFromStartChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_startChannelMediaRelayEx';
  }

  updateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromUpdateChannelMediaRelayEx(
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

  protected getApiTypeFromUpdateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_updateChannelMediaRelayEx';
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
    return 'RtcEngineEx_stopChannelMediaRelayEx';
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
    return 'RtcEngineEx_pauseAllChannelMediaRelayEx';
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
    return 'RtcEngineEx_resumeAllChannelMediaRelayEx';
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
    return 'RtcEngineEx_getUserInfoByUserAccountEx';
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
    return 'RtcEngineEx_getUserInfoByUidEx';
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
    return 'RtcEngineEx_enableDualStreamModeEx';
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
    return 'RtcEngineEx_setDualStreamModeEx';
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
    return 'RtcEngineEx_setHighPriorityUserListEx';
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
    return 'RtcEngineEx_takeSnapshotEx';
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
    return 'RtcEngineEx_startMediaRenderingTracingEx';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
