import './extension/IAgoraRtcEngineExtension';
import {
  QualityAdaptIndication,
  VideoCodecType,
  CaptureBrightnessLevelType,
  VideoStreamType,
  AudioSampleRateType,
  VideoFormat,
  Rectangle,
  ScreenCaptureParameters,
  VideoMirrorModeType,
  ClientRoleType,
  AudienceLatencyLevelType,
  ChannelProfileType,
  ErrorCodeType,
  QualityType,
  LastmileProbeResult,
  AudioVolumeInfo,
  RtcStats,
  UplinkNetworkInfo,
  DownlinkNetworkInfo,
  VideoSourceType,
  LocalVideoStreamState,
  LocalVideoStreamError,
  RemoteVideoState,
  RemoteVideoStateReason,
  UserOfflineReasonType,
  LocalAudioStats,
  RemoteAudioStats,
  LicenseErrorType,
  LocalAudioStreamState,
  LocalAudioStreamError,
  RemoteAudioState,
  RemoteAudioStateReason,
  ClientRoleOptions,
  ClientRoleChangeFailedReason,
  RtmpStreamPublishState,
  RtmpStreamPublishErrorType,
  RtmpStreamingEvent,
  ChannelMediaRelayState,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ConnectionStateType,
  ConnectionChangedReasonType,
  WlaccMessageReason,
  WlaccSuggestAction,
  WlAccStats,
  NetworkType,
  EncryptionErrorType,
  PermissionType,
  UserInfo,
  UploadErrorReason,
  StreamSubscribeState,
  StreamPublishState,
  AudioScenarioType,
  ThreadPriorityType,
  LastmileProbeConfig,
  VideoEncoderConfiguration,
  BeautyOptions,
  LowlightEnhanceOptions,
  VideoDenoiserOptions,
  ColorEnhanceOptions,
  VirtualBackgroundSource,
  SegmentationProperty,
  VideoCanvas,
  AudioProfileType,
  VideoSubscriptionOptions,
  AudioRecordingConfiguration,
  AudioEncodedFrameObserverConfig,
  IAudioEncodedFrameObserver,
  SpatialAudioParams,
  VoiceBeautifierPreset,
  AudioEffectPreset,
  VoiceConversionPreset,
  HeadphoneEqualizerPreset,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  EarMonitoringFilterType,
  SenderOptions,
  AudioSessionOperationRestriction,
  DeviceInfo,
  VideoContentHint,
  ScreenScenarioType,
  ScreenCaptureParameters2,
  LiveTranscoding,
  LocalTranscoderConfiguration,
  VideoOrientation,
  EncryptionConfig,
  DataStreamConfig,
  WatermarkOptions,
  ChannelMediaRelayConfiguration,
} from './AgoraBase';
import {
  RenderModeType,
  ContentInspectResult,
  MediaSourceType,
  RawAudioFrameOpModeType,
  IAudioSpectrumObserver,
  ContentInspectConfig,
} from './AgoraMediaBase';
import { RtcConnection } from './IAgoraRtcEngineEx';
import {
  RhythmPlayerStateType,
  RhythmPlayerErrorType,
  AgoraRhythmPlayerConfig,
} from './IAgoraRhythmPlayer';
import { LogConfig, LogFilterType, LogLevel } from './IAgoraLog';
import { IMediaPlayer } from './IAgoraMediaPlayer';
import { AudioMixingDualMonoMode, IMediaEngine } from './IAgoraMediaEngine';
import { IAudioDeviceManager } from './IAudioDeviceManager';
import { IMusicContentCenter } from './IAgoraMusicContentCenter';
import { IMediaRecorder } from './IAgoraMediaRecorder';
import { ILocalSpatialAudioEngine } from './IAgoraSpatialAudio';
/**
 * Media device types.
 */
export enum MediaDeviceType {
  /**
   * -1: Unknown device type.
   */
  UnknownAudioDevice = -1,
  /**
   * 0: Audio playback device.
   */
  AudioPlayoutDevice = 0,
  /**
   * 1: Audio capturing device.
   */
  AudioRecordingDevice = 1,
  /**
   * 2: Video renderer.
   */
  VideoRenderDevice = 2,
  /**
   * 3: Video capturer.
   */
  VideoCaptureDevice = 3,
  /**
   * @ignore
   */
  AudioApplicationPlayoutDevice = 4,
}

/**
 * The playback state of the music file.
 */
export enum AudioMixingStateType {
  /**
   * 710: The music file is playing.
   */
  AudioMixingStatePlaying = 710,
  /**
   * 711: The music file pauses playing.
   */
  AudioMixingStatePaused = 711,
  /**
   * 713: The music file stops playing.The possible reasons include:AudioMixingReasonAllLoopsCompleted(723)AudioMixingReasonStoppedByUser(724)
   */
  AudioMixingStateStopped = 713,
  /**
   * 714: An error occurs during the playback of the audio mixing file.The possible reasons include:AudioMixingReasonCanNotOpen(701)AudioMixingReasonTooFrequentCall(702)AudioMixingReasonInterruptedEof(703)
   */
  AudioMixingStateFailed = 714,
}

/**
 * The reason why the playback state of the music file changes. Reported in the onAudioMixingStateChanged callback.
 */
export enum AudioMixingReasonType {
  /**
   * 701: The SDK cannot open the music file. For example, the local music file does not exist, the SDK does not support the file format, or the the SDK cannot access the music file URL.
   */
  AudioMixingReasonCanNotOpen = 701,
  /**
   * 702: The SDK opens the music file too frequently. If you need to call startAudioMixing multiple times, ensure that the call interval is more than 500 ms.
   */
  AudioMixingReasonTooFrequentCall = 702,
  /**
   * 703: The music file playback is interrupted.
   */
  AudioMixingReasonInterruptedEof = 703,
  /**
   * 721: The music file completes a loop playback.
   */
  AudioMixingReasonOneLoopCompleted = 721,
  /**
   * 723: The music file completes all loop playback.
   */
  AudioMixingReasonAllLoopsCompleted = 723,
  /**
   * 724: Successfully call stopAudioMixing to stop playing the music file.
   */
  AudioMixingReasonStoppedByUser = 724,
  /**
   * 0: The SDK opens music file successfully.
   */
  AudioMixingReasonOk = 0,
}

/**
 * @ignore
 */
export enum InjectStreamStatus {
  /**
   * @ignore
   */
  InjectStreamStatusStartSuccess = 0,
  /**
   * @ignore
   */
  InjectStreamStatusStartAlreadyExists = 1,
  /**
   * @ignore
   */
  InjectStreamStatusStartUnauthorized = 2,
  /**
   * @ignore
   */
  InjectStreamStatusStartTimedout = 3,
  /**
   * @ignore
   */
  InjectStreamStatusStartFailed = 4,
  /**
   * @ignore
   */
  InjectStreamStatusStopSuccess = 5,
  /**
   * @ignore
   */
  InjectStreamStatusStopNotFound = 6,
  /**
   * @ignore
   */
  InjectStreamStatusStopUnauthorized = 7,
  /**
   * @ignore
   */
  InjectStreamStatusStopTimedout = 8,
  /**
   * @ignore
   */
  InjectStreamStatusStopFailed = 9,
  /**
   * @ignore
   */
  InjectStreamStatusBroken = 10,
}

/**
 * The midrange frequency for audio equalization.
 */
export enum AudioEqualizationBandFrequency {
  /**
   * 0: 31 Hz
   */
  AudioEqualizationBand31 = 0,
  /**
   * 1: 62 Hz
   */
  AudioEqualizationBand62 = 1,
  /**
   * 2: 125 Hz
   */
  AudioEqualizationBand125 = 2,
  /**
   * 3: 250 Hz
   */
  AudioEqualizationBand250 = 3,
  /**
   * 4: 500 Hz
   */
  AudioEqualizationBand500 = 4,
  /**
   * 5: 1 kHz
   */
  AudioEqualizationBand1k = 5,
  /**
   * 6: 2 kHz
   */
  AudioEqualizationBand2k = 6,
  /**
   * 7: 4 kHz
   */
  AudioEqualizationBand4k = 7,
  /**
   * 8: 8 kHz
   */
  AudioEqualizationBand8k = 8,
  /**
   * 9: 16 kHz
   */
  AudioEqualizationBand16k = 9,
}

/**
 * Audio reverberation types.
 */
export enum AudioReverbType {
  /**
   * 0: The level of the dry signal (dB). The value is between -20 and 10.
   */
  AudioReverbDryLevel = 0,
  /**
   * 1: The level of the early reflection signal (wet signal) (dB). The value is between -20 and 10.
   */
  AudioReverbWetLevel = 1,
  /**
   * 2: The room size of the reflection. The value is between 0 and 100.
   */
  AudioReverbRoomSize = 2,
  /**
   * 3: The length of the initial delay of the wet signal (ms). The value is between 0 and 200.
   */
  AudioReverbWetDelay = 3,
  /**
   * 4: The reverberation strength. The value is between 0 and 100.
   */
  AudioReverbStrength = 4,
}

/**
 * @ignore
 */
export enum StreamFallbackOptions {
  /**
   * @ignore
   */
  StreamFallbackOptionDisabled = 0,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLow = 1,
  /**
   * @ignore
   */
  StreamFallbackOptionAudioOnly = 2,
}

/**
 * @ignore
 */
export enum PriorityType {
  /**
   * @ignore
   */
  PriorityHigh = 50,
  /**
   * @ignore
   */
  PriorityNormal = 100,
}

/**
 * The statistics of the local video stream.
 */
export class LocalVideoStats {
  /**
   * The user ID of the local user.
   */
  uid?: number;
  /**
   * The actual bitrate (Kbps) while sending the local video stream.This value does not include the bitrate for resending the video after packet loss.
   */
  sentBitrate?: number;
  /**
   * The actual frame rate (fps) while sending the local video stream.This value does not include the frame rate for resending the video after packet loss.
   */
  sentFrameRate?: number;
  /**
   * The frame rate (fps) for capturing the local video stream.
   */
  captureFrameRate?: number;
  /**
   * The width (px) for capturing the local video stream.
   */
  captureFrameWidth?: number;
  /**
   * The height (px) for capturing the local video stream.
   */
  captureFrameHeight?: number;
  /**
   * The frame rate (fps) adjusted by the built-in video capture adapter (regulator) of the SDK for capturing the local video stream. The regulator adjusts the frame rate of the video captured by the camera according to the video encoding configuration.
   */
  regulatedCaptureFrameRate?: number;
  /**
   * The width (px) adjusted by the built-in video capture adapter (regulator) of the SDK for capturing the local video stream. The regulator adjusts the height and width of the video captured by the camera according to the video encoding configuration.
   */
  regulatedCaptureFrameWidth?: number;
  /**
   * The height (px) adjusted by the built-in video capture adapter (regulator) of the SDK for capturing the local video stream. The regulator adjusts the height and width of the video captured by the camera according to the video encoding configuration.
   */
  regulatedCaptureFrameHeight?: number;
  /**
   * The output frame rate (fps) of the local video encoder.
   */
  encoderOutputFrameRate?: number;
  /**
   * The width of the encoded video (px).
   */
  encodedFrameWidth?: number;
  /**
   * The height of the encoded video (px).
   */
  encodedFrameHeight?: number;
  /**
   * The output frame rate (fps) of the local video renderer.
   */
  rendererOutputFrameRate?: number;
  /**
   * The target bitrate (Kbps) of the current encoder. This is an estimate made by the SDK based on the current network conditions.
   */
  targetBitrate?: number;
  /**
   * The target frame rate (fps) of the current encoder.
   */
  targetFrameRate?: number;
  /**
   * The quality adaption of the local video stream in the reported interval (based on the target frame rate and target bitrate).
   */
  qualityAdaptIndication?: QualityAdaptIndication;
  /**
   * The bitrate (Kbps) while encoding the local video stream.This value does not include the bitrate for resending the video after packet loss.
   */
  encodedBitrate?: number;
  /**
   * The number of sent video frames, represented by an aggregate value.
   */
  encodedFrameCount?: number;
  /**
   * The codec type of the local video. See VideoCodecType .
   */
  codecType?: VideoCodecType;
  /**
   * The video packet loss rate (%) from the local client to the Agora server before applying the anti-packet loss strategies.
   */
  txPacketLossRate?: number;
  /**
   * The brightness level of the video image captured by the local camera. See CaptureBrightnessLevelType .
   */
  captureBrightnessLevel?: CaptureBrightnessLevelType;
  /**
   * @ignore
   */
  dualStreamEnabled?: boolean;
  /**
   * @ignore
   */
  hwEncoderAccelerating?: number;
}

/**
 * Statistics of the remote video stream.
 */
export class RemoteVideoStats {
  /**
   * The user ID of the remote user sending the video stream.
   */
  uid?: number;
  /**
   * Deprecated:In scenarios where audio and video are synchronized, you can get the video delay data from networkTransportDelay and jitterBufferDelay in RemoteAudioStats .The video delay (ms).
   */
  delay?: number;
  /**
   * The width (pixels) of the video.
   */
  width?: number;
  /**
   * The height (pixels) of the video.
   */
  height?: number;
  /**
   * The bitrate (Kbps) of the remote video received since the last count.
   */
  receivedBitrate?: number;
  /**
   * The frame rate (fps) of decoding the remote video.
   */
  decoderOutputFrameRate?: number;
  /**
   * The frame rate (fps) of rendering the remote video.
   */
  rendererOutputFrameRate?: number;
  /**
   * The packet loss rate (%) of the remote video.
   */
  frameLossRate?: number;
  /**
   * The packet loss rate (%) of the remote video after using the anti-packet-loss technology.
   */
  packetLossRate?: number;
  /**
   * The type of the video stream. See VideoStreamType .
   */
  rxStreamType?: VideoStreamType;
  /**
   * The total freeze time (ms) of the remote video stream after the remote user joins the channel. In a video session where the frame rate is set to no less than 5 fps, video freeze occurs when the time interval between two adjacent renderable video frames is more than 500 ms.
   */
  totalFrozenTime?: number;
  /**
   * The total video freeze time as a percentage (%) of the total time the video is available. The video is considered available as long as that the remote user neither stops sending the video stream nor disables the video module after joining the channel.
   */
  frozenRate?: number;
  /**
   * The amount of time (ms) that the audio is ahead of the video.If this value is negative, the audio is lagging behind the video.
   */
  avSyncTimeMs?: number;
  /**
   * The total active time (ms) of the video.As long as the remote user or host neither stops sending the video stream nor disables the video module after joining the channel, the video is available.
   */
  totalActiveTime?: number;
  /**
   * The total duration (ms) of the remote video stream.
   */
  publishDuration?: number;
  /**
   * The state of super resolution:>0: Super resolution is enabled.=0: Super resolution is not enabled.
   */
  superResolutionType?: number;
  /**
   * @ignore
   */
  mosValue?: number;
}

/**
 * @ignore
 */
export class Region {
  /**
   * @ignore
   */
  uid?: number;
  /**
   * @ignore
   */
  x?: number;
  /**
   * @ignore
   */
  y?: number;
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
  zOrder?: number;
  /**
   * @ignore
   */
  alpha?: number;
  /**
   * @ignore
   */
  renderMode?: RenderModeType;
}

/**
 * @ignore
 */
export class VideoCompositingLayout {
  /**
   * @ignore
   */
  canvasWidth?: number;
  /**
   * @ignore
   */
  canvasHeight?: number;
  /**
   * @ignore
   */
  backgroundColor?: string;
  /**
   * @ignore
   */
  regions?: Region[];
  /**
   * @ignore
   */
  regionCount?: number;
  /**
   * @ignore
   */
  appData?: Uint8Array;
  /**
   * @ignore
   */
  appDataLength?: number;
}

/**
 * @ignore
 */
export class InjectStreamConfig {
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
  videoGop?: number;
  /**
   * @ignore
   */
  videoFramerate?: number;
  /**
   * @ignore
   */
  videoBitrate?: number;
  /**
   * @ignore
   */
  audioSampleRate?: AudioSampleRateType;
  /**
   * @ignore
   */
  audioBitrate?: number;
  /**
   * @ignore
   */
  audioChannels?: number;
}

/**
 * Lifecycle of the CDN live video stream.
 * Deprecated
 */
export enum RtmpStreamLifeCycleType {
  /**
   * Bind to the channel lifecycle. If all hosts leave the channel, the CDN live streaming stops after 30 seconds.
   */
  RtmpStreamLifeCycleBind2channel = 1,
  /**
   * Bind to the owner of the RTMP stream. If the owner leaves the channel, the CDN live streaming stops immediately.
   */
  RtmpStreamLifeCycleBind2owner = 2,
}

/**
 * @ignore
 */
export class PublisherConfiguration {
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
  framerate?: number;
  /**
   * @ignore
   */
  bitrate?: number;
  /**
   * @ignore
   */
  defaultLayout?: number;
  /**
   * @ignore
   */
  lifecycle?: number;
  /**
   * @ignore
   */
  owner?: boolean;
  /**
   * @ignore
   */
  injectStreamWidth?: number;
  /**
   * @ignore
   */
  injectStreamHeight?: number;
  /**
   * @ignore
   */
  injectStreamUrl?: string;
  /**
   * @ignore
   */
  publishUrl?: string;
  /**
   * @ignore
   */
  rawStreamUrl?: string;
  /**
   * @ignore
   */
  extraInfo?: string;
}

/**
 * @ignore
 */
export class AudioTrackConfig {
  /**
   * @ignore
   */
  enableLocalPlayback?: boolean;
}

/**
 * The camera direction.
 */
export enum CameraDirection {
  /**
   * The rear camera.
   */
  CameraRear = 0,
  /**
   * The front camera.
   */
  CameraFront = 1,
}

/**
 * The cloud proxy type.
 */
export enum CloudProxyType {
  /**
   * 0: The automatic mode. The SDK has this mode enabled by default. In this mode, the SDK attempts a direct connection to SD-RTN™ and automatically switches to TCP/TLS 443 if the attempt fails.
   */
  NoneProxy = 0,
  /**
   * 1: The cloud proxy for the UDP protocol, that is, the Force UDP cloud proxy mode. In this mode, the SDK always transmits data over UDP.
   */
  UdpProxy = 1,
  /**
   * 2: The cloud proxy for the TCP (encryption) protocol, that is, the Force TCP cloud proxy mode. In this mode, the SDK always transmits data over TCP/TLS 443.
   */
  TcpProxy = 2,
}

/**
 * The camera capturer preference.
 */
export class CameraCapturerConfiguration {
  /**
   * This parameter applies to Android and iOS only.The camera direction. See CameraDirection .
   */
  cameraDirection?: CameraDirection;
  /**
   * The device ID of the playback device. The maximum length is MaxDeviceIdLengthType .
   */
  deviceId?: string;
  /**
   * See VideoFormat .
   */
  format?: VideoFormat;
  /**
   * @ignore
   */
  followEncodeDimensionRatio?: boolean;
}

/**
 * The configuration of the captured screen.
 */
export class ScreenCaptureConfiguration {
  /**
   * Whether to capture the window on the screen:true: Capture the window.false: (Default) Capture the screen, not the window.
   */
  isCaptureWindow?: boolean;
  /**
   * (macOS only) The display ID of the screen.This parameter takes effect only when you want to capture the screen on macOS.
   */
  displayId?: number;
  /**
   * (Windows only) The relative position of the shared screen to the virtual screen.This parameter takes effect only when you want to capture the screen on Windows.
   */
  screenRect?: Rectangle;
  /**
   * (For Windows and macOS only) Window ID.This parameter takes effect only when you want to capture the window.
   */
  windowId?: any;
  /**
   * (For Windows and macOS only) The screen capture configuration. See ScreenCaptureParameters .
   */
  params?: ScreenCaptureParameters;
  /**
   * (For Windows and macOS only) The relative position of the shared region to the whole screen. See Rectangle .If you do not set this parameter, the SDK shares the whole screen. If the region you set exceeds the boundary of the screen, only the region within in the screen is shared. If you setwidth or height in Rectangle as 0, the whole screen is shared.
   */
  regionRect?: Rectangle;
}

/**
 * @ignore
 */
export class Size {
  /**
   * @ignore
   */
  width?: number;
  /**
   * @ignore
   */
  height?: number;
}

/**
 * The image content of the thumbnail or icon. Set in ScreenCaptureSourceInfo .
 */
export class ThumbImageBuffer {
  /**
   * The buffer of the thumbnail or icon.
   */
  buffer?: Uint8Array;
  /**
   * The buffer length of the thumbnail or icon, in bytes.
   */
  length?: number;
  /**
   * The actual width (px) of the thumbnail or icon.
   */
  width?: number;
  /**
   * The actual height (px) of the thumbnail or icon.
   */
  height?: number;
}

/**
 * The type of the shared target. Set in ScreenCaptureSourceInfo .
 */
export enum ScreenCaptureSourceType {
  /**
   * -1: Unknown type.
   */
  ScreencapturesourcetypeUnknown = -1,
  /**
   * 0: The shared target is a window.
   */
  ScreencapturesourcetypeWindow = 0,
  /**
   * 1: The shared target is a screen of a particular monitor.
   */
  ScreencapturesourcetypeScreen = 1,
  /**
   * 2: Reserved parameter
   */
  ScreencapturesourcetypeCustom = 2,
}

/**
 * The information about the specified shareable window or screen.
 */
export class ScreenCaptureSourceInfo {
  /**
   * The type of the shared target. See ScreenCaptureSourceType .
   */
  type?: ScreenCaptureSourceType;
  /**
   * The window ID for a window or the display ID for a screen.
   */
  sourceId?: any;
  /**
   * The name of the window or screen. UTF-8 encoding.
   */
  sourceName?: string;
  /**
   * The image content of the thumbnail. See
   */
  thumbImage?: ThumbImageBuffer;
  /**
   * The image content of the icon. See
   */
  iconImage?: ThumbImageBuffer;
  /**
   * The process to which the window belongs. UTF-8 encoding.
   */
  processPath?: string;
  /**
   * The title of the window. UTF-8 encoding.
   */
  sourceTitle?: string;
  /**
   * Determines whether the screen is the primary display:true: The screen is the primary display.false: The screen is not the primary display.
   */
  primaryMonitor?: boolean;
  /**
   * @ignore
   */
  isOccluded?: boolean;
  /**
   * @ignore
   */
  minimizeWindow?: boolean;
}

/**
 * The advanced options for audio.
 */
export class AdvancedAudioOptions {
  /**
   * The number of channels for audio preprocessing. See AudioProcessingChannels .
   */
  audioProcessingChannels?: number;
}

/**
 * Image configurations
 */
export class ImageTrackOptions {
  /**
   * The URL of the image that you want to use to replace the video feeds. The image must be in PNG format. This method supports adding an image from the local absolute or relative file path.
   */
  imageUrl?: string;
  /**
   * The frame rate of the video streams being published. The value range is [1,30]. The default value is 1.
   */
  fps?: number;
  /**
   * @ignore
   */
  mirrorMode?: VideoMirrorModeType;
}

/**
 * The channel media options.
 * Agora supports publishing multiple audio streams and one video stream at the same time and in the same RtcConnection . For example, publishCustomAudioTrack and publishMediaPlayerAudioTrack can be true at the same time;
 * but only one of publishCameraTrack, publishCustomVideoTrack, and publishEncodedVideoTrack can be true at the same time.
 */
export class ChannelMediaOptions {
  /**
   * Whether to publish the video captured by the camera:true: (Default) Publish the video captured by the camera.false: Do not publish the video captured by the camera.
   */
  publishCameraTrack?: boolean;
  /**
   * Whether to publish the video captured by the second camera:true: Publish the video captured by the second camera.false: (Default) Publish the video captured by the second camera.
   */
  publishSecondaryCameraTrack?: boolean;
  /**
   * Whether to publish the audio captured by the microphone:true: (Default) Publish the audio captured by the microphone.false: Do not publish the audio captured by the microphone.Since v4.0.0, the parameter name has been changed from publishAudioTrack to publishMicrophoneTrack.
   */
  publishMicrophoneTrack?: boolean;
  /**
   * Whether to publish the captured video from the screen:true: Publish the captured video from the screen.false: (Default) Do not publish the captured video from the screen.
   */
  publishScreenCaptureVideo?: boolean;
  /**
   * Whether to publish the captured video from the screen:true: Publish the captured video from the screen.false: (Default) Do not publish the captured video from the screen.
   */
  publishScreenCaptureAudio?: boolean;
  /**
   * Whether to publish the captured video from the screen:true: Publish the captured video from the screen.false: (Default) Do not publish the captured video from the screen.
   */
  publishScreenTrack?: boolean;
  /**
   * Whether to publish the captured video from the secondary screen:true: Publish the captured video from the second screen.false: (Default) Do not publish the captured video from the second screen.
   */
  publishSecondaryScreenTrack?: boolean;
  /**
   * Whether to publish the captured audio from a custom source:true: Publish the captured audio from a custom source.false: (Default) Do not publish the captured audio from the custom source.
   */
  publishCustomAudioTrack?: boolean;
  /**
   * The ID of the custom audio source to publish. The default value is 0.If you have set the value of sourceNumber greater than 1 in setExternalAudioSource , the SDK creates the corresponding number of custom audio tracks and assigns an ID to each audio track starting from 0.
   */
  publishCustomAudioSourceId?: number;
  /**
   * Whether to enable AEC when publishing the captured audio from a custom source:true: Enable AEC when publishing the captured audio from a custom source.false: (Default) Do not enable AEC when publishing the captured audio from a custom source.
   */
  publishCustomAudioTrackEnableAec?: boolean;
  /**
   * @ignore
   */
  publishDirectCustomAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishCustomAudioTrackAec?: boolean;
  /**
   * Whether to publish the captured video from a custom source:true: Publish the captured video from a custom source.false: (Default) Do not publish the captured video from the custom source.
   */
  publishCustomVideoTrack?: boolean;
  /**
   * Whether to publish the encoded video:true: Publish the encoded video.false: (Default) Do not publish the encoded video.
   */
  publishEncodedVideoTrack?: boolean;
  /**
   * Whether to publish the audio from the media player:true: Publish the audio from the media player.false: (Default) Do not publish the audio from the media player.
   */
  publishMediaPlayerAudioTrack?: boolean;
  /**
   * Whether to publish the video from the media player:true: Publish the video from the media player.false: (Default) Do not publish the video from the media player.
   */
  publishMediaPlayerVideoTrack?: boolean;
  /**
   * Whether to publish the local transcoded video.true: Publish the local transcoded video.false: (Default) Do not publish the local transcoded video.
   */
  publishTrancodedVideoTrack?: boolean;
  /**
   * Whether to automatically subscribe to all remote audio streams when the user joins a channel:true: (Default) Subscribe to all remote audio streams.false: Do not subscribe to any remote audio stream.
   */
  autoSubscribeAudio?: boolean;
  /**
   * Whether to subscribe to all remote video streams when the user joins the channel:true: (Default) Subscribe to all remote video streams.false: Do not subscribe to any remote video stream.
   */
  autoSubscribeVideo?: boolean;
  /**
   * Whether to enable audio capturing or playback:true: (Default) Enable audio capturing and playback.false: Do not enable audio capturing or playback.
   */
  enableAudioRecordingOrPlayout?: boolean;
  /**
   * The ID of the media player to be published. The default value is 0.
   */
  publishMediaPlayerId?: number;
  /**
   * The user role. See ClientRoleType .
   */
  clientRoleType?: ClientRoleType;
  /**
   * The latency level of an audience member in interactive live streaming. See AudienceLatencyLevelType .
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
  /**
   * The default video-stream type. See VideoStreamType .
   */
  defaultVideoStreamType?: VideoStreamType;
  /**
   * The channel profile. See ChannelProfileType .
   */
  channelProfile?: ChannelProfileType;
  /**
   * @ignore
   */
  audioDelayMs?: number;
  /**
   * @ignore
   */
  mediaPlayerAudioDelayMs?: number;
  /**
   * (Optional) The token generated on your server for authentication. SeeThis parameter takes effect only when calling updateChannelMediaOptions or updateChannelMediaOptionsEx .Ensure that the App ID, channel name, and user name used for creating the token are the same ones as those used by the initialize method for initializing the RTC engine, and those used by the joinChannel [2/2] and joinChannelEx methods for joining the channel.
   */
  token?: string;
  /**
   * @ignore
   */
  enableBuiltInMediaEncryption?: boolean;
  /**
   * Whether to publish the sound of the metronome to remote users:true: (Default) Publish the sound of the metronome. Both the local user and remote users can hear the metronome.false: Do not publish processed audio frames. Only the local user can hear the metronome.
   */
  publishRhythmPlayerTrack?: boolean;
  /**
   * Whether to enable interactive mode:true: Enable interactive mode. Local users receive low-latency and smooth video from remote users.false: (Default) Do not enable interactive mode. Local users receive the video of the remote user with the default settings.This parameter is used to implement the cohost across channels scenario only. The cohosts need to call joinChannelEx method to join the other host's channel as an audience member, and set isInteractiveAudience to true.This parameter takes effect only when the user role is ClientRoleAudience.
   */
  isInteractiveAudience?: boolean;
  /**
   * The video track ID returned by calling the createCustomVideoTrack method. The default value is 0.
   */
  customVideoTrackId?: number;
  /**
   * @ignore
   */
  isAudioFilterable?: boolean;
}

