export enum AudioRoute {
  RouteDefault = -1,
  RouteHeadset = 0,
  RouteEarpiece = 1,
  RouteHeadsetnomic = 2,
  RouteSpeakerphone = 3,
  RouteLoudspeaker = 4,
  RouteHeadsetbluetooth = 5,
  RouteHdmi = 6,
  RouteUsb = 7,
}

export enum NlpAggressiveness {
  NlpNotSpecified = 0,
  NlpMild = 1,
  NlpNormal = 2,
  NlpAggressive = 3,
  NlpSuperAggressive = 4,
  NlpExtreme = 5,
}

export enum BytesPerSample {
  TwoBytesPerSample = 2,
}

export class AudioParameters {
  sample_rate?: number;
  channels?: number;
  frames_per_buffer?: number;
}

export enum RawAudioFrameOpModeType {
  RawAudioFrameOpModeReadOnly = 0,
  RawAudioFrameOpModeReadWrite = 2,
}

export enum MediaSourceType {
  AudioPlayoutSource = 0,
  AudioRecordingSource = 1,
  PrimaryCameraSource = 2,
  SecondaryCameraSource = 3,
  PrimaryScreenSource = 4,
  SecondaryScreenSource = 5,
  CustomVideoSource = 6,
  MediaPlayerSource = 7,
  RtcImagePngSource = 8,
  RtcImageJpegSource = 9,
  RtcImageGifSource = 10,
  RemoteVideoSource = 11,
  TranscodedVideoSource = 12,
  UnknownMediaSource = 100,
}

export class PacketOptions {
  timestamp?: number;
  audioLevelIndication?: number;
}

export enum AudioProcessingChannels {
  AudioProcessingMono = 1,
  AudioProcessingStereo = 2,
}

export class AdvancedAudioOptions {
  audioProcessingChannels?: AudioProcessingChannels;
}

export class AudioEncodedFrameInfo {
  sendTs?: number;
  codec?: number;
}

export class AudioPcmFrame {
  capture_timestamp?: number;
  samples_per_channel_?: number;
  sample_rate_hz_?: number;
  num_channels_?: number;
  bytes_per_sample?: BytesPerSample;
  data_?: number[];
}

export enum AudioDualMonoMode {
  AudioDualMonoStereo = 0,
  AudioDualMonoL = 1,
  AudioDualMonoR = 2,
  AudioDualMonoMix = 3,
}

export enum VideoPixelFormat {
  VideoPixelUnknown = 0,
  VideoPixelI420 = 1,
  VideoPixelBgra = 2,
  VideoPixelNv21 = 3,
  VideoPixelRgba = 4,
  VideoPixelNv12 = 8,
  VideoTexture2d = 10,
  VideoTextureOes = 11,
  VideoPixelI422 = 16,
}

export enum RenderModeType {
  RenderModeHidden = 1,
  RenderModeFit = 2,
  RenderModeAdaptive = 3,
}

export enum EglContextType {
  EglContext10 = 0,
  EglContext14 = 1,
}

export enum VideoBufferType {
  VideoBufferRawData = 1,
  VideoBufferArray = 2,
  VideoBufferTexture = 3,
}

export enum MediaPlayerSourceType {
  MediaPlayerSourceDefault = 0,
  MediaPlayerSourceFullFeatured = 1,
  MediaPlayerSourceSimple = 2,
}

export enum VideoModulePosition {
  PositionPostCapturer = 1 << 0,
  PositionPreRenderer = 1 << 1,
  PositionPreEncoder = 1 << 2,
  PositionPostFilters = 1 << 3,
}

export enum AudioFrameType {
  FrameTypePcm16 = 0,
}

export class AudioSpectrumData {
  audioSpectrumData?: number[];
  dataLength?: number;
}

export class UserAudioSpectrumInfo {
  uid?: number;
  spectrumData?: AudioSpectrumData;
}

export enum VideoFrameProcessMode {
  ProcessModeReadOnly = 0,
  ProcessModeReadWrite = 1,
}

export enum ContentInspectResult {
  ContentInspectNeutral = 1,
  ContentInspectSexy = 2,
  ContentInspectPorn = 3,
}

export enum ContentInspectDeviceType {
  ContentInspectDeviceInvalid = 0,
  ContentInspectDeviceAgora = 1,
  ContentInspectDeviceHive = 2,
  ContentInspectDeviceTupu = 3,
}

export enum ContentInspectType {
  ContentInspectInvalide = 0,
  ContentInspectModeration = 1,
  ContentInspectSupervise = 2,
}

export class ContentInspectModule {
  type?: ContentInspectType;
  frequency?: number;
}

export class ContentInspectConfig {
  enable?: boolean;
  DeviceWork?: boolean;
  CloudWork?: boolean;
  DeviceworkType?: ContentInspectDeviceType;
  extraInfo?: string;
  modules?: ContentInspectModule[];
  moduleCount?: number;
}

export class SnapShotConfig {
  channel?: string;
  uid?: number;
  filePath?: string;
}

export enum ExternalVideoSourceType {
  VideoFrame = 0,
  EncodedVideoFrame = 1,
}
