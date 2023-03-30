import './extension/AgoraMediaBaseExtension';
/* enum_audioroute */
export enum AudioRoute {
/* enum_audioroute_RouteDefault */
RouteDefault = -1,
/* enum_audioroute_RouteHeadset */
RouteHeadset = 0,
/* enum_audioroute_RouteEarpiece */
RouteEarpiece = 1,
/* enum_audioroute_RouteHeadsetnomic */
RouteHeadsetnomic = 2,
/* enum_audioroute_RouteSpeakerphone */
RouteSpeakerphone = 3,
/* enum_audioroute_RouteLoudspeaker */
RouteLoudspeaker = 4,
/* enum_audioroute_RouteHeadsetbluetooth */
RouteHeadsetbluetooth = 5,
/* enum_audioroute_RouteUsb */
RouteUsb = 6,
/* enum_audioroute_RouteHdmi */
RouteHdmi = 7,
/* enum_audioroute_RouteDisplayport */
RouteDisplayport = 8,
/* enum_audioroute_RouteAirplay */
RouteAirplay = 9,
}

/* enum_bytespersample */
export enum BytesPerSample {
/* enum_bytespersample_TwoBytesPerSample */
TwoBytesPerSample = 2,
}

/* class_audioparameters */
export class AudioParameters {
  /* class_audioparameters_sample_rate */
  sample_rate?: number
  /* class_audioparameters_channels */
  channels?: number
  /* class_audioparameters_frames_per_buffer */
  frames_per_buffer?: number
}

/* enum_rawaudioframeopmodetype */
export enum RawAudioFrameOpModeType {
/* enum_rawaudioframeopmodetype_RawAudioFrameOpModeReadOnly */
RawAudioFrameOpModeReadOnly = 0,
/* enum_rawaudioframeopmodetype_RawAudioFrameOpModeReadWrite */
RawAudioFrameOpModeReadWrite = 2,
}

/* enum_mediasourcetype */
export enum MediaSourceType {
/* enum_mediasourcetype_AudioPlayoutSource */
AudioPlayoutSource = 0,
/* enum_mediasourcetype_AudioRecordingSource */
AudioRecordingSource = 1,
/* enum_mediasourcetype_PrimaryCameraSource */
PrimaryCameraSource = 2,
/* enum_mediasourcetype_SecondaryCameraSource */
SecondaryCameraSource = 3,
/* enum_mediasourcetype_PrimaryScreenSource */
PrimaryScreenSource = 4,
/* enum_mediasourcetype_SecondaryScreenSource */
SecondaryScreenSource = 5,
/* enum_mediasourcetype_CustomVideoSource */
CustomVideoSource = 6,
/* enum_mediasourcetype_MediaPlayerSource */
MediaPlayerSource = 7,
/* enum_mediasourcetype_RtcImagePngSource */
RtcImagePngSource = 8,
/* enum_mediasourcetype_RtcImageJpegSource */
RtcImageJpegSource = 9,
/* enum_mediasourcetype_RtcImageGifSource */
RtcImageGifSource = 10,
/* enum_mediasourcetype_RemoteVideoSource */
RemoteVideoSource = 11,
/* enum_mediasourcetype_TranscodedVideoSource */
TranscodedVideoSource = 12,
/* enum_mediasourcetype_UnknownMediaSource */
UnknownMediaSource = 100,
}

/* enum_contentinspectresult */
export enum ContentInspectResult {
/* enum_contentinspectresult_ContentInspectNeutral */
ContentInspectNeutral = 1,
/* enum_contentinspectresult_ContentInspectSexy */
ContentInspectSexy = 2,
/* enum_contentinspectresult_ContentInspectPorn */
ContentInspectPorn = 3,
}

/* enum_contentinspecttype */
export enum ContentInspectType {
/* enum_contentinspecttype_ContentInspectInvalid */
ContentInspectInvalid = 0,
/* enum_contentinspecttype_ContentInspectModeration */
ContentInspectModeration = 1,
/* enum_contentinspecttype_ContentInspectSupervision */
ContentInspectSupervision = 2,
}

