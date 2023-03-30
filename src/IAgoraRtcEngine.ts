import './extension/IAgoraRtcEngineExtension';
/* enum_mediadevicetype */
export enum MediaDeviceType {
/* enum_mediadevicetype_UnknownAudioDevice */
UnknownAudioDevice = -1,
/* enum_mediadevicetype_AudioPlayoutDevice */
AudioPlayoutDevice = 0,
/* enum_mediadevicetype_AudioRecordingDevice */
AudioRecordingDevice = 1,
/* enum_mediadevicetype_VideoRenderDevice */
VideoRenderDevice = 2,
/* enum_mediadevicetype_VideoCaptureDevice */
VideoCaptureDevice = 3,
/* enum_mediadevicetype_AudioApplicationPlayoutDevice */
AudioApplicationPlayoutDevice = 4,
}

/* enum_audiomixingstatetype */
export enum AudioMixingStateType {
/* enum_audiomixingstatetype_AudioMixingStatePlaying */
AudioMixingStatePlaying = 710,
/* enum_audiomixingstatetype_AudioMixingStatePaused */
AudioMixingStatePaused = 711,
/* enum_audiomixingstatetype_AudioMixingStateStopped */
AudioMixingStateStopped = 713,
/* enum_audiomixingstatetype_AudioMixingStateFailed */
AudioMixingStateFailed = 714,
}

/* enum_audiomixingreasontype */
export enum AudioMixingReasonType {
/* enum_audiomixingreasontype_AudioMixingReasonCanNotOpen */
AudioMixingReasonCanNotOpen = 701,
/* enum_audiomixingreasontype_AudioMixingReasonTooFrequentCall */
AudioMixingReasonTooFrequentCall = 702,
/* enum_audiomixingreasontype_AudioMixingReasonInterruptedEof */
AudioMixingReasonInterruptedEof = 703,
/* enum_audiomixingreasontype_AudioMixingReasonOneLoopCompleted */
AudioMixingReasonOneLoopCompleted = 721,
/* enum_audiomixingreasontype_AudioMixingReasonAllLoopsCompleted */
AudioMixingReasonAllLoopsCompleted = 723,
/* enum_audiomixingreasontype_AudioMixingReasonStoppedByUser */
AudioMixingReasonStoppedByUser = 724,
/* enum_audiomixingreasontype_AudioMixingReasonOk */
AudioMixingReasonOk = 0,
}

/* enum_injectstreamstatus */
export enum InjectStreamStatus {
/* enum_injectstreamstatus_InjectStreamStatusStartSuccess */
InjectStreamStatusStartSuccess = 0,
/* enum_injectstreamstatus_InjectStreamStatusStartAlreadyExists */
InjectStreamStatusStartAlreadyExists = 1,
/* enum_injectstreamstatus_InjectStreamStatusStartUnauthorized */
InjectStreamStatusStartUnauthorized = 2,
/* enum_injectstreamstatus_InjectStreamStatusStartTimedout */
InjectStreamStatusStartTimedout = 3,
/* enum_injectstreamstatus_InjectStreamStatusStartFailed */
InjectStreamStatusStartFailed = 4,
/* enum_injectstreamstatus_InjectStreamStatusStopSuccess */
InjectStreamStatusStopSuccess = 5,
/* enum_injectstreamstatus_InjectStreamStatusStopNotFound */
InjectStreamStatusStopNotFound = 6,
/* enum_injectstreamstatus_InjectStreamStatusStopUnauthorized */
InjectStreamStatusStopUnauthorized = 7,
/* enum_injectstreamstatus_InjectStreamStatusStopTimedout */
InjectStreamStatusStopTimedout = 8,
/* enum_injectstreamstatus_InjectStreamStatusStopFailed */
InjectStreamStatusStopFailed = 9,
/* enum_injectstreamstatus_InjectStreamStatusBroken */
InjectStreamStatusBroken = 10,
}

/* enum_audioequalizationbandfrequency */
export enum AudioEqualizationBandFrequency {
/* enum_audioequalizationbandfrequency_AudioEqualizationBand31 */
AudioEqualizationBand31 = 0,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand62 */
AudioEqualizationBand62 = 1,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand125 */
AudioEqualizationBand125 = 2,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand250 */
AudioEqualizationBand250 = 3,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand500 */
AudioEqualizationBand500 = 4,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand1k */
AudioEqualizationBand1k = 5,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand2k */
AudioEqualizationBand2k = 6,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand4k */
AudioEqualizationBand4k = 7,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand8k */
AudioEqualizationBand8k = 8,
/* enum_audioequalizationbandfrequency_AudioEqualizationBand16k */
AudioEqualizationBand16k = 9,
}

/* enum_audioreverbtype */
export enum AudioReverbType {
/* enum_audioreverbtype_AudioReverbDryLevel */
AudioReverbDryLevel = 0,
/* enum_audioreverbtype_AudioReverbWetLevel */
AudioReverbWetLevel = 1,
/* enum_audioreverbtype_AudioReverbRoomSize */
AudioReverbRoomSize = 2,
/* enum_audioreverbtype_AudioReverbWetDelay */
AudioReverbWetDelay = 3,
/* enum_audioreverbtype_AudioReverbStrength */
AudioReverbStrength = 4,
}

/* enum_streamfallbackoptions */
export enum StreamFallbackOptions {
/* enum_streamfallbackoptions_StreamFallbackOptionDisabled */
StreamFallbackOptionDisabled = 0,
/* enum_streamfallbackoptions_StreamFallbackOptionVideoStreamLow */
StreamFallbackOptionVideoStreamLow = 1,
/* enum_streamfallbackoptions_StreamFallbackOptionAudioOnly */
StreamFallbackOptionAudioOnly = 2,
}

/* enum_prioritytype */
export enum PriorityType {
/* enum_prioritytype_PriorityHigh */
PriorityHigh = 50,
/* enum_prioritytype_PriorityNormal */
PriorityNormal = 100,
}

/* class_localvideostats */
export class LocalVideoStats {
  /* class_localvideostats_uid */
  uid?: number
  /* class_localvideostats_sentBitrate */
  sentBitrate?: number
  /* class_localvideostats_sentFrameRate */
  sentFrameRate?: number
  /* class_localvideostats_captureFrameRate */
  captureFrameRate?: number
  /* class_localvideostats_captureFrameWidth */
  captureFrameWidth?: number
  /* class_localvideostats_captureFrameHeight */
  captureFrameHeight?: number
  /* class_localvideostats_regulatedCaptureFrameRate */
  regulatedCaptureFrameRate?: number
  /* class_localvideostats_regulatedCaptureFrameWidth */
  regulatedCaptureFrameWidth?: number
  /* class_localvideostats_regulatedCaptureFrameHeight */
  regulatedCaptureFrameHeight?: number
  /* class_localvideostats_encoderOutputFrameRate */
  encoderOutputFrameRate?: number
  /* class_localvideostats_encodedFrameWidth */
  encodedFrameWidth?: number
  /* class_localvideostats_encodedFrameHeight */
  encodedFrameHeight?: number
  /* class_localvideostats_rendererOutputFrameRate */
  rendererOutputFrameRate?: number
  /* class_localvideostats_targetBitrate */
  targetBitrate?: number
  /* class_localvideostats_targetFrameRate */
  targetFrameRate?: number
  /* class_localvideostats_qualityAdaptIndication */
  qualityAdaptIndication?: QualityAdaptIndication
  /* class_localvideostats_encodedBitrate */
  encodedBitrate?: number
  /* class_localvideostats_encodedFrameCount */
  encodedFrameCount?: number
  /* class_localvideostats_codecType */
  codecType?: VideoCodecType
  /* class_localvideostats_txPacketLossRate */
  txPacketLossRate?: number
  /* class_localvideostats_captureBrightnessLevel */
  captureBrightnessLevel?: CaptureBrightnessLevelType
  /* class_localvideostats_dualStreamEnabled */
  dualStreamEnabled?: boolean
  /* class_localvideostats_hwEncoderAccelerating */
  hwEncoderAccelerating?: number
}

/* class_remotevideostats */
export class RemoteVideoStats {
  /* class_remotevideostats_uid */
  uid?: number
  /* class_remotevideostats_delay */
  delay?: number
  /* class_remotevideostats_width */
  width?: number
  /* class_remotevideostats_height */
  height?: number
  /* class_remotevideostats_receivedBitrate */
  receivedBitrate?: number
  /* class_remotevideostats_decoderOutputFrameRate */
  decoderOutputFrameRate?: number
  /* class_remotevideostats_rendererOutputFrameRate */
  rendererOutputFrameRate?: number
  /* class_remotevideostats_frameLossRate */
  frameLossRate?: number
  /* class_remotevideostats_packetLossRate */
  packetLossRate?: number
  /* class_remotevideostats_rxStreamType */
  rxStreamType?: VideoStreamType
  /* class_remotevideostats_totalFrozenTime */
  totalFrozenTime?: number
  /* class_remotevideostats_frozenRate */
  frozenRate?: number
  /* class_remotevideostats_avSyncTimeMs */
  avSyncTimeMs?: number
  /* class_remotevideostats_totalActiveTime */
  totalActiveTime?: number
  /* class_remotevideostats_publishDuration */
  publishDuration?: number
  /* class_remotevideostats_superResolutionType */
  superResolutionType?: number
  /* class_remotevideostats_mosValue */
  mosValue?: number
}

/* class_region */
export class Region {
  /* class_region_uid */
  uid?: number
  /* class_region_x */
  x?: number
  /* class_region_y */
  y?: number
  /* class_region_width */
  width?: number
  /* class_region_height */
  height?: number
  /* class_region_zOrder */
  zOrder?: number
  /* class_region_alpha */
  alpha?: number
  /* class_region_renderMode */
  renderMode?: RenderModeType
}

/* class_videocompositinglayout */
export class VideoCompositingLayout {
  /* class_videocompositinglayout_canvasWidth */
  canvasWidth?: number
  /* class_videocompositinglayout_canvasHeight */
  canvasHeight?: number
  /* class_videocompositinglayout_backgroundColor */
  backgroundColor?: string
  /* class_videocompositinglayout_regions */
  regions?: Region[]
  /* class_videocompositinglayout_regionCount */
  regionCount?: number
  /* class_videocompositinglayout_appData */
  appData?: Uint8Array
  /* class_videocompositinglayout_appDataLength */
  appDataLength?: number
}

/* class_injectstreamconfig */
export class InjectStreamConfig {
  /* class_injectstreamconfig_width */
  width?: number
  /* class_injectstreamconfig_height */
  height?: number
  /* class_injectstreamconfig_videoGop */
  videoGop?: number
  /* class_injectstreamconfig_videoFramerate */
  videoFramerate?: number
  /* class_injectstreamconfig_videoBitrate */
  videoBitrate?: number
  /* class_injectstreamconfig_audioSampleRate */
  audioSampleRate?: AudioSampleRateType
  /* class_injectstreamconfig_audioBitrate */
  audioBitrate?: number
  /* class_injectstreamconfig_audioChannels */
  audioChannels?: number
}

