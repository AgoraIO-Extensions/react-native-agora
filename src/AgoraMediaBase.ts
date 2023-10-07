import './extension/AgoraMediaBaseExtension';
import { EncodedVideoFrameInfo } from './AgoraBase';

/**
 * The type of the video source.
 */
export enum VideoSourceType {
  /**
   * 0: (Default) The primary camera.
   */
  VideoSourceCameraPrimary = 0,
  /**
   * 0: (Default) The primary camera.
   */
  VideoSourceCamera = 0,
  /**
   * 1: The secondary camera.
   */
  VideoSourceCameraSecondary = 1,
  /**
   * 2: The primary screen.
   */
  VideoSourceScreenPrimary = 2,
  /**
   * 2: The primary screen.
   */
  VideoSourceScreen = 2,
  /**
   * 3: The secondary screen.
   */
  VideoSourceScreenSecondary = 3,
  /**
   * 4: A custom video source.
   */
  VideoSourceCustom = 4,
  /**
   * 5: The media player.
   */
  VideoSourceMediaPlayer = 5,
  /**
   * 6: One PNG image.
   */
  VideoSourceRtcImagePng = 6,
  /**
   * 7: One JPEG image.
   */
  VideoSourceRtcImageJpeg = 7,
  /**
   * 8: One GIF image.
   */
  VideoSourceRtcImageGif = 8,
  /**
   * 9: One remote video acquired by the network.
   */
  VideoSourceRemote = 9,
  /**
   * 10: One transcoded video source.
   */
  VideoSourceTranscoded = 10,
  /**
   * @ignore
   */
  VideoSourceCameraThird = 11,
  /**
   * @ignore
   */
  VideoSourceCameraFourth = 12,
  /**
   * @ignore
   */
  VideoSourceScreenThird = 13,
  /**
   * @ignore
   */
  VideoSourceScreenFourth = 14,
  /**
   * 100: An unknown video source.
   */
  VideoSourceUnknown = 100,
}

/**
 * The type of the audio route.
 */
export enum AudioRoute {
  /**
   * -1: The default audio route.
   */
  RouteDefault = -1,
  /**
   * 0: Audio output routing is a headset with microphone.
   */
  RouteHeadset = 0,
  /**
   * 1: The audio route is an earpiece.
   */
  RouteEarpiece = 1,
  /**
   * 2: The audio route is a headset without a microphone.
   */
  RouteHeadsetnomic = 2,
  /**
   * 3: The audio route is the speaker that comes with the device.
   */
  RouteSpeakerphone = 3,
  /**
   * 4: The audio route is an external speaker. (iOS only)
   */
  RouteLoudspeaker = 4,
  /**
   * @ignore
   */
  RouteHeadsetbluetooth = 5,
  /**
   * @ignore
   */
  RouteUsb = 6,
  /**
   * @ignore
   */
  RouteHdmi = 7,
  /**
   * @ignore
   */
  RouteDisplayport = 8,
  /**
   * @ignore
   */
  RouteAirplay = 9,
}

/**
 * @ignore
 */
export enum BytesPerSample {
  /**
   * @ignore
   */
  TwoBytesPerSample = 2,
}

/**
 * @ignore
 */
export class AudioParameters {
  /**
   * @ignore
   */
  sample_rate?: number;
  /**
   * @ignore
   */
  channels?: number;
  /**
   * @ignore
   */
  frames_per_buffer?: number;
}

/**
 * The use mode of the audio data.
 */
export enum RawAudioFrameOpModeType {
  /**
   * 0: Read-only mode, For example, when users acquire the data with the Agora SDK, then start the media push.
   */
  RawAudioFrameOpModeReadOnly = 0,
  /**
   * 2: Read and write mode, For example, when users have their own audio-effect processing module and perform some voice preprocessing, such as a voice change.
   */
  RawAudioFrameOpModeReadWrite = 2,
}

/**
 * Media source type.
 */
