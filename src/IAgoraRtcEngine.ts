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
  CaptureBrightnessLevelType,
  ChannelMediaRelayConfiguration,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
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
  HeadphoneEqualizerPreset,
  IAudioEncodedFrameObserver,
  LastmileProbeConfig,
  LastmileProbeResult,
  LicenseErrorType,
  LiveTranscoding,
  LocalAccessPointConfiguration,
  LocalAudioStats,
  LocalAudioStreamError,
  LocalAudioStreamState,
  LocalTranscoderConfiguration,
  LocalVideoStreamError,
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
  RtmpStreamPublishErrorType,
  RtmpStreamPublishState,
  RtmpStreamingEvent,
  ScreenCaptureParameters,
  ScreenCaptureParameters2,
  ScreenScenarioType,
  SegmentationProperty,
  SenderOptions,
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
  VideoEncoderConfiguration,
  VideoFormat,
  VideoMirrorModeType,
  VideoOrientation,
  VideoRenderingTracingInfo,
  VideoStreamType,
  VideoSubscriptionOptions,
  VideoTranscoderError,
  VirtualBackgroundSource,
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
  IAudioSpectrumObserver,
  MediaSourceType,
  RawAudioFrameOpModeType,
  RenderModeType,
  VideoSourceType,
} from './AgoraMediaBase';
import { LogConfig, LogFilterType, LogLevel } from './IAgoraLog';
import { AudioMixingDualMonoMode, IMediaEngine } from './IAgoraMediaEngine';
import { IMediaPlayer } from './IAgoraMediaPlayer';
import { IMediaRecorder } from './IAgoraMediaRecorder';
import { IMusicContentCenter } from './IAgoraMusicContentCenter';
import {
  AgoraRhythmPlayerConfig,
  RhythmPlayerErrorType,
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
   * This parameter applies to Android and iOS only. The camera direction. See CameraDirection.
   */
  cameraDirection?: CameraDirection;
  /**
   * @ignore
   */
  deviceId?: string;
  /**
   * The format of the video frame. See VideoFormat.
   */
  format?: VideoFormat;
  /**
   * Whether to follow the video aspect ratio set in setVideoEncoderConfiguration : true : (Default) Follow the set video aspect ratio. The SDK crops the captured video according to the set video aspect ratio and synchronously changes the local preview screen and the video frame in onCaptureVideoFrame and onPreEncodeVideoFrame. false : Do not follow the system default audio playback device. The SDK does not change the aspect ratio of the captured video frame.
   */
  followEncodeDimensionRatio?: boolean;
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
  audioProcessingChannels?: number[];
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
   * @ignore
   */
  publishThirdCameraTrack?: boolean;
  /**
   * @ignore
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
   * @ignore
   */
  audioDelayMs?: number[];
  /**
   * @ignore
   */
  mediaPlayerAudioDelayMs?: number[];
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
   *  This parameter only applies to scenarios involving cohosting across channels. The cohosts need to call the joinChannelEx method to join the other host's channel as an audience member, and set isInteractiveAudience to true.
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
  onJoinChannelSuccess?(elapsed: number): RtcConnection;

  onRejoinChannelSuccess?(elapsed: number): RtcConnection;

  onProxyConnected?(
    uid: number,
    proxyType: ProxyType,
    elapsed: number
  ): { channel: string; localProxyIp: string };

  onError?(err: ErrorCodeType): string;

  onAudioQuality?(
    remoteUid: number,
    quality: QualityType,
    delay: number,
    lost: number
  ): RtcConnection;

  onLastmileProbeResult?(): LastmileProbeResult;

  onAudioVolumeIndication?(
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): RtcConnection;

  onLeaveChannel?(): { connection: RtcConnection; stats: RtcStats };

  onRtcStats?(): { connection: RtcConnection; stats: RtcStats };

  onAudioDeviceStateChanged?(
    deviceType: MediaDeviceType,
    deviceState: MediaDeviceStateType
  ): string;

  onAudioMixingPositionChanged?(position: number): void;

  onAudioMixingFinished?(): void;

  onAudioEffectFinished?(soundId: number): void;

  onVideoDeviceStateChanged?(
    deviceType: MediaDeviceType,
    deviceState: MediaDeviceStateType
  ): string;

  onNetworkQuality?(
    remoteUid: number,
    txQuality: QualityType,
    rxQuality: QualityType
  ): RtcConnection;

  onIntraRequestReceived?(): RtcConnection;

  onUplinkNetworkInfoUpdated?(): UplinkNetworkInfo;

  onDownlinkNetworkInfoUpdated?(): DownlinkNetworkInfo;

  onLastmileQuality?(quality: QualityType): void;

  onFirstLocalVideoFrame?(
    source: VideoSourceType,
    width: number,
    height: number,
    elapsed: number
  ): void;

  onFirstLocalVideoFramePublished?(
    source: VideoSourceType,
    elapsed: number
  ): void;

  onFirstRemoteVideoDecoded?(
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): RtcConnection;

  onVideoSizeChanged?(
    sourceType: VideoSourceType,
    uid: number,
    width: number,
    height: number,
    rotation: number
  ): RtcConnection;

  onLocalVideoStateChanged?(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    error: LocalVideoStreamError
  ): void;

  onRemoteVideoStateChanged?(
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ): RtcConnection;

  onFirstRemoteVideoFrame?(
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): RtcConnection;

  onUserJoined?(remoteUid: number, elapsed: number): RtcConnection;

  onUserOffline?(
    remoteUid: number,
    reason: UserOfflineReasonType
  ): RtcConnection;

  onUserMuteAudio?(remoteUid: number, muted: boolean): RtcConnection;

  onUserMuteVideo?(remoteUid: number, muted: boolean): RtcConnection;

  onUserEnableVideo?(remoteUid: number, enabled: boolean): RtcConnection;

  onUserStateChanged?(remoteUid: number, state: number): RtcConnection;

  onUserEnableLocalVideo?(remoteUid: number, enabled: boolean): RtcConnection;

  onLocalAudioStats?(): { connection: RtcConnection; stats: LocalAudioStats };

  onRemoteAudioStats?(): { connection: RtcConnection; stats: RemoteAudioStats };

  onLocalVideoStats?(source: VideoSourceType): LocalVideoStats;

  onRemoteVideoStats?(): { connection: RtcConnection; stats: RemoteVideoStats };

  onCameraReady?(): void;

  onCameraFocusAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  onCameraExposureAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  onFacePositionChanged?(
    imageWidth: number,
    imageHeight: number,
    vecRectangle: Rectangle[],
    vecDistance: number[],
    numFaces: number
  ): void;

  onVideoStopped?(): void;

  onAudioMixingStateChanged?(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ): void;

  onRhythmPlayerStateChanged?(
    state: RhythmPlayerStateType,
    errorCode: RhythmPlayerErrorType
  ): void;

  onConnectionLost?(): RtcConnection;

  onConnectionInterrupted?(): RtcConnection;

  onConnectionBanned?(): RtcConnection;

  onStreamMessage?(
    remoteUid: number,
    streamId: number,
    data: Uint8Array,
    length: number,
    sentTs: number
  ): RtcConnection;

  onStreamMessageError?(
    remoteUid: number,
    streamId: number,
    code: ErrorCodeType,
    missed: number,
    cached: number
  ): RtcConnection;

  onRequestToken?(): RtcConnection;

  onTokenPrivilegeWillExpire?(): { connection: RtcConnection; token: string };

  onLicenseValidationFailure?(reason: LicenseErrorType): RtcConnection;

  onFirstLocalAudioFramePublished?(elapsed: number): RtcConnection;

  onFirstRemoteAudioFrame?(userId: number, elapsed: number): RtcConnection;

  onFirstRemoteAudioDecoded?(uid: number, elapsed: number): RtcConnection;

  onLocalAudioStateChanged?(
    state: LocalAudioStreamState,
    error: LocalAudioStreamError
  ): RtcConnection;

  onRemoteAudioStateChanged?(
    remoteUid: number,
    state: RemoteAudioState,
    reason: RemoteAudioStateReason,
    elapsed: number
  ): RtcConnection;

  onActiveSpeaker?(uid: number): RtcConnection;

  onContentInspectResult?(result: ContentInspectResult): void;

  onSnapshotTaken?(
    uid: number,
    width: number,
    height: number,
    errCode: number
  ): { connection: RtcConnection; filePath: string };

  onClientRoleChanged?(
    oldRole: ClientRoleType,
    newRole: ClientRoleType
  ): { connection: RtcConnection; newRoleOptions: ClientRoleOptions };

  onClientRoleChangeFailed?(
    reason: ClientRoleChangeFailedReason,
    currentRole: ClientRoleType
  ): RtcConnection;

  onAudioDeviceVolumeChanged?(
    deviceType: MediaDeviceType,
    volume: number,
    muted: boolean
  ): void;

  onRtmpStreamingStateChanged?(
    state: RtmpStreamPublishState,
    errCode: RtmpStreamPublishErrorType
  ): string;

  onRtmpStreamingEvent?(eventCode: RtmpStreamingEvent): string;

  onTranscodingUpdated?(): void;

  onAudioRoutingChanged?(routing: number): void;

  onChannelMediaRelayStateChanged?(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void;

  onChannelMediaRelayEvent?(code: ChannelMediaRelayEvent): void;

  onLocalPublishFallbackToAudioOnly?(isFallbackOrRecover: boolean): void;

  onRemoteSubscribeFallbackToAudioOnly?(
    uid: number,
    isFallbackOrRecover: boolean
  ): void;

  onRemoteAudioTransportStats?(
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): RtcConnection;

  onRemoteVideoTransportStats?(
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): RtcConnection;

  onConnectionStateChanged?(
    state: ConnectionStateType,
    reason: ConnectionChangedReasonType
  ): RtcConnection;

  onWlAccMessage?(
    reason: WlaccMessageReason,
    action: WlaccSuggestAction
  ): { connection: RtcConnection; wlAccMsg: string };

  onWlAccStats?(
    currentStats: WlAccStats,
    averageStats: WlAccStats
  ): RtcConnection;

  onNetworkTypeChanged?(type: NetworkType): RtcConnection;

  onEncryptionError?(errorType: EncryptionErrorType): RtcConnection;

  onPermissionError?(permissionType: PermissionType): void;

  onLocalUserRegistered?(uid: number): string;

  onUserInfoUpdated?(uid: number): UserInfo;

  onUploadLogResult?(
    success: boolean,
    reason: UploadErrorReason
  ): { connection: RtcConnection; requestId: string };

  onAudioSubscribeStateChanged?(
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): string;

  onVideoSubscribeStateChanged?(
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): string;

  onAudioPublishStateChanged?(
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): string;

  onVideoPublishStateChanged?(
    source: VideoSourceType,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): string;

  onExtensionEvent?(): {
    provider: string;
    extension: string;
    key: string;
    value: string;
  };

  /**
   * @ignore
   */
  onExtensionStarted?(): { provider: string; extension: string };

  onExtensionStopped?(): { provider: string; extension: string };

  onExtensionError?(error: number): {
    provider: string;
    extension: string;
    message: string;
  };

  /**
   * @ignore
   */
  onUserAccountUpdated?(remoteUid: number): {
    connection: RtcConnection;
    userAccount: string;
  };

  /**
   * Occurs when there's an error during the local video mixing.
   *
   * When you fail to call startLocalVideoTranscoder or updateLocalTranscoderConfiguration, the SDK triggers this callback to report the reason.
   *
   * @param stream The video streams that cannot be mixed during video mixing. See TranscodingVideoStream.
   * @param error The reason for local video mixing error. See VideoTranscoderError.
   */
  onLocalVideoTranscoderError?(
    error: VideoTranscoderError
  ): TranscodingVideoStream;

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
    uid: number,
    currentEvent: MediaTraceEvent,
    tracingInfo: VideoRenderingTracingInfo
  ): RtcConnection;
}

