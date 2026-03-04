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
  IFaceInfoObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from './AgoraMediaBase';

/**
 * Channel mode.
 */
export enum AudioMixingDualMonoMode {
  /**
   * @ignore
   */
  AudioMixingDualMonoAuto = 0,
  /**
   * 1: Left channel mode. This mode replaces the right channel audio with the left channel audio, so the user only hears the left channel audio.
   */
  AudioMixingDualMonoL = 1,
  /**
   * 2: Right channel mode. This mode replaces the left channel audio with the right channel audio, so the user only hears the right channel audio.
   */
  AudioMixingDualMonoR = 2,
  /**
   * 3: Mixed mode. This mode overlays the left and right channel data, so the user hears both left and right channel audio simultaneously.
   */
  AudioMixingDualMonoMix = 3,
}

/**
 * IMediaEngine class.
 */
export abstract class IMediaEngine {
  /**
   * Registers an audio frame observer.
   *
   * This method registers an audio frame observer, i.e., registers callbacks. You need to call this method to register callbacks when the SDK needs to trigger onMixedAudioFrame, onRecordAudioFrame, onPlaybackAudioFrame, onPlaybackAudioFrameBeforeMixing, and onEarMonitoringAudioFrame.
   *
   * @param observer Instance of the interface object. See IAudioFrameObserver. It is recommended to call this after receiving onLeaveChannel to release the audio frame observer.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerAudioFrameObserver(observer: IAudioFrameObserver): number;

  /**
   * Registers a raw video frame observer.
   *
   * If you want to observe raw video frames (such as YUV or RGBA format), Agora recommends registering an IVideoFrameObserver class using this method.
   * When registering the video observer via this method, you can choose to register callbacks from the IVideoFrameObserver class as needed. After successful registration, the SDK triggers the registered callbacks when each video frame is captured. When handling the callback, you need to consider changes in the width and height parameters of the video frame, as the observed video frames may vary in the following scenarios:
   *  Resolution may decrease stepwise when network conditions are poor.
   *  When the user manually adjusts the resolution, the resolution reported in the callback also changes.
   *
   * @param observer Instance of the interface object. See IVideoFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerVideoFrameObserver(observer: IVideoFrameObserver): number;

  /**
   * Registers a video frame observer for encoded video images.
   *
   * If you only want to observe encoded video frames (e.g., H.264 format) without decoding and rendering them, Agora recommends registering an IVideoEncodedFrameObserver class using this method. This method must be called before joining a channel.
   *
   * @param observer Video frame observer. See IVideoEncodedFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;

  /**
   * Registers a face information observer.
   *
   * You can call this method to register the onFaceInfo callback and receive face information processed by the Agora voice driver extension. When registering the face info observer, you can register callbacks in the IFaceInfoObserver class as needed. After successful registration, the SDK triggers the registered callback when face information processed by the voice driver extension is captured.
   *  This method must be called before joining a channel.
   *  Before calling this method, make sure you have called enableExtension to enable the voice driver extension.
   *
   * @param observer Face information observer. See IFaceInfoObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerFaceInfoObserver(observer: IFaceInfoObserver): number;

  /**
   * Pushes external audio frames.
   *
   * Call this method to push external audio frames through an audio track.
   *
   * @param frame External audio frame. See AudioFrame.
   * @param trackId Audio track ID. If you want to publish a custom external audio source, set this parameter to the custom audio track ID you want to publish.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract pushAudioFrame(frame: AudioFrame, trackId?: number): number;

  /**
   * Pulls remote audio data.
   *
   * After calling this method, the app actively pulls the decoded and mixed remote audio data for playback. This method and the onPlaybackAudioFrame callback can both be used to obtain remote mixed audio playback data. After enabling external audio rendering by calling setExternalAudioSink, the app will no longer receive data from the onPlaybackAudioFrame callback. Therefore, choose between this method and the onPlaybackAudioFrame callback based on your actual business needs. The two have different processing mechanisms, detailed as follows:
   *  After calling this method, the app actively pulls audio data. By setting the audio data, the SDK can adjust the buffer to help the app handle latency, effectively avoiding audio playback jitter.
   *  After registering the onPlaybackAudioFrame callback, the SDK pushes audio data to the app through the callback. When the app handles audio frame latency, it may cause audio playback jitter. This method is only used to pull remote mixed audio playback data. To obtain raw captured audio data or raw audio playback data of each individual stream before mixing, you can register the corresponding callback by calling registerAudioFrameObserver.
   *
   * @returns
   * On success, returns an AudioFrame object.
   *  On failure, returns an error code.
   */
  abstract pullAudioFrame(frame: AudioFrame): number;

  /**
   * Sets the external video source.
   *
   * After enabling an external video source by calling this method, you can call pushVideoFrame to push external video data to the SDK. Switching video sources dynamically within the channel is not supported. If you have enabled an external video source and joined a channel, to switch to an internal video source, you must first leave the channel, then call this method to disable the external video source, and rejoin the channel.
   *
   * @param enabled Whether to enable the external video source: true : Enable the external video source. The SDK prepares to receive external video frames. false : (default) Do not enable the external video source.
   * @param useTexture Whether to use external video frames in Texture format: true : Use external video frames in Texture format. false : Do not use external video frames in Texture format.
   * @param sourceType Whether the external video frame is encoded. See ExternalVideoSourceType.
   * @param encodedVideoOption Video encoding options. If sourceType is EncodedVideoFrame, this parameter must be set. You can [contact technical support](https://ticket.shengwang.cn/) to learn how to set this parameter.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType?: ExternalVideoSourceType,
    encodedVideoOption?: SenderOptions
  ): number;

  /**
   * @ignore
   */
  abstract setExternalRemoteEglContext(eglContext: any): number;