export enum MediaSourceType {
  /**
   * 0: Audio playback device.
   */
  AudioPlayoutSource = 0,
  /**
   * 1: Audio capturing device.
   */
  AudioRecordingSource = 1,
  /**
   * 2: The primary camera.
   */
  PrimaryCameraSource = 2,
  /**
   * 3: The secondary camera.
   */
  SecondaryCameraSource = 3,
  /**
   * @ignore
   */
  PrimaryScreenSource = 4,
  /**
   * @ignore
   */
  SecondaryScreenSource = 5,
  /**
   * @ignore
   */
  CustomVideoSource = 6,
  /**
   * @ignore
   */
  MediaPlayerSource = 7,
  /**
   * @ignore
   */
  RtcImagePngSource = 8,
  /**
   * @ignore
   */
  RtcImageJpegSource = 9,
  /**
   * @ignore
   */
  RtcImageGifSource = 10,
  /**
   * @ignore
   */
  RemoteVideoSource = 11,
  /**
   * @ignore
   */
  TranscodedVideoSource = 12,
  /**
   * 100: Unknown media source.
   */
  UnknownMediaSource = 100,
}

/**
 * @ignore
 */
export enum ContentInspectResult {
  /**
   * @ignore
   */
  ContentInspectNeutral = 1,
  /**
   * @ignore
   */
  ContentInspectSexy = 2,
  /**
   * @ignore
   */
  ContentInspectPorn = 3,
}

/**
 * The type of video content moderation module.
 */
export enum ContentInspectType {
  /**
   * 0: (Default) This module has no actual function. Do not set type to this value.
   */
  ContentInspectInvalid = 0,
  /**
   * @ignore
   */
  ContentInspectModeration = 1,
  /**
   * @ignore
   */
  ContentInspectSupervision = 2,
  /**
   * 3: Video screenshot and upload via extensions from Agora Extensions Marketplace. SDK uses video moderation extensions from Agora Extensions Marketplace to take screenshots of the video stream in the channel and uploads them.
   */
  ContentInspectImageModeration = 3,
}

/**
 * A ContentInspectModule structure used to configure the frequency of video screenshot and upload.
 */
export class ContentInspectModule {
  /**
   * Types of functional module. See ContentInspectType.
   */
  type?: ContentInspectType;
  /**
   * The frequency (s) of video screenshot and upload. The value should be set as larger than 0. The default value is 0, the SDK does not take screenshots. Agora recommends that you set the value as 10; you can also adjust it according to your business needs.
   */
  interval?: number;
}

/**
 * Configuration of video screenshot and upload.
 */
export class ContentInspectConfig {
  /**
   * Additional information on the video content (maximum length: 1024 Bytes). The SDK sends the screenshots and additional information on the video content to the Agora server. Once the video screenshot and upload process is completed, the Agora server sends the additional information and the callback notification to your server.
   */
  extraInfo?: string;
  /**
   * (Optional) Server configuration related to uploading video screenshots via extensions from Agora Extensions Marketplace. This parameter only takes effect when type in ContentInspectModule is set to ContentInspectImageModeration. If you want to use it, contact.
   */
  serverConfig?: string;
  /**
   * Functional module. See ContentInspectModule. A maximum of 32 ContentInspectModule instances can be configured, and the value range of MAX_CONTENT_INSPECT_MODULE_COUNT is an integer in [1,32]. A function module can only be configured with one instance at most. Currently only the video screenshot and upload function is supported.
   */
  modules?: ContentInspectModule[];
  /**
   * The number of functional modules, that is,the number of configured ContentInspectModule instances, must be the same as the number of instances configured in modules. The maximum number is 32.
   */
  moduleCount?: number;
}

/**
 * @ignore
 */
export class PacketOptions {
  /**
   * @ignore
   */
  timestamp?: number;
  /**
   * @ignore
   */
  audioLevelIndication?: number;
}

/**
 * @ignore
 */
export class AudioEncodedFrameInfo {
  /**
   * @ignore
   */
  sendTs?: number;
  /**
   * @ignore
   */
  codec?: number;
}

/**
 * The parameters of the audio frame in PCM format.
 */
export class AudioPcmFrame {
  /**
   * The timestamp (ms) of the audio frame.
   */
  capture_timestamp?: number;
  /**
   * The number of samples per channel in the audio frame.
   */
  samples_per_channel_?: number;
  /**
   * Audio sample rate (Hz).
   */
  sample_rate_hz_?: number;
  /**
   * The number of audio channels.
   */
  num_channels_?: number;
  /**
   * The number of bytes per sample.
   */
  bytes_per_sample?: BytesPerSample;
  /**
   * The audio frame.
   */
  data_?: number[];
}

