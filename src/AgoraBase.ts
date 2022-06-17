import { MediaSourceType, RenderModeType } from './AgoraMediaBase';

export enum ChannelProfileType {
  ChannelProfileCommunication = 0,
  ChannelProfileLiveBroadcasting = 1,
  ChannelProfileGame = 2,
  ChannelProfileCloudGaming = 3,
  ChannelProfileCommunication1v1 = 4,
  ChannelProfileLiveBroadcasting2 = 5,
}

export enum WarnCodeType {
  WarnInvalidView = 8,
  WarnInitVideo = 16,
  WarnPending = 20,
  WarnNoAvailableChannel = 103,
  WarnLookupChannelTimeout = 104,
  WarnLookupChannelRejected = 105,
  WarnOpenChannelTimeout = 106,
  WarnOpenChannelRejected = 107,
  WarnSwitchLiveVideoTimeout = 111,
  WarnSetClientRoleTimeout = 118,
  WarnOpenChannelInvalidTicket = 121,
  WarnOpenChannelTryNextVos = 122,
  WarnChannelConnectionUnrecoverable = 131,
  WarnChannelConnectionIpChanged = 132,
  WarnChannelConnectionPortChanged = 133,
  WarnChannelSocketError = 134,
  WarnAudioMixingOpenError = 701,
  WarnAdmRuntimePlayoutWarning = 1014,
  WarnAdmRuntimeRecordingWarning = 1016,
  WarnAdmRecordAudioSilence = 1019,
  WarnAdmPlayoutMalfunction = 1020,
  WarnAdmRecordMalfunction = 1021,
  WarnAdmIosCategoryNotPlayandrecord = 1029,
  WarnAdmIosSamplerateChange = 1030,
  WarnAdmRecordAudioLowlevel = 1031,
  WarnAdmPlayoutAudioLowlevel = 1032,
  WarnAdmWindowsNoDataReadyEvent = 1040,
  WarnApmHowling = 1051,
  WarnAdmGlitchState = 1052,
  WarnAdmImproperSettings = 1053,
  WarnAdmWinCoreNoRecordingDevice = 1322,
  WarnAdmWinCoreNoPlayoutDevice = 1323,
  WarnAdmWinCoreImproperCaptureRelease = 1324,
}

