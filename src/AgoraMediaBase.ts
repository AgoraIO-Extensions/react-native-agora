import './extension/AgoraMediaBaseExtension';
import { EncodedVideoFrameInfo } from './AgoraBase';
/*
 * The type of the audio route.
 *
 */
export enum AudioRoute {
/*
 * -1: The default audio route.
 */
  RouteDefault = -1,
/*
 * 0: Audio output routing is a headset with microphone.
 */
  RouteHeadset = 0,
/*
 * 1: The audio route is an earpiece.
 */
  RouteEarpiece = 1,
/*
 * 2: The audio route is a headset without a microphone.
 */
  RouteHeadsetnomic = 2,
/*
 * 3: The audio route is the speaker that comes with the device.
 */
  RouteSpeakerphone = 3,
/*
 * 4: The audio route is an external speaker. (iOS only)
 */
  RouteLoudspeaker = 4,
  /*
   * @ignore
   */
  RouteHeadsetbluetooth = 5,
  /*
   * @ignore
   */
  RouteUsb = 6,
  /*
   * @ignore
   */
  RouteHdmi = 7,
  /*
   * @ignore
   */
  RouteDisplayport = 8,
  /*
   * @ignore
   */
  RouteAirplay = 9,
}

  /*
   * @ignore
   */
export enum BytesPerSample {
  /*
   * @ignore
   */
  TwoBytesPerSample = 2,
}

  /*
   * @ignore
   */
export class AudioParameters {
  /*
   * @ignore
   */
  sample_rate?: number;
  /*
   * @ignore
   */
  channels?: number;
  /*
   * @ignore
   */
  frames_per_buffer?: number;
}

/*
 * The use mode of the audio data.
 *
 */
export enum RawAudioFrameOpModeType {
/*
 * 0: Read-only mode, 
 */
  RawAudioFrameOpModeReadOnly = 0,
/*
 * 2: Read and write mode, 
 */
  RawAudioFrameOpModeReadWrite = 2,
}

/*
 * Media source type.
 *
 */
export enum MediaSourceType {
/*
 * 0: Audio playback device.
 */
  AudioPlayoutSource = 0,
/*
 * 1: Audio capturing device.
 */
  AudioRecordingSource = 1,
/*
 * 2: The primary camera.
 */
  PrimaryCameraSource = 2,
/*
 * 3: The secondary camera.
 */
  SecondaryCameraSource = 3,
  /*
   * @ignore
   */
  PrimaryScreenSource = 4,
  /*
   * @ignore
   */
  SecondaryScreenSource = 5,
  /*
   * @ignore
   */
  CustomVideoSource = 6,
  /*
   * @ignore
   */
  MediaPlayerSource = 7,
  /*
   * @ignore
   */
  RtcImagePngSource = 8,
  /*
   * @ignore
   */
  RtcImageJpegSource = 9,
  /*
   * @ignore
   */
  RtcImageGifSource = 10,
  /*
   * @ignore
   */
  RemoteVideoSource = 11,
  /*
   * @ignore
   */
  TranscodedVideoSource = 12,
/*
 * 100: Unknown media source.
 */
  UnknownMediaSource = 100,
}

/*
 * Content moderation results.
 *
 */
export enum ContentInspectResult {
/*
 * 1: The image does not contain inappropriate elements.
 */
  ContentInspectNeutral = 1,
/*
 * 2: The image is sexually suggestive.
 */
  ContentInspectSexy = 2,
/*
 * 3: The image is pornographic.
 */
  ContentInspectPorn = 3,
}

/*
 * The type of video content moderation module.
 *
 */
export enum ContentInspectType {
/*
 * 0: (Default) This module has no actual function. Do not set type to this value.
 */
  ContentInspectInvalid = 0,
/*
 * 1: Video content moderation. SDK takes screenshots, inspects video content of the video stream in the channel, and uploads the screenshots and moderation results.
 */
  ContentInspectModeration = 1,
  /*
   * @ignore
   */
  ContentInspectSupervision = 2,
}