/**
 * The channel mode.
 */
export enum AudioDualMonoMode {
  /**
   * 0: Original mode.
   */
  AudioDualMonoStereo = 0,
  /**
   * 1: Left channel mode. This mode replaces the audio of the right channel with the audio of the left channel, which means the user can only hear the audio of the left channel.
   */
  AudioDualMonoL = 1,
  /**
   * 2: Right channel mode. This mode replaces the audio of the left channel with the audio of the right channel, which means the user can only hear the audio of the right channel.
   */
  AudioDualMonoR = 2,
  /**
   * 3: Mixed channel mode. This mode mixes the audio of the left channel and the right channel, which means the user can hear the audio of the left channel and the right channel at the same time.
   */
  AudioDualMonoMix = 3,
}

/**
 * The video pixel format.
 */
export enum VideoPixelFormat {
  /**
   * 0: Raw video pixel format.
   */
  VideoPixelDefault = 0,
  /**
   * 1: The format is I420.
   */
  VideoPixelI420 = 1,
  /**
   * @ignore
   */
  VideoPixelBgra = 2,
  /**
   * @ignore
   */
  VideoPixelNv21 = 3,
  /**
   * 4: The format is RGBA.
   */
  VideoPixelRgba = 4,
  /**
   * @ignore
   */
  VideoPixelNv12 = 8,
  /**
   * @ignore
   */
  VideoTexture2d = 10,
  /**
   * @ignore
   */
  VideoTextureOes = 11,
  /**
   * @ignore
   */
  VideoCvpixelNv12 = 12,
  /**
   * @ignore
   */
  VideoCvpixelI420 = 13,
  /**
   * @ignore
   */
  VideoCvpixelBgra = 14,
  /**
   * 16: The format is I422.
   */
  VideoPixelI422 = 16,
  /**
   * @ignore
   */
  VideoTextureId3d11texture2d = 17,
}

/**
 * Video display modes.
 */
export enum RenderModeType {
  /**
   * 1: Hidden mode. Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). One dimension of the video may have clipped contents.
   */
  RenderModeHidden = 1,
  /**
   * 2: Fit mode. Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to disparity in the aspect ratio are filled with black.
   */
  RenderModeFit = 2,
  /**
   * @ignore
   */
  RenderModeAdaptive = 3,
}

/**
 * @ignore
 */
export enum CameraVideoSourceType {
  /**
   * @ignore
   */
  CameraSourceFront = 0,
  /**
   * @ignore
   */
  CameraSourceBack = 1,
  /**
   * @ignore
   */
  VideoSourceUnspecified = 2,
}

/**
 * @ignore
 */
export enum EglContextType {
  /**
   * @ignore
   */
  EglContext10 = 0,
  /**
   * @ignore
   */
  EglContext14 = 1,
}

/**
 * The video buffer type.
 */
export enum VideoBufferType {
  /**
   * 1: The video buffer in the format of raw data.
   */
  VideoBufferRawData = 1,
  /**
   * 2: The video buffer in the format of raw data.
   */
  VideoBufferArray = 2,
  /**
   * 3: The video buffer in the format of Texture.
   */
  VideoBufferTexture = 3,
}

/**
 * The external video frame.
 */
