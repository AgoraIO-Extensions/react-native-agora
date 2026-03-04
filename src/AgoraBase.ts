import './extension/AgoraBaseExtension';
import {
  AudioSourceType,
  RenderModeType,
  VideoModulePosition,
  VideoPixelFormat,
  VideoSourceType,
} from './AgoraMediaBase';

/**
 * Channel profile.
 */
export enum ChannelProfileType {
  /**
   * 0: Communication profile. We recommend using the live broadcasting profile for better audio and video experience.
   */
  ChannelProfileCommunication = 0,
  /**
   * 1: (Default) Live broadcasting profile.
   */
  ChannelProfileLiveBroadcasting = 1,
  /**
   * 2: Gaming profile. Deprecated: Use ChannelProfileLiveBroadcasting instead.
   */
  ChannelProfileGame = 2,
  /**
   * 3: Interactive profile. This profile is optimized for low latency. If your scenario involves frequent interactions, we recommend using this profile. Deprecated: Use ChannelProfileLiveBroadcasting instead.
   */
  ChannelProfileCloudGaming = 3,
  /**
   * @ignore
   */
  ChannelProfileCommunication1v1 = 4,
}

/**
 * @ignore
 */
export enum WarnCodeType {
  /**
   * @ignore
   */
  WarnInvalidView = 8,
  /**
   * @ignore
   */
  WarnInitVideo = 16,
  /**
   * @ignore
   */
  WarnPending = 20,
  /**
   * @ignore
   */
  WarnNoAvailableChannel = 103,
  /**
   * @ignore
   */
  WarnLookupChannelTimeout = 104,
  /**
   * @ignore
   */
  WarnLookupChannelRejected = 105,
  /**
   * @ignore
   */
  WarnOpenChannelTimeout = 106,
  /**
   * @ignore
   */
  WarnOpenChannelRejected = 107,
  /**
   * @ignore
   */
  WarnSwitchLiveVideoTimeout = 111,
  /**
   * @ignore
   */
  WarnSetClientRoleTimeout = 118,
  /**
   * @ignore
   */
  WarnOpenChannelInvalidTicket = 121,
  /**
   * @ignore
   */
  WarnOpenChannelTryNextVos = 122,
  /**
   * @ignore
   */
  WarnChannelConnectionUnrecoverable = 131,
  /**
   * @ignore
   */
  WarnChannelConnectionIpChanged = 132,
  /**
   * @ignore
   */
  WarnChannelConnectionPortChanged = 133,
  /**
   * @ignore
   */
  WarnChannelSocketError = 134,
  /**
   * @ignore
   */
  WarnAudioMixingOpenError = 701,
  /**
   * @ignore
   */
  WarnAdmRuntimePlayoutWarning = 1014,
  /**
   * @ignore
   */
  WarnAdmRuntimeRecordingWarning = 1016,
  /**
   * @ignore
   */
  WarnAdmRecordAudioSilence = 1019,
  /**
   * @ignore
   */
  WarnAdmPlayoutMalfunction = 1020,
  /**
   * @ignore
   */
  WarnAdmRecordMalfunction = 1021,
  /**
   * @ignore
   */
  WarnAdmRecordAudioLowlevel = 1031,
  /**
   * @ignore
   */
  WarnAdmPlayoutAudioLowlevel = 1032,
  /**
   * @ignore
   */
  WarnAdmWindowsNoDataReadyEvent = 1040,
  /**
   * @ignore
   */
  WarnApmHowling = 1051,
  /**
   * @ignore
   */
  WarnAdmGlitchState = 1052,
  /**
   * @ignore
   */
  WarnAdmImproperSettings = 1053,
  /**
   * @ignore
   */
  WarnAdmPopState = 1055,
  /**
   * @ignore
   */
  WarnAdmWinCoreNoRecordingDevice = 1322,
  /**
   * @ignore
   */
  WarnAdmWinCoreNoPlayoutDevice = 1323,
  /**
   * @ignore
   */
  WarnAdmWinCoreImproperCaptureRelease = 1324,
}

/**
 * Error codes.
 *
 * Error codes indicate that the SDK encountered an unrecoverable error and requires intervention from the application. For example, an error is returned when the camera fails to open, and the app needs to inform the user that the camera cannot be used.
 */
export enum ErrorCodeType {
  /**
   * 0: No error.
   */
  ErrOk = 0,
  /**
   * 1: A general error (no specific classification). Please retry the method call.
   */
  ErrFailed = 1,
  /**
   * 2: Invalid parameter set in the method. For example, the specified channel name contains illegal characters. Please reset the parameter.
   */
  ErrInvalidArgument = 2,
  /**
   * 3: The SDK is not ready. Possible reasons include: IRtcEngine initialization failed. Please reinitialize IRtcEngine.
   *  The user has not joined a channel when calling the method. Please check the method call logic.
   *  The user has not left the channel when calling rate or complain. Please check the method call logic.
   *  The audio module is not enabled.
   *  The assembly is incomplete.
   */
  ErrNotReady = 3,
  /**
   * 4: The current state of IRtcEngine does not support this operation. Possible reasons include:
   *  When using built-in encryption, the encryption mode is incorrect, or loading the external encryption library failed. Please check if the encryption enumeration value is correct, or reload the external encryption library.
   */
  ErrNotSupported = 4,
  /**
   * 5: This method call was rejected. Possible reasons include: IRtcEngine initialization failed. Please reinitialize IRtcEngine.
   *  The channel name was set to an empty string "" when joining the channel. Please reset the channel name.
   *  In multi-channel scenarios, the specified channel name already exists when calling joinChannelEx to join the channel. Please reset the channel name.
   */
  ErrRefused = 5,
  /**
   * 6: The buffer size is insufficient to hold the returned data.
   */
  ErrBufferTooSmall = 6,
  /**
   * 7: The method is called before IRtcEngine is initialized. Please ensure the IRtcEngine object is created and initialized before calling this method.
   */
  ErrNotInitialized = 7,
  /**
   * 8: The current state is invalid.
   */
  ErrInvalidState = 8,
  /**
   * 9: No permission to operate. Please check whether the user has granted the app access to audio and video devices.
   */
  ErrNoPermission = 9,
  /**
   * 10: The method call timed out. Some method calls require the SDK to return a result. If the SDK takes too long (over 10 seconds) to process the event, this error occurs.
   */
  ErrTimedout = 10,
  /**
   * @ignore
   */
  ErrCanceled = 11,
  /**
   * @ignore
   */
  ErrTooOften = 12,
  /**
   * @ignore
   */
  ErrBindSocket = 13,
  /**
   * @ignore
   */
  ErrNetDown = 14,
  /**
   * 17: Joining the channel was rejected. Possible reasons include:
   *  The user is already in the channel. It is recommended to determine whether the user is in the channel through the onConnectionStateChanged callback. Do not call this method again to join the channel unless receiving the ConnectionStateDisconnected (1) state.
   *  The user attempted to join a channel after calling startEchoTest for a call test without first calling stopEchoTest to end the current test. After starting a call test, you must call stopEchoTest to end the test before joining a channel.
   */
  ErrJoinChannelRejected = 17,
  /**
   * 18: Failed to leave the channel. Possible reasons include:
   *  The user has already left the channel before calling leaveChannel. Just stop calling this method.
   *  The user called leaveChannel to exit the channel without having joined it. No further action is needed in this case.
   */
  ErrLeaveChannelRejected = 18,
  /**
   * 19: The resource is already in use and cannot be reused.
   */
  ErrAlreadyInUse = 19,
  /**
   * 20: The SDK aborted the request, possibly due to too many requests.
   */
  ErrAborted = 20,
  /**
   * 21: Specific firewall settings on Windows caused IRtcEngine initialization to fail and crash.
   */
  ErrInitNetEngine = 21,
  /**
   * 22: The SDK failed to allocate resources, possibly due to excessive resource usage by the app or system resource exhaustion.
   */
  ErrResourceLimited = 22,
  /**
   * @ignore
   */
  ErrFuncIsProhibited = 23,
  /**
   * 101: Invalid App ID. Please use a valid App ID to rejoin the channel.
   */
  ErrInvalidAppId = 101,
  /**
   * 102: Invalid channel name. Possible reason is incorrect data type for the parameter. Please use a valid channel name to rejoin the channel.
   */
  ErrInvalidChannelName = 102,
  /**
   * 103: Unable to acquire server resources in the current region. Try specifying another region when initializing IRtcEngine.
   */
  ErrNoServerResources = 103,
  /**
   * 109: The current Token has expired and is no longer valid. Please request a new Token from your server and call renewToken to update it. Deprecated: This enumeration is deprecated. Use ConnectionChangedTokenExpired (9) in the onConnectionStateChanged callback instead.
   */
  ErrTokenExpired = 109,
  /**
   * Deprecated: This enumeration is deprecated. Use ConnectionChangedInvalidToken (8) in the onConnectionStateChanged callback instead. 110: Invalid Token. Common reasons include:
   *  App certificate is enabled in the console, but App ID + Token authentication is not used. When the App certificate is enabled, Token authentication must be used.
   *  The uid field used when generating the Token does not match the uid used when the user joins the channel.
   */
  ErrInvalidToken = 110,
  /**
   * 111: Network connection interrupted. After the SDK establishes a connection with the server, it loses network connectivity for more than 4 seconds.
   */
  ErrConnectionInterrupted = 111,
  /**
   * 112: Network connection lost. The network is disconnected and the SDK fails to reconnect to the server within 10 seconds.
   */
  ErrConnectionLost = 112,
  /**
   * 113: The user is not in a channel when calling the sendStreamMessage method.
   */
  ErrNotInChannel = 113,
  /**
   * 114: The data length exceeds 1 KB when calling sendStreamMessage.
   */
  ErrSizeTooLarge = 114,
  /**
   * 115: The data sending rate exceeds the limit (6 KB/s) when calling sendStreamMessage.
   */
  ErrBitrateLimit = 115,
  /**
   * 116: The number of data streams created exceeds the limit (5) when calling createDataStream.
   */
  ErrTooManyDataStreams = 116,
  /**
   * 117: Data stream sending timed out.
   */
  ErrStreamMessageTimeout = 117,
  /**
   * 119: Failed to switch user role. Please try rejoining the channel.
   */
  ErrSetClientRoleNotAuthorized = 119,
  /**
   * 120: Media stream decryption failed. Possibly due to an incorrect key used when the user joined the channel. Please check the key entered when joining the channel, or guide the user to try rejoining.
   */
  ErrDecryptionFailed = 120,
  /**
   * 121: Invalid user ID.
   */
  ErrInvalidUserId = 121,
  /**
   * 122: Data stream decryption failed. Possibly due to an incorrect key used when the user joined the channel. Please check the key entered when joining the channel, or guide the user to try rejoining.
   */
  ErrDatastreamDecryptionFailed = 122,
  /**
   * 123: This user is banned by the server.
   */
  ErrClientIsBannedByServer = 123,
  /**
   * 130: The SDK does not support pushing encrypted streams to CDN.
   */
  ErrEncryptedStreamNotAllowedPublish = 130,
  /**
   * @ignore
   */
  ErrLicenseCredentialInvalid = 131,
  /**
   * 134: Invalid user account, possibly due to an invalid parameter.
   */
  ErrInvalidUserAccount = 134,
  /**
   * @ignore
   */
  ErrModuleNotFound = 157,
  /**
   * 1001: Failed to load the media engine.
   */
  ErrCertRaw = 157,
  /**
   * @ignore
   */
  ErrCertJsonPart = 158,
  /**
   * @ignore
   */
  ErrCertJsonInval = 159,
  /**
   * @ignore
   */
  ErrCertJsonNomem = 160,
  /**
   * @ignore
   */
  ErrCertCustom = 161,
  /**
   * @ignore
   */
  ErrCertCredential = 162,
  /**
   * @ignore
   */
  ErrCertSign = 163,
  /**
   * @ignore
   */
  ErrCertFail = 164,
  /**
   * @ignore
   */
  ErrCertBuf = 165,
  /**
   * @ignore
   */
  ErrCertNull = 166,
  /**
   * @ignore
   */
  ErrCertDuedate = 167,
  /**
   * @ignore
   */
  ErrCertRequest = 168,
  /**
   * 200: Unsupported PCM format.
   */
  ErrPcmsendFormat = 200,
  /**
   * 201: Buffer overflow due to PCM sending rate being too fast.
   */
  ErrPcmsendBufferoverflow = 201,
  /**
   * @ignore
   */
  ErrRdtUserNotExist = 250,
  /**
   * @ignore
   */
  ErrRdtUserNotReady = 251,
  /**
   * @ignore
   */
  ErrRdtDataBlocked = 252,
  /**
   * @ignore
   */
  ErrRdtCmdExceedLimit = 253,
  /**
   * @ignore
   */
  ErrRdtDataExceedLimit = 254,
  /**
   * @ignore
   */
  ErrRdtEncryption = 255,
  /**
   * @ignore
   */
  ErrLoginAlreadyLogin = 428,
  /**
   * @ignore
   */
  ErrLoadMediaEngine = 1001,
  /**
   * 1005: Audio device error (unspecified). Please check whether the audio device is occupied by another application, or try rejoining the channel.
   */
  ErrAdmGeneralError = 1005,
  /**
   * 1008: Failed to initialize the playback device. Please check whether the playback device is occupied by another application, or try rejoining the channel.
   */
  ErrAdmInitPlayout = 1008,
  /**
   * 1009: Failed to start the playback device. Please check whether the playback device is functioning properly.
   */
  ErrAdmStartPlayout = 1009,
  /**
   * 1010: Failed to stop the playback device.
   */
  ErrAdmStopPlayout = 1010,
  /**
   * 1011: Failed to initialize the recording device. Please check whether the recording device is functioning properly, or try rejoining the channel.
   */
  ErrAdmInitRecording = 1011,
  /**
   * 1012: Failed to start the recording device. Please check whether the recording device is functioning properly.
   */
  ErrAdmStartRecording = 1012,
  /**
   * 1013: Failed to stop the recording device.
   */
  ErrAdmStopRecording = 1013,
  /**
   * 1501: No permission to use the camera. Please check whether camera permission is enabled.
   */
  ErrVdmCameraNotAuthorized = 1501,
}

/**
 * @ignore
 */
export enum LicenseErrorType {
  /**
   * @ignore
   */
  LicenseErrInvalid = 1,
  /**
   * @ignore
   */
  LicenseErrExpire = 2,
  /**
   * @ignore
   */
  LicenseErrMinutesExceed = 3,
  /**
   * @ignore
   */
  LicenseErrLimitedPeriod = 4,
  /**
   * @ignore
   */
  LicenseErrDiffDevices = 5,
  /**
   * @ignore
   */
  LicenseErrInternal = 99,
}

/**
 * Permissions for SDK operations on the Audio Session.
 */
export enum AudioSessionOperationRestriction {
  /**
   * 0: No restriction. The SDK can modify the Audio Session.
   */
  AudioSessionOperationRestrictionNone = 0,
  /**
   * 1: The SDK cannot modify the category of the Audio Session.
   */
  AudioSessionOperationRestrictionSetCategory = 1,
  /**
   * 2: The SDK cannot modify the category, mode, or categoryOptions of the Audio Session.
   */
  AudioSessionOperationRestrictionConfigureSession = 1 << 1,
  /**
   * 4: When leaving the channel, the SDK keeps the Audio Session active, such as for playing audio in the background.
   */
  AudioSessionOperationRestrictionDeactivateSession = 1 << 2,
  /**
   * 128: Fully restricts the SDK from operating on the Audio Session. The SDK can no longer make any changes to the Audio Session.
   */
  AudioSessionOperationRestrictionAll = 1 << 7,
}

/**
 * Reason for user going offline.
 */
export enum UserOfflineReasonType {
  /**
   * 0: The user left voluntarily.
   */
  UserOfflineQuit = 0,
  /**
   * 1: Timed out due to not receiving packets from the peer for a long time. Since the SDK uses an unreliable channel, it is also possible that the peer left the channel voluntarily, but the local side did not receive the leave message and mistakenly determined it as a timeout.
   */
  UserOfflineDropped = 1,
  /**
   * 2: The user's role changed from host to audience.
   */
  UserOfflineBecomeAudience = 2,
}

/**
 * Interface class.
 */
export enum InterfaceIdType {
  /**
   * 1: IAudioDeviceManager interface class.
   */
  AgoraIidAudioDeviceManager = 1,
  /**
   * 2: IVideoDeviceManager interface class.
   */
  AgoraIidVideoDeviceManager = 2,
  /**
   * @ignore
   */
  AgoraIidParameterEngine = 3,
  /**
   * 4: IMediaEngine interface class.
   */
  AgoraIidMediaEngine = 4,
  /**
   * @ignore
   */
  AgoraIidAudioEngine = 5,
  /**
   * @ignore
   */
  AgoraIidVideoEngine = 6,
  /**
   * @ignore
   */
  AgoraIidRtcConnection = 7,
  /**
   * 8: This interface class is deprecated.
   */
  AgoraIidSignalingEngine = 8,
  /**
   * @ignore
   */
  AgoraIidMediaEngineRegulator = 9,
  /**
   * 11: ILocalSpatialAudioEngine interface class.
   */
  AgoraIidLocalSpatialAudio = 11,
  /**
   * @ignore
   */
  AgoraIidStateSync = 13,
  /**
   * @ignore
   */
  AgoraIidMetaService = 14,
  /**
   * 15: IMusicContentCenter interface class.
   */
  AgoraIidMusicContentCenter = 15,
  /**
   * @ignore
   */
  AgoraIidH265Transcoder = 16,
}

/**
 * Network quality.
 */
export enum QualityType {
  /**
   * 0: Unknown network quality.
   */
  QualityUnknown = 0,
  /**
   * 1: Excellent network quality.
   */
  QualityExcellent = 1,
  /**
   * 2: Subjectively similar to excellent, but bitrate may be slightly lower.
   */
  QualityGood = 2,
  /**
   * 3: Slightly impaired experience but communication is not affected.
   */
  QualityPoor = 3,
  /**
   * 4: Barely communicable but not smooth.
   */
  QualityBad = 4,
  /**
   * 5: Very poor network quality, communication is nearly impossible.
   */
  QualityVbad = 5,
  /**
   * 6: Communication is completely impossible.
   */
  QualityDown = 6,
  /**
   * @ignore
   */
  QualityUnsupported = 7,
  /**
   * 8: Network quality detection in progress.
   */
  QualityDetecting = 8,
}

/**
 * @ignore
 */
export enum FitModeType {
  /**
   * @ignore
   */
  ModeCover = 1,
  /**
   * @ignore
   */
  ModeContain = 2,
}

/**
 * Clockwise video rotation information.
 */
export enum VideoOrientation {
  /**
   * 0: (Default) Rotate 0 degrees clockwise.
   */
  VideoOrientation0 = 0,
  /**
   * 90: Rotate 90 degrees clockwise.
   */
  VideoOrientation90 = 90,
  /**
   * 180: Rotate 180 degrees clockwise.
   */
  VideoOrientation180 = 180,
  /**
   * 270: Rotate 270 degrees clockwise.
   */
  VideoOrientation270 = 270,
}

/**
 * Video frame rate.
 */
export enum FrameRate {
  /**
   * 1: 1 fps.
   */
  FrameRateFps1 = 1,
  /**
   * 7: 7 fps.
   */
  FrameRateFps7 = 7,
  /**
   * 10: 10 fps.
   */
  FrameRateFps10 = 10,
  /**
   * 15: 15 fps.
   */
  FrameRateFps15 = 15,
  /**
   * 24: 24 fps.
   */
  FrameRateFps24 = 24,
  /**
   * 30: 30 fps.
   */
  FrameRateFps30 = 30,
  /**
   * @ignore
   */
  FrameRateFps60 = 60,
}

/**
 * @ignore
 */
export enum FrameWidth {
  /**
   * @ignore
   */
  FrameWidth960 = 960,
}

/**
 * @ignore
 */
export enum FrameHeight {
  /**
   * @ignore
   */
  FrameHeight540 = 540,
}

/**
 * Video frame type.
 */
export enum VideoFrameType {
  /**
   * 0: Blank frame.
   */
  VideoFrameTypeBlankFrame = 0,
  /**
   * 3: Key frame.
   */
  VideoFrameTypeKeyFrame = 3,
  /**
   * 4: Delta frame.
   */
  VideoFrameTypeDeltaFrame = 4,
  /**
   * 5: B frame.
   */
  VideoFrameTypeBFrame = 5,
  /**
   * 6: Droppable frame.
   */
  VideoFrameTypeDroppableFrame = 6,
  /**
   * Unknown frame.
   */
  VideoFrameTypeUnknow = 7,
}

/**
 * Orientation mode for video encoding.
 */
export enum OrientationMode {
  /**
   * 0: (Default) In this mode, the SDK outputs video with the same orientation as the captured video. The receiving end rotates the video based on the received rotation information. This mode is suitable when the receiver can adjust the video orientation.
   *  If the captured video is in landscape mode, the output video is also in landscape mode.
   *  If the captured video is in portrait mode, the output video is also in portrait mode.
   */
  OrientationModeAdaptive = 0,
  /**
   * @ignore
   */
  OrientationModeFixedLandscape = 1,
  /**
   * @ignore
   */
  OrientationModeFixedPortrait = 2,
}

/**
 * Video encoding degradation preference when bandwidth is limited.
 */
export enum DegradationPreference {
  /**
   * -1: (Default) Auto mode. The SDK automatically selects MaintainFramerate, MaintainBalanced, or MaintainResolution based on your video scenario settings to achieve optimal overall quality of experience (QoE).
   */
  MaintainAuto = -1,
  /**
   * 0: When bandwidth is limited, prioritize reducing video frame rate while maintaining resolution. This degradation preference suits scenarios where video quality is prioritized. Deprecated: This enum is deprecated. Use other enums instead.
   */
  MaintainQuality = 0,
  /**
   * 1: When bandwidth is limited, prioritize reducing video resolution while maintaining frame rate. This degradation preference suits scenarios where smoothness is prioritized and some quality loss is acceptable.
   */
  MaintainFramerate = 1,
  /**
   * 2: When bandwidth is limited, reduce both video frame rate and resolution. The degradation level of MaintainBalanced is lower than that of MaintainQuality and MaintainFramerate, suitable for scenarios with both smoothness and quality constraints. The resolution of the locally sent video may change. The remote user must be able to handle this. See onVideoSizeChanged.
   */
  MaintainBalanced = 2,
  /**
   * 3: When bandwidth is limited, prioritize reducing video frame rate while maintaining resolution. This degradation preference suits scenarios where video quality is prioritized.
   */
  MaintainResolution = 3,
  /**
   * @ignore
   */
  Disabled = 100,
}

