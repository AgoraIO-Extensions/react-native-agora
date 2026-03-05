import './extension/IAgoraRtcEngineExtension';
import {
  AudienceLatencyLevelType,
  AudioAinsMode,
  AudioEffectPreset,
  AudioEncodedFrameObserverConfig,
  AudioProfileType,
  AudioRecordingConfiguration,
  AudioSampleRateType,
  AudioScenarioType,
  AudioSessionOperationRestriction,
  AudioVolumeInfo,
  BeautyOptions,
  CameraFocalLengthType,
  CameraStabilizationMode,
  CaptureBrightnessLevelType,
  ChannelMediaRelayConfiguration,
  ChannelMediaRelayError,
  ChannelMediaRelayState,
  ChannelProfileType,
  ClientRoleChangeFailedReason,
  ClientRoleOptions,
  ClientRoleType,
  CodecCapInfo,
  ColorEnhanceOptions,
  ConnectionChangedReasonType,
  ConnectionStateType,
  DataStreamConfig,
  DeviceInfo,
  EarMonitoringFilterType,
  EchoTestConfiguration,
  EncryptionConfig,
  EncryptionErrorType,
  ErrorCodeType,
  FaceShapeArea,
  FaceShapeAreaOptions,
  FaceShapeBeautyOptions,
  FilterEffectOptions,
  FocalLengthInfo,
  HdrCapability,
  HeadphoneEqualizerPreset,
  IAudioEncodedFrameObserver,
  LastmileProbeConfig,
  LastmileProbeResult,
  LicenseErrorType,
  LiveTranscoding,
  LocalAccessPointConfiguration,
  LocalAudioMixerConfiguration,
  LocalAudioStats,
  LocalAudioStreamReason,
  LocalAudioStreamState,
  LocalTranscoderConfiguration,
  LocalVideoEventType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  LowlightEnhanceOptions,
  MediaTraceEvent,
  MultipathMode,
  MultipathStats,
  MultipathType,
  NetworkType,
  PermissionType,
  QualityAdaptIndication,
  QualityType,
  RdtState,
  RdtStreamType,
  RecorderStreamInfo,
  Rectangle,
  RemoteAudioState,
  RemoteAudioStateReason,
  RemoteVideoState,
  RemoteVideoStateReason,
  RenewTokenErrorCode,
  RtcStats,
  RtmpStreamPublishReason,
  RtmpStreamPublishState,
  RtmpStreamingEvent,
  ScreenCaptureParameters,
  ScreenCaptureParameters2,
  ScreenScenarioType,
  SegmentationProperty,
  SenderOptions,
  SimulcastConfig,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  SpatialAudioParams,
  StreamPublishState,
  StreamSubscribeState,
  ThreadPriorityType,
  TranscodingVideoStream,
  UplinkNetworkInfo,
  UploadErrorReason,
  UserInfo,
  UserOfflineReasonType,
  VideoApplicationScenarioType,
  VideoCanvas,
  VideoCodecType,
  VideoContentHint,
  VideoDenoiserOptions,
  VideoDimensions,
  VideoEncoderConfiguration,
  VideoFormat,
  VideoLayout,
  VideoMirrorModeType,
  VideoModuleType,
  VideoOrientation,
  VideoQoePreferenceType,
  VideoRenderingTracingInfo,
  VideoStreamType,
  VideoSubscriptionOptions,
  VideoTranscoderError,
  VirtualBackgroundSource,
  VoiceAiTunerType,
  VoiceBeautifierPreset,
  VoiceConversionPreset,
  WatermarkConfig,
  WatermarkOptions,
} from './AgoraBase';
import {
  ContentInspectConfig,
  ContentInspectResult,
  ExtensionContext,
  IAudioSpectrumObserver,
  MediaSourceType,
  RawAudioFrameOpModeType,
  RenderModeType,
  SnapshotConfig,
  VideoSourceType,
} from './AgoraMediaBase';
import { IH265Transcoder } from './IAgoraH265Transcoder';
import { LogConfig, LogFilterType, LogLevel } from './IAgoraLog';
import { AudioMixingDualMonoMode, IMediaEngine } from './IAgoraMediaEngine';
import { IMediaPlayer } from './IAgoraMediaPlayer';
import { IMediaRecorder } from './IAgoraMediaRecorder';
import { IMusicContentCenter } from './IAgoraMusicContentCenter';
import {
  AgoraRhythmPlayerConfig,
  RhythmPlayerReason,
  RhythmPlayerStateType,
} from './IAgoraRhythmPlayer';
import { RtcConnection } from './IAgoraRtcEngineEx';
import { ILocalSpatialAudioEngine } from './IAgoraSpatialAudio';
import { IAudioDeviceManager } from './IAudioDeviceManager';

/**
 * Device type.
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
   * 1: Audio recording device.
   */
  AudioRecordingDevice = 1,
  /**
   * 2: Video rendering device (graphics card).
   */
  VideoRenderDevice = 2,
  /**
   * 3: Video capture device.
   */
  VideoCaptureDevice = 3,
  /**
   * 4: Audio application playback device.
   */
  AudioApplicationPlayoutDevice = 4,
  /**
   * 5: Virtual audio playback device (virtual sound card).
   */
  AudioVirtualPlayoutDevice = 5,
  /**
   * 6: Virtual audio recording device (virtual sound card).
   */
  AudioVirtualRecordingDevice = 6,
}

/**
 * Music file playback state.
 */
export enum AudioMixingStateType {
  /**
   * 710: Music file is playing normally.
   */
  AudioMixingStatePlaying = 710,
  /**
   * 711: Music file playback paused.
   */
  AudioMixingStatePaused = 711,
  /**
   * 713: Music file playback stopped.
   * This state may be caused by the following reasons:
   *  AudioMixingReasonAllLoopsCompleted(723)
   *  AudioMixingReasonStoppedByUser(724)
   */
  AudioMixingStateStopped = 713,
  /**
   * 714: Music file playback error.
   * This state may be caused by the following reasons:
   *  AudioMixingReasonCanNotOpen(701)
   *  AudioMixingReasonTooFrequentCall(702)
   *  AudioMixingReasonInterruptedEof(703)
   */
  AudioMixingStateFailed = 714,
}

/**
 * Reason for music file playback state change. Reported in the onAudioMixingStateChanged callback.
 */
export enum AudioMixingReasonType {
  /**
   * 701: Failed to open music file. For example, the local music file does not exist, the file format is not supported, or the online music file URL is inaccessible.
   */
  AudioMixingReasonCanNotOpen = 701,
  /**
   * 702: Music file opened too frequently. If you need to call startAudioMixing multiple times, ensure the interval between calls is more than 500 ms.
   */
  AudioMixingReasonTooFrequentCall = 702,
  /**
   * 703: Music file playback interrupted.
   */
  AudioMixingReasonInterruptedEof = 703,
  /**
   * 721: One loop of the music file playback completed.
   */
  AudioMixingReasonOneLoopCompleted = 721,
  /**
   * 723: All loops of the music file playback completed.
   */
  AudioMixingReasonAllLoopsCompleted = 723,
  /**
   * 724: Successfully called stopAudioMixing to stop music file playback.
   */
  AudioMixingReasonStoppedByUser = 724,
  /**
   * @ignore
   */
  AudioMixingReasonResumedByUser = 726,
  /**
   * 0: Music file opened successfully.
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
 * Center frequency of the voice equalization band.
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
 * Audio reverb type.
 */
export enum AudioReverbType {
  /**
   * 0: Dry signal level, i.e., the original sound intensity. Range [-20,10], unit: dB.
   */
  AudioReverbDryLevel = 0,
  /**
   * 1: Wet signal level, i.e., early reflection signal strength. Range [-20,10], unit: dB.
   */
  AudioReverbWetLevel = 1,
  /**
   * 2: Room size for the desired reverb effect. Generally, the larger the room, the stronger the reverb. Range [0,100], unit: dB.
   */
  AudioReverbRoomSize = 2,
  /**
   * 3: Initial delay length of the wet signal. Range [0,200], unit: ms.
   */
  AudioReverbWetDelay = 3,
  /**
   * 4: Intensity of the sustained reverb. Range [0,100].
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
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLayer1 = 3,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLayer2 = 4,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLayer3 = 5,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLayer4 = 6,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLayer5 = 7,
  /**
   * @ignore
   */
  StreamFallbackOptionVideoStreamLayer6 = 8,
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
 * Statistics of the local video stream.
 */
export class LocalVideoStats {
  /**
   * The ID of the local user.
   */
  uid?: number;
  /**
   * Actual sending bitrate (Kbps) Does not include the bitrate of retransmitted video after packet loss.
   */
  sentBitrate?: number;
  /**
   * Actual sending frame rate (fps). Does not include the frame rate of retransmitted video after packet loss.
   */
  sentFrameRate?: number;
  /**
   * Frame rate of the local video capture (fps).
   */
  captureFrameRate?: number;
  /**
   * Width of the local video capture (px).
   */
  captureFrameWidth?: number;
  /**
   * Height of the local video capture (px).
   */
  captureFrameHeight?: number;
  /**
   * Frame rate (fps) of the video captured by the camera after being adjusted by the SDK's built-in video capture adapter (regulator). The regulator adjusts the camera capture frame rate based on the video encoding configuration.
   */
  regulatedCaptureFrameRate?: number;
  /**
   * Width (px) of the video captured by the camera after being adjusted by the SDK's built-in video capture adapter (regulator). The regulator adjusts the camera capture resolution based on the video encoding configuration.
   */
  regulatedCaptureFrameWidth?: number;
  /**
   * Height (px) of the video captured by the camera after being adjusted by the SDK's built-in video capture adapter (regulator). The regulator adjusts the camera capture resolution based on the video encoding configuration.
   */
  regulatedCaptureFrameHeight?: number;
  /**
   * Output frame rate of the local video encoder in fps.
   */
  encoderOutputFrameRate?: number;
  /**
   * Width of the encoded video (px).
   */
  encodedFrameWidth?: number;
  /**
   * Height of the encoded video (px).
   */
  encodedFrameHeight?: number;
  /**
   * Output frame rate of the local video renderer in fps.
   */
  rendererOutputFrameRate?: number;
  /**
   * Target encoding bitrate (Kbps) of the current encoder, estimated by the SDK based on the current network conditions.
   */
  targetBitrate?: number;
  /**
   * Target encoding frame rate (fps) of the current encoder.
   */
  targetFrameRate?: number;
  /**
   * Adaptation status of local video quality (based on target frame rate and target bitrate) during the statistics interval. See QualityAdaptIndication.
   */
  qualityAdaptIndication?: QualityAdaptIndication;
  /**
   * Video encoding bitrate (Kbps). Does not include the bitrate of retransmitted video after packet loss.
   */
  encodedBitrate?: number;
  /**
   * Number of video frames sent, cumulative value.
   */
  encodedFrameCount?: number;
  /**
   * Video codec type. See VideoCodecType.
   */
  codecType?: VideoCodecType;
  /**
   * Video packet loss rate (%) from the local end to the Agora edge server before anti-weak network measures.
   */
  txPacketLossRate?: number;
  /**
   * Brightness level of the locally captured video. See CaptureBrightnessLevelType.
   */
  captureBrightnessLevel?: CaptureBrightnessLevelType;
  /**
   * @ignore
   */
  dualStreamEnabled?: boolean;
  /**
   * Local video encoding acceleration type.
   *  0: Software encoding, no acceleration.
   *  1: Hardware encoding acceleration.
   */
  hwEncoderAccelerating?: number;
  /**
   * @ignore
   */
  simulcastDimensions?: VideoDimensions[];
  /**
   * @ignore
   */
  encodedFrameDepth?: number;
}

/**
 * Audio statistics of the remote user.
 */
export class RemoteAudioStats {
  /**
   * User ID of the remote user.
   */
  uid?: number;
  /**
   * Audio stream quality sent by the remote user. See QualityType.
   */
  quality?: number;
  /**
   * Network delay from the audio sender to the receiver (ms).
   */
  networkTransportDelay?: number;
  /**
   * Network delay from the receiver to the jitter buffer (ms). This parameter is not effective when the receiver is an audience member and audienceLatencyLevel in ClientRoleOptions is 1.
   */
  jitterBufferDelay?: number;
  /**
   * Audio frame loss rate (%) of the remote stream during the reporting interval.
   */
  audioLossRate?: number;
  /**
   * Number of audio channels.
   */
  numChannels?: number;
  /**
   * Sample rate of the remote audio stream received during the reporting interval.
   */
  receivedSampleRate?: number;
  /**
   * Average bitrate (Kbps) of the remote audio stream received during the reporting interval.
   */
  receivedBitrate?: number;
  /**
   * Total duration (ms) of audio freeze experienced by the remote user after joining the channel. An audio freeze is counted when the audio frame loss rate exceeds 4% during the call.
   */
  totalFrozenTime?: number;
  /**
   * Percentage (%) of total frozen time over the total effective duration of the audio. The effective duration refers to the time after the remote user joins the channel during which the audio is neither stopped nor disabled.
   */
  frozenRate?: number;
  /**
   * Quality score of the remote audio stream received during the reporting interval, evaluated using Agora's real-time audio MOS (Mean Opinion Score) method. The return value ranges from [0, 500]. Divide the value by 100 to get the MOS score, which ranges from [0, 5]. Higher scores indicate better audio quality. MOS Score Audio Quality Greater than 4 Excellent audio quality, clear and smooth. 3.5 - 4 Good audio quality, occasional artifacts, still clear. 3 - 3.5 Average audio quality, occasional stutters, not very smooth, requires some effort to understand. 2.5 - 3 Poor audio quality, frequent stutters, requires concentration to understand. 2 - 2.5 Very poor audio quality, occasional noise, partial loss of meaning, difficult to communicate. Less than 2 Extremely poor audio quality, frequent noise, significant loss of meaning, communication impossible.
   */
  mosValue?: number;
  /**
   * @ignore
   */
  frozenRateByCustomPlcCount?: number;
  /**
   * @ignore
   */
  plcCount?: number;
  /**
   * @ignore
   */
  frozenCntByCustom?: number;
  /**
   * @ignore
   */
  frozenTimeByCustom?: number;
  /**
   * Effective duration (ms) from the start of the audio call to this callback.
   * Effective duration refers to the total time excluding when the remote user is muted.
   */
  totalActiveTime?: number;
  /**
   * Total duration (ms) the remote audio stream was published.
   */
  publishDuration?: number;
  /**
   * Subjective experience quality of the local user when receiving remote audio. See ExperienceQualityType.
   */
  qoeQuality?: number;
  /**
   * Reason for poor subjective experience quality of the local user when receiving remote audio. See ExperiencePoorReason.
   */
  qualityChangedReason?: number;
  /**
   * @ignore
   */
  rxAudioBytes?: number;
  /**
   * End-to-end audio delay (ms), i.e., the total time from when the remote user captures the audio to when the local user starts playback.
   */
  e2eDelay?: number;
}

/**
 * Statistics of the remote video stream.
 */
export class RemoteVideoStats {
  /**
   * User ID identifying which user's video stream it is.
   */
  uid?: number;
  /**
   * Delay (ms). Deprecated: In audio-video scenarios with A/V sync, you can refer to the networkTransportDelay and jitterBufferDelay members in RemoteAudioStats for video delay data.
   */
  delay?: number;
  /**
   * End-to-end video delay (ms). That is, the total time from when the remote user captures the video to when the local user receives and renders it.
   */
  e2eDelay?: number;
  /**
   * Width of the video stream (pixels).
   */
  width?: number;
  /**
   * Height of the video stream (pixels).
   */
  height?: number;
  /**
   * Bitrate (Kbps) received since the last report.
   */
  receivedBitrate?: number;
  /**
   * @ignore
   */
  decoderInputFrameRate?: number;
  /**
   * Output frame rate of the remote video decoder, in fps.
   */
  decoderOutputFrameRate?: number;
  /**
   * Output frame rate of the remote video renderer, in fps.
   */
  rendererOutputFrameRate?: number;
  /**
   * Remote video frame loss rate (%).
   */
  frameLossRate?: number;
  /**
   * Remote video packet loss rate (%) after applying anti-packet-loss techniques.
   */
  packetLossRate?: number;
  /**
   * Video stream type: high or low stream. See VideoStreamType.
   */
  rxStreamType?: VideoStreamType;
  /**
   * Total duration (ms) of video freeze experienced by the remote user after joining the channel. During the call, if the video frame rate is set to no less than 5 fps and the interval between two consecutive rendered frames exceeds 500 ms, it is counted as a video freeze.
   */
  totalFrozenTime?: number;
  /**
   * Percentage (%) of total frozen time over the total effective video duration after the remote user joins the channel. The effective duration refers to the time when the video is neither stopped nor disabled.
   */
  frozenRate?: number;
  /**
   * Time (ms) by which audio leads video. If the value is negative, it indicates that audio lags behind video.
   */
  avSyncTimeMs?: number;
  /**
   * Effective video duration (ms).
   * The total effective video duration is the time after the remote user or host joins the channel without stopping the video stream or disabling the video module.
   */
  totalActiveTime?: number;
  /**
   * Total duration (ms) the remote video stream was published.
   */
  publishDuration?: number;
  /**
   * Quality of the remote audio stream during the reporting interval. This quality is measured using Agora's real-time audio MOS (Mean Opinion Score) method. The return value ranges from [0, 500]; divide by 100 to get the MOS score, which ranges from 0 to 5. Higher scores indicate better audio quality. The subjective audio quality corresponding to Agora's real-time audio MOS score is as follows:
   *  Greater than 4: Excellent audio quality, clear and smooth.
   *  3.5 - 4: Good audio quality, occasional artifacts, still clear.
   *  3 - 3.5: Average audio quality, occasional stutters, not very smooth, requires some effort to understand.
   *  2.5 - 3: Poor audio quality, frequent stutters, requires concentration to understand.
   *  2 - 2.5: Very poor audio quality, occasional noise, partial loss of meaning, difficult to communicate.
   *  Less than 2: Extremely poor audio quality, frequent noise, significant loss of meaning, communication impossible.
   */
  mosValue?: number;
  /**
   * @ignore
   */
  rxVideoBytes?: number;
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
 * Lifecycle of server-side transcoding streaming.
 *
 * Deprecated Deprecated
 */
export enum RtmpStreamLifeCycleType {
  /**
   * Bound to the channel lifecycle. When all hosts leave the channel, server-side transcoding streaming stops after 30 seconds.
   */
  RtmpStreamLifeCycleBind2channel = 1,
  /**
   * Bound to the lifecycle of the host who started the server-side transcoding streaming. When this host leaves, the streaming stops immediately.
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
 * Camera direction.
 */
export enum CameraDirection {
  /**
   * 0: Rear camera.
   */
  CameraRear = 0,
  /**
   * 1: (Default) Front camera.
   */
  CameraFront = 1,
}

/**
 * Cloud proxy type.
 */
export enum CloudProxyType {
  /**
   * 0: Automatic mode. This is the default mode. In this mode, the SDK first tries to connect via SD-RTN™. If it fails, it automatically switches to TLS 443.
   */
  NoneProxy = 0,
  /**
   * 1: UDP cloud proxy, i.e., Force UDP mode. In this mode, the SDK always transmits data via UDP.
   */
  UdpProxy = 1,
  /**
   * 2: TCP (encrypted) cloud proxy, i.e., Force TCP mode. In this mode, the SDK always transmits data via TLS 443.
   */
  TcpProxy = 2,
}

/**
 * Camera capture configuration.
 */
export class CameraCapturerConfiguration {
  /**
   * (Optional) Camera direction. See CameraDirection.
   */
  cameraDirection?: CameraDirection;
  /**
   * (Optional) Camera focal length type. See CameraFocalLengthType.
   *  To set the camera focal length type, only cameraDirection is supported. cameraId is not supported.
   *  Some iOS devices have rear cameras composed of multiple lenses, such as dual (wide and ultra-wide) or triple (wide, ultra-wide, and telephoto) cameras. For such composite lenses with ultra-wide capability, you can achieve ultra-wide capture in either of the following ways:
   *  Option 1: Set this parameter to CameraFocalLengthUltraWide (2) (ultra-wide lens).
   *  Option 2: Set this parameter to CameraFocalLengthDefault (0) (standard lens), then call setCameraZoomFactor to set the camera zoom factor to a value less than 1.0, with a minimum of 0.5. The difference is that Option 1 provides a fixed ultra-wide angle, while Option 2 allows flexible adjustment of the zoom factor.
   */
  cameraFocalLengthType?: CameraFocalLengthType;
  /**
   * @ignore
   */
  deviceId?: string;
  /**
   * (Optional) Camera ID. Defaults to the ID of the front-facing camera. You can obtain the camera ID using the Android native system API. See [Camera.open()](https://developer.android.google.cn/reference/android/hardware/Camera#open(int)) and [CameraManager.getCameraIdList()](https://developer.android.google.cn/reference/android/hardware/camera2/CameraManager?hl=en#getCameraIdList).
   *  This parameter is for Android only.
   *  Both this parameter and cameraDirection are used to specify the camera and are mutually exclusive. You can choose either based on your needs. The differences are as follows:
   *  Using cameraDirection is simpler. You only need to specify the camera direction (front or rear), without specifying the exact camera ID. The SDK will use system APIs to retrieve and determine the actual camera ID.
   *  Using cameraId allows you to specify a particular camera more precisely. On devices with multiple cameras, cameraDirection may not be able to identify or access all available cameras. In such cases, it is recommended to use cameraId to directly specify the desired camera ID.
   */
  cameraId?: string;
  /**
   * (Optional) Whether to follow the video aspect ratio set in setVideoEncoderConfiguration : true : (Default) Follow. The SDK crops the captured video to match the configured aspect ratio, and synchronously updates the local preview, onCaptureVideoFrame, and onPreEncodeVideoFrame. false : Do not follow. The SDK does not change the aspect ratio of the captured video frame.
   */
  followEncodeDimensionRatio?: boolean;
  /**
   * (Optional) Video frame format. See VideoFormat.
   */
  format?: VideoFormat;
}

/**
 * @ignore
 */
export class ScreenCaptureConfiguration {
  /**
   * @ignore
   */
  isCaptureWindow?: boolean;
  /**
   * @ignore
   */
  displayId?: number;
  /**
   * @ignore
   */
  screenRect?: Rectangle;
  /**
   * @ignore
   */
  windowId?: number;
  /**
   * @ignore
   */
  params?: ScreenCaptureParameters;
  /**
   * @ignore
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
 * @ignore
 */
export class ThumbImageBuffer {
  /**
   * @ignore
   */
  buffer?: Uint8Array;
  /**
   * @ignore
   */
  length?: number;
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
 * @ignore
 */
export enum ScreenCaptureSourceType {
  /**
   * @ignore
   */
  ScreencapturesourcetypeUnknown = -1,
  /**
   * @ignore
   */
  ScreencapturesourcetypeWindow = 0,
  /**
   * @ignore
   */
  ScreencapturesourcetypeScreen = 1,
  /**
   * @ignore
   */
  ScreencapturesourcetypeCustom = 2,
}

/**
 * @ignore
 */
export class ScreenCaptureSourceInfo {
  /**
   * @ignore
   */
  type?: ScreenCaptureSourceType;
  /**
   * @ignore
   */
  sourceId?: number;
  /**
   * @ignore
   */
  sourceName?: string;
  /**
   * @ignore
   */
  thumbImage?: ThumbImageBuffer;
  /**
   * @ignore
   */
  iconImage?: ThumbImageBuffer;
  /**
   * @ignore
   */
  processPath?: string;
  /**
   * @ignore
   */
  sourceTitle?: string;
  /**
   * @ignore
   */
  primaryMonitor?: boolean;
  /**
   * @ignore
   */
  isOccluded?: boolean;
  /**
   * @ignore
   */
  position?: Rectangle;
  /**
   * @ignore
   */
  minimizeWindow?: boolean;
  /**
   * @ignore
   */
  sourceDisplayId?: number;
}

/**
 * Advanced options for audio.
 */
export class AdvancedAudioOptions {
  /**
   * Number of channels for audio preprocessing. See AudioProcessingChannels.
   */
  audioProcessingChannels?: number;
}

/**
 * Settings options for placeholder images.
 */
export class ImageTrackOptions {
  /**
   * URL of the placeholder image. Currently supports JPEG, JPG, PNG, and GIF formats. You can add a placeholder image from a local absolute or relative path. On Android, adding placeholder images from /assets/ is not supported.
   */
  imageUrl?: string;
  /**
   * Video frame rate, ranging from [1,30]. Default is 1.
   */
  fps?: number;
  /**
   * @ignore
   */
  mirrorMode?: VideoMirrorModeType;
}

/**
 * Channel media configuration options.
 *
 * RtcConnection publishMicrophoneTrack publishCustomAudioTrack publishMediaPlayerAudioTrack true publishCameraTrack publishScreenCaptureVideo, publishCustomVideoTrack publishEncodedVideoTrack true It is recommended that you configure the member parameters based on your business scenario. Otherwise, the SDK will automatically assign values to the member parameters.
 */
export class ChannelMediaOptions {
  /**
   * Sets whether to publish the video captured by the camera: true : Publish the video captured by the camera. false : Do not publish the video captured by the camera.
   */
  publishCameraTrack?: boolean;
  /**
   * Sets whether to publish the video captured by the secondary camera: true : Publish the video captured by the secondary camera. false : Do not publish the video captured by the secondary camera.
   */
  publishSecondaryCameraTrack?: boolean;
  /**
   * This parameter is only applicable on Android. Sets whether to publish the video captured by the third camera: true : Publish the video captured by the third camera. false : Do not publish the video captured by the third camera.
   */
  publishThirdCameraTrack?: boolean;
  /**
   * This parameter is only applicable on Android. Sets whether to publish the video captured by the fourth camera: true : Publish the video captured by the fourth camera. false : Do not publish the video captured by the fourth camera.
   */
  publishFourthCameraTrack?: boolean;
  /**
   * Sets whether to publish the audio captured by the microphone: true : Publish the audio captured by the microphone. false : Do not publish the audio captured by the microphone.
   */
  publishMicrophoneTrack?: boolean;
  /**
   * Sets whether to publish the audio captured from the screen: true : Publish the screen-captured audio. false : Do not publish the screen-captured audio.
   */
  publishScreenCaptureAudio?: boolean;
  /**
   * Sets whether to publish the video captured from the screen: true : Publish the screen-captured video. false : Do not publish the screen-captured video.
   */
  publishScreenCaptureVideo?: boolean;
  /**
   * @ignore
   */
  publishScreenTrack?: boolean;
  /**
   * Sets whether to publish the video captured from the secondary screen: true : Publish the video captured from the secondary screen. false : Do not publish the video captured from the secondary screen.
   */
  publishSecondaryScreenTrack?: boolean;
  /**
   * @ignore
   */
  publishThirdScreenTrack?: boolean;
  /**
   * @ignore
   */
  publishFourthScreenTrack?: boolean;
  /**
   * Sets whether to publish custom-captured audio: true : Publish the custom-captured audio. false : Do not publish the custom-captured audio.
   */
  publishCustomAudioTrack?: boolean;
  /**
   * The ID of the custom audio track to be published. The default value is 0. You can get the custom audio track ID using the createCustomAudioTrack method.
   */
  publishCustomAudioTrackId?: number;
  /**
   * Sets whether to publish custom-captured video: true : Publish the custom-captured video. false : Do not publish the custom-captured video.
   */
  publishCustomVideoTrack?: boolean;
  /**
   * Sets whether to publish the encoded video: true : Publish the encoded video. false : Do not publish the encoded video.
   */
  publishEncodedVideoTrack?: boolean;
  /**
   * Sets whether to publish the audio from the media player: true : Publish the media player audio. false : Do not publish the media player audio.
   */
  publishMediaPlayerAudioTrack?: boolean;
  /**
   * Sets whether to publish the video from the media player: true : Publish the media player video. false : Do not publish the media player video.
   */
  publishMediaPlayerVideoTrack?: boolean;
  /**
   * Sets whether to publish the local transcoded video: true : Publish the local transcoded video. false : Do not publish the local transcoded video.
   */
  publishTranscodedVideoTrack?: boolean;
  /**
   * Sets whether to publish the local audio mixing: true : Publish the local audio mixing. false : Do not publish the local audio mixing.
   */
  publishMixedAudioTrack?: boolean;
  /**
   * Sets whether to publish the video processed by the voice sync plugin: true : Publish the video processed by the voice sync plugin. false : (Default) Do not publish the video processed by the voice sync plugin.
   */
  publishLipSyncTrack?: boolean;
  /**
   * Sets whether to automatically subscribe to all audio streams: true : Automatically subscribe to all audio streams. false : Do not automatically subscribe to any audio streams.
   */
  autoSubscribeAudio?: boolean;
  /**
   * Sets whether to automatically subscribe to all video streams: true : Automatically subscribe to all video streams. false : Do not automatically subscribe to any video streams.
   */
  autoSubscribeVideo?: boolean;
  /**
   * If you need to publish the audio stream captured by the microphone, make sure this parameter is set to true. Sets whether to enable audio recording or playback: true : Enable audio recording or playback. false : Do not enable audio recording or playback.
   */
  enableAudioRecordingOrPlayout?: boolean;
  /**
   * The ID of the media player to be published. The default value is 0.
   */
  publishMediaPlayerId?: number;
  /**
   * User role. See ClientRoleType.
   */
  clientRoleType?: ClientRoleType;
  /**
   * Audience latency level. See AudienceLatencyLevelType.
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
  /**
   * Default video stream type to subscribe to: VideoStreamType.
   */
  defaultVideoStreamType?: VideoStreamType;
  /**
   * Channel usage scenario. See ChannelProfileType.
   */
  channelProfile?: ChannelProfileType;
  /**
   * Delay (in milliseconds) for sending audio frames. You can use this parameter to set the delay for sending audio frames to ensure audio-video sync.
   * To disable the delay, set this parameter to 0.
   */
  audioDelayMs?: number;
  /**
   * @ignore
   */
  mediaPlayerAudioDelayMs?: number;
  /**
   * (Optional) A dynamic key generated on the server for authentication. See [Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   *  This parameter only takes effect when calling updateChannelMediaOptions or updateChannelMediaOptionsEx.
   *  Make sure the App ID, channel name, and user name used to generate the token are consistent with those used in the initialize method to initialize the engine and in the joinChannel or joinChannelEx method to join the channel.
   */
  token?: string;
  /**
   * @ignore
   */
  enableBuiltInMediaEncryption?: boolean;
  /**
   * Sets whether to publish the virtual metronome sound to remote users: true : Publish. Both local and remote users can hear the metronome. false : Do not publish. Only the local user can hear the metronome.
   */
  publishRhythmPlayerTrack?: boolean;
  /**
   * This parameter is used for cross-room co-hosting scenarios. The co-host needs to call the joinChannelEx method to join the other room as an audience member and set isInteractiveAudience to true.
   *  This parameter takes effect only when the user role is ClientRoleAudience. Whether to enable interactive audience mode: true : Enable interactive audience mode. Once enabled, the local user, as an interactive audience member, receives low-latency and smooth remote video. false : Do not enable interactive audience mode. The local user, as a regular audience member, receives remote video with default settings.
   */
  isInteractiveAudience?: boolean;
  /**
   * The video track ID returned by the createCustomVideoTrack method. The default value is 0.
   */
  customVideoTrackId?: number;
  /**
   * To enable this feature, please [contact sales](https://www.shengwang.cn/contact-sales/). Sets whether the current audio stream participates in stream selection based on volume algorithm. true : Participate in volume-based stream selection. If the volume-based stream selection feature is not enabled, this parameter has no effect. false : Do not participate in volume-based stream selection.
   */
  isAudioFilterable?: boolean;
  /**
   * @ignore
   */
  parameters?: string;
  /**
   * Permissions and system requirements:
   *  Android: Android 7.0 or higher (API level 24 or above), requires ACCESS_NETWORK_STATE and CHANGE_NETWORK_STATE permissions.
   *  iOS: iOS 12.0 or higher.
   *  macOS: 10.14 or higher.
   *  Windows: Windows Vista or higher. Whether to enable multipath transmission: true : Enable multipath transmission. false : Disable multipath transmission.
   */
  enableMultipath?: boolean;
  /**
   * Uplink transmission mode. See MultipathMode. When using this parameter, make sure enableMultipath is set to true.
   */
  uplinkMultipathMode?: MultipathMode;
  /**
   * Downlink transmission mode. See MultipathMode. When using this parameter, make sure enableMultipath is set to true.
   */
  downlinkMultipathMode?: MultipathMode;
  /**
   * Preferred transmission path type. See MultipathType. When using this parameter, make sure enableMultipath is set to true.
   */
  preferMultipathType?: MultipathType;
}

/**
 * Proxy type.
 */
export enum ProxyType {
  /**
   * 0: Reserved parameter, not supported yet.
   */
  NoneProxyType = 0,
  /**
   * 1: Cloud proxy using UDP protocol, i.e., Force UDP cloud proxy mode. In this mode, the SDK always transmits data via UDP protocol.
   */
  UdpProxyType = 1,
  /**
   * 2: Cloud proxy using TCP (encrypted) protocol, i.e., Force TCP cloud proxy mode. In this mode, the SDK always transmits data via TLS 443.
   */
  TcpProxyType = 2,
  /**
   * 3: Reserved parameter, not supported yet.
   */
  LocalProxyType = 3,
  /**
   * 4: Auto mode. In this mode, the SDK first tries to connect to SD-RTN™. If the connection fails, it automatically switches to TLS 443.
   */
  TcpProxyAutoFallbackType = 4,
  /**
   * @ignore
   */
  HttpProxyType = 5,
  /**
   * @ignore
   */
  HttpsProxyType = 6,
}

/**
 * @ignore
 */
export enum FeatureType {
  /**
   * @ignore
   */
  VideoVirtualBackground = 1,
  /**
   * @ignore
   */
  VideoBeautyEffect = 2,
}

/**
 * Options for leaving the channel.
 */
export class LeaveChannelOptions {
  /**
   * Whether to stop playing music files and audio mixing when leaving the channel: true : (default) Stop playing music files and audio mixing. false : Do not stop playing music files and audio mixing.
   */
  stopAudioMixing?: boolean;
  /**
   * Whether to stop playing sound effects when leaving the channel: true : (default) Stop playing sound effects. false : Do not stop playing sound effects.
   */
  stopAllEffect?: boolean;
  /**
   * Whether to stop microphone capture when leaving the channel: true : (default) Stop microphone capture. false : Do not stop microphone capture.
   */
  stopMicrophoneRecording?: boolean;
}

/**
 * The IRtcEngineEventHandler interface class is used by the SDK to send event notifications to the App. The App obtains SDK event notifications by inheriting methods of this interface class.
 *
 * All methods of this interface class have default (empty) implementations. The App can choose to inherit only the events it cares about.
 *  In the callback methods, the App should not perform time-consuming operations or call APIs that may cause blocking (such as sendMessage), otherwise it may affect the operation of the SDK.
 *  The SDK no longer catches exceptions in the code logic implemented by the developer in the callbacks of the IRtcEngineEventHandler class. You need to handle such exceptions yourself, otherwise the App may crash when exceptions occur.
 */
export interface IRtcEngineEventHandler {
  /**
   * Occurs when a user joins a channel successfully.
   *
   * This callback indicates that the client successfully joined the specified channel.
   *
   * @param connection The connection information. See RtcConnection.
   * @param elapsed The time elapsed (ms) from calling joinChannel until this event occurs.
   */
  onJoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * Occurs when the user successfully rejoins the channel.
   *
   * @param connection Connection information. See RtcConnection.
   * @param elapsed Time elapsed (ms) from calling joinChannel to the triggering of this callback.
   */
  onRejoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * Callback for proxy connection status.
   *
   * You can use this callback to listen for the SDK's proxy connection status. For example, when a user calls setCloudProxy to set a proxy and successfully joins a channel, the SDK triggers this callback to report the user ID, type of connected proxy, and the time elapsed from calling joinChannel to triggering this callback.
   *
   * @param channel Channel name.
   * @param uid User ID
   * @param proxyType Type of connected proxy. See ProxyType.
   * @param localProxyIp Reserved parameter, not supported yet.
   * @param elapsed Time elapsed (in milliseconds) from calling joinChannel to the SDK triggering this callback.
   */
  onProxyConnected?(
    channel: string,
    uid: number,
    proxyType: ProxyType,
    localProxyIp: string,
    elapsed: number
  ): void;

