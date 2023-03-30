import './extension/AgoraBaseExtension';
/* enum_channelprofiletype */
export enum ChannelProfileType {
/* enum_channelprofiletype_ChannelProfileCommunication */
ChannelProfileCommunication = 0,
/* enum_channelprofiletype_ChannelProfileLiveBroadcasting */
ChannelProfileLiveBroadcasting = 1,
/* enum_channelprofiletype_ChannelProfileGame */
ChannelProfileGame = 2,
/* enum_channelprofiletype_ChannelProfileCloudGaming */
ChannelProfileCloudGaming = 3,
/* enum_channelprofiletype_ChannelProfileCommunication1v1 */
ChannelProfileCommunication1v1 = 4,
}

/* enum_warncodetype */
export enum WarnCodeType {
/* enum_warncodetype_WarnInvalidView */
WarnInvalidView = 8,
/* enum_warncodetype_WarnInitVideo */
WarnInitVideo = 16,
/* enum_warncodetype_WarnPending */
WarnPending = 20,
/* enum_warncodetype_WarnNoAvailableChannel */
WarnNoAvailableChannel = 103,
/* enum_warncodetype_WarnLookupChannelTimeout */
WarnLookupChannelTimeout = 104,
/* enum_warncodetype_WarnLookupChannelRejected */
WarnLookupChannelRejected = 105,
/* enum_warncodetype_WarnOpenChannelTimeout */
WarnOpenChannelTimeout = 106,
/* enum_warncodetype_WarnOpenChannelRejected */
WarnOpenChannelRejected = 107,
/* enum_warncodetype_WarnSwitchLiveVideoTimeout */
WarnSwitchLiveVideoTimeout = 111,
/* enum_warncodetype_WarnSetClientRoleTimeout */
WarnSetClientRoleTimeout = 118,
/* enum_warncodetype_WarnOpenChannelInvalidTicket */
WarnOpenChannelInvalidTicket = 121,
/* enum_warncodetype_WarnOpenChannelTryNextVos */
WarnOpenChannelTryNextVos = 122,
/* enum_warncodetype_WarnChannelConnectionUnrecoverable */
WarnChannelConnectionUnrecoverable = 131,
/* enum_warncodetype_WarnChannelConnectionIpChanged */
WarnChannelConnectionIpChanged = 132,
/* enum_warncodetype_WarnChannelConnectionPortChanged */
WarnChannelConnectionPortChanged = 133,
/* enum_warncodetype_WarnChannelSocketError */
WarnChannelSocketError = 134,
/* enum_warncodetype_WarnAudioMixingOpenError */
WarnAudioMixingOpenError = 701,
/* enum_warncodetype_WarnAdmRuntimePlayoutWarning */
WarnAdmRuntimePlayoutWarning = 1014,
/* enum_warncodetype_WarnAdmRuntimeRecordingWarning */
WarnAdmRuntimeRecordingWarning = 1016,
/* enum_warncodetype_WarnAdmRecordAudioSilence */
WarnAdmRecordAudioSilence = 1019,
/* enum_warncodetype_WarnAdmPlayoutMalfunction */
WarnAdmPlayoutMalfunction = 1020,
/* enum_warncodetype_WarnAdmRecordMalfunction */
WarnAdmRecordMalfunction = 1021,
/* enum_warncodetype_WarnAdmRecordAudioLowlevel */
WarnAdmRecordAudioLowlevel = 1031,
/* enum_warncodetype_WarnAdmPlayoutAudioLowlevel */
WarnAdmPlayoutAudioLowlevel = 1032,
/* enum_warncodetype_WarnAdmWindowsNoDataReadyEvent */
WarnAdmWindowsNoDataReadyEvent = 1040,
/* enum_warncodetype_WarnApmHowling */
WarnApmHowling = 1051,
/* enum_warncodetype_WarnAdmGlitchState */
WarnAdmGlitchState = 1052,
/* enum_warncodetype_WarnAdmImproperSettings */
WarnAdmImproperSettings = 1053,
/* enum_warncodetype_WarnAdmWinCoreNoRecordingDevice */
WarnAdmWinCoreNoRecordingDevice = 1322,
/* enum_warncodetype_WarnAdmWinCoreNoPlayoutDevice */
WarnAdmWinCoreNoPlayoutDevice = 1323,
/* enum_warncodetype_WarnAdmWinCoreImproperCaptureRelease */
WarnAdmWinCoreImproperCaptureRelease = 1324,
}

/* enum_errorcodetype */
export enum ErrorCodeType {
/* enum_errorcodetype_ErrOk */
ErrOk = 0,
/* enum_errorcodetype_ErrFailed */
ErrFailed = 1,
/* enum_errorcodetype_ErrInvalidArgument */
ErrInvalidArgument = 2,
/* enum_errorcodetype_ErrNotReady */
ErrNotReady = 3,
/* enum_errorcodetype_ErrNotSupported */
ErrNotSupported = 4,
/* enum_errorcodetype_ErrRefused */
ErrRefused = 5,
/* enum_errorcodetype_ErrBufferTooSmall */
ErrBufferTooSmall = 6,
/* enum_errorcodetype_ErrNotInitialized */
ErrNotInitialized = 7,
/* enum_errorcodetype_ErrInvalidState */
ErrInvalidState = 8,
/* enum_errorcodetype_ErrNoPermission */
ErrNoPermission = 9,
/* enum_errorcodetype_ErrTimedout */
ErrTimedout = 10,
/* enum_errorcodetype_ErrCanceled */
ErrCanceled = 11,
/* enum_errorcodetype_ErrTooOften */
ErrTooOften = 12,
/* enum_errorcodetype_ErrBindSocket */
ErrBindSocket = 13,
/* enum_errorcodetype_ErrNetDown */
ErrNetDown = 14,
/* enum_errorcodetype_ErrJoinChannelRejected */
ErrJoinChannelRejected = 17,
/* enum_errorcodetype_ErrLeaveChannelRejected */
ErrLeaveChannelRejected = 18,
/* enum_errorcodetype_ErrAlreadyInUse */
ErrAlreadyInUse = 19,
/* enum_errorcodetype_ErrAborted */
ErrAborted = 20,
/* enum_errorcodetype_ErrInitNetEngine */
ErrInitNetEngine = 21,
/* enum_errorcodetype_ErrResourceLimited */
ErrResourceLimited = 22,
/* enum_errorcodetype_ErrInvalidAppId */
ErrInvalidAppId = 101,
/* enum_errorcodetype_ErrInvalidChannelName */
ErrInvalidChannelName = 102,
/* enum_errorcodetype_ErrNoServerResources */
ErrNoServerResources = 103,
/* enum_errorcodetype_ErrTokenExpired */
ErrTokenExpired = 109,
/* enum_errorcodetype_ErrInvalidToken */
ErrInvalidToken = 110,
/* enum_errorcodetype_ErrConnectionInterrupted */
ErrConnectionInterrupted = 111,
/* enum_errorcodetype_ErrConnectionLost */
ErrConnectionLost = 112,
/* enum_errorcodetype_ErrNotInChannel */
ErrNotInChannel = 113,
/* enum_errorcodetype_ErrSizeTooLarge */
ErrSizeTooLarge = 114,
/* enum_errorcodetype_ErrBitrateLimit */
ErrBitrateLimit = 115,
/* enum_errorcodetype_ErrTooManyDataStreams */
ErrTooManyDataStreams = 116,
/* enum_errorcodetype_ErrStreamMessageTimeout */
ErrStreamMessageTimeout = 117,
/* enum_errorcodetype_ErrSetClientRoleNotAuthorized */
ErrSetClientRoleNotAuthorized = 119,
/* enum_errorcodetype_ErrDecryptionFailed */
ErrDecryptionFailed = 120,
/* enum_errorcodetype_ErrInvalidUserId */
ErrInvalidUserId = 121,
/* enum_errorcodetype_ErrClientIsBannedByServer */
ErrClientIsBannedByServer = 123,
/* enum_errorcodetype_ErrEncryptedStreamNotAllowedPublish */
ErrEncryptedStreamNotAllowedPublish = 130,
/* enum_errorcodetype_ErrLicenseCredentialInvalid */
ErrLicenseCredentialInvalid = 131,
/* enum_errorcodetype_ErrInvalidUserAccount */
ErrInvalidUserAccount = 134,
/* enum_errorcodetype_ErrModuleNotFound */
ErrModuleNotFound = 157,
/* enum_errorcodetype_ErrCertRaw */
ErrCertRaw = 157,
/* enum_errorcodetype_ErrCertJsonPart */
ErrCertJsonPart = 158,
/* enum_errorcodetype_ErrCertJsonInval */
ErrCertJsonInval = 159,
/* enum_errorcodetype_ErrCertJsonNomem */
ErrCertJsonNomem = 160,
/* enum_errorcodetype_ErrCertCustom */
ErrCertCustom = 161,
/* enum_errorcodetype_ErrCertCredential */
ErrCertCredential = 162,
/* enum_errorcodetype_ErrCertSign */
ErrCertSign = 163,
/* enum_errorcodetype_ErrCertFail */
ErrCertFail = 164,
/* enum_errorcodetype_ErrCertBuf */
ErrCertBuf = 165,
/* enum_errorcodetype_ErrCertNull */
ErrCertNull = 166,
/* enum_errorcodetype_ErrCertDuedate */
ErrCertDuedate = 167,
/* enum_errorcodetype_ErrCertRequest */
ErrCertRequest = 168,
/* enum_errorcodetype_ErrPcmsendFormat */
ErrPcmsendFormat = 200,
/* enum_errorcodetype_ErrPcmsendBufferoverflow */
ErrPcmsendBufferoverflow = 201,
/* enum_errorcodetype_ErrLoginAlreadyLogin */
ErrLoginAlreadyLogin = 428,
/* enum_errorcodetype_ErrLoadMediaEngine */
ErrLoadMediaEngine = 1001,
/* enum_errorcodetype_ErrAdmGeneralError */
ErrAdmGeneralError = 1005,
/* enum_errorcodetype_ErrAdmInitPlayout */
ErrAdmInitPlayout = 1008,
/* enum_errorcodetype_ErrAdmStartPlayout */
ErrAdmStartPlayout = 1009,
/* enum_errorcodetype_ErrAdmStopPlayout */
ErrAdmStopPlayout = 1010,
/* enum_errorcodetype_ErrAdmInitRecording */
ErrAdmInitRecording = 1011,
/* enum_errorcodetype_ErrAdmStartRecording */
ErrAdmStartRecording = 1012,
/* enum_errorcodetype_ErrAdmStopRecording */
ErrAdmStopRecording = 1013,
/* enum_errorcodetype_ErrVdmCameraNotAuthorized */
ErrVdmCameraNotAuthorized = 1501,
}

/* enum_licenseerrortype */
export enum LicenseErrorType {
/* enum_licenseerrortype_LicenseErrInvalid */
LicenseErrInvalid = 1,
/* enum_licenseerrortype_LicenseErrExpire */
LicenseErrExpire = 2,
/* enum_licenseerrortype_LicenseErrMinutesExceed */
LicenseErrMinutesExceed = 3,
/* enum_licenseerrortype_LicenseErrLimitedPeriod */
LicenseErrLimitedPeriod = 4,
/* enum_licenseerrortype_LicenseErrDiffDevices */
LicenseErrDiffDevices = 5,
/* enum_licenseerrortype_LicenseErrInternal */
LicenseErrInternal = 99,
}

/* enum_audiosessionoperationrestriction */
export enum AudioSessionOperationRestriction {
/* enum_audiosessionoperationrestriction_AudioSessionOperationRestrictionNone */
AudioSessionOperationRestrictionNone = 0,
/* enum_audiosessionoperationrestriction_AudioSessionOperationRestrictionSetCategory */
AudioSessionOperationRestrictionSetCategory = 1,
/* enum_audiosessionoperationrestriction_AudioSessionOperationRestrictionConfigureSession */
AudioSessionOperationRestrictionConfigureSession = 1<<1,
/* enum_audiosessionoperationrestriction_AudioSessionOperationRestrictionDeactivateSession */
AudioSessionOperationRestrictionDeactivateSession = 1<<2,
/* enum_audiosessionoperationrestriction_AudioSessionOperationRestrictionAll */
AudioSessionOperationRestrictionAll = 1<<7,
}

/* enum_userofflinereasontype */
export enum UserOfflineReasonType {
/* enum_userofflinereasontype_UserOfflineQuit */
UserOfflineQuit = 0,
/* enum_userofflinereasontype_UserOfflineDropped */
UserOfflineDropped = 1,
/* enum_userofflinereasontype_UserOfflineBecomeAudience */
UserOfflineBecomeAudience = 2,
}

