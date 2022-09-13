import { callIrisApi } from '../internal/IrisApiEngine';
import { IRtcEngineImpl } from './IAgoraRtcEngineImpl';
import { IRtcEngineEx, RtcConnection } from '../IAgoraRtcEngineEx';
import { ChannelMediaOptions } from '../IAgoraRtcEngine';
import {
  VideoEncoderConfiguration,
  VideoCanvas,
  VideoStreamType,
  VideoSubscriptionOptions,
  SpatialAudioParams,
  VideoMirrorModeType,
  ConnectionStateType,
  EncryptionConfig,
  WatermarkOptions,
  UserInfo,
  VideoSourceType,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  DataStreamConfig,
} from '../AgoraBase';
import { RenderModeType } from '../AgoraMediaBase';
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

  leaveChannelEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromLeaveChannelEx(connection);
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

  protected getApiTypeFromLeaveChannelEx(connection: RtcConnection): string {
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

  setSubscribeAudioBlacklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeAudioBlacklistEx(
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

  protected getApiTypeFromSetSubscribeAudioBlacklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeAudioBlacklistEx';
  }

  setSubscribeAudioWhitelistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeAudioWhitelistEx(
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

  protected getApiTypeFromSetSubscribeAudioWhitelistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeAudioWhitelistEx';
  }

  setSubscribeVideoBlacklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeVideoBlacklistEx(
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

  protected getApiTypeFromSetSubscribeVideoBlacklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeVideoBlacklistEx';
  }

  setSubscribeVideoWhitelistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetSubscribeVideoWhitelistEx(
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

  protected getApiTypeFromSetSubscribeVideoWhitelistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setSubscribeVideoWhitelistEx';
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

  setVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): number {
    const apiType = this.getApiTypeFromSetVideoProfileEx(
      width,
      height,
      frameRate,
      bitrate
    );
    const jsonParams = {
      width: width,
      height: height,
      frameRate: frameRate,
      bitrate: bitrate,
      toJSON: () => {
        return {
          width: width,
          height: height,
          frameRate: frameRate,
          bitrate: bitrate,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): string {
    return 'RtcEngineEx_setVideoProfileEx';
  }

  enableDualStreamModeEx(
    sourceType: VideoSourceType,
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromEnableDualStreamModeEx(
      sourceType,
      enabled,
      streamConfig,
      connection
    );
    const jsonParams = {
      sourceType: sourceType,
      enabled: enabled,
      streamConfig: streamConfig,
      connection: connection,
      toJSON: () => {
        return {
          sourceType: sourceType,
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
    sourceType: VideoSourceType,
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_enableDualStreamModeEx';
  }

  setDualStreamModeEx(
    sourceType: VideoSourceType,
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromSetDualStreamModeEx(
      sourceType,
      mode,
      streamConfig,
      connection
    );
    const jsonParams = {
      sourceType: sourceType,
      mode: mode,
      streamConfig: streamConfig,
      connection: connection,
      toJSON: () => {
        return {
          sourceType: sourceType,
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
    sourceType: VideoSourceType,
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_setDualStreamModeEx';
  }

  enableWirelessAccelerate(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableWirelessAccelerate(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableWirelessAccelerate(enabled: boolean): string {
    return 'RtcEngineEx_enableWirelessAccelerate';
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
}