/**
 * Video dimensions.
 */
export class VideoDimensions {
  /**
   * Video width in pixels.
   */
  width?: number;
  /**
   * Video height in pixels.
   */
  height?: number;
}

/**
 * Maximum frame rate supported by the screen sharing device.
 */
export enum ScreenCaptureFramerateCapability {
  /**
   * 0: Supports up to 15 fps.
   */
  ScreenCaptureFramerateCapability15Fps = 0,
  /**
   * 1: Supports up to 30 fps.
   */
  ScreenCaptureFramerateCapability30Fps = 1,
  /**
   * 2: Supports up to 60 fps.
   */
  ScreenCaptureFramerateCapability60Fps = 2,
}

/**
 * @ignore
 */
export enum VideoCodecCapabilityLevel {
  /**
   * @ignore
   */
  CodecCapabilityLevelUnspecified = -1,
  /**
   * @ignore
   */
  CodecCapabilityLevelBasicSupport = 5,
  /**
   * @ignore
   */
  CodecCapabilityLevel1080p30fps = 10,
  /**
   * @ignore
   */
  CodecCapabilityLevel1080p60fps = 20,
  /**
   * @ignore
   */
  CodecCapabilityLevel4k60fps = 30,
}

/**
 * Video codec format.
 */
export enum VideoCodecType {
  /**
   * 0: (Default) No specific codec format. The SDK automatically selects a suitable codec based on the video resolution and device performance.
   */
  VideoCodecNone = 0,
  /**
   * 1: Standard VP8.
   */
  VideoCodecVp8 = 1,
  /**
   * 2: Standard H.264.
   */
  VideoCodecH264 = 2,
  /**
   * 3: Standard H.265.
   */
  VideoCodecH265 = 3,
  /**
   * 6: Generic. This type is mainly used for transmitting raw video data (e.g., user-encrypted video frames). The video frames are returned via callback and need to be decoded and rendered by the user.
   */
  VideoCodecGeneric = 6,
  /**
   * @ignore
   */
  VideoCodecGenericH264 = 7,
  /**
   * @ignore
   */
  VideoCodecAv1 = 12,
  /**
   * @ignore
   */
  VideoCodecVp9 = 13,
  /**
   * 20: Generic JPEG. Requires less computing power and is suitable for IoT devices with limited resources.
   */
  VideoCodecGenericJpeg = 20,
}

/**
 * Camera focal length type.
 */
export enum CameraFocalLengthType {
  /**
   * 0: (Default) Standard lens.
   */
  CameraFocalLengthDefault = 0,
  /**
   * 1: Wide-angle lens.
   */
  CameraFocalLengthWideAngle = 1,
  /**
   * 2: Ultra wide-angle lens.
   */
  CameraFocalLengthUltraWide = 2,
  /**
   * 3: (iOS only) Telephoto lens.
   */
  CameraFocalLengthTelephoto = 3,
}

/**
 * @ignore
 */
export enum TCcMode {
  /**
   * @ignore
   */
  CcEnabled = 0,
  /**
   * @ignore
   */
  CcDisabled = 1,
}

/**
 * @ignore
 */
export class SenderOptions {
  /**
   * @ignore
   */
  ccMode?: TCcMode;
  /**
   * @ignore
   */
  codecType?: VideoCodecType;
  /**
   * @ignore
   */
  targetBitrate?: number;
}

/**
 * Audio codec format.
 */
export enum AudioCodecType {
  /**
   * 1: OPUS.
   */
  AudioCodecOpus = 1,
  /**
   * 3: PCMA.
   */
  AudioCodecPcma = 3,
  /**
   * 4: PCMU.
   */
  AudioCodecPcmu = 4,
  /**
   * 5: G722.
   */
  AudioCodecG722 = 5,
  /**
   * 8: LC-AAC.
   */
  AudioCodecAaclc = 8,
  /**
   * 9: HE-AAC.
   */
  AudioCodecHeaac = 9,
  /**
   * 10: JC1.
   */
  AudioCodecJc1 = 10,
  /**
   * 11: HE-AAC v2.
   */
  AudioCodecHeaac2 = 11,
  /**
   * @ignore
   */
  AudioCodecLpcnet = 12,
  /**
   * @ignore
   */
  AudioCodecOpusmc = 13,
}

/**
 * Audio encoding type.
 */
export enum AudioEncodingType {
  /**
   * 0x010101: AAC encoding format, 16000 Hz sampling rate, low quality. The encoded file size for 10 minutes of audio is approximately 1.2 MB.
   */
  AudioEncodingTypeAac16000Low = 0x010101,
  /**
   * 0x010102: AAC encoding format, 16000 Hz sampling rate, medium quality. The encoded file size for 10 minutes of audio is approximately 2 MB.
   */
  AudioEncodingTypeAac16000Medium = 0x010102,
  /**
   * 0x010201: AAC encoding format, 32000 Hz sampling rate, low quality. The encoded file size for 10 minutes of audio is approximately 1.2 MB.
   */
  AudioEncodingTypeAac32000Low = 0x010201,
  /**
   * 0x010202: AAC encoding format, 32000 Hz sampling rate, medium quality. The encoded file size for 10 minutes of audio is approximately 2 MB.
   */
  AudioEncodingTypeAac32000Medium = 0x010202,
  /**
   * 0x010203: AAC encoding format, 32000 Hz sampling rate, high quality. The encoded file size for 10 minutes of audio is approximately 3.5 MB.
   */
  AudioEncodingTypeAac32000High = 0x010203,
  /**
   * 0x010302: AAC encoding format, 48000 Hz sampling rate, medium quality. The encoded file size for 10 minutes of audio is approximately 2 MB.
   */
  AudioEncodingTypeAac48000Medium = 0x010302,
  /**
   * 0x010303: AAC encoding format, 48000 Hz sampling rate, high quality. The encoded file size for 10 minutes of audio is approximately 3.5 MB.
   */
  AudioEncodingTypeAac48000High = 0x010303,
  /**
   * 0x020101: OPUS encoding format, 16000 Hz sampling rate, low quality. The encoded file size for 10 minutes of audio is approximately 2 MB.
   */
  AudioEncodingTypeOpus16000Low = 0x020101,
  /**
   * 0x020102: OPUS encoding format, 16000 Hz sampling rate, medium quality. The encoded file size for 10 minutes of audio is approximately 2 MB.
   */
  AudioEncodingTypeOpus16000Medium = 0x020102,
  /**
   * 0x020302: OPUS encoding format, 48000 Hz sampling rate, medium quality. The encoded file size for 10 minutes of audio is approximately 2 MB.
   */
  AudioEncodingTypeOpus48000Medium = 0x020302,
  /**
   * 0x020303: OPUS encoding format, 48000 Hz sampling rate, high quality. The encoded file size for 10 minutes of audio is approximately 3.5 MB.
   */
  AudioEncodingTypeOpus48000High = 0x020303,
}

/**
 * Watermark adaptation mode.
 */
export enum WatermarkFitMode {
  /**
   * 0: Uses the values of positionInLandscapeMode and positionInPortraitMode set in WatermarkOptions. The settings in WatermarkRatio are ignored.
   */
  FitModeCoverPosition = 0,
  /**
   * 1: Uses the value set in WatermarkRatio. The settings of positionInLandscapeMode and positionInPortraitMode in WatermarkOptions are ignored.
   */
  FitModeUseImageRatio = 1,
}

/**
 * @ignore
 */
export class EncodedAudioFrameAdvancedSettings {
  /**
   * @ignore
   */
  speech?: boolean;
  /**
   * @ignore
   */
  sendEvenIfEmpty?: boolean;
}

/**
 * Information about encoded audio.
 */
export class EncodedAudioFrameInfo {
  /**
   * Audio codec type: AudioCodecType.
   */
  codec?: AudioCodecType;
  /**
   * Audio sample rate (Hz).
   */
  sampleRateHz?: number;
  /**
   * Number of audio samples per channel.
   */
  samplesPerChannel?: number;
  /**
   * Number of channels.
   */
  numberOfChannels?: number;
  /**
   * This feature is not supported yet.
   */
  advancedSettings?: EncodedAudioFrameAdvancedSettings;
  /**
   * Unix timestamp (ms) of the captured external encoded video frame.
   */
  captureTimeMs?: number;
}

/**
 * @ignore
 */
export class AudioPcmDataInfo {
  /**
   * @ignore
   */
  samplesPerChannel?: number;
  /**
   * @ignore
   */
  channelNum?: number;
  /**
   * @ignore
   */
  samplesOut?: number;
  /**
   * @ignore
   */
  elapsedTimeMs?: number;
  /**
   * @ignore
   */
  ntpTimeMs?: number;
}

/**
 * @ignore
 */
export enum H264PacketizeMode {
  /**
   * @ignore
   */
  NonInterleaved = 0,
  /**
   * @ignore
   */
  SingleNalUnit = 1,
}

/**
 * Type of video stream.
 */
export enum VideoStreamType {
  /**
   * 0: High video stream, i.e., high resolution and high bitrate stream.
   */
  VideoStreamHigh = 0,
  /**
   * 1: Low video stream, i.e., low resolution and low bitrate stream.
   */
  VideoStreamLow = 1,
  /**
   * @ignore
   */
  VideoStreamLayer1 = 4,
  /**
   * @ignore
   */
  VideoStreamLayer2 = 5,
  /**
   * @ignore
   */
  VideoStreamLayer3 = 6,
  /**
   * @ignore
   */
  VideoStreamLayer4 = 7,
  /**
   * @ignore
   */
  VideoStreamLayer5 = 8,
  /**
   * @ignore
   */
  VideoStreamLayer6 = 9,
}

/**
 * Video subscription settings.
 */
export class VideoSubscriptionOptions {
  /**
   * Type of video stream to subscribe to. Default is VideoStreamHigh, i.e., subscribe to the high-quality video stream. See VideoStreamType.
   */
  type?: VideoStreamType;
  /**
   * Whether to subscribe only to the encoded video stream: true : Subscribe only to encoded video data (structured data), the SDK does not decode or render the video. false : (Default) Subscribe to both raw and encoded video data.
   */
  encodedFrameOnly?: boolean;
}

/**
 * Maximum length of the user account.
 */
export enum MaxUserAccountLengthType {
  /**
   * The maximum length of the user account is 255 characters.
   */
  MaxUserAccountLength = 256,
}

/**
 * Information about externally encoded video frames.
 */
export class EncodedVideoFrameInfo {
  /**
   * Video codec type. See VideoCodecType. Default value is VideoCodecH264 (2).
   */
  codecType?: VideoCodecType;
  /**
   * Width of the video frame (px).
   */
  width?: number;
  /**
   * Height of the video frame (px).
   */
  height?: number;
  /**
   * Frames per second.
   * When this parameter is not 0, you can use it to calculate the Unix timestamp of the externally encoded video frame.
   */
  framesPerSecond?: number;
  /**
   * Type of the video frame. See VideoFrameType.
   */
  frameType?: VideoFrameType;
  /**
   * Rotation information of the video frame. See VideoOrientation.
   */
  rotation?: VideoOrientation;
  /**
   * Reserved parameter.
   */
  trackId?: number;
  /**
   * Unix timestamp (ms) when the externally encoded video frame was captured.
   */
  captureTimeMs?: number;
  /**
   * @ignore
   */
  decodeTimeMs?: number;
  /**
   * Type of the video stream. See VideoStreamType.
   */
  streamType?: VideoStreamType;
  /**
   * @ignore
   */
  presentationMs?: number;
}

/**
 * Compression preference type for video encoding.
 */
export enum CompressionPreference {
  /**
   * -1: (Default) Automatic mode. The SDK automatically selects PreferLowLatency or PreferQuality based on your video scenario to provide the best user experience.
   */
  PreferCompressionAuto = -1,
  /**
   * 0: Low latency preference. The SDK compresses video frames to reduce latency. Suitable for scenarios where smoothness is prioritized and some quality loss is acceptable.
   */
  PreferLowLatency = 0,
  /**
   * 1: High quality preference. The SDK compresses video frames while maintaining video quality. Suitable for scenarios where video quality is prioritized.
   */
  PreferQuality = 1,
}

/**
 * Video encoder preference.
 */
export enum EncodingPreference {
  /**
   * -1: Adaptive preference. The SDK automatically selects the optimal encoder type based on platform, device type, and other factors.
   */
  PreferAuto = -1,
  /**
   * 0: Software encoder preference. The SDK prioritizes using the software encoder for video encoding.
   */
  PreferSoftware = 0,
  /**
   * 1: Hardware encoder preference. The SDK prioritizes using the hardware encoder for video encoding. If the device does not support hardware encoding, the SDK automatically switches to software encoding and reports the current encoder type via the hwEncoderAccelerating field in the onLocalVideoStats callback.
   */
  PreferHardware = 1,
}

/**
 * Advanced options for video encoding.
 */
export class AdvanceOptions {
  /**
   * Video encoder preference. See EncodingPreference.
   */
  encodingPreference?: EncodingPreference;
  /**
   * Compression preference for video encoding. See CompressionPreference.
   */
  compressionPreference?: CompressionPreference;
  /**
   * When the video frame contains alpha channel data, specifies whether to encode and send the alpha data to the remote end: true : Encode and send alpha data. false : (Default) Do not encode or send alpha data.
   */
  encodeAlpha?: boolean;
}

/**
 * Mirror mode type.
 */
export enum VideoMirrorModeType {
  /**
   * 0: The SDK determines the mirror mode.
   *  Local view mirror mode: If you use the front camera, the local view mirror mode is enabled by default; if you use the rear camera, the local view mirror mode is disabled by default.
   *  Remote user view mirror mode: The mirror mode for remote users is disabled by default.
   */
  VideoMirrorModeAuto = 0,
  /**
   * 1: Enable mirror mode.
   */
  VideoMirrorModeEnabled = 1,
  /**
   * 2: Disable mirror mode.
   */
  VideoMirrorModeDisabled = 2,
}

/**
 * @ignore
 */
export enum CameraFormatType {
  /**
   * @ignore
   */
  CameraFormatNv12 = 0,
  /**
   * @ignore
   */
  CameraFormatBgra = 1,
}

/**
 * @ignore
 */
export enum VideoModuleType {
  /**
   * @ignore
   */
  VideoModuleCapturer = 0,
  /**
   * @ignore
   */
  VideoModuleSoftwareEncoder = 1,
  /**
   * @ignore
   */
  VideoModuleHardwareEncoder = 2,
  /**
   * @ignore
   */
  VideoModuleSoftwareDecoder = 3,
  /**
   * @ignore
   */
  VideoModuleHardwareDecoder = 4,
  /**
   * @ignore
   */
  VideoModuleRenderer = 5,
}

/**
 * @ignore
 */
export enum HdrCapability {
  /**
   * @ignore
   */
  HdrCapabilityUnknown = -1,
  /**
   * @ignore
   */
  HdrCapabilityUnsupported = 0,
  /**
   * @ignore
   */
  HdrCapabilitySupported = 1,
}

/**
 * Codec capability bit mask.
 */
export enum CodecCapMask {
  /**
   * (0): Codec not supported.
   */
  CodecCapMaskNone = 0,
  /**
   * (1 << 0): Supports hardware decoding.
   */
  CodecCapMaskHwDec = 1 << 0,
  /**
   * (1 << 1): Supports hardware encoding.
   */
  CodecCapMaskHwEnc = 1 << 1,
  /**
   * (1 << 2): Supports software decoding.
   */
  CodecCapMaskSwDec = 1 << 2,
  /**
   * (1 << 3): Supports software encoding.
   */
  CodecCapMaskSwEnc = 1 << 3,
}

/**
 * Codec capability levels.
 */
export class CodecCapLevels {
  /**
   * Hardware decoding capability level, indicating the device's ability to decode videos of different qualities using hardware. See VIDEO_CODEC_CAPABILITY_LEVEL.
   */
  hwDecodingLevel?: VideoCodecCapabilityLevel;
  /**
   * Software decoding capability level, indicating the device's ability to decode videos of different qualities using software. See VIDEO_CODEC_CAPABILITY_LEVEL.
   */
  swDecodingLevel?: VideoCodecCapabilityLevel;
}

/**
 * Information about codec capabilities supported by the SDK.
 */
export class CodecCapInfo {
  /**
   * Video codec type. See VideoCodecType.
   */
  codecType?: VideoCodecType;
  /**
   * Bit mask of codec types supported by the SDK. See CodecCapMask.
   */
  codecCapMask?: number;
  /**
   * @ignore
   */
  codecLevels?: CodecCapLevels;
}

/**
 * Focal length information supported by the camera, including camera direction and focal length type.
 */
export class FocalLengthInfo {
  /**
   * Camera direction. See CameraDirection.
   */
  cameraDirection?: number;
  /**
   * Focal length type. See CameraFocalLengthType.
   */
  focalLengthType?: CameraFocalLengthType;
}

/**
 * Configuration for the video encoder.
 */
export class VideoEncoderConfiguration {
  /**
   * Video codec type. See VideoCodecType.
   */
  codecType?: VideoCodecType;
  /**
   * Resolution (px) of the video encoding. See VideoDimensions. This parameter is used to measure encoding quality, represented as height × width. Default is 960 × 540. You can customize the resolution.
   */
  dimensions?: VideoDimensions;
  /**
   * Frame rate (fps) of the video encoding. Default is 15. See FrameRate.
   */
  frameRate?: number;
  /**
   * Bitrate of the video encoding in Kbps. You do not need to set this parameter; keep the default value STANDARD_BITRATE. The SDK automatically matches the optimal bitrate based on your configured resolution and frame rate. For the mapping between resolution and frame rate, see [Video Profile](https://doc.shengwang.cn/doc/rtc/rn/basic-features/video-profile#%E8%A7%86%E9%A2%91%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83).
   *  STANDARD_BITRATE (0): (Default) Standard bitrate mode.
   *  COMPATIBLE_BITRATE (-1): Compatible bitrate mode. In general, we recommend not using this value.
   */
  bitrate?: number;
  /**
   * Minimum encoding bitrate in Kbps.
   * The SDK adjusts the video encoding bitrate automatically based on network conditions. Setting this parameter higher than the default forces the encoder to output high-quality images, but may cause packet loss and stuttering under poor network conditions. Therefore, unless you have special quality requirements, we recommend not changing this value. (Live streaming only)
   */
  minBitrate?: number;
  /**
   * Orientation mode of the video encoding. See OrientationMode.
   */
  orientationMode?: OrientationMode;
  /**
   * Video degradation preference when bandwidth is limited. See DegradationPreference. When this parameter is set to MaintainFramerate (1) or MaintainBalanced (2), you must also set orientationMode to OrientationModeAdaptive (0), otherwise the setting will not take effect.
   */
  degradationPreference?: DegradationPreference;
  /**
   * Whether to enable mirror mode when sending encoded video. This only affects the video seen by remote users. See VideoMirrorModeType. Mirror mode is disabled by default.
   */
  mirrorMode?: VideoMirrorModeType;
  /**
   * Advanced options for video encoding. See AdvanceOptions.
   */
  advanceOptions?: AdvanceOptions;
}

/**
 * Data stream settings.
 *
 * The table below shows the SDK behavior under different parameter settings: syncWithAudio ordered
 * SDK Behavior false false
 * The SDK immediately triggers the onStreamMessage callback upon receiving the data packet. true false
 * If the data packet delay is within the audio delay range, the SDK triggers the onStreamMessage callback synchronized with the audio packet during playback. If the delay exceeds the audio delay, the SDK triggers the callback immediately upon receiving the packet, which may cause desynchronization between audio and data packets. false true
 * If the data packet delay is within 5 seconds, the SDK corrects the packet disorder. If the delay exceeds 5 seconds, the SDK discards the packet. true true
 * If the data packet delay is within the audio delay range, the SDK corrects the packet disorder. If the delay exceeds the audio delay, the SDK discards the packet.
 */
export class DataStreamConfig {
  /**
   * Whether to synchronize with the locally sent audio stream. true : Synchronize the data stream with the audio stream. This setting is suitable for special scenarios such as lyrics synchronization. false : Do not synchronize the data stream with the audio stream. This setting is suitable for scenarios where data packets need to reach the receiver immediately. When synchronized with the audio stream, if the data packet delay is within the audio delay range, the SDK triggers the onStreamMessage callback synchronized with the audio packet during playback.
   */
  syncWithAudio?: boolean;
  /**
   * Whether to ensure the received data is in the same order as sent. true : Ensures the SDK outputs data packets in the order sent by the sender. false : Does not ensure the SDK outputs data packets in the order sent by the sender. If data packets need to reach the receiver immediately, do not set this parameter to true.
   */
  ordered?: boolean;
}

/**
 * Mode for sending video streams.
 */
export enum SimulcastStreamMode {
  /**
   * -1: By default, the low-quality stream is not sent until a subscription request for the low-quality stream is received from the receiver, at which point the low-quality stream is sent automatically.
   */
  AutoSimulcastStream = -1,
  /**
   * 0: Never send the low-quality stream.
   */
  DisableSimulcastStream = 0,
  /**
   * 1: Always send the low-quality stream.
   */
  EnableSimulcastStream = 1,
}

/**
 * Configuration for video simulcast stream.
 */
export class SimulcastStreamConfig {
  /**
   * Video dimensions. See VideoDimensions. The default value is 50% of the main stream resolution.
   */
  dimensions?: VideoDimensions;
  /**
   * Video bitrate (Kbps), default is -1. This parameter does not need to be set; the SDK will automatically match the most appropriate bitrate based on the resolution and frame rate you set.
   */
  kBitrate?: number;
  /**
   * Video frame rate (fps). Default is 5.
   */
  framerate?: number;
}

/**
 * @ignore
 */