/**
 * Video device management methods.
 */
export abstract class IVideoDeviceManager {
  /**
   * @ignore
   */
  abstract enumerateVideoDevices(): VideoDeviceInfo[];

  abstract setDevice(): string;

  abstract getDevice(): string;

  abstract numberOfCapabilities(deviceIdUTF8: string): number;

  abstract getCapability(deviceCapabilityNumber: number): {
    deviceIdUTF8: string;
    capability: VideoFormat;
  };

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
   * The audio scenarios. See AudioScenarioType. Under different audio scenarios, the device uses different volume types.
   */
  audioScenario?: AudioScenarioType;
  /**
   * The region for connection. This is an advanced feature and applies to scenarios that have regional restrictions. The area codes support bitwise operation.
   */
  areaCode?: number;
  /**
   * The SDK log files are: agorasdk.log, agorasdk.1.log, agorasdk.2.log, agorasdk.3.log, and agorasdk.4.log.
   *  The API call log files are: agoraapi.log, agoraapi.1.log, agoraapi.2.log, agoraapi.3.log, and agoraapi.4.log.
   *  The default size for each SDK log file is 1,024 KB; the default size for each API call log file is 2,048 KB. These log files are encoded in UTF-8.
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
   * The user ID.
   *  For the recipient:the ID of the remote user who sent the Metadata.
   *  Ignore it for sender.
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
   * @ignore
   */
  onMetadataReceived?(): Metadata;
}

