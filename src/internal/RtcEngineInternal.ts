import {
  AudioRecordingConfiguration,
  ChannelMediaOptions,
  ClientRoleOptions,
  ClientRoleType,
  DataStreamConfig,
  DirectCdnStreamingMediaOptions,
  IAudioDeviceManager,
  IDirectCdnStreamingEventHandler,
  IMediaPlayer,
  IMetadataObserver,
  IRtcEngineEventHandler,
  IVideoDeviceManager,
  LeaveChannelOptions,
  MetadataType,
  RtcConnection,
  RtcEngineContext,
  SDKBuildInfo,
  SimulcastStreamConfig,
  VideoSourceType,
  WatermarkOptions,
} from 'react-native-agora-rtc-ng';
import { IRtcEngineExImpl } from '../impl/IAgoraRtcEngineExImpl';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { callIrisApi } from './IrisApiEngine';

export class RtcEngineInternal extends IRtcEngineExImpl {
  static _handlers: (
    | IRtcEngineEventHandler
    | IDirectCdnStreamingEventHandler
    | IMetadataObserver
  )[] = [];

  initialize(context: RtcEngineContext): number {
    const ret = super.initialize(context);
    callIrisApi.call(this, 'RtcEngine_setAppType', {
      appType: 8,
    });
    return ret;
  }

  release(sync: boolean = false) {
    RtcEngineInternal._handlers = [];
    MediaPlayerInternal._observers.clear();
    super.release(sync);
  }

  getVersion(): SDKBuildInfo {
    const apiType = 'RtcEngine_getVersion';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return {
      build: jsonResults.build,
      version: jsonResults.result,
    };
  }

  registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    if (!RtcEngineInternal._handlers.find((value) => value === eventHandler)) {
      RtcEngineInternal._handlers.push(eventHandler);
    }
    return true;
  }

  unregisterEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    RtcEngineInternal._handlers = RtcEngineInternal._handlers.filter(
      (value) => value !== eventHandler
    );
    return true;
  }

  createMediaPlayer(): IMediaPlayer {
    // @ts-ignore
    const mediaPlayerId = super.createMediaPlayer() as number;
    return new MediaPlayerInternal(mediaPlayerId);
  }

  destroyMediaPlayer(mediaPlayer: IMediaPlayer): number {
    const ret = super.destroyMediaPlayer(mediaPlayer);
    MediaPlayerInternal._observers.delete(mediaPlayer.getMediaPlayerId());
    return ret;
  }

  startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number {
    if (!RtcEngineInternal._handlers.find((value) => value === eventHandler)) {
      RtcEngineInternal._handlers.push(eventHandler);
    }
    return super.startDirectCdnStreaming(eventHandler, publishUrl, options);
  }

  registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    if (!RtcEngineInternal._handlers.find((value) => value === observer)) {
      RtcEngineInternal._handlers.push(observer);
    }
    return super.registerMediaMetadataObserver(observer, type);
  }

  unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    RtcEngineInternal._handlers = RtcEngineInternal._handlers.filter(
      (value) => value !== observer
    );
    return super.unregisterMediaMetadataObserver(observer, type);
  }

  joinChannelWithOptions(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number {
    const apiType = 'RtcEngine_joinChannel2';
    const jsonParams = {
      token,
      channelId,
      uid,
      options,
      toJSON: () => {
        return {
          token,
          channelId,
          uid,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  leaveChannel(options?: LeaveChannelOptions): number {
    const apiType =
      options === undefined
        ? 'RtcEngine_leaveChannel'
        : 'RtcEngine_leaveChannel2';
    const jsonParams = {
      options,
      toJSON: () => {
        return { options };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setClientRole(role: ClientRoleType, options?: ClientRoleOptions): number {
    const apiType =
      options === undefined
        ? 'RtcEngine_setClientRole'
        : 'RtcEngine_setClientRole2';
    const jsonParams = {
      role,
      options,
      toJSON: () => {
        return {
          role,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startEchoTest(intervalInSeconds: number = 10): number {
    const apiType = 'RtcEngine_startEchoTest2';
    const jsonParams = {
      intervalInSeconds,
      toJSON: () => {
        return { intervalInSeconds };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): number {
    const apiType = 'RtcEngine_startPreview2';
    const jsonParams = {
      sourceType,
      toJSON: () => {
        return { sourceType };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): number {
    const apiType = 'RtcEngine_stopPreview2';
    const jsonParams = {
      sourceType,
      toJSON: () => {
        return { sourceType };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startAudioRecording(config: AudioRecordingConfiguration): number {
    const apiType = 'RtcEngine_startAudioRecording3';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number,
    startPos: number = 0
  ): number {
    const apiType = 'RtcEngine_startAudioMixing2';
    const jsonParams = {
      filePath,
      loopback,
      replace,
      cycle,
      startPos,
      toJSON: () => {
        return {
          filePath,
          loopback,
          replace,
          cycle,
          startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableDualStreamMode(
    enabled: boolean,
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary,
    streamConfig?: SimulcastStreamConfig
  ): number {
    const apiType =
      streamConfig === undefined
        ? 'RtcEngine_enableDualStreamMode2'
        : 'RtcEngine_enableDualStreamMode3';
    const jsonParams = {
      enabled,
      sourceType,
      streamConfig,
      toJSON: () => {
        return {
          enabled,
          sourceType,
          streamConfig,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  createDataStream(config: DataStreamConfig): number {
    const apiType = 'RtcEngine_createDataStream2';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.streamId;
  }

  addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): number {
    const apiType = 'RtcEngine_addVideoWatermark2';
    const jsonParams = {
      watermarkUrl,
      options,
      toJSON: () => {
        return {
          watermarkUrl,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number {
    const apiType =
      options === undefined
        ? 'RtcEngine_joinChannelWithUserAccount'
        : 'RtcEngine_joinChannelWithUserAccount2';
    const jsonParams = {
      token,
      channelId,
      userAccount,
      options,
      toJSON: () => {
        return {
          token,
          channelId,
          userAccount,
          options,
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
    const apiType = 'RtcEngineEx_createDataStreamEx2';
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
    return jsonResults.streamId;
  }

  getAudioDeviceManager(): IAudioDeviceManager {
    throw 'Not support';
  }

  getVideoDeviceManager(): IVideoDeviceManager {
    throw 'Not support';
  }
}