  /**
   * Sets external audio capture parameters.
   *
   * Deprecated Deprecated: This method is obsolete. Use createCustomAudioTrack instead.
   *
   * @param enabled Whether to enable the use of external audio sources: true : Enable external audio source. false : (Default) Disable external audio source.
   * @param sampleRate Sampling rate (Hz) of the external audio source. Can be set to 8000, 16000, 32000, 44100, or 48000.
   * @param channels Number of channels of the external audio source. Can be set to 1 (mono) or 2 (stereo).
   * @param localPlayback Whether to play the external audio source locally: true : Play locally. false : (Default) Do not play locally.
   * @param publish Whether to publish the audio to the remote end: true : (Default) Publish to remote. false : Do not publish to remote.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback?: boolean,
    publish?: boolean
  ): number;

  /**
   * Creates a custom audio capture track.
   *
   * To publish custom captured audio in a channel, refer to the following steps:
   *  Call this method to create an audio track and obtain the audio track ID.
   *  When calling joinChannel to join a channel, set publishCustomAudioTrackId in ChannelMediaOptions to the audio track ID you want to publish, and set publishCustomAudioTrack to true.
   *  Call pushAudioFrame and specify the trackId as the audio track ID specified in step 2 to publish the corresponding custom audio source in the channel. You need to call this method before joining a channel.
   *
   * @param trackType Custom audio track type. See AudioTrackType. If AudioTrackDirect is specified, you must set publishMicrophoneTrack to false in ChannelMediaOptions when calling joinChannel, otherwise joining the channel will fail and return error code -2.
   * @param config Custom audio track configuration. See AudioTrackConfig.
   *
   * @returns
   * On success, returns the audio track ID as the unique identifier of the audio track.
   *  On failure, returns 0xffffffff. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract createCustomAudioTrack(
    trackType: AudioTrackType,
    config: AudioTrackConfig
  ): number;

  /**
   * Destroys the specified audio track.
   *
   * @param trackId Custom audio track ID returned by the createCustomAudioTrack method.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract destroyCustomAudioTrack(trackId: number): number;

  /**
   * Sets the external audio rendering.
   *
   * After calling this method to enable external audio rendering, you can call pullAudioFrame to pull remote audio data. The app can process the pulled raw audio data before rendering to achieve the desired audio effect. After calling this method to enable external audio rendering, the app will no longer receive data from the onPlaybackAudioFrame callback.
   *
   * @param enabled Sets whether to enable external audio rendering: true : Enable external audio rendering. false : (Default) Disable external audio rendering.
   * @param sampleRate The sample rate (Hz) for external audio rendering. Can be set to 16000, 32000, 44100, or 48000.
   * @param channels The number of channels for external audio rendering:
   *  1: Mono
   *  2: Stereo
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Publishes an external raw video frame to the channel through a custom video track.
   *
   * When you need to publish a custom captured video in the channel, refer to the following steps:
   *  Call the createCustomVideoTrack method to create a video track and obtain the video track ID.
   *  When calling joinChannel to join the channel, set customVideoTrackId in ChannelMediaOptions to the video track ID you want to publish, and set publishCustomVideoTrack to true.
   *  Call this method and specify videoTrackId as the video track ID specified in step 2 to publish the corresponding custom video source in the channel. After calling this method, even if you stop pushing external video frames to the SDK, the custom captured video stream will still be counted in video duration usage and incur charges. Agora recommends taking appropriate measures based on your actual situation to avoid such charges:
   *  If you no longer need to capture external video data, call destroyCustomVideoTrack to destroy the custom captured video track.
   *  If you only want to use the captured external video data for local preview and not publish it in the channel, call muteLocalVideoStream to stop sending the video stream, or call updateChannelMediaOptions and set publishCustomVideoTrack to false.
   *
   * @param frame The video frame to be pushed. See ExternalVideoFrame.
   * @param videoTrackId The video track ID returned by the createCustomVideoTrack method. If you only need to push one external video stream, set videoTrackId to 0.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Unregisters the audio frame observer.
   *
   * @param observer The audio frame observer that monitors the reception of each audio frame. See IAudioFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract unregisterAudioFrameObserver(observer: IAudioFrameObserver): number;

  /**
   * Unregisters the video frame observer.
   *
   * @param observer Video frame observer that observes each received video frame. See IVideoFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unregisterVideoFrameObserver(observer: IVideoFrameObserver): number;

  /**
   * Unregisters the video frame observer for encoded video images.
   *
   * @param observer Video frame observer that observes each received video frame. See IVideoEncodedFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;

  /**
   * Unregisters the face information observer.
   *
   * @param observer Face information observer. See IFaceInfoObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unregisterFaceInfoObserver(observer: IFaceInfoObserver): number;
}
