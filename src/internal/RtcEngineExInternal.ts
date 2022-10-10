import { DeviceEventEmitter, EventSubscription } from 'react-native';

import { IRtcEngineExImpl } from '../impl/IAgoraRtcEngineExImpl';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { callIrisApi, EVENT_TYPE } from './IrisApiEngine';
import {
  ChannelMediaOptions,
  DirectCdnStreamingMediaOptions,
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngineEventHandler,
  IVideoDeviceManager,
  LeaveChannelOptions,
  MetadataType,
  RtcEngineContext,
  SDKBuildInfo,
} from '../IAgoraRtcEngine';
import { IMediaPlayer } from '../IAgoraMediaPlayer';
import {
  AudioEncodedFrameObserverConfig,
  AudioRecordingConfiguration,
  ClientRoleOptions,
  ClientRoleType,
  DataStreamConfig,
  IAudioEncodedFrameObserver,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  VideoSourceType,
  WatermarkOptions,
} from '../AgoraBase';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';
import { RtcConnection } from '../IAgoraRtcEngineEx';
import { IAudioDeviceManager } from '../IAudioDeviceManager';
import { IMediaEngine } from '../IAgoraMediaEngine';
import { IMediaRecorder } from '../IAgoraMediaRecorder';
import { ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio';
import { MediaEngineInternal } from './MediaEngineInternal';
import { MediaRecorderInternal } from './MediaRecorderInternal';
import { LocalSpatialAudioEngineInternal } from './LocalSpatialAudioEngineInternal';
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from '../impl/IAgoraRtcEngineImpl';
import { IRtcEngineEvent } from '../extension/IAgoraRtcEngineExtension';
import { processIAudioEncodedFrameObserver } from '../impl/AgoraBaseImpl';
import { processIAudioSpectrumObserver } from '../impl/AgoraMediaBaseImpl';

export class RtcEngineExInternal extends IRtcEngineExImpl {
  static _handlers: (
    | IRtcEngineEventHandler
    | IDirectCdnStreamingEventHandler
    | IMetadataObserver
  )[] = [];
  static _audio_encoded_frame_observers: IAudioEncodedFrameObserver[] = [];
  static _audio_spectrum_observers: IAudioSpectrumObserver[] = [];
  private _media_engine: IMediaEngine = new MediaEngineInternal();
  private _media_recorder: IMediaRecorder = new MediaRecorderInternal();
  private _local_spatial_audio_engine: ILocalSpatialAudioEngine =
    new LocalSpatialAudioEngineInternal();
  private _events: Map<
    any,
    { eventType: string; listener: (...args: any[]) => any }
  > = new Map<any, { eventType: string; listener: (...args: any[]) => any }>();

  initialize(context: RtcEngineContext): number {
    const ret = super.initialize(context);
    callIrisApi.call(this, 'RtcEngine_setAppType', {
      appType: 8,
    });
    return ret;
  }

  release(sync: boolean = false) {
    this._media_engine.release();
    this._media_recorder.release();
    this._local_spatial_audio_engine.release();
    RtcEngineExInternal._handlers = [];
    RtcEngineExInternal._audio_encoded_frame_observers = [];
    RtcEngineExInternal._audio_spectrum_observers = [];
    MediaPlayerInternal._source_observers.clear();
    MediaPlayerInternal._audio_frame_observers.clear();
    MediaPlayerInternal._video_frame_observers.clear();
    MediaPlayerInternal._audio_spectrum_observers.clear();
    this._events.forEach((value) => {
      DeviceEventEmitter.removeListener(value.eventType, value.listener);
    });
    this._events.clear();
    super.release(sync);
  }

  addListener<EventType extends keyof IRtcEngineEvent>(
    eventType: EventType,
    listener: IRtcEngineEvent[EventType]
  ): EventSubscription {
    const callback = (...data: any[]) => {
      if (data[0] !== EVENT_TYPE.IRtcEngine) {
        return;
      }
      processIRtcEngineEventHandler(
        { [eventType]: listener },
        eventType,
        data[1]
      );
      processIDirectCdnStreamingEventHandler(
        { [eventType]: listener },
        eventType,
        data[1]
      );
      processIMetadataObserver({ [eventType]: listener }, eventType, data[1]);
      processIAudioEncodedFrameObserver(
        { [eventType]: listener },
        eventType,
        data[1]
      );
      processIAudioSpectrumObserver(
        { [eventType]: listener },
        eventType,
        data[1]
      );
    };
    this._events.set(listener, { eventType, listener: callback });
    return DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IRtcEngineEvent>(
    eventType: EventType,
    listener: IRtcEngineEvent[EventType]
  ) {
    if (!this._events.has(listener)) return;
    DeviceEventEmitter.removeListener(
      eventType,
      this._events.get(listener)!.listener
    );
  }

  removeAllListeners<EventType extends keyof IRtcEngineEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
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
    if (
      !RtcEngineExInternal._handlers.find((value) => value === eventHandler)
    ) {
      RtcEngineExInternal._handlers.push(eventHandler);
    }
    return true;
  }

  unregisterEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    RtcEngineExInternal._handlers = RtcEngineExInternal._handlers.filter(
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
    mediaPlayer.release?.call(mediaPlayer);
    return ret;
  }

  startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number {
    if (
      !RtcEngineExInternal._handlers.find((value) => value === eventHandler)
    ) {
      RtcEngineExInternal._handlers.push(eventHandler);
    }
    return super.startDirectCdnStreaming(eventHandler, publishUrl, options);
  }

  registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    if (!RtcEngineExInternal._handlers.find((value) => value === observer)) {
      RtcEngineExInternal._handlers.push(observer);
    }
    return super.registerMediaMetadataObserver(observer, type);
  }

  unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    RtcEngineExInternal._handlers = RtcEngineExInternal._handlers.filter(
      (value) => value !== observer
    );
    return super.unregisterMediaMetadataObserver(observer, type);
  }

  protected getApiTypeFromJoinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): string {
    return 'RtcEngine_joinChannel2';
  }

  protected getApiTypeFromLeaveChannel(options?: LeaveChannelOptions): string {
    return options === undefined
      ? 'RtcEngine_leaveChannel'
      : 'RtcEngine_leaveChannel2';
  }

  protected getApiTypeFromSetClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_setClientRole'
      : 'RtcEngine_setClientRole2';
  }

  protected getApiTypeFromStartEchoTest(
    intervalInSeconds: number = 10
  ): string {
    return 'RtcEngine_startEchoTest2';
  }

  protected getApiTypeFromStartPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_startPreview2';
  }

  protected getApiTypeFromStopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_stopPreview2';
  }

  protected getApiTypeFromStartAudioRecording(
    config: AudioRecordingConfiguration
  ): string {
    return 'RtcEngine_startAudioRecording3';
  }

  protected getApiTypeFromStartAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number = 0
  ): string {
    return 'RtcEngine_startAudioMixing2';
  }

  protected getApiTypeFromEnableDualStreamMode(
    enabled: boolean,
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_enableDualStreamMode2'
      : 'RtcEngine_enableDualStreamMode3';
  }

  protected getApiTypeFromSetDualStreamMode(
    mode: SimulcastStreamMode,
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_setDualStreamMode2'
      : 'RtcEngine_setDualStreamMode3';
  }

  protected getApiTypeFromCreateDataStream(config: DataStreamConfig): string {
    return 'RtcEngine_createDataStream2';
  }

  protected getApiTypeFromAddVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): string {
    return 'RtcEngine_addVideoWatermark2';
  }

  protected getApiTypeFromJoinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_joinChannelWithUserAccount'
      : 'RtcEngine_joinChannelWithUserAccount2';
  }

  protected getApiTypeFromCreateDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_createDataStreamEx2';
  }

  getAudioDeviceManager(): IAudioDeviceManager {
    throw 'Not support';
  }

  getVideoDeviceManager(): IVideoDeviceManager {
    throw 'Not support';
  }

  getMediaEngine(): IMediaEngine {
    return this._media_engine;
  }

  getMediaRecorder(): IMediaRecorder {
    return this._media_recorder;
  }

  getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine {
    return this._local_spatial_audio_engine;
  }

  registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number {
    if (
      !RtcEngineExInternal._audio_encoded_frame_observers.find(
        (value) => value === observer
      )
    ) {
      RtcEngineExInternal._audio_encoded_frame_observers.push(observer);
    }
    return super.registerAudioEncodedFrameObserver(config, observer);
  }

  unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number {
    RtcEngineExInternal._audio_encoded_frame_observers =
      RtcEngineExInternal._audio_encoded_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioEncodedFrameObserver(observer);
  }

  registerAudioSpectrumObserver(observer: IAudioSpectrumObserver): number {
    if (
      !RtcEngineExInternal._audio_spectrum_observers.find(
        (value) => value === observer
      )
    ) {
      RtcEngineExInternal._audio_spectrum_observers.push(observer);
    }
    return super.registerAudioSpectrumObserver(observer);
  }

  unregisterAudioSpectrumObserver(observer: IAudioSpectrumObserver): number {
    RtcEngineExInternal._audio_spectrum_observers =
      RtcEngineExInternal._audio_spectrum_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioSpectrumObserver(observer);
  }
}
