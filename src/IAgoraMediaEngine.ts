import './extension/IAgoraMediaEngineExtension';
import {
  AudioTrackConfig,
  AudioTrackType,
  EncodedVideoFrameInfo,
  SenderOptions,
} from './AgoraBase';
import {
  AudioFrame,
  ExternalVideoFrame,
  ExternalVideoSourceType,
  IAudioFrameObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from './AgoraMediaBase';

/**
 * The channel mode.
 */
export enum AudioMixingDualMonoMode {
  /**
   * @ignore
   */
  AudioMixingDualMonoAuto = 0,
  /**
   * 1: Left channel mode. This mode replaces the audio of the right channel with the audio of the left channel, which means the user can only hear the audio of the left channel.
   */
  AudioMixingDualMonoL = 1,
  /**
   * 2: Right channel mode. This mode replaces the audio of the left channel with the audio of the right channel, which means the user can only hear the audio of the right channel.
   */
  AudioMixingDualMonoR = 2,
  /**
   * 3: Mixed channel mode. This mode mixes the audio of the left channel and the right channel, which means the user can hear the audio of the left channel and the right channel at the same time.
   */
  AudioMixingDualMonoMix = 3,
}

/**
 * The IMediaEngine class.
 */
export abstract class IMediaEngine {
  /**
   * Registers an audio frame observer object.
   *
   * Call this method to register an audio frame observer object (register a callback). When you need the SDK to trigger onMixedAudioFrame, onRecordAudioFrame, onPlaybackAudioFrame or onEarMonitoringAudioFrame callback, you need to use this method to register the callbacks. Ensure that you call this method before joining a channel.
   *
   * @param observer The observer instance. See IAudioFrameObserver. Agora recommends calling this method after receiving onLeaveChannel to release the audio observer object.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract registerAudioFrameObserver(observer: IAudioFrameObserver): number;

  abstract registerVideoFrameObserver(observer: IVideoFrameObserver): number;

  abstract registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;

  abstract pushAudioFrame(frame: AudioFrame, trackId?: number): number;

  abstract pullAudioFrame(frame: AudioFrame): number;

  abstract setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType?: ExternalVideoSourceType,
    encodedVideoOption?: SenderOptions
  ): number;

  abstract setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback?: boolean,
    publish?: boolean
  ): number;

  abstract createCustomAudioTrack(trackType: AudioTrackType): {
    config: AudioTrackConfig;
    result: number;
  };

  /**
   * Destroys the specified audio track.
   *
   * @param trackId The custom audio track ID returned in createCustomAudioTrack.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract destroyCustomAudioTrack(trackId: number): number;

  /**
   * Sets the external audio sink.
   *
   * This method applies to scenarios where you want to use external audio data for playback. After you set the external audio sink, you can call pullAudioFrame to pull remote audio frames. The app can process the remote audio and play it with the audio effects that you want.
   *
   * @param enabled Whether to enable or disable the external audio sink: true : Enables the external audio sink. false : (Default) Disables the external audio sink.
   * @param sampleRate The sample rate (Hz) of the external audio sink, which can be set as 16000, 32000, 44100, or 48000.
   * @param channels The number of audio channels of the external audio sink:
   *  1: Mono.
   *  2: Stereo.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setExternalAudioSink(
    enabled: boolean,
    sampleRate: number,
    channels: number
  ): number;

  /**
   * @ignore
   */
  abstract enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): number;

  /**
   * Pushes the external raw video frame to the SDK.
   *
   * If you call createCustomVideoTrack method to get the video track ID, set the customVideoTrackId parameter to the video track ID you want to publish in the ChannelMediaOptions of each channel, and set the publishCustomVideoTrack parameter to true, you can call this method to push the unencoded external video frame to the SDK.
   *
   * @param frame The external raw video frame to be pushed. See ExternalVideoFrame.
   * @param videoTrackId The video track ID returned by calling the createCustomVideoTrack method. The default value is 0.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract pushVideoFrame(
    frame: ExternalVideoFrame,
    videoTrackId?: number
  ): number;

  /**
   * @ignore
   */
  abstract pushEncodedVideoImage(
    length: number,
    videoTrackId?: number
  ): { imageBuffer: Uint8Array; videoEncodedFrameInfo: EncodedVideoFrameInfo };

  /**
   * @ignore
   */
  abstract release(): void;

  /**
   * Unregisters an audio frame observer.
   *
   * @param observer The audio frame observer, reporting the reception of each audio frame. See IAudioFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract unregisterAudioFrameObserver(observer: IAudioFrameObserver): number;

  /**
   * Unregisters the video frame observer.
   *
   * @param observer The video observer, reporting the reception of each video frame. See IVideoFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract unregisterVideoFrameObserver(observer: IVideoFrameObserver): number;

  /**
   * Unregisters a receiver object for the encoded video image.
   *
   * @param observer The video observer, reporting the reception of each video frame. See IVideoEncodedFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;
}