/*
 * ContentInspectModuleStructure to configure the type and frequency of the video content moderation module.
 *
 */
export class ContentInspectModule {
/*
 * The type of video content moderation module. See ContentInspectType .
 */
  type?: ContentInspectType;
/*
 * The frequency (in seconds) of video content moderation. The value should be set as larger than 0. If set as 0 (default), the video content is not inspected. Agora recommends that you set the value as 10; you can also adjust it according to your business needs.
 */
  interval?: number;
}

/*
 * Configuration of video content moderation.
 *
 */
export class ContentInspectConfig {
/*
 * Additional information for video content moderation, with a maximum length of 1024 bytes.The SDK sends the screenshots and additional information on the video content to the Agora content moderation server. Once the content moderation process is completed, the Agora content moderation server sends the additional information and the content moderation results to your server.
 */
  extraInfo?: string;
/*
 * Video content moderation module. See ContentInspectModule .A maximum of 32 ContentInspectModule instances can be configured, and the value range of MAX_CONTENT_INSPECT_MODULE_COUNT is an integer in [1,32].A video content moderation module can only be configured with one instance at most.
 */
  modules?: ContentInspectModule[];
/*
 * The number of video content moderation modules, that is, the number of configured ContentInspectModule instances, must be the same as the number of instances configured in modules. The maximum number is 32.
 */
  moduleCount?: number;
}

  /*
   * @ignore
   */
export class PacketOptions {
  /*
   * @ignore
   */
  timestamp?: number;
  /*
   * @ignore
   */
  audioLevelIndication?: number;
}

  /*
   * @ignore
   */
export class AudioEncodedFrameInfo {
  /*
   * @ignore
   */
  sendTs?: number;
  /*
   * @ignore
   */
  codec?: number;
}

/*
 * The parameters of the audio frame in PCM format.
 *
 */
export class AudioPcmFrame {
  /*
   * @ignore
   */
  capture_timestamp?: number;
  /*
   * @ignore
   */
  samples_per_channel_?: number;
  /*
   * @ignore
   */
  sample_rate_hz_?: number;
  /*
   * @ignore
   */
  num_channels_?: number;
  /*
   * @ignore
   */
  bytes_per_sample?: BytesPerSample;
  /*
   * @ignore
   */
  data_?: number[];
}

/*
 * The channel mode.
 *
 */
export enum AudioDualMonoMode {
/*
 * 0: Original mode.
 */
  AudioDualMonoStereo = 0,
/*
 * 1: Left channel mode. This mode replaces the audio of the right channel with the audio of the left channel, which means the user can only hear the audio of the left channel.
 */
  AudioDualMonoL = 1,
/*
 * 2: Right channel mode. This mode replaces the audio of the left channel with the audio of the right channel, which means the user can only hear the audio of the right channel.
 */
  AudioDualMonoR = 2,
/*
 * 3: Mixed channel mode. This mode mixes the audio of the left channel and the right channel, which means the user can hear the audio of the left channel and the right channel at the same time.
 */
  AudioDualMonoMix = 3,
}

/*
 * The video pixel format.
 *
 */
export enum VideoPixelFormat {
/*
 * 0: Raw video pixel format.
 */
  VideoPixelDefault = 0,
/*
 * 1: The format is I420.
 */
  VideoPixelI420 = 1,
  /*
   * @ignore
   */
  VideoPixelBgra = 2,
  /*
   * @ignore
   */
  VideoPixelNv21 = 3,
/*
 * 4: The format is RGBA.
 */
  VideoPixelRgba = 4,
/*
 * 8: The format is NV12.
 */
  VideoPixelNv12 = 8,
  /*
   * @ignore
   */
  VideoTexture2d = 10,
  /*
   * @ignore
   */
  VideoTextureOes = 11,
  /*
   * @ignore
   */
  VideoCvpixelNv12 = 12,
  /*
   * @ignore
   */
  VideoCvpixelI420 = 13,
  /*
   * @ignore
   */
  VideoCvpixelBgra = 14,
/*
 * 16: The format is I422.
 */
  VideoPixelI422 = 16,
}

