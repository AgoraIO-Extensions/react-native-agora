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

  /**
   * Registers a raw video frame observer object.
   *
   * If you want to obtain the original video data of some remote users (referred to as group A) and the encoded video data of other remote users (referred to as group B), you can refer to the following steps:
   *  Call registerVideoFrameObserver to register the raw video frame observer before joining the channel.
   *  Call registerVideoEncodedFrameObserver to register the encoded video frame observer before joining the channel.
   *  After joining the channel, get the user IDs of group B users through onUserJoined, and then call setRemoteVideoSubscriptionOptions to set the encodedFrameOnly of this group of users to true.
   *  Call muteAllRemoteVideoStreams (false) to start receiving the video streams of all remote users. Then:
   *  The raw video data of group A users can be obtained through the callback in IVideoFrameObserver, and the SDK renders the data by default.
   *  The encoded video data of group B users can be obtained through the callback in IVideoEncodedFrameObserver. If you want to observe raw video frames (such as YUV or RGBA format), Agora recommends that you implement one IVideoFrameObserver class with this method. When calling this method to register a video observer, you can register callbacks in the IVideoFrameObserver class as needed. After you successfully register the video frame observer, the SDK triggers the registered callbacks each time a video frame is received.
   *  Ensure that you call this method before joining a channel.
   *  When handling the video data returned in the callbacks, pay attention to the changes in the width and height parameters, which may be adapted under the following circumstances:
   *  When network conditions deteriorate, the video resolution decreases incrementally.
   *  If the user adjusts the video profile, the resolution of the video returned in the callbacks also changes.
   *
   * @param observer The observer instance. See IVideoFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract registerVideoFrameObserver(observer: IVideoFrameObserver): number;

  /**
   * Registers a receiver object for the encoded video image.
   *
   * If you only want to observe encoded video frames (such as h.264 format) without decoding and rendering the video, Agora recommends that you implement one IVideoEncodedFrameObserver class through this method. If you want to obtain the original video data of some remote users (referred to as group A) and the encoded video data of other remote users (referred to as group B), you can refer to the following steps:
   *  Call registerVideoFrameObserver to register the raw video frame observer before joining the channel.
   *  Call registerVideoEncodedFrameObserver to register the encoded video frame observer before joining the channel.
   *  After joining the channel, get the user IDs of group B users through onUserJoined, and then call setRemoteVideoSubscriptionOptions to set the encodedFrameOnly of this group of users to true.
   *  Call muteAllRemoteVideoStreams (false) to start receiving the video streams of all remote users. Then:
   *  The raw video data of group A users can be obtained through the callback in IVideoFrameObserver, and the SDK renders the data by default.
   *  The encoded video data of group B users can be obtained through the callback in IVideoEncodedFrameObserver.
   *  Call this method before joining a channel.
   *
   * @param observer The video frame observer object. See IVideoEncodedFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number;

  /**
   * Registers a facial information observer.
   *
   * You can call this method to register the onFaceInfo callback to receive the facial information processed by Agora speech driven extension. When calling this method to register a facial information observer, you can register callbacks in the IFaceInfoObserver class as needed. After successfully registering the facial information observer, the SDK triggers the callback you have registered when it captures the facial information converted by the speech driven extension.
   *  Ensure that you call this method before joining a channel.
   *  Before calling this method, you need to make sure that the speech driven extension has been enabled by calling enableExtension.
   *
   * @param observer Facial information observer, see IFaceInfoObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract registerFaceInfoObserver(observer: IFaceInfoObserver): number;

  /**
   * Pushes the external audio frame.
   *
   * Before calling this method to push external audio data, perform the following steps:
   *  Call createCustomAudioTrack to create a custom audio track and get the audio track ID.
   *  Call joinChannel to join the channel. In ChannelMediaOptions, set publishCustomAduioTrackId to the audio track ID that you want to publish, and set publishCustomAudioTrack to true.
   *
   * @param frame The external audio frame. See AudioFrame.
   * @param trackId The audio track ID. If you want to publish a custom external audio source, set this parameter to the ID of the corresponding custom audio track you want to publish.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract pushAudioFrame(frame: AudioFrame, trackId?: number): number;

  /**
   * Pulls the remote audio data.
   *
   * Before calling this method, call setExternalAudioSink (enabled : true) to notify the app to enable and set the external audio rendering. After a successful call of this method, the app pulls the decoded and mixed audio data for playback.
   *  Call this method after joining a channel.
   *  Both this method and onPlaybackAudioFrame callback can be used to get audio data after remote mixing. Note that after calling setExternalAudioSink to enable external audio rendering, the app no longer receives data from the onPlaybackAudioFrame callback. Therefore, you should choose between this method and the onPlaybackAudioFrame callback based on your actual business requirements. The specific distinctions between them are as follows:
   *  After calling this method, the app automatically pulls the audio data from the SDK. By setting the audio data parameters, the SDK adjusts the frame buffer to help the app handle latency, effectively avoiding audio playback jitter.
   *  The SDK sends the audio data to the app through the onPlaybackAudioFrame callback. Any delay in processing the audio frames may result in audio jitter.
   *  This method is only used for retrieving audio data after remote mixing. If you need to get audio data from different audio processing stages such as capture and playback, you can register the corresponding callbacks by calling registerAudioFrameObserver.
   *
   * @returns
   * The AudioFrame instance, if the method call succeeds.
   *  An error code, if the call fails,.
   */
  abstract pullAudioFrame(frame: AudioFrame): number;

  /**
   * Configures the external video source.
   *
   * Call this method before joining a channel.
   *
   * @param enabled Whether to use the external video source: true : Use the external video source. The SDK prepares to accept the external video frame. false : (Default) Do not use the external video source.
   * @param useTexture Whether to use the external video frame in the Texture format. true : Use the external video frame in the Texture format. false : (Default) Do not use the external video frame in the Texture format.
   * @param sourceType Whether the external video frame is encoded. See ExternalVideoSourceType.
   * @param encodedVideoOption Video encoding options. This parameter needs to be set if sourceType is EncodedVideoFrame. To set this parameter, contact.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setExternalVideoSource(
    enabled: boolean,
    useTexture: boolean,
    sourceType?: ExternalVideoSourceType,
    encodedVideoOption?: SenderOptions
  ): number;

  /**
   * Sets the external audio source parameters.
   *
   * Deprecated: This method is deprecated, use createCustomAudioTrack instead. Call this method before joining a channel.
   *
   * @param enabled Whether to enable the external audio source: true : Enable the external audio source. false : (Default) Disable the external audio source.
   * @param sampleRate The sample rate (Hz) of the external audio source which can be set as 8000, 16000, 32000, 44100, or 48000.
   * @param channels The number of channels of the external audio source, which can be set as 1 (Mono) or 2 (Stereo).
   * @param localPlayback Whether to play the external audio source: true : Play the external audio source. false : (Default) Do not play the external source.
   * @param publish Whether to publish audio to the remote users: true : (Default) Publish audio to the remote users. false : Do not publish audio to the remote users.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setExternalAudioSource(
    enabled: boolean,
    sampleRate: number,
    channels: number,
    localPlayback?: boolean,
    publish?: boolean
  ): number;

  /**
   * Creates a custom audio track.
   *
   * Ensure that you call this method before joining a channel. To publish a custom audio source, see the following steps:
   *  Call this method to create a custom audio track and get the audio track ID.
   *  Call joinChannel to join the channel. In ChannelMediaOptions, set publishCustomAduioTrackId to the audio track ID that you want to publish, and set publishCustomAudioTrack to true.
   *  Call pushAudioFrame and specify trackId as the audio track ID set in step 2. You can then publish the corresponding custom audio source in the channel.
   *
   * @param trackType The type of the custom audio track. See AudioTrackType. If AudioTrackDirect is specified for this parameter, you must set publishMicrophoneTrack to false in ChannelMediaOptions when calling joinChannel to join the channel; otherwise, joining the channel fails and returns the error code -2.
   * @param config The configuration of the custom audio track. See AudioTrackConfig.
   *
   * @returns
   * If the method call is successful, the audio track ID is returned as the unique identifier of the audio track.
   *  If the method call fails, a negative value is returned.
   */
  abstract createCustomAudioTrack(
    trackType: AudioTrackType,
    config: AudioTrackConfig
  ): number;

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
   * Pushes the external raw video frame to the SDK through video tracks.
   *
   * To publish a custom video source, see the following steps:
   *  Call createCustomVideoTrack to create a video track and get the video track ID.
   *  Call joinChannel to join the channel. In ChannelMediaOptions, set customVideoTrackId to the video track ID that you want to publish, and set publishCustomVideoTrack to true.
   *  Call this method and specify videoTrackId as the video track ID set in step 2. You can then publish the corresponding custom video source in the channel. After calling this method, even if you stop pushing external video frames to the SDK, the custom video stream will still be counted as the video duration usage and incur charges. Agora recommends that you take appropriate measures based on the actual situation to avoid such video billing.
   *  If you no longer need to capture external video data, you can call destroyCustomVideoTrack to destroy the custom video track.
   *  If you only want to use the external video data for local preview and not publish it in the channel, you can call muteLocalVideoStream to cancel sending video stream or call updateChannelMediaOptions to set publishCustomVideoTrack to false.
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
   * Unregisters a receiver object for the encoded video frame.
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

  /**
   * Unregisters a facial information observer.
   *
   * @param observer Facial information observer, see IFaceInfoObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract unregisterFaceInfoObserver(observer: IFaceInfoObserver): number;
}