/**
 * The CDN streaming error.
 */
export enum DirectCdnStreamingError {
  /**
   * 0: No error.
   */
  DirectCdnStreamingErrorOk = 0,
  /**
   * 1: A general error; no specific reason. You can try to push the media stream again.
   */
  DirectCdnStreamingErrorFailed = 1,
  /**
   * 2: An error occurs when pushing audio streams. For example, the local audio capture device is not working properly, is occupied by another process, or does not get the permission required.
   */
  DirectCdnStreamingErrorAudioPublication = 2,
  /**
   * 3: An error occurs when pushing video streams. For example, the local video capture device is not working properly, is occupied by another process, or does not get the permission required.
   */
  DirectCdnStreamingErrorVideoPublication = 3,
  /**
   * 4: Fails to connect to the CDN.
   */
  DirectCdnStreamingErrorNetConnect = 4,
  /**
   * 5: The URL is already being used. Use a new URL for streaming.
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
   * @param error The CDN streaming error. See DirectCdnStreamingError.
   * @param message The information about the changed streaming state.
   */
  onDirectCdnStreamingStateChanged?(
    state: DirectCdnStreamingState,
    error: DirectCdnStreamingError
  ): string;

  /**
   * @ignore
   */
  onDirectCdnStreamingStats?(): DirectCdnStreamingStats;
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
   * Releases the IRtcEngine instance.
   *
   * This method releases all resources used by the Agora SDK. Use this method for apps in which users occasionally make voice or video calls. When users do not make calls, you can free up resources for other operations. After a successful method call, you can no longer use any method or callback in the SDK anymore. If you want to use the real-time communication functions again, you must call createAgoraRtcEngine and initialize to create a new IRtcEngine instance.
   *  This method can be called synchronously. You need to wait for the resource of IRtcEngine to be released before performing other operations (for example, create a new IRtcEngine object). Therefore, Agora recommends calling this method in the child thread to avoid blocking the main thread.
   *  Besides, Agora does not recommend you calling release in any callback of the SDK. Otherwise, the SDK cannot release the resources until the callbacks return results, which may result in a deadlock.
   *
   * @param sync Whether the method is called synchronously: true : Synchronous call. false : Asynchronous call. Currently this method only supports synchronous calls. Do not set this parameter to this value.
   */
  abstract release(sync?: boolean): void;