/*
 * Video display modes.
 *
 */
export enum RenderModeType {
/*
 * 1: Hidden mode. Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). One dimension of the video may have clipped contents.
 */
  RenderModeHidden = 1,
/*
 * 2: Fit mode. Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to disparity in the aspect ratio are filled with black.
 */
  RenderModeFit = 2,
  /*
   * @ignore
   */
  RenderModeAdaptive = 3,
}

  /*
   * @ignore
   */
export enum EglContextType {
  /*
   * @ignore
   */
  EglContext10 = 0,
  /*
   * @ignore
   */
  EglContext14 = 1,
}

/*
 * The video buffer type.
 *
 */
export enum VideoBufferType {
/*
 * 1: The video buffer in the format of raw data.
 */
  VideoBufferRawData = 1,
/*
 * 2: The video buffer in the format of raw data.
 */
  VideoBufferArray = 2,
/*
 * 3: The video buffer in the format of Texture.
 */
  VideoBufferTexture = 3,
}

/*
 * The external video frame.
 *
 */
export class ExternalVideoFrame {
/*
 * The video type. See VideoBufferType .
 */
  type?: VideoBufferType;
/*
 * The pixel format. See VideoPixelFormat .
 */
  format?: VideoPixelFormat;
/*
 * Video frame buffer.
 */
  buffer?: Uint8Array;
/*
 * Line spacing of the incoming video frame, which must be in pixels instead of bytes. For textures, it is the width of the texture.
 */
  stride?: number;
/*
 * Height of the incoming video frame.
 */
  height?: number;
/*
 * Raw data related parameter. The number of pixels trimmed from the left. The default value is 0.
 */
  cropLeft?: number;
/*
 * Raw data related parameter. The number of pixels trimmed from the top. The default value is 0.
 */
  cropTop?: number;
/*
 * Raw data related parameter. The number of pixels trimmed from the right. The default value is 0.
 */
  cropRight?: number;
/*
 * Raw data related parameter. The number of pixels trimmed from the bottom. The default value is 0.
 */
  cropBottom?: number;
/*
 * Raw data related parameter. The clockwise rotation of the video frame. You can set the rotation angle as 0, 90, 180, or 270. The default value is 0.
 */
  rotation?: number;
/*
 * Timestamp (ms) of the incoming video frame. An incorrect timestamp results in frame loss or unsynchronized audio and video.
 */
  timestamp?: number;
/*
 * This parameter only applies to video data in Texture format. Texture ID of the frame.
 */
  eglType?: EglContextType;
/*
 * This parameter only applies to video data in Texture format. Incoming 4 x 4 transformational matrix. The typical value is a unit matrix.
 */
  textureId?: number;
/*
 * This parameter only applies to video data in Texture format. Incoming 4 x 4 transformational matrix. The typical value is a unit matrix.
 */
  matrix?: number[];
  /*
   * @ignore
   */
  metadata_buffer?: Uint8Array;
  /*
   * @ignore
   */
  metadata_size?: number;
}

/*
 * Configurations of the video frame.
 * The video data format is YUV420. Note that the buffer provides a pointer to a pointer. This interface cannot modify the pointer of the buffer but can modify the content of the buffer.
 */