/* class_contentinspectmodule */
export class ContentInspectModule {
  /* class_contentinspectmodule_type */
  type?: ContentInspectType
  /* class_contentinspectmodule_interval */
  interval?: number
}

/* class_contentinspectconfig */
export class ContentInspectConfig {
  /* class_contentinspectconfig_extraInfo */
  extraInfo?: string
  /* class_contentinspectconfig_modules */
  modules?: ContentInspectModule[]
  /* class_contentinspectconfig_moduleCount */
  moduleCount?: number
}

/* class_packetoptions */
export class PacketOptions {
  /* class_packetoptions_timestamp */
  timestamp?: number
  /* class_packetoptions_audioLevelIndication */
  audioLevelIndication?: number
}

/* class_audioencodedframeinfo */
export class AudioEncodedFrameInfo {
  /* class_audioencodedframeinfo_sendTs */
  sendTs?: number
  /* class_audioencodedframeinfo_codec */
  codec?: number
}

/* class_audiopcmframe */
export class AudioPcmFrame {
  /* class_audiopcmframe_capture_timestamp */
  capture_timestamp?: number
  /* class_audiopcmframe_samples_per_channel_ */
  samples_per_channel_?: number
  /* class_audiopcmframe_sample_rate_hz_ */
  sample_rate_hz_?: number
  /* class_audiopcmframe_num_channels_ */
  num_channels_?: number
  /* class_audiopcmframe_bytes_per_sample */
  bytes_per_sample?: BytesPerSample
  /* class_audiopcmframe_data_ */
  data_?: number[]
}

/* enum_audiodualmonomode */
export enum AudioDualMonoMode {
/* enum_audiodualmonomode_AudioDualMonoStereo */
AudioDualMonoStereo = 0,
/* enum_audiodualmonomode_AudioDualMonoL */
AudioDualMonoL = 1,
/* enum_audiodualmonomode_AudioDualMonoR */
AudioDualMonoR = 2,
/* enum_audiodualmonomode_AudioDualMonoMix */
AudioDualMonoMix = 3,
}

/* enum_videopixelformat */
export enum VideoPixelFormat {
/* enum_videopixelformat_VideoPixelDefault */
VideoPixelDefault = 0,
/* enum_videopixelformat_VideoPixelI420 */
VideoPixelI420 = 1,
/* enum_videopixelformat_VideoPixelBgra */
VideoPixelBgra = 2,
/* enum_videopixelformat_VideoPixelNv21 */
VideoPixelNv21 = 3,
/* enum_videopixelformat_VideoPixelRgba */
VideoPixelRgba = 4,
/* enum_videopixelformat_VideoPixelNv12 */
VideoPixelNv12 = 8,
/* enum_videopixelformat_VideoTexture2d */
VideoTexture2d = 10,
/* enum_videopixelformat_VideoTextureOes */
VideoTextureOes = 11,
/* enum_videopixelformat_VideoCvpixelNv12 */
VideoCvpixelNv12 = 12,
/* enum_videopixelformat_VideoCvpixelI420 */
VideoCvpixelI420 = 13,
/* enum_videopixelformat_VideoCvpixelBgra */
VideoCvpixelBgra = 14,
/* enum_videopixelformat_VideoPixelI422 */
VideoPixelI422 = 16,
}

/* enum_rendermodetype */
export enum RenderModeType {
/* enum_rendermodetype_RenderModeHidden */
RenderModeHidden = 1,
/* enum_rendermodetype_RenderModeFit */
RenderModeFit = 2,
/* enum_rendermodetype_RenderModeAdaptive */
RenderModeAdaptive = 3,
}

/* enum_eglcontexttype */
export enum EglContextType {
/* enum_eglcontexttype_EglContext10 */
EglContext10 = 0,
/* enum_eglcontexttype_EglContext14 */
EglContext14 = 1,
}

/* enum_videobuffertype */
export enum VideoBufferType {
/* enum_videobuffertype_VideoBufferRawData */
VideoBufferRawData = 1,
/* enum_videobuffertype_VideoBufferArray */
VideoBufferArray = 2,
/* enum_videobuffertype_VideoBufferTexture */
VideoBufferTexture = 3,
}