  abstract initialize(): RtcEngineContext;

  abstract getVersion(): SDKBuildInfo;

  abstract getErrorDescription(code: number): string;

  abstract queryCodecCapability(): { codecInfo: CodecCapInfo[]; size: number };

  abstract preloadChannel(uid: number): { token: string; channelId: string };

  abstract preloadChannelWithUserAccount(): {
    token: string;
    channelId: string;
    userAccount: string;
  };

  /**
   * @ignore
   */
  abstract updatePreloadChannelToken(): string;

  abstract joinChannel(uid: number): {
    token: string;
    channelId: string;
    options: ChannelMediaOptions;
  };

  /**
   * @ignore
   */
  abstract updateChannelMediaOptions(): ChannelMediaOptions;

  abstract leaveChannel(): LeaveChannelOptions;

  abstract renewToken(): string;

  abstract setChannelProfile(profile: ChannelProfileType): number;

  abstract setClientRole(role: ClientRoleType): ClientRoleOptions;

  abstract startEchoTest(): EchoTestConfiguration;

  abstract stopEchoTest(): number;

  abstract enableMultiCamera(enabled: boolean): CameraCapturerConfiguration;

  abstract enableVideo(): number;

  abstract disableVideo(): number;

  abstract startPreview(sourceType?: VideoSourceType): number;

  abstract stopPreview(sourceType?: VideoSourceType): number;

  abstract startLastmileProbeTest(): LastmileProbeConfig;

  abstract stopLastmileProbeTest(): number;

  abstract setVideoEncoderConfiguration(): VideoEncoderConfiguration;

  abstract setBeautyEffectOptions(
    enabled: boolean,
    type?: MediaSourceType
  ): BeautyOptions;

  abstract setLowlightEnhanceOptions(
    enabled: boolean,
    type?: MediaSourceType
  ): LowlightEnhanceOptions;