/* enum_rtmpstreamlifecycletype */
export enum RtmpStreamLifeCycleType {
/* enum_rtmpstreamlifecycletype_RtmpStreamLifeCycleBind2channel */
RtmpStreamLifeCycleBind2channel = 1,
/* enum_rtmpstreamlifecycletype_RtmpStreamLifeCycleBind2owner */
RtmpStreamLifeCycleBind2owner = 2,
}

/* class_publisherconfiguration */
export class PublisherConfiguration {
  /* class_publisherconfiguration_width */
  width?: number
  /* class_publisherconfiguration_height */
  height?: number
  /* class_publisherconfiguration_framerate */
  framerate?: number
  /* class_publisherconfiguration_bitrate */
  bitrate?: number
  /* class_publisherconfiguration_defaultLayout */
  defaultLayout?: number
  /* class_publisherconfiguration_lifecycle */
  lifecycle?: number
  /* class_publisherconfiguration_owner */
  owner?: boolean
  /* class_publisherconfiguration_injectStreamWidth */
  injectStreamWidth?: number
  /* class_publisherconfiguration_injectStreamHeight */
  injectStreamHeight?: number
  /* class_publisherconfiguration_injectStreamUrl */
  injectStreamUrl?: string
  /* class_publisherconfiguration_publishUrl */
  publishUrl?: string
  /* class_publisherconfiguration_rawStreamUrl */
  rawStreamUrl?: string
  /* class_publisherconfiguration_extraInfo */
  extraInfo?: string
}

/* class_audiotrackconfig */
export class AudioTrackConfig {
  /* class_audiotrackconfig_enableLocalPlayback */
  enableLocalPlayback?: boolean
}

/* enum_cameradirection */
export enum CameraDirection {
/* enum_cameradirection_CameraRear */
CameraRear = 0,
/* enum_cameradirection_CameraFront */
CameraFront = 1,
}

/* enum_cloudproxytype */
export enum CloudProxyType {
/* enum_cloudproxytype_NoneProxy */
NoneProxy = 0,
/* enum_cloudproxytype_UdpProxy */
UdpProxy = 1,
/* enum_cloudproxytype_TcpProxy */
TcpProxy = 2,
}

/* class_cameracapturerconfiguration */
export class CameraCapturerConfiguration {
  /* class_cameracapturerconfiguration_cameraDirection */
  cameraDirection?: CameraDirection
  /* class_cameracapturerconfiguration_deviceId */
  deviceId?: string
  /* class_cameracapturerconfiguration_format */
  format?: VideoFormat
  /* class_cameracapturerconfiguration_followEncodeDimensionRatio */
  followEncodeDimensionRatio?: boolean
}

/* class_screencaptureconfiguration */
export class ScreenCaptureConfiguration {
  /* class_screencaptureconfiguration_isCaptureWindow */
  isCaptureWindow?: boolean
  /* class_screencaptureconfiguration_displayId */
  displayId?: number
  /* class_screencaptureconfiguration_screenRect */
  screenRect?: Rectangle
  /* class_screencaptureconfiguration_windowId */
  windowId?: any
  /* class_screencaptureconfiguration_params */
  params?: ScreenCaptureParameters
  /* class_screencaptureconfiguration_regionRect */
  regionRect?: Rectangle
}

/* class_size */
export class Size {
  /* class_size_width */
  width?: number
  /* class_size_height */
  height?: number
}

/* class_thumbimagebuffer */
export class ThumbImageBuffer {
  /* class_thumbimagebuffer_buffer */
  buffer?: Uint8Array
  /* class_thumbimagebuffer_length */
  length?: number
  /* class_thumbimagebuffer_width */
  width?: number
  /* class_thumbimagebuffer_height */
  height?: number
}

/* enum_screencapturesourcetype */
export enum ScreenCaptureSourceType {
/* enum_screencapturesourcetype_ScreencapturesourcetypeUnknown */
ScreencapturesourcetypeUnknown = -1,
/* enum_screencapturesourcetype_ScreencapturesourcetypeWindow */
ScreencapturesourcetypeWindow = 0,
/* enum_screencapturesourcetype_ScreencapturesourcetypeScreen */
ScreencapturesourcetypeScreen = 1,
/* enum_screencapturesourcetype_ScreencapturesourcetypeCustom */
ScreencapturesourcetypeCustom = 2,
}

/* class_screencapturesourceinfo */
export class ScreenCaptureSourceInfo {
  /* class_screencapturesourceinfo_type */
  type?: ScreenCaptureSourceType
  /* class_screencapturesourceinfo_sourceId */
  sourceId?: any
  /* class_screencapturesourceinfo_sourceName */
  sourceName?: string
  /* class_screencapturesourceinfo_thumbImage */
  thumbImage?: ThumbImageBuffer
  /* class_screencapturesourceinfo_iconImage */
  iconImage?: ThumbImageBuffer
  /* class_screencapturesourceinfo_processPath */
  processPath?: string
  /* class_screencapturesourceinfo_sourceTitle */
  sourceTitle?: string
  /* class_screencapturesourceinfo_primaryMonitor */
  primaryMonitor?: boolean
  /* class_screencapturesourceinfo_isOccluded */
  isOccluded?: boolean
  /* class_screencapturesourceinfo_minimizeWindow */
  minimizeWindow?: boolean
}

/* class_advancedaudiooptions */
export class AdvancedAudioOptions {
  /* class_advancedaudiooptions_audioProcessingChannels */
  audioProcessingChannels?: number
}

/* class_imagetrackoptions */
export class ImageTrackOptions {
  /* class_imagetrackoptions_imageUrl */
  imageUrl?: string
  /* class_imagetrackoptions_fps */
  fps?: number
  /* class_imagetrackoptions_mirrorMode */
  mirrorMode?: VideoMirrorModeType
}

/* class_channelmediaoptions */
export class ChannelMediaOptions {
  /* class_channelmediaoptions_publishCameraTrack */
  publishCameraTrack?: boolean
  /* class_channelmediaoptions_publishSecondaryCameraTrack */
  publishSecondaryCameraTrack?: boolean
  /* class_channelmediaoptions_publishMicrophoneTrack */
  publishMicrophoneTrack?: boolean
  /* class_channelmediaoptions_publishScreenCaptureVideo */
  publishScreenCaptureVideo?: boolean
  /* class_channelmediaoptions_publishScreenCaptureAudio */
  publishScreenCaptureAudio?: boolean
  /* class_channelmediaoptions_publishScreenTrack */
  publishScreenTrack?: boolean
  /* class_channelmediaoptions_publishSecondaryScreenTrack */
  publishSecondaryScreenTrack?: boolean
  /* class_channelmediaoptions_publishCustomAudioTrack */
  publishCustomAudioTrack?: boolean
  /* class_channelmediaoptions_publishCustomAudioSourceId */
  publishCustomAudioSourceId?: number
  /* class_channelmediaoptions_publishCustomAudioTrackEnableAec */
  publishCustomAudioTrackEnableAec?: boolean
  /* class_channelmediaoptions_publishDirectCustomAudioTrack */
  publishDirectCustomAudioTrack?: boolean
  /* class_channelmediaoptions_publishCustomAudioTrackAec */
  publishCustomAudioTrackAec?: boolean
  /* class_channelmediaoptions_publishCustomVideoTrack */
  publishCustomVideoTrack?: boolean
  /* class_channelmediaoptions_publishEncodedVideoTrack */
  publishEncodedVideoTrack?: boolean
  /* class_channelmediaoptions_publishMediaPlayerAudioTrack */
  publishMediaPlayerAudioTrack?: boolean
  /* class_channelmediaoptions_publishMediaPlayerVideoTrack */
  publishMediaPlayerVideoTrack?: boolean
  /* class_channelmediaoptions_publishTrancodedVideoTrack */
  publishTrancodedVideoTrack?: boolean
  /* class_channelmediaoptions_autoSubscribeAudio */
  autoSubscribeAudio?: boolean
  /* class_channelmediaoptions_autoSubscribeVideo */
  autoSubscribeVideo?: boolean
  /* class_channelmediaoptions_enableAudioRecordingOrPlayout */
  enableAudioRecordingOrPlayout?: boolean
  /* class_channelmediaoptions_publishMediaPlayerId */
  publishMediaPlayerId?: number
  /* class_channelmediaoptions_clientRoleType */
  clientRoleType?: ClientRoleType
  /* class_channelmediaoptions_audienceLatencyLevel */
  audienceLatencyLevel?: AudienceLatencyLevelType
  /* class_channelmediaoptions_defaultVideoStreamType */
  defaultVideoStreamType?: VideoStreamType
  /* class_channelmediaoptions_channelProfile */
  channelProfile?: ChannelProfileType
  /* class_channelmediaoptions_audioDelayMs */
  audioDelayMs?: number
  /* class_channelmediaoptions_mediaPlayerAudioDelayMs */
  mediaPlayerAudioDelayMs?: number
  /* class_channelmediaoptions_token */
  token?: string
  /* class_channelmediaoptions_enableBuiltInMediaEncryption */
  enableBuiltInMediaEncryption?: boolean
  /* class_channelmediaoptions_publishRhythmPlayerTrack */
  publishRhythmPlayerTrack?: boolean
  /* class_channelmediaoptions_isInteractiveAudience */
  isInteractiveAudience?: boolean
  /* class_channelmediaoptions_customVideoTrackId */
  customVideoTrackId?: number
  /* class_channelmediaoptions_isAudioFilterable */
  isAudioFilterable?: boolean
}

/* enum_localproxymode */
export enum LocalProxyMode {
/* enum_localproxymode_ConnectivityFirst */
ConnectivityFirst = 0,
/* enum_localproxymode_LocalOnly */
LocalOnly = 1,
}

/* enum_proxytype */
export enum ProxyType {
/* enum_proxytype_NoneProxyType */
NoneProxyType = 0,
/* enum_proxytype_UdpProxyType */
UdpProxyType = 1,
/* enum_proxytype_TcpProxyType */
TcpProxyType = 2,
/* enum_proxytype_LocalProxyType */
LocalProxyType = 3,
/* enum_proxytype_TcpProxyAutoFallbackType */
TcpProxyAutoFallbackType = 4,
}

/* class_loguploadserverinfo */
export class LogUploadServerInfo {
  /* class_loguploadserverinfo_serverDomain */
  serverDomain?: string
  /* class_loguploadserverinfo_serverPath */
  serverPath?: string
  /* class_loguploadserverinfo_serverPort */
  serverPort?: number
  /* class_loguploadserverinfo_serverHttps */
  serverHttps?: boolean
}

/* class_advancedconfiginfo */
export class AdvancedConfigInfo {
  /* class_advancedconfiginfo_logUploadServer */
  logUploadServer?: LogUploadServerInfo
}