export class ExternalVideoFrame {
  /**
   * The video type. See VideoBufferType.
   */
  type?: VideoBufferType;
  /**
   * The pixel format. See VideoPixelFormat.
   */
  format?: VideoPixelFormat;
  /**
   * Video frame buffer.
   */
  buffer?: Uint8Array;
  /**
   * Line spacing of the incoming video frame, which must be in pixels instead of bytes. For textures, it is the width of the texture.
   */
  stride?: number;
  /**
   * Height of the incoming video frame.
   */
  height?: number;
  /**
   * Raw data related parameter. The number of pixels trimmed from the left. The default value is 0.
   */
  cropLeft?: number;
  /**
   * Raw data related parameter. The number of pixels trimmed from the top. The default value is 0.
   */
  cropTop?: number;
  /**
   * Raw data related parameter. The number of pixels trimmed from the right. The default value is 0.
   */
  cropRight?: number;
  /**
   * Raw data related parameter. The number of pixels trimmed from the bottom. The default value is 0.
   */
  cropBottom?: number;
  /**
   * Raw data related parameter. The clockwise rotation of the video frame. You can set the rotation angle as 0, 90, 180, or 270. The default value is 0.
   */
  rotation?: number;
  /**
   * Timestamp (ms) of the incoming video frame. An incorrect timestamp results in frame loss or unsynchronized audio and video.
   */
  timestamp?: number;
  /**
   * This parameter only applies to video data in Texture format. Texture ID of the video frame.
   */
  eglType?: EglContextType;
  /**
   * This parameter only applies to video data in Texture format. Incoming 4 × 4 transformational matrix. The typical value is a unit matrix.
   */
  textureId?: number;
  /**
   * This parameter only applies to video data in Texture format. Incoming 4 × 4 transformational matrix. The typical value is a unit matrix.
   */
  matrix?: number[];
  /**
   * This parameter only applies to video data in Texture format. The MetaData buffer. The default value is NULL.
   */
  metadata_buffer?: Uint8Array;
  /**
   * This parameter only applies to video data in Texture format. The MetaData size. The default value is 0.
   */
  metadata_size?: number;
  /**
   * @ignore
   */
  alphaBuffer?: Uint8Array;
  /**
   * @ignore
   */
  texture_slice_index?: number;
}

/**
 * Configurations of the video frame.
 *
 * Note that the buffer provides a pointer to a pointer. This interface cannot modify the pointer of the buffer, but it can modify the content of the buffer.
 */
export class VideoFrame {
  /**
   * The pixel format. See VideoPixelFormat.
   */
  type?: VideoPixelFormat;
  /**
   * The width of the video, in pixels.
   */
  width?: number;
  /**
   * The height of the video, in pixels.
   */
  height?: number;
  /**
   * For YUV data, the line span of the Y buffer; for RGBA data, the total data length.
   */
  yStride?: number;
  /**
   * For YUV data, the line span of the U buffer; for RGBA data, the value is 0.
   */
  uStride?: number;
  /**
   * For YUV data, the line span of the V buffer; for RGBA data, the value is 0.
   */
  vStride?: number;
  /**
   * For YUV data, the pointer to the Y buffer; for RGBA data, the data buffer.
   */
  yBuffer?: Uint8Array;
  /**
   * For YUV data, the pointer to the U buffer; for RGBA data, the value is 0.
   */
  uBuffer?: Uint8Array;
  /**
   * For YUV data, the pointer to the V buffer; for RGBA data, the value is 0.
   */
  vBuffer?: Uint8Array;
  /**
   * The clockwise rotation of the video frame before rendering. Supported values include 0, 90, 180, and 270 degrees.
   */
  rotation?: number;
  /**
   * The Unix timestamp (ms) when the video frame is rendered. This timestamp can be used to guide the rendering of the video frame. It is required.
   */
  renderTimeMs?: number;
  /**
   * Reserved for future use.
   */
  avsync_type?: number;
  /**
   * This parameter only applies to video data in Texture format. The MetaData buffer. The default value is NULL.
   */
  metadata_buffer?: Uint8Array;
  /**
   * This parameter only applies to video data in Texture format. The MetaData size. The default value is 0.
   */
  metadata_size?: number;
  /**
   * This parameter only applies to video data in Texture format. Texture ID.
   */
  textureId?: number;
  /**
   * This parameter only applies to video data in Texture format. Incoming 4 × 4 transformational matrix. The typical value is a unit matrix.
   */
  matrix?: number[];
  /**
   * @ignore
   */
  alphaBuffer?: Uint8Array;
  /**
   * @ignore
   */
  pixelBuffer?: Uint8Array;
}

/**
 * @ignore
 */
export enum MediaPlayerSourceType {
  /**
   * @ignore
   */
  MediaPlayerSourceDefault = 0,
  /**
   * @ignore
   */
  MediaPlayerSourceFullFeatured = 1,
  /**
   * @ignore
   */
  MediaPlayerSourceSimple = 2,
}

/**
 * The frame position of the video observer.
 */
