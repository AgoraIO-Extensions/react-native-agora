import './extension/AgoraMediaBaseExtension';
import { EncodedVideoFrameInfo } from './AgoraBase';

/**
 * Plugin context information.
 */
export class ExtensionContext {
  /**
   * Whether the uid reported in ExtensionContext is valid: true : uid is valid. false : uid is invalid.
   */
  isValid?: boolean;
  /**
   * User ID. 0 represents the local user, values greater than 0 represent remote users.
   */
  uid?: number;
  /**
   * Name of the plugin provider.
   */
  providerName?: string;
  /**
   * Name of the plugin.
   */
  extensionName?: string;
}

/**
 * Type of video source.
 */
export enum VideoSourceType {
  /**
   * 0: (Default) The video source is the first camera.
   */
  VideoSourceCameraPrimary = 0,
  /**
   * 0: (Default) The video source is the first camera.
   */
  VideoSourceCamera = 0,
  /**
   * 1: The video source is the second camera.
   */
  VideoSourceCameraSecondary = 1,
  /**
   * 2: The video source is the first screen.
   */
  VideoSourceScreenPrimary = 2,
  /**
   * 2: The video source is the first screen.
   */
  VideoSourceScreen = 2,
  /**
   * 3: The video source is the second screen.
   */
  VideoSourceScreenSecondary = 3,
  /**
   * 4: A custom video source.
   */
  VideoSourceCustom = 4,
  /**
   * 5: The video source is a media player.
   */
  VideoSourceMediaPlayer = 5,
  /**
   * 6: The video source is a PNG image.
   */
  VideoSourceRtcImagePng = 6,
  /**
   * 7: The video source is a JPEG image.
   */
  VideoSourceRtcImageJpeg = 7,
  /**
   * 8: The video source is a GIF image.
   */
  VideoSourceRtcImageGif = 8,
  /**
   * 9: The video source is a remote video fetched from the network.
   */
  VideoSourceRemote = 9,
  /**
   * 10: A transcoded video source.
   */
  VideoSourceTranscoded = 10,
  /**
   * 11: (Android only) The video source is the third camera.
   */
  VideoSourceCameraThird = 11,
  /**
   * 12: (Android only) The video source is the fourth camera.
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
   * 15: The video source is video processed by a speech-driven plugin.
   */
  VideoSourceSpeechDriven = 15,
  /**
   * 100: Unknown video source.
   */
  VideoSourceUnknown = 100,
}

/**
 * Audio source type.
 */
export enum AudioSourceType {
  /**
   * 0: (Default) Microphone.
   */
  AudioSourceMicrophone = 0,
  /**
   * 1: Custom captured audio stream.
   */
  AudioSourceCustom = 1,
  /**
   * 2: Media player.
   */
  AudioSourceMediaPlayer = 2,
  /**
   * 3: System audio stream captured during screen sharing.
   */
  AudioSourceLoopbackRecording = 3,
  /**
   * @ignore
   */
  AudioSourceMixedStream = 4,
  /**
   * 5: Audio stream from a specified remote user.
   */
  AudioSourceRemoteUser = 5,
  /**
   * 6: Mixed audio stream from all users in the current channel.
   */
  AudioSourceRemoteChannel = 6,
  /**
   * 100: Unknown audio source.
   */
  AudioSourceUnknown = 100,
}

/**
 * Type of audio route.
 */