/* enum_interfaceidtype */
export enum InterfaceIdType {
/* enum_interfaceidtype_AgoraIidAudioDeviceManager */
AgoraIidAudioDeviceManager = 1,
/* enum_interfaceidtype_AgoraIidVideoDeviceManager */
AgoraIidVideoDeviceManager = 2,
/* enum_interfaceidtype_AgoraIidParameterEngine */
AgoraIidParameterEngine = 3,
/* enum_interfaceidtype_AgoraIidMediaEngine */
AgoraIidMediaEngine = 4,
/* enum_interfaceidtype_AgoraIidAudioEngine */
AgoraIidAudioEngine = 5,
/* enum_interfaceidtype_AgoraIidVideoEngine */
AgoraIidVideoEngine = 6,
/* enum_interfaceidtype_AgoraIidRtcConnection */
AgoraIidRtcConnection = 7,
/* enum_interfaceidtype_AgoraIidSignalingEngine */
AgoraIidSignalingEngine = 8,
/* enum_interfaceidtype_AgoraIidMediaEngineRegulator */
AgoraIidMediaEngineRegulator = 9,
/* enum_interfaceidtype_AgoraIidCloudSpatialAudio */
AgoraIidCloudSpatialAudio = 10,
/* enum_interfaceidtype_AgoraIidLocalSpatialAudio */
AgoraIidLocalSpatialAudio = 11,
/* enum_interfaceidtype_AgoraIidMediaRecorder */
AgoraIidMediaRecorder = 12,
/* enum_interfaceidtype_AgoraIidStateSync */
AgoraIidStateSync = 13,
/* enum_interfaceidtype_AgoraIidMetachatService */
AgoraIidMetachatService = 14,
/* enum_interfaceidtype_AgoraIidMusicContentCenter */
AgoraIidMusicContentCenter = 15,
}

/* enum_qualitytype */
export enum QualityType {
/* enum_qualitytype_QualityUnknown */
QualityUnknown = 0,
/* enum_qualitytype_QualityExcellent */
QualityExcellent = 1,
/* enum_qualitytype_QualityGood */
QualityGood = 2,
/* enum_qualitytype_QualityPoor */
QualityPoor = 3,
/* enum_qualitytype_QualityBad */
QualityBad = 4,
/* enum_qualitytype_QualityVbad */
QualityVbad = 5,
/* enum_qualitytype_QualityDown */
QualityDown = 6,
/* enum_qualitytype_QualityUnsupported */
QualityUnsupported = 7,
/* enum_qualitytype_QualityDetecting */
QualityDetecting = 8,
}

/* enum_fitmodetype */
export enum FitModeType {
/* enum_fitmodetype_ModeCover */
ModeCover = 1,
/* enum_fitmodetype_ModeContain */
ModeContain = 2,
}

/* enum_videoorientation */
export enum VideoOrientation {
/* enum_videoorientation_VideoOrientation0 */
VideoOrientation0 = 0,
/* enum_videoorientation_VideoOrientation90 */
VideoOrientation90 = 90,
/* enum_videoorientation_VideoOrientation180 */
VideoOrientation180 = 180,
/* enum_videoorientation_VideoOrientation270 */
VideoOrientation270 = 270,
}

/* enum_framerate */
export enum FrameRate {
/* enum_framerate_FrameRateFps1 */
FrameRateFps1 = 1,
/* enum_framerate_FrameRateFps7 */
FrameRateFps7 = 7,
/* enum_framerate_FrameRateFps10 */
FrameRateFps10 = 10,
/* enum_framerate_FrameRateFps15 */
FrameRateFps15 = 15,
/* enum_framerate_FrameRateFps24 */
FrameRateFps24 = 24,
/* enum_framerate_FrameRateFps30 */
FrameRateFps30 = 30,
/* enum_framerate_FrameRateFps60 */
FrameRateFps60 = 60,
}

/* enum_framewidth */
export enum FrameWidth {
/* enum_framewidth_FrameWidth640 */
FrameWidth640 = 640,
}

/* enum_frameheight */
export enum FrameHeight {
/* enum_frameheight_FrameHeight360 */
FrameHeight360 = 360,
}

/* enum_videoframetype */
export enum VideoFrameType {
/* enum_videoframetype_VideoFrameTypeBlankFrame */
VideoFrameTypeBlankFrame = 0,
/* enum_videoframetype_VideoFrameTypeKeyFrame */
VideoFrameTypeKeyFrame = 3,
/* enum_videoframetype_VideoFrameTypeDeltaFrame */
VideoFrameTypeDeltaFrame = 4,
/* enum_videoframetype_VideoFrameTypeBFrame */
VideoFrameTypeBFrame = 5,
/* enum_videoframetype_VideoFrameTypeDroppableFrame */
VideoFrameTypeDroppableFrame = 6,
/* enum_videoframetype_VideoFrameTypeUnknow */
VideoFrameTypeUnknow = 7,
}

/* enum_orientationmode */
export enum OrientationMode {
/* enum_orientationmode_OrientationModeAdaptive */
OrientationModeAdaptive = 0,
/* enum_orientationmode_OrientationModeFixedLandscape */
OrientationModeFixedLandscape = 1,
/* enum_orientationmode_OrientationModeFixedPortrait */
OrientationModeFixedPortrait = 2,
}

/* enum_degradationpreference */
export enum DegradationPreference {
/* enum_degradationpreference_MaintainQuality */
MaintainQuality = 0,
/* enum_degradationpreference_MaintainFramerate */
MaintainFramerate = 1,
/* enum_degradationpreference_MaintainBalanced */
MaintainBalanced = 2,
/* enum_degradationpreference_MaintainResolution */
MaintainResolution = 3,
/* enum_degradationpreference_Disabled */
Disabled = 100,
}

/* class_videodimensions */
export class VideoDimensions {
  /* class_videodimensions_width */
  width?: number
  /* class_videodimensions_height */
  height?: number
}

/* enum_videocodectype */
export enum VideoCodecType {
/* enum_videocodectype_VideoCodecNone */
VideoCodecNone = 0,
/* enum_videocodectype_VideoCodecVp8 */
VideoCodecVp8 = 1,
/* enum_videocodectype_VideoCodecH264 */
VideoCodecH264 = 2,
/* enum_videocodectype_VideoCodecH265 */
VideoCodecH265 = 3,
/* enum_videocodectype_VideoCodecGeneric */
VideoCodecGeneric = 6,
/* enum_videocodectype_VideoCodecGenericH264 */
VideoCodecGenericH264 = 7,
/* enum_videocodectype_VideoCodecAv1 */
VideoCodecAv1 = 12,
/* enum_videocodectype_VideoCodecVp9 */
VideoCodecVp9 = 13,
/* enum_videocodectype_VideoCodecGenericJpeg */
VideoCodecGenericJpeg = 20,
}

/* enum_tccmode */
export enum TCcMode {
/* enum_tccmode_CcEnabled */
CcEnabled = 0,
/* enum_tccmode_CcDisabled */
CcDisabled = 1,
}

/* class_senderoptions */
export class SenderOptions {
  /* class_senderoptions_ccMode */
  ccMode?: TCcMode
  /* class_senderoptions_codecType */
  codecType?: VideoCodecType
  /* class_senderoptions_targetBitrate */
  targetBitrate?: number
}

/* enum_audiocodectype */
export enum AudioCodecType {
/* enum_audiocodectype_AudioCodecOpus */
AudioCodecOpus = 1,
/* enum_audiocodectype_AudioCodecPcma */
AudioCodecPcma = 3,
/* enum_audiocodectype_AudioCodecPcmu */
AudioCodecPcmu = 4,
/* enum_audiocodectype_AudioCodecG722 */
AudioCodecG722 = 5,
/* enum_audiocodectype_AudioCodecAaclc */
AudioCodecAaclc = 8,
/* enum_audiocodectype_AudioCodecHeaac */
AudioCodecHeaac = 9,
/* enum_audiocodectype_AudioCodecJc1 */
AudioCodecJc1 = 10,
/* enum_audiocodectype_AudioCodecHeaac2 */
AudioCodecHeaac2 = 11,
/* enum_audiocodectype_AudioCodecLpcnet */
AudioCodecLpcnet = 12,
}

/* enum_audioencodingtype */
export enum AudioEncodingType {
/* enum_audioencodingtype_AudioEncodingTypeAac16000Low */
AudioEncodingTypeAac16000Low = 0x010101,
/* enum_audioencodingtype_AudioEncodingTypeAac16000Medium */
AudioEncodingTypeAac16000Medium = 0x010102,
/* enum_audioencodingtype_AudioEncodingTypeAac32000Low */
AudioEncodingTypeAac32000Low = 0x010201,
/* enum_audioencodingtype_AudioEncodingTypeAac32000Medium */
AudioEncodingTypeAac32000Medium = 0x010202,
/* enum_audioencodingtype_AudioEncodingTypeAac32000High */
AudioEncodingTypeAac32000High = 0x010203,
/* enum_audioencodingtype_AudioEncodingTypeAac48000Medium */
AudioEncodingTypeAac48000Medium = 0x010302,
/* enum_audioencodingtype_AudioEncodingTypeAac48000High */
AudioEncodingTypeAac48000High = 0x010303,
/* enum_audioencodingtype_AudioEncodingTypeOpus16000Low */
AudioEncodingTypeOpus16000Low = 0x020101,
/* enum_audioencodingtype_AudioEncodingTypeOpus16000Medium */
AudioEncodingTypeOpus16000Medium = 0x020102,
/* enum_audioencodingtype_AudioEncodingTypeOpus48000Medium */
AudioEncodingTypeOpus48000Medium = 0x020302,
/* enum_audioencodingtype_AudioEncodingTypeOpus48000High */
AudioEncodingTypeOpus48000High = 0x020303,
}

/* enum_watermarkfitmode */
export enum WatermarkFitMode {
/* enum_watermarkfitmode_FitModeCoverPosition */
FitModeCoverPosition = 0,
/* enum_watermarkfitmode_FitModeUseImageRatio */
FitModeUseImageRatio = 1,
}

/* class_encodedaudioframeadvancedsettings */
export class EncodedAudioFrameAdvancedSettings {
  /* class_encodedaudioframeadvancedsettings_speech */
  speech?: boolean
  /* class_encodedaudioframeadvancedsettings_sendEvenIfEmpty */
  sendEvenIfEmpty?: boolean
}

/* class_encodedaudioframeinfo */
export class EncodedAudioFrameInfo {
  /* class_encodedaudioframeinfo_codec */
  codec?: AudioCodecType
  /* class_encodedaudioframeinfo_sampleRateHz */
  sampleRateHz?: number
  /* class_encodedaudioframeinfo_samplesPerChannel */
  samplesPerChannel?: number
  /* class_encodedaudioframeinfo_numberOfChannels */
  numberOfChannels?: number
  /* class_encodedaudioframeinfo_advancedSettings */
  advancedSettings?: EncodedAudioFrameAdvancedSettings
  /* class_encodedaudioframeinfo_captureTimeMs */
  captureTimeMs?: number
}

/* class_audiopcmdatainfo */
export class AudioPcmDataInfo {
  /* class_audiopcmdatainfo_samplesPerChannel */
  samplesPerChannel?: number
  /* class_audiopcmdatainfo_channelNum */
  channelNum?: number
  /* class_audiopcmdatainfo_samplesOut */
  samplesOut?: number
  /* class_audiopcmdatainfo_elapsedTimeMs */
  elapsedTimeMs?: number
  /* class_audiopcmdatainfo_ntpTimeMs */
  ntpTimeMs?: number
}

/* enum_h264packetizemode */
export enum H264PacketizeMode {
/* enum_h264packetizemode_NonInterleaved */
NonInterleaved = 0,
/* enum_h264packetizemode_SingleNalUnit */
SingleNalUnit = 1,
}

/* enum_videostreamtype */
export enum VideoStreamType {
/* enum_videostreamtype_VideoStreamHigh */
VideoStreamHigh = 0,
/* enum_videostreamtype_VideoStreamLow */
VideoStreamLow = 1,
}

/* class_videosubscriptionoptions */
export class VideoSubscriptionOptions {
  /* class_videosubscriptionoptions_type */
  type?: VideoStreamType
  /* class_videosubscriptionoptions_encodedFrameOnly */
  encodedFrameOnly?: boolean
}

/* class_encodedvideoframeinfo */
export class EncodedVideoFrameInfo {
  /* class_encodedvideoframeinfo_codecType */
  codecType?: VideoCodecType
  /* class_encodedvideoframeinfo_width */
  width?: number
  /* class_encodedvideoframeinfo_height */
  height?: number
  /* class_encodedvideoframeinfo_framesPerSecond */
  framesPerSecond?: number
  /* class_encodedvideoframeinfo_frameType */
  frameType?: VideoFrameType
  /* class_encodedvideoframeinfo_rotation */
  rotation?: VideoOrientation
  /* class_encodedvideoframeinfo_trackId */
  trackId?: number
  /* class_encodedvideoframeinfo_captureTimeMs */
  captureTimeMs?: number
  /* class_encodedvideoframeinfo_decodeTimeMs */
  decodeTimeMs?: number
  /* class_encodedvideoframeinfo_uid */
  uid?: number
  /* class_encodedvideoframeinfo_streamType */
  streamType?: VideoStreamType
}