/* class_localaccesspointconfiguration */
export class LocalAccessPointConfiguration {
  /* class_localaccesspointconfiguration_ipList */
  ipList?: string[]
  /* class_localaccesspointconfiguration_ipListSize */
  ipListSize?: number
  /* class_localaccesspointconfiguration_domainList */
  domainList?: string[]
  /* class_localaccesspointconfiguration_domainListSize */
  domainListSize?: number
  /* class_localaccesspointconfiguration_verifyDomainName */
  verifyDomainName?: string
  /* class_localaccesspointconfiguration_mode */
  mode?: LocalProxyMode
  /* class_localaccesspointconfiguration_advancedConfig */
  advancedConfig?: AdvancedConfigInfo
}

/* class_leavechanneloptions */
export class LeaveChannelOptions {
  /* class_leavechanneloptions_stopAudioMixing */
  stopAudioMixing?: boolean
  /* class_leavechanneloptions_stopAllEffect */
  stopAllEffect?: boolean
  /* class_leavechanneloptions_stopMicrophoneRecording */
  stopMicrophoneRecording?: boolean
}

/* class_irtcengineeventhandler */
export interface IRtcEngineEventHandler {
  /* callback_irtcengineeventhandler_onjoinchannelsuccess */
  onJoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /* callback_irtcengineeventhandler_onrejoinchannelsuccess */
  onRejoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /* callback_irtcengineeventhandler_onproxyconnected */
  onProxyConnected?(channel: string, uid: number, proxyType: ProxyType, localProxyIp: string, elapsed: number): void;

  /* callback_irtcengineeventhandler_onerror */
  onError?(err: ErrorCodeType, msg: string): void;

  /* callback_irtcengineeventhandler_onaudioquality */
  onAudioQuality?(connection: RtcConnection, remoteUid: number, quality: QualityType, delay: number, lost: number): void;

  /* callback_irtcengineeventhandler_onlastmileproberesult */
  onLastmileProbeResult?(result: LastmileProbeResult): void;

  /* callback_irtcengineeventhandler_onaudiovolumeindication */
  onAudioVolumeIndication?(connection: RtcConnection, speakers: AudioVolumeInfo[], speakerNumber: number, totalVolume: number): void;

  /* callback_irtcengineeventhandler_onleavechannel */
  onLeaveChannel?(connection: RtcConnection, stats: RtcStats): void;

  /* callback_irtcengineeventhandler_onrtcstats */
  onRtcStats?(connection: RtcConnection, stats: RtcStats): void;

  /* callback_irtcengineeventhandler_onaudiodevicestatechanged */
  onAudioDeviceStateChanged?(deviceId: string, deviceType: MediaDeviceType, deviceState: MediaDeviceStateType): void;

  /* callback_irtcengineeventhandler_onaudiomixingpositionchanged */
  onAudioMixingPositionChanged?(position: number): void;

  /* callback_irtcengineeventhandler_onaudiomixingfinished */
  onAudioMixingFinished?(): void;

  /* callback_irtcengineeventhandler_onaudioeffectfinished */
  onAudioEffectFinished?(soundId: number): void;

  /* callback_irtcengineeventhandler_onvideodevicestatechanged */
  onVideoDeviceStateChanged?(deviceId: string, deviceType: MediaDeviceType, deviceState: MediaDeviceStateType): void;

  /* callback_irtcengineeventhandler_onnetworkquality */
  onNetworkQuality?(connection: RtcConnection, remoteUid: number, txQuality: QualityType, rxQuality: QualityType): void;

  /* callback_irtcengineeventhandler_onintrarequestreceived */
  onIntraRequestReceived?(connection: RtcConnection): void;

  /* callback_irtcengineeventhandler_onuplinknetworkinfoupdated */
  onUplinkNetworkInfoUpdated?(info: UplinkNetworkInfo): void;

  /* callback_irtcengineeventhandler_ondownlinknetworkinfoupdated */
  onDownlinkNetworkInfoUpdated?(info: DownlinkNetworkInfo): void;

  /* callback_irtcengineeventhandler_onlastmilequality */
  onLastmileQuality?(quality: QualityType): void;

  /* callback_irtcengineeventhandler_onfirstlocalvideoframe */
  onFirstLocalVideoFrame?(connection: RtcConnection, width: number, height: number, elapsed: number): void;

  /* callback_irtcengineeventhandler_onfirstlocalvideoframepublished */
  onFirstLocalVideoFramePublished?(connection: RtcConnection, elapsed: number): void;

  /* callback_irtcengineeventhandler_onfirstremotevideodecoded */
  onFirstRemoteVideoDecoded?(connection: RtcConnection, remoteUid: number, width: number, height: number, elapsed: number): void;

  /* callback_irtcengineeventhandler_onvideosizechanged */
  onVideoSizeChanged?(connection: RtcConnection, sourceType: VideoSourceType, uid: number, width: number, height: number, rotation: number): void;

  /* callback_irtcengineeventhandler_onlocalvideostatechanged */
  onLocalVideoStateChanged?(source: VideoSourceType, state: LocalVideoStreamState, error: LocalVideoStreamError): void;

  /* callback_irtcengineeventhandler_onremotevideostatechanged */
  onRemoteVideoStateChanged?(connection: RtcConnection, remoteUid: number, state: RemoteVideoState, reason: RemoteVideoStateReason, elapsed: number): void;

  /* callback_irtcengineeventhandler_onfirstremotevideoframe */
  onFirstRemoteVideoFrame?(connection: RtcConnection, remoteUid: number, width: number, height: number, elapsed: number): void;

  /* callback_irtcengineeventhandler_onuserjoined */
  onUserJoined?(connection: RtcConnection, remoteUid: number, elapsed: number): void;

  /* callback_irtcengineeventhandler_onuseroffline */
  onUserOffline?(connection: RtcConnection, remoteUid: number, reason: UserOfflineReasonType): void;

  /* callback_irtcengineeventhandler_onusermuteaudio */
  onUserMuteAudio?(connection: RtcConnection, remoteUid: number, muted: boolean): void;

  /* callback_irtcengineeventhandler_onusermutevideo */
  onUserMuteVideo?(connection: RtcConnection, remoteUid: number, muted: boolean): void;

  /* callback_irtcengineeventhandler_onuserenablevideo */
  onUserEnableVideo?(connection: RtcConnection, remoteUid: number, enabled: boolean): void;

  /* callback_irtcengineeventhandler_onuserstatechanged */
  onUserStateChanged?(connection: RtcConnection, remoteUid: number, state: number): void;

  /* callback_irtcengineeventhandler_onuserenablelocalvideo */
  onUserEnableLocalVideo?(connection: RtcConnection, remoteUid: number, enabled: boolean): void;

  /* callback_irtcengineeventhandler_onapicallexecuted */
  onApiCallExecuted?(err: ErrorCodeType, api: string, result: string): void;

  /* callback_irtcengineeventhandler_onlocalaudiostats */
  onLocalAudioStats?(connection: RtcConnection, stats: LocalAudioStats): void;

  /* callback_irtcengineeventhandler_onremoteaudiostats */
  onRemoteAudioStats?(connection: RtcConnection, stats: RemoteAudioStats): void;

  /* callback_irtcengineeventhandler_onlocalvideostats */
  onLocalVideoStats?(connection: RtcConnection, stats: LocalVideoStats): void;

  /* callback_irtcengineeventhandler_onremotevideostats */
  onRemoteVideoStats?(connection: RtcConnection, stats: RemoteVideoStats): void;

  /* callback_irtcengineeventhandler_oncameraready */
  onCameraReady?(): void;

  /* callback_irtcengineeventhandler_oncamerafocusareachanged */
  onCameraFocusAreaChanged?(x: number, y: number, width: number, height: number): void;

  /* callback_irtcengineeventhandler_oncameraexposureareachanged */
  onCameraExposureAreaChanged?(x: number, y: number, width: number, height: number): void;

  /* callback_irtcengineeventhandler_onfacepositionchanged */
  onFacePositionChanged?(imageWidth: number, imageHeight: number, vecRectangle: Rectangle[], vecDistance: number[], numFaces: number): void;

  /* callback_irtcengineeventhandler_onvideostopped */
  onVideoStopped?(): void;

  /* callback_irtcengineeventhandler_onaudiomixingstatechanged */
  onAudioMixingStateChanged?(state: AudioMixingStateType, reason: AudioMixingReasonType): void;

  /* callback_irtcengineeventhandler_onrhythmplayerstatechanged */
  onRhythmPlayerStateChanged?(state: RhythmPlayerStateType, errorCode: RhythmPlayerErrorType): void;

  /* callback_irtcengineeventhandler_onconnectionlost */
  onConnectionLost?(connection: RtcConnection): void;

  /* callback_irtcengineeventhandler_onconnectioninterrupted */
  onConnectionInterrupted?(connection: RtcConnection): void;

  /* callback_irtcengineeventhandler_onconnectionbanned */
  onConnectionBanned?(connection: RtcConnection): void;

  /* callback_irtcengineeventhandler_onstreammessage */
  onStreamMessage?(connection: RtcConnection, remoteUid: number, streamId: number, data: Uint8Array, length: number, sentTs: number): void;

  /* callback_irtcengineeventhandler_onstreammessageerror */
  onStreamMessageError?(connection: RtcConnection, remoteUid: number, streamId: number, code: ErrorCodeType, missed: number, cached: number): void;

  /* callback_irtcengineeventhandler_onrequesttoken */
  onRequestToken?(connection: RtcConnection): void;

  /* callback_irtcengineeventhandler_ontokenprivilegewillexpire */
  onTokenPrivilegeWillExpire?(connection: RtcConnection, token: string): void;

  /* callback_irtcengineeventhandler_onlicensevalidationfailure */
  onLicenseValidationFailure?(connection: RtcConnection, reason: LicenseErrorType): void;

  /* callback_irtcengineeventhandler_onfirstlocalaudioframepublished */
  onFirstLocalAudioFramePublished?(connection: RtcConnection, elapsed: number): void;

  /* callback_irtcengineeventhandler_onfirstremoteaudioframe */
  onFirstRemoteAudioFrame?(connection: RtcConnection, userId: number, elapsed: number): void;

  /* callback_irtcengineeventhandler_onfirstremoteaudiodecoded */
  onFirstRemoteAudioDecoded?(connection: RtcConnection, uid: number, elapsed: number): void;

  /* callback_irtcengineeventhandler_onlocalaudiostatechanged */
  onLocalAudioStateChanged?(connection: RtcConnection, state: LocalAudioStreamState, error: LocalAudioStreamError): void;

  /* callback_irtcengineeventhandler_onremoteaudiostatechanged */
  onRemoteAudioStateChanged?(connection: RtcConnection, remoteUid: number, state: RemoteAudioState, reason: RemoteAudioStateReason, elapsed: number): void;

  /* callback_irtcengineeventhandler_onactivespeaker */
  onActiveSpeaker?(connection: RtcConnection, uid: number): void;

  /* callback_irtcengineeventhandler_oncontentinspectresult */
  onContentInspectResult?(result: ContentInspectResult): void;

  /* callback_irtcengineeventhandler_onsnapshottaken */
  onSnapshotTaken?(connection: RtcConnection, uid: number, filePath: string, width: number, height: number, errCode: number): void;