export enum AudioRoute {
  /**
   * -1: Use the default audio route.
   */
  RouteDefault = -1,
  /**
   * 0: Audio route is a headset with microphone.
   */
  RouteHeadset = 0,
  /**
   * 1: Audio route is the earpiece.
   */
  RouteEarpiece = 1,
  /**
   * 2: Audio route is a headset without microphone.
   */
  RouteHeadsetnomic = 2,
  /**
   * 3: Audio route is the built-in speaker of the device.
   */
  RouteSpeakerphone = 3,
  /**
   * 4: Audio route is an external speaker. (iOS only)
   */
  RouteLoudspeaker = 4,
  /**
   * 5: Audio route is a Bluetooth device using the HFP protocol.
   */
  RouteBluetoothDeviceHfp = 5,
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
  /**
   * 10: Audio route is a Bluetooth device using the A2DP protocol.
   */
  RouteBluetoothDeviceA2dp = 10,
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
 * Usage modes for audio data.
 */
export enum RawAudioFrameOpModeType {
  /**
   * 0: (Default) Read-only mode. For example, if you collect data using the SDK and perform CDN streaming yourself, you can choose this mode.
   */
  RawAudioFrameOpModeReadOnly = 0,
  /**
   * 2: Read-write mode. For example, if you have your own audio effects processing module and want to pre-process the data as needed (such as voice changing), you can choose this mode.
   */
  RawAudioFrameOpModeReadWrite = 2,
}

/**
 * The type of media source.
 */
export enum MediaSourceType {
  /**
   * 0: Audio playback device.
   */
  AudioPlayoutSource = 0,
  /**
   * 1: Audio recording device.
   */
  AudioRecordingSource = 1,
  /**
   * 2: Primary camera.
   */
  PrimaryCameraSource = 2,
  /**
   * 3: Secondary camera.
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
   * 6: Custom video capture source.
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
   * 13: Video source processed by speech-driven plugin.
   */
  SpeechDrivenVideoSource = 13,
  /**
   * 100: Unknown media source.
   */
  UnknownMediaSource = 100,
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
 * Information of external PCM format audio frame.
 */
export class AudioPcmFrame {
  /**
   * Timestamp of the audio frame (ms).
   */
  capture_timestamp?: number;
  /**
   * Number of samples per channel.
   */
  samples_per_channel_?: number;
  /**
   * Audio sampling rate (Hz).
   */
  sample_rate_hz_?: number;
  /**
   * Number of audio channels.
   */
  num_channels_?: number;
  /**
   * @ignore
   */
  audio_track_number_?: number;
  /**
   * Number of bytes per audio sample.
   */
  bytes_per_sample?: BytesPerSample;
  /**
   * Audio frame data.
   */
  data_?: number[];
  /**
   * @ignore
   */
  is_stereo_?: boolean;
}

/**
 * Channel mode.
 */
export enum AudioDualMonoMode {
  /**
   * 0: Original mode.
   */
  AudioDualMonoStereo = 0,
  /**
   * 1: Left channel mode. This mode replaces the right channel audio with the left channel audio, so the user hears only the left channel.
   */
  AudioDualMonoL = 1,
  /**
   * 2: Right channel mode. This mode replaces the left channel audio with the right channel audio, so the user hears only the right channel.
   */
  AudioDualMonoR = 2,
  /**
   * 3: Mixed mode. This mode mixes the left and right channels, so the user hears both channels simultaneously.
   */
  AudioDualMonoMix = 3,
}

/**
 * Video pixel format.
 */
export enum VideoPixelFormat {
  /**
   * 0: Original video pixel format.
   */
  VideoPixelDefault = 0,
  /**
   * 1: I420 format.
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
   * 4: RGBA format.
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
   * @ignore
   */
  VideoCvpixelP010 = 15,
  /**
   * 16: I422 format.
   */
  VideoPixelI422 = 16,
  /**
   * @ignore
   */
  VideoTextureId3d11texture2d = 17,
  /**
   * @ignore
   */
  VideoPixelI010 = 18,
}

/**
 * Video display mode.
 */
export enum RenderModeType {
  /**
   * 1: The video is scaled proportionally. Priority is given to filling the view. Any excess part of the video that does not fit due to aspect ratio differences will be cropped.
   */
  RenderModeHidden = 1,
  /**
   * 2: The video is scaled proportionally. Priority is given to displaying the entire video content. Any area not filled due to aspect ratio differences will be filled with black.
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
export enum MetaInfoKey {
  /**
   * @ignore
   */
  KeyFaceCapture = 0,
}

/**
 * @ignore
 */
export abstract class IVideoFrameMetaInfo {
  /**
   * @ignore
   */
  abstract getMetaInfoStr(key: MetaInfoKey): string;
}

/**
 * @ignore
 */
export enum PrimaryID {
  /**
   * @ignore
   */
  PrimaryidBt709 = 1,
  /**
   * @ignore
   */
  PrimaryidUnspecified = 2,
  /**
   * @ignore
   */
  PrimaryidBt470m = 4,
  /**
   * @ignore
   */
  PrimaryidBt470bg = 5,
  /**
   * @ignore
   */
  PrimaryidSmpte170m = 6,
  /**
   * @ignore
   */
  PrimaryidSmpte240m = 7,
  /**
   * @ignore
   */
  PrimaryidFilm = 8,
  /**
   * @ignore
   */
  PrimaryidBt2020 = 9,
  /**
   * @ignore
   */
  PrimaryidSmptest428 = 10,
  /**
   * @ignore
   */
  PrimaryidSmptest431 = 11,
  /**
   * @ignore
   */
  PrimaryidSmptest432 = 12,
  /**
   * @ignore
   */
  PrimaryidJedecp22 = 22,
}

/**
 * @ignore
 */
export enum RangeID {
  /**
   * @ignore
   */
  RangeidInvalid = 0,
  /**
   * @ignore
   */
  RangeidLimited = 1,
  /**
   * @ignore
   */
  RangeidFull = 2,
  /**
   * @ignore
   */
  RangeidDerived = 3,
}

/**
 * @ignore
 */
export enum MatrixID {
  /**
   * @ignore
   */
  MatrixidRgb = 0,
  /**
   * @ignore
   */
  MatrixidBt709 = 1,
  /**
   * @ignore
   */
  MatrixidUnspecified = 2,
  /**
   * @ignore
   */
  MatrixidFcc = 4,
  /**
   * @ignore
   */
  MatrixidBt470bg = 5,
  /**
   * @ignore
   */
  MatrixidSmpte170m = 6,
  /**
   * @ignore
   */
  MatrixidSmpte240m = 7,
  /**
   * @ignore
   */
  MatrixidYcocg = 8,
  /**
   * @ignore
   */
  MatrixidBt2020Ncl = 9,
  /**
   * @ignore
   */
  MatrixidBt2020Cl = 10,
  /**
   * @ignore
   */
  MatrixidSmpte2085 = 11,
  /**
   * @ignore
   */
  MatrixidCdncls = 12,
  /**
   * @ignore
   */
  MatrixidCdcls = 13,
  /**
   * @ignore
   */
  MatrixidBt2100Ictcp = 14,
}

/**
 * @ignore
 */
export enum TransferID {
  /**
   * @ignore
   */
  TransferidBt709 = 1,
  /**
   * @ignore
   */
  TransferidUnspecified = 2,
  /**
   * @ignore
   */
  TransferidGamma22 = 4,
  /**
   * @ignore
   */
  TransferidGamma28 = 5,
  /**
   * @ignore
   */
  TransferidSmpte170m = 6,
  /**
   * @ignore
   */
  TransferidSmpte240m = 7,
  /**
   * @ignore
   */
  TransferidLinear = 8,
  /**
   * @ignore
   */
  TransferidLog = 9,
  /**
   * @ignore
   */
  TransferidLogSqrt = 10,
  /**
   * @ignore
   */
  TransferidIec6196624 = 11,
  /**
   * @ignore
   */
  TransferidBt1361Ecg = 12,
  /**
   * @ignore
   */
  TransferidIec6196621 = 13,
  /**
   * @ignore
   */
  TransferidBt202010 = 14,
  /**
   * @ignore
   */
  TransferidBt202012 = 15,
  /**
   * @ignore
   */
  TransferidSmptest2084 = 16,
  /**
   * @ignore
   */
  TransferidSmptest428 = 17,
  /**
   * @ignore
   */
  TransferidAribStdB67 = 18,
}

/**
 * @ignore
 */
export class ColorSpace {
  /**
   * @ignore
   */
  primaries?: PrimaryID;
  /**
   * @ignore
   */
  transfer?: TransferID;
  /**
   * @ignore
   */
  matrix?: MatrixID;
  /**
   * @ignore
   */
  range?: RangeID;
}

/**
 * @ignore
 */
export class Hdr10MetadataInfo {
  /**
   * @ignore
   */
  redPrimaryX?: number;
  /**
   * @ignore
   */
  redPrimaryY?: number;
  /**
   * @ignore
   */
  greenPrimaryX?: number;
  /**
   * @ignore
   */
  greenPrimaryY?: number;
  /**
   * @ignore
   */
  bluePrimaryX?: number;
  /**
   * @ignore
   */
  bluePrimaryY?: number;
  /**
   * @ignore
   */
  whitePointX?: number;
  /**
   * @ignore
   */
  whitePointY?: number;
  /**
   * @ignore
   */
  maxMasteringLuminance?: number;
  /**
   * @ignore
   */
  minMasteringLuminance?: number;
  /**
   * @ignore
   */
  maxContentLightLevel?: number;
  /**
   * @ignore
   */
  maxFrameAverageLightLevel?: number;
}

/**
 * The relative position of alphaBuffer and the video frame.
 */
export enum AlphaStitchMode {
  /**
   * 0: (Default) Video frame only, i.e., alphaBuffer is not stitched with the video frame.
   */
  NoAlphaStitch = 0,
  /**
   * 1: alphaBuffer is above the video frame.
   */
  AlphaStitchUp = 1,
  /**
   * 2: alphaBuffer is below the video frame.
   */
  AlphaStitchBelow = 2,
  /**
   * 3: alphaBuffer is to the left of the video frame.
   */
  AlphaStitchLeft = 3,
  /**
   * 4: alphaBuffer is to the right of the video frame.
   */
  AlphaStitchRight = 4,
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
 * Video buffer type.
 */
export enum VideoBufferType {
  /**
   * 1: Type is raw data.
   */
  VideoBufferRawData = 1,
  /**
   * 2: Type is raw data.
   */
  VideoBufferArray = 2,
  /**
   * 3: Type is Texture.
   */
  VideoBufferTexture = 3,
}

/**
 * External video frame.
 */
export class ExternalVideoFrame {
  /**
   * Video type. See VideoBufferType.
   */
  type?: VideoBufferType;
  /**
   * Pixel format. See VideoPixelFormat.
   */
  format?: VideoPixelFormat;
  /**
   * Video buffer.
   */
  buffer?: Uint8Array;
  /**
   * Stride of the input video frame, in pixels (not bytes). For Texture, this value indicates the width of the Texture.
   */
  stride?: number;
  /**
   * Height of the input video frame.
   */
  height?: number;
  /**
   * This parameter applies only to raw video data.
   */
  cropLeft?: number;
  /**
   * This parameter applies only to raw video data.
   */
  cropTop?: number;
  /**
   * This parameter applies only to raw video data.
   */
  cropRight?: number;
  /**
   * This parameter applies only to raw video data.
   */
  cropBottom?: number;
  /**
   * Field related to raw data. Specifies whether to rotate the input video group clockwise. Options: 0, 90, 180, 270. Default is 0.
   */
  rotation?: number;
  /**
   * Timestamp of the input video frame, in milliseconds. Incorrect timestamps may result in frame drops or audio-video desynchronization.
   */
  timestamp?: number;
  /**
   * This parameter applies only to video data in Texture format. Indicates the Texture ID of the video frame.
   */
  eglType?: EglContextType;
  /**
   * This parameter applies only to video data in Texture format. A 4x4 transformation matrix input, typically an identity matrix.
   */
  textureId?: number;
  /**
   * @ignore
   */
  fenceObject?: number;
  /**
   * This parameter applies only to video data in Texture format. A 4x4 transformation matrix input, typically an identity matrix.
   */
  matrix?: number[];
  /**
   * This parameter applies only to video data in Texture format. Indicates the data buffer of MetaData. Default value is NULL.
   */
  metadataBuffer?: Uint8Array;
  /**
   * This parameter applies only to video data in Texture format. Indicates the size of MetaData. Default value is 0.
   */
  metadataSize?: number;
  /**
   * Alpha channel data output by the portrait segmentation algorithm. This data matches the size of the video frame. Each pixel value ranges from [0,255], where 0 represents background and 255 represents foreground (portrait).
   * You can use this parameter to render the video background with various effects, such as transparency, solid color, image, or video. In custom video rendering scenarios, ensure that both the input video frame and alphaBuffer are of Full Range type; other types may result in abnormal Alpha data rendering.
   */
  alphaBuffer?: Uint8Array;
  /**
   * For video data in BGRA or RGBA format, you can choose either of the following methods to set the Alpha channel data:
   *  Automatically fill by setting this parameter to true.
   *  Set via the alphaBuffer parameter. This parameter applies only to video data in BGRA or RGBA format. Specifies whether to extract the Alpha channel data from the video frame and automatically fill it into alphaBuffer : true : Extract and fill the Alpha channel data. false : (default) Do not extract or fill the Alpha channel data.
   */
  fillAlphaBuffer?: boolean;
  /**
   * When the video frame contains Alpha channel data, sets the relative position of alphaBuffer and the video frame. See AlphaStitchMode.
   */
  alphaStitchMode?: AlphaStitchMode;
  /**
   * @ignore
   */
  d3d11Texture2d?: any;
  /**
   * @ignore
   */
  textureSliceIndex?: number;
  /**
   * @ignore
   */
  hdr10MetadataInfo?: Hdr10MetadataInfo;
  /**
   * Color space properties of the video frame. By default, Full Range and BT.709 standard configurations are applied. You can customize settings based on business requirements such as custom capture or rendering. See [VideoColorSpace](https://developer.mozilla.org/en-US/docs/Web/API/VideoColorSpace).
   */
  colorSpace?: ColorSpace;
}

/**
 * Properties of a video frame.
 *
 * The buffer is a pointer to a pointer. This interface cannot modify the pointer of the buffer, only its contents.
 */
export class VideoFrame {
  /**
   * Pixel format. See VideoPixelFormat.
   */
  type?: VideoPixelFormat;
  /**
   * Video pixel width.
   */
  width?: number;
  /**
   * Video pixel height.
   */
  height?: number;
  /**
   * For YUV data, the stride of the Y buffer; for RGBA data, the total data length. When processing video data, use this parameter to handle the offset between rows of pixel data. Otherwise, image distortion may occur.
   */
  yStride?: number;
  /**
   * For YUV data, the stride of the U buffer; for RGBA data, the value is 0. When processing video data, use this parameter to handle the offset between rows of pixel data. Otherwise, image distortion may occur.
   */
  uStride?: number;
  /**
   * For YUV data, the stride of the V buffer; for RGBA data, the value is 0. When processing video data, use this parameter to handle the offset between rows of pixel data. Otherwise, image distortion may occur.
   */
  vStride?: number;
  /**
   * For YUV data, the pointer to the Y buffer; for RGBA data, the data buffer.
   */
  yBuffer?: Uint8Array;
  /**
   * For YUV data, the pointer to the U buffer; for RGBA data, the value is empty.
   */
  uBuffer?: Uint8Array;
  /**
   * For YUV data, the pointer to the V buffer; for RGBA data, the value is empty.
   */
  vBuffer?: Uint8Array;
  /**
   * Clockwise rotation angle to apply before rendering the video. Supported values: 0, 90, 180, and 270 degrees.
   */
  rotation?: number;
  /**
   * Unix timestamp (ms) when the video frame is rendered. This timestamp is required and guides the rendering of the video frame.
   */
  renderTimeMs?: number;
  /**
   * Reserved parameter.
   */
  avsync_type?: number;
  /**
   * Applicable only to Texture format video data. Metadata buffer. Default is NULL.
   */
  metadata_buffer?: Uint8Array;
  /**
   * Applicable only to Texture format video data. Metadata size. Default is 0.
   */
  metadata_size?: number;
  /**
   * Applicable only to Texture format video data. Texture ID.
   */
  textureId?: number;
  /**
   * Applicable only to Texture format video data. A 4x4 transformation matrix input. Typical value is an identity matrix.
   */
  matrix?: number[];
  /**
   * Alpha channel data output by portrait segmentation algorithm. This data matches the video frame dimensions. Each pixel value ranges from [0, 255], where 0 represents background and 255 represents foreground (portrait).
   * You can use this parameter to render various background effects such as transparent, solid color, image, or video.
   *  In custom video rendering scenarios, ensure both the video frame and alphaBuffer are Full Range type; other types may cause rendering issues.
   *  Make sure alphaBuffer matches the video frame dimensions (width × height) exactly, otherwise the app may crash.
   */
  alphaBuffer?: Uint8Array;
  /**
   * When the video frame includes alpha channel data, sets the relative position of alphaBuffer and the video frame. See AlphaStitchMode.
   */
  alphaStitchMode?: AlphaStitchMode;
  /**
   * @ignore
   */
  pixelBuffer?: Uint8Array;
  /**
   * Metadata in the video frame. Contact [technical support](https://ticket.shengwang.cn/) to use this parameter.
   */
  metaInfo?: IVideoFrameMetaInfo;
  /**
   * @ignore
   */
  hdr10MetadataInfo?: Hdr10MetadataInfo;
  /**
   * Color space attributes of the video frame. By default, Full Range and BT.709 standard configurations are applied. You can customize this according to custom capture or rendering needs. See [VideoColorSpace](https://developer.mozilla.org/en-US/docs/Web/API/VideoColorSpace).
   */
  colorSpace?: ColorSpace;
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
 * Video observation position.
 */
export enum VideoModulePosition {
  /**
   * 1: The position after local video is captured and pre-processed, corresponding to the onCaptureVideoFrame callback. The video observed here includes pre-processing effects, which can be verified by enabling beauty effects, virtual background, or watermark.
   */
  PositionPostCapturer = 1 << 0,
  /**
   * 2: The position before rendering the received remote video, corresponding to the onRenderVideoFrame callback.
   */
  PositionPreRenderer = 1 << 1,
  /**
   * 4: The position before local video encoding, corresponding to the onPreEncodeVideoFrame callback. The video observed here includes both pre-processing and pre-encoding processing effects:
   *  For pre-processing effects, you can verify by enabling beauty effects, virtual background, or watermark.
   *  For pre-encoding effects, you can verify by setting a lower frame rate (e.g., 5 fps).
   */
  PositionPreEncoder = 1 << 2,
  /**
   * 8: The position after local video is captured but before pre-processing. The video observed here does not include pre-processing effects and can be verified by enabling beauty effects, virtual background, or setting a watermark.
   */
  PositionPostCapturerOrigin = 1 << 3,
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
 * Type of video content inspection module.
 */
export enum ContentInspectType {
  /**
   * 0: (Default) This module has no actual functionality. Do not set type to this value.
   */
  ContentInspectInvalid = 0,
  /**
   * @ignore
   */
  ContentInspectModeration = 1,
  /**
   * 2: Use Agora self-developed plugin for screenshot upload. The SDK takes screenshots of the video stream and uploads them.
   */
  ContentInspectSupervision = 2,
  /**
   * 3: Use cloud marketplace plugin for screenshot upload. The SDK uses the cloud marketplace video moderation plugin to take screenshots of the video stream and upload them.
   */
  ContentInspectImageModeration = 3,
}

/**
 * ContentInspectModule struct used to configure the frequency of local screenshot uploads.
 */
export class ContentInspectModule {
  /**
   * Type of function module. See ContentInspectType.
   */
  type?: ContentInspectType;
  /**
   * Interval for local screenshot uploads in seconds. The value must be greater than 0. Default is 0, which means no screenshot upload. Recommended value is 10 seconds, but you can adjust it based on your business needs.
   */
  interval?: number;
  /**
   * Position of the video observer. See VideoModulePosition.
   */
  position?: VideoModulePosition;
}

/**
 * Local screenshot upload configuration.
 */
export class ContentInspectConfig {
  /**
   * Additional information, with a maximum length of 1024 bytes.
   * The SDK uploads this information along with the screenshot to the Agora server. After the screenshot is complete, the Agora server sends the additional information back to your server in the callback notification.
   */
  extraInfo?: string;
  /**
   * (Optional) Server configuration for video moderation services on the cloud marketplace. This parameter only takes effect when the type in ContentInspectModule is set to ContentInspectImageModeration. To use this feature, please [contact technical support](https://ticket.shengwang.cn/).
   */
  serverConfig?: string;
  /**
   * Function modules. See ContentInspectModule.
   * Up to 32 ContentInspectModule instances are supported. The value range of MAX_CONTENT_INSPECT_MODULE_COUNT is an integer in [1,32]. Only one instance can be configured per function module. Currently, only screenshot upload is supported.
   */
  modules?: ContentInspectModule[];
  /**
   * Number of function modules, i.e., the number of ContentInspectModule instances configured. Must match the number of instances in modules. Maximum value is 32.
   */
  moduleCount?: number;
}

/**
 * Video snapshot settings.
 */
export class SnapshotConfig {
  /**
   * Make sure the directory exists and is writable. Local path to save the snapshot, including file name and format, for example:
   *  iOS: /App Sandbox/Library/Caches/example.jpg
   *  Android: /storage/emulated/0/Android/data/<package name>/files/example.jpg
   */
  filePath?: string;
  /**
   * The position of the video frame in the video pipeline for the snapshot. See VideoModulePosition.
   */
  position?: VideoModulePosition;
}

/**
 * This class is used to obtain raw PCM audio data.
 *
 * You can inherit this class and implement the onFrame callback to get PCM audio data.
 */
export interface IAudioPcmFrameSink {
  /**
   * Callback when an audio frame is received.
   *
   * After registering the audio data observer, this callback is triggered each time an audio frame is received to report audio frame information.
   *
   * @param frame Audio frame information. See AudioPcmFrame.
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
   * Audio frame type. See AudioFrameType.
   */
  type?: AudioFrameType;
  /**
   * Number of samples per channel.
   */
  samplesPerChannel?: number;
  /**
   * Number of bytes per sample. For PCM, typically 16 bits, i.e., 2 bytes.
   */
  bytesPerSample?: BytesPerSample;
  /**
   * Number of channels (for stereo, data is interleaved).
   *  1: Mono
   *  2: Stereo
   */
  channels?: number;
  /**
   * Number of samples per second per channel.
   */
  samplesPerSec?: number;
  /**
   * Audio data buffer (for stereo, data is interleaved).
   * Buffer size buffer = samples × channels × bytesPerSample.
   */
  buffer?: Uint8Array;
  /**
   * Render timestamp of the external audio frame.
   * You can use this timestamp to restore the order of audio frames; in scenarios with video (including those using external video sources), this parameter can be used to achieve audio-video synchronization.
   */
  renderTimeMs?: number;
  /**
   * Reserved parameter.
   */
  avsync_type?: number;
  /**
   * @ignore
   */
  presentationMs?: number;
  /**
   * @ignore
   */
  audioTrackNumber?: number;
  /**
   * @ignore
   */
  rtpTimestamp?: number;
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
 * The SDK sets the audio data format in the following callbacks based on AudioParams : onRecordAudioFrame onPlaybackAudioFrame onMixedAudioFrame
 *  The SDK calculates the sampling interval using the samplesPerCall, sampleRate, and channel parameters in AudioParams, and triggers the onRecordAudioFrame, onPlaybackAudioFrame, onMixedAudioFrame, and onEarMonitoringAudioFrame callbacks accordingly.
 *  Sampling interval = samplesPerCall / (sampleRate × channel).
 *  Ensure the sampling interval is not less than 0.01 (s).
 */
export class AudioParams {
  /**
   * Sampling rate of the data in Hz. Valid values:
   *  8000
   *  16000 (default)
   *  32000
   *  44100
   *  48000
   */
  sample_rate?: number;
  /**
   * Number of audio channels. Valid values:
   *  1: Mono (default)
   *  2: Stereo
   */
  channels?: number;
  /**
   * Usage mode of the data. See RawAudioFrameOpModeType.
   */
  mode?: RawAudioFrameOpModeType;
  /**
   * Number of samples per call, typically 1024 in scenarios like CDN streaming.
   */
  samples_per_call?: number;
}

/**
 * Audio observer.
 *
 * You can call registerAudioFrameObserver to register or unregister the IAudioFrameObserverBase audio observer.
 */
export interface IAudioFrameObserverBase {
  /**
   * Receives the raw audio data of the recording.
   *
   * To ensure the recorded audio data format meets expectations, you can configure it using the following methods: Call setRecordingAudioFrameParameters to set the audio format, and then call registerAudioFrameObserver to register the audio frame observer. The SDK calculates the sampling interval based on the parameters of this method and triggers the onRecordAudioFrame callback accordingly.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onRecordAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Receives the raw audio data of the playback.
   *
   * To ensure the playback audio data format meets expectations, you can configure it using the following methods: Call setPlaybackAudioFrameParameters to set the audio format, and then call registerAudioFrameObserver to register the audio frame observer. The SDK calculates the sampling interval based on the parameters of this method and triggers the onPlaybackAudioFrame callback accordingly.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onPlaybackAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Retrieves the data after audio mixing of capture and playback.
   *
   * To ensure that the audio data format after capture and playback mixing meets expectations, you can set the audio data format using the following methods: call setMixedAudioFrameParameters to set the audio data format, then call registerAudioFrameObserver to register the audio observer object. The SDK will calculate the sampling interval based on the parameters in this method and trigger the onMixedAudioFrame callback accordingly.
   *
   * @param channelId Channel ID.
   * @param audioFrame Raw audio data. See AudioFrame.
   */
  onMixedAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Receives the raw audio data of the ear monitoring.
   *
   * To ensure the ear monitoring audio data format meets expectations, you can configure it using the following methods: Call setEarMonitoringAudioFrameParameters to set the audio format, and then call registerAudioFrameObserver to register the audio frame observer. The SDK calculates the sampling interval based on the parameters of this method and triggers the onEarMonitoringAudioFrame callback accordingly.
   *
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onEarMonitoringAudioFrame?(audioFrame: AudioFrame): void;
}

/**
 * Audio observer.
 *
 * You can call registerAudioFrameObserver to register or unregister the IAudioFrameObserver audio observer.
 */
export interface IAudioFrameObserver extends IAudioFrameObserverBase {
  /**
   * Receives the audio of the subscribed remote user before mixing.
   *
   * Due to framework limitations, this callback does not support sending the processed audio data back to the SDK.
   *
   * @param channelId The channel ID.
   * @param uid The ID of the subscribed remote user.
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onPlaybackAudioFrameBeforeMixing?(
    channelId: string,
    uid: number,
    audioFrame: AudioFrame
  ): void;
}

/**
 * Audio spectrum data.
 */
export class AudioSpectrumData {
  /**
   * Audio spectrum data. Agora divides the audio frequency into 256 frequency bands and reports the energy value of each band through this parameter. The value range of each energy value is [-300,1], in dBFS.
   */
  audioSpectrumData?: number[];
  /**
   * The length of the audio spectrum data is 256.
   */
  dataLength?: number;
}

/**
 * Audio spectrum information of a remote user.
 */
export class UserAudioSpectrumInfo {
  /**
   * Remote user ID.
   */
  uid?: number;
  /**
   * @ignore
   */
  spectrumData?: AudioSpectrumData;
}

/**
 * Audio spectrum observer.
 */
export interface IAudioSpectrumObserver {
  /**
   * Receives the local audio spectrum.
   *
   * After successfully calling registerAudioSpectrumObserver, implementing the onLocalAudioSpectrum callback of IAudioSpectrumObserver, and enabling audio spectrum monitoring via enableAudioSpectrumMonitor, the SDK triggers this callback at the set interval to report the pre-encoded local audio spectrum data.
   *
   * @param data The local user's audio spectrum data. See AudioSpectrumData.
   */
  onLocalAudioSpectrum?(data: AudioSpectrumData): void;