/* enum_compressionpreference */
export enum CompressionPreference {
/* enum_compressionpreference_PreferLowLatency */
PreferLowLatency = 0,
/* enum_compressionpreference_PreferQuality */
PreferQuality = 1,
}

/* enum_encodingpreference */
export enum EncodingPreference {
/* enum_encodingpreference_PreferAuto */
PreferAuto = -1,
/* enum_encodingpreference_PreferSoftware */
PreferSoftware = 0,
/* enum_encodingpreference_PreferHardware */
PreferHardware = 1,
}

/* class_advanceoptions */
export class AdvanceOptions {
  /* class_advanceoptions_encodingPreference */
  encodingPreference?: EncodingPreference
  /* class_advanceoptions_compressionPreference */
  compressionPreference?: CompressionPreference
}

/* enum_videomirrormodetype */
export enum VideoMirrorModeType {
/* enum_videomirrormodetype_VideoMirrorModeAuto */
VideoMirrorModeAuto = 0,
/* enum_videomirrormodetype_VideoMirrorModeEnabled */
VideoMirrorModeEnabled = 1,
/* enum_videomirrormodetype_VideoMirrorModeDisabled */
VideoMirrorModeDisabled = 2,
}

/* class_videoencoderconfiguration */
export class VideoEncoderConfiguration {
  /* class_videoencoderconfiguration_codecType */
  codecType?: VideoCodecType
  /* class_videoencoderconfiguration_dimensions */
  dimensions?: VideoDimensions
  /* class_videoencoderconfiguration_frameRate */
  frameRate?: number
  /* class_videoencoderconfiguration_bitrate */
  bitrate?: number
  /* class_videoencoderconfiguration_minBitrate */
  minBitrate?: number
  /* class_videoencoderconfiguration_orientationMode */
  orientationMode?: OrientationMode
  /* class_videoencoderconfiguration_degradationPreference */
  degradationPreference?: DegradationPreference
  /* class_videoencoderconfiguration_mirrorMode */
  mirrorMode?: VideoMirrorModeType
  /* class_videoencoderconfiguration_advanceOptions */
  advanceOptions?: AdvanceOptions
}

/* class_datastreamconfig */
export class DataStreamConfig {
  /* class_datastreamconfig_syncWithAudio */
  syncWithAudio?: boolean
  /* class_datastreamconfig_ordered */
  ordered?: boolean
}

/* enum_simulcaststreammode */
export enum SimulcastStreamMode {
/* enum_simulcaststreammode_AutoSimulcastStream */
AutoSimulcastStream = -1,
/* enum_simulcaststreammode_DisableSimulcastStream */
DisableSimulcastStream = 0,
/* enum_simulcaststreammode_EnableSimulcastStream */
EnableSimulcastStream = 1,
}

/* class_simulcaststreamconfig */
export class SimulcastStreamConfig {
  /* class_simulcaststreamconfig_dimensions */
  dimensions?: VideoDimensions
  /* class_simulcaststreamconfig_kBitrate */
  kBitrate?: number
  /* class_simulcaststreamconfig_framerate */
  framerate?: number
}

/* class_rectangle */
export class Rectangle {
  /* class_rectangle_x */
  x?: number
  /* class_rectangle_y */
  y?: number
  /* class_rectangle_width */
  width?: number
  /* class_rectangle_height */
  height?: number
}

/* class_watermarkratio */
export class WatermarkRatio {
  /* class_watermarkratio_xRatio */
  xRatio?: number
  /* class_watermarkratio_yRatio */
  yRatio?: number
  /* class_watermarkratio_widthRatio */
  widthRatio?: number
}

/* class_watermarkoptions */
export class WatermarkOptions {
  /* class_watermarkoptions_visibleInPreview */
  visibleInPreview?: boolean
  /* class_watermarkoptions_positionInLandscapeMode */
  positionInLandscapeMode?: Rectangle
  /* class_watermarkoptions_positionInPortraitMode */
  positionInPortraitMode?: Rectangle
  /* class_watermarkoptions_watermarkRatio */
  watermarkRatio?: WatermarkRatio
  /* class_watermarkoptions_mode */
  mode?: WatermarkFitMode
}

/* class_rtcstats */
export class RtcStats {
  /* class_rtcstats_duration */
  duration?: number
  /* class_rtcstats_txBytes */
  txBytes?: number
  /* class_rtcstats_rxBytes */
  rxBytes?: number
  /* class_rtcstats_txAudioBytes */
  txAudioBytes?: number
  /* class_rtcstats_txVideoBytes */
  txVideoBytes?: number
  /* class_rtcstats_rxAudioBytes */
  rxAudioBytes?: number
  /* class_rtcstats_rxVideoBytes */
  rxVideoBytes?: number
  /* class_rtcstats_txKBitRate */
  txKBitRate?: number
  /* class_rtcstats_rxKBitRate */
  rxKBitRate?: number
  /* class_rtcstats_rxAudioKBitRate */
  rxAudioKBitRate?: number
  /* class_rtcstats_txAudioKBitRate */
  txAudioKBitRate?: number
  /* class_rtcstats_rxVideoKBitRate */
  rxVideoKBitRate?: number
  /* class_rtcstats_txVideoKBitRate */
  txVideoKBitRate?: number
  /* class_rtcstats_lastmileDelay */
  lastmileDelay?: number
  /* class_rtcstats_userCount */
  userCount?: number
  /* class_rtcstats_cpuAppUsage */
  cpuAppUsage?: number
  /* class_rtcstats_cpuTotalUsage */
  cpuTotalUsage?: number
  /* class_rtcstats_gatewayRtt */
  gatewayRtt?: number
  /* class_rtcstats_memoryAppUsageRatio */
  memoryAppUsageRatio?: number
  /* class_rtcstats_memoryTotalUsageRatio */
  memoryTotalUsageRatio?: number
  /* class_rtcstats_memoryAppUsageInKbytes */
  memoryAppUsageInKbytes?: number
  /* class_rtcstats_connectTimeMs */
  connectTimeMs?: number
  /* class_rtcstats_firstAudioPacketDuration */
  firstAudioPacketDuration?: number
  /* class_rtcstats_firstVideoPacketDuration */
  firstVideoPacketDuration?: number
  /* class_rtcstats_firstVideoKeyFramePacketDuration */
  firstVideoKeyFramePacketDuration?: number
  /* class_rtcstats_packetsBeforeFirstKeyFramePacket */
  packetsBeforeFirstKeyFramePacket?: number
  /* class_rtcstats_firstAudioPacketDurationAfterUnmute */
  firstAudioPacketDurationAfterUnmute?: number
  /* class_rtcstats_firstVideoPacketDurationAfterUnmute */
  firstVideoPacketDurationAfterUnmute?: number
  /* class_rtcstats_firstVideoKeyFramePacketDurationAfterUnmute */
  firstVideoKeyFramePacketDurationAfterUnmute?: number
  /* class_rtcstats_firstVideoKeyFrameDecodedDurationAfterUnmute */
  firstVideoKeyFrameDecodedDurationAfterUnmute?: number
  /* class_rtcstats_firstVideoKeyFrameRenderedDurationAfterUnmute */
  firstVideoKeyFrameRenderedDurationAfterUnmute?: number
  /* class_rtcstats_txPacketLossRate */
  txPacketLossRate?: number
  /* class_rtcstats_rxPacketLossRate */
  rxPacketLossRate?: number
}

/* enum_videosourcetype */
export enum VideoSourceType {
/* enum_videosourcetype_VideoSourceCameraPrimary */
VideoSourceCameraPrimary = 0,
/* enum_videosourcetype_VideoSourceCamera */
VideoSourceCamera = 0,
/* enum_videosourcetype_VideoSourceCameraSecondary */
VideoSourceCameraSecondary = 1,
/* enum_videosourcetype_VideoSourceScreenPrimary */
VideoSourceScreenPrimary = 2,
/* enum_videosourcetype_VideoSourceScreen */
VideoSourceScreen = 2,
/* enum_videosourcetype_VideoSourceScreenSecondary */
VideoSourceScreenSecondary = 3,
/* enum_videosourcetype_VideoSourceCustom */
VideoSourceCustom = 4,
/* enum_videosourcetype_VideoSourceMediaPlayer */
VideoSourceMediaPlayer = 5,
/* enum_videosourcetype_VideoSourceRtcImagePng */
VideoSourceRtcImagePng = 6,
/* enum_videosourcetype_VideoSourceRtcImageJpeg */
VideoSourceRtcImageJpeg = 7,
/* enum_videosourcetype_VideoSourceRtcImageGif */
VideoSourceRtcImageGif = 8,
/* enum_videosourcetype_VideoSourceRemote */
VideoSourceRemote = 9,
/* enum_videosourcetype_VideoSourceTranscoded */
VideoSourceTranscoded = 10,
/* enum_videosourcetype_VideoSourceUnknown */
VideoSourceUnknown = 100,
}

/* enum_clientroletype */
export enum ClientRoleType {
/* enum_clientroletype_ClientRoleBroadcaster */
ClientRoleBroadcaster = 1,
/* enum_clientroletype_ClientRoleAudience */
ClientRoleAudience = 2,
}

/* enum_qualityadaptindication */
export enum QualityAdaptIndication {
/* enum_qualityadaptindication_AdaptNone */
AdaptNone = 0,
/* enum_qualityadaptindication_AdaptUpBandwidth */
AdaptUpBandwidth = 1,
/* enum_qualityadaptindication_AdaptDownBandwidth */
AdaptDownBandwidth = 2,
}

/* enum_audiencelatencyleveltype */
export enum AudienceLatencyLevelType {
/* enum_audiencelatencyleveltype_AudienceLatencyLevelLowLatency */
AudienceLatencyLevelLowLatency = 1,
/* enum_audiencelatencyleveltype_AudienceLatencyLevelUltraLowLatency */
AudienceLatencyLevelUltraLowLatency = 2,
}

/* class_clientroleoptions */
export class ClientRoleOptions {
  /* class_clientroleoptions_audienceLatencyLevel */
  audienceLatencyLevel?: AudienceLatencyLevelType
}

/* enum_experiencequalitytype */
export enum ExperienceQualityType {
/* enum_experiencequalitytype_ExperienceQualityGood */
ExperienceQualityGood = 0,
/* enum_experiencequalitytype_ExperienceQualityBad */
ExperienceQualityBad = 1,
}

/* enum_experiencepoorreason */
export enum ExperiencePoorReason {
/* enum_experiencepoorreason_ExperienceReasonNone */
ExperienceReasonNone = 0,
/* enum_experiencepoorreason_RemoteNetworkQualityPoor */
RemoteNetworkQualityPoor = 1,
/* enum_experiencepoorreason_LocalNetworkQualityPoor */
LocalNetworkQualityPoor = 2,
/* enum_experiencepoorreason_WirelessSignalPoor */
WirelessSignalPoor = 4,
/* enum_experiencepoorreason_WifiBluetoothCoexist */
WifiBluetoothCoexist = 8,
}

/* class_remoteaudiostats */
export class RemoteAudioStats {
  /* class_remoteaudiostats_uid */
  uid?: number
  /* class_remoteaudiostats_quality */
  quality?: number
  /* class_remoteaudiostats_networkTransportDelay */
  networkTransportDelay?: number
  /* class_remoteaudiostats_jitterBufferDelay */
  jitterBufferDelay?: number
  /* class_remoteaudiostats_audioLossRate */
  audioLossRate?: number
  /* class_remoteaudiostats_numChannels */
  numChannels?: number
  /* class_remoteaudiostats_receivedSampleRate */
  receivedSampleRate?: number
  /* class_remoteaudiostats_receivedBitrate */
  receivedBitrate?: number
  /* class_remoteaudiostats_totalFrozenTime */
  totalFrozenTime?: number
  /* class_remoteaudiostats_frozenRate */
  frozenRate?: number
  /* class_remoteaudiostats_mosValue */
  mosValue?: number
  /* class_remoteaudiostats_totalActiveTime */
  totalActiveTime?: number
  /* class_remoteaudiostats_publishDuration */
  publishDuration?: number
  /* class_remoteaudiostats_qoeQuality */
  qoeQuality?: number
  /* class_remoteaudiostats_qualityChangedReason */
  qualityChangedReason?: number
}