  /* callback_irtcengineeventhandler_onclientrolechanged */
  onClientRoleChanged?(connection: RtcConnection, oldRole: ClientRoleType, newRole: ClientRoleType, newRoleOptions: ClientRoleOptions): void;

  /* callback_irtcengineeventhandler_onclientrolechangefailed */
  onClientRoleChangeFailed?(connection: RtcConnection, reason: ClientRoleChangeFailedReason, currentRole: ClientRoleType): void;

  /* callback_irtcengineeventhandler_onaudiodevicevolumechanged */
  onAudioDeviceVolumeChanged?(deviceType: MediaDeviceType, volume: number, muted: boolean): void;

  /* callback_irtcengineeventhandler_onrtmpstreamingstatechanged */
  onRtmpStreamingStateChanged?(url: string, state: RtmpStreamPublishState, errCode: RtmpStreamPublishErrorType): void;

  /* callback_irtcengineeventhandler_onrtmpstreamingevent */
  onRtmpStreamingEvent?(url: string, eventCode: RtmpStreamingEvent): void;

  /* callback_irtcengineeventhandler_ontranscodingupdated */
  onTranscodingUpdated?(): void;

  /* callback_irtcengineeventhandler_onaudioroutingchanged */
  onAudioRoutingChanged?(routing: number): void;

  /* callback_irtcengineeventhandler_onchannelmediarelaystatechanged */
  onChannelMediaRelayStateChanged?(state: ChannelMediaRelayState, code: ChannelMediaRelayError): void;

  /* callback_irtcengineeventhandler_onchannelmediarelayevent */
  onChannelMediaRelayEvent?(code: ChannelMediaRelayEvent): void;

  /* callback_irtcengineeventhandler_onlocalpublishfallbacktoaudioonly */
  onLocalPublishFallbackToAudioOnly?(isFallbackOrRecover: boolean): void;

  /* callback_irtcengineeventhandler_onremotesubscribefallbacktoaudioonly */
  onRemoteSubscribeFallbackToAudioOnly?(uid: number, isFallbackOrRecover: boolean): void;

  /* callback_irtcengineeventhandler_onremoteaudiotransportstats */
  onRemoteAudioTransportStats?(connection: RtcConnection, remoteUid: number, delay: number, lost: number, rxKBitRate: number): void;

  /* callback_irtcengineeventhandler_onremotevideotransportstats */
  onRemoteVideoTransportStats?(connection: RtcConnection, remoteUid: number, delay: number, lost: number, rxKBitRate: number): void;

  /* callback_irtcengineeventhandler_onconnectionstatechanged */
  onConnectionStateChanged?(connection: RtcConnection, state: ConnectionStateType, reason: ConnectionChangedReasonType): void;

  /* callback_irtcengineeventhandler_onwlaccmessage */
  onWlAccMessage?(connection: RtcConnection, reason: WlaccMessageReason, action: WlaccSuggestAction, wlAccMsg: string): void;

  /* callback_irtcengineeventhandler_onwlaccstats */
  onWlAccStats?(connection: RtcConnection, currentStats: WlAccStats, averageStats: WlAccStats): void;

  /* callback_irtcengineeventhandler_onnetworktypechanged */
  onNetworkTypeChanged?(connection: RtcConnection, type: NetworkType): void;

  /* callback_irtcengineeventhandler_onencryptionerror */
  onEncryptionError?(connection: RtcConnection, errorType: EncryptionErrorType): void;

  /* callback_irtcengineeventhandler_onpermissionerror */
  onPermissionError?(permissionType: PermissionType): void;

  /* callback_irtcengineeventhandler_onlocaluserregistered */
  onLocalUserRegistered?(uid: number, userAccount: string): void;

  /* callback_irtcengineeventhandler_onuserinfoupdated */
  onUserInfoUpdated?(uid: number, info: UserInfo): void;

  /* callback_irtcengineeventhandler_onuploadlogresult */
  onUploadLogResult?(connection: RtcConnection, requestId: string, success: boolean, reason: UploadErrorReason): void;

  /* callback_irtcengineeventhandler_onaudiosubscribestatechanged */
  onAudioSubscribeStateChanged?(channel: string, uid: number, oldState: StreamSubscribeState, newState: StreamSubscribeState, elapseSinceLastState: number): void;

  /* callback_irtcengineeventhandler_onvideosubscribestatechanged */
  onVideoSubscribeStateChanged?(channel: string, uid: number, oldState: StreamSubscribeState, newState: StreamSubscribeState, elapseSinceLastState: number): void;

  /* callback_irtcengineeventhandler_onaudiopublishstatechanged */
  onAudioPublishStateChanged?(channel: string, oldState: StreamPublishState, newState: StreamPublishState, elapseSinceLastState: number): void;

  /* callback_irtcengineeventhandler_onvideopublishstatechanged */
  onVideoPublishStateChanged?(source: VideoSourceType, channel: string, oldState: StreamPublishState, newState: StreamPublishState, elapseSinceLastState: number): void;

  /* callback_irtcengineeventhandler_onextensionevent */
  onExtensionEvent?(provider: string, extension: string, key: string, value: string): void;

  /* callback_irtcengineeventhandler_onextensionstarted */
  onExtensionStarted?(provider: string, extension: string): void;

  /* callback_irtcengineeventhandler_onextensionstopped */
  onExtensionStopped?(provider: string, extension: string): void;

  /* callback_irtcengineeventhandler_onextensionerror */
  onExtensionError?(provider: string, extension: string, error: number, message: string): void;

  /* callback_irtcengineeventhandler_onuseraccountupdated */
  onUserAccountUpdated?(connection: RtcConnection, remoteUid: number, userAccount: string): void;
}

/* class_ivideodevicemanager */
export abstract class IVideoDeviceManager {
/* api_ivideodevicemanager_enumeratevideodevices */
abstract enumerateVideoDevices(): VideoDeviceInfo[];

/* api_ivideodevicemanager_setdevice */
abstract setDevice(deviceIdUTF8: string): number;

/* api_ivideodevicemanager_getdevice */
abstract getDevice(): string;

/* api_ivideodevicemanager_numberofcapabilities */
abstract numberOfCapabilities(deviceIdUTF8: string): number;

/* api_ivideodevicemanager_getcapability */
abstract getCapability(deviceIdUTF8: string, deviceCapabilityNumber: number): VideoFormat;

/* api_ivideodevicemanager_startdevicetest */
abstract startDeviceTest(hwnd: any): number;

/* api_ivideodevicemanager_stopdevicetest */
abstract stopDeviceTest(): number;

/* api_ivideodevicemanager_release */
abstract release(): void;
}

/* class_rtcenginecontext */
export class RtcEngineContext {
  /* class_rtcenginecontext_appId */
  appId?: string
  /* class_rtcenginecontext_channelProfile */
  channelProfile?: ChannelProfileType
  /* class_rtcenginecontext_license */
  license?: string
  /* class_rtcenginecontext_audioScenario */
  audioScenario?: AudioScenarioType
  /* class_rtcenginecontext_areaCode */
  areaCode?: number
  /* class_rtcenginecontext_logConfig */
  logConfig?: LogConfig
  /* class_rtcenginecontext_threadPriority */
  threadPriority?: ThreadPriorityType
  /* class_rtcenginecontext_useExternalEglContext */
  useExternalEglContext?: boolean
  /* class_rtcenginecontext_domainLimit */
  domainLimit?: boolean
}

/* enum_metadatatype */
export enum MetadataType {
/* enum_metadatatype_UnknownMetadata */
UnknownMetadata = -1,
/* enum_metadatatype_VideoMetadata */
VideoMetadata = 0,
}

/* enum_maxmetadatasizetype */
export enum MaxMetadataSizeType {
/* enum_maxmetadatasizetype_InvalidMetadataSizeInByte */
InvalidMetadataSizeInByte = -1,
/* enum_maxmetadatasizetype_DefaultMetadataSizeInByte */
DefaultMetadataSizeInByte = 512,
/* enum_maxmetadatasizetype_MaxMetadataSizeInByte */
MaxMetadataSizeInByte = 1024,
}

/* class_metadata */
export class Metadata {
  /* class_metadata_uid */
  uid?: number
  /* class_metadata_size */
  size?: number
  /* class_metadata_buffer */
  buffer?: Uint8Array
  /* class_metadata_timeStampMs */
  timeStampMs?: number
}

/* class_imetadataobserver */
export interface IMetadataObserver {
  /* callback_imetadataobserver_onmetadatareceived */
  onMetadataReceived?(metadata: Metadata): void;
}

/* enum_directcdnstreamingerror */
export enum DirectCdnStreamingError {
/* enum_directcdnstreamingerror_DirectCdnStreamingErrorOk */
DirectCdnStreamingErrorOk = 0,
/* enum_directcdnstreamingerror_DirectCdnStreamingErrorFailed */
DirectCdnStreamingErrorFailed = 1,
/* enum_directcdnstreamingerror_DirectCdnStreamingErrorAudioPublication */
DirectCdnStreamingErrorAudioPublication = 2,
/* enum_directcdnstreamingerror_DirectCdnStreamingErrorVideoPublication */
DirectCdnStreamingErrorVideoPublication = 3,
/* enum_directcdnstreamingerror_DirectCdnStreamingErrorNetConnect */
DirectCdnStreamingErrorNetConnect = 4,
/* enum_directcdnstreamingerror_DirectCdnStreamingErrorBadName */
DirectCdnStreamingErrorBadName = 5,
}

/* enum_directcdnstreamingstate */
export enum DirectCdnStreamingState {
/* enum_directcdnstreamingstate_DirectCdnStreamingStateIdle */
DirectCdnStreamingStateIdle = 0,
/* enum_directcdnstreamingstate_DirectCdnStreamingStateRunning */
DirectCdnStreamingStateRunning = 1,
/* enum_directcdnstreamingstate_DirectCdnStreamingStateStopped */
DirectCdnStreamingStateStopped = 2,
/* enum_directcdnstreamingstate_DirectCdnStreamingStateFailed */
DirectCdnStreamingStateFailed = 3,
/* enum_directcdnstreamingstate_DirectCdnStreamingStateRecovering */
DirectCdnStreamingStateRecovering = 4,
}

/* class_directcdnstreamingstats */
export class DirectCdnStreamingStats {
  /* class_directcdnstreamingstats_videoWidth */
  videoWidth?: number
  /* class_directcdnstreamingstats_videoHeight */
  videoHeight?: number
  /* class_directcdnstreamingstats_fps */
  fps?: number
  /* class_directcdnstreamingstats_videoBitrate */
  videoBitrate?: number
  /* class_directcdnstreamingstats_audioBitrate */
  audioBitrate?: number
}

/* class_idirectcdnstreamingeventhandler */
export interface IDirectCdnStreamingEventHandler {
  /* callback_idirectcdnstreamingeventhandler_ondirectcdnstreamingstatechanged */
  onDirectCdnStreamingStateChanged?(state: DirectCdnStreamingState, error: DirectCdnStreamingError, message: string): void;

