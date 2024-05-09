import { createCheckers } from 'ts-interface-checker';

import {
  AudioEncodedFrameObserverConfig,
  ClientRoleOptions,
  ClientRoleType,
  IAudioEncodedFrameObserver,
  RecorderStreamInfo,
  SimulcastStreamConfig,
  SimulcastStreamMode,
} from '../AgoraBase';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';
import { IH265Transcoder } from '../IAgoraH265Transcoder';
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
import { ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio';
import { IAudioDeviceManager } from '../IAudioDeviceManager';
import { IRtcEngineEvent } from '../extension/IAgoraRtcEngineExtension';
import { IRtcEngineExImpl } from '../impl/IAgoraRtcEngineExImpl';
import AgoraBaseTI from '../ti/AgoraBase-ti';
import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
import IAgoraRtcEngineTI from '../ti/IAgoraRtcEngine-ti';

import { H265TranscoderInternal } from './AgoraH265TranscoderInternal';
import {
  DeviceEventEmitter,
  EVENT_TYPE,
  EventProcessor,
  callIrisApi,
} from './IrisApiEngine';
import { LocalSpatialAudioEngineInternal } from './LocalSpatialAudioEngineInternal';
import { MediaEngineInternal } from './MediaEngineInternal';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { MediaRecorderInternal } from './MediaRecorderInternal';
import { MusicContentCenterInternal } from './MusicContentCenterInternal';
import { parseIntPtr2Number } from '../Utils';

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
  private _h265_transcoder: IH265Transcoder = new H265TranscoderInternal();

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
    RtcEngineExInternal._event_handlers.map((it) => {
      super.unregisterEventHandler(it);
    });
    RtcEngineExInternal._event_handlers = [];
    RtcEngineExInternal._direct_cdn_streaming_event_handler = [];
    RtcEngineExInternal._metadata_observer = [];
    RtcEngineExInternal._audio_encoded_frame_observers = [];
    RtcEngineExInternal._audio_spectrum_observers = [];
    MediaPlayerInternal._source_observers.clear();
    MediaPlayerInternal._audio_frame_observers.clear();
    MediaPlayerInternal._video_frame_observers.clear();
    MediaPlayerInternal._audio_spectrum_observers.clear();
    MediaRecorderInternal._observers.clear();
    this._h265_transcoder.release();
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
    const callback = (eventProcessor: EventProcessor<any>, data: any) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IRtcEngine) {
        return;
      }
      eventProcessor.func.map((it) => {
        it({ [eventType]: listener }, eventType, data);
      });
    };
    // @ts-ignore
    listener!.agoraCallback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IRtcEngineEvent>(
    eventType: EventType,
    listener?: IRtcEngineEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      // @ts-ignore
      listener?.agoraCallback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IRtcEngineEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  override getVersion(): SDKBuildInfo {
    const apiType = 'RtcEngine_getVersion_915cb25';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return {
      build: jsonResults.build,
      version: jsonResults.result,
    };
  }

  override registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    // only call iris when no event handler registered
    let callIris = RtcEngineExInternal._event_handlers.length === 0;
    if (
      !RtcEngineExInternal._event_handlers.find(
        (value) => value === eventHandler
      )
    ) {
      RtcEngineExInternal._event_handlers.push(eventHandler);
    }
    return callIris ? super.registerEventHandler(eventHandler) : true;
  }

  override unregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): boolean {
    RtcEngineExInternal._event_handlers =
      RtcEngineExInternal._event_handlers.filter(
        (value) => value !== eventHandler
      );
    // only call iris when no event handler registered
    let callIris = RtcEngineExInternal._event_handlers.length === 0;
    return callIris ? super.unregisterEventHandler(eventHandler) : true;
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
    return options === undefined
      ? 'RtcEngine_joinChannel_f097389'
      : 'RtcEngine_joinChannel_cdbb747';
  }

  protected override getApiTypeFromLeaveChannel(
    options?: LeaveChannelOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_leaveChannel'
      : 'RtcEngine_leaveChannel_2c0e3aa';
  }

  protected override getApiTypeFromSetClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_setClientRole_3426fa6'
      : 'RtcEngine_setClientRole_b46cc48';
  }

  protected override getApiTypeFromEnableDualStreamMode(
    enabled: boolean,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_enableDualStreamMode_5039d15'
      : 'RtcEngine_enableDualStreamMode_9822d8a';
  }

  protected override getApiTypeFromSetDualStreamMode(
    mode: SimulcastStreamMode,
    streamConfig?: SimulcastStreamConfig
  ): string {
    return streamConfig === undefined
      ? 'RtcEngine_setDualStreamMode_3a7f662'
      : 'RtcEngine_setDualStreamMode_b3a4f6c';
  }

  protected override getApiTypeFromJoinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): string {
    return options === undefined
      ? 'RtcEngine_joinChannelWithUserAccount_0e4f59e'
      : 'RtcEngine_joinChannelWithUserAccount_4685af9';
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

  override getH265Transcoder(): IH265Transcoder {
    return this._h265_transcoder;
  }

  override getNativeHandle(): number {
    let result = super.getNativeHandle();
    return parseIntPtr2Number(result);
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