export enum ErrorCodeType {
  ErrOk = 0,
  ErrFailed = 1,
  ErrInvalidArgument = 2,
  ErrNotReady = 3,
  ErrNotSupported = 4,
  ErrRefused = 5,
  ErrBufferTooSmall = 6,
  ErrNotInitialized = 7,
  ErrInvalidState = 8,
  ErrNoPermission = 9,
  ErrTimedout = 10,
  ErrCanceled = 11,
  ErrTooOften = 12,
  ErrBindSocket = 13,
  ErrNetDown = 14,
  ErrNetNobufs = 15,
  ErrJoinChannelRejected = 17,
  ErrLeaveChannelRejected = 18,
  ErrAlreadyInUse = 19,
  ErrAborted = 20,
  ErrInitNetEngine = 21,
  ErrResourceLimited = 22,
  ErrInvalidAppId = 101,
  ErrInvalidChannelName = 102,
  ErrNoServerResources = 103,
  ErrTokenExpired = 109,
  ErrInvalidToken = 110,
  ErrConnectionInterrupted = 111,
  ErrConnectionLost = 112,
  ErrNotInChannel = 113,
  ErrSizeTooLarge = 114,
  ErrBitrateLimit = 115,
  ErrTooManyDataStreams = 116,
  ErrStreamMessageTimeout = 117,
  ErrSetClientRoleNotAuthorized = 119,
  ErrDecryptionFailed = 120,
  ErrInvalidUserId = 121,
  ErrClientIsBannedByServer = 123,
  ErrWatermarkParam = 124,
  ErrWatermarkPath = 125,
  ErrWatermarkPng = 126,
  ErrWatermarkrInfo = 127,
  ErrWatermarkArgb = 128,
  ErrWatermarkRead = 129,
  ErrEncryptedStreamNotAllowedPublish = 130,
  ErrLicenseCredentialInvalid = 131,
  ErrInvalidUserAccount = 134,
  ErrCertRaw = 157,
  ErrCertJsonPart = 158,
  ErrCertJsonInval = 159,
  ErrCertJsonNomem = 160,
  ErrCertCustom = 161,
  ErrCertCredential = 162,
  ErrCertSign = 163,
  ErrCertFail = 164,
  ErrCertBuf = 165,
  ErrCertNull = 166,
  ErrCertDuedate = 167,
  ErrCertRequest = 168,
  ErrPcmsendFormat = 200,
  ErrPcmsendBufferoverflow = 201,
  ErrLogoutOther = 400,
  ErrLogoutUser = 401,
  ErrLogoutNet = 402,
  ErrLogoutKicked = 403,
  ErrLogoutPacket = 404,
  ErrLogoutTokenExpired = 405,
  ErrLogoutOldversion = 406,
  ErrLogoutTokenWrong = 407,
  ErrLogoutAlreadyLogout = 408,
  ErrLoginOther = 420,
  ErrLoginNet = 421,
  ErrLoginFailed = 422,
  ErrLoginCanceled = 423,
  ErrLoginTokenExpired = 424,
  ErrLoginOldVersion = 425,
  ErrLoginTokenWrong = 426,
  ErrLoginTokenKicked = 427,
  ErrLoginAlreadyLogin = 428,
  ErrJoinChannelOther = 440,
  ErrSendMessageOther = 440,
  ErrSendMessageTimeout = 441,
  ErrQueryUsernumOther = 450,
  ErrQueryUsernumTimeout = 451,
  ErrQueryUsernumByuser = 452,
  ErrLeaveChannelOther = 460,
  ErrLeaveChannelKicked = 461,
  ErrLeaveChannelByuser = 462,
  ErrLeaveChannelLogout = 463,
  ErrLeaveChannelDisconnected = 464,
  ErrInviteOther = 470,
  ErrInviteReinvite = 471,
  ErrInviteNet = 472,
  ErrInvitePeerOffline = 473,
  ErrInviteTimeout = 474,
  ErrInviteCantRecv = 475,
  ErrLoadMediaEngine = 1001,
  ErrStartCall = 1002,
  ErrStartCamera = 1003,
  ErrStartVideoRender = 1004,
  ErrAdmGeneralError = 1005,
  ErrAdmJavaResource = 1006,
  ErrAdmSampleRate = 1007,
  ErrAdmInitPlayout = 1008,
  ErrAdmStartPlayout = 1009,
  ErrAdmStopPlayout = 1010,
  ErrAdmInitRecording = 1011,
  ErrAdmStartRecording = 1012,
  ErrAdmStopRecording = 1013,
  ErrAdmRuntimePlayoutError = 1015,
  ErrAdmRuntimeRecordingError = 1017,
  ErrAdmRecordAudioFailed = 1018,
  ErrAdmInitLoopback = 1022,
  ErrAdmStartLoopback = 1023,
  ErrAdmNoPermission = 1027,
  ErrAdmRecordAudioIsActive = 1033,
  ErrAdmAndroidJniJavaResource = 1101,
  ErrAdmAndroidJniNoRecordFrequency = 1108,
  ErrAdmAndroidJniNoPlaybackFrequency = 1109,
  ErrAdmAndroidJniJavaStartRecord = 1111,
  ErrAdmAndroidJniJavaStartPlayback = 1112,
  ErrAdmAndroidJniJavaRecordError = 1115,
  ErrAdmAndroidOpenslCreateEngine = 1151,
  ErrAdmAndroidOpenslCreateAudioRecorder = 1153,
  ErrAdmAndroidOpenslStartRecorderThread = 1156,
  ErrAdmAndroidOpenslCreateAudioPlayer = 1157,
  ErrAdmAndroidOpenslStartPlayerThread = 1160,
  ErrAdmIosInputNotAvailable = 1201,
  ErrAdmIosActivateSessionFail = 1206,
  ErrAdmIosVpioInitFail = 1210,
  ErrAdmIosVpioReinitFail = 1213,
  ErrAdmIosVpioRestartFail = 1214,
  ErrAdmIosSetRenderCallbackFail = 1219,
  ErrAdmIosSessionSampleratrZero = 1221,
  ErrAdmWinCoreInit = 1301,
  ErrAdmWinCoreInitRecording = 1303,
  ErrAdmWinCoreInitPlayout = 1306,
  ErrAdmWinCoreInitPlayoutNull = 1307,
  ErrAdmWinCoreStartRecording = 1309,
  ErrAdmWinCoreCreateRecThread = 1311,
  ErrAdmWinCoreCaptureNotStartup = 1314,
  ErrAdmWinCoreCreateRenderThread = 1319,
  ErrAdmWinCoreRenderNotStartup = 1320,
  ErrAdmWinCoreNoRecordingDevice = 1322,
  ErrAdmWinCoreNoPlayoutDevice = 1323,
  ErrAdmWinWaveInit = 1351,
  ErrAdmWinWaveInitRecording = 1353,
  ErrAdmWinWaveInitMicrophone = 1354,
  ErrAdmWinWaveInitPlayout = 1355,
  ErrAdmWinWaveInitSpeaker = 1356,
  ErrAdmWinWaveStartRecording = 1357,
  ErrAdmWinWaveStartPlayout = 1358,
  ErrAdmNoRecordingDevice = 1359,
  ErrAdmNoPlayoutDevice = 1360,
  ErrVdmCameraNotAuthorized = 1501,
  ErrVdmWinDeviceInUse = 1502,
  ErrVcmUnknownError = 1600,
  ErrVcmEncoderInitError = 1601,
  ErrVcmEncoderEncodeError = 1602,
  ErrVcmEncoderSetError = 1603,
}

export enum AudioSessionOperationRestriction {
  AudioSessionOperationRestrictionNone = 0,
  AudioSessionOperationRestrictionSetCategory = 1,
  AudioSessionOperationRestrictionConfigureSession = 1 << 1,
  AudioSessionOperationRestrictionDeactivateSession = 1 << 2,
  AudioSessionOperationRestrictionAll = 1 << 7,
}

export enum UserOfflineReasonType {
  UserOfflineQuit = 0,
  UserOfflineDropped = 1,
  UserOfflineBecomeAudience = 2,
}

export enum InterfaceIdType {
  AgoraIidAudioDeviceManager = 1,
  AgoraIidVideoDeviceManager = 2,
  AgoraIidParameterEngine = 3,
  AgoraIidMediaEngine = 4,
  AgoraIidAudioEngine = 5,
  AgoraIidVideoEngine = 6,
  AgoraIidRtcConnection = 7,
  AgoraIidSignalingEngine = 8,
  AgoraIidMediaEngineRegulator = 9,
  AgoraIidCloudSpatialAudio = 10,
  AgoraIidLocalSpatialAudio = 11,
}