/* enum_audioprofiletype */
export enum AudioProfileType {
/* enum_audioprofiletype_AudioProfileDefault */
AudioProfileDefault = 0,
/* enum_audioprofiletype_AudioProfileSpeechStandard */
AudioProfileSpeechStandard = 1,
/* enum_audioprofiletype_AudioProfileMusicStandard */
AudioProfileMusicStandard = 2,
/* enum_audioprofiletype_AudioProfileMusicStandardStereo */
AudioProfileMusicStandardStereo = 3,
/* enum_audioprofiletype_AudioProfileMusicHighQuality */
AudioProfileMusicHighQuality = 4,
/* enum_audioprofiletype_AudioProfileMusicHighQualityStereo */
AudioProfileMusicHighQualityStereo = 5,
/* enum_audioprofiletype_AudioProfileIot */
AudioProfileIot = 6,
/* enum_audioprofiletype_AudioProfileNum */
AudioProfileNum = 7,
}

/* enum_audioscenariotype */
export enum AudioScenarioType {
/* enum_audioscenariotype_AudioScenarioDefault */
AudioScenarioDefault = 0,
/* enum_audioscenariotype_AudioScenarioGameStreaming */
AudioScenarioGameStreaming = 3,
/* enum_audioscenariotype_AudioScenarioChatroom */
AudioScenarioChatroom = 5,
/* enum_audioscenariotype_AudioScenarioChorus */
AudioScenarioChorus = 7,
/* enum_audioscenariotype_AudioScenarioMeeting */
AudioScenarioMeeting = 8,
/* enum_audioscenariotype_AudioScenarioNum */
AudioScenarioNum = 9,
}

/* class_videoformat */
export class VideoFormat {
  /* class_videoformat_width */
  width?: number
  /* class_videoformat_height */
  height?: number
  /* class_videoformat_fps */
  fps?: number
}

/* enum_videocontenthint */
export enum VideoContentHint {
/* enum_videocontenthint_ContentHintNone */
ContentHintNone = 0,
/* enum_videocontenthint_ContentHintMotion */
ContentHintMotion = 1,
/* enum_videocontenthint_ContentHintDetails */
ContentHintDetails = 2,
}

/* enum_screenscenariotype */
export enum ScreenScenarioType {
/* enum_screenscenariotype_ScreenScenarioDocument */
ScreenScenarioDocument = 1,
/* enum_screenscenariotype_ScreenScenarioGaming */
ScreenScenarioGaming = 2,
/* enum_screenscenariotype_ScreenScenarioVideo */
ScreenScenarioVideo = 3,
/* enum_screenscenariotype_ScreenScenarioRdc */
ScreenScenarioRdc = 4,
}

/* enum_capturebrightnessleveltype */
export enum CaptureBrightnessLevelType {
/* enum_capturebrightnessleveltype_CaptureBrightnessLevelInvalid */
CaptureBrightnessLevelInvalid = -1,
/* enum_capturebrightnessleveltype_CaptureBrightnessLevelNormal */
CaptureBrightnessLevelNormal = 0,
/* enum_capturebrightnessleveltype_CaptureBrightnessLevelBright */
CaptureBrightnessLevelBright = 1,
/* enum_capturebrightnessleveltype_CaptureBrightnessLevelDark */
CaptureBrightnessLevelDark = 2,
}

/* enum_localaudiostreamstate */
export enum LocalAudioStreamState {
/* enum_localaudiostreamstate_LocalAudioStreamStateStopped */
LocalAudioStreamStateStopped = 0,
/* enum_localaudiostreamstate_LocalAudioStreamStateRecording */
LocalAudioStreamStateRecording = 1,
/* enum_localaudiostreamstate_LocalAudioStreamStateEncoding */
LocalAudioStreamStateEncoding = 2,
/* enum_localaudiostreamstate_LocalAudioStreamStateFailed */
LocalAudioStreamStateFailed = 3,
}

/* enum_localaudiostreamerror */
export enum LocalAudioStreamError {
/* enum_localaudiostreamerror_LocalAudioStreamErrorOk */
LocalAudioStreamErrorOk = 0,
/* enum_localaudiostreamerror_LocalAudioStreamErrorFailure */
LocalAudioStreamErrorFailure = 1,
/* enum_localaudiostreamerror_LocalAudioStreamErrorDeviceNoPermission */
LocalAudioStreamErrorDeviceNoPermission = 2,
/* enum_localaudiostreamerror_LocalAudioStreamErrorDeviceBusy */
LocalAudioStreamErrorDeviceBusy = 3,
/* enum_localaudiostreamerror_LocalAudioStreamErrorRecordFailure */
LocalAudioStreamErrorRecordFailure = 4,
/* enum_localaudiostreamerror_LocalAudioStreamErrorEncodeFailure */
LocalAudioStreamErrorEncodeFailure = 5,
/* enum_localaudiostreamerror_LocalAudioStreamErrorNoRecordingDevice */
LocalAudioStreamErrorNoRecordingDevice = 6,
/* enum_localaudiostreamerror_LocalAudioStreamErrorNoPlayoutDevice */
LocalAudioStreamErrorNoPlayoutDevice = 7,
/* enum_localaudiostreamerror_LocalAudioStreamErrorInterrupted */
LocalAudioStreamErrorInterrupted = 8,
/* enum_localaudiostreamerror_LocalAudioStreamErrorRecordInvalidId */
LocalAudioStreamErrorRecordInvalidId = 9,
/* enum_localaudiostreamerror_LocalAudioStreamErrorPlayoutInvalidId */
LocalAudioStreamErrorPlayoutInvalidId = 10,
}

/* enum_localvideostreamstate */
export enum LocalVideoStreamState {
/* enum_localvideostreamstate_LocalVideoStreamStateStopped */
LocalVideoStreamStateStopped = 0,
/* enum_localvideostreamstate_LocalVideoStreamStateCapturing */
LocalVideoStreamStateCapturing = 1,
/* enum_localvideostreamstate_LocalVideoStreamStateEncoding */
LocalVideoStreamStateEncoding = 2,
/* enum_localvideostreamstate_LocalVideoStreamStateFailed */
LocalVideoStreamStateFailed = 3,
}

/* enum_localvideostreamerror */
export enum LocalVideoStreamError {
/* enum_localvideostreamerror_LocalVideoStreamErrorOk */
LocalVideoStreamErrorOk = 0,
/* enum_localvideostreamerror_LocalVideoStreamErrorFailure */
LocalVideoStreamErrorFailure = 1,
/* enum_localvideostreamerror_LocalVideoStreamErrorDeviceNoPermission */
LocalVideoStreamErrorDeviceNoPermission = 2,
/* enum_localvideostreamerror_LocalVideoStreamErrorDeviceBusy */
LocalVideoStreamErrorDeviceBusy = 3,
/* enum_localvideostreamerror_LocalVideoStreamErrorCaptureFailure */
LocalVideoStreamErrorCaptureFailure = 4,
/* enum_localvideostreamerror_LocalVideoStreamErrorEncodeFailure */
LocalVideoStreamErrorEncodeFailure = 5,
/* enum_localvideostreamerror_LocalVideoStreamErrorCaptureInbackground */
LocalVideoStreamErrorCaptureInbackground = 6,
/* enum_localvideostreamerror_LocalVideoStreamErrorCaptureMultipleForegroundApps */
LocalVideoStreamErrorCaptureMultipleForegroundApps = 7,
/* enum_localvideostreamerror_LocalVideoStreamErrorDeviceNotFound */
LocalVideoStreamErrorDeviceNotFound = 8,
/* enum_localvideostreamerror_LocalVideoStreamErrorDeviceDisconnected */
LocalVideoStreamErrorDeviceDisconnected = 9,
/* enum_localvideostreamerror_LocalVideoStreamErrorDeviceInvalidId */
LocalVideoStreamErrorDeviceInvalidId = 10,
/* enum_localvideostreamerror_LocalVideoStreamErrorDeviceSystemPressure */
LocalVideoStreamErrorDeviceSystemPressure = 101,
/* enum_localvideostreamerror_LocalVideoStreamErrorScreenCaptureWindowMinimized */
LocalVideoStreamErrorScreenCaptureWindowMinimized = 11,
/* enum_localvideostreamerror_LocalVideoStreamErrorScreenCaptureWindowClosed */
LocalVideoStreamErrorScreenCaptureWindowClosed = 12,
/* enum_localvideostreamerror_LocalVideoStreamErrorScreenCaptureWindowOccluded */
LocalVideoStreamErrorScreenCaptureWindowOccluded = 13,
/* enum_localvideostreamerror_LocalVideoStreamErrorScreenCaptureWindowNotSupported */
LocalVideoStreamErrorScreenCaptureWindowNotSupported = 20,
/* enum_localvideostreamerror_LocalVideoStreamErrorScreenCaptureFailure */
LocalVideoStreamErrorScreenCaptureFailure = 21,
/* enum_localvideostreamerror_LocalVideoStreamErrorScreenCaptureNoPermission */
LocalVideoStreamErrorScreenCaptureNoPermission = 22,
}

/* enum_remoteaudiostate */
export enum RemoteAudioState {
/* enum_remoteaudiostate_RemoteAudioStateStopped */
RemoteAudioStateStopped = 0,
/* enum_remoteaudiostate_RemoteAudioStateStarting */
RemoteAudioStateStarting = 1,
/* enum_remoteaudiostate_RemoteAudioStateDecoding */
RemoteAudioStateDecoding = 2,
/* enum_remoteaudiostate_RemoteAudioStateFrozen */
RemoteAudioStateFrozen = 3,
/* enum_remoteaudiostate_RemoteAudioStateFailed */
RemoteAudioStateFailed = 4,
}

/* enum_remoteaudiostatereason */
export enum RemoteAudioStateReason {
/* enum_remoteaudiostatereason_RemoteAudioReasonInternal */
RemoteAudioReasonInternal = 0,
/* enum_remoteaudiostatereason_RemoteAudioReasonNetworkCongestion */
RemoteAudioReasonNetworkCongestion = 1,
/* enum_remoteaudiostatereason_RemoteAudioReasonNetworkRecovery */
RemoteAudioReasonNetworkRecovery = 2,
/* enum_remoteaudiostatereason_RemoteAudioReasonLocalMuted */
RemoteAudioReasonLocalMuted = 3,
/* enum_remoteaudiostatereason_RemoteAudioReasonLocalUnmuted */
RemoteAudioReasonLocalUnmuted = 4,
/* enum_remoteaudiostatereason_RemoteAudioReasonRemoteMuted */
RemoteAudioReasonRemoteMuted = 5,
/* enum_remoteaudiostatereason_RemoteAudioReasonRemoteUnmuted */
RemoteAudioReasonRemoteUnmuted = 6,
/* enum_remoteaudiostatereason_RemoteAudioReasonRemoteOffline */
RemoteAudioReasonRemoteOffline = 7,
}

/* enum_remotevideostate */
export enum RemoteVideoState {
/* enum_remotevideostate_RemoteVideoStateStopped */
RemoteVideoStateStopped = 0,
/* enum_remotevideostate_RemoteVideoStateStarting */
RemoteVideoStateStarting = 1,
/* enum_remotevideostate_RemoteVideoStateDecoding */
RemoteVideoStateDecoding = 2,
/* enum_remotevideostate_RemoteVideoStateFrozen */
RemoteVideoStateFrozen = 3,
/* enum_remotevideostate_RemoteVideoStateFailed */
RemoteVideoStateFailed = 4,
}

/* enum_remotevideostatereason */
export enum RemoteVideoStateReason {
/* enum_remotevideostatereason_RemoteVideoStateReasonInternal */
RemoteVideoStateReasonInternal = 0,
/* enum_remotevideostatereason_RemoteVideoStateReasonNetworkCongestion */
RemoteVideoStateReasonNetworkCongestion = 1,
/* enum_remotevideostatereason_RemoteVideoStateReasonNetworkRecovery */
RemoteVideoStateReasonNetworkRecovery = 2,
/* enum_remotevideostatereason_RemoteVideoStateReasonLocalMuted */
RemoteVideoStateReasonLocalMuted = 3,
/* enum_remotevideostatereason_RemoteVideoStateReasonLocalUnmuted */
RemoteVideoStateReasonLocalUnmuted = 4,
/* enum_remotevideostatereason_RemoteVideoStateReasonRemoteMuted */
RemoteVideoStateReasonRemoteMuted = 5,
/* enum_remotevideostatereason_RemoteVideoStateReasonRemoteUnmuted */
RemoteVideoStateReasonRemoteUnmuted = 6,
/* enum_remotevideostatereason_RemoteVideoStateReasonRemoteOffline */
RemoteVideoStateReasonRemoteOffline = 7,
/* enum_remotevideostatereason_RemoteVideoStateReasonAudioFallback */
RemoteVideoStateReasonAudioFallback = 8,
/* enum_remotevideostatereason_RemoteVideoStateReasonAudioFallbackRecovery */
RemoteVideoStateReasonAudioFallbackRecovery = 9,
/* enum_remotevideostatereason_RemoteVideoStateReasonVideoStreamTypeChangeToLow */
RemoteVideoStateReasonVideoStreamTypeChangeToLow = 10,
/* enum_remotevideostatereason_RemoteVideoStateReasonVideoStreamTypeChangeToHigh */
RemoteVideoStateReasonVideoStreamTypeChangeToHigh = 11,
/* enum_remotevideostatereason_RemoteVideoStateReasonSdkInBackground */
RemoteVideoStateReasonSdkInBackground = 12,
}