export enum VideoModulePosition {
  /**
   * 1: The post-capturer position, which corresponds to the video data in the onCaptureVideoFrame callback.
   */
  PositionPostCapturer = 1 << 0,
  /**
   * 2: The pre-renderer position, which corresponds to the video data in the onRenderVideoFrame callback.
   */
  PositionPreRenderer = 1 << 1,
  /**
   * 4: The pre-encoder position, which corresponds to the video data in the onPreEncodeVideoFrame callback.
   */
  PositionPreEncoder = 1 << 2,
}

/**
 * This class is used to get raw PCM audio.
 *
 * You can inherit this class and implement the onFrame callback to get raw PCM audio.
 */
export interface IAudioPcmFrameSink {
  /**
   * Occurs each time the player receives an audio frame.
   *
   * After registering the audio frame observer, the callback occurs every time the player receives an audio frame, reporting the detailed information of the audio frame.
   *
   * @param frame The audio frame information. See AudioPcmFrame.
   */
  onFrame?(frame: AudioPcmFrame): void;
}

/**
 * Audio frame type.
 */
export enum AudioFrameType {
  /**
   * 0: PCM 16
   */
  FrameTypePcm16 = 0,
}

/**
 * Raw audio data.
 */
export class AudioFrame {
  /**
   * The type of the audio frame. See AudioFrameType.
   */
  type?: AudioFrameType;
  /**
   * The number of samples per channel in the audio frame.
   */
  samplesPerChannel?: number;
  /**
   * The number of bytes per sample. The number of bytes per audio sample, which is usually 16-bit (2-byte).
   */
  bytesPerSample?: BytesPerSample;
  /**
   * The number of audio channels (the data are interleaved if it is stereo).
   *  1: Mono.
   *  2: Stereo.
   */
  channels?: number;
  /**
   * The number of samples per channel in the audio frame.
   */
  samplesPerSec?: number;
  /**
   * The data buffer of the audio frame. When the audio frame uses a stereo channel, the data buffer is interleaved. The size of the data buffer is as follows: buffer = samples × channels × bytesPerSample.
   */
  buffer?: Uint8Array;
  /**
   * The timestamp (ms) of the external audio frame. You can use this timestamp to restore the order of the captured audio frame, and synchronize audio and video frames in video scenarios, including scenarios where external video sources are used.
   */
  renderTimeMs?: number;
  /**
   * Reserved for future use.
   */
  avsync_type?: number;
  /**
   * @ignore
   */
  presentationMs?: number;
}

/**
 * @ignore
 */
export enum AudioFramePosition {
  /**
   * @ignore
   */
  AudioFramePositionNone = 0x0000,
  /**
   * @ignore
   */
  AudioFramePositionPlayback = 0x0001,
  /**
   * @ignore
   */
  AudioFramePositionRecord = 0x0002,
  /**
   * @ignore
   */
  AudioFramePositionMixed = 0x0004,
  /**
   * @ignore
   */
  AudioFramePositionBeforeMixing = 0x0008,
  /**
   * @ignore
   */
  AudioFramePositionEarMonitoring = 0x0010,
}

/**
 * Audio data format.
 *
 * The SDK sets the audio data format in the following callbacks according to AudioParams. onRecordAudioFrame onPlaybackAudioFrame onMixedAudioFrame
 *  The SDK calculates the sampling interval through the samplesPerCall, sampleRate, and channel parameters in AudioParams, and triggers the onRecordAudioFrame, onPlaybackAudioFrame, onMixedAudioFrame, and onEarMonitoringAudioFrame callbacks according to the sampling interval. Sample interval (sec) = samplePerCall /(sampleRate × channel).
 *  Ensure that the sample interval ≥ 0.01 (s).
 */
export class AudioParams {
  /**
   * The audio sample rate (Hz), which can be set as one of the following values:
   *  8000.
   *  (Default) 16000.
   *  32000.
   *  44100
   *  48000
   */
  sample_rate?: number;
  /**
   * The number of audio channels, which can be set as either of the following values:
   *  1: (Default) Mono.
   *  2: Stereo.
   */
  channels?: number;
  /**
   * The use mode of the audio data. See RawAudioFrameOpModeType.
   */
  mode?: RawAudioFrameOpModeType;
  /**
   * The number of samples, such as 1024 for the media push.
   */
  samples_per_call?: number;
}

/**
 * The audio frame observer.
 */
