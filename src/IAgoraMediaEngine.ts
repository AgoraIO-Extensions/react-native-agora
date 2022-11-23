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
   * Call this method to register an audio frame observer object (register a callback). When you need the SDK to trigger onMixedAudioFrame , onRecordAudioFrame , onPlaybackAudioFrame or onEarMonitoringAudioFrame callback, you need to use this method to register the callbacks.Ensure that you call this method before joining a channel.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract registerAudioFrameObserver(observer: IAudioFrameObserver): number;

  /**
   * Registers a video frame observer object.
   * If you want to obtain the original video data of some remote users (referred to as group A) and the encoded video data of other remote users (referred to as group B), you can refer to the following steps:
   *  Call registerVideoFrameObserver to register the raw video frame observer before joining the channel.
   *  Call registerVideoEncodedFrameObserver to register the encoded video frame observer before joining the channel.
   *  After joining the channel, get the user IDs of group B users through onUserJoined , and then call setRemoteVideoSubscriptionOptions to set the encodedFrameOnly of this group of users to true.
   *  Call muteAllRemoteVideoStreams to start receiving the video streams of all remote users. Then:
   *  The raw video data of group A users can be obtained through the callback in IVideoFrameObserver , and the SDK renders the data by default.
   *  The encoded video data of group B users can be obtained through the callback in IVideoEncodedFrameObserver . If you want to observe raw video frames (such as YUV or RGBA format), Agora recommends that you implement one IVideoFrameObserver class with this method.After registering the class, you need to register the callbacks in the class as required. After you successfully register the video frame observer, the SDK triggers the registered callbacks each time a video frame is received.Ensure that you call this method before joining a channel.When handling the video data returned in the callbacks, pay attention to the changes in the width and height parameters, which may be adapted under the following circumstances:When network conditions deteriorate, the video resolution decreases incrementally.If the user adjusts the video profile, the resolution of the video returned in the callbacks also changes.
   */
  abstract registerVideoFrameObserver(observer: IVideoFrameObserver): number;

  /**
   * Registers a receiver object for the encoded video image.
   * If you only want to observe encoded video frames (such as h.264 format) without decoding and rendering the video, Agora recommends that you implement one IVideoEncodedFrameObserver class through this method.If you want to obtain the original video data of some remote users (referred to as group A) and the encoded video data of other remote users (referred to as group B), you can refer to the following steps:Call registerVideoFrameObserver to register the raw video frame observer before joining the channel.Call registerVideoEncodedFrameObserver to register the encoded video frame observer before joining the channel.After joining the channel, get the user IDs of group B users through onUserJoined , and then call setRemoteVideoSubscriptionOptions to set the encodedFrameOnly of this group of users to true.Call muteAllRemoteVideoStreams to start receiving the video streams of all remote users. Then:The raw video data of group A users can be obtained through the callback in IVideoFrameObserver , and the SDK renders the data by default.The encoded video data of group B users can be obtained through the callback in IVideoEncodedFrameObserver .Call this method before joining a channel.
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
   * Sets the external captured audio parameters and chooses whether to publish the audio to the remote user.
   * Call this method before joining a channel.
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
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unregisterAudioFrameObserver(observer: IAudioFrameObserver): number;

  /**
   * Unregisters the video frame observer.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unregisterVideoFrameObserver(observer: IVideoFrameObserver): number;

  /**
   * Unregisters a receiver object for the encoded video image.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;
}