/* class_externalvideoframe */
export class ExternalVideoFrame {
  /* class_externalvideoframe_type */
  type?: VideoBufferType
  /* class_externalvideoframe_format */
  format?: VideoPixelFormat
  /* class_externalvideoframe_buffer */
  buffer?: Uint8Array
  /* class_externalvideoframe_stride */
  stride?: number
  /* class_externalvideoframe_height */
  height?: number
  /* class_externalvideoframe_cropLeft */
  cropLeft?: number
  /* class_externalvideoframe_cropTop */
  cropTop?: number
  /* class_externalvideoframe_cropRight */
  cropRight?: number
  /* class_externalvideoframe_cropBottom */
  cropBottom?: number
  /* class_externalvideoframe_rotation */
  rotation?: number
  /* class_externalvideoframe_timestamp */
  timestamp?: number
  /* class_externalvideoframe_eglType */
  eglType?: EglContextType
  /* class_externalvideoframe_textureId */
  textureId?: number
  /* class_externalvideoframe_matrix */
  matrix?: number[]
  /* class_externalvideoframe_metadata_buffer */
  metadata_buffer?: Uint8Array
  /* class_externalvideoframe_metadata_size */
  metadata_size?: number
}

/* class_videoframe */
export class VideoFrame {
  /* class_videoframe_type */
  type?: VideoPixelFormat
  /* class_videoframe_width */
  width?: number
  /* class_videoframe_height */
  height?: number
  /* class_videoframe_yStride */
  yStride?: number
  /* class_videoframe_uStride */
  uStride?: number
  /* class_videoframe_vStride */
  vStride?: number
  /* class_videoframe_yBuffer */
  yBuffer?: Uint8Array
  /* class_videoframe_uBuffer */
  uBuffer?: Uint8Array
  /* class_videoframe_vBuffer */
  vBuffer?: Uint8Array
  /* class_videoframe_rotation */
  rotation?: number
  /* class_videoframe_renderTimeMs */
  renderTimeMs?: number
  /* class_videoframe_avsync_type */
  avsync_type?: number
  /* class_videoframe_metadata_buffer */
  metadata_buffer?: Uint8Array
  /* class_videoframe_metadata_size */
  metadata_size?: number
  /* class_videoframe_textureId */
  textureId?: number
  /* class_videoframe_matrix */
  matrix?: number[]
  /* class_videoframe_alphaBuffer */
  alphaBuffer?: Uint8Array
}

/* enum_mediaplayersourcetype */
export enum MediaPlayerSourceType {
/* enum_mediaplayersourcetype_MediaPlayerSourceDefault */
MediaPlayerSourceDefault = 0,
/* enum_mediaplayersourcetype_MediaPlayerSourceFullFeatured */
MediaPlayerSourceFullFeatured = 1,
/* enum_mediaplayersourcetype_MediaPlayerSourceSimple */
MediaPlayerSourceSimple = 2,
}

/* enum_videomoduleposition */
export enum VideoModulePosition {
/* enum_videomoduleposition_PositionPostCapturer */
PositionPostCapturer = 1<<0,
/* enum_videomoduleposition_PositionPreRenderer */
PositionPreRenderer = 1<<1,
/* enum_videomoduleposition_PositionPreEncoder */
PositionPreEncoder = 1<<2,
}

/* enum_audioframetype */
export enum AudioFrameType {
/* enum_audioframetype_FrameTypePcm16 */
FrameTypePcm16 = 0,
}

/* class_audioframe */
export class AudioFrame {
  /* class_audioframe_type */
  type?: AudioFrameType
  /* class_audioframe_samplesPerChannel */
  samplesPerChannel?: number
  /* class_audioframe_bytesPerSample */
  bytesPerSample?: BytesPerSample
  /* class_audioframe_channels */
  channels?: number
  /* class_audioframe_samplesPerSec */
  samplesPerSec?: number
  /* class_audioframe_buffer */
  buffer?: Uint8Array
  /* class_audioframe_renderTimeMs */
  renderTimeMs?: number
  /* class_audioframe_avsync_type */
  avsync_type?: number
}

