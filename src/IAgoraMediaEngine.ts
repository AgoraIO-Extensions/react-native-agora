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
/**
 * The channel mode.
 *
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
 *
 */
export abstract class IMediaEngine {
/**
 * Registers an audio frame observer object.
 * Call this method to register an audio frame observer object (register a callback). When you need the SDK to trigger onMixedAudioFrame , onRecordAudioFrame , onPlaybackAudioFrame or callback, you need to use this method to register the callbacks.Ensure that you call this method before joining a channel.
 *
 * @param observer The observer object instance. See IAudioFrameObserver . Agora recommends calling after receiving onLeaveChannel to release the audio observer object.
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract registerAudioFrameObserver(observer: IAudioFrameObserver): number;

/**
 * Registers a video frame observer object.
 * You need to implement the IVideoFrameObserver class in this method and register callbacks according to your scenarios. After you successfully register the video frame observer, the SDK triggers the registered callbacks each time a video frame is received.When handling the video data returned in the callbacks, pay attention to the changes in the width and height parameters, which may be adapted under the following circumstances:When the network condition deteriorates, the video resolution decreases incrementally.If the user adjusts the video profile, the resolution of the video returned in the callbacks also changes.Ensure that you call this method before joining a channel.
 *
 * @param observer The observer object instance. See IVideoFrameObserver . 
 */
  abstract registerVideoFrameObserver(observer: IVideoFrameObserver): number;

/**
 * Registers a receiver object for the encoded video image.
 * Call this method after joining a channel.If you register an IVideoEncodedFrameObserver object, you cannot register an IVideoFrameObserver object.
 *
 * @param observer The video frame observer object. See IVideoEncodedFrameObserver .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;

/**
 * Pushes the external audio frame.
 *
 *
 * @param type The type of the audio recording device. See MediaSourceType .
 * @param frame The external audio frame. See AudioFrame .
 * @param wrap Whether to use the placeholder. Agora recommends using the default value.true: Use the placeholder.false: (Default) Do not use the placeholder.
 * @param sourceId The ID of external audio source. If you want to publish a custom external audio source, set this parameter to the ID of the corresponding custom audio track you want to publish.
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract pushAudioFrame(
    type: MediaSourceType,
    frame: AudioFrame,
    wrap?: boolean,
    sourceId?: number
  ): number;

  /**
   * @ignore
   */
  abstract pushCaptureAudioFrame(frame: AudioFrame): number;

  /**
   * @ignore
   */
  abstract pushReverseAudioFrame(frame: AudioFrame): number;

  /**
   * @ignore
   */
  abstract pushDirectAudioFrame(frame: AudioFrame): number;

/**
 * Pulls the remote audio data.
 * Before calling this method, you need to call setExternalAudioSink to notify the app to enable and set the external rendering.After a successful method call, the app pulls the decoded and mixed audio data for playback.This method only supports pulling data from custom audio source. If you need to pull the data captured by the SDK, do not call this method.Call this method after joining a channel.Once you enable the external audio sink, the app will not retrieve any audio data from the onPlaybackAudioFrame callback.The difference between this method and the onPlaybackAudioFrame callback is as follows:The SDK sends the audio data to the app through the onPlaybackAudioFrame callback. Any delay in processing the audio frames may result in audio jitter.After a successful method call, the app automatically pulls the audio data from the SDK. After setting the audio data parameters, the SDK adjusts the frame buffer and avoids problems caused by jitter in the external audio playback.
 */
  abstract pullAudioFrame(): AudioFrame;

/**
 * Configures the external video source.
 * Call this method before joining a channel.
 *
 * @param enabled Whether to use the external video source:true: Use the external video source. The SDK prepares to accept the external video frame.false: (Default) Do not use the external video source.
 * @param useTexture Whether to use the external video frame in the Texture format.true: Use the external video frame in the Texture format.false: (Default) Do not use the external video frame in the Texture format.
 * @param sourceType Whether to encode the external video frame, see ExternalVideoSourceType .
 * @param encodedVideoOption Video encoding options. This parameter needs to be set if sourceType is EncodedVideoFrame. To set this parameter, contact .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType?: ExternalVideoSourceType,
    encodedVideoOption?: SenderOptions
  ): number;

/**
 * Sets the external audio source parameters.
 * Call this method before joining a channel.
 *
 * @param enabled Whether to enable the external audio source:true: Enable the external audio source.false: (Default) Disable the external audio source.
 * @param sampleRate The sample rate (Hz) of the external audio source, which can be set as 8000, 16000, 32000, 44100, or 48000.
 * @param channels The number of channels of the external audio source, which can be set as 1 (Mono) or 2 (Stereo).
 * @param sourceNumber The number of external audio sources. The value of this parameter should be larger than 0. The SDK creates a corresponding number of custom audio tracks based on this parameter value and names the audio tracks starting from 0. In ChannelMediaOptions , you can set publishCustomAudioSourceId to the ID of the audio track you want to publish.
 * @param localPlayback Whether to play the external audio source:true: Play the external audio source.false: (Default) Do not play the external source.
 * @param publish Whether to publish audio to the remote users:true: (Default) Publish audio to the remote users.false: Do not publish audio to the remote users
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    sourceNumber?: number,
    localPlayback?: boolean,
    publish?: boolean
  ): number;

/**
 * Sets the external audio sink.
 * This method applies to scenarios where you want to use external audio data for playback. After you set the external audio sink, you can call pullAudioFrame to pull remote audio frames. The app can process the remote audio and play it with the audio effects that you want.
 *
 * @param enabled Whether to enable or disable the external audio sink:true: Enables the external audio sink.false: (Default) Disables the external audio sink.
 * @param sampleRate The sample rate (Hz) of the external audio sink, which can be set as 16000, 32000, 44100, or 48000.
 * @param channels The number of audio channels of the external audio sink:1: Mono.2: Stereo.
 *
 * @returns
 * 0: Success.< 0: Failure.
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
    sourceId: number,
    enabled: boolean
  ): number;

  /**
   * @ignore
   */
  abstract setDirectExternalAudioSource(
    enable: boolean,
    localPlayback?: boolean
  ): number;

/**
 * Pushes the external raw video frame to the SDK.
 * To push the unencoded external raw video frame to the SDK, call createCustomVideoTrack to get the video track ID, set customVideoTrackId as the video track ID you want to publish in the ChannelMediaOptions of each channel, and set publishCustomVideoTrack as true.
 *
 * @param frame The external raw video frame to be pushed. See ExternalVideoFrame .
 * @param videoTrackId The video track ID returned by calling the createCustomVideoTrack method. The default value is 0.
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract pushVideoFrame(
    frame: ExternalVideoFrame,
    videoTrackId?: number
  ): number;

/**
 * @ignore
 */
  abstract pushEncodedVideoImage(
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo,
    videoTrackId?: number
  ): number;

  /**
   * @ignore
   */
  abstract release(): void;

/**
 * Unregisters an audio frame observer.
 *
 *
 * @param observer The audio frame observer, reporting the reception of each audio frame. See IAudioFrameObserver .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract unregisterAudioFrameObserver(observer: IAudioFrameObserver): number;

/**
 * Unregisters the video frame observer.
 *
 *
 * @param observer The video observer, reporting the reception of each video frame. See IVideoFrameObserver .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract unregisterVideoFrameObserver(observer: IVideoFrameObserver): number;

/**
 * Unregisters a receiver object for the encoded video image.
 *
 *
 * @param observer The video observer, reporting the reception of each video frame. See IVideoEncodedFrameObserver .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;
}