export interface IAudioFrameObserverBase {
  /**
   * Gets the captured audio frame.
   *
   * To ensure that the data format of captured audio frame is as expected, Agora recommends that you set the audio data format as follows: After calling setRecordingAudioFrameParameters to set the audio data format, call registerAudioFrameObserver to register the audio observer object, the SDK will calculate the sampling interval according to the parameters set in this method, and triggers the onRecordAudioFrame callback according to the sampling interval.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   *
   * @returns
   * Without practical meaning.
   */
  onRecordAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Gets the raw audio frame for playback.
   *
   * To ensure that the data format of audio frame for playback is as expected, Agora recommends that you set the audio data format as follows: After calling setPlaybackAudioFrameParameters to set the audio data format and registerAudioFrameObserver to register the audio frame observer object, the SDK calculates the sampling interval according to the parameters set in the methods, and triggers the onPlaybackAudioFrame callback according to the sampling interval.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   *
   * @returns
   * Without practical meaning.
   */
  onPlaybackAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Retrieves the mixed captured and playback audio frame.
   *
   * To ensure that the data format of mixed captured and playback audio frame meets the expectations, Agora recommends that you set the data format as follows: After calling setMixedAudioFrameParameters to set the audio data format and registerAudioFrameObserver to register the audio frame observer object, the SDK calculates the sampling interval according to the parameters set in the methods, and triggers the onMixedAudioFrame callback according to the sampling interval.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   *
   * @returns
   * Without practical meaning.
   */
  onMixedAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Gets the in-ear monitoring audio frame.
   *
   * In order to ensure that the obtained in-ear audio data meets the expectations, Agora recommends that you set the in-ear monitoring-ear audio data format as follows: After calling setEarMonitoringAudioFrameParameters to set the audio data format and registerAudioFrameObserver to register the audio frame observer object, the SDK calculates the sampling interval according to the parameters set in the methods, and triggers the onEarMonitoringAudioFrame callback according to the sampling interval.
   *
   * @param audioFrame The raw audio data. See AudioFrame.
   *
   * @returns
   * Without practical meaning.
   */
  onEarMonitoringAudioFrame?(audioFrame: AudioFrame): void;
}

/**
 * The audio frame observer.
 */
export interface IAudioFrameObserver extends IAudioFrameObserverBase {
  /**
   * Retrieves the audio frame of a specified user before mixing.
   *
   * @param channelId The channel ID.
   * @param uid The user ID of the specified user.
   * @param audioFrame The raw audio data. See AudioFrame.
   *
   * @returns
   * Without practical meaning.
   */
  onPlaybackAudioFrameBeforeMixing?(
    channelId: string,
    uid: number,
    audioFrame: AudioFrame
  ): void;
}

/**
 * The audio spectrum data.
 */
export class AudioSpectrumData {
  /**
   * The audio spectrum data. Agora divides the audio frequency into 256 frequency domains, and reports the energy value of each frequency domain through this parameter. The value range of each energy type is [-300, 1] and the unit is dBFS.
   */
  audioSpectrumData?: number[];
  /**
   * The audio spectrum data length is 256.
   */
  dataLength?: number;
}

/**
 * Audio spectrum information of the remote user.
 */
export class UserAudioSpectrumInfo {
  /**
   * @ignore
   */
  uid?: number;
  /**
   * @ignore
   */
  spectrumData?: AudioSpectrumData;
}

/**
 * The audio spectrum observer.
 */
export interface IAudioSpectrumObserver {
  /**
   * Gets the statistics of a local audio spectrum.
   *
   * After successfully calling registerAudioSpectrumObserver to implement the onLocalAudioSpectrum callback in IAudioSpectrumObserver and calling enableAudioSpectrumMonitor to enable audio spectrum monitoring, the SDK will trigger the callback as the time interval you set to report the received remote audio data spectrum.
   *
   * @param data The audio spectrum data of the local user. See AudioSpectrumData.
   *
   * @returns
   * Whether the spectrum data is received: true : Spectrum data is received. false : No spectrum data is received.
   */
  onLocalAudioSpectrum?(data: AudioSpectrumData): void;