  /* callback_idirectcdnstreamingeventhandler_ondirectcdnstreamingstats */
  onDirectCdnStreamingStats?(stats: DirectCdnStreamingStats): void;
}

/* class_directcdnstreamingmediaoptions */
export class DirectCdnStreamingMediaOptions {
  /* class_directcdnstreamingmediaoptions_publishCameraTrack */
  publishCameraTrack?: boolean
  /* class_directcdnstreamingmediaoptions_publishMicrophoneTrack */
  publishMicrophoneTrack?: boolean
  /* class_directcdnstreamingmediaoptions_publishCustomAudioTrack */
  publishCustomAudioTrack?: boolean
  /* class_directcdnstreamingmediaoptions_publishCustomVideoTrack */
  publishCustomVideoTrack?: boolean
  /* class_directcdnstreamingmediaoptions_publishMediaPlayerAudioTrack */
  publishMediaPlayerAudioTrack?: boolean
  /* class_directcdnstreamingmediaoptions_publishMediaPlayerId */
  publishMediaPlayerId?: number
  /* class_directcdnstreamingmediaoptions_customVideoTrackId */
  customVideoTrackId?: number
}

/* class_extensioninfo */
export class ExtensionInfo {
  /* class_extensioninfo_mediaSourceType */
  mediaSourceType?: MediaSourceType
  /* class_extensioninfo_remoteUid */
  remoteUid?: number
  /* class_extensioninfo_channelId */
  channelId?: string
  /* class_extensioninfo_localUid */
  localUid?: number
}

/* class_irtcengine */
export abstract class IRtcEngine {
/* api_irtcengine_release */
abstract release(sync?: boolean): void;

/* api_irtcengine_initialize */
abstract initialize(context: RtcEngineContext): number;

/* api_irtcengine_getversion */
abstract getVersion(): SDKBuildInfo;

/* api_irtcengine_geterrordescription */
abstract getErrorDescription(code: number): string;

/* api_irtcengine_joinchannel */
abstract joinChannel(token: string, channelId: string, uid: number, options: ChannelMediaOptions): number;

/* api_irtcengine_updatechannelmediaoptions */
abstract updateChannelMediaOptions(options: ChannelMediaOptions): number;

/* api_irtcengine_leavechannel */
abstract leaveChannel(options?: LeaveChannelOptions): number;

/* api_irtcengine_renewtoken */
abstract renewToken(token: string): number;

/* api_irtcengine_setchannelprofile */
abstract setChannelProfile(profile: ChannelProfileType): number;

/* api_irtcengine_setclientrole */
abstract setClientRole(role: ClientRoleType, options?: ClientRoleOptions): number;

/* api_irtcengine_startechotest */
abstract startEchoTest(intervalInSeconds?: number): number;

/* api_irtcengine_stopechotest */
abstract stopEchoTest(): number;

/* api_irtcengine_enablemulticamera */
abstract enableMultiCamera(enabled: boolean, config: CameraCapturerConfiguration): number;

/* api_irtcengine_enablevideo */
abstract enableVideo(): number;

/* api_irtcengine_disablevideo */
abstract disableVideo(): number;

/* api_irtcengine_startpreview */
abstract startPreview(sourceType?: VideoSourceType): number;

/* api_irtcengine_stoppreview */
abstract stopPreview(sourceType?: VideoSourceType): number;

/* api_irtcengine_startlastmileprobetest */
abstract startLastmileProbeTest(config: LastmileProbeConfig): number;

/* api_irtcengine_stoplastmileprobetest */
abstract stopLastmileProbeTest(): number;

/* api_irtcengine_setvideoencoderconfiguration */
abstract setVideoEncoderConfiguration(config: VideoEncoderConfiguration): number;

/* api_irtcengine_setbeautyeffectoptions */
abstract setBeautyEffectOptions(enabled: boolean, options: BeautyOptions, type?: MediaSourceType): number;

/* api_irtcengine_setlowlightenhanceoptions */
abstract setLowlightEnhanceOptions(enabled: boolean, options: LowlightEnhanceOptions, type?: MediaSourceType): number;

/* api_irtcengine_setvideodenoiseroptions */
abstract setVideoDenoiserOptions(enabled: boolean, options: VideoDenoiserOptions, type?: MediaSourceType): number;

/* api_irtcengine_setcolorenhanceoptions */
abstract setColorEnhanceOptions(enabled: boolean, options: ColorEnhanceOptions, type?: MediaSourceType): number;

/* api_irtcengine_enablevirtualbackground */
abstract enableVirtualBackground(enabled: boolean, backgroundSource: VirtualBackgroundSource, segproperty: SegmentationProperty, type?: MediaSourceType): number;

/* api_irtcengine_enableremotesuperresolution */
abstract enableRemoteSuperResolution(userId: number, enable: boolean): number;

/* api_irtcengine_setupremotevideo */
abstract setupRemoteVideo(canvas: VideoCanvas): number;

/* api_irtcengine_setuplocalvideo */
abstract setupLocalVideo(canvas: VideoCanvas): number;

/* api_irtcengine_enableaudio */
abstract enableAudio(): number;

/* api_irtcengine_disableaudio */
abstract disableAudio(): number;

/* api_irtcengine_setaudioprofile */
abstract setAudioProfile(profile: AudioProfileType, scenario?: AudioScenarioType): number;

/* api_irtcengine_setaudioscenario */
abstract setAudioScenario(scenario: AudioScenarioType): number;

/* api_irtcengine_enablelocalaudio */
abstract enableLocalAudio(enabled: boolean): number;

/* api_irtcengine_mutelocalaudiostream */
abstract muteLocalAudioStream(mute: boolean): number;

/* api_irtcengine_muteallremoteaudiostreams */
abstract muteAllRemoteAudioStreams(mute: boolean): number;

/* api_irtcengine_setdefaultmuteallremoteaudiostreams */
abstract setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;

/* api_irtcengine_muteremoteaudiostream */
abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

/* api_irtcengine_mutelocalvideostream */
abstract muteLocalVideoStream(mute: boolean): number;

/* api_irtcengine_enablelocalvideo */
abstract enableLocalVideo(enabled: boolean): number;

/* api_irtcengine_muteallremotevideostreams */
abstract muteAllRemoteVideoStreams(mute: boolean): number;

/* api_irtcengine_setdefaultmuteallremotevideostreams */
abstract setDefaultMuteAllRemoteVideoStreams(mute: boolean): number;

/* api_irtcengine_muteremotevideostream */
abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

/* api_irtcengine_setremotevideostreamtype */
abstract setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): number;

/* api_irtcengine_setremotevideosubscriptionoptions */
abstract setRemoteVideoSubscriptionOptions(uid: number, options: VideoSubscriptionOptions): number;

/* api_irtcengine_setremotedefaultvideostreamtype */
abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

/* api_irtcengine_setsubscribeaudioblocklist */
abstract setSubscribeAudioBlocklist(uidList: number[], uidNumber: number): number;

/* api_irtcengine_setsubscribeaudioallowlist */
abstract setSubscribeAudioAllowlist(uidList: number[], uidNumber: number): number;

/* api_irtcengine_setsubscribevideoblocklist */
abstract setSubscribeVideoBlocklist(uidList: number[], uidNumber: number): number;

/* api_irtcengine_setsubscribevideoallowlist */
abstract setSubscribeVideoAllowlist(uidList: number[], uidNumber: number): number;

/* api_irtcengine_enableaudiovolumeindication */
abstract enableAudioVolumeIndication(interval: number, smooth: number, reportVad: boolean): number;

/* api_irtcengine_startaudiorecording */
abstract startAudioRecording(config: AudioRecordingConfiguration): number;

/* api_irtcengine_registeraudioencodedframeobserver */
abstract registerAudioEncodedFrameObserver(config: AudioEncodedFrameObserverConfig, observer: IAudioEncodedFrameObserver): number;

/* api_irtcengine_stopaudiorecording */
abstract stopAudioRecording(): number;

/* api_irtcengine_createmediaplayer */
abstract createMediaPlayer(): IMediaPlayer;

/* api_irtcengine_destroymediaplayer */
abstract destroyMediaPlayer(mediaPlayer: IMediaPlayer): number;

/* api_irtcengine_startaudiomixing */
abstract startAudioMixing(filePath: string, loopback: boolean, cycle: number, startPos?: number): number;

/* api_irtcengine_stopaudiomixing */
abstract stopAudioMixing(): number;

/* api_irtcengine_pauseaudiomixing */
abstract pauseAudioMixing(): number;

/* api_irtcengine_resumeaudiomixing */
abstract resumeAudioMixing(): number;

/* api_irtcengine_selectaudiotrack */
abstract selectAudioTrack(index: number): number;

/* api_irtcengine_getaudiotrackcount */
abstract getAudioTrackCount(): number;

/* api_irtcengine_adjustaudiomixingvolume */
abstract adjustAudioMixingVolume(volume: number): number;

/* api_irtcengine_adjustaudiomixingpublishvolume */
abstract adjustAudioMixingPublishVolume(volume: number): number;

/* api_irtcengine_getaudiomixingpublishvolume */
abstract getAudioMixingPublishVolume(): number;

/* api_irtcengine_adjustaudiomixingplayoutvolume */
abstract adjustAudioMixingPlayoutVolume(volume: number): number;

/* api_irtcengine_getaudiomixingplayoutvolume */
abstract getAudioMixingPlayoutVolume(): number;

/* api_irtcengine_getaudiomixingduration */
abstract getAudioMixingDuration(): number;

/* api_irtcengine_getaudiomixingcurrentposition */
abstract getAudioMixingCurrentPosition(): number;

/* api_irtcengine_setaudiomixingposition */
abstract setAudioMixingPosition(pos: number): number;

/* api_irtcengine_setaudiomixingdualmonomode */
abstract setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): number;

/* api_irtcengine_setaudiomixingpitch */
abstract setAudioMixingPitch(pitch: number): number;

/* api_irtcengine_geteffectsvolume */
abstract getEffectsVolume(): number;

/* api_irtcengine_seteffectsvolume */
abstract setEffectsVolume(volume: number): number;

/* api_irtcengine_preloadeffect */
abstract preloadEffect(soundId: number, filePath: string, startPos?: number): number;

/* api_irtcengine_playeffect */
abstract playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish?: boolean, startPos?: number): number;

/* api_irtcengine_playalleffects */
abstract playAllEffects(loopCount: number, pitch: number, pan: number, gain: number, publish?: boolean): number;

/* api_irtcengine_getvolumeofeffect */
abstract getVolumeOfEffect(soundId: number): number;

/* api_irtcengine_setvolumeofeffect */
abstract setVolumeOfEffect(soundId: number, volume: number): number;

/* api_irtcengine_pauseeffect */
abstract pauseEffect(soundId: number): number;

/* api_irtcengine_pausealleffects */
abstract pauseAllEffects(): number;

/* api_irtcengine_resumeeffect */
abstract resumeEffect(soundId: number): number;

/* api_irtcengine_resumealleffects */
abstract resumeAllEffects(): number;