export enum StreamLayerIndex {
  /**
   * @ignore
   */
  StreamLayer1 = 0,
  /**
   * @ignore
   */
  StreamLayer2 = 1,
  /**
   * @ignore
   */
  StreamLayer3 = 2,
  /**
   * @ignore
   */
  StreamLayer4 = 3,
  /**
   * @ignore
   */
  StreamLayer5 = 4,
  /**
   * @ignore
   */
  StreamLayer6 = 5,
  /**
   * @ignore
   */
  StreamLow = 6,
  /**
   * @ignore
   */
  StreamLayerCountMax = 7,
}

/**
 * @ignore
 */
export class StreamLayerConfig {
  /**
   * @ignore
   */
  dimensions?: VideoDimensions;
  /**
   * @ignore
   */
  framerate?: number;
  /**
   * @ignore
   */
  enable?: boolean;
}

/**
 * @ignore
 */
export class SimulcastConfig {
  /**
   * @ignore
   */
  configs?: StreamLayerConfig[];
  /**
   * @ignore
   */
  publish_fallback_enable?: boolean;
}

/**
 * The position of the target area relative to the entire screen or window. If not specified, it represents the entire screen or window.
 */
export class Rectangle {
  /**
   * The horizontal offset of the top-left corner.
   */
  x?: number;
  /**
   * The vertical offset of the top-left corner.
   */
  y?: number;
  /**
   * The width of the target area.
   */
  width?: number;
  /**
   * The height of the target area.
   */
  height?: number;
}

/**
 * Position and size of the watermark on the screen.
 *
 * The position and size of the watermark on the screen are determined by xRatio, yRatio, and widthRatio :
 *  (xRatio, yRatio) indicates the coordinates of the top-left corner of the watermark, representing the distance from the top-left corner of the screen. widthRatio determines the width of the watermark.
 */
export class WatermarkRatio {
  /**
   * The x-coordinate of the top-left corner of the watermark. With the top-left corner of the screen as the origin, the x-coordinate represents the horizontal offset of the watermark's top-left corner relative to the origin. Value range: [0.0, 1.0], default is 0.
   */
  xRatio?: number;
  /**
   * The y-coordinate of the top-left corner of the watermark. With the top-left corner of the screen as the origin, the y-coordinate represents the vertical offset of the watermark's top-left corner relative to the origin. Value range: [0.0, 1.0], default is 0.
   */
  yRatio?: number;
  /**
   * The width of the watermark. The SDK calculates the proportional height of the watermark based on this value to ensure the image is not distorted when scaled. Value range: [0.0, 1.0], default is 0, which means the watermark is not displayed.
   */
  widthRatio?: number;
}

/**
 * Configures the watermark image.
 *
 * Used to configure the settings for the watermark image to be added.
 */
export class WatermarkOptions {
  /**
   * Whether the watermark is visible in the local preview view: true : (default) The watermark is visible in the local preview view. false : The watermark is not visible in the local preview view.
   */
  visibleInPreview?: boolean;
  /**
   * When the watermark fit mode is FitModeCoverPosition, sets the area of the watermark image in landscape mode. See Rectangle.
   */
  positionInLandscapeMode?: Rectangle;
  /**
   * When the watermark fit mode is FitModeCoverPosition, sets the area of the watermark image in portrait mode. See Rectangle.
   */
  positionInPortraitMode?: Rectangle;
  /**
   * When the watermark fit mode is FitModeUseImageRatio, this parameter sets the watermark coordinates in scaling mode. See WatermarkRatio.
   */
  watermarkRatio?: WatermarkRatio;
  /**
   * The fit mode of the watermark. See WatermarkFitMode.
   */
  mode?: WatermarkFitMode;
  /**
   * The z-order of the watermark image. Default is 0.
   */
  zOrder?: number;
}

/**
 * Watermark source type.
 *
 * Since Available since v4.6.2.
 */
export enum WatermarkSourceType {
  /**
   * (0): The watermark source is an image.
   */
  Image = 0,
  /**
   * (1): The watermark source is a buffer.
   */
  Buffer = 1,
  /**
   * (2): The watermark source is a text literal. (Linux only)
   */
  Literal = 2,
  /**
   * (3): The watermark source is a timestamp. (Linux only)
   */
  Timestamps = 3,
}

/**
 * Used to configure timestamp watermark.
 *
 * Since Available since v4.6.2. (Linux only)
 */
export class WatermarkTimestamp {
  /**
   * Font size of the timestamp. Default is 10.
   */
  fontSize?: number;
  /**
   * Path to the timestamp font file. Default is NULL. The font file must be in .ttf format. If not set, the SDK uses the system default font (if available). If used asynchronously, copy the path to memory that will not be released.
   */
  fontFilePath?: string;
  /**
   * Stroke width of the timestamp. Default is 1.
   */
  strokeWidth?: number;
  /**
   * Format of the timestamp. Default is %F %X. The format follows the C standard library function strftime. See strftime. If used asynchronously, copy the format string to memory that will not be released.
   */
  format?: string;
}

/**
 * Used to configure text watermark.
 *
 * Since Available since v4.6.2. (Linux only)
 */
export class WatermarkLiteral {
  /**
   * Font size of the text. Default is 10.
   */
  fontSize?: number;
  /**
   * Stroke width of the text. Default is 1.
   */
  strokeWidth?: number;
  /**
   * Text content of the watermark. Default is NULL. If used asynchronously, copy the string to memory that will not be released.
   */
  wmLiteral?: string;
  /**
   * Path to the font file. Default is NULL. The font file should be in .ttf format. If not set, the SDK uses the system default font (if available). If used asynchronously, copy the string to memory that will not be released.
   */
  fontFilePath?: string;
}

/**
 * Used to configure the format, size, and pixel buffer of the watermark image.
 *
 * Since Available since v4.6.2.
 */
export class WatermarkBuffer {
  /**
   * Width of the watermark image in pixels.
   */
  width?: number;
  /**
   * Height of the watermark image in pixels.
   */
  height?: number;
  /**
   * Length of the watermark image buffer in bytes.
   */
  length?: number;
  /**
   * Pixel format of the watermark image. See VideoPixelFormat.
   */
  format?: VideoPixelFormat;
  /**
   * Pixel buffer data of the watermark image.
   */
  buffer?: Uint8Array;
}

/**
 * Used to configure watermark information.
 *
 * Since Available since v4.6.2.
 */
export class WatermarkConfig {
  /**
   * Unique identifier of the watermark. It is recommended to use UUID.
   */
  id?: string;
  /**
   * Type of the watermark. See WatermarkSourceType.
   */
  type?: WatermarkSourceType;
  /**
   * Buffer of the watermark. See WatermarkBuffer.
   */
  buffer?: WatermarkBuffer;
  /**
   * Timestamp of the watermark. (Linux only)
   */
  timestamp?: WatermarkTimestamp;
  /**
   * Text content of the watermark. (Linux only)
   */
  literal?: WatermarkLiteral;
  /**
   * URL of the watermark image file. Default is NULL.
   */
  imageUrl?: string;
  /**
   * Configuration options for the watermark. See WatermarkOptions.
   */
  options?: WatermarkOptions;
}

/**
 * Mode for multipath data transmission.
 *
 * Since Available since v4.6.2.
 */
export enum MultipathMode {
  /**
   * (0): Redundant transmission mode. The same data is transmitted redundantly through all available paths.
   */
  Duplicate = 0,
  /**
   * (1): Dynamic transmission mode. The SDK dynamically selects the optimal path for data transmission based on the current network conditions to improve performance.
   */
  Dynamic = 1,
}

/**
 * Network path types used for multipath transmission.
 *
 * Since Available since v4.6.2.
 */
export enum MultipathType {
  /**
   * (0): Local Area Network (LAN) path.
   */
  Lan = 0,
  /**
   * (1): Wi-Fi path.
   */
  Wifi = 1,
  /**
   * (2): Mobile network path.
   */
  Mobile = 2,
  /**
   * (99): Unknown or unspecified network path.
   */
  Unknown = 99,
}

/**
 * Used to obtain statistics for a specific network path.
 *
 * Since Available since v4.6.2.
 */
export class PathStats {
  /**
   * The type of network path. See MultipathType.
   */
  type?: MultipathType;
  /**
   * The transmission bitrate of this path, in Kbps.
   */
  txKBitRate?: number;
  /**
   * The receiving bitrate of this path, in Kbps.
   */
  rxKBitRate?: number;
}

/**
 * Used to aggregate statistics of each network path in multipath transmission.
 *
 * Since Available since v4.6.2.
 */
export class MultipathStats {
  /**
   * Total bytes sent through the LAN path.
   */
  lanTxBytes?: number;
  /**
   * Total bytes received through the LAN path.
   */
  lanRxBytes?: number;
  /**
   * Total bytes sent through the Wi-Fi path.
   */
  wifiTxBytes?: number;
  /**
   * Total bytes received through the Wi-Fi path.
   */
  wifiRxBytes?: number;
  /**
   * Total bytes sent through the mobile network path.
   */
  mobileTxBytes?: number;
  /**
   * Total bytes received through the mobile network path.
   */
  mobileRxBytes?: number;
  /**
   * The number of currently active transmission paths.
   */
  activePathNum?: number;
  /**
   * An array of statistics for each active transmission path. See PathStats.
   */
  pathStats?: PathStats[];
}

/**
 * Call-related statistics.
 */
export class RtcStats {
  /**
   * Call duration of the local user (seconds), cumulative value.
   */
  duration?: number;
  /**
   * Number of bytes sent.
   */
  txBytes?: number;
  /**
   * Number of bytes received.
   */
  rxBytes?: number;
  /**
   * Number of audio bytes sent, cumulative value.
   */
  txAudioBytes?: number;
  /**
   * Number of video bytes sent, cumulative value.
   */
  txVideoBytes?: number;
  /**
   * Number of audio bytes received, cumulative value.
   */
  rxAudioBytes?: number;
  /**
   * Number of video bytes received, cumulative value.
   */
  rxVideoBytes?: number;
  /**
   * Sending bitrate (Kbps).
   */
  txKBitRate?: number;
  /**
   * Receiving bitrate (Kbps).
   */
  rxKBitRate?: number;
  /**
   * Audio receiving bitrate (Kbps).
   */
  rxAudioKBitRate?: number;
  /**
   * Audio sending bitrate (Kbps).
   */
  txAudioKBitRate?: number;
  /**
   * Video receiving bitrate (Kbps).
   */
  rxVideoKBitRate?: number;
  /**
   * Video sending bitrate (Kbps).
   */
  txVideoKBitRate?: number;
  /**
   * Client-to-access-server latency (ms).
   */
  lastmileDelay?: number;
  /**
   * Number of users in the current channel.
   */
  userCount?: number;
  /**
   * CPU usage (%) of the current app.
   *  The cpuAppUsage reported in the onLeaveChannel callback is always 0.
   */
  cpuAppUsage?: number;
  /**
   * CPU usage (%) of the current system.
   *  The cpuTotalUsage reported in the onLeaveChannel callback is always 0.
   *  Since Android 8.1, due to system limitations, you cannot obtain CPU usage through this property.
   */
  cpuTotalUsage?: number;
  /**
   * Round-trip time (ms) from client to local router. This property is enabled by default on devices before iOS 14 and disabled on iOS 14 and later.
   *
   *  To enable this property on iOS 14 and later, [contact technical support](https://ticket.shengwang.cn/).
   * On Android, to obtain gatewayRtt, ensure that the android.permission.ACCESS_WIFI_STATE permission is added after </application> in your project's AndroidManifest.xml file.
   */
  gatewayRtt?: number;
  /**
   * Memory usage ratio (%) of the current app. This value is for reference only. It may not be available due to system limitations.
   */
  memoryAppUsageRatio?: number;
  /**
   * Memory usage ratio (%) of the current system. This value is for reference only. It may not be available due to system limitations.
   */
  memoryTotalUsageRatio?: number;
  /**
   * Memory usage (KB) of the current app. This value is for reference only. It may not be available due to system limitations.
   */
  memoryAppUsageInKbytes?: number;
  /**
   * Time from starting connection to successful connection (ms). A value of 0 indicates invalid.
   */
  connectTimeMs?: number;
  /**
   * @ignore
   */
  firstAudioPacketDuration?: number;
  /**
   * @ignore
   */
  firstVideoPacketDuration?: number;
  /**
   * @ignore
   */
  firstVideoKeyFramePacketDuration?: number;
  /**
   * @ignore
   */
  packetsBeforeFirstKeyFramePacket?: number;
  /**
   * @ignore
   */
  firstAudioPacketDurationAfterUnmute?: number;
  /**
   * @ignore
   */
  firstVideoPacketDurationAfterUnmute?: number;
  /**
   * @ignore
   */
  firstVideoKeyFramePacketDurationAfterUnmute?: number;
  /**
   * @ignore
   */
  firstVideoKeyFrameDecodedDurationAfterUnmute?: number;
  /**
   * @ignore
   */
  firstVideoKeyFrameRenderedDurationAfterUnmute?: number;
  /**
   * Uplink packet loss rate (%) from client to server before anti-packet-loss technique is applied.
   */
  txPacketLossRate?: number;
  /**
   * Downlink packet loss rate (%) from server to client before anti-packet-loss technique is applied.
   */
  rxPacketLossRate?: number;
  /**
   * @ignore
   */
  lanAccelerateState?: number;
}

/**
 * User roles in live broadcasting.
 */
export enum ClientRoleType {
  /**
   * 1: Broadcaster. A broadcaster can both send and receive streams.
   */
  ClientRoleBroadcaster = 1,
  /**
   * 2: (Default) Audience. An audience can only receive streams, not send.
   */
  ClientRoleAudience = 2,
}

/**
 * Adaptation of local video quality since last statistics (based on target frame rate and target bitrate).
 */
export enum QualityAdaptIndication {
  /**
   * 0: Local video quality remains unchanged.
   */
  AdaptNone = 0,
  /**
   * 1: Local video quality improves due to increased network bandwidth.
   */
  AdaptUpBandwidth = 1,
  /**
   * 2: Local video quality degrades due to decreased network bandwidth.
   */
  AdaptDownBandwidth = 2,
}

/**
 * Latency level of audience in a live broadcast channel. This enum takes effect only when the user role is set to ClientRoleAudience.
 */
export enum AudienceLatencyLevelType {
  /**
   * 1: Low latency.
   */
  AudienceLatencyLevelLowLatency = 1,
  /**
   * 2: (Default) Ultra-low latency.
   */
  AudienceLatencyLevelUltraLowLatency = 2,
}

/**
 * User role property settings.
 */
