import { callIrisApi } from '../internal/IrisApiEngine';
import { IRtcEngineImpl } from './IAgoraRtcEngineImpl';
import { IRtcEngineEx, RtcConnection } from '../IAgoraRtcEngineEx';
import { ChannelMediaOptions } from '../IAgoraRtcEngine';
import {
  VideoEncoderConfiguration,
  VideoCanvas,
  VideoStreamType,
  SpatialAudioParams,
  VideoMirrorModeType,
  ConnectionStateType,
  EncryptionConfig,
  WatermarkOptions,
  UserInfo,
  VideoSourceType,
  SimulcastStreamConfig,
  DataStreamConfig,
} from '../AgoraBase';
import { RenderModeType } from '../AgoraMediaBase';

export class IRtcEngineExImpl extends IRtcEngineImpl implements IRtcEngineEx {
  joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number {
    const apiType = 'RtcEngineEx_joinChannelEx';
    const jsonParams = {
      token,
      connection,
      options,
      toJSON: () => {
        return {
          token,
          connection,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  leaveChannelEx(connection: RtcConnection): number {
    const apiType = 'RtcEngineEx_leaveChannelEx';
    const jsonParams = {
      connection,
      toJSON: () => {
        return { connection };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_updateChannelMediaOptionsEx';
    const jsonParams = {
      options,
      connection,
      toJSON: () => {
        return {
          options,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_setVideoEncoderConfigurationEx';
    const jsonParams = {
      config,
      connection,
      toJSON: () => {
        return {
          config,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setupRemoteVideoEx(canvas: VideoCanvas, connection: RtcConnection): number {
    const apiType = 'RtcEngineEx_setupRemoteVideoEx';
    const jsonParams = {
      canvas,
      connection,
      toJSON: () => {
        return {
          canvas,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_muteRemoteAudioStreamEx';
    const jsonParams = {
      uid,
      mute,
      connection,
      toJSON: () => {
        return {
          uid,
          mute,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_muteRemoteVideoStreamEx';
    const jsonParams = {
      uid,
      mute,
      connection,
      toJSON: () => {
        return {
          uid,
          mute,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_setRemoteVideoStreamTypeEx';
    const jsonParams = {
      uid,
      streamType,
      connection,
      toJSON: () => {
        return {
          uid,
          streamType,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_setRemoteVoicePositionEx';
    const jsonParams = {
      uid,
      pan,
      gain,
      connection,
      toJSON: () => {
        return {
          uid,
          pan,
          gain,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_setRemoteUserSpatialAudioParamsEx';
    const jsonParams = {
      uid,
      params,
      connection,
      toJSON: () => {
        return {
          uid,
          params,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_setRemoteRenderModeEx';
    const jsonParams = {
      uid,
      renderMode,
      mirrorMode,
      connection,
      toJSON: () => {
        return {
          uid,
          renderMode,
          mirrorMode,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number {
    const apiType = 'RtcEngineEx_enableLoopbackRecordingEx';
    const jsonParams = {
      connection,
      enabled,
      deviceName,
      toJSON: () => {
        return {
          connection,
          enabled,
          deviceName,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getConnectionStateEx(connection: RtcConnection): ConnectionStateType {
    const apiType = 'RtcEngineEx_getConnectionStateEx';
    const jsonParams = {
      connection,
      toJSON: () => {
        return { connection };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number {
    const apiType = 'RtcEngineEx_enableEncryptionEx';
    const jsonParams = {
      connection,
      enabled,
      config,
      toJSON: () => {
        return {
          connection,
          enabled,
          config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_sendStreamMessageEx';
    const jsonParams = {
      streamId,
      data,
      length,
      connection,
      toJSON: () => {
        return {
          streamId,
          length,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_addVideoWatermarkEx';
    const jsonParams = {
      watermarkUrl,
      options,
      connection,
      toJSON: () => {
        return {
          watermarkUrl,
          options,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  clearVideoWatermarkEx(connection: RtcConnection): number {
    const apiType = 'RtcEngineEx_clearVideoWatermarkEx';
    const jsonParams = {
      connection,
      toJSON: () => {
        return { connection };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_sendCustomReportMessageEx';
    const jsonParams = {
      id,
      category,
      event,
      label,
      value,
      connection,
      toJSON: () => {
        return {
          id,
          category,
          event,
          label,
          value,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_enableAudioVolumeIndicationEx';
    const jsonParams = {
      interval,
      smooth,
      reportVad,
      connection,
      toJSON: () => {
        return {
          interval,
          smooth,
          reportVad,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo {
    const apiType = 'RtcEngineEx_getUserInfoByUserAccountEx';
    const jsonParams = {
      userAccount,
      connection,
      toJSON: () => {
        return {
          userAccount,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo {
    const apiType = 'RtcEngineEx_getUserInfoByUidEx';
    const jsonParams = {
      uid,
      connection,
      toJSON: () => {
        return {
          uid,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  setVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): number {
    const apiType = 'RtcEngineEx_setVideoProfileEx';
    const jsonParams = {
      width,
      height,
      frameRate,
      bitrate,
      toJSON: () => {
        return {
          width,
          height,
          frameRate,
          bitrate,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableDualStreamModeEx(
    sourceType: VideoSourceType,
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_enableDualStreamModeEx';
    const jsonParams = {
      sourceType,
      enabled,
      streamConfig,
      connection,
      toJSON: () => {
        return {
          sourceType,
          enabled,
          streamConfig,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  addPublishStreamUrlEx(
    url: string,
    transcodingEnabled: boolean,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_addPublishStreamUrlEx';
    const jsonParams = {
      url,
      transcodingEnabled,
      connection,
      toJSON: () => {
        return {
          url,
          transcodingEnabled,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number {
    const apiType = 'RtcEngineEx_createDataStreamEx';
    const jsonParams = {
      config,
      connection,
      toJSON: () => {
        return {
          config,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamId = jsonResults.streamId;
    return streamId;
  }
}