/* api_irtcengine_stopeffect */
abstract stopEffect(soundId: number): number;

/* api_irtcengine_stopalleffects */
abstract stopAllEffects(): number;

/* api_irtcengine_unloadeffect */
abstract unloadEffect(soundId: number): number;

/* api_irtcengine_unloadalleffects */
abstract unloadAllEffects(): number;

/* api_irtcengine_geteffectduration */
abstract getEffectDuration(filePath: string): number;

/* api_irtcengine_seteffectposition */
abstract setEffectPosition(soundId: number, pos: number): number;

/* api_irtcengine_geteffectcurrentposition */
abstract getEffectCurrentPosition(soundId: number): number;

/* api_irtcengine_enablesoundpositionindication */
abstract enableSoundPositionIndication(enabled: boolean): number;

/* api_irtcengine_setremotevoiceposition */
abstract setRemoteVoicePosition(uid: number, pan: number, gain: number): number;

/* api_irtcengine_enablespatialaudio */
abstract enableSpatialAudio(enabled: boolean): number;

/* api_irtcengine_setremoteuserspatialaudioparams */
abstract setRemoteUserSpatialAudioParams(uid: number, params: SpatialAudioParams): number;

/* api_irtcengine_setvoicebeautifierpreset */
abstract setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number;

/* api_irtcengine_setaudioeffectpreset */
abstract setAudioEffectPreset(preset: AudioEffectPreset): number;

/* api_irtcengine_setvoiceconversionpreset */
abstract setVoiceConversionPreset(preset: VoiceConversionPreset): number;

/* api_irtcengine_setaudioeffectparameters */
abstract setAudioEffectParameters(preset: AudioEffectPreset, param1: number, param2: number): number;

/* api_irtcengine_setvoicebeautifierparameters */
abstract setVoiceBeautifierParameters(preset: VoiceBeautifierPreset, param1: number, param2: number): number;

/* api_irtcengine_setvoiceconversionparameters */
abstract setVoiceConversionParameters(preset: VoiceConversionPreset, param1: number, param2: number): number;

/* api_irtcengine_setlocalvoicepitch */
abstract setLocalVoicePitch(pitch: number): number;

/* api_irtcengine_setlocalvoiceequalization */
abstract setLocalVoiceEqualization(bandFrequency: AudioEqualizationBandFrequency, bandGain: number): number;

/* api_irtcengine_setlocalvoicereverb */
abstract setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): number;

/* api_irtcengine_setheadphoneeqpreset */
abstract setHeadphoneEQPreset(preset: HeadphoneEqualizerPreset): number;

/* api_irtcengine_setheadphoneeqparameters */
abstract setHeadphoneEQParameters(lowGain: number, highGain: number): number;

/* api_irtcengine_setlogfile */
abstract setLogFile(filePath: string): number;

/* api_irtcengine_setlogfilter */
abstract setLogFilter(filter: LogFilterType): number;

/* api_irtcengine_setloglevel */
abstract setLogLevel(level: LogLevel): number;

/* api_irtcengine_setlogfilesize */
abstract setLogFileSize(fileSizeInKBytes: number): number;

/* api_irtcengine_uploadlogfile */
abstract uploadLogFile(requestId: string): number;

/* api_irtcengine_setlocalrendermode */
abstract setLocalRenderMode(renderMode: RenderModeType, mirrorMode?: VideoMirrorModeType): number;

/* api_irtcengine_setremoterendermode */
abstract setRemoteRenderMode(uid: number, renderMode: RenderModeType, mirrorMode: VideoMirrorModeType): number;

/* api_irtcengine_setlocalvideomirrormode */
abstract setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number;

/* api_irtcengine_enabledualstreammode */
abstract enableDualStreamMode(enabled: boolean, streamConfig?: SimulcastStreamConfig): number;

/* api_irtcengine_setdualstreammode */
abstract setDualStreamMode(mode: SimulcastStreamMode, streamConfig?: SimulcastStreamConfig): number;

/* api_irtcengine_enableechocancellationexternal */
abstract enableEchoCancellationExternal(enabled: boolean, audioSourceDelay: number): number;

/* api_irtcengine_enablecustomaudiolocalplayback */
abstract enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number;

/* api_irtcengine_startprimarycustomaudiotrack */
abstract startPrimaryCustomAudioTrack(config: AudioTrackConfig): number;

/* api_irtcengine_stopprimarycustomaudiotrack */
abstract stopPrimaryCustomAudioTrack(): number;

/* api_irtcengine_startsecondarycustomaudiotrack */
abstract startSecondaryCustomAudioTrack(config: AudioTrackConfig): number;

/* api_irtcengine_stopsecondarycustomaudiotrack */
abstract stopSecondaryCustomAudioTrack(): number;

/* api_irtcengine_setrecordingaudioframeparameters */
abstract setRecordingAudioFrameParameters(sampleRate: number, channel: number, mode: RawAudioFrameOpModeType, samplesPerCall: number): number;

/* api_irtcengine_setplaybackaudioframeparameters */
abstract setPlaybackAudioFrameParameters(sampleRate: number, channel: number, mode: RawAudioFrameOpModeType, samplesPerCall: number): number;

/* api_irtcengine_setmixedaudioframeparameters */
abstract setMixedAudioFrameParameters(sampleRate: number, channel: number, samplesPerCall: number): number;

/* api_irtcengine_setearmonitoringaudioframeparameters */
abstract setEarMonitoringAudioFrameParameters(sampleRate: number, channel: number, mode: RawAudioFrameOpModeType, samplesPerCall: number): number;

/* api_irtcengine_setplaybackaudioframebeforemixingparameters */
abstract setPlaybackAudioFrameBeforeMixingParameters(sampleRate: number, channel: number): number;

/* api_irtcengine_enableaudiospectrummonitor */
abstract enableAudioSpectrumMonitor(intervalInMS?: number): number;

/* api_irtcengine_disableaudiospectrummonitor */
abstract disableAudioSpectrumMonitor(): number;

/* api_irtcengine_registeraudiospectrumobserver */
abstract registerAudioSpectrumObserver(observer: IAudioSpectrumObserver): number;

/* api_irtcengine_unregisteraudiospectrumobserver */
abstract unregisterAudioSpectrumObserver(observer: IAudioSpectrumObserver): number;

/* api_irtcengine_adjustrecordingsignalvolume */
abstract adjustRecordingSignalVolume(volume: number): number;

/* api_irtcengine_muterecordingsignal */
abstract muteRecordingSignal(mute: boolean): number;

/* api_irtcengine_adjustplaybacksignalvolume */
abstract adjustPlaybackSignalVolume(volume: number): number;

/* api_irtcengine_adjustuserplaybacksignalvolume */
abstract adjustUserPlaybackSignalVolume(uid: number, volume: number): number;

/* api_irtcengine_setlocalpublishfallbackoption */
abstract setLocalPublishFallbackOption(option: StreamFallbackOptions): number;

/* api_irtcengine_setremotesubscribefallbackoption */
abstract setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): number;

/* api_irtcengine_enableloopbackrecording */
abstract enableLoopbackRecording(enabled: boolean, deviceName?: string): number;

/* api_irtcengine_adjustloopbacksignalvolume */
abstract adjustLoopbackSignalVolume(volume: number): number;

/* api_irtcengine_getloopbackrecordingvolume */
abstract getLoopbackRecordingVolume(): number;

/* api_irtcengine_enableinearmonitoring */
abstract enableInEarMonitoring(enabled: boolean, includeAudioFilters: EarMonitoringFilterType): number;

/* api_irtcengine_setinearmonitoringvolume */
abstract setInEarMonitoringVolume(volume: number): number;

/* api_irtcengine_loadextensionprovider */
abstract loadExtensionProvider(path: string, unloadAfterUse?: boolean): number;

/* api_irtcengine_setextensionproviderproperty */
abstract setExtensionProviderProperty(provider: string, key: string, value: string): number;

/* api_irtcengine_registerextension */
abstract registerExtension(provider: string, extension: string, type?: MediaSourceType): number;

/* api_irtcengine_enableextension */
abstract enableExtension(provider: string, extension: string, enable?: boolean, type?: MediaSourceType): number;

/* api_irtcengine_setextensionproperty */
abstract setExtensionProperty(provider: string, extension: string, key: string, value: string, type?: MediaSourceType): number;

/* api_irtcengine_getextensionproperty */
abstract getExtensionProperty(provider: string, extension: string, key: string, bufLen: number, type?: MediaSourceType): string;

/* api_irtcengine_setcameracapturerconfiguration */
abstract setCameraCapturerConfiguration(config: CameraCapturerConfiguration): number;

/* api_irtcengine_createcustomvideotrack */
abstract createCustomVideoTrack(): number;

/* api_irtcengine_createcustomencodedvideotrack */
abstract createCustomEncodedVideoTrack(senderOption: SenderOptions): number;

/* api_irtcengine_destroycustomvideotrack */
abstract destroyCustomVideoTrack(videoTrackId: number): number;

/* api_irtcengine_destroycustomencodedvideotrack */
abstract destroyCustomEncodedVideoTrack(videoTrackId: number): number;

/* api_irtcengine_switchcamera */
abstract switchCamera(): number;

/* api_irtcengine_iscamerazoomsupported */
abstract isCameraZoomSupported(): boolean;

/* api_irtcengine_iscamerafacedetectsupported */
abstract isCameraFaceDetectSupported(): boolean;

/* api_irtcengine_iscameratorchsupported */
abstract isCameraTorchSupported(): boolean;

/* api_irtcengine_iscamerafocussupported */
abstract isCameraFocusSupported(): boolean;

/* api_irtcengine_iscameraautofocusfacemodesupported */
abstract isCameraAutoFocusFaceModeSupported(): boolean;

/* api_irtcengine_setcamerazoomfactor */
abstract setCameraZoomFactor(factor: number): number;

/* api_irtcengine_enablefacedetection */
abstract enableFaceDetection(enabled: boolean): number;

/* api_irtcengine_getcameramaxzoomfactor */
abstract getCameraMaxZoomFactor(): number;

/* api_irtcengine_setcamerafocuspositioninpreview */
abstract setCameraFocusPositionInPreview(positionX: number, positionY: number): number;

/* api_irtcengine_setcameratorchon */
abstract setCameraTorchOn(isOn: boolean): number;

/* api_irtcengine_setcameraautofocusfacemodeenabled */
abstract setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;

/* api_irtcengine_iscameraexposurepositionsupported */
abstract isCameraExposurePositionSupported(): boolean;

/* api_irtcengine_setcameraexposureposition */
abstract setCameraExposurePosition(positionXinView: number, positionYinView: number): number;

/* api_irtcengine_iscameraautoexposurefacemodesupported */
abstract isCameraAutoExposureFaceModeSupported(): boolean;

/* api_irtcengine_setcameraautoexposurefacemodeenabled */
abstract setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;

/* api_irtcengine_setdefaultaudioroutetospeakerphone */
abstract setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): number;

