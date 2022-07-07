import { MediaSourceType, RenderModeType } from './AgoraMediaBase';

/*
 * 频道场景。
 */
export enum ChannelProfileType {
  /*
   * 0: 通信场景。当频道中只有两个用户时，建议使用该场景。
   */
  ChannelProfileCommunication = 0,
  /*
   * 1: 直播场景。直播场景。当频道中超过两个用户时，建议使用该场景。
   */
  ChannelProfileLiveBroadcasting = 1,
  /*
   * 2: （已废弃）游戏场景。
   */
  ChannelProfileGame = 2,
  /*
   * 3: 互动场景。该场景对延时进行了优化。如果你的场景中有用户需要频道互动， 建议使用该场景。
   */
  ChannelProfileCloudGaming = 3,
  /*
   * TODO(doc)
   */
  ChannelProfileCommunication1v1 = 4,
  /*
   * TODO(doc)
   */
  ChannelProfileLiveBroadcasting2 = 5,
}

/*
 * TODO(doc)
 */
export enum WarnCodeType {
  /*
   * TODO(doc)
   */
  WarnInvalidView = 8,
  /*
   * TODO(doc)
   */
  WarnInitVideo = 16,
  /*
   * TODO(doc)
   */
  WarnPending = 20,
  /*
   * TODO(doc)
   */
  WarnNoAvailableChannel = 103,
  /*
   * TODO(doc)
   */
  WarnLookupChannelTimeout = 104,
  /*
   * TODO(doc)
   */
  WarnLookupChannelRejected = 105,
  /*
   * TODO(doc)
   */
  WarnOpenChannelTimeout = 106,
  /*
   * TODO(doc)
   */
  WarnOpenChannelRejected = 107,
  /*
   * TODO(doc)
   */
  WarnSwitchLiveVideoTimeout = 111,
  /*
   * TODO(doc)
   */
  WarnSetClientRoleTimeout = 118,
  /*
   * TODO(doc)
   */
  WarnOpenChannelInvalidTicket = 121,
  /*
   * TODO(doc)
   */
  WarnOpenChannelTryNextVos = 122,
  /*
   * TODO(doc)
   */
  WarnChannelConnectionUnrecoverable = 131,
  /*
   * TODO(doc)
   */
  WarnChannelConnectionIpChanged = 132,
  /*
   * TODO(doc)
   */
  WarnChannelConnectionPortChanged = 133,
  /*
   * TODO(doc)
   */
  WarnChannelSocketError = 134,
  /*
   * TODO(doc)
   */
  WarnAudioMixingOpenError = 701,
  /*
   * TODO(doc)
   */
  WarnAdmRuntimePlayoutWarning = 1014,
  /*
   * TODO(doc)
   */
  WarnAdmRuntimeRecordingWarning = 1016,
  /*
   * TODO(doc)
   */
  WarnAdmRecordAudioSilence = 1019,
  /*
   * TODO(doc)
   */
  WarnAdmPlayoutMalfunction = 1020,
  /*
   * TODO(doc)
   */
  WarnAdmRecordMalfunction = 1021,
  /*
   * TODO(doc)
   */
  WarnAdmIosCategoryNotPlayandrecord = 1029,
  /*
   * TODO(doc)
   */
  WarnAdmIosSamplerateChange = 1030,
  /*
   * TODO(doc)
   */
  WarnAdmRecordAudioLowlevel = 1031,
  /*
   * TODO(doc)
   */
  WarnAdmPlayoutAudioLowlevel = 1032,
  /*
   * TODO(doc)
   */
  WarnAdmWindowsNoDataReadyEvent = 1040,
  /*
   * TODO(doc)
   */
  WarnApmHowling = 1051,
  /*
   * TODO(doc)
   */
  WarnAdmGlitchState = 1052,
  /*
   * TODO(doc)
   */
  WarnAdmImproperSettings = 1053,
  /*
   * TODO(doc)
   */
  WarnAdmWinCoreNoRecordingDevice = 1322,
  /*
   * TODO(doc)
   */
  WarnAdmWinCoreNoPlayoutDevice = 1323,
  /*
   * TODO(doc)
   */
  WarnAdmWinCoreImproperCaptureRelease = 1324,
}

/*
 * TODO(doc)
 */
export enum ErrorCodeType {
  /*
   * TODO(doc)
   */
  ErrOk = 0,
  /*
   * TODO(doc)
   */
  ErrFailed = 1,
  /*
   * TODO(doc)
   */
  ErrInvalidArgument = 2,
  /*
   * TODO(doc)
   */
  ErrNotReady = 3,
  /*
   * TODO(doc)
   */
  ErrNotSupported = 4,
  /*
   * TODO(doc)
   */
  ErrRefused = 5,
  /*
   * TODO(doc)
   */
  ErrBufferTooSmall = 6,
  /*
   * TODO(doc)
   */
  ErrNotInitialized = 7,
  /*
   * TODO(doc)
   */
  ErrInvalidState = 8,
  /*
   * TODO(doc)
   */
  ErrNoPermission = 9,
  /*
   * TODO(doc)
   */
  ErrTimedout = 10,
  /*
   * TODO(doc)
   */
  ErrCanceled = 11,
  /*
   * TODO(doc)
   */
  ErrTooOften = 12,
  /*
   * TODO(doc)
   */
  ErrBindSocket = 13,
  /*
   * TODO(doc)
   */
  ErrNetDown = 14,
  /*
   * TODO(doc)
   */
  ErrNetNobufs = 15,
  /*
   * TODO(doc)
   */
  ErrJoinChannelRejected = 17,
  /*
   * TODO(doc)
   */
  ErrLeaveChannelRejected = 18,
  /*
   * TODO(doc)
   */
  ErrAlreadyInUse = 19,
  /*
   * TODO(doc)
   */
  ErrAborted = 20,
  /*
   * TODO(doc)
   */
  ErrInitNetEngine = 21,
  /*
   * TODO(doc)
   */
  ErrResourceLimited = 22,
  /*
   * TODO(doc)
   */
  ErrInvalidAppId = 101,
  /*
   * TODO(doc)
   */
  ErrInvalidChannelName = 102,
  /*
   * TODO(doc)
   */
  ErrNoServerResources = 103,
  /*
   * TODO(doc)
   */
  ErrTokenExpired = 109,
  /*
   * TODO(doc)
   */
  ErrInvalidToken = 110,
  /*
   * TODO(doc)
   */
  ErrConnectionInterrupted = 111,
  /*
   * TODO(doc)
   */
  ErrConnectionLost = 112,
  /*
   * TODO(doc)
   */
  ErrNotInChannel = 113,
  /*
   * TODO(doc)
   */
  ErrSizeTooLarge = 114,
  /*
   * TODO(doc)
   */
  ErrBitrateLimit = 115,
  /*
   * TODO(doc)
   */
  ErrTooManyDataStreams = 116,
  /*
   * TODO(doc)
   */
  ErrStreamMessageTimeout = 117,
  /*
   * TODO(doc)
   */
  ErrSetClientRoleNotAuthorized = 119,
  /*
   * TODO(doc)
   */
  ErrDecryptionFailed = 120,
  /*
   * TODO(doc)
   */
  ErrInvalidUserId = 121,
  /*
   * TODO(doc)
   */
  ErrClientIsBannedByServer = 123,
  /*
   * TODO(doc)
   */
  ErrWatermarkParam = 124,
  /*
   * TODO(doc)
   */
  ErrWatermarkPath = 125,
  /*
   * TODO(doc)
   */
  ErrWatermarkPng = 126,
  /*
   * TODO(doc)
   */
  ErrWatermarkrInfo = 127,
  /*
   * TODO(doc)
   */
  ErrWatermarkArgb = 128,
  /*
   * TODO(doc)
   */
  ErrWatermarkRead = 129,
  /*
   * TODO(doc)
   */
  ErrEncryptedStreamNotAllowedPublish = 130,
  /*
   * TODO(doc)
   */
  ErrLicenseCredentialInvalid = 131,
  /*
   * TODO(doc)
   */
  ErrInvalidUserAccount = 134,
  /*
   * TODO(doc)
   */
  ErrCertRaw = 157,
  /*
   * TODO(doc)
   */
  ErrCertJsonPart = 158,
  /*
   * TODO(doc)
   */
  ErrCertJsonInval = 159,
  /*
   * TODO(doc)
   */
  ErrCertJsonNomem = 160,
  /*
   * TODO(doc)
   */
  ErrCertCustom = 161,
  /*
   * TODO(doc)
   */
  ErrCertCredential = 162,
  /*
   * TODO(doc)
   */
  ErrCertSign = 163,
  /*
   * TODO(doc)
   */
  ErrCertFail = 164,
  /*
   * TODO(doc)
   */
  ErrCertBuf = 165,
  /*
   * TODO(doc)
   */
  ErrCertNull = 166,
  /*
   * TODO(doc)
   */
  ErrCertDuedate = 167,
  /*
   * TODO(doc)
   */
  ErrCertRequest = 168,
  /*
   * TODO(doc)
   */
  ErrPcmsendFormat = 200,
  /*
   * TODO(doc)
   */
  ErrPcmsendBufferoverflow = 201,
  /*
   * TODO(doc)
   */
  ErrLogoutOther = 400,
  /*
   * TODO(doc)
   */
  ErrLogoutUser = 401,
  /*
   * TODO(doc)
   */
  ErrLogoutNet = 402,
  /*
   * TODO(doc)
   */
  ErrLogoutKicked = 403,
  /*
   * TODO(doc)
   */
  ErrLogoutPacket = 404,
  /*
   * TODO(doc)
   */
  ErrLogoutTokenExpired = 405,
  /*
   * TODO(doc)
   */
  ErrLogoutOldversion = 406,
  /*
   * TODO(doc)
   */
  ErrLogoutTokenWrong = 407,
  /*
   * TODO(doc)
   */
  ErrLogoutAlreadyLogout = 408,
  /*
   * TODO(doc)
   */
  ErrLoginOther = 420,
  /*
   * TODO(doc)
   */
  ErrLoginNet = 421,
  /*
   * TODO(doc)
   */
  ErrLoginFailed = 422,
  /*
   * TODO(doc)
   */
  ErrLoginCanceled = 423,
  /*
   * TODO(doc)
   */
  ErrLoginTokenExpired = 424,
  /*
   * TODO(doc)
   */
  ErrLoginOldVersion = 425,
  /*
   * TODO(doc)
   */
  ErrLoginTokenWrong = 426,
  /*
   * TODO(doc)
   */
  ErrLoginTokenKicked = 427,
  /*
   * TODO(doc)
   */
  ErrLoginAlreadyLogin = 428,
  /*
   * TODO(doc)
   */
  ErrJoinChannelOther = 440,
  /*
   * TODO(doc)
   */
  ErrSendMessageOther = 440,
  /*
   * TODO(doc)
   */
  ErrSendMessageTimeout = 441,
  /*
   * TODO(doc)
   */
  ErrQueryUsernumOther = 450,
  /*
   * TODO(doc)
   */
  ErrQueryUsernumTimeout = 451,
  /*
   * TODO(doc)
   */
  ErrQueryUsernumByuser = 452,
  /*
   * TODO(doc)
   */
  ErrLeaveChannelOther = 460,
  /*
   * TODO(doc)
   */
  ErrLeaveChannelKicked = 461,
  /*
   * TODO(doc)
   */
  ErrLeaveChannelByuser = 462,
  /*
   * TODO(doc)
   */
  ErrLeaveChannelLogout = 463,
  /*
   * TODO(doc)
   */
  ErrLeaveChannelDisconnected = 464,
  /*
   * TODO(doc)
   */
  ErrInviteOther = 470,
  /*
   * TODO(doc)
   */
  ErrInviteReinvite = 471,
  /*
   * TODO(doc)
   */
  ErrInviteNet = 472,
  /*
   * TODO(doc)
   */
  ErrInvitePeerOffline = 473,
  /*
   * TODO(doc)
   */
  ErrInviteTimeout = 474,
  /*
   * TODO(doc)
   */
  ErrInviteCantRecv = 475,
  /*
   * TODO(doc)
   */
  ErrLoadMediaEngine = 1001,
  /*
   * TODO(doc)
   */
  ErrStartCall = 1002,
  /*
   * TODO(doc)
   */
  ErrStartCamera = 1003,
  /*
   * TODO(doc)
   */
  ErrStartVideoRender = 1004,
  /*
   * TODO(doc)
   */
  ErrAdmGeneralError = 1005,
  /*
   * TODO(doc)
   */
  ErrAdmJavaResource = 1006,
  /*
   * TODO(doc)
   */
  ErrAdmSampleRate = 1007,
  /*
   * TODO(doc)
   */
  ErrAdmInitPlayout = 1008,
  /*
   * TODO(doc)
   */
  ErrAdmStartPlayout = 1009,
  /*
   * TODO(doc)
   */
  ErrAdmStopPlayout = 1010,
  /*
   * TODO(doc)
   */
  ErrAdmInitRecording = 1011,
  /*
   * TODO(doc)
   */
  ErrAdmStartRecording = 1012,
  /*
   * TODO(doc)
   */
  ErrAdmStopRecording = 1013,
  /*
   * TODO(doc)
   */
  ErrAdmRuntimePlayoutError = 1015,
  /*
   * TODO(doc)
   */
  ErrAdmRuntimeRecordingError = 1017,
  /*
   * TODO(doc)
   */
  ErrAdmRecordAudioFailed = 1018,
  /*
   * TODO(doc)
   */
  ErrAdmInitLoopback = 1022,
  /*
   * TODO(doc)
   */
  ErrAdmStartLoopback = 1023,
  /*
   * TODO(doc)
   */
  ErrAdmNoPermission = 1027,
  /*
   * TODO(doc)
   */
  ErrAdmRecordAudioIsActive = 1033,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidJniJavaResource = 1101,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidJniNoRecordFrequency = 1108,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidJniNoPlaybackFrequency = 1109,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidJniJavaStartRecord = 1111,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidJniJavaStartPlayback = 1112,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidJniJavaRecordError = 1115,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidOpenslCreateEngine = 1151,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidOpenslCreateAudioRecorder = 1153,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidOpenslStartRecorderThread = 1156,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidOpenslCreateAudioPlayer = 1157,
  /*
   * TODO(doc)
   */
  ErrAdmAndroidOpenslStartPlayerThread = 1160,
  /*
   * TODO(doc)
   */
  ErrAdmIosInputNotAvailable = 1201,
  /*
   * TODO(doc)
   */
  ErrAdmIosActivateSessionFail = 1206,
  /*
   * TODO(doc)
   */
  ErrAdmIosVpioInitFail = 1210,
  /*
   * TODO(doc)
   */
  ErrAdmIosVpioReinitFail = 1213,
  /*
   * TODO(doc)
   */
  ErrAdmIosVpioRestartFail = 1214,
  /*
   * TODO(doc)
   */
  ErrAdmIosSetRenderCallbackFail = 1219,
  /*
   * TODO(doc)
   */
  ErrAdmIosSessionSampleratrZero = 1221,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreInit = 1301,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreInitRecording = 1303,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreInitPlayout = 1306,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreInitPlayoutNull = 1307,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreStartRecording = 1309,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreCreateRecThread = 1311,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreCaptureNotStartup = 1314,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreCreateRenderThread = 1319,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreRenderNotStartup = 1320,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreNoRecordingDevice = 1322,
  /*
   * TODO(doc)
   */
  ErrAdmWinCoreNoPlayoutDevice = 1323,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveInit = 1351,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveInitRecording = 1353,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveInitMicrophone = 1354,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveInitPlayout = 1355,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveInitSpeaker = 1356,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveStartRecording = 1357,
  /*
   * TODO(doc)
   */
  ErrAdmWinWaveStartPlayout = 1358,
  /*
   * TODO(doc)
   */
  ErrAdmNoRecordingDevice = 1359,
  /*
   * TODO(doc)
   */
  ErrAdmNoPlayoutDevice = 1360,
  /*
   * TODO(doc)
   */
  ErrVdmCameraNotAuthorized = 1501,
  /*
   * TODO(doc)
   */
  ErrVdmWinDeviceInUse = 1502,
  /*
   * TODO(doc)
   */
  ErrVcmUnknownError = 1600,
  /*
   * TODO(doc)
   */
  ErrVcmEncoderInitError = 1601,
  /*
   * TODO(doc)
   */
  ErrVcmEncoderEncodeError = 1602,
  /*
   * TODO(doc)
   */
  ErrVcmEncoderSetError = 1603,
}

