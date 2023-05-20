import { callIrisApi } from '../internal/IrisApiEngine';
import { IMediaEngine } from '../IAgoraMediaEngine';
import {
  IAudioFrameObserver,
  IVideoFrameObserver,
  IVideoEncodedFrameObserver,
  MediaSourceType,
  AudioFrame,
  ExternalVideoSourceType,
  ExternalVideoFrame,
} from '../AgoraMediaBase';
import { SenderOptions, EncodedVideoFrameInfo } from '../AgoraBase';
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

  pushAudioFrame(
    type: MediaSourceType,
    frame: AudioFrame,
    wrap: boolean = false,
    sourceId: number = 0
  ): number {
    const apiType = this.getApiTypeFromPushAudioFrame(
      type,
      frame,
      wrap,
      sourceId
    );
    const jsonParams = {
      type: type,
      frame: frame,
      wrap: wrap,
      sourceId: sourceId,
      toJSON: () => {
        return {
          type: type,
          frame: frame,
          wrap: wrap,
          sourceId: sourceId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPushAudioFrame(
    type: MediaSourceType,
    frame: AudioFrame,
    wrap: boolean = false,
    sourceId: number = 0
  ): string {
    return 'MediaEngine_pushAudioFrame';
  }

  pushCaptureAudioFrame(frame: AudioFrame): number {
    const apiType = this.getApiTypeFromPushCaptureAudioFrame(frame);
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

  protected getApiTypeFromPushCaptureAudioFrame(frame: AudioFrame): string {
    return 'MediaEngine_pushCaptureAudioFrame';
  }

  pushReverseAudioFrame(frame: AudioFrame): number {
    const apiType = this.getApiTypeFromPushReverseAudioFrame(frame);
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

  protected getApiTypeFromPushReverseAudioFrame(frame: AudioFrame): string {
    return 'MediaEngine_pushReverseAudioFrame';
  }

  pushDirectAudioFrame(frame: AudioFrame): number {
    const apiType = this.getApiTypeFromPushDirectAudioFrame(frame);
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

  protected getApiTypeFromPushDirectAudioFrame(frame: AudioFrame): string {
    return 'MediaEngine_pushDirectAudioFrame';
  }

  pullAudioFrame(): AudioFrame {
    const apiType = this.getApiTypeFromPullAudioFrame();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const frame = jsonResults.frame;
    return frame;
  }

  protected getApiTypeFromPullAudioFrame(): string {
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
    sourceNumber: number = 1,
    localPlayback: boolean = false,
    publish: boolean = true
  ): number {
    const apiType = this.getApiTypeFromSetExternalAudioSource(
      enabled,
      sampleRate,
      channels,
      sourceNumber,
      localPlayback,
      publish
    );
    const jsonParams = {
      enabled: enabled,
      sampleRate: sampleRate,
      channels: channels,
      sourceNumber: sourceNumber,
      localPlayback: localPlayback,
      publish: publish,
      toJSON: () => {
        return {
          enabled: enabled,
          sampleRate: sampleRate,
          channels: channels,
          sourceNumber: sourceNumber,
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
    sourceNumber: number = 1,
    localPlayback: boolean = false,
    publish: boolean = true
  ): string {
    return 'MediaEngine_setExternalAudioSource';
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

  enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableCustomAudioLocalPlayback(
      sourceId,
      enabled
    );
    const jsonParams = {
      sourceId: sourceId,
      enabled: enabled,
      toJSON: () => {
        return {
          sourceId: sourceId,
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableCustomAudioLocalPlayback(
    sourceId: number,
    enabled: boolean
  ): string {
    return 'MediaEngine_enableCustomAudioLocalPlayback';
  }

  setDirectExternalAudioSource(
    enable: boolean,
    localPlayback: boolean = false
  ): number {
    const apiType = this.getApiTypeFromSetDirectExternalAudioSource(
      enable,
      localPlayback
    );
    const jsonParams = {
      enable: enable,
      localPlayback: localPlayback,
      toJSON: () => {
        return {
          enable: enable,
          localPlayback: localPlayback,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDirectExternalAudioSource(
    enable: boolean,
    localPlayback: boolean = false
  ): string {
    return 'MediaEngine_setDirectExternalAudioSource';
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
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
    videoTrackId: number = 0
  ): number {
    const apiType = this.getApiTypeFromPushEncodedVideoImage(
      imageBuffer,
      length,
      videoEncodedFrameInfo,
      videoTrackId
    );
    const jsonParams = {
      imageBuffer: imageBuffer,
      length: length,
      videoEncodedFrameInfo: videoEncodedFrameInfo,
      videoTrackId: videoTrackId,
      toJSON: () => {
        return {
          length: length,
          videoEncodedFrameInfo: videoEncodedFrameInfo,
          videoTrackId: videoTrackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
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