/* api_irtcengine_setenablespeakerphone */
abstract setEnableSpeakerphone(speakerOn: boolean): number;

/* api_irtcengine_isspeakerphoneenabled */
abstract isSpeakerphoneEnabled(): boolean;

/* api_irtcengine_getscreencapturesources */
abstract getScreenCaptureSources(thumbSize: Size, iconSize: Size, includeScreen: boolean): ScreenCaptureSourceInfo[];

/* api_irtcengine_setaudiosessionoperationrestriction */
abstract setAudioSessionOperationRestriction(restriction: AudioSessionOperationRestriction): number;

/* api_irtcengine_startscreencapturebydisplayid */
abstract startScreenCaptureByDisplayId(displayId: number, regionRect: Rectangle, captureParams: ScreenCaptureParameters): number;

/* api_irtcengine_startscreencapturebyscreenrect */
abstract startScreenCaptureByScreenRect(screenRect: Rectangle, regionRect: Rectangle, captureParams: ScreenCaptureParameters): number;

/* api_irtcengine_getaudiodeviceinfo */
abstract getAudioDeviceInfo(): DeviceInfo;

/* api_irtcengine_startscreencapturebywindowid */
abstract startScreenCaptureByWindowId(windowId: any, regionRect: Rectangle, captureParams: ScreenCaptureParameters): number;

/* api_irtcengine_setscreencapturecontenthint */
abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

/* api_irtcengine_setscreencapturescenario */
abstract setScreenCaptureScenario(screenScenario: ScreenScenarioType): number;

/* api_irtcengine_updatescreencaptureregion */
abstract updateScreenCaptureRegion(regionRect: Rectangle): number;

/* api_irtcengine_updatescreencaptureparameters */
abstract updateScreenCaptureParameters(captureParams: ScreenCaptureParameters): number;

/* api_irtcengine_startscreencapture */
abstract startScreenCapture(captureParams: ScreenCaptureParameters2): number;

/* api_irtcengine_updatescreencapture */
abstract updateScreenCapture(captureParams: ScreenCaptureParameters2): number;

/* api_irtcengine_stopscreencapture */
abstract stopScreenCapture(): number;

/* api_irtcengine_getcallid */
abstract getCallId(): string;

/* api_irtcengine_rate */
abstract rate(callId: string, rating: number, description: string): number;

/* api_irtcengine_complain */
abstract complain(callId: string, description: string): number;

/* api_irtcengine_startrtmpstreamwithouttranscoding */
abstract startRtmpStreamWithoutTranscoding(url: string): number;

/* api_irtcengine_startrtmpstreamwithtranscoding */
abstract startRtmpStreamWithTranscoding(url: string, transcoding: LiveTranscoding): number;

/* api_irtcengine_updatertmptranscoding */
abstract updateRtmpTranscoding(transcoding: LiveTranscoding): number;

/* api_irtcengine_stoprtmpstream */
abstract stopRtmpStream(url: string): number;

/* api_irtcengine_startlocalvideotranscoder */
abstract startLocalVideoTranscoder(config: LocalTranscoderConfiguration): number;

/* api_irtcengine_updatelocaltranscoderconfiguration */
abstract updateLocalTranscoderConfiguration(config: LocalTranscoderConfiguration): number;

/* api_irtcengine_stoplocalvideotranscoder */
abstract stopLocalVideoTranscoder(): number;

/* api_irtcengine_startprimarycameracapture */
abstract startPrimaryCameraCapture(config: CameraCapturerConfiguration): number;

/* api_irtcengine_startsecondarycameracapture */
abstract startSecondaryCameraCapture(config: CameraCapturerConfiguration): number;

/* api_irtcengine_stopprimarycameracapture */
abstract stopPrimaryCameraCapture(): number;

/* api_irtcengine_stopsecondarycameracapture */
abstract stopSecondaryCameraCapture(): number;

/* api_irtcengine_setcameradeviceorientation */
abstract setCameraDeviceOrientation(type: VideoSourceType, orientation: VideoOrientation): number;

/* api_irtcengine_setscreencaptureorientation */
abstract setScreenCaptureOrientation(type: VideoSourceType, orientation: VideoOrientation): number;

/* api_irtcengine_startprimaryscreencapture */
abstract startPrimaryScreenCapture(config: ScreenCaptureConfiguration): number;

/* api_irtcengine_startsecondaryscreencapture */
abstract startSecondaryScreenCapture(config: ScreenCaptureConfiguration): number;

/* api_irtcengine_stopprimaryscreencapture */
abstract stopPrimaryScreenCapture(): number;

/* api_irtcengine_stopsecondaryscreencapture */
abstract stopSecondaryScreenCapture(): number;

/* api_irtcengine_getconnectionstate */
abstract getConnectionState(): ConnectionStateType;

/* api_irtcengine_registereventhandler */
abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

/* api_irtcengine_unregistereventhandler */
abstract unregisterEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

/* api_irtcengine_setremoteuserpriority */
abstract setRemoteUserPriority(uid: number, userPriority: PriorityType): number;

/* api_irtcengine_setencryptionmode */
abstract setEncryptionMode(encryptionMode: string): number;

/* api_irtcengine_setencryptionsecret */
abstract setEncryptionSecret(secret: string): number;

/* api_irtcengine_enableencryption */
abstract enableEncryption(enabled: boolean, config: EncryptionConfig): number;

/* api_irtcengine_createdatastream */
abstract createDataStream(config: DataStreamConfig): number;

/* api_irtcengine_sendstreammessage */
abstract sendStreamMessage(streamId: number, data: Uint8Array, length: number): number;

/* api_irtcengine_addvideowatermark */
abstract addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): number;

/* api_irtcengine_clearvideowatermarks */
abstract clearVideoWatermarks(): number;

/* api_irtcengine_pauseaudio */
abstract pauseAudio(): number;

/* api_irtcengine_resumeaudio */
abstract resumeAudio(): number;

/* api_irtcengine_enablewebsdkinteroperability */
abstract enableWebSdkInteroperability(enabled: boolean): number;

/* api_irtcengine_sendcustomreportmessage */
abstract sendCustomReportMessage(id: string, category: string, event: string, label: string, value: number): number;

/* api_irtcengine_registermediametadataobserver */
abstract registerMediaMetadataObserver(observer: IMetadataObserver, type: MetadataType): number;

/* api_irtcengine_unregistermediametadataobserver */
abstract unregisterMediaMetadataObserver(observer: IMetadataObserver, type: MetadataType): number;

/* api_irtcengine_startaudioframedump */
abstract startAudioFrameDump(channelId: string, userId: number, location: string, uuid: string, passwd: string, durationMs: number, autoUpload: boolean): number;

/* api_irtcengine_stopaudioframedump */
abstract stopAudioFrameDump(channelId: string, userId: number, location: string): number;

/* api_irtcengine_registerlocaluseraccount */
abstract registerLocalUserAccount(appId: string, userAccount: string): number;

/* api_irtcengine_joinchannelwithuseraccount */
abstract joinChannelWithUserAccount(token: string, channelId: string, userAccount: string, options?: ChannelMediaOptions): number;

/* api_irtcengine_joinchannelwithuseraccountex */
abstract joinChannelWithUserAccountEx(token: string, channelId: string, userAccount: string, options: ChannelMediaOptions): number;

/* api_irtcengine_getuserinfobyuseraccount */
abstract getUserInfoByUserAccount(userAccount: string): UserInfo;

/* api_irtcengine_getuserinfobyuid */
abstract getUserInfoByUid(uid: number): UserInfo;

/* api_irtcengine_startchannelmediarelay */
abstract startChannelMediaRelay(configuration: ChannelMediaRelayConfiguration): number;

/* api_irtcengine_updatechannelmediarelay */
abstract updateChannelMediaRelay(configuration: ChannelMediaRelayConfiguration): number;

/* api_irtcengine_stopchannelmediarelay */
abstract stopChannelMediaRelay(): number;

/* api_irtcengine_pauseallchannelmediarelay */
abstract pauseAllChannelMediaRelay(): number;

/* api_irtcengine_resumeallchannelmediarelay */
abstract resumeAllChannelMediaRelay(): number;

/* api_irtcengine_setdirectcdnstreamingaudioconfiguration */
abstract setDirectCdnStreamingAudioConfiguration(profile: AudioProfileType): number;

/* api_irtcengine_setdirectcdnstreamingvideoconfiguration */
abstract setDirectCdnStreamingVideoConfiguration(config: VideoEncoderConfiguration): number;

/* api_irtcengine_startdirectcdnstreaming */
abstract startDirectCdnStreaming(eventHandler: IDirectCdnStreamingEventHandler, publishUrl: string, options: DirectCdnStreamingMediaOptions): number;

/* api_irtcengine_stopdirectcdnstreaming */
abstract stopDirectCdnStreaming(): number;

/* api_irtcengine_updatedirectcdnstreamingmediaoptions */
abstract updateDirectCdnStreamingMediaOptions(options: DirectCdnStreamingMediaOptions): number;

/* api_irtcengine_startrhythmplayer */
abstract startRhythmPlayer(sound1: string, sound2: string, config: AgoraRhythmPlayerConfig): number;

/* api_irtcengine_stoprhythmplayer */
abstract stopRhythmPlayer(): number;

/* api_irtcengine_configrhythmplayer */
abstract configRhythmPlayer(config: AgoraRhythmPlayerConfig): number;

/* api_irtcengine_takesnapshot */
abstract takeSnapshot(uid: number, filePath: string): number;

/* api_irtcengine_enablecontentinspect */
abstract enableContentInspect(enabled: boolean, config: ContentInspectConfig): number;

/* api_irtcengine_adjustcustomaudiopublishvolume */
abstract adjustCustomAudioPublishVolume(sourceId: number, volume: number): number;

/* api_irtcengine_adjustcustomaudioplayoutvolume */
abstract adjustCustomAudioPlayoutVolume(sourceId: number, volume: number): number;

/* api_irtcengine_setcloudproxy */
abstract setCloudProxy(proxyType: CloudProxyType): number;

/* api_irtcengine_setlocalaccesspoint */
abstract setLocalAccessPoint(config: LocalAccessPointConfiguration): number;

/* api_irtcengine_setadvancedaudiooptions */
abstract setAdvancedAudioOptions(options: AdvancedAudioOptions, sourceType?: number): number;

/* api_irtcengine_setavsyncsource */
abstract setAVSyncSource(channelId: string, uid: number): number;

/* api_irtcengine_enablevideoimagesource */
abstract enableVideoImageSource(enable: boolean, options: ImageTrackOptions): number;

/* api_irtcengine_getcurrentmonotonictimeinms */
abstract getCurrentMonotonicTimeInMs(): number;

/* api_irtcengine_enablewirelessaccelerate */
abstract enableWirelessAccelerate(enabled: boolean): number;

/* api_irtcengine_getnetworktype */
abstract getNetworkType(): number;

/* api_irtcengine_getaudiodevicemanager */
abstract getAudioDeviceManager(): IAudioDeviceManager;

