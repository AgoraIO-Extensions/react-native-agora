import './extension/IAgoraMediaEngineExtension';
import {
  IAudioFrameObserver,
  IVideoFrameObserver,
  IVideoEncodedFrameObserver,
  MediaSourceType,
  AudioFrame,
  ExternalVideoSourceType,
  ExternalVideoFrame,
} from './AgoraMediaBase';
import { SenderOptions, EncodedVideoFrameInfo } from './AgoraBase';
/* enum_audiomixingdualmonomode */
export enum AudioMixingDualMonoMode {
  /* enum_audiomixingdualmonomode_AudioMixingDualMonoAuto */
  AudioMixingDualMonoAuto = 0,
  /* enum_audiomixingdualmonomode_AudioMixingDualMonoL */
  AudioMixingDualMonoL = 1,
  /* enum_audiomixingdualmonomode_AudioMixingDualMonoR */
  AudioMixingDualMonoR = 2,
  /* enum_audiomixingdualmonomode_AudioMixingDualMonoMix */
  AudioMixingDualMonoMix = 3,
}

/* class_imediaengine */
export abstract class IMediaEngine {
  /* api_imediaengine_registeraudioframeobserver */
  abstract registerAudioFrameObserver(observer: IAudioFrameObserver): number;

  /* api_imediaengine_registervideoframeobserver */
  abstract registerVideoFrameObserver(observer: IVideoFrameObserver): number;

  /* api_imediaengine_registervideoencodedframeobserver */
  abstract registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;

  /* api_imediaengine_pushaudioframe */
  abstract pushAudioFrame(
    type: MediaSourceType,
    frame: AudioFrame,
    wrap?: boolean,
    sourceId?: number
  ): number;

  /* api_imediaengine_pushcaptureaudioframe */
  abstract pushCaptureAudioFrame(frame: AudioFrame): number;

  /* api_imediaengine_pushreverseaudioframe */
  abstract pushReverseAudioFrame(frame: AudioFrame): number;

  /* api_imediaengine_pushdirectaudioframe */
  abstract pushDirectAudioFrame(frame: AudioFrame): number;

  /* api_imediaengine_pullaudioframe */
  abstract pullAudioFrame(): AudioFrame;

  /* api_imediaengine_setexternalvideosource */
  abstract setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType?: ExternalVideoSourceType,
    encodedVideoOption?: SenderOptions
  ): number;

  /* api_imediaengine_setexternalaudiosource */
  abstract setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    sourceNumber?: number,
    localPlayback?: boolean,
    publish?: boolean
  ): number;

  /* api_imediaengine_setexternalaudiosink */
  abstract setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): number;

  /* api_imediaengine_enablecustomaudiolocalplayback */
  abstract enableCustomAudioLocalPlayback(
    sourceId: number,
    enabled: boolean
  ): number;

  /* api_imediaengine_setdirectexternalaudiosource */
  abstract setDirectExternalAudioSource(
    enable: boolean,
    localPlayback?: boolean
  ): number;

  /* api_imediaengine_pushvideoframe */
  abstract pushVideoFrame(
    frame: ExternalVideoFrame,
    videoTrackId?: number
  ): number;

  /* api_imediaengine_pushencodedvideoimage */
  abstract pushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
    videoTrackId?: number
  ): number;

  /* api_imediaengine_release */
  abstract release(): void;

  /* api_imediaengine_unregisteraudioframeobserver */
  abstract unregisterAudioFrameObserver(observer: IAudioFrameObserver): number;

  /* api_imediaengine_unregistervideoframeobserver */
  abstract unregisterVideoFrameObserver(observer: IVideoFrameObserver): number;

  /* api_imediaengine_unregistervideoencodedframeobserver */
  abstract unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;
}