/* enum_audioframeposition */
export enum AudioFramePosition {
/* enum_audioframeposition_AudioFramePositionNone */
AudioFramePositionNone = 0x0000,
/* enum_audioframeposition_AudioFramePositionPlayback */
AudioFramePositionPlayback = 0x0001,
/* enum_audioframeposition_AudioFramePositionRecord */
AudioFramePositionRecord = 0x0002,
/* enum_audioframeposition_AudioFramePositionMixed */
AudioFramePositionMixed = 0x0004,
/* enum_audioframeposition_AudioFramePositionBeforeMixing */
AudioFramePositionBeforeMixing = 0x0008,
/* enum_audioframeposition_AudioFramePositionEarMonitoring */
AudioFramePositionEarMonitoring = 0x0010,
}

/* class_audioparams */
export class AudioParams {
  /* class_audioparams_sample_rate */
  sample_rate?: number
  /* class_audioparams_channels */
  channels?: number
  /* class_audioparams_mode */
  mode?: RawAudioFrameOpModeType
  /* class_audioparams_samples_per_call */
  samples_per_call?: number
}

/* class_iaudioframeobserverbase */
export interface IAudioFrameObserverBase {
  /* callback_iaudioframeobserverbase_onrecordaudioframe */
  onRecordAudioFrame?(channelId: string, audioFrame: AudioFrame): boolean;

  /* callback_iaudioframeobserverbase_onplaybackaudioframe */
  onPlaybackAudioFrame?(channelId: string, audioFrame: AudioFrame): boolean;

  /* callback_iaudioframeobserverbase_onmixedaudioframe */
  onMixedAudioFrame?(channelId: string, audioFrame: AudioFrame): boolean;

  /* callback_iaudioframeobserverbase_onearmonitoringaudioframe */
  onEarMonitoringAudioFrame?(audioFrame: AudioFrame): boolean;
}

/* class_iaudioframeobserver */
export interface IAudioFrameObserver extends IAudioFrameObserverBase {
  /* callback_iaudioframeobserver_onplaybackaudioframebeforemixing */
  onPlaybackAudioFrameBeforeMixing?(channelId: string, uid: number, audioFrame: AudioFrame): boolean;
}

/* class_audiospectrumdata */
export class AudioSpectrumData {
  /* class_audiospectrumdata_audioSpectrumData */
  audioSpectrumData?: number[]
  /* class_audiospectrumdata_dataLength */
  dataLength?: number
}

/* class_useraudiospectruminfo */
export class UserAudioSpectrumInfo {
  /* class_useraudiospectruminfo_uid */
  uid?: number
  /* class_useraudiospectruminfo_spectrumData */
  spectrumData?: AudioSpectrumData
}

/* class_iaudiospectrumobserver */
export interface IAudioSpectrumObserver {
  /* callback_iaudiospectrumobserver_onlocalaudiospectrum */
  onLocalAudioSpectrum?(data: AudioSpectrumData): boolean;

  /* callback_iaudiospectrumobserver_onremoteaudiospectrum */
  onRemoteAudioSpectrum?(spectrums: UserAudioSpectrumInfo[], spectrumNumber: number): boolean;
}

/* class_ivideoencodedframeobserver */
export interface IVideoEncodedFrameObserver {
  /* callback_ivideoencodedframeobserver_onencodedvideoframereceived */
  onEncodedVideoFrameReceived?(uid: number, imageBuffer: Uint8Array, length: number, videoEncodedFrameInfo: EncodedVideoFrameInfo): boolean;
}

/* enum_videoframeprocessmode */
export enum VideoFrameProcessMode {
/* enum_videoframeprocessmode_ProcessModeReadOnly */
ProcessModeReadOnly = 0,
/* enum_videoframeprocessmode_ProcessModeReadWrite */
ProcessModeReadWrite = 1,
}