/*
 * SDK 对 Audio Session 的操作权限。
 */
export enum AudioSessionOperationRestriction {
  /*
   * 没有限制，SDK 可以对 Audio Session 进行更改。
   */
  AudioSessionOperationRestrictionNone = 0,
  /*
   * SDK 不能更改 Audio Session 的 category。
   */
  AudioSessionOperationRestrictionSetCategory = 1,
  /*
   * SDK 不能更改 Audio Session 的 category、mode 或 categoryOptions。
   */
  AudioSessionOperationRestrictionConfigureSession = 1 << 1,
  /*
   * 离开频道时，SDK 会保持 Audio Session 处于活动状态，例如在后台播放音频。
   */
  AudioSessionOperationRestrictionDeactivateSession = 1 << 2,
  /*
   * 完全限制 SDK 对 Audio Session 的操作权限，SDK 不能再对 Audio Session 进行任何更改。
   */
  AudioSessionOperationRestrictionAll = 1 << 7,
}

/*
 * 用户离线原因。
 */
export enum UserOfflineReasonType {
  /*
   * 0: 用户主动离开。
   */
  UserOfflineQuit = 0,
  /*
   * 1: 因过长时间收不到对方数据包，超时掉线。
   * 由于 SDK 使用的是不可靠通道，也有可能对方主动离开频道，但是本地没收到对方离开消息而误判为超时掉线。
   */
  UserOfflineDropped = 1,
  /*
   * 2: 用户身份从主播切换为观众。
   */
  UserOfflineBecomeAudience = 2,
}

/*
 * TODO(doc)
 */
export enum InterfaceIdType {
  /*
   * TODO(doc)
   */
  AgoraIidAudioDeviceManager = 1,
  /*
   * TODO(doc)
   */
  AgoraIidVideoDeviceManager = 2,
  /*
   * TODO(doc)
   */
  AgoraIidParameterEngine = 3,
  /*
   * TODO(doc)
   */
  AgoraIidMediaEngine = 4,
  /*
   * TODO(doc)
   */
  AgoraIidAudioEngine = 5,
  /*
   * TODO(doc)
   */
  AgoraIidVideoEngine = 6,
  /*
   * TODO(doc)
   */
  AgoraIidRtcConnection = 7,
  /*
   * TODO(doc)
   */
  AgoraIidSignalingEngine = 8,
  /*
   * TODO(doc)
   */
  AgoraIidMediaEngineRegulator = 9,
  /*
   * TODO(doc)
   */
  AgoraIidCloudSpatialAudio = 10,
  /*
   * TODO(doc)
   */
  AgoraIidLocalSpatialAudio = 11,
}

/*
 * 网络质量。
 */
export enum QualityType {
  /*
   * 0: 网络质量未知。
   */
  QualityUnknown = 0,
  /*
   * 1: 网络质量极好。
   */
  QualityExcellent = 1,
  /*
   * 2: 用户主观感觉和 excellent 差不多，但码率可能略低于 excellent。
   */
  QualityGood = 2,
  /*
   * 3: 用户主观感受有瑕疵但不影响沟通。
   */
  QualityPoor = 3,
  /*
   * 4: 勉强能沟通但不顺畅。
   */
  QualityBad = 4,
  /*
   * 5: 网络质量非常差，基本不能沟通。
   */
  QualityVbad = 5,
  /*
   * 6: 完全无法沟通。
   */
  QualityDown = 6,
  /*
   * 7: 暂时无法检测网络质量（未使用）。
   */
  QualityUnsupported = 7,
  /*
   * 8: 网络质量检测已开始还没完成。
   */
  QualityDetecting = 8,
}

/*
 * TODO(doc)
 */
export enum FitModeType {
  /*
   * TODO(doc)
   */
  ModeCover = 1,
  /*
   * TODO(doc)
   */
  ModeContain = 2,
}

/*
 * 视频顺时针旋转信息。
 */
export enum VideoOrientation {
  /*
   * 0:（默认）顺时针旋转 0 度。
   */
  VideoOrientation0 = 0,
  /*
   * 90: 顺时针旋转 90 度。
   */
  VideoOrientation90 = 90,
  /*
   * 180: 顺时针旋转 180 度。
   */
  VideoOrientation180 = 180,
  /*
   * 270: 顺时针旋转 270 度。
   */
  VideoOrientation270 = 270,
}

/*
 * 视频帧率。
 */
export enum FrameRate {
  /*
   * 1: 1 fps
   */
  FrameRateFps1 = 1,
  /*
   * 7: 7 fps
   */
  FrameRateFps7 = 7,
  /*
   * 10: 10 fps
   */
  FrameRateFps10 = 10,
  /*
   * 15: 15 fps
   */
  FrameRateFps15 = 15,
  /*
   * 24: 24 fps
   */
  FrameRateFps24 = 24,
  /*
   * 30: 30 fps
   */
  FrameRateFps30 = 30,
  /*
   * TODO(doc)
   */
  FrameRateFps60 = 60,
}

/*
 * TODO(doc)
 */
export enum FrameWidth {
  /*
   * TODO(doc)
   */
  FrameWidth640 = 640,
}

/*
 * TODO(doc)
 */
export enum FrameHeight {
  /*
   * TODO(doc)
   */
  FrameHeight360 = 360,
}

/*
 * 视频帧类型。
 */
export enum VideoFrameType {
  /*
   * 0: 黑帧。
   */
  VideoFrameTypeBlankFrame = 0,
  /*
   * 3: 关键帧。
   */
  VideoFrameTypeKeyFrame = 3,
  /*
   * 4: Delta 帧。
   */
  VideoFrameTypeDeltaFrame = 4,
  /*
   * 5: B 帧。
   */
  VideoFrameTypeBFrame = 5,
  /*
   * 6: 丢弃帧。
   */
  VideoFrameTypeDroppableFrame = 6,
  /*
   * 未知帧。
   */
  VideoFrameTypeUnknow = 7,
}

/*
 * 视频编码的方向模式。
 */
export enum OrientationMode {
  /*
   * 0: （默认）该模式下 SDK 输出的视频方向与采集到的视频方向一致。接收端会根据收到的视频旋转信息对视频进行旋转。该模式适用于接收端可以调整视频方向的场景。 如果采集的视频是横屏模式，则输出的视频也是横屏模式。
   * 如果采集的视频是竖屏模式，则输出的视频也是竖屏模式。
   */
  OrientationModeAdaptive = 0,
  /*
   * TODO(doc)
   */
  OrientationModeFixedLandscape = 1,
  /*
   * TODO(doc)
   */
  OrientationModeFixedPortrait = 2,
}

/*
 * 带宽受限时的视频编码降级偏好。
 */
export enum DegradationPreference {
  /*
   * 0：（默认）带宽受限时，视频编码时优先降低视频帧率，维持视频质量不变。该降级偏好适用于画质优先的场景。
   * 通信（COMMUNICATION）场景下，本地发送的视频分辨率可能改变，远端用户需能处理这种情况， 详见 onVideoSizeChanged 。
   */
  MaintainQuality = 0,
  /*
   * 1：带宽受限时，视频编码时优先降低视频质量，维持视频帧率不变。该降级偏好适用于流畅性优先且允许画质降低的场景。
   */
  MaintainFramerate = 1,
  /*
   *
   */
  MaintainBalanced = 2,
  /*
   * TODO(doc)
   */
  MaintainResolution = 3,
  /*
   * TODO(doc)
   */
  DISABLED = 100,
}

/*
 * 视频尺寸。
 */
export class VideoDimensions {
  /*
   * 视频宽度，单位为像素。
   */
  width?: number;
  /*
   * 视频高度，单位为像素。
   */
  height?: number;
}

/*
 * 视频编码格式。
 */
export enum VideoCodecType {
  /*
   * TODO(doc)
   */
  VideoCodecNone = 0,
  /*
   * 1：标准 VP8。
   */
  VideoCodecVp8 = 1,
  /*
   * 2：标准 H.264。
   */
  VideoCodecH264 = 2,
  /*
   * TODO(doc)
   */
  VideoCodecH265 = 3,
  /*
   * TODO(doc)
   */
  VideoCodecVp9 = 5,
  /*
   * TODO(doc)
   */
  VideoCodecGeneric = 6,
  /*
   * TODO(doc)
   */
  VideoCodecGenericH264 = 7,
  /*
   * TODO(doc)
   */
  VideoCodecAv1 = 12,
  /*
   * TODO(doc)
   */
  VideoCodecGenericJpeg = 20,
}

/*
 * TODO(doc)
 */
export enum TCcMode {
  /*
   * TODO(doc)
   */
  CcEnabled = 0,
  /*
   * TODO(doc)
   */
  CcDisabled = 1,
}

/*
 * TODO(doc)
 */
export class SenderOptions {
  /*
   * TODO(doc)
   */
  ccMode?: TCcMode;
  /*
   * TODO(doc)
   */
  codecType?: VideoCodecType;
  /*
   * TODO(doc)
   */
  targetBitrate?: number;
}

/*
 * 音频编解码格式。
 */
export enum AudioCodecType {
  /*
   * 1: OPUS。
   */
  AudioCodecOpus = 1,
  /*
   * 3: PCMA。
   */
  AudioCodecPcma = 3,
  /*
   * 4: PCMU。
   */
  AudioCodecPcmu = 4,
  /*
   * 5: G722。
   */
  AudioCodecG722 = 5,
  /*
   * 8: LC-AAC。
   */
  AudioCodecAaclc = 8,
  /*
   * 9: HE-AAC。
   */
  AudioCodecHeaac = 9,
  /*
   * 10: JC1。
   */
  AudioCodecJc1 = 10,
  /*
   * 11: HE-AAC v2。
   */
  AudioCodecHeaac2 = 11,
  /*
   * TODO(doc)
   */
  AudioCodecLpcnet = 12,
}

/*
 * 音频编码类型。
 */
export enum AudioEncodingType {
  /*
   * AAC 编码格式，16000 Hz 采样率，低音质。音频时长为 10 分钟的文件编码后大小约为 1.2 MB。
   */
  AudioEncodingTypeAac16000Low = 0x010101,
  /*
   * AAC 编码格式，16000 Hz 采样率，中音质。音频时长为 10 分钟的文件编码后大小约为 2 MB。
   */
  AudioEncodingTypeAac16000Medium = 0x010102,
  /*
   * AAC 编码格式，32000 Hz 采样率，低音质。音频时长为 10 分钟的文件编码后大小约为 1.2 MB。
   */
  AudioEncodingTypeAac32000Low = 0x010201,
  /*
   * AAC 编码格式，32000 Hz 采样率，中音质。音频时长为 10 分钟的文件编码后大小约为 2 MB。
   */
  AudioEncodingTypeAac32000Medium = 0x010202,
  /*
   * AAC 编码格式，32000 Hz 采样率，高音质。音频时长为 10 分钟的文件编码后大小约为 3.5 MB。
   */
  AudioEncodingTypeAac32000High = 0x010203,
  /*
   * AAC 编码格式，48000 Hz 采样率，中音质。音频时长为 10 分钟的文件编码后大小约为 2 MB。
   */
  AudioEncodingTypeAac48000Medium = 0x010302,
  /*
   * AAC 编码格式，48000 Hz 采样率，高音质。音频时长为 10 分钟的文件编码后大小约为 3.5 MB。
   */
  AudioEncodingTypeAac48000High = 0x010303,
  /*
   * OPUS 编码格式，16000 Hz 采样率，低音质。音频时长为 10 分钟的文件编码后大小约为 2 MB。
   */
  AudioEncodingTypeOpus16000Low = 0x020101,
  /*
   * OPUS 编码格式，16000 Hz 采样率，中音质。音频时长为 10 分钟的文件编码后大小约为 2 MB。
   */
  AudioEncodingTypeOpus16000Medium = 0x020102,
  /*
   * OPUS 编码格式，48000 Hz 采样率，中音质。音频时长为 10 分钟的文件编码后大小约为 2 MB。
   */
  AudioEncodingTypeOpus48000Medium = 0x020302,
  /*
   * OPUS 编码格式，48000 Hz 采样率，高音质。音频时长为 10 分钟的文件编码后大小约为 3.5 MB。
   */
  AudioEncodingTypeOpus48000High = 0x020303,
}

/*
 * 水印的适配模式。
 */
export enum WatermarkFitMode {
  /*
   * TODO(doc)
   */
  FitModeCoverPosition = 0,
  /*
   * TODO(doc)
   */
  FitModeUseImageRatio = 1,
}

/*
 * TODO(doc)
 */
export class EncodedAudioFrameAdvancedSettings {
  /*
   * TODO(doc)
   */
  speech?: boolean;
  /*
   * TODO(doc)
   */
  sendEvenIfEmpty?: boolean;
}

/*
 * 编码后音频的信息。
 */
export class EncodedAudioFrameInfo {
  /*
   * 音频编码规格: AudioCodecType 。
   */
  codec?: AudioCodecType;
  /*
   * 音频采样率 (Hz)。
   */
  sampleRateHz?: number;
  /*
   * 每个声道的音频采样数。
   */
  samplesPerChannel?: number;
  /*
   * 声道数。
   */
  numberOfChannels?: number;
  /*
   * 该功能暂不支持。
   */
  advancedSettings?: EncodedAudioFrameAdvancedSettings;
}

/*
 * TODO(doc)
 */
export class AudioPcmDataInfo {
  /*
   * TODO(doc)
   */
  samplesPerChannel?: number;
  /*
   * TODO(doc)
   */
  channelNum?: number;
  /*
   * TODO(doc)
   */
  samplesOut?: number;
  /*
   * TODO(doc)
   */
  elapsedTimeMs?: number;
  /*
   * TODO(doc)
   */
  ntpTimeMs?: number;
}

/*
 * TODO(doc)
 */
export enum H264PacketizeMode {
  /*
   * TODO(doc)
   */
  NonInterleaved = 0,
  /*
   * TODO(doc)
   */
  SingleNalUnit = 1,
}

/*
 * TODO(doc)
 */