  /**
   * Occurs when an error is reported.
   *
   * This callback indicates that a network or media-related error occurred during SDK runtime. In most cases, errors reported by the SDK mean it cannot recover automatically and requires app intervention or user notification.
   *
   * @param err The error code. See ErrorCodeType.
   * @param msg The error description.
   */
  onError?(err: ErrorCodeType, msg: string): void;

  /**
   * Reports the audio quality of a remote user.
   *
   * Deprecated Deprecated: Use onRemoteAudioStats instead. This callback reports the audio quality of a remote user during a call. It is triggered every 2 seconds for each remote user/host. If there are multiple remote users/hosts, the callback is triggered multiple times every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid The user ID of the sender of the audio stream.
   * @param quality The audio quality. See QualityType.
   * @param delay The delay (ms) from the sender to the receiver, including pre-processing, network transmission, and jitter buffer delay.
   * @param lost The packet loss rate (%) from the sender to the receiver.
   */
  onAudioQuality?(
    connection: RtcConnection,
    remoteUid: number,
    quality: QualityType,
    delay: number,
    lost: number
  ): void;

  /**
   * Callback for the last mile uplink and downlink quality probe result before a call.
   *
   * After calling startLastmileProbeTest, the SDK returns this callback within approximately 30 seconds.
   *
   * @param result Last mile uplink and downlink quality probe result. See LastmileProbeResult.
   */
  onLastmileProbeResult?(result: LastmileProbeResult): void;

  /**
   * Occurs when the SDK reports the volume of users.
   *
   * This callback is disabled by default. You can enable it by calling enableAudioVolumeIndication. Once enabled, as long as there are users publishing streams in the channel, the SDK triggers the onAudioVolumeIndication callback at the time interval set in enableAudioVolumeIndication after joining the channel. Two onAudioVolumeIndication callbacks are triggered each time: one reports the volume information of the local publishing user, and the other reports the volume information of the remote users (up to 3) with the highest instantaneous volume. After this feature is enabled, if a user mutes themselves (by calling muteLocalAudioStream), the SDK continues to report the local user's volume indication callback.
   * If a remote user with the highest instantaneous volume mutes themselves, they will no longer be included in the remote volume indication callback after 20 seconds. If all remote users mute themselves, the SDK stops reporting remote volume indication callbacks after 20 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param speakers User volume information. See the AudioVolumeInfo array. If speakers is empty, it means no remote users are publishing streams or there are no remote users.
   * @param speakerNumber Number of users.
   *  In the local user's callback, as long as the local user is publishing, speakerNumber is always 1.
   *  In the remote users' callback, the value range of speakerNumber is [0,3]. If there are more than 3 remote publishing users, speakerNumber is 3 in this callback.
   * @param totalVolume Total mixed volume, range [0,255].
   *  In the local user's callback, totalVolume is the volume of the local publishing user.
   *  In the remote users' callback, totalVolume is the total mixed volume of the remote users (up to 3) with the highest instantaneous volume.
   */
  onAudioVolumeIndication?(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): void;

  /**
   * Occurs when a user leaves the channel.
   *
   * You can use this callback to get information such as the total call duration and the amount of data sent and received by the SDK during the call.
   *
   * @param connection Connection information. See RtcConnection.
   * @param stats Call statistics. See RtcStats.
   */
  onLeaveChannel?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * Reports the statistics of the current call.
   *
   * @param connection Connection information. See RtcConnection.
   * @param stats RTC engine statistics. See RtcStats.
   */
  onRtcStats?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * @ignore
   */
  onAudioDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: MediaDeviceStateType
  ): void;

  /**
   * Reports the playback progress of the music file.
   *
   * After you call the startAudioMixing method to play a music file, the SDK triggers this callback every second to report the current playback progress.
   *
   * @param position Current playback progress of the music file in ms.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  onAudioMixingPositionChanged?(position: number): void;

  /**
   * Occurs when the local music file playback ends.
   *
   * Deprecated Deprecated: Use onAudioMixingStateChanged instead. This callback is triggered when playback of the local music file started by startAudioMixing ends. If startAudioMixing fails, it returns the error code WARN_AUDIO_MIXING_OPEN_ERROR.
   */
  onAudioMixingFinished?(): void;

  /**
   * Callback when the local audio effect file finishes playing.
   *
   * This callback is triggered when the audio effect finishes playing.
   *
   * @param soundId The ID of the specified audio effect. Each audio effect has a unique ID.
   */
  onAudioEffectFinished?(soundId: number): void;

  /**
   * @ignore
   */
  onVideoDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: MediaDeviceStateType
  ): void;

  /**
   * Callback for the last mile uplink and downlink network quality report of each user during a call.
   *
   * This callback describes the last mile network status of each user during a call, where the last mile refers to the network status from the device to the Agora edge server.
   * This callback is triggered every 2 seconds. If there are multiple remote users, it will be triggered multiple times every 2 seconds.
   * This callback reports network quality through broadcast packets in the channel. Excessive broadcast packets may cause a broadcast storm. To prevent a broadcast storm from causing large data transmission in the channel, this callback supports reporting the network quality of up to 4 remote hosts simultaneously by default. When the user does not send streams, txQuality is Unknown; when the user does not receive streams, rxQuality is Unknown.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID. Indicates the network quality of the user with this ID reported by the callback. If the uid is 0, it returns the network quality of the local user.
   * @param txQuality The user's uplink network quality, calculated based on the sending bitrate, uplink packet loss rate, average round-trip time, and network jitter. This value represents the current uplink network quality and helps determine whether the current video encoding settings can be supported. For example, if the uplink bitrate is 1000 Kbps, it can support a resolution of 640 × 480 and frame rate of 15 fps in a live broadcast scenario, but may struggle to support 1280 × 720 resolution.
   * @param rxQuality The user's downlink network quality, calculated based on the downlink packet loss rate, average round-trip time, and network jitter.
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
   * Callback when uplink network information changes.
   *
   * The SDK triggers this callback only when uplink network information changes. This callback is applicable only in scenarios where H.264 format external encoded video data is pushed to the SDK.
   *
   * @param info Uplink network information. See UplinkNetworkInfo.
   */
  onUplinkNetworkInfoUpdated?(info: UplinkNetworkInfo): void;

  /**
   * Callback for the last mile network quality report.
   *
   * This callback describes the result of the last mile network probe for the local user before joining a channel. Last mile refers to the network status from the device to the Agora edge server.
   * Before joining a channel, after calling startLastmileProbeTest, the SDK triggers this callback to report the result of the local user's last mile network probe.
   *
   * @param quality Last mile network quality. See QualityType.
   */
  onLastmileQuality?(quality: QualityType): void;

  /**
   * Callback when the first local video frame is rendered.
   *
   * This callback is triggered when the first local video frame is displayed in the local view.
   *
   * @param source The type of video source. See VideoSourceType.
   * @param width Width (px) of the locally rendered video.
   * @param height Height (px) of the locally rendered video.
   * @param elapsed Time elapsed in milliseconds from calling joinChannel to this event. If startPreviewWithoutSourceType / startPreview was called before joining the channel, this parameter indicates the time from calling startPreviewWithoutSourceType or startPreview to this event.
   */
  onFirstLocalVideoFrame?(
    source: VideoSourceType,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Callback when the first local video frame is published.
   *
   * The SDK triggers this callback in the following scenarios:
   *  After successfully joining a channel with the local video module enabled.
   *  After calling muteLocalVideoStream(true) and then muteLocalVideoStream(false).
   *  After calling disableVideo and then enableVideo.
   *
   * @param connection Connection information. See RtcConnection.
   * @param elapsed Time interval in milliseconds from calling joinChannel to triggering this callback.
   */
  onFirstLocalVideoFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * Callback when the first remote video frame is received and decoded.
   *
   * The SDK triggers this callback in the following scenarios:
   *  When the remote user sends video after joining the channel for the first time.
   *  When the remote user sends video again after going offline and coming back online. Possible reasons for interruption include:
   *  The remote user leaves the channel.
   *  The remote user is disconnected.
   *  The remote user calls disableVideo to turn off the video module.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID specifying which user's video stream it is.
   * @param width Width (px) of the video stream.
   * @param height Height (px) of the video stream.
   * @param elapsed Delay in milliseconds from calling joinChannel locally to triggering this callback.
   */
  onFirstRemoteVideoDecoded?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the size or rotation of the local or remote video changes.
   *
   * @param connection Connection information. See RtcConnection.
   * @param sourceType Type of video source. See VideoSourceType.
   * @param uid User ID whose video size or rotation has changed (the uid of the local user is 0, indicating this is a local video preview).
   * @param width Width of the video stream (pixels).
   * @param height Height of the video stream (pixels).
   * @param rotation Rotation information, range [0, 360). On iOS, this value is always 0.
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
   * Callback triggered when a local video event occurs.
   *
   * Since Available since v4.6.1. You can use this callback to get the reason for the local video event.
   *
   * @param source Type of video source. See VideoSourceType.
   * @param event Type of local video event. See LocalVideoEventType.
   */
  onLocalVideoEvent?(source: VideoSourceType, event: LocalVideoEventType): void;

  /**
   * Callback when the local video state changes.
   *
   * This callback is triggered by the SDK when the state of the local video changes, reporting the current state and the reason for the change.
   *  Frame duplication detection only applies to video frames with resolution greater than 200 × 200, frame rate ≥ 10 fps, and bitrate less than 20 Kbps.
   *  If an exception occurs during video capture, you can usually troubleshoot the issue using the reason parameter in this callback. However, on some devices, when capture issues occur (e.g., freezing), Android may not throw any error callbacks, so the SDK cannot report the reason for the local video state change. In this case, you can determine whether there are no captured frames by checking if this callback reports state as LocalVideoStreamStateCapturing or LocalVideoStreamStateEncoding, and the captureFrameRate in the onLocalVideoStats callback is 0.
   *
   * @param source Type of video source. See VideoSourceType.
   * @param state Local video state. See LocalVideoStreamState.
   * @param reason Reason for the local video state change. See LocalVideoStreamReason.
   */
  onLocalVideoStateChanged?(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    reason: LocalVideoStreamReason
  ): void;

  /**
   * Callback when the remote video state changes.
   *
   * When the number of users (in communication) or hosts (in live broadcast) in the channel exceeds 32, this callback may be inaccurate.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid Remote user ID whose video state changed.
   * @param state Remote video stream state. See RemoteVideoState.
   * @param reason Specific reason for the remote video stream state change. See RemoteVideoStateReason.
   * @param elapsed Time elapsed (in ms) from the local user calling joinChannel to this event.
   */
  onRemoteVideoStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ): void;

