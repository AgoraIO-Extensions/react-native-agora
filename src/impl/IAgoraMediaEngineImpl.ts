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
  IFaceInfoObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from '../AgoraMediaBase';
import { IMediaEngine } from '../IAgoraMediaEngine';
import { callIrisApi } from '../internal/call';

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
    return 'MediaEngine_registerAudioFrameObserver_d873a64';
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
    return 'MediaEngine_registerVideoFrameObserver_2cc0ef1';
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
    return 'MediaEngine_registerVideoEncodedFrameObserver_d45d579';
  }

  registerFaceInfoObserver(observer: IFaceInfoObserver): number {
    const apiType = this.getApiTypeFromRegisterFaceInfoObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterFaceInfoObserver(
    observer: IFaceInfoObserver
  ): string {
    return 'MediaEngine_registerFaceInfoObserver_0303ed6';
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
    return 'MediaEngine_pushAudioFrame_c71f4ab';
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
    return 'MediaEngine_pullAudioFrame_2c74a9c';
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
    return 'MediaEngine_setExternalVideoSource_fff99b6';
  }

  setExternalRemoteEglContext(eglContext: any): number {
    const apiType = this.getApiTypeFromSetExternalRemoteEglContext(eglContext);
    const jsonParams = {
      eglContext: eglContext,
      toJSON: () => {
        return {
          eglContext: eglContext,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetExternalRemoteEglContext(eglContext: any): string {
    return 'MediaEngine_setExternalRemoteEglContext_f337cbf';
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
    return 'MediaEngine_setExternalAudioSource_e6538be';
  }

  createCustomAudioTrack(
    trackType: AudioTrackType,
    config: AudioTrackConfig
  ): number {
    const apiType = this.getApiTypeFromCreateCustomAudioTrack(
      trackType,
      config
    );
    const jsonParams = {
      trackType: trackType,
      config: config,
      toJSON: () => {
        return {
          trackType: trackType,
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromCreateCustomAudioTrack(
    trackType: AudioTrackType,
    config: AudioTrackConfig
  ): string {
    return 'MediaEngine_createCustomAudioTrack_5a0bf1a';
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
    return 'MediaEngine_destroyCustomAudioTrack_6178b5d';
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
    return 'MediaEngine_setExternalAudioSink_d275ce0';
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
    return 'MediaEngine_enableCustomAudioLocalPlayback_5f38e8a';
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
    return 'MediaEngine_pushVideoFrame_4e544e2';
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
    return 'MediaEngine_pushEncodedVideoImage_e71452b';
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

  unregisterFaceInfoObserver(observer: IFaceInfoObserver): number {
    const apiType = this.getApiTypeFromUnregisterFaceInfoObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterFaceInfoObserver(
    observer: IFaceInfoObserver
  ): string {
    return 'MediaEngine_unregisterFaceInfoObserver';
  }
}