export class ClientRoleOptions {
  /**
   * Audience latency level. See AudienceLatencyLevelType.
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
}

/**
 * The subjective experience quality of the local user when receiving remote audio.
 */
export enum ExperienceQualityType {
  /**
   * 0: Good subjective experience quality.
   */
  ExperienceQualityGood = 0,
  /**
   * 1: Poor subjective experience quality.
   */
  ExperienceQualityBad = 1,
}

/**
 * The reason for poor subjective experience quality of the local user when receiving remote audio.
 */
export enum ExperiencePoorReason {
  /**
   * 0: No reason, indicates good subjective experience quality.
   */
  ExperienceReasonNone = 0,
  /**
   * 1: Poor network quality of the remote user.
   */
  RemoteNetworkQualityPoor = 1,
  /**
   * 2: Poor network quality of the local user.
   */
  LocalNetworkQualityPoor = 2,
  /**
   * 4: Weak Wi-Fi or mobile data signal of the local user.
   */
  WirelessSignalPoor = 4,
  /**
   * 8: Wi-Fi and Bluetooth are enabled simultaneously on the local device, causing signal interference and degraded audio transmission quality.
   */
  WifiBluetoothCoexist = 8,
}

/**
 * AI noise reduction mode.
 */
export enum AudioAinsMode {
  /**
   * 0: (Default) Balanced noise reduction mode. Choose this mode if you want a balance between noise suppression and latency.
   */
  AinsModeBalanced = 0,
  /**
   * 1: Aggressive noise reduction mode. Suitable for scenarios with high noise suppression requirements, such as outdoor live streaming. This mode reduces noise more significantly but may slightly damage voice quality.
   */
  AinsModeAggressive = 1,
  /**
   * 2: Low-latency aggressive noise reduction mode. This mode has about half the latency of weak and aggressive noise reduction modes, suitable for scenarios requiring both noise reduction and low latency, such as real-time chorus.
   */
  AinsModeUltralowlatency = 2,
}

/**
 * Audio encoding properties.
 */
export enum AudioProfileType {
  /**
   * 0: Default value.
   *  In live broadcast: 48 kHz sample rate, music encoding, mono, max bitrate 64 Kbps.
   *  In communication: 32 kHz sample rate, speech encoding, mono, max bitrate 18 Kbps.
   */
  AudioProfileDefault = 0,
  /**
   * 1: Sets 32 kHz sample rate, speech encoding, mono, max bitrate 18 Kbps.
   */
  AudioProfileSpeechStandard = 1,
  /**
   * 2: Sets 48 kHz sample rate, music encoding, mono, max bitrate 64 Kbps.
   */
  AudioProfileMusicStandard = 2,
  /**
   * 3: Sets 48 kHz sample rate, music encoding, stereo, max bitrate 80 Kbps.
   * To enable stereo, you also need to call setAdvancedAudioOptions and set audioProcessingChannels to AudioProcessingStereo in AdvancedAudioOptions.
   */
  AudioProfileMusicStandardStereo = 3,
  /**
   * 4: Sets 48 kHz sample rate, music encoding, mono, max bitrate 96 Kbps.
   */
  AudioProfileMusicHighQuality = 4,
  /**
   * 5: Sets 48 kHz sample rate, music encoding, stereo, max bitrate 128 Kbps.
   * To enable stereo, you also need to call setAdvancedAudioOptions and set audioProcessingChannels to AudioProcessingStereo in AdvancedAudioOptions.
   */
  AudioProfileMusicHighQualityStereo = 5,
  /**
   * 6: Sets 16 kHz sample rate, speech encoding, mono, applies echo cancellation algorithm AEC.
   */
  AudioProfileIot = 6,
  /**
   * Boundary of enum values.
   */
  AudioProfileNum = 7,
}

/**
 * Audio scenario.
 */
export enum AudioScenarioType {
  /**
   * 0: (Default) Auto scenario. Automatically matches appropriate audio quality based on user role and audio route.
   */
  AudioScenarioDefault = 0,
  /**
   * 3: High-quality scenario, suitable for music-centric use cases. For example: instrument practice.
   */
  AudioScenarioGameStreaming = 3,
  /**
   * 5: Chatroom scenario, suitable for frequent mic on/off situations. For example: education scenarios.
   */
  AudioScenarioChatroom = 5,
  /**
   * 7: Chorus scenario. Suitable for real-time chorus with low latency under good network conditions.
   */
  AudioScenarioChorus = 7,
  /**
   * 8: Meeting scenario, suitable for multi-person voice-centric meetings.
   */
  AudioScenarioMeeting = 8,
  /**
   * @ignore
   */
  AudioScenarioAiServer = 9,
  /**
   * 10: AI dialogue scenario, only applicable to interactions with [Agora Conversational AI Engine](https://doc.shengwang.cn/doc/convoai/restful/landing-page).
   */
  AudioScenarioAiClient = 10,
  /**
   * Number of enum values.
   */
  AudioScenarioNum = 11,
}

/**
 * Video frame format.
 */
export class VideoFormat {
  /**
   * Width of the video frame (px). Default is 960.
   */
  width?: number;
  /**
   * Height of the video frame (px). Default is 540.
   */
  height?: number;
  /**
   * Frame rate of the video frame. Default is 15.
   */
  fps?: number;
}

/**
 * Content type of screen sharing.
 */
export enum VideoContentHint {
  /**
   * (Default) No specified content type.
   */
  ContentHintNone = 0,
  /**
   * Content type is motion. Recommended when sharing videos, movies, or video games.
   */
  ContentHintMotion = 1,
  /**
   * Content type is details. Recommended when sharing images or text.
   */
  ContentHintDetails = 2,
}

/**
 * Screen sharing scenarios.
 */
export enum ScreenScenarioType {
  /**
   * 1: (Default) Document. In this scenario, the quality of the shared content is prioritized, and the latency for the receiver to see the shared video is reduced. You can use this scenario when sharing documents, slides, or spreadsheets.
   */
  ScreenScenarioDocument = 1,
  /**
   * 2: Gaming. In this scenario, the smoothness of the shared content is prioritized. You can use this scenario when sharing games.
   */
  ScreenScenarioGaming = 2,
  /**
   * 3: Video. In this scenario, the smoothness of the shared content is prioritized. You can use this scenario when sharing movies or live videos.
   */
  ScreenScenarioVideo = 3,
  /**
   * 4: Remote control. In this scenario, the quality of the shared content is prioritized, and the latency for the receiver to see the shared video is reduced. You can use this scenario when sharing the desktop of a remotely controlled device.
   */
  ScreenScenarioRdc = 4,
}

/**
 * Video application scenario type.
 */
export enum VideoApplicationScenarioType {
  /**
   * 0: (Default) General scenario.
   */
  ApplicationScenarioGeneral = 0,
  /**
   * 1: Meeting scenario.
   */
  ApplicationScenarioMeeting = 1,
  /**
   * 2: 1v1 video call
   */
  ApplicationScenario1v1 = 2,
  /**
   * 3: Live show
   */
  ApplicationScenarioLiveshow = 3,
}

/**
 * @ignore
 */
export enum VideoQoePreferenceType {
  /**
   * @ignore
   */
  VideoQoePreferenceBalance = 1,
  /**
   * @ignore
   */
  VideoQoePreferenceDelayFirst = 2,
  /**
   * @ignore
   */
  VideoQoePreferencePictureQualityFirst = 3,
  /**
   * @ignore
   */
  VideoQoePreferenceFluencyFirst = 4,
}

/**
 * Brightness level of the locally captured video.
 */
export enum CaptureBrightnessLevelType {
  /**
   * @ignore
   */
  CaptureBrightnessLevelInvalid = -1,
  /**
   * @ignore
   */
  CaptureBrightnessLevelNormal = 0,
  /**
   * @ignore
   */
  CaptureBrightnessLevelBright = 1,
  /**
   * @ignore
   */
  CaptureBrightnessLevelDark = 2,
}

/**
 * Camera stabilization mode.
 *
 * Camera stabilization effect increases in the order of 1 < 2 < 3, with corresponding increase in latency.
 */
export enum CameraStabilizationMode {
  /**
   * -1: (Default) Camera stabilization is off.
   */
  CameraStabilizationModeOff = -1,
  /**
   * 0: Camera auto stabilization. The system automatically selects a stabilization mode based on the camera state. However, this mode has higher latency, and it is recommended not to use this enumeration.
   */
  CameraStabilizationModeAuto = 0,
  /**
   * 1: (Recommended) Camera stabilization level 1.
   */
  CameraStabilizationModeLevel1 = 1,
  /**
   * 2: Camera stabilization level 2.
   */
  CameraStabilizationModeLevel2 = 2,
  /**
   * 3: Camera stabilization level 3.
   */
  CameraStabilizationModeLevel3 = 3,
  /**
   * @ignore
   */
  CameraStabilizationModeMaxLevel = 3,
}

/**
 * Local audio state.
 */
export enum LocalAudioStreamState {
  /**
   * 0: Default initial state of local audio.
   */
  LocalAudioStreamStateStopped = 0,
  /**
   * 1: Local audio capture device started successfully.
   */
  LocalAudioStreamStateRecording = 1,
  /**
   * 2: First frame of local audio encoded successfully.
   */
  LocalAudioStreamStateEncoding = 2,
  /**
   * 3: Failed to start local audio.
   */
  LocalAudioStreamStateFailed = 3,
}

/**
 * Reason for local audio state change.
 */
export enum LocalAudioStreamReason {
  /**
   * 0: Local audio state is normal.
   */
  LocalAudioStreamReasonOk = 0,
  /**
   * 1: The cause of the local audio error is unclear. It is recommended to prompt the user to try rejoining the channel.
   */
  LocalAudioStreamReasonFailure = 1,
  /**
   * 2: No permission to start the local audio capture device. Prompt the user to enable the permission. Deprecated: This enumeration is deprecated. Use the onPermissionError callback with RecordAudio instead.
   */
  LocalAudioStreamReasonDeviceNoPermission = 2,
  /**
   * 3: The local audio capture device is already in use. Prompt the user to check whether the microphone is occupied by another app. Local audio capture will automatically resume about 5 seconds after the microphone becomes idle. You can also try rejoining the channel after the microphone is idle.
   */
  LocalAudioStreamReasonDeviceBusy = 3,
  /**
   * 4: Local audio capture failed.
   */
  LocalAudioStreamReasonRecordFailure = 4,
  /**
   * 5: Local audio encoding failed.
   */
  LocalAudioStreamReasonEncodeFailure = 5,
  /**
   * @ignore
   */
  LocalAudioStreamReasonNoRecordingDevice = 6,
  /**
   * @ignore
   */
  LocalAudioStreamReasonNoPlayoutDevice = 7,
  /**
   * 8: Local audio capture was interrupted by system phone call, voice assistant, or alarm. To resume local audio capture, ask the user to end the call, voice assistant, or alarm.
   */
  LocalAudioStreamReasonInterrupted = 8,
  /**
   * @ignore
   */
  LocalAudioStreamReasonRecordInvalidId = 9,
  /**
   * @ignore
   */
  LocalAudioStreamReasonPlayoutInvalidId = 10,
}

/**
 * Local video state.
 */
export enum LocalVideoStreamState {
  /**
   * 0: Default initial state of local video.
   */
  LocalVideoStreamStateStopped = 0,
  /**
   * 1: Local video capture device started successfully.
   */
  LocalVideoStreamStateCapturing = 1,
  /**
   * 2: First frame of local video encoded successfully.
   */
  LocalVideoStreamStateEncoding = 2,
  /**
   * 3: Failed to start local video.
   */
  LocalVideoStreamStateFailed = 3,
}

/**
 * Local video event types.
 *
 * Since Available since v4.6.1.
 */
export enum LocalVideoEventType {
  /**
   * (1): The screen capture window is hidden. (Android only)
   */
  LocalVideoEventTypeScreenCaptureWindowHidden = 1,
  /**
   * (2): The screen capture window recovers from being hidden. (Android only)
   */
  LocalVideoEventTypeScreenCaptureWindowRecoverFromHidden = 2,
  /**
   * (3): The screen capture is stopped by the user. (Android only)
   */
  LocalVideoEventTypeScreenCaptureStoppedByUser = 3,
  /**
   * (4): A system internal error occurs during screen capture. (Android only)
   */
  LocalVideoEventTypeScreenCaptureSystemInternalError = 4,
}

/**
 * Reason for local video state change.
 */
export enum LocalVideoStreamReason {
  /**
   * 0: Local video is in a normal state.
   */
  LocalVideoStreamReasonOk = 0,
  /**
   * 1: Unknown error.
   */
  LocalVideoStreamReasonFailure = 1,
  /**
   * 2: No permission to start the local video capture device. Prompt the user to enable device permissions before rejoining the channel. Deprecated: This enumeration is deprecated. Use onPermissionError callback with Camera instead.
   */
  LocalVideoStreamReasonDeviceNoPermission = 2,
  /**
   * 3: The local video capture device is in use. Prompt the user to check if the camera is occupied by another app or try rejoining the channel.
   */
  LocalVideoStreamReasonDeviceBusy = 3,
  /**
   * 4: Failed to capture local video. Prompt the user to check whether the video capture device is working properly, whether the camera is occupied by another app, or try rejoining the channel.
   */
  LocalVideoStreamReasonCaptureFailure = 4,
  /**
   * 5: Failed to encode local video.
   */
  LocalVideoStreamReasonCodecNotSupport = 5,
  /**
   * 6: (iOS only) The app is in the background. Prompt the user that video capture is not available when the app is in the background.
   */
  LocalVideoStreamReasonCaptureInbackground = 6,
  /**
   * 7: (iOS only) The app is in slide-over, split-view, or picture-in-picture mode and another app is using the camera. Prompt the user that video capture is not available under these conditions.
   */
  LocalVideoStreamReasonCaptureMultipleForegroundApps = 7,
  /**
   * 8: No local video capture device found. Check if the camera is properly connected and functioning, or try rejoining the channel.
   */
  LocalVideoStreamReasonDeviceNotFound = 8,
  /**
   * @ignore
   */
  LocalVideoStreamReasonDeviceDisconnected = 9,
  /**
   * @ignore
   */
  LocalVideoStreamReasonDeviceInvalidId = 10,
  /**
   * 14: (Android only) Video capture is interrupted. Possible reasons:
   *  The camera is occupied by another app. Prompt the user to check if the camera is occupied.
   *  The app has been switched to the background. You can use a foreground service notification to inform the OS to continue capturing video in the background. See [Why does audio/video capture fail after screen lock or backgrounding on some Android versions?](https://doc.shengwang.cn/faq/quality-issues/android-background).
   */
  LocalVideoStreamReasonDeviceInterrupt = 14,
  /**
   * 15: (Android only) Video capture device error. Prompt the user to turn the camera off and on again to restore functionality. If that doesn't work, check for hardware failure.
   */
  LocalVideoStreamReasonDeviceFatalError = 15,
  /**
   * @ignore
   */
  LocalVideoStreamReasonDeviceSystemPressure = 101,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowMinimized = 11,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowClosed = 12,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowOccluded = 13,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowNotSupported = 20,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureFailure = 21,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureNoPermission = 22,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureAutoFallback = 24,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowHidden = 25,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowRecoverFromHidden = 26,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureWindowRecoverFromMinimized = 27,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCapturePaused = 28,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureResumed = 29,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureDisplayDisconnected = 30,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureStoppedByUser = 31,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureInterruptedByOther = 32,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureStoppedByCall = 33,
  /**
   * @ignore
   */
  LocalVideoStreamReasonScreenCaptureExcludeWindowFailed = 34,
}

/**
 * Remote audio stream state.
 */
export enum RemoteAudioState {
  /**
   * 0: Default initial state of remote audio. This state is reported under RemoteAudioReasonLocalMuted, RemoteAudioReasonRemoteMuted, or RemoteAudioReasonRemoteOffline.
   */
  RemoteAudioStateStopped = 0,
  /**
   * 1: Local user has received the first packet of remote audio.
   */
  RemoteAudioStateStarting = 1,
  /**
   * 2: Remote audio stream is decoding and playing normally. This state is reported under RemoteAudioReasonNetworkRecovery, RemoteAudioReasonLocalUnmuted, or RemoteAudioReasonRemoteUnmuted.
   */
  RemoteAudioStateDecoding = 2,
  /**
   * 3: Remote audio stream is frozen. This state is reported under RemoteAudioReasonNetworkCongestion.
   */
  RemoteAudioStateFrozen = 3,
  /**
   * 4: Failed to play remote audio stream. This state is reported under RemoteAudioReasonInternal.
   */
  RemoteAudioStateFailed = 4,
}

/**
 * Reasons for remote audio stream state changes.
 */
export enum RemoteAudioStateReason {
  /**
   * 0: Reports this reason when the audio state changes.
   */
  RemoteAudioReasonInternal = 0,
  /**
   * 1: Network congestion.
   */
  RemoteAudioReasonNetworkCongestion = 1,
  /**
   * 2: Network recovered.
   */
  RemoteAudioReasonNetworkRecovery = 2,
  /**
   * 3: Local user stopped receiving remote audio stream or disabled the audio module.
   */
  RemoteAudioReasonLocalMuted = 3,
  /**
   * 4: Local user resumed receiving remote audio stream or enabled the audio module.
   */
  RemoteAudioReasonLocalUnmuted = 4,
  /**
   * 5: Remote user stopped sending audio stream or disabled the audio module.
   */
  RemoteAudioReasonRemoteMuted = 5,
  /**
   * 6: Remote user resumed sending audio stream or enabled the audio module.
   */
  RemoteAudioReasonRemoteUnmuted = 6,
  /**
   * 7: Remote user left the channel.
   */
  RemoteAudioReasonRemoteOffline = 7,
  /**
   * @ignore
   */
  RemoteAudioReasonNoPacketReceive = 8,
  /**
   * @ignore
   */
  RemoteAudioReasonLocalPlayFailed = 9,
}

/**
 * Remote video stream state.
 */
export enum RemoteVideoState {
  /**
   * 0: The default initial state of the remote video. This state is reported under RemoteVideoStateReasonLocalMuted, RemoteVideoStateReasonRemoteMuted, or RemoteVideoStateReasonRemoteOffline.
   */
  RemoteVideoStateStopped = 0,
  /**
   * 1: The local user has received the first packet of the remote video.
   */
  RemoteVideoStateStarting = 1,
  /**
   * 2: The remote video stream is being decoded and playing normally. This state is reported under RemoteVideoStateReasonNetworkRecovery, RemoteVideoStateReasonLocalUnmuted, or RemoteVideoStateReasonRemoteUnmuted.
   */
  RemoteVideoStateDecoding = 2,
  /**
   * 3: The remote video stream is frozen. This state is reported under RemoteVideoStateReasonNetworkCongestion.
   */
  RemoteVideoStateFrozen = 3,
  /**
   * 4: Failed to play the remote video stream. This state is reported under RemoteVideoStateReasonInternal.
   */
  RemoteVideoStateFailed = 4,
}

/**
 * Reasons for remote video stream state changes.
 */
export enum RemoteVideoStateReason {
  /**
   * 0: Reports this reason when the video state changes.
   */
  RemoteVideoStateReasonInternal = 0,
  /**
   * 1: Network congestion.
   */
  RemoteVideoStateReasonNetworkCongestion = 1,
  /**
   * 2: Network recovered.
   */
  RemoteVideoStateReasonNetworkRecovery = 2,
  /**
   * 3: Local user stopped receiving remote video stream or disabled the video module.
   */
  RemoteVideoStateReasonLocalMuted = 3,
  /**
   * 4: Local user resumed receiving remote video stream or enabled the video module.
   */
  RemoteVideoStateReasonLocalUnmuted = 4,
  /**
   * 5: Remote user stopped sending video stream or disabled the video module.
   */
  RemoteVideoStateReasonRemoteMuted = 5,
  /**
   * 6: Remote user resumed sending video stream or enabled the video module.
   */
  RemoteVideoStateReasonRemoteUnmuted = 6,
  /**
   * 7: Remote user left the channel.
   */
  RemoteVideoStateReasonRemoteOffline = 7,
  /**
   * 8: Under poor network conditions, remote audio/video stream falls back to audio only.
   */
  RemoteVideoStateReasonAudioFallback = 8,
  /**
   * 9: When the network improves, remote audio stream recovers to audio/video stream.
   */
  RemoteVideoStateReasonAudioFallbackRecovery = 9,
  /**
   * @ignore
   */
  RemoteVideoStateReasonVideoStreamTypeChangeToLow = 10,
  /**
   * @ignore
   */
  RemoteVideoStateReasonVideoStreamTypeChangeToHigh = 11,
  /**
   * 12: (iOS only) The remote user's app has switched to the background.
   */
  RemoteVideoStateReasonSdkInBackground = 12,
  /**
   * 13: The local video decoder does not support decoding the received remote video stream.
   */
  RemoteVideoStateReasonCodecNotSupport = 13,
}

/**
 * @ignore
 */
export enum RemoteUserState {
  /**
   * @ignore
   */
  UserStateMuteAudio = 1 << 0,
  /**
   * @ignore
   */
  UserStateMuteVideo = 1 << 1,
  /**
   * @ignore
   */
  UserStateEnableVideo = 1 << 4,
  /**
   * @ignore
   */
  UserStateEnableLocalVideo = 1 << 8,
}

/**
 * @ignore
 */
export class VideoTrackInfo {
  /**
   * @ignore
   */
  isLocal?: boolean;
  /**
   * @ignore
   */
  ownerUid?: number;
  /**
   * @ignore
   */
  trackId?: number;
  /**
   * @ignore
   */
  channelId?: string;
  /**
   * @ignore
   */
  codecType?: VideoCodecType;
  /**
   * @ignore
   */
  encodedFrameOnly?: boolean;
  /**
   * @ignore
   */
  sourceType?: VideoSourceType;
  /**
   * @ignore
   */
  observationPosition?: number;
}

/**
 * @ignore
 */
export enum RemoteVideoDownscaleLevel {
  /**
   * @ignore
   */
  RemoteVideoDownscaleLevelNone = 0,
  /**
   * @ignore
   */
  RemoteVideoDownscaleLevel1 = 1,
  /**
   * @ignore
   */
  RemoteVideoDownscaleLevel2 = 2,
  /**
   * @ignore
   */
  RemoteVideoDownscaleLevel3 = 3,
  /**
   * @ignore
   */
  RemoteVideoDownscaleLevel4 = 4,
}

/**
 * User volume information.
 */
export class AudioVolumeInfo {
  /**
   * User ID.
   *  In the local user callback, uid is 0.
   *  In the remote user callback, uid is the ID of the remote user (up to 3) with the highest instantaneous volume.
   */
  uid?: number;
  /**
   * User volume, range [0,255]. If the user mutes themselves (sets muteLocalAudioStream to true) but enables audio capture, the volume value indicates the volume of the locally captured signal.
   */
  volume?: number;
  /**
   * vad cannot report the voice status of remote users. For remote users, the value of vad is always 1.
   *  To use this parameter, set reportVad to true when calling enableAudioVolumeIndication. Local user's voice activity status.
   *  0: No voice detected locally.
   *  1: Voice detected locally.
   */
  vad?: number;
  /**
   * Local user's voice pitch (Hz). Value range: [0.0,4000.0]. voicePitch cannot report the pitch of remote users. For remote users, the value of voicePitch is always 0.0.
   */
  voicePitch?: number;
}

/**
 * Audio device information.
 *
 * (Android only)
 */
export class DeviceInfo {
  /**
   * Whether ultra-low-latency audio capture and playback is supported: true : Supported false : Not supported
   */
  isLowLatencyAudioSupported?: boolean;
}

/**
 * @ignore
 */
export class Packet {
  /**
   * @ignore
   */
  buffer?: Uint8Array;
  /**
   * @ignore
   */
  size?: number;
}

/**
 * Sample rate of audio output for streaming.
 */
export enum AudioSampleRateType {
  /**
   * 32000: 32 kHz
   */
  AudioSampleRate32000 = 32000,
  /**
   * 44100: 44.1 kHz
   */
  AudioSampleRate44100 = 44100,
  /**
   * 48000: (Default) 48 kHz
   */
  AudioSampleRate48000 = 48000,
}

/**
 * Codec type for transcoded output video stream.
 */
export enum VideoCodecTypeForStream {
  /**
   * 1: (Default) H.264.
   */
  VideoCodecH264ForStream = 1,
  /**
   * 2: H.265.
   */
  VideoCodecH265ForStream = 2,
}

/**
 * Codec profile for video in relay streaming output.
 */
export enum VideoCodecProfileType {
  /**
   * 66: Baseline profile, typically used in low-end or error-tolerant applications such as video calls, mobile videos, etc.
   */
  VideoCodecProfileBaseline = 66,
  /**
   * 77: Main profile, typically used in mainstream consumer electronics such as MP4, portable video players, PSP, iPad, etc.
   */
  VideoCodecProfileMain = 77,
  /**
   * 100: (Default) High profile, typically used in broadcasting, video disc storage, and HDTV.
   */
  VideoCodecProfileHigh = 100,
}

/**
 * Audio codec specification for stream publishing output. Defaults to LC-AAC.
 */
export enum AudioCodecProfileType {
  /**
   * 0: (Default) LC-AAC specification.
   */
  AudioCodecProfileLcAac = 0,
  /**
   * 1: HE-AAC specification.
   */
  AudioCodecProfileHeAac = 1,
  /**
   * 2: HE-AAC v2 specification.
   */
  AudioCodecProfileHeAacV2 = 2,
}

/**
 * Local audio statistics.
 */
export class LocalAudioStats {
  /**
   * Number of audio channels.
   */
  numChannels?: number;
  /**
   * Sampling rate of the sent local audio, in Hz.
   */
  sentSampleRate?: number;
  /**
   * Average bitrate of the sent local audio, in Kbps.
   */
  sentBitrate?: number;
  /**
   * Internal payload type.
   */
  internalCodec?: number;
  /**
   * Packet loss rate (%) from the local end to the Agora edge server before network resilience.
   */
  txPacketLossRate?: number;
  /**
   * Delay (ms) of the audio device module during audio playback or recording.
   */
  audioDeviceDelay?: number;
  /**
   * @ignore
   */
  audioPlayoutDelay?: number;
  /**
   * Ear monitoring delay (ms), i.e., the delay from microphone input to headphone output.
   */
  earMonitorDelay?: number;
  /**
   * Echo cancellation delay (ms), i.e., the delay estimated by the Acoustic Echo Cancellation (AEC) module between audio playback and the signal captured locally.
   */
  aecEstimatedDelay?: number;
}

/**
 * Stream publishing state.
 */
export enum RtmpStreamPublishState {
  /**
   * 0: Streaming has not started or has ended.
   */
  RtmpStreamPublishStateIdle = 0,
  /**
   * 1: Connecting to the streaming and CDN servers.
   */
  RtmpStreamPublishStateConnecting = 1,
  /**
   * 2: Streaming is ongoing. This state is returned after successful publishing.
   */
  RtmpStreamPublishStateRunning = 2,
  /**
   * 3: Recovering the stream. When the CDN encounters an issue or the stream is briefly interrupted, the SDK automatically attempts to recover the stream and returns this state.
   *  If recovery is successful, it transitions to RtmpStreamPublishStateRunning(2).
   *  If the server fails or recovery is unsuccessful within 60 seconds, it transitions to RtmpStreamPublishStateFailure(4). If 60 seconds is too long, you can also manually attempt to reconnect.
   */
  RtmpStreamPublishStateRecovering = 3,
  /**
   * 4: Streaming failed. After failure, you can troubleshoot using the returned error code.
   */
  RtmpStreamPublishStateFailure = 4,
  /**
   * 5: The SDK is disconnecting from the streaming and CDN servers. When you call stopRtmpStream to end the stream normally, the SDK reports the states RtmpStreamPublishStateDisconnecting and RtmpStreamPublishStateIdle in sequence.
   */
  RtmpStreamPublishStateDisconnecting = 5,
}

/**
 * Reason for stream publishing state change.
 */
export enum RtmpStreamPublishReason {
  /**
   * 0: Stream published successfully.
   */
  RtmpStreamPublishReasonOk = 0,
  /**
   * 1: Invalid parameter. Please check whether the input parameters are correct.
   */
  RtmpStreamPublishReasonInvalidArgument = 1,
  /**
   * 2: The stream is encrypted and cannot be published.
   */
  RtmpStreamPublishReasonEncryptedStreamNotAllowed = 2,
  /**
   * 3: Stream publishing timed out.
   */
  RtmpStreamPublishReasonConnectionTimeout = 3,
  /**
   * 4: An error occurred on the streaming server.
   */
  RtmpStreamPublishReasonInternalServerError = 4,
  /**
   * 5: An error occurred on the CDN server.
   */
  RtmpStreamPublishReasonRtmpServerError = 5,
  /**
   * 6: Stream publishing requests are too frequent.
   */
  RtmpStreamPublishReasonTooOften = 6,
  /**
   * 7: The number of stream URLs for a single host has reached the limit of 10. Please delete some unused stream URLs before adding new ones.
   */
  RtmpStreamPublishReasonReachLimit = 7,
  /**
   * 8: The host is operating on a stream that does not belong to them, such as updating or stopping another host's stream. Please check your app logic.
   */
  RtmpStreamPublishReasonNotAuthorized = 8,
  /**
   * 9: The server did not find the stream.
   */
  RtmpStreamPublishReasonStreamNotFound = 9,
  /**
   * 10: The stream URL format is incorrect. Please verify the format of the stream URL.
   */
  RtmpStreamPublishReasonFormatNotSupported = 10,
  /**
   * 11: The user is not a broadcaster and cannot use the streaming feature. Please check your application logic.
   */
  RtmpStreamPublishReasonNotBroadcaster = 11,
  /**
   * 13: Called updateRtmpTranscoding to update transcoding properties without enabling transcoding. Please check your application logic.
   */
  RtmpStreamPublishReasonTranscodingNoMixStream = 13,
  /**
   * 14: The host's network encountered an error.
   */
  RtmpStreamPublishReasonNetDown = 14,
  /**
   * @ignore
   */
  RtmpStreamPublishReasonInvalidAppid = 15,
  /**
   * 16: Your project does not have permission to use the streaming service.
   */
  RtmpStreamPublishReasonInvalidPrivilege = 16,
  /**
   * @ignore
   */
  RtmpStreamUnpublishReasonOk = 100,
}

/**
 * Events that occur during CDN live streaming.
 */
export enum RtmpStreamingEvent {
  /**
   * 1: Failed to add background image or watermark during CDN live streaming.
   */
  RtmpStreamingEventFailedLoadImage = 1,
  /**
   * 2: The stream URL is already in use. If you want to start a new stream, please use a new stream URL.
   */
  RtmpStreamingEventUrlAlreadyInUse = 2,
  /**
   * 3: Feature not supported.
   */
  RtmpStreamingEventAdvancedFeatureNotSupport = 3,
  /**
   * 4: Reserved parameter.
   */
  RtmpStreamingEventRequestTooOften = 4,
}

/**
 * Image properties.
 *
 * Used to set the watermark and background image properties for live video.
 */
export class RtcImage {
  /**
   * The HTTP/HTTPS URL of the image on the live video. The character length must not exceed 1024 bytes.
   */
  url?: string;
  /**
   * The x-coordinate (px) of the image on the video frame, using the top-left corner of the output video frame as the origin.
   */
  x?: number;
  /**
   * The y-coordinate (px) of the image on the video frame, using the top-left corner of the output video frame as the origin.
   */
  y?: number;
  /**
   * The width (px) of the image on the video frame.
   */
  width?: number;
  /**
   * The height (px) of the image on the video frame.
   */
  height?: number;
  /**
   * The z-order of the watermark or background image. When adding one or more watermarks using an array, you must assign a value to zOrder, with a valid range of [1,255], otherwise the SDK will report an error. In other cases, zOrder is optional, with a valid range of [0,255], where 0 is the default. 0 indicates the bottom layer, and 255 indicates the top layer.
   */
  zOrder?: number;
  /**
   * The transparency of the watermark or background image. Valid range is [0.0, 1.0]:
   *  0.0: Fully transparent.
   *  1.0: (Default) Fully opaque.
   */
  alpha?: number;
}

/**
 * Advanced feature configuration for live transcoding.
 *
 * To use advanced features for live transcoding, please [contact sales](https://www.shengwang.cn/contact-sales/).
 */
export class LiveStreamAdvancedFeature {
  /**
   * Name of the advanced feature for live transcoding, including LBHQ (low-bitrate high-quality video) and VEO (optimized video encoder).
   */
  featureName?: string;
  /**
   * Whether to enable the advanced feature for live transcoding: true : Enable the advanced feature for live transcoding. false : (default) Disable the advanced feature for live transcoding.
   */
  opened?: boolean;
}

/**
 * Network connection state.
 */
export enum ConnectionStateType {
  /**
   * 1: Network connection is disconnected. This state indicates that the SDK is in:
   *  The initialization phase before calling joinChannel to join a channel.
   *  Or the phase after calling leaveChannel to leave a channel.
   */
  ConnectionStateDisconnected = 1,
  /**
   * 2: Connecting to the network. This state indicates that the SDK is establishing a connection with the specified channel after calling joinChannel.
   *  If the channel is joined successfully, the app receives the onConnectionStateChanged callback, indicating the network state has changed to ConnectionStateConnected.
   *  After the connection is established, the SDK initializes media and triggers the onJoinChannelSuccess callback once everything is ready.
   */
  ConnectionStateConnecting = 2,
  /**
   * 3: Network is connected. This state indicates that the user has joined the channel and can publish or subscribe to media streams. If the connection is interrupted due to network disconnection or switching, the SDK automatically reconnects. The app receives the onConnectionStateChanged callback, indicating the network state has changed to ConnectionStateReconnecting.
   */
  ConnectionStateConnected = 3,
  /**
   * 4: Reconnecting to the network. This state indicates that the SDK had previously joined a channel but the connection was interrupted due to network issues. The SDK is now trying to reconnect to the channel.
   *  If the SDK cannot rejoin the channel within 10 seconds, onConnectionLost is triggered. The SDK remains in the ConnectionStateReconnecting state and continues trying to rejoin.
   *  If the SDK still cannot rejoin the channel within 20 minutes after disconnection, the app receives the onConnectionStateChanged callback, indicating that the network state has changed to ConnectionStateFailed, and the SDK stops trying to reconnect.
   */
  ConnectionStateReconnecting = 4,
  /**
   * 5: Network connection failed. This state indicates that the SDK has stopped trying to rejoin the channel and you need to call leaveChannel to leave the channel.
   *  If the user wants to rejoin the channel, they need to call joinChannel again.
   *  If the SDK is prohibited from joining the channel by the server using RESTful API, the app will receive onConnectionStateChanged.
   */
  ConnectionStateFailed = 5,
}

/**
 * Settings for each host participating in the transcoding mix.
 */
export class TranscodingUser {
  /**
   * User ID of the host.
   */
  uid?: number;
  /**
   * The x-coordinate (px) of the host's video in the output video, using the top-left corner of the output video as the origin. Value range: [0,width], where width is set in LiveTranscoding.
   */
  x?: number;
  /**
   * The y-coordinate (px) of the host's video in the output video, using the top-left corner of the output video as the origin. Value range: [0,height], where height is set in LiveTranscoding.
   */
  y?: number;
  /**
   * Width (px) of the host's video.
   */
  width?: number;
  /**
   * Height (px) of the host's video.
   */
  height?: number;
  /**
   * If the value is less than 0 or greater than 100, an ErrInvalidArgument error is returned.
   *  Setting zOrder to 0 is supported. The layer index of the host's video. Value range: [0,100].
   *  0: (Default) Video is at the bottom layer.
   *  100: Video is at the top layer.
   */
  zOrder?: number;
  /**
   * Transparency of the host's video. Value range: [0.0,1.0].
   *  0.0: Fully transparent.
   *  1.0: (Default) Fully opaque.
   */
  alpha?: number;
  /**
   * When the value is not 0, a special player is required. The audio channel occupied by the host's audio in the output audio. Default is 0. Value range: [0,5]: 0 : (Recommended) Default audio mixing setting, supports up to stereo, related to the host's upstream audio. 1 : Host audio in the FL channel of the output audio. If the host's upstream audio is multi-channel, the Agora server mixes it into mono first. 2 : Host audio in the FC channel of the output audio. If the host's upstream audio is multi-channel, the Agora server mixes it into mono first. 3 : Host audio in the FR channel of the output audio. If the host's upstream audio is multi-channel, the Agora server mixes it into mono first. 4 : Host audio in the BL channel of the output audio. If the host's upstream audio is multi-channel, the Agora server mixes it into mono first. 5 : Host audio in the BR channel of the output audio. If the host's upstream audio is multi-channel, the Agora server mixes it into mono first. 0xFF or values greater than 5 : The host's audio is muted and removed by the Agora server.
   */
  audioChannel?: number;
}

/**
 * Transcoding properties for CDN streaming.
 */
export class LiveTranscoding {
  /**
   * Total width of the video stream in pixels, default is 360.
   *  For video streams, the value range is [64,1920]. Values below 64 will be adjusted to 64, and values above 1920 will be adjusted to 1920 by the Agora server.
   *  For audio-only streams, set both width and height to 0.
   */
  width?: number;
  /**
   * Total height of the video stream in pixels, default is 640.
   *  For video streams, the value range is [64,1080]. Values below 64 will be adjusted to 64, and values above 1080 will be adjusted to 1080 by the Agora server.
   *  For audio-only streams, set both width and height to 0.
   */
  height?: number;
  /**
   * Video encoding bitrate in Kbps. You do not need to set this parameter. Keep the default value STANDARD_BITRATE, and the SDK will automatically match the optimal bitrate based on the video resolution and frame rate you set. For the relationship between resolution and frame rate, see [Video Profile](https://doc.shengwang.cn/doc/rtc/rn/basic-features/video-profile#%E8%A7%86%E9%A2%91%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83).
   */
  videoBitrate?: number;
  /**
   * Frame rate of the output video for CDN streaming. The range is (0,30], in fps. Default is 15 fps. The Agora server will adjust any value above 30 fps to 30 fps.
   */
  videoFramerate?: number;
  /**
   * Deprecated, not recommended. Low latency mode true : Low latency, no guarantee on video quality. false : (default) High latency, guaranteed video quality.
   */
  lowLatency?: boolean;
  /**
   * GOP (Group of Pictures) of the output video for CDN streaming, in frames. Default is 30.
   */
  videoGop?: number;
  /**
   * Codec profile of the output video for CDN streaming. Can be set to 66, 77, or 100. See VideoCodecProfileType. If you set this parameter to other values, the Agora server will adjust it to the default value.
   */
  videoCodecProfile?: VideoCodecProfileType;
  /**
   * Background color of the output video for CDN streaming, specified as a hexadecimal RGB integer without the # symbol, e.g., 0xFFB6C1 for light pink. Default is 0x000000 (black).
   */
  backgroundColor?: number;
  /**
   * Codec type of the output video for CDN streaming. See VideoCodecTypeForStream.
   */
  videoCodecType?: VideoCodecTypeForStream;
  /**
   * Number of users in the video mixing layout. Default is 0. Value range: [0,17].
   */
  userCount?: number;
  /**
   * Manages users participating in video mixing for CDN streaming. Supports up to 17 users simultaneously. See TranscodingUser.
   */
  transcodingUsers?: TranscodingUser[];
  /**
   * Reserved parameter: custom information sent to the CDN client, used to fill SEI frames in H264/H265 video. Length limit: 4096 bytes. For more about SEI, see [SEI Frame Issues](https://doc.shengwang.cn/faq/quality-issues/sei).
   */
  transcodingExtraInfo?: string;
  /**
   * Metadata sent to the CDN client. Deprecated, not recommended.
   */
  metadata?: string;
  /**
   * Watermark on the live video. The image format must be PNG. See RtcImage.
   * You can add one watermark or use an array to add multiple watermarks. This parameter works with watermarkCount.
   */
  watermark?: RtcImage[];
  /**
   * Number of watermarks on the live video. The total number of watermarks and background images must be between 0 and 10. This parameter works with watermark.
   */
  watermarkCount?: number;
  /**
   * Background image on the live video. The image format must be PNG. See RtcImage.
   * You can add one background image or use an array to add multiple background images. This parameter works with backgroundImageCount.
   */
  backgroundImage?: RtcImage[];
  /**
   * Number of background images on the live video. The total number of watermarks and background images must be between 0 and 10. This parameter works with backgroundImage.
   */
  backgroundImageCount?: number;
  /**
   * Audio sample rate (Hz) of the output media stream for CDN streaming. See AudioSampleRateType.
   */
  audioSampleRate?: AudioSampleRateType;
  /**
   * Bitrate of the output audio for CDN streaming, in Kbps. Default is 48, maximum is 128.
   */
  audioBitrate?: number;
  /**
   * Number of audio channels in the output audio for CDN streaming. Default is 1. Value range: integer from [1,5]. Recommended values are 1 or 2. Values 3, 4, and 5 require special player support:
   *  1: (default) Mono
   *  2: Stereo
   *  3: Three channels
   *  4: Four channels
   *  5: Five channels
   */
  audioChannels?: number;
  /**
   * Codec profile of the output audio for CDN streaming. See AudioCodecProfileType.
   */
  audioCodecProfile?: AudioCodecProfileType;
  /**
   * Advanced features for live transcoding. See LiveStreamAdvancedFeature.
   */
  advancedFeatures?: LiveStreamAdvancedFeature[];
  /**
   * Number of enabled advanced features. Default is 0.
   */
  advancedFeatureCount?: number;
}

/**
 * Video stream participating in local composition.
 */
export class TranscodingVideoStream {
  /**
   * Type of video source participating in local composition. See VideoSourceType.
   */
  sourceType?: VideoSourceType;
  /**
   * Remote user ID. Use this parameter only when the video source type is VideoSourceRemote.
   */
  remoteUserUid?: number;
  /**
   * Use this parameter only when the video source type is an image. Path to the local image. Example paths:
   *  Android: /storage/emulated/0/Pictures/image.png
   *  iOS: /var/mobile/Containers/Data/Application/<APP-UUID>/Documents/image.png
   */
  imageUrl?: string;
  /**
   * (Optional) Media player ID. Required when sourceType is set to VideoSourceMediaPlayer.
   */
  mediaPlayerId?: number;
  /**
   * Horizontal offset of the top-left corner of the video relative to the top-left corner (origin) of the composition canvas.
   */
  x?: number;
  /**
   * Vertical offset of the top-left corner of the video relative to the top-left corner (origin) of the composition canvas.
   */
  y?: number;
  /**
   * Width (px) of the video in the composition.
   */
  width?: number;
  /**
   * Height (px) of the video in the composition.
   */
  height?: number;
  /**
   * Layer index of the video in the composition. Value range: [0,100].
   *  0: (Default) Bottom layer.
   *  100: Top layer.
   */
  zOrder?: number;
  /**
   * Transparency of the video in the composition. Value range: [0.0,1.0]. 0.0 means fully transparent, 1.0 means fully opaque.
   */
  alpha?: number;
  /**
   * This parameter only takes effect for camera video sources. Whether to mirror the video in the composition: true : Mirror the video. false : (Default) Do not mirror the video.
   */
  mirror?: boolean;
}

/**
 * Local video mixing configuration.
 */
export class LocalTranscoderConfiguration {
  /**
   * Number of video streams to be mixed locally.
   */
  streamCount?: number;
  /**
   * Video streams to be mixed locally. See TranscodingVideoStream.
   */
  videoInputStreams?: TranscodingVideoStream[];
  /**
   * Encoding configuration for the mixed video after local mixing. See VideoEncoderConfiguration.
   */
  videoOutputConfiguration?: VideoEncoderConfiguration;
  /**
   * @ignore
   */
  syncWithPrimaryCamera?: boolean;
}

/**
 * Local video composition error codes.
 */
export enum VideoTranscoderError {
  /**
   * 1: The specified video source has not started video capture. You need to create a video track and start video capture for it.
   */
  VtErrVideoSourceNotReady = 1,
  /**
   * 2: Invalid video source type. You need to re-specify a supported video source type.
   */
  VtErrInvalidVideoSourceType = 2,
  /**
   * 3: Invalid image path. You need to re-specify a correct image path.
   */
  VtErrInvalidImagePath = 3,
  /**
   * 4: Invalid image format. Make sure the image format is one of PNG, JPEG, or GIF.
   */
  VtErrUnsupportImageFormat = 4,
  /**
   * 5: Invalid video encoding resolution after composition.
   */
  VtErrInvalidLayout = 5,
  /**
   * 20: Unknown internal error.
   */
  VtErrInternal = 20,
}

/**
 * Audio source for local audio mixing.
 */
export class MixedAudioStream {
  /**
   * Type of the audio source. See AudioSourceType.
   */
  sourceType?: AudioSourceType;
  /**
   * Remote user ID. This parameter is required when the audio source type for local audio mixing is AudioSourceRemoteUser.
   */
  remoteUserUid?: number;
  /**
   * @ignore
   */
  channelId?: string;
  /**
   * Audio track ID. Set this to the custom audio track ID returned by the createCustomAudioTrack method. This parameter is required when the audio source type for local audio mixing is AudioSourceCustom.
   */
  trackId?: number;
}

/**
 * Local audio mixing configuration.
 */
export class LocalAudioMixerConfiguration {
  /**
   * Number of audio streams to be mixed locally.
   */
  streamCount?: number;
  /**
   * Audio sources to be mixed locally. See MixedAudioStream.
   */
  audioInputStreams?: MixedAudioStream[];
  /**
   * Whether the mixed audio stream uses the timestamp of audio frames captured by the local microphone: true : (Default) Uses the timestamp of audio frames captured by the local microphone. Set this value if you want all locally captured audio streams to stay synchronized. false : Does not use the timestamp of audio frames captured by the local microphone. The SDK uses the timestamp when the mixed audio frame is constructed.
   */
  syncWithLocalMic?: boolean;
}

/**
 * Last mile network probe configuration.
 */
export class LastmileProbeConfig {
  /**
   * Whether to probe the uplink network. Some users, such as audience members in a live broadcast channel, do not need network probing: true : Probe uplink network. false : Do not probe uplink network.
   */
  probeUplink?: boolean;
  /**
   * Whether to probe the downlink network: true : Probe downlink network. false : Do not probe downlink network.
   */
  probeDownlink?: boolean;
  /**
   * Expected maximum sending bitrate in bps, ranging from [100000,5000000]. It is recommended to refer to the bitrate value in setVideoEncoderConfiguration when setting this parameter.
   */
  expectedUplinkBitrate?: number;
  /**
   * Expected maximum receiving bitrate in bps, ranging from [100000,5000000].
   */
  expectedDownlinkBitrate?: number;
}

/**
 * Status of last mile quality probe result.
 */
export enum LastmileProbeResultState {
  /**
   * 1: Indicates the last mile quality probe result is complete.
   */
  LastmileProbeResultComplete = 1,
  /**
   * 2: Indicates the last mile quality probe did not perform bandwidth estimation, so the result is incomplete. One possible reason is limited testing resources.
   */
  LastmileProbeResultIncompleteNoBwe = 2,
  /**
   * 3: Last mile quality probe was not performed. One possible reason is network disconnection.
   */
  LastmileProbeResultUnavailable = 3,
}

/**
 * Last mile network quality probe result for uplink or downlink.
 */
export class LastmileProbeOneWayResult {
  /**
   * Packet loss rate.
   */
  packetLossRate?: number;
  /**
   * Network jitter (ms).
   */
  jitter?: number;
  /**
   * Estimated available network bandwidth (bps).
   */
  availableBandwidth?: number;
}

/**
 * Last mile network quality probe result for both uplink and downlink.
 */
export class LastmileProbeResult {
  /**
   * Status of the last mile probe result. See LastmileProbeResultState.
   */
  state?: LastmileProbeResultState;
  /**
   * Uplink network quality report. See LastmileProbeOneWayResult.
   */
  uplinkReport?: LastmileProbeOneWayResult;
  /**
   * Downlink network quality report. See LastmileProbeOneWayResult.
   */
  downlinkReport?: LastmileProbeOneWayResult;
  /**
   * Round-trip time (ms).
   */
  rtt?: number;
}

/**
 * The reason for the change in network connection state.
 */
export enum ConnectionChangedReasonType {
  /**
   * 0: Connecting to the network.
   */
  ConnectionChangedConnecting = 0,
  /**
   * 1: Successfully joined the channel.
   */
  ConnectionChangedJoinSuccess = 1,
  /**
   * 2: Network connection interrupted.
   */
  ConnectionChangedInterrupted = 2,
  /**
   * 3: Network connection is banned by the server. For example, this status is returned when the user is kicked out of the channel.
   */
  ConnectionChangedBannedByServer = 3,
  /**
   * 4: Failed to join the channel. If the SDK fails to join the channel after trying for 20 minutes, this status is returned and the SDK stops trying to reconnect. Prompt the user to switch networks and try joining the channel again.
   */
  ConnectionChangedJoinFailed = 4,
  /**
   * 5: Left the channel.
   */
  ConnectionChangedLeaveChannel = 5,
  /**
   * 6: Invalid App ID. Use a valid App ID to rejoin the channel and ensure the App ID matches the one generated in the Agora Console.
   */
  ConnectionChangedInvalidAppId = 6,
  /**
   * 7: Invalid channel name. Use a valid channel name to rejoin the channel. A valid channel name is a string within 64 bytes. The supported character set includes 89 characters:
   */
  ConnectionChangedInvalidChannelName = 7,
  /**
   * 8: Invalid Token. Possible reasons:
   *  Your project has App Certificate enabled, but you joined the channel without using a Token.
   *  The user ID specified in joinChannel does not match the one used to generate the Token.
   *  The generated Token does not match the one used to join the channel. Ensure that:
   *  When App Certificate is enabled, use a Token to join the channel.
   *  The user ID used to generate the Token matches the one used to join the channel.
   *  The generated Token matches the one used to join the channel.
   */
  ConnectionChangedInvalidToken = 8,
  /**
   * 9: The current Token has expired. Generate a new Token on your server and use it to rejoin the channel.
   */
  ConnectionChangedTokenExpired = 9,
  /**
   * 10: This user is banned by the server. Possible reasons:
   *  The user has already joined the channel and calls the join channel API again, such as joinChannel, which returns this status. Stop calling this method.
   *  The user tries to join a channel during a call test. Wait until the call test ends before joining the channel.
   */
  ConnectionChangedRejectedByServer = 10,
  /**
   * 11: SDK attempts to reconnect due to proxy server settings.
   */
  ConnectionChangedSettingProxyServer = 11,
  /**
   * 12: Network connection state changed due to Token renewal.
   */
  ConnectionChangedRenewToken = 12,
  /**
   * 13: Client IP address changed. If this status code is received multiple times, prompt the user to switch networks and try rejoining the channel.
   */
  ConnectionChangedClientIpAddressChanged = 13,
  /**
   * 14: Connection keep-alive timeout between SDK and server, entering auto-reconnect state.
   */
  ConnectionChangedKeepAliveTimeout = 14,
  /**
   * 15: Successfully rejoined the channel.
   */
  ConnectionChangedRejoinSuccess = 15,
  /**
   * 16: SDK lost connection with the server.
   */
  ConnectionChangedLost = 16,
  /**
   * 17: Connection state changed due to echo test.
   */
  ConnectionChangedEchoTest = 17,
  /**
   * 18: Local IP address changed by the user.
   */
  ConnectionChangedClientIpAddressChangedByUser = 18,
  /**
   * 19: The same UID joined the same channel from different devices.
   */
  ConnectionChangedSameUidLogin = 19,
  /**
   * 20: The number of broadcasters in the channel has reached the limit.
   */
  ConnectionChangedTooManyBroadcasters = 20,
  /**
   * @ignore
   */
  ConnectionChangedLicenseValidationFailure = 21,
  /**
   * @ignore
   */
  ConnectionChangedCertificationVeryfyFailure = 22,
  /**
   * @ignore
   */
  ConnectionChangedStreamChannelNotAvailable = 23,
  /**
   * @ignore
   */
  ConnectionChangedInconsistentAppid = 24,
}

/**
 * Reasons for client role change failure.
 */
export enum ClientRoleChangeFailedReason {
  /**
   * 1: The number of broadcasters in the channel has reached the limit. This enum is reported only when the 128-user feature is enabled. The limit depends on the actual configuration when enabling the 128-user feature.
   */
  ClientRoleChangeFailedTooManyBroadcasters = 1,
  /**
   * 2: The request is rejected by the server. Prompt the user to retry changing the role.
   */
  ClientRoleChangeFailedNotAuthorized = 2,
  /**
   * 3: Request timed out. Prompt the user to check the network connection and retry. Deprecated: This enum value is deprecated since v4.4.0 and not recommended for use.
   */
  ClientRoleChangeFailedRequestTimeOut = 3,
  /**
   * 4: Network connection failed. You can troubleshoot the cause based on the reason reported in onConnectionStateChanged. Deprecated: This enum value is deprecated since v4.4.0 and not recommended for use.
   */
  ClientRoleChangeFailedConnectionFailed = 4,
}

/**
 * Network connection type.
 */
export enum NetworkType {
  /**
   * -1: Unknown network connection type.
   */
  NetworkTypeUnknown = -1,
  /**
   * 0: Network connection is disconnected.
   */
  NetworkTypeDisconnected = 0,
  /**
   * 1: LAN network type.
   */
  NetworkTypeLan = 1,
  /**
   * 2: Wi-Fi network type (including hotspot).
   */
  NetworkTypeWifi = 2,
  /**
   * 3: 2G mobile network type.
   */
  NetworkTypeMobile2g = 3,
  /**
   * 4: 3G mobile network type.
   */
  NetworkTypeMobile3g = 4,
  /**
   * 5: 4G mobile network type.
   */
  NetworkTypeMobile4g = 5,
  /**
   * 6: 5G mobile network type.
   */
  NetworkTypeMobile5g = 6,
}

/**
 * View setup mode.
 */
export enum VideoViewSetupMode {
  /**
   * 0: (Default) Clears all added views and replaces them with a new view.
   */
  VideoViewSetupReplace = 0,
  /**
   * 1: Adds a view.
   */
  VideoViewSetupAdd = 1,
  /**
   * 2: Removes a view. When you no longer need a view, it is recommended to set setupMode to VideoViewSetupRemove to remove the view in time, otherwise it may cause rendering resource leaks.
   */
  VideoViewSetupRemove = 2,
}

/**
 * Properties of the video canvas object.
 */
export class VideoCanvas {
  /**
   * For Android and iOS platforms, when the video source is a transcoded video stream (VideoSourceTranscoded), this parameter indicates the user ID of the publisher of the transcoded video stream. The local user's uid defaults to 0. If you want to use a custom uid to render the local view, you also need to pass sourceType.
   */
  uid?: number;
  /**
   * User ID of the publisher of a sub-video stream in the transcoded video.
   */
  subviewUid?: number;
  /**
   * Video display window. In a single VideoCanvas, only one of view or surfaceTexture can be set. If both are set, only the view setting takes effect.
   */
  view?: any;
  /**
   * Background color of the video canvas in RGBA format. Default is 0x00000000, which represents black.
   */
  backgroundColor?: number;
  /**
   * Video render mode. See RenderModeType.
   */
  renderMode?: RenderModeType;
  /**
   * View mirror mode. See VideoMirrorModeType.
   *  Local view mirror mode: If you use the front camera, local view mirror mode is enabled by default; if you use the rear camera, it is disabled by default.
   *  Remote user view mirror mode: Disabled by default.
   */
  mirrorMode?: VideoMirrorModeType;
  /**
   * View setup mode. See VideoViewSetupMode.
   */
  setupMode?: VideoViewSetupMode;
  /**
   * Type of video source. See VideoSourceType.
   */
  sourceType?: VideoSourceType;
  /**
   * Media player ID. Obtainable via getMediaPlayerId.
   */
  mediaPlayerId?: number;
  /**
   * (Optional) Display area of the video frame. See Rectangle. width and height indicate the pixel width and height of the video in this area. Default is empty (width or height is 0), meaning the video frame is displayed at its actual resolution.
   */
  cropArea?: Rectangle;
  /**
   * @ignore
   */
  enableAlphaMask?: boolean;
  /**
   * Position of the video frame in the video pipeline. See VideoModulePosition.
   */
  position?: VideoModulePosition;
}

/**
 * Brightness contrast level.
 */
export enum LighteningContrastLevel {
  /**
   * 0: Low contrast.
   */
  LighteningContrastLow = 0,
  /**
   * 1: Normal contrast.
   */
  LighteningContrastNormal = 1,
  /**
   * 2: High contrast.
   */
  LighteningContrastHigh = 2,
}

/**
 * Beauty options.
 */
export class BeautyOptions {
  /**
   * Contrast level, usually used together with lighteningLevel. The higher the value, the greater the contrast between light and dark. See LighteningContrastLevel.
   */
  lighteningContrastLevel?: LighteningContrastLevel;
  /**
   * Whitening level, value range [0.0,1.0], where 0.0 indicates original brightness. Default is 0.0. The higher the value, the greater the whitening effect.
   */
  lighteningLevel?: number;
  /**
   * Smoothing level, value range [0.0,1.0], where 0.0 indicates original smoothness. Default is 0.0. The higher the value, the greater the smoothing effect.
   */
  smoothnessLevel?: number;
  /**
   * Redness level, value range [0.0,1.0], where 0.0 indicates original redness. Default is 0.0. The higher the value, the greater the redness effect.
   */
  rednessLevel?: number;
  /**
   * Sharpness level, value range [0.0,1.0], where 0.0 indicates original sharpness. Default is 0.0. The higher the value, the greater the sharpness effect.
   */
  sharpnessLevel?: number;
}

/**
 * Selects the specific facial area to be adjusted.
 *
 * Since Available since v4.4.0.
 */
export enum FaceShapeArea {
  /**
   * (-1): Default value, indicates an invalid area, the facial shaping effect is not applied.
   */
  FaceShapeAreaNone = -1,
  /**
   * (100): Head area, used to achieve a smaller head effect. Value range: [0, 100], default is 50. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaHeadscale = 100,
  /**
   * (101): Forehead area, used to adjust the hairline height. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaForehead = 101,
  /**
   * (102): Face contour area, used to achieve a slimming face effect. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaFacecontour = 102,
  /**
   * (103): Face length area, used to elongate the face. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaFacelength = 103,
  /**
   * (104): Face width area, used to achieve a narrower face effect. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaFacewidth = 104,
  /**
   * (105): Cheekbone area, used to adjust the width of the cheekbones. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaCheekbone = 105,
  /**
   * (106): Cheek area, used to adjust the width of the cheeks. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaCheek = 106,
  /**
   * (107): Mandible area, used to adjust the width of the jawbone. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaMandible = 107,
  /**
   * (108): Chin area, used to adjust the length of the chin. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaChin = 108,
  /**
   * (200): Eye area, used to achieve a bigger eye effect. Value range: [0, 100], default is 50. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaEyescale = 200,
  /**
   * (201): Eye distance area, used to adjust the distance between the eyes. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaEyedistance = 201,
  /**
   * (202): Eye position area, used to adjust the overall position of the eyes. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaEyeposition = 202,
  /**
   * (203): Lower eyelid area, used to adjust the shape of the lower eyelid. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaLowereyelid = 203,
  /**
   * (204): Pupil area, used to adjust the size of the pupils. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaEyepupils = 204,
  /**
   * (205): Inner eye corner area, used to adjust the shape of the inner eye corners. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaEyeinnercorner = 205,
  /**
   * (206): Outer eye corner area, used to adjust the shape of the outer eye corners. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaEyeoutercorner = 206,
  /**
   * (300): Nose length area, used to elongate the nose. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaNoselength = 300,
  /**
   * (301): Nose width area, used to achieve a slimmer nose effect. Value range: [0, 100], default is 0. The higher the value, the more noticeable the slimming effect.
   */
  FaceShapeAreaNosewidth = 301,
  /**
   * (302): Nose wing area, used to adjust the width of the nose wings. Value range: [0, 100], default is 10. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaNosewing = 302,
  /**
   * (303): Nose root area, used to adjust the height of the nose root. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaNoseroot = 303,
  /**
   * (304): Nose bridge area, used to adjust the height of the nose bridge. Value range: [0, 100], default is 50. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaNosebridge = 304,
  /**
   * (305): Nose tip area, used to adjust the shape of the nose tip. Value range: [0, 100], default is 50. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaNosetip = 305,
  /**
   * (306): Overall nose area, used to uniformly adjust the shape of the nose. Value range: [-100, 100], default is 50. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaNosegeneral = 306,
  /**
   * (400): Mouth area, used to achieve a larger mouth effect. Value range: [-100, 100], default is 20. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaMouthscale = 400,
  /**
   * (401): Mouth position area, used to adjust the overall position of the mouth. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaMouthposition = 401,
  /**
   * (402): Mouth smile area, used to adjust the degree of mouth corner lift. Value range: [0, 1], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaMouthsmile = 402,
  /**
   * (403): Lip shape area, used to adjust the shape of the lips. Value range: [0, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaMouthlip = 403,
  /**
   * (500): Eyebrow position area, used to adjust the overall position of the eyebrows. Value range: [-100, 100], default is 0. The greater the absolute value, the more noticeable the adjustment. Negative values indicate the opposite direction.
   */
  FaceShapeAreaEyebrowposition = 500,
  /**
   * (501): Eyebrow thickness area, used to adjust the thickness of the eyebrows. Value range: [-100, 100], default is 0. The higher the value, the more noticeable the adjustment.
   */
  FaceShapeAreaEyebrowthickness = 501,
}

/**
 * Filter effect options.
 */
export class FaceShapeAreaOptions {
  /**
   * Facial area for beautification. See FaceShapeArea.
   */
  shapeArea?: FaceShapeArea;
  /**
   * Intensity of the effect. The definition of intensity (including direction, range, default value, etc.) varies by area. See FaceShapeArea.
   */
  shapeIntensity?: number;
}

/**
 * Face shaping makeup effect style options.
 *
 * Since Available since v4.4.0.
 */
export enum FaceShapeBeautyStyle {
  /**
   * (0): (Default) Female style makeup effect.
   */
  FaceShapeBeautyStyleFemale = 0,
  /**
   * (1): Male style makeup effect.
   */
  FaceShapeBeautyStyleMale = 1,
  /**
   * (2): Natural style makeup effect, makes minimal adjustments to facial features only.
   */
  FaceShapeBeautyStyleNatural = 2,
}

/**
 * Face shaping style options.
 */
export class FaceShapeBeautyOptions {
  /**
   * Face shaping style. See FaceShapeBeautyStyle.
   */
  shapeStyle?: FaceShapeBeautyStyle;
  /**
   * Intensity of the face shaping style, ranging from [0,100], with a default value of 0.0, meaning no face shaping effect. The higher the value, the more noticeable the changes to the modified areas.
   */
  styleIntensity?: number;
}

/**
 * Filter effect options.
 */
export class FilterEffectOptions {
  /**
   * Local absolute path to the 3D cube map file used to implement custom filter effects. The referenced .cube file must strictly follow the Cube LUT (Lookup Table) specification, otherwise the filter effect will not take effect. Example of a .cube file: LUT_3D_SIZE 32
   * 0.0039215689 0 0.0039215682
   * 0.0086021447 0.0037950677 0
   * ...
   * 0.0728652592 0.0039215689 0
   *  The LUT_3D_SIZE identifier in the first line of the cube map file indicates the size of the 3D lookup table. Currently, only LUT size 32 is supported.
   *  The SDK provides a built-in built_in_whiten_filter.cube file. Passing the absolute path of this file enables a whitening filter effect.
   */
  path?: string;
  /**
   * Strength of the filter effect, ranging from [0.0,1.0], where 0.0 means no filter effect. The default value is 0.5. The higher the value, the stronger the filter effect.
   */
  strength?: number;
}

/**
 * Low-light enhancement mode.
 */
export enum LowLightEnhanceMode {
  /**
   * 0: (Default) Auto mode. The SDK automatically enables or disables low-light enhancement based on ambient brightness to provide proper lighting and avoid overexposure.
   */
  LowLightEnhanceAuto = 0,
  /**
   * 1: Manual mode. You need to manually enable or disable low-light enhancement.
   */
  LowLightEnhanceManual = 1,
}

/**
 * Low-light enhancement level.
 */
export enum LowLightEnhanceLevel {
  /**
   * 0: (Default) High-quality low-light enhancement. Optimizes brightness, detail, and noise in the video image with moderate performance consumption and processing speed, offering the best overall image quality.
   */
  LowLightEnhanceLevelHighQuality = 0,
  /**
   * 1: Performance-first low-light enhancement. Optimizes brightness and detail with lower performance consumption and faster processing speed.
   */
  LowLightEnhanceLevelFast = 1,
}

/**
 * Low-light enhancement options.
 */
export class LowlightEnhanceOptions {
  /**
   * Mode of low-light enhancement. See LowLightEnhanceMode.
   */
  mode?: LowLightEnhanceMode;
  /**
   * Level of low-light enhancement. See LowLightEnhanceLevel.
   */
  level?: LowLightEnhanceLevel;
}

/**
 * Video denoising mode.
 */
export enum VideoDenoiserMode {
  /**
   * 0: (Default) Auto mode. The SDK automatically enables or disables video denoising based on ambient brightness.
   */
  VideoDenoiserAuto = 0,
  /**
   * 1: Manual mode. You need to manually enable or disable video denoising.
   */
  VideoDenoiserManual = 1,
}

/**
 * Video denoising level.
 */
export enum VideoDenoiserLevel {
  /**
   * 0: (Default) Denoising with priority on video quality. Balances performance consumption and denoising effect. Moderate performance usage, moderate speed, optimal overall quality.
   */
  VideoDenoiserLevelHighQuality = 0,
  /**
   * 1: Denoising with priority on performance. Focuses on saving performance over denoising effect. Low performance consumption, fast speed. To avoid noticeable ghosting, it is recommended to use this setting when the camera is stationary.
   */
  VideoDenoiserLevelFast = 1,
}

/**
 * Video denoising options.
 */
export class VideoDenoiserOptions {
  /**
   * Video denoising mode.
   */
  mode?: VideoDenoiserMode;
  /**
   * Video denoising level.
   */
  level?: VideoDenoiserLevel;
}

/**
 * Color enhancement options.
 */
export class ColorEnhanceOptions {
  /**
   * Color enhancement strength. Value range is [0.0,1.0]. 0.0 means no color enhancement is applied to the video. The larger the value, the stronger the enhancement. Default value is 0.5.
   */
  strengthLevel?: number;
  /**
   * Skin tone protection level. Value range is [0.0,1.0]. 0.0 means no skin tone protection. The larger the value, the stronger the protection. Default value is 1.0.
   *  When the color enhancement strength is high, facial skin tones may appear distorted. You need to set the skin tone protection level.
   *  Higher skin tone protection levels may slightly reduce the color enhancement effect. Therefore, to achieve the best color enhancement effect, it is recommended to dynamically adjust strengthLevel and skinProtectLevel for optimal results.
   */
  skinProtectLevel?: number;
}

/**
 * Custom background.
 */
export enum BackgroundSourceType {
  /**
   * @ignore
   */
  BackgroundNone = 0,
  /**
   * 1: (Default) Solid color background.
   */
  BackgroundColor = 1,
  /**
   * 2: Background image in PNG or JPG format.
   */
  BackgroundImg = 2,
  /**
   * 3: Blurred background.
   */
  BackgroundBlur = 3,
  /**
   * 4: Local video background in formats such as MP4, AVI, MKV, FLV.
   */
  BackgroundVideo = 4,
}

/**
 * Degree of background blur for custom background image.
 */
export enum BackgroundBlurDegree {
  /**
   * 1: Low blur level for custom background image. Users can almost clearly see the background.
   */
  BlurDegreeLow = 1,
  /**
   * 2: Medium blur level for custom background image. Users have difficulty seeing the background clearly.
   */
  BlurDegreeMedium = 2,
  /**
   * 3: (Default) High blur level for custom background image. Users can barely see the background.
   */
  BlurDegreeHigh = 3,
}

/**
 * Custom background.
 */
export class VirtualBackgroundSource {
  /**
   * Custom background. See BackgroundSourceType.
   */
  background_source_type?: BackgroundSourceType;
  /**
   * Color of the custom background image. Format is a hexadecimal integer in RGB without the # symbol, e.g., 0xFFB6C1 represents light pink. Default is 0xFFFFFF (white). Valid range is [0x000000, 0xffffff]. If the value is invalid, the SDK replaces the background with white. This parameter takes effect only when the custom background is one of the following types: BackgroundColor : The background is a solid color image of the specified color. BackgroundImg : If the image in source has a transparent background, the transparent area is filled with the specified color.
   */
  color?: number;
  /**
   * Absolute local path of the custom background. Supports PNG, JPG, MP4, AVI, MKV, and FLV formats. If the path is invalid, the SDK uses the original background or the solid color specified by color. This parameter takes effect only when the custom background type is BackgroundImg or BackgroundVideo.
   */
  source?: string;
  /**
   * Blur level of the custom background. See BackgroundBlurDegree. This parameter takes effect only when the custom background type is BackgroundBlur.
   */
  blur_degree?: BackgroundBlurDegree;
}

/**
 * Algorithm for background processing.
 */
export enum SegModelType {
  /**
   * 1: (Default) Background processing algorithm suitable for all scenarios.
   */
  SegModelAi = 1,
  /**
   * 2: Background processing algorithm (green screen only).
   */
  SegModelGreen = 2,
}

/**
 * Screen color type.
 */
export enum ScreenColorType {
  /**
   * (0): Automatically selects the screen color.
   */
  ScreenColorAuto = 0,
  /**
   * (1): Green screen color.
   */
  ScreenColorGreen = 1,
  /**
   * (2): Blue screen color.
   */
  ScreenColorBlue = 2,
}

/**
 * Background image processing properties.
 */
export class SegmentationProperty {
  /**
   * The algorithm used for background processing. See SegModelType.
   */
  modelType?: SegModelType;
  /**
   * The precision range for recognizing background colors in the image. Value range is [0,1], default is 0.5. A higher value indicates a wider range of recognizable solid colors. If the value is too high, edges of the portrait and solid colors within the portrait may also be recognized. It is recommended to adjust this value dynamically based on actual effects. This parameter takes effect only when modelType is set to SegModelGreen.
   */
  greenCapacity?: number;
  /**
   * Type of screen color. See ScreenColorType.
   */
  screenColorType?: ScreenColorType;
}

/**
 * Type of custom audio capture track.
 */
export enum AudioTrackType {
  /**
   * @ignore
   */
  AudioTrackInvalid = -1,
  /**
   * 0: Mixable audio track. Supports mixing with other audio streams (e.g., microphone audio) before local playback or publishing to the channel. Has higher latency compared to non-mixable audio tracks.
   */
  AudioTrackMixable = 0,
  /**
   * 1: Non-mixable audio track. Replaces microphone capture and does not support mixing with other audio streams. Has lower latency compared to mixable audio tracks. If you specify AudioTrackDirect, you must set publishMicrophoneTrack in ChannelMediaOptions to false when calling joinChannel, otherwise joining the channel will fail and return error code -2.
   */
  AudioTrackDirect = 1,
}

/**
 * Configuration options for custom audio tracks.
 */
export class AudioTrackConfig {
  /**
   * Whether to enable local audio playback: true : (Default) Enable local audio playback. false : Disable local audio playback.
   */
  enableLocalPlayback?: boolean;
  /**
   * This parameter only takes effect for custom audio capture tracks of type AudioTrackDirect. Whether to enable the audio processing module: true : Enable the audio processing module, which applies echo cancellation (AEC), noise suppression (ANS), and automatic gain control (AGC). false : (Default) Disable the audio processing module.
   */
  enableAudioProcessing?: boolean;
}

/**
 * Preset voice beautifier options.
 */
export enum VoiceBeautifierPreset {
  /**
   * Original voice, i.e., disables voice beautifier effects.
   */
  VoiceBeautifierOff = 0x00000000,
  /**
   * Magnetic (male). This setting is only effective for male voices. Do not use it for female voices, or audio distortion may occur.
   */
  ChatBeautifierMagnetic = 0x01010100,
  /**
   * Fresh (female). This setting is only effective for female voices. Do not use it for male voices, or audio distortion may occur.
   */
  ChatBeautifierFresh = 0x01010200,
  /**
   * Energetic (female). This setting is only effective for female voices. Do not use it for male voices, or audio distortion may occur.
   */
  ChatBeautifierVitality = 0x01010300,
  /**
   * Singing beautifier.
   *  If you call setVoiceBeautifierPreset (SingingBeautifier), you can beautify male voices and add a small room reverb effect. Do not use for female voices, or audio distortion may occur.
   *  If you call setVoiceBeautifierParameters (SingingBeautifier, param1, param2), you can beautify both male and female voices and add reverb effects.
   */
  SingingBeautifier = 0x01020100,
  /**
   * Vigorous.
   */
  TimbreTransformationVigorous = 0x01030100,
  /**
   * Deep.
   */
  TimbreTransformationDeep = 0x01030200,
  /**
   * Mellow.
   */
  TimbreTransformationMellow = 0x01030300,
  /**
   * Falsetto.
   */
  TimbreTransformationFalsetto = 0x01030400,
  /**
   * Full.
   */
  TimbreTransformationFull = 0x01030500,
  /**
   * Clear.
   */
  TimbreTransformationClear = 0x01030600,
  /**
   * Resounding.
   */
  TimbreTransformationResounding = 0x01030700,
  /**
   * Ringing.
   */
  TimbreTransformationRinging = 0x01030800,
  /**
   * Ultra-high quality voice, which makes the audio clearer and more detailed.
   *  For better results, it is recommended to set the profile parameter of setAudioProfile2 to AudioProfileMusicHighQuality (4) or AudioProfileMusicHighQualityStereo (5), and the scenario parameter to AudioScenarioGameStreaming (3), before calling setVoiceBeautifierPreset.
   *  If the user's audio capture device can highly restore audio details, it is recommended not to enable ultra-high quality voice, otherwise the SDK may over-restore audio details and fail to achieve the expected effect.
   */
  UltraHighQualityVoice = 0x01040100,
}

/**
 * Preset audio effects.
 *
 * setAudioProfile profile
 * Preset audio effects profile
 *  RoomAcousticsVirtualStereo
 *  RoomAcoustics3dVoice
 *  RoomAcousticsVirtualSurroundSound AudioProfileMusicHighQualityStereo or AudioProfileMusicStandardStereo Other preset effects (except AudioEffectOff) AudioProfileMusicHighQuality or AudioProfileMusicHighQualityStereo
 */
export enum AudioEffectPreset {
  /**
   * Original sound, i.e., disables voice effects.
   */
  AudioEffectOff = 0x00000000,
  /**
   * KTV.
   */
  RoomAcousticsKtv = 0x02010100,
  /**
   * Concert.
   */
  RoomAcousticsVocalConcert = 0x02010200,
  /**
   * Studio.
   */
  RoomAcousticsStudio = 0x02010300,
  /**
   * Phonograph.
   */
  RoomAcousticsPhonograph = 0x02010400,
  /**
   * Virtual stereo, where the SDK renders mono audio into stereo effect.
   */
  RoomAcousticsVirtualStereo = 0x02010500,
  /**
   * Spacious.
   */
  RoomAcousticsSpacial = 0x02010600,
  /**
   * Ethereal.
   */
  RoomAcousticsEthereal = 0x02010700,
  /**
   * 3D voice, where the SDK renders audio to surround the user. The default surround cycle is 10 seconds. After setting this effect, you can also call setAudioEffectParameters to modify the surround cycle. To hear the expected effect after enabling 3D voice, users need to use audio playback devices that support stereo.
   */
  RoomAcoustics3dVoice = 0x02010800,
  /**
   * Virtual surround sound, where the SDK simulates a surround sound field based on stereo to create a surround effect. To hear the expected effect after enabling virtual surround sound, users need to use audio playback devices that support stereo.
   */
  RoomAcousticsVirtualSurroundSound = 0x02010900,
  /**
   * Chorus. Agora recommends using this in chorus scenarios to enhance the spatial stereo effect of vocals.
   */
  RoomAcousticsChorus = 0x02010d00,
  /**
   * Uncle. Recommended for processing male voices; otherwise, the effect may not meet expectations.
   */
  VoiceChangerEffectUncle = 0x02020100,
  /**
   * Elderly male. Recommended for processing male voices; otherwise, the effect may not meet expectations.
   */
  VoiceChangerEffectOldman = 0x02020200,
  /**
   * Boy. Recommended for processing male voices; otherwise, the effect may not meet expectations.
   */
  VoiceChangerEffectBoy = 0x02020300,
  /**
   * Young woman. Recommended for processing female voices; otherwise, the effect may not meet expectations.
   */
  VoiceChangerEffectSister = 0x02020400,
  /**
   * Girl. Recommended for processing female voices; otherwise, the effect may not meet expectations.
   */
  VoiceChangerEffectGirl = 0x02020500,
  /**
   * Pigsy.
   */
  VoiceChangerEffectPigking = 0x02020600,
  /**
   * Hulk.
   */
  VoiceChangerEffectHulk = 0x02020700,
  /**
   * R&B.
   */
  StyleTransformationRnb = 0x02030100,
  /**
   * Pop.
   */
  StyleTransformationPopular = 0x02030200,
  /**
   * Electronic music, where the SDK corrects the actual pitch of the audio based on the natural major scale with C as the tonic. After setting this effect, you can also call setAudioEffectParameters to adjust the base scale and tonic pitch.
   */
  PitchCorrection = 0x02040100,
}

/**
 * Preset voice conversion options.
 */
export enum VoiceConversionPreset {
  /**
   * Original voice, i.e., disables voice conversion effects.
   */
  VoiceConversionOff = 0x00000000,
  /**
   * Neutral. To avoid audio distortion, make sure to apply this effect only to female voices.
   */
  VoiceChangerNeutral = 0x03010100,
  /**
   * Sweet. To avoid audio distortion, make sure to apply this effect only to female voices.
   */
  VoiceChangerSweet = 0x03010200,
  /**
   * Steady. To avoid audio distortion, make sure to apply this effect only to male voices.
   */
  VoiceChangerSolid = 0x03010300,
  /**
   * Deep. To avoid audio distortion, make sure to apply this effect only to male voices.
   */
  VoiceChangerBass = 0x03010400,
  /**
   * @ignore
   */
  VoiceChangerCartoon = 0x03010500,
  /**
   * @ignore
   */
  VoiceChangerChildlike = 0x03010600,
  /**
   * @ignore
   */
  VoiceChangerPhoneOperator = 0x03010700,
  /**
   * @ignore
   */
  VoiceChangerMonster = 0x03010800,
  /**
   * @ignore
   */
  VoiceChangerTransformers = 0x03010900,
  /**
   * @ignore
   */
  VoiceChangerGroot = 0x03010a00,
  /**
   * @ignore
   */
  VoiceChangerDarthVader = 0x03010b00,
  /**
   * @ignore
   */
  VoiceChangerIronLady = 0x03010c00,
  /**
   * @ignore
   */
  VoiceChangerShinChan = 0x03010d00,
  /**
   * @ignore
   */
  VoiceChangerGirlishMan = 0x03010e00,
  /**
   * @ignore
   */
  VoiceChangerChipmunk = 0x03010f00,
}

/**
 * Preset headphone equalizer types.
 */
export enum HeadphoneEqualizerPreset {
  /**
   * Disable headphone equalizer and listen to the original audio.
   */
  HeadphoneEqualizerOff = 0x00000000,
  /**
   * Use the equalizer for over-ear headphones.
   */
  HeadphoneEqualizerOverear = 0x04000001,
  /**
   * Use the equalizer for in-ear headphones.
   */
  HeadphoneEqualizerInear = 0x04000002,
}

/**
 * AI tuner voice effect types.
 */
export enum VoiceAiTunerType {
  /**
   * 0: Mature male voice. A deep and magnetic male voice.
   */
  VoiceAiTunerMatureMale = 0,
  /**
   * 1: Fresh male voice. A fresh and slightly sweet male voice.
   */
  VoiceAiTunerFreshMale = 1,
  /**
   * 2: Mature female voice. A deep and charming female voice.
   */
  VoiceAiTunerElegantFemale = 2,
  /**
   * 3: Cute female voice. A high-pitched and adorable female voice.
   */
  VoiceAiTunerSweetFemale = 3,
  /**
   * 4: Warm male singing voice. A warm and melodious male voice.
   */
  VoiceAiTunerWarmMaleSinging = 4,
  /**
   * 5: Gentle female singing voice. A soft and delicate female voice.
   */
  VoiceAiTunerGentleFemaleSinging = 5,
  /**
   * 6: Husky mature male singing voice. A unique hoarse male voice.
   */
  VoiceAiTunerHuskyMaleSinging = 6,
  /**
   * 7: Warm mature female singing voice. A warm and mature female voice.
   */
  VoiceAiTunerWarmElegantFemaleSinging = 7,
  /**
   * 8: Powerful male singing voice. A strong and forceful male voice.
   */
  VoiceAiTunerPowerfulMaleSinging = 8,
  /**
   * 9: Dreamy female singing voice. A dreamy and soft female voice.
   */
  VoiceAiTunerDreamyFemaleSinging = 9,
}

/**
 * Audio configuration for the shared screen stream.
 *
 * (Android only) Applies only when captureAudio is set to true.
 */
export class ScreenAudioParameters {
  /**
   * Audio sample rate (Hz). Default is 16000.
   */
  sampleRate?: number;
  /**
   * Number of channels. Default is 2, indicating stereo.
   */
  channels?: number;
  /**
   * Captured system volume. Value range: [0, 100]. Default is 100.
   */
  captureSignalVolume?: number;
  /**
   * @ignore
   */
  excludeCurrentProcessAudio?: boolean;
}

/**
 * @ignore
 */
export class ScreenCaptureParameters {
  /**
   * @ignore
   */
  captureAudio?: boolean;
  /**
   * @ignore
   */
  audioParams?: ScreenAudioParameters;
  /**
   * @ignore
   */
  dimensions?: VideoDimensions;
  /**
   * @ignore
   */
  frameRate?: number;
  /**
   * @ignore
   */
  bitrate?: number;
  /**
   * @ignore
   */
  captureMouseCursor?: boolean;
  /**
   * @ignore
   */
  windowFocus?: boolean;
  /**
   * @ignore
   */
  excludeWindowList?: any[];
  /**
   * @ignore
   */
  excludeWindowCount?: number;
  /**
   * @ignore
   */
  highLightWidth?: number;
  /**
   * @ignore
   */
  highLightColor?: number;
  /**
   * @ignore
   */
  enableHighLight?: boolean;
}

/**
 * Recording quality.
 */
export enum AudioRecordingQualityType {
  /**
   * 0: Low quality. Sample rate is 32 kHz, file size for 10 minutes of recording is approximately 1.2 MB.
   */
  AudioRecordingQualityLow = 0,
  /**
   * 1: Medium quality. Sample rate is 32 kHz, file size for 10 minutes of recording is approximately 2 MB.
   */
  AudioRecordingQualityMedium = 1,
  /**
   * 2: High quality. Sample rate is 32 kHz, file size for 10 minutes of recording is approximately 3.75 MB.
   */
  AudioRecordingQualityHigh = 2,
  /**
   * 3: Ultra-high quality. Sample rate is 32 kHz, file size for 10 minutes of recording is approximately 7.5 MB.
   */
  AudioRecordingQualityUltraHigh = 3,
}

/**
 * Recording content. Set in startAudioRecording.
 */
export enum AudioFileRecordingType {
  /**
   * 1: Record only the local user's audio.
   */
  AudioFileRecordingMic = 1,
  /**
   * 2: Record only the audio of all remote users.
   */
  AudioFileRecordingPlayback = 2,
  /**
   * 3: Record the mixed audio of the local and all remote users.
   */
  AudioFileRecordingMixed = 3,
}

/**
 * Audio encoding content.
 */
export enum AudioEncodedFrameObserverPosition {
  /**
   * 1: Encode only the local user's audio.
   */
  AudioEncodedFrameObserverPositionRecord = 1,
  /**
   * 2: Encode only the audio of all remote users.
   */
  AudioEncodedFrameObserverPositionPlayback = 2,
  /**
   * 3: Encode the mixed audio of the local and all remote users.
   */
  AudioEncodedFrameObserverPositionMixed = 3,
}

/**
 * Recording configuration.
 */
export class AudioRecordingConfiguration {
  /**
   * The absolute path where the recording file is saved locally, including the file name and format. For example: C:\music\audio.aac. Make sure the specified path exists and is writable.
   */
  filePath?: string;
  /**
   * Specifies whether to encode the audio data: true : Encode the audio data using AAC. false : (Default) Do not encode the audio data, save the raw recorded audio data.
   */
  encode?: boolean;
  /**
   * If you set this parameter to 44100 or 48000, to ensure recording quality, it is recommended to record WAV files or AAC files with quality set to AudioRecordingQualityMedium or AudioRecordingQualityHigh. Recording sample rate (Hz).
   *  16000
   *  32000 (Default)
   *  44100
   *  48000
   */
  sampleRate?: number;
  /**
   * Recording content. See AudioFileRecordingType.
   */
  fileRecordingType?: AudioFileRecordingType;
  /**
   * Recording quality. See AudioRecordingQualityType. This parameter applies to AAC files only.
   */
  quality?: AudioRecordingQualityType;
  /**
   * The actual recorded audio channel depends on the captured audio channel:
   *  If the captured audio is mono and recordingChannel is set to 2, the recorded audio will be stereo copied from mono data, not true stereo.
   *  If the captured audio is stereo and recordingChannel is set to 1, the recorded audio will be mono mixed from stereo data. In addition, the integration solution may also affect the final recorded audio channel. If you want to record stereo, please [contact technical support](https://ticket.shengwang.cn/) for assistance. Audio recording channel. The following values are supported:
   *  1: (Default) Mono.
   *  2: Stereo.
   */
  recordingChannel?: number;
}

/**
 * Observer settings for encoded audio.
 */
export class AudioEncodedFrameObserverConfig {
  /**
   * Audio encoding content. See AudioEncodedFrameObserverPosition.
   */
  postionType?: AudioEncodedFrameObserverPosition;
  /**
   * Audio encoding type. See AudioEncodingType.
   */
  encodingType?: AudioEncodingType;
}

/**
 * Observer for encoded audio.
 */
export interface IAudioEncodedFrameObserver {
  /**
   * Retrieves the encoded audio data of the local user.
   *
   * After calling registerAudioEncodedFrameObserver and setting the audio encoding content to AudioEncodedFrameObserverPositionRecord, you can use this callback to get the encoded audio data of the local user.
   *
   * @param frameBuffer Audio buffer.
   * @param length Length of the audio data in bytes.
   * @param audioEncodedFrameInfo Information about the encoded audio. See EncodedAudioFrameInfo.
   */
  onRecordAudioEncodedFrame?(
    frameBuffer: Uint8Array,
    length: number,
    audioEncodedFrameInfo: EncodedAudioFrameInfo
  ): void;

