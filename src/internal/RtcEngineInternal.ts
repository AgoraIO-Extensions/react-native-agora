import {
  DirectCdnStreamingMediaOptions,
  IAudioDeviceManager,
  IDirectCdnStreamingEventHandler,
  IMediaPlayer,
  IMetadataObserver,
  IRtcEngineEventHandler,
  IVideoDeviceManager,
  MetadataType,
  RtcEngineContext,
  SDKBuildInfo,
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
    return super.initialize(context);
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

  getAudioDeviceManager(): IAudioDeviceManager {
    throw 'Not support';
  }

  getVideoDeviceManager(): IVideoDeviceManager {
    throw 'Not support';
  }
}