export enum VideoStreamType {
  /*
   * TODO(doc)
   */
  VideoStreamHigh = 0,
  /*
   * TODO(doc)
   */
  VideoStreamLow = 1,
}

/*
 * 外部编码视频帧的信息。
 */
export class EncodedVideoFrameInfo {
  /*
   * 视频编码类型，详见 VideoCodecType 。默认值为 VideoCodecH264(2)。
   */
  codecType?: VideoCodecType;
  /*
   * 视频帧的宽度 (px)。
   */
  width?: number;
  /*
   * 视频帧的高度 (px)。
   */
  height?: number;
  /*
   * 每秒的视频帧数。
   * 当该参数不为 0 时，你可以用它计算外部编码视频帧的 Unix 时间戳。
   */
  framesPerSecond?: number;
  /*
   * 视频帧的类型，详见 VideoFrameType 。
   */
  frameType?: VideoFrameType;
  /*
   * 视频帧的旋转信息，详见 VideoOrientation 。
   */
  rotation?: VideoOrientation;
  /*
   * 预留参数。
   */
  trackId?: number;
  /*
   * 视频帧被渲染时的 Unix 时间戳（毫秒）。该时间戳可用于指导渲染视频帧。该参数为必填。
   */
  renderTimeMs?: number;
  /*
   * TODO(doc)
   */
  internalSendTs?: number;
  /*
   * 推送外部编码视频帧的用户 ID。
   */
  uid?: number;
  /*
   * 视频流类型。
   */
  streamType?: VideoStreamType;
}

/*
 * 镜像模式类型。
 */
export enum VideoMirrorModeType {
  /*
   * 0:（默认）由 SDK 决定镜像模式。
   */
  VideoMirrorModeAuto = 0,
  /*
   * 1: 启用镜像模式。
   */
  VideoMirrorModeEnabled = 1,
  /*
   * 2: 关闭镜像模式。
   */
  VideoMirrorModeDisabled = 2,
}

/*
 * 视频编码器的配置。
 */
export class VideoEncoderConfiguration {
  /*
   * 视频编码类型，详见 VideoCodecType 。
   */
  codecType?: VideoCodecType;
  /*
   * 视频编码的分辨率（px），详见 VideoDimensions 。该参数用于衡量编码质量，以长 × 宽表示，默认值为 640 × 360。用户可以自行设置分辨率。
   */
  dimensions?: VideoDimensions;
  /*
   * 视频编码的帧率(fps)，默认值为 15。详见 FrameRate 。
   */
  frameRate?: number;
  /*
   * 视频编码码率，单位为 Kbps。
   */
  bitrate?: number;
  /*
   * 最低编码码率，单位为 Kbps。
   * SDK 会根据网络状况自动调整视频编码码率。将参数设为高于默认值可强制视频编码器输出高质量图片，但在网络状况不佳情况下可能导致网络丢包并影响视频播放的流畅度造成卡顿。因此如非对画质有特殊需求，声网建议不要修改该参数的值。
   * 该参数仅适用于直播场景。
   */
  minBitrate?: number;
  /*
   * 视频编码的方向模式，详见 OrientationMode 。
   */
  orientationMode?: OrientationMode;
  /*
   * 带宽受限时，视频编码降级偏好。详见 DegradationPreference 。
   */
  degradationPreference?: DegradationPreference;
  /*
   * 发送编码视频时是否开启镜像模式，只影响远端用户看到的视频画面。详见 VideoMirrorModeType 。
   * 默认关闭镜像模式。
   */
  mirrorMode?: VideoMirrorModeType;
}

/*
 * 数据流设置。
 * 下表展示不同的参数设置下，SDK 的行为：
 */
export class DataStreamConfig {
  /*
   * 是否与本地发送的音频流同步。 true: 数据流与音频流同步。
   * false: 数据流与音频流不同步。
   * 设置为与音频同步后，如果数据包的延迟在音频延迟的范围内，SDK 会在播放音频的同时触发与该音频包同步的 onStreamMessage 回调。 当需要数据包立刻到达接收端时，不能将该参数设置为 true。Agora 建议你仅在需要实现特殊场景，例如歌词同步时，设置为与音频同步。
   */
  syncWithAudio?: boolean;
  /*
   * 是否保证接收到的数据按发送的顺序排列。 true: 保证 SDK 按照发送方发送的顺序输出数据包。
   * false: 不保证 SDK 按照发送方发送的顺序输出数据包。
   * 当需要数据包立刻到达接收端时，不能将该参数设置为 true。
   */
  ordered?: boolean;
}

/*
 * 视频小流的配置。
 */
export class SimulcastStreamConfig {
  /*
   * 视频尺寸。详见 VideoDimensions 。默认值为 160 × 120。
   */
  dimensions?: VideoDimensions;
  /*
   * 视频码率 (Kbps)。默认值为 65。
   */
  bitrate?: number;
  /*
   * 视频帧率 (fps)。默认值为 5。
   */
  framerate?: number;
}

/*
 * 目标区域相对于整个屏幕或窗口的位置，如不填，则表示整个屏幕或窗口。
 */
export class Rectangle {
  /*
   * 左上角的横向偏移。
   */
  x?: number;
  /*
   * 左上角的纵向偏移。
   */
  y?: number;
  /*
   * 目标区域的宽度。
   */
  width?: number;
  /*
   * 目标区域的高度。
   */
  height?: number;
}

/*
 * 水印在屏幕中的位置和大小。
 * 水印在屏幕中的位置和大小由 xRatio、yRatio 和 widthRatio 共同决定： (xRatio, yRatio) 指水印左上角的坐标，决定水印左上角到屏幕左上角的距离。
 * widthRatio 决定水印的宽度。
 */
export class WatermarkRatio {
  /*
   * 水印左上角的 x 坐标。以屏幕左上角为原点，x 坐标为水印左上角相对于原点的横向位移。取值范围为 [0.0,1.0]，默认值为 0。
   */
  xRatio?: number;
  /*
   * 水印左上角的 y 坐标。以屏幕左上角为原点，y 坐标为水印左上角相对于原点的纵向位移。取值范围为 [0.0,1.0]，默认值为 0。
   */
  yRatio?: number;
  /*
   * 水印的宽度。SDK 会根据该参数值计算出等比例的水印高度，确保放大或缩小后的水印图片不失真。取值范围为 [0.0,1.0]，默认值为 0，代表不显示水印。
   */
  widthRatio?: number;
}

/*
 * 水印图片的设置。
 */
export class WatermarkOptions {
  /*
   * 预留参数。
   */
  visibleInPreview?: boolean;
  /*
   * 水印的适配模式为 FIT_MODE_COVER_POSITION 时，用于设置横屏模式下水印图片的区域。详见 Rectangle 。
   */
  positionInLandscapeMode?: Rectangle;
  /*
   * 水印的适配模式为 FIT_MODE_COVER_POSITION 时，用于设置竖屏模式下水印图片的区域。详见 Rectangle 。
   */
  positionInPortraitMode?: Rectangle;
  /*
   * 水印的适配模式为 FIT_MODE_USE_IMAGE_RATIO 时，该参数可设置缩放模式下的水印坐标。详见 WatermarkRatio 。
   */
  watermarkRatio?: WatermarkRatio;
  /*
   * 水印的适配模式。详见 WATERMARK_FIT_MODE 。
   */
  mode?: WatermarkFitMode;
}

/*
 * 通话相关的统计信息。
 */
export class RtcStats {
  /*
   * 本地用户通话时长（秒），累计值。
   */
  duration?: number;
  /*
   * 发送字节数（bytes）。
   */
  txBytes?: number;
  /*
   * 接收字节数（bytes）。
   */
  rxBytes?: number;
  /*
   * 发送音频字节数（bytes），累计值。
   */
  txAudioBytes?: number;
  /*
   * 发送视频字节数（bytes），累计值。
   */
  txVideoBytes?: number;
  /*
   * 接收音频字节数（bytes），累计值。
   */
  rxAudioBytes?: number;
  /*
   * 接收视频字节数（bytes），累计值。
   */
  rxVideoBytes?: number;
  /*
   * 发送码率（Kbps）。
   */
  txKBitRate?: number;
  /*
   * 接收码率（Kbps）。
   */
  rxKBitRate?: number;
  /*
   * 音频接收码率 (Kbps）。
   */
  rxAudioKBitRate?: number;
  /*
   * 音频包的发送码率 (Kbps）。
   */
  txAudioKBitRate?: number;
  /*
   * 视频接收码率 (Kbps）。
   */
  rxVideoKBitRate?: number;
  /*
   * 视频发送码率 (Kbps）。
   */
  txVideoKBitRate?: number;
  /*
   * 客户端-接入服务器延时 (毫秒)。
   */
  lastmileDelay?: number;
  /*
   * 当前频道内的用户人数。
   */
  userCount?: number;
  /*
   * 当前 App 的 CPU 使用率 (%)。
   * onLeaveChannel 回调中报告的 cpuAppUsage 恒为 0。
   */
  cpuAppUsage?: number;
  /*
   * 当前系统的 CPU 使用率 (%)。 onLeaveChannel 回调中报告的 cpuTotalUsage 恒为 0。
   * 自 Android 8.1 起，因系统限制，你无法通过该属性获取 CPU 使用率。
   */
  cpuTotalUsage?: number;
  /*
   * 客户端到本地路由器的往返时延 (ms)。 该属性默认在 iOS 14 之前的设备上开启，在 iOS 14 及之后的设备上关闭。
   * 如需在 iOS 14 及之后的设备上启用该属性，请。 在 Android 平台上，如需获取 gatewayRtt，请确保已在项目 AndroidManifest.xml 文件的 </application> 后面添加 android.permission.ACCESS_WIFI_STATE 权限。
   */
  gatewayRtt?: number;
  /*
   * 当前 App 的内存占比 (%)。
   * 该值仅作参考。受系统限制可能无法获取。
   */
  memoryAppUsageRatio?: number;
  /*
   * 当前系统的内存占比 (%)。
   * 该值仅作参考。受系统限制可能无法获取。
   */
  memoryTotalUsageRatio?: number;
  /*
   * 当前 App 的内存大小 (KB)。
   * 该值仅作参考。受系统限制可能无法获取。
   */
  memoryAppUsageInKbytes?: number;
  /*
   * 从开始建立连接到成功连接的时间（毫秒）。如报告 0，则表示无效。
   */
  connectTimeMs?: number;
  /*
   * TODO(doc)
   */
  firstAudioPacketDuration?: number;
  /*
   * TODO(doc)
   */
  firstVideoPacketDuration?: number;
  /*
   * TODO(doc)
   */
  firstVideoKeyFramePacketDuration?: number;
  /*
   * TODO(doc)
   */
  packetsBeforeFirstKeyFramePacket?: number;
  /*
   * TODO(doc)
   */
  firstAudioPacketDurationAfterUnmute?: number;
  /*
   * TODO(doc)
   */
  firstVideoPacketDurationAfterUnmute?: number;
  /*
   * TODO(doc)
   */
  firstVideoKeyFramePacketDurationAfterUnmute?: number;
  /*
   * TODO(doc)
   */
  firstVideoKeyFrameDecodedDurationAfterUnmute?: number;
  /*
   * TODO(doc)
   */
  firstVideoKeyFrameRenderedDurationAfterUnmute?: number;
  /*
   * 使用抗丢包技术前，客户端上行发送到服务器丢包率 (%)。
   */
  txPacketLossRate?: number;
  /*
   * 使用抗丢包技术前，服务器下行发送到客户端丢包率 (%)。
   */
  rxPacketLossRate?: number;
}

/*
 * 视频源的类型。
 */
export enum VideoSourceType {
  /*
   * TODO(doc)
   */
  VideoSourceCameraPrimary = 0,
  /*
   * 摄像头。
   */
  VideoSourceCamera = 0,
  /*
   * 第二个摄像头。
   */
  VideoSourceCameraSecondary = 1,
  /*
   * 第一个屏幕。
   */
  VideoSourceScreenPrimary = 2,
  /*
   * 屏幕。
   */
  VideoSourceScreen = 2,
  /*
   * 第二个屏幕。
   */
  VideoSourceScreenSecondary = 3,
  /*
   * 自定义的视频源。
   */
  VideoSourceCustom = 4,
  /*
   * 媒体播放器共享的视频源。
   */
  VideoSourceMediaPlayer = 5,
  /*
   * 视频源为 PNG 图片。
   */
  VideoSourceRtcImagePng = 6,
  /*
   * 视频源为 JPEG 图片。
   */
  VideoSourceRtcImageJpeg = 7,
  /*
   * 视频源为 GIF 图片。
   */
  VideoSourceRtcImageGif = 8,
  /*
   * 视频源为网络获取的远端视频。
   */
  VideoSourceRemote = 9,
  /*
   * 转码后的视频源。
   */
  VideoSourceTranscoded = 10,
  /*
   * 未知的视频源。
   */
  VideoSourceUnknown = 100,
}

/*
 * 直播场景里的用户角色。
 */
export enum ClientRoleType {
  /*
   * 1: 主播。主播可以发流也可以收流。
   */
  ClientRoleBroadcaster = 1,
  /*
   * 2:（默认）观众。观众只能收流不能发流。
   */
  ClientRoleAudience = 2,
}

/*
 * 自上次统计后本地视频质量的自适应情况（基于目标帧率和目标码率）。
 */
export enum QualityAdaptIndication {
  /*
   * 0：本地视频质量不变。
   */
  AdaptNone = 0,
  /*
   * 1：因网络带宽增加，本地视频质量改善。
   */
  AdaptUpBandwidth = 1,
  /*
   * 2：因网络带宽减少，本地视频质量变差。
   */
  AdaptDownBandwidth = 2,
}

/*
 * 直播频道中观众的延时级别。该枚举仅在用户角色设为 ClientRoleAudience 时才生效。
 */
export enum AudienceLatencyLevelType {
  /*
   * 1: 低延时。
   */
  AudienceLatencyLevelLowLatency = 1,
  /*
   * 2:（默认）超低延时。
   */
  AudienceLatencyLevelUltraLowLatency = 2,
  /*
   * TODO(doc)
   */
  AudienceLatencyLevelHighLatency = 3,
}

/*
 *  用户角色具体设置。
 */