/* enum_remoteuserstate */
export enum RemoteUserState {
/* enum_remoteuserstate_UserStateMuteAudio */
UserStateMuteAudio = (1<<0),
/* enum_remoteuserstate_UserStateMuteVideo */
UserStateMuteVideo = (1<<1),
/* enum_remoteuserstate_UserStateEnableVideo */
UserStateEnableVideo = (1<<4),
/* enum_remoteuserstate_UserStateEnableLocalVideo */
UserStateEnableLocalVideo = (1<<8),
}

/* class_videotrackinfo */
export class VideoTrackInfo {
  /* class_videotrackinfo_isLocal */
  isLocal?: boolean
  /* class_videotrackinfo_ownerUid */
  ownerUid?: number
  /* class_videotrackinfo_trackId */
  trackId?: number
  /* class_videotrackinfo_channelId */
  channelId?: string
  /* class_videotrackinfo_streamType */
  streamType?: VideoStreamType
  /* class_videotrackinfo_codecType */
  codecType?: VideoCodecType
  /* class_videotrackinfo_encodedFrameOnly */
  encodedFrameOnly?: boolean
  /* class_videotrackinfo_sourceType */
  sourceType?: VideoSourceType
  /* class_videotrackinfo_observationPosition */
  observationPosition?: number
}

/* enum_remotevideodownscalelevel */
export enum RemoteVideoDownscaleLevel {
/* enum_remotevideodownscalelevel_RemoteVideoDownscaleLevelNone */
RemoteVideoDownscaleLevelNone = 0,
/* enum_remotevideodownscalelevel_RemoteVideoDownscaleLevel1 */
RemoteVideoDownscaleLevel1 = 1,
/* enum_remotevideodownscalelevel_RemoteVideoDownscaleLevel2 */
RemoteVideoDownscaleLevel2 = 2,
/* enum_remotevideodownscalelevel_RemoteVideoDownscaleLevel3 */
RemoteVideoDownscaleLevel3 = 3,
/* enum_remotevideodownscalelevel_RemoteVideoDownscaleLevel4 */
RemoteVideoDownscaleLevel4 = 4,
}

/* class_audiovolumeinfo */
export class AudioVolumeInfo {
  /* class_audiovolumeinfo_uid */
  uid?: number
  /* class_audiovolumeinfo_volume */
  volume?: number
  /* class_audiovolumeinfo_vad */
  vad?: number
  /* class_audiovolumeinfo_voicePitch */
  voicePitch?: number
}

/* class_deviceinfo */
export class DeviceInfo {
  /* class_deviceinfo_isLowLatencyAudioSupported */
  isLowLatencyAudioSupported?: boolean
}

/* class_packet */
export class Packet {
  /* class_packet_buffer */
  buffer?: Uint8Array
  /* class_packet_size */
  size?: number
}

/* enum_audiosampleratetype */
export enum AudioSampleRateType {
/* enum_audiosampleratetype_AudioSampleRate32000 */
AudioSampleRate32000 = 32000,
/* enum_audiosampleratetype_AudioSampleRate44100 */
AudioSampleRate44100 = 44100,
/* enum_audiosampleratetype_AudioSampleRate48000 */
AudioSampleRate48000 = 48000,
}

/* enum_videocodectypeforstream */
export enum VideoCodecTypeForStream {
/* enum_videocodectypeforstream_VideoCodecH264ForStream */
VideoCodecH264ForStream = 1,
/* enum_videocodectypeforstream_VideoCodecH265ForStream */
VideoCodecH265ForStream = 2,
}

/* enum_videocodecprofiletype */
export enum VideoCodecProfileType {
/* enum_videocodecprofiletype_VideoCodecProfileBaseline */
VideoCodecProfileBaseline = 66,
/* enum_videocodecprofiletype_VideoCodecProfileMain */
VideoCodecProfileMain = 77,
/* enum_videocodecprofiletype_VideoCodecProfileHigh */
VideoCodecProfileHigh = 100,
}

/* enum_audiocodecprofiletype */
export enum AudioCodecProfileType {
/* enum_audiocodecprofiletype_AudioCodecProfileLcAac */
AudioCodecProfileLcAac = 0,
/* enum_audiocodecprofiletype_AudioCodecProfileHeAac */
AudioCodecProfileHeAac = 1,
/* enum_audiocodecprofiletype_AudioCodecProfileHeAacV2 */
AudioCodecProfileHeAacV2 = 2,
}

/* class_localaudiostats */
export class LocalAudioStats {
  /* class_localaudiostats_numChannels */
  numChannels?: number
  /* class_localaudiostats_sentSampleRate */
  sentSampleRate?: number
  /* class_localaudiostats_sentBitrate */
  sentBitrate?: number
  /* class_localaudiostats_internalCodec */
  internalCodec?: number
  /* class_localaudiostats_txPacketLossRate */
  txPacketLossRate?: number
  /* class_localaudiostats_audioDeviceDelay */
  audioDeviceDelay?: number
}

/* enum_rtmpstreampublishstate */
export enum RtmpStreamPublishState {
/* enum_rtmpstreampublishstate_RtmpStreamPublishStateIdle */
RtmpStreamPublishStateIdle = 0,
/* enum_rtmpstreampublishstate_RtmpStreamPublishStateConnecting */
RtmpStreamPublishStateConnecting = 1,
/* enum_rtmpstreampublishstate_RtmpStreamPublishStateRunning */
RtmpStreamPublishStateRunning = 2,
/* enum_rtmpstreampublishstate_RtmpStreamPublishStateRecovering */
RtmpStreamPublishStateRecovering = 3,
/* enum_rtmpstreampublishstate_RtmpStreamPublishStateFailure */
RtmpStreamPublishStateFailure = 4,
/* enum_rtmpstreampublishstate_RtmpStreamPublishStateDisconnecting */
RtmpStreamPublishStateDisconnecting = 5,
}

/* enum_rtmpstreampublisherrortype */
export enum RtmpStreamPublishErrorType {
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorOk */
RtmpStreamPublishErrorOk = 0,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorInvalidArgument */
RtmpStreamPublishErrorInvalidArgument = 1,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorEncryptedStreamNotAllowed */
RtmpStreamPublishErrorEncryptedStreamNotAllowed = 2,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorConnectionTimeout */
RtmpStreamPublishErrorConnectionTimeout = 3,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorInternalServerError */
RtmpStreamPublishErrorInternalServerError = 4,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorRtmpServerError */
RtmpStreamPublishErrorRtmpServerError = 5,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorTooOften */
RtmpStreamPublishErrorTooOften = 6,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorReachLimit */
RtmpStreamPublishErrorReachLimit = 7,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorNotAuthorized */
RtmpStreamPublishErrorNotAuthorized = 8,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorStreamNotFound */
RtmpStreamPublishErrorStreamNotFound = 9,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorFormatNotSupported */
RtmpStreamPublishErrorFormatNotSupported = 10,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorNotBroadcaster */
RtmpStreamPublishErrorNotBroadcaster = 11,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorTranscodingNoMixStream */
RtmpStreamPublishErrorTranscodingNoMixStream = 13,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorNetDown */
RtmpStreamPublishErrorNetDown = 14,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorInvalidAppid */
RtmpStreamPublishErrorInvalidAppid = 15,
/* enum_rtmpstreampublisherrortype_RtmpStreamPublishErrorInvalidPrivilege */
RtmpStreamPublishErrorInvalidPrivilege = 16,
/* enum_rtmpstreampublisherrortype_RtmpStreamUnpublishErrorOk */
RtmpStreamUnpublishErrorOk = 100,
}

/* enum_rtmpstreamingevent */
export enum RtmpStreamingEvent {
/* enum_rtmpstreamingevent_RtmpStreamingEventFailedLoadImage */
RtmpStreamingEventFailedLoadImage = 1,
/* enum_rtmpstreamingevent_RtmpStreamingEventUrlAlreadyInUse */
RtmpStreamingEventUrlAlreadyInUse = 2,
/* enum_rtmpstreamingevent_RtmpStreamingEventAdvancedFeatureNotSupport */
RtmpStreamingEventAdvancedFeatureNotSupport = 3,
/* enum_rtmpstreamingevent_RtmpStreamingEventRequestTooOften */
RtmpStreamingEventRequestTooOften = 4,
}

/* class_rtcimage */
export class RtcImage {
  /* class_rtcimage_url */
  url?: string
  /* class_rtcimage_x */
  x?: number
  /* class_rtcimage_y */
  y?: number
  /* class_rtcimage_width */
  width?: number
  /* class_rtcimage_height */
  height?: number
  /* class_rtcimage_zOrder */
  zOrder?: number
  /* class_rtcimage_alpha */
  alpha?: number
}

/* class_livestreamadvancedfeature */
export class LiveStreamAdvancedFeature {
  /* class_livestreamadvancedfeature_featureName */
  featureName?: string
  /* class_livestreamadvancedfeature_opened */
  opened?: boolean
}

/* enum_connectionstatetype */
export enum ConnectionStateType {
/* enum_connectionstatetype_ConnectionStateDisconnected */
ConnectionStateDisconnected = 1,
/* enum_connectionstatetype_ConnectionStateConnecting */
ConnectionStateConnecting = 2,
/* enum_connectionstatetype_ConnectionStateConnected */
ConnectionStateConnected = 3,
/* enum_connectionstatetype_ConnectionStateReconnecting */
ConnectionStateReconnecting = 4,
/* enum_connectionstatetype_ConnectionStateFailed */
ConnectionStateFailed = 5,
}

/* class_transcodinguser */
export class TranscodingUser {
  /* class_transcodinguser_uid */
  uid?: number
  /* class_transcodinguser_x */
  x?: number
  /* class_transcodinguser_y */
  y?: number
  /* class_transcodinguser_width */
  width?: number
  /* class_transcodinguser_height */
  height?: number
  /* class_transcodinguser_zOrder */
  zOrder?: number
  /* class_transcodinguser_alpha */
  alpha?: number
  /* class_transcodinguser_audioChannel */
  audioChannel?: number
}

/* class_livetranscoding */
export class LiveTranscoding {
  /* class_livetranscoding_width */
  width?: number
  /* class_livetranscoding_height */
  height?: number
  /* class_livetranscoding_videoBitrate */
  videoBitrate?: number
  /* class_livetranscoding_videoFramerate */
  videoFramerate?: number
  /* class_livetranscoding_lowLatency */
  lowLatency?: boolean
  /* class_livetranscoding_videoGop */
  videoGop?: number
  /* class_livetranscoding_videoCodecProfile */
  videoCodecProfile?: VideoCodecProfileType
  /* class_livetranscoding_backgroundColor */
  backgroundColor?: number
  /* class_livetranscoding_videoCodecType */
  videoCodecType?: VideoCodecTypeForStream
  /* class_livetranscoding_userCount */
  userCount?: number
  /* class_livetranscoding_transcodingUsers */
  transcodingUsers?: TranscodingUser[]
  /* class_livetranscoding_transcodingExtraInfo */
  transcodingExtraInfo?: string
  /* class_livetranscoding_metadata */
  metadata?: string
  /* class_livetranscoding_watermark */
  watermark?: RtcImage[]
  /* class_livetranscoding_watermarkCount */
  watermarkCount?: number
  /* class_livetranscoding_backgroundImage */
  backgroundImage?: RtcImage[]
  /* class_livetranscoding_backgroundImageCount */
  backgroundImageCount?: number
  /* class_livetranscoding_audioSampleRate */
  audioSampleRate?: AudioSampleRateType
  /* class_livetranscoding_audioBitrate */
  audioBitrate?: number
  /* class_livetranscoding_audioChannels */
  audioChannels?: number
  /* class_livetranscoding_audioCodecProfile */
  audioCodecProfile?: AudioCodecProfileType
  /* class_livetranscoding_advancedFeatures */
  advancedFeatures?: LiveStreamAdvancedFeature[]
  /* class_livetranscoding_advancedFeatureCount */
  advancedFeatureCount?: number
}

/* class_transcodingvideostream */
export class TranscodingVideoStream {
  /* class_transcodingvideostream_sourceType */
  sourceType?: MediaSourceType
  /* class_transcodingvideostream_remoteUserUid */
  remoteUserUid?: number
  /* class_transcodingvideostream_imageUrl */
  imageUrl?: string
  /* class_transcodingvideostream_x */
  x?: number
  /* class_transcodingvideostream_y */
  y?: number
  /* class_transcodingvideostream_width */
  width?: number
  /* class_transcodingvideostream_height */
  height?: number
  /* class_transcodingvideostream_zOrder */
  zOrder?: number
  /* class_transcodingvideostream_alpha */
  alpha?: number
  /* class_transcodingvideostream_mirror */
  mirror?: boolean
}