/* class_ivideoframeobserver */
export interface IVideoFrameObserver {
  /* callback_ivideoframeobserver_oncapturevideoframe */
  onCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onpreencodevideoframe */
  onPreEncodeVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onsecondarycameracapturevideoframe */
  onSecondaryCameraCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onsecondarypreencodecameravideoframe */
  onSecondaryPreEncodeCameraVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onscreencapturevideoframe */
  onScreenCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onpreencodescreenvideoframe */
  onPreEncodeScreenVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onmediaplayervideoframe */
  onMediaPlayerVideoFrame?(videoFrame: VideoFrame, mediaPlayerId: number): boolean;

  /* callback_ivideoframeobserver_onsecondaryscreencapturevideoframe */
  onSecondaryScreenCaptureVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onsecondarypreencodescreenvideoframe */
  onSecondaryPreEncodeScreenVideoFrame?(videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_onrendervideoframe */
  onRenderVideoFrame?(channelId: string, remoteUid: number, videoFrame: VideoFrame): boolean;

  /* callback_ivideoframeobserver_ontranscodedvideoframe */
  onTranscodedVideoFrame?(videoFrame: VideoFrame): boolean;
}

/* enum_externalvideosourcetype */
export enum ExternalVideoSourceType {
/* enum_externalvideosourcetype_VideoFrame */
VideoFrame = 0,
/* enum_externalvideosourcetype_EncodedVideoFrame */
EncodedVideoFrame = 1,
}

/* enum_mediarecordercontainerformat */
export enum MediaRecorderContainerFormat {
/* enum_mediarecordercontainerformat_FormatMp4 */
FormatMp4 = 1,
}

/* enum_mediarecorderstreamtype */
export enum MediaRecorderStreamType {
/* enum_mediarecorderstreamtype_StreamTypeAudio */
StreamTypeAudio = 0x01,
/* enum_mediarecorderstreamtype_StreamTypeVideo */
StreamTypeVideo = 0x02,
/* enum_mediarecorderstreamtype_StreamTypeBoth */
StreamTypeBoth = 0x01|0x02,
}

/* enum_recorderstate */
export enum RecorderState {
/* enum_recorderstate_RecorderStateError */
RecorderStateError = -1,
/* enum_recorderstate_RecorderStateStart */
RecorderStateStart = 2,
/* enum_recorderstate_RecorderStateStop */
RecorderStateStop = 3,
}

/* enum_recordererrorcode */
export enum RecorderErrorCode {
/* enum_recordererrorcode_RecorderErrorNone */
RecorderErrorNone = 0,
/* enum_recordererrorcode_RecorderErrorWriteFailed */
RecorderErrorWriteFailed = 1,
/* enum_recordererrorcode_RecorderErrorNoStream */
RecorderErrorNoStream = 2,
/* enum_recordererrorcode_RecorderErrorOverMaxDuration */
RecorderErrorOverMaxDuration = 3,
/* enum_recordererrorcode_RecorderErrorConfigChanged */
RecorderErrorConfigChanged = 4,
}

/* class_mediarecorderconfiguration */
export class MediaRecorderConfiguration {
  /* class_mediarecorderconfiguration_storagePath */
  storagePath?: string
  /* class_mediarecorderconfiguration_containerFormat */
  containerFormat?: MediaRecorderContainerFormat
  /* class_mediarecorderconfiguration_streamType */
  streamType?: MediaRecorderStreamType
  /* class_mediarecorderconfiguration_maxDurationMs */
  maxDurationMs?: number
  /* class_mediarecorderconfiguration_recorderInfoUpdateInterval */
  recorderInfoUpdateInterval?: number
}

/* class_recorderinfo */
export class RecorderInfo {
  /* class_recorderinfo_fileName */
  fileName?: string
  /* class_recorderinfo_durationMs */
  durationMs?: number
  /* class_recorderinfo_fileSize */
  fileSize?: number
}

/* class_imediarecorderobserver */
export interface IMediaRecorderObserver {
  /* callback_imediarecorderobserver_onrecorderstatechanged */
  onRecorderStateChanged?(state: RecorderState, error: RecorderErrorCode): void;

  /* callback_imediarecorderobserver_onrecorderinfoupdated */
  onRecorderInfoUpdated?(info: RecorderInfo): void;
}