export enum QualityType {
  QualityUnknown = 0,
  QualityExcellent = 1,
  QualityGood = 2,
  QualityPoor = 3,
  QualityBad = 4,
  QualityVbad = 5,
  QualityDown = 6,
  QualityUnsupported = 7,
  QualityDetecting = 8,
}

export enum FitModeType {
  ModeCover = 1,
  ModeContain = 2,
}

export enum VideoOrientation {
  VideoOrientation0 = 0,
  VideoOrientation90 = 90,
  VideoOrientation180 = 180,
  VideoOrientation270 = 270,
}

export enum FrameRate {
  FrameRateFps1 = 1,
  FrameRateFps7 = 7,
  FrameRateFps10 = 10,
  FrameRateFps15 = 15,
  FrameRateFps24 = 24,
  FrameRateFps30 = 30,
  FrameRateFps60 = 60,
}

export enum FrameWidth {
  FrameWidth640 = 640,
}

export enum FrameHeight {
  FrameHeight360 = 360,
}

export enum VideoFrameType {
  VideoFrameTypeBlankFrame = 0,
  VideoFrameTypeKeyFrame = 3,
  VideoFrameTypeDeltaFrame = 4,
  VideoFrameTypeBFrame = 5,
  VideoFrameTypeDroppableFrame = 6,
  VideoFrameTypeUnknow = 7,
}

export enum OrientationMode {
  OrientationModeAdaptive = 0,
  OrientationModeFixedLandscape = 1,
  OrientationModeFixedPortrait = 2,
}

export enum DegradationPreference {
  MaintainQuality = 0,
  MaintainFramerate = 1,
  MaintainBalanced = 2,
  MaintainResolution = 3,
  DISABLED = 100,
}

export class VideoDimensions {
  width?: number;
  height?: number;
}

export enum VideoCodecType {
  VideoCodecNone = 0,
  VideoCodecVp8 = 1,
  VideoCodecH264 = 2,
  VideoCodecH265 = 3,
  VideoCodecVp9 = 5,
  VideoCodecGeneric = 6,
  VideoCodecGenericH264 = 7,
  VideoCodecAv1 = 12,
  VideoCodecGenericJpeg = 20,
}

export enum TCcMode {
  CcEnabled = 0,
  CcDisabled = 1,
}

export class SenderOptions {
  ccMode?: TCcMode;
  codecType?: VideoCodecType;
  targetBitrate?: number;
}

export enum AudioCodecType {
  AudioCodecOpus = 1,
  AudioCodecPcma = 3,
  AudioCodecPcmu = 4,
  AudioCodecG722 = 5,
  AudioCodecAaclc = 8,
  AudioCodecHeaac = 9,
  AudioCodecJc1 = 10,
  AudioCodecHeaac2 = 11,
  AudioCodecLpcnet = 12,
}

export enum AudioEncodingType {
  AudioEncodingTypeAac16000Low = 0x010101,
  AudioEncodingTypeAac16000Medium = 0x010102,
  AudioEncodingTypeAac32000Low = 0x010201,
  AudioEncodingTypeAac32000Medium = 0x010202,
  AudioEncodingTypeAac32000High = 0x010203,
  AudioEncodingTypeAac48000Medium = 0x010302,
  AudioEncodingTypeAac48000High = 0x010303,
  AudioEncodingTypeOpus16000Low = 0x020101,
  AudioEncodingTypeOpus16000Medium = 0x020102,
  AudioEncodingTypeOpus48000Medium = 0x020302,
  AudioEncodingTypeOpus48000High = 0x020303,
}

export enum WatermarkFitMode {
  FitModeCoverPosition = 0,
  FitModeUseImageRatio = 1,
}

export class EncodedAudioFrameAdvancedSettings {
  speech?: boolean;
  sendEvenIfEmpty?: boolean;
}

export class EncodedAudioFrameInfo {
  codec?: AudioCodecType;
  sampleRateHz?: number;
  samplesPerChannel?: number;
  numberOfChannels?: number;
  advancedSettings?: EncodedAudioFrameAdvancedSettings;
}

export class AudioPcmDataInfo {
  samplesPerChannel?: number;
  channelNum?: number;
  samplesOut?: number;
  elapsedTimeMs?: number;
  ntpTimeMs?: number;
}

export enum H264PacketizeMode {
  NonInterleaved = 0,
  SingleNalUnit = 1,
}

export enum VideoStreamType {
  VideoStreamHigh = 0,
  VideoStreamLow = 1,
}

export class EncodedVideoFrameInfo {
  codecType?: VideoCodecType;
  width?: number;
  height?: number;
  framesPerSecond?: number;
  frameType?: VideoFrameType;
  rotation?: VideoOrientation;
  trackId?: number;
  renderTimeMs?: number;
  internalSendTs?: number;
  uid?: number;
  streamType?: VideoStreamType;
}

export enum VideoMirrorModeType {
  VideoMirrorModeAuto = 0,
  VideoMirrorModeEnabled = 1,
  VideoMirrorModeDisabled = 2,
}

export class VideoEncoderConfiguration {
  codecType?: VideoCodecType;
  dimensions?: VideoDimensions;
  frameRate?: number;
  bitrate?: number;
  minBitrate?: number;
  orientationMode?: OrientationMode;
  degradationPreference?: DegradationPreference;
  mirrorMode?: VideoMirrorModeType;
}