  /**
   * Gets the remote audio spectrum.
   *
   * After successfully calling registerAudioSpectrumObserver to implement the onRemoteAudioSpectrum callback in the IAudioSpectrumObserver and calling enableAudioSpectrumMonitor to enable audio spectrum monitoring, the SDK will trigger the callback as the time interval you set to report the received remote audio data spectrum.
   *
   * @param spectrums The audio spectrum information of the remote user, see UserAudioSpectrumInfo. The number of arrays is the number of remote users monitored by the SDK. If the array is null, it means that no audio spectrum of remote users is detected.
   * @param spectrumNumber The number of remote users.
   *
   * @returns
   * Whether the spectrum data is received: true : Spectrum data is received. false : No spectrum data is received.
   */
  onRemoteAudioSpectrum?(
    spectrums: UserAudioSpectrumInfo[],
    spectrumNumber: number
  ): void;
}

/**
 * Receives encoded video images.
 */
export interface IVideoEncodedFrameObserver {
  /**
   * Reports that the receiver has received the to-be-decoded video frame sent by the remote end.
   *
   * If you call the setRemoteVideoSubscriptionOptions method and set encodedFrameOnly to true, the SDK triggers this callback locally to report the received encoded video frame information.
   *
   * @param uid The user ID of the remote user.
   * @param imageBuffer The encoded video image buffer.
   * @param length The data length of the video image.
   * @param videoEncodedFrameInfo For the information of the encoded video frame, see EncodedVideoFrameInfo.
   *
   * @returns
   * Without practical meaning.
   */
  onEncodedVideoFrameReceived?(
    uid: number,
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo
  ): void;
}

/**
 * The process mode of the video frame:
 */
export enum VideoFrameProcessMode {
  /**
   * Read-only mode. In this mode, you do not modify the video frame. The video frame observer is a renderer.
   */
  ProcessModeReadOnly = 0,
  /**
   * Read and write mode. In this mode, you modify the video frame. The video frame observer is a video filter.
   */
  ProcessModeReadWrite = 1,
}

/**
 * The IVideoFrameObserver class.
 */
export interface IVideoFrameObserver {
  /**
   * Occurs each time the SDK receives a video frame captured by local devices.
   *
   * After you successfully register the video frame observer, the SDK triggers this callback each time it receives a video frame. In this callback, you can get the video data captured by local devices. You can then pre-process the data according to your scenarios. Once the pre-processing is complete, you can directly modify videoFrame in this callback, and set the return value to true to send the modified video data to the SDK.
   *  The video data that this callback gets has not been pre-processed, and is not watermarked, cropped, rotated or beautified.
   *  If the video data type you get is RGBA, the SDK does not support processing the data of the alpha channel.
   *
   * @param sourceType Video source types, including cameras, screens, or media player. See VideoSourceType.
   * @param videoFrame The video frame. See VideoFrame. The default value of the video frame data format obtained through this callback is as follows:
   *  Android: texture
   *  iOS: cvPixelBuffer
   *
   * @returns
   * When the video processing mode is ProcessModeReadOnly : true : Reserved for future use. false : Reserved for future use.
   *  When the video processing mode is ProcessModeReadWrite : true : Sets the SDK to receive the video frame. false : Sets the SDK to discard the video frame.
   */
  onCaptureVideoFrame?(
    sourceType: VideoSourceType,
    videoFrame: VideoFrame
  ): void;

  /**
   * Occurs each time the SDK receives a video frame before encoding.
   *
   * After you successfully register the video frame observer, the SDK triggers this callback each time it receives a video frame. In this callback, you can get the video data before encoding and then process the data according to your particular scenarios. After processing, you can send the processed video data back to the SDK in this callback.
   *  The video data that this callback gets has been preprocessed, with its content cropped and rotated, and the image enhanced.
   *
   * @param sourceType The type of the video source. See VideoSourceType.
   * @param videoFrame The video frame. See VideoFrame. The default value of the video frame data format obtained through this callback is as follows:
   *  Android: texture
   *  iOS: cvPixelBuffer
   *
   * @returns
   * When the video processing mode is ProcessModeReadOnly : true : Reserved for future use. false : Reserved for future use.
   *  When the video processing mode is ProcessModeReadWrite : true : Sets the SDK to receive the video frame. false : Sets the SDK to discard the video frame.
   */
  onPreEncodeVideoFrame?(
    sourceType: VideoSourceType,
    videoFrame: VideoFrame
  ): void;