export class VideoFrame {
/*
 * The pixel format. See VideoPixelFormat .
 */
  type?: VideoPixelFormat;
/*
 * The width of the video in pixels.
 */
  width?: number;
/*
 * The height of the video in pixels.
 */
  height?: number;
/*
 * For YUV data, the line span of the Y buffer; for RGBA data, the total data length.
 */
  yStride?: number;
/*
 * For YUV data, the line span of the U buffer; for RGBA data, the value is 0.
 */
  uStride?: number;
/*
 * For YUV data, the line span of the V buffer; for RGBA data, the value is 0.
 */
  vStride?: number;
/*
 * For YUV data, the pointer to the Y buffer; for RGBA data, the data buffer.
 */
  yBuffer?: Uint8Array;
/*
 * For YUV data, the pointer to the U buffer; for RGBA data, the value is 0.
 */
  uBuffer?: Uint8Array;
/*
 * For YUV data, the pointer to the V buffer; for RGBA data, the value is 0.
 */
  vBuffer?: Uint8Array;
/*
 * The clockwise rotation of the video frame before rendering. Supported values include 0, 90, 180, and 270 degrees.
 */
  rotation?: number;
/*
 * The Unix timestamp (ms) when the video frame is rendered. This timestamp can be used to guide the rendering of the video frame. It is required.
 */
  renderTimeMs?: number;
  /*
   * @ignore
   */
  avsync_type?: number;
  /*
   * @ignore
   */
  metadata_buffer?: Uint8Array;
  /*
   * @ignore
   */
  metadata_size?: number;
/*
 * This parameter only applies to video data in Texture format. Texture ID.
 */
  textureId?: number;
/*
 * This parameter only applies to video data in Texture format. Incoming 4 x 4 transformational matrix. The typical value is a unit matrix.
 */
  matrix?: number[];
/*
 * Indicates the output data of the portrait segmentation algorithm, which is consistent with the size of the video frame. The value range of each pixel is [0,255], where 0 represents the background; 255 represents the foreground (portrait).In the costom video renderer scenario, you can use this parameter to render the video background into various effects, such as: transparent, solid color, picture, video and so on.To use this parameter, contact .
 */
  alphaBuffer?: Uint8Array;
}

  /*
   * @ignore
   */
export enum MediaPlayerSourceType {
  /*
   * @ignore
   */
  MediaPlayerSourceDefault = 0,
  /*
   * @ignore
   */
  MediaPlayerSourceFullFeatured = 1,
  /*
   * @ignore
   */
  MediaPlayerSourceSimple = 2,
}

/*
 * The frame position of the video observer.
 *
 */
export enum VideoModulePosition {
/*
 * 1: The post-capturer position, which corresponds to the video data in the onCaptureVideoFrame callback.
 */
  PositionPostCapturer = 1 << 0,
/*
 * 2: The pre-renderer position, which corresponds to the video data in the onRenderVideoFrame callback.
 */
  PositionPreRenderer = 1 << 1,
/*
 * 4: The pre-encoder position, which corresponds to the video data in the onPreEncodeVideoFrame callback.
 */
  PositionPreEncoder = 1 << 2,
  /*
   * @ignore
   */
  PositionPostFilters = 1 << 3,
}

/*
 * Audio frame type.
 *
 */
export enum AudioFrameType {
/*
 * 0: PCM 16
 */
  FrameTypePcm16 = 0,
}

/*
 * Raw audio data.
 *
 */
export class AudioFrame {
/*
 * The type of the audio frame. See AudioFrameType .
 */
  type?: AudioFrameType;
/*
 * The number of samples per channel in the audio frame.
 */
  samplesPerChannel?: number;
/*
 * The number of bytes per audio sample, which is usually 16-bit (2 bytes).
 */
  bytesPerSample?: BytesPerSample;
/*
 * The number of audio channels (the data are interleaved if it is stereo).1: Mono.2: Stereo.
 */
  channels?: number;
/*
 * The number of samples per channel in the audio frame.
 */
  samplesPerSec?: number;
/*
 * The data buffer of the audio frame. When the audio frame uses a stereo channel, the data buffer is interleaved.The size of the data buffer is as follows: buffer = samples ×channels × bytesPerSample.
 */
  buffer?: Uint8Array;
/*
 * The timestamp (ms) of the external audio frame.You can use this timestamp to restore the order of the captured audio frame, and synchronize audio and video frames in video scenarios, including scenarios where external video sources are used.
 */
  renderTimeMs?: number;
  /*
   * @ignore
   */
  avsync_type?: number;
}

  /*
   * @ignore
   */