export class DataStreamConfig {
  syncWithAudio?: boolean;
  ordered?: boolean;
}

export class SimulcastStreamConfig {
  dimensions?: VideoDimensions;
  bitrate?: number;
  framerate?: number;
}

export class Rectangle {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export class WatermarkRatio {
  xRatio?: number;
  yRatio?: number;
  widthRatio?: number;
}

export class WatermarkOptions {
  visibleInPreview?: boolean;
  positionInLandscapeMode?: Rectangle;
  positionInPortraitMode?: Rectangle;
  watermarkRatio?: WatermarkRatio;
  mode?: WatermarkFitMode;
}

export class RtcStats {
  duration?: number;
  txBytes?: number;
  rxBytes?: number;
  txAudioBytes?: number;
  txVideoBytes?: number;
  rxAudioBytes?: number;
  rxVideoBytes?: number;
  txKBitRate?: number;
  rxKBitRate?: number;
  rxAudioKBitRate?: number;
  txAudioKBitRate?: number;
  rxVideoKBitRate?: number;
  txVideoKBitRate?: number;
  lastmileDelay?: number;
  userCount?: number;
  cpuAppUsage?: number;
  cpuTotalUsage?: number;
  gatewayRtt?: number;
  memoryAppUsageRatio?: number;
  memoryTotalUsageRatio?: number;
  memoryAppUsageInKbytes?: number;
  connectTimeMs?: number;
  firstAudioPacketDuration?: number;
  firstVideoPacketDuration?: number;
  firstVideoKeyFramePacketDuration?: number;
  packetsBeforeFirstKeyFramePacket?: number;
  firstAudioPacketDurationAfterUnmute?: number;
  firstVideoPacketDurationAfterUnmute?: number;
  firstVideoKeyFramePacketDurationAfterUnmute?: number;
  firstVideoKeyFrameDecodedDurationAfterUnmute?: number;
  firstVideoKeyFrameRenderedDurationAfterUnmute?: number;
  txPacketLossRate?: number;
  rxPacketLossRate?: number;
}

export enum VideoSourceType {
  VideoSourceCameraPrimary = 0,
  VideoSourceCamera = 0,
  VideoSourceCameraSecondary = 1,
  VideoSourceScreenPrimary = 2,
  VideoSourceScreen = 2,
  VideoSourceScreenSecondary = 3,
  VideoSourceCustom = 4,
  VideoSourceMediaPlayer = 5,
  VideoSourceRtcImagePng = 6,
  VideoSourceRtcImageJpeg = 7,
  VideoSourceRtcImageGif = 8,
  VideoSourceRemote = 9,
  VideoSourceTranscoded = 10,
  VideoSourceUnknown = 100,
}

export enum ClientRoleType {
  ClientRoleBroadcaster = 1,
  ClientRoleAudience = 2,
}

export enum QualityAdaptIndication {
  AdaptNone = 0,
  AdaptUpBandwidth = 1,
  AdaptDownBandwidth = 2,
}

export enum AudienceLatencyLevelType {
  AudienceLatencyLevelLowLatency = 1,
  AudienceLatencyLevelUltraLowLatency = 2,
  AudienceLatencyLevelHighLatency = 3,
}

export class ClientRoleOptions {
  audienceLatencyLevel?: AudienceLatencyLevelType;
}

export enum ExperienceQualityType {
  ExperienceQualityGood = 0,
  ExperienceQualityBad = 1,
}

export class RemoteAudioStats {
  uid?: number;
  quality?: number;
  networkTransportDelay?: number;
  jitterBufferDelay?: number;
  audioLossRate?: number;
  numChannels?: number;
  receivedSampleRate?: number;
  receivedBitrate?: number;
  totalFrozenTime?: number;
  frozenRate?: number;
  mosValue?: number;
  totalActiveTime?: number;
  publishDuration?: number;
  qoeQuality?: number;
}

export enum AudioProfileType {
  AudioProfileDefault = 0,
  AudioProfileSpeechStandard = 1,
  AudioProfileMusicStandard = 2,
  AudioProfileMusicStandardStereo = 3,
  AudioProfileMusicHighQuality = 4,
  AudioProfileMusicHighQualityStereo = 5,
  AudioProfileIot = 6,
  AudioProfileNum = 7,
}

export enum AudioScenarioType {
  AudioScenarioDefault = 0,
  AudioScenarioGameStreaming = 3,
  AudioScenarioChatroom = 5,
  AudioScenarioHighDefinition = 6,
  AudioScenarioChorus = 7,
  AudioScenarioNum = 8,
}

export class VideoFormat {
  width?: number;
  height?: number;
  fps?: number;
}

export enum VideoContentHint {
  ContentHintNone = 0,
  ContentHintMotion = 1,
  ContentHintDetails = 2,
}

export enum LocalAudioStreamState {
  LocalAudioStreamStateStopped = 0,
  LocalAudioStreamStateRecording = 1,
  LocalAudioStreamStateEncoding = 2,
  LocalAudioStreamStateFailed = 3,
}

export enum LocalAudioStreamError {
  LocalAudioStreamErrorOk = 0,
  LocalAudioStreamErrorFailure = 1,
  LocalAudioStreamErrorDeviceNoPermission = 2,
  LocalAudioStreamErrorDeviceBusy = 3,
  LocalAudioStreamErrorRecordFailure = 4,
  LocalAudioStreamErrorEncodeFailure = 5,
}

export enum LocalVideoStreamState {
  LocalVideoStreamStateStopped = 0,
  LocalVideoStreamStateCapturing = 1,
  LocalVideoStreamStateEncoding = 2,
  LocalVideoStreamStateFailed = 3,
}

export enum LocalVideoStreamError {
  LocalVideoStreamErrorOk = 0,
  LocalVideoStreamErrorFailure = 1,
  LocalVideoStreamErrorDeviceNoPermission = 2,
  LocalVideoStreamErrorDeviceBusy = 3,
  LocalVideoStreamErrorCaptureFailure = 4,
  LocalVideoStreamErrorEncodeFailure = 5,
  LocalVideoStreamErrorCaptureInbackground = 6,
  LocalVideoStreamErrorCaptureMultipleForegroundApps = 7,
  LocalVideoStreamErrorDeviceNotFound = 8,
  LocalVideoStreamErrorDeviceDisconnected = 9,
  LocalVideoStreamErrorDeviceInvalidId = 10,
  LocalVideoStreamErrorDeviceSystemPressure = 101,
  LocalVideoStreamErrorScreenCaptureWindowMinimized = 11,
  LocalVideoStreamErrorScreenCaptureWindowClosed = 12,
  LocalVideoStreamErrorScreenCaptureWindowOccluded = 13,
  LocalVideoStreamErrorScreenCaptureWindowNotSupported = 20,
}

export enum RemoteAudioState {
  RemoteAudioStateStopped = 0,
  RemoteAudioStateStarting = 1,
  RemoteAudioStateDecoding = 2,
  RemoteAudioStateFrozen = 3,
  RemoteAudioStateFailed = 4,
}

export enum RemoteAudioStateReason {
  RemoteAudioReasonInternal = 0,
  RemoteAudioReasonNetworkCongestion = 1,
  RemoteAudioReasonNetworkRecovery = 2,
  RemoteAudioReasonLocalMuted = 3,
  RemoteAudioReasonLocalUnmuted = 4,
  RemoteAudioReasonRemoteMuted = 5,
  RemoteAudioReasonRemoteUnmuted = 6,
  RemoteAudioReasonRemoteOffline = 7,
}

export enum RemoteVideoState {
  RemoteVideoStateStopped = 0,
  RemoteVideoStateStarting = 1,
  RemoteVideoStateDecoding = 2,
  RemoteVideoStateFrozen = 3,
  RemoteVideoStateFailed = 4,
}

export enum RemoteVideoStateReason {
  RemoteVideoStateReasonInternal = 0,
  RemoteVideoStateReasonNetworkCongestion = 1,
  RemoteVideoStateReasonNetworkRecovery = 2,
  RemoteVideoStateReasonLocalMuted = 3,
  RemoteVideoStateReasonLocalUnmuted = 4,
  RemoteVideoStateReasonRemoteMuted = 5,
  RemoteVideoStateReasonRemoteUnmuted = 6,
  RemoteVideoStateReasonRemoteOffline = 7,
  RemoteVideoStateReasonAudioFallback = 8,
  RemoteVideoStateReasonAudioFallbackRecovery = 9,
  RemoteVideoStateReasonVideoStreamTypeChangeToLow = 10,
  RemoteVideoStateReasonVideoStreamTypeChangeToHigh = 11,
}

export enum RemoteUserState {
  UserStateMuteAudio = 1 << 0,
  UserStateMuteVideo = 1 << 1,
  UserStateEnableVideo = 1 << 4,
  UserStateEnableLocalVideo = 1 << 8,
}

export class VideoTrackInfo {
  isLocal?: boolean;
  ownerUid?: number;
  trackId?: number;
  channelId?: string;
  streamType?: VideoStreamType;
  codecType?: VideoCodecType;
  encodedFrameOnly?: boolean;
  sourceType?: VideoSourceType;
  observationPosition?: number;
}

export enum RemoteVideoDownscaleLevel {
  RemoteVideoDownscaleLevelNone = 0,
  RemoteVideoDownscaleLevel1 = 1,
  RemoteVideoDownscaleLevel2 = 2,
  RemoteVideoDownscaleLevel3 = 3,
  RemoteVideoDownscaleLevel4 = 4,
}

export class AudioVolumeInfo {
  uid?: number;
  volume?: number;
  vad?: number;
  voicePitch?: number;
}

export class DeviceInfo {
  isLowLatencyAudioSupported?: boolean;
}

export class Packet {
  buffer?: Uint8Array;
  size?: number;
}

export enum AudioSampleRateType {
  AudioSampleRate32000 = 32000,
  AudioSampleRate44100 = 44100,
  AudioSampleRate48000 = 48000,
}

export enum VideoCodecTypeForStream {
  VideoCodecH264ForStream = 1,
  VideoCodecH265ForStream = 2,
}

export enum VideoCodecProfileType {
  VideoCodecProfileBaseline = 66,
  VideoCodecProfileMain = 77,
  VideoCodecProfileHigh = 100,
}

export enum AudioCodecProfileType {
  AudioCodecProfileLcAac = 0,
  AudioCodecProfileHeAac = 1,
  AudioCodecProfileHeAacV2 = 2,
}

export class LocalAudioStats {
  numChannels?: number;
  sentSampleRate?: number;
  sentBitrate?: number;
  internalCodec?: number;
  txPacketLossRate?: number;
}

export enum RtmpStreamPublishState {
  RtmpStreamPublishStateIdle = 0,
  RtmpStreamPublishStateConnecting = 1,
  RtmpStreamPublishStateRunning = 2,
  RtmpStreamPublishStateRecovering = 3,
  RtmpStreamPublishStateFailure = 4,
  RtmpStreamPublishStateDisconnecting = 5,
}

export enum RtmpStreamPublishErrorType {
  RtmpStreamPublishErrorOk = 0,
  RtmpStreamPublishErrorInvalidArgument = 1,
  RtmpStreamPublishErrorEncryptedStreamNotAllowed = 2,
  RtmpStreamPublishErrorConnectionTimeout = 3,
  RtmpStreamPublishErrorInternalServerError = 4,
  RtmpStreamPublishErrorRtmpServerError = 5,
  RtmpStreamPublishErrorTooOften = 6,
  RtmpStreamPublishErrorReachLimit = 7,
  RtmpStreamPublishErrorNotAuthorized = 8,
  RtmpStreamPublishErrorStreamNotFound = 9,
  RtmpStreamPublishErrorFormatNotSupported = 10,
  RtmpStreamPublishErrorNotBroadcaster = 11,
  RtmpStreamPublishErrorTranscodingNoMixStream = 13,
  RtmpStreamPublishErrorNetDown = 14,
  RtmpStreamPublishErrorInvalidAppid = 15,
  RtmpStreamUnpublishErrorOk = 100,
}

export enum RtmpStreamingEvent {
  RtmpStreamingEventFailedLoadImage = 1,
  RtmpStreamingEventUrlAlreadyInUse = 2,
  RtmpStreamingEventAdvancedFeatureNotSupport = 3,
  RtmpStreamingEventRequestTooOften = 4,
}

export class RtcImage {
  url?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  zOrder?: number;
  alpha?: number;
}

export class LiveStreamAdvancedFeature {
  featureName?: string;
  opened?: boolean;
}

export enum ConnectionStateType {
  ConnectionStateDisconnected = 1,
  ConnectionStateConnecting = 2,
  ConnectionStateConnected = 3,
  ConnectionStateReconnecting = 4,
  ConnectionStateFailed = 5,
}

export class TranscodingUser {
  uid?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  zOrder?: number;
  alpha?: number;
  audioChannel?: number;
}

export class LiveTranscoding {
  width?: number;
  height?: number;
  videoBitrate?: number;
  videoFramerate?: number;
  lowLatency?: boolean;
  videoGop?: number;
  videoCodecProfile?: VideoCodecProfileType;
  backgroundColor?: number;
  videoCodecType?: VideoCodecTypeForStream;
  userCount?: number;
  transcodingUsers?: TranscodingUser[];
  transcodingExtraInfo?: string;
  metadata?: string;
  watermark?: RtcImage[];
  watermarkCount?: number;
  backgroundImage?: RtcImage[];
  backgroundImageCount?: number;
  audioSampleRate?: AudioSampleRateType;
  audioBitrate?: number;
  audioChannels?: number;
  audioCodecProfile?: AudioCodecProfileType;
  advancedFeatures?: LiveStreamAdvancedFeature[];
  advancedFeatureCount?: number;
}

export class TranscodingVideoStream {
  sourceType?: MediaSourceType;
  remoteUserUid?: number;
  imageUrl?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  zOrder?: number;
  alpha?: number;
  mirror?: boolean;
}

export class LocalTranscoderConfiguration {
  streamCount?: number;
  VideoInputStreams?: TranscodingVideoStream[];
  videoOutputConfiguration?: VideoEncoderConfiguration;
}

export class LastmileProbeConfig {
  probeUplink?: boolean;
  probeDownlink?: boolean;
  expectedUplinkBitrate?: number;
  expectedDownlinkBitrate?: number;
}

export enum LastmileProbeResultState {
  LastmileProbeResultComplete = 1,
  LastmileProbeResultIncompleteNoBwe = 2,
  LastmileProbeResultUnavailable = 3,
}

export class LastmileProbeOneWayResult {
  packetLossRate?: number;
  jitter?: number;
  availableBandwidth?: number;
}

export class LastmileProbeResult {
  state?: LastmileProbeResultState;
  uplinkReport?: LastmileProbeOneWayResult;
  downlinkReport?: LastmileProbeOneWayResult;
  rtt?: number;
}

export enum ConnectionChangedReasonType {
  ConnectionChangedConnecting = 0,
  ConnectionChangedJoinSuccess = 1,
  ConnectionChangedInterrupted = 2,
  ConnectionChangedBannedByServer = 3,
  ConnectionChangedJoinFailed = 4,
  ConnectionChangedLeaveChannel = 5,
  ConnectionChangedInvalidAppId = 6,
  ConnectionChangedInvalidChannelName = 7,
  ConnectionChangedInvalidToken = 8,
  ConnectionChangedTokenExpired = 9,
  ConnectionChangedRejectedByServer = 10,
  ConnectionChangedSettingProxyServer = 11,
  ConnectionChangedRenewToken = 12,
  ConnectionChangedClientIpAddressChanged = 13,
  ConnectionChangedKeepAliveTimeout = 14,
  ConnectionChangedRejoinSuccess = 15,
  ConnectionChangedLost = 16,
  ConnectionChangedEchoTest = 17,
  ConnectionChangedClientIpAddressChangedByUser = 18,
  ConnectionChangedSameUidLogin = 19,
  ConnectionChangedTooManyBroadcasters = 20,
}

export enum ClientRoleChangeFailedReason {
  ClientRoleChangeFailedTooManyBroadcasters = 1,
  ClientRoleChangeFailedNotAuthorized = 2,
  ClientRoleChangeFailedRequestTimeOut = 3,
  ClientRoleChangeFailedConnectionFailed = 4,
}

export enum NetworkType {
  NetworkTypeUnknown = -1,
  NetworkTypeDisconnected = 0,
  NetworkTypeLan = 1,
  NetworkTypeWifi = 2,
  NetworkTypeMobile2g = 3,
  NetworkTypeMobile3g = 4,
  NetworkTypeMobile4g = 5,
}

export enum VideoViewSetupMode {
  VideoViewSetupReplace = 0,
  VideoViewSetupAdd = 1,
  VideoViewSetupRemove = 2,
}

export class VideoCanvas {
  view?: any;
  renderMode?: RenderModeType;
  mirrorMode?: VideoMirrorModeType;
  uid?: number;
  isScreenView?: boolean;
  priv?: number[];
  priv_size?: number;
  sourceType?: VideoSourceType;
  cropArea?: Rectangle;
  setupMode?: VideoViewSetupMode;
}

export enum LighteningContrastLevel {
  LighteningContrastLow = 0,
  LighteningContrastNormal = 1,
  LighteningContrastHigh = 2,
}

export class BeautyOptions {
  lighteningContrastLevel?: LighteningContrastLevel;
  lighteningLevel?: number;
  smoothnessLevel?: number;
  rednessLevel?: number;
  sharpnessLevel?: number;
}

export enum BackgroundSourceType {
  BackgroundColor = 1,
  BackgroundImg = 2,
  BackgroundBlur = 3,
}

export enum BackgroundBlurDegree {
  BlurDegreeLow = 1,
  BlurDegreeMedium = 2,
  BlurDegreeHigh = 3,
}

export class VirtualBackgroundSource {
  background_source_type?: BackgroundSourceType;
  color?: number;
  source?: string;
  blur_degree?: BackgroundBlurDegree;
}

export class FishCorrectionParams {
  _x_center?: number;
  _y_center?: number;
  _scale_factor?: number;
  _focal_length?: number;
  _pol_focal_length?: number;
  _split_height?: number;
  _ss?: number[];
}

export enum VoiceBeautifierPreset {
  VoiceBeautifierOff = 0x00000000,
  ChatBeautifierMagnetic = 0x01010100,
  ChatBeautifierFresh = 0x01010200,
  ChatBeautifierVitality = 0x01010300,
  SingingBeautifier = 0x01020100,
  TimbreTransformationVigorous = 0x01030100,
  TimbreTransformationDeep = 0x01030200,
  TimbreTransformationMellow = 0x01030300,
  TimbreTransformationFalsetto = 0x01030400,
  TimbreTransformationFull = 0x01030500,
  TimbreTransformationClear = 0x01030600,
  TimbreTransformationResounding = 0x01030700,
  TimbreTransformationRinging = 0x01030800,
  UltraHighQualityVoice = 0x01040100,
}

export enum AudioEffectPreset {
  AudioEffectOff = 0x00000000,
  RoomAcousticsKtv = 0x02010100,
  RoomAcousticsVocalConcert = 0x02010200,
  RoomAcousticsStudio = 0x02010300,
  RoomAcousticsPhonograph = 0x02010400,
  RoomAcousticsVirtualStereo = 0x02010500,
  RoomAcousticsSpacial = 0x02010600,
  RoomAcousticsEthereal = 0x02010700,
  RoomAcoustics3dVoice = 0x02010800,
  VoiceChangerEffectUncle = 0x02020100,
  VoiceChangerEffectOldman = 0x02020200,
  VoiceChangerEffectBoy = 0x02020300,
  VoiceChangerEffectSister = 0x02020400,
  VoiceChangerEffectGirl = 0x02020500,
  VoiceChangerEffectPigking = 0x02020600,
  VoiceChangerEffectHulk = 0x02020700,
  StyleTransformationRnb = 0x02030100,
  StyleTransformationPopular = 0x02030200,
  PitchCorrection = 0x02040100,
}

export enum VoiceConversionPreset {
  VoiceConversionOff = 0x00000000,
  VoiceChangerNeutral = 0x03010100,
  VoiceChangerSweet = 0x03010200,
  VoiceChangerSolid = 0x03010300,
  VoiceChangerBass = 0x03010400,
}

export class ScreenCaptureParameters {
  dimensions?: VideoDimensions;
  frameRate?: number;
  bitrate?: number;
  captureMouseCursor?: boolean;
  windowFocus?: boolean;
  excludeWindowList?: any[];
  excludeWindowCount?: number;
}

export enum AudioRecordingQualityType {
  AudioRecordingQualityLow = 0,
  AudioRecordingQualityMedium = 1,
  AudioRecordingQualityHigh = 2,
}

export enum AudioFileRecordingType {
  AudioFileRecordingMic = 1,
  AudioFileRecordingPlayback = 2,
  AudioFileRecordingMixed = 3,
}

export enum AudioEncodedFrameObserverPosition {
  AudioEncodedFrameObserverPositionRecord = 1,
  AudioEncodedFrameObserverPositionPlayback = 2,
  AudioEncodedFrameObserverPositionMixed = 3,
}

export class AudioRecordingConfiguration {
  filePath?: string;
  encode?: boolean;
  sampleRate?: number;
  fileRecordingType?: AudioFileRecordingType;
  quality?: AudioRecordingQualityType;
}

export class AudioEncodedFrameObserverConfig {
  postionType?: AudioEncodedFrameObserverPosition;
  encodingType?: AudioEncodingType;
}

export enum AreaCode {
  AreaCodeCn = 0x00000001,
  AreaCodeNa = 0x00000002,
  AreaCodeEu = 0x00000004,
  AreaCodeAs = 0x00000008,
  AreaCodeJp = 0x00000010,
  AreaCodeIn = 0x00000020,
  AreaCodeGlob = 0xffffffff,
}

export enum AreaCodeEx {
  AreaCodeOc = 0x00000040,
  AreaCodeSa = 0x00000080,
  AreaCodeAf = 0x00000100,
  AreaCodeKr = 0x00000200,
  AreaCodeOvs = 0xfffffffe,
}

export enum ChannelMediaRelayError {
  RelayOk = 0,
  RelayErrorServerErrorResponse = 1,
  RelayErrorServerNoResponse = 2,
  RelayErrorNoResourceAvailable = 3,
  RelayErrorFailedJoinSrc = 4,
  RelayErrorFailedJoinDest = 5,
  RelayErrorFailedPacketReceivedFromSrc = 6,
  RelayErrorFailedPacketSentToDest = 7,
  RelayErrorServerConnectionLost = 8,
  RelayErrorInternalError = 9,
  RelayErrorSrcTokenExpired = 10,
  RelayErrorDestTokenExpired = 11,
}

export enum ChannelMediaRelayEvent {
  RelayEventNetworkDisconnected = 0,
  RelayEventNetworkConnected = 1,
  RelayEventPacketJoinedSrcChannel = 2,
  RelayEventPacketJoinedDestChannel = 3,
  RelayEventPacketSentToDestChannel = 4,
  RelayEventPacketReceivedVideoFromSrc = 5,
  RelayEventPacketReceivedAudioFromSrc = 6,
  RelayEventPacketUpdateDestChannel = 7,
  RelayEventPacketUpdateDestChannelRefused = 8,
  RelayEventPacketUpdateDestChannelNotChange = 9,
  RelayEventPacketUpdateDestChannelIsNull = 10,
  RelayEventVideoProfileUpdate = 11,
  RelayEventPauseSendPacketToDestChannelSuccess = 12,
  RelayEventPauseSendPacketToDestChannelFailed = 13,
  RelayEventResumeSendPacketToDestChannelSuccess = 14,
  RelayEventResumeSendPacketToDestChannelFailed = 15,
}

export enum ChannelMediaRelayState {
  RelayStateIdle = 0,
  RelayStateConnecting = 1,
  RelayStateRunning = 2,
  RelayStateFailure = 3,
}

export class ChannelMediaInfo {
  channelName?: string;
  token?: string;
  uid?: number;
}

export class ChannelMediaRelayConfiguration {
  srcInfo?: ChannelMediaInfo;
  destInfos?: ChannelMediaInfo[];
  destCount?: number;
}

export class UplinkNetworkInfo {
  video_encoder_target_bitrate_bps?: number;
}

export class PeerDownlinkInfo {
  uid?: string;
  stream_type?: VideoStreamType;
  current_downscale_level?: RemoteVideoDownscaleLevel;
  expected_bitrate_bps?: number;
}

export class DownlinkNetworkInfo {
  lastmile_buffer_delay_time_ms?: number;
  bandwidth_estimation_bps?: number;
  total_downscale_level_count?: number;
  peer_downlink_info?: PeerDownlinkInfo[];
  total_received_video_count?: number;
}

export enum EncryptionMode {
  Aes128Xts = 1,
  Aes128Ecb = 2,
  Aes256Xts = 3,
  Sm4128Ecb = 4,
  Aes128Gcm = 5,
  Aes256Gcm = 6,
  Aes128Gcm2 = 7,
  Aes256Gcm2 = 8,
  ModeEnd = 9,
}

export class EncryptionConfig {
  encryptionMode?: EncryptionMode;
  encryptionKey?: string;
  encryptionKdfSalt?: number[];
}

export enum EncryptionErrorType {
  EncryptionErrorInternalFailure = 0,
  EncryptionErrorDecryptionFailure = 1,
  EncryptionErrorEncryptionFailure = 2,
}

export enum UploadErrorReason {
  UploadSuccess = 0,
  UploadNetError = 1,
  UploadServerError = 2,
}

export enum PermissionType {
  RecordAudio = 0,
  CAMERA = 1,
}

export enum MaxUserAccountLengthType {
  MaxUserAccountLength = 256,
}

export enum StreamSubscribeState {
  SubStateIdle = 0,
  SubStateNoSubscribed = 1,
  SubStateSubscribing = 2,
  SubStateSubscribed = 3,
}

export enum StreamPublishState {
  PubStateIdle = 0,
  PubStateNoPublished = 1,
  PubStatePublishing = 2,
  PubStatePublished = 3,
}

export class UserInfo {
  uid?: number;
  userAccount?: string;
}

export enum EarMonitoringFilterType {
  EarMonitoringFilterNone = 1 << 0,
  EarMonitoringFilterBuiltInAudioFilters = 1 << 1,
  EarMonitoringFilterNoiseSuppression = 1 << 2,
}

export enum ThreadPriorityType {
  LOWEST = 0,
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  HIGHEST = 4,
  CRITICAL = 5,
}

export class SpatialAudioParams {
  speaker_azimuth?: number;
  speaker_elevation?: number;
  speaker_distance?: number;
  speaker_orientation?: number;
  enable_blur?: boolean;
  enable_air_absorb?: boolean;
}