  /**
   * Receives the remote audio spectrum.
   *
   * After successfully calling registerAudioSpectrumObserver, implementing the onRemoteAudioSpectrum callback of IAudioSpectrumObserver, and enabling audio spectrum monitoring via enableAudioSpectrumMonitor, the SDK triggers this callback at the set interval to report the received remote audio spectrum data.
   *
   * @param spectrums The audio spectrum information of remote users. See UserAudioSpectrumInfo. The array size equals the number of remote users detected by the SDK. An empty array indicates no remote audio spectrum was detected.
   * @param spectrumNumber The number of remote users.
   */
  onRemoteAudioSpectrum?(
    spectrums: UserAudioSpectrumInfo[],
    spectrumNumber: number
  ): void;
}

/**
 * Class for receiving encoded video frames.
 */
export interface IVideoEncodedFrameObserver {
  /**
   * Reports that the receiver has received a remote encoded video frame.
   *
   * When you call the setRemoteVideoSubscriptionOptions method and set encodedFrameOnly to true, the SDK triggers this callback locally to report the received encoded video frame information.
   *
   * @param channelId Channel name.
   * @param uid Remote user ID.
   * @param imageBuffer Video image buffer.
   * @param length Data length of the video image.
   * @param videoEncodedFrameInfo Information about the encoded video frame. See EncodedVideoFrameInfo.
   */
  onEncodedVideoFrameReceived?(
    channelId: string,
    uid: number,
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo
  ): void;
}

/**
 * Video frame processing mode.
 */
export enum VideoFrameProcessMode {
  /**
   * Read-only mode.
   * In read-only mode, you do not modify the video frame, and the video observer acts as a renderer.
   */
  ProcessModeReadOnly = 0,
  /**
   * Read-write mode.
   * In read-write mode, you modify the video frame, and the video observer acts as a video filter.
   */
  ProcessModeReadWrite = 1,
}

/**
 * Video observer.
 *
 * You can call registerVideoFrameObserver to register or unregister the IVideoFrameObserver video observer.
 */
export interface IVideoFrameObserver {
  /**
   * Gets video data captured by the local device.
   *
   * You can obtain the raw video data captured by the local device in the callback.
   *  If the video data you obtain is in RGBA format, the SDK does not support processing the Alpha channel value.
   *  When modifying parameters in videoFrame, ensure the modified parameters match the actual video frame in the buffer. Otherwise, unexpected rotation, distortion, or other issues may occur in the local preview or remote video.
   *  It is recommended to implement this callback using the C++ API.
   *  Due to framework limitations, this callback does not support sending the processed video data back to the SDK.
   *
   * @param sourceType Video source type, which can be: camera, screen, or media player. See VideoSourceType.
   * @param videoFrame Video frame data. See VideoFrame. The default format of the video frame data obtained through this callback is:
   *  Android: I420
   *  iOS: I420
   */
  onCaptureVideoFrame?(
    sourceType: VideoSourceType,
    videoFrame: VideoFrame
  ): void;