/* class_localtranscoderconfiguration */
export class LocalTranscoderConfiguration {
  /* class_localtranscoderconfiguration_streamCount */
  streamCount?: number
  /* class_localtranscoderconfiguration_VideoInputStreams */
  VideoInputStreams?: TranscodingVideoStream[]
  /* class_localtranscoderconfiguration_videoOutputConfiguration */
  videoOutputConfiguration?: VideoEncoderConfiguration
  /* class_localtranscoderconfiguration_syncWithPrimaryCamera */
  syncWithPrimaryCamera?: boolean
}

/* class_lastmileprobeconfig */
export class LastmileProbeConfig {
  /* class_lastmileprobeconfig_probeUplink */
  probeUplink?: boolean
  /* class_lastmileprobeconfig_probeDownlink */
  probeDownlink?: boolean
  /* class_lastmileprobeconfig_expectedUplinkBitrate */
  expectedUplinkBitrate?: number
  /* class_lastmileprobeconfig_expectedDownlinkBitrate */
  expectedDownlinkBitrate?: number
}

/* enum_lastmileproberesultstate */
export enum LastmileProbeResultState {
/* enum_lastmileproberesultstate_LastmileProbeResultComplete */
LastmileProbeResultComplete = 1,
/* enum_lastmileproberesultstate_LastmileProbeResultIncompleteNoBwe */
LastmileProbeResultIncompleteNoBwe = 2,
/* enum_lastmileproberesultstate_LastmileProbeResultUnavailable */
LastmileProbeResultUnavailable = 3,
}

/* class_lastmileprobeonewayresult */
export class LastmileProbeOneWayResult {
  /* class_lastmileprobeonewayresult_packetLossRate */
  packetLossRate?: number
  /* class_lastmileprobeonewayresult_jitter */
  jitter?: number
  /* class_lastmileprobeonewayresult_availableBandwidth */
  availableBandwidth?: number
}

/* class_lastmileproberesult */
export class LastmileProbeResult {
  /* class_lastmileproberesult_state */
  state?: LastmileProbeResultState
  /* class_lastmileproberesult_uplinkReport */
  uplinkReport?: LastmileProbeOneWayResult
  /* class_lastmileproberesult_downlinkReport */
  downlinkReport?: LastmileProbeOneWayResult
  /* class_lastmileproberesult_rtt */
  rtt?: number
}

/* enum_connectionchangedreasontype */
export enum ConnectionChangedReasonType {
/* enum_connectionchangedreasontype_ConnectionChangedConnecting */
ConnectionChangedConnecting = 0,
/* enum_connectionchangedreasontype_ConnectionChangedJoinSuccess */
ConnectionChangedJoinSuccess = 1,
/* enum_connectionchangedreasontype_ConnectionChangedInterrupted */
ConnectionChangedInterrupted = 2,
/* enum_connectionchangedreasontype_ConnectionChangedBannedByServer */
ConnectionChangedBannedByServer = 3,
/* enum_connectionchangedreasontype_ConnectionChangedJoinFailed */
ConnectionChangedJoinFailed = 4,
/* enum_connectionchangedreasontype_ConnectionChangedLeaveChannel */
ConnectionChangedLeaveChannel = 5,
/* enum_connectionchangedreasontype_ConnectionChangedInvalidAppId */
ConnectionChangedInvalidAppId = 6,
/* enum_connectionchangedreasontype_ConnectionChangedInvalidChannelName */
ConnectionChangedInvalidChannelName = 7,
/* enum_connectionchangedreasontype_ConnectionChangedInvalidToken */
ConnectionChangedInvalidToken = 8,
/* enum_connectionchangedreasontype_ConnectionChangedTokenExpired */
ConnectionChangedTokenExpired = 9,
/* enum_connectionchangedreasontype_ConnectionChangedRejectedByServer */
ConnectionChangedRejectedByServer = 10,
/* enum_connectionchangedreasontype_ConnectionChangedSettingProxyServer */
ConnectionChangedSettingProxyServer = 11,
/* enum_connectionchangedreasontype_ConnectionChangedRenewToken */
ConnectionChangedRenewToken = 12,
/* enum_connectionchangedreasontype_ConnectionChangedClientIpAddressChanged */
ConnectionChangedClientIpAddressChanged = 13,
/* enum_connectionchangedreasontype_ConnectionChangedKeepAliveTimeout */
ConnectionChangedKeepAliveTimeout = 14,
/* enum_connectionchangedreasontype_ConnectionChangedRejoinSuccess */
ConnectionChangedRejoinSuccess = 15,
/* enum_connectionchangedreasontype_ConnectionChangedLost */
ConnectionChangedLost = 16,
/* enum_connectionchangedreasontype_ConnectionChangedEchoTest */
ConnectionChangedEchoTest = 17,
/* enum_connectionchangedreasontype_ConnectionChangedClientIpAddressChangedByUser */
ConnectionChangedClientIpAddressChangedByUser = 18,
/* enum_connectionchangedreasontype_ConnectionChangedSameUidLogin */
ConnectionChangedSameUidLogin = 19,
/* enum_connectionchangedreasontype_ConnectionChangedTooManyBroadcasters */
ConnectionChangedTooManyBroadcasters = 20,
/* enum_connectionchangedreasontype_ConnectionChangedLicenseVerifyFailed */
ConnectionChangedLicenseVerifyFailed = 21,
}

/* enum_clientrolechangefailedreason */
export enum ClientRoleChangeFailedReason {
/* enum_clientrolechangefailedreason_ClientRoleChangeFailedTooManyBroadcasters */
ClientRoleChangeFailedTooManyBroadcasters = 1,
/* enum_clientrolechangefailedreason_ClientRoleChangeFailedNotAuthorized */
ClientRoleChangeFailedNotAuthorized = 2,
/* enum_clientrolechangefailedreason_ClientRoleChangeFailedRequestTimeOut */
ClientRoleChangeFailedRequestTimeOut = 3,
/* enum_clientrolechangefailedreason_ClientRoleChangeFailedConnectionFailed */
ClientRoleChangeFailedConnectionFailed = 4,
}

/* enum_wlaccmessagereason */
export enum WlaccMessageReason {
/* enum_wlaccmessagereason_WlaccMessageReasonWeakSignal */
WlaccMessageReasonWeakSignal = 0,
/* enum_wlaccmessagereason_WlaccMessageReasonChannelCongestion */
WlaccMessageReasonChannelCongestion = 1,
}

/* enum_wlaccsuggestaction */
export enum WlaccSuggestAction {
/* enum_wlaccsuggestaction_WlaccSuggestActionCloseToWifi */
WlaccSuggestActionCloseToWifi = 0,
/* enum_wlaccsuggestaction_WlaccSuggestActionConnectSsid */
WlaccSuggestActionConnectSsid = 1,
/* enum_wlaccsuggestaction_WlaccSuggestActionCheck5g */
WlaccSuggestActionCheck5g = 2,
/* enum_wlaccsuggestaction_WlaccSuggestActionModifySsid */
WlaccSuggestActionModifySsid = 3,
}

/* class_wlaccstats */
export class WlAccStats {
  /* class_wlaccstats_e2eDelayPercent */
  e2eDelayPercent?: number
  /* class_wlaccstats_frozenRatioPercent */
  frozenRatioPercent?: number
  /* class_wlaccstats_lossRatePercent */
  lossRatePercent?: number
}

/* enum_networktype */
export enum NetworkType {
/* enum_networktype_NetworkTypeUnknown */
NetworkTypeUnknown = -1,
/* enum_networktype_NetworkTypeDisconnected */
NetworkTypeDisconnected = 0,
/* enum_networktype_NetworkTypeLan */
NetworkTypeLan = 1,
/* enum_networktype_NetworkTypeWifi */
NetworkTypeWifi = 2,
/* enum_networktype_NetworkTypeMobile2g */
NetworkTypeMobile2g = 3,
/* enum_networktype_NetworkTypeMobile3g */
NetworkTypeMobile3g = 4,
/* enum_networktype_NetworkTypeMobile4g */
NetworkTypeMobile4g = 5,
}

/* enum_videoviewsetupmode */
export enum VideoViewSetupMode {
/* enum_videoviewsetupmode_VideoViewSetupReplace */
VideoViewSetupReplace = 0,
/* enum_videoviewsetupmode_VideoViewSetupAdd */
VideoViewSetupAdd = 1,
/* enum_videoviewsetupmode_VideoViewSetupRemove */
VideoViewSetupRemove = 2,
}

/* class_videocanvas */
export class VideoCanvas {
  /* class_videocanvas_view */
  view?: any
  /* class_videocanvas_uid */
  uid?: number
  /* class_videocanvas_renderMode */
  renderMode?: RenderModeType
  /* class_videocanvas_mirrorMode */
  mirrorMode?: VideoMirrorModeType
  /* class_videocanvas_setupMode */
  setupMode?: VideoViewSetupMode
  /* class_videocanvas_sourceType */
  sourceType?: VideoSourceType
  /* class_videocanvas_mediaPlayerId */
  mediaPlayerId?: number
  /* class_videocanvas_cropArea */
  cropArea?: Rectangle
}

/* enum_lighteningcontrastlevel */
export enum LighteningContrastLevel {
/* enum_lighteningcontrastlevel_LighteningContrastLow */
LighteningContrastLow = 0,
/* enum_lighteningcontrastlevel_LighteningContrastNormal */
LighteningContrastNormal = 1,
/* enum_lighteningcontrastlevel_LighteningContrastHigh */
LighteningContrastHigh = 2,
}

/* class_beautyoptions */
export class BeautyOptions {
  /* class_beautyoptions_lighteningContrastLevel */
  lighteningContrastLevel?: LighteningContrastLevel
  /* class_beautyoptions_lighteningLevel */
  lighteningLevel?: number
  /* class_beautyoptions_smoothnessLevel */
  smoothnessLevel?: number
  /* class_beautyoptions_rednessLevel */
  rednessLevel?: number
  /* class_beautyoptions_sharpnessLevel */
  sharpnessLevel?: number
}

/* enum_lowlightenhancemode */
export enum LowLightEnhanceMode {
/* enum_lowlightenhancemode_LowLightEnhanceAuto */
LowLightEnhanceAuto = 0,
/* enum_lowlightenhancemode_LowLightEnhanceManual */
LowLightEnhanceManual = 1,
}

/* enum_lowlightenhancelevel */
export enum LowLightEnhanceLevel {
/* enum_lowlightenhancelevel_LowLightEnhanceLevelHighQuality */
LowLightEnhanceLevelHighQuality = 0,
/* enum_lowlightenhancelevel_LowLightEnhanceLevelFast */
LowLightEnhanceLevelFast = 1,
}

/* class_lowlightenhanceoptions */
export class LowlightEnhanceOptions {
  /* class_lowlightenhanceoptions_mode */
  mode?: LowLightEnhanceMode
  /* class_lowlightenhanceoptions_level */
  level?: LowLightEnhanceLevel
}

/* enum_videodenoisermode */
export enum VideoDenoiserMode {
/* enum_videodenoisermode_VideoDenoiserAuto */
VideoDenoiserAuto = 0,
/* enum_videodenoisermode_VideoDenoiserManual */
VideoDenoiserManual = 1,
}

/* enum_videodenoiserlevel */
export enum VideoDenoiserLevel {
/* enum_videodenoiserlevel_VideoDenoiserLevelHighQuality */
VideoDenoiserLevelHighQuality = 0,
/* enum_videodenoiserlevel_VideoDenoiserLevelFast */
VideoDenoiserLevelFast = 1,
/* enum_videodenoiserlevel_VideoDenoiserLevelStrength */
VideoDenoiserLevelStrength = 2,
}

/* class_videodenoiseroptions */
export class VideoDenoiserOptions {
  /* class_videodenoiseroptions_mode */
  mode?: VideoDenoiserMode
  /* class_videodenoiseroptions_level */
  level?: VideoDenoiserLevel
}

/* class_colorenhanceoptions */
export class ColorEnhanceOptions {
  /* class_colorenhanceoptions_strengthLevel */
  strengthLevel?: number
  /* class_colorenhanceoptions_skinProtectLevel */
  skinProtectLevel?: number
}

/* enum_backgroundsourcetype */
export enum BackgroundSourceType {
/* enum_backgroundsourcetype_BackgroundColor */
BackgroundColor = 1,
/* enum_backgroundsourcetype_BackgroundImg */
BackgroundImg = 2,
/* enum_backgroundsourcetype_BackgroundBlur */
BackgroundBlur = 3,
}