export enum AudioFramePosition {
  /*
   * @ignore
   */
  AudioFramePositionNone = 0x0000,
  /*
   * @ignore
   */
  AudioFramePositionPlayback = 0x0001,
  /*
   * @ignore
   */
  AudioFramePositionRecord = 0x0002,
  /*
   * @ignore
   */
  AudioFramePositionMixed = 0x0004,
  /*
   * @ignore
   */
  AudioFramePositionBeforeMixing = 0x0008,
}

/*
 * Audio data format.
 * The SDK sets changes the audio data format according to AudioParams: onRecordAudioFrame onPlaybackAudioFrame onMixedAudioFrame The SDK calculates the sampling interval through the samplesPerCall, sampleRate, and channel parameters in AudioParams, and triggers the onRecordAudioFrame, onPlaybackAudioFrame, and onMixedAudioFrame callbacks according to the sampling interval.Sample interval = samplePerCall/(sampleRate × channel).Ensure that the sample interval ≥ 0.01 (s).
 */
export class AudioParams {
  /*
   * @ignore
   */
  sample_rate?: number;
/*
 * The number of audio channels, which can be set as either of the following values:1: (Default) Mono.2: Stereo.
 */
  channels?: number;
/*
 * The use mode of the audio data. See RawAudioFrameOpModeType .
 */
  mode?: RawAudioFrameOpModeType;
  /*
   * @ignore
   */
  samples_per_call?: number;
}

export interface IAudioFrameObserverBase {
  onRecordAudioFrame?(channelId: string, audioFrame: AudioFrame): boolean;

  onPlaybackAudioFrame?(channelId: string, audioFrame: AudioFrame): boolean;

  onMixedAudioFrame?(channelId: string, audioFrame: AudioFrame): boolean;
}

export interface IAudioFrameObserver extends IAudioFrameObserverBase {
  onPlaybackAudioFrameBeforeMixing?(
    channelId: string,
    uid: number,
    audioFrame: AudioFrame
  ): boolean;
}

/*
 * The audio spectrum data.
 *
 */
export class AudioSpectrumData {
/*
 * The audio spectrum data. Agora divides the audio frequency into 256 frequency domains, and reports the energy value of each frequency domain through this parameter. The value range of each energy type is [-300, 1] and the unit is dBFS.
 */
  audioSpectrumData?: number[];
/*
 * The audio spectrum data length is 256.
 */
  dataLength?: number;
}

/*
 * Audio spectrum information of the remote user.
 *
 */
export class UserAudioSpectrumInfo {
/*
 * The user ID.
 */
  uid?: number;
  /*
   * @ignore
   */
  spectrumData?: AudioSpectrumData;
}

export interface IAudioSpectrumObserver {
  onLocalAudioSpectrum?(data: AudioSpectrumData): boolean;

  onRemoteAudioSpectrum?(
    spectrums: UserAudioSpectrumInfo[],
    spectrumNumber: number
  ): boolean;
}

export interface IVideoEncodedFrameObserver {
  onEncodedVideoFrameReceived?(
    uid: number,
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo
  ): boolean;
}

/*
 * The process mode of the video frame:
 *
 */
export enum VideoFrameProcessMode {
/*
 * Read-only mode.In this mode, you do not modify the video frame. The video frame observer is a renderer.
 */
  ProcessModeReadOnly = 0,
/*
 * Read and write mode.In this mode, you modify the video frame. The video frame observer is a video filter.
 */
  ProcessModeReadWrite = 1,
}

export interface IVideoFrameObserver {
  onCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  onPreEncodeVideoFrame?(videoFrame: VideoFrame): boolean;

  onSecondaryCameraCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  onSecondaryPreEncodeCameraVideoFrame?(videoFrame: VideoFrame): boolean;

  onScreenCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  onPreEncodeScreenVideoFrame?(videoFrame: VideoFrame): boolean;

  onMediaPlayerVideoFrame?(
    videoFrame: VideoFrame,
    mediaPlayerId: number
  ): boolean;

  onSecondaryScreenCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  onSecondaryPreEncodeScreenVideoFrame?(videoFrame: VideoFrame): boolean;

  onRenderVideoFrame?(
    channelId: string,
    remoteUid: number,
    videoFrame: VideoFrame
  ): boolean;

  onTranscodedVideoFrame?(videoFrame: VideoFrame): boolean;
}

/*
 * The external video frame encoding type.
 *
 */
export enum ExternalVideoSourceType {
/*
 * 0: The video frame is not encoded.
 */
  VideoFrame = 0,
/*
 * 1: The video frame is encoded.
 */
  EncodedVideoFrame = 1,
}

/*
 * The format of the recording file.
 *
 */
export enum MediaRecorderContainerFormat {
/*
 * 1: (Default) MP4.
 */
  FormatMp4 = 1,
}

/*
 * The recording content.
 *
 */
export enum MediaRecorderStreamType {
/*
 * Only audio.
 */
  StreamTypeAudio = 0x01,
/*
 * Only video.
 */
  StreamTypeVideo = 0x02,
/*
 * (Default) Audio and video.
 */
  StreamTypeBoth = 0x01 | 0x02,
}

/*
 * The current recording state.
 *
 */
export enum RecorderState {
/*
 * -1: An error occurs during the recording. See RecorderErrorCode for the reason.
 */
  RecorderStateError = -1,
/*
 * 2: The audio and video recording starts.
 */
  RecorderStateStart = 2,
/*
 * 3: The audio and video recording stops.
 */
  RecorderStateStop = 3,
}

/*
 * The reason for the state change.
 *
 */
export enum RecorderErrorCode {
/*
 * 0: No error.
 */
  RecorderErrorNone = 0,
/*
 * 1: The SDK fails to write the recorded data to a file.
 */
  RecorderErrorWriteFailed = 1,
/*
 * 2: The SDK does not detect any audio and video streams, or audio and video streams are interrupted for more than five seconds during recording.
 */
  RecorderErrorNoStream = 2,
/*
 * 3: The recording duration exceeds the upper limit.
 */
  RecorderErrorOverMaxDuration = 3,
/*
 * 4: The recording configuration changes.
 */
  RecorderErrorConfigChanged = 4,
}

/*
 * Configurations for the local audio and video recording.
 *
 */
export class MediaRecorderConfiguration {
/*
 * The absolute path (including the filename extensions) of the recording file. For example:Windows: C:\Users\<user_name>\AppData\Local\Agora\<process_name>\example.mp4iOS: /AppSandbox/Library/Caches/example.mp4macOS: ～/Library/Logs/example.mp4Android: /storage/emulated/0/Android/data/<package name>/files/agorasdk.mp4Ensure that the directory for the log files exists and is writable.
 */
  storagePath?: string;
/*
 * The format of the recording file. See MediaRecorderContainerFormat .
 */
  containerFormat?: MediaRecorderContainerFormat;
/*
 * The recording content. See MediaRecorderStreamType .
 */
  streamType?: MediaRecorderStreamType;
/*
 * The maximum recording duration, in milliseconds. The default value is 120000.
 */
  maxDurationMs?: number;
/*
 * The interval (ms) of updating the recording information. The value range is [1000,10000]. Based on the value you set in this parameter, the SDK triggers the onRecorderInfoUpdated callback to report the updated recording information.
 */
  recorderInfoUpdateInterval?: number;
}

/*
 * The information about the file that is recorded.
 *
 */
export class RecorderInfo {
/*
 * The absolute path of the recording file.
 */
  fileName?: string;
/*
 * The recording duration (ms).
 */
  durationMs?: number;
/*
 * The size (bytes) of the recording file.
 */
  fileSize?: number;
}

export interface IMediaRecorderObserver {
  onRecorderStateChanged?(state: RecorderState, error: RecorderErrorCode): void;

  onRecorderInfoUpdated?(info: RecorderInfo): void;
}