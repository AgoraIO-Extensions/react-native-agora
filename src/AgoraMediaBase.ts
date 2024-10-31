import './extension/AgoraMediaBaseExtension';
import { EncodedVideoFrameInfo } from './AgoraBase';

/**
 * The context information of the extension.
 */
export class ExtensionContext {
  /**
   * Whether the uid in ExtensionContext is valid: true : The uid is valid. false : The uid is invalid.
   */
  isValid?: boolean;
  /**
   * The user ID. 0 represents a local user, while greater than 0 represents a remote user.
   */
  uid?: number;
  /**
   * The name of the extension provider.
   */
  providerName?: string;
  /**
   * The name of the extension.
   */
  extensionName?: string;
}

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
   * 11: (For Android only) The third camera.
   */
  VideoSourceCameraThird = 11,
  /**
   * 12: (For Android only) The fourth camera.
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
   * @ignore
   */
  VideoSourceSpeechDriven = 15,
  /**
   * 100: An unknown video source.
   */
  VideoSourceUnknown = 100,
}

/**
 * @ignore
 */
export enum AudioSourceType {
  /**
   * @ignore
   */
  AudioSourceMicrophone = 0,
  /**
   * @ignore
   */
  AudioSourceCustom = 1,
  /**
   * @ignore
   */
  AudioSourceMediaPlayer = 2,
  /**
   * @ignore
   */
  AudioSourceLoopbackRecording = 3,
  /**
   * @ignore
   */
  AudioSourceMixedStream = 4,
  /**
   * @ignore
   */
  AudioSourceRemoteUser = 5,
  /**
   * @ignore
   */
  AudioSourceRemoteChannel = 6,
  /**
   * @ignore
   */
  AudioSourceUnknown = 100,
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
   * 5: The audio route is a Bluetooth device using the HFP protocol.
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
   * 10: The audio route is a Bluetooth device using the A2DP protocol.
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
   * 3: A secondary camera.
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
   * 6: Custom video source.
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
   * @ignore
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
   * 2: Video screenshot and upload via Agora self-developed extension. SDK takes screenshots of the video stream in the channel and uploads them.
   */
  ContentInspectSupervision = 2,
  /**
   * 3: Video screenshot and upload via extensions from Agora Extensions Marketplace. SDK uses video moderation extensions from Agora Extensions Marketplace to take screenshots of the video stream in the channel and uploads them.
   */
  ContentInspectImageModeration = 3,
}

/**
 * ContentInspectModule A structure used to configure the frequency of video screenshot and upload.
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
 * Screenshot and upload configuration.
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
  /**
   * @ignore
   */
  is_stereo_?: boolean;
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
   * @ignore
   */
  VideoCvpixelP010 = 15,
  /**
   * 16: The format is I422.
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
 * @ignore
 */