export class ClientRoleOptions {
  /*
   *  观众端延时级别。 详见 AudienceLatencyLevelType 。
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
}

/*
 * 接收远端音频时，本地用户的主观体验质量。
 */
export enum ExperienceQualityType {
  /*
   * 0: 主观体验质量较好。
   */
  ExperienceQualityGood = 0,
  /*
   * 1: 主观体验质量较差。
   */
  ExperienceQualityBad = 1,
}

/*
 * 远端用户的音频统计数据。
 */
export class RemoteAudioStats {
  /*
   * 远端用户的用户 ID。
   */
  uid?: number;
  /*
   * 远端用户发送的音频流质量。详见 QualityType 。
   */
  quality?: number;
  /*
   * 音频发送端到接收端的网络延迟（毫秒）。
   */
  networkTransportDelay?: number;
  /*
   * 音频接收端到网络抖动缓冲的网络延迟（毫秒）。 当接收端为观众且 ClientRoleOptions 的 audienceLatencyLevel 为 1 时，该参数不生效。
   */
  jitterBufferDelay?: number;
  /*
   * 统计周期内的远端音频流的丢帧率 (%)。
   */
  audioLossRate?: number;
  /*
   * 声道数。
   */
  numChannels?: number;
  /*
   * 统计周期内接收到的远端音频流的采样率。
   */
  receivedSampleRate?: number;
  /*
   * 接收到的远端音频流在统计周期内的平均码率（Kbps）。
   */
  receivedBitrate?: number;
  /*
   * 远端用户在加入频道后发生音频卡顿的累计时长（毫秒）。通话过程中，音频丢帧率达到 4% 即记为一次音频卡顿。
   */
  totalFrozenTime?: number;
  /*
   * 音频卡顿的累计时长占音频总有效时长的百分比 (%)。音频有效时长是指远端用户加入频道后音频未被停止发送或禁用的时长。
   */
  frozenRate?: number;
  /*
   * 统计周期内，Agora 实时音频 MOS（平均主观意见分）评估方法对接收到的远端音频流的质量评分。返回值范围为 [0,500]。返回值除以 100 即可得到 MOS 分数，范围为 [0,5] 分，分数越高，音频质量越好。
   * Agora 实时音频 MOS 评分对应的主观音质感受如下： MOS 分数
   * 音质感受 大于 4 分
   * 音频质量佳，清晰流畅。 3.5 - 4 分
   * 音频质量较好，偶有音质损伤，但依然清晰。 3 - 3.5 分
   * 音频质量一般，偶有卡顿，不是非常流畅，需要一点注意力才能听清。 2.5 - 3 分
   * 音频质量较差，卡顿频繁，需要集中精力才能听清。 2 - 2.5 分
   * 音频质量很差，偶有杂音，部分语义丢失，难以交流。 小于 2 分
   * 音频质量非常差，杂音频现，大量语义丢失，完全无法交流。
   */
  mosValue?: number;
  /*
   * 远端用户在音频通话开始到本次回调之间的有效时长（毫秒）。
   * 有效时长是指去除了远端用户进入静音状态的总时长。
   */
  totalActiveTime?: number;
  /*
   * 远端音频流的累计发布时长（毫秒）。
   */
  publishDuration?: number;
  /*
   * 接收远端音频时，本地用户的主观体验质量。详见 ExperienceQualityType 。
   */
  qoeQuality?: number;
}

/*
 * 音频编码属性。
 */
export enum AudioProfileType {
  /*
   * 0: 默认值。
   * 直播场景下：48 kHz 采样率，音乐编码，单声道，编码码率最大值为 64 Kbps。
   * 通信场景下：32 kHz 采样率，语音编码，单声道，编码码率最大值为 18 Kbps。
   */
  AudioProfileDefault = 0,
  /*
   * 1: 指定 32 kHz 采样率，语音编码，单声道，编码码率最大值为 18 Kbps。
   */
  AudioProfileSpeechStandard = 1,
  /*
   * 2: 指定 48 kHz 采样率，音乐编码，单声道，编码码率最大值为 64 Kbps。
   */
  AudioProfileMusicStandard = 2,
  /*
   * 3: 指定 48 kHz 采样率，音乐编码，双声道，编码码率最大值为 80 Kbps。
   * 如需实现立体声，你还需要调用 setAdvancedAudioOptions 并在 AdvancedAudioOptions 中设置 audioProcessingChannels 为 AudioProcessingStereo。
   */
  AudioProfileMusicStandardStereo = 3,
  /*
   * 4: 指定 48 kHz 采样率，音乐编码，单声道，编码码率最大值为 96 Kbps。
   */
  AudioProfileMusicHighQuality = 4,
  /*
   * 5: 指定 48 kHz 采样率，音乐编码，双声道，编码码率最大值为 128 Kbps。
   * 如需实现立体声，你还需要调用 setAdvancedAudioOptions 并在 AdvancedAudioOptions 中设置 audioProcessingChannels 为 AudioProcessingStereo。
   */
  AudioProfileMusicHighQualityStereo = 5,
  /*
   *
   */
  AudioProfileIot = 6,
  /*
   * TODO(doc)
   */
  AudioProfileNum = 7,
}

/*
 * 音频场景。
 */
export enum AudioScenarioType {
  /*
   * 0: （默认）自动场景，根据用户角色和音频路由自动匹配合适的音质。
   */
  AudioScenarioDefault = 0,
  /*
   * 3: 高音质场景，适用于音乐为主的场景。
   */
  AudioScenarioGameStreaming = 3,
  /*
   * 5: 聊天室场景，适用于用户需要频繁上下麦的场景。该场景下，观众会收到申请麦克风权限的弹窗提示。
   */
  AudioScenarioChatroom = 5,
  /*
   * 6: 高音质场景，适用于音乐为主的场景。
   */
  AudioScenarioHighDefinition = 6,
  /*
   * 7: 合唱场景。适用于网络条件良好，要求极低延时的实时合唱场景。
   */
  AudioScenarioChorus = 7,
  /*
   * 枚举的数量。
   */
  AudioScenarioNum = 8,
}

/*
 * 视频帧格式。
 */
export class VideoFormat {
  /*
   * 视频帧的宽度（px）。
   */
  width?: number;
  /*
   * 视频帧的高度（px）。
   */
  height?: number;
  /*
   * 视频帧的帧率。
   */
  fps?: number;
}

/*
 * 屏幕共享的内容类型。
 */
export enum VideoContentHint {
  /*
   * （默认）无指定的内容类型。
   */
  ContentHintNone = 0,
  /*
   * 内容类型为动画。当共享的内容是视频、电影或视频游戏时，推荐选择该内容类型。
   */
  ContentHintMotion = 1,
  /*
   * 内容类型为细节。当共享的内容是图片或文字时，推荐选择该内容类型。
   */
  ContentHintDetails = 2,
}

/*
 * 本地音频状态。
 */
export enum LocalAudioStreamState {
  /*
   * 0: 本地音频默认初始状态。
   */
  LocalAudioStreamStateStopped = 0,
  /*
   * 1: 本地音频采集设备启动成功。
   */
  LocalAudioStreamStateRecording = 1,
  /*
   * 2: 本地音频首帧编码成功。
   */
  LocalAudioStreamStateEncoding = 2,
  /*
   * 3: 本地音频启动失败。
   */
  LocalAudioStreamStateFailed = 3,
}

/*
 *  本地音频出错原因。
 */
export enum LocalAudioStreamError {
  /*
   * TODO(doc)
   */
  LocalAudioStreamErrorOk = 0,
  /*
   * TODO(doc)
   */
  LocalAudioStreamErrorFailure = 1,
  /*
   * TODO(doc)
   */
  LocalAudioStreamErrorDeviceNoPermission = 2,
  /*
   * TODO(doc)
   */
  LocalAudioStreamErrorDeviceBusy = 3,
  /*
   * TODO(doc)
   */
  LocalAudioStreamErrorRecordFailure = 4,
  /*
   * TODO(doc)
   */
  LocalAudioStreamErrorEncodeFailure = 5,
}

/*
 * 本地视频状态。
 */
export enum LocalVideoStreamState {
  /*
   * 0: 本地视频默认初始状态。
   */
  LocalVideoStreamStateStopped = 0,
  /*
   * 1: 本地视频采集设备启动成功。
   */
  LocalVideoStreamStateCapturing = 1,
  /*
   * 2: 本地视频首帧编码成功。
   */
  LocalVideoStreamStateEncoding = 2,
  /*
   * 3: 本地视频启动失败。
   */
  LocalVideoStreamStateFailed = 3,
}

/*
 * 本地视频出错原因。
 */
export enum LocalVideoStreamError {
  /*
   * 0: 本地视频状态正常。
   */
  LocalVideoStreamErrorOk = 0,
  /*
   * 1: 出错原因不明确。
   */
  LocalVideoStreamErrorFailure = 1,
  /*
   * 2: 没有权限启动本地视频采集设备。
   */
  LocalVideoStreamErrorDeviceNoPermission = 2,
  /*
   * 3: 本地视频采集设备正在使用中。
   */
  LocalVideoStreamErrorDeviceBusy = 3,
  /*
   * 4: 本地视频采集失败，建议检查采集设备是否正常工作。
   */
  LocalVideoStreamErrorCaptureFailure = 4,
  /*
   * 5: 本地视频编码失败。
   */
  LocalVideoStreamErrorEncodeFailure = 5,
  /*
   * 6: 应用处于后台。
   */
  LocalVideoStreamErrorCaptureInbackground = 6,
  /*
   * 7: 应用窗口处于侧拉、分屏、画中画模式。
   */
  LocalVideoStreamErrorCaptureMultipleForegroundApps = 7,
  /*
   * 8: 找不到本地视频采集设备。
   */
  LocalVideoStreamErrorDeviceNotFound = 8,
  /*
   * TODO(doc)
   */
  LocalVideoStreamErrorDeviceDisconnected = 9,
  /*
   * TODO(doc)
   */
  LocalVideoStreamErrorDeviceInvalidId = 10,
  /*
   * 8: 系统压力。
   */
  LocalVideoStreamErrorDeviceSystemPressure = 101,
  /*
   * TODO(doc)
   */
  LocalVideoStreamErrorScreenCaptureWindowMinimized = 11,
  /*
   * TODO(doc)
   */
  LocalVideoStreamErrorScreenCaptureWindowClosed = 12,
  /*
   * TODO(doc)
   */
  LocalVideoStreamErrorScreenCaptureWindowOccluded = 13,
  /*
   * TODO(doc)
   */
  LocalVideoStreamErrorScreenCaptureWindowNotSupported = 20,
}

/*
 * 远端音频流状态。
 */
export enum RemoteAudioState {
  /*
   * 0: 远端音频默认初始状态。在 RemoteAudioStateReasonLocalMuted、RemoteAudioStateReasonRemoteMuted 或 RemoteAudioStateReasonRemoteOffline的情况下，会报告该状态。
   */
  RemoteAudioStateStopped = 0,
  /*
   * 1: 本地用户已接收远端音频首包。
   */
  RemoteAudioStateStarting = 1,
  /*
   * 2: 远端音频流正在解码，正常播放。在 RemoteAudioStateReasonNetworkRecovery、RemoteAudioStateReasonLocalUnmuted 或 RemoteAudioStateReasonRemoteUnmuted 的情况下， 会报告该状态。
   */
  RemoteAudioStateDecoding = 2,
  /*
   * 3: 远端音频流卡顿。在 RemoteAudioStateReasonNetworkCongestion 的情况下，会报告该状态。
   */
  RemoteAudioStateFrozen = 3,
  /*
   * 4: 远端音频流播放失败。在 RemoteAudioStateReasonInternal 的情况下，会报告该状态。
   */
  RemoteAudioStateFailed = 4,
}

/*
 * 远端音频流状态切换原因。
 */
export enum RemoteAudioStateReason {
  /*
   * TODO(doc)
   */
  RemoteAudioReasonInternal = 0,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonNetworkCongestion = 1,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonNetworkRecovery = 2,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonLocalMuted = 3,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonLocalUnmuted = 4,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonRemoteMuted = 5,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonRemoteUnmuted = 6,
  /*
   * TODO(doc)
   */
  RemoteAudioReasonRemoteOffline = 7,
}

/*
 * 远端视频流状态。
 */
export enum RemoteVideoState {
  /*
   * 0: 远端视频默认初始状态。在 RemoteVideoStateReasonLocalMuted、RemoteVideoStateReasonRemoteMuted 或 RemoteVideoStateReasonRemoteOffline 的情况下，会报告该状态。
   */
  RemoteVideoStateStopped = 0,
  /*
   * 1: 本地用户已接收远端视频首包。
   */
  RemoteVideoStateStarting = 1,
  /*
   * 2: 远端视频流正在解码，正常播放。在 RemoteVideoStateReasonNetworkRecovery、RemoteVideoStateReasonLocalUnmuted、RemoteVideoStateReasonRemoteUnmuted 的情况下，会报告该状态。
   */
  RemoteVideoStateDecoding = 2,
  /*
   * 3: 远端视频流卡顿。在 RemoteVideoStateReasonNetworkCongestion 的情况下，会报告该状态。
   */
  RemoteVideoStateFrozen = 3,
  /*
   * 4: 远端视频流播放失败。在 RemoteVideoStateReasonInternal 的情况下，会报告该状态。
   */
  RemoteVideoStateFailed = 4,
}

/*
 * 远端视频流状态切换原因。
 */
export enum RemoteVideoStateReason {
  /*
   * 0: 视频状态发生改变时，会报告该原因。
   */
  RemoteVideoStateReasonInternal = 0,
  /*
   * 1: 网络阻塞。
   */
  RemoteVideoStateReasonNetworkCongestion = 1,
  /*
   * 2: 网络恢复正常。
   */
  RemoteVideoStateReasonNetworkRecovery = 2,
  /*
   * 3: 本地用户停止接收远端视频流或本地用户禁用视频模块。
   */
  RemoteVideoStateReasonLocalMuted = 3,
  /*
   * 4: 本地用户恢复接收远端视频流或本地用户启动视频模块。
   */
  RemoteVideoStateReasonLocalUnmuted = 4,
  /*
   * 5: 远端用户停止发送视频流或远端用户禁用视频模块。
   */
  RemoteVideoStateReasonRemoteMuted = 5,
  /*
   * 6: 远端用户恢复发送视频流或远端用户启用视频模块。
   */
  RemoteVideoStateReasonRemoteUnmuted = 6,
  /*
   * 7: 远端用户离开频道。
   */
  RemoteVideoStateReasonRemoteOffline = 7,
  /*
   * TODO(doc)
   */
  RemoteVideoStateReasonAudioFallback = 8,
  /*
   * TODO(doc)
   */
  RemoteVideoStateReasonAudioFallbackRecovery = 9,
  /*
   * TODO(doc)
   */
  RemoteVideoStateReasonVideoStreamTypeChangeToLow = 10,
  /*
   * TODO(doc)
   */
  RemoteVideoStateReasonVideoStreamTypeChangeToHigh = 11,
}

/*
 * TODO(doc)
 */
export enum RemoteUserState {
  /*
   * TODO(doc)
   */
  UserStateMuteAudio = 1 << 0,
  /*
   * TODO(doc)
   */
  UserStateMuteVideo = 1 << 1,
  /*
   * TODO(doc)
   */
  UserStateEnableVideo = 1 << 4,
  /*
   * TODO(doc)
   */
  UserStateEnableLocalVideo = 1 << 8,
}

/*
 * TODO(doc)
 */
export class VideoTrackInfo {
  /*
   * TODO(doc)
   */
  isLocal?: boolean;
  /*
   * TODO(doc)
   */
  ownerUid?: number;
  /*
   * TODO(doc)
   */
  trackId?: number;
  /*
   * TODO(doc)
   */
  channelId?: string;
  /*
   * TODO(doc)
   */
  streamType?: VideoStreamType;
  /*
   * TODO(doc)
   */
  codecType?: VideoCodecType;
  /*
   * TODO(doc)
   */
  encodedFrameOnly?: boolean;
  /*
   * TODO(doc)
   */
  sourceType?: VideoSourceType;
  /*
   * TODO(doc)
   */
  observationPosition?: number;
}

/*
 * TODO(doc)
 */
export enum RemoteVideoDownscaleLevel {
  /*
   * TODO(doc)
   */
  RemoteVideoDownscaleLevelNone = 0,
  /*
   * TODO(doc)
   */
  RemoteVideoDownscaleLevel1 = 1,
  /*
   * TODO(doc)
   */
  RemoteVideoDownscaleLevel2 = 2,
  /*
   * TODO(doc)
   */
  RemoteVideoDownscaleLevel3 = 3,
  /*
   * TODO(doc)
   */
  RemoteVideoDownscaleLevel4 = 4,
}

/*
 * 用户音量信息。
 */
export class AudioVolumeInfo {
  /*
   * 用户 ID。 在本地用户的回调中，uid 为 0。
   * 在远端用户的回调中，uid 为瞬时音量最高的远端用户（最多 3 位）的 ID。
   */
  uid?: number;
  /*
   * 用户的音量，取值范围为 [0,255]。
   */
  volume?: number;
  /*
   * 本地用户的人声状态。 0：本地无人声。
   * 1：本地有人声。
   * vad 无法报告远端用户的人声状态。对于远端用户，vad 的值始终为 1。
   * 如需使用此参数，请在调用 enableAudioVolumeIndication 时设置 reportVad 为 true。
   */
  vad?: number;
  /*
   * 本地用户的人声音调（Hz）。取值范围为 [0.0,4000.0]。 voicePitch 无法报告远端用户的人声音调。对于远端用户，voicePitch 的值始终为 0.0。
   */
  voicePitch?: number;
}

/*
 * TODO(doc)
 */
export class DeviceInfo {
  /*
   * TODO(doc)
   */
  isLowLatencyAudioSupported?: boolean;
}

/*
 * TODO(doc)
 */
export class Packet {
  /*
   * TODO(doc)
   */
  buffer?: Uint8Array;
  /*
   * TODO(doc)
   */
  size?: number;
}

/*
 * 推流输出音频的采样率。
 */
export enum AudioSampleRateType {
  /*
   * 32000: 32 kHz
   */
  AudioSampleRate32000 = 32000,
  /*
   * 44100: 44.1 kHz
   */
  AudioSampleRate44100 = 44100,
  /*
   * 48000: （默认）48 kHz
   */
  AudioSampleRate48000 = 48000,
}

/*
 * 转码输出视频流的编解码类型。
 */
export enum VideoCodecTypeForStream {
  /*
   * 1：（默认）H.264。
   */
  VideoCodecH264ForStream = 1,
  /*
   * 2：H.265。
   */
  VideoCodecH265ForStream = 2,
}

/*
 * 旁路推流输出视频的编解码规格。
 */
export enum VideoCodecProfileType {
  /*
   * 66: Baseline 级别的视频编码规格，一般用于低阶或需要额外容错的应用，比如视频通话、手机视频等。
   */
  VideoCodecProfileBaseline = 66,
  /*
   * 77: Main 级别的视频编码规格，一般用于主流消费类电子产品，如 MP4、便携的视频播放器、PSP、iPad 等。
   */
  VideoCodecProfileMain = 77,
  /*
   * 100: （默认）High 级别的视频编码规格，一般用于广播、视频碟片存储、高清电视。
   */
  VideoCodecProfileHigh = 100,
}

/*
 *  推流输出音频的编解码规格，默认为 LC-AAC。
 */
export enum AudioCodecProfileType {
  /*
   * 0: （默认）LC-AAC 规格。
   */
  AudioCodecProfileLcAac = 0,
  /*
   * 1: HE-AAC 规格。
   */
  AudioCodecProfileHeAac = 1,
  /*
   * 2: HE-AAC v2 规格。
   */
  AudioCodecProfileHeAacV2 = 2,
}

/*
 * 本地音频统计数据。
 */
export class LocalAudioStats {
  /*
   * 声道数。
   */
  numChannels?: number;
  /*
   * 发送本地音频的采样率，单位为 Hz。
   */
  sentSampleRate?: number;
  /*
   * 发送本地音频的码率平均值，单位为 Kbps。
   */
  sentBitrate?: number;
  /*
   * 内部的 payload 类型。
   */
  internalCodec?: number;
  /*
   * 弱网对抗前本端到 Agora 边缘服务器的丢包率 (%)。
   */
  txPacketLossRate?: number;
}

/*
 * 推流状态。
 */
export enum RtmpStreamPublishState {
  /*
   * 0：推流未开始或已结束。成功调用 removePublishStreamUrl 方法删除推流地址后，也会返回该状态。
   */
  RtmpStreamPublishStateIdle = 0,
  /*
   * 1：正在连接 Agora 推流服务器和 CDN 服务器。调用 addPublishStreamUrl 方法后，会返回该状态。
   */
  RtmpStreamPublishStateConnecting = 1,
  /*
   * 2：推流正在进行。成功推流后，会返回该状态。
   */
  RtmpStreamPublishStateRunning = 2,
  /*
   * 3：正在恢复推流。当 CDN 出现异常，或推流短暂中断时，SDK 会自动尝试恢复推流，并返回该状态。 如成功恢复推流，则进入状态 RtmpStreamPublishStateRunning(2)。
   * 如服务器出错或 60 秒内未成功恢复，则进入状态 RtmpStreamPublishStateFailure(4)。如果觉得 60 秒太长，也可以主动调用 removePublishStreamUrl 和 addPublishStreamUrl 方法尝试重连。
   */
  RtmpStreamPublishStateRecovering = 3,
  /*
   * 4：推流失败。失败后，你可以通过返回的错误码排查错误原因，也可以再次调用 addPublishStreamUrl 重新尝试推流。
   */
  RtmpStreamPublishStateFailure = 4,
  /*
   * 5：SDK 正在与 Agora 推流服务器和 CDN 服务器断开连接。 当你调用 removePublishStreamUrl 或 stopRtmpStream 方法正常结束推流时，SDK 会依次报告推流状态为 RtmpStreamPublishStateDisconnecting、RtmpStreamPublishStateIdle。
   */
  RtmpStreamPublishStateDisconnecting = 5,
}

/*
 * 推流错误信息。
 */
export enum RtmpStreamPublishErrorType {
  /*
   * 0：推流成功。
   */
  RtmpStreamPublishErrorOk = 0,
  /*
   * 1：参数无效。请检查输入参数是否正确。如果你在调用 addPublishStreamUrl 前没有调用 setLiveTranscoding 设置转码参数，SDK 会返回该错误。
   */
  RtmpStreamPublishErrorInvalidArgument = 1,
  /*
   * 2：推流已加密，不能推流。
   */
  RtmpStreamPublishErrorEncryptedStreamNotAllowed = 2,
  /*
   * 3：推流超时未成功。可调用 addPublishStreamUrl 重新推流。
   */
  RtmpStreamPublishErrorConnectionTimeout = 3,
  /*
   * 4：推流服务器出现错误。请调用 addPublishStreamUrl 重新推流。
   */
  RtmpStreamPublishErrorInternalServerError = 4,
  /*
   * 5：CDN 服务器出现错误。
   */
  RtmpStreamPublishErrorRtmpServerError = 5,
  /*
   * 6：推流请求过于频繁。
   */
  RtmpStreamPublishErrorTooOften = 6,
  /*
   * 7：单个主播的推流地址数目达到上限 10。请删掉一些不用的推流地址再增加推流地址。
   */
  RtmpStreamPublishErrorReachLimit = 7,
  /*
   * 8：主播操作不属于自己的流。例如更新其他主播的流参数、停止其他主播的流。请检查 App 逻辑。
   */
  RtmpStreamPublishErrorNotAuthorized = 8,
  /*
   * 9：服务器未找到这个流。
   */
  RtmpStreamPublishErrorStreamNotFound = 9,
  /*
   * 10：推流地址格式有错误。请检查推流地址格式是否正确。
   */
  RtmpStreamPublishErrorFormatNotSupported = 10,
  /*
   * 11：用户角色不是主播，该用户无法使用推流功能。请检查你的应用代码逻辑。
   */
  RtmpStreamPublishErrorNotBroadcaster = 11,
  /*
   * 13：非转码推流情况下，调用了 updateRtmpTranscoding 或 setLiveTranscoding 方法更新转码属性。请检查你的应用代码逻辑。
   */
  RtmpStreamPublishErrorTranscodingNoMixStream = 13,
  /*
   * 14：主播的网络出错。
   */
  RtmpStreamPublishErrorNetDown = 14,
  /*
   * 15：你的 App ID 没有使用 Agora 推流服务的权限。
   */
  RtmpStreamPublishErrorInvalidAppid = 15,
  /*
   * 100：推流已正常结束。当你调用 removePublishStreamUrl 结束推流后，SDK 会返回该值。
   */
  RtmpStreamUnpublishErrorOk = 100,
}

/*
 *  旁路推流时发生的事件。
 */
export enum RtmpStreamingEvent {
  /*
   * 1: 旁路推流时，添加背景图或水印出错。
   */
  RtmpStreamingEventFailedLoadImage = 1,
  /*
   * 2: 该推流 URL 已用于推流。如果你想开始新的推流，请使用新的推流 URL。
   */
  RtmpStreamingEventUrlAlreadyInUse = 2,
  /*
   * 3: 功能不支持。
   */
  RtmpStreamingEventAdvancedFeatureNotSupport = 3,
  /*
   * 4: 预留参数。
   */
  RtmpStreamingEventRequestTooOften = 4,
}

/*
 * 图像属性。
 * 用于设置直播视频的水印和背景图片的属性。
 */
export class RtcImage {
  /*
   * 直播视频上图片的 HTTP/HTTPS 地址。字符长度不得超过 1024 字节。
   */
  url?: string;
  /*
   * 图片在视频画面上的 x 坐标 (pixel)，以输出视频画面的左上角为原点。
   */
  x?: number;
  /*
   * 图片在视频画面上的 y 坐标 (pixel)，以输出视频画面的左上角为原点。
   */
  y?: number;
  /*
   * 图片在视频画面上的宽度 (pixel)。
   */
  width?: number;
  /*
   * 图片在视频画面上的高度 (pixel)。
   */
  height?: number;
  /*
   * 水印或背景图的图层编号。使用水印数组添加单张或多张水印时，必须向 zOrder 传值，取值范围为 [1,255]，否则 SDK 会报错。其余情况，zOrder 可选传值，取值范围为 [0,255]，0 为默认值。0 代表图层的最下层，255 代表图层的最上层。
   */
  zOrder?: number;
  /*
   * 水印或背景图片的透明度。取值范围为 [0.0,1.0]： 0.0: 完全透明。
   * 1.0:（默认）完全不透明。
   */
  alpha?: number;
}

/*
 * 转码推流的高级功能配置。
 * 如需使用转码推流高级功能，请联系 。
 */
export class LiveStreamAdvancedFeature {
  /*
   * 转码推流高级功能的名称，包含 LBHQ（低码率的高清视频功能） 和 VEO（优化的视频编码器功能）。
   */
  featureName?: string;
  /*
   * 是否启用转码推流的高级功能：
   * true：开启转码推流的高级功能。
   * false：（默认）关闭转码推流的高级功能。
   */
  opened?: boolean;
}

/*
 * 网络连接状态。
 */
export enum ConnectionStateType {
  /*
   * 1: 网络连接断开。该状态表示 SDK 处于:
   * 调用 joinChannelWithOptions 加入频道前的初始化阶段。
   * 或调用 leaveChannel 后的离开频道阶段。
   */
  ConnectionStateDisconnected = 1,
  /*
   * 2: 建立网络连接中。该状态表示 SDK 在调用 joinChannelWithOptions 后正在与指定的频道建立连接。
   * 如果成功加入频道，app 会收到 onConnectionStateChanged 回调，通知当前网络状态变成 ConnectionStateConnected。
   * 建立连接后，SDK 还会初始化媒体，一切就绪后会回调 onJoinChannelSuccess 。
   */
  ConnectionStateConnecting = 2,
  /*
   * 3: 网络已连接。该状态表示用户已经加入频道，可以在频道内发布或订阅媒体流。如果因网络断开或切换而导致 SDK 与频道的连接中断，SDK 会自动重连，此时 app 会收到
   * onConnectionStateChanged 回调，通知当前网络状态变成 ConnectionStateReconnecting。
   */
  ConnectionStateConnected = 3,
  /*
   * 4: 重新建立网络连接中。该状态表示 SDK 之前曾加入过频道，但因网络等原因连接中断了，此时 SDK 会自动尝试重新接入频道。 如果 SDK 无法在 10 秒内重新加入频道，则 onConnectionLost 会被触发，SDK 会一直保持在 ConnectionStateReconnecting 的状态，并不断尝试重新加入频道。
   * 如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，则应用程序会收到 onConnectionStateChanged 回调，通知 app 的网络状态进入 ConnectionStateFailed，SDK 停止尝试重连。
   */
  ConnectionStateReconnecting = 4,
  /*
   * 5: 网络连接失败。该状态表示 SDK 已不再尝试重新加入频道，需要调用 leaveChannel 离开频道。 如果用户还想重新加入频道，则需要再次调用 joinChannelWithOptions。
   * 如果 SDK 因服务器端使用 RESTful API 禁止加入频道，则 app 会收到 onConnectionStateChanged 。
   */
  ConnectionStateFailed = 5,
}

/*
 * 参与转码合流的每个主播的设置。
 */
export class TranscodingUser {
  /*
   * 主播的用户 ID。
   */
  uid?: number;
  /*
   * 主播视频画面在输出视频画面的 x 坐标 (pixel)，以输出视频画面的左上角为原点。取值范围为[0,width]，width 为 LiveTranscoding 中设置的 width。
   */
  x?: number;
  /*
   * 主播视频画面在输出视频画面的 y 坐标 (pixel)，以输出视频画面的左上角为原点。取值范围为[0,height]，height 为 LiveTranscoding 中设置的 height。
   */
  y?: number;
  /*
   * 主播视频画面的宽 (pixel)。
   */
  width?: number;
  /*
   * 主播视频画面的高 (pixel)。
   */
  height?: number;
  /*
   * 主播视频画面的图层编号。取值范围为 [0,100]。 0:（默认）视频画面位于图层的最下层。
   * 100: 视频画面位于图层的最上层。
   * 如果取值小于 0 或大于 100，会返回错误 ERR_INVALID_ARGUMENT。
   * 从 v2.3 开始，支持将 zOrder 设置为 0。
   */
  zOrder?: number;
  /*
   * 主播视频画面的透明度。取值范围为 [0.0,1.0]。 0.0: 完全透明。
   * 1.0:（默认）完全不透明。
   */
  alpha?: number;
  /*
   * 主播音频在输出音频中占用的声道。默认值为 0，取值范围为 [0,5]： 0: （推荐）默认混音设置，最多支持双声道，与主播上行音频相关。
   * 1: 主播音频在输出音频的 FL 声道。如果主播上行音频是多声道，Agora 服务器会先把多声道混音成单声道。
   * 2: 主播音频在输出音频的 FC 声道。如果主播上行音频是多声道，Agora 服务器会先把多声道混音成单声道。
   * 3: 主播音频在输出音频的 FR 声道。如果主播上行音频是多声道，Agora 服务器会先把多声道混音成单声道。
   * 4: 主播音频在输出音频的 BL 声道。如果主播上行音频是多声道，Agora 服务器会先把多声道混音成单声道。
   * 5: 主播音频在输出音频的 BR 声道。如果主播上行音频是多声道，Agora 服务器会先把多声道混音成单声道。
   * 0xFF 或取值大于 5: 该主播音频静音，Agora 服务器移除该主播的音频。 取值不为 0 时，需要使用特殊的播放器。
   */
  audioChannel?: number;
}

/*
 *  旁路推流的转码属性。
 */
export class LiveTranscoding {
  /*
   * 推流视频的总宽度，默认值 360，单位为像素。 如果推视频流，width 取值范围为 [64,1920]。如果取值低于 64，Agora 服务器会自动调整为 64； 如果取值高于 1920，Agora 服务器会自动调整为 1920。
   * 如果推音频流，请将 width 和 height 设为 0。
   */
  width?: number;
  /*
   * 推流视频的总高度，默认值 640，单位为像素。 如果推视频流，height 取值范围为 [64,1080]。如果取值低于 64，Agora 服务器会自动调整为 64； 如果取值高于 1080，Agora 服务器会自动调整为 1080。
   * 如果推音频流，请将 width 和 height 设为 0。
   */
  height?: number;
  /*
   * 用于旁路直播的输出视频的码率。单位为 Kbps。400 Kbps 为默认值。
   */
  videoBitrate?: number;
  /*
   * TODO(doc)
   */
  videoFramerate?: number;
  /*
   *  弃用
   * Agora 不推荐使用。 低延时模式 true: 低延时，不保证画质。
   * false:（默认值）高延时，保证画质。
   */
  lowLatency?: boolean;
  /*
   * 用于旁路直播的输出视频的 GOP（Group of Pictures)。单位为帧。默认值为 30。
   */
  videoGop?: number;
  /*
   * 用于旁路直播的输出视频的编码规格。可以设置为 66、77 或 100，详见 VideoCodecProfileType 。
   * 如果你把这个参数设为其他值，Agora 服务器会将其调整为默认值。
   */
  videoCodecProfile?: VideoCodecProfileType;
  /*
   * 用于旁路直播的输出视频的背景色，格式为 RGB 定义下的十六进制整数，不要带 # 号，如 0xFFB6C1 表示浅粉色。默认0x000000，黑色。
   */
  backgroundColor?: number;
  /*
   * 用于旁路直播的输出视频的编解码类型。详见 VideoCodecTypeForStream 。
   */
  videoCodecType?: VideoCodecTypeForStream;
  /*
   * 参与合图的用户数量，默认 0。取值范围为 [0,17]。
   */
  userCount?: number;
  /*
   * 用于管理参与旁路直播的视频转码合图的用户。最多支持 17 人同时参与转码合图。详见 TranscodingUser 。
   */
  transcodingUsers?: TranscodingUser[];
  /*
   * 预留参数：用户自定义的发送到旁路推流客户端的信息，用于填充 H264/H265 视频中 SEI 帧内容。长度限制：4096 字节。关于 SEI 的详细信息，详见 SEI 帧相关问题。
   */
  transcodingExtraInfo?: string;
  /*
   *  弃用
   * 已废弃，Agora 不推荐使用。 发送给 CDN 客户端的 metadata。
   */
  metadata?: string;
  /*
   * 直播视频上的水印。图片格式需为 PNG。详见 RtcImage 。
   * 你可以添加一个水印，或使用数组的方式添加多个水印。该参数与 watermarkCount搭配使用。
   */
  watermark?: RtcImage[];
  /*
   * 直播视频上的水印的数量。水印和背景图的总数量需大于等于 0 且小于等于 10。该参数与 watermark 搭配使用。
   */
  watermarkCount?: number;
  /*
   * 直播视频上的背景图。图片格式需为 PNG。详见 RtcImage 。
   * 你可以添加一张背景图，或使用数组的方式添加多张背景图。该参数与 backgroundImageCount 搭配使用。
   */
  backgroundImage?: RtcImage[];
  /*
   * 直播视频上的背景图的数量。水印和背景图的总数量需大于等于 0 且小于等于 10。该参数与 backgroundImage 搭配使用。
   */
  backgroundImageCount?: number;
  /*
   * 用于旁路推流的输出媒体流的音频采样率 (Hz)，详见 AudioSampleRateType 。
   */
  audioSampleRate?: AudioSampleRateType;
  /*
   * 用于旁路直播的输出音频的码率。单位为 Kbps，默认值为 48，最大值为 128。
   */
  audioBitrate?: number;
  /*
   * 用于旁路直播的输出音频的声道数，默认值为 1。取值范围为 [1,5] 中的整型，建议取 1 或 2。3、4、5 需要特殊播放器支持： 1: （默认）单声道
   * 2: 双声道
   * 3: 三声道
   * 4: 四声道
   * 5: 五声道
   */
  audioChannels?: number;
  /*
   * 用于旁路直播输出音频的编码规格。详见 AudioCodecProfileType 。
   */
  audioCodecProfile?: AudioCodecProfileType;
  /*
   * 转码推流的高级功能。详见 LiveStreamAdvancedFeature 。
   */
  advancedFeatures?: LiveStreamAdvancedFeature[];
  /*
   * 开启的高级功能数量。默认值为 0。
   */
  advancedFeatureCount?: number;
}

/*
 * 参与本地合图的视频流。
 */
export class TranscodingVideoStream {
  /*
   * 参与本地合图的视频源类型。详见 VideoSourceType 。
   */
  sourceType?: MediaSourceType;
  /*
   * 远端用户 ID。 请仅在参与本地合图的视频源类型为 VideoSourceRemote 时，使用该参数。
   */
  remoteUserUid?: number;
  /*
   * 图像的 URL。 请仅在参与本地合图的视频源类型为
   */
  imageUrl?: string;
  /*
   * 参与本地合图的视频的左上角相对于合图画布左上角（原点）的横向位移。
   */
  x?: number;
  /*
   * 参与本地合图的视频的左上角相对于合图画布左上角（原点）的纵向位移。
   */
  y?: number;
  /*
   * 参与本地合图的视频的宽度 (px)。
   */
  width?: number;
  /*
   * 参与本地合图的视频的高度 (px)。
   */
  height?: number;
  /*
   * 参与本地合图的视频所属的图层的编号。取值范围为 [0,100]。 0:（默认值）图层在最下层。
   * 100: 图层在最上层。
   */
  zOrder?: number;
  /*
   * 参与本地合图的视频的透明度。取值范围为 [0.0,1.0]。 0.0 表示透明度为完全透明，1.0 表示透明度为完全不透明。
   */
  alpha?: number;
  /*
   * 是否对参与本地合图的的视频进行镜像：
   * true: 镜像。
   * false: （默认值）不镜像。 该参数仅对视频源类型为
   */
  mirror?: boolean;
}

/*
 * 本地合图的配置。
 */
export class LocalTranscoderConfiguration {
  /*
   * 参与本地合图的视频流的数量。
   */
  streamCount?: number;
  /*
   * 参与本地合图的视频流。详见 TranscodingVideoStream 。
   */
  VideoInputStreams?: TranscodingVideoStream[];
  /*
   * 本地合图后，合图视频的编码配置。详见 VideoEncoderConfiguration 。
   */
  videoOutputConfiguration?: VideoEncoderConfiguration;
}

/*
 * Last mile 网络探测配置。
 */
export class LastmileProbeConfig {
  /*
   * 是否探测上行网络。有些用户，如直播频道中的普通观众，不需要进行网络探测: true: 探测。
   * false: 不探测。
   */
  probeUplink?: boolean;
  /*
   * 是否探测下行网络。 true: 探测。
   * false: 不探测。
   */
  probeDownlink?: boolean;
  /*
   * 用户期望的最高发送码率，单位为 bps，范围为 [100000,5000000]。Agora 推荐参考 setVideoEncoderConfiguration 中的码率值设置该参数的值。
   */
  expectedUplinkBitrate?: number;
  /*
   * 用户期望的最高接收码率，单位为 bps，范围为 [100000,5000000]。
   */
  expectedDownlinkBitrate?: number;
}

/*
 * Last mile 质量探测结果的状态。
 */
export enum LastmileProbeResultState {
  /*
   * 1: 表示本次 last mile 质量探测的结果是完整的。
   */
  LastmileProbeResultComplete = 1,
  /*
   * 2: 表示本次 last mile 质量探测未进行带宽预测，因此结果不完整。一个可能的原因是测试资源暂时受限。
   */
  LastmileProbeResultIncompleteNoBwe = 2,
  /*
   * 3: 未进行 last mile 质量探测。一个可能的原因是网络连接中断。
   */
  LastmileProbeResultUnavailable = 3,
}

/*
 * 上行或下行 Last mile 网络质量探测结果。
 */
export class LastmileProbeOneWayResult {
  /*
   * 丢包率。
   */
  packetLossRate?: number;
  /*
   * 网络抖动 (ms)。
   */
  jitter?: number;
  /*
   * 可用网络带宽预估 (bps)。
   */
  availableBandwidth?: number;
}

/*
 * 上下行 Last mile 网络质量探测结果。
 */
export class LastmileProbeResult {
  /*
   * Last mile 质量探测结果的状态。详见: LastmileProbeResultState 。
   */
  state?: LastmileProbeResultState;
  /*
   * 上行网络质量报告。详见 LastmileProbeOneWayResult 。
   */
  uplinkReport?: LastmileProbeOneWayResult;
  /*
   * 下行网络质量报告。详见 LastmileProbeOneWayResult 。
   */
  downlinkReport?: LastmileProbeOneWayResult;
  /*
   * 往返时延 (ms)。
   */
  rtt?: number;
}

/*
 * 网络连接状态发生变化的原因。
 */
export enum ConnectionChangedReasonType {
  /*
   * 0: 建立网络连接中。
   */
  ConnectionChangedConnecting = 0,
  /*
   * 1: 成功加入频道。
   */
  ConnectionChangedJoinSuccess = 1,
  /*
   * 2: 网络连接中断。
   */
  ConnectionChangedInterrupted = 2,
  /*
   * 3: 网络连接被服务器禁止。服务端踢人场景时会报这个错。
   */
  ConnectionChangedBannedByServer = 3,
  /*
   * 4: 加入频道失败。SDK 在尝试加入频道 20 分钟后还是没能加入频道，会返回该状态，并停止尝试重连。
   */
  ConnectionChangedJoinFailed = 4,
  /*
   * 5: 离开频道。
   */
  ConnectionChangedLeaveChannel = 5,
  /*
   * 6: 不是有效的 APP ID。请更换有效的 APP ID 重新加入频道。
   */
  ConnectionChangedInvalidAppId = 6,
  /*
   * 7: 不是有效的频道名。请更换有效的频道名重新加入频道。
   */
  ConnectionChangedInvalidChannelName = 7,
  /*
   * 8: 生成的 Token 无效。一般有以下原因： 在控制台上启用了 App Certificate，但加入频道未使用 Token。当启用了 App Certificate，必须使用 Token。
   * 在调用 joinChannelWithOptions 加入频道时指定的用户 ID 与生成 Token 时传入的用户 ID 不一致。
   */
  ConnectionChangedInvalidToken = 8,
  /*
   * 9: 当前使用的 Token 过期，不再有效，需要重新在你的服务端申请生成 Token。
   */
  ConnectionChangedTokenExpired = 9,
  /*
   * 10: 此用户被服务器禁止。一般有以下原因： 用户已进入频道，再次调用加入频道的 API，例如 joinChannelWithOptions，会返回此状态。停止调用该方法即可。
   * 用户在进行通话测试时尝试加入频道。等待通话测试结束后再加入频道即可。
   */
  ConnectionChangedRejectedByServer = 10,
  /*
   * 11: 由于设置了代理服务器，SDK 尝试重连。
   */
  ConnectionChangedSettingProxyServer = 11,
  /*
   * 12: 更新 Token 引起网络连接状态改变。
   */
  ConnectionChangedRenewToken = 12,
  /*
   * 13: 客户端 IP 地址变更，可能是由于网络类型，或网络运营商的 IP 或端口发生改变引起。
   */
  ConnectionChangedClientIpAddressChanged = 13,
  /*
   * 14: SDK 和服务器连接保活超时，进入自动重连状态。
   */
  ConnectionChangedKeepAliveTimeout = 14,
  /*
   * TODO(doc)
   */
  ConnectionChangedRejoinSuccess = 15,
  /*
   * TODO(doc)
   */
  ConnectionChangedLost = 16,
  /*
   * TODO(doc)
   */
  ConnectionChangedEchoTest = 17,
  /*
   * TODO(doc)
   */
  ConnectionChangedClientIpAddressChangedByUser = 18,
  /*
   * TODO(doc)
   */
  ConnectionChangedSameUidLogin = 19,
  /*
   * TODO(doc)
   */
  ConnectionChangedTooManyBroadcasters = 20,
}

/*
 * TODO(doc)
 */
export enum ClientRoleChangeFailedReason {
  /*
   * TODO(doc)
   */
  ClientRoleChangeFailedTooManyBroadcasters = 1,
  /*
   * TODO(doc)
   */
  ClientRoleChangeFailedNotAuthorized = 2,
  /*
   * TODO(doc)
   */
  ClientRoleChangeFailedRequestTimeOut = 3,
  /*
   * TODO(doc)
   */
  ClientRoleChangeFailedConnectionFailed = 4,
}

/*
 * 网络连接类型。
 */
export enum NetworkType {
  /*
   * -1: 网络连接类型未知。
   */
  NetworkTypeUnknown = -1,
  /*
   * 0: 网络连接已断开。
   */
  NetworkTypeDisconnected = 0,
  /*
   * 1: 网络类型为 LAN。
   */
  NetworkTypeLan = 1,
  /*
   * 2: 网络类型为 Wi-Fi (包含热点）。
   */
  NetworkTypeWifi = 2,
  /*
   * 3: 网络类型为 2G 移动网络。
   */
  NetworkTypeMobile2g = 3,
  /*
   * 4: 网络类型为 3G 移动网络。
   */
  NetworkTypeMobile3g = 4,
  /*
   * 5: 网络类型为 4G 移动网络。
   */
  NetworkTypeMobile4g = 5,
}

/*
 * TODO(doc)
 */
export enum VideoViewSetupMode {
  /*
   * TODO(doc)
   */
  VideoViewSetupReplace = 0,
  /*
   * TODO(doc)
   */
  VideoViewSetupAdd = 1,
  /*
   * TODO(doc)
   */
  VideoViewSetupRemove = 2,
}

/*
 * 视频画布对象的属性。
 */
export class VideoCanvas {
  /*
   * 视频显示窗口。
   */
  view?: any;
  /*
   * 视频渲染模式，详见 RenderModeType 。
   */
  renderMode?: RenderModeType;
  /*
   * 视图镜像模式，详见 VideoMirrorModeType 。 本地视图镜像模式：如果你使用前置摄像头，默认启动本地视图镜像模式；如果你使用后置摄像头，默认关闭本地视图镜像模式。
   * 远端用户视图镜像模式：默认关闭远端用户的镜像模式。
   */
  mirrorMode?: VideoMirrorModeType;
  /*
   * 用户 ID。
   */
  uid?: number;
  /*
   * TODO(doc)
   */
  isScreenView?: boolean;
  /*
   * TODO(doc)
   */
  priv?: number[];
  /*
   * TODO(doc)
   */
  priv_size?: number;
  /*
   * 视频源的类型，详见 VideoSourceType 。
   */
  sourceType?: VideoSourceType;
  /*
   * TODO(doc)
   */
  cropArea?: Rectangle;
  /*
   * TODO(doc)
   */
  setupMode?: VideoViewSetupMode;
}

/*
 * 亮度明暗对比度。
 */
export enum LighteningContrastLevel {
  /*
   * TODO(doc)
   */
  LighteningContrastLow = 0,
  /*
   * 正常对比度。
   */
  LighteningContrastNormal = 1,
  /*
   * 高对比度。
   */
  LighteningContrastHigh = 2,
}

/*
 *  美颜选项。
 */
export class BeautyOptions {
  /*
   * 对比度，常与 lighteningLevel 搭配使用。取值越大，明暗对比程度越大。详见 LighteningContrastLevel 。
   */
  lighteningContrastLevel?: LighteningContrastLevel;
  /*
   * 美白程度，取值范围为 [0.0,1.0]，其中 0.0 表示原始亮度，默认值为 0.0。取值越大，美白程度越大。
   */
  lighteningLevel?: number;
  /*
   * 磨皮程度，取值范围为 [0.0,1.0]，其中 0.0 表示原始磨皮程度，默认值为 0.0。取值越大，磨皮程度越大。
   */
  smoothnessLevel?: number;
  /*
   * 红润度，取值范围为 [0.0,1.0]，其中 0.0 表示原始红润度，默认值为 0.0。取值越大，红润程度越大。
   */
  rednessLevel?: number;
  /*
   * 锐化程度，取值范围为 [0.0,1.0]，其中 0.0 表示原始锐度，默认值为 0.0。取值越大，锐化程度越大。
   */
  sharpnessLevel?: number;
}

/*
 * 自定义的背景图类型。
 */
export enum BackgroundSourceType {
  /*
   * 1:（默认）背景图为纯色。
   */
  BackgroundColor = 1,
  /*
   * 背景图为 PNG、JPG 格式的图片。
   */
  BackgroundImg = 2,
  /*
   * 将虚化处理后的背景作为背景图。
   */
  BackgroundBlur = 3,
}

/*
 * 自定义背景图的虚化程度。
 */
export enum BackgroundBlurDegree {
  /*
   * 1: 自定义背景图的虚化程度为低。用户差不多能看清背景。
   */
  BlurDegreeLow = 1,
  /*
   * 自定义背景图的虚化程度为中。用户较难看清背景。
   */
  BlurDegreeMedium = 2,
  /*
   * （默认）自定义背景图的虚化程度为高。用户很难看清背景。
   */
  BlurDegreeHigh = 3,
}

/*
 * 自定义的背景。
 */
export class VirtualBackgroundSource {
  /*
   * TODO(doc)
   */
  background_source_type?: BackgroundSourceType;
  /*
   * 自定义的背景图颜色。格式为 RGB 定义下的十六进制整数，不要带 # 号，如 0xFFB6C1 表示浅粉色。 默认值为 0xFFFFFF，表示白色。 取值范围为 [0x000000，0xffffff]。如果取值非法，SDK 会用白色背景图替换原背景图。 该参数仅在自定义背景图类型为 BackgroundColor 时生效。
   */
  color?: number;
  /*
   * 自定义背景图的本地绝对路径。支持 PNG 和 JPG 格式。如果路径无效，SDK 会用白色背景图替换原背景图。 该参数仅在自定义背景图类型为 BackgroundImg 时生效。
   */
  source?: string;
  /*
   * 自定义背景图的模糊程度。该参数仅在自定义背景图类型为 BackgroundBlur 时生效。
   */
  blur_degree?: BackgroundBlurDegree;
}

/*
 * TODO(doc)
 */
export class FishCorrectionParams {
  /*
   * TODO(doc)
   */
  _x_center?: number;
  /*
   * TODO(doc)
   */
  _y_center?: number;
  /*
   * TODO(doc)
   */
  _scale_factor?: number;
  /*
   * TODO(doc)
   */
  _focal_length?: number;
  /*
   * TODO(doc)
   */
  _pol_focal_length?: number;
  /*
   * TODO(doc)
   */
  _split_height?: number;
  /*
   * TODO(doc)
   */
  _ss?: number[];
}

/*
 * 预设的美声效果选项。
 */
export enum VoiceBeautifierPreset {
  /*
   * 原声，即关闭美声效果。
   */
  VoiceBeautifierOff = 0x00000000,
  /*
   * 磁性（男）。
   * 该设置仅对男声有效，请勿用于设置女声，否则音频会失真。
   */
  ChatBeautifierMagnetic = 0x01010100,
  /*
   * 清新（女）。
   * 该设置仅对女声有效，请勿用于设置男声，否则音频会失真。
   */
  ChatBeautifierFresh = 0x01010200,
  /*
   * 活力（女）。
   * 该设置仅对女声有效，请勿用于设置男声，否则音频会失真。
   */
  ChatBeautifierVitality = 0x01010300,
  /*
   * 歌唱美声。 如果调用 setVoiceBeautifierPreset (SingingBeautifier)，你可以美化男声并添加歌声在小房间的混响效果。请勿用于设置女声，否则音频会失真。
   * 如果调用 setVoiceBeautifierParameters (SingingBeautifier, param1, param2)，你可以美化男声或女声并添加混响效果。
   */
  SingingBeautifier = 0x01020100,
  /*
   * 浑厚。
   */
  TimbreTransformationVigorous = 0x01030100,
  /*
   * 低沉。
   */
  TimbreTransformationDeep = 0x01030200,
  /*
   * 圆润。
   */
  TimbreTransformationMellow = 0x01030300,
  /*
   * 假音。
   */
  TimbreTransformationFalsetto = 0x01030400,
  /*
   * 饱满。
   */
  TimbreTransformationFull = 0x01030500,
  /*
   * 清澈。
   */
  TimbreTransformationClear = 0x01030600,
  /*
   * 高亢。
   */
  TimbreTransformationResounding = 0x01030700,
  /*
   * 嘹亮。
   */
  TimbreTransformationRinging = 0x01030800,
  /*
   * TODO(doc)
   */
  UltraHighQualityVoice = 0x01040100,
}

/*
 * 预设的音效选项。
 * 为获取更好的人声效果，Agora 建议在使用以下预设音效前将 setAudioProfile 的 profile 参数设置为 AudioProfileMusicHighQuality 或 AudioProfileMusicHighQualityStereo： RoomAcousticsKtv
 * RoomAcousticsVocalConcert
 * RoomAcousticsStudio
 * RoomAcousticsPhonograph
 * RoomAcousticsSpacial
 * RoomAcousticsEthereal
 * VoiceChangerEffectUncle
 * VoiceChangerEffectOldman
 * VoiceChangerEffectBoy
 * VoiceChangerEffectSister
 * VoiceChangerEffectGirl
 * VoiceChangerEffectPigking
 * VoiceChangerEffectHulk
 * PitchCorrection
 */
export enum AudioEffectPreset {
  /*
   * 原声，即关闭人声音效。
   */
  AudioEffectOff = 0x00000000,
  /*
   * KTV。
   */
  RoomAcousticsKtv = 0x02010100,
  /*
   * 演唱会。
   */
  RoomAcousticsVocalConcert = 0x02010200,
  /*
   * 录音棚。
   */
  RoomAcousticsStudio = 0x02010300,
  /*
   * 留声机。
   */
  RoomAcousticsPhonograph = 0x02010400,
  /*
   * 虚拟立体声，即 SDK 将单声道的音频渲染出双声道的音效。
   * 使用该预设音效前，你需要将 setAudioProfile 的 profile 参数设置为 AudioProfileMusicHighQuality 或 AudioProfileMusicHighQualityStereo，否则该预设音效的设置无效。
   */
  RoomAcousticsVirtualStereo = 0x02010500,
  /*
   * 空旷。
   */
  RoomAcousticsSpacial = 0x02010600,
  /*
   * 空灵。
   */
  RoomAcousticsEthereal = 0x02010700,
  /*
   * 3D 人声，即 SDK 将音频渲染出在用户周围环绕的效果。环绕周期默认为 10 秒。设置该音效后，你还可以调用 setAudioEffectParameters 修改环绕周期。 使用该预设音效前，你需要将 setAudioProfile 的 profile 参数设置为 AudioProfileMusicStandardStereo 或 AudioProfileMusicHighQualityStereo，否则该预设音效的设置无效。
   * 启用 3D 人声后，用户需要使用支持双声道的音频播放设备才能听到预期效果。
   */
  RoomAcoustics3dVoice = 0x02010800,
  /*
   * 大叔。
   * 建议用于处理男声，否则无法达到预期效果。
   */
  VoiceChangerEffectUncle = 0x02020100,
  /*
   * 老年男性。
   * 建议用于处理男声，否则无法达到预期效果。
   */
  VoiceChangerEffectOldman = 0x02020200,
  /*
   * 男孩。
   * 建议用于处理男声，否则无法达到预期效果。
   */
  VoiceChangerEffectBoy = 0x02020300,
  /*
   * 少女。
   * 建议用于处理女声，否则无法达到预期效果。
   */
  VoiceChangerEffectSister = 0x02020400,
  /*
   * 女孩。
   * 建议用于处理女声，否则无法达到预期效果。
   */
  VoiceChangerEffectGirl = 0x02020500,
  /*
   * 猪八戒。
   */
  VoiceChangerEffectPigking = 0x02020600,
  /*
   * 绿巨人。
   */
  VoiceChangerEffectHulk = 0x02020700,
  /*
   * R&B。
   * 使用该预设音效前，你需要将 setAudioProfile 的 profile 参数设置为 AudioProfileMusicHighQuality 或 AudioProfileMusicHighQualityStereo，否则该预设音效的设置无效。
   */
  StyleTransformationRnb = 0x02030100,
  /*
   * 流行。
   * 使用该预设音效前，你需要将 setAudioProfile 的 profile 参数设置为 AudioProfileMusicHighQuality 或 AudioProfileMusicHighQualityStereo，否则该预设音效的设置无效。
   */
  StyleTransformationPopular = 0x02030200,
  /*
   * 电音，即 SDK 以主音音高为 C 的自然大调为基础修正音频的实际音高。设置该音效后，你还可以调用 setAudioEffectParameters 调整修音的基础调式和主音音高。
   */
  PitchCorrection = 0x02040100,
}

/*
 * 预设的变声效果选项。
 */
export enum VoiceConversionPreset {
  /*
   * 原声，即关闭变声效果。
   */
  VoiceConversionOff = 0x00000000,
  /*
   * 中性。为避免音频失真，请确保仅对女声设置该效果。
   */
  VoiceChangerNeutral = 0x03010100,
  /*
   * 甜美。为避免音频失真，请确保仅对女声设置该效果。
   */
  VoiceChangerSweet = 0x03010200,
  /*
   * 稳重。为避免音频失真，请确保仅对男声设置该效果。
   */
  VoiceChangerSolid = 0x03010300,
  /*
   * 低沉。为避免音频失真，请确保仅对男声设置该效果。
   */
  VoiceChangerBass = 0x03010400,
}

/*
 * TODO(doc)
 */
export class ScreenCaptureParameters {
  /*
   * TODO(doc)
   */
  dimensions?: VideoDimensions;
  /*
   * TODO(doc)
   */
  frameRate?: number;
  /*
   * TODO(doc)
   */
  bitrate?: number;
  /*
   * TODO(doc)
   */
  captureMouseCursor?: boolean;
  /*
   * TODO(doc)
   */
  windowFocus?: boolean;
  /*
   * TODO(doc)
   */
  excludeWindowList?: any[];
  /*
   * TODO(doc)
   */
  excludeWindowCount?: number;
}

/*
 *  录音音质。
 */
export enum AudioRecordingQualityType {
  /*
   * TODO(doc)
   */
  AudioRecordingQualityLow = 0,
  /*
   * TODO(doc)
   */
  AudioRecordingQualityMedium = 1,
  /*
   * TODO(doc)
   */
  AudioRecordingQualityHigh = 2,
}

/*
 * TODO(doc)
 */
export enum AudioFileRecordingType {
  /*
   * TODO(doc)
   */
  AudioFileRecordingMic = 1,
  /*
   * TODO(doc)
   */
  AudioFileRecordingPlayback = 2,
  /*
   * TODO(doc)
   */
  AudioFileRecordingMixed = 3,
}

/*
 * TODO(doc)
 */
export enum AudioEncodedFrameObserverPosition {
  /*
   * TODO(doc)
   */
  AudioEncodedFrameObserverPositionRecord = 1,
  /*
   * TODO(doc)
   */
  AudioEncodedFrameObserverPositionPlayback = 2,
  /*
   * TODO(doc)
   */
  AudioEncodedFrameObserverPositionMixed = 3,
}

/*
 *  录音配置。
 */
export class AudioRecordingConfiguration {
  /*
   * 录音文件在本地保存的绝对路径，需精确到文件名及格式。例如：C:\music\audio.mp4。 请确保你指定的路径存在并且可写。
   */
  filePath?: string;
  /*
   * 设置是否编码音频数据：
   * true
   * : 将音频数据用 AAC 编码。 false
   * :（默认）不编码音频数据，直接保存录制的音频数据。
   */
  encode?: boolean;
  /*
   * 录音采样率（Hz）。
   * 16000
   * 32000 （默认）
   * 44100
   * 48000 如果把该参数设为 44100 或 48000，为保证录音效果，Agora 推荐录制 WAV 文件或 quality 为
   * AudioRecordingQualityMedium 或 AudioRecordingQualityHigh 的 AAC 文件。
   */
  sampleRate?: number;
  /*
   *
   */
  fileRecordingType?: AudioFileRecordingType;
  /*
   * 录音音质。详见 AudioRecordingQualityType 。 该参数仅适用于 AAC 文件。
   */
  quality?: AudioRecordingQualityType;
}

/*
 * TODO(doc)
 */
export class AudioEncodedFrameObserverConfig {
  /*
   * TODO(doc)
   */
  postionType?: AudioEncodedFrameObserverPosition;
  /*
   * TODO(doc)
   */
  encodingType?: AudioEncodingType;
}

/*
 * 访问区域，即 SDK 连接的服务器所在的区域。
 */
export enum AreaCode {
  /*
   * 中国大陆。
   */
  AreaCodeCn = 0x00000001,
  /*
   * 北美区域。
   */
  AreaCodeNa = 0x00000002,
  /*
   * 欧洲区域。
   */
  AreaCodeEu = 0x00000004,
  /*
   * 除中国以外的亚洲区域。
   */
  AreaCodeAs = 0x00000008,
  /*
   * 日本。
   */
  AreaCodeJp = 0x00000010,
  /*
   * 印度。
   */
  AreaCodeIn = 0x00000020,
  /*
   * 全球。
   */
  AreaCodeGlob = 0xffffffff,
}

/*
 * TODO(doc)
 */
export enum AreaCodeEx {
  /*
   * TODO(doc)
   */
  AreaCodeOc = 0x00000040,
  /*
   * TODO(doc)
   */
  AreaCodeSa = 0x00000080,
  /*
   * TODO(doc)
   */
  AreaCodeAf = 0x00000100,
  /*
   * TODO(doc)
   */
  AreaCodeKr = 0x00000200,
  /*
   * TODO(doc)
   */
  AreaCodeOvs = 0xfffffffe,
}

/*
 * 跨频道媒体流转发出错的错误码。
 */
export enum ChannelMediaRelayError {
  /*
   * 0: 一切正常。
   */
  RelayOk = 0,
  /*
   * 1: 服务器回应出错。
   */
  RelayErrorServerErrorResponse = 1,
  /*
   * 2: 服务器无回应。
   * 你可以调用 leaveChannel 方法离开频道。
   * 该错误也可能是由于当前的 App ID 未开启跨频道连麦导致的。你可以申请开通跨频道连麦。
   */
  RelayErrorServerNoResponse = 2,
  /*
   * 3: SDK 无法获取服务，可能是因为服务器资源有限导致。
   */
  RelayErrorNoResourceAvailable = 3,
  /*
   * 4: 发起跨频道转发媒体流请求失败。
   */
  RelayErrorFailedJoinSrc = 4,
  /*
   * 5: 接受跨频道转发媒体流请求失败。
   */
  RelayErrorFailedJoinDest = 5,
  /*
   * 6: 服务器接收跨频道转发媒体流失败。
   */
  RelayErrorFailedPacketReceivedFromSrc = 6,
  /*
   * 7: 服务器发送跨频道转发媒体流失败。
   */
  RelayErrorFailedPacketSentToDest = 7,
  /*
   * 8: SDK 因网络质量不佳与服务器断开。你可以调用 leaveChannel 方法离开当前频道。
   */
  RelayErrorServerConnectionLost = 8,
  /*
   * 9: 服务器内部出错。
   */
  RelayErrorInternalError = 9,
  /*
   * 10: 源频道的 Token 已过期。
   */
  RelayErrorSrcTokenExpired = 10,
  /*
   * 11: 目标频道的 Token 已过期。
   */
  RelayErrorDestTokenExpired = 11,
}

/*
 * 跨频道媒体流转发事件码。
 */
export enum ChannelMediaRelayEvent {
  /*
   * 0: 网络中断导致用户与服务器连接断开。
   */
  RelayEventNetworkDisconnected = 0,
  /*
   * 1: 用户与服务器建立连接。
   */
  RelayEventNetworkConnected = 1,
  /*
   * 2: 用户已加入源频道。
   */
  RelayEventPacketJoinedSrcChannel = 2,
  /*
   * 3: 用户已加入目标频道。
   */
  RelayEventPacketJoinedDestChannel = 3,
  /*
   * 4: SDK 开始向目标频道发送数据包。
   */
  RelayEventPacketSentToDestChannel = 4,
  /*
   * 5: 服务器收到了频道发送的视频流。
   */
  RelayEventPacketReceivedVideoFromSrc = 5,
  /*
   * 6: 服务器收到了频道发送的音频流。
   */
  RelayEventPacketReceivedAudioFromSrc = 6,
  /*
   * 7: 目标频道已更新。
   */
  RelayEventPacketUpdateDestChannel = 7,
  /*
   * 8: 内部原因导致目标频道更新失败。
   */
  RelayEventPacketUpdateDestChannelRefused = 8,
  /*
   * 9: 目标频道未发生改变，即目标频道更新失败。
   */
  RelayEventPacketUpdateDestChannelNotChange = 9,
  /*
   * 10: 目标频道名为 NULL。
   */
  RelayEventPacketUpdateDestChannelIsNull = 10,
  /*
   * 11: 视频属性已发送至服务器。
   */
  RelayEventVideoProfileUpdate = 11,
  /*
   * 12: 暂停向目标频道转发媒体流成功。
   */
  RelayEventPauseSendPacketToDestChannelSuccess = 12,
  /*
   * 13: 暂停向目标频道转发媒体流失败。
   */
  RelayEventPauseSendPacketToDestChannelFailed = 13,
  /*
   * 14: 恢复向目标频道转发媒体流成功。
   */
  RelayEventResumeSendPacketToDestChannelSuccess = 14,
  /*
   * 15: 恢复向目标频道转发媒体流失败。
   */
  RelayEventResumeSendPacketToDestChannelFailed = 15,
}

/*
 * 跨频道媒体流转发状态码。
 */
export enum ChannelMediaRelayState {
  /*
   * 0: 初始状态。在成功调用 stopChannelMediaRelay 停止跨频道媒体流转发后， onChannelMediaRelayStateChanged 会回调该状态。
   */
  RelayStateIdle = 0,
  /*
   * 1: SDK 尝试跨频道。
   */
  RelayStateConnecting = 1,
  /*
   * 2: 源频道主播成功加入目标频道。
   */
  RelayStateRunning = 2,
  /*
   * 3: 发生异常，详见 onChannelMediaRelayStateChanged 的 code 参数提示的错误信息。
   */
  RelayStateFailure = 3,
}

/*
 *  ChannelMediaInfo 类定义。
 */
export class ChannelMediaInfo {
  /*
   * 频道名。
   */
  channelName?: string;
  /*
   * 能加入频道的 Token。
   */
  token?: string;
  /*
   * 用户 ID。
   */
  uid?: number;
}

/*
 *  ChannelMediaRelayConfiguration 类定义。
 */
export class ChannelMediaRelayConfiguration {
  /*
   * 源频道信息 ChannelMediaInfo ，包含如下成员： channelName：源频道名。默认值为 NULL，表示 SDK 填充当前的频道名。 uid：标识源频道中的转发媒体流的 UID。默认值为 0，表示 SDK 随机分配一个 uid。请确保设为 0。 token：能加入源频道的 token。由你在 srcInfo 中设置的 channelName 和 uid 生成。
   * 如未启用 App Certificate，可直接将该参数设为默认值 NULL，表示 SDK 填充 App ID。
   * 如已启用 App Certificate，则务必填入使用 channelName 和 uid 生成的 token，且其中的 uid 必须为 0。
   */
  srcInfo?: ChannelMediaInfo;
  /*
   * 目标频道信息 ChannelMediaInfo，包含如下成员： channelName ：目标频道的频道名。 uid：标识目标频道中的转发媒体流的 UID。取值范围为 0 到（2 32-1），请确保与目标频道中的所有 UID 不同。默认值为 0，表示 SDK 随机分配一个 UID。请确保不要将该参数设为目标频道的主播的 UID，并与目标频道中的所有 UID 都不同。 token：能加入目标频道的 token。由你在 destInfos 中设置的 channelName 和 uid 生成。 如未启用 App Certificate，可直接将该参数设为默认值 NULL，表示 SDK 填充 App ID。
   * 如已启用 App Certificate，则务必填入使用 channelName 和 uid 生成的 token。
   */
  destInfos?: ChannelMediaInfo[];
  /*
   * 目标频道数量，默认值为 0，取值范围为 [0,4]。该参数应与你在 destInfo 中定义的 ChannelMediaInfo 数组的数目一致。
   */
  destCount?: number;
}

/*
 * 上行网络信息。
 */
export class UplinkNetworkInfo {
  /*
   * 目标视频编码器的码率 (bps)。
   */
  video_encoder_target_bitrate_bps?: number;
}

/*
 * TODO(doc)
 */
export class PeerDownlinkInfo {
  /*
   * TODO(doc)
   */
  uid?: string;
  /*
   * TODO(doc)
   */
  stream_type?: VideoStreamType;
  /*
   * TODO(doc)
   */
  current_downscale_level?: RemoteVideoDownscaleLevel;
  /*
   * TODO(doc)
   */
  expected_bitrate_bps?: number;
}

/*
 * TODO(doc)
 */
export class DownlinkNetworkInfo {
  /*
   * TODO(doc)
   */
  lastmile_buffer_delay_time_ms?: number;
  /*
   * TODO(doc)
   */
  bandwidth_estimation_bps?: number;
  /*
   * TODO(doc)
   */
  total_downscale_level_count?: number;
  /*
   * TODO(doc)
   */
  peer_downlink_info?: PeerDownlinkInfo[];
  /*
   * TODO(doc)
   */
  total_received_video_count?: number;
}

/*
 * 内置加密模式。
 * Agora 推荐使用 Aes128Gcm2 或 Aes256Gcm2 加密模式。这两种模式支持使用盐，安全性更高。
 */
export enum EncryptionMode {
  /*
   * 1: 128 位 AES 加密，XTS 模式。
   */
  Aes128Xts = 1,
  /*
   * 2: 128 位 AES 加密，ECB 模式。
   */
  Aes128Ecb = 2,
  /*
   * 3: 256 位 AES 加密，XTS 模式。
   */
  Aes256Xts = 3,
  /*
   * 4: 128 位 SM4 加密，ECB 模式。
   */
  Sm4128Ecb = 4,
  /*
   * 5: 128 位 AES 加密，GCM 模式。
   */
  Aes128Gcm = 5,
  /*
   * 6: 256 位 AES 加密，GCM 模式。
   */
  Aes256Gcm = 6,
  /*
   * 7:（默认）128 位 AES 加密，GCM 模式。该加密模式需要设置盐（encryptionKdfSalt）。
   */
  Aes128Gcm2 = 7,
  /*
   * 8: 256 位 AES 加密，GCM 模式。该加密模式需要设置盐（encryptionKdfSalt）。
   */
  Aes256Gcm2 = 8,
  /*
   * 枚举值边界。
   */
  ModeEnd = 9,
}

/*
 * 配置内置加密模式和密钥。
 */
export class EncryptionConfig {
  /*
   * 内置加密模式。详见 EncryptionMode 。Agora 推荐使用 Aes128Gcm2 或 Aes256Gcm2 加密模式。这两种模式支持使用盐，安全性更高。
   */
  encryptionMode?: EncryptionMode;
  /*
   * 内置加密密钥，字符串类型，长度无限制。Agora 推荐使用 32 字节的密钥。
   * 如果未指定该参数或将该参数设置为 NULL，则无法启用内置加密，且 SDK 会返回错误码 -2。
   */
  encryptionKey?: string;
  /*
   * 盐，长度为 32 字节。Agora 推荐你在服务端使用 OpenSSL 生成盐。
   * 只有在 Aes128Gcm2 或 Aes256Gcm2 加密模式下，该参数才生效。此时，需确保填入该参数的值不全为 0。
   */
  encryptionKdfSalt?: number[];
}

/*
 * 内置加密的错误类型。
 */
export enum EncryptionErrorType {
  /*
   * 0: 内部原因。
   */
  EncryptionErrorInternalFailure = 0,
  /*
   * 1: 解密错误。请确保接收端和发送端使用的加密模式或密钥一致。
   */
  EncryptionErrorDecryptionFailure = 1,
  /*
   * 2: 加密错误。
   */
  EncryptionErrorEncryptionFailure = 2,
}

/*
 * TODO(doc)
 */
export enum UploadErrorReason {
  /*
   * TODO(doc)
   */
  UploadSuccess = 0,
  /*
   * TODO(doc)
   */
  UploadNetError = 1,
  /*
   * TODO(doc)
   */
  UploadServerError = 2,
}

/*
 * 设备权限类型。
 */
export enum PermissionType {
  /*
   * 0: 音频采集设备的权限。
   */
  RecordAudio = 0,
  /*
   * 1: 摄像头权限。
   */
  CAMERA = 1,
}

/*
 * 用户 User Account 的最大长度。
 */
export enum MaxUserAccountLengthType {
  /*
   * 用户 User Account 的最大长度为 255 个字符。
   */
  MaxUserAccountLength = 256,
}

/*
 * 订阅状态。
 */
export enum StreamSubscribeState {
  /*
   * 0: 加入频道后的初始订阅状态。
   */
  SubStateIdle = 0,
  /*
   * 1: 订阅失败。可能是因为： 远端用户： 调用 muteLocalAudioStream (true) 或 muteLocalVideoStream (true) 停止发送本地媒体流。
   * 调用 disableAudio 或 disableVideo 关闭本地音频或视频模块。
   * 调用 enableLocalAudio (false) 或 enableLocalVideo (false) 关闭本地音频或视频采集。
   * 用户角色为观众。 本地用户调用以下方法停止接收远端媒体流： 调用 muteRemoteAudioStream (true)、 muteAllRemoteAudioStreams (true) 或 setDefaultMuteAllRemoteAudioStreams (true) 停止接收远端音频流。
   * 调用 muteRemoteVideoStream (true)、 muteAllRemoteVideoStreams (true) 或 setDefaultMuteAllRemoteVideoStreams (true) 停止接收远端视频流。
   */
  SubStateNoSubscribed = 1,
  /*
   * 2: 正在订阅。
   */
  SubStateSubscribing = 2,
  /*
   * 3: 收到了远端流，订阅成功。
   */
  SubStateSubscribed = 3,
}

/*
 * 发布状态。
 */
export enum StreamPublishState {
  /*
   * 0: 加入频道后的初始发布状态。
   */
  PubStateIdle = 0,
  /*
   * 1: 发布失败。可能是因为： 本地用户调用 muteLocalAudioStream (true) 或 muteLocalVideoStream (true) 停止发送本地媒体流。
   * 本地用户调用 disableAudio 或 disableVideo 关闭本地音频或视频模块。
   * 本地用户调用 enableLocalAudio (false) 或 enableLocalVideo (false) 关闭本地音频或视频采集。
   * 本地用户角色为观众。
   */
  PubStateNoPublished = 1,
  /*
   * 2: 正在发布。
   */
  PubStatePublishing = 2,
  /*
   * 3: 发布成功。
   */
  PubStatePublished = 3,
}

/*
 * 用户的信息。
 */
export class UserInfo {
  /*
   * 用户 ID。
   */
  uid?: number;
  /*
   * 用户 Account。长度限制为 MaxUserAccountLengthType 。
   */
  userAccount?: string;
}

/*
 * 耳返 audio filter。
 */
export enum EarMonitoringFilterType {
  /*
   * 1: 不在耳返中添加 audio filter。
   */
  EarMonitoringFilterNone = 1 << 0,
  /*
   * 2: 在耳返中添加人声效果 audio filter。如果你实现了美声、音效等功能，用户可以在耳返中听到添加效果后的声音。
   */
  EarMonitoringFilterBuiltInAudioFilters = 1 << 1,
  /*
   * 4: 在耳返中添加降噪 audio filter。
   */
  EarMonitoringFilterNoiseSuppression = 1 << 2,
}

/*
 * TODO(doc)
 */
export enum ThreadPriorityType {
  /*
   * TODO(doc)
   */
  LOWEST = 0,
  /*
   * TODO(doc)
   */
  LOW = 1,
  /*
   * TODO(doc)
   */
  NORMAL = 2,
  /*
   * TODO(doc)
   */
  HIGH = 3,
  /*
   * TODO(doc)
   */
  HIGHEST = 4,
  /*
   * TODO(doc)
   */
  CRITICAL = 5,
}

/*
 * 空间音效参数。
 */
export class SpatialAudioParams {
  /*
   * TODO(doc)
   */
  speaker_azimuth?: number;
  /*
   * TODO(doc)
   */
  speaker_elevation?: number;
  /*
   * TODO(doc)
   */
  speaker_distance?: number;
  /*
   * TODO(doc)
   */
  speaker_orientation?: number;
  /*
   * TODO(doc)
   */
  enable_blur?: boolean;
  /*
   * TODO(doc)
   */
  enable_air_absorb?: boolean;
}
