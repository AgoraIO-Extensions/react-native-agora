import { createCheckers } from 'ts-interface-checker';

import {
  AudioEncodedFrameObserverConfig,
  AudioRecordingConfiguration,
  ClientRoleOptions,
  ClientRoleType,
  DataStreamConfig,
  EchoTestConfiguration,
  IAudioEncodedFrameObserver,
  RecorderStreamInfo,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  WatermarkOptions,
} from '../AgoraBase';
import { IAudioSpectrumObserver, VideoSourceType } from '../AgoraMediaBase';
import { IMediaEngine } from '../IAgoraMediaEngine';
import { IMediaPlayer } from '../IAgoraMediaPlayer';
import { IMediaRecorder } from '../IAgoraMediaRecorder';
import { IMusicContentCenter } from '../IAgoraMusicContentCenter';
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
import { RtcConnection } from '../IAgoraRtcEngineEx';
import { ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio';
import { IAudioDeviceManager } from '../IAudioDeviceManager';
import { IRtcEngineEvent } from '../extension/IAgoraRtcEngineExtension';

import { processIAudioEncodedFrameObserver } from '../impl/AgoraBaseImpl';
import { processIAudioSpectrumObserver } from '../impl/AgoraMediaBaseImpl';
import { IRtcEngineExImpl } from '../impl/IAgoraRtcEngineExImpl';
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from '../impl/IAgoraRtcEngineImpl';

import AgoraBaseTI from '../ti/AgoraBase-ti';
import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
import IAgoraRtcEngineTI from '../ti/IAgoraRtcEngine-ti';

import { DeviceEventEmitter, EVENT_TYPE, callIrisApi } from './IrisApiEngine';
import { LocalSpatialAudioEngineInternal } from './LocalSpatialAudioEngineInternal';
import { MediaEngineInternal } from './MediaEngineInternal';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { MediaRecorderInternal } from './MediaRecorderInternal';
import { MusicContentCenterInternal } from './MusicContentCenterInternal';

const checkers = createCheckers(
  AgoraBaseTI,
  AgoraMediaBaseTI,
  IAgoraRtcEngineTI
);

export class RtcEngineExInternal extends IRtcEngineExImpl {
  static _event_handlers: IRtcEngineEventHandler[] = [];
  static _direct_cdn_streaming_event_handler: IDirectCdnStreamingEventHandler[] =
    [];
  static _metadata_observer: IMetadataObserver[] = [];
  static _audio_encoded_frame_observers: IAudioEncodedFrameObserver[] = [];
  static _audio_spectrum_observers: IAudioSpectrumObserver[] = [];
  private _media_engine: IMediaEngine = new MediaEngineInternal();
  private _music_content_center: IMusicContentCenter =
    new MusicContentCenterInternal();
  private _local_spatial_audio_engine: ILocalSpatialAudioEngine =
    new LocalSpatialAudioEngineInternal();

  override initialize(context: RtcEngineContext): number {
    const ret = super.initialize(context);
    callIrisApi.call(this, 'RtcEngine_setAppType', {
      appType: 8,
    });
    return ret;
  }

  override release(sync: boolean = false) {
    this._media_engine.release();
    this._local_spatial_audio_engine.release();
    RtcEngineExInternal._event_handlers = [];
    RtcEngineExInternal._direct_cdn_streaming_event_handler = [];
    RtcEngineExInternal._metadata_observer = [];
    RtcEngineExInternal._audio_encoded_frame_observers = [];
    RtcEngineExInternal._audio_spectrum_observers = [];
    MediaPlayerInternal._source_observers.clear();
    MediaPlayerInternal._audio_frame_observers.clear();
    MediaPlayerInternal._video_frame_observers.clear();
    MediaPlayerInternal._audio_spectrum_observers.clear();
    this.removeAllListeners();
    super.release(sync);
  }

  _addListenerPreCheck<EventType extends keyof IRtcEngineEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.IRtcEngineEventHandler?.strictTest({ [eventType]: undefined })
    ) {
      if (RtcEngineExInternal._event_handlers.length === 0) {
        this.registerEventHandler({});
      }
    }
    if (
      checkers.IDirectCdnStreamingEventHandler?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (
        RtcEngineExInternal._direct_cdn_streaming_event_handler.length === 0
      ) {
        console.error(
          'Please call `startDirectCdnStreaming` before you want to receive event by `addListener`'
        );
        return false;
      }
    }
    if (
      checkers.IMetadataObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (RtcEngineExInternal._metadata_observer.length === 0) {
        console.error(
          'Please call `registerMediaMetadataObserver` before you want to receive event by `addListener`'
        );
        return false;
      }
    }
    if (
      checkers.IAudioEncodedFrameObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (RtcEngineExInternal._audio_encoded_frame_observers.length === 0) {
        console.error(
          'Please call `registerAudioEncodedFrameObserver` before you want to receive event by `addListener`'
        );
        return false;
      }
    }
    if (
      checkers.IAudioSpectrumObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (RtcEngineExInternal._audio_spectrum_observers.length === 0) {
        this.registerAudioSpectrumObserver({});
      }
    }
    return true;
  }

  addListener<EventType extends keyof IRtcEngineEvent>(
    eventType: EventType,
    listener: IRtcEngineEvent[EventType]
  ): void {
    this._addListenerPreCheck(eventType);
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
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IRtcEngineEvent>(
    eventType: EventType,
    listener: IRtcEngineEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(eventType, listener);
  }

  removeAllListeners<EventType extends keyof IRtcEngineEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  override getVersion(): SDKBuildInfo {
    const apiType = 'RtcEngine_getVersion';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return {
      build: jsonResults.build,
      version: jsonResults.result,
    };
  }

  override registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    if (
      !RtcEngineExInternal._event_handlers.find(
        (value) => value === eventHandler
      )
    ) {
      RtcEngineExInternal._event_handlers.push(eventHandler);
    }
    return super.registerEventHandler(eventHandler);
  }

  override unregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): boolean {
    RtcEngineExInternal._event_handlers =
      RtcEngineExInternal._event_handlers.filter(
        (value) => value !== eventHandler
      );
    return super.unregisterEventHandler(eventHandler);
  }

  override createMediaPlayer(): IMediaPlayer {
    // @ts-ignore
    const mediaPlayerId = super.createMediaPlayer() as number;
    return new MediaPlayerInternal(mediaPlayerId);
  }

  override destroyMediaPlayer(mediaPlayer: IMediaPlayer): number {
    const ret = super.destroyMediaPlayer(mediaPlayer);
    mediaPlayer.release?.call(mediaPlayer);
    return ret;
  }

  override createMediaRecorder(info: RecorderStreamInfo): IMediaRecorder {
    // @ts-ignore
    const nativeHandle = super.createMediaRecorder(info) as string;
    return new MediaRecorderInternal(nativeHandle);
  }

  override destroyMediaRecorder(mediaRecorder: IMediaRecorder): number {
    const ret = super.destroyMediaRecorder(mediaRecorder);
    mediaRecorder.release?.call(mediaRecorder);
    return ret;
  }

  override startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number {
    if (
      !RtcEngineExInternal._direct_cdn_streaming_event_handler.find(
        (value) => value === eventHandler
      )
    ) {
      RtcEngineExInternal._direct_cdn_streaming_event_handler.push(
        eventHandler
      );
    }
    return super.startDirectCdnStreaming(eventHandler, publishUrl, options);
  }

  override registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    if (
      !RtcEngineExInternal._metadata_observer.find(
        (value) => value === observer
      )
    ) {
      RtcEngineExInternal._metadata_observer.push(observer);
    }
    return super.registerMediaMetadataObserver(observer, type);
  }

  override unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    RtcEngineExInternal._metadata_observer =
      RtcEngineExInternal._metadata_observer.filter(
        (value) => value !== observer
      );
    return super.unregisterMediaMetadataObserver(observer, type);
  }

  protected override getApiTypeFromJoinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): string {
    return 'RtcEngine_joinChannel2';
  }

  protected override getApiTypeFromLeaveChannel(
    options?: LeaveChannelOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_leaveChannel'
      : 'RtcEngine_leaveChannel2';
  }

  protected override getApiTypeFromSetClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_setClientRole'
      : 'RtcEngine_setClientRole2';
  }

  protected override getApiTypeFromStartEchoTest(
    config: EchoTestConfiguration
  ): string {
    return 'RtcEngine_startEchoTest3';
  }

  protected override getApiTypeFromStartPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_startPreview2';
  }

  protected override getApiTypeFromStopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_stopPreview2';
  }

  protected override getApiTypeFromStartAudioRecording(
    config: AudioRecordingConfiguration
  ): string {
    return 'RtcEngine_startAudioRecording3';
  }

  protected override getApiTypeFromStartAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos: number = 0
  ): string {
    return 'RtcEngine_startAudioMixing2';
  }

  protected override getApiTypeFromEnableDualStreamMode(
    enabled: boolean,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_enableDualStreamMode'
      : 'RtcEngine_enableDualStreamMode2';
  }

  protected override getApiTypeFromSetDualStreamMode(
    mode: SimulcastStreamMode,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_setDualStreamMode'
      : 'RtcEngine_setDualStreamMode2';
  }

  protected override getApiTypeFromLeaveChannelEx(
    connection: RtcConnection,
    options?: LeaveChannelOptions
  ): string {
    return 'RtcEngineEx_leaveChannelEx2';
  }

  protected override getApiTypeFromCreateDataStream(
    config: DataStreamConfig
  ): string {
    return 'RtcEngine_createDataStream2';
  }

  protected override getApiTypeFromAddVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): string {
    return 'RtcEngine_addVideoWatermark2';
  }

  protected override getApiTypeFromJoinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_joinChannelWithUserAccount'
      : 'RtcEngine_joinChannelWithUserAccount2';
  }

  protected override getApiTypeFromCreateDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): string {
    return 'RtcEngineEx_createDataStreamEx2';
  }

  override getAudioDeviceManager(): IAudioDeviceManager {
    throw 'Not support';
  }

  override getVideoDeviceManager(): IVideoDeviceManager {
    throw 'Not support';
  }

  override getMediaEngine(): IMediaEngine {
    return this._media_engine;
  }

  override getMusicContentCenter(): IMusicContentCenter {
    return this._music_content_center;
  }

  override getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine {
    return this._local_spatial_audio_engine;
  }

  override registerAudioEncodedFrameObserver(
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

  override unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number {
    RtcEngineExInternal._audio_encoded_frame_observers =
      RtcEngineExInternal._audio_encoded_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioEncodedFrameObserver(observer);
  }

  override registerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number {
    if (
      !RtcEngineExInternal._audio_spectrum_observers.find(
        (value) => value === observer
      )
    ) {
      RtcEngineExInternal._audio_spectrum_observers.push(observer);
    }
    return super.registerAudioSpectrumObserver(observer);
  }

  override unregisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number {
    RtcEngineExInternal._audio_spectrum_observers =
      RtcEngineExInternal._audio_spectrum_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioSpectrumObserver(observer);
  }
}