export enum AlphaStitchMode {
  /**
   * @ignore
   */
  NoAlphaStitch = 0,
  /**
   * @ignore
   */
  AlphaStitchUp = 1,
  /**
   * @ignore
   */
  AlphaStitchBelow = 2,
  /**
   * @ignore
   */
  AlphaStitchLeft = 3,
  /**
   * @ignore
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
   * @ignore
   */
  fenceObject?: number;
  /**
   * This parameter only applies to video data in Texture format. Incoming 4 × 4 transformational matrix. The typical value is a unit matrix.
   */
  matrix?: number[];
  /**
   * This parameter only applies to video data in Texture format. The MetaData buffer. The default value is NULL.
   */
  metadataBuffer?: Uint8Array;
  /**
   * This parameter only applies to video data in Texture format. The MetaData size. The default value is 0.
   */
  metadataSize?: number;
  /**
   * The alpha channel data output by using portrait segmentation algorithm. This data matches the size of the video frame, with each pixel value ranging from [0,255], where 0 represents the background and 255 represents the foreground (portrait). By setting this parameter, you can render the video background into various effects, such as transparent, solid color, image, video, etc. In custom video rendering scenarios, ensure that both the video frame and alphaBuffer are of the Full Range type; other types may cause abnormal alpha data rendering.
   */
  alphaBuffer?: Uint8Array;
  /**
   * This parameter only applies to video data in BGRA or RGBA format. Whether to extract the alpha channel data from the video frame and automatically fill it into alphaBuffer : true ：Extract and fill the alpha channel data. false : (Default) Do not extract and fill the Alpha channel data. For video data in BGRA or RGBA format, you can set the Alpha channel data in either of the following ways:
   *  Automatically by setting this parameter to true.
   *  Manually through the alphaBuffer parameter.
   */
  fillAlphaBuffer?: boolean;
  /**
   * When the video frame contains alpha channel data, it represents the relative position of alphaBuffer and the video frame. See AlphaStitchMode.
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
   * @ignore
   */
  colorSpace?: ColorSpace;
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
   * For YUV data, the line span of the Y buffer; for RGBA data, the total data length. When dealing with video data, it is necessary to process the offset between each line of pixel data based on this parameter, otherwise it may result in image distortion.
   */
  yStride?: number;
  /**
   * For YUV data, the line span of the U buffer; for RGBA data, the value is 0. When dealing with video data, it is necessary to process the offset between each line of pixel data based on this parameter, otherwise it may result in image distortion.
   */
  uStride?: number;
  /**
   * For YUV data, the line span of the V buffer; for RGBA data, the value is 0. When dealing with video data, it is necessary to process the offset between each line of pixel data based on this parameter, otherwise it may result in image distortion.
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
   * The Unix timestamp (ms) when the video frame is rendered. This timestamp can be used to guide the rendering of the video frame. This parameter is required.
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
   * The alpha channel data output by using portrait segmentation algorithm. This data matches the size of the video frame, with each pixel value ranging from [0,255], where 0 represents the background and 255 represents the foreground (portrait). By setting this parameter, you can render the video background into various effects, such as transparent, solid color, image, video, etc.
   *  In custom video rendering scenarios, ensure that both the video frame and alphaBuffer are of the Full Range type; other types may cause abnormal alpha data rendering.
   *  Make sure that alphaBuffer is exactly the same size as the video frame (width × height), otherwise it may cause the app to crash.
   */
  alphaBuffer?: Uint8Array;
  /**
   * When the video frame contains alpha channel data, it represents the relative position of alphaBuffer and the video frame. See AlphaStitchMode.
   */
  alphaStitchMode?: AlphaStitchMode;
  /**
   * @ignore
   */
  pixelBuffer?: Uint8Array;
  /**
   * The meta information in the video frame. To use this parameter, contact.
   */
  metaInfo?: IVideoFrameMetaInfo;
  /**
   * @ignore
   */
  hdr10MetadataInfo?: Hdr10MetadataInfo;
  /**
   * @ignore
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
 * The frame position of the video observer.
 */
export enum VideoModulePosition {
  /**
   * 1: The location of the locally collected video data after preprocessing corresponds to the onCaptureVideoFrame callback. The observed video here has the effect of video pre-processing, which can be verified by enabling image enhancement, virtual background, or watermark.
   */
  PositionPostCapturer = 1 << 0,
  /**
   * 2: The pre-renderer position, which corresponds to the video data in the onRenderVideoFrame callback.
   */
  PositionPreRenderer = 1 << 1,
  /**
   * 4: The pre-encoder position, which corresponds to the video data in the onPreEncodeVideoFrame callback. The observed video here has the effects of video pre-processing and encoding pre-processing.
   *  To verify the pre-processing effects of the video, you can enable image enhancement, virtual background, or watermark.
   *  To verify the pre-encoding processing effect, you can set a lower frame rate (for example, 5 fps).
   */
  PositionPreEncoder = 1 << 2,
  /**
   * 8: The position after local video capture and before pre-processing. The observed video here does not have pre-processing effects, which can be verified by enabling image enhancement, virtual background, or watermarks.
   */
  PositionPostCapturerOrigin = 1 << 3,
}

/**
 * @ignore
 */
export class SnapshotConfig {
  /**
   * @ignore
   */
  filePath?: string;
  /**
   * @ignore
   */
  position?: VideoModulePosition;
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
   * The number of bytes per sample. For PCM, this parameter is generally set to 16 bits (2 bytes).
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
   */
  onRecordAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Gets the raw audio frame for playback.
   *
   * To ensure that the data format of audio frame for playback is as expected, Agora recommends that you set the audio data format as follows: After calling setPlaybackAudioFrameParameters to set the audio data format and registerAudioFrameObserver to register the audio frame observer object, the SDK calculates the sampling interval according to the parameters set in the methods, and triggers the onPlaybackAudioFrame callback according to the sampling interval.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onPlaybackAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Retrieves the mixed captured and playback audio frame.
   *
   * To ensure that the data format of mixed captured and playback audio frame meets the expectations, Agora recommends that you set the data format as follows: After calling setMixedAudioFrameParameters to set the audio data format and registerAudioFrameObserver to register the audio frame observer object, the SDK calculates the sampling interval according to the parameters set in the methods, and triggers the onMixedAudioFrame callback according to the sampling interval.
   *
   * @param channelId The channel ID.
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onMixedAudioFrame?(channelId: string, audioFrame: AudioFrame): void;