  /**
   * Retrieves local video data before encoding.
   *
   * After successfully registering the video data observer, the SDK triggers this callback for each captured video frame. You can use this callback to retrieve the video data before encoding and process it as needed.
   * After processing, you can pass the processed video data back to the SDK in this callback.
   *  It is recommended to implement this callback using the C++ API.
   *  Due to framework limitations, this callback does not support sending the processed video data back to the SDK.
   *  The video data obtained here has been pre-processed, such as cropping, rotation, and beautification.
   *  When modifying parameters in videoFrame, make sure the modified parameters match the actual video frame in the buffer. Otherwise, unexpected issues such as incorrect rotation or distortion may occur in the local preview or remote video.
   *
   * @param sourceType Type of video source. See VideoSourceType.
   * @param videoFrame Video frame data. See VideoFrame. The default video frame data format obtained through this callback is:
   *  Android: I420
   *  iOS: I420
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
   * Retrieves video data sent by the remote user.
   *
   * After successfully registering the video data observer, the SDK triggers this callback for each captured video frame. You can use this callback to retrieve the video data sent by the remote user before rendering and process it as needed.
   *  If the video data type is RGBA, the SDK does not support processing the Alpha channel.
   *  It is recommended to implement this callback using the C++ API.
   *  Due to framework limitations, this callback does not support sending the processed video data back to the SDK.
   *  When modifying parameters in videoFrame, make sure the modified parameters match the actual video frame in the buffer. Otherwise, unexpected issues such as incorrect rotation or distortion may occur in the local preview or remote video.
   *
   * @param channelId Channel ID.
   * @param remoteUid ID of the remote user who sent the video frame.
   * @param videoFrame Video frame data. See VideoFrame. The default video frame data format obtained through this callback is:
   *  Android: I420
   *  iOS: I420
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
 * Encoding type of external video frames.
 */
export enum ExternalVideoSourceType {
  /**
   * 0: Unencoded video frame.
   */
  VideoFrame = 0,
  /**
   * 1: Encoded video frame.
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
 * @ignore
 */
export enum MediaRecorderStreamType {
  /**
   * @ignore
   */
  StreamTypeAudio = 0x01,
  /**
   * @ignore
   */
  StreamTypeVideo = 0x02,
  /**
   * @ignore
   */
  StreamTypeBoth = 0x01 | 0x02,
}

/**
 * Current recording state.
 */
export enum RecorderState {
  /**
   * -1: Audio/video stream recording error. See RecorderReasonCode.
   */
  RecorderStateError = -1,
  /**
   * 2: Audio/video stream recording started.
   */
  RecorderStateStart = 2,
  /**
   * 3: Audio/video stream recording stopped.
   */
  RecorderStateStop = 3,
}

/**
 * Reasons for recording state errors.
 */
export enum RecorderReasonCode {
  /**
   * 0: Everything is normal.
   */
  RecorderReasonNone = 0,
  /**
   * @ignore
   */
  RecorderReasonWriteFailed = 1,
  /**
   * @ignore
   */
  RecorderReasonNoStream = 2,
  /**
   * @ignore
   */
  RecorderReasonOverMaxDuration = 3,
  /**
   * @ignore
   */
  RecorderReasonConfigChanged = 4,
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
  /**
   * @ignore
   */
  width?: number;
  /**
   * @ignore
   */
  height?: number;
  /**
   * @ignore
   */
  fps?: number;
  /**
   * @ignore
   */
  sample_rate?: number;
  /**
   * @ignore
   */
  channel_num?: number;
  /**
   * @ignore
   */
  videoSourceType?: VideoSourceType;
}

/**
 * Face information observer.
 *
 * You can call registerFaceInfoObserver to register the IFaceInfoObserver observer.
 */
export interface IFaceInfoObserver {
  /**
   * Reports face information processed by the voice driver extension.
   *
   * @param outFaceInfo Output parameter. A JSON string of face information processed by the voice driver extension, containing the following fields:
   *  faces: Array of objects. Contains detected face information, with each object representing one face.
   *  blendshapes: Object. Blend shape coefficients conforming to the ARKit standard. Each key-value pair represents a blendshape coefficient as a float in the range [0.0, 1.0].
   *  rotation: Array of objects. Head rotation angles, including the following key-value pairs with float values in the range [-180.0, 180.0]:
   *  pitch: Head tilt angle. Positive when looking down, negative when looking up.
   *  yaw: Horizontal head rotation. Positive when turning left, negative when turning right.
   *  roll: Vertical head rotation. Positive when tilting right, negative when tilting left.
   *  timestamp: String. Timestamp of the output result in milliseconds. Example JSON: { "faces":[{ "blendshapes":{ "eyeBlinkLeft":0.9, "eyeLookDownLeft":0.0, "eyeLookInLeft":0.0, "eyeLookOutLeft":0.0, "eyeLookUpLeft":0.0, "eyeSquintLeft":0.0, "eyeWideLeft":0.0, "eyeBlinkRight":0.0, "eyeLookDownRight":0.0, "eyeLookInRight":0.0, "eyeLookOutRight":0.0, "eyeLookUpRight":0.0, "eyeSquintRight":0.0, "eyeWideRight":0.0, "jawForward":0.0, "jawLeft":0.0, "jawRight":0.0, "jawOpen":0.0, "mouthClose":0.0, "mouthFunnel":0.0, "mouthPucker":0.0, "mouthLeft":0.0, "mouthRight":0.0, "mouthSmileLeft":0.0, "mouthSmileRight":0.0, "mouthFrownLeft":0.0, "mouthFrownRight":0.0, "mouthDimpleLeft":0.0, "mouthDimpleRight":0.0, "mouthStretchLeft":0.0, "mouthStretchRight":0.0, "mouthRollLower":0.0, "mouthRollUpper":0.0, "mouthShrugLower":0.0, "mouthShrugUpper":0.0, "mouthPressLeft":0.0, "mouthPressRight":0.0, "mouthLowerDownLeft":0.0, "mouthLowerDownRight":0.0, "mouthUpperUpLeft":0.0, "mouthUpperUpRight":0.0, "browDownLeft":0.0, "browDownRight":0.0, "browInnerUp":0.0, "browOuterUpLeft":0.0, "browOuterUpRight":0.0, "cheekPuff":0.0, "cheekSquintLeft":0.0, "cheekSquintRight":0.0, "noseSneerLeft":0.0, "noseSneerRight":0.0, "tongueOut":0.0 }, "rotation":{"pitch":30.0, "yaw":25.5, "roll":-15.5}, }], "timestamp":"654879876546" }
   *
   * @returns
   * true : Face info JSON parsed successfully. false : Failed to parse face info JSON.
   */
  onFaceInfo?(outFaceInfo: string): void;
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
    reason: RecorderReasonCode
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