  /**
   * @ignore
   */
  onMediaPlayerVideoFrame?(videoFrame: VideoFrame, mediaPlayerId: number): void;

  /**
   * Occurs each time the SDK receives a video frame sent by the remote user.
   *
   * After you successfully register the video frame observer, the SDK triggers this callback each time it receives a video frame. In this callback, you can get the video data sent from the remote end before rendering, and then process it according to the particular scenarios.
   *  If the video data type you get is RGBA, the SDK does not support processing the data of the alpha channel.
   *
   * @param channelId The channel ID.
   * @param remoteUid The user ID of the remote user who sends the current video frame.
   * @param videoFrame The video frame. See VideoFrame. The default value of the video frame data format obtained through this callback is as follows:
   *  Android: texture
   *  iOS: cvPixelBuffer
   *
   * @returns
   * When the video processing mode is ProcessModeReadOnly : true : Reserved for future use. false : Reserved for future use.
   *  When the video processing mode is ProcessModeReadWrite : true : Sets the SDK to receive the video frame. false : Sets the SDK to discard the video frame.
   */
  onRenderVideoFrame?(
    channelId: string,
    remoteUid: number,
    videoFrame: VideoFrame
  ): void;

  /**
   * @ignore
   */
  onTranscodedVideoFrame?(videoFrame: VideoFrame): void;
}

/**
 * The external video frame encoding type.
 */
export enum ExternalVideoSourceType {
  /**
   * 0: The video frame is not encoded.
   */
  VideoFrame = 0,
  /**
   * 1: The video frame is encoded.
   */
  EncodedVideoFrame = 1,
}

/**
 * @ignore
 */
export enum MediaRecorderContainerFormat {
  /**
   * @ignore
   */
  FormatMp4 = 1,
}

/**
 * The recording content.
 */
export enum MediaRecorderStreamType {
  /**
   * Only audio.
   */
  StreamTypeAudio = 0x01,
  /**
   * Only video.
   */
  StreamTypeVideo = 0x02,
  /**
   * (Default) Audio and video.
   */
  StreamTypeBoth = 0x01 | 0x02,
}

/**
 * The current recording state.
 */
export enum RecorderState {
  /**
   * -1: An error occurs during the recording. See RecorderErrorCode for the reason.
   */
  RecorderStateError = -1,
  /**
   * 2: The audio and video recording starts.
   */
  RecorderStateStart = 2,
  /**
   * 3: The audio and video recording stops.
   */
  RecorderStateStop = 3,
}

/**
 * The reason for the state change.
 */
export enum RecorderErrorCode {
  /**
   * 0: No error.
   */
  RecorderErrorNone = 0,
  /**
   * 1: The SDK fails to write the recorded data to a file.
   */
  RecorderErrorWriteFailed = 1,
  /**
   * 2: The SDK does not detect any audio and video streams, or audio and video streams are interrupted for more than five seconds during recording.
   */
  RecorderErrorNoStream = 2,
  /**
   * 3: The recording duration exceeds the upper limit.
   */
  RecorderErrorOverMaxDuration = 3,
  /**
   * 4: The recording configuration changes.
   */
  RecorderErrorConfigChanged = 4,
}

/**
 * @ignore
 */
export class MediaRecorderConfiguration {
  /**
   * @ignore
   */
  storagePath?: string;
  /**
   * @ignore
   */
  containerFormat?: MediaRecorderContainerFormat;
  /**
   * @ignore
   */
  streamType?: MediaRecorderStreamType;
  /**
   * @ignore
   */
  maxDurationMs?: number;
  /**
   * @ignore
   */
  recorderInfoUpdateInterval?: number;
}

/**
 * @ignore
 */
export class RecorderInfo {
  /**
   * @ignore
   */
  fileName?: string;
  /**
   * @ignore
   */
  durationMs?: number;
  /**
   * @ignore
   */
  fileSize?: number;
}

/**
 * @ignore
 */
export interface IMediaRecorderObserver {
  /**
   * @ignore
   */
  onRecorderStateChanged?(
    channelId: string,
    uid: number,
    state: RecorderState,
    error: RecorderErrorCode
  ): void;

  /**
   * @ignore
   */
  onRecorderInfoUpdated?(
    channelId: string,
    uid: number,
    info: RecorderInfo
  ): void;
}
