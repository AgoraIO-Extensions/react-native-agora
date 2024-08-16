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
  DownlinkNetworkInfo,
  EarMonitoringFilterType,
  EchoTestConfiguration,
  EncryptionConfig,
  EncryptionErrorType,
  ErrorCodeType,
  FaceShapeArea,
  FaceShapeAreaOptions,
  FaceShapeBeautyOptions,
  FocalLengthInfo,
  HeadphoneEqualizerPreset,
  IAudioEncodedFrameObserver,
  LastmileProbeConfig,
  LastmileProbeResult,
  LicenseErrorType,
  LiveTranscoding,
  LocalAccessPointConfiguration,
  LocalAudioStats,
  LocalAudioStreamReason,
  LocalAudioStreamState,
  LocalTranscoderConfiguration,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  LowlightEnhanceOptions,
  MediaTraceEvent,
  NetworkType,
  PermissionType,
  QualityAdaptIndication,
  QualityType,
  RecorderStreamInfo,
  Rectangle,
  RemoteAudioState,
  RemoteAudioStateReason,
  RemoteVideoState,
  RemoteVideoStateReason,
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
  WatermarkOptions,
  WlAccStats,
  WlaccMessageReason,
  WlaccSuggestAction,
} from './AgoraBase';
import {
  ContentInspectConfig,
  ContentInspectResult,
  ExtensionContext,
  IAudioSpectrumObserver,
  MediaSourceType,
  RawAudioFrameOpModeType,
  RenderModeType,
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
   * 2: Video rendering device (graphics card).
   */
  VideoRenderDevice = 2,
  /**
   * 3: Video capturing device.
   */
  VideoCaptureDevice = 3,
  /**
   * 4: Audio playback device for an app.
   */
  AudioApplicationPlayoutDevice = 4,
  /**
   * 5: Virtual audio playback device (virtual sound card).
   */
  AudioVirtualPlayoutDevice = 5,
  /**
   * 6: Virtual audio capturing device (virtual sound card).
   */
  AudioVirtualRecordingDevice = 6,
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
   * 713: The music file stops playing. The possible reasons include: AudioMixingReasonAllLoopsCompleted (723) AudioMixingReasonStoppedByUser (724)
   */
  AudioMixingStateStopped = 713,
  /**
   * 714: An error occurs during the playback of the audio mixing file. The possible reasons include: AudioMixingReasonCanNotOpen (701) AudioMixingReasonTooFrequentCall (702) AudioMixingReasonInterruptedEof (703)
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
 * The statistics of the local video stream.
 */
export class LocalVideoStats {
  /**
   * The ID of the local user.
   */
  uid?: number;
  /**
   * The actual bitrate (Kbps) while sending the local video stream. This value does not include the bitrate for resending the video after packet loss.
   */
  sentBitrate?: number;
  /**
   * The actual frame rate (fps) while sending the local video stream. This value does not include the frame rate for resending the video after packet loss.
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
   * The quality adaptation of the local video stream in the reported interval (based on the target frame rate and target bitrate). See QualityAdaptIndication.
   */
  qualityAdaptIndication?: QualityAdaptIndication;
  /**
   * The bitrate (Kbps) while encoding the local video stream. This value does not include the bitrate for resending the video after packet loss.
   */
  encodedBitrate?: number;
  /**
   * The number of the sent video frames, represented by an aggregate value.
   */
  encodedFrameCount?: number;
  /**
   * The codec type of the local video. See VideoCodecType.
   */
  codecType?: VideoCodecType;
  /**
   * The video packet loss rate (%) from the local client to the Agora server before applying the anti-packet loss strategies.
   */
  txPacketLossRate?: number;
  /**
   * The brightness level of the video image captured by the local camera. See CaptureBrightnessLevelType.
   */
  captureBrightnessLevel?: CaptureBrightnessLevelType;
  /**
   * @ignore
   */
  dualStreamEnabled?: boolean;
  /**
   * The local video encoding acceleration type.
   *  0: Software encoding is applied without acceleration.
   *  1: Hardware encoding is applied for acceleration.
   */
  hwEncoderAccelerating?: number;
  /**
   * @ignore
   */
  simulcastDimensions?: VideoDimensions[];
}

/**
 * Audio statistics of the remote user.
 */
export class RemoteAudioStats {
  /**
   * The user ID of the remote user.
   */
  uid?: number;
  /**
   * The quality of the audio stream sent by the user. See QualityType.
   */
  quality?: number;
  /**
   * The network delay (ms) from the sender to the receiver.
   */
  networkTransportDelay?: number;
  /**
   * The network delay (ms) from the audio receiver to the jitter buffer. When the receiving end is an audience member and audienceLatencyLevel of ClientRoleOptions is 1, this parameter does not take effect.
   */
  jitterBufferDelay?: number;
  /**
   * The frame loss rate (%) of the remote audio stream in the reported interval.
   */
  audioLossRate?: number;
  /**
   * The number of audio channels.
   */
  numChannels?: number;
  /**
   * The sampling rate of the received audio stream in the reported interval.
   */
  receivedSampleRate?: number;
  /**
   * The average bitrate (Kbps) of the received audio stream in the reported interval.
   */
  receivedBitrate?: number;
  /**
   * The total freeze time (ms) of the remote audio stream after the remote user joins the channel. In a session, audio freeze occurs when the audio frame loss rate reaches 4%.
   */
  totalFrozenTime?: number;
  /**
   * The total audio freeze time as a percentage (%) of the total time when the audio is available. The audio is considered available when the remote user neither stops sending the audio stream nor disables the audio module after joining the channel.
   */
  frozenRate?: number;
  /**
   * The quality of the remote audio stream in the reported interval. The quality is determined by the Agora real-time audio MOS (Mean Opinion Score) measurement method. The return value range is [0, 500]. Dividing the return value by 100 gets the MOS score, which ranges from 0 to 5. The higher the score, the better the audio quality. The subjective perception of audio quality corresponding to the Agora real-time audio MOS scores is as follows: MOS score Perception of audio quality Greater than 4 Excellent. The audio sounds clear and smooth. From 3.5 to 4 Good. The audio has some perceptible impairment but still sounds clear. From 3 to 3.5 Fair. The audio freezes occasionally and requires attentive listening. From 2.5 to 3 Poor. The audio sounds choppy and requires considerable effort to understand. From 2 to 2.5 Bad. The audio has occasional noise. Consecutive audio dropouts occur, resulting in some information loss. The users can communicate only with difficulty. Less than 2 Very bad. The audio has persistent noise. Consecutive audio dropouts are frequent, resulting in severe information loss. Communication is nearly impossible.
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
   * The total active time (ms) between the start of the audio call and the callback of the remote user. The active time refers to the total duration of the remote user without the mute state.
   */
  totalActiveTime?: number;
  /**
   * The total duration (ms) of the remote audio stream.
   */
  publishDuration?: number;
  /**
   * The Quality of Experience (QoE) of the local user when receiving a remote audio stream. See ExperienceQualityType.
   */
  qoeQuality?: number;
  /**
   * Reasons why the QoE of the local user when receiving a remote audio stream is poor. See ExperiencePoorReason.
   */
  qualityChangedReason?: number;
  /**
   * @ignore
   */
  rxAudioBytes?: number;
  /**
   * End-to-end audio delay (in milliseconds), which refers to the time from when the audio is captured by the remote user to when it is played by the local user.
   */
  e2eDelay?: number;
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
   * Deprecated: In scenarios where audio and video are synchronized, you can get the video delay data from networkTransportDelay and jitterBufferDelay in RemoteAudioStats. The video delay (ms).
   */
  delay?: number;
  /**
   * End-to-end video latency (ms). That is, the time elapsed from the video capturing on the remote user's end to the receiving and rendering of the video on the local user's end.
   */
  e2eDelay?: number;
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
   * @ignore
   */
  decoderInputFrameRate?: number;
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
   * The type of the video stream. See VideoStreamType.
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
   * The amount of time (ms) that the audio is ahead of the video. If this value is negative, the audio is lagging behind the video.
   */
  avSyncTimeMs?: number;
  /**
   * The total active time (ms) of the video. As long as the remote user or host neither stops sending the video stream nor disables the video module after joining the channel, the video is available.
   */
  totalActiveTime?: number;
  /**
   * The total duration (ms) of the remote video stream.
   */
  publishDuration?: number;
  /**
   * @ignore
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
 * Lifecycle of the CDN live video stream.
 *
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
 * The camera direction.
 */
export enum CameraDirection {
  /**
   * 0: The rear camera.
   */
  CameraRear = 0,
  /**
   * 1: (Default) The front camera.
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
   * (Optional) The camera direction. See CameraDirection.
   */
  cameraDirection?: CameraDirection;
  /**
   * (Optional) The camera focal length type. See CameraFocalLengthType.
   *  To set the focal length type of the camera, it is only supported to specify the camera through cameraDirection, and not supported to specify it through cameraId.
   *  For iOS devices equipped with multi-lens rear cameras, such as those featuring dual-camera (wide-angle and ultra-wide-angle) or triple-camera (wide-angle, ultra-wide-angle, and telephoto), you can use one of the following methods to capture video with an ultra-wide-angle perspective:
   *  Method one: Set this parameter to CameraFocalLengthUltraWide (2) (ultra-wide lens).
   *  Method two: Set this parameter to CameraFocalLengthDefault (0) (standard lens), then call setCameraZoomFactor to set the camera's zoom factor to a value less than 1.0, with the minimum setting being 0.5. The difference is that the size of the ultra-wide angle in method one is not adjustable, whereas method two supports adjusting the camera's zoom factor freely.
   */
  cameraFocalLengthType?: CameraFocalLengthType;
  /**
   * @ignore
   */
  deviceId?: string;
  /**
   * (Optional) The camera ID. The default value is the camera ID of the front camera. You can get the camera ID through the Android native system API, see and for details.
   *  This parameter is for Android only.
   *  This parameter and cameraDirection are mutually exclusive in specifying the camera; you can choose one based on your needs. The differences are as follows:
   *  Specifying the camera via cameraDirection is more straightforward. You only need to indicate the camera direction (front or rear), without specifying a specific camera ID; the SDK will retrieve and confirm the actual camera ID through Android native system APIs.
   *  Specifying via cameraId allows for more precise identification of a particular camera. For devices with multiple cameras, where cameraDirection cannot recognize or access all available cameras, it is recommended to use cameraId to specify the desired camera ID directly.
   */
  cameraId?: string;
  /**
   * (Optional) Whether to follow the video aspect ratio set in setVideoEncoderConfiguration : true : (Default) Follow the set video aspect ratio. The SDK crops the captured video according to the set video aspect ratio and synchronously changes the local preview screen and the video frame in onCaptureVideoFrame and onPreEncodeVideoFrame. false : Do not follow the system default audio playback device. The SDK does not change the aspect ratio of the captured video frame.
   */
  followEncodeDimensionRatio?: boolean;
  /**
   * (Optional) The format of the video frame. See VideoFormat.
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
  windowId?: any;
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
  sourceId?: any;
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
  sourceDisplayId?: any;
}

/**
 * The advanced options for audio.
 */
export class AdvancedAudioOptions {
  /**
   * The number of channels for audio preprocessing. See AudioProcessingChannels.
   */
  audioProcessingChannels?: number;
}

/**
 * Image configurations.
 */
export class ImageTrackOptions {
  /**
   * The image URL. Supported formats of images include JPEG, JPG, PNG and GIF. This method supports adding an image from the local absolute or relative file path. On the Android platform, adding images from /assets/ is not supported.
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
 *
 * Agora supports publishing multiple audio streams and one video stream at the same time and in the same RtcConnection. For example, publishMicrophoneTrack, publishCustomAudioTrack, and publishMediaPlayerAudioTrack can be set as true at the same time, but only one of publishCameraTrack, publishScreenCaptureVideo, publishCustomVideoTrack, or publishEncodedVideoTrack can be set as true. Agora recommends that you set member parameter values yourself according to your business scenario, otherwise the SDK will automatically assign values to member parameters.
 */
export class ChannelMediaOptions {
  /**
   * Whether to publish the video captured by the camera: true : Publish the video captured by the camera. false : Do not publish the video captured by the camera.
   */
  publishCameraTrack?: boolean;
  /**
   * Whether to publish the video captured by the second camera: true : Publish the video captured by the second camera. false : Do not publish the video captured by the second camera.
   */
  publishSecondaryCameraTrack?: boolean;
  /**
   * Whether to publish the video captured by the third camera: true : Publish the video captured by the third camera. false : Do not publish the video captured by the third camera. This parameter is for Android only.
   */
  publishThirdCameraTrack?: boolean;
  /**
   * Whether to publish the video captured by the fourth camera: true : Publish the video captured by the fourth camera. false : Do not publish the video captured by the fourth camera. This parameter is for Android only.
   */
  publishFourthCameraTrack?: boolean;
  /**
   * Whether to publish the audio captured by the microphone: true : Publish the audio captured by the microphone. false : Do not publish the audio captured by the microphone.
   */
  publishMicrophoneTrack?: boolean;
  /**
   * Whether to publish the video captured from the screen: true : Publish the video captured from the screen. false : Do not publish the video captured from the screen.
   */
  publishScreenCaptureVideo?: boolean;
  /**
   * Whether to publish the audio captured from the screen: true : Publish the audio captured from the screen. false : Publish the audio captured from the screen.
   */
  publishScreenCaptureAudio?: boolean;
  /**
   * @ignore
   */
  publishScreenTrack?: boolean;
  /**
   * Whether to publish the video captured from the second screen: true : Publish the video captured from the second screen. false : Do not publish the video captured from the second screen.
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
   * Whether to publish the audio captured from a custom source: true : Publish the audio captured from the custom source. false : Do not publish the captured audio from a custom source.
   */
  publishCustomAudioTrack?: boolean;
  /**
   * The ID of the custom audio source to publish. The default value is 0. If you have set sourceNumber in setExternalAudioSource to a value greater than 1, the SDK creates the corresponding number of custom audio tracks and assigns an ID to each audio track, starting from 0.
   */
  publishCustomAudioTrackId?: number;
  /**
   * Whether to publish the video captured from a custom source: true : Publish the video captured from the custom source. false : Do not publish the captured video from a custom source.
   */
  publishCustomVideoTrack?: boolean;
  /**
   * Whether to publish the encoded video: true : Publish the encoded video. false : Do not publish the encoded video.
   */
  publishEncodedVideoTrack?: boolean;
  /**
   * Whether to publish the audio from the media player: true : Publish the audio from the media player. false : Do not publish the audio from the media player.
   */
  publishMediaPlayerAudioTrack?: boolean;
  /**
   * Whether to publish the video from the media player: true : Publish the video from the media player. false : Do not publish the video from the media player.
   */
  publishMediaPlayerVideoTrack?: boolean;
  /**
   * Whether to publish the local transcoded video: true : Publish the local transcoded video. false : Do not publish the local transcoded video.
   */
  publishTranscodedVideoTrack?: boolean;
  /**
   * @ignore
   */
  publishMixedAudioTrack?: boolean;
  /**
   * @ignore
   */
  publishLipSyncTrack?: boolean;
  /**
   * Whether to automatically subscribe to all remote audio streams when the user joins a channel: true : Subscribe to all remote audio streams. false : Do not automatically subscribe to any remote audio streams.
   */
  autoSubscribeAudio?: boolean;
  /**
   * Whether to automatically subscribe to all remote video streams when the user joins the channel: true : Subscribe to all remote video streams. false : Do not automatically subscribe to any remote video streams.
   */
  autoSubscribeVideo?: boolean;
  /**
   * Whether to enable audio capturing or playback: true : Enable audio capturing or playback. false : Do not enable audio capturing or playback. If you need to publish the audio streams captured by your microphone, ensure this parameter is set as true.
   */
  enableAudioRecordingOrPlayout?: boolean;
  /**
   * The ID of the media player to be published. The default value is 0.
   */
  publishMediaPlayerId?: number;
  /**
   * The user role. See ClientRoleType.
   */
  clientRoleType?: ClientRoleType;
  /**
   * The latency level of an audience member in interactive live streaming. See AudienceLatencyLevelType.
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
  /**
   * The default video-stream type. See VideoStreamType.
   */
  defaultVideoStreamType?: VideoStreamType;
  /**
   * The channel profile. See ChannelProfileType.
   */
  channelProfile?: ChannelProfileType;
  /**
   * Delay (in milliseconds) for sending audio frames. You can use this parameter to set the delay of the audio frames that need to be sent, to ensure audio and video synchronization. To switch off the delay, set the value to 0.
   */
  audioDelayMs?: number;
  /**
   * @ignore
   */
  mediaPlayerAudioDelayMs?: number;
  /**
   * (Optional) The token generated on your server for authentication.
   *  This parameter takes effect only when calling updateChannelMediaOptions or updateChannelMediaOptionsEx.
   *  Ensure that the App ID, channel name, and user name used for creating the token are the same as those used by the initialize method for initializing the RTC engine, and those used by the joinChannel and joinChannelEx methods for joining the channel.
   */
  token?: string;
  /**
   * @ignore
   */
  enableBuiltInMediaEncryption?: boolean;
  /**
   * Whether to publish the sound of a metronome to remote users: true : Publish processed audio frames. Both the local user and remote users can hear the metronome. false : Do not publish the sound of the metronome. Only the local user can hear the metronome.
   */
  publishRhythmPlayerTrack?: boolean;
  /**
   * Whether to enable interactive mode: true : Enable interactive mode. Once this mode is enabled and the user role is set as audience, the user can receive remote video streams with low latency. false :Do not enable interactive mode. If this mode is disabled, the user receives the remote video streams in default settings.
   *  This parameter only applies to co-streaming scenarios. The cohosts need to call the joinChannelEx method to join the other host's channel as an audience member, and set isInteractiveAudience to true.
   *  This parameter takes effect only when the user role is ClientRoleAudience.
   */
  isInteractiveAudience?: boolean;
  /**
   * The video track ID returned by calling the createCustomVideoTrack method. The default value is 0.
   */
  customVideoTrackId?: number;
  /**
   * Whether the audio stream being published is filtered according to the volume algorithm: true : The audio stream is filtered. If the audio stream filter is not enabled, this setting does not takes effect. false : The audio stream is not filtered. If you need to enable this function, contact.
   */
  isAudioFilterable?: boolean;
  /**
   * @ignore
   */
  parameters?: string;
}

/**
 * The cloud proxy type.
 */
export enum ProxyType {
  /**
   * 0: Reserved for future use.
   */
  NoneProxyType = 0,
  /**
   * 1: The cloud proxy for the UDP protocol, that is, the Force UDP cloud proxy mode. In this mode, the SDK always transmits data over UDP.
   */
  UdpProxyType = 1,
  /**
   * 2: The cloud proxy for the TCP (encryption) protocol, that is, the Force TCP cloud proxy mode. In this mode, the SDK always transmits data over TCP/TLS 443.
   */
  TcpProxyType = 2,
  /**
   * 3: Reserved for future use.
   */
  LocalProxyType = 3,
  /**
   * 4: Automatic mode. In this mode, the SDK attempts a direct connection to SD-RTN™ and automatically switches to TCP/TLS 443 if the attempt fails.
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
 * The type of the advanced feature.
 */
export enum FeatureType {
  /**
   * 1: Virtual background.
   */
  VideoVirtualBackground = 1,
  /**
   * 2: Image enhancement.
   */
  VideoBeautyEffect = 2,
}

/**
 * The options for leaving a channel.
 */
export class LeaveChannelOptions {
  /**
   * Whether to stop playing and mixing the music file when a user leaves the channel. true : (Default) Stop playing and mixing the music file. false : Do not stop playing and mixing the music file.
   */
  stopAudioMixing?: boolean;
  /**
   * Whether to stop playing all audio effects when a user leaves the channel. true : (Default) Stop playing all audio effects. false : Do not stop playing any audio effect.
   */
  stopAllEffect?: boolean;
  /**
   * Whether to stop microphone recording when a user leaves the channel. true : (Default) Stop microphone recording. false : Do not stop microphone recording.
   */
  stopMicrophoneRecording?: boolean;
}

/**
 * The SDK uses the IRtcEngineEventHandler interface to send event notifications to your app. Your app can get those notifications through methods that inherit this interface.
 *
 * All methods in this interface have default (empty) implementation. You can choose to inherit events related to your app scenario.
 *  In the callbacks, avoid implementing time-consuming tasks or calling APIs that may cause thread blocking (such as sendMessage). Otherwise, the SDK may not work properly.
 *  The SDK no longer catches exceptions in the code logic that developers implement themselves in IRtcEngineEventHandler class. You need to handle this exception yourself, otherwise the app may crash when the exception occurs.
 */
export interface IRtcEngineEventHandler {
  /**
   * Occurs when a user joins a channel.
   *
   * This callback notifies the application that a user joins a specified channel.
   *
   * @param connection The connection information. See RtcConnection.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
   */
  onJoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * Occurs when a user rejoins the channel.
   *
   * @param connection The connection information. See RtcConnection.
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
   */
  onRejoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /**
   * Reports the proxy connection state.
   *
   * You can use this callback to listen for the state of the SDK connecting to a proxy. For example, when a user calls setCloudProxy and joins a channel successfully, the SDK triggers this callback to report the user ID, the proxy type connected, and the time elapsed fromthe user calling joinChannel until this callback is triggered.
   *
   * @param channel The channel name.
   * @param uid The user ID.
   * @param proxyType The proxy type connected. See ProxyType.
   * @param localProxyIp Reserved for future use.
   * @param elapsed The time elapsed (ms) from the user calling joinChannel until this callback is triggered.
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
   *
   * This callback indicates that an error (concerning network or media) occurs during SDK runtime. In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
   *
   * @param err Error code. See ErrorCodeType.
   * @param msg The error message.
   */
  onError?(err: ErrorCodeType, msg: string): void;

  /**
   * Reports the statistics of the audio stream sent by each remote user.
   *
   * Deprecated: Use onRemoteAudioStats instead. The SDK triggers this callback once every two seconds to report the audio quality of each remote user who is sending an audio stream. If a channel has multiple users sending audio streams, the SDK triggers this callback as many times.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID of the remote user sending the audio stream.
   * @param quality Audio quality of the user. See QualityType.
   * @param delay The network delay (ms) from the sender to the receiver, including the delay caused by audio sampling pre-processing, network transmission, and network jitter buffering.
   * @param lost The packet loss rate (%) of the audio packet sent from the remote user to the receiver.
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
   *
   * The SDK triggers this callback within 30 seconds after the app calls startLastmileProbeTest.
   *
   * @param result The uplink and downlink last-mile network probe test result. See LastmileProbeResult.
   */
  onLastmileProbeResult?(result: LastmileProbeResult): void;

  /**
   * Reports the volume information of users.
   *
   * By default, this callback is disabled. You can enable it by calling enableAudioVolumeIndication. Once this callback is enabled and users send streams in the channel, the SDK triggers the onAudioVolumeIndication callback according to the time interval set in enableAudioVolumeIndication. The SDK triggers two independent onAudioVolumeIndication callbacks simultaneously, which separately report the volume information of the local user who sends a stream and the remote users (up to three) whose instantaneous volume is the highest. Once this callback is enabled, if the local user calls the muteLocalAudioStream method to mute, the SDK continues to report the volume indication of the local user. If a remote user whose volume is one of the three highest in the channel stops publishing the audio stream for 20 seconds, the callback excludes this user's information; if all remote users stop publishing audio streams for 20 seconds, the SDK stops triggering the callback for remote users.
   *
   * @param connection The connection information. See RtcConnection.
   * @param speakers The volume information of the users. See AudioVolumeInfo. An empty speakers array in the callback indicates that no remote user is in the channel or is sending a stream.
   * @param speakerNumber The total number of users.
   *  In the callback for the local user, if the local user is sending streams, the value of speakerNumber is 1.
   *  In the callback for remote users, the value range of speakerNumber is [0,3]. If the number of remote users who send streams is greater than or equal to three, the value of speakerNumber is 3.
   * @param totalVolume The volume of the speaker. The value range is [0,255].
   *  In the callback for the local user, totalVolume is the volume of the local user who sends a stream. In the callback for remote users, totalVolume is the sum of the volume of all remote users (up to three) whose instantaneous volume is the highest.
   */
  onAudioVolumeIndication?(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): void;

  /**
   * Occurs when a user leaves a channel.
   *
   * You can obtain information such as the total duration of a call, and the data traffic that the SDK transmits and receives.
   *
   * @param connection The connection information. See RtcConnection.
   * @param stats Call statistics. See RtcStats.
   */
  onLeaveChannel?(connection: RtcConnection, stats: RtcStats): void;

  /**
   * Reports the statistics about the current call.
   *
   * @param connection The connection information. See RtcConnection.
   * @param stats Statistics of the RTC engine. See RtcStats.
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
   * Reports the playback progress of a music file.
   *
   * After you called the startAudioMixing method to play a music file, the SDK triggers this callback every two seconds to report the playback progress.
   *
   * @param position The playback progress (ms).
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  onAudioMixingPositionChanged?(position: number): void;

  /**
   * Occurs when the playback of the local music file finishes.
   *
   * Deprecated: Use onAudioMixingStateChanged instead. After you call startAudioMixing to play a local music file, this callback occurs when the playback finishes. If the call of startAudioMixing fails, the error code WARN_AUDIO_MIXING_OPEN_ERROR is returned.
   */
  onAudioMixingFinished?(): void;

  /**
   * Occurs when the playback of the local music file finishes.
   *
   * This callback occurs when the local audio effect file finishes playing.
   *
   * @param soundId The ID of the audio effect. The ID of each audio effect file is unique.
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
   * Reports the last mile network quality of each user in the channel.
   *
   * This callback reports the last mile network conditions of each user in the channel. Last mile refers to the connection between the local device and Agora's edge server. The SDK triggers this callback once every two seconds. If a channel includes multiple users, the SDK triggers this callback as many times. This callback provides feedback on network quality through sending and receiving broadcast packets within the channel. Excessive broadcast packets can lead to broadcast storms. To prevent broadcast storms from causing a large amount of data transmission within the channel, this callback supports feedback on the network quality of up to 4 remote hosts simultaneously by default. txQuality is Unknown when the user is not sending a stream; rxQuality is Unknown when the user is not receiving a stream.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID. The network quality of the user with this user ID is reported. If the uid is 0, the local network quality is reported.
   * @param txQuality Uplink network quality rating of the user in terms of the transmission bit rate, packet loss rate, average RTT (Round-Trip Time) and jitter of the uplink network. This parameter is a quality rating helping you understand how well the current uplink network conditions can support the selected video encoder configuration. For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution of 640 × 480 and a frame rate of 15 fps in the LIVE_BROADCASTING profile, but might be inadequate for resolutions higher than 1280 × 720. QualityUnknown (0): The quality is unknown. QualityExcellent (1): The quality is excellent. QualityGood (2): The network quality seems excellent, but the bitrate can be slightly lower than excellent. QualityPoor (3): Users can feel the communication is slightly impaired. QualityBad (4): Users cannot communicate smoothly. QualityVbad (5): The quality is so bad that users can barely communicate. QualityDown (6): The network is down, and users cannot communicate at all.
   * @param rxQuality Downlink network quality rating of the user in terms of packet loss rate, average RTT, and jitter of the downlink network. QualityUnknown (0): The quality is unknown. QualityExcellent (1): The quality is excellent. QualityGood (2): The network quality seems excellent, but the bitrate can be slightly lower than excellent. QualityPoor (3): Users can feel the communication is slightly impaired. QualityBad (4): Users cannot communicate smoothly. QualityVbad (5): The quality is so bad that users can barely communicate. QualityDown (6): The network is down, and users cannot communicate at all.
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
   *
   * The SDK triggers this callback when the uplink network information changes. This callback only applies to scenarios where you push externally encoded video data in H.264 format to the SDK.
   *
   * @param info The uplink network information. See UplinkNetworkInfo.
   */
  onUplinkNetworkInfoUpdated?(info: UplinkNetworkInfo): void;

  /**
   * @ignore
   */
  onDownlinkNetworkInfoUpdated?(info: DownlinkNetworkInfo): void;

  /**
   * Reports the last-mile network quality of the local user.
   *
   * This callback reports the last-mile network conditions of the local user before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server. Before the user joins the channel, this callback is triggered by the SDK once startLastmileProbeTest is called and reports the last-mile network conditions of the local user.
   *
   * @param quality The last-mile network quality. QualityUnknown (0): The quality is unknown. QualityExcellent (1): The quality is excellent. QualityGood (2): The network quality seems excellent, but the bitrate can be slightly lower than excellent. QualityPoor (3): Users can feel the communication is slightly impaired. QualityBad (4): Users cannot communicate smoothly. QualityVbad (5): The quality is so bad that users can barely communicate. QualityDown (6): The network is down, and users cannot communicate at all. See QualityType.
   */
  onLastmileQuality?(quality: QualityType): void;

  /**
   * Occurs when the first local video frame is displayed on the local video view.
   *
   * The SDK triggers this callback when the first local video frame is displayed on the local video view.
   *
   * @param source The type of the video source. See VideoSourceType.
   * @param width The width (px) of the first local video frame.
   * @param height The height (px) of the first local video frame.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel to join the channel to when the SDK triggers this callback. If startPreviewWithoutSourceType / startPreview is called before joining the channel, this parameter indicates the time elapsed from calling startPreviewWithoutSourceType or startPreview to when this event occurred.
   */
  onFirstLocalVideoFrame?(
    source: VideoSourceType,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the first video frame is published.
   *
   * The SDK triggers this callback under one of the following circumstances:
   *  The local client enables the video module and calls joinChannel to join the channel successfully.
   *  The local client calls muteLocalVideoStream (true) and muteLocalVideoStream (false) in sequence.
   *  The local client calls disableVideo and enableVideo in sequence.
   *
   * @param connection The connection information. See RtcConnection.
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel until this callback is triggered.
   */
  onFirstLocalVideoFramePublished?(
    source: VideoSourceType,
    elapsed: number
  ): void;

  /**
   * Occurs when the first remote video frame is received and decoded.
   *
   * The SDK triggers this callback under one of the following circumstances:
   *  The remote user joins the channel and sends the video stream.
   *  The remote user stops sending the video stream and re-sends it after 15 seconds. Reasons for such an interruption include:
   *  The remote user leaves the channel.
   *  The remote user drops offline.
   *  The remote user calls disableVideo to disable video.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID of the remote user sending the video stream.
   * @param width The width (px) of the video stream.
   * @param height The height (px) of the video stream.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
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
   * @param connection The connection information. See RtcConnection.
   * @param sourceType The type of the video source. See VideoSourceType.
   * @param uid The ID of the user whose video size or rotation changes. (The uid for the local user is 0. The video is the local user's video preview).
   * @param width The width (pixels) of the video stream.
   * @param height The height (pixels) of the video stream.
   * @param rotation The rotation information. The value range is [0,360). On the iOS platform, the parameter value is always 0.
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
   *
   * When the status of the local video changes, the SDK triggers this callback to report the current local video state and the reason for the state change.
   *
   * @param source The type of the video source. See VideoSourceType.
   * @param state The state of the local video, see LocalVideoStreamState.
   * @param reason The reasons for changes in local video state. See LocalVideoStreamReason.
   */
  onLocalVideoStateChanged?(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    reason: LocalVideoStreamReason
  ): void;

  /**
   * Occurs when the remote video stream state changes.
   *
   * This callback does not work properly when the number of users (in the communication profile) or hosts (in the live streaming channel) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user whose video state changes.
   * @param state The state of the remote video. See RemoteVideoState.
   * @param reason The reason for the remote video state change. See RemoteVideoStateReason.
   * @param elapsed Time elapsed (ms) from the local user calling the joinChannel method until the SDK triggers this callback.
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
   * This callback is only triggered when the video frame is rendered by the SDK; it will not be triggered if the user employs custom video rendering.You need to implement this independently using methods outside the SDK.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID of the remote user sending the video stream.
   * @param width The width (px) of the video stream.
   * @param height The height (px) of the video stream.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
   */
  onFirstRemoteVideoFrame?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /**
   * Occurs when a remote user (in the communication profile)/ host (in the live streaming profile) joins the channel.
   *
   * In a communication channel, this callback indicates that a remote user joins the channel. The SDK also triggers this callback to report the existing users in the channel when a user joins the channel.
   *  In a live-broadcast channel, this callback indicates that a host joins the channel. The SDK also triggers this callback to report the existing hosts in the channel when a host joins the channel. Agora recommends limiting the number of hosts to 17.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the user or host who joins the channel.
   * @param elapsed Time delay (ms) from the local user calling joinChannel until this callback is triggered.
   */
  onUserJoined?(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void;

  /**
   * Occurs when a remote user (in the communication profile)/ host (in the live streaming profile) leaves the channel.
   *
   * There are generally two reasons for users to become offline:
   *  Leave the channel: When a user/host leaves the channel, the user/host sends a goodbye message.
   *  Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections. It is recommended to use the Agora RTM SDK for reliable offline detection.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the user who leaves the channel or goes offline.
   * @param reason Reasons why a remote user (in the communication profile) or host (in the live streaming profile) goes offline. See UserOfflineReasonType.
   */
  onUserOffline?(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void;

  /**
   * Occurs when a remote user (in the communication profile) or a host (in the live streaming profile) stops/resumes sending the audio stream.
   *
   * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the muteLocalAudioStream method. This callback does not work properly when the number of users (in the communication profile) or hosts (in the live streaming channel) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID.
   * @param muted Whether the remote user's audio stream is muted: true : User's audio stream is muted. false : User's audio stream is unmuted.
   */
  onUserMuteAudio?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * Occurs when a remote user stops or resumes publishing the video stream.
   *
   * When a remote user calls muteLocalVideoStream to stop or resume publishing the video stream, the SDK triggers this callback to report to the local user the state of the streams published by the remote user. This callback can be inaccurate when the number of users (in the communication profile) or hosts (in the live streaming profile) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID of the remote user.
   * @param muted Whether the remote user stops publishing the video stream: true : The remote user stops publishing the video stream. false : The remote user resumes publishing the video stream.
   */
  onUserMuteVideo?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /**
   * Occurs when a remote user enables or disables the video module.
   *
   * Once the video module is disabled, the user can only use a voice call. The user cannot send or receive any video. The SDK triggers this callback when a remote user enables or disables the video module by calling the enableVideo or disableVideo method.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID of the remote user.
   * @param enabled true : The video module is enabled. false : The video module is disabled.
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
   *
   * Deprecated: This callback is deprecated, use the following enumerations in the onRemoteVideoStateChanged callback: RemoteVideoStateStopped (0) and RemoteVideoStateReasonRemoteMuted (5). RemoteVideoStateDecoding (2) and RemoteVideoStateReasonRemoteUnmuted (6). The SDK triggers this callback when the remote user resumes or stops capturing the video stream by calling the enableLocalVideo method.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The user ID of the remote user.
   * @param enabled Whether the specified remote user enables/disables local video capturing: true : The video module is enabled. Other users in the channel can see the video of this remote user. false : The video module is disabled. Other users in the channel can no longer receive the video stream from this remote user, while this remote user can still receive the video streams from other users.
   */
  onUserEnableLocalVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /**
   * Reports the transport-layer statistics of each remote audio stream.
   *
   * The SDK triggers this callback once every two seconds for each remote user who is sending audio streams. If a channel includes multiple remote users, the SDK triggers this callback as many times.
   *
   * @param connection The connection information. See RtcConnection.
   * @param stats The statistics of the received remote audio streams. See RemoteAudioStats.
   */
  onRemoteAudioStats?(connection: RtcConnection, stats: RemoteAudioStats): void;

  /**
   * Reports the statistics of the local audio stream.
   *
   * The SDK triggers this callback once every two seconds.
   *
   * @param connection The connection information. See RtcConnection.
   * @param stats Local audio statistics. See LocalAudioStats.
   */
  onLocalAudioStats?(connection: RtcConnection, stats: LocalAudioStats): void;

  /**
   * Reports the statistics of the local video stream.
   *
   * The SDK triggers this callback once every two seconds to report the statistics of the local video stream.
   *
   * @param connection The connection information. See RtcConnection.
   * @param stats The statistics of the local video stream. See LocalVideoStats.
   */
  onLocalVideoStats?(connection: RtcConnection, stats: LocalVideoStats): void;

  /**
   * Reports the statistics of the video stream sent by each remote users.
   *
   * Reports the statistics of the video stream from the remote users. The SDK triggers this callback once every two seconds for each remote user. If a channel has multiple users/hosts sending video streams, the SDK triggers this callback as many times.
   *
   * @param connection The connection information. See RtcConnection.
   * @param stats Statistics of the remote video stream. See RemoteVideoStats.
   */
  onRemoteVideoStats?(connection: RtcConnection, stats: RemoteVideoStats): void;

  /**
   * Occurs when the camera turns on and is ready to capture the video.
   *
   * Deprecated: Use LocalVideoStreamStateCapturing (1) in onLocalVideoStateChanged instead. This callback indicates that the camera has been successfully turned on and you can start to capture video.
   */
  onCameraReady?(): void;

  /**
   * Occurs when the camera focus area changes.
   *
   * The SDK triggers this callback when the local user changes the camera focus position by calling setCameraFocusPositionInPreview. This callback is for Android and iOS only.
   *
   * @param x The x-coordinate of the changed camera focus area.
   * @param y The y-coordinate of the changed camera focus area.
   * @param width The width of the changed camera focus area.
   * @param height The height of the changed camera focus area.
   */
  onCameraFocusAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * Occurs when the camera exposure area changes.
   *
   * The SDK triggers this callback when the local user changes the camera exposure position by calling setCameraExposurePosition. This callback is for Android and iOS only.
   *
   * @param x The x coordinate of the changed camera exposure area.
   * @param y The y coordinate of the changed camera exposure area.
   * @param width The width of the changed camera exposure area.
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
   *
   * Once you enable face detection by calling enableFaceDetection (true), you can get the following information on the local user in real-time:
   *  The width and height of the local video.
   *  The position of the human face in the local view.
   *  The distance between the human face and the screen. This value is based on the fitting calculation of the local video size and the position of the human face.
   *  When it is detected that the face in front of the camera disappears, the callback will be triggered immediately. When no human face is detected, the frequency of this callback to be triggered wil be decreased to reduce power consumption on the local device.
   *  The SDK stops triggering this callback when a human face is in close proximity to the screen.
   *
   * @param imageWidth The width (px) of the video image captured by the local camera.
   * @param imageHeight The height (px) of the video image captured by the local camera.
   * @param vecRectangle The information of the detected human face. See Rectangle.
   * @param vecDistance The distance between the human face and the device screen (cm).
   * @param numFaces The number of faces detected. If the value is 0, it means that no human face is detected.
   */
  onFacePositionChanged?(
    imageWidth: number,
    imageHeight: number,
    vecRectangle: Rectangle[],
    vecDistance: number[],
    numFaces: number
  ): void;

  /**
   * Occurs when the video stops playing.
   *
   * Deprecated: Use LocalVideoStreamStateStopped (0) in the onLocalVideoStateChanged callback instead. The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops playing.
   */
  onVideoStopped?(): void;

  /**
   * Occurs when the playback state of the music file changes.
   *
   * This callback occurs when the playback state of the music file changes, and reports the current state and error code.
   *
   * @param state The playback state of the music file. See AudioMixingStateType.
   * @param reason Error code. See AudioMixingReasonType.
   */
  onAudioMixingStateChanged?(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ): void;

  /**
   * Occurs when the state of virtual metronome changes.
   *
   * When the state of the virtual metronome changes, the SDK triggers this callback to report the current state of the virtual metronome. This callback indicates the state of the local audio stream and enables you to troubleshoot issues when audio exceptions occur.
   *
   * @param state For the current virtual metronome status, see RhythmPlayerStateType.
   * @param errorCode For the error codes and error messages related to virtual metronome errors, see RhythmPlayerReason.
   */
  onRhythmPlayerStateChanged?(
    state: RhythmPlayerStateType,
    reason: RhythmPlayerReason
  ): void;

  /**
   * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
   *
   * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling the joinChannel method, regardless of whether it is in the channel. If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
   *
   * @param connection The connection information. See RtcConnection.
   */
  onConnectionLost?(connection: RtcConnection): void;

  /**
   * Occurs when the connection between the SDK and the server is interrupted.
   *
   * Deprecated: Use onConnectionStateChanged instead. The SDK triggers this callback when it loses connection with the server for more than four seconds after the connection is established. After triggering this callback, the SDK tries to reconnect to the server. You can use this callback to implement pop-up reminders. The differences between this callback and onConnectionLost are as follow:
   *  The SDK triggers the onConnectionInterrupted callback when it loses connection with the server for more than four seconds after it successfully joins the channel.
   *  The SDK triggers the onConnectionLost callback when it loses connection with the server for more than 10 seconds, whether or not it joins the channel. If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
   *
   * @param connection The connection information. See RtcConnection.
   */
  onConnectionInterrupted?(connection: RtcConnection): void;

  /**
   * Occurs when the connection is banned by the Agora server.
   *
   * Deprecated: Use onConnectionStateChanged instead.
   *
   * @param connection The connection information. See RtcConnection.
   */
  onConnectionBanned?(connection: RtcConnection): void;

  /**
   * Occurs when the local user receives the data stream from the remote user.
   *
   * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the sendStreamMessage method.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user sending the message.
   * @param streamId The stream ID of the received message.
   * @param data The data received.
   * @param length The data length (byte).
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
   *
   * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the sendStreamMessage method.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user sending the message.
   * @param streamId The stream ID of the received message.
   * @param code The error code. See ErrorCodeType.
   * @param missed The number of lost messages.
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
   *
   * The SDK triggers this callback if the token expires. When receiving this callback, you need to generate a new token on your token server and you can renew your token through one of the following ways:
   *  In scenarios involving one channel:
   *  Call renewToken to pass in the new token.
   *  Call leaveChannel to leave the current channel and then pass in the new token when you call joinChannel to join a channel.
   *  In scenarios involving mutiple channels: Call updateChannelMediaOptionsEx to pass in the new token.
   *
   * @param connection The connection information. See RtcConnection.
   */
  onRequestToken?(connection: RtcConnection): void;

  /**
   * Occurs when the token expires in 30 seconds.
   *
   * When receiving this callback, you need to generate a new token on your token server and you can renew your token through one of the following ways:
   *  In scenarios involving one channel:
   *  Call renewToken to pass in the new token.
   *  Call leaveChannel to leave the current channel and then pass in the new token when you call joinChannel to join a channel.
   *  In scenarios involving mutiple channels: Call updateChannelMediaOptionsEx to pass in the new token.
   *
   * @param connection The connection information. See RtcConnection.
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
   * Occurs when the first audio frame is published.
   *
   * The SDK triggers this callback under one of the following circumstances:
   *  The local client enables the audio module and calls joinChannel successfully.
   *  The local client calls muteLocalAudioStream (true) and muteLocalAudioStream (false) in sequence.
   *  The local client calls disableAudio and enableAudio in sequence.
   *
   * @param connection The connection information. See RtcConnection.
   * @param elapsed Time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
   */
  onFirstLocalAudioFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /**
   * Occurs when the SDK decodes the first remote audio frame for playback.
   *
   * Deprecated: Use onRemoteAudioStateChanged instead. The SDK triggers this callback under one of the following circumstances:
   *  The remote user joins the channel and sends the audio stream for the first time.
   *  The remote user's audio is offline and then goes online to re-send audio. It means the local user cannot receive audio in 15 seconds. Reasons for such an interruption include:
   *  The remote user leaves channel.
   *  The remote user drops offline.
   *  The remote user calls muteLocalAudioStream to stop sending the audio stream.
   *  The remote user calls disableAudio to disable audio.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID of the remote user.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
   */
  onFirstRemoteAudioDecoded?(
    connection: RtcConnection,
    uid: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the SDK receives the first audio frame from a specific remote user.
   *
   * Deprecated: Use onRemoteAudioStateChanged instead.
   *
   * @param connection The connection information. See RtcConnection.
   * @param userId The user ID of the remote user.
   * @param elapsed The time elapsed (ms) from the local user calling joinChannel until the SDK triggers this callback.
   */
  onFirstRemoteAudioFrame?(
    connection: RtcConnection,
    userId: number,
    elapsed: number
  ): void;

  /**
   * Occurs when the local audio stream state changes.
   *
   * When the state of the local audio stream changes (including the state of the audio capture and encoding), the SDK triggers this callback to report the current state. This callback indicates the state of the local audio stream, and allows you to troubleshoot issues when audio exceptions occur. When the state is LocalAudioStreamStateFailed (3), you can view the error information in the error parameter.
   *
   * @param connection The connection information. See RtcConnection.
   * @param state The state of the local audio. See LocalAudioStreamState.
   * @param reason Reasons for local audio state changes. See LocalAudioStreamReason.
   */
  onLocalAudioStateChanged?(
    connection: RtcConnection,
    state: LocalAudioStreamState,
    reason: LocalAudioStreamReason
  ): void;

  /**
   * Occurs when the remote audio state changes.
   *
   * When the audio state of a remote user (in a voice/video call channel) or host (in a live streaming channel) changes, the SDK triggers this callback to report the current state of the remote audio stream. This callback does not work properly when the number of users (in the communication profile) or hosts (in the live streaming channel) in a channel exceeds 17.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user whose audio state changes.
   * @param state The state of the remote audio. See RemoteAudioState.
   * @param reason The reason of the remote audio state change. See RemoteAudioStateReason.
   * @param elapsed Time elapsed (ms) from the local user calling the joinChannel method until the SDK triggers this callback.
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
   * After a successful call of enableAudioVolumeIndication, the SDK continuously detects which remote user has the loudest volume. During the current period, the remote user whose volume is detected as the loudest for the most times, is the most active user. When the number of users is no less than two and an active remote speaker exists, the SDK triggers this callback and reports the uid of the most active remote speaker.
   *  If the most active remote speaker is always the same user, the SDK triggers the onActiveSpeaker callback only once.
   *  If the most active remote speaker changes to another user, the SDK triggers this callback again and reports the uid of the new active remote speaker.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID of the most active speaker.
   */
  onActiveSpeaker?(connection: RtcConnection, uid: number): void;

  /**
   * @ignore
   */
  onContentInspectResult?(result: ContentInspectResult): void;

  /**
   * Reports the result of taking a video snapshot.
   *
   * After a successful takeSnapshot method call, the SDK triggers this callback to report whether the snapshot is successfully taken as well as the details for the snapshot taken.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID. One uid of 0 indicates the local user.
   * @param filePath The local path of the snapshot.
   * @param width The width (px) of the snapshot.
   * @param height The height (px) of the snapshot.
   * @param errCode The message that confirms success or gives the reason why the snapshot is not successfully taken:
   *  0: Success.
   *  < 0: Failure:
   *  -1: The SDK fails to write data to a file or encode a JPEG image.
   *  -2: The SDK does not find the video stream of the specified user within one second after the takeSnapshot method call succeeds. The possible reasons are: local capture stops, remote end stops publishing, or video data processing is blocked.
   *  -3: Calling the takeSnapshot method too frequently.
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
   * Occurs when the user role or the audience latency level changes.
   *
   * @param connection The connection information. See RtcConnection.
   * @param oldRole Role that the user switches from: ClientRoleType.
   * @param newRole Role that the user switches to: ClientRoleType.
   * @param newRoleOptions Properties of the role that the user switches to. See ClientRoleOptions.
   */
  onClientRoleChanged?(
    connection: RtcConnection,
    oldRole: ClientRoleType,
    newRole: ClientRoleType,
    newRoleOptions: ClientRoleOptions
  ): void;

  /**
   * Occurs when switching a user role fails.
   *
   * This callback informs you about the reason for failing to switching and your current user role.
   *
   * @param connection The connection information. See RtcConnection.
   * @param reason The reason for a user role switch failure. See ClientRoleChangeFailedReason.
   * @param currentRole Current user role. See ClientRoleType.
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
   * Occurs when the state of Media Push changes.
   *
   * When the state of Media Push changes, the SDK triggers this callback and reports the URL address and the current state of the Media Push. This callback indicates the state of the Media Push. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the error code parameter.
   *
   * @param url The URL address where the state of the Media Push changes.
   * @param state The current state of the Media Push. See RtmpStreamPublishState.
   * @param reason Reasons for the changes in the Media Push status. See RtmpStreamPublishReason.
   */
  onRtmpStreamingStateChanged?(
    url: string,
    state: RtmpStreamPublishState,
    reason: RtmpStreamPublishReason
  ): void;

  /**
   * Reports events during the Media Push.
   *
   * @param url The URL for Media Push.
   * @param eventCode The event code of Media Push. See RtmpStreamingEvent.
   */
  onRtmpStreamingEvent?(url: string, eventCode: RtmpStreamingEvent): void;

  /**
   * Occurs when the publisher's transcoding is updated.
   *
   * When the LiveTranscoding class in the startRtmpStreamWithTranscoding method updates, the SDK triggers the onTranscodingUpdated callback to report the update information. If you call the startRtmpStreamWithTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
   */
  onTranscodingUpdated?(): void;

  /**
   * Occurs when the local audio route changes.
   *
   * @param routing The current audio routing.
   *  -1: The default audio route.
   *  0: The audio route is a headset with a microphone.
   *  1: The audio route is an earpiece.
   *  2: The audio route is a headset without a microphone.
   *  3: The audio route is the speaker that comes with the device.
   *  4: The audio route is an external speaker. (For iOS and macOS only)
   *  (5): The audio route is a Bluetooth headset.
   */
  onAudioRoutingChanged?(routing: number): void;

  /**
   * Occurs when the state of the media stream relay changes.
   *
   * The SDK returns the state of the current media relay with any error message.
   *
   * @param state The state code. See ChannelMediaRelayState.
   * @param code The error code of the channel media relay. See ChannelMediaRelayError.
   */
  onChannelMediaRelayStateChanged?(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void;

  /**
   * @ignore
   */
  onLocalPublishFallbackToAudioOnly?(isFallbackOrRecover: boolean): void;

  /**
   * Occurs when the remote media stream falls back to the audio-only stream due to poor network conditions or switches back to the video stream after the network conditions improve.
   *
   * If you call setRemoteSubscribeFallbackOption and set option to StreamFallbackOptionAudioOnly, the SDK triggers this callback in the following situations:
   *  The downstream network condition is poor, and the subscribed video stream is downgraded to audio-only stream.
   *  The downstream network condition has improved, and the subscribed stream has been restored to video stream. Once the remote media stream switches to the low-quality video stream due to weak network conditions, you can monitor the stream switch between a high-quality and low-quality stream in the onRemoteVideoStats callback.
   *
   * @param uid The user ID of the remote user.
   * @param isFallbackOrRecover true : The subscribed media stream falls back to audio-only due to poor network conditions. false : The subscribed media stream switches back to the video stream after the network conditions improve.
   */
  onRemoteSubscribeFallbackToAudioOnly?(
    uid: number,
    isFallbackOrRecover: boolean
  ): void;

  /**
   * Reports the transport-layer statistics of each remote audio stream.
   *
   * Deprecated: Use onRemoteAudioStats instead. This callback reports the transport-layer statistics, such as the packet loss rate and network time delay after the local user receives an audio packet from a remote user. During a call, when the user receives the audio packet sent by the remote user, the callback is triggered every 2 seconds.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user sending the audio streams.
   * @param delay The network delay (ms) from the remote user to the receiver.
   * @param lost The packet loss rate (%) of the audio packet sent from the remote user to the receiver.
   * @param rxKBitrate The bitrate of the received audio (Kbps).
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
   *
   * Deprecated: This callback is deprecated. Use onRemoteVideoStats instead. This callback reports the transport-layer statistics, such as the packet loss rate and network time delay after the local user receives a video packet from a remote user. During a call, when the user receives the video packet sent by the remote user/host, the callback is triggered every 2 seconds.
   *
   * @param connection The connection information. See RtcConnection.
   * @param remoteUid The ID of the remote user sending the video packets.
   * @param delay The network delay (ms) from the sender to the receiver.
   * @param lost The packet loss rate (%) of the video packet sent from the remote user.
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
   *
   * When the network connection state changes, the SDK triggers this callback and reports the current connection state and the reason for the change.
   *
   * @param connection The connection information. See RtcConnection.
   * @param state The current connection state. See ConnectionStateType.
   * @param reason The reason for a connection state change. See ConnectionChangedReasonType.
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
   *
   * This callback occurs when the connection state of the local user changes. You can get the connection state and reason for the state change in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
   *
   * @param connection The connection information. See RtcConnection.
   * @param type The type of the local network connection. See NetworkType.
   */
  onNetworkTypeChanged?(connection: RtcConnection, type: NetworkType): void;

  /**
   * Reports the built-in encryption errors.
   *
   * When encryption is enabled by calling enableEncryption, the SDK triggers this callback if an error occurs in encryption or decryption on the sender or the receiver side.
   *
   * @param connection The connection information. See RtcConnection.
   * @param errorType Details about the error type. See EncryptionErrorType.
   */
  onEncryptionError?(
    connection: RtcConnection,
    errorType: EncryptionErrorType
  ): void;

  /**
   * Occurs when the SDK cannot get the device permission.
   *
   * When the SDK fails to get the device permission, the SDK triggers this callback to report which device permission cannot be got.
   *
   * @param permissionType The type of the device permission. See PermissionType.
   */
  onPermissionError?(permissionType: PermissionType): void;

  /**
   * Occurs when the local user registers a user account.
   *
   * After the local user successfully calls registerLocalUserAccount to register the user account or calls joinChannelWithUserAccount to join a channel, the SDK triggers the callback and informs the local user's UID and User Account.
   *
   * @param uid The ID of the local user.
   * @param userAccount The user account of the local user.
   */
  onLocalUserRegistered?(uid: number, userAccount: string): void;

  /**
   * Occurs when the SDK gets the user ID and user account of the remote user.
   *
   * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object, and triggers this callback on the local client.
   *
   * @param uid The user ID of the remote user.
   * @param info The UserInfo object that contains the user ID and user account of the remote user. See UserInfo for details.
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
   * Video frame rendering event callback.
   *
   * After calling the startMediaRenderingTracing method or joining the channel, the SDK triggers this callback to report the events of video frame rendering and the indicators during the rendering process. Developers can optimize the indicators to improve the efficiency of the first video frame rendering.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID.
   * @param currentEvent The current video frame rendering event. See MediaTraceEvent.
   * @param tracingInfo The indicators during the video frame rendering process. Developers need to reduce the value of indicators as much as possible in order to improve the efficiency of the first video frame rendering. See VideoRenderingTracingInfo.
   */
  onVideoRenderingTracingResult?(
    connection: RtcConnection,
    uid: number,
    currentEvent: MediaTraceEvent,
    tracingInfo: VideoRenderingTracingInfo
  ): void;

  /**
   * Occurs when there's an error during the local video mixing.
   *
   * When you fail to call startLocalVideoTranscoder or updateLocalTranscoderConfiguration, the SDK triggers this callback to report the reason.
   *
   * @param stream The video streams that cannot be mixed during video mixing. See TranscodingVideoStream.
   * @param error The reason for local video mixing error. See VideoTranscoderError.
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
   * Occurs when the audio subscribing state changes.
   *
   * @param channel The channel name.
   * @param uid The user ID of the remote user.
   * @param oldState The previous subscribing status. See StreamSubscribeState.
   * @param newState The current subscribing status. See StreamSubscribeState.
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
   * @param uid The user ID of the remote user.
   * @param oldState The previous subscribing status. See StreamSubscribeState.
   * @param newState The current subscribing status. See StreamSubscribeState.
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
   * @param oldState The previous publishing state. See StreamPublishState.
   * @param newState The current publishing stat. See StreamPublishState.
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
   * @param source The type of the video source. See VideoSourceType.
   * @param channel The channel name.
   * @param oldState The previous publishing state. See StreamPublishState.
   * @param newState The current publishing stat. See StreamPublishState.
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
   * Occurs when the local user receives a mixed video stream carrying layout information.
   *
   * When the local user receives a mixed video stream sent by the video mixing server for the first time, or when there is a change in the layout information of the mixed stream, the SDK triggers this callback, reporting the layout information of each sub-video stream within the mixed video stream.
   *
   * @param connection The connection information. See RtcConnection.
   *
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
   * The event callback of the extension.
   *
   * To listen for events while the extension is running, you need to register this callback.
   *
   * @param context The context information of the extension, see ExtensionContext.
   * @param key The key of the extension.
   * @param value The value of the extension key.
   */
  onExtensionEventWithContext?(
    context: ExtensionContext,
    key: string,
    value: string
  ): void;

  /**
   * Occurrs when the extension is enabled.
   *
   * The callback is triggered after the extension is successfully enabled.
   *
   * @param context The context information of the extension, see ExtensionContext.
   */
  onExtensionStartedWithContext?(context: ExtensionContext): void;

  /**
   * Occurs when the extension is disabled.
   *
   * The callback is triggered after the extension is successfully disabled.
   *
   * @param context The context information of the extension, see ExtensionContext.
   */
  onExtensionStoppedWithContext?(context: ExtensionContext): void;

  /**
   * Occurs when the extension runs incorrectly.
   *
   * In case of extension enabling failure or runtime errors, the extension triggers this callback and reports the error code along with the reasons.
   *
   * @param context The context information of the extension, see ExtensionContext.
   * @param error Error code. For details, see the extension documentation provided by the extension provider.
   * @param message Reason. For details, see the extension documentation provided by the extension provider.
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
   * The channel profile. See ChannelProfileType.
   */
  channelProfile?: ChannelProfileType;
  /**
   * @ignore
   */
  license?: string;
  /**
   * The audio scenarios. Under different audio scenarios, the device uses different volume types. See AudioScenarioType.
   */
  audioScenario?: AudioScenarioType;
  /**
   * The region for connection. This is an advanced feature and applies to scenarios that have regional restrictions. The area codes support bitwise operation.
   */
  areaCode?: number;
  /**
   * The SDK log files are: agorasdk.log, agorasdk.1.log, agorasdk.2.log, agorasdk.3.log, and agorasdk.4.log.
   *  The API call log files are: agoraapi.log, agoraapi.1.log, agoraapi.2.log, agoraapi.3.log, and agoraapi.4.log.
   *  The default size of each SDK log file and API log file is 2,048 KB. These log files are encoded in UTF-8.
   *  The SDK writes the latest logs in agorasdk.log or agoraapi.log.
   *  When agorasdk.log is full, the SDK processes the log files in the following order:
   *  Delete the agorasdk.4.log file (if any).
   *  Rename agorasdk.3.log to agorasdk.4.log.
   *  Rename agorasdk.2.log to agorasdk.3.log.
   *  Rename agorasdk.1.log to agorasdk.2.log.
   *  Create a new agorasdk.log file.
   *  The overwrite rules for the agoraapi.log file are the same as for agorasdk.log. Sets the log file size. See LogConfig. By default, the SDK generates five SDK log files and five API call log files with the following rules:
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
   * Whether to enable domain name restriction: true : Enables the domain name restriction. This value is suitable for scenarios where IoT devices use IoT cards for network access. The SDK will only connect to servers in the domain name or IP whitelist that has been reported to the operator. false : (Default) Disables the domain name restriction. This value is suitable for most common scenarios.
   */
  domainLimit?: boolean;
  /**
   * Whether to automatically register the Agora extensions when initializing IRtcEngine : true : (Default) Automatically register the Agora extensions when initializing IRtcEngine. false : Do not register the Agora extensions when initializing IRtcEngine. You need to call enableExtension to register the Agora extensions.
   */
  autoRegisterAgoraExtensions?: boolean;
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
   * The channel name.
   */
  channelId?: string;
  /**
   * The user ID.
   *  For the recipient: The ID of the remote user who sent the Metadata.
   *  For the sender: Ignore it.
   */
  uid?: number;
  /**
   * The buffer size of the sent or received Metadata.
   */
  size?: number;
  /**
   * The buffer address of the received Metadata.
   */
  buffer?: Uint8Array;
  /**
   * The timestamp (ms) of when the Metadata is sent.
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
   * @param metadata The metadata received. See Metadata.
   */
  onMetadataReceived?(metadata: Metadata): void;
}

/**
 * Reasons for the changes in CDN streaming status.
 */
export enum DirectCdnStreamingReason {
  /**
   * 0: No error.
   */
  DirectCdnStreamingReasonOk = 0,
  /**
   * 1: A general error; no specific reason. You can try to push the media stream again.
   */
  DirectCdnStreamingReasonFailed = 1,
  /**
   * 2: An error occurs when pushing audio streams. For example, the local audio capture device is not working properly, is occupied by another process, or does not get the permission required.
   */
  DirectCdnStreamingReasonAudioPublication = 2,
  /**
   * 3: An error occurs when pushing video streams. For example, the local video capture device is not working properly, is occupied by another process, or does not get the permission required.
   */
  DirectCdnStreamingReasonVideoPublication = 3,
  /**
   * 4: Fails to connect to the CDN.
   */
  DirectCdnStreamingReasonNetConnect = 4,
  /**
   * 5: The URL is already being used. Use a new URL for streaming.
   */
  DirectCdnStreamingReasonBadName = 5,
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
   * 4: Tries to reconnect the Agora server to the CDN. The SDK attempts to reconnect a maximum of 10 times; if the connection is not restored, the streaming state becomes DirectCdnStreamingStateFailed.
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
   *
   * When the host directly pushes streams to the CDN, if the streaming state changes, the SDK triggers this callback to report the changed streaming state, error codes, and other information. You can troubleshoot issues by referring to this callback.
   *
   * @param state The current CDN streaming state. See DirectCdnStreamingState.
   * @param reason Reasons for changes in the status of CDN streaming. See DirectCdnStreamingReason.
   * @param message The information about the changed streaming state.
   */
  onDirectCdnStreamingStateChanged?(
    state: DirectCdnStreamingState,
    reason: DirectCdnStreamingReason,
    message: string
  ): void;

  /**
   * Reports the CDN streaming statistics.
   *
   * When the host directly pushes media streams to the CDN, the SDK triggers this callback every one second.
   *
   * @param stats The statistics of the current CDN streaming. See DirectCdnStreamingStats.
   */
  onDirectCdnStreamingStats?(stats: DirectCdnStreamingStats): void;
}

/**
 * The media setting options for the host.
 */
export class DirectCdnStreamingMediaOptions {
  /**
   * Sets whether to publish the video captured by the camera: true : Publish the video captured by the camera. false : (Default) Do not publish the video captured by the camera.
   */
  publishCameraTrack?: boolean;
  /**
   * Sets whether to publish the audio captured by the microphone: true : Publish the audio captured by the microphone. false : (Default) Do not publish the audio captured by the microphone.
   */
  publishMicrophoneTrack?: boolean;
  /**
   * Sets whether to publish the captured audio from a custom source: true : Publish the captured audio from a custom source. false : (Default) Do not publish the captured audio from the custom source.
   */
  publishCustomAudioTrack?: boolean;
  /**
   * Sets whether to publish the captured video from a custom source: true : Publish the captured video from a custom source. false : (Default) Do not publish the captured video from the custom source.
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
 *
 * IRtcEngine provides the main methods that your app can call. Before calling other APIs, you must call createAgoraRtcEngine to create an IRtcEngine object.
 */
export abstract class IRtcEngine {
  /**
   * All called methods provided by the IRtcEngine class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * @param context Configurations for the IRtcEngine instance. See RtcEngineContext.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -1: A general error occurs (no specified reason).
   *  -2: The parameter is invalid.
   *  -7: The SDK is not initialized.
   *  -22: The resource request failed. The SDK fails to allocate resources because your app consumes too much system resource or the system resources are insufficient.
   *  -101: The App ID is invalid.
   */
  abstract initialize(context: RtcEngineContext): number;

  abstract getVersion(): SDKBuildInfo;

  abstract getErrorDescription(code: number): string;

  abstract queryCodecCapability(): { codecInfo: CodecCapInfo[]; size: number };

  abstract queryDeviceScore(): number;

  abstract preloadChannel(
    token: string,
    channelId: string,
    uid: number
  ): number;

  abstract preloadChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string
  ): number;

  abstract updatePreloadChannelToken(token: string): number;

  abstract joinChannel(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number;

  abstract updateChannelMediaOptions(options: ChannelMediaOptions): number;

  abstract leaveChannel(options?: LeaveChannelOptions): number;

  abstract renewToken(token: string): number;

  abstract setChannelProfile(profile: ChannelProfileType): number;

  abstract setClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): number;

  abstract startEchoTest(config: EchoTestConfiguration): number;

  abstract stopEchoTest(): number;

  abstract enableMultiCamera(
    enabled: boolean,
    config: CameraCapturerConfiguration
  ): number;

  abstract enableVideo(): number;

  abstract disableVideo(): number;

  abstract startPreview(sourceType?: VideoSourceType): number;

  abstract stopPreview(sourceType?: VideoSourceType): number;

  abstract startLastmileProbeTest(config: LastmileProbeConfig): number;

  abstract stopLastmileProbeTest(): number;

  abstract setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  abstract setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions,
    type?: MediaSourceType
  ): number;

  abstract setFaceShapeBeautyOptions(
    enabled: boolean,
    options: FaceShapeBeautyOptions,
    type?: MediaSourceType
  ): number;

  abstract setFaceShapeAreaOptions(
    options: FaceShapeAreaOptions,
    type?: MediaSourceType
  ): number;

  abstract getFaceShapeBeautyOptions(
    type?: MediaSourceType
  ): FaceShapeBeautyOptions;

  abstract getFaceShapeAreaOptions(
    shapeArea: FaceShapeArea,
    type?: MediaSourceType
  ): FaceShapeAreaOptions;

  abstract setLowlightEnhanceOptions(
    enabled: boolean,
    options: LowlightEnhanceOptions,
    type?: MediaSourceType
  ): number;

  abstract setVideoDenoiserOptions(
    enabled: boolean,
    options: VideoDenoiserOptions,
    type?: MediaSourceType
  ): number;

  abstract setColorEnhanceOptions(
    enabled: boolean,
    options: ColorEnhanceOptions,
    type?: MediaSourceType
  ): number;

  abstract enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type?: MediaSourceType
  ): number;

  abstract setupRemoteVideo(canvas: VideoCanvas): number;

  abstract setupLocalVideo(canvas: VideoCanvas): number;

  abstract setVideoScenario(scenarioType: VideoApplicationScenarioType): number;

  abstract setVideoQoEPreference(qoePreference: VideoQoePreferenceType): number;

  abstract enableAudio(): number;

  abstract disableAudio(): number;

  abstract setAudioProfile(
    profile: AudioProfileType,
    scenario?: AudioScenarioType
  ): number;

  abstract setAudioScenario(scenario: AudioScenarioType): number;

  abstract enableLocalAudio(enabled: boolean): number;

  abstract muteLocalAudioStream(mute: boolean): number;

  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  abstract muteLocalVideoStream(mute: boolean): number;

  abstract enableLocalVideo(enabled: boolean): number;

  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

  abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

  abstract setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): number;

  abstract setRemoteVideoSubscriptionOptions(
    uid: number,
    options: VideoSubscriptionOptions
  ): number;

  abstract setSubscribeAudioBlocklist(
    uidList: number[],
    uidNumber: number
  ): number;

  abstract setSubscribeAudioAllowlist(
    uidList: number[],
    uidNumber: number
  ): number;

  abstract setSubscribeVideoBlocklist(
    uidList: number[],
    uidNumber: number
  ): number;

  abstract setSubscribeVideoAllowlist(
    uidList: number[],
    uidNumber: number
  ): number;

  abstract enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number;

  abstract startAudioRecording(config: AudioRecordingConfiguration): number;

  abstract registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number;

  abstract stopAudioRecording(): number;

  abstract createMediaPlayer(): IMediaPlayer;

  abstract destroyMediaPlayer(mediaPlayer: IMediaPlayer): number;

  abstract createMediaRecorder(info: RecorderStreamInfo): IMediaRecorder;

  abstract destroyMediaRecorder(mediaRecorder: IMediaRecorder): number;

  abstract startAudioMixing(
    filePath: string,
    loopback: boolean,
    cycle: number,
    startPos?: number
  ): number;

  abstract stopAudioMixing(): number;

  abstract pauseAudioMixing(): number;

  abstract resumeAudioMixing(): number;

  abstract selectAudioTrack(index: number): number;

  abstract getAudioTrackCount(): number;

  abstract adjustAudioMixingVolume(volume: number): number;

  abstract adjustAudioMixingPublishVolume(volume: number): number;

  abstract getAudioMixingPublishVolume(): number;

  abstract adjustAudioMixingPlayoutVolume(volume: number): number;

  abstract getAudioMixingPlayoutVolume(): number;

  abstract getAudioMixingDuration(): number;

  abstract getAudioMixingCurrentPosition(): number;

  abstract setAudioMixingPosition(pos: number): number;

  abstract setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): number;

  abstract setAudioMixingPitch(pitch: number): number;

  abstract setAudioMixingPlaybackSpeed(speed: number): number;

  abstract getEffectsVolume(): number;

  abstract setEffectsVolume(volume: number): number;

  abstract preloadEffect(
    soundId: number,
    filePath: string,
    startPos?: number
  ): number;

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

  abstract playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean
  ): number;

  abstract getVolumeOfEffect(soundId: number): number;

  abstract setVolumeOfEffect(soundId: number, volume: number): number;

  abstract pauseEffect(soundId: number): number;

  abstract pauseAllEffects(): number;

  abstract resumeEffect(soundId: number): number;

  abstract resumeAllEffects(): number;

  abstract stopEffect(soundId: number): number;

  abstract stopAllEffects(): number;

  abstract unloadEffect(soundId: number): number;

  abstract unloadAllEffects(): number;

  abstract getEffectDuration(filePath: string): number;

  abstract setEffectPosition(soundId: number, pos: number): number;

  abstract getEffectCurrentPosition(soundId: number): number;

  abstract enableSoundPositionIndication(enabled: boolean): number;

  abstract setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): number;

  abstract enableSpatialAudio(enabled: boolean): number;

  abstract setRemoteUserSpatialAudioParams(
    uid: number,
    params: SpatialAudioParams
  ): number;

  abstract setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number;

  abstract setAudioEffectPreset(preset: AudioEffectPreset): number;

  abstract setVoiceConversionPreset(preset: VoiceConversionPreset): number;

  abstract setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number;

  abstract setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): number;

  abstract setVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): number;

  abstract setLocalVoicePitch(pitch: number): number;

  abstract setLocalVoiceFormant(formantRatio: number): number;

  abstract setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number;

  abstract setLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): number;

  abstract setHeadphoneEQPreset(preset: HeadphoneEqualizerPreset): number;

  abstract setHeadphoneEQParameters(lowGain: number, highGain: number): number;

  abstract enableVoiceAITuner(enabled: boolean, type: VoiceAiTunerType): number;

  abstract setLogFile(filePath: string): number;

  abstract setLogFilter(filter: LogFilterType): number;

  abstract setLogLevel(level: LogLevel): number;

  abstract setLogFileSize(fileSizeInKBytes: number): number;

  abstract uploadLogFile(): string;

  abstract writeLog(level: LogLevel, fmt: string): number;

  abstract setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode?: VideoMirrorModeType
  ): number;

  abstract setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number;

  abstract setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number;

  abstract enableDualStreamMode(
    enabled: boolean,
    streamConfig?: SimulcastStreamConfig
  ): number;

  abstract setDualStreamMode(
    mode: SimulcastStreamMode,
    streamConfig?: SimulcastStreamConfig
  ): number;

  abstract setSimulcastConfig(simulcastConfig: SimulcastConfig): number;

  abstract enableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): number;

  abstract setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  abstract setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  abstract setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number;

  abstract setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  abstract setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): number;

  abstract enableAudioSpectrumMonitor(intervalInMS?: number): number;

  abstract disableAudioSpectrumMonitor(): number;

  abstract registerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  abstract unregisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  abstract adjustRecordingSignalVolume(volume: number): number;

  abstract muteRecordingSignal(mute: boolean): number;

  abstract adjustPlaybackSignalVolume(volume: number): number;

  abstract adjustUserPlaybackSignalVolume(uid: number, volume: number): number;

  abstract setLocalPublishFallbackOption(option: StreamFallbackOptions): number;

  abstract setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): number;

  abstract setHighPriorityUserList(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): number;

  abstract enableExtension(
    provider: string,
    extension: string,
    enable?: boolean,
    type?: MediaSourceType
  ): number;

  abstract setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type?: MediaSourceType
  ): number;

  abstract getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    bufLen: number,
    type?: MediaSourceType
  ): string;

  abstract enableLoopbackRecording(
    enabled: boolean,
    deviceName?: string
  ): number;

  abstract adjustLoopbackSignalVolume(volume: number): number;

  abstract getLoopbackRecordingVolume(): number;

  abstract enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number;

  abstract setInEarMonitoringVolume(volume: number): number;

  abstract loadExtensionProvider(
    path: string,
    unloadAfterUse?: boolean
  ): number;

  abstract setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): number;

  abstract registerExtension(
    provider: string,
    extension: string,
    type?: MediaSourceType
  ): number;

  abstract setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): number;

  abstract createCustomVideoTrack(): number;

  abstract createCustomEncodedVideoTrack(senderOption: SenderOptions): number;

  abstract destroyCustomVideoTrack(videoTrackId: number): number;

  abstract destroyCustomEncodedVideoTrack(videoTrackId: number): number;

  abstract switchCamera(): number;

  abstract isCameraZoomSupported(): boolean;

  abstract isCameraFaceDetectSupported(): boolean;

  abstract isCameraTorchSupported(): boolean;

  abstract isCameraFocusSupported(): boolean;

  abstract isCameraAutoFocusFaceModeSupported(): boolean;

  abstract setCameraZoomFactor(factor: number): number;

  abstract enableFaceDetection(enabled: boolean): number;

  abstract getCameraMaxZoomFactor(): number;

  abstract setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number;

  abstract setCameraTorchOn(isOn: boolean): number;

  abstract setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;

  abstract isCameraExposurePositionSupported(): boolean;

  abstract setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number;

  abstract isCameraExposureSupported(): boolean;

  abstract setCameraExposureFactor(factor: number): number;

  abstract isCameraAutoExposureFaceModeSupported(): boolean;

  abstract setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;

  abstract setCameraStabilizationMode(mode: CameraStabilizationMode): number;

  abstract setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): number;

  abstract setEnableSpeakerphone(speakerOn: boolean): number;

  abstract isSpeakerphoneEnabled(): boolean;

  abstract setRouteInCommunicationMode(route: number): number;

  abstract isCameraCenterStageSupported(): boolean;

  abstract enableCameraCenterStage(enabled: boolean): number;

  abstract getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[];

  abstract setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number;

  abstract startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  abstract startScreenCaptureByScreenRect(
    screenRect: Rectangle,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  abstract getAudioDeviceInfo(): DeviceInfo;

  abstract startScreenCaptureByWindowId(
    windowId: any,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

  abstract updateScreenCaptureRegion(regionRect: Rectangle): number;

  abstract updateScreenCaptureParameters(
    captureParams: ScreenCaptureParameters
  ): number;

  abstract startScreenCapture(captureParams: ScreenCaptureParameters2): number;

  abstract updateScreenCapture(captureParams: ScreenCaptureParameters2): number;

  abstract queryScreenCaptureCapability(): number;

  abstract queryCameraFocalLengthCapability(): {
    focalLengthInfos: FocalLengthInfo[];
    size: number;
  };

  /**
   * Sets the screen sharing scenario.
   *
   * When you start screen sharing or window sharing, you can call this method to set the screen sharing scenario. The SDK adjusts the video quality and experience of the sharing according to the scenario. Agora recommends that you call this method before joining a channel.
   *
   * @param screenScenario The screen sharing scenario. See ScreenScenarioType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setScreenCaptureScenario(screenScenario: ScreenScenarioType): number;

  /**
   * Stops screen capture.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopScreenCapture(): number;

  /**
   * @ignore
   */
  abstract getCallId(): string;

  /**
   * Allows a user to rate a call after the call ends.
   *
   * Ensure that you call this method after leaving a channel.
   *
   * @param callId The current call ID. You can get the call ID by calling getCallId.
   * @param rating The value is between 1 (the lowest score) and 5 (the highest score).
   * @param description A description of the call. The string length should be less than 800 bytes.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -1: A general error occurs (no specified reason).
   *  -2: The parameter is invalid.
   */
  abstract rate(callId: string, rating: number, description: string): number;

  /**
   * Allows a user to complain about the call quality after a call ends.
   *
   * This method allows users to complain about the quality of the call. Call this method after the user leaves the channel.
   *
   * @param callId The current call ID. You can get the call ID by calling getCallId.
   * @param description A description of the call. The string length should be less than 800 bytes.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -1: A general error occurs (no specified reason).
   *  -2: The parameter is invalid.
   *  -7: The method is called before IRtcEngine is initialized.
   */
  abstract complain(callId: string, description: string): number;

  /**
   * Starts pushing media streams to a CDN without transcoding.
   *
   * Call this method after joining a channel.
   *  Only hosts in the LIVE_BROADCASTING profile can call this method.
   *  If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push. Agora recommends that you use the server-side Media Push function. You can call this method to push an audio or video stream to the specified CDN address. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times. After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The URL or configuration of transcoding is invalid; check your URL and transcoding configurations.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The Media Push URL is already in use; use another URL instead.
   */
  abstract startRtmpStreamWithoutTranscoding(url: string): number;

  /**
   * Starts Media Push and sets the transcoding configuration.
   *
   * Agora recommends that you use the server-side Media Push function. You can call this method to push a live audio-and-video stream to the specified CDN address and set the transcoding configuration. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times. Under one Agora project, the maximum number of concurrent tasks to push media streams is 200 by default. If you need a higher quota, contact. After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *  Call this method after joining a channel.
   *  Only hosts in the LIVE_BROADCASTING profile can call this method.
   *  If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param transcoding The transcoding configuration for Media Push. See LiveTranscoding.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The URL or configuration of transcoding is invalid; check your URL and transcoding configurations.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The Media Push URL is already in use; use another URL instead.
   */
  abstract startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): number;

  /**
   * Updates the transcoding configuration.
   *
   * Agora recommends that you use the server-side Media Push function. After you start pushing media streams to CDN with transcoding, you can dynamically update the transcoding configuration according to the scenario. The SDK triggers the onTranscodingUpdated callback after the transcoding configuration is updated.
   *
   * @param transcoding The transcoding configuration for Media Push. See LiveTranscoding.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract updateRtmpTranscoding(transcoding: LiveTranscoding): number;

  /**
   * Starts the local video mixing.
   *
   * After calling this method, you can merge multiple video streams into one video stream locally. For example, you can merge the video streams captured by the camera, screen sharing, media player, remote video, video files, images, etc. into one video stream, and then publish the mixed video stream to the channel.
   *
   * @param config Configuration of the local video mixing, see LocalTranscoderConfiguration.
   *  The maximum resolution of each video stream participating in the local video mixing is 4096 × 2160. If this limit is exceeded, video mixing does not take effect.
   *  The maximum resolution of the mixed video stream is 4096 × 2160.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract startLocalVideoTranscoder(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * Updates the local video mixing configuration.
   *
   * After calling startLocalVideoTranscoder, call this method if you want to update the local video mixing configuration. If you want to update the video source type used for local video mixing, such as adding a second camera or screen to capture video, you need to call this method after startCameraCapture or startScreenCapture.
   *
   * @param config Configuration of the local video mixing, see LocalTranscoderConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract updateLocalTranscoderConfiguration(
    config: LocalTranscoderConfiguration
  ): number;

  /**
   * Stops pushing media streams to a CDN.
   *
   * Agora recommends that you use the server-side Media Push function. You can call this method to stop the live stream on the specified CDN address. This method can stop pushing media streams to only one CDN address at a time, so if you need to stop pushing streams to multiple addresses, call this method multiple times. After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopRtmpStream(url: string): number;

  /**
   * Stops the local video mixing.
   *
   * After calling startLocalVideoTranscoder, call this method if you want to stop the local video mixing.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopLocalVideoTranscoder(): number;

  /**
   * Starts camera capture.
   *
   * You can call this method to start capturing video from one or more cameras by specifying sourceType. On the iOS platform, if you want to enable multi-camera capture, you need to call enableMultiCamera and set enabled to true before calling this method.
   *
   * @param sourceType The type of the video source. See VideoSourceType.
   *  On iOS devices, you can capture video from up to 2 cameras, provided the device has multiple cameras or supports external cameras.
   *  On Android devices, you can capture video from up to 4 cameras, provided the device has multiple cameras or supports external cameras.
   * @param config The configuration of the video capture. See CameraCapturerConfiguration. On the iOS platform, this parameter has no practical function. Use the config parameter in enableMultiCamera instead to set the video capture configuration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract startCameraCapture(
    sourceType: VideoSourceType,
    config: CameraCapturerConfiguration
  ): number;

  /**
   * Stops camera capture.
   *
   * After calling startCameraCapture to start capturing video through one or more cameras, you can call this method and set the sourceType parameter to stop the capture from the specified cameras. On the iOS platform, if you want to disable multi-camera capture, you need to call enableMultiCamera after calling this method and set enabled to false. If you are using the local video mixing function, calling this method can cause the local video mixing to be interrupted.
   *
   * @param sourceType The type of the video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopCameraCapture(sourceType: VideoSourceType): number;

  /**
   * Sets the rotation angle of the captured video.
   *
   * You must call this method after enableVideo. The setting result will take effect after the camera is successfully turned on, that is, after the SDK triggers the onLocalVideoStateChanged callback and returns the local video state as LocalVideoStreamStateCapturing (1).
   *  When the video capture device does not have the gravity sensing function, you can call this method to manually adjust the rotation angle of the captured video.
   *
   * @param type The video source type. See VideoSourceType.
   * @param orientation The clockwise rotation angle. See VideoOrientation.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Gets the current connection state of the SDK.
   *
   * @returns
   * The current connection state. See ConnectionStateType.
   */
  abstract getConnectionState(): ConnectionStateType;

  /**
   * Adds event handlers
   *
   * The SDK uses the IRtcEngineEventHandler class to send callbacks to the app. The app inherits the methods of this class to receive these callbacks. All methods in this class have default (empty) implementations. Therefore, apps only need to inherits callbacks according to the scenarios. In the callbacks, avoid time-consuming tasks or calling APIs that can block the thread, such as the sendStreamMessage method. Otherwise, the SDK may not work properly.
   *
   * @param eventHandler Callback events to be added. See IRtcEngineEventHandler.
   *
   * @returns
   * true : Success. false : Failure.
   */
  abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

  /**
   * Removes the specified callback events.
   *
   * You can call this method too remove all added callback events.
   *
   * @param eventHandler Callback events to be removed. See IRtcEngineEventHandler.
   *
   * @returns
   * true : Success. false : Failure.
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
   * Enables or disables the built-in encryption.
   *
   * After the user leaves the channel, the SDK automatically disables the built-in encryption. To enable the built-in encryption, call this method before the user joins the channel again.
   *
   * @param enabled Whether to enable built-in encryption: true : Enable the built-in encryption. false : (Default) Disable the built-in encryption.
   * @param config Built-in encryption configurations. See EncryptionConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: An invalid parameter is used. Set the parameter with a valid value.
   *  -4: The built-in encryption mode is incorrect or the SDK fails to load the external encryption library. Check the enumeration or reload the external encryption library.
   *  -7: The SDK is not initialized. Initialize the IRtcEngine instance before calling this method.
   */
  abstract enableEncryption(enabled: boolean, config: EncryptionConfig): number;

  /**
   * Creates a data stream.
   *
   * @param config The configurations for the data stream. See DataStreamConfig.
   *
   * @returns
   * ID of the created data stream, if the method call succeeds.
   *  < 0: Failure.
   */
  abstract createDataStream(config: DataStreamConfig): number;

  /**
   * Sends data stream messages.
   *
   * After calling createDataStream, you can call this method to send data stream messages to all users in the channel. The SDK has the following restrictions on this method:
   *  Each user can have up to five data streams simultaneously.
   *  Up to 60 packets can be sent per second in a data stream with each packet having a maximum size of 1 KB.
   *  Up to 30 KB of data can be sent per second in a data stream. A successful method call triggers the onStreamMessage callback on the remote client, from which the remote user gets the stream message. A failed method call triggers the onStreamMessageError callback on the remote client.
   *  This method needs to be called after createDataStream and joining the channel.
   *  In live streaming scenarios, this method only applies to hosts.
   *
   * @param streamId The data stream ID. You can get the data stream ID by calling createDataStream.
   * @param data The message to be sent.
   * @param length The length of the data.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number;

  /**
   * Adds a watermark image to the local video.
   *
   * This method adds a PNG watermark image to the local video in the live streaming. Once the watermark image is added, all the audience in the channel (CDN audience included), and the capturing device can see and capture it. The Agora SDK supports adding only one watermark image onto a local video or CDN live stream. The newly added watermark image replaces the previous one. The watermark coordinates are dependent on the settings in the setVideoEncoderConfiguration method:
   *  If the orientation mode of the encoding video (OrientationMode) is fixed landscape mode or the adaptive landscape mode, the watermark uses the landscape orientation.
   *  If the orientation mode of the encoding video (OrientationMode) is fixed portrait mode or the adaptive portrait mode, the watermark uses the portrait orientation.
   *  When setting the watermark position, the region must be less than the dimensions set in the setVideoEncoderConfiguration method; otherwise, the watermark image will be cropped.
   *  Ensure that calling this method after enableVideo.
   *  If you only want to add a watermark to the media push, you can call this method or the startRtmpStreamWithTranscoding method.
   *  This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.
   *  If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.
   *  If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time. You can implement the watermark function in your application layer.
   *
   * @param watermarkUrl The local file path of the watermark image to be added. This method supports adding a watermark image from the local absolute or relative file path.
   * @param options The options of the watermark image to be added. See WatermarkOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): number;

  /**
   * Removes the watermark image from the video stream.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   *
   * Deprecated: The SDK automatically enables interoperability with the Web SDK, so you no longer need to call this method. You can call this method to enable or disable interoperability with the Agora Web SDK. If a channel has Web SDK users, ensure that you call this method, or the video of the Native user will be a black screen for the Web user. This method is only applicable in live streaming scenarios, and interoperability is enabled by default in communication scenarios.
   *
   * @param enabled Whether to enable interoperability: true : Enable interoperability. false : (Default) Disable interoperability.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableWebSdkInteroperability(enabled: boolean): number;

  /**
   * Reports customized messages.
   *
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
   *
   * You need to implement the IMetadataObserver class and specify the metadata type in this method. This method enables you to add synchronized metadata in the video stream for more diversified
   *  live interactive streaming, such as sending shopping links, digital coupons, and online quizzes. Call this method before joinChannel.
   *
   * @param observer The metadata observer. See IMetadataObserver.
   * @param type The metadata type. The SDK currently only supports VideoMetadata. See MetadataType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /**
   * Unregisters the specified metadata observer.
   *
   * @param observer The metadata observer. See IMetadataObserver.
   * @param type The metadata type. The SDK currently only supports VideoMetadata. See MetadataType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Sets whether to enable the AI ​​noise suppression function and set the noise suppression mode.
   *
   * You can call this method to enable AI noise suppression function. Once enabled, the SDK automatically detects and reduces stationary and non-stationary noise from your audio on the premise of ensuring the quality of human voice. Stationary noise refers to noise signal with constant average statistical properties and negligibly small fluctuations of level within the period of observation. Common sources of stationary noises are:
   *  Television;
   *  Air conditioner;
   *  Machinery, etc. Non-stationary noise refers to noise signal with huge fluctuations of level within the period of observation; common sources of non-stationary noises are:
   *  Thunder;
   *  Explosion;
   *  Cracking, etc.
   *
   * @param enabled Whether to enable the AI noise suppression function: true : Enable the AI noise suppression. false : (Default) Disable the AI noise suppression.
   * @param mode The AI noise suppression modes. See AudioAinsMode.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setAINSMode(enabled: boolean, mode: AudioAinsMode): number;

  /**
   * Registers a user account.
   *
   * Once registered, the user account can be used to identify the local user when the user joins the channel. After the registration is successful, the user account can identify the identity of the local user, and the user can use it to join the channel. This method is optional. If you want to join a channel using a user account, you can choose one of the following methods:
   *  Call the registerLocalUserAccount method to register a user account, and then call the joinChannelWithUserAccount method to join a channel, which can shorten the time it takes to enter the channel.
   *  Call the joinChannelWithUserAccount method to join a channel.
   *  Ensure that the userAccount is unique in the channel.
   *  To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a UID, then ensure all the other users use the UID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the ID of the user is set to the same parameter type.
   *
   * @param appId The App ID of your project on Agora Console.
   * @param userAccount The user account. This parameter is used to identify the user in the channel for real-time audio and video engagement. You need to set and manage user accounts yourself and ensure that each user account in the same channel is unique. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as null. Supported characters are as follow(89 in total):
   *  The 26 lowercase English letters: a to z.
   *  The 26 uppercase English letters: A to Z.
   *  All numeric characters: 0 to 9.
   *  Space
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract registerLocalUserAccount(appId: string, userAccount: string): number;

  /**
   * Join a channel using a user account and token, and set the media options.
   *
   * Before calling this method, if you have not called registerLocalUserAccount to register a user account, when you call this method to join a channel, the SDK automatically creates a user account for you. Calling the registerLocalUserAccount method to register a user account, and then calling this method to join a channel can shorten the time it takes to enter the channel. Once a user joins the channel, the user subscribes to the audio and video streams of all the other users in the channel by default, giving rise to usage and billings. To stop subscribing to a specified stream or all remote streams, call the corresponding mute methods. To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a UID, then ensure all the other users use the UID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the ID of the user is set to the same parameter type.
   *
   * @param token The token generated on your server for authentication.
   *  (Recommended) If your project has enabled the security mode (using APP ID and Token for authentication), this parameter is required.
   *  If you have only enabled the testing mode (using APP ID for authentication), this parameter is optional. You will automatically exit the channel 24 hours after successfully joining in.
   *  If you need to join different channels at the same time or switch between channels, Agora recommends using a wildcard token so that you don't need to apply for a new token every time joining a channel.
   * @param channelId The channel name. This parameter signifies the channel in which users engage in real-time audio and video interaction. Under the premise of the same App ID, users who fill in the same channel ID enter the same channel for audio and video interaction. The string length must be less than 64 bytes. Supported characters (89 characters in total):
   *  All lowercase English letters: a to z.
   *  All uppercase English letters: A to Z.
   *  All numeric characters: 0 to 9.
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param userAccount The user account. This parameter is used to identify the user in the channel for real-time audio and video engagement. You need to set and manage user accounts yourself and ensure that each user account in the same channel is unique. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as null. Supported characters are as follows(89 in total):
   *  The 26 lowercase English letters: a to z.
   *  The 26 uppercase English letters: A to Z.
   *  All numeric characters: 0 to 9.
   *  Space
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param options The channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in ChannelMediaOptions is invalid. You need to pass in a valid parameter and join the channel again.
   *  -3: Fails to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.
   *  -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is wrong. The typical cause is that after calling startEchoTest to start a call loop test, you call this method to join the channel without calling stopEchoTest to stop the test. You need to call stopEchoTest before calling this method.
   *  -17: The request to join the channel is rejected. The typical cause is that the user is already in the channel. Agora recommends that you use the onConnectionStateChanged callback to see whether the user is in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected (1) state.
   *  -102: The channel name is invalid. You need to pass in a valid channel name in channelId to rejoin the channel.
   *  -121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number;

  /**
   * Join a channel using a user account and token, and set the media options.
   *
   * Before calling this method, if you have not called registerLocalUserAccount to register a user account, when you call this method to join a channel, the SDK automatically creates a user account for you. Calling the registerLocalUserAccount method to register a user account, and then calling this method to join a channel can shorten the time it takes to enter the channel. Once a user joins the channel, the user subscribes to the audio and video streams of all the other users in the channel by default, giving rise to usage and billings. If you want to stop subscribing to the media stream of other users, you can set the options parameter or call the corresponding mute method. To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a UID, then ensure all the other users use the UID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the ID of the user is set to the same parameter type.
   *
   * @param token The token generated on your server for authentication.
   *  (Recommended) If your project has enabled the security mode (using APP ID and Token for authentication), this parameter is required.
   *  If you have only enabled the testing mode (using APP ID for authentication), this parameter is optional. You will automatically exit the channel 24 hours after successfully joining in.
   *  If you need to join different channels at the same time or switch between channels, Agora recommends using a wildcard token so that you don't need to apply for a new token every time joining a channel.
   * @param channelId The channel name. This parameter signifies the channel in which users engage in real-time audio and video interaction. Under the premise of the same App ID, users who fill in the same channel ID enter the same channel for audio and video interaction. The string length must be less than 64 bytes. Supported characters (89 characters in total):
   *  All lowercase English letters: a to z.
   *  All uppercase English letters: A to Z.
   *  All numeric characters: 0 to 9.
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param userAccount The user account. This parameter is used to identify the user in the channel for real-time audio and video engagement. You need to set and manage user accounts yourself and ensure that each user account in the same channel is unique. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as null. Supported characters are as follows(89 in total):
   *  The 26 lowercase English letters: a to z.
   *  The 26 uppercase English letters: A to Z.
   *  All numeric characters: 0 to 9.
   *  Space
   *  "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","
   * @param options The channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in ChannelMediaOptions is invalid. You need to pass in a valid parameter and join the channel again.
   *  -3: Fails to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.
   *  -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is wrong. The typical cause is that after calling startEchoTest to start a call loop test, you call this method to join the channel without calling stopEchoTest to stop the test. You need to call stopEchoTest before calling this method.
   *  -17: The request to join the channel is rejected. The typical cause is that the user is already in the channel. Agora recommends that you use the onConnectionStateChanged callback to see whether the user is in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected (1) state.
   *  -102: The channel name is invalid. You need to pass in a valid channel name in channelId to rejoin the channel.
   *  -121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: ChannelMediaOptions
  ): number;

  /**
   * Gets the user information by passing in the user account.
   *
   * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object, and triggers the onUserInfoUpdated callback on the local client. After receiving the callback, you can call this method and pass in the user account to get the UID of the remote user from the UserInfo object.
   *
   * @param userAccount The user account.
   *
   * @returns
   * A pointer to the UserInfo instance, if the method call succeeds.
   *  If the call fails, returns null.
   */
  abstract getUserInfoByUserAccount(userAccount: string): UserInfo;

  /**
   * Gets the user information by passing in the user ID.
   *
   * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object, and triggers the onUserInfoUpdated callback on the local client. After receiving the callback, you can call this method and passi in the UID.to get the user account of the specified user from the UserInfo object.
   *
   * @param uid The user ID.
   *
   * @returns
   * A pointer to the UserInfo instance, if the method call succeeds.
   *  If the call fails, returns null.
   */
  abstract getUserInfoByUid(uid: number): UserInfo;

  /**
   * Starts relaying media streams across channels or updates channels for media relay.
   *
   * The first successful call to this method starts relaying media streams from the source channel to the destination channels. To relay the media stream to other channels, or exit one of the current media relays, you can call this method again to update the destination channels. This feature supports relaying media streams to a maximum of six destination channels. After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback, and this callback returns the state of the media stream relay. Common states are as follows:
   *  If the onChannelMediaRelayStateChanged callback returns RelayStateRunning (2) and RelayOk (0), it means that the SDK starts relaying media streams from the source channel to the destination channel.
   *  If the onChannelMediaRelayStateChanged callback returns RelayStateFailure (3), an exception occurs during the media stream relay.
   *  Call this method after joining the channel.
   *  This method takes effect only when you are a host in a live streaming channel.
   *  The relaying media streams across channels function needs to be enabled by contacting.
   *  Agora does not support string user accounts in this API.
   *
   * @param configuration The configuration of the media stream relay. See ChannelMediaRelayConfiguration.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -1: A general error occurs (no specified reason).
   *  -2: The parameter is invalid.
   *  -8: Internal state error. Probably because the user is not a broadcaster.
   */
  abstract startOrUpdateChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /**
   * Stops the media stream relay. Once the relay stops, the host quits all the target channels.
   *
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback. If the callback reports RelayStateIdle (0) and RelayOk (0), the host successfully stops the relay. If the method call fails, the SDK triggers the onChannelMediaRelayStateChanged callback with the RelayErrorServerNoResponse (2) or RelayErrorServerConnectionLost (8) status code. You can call the leaveChannel method to leave the channel, and the media stream relay automatically stops.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -5: The method call was rejected. There is no ongoing channel media relay.
   */
  abstract stopChannelMediaRelay(): number;

  /**
   * Pauses the media stream relay to all target channels.
   *
   * After the cross-channel media stream relay starts, you can call this method to pause relaying media streams to all target channels; after the pause, if you want to resume the relay, call resumeAllChannelMediaRelay. Call this method after startOrUpdateChannelMediaRelay.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -5: The method call was rejected. There is no ongoing channel media relay.
   */
  abstract pauseAllChannelMediaRelay(): number;

  /**
   * Resumes the media stream relay to all target channels.
   *
   * After calling the pauseAllChannelMediaRelay method, you can call this method to resume relaying media streams to all destination channels. Call this method after pauseAllChannelMediaRelay.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -5: The method call was rejected. There is no paused channel media relay.
   */
  abstract resumeAllChannelMediaRelay(): number;

  /**
   * Sets the audio profile of the audio streams directly pushed to the CDN by the host.
   *
   * When you set the publishMicrophoneTrack or publishCustomAudioTrack in the DirectCdnStreamingMediaOptions as true to capture audios, you can call this method to set the audio profile.
   *
   * @param profile The audio profile, including the sampling rate, bitrate, encoding mode, and the number of channels. See AudioProfileType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): number;

  /**
   * Sets the video profile of the media streams directly pushed to the CDN by the host.
   *
   * This method only affects video streams captured by cameras or screens, or from custom video capture sources. That is, when you set publishCameraTrack or publishCustomVideoTrack in DirectCdnStreamingMediaOptions as true to capture videos, you can call this method to set the video profiles. If your local camera does not support the video resolution you set,the SDK automatically adjusts the video resolution to a value that is closest to your settings for capture, encoding or streaming, with the same aspect ratio as the resolution you set. You can get the actual resolution of the video streams through the onDirectCdnStreamingStats callback.
   *
   * @param config Video profile. See VideoEncoderConfiguration. During CDN live streaming, Agora only supports setting OrientationMode as OrientationFixedLandscape or OrientationFixedPortrait.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setDirectCdnStreamingVideoConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /**
   * Starts pushing media streams to the CDN directly.
   *
   * Aogra does not support pushing media streams to one URL repeatedly. Media options Agora does not support setting the value of publishCameraTrack and publishCustomVideoTrack as true, or the value of publishMicrophoneTrack and publishCustomAudioTrack as true at the same time. When choosing media setting options (DirectCdnStreamingMediaOptions), you can refer to the following examples: If you want to push audio and video streams captured by the host from a custom source, the media setting options should be set as follows: publishCustomAudioTrack is set as true and call the pushAudioFrame method publishCustomVideoTrack is set as true and call the pushVideoFrame method publishCameraTrack is set as false (the default value) publishMicrophoneTrack is set as false (the default value) As of v4.2.0, Agora SDK supports audio-only live streaming. You can set publishCustomAudioTrack or publishMicrophoneTrack in DirectCdnStreamingMediaOptions as true and call pushAudioFrame to push audio streams. Agora only supports pushing one audio and video streams or one audio streams to CDN.
   *
   * @param eventHandler See onDirectCdnStreamingStateChanged and onDirectCdnStreamingStats.
   * @param publishUrl The CDN live streaming URL.
   * @param options The media setting options for the host. See DirectCdnStreamingMediaOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * 0: Success.
   *  < 0: Failure.
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
   *
   * After enabling the virtual metronome, the SDK plays the specified audio effect file from the beginning, and controls the playback duration of each file according to beatsPerMinute you set in AgoraRhythmPlayerConfig. For example, if you set beatsPerMinute as 60, the SDK plays one beat every second. If the file duration exceeds the beat duration, the SDK only plays the audio within the beat duration.
   *  By default, the sound of the virtual metronome is published in the channel. If you want the sound to be heard by the remote users, you can set publishRhythmPlayerTrack in ChannelMediaOptions as true.
   *
   * @param sound1 The absolute path or URL address (including the filename extensions) of the file for the downbeat. For example, C:\music\audio.mp4. For the audio file formats supported by this method, see What formats of audio files does the Agora RTC SDK support.
   * @param sound2 The absolute path or URL address (including the filename extensions) of the file for the upbeats. For example, C:\music\audio.mp4. For the audio file formats supported by this method, see What formats of audio files does the Agora RTC SDK support.
   * @param config The metronome configuration. See AgoraRhythmPlayerConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -22: Cannot find audio effect files. Please set the correct paths for sound1 and sound2.
   */
  abstract startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: AgoraRhythmPlayerConfig
  ): number;

  /**
   * Disables the virtual metronome.
   *
   * After calling startRhythmPlayer, you can call this method to disable the virtual metronome.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopRhythmPlayer(): number;

  /**
   * Configures the virtual metronome.
   *
   * After calling startRhythmPlayer, you can call this method to reconfigure the virtual metronome.
   *  After enabling the virtual metronome, the SDK plays the specified audio effect file from the beginning, and controls the playback duration of each file according to beatsPerMinute you set in AgoraRhythmPlayerConfig. For example, if you set beatsPerMinute as 60, the SDK plays one beat every second. If the file duration exceeds the beat duration, the SDK only plays the audio within the beat duration.
   *  By default, the sound of the virtual metronome is published in the channel. If you want the sound to be heard by the remote users, you can set publishRhythmPlayerTrack in ChannelMediaOptions as true.
   *
   * @param config The metronome configuration. See AgoraRhythmPlayerConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract configRhythmPlayer(config: AgoraRhythmPlayerConfig): number;

  /**
   * Takes a snapshot of a video stream.
   *
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image, and saves it to the specified path.
   *
   * @param uid The user ID. Set uid as 0 if you want to take a snapshot of the local user's video.
   * @param filePath The local path (including filename extensions) of the snapshot. For example:
   *  iOS: /App Sandbox/Library/Caches/example.jpg
   *  Android: /storage/emulated/0/Android/data/<package name>/files/example.jpg Ensure that the path you specify exists and is writable.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract takeSnapshot(uid: number, filePath: string): number;

  /**
   * Enables or disables video screenshot and upload.
   *
   * When video screenshot and upload function is enabled, the SDK takes screenshots and uploads videos sent by local users based on the type and frequency of the module you set in ContentInspectConfig. After video screenshot and upload, the Agora server sends the callback notification to your app server in HTTPS requests and sends all screenshots to the third-party cloud storage service.
   *
   * @param enabled Whether to enalbe video screenshot and upload: true : Enables video screenshot and upload. false : Disables video screenshot and upload.
   * @param config Screenshot and upload configuration. See ContentInspectConfig. When the video moderation module is set to video moderation via Agora self-developed extension(ContentInspectSupervision), the video screenshot and upload dynamic library libagora_content_inspect_extension.dll is required. Deleting this library disables the screenshot and upload feature.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableContentInspect(
    enabled: boolean,
    config: ContentInspectConfig
  ): number;

  /**
   * Adjusts the volume of the custom audio track played remotely.
   *
   * Ensure you have called the createCustomAudioTrack method to create a custom audio track before calling this method. If you want to change the volume of the audio played remotely, you need to call this method again.
   *
   * @param trackId The audio track ID. Set this parameter to the custom audio track ID returned in createCustomAudioTrack.
   * @param volume The volume of the audio source. The value can range from 0 to 100. 0 means mute; 100 means the original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract adjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): number;

  /**
   * Adjusts the volume of the custom audio track played locally.
   *
   * Ensure you have called the createCustomAudioTrack method to create a custom audio track before calling this method. If you want to change the volume of the audio to be played locally, you need to call this method again.
   *
   * @param trackId The audio track ID. Set this parameter to the custom audio track ID returned in createCustomAudioTrack.
   * @param volume The volume of the audio source. The value can range from 0 to 100. 0 means mute; 100 means the original volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract adjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): number;

  /**
   * Sets up cloud proxy service.
   *
   * When users' network access is restricted by a firewall, configure the firewall to allow specific IP addresses and ports provided by Agora; then, call this method to enable the cloud proxyType and set the cloud proxy type with the proxyType parameter. After successfully connecting to the cloud proxy, the SDK triggers the onConnectionStateChanged (ConnectionStateConnecting, ConnectionChangedSettingProxyServer) callback. To disable the cloud proxy that has been set, call the setCloudProxy (NoneProxy). To change the cloud proxy type that has been set, call the setCloudProxy (NoneProxy) first, and then call the setCloudProxy to set the proxyType you want.
   *  Agora recommends that you call this method after joining a channel.
   *  When a user is behind a firewall and uses the Force UDP cloud proxy, the services for Media Push and cohosting across channels are not available.
   *  When you use the Force TCP cloud proxy, note that an error would occur when calling the startAudioMixing method to play online music files in the HTTP protocol. The services for Media Push and cohosting across channels use the cloud proxy with the TCP protocol.
   *
   * @param proxyType The type of the cloud proxy. See CloudProxyType. This parameter is mandatory. The SDK reports an error if you do not pass in a value.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter is invalid.
   *  -7: The SDK is not initialized.
   */
  abstract setCloudProxy(proxyType: CloudProxyType): number;

  /**
   * @ignore
   */
  abstract setLocalAccessPoint(config: LocalAccessPointConfiguration): number;

  /**
   * Sets audio advanced options.
   *
   * If you have advanced audio processing requirements, such as capturing and sending stereo audio, you can call this method to set advanced audio options. Call this method after calling joinChannel, enableAudio and enableLocalAudio.
   *
   * @param options The advanced options for audio. See AdvancedAudioOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Sets whether to replace the current video feeds with images when publishing video streams.
   *
   * When publishing video streams, you can call this method to replace the current video feeds with custom images. Once you enable this function, you can select images to replace the video feeds through the ImageTrackOptions parameter. If you disable this function, the remote users see the video feeds that you publish.
   *
   * @param enable Whether to replace the current video feeds with custom images: true : Replace the current video feeds with custom images. false : (Default) Do not replace the current video feeds with custom images.
   * @param options Image configurations. See ImageTrackOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableVideoImageSource(
    enable: boolean,
    options: ImageTrackOptions
  ): number;

  /**
   * Gets the current Monotonic Time of the SDK.
   *
   * Monotonic Time refers to a monotonically increasing time series whose value increases over time. The unit is milliseconds. In custom video capture and custom audio capture scenarios, in order to ensure audio and video synchronization, Agora recommends that you call this method to obtain the current Monotonic Time of the SDK, and then pass this value into the timestamp parameter in the captured video frame (VideoFrame) and audio frame (AudioFrame).
   *
   * @returns
   * ≥0: The method call is successful, and returns the current Monotonic Time of the SDK (in milliseconds).
   *  < 0: Failure.
   */
  abstract getCurrentMonotonicTimeInMs(): number;

  /**
   * @ignore
   */
  abstract enableWirelessAccelerate(enabled: boolean): number;

  /**
   * Gets the type of the local network connection.
   *
   * You can use this method to get the type of network in use at any stage. You can call this method either before or after joining a channel.
   *
   * @returns
   * ≥ 0: The method call is successful, and the local network connection type is returned.
   *  0: The SDK disconnects from the network.
   *  1: The network type is LAN.
   *  2: The network type is Wi-Fi (including hotspots).
   *  3: The network type is mobile 2G.
   *  4: The network type is mobile 3G.
   *  5: The network type is mobile 4G.
   *  6: The network type is mobile 5G.
   *  < 0: The method call failed with an error code.
   *  -1: The network type is unknown.
   */
  abstract getNetworkType(): number;

  /**
   * Provides technical preview functionalities or special customizations by configuring the SDK with JSON options.
   *
   * @param parameters Pointer to the set parameters in a JSON string.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setParameters(parameters: string): number;

  /**
   * Enables tracing the video frame rendering process.
   *
   * The SDK starts tracing the rendering status of the video frames in the channel from the moment this method is successfully called and reports information about the event through the onVideoRenderingTracingResult callback.
   *  By default, the SDK starts tracing the video rendering event automatically when the local user successfully joins the channel. You can call this method at an appropriate time according to the actual application scenario to customize the tracing process.
   *  After the local user leaves the current channel, the SDK automatically resets the time point to the next time when the user successfully joins the channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -7: The method is called before IRtcEngine is initialized.
   */
  abstract startMediaRenderingTracing(): number;

  /**
   * Enables audio and video frame instant rendering.
   *
   * After successfully calling this method, the SDK enables the instant frame rendering mode, which can speed up the first frame rendering after the user joins the channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -7: The method is called before IRtcEngine is initialized.
   */
  abstract enableInstantMediaRendering(): number;

  /**
   * Gets the current NTP (Network Time Protocol) time.
   *
   * In the real-time chorus scenario, especially when the downlink connections are inconsistent due to network issues among multiple receiving ends, you can call this method to obtain the current NTP time as the reference time, in order to align the lyrics and music of multiple receiving ends and achieve chorus synchronization.
   *
   * @returns
   * The Unix timestamp (ms) of the current NTP time.
   */
  abstract getNtpWallTimeInMs(): number;

  /**
   * Checks whether the device supports the specified advanced feature.
   *
   * Checks whether the capabilities of the current device meet the requirements for advanced features such as virtual background and image enhancement.
   *
   * @param type The type of the advanced feature, see FeatureType.
   *
   * @returns
   * true : The current device supports the specified feature. false : The current device does not support the specified feature.
   */
  abstract isFeatureAvailableOnDevice(type: FeatureType): boolean;

  /**
   * @ignore
   */
  abstract sendAudioMetadata(metadata: string, length: number): number;

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
   * Releases the IRtcEngine instance.
   *
   * This method releases all resources used by the Agora SDK. Use this method for apps in which users occasionally make voice or video calls. When users do not make calls, you can free up resources for other operations. After a successful method call, you can no longer use any method or callback in the SDK anymore. If you want to use the real-time communication functions again, you must call createAgoraRtcEngine and initialize to create a new IRtcEngine instance.
   *  This method can be called synchronously. You need to wait for the resource of IRtcEngine to be released before performing other operations (for example, create a new IRtcEngine object). Therefore, Agora recommends calling this method in the child thread to avoid blocking the main thread.
   *  Besides, Agora does not recommend you calling release in any callback of the SDK. Otherwise, the SDK cannot release the resources until the callbacks return results, which may result in a deadlock.
   *
   * @param sync Whether the method is called synchronously: true : Synchronous call. false : Asynchronous call. Currently this method only supports synchronous calls. Do not set this parameter to this value.
   */
  abstract release(sync?: boolean): void;

  /**
   * Enables the local video preview.
   *
   * You can call this method to enable local video preview.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract startPreviewWithoutSourceType(): number;

  /**
   * Gets the IAudioDeviceManager object to manage audio devices.
   *
   * @returns
   * One IAudioDeviceManager object.
   */
  abstract getAudioDeviceManager(): IAudioDeviceManager;

  /**
   * Gets the IVideoDeviceManager object to manage video devices.
   *
   * @returns
   * One IVideoDeviceManager object.
   */
  abstract getVideoDeviceManager(): IVideoDeviceManager;

  /**
   * Gets IMusicContentCenter.
   *
   * @returns
   * One IMusicContentCenter object.
   */
  abstract getMusicContentCenter(): IMusicContentCenter;

  /**
   * Gets one IMediaEngine object.
   *
   * Make sure the IRtcEngine is initialized before you call this method.
   *
   * @returns
   * One IMediaEngine object.
   */
  abstract getMediaEngine(): IMediaEngine;

  /**
   * Gets one ILocalSpatialAudioEngine object.
   *
   * Make sure the IRtcEngine is initialized before you call this method.
   *
   * @returns
   * One ILocalSpatialAudioEngine object.
   */
  abstract getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine;

  /**
   * @ignore
   */
  abstract getH265Transcoder(): IH265Transcoder;

  /**
   * Sends media metadata.
   *
   * If the metadata is sent successfully, the SDK triggers the onMetadataReceived callback on the receiver.
   *
   * @param metadata Media metadata. See Metadata.
   * @param sourceType The type of the video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract sendMetaData(
    metadata: Metadata,
    sourceType: VideoSourceType
  ): number;

  /**
   * Sets the maximum size of the media metadata.
   *
   * After calling registerMediaMetadataObserver, you can call this method to set the maximum size of the media metadata.
   *
   * @param size The maximum size of media metadata.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Unregisters the encoded audio frame observer.
   *
   * @param observer The encoded audio observer. See IAudioEncodedFrameObserver.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number;

  /**
   * Gets the C++ handle of the Native SDK.
   *
   * This method retrieves the C++ handle of the SDK, which is used for registering the audio and video frame observer.
   *
   * @returns
   * The native handle of the SDK.
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
   * 8: The device is unplugged.
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
   * SDK build index.
   */
  build?: number;
  /**
   * SDK version information. String format, such as 4.0.0.
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
 * The AudioDeviceInfo class that contains the ID, name and type of the audio devices.
 */
export class AudioDeviceInfo {
  /**
   * The device ID.
   */
  deviceId?: string;
  /**
   * Output parameter; indicates the type of audio devices, such as built-in, USB and HDMI.
   */
  deviceTypeName?: string;
  /**
   * The device name.
   */
  deviceName?: string;
}