/* api_irtcengine_getvideodevicemanager */
abstract getVideoDeviceManager(): IVideoDeviceManager;

/* api_irtcengine_getmusiccontentcenter */
abstract getMusicContentCenter(): IMusicContentCenter;

/* api_irtcengine_getmediaengine */
abstract getMediaEngine(): IMediaEngine;

/* api_irtcengine_getmediarecorder */
abstract getMediaRecorder(): IMediaRecorder;

/* api_irtcengine_getlocalspatialaudioengine */
abstract getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine;

/* api_irtcengine_sendmetadata */
abstract sendMetaData(metadata: Metadata, sourceType: VideoSourceType): number;

/* api_irtcengine_setmaxmetadatasize */
abstract setMaxMetadataSize(size: number): number;

/* api_irtcengine_unregisteraudioencodedframeobserver */
abstract unregisterAudioEncodedFrameObserver(observer: IAudioEncodedFrameObserver): number;

/* api_irtcengine_setparameters */
abstract setParameters(parameters: string): number;

/* api_irtcengine_getnativehandle */
abstract getNativeHandle(): number;
}

/* enum_qualityreportformattype */
export enum QualityReportFormatType {
/* enum_qualityreportformattype_QualityReportJson */
QualityReportJson = 0,
/* enum_qualityreportformattype_QualityReportHtml */
QualityReportHtml = 1,
}

/* enum_mediadevicestatetype */
export enum MediaDeviceStateType {
/* enum_mediadevicestatetype_MediaDeviceStateIdle */
MediaDeviceStateIdle = 0,
/* enum_mediadevicestatetype_MediaDeviceStateActive */
MediaDeviceStateActive = 1,
/* enum_mediadevicestatetype_MediaDeviceStateDisabled */
MediaDeviceStateDisabled = 2,
/* enum_mediadevicestatetype_MediaDeviceStateNotPresent */
MediaDeviceStateNotPresent = 4,
/* enum_mediadevicestatetype_MediaDeviceStateUnplugged */
MediaDeviceStateUnplugged = 8,
}

/* enum_videoprofiletype */
export enum VideoProfileType {
/* enum_videoprofiletype_VideoProfileLandscape120p */
VideoProfileLandscape120p = 0,
/* enum_videoprofiletype_VideoProfileLandscape120p3 */
VideoProfileLandscape120p3 = 2,
/* enum_videoprofiletype_VideoProfileLandscape180p */
VideoProfileLandscape180p = 10,
/* enum_videoprofiletype_VideoProfileLandscape180p3 */
VideoProfileLandscape180p3 = 12,
/* enum_videoprofiletype_VideoProfileLandscape180p4 */
VideoProfileLandscape180p4 = 13,
/* enum_videoprofiletype_VideoProfileLandscape240p */
VideoProfileLandscape240p = 20,
/* enum_videoprofiletype_VideoProfileLandscape240p3 */
VideoProfileLandscape240p3 = 22,
/* enum_videoprofiletype_VideoProfileLandscape240p4 */
VideoProfileLandscape240p4 = 23,
/* enum_videoprofiletype_VideoProfileLandscape360p */
VideoProfileLandscape360p = 30,
/* enum_videoprofiletype_VideoProfileLandscape360p3 */
VideoProfileLandscape360p3 = 32,
/* enum_videoprofiletype_VideoProfileLandscape360p4 */
VideoProfileLandscape360p4 = 33,
/* enum_videoprofiletype_VideoProfileLandscape360p6 */
VideoProfileLandscape360p6 = 35,
/* enum_videoprofiletype_VideoProfileLandscape360p7 */
VideoProfileLandscape360p7 = 36,
/* enum_videoprofiletype_VideoProfileLandscape360p8 */
VideoProfileLandscape360p8 = 37,
/* enum_videoprofiletype_VideoProfileLandscape360p9 */
VideoProfileLandscape360p9 = 38,
/* enum_videoprofiletype_VideoProfileLandscape360p10 */
VideoProfileLandscape360p10 = 39,
/* enum_videoprofiletype_VideoProfileLandscape360p11 */
VideoProfileLandscape360p11 = 100,
/* enum_videoprofiletype_VideoProfileLandscape480p */
VideoProfileLandscape480p = 40,
/* enum_videoprofiletype_VideoProfileLandscape480p3 */
VideoProfileLandscape480p3 = 42,
/* enum_videoprofiletype_VideoProfileLandscape480p4 */
VideoProfileLandscape480p4 = 43,
/* enum_videoprofiletype_VideoProfileLandscape480p6 */
VideoProfileLandscape480p6 = 45,
/* enum_videoprofiletype_VideoProfileLandscape480p8 */
VideoProfileLandscape480p8 = 47,
/* enum_videoprofiletype_VideoProfileLandscape480p9 */
VideoProfileLandscape480p9 = 48,
/* enum_videoprofiletype_VideoProfileLandscape480p10 */
VideoProfileLandscape480p10 = 49,
/* enum_videoprofiletype_VideoProfileLandscape720p */
VideoProfileLandscape720p = 50,
/* enum_videoprofiletype_VideoProfileLandscape720p3 */
VideoProfileLandscape720p3 = 52,
/* enum_videoprofiletype_VideoProfileLandscape720p5 */
VideoProfileLandscape720p5 = 54,
/* enum_videoprofiletype_VideoProfileLandscape720p6 */
VideoProfileLandscape720p6 = 55,
/* enum_videoprofiletype_VideoProfileLandscape1080p */
VideoProfileLandscape1080p = 60,
/* enum_videoprofiletype_VideoProfileLandscape1080p3 */
VideoProfileLandscape1080p3 = 62,
/* enum_videoprofiletype_VideoProfileLandscape1080p5 */
VideoProfileLandscape1080p5 = 64,
/* enum_videoprofiletype_VideoProfileLandscape1440p */
VideoProfileLandscape1440p = 66,
/* enum_videoprofiletype_VideoProfileLandscape1440p2 */
VideoProfileLandscape1440p2 = 67,
/* enum_videoprofiletype_VideoProfileLandscape4k */
VideoProfileLandscape4k = 70,
/* enum_videoprofiletype_VideoProfileLandscape4k3 */
VideoProfileLandscape4k3 = 72,
/* enum_videoprofiletype_VideoProfilePortrait120p */
VideoProfilePortrait120p = 1000,
/* enum_videoprofiletype_VideoProfilePortrait120p3 */
VideoProfilePortrait120p3 = 1002,
/* enum_videoprofiletype_VideoProfilePortrait180p */
VideoProfilePortrait180p = 1010,
/* enum_videoprofiletype_VideoProfilePortrait180p3 */
VideoProfilePortrait180p3 = 1012,
/* enum_videoprofiletype_VideoProfilePortrait180p4 */
VideoProfilePortrait180p4 = 1013,
/* enum_videoprofiletype_VideoProfilePortrait240p */
VideoProfilePortrait240p = 1020,
/* enum_videoprofiletype_VideoProfilePortrait240p3 */
VideoProfilePortrait240p3 = 1022,
/* enum_videoprofiletype_VideoProfilePortrait240p4 */
VideoProfilePortrait240p4 = 1023,
/* enum_videoprofiletype_VideoProfilePortrait360p */
VideoProfilePortrait360p = 1030,
/* enum_videoprofiletype_VideoProfilePortrait360p3 */
VideoProfilePortrait360p3 = 1032,
/* enum_videoprofiletype_VideoProfilePortrait360p4 */
VideoProfilePortrait360p4 = 1033,
/* enum_videoprofiletype_VideoProfilePortrait360p6 */
VideoProfilePortrait360p6 = 1035,
/* enum_videoprofiletype_VideoProfilePortrait360p7 */
VideoProfilePortrait360p7 = 1036,
/* enum_videoprofiletype_VideoProfilePortrait360p8 */
VideoProfilePortrait360p8 = 1037,
/* enum_videoprofiletype_VideoProfilePortrait360p9 */
VideoProfilePortrait360p9 = 1038,
/* enum_videoprofiletype_VideoProfilePortrait360p10 */
VideoProfilePortrait360p10 = 1039,
/* enum_videoprofiletype_VideoProfilePortrait360p11 */
VideoProfilePortrait360p11 = 1100,
/* enum_videoprofiletype_VideoProfilePortrait480p */
VideoProfilePortrait480p = 1040,
/* enum_videoprofiletype_VideoProfilePortrait480p3 */
VideoProfilePortrait480p3 = 1042,
/* enum_videoprofiletype_VideoProfilePortrait480p4 */
VideoProfilePortrait480p4 = 1043,
/* enum_videoprofiletype_VideoProfilePortrait480p6 */
VideoProfilePortrait480p6 = 1045,
/* enum_videoprofiletype_VideoProfilePortrait480p8 */
VideoProfilePortrait480p8 = 1047,
/* enum_videoprofiletype_VideoProfilePortrait480p9 */
VideoProfilePortrait480p9 = 1048,
/* enum_videoprofiletype_VideoProfilePortrait480p10 */
VideoProfilePortrait480p10 = 1049,
/* enum_videoprofiletype_VideoProfilePortrait720p */
VideoProfilePortrait720p = 1050,
/* enum_videoprofiletype_VideoProfilePortrait720p3 */
VideoProfilePortrait720p3 = 1052,
/* enum_videoprofiletype_VideoProfilePortrait720p5 */
VideoProfilePortrait720p5 = 1054,
/* enum_videoprofiletype_VideoProfilePortrait720p6 */
VideoProfilePortrait720p6 = 1055,
/* enum_videoprofiletype_VideoProfilePortrait1080p */
VideoProfilePortrait1080p = 1060,
/* enum_videoprofiletype_VideoProfilePortrait1080p3 */
VideoProfilePortrait1080p3 = 1062,
/* enum_videoprofiletype_VideoProfilePortrait1080p5 */
VideoProfilePortrait1080p5 = 1064,
/* enum_videoprofiletype_VideoProfilePortrait1440p */
VideoProfilePortrait1440p = 1066,
/* enum_videoprofiletype_VideoProfilePortrait1440p2 */
VideoProfilePortrait1440p2 = 1067,
/* enum_videoprofiletype_VideoProfilePortrait4k */
VideoProfilePortrait4k = 1070,
/* enum_videoprofiletype_VideoProfilePortrait4k3 */
VideoProfilePortrait4k3 = 1072,
/* enum_videoprofiletype_VideoProfileDefault */
VideoProfileDefault = 30,
}

/* class_sdkbuildinfo */
export class SDKBuildInfo {
  /* class_sdkbuildinfo_build */
  build?: number
  /* class_sdkbuildinfo_version */
  version?: string
}

/* class_videodeviceinfo */
export class VideoDeviceInfo {
  /* class_videodeviceinfo_deviceId */
  deviceId?: string
  /* class_videodeviceinfo_deviceName */
  deviceName?: string
}

/* class_audiodeviceinfo */
export class AudioDeviceInfo {
  /* class_audiodeviceinfo_deviceId */
  deviceId?: string
  /* class_audiodeviceinfo_deviceName */
  deviceName?: string
}