/**
 * The connection mode with the Agora private media server.
 */
export enum LocalProxyMode {
  /**
   * 0: The SDK will first try to connect to the specified Agora private media server; if it cannot connect to the specified Agora private media server, it will connect to the Agora SD-RTN™.
   */
  ConnectivityFirst = 0,
  /**
   * 1: The SDK only tries to connect to the specified Agora private media server.
   */
  LocalOnly = 1,
}

/**
 * @ignore
 */
export enum ProxyType {
  /**
   * @ignore
   */
  NoneProxyType = 0,
  /**
   * @ignore
   */
  UdpProxyType = 1,
  /**
   * @ignore
   */
  TcpProxyType = 2,
  /**
   * @ignore
   */
  LocalProxyType = 3,
  /**
   * @ignore
   */
  TcpProxyAutoFallbackType = 4,
}

/**
 * @ignore
 */
export class LogUploadServerInfo {
  /**
   * @ignore
   */
  serverDomain?: string;
  /**
   * @ignore
   */
  serverPath?: string;
  /**
   * @ignore
   */
  serverPort?: number;
  /**
   * @ignore
   */
  serverHttps?: boolean;
}

/**
 * @ignore
 */
export class AdvancedConfigInfo {
  /**
   * @ignore
   */
  logUploadServer?: LogUploadServerInfo;
}

/**
 * The configurations of the Local Access Point.
 */
export class LocalAccessPointConfiguration {
  /**
   * The list of IP addresses for the Local Access Point. ipList and domainList must be filled in at least one.
   */
  ipList?: string[];
  /**
   * The number of IP addresses of the Local Access Point. This value must be the same as the number of IP addresses that you specify for the ipList parameter.
   */
  ipListSize?: number;
  /**
   * The list of domain names for the Local Access Point. The SDK will parse the IP addresses according to the provided domain names. The parse times out after 10 seconds. ipList and domainList must be filled in at least one. If you specify an IP address and a domain name at the same time, the SDK will combine the IP address parsed from the domain name and the IP address you specify, remove duplicates, and then connect to a random IP to achieve load balancing.
   */
  domainList?: string[];
  /**
   * The number of domain names for Local Access Point. This value must be the same as the number of domain names that you specifyfor the domainList parameter.
   */
  domainListSize?: number;
  /**
   * The domain name used for Intranet certificate verification. If you pass an empty value, the SDK uses the default domain name secure-edge.local for certificate verification.
   */
  verifyDomainName?: string;
  /**
   * The connection mode. See LocalProxyMode .
   */
  mode?: LocalProxyMode;
  /**
   * @ignore
   */
  advancedConfig?: AdvancedConfigInfo;
}

/**
 * The options for leaving a channel.
 */
export class LeaveChannelOptions {
  /**
   * Whether to stop playing and mixing the music file when a user leaves the channel. true: (Default) Stop playing and mixing the music file.false: Do not stop playing and mixing the music file.
   */
  stopAudioMixing?: boolean;
  /**
   * Whether to stop playing all audio effects when a user leaves the channel. true: (Default) Stop playing all audio effects.false: Do not stop playing any audio effect.
   */
  stopAllEffect?: boolean;
  /**
   * Whether to stop microphone recording when a user leaves the channel. true: (Default) Stop microphone recording.false: Do not stop microphone recording.
   */
  stopMicrophoneRecording?: boolean;
}

/**
 * IRtcEngineEventHandlerThe SDK uses the interface to send event notifications to your app. Your app can get those notifications through methods that inherit this interface.
 */
export interface IRtcEngineEventHandler {
  /**
   * Occurs when a user joins a channel.
   * This callback notifies the application that a user joins a specified channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel [2/2] until the SDK triggers this callback.
   */
  onJoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * Occurs when a user rejoins the channel.
   * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
   *
   * @param elapsed Time elapsed (ms) from the local user calling the joinChannel [1/2] or joinChannel [2/2] method until this callback is triggered.
   */
  onRejoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * Reports the proxy connection state.
   * You can use this callback to listen for the state of the SDK connecting to a proxy. For example, when a user calls setCloudProxy and joins a channel successfully, the SDK triggers this callback to report the user ID, the proxy type connected, and the time elapsed fromthe user calling joinChannel [1/2] until this callback is triggered.
   *
   * @param channel The channel name.
   *
   * @param uid The user ID.
   *
   * @param proxyType The proxy type connected. See CloudProxyType .
   *
   * @param localProxyIp Reserved for future use.
   *
   * @param elapsed The time elapsed (ms) from the user calling joinChannel [1/2] until this callback is triggered.
   */
  onProxyConnected?(
    channel: string,
    uid: number,
    proxyType: ProxyType,
    localProxyIp: string,
    elapsed: number
  ): void;

  /**
   * Reports an error during SDK runtime.
   * This callback indicates that an error (concerning network or media) occurs during SDK runtime. In most cases, the SDK cannot fix the issue and resume running. The SDK requires the application to take action or informs the user about the issue.
   *
   * @param err Error code. See ErrorCodeType .
   *
   * @param msg The error message.
   */
  onError?(err: ErrorCodeType, msg: string): void;

  /**
   * Reports the statistics of the audio stream from each remote user.
   * Deprecated:Please use onRemoteAudioStats instead.The SDK triggers this callback once every two seconds to report the audio quality of each remote user/host sending an audio stream. If a channel has multiple users/hosts sending audio streams, the SDK triggers this callback as many times.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The user ID of the remote user sending the audio stream.
   *
   * @param quality Audio quality of the user. QualityUnknown(0): The quality is unknown.QualityExcellent(1): The quality is excellent.QualityGood(2): The network quality seems excellent, but the bitrate can be slightly lower than excellent.QualityPoor(3): Users can feel the communication is slightly impaired.QualityBad(4): Users cannot communicate smoothly.QualityVbad(5): The quality is so bad that users can barely communicate.QualityDown(6): The network is down, and users cannot communicate at all.See QualityType .
   *
   * @param delay The network delay (ms) from the sender to the receiver, including the delay caused by audio sampling pre-processing, network transmission, and network jitter buffering.
   *
   * @param lost The packet loss rate (%) of the audio packet sent from the remote user.
   */
  onAudioQuality?(
    connection: RtcConnection,
    remoteUid: number,
    quality: QualityType,
    delay: number,
    lost: number
  ): void;

  /**
   * Reports the last mile network probe result.
   * The SDK triggers this callback within 30 seconds after the app calls startLastmileProbeTest .
   *
   * @param result The uplink and downlink last-mile network probe test result. See LastmileProbeResult .
   */
  onLastmileProbeResult?(result: LastmileProbeResult): void;

  /**
   * Reports the volume information of users.
   * By default, this callback is disabled. You can enable it by calling enableAudioVolumeIndication . Once this callback is enabled and users send streams in the channel, the SDK triggers the onAudioVolumeIndication callback according to the time interval set in enableAudioVolumeIndication. The SDK triggers two independent onAudioVolumeIndication callbacks simultaneously, which separately report the volume information of the local user who sends a stream and the remote users (up to three) whose instantaneous volume is the highest.Once this callback is enabled, if the local user calls the muteLocalAudioStream method for mute, the SDK continues to report the volume indication of the local user.20 seconds after a remote user whose volume is one of the three highest in the channel stops publishing the audio stream, the callback excludes this user's information; 20 seconds after all remote users stop publishing audio streams, the SDK stops triggering the callback for remote users.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param speakers The volume information of the users. See AudioVolumeInfo . An empty speakers array in the callback indicates that no remote user is in the channel or sending a stream at the moment.
   *
   * @param speakerNumber The total number of users.In the callback for the local user, if the local user is sending streams, the value of speakerNumber is 1.In the callback for remote users, the value range of speakerNumber is [0,3]. If the number of remote users who send streams is greater than or equal to three, the value of speakerNumber is 3.
   *
   * @param totalVolume The volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).In the callback for the local user, totalVolume is the volume of the local user who sends a stream.In the callback for remote users, totalVolume is the sum of the volume of the remote users (up to three) whose instantaneous volume are the highest.
   */
  onAudioVolumeIndication?(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): void;