  /**
   * Retrieves the encoded audio data of all remote users.
   *
   * After calling registerAudioEncodedFrameObserver and setting the audio encoding content to AudioEncodedFrameObserverPositionPlayback, you can use this callback to get the encoded audio data of all remote users.
   *
   * @param frameBuffer Audio buffer.
   * @param length Length of the audio data in bytes.
   * @param audioEncodedFrameInfo Information about the encoded audio. See EncodedAudioFrameInfo.
   */
  onPlaybackAudioEncodedFrame?(
    frameBuffer: Uint8Array,
    length: number,
    audioEncodedFrameInfo: EncodedAudioFrameInfo
  ): void;

  /**
   * Retrieves the encoded audio data after mixing local and all remote users' audio.
   *
   * After calling registerAudioEncodedFrameObserver and setting the audio encoding content to AudioEncodedFrameObserverPositionMixed, you can use this callback to get the encoded audio data after mixing local and all remote users' audio.
   *
   * @param frameBuffer Audio buffer.
   * @param length Length of the audio data in bytes.
   * @param audioEncodedFrameInfo Information about the encoded audio. See EncodedAudioFrameInfo.
   */
  onMixedAudioEncodedFrame?(
    frameBuffer: Uint8Array,
    length: number,
    audioEncodedFrameInfo: EncodedAudioFrameInfo
  ): void;
}

/**
 * Access region, i.e., the region where the SDK connects to the server.
 */
export enum AreaCode {
  /**
   * Mainland China.
   */
  AreaCodeCn = 0x00000001,
  /**
   * North America region.
   */
  AreaCodeNa = 0x00000002,
  /**
   * Europe region.
   */
  AreaCodeEu = 0x00000004,
  /**
   * Asia region excluding China.
   */
  AreaCodeAs = 0x00000008,
  /**
   * Japan.
   */
  AreaCodeJp = 0x00000010,
  /**
   * India.
   */
  AreaCodeIn = 0x00000020,
  /**
   * Global.
   */
  AreaCodeGlob = 0xffffffff,
}

/**
 * @ignore
 */
export enum AreaCodeEx {
  /**
   * @ignore
   */
  AreaCodeOc = 0x00000040,
  /**
   * @ignore
   */
  AreaCodeSa = 0x00000080,
  /**
   * @ignore
   */
  AreaCodeAf = 0x00000100,
  /**
   * @ignore
   */
  AreaCodeKr = 0x00000200,
  /**
   * @ignore
   */
  AreaCodeHkmc = 0x00000400,
  /**
   * @ignore
   */
  AreaCodeUs = 0x00000800,
  /**
   * @ignore
   */
  AreaCodeRu = 0x00001000,
  /**
   * @ignore
   */
  AreaCodeOvs = 0xfffffffe,
}

/**
 * Error codes for channel media relay failures.
 */
export enum ChannelMediaRelayError {
  /**
   * 0: Everything works fine.
   */
  RelayOk = 0,
  /**
   * 1: Server response error.
   */
  RelayErrorServerErrorResponse = 1,
  /**
   * 2: No response from the server.
   * This error may be caused by poor network conditions. If this error is reported when initiating channel media relay, you can retry later; if it occurs during the relay process, you can call the leaveChannel method to leave the channel.
   * This error may also occur if the current App ID has not enabled the channel media relay feature. You can [contact technical support](https://ticket.shengwang.cn/) to request enabling channel media relay.
   */
  RelayErrorServerNoResponse = 2,
  /**
   * 3: SDK fails to get the service, possibly due to limited server resources.
   */
  RelayErrorNoResourceAvailable = 3,
  /**
   * 4: Failed to initiate channel media relay request.
   */
  RelayErrorFailedJoinSrc = 4,
  /**
   * 5: Failed to accept channel media relay request.
   */
  RelayErrorFailedJoinDest = 5,
  /**
   * 6: Server fails to receive media stream from the source channel.
   */
  RelayErrorFailedPacketReceivedFromSrc = 6,
  /**
   * 7: Server fails to send media stream to the destination channel.
   */
  RelayErrorFailedPacketSentToDest = 7,
  /**
   * 8: SDK loses connection with the server due to poor network quality. You can call the leaveChannel method to leave the current channel.
   */
  RelayErrorServerConnectionLost = 8,
  /**
   * 9: Internal server error.
   */
  RelayErrorInternalError = 9,
  /**
   * 10: The token of the source channel has expired.
   */
  RelayErrorSrcTokenExpired = 10,
  /**
   * 11: The token of the destination channel has expired.
   */
  RelayErrorDestTokenExpired = 11,
}

/**
 * State codes for channel media relay.
 */
export enum ChannelMediaRelayState {
  /**
   * 0: Idle state. After successfully calling stopChannelMediaRelay to stop the relay, onChannelMediaRelayStateChanged will report this state.
   */
  RelayStateIdle = 0,
  /**
   * 1: SDK is attempting to relay across channels.
   */
  RelayStateConnecting = 1,
  /**
   * 2: The host in the source channel has successfully joined the destination channel.
   */
  RelayStateRunning = 2,
  /**
   * 3: An error occurred. See the code parameter in onChannelMediaRelayStateChanged for details.
   */
  RelayStateFailure = 3,
}

/**
 * Channel media information.
 */
export class ChannelMediaInfo {
  /**
   * User ID.
   */
  uid?: number;
  /**
   * Channel name.
   */
  channelName?: string;
  /**
   * Token used to join the channel.
   */
  token?: string;
}

/**
 * Cross-channel media relay configuration information.
 */
export class ChannelMediaRelayConfiguration {
  /**
   * Source channel information ChannelMediaInfo, including the following members: channelName : Name of the source channel. The default value is null, which means the SDK fills in the current channel name. token : The token used to join the source channel. It is generated based on the channelName and uid you set in srcInfo.
   *  If App Certificate is not enabled, you can set this parameter to the default value null, which means the SDK fills in the App ID.
   *  If App Certificate is enabled, you must provide a token generated using the channelName and uid, and the uid must be 0. uid : The UID that identifies the media stream being relayed in the source channel. The default value is 0. Do not modify it.
   */
  srcInfo?: ChannelMediaInfo;
  /**
   * Since token expiration in any destination channel will cause all cross-channel streaming to stop, it is recommended that you set the same expiration duration for tokens in all destination channels. Destination channel information ChannelMediaInfo, including the following members: channelName : Name of the destination channel. token : The token used to join the destination channel. It is generated based on the channelName and uid you set in destInfos.
   *  If App Certificate is not enabled, you can set this parameter to the default value null, which means the SDK fills in the App ID.
   *  If App Certificate is enabled, you must provide a token generated using the channelName and uid. uid : The UID that identifies the media stream being relayed in the destination channel. The value range is [0, 2^32-1]. Make sure it is different from all UIDs in the destination channel. The default value is 0, which means the SDK randomly assigns a UID.
   */
  destInfos?: ChannelMediaInfo[];
  /**
   * Number of destination channels. The default value is 0. Value range is [0,6]. This parameter should match the number of ChannelMediaInfo objects defined in destInfos.
   */
  destCount?: number;
}

/**
 * Uplink network information.
 */
export class UplinkNetworkInfo {
  /**
   * Target bitrate (bps) of the video encoder.
   */
  video_encoder_target_bitrate_bps?: number;
}

/**
 * @ignore
 */
export class PeerDownlinkInfo {
  /**
   * @ignore
   */
  userId?: string;
  /**
   * @ignore
   */
  stream_type?: VideoStreamType;
  /**
   * @ignore
   */
  current_downscale_level?: RemoteVideoDownscaleLevel;
  /**
   * @ignore
   */
  expected_bitrate_bps?: number;
}

/**
 * @ignore
 */
export class DownlinkNetworkInfo {
  /**
   * @ignore
   */
  lastmile_buffer_delay_time_ms?: number;
  /**
   * @ignore
   */
  bandwidth_estimation_bps?: number;
  /**
   * @ignore
   */
  total_downscale_level_count?: number;
  /**
   * @ignore
   */
  peer_downlink_info?: PeerDownlinkInfo[];
  /**
   * @ignore
   */
  total_received_video_count?: number;
}

/**
 * Built-in encryption modes.
 *
 * It is recommended to use the Aes128Gcm2 or Aes256Gcm2 encryption modes. These modes support salt, offering higher security.
 */
export enum EncryptionMode {
  /**
   * 1: 128-bit AES encryption, XTS mode.
   */
  Aes128Xts = 1,
  /**
   * 2: 128-bit AES encryption, ECB mode.
   */
  Aes128Ecb = 2,
  /**
   * 3: 256-bit AES encryption, XTS mode.
   */
  Aes256Xts = 3,
  /**
   * 4: 128-bit SM4 encryption, ECB mode.
   */
  Sm4128Ecb = 4,
  /**
   * 5: 128-bit AES encryption, GCM mode.
   */
  Aes128Gcm = 5,
  /**
   * 6: 256-bit AES encryption, GCM mode.
   */
  Aes256Gcm = 6,
  /**
   * 7: (Default) 128-bit AES encryption, GCM mode. This encryption mode requires setting a salt (encryptionKdfSalt).
   */
  Aes128Gcm2 = 7,
  /**
   * 8: 256-bit AES encryption, GCM mode. This encryption mode requires setting a salt (encryptionKdfSalt).
   */
  Aes256Gcm2 = 8,
  /**
   * Enumeration boundary value.
   */
  ModeEnd = 9,
}

/**
 * Configures the built-in encryption mode and key.
 */
export class EncryptionConfig {
  /**
   * Built-in encryption mode. See EncryptionMode. It is recommended to use the Aes128Gcm2 or Aes256Gcm2 encryption modes. These modes support salt and offer better security.
   */
  encryptionMode?: EncryptionMode;
  /**
   * Built-in encryption key, of type string, with no length limit. A 32-byte key is recommended. If this parameter is not specified or is set to null, built-in encryption cannot be enabled, and the SDK returns error code -2.
   */
  encryptionKey?: string;
  /**
   * Salt, 32 bytes in length. It is recommended to generate the salt on the server side using OpenSSL. This parameter takes effect only when the encryption mode is Aes128Gcm2 or Aes256Gcm2. In this case, make sure the value of this parameter is not all 0.
   */
  encryptionKdfSalt?: number[];
  /**
   * Whether to enable data stream encryption: true : Enable data stream encryption. false : (default) Disable data stream encryption.
   */
  datastreamEncryptionEnabled?: boolean;
}

/**
 * Built-in encryption error types.
 */
export enum EncryptionErrorType {
  /**
   * 0: Internal error.
   */
  EncryptionErrorInternalFailure = 0,
  /**
   * 1: Media stream decryption error. Make sure the encryption mode or key used by the sender and receiver is the same.
   */
  EncryptionErrorDecryptionFailure = 1,
  /**
   * 2: Media stream encryption error.
   */
  EncryptionErrorEncryptionFailure = 2,
  /**
   * 3: Data stream decryption error. Make sure the encryption mode or key used by the sender and receiver is the same.
   */
  EncryptionErrorDatastreamDecryptionFailure = 3,
  /**
   * 4: Data stream encryption error.
   */
  EncryptionErrorDatastreamEncryptionFailure = 4,
}

/**
 * @ignore
 */
export enum UploadErrorReason {
  /**
   * @ignore
   */
  UploadSuccess = 0,
  /**
   * @ignore
   */
  UploadNetError = 1,
  /**
   * @ignore
   */
  UploadServerError = 2,
}

/**
 * Error codes after calling renewToken.
 *
 * Since Available since v4.6.0.
 */
export enum RenewTokenErrorCode {
  /**
   * (0): Token updated successfully.
   */
  RenewTokenSuccess = 0,
  /**
   * (1): Token update failed due to an unknown server error. It is recommended to check the parameters used to generate the Token, regenerate the Token, and retry renewToken.
   */
  RenewTokenFailure = 1,
  /**
   * (2): Token update failed because the provided Token has expired. It is recommended to generate a new Token with a longer expiration time and retry renewToken.
   */
  RenewTokenTokenExpired = 2,
  /**
   * (3): Token update failed because the provided Token is invalid. Common causes include: the project has enabled App Certificate in the Agora Console but did not use a Token when joining the channel; the uid specified in joinChannel does not match the one used to generate the Token; the channel name specified in joinChannel does not match the one used to generate the Token. It is recommended to check the Token generation process, regenerate the Token, and retry renewToken.
   */
  RenewTokenInvalidToken = 3,
  /**
   * (4): Token update failed because the channel name in the Token does not match the current channel. It is recommended to check the channel name, regenerate the Token, and retry renewToken.
   */
  RenewTokenInvalidChannelName = 4,
  /**
   * (5): Token update failed because the App ID in the Token does not match the current App ID. It is recommended to check the App ID, regenerate the Token, and retry renewToken.
   */
  RenewTokenInconsistentAppid = 5,
  /**
   * (6): The previous Token update request was canceled due to a new request being initiated.
   */
  RenewTokenCanceledByNewRequest = 6,
}

/**
 * Device permission types.
 */
export enum PermissionType {
  /**
   * 0: Permission for audio capture device.
   */
  RecordAudio = 0,
  /**
   * 1: Camera permission.
   */
  Camera = 1,
  /**
   * (Android only) 2: Screen sharing permission.
   */
  ScreenCapture = 2,
}

/**
 * Subscription state.
 */
export enum StreamSubscribeState {
  /**
   * 0: Initial subscription state after joining the channel.
   */
  SubStateIdle = 0,
  /**
   * 1: Subscription failed. Possible reasons:
   *  Remote user:
   *  Called muteLocalAudioStream(true) or muteLocalVideoStream(true) to stop sending local media streams.
   *  Called disableAudio or disableVideo to disable the local audio or video module.
   *  Called enableLocalAudio(false) or enableLocalVideo(false) to disable local audio or video capture.
   *  User role is audience.
   *  Local user called the following methods to stop receiving remote media streams:
   *  Called muteRemoteAudioStream(true) or muteAllRemoteAudioStreams(true) to stop receiving remote audio streams.
   *  Called muteRemoteVideoStream(true) or muteAllRemoteVideoStreams(true) to stop receiving remote video streams.
   */
  SubStateNoSubscribed = 1,
  /**
   * 2: Subscribing in progress.
   */
  SubStateSubscribing = 2,
  /**
   * 3: Remote stream received, subscription successful.
   */
  SubStateSubscribed = 3,
}

/**
 * Publishing state.
 */
export enum StreamPublishState {
  /**
   * 0: Initial publishing state after joining the channel.
   */
  PubStateIdle = 0,
  /**
   * 1: Publishing failed. Possible reasons:
   *  The local user called muteLocalAudioStream(true) or muteLocalVideoStream(true) to stop sending local media streams.
   *  The local user called disableAudio or disableVideo to disable the local audio or video module.
   *  The local user called enableLocalAudio(false) or enableLocalVideo(false) to disable local audio or video capture.
   *  The local user's role is audience.
   */
  PubStateNoPublished = 1,
  /**
   * 2: Publishing in progress.
   */
  PubStatePublishing = 2,
  /**
   * 3: Publishing succeeded.
   */
  PubStatePublished = 3,
}

/**
 * Configuration for audio and video loopback testing.
 */
export class EchoTestConfiguration {
  /**
   * The view used to render the local user's video. This parameter is only applicable when testing video devices. Make sure enableVideo is set to true.
   */
  view?: any;
  /**
   * Whether to enable audio devices: true : (Default) Enable audio devices. Set to true to test audio devices. false : Disable audio devices.
   */
  enableAudio?: boolean;
  /**
   * Whether to enable video devices. Video device testing is not supported currently. Set this parameter to false.
   */
  enableVideo?: boolean;
  /**
   * Token used to secure the audio and video loopback test. If you have not enabled App Certificate in the console, you do not need to provide this parameter. If you have enabled App Certificate, you must provide a Token, and the uid used to generate the Token must be 0xFFFFFFFF, and the channel name must uniquely identify each loopback test. For how to generate a Token on the server, see [Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   */
  token?: string;
  /**
   * The channel name that identifies each audio and video loopback test. To ensure proper loopback testing, users under the same project (App ID) must use different channel names on different devices.
   */
  channelId?: string;
  /**
   * Set the interval or delay for returning loopback test results. Value range: [2,10] seconds. Default is 2 seconds.
   *  For audio loopback tests, results are returned based on the interval you set.
   *  For video loopback tests, the video appears briefly, then the delay gradually increases until it reaches the set interval.
   */
  intervalInSeconds?: number;
}

/**
 * User information.
 */
export class UserInfo {
  /**
   * User ID.
   */
  uid?: number;
  /**
   * User account. Length is limited by MaxUserAccountLengthType.
   */
  userAccount?: string;
}

/**
 * Ear monitoring audio filter type.
 */
export enum EarMonitoringFilterType {
  /**
   * 1<<0: Do not add audio filters in ear monitoring.
   */
  EarMonitoringFilterNone = 1 << 0,
  /**
   * 1<<1: Add vocal effect audio filters in ear monitoring. If you implement features such as voice beautification or sound effects, users can hear the processed sound in ear monitoring.
   */
  EarMonitoringFilterBuiltInAudioFilters = 1 << 1,
  /**
   * 1<<2: Add noise suppression audio filters in ear monitoring.
   */
  EarMonitoringFilterNoiseSuppression = 1 << 2,
  /**
   * 1<<15: Reuse audio filters that have already been applied on the sending side. Reusing audio filters reduces CPU usage for ear monitoring, but increases latency. Suitable for scenarios where reducing CPU consumption is more important than minimizing ear monitoring latency.
   */
  EarMonitoringFilterReusePostProcessingFilter = 1 << 15,
}

/**
 * @ignore
 */
export enum ThreadPriorityType {
  /**
   * @ignore
   */
  Lowest = 0,
  /**
   * @ignore
   */
  Low = 1,
  /**
   * @ignore
   */
  Normal = 2,
  /**
   * @ignore
   */
  High = 3,
  /**
   * @ignore
   */
  Highest = 4,
  /**
   * @ignore
   */
  Critical = 5,
}

/**
 * Video encoding configuration for the shared screen stream.
 */
export class ScreenVideoParameters {
  /**
   * Video encoding resolution. Default is 1280 × 720.
   */
  dimensions?: VideoDimensions;
  /**
   * Video encoding frame rate (fps). Default is 15.
   */
  frameRate?: number;
  /**
   * Video encoding bitrate (Kbps).
   */
  bitrate?: number;
  /**
   * Content type of the screen sharing video.
   */
  contentHint?: VideoContentHint;
}

/**
 * Parameter configuration for screen sharing.
 */
export class ScreenCaptureParameters2 {
  /**
   * Due to system limitations, capturing system audio is only supported on Android API level 29 and above, i.e., Android 10 and above.
   *  To improve the success rate of capturing system audio during screen sharing, make sure you call the setAudioScenario method and set the audio scenario to AudioScenarioGameStreaming. Whether to capture system audio during screen sharing: true : Capture system audio. false : (Default) Do not capture system audio.
   */
  captureAudio?: boolean;
  /**
   * Audio configuration for the shared screen stream. See ScreenAudioParameters. This parameter takes effect only when captureAudio is set to true.
   */
  audioParams?: ScreenAudioParameters;
  /**
   * Due to system limitations, screen capture is only supported on Android API level 21 and above, i.e., Android 5 and above. Whether to capture the screen during screen sharing: true : (Default) Capture the screen. false : Do not capture the screen.
   */
  captureVideo?: boolean;
  /**
   * Video encoding configuration for the shared screen stream. See ScreenVideoParameters. This parameter takes effect only when captureVideo is set to true.
   */
  videoParams?: ScreenVideoParameters;
}

/**
 * The rendering state of media frames.
 */
export enum MediaTraceEvent {
  /**
   * 0: Video frame rendered.
   */
  MediaTraceEventVideoRendered = 0,
  /**
   * 1: Video frame decoded.
   */
  MediaTraceEventVideoDecoded = 1,
}

/**
 * Metric information during the video frame rendering process.
 */
export class VideoRenderingTracingInfo {
  /**
   * Time interval (ms) from calling startMediaRenderingTracing to triggering the onVideoRenderingTracingResult callback. It is recommended to call startMediaRenderingTracing before joining the channel.
   */
  elapsedTime?: number;
  /**
   * Time interval (ms) from calling startMediaRenderingTracing to calling joinChannel. A negative value indicates startMediaRenderingTracing was called after joinChannel.
   */
  start2JoinChannel?: number;
  /**
   * Time interval (ms) from calling joinChannel1 or joinChannel to successfully joining the channel.
   */
  join2JoinSuccess?: number;
  /**
   * If startMediaRenderingTracing is called after the remote user joins the channel, this value is 0 and has no reference value.
   *  To improve the rendering speed of the remote user, it is recommended that the local user joins the channel after the remote user, to reduce this value.
   *  If startMediaRenderingTracing is called before the local user joins the channel, this value is the time interval (ms) from the local user successfully joining the channel to the remote user joining.
   *  If startMediaRenderingTracing is called after the local user joins the channel, this value is the time interval (ms) from calling startMediaRenderingTracing to the remote user joining.
   */
  joinSuccess2RemoteJoined?: number;
  /**
   * If startMediaRenderingTracing is called after setting the remote view, this value is 0 and has no reference value.
   *  To improve the rendering speed of the remote user, it is recommended to set the remote view before the remote user joins the channel, or immediately after the remote user joins, to reduce this value.
   *  If startMediaRenderingTracing is called before the remote user joins the channel, this value is the time interval (ms) from the remote user joining to the local user setting the remote view.
   *  If startMediaRenderingTracing is called after the remote user joins the channel, this value is the time interval (ms) from calling startMediaRenderingTracing to setting the remote view.
   */
  remoteJoined2SetView?: number;
  /**
   * If startMediaRenderingTracing is called after subscribing to the remote video stream, this value is 0 and has no reference value.
   *  To improve the rendering speed of the remote user, it is recommended to subscribe to the remote video stream immediately after the remote user joins the channel, to reduce this value.
   *  If startMediaRenderingTracing is called before the remote user joins the channel, this value is the time interval (ms) from the remote user joining to subscribing to the remote video stream.
   *  If startMediaRenderingTracing is called after the remote user joins the channel, this value is the time interval (ms) from calling startMediaRenderingTracing to subscribing to the remote video stream.
   */
  remoteJoined2UnmuteVideo?: number;
  /**
   * If startMediaRenderingTracing is called after receiving the remote video stream, this value is 0 and has no reference value.
   *  To improve the rendering speed of the remote user, it is recommended that the remote user publishes the video stream immediately after joining the channel, and the local user subscribes to the remote stream immediately, to reduce this value.
   *  If startMediaRenderingTracing is called before the remote user joins the channel, this value is the time interval (ms) from the remote user joining to the local user receiving the first remote data packet.
   *  If startMediaRenderingTracing is called after the remote user joins the channel, this value is the time interval (ms) from calling startMediaRenderingTracing to receiving the first remote data packet.
   */
  remoteJoined2PacketReceived?: number;
}

/**
 * @ignore
 */
export enum ConfigFetchType {
  /**
   * @ignore
   */
  ConfigFetchTypeInitialize = 1,
  /**
   * @ignore
   */
  ConfigFetchTypeJoinChannel = 2,
}

/**
 * @ignore
 */
export enum LocalProxyMode {
  /**
   * @ignore
   */
  ConnectivityFirst = 0,
  /**
   * @ignore
   */
  LocalOnly = 1,
}

/**
 * Configuration information of the log server.
 */
export class LogUploadServerInfo {
  /**
   * Domain name of the log server.
   */
  serverDomain?: string;
  /**
   * Storage path of the log on the server.
   */
  serverPath?: string;
  /**
   * Port of the log server.
   */
  serverPort?: number;
  /**
   * Whether the log server uses HTTPS protocol: true : Uses HTTPS protocol. false : Uses HTTP protocol.
   */
  serverHttps?: boolean;
}

/**
 * Advanced options for Local Access Point.
 */
export class AdvancedConfigInfo {
  /**
   * Custom log upload server. By default, the SDK uploads logs to the Agora log server. You can use this parameter to modify the log upload server. See LogUploadServerInfo.
   */
  logUploadServer?: LogUploadServerInfo;
}

/**
 * Local Access Point configuration.
 */
export class LocalAccessPointConfiguration {
  /**
   * Internal IP address list of the Local Access Point. Either ipList or domainList must be provided.
   */
  ipList?: string[];
  /**
   * Number of internal IP addresses of the Local Access Point. This value must match the number of IP addresses you provide.
   */
  ipListSize?: number;
  /**
   * Domain name list of the Local Access Point. The SDK resolves the IP addresses of the Local Access Point from the provided domain names. The domain resolution timeout is 10 seconds. Either ipList or domainList must be provided. If you specify both IP addresses and domain names, the SDK merges and deduplicates the resolved IPs and the specified IPs, then randomly connects to one IP for load balancing.
   */
  domainList?: string[];
  /**
   * Number of domain names for the Local Access Point. This value must match the number of domain names you provide.
   */
  domainListSize?: number;
  /**
   * Domain name for internal certificate verification. If left empty, the SDK uses the default verification domain secure-edge.local.
   */
  verifyDomainName?: string;
  /**
   * Connection mode. See LocalProxyMode.
   */
  mode?: LocalProxyMode;
  /**
   * Advanced options for the Local Access Point. See AdvancedConfigInfo.
   */
  advancedConfig?: AdvancedConfigInfo;
  /**
   * @ignore
   */
  disableAut?: boolean;
}

/**
 * @ignore
 */
export enum RecorderStreamType {
  /**
   * @ignore
   */
  Rtc = 0,
  /**
   * @ignore
   */
  Preview = 1,
}

/**
 * @ignore
 */
export class RecorderStreamInfo {
  /**
   * @ignore
   */
  channelId?: string;
  /**
   * @ignore
   */
  uid?: number;
  /**
   * @ignore
   */
  type?: RecorderStreamType;
}

/**
 * @ignore
 */
export enum RdtStreamType {
  /**
   * @ignore
   */
  RdtStreamCmd = 0,
  /**
   * @ignore
   */
  RdtStreamData = 1,
  /**
   * @ignore
   */
  RdtStreamCount = 2,
}

/**
 * @ignore
 */
export enum RdtState {
  /**
   * @ignore
   */
  RdtStateClosed = 0,
  /**
   * @ignore
   */
  RdtStateOpened = 1,
  /**
   * @ignore
   */
  RdtStateBlocked = 2,
  /**
   * @ignore
   */
  RdtStatePending = 3,
  /**
   * @ignore
   */
  RdtStateBroken = 4,
}

/**
 * Spatial audio parameters.
 */
export class SpatialAudioParams {
  /**
   * The horizontal angle of the remote user or media player relative to the local user. Value range: [0,360] degrees. Where:
   *  0: (default) 0 degrees, directly in front on the horizontal plane.
   *  90: 90 degrees, directly to the left.
   *  180: 180 degrees, directly behind.
   *  270: 270 degrees, directly to the right.
   *  360: 360 degrees, same as 0 degrees.
   */
  speaker_azimuth?: number;
  /**
   * The elevation angle of the remote user or media player relative to the local user. Value range: [-90,90] degrees. Where:
   *  0: (default) 0 degrees, no vertical rotation.
   *  -90: -90 degrees, rotated 90 degrees downward.
   *  90: 90 degrees, rotated 90 degrees upward.
   */
  speaker_elevation?: number;
  /**
   * The distance of the remote user or media player relative to the local user. Value range: [1,50] meters. Default is 1 meter.
   */
  speaker_distance?: number;
  /**
   * The orientation of the remote user or media player relative to the local user. Value range: [0,180] degrees. Where:
   *  0: (default) 0 degrees, both source and listener face the same direction.
   *  180: 180 degrees, source and listener face each other.
   */
  speaker_orientation?: number;
  /**
   * Whether to enable sound blur processing: true : Enable blur. false : (default) Disable blur.
   */
  enable_blur?: boolean;
  /**
   * Whether to enable air absorption, simulating the attenuation of sound timbre as it travels through air: at certain distances, high frequencies attenuate faster than low frequencies. true : (default) Enable air absorption. Make sure speaker_attenuation is not 0, otherwise this setting has no effect. false : Disable air absorption.
   */
  enable_air_absorb?: boolean;
  /**
   * Sound attenuation coefficient for the remote user or media player, value range [0,1]. Where:
   *  0: Broadcast mode, volume and timbre do not attenuate with distance; the local user hears no change regardless of distance.
   *  (0,0.5): Weak attenuation mode; volume and timbre (requires enable_air_absorb) attenuate slightly, allowing sound to travel farther than in real environments.
   *  0.5: (default) Simulates real-world volume attenuation, equivalent to not setting speaker_attenuation.
   *  (0.5,1]: Strong attenuation mode; volume and timbre (requires enable_air_absorb) attenuate rapidly.
   */
  speaker_attenuation?: number;
  /**
   * This parameter is suitable for scenarios with fast-moving sound sources (e.g., racing games). It is not recommended for typical audio/video interaction scenarios (voice chat, co-hosting, online KTV).
   *  When enabled, it is recommended to set a regular update interval (e.g., 30 ms) and continuously call updatePlayerPositionInfo, updateSelfPosition, and updateRemotePosition to update the relative distance between the source and receiver. The Doppler effect may not work as expected or may cause jitter if: the update interval is too long, the updates are irregular, or packet loss/delay causes distance info loss. Whether to enable Doppler effect: when there is relative movement between the sound source and the receiver, the pitch heard by the receiver changes. true : Enable Doppler effect. false : (default) Disable Doppler effect.
   */
  enable_doppler?: boolean;
}

/**
 * Layout information of a sub-video stream in a composite video.
 */
export class VideoLayout {
  /**
   * Channel name to which the sub-video stream belongs.
   */
  channelId?: string;
  /**
   * User ID that publishes the sub-video stream.
   */
  uid?: number;
  /**
   * Reserved parameter.
   */
  strUid?: string;
  /**
   * The x-coordinate (px) of the sub-video on the composite canvas. It represents the horizontal offset of the top-left corner of the sub-video relative to the top-left corner (origin) of the canvas.
   */
  x?: number;
  /**
   * The y-coordinate (px) of the sub-video on the composite canvas. It represents the vertical offset of the top-left corner of the sub-video relative to the top-left corner (origin) of the canvas.
   */
  y?: number;
  /**
   * Width of the sub-video stream (px).
   */
  width?: number;
  /**
   * Height of the sub-video stream (px).
   */
  height?: number;
  /**
   * State of the sub-video stream on the composite canvas.
   *  0: Normal. The video stream has been rendered on the canvas.
   *  1: Placeholder. The video stream has no video content and is displayed as a placeholder.
   *  2: Black image. The video stream is replaced by a black image.
   */
  videoState?: number;
}