  /**
   * Callback when the renderer receives the first remote video frame.
   *
   * This callback is only triggered when SDK rendering is used; if custom video rendering is used, this callback will not be triggered and you need to implement it outside the SDK.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID specifying which user's video stream it is.
   * @param width Width (px) of the video stream.
   * @param height Height (px) of the video stream.
   * @param elapsed Time elapsed in milliseconds from calling joinChannel locally to this event.
   */
  onFirstRemoteVideoFrame?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when a remote user (in Communication) or host (in Live Broadcast) joins the current channel.
   *
   * In the Communication profile, this callback indicates that a remote user has joined the channel. If other users are already in the channel when the user joins, the new user also receives callbacks for those existing users.
   *  In the Live Broadcast profile, this callback indicates that a host has joined the channel. If other hosts are already in the channel, the new host also receives callbacks for those existing hosts. It is recommended to limit the number of hosts in a call to 32 (no more than 17 with video).
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user/host who just joined the channel.
   * @param elapsed The time delay (ms) from the local user calling joinChannel to the triggering of this callback.
   */
  onUserJoined?(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void;

  /**
   * Callback when a remote user (in communication) or host (in live streaming) leaves the current channel.
   *
   * Users may leave the channel for the following reasons:
   *  Normal leave: The remote user or host sends a 'goodbye'-like message and actively leaves the channel.
   *  Timeout disconnection: If no data packet is received from the other party within a certain period (20 seconds in communication, slightly delayed in live streaming), the user is considered disconnected. In poor network conditions, false reports may occur. It is recommended to use the RTM SDK for reliable disconnection detection.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid ID of the remote user or host who went offline.
   * @param reason Reason why the remote user (in communication) or host (in live streaming) went offline. See UserOfflineReasonType.
   */
  onUserOffline?(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void;

  /**
   * Occurs when a remote user (in the Communication profile) or host (in the Live Broadcast profile) stops or resumes sending audio streams.
   *
   * This callback is triggered when a remote user calls muteLocalAudioStream to stop or resume sending audio. This callback may be inaccurate when the number of users (in the Communication profile) or hosts (in the Live Broadcast profile) in the channel exceeds 32.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID.
   * @param muted Whether the user is muted: true : The user has muted the audio. false : The user has unmuted the audio.
   */
  onUserMuteAudio?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * Occurs when a remote user stops or resumes publishing the video stream.
   *
   * This callback is triggered when a remote user calls muteLocalVideoStream to stop or resume publishing the video stream. The SDK reports the remote user's stream publishing status to the local user. When the number of users (in communication scenario) or hosts (in live streaming scenario) in the channel exceeds 32, this callback may be inaccurate.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid Remote user ID.
   * @param muted Whether the remote user stops publishing the video stream: true : Stops publishing the video stream. false : Publishes the video stream.
   */
  onUserMuteVideo?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * Occurs when a remote user enables or disables the video module.
   *
   * Disabling the video function means the user can only make voice calls, cannot display or send their own video, and cannot receive or display others' video.
   * This callback is triggered when a remote user calls the enableVideo or disableVideo method to enable or disable the video module.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid The user ID indicating whose video stream is affected.
   * @param enabled true : The user has enabled the video function. false : The user has disabled the video function.
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
   * Callback when a remote user enables/disables local video capture.
   *
   * Deprecated Deprecated: This callback has been deprecated. Use the following enumerations in the onRemoteVideoStateChanged callback instead: RemoteVideoStateStopped (0) and RemoteVideoStateReasonRemoteMuted (5). RemoteVideoStateDecoding (2) and RemoteVideoStateReasonRemoteUnmuted (6). This callback is triggered when a remote user calls the enableLocalVideo method to enable or disable video capture.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID indicating whose video stream it is.
   * @param enabled Whether the remote user has enabled video capture: true : The user has enabled video. Other users can receive this user's video stream. false : The user has disabled video. The user can still receive video streams from others, but others cannot receive this user's video stream.
   */
  onUserEnableLocalVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /**
   * Reports the statistics of the audio stream sent by each remote user during a call.
   *
   * This callback is triggered every 2 seconds for each remote user/host who is sending an audio stream. If multiple remote users/hosts are sending audio streams, this callback is triggered multiple times every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param stats The statistics of the received remote audio stream. See RemoteAudioStats.
   */
  onRemoteAudioStats?(connection: RtcConnection, stats: RemoteAudioStats): void;

  /**
   * Reports the statistics of the local audio stream during a call.
   *
   * The SDK triggers this callback every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param stats Local audio statistics. See LocalAudioStats.
   */
  onLocalAudioStats?(connection: RtcConnection, stats: LocalAudioStats): void;

  /**
   * Callback for local video stream statistics.
   *
   * This callback describes statistics of the video stream sent by the local device. It is triggered every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param stats Local video stream statistics. See LocalVideoStats.
   */
  onLocalVideoStats?(
    connection: RtcConnection,
    sourceType: VideoSourceType,
    stats: LocalVideoStats
  ): void;

  /**
   * Callback for remote video stream statistics during a call.
   *
   * This callback describes end-to-end video stream statistics of remote users during a call. It is triggered every 2 seconds for each remote user/host. If there are multiple remote users/hosts, this callback is triggered multiple times every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param stats Remote video statistics. See RemoteVideoStats.
   */
  onRemoteVideoStats?(connection: RtcConnection, stats: RemoteVideoStats): void;

  /**
   * Callback when the camera is ready.
   *
   * Deprecated Deprecated: Use onLocalVideoStateChanged with LocalVideoStreamStateCapturing(1) instead. This callback indicates that the camera has been successfully opened and video capture can begin.
   */
  onCameraReady?(): void;

  /**
   * Callback when the camera focus area changes.
   *
   * This callback is triggered when the local user calls the setCameraFocusPositionInPreview method to change the focus position. This callback is applicable to Android and iOS only.
   *
   * @param x The x-coordinate of the changed focus area.
   * @param y The y-coordinate of the changed focus area.
   * @param width The width of the changed focus area.
   * @param height The height of the changed focus area.
   */
  onCameraFocusAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * Callback when the camera exposure area changes.
   *
   * This callback is triggered when the local user calls the setCameraExposurePosition method to change the exposure position. This callback is applicable to Android and iOS only.
   *
   * @param x The x-coordinate of the changed exposure area.
   * @param y The y-coordinate of the changed exposure area.
   * @param width The width of the changed exposure area.
   * @param height The height of the changed exposure area.
   */
  onCameraExposureAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * Reports local face detection results.
   *
   * After calling enableFaceDetection(true) to enable local face detection, you can use this callback to get the following face detection information in real time:
   *  Size of the captured image
   *  Position of the face in the view
   *  Distance of the face from the device screen The distance of the face from the screen is estimated by the SDK based on the image size and face position in the view.
   *  When the face in front of the camera disappears, this callback is triggered immediately; when no face is detected, the callback frequency is reduced to save power.
   *  This callback is not triggered when the face is too close to the screen.
   *
   * @param imageWidth Width (px) of the captured image.
   * @param imageHeight Height (px) of the captured image.
   * @param vecRectangle Detected face information. See Rectangle.
   * @param vecDistance Distance between the face and the device screen (cm).
   * @param numFaces Number of faces detected. If 0, no face is detected.
   */
  onFacePositionChanged?(
    imageWidth: number,
    imageHeight: number,
    vecRectangle: Rectangle[],
    vecDistance: number[],
    numFaces: number
  ): void;

  /**
   * Occurs when the video function is stopped.
   *
   * Deprecated Deprecated: Use the onLocalVideoStateChanged callback with LocalVideoStreamStateStopped (0) instead. If the app needs to perform other operations on the view after stopping the video (such as displaying other content), you can do so in this callback.
   */
  onVideoStopped?(): void;

  /**
   * Occurs when the playback state of the music file changes.
   *
   * This callback is triggered when the playback state of the music file changes and reports the current playback state and error code.
   *
   * @param state Playback state of the music file. See AudioMixingStateType.
   * @param reason Error code. See AudioMixingReasonType.
   */
  onAudioMixingStateChanged?(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ): void;

  /**
   * Occurs when the state of the virtual metronome changes.
   *
   * Deprecated Deprecated since v4.6.2. This callback is triggered when the state of the virtual metronome changes. When the virtual metronome encounters an issue, this callback helps you understand its current state and the reason for the failure, which facilitates troubleshooting.
   *
   * @param state The current state of the virtual metronome. See RhythmPlayerStateType.
   * @param reason The error code and message when the virtual metronome encounters an error. See RhythmPlayerReason.
   */
  onRhythmPlayerStateChanged?(
    state: RhythmPlayerStateType,
    reason: RhythmPlayerReason
  ): void;

  /**
   * Callback when the network connection is lost and the SDK cannot reconnect to the server within 10 seconds.
   *
   * After calling joinChannel, this callback is triggered if the SDK fails to connect to the server within 10 seconds, regardless of whether the channel is joined successfully. If the SDK fails to rejoin the channel within 20 minutes after disconnection, it will stop trying to reconnect.
   *
   * @param connection Connection information. See RtcConnection.
   */
  onConnectionLost?(connection: RtcConnection): void;

  /**
   * Callback when the network connection is interrupted.
   *
   * Deprecated Deprecated: Use onConnectionStateChanged instead. This callback is triggered when the SDK loses connection to the server for more than 4 seconds after a connection has been established. After the event is triggered, the SDK will attempt to reconnect to the server, so this event can be used for UI prompts. The difference between this callback and onConnectionLost is: onConnectionInterrupted is always triggered after successfully joining a channel and when the SDK has just lost connection to the server for more than 4 seconds. onConnectionLost is triggered regardless of whether the channel is joined successfully, as long as the SDK cannot connect to the server within 10 seconds. If the SDK fails to rejoin the channel within 20 minutes after disconnection, it will stop trying to reconnect.
   *
   * @param connection Connection information. See RtcConnection.
   */
  onConnectionInterrupted?(connection: RtcConnection): void;

  /**
   * Callback when the network connection is banned by the server.
   *
   * Deprecated Deprecated: Use onConnectionStateChanged instead.
   *
   * @param connection Connection information. See RtcConnection.
   */
  onConnectionBanned?(connection: RtcConnection): void;

  /**
   * Callback when receiving a data stream message from a remote user.
   *
   * This callback indicates that the local user has received a stream message sent by a remote user using the sendStreamMessage method.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID of the sender.
   * @param streamId Stream ID of the received message.
   * @param data Received data.
   * @param length Length of the data in bytes.
   * @param sentTs Timestamp when the data stream was sent.
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
   * Callback when an error occurs while receiving a data stream message from a remote user.
   *
   * This callback indicates that the local user failed to receive a stream message sent by a remote user using the sendStreamMessage method.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID of the sender.
   * @param streamId Stream ID of the received message.
   * @param code Error code. See ErrorCodeType.
   * @param missed Number of missed messages.
   * @param cached Number of messages cached after the data stream was interrupted.
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
   * @ignore
   */
  onRdtMessage?(
    connection: RtcConnection,
    userId: number,
    type: RdtStreamType,
    data: string,
    length: number
  ): void;

  /**
   * @ignore
   */
  onRdtStateChanged?(
    connection: RtcConnection,
    userId: number,
    state: RdtState
  ): void;

  /**
   * @ignore
   */
  onMediaControlMessage?(
    connection: RtcConnection,
    userId: number,
    data: string,
    length: number
  ): void;

  /**
   * Occurs when the token has expired.
   *
   * During an audio or video call, if the token becomes invalid, the SDK triggers this callback to report that the token has expired.
   * When you receive this callback, you need to generate a new token on your server and update it using one of the following methods:
   *  Single-channel scenario:
   *  Call renewToken to pass in the new token.
   *  Call leaveChannel to leave the current channel, then call joinChannel with the new token to rejoin the channel.
   *  Multi-channel scenario: Call updateChannelMediaOptionsEx with the new token.
   *
   * @param connection Connection information. See RtcConnection.
   */
  onRequestToken?(connection: RtcConnection): void;

  /**
   * Occurs when the token is about to expire in 30 seconds.
   *
   * When you receive this callback, you need to generate a new token on your server and update it using one of the following methods:
   *  Single-channel scenario:
   *  Call renewToken to pass in the new token.
   *  Call leaveChannel to leave the current channel, then call joinChannel with the new token to rejoin the channel.
   *  Multi-channel scenario: Call updateChannelMediaOptionsEx with the new token.
   *
   * @param connection Connection information. See RtcConnection.
   * @param token The token that is about to expire.
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
   * Occurs when the first local audio frame is published.
   *
   * The SDK triggers this callback in the following scenarios:
   *  After successfully joining a channel by calling joinChannel with local audio enabled.
   *  After calling muteLocalAudioStream(true) and then muteLocalAudioStream(false).
   *  After calling disableAudio and then enableAudio.
   *
   * @param connection Connection information. See RtcConnection.
   * @param elapsed Time elapsed (ms) from calling joinChannel until this callback is triggered.
   */
  onFirstLocalAudioFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * Occurs when the first remote audio frame is decoded.
   *
   * Deprecated Deprecated: Use onRemoteAudioStateChanged instead. The SDK triggers this callback in the following scenarios:
   *  When the remote user sends audio after joining the channel for the first time.
   *  When the remote user goes offline and then comes back online to send audio. Offline means no audio packet is received locally within 15 seconds, which may be due to:
   *  The remote user leaving the channel
   *  The remote user disconnecting
   *  The remote user calling muteLocalAudioStream to stop sending audio
   *  The remote user calling disableAudio to disable audio
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid Remote user ID.
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel until this callback is triggered.
   */
  onFirstRemoteAudioDecoded?(
    connection: RtcConnection,
    uid: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the first remote audio frame is received.
   *
   * Deprecated Deprecated: Use onRemoteAudioStateChanged instead.
   *
   * @param connection Connection information. See RtcConnection.
   * @param userId User ID of the remote user who sent the audio frame.
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel until this callback is triggered.
   */
  onFirstRemoteAudioFrame?(
    connection: RtcConnection,
    userId: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the local audio state changes.
   *
   * This callback is triggered when the local audio state changes, including changes in microphone capture and audio encoding. When local audio experiences issues, this callback helps you understand the current audio state and the cause of the issue, making it easier to troubleshoot. When the state is LocalAudioStreamStateFailed (3), you can check the error information in the error parameter.
   *
   * @param connection Connection information. See RtcConnection.
   * @param state Current local audio state. See LocalAudioStreamState.
   * @param reason Reason for the local audio state change. See LocalAudioStreamReason.
   */
  onLocalAudioStateChanged?(
    connection: RtcConnection,
    state: LocalAudioStreamState,
    reason: LocalAudioStreamReason
  ): void;

  /**
   * Occurs when the state of the remote audio stream changes.
   *
   * Occurs when the audio state of a remote user (in the Communication profile) or host (in the Live Broadcast profile) changes. The SDK reports the current state of the remote audio stream to the local user through this callback. This callback may be inaccurate when the number of users (in the Communication profile) or hosts (in the Live Broadcast profile) in the channel exceeds 32.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user whose audio state has changed.
   * @param state The state of the remote audio stream. See RemoteAudioState.
   * @param reason The reason for the remote audio state change. See RemoteAudioStateReason.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel until this event occurs.
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
   *
   * After successfully calling enableAudioVolumeIndication, the SDK continuously monitors the remote user with the highest volume and counts the number of times the user is identified as the loudest. The remote user with the highest count during a given period is considered the most active speaker.
   * When there are two or more users in the channel and there is an active remote user, the SDK triggers this callback and reports the uid of the most active remote speaker.
   *  If the most active speaker remains the same, the SDK does not trigger the onActiveSpeaker callback again.
   *  If the most active speaker changes, the SDK triggers this callback again and reports the new uid.
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid The ID of the most active remote speaker.
   */
  onActiveSpeaker?(connection: RtcConnection, uid: number): void;

  /**
   * @ignore
   */
  onContentInspectResult?(result: ContentInspectResult): void;

  /**
   * Callback for snapshot result.
   *
   * After calling takeSnapshot successfully, the SDK triggers this callback to report whether the snapshot was successful and provide details.
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid User ID. If uid is 0, it indicates the local user.
   * @param filePath Local path where the snapshot is saved.
   * @param width Image width (px).
   * @param height Image height (px).
   * @param errCode Indicates success or reason for failure.
   *  0: Snapshot succeeded.
   *  < 0: Snapshot failed.
   *  -1: Failed to write file or JPEG encoding failed.
   *  -2: No video frame from the specified user within 1 second after calling takeSnapshot. Possible causes: local capture stopped, remote user stopped publishing, or video processing is blocked.
   *  -3: takeSnapshot is called too frequently.
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
   * Occurs when the user role or audience latency level is switched.
   *
   * This callback is not triggered if you call setClientRole and set the user role to BROADCASTER before joining a channel.
   *
   * @param connection The connection information. See RtcConnection.
   * @param oldRole The previous role: ClientRoleType.
   * @param newRole The new role: ClientRoleType.
   * @param newRoleOptions The properties of the new role. See ClientRoleOptions.
   */
  onClientRoleChanged?(
    connection: RtcConnection,
    oldRole: ClientRoleType,
    newRole: ClientRoleType,
    newRoleOptions: ClientRoleOptions
  ): void;

  /**
   * Occurs when the user role switch fails.
   *
   * When the user role switch fails, you can use this callback to learn the reason for the failure and the current user role.
   *
   * @param connection The connection information. See RtcConnection.
   * @param reason The reason for the user role switch failure. See ClientRoleChangeFailedReason.
   * @param currentRole The current user role. See ClientRoleType.
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
   * Callback when the RTMP streaming state changes.
   *
   * When the RTMP streaming state changes, the SDK triggers this callback and provides the URL where the change occurred and the current streaming state. This callback helps streaming users understand the current streaming status. If an error occurs during streaming, you can use the returned error code to identify the cause and troubleshoot accordingly.
   *
   * @param url The URL where the streaming state changed.
   * @param state The current streaming state. See RtmpStreamPublishState.
   * @param reason The reason for the change in streaming state. See RtmpStreamPublishReason.
   */
  onRtmpStreamingStateChanged?(
    url: string,
    state: RtmpStreamPublishState,
    reason: RtmpStreamPublishReason
  ): void;

  /**
   * Callback for CDN streaming events.
   *
   * @param url The CDN streaming URL.
   * @param eventCode The CDN streaming event code. See RtmpStreamingEvent.
   */
  onRtmpStreamingEvent?(url: string, eventCode: RtmpStreamingEvent): void;

  /**
   * Callback when the RTMP transcoding settings are updated.
   *
   * When the LiveTranscoding parameters in the startRtmpStreamWithTranscoding method are updated, the onTranscodingUpdated callback is triggered to notify the host of the update. This callback is not triggered the first time you set the transcoding parameters LiveTranscoding using the startRtmpStreamWithTranscoding method.
   */
  onTranscodingUpdated?(): void;

  /**
   * Callback when the audio route changes.
   *
   * @param routing The current audio route:
   *  -1: Default audio route.
   *  0: Headset with microphone.
   *  1: Earpiece.
   *  2: Headset without microphone.
   *  3: Built-in speaker.
   *  4: External speaker. (iOS and macOS only)
   *  5: Bluetooth headset.
   */
  onAudioRoutingChanged?(routing: number): void;

  /**
   * Occurs when the state of media stream relay across channels changes.
   *
   * Occurs when the state of media stream relay across channels changes. The SDK triggers this callback to report the current relay state and error information.
   *
   * @param state The state of media stream relay across channels. See ChannelMediaRelayState.
   * @param code The error code of the media stream relay across channels. See ChannelMediaRelayError.
   */
  onChannelMediaRelayStateChanged?(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void;

  /**
   * Callback when the subscribed stream falls back to audio-only or recovers to audio and video.
   *
   * When you call setRemoteSubscribeFallbackOption and set option to StreamFallbackOptionAudioOnly, this callback is triggered in the following situations:
   *  The downlink network condition is poor, and the subscribed audio and video stream falls back to audio-only.
   *  The downlink network condition improves, and the subscribed audio-only stream recovers to audio and video. When the subscribed stream falls back to a lower-quality video stream due to poor network conditions, you can monitor the switch between high and low video streams through the onRemoteVideoStats callback.
   *
   * @param uid Remote user's user ID.
   * @param isFallbackOrRecover true : Due to poor network conditions, the subscribed stream has fallen back to audio-only. false : Due to improved network conditions, the subscribed stream has recovered to audio and video.
   */
  onRemoteSubscribeFallbackToAudioOnly?(
    uid: number,
    isFallbackOrRecover: boolean
  ): void;

  /**
   * Reports the transport statistics of the audio stream sent by each remote user during a call.
   *
   * Deprecated:
   * Use onRemoteAudioStats instead.
   * This callback reports the end-to-end network statistics of the remote user during a call, calculated based on audio packets. It reflects the current network status using objective data such as packet loss and network delay. During a call, when a user receives audio packets sent by a remote user/host, this callback is triggered every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid The user ID that identifies which user/host's audio packet it is.
   * @param delay The delay (ms) from the sender to the receiver of the audio packet.
   * @param lost The packet loss rate (%) from sender to receiver of the audio packet.
   * @param rxKBitrate The received bitrate (Kbps) of the remote audio packet.
   */
  onRemoteAudioTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /**
   * Callback for remote video stream transport statistics during a call.
   *
   * Deprecated Deprecated: This callback has been deprecated. Use onRemoteVideoStats instead. This callback describes end-to-end network statistics of remote users during a call based on video packets. It uses objective data such as packet loss and network delay to reflect the current network status.
   * During a call, once the user receives video data packets from a remote user/host, this callback is triggered every 2 seconds.
   *
   * @param connection Connection information. See RtcConnection.
   * @param remoteUid User ID indicating which user/host the video packet belongs to.
   * @param delay Delay (ms) from sender to receiver for the video packet.
   * @param lost Packet loss rate (%) from sender to receiver for the video packet.
   * @param rxKBitRate Receiving bitrate (Kbps) of the remote video packet.
   */
  onRemoteVideoTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /**
   * Callback when the network connection state changes.
   *
   * This callback is triggered when the network connection state changes, informing you of the current state and the reason for the change.
   *
   * @param connection Connection information. See RtcConnection.
   * @param state Current network connection state. See ConnectionStateType.
   * @param reason Reason for the current connection state change. See ConnectionChangedReasonType.
   */
  onConnectionStateChanged?(
    connection: RtcConnection,
    state: ConnectionStateType,
    reason: ConnectionChangedReasonType
  ): void;

  /**
   * Callback when the local network type changes.
   *
   * When the local network connection type changes, the SDK triggers this callback and specifies the current network connection type in the callback. You can use this callback to get the network type being used. When the connection is interrupted, this callback can help identify whether the interruption is due to a network switch or poor network conditions.
   *
   * @param connection Connection information. See RtcConnection.
   * @param type Local network connection type. See NetworkType.
   */
  onNetworkTypeChanged?(connection: RtcConnection, type: NetworkType): void;

  /**
   * Callback when an error occurs with built-in encryption.
   *
   * After calling enableEncryption to enable encryption, if an error occurs in encryption or decryption on the sender or receiver side, the SDK triggers this callback.
   *
   * @param connection Connection information. See RtcConnection.
   * @param errorType Error type. See EncryptionErrorType.
   */
  onEncryptionError?(
    connection: RtcConnection,
    errorType: EncryptionErrorType
  ): void;

  /**
   * Callback when failing to obtain device permissions.
   *
   * When the SDK fails to obtain device permissions, it triggers this callback to report which device permission could not be obtained.
   *
   * @param permissionType Device permission type. See PermissionType.
   */
  onPermissionError?(permissionType: PermissionType): void;

  /**
   * Callback when permission is granted.
   *
   * @param permissionType Type of permission. See PermissionType.
   */
  onPermissionGranted?(permissionType: PermissionType): void;

  /**
   * Occurs when the local user successfully registers a User Account.
   *
   * After the local user successfully calls registerLocalUserAccount to register a User Account or calls joinChannelWithUserAccount to join a channel, the SDK triggers this callback and reports the local user's UID and User Account.
   *
   * @param uid The ID of the local user.
   * @param userAccount The User Account of the local user.
   */
  onLocalUserRegistered?(uid: number, userAccount: string): void;

  /**
   * Occurs when the remote user's information is updated.
   *
   * After a remote user joins the channel, the SDK obtains the user's UID and User Account, caches a mapping table containing the UID and User Account, and triggers this callback locally.
   *
   * @param uid The ID of the remote user.
   * @param info The UserInfo object that identifies the user's information, including the UID and User Account. See the UserInfo class.
   */
  onUserInfoUpdated?(uid: number, info: UserInfo): void;

  /**
   * @ignore
   */
  onUserAccountUpdated?(
    connection: RtcConnection,
    remoteUid: number,
    remoteUserAccount: string
  ): void;

  /**
   * Callback for video frame rendering events.
   *
   * After calling the startMediaRenderingTracing method or joining a channel, the SDK triggers this callback to report video frame rendering events and metrics during the rendering process. Developers can optimize based on these metrics to improve rendering efficiency.
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid User ID.
   * @param currentEvent Current video frame rendering event. See MediaTraceEvent.
   * @param tracingInfo Metrics during the video frame rendering process. Developers should minimize the metric values to improve rendering efficiency. See VideoRenderingTracingInfo.
   */
  onVideoRenderingTracingResult?(
    connection: RtcConnection,
    uid: number,
    currentEvent: MediaTraceEvent,
    tracingInfo: VideoRenderingTracingInfo
  ): void;

  /**
   * Callback when a local video compositing error occurs.
   *
   * This callback is triggered by the SDK when startLocalVideoTranscoder or updateLocalTranscoderConfiguration fails, reporting the reason for the compositing failure.
   *
   * @param stream The video stream that failed to composite. See TranscodingVideoStream.
   * @param error The reason for the local video compositing error. See VideoTranscoderError.
   */
  onLocalVideoTranscoderError?(
    stream: TranscodingVideoStream,
    error: VideoTranscoderError
  ): void;

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
   * Callback when the audio subscription state changes.
   *
   * @param channel Channel name.
   * @param uid Remote user ID.
   * @param oldState Previous subscription state. See StreamSubscribeState.
   * @param newState Current subscription state. See StreamSubscribeState.
   * @param elapseSinceLastState Time interval between two state changes (ms).
   */
  onAudioSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /**
   * Callback when the video subscription state changes.
   *
   * @param channel Channel name.
   * @param uid Remote user ID.
   * @param oldState Previous subscription state. See StreamSubscribeState.
   * @param newState Current subscription state. See StreamSubscribeState.
   * @param elapseSinceLastState Time interval between two state changes (ms).
   */
  onVideoSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /**
   * Callback for audio publish state changes.
   *
   * @param channel Channel name.
   * @param oldState Previous publish state. See StreamPublishState.
   * @param newState Current publish state. See StreamPublishState.
   * @param elapseSinceLastState Time interval between state changes (ms).
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
   * @param source Type of video source. See VideoSourceType.
   * @param channel Channel name.
   * @param oldState Previous publishing state. See StreamPublishState.
   * @param newState Current publishing state. See StreamPublishState.
   * @param elapseSinceLastState Time interval between the two state changes (ms).
   */
  onVideoPublishStateChanged?(
    source: VideoSourceType,
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /**
   * Callback for received mixed video stream with layout information.
   *
   * When the mixed video stream is received from the mixing server for the first time, or when the layout information of the mixed stream changes, the SDK triggers this callback to report the layout information of each sub-stream in the mixed video stream.
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid User ID of the publisher of the mixed video stream.
   * @param width Width (px) of the mixed video stream.
   * @param height Height (px) of the mixed video stream.
   * @param layoutCount Number of layout entries in the mixed video stream.
   * @param layoutlist Detailed layout information of a mixed video stream. See VideoLayout.
   */
  onTranscodedStreamLayoutInfo?(
    connection: RtcConnection,
    uid: number,
    width: number,
    height: number,
    layoutCount: number,
    layoutlist: VideoLayout[]
  ): void;

  /**
   * @ignore
   */
  onAudioMetadataReceived?(
    connection: RtcConnection,
    uid: number,
    metadata: string,
    length: number
  ): void;

  /**
   * Plugin event callback.
   *
   * To listen for plugin events, you need to register this callback.
   *
   * @param context Plugin context information. See ExtensionContext.
   * @param key The key of the plugin property.
   * @param value The value corresponding to the plugin property key.
   */
  onExtensionEventWithContext?(
    context: ExtensionContext,
    key: string,
    value: string
  ): void;

  /**
   * Callback when the extension is successfully enabled.
   *
   * This callback is triggered after the extension is successfully enabled.
   *
   * @param context Extension context information. See ExtensionContext.
   */
  onExtensionStartedWithContext?(context: ExtensionContext): void;

  /**
   * Callback when the extension is disabled.
   *
   * This callback is triggered after the extension is successfully disabled.
   *
   * @param context Extension context information. See ExtensionContext.
   */
  onExtensionStoppedWithContext?(context: ExtensionContext): void;

  /**
   * Plugin error callback.
   *
   * When plugin enabling fails or the plugin encounters a runtime error, the plugin triggers this callback and reports the error code and reason.
   *
   * @param context Plugin context information. See ExtensionContext.
   * @param error Error code. See the plugin documentation provided by the plugin provider.
   * @param message Error reason. See the plugin documentation provided by the plugin provider.
   */
  onExtensionErrorWithContext?(
    context: ExtensionContext,
    error: number,
    message: string
  ): void;

  /**
   * @ignore
   */
  onSetRtmFlagResult?(connection: RtcConnection, code: number): void;

  /**
   * Callback for multipath transmission statistics.
   *
   * Since Added since v4.6.2.
   *
   * @param stats Multipath transmission statistics. See MultipathStats.
   */
  onMultipathStats?(connection: RtcConnection, stats: MultipathStats): void;

  /**
   * Callback for the result of calling the renewToken method.
   *
   * Since Added since v4.6.2. This callback is triggered after you call the renewToken method to update the token, to notify the update result.
   *
   * @param token The updated token.
   * @param code Error code. See RenewTokenErrorCode.
   */
  onRenewTokenResult?(
    connection: RtcConnection,
    token: string,
    code: RenewTokenErrorCode
  ): void;
}

/**
 * @ignore
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
 * Video effect node types.
 *
 * Since Available since v4.6.2.
 */
export enum VideoEffectNodeId {
  /**
   * (1): Beauty effect node.
   */
  Beauty = 1 << 0,
  /**
   * (2): Style makeup effect node.
   */
  StyleMakeup = 1 << 1,
  /**
   * (4): Filter effect node.
   */
  Filter = 1 << 2,
}

/**
 * Action types performed on video effect nodes.
 *
 * Since Available since v4.6.2.
 */
export enum VideoEffectAction {
  /**
   * (1): Save the current parameters of the video effect.
   */
  Save = 1,
  /**
   * (2): Reset the video effect to default parameters.
   */
  Reset = 2,
}

/**
 * Used to manage and configure video effects such as beautification, styled makeup, and filters.
 *
 * Since Available since v4.6.2.
 */
export abstract class IVideoEffectObject {
  /**
   * Adds or updates the effect of the specified video effect node and template.
   *
   * Since Added since v4.6.2. Priority rules:
   *  Style makeup nodes take precedence over filter effect nodes.
   *  To apply filter effects, you must first remove the style makeup effect node.
   *
   * @param nodeId The unique identifier or combination of identifiers of the video effect node. See VideoEffectNodeId.
   * @param templateName The name of the effect template. If set to NULL or an empty string, the SDK loads the default configuration from the resource package.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract addOrUpdateVideoEffect(nodeId: number, templateName: string): number;

  /**
   * Removes the video effect with the specified node ID.
   *
   * Since Added since v4.6.2.
   *
   * @param nodeId The unique identifier of the video effect node to be removed. See VideoEffectNodeId.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract removeVideoEffect(nodeId: number): number;

  /**
   * Performs an action on the specified video effect node.
   *
   * Since Added since v4.6.2.
   *
   * @param nodeId The unique identifier of the video effect node.
   * @param actionId The action to perform. See VideoEffectAction.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract performVideoEffectAction(
    nodeId: number,
    actionId: VideoEffectAction
  ): number;

  /**
   * Sets a float parameter for the video effect.
   *
   * Since Available since v4.6.2.
   *
   * @param option The category of the parameter option.
   * @param key The key name of the parameter.
   * @param param The float value to set.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setVideoEffectFloatParam(
    option: string,
    key: string,
    param: number
  ): number;

  /**
   * setVideoEffectIntParam : Sets an integer parameter for the video effect.
   *
   * Since Available since v4.6.2.
   *
   * @param option The category of the parameter option.
   * @param key The key name of the parameter.
   * @param param The integer value to set.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setVideoEffectIntParam(
    option: string,
    key: string,
    param: number
  ): number;

  /**
   * Sets a boolean parameter for the video effect.
   *
   * Since Available since v4.6.2.
   *
   * @param option The category of the parameter option.
   * @param key The key name of the parameter.
   * @param param The boolean value to set: true : Enable the option. false : Disable the option.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setVideoEffectBoolParam(
    option: string,
    key: string,
    param: boolean
  ): number;

  /**
   * Gets the value of the specified float parameter in the video effect.
   *
   * Since Available since v4.6.2.
   *
   * @param option The category of the parameter option.
   * @param key The key name of the parameter.
   *
   * @returns
   * If the parameter exists, returns the corresponding float value.
   *  If the parameter does not exist or an error occurs, returns 0.0f.
   */
  abstract getVideoEffectFloatParam(option: string, key: string): number;

  /**
   * Gets the integer parameter in the video effect.
   *
   * Since Available since v4.6.2.
   *
   * @param option The category of the parameter option.
   * @param key The key name of the parameter.
   *
   * @returns
   * If the parameter exists, returns the corresponding integer value.
   *  If the parameter does not exist or an error occurs, returns 0.
   */
  abstract getVideoEffectIntParam(option: string, key: string): number;

  /**
   * Gets the boolean parameter in the video effect.
   *
   * Since Available since v4.6.2.
   *
   * @param option The category of the parameter option.
   * @param key The key name of the parameter.
   *
   * @returns
   * true : The parameter is enabled. false : The parameter is not enabled or does not exist.
   */
  abstract getVideoEffectBoolParam(option: string, key: string): boolean;
}

/**
 * Defines RtcEngineContext.
 */
export class RtcEngineContext {
  /**
   * The App ID issued by Agora to the App developer. Only apps using the same App ID can join the same channel for communication or live streaming. An App ID can only be used to create one IRtcEngine. To change the App ID, you must first call release to destroy the current IRtcEngine and then recreate it.
   */
  appId?: string;
  /**
   * The channel profile. See ChannelProfileType.
   */
  channelProfile?: ChannelProfileType;
  /**
   * @ignore
   */
  license?: string;
  /**
   * The audio scenario. Different audio scenarios use different volume types.
   * See AudioScenarioType.
   */
  audioScenario?: AudioScenarioType;
  /**
   * The region for connecting to the server. This is an advanced setting for scenarios with access security requirements. Supported regions are listed in AreaCode. Bitwise operations are supported for region codes.
   */
  areaCode?: number;
  /**
   * Sets the log files output by the SDK. See LogConfig.
   * By default, the SDK generates 5 SDK log files and 5 API call log files, with the following rules:
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
  /**
   * Whether to enable domain restriction: true : Enables domain restriction. This setting is applicable when IoT devices access the network using IoT SIM cards. The SDK connects only to servers on the domain or IP whitelist reported to the carrier. false : (Default) Disables domain restriction. This setting is suitable for most common scenarios.
   */
  domainLimit?: boolean;
  /**
   * Whether to automatically register Agora extensions when initializing IRtcEngine : true : (Default) Automatically registers Agora extensions when initializing IRtcEngine. false : Does not register Agora extensions when initializing IRtcEngine. You need to call enableExtension to register the Agora extensions.
   */
  autoRegisterAgoraExtensions?: boolean;
}

/**
 * The Metadata type of the observer. Currently only video-type Metadata is supported.
 */
export enum MetadataType {
  /**
   * -1: Unknown Metadata type.
   */
  UnknownMetadata = -1,
  /**
   * 0: Metadata type is video.
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
   * Channel name.
   */
  channelId?: string;
  /**
   * User ID.
   *  For receivers: The ID of the remote user who sent this Metadata.
   *  For senders: Ignore this field.
   */
  uid?: number;
  /**
   * Buffer size of the received or sent Metadata.
   */
  size?: number;
  /**
   * Buffer address of the received Metadata.
   */
  buffer?: Uint8Array;
  /**
   * Timestamp of the sent Metadata, in milliseconds.
   */
  timeStampMs?: number;
}

/**
 * Metadata observer.
 */
export interface IMetadataObserver {
  /**
   * The receiver has received metadata.
   *
   * @param metadata The received metadata. See Metadata.
   */
  onMetadataReceived?(metadata: Metadata): void;
}

/**
 * Reason for CDN streaming state change.
 *
 * Deprecated Deprecated since v4.6.2.
 */
export enum DirectCdnStreamingReason {
  /**
   * 0: Streaming state is normal.
   */
  DirectCdnStreamingReasonOk = 0,
  /**
   * 1: General error with no specific reason. You can try restarting the stream.
   */
  DirectCdnStreamingReasonFailed = 1,
  /**
   * 2: Error in audio streaming. For example, the local audio capture device is not working properly, is occupied by another process, or lacks permission.
   */
  DirectCdnStreamingReasonAudioPublication = 2,
  /**
   * 3: Error in video streaming. For example, the local video capture device is not working properly, is occupied by another process, or lacks permission.
   */
  DirectCdnStreamingReasonVideoPublication = 3,
  /**
   * 4: Failed to connect to CDN.
   */
  DirectCdnStreamingReasonNetConnect = 4,
  /**
   * 5: The URL is already used for streaming. Please use a new URL.
   */
  DirectCdnStreamingReasonBadName = 5,
}

/**
 * Current CDN streaming state.
 *
 * Deprecated Deprecated since v4.6.2.
 */
export enum DirectCdnStreamingState {
  /**
   * 0: Initial state, streaming has not started yet.
   */
  DirectCdnStreamingStateIdle = 0,
  /**
   * 1: Streaming in progress. When you call startDirectCdnStreaming and the streaming starts successfully, the SDK returns this value.
   */
  DirectCdnStreamingStateRunning = 1,
  /**
   * 2: Streaming has ended normally. When you call stopDirectCdnStreaming to stop streaming manually, the SDK returns this value.
   */
  DirectCdnStreamingStateStopped = 2,
  /**
   * 3: Streaming failed. You can troubleshoot the issue using the information reported in the onDirectCdnStreamingStateChanged callback, then restart streaming.
   */
  DirectCdnStreamingStateFailed = 3,
  /**
   * 4: Attempting to reconnect to the Agora server and CDN. The SDK tries to reconnect up to 10 times. If reconnection still fails, the streaming state changes to DirectCdnStreamingStateFailed.
   */
  DirectCdnStreamingStateRecovering = 4,
}

/**
 * Current CDN streaming statistics.
 *
 * Deprecated Deprecated since v4.6.2.
 */
export class DirectCdnStreamingStats {
  /**
   * Video width (px).
   */
  videoWidth?: number;
  /**
   * Video height (px).
   */
  videoHeight?: number;
  /**
   * Current video frame rate (fps).
   */
  fps?: number;
  /**
   * Current video bitrate (bps).
   */
  videoBitrate?: number;
  /**
   * Current audio bitrate (bps).
   */
  audioBitrate?: number;
}

/**
 * The IDirectCdnStreamingEventHandler interface class is used by the SDK to send CDN streaming event notifications to the App. The App obtains SDK event notifications by inheriting methods of this interface class.
 */
export interface IDirectCdnStreamingEventHandler {
  /**
   * Callback when the CDN streaming state changes.
   *
   * After the host starts direct CDN streaming, when the streaming state changes, the SDK triggers this callback to report the new state, error code, and message. You can use this information to troubleshoot.
   *
   * @param state The current streaming state. See DirectCdnStreamingState.
   * @param reason The reason for the change in streaming state. See DirectCdnStreamingReason.
   * @param message The message corresponding to the state change.
   */
  onDirectCdnStreamingStateChanged?(
    state: DirectCdnStreamingState,
    reason: DirectCdnStreamingReason,
    message: string
  ): void;

  /**
   * Callback for CDN streaming statistics.
   *
   * During the process of pushing streams directly to CDN by the host, the SDK triggers this callback every second.
   *
   * @param stats Current streaming statistics. See DirectCdnStreamingStats.
   */
  onDirectCdnStreamingStats?(stats: DirectCdnStreamingStats): void;
}

/**
 * Media options for the host.
 *
 * Deprecated Deprecated since v4.6.2.
 */
export class DirectCdnStreamingMediaOptions {
  /**
   * Whether to publish video captured by the camera. true : Publish camera video. false : (Default) Do not publish camera video.
   */
  publishCameraTrack?: boolean;
  /**
   * Whether to publish audio captured by the microphone. true : Publish microphone audio. false : (Default) Do not publish microphone audio.
   */
  publishMicrophoneTrack?: boolean;
  /**
   * Whether to publish custom captured audio. true : Publish custom audio. false : (Default) Do not publish custom audio.
   */
  publishCustomAudioTrack?: boolean;
  /**
   * Whether to publish custom captured video. true : Publish custom video. false : (Default) Do not publish custom video.
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
   * The video track ID returned by the createCustomVideoTrack method. Default is 0.
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
 * The base interface class of the RTC SDK that implements the main functions of real-time audio and video.
 *
 * IRtcEngine provides the main methods for the App to call.
 * Before calling other APIs, you must first call createAgoraRtcEngine to create an IRtcEngine object.
 */
export abstract class IRtcEngine {
  /**
   * Creates and initializes IRtcEngine.
   *
   * All interface functions of the IRtcEngine class, unless otherwise specified, are asynchronous. It is recommended to call them on the same thread.
   * The SDK only supports creating one IRtcEngine instance per App.
   *
   * @param context Configuration for the IRtcEngine instance. See RtcEngineContext.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails.
   *  -1: General error (not specifically classified).
   *  -2: Invalid parameter set.
   *  -7: SDK initialization failed.
   *  -22: Resource allocation failed. This error is returned when the App uses too many resources or system resources are exhausted.
   *  -101: Invalid App ID.
   */
  abstract initialize(context: RtcEngineContext): number;

  /**
   * Gets the SDK version.
   *
   * @returns
   * SDKBuildInfo object.
   */
  abstract getVersion(): SDKBuildInfo;

  /**
   * Gets the warning or error description.
   *
   * @param code The error code reported by the SDK.
   *
   * @returns
   * The specific error description.
   */
  abstract getErrorDescription(code: number): string;

  /**
   * Queries the video codec capabilities supported by the SDK.
   *
   * @returns
   * If the call succeeds, returns an object with the following properties: codecInfo : An array of CodecCapInfo, representing the SDK's video encoding capabilities. size : The size of the CodecCapInfo array.
   *  If the call times out, modify your logic to avoid calling this method on the main thread.
   */
  abstract queryCodecCapability(): { codecInfo: CodecCapInfo[]; size: number };

  /**
   * Queries the device score level.
   *
   * @returns
   * > 0: Success. The value is the current device score, ranging from [0,100]. A higher value indicates stronger device capability. Most device scores range from 60 to 100.
   *  < 0: Failure.
   */
  abstract queryDeviceScore(): number;

  /**
   * Preloads a channel using token, channelId, and uid.
   *
   * Calling this method reduces the time it takes for a viewer to join a channel when frequently switching channels, thereby shortening the time to hear the host's first audio frame and see the first video frame, improving the viewer's video experience.
   * If the channel has already been preloaded successfully, and the viewer leaves and rejoins the channel, as long as the Token used during preload is still valid, there is no need to preload again. If preload fails, it does not affect normal channel joining or increase the join time.
   *  When calling this method, ensure the user role is set to audience and the audio scenario is not AudioScenarioChorus, otherwise preload will not take effect.
   *  Ensure the channel name, user ID, and Token passed during preload match those used when joining the channel, otherwise preload will not take effect.
   *  A single IRtcEngine instance supports up to 20 preloaded channels. If exceeded, only the latest 20 preloaded channels are effective.
   *
   * @param token A dynamic key generated on your server for authentication. See [Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   * When the Token expires, depending on the number of preloaded channels, you can provide a new Token in different ways:
   *  For one preloaded channel: call this method again with the new Token.
   *  For multiple preloaded channels:
   *  If using a wildcard Token, call updatePreloadChannelToken to update the Token for all preloaded channels. When generating a wildcard Token, the user ID must not be 0. See [Using Wildcard Token](https://doc.shengwang.cn/doc/rtc/rn/best-practice/wildcard-token).
   *  If using different Tokens: call this method with the user ID, channel name, and the updated Token.
   * @param channelId The name of the channel to preload. This parameter identifies the channel for real-time audio and video interaction. Users with the same App ID and channel name join the same channel.
   * This parameter must be a string no longer than 64 bytes. Supported character set (89 characters total):
   *  26 lowercase letters a~z
   *  26 uppercase letters A~Z
   *  10 digits 0~9
   *  "!" "#" "$" "%" "&" "(" ")" "+" "-" ":" ";" "<" "=" "." ">" "?" "@" "[" "]" "^" "_" "{" "}" "|" "~" ","
   * @param uid User ID. This parameter identifies the user in the real-time audio and video channel. You must set and manage the user ID yourself and ensure uniqueness within the channel. This parameter is a 32-bit unsigned integer. Recommended range: 1 to 2^32-1. If not specified (i.e., set to 0), the SDK automatically assigns one and returns it in the onJoinChannelSuccess callback. The application must store and manage this value; the SDK does not manage it.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -7: IRtcEngine is not initialized. Initialize IRtcEngine before calling this method.
   *  -102: Invalid channel name. Provide a valid channel name and rejoin the channel.
   */
  abstract preloadChannel(
    token: string,
    channelId: string,
    uid: number
  ): number;

  /**
   * Preloads a channel using token, channelId, and userAccount.
   *
   * Calling this method can reduce the time it takes for a viewer to join a channel when frequently switching channels, thereby shortening the time to hear the first audio frame and see the first video frame from the host, and improving the video experience for viewers.
   * If the channel has already been successfully preloaded, and the viewer leaves and rejoins the channel, as long as the token used during preloading is still valid, there is no need to preload it again. If preloading fails, it does not affect the subsequent normal channel join process, nor does it increase the time to join the channel.
   *  When calling this method, make sure the user role is set to audience and the audio scenario is not set to AudioScenarioChorus, otherwise preloading will not take effect.
   *  Make sure the channelId, userAccount, and token passed during preloading are the same as those used when joining the channel later; otherwise, preloading will not take effect.
   *  Currently, one IRtcEngine instance supports preloading up to 20 channels. If this limit is exceeded, only the latest 20 preloaded channels take effect.
   *
   * @param token A dynamic key generated on your server for authentication. See [Use Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   * When the token expires, depending on the number of preloaded channels, you can pass a new token in different ways:
   *  For a single preloaded channel: call this method to pass the new token.
   *  For multiple preloaded channels:
   *  If you use a wildcard token, call updatePreloadChannelToken to update the token for all preloaded channels. When generating a wildcard token, the user ID must not be 0. See [Use Wildcard Token](https://doc.shengwang.cn/doc/rtc/rn/best-practice/wildcard-token).
   *  If you use different tokens: call this method and pass your user ID, corresponding channel name, and the updated token.
   * @param channelId The name of the channel to preload. This parameter identifies the channel for real-time audio and video interaction. Under the same App ID, users with the same channel name will join the same channel for interaction.
   * This parameter must be a string within 64 bytes. The supported character set includes 89 characters:
   *  26 lowercase English letters a~z
   *  26 uppercase English letters A~Z
   *  10 digits 0~9
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param userAccount The user's User Account. This parameter identifies the user in the real-time audio and video interaction channel. You need to set and manage the User Account yourself and ensure that each user in the same channel has a unique User Account. This parameter is required, must not exceed 255 bytes, and cannot be null. The supported character set includes 89 characters:
   *  26 lowercase English letters a-z
   *  26 uppercase English letters A-Z
   *  10 digits 0-9
   *  space
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter. For example, the User Account is empty. You need to provide valid parameters and rejoin the channel.
   *  -7: The IRtcEngine object is not initialized. You need to initialize the IRtcEngine object successfully before calling this method.
   *  -102: Invalid channel name. You need to provide a valid channel name and rejoin the channel.
   */
  abstract preloadChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string
  ): number;

  /**
   * Updates the wildcard token for the preloaded channel.
   *
   * You need to manage the lifecycle of the wildcard token yourself. When the wildcard token expires, you need to generate a new one on your server and pass it in through this method.
   *
   * @param token The new token.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The passed parameter is invalid. For example, an illegal token is used. You need to provide valid parameters and rejoin the channel.
   *  -7: The IRtcEngine object is not initialized. You need to initialize the IRtcEngine object before calling this method.
   */
  abstract updatePreloadChannelToken(token: string): number;

  /**
   * Sets media options and joins a channel.
   *
   * This method allows you to set media options when joining a channel, such as whether to publish audio and video streams in the channel. When a user joins a channel, whether to automatically subscribe to all remote audio and video streams in the channel. By default, the user subscribes to all other users' audio and video streams in the channel, which results in usage and affects billing. If you want to unsubscribe, you can do so by setting the options parameter or using the corresponding mute methods.
   *  This method only supports joining one channel at a time.
   *  Apps with different App IDs cannot communicate with each other.
   *  Before joining a channel, make sure the App ID used to generate the Token is the same as the one used in the initialize method to initialize the engine, otherwise joining the channel with the Token will fail.
   *
   * @param token A dynamic key generated on your server for authentication. See [Use Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   *  (Recommended) If your project enables the security mode, i.e., uses APP ID + Token for authentication, this parameter is required.
   *  If your project only enables debug mode, i.e., uses only the APP ID for authentication, you can join the channel without a Token. The user will automatically leave the channel 24 hours after successfully joining.
   *  If you need to join multiple channels simultaneously or switch channels frequently, Agora recommends using a wildcard Token to avoid requesting a new Token from the server each time. See [Use Wildcard Token](https://doc.shengwang.cn/doc/rtc/rn/best-practice/wildcard-token).
   * @param channelId Channel name. This parameter identifies the channel for real-time audio and video interaction. Users with the same App ID and channel name will join the same channel. This parameter is a string of up to 64 bytes. Supported character set (89 characters total):
   *  26 lowercase English letters a~z
   *  26 uppercase English letters A~Z
   *  10 digits 0~9
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param uid User ID. This parameter identifies the user in the real-time audio and video interaction channel. You must set and manage the user ID yourself and ensure it is unique within the same channel. This parameter is a 32-bit unsigned integer. Recommended range: 1 to 2^32-1. If not specified (i.e., set to 0), the SDK automatically assigns one and returns it in the onJoinChannelSuccess callback. The application must remember and maintain this value; the SDK does not maintain it.
   * @param options Channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter. For example, an invalid Token is used, uid is not an integer, or a ChannelMediaOptions member is invalid. You need to provide valid parameters and rejoin the channel.
   *  -3: IRtcEngine object initialization failed. You need to reinitialize the IRtcEngine object.
   *  -7: IRtcEngine object is not initialized. You must initialize the IRtcEngine object before calling this method.
   *  -8: Internal state error of the IRtcEngine object. Possible reason: startEchoTest was called to start an echo test, but stopEchoTest was not called before calling this method. You must call stopEchoTest before this method.
   *  -17: Join channel request is rejected. Possible reason: the user is already in the channel. Use the onConnectionStateChanged callback to check if the user is in the channel. Do not call this method again unless you receive the ConnectionStateDisconnected (1) state.
   *  -102: Invalid channel name. You must provide a valid channel name in channelId and rejoin the channel.
   *  -121: Invalid user ID. You must provide a valid user ID in uid and rejoin the channel.
   */
  abstract joinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number;

  /**
   * Updates the channel media options after joining a channel.
   *
   * @param options The channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The value of a ChannelMediaOptions member is invalid. For example, an illegal token is used or an invalid user role is set. You need to provide valid parameters.
   *  -7: The IRtcEngine object is not initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is incorrect. A possible reason is that the user is not in a channel. It is recommended to determine whether the user is in a channel through the onConnectionStateChanged callback. If you receive ConnectionStateDisconnected (1) or ConnectionStateFailed (5), it means the user is not in a channel. You need to call joinChannel before calling this method.
   */
  abstract updateChannelMediaOptions(options: ChannelMediaOptions): number;

  /**
   * Sets channel options and leaves the channel.
   *
   * After calling this method, the SDK stops all audio and video interactions, leaves the current channel, and releases all session-related resources.
   * You must call this method after successfully joining a channel to end the call; otherwise, you cannot start a new call. If you have joined multiple channels using joinChannelEx, calling this method leaves all joined channels. This method is asynchronous. When the call returns, the channel has not actually been left.
   * If you call release immediately after this method, the SDK will not trigger the onLeaveChannel callback.
   *
   * @param options Options for leaving the channel. See LeaveChannelOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract leaveChannel(options?: LeaveChannelOptions): number;

  /**
   * Renews the token.
   *
   * This method is used to renew the token. The token will expire after a certain period, after which the SDK will not be able to connect to the server.
   *
   * @param token The newly generated token.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter. For example, the token is empty.
   *  -7: The IRtcEngine object is not initialized. You need to initialize the IRtcEngine object successfully before calling this method.
   *  -110: Invalid token. Make sure:
   *  The user ID specified when generating the token matches the one used to join the channel,
   *  The generated token matches the one used to join the channel.
   */
  abstract renewToken(token: string): number;

  /**
   * Sets the channel profile.
   *
   * You can call this method to set the channel profile. The SDK uses different optimization strategies for different scenarios. For example, in the live streaming scenario, it prioritizes video quality. The default channel profile after SDK initialization is live streaming. Under different channel profiles, the SDK uses different default audio routes. See the description in setDefaultAudioRouteToSpeakerphone.
   * To ensure real-time audio and video quality, all users in the same channel must use the same channel profile.
   *
   * @param profile The channel profile. See ChannelProfileType.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter.
   *  -7: The SDK is not initialized.
   */
  abstract setChannelProfile(profile: ChannelProfileType): number;

  /**
   * Sets the user role and audience latency level in a live streaming scenario.
   *
   * By default, the SDK sets the user role to audience. You can call this method to set the user role to broadcaster. The user role (role) determines the user's permissions at the SDK level, such as whether they can publish streams. When the user role is set to broadcaster, the audience latency level only supports AudienceLatencyLevelUltraLowLatency (ultra-low latency).
   * If you call this method before joining the channel and set role to BROADCASTER, the local onClientRoleChanged callback is not triggered.
   *
   * @param role The user role. See ClientRoleType. Users with the audience role cannot publish audio or video streams in the channel. When publishing in a live streaming scenario, ensure the user role is switched to broadcaster.
   * @param options User-specific settings, including user level. See ClientRoleOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -1: General error (not categorized).
   *  -2: Invalid parameter.
   *  -5: The call was rejected.
   *  -7: The SDK is not initialized.
   */
  abstract setClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): number;

  /**
   * Starts an audio and video call loopback test.
   *
   * To test whether local audio/video sending and receiving are functioning properly, you can call this method to start an audio and video call loopback test, which checks whether the system's audio/video devices and the user's uplink/downlink network are working correctly.
   * After the test starts, the user should speak or face the camera. The audio or video will play back after about 2 seconds. If audio plays back normally, it means the system audio devices and network are working. If video plays back normally, it means the system video devices and network are working.
   *  When calling this method in a channel, ensure no audio/video streams are being published.
   *  After calling this method, you must call stopEchoTest to end the test. Otherwise, the user cannot perform another loopback test or join a channel.
   *  In live streaming scenarios, only the host can call this method.
   *
   * @param config Configuration for the audio and video call loopback test. See EchoTestConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startEchoTest(config: EchoTestConfiguration): number;

  /**
   * Stops the audio call loopback test.
   *
   * After calling startEchoTest, you must call this method to end the test. Otherwise, the user will not be able to perform the next audio/video call loopback test or join a channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -5(ERR_REFUSED): Failed to stop the test. The test may not be running.
   */
  abstract stopEchoTest(): number;

  /**
   * Enables or disables multi-camera capture.
   *
   * In scenarios where video is already being captured by a camera, Agora recommends the following steps to implement multi-camera capture and video publishing:
   *  Call this method to enable multi-camera capture.
   *  Call startPreview to start local video preview.
   *  Call startCameraCapture and set sourceType to specify the second camera to start capturing.
   *  Call joinChannelEx and set publishSecondaryCameraTrack to true to publish the video stream from the second camera in the channel. To disable multi-camera capture, refer to the following steps:
   *  Call stopCameraCapture.
   *  Call this method and set enabled to false. This method is for iOS only. When using multi-camera video capture, ensure the system version is 13.0 or above. The minimum supported iOS device models for multi-camera capture are:
   *  iPhone XR
   *  iPhone XS
   *  iPhone XS Max
   *  iPad Pro (3rd generation and later) You can call this method before or after startPreview to enable multi-camera capture:
   *  If called before startPreview, the local video preview will display the images captured by both cameras.
   *  If called after startPreview, the SDK will first stop the current camera capture, then start both the original and second cameras. The local video preview will briefly go black and then automatically recover.
   *
   * @param enabled Whether to enable multi-camera video capture mode: true : Enable multi-camera capture mode. The SDK uses multiple cameras to capture video. false : Disable multi-camera capture mode. The SDK uses only a single camera to capture video.
   * @param config Capture configuration for the second camera. See CameraCapturerConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableMultiCamera(
    enabled: boolean,
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Enables the video module.
   *
   * The video module is disabled by default and needs to be enabled by calling this method. To disable the video module later, call the disableVideo method.
   *  This method sets the internal engine to the enabled state and remains effective after leaving the channel.
   *  Calling this method resets the entire engine and has a relatively slow response time. Depending on your needs, you can use the following methods to independently control specific video module functions: enableLocalVideo : Whether to start camera capture and create a local video stream. muteLocalVideoStream : Whether to publish the local video stream. muteRemoteVideoStream : Whether to receive and play remote video streams. muteAllRemoteVideoStreams : Whether to receive and play all remote video streams.
   *  When called in a channel, this method resets the settings of enableLocalVideo, muteRemoteVideoStream, and muteAllRemoteVideoStreams, so use with caution.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableVideo(): number;

  /**
   * Disables the video module.
   *
   * This method disables the video module.
   *  This method sets the internal engine to a disabled state and remains effective after leaving the channel.
   *  Calling this method resets the entire engine and may take longer to respond. You can use the following methods to control specific video module features as needed: enableLocalVideo : Whether to enable camera capture and create a local video stream. muteLocalVideoStream : Whether to publish the local video stream. muteRemoteVideoStream : Whether to receive and play the remote video stream. muteAllRemoteVideoStreams : Whether to receive and play all remote video streams.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract disableVideo(): number;

  /**
   * Starts video preview and specifies the video source for preview.
   *
   * This method starts local video preview and specifies the video source to appear in the preview.
   *  Local preview enables mirror mode by default.
   *  After leaving the channel, the local preview remains active. You need to call stopPreview to stop the local preview.
   *
   * @param sourceType The type of video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startPreview(sourceType?: VideoSourceType): number;

  /**
   * Stops video preview.
   *
   * @param sourceType The type of video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopPreview(sourceType?: VideoSourceType): number;

  /**
   * Starts a last-mile network probe test before a call.
   *
   * Starts a last-mile network probe test before a call to provide feedback on uplink and downlink bandwidth, packet loss, jitter, and round-trip time.
   *
   * @param config Configuration for the last-mile network probe. See LastmileProbeConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startLastmileProbeTest(config: LastmileProbeConfig): number;

  /**
   * Stops the last mile network probe test before a call.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopLastmileProbeTest(): number;

  /**
   * Sets video encoding properties.
   *
   * Sets the encoding properties for local video. Each video encoding configuration corresponds to a series of video-related parameter settings, including resolution, frame rate, and bitrate.
   *  The config parameter of this method sets the maximum values achievable under ideal network conditions. If the network is poor, the video engine will not use this config to render local video and will automatically downgrade to suitable video parameters.
   *
   * @param config Video encoding parameter configuration. See VideoEncoderConfiguration.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * Sets beauty effect options.
   *
   * Enables the local beauty effect and sets the beauty effect options.
   *  This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will prevent the feature from working properly.
   *  This feature has high performance requirements. When calling this method, the SDK automatically checks the current device capability.
   *
   * @param enabled Whether to enable the beauty effect: true : Enable the beauty effect. false : (default) Disable the beauty effect.
   * @param options Beauty options. See BeautyOptions for details.
   * @param type The media source type to apply the effect to. See MediaSourceType. This method only supports the following two settings:
   *  For local video captured by the camera, keep the default value PrimaryCameraSource.
   *  For custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -4: The current device does not support this feature. Possible reasons:
   *  The device does not meet the performance requirements for beauty effects. Consider using a higher-performance device.
   *  The device runs a version lower than Android 5.0, which does not support this operation. Consider upgrading the OS or using a different device.
   */
  abstract setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Sets face shaping effect options and specifies the media source.
   *
   * Call this method to apply preset parameters for facial modifications such as face slimming, eye enlargement, and nose slimming in one go, and to adjust the overall intensity of the effects. Face shaping is a value-added service. For billing details, see [Billing Strategy](https://doc.shengwang.cn/doc/rtc/android/billing/billing-strategy).
   *  On Android, this method is only supported on Android 4.4 and above.
   *  This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will cause the feature to fail.
   *  This feature has high performance requirements. When calling this method, the SDK automatically checks the capabilities of the current device.
   *
   * @param enabled Whether to enable face shaping effects: true : Enable face shaping. false : (Default) Disable face shaping.
   * @param options Face shaping style options. See FaceShapeBeautyOptions.
   * @param type The media source type to which the effect is applied. See MediaSourceType. In this method, only the following two settings are supported:
   *  When using the camera to capture local video, keep the default value PrimaryCameraSource.
   *  To use custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -4: The current device does not support this feature. Possible reasons include:
   *  The device does not meet the performance requirements for beauty effects. Consider using a higher-performance device.
   *  The device runs a version lower than Android 4.4, which is not supported. Consider upgrading the OS or changing the device.
   */
  abstract setFaceShapeBeautyOptions(
    enabled: boolean,
    options: FaceShapeBeautyOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Sets face shape area options and specifies the media source.
   *
   * If the preset face shaping effects implemented in the setFaceShapeBeautyOptions method do not meet your expectations, you can use this method to set face shape area options to fine-tune individual facial features for more refined face shaping effects. Face shaping is a value-added service. For billing details, see [Billing Strategy](https://doc.shengwang.cn/doc/rtc/android/billing/billing-strategy).
   *  On Android, this method is only supported on Android 4.4 and above.
   *  This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will cause the feature to fail.
   *  This feature has high performance requirements. When calling this method, the SDK automatically checks the capabilities of the current device.
   *
   * @param options Face shape area options. See FaceShapeAreaOptions.
   * @param type The media source type to which the effect is applied. See MediaSourceType. In this method, only the following two settings are supported:
   *  When using the camera to capture local video, keep the default value PrimaryCameraSource.
   *  To use custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -4: The current device does not support this feature. Possible reasons include:
   *  The device does not meet the performance requirements for beauty effects. Consider using a higher-performance device.
   *  The device runs a version lower than Android 4.4, which is not supported. Consider upgrading the OS or changing the device.
   */
  abstract setFaceShapeAreaOptions(
    options: FaceShapeAreaOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Gets face beauty effect options.
   *
   * Call this method to get the current parameter settings of the face beauty effect.
   *
   * @param type The media source type to apply the effect to. See MediaSourceType. This method only supports the following two settings:
   *  For local video captured by the camera, keep the default value PrimaryCameraSource.
   *  For custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * If the method call succeeds, returns a FaceShapeBeautyOptions object.
   *  If the method call fails, returns null.
   */
  abstract getFaceShapeBeautyOptions(
    type?: MediaSourceType
  ): FaceShapeBeautyOptions;

  /**
   * Gets face shaping area options.
   *
   * Call this method to get the current parameter settings of a face shaping area.
   *
   * @param shapeArea The face shaping area. See FaceShapeArea.
   * @param type The media source type to apply the effect to. See MediaSourceType. This method only supports the following two settings:
   *  For local video captured by the camera, keep the default value PrimaryCameraSource.
   *  For custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * If the method call succeeds, returns a FaceShapeAreaOptions object.
   *  If the method call fails, returns null.
   */
  abstract getFaceShapeAreaOptions(
    shapeArea: FaceShapeArea,
    type?: MediaSourceType
  ): FaceShapeAreaOptions;

  /**
   * Sets filter effect options and specifies the media source.
   *
   * This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will cause the feature to fail.
   *  This feature has high performance requirements. When calling this method, the SDK automatically checks the capabilities of the current device.
   *
   * @param enabled Whether to enable filter effects: true : Enable filter effects. false : (Default) Disable filter effects.
   * @param options Filter options. See FilterEffectOptions.
   * @param type The media source type to which the effect is applied. See MediaSourceType. In this method, only the following two settings are supported:
   *  When using the camera to capture local video, keep the default value PrimaryCameraSource.
   *  To use custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setFilterEffectOptions(
    enabled: boolean,
    options: FilterEffectOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Creates an IVideoEffectObject video effect object.
   *
   * Since Available since v4.6.2.
   *
   * @param bundlePath The path to the video effect resource bundle.
   * @param type The media source type. See MediaSourceType.
   *
   * @returns
   * The IVideoEffectObject object, if the method call succeeds. See IVideoEffectObject.
   *  An empty pointer , if the method call fails.
   */
  abstract createVideoEffectObject(
    bundlePath: string,
    type?: MediaSourceType
  ): IVideoEffectObject;

  /**
   * Destroys the video effect object.
   *
   * Since Available since v4.6.2.
   *
   * @param videoEffectObject The video effect object to destroy. See IVideoEffectObject.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract destroyVideoEffectObject(
    videoEffectObject: IVideoEffectObject
  ): number;

  /**
   * Enables low-light enhancement.
   *
   * You can call this method to enable low-light enhancement and configure its effect.
   *  This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will cause the feature to fail.
   *  Low-light enhancement has certain performance requirements. If the device overheats or experiences issues after enabling this feature, consider lowering the enhancement level or disabling the feature.
   *  To achieve high-quality low-light enhancement (LowLightEnhanceLevelHighQuality), you must first call setVideoDenoiserOptions to enable video denoising. The mapping is as follows:
   *  When low-light enhancement is in auto mode (LowLightEnhanceAuto), video denoising must be set to high quality (VideoDenoiserLevelHighQuality) and auto mode (VideoDenoiserAuto).
   *  When low-light enhancement is in manual mode (LowLightEnhanceManual), video denoising must be set to high quality (VideoDenoiserLevelHighQuality) and manual mode (VideoDenoiserManual).
   *
   * @param enabled Whether to enable low-light enhancement: true : Enable low-light enhancement. false : (Default) Disable low-light enhancement.
   * @param options Low-light enhancement options to configure the effect. See LowlightEnhanceOptions.
   * @param type The media source type to which the effect is applied. See MediaSourceType. In this method, only the following two settings are supported:
   *  When using the camera to capture local video, keep the default value PrimaryCameraSource.
   *  To use custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLowlightEnhanceOptions(
    enabled: boolean,
    options: LowlightEnhanceOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Enables video denoising.
   *
   * You can call this method to enable video denoising and configure its effect. If the denoising intensity provided by this method does not meet your needs, Agora recommends using the setBeautyEffectOptions method to enable the skin smoothing feature for better denoising. Recommended BeautyOptions settings for strong denoising: lighteningContrastLevel : LighteningContrastNormal lighteningLevel : 0.0 smoothnessLevel : 0.5 rednessLevel : 0.0 sharpnessLevel : 0.1
   *  This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will cause the feature to fail.
   *  Video denoising has certain performance requirements. If the device overheats or experiences issues after enabling this feature, consider lowering the denoising level or disabling the feature.
   *
   * @param enabled Whether to enable video denoising: true : Enable video denoising. false : (Default) Disable video denoising.
   * @param options Video denoising options to configure the effect. See VideoDenoiserOptions.
   * @param type The media source type to which the effect is applied. See MediaSourceType. In this method, only the following two settings are supported:
   *  When using the camera to capture local video, keep the default value PrimaryCameraSource.
   *  To use custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setVideoDenoiserOptions(
    enabled: boolean,
    options: VideoDenoiserOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Sets color enhancement options.
   *
   * Video captured by the camera may have color distortion. The color enhancement feature intelligently adjusts video characteristics such as saturation and contrast to improve color richness and accuracy, resulting in more vivid video.
   * You can call this method to enable the color enhancement feature and set its effect.
   *  Call this method after enableVideo.
   *  Color enhancement requires certain device performance. If the device overheats or encounters issues after enabling it, consider lowering the enhancement level or disabling the feature.
   *  This method depends on the video enhancement dynamic library libagora_clear_vision_extension.dll. Removing this library will prevent the feature from working properly.
   *
   * @param enabled Whether to enable the color enhancement feature: true : Enable color enhancement. false : (default) Disable color enhancement.
   * @param options Color enhancement options used to set the enhancement effect. See ColorEnhanceOptions.
   * @param type The media source type to apply the effect to. See MediaSourceType. This method only supports the following two settings:
   *  For local video captured by the camera, keep the default value PrimaryCameraSource.
   *  For custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setColorEnhanceOptions(
    enabled: boolean,
    options: ColorEnhanceOptions,
    type?: MediaSourceType
  ): number;

  /**
   * Enables/disables the virtual background.
   *
   * The virtual background feature allows replacing the local user's original background with a static image, dynamic video, blur effect, or separating the portrait from the background to create a picture-in-picture effect. Once enabled successfully, all users in the channel can see the customized background.
   * Call this method after enableVideo or startPreview.
   *  Using a video as the virtual background increases memory usage over time, which may cause the app to crash. To avoid this, reduce the resolution and frame rate of the video.
   *  This feature requires high device performance. The SDK automatically checks the device capability when calling this method. Recommended devices include:
   *  Snapdragon 700 series 750G and above
   *  Snapdragon 800 series 835 and above
   *  Dimensity 700 series 720 and above
   *  Kirin 800 series 810 and above
   *  Kirin 900 series 980 and above
   *  Devices with A9 chip and above:
   *  iPhone 6S and above
   *  iPad Air 3rd generation and above
   *  iPad 5th generation and above
   *  iPad Pro 1st generation and above
   *  iPad mini 5th generation and above
   *  Recommended usage scenarios:
   *  Use a high-definition camera and ensure even lighting.
   *  Few objects in the frame, half-body portrait with minimal occlusion, and a background color distinct from clothing.
   *  This method depends on the virtual background dynamic library libagora_segmentation_extension.dll. Deleting this library will prevent the feature from working.
   *
   * @param enabled Whether to enable virtual background: true : Enable virtual background. false : Disable virtual background.
   * @param backgroundSource Custom background. See VirtualBackgroundSource. To adapt the resolution of the custom background image to the SDK's video capture resolution, the SDK scales and crops the image without distortion.
   * @param segproperty Processing properties of the background image. See SegmentationProperty.
   * @param type Media source type for applying the effect. See MediaSourceType. This parameter only supports the following settings:
   *  For video captured by the camera, use the default PrimaryCameraSource.
   *  For custom captured video, set this parameter to CustomVideoSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -4: Device capability does not meet the requirements for using the virtual background. Consider using a higher-performance device.
   */
  abstract enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type?: MediaSourceType
  ): number;

  /**
   * @ignore
   */
  abstract setupRemoteVideo(canvas: VideoCanvas): number;

  /**
   * @ignore
   */
  abstract setupLocalVideo(canvas: VideoCanvas): number;

  /**
   * Sets the video application scenario.
   *
   * After successfully calling this method to set the video application scenario, the SDK applies best practice strategies based on the specified scenario, automatically adjusting key performance indicators to optimize video experience quality. This method must be called before joining a channel.
   *
   * @param scenarioType Video application scenario. See VideoApplicationScenarioType. ApplicationScenarioMeeting (1) is suitable for meeting scenarios. If the user has called setDualStreamMode to set the low stream to always not send (DisableSimulcastStream), the meeting scenario has no effect on dynamic switching of the low stream.
   * This enum value only applies to broadcaster vs broadcaster scenarios. The SDK enables the following strategies for this scenario:
   *  For high bitrate requirements of low streams in meeting scenarios, multiple weak network resistance technologies are automatically enabled to improve the low stream's resistance and ensure smoothness when subscribing to multiple streams.
   *  Real-time monitoring of the number of subscribers to the high stream, dynamically adjusting high stream configuration:
   *  When no one subscribes to the high stream, bitrate and frame rate are automatically reduced to save upstream bandwidth and consumption.
   *  When someone subscribes to the high stream, it resets to the VideoEncoderConfiguration set by the user's most recent call to setVideoEncoderConfiguration. If not previously set, the following values are used:
   *  Resolution: 960 × 540
   *  Frame rate: 15 fps
   *  Bitrate: 1000 Kbps
   *  Real-time monitoring of the number of subscribers to the low stream, dynamically enabling or disabling the low stream:
   *  When no one subscribes to the low stream, it is automatically disabled to save upstream bandwidth and consumption.
   *  When someone subscribes to the low stream, it is enabled and reset to the SimulcastStreamConfig set by the user's most recent call to setDualStreamMode. If not previously set, the following values are used:
   *  Resolution: 480 × 272
   *  Frame rate: 15 fps
   *  Bitrate: 500 Kbps ApplicationScenario1v1 (2) is suitable for [1v1 video call](https://doc.shengwang.cn/doc/one-to-one-live/android/rtm/overview/product-overview) scenarios. The SDK optimizes strategies for low latency and high video quality, improving performance in image quality, first frame rendering, latency on mid-to-low-end devices, and smoothness under weak networks. ApplicationScenarioLiveshow (3) is suitable for [showroom live streaming](https://doc.shengwang.cn/doc/showroom/android/overview/product-overview) scenarios. For this scenario's high requirements on first frame rendering time and image clarity, the SDK applies optimizations such as enabling audio/video frame accelerated rendering by default to enhance first frame experience (no need to call enableInstantMediaRendering), and enabling B-frames by default to ensure high image quality and transmission efficiency. It also enhances video quality and smoothness under weak networks and on low-end devices.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -1: General error (not specifically categorized).
   *  -4: Setting video scenario is not supported. Possible reason: using an audio-only SDK.
   *  -7: IRtcEngine object is not initialized. You need to initialize the IRtcEngine object successfully before calling this method.
   */
  abstract setVideoScenario(scenarioType: VideoApplicationScenarioType): number;

  /**
   * @ignore
   */
  abstract setVideoQoEPreference(qoePreference: VideoQoePreferenceType): number;

  /**
   * Enables the audio module.
   *
   * The audio module is enabled by default. If you have disabled it using disableAudio, you can call this method to re-enable it.
   *  Calling this method resets the entire engine and has a slower response time. You can use the following methods to control specific audio module functions as needed: enableLocalAudio : Whether to enable microphone capture and create a local audio stream. muteLocalAudioStream : Whether to publish the local audio stream. muteRemoteAudioStream : Whether to receive and play the remote audio stream. muteAllRemoteAudioStreams : Whether to receive and play all remote audio streams.
   *  When called in a channel, this method resets the settings of enableLocalAudio, muteRemoteAudioStream, and muteAllRemoteAudioStreams. Use with caution.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableAudio(): number;

  /**
   * Disables the audio module.
   *
   * The audio module is enabled by default. You can call this method to disable it. This method resets the entire engine and has a slower response time. Therefore, Agora recommends the following methods to control the audio module: enableLocalAudio : Whether to enable microphone capture and create a local audio stream. muteLocalAudioStream : Whether to publish the local audio stream. muteRemoteAudioStream : Whether to receive and play the remote audio stream. muteAllRemoteAudioStreams : Whether to receive and play all remote audio streams.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract disableAudio(): number;

  /**
   * Sets the audio encoding profile and scenario.
   *
   * Due to iOS system limitations, some audio routes cannot be recognized in the communication volume mode. Therefore, if you need to use an external sound card, we recommend setting the audio scenario to the high-quality scenario AudioScenarioGameStreaming (3). In this scenario, the SDK switches to media volume to avoid the issue.
   *
   * @param profile The audio encoding profile, including sample rate, bitrate, encoding mode, and the number of channels. See AudioProfileType.
   * @param scenario The audio scenario. The volume type of the device varies depending on the audio scenario.
   * See AudioScenarioType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setAudioProfile(
    profile: AudioProfileType,
    scenario?: AudioScenarioType
  ): number;

  /**
   * Sets the audio scenario.
   *
   * Due to iOS system limitations, some audio routes cannot be recognized in the communication volume mode. Therefore, if you need to use an external sound card, we recommend setting the audio scenario to the high-quality scenario AudioScenarioGameStreaming (3). In this scenario, the SDK switches to media volume to avoid the issue.
   *
   * @param scenario The audio scenario. The volume type of the device varies depending on the audio scenario.
   * See AudioScenarioType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setAudioScenario(scenario: AudioScenarioType): number;

  /**
   * Enables or disables the local audio capture.
   *
   * When a user joins a channel, the audio function is enabled by default. You can call this method to disable or re-enable the local audio function, that is, to stop or resume local audio capture.
   * The difference between this method and muteLocalAudioStream is: enableLocalAudio : Enables or disables local audio capture and processing. When you disable or enable local capture using enableLocalAudio, there will be a brief interruption in playing remote audio locally. muteLocalAudioStream : Stops or resumes sending the local audio stream without affecting the state of audio capture.
   *
   * @param enabled true : Re-enables the local audio function, that is, starts local audio capture (default); false : Disables the local audio function, that is, stops local audio capture.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableLocalAudio(enabled: boolean): number;

  /**
   * Stops or resumes publishing the local audio stream.
   *
   * This method controls whether to publish the locally captured audio stream. Not publishing the local audio stream does not disable the audio capturing device, so it does not affect the audio capture status.
   *
   * @param mute Whether to stop publishing the local audio stream. true : Stop publishing. false : (Default) Publish.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /**
   * Stops or resumes subscribing to all remote users' audio streams.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to all remote users' audio streams, including those who join the channel after the method is called. By default, the SDK subscribes to all remote users' audio streams upon joining the channel. To change this behavior, set autoSubscribeAudio to false when calling joinChannel.
   * If enableAudio or disableAudio is called after this method, the latter will take effect.
   *
   * @param mute Whether to stop subscribing to all remote users' audio streams: true : Stop subscribing to all remote users' audio streams. false : (Default) Subscribe to all remote users' audio streams.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * Stops or resumes subscribing to the specified remote user's audio stream.
   *
   * @param uid The user ID of the specified user.
   * @param mute Whether to stop subscribing to the specified remote user's audio stream. true : Stop subscribing to the specified user's audio stream. false : (Default) Subscribe to the specified user's audio stream.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  /**
   * Stops or resumes publishing the local video stream.
   *
   * This method controls whether to publish the locally captured video stream. Not publishing the local video stream does not disable the video capturing device, so it does not affect the video capture status.
   * Compared to calling enableLocalVideo(false) to disable video capture and thus stop publishing the local video stream, this method responds faster.
   *
   * @param mute Whether to stop sending the local video stream. true : Stop sending the local video stream. false : (Default) Send the local video stream.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteLocalVideoStream(mute: boolean): number;

  /**
   * Enables or disables local video capture.
   *
   * This method disables or re-enables local video capture without affecting the reception of remote video.
   * After calling enableVideo, local video capture is enabled by default.
   * If you call enableLocalVideo(false) in a channel, it stops local video capture and also stops publishing the video stream in the channel. To re-enable it, call enableLocalVideo(true), then call updateChannelMediaOptions and set the options parameter to publish the locally captured video stream to the channel.
   * After successfully enabling or disabling local video capture, the remote side triggers the onRemoteVideoStateChanged callback.
   *  This method can be called before or after joining a channel, but the settings take effect only after joining the channel.
   *  This method sets the internal engine to the enabled state and remains effective after leaving the channel.
   *
   * @param enabled Whether to enable local video capture. true : (Default) Enables local video capture. false : Disables local video capture. After disabling, remote users will not receive the local user's video stream, but the local user can still receive remote video streams. When set to false, this method does not require a local camera.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableLocalVideo(enabled: boolean): number;

  /**
   * Stops or resumes subscribing to all remote users' video streams.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to all remote users' video streams, including those who join the channel after the method is called. By default, the SDK subscribes to all remote users' video streams upon joining the channel. To change this behavior, set autoSubscribeVideo to false when calling joinChannel.
   * If enableVideo or disableVideo is called after this method, the latter will take effect.
   *
   * @param mute Whether to stop subscribing to all remote users' video streams. true : Stop subscribing to all users' video streams. false : (Default) Subscribe to all users' video streams.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  /**
   * Sets the default video stream type to subscribe to.
   *
   * Depending on the sender's default behavior and the setDualStreamMode settings, the receiver's call to this method results in the following:
   *  By default, the SDK enables adaptive low-quality stream mode (AutoSimulcastStream) on the sender side, meaning the sender only sends the high-quality stream. Only receivers with host role can call this method to request the low-quality stream. Once the sender receives the request, it starts sending the low-quality stream. At this point, all users in the channel can call this method to switch to low-quality stream subscription mode.
   *  If the sender calls setDualStreamMode and sets mode to DisableSimulcastStream (never send low-quality stream), this method has no effect.
   *  If the sender calls setDualStreamMode and sets mode to EnableSimulcastStream (always send low-quality stream), both host and audience receivers can call this method to switch to low-quality stream subscription mode. When receiving the low-quality stream, the SDK dynamically adjusts the video stream size based on the size of the video window to save bandwidth and computing resources. The aspect ratio of the low-quality stream is the same as that of the high-quality stream. Based on the current high-quality stream's aspect ratio, the system automatically assigns the resolution, frame rate, and bitrate for the low-quality stream. If you call both this method and setRemoteVideoStreamType, the SDK uses the settings from setRemoteVideoStreamType.
   *
   * @param streamType The default video stream type to subscribe to: VideoStreamType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Code](https://doc.shengwang.cn/api-ref/rtc/rn/error-code) for details and resolution suggestions.
   */
  abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

  /**
   * Stops or resumes subscribing to the video stream of a specified remote user.
   *
   * @param uid The user ID of the specified remote user.
   * @param mute Whether to stop subscribing to the video stream of the specified remote user. true : Stop subscribing to the video stream of the specified user. false : (Default) Subscribe to the video stream of the specified user.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Code](https://doc.shengwang.cn/api-ref/rtc/rn/error-code) for details and resolution suggestions.
   */
  abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

  /**
   * Sets the video stream type to subscribe to.
   *
   * Depending on the sender's default behavior and the setDualStreamMode settings, the receiver's call to this method results in the following:
   *  By default, the SDK enables adaptive low-quality stream mode (AutoSimulcastStream) on the sender side, meaning the sender only sends the high-quality stream. Only receivers with host role can call this method to request the low-quality stream. Once the sender receives the request, it starts sending the low-quality stream. At this point, all users in the channel can call this method to switch to low-quality stream subscription mode.
   *  If the sender calls setDualStreamMode and sets mode to DisableSimulcastStream (never send low-quality stream), this method has no effect.
   *  If the sender calls setDualStreamMode and sets mode to EnableSimulcastStream (always send low-quality stream), both host and audience receivers can call this method to switch to low-quality stream subscription mode. When receiving the low-quality stream, the SDK dynamically adjusts the video stream size based on the size of the video window to save bandwidth and computing resources. The aspect ratio of the low-quality stream is the same as that of the high-quality stream. Based on the current high-quality stream's aspect ratio, the system automatically assigns the resolution, frame rate, and bitrate for the low-quality stream.
   *  You can call this method either before or after joining a channel.
   *  If you call both this method and setRemoteDefaultVideoStreamType, the SDK uses the settings from this method.
   *
   * @param uid The user ID.
   * @param streamType The video stream type: VideoStreamType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Code](https://doc.shengwang.cn/api-ref/rtc/rn/error-code) for details and resolution suggestions.
   */
  abstract setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): number;

  /**
   * Sets the subscription options for remote video streams.
   *
   * When the remote user sends dual streams, you can call this method to set the subscription options for the remote video stream. The SDK's default subscription behavior for remote video streams depends on the type of registered video observer:
   *  If IVideoFrameObserver is registered, both raw and encoded data are subscribed by default.
   *  If IVideoEncodedFrameObserver is registered, only encoded data is subscribed by default.
   *  If both observers are registered, the default behavior follows the later registered observer. For example, if IVideoFrameObserver is registered later, both raw and encoded data are subscribed by default. If you want to change the default behavior above or set different subscription options for different uid s, you can call this method.
   *
   * @param uid Remote user ID.
   * @param options Subscription settings for the video stream. See VideoSubscriptionOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteVideoSubscriptionOptions(
    uid: number,
    options: VideoSubscriptionOptions
  ): number;

  /**
   * Sets the audio subscription blocklist.
   *
   * You can call this method to specify the audio streams you do not want to subscribe to.
   *  This method can be called before or after joining a channel.
   *  The audio subscription blocklist is not affected by muteRemoteAudioStream, muteAllRemoteAudioStreams, or the autoSubscribeAudio setting in ChannelMediaOptions.
   *  After setting the blocklist, if you leave and rejoin the channel, the blocklist remains effective.
   *  If a user is included in both the audio subscription allowlist and blocklist, only the blocklist takes effect.
   *
   * @param uidList List of user IDs in the subscription blocklist.
   * If you want to exclude a specific user's audio stream from being subscribed to, add that user's ID to this list. To remove a user from the blocklist, call setSubscribeAudioBlocklist again with an updated list that excludes the uid of the user you want to remove.
   * @param uidNumber Number of users in the blocklist.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeAudioBlocklist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * Sets the audio subscription allowlist.
   *
   * You can call this method to specify the audio streams you want to subscribe to.
   *  This method can be called before or after joining a channel.
   *  The audio subscription allowlist is not affected by muteRemoteAudioStream, muteAllRemoteAudioStreams, or the autoSubscribeAudio setting in ChannelMediaOptions.
   *  After setting the allowlist, if you leave and rejoin the channel, the allowlist remains effective.
   *  If a user is included in both the audio subscription allowlist and blocklist, only the blocklist takes effect.
   *
   * @param uidList List of user IDs in the audio subscription allowlist.
   * If you want to subscribe to a specific user's audio stream, add that user's ID to this list. To remove a user from the allowlist, call setSubscribeAudioAllowlist again with an updated list that excludes the uid of the user you want to remove.
   * @param uidNumber Number of users in the allowlist.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeAudioAllowlist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * Sets the video subscription blocklist.
   *
   * You can call this method to specify the video streams you do not want to subscribe to.
   *  You can call this method either before or after joining a channel.
   *  The video subscription blocklist is not affected by muteRemoteVideoStream, muteAllRemoteVideoStreams, or autoSubscribeVideo in ChannelMediaOptions.
   *  After setting the blocklist, if you leave and rejoin the channel, the blocklist remains effective.
   *  If a user is in both the audio subscription blocklist and allowlist, only the blocklist takes effect.
   *
   * @param uidList User ID list of the video subscription blocklist.
   * If you want to exclude a specific user's video stream from being subscribed to, add that user's ID to this list. To remove a user from the blocklist, you need to call the setSubscribeVideoBlocklist method again and update the user ID list to exclude the uid of the user you want to remove.
   * @param uidNumber The number of users in the blocklist.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeVideoBlocklist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * Sets the video subscription allowlist.
   *
   * You can call this method to specify the video streams you want to subscribe to.
   *  You can call this method either before or after joining a channel.
   *  The video subscription allowlist is not affected by muteRemoteVideoStream, muteAllRemoteVideoStreams, or autoSubscribeVideo in ChannelMediaOptions.
   *  After setting the allowlist, if you leave and rejoin the channel, the allowlist remains effective.
   *  If a user is in both the audio subscription blocklist and allowlist, only the blocklist takes effect.
   *
   * @param uidList User ID list of the video subscription allowlist.
   * If you want to subscribe only to a specific user's video stream, add that user's ID to this list. To remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method again and update the video subscription allowlist to exclude the uid of the user you want to remove.
   * @param uidNumber The number of users in the allowlist.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeVideoAllowlist(
    uidList: number[],
    uidNumber: number
  ): number;

  /**
   * Enables audio volume indication.
   *
   * This method allows the SDK to periodically report the volume information of the local user who is sending a stream and up to 3 remote users with the highest instantaneous volume to the app.
   *
   * @param interval Sets the time interval for volume indication:
   *  ≤ 0: Disables the volume indication feature.
   *  > 0: The time interval (ms) for returning volume indications. It is recommended to set it to more than 100 ms. If it is less than 10 ms, the onAudioVolumeIndication callback may not be received.
   * @param smooth Smoothness factor that specifies the sensitivity of the volume indication. The range is [0,10], and the recommended value is 3. The larger the value, the more sensitive the fluctuation; the smaller the value, the smoother the fluctuation.
   * @param reportVad true : Enables local voice activity detection. When enabled, the vad parameter in the onAudioVolumeIndication callback reports whether voice is detected locally. false : (Default) Disables local voice activity detection. Unless the engine automatically performs local voice detection, the vad parameter in the onAudioVolumeIndication callback does not report local voice detection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number;

  /**
   * @ignore
   */
  abstract startAudioRecording(config: AudioRecordingConfiguration): number;

  /**
   * Registers an audio encoded frame observer.
   *
   * Call this method after joining a channel.
   *  Since this method and startAudioRecording both set audio content and quality, it is not recommended to use this method together with startAudioRecording. Otherwise, only the method called later will take effect.
   *
   * @param config Configuration for the encoded audio observer. See AudioEncodedFrameObserverConfig.
   *
   * @returns
   * An IAudioEncodedFrameObserver object.
   */
  abstract registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * @ignore
   */
  abstract stopAudioRecording(): number;

  /**
   * @ignore
   */
  abstract createMediaPlayer(): IMediaPlayer;

  /**
   * Destroys the media player.
   *
   * @param mediaPlayer The IMediaPlayer object.
   *
   * @returns
   * ≥ 0: Success. Returns the media player ID.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract destroyMediaPlayer(mediaPlayer: IMediaPlayer): number;

  /**
   * @ignore
   */
  abstract createMediaRecorder(info: RecorderStreamInfo): IMediaRecorder;

  /**
   * @ignore
   */
  abstract destroyMediaRecorder(mediaRecorder: IMediaRecorder): number;

  /**
   * Starts playing a music file.
   *
   * For supported audio file formats, see [What audio formats does the RTC SDK support](https://doc.shengwang.cn/faq/general-product-inquiry/audio-format). If the local music file does not exist, the file format is not supported, or the online music file URL is inaccessible, the SDK reports AudioMixingReasonCanNotOpen.
   *  Using this method to play short sound effect files may result in failure. If you need to play sound effects, use playEffect instead.
   *  If you need to call this method multiple times, make sure the interval between calls is greater than 500 ms.
   *  When calling this method on Android, note the following:
   *  Make sure to use a device running Android 4.2 or later with API Level 16 or higher.
   *  If playing an online music file, avoid using a redirect URL. Redirect URLs may not open on some devices.
   *  If calling this method on an emulator, ensure the music file is located in the /sdcard/ directory and is in MP3 format.
   *
   * @param filePath File path:
   *  Android: File path, must include the file name and extension. Supports URL addresses for online files, URI addresses for local files, absolute paths, or paths starting with /assets/. Accessing local files via absolute path may cause permission issues. Using URI addresses is recommended. For example: content://com.android.providers.media.documents/document/audio%3A14441.
   *  iOS: Absolute path or URL of the audio file, must include the file name and extension. For example: /var/mobile/Containers/Data/audio.mp4.
   * @param loopback Whether to play the music file only locally: true : Play the music file locally only. Only the local user can hear the music. false : Publish the locally played music file to remote users. Both local and remote users can hear the music.
   * @param cycle Number of times to play the music file.
   *  > 0: Number of times to play. For example, 1 means play once.
   *  -1: Play in an infinite loop.
   * @param startPos Playback position of the music file in milliseconds.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure:
   *  -1: General error (uncategorized).
   *  -2: Invalid parameter.
   *  -3: SDK not ready:
   *  Check if the audio module is enabled.
   *  Check the integrity of the assembly. IRtcEngine initialization failed. Please reinitialize IRtcEngine.
   */
  abstract startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos?: number
  ): number;

  /**
   * Stops playing the music file.
   *
   * After calling the startAudioMixing method to play a music file, you can call this method to stop playback. If you only need to pause playback, call pauseAudioMixing instead.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopAudioMixing(): number;

  /**
   * Pauses the playback of a music file.
   *
   * After you call the startAudioMixing method to play a music file, call this method to pause the playback. To stop the playback, call stopAudioMixing.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract pauseAudioMixing(): number;

  /**
   * Resumes the playback of a music file.
   *
   * After you call pauseAudioMixing to pause the playback of a music file, call this method to resume playback.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract resumeAudioMixing(): number;

  /**
   * Specifies the audio track to play in the current music file.
   *
   * After retrieving the number of audio tracks in a music file, you can call this method to specify any track for playback. For example, if different tracks in a multi-track file contain songs in different languages, you can use this method to set the playback language.
   *  For supported audio file formats, see [What audio file formats does the RTC SDK support?](https://doc.shengwang.cn/faq/general-product-inquiry/audio-format).
   *  You must call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @param index The specified audio track to play. The value must be greater than or equal to 0 and less than the return value of getAudioTrackCount.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract selectAudioTrack(index: number): number;

  /**
   * Gets the audio track index of the current music file.
   *
   * You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @returns
   * Returns the audio track index of the current music file if the method call succeeds.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getAudioTrackCount(): number;

  /**
   * Adjusts the playback volume of the music file.
   *
   * This method adjusts the playback volume of the mixed music file on both local and remote sides. Calling this method does not affect the playback volume of sound effects set in the playEffect method.
   *
   * @param volume The volume range of the music file is 0~100. 100 (default) is the original file volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustAudioMixingVolume(volume: number): number;

  /**
   * Adjusts the remote playback volume of the music file.
   *
   * This method adjusts the playback volume of the mixed music file on the remote side.
   *
   * @param volume The volume of the music file. The range is [0,100]. 100 (default) is the original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustAudioMixingPublishVolume(volume: number): number;

  /**
   * Gets the remote playback volume of the music file.
   *
   * This API helps developers troubleshoot volume-related issues. You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *
   * @returns
   * ≥ 0: Success. Returns the volume value, range is [0,100].
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getAudioMixingPublishVolume(): number;

  /**
   * Adjusts the local playback volume of the music file.
   *
   * @param volume The volume of the music file. The range is [0,100]. 100 (default) is the original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustAudioMixingPlayoutVolume(volume: number): number;

  /**
   * Gets the local playback volume of the music file.
   *
   * You can call this method to get the local playback volume of the mixed music file, which helps troubleshoot volume-related issues.
   *
   * @returns
   * ≥ 0: Success. Returns the volume value, range is [0,100].
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getAudioMixingPlayoutVolume(): number;

  /**
   * Gets the total duration of the music file.
   *
   * This method gets the total duration of the music file, in milliseconds.
   *
   * @returns
   * ≥ 0: Success. Returns the duration of the music file.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getAudioMixingDuration(): number;

  /**
   * Gets the playback progress of the music file.
   *
   * This method gets the current playback progress of the music file, in milliseconds.
   *  You need to call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged(AudioMixingStatePlaying) callback.
   *  If you need to call getAudioMixingCurrentPosition multiple times, make sure the interval between calls is greater than 500 ms.
   *
   * @returns
   * ≥ 0: Success. Returns the current playback position of the music file (ms). 0 means the music file has not started playing.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getAudioMixingCurrentPosition(): number;

  /**
   * Sets the playback position of the music file.
   *
   * This method sets the playback position of an audio file, allowing you to play from a specific point instead of from the beginning.
   *
   * @param pos An integer. The position in the progress bar, in milliseconds.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAudioMixingPosition(pos: number): number;

  /**
   * Sets the channel mode of the current audio file.
   *
   * In stereo audio files, the left and right channels can store different audio data. Depending on your needs, you can set the channel mode to original, left channel, right channel, or mixed mode. This method applies to stereo audio files only.
   *
   * @param mode The channel mode. See AudioMixingDualMonoMode.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): number;

  /**
   * Adjusts the pitch of the music file played locally.
   *
   * When mixing local vocals with a music file, you can call this method to adjust only the pitch of the music file.
   *
   * @param pitch Adjusts the pitch of the music file played locally in semitone steps. The default value is 0, which means no pitch adjustment. The valid range is [-12,12]. Each adjacent value differs by one semitone. The greater the absolute value, the more the pitch is raised or lowered.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAudioMixingPitch(pitch: number): number;

  /**
   * Sets the playback speed of the current music file.
   *
   * You must call this method after calling startAudioMixing and receiving the onAudioMixingStateChanged callback reporting the playback state as AudioMixingStatePlaying.
   *
   * @param speed The playback speed of the music file. The recommended range is [50,400], where:
   *  50: 0.5x speed.
   *  100: Original speed.
   *  400: 4x speed.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAudioMixingPlaybackSpeed(speed: number): number;

  /**
   * Gets the playback volume of the sound effect file.
   *
   * Volume range is 0~100. 100 (default) is the original file volume. You must call this method after playEffect.
   *
   * @returns
   * Volume of the sound effect file.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getEffectsVolume(): number;

  /**
   * Sets the playback volume of audio effect files.
   *
   * @param volume Playback volume. The range is [0,100]. The default value is 100, which means the original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setEffectsVolume(volume: number): number;

  /**
   * Loads the audio effect file into memory.
   *
   * To ensure smooth communication, pay attention to the size of the audio effect files you preload.
   * Supported audio formats for preloading are listed in [Supported Audio Formats](https://doc.shengwang.cn/faq/general-product-inquiry/audio-format).
   *
   * @param soundId The ID of the audio effect. Each audio effect has a unique ID.
   * @param filePath File path:
   *  Android: The file path must include the file name and extension. Supports URL of online files, URI of local files, absolute path, or paths starting with /assets/. Accessing local files via absolute path may require permissions. It is recommended to use URI to access local files. For example: content://com.android.providers.media.documents/document/audio%3A14441.
   *  iOS: The absolute path or URL of the audio file. Must include the file name and extension. For example: /var/mobile/Containers/Data/audio.mp4.
   * @param startPos The start position for loading the audio effect file, in milliseconds.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract preloadEffect(
    soundId: number,
    filePath: string,
    startPos?: number
  ): number;

  /**
   * Plays the specified local or online audio effect file.
   *
   * You can call this method multiple times with different soundID and filePath to play multiple audio effect files simultaneously. For optimal user experience, it is recommended not to play more than 3 audio effects at the same time. If you need to play online audio effect files, Agora recommends caching them to the local device first, preloading them into memory using preloadEffect, and then calling this method to play them. Otherwise, playback may fail or be silent due to timeout or failure in loading the online file.
   *
   * @param soundId The ID of the audio effect. Each audio effect has a unique ID. If you have preloaded the audio effect using preloadEffect, make sure this parameter matches the soundId set in preloadEffect.
   * @param filePath The path of the file to play. Supports URL of online files and absolute path of local files. Must include the file name and extension. Supported audio formats include MP3, AAC, M4A, MP4, WAV, 3GP, etc. If you have preloaded the audio effect using preloadEffect, make sure this parameter matches the filePath set in preloadEffect.
   * @param loopCount The number of times the audio effect loops.
   *  ≥ 0: Number of loops. For example, 1 means loop once, i.e., play twice in total.
   *  -1: Loop indefinitely.
   * @param pitch The pitch of the audio effect. The range is [0.5,2.0]. The default value is 1.0, which represents the original pitch. The smaller the value, the lower the pitch.
   * @param pan The spatial position of the audio effect. The range is [-1.0,1.0], for example:
   *  -1.0: The audio effect appears on the left
   *  0.0: The audio effect appears in the center
   *  1.0: The audio effect appears on the right
   * @param gain The volume of the audio effect. The range is [0.0,100.0]. The default value is 100.0, which represents the original volume. The smaller the value, the lower the volume.
   * @param publish Whether to publish the audio effect to remote users: true : Publishes the audio effect to remote users. Both local and remote users can hear it. false : Does not publish the audio effect to remote users. Only local users can hear it.
   * @param startPos The playback position of the audio effect file in milliseconds.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Plays all audio effect files.
   *
   * After calling preloadEffect multiple times to preload multiple audio effect files, you can call this method to play all preloaded audio effect files.
   *
   * @param loopCount The number of times the audio effect loops:
   *  -1: Loops indefinitely until stopEffect or stopAllEffects is called.
   *  0: Plays the audio effect once.
   *  1: Plays the audio effect twice.
   * @param pitch The pitch of the audio effect. The range is [0.5,2.0]. The default value is 1.0, which represents the original pitch. The smaller the value, the lower the pitch.
   * @param pan The spatial position of the audio effect. The range is [-1.0,1.0]:
   *  -1.0: The audio effect appears on the left.
   *  0: The audio effect appears in the center.
   *  1.0: The audio effect appears on the right.
   * @param gain The volume of the audio effect. The range is [0,100]. 100 is the default value, representing the original volume. The smaller the value, the lower the volume.
   * @param publish Whether to publish the audio effect to remote users: true : Publishes the audio effect to remote users. Both local and remote users can hear it. false : (Default) Does not publish the audio effect to remote users. Only local users can hear it.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean
  ): number;

  /**
   * Gets the playback volume of the specified audio effect file.
   *
   * @param soundId The ID of the audio effect file.
   *
   * @returns
   * ≥ 0: The method call succeeds and returns the playback volume. The volume range is [0,100], where 100 is the original volume.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getVolumeOfEffect(soundId: number): number;

  /**
   * Sets the playback volume of the specified audio effect file.
   *
   * @param soundId The ID of the specified audio effect. Each audio effect has a unique ID.
   * @param volume Playback volume. The range is [0,100]. The default value is 100, which means the original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setVolumeOfEffect(soundId: number, volume: number): number;

  /**
   * Pauses playback of the specified audio effect file.
   *
   * @param soundId The ID of the audio effect. Each audio effect has a unique ID.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract pauseEffect(soundId: number): number;

  /**
   * Pauses playback of all audio effect files.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract pauseAllEffects(): number;

  /**
   * Resumes playing the specified audio effect file.
   *
   * @param soundId The ID of the audio effect. Each audio effect has a unique ID.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract resumeEffect(soundId: number): number;

  /**
   * Resumes playback of all audio effect files.
   *
   * After calling pauseAllEffects to pause all audio effect files, you can call this method to resume playback.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract resumeAllEffects(): number;

  /**
   * Stops playing the specified audio effect file.
   *
   * When you no longer need to play a specific audio effect file, you can call this method to stop playback. If you only want to pause playback, call pauseEffect.
   *
   * @param soundId The ID of the specified audio effect file. Each audio effect file has a unique ID.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopEffect(soundId: number): number;

  /**
   * Stops playing all audio effect files.
   *
   * When you no longer need to play audio effect files, you can call this method to stop playback. If you only want to pause playback, call pauseAllEffects.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopAllEffects(): number;

  /**
   * Releases a preloaded audio effect file from memory.
   *
   * After calling preloadEffect to load an audio effect file into memory, call this method to release the file.
   *
   * @param soundId The ID of the specified audio effect file. Each audio effect file has a unique ID.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unloadEffect(soundId: number): number;

  /**
   * Releases all preloaded audio effect files from memory.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unloadAllEffects(): number;

  /**
   * Gets the total duration of the specified sound effect file.
   *
   * You must call this method after joining a channel.
   *
   * @param filePath File path:
   *  Android: File path, must include the file name and extension. Supports URL addresses for online files, URI addresses for local files, absolute paths, or paths starting with /assets/. Accessing local files via absolute path may cause permission issues. Using URI addresses is recommended. For example: content://com.android.providers.media.documents/document/audio%3A14441.
   *  iOS: Absolute path or URL of the audio file, must include the file name and extension. For example: /var/mobile/Containers/Data/audio.mp4.
   *
   * @returns
   * If the method call succeeds, returns the duration of the specified sound effect file (in milliseconds).
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getEffectDuration(filePath: string): number;

  /**
   * Sets the playback position of the specified audio effect file.
   *
   * After the setting is successful, the local audio effect file starts playing from the specified position. You need to call this method after playEffect.
   *
   * @param soundId The ID of the audio effect. Each audio effect has a unique ID.
   * @param pos The playback position of the audio effect file, in milliseconds.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setEffectPosition(soundId: number, pos: number): number;

  /**
   * Gets the playback progress of the specified sound effect file.
   *
   * You must call this method after playEffect.
   *
   * @param soundId ID of the sound effect. Each sound effect has a unique ID.
   *
   * @returns
   * If the method call succeeds, returns the playback progress of the specified sound effect file (in milliseconds).
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getEffectCurrentPosition(soundId: number): number;

  /**
   * Enables/disables stereo sound for remote users.
   *
   * To use setRemoteVoicePosition for spatial audio positioning, make sure to call this method before joining a channel to enable stereo sound for remote users.
   *
   * @param enabled Whether to enable stereo sound for remote users: true : Enable stereo sound. false : Disable stereo sound.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableSoundPositionIndication(enabled: boolean): number;

  /**
   * Sets the 2D position of a remote user's voice, i.e., horizontal position.
   *
   * Sets the 2D position and volume of a remote user's voice to help the local user locate the sound source.
   * By calling this method, you can set the position where the remote user's voice appears. The difference between the left and right channels creates a sense of direction, allowing the user to determine the real-time position of the remote user. In multiplayer online games such as battle royale, this method can effectively enhance the sense of direction of game characters and simulate a real environment.
   *  Before using this method, you must call enableSoundPositionIndication before joining the channel to enable stereo sound for remote users.
   *  For the best audio experience, it is recommended to use wired headphones when using this method.
   *  This method must be called after joining a channel.
   *
   * @param uid The ID of the remote user
   * @param pan Sets the 2D position of the remote user's voice. The range is [-1.0, 1.0]:
   *  (Default) 0.0: Voice appears in the center.
   *  -1.0: Voice appears on the left.
   *  1.0: Voice appears on the right.
   * @param gain Sets the volume of the remote user's voice. The range is [0.0, 100.0], with a default of 100.0, representing the original volume. The smaller the value, the lower the volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): number;

  /**
   * Enables or disables spatial audio.
   *
   * After enabling spatial audio, you can call setRemoteUserSpatialAudioParams to set spatial audio parameters for remote users.
   *  This method can be called before or after joining a channel.
   *  This method depends on the spatial audio dynamic library libagora_spatial_audio_extension.dll. Removing this library will prevent the feature from working properly.
   *
   * @param enabled Whether to enable spatial audio: true : Enable spatial audio. false : Disable spatial audio.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableSpatialAudio(enabled: boolean): number;

  /**
   * Sets the spatial audio parameters for a remote user.
   *
   * You need to call this method after enableSpatialAudio. After successfully setting the spatial audio parameters for the remote user, the local user will hear spatial audio effects from the remote user.
   *
   * @param uid User ID. Must be the same as the user ID used when joining the channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteUserSpatialAudioParams(
    uid: number,
    params: SpatialAudioParams
  ): number;

  /**
   * Sets a predefined voice beautifier effect.
   *
   * Call this method to set a predefined voice beautifier effect for the local user who sends the stream. After the effect is set, all users in the channel can hear it. You can choose different beautifier effects for different scenarios.
   *  Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard (1) or AudioProfileIot (6), or this method will not take effect.
   *  This method works best for voice processing. It is not recommended to use it for audio data that contains music.
   *  After calling setVoiceBeautifierPreset, it is not recommended to call the following methods, or the effect set by setVoiceBeautifierPreset will be overridden: setAudioEffectPreset setAudioEffectParameters setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceBeautifierParameters setVoiceConversionPreset
   *  This method depends on the voice beautifier dynamic library libagora_audio_beauty_extension.dll. If the library is deleted, this feature will not work properly.
   *
   * @param preset Predefined voice beautifier effect option. See VoiceBeautifierPreset.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number;

  /**
   * Sets the SDK's preset voice effects.
   *
   * Call this method to set the SDK's preset voice effects for the local user who is sending the stream. This does not change the gender characteristics of the original voice. After setting the effect, all users in the channel can hear it.
   *  Do not set the profile parameter of setAudioProfile to AudioProfileSpeechStandard (1) or AudioProfileIot (6), otherwise this method will not take effect.
   *  If you call setAudioEffectPreset and set an enum other than RoomAcoustics3dVoice or PitchCorrection, do not call setAudioEffectParameters, or the effect set by setAudioEffectPreset will be overridden.
   *  After calling setAudioEffectPreset, it is not recommended to call the following methods, or the effect set by setAudioEffectPreset will be overridden: setVoiceBeautifierPreset setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceBeautifierParameters setVoiceConversionPreset
   *  This method depends on the beautifier dynamic library libagora_audio_beauty_extension.dll. Deleting this library will cause the feature to fail to start properly.
   *
   * @param preset Preset audio effect option. See AudioEffectPreset.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAudioEffectPreset(preset: AudioEffectPreset): number;

  /**
   * Sets a predefined voice conversion effect.
   *
   * Call this method to set a predefined voice conversion effect for the local user who sends the stream. After the effect is set, all users in the channel can hear it. You can choose different voice conversion effects for different scenarios.
   *  Do not set the profile parameter in setAudioProfile to AudioProfileSpeechStandard (1) or AudioProfileIot (6), or this method will not take effect.
   *  This method works best for voice processing. It is not recommended to use it for audio data that contains music.
   *  After calling setVoiceConversionPreset, it is not recommended to call the following methods, or the effect set by setVoiceConversionPreset will be overridden: setAudioEffectPreset setAudioEffectParameters setVoiceBeautifierPreset setVoiceBeautifierParameters setLocalVoicePitch setLocalVoiceFormant setLocalVoiceEqualization setLocalVoiceReverb
   *  This method depends on the voice beautifier dynamic library libagora_audio_beauty_extension.dll. If the library is deleted, this feature will not work properly.
   *
   * @param preset Predefined voice conversion effect option: VoiceConversionPreset.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setVoiceConversionPreset(preset: VoiceConversionPreset): number;

  /**
   * Sets parameters for SDK preset voice effects.
   *
   * You can call this method to configure the following for local stream users:
   *  3D voice effect: Set the surround cycle for the 3D voice effect.
   *  Pitch correction effect: Set the base scale and tonic pitch. To allow users to adjust pitch correction effects easily, it is recommended to bind the base scale and tonic pitch settings to your application's UI elements. After the settings are applied, all users in the channel can hear the effect. To achieve better voice effects, it is recommended to:
   *  Call setAudioScenario to set the audio scenario to high-quality, i.e., AudioScenarioGameStreaming (3).
   *  Call setAudioProfile to set profile to AudioProfileMusicHighQuality (4) or AudioProfileMusicHighQualityStereo (5).
   *  This method can be called before or after joining the channel.
   *  Do not set the profile parameter of setAudioProfile to AudioProfileSpeechStandard (1) or AudioProfileIot (6), otherwise this method will not take effect.
   *  This method works best for voice processing and is not recommended for audio data containing music.
   *  After calling setAudioEffectParameters, avoid calling the following methods as they will override the effects set by setAudioEffectParameters : setAudioEffectPreset setVoiceBeautifierPreset setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceBeautifierParameters setVoiceConversionPreset
   *  This method depends on the voice beautifier dynamic library libagora_audio_beauty_extension.dll. Removing the dynamic library will cause the feature to fail.
   *
   * @param preset SDK preset audio effects. The following are supported: RoomAcoustics3dVoice : 3D voice effect.
   *  Before using this enum, you need to set the profile parameter of setAudioProfile to AudioProfileMusicStandardStereo (3) or AudioProfileMusicHighQualityStereo (5), otherwise the enum setting is invalid.
   *  After enabling 3D voice, users must use audio playback devices that support stereo to hear the expected effect. PitchCorrection : Pitch correction effect.
   * @param param1 If preset is set to RoomAcoustics3dVoice, then param1 represents the surround cycle of the 3D voice effect. Value range: [1,60] seconds. Default is 10, which means the voice surrounds 360 degrees in 10 seconds.
   *  If preset is set to PitchCorrection, then param1 represents the base scale: 1 : (Default) Major natural scale. 2 : Minor natural scale. 3 : Minor pentatonic scale.
   * @param param2 If preset is set to RoomAcoustics3dVoice, set param2 to 0.
   *  If preset is set to PitchCorrection, then param2 represents the tonic pitch: 1 : A 2 : A# 3 : B 4 : (Default) C 5 : C# 6 : D 7 : D# 8 : E 9 : F 10 : F# 11 : G 12 : G#
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number;

  /**
   * Sets parameters for preset voice beautifier effects.
   *
   * Call this method to set the gender characteristics and reverb effects of the singing beautifier. This method applies to the local user who is sending the stream. After setting, all users in the channel can hear the effect.
   * To achieve better voice effects, it is recommended to perform the following operations before calling this method:
   *  Call setAudioScenario to set the audio scenario to high-quality mode, i.e., AudioScenarioGameStreaming (3).
   *  Call setAudioProfile to set the profile to AudioProfileMusicHighQuality (4) or AudioProfileMusicHighQualityStereo (5).
   *  This method can be called before or after joining a channel.
   *  Do not set the profile parameter of setAudioProfile to AudioProfileSpeechStandard (1) or AudioProfileIot (6), otherwise this method will not take effect.
   *  This method is optimized for voice and is not recommended for audio data containing music.
   *  After calling setVoiceBeautifierParameters, it is not recommended to call the following methods, or the effect set by setVoiceBeautifierParameters will be overridden: setAudioEffectPreset setAudioEffectParameters setVoiceBeautifierPreset setLocalVoicePitch setLocalVoiceEqualization setLocalVoiceReverb setVoiceConversionPreset
   *  This method depends on the beautifier dynamic library libagora_audio_beauty_extension.dll. Deleting this library will cause the feature to fail to start properly.
   *
   * @param preset Preset effect: SINGING_BEAUTIFIER : Singing beautifier.
   * @param param1 Gender characteristics of the singing voice: 1 : Male voice. 2 : Female voice.
   * @param param2 Reverb effect of the singing voice: 1 : Small room reverb. 2 : Large room reverb. 3 : Hall reverb.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Sets the local voice pitch.
   *
   * @param pitch Voice frequency. Can be set within the range [0.5, 2.0]. The smaller the value, the lower the pitch. The default is 1.0, meaning no pitch change.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalVoicePitch(pitch: number): number;

  /**
   * Sets the formant ratio to change the voice timbre.
   *
   * Formant ratio is a parameter that affects the timbre of the voice. A smaller value results in a deeper voice, while a larger value results in a sharper voice. After setting the formant ratio, all users in the channel can hear the effect. If you want to change both timbre and pitch, Agora recommends using it together with setLocalVoicePitch.
   *
   * @param formantRatio Formant ratio. The value range is [-1.0, 1.0]. The default is 0.0, which means no change to the original timbre. Agora recommends a value range of [-0.4, 0.6]. Effects outside this range may sound suboptimal.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalVoiceFormant(formantRatio: number): number;

  /**
   * Sets the local voice equalization effect.
   *
   * @param bandFrequency Index of the frequency band. The value range is [0,9], representing 10 frequency bands. The corresponding center frequencies are [31, 62, 125, 250, 500, 1k, 2k, 4k, 8k, 16k] Hz. See AudioEqualizationBandFrequency.
   * @param bandGain Gain of each band in dB. The value range is [-15,15], and the default is 0.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number;

  /**
   * Sets local voice reverb effects.
   *
   * The SDK provides a simpler method setAudioEffectPreset to directly achieve preset reverb effects such as Pop, R&B, and KTV. This method can be called before or after joining a channel.
   *
   * @param reverbKey Reverb effect key. There are 5 reverb effect keys in total. See AudioReverbType.
   * @param value Value corresponding to each reverb effect key.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): number;

  /**
   * Sets a preset headphone equalizer effect.
   *
   * This method is mainly used in spatial audio scenarios. You can select a preset headphone equalizer to listen to audio and achieve the desired audio experience. If the headphones you are using already have good equalization, calling this method may not significantly improve the experience and may even degrade it.
   *
   * @param preset Preset headphone equalizer effect. See HeadphoneEqualizerPreset.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure
   *  -1: General error (not specifically classified).
   */
  abstract setHeadphoneEQPreset(preset: HeadphoneEqualizerPreset): number;

  /**
   * Sets the low and high frequency parameters of the headphone equalizer.
   *
   * In spatial audio scenarios, if the expected effect is not achieved after calling setHeadphoneEQPreset to use a preset headphone equalizer effect, you can call this method to further adjust the headphone equalizer.
   *
   * @param lowGain Low frequency parameter of the headphone equalizer. Range: [-10, 10]. The higher the value, the deeper the sound.
   * @param highGain High frequency parameter of the headphone equalizer. Range: [-10, 10]. The higher the value, the sharper the sound.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure
   *  -1: General error (not specifically classified).
   */
  abstract setHeadphoneEQParameters(lowGain: number, highGain: number): number;

  /**
   * Enables or disables the AI tuner feature.
   *
   * The AI tuner feature enhances voice quality and adjusts voice tone style.
   *
   * @param enabled Whether to enable the AI tuner feature: true : Enable the AI tuner feature. false : (Default) Disable the AI tuner feature.
   * @param type AI tuner effect type. See VoiceAiTunerType.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableVoiceAITuner(enabled: boolean, type: VoiceAiTunerType): number;

  /**
   * Sets the log file.
   *
   * Deprecated Deprecated: This method is deprecated. Please set the log file path via the context parameter when calling initialize. Sets the SDK's output log file. All logs generated during SDK runtime will be written to this file. The app must ensure that the specified directory exists and is writable.
   *
   * @param filePath Full path of the log file. The log file is UTF-8 encoded.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setLogFile(filePath: string): number;

  /**
   * Sets the log output level.
   *
   * Deprecated Deprecated: Use logConfig in initialize instead. This method sets the log output level of the SDK. Different output levels can be used individually or in combination. The log levels in order are: LogFilterOff, LogFilterCritical, LogFilterError, LogFilterWarn, LogFilterInfo, and LogFilterDebug.
   * When you select a level, you will see logs for that level and all levels before it.
   * For example, if you select LogFilterWarn, you will see logs for LogFilterCritical, LogFilterError, and LogFilterWarn.
   *
   * @param filter Log filter level. See LogFilterType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLogFilter(filter: LogFilterType): number;

  /**
   * Sets the log output level of the SDK.
   *
   * Deprecated Deprecated: This method is deprecated. Set the log output level via the context parameter when calling initialize. When you select a level, you will see log information for that level.
   *
   * @param level Log level. See LogLevel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLogLevel(level: LogLevel): number;

  /**
   * Sets the size of the SDK log output file.
   *
   * Deprecated Deprecated: This method is deprecated. Use the logConfig parameter in initialize instead to set the log file size. By default, the SDK generates 5 SDK log files and 5 API call log files, as follows:
   *  SDK log file names: agorasdk.log, agorasdk.1.log, agorasdk.2.log, agorasdk.3.log, agorasdk.4.log.
   *  API call log file names: agoraapi.log, agoraapi.1.log, agoraapi.2.log, agoraapi.3.log, agoraapi.4.log.
   *  Each SDK log file has a default size of 2,048 KB; API call log files also default to 2,048 KB. All log files are UTF-8 encoded.
   *  The latest logs are always written to agorasdk.log and agoraapi.log.
   *  When agorasdk.log is full, the SDK performs the following operations in order:
   *  Delete the agorasdk.4.log file (if it exists).
   *  Rename agorasdk.3.log to agorasdk.4.log.
   *  Rename agorasdk.2.log to agorasdk.3.log.
   *  Rename agorasdk.1.log to agorasdk.2.log.
   *  Create a new agorasdk.log file.
   *  The rollover rules for agoraapi.log are the same as for agorasdk.log. This method only sets the size of the agorasdk.log file and does not affect agoraapi.log.
   *
   * @param fileSizeInKBytes The size of a single agorasdk.log log file in KB. The valid range is [128,20480], and the default is 2,048 KB. If you set fileSizeInKByte to less than 128 KB, the SDK automatically adjusts it to 128 KB. If you set it to more than 20,480 KB, the SDK automatically adjusts it to 20,480 KB.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLogFileSize(fileSizeInKBytes: number): number;

  /**
   * @ignore
   */
  abstract uploadLogFile(): string;

  /**
   * @ignore
   */
  abstract writeLog(level: LogLevel, fmt: string): number;

  /**
   * Updates the local view display mode.
   *
   * After initializing the local user view, you can call this method to update the rendering and mirror mode of the local user view. This method only affects the video image seen by the local user and does not affect the publishing of the local video.
   *
   * @param renderMode The display mode of the local view. See RenderModeType.
   * @param mirrorMode The mirror mode of the local view. See VideoMirrorModeType. If you use the front camera, the mirror mode of the local user view is enabled by default; if you use the rear camera, the mirror mode is disabled by default.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode?: VideoMirrorModeType
  ): number;

  /**
   * Updates the remote view display mode.
   *
   * After initializing the remote user view, you can call this method to update the rendering and mirror mode of the remote user view as displayed locally. This method only affects the video image seen by the local user.
   *  You can call this method multiple times during a call to update the display mode of the remote user view.
   *
   * @param uid Remote user ID.
   * @param renderMode The rendering mode of the remote user view. See RenderModeType.
   * @param mirrorMode The mirror mode of the remote user view. See VideoMirrorModeType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number;

  /**
   * Sets the maximum frame rate for local video rendering.
   *
   * @param sourceType The type of video source. See VideoSourceType.
   * @param targetFps Maximum rendering frame rate (fps). Supported values: 1, 7, 10, 15, 24, 30, 60. Set this parameter to a value lower than the actual frame rate of the video, otherwise the setting will not take effect.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalRenderTargetFps(
    sourceType: VideoSourceType,
    targetFps: number
  ): number;

  /**
   * Sets the maximum frame rate for remote video rendering.
   *
   * @param targetFps Maximum rendering frame rate (fps). Supported values: 1, 7, 10, 15, 24, 30, 60. Set this parameter to a value lower than the actual frame rate of the video, otherwise the setting will not take effect.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteRenderTargetFps(targetFps: number): number;

  /**
   * Sets the local video mirror mode.
   *
   * Deprecated Deprecated: This method is deprecated.
   *
   * @param mirrorMode The mirror mode of the local video. See VideoMirrorModeType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number;

  /**
   * Enables or disables the dual-stream mode and sets the low-quality video stream on the sender side.
   *
   * Deprecated Deprecated: Deprecated since v4.2.0. Use setDualStreamMode instead. You can call this method on the sender side to enable or disable dual-stream mode. Dual-stream refers to high-quality and low-quality video streams:
   *  High-quality stream: High resolution and high frame rate video stream.
   *  Low-quality stream: Low resolution and low frame rate video stream. After enabling dual-stream mode, you can call setRemoteVideoStreamType on the receiver side to choose to receive either the high-quality or low-quality video stream.
   *  This method applies to all types of streams sent by the sender, including but not limited to camera-captured video, screen sharing, and custom video streams.
   *  To enable dual-stream mode in multi-channel scenarios, call enableDualStreamModeEx.
   *  This method can be called before or after joining a channel.
   *
   * @param enabled Whether to enable dual-stream mode: true : Enable dual-stream mode. false : (Default) Disable dual-stream mode.
   * @param streamConfig Configuration for the low-quality video stream. See SimulcastStreamConfig. When mode is set to DisableSimulcastStream, setting streamConfig has no effect.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableDualStreamMode(
    enabled: boolean,
    streamConfig?: SimulcastStreamConfig
  ): number;

  /**
   * Sets the dual-stream mode and configures the low-quality video stream on the sender side.
   *
   * By default, the SDK enables the adaptive low-quality stream mode (AutoSimulcastStream) on the sender side, meaning the sender does not actively send the low-quality stream. A receiver with host role can call setRemoteVideoStreamType to request the low-quality stream, and the sender starts sending it automatically upon receiving the request.
   *  To change this behavior, call this method and set mode to DisableSimulcastStream (never send low-quality stream) or EnableSimulcastStream (always send low-quality stream).
   *  To revert to the default behavior after making changes, call this method again and set mode to AutoSimulcastStream. The differences and similarities between this method and enableDualStreamMode are as follows:
   *  Calling this method with mode set to DisableSimulcastStream is equivalent to calling enableDualStreamMode with enabled set to false.
   *  Calling this method with mode set to EnableSimulcastStream is equivalent to calling enableDualStreamMode with enabled set to true.
   *  Both methods can be called before or after joining a channel. If both are used, the settings from the later call take precedence.
   *
   * @param mode The mode for sending video streams. See SimulcastStreamMode.
   * @param streamConfig Configuration for the low-quality video stream. See SimulcastStreamConfig. When mode is set to DisableSimulcastStream, streamConfig has no effect.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Code](https://doc.shengwang.cn/api-ref/rtc/rn/error-code) for details and resolution suggestions.
   */
  abstract setDualStreamMode(
    mode: SimulcastStreamMode,
    streamConfig?: SimulcastStreamConfig
  ): number;

  /**
   * @ignore
   */
  abstract setSimulcastConfig(simulcastConfig: SimulcastConfig): number;

  /**
   * Sets whether to play external audio sources locally.
   *
   * After calling this method to enable local playback of externally captured audio sources, you can call this method again and set enabled to false to stop local playback.
   * You can call adjustCustomAudioPlayoutVolume to adjust the local playback volume of the custom audio capture track. Before calling this method, make sure you have already called the createCustomAudioTrack method to create a custom audio capture track.
   *
   * @param trackId Audio track ID. Set this parameter to the custom audio track ID returned by the createCustomAudioTrack method.
   * @param enabled Whether to play the external audio source locally: true : Play locally. false : (Default) Do not play locally.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): number;

  /**
   * Sets the data format of the recorded raw audio.
   *
   * The SDK calculates the sampling interval using the samplesPerCall, sampleRate, and channel parameters in this method. The formula is: sampling interval = samplesPerCall / (sampleRate × channel). Ensure that the sampling interval is no less than 0.01 seconds. The SDK triggers the onRecordAudioFrame callback based on this interval.
   *
   * @param sampleRate The sample rate (Hz) of the audio data. You can set it to 8000, 16000, 32000, 44100, or 48000.
   * @param channel The number of audio channels. You can set it to 1 or 2:
   *  1: Mono.
   *  2: Stereo.
   * @param mode The operation mode of the audio frame. See RawAudioFrameOpModeType.
   * @param samplesPerCall The number of audio samples per call. Typically set to 1024 in scenarios such as CDN streaming.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * Sets the data format of the playback raw audio.
   *
   * The SDK calculates the sampling interval using the samplesPerCall, sampleRate, and channel parameters in this method. The formula is: sampling interval = samplesPerCall / (sampleRate × channel). Ensure that the sampling interval is no less than 0.01 seconds. The SDK triggers the onPlaybackAudioFrame callback based on this interval.
   *
   * @param sampleRate The sample rate (Hz) of the audio data. You can set it to 8000, 16000, 24000, 32000, 44100, or 48000.
   * @param channel The number of audio channels. You can set it to 1 or 2:
   *  1: Mono.
   *  2: Stereo.
   * @param mode The operation mode of the audio frame. See RawAudioFrameOpModeType.
   * @param samplesPerCall The number of audio samples per call. Typically set to 1024 in scenarios such as CDN streaming.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * Sets the raw audio data format after audio capture and playback mixing.
   *
   * The SDK calculates the sampling interval using the samplesPerCall, sampleRate, and channel parameters in this method. The formula is: sampling interval = samplesPerCall / (sampleRate × channel). Ensure the interval is no less than 0.01 seconds. The SDK triggers the onMixedAudioFrame callback based on this interval.
   *
   * @param sampleRate The sample rate (Hz) of the audio data, can be set to 8000, 16000, 32000, 44100, or 48000.
   * @param channel The number of audio channels, can be set to 1 or 2:
   *  1: Mono.
   *  2: Stereo.
   * @param samplesPerCall The number of audio samples, typically 1024 in scenarios like CDN streaming.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number;

  /**
   * Sets the audio data format for in-ear monitoring.
   *
   * This method sets the audio data format for the onEarMonitoringAudioFrame callback.
   *  Before calling this method, you need to call enableInEarMonitoring and set includeAudioFilters to EarMonitoringFilterBuiltInAudioFilters or EarMonitoringFilterNoiseSuppression.
   *  The SDK calculates the sampling interval using the samplesPerCall, sampleRate, and channel parameters in this method. The formula is: sampling interval = samplesPerCall / (sampleRate × channel). Ensure the interval is no less than 0.01 seconds. The SDK triggers the onEarMonitoringAudioFrame callback based on this interval.
   *
   * @param sampleRate The sample rate (Hz) of the audio reported in onEarMonitoringAudioFrame, can be set to 8000, 16000, 32000, 44100, or 48000.
   * @param channel The number of audio channels reported in onEarMonitoringAudioFrame, can be set to 1 or 2:
   *  1: Mono.
   *  2: Stereo.
   * @param mode The usage mode of the audio frame. See RawAudioFrameOpModeType.
   * @param samplesPerCall The number of audio samples reported in onEarMonitoringAudioFrame, typically 1024 in scenarios like CDN streaming.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /**
   * Sets the raw audio playback data format before mixing.
   *
   * The SDK triggers the onPlaybackAudioFrameBeforeMixing callback based on this sampling interval.
   *
   * @param sampleRate The sample rate (Hz) of the audio data, can be set to 8000, 16000, 32000, 44100, or 48000.
   * @param channel The number of audio channels, can be set to 1 or 2:
   *  1: Mono.
   *  2: Stereo.
   * @param samplesPerCall Sets the number of audio samples returned in the onPlaybackAudioFrameBeforeMixing callback. In RTMP streaming scenarios, it is recommended to set this to 1024.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number;

  /**
   * Enables audio spectrum monitoring.
   *
   * If you want to obtain the audio spectrum data of local or remote users, register an audio spectrum observer and enable audio spectrum monitoring. This method can be called before or after joining a channel.
   *
   * @param intervalInMS The interval (ms) at which the SDK triggers the onLocalAudioSpectrum and onRemoteAudioSpectrum callbacks. Default is 100 ms. The value must not be less than 10 ms, otherwise the method call will fail.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter settings.
   */
  abstract enableAudioSpectrumMonitor(intervalInMS?: number): number;

  /**
   * Disables audio spectrum monitoring.
   *
   * Call this method to disable audio spectrum monitoring after calling enableAudioSpectrumMonitor. This method can be called before or after joining a channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract disableAudioSpectrumMonitor(): number;

  /**
   * Registers an audio spectrum observer.
   *
   * After successfully registering an audio spectrum observer and calling enableAudioSpectrumMonitor to enable audio spectrum monitoring, the SDK reports callbacks implemented in the IAudioSpectrumObserver class at the interval you set. This method can be called before or after joining a channel.
   *
   * @param observer The audio spectrum observer. See IAudioSpectrumObserver.
   *
   * @returns
   * The IAudioSpectrumObserver object.
   */
  abstract registerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * Unregisters the audio spectrum observer.
   *
   * Call this method to unregister the audio spectrum observer after calling registerAudioSpectrumObserver. This method can be called before or after joining a channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unregisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * Adjusts the recording signal volume.
   *
   * If you only want to mute the audio signal, we recommend using muteRecordingSignal.
   *
   * @param volume The volume. The value ranges from [0,400].
   *  0: Mute.
   *  100: (Default) Original volume.
   *  400: Four times the original volume with overflow protection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustRecordingSignalVolume(volume: number): number;

  /**
   * Whether to mute the recording signal.
   *
   * If you have already called adjustRecordingSignalVolume to adjust the volume of the audio capture signal, then calling this method with true will cause the SDK to:
   *  Record the adjusted volume.
   *  Mute the audio capture signal. When you call this method again with false, the recording signal will be restored to the volume recorded by the SDK before muting.
   *
   * @param mute true : Mute. false : (Default) Original volume.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteRecordingSignal(mute: boolean): number;

  /**
   * Adjusts the signal volume of all remote users for local playback.
   *
   * This method adjusts the signal volume of all remote users after mixing for local playback. If you need to adjust the signal volume of a specific remote user for local playback, it is recommended to call adjustUserPlaybackSignalVolume.
   *
   * @param volume Volume, range is [0,400].
   *  0: Mute.
   *  100: (Default) Original volume.
   *  400: 4 times the original volume, with built-in overflow protection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustPlaybackSignalVolume(volume: number): number;

  /**
   * Adjusts the playback volume of a specified remote user locally.
   *
   * You can call this method during a call to adjust the playback volume of a specified remote user locally. To adjust the playback volume of multiple users locally, call this method multiple times.
   *
   * @param uid Remote user ID.
   * @param volume Volume. The range is [0,400].
   *  0: Mute.
   *  100: (Default) Original volume.
   *  400: Four times the original volume with built-in overflow protection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustUserPlaybackSignalVolume(uid: number, volume: number): number;

  /**
   * Sets the fallback option for subscribed audio and video streams under poor network conditions.
   *
   * Under poor network conditions, the quality of real-time audio and video may degrade. You can call this method and set option to StreamFallbackOptionVideoStreamLow or StreamFallbackOptionAudioOnly. When the downlink network is weak and audio/video quality is severely affected, the SDK will switch the video stream to a lower stream or disable the video stream to ensure audio quality. The SDK continuously monitors network quality and resumes audio and video subscription when conditions improve.
   * When the subscribed stream falls back to audio or recovers to audio and video, the SDK triggers the onRemoteSubscribeFallbackToAudioOnly callback.
   *
   * @param option Fallback option for the subscribed stream. See STREAM_FALLBACK_OPTIONS.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): number;

  /**
   * @ignore
   */
  abstract setHighPriorityUserList(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): number;

  /**
   * Enables/disables an extension.
   *
   * To enable multiple extensions, call this method multiple times.
   *  After this method is called successfully, no other extensions can be loaded.
   *
   * @param provider The name of the extension provider.
   * @param extension The name of the extension.
   * @param enable Whether to enable the extension: true : Enable the extension. false : Disable the extension.
   * @param type The media source type of the extension. See MediaSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -3: The extension dynamic library is not loaded. Agora recommends checking whether the library is placed in the expected location or whether the library name is correct.
   */
  abstract enableExtension(
    provider: string,
    extension: string,
    enable?: boolean,
    type?: MediaSourceType
  ): number;

  /**
   * Sets a plugin property.
   *
   * After enabling a plugin, you can call this method to set its properties. To set properties for multiple plugins, call this method multiple times.
   *
   * @param provider The name of the plugin provider.
   * @param extension The name of the plugin.
   * @param key The key of the plugin property.
   * @param value The value corresponding to the plugin property key.
   * @param type The media source type of the plugin. See MediaSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type?: MediaSourceType
  ): number;

  /**
   * Gets detailed information about the plugin.
   *
   * @param provider The name of the plugin provider.
   * @param extension The name of the plugin.
   * @param key The key of the plugin property.
   * @param bufLen The maximum length of the plugin property JSON string. Maximum value is 512 bytes.
   * @param type The media source type of the plugin. See MediaSourceType.
   *
   * @returns
   * If the method call succeeds, returns the plugin information.
   *  If the method call fails, returns an empty string.
   */
  abstract getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    bufLen: number,
    type?: MediaSourceType
  ): string;

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
   *
   * Enables or disables in-ear monitoring. Users must wear headphones (wired or Bluetooth) to hear the in-ear monitoring.
   *
   * @param enabled Whether to enable in-ear monitoring: true : Enable in-ear monitoring. false : (Default) Disable in-ear monitoring.
   * @param includeAudioFilters The type of audio filter for in-ear monitoring. See EarMonitoringFilterType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -8: Make sure the current audio route is set to Bluetooth or headphones.
   */
  abstract enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number;

  /**
   * Sets the in-ear monitoring volume.
   *
   * @param volume Volume, range: [0,400].
   *  0: Mute.
   *  100: (Default) Original volume.
   *  400: 4 times the original volume, with built-in overflow protection.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter setting, such as in-ear monitoring volume out of range (< 0 or > 400).
   */
  abstract setInEarMonitoringVolume(volume: number): number;

  /**
   * Loads a plugin.
   *
   * This method adds external SDK plugins (such as marketplace plugins and SDK extension plugins) to the SDK. To load multiple plugins, call this method multiple times.
   * This method is for Android only.
   *
   * @param path The path and name of the plugin dynamic library. For example: /library/libagora_segmentation_extension.dll.
   * @param unloadAfterUse Whether to automatically unload the plugin after use: true : Automatically unloads the plugin when IRtcEngine is destroyed. false : Does not automatically unload the plugin until the process exits (recommended).
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract loadExtensionProvider(
    path: string,
    unloadAfterUse?: boolean
  ): number;

  /**
   * Sets a property for the plugin provider.
   *
   * You can call this method to set properties for the plugin provider and initialize related parameters based on the provider type. To set properties for multiple plugin providers, call this method multiple times.
   *
   * @param provider The name of the plugin provider.
   * @param key The key of the plugin property.
   * @param value The value corresponding to the plugin property key.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): number;

  /**
   * Registers an extension.
   *
   * For external SDK extensions (such as marketplace plugins and SDK extension plugins), after loading the plugin, you need to call this method to register it. Internal SDK plugins (included in the SDK package) are automatically loaded and registered after initializing IRtcEngine, so you don't need to call this method.
   *  To register multiple plugins, call this method multiple times.
   *  The order in which different plugins process data in the SDK is determined by the order in which they are registered. That is, plugins registered earlier process data first.
   *
   * @param provider The name of the plugin provider.
   * @param extension The name of the plugin.
   * @param type The media source type of the plugin. See MediaSourceType.
   */
  abstract registerExtension(
    provider: string,
    extension: string,
    type?: MediaSourceType
  ): number;

  /**
   * Sets the camera capture configuration.
   *
   * Before adjusting the camera's focal length configuration, it is recommended to call queryCameraFocalLengthCapability to query the device's supported focal length capabilities, and configure accordingly.
   * Due to limitations on some Android devices, even if you configure the focal length type based on the result of queryCameraFocalLengthCapability, the setting may not take effect.
   *
   * @param config Camera capture configuration. See CameraCapturerConfiguration. You do not need to set the deviceId parameter in this method.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Creates a custom video track.
   *
   * When you need to publish a custom captured video in the channel, refer to the following steps:
   *  Call this method to create a video track and obtain the video track ID.
   *  When calling joinChannel to join the channel, set customVideoTrackId in ChannelMediaOptions to the video track ID you want to publish, and set publishCustomVideoTrack to true.
   *  Call pushVideoFrame and specify videoTrackId as the video track ID specified in step 2 to publish the corresponding custom video source in the channel.
   *
   * @returns
   * If the method call succeeds, returns the video track ID as the unique identifier of the video track.
   *  If the method call fails, returns 0xffffffff. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract createCustomVideoTrack(): number;

  /**
   * @ignore
   */
  abstract createCustomEncodedVideoTrack(senderOption: SenderOptions): number;

  /**
   * Destroys the specified video track.
   *
   * @param videoTrackId The video track ID returned by the createCustomVideoTrack method.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract destroyCustomVideoTrack(videoTrackId: number): number;

  /**
   * @ignore
   */
  abstract destroyCustomEncodedVideoTrack(videoTrackId: number): number;

  /**
   * Switches between front and rear cameras.
   *
   * You can call this method during the app's runtime to dynamically switch between cameras based on the actual availability, without restarting the video stream or reconfiguring the video source. This method only switches the camera for the first video stream captured by the camera, that is, the video source set to VideoSourceCamera (0) when calling startCameraCapture.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract switchCamera(): number;

  /**
   * Checks whether the device supports camera zoom.
   *
   * @returns
   * true : The device supports camera zoom. false : The device does not support camera zoom.
   */
  abstract isCameraZoomSupported(): boolean;

  /**
   * Checks whether the device camera supports face detection.
   *
   * This method is only applicable to Android and iOS.
   *  You must call this method after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @returns
   * true : The device camera supports face detection. false : The device camera does not support face detection.
   */
  abstract isCameraFaceDetectSupported(): boolean;

  /**
   * Checks whether the device supports keeping the flashlight on.
   *
   * You must call this method after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  In general, the app uses the front camera by default. If the front camera does not support keeping the flashlight on, this method returns false. To check whether the rear camera supports this feature, use switchCamera to switch the camera first, then call this method.
   *  On iPads with system version 15, even if isCameraTorchSupported returns true, due to system limitations, you may still fail to turn on the flashlight using setCameraTorchOn.
   *
   * @returns
   * true : The device supports keeping the flashlight on. false : The device does not support keeping the flashlight on.
   */
  abstract isCameraTorchSupported(): boolean;

  /**
   * Checks whether the device supports manual focus.
   *
   * You must call this method after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @returns
   * true : The device supports manual focus. false : The device does not support manual focus.
   */
  abstract isCameraFocusSupported(): boolean;

  /**
   * Checks whether the device supports face auto-focus.
   *
   * This method must be called after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @returns
   * true : The device supports face auto-focus. false : The device does not support face auto-focus.
   */
  abstract isCameraAutoFocusFaceModeSupported(): boolean;

  /**
   * Sets the zoom factor of the camera.
   *
   * Some iOS devices have rear cameras composed of multiple lenses, such as dual cameras (wide-angle and ultra-wide-angle) or triple cameras (wide-angle, ultra-wide-angle, and telephoto). For such composite lenses with ultra-wide-angle capabilities, you can call setCameraCapturerConfiguration and set cameraFocalLengthType to CameraFocalLengthDefault (0) (standard lens), then call this method to set the camera zoom factor to a value less than 1.0 to achieve an ultra-wide-angle shooting effect.
   *  You must call this method after enableVideo. The setting takes effect after the camera is successfully turned on, that is, when the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @param factor The zoom factor of the camera. For devices that do not support ultra-wide-angle, the range is from 1.0 to the maximum zoom factor; for devices that support ultra-wide-angle, the range is from 0.5 to the maximum zoom factor. You can use getCameraMaxZoomFactor to get the maximum zoom factor supported by the device.
   *
   * @returns
   * If the method call succeeds: returns the set factor value.
   *  If the method call fails: returns a value < 0.
   */
  abstract setCameraZoomFactor(factor: number): number;

  /**
   * Enables/disables local face detection.
   *
   * @param enabled Whether to enable face detection: true : Enable face detection. false : (Default) Disable face detection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableFaceDetection(enabled: boolean): number;

  /**
   * Gets the maximum zoom factor supported by the camera.
   *
   * This method must be called after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @returns
   * The maximum zoom factor supported by the device camera.
   */
  abstract getCameraMaxZoomFactor(): number;

  /**
   * Sets the manual focus position and triggers focusing.
   *
   * You must call this method after enableVideo. The setting takes effect after the camera is successfully turned on, that is, when the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  After this method is successfully called, the local client triggers the onCameraFocusAreaChanged callback.
   *
   * @param positionX The X coordinate of the touch point relative to the view.
   * @param positionY The Y coordinate of the touch point relative to the view.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number;

  /**
   * Sets whether to turn on the flashlight.
   *
   * You must call this method after enableVideo. The setting takes effect after the camera is successfully turned on, that is, when the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @param isOn Whether to turn on the flashlight: true : Turn on the flashlight. false : (default) Turn off the flashlight.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setCameraTorchOn(isOn: boolean): number;

  /**
   * Enables or disables face auto focus.
   *
   * By default, the SDK disables face auto focus on Android and enables it on iOS. To configure face auto focus manually, call this method.
   *
   * @param enabled Whether to enable face auto focus: true : Enable face auto focus. false : Disable face auto focus.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;

  /**
   * Checks whether the device supports manual exposure.
   *
   * This method must be called after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *
   * @returns
   * true : The device supports manual exposure. false : The device does not support manual exposure.
   */
  abstract isCameraExposurePositionSupported(): boolean;

  /**
   * Sets the manual exposure position.
   *
   * You must call this method after enableVideo. The setting takes effect after the camera is successfully turned on, that is, when the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  After this method is successfully called, the local client triggers the onCameraExposureAreaChanged callback.
   *
   * @param positionXinView The X coordinate of the touch point relative to the view.
   * @param positionYinView The Y coordinate of the touch point relative to the view.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number;

  /**
   * Checks whether the current camera supports exposure adjustment.
   *
   * You must call this method after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  It is recommended to call this method before using setCameraExposureFactor to adjust the exposure factor, to check whether the current camera supports exposure adjustment.
   *  This method checks whether the currently used camera supports exposure adjustment, that is, the camera specified by setCameraCapturerConfiguration.
   *
   * @returns
   * true : The method call succeeds. false : The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract isCameraExposureSupported(): boolean;

  /**
   * Sets the exposure factor of the current camera.
   *
   * When the lighting in the shooting environment is insufficient or too bright, it can affect the quality of the captured video. To achieve better video effects, you can use this method to adjust the exposure factor of the camera.
   *  You must call this method after enableVideo. The setting takes effect after the camera is successfully turned on, that is, when the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  It is recommended that you call isCameraExposureSupported before using this method to check whether the current camera supports adjusting the exposure factor.
   *  When you call this method, it sets the exposure factor for the currently used camera, which is the one specified in setCameraCapturerConfiguration.
   *
   * @param factor The exposure factor of the camera. The default value is 0, which means using the camera's default exposure. The larger the value, the greater the exposure. If the video image is overexposed, you can lower the exposure factor; if the video image is underexposed and dark details are lost, you can increase the exposure factor. If the specified exposure factor exceeds the supported range of the device, the SDK automatically adjusts it to the supported range.
   * On Android, the range is [-20.0,20.0]; on iOS, the range is [-8.0,8.0].
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setCameraExposureFactor(factor: number): number;

  /**
   * Checks whether the device supports auto exposure.
   *
   * @returns
   * true : The device supports auto exposure. false : The device does not support auto exposure.
   */
  abstract isCameraAutoExposureFaceModeSupported(): boolean;

  /**
   * Enables or disables auto exposure.
   *
   * @param enabled Whether to enable auto exposure: true : Enable auto exposure. false : Disable auto exposure.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;

  /**
   * Sets the camera stabilization mode.
   *
   * Camera stabilization is disabled by default. You need to call this method to enable and set an appropriate stabilization mode. This method is for iOS only.
   *  Camera stabilization only takes effect when the video resolution is greater than 1280 × 720.
   *  The higher the stabilization level, the smaller the camera's field of view and the greater the camera delay. To ensure user experience, we recommend setting the mode parameter to CameraStabilizationModeLevel1.
   *
   * @param mode Camera stabilization mode. See CameraStabilizationMode.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setCameraStabilizationMode(mode: CameraStabilizationMode): number;

  /**
   * Sets the default audio route.
   *
   * Mobile devices typically have two audio routes: the earpiece at the top, which plays sound at a lower volume, and the speaker at the bottom, which plays sound at a higher volume. Setting the default audio route means specifying whether the system uses the earpiece or speaker to play audio when no external device is connected.
   * The system defaults vary by scenario:
   *  Voice call: Earpiece
   *  Voice live streaming: Speaker
   *  Video call: Speaker
   *  Video live streaming: Speaker Calling this API allows you to change the default audio route above. After setting the default audio route using this method, the actual audio route may change when external audio devices (wired or Bluetooth headsets) are connected. See [Audio Route](https://doc.shengwang.cn/doc/rtc/android/advanced-features/audio-route).
   *
   * @param defaultToSpeaker Whether to use the speaker as the default audio route: true : Set the default audio route to speaker. false : Set the default audio route to earpiece.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): number;

  /**
   * Enables or disables speakerphone playback.
   *
   * For default audio routes in different scenarios, see [Audio Route](https://doc.shengwang.cn/doc/rtc/android/advanced-features/audio-route).
   *  This method only sets the audio route used by the user in the current channel and does not affect the SDK's default audio route. If the user leaves the current channel and joins a new one, the SDK's default audio route will still be used.
   *  If the user uses external audio playback devices such as Bluetooth or wired headsets, this method has no effect, and audio will only be played through the external device. If multiple external devices are connected, audio will be played through the most recently connected device.
   *
   * @param speakerOn Whether to enable speakerphone playback: true : Enable. Audio route is speaker. false : Disable. Audio route is earpiece.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setEnableSpeakerphone(speakerOn: boolean): number;

  /**
   * Checks whether the speakerphone is enabled.
   *
   * @returns
   * true : The speakerphone is enabled, and audio is routed to the speaker. false : The speakerphone is not enabled, and audio is routed to a non-speaker device (earpiece, headset, etc.).
   */
  abstract isSpeakerphoneEnabled(): boolean;

  /**
   * Selects the audio route in communication volume mode.
   *
   * This method is used to switch the audio route from a Bluetooth headset to the earpiece, wired headset, or speaker in communication volume mode ([MODE_IN_COMMUNICATION](https://developer.android.google.cn/reference/kotlin/android/media/AudioManager?hl=en#mode_in_communication)). This method is for Android only.
   * When used together with setEnableSpeakerphone, it may cause conflicts. Agora recommends using setRouteInCommunicationMode alone.
   *
   * @param route The desired audio route:
   *  -1: The system default audio route.
   *  0: Headset with microphone.
   *  1: Earpiece.
   *  2: Headset without microphone.
   *  3: Built-in speaker.
   *  4: (Not supported) External speaker.
   *  5: Bluetooth headset.
   *  6: USB device.
   *
   * @returns
   * No practical meaning.
   */
  abstract setRouteInCommunicationMode(route: number): number;

  /**
   * Checks whether the camera supports Center Stage.
   *
   * Before calling enableCameraCenterStage to enable the Center Stage feature, you are advised to call this method to check whether the current device supports Center Stage. This method is only available on iOS.
   *
   * @returns
   * true : The current camera supports Center Stage. false : The current camera does not support Center Stage.
   */
  abstract isCameraCenterStageSupported(): boolean;

  /**
   * Enables or disables the Center Stage feature.
   *
   * Center Stage is disabled by default. You need to call this method to enable it. To disable the feature, call this method again and set enabled to false. This method is for iOS only.
   * Because this feature requires high device performance, you need to use it on the following or higher-end devices:
   *  iPad:
   *  12.9-inch iPad Pro (5th generation)
   *  11-inch iPad Pro (3rd generation)
   *  iPad (9th generation)
   *  iPad mini (6th generation)
   *  iPad Air (5th generation)
   *  2020 M1 MacBook Pro 13" + iPhone 11 (using iPhone as an external camera for MacBook) Agora recommends calling isCameraCenterStageSupported to check whether the current device supports Center Stage before enabling this feature.
   *
   * @param enabled Whether to enable the Center Stage feature: true : Enable Center Stage. false : Disable Center Stage.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableCameraCenterStage(enabled: boolean): number;

  /**
   * @ignore
   */
  abstract getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[];

  /**
   * Sets the SDK’s operation permissions on the Audio Session.
   *
   * By default, both the SDK and the app have permission to operate the Audio Session. If you want only the app to operate the Audio Session, you can call this method to restrict the SDK’s permission.
   * You can call this method before or after joining a channel. Once this method is called to restrict the SDK’s operation permission, the restriction takes effect when the SDK attempts to change the Audio Session.
   *  This method applies only to the iOS platform.
   *  This method does not restrict the app’s permission to operate the Audio Session.
   *
   * @param restriction The SDK’s operation permission on the Audio Session. See AudioSessionOperationRestriction. This parameter is a bit mask, and each bit corresponds to a permission.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number;

  /**
   * @ignore
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
   *
   * After calling this method, you can get whether the audio device supports ultra-low latency capture and playback.
   *  This method can be called before or after joining a channel.
   *
   * @returns
   * A DeviceInfo object containing the audio device information.
   *  Non-null: The method call succeeds.
   *  Null: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getAudioDeviceInfo(): DeviceInfo;

  /**
   * @ignore
   */
  abstract startScreenCaptureByWindowId(
    windowId: number,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * Sets the content type of screen sharing.
   *
   * The SDK optimizes the sharing experience using different algorithms based on the content type. If you do not call this method, the SDK defaults the screen sharing content type to ContentHintNone, meaning no specific content type. This method can be called before or after starting screen sharing.
   *
   * @param contentHint The content type of screen sharing. See VideoContentHint.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter.
   *  -8: Invalid screen sharing state. This may occur if you are already sharing another screen or window. Try calling stopScreenCapture to stop the current sharing, then restart screen sharing.
   */
  abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

  /**
   * Updates the screen capture region.
   *
   * Call this method after screen sharing or window sharing is enabled.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The parameter passed in is invalid.
   *  -8: The screen sharing state is invalid. This may be because you are already sharing another screen or window. Try calling stopScreenCapture to stop the current sharing and start screen sharing again.
   */
  abstract updateScreenCaptureRegion(regionRect: Rectangle): number;

  /**
   * Updates the parameter configuration for screen capture.
   *
   * Call this method after screen sharing or window sharing is enabled.
   *
   * @param captureParams Encoding parameter configuration for screen sharing. See ScreenCaptureParameters2. The video properties of the screen sharing stream only need to be set through this parameter and are not related to setVideoEncoderConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The parameter passed in is invalid.
   *  -8: The screen sharing state is invalid. This may be because you are already sharing another screen or window. Try calling stopScreenCapture to stop the current sharing and start screen sharing again.
   */
  abstract updateScreenCaptureParameters(
    captureParams: ScreenCaptureParameters
  ): number;

  /**
   * Starts screen capture.
   *
   * The billing standard for screen sharing streams is based on the dimensions value in ScreenVideoParameters :
   *  If not specified, billing is based on 1280 × 720.
   *  If specified, billing is based on the value you provide.
   *  On iOS, screen sharing is only supported on iOS 12.0 and later.
   *  On iOS, if you use custom audio capture instead of SDK audio capture, to prevent screen sharing from stopping when the app goes to the background, it is recommended to implement a keep-alive mechanism.
   *  On iOS, this feature requires high device performance. It is recommended to use it on iPhone X or later.
   *  On iOS, this method depends on the screen sharing dynamic library AgoraReplayKitExtension.xcframework. Removing this library will cause screen sharing to fail.
   *  On Android, if the user does not grant screen capture permission to the app, the SDK triggers the onPermissionError(2) callback.
   *  On Android 9 and later, to prevent the system from killing the app when it goes to the background, it is recommended to add the foreground service permission android.permission.FOREGROUND_SERVICE in /app/Manifests/AndroidManifest.xml.
   *  Due to Android performance limitations, screen sharing is not supported on Android TV.
   *  Due to Android system limitations, when using Huawei phones for screen sharing, to avoid crashes, do not change the video encoding resolution during sharing.
   *  Due to Android system limitations, some Xiaomi phones do not support capturing system audio during screen sharing.
   *  To improve the success rate of capturing system audio during screen sharing, it is recommended to set the audio scenario to AudioScenarioGameStreaming using the setAudioScenario method before joining the channel.
   *
   * @param captureParams The configuration for screen sharing encoding parameters. See ScreenCaptureParameters2.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2 (iOS): Parameter is null.
   *  -2 (Android): System version too low. Make sure the Android API level is at least 21.
   *  -3 (Android): Cannot capture system audio. Make sure the Android API level is at least 29.
   */
  abstract startScreenCapture(captureParams: ScreenCaptureParameters2): number;

  /**
   * Updates the parameter configuration for screen capture.
   *
   * If system audio is not captured when screen sharing is enabled and you want to update the parameter configuration to publish system audio, follow these steps:
   *  Call this method and set captureAudio to true.
   *  Call updateChannelMediaOptions and set publishScreenCaptureAudio to true to publish the audio captured from the screen.
   *  This method is applicable to Android and iOS only.
   *  On iOS, screen sharing is supported on iOS 12.0 and later.
   *
   * @param captureParams Encoding parameter configuration for screen sharing. See ScreenCaptureParameters2.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter passed in is invalid.
   *  -8: The screen sharing state is invalid. This may be because you are already sharing another screen or window. Try calling stopScreenCapture to stop the current sharing and start screen sharing again.
   */
  abstract updateScreenCapture(captureParams: ScreenCaptureParameters2): number;

  /**
   * Queries the maximum frame rate supported by the device for screen sharing.
   *
   * @returns
   * If the method call succeeds, returns the maximum frame rate supported by the device. See ScreenCaptureFramerateCapability.
   *  <0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract queryScreenCaptureCapability(): number;

  /**
   * Queries the focal length capabilities supported by the camera.
   *
   * To enable wide-angle or ultra-wide-angle camera modes, it is recommended to call this method first to check whether the device supports the corresponding focal length capabilities. Then, based on the query result, call setCameraCapturerConfiguration to adjust the camera's focal length configuration for optimal capture performance.
   *
   * @returns
   * Returns an object with the following properties: focalLengthInfos : An array of FocalLengthInfo objects that include the camera's direction and focal length type. size : The number of focal length entries actually returned.
   */
  abstract queryCameraFocalLengthCapability(): {
    focalLengthInfos: FocalLengthInfo[];
    size: number;
  };

  /**
   * Sets an external MediaProjection to capture screen video streams.
   *
   * After successfully calling this method, the external MediaProjection you set will replace the MediaProjection obtained by the SDK to capture screen video streams.
   * When screen sharing stops or IRtcEngine is destroyed, the SDK automatically releases the MediaProjection. This method is for Android only.
   * You must obtain the MediaProjection permission before calling this method.
   *
   * @param mediaProjection A [MediaProjection](https://developer.android.com/reference/android/media/projection/MediaProjection) object used to capture screen video streams.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setExternalMediaProjection(mediaProjection: any): number;

  /**
   * Sets the screen sharing scenario.
   *
   * When starting screen or window sharing, you can call this method to set the screen sharing scenario. The SDK adjusts the shared video quality based on the scenario you set. Agora recommends calling this method before joining the channel.
   *
   * @param screenScenario The screen sharing scenario. See ScreenScenarioType.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setScreenCaptureScenario(screenScenario: ScreenScenarioType): number;

  /**
   * Stops screen capture.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopScreenCapture(): number;

  /**
   * Get the call ID.
   *
   * Each time the client joins a channel, a corresponding callId is generated to identify the call session. You can call this method to obtain the callId parameter, then pass it to methods like rate and complain.
   *
   * @returns
   * Returns the current call ID if the method call succeeds.
   *  Returns an empty string if the method call fails.
   */
  abstract getCallId(): string;

  /**
   * Rates a call.
   *
   * You need to call this method after leaving the channel.
   *
   * @param callId Call ID. You can get this parameter by calling getCallId.
   * @param rating Rating for the call, from 1 (lowest) to 5 (highest).
   * @param description Description of the call. The length must be less than 800 bytes.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -1: General error (not classified).
   *  -2: Invalid parameter.
   */
  abstract rate(callId: string, rating: number, description: string): number;

  /**
   * Report call quality issues.
   *
   * This method allows users to report call quality issues. It must be called after leaving the channel.
   *
   * @param callId Call ID. You can obtain this by calling getCallId.
   * @param description Description of the call. The length should be less than 800 bytes.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -1: General error (not specifically classified).
   *  -2: Invalid parameter.
   *  -7: Method called before IRtcEngine is initialized.
   */
  abstract complain(callId: string, description: string): number;

  /**
   * Starts RTMP streaming without transcoding.
   *
   * Agora recommends using the more advanced server-side streaming feature. See [Implement server-side streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * Call this method to push live audio and video streams to the specified RTMP streaming URL. This method can push to only one URL at a time. To push to multiple URLs, call this method multiple times.
   * After calling this method, the SDK triggers the onRtmpStreamingStateChanged callback locally to report the streaming status.
   *  Call this method after joining a channel.
   *  Only hosts in live streaming scenarios can call this method.
   *  If the streaming fails and you want to restart it, make sure to call stopRtmpStream first before calling this method again. Otherwise, the SDK will return the same error code as the previous failed attempt.
   *
   * @param url The RTMP or RTMPS streaming URL. The maximum length is 1024 bytes. Chinese characters and special characters are not supported.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -2: Invalid URL or transcoding parameter. Check your URL or parameter settings.
   *  -7: SDK not initialized before calling this method.
   *  -19: The RTMP streaming URL is already in use. Use a different URL.
   */
  abstract startRtmpStreamWithoutTranscoding(url: string): number;

  /**
   * Starts pushing media streams to a CDN and sets the transcoding configuration.
   *
   * Agora recommends using the more comprehensive server-side CDN streaming service. See [Implement server-side CDN streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * Call this method to push live audio and video streams to the specified CDN streaming URL and set the transcoding configuration. This method can only push media streams to one URL at a time. To push to multiple URLs, call this method multiple times.
   * Each push stream represents a streaming task. The maximum number of concurrent tasks is 200 by default, which means you can run up to 200 streaming tasks simultaneously under one Agora project. To increase the quota, [contact technical support](https://ticket.shengwang.cn/).
   * After calling this method, the SDK triggers the onRtmpStreamingStateChanged callback locally to report the streaming status.
   *  Call this method after joining a channel.
   *  Only hosts in a live streaming scenario can call this method.
   *  If the streaming fails and you want to restart it, you must call stopRtmpStream before calling this method again. Otherwise, the SDK returns the same error code as the previous failure.
   *
   * @param url The CDN streaming URL. The format must be RTMP or RTMPS. The character length must not exceed 1024 bytes. Chinese characters and other special characters are not supported.
   * @param transcoding The transcoding configuration for CDN streaming. See LiveTranscoding.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The URL or transcoding parameter is invalid. Check your URL or parameter settings.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The CDN streaming URL is already in use. Use another CDN streaming URL.
   */
  abstract startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): number;

  /**
   * Updates the transcoding configuration for CDN streaming.
   *
   * Agora recommends using the more comprehensive server-side CDN streaming service. See [Implement server-side CDN streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * After enabling transcoding streaming, you can dynamically update the transcoding configuration based on your scenario. After the update, the SDK triggers the onTranscodingUpdated callback.
   *
   * @param transcoding The transcoding configuration for CDN streaming. See LiveTranscoding.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract updateRtmpTranscoding(transcoding: LiveTranscoding): number;

  /**
   * Starts local video compositing.
   *
   * After calling this method, you can merge multiple video streams locally into a single stream. For example, merge video from the camera, screen sharing, media player, remote users, video files, images, etc., into one stream, and then publish the composited stream to the channel.
   *  Local compositing consumes significant CPU resources. Agora recommends enabling this feature on high-performance devices.
   *  If you need to composite locally captured video streams, the SDK supports the following combinations:
   *  On Android and iOS, up to 2 camera video streams (requires device support for dual cameras or external cameras) + 1 screen sharing stream.
   *  When configuring compositing, ensure that the camera video stream capturing the portrait has a higher layer index than the screen sharing stream. Otherwise, the portrait may be covered and not appear in the final composited stream.
   *
   * @param config Local compositing configuration. See LocalTranscoderConfiguration.
   *  The maximum resolution for each video stream in the compositing is 4096 × 2160. Exceeding this limit will cause the compositing to fail.
   *  The maximum resolution of the composited video stream is 4096 × 2160.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startLocalVideoTranscoder(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * Updates the local video compositing configuration.
   *
   * After calling startLocalVideoTranscoder, if you want to update the local video compositing configuration, call this method. If you want to update the type of local video source used for compositing, such as adding a second camera or screen capture video, you need to call this method after startCameraCapture or startScreenCapture.
   *
   * @param config Configuration for local video compositing. See LocalTranscoderConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract updateLocalTranscoderConfiguration(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * Stops CDN streaming.
   *
   * Agora recommends using the more comprehensive server-side CDN streaming service. See [Implement server-side CDN streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * Call this method to stop the live streaming to the specified CDN streaming URL. This method can only stop streaming to one URL at a time. To stop streaming to multiple URLs, call this method multiple times.
   * After calling this method, the SDK triggers the onRtmpStreamingStateChanged callback locally to report the streaming status.
   *
   * @param url The CDN streaming URL. The format must be RTMP or RTMPS. The character length must not exceed 1024 bytes. Chinese characters and other special characters are not supported.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopRtmpStream(url: string): number;

  /**
   * Stops local video compositing.
   *
   * After calling startLocalVideoTranscoder, if you want to stop local video compositing, call this method.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopLocalVideoTranscoder(): number;

  /**
   * Starts local audio mixing.
   *
   * This method allows you to mix multiple local audio streams into a single stream. For example, you can mix audio from the local microphone, media player, sound card, and remote users into one audio stream and publish it to the channel.
   *  To mix locally captured audio, set publishMixedAudioTrack in ChannelMediaOptions to true to publish the mixed audio stream to the channel.
   *  To mix remote audio streams, ensure that the remote streams are published in the channel and have been subscribed to. To ensure audio quality, it is recommended that the number of audio streams involved in local mixing does not exceed 10.
   *
   * @param config Configuration for local audio mixing. See LocalAudioMixerConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -7: IRtcEngine object is not initialized. You must initialize the IRtcEngine object before calling this method.
   */
  abstract startLocalAudioMixer(config: LocalAudioMixerConfiguration): number;

  /**
   * Updates the configuration for local audio mixing.
   *
   * After calling startLocalAudioMixer, if you want to update the configuration for local audio mixing, call this method. To ensure audio quality, it is recommended that the number of audio streams participating in local mixing does not exceed 10.
   *
   * @param config Configuration for local audio mixing. See LocalAudioMixerConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -7: The IRtcEngine object is not initialized. You need to successfully initialize the IRtcEngine object before calling this method.
   */
  abstract updateLocalAudioMixerConfiguration(
    config: LocalAudioMixerConfiguration
  ): number;

  /**
   * Stops local audio mixing.
   *
   * After calling startLocalAudioMixer, if you want to stop local audio mixing, call this method.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -7: The IRtcEngine object is not initialized. You need to successfully initialize the IRtcEngine object before calling this method.
   */
  abstract stopLocalAudioMixer(): number;

  /**
   * Starts video capture using the camera.
   *
   * Call this method to start multiple camera captures simultaneously by specifying sourceType. On iOS, to enable multiple camera captures, you must call enableMultiCamera and set enabled to true before calling this method.
   *
   * @param sourceType Type of video source. See VideoSourceType.
   *  iOS devices support up to 2 video streams from camera capture (requires devices with multiple cameras or external camera support).
   *  Android devices support up to 4 video streams from camera capture (requires devices with multiple cameras or external camera support).
   * @param config Video capture configuration. See CameraCapturerConfiguration. On iOS, this parameter has no effect. Use the config parameter in enableMultiCamera to configure video capture.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startCameraCapture(
    sourceType: VideoSourceType,
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Stops capturing video from the camera.
   *
   * After calling startCameraCapture to start one or more camera video streams, you can call this method and specify sourceType to stop one or more of the camera video captures. On iOS, to stop multiple camera captures, you need to call this method first, then call enableMultiCamera and set enabled to false.
   * If you are using the local composite layout feature, calling this method to stop video capture from the first camera will interrupt the local composite layout.
   *
   * @param sourceType The type of video source. See VideoSourceType.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopCameraCapture(sourceType: VideoSourceType): number;

  /**
   * Sets the rotation angle of the captured video.
   *
   * You must call this method after enableVideo. The setting takes effect after the camera is successfully turned on, that is, when the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  If the video capture device does not support gravity sensing, you can call this method to manually adjust the rotation angle of the captured video frame.
   *
   * @param type The type of video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Gets the current network connection state.
   *
   * @returns
   * The current network connection state. See ConnectionStateType.
   */
  abstract getConnectionState(): ConnectionStateType;

  /**
   * Adds a primary callback event.
   *
   * The interface class IRtcEngineEventHandler is used by the SDK to send callback event notifications to the app. The app obtains SDK event notifications by inheriting the methods of this interface class.
   * All methods of the interface class have default (empty) implementations. The app can inherit only the events it cares about as needed. In the callback methods, the app should not perform time-consuming operations or call APIs that may cause blocking (such as sendStreamMessage),
   * otherwise it may affect the operation of the SDK.
   *
   * @param eventHandler The callback event to be added. See IRtcEngineEventHandler.
   *
   * @returns
   * true : The method call succeeds. false : The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

  /**
   * Removes the specified callback event.
   *
   * This method removes all previously added callback events.
   *
   * @param eventHandler The callback event to be removed. See IRtcEngineEventHandler.
   *
   * @returns
   * true : The method call succeeds. false : The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Enable or disable built-in encryption.
   *
   * After the user leaves the channel, the SDK automatically disables encryption. To re-enable encryption, you need to call this method before the user joins the channel again.
   *  All users in the same channel must use the same encryption mode and key when calling this method.
   *  If built-in encryption is enabled, you cannot use the CDN streaming feature.
   *
   * @param enabled Whether to enable built-in encryption: true : Enable built-in encryption. false : (default) Disable built-in encryption.
   * @param config Configure the built-in encryption mode and key. See EncryptionConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure
   *  -2: Invalid parameter. You need to re-specify the parameter.
   *  -4: Incorrect encryption mode or failed to load external encryption library. Check if the enum value is correct or reload the external encryption library.
   *  -7: SDK not initialized. You must create the IRtcEngine object and complete initialization before calling the API.
   */
  abstract enableEncryption(enabled: boolean, config: EncryptionConfig): number;

  /**
   * Creates a data stream.
   *
   * Within the lifecycle of IRtcEngine, each user can create up to 5 data streams. The data streams are destroyed when leaving the channel. You need to recreate them to use again.
   *
   * @param config Data stream configuration. See DataStreamConfig.
   *
   * @returns
   * The ID of the created data stream: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract createDataStream(config: DataStreamConfig): number;

  /**
   * Sends a data stream.
   *
   * After calling createDataStream, you can call this method to send data stream messages to all users in the channel.
   * The SDK imposes the following restrictions on this method:
   *  Each client in the channel can have up to 5 data channels simultaneously, and the total sending bitrate of all data channels is limited to 30 KB/s.
   *  Each data channel can send up to 60 packets per second, with a maximum size of 1 KB per packet. After the method is successfully called, the remote end triggers the onStreamMessage callback, where the remote user can retrieve the received stream message. If the call fails, the remote end triggers the onStreamMessageError callback.
   *  This method must be called after joining a channel and after creating a data channel using createDataStream.
   *  This method applies to broadcaster users only.
   *
   * @param streamId Data stream ID. Obtained via createDataStream.
   * @param data Data to be sent.
   * @param length Length of the data.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number;

  /**
   * @ignore
   */
  abstract sendRdtMessage(
    uid: number,
    type: RdtStreamType,
    data: string,
    length: number
  ): number;

  /**
   * @ignore
   */
  abstract sendMediaControlMessage(
    uid: number,
    data: string,
    length: number
  ): number;

  /**
   * Adds a local video watermark.
   *
   * Deprecated Deprecated: This method is deprecated. Use addVideoWatermarkWithConfig instead. This method adds a PNG image as a watermark to the local published live video stream. Users in the same live channel, audience of the CDN live stream, and capture devices can all see or capture the watermark image. Currently, only one watermark can be added to the live video stream. A newly added watermark replaces the previous one.
   * The watermark coordinates depend on the settings in the setVideoEncoderConfiguration method:
   *  If the video encoding orientation (OrientationMode) is fixed to landscape or landscape in adaptive mode, landscape coordinates are used for the watermark.
   *  If the video encoding orientation (OrientationMode) is fixed to portrait or portrait in adaptive mode, portrait coordinates are used.
   *  When setting the watermark coordinates, the image area of the watermark must not exceed the video dimensions set in the setVideoEncoderConfiguration method. Otherwise, the exceeding part will be cropped.
   *  You must call this method after calling enableVideo.
   *  If you only want to add a watermark for CDN streaming, you can use this method or startRtmpStreamWithTranscoding.
   *  The watermark image must be in PNG format. This method supports all pixel formats of PNG: RGBA, RGB, Palette, Gray, and Alpha_gray.
   *  If the size of the PNG image to be added does not match the size you set in this method, the SDK will scale or crop the PNG image to match the setting.
   *  If local video is set to mirror mode, the local watermark will also be mirrored. To avoid the watermark being mirrored when local users view the local video, it is recommended not to use both mirror and watermark features for local video. Implement the local watermark feature at the application level.
   *
   * @param watermarkUrl The local path of the watermark image to be added. This method supports adding watermark images from local absolute/relative paths.
   * @param options Settings for the watermark image to be added. See WatermarkOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): number;

  /**
   * Removes the watermark image from the local video.
   *
   * Since Available since v4.6.2. This method removes a previously added watermark image from the local video stream based on the specified unique ID.
   *
   * @param id The ID of the watermark to be removed. This value must match the ID used when adding the watermark.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract removeVideoWatermark(id: string): number;

  /**
   * Removes added video watermarks.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Enable interoperability with the Web SDK (live broadcast only).
   *
   * Deprecated Deprecated: This method is deprecated. The SDK automatically enables interoperability with the Web SDK, so you do not need to call this method. This method enables or disables interoperability with the Web SDK. If there are users joining the channel via the Web SDK, make sure to call this method. Otherwise, Web users may see a black screen from the Native side.
   * This method is applicable only in live broadcast scenarios. In communication scenarios, interoperability is enabled by default.
   *
   * @param enabled Whether to enable interoperability with the Web SDK: true : Enable interoperability. false : (default) Disable interoperability.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableWebSdkInteroperability(enabled: boolean): number;

  /**
   * Sends a custom report message.
   *
   * Agora provides custom data reporting and analytics services. This service is currently in a free beta period. During the beta, you can send up to 10 custom data messages within 6 seconds. Each message must not exceed 256 bytes, and each string must not exceed 100 bytes. To try this service, please [contact sales](https://www.shengwang.cn/contact-sales/) to enable it and agree on the custom data format.
   */
  abstract sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): number;

  /**
   * Registers a media metadata observer to receive or send metadata.
   *
   * You need to implement the IMetadataObserver class yourself and specify the metadata type in this method. This method allows you to add synchronized metadata to the video stream for interactive live streaming, such as sending shopping links, e-coupons, and online quizzes. Call this method before joinChannel.
   *
   * @param observer The metadata observer. See IMetadataObserver.
   * @param type The metadata type. Currently, only VideoMetadata is supported. See MetadataType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /**
   * Unregisters the media metadata observer.
   *
   * @param observer The metadata observer. See IMetadataObserver.
   * @param type The metadata type. Currently, only VideoMetadata is supported. See MetadataType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
    uid: number,
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
    uid: number,
    location: string
  ): number;

  /**
   * Enables or disables AI noise reduction and sets the noise reduction mode.
   *
   * You can call this method to enable AI noise reduction. This feature intelligently detects and reduces various steady-state and non-steady-state background noises while ensuring voice quality, making the voice clearer.
   * Steady-state noise refers to noise with the same frequency at any point in time. Common steady-state noises include:
   *  TV noise
   *  Air conditioner noise
   *  Factory machinery noise, etc. Non-steady-state noise refers to noise that changes rapidly over time. Common non-steady-state noises include:
   *  Thunder
   *  Explosions
   *  Cracking sounds, etc.
   *  This method depends on the AI noise reduction dynamic library. Removing the dynamic library will cause the feature to fail. For the name of the AI noise reduction dynamic library, see [Plugin List](https://doc.shengwang.cn/doc/rtc/rn/best-practice/reduce-app-size#%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8).
   *  Currently, it is not recommended to enable this feature on devices running Android 6.0 or below.
   *
   * @param enabled Whether to enable AI noise reduction: true : Enable AI noise reduction. false : (Default) Disable AI noise reduction.
   * @param mode Noise reduction mode. See AudioAinsMode.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAINSMode(enabled: boolean, mode: AudioAinsMode): number;

  /**
   * Registers the local user's User Account.
   *
   * This method registers a User Account for the local user. After successful registration, the User Account can be used to identify the local user and join channels.
   * This method is optional. If you want users to join channels using a User Account, you can implement it using either of the following approaches:
   *  Call registerLocalUserAccount to register the account, then call joinChannelWithUserAccount to join the channel. This can reduce the time to join the channel.
   *  Directly call joinChannelWithUserAccount to join the channel.
   *  Ensure the userAccount set in this method is unique within the channel.
   *  To ensure communication quality, make sure all users in a channel use the same type of identifier. That is, all users in the same channel must use either UID or User Account. If users join via the Web SDK, ensure they also use the same identifier type.
   *
   * @param appId The App ID of your project registered in the console.
   * @param userAccount The user's User Account. This parameter identifies the user in the real-time audio and video interaction channel. You need to set and manage the User Account yourself and ensure that each user in the same channel has a unique User Account. This parameter is required, must not exceed 255 bytes, and cannot be null. The supported character set includes 89 characters:
   *  26 lowercase English letters a-z
   *  26 uppercase English letters A-Z
   *  10 digits 0-9
   *  space
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract registerLocalUserAccount(appId: string, userAccount: string): number;

  /**
   * Joins a channel using a User Account and Token, and sets channel media options.
   *
   * If you have not called registerLocalUserAccount to register a User Account before calling this method, the SDK automatically creates one for you. Calling registerLocalUserAccount before this method can reduce the time it takes to join the channel.
   * After successfully joining a channel, the user subscribes to all other users' audio and video streams by default, which results in usage and affects billing. If you want to unsubscribe, you can do so by calling the corresponding mute methods. To ensure communication quality, make sure the same type of user identifier is used in the channel. That is, use either UID or User Account consistently within the same channel. If users join the channel using the Web SDK, make sure they use the same identifier type.
   *  This method only supports joining one channel at a time.
   *  Apps with different App IDs cannot communicate with each other.
   *  Before joining a channel, make sure the App ID used to generate the Token is the same as the one used in the initialize method to initialize the engine, otherwise joining the channel with the Token will fail.
   *
   * @param token A dynamic key generated on your server for authentication. See [Use Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   *  (Recommended) If your project enables the security mode, i.e., uses APP ID + Token for authentication, this parameter is required.
   *  If your project only enables debug mode, i.e., uses only the APP ID for authentication, you can join the channel without a Token. The user will automatically leave the channel 24 hours after successfully joining.
   *  If you need to join multiple channels simultaneously or switch channels frequently, Agora recommends using a wildcard Token to avoid requesting a new Token from the server each time. See [Use Wildcard Token](https://doc.shengwang.cn/doc/rtc/rn/best-practice/wildcard-token).
   * @param userAccount User Account. This parameter identifies the user in the real-time audio and video interaction channel. You must set and manage the User Account yourself and ensure it is unique within the same channel. This parameter is required, must not exceed 255 bytes, and cannot be null. Supported character set (89 characters total):
   *  26 lowercase English letters a-z
   *  26 uppercase English letters A-Z
   *  10 digits 0-9
   *  Space
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param options Channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter. For example, an invalid Token is used, uid is not an integer, or a ChannelMediaOptions member is invalid. You need to provide valid parameters and rejoin the channel.
   *  -3: IRtcEngine object initialization failed. You need to reinitialize the IRtcEngine object.
   *  -7: IRtcEngine object is not initialized. You must initialize the IRtcEngine object before calling this method.
   *  -8: Internal state error of the IRtcEngine object. Possible reason: startEchoTest was called to start an echo test, but stopEchoTest was not called before calling this method. You must call stopEchoTest before this method.
   *  -17: Join channel request is rejected. Possible reason: the user is already in the channel. Use the onConnectionStateChanged callback to check if the user is in the channel. Do not call this method again unless you receive the ConnectionStateDisconnected (1) state.
   *  -102: Invalid channel name. You must provide a valid channel name in channelId and rejoin the channel.
   *  -121: Invalid user ID. You must provide a valid user ID in uid and rejoin the channel.
   */
  abstract joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number;

  /**
   * Joins a channel using a User Account and Token, and sets channel media options.
   *
   * Before calling this method, if you have not called registerLocalUserAccount to register a User Account, the SDK automatically creates one for you when you join the channel. Calling registerLocalUserAccount before this method shortens the time needed to join the channel.
   * After successfully joining a channel, the user subscribes to all remote users' audio and video streams by default, which incurs usage and affects billing. To unsubscribe, you can set the options parameter or call the corresponding mute methods. To ensure communication quality, make sure all users in the channel use the same type of user identity. That is, either UID or User Account must be used consistently within the same channel. If users join via the Web SDK, ensure they use the same identity type.
   *  This method only supports joining one channel at a time.
   *  Apps with different App IDs cannot communicate with each other.
   *  Before joining a channel, ensure the App ID used to generate the Token is the same as the one used to initialize the engine with initialize, otherwise joining the channel with Token will fail.
   *
   * @param token A dynamic key generated on your server for authentication. See [Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   *  (Recommended) If your project has enabled the security mode using APP ID + Token for authentication, this parameter is required.
   *  If your project is in debug mode using only APP ID for authentication, you can join the channel without a Token. You will automatically leave the channel 24 hours after joining.
   *  If you need to join multiple channels or switch frequently, Agora recommends using a wildcard Token to avoid requesting a new Token from your server each time. See [Using Wildcard Token](https://doc.shengwang.cn/doc/rtc/rn/best-practice/wildcard-token).
   * @param userAccount The user's User Account. This parameter identifies the user in the real-time audio and video channel. You must set and manage the User Account yourself and ensure that each user in the same channel has a unique User Account. This parameter is required and must not exceed 255 bytes or be null. Supported character set (89 characters total):
   *  26 lowercase letters a-z
   *  26 uppercase letters A-Z
   *  10 digits 0-9
   *  Space
   *  "!" "#" "$" "%" "&" "(" ")" "+" "-" ":" ";" "<" "=" "." ">" "?" "@" "[" "]" "^" "_" "{" "}" "|" "~" ","
   * @param options Channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter. For example, the Token is invalid, the uid is not an integer, or ChannelMediaOptions contains invalid values. Provide valid parameters and rejoin the channel.
   *  -3: IRtcEngine initialization failed. Reinitialize the IRtcEngine object.
   *  -7: IRtcEngine is not initialized. Initialize IRtcEngine before calling this method.
   *  -8: Internal state error of IRtcEngine. Possible reason: startEchoTest was called but stopEchoTest was not called before joining the channel. Call stopEchoTest before this method.
   *  -17: Join channel request rejected. Possible reason: the user is already in the channel. Use the onConnectionStateChanged callback to check if the user is in the channel. Do not call this method again unless the state is ConnectionStateDisconnected (1).
   *  -102: Invalid channel name. Provide a valid channelId and rejoin the channel.
   *  -121: Invalid user ID. Provide a valid uid and rejoin the channel.
   */
  abstract joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: ChannelMediaOptions
  ): number;

  /**
   * Gets user information by User Account.
   *
   * After a remote user joins the channel, the SDK obtains the UID and User Account of the remote user, then caches a mapping table containing the UID and User Account of the remote user, and triggers the onUserInfoUpdated callback locally. After receiving the callback, call this method and pass in the User Account to get the UserInfo object containing the specified user's UID.
   *
   * @param userAccount User Account.
   *
   * @returns
   * The UserInfo object, if the method call succeeds. null, if the method call fails.
   */
  abstract getUserInfoByUserAccount(userAccount: string): UserInfo;

  /**
   * Gets user information by UID.
   *
   * After a remote user joins the channel, the SDK obtains the UID and User Account of the remote user, then caches a mapping table containing the UID and User Account of the remote user, and triggers the onUserInfoUpdated callback locally. After receiving the callback, call this method and pass in the UID to get the UserInfo object containing the specified user's User Account.
   *
   * @param uid User ID.
   *
   * @returns
   * The UserInfo object, if the method call succeeds. null, if the method call fails.
   */
  abstract getUserInfoByUid(uid: number): UserInfo;

  /**
   * Starts or updates cross-channel media stream forwarding.
   *
   * The first successful call to this method starts media stream forwarding across channels. To forward streams to multiple destination channels or to leave a forwarding channel, you can call this method again to add or remove destination channels. This feature supports forwarding media streams to up to 6 destination channels.
   * After successfully calling this method, the SDK triggers the onChannelMediaRelayStateChanged callback to report the current cross-channel media stream forwarding state. Common states include:
   *  If the onChannelMediaRelayStateChanged callback reports RelayStateRunning (2) and RelayOk (0), it means the SDK has started forwarding media streams between the source and destination channels.
   *  If the callback reports RelayStateFailure (3), it means an error occurred in cross-channel media stream forwarding.
   *  Call this method after successfully joining a channel.
   *  In a live streaming scenario, only users with the broadcaster role can call this method.
   *  To use the cross-channel media stream forwarding feature, you need to [contact technical support](https://ticket.shengwang.cn/) to enable it.
   *  This feature does not support string-type UIDs.
   *
   * @param configuration Configuration for cross-channel media stream forwarding. See ChannelMediaRelayConfiguration.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -1: General error (not specifically classified).
   *  -2: Invalid parameter.
   *  -8: Internal state error. Possibly because the user role is not broadcaster.
   */
  abstract startOrUpdateChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /**
   * Stops the media stream relay across channels. Once stopped, the host leaves all destination channels.
   *
   * After a successful call, the SDK triggers the onChannelMediaRelayStateChanged callback. If it reports RelayStateIdle (0) and RelayOk (0), it indicates that the media stream relay has stopped. If the method call fails, the SDK triggers the onChannelMediaRelayStateChanged callback and reports error codes RelayErrorServerNoResponse (2) or RelayErrorServerConnectionLost (8). You can call the leaveChannel method to leave the channel, and the media stream relay will automatically stop.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -5: The method call is rejected. There is no ongoing media stream relay across channels.
   */
  abstract stopChannelMediaRelay(): number;

  /**
   * Pauses media stream forwarding to all destination channels.
   *
   * After starting media stream forwarding across channels, you can call this method to pause forwarding to all channels. To resume forwarding, call the resumeAllChannelMediaRelay method. You must call this method after calling startOrUpdateChannelMediaRelay to start media stream forwarding across channels.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -5: This method call was rejected. No ongoing cross-channel media stream forwarding exists.
   */
  abstract pauseAllChannelMediaRelay(): number;

  /**
   * Resumes media stream forwarding to all destination channels.
   *
   * After calling the pauseAllChannelMediaRelay method, you can call this method to resume media stream forwarding to all destination channels. You must call this method after pauseAllChannelMediaRelay.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -5: This method call was rejected. No paused cross-channel media stream forwarding exists.
   */
  abstract resumeAllChannelMediaRelay(): number;

  /**
   * Sets the audio encoding profile for direct CDN streaming from the host.
   *
   * Deprecated Deprecated since v4.6.2. This method is only effective for audio collected from the microphone or custom audio sources, i.e., when publishMicrophoneTrack or publishCustomAudioTrack is set to true in DirectCdnStreamingMediaOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): number;

  /**
   * Sets the video encoding profile for direct CDN streaming from the host.
   *
   * Deprecated Deprecated since v4.6.2. This method is only effective for video collected from the camera, screen sharing, or custom video sources, i.e., when publishCameraTrack or publishCustomVideoTrack is set to true in DirectCdnStreamingMediaOptions.
   * If the resolution you set exceeds the capabilities of your camera device, the SDK adapts the resolution to the closest supported value with the same aspect ratio for capturing, encoding, and streaming. You can use the onDirectCdnStreamingStats callback to get the actual resolution of the pushed video stream.
   *
   * @param config Video encoding configuration. See VideoEncoderConfiguration. When streaming directly to CDN, the SDK currently only supports setting OrientationMode to landscape (OrientationFixedLandscape) or portrait (OrientationFixedPortrait).
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setDirectCdnStreamingVideoConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * Starts direct CDN streaming from the host.
   *
   * Deprecated Deprecated since v4.6.2. The SDK does not support pushing streams to the same URL simultaneously.
   * Media options:
   * The SDK does not support setting both publishCameraTrack and publishCustomVideoTrack to true, nor both publishMicrophoneTrack and publishCustomAudioTrack to true. You can configure the media options (DirectCdnStreamingMediaOptions) based on your scenario. For example:
   * If you want to push custom audio and video streams from the host, set the media options as follows:
   *  Set publishCustomAudioTrack to true and call pushAudioFrame
   *  Set publishCustomVideoTrack to true and call pushVideoFrame
   *  Ensure publishCameraTrack is false (default)
   *  Ensure publishMicrophoneTrack is false (default) Since v4.2.0, the SDK supports pushing audio-only streams. You can set publishCustomAudioTrack or publishMicrophoneTrack to true in DirectCdnStreamingMediaOptions and call pushAudioFrame to push audio-only streams.
   *
   * @param eventHandler See onDirectCdnStreamingStateChanged and onDirectCdnStreamingStats.
   * @param publishUrl CDN streaming URL.
   * @param options Media options for the host. See DirectCdnStreamingMediaOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number;

  /**
   * Stops direct CDN streaming from the host.
   *
   * Deprecated Deprecated since v4.6.2.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopDirectCdnStreaming(): number;

  /**
   * @ignore
   */
  abstract updateDirectCdnStreamingMediaOptions(
    options: DirectCdnStreamingMediaOptions
  ): number;

  /**
   * Starts the virtual metronome.
   *
   * Deprecated Deprecated since v4.6.2.
   *  After the virtual metronome is enabled, the SDK starts playing the specified audio files from the beginning and controls the playback duration of each file based on the beatsPerMinute you set in AgoraRhythmPlayerConfig. For example, if beatsPerMinute is set to 60, the SDK plays one beat per second. If the file duration exceeds the beat duration, the SDK only plays the portion of the audio corresponding to the beat duration.
   *  By default, the sound of the virtual metronome is not published to remote users. If you want remote users to hear the sound of the virtual metronome, you can set publishRhythmPlayerTrack in ChannelMediaOptions to true after calling this method.
   *
   * @param sound1 The absolute path or URL of the strong beat file, including the file name and extension. For example, C:\music\audio.mp4. For supported audio formats, see [Supported Audio Formats in RTC SDK](https://doc.shengwang.cn/faq/general-product-inquiry/audio-format).
   * @param sound2 The absolute path or URL of the weak beat file, including the file name and extension. For example, C:\music\audio.mp4. For supported audio formats, see [Supported Audio Formats in RTC SDK](https://doc.shengwang.cn/faq/general-product-inquiry/audio-format).
   * @param config Metronome configuration. See AgoraRhythmPlayerConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure
   *  -22: Audio file not found. Please provide valid sound1 and sound2.
   */
  abstract startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: AgoraRhythmPlayerConfig
  ): number;

  /**
   * Stops the virtual metronome.
   *
   * After calling startRhythmPlayer, you can call this method to stop the virtual metronome.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopRhythmPlayer(): number;

  /**
   * Configures the virtual metronome.
   *
   * Deprecated Deprecated since v4.6.2.
   *  After calling startRhythmPlayer, you can call this method to reconfigure the virtual metronome.
   *  After the virtual metronome is enabled, the SDK starts playing the specified audio files from the beginning and controls the playback duration of each file based on the beatsPerMinute you set in AgoraRhythmPlayerConfig. For example, if beatsPerMinute is set to 60, the SDK plays one beat per second. If the file duration exceeds the beat duration, the SDK only plays the portion of the audio corresponding to the beat duration.
   *  By default, the sound of the virtual metronome is not published to remote users. If you want remote users to hear the sound of the virtual metronome, you can set publishRhythmPlayerTrack in ChannelMediaOptions to true after calling this method.
   *
   * @param config Metronome configuration. See AgoraRhythmPlayerConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract configRhythmPlayer(config: AgoraRhythmPlayerConfig): number;

  /**
   * Takes a snapshot of the video.
   *
   * This method captures a snapshot of the specified user's video stream, generates a JPG image, and saves it to the specified path.
   *  When this method returns, the SDK has not actually captured the snapshot.
   *  When used for local video snapshot, it captures the video stream specified for publishing in ChannelMediaOptions.
   *  If the video has been pre-processed, such as adding watermark or beauty effects, the snapshot will include those effects.
   *
   * @param uid User ID. Set to 0 to capture the local user's video.
   * @param filePath Make sure the directory exists and is writable. Local path to save the snapshot, including file name and format. For example:
   *  iOS: /App Sandbox/Library/Caches/example.jpg
   *  Android: /storage/emulated/0/Android/data/<package name>/files/example.jpg
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract takeSnapshot(uid: number, filePath: string): number;

  /**
   * Enables/disables local snapshot upload.
   *
   * After local snapshot upload is enabled, the SDK captures and uploads snapshots of the video sent by the local user based on the module type and frequency you set in ContentInspectConfig. Once the snapshot is complete, the Agora server sends a callback notification to your server via HTTPS and uploads all snapshots to your specified third-party cloud storage.
   *  Before calling this method, make sure you have enabled the local snapshot upload service in the Agora Console.
   *  When using the Agora self-developed plugin for video moderation (ContentInspectSupervision), you must integrate the local snapshot upload dynamic library libagora_content_inspect_extension.dll. Deleting this library will prevent the local snapshot upload function from working properly.
   *
   * @param enabled Specifies whether to enable local snapshot upload: true : Enable local snapshot upload. false : Disable local snapshot upload.
   * @param config Configuration for local snapshot upload. See ContentInspectConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableContentInspect(
    enabled: boolean,
    config: ContentInspectConfig
  ): number;

  /**
   * Adjusts the playback volume of a custom audio capture track on the remote end.
   *
   * After calling this method to set the playback volume of the audio on the remote end, you can call this method again to readjust the volume. Before calling this method, make sure you have already called the createCustomAudioTrack method to create a custom audio capture track.
   *
   * @param trackId Audio track ID. Set this parameter to the custom audio track ID returned by the createCustomAudioTrack method.
   * @param volume Playback volume of the custom captured audio, in the range [0,100]. 0 means mute, 100 means original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): number;

  /**
   * Adjusts the playback volume of a custom audio capture track locally.
   *
   * After calling this method to set the local playback volume of audio, if you want to readjust the volume, you can call this method again. Before calling this method, make sure you have already called the createCustomAudioTrack method to create a custom audio capture track.
   *
   * @param trackId Audio track ID. Set this parameter to the custom audio track ID returned by the createCustomAudioTrack method.
   * @param volume Playback volume of the custom captured audio, ranging from [0, 100]. 0 means mute, 100 means original volume.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): number;

  /**
   * Sets the cloud proxy service.
   *
   * When a user's network is restricted by a firewall, you need to add the IP addresses and port numbers provided by Agora to the firewall whitelist, then call this method to enable the cloud proxy and set the proxy type via the proxyType parameter.
   * After successfully connecting to the cloud proxy, the SDK triggers the onConnectionStateChanged (ConnectionStateConnecting, ConnectionChangedSettingProxyServer) callback.
   * To disable a configured Force UDP or Force TCP cloud proxy, call setCloudProxy(NoneProxy).
   * To change the configured cloud proxy type, first call setCloudProxy(NoneProxy), then call setCloudProxy again with the desired proxyType.
   *  It is recommended to call this method outside the channel.
   *  If the user is in an intranet firewall environment, the features of CDN live streaming and cross-channel media relay are not available when using Force UDP cloud proxy.
   *  When using Force UDP cloud proxy, online audio files using HTTP protocol cannot be played via startAudioMixing. CDN live streaming and cross-channel media relay use TCP cloud proxy.
   *
   * @param proxyType Cloud proxy type. See CloudProxyType.
   * This parameter is required. If not set, the SDK returns an error.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -2: Invalid parameter.
   *  -7: SDK not initialized.
   */
  abstract setCloudProxy(proxyType: CloudProxyType): number;

  /**
   * @ignore
   */
  abstract setLocalAccessPoint(config: LocalAccessPointConfiguration): number;

  /**
   * Sets advanced audio options.
   *
   * If you have advanced requirements for audio processing, such as capturing and sending stereo sound, you can call this method to set advanced audio options. You need to call this method before joinChannel, enableAudio, and enableLocalAudio.
   *
   * @param options Advanced audio options. See AdvancedAudioOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setAdvancedAudioOptions(
    options: AdvancedAudioOptions,
    sourceType?: number
  ): number;

  /**
   * @ignore
   */
  abstract setAVSyncSource(channelId: string, uid: number): number;

  /**
   * Enables or disables image placeholder streaming.
   *
   * When publishing a video stream, you can call this method to use a custom image to replace the current video stream for streaming.
   * After enabling this feature, you can customize the placeholder image using the ImageTrackOptions parameter. After disabling the feature, remote users will continue to see the current published video stream.
   *
   * @param enable Whether to enable image placeholder streaming: true : Enable image placeholder streaming. false : (Default) Disable image placeholder streaming.
   * @param options Placeholder image settings. See ImageTrackOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableVideoImageSource(
    enable: boolean,
    options: ImageTrackOptions
  ): number;

  /**
   * Gets the current Monotonic Time from the SDK.
   *
   * Monotonic Time refers to a monotonically increasing time sequence whose value increases over time. The unit is milliseconds.
   * In scenarios such as custom video capture and custom audio capture, to ensure audio-video synchronization, Agora recommends that you call this method to get the current Monotonic Time from the SDK and pass this value to the timestamp parameter of the captured VideoFrame or AudioFrame.
   *
   * @returns
   * ≥ 0: Success. Returns the current Monotonic Time (milliseconds) from the SDK.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract getCurrentMonotonicTimeInMs(): number;

  /**
   * Gets the local network connection type.
   *
   * You can call this method at any time to get the current network type in use. This method can be called before and after joining a channel.
   *
   * @returns
   * ≥ 0: Success. Returns the local network connection type.
   *  0: Network disconnected.
   *  1: LAN.
   *  2: Wi-Fi (including hotspot).
   *  3: 2G mobile network.
   *  4: 3G mobile network.
   *  5: 4G mobile network.
   *  6: 5G mobile network.
   *  < 0: Failure. Returns an error code.
   *  -1: Unknown network connection type.
   */
  abstract getNetworkType(): number;

  /**
   * The SDK's JSON configuration, used for technical preview or customized features.
   *
   * @param parameters Parameters in JSON string format.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setParameters(parameters: string): number;

  /**
   * Starts video frame rendering tracing.
   *
   * After this method is successfully called, the SDK uses the time of the call as the starting point and reports video frame rendering information through the onVideoRenderingTracingResult callback.
   *  If you do not call this method, the SDK uses the time of calling joinChannel to join the channel as the default starting point and automatically starts tracing video rendering events. You can call this method at an appropriate time based on your business scenario to customize the tracing point.
   *  After leaving the current channel, the SDK automatically resets the tracing point to the next time you join a channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -7: IRtcEngine is not initialized before calling the method.
   */
  abstract startMediaRenderingTracing(): number;

  /**
   * Enables accelerated rendering of audio and video frames.
   *
   * After successfully calling this method, the SDK enables accelerated rendering for both video and audio frames, which speeds up the time to first frame and first audio after a user joins a channel. Both broadcaster and audience must call this method to experience accelerated audio and video rendering.
   * Once this method is successfully called, you can only disable accelerated rendering by calling the release method to destroy the IRtcEngine object.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -7: IRtcEngine not initialized before calling the method.
   */
  abstract enableInstantMediaRendering(): number;

  /**
   * Gets the current NTP (Network Time Protocol) time.
   *
   * In real-time chorus scenarios, especially when downlink inconsistencies occur at different receiving ends due to network issues, you can call this method to get the current NTP time as the reference time to align lyrics and music across multiple receivers for chorus synchronization.
   *
   * @returns
   * The current NTP time as a Unix timestamp (milliseconds).
   */
  abstract getNtpWallTimeInMs(): number;

  /**
   * Checks whether the device supports the specified advanced feature.
   *
   * Checks whether the current device meets the requirements for advanced features such as virtual background and beauty effects.
   *
   * @param type The type of advanced feature. See FeatureType.
   *
   * @returns
   * true : The device supports the specified advanced feature. false : The device does not support the specified advanced feature.
   */
  abstract isFeatureAvailableOnDevice(type: FeatureType): boolean;

  /**
   * @ignore
   */
  abstract sendAudioMetadata(metadata: string, length: number): number;

  /**
   * @ignore
   */
  abstract queryHDRCapability(videoModule: VideoModuleType): HdrCapability;

  /**
   * Adds a watermark image to the local video stream.
   *
   * Since Available since v4.6.2. You can use this method to overlay a watermark image on the local video stream and configure the position, size, and visibility of the watermark in the preview using WatermarkConfig.
   *
   * @param configs Watermark configuration. See WatermarkConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract addVideoWatermarkWithConfig(configs: WatermarkConfig): number;

  /**
   * @ignore
   */
  abstract startScreenCaptureBySourceType(
    sourceType: VideoSourceType,
    config: ScreenCaptureConfiguration
  ): number;

  /**
   * @ignore
   */
  abstract stopScreenCaptureBySourceType(sourceType: VideoSourceType): number;

  /**
   * Destroys the IRtcEngine object.
   *
   * This method releases all resources used by the SDK. Some apps only use real-time audio and video communication when needed, and release the resources when not in use for other operations. This method is suitable for such cases.
   * After calling this method, you can no longer use other methods and callbacks of the SDK. To use the real-time audio and video communication function again, you must call createAgoraRtcEngine and initialize in sequence to create a new IRtcEngine object.
   *  This method is a synchronous call. You need to wait for the IRtcEngine resources to be released before performing other operations (such as creating a new IRtcEngine object), so it is recommended to call this method in a sub-thread to avoid blocking the main thread.
   *  It is not recommended to call release in the SDK's callback, otherwise the SDK will wait for the callback to return before recycling the related object resources, which may cause a deadlock.
   *
   * @param sync Whether the method is a synchronous call: true : The method is synchronous. false : The method is asynchronous. Currently, only synchronous calls are supported. Do not set this parameter to this value.
   */
  abstract release(sync?: boolean): void;

  /**
   * Starts video preview.
   *
   * This method starts the local video preview.
   *  Local preview enables mirroring by default.
   *  After leaving the channel, local preview remains active. You need to call stopPreview to stop the local preview.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startPreviewWithoutSourceType(): number;

  /**
   * Gets the IAudioDeviceManager object to manage audio devices.
   *
   * @returns
   * An IAudioDeviceManager object.
   */
  abstract getAudioDeviceManager(): IAudioDeviceManager;

  /**
   * Gets the IVideoDeviceManager object to manage video devices.
   *
   * @returns
   * An IVideoDeviceManager object.
   */
  abstract getVideoDeviceManager(): IVideoDeviceManager;

  /**
   * @ignore
   */
  abstract getMusicContentCenter(): IMusicContentCenter;

  /**
   * Gets the IMediaEngine object.
   *
   * This method must be called after initializing the IRtcEngine object.
   *
   * @returns
   * IMediaEngine object.
   */
  abstract getMediaEngine(): IMediaEngine;

  /**
   * Gets the ILocalSpatialAudioEngine object.
   *
   * This method must be called after initializing the IRtcEngine object.
   *
   * @returns
   * An ILocalSpatialAudioEngine object.
   */
  abstract getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine;

  /**
   * @ignore
   */
  abstract getH265Transcoder(): IH265Transcoder;

  /**
   * Sends media metadata.
   *
   * If the media metadata is sent successfully, the receiver will receive the onMetadataReceived callback.
   *
   * @param metadata The media metadata. See Metadata.
   * @param sourceType The type of video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract sendMetaData(
    metadata: Metadata,
    sourceType: VideoSourceType
  ): number;

  /**
   * Sets the maximum size of media metadata.
   *
   * After calling registerMediaMetadataObserver, you can call this method to set the maximum size of media metadata.
   *
   * @param size The maximum size of media metadata.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setMaxMetadataSize(size: number): number;

  /**
   * @ignore
   */
  abstract destroyRendererByView(view: any): void;

  /**
   * @ignore
   */
  abstract destroyRendererByConfig(
    sourceType: VideoSourceType,
    channelId?: string,
    uid?: number
  ): void;

  /**
   * Unregisters an audio encoded frame observer.
   *
   * @param observer Audio encoded frame observer. See IAudioEncodedFrameObserver.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * Gets the C++ handle of the Native SDK.
   *
   * This method gets the C++ handle of the Native SDK engine, used in special scenarios such as registering audio and video callbacks.
   *
   * @returns
   * The Native handle of the SDK engine.
   */
  abstract getNativeHandle(): number;

  /**
   * Takes a video snapshot at a specified observation point.
   *
   * This method captures a snapshot of the specified user's video stream, generates a JPG image, and saves it to the specified path.
   *  When this method returns, the SDK has not actually captured the snapshot.
   *  When used for local video snapshot, it captures the video stream specified for publishing in ChannelMediaOptions.
   *
   * @param uid User ID. Set to 0 to capture the local user's video.
   * @param config Snapshot settings. See SnapshotConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract takeSnapshotWithConfig(uid: number, config: SnapshotConfig): number;
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
 * Device state.
 */
export enum MediaDeviceStateType {
  /**
   * 0: Device is ready.
   */
  MediaDeviceStateIdle = 0,
  /**
   * 1: Device is in use.
   */
  MediaDeviceStateActive = 1,
  /**
   * 2: Device is disabled.
   */
  MediaDeviceStateDisabled = 2,
  /**
   * 3: Device is plugged in.
   */
  MediaDeviceStatePluggedIn = 3,
  /**
   * 4: Device is not present.
   */
  MediaDeviceStateNotPresent = 4,
  /**
   * 8: Device is unplugged.
   */
  MediaDeviceStateUnplugged = 8,
}

/**
 * @ignore
 */
export enum VideoProfileType {
  /**
   * @ignore
   */
  VideoProfileLandscape120p = 0,
  /**
   * @ignore
   */
  VideoProfileLandscape120p3 = 2,
  /**
   * @ignore
   */
  VideoProfileLandscape180p = 10,
  /**
   * @ignore
   */
  VideoProfileLandscape180p3 = 12,
  /**
   * @ignore
   */
  VideoProfileLandscape180p4 = 13,
  /**
   * @ignore
   */
  VideoProfileLandscape240p = 20,
  /**
   * @ignore
   */
  VideoProfileLandscape240p3 = 22,
  /**
   * @ignore
   */
  VideoProfileLandscape240p4 = 23,
  /**
   * @ignore
   */
  VideoProfileLandscape360p = 30,
  /**
   * @ignore
   */
  VideoProfileLandscape360p3 = 32,
  /**
   * @ignore
   */
  VideoProfileLandscape360p4 = 33,
  /**
   * @ignore
   */
  VideoProfileLandscape360p6 = 35,
  /**
   * @ignore
   */
  VideoProfileLandscape360p7 = 36,
  /**
   * @ignore
   */
  VideoProfileLandscape360p8 = 37,
  /**
   * @ignore
   */
  VideoProfileLandscape360p9 = 38,
  /**
   * @ignore
   */
  VideoProfileLandscape360p10 = 39,
  /**
   * @ignore
   */
  VideoProfileLandscape360p11 = 100,
  /**
   * @ignore
   */
  VideoProfileLandscape480p = 40,
  /**
   * @ignore
   */
  VideoProfileLandscape480p3 = 42,
  /**
   * @ignore
   */
  VideoProfileLandscape480p4 = 43,
  /**
   * @ignore
   */
  VideoProfileLandscape480p6 = 45,
  /**
   * @ignore
   */
  VideoProfileLandscape480p8 = 47,
  /**
   * @ignore
   */
  VideoProfileLandscape480p9 = 48,
  /**
   * @ignore
   */
  VideoProfileLandscape480p10 = 49,
  /**
   * @ignore
   */
  VideoProfileLandscape720p = 50,
  /**
   * @ignore
   */
  VideoProfileLandscape720p3 = 52,
  /**
   * @ignore
   */
  VideoProfileLandscape720p5 = 54,
  /**
   * @ignore
   */
  VideoProfileLandscape720p6 = 55,
  /**
   * @ignore
   */
  VideoProfileLandscape1080p = 60,
  /**
   * @ignore
   */
  VideoProfileLandscape1080p3 = 62,
  /**
   * @ignore
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
   * @ignore
   */
  VideoProfilePortrait120p = 1000,
  /**
   * @ignore
   */
  VideoProfilePortrait120p3 = 1002,
  /**
   * @ignore
   */
  VideoProfilePortrait180p = 1010,
  /**
   * @ignore
   */
  VideoProfilePortrait180p3 = 1012,
  /**
   * @ignore
   */
  VideoProfilePortrait180p4 = 1013,
  /**
   * @ignore
   */
  VideoProfilePortrait240p = 1020,
  /**
   * @ignore
   */
  VideoProfilePortrait240p3 = 1022,
  /**
   * @ignore
   */
  VideoProfilePortrait240p4 = 1023,
  /**
   * @ignore
   */
  VideoProfilePortrait360p = 1030,
  /**
   * @ignore
   */
  VideoProfilePortrait360p3 = 1032,
  /**
   * @ignore
   */
  VideoProfilePortrait360p4 = 1033,
  /**
   * @ignore
   */
  VideoProfilePortrait360p6 = 1035,
  /**
   * @ignore
   */
  VideoProfilePortrait360p7 = 1036,
  /**
   * @ignore
   */
  VideoProfilePortrait360p8 = 1037,
  /**
   * @ignore
   */
  VideoProfilePortrait360p9 = 1038,
  /**
   * @ignore
   */
  VideoProfilePortrait360p10 = 1039,
  /**
   * @ignore
   */
  VideoProfilePortrait360p11 = 1100,
  /**
   * @ignore
   */
  VideoProfilePortrait480p = 1040,
  /**
   * @ignore
   */
  VideoProfilePortrait480p3 = 1042,
  /**
   * @ignore
   */
  VideoProfilePortrait480p4 = 1043,
  /**
   * @ignore
   */
  VideoProfilePortrait480p6 = 1045,
  /**
   * @ignore
   */
  VideoProfilePortrait480p8 = 1047,
  /**
   * @ignore
   */
  VideoProfilePortrait480p9 = 1048,
  /**
   * @ignore
   */
  VideoProfilePortrait480p10 = 1049,
  /**
   * @ignore
   */
  VideoProfilePortrait720p = 1050,
  /**
   * @ignore
   */
  VideoProfilePortrait720p3 = 1052,
  /**
   * @ignore
   */
  VideoProfilePortrait720p5 = 1054,
  /**
   * @ignore
   */
  VideoProfilePortrait720p6 = 1055,
  /**
   * @ignore
   */
  VideoProfilePortrait1080p = 1060,
  /**
   * @ignore
   */
  VideoProfilePortrait1080p3 = 1062,
  /**
   * @ignore
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
   * @ignore
   */
  VideoProfileDefault = 30,
}

/**
 * SDK version information.
 */
export class SDKBuildInfo {
  /**
   * SDK build number.
   */
  build?: number;
  /**
   * SDK version number. Format: string, e.g., 4.0.0.
   */
  version?: string;
}

/**
 * The VideoDeviceInfo class contains the video device ID and device name.
 */
export class VideoDeviceInfo {
  /**
   * Device ID.
   */
  deviceId?: string;
  /**
   * Device name.
   */
  deviceName?: string;
}

/**
 * The AudioDeviceInfo class contains the audio device ID and device name.
 */
export class AudioDeviceInfo {
  /**
   * Device ID.
   */
  deviceId?: string;
  /**
   * Audio device type, such as: built-in, USB, HDMI, etc.
   */
  deviceTypeName?: string;
  /**
   * Device name.
   */
  deviceName?: string;
}
