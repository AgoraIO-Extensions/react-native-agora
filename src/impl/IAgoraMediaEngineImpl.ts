import {
  AudioTrackConfig,
  AudioTrackType,
  EncodedVideoFrameInfo,
  SenderOptions,
} from '../AgoraBase';
import {
  AudioFrame,
  ExternalVideoFrame,
  ExternalVideoSourceType,
  IAudioFrameObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from '../AgoraMediaBase';
import { IMediaEngine } from '../IAgoraMediaEngine';

// @ts-ignore
export class IMediaEngineImpl implements IMediaEngine {
  registerAudioFrameObserver(observer: IAudioFrameObserver): number {
    const apiType = this.getApiTypeFromRegisterAudioFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterAudioFrameObserver(
    observer: IAudioFrameObserver
  ): string {
    return 'MediaEngine_registerAudioFrameObserver';
  }

  registerVideoFrameObserver(observer: IVideoFrameObserver): number {
    const apiType = this.getApiTypeFromRegisterVideoFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterVideoFrameObserver(
    observer: IVideoFrameObserver
  ): string {
    return 'MediaEngine_registerVideoFrameObserver';
  }

  registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    const apiType =
      this.getApiTypeFromRegisterVideoEncodedFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): string {
    return 'MediaEngine_registerVideoEncodedFrameObserver';
  }

  pushAudioFrame(frame: AudioFrame, trackId: number = 0): number {
    const apiType = this.getApiTypeFromPushAudioFrame(frame, trackId);
    const jsonParams = {
      frame: frame,
      trackId: trackId,
      toJSON: () => {
        return {
          frame: frame,
          trackId: trackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPushAudioFrame(
    frame: AudioFrame,
    trackId: number = 0
  ): string {
    return 'MediaEngine_pushAudioFrame';
  }

  pullAudioFrame(frame: AudioFrame): number {
    const apiType = this.getApiTypeFromPullAudioFrame(frame);
    const jsonParams = {
      frame: frame,
      toJSON: () => {
        return {
          frame: frame,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPullAudioFrame(frame: AudioFrame): string {
    return 'MediaEngine_pullAudioFrame';
  }

  setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: ExternalVideoSourceType = ExternalVideoSourceType.VideoFrame,
    encodedVideoOption: SenderOptions = new SenderOptions()
  ): number {
    const apiType = this.getApiTypeFromSetExternalVideoSource(
      enabled,
      useTexture,
      sourceType,
      encodedVideoOption
    );
    const jsonParams = {
      enabled: enabled,
      useTexture: useTexture,
      sourceType: sourceType,
      encodedVideoOption: encodedVideoOption,
      toJSON: () => {
        return {
          enabled: enabled,
          useTexture: useTexture,
          sourceType: sourceType,
          encodedVideoOption: encodedVideoOption,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType: ExternalVideoSourceType = ExternalVideoSourceType.VideoFrame,
    encodedVideoOption: SenderOptions = new SenderOptions()
  ): string {
    return 'MediaEngine_setExternalVideoSource';
  }

  setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback: boolean = false,
    publish: boolean = true
  ): number {
    const apiType = this.getApiTypeFromSetExternalAudioSource(
      enabled,
      sampleRate,
      channels,
      localPlayback,
      publish
    );
    const jsonParams = {
      enabled: enabled,
      sampleRate: sampleRate,
      channels: channels,
      localPlayback: localPlayback,
      publish: publish,
      toJSON: () => {
        return {
          enabled: enabled,
          sampleRate: sampleRate,
          channels: channels,
          localPlayback: localPlayback,
          publish: publish,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback: boolean = false,
    publish: boolean = true
  ): string {
    return 'MediaEngine_setExternalAudioSource';
  }

  createCustomAudioTrack(trackType: AudioTrackType): {
    config: AudioTrackConfig;
    result: number;
  } {
    const apiType = this.getApiTypeFromCreateCustomAudioTrack(trackType);
    const jsonParams = {
      trackType: trackType,
      toJSON: () => {
        return {
          trackType: trackType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    const result = jsonResults.result;
    return {
      config,
      result,
    };
  }

  protected getApiTypeFromCreateCustomAudioTrack(
    trackType: AudioTrackType
  ): string {
    return 'MediaEngine_createCustomAudioTrack';
  }

  destroyCustomAudioTrack(trackId: number): number {
    const apiType = this.getApiTypeFromDestroyCustomAudioTrack(trackId);
    const jsonParams = {
      trackId: trackId,
      toJSON: () => {
        return {
          trackId: trackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDestroyCustomAudioTrack(trackId: number): string {
    return 'MediaEngine_destroyCustomAudioTrack';
  }

  setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): number {
    const apiType = this.getApiTypeFromSetExternalAudioSink(
      enabled,
      sampleRate,
      channels
    );
    const jsonParams = {
      enabled: enabled,
      sampleRate: sampleRate,
      channels: channels,
      toJSON: () => {
        return {
          enabled: enabled,
          sampleRate: sampleRate,
          channels: channels,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): string {
    return 'MediaEngine_setExternalAudioSink';
  }

  enableCustomAudioLocalPlayback(trackId: number, enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableCustomAudioLocalPlayback(
      trackId,
      enabled
    );
    const jsonParams = {
      trackId: trackId,
      enabled: enabled,
      toJSON: () => {
        return {
          trackId: trackId,
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): string {
    return 'MediaEngine_enableCustomAudioLocalPlayback';
  }

  pushVideoFrame(frame: ExternalVideoFrame, videoTrackId: number = 0): number {
    const apiType = this.getApiTypeFromPushVideoFrame(frame, videoTrackId);
    const jsonParams = {
      frame: frame,
      videoTrackId: videoTrackId,
      toJSON: () => {
        return {
          frame: frame,
          videoTrackId: videoTrackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPushVideoFrame(
    frame: ExternalVideoFrame,
    videoTrackId: number = 0
  ): string {
    return 'MediaEngine_pushVideoFrame';
  }

  pushEncodedVideoImage(
    length: number,
    videoTrackId: number = 0
  ): { imageBuffer: Uint8Array; videoEncodedFrameInfo: EncodedVideoFrameInfo } {
    const apiType = this.getApiTypeFromPushEncodedVideoImage(
      length,
      videoTrackId
    );
    const jsonParams = {
      length: length,
      videoTrackId: videoTrackId,
      toJSON: () => {
        return {
          length: length,
          videoTrackId: videoTrackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const imageBuffer = jsonResults.imageBuffer;
    const videoEncodedFrameInfo = jsonResults.videoEncodedFrameInfo;
    return {
      imageBuffer,
      videoEncodedFrameInfo,
    };
  }

  protected getApiTypeFromPushEncodedVideoImage(
    length: number,
    videoTrackId: number = 0
  ): string {
    return 'MediaEngine_pushEncodedVideoImage';
  }

  release(): void {
    const apiType = this.getApiTypeFromRelease();
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(): string {
    return 'MediaEngine_release';
  }

  unregisterAudioFrameObserver(observer: IAudioFrameObserver): number {
    const apiType = this.getApiTypeFromUnregisterAudioFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterAudioFrameObserver(
    observer: IAudioFrameObserver
  ): string {
    return 'MediaEngine_unregisterAudioFrameObserver';
  }

  unregisterVideoFrameObserver(observer: IVideoFrameObserver): number {
    const apiType = this.getApiTypeFromUnregisterVideoFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterVideoFrameObserver(
    observer: IVideoFrameObserver
  ): string {
    return 'MediaEngine_unregisterVideoFrameObserver';
  }

  unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    const apiType =
      this.getApiTypeFromUnregisterVideoEncodedFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): string {
    return 'MediaEngine_unregisterVideoEncodedFrameObserver';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