  /**
   * Occurs when a user leaves a channel.
   * This callback notifies the app that the user leaves the channel by calling leaveChannel . From this callback, the app can get information such as the call duration and quality statistics.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param stats The statistics of the call. See RtcStats .
   */
  onLeaveChannel?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * Reports the statistics of the current call.
   * The SDK triggers this callback once every two seconds after the user joins the channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param stats Statistics of the RTC engine. See RtcStats .
   */
  onRtcStats?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * Occurs when the audio device state changes.
   * This callback notifies the application that the system's audio device state is changed. For example, a headset is unplugged from the device.This method is for Windows and macOS only.
   *
   * @param deviceId The device ID.
   *
   * @param deviceType The evice type. See MediaDeviceType .
   *
   * @param deviceState The device state.On macOS:0: The device is ready for use.8: The device is not connected.On Windows: see MediaDeviceStateType .
   */
  onAudioDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: number
  ): void;

  /**
   * @ignore
   */
  onAudioMixingPositionChanged?(position: number): void;

  /**
   * Occurs when the playback of the local music file finishes.
   * Deprecated:Please use onAudioMixingStateChanged instead.After you call startAudioMixing to play a local music file, this callback occurs when the playback finishes. If the call startAudioMixing fails, the error code WARN_AUDIO_MIXING_OPEN_ERROR is returned.
   */
  onAudioMixingFinished?(): void;

  /**
   * Occurs when the playback of the local music file finishes.
   * This callback occurs when the local audio effect file finishes playing.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   */
  onAudioEffectFinished?(soundId: number): void;

  /**
   * @ignore
   */
  onVideoDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: number
  ): void;

  /**
   * @ignore
   */
  onMediaDeviceChanged?(deviceType: MediaDeviceType): void;

  /**
   * Reports the last mile network quality of each user in the channel.
   * This callback reports the last mile network conditions of each user in the channel. Last mile refers to the connection between the local device and Agora's edge server.The SDK triggers this callback once every two seconds. If a channel includes multiple users, the SDK triggers this callback as many times.txQuality is Unknown when the user is not sending a stream; rxQuality is Unknown when the user is not receiving a stream.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The user ID. The network quality of the user with this user ID is reported.
   *
   * @param txQuality Uplink network quality rating of the user in terms of the transmission bit rate, packet loss rate, average RTT (Round-Trip Time) and jitter of the uplink network. This parameter is a quality rating helping you understand how well the current uplink network conditions can support the selected video encoder configuration. For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution of 640 × 480 and a frame rate of 15 fps in the LIVE_BROADCASTING profile, but may be inadequate for resolutions higher than 1280 × 720.
   *  QualityUnknown(0): The quality is unknown.
   *  QualityExcellent(1): The quality is excellent.
   *  QualityGood(2): The network quality seems excellent, but the bitrate can be slightly lower than excellent.
   *  QualityPoor(3): Users can feel the communication is slightly impaired.
   *  QualityBad(4): Users cannot communicate smoothly.
   *  QualityVbad(5): The quality is so bad that users can barely communicate.
   *  QualityDown(6): The network is down, and users cannot communicate at all.
   *
   * @param rxQuality Downlink network quality rating of the user in terms of packet loss rate, average RTT, and jitter of the downlink network.
   *  QualityUnknown(0): The quality is unknown.
   *  QualityExcellent(1): The quality is excellent.
   *  QualityGood(2): The network quality seems excellent, but the bitrate can be slightly lower than excellent.
   *  QualityPoor(3): Users can feel the communication is slightly impaired.
   *  QualityBad(4): Users cannot communicate smoothly.
   *  QualityVbad(5): The quality is so bad that users can barely communicate.
   *  QualityDown(6): The network is down, and users cannot communicate at all.
   */
  onNetworkQuality?(
    connection: RtcConnection,
    remoteUid: number,
    txQuality: QualityType,
    rxQuality: QualityType
  ): void;

  /**
   * @ignore
   */
  onIntraRequestReceived?(connection: RtcConnection): void;

  /**
   * Occurs when the uplink network information changes.
   * The SDK triggers this callback when the uplink network information changes.This callback only applies to scenarios where you push externally encoded video data in H.264 format to the SDK.
   *
   * @param info The uplink network information. See UplinkNetworkInfo .
   */
  onUplinkNetworkInfoUpdated?(info: UplinkNetworkInfo): void;

  /**
   * @ignore
   */
  onDownlinkNetworkInfoUpdated?(info: DownlinkNetworkInfo): void;

  /**
   * Reports the last-mile network quality of the local user.
   * This callback reports the last-mile network conditions of the local user before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server.Before the user joins the channel, this callback is triggered by the SDK once startLastmileProbeTest is called and reports the last-mile network conditions of the local user.
   *
   * @param quality The last-mile network quality.
   *  QualityUnknown(0): The quality is unknown.
   *  QualityExcellent(1): The quality is excellent.
   *  QualityGood(2): The network quality seems excellent, but the bitrate can be slightly lower than excellent.
   *  QualityPoor(3): Users can feel the communication is slightly impaired.
   *  QualityBad(4): Users cannot communicate smoothly.
   *  QualityVbad(5): The quality is so bad that users can barely communicate.
   *  QualityDown(6): The network is down, and users cannot communicate at all.
   *  See QualityType .
   */
  onLastmileQuality?(quality: QualityType): void;

  /**
   * Occurs when the first local video frame is displayed on the local video view.
   * The SDK triggers this callback when the first local video frame is displayed on the local video view.
   *
   * @param source The capture type of the custom video source. See VideoSourceType .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param width The width (px) of the first local video frame.
   *
   * @param height The height (px) of the first local video frame.
   *
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel [2/2] until the SDK triggers this callback. If you call startPreview before calling joinChannel [2/2], then this parameter is the time elapsed from calling the startPreview method until the SDK triggers this callback.
   */
  onFirstLocalVideoFrame?(
    connection: RtcConnection,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the first video frame is published.
   * The SDK triggers this callback under one of the following circumstances:The local client enables the video module and calls joinChannel [2/2] successfully.The local client calls muteLocalVideoStream (true) and muteLocalVideoStream(false) in sequence.The local client calls disableVideo and enableVideo in sequence.
   *
   * @param source The capture type of the custom video source. See VideoSourceType .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel [2/2] until the SDK triggers this callback.
   */
  onFirstLocalVideoFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * Occurs when the first remote video frame is received and decoded.
   * The SDK triggers this callback under one of the following circumstances:The remote user joins the channel and sends the video stream.The remote user stops sending the video stream and re-sends it after 15 seconds. Reasons for such an interruption include:The remote user leaves the channel.The remote user drops offline.The remote user calls muteLocalVideoStream to stop sending the video stream.The remote user calls disableVideo to disable video.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user sending the video stream.
   *
   * @param width The width (px) of the video stream.
   *
   * @param height The height (px) of the video stream.
   *
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel [2/2] until the SDK triggers this callback.
   */
  onFirstRemoteVideoDecoded?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the video size or rotation of a specified user changes.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param sourceType The capture type of the custom video source. See VideoSourceType .
   *
   * @param uid The ID of the user whose video size or rotation changes. (The uid for the local user is 0. The video is the local user's video preview).
   *
   * @param width The width (pixels) of the video stream.
   *
   * @param height The height (pixels) of the video stream.
   *
   * @param rotation The rotation information. The value range is [0,360).
   */
  onVideoSizeChanged?(
    connection: RtcConnection,
    sourceType: VideoSourceType,
    uid: number,
    width: number,
    height: number,
    rotation: number
  ): void;

  /**
   * Occurs when the local video stream state changes.
   * When the state of the local video stream changes (including the state of the video capture and encoding), the SDK triggers this callback to report the current state. This callback indicates the state of the local video stream, including camera capturing and video encoding, and allows you to troubleshoot issues when exceptions occur.The SDK triggers the onLocalVideoStateChanged callback with the state code of LocalVideoStreamStateFailed and error code of LocalVideoStreamErrorCaptureFailure in the following situations:The app switches to the background, and the system gets the camera resource.The camera starts normally, but does not output video frames for four consecutive seconds.When the camera outputs the captured video frames, if the video frames are the same for 15 consecutive frames, the SDK triggers the onLocalVideoStateChanged callback with the state code of LocalVideoStreamStateCapturing and error code of LocalVideoStreamErrorCaptureFailure. Note that the video frame duplication detection is only available for video frames with a resolution greater than 200 × 200, a frame rate greater than or equal to 10 fps, and a bitrate less than 20 Kbps.For some device models, the SDK does not trigger this callback when the state of the local video changes while the local video capturing device is in use, so you have to make your own timeout judgment.
   *
   * @param source The capture type of the custom video source. See VideoSourceType .
   *
   * @param state The state of the local video, see LocalVideoStreamState .
   *
   * @param error The detailed error information, see LocalVideoStreamError .
   */
  onLocalVideoStateChanged?(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    error: LocalVideoStreamError
  ): void;

  /**
   * Occurs when the remote video stream state changes.
   * This callback does not work properly when the number of users (in the communication profile) or hosts (in the live streaming channel) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user whose video state changes.
   *
   * @param state The state of the remote video, see RemoteVideoState .
   *
   * @param reason The reason for the remote video state change, see RemoteVideoStateReason .
   *
   * @param elapsed Time elapsed (ms) from the local user calling the joinChannel [2/2] method until the SDK triggers this callback.
   */
  onRemoteVideoStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ): void;

  /**
   * Occurs when the renderer receives the first frame of the remote video.
   *
   * @param remoteUid The ID of the remote user sending the video stream.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param width The width (px) of the video stream.
   *
   * @param height The height (px) of the video stream.
   *
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel [2/2] until the SDK triggers this callback.
   */
  onFirstRemoteVideoFrame?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when a remote user (COMMUNICATION)/ host (LIVE_BROADCASTING) joins the channel.
   * In a communication channel, this callback indicates that a remote user joins the channel. The SDK also triggers this callback to report the existing users in the channel when a user joins the channel.In a live-broadcast channel, this callback indicates that a host joins the channel. The SDK also triggers this callback to report the existing hosts in the channel when a host joins the channel. Agora recommends limiting the number of hosts to 17.The SDK triggers this callback under one of the following circumstances:A remote user/host joins the channel by calling the joinChannel [2/2] method.A remote user switches the user role to the host after joining the channel.A remote user/host rejoins the channel after a network interruption.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the user or host who joins the channel.
   *
   * @param elapsed Time delay (ms) from the local user calling joinChannel [2/2] until this callback is triggered.
   */
  onUserJoined?(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void;

  /**
   * Occurs when a remote user (in the communication profile)/ host (in the live streaming profile) leaves the channel.
   * There are two reasons for users to become offline:Leave the channel: When a user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections. It's recommended to use the Agora RTM SDK for reliable offline detection.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the user who leaves the channel or goes offline.
   *
   * @param reason Reasons why the user goes offline: UserOfflineReasonType .
   */
  onUserOffline?(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void;

  /**
   * Occurs when a remote user (in the communication profile) or a host (in the live streaming profile) stops/resumes sending the audio stream.
   * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the muteLocalAudioStream method.This callback does not work properly when the number of users (in the communication profile) or hosts (in the live streaming channel) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The user ID.
   *
   * @param muted Whether the remote user's audio stream is muted/unmuted:true: User's audio stream is muted.false: User's audio stream is unmuted.
   */
  onUserMuteAudio?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * Occurs when a remote user stops/resumes publishing the video stream.
   * When a remote user calls muteLocalVideoStream to stop or resume publishing the video stream, the SDK triggers this callback to report the state of the remote user's publishing stream to the local user.This callback can be inaccurate when the number of users (in the communication profile) or hosts (in the live streaming profile) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The user ID of the remote user.
   *
   * @param muted Whether the remote user stops publishing the video stream:true: The remote user stops publishing the video stream.false: The remote user resumes publishing the video stream.
   */
  onUserMuteVideo?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * Occurs when a remote user enables/disables the video module.
   * Once the video module is disabled, the user can only use a voice call. The user cannot send or receive any video.The SDK triggers this callback when a remote user enables or disables the video module by calling the enableVideo or disableVideo method.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The user ID of the remote user.
   *
   * @param enabled true: Enable.false: Disable.
   */
  onUserEnableVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /**
   * @ignore
   */
  onUserStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: number
  ): void;

  /**
   * Occurs when a specific remote user enables/disables the local video capturing function.
   * The SDK triggers this callback when the remote user resumes or stops capturing the video stream by calling the enableLocalVideo method.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The user ID of the remote user.
   *
   * @param enabled Whether the specified remote user enables/disables the local video capturing function:true: Enable. Other users in the channel can see the video of this remote user.false: Disable. Other users in the channel can no longer receive the video stream from this remote user, while this remote user can still receive the video streams from other users.
   */
  onUserEnableLocalVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /**
   * Occurs when a method is executed by the SDK.
   *
   * @param err The error code returned by the SDK when the method call fails. If the SDK returns 0, then the method call is successful.
   *
   * @param api The method executed by the SDK.
   *
   * @param result The result of the method call.
   */
  onApiCallExecuted?(err: ErrorCodeType, api: string, result: string): void;

  /**
   * Reports the statistics of the local audio stream.
   * The SDK triggers this callback once every two seconds.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param stats Local audio statistics. See LocalAudioStats .
   */
  onLocalAudioStats?(connection: RtcConnection, stats: LocalAudioStats): void;

  /**
   * Reports the statistics of the audio stream sent by each remote users.
   * The SDK triggers this callback once every two seconds. If a channel includes multiple users, the SDK triggers this callback as many times.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param stats Statistics of the received remote audio stream. See RemoteAudioStats .
   */
  onRemoteAudioStats?(connection: RtcConnection, stats: RemoteAudioStats): void;

  /**
   * Reports the statistics of the local video stream.
   * The SDK triggers this callback once every two seconds to report the statistics of the local video stream.
   *
   * @param source The capture type of the custom video source. See VideoSourceType .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param stats The statistics of the local video stream. See LocalVideoStats .
   */
  onLocalVideoStats?(connection: RtcConnection, stats: LocalVideoStats): void;

  /**
   * Reports the statistics of the video stream sent by each remote users.
   * Reports the statistics of the video stream from the remote users. The SDK triggers this callback once every two seconds for each remote user. If a channel has multiple users/hosts sending video streams, the SDK triggers this callback as many times.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param stats Statistics of the remote video stream.
   */
  onRemoteVideoStats?(connection: RtcConnection, stats: RemoteVideoStats): void;

  /**
   * Occurs when the camera turns on and is ready to capture the video.
   * Deprecated:Please use LocalVideoStreamStateCapturing(1) in onLocalVideoStateChanged instead.This callback indicates that the camera has been successfully turned on and you can start to capture video.
   */
  onCameraReady?(): void;

  /**
   * Occurs when the camera focus area changes.
   * The SDK triggers this callback when the local user changes the camera focus position by calling setCameraFocusPositionInPreview .
   *
   * @param x The x-coordinate of the changed focus area.
   *
   * @param y The y-coordinate of the changed focus area.
   *
   * @param width The width of the focus area that changes.
   *
   * @param height The height of the focus area that changes.
   */
  onCameraFocusAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * Occurs when the camera exposure area changes.
   * The SDK triggers this callback when the local user changes the camera exposure position by calling setCameraExposurePosition .
   *
   * @param x The x coordinate of the changed camera exposure area.
   *
   * @param y The y coordinate of the changed camera exposure area.
   *
   * @param width The width of the changed camera exposure area.
   *
   * @param height The height of the changed exposure area.
   */
  onCameraExposureAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * Reports the face detection result of the local user.
   * Once you enable face detection by calling enableFaceDetection (true), you can get the following information on the local user in real-time:The width and height of the local video.The position of the human face in the local view.The distance between the human face and the screen.This value is based on the fitting calculation of the local video size and the position of the human face.When it is detected that the face in front of the camera disappears, the callback will be triggered immediately. When no human face is detected, the frequency of this callback to be rtriggered wil be decreased to reduce power consumption on the local device.The SDK stops triggering this callback when a human face is in close proximity to the screen.
   *
   * @param imageWidth The width (px) of the video image captured by the local camera.
   *
   * @param imageHeight The height (px) of the video image captured by the local camera.
   *
   * @param vecRectangle The information of the detected human face. See Rectangle .
   *
   * @param vecDistance The distance between the human face and the device screen (cm).
   *
   * @param numFaces The number of faces detected. If the value is 0, it means that no human face is detected.
   */
  onFacePositionChanged?(
    imageWidth: number,
    imageHeight: number,
    vecRectangle: Rectangle,
    vecDistance: number,
    numFaces: number
  ): void;

  /**
   * Occurs when the video stops playing.
   * Deprecated:Use LocalVideoStreamStateStopped(0) in the onLocalVideoStateChanged callback instead.The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops playing.
   */
  onVideoStopped?(): void;

  /**
   * Occurs when the playback state of the music file changes.
   * This callback occurs when the playback state of the music file changes, and reports the current state and error code.
   *
   * @param state The playback state of the music file. See AudioMixingStateType .
   *
   * @param reason Error code. See AudioMixingReasonType .
   */
  onAudioMixingStateChanged?(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ): void;

  /**
   * @ignore
   */
  onRhythmPlayerStateChanged?(
    state: RhythmPlayerStateType,
    errorCode: RhythmPlayerErrorType
  ): void;

  /**
   * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
   * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling the joinChannel [2/2] method, regardless of whether it is in the channel. If the SDK fails to rejoin the channel within 20 minutes after disconnecting, the SDK will stop trying to reconnect.
   *
   * @param connection The connection information. See RtcConnection .
   */
  onConnectionLost?(connection: RtcConnection): void;

  /**
   * Occurs when the connection between the SDK and the server is interrupted.
   * Deprecated:Use onConnectionStateChanged instead.The SDK triggers this callback when it loses connection with the server for more than four seconds after the connection is established. After triggering this callback, the SDK tries to reconnect to the server. You can use this callback to implement pop-up reminders. The difference between this callback and onConnectionLost is:The SDK triggers the onConnectionInterrupted callback when it loses connection with the server for more than four seconds after it successfully joins the channel.The SDK triggers the onConnectionLost callback when it loses connection with the server for more than 10 seconds, whether or not it joins the channel.If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
   *
   * @param connection The connection information. See RtcConnection .
   */
  onConnectionInterrupted?(connection: RtcConnection): void;

  /**
   * Occurs when the connection is banned by the Agora server.
   * Deprecated:Please use onConnectionStateChanged instead.
   *
   * @param connection The connection information. See RtcConnection .
   */
  onConnectionBanned?(connection: RtcConnection): void;

  /**
   * Occurs when the local user receives the data stream from the remote user.
   * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the sendStreamMessage method.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user sending the message.
   *
   * @param streamId The stream ID of the received message.
   *
   * @param data received data.
   *
   * @param length The data length (byte).
   *
   * @param sentTs The time when the data stream is sent.
   */
  onStreamMessage?(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    data: Uint8Array,
    length: number,
    sentTs: number
  ): void;

  /**
   * Occurs when the local user does not receive the data stream from the remote user.
   * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the sendStreamMessage method.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user sending the message.
   *
   * @param streamId The stream ID of the received message.
   *
   * @param code The error code.
   *
   * @param missed The number of lost messages.
   *
   * @param cached Number of incoming cached messages when the data stream is interrupted.
   */
  onStreamMessageError?(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    code: ErrorCodeType,
    missed: number,
    cached: number
  ): void;

  /**
   * Occurs when the token expires.
   * When the token expires during a call, the SDK triggers this callback to remind the app to renew the token.Once you receive this callback, generate a new token on your app server, and call joinChannel [2/2] to rejoin the channel.
   *
   * @param connection The connection information. See RtcConnection .
   */
  onRequestToken?(connection: RtcConnection): void;

  /**
   * Occurs when the token expires in 30 seconds.
   * When the token is about to expire in 30 seconds, the SDK triggers this callback to remind the app to renew the token.Upon receiving this callback, generate a new token on your server, and call renewToken to pass the new token to the SDK.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param token The token that expires in 30 seconds.
   */
  onTokenPrivilegeWillExpire?(connection: RtcConnection, token: string): void;

  /**
   * @ignore
   */
  onLicenseValidationFailure?(
    connection: RtcConnection,
    reason: LicenseErrorType
  ): void;

  /**
   * Occurs when the first audio frame is published.
   * The SDK triggers this callback under one of the following circumstances:The local client enables the audio module and calls joinChannel [2/2] successfully.The local client calls muteLocalAudioStream (true) and muteLocalAudioStream(false) in sequence.The local client calls disableAudio and enableAudio in sequence.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel [2/2] until the SDK triggers this callback.
   */
  onFirstLocalAudioFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * Occurs when the first audio frame sent by a specified remote user is received.
   * Deprecated:Use onRemoteAudioStateChanged instead.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param userId The ID of the remote user sending the audio frames.
   *
   * @param elapsed The time elapsed (ms) from the local user calling the joinChannel [2/2] method until the SDK triggers this callback.
   */
  onFirstRemoteAudioFrame?(
    connection: RtcConnection,
    userId: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the SDK decodes the first remote audio frame for playback.
   * Deprecated:Use onRemoteAudioStateChanged instead.The SDK triggers this callback under one of the following circumstances:The remote user joins the channel and sends the audio stream.The remote user stops sending the audio stream and re-sends it after 15 seconds, and the possible reasons include:The remote user leaves the channel.The remote user is offline.The remote user calls muteLocalAudioStream to stop sending the video stream.The remote user calls disableAudio to disable video.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param uid The user ID of the remote user.
   *
   * @param elapsed The time elapsed (ms) from the local user calling the joinChannel [2/2] method until the SDK triggers this callback.
   */
  onFirstRemoteAudioDecoded?(
    connection: RtcConnection,
    uid: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the local audio stream state changes.
   * When the state of the local audio stream changes (including the state of the audio capture and encoding), the SDK triggers this callback to report the current state. This callback indicates the state of the local audio stream, and allows you to troubleshoot issues when audio exceptions occur.When the state is LocalAudioStreamStateFailed (3), you can view the error information in the error parameter.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param state The state of the local audio. See LocalAudioStreamState .
   *
   * @param error Local audio state error codes. See LocalAudioStreamError .
   */
  onLocalAudioStateChanged?(
    connection: RtcConnection,
    state: LocalAudioStreamState,
    error: LocalAudioStreamError
  ): void;

  /**
   * Occurs when the remote audio state changes.
   * When the audio state of a remote user (in a voice/video call channel) or host (in a live streaming channel) changes, the SDK triggers this callback to report the current state of the remote audio stream.This callback does not work properly when the number of users (in the communication profile) or hosts (in the live streaming channel) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user whose audio state changes.
   *
   * @param state The state of the remote audio. See RemoteAudioState .
   *
   * @param reason The reason of the remote audio state change. See RemoteAudioStateReason .
   *
   * @param elapsed Time elapsed (ms) from the local user calling the joinChannel [2/2] method until the SDK triggers this callback.
   */
  onRemoteAudioStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteAudioState,
    reason: RemoteAudioStateReason,
    elapsed: number
  ): void;

  /**
   * Occurs when the most active remote speaker is detected.
   * After a successful call of enableAudioVolumeIndication , the SDK continuously detects which remote user has the loudest volume. During the current period, the remote user, who is detected as the loudest for the most times, is the most active user.When the number of users is no less than two and an active remote speaker exists, the SDK triggers this callback and reports the uid of the most active remote speaker.If the most active remote speaker is always the same user, the SDK triggers the onActiveSpeaker callback only once.If the most active remote speaker changes to another user, the SDK triggers this callback again and reports the uid of the new active remote speaker.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param uid The user ID of the most active remote speaker.
   */
  onActiveSpeaker?(connection: RtcConnection, uid: number): void;

  /**
   * Reports the result of video content moderation.
   * After calling enableContentInspect to enable the video content moderation, and setting the type parameter in ContentInspectConfig toContentInspectModeration, the SDK triggers the onContentInspectResult callback and reports the result of video content moderation.
   *
   * @param result The results of video content moderation. See ContentInspectResult .
   */
  onContentInspectResult?(result: ContentInspectResult): void;

  /**
   * Reports the result of taking a video snapshot.
   * After a successful takeSnapshot method call, the SDK triggers this callback to report whether the snapshot is successfully taken, as well as the details for that snapshot.
   *
   * @param uid The user ID. A uid of 0 indicates the local user.
   *
   * @param filePath The local path of the snapshot.
   *
   * @param width The width (px) of the snapshot.
   *
   * @param height The height (px) of the snapshot.
   *
   * @param errCode The message that confirms success or gives the reason why the snapshot is not successfully taken:0: Success.< 0: Failure:-1: The SDK fails to write data to a file or encode a JPEG image.-2: The SDK does not find the video stream of the specified user within one second after the takeSnapshot method call succeeds.-3: Calling the takeSnapshot method too frequently.
   */
  onSnapshotTaken?(
    connection: RtcConnection,
    uid: number,
    filePath: string,
    width: number,
    height: number,
    errCode: number
  ): void;

  /**
   * Occurs when the user role switches in the interactive live streaming.
   * The SDK triggers this callback when the local user switches the user role by calling setClientRole after joining the channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param oldRole Role that the user switches from:
   *  ClientRoleBroadcaster(1): Host.
   *  ClientRoleAudience(2): Audience.
   *  ClientRoleType .
   *
   * @param newRole Role that the user switches to:
   *  ClientRoleBroadcaster(1): Host.
   *  ClientRoleAudience(2): Audience.
   *  ClientRoleType .
   */
  onClientRoleChanged?(
    connection: RtcConnection,
    oldRole: ClientRoleType,
    newRole: ClientRoleType,
    newRoleOptions: ClientRoleOptions
  ): void;

  /**
   * Occurs when the user role switch fails in the interactive live streaming.
   * In the live broadcasting channel profile, when the local user calls setClientRole [1/2] to switch their user role after joining the channel but the switch fails, the SDK triggers this callback to report the reason for the failure and the current user role.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param reason The reason for a user role switch failure. See ClientRoleChangeFailedReason .
   *
   * @param currentRole Current user role. See ClientRoleType .
   */
  onClientRoleChangeFailed?(
    connection: RtcConnection,
    reason: ClientRoleChangeFailedReason,
    currentRole: ClientRoleType
  ): void;

  /**
   * @ignore
   */
  onAudioDeviceVolumeChanged?(
    deviceType: MediaDeviceType,
    volume: number,
    muted: boolean
  ): void;

  /**
   * Occurs when the media push state changes.
   * When the media push state changes, the SDK triggers this callback and reports the URL address and the current state of the media push. This callback indicates the state of the media push. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the error code parameter.
   *
   * @param url The URL address where the state of the media push changes.
   *
   * @param state The current state of the media push. See RtmpStreamPublishState .
   *
   * @param errCode The detailed error information for the media push. See RtmpStreamPublishErrorType .
   */
  onRtmpStreamingStateChanged?(
    url: string,
    state: RtmpStreamPublishState,
    errCode: RtmpStreamPublishErrorType
  ): void;

  /**
   * Reports events during the media push.
   *
   * @param url The URL of media push.
   *
   * @param eventCode The event code of media push. See RtmpStreamingEvent .
   */
  onRtmpStreamingEvent?(url: string, eventCode: RtmpStreamingEvent): void;

  /**
   * Occurs when the publisher's transcoding is updated.
   * When the LiveTranscoding class in the setLiveTranscoding method updates, the SDK triggers the onTranscodingUpdated callback to report the update information.If you call the setLiveTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
   */
  onTranscodingUpdated?(): void;

  /**
   * Occurs when the local audio route changes.
   *
   * @param routing The current audio routing.
   *  (-1): Default audio route.(0): The audio route is a headset with a microphone.(1): The audio route is an earpiece.2: The audio route is a headset without a microphone.3: The audio route is the speaker that comes with the device.4: The audio route is an external speaker. (iOS and macOS only)(5): The audio route is a Bluetooth headset.
   */
  onAudioRoutingChanged?(routing: number): void;

  /**
   * Occurs when the state of the media stream relay changes.
   * The SDK returns the state of the current media relay with any error message.
   *
   * @param state The state code. See ChannelMediaRelayState .
   *
   * @param code The error code of the channel media relay. See ChannelMediaRelayError .
   */
  onChannelMediaRelayStateChanged?(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void;

  /**
   * Reports events during the media stream relay.
   *
   * @param code The event code of channel media relay. See ChannelMediaRelayEvent .
   */
  onChannelMediaRelayEvent?(code: ChannelMediaRelayEvent): void;

  /**
   * @ignore
   */
  onLocalPublishFallbackToAudioOnly?(isFallbackOrRecover: boolean): void;

  /**
   * @ignore
   */
  onRemoteSubscribeFallbackToAudioOnly?(
    uid: number,
    isFallbackOrRecover: boolean
  ): void;

  /**
   * Reports the transport-layer statistics of each remote audio stream.
   * Deprecated:Please use onRemoteAudioStats instead.This callback reports the transport-layer statistics, such as the packet loss rate and network time delay, once every two seconds after the local user receives an audio packet from a remote user. During a call, when the user receives the video packet sent by the remote user/host, the callback is triggered every 2 seconds.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user sending the audio packets.
   *
   * @param delay The network delay (ms) from the sender to the receiver.
   *
   * @param lost The packet loss rate (%) of the audio packet sent from the remote user.
   *
   * @param rxKBitRate The bitrate of the received audio (Kbps).
   */
  onRemoteAudioTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /**
   * Reports the transport-layer statistics of each remote video stream.
   * Deprecated:This callback is deprecated; use onRemoteVideoStats instead.This callback reports the transport-layer statistics, such as the packet loss rate and network time delay, once every two seconds after the local user receives a video packet from a remote user.During a call, when the user receives the video packet sent by the remote user/host, the callback is triggered every 2 seconds.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param remoteUid The ID of the remote user sending the video packets.
   *
   * @param delay The network delay (ms) from the sender to the receiver.
   *
   * @param lost The packet loss rate (%) of the video packet sent from the remote user.
   *
   * @param rxKBitRate The bitrate of the received video (Kbps).
   */
  onRemoteVideoTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /**
   * Occurs when the network connection state changes.
   * When the network connection state changes, the SDK triggers this callback and reports the current connection state and the reason for the change.
   *
   * @param state The current connection state.
   *
   * @param reason The reason for a connection state change.
   */
  onConnectionStateChanged?(
    connection: RtcConnection,
    state: ConnectionStateType,
    reason: ConnectionChangedReasonType
  ): void;

  /**
   * @ignore
   */
  onWlAccMessage?(
    connection: RtcConnection,
    reason: WlaccMessageReason,
    action: WlaccSuggestAction,
    wlAccMsg: string
  ): void;

  /**
   * @ignore
   */
  onWlAccStats?(
    connection: RtcConnection,
    currentStats: WlAccStats,
    averageStats: WlAccStats
  ): void;

  /**
   * Occurs when the local network type changes.
   * This callback occurs when the connection state of the local user changes. You can get the connection state and reason for the state change in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param type Network types: See NetworkType .
   */
  onNetworkTypeChanged?(connection: RtcConnection, type: NetworkType): void;

  /**
   * Reports the built-in encryption errors.
   * When encryption is enabled by calling enableEncryption , the SDK triggers this callback if an error occurs in encryption or decryption on the sender or the receiver side.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param errorType
   */
  onEncryptionError?(
    connection: RtcConnection,
    errorType: EncryptionErrorType
  ): void;

  /**
   * Occurs when the SDK cannot get the device permission.
   * When the SDK fails to get the device permission, the SDK triggers this callback to report which device permission cannot be got.
   *
   * @param permissionType The type of the device permission. See PermissionType .
   */
  onPermissionError?(permissionType: PermissionType): void;

  /**
   * Occurs when the local user registers a user account.
   * After the local user successfully calls registerLocalUserAccount to register the user account or calls joinChannelWithUserAccount to join a channel, the SDK triggers the callback and informs the local user's UID and User Account.
   *
   * @param uid The ID of the local user.
   *
   * @param userAccount The user account of the local user.
   */
  onLocalUserRegistered?(uid: number, userAccount: string): void;

  /**
   * Occurs when the SDK gets the user ID and user account of the remote user.
   * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object, and triggers this callback on the local client.
   *
   * @param uid The user ID of the remote user.
   *
   * @param info The UserInfo object that contains the user ID and user account of the remote user. See UserInfo for details.
   */
  onUserInfoUpdated?(uid: number, info: UserInfo): void;

  /**
   * @ignore
   */
  onUploadLogResult?(
    connection: RtcConnection,
    requestId: string,
    success: boolean,
    reason: UploadErrorReason
  ): void;

  /**
   * Occurs when the audio subscribing state changes.
   *
   * @param channel The channel name.
   *
   * @param uid The user ID of the remote user.
   *
   * @param oldState The previous subscribing status, see StreamSubscribeState for details.
   *
   * @param newState The current subscribing status, see StreamSubscribeState for details.
   *
   * @param elapseSinceLastState The time elapsed (ms) from the previous state to the current state.
   */
  onAudioSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /**
   * Occurs when the video subscribing state changes.
   *
   * @param channel The channel name.
   *
   * @param uid The ID of the remote user.
   *
   * @param oldState The previous subscribing status, see StreamSubscribeState for details.
   *
   * @param newState The current subscribing status, see StreamSubscribeState for details.
   *
   * @param elapseSinceLastState The time elapsed (ms) from the previous state to the current state.
   */
  onVideoSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /**
   * Occurs when the audio publishing state changes.
   *
   * @param channel The channel name.
   *
   * @param oldState The previous subscribing status. See StreamPublishState .
   *
   * @param newState The current subscribing status. See StreamPublishState.
   *
   * @param elapseSinceLastState The time elapsed (ms) from the previous state to the current state.
   */
  onAudioPublishStateChanged?(
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /**
   * Occurs when the video publishing state changes.
   *
   * @param channel The channel name.
   *
   * @param source The capture type of the custom video source. See VideoSourceType .
   *
   * @param oldState For the previous publishing state, see StreamPublishState .
   *
   * @param newState For the current publishing state, see StreamPublishState.
   *
   * @param elapseSinceLastState The time elapsed (ms) from the previous state to the current state.
   */
  onVideoPublishStateChanged?(
    source: VideoSourceType,
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /**
   * The event callback of the extension.
   * To listen for events while the extension is running, you need to register this callback.
   *
   * @param value The value of the extension key.
   *
   * @param key The key of the extension.
   *
   * @param provider The name of the extension provider.
   *
   * @param extension The name of the extension.
   */
  onExtensionEvent?(
    provider: string,
    extension: string,
    key: string,
    value: string
  ): void;

  /**
   * Occurs when the extension is enabled.
   * After a successful call of enableExtension (true), the extension triggers this callback.
   *
   * @param provider The name of the extension provider.
   *
   * @param extension The name of the extension.
   */
  onExtensionStarted?(provider: string, extension: string): void;

  /**
   * Occurs when the extension is disabled.
   * After a successful call of enableExtension (false), this callback is triggered.
   *
   * @param extension The name of the extension.
   *
   * @param provider The name of the extension provider.
   */
  onExtensionStopped?(provider: string, extension: string): void;

  /**
   * Occurs when the extension runs incorrectly.
   * When calling enableExtension (true) fails or the extension runs in error, the extension triggers this callback and reports the error code and reason.
   *
   * @param provider The name of the extension provider.
   *
   * @param extension The name of the extension.
   *
   * @param error Error code. For details, see the extension documentation provided by the extension provider.
   *
   * @param message Reason. For details, see the extension documentation provided by the extension provider.
   */
  onExtensionError?(
    provider: string,
    extension: string,
    error: number,
    message: string
  ): void;

  /**
   * @ignore
   */
  onUserAccountUpdated?(
    connection: RtcConnection,
    remoteUid: number,
    userAccount: string
  ): void;
}

/**
 * Video device management methods.
 */
export abstract class IVideoDeviceManager {
  /**
   * @ignore
   */
  abstract enumerateVideoDevices(): VideoDeviceInfo[];

  /**
   * @ignore
   */
  abstract setDevice(deviceIdUTF8: string): number;

  /**
   * @ignore
   */
  abstract getDevice(): string;

  /**
   * @ignore
   */
  abstract numberOfCapabilities(deviceIdUTF8: string): number;

  /**
   * @ignore
   */
  abstract getCapability(
    deviceIdUTF8: string,
    deviceCapabilityNumber: number
  ): VideoFormat;

  /**
   * @ignore
   */
  abstract startDeviceTest(hwnd: any): number;

  /**
   * @ignore
   */
  abstract stopDeviceTest(): number;

  /**
   * @ignore
   */
  abstract release(): void;
}

/**
 * Configurations for the RtcEngineContext instance.
 */
export class RtcEngineContext {
  /**
   * The App ID issued by Agora for your project. Only users in apps with the same App ID can join the same channel and communicate with each other. An App ID can only be used to create one IRtcEngine instance. To change your App ID, call release to destroy the current IRtcEngine instance, and then create a new one.
   */
  appId?: string;
  /**
   * The channel profile. See ChannelProfileType .
   */
  channelProfile?: ChannelProfileType;
  /**
   * @ignore
   */
  license?: string;
  /**
   * The audio scenarios. See AudioScenarioType . Under different audio scenarios, the device uses different volume types.
   */
  audioScenario?: AudioScenarioType;
  /**
   * The region for connection. This is an advanced feature and applies to scenarios that have regional restrictions.  The area codes support bitwise operation.
   */
  areaCode?: number;
  /**
   * The SDK log files are: agorasdk.log, agorasdk.1.log, agorasdk.2.log, agorasdk.3.log, and agorasdk.4.log.
   * The API call log files are: agoraapi.log, agoraapi.1.log, agoraapi.2.log, agoraapi.3.log, and agoraapi.4.log.
   * The default size for each SDK log file is 1,024 KB; the default size for each API call log file is 2,048 KB. These log files are encoded in UTF-8.
   * The SDK writes the latest logs in agorasdk.log or agoraapi.log.
   * When agorasdk.log is full, the SDK processes the log files in the following order:
   * Delete the agorasdk.4.log file (if any).
   * Rename agorasdk.3.log to agorasdk.4.log.
   * Rename agorasdk.2.log to agorasdk.3.log.
   * Rename agorasdk.1.log to agorasdk.2.log.
   * Create a new agorasdk.log file. The overwrite rules for the agoraapi.log file are the same as for agorasdk.log. The log files that the SDK outputs. See LogConfig .By default, the SDK generates five SDK log files and five API call log files with the following rules:
   */
  logConfig?: LogConfig;
  /**
   * @ignore
   */
  threadPriority?: ThreadPriorityType;
  /**
   * @ignore
   */
  useExternalEglContext?: boolean;
}

/**
 * Metadata type of the observer. We only support video metadata for now.
 */
export enum MetadataType {
  /**
   * The type of metadata is unknown.
   */
  UnknownMetadata = -1,
  /**
   * The type of metadata is video.
   */
  VideoMetadata = 0,
}

/**
 * @ignore
 */
export enum MaxMetadataSizeType {
  /**
   * @ignore
   */
  InvalidMetadataSizeInByte = -1,
  /**
   * @ignore
   */
  DefaultMetadataSizeInByte = 512,
  /**
   * @ignore
   */
  MaxMetadataSizeInByte = 1024,
}

/**
 * Media metadata.
 */
export class Metadata {
  /**
   * The user ID.For the recipient:the ID of the remote user who sent the Metadata.Ignore it for sender.
   */
  uid?: number;
  /**
   * Buffer size for received or sent Metadata.
   */
  size?: number;
  /**
   * The buffer address of the received or sent Metadata.
   */
  buffer?: Uint8Array;
  /**
   * The timestamp (ms) of Metadata.
   */
  timeStampMs?: number;
}

/**
 * The metadata observer.
 */
export interface IMetadataObserver {
  /**
   * Occurs when the local user receives the metadata.
   *
   * @param metadata The metadata received, see Metadata .
   */
  onMetadataReceived?(metadata: Metadata): void;
}

/**
 * The reason for the CDN streaming error.
 */
export enum DirectCdnStreamingError {
  /**
   * 0: No error.
   */
  DirectCdnStreamingErrorOk = 0,
  /**
   * 1: General error, no clear reason. You can try to push the stream again.
   */
  DirectCdnStreamingErrorFailed = 1,
  /**
   * 2: An error occurs when pushing audio streams. For example, the local audio capture device is not working properly, is occupied by another process, or does not get the permission.
   */
  DirectCdnStreamingErrorAudioPublication = 2,
  /**
   * 3: An error occurs when pushing video streams. For example, the local video capture device is not working properly, is occupied by another process, or does not get the permission.
   */
  DirectCdnStreamingErrorVideoPublication = 3,
  /**
   * 4: Fails to connect to the CDN.
   */
  DirectCdnStreamingErrorNetConnect = 4,
  /**
   * 5: The URL is already being used. Use a new media push URL.
   */
  DirectCdnStreamingErrorBadName = 5,
}

/**
 * The current CDN streaming state.
 */
export enum DirectCdnStreamingState {
  /**
   * 0: The initial state before the CDN streaming starts.
   */
  DirectCdnStreamingStateIdle = 0,
  /**
   * 1: Streams are being pushed to the CDN. The SDK returns this value when you call the startDirectCdnStreaming method to push streams to the CDN.
   */
  DirectCdnStreamingStateRunning = 1,
  /**
   * 2: Stops pushing streams to the CDN. The SDK returns this value when you call the stopDirectCdnStreaming method to stop pushing streams to the CDN.
   */
  DirectCdnStreamingStateStopped = 2,
  /**
   * 3: Fails to push streams to the CDN. You can troubleshoot the issue with the information reported by the onDirectCdnStreamingStateChanged callback, and then push streams to the CDN again.
   */
  DirectCdnStreamingStateFailed = 3,
  /**
   * 4: Tries to reconnect Agora server to the CDN. The SDK attempts to reconnect a maximum of 10 times; if the connection is not restored, the streaming state becomes DirectCdnStreamingStateFailed.
   */
  DirectCdnStreamingStateRecovering = 4,
}

/**
 * The statistics of the current CDN streaming.
 */
export class DirectCdnStreamingStats {
  /**
   * The width (px) of the video frame.
   */
  videoWidth?: number;
  /**
   * The height (px) of the video frame.
   */
  videoHeight?: number;
  /**
   * The frame rate (fps) of the current video frame.
   */
  fps?: number;
  /**
   * The bitrate (bps) of the current video frame.
   */
  videoBitrate?: number;
  /**
   * The bitrate (bps) of the current audio frame.
   */
  audioBitrate?: number;
}

/**
 * The IDirectCdnStreamingEventHandler interface class is used by the SDK to send event notifications of CDN streaming to your app. Your app can get those notifications through methods that inherit this interface class.
 */
export interface IDirectCdnStreamingEventHandler {
  /**
   * Occurs when the CDN streaming state changes.
   * When the host directly pushes streams to the CDN, if the streaming state changes, the SDK triggers this callback to report the changed streaming state, error codes, and other information. You can troubleshoot issues by referring to this callback.
   *
   * @param state The current CDN streaming state. See DirectCdnStreamingState .
   *
   * @param error The reason for the CDN streaming error. See DirectCdnStreamingError .
   *
   * @param message The information about the changed streaming state.
   */
  onDirectCdnStreamingStateChanged?(
    state: DirectCdnStreamingState,
    error: DirectCdnStreamingError,
    message: string
  ): void;

  /**
   * Reports the CDN streaming statistics.
   * When the host directly pushes streams to the CDN, the SDK triggers this callback every one second.
   *
   * @param stats The statistics of the current CDN streaming. See DirectCdnStreamingStats .
   */
  onDirectCdnStreamingStats?(stats: DirectCdnStreamingStats): void;
}

/**
 * The media setting options for the host.
 */
export class DirectCdnStreamingMediaOptions {
  /**
   * Sets whether to publish the video captured by the camera:true: Publish the video captured by the camera.false: (Default) Do not publish the video captured by the camera.
   */
  publishCameraTrack?: boolean;
  /**
   * Sets whether to publish the audio captured by the microphone:true: Publish the audio captured by the microphone.false: (Default) Do not publish the audio captured by the microphone.
   */
  publishMicrophoneTrack?: boolean;
  /**
   * Sets whether to publish the captured audio from a custom source:true: Publish the captured audio from a custom source.false: (Default) Do not publish the captured audio from the custom source.
   */
  publishCustomAudioTrack?: boolean;
  /**
   * Sets whether to publish the captured video from a custom source:true: Publish the captured video from a custom source.false: (Default) Do not publish the captured video from the custom source.
   */
  publishCustomVideoTrack?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishMediaPlayerId?: number;
  /**
   * The video track ID returned by calling the createCustomVideoTrack method. The default value is 0.
   */
  customVideoTrackId?: number;
}

/**
 * @ignore
 */
export class ExtensionInfo {
  /**
   * @ignore
   */
  mediaSourceType?: MediaSourceType;
  /**
   * @ignore
   */
  remoteUid?: number;
  /**
   * @ignore
   */
  channelId?: string;
  /**
   * @ignore
   */
  localUid?: number;
}

/**
 * The basic interface of the Agora SDK that implements the core functions of real-time communication.
 * IRtcEngine provides the main methods that your app can call.Before calling other APIs, you must call createAgoraRtcEngine to create an IRtcEngine object.
 */
export abstract class IRtcEngine {
  /**
   * Releases the IRtcEngine instance.
   * This method releases all resources used by the Agora SDK. Use this method for apps in which users occasionally make voice or video calls. When users do not make calls, you can free up resources for other operations.After a successful method call, you can no longer use any method or callback in the SDK anymore. If you want to use the real-time communication functions again, you must call createAgoraRtcEngine and initialize to create a new IRtcEngine instance.If you want to create a new IRtcEngine instance after destroying the current one, ensure that you wait till the release method execution to complete.
   *
   * @param sync true: Synchronous call. Agora suggests calling this method in a sub-thread to avoid congestion in the main thread because the synchronous call and the app cannot move on to another task until the resources used by IRtcEngine are released. Besides, you cannot call release in any method or callback of the SDK. Otherwise, the SDK cannot release the resources until the callbacks return results, which may result in a deadlock. The SDK automatically detects the deadlock and converts this method into an asynchronous call, causing the test to take additional time.false: This setting is not supported.
   */
  abstract release(sync?: boolean): void;

  /**
   * Before calling other APIs, you must call createAgoraRtcEngine and initialize to create and initialize the IRtcEngine object.The SDK supports creating only one IRtcEngine instance for an app.
   *
   * @param context Configurations for the IRtcEngine instance. See RtcEngineContext .
   *
   * @returns
   * 0: Success.< 0: Failure.-1: A general error occurs (no specified reason).-2: The parameter is invalid.-7: The SDK is not initialized.-22: The resource request failed. The SDK fails to allocate resources because your app consumes too much system resource or the system resources are insufficient.-101: The App ID is invalid.
   */
  abstract initialize(context: RtcEngineContext): number;

  /**
   * Gets the SDK version.
   *
   * @returns
   * An SDKBuildInfo object.
   */
  abstract getVersion(): SDKBuildInfo;

  /**
   * Gets the warning or error description.
   *
   * @param code The error code or warning code reported by the SDK.
   *
   * @returns
   * The specific error or warning description.
   */
  abstract getErrorDescription(code: number): string;

  /**
   * Joins a channel.
   * When the connection between the client and Agora's server is interrupted due to poor network conditions, the SDK tries reconnecting to the server. When the local client successfully rejoins the channel, the SDK triggers the onRejoinChannelSuccess callback on the local client.A successful call of this method triggers the following callbacks: The local client: The onJoinChannelSuccess and onConnectionStateChanged callbacks.The remote client: onUserJoined , if the user joining the channel is in the Communication profile or is a host in the Live-broadcasting profile.This method enables users to join a channel. Users in the same channel can talk to each other, and multiple users in the same channel can start a group chat. Users with different App IDs cannot call each other.Once a user joins the channel, the user subscribes to the audio and video streams of all the other users in the channel by default, giving rise to usage and billing calculation. To stop subscribing to a specified stream or all remote streams, call the corresponding mute methods.
   *
   * @param channelId The channel name. This parameter signifies the channel in which users engage in real-time audio and video interaction. Under the premise of the same App ID, users who fill in the same channel ID enter the same channel for audio and video interaction. The string length must be less than 64 bytes. Supported characters:All lowercase English letters: a to z.All uppercase English letters: A to Z.All numeric characters: 0 to 9.Space"!", "#", "$", "%", "&amp;", "(", ")", "+", "-", ":", ";", "&lt;", "= ", ".", "&gt;", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @param token The token generated on your server for authentication.
   *
   * @param info (Optional) Reserved for future use.
   *
   * @param uid The user ID. This parameter is used to identify the user in the channel for real-time audio and video interaction. You need to set and manage user IDs yourself, and ensure that each user ID in the same channel is unique. This parameter is a 32-bit unsigned integer. The value range is 1 to 232-1. If the user ID is not assigned (or set to 0), the SDK assigns a random user ID and returns it in the onJoinChannelSuccess callback. Your application must record and maintain the returned user ID, because the SDK does not do so.
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in the ChannelMediaOptions structure is invalid. You need to pass in a valid parameter and join the channel again.-3: Failes to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.-7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.-8: IRtcEngineThe internal state of the object is wrong. The typical cause is that you call this method to join the channel without calling stopEchoTest to stop the test after calling startEchoTest to start a call loop test. You need to call stopEchoTest before calling this method.-17: The request to join the channel is rejected. The typical cause is that the user is in the channel. Agora recommends using the onConnectionStateChanged callback to get whether the user is in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected(1) state.-102: The channel name is invalid. You need to pass in a valid channel name inchannelId to rejoin the channel.-121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number;

  /**
   * Updates the channel media options after joining the channel.
   *
   * @param options The channel media options. See ChannelMediaOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The value of a member in the ChannelMediaOptions structure is invalid. For example, the token or the user ID is invalid. You need to fill in a valid parameter.-7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.-8: The internal state of the IRtcEngine object is wrong. The possible reason is that the user is not in the channel. Agora recommends using the onConnectionStateChanged callback to get whether the user is in the channel. If you receive the ConnectionStateDisconnected (1) or ConnectionStateFailed (5) state, the user is not in the channel. You need to call joinChannel [2/2] to join a channel before calling this method.
   */
  abstract updateChannelMediaOptions(options: ChannelMediaOptions): number;

  /**
   * Leaves a channel.
   * This method releases all resources related to the session.Calling this method does not necessarily mean that the user has left the channel.After joining the channel, you must call this method or leaveChannel to end the call, otherwise, the next call cannot be started.If you successfully call this method and leave the channel, the following callbacks are triggered:The local client: onLeaveChannel .The remote client: onUserOffline , if the user joining the channel is in the Communication profile, or is a host in the Live-broadcasting profile.If you call release immediately after calling this method, the SDK does not trigger the onLeaveChannel callback.
   *
   * @returns
   * 0: Success.< 0: Failure.-1(ERR_FAILED): A general error occurs (no specified reason).-2 (ERR_INVALID_ARGUMENT): The parameter is invalid.-7(ERR_NOT_INITIALIZED): The SDK is not initialized.
   */
  abstract leaveChannel(options?: LeaveChannelOptions): number;

  /**
   * Gets a new token when the current token expires after a period of time.
   * You can use this method to pass a new token to the SDK. A token expires after a certain period of time. In the following two cases, the app should call this method to pass in a new token. Failure to do so will result in the SDK disconnecting from the server.The SDK triggers the onTokenPrivilegeWillExpire callback.The onConnectionStateChanged callback reports ConnectionChangedTokenExpired(9).
   *
   * @param token The new token.
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The parameter is invalid. For example, the token is invalid. You need to fill in a valid parameter.-7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   */
  abstract renewToken(token: string): number;

  /**
   * Sets the channel profile.
   * After initializing the SDK, the default channel profile is the live streaming profile. You can call this method to set the usage scenario of Agora channel. The Agora SDK differentiates channel profiles and applies optimization algorithms accordingly. For example, it prioritizes smoothness and low latency for a video call and prioritizes video quality for interactive live video streaming.To ensure the quality of real-time communication, Agora recommends that all users in a channel use the same channel profile.This method must be called and set before joinChannel [2/2], and cannot be set again after joining the channel.The default audio route and video encoding bitrate are different in different channel profiles. For details, see setDefaultAudioRouteToSpeakerphone and setVideoEncoderConfiguration .
   *
   * @param profile The channel profile. See ChannelProfileType .
   *
   * @returns
   * 0(ERR_OK): Success.< 0: Failure.-2(ERR_INVALID_ARGUMENT): The parameter is invalid.-7(ERR_NOT_INITIALIZED): The SDK is not initialized.
   */
  abstract setChannelProfile(profile: ChannelProfileType): number;

  /**
   * Sets the client role.
   * If you call this method to set the user's role as the host before joining the channel and set the local video property through the setupLocalVideo method, the local video preview is automatically enabled when the user joins the channel.You can call this method either before or after joining the channel to set the user role as audience or host.If you call this method to switch the user role after joining the channel, the SDK triggers the following callbacks:The local client: onClientRoleChanged .The remote client: onUserJoined or onUserOffline (UserOfflineBecomeAudience).
   *
   * @param role The user role. See ClientRoleType .
   *
   * @returns
   * 0: Success.< 0: Failure.-1: A general error occurs (no specified reason).-2: The parameter is invalid.-7: The SDK is not initialized.
   */
  abstract setClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): number;

  /**
   * Starts an audio call test.
   * This method starts an audio call test to determine whether the audio devices (for example, headset and speaker) and the network connection are working properly. To conduct the test, let the user speak for a while, and the recording is played back within the set interval. If the user can hear the recording within the interval, the audio devices and network connection are working properly.Call this method before joining a channel.After calling startEchoTest, you must call stopEchoTest to end the test. Otherwise, the app cannot perform the next echo test, and you cannot join the channel.In the live streaming channels, only a host can call this method.
   *
   * @param intervalInSeconds The time interval (s) between when you speak and when the recording plays back. The value range is [2, 10], and the default value is 10.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startEchoTest(intervalInSeconds?: number): number;

  /**
   * Stops the audio call test.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.-5(ERR_REFUSED): Failed to stop the echo test. The echo test may not be running.
   */
  abstract stopEchoTest(): number;

  /**
   * @ignore
   */
  abstract enableMultiCamera(
    enabled: boolean,
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Enables the video module.
   * Call this method either before joining a channel or during a call. If this method is called before joining a channel, the call starts in the video mode. Call disableVideo to disable the video mode.A successful call of this method triggers the onRemoteVideoStateChanged callback on the remote client.This method enables the internal engine and is valid after leaving the channel.This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the video engine modules separately: enableLocalVideo : Whether to enable the camera to create the local video stream. muteLocalVideoStream : Whether to publish the local video stream. muteRemoteVideoStream : Whether to subscribe to and play the remote video stream. muteAllRemoteVideoStreams : Whether to subscribe to and play all remote video streams.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableVideo(): number;

  /**
   * Disables the video module.
   * This method disables video. You can call this method either before or after joining a channel. If you call it before joining a channel, an audio call starts when you join the channel. If you call it after joining a channel, a video call switches to an audio call. Call enableVideo to enable video.A successful call of this method triggers the onUserEnableVideo (false) callback on the remote client.This method affects the internal engine and can be called after leaving the channel.This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the video engine modules separately: enableLocalVideo : Whether to enable the camera to create the local video stream. muteLocalVideoStream : Whether to publish the local video stream. muteRemoteVideoStream : Whether to subscribe to and play the remote video stream. muteAllRemoteVideoStreams : Whether to subscribe to and play all remote video streams.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract disableVideo(): number;

  /**
   * Enables the local video preview.
   * This method starts the local video preview before joining the channel. Before calling this method, ensure that you do the following:Call enableVideo to enable the video.The local preview enables the mirror mode by default.After the local video preview is enabled, if you call leaveChannel [1/2] to exit the channel, the local preview remains until you call stopPreview [1/2] to disable it.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startPreview(sourceType?: VideoSourceType): number;

  /**
   * Stops the local video preview.
   * After calling startPreview [1/2] to start the preview, if you want to close the local video preview, please call this method.Please call this method before joining a channel or after leaving a channel.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopPreview(sourceType?: VideoSourceType): number;

  /**
   * Starts the last mile network probe test.
   * This method starts the last-mile network probe test before joining a channel to get the uplink and downlink last mile network statistics, including the bandwidth, packet loss, jitter, and round-trip time (RTT).Once this method is enabled, the SDK returns the following callbacks: onLastmileQuality : The SDK triggers this callback within two seconds depending on the network conditions. This callback rates the network conditions and is more closely linked to the user experience. onLastmileProbeResult : The SDK triggers this callback within 30 seconds depending on the network conditions. This callback returns the real-time statistics of the network conditions and is more objective.This method applies to the following scenarios:Before a user joins a channel, call this method to check the uplink network quality.In a live streaming channel, call this method to check the uplink network quality before an audience member switches to a host.Do not call other methods before receiving the onLastmileQuality and onLastmileProbeResult callbacks. Otherwise, the callbacks may be interrupted.A host should not call this method after joining a channel (when in a call).
   *
   * @param config The configurations of the last-mile network probe test. See LastmileProbeConfig .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startLastmileProbeTest(config: LastmileProbeConfig): number;

  /**
   * Stops the last mile network probe test.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopLastmileProbeTest(): number;

  /**
   * Sets the video encoder configuration.
   * Sets the encoder configuration for the local video.Call this method before joining a channel. Agora recommends you calling this method before the enableVideo method to reduce the rendering time of the first video frame.
   *
   * @param config Video profile. See VideoEncoderConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * Sets the image enhancement options.
   * Enables or disables image enhancement, and sets the options.Call this method before calling enableVideo or startPreview [1/2] .
   *
   * @param type The type of the video source. See MediaSourceType .
   *
   * @param enabled Whether to enable the image enhancement function:true: Enable image enhancement function.false: (Default) Disable image enhancement function.
   *
   * @param options The image enhancement options. See BeautyOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.ERR_NOT_SUPPORTED(4): The system version is earlier than Android 5.0, which does not support this function.
   */
  abstract setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Sets low-light enhancement.
   * The low-light enhancement feature can adaptively adjust the brightness value of the video captured in situations with low or uneven lighting, such as backlit, cloudy, or dark scenes. It restores or highlights the image details and improves the overall visual effect of the video.You can call this method to enable the color enhancement feature and set the options of the color enhancement effect.Call this method after calling enableVideo .Dark light enhancement has certain requirements for equipment performance. The low-light enhancement feature has certain performance requirements on devices. If your device overheats after you enable low-light enhancement, Agora recommends modifying the low-light enhancement options to a less performance-consuming level or disabling low-light enhancement entirely.Both this method and setExtensionProperty can turn on low-light enhancement:When you use the SDK to capture video, Agora recommends this method (this method only works for video captured by the SDK).When you use an external video source to implement custom video capture, or send an external video source to the SDK, Agora recommends using setExtensionProperty.
   *
   * @param enabled Whether to enable low-light enhancement function:true: Enable low-light enhancement function.false: (Default) Disable low-light enhancement function.
   *
   * @param options The low-light enhancement options. See LowlightEnhanceOptions .
   *
   * @param type The type of the video source. See MediaSourceType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLowlightEnhanceOptions(
    enabled: boolean,
    options: LowlightEnhanceOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Sets video noise reduction.
   * Underlit environments and low-end video capture devices can cause video images to contain significant noise, which affects video quality. In real-time interactive scenarios, video noise also consumes bitstream resources and reduces encoding efficiency during encoding.You can call this method to enable the video noise reduction feature and set the options of the video noise reduction effect.Call this method after calling enableVideo .Video noise reduction has certain requirements for equipment performance. If your device overheats after you enable video noise reduction, Agora recommends modifying the video noise reduction options to a less performance-consuming level or disabling video noise reduction entirely.Both this method and setExtensionProperty can turn on video noise reduction function:When you use the SDK to capture video, Agora recommends this method (this method only works for video captured by the SDK).When you use an external video source to implement custom video capture, or send an external video source to the SDK, Agora recommends using setExtensionProperty.
   *
   * @param type The type of the video source. See MediaSourceType .
   *
   * @param enabled Whether to enable video noise reduction:true: Enable video noise reduction.false: (Default) Disable video noise reduction.
   *
   * @param options The video noise reduction options. See VideoDenoiserOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setVideoDenoiserOptions(
    enabled: boolean,
    options: VideoDenoiserOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Sets color enhancement.
   * The video images captured by the camera can have color distortion. The color enhancement feature intelligently adjusts video characteristics such as saturation and contrast to enhance the video color richness and color reproduction, making the video more vivid.You can call this method to enable the color enhancement feature and set the options of the color enhancement effect.Call this method after calling enableVideo .The color enhancement feature has certain performance requirements on devices. With color enhancement turned on, Agora recommends that you change the color enhancement level to one that consumes less performance or turn off color enhancement if your device is experiencing severe heat problems.Both this method and setExtensionProperty can turn on color enhancement:When you use the SDK to capture video, Agora recommends this method (this method only works for video captured by the SDK).When you use an external video source to implement custom video capture, or send an external video source to the SDK, Agora recommends using setExtensionProperty.
   *
   * @param type The type of the video source. See MediaSourceType .
   *
   * @param enabled Whether to enable color enhancement:true Enable color enhancement.false: (Default) Disable color enhancement.
   *
   * @param options The color enhancement options. See ColorEnhanceOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setColorEnhanceOptions(
    enabled: boolean,
    options: ColorEnhanceOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Enables/Disables the virtual background.
   * The virtual background function allows you to replace the original background image of the local user or to blur the background. After successfully enabling the virtual background function, all users in the channel can see the customized background.Call this method before calling enableVideo or startPreview [1/2] .This function requires a high-performance device. Agora recommends that you use this function on devices with the following chips:Snapdragon 700 series 750G and laterSnapdragon 800 series 835 and laterDimensity 700 series 720 and laterKirin 800 series 810 and laterKirin 900 series 980 and laterDevices with an A9 chip and better, as follows:iPhone 6S and lateriPad Air 3rd generation and lateriPad 5th generation and lateriPad Pro 1st generation and lateriPad mini 5th generation and laterAgora recommends that you use this function in scenarios that meet the following conditions:A high-definition camera device is used, and the environment is uniformly lit.There are few objects in the captured video. Portraits are half-length and unobstructed. Ensure that the background is a solid color that is different from the color of the user's clothing.
   *
   * @param enabled Whether to enable virtual background:true: Enable virtual background.false: Disable virtual background.
   *
   * @param backgroundSource The custom background image. See VirtualBackgroundSource . To adapt the resolution of the custom background image to that of the video captured by the SDK, the SDK scales and crops the custom background image while ensuring that the content of the custom background image is not distorted.
   *
   * @param type Type of the video source. See MediaSourceType .In this method, this parameter supports only the following two settings:The default value is PrimaryCameraSource.If you want to use the second camera to capture video, set this parameter to SecondaryCameraSource.
   *
   * @returns
   * 0: Success.< 0: Failure.-1: The custom background image does not exist. Check the value of source in VirtualBackgroundSource .-2: The color format of the custom background image is invalid. Check the value of color in VirtualBackgroundSource .-3: The device does not support virtual background.
   */
  abstract enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type?: MediaSourceType
  ): number;

  /**
   * Enables/Disables the super resolution algorithm for a remote user's video stream.
   * This function can effectively improve the resolution of the remote video picture seen by the local user, that is, the width and height (pixels) of the video received by the specified remote user are enlarged to 2 times original size.After calling this method, you can confirm whether super resolution is successfully enabled through the remote video stream statistics ( RemoteVideoStats ) in the onRemoteVideoStats callback:If the parameter superResolutionType >0: Super resolution is enabled.If the parameter superResolutionType =0: Super resolution is not enabled.The super resolution feature requires extra system resources. To balance the visual experience and system consumption, this feature can only be enabled for a single remote user. If the local user uses super resolution on Android, the original resolution of the remote user's video cannot exceed 640 × 360 pixels; if the local user uses super resolution on iOS, the original resolution of the remote user's video cannot exceed 640 × 480 pixels.Before calling this method, ensure that you have integrated the following dynamic libraries:Android: libagora_super_resolution_extension.soiOS: AgoraSuperResolutionExtension.xcframeworkBecause this method has certain system performance requirements, Agora recommends that you use the following devices or better:Android:VIVO: V1821A, NEX S, 1914A, 1916A, 1962A, 1824BA, X60, X60 ProOPPO: PCCM00, Find X3OnePlus: A6000Xiaomi: Mi 8, Mi 9, Mi 10, Mi 11, MIX3, Redmi K20 ProSAMSUNG: SM-G9600, SM-G9650, SM-N9600, SM-G9708, SM-G960U, SM-G9750, S20, S21HUAWEI: SEA-AL00, ELE-AL00, VOG-AL00, YAL-AL10, HMA-AL00, EVR-AN00, nova 4, nova 5 Pro, nova 6 5G, nova 7 5G, Mate 30, Mate 30 Pro, Mate 40, Mate 40 Pro, P40, P40 Pro, Huawei M6, MatePad 10.8iOS:iPhone XRiPhone XSiPhone XS MaxiPhone 11iPhone 11 ProiPhone 11 Pro MaxiPhone 12iPhone 12 miniiPhone 12 ProiPhone 12 Pro MaxiPhone 12 SE (2nd generation)iPad Pro 11-inch (3rd generation)iPad Pro 12.9-inch (3rd generation)iPad Air 3 (3rd generation)iPad Air 3 (4th generation)
   *
   * @param userId The user ID of the remote user.
   *
   * @param enable Whether to enable super resolution for the remote user’s video:true: Enable super resolution.false: Disable super resolution.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableRemoteSuperResolution(userId: number, enable: boolean): number;

  /**
   * Initializes the video view of a remote user.
   * This method initializes the video view of a remote stream on the local device. It affects only the video view that the local user sees. Call this method to bind the remote video stream to a video view and to set the rendering and mirror modes of the video view.You need to specify the ID of the remote user in this method. If the remote user ID is unknown to the application, set it after the app receives the onUserJoined callback.To unbind the remote user from the view, set the view parameter to NULL.Once the remote user leaves the channel, the SDK unbinds the remote user.To update the rendering or mirror mode of the remote video view during a call, use the setRemoteRenderMode method.If you use the Agora recording feature, the recording client joins the channel as a dummy client, triggering the onUserJoined callback. Do not bind the dummy client to the app view because the dummy client does not send any video streams. If your app does not recognize the dummy client, bind the remote user to the view when the SDK triggers the onFirstRemoteVideoDecoded callback.
   *
   * @param canvas The remote video view and settings. See VideoCanvas .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setupRemoteVideo(canvas: VideoCanvas): number;

  /**
   * Initializes the local video view.
   * This method initializes the video view of a local stream on the local device. It affects only the video view that the local user sees, not the published local video stream. Call this method to bind the local video stream to a video view and to set the rendering and mirror modes of the video view.After initialization, call this method to set the local video and then join the channel. The local video still binds to the view after you leave the channel. To unbind the local video from the view, set the view parameter as NULL.You can call this method either before or after joining a channel.To update the rendering or mirror mode of the local video view during a call, use the setLocalRenderMode method.
   *
   * @param canvas Local video display properties. See VideoCanvas .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setupLocalVideo(canvas: VideoCanvas): number;

  /**
   * Enables the audio module.
   * The audio mode is enabled by default.This method enables the internal engine and can be called anytime after initialization. It is still valid after one leaves channel.This method enables the audio module and takes some time to take effect. Agora recommends using the following API methods to control the audio module separately: enableLocalAudio : Whether to enable the microphone to create the local audio stream. muteLocalAudioStream : Whether to publish the local audio stream. muteRemoteAudioStream : Whether to subscribe and play the remote audio stream. muteAllRemoteAudioStreams : Whether to subscribe to and play all remote audio streams.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableAudio(): number;

  /**
   * Disables the audio module.
   * This method disables the internal engine and can be called anytime after initialization. It is still valid after one leaves channel.This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the audio modules separately: enableLocalAudio : Whether to enable the microphone to create the local audio stream. muteLocalAudioStream : Whether to publish the local audio stream. muteRemoteAudioStream : Whether to subscribe and play the remote audio stream. muteAllRemoteAudioStreams : Whether to subscribe to and play all remote audio streams.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract disableAudio(): number;

  /**
   * Sets the audio profile and audio scenario.
   * Deprecated:This method is deprecated. If you need to set the audio profile, use setAudioProfile [2/2] ; if you need to set the audio scenario, use setAudioScenario .You can call this method either before or after joining a channel.In scenarios requiring high-quality audio, such as online music tutoring, Agora recommends you set profile as AudioProfileMusicHighQuality(4)and scenario as AudioScenarioGameStreaming(3).
   *
   * @param profile The audio profile, including the sampling rate, bitrate, encoding mode, and the number of channels. See AudioProfileType .
   *
   * @param scenario The audio scenarios. See AudioScenarioType . Under different audio scenarios, the device uses different volume types.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setAudioProfile(
    profile: AudioProfileType,
    scenario?: AudioScenarioType
  ): number;

  /**
   * Sets audio scenarios.
   * You can call this method either before or after joining a channel.
   *
   * @param scenario The audio scenarios. See AudioScenarioType . Under different audio scenarios, the device uses different volume types.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioScenario(scenario: AudioScenarioType): number;

  /**
   * Enables/Disables the local audio capture.
   * The audio function is enabled by default. This method disables or re-enables the local audio function to stop or restart local audio capturing.This method does not affect receiving or playing the remote audio streams, and enableLocalAudio (false) is applicable to scenarios where the user wants to receive remote audio streams without sending any audio stream to other users in the channel.Once the local audio function is disabled or re-enabled, the SDK triggers the onLocalAudioStateChanged callback, which reports LocalAudioStreamStateStopped (0) or LocalAudioStreamStateRecording (1).This method is different from the muteLocalAudioStream method:enableLocalAudio: Disables/Re-enables the local audio capturing and processing. If you disable or re-enable local audio capturing using the enableLocalAudio method, the local user might hear a pause in the remote audio playback.muteLocalAudioStream: Sends/Stops sending the local audio streams.You can call this method either before or after joining a channel. Calling it before joining a channel only sets the device state, and it takes effect immediately after you join the channel.
   *
   * @param enabled true: (Default) Re-enable the local audio function, that is, to start the local audio capturing device (for example, the microphone).false: Disable the local audio function, that is, to stop local audio capturing.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableLocalAudio(enabled: boolean): number;

  /**
   * Stops or resumes publishing the local audio stream.
   * This method does not affect any ongoing audio recording, because it does not disable the audio capture device.
   *
   * @param mute Whether to stop publishing the local audio stream.true: Stop publishing the local audio stream.false: (Default) Resumes publishing the local audio stream.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /**
   * Stops or resumes subscribing to the audio streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.Call this method after joining a channel.If you do not want to subscribe the audio streams of remote users before joining a channel, you can call joinChannel [2/2] and set autoSubscribeAudio as false.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users:true: Stop subscribing to the audio streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * Stops or resumes subscribing to the audio streams of all remote users by default.
   * Call this method after joining a channel. After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all subsequent users.If you need to resume subscribing to the audio streams of remote users in the channel after calling this method, do the following:To resume subscribing to the audio stream of a specified user, call muteRemoteAudioStream (false), and specify the user ID.To resume subscribing to the audio streams of multiple remote users, call muteRemoteAudioStream(false) multiple times.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users by default.true: Stop subscribing to the audio streams of all remote users by default.false: (Default) Subscribe to the audio streams of all remote users by default.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * Cancels or resumes subscribing to the specified remote user's audio stream.
   * Call this method after joining a channel.
   *
   * @param uid The user ID of the specified user.
   *
   * @param mute Whether to stop subscribing to the audio stream of the specified user.
   *  true: Unsubscribe from the specified user's audio stream.false: (Default) Subscribes to the specified user's audio stream.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  /**
   * Stops or resumes publishing the local video stream.
   * A successful call of this method triggers the onUserMuteVideo callback on the remote client.This method executes faster than the enableLocalVideo (false) method, which controls the sending of the local video stream.This method does not affect any ongoing video recording, because it does not disable the camera.
   *
   * @param mute Whether to stop publishing the local video stream.true: Stop publishing the local video stream.false: (Default) Publish the local video stream.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteLocalVideoStream(mute: boolean): number;

  /**
   * Enables/Disables the local video capture.
   * This method disables or re-enables the local video capturer, and does not affect receiving the remote video stream.After calling enableVideo , the local video capturer is enabled by default. You can call enableLocalVideo (false) to disable the local video capturer. If you want to re-enable the local video, call enableLocalVideo(true).After the local video capturer is successfully disabled or re-enabled, the SDK triggers the onRemoteVideoStateChanged callback on the remote client.You can call this method either before or after joining a channel.This method enables the internal engine and is valid after leaving the channel.
   *
   * @param enabled Whether to enable the local video capture.true: (Default) Enable the local video capture.false: Disables the local video capture. Once the local video is disabled, the remote users can no longer receive the video stream of this user, while this user can still receive the video streams of the other remote users. When set to false, this method does not require a local camera.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableLocalVideo(enabled: boolean): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.Call this method after joining a channel.If you do not want to subscribe the video streams of remote users before joining a channel, you can call joinChannel [2/2] and set autoSubscribeVideo as false.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users.true: Stop subscribing to the video streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users by default.
   * Call this method after joining a channel. After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all subsequent users.If you need to resume subscribing to the audio streams of remote users in the channel after calling this method, do the following:To resume subscribing to the audio stream of a specified user, call muteRemoteVideoStream (false), and specify the user ID.To resume subscribing to the audio streams of multiple remote users, call muteRemoteVideoStream(false) multiple times.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users by default.true: Stop subscribing to the audio streams of all remote users by default.false: (Default) Resume subscribing to the audio streams of all remote users by default.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setDefaultMuteAllRemoteVideoStreams(mute: boolean): number;

  /**
   * Cancels or resumes subscribing to the specified remote user's video stream.
   * Call this method after joining a channel.
   *
   * @param uid The user ID of the specified user.
   *
   * @param mute Whether to subscribe to the specified remote user's video stream.true: Unsubscribe from the specified user's video stream.false: (Default) Subscribes to the specified user's video stream.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

  /**
   * Sets the stream type of the remote video.
   * Under limited network conditions, if the publisher has not disabled the dual-stream mode using enableDualStreamMode (false), the receiver can choose to receive either the high-quality video stream (the high resolution, and high bitrate video stream) or the low-quality video stream (the low resolution, and low bitrate video stream). The high-quality video stream has a higher resolution and bitrate, and the low-quality video stream has a lower resolution and bitrate.By default, users receive the high-quality video stream. Call this method if you want to switch to the low-quality video stream. This method allows the app to adjust the corresponding video stream type based on the size of the video window to reduce the bandwidth and resources. The aspect ratio of the low-quality video stream is the same as the high-quality video stream. Once the resolution of the high-quality video stream is set, the system automatically sets the resolution, frame rate, and bitrate of the low-quality video stream.The method result returns in the onApiCallExecuted callback.You can call this method either before or after joining a channel. If you call both setRemoteVideoStreamType and setRemoteDefaultVideoStreamType , the setting of setRemoteVideoStreamType takes effect.
   *
   * @param uid The user ID.
   *
   * @param streamType The video stream type: VideoStreamType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteVideoSubscriptionOptions(
    uid: number,
    options: VideoSubscriptionOptions
  ): number;

  /**
   * Sets the default stream type of subscrption for remote video streams.
   * Under limited network conditions, if the publisher has not disabled the dual-stream mode using enableDualStreamMode (false), the receiver can choose to receive either the high-quality video stream or the low-quality video stream. The high-quality video stream has a higher resolution and bitrate, and the low-quality video stream has a lower resolution and bitrate.By default, users receive the high-quality video stream. Call this method if you want to switch to the low-quality video stream. This method allows the app to adjust the corresponding video stream type based on the size of the video window to reduce the bandwidth and resources. The aspect ratio of the low-quality video stream is the same as the high-quality video stream. Once the resolution of the high-quality video stream is set, the system automatically sets the resolution, frame rate, and bitrate of the low-quality video stream.The result of this method is returned in the onApiCallExecuted callback.Call this method before joining a channel. Agora does not support changing the default subscribed video stream type after joining a channel.If you call both this method and setRemoteVideoStreamType , the SDK applies the settings in the setRemoteVideoStreamType method.
   *
   * @param streamType The default video-stream type. See VideoStreamType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

  /**
   * @ignore
   */
  abstract setSubscribeAudioBlocklist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeAudioAllowlist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeVideoBlocklist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * @ignore
   */
  abstract setSubscribeVideoAllowlist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * Enables the reporting of users' volume indication.
   * This method enables the SDK to regularly report the volume information of the local user who sends a stream and remote users (up to three) whose instantaneous volumes are the highest to the app. Once you call this method and users send streams in the channel, the SDK triggers the onAudioVolumeIndication callback at the time interval set in this method.You can call this method either before or after joining a channel.
   *
   * @param interval Sets the time interval between two consecutive volume indications:≤ 0: Disables the volume indication.> 0: Time interval (ms) between two consecutive volume indications. You need to set this parameter to an integer multiple of 200. If the value is lower than 200, the SDK automatically adjusts the value to 200.
   *
   * @param smooth The smoothing factor sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The recommended value is 3. The greater the value, the more sensitive the indicator.
   *
   * @param reportVad true: Enable the voice activity detection of the local user. Once it is enabled,the vad parameter of the onAudioVolumeIndication callback reports the voice activity status of the local user.false: (Default) Disable the voice activity detection of the local user. Once it is disabled, the vad parameter of the onAudioVolumeIndication callback does not report the voice activity status of the local user, except for the scenario where the engine automatically detects the voice activity of the local user.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number;

  /**
   * Starts the audio recording on the client.
   * The Agora SDK allows recording during a call. After successfully calling this method, you can record the audio of all the users in the channel and get an audio recording file. Supported formats of the recording file are as follows:WAV: High-fidelity files with typically larger file sizes. For example, the size of a WAV file with a sample rate of 32,000 Hz and a recording duration of 10 minutes is around 73 MB.AAC: Low-fidelity files with typically smaller file sizes. For example, if the sample rate is 32,000 Hz and the recording quality is AudioRecordingQualityMedium, the file size for a 10-minute recording is approximately 2 MB.Once the user leaves the channel, the recording automatically stops.Call this method after joining a channel.
   *
   * @param config Recording configuration. See AudioRecordingConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startAudioRecording(config: AudioRecordingConfiguration): number;

  /**
   * Registers an encoded audio observer.
   * Call this method after joining a channel.You can call this method or the startAudioRecording method to set the audio content and audio quality. Agora recommends not using this method and startAudioRecording at the same time; otherwise, only the method called later takes effect.
   *
   * @param config
   *
   * @returns
   * One IAudioEncodedFrameObserver object.
   */
  abstract registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * Stops the audio recording on the client.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopAudioRecording(): number;

  /**
   * Creates a media player instance.
   *
   * @returns
   * The IMediaPlayer instance, if the method call succeeds.An empty pointer , if the method call fails.
   */
  abstract createMediaPlayer(): IMediaPlayer;

  /**
   * Destroys the media player instance.
   *
   * @param mediaPlayer  IMediaPlayer object.
   *
   * @returns
   * ≥ 0: Success. Returns the ID of media player source instance.< 0: Failure.
   */
  abstract destroyMediaPlayer(mediaPlayer: IMediaPlayer): number;

  /**
   * Starts playing the music file.
   * This method mixes the specified local or online audio file with the audio from the microphone, or replaces the microphone's audio with the specified local or remote audio file. A successful method call triggers the onAudioMixingStateChanged (AudioMixingStatePlaying) callback. When the audio mixing file playback finishes, the SDK triggers the onAudioMixingStateChanged(AudioMixingStateStopped) callback on the local client.For the audio file formats supported by this method, see What formats of audio files the Agora RTC SDK support.You can call this method either before or after joining a channel. If you need to call startAudioMixing multiple times, ensure that the time interval between calling this method is more than 500 ms.If the local music file does not exist, the SDK does not support the file format, or the the SDK cannot access the music file URL, the SDK reports the warn code 701.On Android, there are following considerations:To use this method, ensure that the Android device is v4.2 or later, and the API version is v16 or later.If you need to play an online music file, Agora does not recommend using the redirected URL address. Some Android devices may fail to open a redirected URL address.If you call this method on an emulator, ensure that the music file is in the /sdcard/ directory and the format is MP3.
   *
   * @param filePath File path:Android: The file path, which needs to be accurate to the file name and suffix. Agora supports using a URI address, an absolute path, or a path that starts with /assets/. You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead. For example: content://com.android.providers.media.documents/document/audio%3A14441.iOS: The absolute path or URL address (including the suffixes of the filename) of the audio effect file. For example: /var/mobile/Containers/Data/audio.mp4.
   *
   * @param loopback Whether to only play music files on the local client:true: Only play music files on the local client so that only the local user can hear the music.false: Publish music files to remote clients so that both the local user and remote users can hear the music.
   *
   * @param cycle The number of times the music file plays.≥ 0: The number of playback times. For example, 0 means that the SDK does not play the music file while 1 means that the SDK plays once.-1: Play the audio file in an infinite loop.
   *
   * @param startPos The playback position (ms) of the music file.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos?: number
  ): number;

  /**
   * Stops playing and mixing the music file.
   * This method stops the audio mixing. Call this method when you are in a channel.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopAudioMixing(): number;

  /**
   * Pauses playing the music file.
   * Call this method after joining a channel.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract pauseAudioMixing(): number;

  /**
   * Resumes playing and mixing the music file.
   * This method resumes playing and mixing the music file. Call this method when you are in a channel.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract resumeAudioMixing(): number;

  /**
   * Selects the audio track used during playback.
   * After getting the track index of the audio file, you can call this method to specify any track to play. For example, if different tracks of a multi-track file store songs in different languages, you can call this method to set the playback language.For the supported formats of audio files, see .You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged (AudioMixingStatePlaying) callback.
   *
   * @param index
 The audio track you want to specify. The value range is [0, getAudioTrackCount ()].
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract selectAudioTrack(index: number): number;

  /**
   * Gets the index of audio tracks of the current music file.
   * You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @returns
   * The SDK returns the index of the audio tracks if the method call succeeds.< 0: Failure.
   */
  abstract getAudioTrackCount(): number;

  /**
   * Adjusts the volume during audio mixing.
   * This method adjusts the audio mixing volume on both the local client and remote clients.Call this method after the startAudioMixing method.
   *
   * @param volume Audio mixing volume. The value ranges between 0 and 100. The default value is 100, which means the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustAudioMixingVolume(volume: number): number;

  /**
   * Adjusts the volume of audio mixing for publishing.
   * This method adjusts the audio mixing volume on the remote clients.Call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @param volume The volume of audio mixing for local playback. The value ranges between 0 and 100 (default). 100 represents the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustAudioMixingPublishVolume(volume: number): number;

  /**
   * Retrieves the audio mixing volume for publishing.
   * This method helps to troubleshoot audio volume‑related issues.You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @returns
   * The audio mixing volume, if this method call succeeds. The value range is [0,100].< 0: Failure.
   */
  abstract getAudioMixingPublishVolume(): number;

  /**
   * Adjusts the volume of audio mixing for local playback.
   * Call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @param volume The volume of audio mixing for local playback. The value ranges between 0 and 100 (default). 100 represents the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustAudioMixingPlayoutVolume(volume: number): number;

  /**
   * Retrieves the audio mixing volume for local playback.
   * This method retrieves the audio mixing volume for local playback. You can use it to troubleshoot audio volume related issues.You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @returns
   * The audio mixing volume, if this method call succeeds. The value range is [0,100].< 0: Failure.
   */
  abstract getAudioMixingPlayoutVolume(): number;

  /**
   * Retrieves the duration (ms) of the music file.
   * Retrieves the total duration (ms) of the audio file.You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged (AudioMixingStatePlaying) callback.
   *
   * @returns
   * ≥ 0: The audio mixing duration, if this method call succeeds.< 0: Failure.
   */
  abstract getAudioMixingDuration(): number;

  /**
   * Retrieves the playback position (ms) of the music file.
   * Retrieves the playback position (ms) of the audio.You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.If you need to call getAudioMixingCurrentPosition multiple times, ensure that the time interval between calling this method is more than 500 ms.
   *
   * @returns
   * ≥ 0: The current playback position (ms) of the audio mixing, if this method call succeeds. 0 represents that the current music file does not start playing.< 0: Failure.
   */
  abstract getAudioMixingCurrentPosition(): number;

  /**
   * Sets the audio mixing position.
   * Call this method to set the playback position of the music file to a different starting position, rather than playing the file from the beginning.You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @param pos Integer. The playback position (ms).
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioMixingPosition(pos: number): number;

  /**
   * Sets the channel mode of the current audio file.
   * In a stereo music file, the left and right channels can store different audio data. According to your needs, you can set the channel mode to original mode, left channel mode, right channel mode, or mixed channel mode. For example, in the KTV scenario, the left channel of the music file stores the musical accompaniment, and the right channel stores the singing voice. If you only need to listen to the accompaniment, call this method to set the channel mode of the music file to left channel mode; if you need to listen to the accompaniment and the singing voice at the same time, call this method to set the channel mode to mixed channel mode.Call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged (AudioMixingStatePlaying) callback.This method only applies to stereo audio files.
   *
   * @param mode The channel mode. See AudioMixingDualMonoMode .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): number;

  /**
   * Sets the pitch of the local music file.
   * When a local music file is mixed with a local human voice, call this method to set the pitch of the local music file only.You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @param pitch Sets the pitch of the local music file by the chromatic scale. The default value is 0, which means keeping the original pitch. The value ranges from -12 to 12, and the pitch value between consecutive values is a chromatic value. The greater the absolute value of this parameter, the higher or lower the pitch of the local music file.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioMixingPitch(pitch: number): number;

  /**
   * Retrieves the volume of the audio effects.
   * The volume range is [0,100]. The default value is 100, the original volume.Call this method after the playEffect method.
   */
  abstract getEffectsVolume(): number;

  /**
   * Sets the volume of the audio effects.
   * Call this method after the playEffect method.
   *
   * @param volume The playback volume. The value range is [0, 100]. The default value is 100, which represents the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setEffectsVolume(volume: number): number;

  /**
   * Preloads a specified audio effect file into the memory.
   * To ensure smooth communication, limit the size of the audio effect file. Agora recommends using this method to preload the audio effect before calling joinChannel [2/2].This method does not support online audio effect files.For the audio file formats supported by this method, see What formats of audio files the Agora RTC SDK support.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @param filePath File path:Android: The file path, which needs to be accurate to the file name and suffix. Agora supports using a URI address, an absolute path, or a path that starts with /assets/. You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead. For example: content://com.android.providers.media.documents/document/audio%3A14441.iOS: The absolute path or URL address (including the suffixes of the filename) of the audio effect file. For example: /var/mobile/Containers/Data/audio.mp4.
   *
   * @param startPos The playback position (ms) of the audio effect file.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract preloadEffect(
    soundId: number,
    filePath: string,
    startPos?: number
  ): number;

  /**
   * Plays the specified local or online sound effect file.
   * To play multiple audio effect files at the same time, call this method multiple times with different soundId and filePath. For the best user experience, Agora recommends playing no more than three audio effect files at the same time. After the playback of an audio effect file completes, the SDK triggers the onAudioEffectFinished callback.Call this method after joining a channel.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique. If you have loaded the audio effect into memory via preloadEffect , make sure this parameter is the same as the soundId set in preloadEffect.
   *
   * @param filePath Windows: The absolute path or URL address (including the suffixes of the filename) of the audio effect file. For example: C:\music\audio.mp4. Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. See supported audio formats.If you have loaded the audio effect into memory via preloadEffect , make sure this parameter is the same as the filePath set in preloadEffect.
   *
   * @param loopCount The number of times the audio effect loops.≥ 0: The number of playback times. For example, 1 means loop one time, which means playing the audio effect two times in total.-1: Play the music file in an infinite loop.
   *
   * @param pitch The pitch of the audio effect. The value range is 0.5 to 2.0. The default value is 1.0, which means the original pitch. The lower the value, the lower the pitch.
   *
   * @param pan The spatial position of the audio effect. The value ranges between -1.0 and 1.0, where:-1.0: The audio effect displays to the left.0.0: The audio effect displays ahead.1.0: The audio effect displays to the right.
   *
   * @param gain The volume of the audio effect. The value range is 0.0 to 100.0. The default value is 100.0, which means the original volume. The smaller the value, the lower the volume.
   *
   * @param publish Whether to publish the audio effect to the remote users.true: Publish the audio effect to the remote users. Both the local user and remote users can hear the audio effect.false: Do not publish the audio effect to the remote users. Only the local user can hear the audio effect.
   *
   * @param startPos The playback position (ms) of the audio effect file.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean,
    startPos?: number
  ): number;

  /**
   * Plays all audio effects.
   * After calling preloadEffect multiple times to preload multiple audio effects into the memory, you can call this method to play all the specified audio effects for all users in the channel.
   *
   * @param loopCount The number of times the audio effect loops:-1: Play the audio effect in an indefinite loop until you call stopEffect or stopAllEffects .0: Play the audio effect once.1: Play the audio effect twice.
   *
   * @param pitch The pitch of the audio effect. The value ranges between 0.5 and 2.0. The default value is 1.0 (original pitch). The lower the value, the lower the pitch.
   *
   * @param pan The spatial position of the audio effect. The value ranges between -1.0 and 1.0:-1.0: The audio effect shows on the left.0: The audio effect shows ahead.1.0: The audio effect shows on the right.
   *
   * @param gain The volume of the audio effect. The value range is [0, 100]. The default value is 100 (original volume). The smaller the value, the lower the volume.
   *
   * @param publish Whether to publish the audio effect to the remote users:true: Publish the audio effect to the remote users. Both the local user and remote users can hear the audio effect.false: Do not publish the audio effect to the remote users. Only the local user can hear the audio effect.
   */
  abstract playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean
  ): number;

  /**
   * Gets the volume of a specified audio effect.
   *
   * @param soundId The ID of the audio effect.
   *
   * @returns
   * The volume of the specified audio effect, if the method call succeeds. The value range is [0,100]. 100 represents the original volume. < 0: Failure.
   */
  abstract getVolumeOfEffect(soundId: number): number;

  /**
   * Sets the volume of a specified audio effect.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @param volume The playback volume. The value range is [0, 100]. The default value is 100, which represents the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setVolumeOfEffect(soundId: number, volume: number): number;

  /**
   * Pauses playing a specified audio effect file.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract pauseEffect(soundId: number): number;

  /**
   * Pauses playing all audio effect files.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract pauseAllEffects(): number;

  /**
   * Resumes playing a specified audio effect.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract resumeEffect(soundId: number): number;

  /**
   * Resumes playing all audio effects.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract resumeAllEffects(): number;

  /**
   * Stops playing a specified audio effect.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopEffect(soundId: number): number;

  /**
   * Stops playing all audio effects.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopAllEffects(): number;

  /**
   * Releases a specified preloaded audio effect from the memory.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unloadEffect(soundId: number): number;

  /**
   * Releases a specified preloaded audio effect from the memory.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unloadAllEffects(): number;

  /**
   * Retrieves the duration of the audio effect file.
   * Call this method after joining a channel.
   *
   * @param filePath File path:
   *  Android: The file path, which needs to be accurate to the file name and suffix. Agora supports using a URI address, an absolute path, or a path that starts with /assets/. You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead. For example: content://com.android.providers.media.documents/document/audio%3A14441.
   *  iOS: The absolute path or URL address (including the suffixes of the filename) of the audio effect file. For example: /var/mobile/Containers/Data/audio.mp4.
   *
   * @returns
   * The total duration (ms) of the specified audio effect file, if the method call succeeds.< 0: Failure.
   */
  abstract getEffectDuration(filePath: string): number;

  /**
   * Sets the playback position of an audio effect file.
   * After a successful setting, the local audio effect file starts playing at the specified position.Call this method after playEffect.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @param pos The playback position (ms) of the audio effect file.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setEffectPosition(soundId: number, pos: number): number;

  /**
   * Retrieves the playback position of the audio effect file.
   * Call this method after the playEffect method.
   *
   * @param soundId The audio effect ID. The ID of each audio effect file is unique.
   *
   * @returns
   * The playback position (ms) of the specified audio effect file, if the method call succeeds.< 0: Failure.
   */
  abstract getEffectCurrentPosition(soundId: number): number;

  /**
   * Enables/Disables stereo panning for remote users.
   * Ensure that you call this method before joining a channel to enable stereo panning for remote users so that the local user can track the position of a remote user by calling setRemoteVoicePosition.
   *
   * @param enabled Whether to enable stereo panning for remote users:true: Enable stereo panning.false: Disable stereo panning.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableSoundPositionIndication(enabled: boolean): number;

  /**
   * Sets the 2D position (the position on the horizontal plane) of the remote user's voice.
   * This method sets the 2D position and volume of a remote user, so that the local user can easily hear and identify the remote user's position.When the local user calls this method to set the voice position of a remote user, the voice difference between the left and right channels allows the local user to track the real-time position of the remote user, creating a sense of space. This method applies to massive multiplayer online games, such as Battle Royale games.For this method to work, enable stereo panning for remote users by calling the enableSoundPositionIndication method before joining a channel.For the best voice positioning, Agora recommends using a wired headset.Call this method after joining a channel.
   *
   * @param uid The user ID of the remote user.
   *
   * @param pan The voice position of the remote user. The value ranges from -1.0 to 1.0:0.0: (Default) The remote voice comes from the front.-1.0: The remote voice comes from the left.1.0: The remote voice comes from the right.
   *
   * @param gain The volume of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original volume of the remote user). The smaller the value, the lower the volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): number;

  /**
   * @ignore
   */
  abstract enableSpatialAudio(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract setRemoteUserSpatialAudioParams(
    uid: number,
    params: SpatialAudioParams
  ): number;

  /**
   * Sets a preset voice beautifier effect.
   * Call this method to set a preset voice beautifier effect for the local user who sends an audio stream. After setting a voice beautifier effect, all users in the channel can hear the effect. You can set different voice beautifier effects for different scenarios. For better voice effects, Agora recommends that you call setAudioProfile and set scenario to AudioScenarioGameStreaming(3) and profile to AudioProfileMusicHighQuality(4) or AudioProfileMusicHighQualityStereo(5) before calling this method.You can call this method either before or after joining a channel.Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard(1) or AudioProfileIot(6), or the method does not take effect.This method works best with the human voice. Agora does not recommend using this method for audio containing music.After calling setVoiceBeautifierPreset, Agora recommends not calling the following methods, because they can override settings in setVoiceBeautifierPreset: setAudioEffectPreset setAudioEffectParameters setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceBeautifierParameters setVoiceConversionPreset
   *
   * @param preset The preset voice beautifier effect options: VoiceBeautifierPreset .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number;

  /**
   * Sets an SDK preset audio effect.
   * Call this method to set an SDK preset audio effect for the local user who sends an audio stream. This audio effect does not change the gender characteristics of the original voice. After setting an audio effect, all users in the channel can hear the effect.To get better audio effect quality, Agora recommends calling and setting scenario in setAudioProfile as AudioScenarioGameStreaming(3) before calling this method.You can call this method either before or after joining a channel.Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard (1) or AudioProfileIot(6), or the method does not take effect.This method works best with the human voice. Agora does not recommend using this method for audio containing music.If you call setAudioEffectPreset and set enumerators except for RoomAcoustics3dVoice or PitchCorrection, do not call setAudioEffectParameters ; otherwise, setAudioEffectPreset is overridden.After calling setAudioEffectPreset, Agora recommends not calling the following methods, or the settings in setAudioEffectPreset are overridden: setVoiceBeautifierPreset setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceBeautifierParameters setVoiceConversionPreset
   *
   * @param preset The options for SDK preset audio effects. See AudioEffectPreset .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioEffectPreset(preset: AudioEffectPreset): number;

  /**
   * Sets a preset voice beautifier effect.
   * Call this method to set a preset voice beautifier effect for the local user who sends an audio stream. After setting an audio effect, all users in the channel can hear the effect. You can set different voice beautifier effects for different scenarios. To achieve better audio effect quality, Agora recommends that you call setAudioProfile and set the profile to AudioProfileMusicHighQuality(4) or AudioProfileMusicHighQualityStereo(5) and scenario to AudioScenarioGameStreaming(3) before calling this method.You can call this method either before or after joining a channel.Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard(1) or AudioProfileIot(6), or the method does not take effect.This method works best with the human voice. Agora does not recommend using this method for audio containing music.After calling setVoiceConversionPreset, Agora recommends not calling the following methods, or the settings in setVoiceConversionPreset are overridden: setAudioEffectPreset setAudioEffectParameters setVoiceBeautifierPreset setVoiceBeautifierParameters setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb
   *
   * @param preset The options for the preset voice beautifier effects: VoiceConversionPreset .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setVoiceConversionPreset(preset: VoiceConversionPreset): number;

  /**
   * Sets parameters for SDK preset audio effects.
   * Call this method to set the following parameters for the local user who sends an audio stream:3D voice effect: Sets the cycle period of the 3D voice effect.Pitch correction effect: Sets the basic mode and tonic pitch of the pitch correction effect. Different songs have different modes and tonic pitches. Agora recommends bounding this method with interface elements to enable users to adjust the pitch correction interactively.After setting the audio parameters, all users in the channel can hear the effect.You can call this method either before or after joining a channel.To get better audio effect quality, Agora recommends calling and setting scenario in setAudioProfile as AudioScenarioGameStreaming(3) before calling this method.Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard(1) or AudioProfileIot(6), or the method does not take effect.This method works best with the human voice. Agora does not recommend using this method for audio containing music.After calling setAudioEffectParameters, Agora recommends not calling the following methods, or the settings in setAudioEffectParameters are overridden: setAudioEffectPreset setVoiceBeautifierPreset setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceBeautifierParameters setVoiceConversionPreset
   *
   * @param preset The options for SDK preset audio effects:RoomAcoustics3dVoice, 3D voice effect:You need to set the profile parameter in setAudioProfile to AudioProfileMusicStandardStereo(3) or AudioProfileMusicHighQualityStereo(5) before setting this enumerator; otherwise, the enumerator setting does not take effect.If the 3D voice effect is enabled, users need to use stereo audio playback devices to hear the anticipated voice effect.PitchCorrection; pitch correction effect: To achieve better audio effect quality, Agora recommends setting the profile parameter in setAudioProfile to AudioProfileMusicHighQuality(4) or AudioProfileMusicHighQualityStereo(5) before setting this enumerator.
   *
   * @param param1 If you set preset to RoomAcoustics3dVoice, param1 indicates the cycle period of the 3D voice effect. The value range is [1,60], in seconds. The default value is 10, indicating that the voice moves around you every 10 seconds. If you set preset to PitchCorrection, param1 indicates the basic mode of the pitch correction effect:1: (Default) Natural major scale.2: Natural minor scale.3: Japanese pentatonic scale.
   *
   * @param param2 If you set preset to RoomAcoustics3dVoice, you need to set param2 to 0. If you set preset to PitchCorrection, param2 indicates the tonic pitch of the pitch correction effect:1: A2: A#3: B4: (Default) C5: C#6: D7: D#8: E9: F10: F#11: G12: G#
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * Sets parameters for the preset voice beautifier effects.
   * Call this method to set a gender characteristic and a reverberation effect for the singing beautifier effect. This method sets parameters for the local user who sends an audio stream. After setting the audio parameters, all users in the channel can hear the effect.For better voice effects, Agora recommends that you call setAudioProfile and set scenario to AudioScenarioGameStreaming(3) and profile to AudioProfileMusicHighQuality(4) or AudioProfileMusicHighQualityStereo(5) before calling this method.You can call this method either before or after joining a channel.Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard(1)This method works best with the human voice. Agora does not recommend using this method for audio containing music.After calling setVoiceBeautifierParameters, Agora recommends not calling the following methods, because they can override settings in setVoiceBeautifierParameters: setAudioEffectPreset setAudioEffectParameters setVoiceBeautifierPreset setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceConversionPreset
   *
   * @param preset The option for the preset audio effect:SINGING_BEAUTIFIER: The singing beautifier effect.
   *
   * @param param1 The gender characteristics options for the singing voice:1: A male-sounding voice.2: A female-sounding voice.
   *
   * @param param2 The reverberation effect options for the singing voice:1: The reverberation effect sounds like singing in a small room.2: The reverberation effect sounds like singing in a large room.3: The reverberation effect sounds like singing in a hall.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * @ignore
   */
  abstract setVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * Changes the voice pitch of the local speaker.
   * You can call this method either before or after joining a channel.
   *
   * @param pitch The local voice pitch. The value range is [0.5,2.0]. The lower the value, the lower the pitch. The default value is 1 (no change to the pitch).
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLocalVoicePitch(pitch: number): number;

  /**
   * Sets the local voice equalization effect.
   * You can call this method either before or after joining a channel.
   *
   * @param bandFrequency The band frequency. The value ranges between 0 and 9; representing the respective 10-band center frequencies of the voice effects, including 31, 62, 125, 250, 500, 1k, 2k, 4k, 8k, and 16k Hz.
   *
   * @param bandGain The gain of each band in dB. The value ranges between -15 and 15. The default value is 0.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number;

  /**
   * Sets the local voice reverberation.
   * The SDK also provides the setAudioEffectPreset method, which allows you to directly implement preset reverb effects for such as pop, R&B, and KTV.You can call this method either before or after joining a channel.
   *
   * @param reverbKey The reverberation key. Agora provides five reverberation keys; see AudioReverbType for details.
   *
   * @param value The value of the reverberation key.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): number;

  /**
   * @ignore
   */
  abstract setHeadphoneEQPreset(preset: HeadphoneEqualizerPreset): number;

  /**
   * @ignore
   */
  abstract setHeadphoneEQParameters(lowGain: number, highGain: number): number;

  /**
   * Sets the log file.
   * Deprecated:Use the mLogConfig parameter in initialize method instead.Specifies an SDK output log file. The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.Ensure that you call this method immediately after calling the initialize method to initialize the IRtcEngine , or the output log may not be complete.
   *
   * @param filePath The complete path of the log files. These log files are encoded in UTF-8.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLogFile(filePath: string): number;

  /**
   * Sets the log output level of the SDK.
   * Deprecated:Use logConfig in initialize instead.This method sets the output log level of the SDK. You can use one or a combination of the log filter levels. The log level follows the sequence of LogFilterOff, LogFilterCritical, LogFilterError, LogFilterWarn, LogFilterInfo, and LogFilterDebug. Choose a level to see the logs preceding that level.If, for example, you set the log level to LogFilterWarn, you see the logs within levels LogFilterCritical, LogFilterError, and LogFilterWarn.
   *
   * @param filter The output log level of the SDK. See LogFilterType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLogFilter(filter: LogFilterType): number;

  /**
   * Sets the output log level of the SDK.
   * Deprecated:This method is deprecated. Use RtcEngineContext instead to set the log output level.Choose a level to see the logs preceding that level.
   *
   * @param level The log level: LogLevel .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLogLevel(level: LogLevel): number;

  /**
   * Sets the log file size.
   * Deprecated:Use the logConfig parameter in initialize instead.By default, the SDK generates five SDK log files and five API call log files with the following rules:The SDK log files are: agorasdk.log, agorasdk.1.log, agorasdk.2.log, agorasdk.3.log, and agorasdk.4.log.The API call log files are: agoraapi.log, agoraapi.1.log, agoraapi.2.log, agoraapi.3.log, and agoraapi.4.log.The default size for each SDK log file is 1,024 KB; the default size for each API call log file is 2,048 KB. These log files are encoded in UTF-8.The SDK writes the latest logs in agorasdk.log or agoraapi.log.When agorasdk.log is full, the SDK processes the log files in the following order:Delete the agorasdk.4.log file (if any).Rename agorasdk.3.log to agorasdk.4.log.Rename agorasdk.2.log to agorasdk.3.log.Rename agorasdk.1.log to agorasdk.2.log.Create a new agorasdk.log file.The overwrite rules for the agoraapi.log file are the same as for agorasdk.log.This method is used to set the size of the agorasdk.log file only and does not effect the agoraapi.log file.
   *
   * @param fileSizeInKBytes The size (KB) of an agorasdk.log file. The value range is [128,20480]. The default value is 1,024 KB. If you set fileSizeInKByte smaller than 128 KB, the SDK automatically adjusts it to 128 KB; if you set fileSizeInKByte greater than 20,480 KB, the SDK automatically adjusts it to 20,480 KB.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLogFileSize(fileSizeInKBytes: number): number;

  /**
   * @ignore
   */
  abstract uploadLogFile(requestId: string): number;

  /**
   * Updates the display mode of the local video view.
   * After initializing the local video view, you can call this method to update its rendering and mirror modes. It affects only the video view that the local user sees, not the published local video stream.Ensure that you have called the setupLocalVideo method to initialize the local video view before calling this method.During a call, you can call this method as many times as necessary to update the display mode of the local video view.
   *
   * @param renderMode The local video display mode. See RenderModeType .
   *
   * @param mirrorMode The rendering mode of the local video view. See VideoMirrorModeType .If you use a front camera, the SDK enables the mirror mode by default; if you use a rear camera, the SDK disables the mirror mode by default.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode?: VideoMirrorModeType
  ): number;

  /**
   * Updates the display mode of the video view of a remote user.
   * After initializing the video view of a remote user, you can call this method to update its rendering and mirror modes. This method affects only the video view that the local user sees.Please call this method after initializing the remote view by calling the setupRemoteVideo method.During a call, you can call this method as many times as necessary to update the display mode of the video view of a remote user.
   *
   * @param uid The user ID of the remote user.
   *
   * @param renderMode The rendering mode of the remote user view.
   *
   * @param mirrorMode The mirror mode of the remote user view.
   */
  abstract setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number;

  /**
   * Sets the local video mirror mode.
   * Deprecated:This method is deprecated.Use setupLocalVideo or setLocalRenderMode instead.
   *
   * @param mirrorMode The local video mirror mode. See VideoMirrorModeType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number;

  /**
   * Enables/Disables dual-stream mode.
   * Sets the stream mode to the single-stream (default) or dual-stream mode. (LIVE_BROADCASTING only.) You can call this method to enable or disable the dual-stream mode on the publisher side.Dual streams are a hybrid of a high-quality video stream and a low-quality video stream:High-quality video stream: High bitrate, high resolution.Low-quality video stream: Low bitrate, low resolution.After you enable the dual-stream mode, you can call setRemoteVideoStreamType to choose toreceive the high-quality video stream or low-quality video stream on the subscriber side.This method only takes effect for the video stream captured by the SDK through the camera. If you use video streams from the custom video source or captured by the SDK through the screen, you need to call enableDualStreamMode [2/3] or enableDualStreamMode to enable dual-stream mode.You can call this method either before or after joining a channel.
   *
   * @param enabled Whether to enable dual-stream mode.true: Enable dual-stream mode.false: Disable dual-stream mode.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableDualStreamMode(
    enabled: boolean,
    streamConfig?: SimulcastStreamConfig
  ): number;

  /**
   * @ignore
   */
  abstract setDualStreamMode(
    mode: SimulcastStreamMode,
    streamConfig?: SimulcastStreamConfig
  ): number;

  /**
   * @ignore
   */
  abstract enableEchoCancellationExternal(
    enabled: boolean,
    audioSourceDelay: number
  ): number;

  /**
   * @ignore
   */
  abstract enableCustomAudioLocalPlayback(
    sourceId: number,
    enabled: boolean
  ): number;

  /**
   * @ignore
   */
  abstract startPrimaryCustomAudioTrack(config: AudioTrackConfig): number;

  /**
   * @ignore
   */
  abstract stopPrimaryCustomAudioTrack(): number;

  /**
   * @ignore
   */
  abstract startSecondaryCustomAudioTrack(config: AudioTrackConfig): number;

  /**
   * @ignore
   */
  abstract stopSecondaryCustomAudioTrack(): number;

  /**
   * Sets the format of the captured raw audio data.
   * Sets the audio format for the onRecordAudioFrame callback.Ensure that you call this method before joining a channel.The SDK calculates the sampling interval based on the samplesPerCall, sampleRate and channel parameters set in this method.Sample interval = samplePerCall/(sampleRate × channel). Ensure that the sample interval ≥ 0.01 (s).
   *
   * @param sampleRate The sample rate returned in the onRecordAudioFrame callback, which can be set as 8000, 16000, 32000, 44100, or 48000 Hz.
   *
   * @param channel The number of channels returned in the onRecordAudioFrame callback:1: Mono.2: Stereo.
   *
   * @param mode
   *
   * @param samplesPerCall The number of data samples returned in the onRecordAudioFrame callback, such as 1024 for the Media Push.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * Sets the audio data format for playback.
   * Sets the data format for the onPlaybackAudioFrame callback.Ensure that you call this method before joining a channel.The SDK calculates the sampling interval based on the samplesPerCall, sampleRate and channel parameters set in this method.Sample interval = samplePerCall/(sampleRate × channel). Ensure that the sample interval ≥ 0.01 (s). The SDK triggers the onPlaybackAudioFrame callback according to the sampling interval.
   *
   * @param sampleRate The sample rate returned in the onPlaybackAudioFrame callback, which can be set as 8000, 16000, 32000, 44100, or 48000 Hz.
   *
   * @param channel The number of channels returned in the onPlaybackAudioFrame callback:1: Mono.2: Stereo.
   *
   * @param mode The use mode of the audio frame. See RawAudioFrameOpModeType .
   *
   * @param samplesPerCall The number of data samples returned in the onPlaybackAudioFrame callback, such as 1024 for the Media Push.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * Sets the audio data format reported by onMixedAudioFrame .
   *
   * @param sampleRate The sample rate (Hz) of the audio data, which can be set as 8000, 16000, 32000, 44100, or 48000.
   *
   * @param channel The number of channels of the audio data, which can be set as 1 (Mono) or 2 (Stereo).
   *
   * @param samplesPerCall Sets the number of samples. In Media Push scenarios, set it as 1024.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number;

  /**
   * @ignore
   */
  abstract setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * Sets the audio data format reported by onPlaybackAudioFrameBeforeMixing .
   *
   * @param sampleRate The sample rate (Hz) of the audio data, which can be set as 8000, 16000, 32000, 44100, or 48000.
   *
   * @param channel The number of channels of the external audio source, which can be set as 1(Mono) or 2(Stereo).
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): number;

  /**
   * Turns on audio spectrum monitoring.
   * If you want to obtain the audio spectrum data of local or remote users, you can register the audio spectrum observer and enable audio spectrum monitoring.You can call this method either before or after joining a channel.
   *
   * @param intervalInMS The interval (in milliseconds) at which the SDK triggers the onLocalAudioSpectrum and onRemoteAudioSpectrum callbacks. The default value is 100. Do not set this parameter to less than 10 milliseconds, otherwise the calling of this method fails.
   *
   * @returns
   * 0: Success.< 0: Failure.-2: Invalid parameters.
   */
  abstract enableAudioSpectrumMonitor(intervalInMS?: number): number;

  /**
   * Disables audio spectrum monitoring.
   * After calling enableAudioSpectrumMonitor , if you want to disable audio spectrum monitoring, you can call this method.You can call this method either before or after joining a channel.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract disableAudioSpectrumMonitor(): number;

  /**
   * Registers an audio spectrum observer.
   * After successfully registering the audio spectrum observer and calling
   * enableAudioSpectrumMonitor to enable the audio spectrum monitoring, the SDK reports the callback that you implement in the IAudioSpectrumObserver class at the time interval you set.You can call this method either before or after joining a channel.
   *
   * @param observer The Audio spectrum observer. See IAudioSpectrumObserver .
   *
   * @returns
   * One IAudioSpectrumObserver object.
   */
  abstract registerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * Unregisters the audio spectrum observer.
   * After calling registerAudioSpectrumObserver , if you want to disable audio spectrum monitoring, you can call this method.You can call this method either before or after joining a channel.
   */
  abstract unregisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * Adjusts the capturing signal volume.
   * You can call this method either before or after joining a channel.
   *
   * @param volume The volume of the user. The value range is [0,400].0: Mute.100: (Default) The original volume.400: Four times the original volume (amplifying the audio signals by four times).
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustRecordingSignalVolume(volume: number): number;

  /**
   * Whether to mute the recording signal.
   *
   * @param mute true: Mute the recording signal.false: (Default) Do not mute the recording signal.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteRecordingSignal(mute: boolean): number;

  /**
   * Adjusts the playback signal volume of all remote users.
   * This method adjusts the playback volume that is the mixed volume of all remote users.You can call this method either before or after joining a channel.
   *
   * @param volume The volume of the user. The value range is [0,400].
   *  0: Mute.
   *  100: (Default) The original volume.
   *  400: Four times the original volume (amplifying the audio signals by four times).
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract adjustPlaybackSignalVolume(volume: number): number;

  /**
   * Adjusts the playback signal volume of a specified remote user.
   * You can call this method to adjust the playback volume of a specified remote user. To adjust the playback volume of different remote users, call the method as many times, once for each remote user.Call this method after joining a channel.The playback volume here refers to the mixed volume of a specified remote user.
   *
   * @param volume Audio mixing volume. The value ranges between 0 and 100. The default value is 100, which means the original volume.
   *
   * @param uid The user ID of the remote user.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustUserPlaybackSignalVolume(uid: number, volume: number): number;

  /**
   * @ignore
   */
  abstract setLocalPublishFallbackOption(option: StreamFallbackOptions): number;

  /**
   * @ignore
   */
  abstract setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): number;

  /**
   * @ignore
   */
  abstract enableLoopbackRecording(
    enabled: boolean,
    deviceName?: string
  ): number;

  /**
   * @ignore
   */
  abstract adjustLoopbackSignalVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract getLoopbackRecordingVolume(): number;

  /**
   * Enables in-ear monitoring.
   * This method enables or disables in-ear monitoring.
   *
   * @param enabled Enables in-ear monitoring.true: Enables in-ear monitoring.false: (Default) Disables in-ear monitoring.
   *
   * @param includeAudioFilters The audio filter of in-ear monitoring: See EarMonitoringFilterType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number;

  /**
   * Sets the volume of the in-ear monitor.
   * Users must use wired earphones to hear their own voices.You can call this method either before or after joining a channel.
   *
   * @param volume The volume of the in-ear monitor. The value ranges between 0 and 100. The default value is 100.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setInEarMonitoringVolume(volume: number): number;

  /**
   * Adds an extension to the SDK.
   *
   * @param path The extension library path and name. For example: /library/libagora_segmentation_extension.dll.
   *
   * @param unloadAfterUse Whether to uninstall the current extension when you no longer using it:true: Uninstall the extension when the IRtcEngine is destroyed.false: (Rcommended) Do not uninstall the extension until the process terminates.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract loadExtensionProvider(
    path: string,
    unloadAfterUse?: boolean
  ): number;

  /**
   * Sets the properties of the extension provider.
   * You can call this method to set the attributes of the extension provider and initialize the relevant parameters according to the type of the provider.Call this method after enableExtension , and before enabling the audio ( enableAudio / enableLocalAudio ) or the video ( enableVideo / enableLocalVideo ).
   *
   * @param value The value of the extension key.
   *
   * @param key The key of the extension.
   *
   * @param provider The name of the extension provider.
   */
  abstract setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): number;

  /**
   * Enables/Disables extensions.
   * Ensure that you call this method before joining a channel.If you want to enable multiple extensions, you need to call this method multiple times.The data processing order of different extensions in the SDK is determined by the order in which the extensions are enabled. That is, the extension that is enabled first will process the data first.
   *
   * @param extension The name of the extension.
   *
   * @param provider The name of the extension provider.
   *
   * @param enable Whether to enable the extension:true: Enable the extension.false: Disable the extension.
   *
   * @param type Type of media source. See MediaSourceType . In this method, this parameter supports only the following two settings:The default value is UnknownMediaSource.If you want to use the second camera to capture video, set this parameter to SecondaryCameraSource.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableExtension(
    provider: string,
    extension: string,
    extensionInfo: ExtensionInfo,
    enable?: boolean
  ): number;

  /**
   * Sets the properties of the extension.
   * After enabling the extension, you can call this method to set the properties of the extension.
   *
   * @param provider The name of the extension provider.
   *
   * @param extension The name of the extension.
   *
   * @param key The key of the extension.
   *
   * @param value The value of the extension key.
   *
   * @param type The type of the video source. See MediaSourceType .
   */
  abstract setExtensionProperty(
    provider: string,
    extension: string,
    extensionInfo: ExtensionInfo,
    key: string,
    value: string
  ): number;

  /**
   * Gets detailed information of the extension.
   *
   * @param key The key of the extension.
   *
   * @param extension The name of the extension.
   *
   * @param provider The name of the extension provider.
   *
   * @param sourceType Source type of the extension. See MediaSourceType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract getExtensionProperty(
    provider: string,
    extension: string,
    extensionInfo: ExtensionInfo,
    key: string,
    bufLen: number
  ): string;

  /**
   * Sets the camera capture configuration.
   * Call this method before calling joinChannel [2/2] , enableVideo , or enableLocalVideo , depending on which method you use to turn on your local camera.
   *
   * @param config The camera capturer configuration. See CameraCapturerConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Creates a customized video track.
   * When you need to publish multiple custom captured videos in the channel, you can refer to the following steps:Call this method to create a video track and get the video track ID.In each channel's ChannelMediaOptions , set the customVideoTrackId parameter to the ID of the video track you want to publish, and set publishCustomVideoTrack to true.
   *
   * @returns
   * If the method call is successful, the video track ID is returned as the unique identifier of the video track.If the method call fails, a negative value is returned.
   */
  abstract createCustomVideoTrack(): number;

  /**
   * @ignore
   */
  abstract createCustomEncodedVideoTrack(senderOption: SenderOptions): number;

  /**
   * Destroys the specified video track.
   *
   * @param videoTrackId The video track ID returned by calling the createCustomVideoTrack method.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract destroyCustomVideoTrack(videoTrackId: number): number;

  /**
   * @ignore
   */
  abstract destroyCustomEncodedVideoTrack(videoTrackId: number): number;

  /**
   * Switches between front and rear cameras.
   * This method needs to be called after the camera is started (for example, by calling startPreview or joinChannel [2/2] ).
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract switchCamera(): number;

  /**
   * Checks whether the device supports camera zoom.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo ,depending on which method you use to turn on your local camera.
   *
   * @returns
   * true: The device supports camera zoom.false: The device does not support camera zoom.
   */
  abstract isCameraZoomSupported(): boolean;

  /**
   * Checks whether the device camera supports face detection.
   *
   * @returns
   * true: The device camera supports face detection.false: The device camera does not support face detection.
   */
  abstract isCameraFaceDetectSupported(): boolean;

  /**
   * Checks whether the device supports camera flash.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo ,depending on which method you use to turn on your local camera.The app enables the front camera by default. If your front camera does not support enabling the flash, this method returns false. If you want to check whether the rear camera supports the flash function, call switchCamera before this method.On iPads with system version 15, even if isCameraTorchSupported returns true, you might fail to successfully enable the flash by calling setCameraTorchOn due to system issues.
   *
   * @returns
   * true: The device supports enabling the flash.false: The device does not support enabling the flash.
   */
  abstract isCameraTorchSupported(): boolean;

  /**
   * Check whether the device supports the manual focus function.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo ,depending on which method you use to turn on your local camera.
   *
   * @returns
   * true: The device supports the manual focus function.false: The device does not support the manual focus function.
   */
  abstract isCameraFocusSupported(): boolean;

  /**
   * Checks whether the device supports the face auto-focus function.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo ,depending on which method you use to turn on your local camera.
   *
   * @returns
   * true: The device supports the face auto-focus function.false: The device does not support the face auto-focus function.
   */
  abstract isCameraAutoFocusFaceModeSupported(): boolean;

  /**
   * Sets the camera zoom ratio.
   * Call this method before calling joinChannel [2/2] , enableVideo , or enableLocalVideo , depending on which method you use to turn on your local camera.
   *
   * @param factor The camera zoom ratio. The value ranges between 1.0 and the maximum zoom supported by the device. You can get the maximum zoom ratio supported by the device by calling the getCameraMaxZoomFactor method.
   *
   * @returns
   * The camera zoom factor value, if successful.< 0: Failure.
   */
  abstract setCameraZoomFactor(factor: number): number;

  /**
   * Enables/Disables face detection for the local user.
   * You can call this method either before or after joining a channel.Once face detection is enabled, the SDK triggers the onFacePositionChanged callback to report the face information of the local user, which includes the following:The width and height of the local video.The position of the human face in the local view.The distance between the human face and the screen.This method needs to be called after the camera is started (for example, by calling startPreview or joinChannel [2/2]).
   *
   * @param enabled Whether to enable face detection for the local user:true: Enable face detection.false: (Default) Disable face detection.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableFaceDetection(enabled: boolean): number;

  /**
   * Gets the maximum zoom ratio supported by the camera.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo , depending on which method you use to turn on your local camera.
   *
   * @returns
   * The maximum zoom factor.
   */
  abstract getCameraMaxZoomFactor(): number;

  /**
   * Sets the camera manual focus position.
   * This method needs to be called after the camera is started (for example, by calling startPreview or joinChannel [2/2] ). After a successful method call, the SDK triggers the onCameraFocusAreaChanged callback.
   *
   * @param positionX The horizontal coordinate of the touchpoint in the view.
   *
   * @param positionY The vertical coordinate of the touchpoint in the view.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number;

  /**
   * Enables the camera flash.
   * Call this method before calling joinChannel [2/2] , enableVideo , or enableLocalVideo , depending on which method you use to turn on your local camera.
   *
   * @param isOn Whether to turn on the camera flash:true: Turn on the flash.false: (Default) Turn off the flash.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setCameraTorchOn(isOn: boolean): number;

  /**
   * Sets whether to enable face autofocus.
   * By default, the SDK disables face autofocus on Android and enables face autofocus on iOS. To set face autofocus, call this method.Call this method after the camera is started, such as after joinChannel [2/2] , enableVideo , or enableLocalVideo .
   *
   * @param enabled Whether to enable face autofocus:true: Enable face autofocus.false: Disable face autofocus.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;

  /**
   * Checks whether the device supports manual exposure.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo ,depending on which method you use to turn on your local camera.
   *
   * @returns
   * true: The device supports manual exposure.false: The device does not support manual exposure.
   */
  abstract isCameraExposurePositionSupported(): boolean;

  /**
   * Sets the camera exposure position.
   * This method needs to be called after the camera is started (for example, by calling startPreview or joinChannel [2/2] ).After a successful method call, the SDK triggers the onCameraExposureAreaChanged callback.
   *
   * @param positionXinView The horizontal coordinate of the touchpoint in the view.
   *
   * @param positionYinView The vertical coordinate of the touchpoint in the view.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number;

  /**
   * Checks whether the device supports auto exposure.
   * Call this method after enabling the local camera, for example, by calling joinChannel [2/2] , enableVideo , or enableLocalVideo ,depending on which method you use to turn on your local camera.
   * This method applies to iOS only.
   *
   * @returns
   * true: The device supports auto exposure.false: The device does not support auto exposure.
   */
  abstract isCameraAutoExposureFaceModeSupported(): boolean;

  /**
   * Sets whether to enable auto exposure.
   * Call this method before calling joinChannel [2/2] , enableVideo , or enableLocalVideo , depending on which method you use to turn on your local camera.
   *
   * @param enabled Whether to enable auto exposure:
   *  true: Enable auto exposure.false: Disable auto exposure.
   */
  abstract setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;

  /**
   * Sets the default audio playback route.
   * Most mobile phones have two audio routes: an earpiece at the top, and a speakerphone at the bottom. The earpiece plays at a lower volume, and the speakerphone at a higher volume. When setting the default audio route, you determine whether audio playback comes through the earpiece or speakerphone when no external audio device is connected.
   *
   * @param defaultToSpeaker Whether to set the speakerphone as the default audio route:true: Set the speakerphone as the default audio route.false: Set the earpiece as the default audio route.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): number;

  /**
   * Enables/Disables the audio route to the speakerphone.
   * After a successful method call, the SDK triggers the onAudioRoutingChanged callback.You can call this method before joining a channel, when in a channel, or after leaving a channel. However, Agora recommends calling this method only when you are in a channel to change the audio route temporarily.If you do not have a clear requirement for transient settings, Agora recommends calling setDefaultAudioRouteToSpeakerphone to set the audio route.Any user behavior or audio-related API call might change the transient setting of setEnableSpeakerphone. Due to system limitations, if the user uses an external audio playback device such as a Bluetooth or wired headset on an iOS device, this method does not take effect.
   *
   * @param speakerOn Whether to set the speakerphone as the default audio route:true: Set the speakerphone as the audio route temporarily.false: Do not set the speakerphone as the audio route.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setEnableSpeakerphone(speakerOn: boolean): number;

  /**
   * Checks whether the speakerphone is enabled.
   *
   * @returns
   * true: The speakerphone is enabled, and the audio plays from the speakerphone.false: The speakerphone is not enabled, and the audio plays from devices other than the speakerphone. For example, the headset or earpiece.
   */
  abstract isSpeakerphoneEnabled(): boolean;

  /**
   * Gets a list of shareable screens and windows.
   * You can call this method before sharing a screen or window to get a list of shareable screens and windows, which enables a user to use thumbnails in the list to choose a particular screen or window to share. This list also contains important information such as window ID and screen ID, with which you can call startScreenCaptureByWindowId or startScreenCaptureByDisplayId to start the sharing.
   *
   * @param thumbSize The target size of the screen or window thumbnail (the width and height are in pixels). The SDK scales the original image to make the length of the longest side of the image the same as that of the target size without distorting the original image. For example, if the original image is 400 × 300 and thumbSize is 100 × 100, the actual size of the thumbnail is 100 × 75. If the target size is larger than the original size, the thumbnail is the original image and the SDK does not scale it.
   *
   * @param iconSize The target size of the icon corresponding to the application program (the width and height are in pixels). The SDK scales the original image to make the length of the longest side of the image the same as that of the target size without distorting the original image. For example, if the original image is 400 × 300 and iconSize is 100 × 100, the actual size of the icon is 100 × 75. If the target size is larger than the original size, the icon is the original image and the SDK does not scale it.
   *
   * @param includeScreen Whether the SDK returns the screen information in addition to the window information:true: The SDK returns screen and window information.false: The SDK returns the window information only.
   */
  abstract getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[];

  /**
   * @ignore
   */
  abstract setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number;

  /**
   * Shares the screen by specifying the display ID.
   * This method shares a screen or part of the screen.There are two ways to start screen sharing, you can choose one according to the actual needs:Call this method before joining a channel, and then call joinChannel [2/2] to join a channel and set publishScreenTrack or publishSecondaryScreenTrack to true to start screen sharing.Call this method after joining a channel, and then call updateChannelMediaOptions and set publishScreenTrack or publishSecondaryScreenTrack to true to start screen sharing.
   *
   * @param displayId The display ID of the screen to be shared.
   *
   * @param captureParams Screen sharing configurations. The default video dimension is 1920 x 1080, that is, 2,073,600 pixels. Agora uses the value of this parameter to calculate the charges. See ScreenCaptureParameters .
   *
   * @returns
   * 0: Success.< 0: Failure.ERR_INVALID_STATE: The screen sharing state is invalid. Probably because you have shared other screens or windows. Try calling stopScreenCapture to stop the current sharing and start sharing the screen again.ERR_INVALID_ARGUMENT: The parameter is invalid.
   */
  abstract startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * @ignore
   */
  abstract startScreenCaptureByScreenRect(
    screenRect: Rectangle,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * Gets the audio device information.
   * After calling this method, you can get whether the audio device supports ultra-low-latency capture and playback.You can call this method either before or after joining a channel.
   */
  abstract getAudioDeviceInfo(): DeviceInfo;

  /**
   * Shares the whole or part of a window by specifying the window ID.
   * There are two ways to start screen sharing, you can choose one according to the actual needs:
   * Call this method before joining a channel, and then call joinChannel [2/2] to join a channel and set publishScreenTrack or publishSecondaryScreenTrack to true to start screen sharing.
   * Call this method after joining a channel, and then call updateChannelMediaOptions and set publishScreenTrack or publishSecondaryScreenTrack to true to start screen sharing. This method shares a window or part of the window. You need to specify the ID of the window to be shared.
   *
   * @param windowId The ID of the window to be shared.
   *
   * @param captureParams Screen sharing configurations. The default video dimension is 1920 x 1080, that is, 2,073,600 pixels. Agora uses the value of this parameter to calculate the charges. See ScreenCaptureParameters .
   *
   * @returns
   * 0: Success.< 0: Failure.
   * ERR_INVALID_STATE: The screen sharing state is invalid. Probably because you have shared other screens or windows. Try calling stopScreenCapture to stop the current sharing and start sharing the screen again.
   * ERR_INVALID_ARGUMENT: The parameter is invalid.
   */
  abstract startScreenCaptureByWindowId(
    windowId: any,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * Sets the content hint for screen sharing.
   * A content hint suggests the type of the content being shared, so that the SDK applies different optimization algorithms to different types of content. If you don't call this method, the default content hint is ContentHintNone.You can call this method either before or after you start screen sharing.
   *
   * @param contentHint The content hint for screen sharing. See VideoContentHint .
   *
   * @returns
   * 0: Success.< 0: Failure.ERR_INVALID_STATE: The screen sharing state is invalid. Probably because you have shared other screens or windows. Try calling stopScreenCapture to stop the current sharing and start sharing the screen again.ERR_INVALID_ARGUMENT: The parameter is invalid.
   */
  abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

  /**
   * @ignore
   */
  abstract setScreenCaptureScenario(screenScenario: ScreenScenarioType): number;

  /**
   * Updates the screen sharing region.
   * Call this method after starting screen sharing or window sharing.
   *
   * @returns
   * 0: Success.< 0: Failure.ERR_INVALID_STATE: The screen sharing state is invalid. Probably because you have shared other screens or windows. Try calling stopScreenCapture to stop the current sharing and start sharing the screen again.ERR_INVALID_ARGUMENT: The parameter is invalid.
   */
  abstract updateScreenCaptureRegion(regionRect: Rectangle): number;

  /**
   * Updates the screen sharing parameters.
   * Call this method after starting screen sharing or window sharing.
   *
   * @param captureParams The screen sharing encoding parameters. The default video dimension is 1920 x 1080, that is, 2,073,600 pixels. Agora uses the value of this parameter to calculate the charges. See
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateScreenCaptureParameters(
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * Starts screen sharing.
   * This method applies to Android and iOS only.
   *
   * @param captureParams The screen sharing encoding parameters. The default video dimension is 1920 x 1080, that is, 2,073,600 pixels. Agora uses the value of this parameter to calculate the charges. See ScreenCaptureParameters2 .
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The parameter is null.
   */
  abstract startScreenCapture(captureParams: ScreenCaptureParameters2): number;

  /**
   * Updates the screen sharing parameters.
   * This method applies to Android and iOS only.
   *
   * @param captureParams The screen sharing encoding parameters. The default video dimension is 1920 x 1080, that is, 2,073,600 pixels. Agora uses the value of this parameter to calculate the charges. See ScreenCaptureParameters2 .
   *
   * @returns
   * 0: Success.< 0: Failure.
   * ERR_INVALID_STATE: The screen sharing state is invalid. Probably because you have shared other screens or windows. Try calling stopScreenCapture to stop the current sharing and start sharing the screen again.
   * ERR_INVALID_ARGUMENT: The parameter is invalid.
   */
  abstract updateScreenCapture(captureParams: ScreenCaptureParameters2): number;

  /**
   * Stops screen sharing.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopScreenCapture(): number;

  /**
   * Retrieves the call ID.
   * When a user joins a channel on a client, a callId is generated to identify the call from the client. Some methods, such as rate and complain , must be called after the call ends to submit feedback to the SDK. These methods require the callId parameter.Call this method after joining a channel.
   *
   * @returns
   * The current call ID, if the method succeeds.An empty string, if the method call fails.
   */
  abstract getCallId(): string;

  /**
   * Allows a user to rate a call after the call ends.
   * Ensure that you call this method after leaving a channel.
   *
   * @param callId The current call ID. You can get the call ID by calling getCallId .
   *
   * @param rating The rating of the call. The value is between 1 (lowest score) and 5 (highest score). If you set a value out of this range, the SDK returns the -2 (ERR_INVALID_ARGUMENT) error.
   *
   * @param description A description of the call. The string length should be less than 800 bytes.
   *
   * @returns
   * 0: Success.< 0: Failure.-2 (ERR_INVALID_ARGUMENT).-3 (ERR_NOT_READY).
   */
  abstract rate(callId: string, rating: number, description: string): number;

  /**
   * Allows a user to complain about the call quality after a call ends.
   * This method allows users to complain about the quality of the call. Call this method after the user leaves the channel.
   *
   * @param callId The current call ID. You can get the call ID by calling getCallId .
   *
   * @param description A description of the call. The string length should be less than 800 bytes.
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The parameter is invalid.3: The SDK is not ready. Possible reasons include the following:The initialization of IRtcEngine fails. Reinitialize the IRtcEngine.No user has joined the channel when the method is called. Please check your code logic.The user has not left the channel when the rate or complain method is called. Please check your code logic.The audio module is disabled. The program is not complete.
   */
  abstract complain(callId: string, description: string): number;

  /**
   * Starts Media Push without transcoding.
   * Ensure that you enable the media push service before using this function.Call this method after joining a channel.Only hosts in the LIVE_BROADCASTING profile can call this method.If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.You can call this method to push an audio or video stream to the specified CDN address. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times.After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the Media Push.
   *
   * @param url The address of media push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @returns
   * 0: Success.< 0: Failure.-2: url is null or the string length is 0.-7: The SDK is not initialized before calling this method.
   */
  abstract startRtmpStreamWithoutTranscoding(url: string): number;

  /**
   * Starts Media Push and sets the transcoding configuration.
   * You can call this method to push an audio or video stream to the specified CDN address and set the transcoding configuration. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times.After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the Media Push.Ensure that you enable the media push service before using this function.Call this method after joining a channel.Only hosts in the LIVE_BROADCASTING profile can call this method.If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *
   * @param url The address of media push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @param transcoding The transcoding configuration for media push. See LiveTranscoding .
   *
   * @returns
   * 0: Success.< 0: Failure.-2: url is null or the string length is 0.-7: The SDK is not initialized before calling this method.
   */
  abstract startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): number;

  /**
   * Updates the transcoding configuration.
   * After you start pushing media streams to CDN with transcoding, you can dynamically update the transcoding configuration according to the scenario. The SDK triggers the onTranscodingUpdated callback after the transcoding configuration is updated.
   *
   * @param transcoding The transcoding configuration for media push. See LiveTranscoding .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateRtmpTranscoding(transcoding: LiveTranscoding): number;

  /**
   * Stops pushing media streams to a CDN.
   * You can call this method to stop the live stream on the specified CDN address. This method can stop pushing media streams to only one CDN address at a time, so if you need to stop pushing streams to multiple addresses, call this method multiple times.After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of media push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopRtmpStream(url: string): number;

  /**
   * Starts the local video mixing.
   * After calling this method, you can merge multiple video streams into one video stream locally. Common scenarios include the following:In a live streaming scenario with cohosts or when using the Media Push function, you can locally mix the videos of multiple hosts into one.In scenarios where you capture multiple local video streams (for example, video captured by cameras, screen sharing streams, video files, or pictures), you can merge them into one video stream and then publish the mixed video stream after joining the channel.
   *
   * @param config Configuration of the local video mixing. See LocalTranscoderConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startLocalVideoTranscoder(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * Update the local video mixing configuration.
   * After calling startLocalVideoTranscoder , call this method if you want to update the local video mixing configuration.
   *
   * @param config Configuration of the local video mixing, see LocalTranscoderConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateLocalTranscoderConfiguration(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * Stops the local video mixing.
   * After calling startLocalVideoTranscoder , call this method if you want to stop the local video mixing.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopLocalVideoTranscoder(): number;

  /**
   * Starts video capture with a primary camera.
   *
   * @param config The configuration of the video capture with a primary camera. See CameraCapturerConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startPrimaryCameraCapture(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Starts video capture with a secondary camera.
   *
   * @param config The configuration of the video capture with a primary camera. See CameraCapturerConfiguration .
   */
  abstract startSecondaryCameraCapture(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Stops capturing video through a primary camera.
   * You can call this method to stop capturing video through the primary camera after calling the startPrimaryCameraCapture .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopPrimaryCameraCapture(): number;

  /**
   * Stops capturing video through the secondary camera.
   * You can call this method to stop capturing video through the secondary camera after calling the startSecondaryCameraCapture .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopSecondaryCameraCapture(): number;

  /**
   * Sets the rotation angle of the captured video.
   * When the video capture device does not have the gravity sensing function, you can call this method to manually adjust the rotation angle of the captured video.
   *
   * @param type The video source type. See VideoSourceType .
   *
   * @param orientation The clockwise rotation angle. See VideoOrientation .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  /**
   * @ignore
   */
  abstract setScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  /**
   * Starts sharing the primary screen.
   *
   * @param config The configuration of the captured screen. See ScreenCaptureConfiguration .
   */
  abstract startPrimaryScreenCapture(
    config: ScreenCaptureConfiguration
  ): number;

  /**
   * Starts sharing a secondary screen.
   *
   * @param config The configuration of the captured screen. See ScreenCaptureConfiguration .
   */
  abstract startSecondaryScreenCapture(
    config: ScreenCaptureConfiguration
  ): number;

  /**
   * Stop sharing the first screen.
   * After calling startPrimaryScreenCapture , you can call this method to stop sharing the first screen.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopPrimaryScreenCapture(): number;

  /**
   * Stops sharing the secondary screen.
   * After calling startSecondaryScreenCapture , you can call this method to stop sharing the secondary screen.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopSecondaryScreenCapture(): number;

  /**
   * Gets the current connection state of the SDK.
   * You can call this method either before or after joining a channel.
   *
   * @returns
   * The current connection state.
   */
  abstract getConnectionState(): ConnectionStateType;

  /**
   * Adds event handlers.
   * The SDK uses the IRtcEngineEventHandler class to send callbacks to the app. The app inherits the methods of this class to receive these callbacks. All methods in this interface class have default (empty) implementations. Therefore, the application can only inherit some required events. In the callbacks, avoid time-consuming tasks or calling APIs that can block the thread, such as the sendStreamMessage method.
   * Otherwise, the SDK may not work properly.
   *
   * @param eventHandler Callback events to be added.
   */
  abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

  /**
   * Removes the specified IRtcEngineEventHandler instance.
   * This method removes the specified callback handler. For callback events that you want to listen for only once, call this method to remove the relevant callback handler after you have received them.
   *
   * @param eventHandler The callback handler to be deleted. See IRtcEngineEventHandler .
   */
  abstract unregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): boolean;

  /**
   * @ignore
   */
  abstract setRemoteUserPriority(
    uid: number,
    userPriority: PriorityType
  ): number;

  /**
   * Sets the built-in encryption mode.
   * Deprecated:Use enableEncryption instead.The Agora SDK supports built-in encryption, which is set to the AES-128-GCM mode by default. Call this method to use other encryption modes. All users in the same channel must use the same encryption mode and secret. Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.Before calling this method, please call setEncryptionSecret to enable the built-in encryption function.
   *
   * @param encryptionMode The following encryption modes:"aes-128-xts": 128-bit AES encryption, XTS mode."aes-128-ecb": 128-bit AES encryption, ECB mode."aes-256-xts": 256-bit AES encryption, XTS mode."sm4-128-ecb": 128-bit SM4 encryption, ECB mode."aes-128-gcm": 128-bit AES encryption, GCM mode."aes-256-gcm": 256-bit AES encryption, GCM mode."": When this parameter is set as null, the encryption mode is set as "aes-128-gcm" by default.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setEncryptionMode(encryptionMode: string): number;

  /**
   * Enables built-in encryption with an encryption password before users join a channel.
   * Deprecated:This method is deprecated. Use enableEncryption instead.Before joining the channel, you need to call this method to set the secret parameter to enable the built-in encryption. All users in the same channel should use the same secret. The secret is automatically cleared once a user leaves the channel. If you do not specify the secret or secret is set as null, the built-in encryption is disabled.Do not use this method for CDN live streaming.For optimal transmission, ensure that the encrypted data size does not exceed the original data size + 16 bytes. 16 bytes is the maximum padding size for AES encryption.
   *
   * @param secret The encryption password.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setEncryptionSecret(secret: string): number;

  /**
   * Enables/Disables the built-in encryption.
   * In scenarios requiring high security, Agora recommends calling this method to enable the built-in encryption before joining a channel.All users in the same channel must use the same encryption mode and encryption key. After the user leaves the channel, the SDK automatically disables the built-in encryption. To enable the built-in encryption, call this method before the user joins the channel again.If you enable the built-in encryption, you cannot use the Media Push function.
   *
   * @param enabled Whether to enable built-in encryption:true: Enable the built-in encryption.false: Disable the built-in encryption.
   *
   * @param config Built-in encryption configurations. See EncryptionConfig .
   *
   * @returns
   * 0: Success.< 0: Failure.-2: An invalid parameter is used. Set the parameter with a valid value.-4: The built-in encryption mode is incorrect or the SDK fails to load the external encryption library. Check the enumeration or reload the external encryption library.-7: The SDK is not initialized. Initialize the IRtcEngine instance before calling this method.
   */
  abstract enableEncryption(enabled: boolean, config: EncryptionConfig): number;

  /**
   * Creates a data stream.
   * Creates a data stream. Each user can create up to five data streams in a single channel.
   *
   * @param config The configurations for the data stream. See DataStreamConfig .
   *
   * @returns
   * ID of the created data stream, if the method call succeeds.< 0: Failure.
   */
  abstract createDataStream(config: DataStreamConfig): number;

  /**
   * Sends data stream messages.
   * Sends data stream messages to all users in a channel. The SDK has the following restrictions on this method:Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 KB.Each client can send up to 6 KB of data per second.Each user can have up to five data streams simultaneously.A successful method call triggers the onStreamMessage callback on the remote client, from which the remote user gets the stream message.
   * A failed method call triggers the onStreamMessageError callback on the remote client.Ensure that you call createDataStream to create a data channel before calling this method.In live streaming scenarios, this method only applies to hosts.
   *
   * @param streamId The data stream ID. You can get the data stream ID by calling createDataStream.
   *
   * @param data The data to be sent.
   *
   * @param length The length of the data.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number;

  /**
   * Adds a watermark image to the local video.
   * This method adds a PNG watermark image to the local video in the live streaming. Once the watermark image is added, all the audience in the channel (CDN audience included), and the capturing device can see and capture it. Agora supports adding only one watermark image onto the local video, and the newly watermark image replaces the previous one.The watermark coordinatesare dependent on the settings in the setVideoEncoderConfiguration method:If the orientation mode of the encoding video ( OrientationMode ) is fixed landscape mode or the adaptive landscape mode, the watermark uses the landscape orientation.If the orientation mode of the encoding video (OrientationMode) is fixed portrait mode or the adaptive portrait mode, the watermark uses the portrait orientation.When setting the watermark position, the region must be less than thesetVideoEncoderConfiguration dimensions set in the method; otherwise, the watermark image will be cropped.Ensure that call this method after enableVideo .If you only want to add a watermark to the Media Push, you can call this method or the setLiveTranscoding method.This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.If you have enabledthe local video preview by calling the startPreview method, you can use the visibleInPreview member to set whether or not the watermark is visible in the preview.If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time. You can implement the watermark function in your application layer.
   *
   * @param watermarkUrl The local file path of the watermark image to be added. This method supports adding a watermark image from the local absolute or relative file path.
   *
   * @param options The options of the watermark image to be added.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): number;

  /**
   * Removes the watermark image from the video stream.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract clearVideoWatermarks(): number;

  /**
   * @ignore
   */
  abstract pauseAudio(): number;

  /**
   * @ignore
   */
  abstract resumeAudio(): number;

  /**
   * Enables interoperability with the Agora Web SDK (applicable only in the live streaming scenarios).
   * Deprecated:The SDK automatically enables interoperability with the Web SDK, so you no longer need to call this method.This method enables or disables interoperability with the Agora Web SDK. If the channel has Web SDK users, ensure that you call this method, or the video of the Native user will be a black screen for the Web user.This method is only applicable in live streaming scenarios, and interoperability is enabled by default in communication scenarios.
   *
   * @param enabled Whether to enable interoperability with the Agora Web SDK.true: Enable interoperability.false: (Default) Disable interoperability.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableWebSdkInteroperability(enabled: boolean): number;

  /**
   * Reports customized messages.
   * Agora supports reporting and analyzing customized messages. This function is in the beta stage with a free trial. The ability provided in its beta test version is reporting a maximum of 10 message pieces within 6 seconds, with each message piece not exceeding 256 bytes and each string not exceeding 100 bytes. To try out this function, contact and discuss the format of customized messages with us.
   */
  abstract sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): number;

  /**
   * Registers the metadata observer.
   * You need to implement the IMetadataObserver class and specify the metadata type in this method. This method enables you to add synchronized metadata in the video stream for more diversified
   * live interactive streaming, such as sending shopping links, digital coupons, and online quizzes.Call this method before joinChannel [2/2].
   *
   * @param observer The metadata observer. See IMetadataObserver .
   *
   * @param type The metadata type. The SDK currently only supports VideoMetadata. See MetadataType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /**
   * Unregisters the specified metadata observer.
   *
   * @param type The metadata type. The SDK currently only supports VideoMetadata. See MetadataType .
   *
   * @param observer The metadata observer. See IMetadataObserver .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /**
   * @ignore
   */
  abstract startAudioFrameDump(
    channelId: string,
    userId: number,
    location: string,
    uuid: string,
    passwd: string,
    durationMs: number,
    autoUpload: boolean
  ): number;

  /**
   * @ignore
   */
  abstract stopAudioFrameDump(
    channelId: string,
    userId: number,
    location: string
  ): number;

  /**
   * Registers a user account.
   * Once registered, the user account can be used to identify the local user when the user joins the channel. After the registration is successful, the user account can identify the identity of the local user, and the user can use it to join the channel.After the user successfully registers a user account, the SDK triggers the onLocalUserRegistered callback on the local client, reporting the user ID and user account of the local user.This method is optional. To join a channel with a user account, you can choose either of the following ways:Call registerLocalUserAccount to create a user account, and then call joinChannelWithUserAccount to join the channel.Call the joinChannelWithUserAccount method to join the channel.The difference between the two ways is that the time elapsed between calling the registerLocalUserAccount method and joining the channel is shorter than directly calling joinChannelWithUserAccount.Ensure that you set the userAccount parameter; otherwise, this method does not take effect.Ensure that the userAccount is unique in the channel.To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the ID of the user is set to the same parameter type.
   *
   * @param appId The App ID of your project on Agora Console.
   *
   * @param userAccount The user account. This parameter is used to identify the user in the channel for real-time audio and video engagement. You need to set and manage user accounts yourself and ensure that each user account in the same channel is unique. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as NULL. Supported characters are (89 in total):The 26 lowercase English letters: a to z.The 26 uppercase English letters: A to Z.All numeric characters: 0 to 9.Space"!", "#", "$", "%", "&amp;", "(", ")", "+", "-", ":", ";", "&lt;", "= ", ".", "&gt;", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract registerLocalUserAccount(appId: string, userAccount: string): number;

  /**
   * Joins the channel with a user account, and configures whether to automatically subscribe to audio or video streams after joining the channel.
   * This method allows a user to join the channel with the user account. After the user successfully joins the channel, the SDK triggers the following callbacks:The local client: onLocalUserRegistered , onJoinChannelSuccess and onConnectionStateChanged callbacks.The remote client: The onUserJoined callback if the user is in the COMMUNICATION profile, and the onUserInfoUpdated callback if the user is a host in the LIVE_BROADCASTING profile.Once a user joins the channel, the user subscribes to the audio and video streams of all the other users in the channel by default, giving rise to usage and billing calculation. To stop subscribing to a specified stream or all remote streams, call the corresponding mute methods.To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the ID of the user is set to the same parameter type.
   *
   * @param options The channel media options. See ChannelMediaOptions .
   *
   * @param token The token generated on your server for authentication.
   *
   * @param channelId The channel name. This parameter signifies the channel in which users engage in real-time audio and video interaction. Under the premise of the same App ID, users who fill in the same channel ID enter the same channel for audio and video interaction. The string length must be less than 64 bytes. Supported characters:All lowercase English letters: a to z.All uppercase English letters: A to Z.All numeric characters: 0 to 9.Space"!", "#", "$", "%", "&amp;", "(", ")", "+", "-", ":", ";", "&lt;", "= ", ".", "&gt;", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @param userAccount The user account. This parameter is used to identify the user in the channel for real-time audio and video engagement. You need to set and manage user accounts yourself and ensure that each user account in the same channel is unique. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as NULL. Supported characters are (89 in total):The 26 lowercase English letters: a to z.The 26 uppercase English letters: A to Z.All numeric characters: 0 to 9.Space"!", "#", "$", "%", "&amp;", "(", ")", "+", "-", ":", ";", "&lt;", "= ", ".", "&gt;", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in the ChannelMediaOptions structure is invalid. You need to pass in a valid parameter and join the channel again.-3: Failes to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.-7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.-8: IRtcEngineThe internal state of the object is wrong. The typical cause is that you call this method to join the channel without calling stopEchoTest to stop the test after calling startEchoTest to start a call loop test. You need to call stopEchoTest before calling this method.-17: The request to join the channel is rejected. The typical cause is that the user is in the channel. Agora recommends using the onConnectionStateChanged callback to get whether the user is in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected(1) state.-102: The channel name is invalid. You need to pass in a valid channel name inchannelId to rejoin the channel.-121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number;

  /**
   * Joins the channel with a user account, and configures whether to automatically subscribe to audio or video streams after joining the channel.
   * This method allows a user to join the channel with the user account. After the user successfully joins the channel, the SDK triggers the following callbacks:The local client: onLocalUserRegistered , onJoinChannelSuccess and onConnectionStateChanged callbacks.The remote client: The onUserJoined callback if the user is in the COMMUNICATION profile, and the onUserInfoUpdated callback if the user is a host in the LIVE_BROADCASTING profile.Once a user joins the channel, the user subscribes to the audio and video streams of all the other users in the channel by default, giving rise to usage and billing calculation. To stop subscribing to a specified stream or all remote streams, call the corresponding mute methods.To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the ID of the user is set to the same parameter type.
   *
   * @param token The token generated on your server for authentication.
   *
   * @param channelId The channel name. This parameter signifies the channel in which users engage in real-time audio and video interaction. Under the premise of the same App ID, users who fill in the same channel ID enter the same channel for audio and video interaction. The string length must be less than 64 bytes. Supported characters:
   *  All lowercase English letters: a to z.
   *  All uppercase English letters: A to Z.
   *  All numeric characters: 0 to 9.
   *  Space
   *  "!", "#", "$", "%", "&amp;", "(", ")", "+", "-", ":", ";", "&lt;", "= ", ".", "&gt;", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @param userAccount The user account. This parameter is used to identify the user in the channel for real-time audio and video engagement. You need to set and manage user accounts yourself and ensure that each user account in the same channel is unique. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as NULL. Supported characters are (89 in total):The 26 lowercase English letters: a to z.The 26 uppercase English letters: A to Z.All numeric characters: 0 to 9.Space"!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "= ", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @param options The channel media options. See ChannelMediaOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: ChannelMediaOptions
  ): number;

  /**
   * Gets the user information by passing in the User Account.
   * After a remote user joins the channel, the SDK gets the UID and User Account of the remote user, caches them in a mapping table object, and triggers the onUserInfoUpdated callback on the local client. After receiving the callback, you can call this method to get the user account of the remote user from the UserInfo object by passing in the user ID.
   *
   * @param userAccount The user account.
   *
   * @returns
   * The UserInfo object that identifies the user information. A pointer to the UserInfo instance, if the method call succeeds.
   * If the call fails, returns NULL.
   */
  abstract getUserInfoByUserAccount(userAccount: string): UserInfo;

  /**
   * Gets the user information by passing in the user ID.
   * After a remote user joins the channel, the SDK gets the UID and User Account of the remote user, caches them in a mapping table object, and triggers the onUserInfoUpdated callback on the local client. After receiving the callback, you can call this method to get the user account of the remote user from the UserInfo object by passing in the user ID.
   *
   * @param uid The user ID.
   *
   * @returns
   * The UserInfo object that identifies the user information.A pointer to the UserInfo instance, if the method call succeeds.If the call fails, returns NULL.
   */
  abstract getUserInfoByUid(uid: number): UserInfo;

  /**
   * Starts relaying media streams across channels. This method can be used to implement scenarios such as co-host across channels.
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged and onChannelMediaRelayEvent callbacks, and these callbacks return the state and events of the media stream relay.If the onChannelMediaRelayStateChanged callback returns RelayStateRunning (2) and RelayOk (0), and the onChannelMediaRelayEvent callback returns RelayEventPacketSentToDestChannel (4); it means that the SDK starts relaying media streams between the source channel and the destination channel.If the onChannelMediaRelayStateChanged callback returns RelayStateFailure (3), an exception occurs during the media stream relay.Call this method after joining the channel.This method takes effect only when you are a host in a live streaming channel.After a successful method call, if you want to call this method again, ensure that you call the stopChannelMediaRelay method to quit the current relay.You need to before implementing this function.We do not support string type of UID in this API.
   *
   * @param configuration The configuration of the media stream relay. See ChannelMediaRelayConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /**
   * Updates the channels for media stream relay.
   * After the media relay starts, if you want to relay the media stream to more channels, or leave the current relay channel, you can call this method.After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback with the RelayEventPacketUpdateDestChannel (7) state code.Call the method after successfully calling the startChannelMediaRelay method and receiving onChannelMediaRelayStateChanged (RelayStateRunning, RelayOk); otherwise, the method call fails.
   *
   * @param configuration The configuration of the media stream relay.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /**
   * Stops the media stream relay. Once the relay stops, the host quits all the destination channels.
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback. If the callback reports RelayStateIdle (0) and RelayOk (0), the host successfully stops the relay.If the method call fails, the SDK triggers the onChannelMediaRelayStateChanged callback with the RelayErrorServerNoResponse (2) or RelayErrorServerConnectionLost (8) status code. You can call the leaveChannel method to leave the channel, and the media stream relay automatically stops.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopChannelMediaRelay(): number;

  /**
   * Pauses the media stream relay to all destination channels.
   * After the cross-channel media stream relay starts, you can call this method to pause relaying media streams to all destination channels; after the pause, if you want to resume the relay, call resumeAllChannelMediaRelay .After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback to report whether the media stream relay is successfully paused.Call this method after the startChannelMediaRelay method.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract pauseAllChannelMediaRelay(): number;

  /**
   * Resumes the media stream relay to all destination channels.
   * After calling the pauseAllChannelMediaRelay method, you can call this method to resume relaying media streams to all destination channels.After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback to report whether the media stream relay is successfully resumed.Call this method after the pauseAllChannelMediaRelay method.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract resumeAllChannelMediaRelay(): number;

  /**
   * Sets the audio profile of the media streams directly pushed to the CDN by the host.
   * When you set the publishMicrophoneTrack or publishCustomAudioTrack in the DirectCdnStreamingMediaOptions as true to capture audios, you can call this method to set the audio profile.
   *
   * @param profile The audio profile, including the sampling rate, bitrate, encoding mode, and the number of channels. See AudioProfileType .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): number;

  /**
   * Sets the video profile of the media streams directly pushed to the CDN by the host.
   * This method is only valid for video captured by camera, screen sharing, or self-captured. When you set publishCameraTrack or publishCustomVideoTrack in the DirectCdnStreamingMediaOptions as true to capture videos, you can call this method to set the video profile.
   *
   * @param config Video profile. See VideoEncoderConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setDirectCdnStreamingVideoConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * Starts pushing media streams to the CDN directly.
   * Aogra does not support pushing streams to one URL repeatedly.Media optionsAgora does not support setting the value of publishCameraTrack and publishCustomVideoTrack as true, or the value of publishMicrophoneTrack and publishCustomAudioTrack as true at the same time. When choosing media setting options ( DirectCdnStreamingMediaOptions ) you can refer to the following examples:If you want to push audio and video streams published by the host to the CDN, the media setting options should be set as follows:publishCameraTrack is set as true.publishMicrophoneTrack is set as true.publishCustomAudioTrack is set as false (Default).publishCustomVideoTrack is set as false (Default).If you want to push external audio and video streams, ensure the following:publishCustomVideoTrack is set as true and call the pushVideoFrame method.publishCameraTrack is set as false (Default).publishMicrophoneTrack is set as false (Default).
   *
   * @param eventHandler See onDirectCdnStreamingStateChanged and onDirectCdnStreamingStats .
   *
   * @param publishUrl The CDN live streaming URL.
   *
   * @param options The media setting options for the host. See DirectCdnStreamingMediaOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number;

  /**
   * Stops pushing media streams to the CDN directly.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopDirectCdnStreaming(): number;

  /**
   * @ignore
   */
  abstract updateDirectCdnStreamingMediaOptions(
    options: DirectCdnStreamingMediaOptions
  ): number;

  /**
   * Enables the virtual metronome.
   * In music education, physical education, and other scenarios, teachers might need to use a metronome so that students can practice with the correct beat. The meter is composed of a downbeat and upbeats. The first beat of each measure is called a downbeat, and the rest are called upbeats.In this method, you need to set the paths of the upbeat and downbeat files, the number of beats per measure, the tempo, and whether to send the sound of the metronome to remote users.After enabling the virtual metronome, the SDK plays the specified audio effect file from the beginning and controls the playback duration of each file according to beatsPerMinuteyou set in AgoraRhythmPlayerConfig . For example, if you set beatsPerMinute as 60, the SDK plays one beat every second. If the file duration exceeds the beat duration, the SDK only plays the audio within the beat duration.By default, the sound of the virtual metronome is published in the channel. If you do not want the sound to be heard by the remote users, you can set publishRhythmPlayerTrack in ChannelMediaOptions as false.
   *
   * @param sound1 The absolute path or URL address (including the filename extensions) of the file for the downbeat. For example: C:\music\audio.mp4. For the audio file formats supported by this method, see What formats of audio files does the Agora RTC SDK v4.0.0 support.
   *
   * @param sound2 The absolute path or URL address (including the filename extensions) of the file for the upbeats. For example: C:\music\audio.mp4. For the audio file formats supported by this method, see What formats of audio files does the Agora RTC SDK v4.0.0 support.
   *
   * @param config The metronome configuration. See AgoraRhythmPlayerConfig .
   *
   * @returns
   * 0: Success.< 0: Failure.-22: Cannot find audio effect files. You need to set the correct paths for sound1 and sound2.
   */
  abstract startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: AgoraRhythmPlayerConfig
  ): number;

  /**
   * Disables the virtual metronome.
   * After calling startRhythmPlayer , you can call this method to disable the virtual metronome.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopRhythmPlayer(): number;

  /**
   * Configures the virtual metronome.
   * After enabling the virtual metronome, the SDK plays the specified audio effect file from the beginning and controls the playback duration of each file according to beatsPerMinuteyou set in AgoraRhythmPlayerConfig . For example, if you set beatsPerMinute as 60, the SDK plays one beat every second. If the file duration exceeds the beat duration, the SDK only plays the audio within the beat duration.
   * By default, the sound of the virtual metronome is published in the channel. If you do not want the sound to be heard by the remote users, you can set publishRhythmPlayerTrack in ChannelMediaOptions as false.
   * After calling startRhythmPlayer , you can call this method to reconfigure the virtual metronome.
   *
   * @param config The metronome configuration. See AgoraRhythmPlayerConfig .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract configRhythmPlayer(config: AgoraRhythmPlayerConfig): number;

  /**
   * Takes a snapshot of a video stream.
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image, and saves it to the specified path.The SDK has not taken the snapshot when the method call returns. After a successful method call, the SDK triggers the onSnapshotTaken callback to report whether the snapshot is successfully taken, as well as the details for that snapshot.Call this method after joining a channel.This method takes a snapshot of the published video stream specified in ChannelMediaOptions .If the user's video has been preprocessed, for example, watermarked or beautified, the resulting snapshot includes the pre-processing effect.
   *
   * @param uid The user ID. Set uid as 0 if you want to take a snapshot of the local user's video.
   *
   * @param filePath The local path (including filename extensions) of the snapshot. For example:iOS: /App Sandbox/Library/Caches/example.jpgAndroid: /storage/emulated/0/Android/data/<package name>/files/example.jpgEnsure that the path you specify exists and is writable.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract takeSnapshot(uid: number, filePath: string): number;

  /**
   * Enables/Disables video content moderation.
   * When video content moderation is enabled, the SDK takes screenshots, reviews the content, and uploads videos sent by local users based on the type and frequency of the content moderation module you set in ContentInspectConfig . After content moderation, the Agora content moderation server sends the results to your app server in HTTPS requests and sends all screenshots to the third-party cloud storage service.If you set the type in ContentInspectModule to ContentInspectModeration, after the content moderation is completed, the SDK triggers the onContentInspectResult callback and reports the moderation result.Before calling this method, ensure that the Agora content moderation service has been enabled.
   *
   * @param enabled Whether to enable video content moderation:true: Enable video content moderation.false: Disable video content moderation.
   *
   * @param config Configuration of content moderation. See ContentInspectConfig .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableContentInspect(
    enabled: boolean,
    config: ContentInspectConfig
  ): number;

  /**
   * Adjusts the volume of the custom external audio source when it is published in the channel.
   * Ensure you have called the setExternalAudioSource method to create an external audio track before calling this method.If you want to change the volume of the audio to be published, you need to call this method again.
   *
   * @param sourceId The ID of external audio source. If you want to publish a custom external audio source, set this parameter to the ID of the corresponding custom audio track you want to publish.
   *
   * @param volume The volume of the audio source. The value can range from 0 to 100. 0 means mute; 100 means the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustCustomAudioPublishVolume(
    sourceId: number,
    volume: number
  ): number;

  /**
   * @ignore
   */
  abstract adjustCustomAudioPlayoutVolume(
    sourceId: number,
    volume: number
  ): number;

  /**
   * Sets the Agora cloud proxy service.
   * When users' network access is restricted by a firewall, configure the firewall to allow specific IP addresses and ports provided by Agora; then, call this method to enable the cloud proxy and set the cloud proxy type with the proxyType parameter.After successfully connecting to the cloud proxy, the SDK triggers the onConnectionStateChanged (ConnectionStateConnecting, ConnectionChangedSettingProxyServer) callback.To disable the cloud proxy that has been set, call the setCloudProxy (NoneProxy).To change the cloud proxy type that has been set, call the setCloudProxy (NoneProxy) first, and then call the setCloudProxy to set the proxyType you want.Agora recommends that you call this method before joining the channel or after leaving the channel.When a user is behind a firewall and uses the Force UDP cloud proxy, the services for the Media Push and cohosting across channels are not available.When you use the Force TCP cloud proxy, note that an error would occur when calling the startAudioMixing method to play online music files in the HTTP protocol. The services for the Media Push and cohosting across channels use the cloud proxy with the TCP protocol.
   *
   * @param proxyType The type of the cloud proxy. See CloudProxyType .This parameter is mandatory. The SDK reports an error if you do not pass in a value.
   *
   * @returns
   * 0: Success. < 0: Failure.-2: The parameter is invalid.-7: The SDK is not initialized.
   */
  abstract setCloudProxy(proxyType: CloudProxyType): number;

  /**
   * Configure the connection with the native access module of the Agora network private media server.
   * After successfully deploying the Agora private media server and integrating Agora Native SDK v4.0.0 on the intranet terminal, you can call this method to specify the Local Access Point and assign the Native access module to the SDK.This method takes effect only after the Agora hybrid cloud solution is deployed. You can contact to get to know more about the Agora hybrid cloud solution.Ensure that you call this method before joining a channel.
   *
   * @param config The configurations of the Local Access Point. See LocalAccessPointConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setLocalAccessPoint(config: LocalAccessPointConfiguration): number;

  /**
   * Sets audio advanced options.
   * If you have advanced audio processing requirements, such as capturing and sending stereo audio, you can call this method to set advanced audio options.Call this method after calling joinChannel [2/2] , enableAudio and enableLocalAudio .
   */
  abstract setAdvancedAudioOptions(
    options: AdvancedAudioOptions,
    sourceType?: number
  ): number;

  /**
   * Sets the pitch of the local music file.
   * The same user may use two devices to send audio streams and video streams respectively. To ensure the time synchronization of the audio and video heard and seen by the receiver, you can call this method on the video sender and pass in the channel of the audio sender. name, user ID. The SDK will automatically adjust the sent video stream based on the timestamp of the sent audio stream to ensure that even when the upstream network conditions of the two senders are inconsistent (such as using Wi-Fi and 4G networks respectively), the The received audio and video have time synchronization.Agora recommends calling this method before .
   *
   * @param channelId Identifies the channel name of the channel where the audio sender is located.
   *
   * @param uid User ID of the audio sender.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setAVSyncSource(channelId: string, uid: number): number;

  /**
   * Sets whether to replace the current video feeds with images when publishing video streams.
   * Agora recommends that you call this method after joining a channel.When publishing video streams, you can call this method to replace the current video feeds with custom images.Once you enable this function, you can select images to replace the video feeds through the ImageTrackOptions parameter. If you disable this function, the remote users see the video feeds that you publish.
   *
   * @param enable Whether to replace the current video feeds with custom images:true: Replace the current video feeds with custom images.false: (Default) Do not replace the current video feeds with custom images.
   *
   * @param options Image configurations. See ImageTrackOptions .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableVideoImageSource(
    enable: boolean,
    options: ImageTrackOptions
  ): number;

  /**
   * @ignore
   */
  abstract getCurrentMonotonicTimeInMs(): number;

  /**
   * @ignore
   */
  abstract enableWirelessAccelerate(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract getNetworkType(): number;

  /**
   * @ignore
   */
  abstract getAudioDeviceManager(): IAudioDeviceManager;

  /**
   * @ignore
   */
  abstract getVideoDeviceManager(): IVideoDeviceManager;

  /**
   * @ignore
   */
  abstract getMusicContentCenter(): IMusicContentCenter;

  /**
   * Gets one IMediaEngine object.
   * Make sure the IRtcEngine is initialized before you call this method.
   *
   * @returns
   * One IMediaEngine object.
   */
  abstract getMediaEngine(): IMediaEngine;

  /**
   * Gets one IMediaRecorder object.
   * Make sure the IRtcEngine is initialized before you call this method.
   *
   * @returns
   * One IMediaRecorder object.
   */
  abstract getMediaRecorder(): IMediaRecorder;

  /**
   * Gets one ILocalSpatialAudioEngine object.
   * Make sure the IRtcEngine is initialized before you call this method.
   *
   * @returns
   * One ILocalSpatialAudioEngine object.
   */
  abstract getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine;

  /**
   * Sends media affiliate information.
   * If the media attachment information is successfully sent, the receiver will receive the onMetadataReceived callback.
   *
   * @param sourceType The type of the video source, see VideoSourceType .
   *
   * @param metadata Media metadata. See Metadata .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract sendMetaData(
    metadata: Metadata,
    sourceType: VideoSourceType
  ): number;

  /**
   * Sets the maximum size of media metadata information.
   * After calling registerMediaMetadataObserver , you can call this method to set the maximum size of media metadata information.
   *
   * @param size Sets the maximum size of media metadata information.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setMaxMetadataSize(size: number): number;

  /**
   * Unregisters the encoded audio frame observer.
   *
   * @param observer The encoded audio observer. See IAudioEncodedFrameObserver .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * Provides the technical preview functionalities or special customizations by configuring the SDK with JSON options.
   *
   * @param parameters Pointer to the set parameters in a JSON string.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setParameters(parameters: string): number;

  /**
   * @ignore
   */
  abstract getNativeHandle(): number;
}

/**
 * @ignore
 */
export enum QualityReportFormatType {
  /**
   * @ignore
   */
  QualityReportJson = 0,
  /**
   * @ignore
   */
  QualityReportHtml = 1,
}

/**
 * Media device states.
 */
export enum MediaDeviceStateType {
  /**
   * 0: The device is ready for use.
   */
  MediaDeviceStateIdle = 0,
  /**
   * 1: The device is in use.
   */
  MediaDeviceStateActive = 1,
  /**
   * 2: The device is disabled.
   */
  MediaDeviceStateDisabled = 2,
  /**
   * 4: The device is not found.
   */
  MediaDeviceStateNotPresent = 4,
  /**
   * 8: The device is not connected.
   */
  MediaDeviceStateUnplugged = 8,
}

/**
 * Video profile.
 */
export enum VideoProfileType {
  /**
   * 0: 160 × 120, frame rate 15 fps, bitrate 65 Kbps.
   */
  VideoProfileLandscape120p = 0,
  /**
   * 2: 120 × 120, frame rate 15 fps, bitrate 50 Kbps.
   */
  VideoProfileLandscape120p3 = 2,
  /**
   * 10: 320 × 180, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfileLandscape180p = 10,
  /**
   * 12: 180 × 180, frame rate 15 fps, bitrate 100 Kbps.
   */
  VideoProfileLandscape180p3 = 12,
  /**
   * 13: 240 × 180, frame rate 15 fps, bitrate 120 Kbps.
   */
  VideoProfileLandscape180p4 = 13,
  /**
   * 20: 320 × 240, frame rate 15 fps, bitrate 200 Kbps.
   */
  VideoProfileLandscape240p = 20,
  /**
   * 22: 240 × 240, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfileLandscape240p3 = 22,
  /**
   * 23: 424 × 240, frame rate 15 fps, bitrate 220 Kbps.
   */
  VideoProfileLandscape240p4 = 23,
  /**
   * 30: 640 × 360, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape360p = 30,
  /**
   * 32: 360 × 360, frame rate 15 fps, bitrate 260 Kbps.
   */
  VideoProfileLandscape360p3 = 32,
  /**
   * 33: 640 × 360, frame rate 30 fps, bitrate 600 Kbps.
   */
  VideoProfileLandscape360p4 = 33,
  /**
   * 35: 360 × 360, frame rate 30 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape360p6 = 35,
  /**
   * 36: 480 × 360, frame rate 15 fps, bitrate 320 Kbps.
   */
  VideoProfileLandscape360p7 = 36,
  /**
   * 37: 480 × 360, frame rate 30 fps, bitrate 490 Kbps.
   */
  VideoProfileLandscape360p8 = 37,
  /**
   * 38: 640 × 360, frame rate 15 fps, bitrate 800 Kbps.This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p9 = 38,
  /**
   * 39: 640 × 360, frame rate 24 fps, bitrate 800 Kbps.This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p10 = 39,
  /**
   * 100: 640 × 360, frame rate 24 fps, bitrate 1000 Kbps.This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p11 = 100,
  /**
   * 40: 640 × 480, frame rate 15 fps, bitrate 500 Kbps.
   */
  VideoProfileLandscape480p = 40,
  /**
   * 42: 480 × 480, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape480p3 = 42,
  /**
   * 43: 640 × 480, frame rate 30 fps, bitrate 750 Kbps.
   */
  VideoProfileLandscape480p4 = 43,
  /**
   * 45: 480 × 480, frame rate 30 fps, bitrate 600 Kbps.
   */
  VideoProfileLandscape480p6 = 45,
  /**
   * 47: 848 × 480, frame rate 15 fps, bitrate 610 Kbps.
   */
  VideoProfileLandscape480p8 = 47,
  /**
   * 48: 848 × 480, frame rate 30 fps, bitrate 930 Kbps.
   */
  VideoProfileLandscape480p9 = 48,
  /**
   * 49: 640 × 480, frame rate 10 fps, bitrate 400 Kbps.
   */
  VideoProfileLandscape480p10 = 49,
  /**
   * 50: 1280 × 720, frame rate 15 fps, bitrate 1130 Kbps.
   */
  VideoProfileLandscape720p = 50,
  /**
   * 52: 1280 × 720, frame rate 30 fps, bitrate 1710 Kbps.
   */
  VideoProfileLandscape720p3 = 52,
  /**
   * 54: 960 × 720, frame rate 15 fps, bitrate 910 Kbps.
   */
  VideoProfileLandscape720p5 = 54,
  /**
   * 55: 960 × 720, frame rate 30 fps, bitrate 1380 Kbps.
   */
  VideoProfileLandscape720p6 = 55,
  /**
   * 60: 1920 × 1080, frame rate 15 fps, bitrate 2080 Kbps.
   */
  VideoProfileLandscape1080p = 60,
  /**
   * 60: 1920 × 1080, frame rate 30 fps, bitrate 3150 Kbps.
   */
  VideoProfileLandscape1080p3 = 62,
  /**
   * 64: 1920 × 1080, frame rate 60 fps, bitrate 4780 Kbps.
   */
  VideoProfileLandscape1080p5 = 64,
  /**
   * @ignore
   */
  VideoProfileLandscape1440p = 66,
  /**
   * @ignore
   */
  VideoProfileLandscape1440p2 = 67,
  /**
   * @ignore
   */
  VideoProfileLandscape4k = 70,
  /**
   * @ignore
   */
  VideoProfileLandscape4k3 = 72,
  /**
   * 1000: 120 × 160, frame rate 15 fps, bitrate 65 Kbps.
   */
  VideoProfilePortrait120p = 1000,
  /**
   * 1002: 120 × 120, frame rate 15 fps, bitrate 50 Kbps.
   */
  VideoProfilePortrait120p3 = 1002,
  /**
   * 1010: 180 × 320, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfilePortrait180p = 1010,
  /**
   * 1012: 180 × 180, frame rate 15 fps, bitrate 100 Kbps.
   */
  VideoProfilePortrait180p3 = 1012,
  /**
   * 1013: 180 × 240, frame rate 15 fps, bitrate 120 Kbps.
   */
  VideoProfilePortrait180p4 = 1013,
  /**
   * 1020: 240 × 320, frame rate 15 fps, bitrate 200 Kbps.
   */
  VideoProfilePortrait240p = 1020,
  /**
   * 1022: 240 × 240, frame rate 15 fps, bitrate 140 Kbps.
   */
  VideoProfilePortrait240p3 = 1022,
  /**
   * 1023: 240 × 424, frame rate 15 fps, bitrate 220 Kbps.
   */
  VideoProfilePortrait240p4 = 1023,
  /**
   * 1030: 360 × 640, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait360p = 1030,
  /**
   * 1032: 360 × 360, frame rate 15 fps, bitrate 260 Kbps.
   */
  VideoProfilePortrait360p3 = 1032,
  /**
   * 1033: 360 × 640, frame rate 15 fps, bitrate 600 Kbps.
   */
  VideoProfilePortrait360p4 = 1033,
  /**
   * 1035: 360 × 360, frame rate 30 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait360p6 = 1035,
  /**
   * 1036: 360 × 480, frame rate 15 fps, bitrate 320 Kbps.
   */
  VideoProfilePortrait360p7 = 1036,
  /**
   * 1037: 360 × 480, frame rate 30 fps, bitrate 490 Kbps.
   */
  VideoProfilePortrait360p8 = 1037,
  /**
   * 1038: 360 × 640, frame rate 15 fps, bitrate 800 Kbps.This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p9 = 1038,
  /**
   * 1039: 360 × 640, frame rate 24 fps, bitrate 800 Kbps.This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p10 = 1039,
  /**
   * 1100: 360 × 640, frame rate 24 fps, bitrate 1000 Kbps.This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p11 = 1100,
  /**
   * 1040: 480 × 640, frame rate 15 fps, bitrate 500 Kbps.
   */
  VideoProfilePortrait480p = 1040,
  /**
   * 1042: 480 × 480, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait480p3 = 1042,
  /**
   * 1043: 480 × 640, frame rate 30 fps, bitrate 750 Kbps.
   */
  VideoProfilePortrait480p4 = 1043,
  /**
   * 1045: 480 × 480, frame rate 30 fps, bitrate 600 Kbps.
   */
  VideoProfilePortrait480p6 = 1045,
  /**
   * 1047: 480 × 848, frame rate 15 fps, bitrate 610 Kbps.
   */
  VideoProfilePortrait480p8 = 1047,
  /**
   * 1048: 480 × 848, frame rate 30 fps, bitrate 930 Kbps.
   */
  VideoProfilePortrait480p9 = 1048,
  /**
   * 1049: 480 × 640, frame rate 10 fps, bitrate 400 Kbps.
   */
  VideoProfilePortrait480p10 = 1049,
  /**
   * 1050: 720 × 1280, frame rate 15 fps, bitrate 1130 Kbps.
   */
  VideoProfilePortrait720p = 1050,
  /**
   * 1052: 720 × 1280, frame rate 30 fps, bitrate 1710 Kbps.
   */
  VideoProfilePortrait720p3 = 1052,
  /**
   * 1054: 720 × 960, frame rate 15 fps, bitrate 910 Kbps.
   */
  VideoProfilePortrait720p5 = 1054,
  /**
   * 1055: 720 × 960, frame rate 30 fps, bitrate 1380 Kbps.
   */
  VideoProfilePortrait720p6 = 1055,
  /**
   * 1060: 1080 × 1920, frame rate 15 fps, bitrate 2080 Kbps.
   */
  VideoProfilePortrait1080p = 1060,
  /**
   * 1062: 1080 × 1920, frame rate 30 fps, bitrate 3150 Kbps.
   */
  VideoProfilePortrait1080p3 = 1062,
  /**
   * 1064: 1080 × 1920, frame rate 60 fps, bitrate 4780 Kbps.
   */
  VideoProfilePortrait1080p5 = 1064,
  /**
   * @ignore
   */
  VideoProfilePortrait1440p = 1066,
  /**
   * @ignore
   */
  VideoProfilePortrait1440p2 = 1067,
  /**
   * @ignore
   */
  VideoProfilePortrait4k = 1070,
  /**
   * @ignore
   */
  VideoProfilePortrait4k3 = 1072,
  /**
   * (Default) 640 × 360, frame rate 15 fps, bitrate 400 Kbps.
   */
  VideoProfileDefault = 30,
}

/**
 * SDK version information.
 */
export class SDKBuildInfo {
  /**
   * SDK build index.
   */
  build?: number;
  /**
   * SDK version information. String, such as 4.0.0.
   */
  version?: string;
}

/**
 * The VideoDeviceInfo class that contains the ID and device name of the video devices.
 */
export class VideoDeviceInfo {
  /**
   * The device ID.
   */
  deviceId?: string;
  /**
   * The device name.
   */
  deviceName?: string;
}

/**
 * The AudioDeviceInfo class that contains the ID and device name of the audio devices.
 */
export class AudioDeviceInfo {
  /**
   * The device ID.
   */
  deviceId?: string;
  /**
   * The device name.
   */
  deviceName?: string;
}