/* enum_backgroundblurdegree */
export enum BackgroundBlurDegree {
/* enum_backgroundblurdegree_BlurDegreeLow */
BlurDegreeLow = 1,
/* enum_backgroundblurdegree_BlurDegreeMedium */
BlurDegreeMedium = 2,
/* enum_backgroundblurdegree_BlurDegreeHigh */
BlurDegreeHigh = 3,
}

/* class_virtualbackgroundsource */
export class VirtualBackgroundSource {
  /* class_virtualbackgroundsource_background_source_type */
  background_source_type?: BackgroundSourceType
  /* class_virtualbackgroundsource_color */
  color?: number
  /* class_virtualbackgroundsource_source */
  source?: string
  /* class_virtualbackgroundsource_blur_degree */
  blur_degree?: BackgroundBlurDegree
}

/* enum_segmodeltype */
export enum SegModelType {
/* enum_segmodeltype_SegModelAi */
SegModelAi = 1,
/* enum_segmodeltype_SegModelGreen */
SegModelGreen = 2,
}

/* class_segmentationproperty */
export class SegmentationProperty {
  /* class_segmentationproperty_modelType */
  modelType?: SegModelType
  /* class_segmentationproperty_greenCapacity */
  greenCapacity?: number
}

/* enum_voicebeautifierpreset */
export enum VoiceBeautifierPreset {
/* enum_voicebeautifierpreset_VoiceBeautifierOff */
VoiceBeautifierOff = 0x00000000,
/* enum_voicebeautifierpreset_ChatBeautifierMagnetic */
ChatBeautifierMagnetic = 0x01010100,
/* enum_voicebeautifierpreset_ChatBeautifierFresh */
ChatBeautifierFresh = 0x01010200,
/* enum_voicebeautifierpreset_ChatBeautifierVitality */
ChatBeautifierVitality = 0x01010300,
/* enum_voicebeautifierpreset_SingingBeautifier */
SingingBeautifier = 0x01020100,
/* enum_voicebeautifierpreset_TimbreTransformationVigorous */
TimbreTransformationVigorous = 0x01030100,
/* enum_voicebeautifierpreset_TimbreTransformationDeep */
TimbreTransformationDeep = 0x01030200,
/* enum_voicebeautifierpreset_TimbreTransformationMellow */
TimbreTransformationMellow = 0x01030300,
/* enum_voicebeautifierpreset_TimbreTransformationFalsetto */
TimbreTransformationFalsetto = 0x01030400,
/* enum_voicebeautifierpreset_TimbreTransformationFull */
TimbreTransformationFull = 0x01030500,
/* enum_voicebeautifierpreset_TimbreTransformationClear */
TimbreTransformationClear = 0x01030600,
/* enum_voicebeautifierpreset_TimbreTransformationResounding */
TimbreTransformationResounding = 0x01030700,
/* enum_voicebeautifierpreset_TimbreTransformationRinging */
TimbreTransformationRinging = 0x01030800,
/* enum_voicebeautifierpreset_UltraHighQualityVoice */
UltraHighQualityVoice = 0x01040100,
}

/* enum_audioeffectpreset */
export enum AudioEffectPreset {
/* enum_audioeffectpreset_AudioEffectOff */
AudioEffectOff = 0x00000000,
/* enum_audioeffectpreset_RoomAcousticsKtv */
RoomAcousticsKtv = 0x02010100,
/* enum_audioeffectpreset_RoomAcousticsVocalConcert */
RoomAcousticsVocalConcert = 0x02010200,
/* enum_audioeffectpreset_RoomAcousticsStudio */
RoomAcousticsStudio = 0x02010300,
/* enum_audioeffectpreset_RoomAcousticsPhonograph */
RoomAcousticsPhonograph = 0x02010400,
/* enum_audioeffectpreset_RoomAcousticsVirtualStereo */
RoomAcousticsVirtualStereo = 0x02010500,
/* enum_audioeffectpreset_RoomAcousticsSpacial */
RoomAcousticsSpacial = 0x02010600,
/* enum_audioeffectpreset_RoomAcousticsEthereal */
RoomAcousticsEthereal = 0x02010700,
/* enum_audioeffectpreset_RoomAcoustics3dVoice */
RoomAcoustics3dVoice = 0x02010800,
/* enum_audioeffectpreset_RoomAcousticsVirtualSurroundSound */
RoomAcousticsVirtualSurroundSound = 0x02010900,
/* enum_audioeffectpreset_VoiceChangerEffectUncle */
VoiceChangerEffectUncle = 0x02020100,
/* enum_audioeffectpreset_VoiceChangerEffectOldman */
VoiceChangerEffectOldman = 0x02020200,
/* enum_audioeffectpreset_VoiceChangerEffectBoy */
VoiceChangerEffectBoy = 0x02020300,
/* enum_audioeffectpreset_VoiceChangerEffectSister */
VoiceChangerEffectSister = 0x02020400,
/* enum_audioeffectpreset_VoiceChangerEffectGirl */
VoiceChangerEffectGirl = 0x02020500,
/* enum_audioeffectpreset_VoiceChangerEffectPigking */
VoiceChangerEffectPigking = 0x02020600,
/* enum_audioeffectpreset_VoiceChangerEffectHulk */
VoiceChangerEffectHulk = 0x02020700,
/* enum_audioeffectpreset_StyleTransformationRnb */
StyleTransformationRnb = 0x02030100,
/* enum_audioeffectpreset_StyleTransformationPopular */
StyleTransformationPopular = 0x02030200,
/* enum_audioeffectpreset_PitchCorrection */
PitchCorrection = 0x02040100,
}

/* enum_voiceconversionpreset */
export enum VoiceConversionPreset {
/* enum_voiceconversionpreset_VoiceConversionOff */
VoiceConversionOff = 0x00000000,
/* enum_voiceconversionpreset_VoiceChangerNeutral */
VoiceChangerNeutral = 0x03010100,
/* enum_voiceconversionpreset_VoiceChangerSweet */
VoiceChangerSweet = 0x03010200,
/* enum_voiceconversionpreset_VoiceChangerSolid */
VoiceChangerSolid = 0x03010300,
/* enum_voiceconversionpreset_VoiceChangerBass */
VoiceChangerBass = 0x03010400,
}

/* enum_headphoneequalizerpreset */
export enum HeadphoneEqualizerPreset {
/* enum_headphoneequalizerpreset_HeadphoneEqualizerOff */
HeadphoneEqualizerOff = 0x00000000,
/* enum_headphoneequalizerpreset_HeadphoneEqualizerOverear */
HeadphoneEqualizerOverear = 0x04000001,
/* enum_headphoneequalizerpreset_HeadphoneEqualizerInear */
HeadphoneEqualizerInear = 0x04000002,
}

/* class_screencaptureparameters */
export class ScreenCaptureParameters {
  /* class_screencaptureparameters_dimensions */
  dimensions?: VideoDimensions
  /* class_screencaptureparameters_frameRate */
  frameRate?: number
  /* class_screencaptureparameters_bitrate */
  bitrate?: number
  /* class_screencaptureparameters_captureMouseCursor */
  captureMouseCursor?: boolean
  /* class_screencaptureparameters_windowFocus */
  windowFocus?: boolean
  /* class_screencaptureparameters_excludeWindowList */
  excludeWindowList?: any[]
  /* class_screencaptureparameters_excludeWindowCount */
  excludeWindowCount?: number
  /* class_screencaptureparameters_highLightWidth */
  highLightWidth?: number
  /* class_screencaptureparameters_highLightColor */
  highLightColor?: number
  /* class_screencaptureparameters_enableHighLight */
  enableHighLight?: boolean
}

/* enum_audiorecordingqualitytype */
export enum AudioRecordingQualityType {
/* enum_audiorecordingqualitytype_AudioRecordingQualityLow */
AudioRecordingQualityLow = 0,
/* enum_audiorecordingqualitytype_AudioRecordingQualityMedium */
AudioRecordingQualityMedium = 1,
/* enum_audiorecordingqualitytype_AudioRecordingQualityHigh */
AudioRecordingQualityHigh = 2,
/* enum_audiorecordingqualitytype_AudioRecordingQualityUltraHigh */
AudioRecordingQualityUltraHigh = 3,
}

/* enum_audiofilerecordingtype */
export enum AudioFileRecordingType {
/* enum_audiofilerecordingtype_AudioFileRecordingMic */
AudioFileRecordingMic = 1,
/* enum_audiofilerecordingtype_AudioFileRecordingPlayback */
AudioFileRecordingPlayback = 2,
/* enum_audiofilerecordingtype_AudioFileRecordingMixed */
AudioFileRecordingMixed = 3,
}

/* enum_audioencodedframeobserverposition */
export enum AudioEncodedFrameObserverPosition {
/* enum_audioencodedframeobserverposition_AudioEncodedFrameObserverPositionRecord */
AudioEncodedFrameObserverPositionRecord = 1,
/* enum_audioencodedframeobserverposition_AudioEncodedFrameObserverPositionPlayback */
AudioEncodedFrameObserverPositionPlayback = 2,
/* enum_audioencodedframeobserverposition_AudioEncodedFrameObserverPositionMixed */
AudioEncodedFrameObserverPositionMixed = 3,
}

/* class_audiorecordingconfiguration */
export class AudioRecordingConfiguration {
  /* class_audiorecordingconfiguration_filePath */
  filePath?: string
  /* class_audiorecordingconfiguration_encode */
  encode?: boolean
  /* class_audiorecordingconfiguration_sampleRate */
  sampleRate?: number
  /* class_audiorecordingconfiguration_fileRecordingType */
  fileRecordingType?: AudioFileRecordingType
  /* class_audiorecordingconfiguration_quality */
  quality?: AudioRecordingQualityType
  /* class_audiorecordingconfiguration_recordingChannel */
  recordingChannel?: number
}

/* class_audioencodedframeobserverconfig */
export class AudioEncodedFrameObserverConfig {
  /* class_audioencodedframeobserverconfig_postionType */
  postionType?: AudioEncodedFrameObserverPosition
  /* class_audioencodedframeobserverconfig_encodingType */
  encodingType?: AudioEncodingType
}

/* class_iaudioencodedframeobserver */
export interface IAudioEncodedFrameObserver {
  /* callback_iaudioencodedframeobserver_onrecordaudioencodedframe */
  onRecordAudioEncodedFrame?(frameBuffer: Uint8Array, length: number, audioEncodedFrameInfo: EncodedAudioFrameInfo): void;

  /* callback_iaudioencodedframeobserver_onplaybackaudioencodedframe */
  onPlaybackAudioEncodedFrame?(frameBuffer: Uint8Array, length: number, audioEncodedFrameInfo: EncodedAudioFrameInfo): void;

  /* callback_iaudioencodedframeobserver_onmixedaudioencodedframe */
  onMixedAudioEncodedFrame?(frameBuffer: Uint8Array, length: number, audioEncodedFrameInfo: EncodedAudioFrameInfo): void;
}

/* enum_areacode */
export enum AreaCode {
/* enum_areacode_AreaCodeCn */
AreaCodeCn = 0x00000001,
/* enum_areacode_AreaCodeNa */
AreaCodeNa = 0x00000002,
/* enum_areacode_AreaCodeEu */
AreaCodeEu = 0x00000004,
/* enum_areacode_AreaCodeAs */
AreaCodeAs = 0x00000008,
/* enum_areacode_AreaCodeJp */
AreaCodeJp = 0x00000010,
/* enum_areacode_AreaCodeIn */
AreaCodeIn = 0x00000020,
/* enum_areacode_AreaCodeGlob */
AreaCodeGlob = (0xFFFFFFFF),
}

/* enum_areacodeex */
export enum AreaCodeEx {
/* enum_areacodeex_AreaCodeOc */
AreaCodeOc = 0x00000040,
/* enum_areacodeex_AreaCodeSa */
AreaCodeSa = 0x00000080,
/* enum_areacodeex_AreaCodeAf */
AreaCodeAf = 0x00000100,
/* enum_areacodeex_AreaCodeKr */
AreaCodeKr = 0x00000200,
/* enum_areacodeex_AreaCodeHkmc */
AreaCodeHkmc = 0x00000400,
/* enum_areacodeex_AreaCodeUs */
AreaCodeUs = 0x00000800,
/* enum_areacodeex_AreaCodeOvs */
AreaCodeOvs = 0xFFFFFFFE,
}