  /**
   * Gets the in-ear monitoring audio frame.
   *
   * In order to ensure that the obtained in-ear audio data meets the expectations, Agora recommends that you set the in-ear monitoring-ear audio data format as follows: After calling setEarMonitoringAudioFrameParameters to set the audio data format and registerAudioFrameObserver to register the audio frame observer object, the SDK calculates the sampling interval according to the parameters set in the methods, and triggers the onEarMonitoringAudioFrame callback according to the sampling interval.
   *
   * @param audioFrame The raw audio data. See AudioFrame.
   */
  onEarMonitoringAudioFrame?(audioFrame: AudioFrame): void;
}

/**
 * The audio frame observer.
 */
export interface IAudioFrameObserver extends IAudioFrameObserverBase {
  /**
   * Retrieves the audio frame before mixing of subscribed remote users.
   *
   * Due to framework limitations, this callback does not support sending processed audio data back to the SDK.
   *
   * @param channelId The channel ID.
   * @param uid The ID of subscribed remote users.
   * @param audioFrame The raw audio data. See AudioFrame.
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
   * After successfully calling registerAudioSpectrumObserver to implement the onLocalAudioSpectrum callback in IAudioSpectrumObserver and calling enableAudioSpectrumMonitor to enable audio spectrum monitoring, the SDK triggers this callback as the time interval you set to report the received remote audio data spectrum before encoding.
   *
   * @param data The audio spectrum data of the local user. See AudioSpectrumData.
   */
  onLocalAudioSpectrum?(data: AudioSpectrumData): void;

  /**
   * Gets the remote audio spectrum.
   *
   * After successfully calling registerAudioSpectrumObserver to implement the onRemoteAudioSpectrum callback in the IAudioSpectrumObserver and calling enableAudioSpectrumMonitor to enable audio spectrum monitoring, the SDK will trigger the callback as the time interval you set to report the received remote audio data spectrum.
   *
   * @param spectrums The audio spectrum information of the remote user. See UserAudioSpectrumInfo. The number of arrays is the number of remote users monitored by the SDK. If the array is null, it means that no audio spectrum of remote users is detected.
   * @param spectrumNumber The number of remote users.
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
   * You can get raw video data collected by the local device through this callback.
   *
   * @param sourceType Video source types, including cameras, screens, or media player. See VideoSourceType.
   * @param videoFrame The video frame. See VideoFrame. The default value of the video frame data format obtained through this callback is as follows:
   *  Android: I420
   *  iOS: I420
   */
  onCaptureVideoFrame?(
    sourceType: VideoSourceType,
    videoFrame: VideoFrame
  ): void;