  abstract setVideoDenoiserOptions(
    enabled: boolean,
    type?: MediaSourceType
  ): VideoDenoiserOptions;

  abstract setColorEnhanceOptions(
    enabled: boolean,
    type?: MediaSourceType
  ): ColorEnhanceOptions;

  abstract enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type?: MediaSourceType
  ): number;

  abstract setupRemoteVideo(): VideoCanvas;

  abstract setupLocalVideo(): VideoCanvas;

  abstract setVideoScenario(scenarioType: VideoApplicationScenarioType): number;

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

  abstract setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;

  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  abstract muteLocalVideoStream(mute: boolean): number;

  abstract enableLocalVideo(enabled: boolean): number;

  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  abstract setDefaultMuteAllRemoteVideoStreams(mute: boolean): number;

  abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

  abstract setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): number;

  abstract setRemoteVideoSubscriptionOptions(
    uid: number
  ): VideoSubscriptionOptions;

  abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

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

  abstract startAudioRecording(): AudioRecordingConfiguration;

  abstract registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number;

  abstract stopAudioRecording(): number;

  abstract createMediaPlayer(): IMediaPlayer;

  abstract destroyMediaPlayer(): IMediaPlayer;

  abstract createMediaRecorder(): {
    info: RecorderStreamInfo;
    result: IMediaRecorder;
  };

  /**
   * @ignore
   */
  abstract destroyMediaRecorder(): IMediaRecorder;

  abstract startAudioMixing(
    loopback: boolean,
    cycle: number,
    startPos?: number
  ): string;

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

  abstract getEffectsVolume(): number;

  abstract setEffectsVolume(volume: number): number;

  abstract preloadEffect(soundId: number, startPos?: number): string;

  abstract playEffect(
    soundId: number,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean,
    startPos?: number
  ): string;

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

  abstract getEffectDuration(): string;

  abstract setEffectPosition(soundId: number, pos: number): number;

  abstract getEffectCurrentPosition(soundId: number): number;

  abstract enableSoundPositionIndication(enabled: boolean): number;

  abstract setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): number;

  abstract enableSpatialAudio(enabled: boolean): number;

  abstract setRemoteUserSpatialAudioParams(uid: number): SpatialAudioParams;

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

  abstract setLogFile(): string;

  abstract setLogFilter(filter: LogFilterType): number;

  abstract setLogLevel(level: LogLevel): number;

  abstract setLogFileSize(fileSizeInKBytes: number): number;

  abstract uploadLogFile(): string;

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

  abstract enableDualStreamMode(enabled: boolean): SimulcastStreamConfig;

  abstract setDualStreamMode(mode: SimulcastStreamMode): SimulcastStreamConfig;

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

  abstract enableLoopbackRecording(enabled: boolean): string;

  abstract adjustLoopbackSignalVolume(volume: number): number;

  abstract getLoopbackRecordingVolume(): number;

  abstract enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number;

  abstract setInEarMonitoringVolume(volume: number): number;

  abstract loadExtensionProvider(unloadAfterUse?: boolean): string;

  abstract setExtensionProviderProperty(): {
    provider: string;
    key: string;
    value: string;
  };

  /**
   * @ignore
   */
  abstract registerExtension(type?: MediaSourceType): {
    provider: string;
    extension: string;
  };

  /**
   * Enables or disables extensions.
   *
   * To call this method, call it immediately after initializing the IRtcEngine object.
   *  If you want to enable multiple extensions, you need to call this method multiple times.
   *  The data processing order of different extensions in the SDK is determined by the order in which the extensions are enabled. That is, the extension that is enabled first will process the data first.
   *
   * @param extension The name of the extension.
   * @param provider The name of the extension provider.
   * @param enable Whether to enable the extension: true : Enable the extension. false : Disable the extension.
   * @param type Type of media source. See MediaSourceType. In this method, this parameter supports only the following two settings:
   *  The default value is UnknownMediaSource.
   *  If you want to use the second camera to capture video, set this parameter to SecondaryCameraSource.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -3: The extension library is not loaded. Agora recommends that you check the storage location or the name of the dynamic library.
   */
  abstract enableExtension(
    enable?: boolean,
    type?: MediaSourceType
  ): { provider: string; extension: string };

  abstract setExtensionProperty(type?: MediaSourceType): {
    provider: string;
    extension: string;
    key: string;
    value: string;
  };

  /**
   * Gets detailed information on the extensions.
   *
   * @param provider The name of the extension provider.
   * @param extension The name of the extension.
   * @param key The key of the extension.
   * @param type Source type of the extension. See MediaSourceType.
   * @param bufLen Maximum length of the JSON string indicating the extension property. The maximum value is 512 bytes.
   *
   * @returns
   * The extension information, if the method call succeeds.
   *  An empty string, if the method call fails.
   */
  abstract getExtensionProperty(
    bufLen: number,
    type?: MediaSourceType
  ): { provider: string; extension: string; key: string; value: string };

  abstract setCameraCapturerConfiguration(): CameraCapturerConfiguration;

  abstract createCustomVideoTrack(): number;

  abstract createCustomEncodedVideoTrack(): {
    senderOption: SenderOptions;
    result: number;
  };

  /**
   * Destroys the specified video track.
   *
   * @param videoTrackId The video track ID returned by calling the createCustomVideoTrack method.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
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

  abstract setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): number;

  abstract setEnableSpeakerphone(speakerOn: boolean): number;

  abstract isSpeakerphoneEnabled(): boolean;

  abstract setRouteInCommunicationMode(route: number): number;

  abstract getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[];

  abstract setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number;

  abstract startScreenCaptureByDisplayId(displayId: number): {
    regionRect: Rectangle;
    captureParams: ScreenCaptureParameters;
  };

  /**
   * @ignore
   */
  abstract startScreenCaptureByScreenRect(): {
    screenRect: Rectangle;
    regionRect: Rectangle;
    captureParams: ScreenCaptureParameters;
  };

  /**
   * Gets the audio device information.
   *
   * After calling this method, you can get whether the audio device supports ultra-low-latency capture and playback.
   *  You can call this method either before or after joining a channel.
   *
   * @returns
   * The DeviceInfo object that identifies the audio device information.
   *  Not null: Success.
   *  Null: Failure.
   */
  abstract getAudioDeviceInfo(): DeviceInfo;

  abstract startScreenCaptureByWindowId(windowId: any): {
    regionRect: Rectangle;
    captureParams: ScreenCaptureParameters;
  };

  /**
   * Sets the content hint for screen sharing.
   *
   * A content hint suggests the type of the content being shared, so that the SDK applies different optimization algorithms to different types of content. If you don't call this method, the default content hint is ContentHintNone. You can call this method either before or after you start screen sharing.
   *
   * @param contentHint The content hint for screen sharing. See VideoContentHint.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter is invalid.
   *  -8: The screen sharing state is invalid. Probably because you have shared other screens or windows. Try calling stopScreenCapture to stop the current sharing and start sharing the screen again.
   */
  abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

  abstract updateScreenCaptureRegion(): Rectangle;

  abstract updateScreenCaptureParameters(): ScreenCaptureParameters;

  abstract startScreenCapture(): ScreenCaptureParameters2;

  abstract startScreenCaptureBySourceType(
    sourceType: VideoSourceType
  ): ScreenCaptureConfiguration;

  abstract updateScreenCapture(): ScreenCaptureParameters2;

  abstract queryScreenCaptureCapability(): number;

  abstract setScreenCaptureScenario(screenScenario: ScreenScenarioType): number;

  abstract stopScreenCapture(): number;

  abstract stopScreenCaptureBySourceType(sourceType: VideoSourceType): number;

  abstract getCallId(): string;

  abstract rate(rating: number): { callId: string; description: string };

  abstract complain(): { callId: string; description: string };

  abstract startRtmpStreamWithoutTranscoding(): string;

  abstract startRtmpStreamWithTranscoding(): {
    url: string;
    transcoding: LiveTranscoding;
  };

  /**
   * @ignore
   */
  abstract updateRtmpTranscoding(): LiveTranscoding;

  abstract stopRtmpStream(): string;

  abstract startLocalVideoTranscoder(): LocalTranscoderConfiguration;

  abstract updateLocalTranscoderConfiguration(): LocalTranscoderConfiguration;

  abstract stopLocalVideoTranscoder(): number;

  abstract startCameraCapture(
    sourceType: VideoSourceType
  ): CameraCapturerConfiguration;

  abstract stopCameraCapture(sourceType: VideoSourceType): number;

  abstract setCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  abstract setScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  abstract getConnectionState(): ConnectionStateType;

  abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

  abstract unregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): boolean;

  abstract setRemoteUserPriority(
    uid: number,
    userPriority: PriorityType
  ): number;

  abstract setEncryptionMode(): string;

  abstract setEncryptionSecret(): string;

  abstract enableEncryption(enabled: boolean): EncryptionConfig;

  abstract createDataStream(config: DataStreamConfig): number;

  abstract sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number;

  abstract addVideoWatermark(): {
    watermarkUrl: string;
    options: WatermarkOptions;
  };

  /**
   * Removes the watermark image from the video stream.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract clearVideoWatermarks(): number;

  abstract pauseAudio(): number;

  abstract resumeAudio(): number;

  abstract enableWebSdkInteroperability(enabled: boolean): number;

  abstract sendCustomReportMessage(value: number): {
    id: string;
    category: string;
    event: string;
    label: string;
  };

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

  abstract unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  abstract startAudioFrameDump(
    userId: number,
    durationMs: number,
    autoUpload: boolean
  ): { channelId: string; location: string; uuid: string; passwd: string };

  abstract stopAudioFrameDump(userId: number): {
    channelId: string;
    location: string;
  };

  /**
   * Sets whether to enable the AI ​​noise suppression function and set the noise suppression mode.
   *
   * You can call this method to enable AI noise suppression function. Once enabled, the SDK automatically detects and reduces stationary and non-stationary noise from your audio on the premise of ensuring the quality of human voice. Stationary noise refers to noise signal with constant average statistical properties and negligibly small fluctuations of level within the period of observation. Common sources of stationary noises are:
   *  Television;
   *  Air conditioner;
   *  Machinery, etc. Non-stationary noise refers to noise signal with huge fluctuations of level within the period of observation; common sources of non-stationary noises are:
   *  Thunder;
   *  Explosion;
   *  Cracking, etc. Agora does not recommend enabling this function on devices running Android 6.0 and below.
   *
   * @param enabled Whether to enable the AI noise suppression function: true : Enable the AI noise suppression. false : (Default) Disable the AI noise suppression.
   * @param mode The AI noise suppression modes. See AudioAinsMode.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setAINSMode(enabled: boolean, mode: AudioAinsMode): number;

  abstract registerLocalUserAccount(): { appId: string; userAccount: string };

  abstract joinChannelWithUserAccount(): {
    token: string;
    channelId: string;
    userAccount: string;
    options: ChannelMediaOptions;
  };

  /**
   * @ignore
   */
  abstract joinChannelWithUserAccountEx(): {
    token: string;
    channelId: string;
    userAccount: string;
    options: ChannelMediaOptions;
  };

  /**
   * @ignore
   */
  abstract getUserInfoByUserAccount(): {
    userAccount: string;
    userInfo: UserInfo;
  };

  /**
   * Gets the user information by passing in the user ID.
   *
   * After a remote user joins the channel, the SDK gets the user ID and account of the remote user, caches them in a mapping table object, and triggers the onUserInfoUpdated callback on the local client. After receiving the callback, you can call this method to get the user account of the remote user from the UserInfo object by passing in the user ID.
   *
   * @param uid The user ID.
   *
   * @returns
   * A pointer to the UserInfo instance, if the method call succeeds.
   *  If the call fails, returns NULL.
   */
  abstract getUserInfoByUid(uid: number): UserInfo;

  abstract startOrUpdateChannelMediaRelay(): ChannelMediaRelayConfiguration;

  abstract startChannelMediaRelay(): ChannelMediaRelayConfiguration;

  abstract updateChannelMediaRelay(): ChannelMediaRelayConfiguration;

  abstract stopChannelMediaRelay(): number;

  abstract pauseAllChannelMediaRelay(): number;

  abstract resumeAllChannelMediaRelay(): number;

  abstract setDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): number;

  abstract setDirectCdnStreamingVideoConfiguration(): VideoEncoderConfiguration;

  abstract startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler
  ): { publishUrl: string; options: DirectCdnStreamingMediaOptions };

  abstract stopDirectCdnStreaming(): number;

  abstract updateDirectCdnStreamingMediaOptions(): DirectCdnStreamingMediaOptions;

  abstract startRhythmPlayer(): {
    sound1: string;
    sound2: string;
    config: AgoraRhythmPlayerConfig;
  };

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
   * @ignore
   */
  abstract configRhythmPlayer(): AgoraRhythmPlayerConfig;

  /**
   * Takes a snapshot of a video stream.
   *
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image, and saves it to the specified path. The SDK has not taken the snapshot when the method call returns. After a successful method call, the SDK triggers the onSnapshotTaken callback to report whether the snapshot is successfully taken, as well as the details for that snapshot.
   *  Call this method after joining a channel.
   *  When used for local video snapshots, this method takes a snapshot for the video streams specified in ChannelMediaOptions.
   *  If the user's video has been preprocessed, for example, watermarked or beautified, the resulting snapshot includes the pre-processing effect.
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
  abstract takeSnapshot(uid: number): string;

  /**
   * Enables or disables video screenshot and upload.
   *
   * When video screenshot and upload function is enabled, the SDK takes screenshots and upload videos sent by local users based on the type and frequency of the module you set in ContentInspectConfig. After video screenshot and upload, the Agora server sends the callback notification to your app server in HTTPS requests and sends all screenshots to the third-party cloud storage service. Before calling this method, ensure that the video screenshot upload service has been activated. Before calling this method, ensure that Video content moderation service has been activated.
   *  This method relies on the video screenshot and upload dynamic library libagora_content_inspect_extension.dll. If the dynamic library is deleted, the function cannot be enabled normally.
   *
   * @param enabled Whether to enable video screenshot and upload : true : Enables video screenshot and upload. false : Disables video screenshot and upload.
   * @param config Configuration of video screenshot and upload. See ContentInspectConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableContentInspect(enabled: boolean): ContentInspectConfig;

  /**
   * Adjusts the volume of the custom audio track played remotely.
   *
   * Ensure you have called the createCustomAudioTrack method to create a custom audio track before calling this method. If you want to change the volume of the audio to be published, you need to call this method again.
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
   * @ignore
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
  abstract setLocalAccessPoint(): LocalAccessPointConfiguration;

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
  abstract setAVSyncSource(uid: number): string;

  /**
   * Sets whether to replace the current video feeds with images when publishing video streams.
   *
   * Agora recommends that you call this method after joining a channel. When publishing video streams, you can call this method to replace the current video feeds with custom images. Once you enable this function, you can select images to replace the video feeds through the ImageTrackOptions parameter. If you disable this function, the remote users see the video feeds that you publish.
   *
   * @param enable Whether to replace the current video feeds with custom images: true : Replace the current video feeds with custom images. false : (Default) Do not replace the current video feeds with custom images.
   * @param options Image configurations. See ImageTrackOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableVideoImageSource(enable: boolean): ImageTrackOptions;

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
   * @ignore
   */
  abstract setParameters(): string;

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
   * After successfully calling this method, the SDK enables the instant frame rendering mode, which can speed up the first frame rendering speed after the user joins the channel.
   *  Once the instant rendering function is enabled, it can only be canceled by calling the release method to destroy the IRtcEngine object.
   *  In this mode, the SDK uses Agora's custom encryption algorithm to shorten the time required to establish transmission links, and the security is reduced compared to the standard DTLS (Datagram Transport Layer Security). If the application scenario requires higher security standards, Agora recommends that you do not use this method.
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
   * @ignore
   */
  abstract isFeatureAvailableOnDevice(type: FeatureType): boolean;

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
   * Sends media metadata.
   *
   * If the metadata is sent successfully, the SDK triggers the onMetadataReceived callback on the receiver.
   *
   * @param metadata Media metadata See Metadata.
   * @param sourceType The type of the video source. See VideoSourceType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract sendMetaData(sourceType: VideoSourceType): Metadata;

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
   * @ignore
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
   * 38: 640 × 360, frame rate 15 fps, bitrate 800 Kbps. This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p9 = 38,
  /**
   * 39: 640 × 360, frame rate 24 fps, bitrate 800 Kbps. This profile applies only to the live streaming channel profile.
   */
  VideoProfileLandscape360p10 = 39,
  /**
   * 100: 640 × 360, frame rate 24 fps, bitrate 1000 Kbps. This profile applies only to the live streaming channel profile.
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
   * 1038: 360 × 640, frame rate 15 fps, bitrate 800 Kbps. This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p9 = 1038,
  /**
   * 1039: 360 × 640, frame rate 24 fps, bitrate 800 Kbps. This profile applies only to the live streaming channel profile.
   */
  VideoProfilePortrait360p10 = 1039,
  /**
   * 1100: 360 × 640, frame rate 24 fps, bitrate 1000 Kbps. This profile applies only to the live streaming channel profile.
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