/* enum_channelmediarelayerror */
export enum ChannelMediaRelayError {
/* enum_channelmediarelayerror_RelayOk */
RelayOk = 0,
/* enum_channelmediarelayerror_RelayErrorServerErrorResponse */
RelayErrorServerErrorResponse = 1,
/* enum_channelmediarelayerror_RelayErrorServerNoResponse */
RelayErrorServerNoResponse = 2,
/* enum_channelmediarelayerror_RelayErrorNoResourceAvailable */
RelayErrorNoResourceAvailable = 3,
/* enum_channelmediarelayerror_RelayErrorFailedJoinSrc */
RelayErrorFailedJoinSrc = 4,
/* enum_channelmediarelayerror_RelayErrorFailedJoinDest */
RelayErrorFailedJoinDest = 5,
/* enum_channelmediarelayerror_RelayErrorFailedPacketReceivedFromSrc */
RelayErrorFailedPacketReceivedFromSrc = 6,
/* enum_channelmediarelayerror_RelayErrorFailedPacketSentToDest */
RelayErrorFailedPacketSentToDest = 7,
/* enum_channelmediarelayerror_RelayErrorServerConnectionLost */
RelayErrorServerConnectionLost = 8,
/* enum_channelmediarelayerror_RelayErrorInternalError */
RelayErrorInternalError = 9,
/* enum_channelmediarelayerror_RelayErrorSrcTokenExpired */
RelayErrorSrcTokenExpired = 10,
/* enum_channelmediarelayerror_RelayErrorDestTokenExpired */
RelayErrorDestTokenExpired = 11,
}

/* enum_channelmediarelayevent */
export enum ChannelMediaRelayEvent {
/* enum_channelmediarelayevent_RelayEventNetworkDisconnected */
RelayEventNetworkDisconnected = 0,
/* enum_channelmediarelayevent_RelayEventNetworkConnected */
RelayEventNetworkConnected = 1,
/* enum_channelmediarelayevent_RelayEventPacketJoinedSrcChannel */
RelayEventPacketJoinedSrcChannel = 2,
/* enum_channelmediarelayevent_RelayEventPacketJoinedDestChannel */
RelayEventPacketJoinedDestChannel = 3,
/* enum_channelmediarelayevent_RelayEventPacketSentToDestChannel */
RelayEventPacketSentToDestChannel = 4,
/* enum_channelmediarelayevent_RelayEventPacketReceivedVideoFromSrc */
RelayEventPacketReceivedVideoFromSrc = 5,
/* enum_channelmediarelayevent_RelayEventPacketReceivedAudioFromSrc */
RelayEventPacketReceivedAudioFromSrc = 6,
/* enum_channelmediarelayevent_RelayEventPacketUpdateDestChannel */
RelayEventPacketUpdateDestChannel = 7,
/* enum_channelmediarelayevent_RelayEventPacketUpdateDestChannelRefused */
RelayEventPacketUpdateDestChannelRefused = 8,
/* enum_channelmediarelayevent_RelayEventPacketUpdateDestChannelNotChange */
RelayEventPacketUpdateDestChannelNotChange = 9,
/* enum_channelmediarelayevent_RelayEventPacketUpdateDestChannelIsNull */
RelayEventPacketUpdateDestChannelIsNull = 10,
/* enum_channelmediarelayevent_RelayEventVideoProfileUpdate */
RelayEventVideoProfileUpdate = 11,
/* enum_channelmediarelayevent_RelayEventPauseSendPacketToDestChannelSuccess */
RelayEventPauseSendPacketToDestChannelSuccess = 12,
/* enum_channelmediarelayevent_RelayEventPauseSendPacketToDestChannelFailed */
RelayEventPauseSendPacketToDestChannelFailed = 13,
/* enum_channelmediarelayevent_RelayEventResumeSendPacketToDestChannelSuccess */
RelayEventResumeSendPacketToDestChannelSuccess = 14,
/* enum_channelmediarelayevent_RelayEventResumeSendPacketToDestChannelFailed */
RelayEventResumeSendPacketToDestChannelFailed = 15,
}

/* enum_channelmediarelaystate */
export enum ChannelMediaRelayState {
/* enum_channelmediarelaystate_RelayStateIdle */
RelayStateIdle = 0,
/* enum_channelmediarelaystate_RelayStateConnecting */
RelayStateConnecting = 1,
/* enum_channelmediarelaystate_RelayStateRunning */
RelayStateRunning = 2,
/* enum_channelmediarelaystate_RelayStateFailure */
RelayStateFailure = 3,
}

/* class_channelmediainfo */
export class ChannelMediaInfo {
  /* class_channelmediainfo_channelName */
  channelName?: string
  /* class_channelmediainfo_token */
  token?: string
  /* class_channelmediainfo_uid */
  uid?: number
}

/* class_channelmediarelayconfiguration */
export class ChannelMediaRelayConfiguration {
  /* class_channelmediarelayconfiguration_srcInfo */
  srcInfo?: ChannelMediaInfo
  /* class_channelmediarelayconfiguration_destInfos */
  destInfos?: ChannelMediaInfo[]
  /* class_channelmediarelayconfiguration_destCount */
  destCount?: number
}

/* class_uplinknetworkinfo */
export class UplinkNetworkInfo {
  /* class_uplinknetworkinfo_video_encoder_target_bitrate_bps */
  video_encoder_target_bitrate_bps?: number
}

/* class_peerdownlinkinfo */
export class PeerDownlinkInfo {
  /* class_peerdownlinkinfo_uid */
  uid?: string
  /* class_peerdownlinkinfo_stream_type */
  stream_type?: VideoStreamType
  /* class_peerdownlinkinfo_current_downscale_level */
  current_downscale_level?: RemoteVideoDownscaleLevel
  /* class_peerdownlinkinfo_expected_bitrate_bps */
  expected_bitrate_bps?: number
}

/* class_downlinknetworkinfo */
export class DownlinkNetworkInfo {
  /* class_downlinknetworkinfo_lastmile_buffer_delay_time_ms */
  lastmile_buffer_delay_time_ms?: number
  /* class_downlinknetworkinfo_bandwidth_estimation_bps */
  bandwidth_estimation_bps?: number
  /* class_downlinknetworkinfo_total_downscale_level_count */
  total_downscale_level_count?: number
  /* class_downlinknetworkinfo_peer_downlink_info */
  peer_downlink_info?: PeerDownlinkInfo[]
  /* class_downlinknetworkinfo_total_received_video_count */
  total_received_video_count?: number
}

/* enum_encryptionmode */
export enum EncryptionMode {
/* enum_encryptionmode_Aes128Xts */
Aes128Xts = 1,
/* enum_encryptionmode_Aes128Ecb */
Aes128Ecb = 2,
/* enum_encryptionmode_Aes256Xts */
Aes256Xts = 3,
/* enum_encryptionmode_Sm4128Ecb */
Sm4128Ecb = 4,
/* enum_encryptionmode_Aes128Gcm */
Aes128Gcm = 5,
/* enum_encryptionmode_Aes256Gcm */
Aes256Gcm = 6,
/* enum_encryptionmode_Aes128Gcm2 */
Aes128Gcm2 = 7,
/* enum_encryptionmode_Aes256Gcm2 */
Aes256Gcm2 = 8,
/* enum_encryptionmode_ModeEnd */
ModeEnd = 9,
}

/* class_encryptionconfig */
export class EncryptionConfig {
  /* class_encryptionconfig_encryptionMode */
  encryptionMode?: EncryptionMode
  /* class_encryptionconfig_encryptionKey */
  encryptionKey?: string
  /* class_encryptionconfig_encryptionKdfSalt */
  encryptionKdfSalt?: number[]
}

/* enum_encryptionerrortype */
export enum EncryptionErrorType {
/* enum_encryptionerrortype_EncryptionErrorInternalFailure */
EncryptionErrorInternalFailure = 0,
/* enum_encryptionerrortype_EncryptionErrorDecryptionFailure */
EncryptionErrorDecryptionFailure = 1,
/* enum_encryptionerrortype_EncryptionErrorEncryptionFailure */
EncryptionErrorEncryptionFailure = 2,
}

/* enum_uploaderrorreason */
export enum UploadErrorReason {
/* enum_uploaderrorreason_UploadSuccess */
UploadSuccess = 0,
/* enum_uploaderrorreason_UploadNetError */
UploadNetError = 1,
/* enum_uploaderrorreason_UploadServerError */
UploadServerError = 2,
}

/* enum_permissiontype */
export enum PermissionType {
/* enum_permissiontype_RecordAudio */
RecordAudio = 0,
/* enum_permissiontype_Camera */
Camera = 1,
/* enum_permissiontype_ScreenCapture */
ScreenCapture = 2,
}

/* enum_maxuseraccountlengthtype */
export enum MaxUserAccountLengthType {
/* enum_maxuseraccountlengthtype_MaxUserAccountLength */
MaxUserAccountLength = 256,
}

/* enum_streamsubscribestate */
export enum StreamSubscribeState {
/* enum_streamsubscribestate_SubStateIdle */
SubStateIdle = 0,
/* enum_streamsubscribestate_SubStateNoSubscribed */
SubStateNoSubscribed = 1,
/* enum_streamsubscribestate_SubStateSubscribing */
SubStateSubscribing = 2,
/* enum_streamsubscribestate_SubStateSubscribed */
SubStateSubscribed = 3,
}

/* enum_streampublishstate */
export enum StreamPublishState {
/* enum_streampublishstate_PubStateIdle */
PubStateIdle = 0,
/* enum_streampublishstate_PubStateNoPublished */
PubStateNoPublished = 1,
/* enum_streampublishstate_PubStatePublishing */
PubStatePublishing = 2,
/* enum_streampublishstate_PubStatePublished */
PubStatePublished = 3,
}

/* class_echotestconfiguration */
export class EchoTestConfiguration {
  /* class_echotestconfiguration_view */
  view?: any
  /* class_echotestconfiguration_enableAudio */
  enableAudio?: boolean
  /* class_echotestconfiguration_enableVideo */
  enableVideo?: boolean
  /* class_echotestconfiguration_token */
  token?: string
  /* class_echotestconfiguration_channelId */
  channelId?: string
}

/* class_userinfo */
export class UserInfo {
  /* class_userinfo_uid */
  uid?: number
  /* class_userinfo_userAccount */
  userAccount?: string
}

/* enum_earmonitoringfiltertype */
export enum EarMonitoringFilterType {
/* enum_earmonitoringfiltertype_EarMonitoringFilterNone */
EarMonitoringFilterNone = (1<<0),
/* enum_earmonitoringfiltertype_EarMonitoringFilterBuiltInAudioFilters */
EarMonitoringFilterBuiltInAudioFilters = (1<<1),
/* enum_earmonitoringfiltertype_EarMonitoringFilterNoiseSuppression */
EarMonitoringFilterNoiseSuppression = (1<<2),
}

/* enum_threadprioritytype */
export enum ThreadPriorityType {
/* enum_threadprioritytype_Lowest */
Lowest = 0,
/* enum_threadprioritytype_Low */
Low = 1,
/* enum_threadprioritytype_Normal */
Normal = 2,
/* enum_threadprioritytype_High */
High = 3,
/* enum_threadprioritytype_Highest */
Highest = 4,
/* enum_threadprioritytype_Critical */
Critical = 5,
}

/* class_screenvideoparameters */
export class ScreenVideoParameters {
  /* class_screenvideoparameters_dimensions */
  dimensions?: VideoDimensions
  /* class_screenvideoparameters_frameRate */
  frameRate?: number
  /* class_screenvideoparameters_bitrate */
  bitrate?: number
  /* class_screenvideoparameters_contentHint */
  contentHint?: VideoContentHint
}

/* class_screenaudioparameters */
export class ScreenAudioParameters {
  /* class_screenaudioparameters_sampleRate */
  sampleRate?: number
  /* class_screenaudioparameters_channels */
  channels?: number
  /* class_screenaudioparameters_captureSignalVolume */
  captureSignalVolume?: number
}

/* class_screencaptureparameters2 */
export class ScreenCaptureParameters2 {
  /* class_screencaptureparameters2_captureAudio */
  captureAudio?: boolean
  /* class_screencaptureparameters2_audioParams */
  audioParams?: ScreenAudioParameters
  /* class_screencaptureparameters2_captureVideo */
  captureVideo?: boolean
  /* class_screencaptureparameters2_videoParams */
  videoParams?: ScreenVideoParameters
}

/* class_spatialaudioparams */
export class SpatialAudioParams {
  /* class_spatialaudioparams_speaker_azimuth */
  speaker_azimuth?: number
  /* class_spatialaudioparams_speaker_elevation */
  speaker_elevation?: number
  /* class_spatialaudioparams_speaker_distance */
  speaker_distance?: number
  /* class_spatialaudioparams_speaker_orientation */
  speaker_orientation?: number
  /* class_spatialaudioparams_enable_blur */
  enable_blur?: boolean
  /* class_spatialaudioparams_enable_air_absorb */
  enable_air_absorb?: boolean
  /* class_spatialaudioparams_speaker_attenuation */
  speaker_attenuation?: number
  /* class_spatialaudioparams_enable_doppler */
  enable_doppler?: boolean
}