  /**
   * Occurs each time the SDK receives a video frame before encoding.
   *
   * After you successfully register the video frame observer, the SDK triggers this callback each time it receives a video frame. In this callback, you can get the video data before encoding and then process the data according to your particular scenarios. After processing, you can send the processed video data back to the SDK in this callback.
   *  It is recommended that you ensure the modified parameters in videoFrame are consistent with the actual situation of the video frames in the video frame buffer. Otherwise, it may cause unexpected rotation, distortion, and other issues in the local preview and remote video display.
   *  It's recommended that you implement this callback through the C++ API.
   *  Due to framework limitations, this callback does not support sending processed video data back to the SDK.
   *  The video data that this callback gets has been preprocessed, with its content cropped and rotated, and the image enhanced.
   *
   * @param sourceType The type of the video source. See VideoSourceType.
   * @param videoFrame The video frame. See VideoFrame. The default value of the video frame data format obtained through this callback is as follows:
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
   * Occurs each time the SDK receives a video frame sent by the remote user.
   *
   * After you successfully register the video frame observer, the SDK triggers this callback each time it receives a video frame. In this callback, you can get the video data sent from the remote end before rendering, and then process it according to the particular scenarios.
   *  It is recommended that you ensure the modified parameters in videoFrame are consistent with the actual situation of the video frames in the video frame buffer. Otherwise, it may cause unexpected rotation, distortion, and other issues in the local preview and remote video display.
   *  If the video data type you get is RGBA, the SDK does not support processing the data of the alpha channel.
   *  It's recommended that you implement this callback through the C++ API.
   *  Due to framework limitations, this callback does not support sending processed video data back to the SDK.
   *
   * @param channelId The channel ID.
   * @param remoteUid The user ID of the remote user who sends the current video frame.
   * @param videoFrame The video frame. See VideoFrame. The default value of the video frame data format obtained through this callback is as follows:
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
   * -1: An error occurs during the recording. See RecorderReasonCode for the reason.
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
export enum RecorderReasonCode {
  /**
   * 0: No error.
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
 * Facial information observer.
 *
 * You can call registerFaceInfoObserver to register one IFaceInfoObserver observer.
 */
export interface IFaceInfoObserver {
  /**
   * Occurs when the facial information processed by speech driven extension is received.
   *
   * @param outFaceInfo Output parameter, the JSON string of the facial information processed by the voice driver plugin, including the following fields:
   *  faces: Object sequence. The collection of facial information, with each face corresponding to an object.
   *  blendshapes: Object. The collection of face capture coefficients, named according to ARkit standards, with each key-value pair representing a blendshape coefficient. The blendshape coefficient is a floating point number with a range of [0.0, 1.0].
   *  rotation: Object sequence. The rotation of the head, which includes the following three key-value pairs, with values as floating point numbers ranging from -180.0 to 180.0:
   *  pitch: Head pitch angle. A positve value means looking down, while a negative value means looking up.
   *  yaw: Head yaw angle. A positve value means turning left, while a negative value means turning right.
   *  roll: Head roll angle. A positve value means tilting to the right, while a negative value means tilting to the left.
   *  timestamp: String. The timestamp of the output result, in milliseconds. Here is an example of JSON:
   * { "faces":[{ "blendshapes":{ "eyeBlinkLeft":0.9, "eyeLookDownLeft":0.0, "eyeLookInLeft":0.0, "eyeLookOutLeft":0.0, "eyeLookUpLeft":0.0, "eyeSquintLeft":0.0, "eyeWideLeft":0.0, "eyeBlinkRight":0.0, "eyeLookDownRight":0.0, "eyeLookInRight":0.0, "eyeLookOutRight":0.0, "eyeLookUpRight":0.0, "eyeSquintRight":0.0, "eyeWideRight":0.0, "jawForward":0.0, "jawLeft":0.0, "jawRight":0.0, "jawOpen":0.0, "mouthClose":0.0, "mouthFunnel":0.0, "mouthPucker":0.0, "mouthLeft":0.0, "mouthRight":0.0, "mouthSmileLeft":0.0, "mouthSmileRight":0.0, "mouthFrownLeft":0.0, "mouthFrownRight":0.0, "mouthDimpleLeft":0.0, "mouthDimpleRight":0.0, "mouthStretchLeft":0.0, "mouthStretchRight":0.0, "mouthRollLower":0.0, "mouthRollUpper":0.0, "mouthShrugLower":0.0, "mouthShrugUpper":0.0, "mouthPressLeft":0.0, "mouthPressRight":0.0, "mouthLowerDownLeft":0.0, "mouthLowerDownRight":0.0, "mouthUpperUpLeft":0.0, "mouthUpperUpRight":0.0, "browDownLeft":0.0, "browDownRight":0.0, "browInnerUp":0.0, "browOuterUpLeft":0.0, "browOuterUpRight":0.0, "cheekPuff":0.0, "cheekSquintLeft":0.0, "cheekSquintRight":0.0, "noseSneerLeft":0.0, "noseSneerRight":0.0, "tongueOut":0.0 }, "rotation":{"pitch":30.0, "yaw":25.5, "roll":-15.5},
   *  }], "timestamp":"654879876546" }
   *
   * @returns
   * true : Facial information JSON parsing successful. false : Facial information JSON parsing failed.
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
