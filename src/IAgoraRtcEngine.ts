import {
  QualityAdaptIndication,
  VideoCodecType,
  VideoStreamType,
  AudioSampleRateType,
  VideoFormat,
  Rectangle,
  ScreenCaptureParameters,
  ClientRoleType,
  AudienceLatencyLevelType,
  ChannelProfileType,
  WarnCodeType,
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
  LocalAudioStreamState,
  LocalAudioStreamError,
  RemoteAudioState,
  RemoteAudioStateReason,
  ClientRoleChangeFailedReason,
  RtmpStreamPublishState,
  RtmpStreamPublishErrorType,
  RtmpStreamingEvent,
  ChannelMediaRelayState,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ConnectionStateType,
  ConnectionChangedReasonType,
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
  VirtualBackgroundSource,
  VideoCanvas,
  SpatialAudioParams,
  VoiceBeautifierPreset,
  AudioEffectPreset,
  VoiceConversionPreset,
  VideoMirrorModeType,
  EarMonitoringFilterType,
  AudioSessionOperationRestriction,
  DeviceInfo,
  VideoContentHint,
  LiveTranscoding,
  LocalTranscoderConfiguration,
  VideoOrientation,
  EncryptionConfig,
  ChannelMediaRelayConfiguration,
  AudioProfileType,
  FishCorrectionParams,
  ClientRoleOptions,
  AudioRecordingConfiguration,
  SimulcastStreamConfig,
  DataStreamConfig,
  WatermarkOptions,
} from './AgoraBase';
import {
  RenderModeType,
  NlpAggressiveness,
  ContentInspectResult,
  MediaSourceType,
  RawAudioFrameOpModeType,
  SnapShotConfig,
  ContentInspectConfig,
  AdvancedAudioOptions,
} from './AgoraMediaBase';
import { RtcConnection } from './IAgoraRtcEngineEx';
import {
  RhythmPlayerStateType,
  RhythmPlayerErrorType,
  AgoraRhythmPlayerConfig,
} from './IAgoraRhythmPlayer';
import { LogConfig, LogFilterType, LogLevel } from './IAgoraLog';
import { IMediaPlayer } from './IAgoraMediaPlayer';
import { IAudioDeviceManager } from './IAudioDeviceManager';

/*
 * TODO(doc)
 */
export enum MediaDeviceType {
  /*
   * TODO(doc)
   */
  UnknownAudioDevice = -1,
  /*
   * TODO(doc)
   */
  AudioPlayoutDevice = 0,
  /*
   * TODO(doc)
   */
  AudioRecordingDevice = 1,
  /*
   * TODO(doc)
   */
  VideoRenderDevice = 2,
  /*
   * TODO(doc)
   */
  VideoCaptureDevice = 3,
  /*
   * TODO(doc)
   */
  AudioApplicationPlayoutDevice = 4,
}

/*
 * 音乐文件播放状态。
 */
export enum AudioMixingStateType {
  /*
   * 710: 音乐文件正常播放。
   */
  AudioMixingStatePlaying = 710,
  /*
   * 711: 音乐文件暂停播放。
   */
  AudioMixingStatePaused = 711,
  /*
   * 713: 音乐文件停止播放。
   */
  AudioMixingStateStopped = 713,
  /*
   * 714: 音乐文件播放出错。
   */
  AudioMixingStateFailed = 714,
  /*
   *  715: 音乐文件已结束一次播放。
   */
  AudioMixingStateCompleted = 715,
  /*
   * 716: 音乐文件已结束循环播放。
   */
  AudioMixingStateAllLoopsCompleted = 716,
}

/*
 * 播放音乐文件时可能出现的错误。
 */
export enum AudioMixingErrorType {
  /*
   * 音乐文件打开出错。
   */
  AudioMixingErrorCanNotOpen = 701,
  /*
   * 音乐文件打开太频繁。
   */
  AudioMixingErrorTooFrequentCall = 702,
  /*
   * 音乐文件播放中断。
   */
  AudioMixingErrorInterruptedEof = 703,
  /*
   * 音乐文件正常播放。
   */
  AudioMixingErrorOk = 0,
}

/*
 * 导入的外部视频源状态。
 */
export enum InjectStreamStatus {
  /*
   * 0: 外部视频流导入成功。
   */
  InjectStreamStatusStartSuccess = 0,
  /*
   * 1: 外部视频流已存在。
   */
  InjectStreamStatusStartAlreadyExists = 1,
  /*
   * 2: 外部视频流导入未经授权。
   */
  InjectStreamStatusStartUnauthorized = 2,
  /*
   * 3: 导入外部视频流超时。
   */
  InjectStreamStatusStartTimedout = 3,
  /*
   * 4: 外部视频流导入失败。
   */
  InjectStreamStatusStartFailed = 4,
  /*
   * 5: 外部视频流停止导入成功。
   */
  InjectStreamStatusStopSuccess = 5,
  /*
   * 6: 未找到要停止导入的外部视频流。
   */
  InjectStreamStatusStopNotFound = 6,
  /*
   * 7: 要停止导入的外部视频流未经授权。
   */
  InjectStreamStatusStopUnauthorized = 7,
  /*
   * 8: 停止导入外部视频流超时。
   */
  InjectStreamStatusStopTimedout = 8,
  /*
   * 9: 停止导入外部视频流失败。
   */
  InjectStreamStatusStopFailed = 9,
  /*
   * 10: 导入的外部视频流被中断。
   */
  InjectStreamStatusBroken = 10,
}

/*
 * 语音音效均衡波段的中心频率。
 */
export enum AudioEqualizationBandFrequency {
  /*
   * 0: 31 Hz
   */
  AudioEqualizationBand31 = 0,
  /*
   * 1: 62 Hz
   */
  AudioEqualizationBand62 = 1,
  /*
   * 2: 125 Hz
   */
  AudioEqualizationBand125 = 2,
  /*
   * 3: 250 Hz
   */
  AudioEqualizationBand250 = 3,
  /*
   * 4: 500 Hz
   */
  AudioEqualizationBand500 = 4,
  /*
   * TODO(doc)
   */
  AudioEqualizationBand1k = 5,
  /*
   * TODO(doc)
   */
  AudioEqualizationBand2k = 6,
  /*
   * TODO(doc)
   */
  AudioEqualizationBand4k = 7,
  /*
   * TODO(doc)
   */
  AudioEqualizationBand8k = 8,
  /*
   * TODO(doc)
   */
  AudioEqualizationBand16k = 9,
}

/*
 * 音频混响类型。
 */
export enum AudioReverbType {
  /*
   * 0: 原始声音强度，即所谓的 dry signal，取值范围 [-20,10]，单位为 dB。
   */
  AudioReverbDryLevel = 0,
  /*
   * 1: 早期反射信号强度，即所谓的 wet signal，取值范围 [-20,10]，单位为 dB。
   */
  AudioReverbWetLevel = 1,
  /*
   * 2: 所需混响效果的房间尺寸，一般房间越大，混响越强，取值范围 [0,100]，单位为 dB。
   */
  AudioReverbRoomSize = 2,
  /*
   * 3: Wet signal 的初始延迟长度，取值范围 [0,200]，单位为毫秒。
   */
  AudioReverbWetDelay = 3,
  /*
   * 4: 混响持续的强度，取值范围为 [0,100]。
   */
  AudioReverbStrength = 4,
}

/*
 * 音视频流回退处理选项。
 */
export enum StreamFallbackOptions {
  /*
   * 0: 上行/下行网络较弱时，不对音视频流作回退处理，但不能保证音视频流的质量。
   */
  StreamFallbackOptionDisabled = 0,
  /*
   * 1: 在下行网络条件较差时只接收视频小流（低分辨率、低码率视频流）。该选项只对 setRemoteSubscribeFallbackOption 有效。
   */
  StreamFallbackOptionVideoStreamLow = 1,
  /*
   * 2: 上行/下行网络较弱时，先尝试只接收视频小流（低分辨率、低码率视频流）；如果网络环境无法显示视频，则再回退到只接收远端订阅的音频流。
   */
  StreamFallbackOptionAudioOnly = 2,
}

/*
 * 远端用户的需求优先级。
 */
export enum PriorityType {
  /*
   * 用户需求优先级为高。
   */
  PriorityHigh = 50,
  /*
   * （默认）用户需求优先级为正常。
   */
  PriorityNormal = 100,
}

/*
 * 本地视频流统计信息。
 */
export class LocalVideoStats {
  /*
   * 本地用户的 ID。
   */
  uid?: number;
  /*
   * 实际发送码率 (Kbps) 不包含丢包后重传视频等的发送码率。
   */
  sentBitrate?: number;
  /*
   * 实际发送帧率 (fps)。 不包含丢包后重传视频等的发送帧率。
   */
  sentFrameRate?: number;
  /*
   * 本地视频采集帧率 (fps)。
   */
  captureFrameRate?: number;
  /*
   * TODO(doc)
   */
  captureFrameWidth?: number;
  /*
   * TODO(doc)
   */
  captureFrameHeight?: number;
  /*
   * TODO(doc)
   */
  regulatedCaptureFrameRate?: number;
  /*
   * TODO(doc)
   */
  regulatedCaptureFrameWidth?: number;
  /*
   * TODO(doc)
   */
  regulatedCaptureFrameHeight?: number;
  /*
   * 本地视频编码器的输出帧率，单位为 fps。
   */
  encoderOutputFrameRate?: number;
  /*
   * 视频编码宽度（px）。
   */
  encodedFrameWidth?: number;
  /*
   * 视频编码高度（px）。
   */
  encodedFrameHeight?: number;
  /*
   * 本地视频渲染器的输出帧率，单位为 fps。
   */
  rendererOutputFrameRate?: number;
  /*
   * 当前编码器的目标编码码率 (Kbps)，该码率为 SDK 根据当前网络状况预估的一个值。
   */
  targetBitrate?: number;
  /*
   * 当前编码器的目标编码帧率 (fps)。
   */
  targetFrameRate?: number;
  /*
   *  统计周期内本地视频质量（基于目标帧率和目标码率）的自适应情况。详见 QualityAdaptIndication 。
   */
  qualityAdaptIndication?: QualityAdaptIndication;
  /*
   * 视频编码码率（Kbps）。 不包含丢包后重传视频等的编码码率。
   */
  encodedBitrate?: number;
  /*
   * 视频发送的帧数，累计值。
   */
  encodedFrameCount?: number;
  /*
   * 视频的编码类型。详见 VideoCodecType 。
   */
  codecType?: VideoCodecType;
  /*
   * 弱网对抗前本端到 Agora 边缘服务器的视频丢包率 (%)。
   */
  txPacketLossRate?: number;
}

/*
 * 远端视频流的统计信息。
 */
export class RemoteVideoStats {
  /*
   * 用户 ID，指定是哪个用户的视频流。
   */
  uid?: number;
  /*
   *  弃用：
   * 在有音画同步机制的音视频场景中，你可以参考 RemoteAudioStats 里的 networkTransportDelay 和 jitterBufferDelay 成员的值，了解视频的延迟数据。 延时（毫秒）。
   */
  delay?: number;
  /*
   * 视频流宽（像素）。
   */
  width?: number;
  /*
   * 视频流高（像素）。
   */
  height?: number;
  /*
   * （上次统计后）接收到的码率(Kbps)。
   */
  receivedBitrate?: number;
  /*
   * 远端视频解码器的输出帧率，单位为 fps。
   */
  decoderOutputFrameRate?: number;
  /*
   * 远端视频渲染器的输出帧率，单位为 fps。
   */
  rendererOutputFrameRate?: number;
  /*
   * 远端视频丢包率(%)。
   */
  frameLossRate?: number;
  /*
   * 远端视频在使用抗丢包技术之后的丢包率(%)。
   */
  packetLossRate?: number;
  /*
   * 视频流类型，大流或小流。详见 VideoStreamType 。
   */
  rxStreamType?: VideoStreamType;
  /*
   * 远端用户在加入频道后发生视频卡顿的累计时长（ms）。通话过程中，视频帧率设置不低于 5 fps 时，连续渲染的两帧视频之间间隔超过 500 ms，则记为一次视频卡顿。
   */
  totalFrozenTime?: number;
  /*
   * 远端用户在加入频道后发生视频卡顿的累计时长占视频总有效时长的百分比 (%)。视频有效时长是指远端用户加入频道后视频未被停止发送或禁用的时长。
   */
  frozenRate?: number;
  /*
   * 音频超前视频的时间 (ms)。 如果为负值，则代表音频落后于视频。
   */
  avSyncTimeMs?: number;
  /*
   * 视频有效时长（毫秒）。
   * 视频总有效时长是远端用户或主播加入频道后，既没有停止发送视频流，也没有禁用视频模块的通话时长。
   */
  totalActiveTime?: number;
  /*
   * 远端视频流的累计发布时长（毫秒）。
   */
  publishDuration?: number;
  /*
   * 超分辨率的开启状态：
   * >0：超分辨率已开启。
   * =0：超分辨率未开启。
   */
  superResolutionType?: number;
}

/*
 * TODO(doc)
 */
export class Region {
  /*
   * TODO(doc)
   */
  uid?: number;
  /*
   * TODO(doc)
   */
  x?: number;
  /*
   * TODO(doc)
   */
  y?: number;
  /*
   * TODO(doc)
   */
  width?: number;
  /*
   * TODO(doc)
   */
  height?: number;
  /*
   * TODO(doc)
   */
  zOrder?: number;
  /*
   * TODO(doc)
   */
  alpha?: number;
  /*
   * TODO(doc)
   */
  renderMode?: RenderModeType;
}

/*
 * TODO(doc)
 */
export class VideoCompositingLayout {
  /*
   * TODO(doc)
   */
  canvasWidth?: number;
  /*
   * TODO(doc)
   */
  canvasHeight?: number;
  /*
   * TODO(doc)
   */
  backgroundColor?: string;
  /*
   * TODO(doc)
   */
  regions?: Region[];
  /*
   * TODO(doc)
   */
  regionCount?: number;
  /*
   * TODO(doc)
   */
  appData?: Uint8Array;
  /*
   * TODO(doc)
   */
  appDataLength?: number;
}

/*
 * TODO(doc)
 */
export class InjectStreamConfig {
  /*
   * TODO(doc)
   */
  width?: number;
  /*
   * TODO(doc)
   */
  height?: number;
  /*
   * TODO(doc)
   */
  videoGop?: number;
  /*
   * TODO(doc)
   */
  videoFramerate?: number;
  /*
   * TODO(doc)
   */
  videoBitrate?: number;
  /*
   * TODO(doc)
   */
  audioSampleRate?: AudioSampleRateType;
  /*
   * TODO(doc)
   */
  audioBitrate?: number;
  /*
   * TODO(doc)
   */
  audioChannels?: number;
}

/*
 * 服务端转码推流的生命周期。
 * 弃用
 */
export enum RtmpStreamLifeCycleType {
  /*
   * TODO(doc)
   */
  RtmpStreamLifeCycleBind2channel = 1,
  /*
   * TODO(doc)
   */
  RtmpStreamLifeCycleBind2owner = 2,
}

/*
 * TODO(doc)
 */
export class PublisherConfiguration {
  /*
   * TODO(doc)
   */
  width?: number;
  /*
   * TODO(doc)
   */
  height?: number;
  /*
   * TODO(doc)
   */
  framerate?: number;
  /*
   * TODO(doc)
   */
  bitrate?: number;
  /*
   * TODO(doc)
   */
  defaultLayout?: number;
  /*
   * TODO(doc)
   */
  lifecycle?: number;
  /*
   * TODO(doc)
   */
  owner?: boolean;
  /*
   * TODO(doc)
   */
  injectStreamWidth?: number;
  /*
   * TODO(doc)
   */
  injectStreamHeight?: number;
  /*
   * TODO(doc)
   */
  injectStreamUrl?: string;
  /*
   * TODO(doc)
   */
  publishUrl?: string;
  /*
   * TODO(doc)
   */
  rawStreamUrl?: string;
  /*
   * TODO(doc)
   */
  extraInfo?: string;
}

/*
 * TODO(doc)
 */
export class AudioTrackConfig {
  /*
   * TODO(doc)
   */
  enableLocalPlayback?: boolean;
}

/*
 * 摄像头方向。
 */
export enum CameraDirection {
  /*
   * 后置摄像头。
   */
  CameraRear = 0,
  /*
   * 前置摄像头。
   */
  CameraFront = 1,
}

/*
 * TODO(doc)
 */
export enum CloudProxyType {
  /*
   * TODO(doc)
   */
  NoneProxy = 0,
  /*
   * TODO(doc)
   */
  UdpProxy = 1,
  /*
   * TODO(doc)
   */
  TcpProxy = 2,
}

/*
 *  摄像头采集配置。
 */
export class CameraCapturerConfiguration {
  /*
   * 该参数仅适用于 Android 和 iOS 平台。 摄像头方向设置。详见 CameraDirection 。
   */
  cameraDirection?: CameraDirection;
  /*
   * 播放设备的设备 ID。 最大长度为 MaxDeviceIdLengthType 。
   */
  deviceId?: string;
  /*
   * 详见 VideoFormat 。
   */
  format?: VideoFormat;
}

/*
 * TODO(doc)
 */
export class ScreenCaptureConfiguration {
  /*
   * TODO(doc)
   */
  isCaptureWindow?: boolean;
  /*
   * TODO(doc)
   */
  displayId?: number;
  /*
   * TODO(doc)
   */
  screenRect?: Rectangle;
  /*
   * TODO(doc)
   */
  windowId?: any;
  /*
   * TODO(doc)
   */
  params?: ScreenCaptureParameters;
  /*
   * TODO(doc)
   */
  regionRect?: Rectangle;
}

/*
 * TODO(doc)
 */
export class AudioOptionsExternal {
  /*
   * TODO(doc)
   */
  enable_aec_external_custom_?: boolean;
  /*
   * TODO(doc)
   */
  enable_agc_external_custom_?: boolean;
  /*
   * TODO(doc)
   */
  enable_ans_external_custom_?: boolean;
  /*
   * TODO(doc)
   */
  aec_aggressiveness_external_custom_?: NlpAggressiveness;
  /*
   * TODO(doc)
   */
  enable_aec_external_loopback_?: boolean;
}

/*
 * 缩略图或图标的目标尺寸。
 */
export class SIZE {
  /*
   * 缩略图或图标的目标宽度 (px)。默认值为 0。
   */
  width?: number;
  /*
   * 缩略图或图标的目标高度 (px)。默认值为 0。
   */
  height?: number;
}

/*
 * TODO(doc)
 */
export class ThumbImageBuffer {
  /*
   * TODO(doc)
   */
  buffer?: Uint8Array;
  /*
   * TODO(doc)
   */
  length?: number;
  /*
   * TODO(doc)
   */
  width?: number;
  /*
   * TODO(doc)
   */
  height?: number;
}

/*
 * TODO(doc)
 */
export enum ScreenCaptureSourceType {
  /*
   * TODO(doc)
   */
  ScreencapturesourcetypeUnknown = -1,
  /*
   * TODO(doc)
   */
  ScreencapturesourcetypeWindow = 0,
  /*
   * TODO(doc)
   */
  ScreencapturesourcetypeScreen = 1,
  /*
   * TODO(doc)
   */
  ScreencapturesourcetypeCustom = 2,
}

/*
 * TODO(doc)
 */
export class ScreenCaptureSourceInfo {
  /*
   * TODO(doc)
   */
  type?: ScreenCaptureSourceType;
  /*
   * TODO(doc)
   */
  sourceId?: any;
  /*
   * TODO(doc)
   */
  sourceName?: string;
  /*
   * TODO(doc)
   */
  thumbImage?: ThumbImageBuffer;
  /*
   * TODO(doc)
   */
  iconImage?: ThumbImageBuffer;
  /*
   * TODO(doc)
   */
  processPath?: string;
  /*
   * TODO(doc)
   */
  sourceTitle?: string;
  /*
   * TODO(doc)
   */
  primaryMonitor?: boolean;
  /*
   * TODO(doc)
   */
  isOccluded?: boolean;
}

/*
 *  频道媒体设置选项。
 * Agora 支持在同一时间、同一 RtcConnection 中发布多路音频流、一路视频流。例如，publishAudioTrack、publishCustomAudioTrack 和 publishMediaPlayerAudioTrack 可以同时为 true；publishCameraTrack、publishScreenTrack、publishCustomVideoTrack 或 publishEncodedVideoTrack 之中同一时间只能有一个为 true。
 */
export class ChannelMediaOptions {
  /*
   * 设置是否发布摄像头采集的视频： true：（默认）发布摄像头采集的视频。
   * false：不发布摄像头采集的视频。
   */
  publishCameraTrack?: boolean;
  /*
   * 设置是否发布第二个摄像头采集的视频： true：（默认）发布第二个摄像头采集的视频。
   * false：不发布第二个摄像头采集的视频。
   */
  publishSecondaryCameraTrack?: boolean;
  /*
   * 设置是否发布采集到的音频： true：（默认）发布采集到的音频。
   * false：不发布采集到的音频。
   */
  publishAudioTrack?: boolean;
  /*
   * 设置是否发布屏幕采集的视频： true：发布屏幕采集到的视频。
   * false：（默认）不发布屏幕采集到的视频。
   */
  publishScreenTrack?: boolean;
  /*
   * 设置是否发布第二个屏幕采集的视频：
   * true：发布第二个屏幕采集到的视频。
   * false：（默认）不发布第二个屏幕采集到的视频。
   */
  publishSecondaryScreenTrack?: boolean;
  /*
   * 设置是否发布自定义采集的音频： true：发布自定义采集到的音频。
   * false：（默认）不发布自定义采集到的音频。
   */
  publishCustomAudioTrack?: boolean;
  /*
   * 待发布的自定义音频源的 ID。默认值为 0。
   */
  publishCustomAudioSourceId?: number;
  /*
   * 设置发布自定义采集的音频时是否启用 AEC： true
   * ：发布自定义采集的音频时启用 AEC。 false
   * ：（默认）发布自定义采集的音频时不启用 AEC。
   */
  publishCustomAudioTrackEnableAec?: boolean;
  /*
   * TODO(doc)
   */
  publishDirectCustomAudioTrack?: boolean;
  /*
   * TODO(doc)
   */
  publishCustomAudioTrackAec?: boolean;
  /*
   * 设置是否发布自定义采集的视频： true：发布自定义采集的视频。
   * false：（默认）不发布自定义采集到的视频。
   */
  publishCustomVideoTrack?: boolean;
  /*
   * 设置是否发布编码后的视频： true：发布编码后的视频。
   * false：（默认）不发布编码后的视频。
   */
  publishEncodedVideoTrack?: boolean;
  /*
   * 设置是否发布媒体播放器的音频： true：发布媒体播放器的音频。
   * false：（默认）不发布媒体播放器的音频。
   */
  publishMediaPlayerAudioTrack?: boolean;
  /*
   * 设置是否发布媒体播放器的视频： true：发布媒体播放器的视频。
   * false：（默认）不发布媒体播放器的视频。
   */
  publishMediaPlayerVideoTrack?: boolean;
  /*
   * 设置是否发布本地的转码视频： true：发布本地的转码视频。
   * false：（默认）不发布本地的转码视频。
   */
  publishTrancodedVideoTrack?: boolean;
  /*
   * 设置是否自动订阅所有音频流： true：（默认）自动订阅所有音频流。
   * false：不自动订阅任何音频流。
   */
  autoSubscribeAudio?: boolean;
  /*
   * 设置是否自动订阅所有视频流： true：（默认）自动订阅所有视频流。
   * false：不自动订阅任何视频流。
   */
  autoSubscribeVideo?: boolean;
  /*
   * TODO(doc)
   */
  startPreview?: boolean;
  /*
   * 设置是否开启音频录制或播放： true：（默认）开启音频录制和播放。
   * false
   * ：不开启音频录制或播放。
   */
  enableAudioRecordingOrPlayout?: boolean;
  /*
   * 待发布的媒体播放器的 ID。默认值为 0。
   */
  publishMediaPlayerId?: number;
  /*
   * 用户角色。详见 ClientRoleType
   */
  clientRoleType?: ClientRoleType;
  /*
   * TODO(doc)
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;
  /*
   * 默认订阅的视频流类型: VideoStreamType 。
   */
  defaultVideoStreamType?: VideoStreamType;
  /*
   * 频道使用场景。详见 ChannelProfileType 。
   */
  channelProfile?: ChannelProfileType;
  /*
   * 发送音频帧的时延（以毫秒为单位），用于控制 A/V 同步。
   * 如果要关闭时延，将此参数值设置为 0。
   */
  audioDelayMs?: number;
  /*
   * TODO(doc)
   */
  mediaPlayerAudioDelayMs?: number;
  /*
   * （可选）在服务端生成的用于鉴权的动态密钥。 该参数仅在调用 updateChannelMediaOptions 或 updateChannelMediaOptionsEx 时生效。 请确保用于生成 token 的 App ID、频道名和用户名和 initialize 方法初始化引擎时用的 App ID，以及 joinChannelWithOptions 或 joinChannelEx 方法加入频道时设置的频道名和用户名是一致的。
   */
  token?: string;
  /*
   * TODO(doc)
   */
  enableBuiltInMediaEncryption?: boolean;
  /*
   * TODO(doc)
   */
  publishRhythmPlayerTrack?: boolean;
  /*
   * TODO(doc)
   */
  audioOptionsExternal?: AudioOptionsExternal;
}

/*
 * TODO(doc)
 */
export enum LocalProxyMode {
  /*
   * TODO(doc)
   */
  kConnectivityFirst = 0,
  /*
   * TODO(doc)
   */
  kLocalOnly = 1,
}

/*
 * TODO(doc)
 */
export class LocalAccessPointConfiguration {
  /*
   * TODO(doc)
   */
  ipList?: string[];
  /*
   * TODO(doc)
   */
  ipListSize?: number;
  /*
   * TODO(doc)
   */
  domainList?: string[];
  /*
   * TODO(doc)
   */
  domainListSize?: number;
  /*
   * TODO(doc)
   */
  verifyDomainName?: string;
  /*
   * TODO(doc)
   */
  mode?: LocalProxyMode;
}

/*
 * 离开频道的选项。
 */
export class LeaveChannelOptions {
  /*
   * 离开频道时，是否停止播放音乐文件及混音： true：（默认）停止播放音乐文件及混音。
   * false： 不停止播放音乐文件及混音。
   */
  stopAudioMixing?: boolean;
  /*
   * 离开频道时，是否停止播放音效： true：（默认）停止播放音效。
   * false： 不停止播放音效。
   */
  stopAllEffect?: boolean;
  /*
   * 离开频道时，是否停止麦克风采集： true：（默认）停止麦克风采集。
   * false： 不停止麦克风采集。
   */
  stopMicrophoneRecording?: boolean;
}

/*
 * IRtcEngineEventHandler 接口类用于 SDK 向 app 发送事件通知，app 通过继承该接口类的方法获取 SDK 的事件通知。
 */
export abstract class IRtcEngineEventHandler {
  /*
   * 成功加入频道回调。
   * 该回调方法表示该客户端成功加入了指定的频道。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param elapsed 从本地调用 joinChannelWithOptions 开始到发生此事件过去的时间（毫秒）。
   */
  onJoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /*
   * 成功重新加入频道回调。
   * 有时候由于网络原因，客户端可能会和服务器失去连接，SDK 会进行自动重连，自动重连成功后触发此回调方法。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param elapsed 从本地开始重连到发生此事件过去的时间（毫秒）。
   */
  onRejoinChannelSuccess?(connection: RtcConnection, elapsed: number): void;

  /*
   * TODO(doc)
   */
  onWarning?(warn: WarnCodeType, msg: string): void;

  /*
   * TODO(doc)
   */
  onError?(err: ErrorCodeType, msg: string): void;

  /*
   * 远端声音质量回调。
   * 弃用：
   * 请改用 onRemoteAudioStats 。
   * 该回调描述远端用户在通话中的音频质量，针对每个远端用户/主播每 2 秒触发一次。如果远端同时存在多个用户/主播，该回调每 2 秒会被触发多次。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID，指定是谁发的音频流。
   *
   * @param quality 语音质量。
   *  QualityUnknown (0)：质量未知。
   *  QualityExcellent (1)：质量极好。
   *  QualityGood (2)：用户主观感觉和极好差不多，但码率可能略低于极好。
   *  QualityPoor (3)：用户主观感受有瑕疵但不影响沟通。
   *  QualityBad (4)：勉强能沟通但不顺畅。
   *  QualityVbad (5)：网络质量非常差，基本不能沟通。
   *  QualityDown (6)：网络连接断开，完全无法沟通。
   *  详见 QualityType 。
   *
   * @param delay 音频包从发送端到接收端的延迟（毫秒），包括声音采样前处理、网络传输、网络抖动缓冲引起的延迟。
   *
   * @param lost 音频包从发送端到接收端的丢包率 (%)。
   */
  onAudioQuality?(
    connection: RtcConnection,
    remoteUid: number,
    quality: QualityType,
    delay: number,
    lost: number
  ): void;

  /*
   *  通话前网络上下行 Last mile 质量探测报告回调。
   * 在调用 startLastmileProbeTest 之后，SDK 会在约 30 秒内返回该回调。
   *
   * @param result  上下行 Last mile 质量探测结果。 详见: LastmileProbeResult 。
   */
  onLastmileProbeResult?(result: LastmileProbeResult): void;

  /*
   * 用户音量提示回调。
   * 该回调默认禁用，你可以通过 enableAudioVolumeIndication 开启。 开启后，只要频道内有发流用户，SDK 会在加入频道后按 enableAudioVolumeIndication 中设置的时间间隔触发 onAudioVolumeIndication 回调。每次会触发两个 onAudioVolumeIndication 回调，一个报告本地发流用户的音量相关信息，另一个报告瞬时音量最高的远端用户（最多 3 位）的音量相关信息。 启用该功能后，如果有用户将自己静音（调用了 muteLocalAudioStream ），SDK 行为会受如下影响： 本地用户静音后，SDK 立即停止报告本地用户的音量提示回调。
   * 瞬时音量最高的远端用户静音后 20 秒，远端的音量提示回调中将不再包含该用户；如果远端所有用户都将自己静音，20 秒后 SDK 停止报告远端用户的音量提示回调。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param speakers 用户音量信息，详见 AudioVolumeInfo 数组。如果 speakers 为空，则表示远端用户不发流或没有远端用户。
   *
   * @param speakerNumber 用户数量。
   *  在本地用户的回调中，只要本地用户在发流，speakerNumber 始终为 1。
   *  在远端用户的回调中，speakerNumber 取值范围为 [0,3]。如果远端发流用户数量大于 3，则此回调中 speakerNumber 值为 3。
   *
   * @param totalVolume 混音后的总音量，取值范围为 [0,255]。 在本地用户的回调中，totalVolume 为本地发流用户的音量。
   *  在远端用户的回调中，totalVolume 为瞬时音量最高的远端用户（最多 3 位）混音后的总音量。
   */
  onAudioVolumeIndication?(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): void;

  /*
   * 离开频道回调。
   * App 调用 leaveChannel 方法时，SDK 提示 app 离开频道成功。在该回调方法中，app 可以得到此次通话的总通话时长、SDK 收发数据的流量等信息。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param stats 通话的统计数据: RtcStats 。
   */
  onLeaveChannel?(connection: RtcConnection, stats: RtcStats): void;

  /*
   *  当前通话统计信息回调。
   * SDK 定期向 App 报告当前通话的统计信息，每两秒触发一次。
   *
   * @param connection  Connection 信息。详见 RtcConnection 。
   *
   * @param stats RTC 引擎统计数据，详见
   *  RtcStats
   *  。
   */
  onRtcStats?(connection: RtcConnection, stats: RtcStats): void;

  /*
   * TODO(doc)
   */
  onAudioDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: number
  ): void;

  /*
   * 本地音乐文件播放已结束回调。
   * 弃用：
   * 请改用 onAudioMixingStateChanged 。 当调用 startAudioMixing 播放本地音乐文件结束后，会触发该回调。如果调用 startAudioMixing 失败，会返回错误码 WARN_AUDIO_MIXING_OPEN_ERROR。
   */
  onAudioMixingFinished?(): void;

  /*
   * 本地音效文件播放已结束回调。
   * 当播放音效结束后，会触发该回调。
   *
   * @param soundId 指定音效的 ID。每个音效均有唯一的 ID。
   */
  onAudioEffectFinished?(soundId: number): void;

  /*
   * TODO(doc)
   */
  onVideoDeviceStateChanged?(
    deviceId: string,
    deviceType: MediaDeviceType,
    deviceState: number
  ): void;

  /*
   * TODO(doc)
   */
  onMediaDeviceChanged?(deviceType: MediaDeviceType): void;

  /*
   * 通话中每个用户的网络上下行 last mile 质量报告回调。
   * 该回调描述每个用户在通话中的 last mile 网络状态，其中 last mile 是指设备到 Agora 边缘服务器的网络状态。
   * 该回调每 2 秒触发一次。如果远端有多个用户，该回调每 2 秒会被触发多次。
   * 用户不发流时，txQuality 为 Unknown；用户不收流时，rxQuality 为 Unknown。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID。表示该回调报告的是持有该 ID 的用户的网络质量。
   *
   * @param txQuality 该用户的上行网络质量，基于发送码率、上行丢包率、平均往返时延和网络抖动计算。 该值代表当前的上行网络质量，帮助判断是否可以支持当前设置的视频编码属性。 假设上行码率是 1000 Kbps，那么支持直播场景下 640 × 480 的分辨率、15 fps 的帧率没有问题，但是支持 1280 × 720 的分辨率就会有困难。
   *  QualityUnknown (0)：质量未知。
   *  QualityExcellent (1)：质量极好。
   *  QualityGood (2)：用户主观感觉和极好差不多，但码率可能略低于极好。
   *  QualityPoor (3)：用户主观感受有瑕疵但不影响沟通。
   *  QualityBad (4)：勉强能沟通但不顺畅。
   *  QualityVbad (5)：网络质量非常差，基本不能沟通。
   *  QualityDown (6)：网络连接断开，完全无法沟通。
   *
   * @param rxQuality 该用户的下行网络质量，基于下行网络的丢包率、平均往返延时和网络抖动计算。
   *  QualityUnknown (0)：质量未知。
   *  QualityExcellent (1)：质量极好。
   *  QualityGood (2)：用户主观感觉和极好差不多，但码率可能略低于极好。
   *  QualityPoor (3)：用户主观感受有瑕疵但不影响沟通。
   *  QualityBad (4)：勉强能沟通但不顺畅。
   *  QualityVbad (5)：网络质量非常差，基本不能沟通。
   *  QualityDown (6)：网络连接断开，完全无法沟通。
   */
  onNetworkQuality?(
    connection: RtcConnection,
    remoteUid: number,
    txQuality: QualityType,
    rxQuality: QualityType
  ): void;

  /*
   * TODO(doc)
   */
  onIntraRequestReceived?(connection: RtcConnection): void;

  /*
   * 上行网络信息变化回调。
   * 只有当上行网络信息发生变化时，SDK 才会触发该回调。
   * 该回调仅适用于向 SDK 推送 H.264 格式的外部编码视频数据的场景。
   *
   * @param info 上行网络信息，详见 UplinkNetworkInfo 。
   */
  onUplinkNetworkInfoUpdated?(info: UplinkNetworkInfo): void;

  /*
   * TODO(doc)
   */
  onDownlinkNetworkInfoUpdated?(info: DownlinkNetworkInfo): void;

  /*
   * 网络上下行 last mile 质量报告回调。
   * 该回调描述本地用户在加入频道前的 last mile 网络探测的结果，其中 last mile 是指设备到 Agora 边缘服务器的网络状态。
   * 加入频道前，调用 startLastmileProbeTest 之后，SDK 触发该回调报告本地用户在加入频道前的 last mile 网络探测的结果。
   *
   * @param quality Last mile 网络质量。
   *  QualityUnknown (0)：质量未知。
   *  QualityExcellent (1)：质量极好。
   *  QualityGood (2)：用户主观感觉和极好差不多，但码率可能略低于极好。
   *  QualityPoor (3)：用户主观感受有瑕疵但不影响沟通。
   *  QualityBad (4)：勉强能沟通但不顺畅。
   *  QualityVbad (5)：网络质量非常差，基本不能沟通。
   *  QualityDown (6)：网络连接断开，完全无法沟通。
   *  详见 QualityType 。
   */
  onLastmileQuality?(quality: QualityType): void;

  /*
   *  已显示本地视频首帧回调。
   * 本地视频首帧显示在本地视图上时，SDK 会触发此回调。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param width 本地渲染视频的宽 (px) 。
   *
   * @param height 本地渲染视频的高 (px)。
   *
   * @param elapsed  从调用 joinChannelWithOptions 到发生此事件过去的时间（毫秒）。如果在 joinChannelWithOptions 前调用了 startPreview ，则是从 startPreview到发生此事件过去的时间。
   */
  onFirstLocalVideoFrame?(
    connection: RtcConnection,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /*
   * 已发布本地视频首帧回调。
   * SDK 会在以下三种时机触发该回调： 开启本地视频的情况下，调用 joinChannelWithOptions 成功加入频道后。
   * 调用 muteLocalVideoStream (true)，再调用 muteLocalVideoStream(false) 后。
   * 调用 disableVideo ，再调用 enableVideo 后。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param elapsed 从调用 joinChannelWithOptions 方法到触发该回调的时间间隔（毫秒）。
   */
  onFirstLocalVideoFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /*
   * TODO(doc)
   */
  onVideoSourceFrameSizeChanged?(
    connection: RtcConnection,
    sourceType: VideoSourceType,
    width: number,
    height: number
  ): void;

  /*
   * 已接收到远端视频并完成解码回调。
   * SDK 会在以下时机触发该回调： 远端用户首次上线后发送视频。
   * 远端用户视频离线再上线后发送视频。出现这种中断的可能原因包括： 远端用户离开频道。
   * 远端用户掉线。
   * 远端用户调用 muteLocalVideoStream 方法停止发送本地视频流。
   * 远端用户调用 disableVideo 方法关闭视频模块。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID，指定是哪个用户的视频流。
   *
   * @param width 视频流宽（px）。
   *
   * @param height 视频流高（px）。
   *
   * @param elapsed 从本地调用 joinChannelWithOptions 开始到该回调触发的延迟（毫秒)。
   */
  onFirstRemoteVideoDecoded?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /*
   *  本地或远端视频大小和旋转信息发生改变回调。
   *
   * @param connection  Connection 信息。详见 RtcConnection 。
   *
   * @param uid 图像尺寸和旋转信息发生变化的用户的用户 ID（本地用户的 uid 为 0）。
   *
   * @param width 视频流的宽度（像素）。
   *
   * @param height 视频流的高度（像素）。
   *
   * @param rotation 旋转信息，取值范围 [0,360)。
   */
  onVideoSizeChanged?(
    connection: RtcConnection,
    uid: number,
    width: number,
    height: number,
    rotation: number
  ): void;

  /*
   *  本地视频状态发生改变回调。
   * 本地视频的状态发生改变时，SDK 会触发该回调返回当前的本地视频状态。你可以通过该回调了解当前视频的状态以及出现故障的原因，方便排查问题。
   * SDK 会在如下情况触发 onLocalVideoStateChanged 回调，状态为 LocalVideoStreamStateFailed，错误码为 LocalVideoStreamErrorCaptureFailure：
   * 应用退到后台，系统回收摄像头。
   * 摄像头正常启动，但连续 4 秒都没有输出采集的视频。 摄像头输出采集的视频帧时，如果连续 15 帧中，所有视频帧都一样，SDK 触发 onLocalVideoStateChanged 回调，状态为 LocalVideoStreamStateCapturing，错误码为 LocalVideoStreamErrorCaptureFailure。注意，帧重复检测仅针对分辨率大于 200 × 200、帧率大于等于 10 fps、码率小于 20 Kbps 的视频帧。 对某些机型而言，当本地视频采集设备正在使用中时，SDK 不会在本地视频状态发生改变时触发该回调，你需要自行做超时判断。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param state 本地视频状态，详见 LocalVideoStreamState 。
   *
   * @param errorCode 本地视频出错原因，详见 LocalVideoStreamError 。
   */
  onLocalVideoStateChanged?(
    connection: RtcConnection,
    state: LocalVideoStreamState,
    errorCode: LocalVideoStreamError
  ): void;

  /*
   *  远端视频状态发生改变回调。
   * 频道内的用户（通信场景）或主播（直播场景）人数超过 17 人时，该回调可能不准确。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param   发生视频状态改变的远端用户 ID。
   *
   * @param state 远端视频流状态，详见 RemoteVideoState 。
   *
   * @param reason 远端视频流状态改变的具体原因，详见 RemoteVideoStateReason 。
   *
   * @param elapsed 从本地用户调用 joinChannelWithOptions 方法到发生本事件经历的时间，单位为毫秒。
   */
  onRemoteVideoStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ): void;

  /*
   * 渲染器已接收首帧远端视频回调。
   *
   * @param remoteUid 用户 ID，指定是哪个用户的视频流。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param width 视频流宽（px）。
   *
   * @param height 视频流高（px）。
   *
   * @param elapsed  从本地调用 joinChannelWithOptions 到发生此事件过去的时间（毫秒)。
   */
  onFirstRemoteVideoFrame?(
    connection: RtcConnection,
    remoteUid: number,
    width: number,
    height: number,
    elapsed: number
  ): void;

  /*
   *  远端用户（通信场景）/主播（直播场景）加入当前频道回调。
   * 通信场景下，该回调提示有远端用户加入了频道。如果加入之前，已经有其他用户在频道中了，新加入的用户也会收到这些已有用户加入频道的回调。
   * 直播场景下，该回调提示有主播加入了频道。如果加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入频道的回调。Agora 建议连麦主播不超过 17 人。 该回调在如下情况下会被触发： 远端用户/主播调用 joinChannelWithOptions 方法加入频道。
   * 远端用户加入频道后将用户角色改变为主播。
   * 远端用户/主播网络中断后重新加入频道。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 新加入频道的远端用户/主播 ID。
   *
   * @param elapsed 从本地用户调用 joinChannelWithOptions 到该回调触发的延迟（毫秒)。
   */
  onUserJoined?(
    connection: RtcConnection,
    remoteUid: number,
    elapsed: number
  ): void;

  /*
   *  远端用户（通信场景）/主播（直播场景）离开当前频道回调。
   * 用户离开频道有两个原因： 正常离开：远端用户/主播会发送类似“再见”的消息。接收此消息后，判断用户离开频道。
   * 超时掉线：在一定时间内（通信场景为 20 秒，直播场景稍有延时），用户没有收到对方的任何数据包，则判定为对方掉线。在网络较差的情况下，有可能会误报。我们建议使用 Agora 云信令 SDK 来做可靠的掉线检测。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 离线用户或主播的用户 ID。
   *
   * @param reason 离线原因: UserOfflineReasonType 。
   */
  onUserOffline?(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ): void;

  /*
   *  远端用户（通信场景）/主播（直播场景）停止或恢复发送音频流回调。
   * 该回调是由远端用户调用 muteLocalAudioStream 方法关闭或开启音频发送触发的。
   * 频道内的用户（通信场景）或主播（直播场景）人数超过 17 人时，该回调可能不准确。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID。
   *
   * @param muted 该用户是否静音： true: 该用户已将音频静音。
   *  false: 该用户取消了音频静音。
   */
  onUserMuteAudio?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /*
   * 远端用户取消或恢复发布视频流回调。
   * 当远端用户调用 muteLocalVideoStream 取消或恢复发布视频流时，SDK 会触发该回调向本地用户报告远端用户的发流状况。
   * 当频道内的用户（通信场景）或主播（直播场景）的人数超过 17 时，该回调可能不准确。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 远端用户 ID。
   *
   * @param muted 远端用户是否取消发布视频流： true: 取消发布视频流。
   *  false: 发布视频流。
   */
  onUserMuteVideo?(
    connection: RtcConnection,
    remoteUid: number,
    muted: boolean
  ): void;

  /*
   *  远端用户开/关视频模块回调。
   * 关闭视频功能是指该用户只能进行语音通话，不能显示、发送自己的视频，也不能接收、显示别人的视频。
   * 该回调是由远端用户调用 enableVideo 或 disableVideo 方法开启或关闭视频模块触发的。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID，提示是哪个用户的视频流。
   *
   * @param enabled true: 该用户已启用视频功能。
   *  false: 该用户已关闭视频功能。
   */
  onUserEnableVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /*
   * TODO(doc)
   */
  onUserStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: number
  ): void;

  /*
   *  远端用户开/关本地视频采集回调。
   * 该回调是由远端用户调用 enableLocalVideo 方法开启或关闭视频采集触发的。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID，提示是哪个用户的视频流。
   *
   * @param enabled 远端用户是否启用视频采集： true: 该用户已启用视频功能。启用后，其他用户可以接收到该用户的视频流。
   *  false: 该用户已关闭视频功能。关闭后，该用户仍然可以接收其他用户的视频流，但其他用户接收不到该用户的视频流。
   */
  onUserEnableLocalVideo?(
    connection: RtcConnection,
    remoteUid: number,
    enabled: boolean
  ): void;

  /*
   * API 方法已执行回调。
   *
   * @param err 当方法调用失败时 SDK 返回的错误码。如果该方法调用成功，SDK 会返回 0。
   *
   * @param api SDK 执行的 API 方法。
   *
   * @param result SDK 调用 API 的结果。
   */
  onApiCallExecuted?(err: ErrorCodeType, api: string, result: string): void;

  /*
   * 通话中本地音频流的统计信息回调。
   * SDK 每 2 秒触发该回调一次。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param stats 本地音频统计数据。详见 LocalAudioStats 。
   */
  onLocalAudioStats?(connection: RtcConnection, stats: LocalAudioStats): void;

  /*
   * 通话中远端音频流的统计信息回调。
   * 该回调针对每个发送音频流的远端用户/主播每 2 秒触发一次。如果远端有多个用户/主播发送音频流，该回调每 2 秒会被触发多次。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param stats 接收到的远端音频统计数据，详见 RemoteAudioStats 。
   */
  onRemoteAudioStats?(connection: RtcConnection, stats: RemoteAudioStats): void;

  /*
   * 本地视频流统计信息回调。
   * 该回调描述本地设备发送视频流的统计信息，每 2 秒触发一次。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param stats 本地视频流统计信息。详见 LocalVideoStats 。
   */
  onLocalVideoStats?(connection: RtcConnection, stats: LocalVideoStats): void;

  /*
   *  通话中远端视频流的统计信息回调。
   * 该回调描述远端用户在通话中端到端的视频流统计信息， 针对每个远端用户/主播每 2 秒触发一次。如果远端同时存在多个用户/主播， 该回调每 2 秒会被触发多次。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param stats 远端视频统计数据。详见 RemoteVideoStats 。
   */
  onRemoteVideoStats?(connection: RtcConnection, stats: RemoteVideoStats): void;

  /*
   * 摄像头就绪回调。
   * 弃用: 请改用 onLocalVideoStateChanged 中的 LocalVideoStreamStateCapturing(1)。
   * 该回调提示已成功打开摄像头，可以开始捕获视频。
   */
  onCameraReady?(): void;

  /*
   * 相机对焦区域已改变回调。
   * 该回调是由本地用户调用 setCameraFocusPositionInPreview 方法改变对焦位置触发的。
   *
   * @param x 发生改变的对焦区域的 x 坐标。
   *
   * @param y 发生改变的对焦区域的 y 坐标。
   *
   * @param width 发生改变的对焦区域的宽度。
   *
   * @param height 发生改变的对焦区域的高度。
   */
  onCameraFocusAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /*
   * 摄像头曝光区域已改变回调。
   * 该回调是由本地用户调用 setCameraExposurePosition 方法改变曝光位置触发的。
   *
   * @param x 发生改变的曝光区域的 x 坐标。
   *
   * @param y 发生改变的曝光区域的 y 坐标。
   *
   * @param width 发生改变的曝光区域的宽度。
   *
   * @param height 发生改变的曝光区域的高度。
   */
  onCameraExposureAreaChanged?(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /*
   * 报告本地人脸检测结果。
   * 调用 enableFaceDetection (true) 开启本地人脸检测后，你可以通过该回调实时获取以下人脸检测的信息：
   * 摄像头采集的画面大小
   * 人脸在 view 中的位置
   * 人脸距设备屏幕的距离 其中，人脸距设备屏幕的距离由 SDK 通过摄像头采集的画面大小和人脸在 view 中的位置拟合计算得出。 当检测到摄像头前的人脸消失时，该回调会立刻触发；在无人脸的状态下，该回调触发频率会降低，以节省设备耗能。
   * 当人脸距离设备屏幕过近时，SDK 不会触发该回调。
   *
   * @param imageWidth 摄像头采集画面的宽度 (px)。
   *
   * @param imageHeight 摄像头采集画面的高度 (px)。
   *
   * @param vecRectangle
   *
   * @param vecDistance 人脸距设备屏幕的距离 (cm)。
   *
   * @param numFaces 检测的人脸数量。如果为 0，则表示没有检测到人脸。
   */
  onFacePositionChanged?(
    imageWidth: number,
    imageHeight: number,
    vecRectangle: Rectangle,
    vecDistance: number,
    numFaces: number
  ): void;

  /*
   * 视频功能已停止回调。
   * 弃用：
   * 请改用 onLocalVideoStateChanged 回调中的 LocalVideoStreamStateStopped(0)。 App 如需在停止视频后对 view 做其他处理（比如显示其他画面），可以在这个回调中进行。
   */
  onVideoStopped?(): void;

  /*
   * 音乐文件的播放状态已改变回调。
   * 该回调在音乐文件播放状态发生改变时触发，并报告当前的播放状态和错误码。
   *
   * @param state 音乐文件播放状态。详见 AudioMixingStateType 。
   *
   * @param errorCode 错误码。详见 AudioMixingErrorType 。
   */
  onAudioMixingStateChanged?(
    state: AudioMixingStateType,
    errorCode: AudioMixingErrorType
  ): void;

  /*
   * TODO(doc)
   */
  onRhythmPlayerStateChanged?(
    state: RhythmPlayerStateType,
    errorCode: RhythmPlayerErrorType
  ): void;

  /*
   * 网络连接中断，且 SDK 无法在 10 秒内连接服务器回调。
   * SDK 在调用 joinChannelWithOptions 后，无论是否加入成功，只要 10 秒和服务器无法连接就会触发该回调。如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，SDK 会停止尝试重连。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   */
  onConnectionLost?(connection: RtcConnection): void;

  /*
   * 网络连接中断回调。
   * 弃用:
   * 请改用 onConnectionStateChanged 回调。 SDK 在和服务器建立连接后，失去了网络连接超过 4 秒，会触发该回调。在触发事件后，SDK 会主动重连服务器，所以该事件可以用于 UI 提示。该回调与 onConnectionLost 的区别是： onConnectionInterrupted 回调一定是发生在成功加入频道后，且 SDK 刚失去和服务器连接超过 4 秒时触发。
   * onConnectionLost 回调是无论是否成功加入频道，只要 10 秒内和服务器无法建立连接都会触发。
   * 如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，SDK 会停止尝试重连。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   */
  onConnectionInterrupted?(connection: RtcConnection): void;

  /*
   * 网络连接已被服务器禁止回调。
   * 弃用:
   * 请改用 onConnectionStateChanged 。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   */
  onConnectionBanned?(connection: RtcConnection): void;

  /*
   *  接收到对方数据流消息的回调。
   * 该回调表示本地用户收到了远端用户调用 sendStreamMessage 方法发送的流消息。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 发送消息的用户 ID。
   *
   * @param streamId 接收到的消息的 Stream ID。
   *
   * @param data 接收到的数据。
   *
   * @param length 数据长度，单位为字节。
   *
   * @param sentTs 数据流发出的时间。
   */
  onStreamMessage?(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    data: Uint8Array,
    length: number,
    sentTs: number
  ): void;

  /*
   *  接收对方数据流消息发生错误的回调。
   * 该回调表示本地用户未收到远端用户调用 sendStreamMessage 方法发送的流消息。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 发送消息的用户 ID。
   *
   * @param streamId 接收到的消息的 Stream ID。
   *
   * @param code 发生错误的错误码。
   *
   * @param missed 丢失的消息数量。
   *
   * @param cached 数据流中断时，后面缓存的消息数量。
   */
  onStreamMessageError?(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    code: ErrorCodeType,
    missed: number,
    cached: number
  ): void;

  /*
   *  Token 已过期回调。
   * 在通话过程中如果 Token 已失效，SDK 会触发该回调，提醒 app 更新 Token。 当收到该回调时，你需要重新在服务端生成新的 Token，然后调用 joinChannelWithOptions 重新加入频道。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   */
  onRequestToken?(connection: RtcConnection): void;

  /*
   *  Token 服务将在30s内过期回调。
   * 在通话过程中如果 Token 即将失效，SDK 会提前 30 秒触发该回调，提醒 app 更新 Token。 当收到该回调时，你需要重新在服务端生成新的 Token，然后调用 renewToken 将新生成的 Token 传给 SDK。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param token 即将服务失效的 Token。
   */
  onTokenPrivilegeWillExpire?(connection: RtcConnection, token: string): void;

  /*
   *  已发布本地音频首帧回调。
   * SDK 会在以下时机触发该回调： 开启本地音频的情况下，调用 joinChannelWithOptions 成功加入频道后。
   * 调用 muteLocalAudioStream (true)，再调用 muteLocalAudioStream(false) 后。
   * 调用 disableAudio ，再调用 enableAudio 后。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param elapsed  从调用 joinChannelWithOptions 方法到触发该回调的时间间隔（毫秒）。
   */
  onFirstLocalAudioFramePublished?(
    connection: RtcConnection,
    elapsed: number
  ): void;

  /*
   * 已接收远端音频首帧回调。
   * 弃用：
   * 请改用 onRemoteAudioStateChanged 。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param userId 发送音频帧的远端用户的用户 ID。
   *
   * @param elapsed 从本地用户调用 joinChannelWithOptions 直至该回调触发的延迟，单位为毫秒。
   */
  onFirstRemoteAudioFrame?(
    connection: RtcConnection,
    userId: number,
    elapsed: number
  ): void;

  /*
   * 已解码远端音频首帧的回调。
   * 弃用：
   * 请改用 onRemoteAudioStateChanged 。 SDK 会在以下时机触发该回调：
   * 远端用户首次上线后发送音频。
   * 远端用户音频离线再上线发送音频。音频离线指本地在 15 秒内没有收到音频包，可能有如下原因：
   * 远端用户离开频道
   * 远端用户掉线
   * 远端用户调用 muteLocalAudioStream 方法停止发送音频流
   * 远端用户调用 disableAudio 方法关闭音频
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param uid 远端用户 ID。
   *
   * @param elapsed 从本地用户调用 joinChannelWithOptions 直至该回调触发的延迟，单位为毫秒。
   */
  onFirstRemoteAudioDecoded?(
    connection: RtcConnection,
    uid: number,
    elapsed: number
  ): void;

  /*
   *  本地音频状态发生改变回调。
   * 本地音频的状态发生改变时（包括本地麦克风采集状态和音频编码状态）， SDK 会触发该回调报告当前的本地音频状态。在本地音频出现故障时，该回调可以帮助你了解当前音频的状态以及出现故障的原因，方便你排查问题。 当状态为 LocalAudioStreamStateFailed (3) 时， 你可以在 error 参数中查看返回的错误信息。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param state 当前的本地音频状态。详见 LocalAudioStreamState 。
   *
   * @param error 本地音频出错原因。详见 LocalAudioStreamError 。
   */
  onLocalAudioStateChanged?(
    connection: RtcConnection,
    state: LocalAudioStreamState,
    error: LocalAudioStreamError
  ): void;

  /*
   *  远端音频流状态发生改变回调。
   * 远端用户（通信场景）或主播（直播场景）的音频状态发生改变时，SDK 会触发该回调向本地用户报告当前的远端音频流状态。
   * 频道内的用户（通信场景）或主播（直播场景）人数超过 17 人时，该回调可能不准确。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 发生音频状态改变的远端用户 ID。
   *
   * @param state  远端音频流状态，详见 RemoteAudioState 。
   *
   * @param reason  远端音频流状态改变的具体原因，详见 RemoteAudioStateReason 。
   *
   * @param elapsed  从本地用户调用 joinChannelWithOptions 方法到发生本事件经历的时间，单位为毫秒。
   */
  onRemoteAudioStateChanged?(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteAudioState,
    reason: RemoteAudioStateReason,
    elapsed: number
  ): void;

  /*
   * 监测到远端最活跃用户回调。
   * 成功调用 enableAudioVolumeIndication 后，SDK 会持续监测音量最大的远端用户，并统计该用户被判断为音量最大者的次数。当前时间段内，该次数累积最多的远端用户为最活跃的用户。
   * 当频道内用户数量大于或等于 2 且有远端活跃用户时，SDK 会触发该回调并报告远端最活跃用户的 uid。 如果远端最活跃用户一直是同一位用户，则 SDK 不会再次触发 onActiveSpeaker 回调。
   * 如果远端最活跃用户有变化，则 SDK 会再次触发该回调并报告新的远端最活跃用户的 uid。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param uid 远端最活跃用户的 ID。
   */
  onActiveSpeaker?(connection: RtcConnection, uid: number): void;

  /*
   * 鉴黄审核结果回调。
   * 设置 ContentInspectConfig 中的 type 设为 ContentInspectModule 并调用 enableContentInspect 开启鉴黄后，SDK 会触发 onContentInspectResult 回调，报告鉴黄结果。
   *
   * @param result 鉴黄结果。详见 ContentInspectResult 。
   */
  onContentInspectResult?(result: ContentInspectResult): void;

  /*
   * 视频截图结果回调。
   * 成功调用 takeSnapshot 后，SDK 触发该回调报告截图是否成功和获取截图的详情。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param filePath 截图的本地保存路径。
   *
   * @param width 图片宽度（px）。
   *
   * @param height 图片高度（px）。
   *
   * @param errCode 截图成功的提示或失败的原因。
   *  0：截图成功。
   *  < 0: 截图失败。
   *  -1：写入文件失败或 JPEG 编码失败。
   *  -2：takeSnapshot 方法调用成功后 1 秒内没有发现指定用户的视频流。
   */
  onSnapshotTaken?(
    connection: RtcConnection,
    filePath: string,
    width: number,
    height: number,
    errCode: number
  ): void;

  /*
   * 直播场景下用户角色已切换回调。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param oldRole 切换前的角色： ClientRoleType 。
   *
   * @param newRole 切换后的角色： ClientRoleType 。
   */
  onClientRoleChanged?(
    connection: RtcConnection,
    oldRole: ClientRoleType,
    newRole: ClientRoleType
  ): void;

  /*
   * TODO(doc)
   */
  onClientRoleChangeFailed?(
    connection: RtcConnection,
    reason: ClientRoleChangeFailedReason,
    currentRole: ClientRoleType
  ): void;

  /*
   * TODO(doc)
   */
  onAudioDeviceVolumeChanged?(
    deviceType: MediaDeviceType,
    volume: number,
    muted: boolean
  ): void;

  /*
   *  旁路推流状态发生改变回调。
   * 旁路推流状态发生改变时，SDK会触发该回调，并在回调中明确状态发生改变的 URL 地址及当前推流状态。该回调方便推流用户了解当前的推流状态；推流出错时，你可以通过返回的错误码了解出错的原因，方便排查问题。
   *
   * @param url 推流状态发生改变的 URL 地址。
   *
   * @param state 当前的推流状态，详见 RtmpStreamPublishState 。
   *
   * @param errCode 推流错误信息，详见 RtmpStreamPublishErrorType 。
   */
  onRtmpStreamingStateChanged?(
    url: string,
    state: RtmpStreamPublishState,
    errCode: RtmpStreamPublishErrorType
  ): void;

  /*
   *  旁路推流事件回调。
   *
   * @param url 旁路推流 URL。
   *
   * @param eventCode 旁路推流事件码。详见 RtmpStreamingEvent 。
   */
  onRtmpStreamingEvent?(url: string, eventCode: RtmpStreamingEvent): void;

  /*
   * 旁路推流已开启回调。
   * 弃用：
   * 请改用 onRtmpStreamingStateChanged 。 该回调用于通知主播推流状态。
   *
   * @param url 主播推流的 URL 地址。
   *
   * @param error 推流错误码。 ERR_OK (0): 推流成功。
   *  ERR_FAILED (1): 推流失败。
   *  ERR_INVALID_ARGUMENT (2): 参数错误。如果你在调用 addPublishStreamUrl 前没有调用 setLiveTranscoding 配置 LiveTranscoding ，SDK 会回调 ERR_INVALID_ARGUMENT。
   *  ERR_TIMEDOUT (10): 推流超时未成功。
   *  ERR_ALREADY_IN_USE (19): 推流地址已推流。
   *  ERR_ENCRYPTED_STREAM_NOT_ALLOWED_PUBLISH (130): 推流已加密不能推流。
   *  ERR_PUBLISH_STREAM_CDN_ERROR (151): CDN 相关错误。请调用 removePublishStreamUrl 方法删除原来的推流地址，然后调用 addPublishStreamUrl 方法重新推流到新地址。
   *  ERR_PUBLISH_STREAM_NUM_REACH_LIMIT (152): 单个主播的推流地址数目达到上限 10。请删掉一些不用的推流地址再增加推流地址。
   *  ERR_PUBLISH_STREAM_NOT_AUTHORIZED (153): 操作不属于主播自己的流，如更新其他主播的流参数、停止其他主播的流。请检查应用业务逻辑。
   *  ERR_PUBLISH_STREAM_INTERNAL_SERVER_ERROR (154): 推流服务器出现错误。请调用 removePublishStreamUrl 重新推流。
   *  ERR_PUBLISH_STREAM_FORMAT_NOT_SUPPORTED (156): 推流地址格式有错误。请检查推流地址格式是否正确。
   */
  onStreamPublished?(url: string, error: ErrorCodeType): void;

  /*
   * 旁路推流已停止回调。
   * 弃用：
   * 请改用 onRtmpStreamingStateChanged 。
   *
   * @param url 被删除的旁路推流地址。
   */
  onStreamUnpublished?(url: string): void;

  /*
   * 旁路推流转码设置已被更新回调。
   * setLiveTranscoding 方法中的直播参数 LiveTranscoding 更新时，onTranscodingUpdated 回调会被触发并向主播报告更新信息。
   * 首次调用 setLiveTranscoding 方法设置转码参数 LiveTranscoding 时，不会触发此回调。
   */
  onTranscodingUpdated?(): void;

  /*
   * TODO(doc)
   */
  onAudioRoutingChanged?(routing: number): void;

  /*
   * 跨频道媒体流转发状态发生改变回调。
   * 当跨频道媒体流转发状态发生改变时，SDK 会触发该回调，并报告当前的转发状态以及相关的错误信息。
   *
   * @param state 跨频道媒体流转发状态。详见 ChannelMediaRelayState 。
   *
   * @param code 跨频道媒体流转发出错的错误码。详见 ChannelMediaRelayError 。
   */
  onChannelMediaRelayStateChanged?(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ): void;

  /*
   * 跨频道媒体流转发事件回调。
   *
   * @param code 跨频道媒体流转发事件码。详见 ChannelMediaRelayEvent 。
   */
  onChannelMediaRelayEvent?(code: ChannelMediaRelayEvent): void;

  /*
   * TODO(doc)
   */
  onLocalPublishFallbackToAudioOnly?(isFallbackOrRecover: boolean): void;

  /*
   *  远端订阅流已回退为音频流回调。
   * 如果你调用了
   * setRemoteSubscribeFallbackOption
   * 并将
   * option
   * 设置为
   * StreamFallbackOptionAudioOnly
   * ，当下行网络环境不理想、仅接收远端音频流时，或当下行网络改善、恢复订阅音视频流时，会触发该回调。 远端订阅流因弱网环境不能同时满足音视频而回退为小流时，你可以使用
   * onRemoteVideoStats
   * 来监控远端视频大小流的切换。
   *
   * @param uid 远端用户的用户 ID。
   *
   * @param isFallbackOrRecover true: 由于网络环境不理想，远端订阅流已回退为音频流；
   *  false: 由于网络环境改善，订阅的音频流已恢复为音视频流。
   */
  onRemoteSubscribeFallbackToAudioOnly?(
    uid: number,
    isFallbackOrRecover: boolean
  ): void;

  /*
   * 通话中远端音频流传输的统计信息回调。
   * 弃用：
   * 请改用 onRemoteAudioStats 。
   * 该回调描述远端用户通话中端到端的网络统计信息，通过音频包计算，用客观的数据，如丢包、 网络延迟等，展示当前网络状态。通话中，当用户收到远端用户/主播发送的音频数据包后 ，会每 2 秒触发一次该回调。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID，指定是哪个用户/主播的音频包。
   *
   * @param delay 音频包从发送端到接收端的延时（毫秒）。
   *
   * @param lost 音频包从发送端到接收端的丢包率 (%)。
   *
   * @param rxKBitrate 远端音频包的接收码率（Kbps）。
   */
  onRemoteAudioTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /*
   *  通话中远端视频流传输的统计信息回调。
   * 弃用：
   * 该回调已被废弃，请改用 onRemoteVideoStats 。 该回调描述远端用户通话中端到端的网络统计信息，通过视频包计算，用客观的数据，如丢包、 网络延迟等，展示当前网络状态。
   * 通话中，当用户收到远端用户/主播发送的视频数据包后，会每 2 秒触发一次该回调。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param remoteUid 用户 ID，指定是哪个用户/主播的视频包。
   *
   * @param delay 视频包从发送端到接收端的延时（毫秒）。
   *
   * @param lost 视频包从发送端到接收端的丢包率 (%)。
   *
   * @param rxKBitRate 远端视频包的接收码率（Kbps）。
   */
  onRemoteVideoTransportStats?(
    connection: RtcConnection,
    remoteUid: number,
    delay: number,
    lost: number,
    rxKBitRate: number
  ): void;

  /*
   * 网络连接状态已改变回调。
   * 该回调在网络连接状态发生改变的时候触发，并告知用户当前的网络连接状态和引起网络状态改变的原因。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param state 当前网络连接状态。详见 ConnectionStateType 。
   *
   * @param reason 引起当前网络连接状态改变的原因。详见 ConnectionChangedReasonType 。
   */
  onConnectionStateChanged?(
    connection: RtcConnection,
    state: ConnectionStateType,
    reason: ConnectionChangedReasonType
  ): void;

  /*
   * 本地网络类型发生改变回调。
   * 本地网络连接类型发生改变时，SDK 会触发该回调，并在回调中明确当前的网络连接类型。 你可以通过该回调获取正在使用的网络类型；当连接中断时，该回调能辨别引起中断的原因是网络切换还是网络条件不好。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param type 本地网络连接类型。详见 NetworkType 。
   */
  onNetworkTypeChanged?(connection: RtcConnection, type: NetworkType): void;

  /*
   * 内置加密出错回调。
   * 调用 enableEncryption 开启加密后， 如果发流端、收流端出现加解密出错，SDK 会触发该回调。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param errorType 错误类型，详见 EncryptionErrorType 。
   */
  onEncryptionError?(
    connection: RtcConnection,
    errorType: EncryptionErrorType
  ): void;

  /*
   * 获取设备权限出错回调。
   * 无法获取设备权限时，SDK 会触发该回调，报告哪个设备的权限无法获取。
   *
   * @param permissionType 设备权限类型。详见 PermissionType 。
   */
  onPermissionError?(permissionType: PermissionType): void;

  /*
   * 本地用户成功注册 User Account 回调。
   * 本地用户成功调用 registerLocalUserAccount 方法注册用户 User Account，或调用 joinChannelWithUserAccount 加入频道后，SDK 会触发该回调，并告知本地用户的 UID 和 User Account。
   *
   * @param uid 本地用户的 ID。
   *
   * @param userAccount 本地用户的 User Account。
   */
  onLocalUserRegistered?(uid: number, userAccount: string): void;

  /*
   *  远端用户信息已更新回调。
   * 远端用户加入频道后， SDK 会获取到该远端用户的 UID 和 User Account，然后缓存一个包含了远端用户 UID 和 User Account 的 Mapping 表，并在本地触发该回调。
   *
   * @param uid 远端用户 ID。
   *
   * @param info 标识用户信息的 UserInfo 对象，包含用户 UID 和 User Account。详见 UserInfo 类。
   */
  onUserInfoUpdated?(uid: number, info: UserInfo): void;

  /*
   * TODO(doc)
   */
  onUploadLogResult?(
    connection: RtcConnection,
    requestId: string,
    success: boolean,
    reason: UploadErrorReason
  ): void;

  /*
   * 音频订阅状态发生改变回调。
   *
   * @param channel 频道名。
   *
   * @param uid 远端用户的 ID。
   *
   * @param oldState 之前的订阅状态，详见 StreamSubscribeState 。
   *
   * @param newState 当前的订阅状态，详见 StreamSubscribeState。
   *
   * @param elapseSinceLastState 两次状态变化时间间隔（毫秒）。
   */
  onAudioSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /*
   * 视频订阅状态发生改变回调。
   *
   * @param channel 频道名。
   *
   * @param uid 远端用户的 ID。
   *
   * @param oldState 之前的订阅状态，详见 StreamSubscribeState 。
   *
   * @param newState 当前的订阅状态，详见 StreamSubscribeState。
   *
   * @param elapseSinceLastState 两次状态变化时间间隔（毫秒）。
   */
  onVideoSubscribeStateChanged?(
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ): void;

  /*
   * 音频发布状态改变回调。
   *
   * @param channel 频道名。
   *
   * @param oldState 之前的发布状态，详见 StreamPublishState 。
   *
   * @param newState 当前的发布状态，详见 StreamPublishState。
   *
   * @param elapseSinceLastState 两次状态变化时间间隔（毫秒）。
   */
  onAudioPublishStateChanged?(
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /*
   *  视频发布状态改变回调。
   *
   * @param channel 频道名。
   *
   * @param oldState 之前的发布状态，详见 StreamPublishState 。
   *
   * @param newState 当前的发布状态，详见 StreamPublishState。
   *
   * @param elapseSinceLastState 两次状态变化时间间隔（毫秒）。
   */
  onVideoPublishStateChanged?(
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ): void;

  /*
   * 插件事件回调。
   * 为监听插件事件，你需要注册该回调。
   *
   * @param value 插件属性 Key 对应的值。
   *
   * @param key 插件属性的 Key。
   *
   * @param provider 提供插件的服务商名称。
   *
   * @param extName 插件名称。
   */
  onExtensionEvent?(
    provider: string,
    extName: string,
    key: string,
    value: string
  ): void;

  /*
   * 插件启用回调。
   * 当调用 enableExtension (true) 启用插件成功时，插件会触发该回调。
   *
   * @param provider 提供插件的服务商名称。
   *
   * @param extName 插件名称。
   */
  onExtensionStarted?(provider: string, extName: string): void;

  /*
   * 插件禁用回调。
   * 当调用 enableExtension (false) 禁用插件成功时，插件会触发该回调。
   *
   * @param extName 插件名称。
   *
   * @param provider 提供插件的服务商名称。
   */
  onExtensionStopped?(provider: string, extName: string): void;

  /*
   * 插件出错回调。
   * 当调用 enableExtension (true) 启用插件失败或者插件运行出错时， 插件会触发该回调并上报错误码和错误原因。
   *
   * @param provider 提供插件的服务商名称。
   *
   * @param extName 插件的名称。
   *
   * @param error 错误码。详见插件服务商提供的插件文档。
   *
   * @param msg 错误原因。详见插件服务商提供的插件文档。
   */
  onExtensionErrored?(
    provider: string,
    extName: string,
    error: number,
    msg: string
  ): void;

  /*
   * TODO(doc)
   */
  onUserAccountUpdated?(
    connection: RtcConnection,
    remoteUid: number,
    userAccount: string
  ): void;
}

/*
 * TODO(doc)
 */
export abstract class IVideoDeviceManager {
  /*
   * TODO(doc)
   */
  abstract enumerateVideoDevices(): VideoDeviceInfo[];

  /*
   * TODO(doc)
   */
  abstract setDevice(deviceIdUTF8: string): number;

  /*
   * TODO(doc)
   */
  abstract getDevice(): string;

  /*
   * TODO(doc)
   */
  abstract startDeviceTest(hwnd: any): number;

  /*
   * TODO(doc)
   */
  abstract stopDeviceTest(): number;

  /*
   * TODO(doc)
   */
  abstract release(): void;
}

/*
 * TODO(doc)
 */
export class RtcEngineContext {
  /*
   * TODO(doc)
   */
  appId?: string;
  /*
   * TODO(doc)
   */
  enableAudioDevice?: boolean;
  /*
   * TODO(doc)
   */
  channelProfile?: ChannelProfileType;
  /*
   * TODO(doc)
   */
  audioScenario?: AudioScenarioType;
  /*
   * TODO(doc)
   */
  areaCode?: number;
  /*
   * TODO(doc)
   */
  logConfig?: LogConfig;
  /*
   * TODO(doc)
   */
  threadPriority?: ThreadPriorityType;
  /*
   * TODO(doc)
   */
  useExternalEglContext?: boolean;
}

/*
 * 观测器的 Metadata 类型。当前仅支持视频类型的 Metadata 。
 */
export enum MetadataType {
  /*
   * Metadata 类型未知。
   */
  UnknownMetadata = -1,
  /*
   * Metadata 类型为视频。
   */
  VideoMetadata = 0,
}

/*
 * TODO(doc)
 */
export enum MaxMetadataSizeType {
  /*
   * TODO(doc)
   */
  InvalidMetadataSizeInByte = -1,
  /*
   * TODO(doc)
   */
  DefaultMetadataSizeInByte = 512,
  /*
   * TODO(doc)
   */
  MaxMetadataSizeInByte = 1024,
}

/*
 * 媒体附属信息。
 */
export class Metadata {
  /*
   * 用户 ID。 对于接收者：发送该 Metadata 的远端用户的 ID。
   * 对于发送者：请忽略。
   */
  uid?: number;
  /*
   * 接收到的或发送的 Metadata 的缓存大小。
   */
  size?: number;
  /*
   * 接收到的或发送的 Metadata 的缓存地址。
   */
  buffer?: Uint8Array;
  /*
   * Metadata 的时间戳，单位为毫秒。
   */
  timeStampMs?: number;
}

/*
 * Metadata 观测器。
 */
export abstract class IMetadataObserver {
  /*
   * 接收端已收到 metadata。
   *
   * @param metadata 接收到的 metadata，详见 Metadata 。
   */
  onMetadataReceived?(metadata: Metadata): void;
}

/*
 * CDN 推流出错原因。
 */
export enum DirectCdnStreamingError {
  /*
   * 0：推流状态正常。
   */
  DirectCdnStreamingErrorOk = 0,
  /*
   * 1：一般性错误，没有明确原因。你可以尝试重新推流。
   */
  DirectCdnStreamingErrorFailed = 1,
  /*
   * 2：音频推流出错。例如，本地音频采集设备未正常工作、被其他进程占用或没有使用权限。
   */
  DirectCdnStreamingErrorAudioPublication = 2,
  /*
   * 3：视频推流出错。例如，本地视频采集设备未正常工作、被其他进程占用或没有使用权限。
   */
  DirectCdnStreamingErrorVideoPublication = 3,
  /*
   * 4：连接 CDN 失败。
   */
  DirectCdnStreamingErrorNetConnect = 4,
  /*
   * 5：URL 已用于推流。请使用新的 URL。
   */
  DirectCdnStreamingErrorBadName = 5,
}

/*
 * 当前 CDN 推流状态。
 */
export enum DirectCdnStreamingState {
  /*
   * 0：初始状态，即推流尚未开始。
   */
  DirectCdnStreamingStateIdle = 0,
  /*
   * 1：正在推流中。当你调用 startDirectCdnStreaming 成功推流时，SDK 会返回该值。
   */
  DirectCdnStreamingStateRunning = 1,
  /*
   * 2：推流已正常结束。当你调用 stopDirectCdnStreaming 主动停止推流时，SDK 会返回该值。
   */
  DirectCdnStreamingStateStopped = 2,
  /*
   * 3：推流失败。你可以通过 onDirectCdnStreamingStateChanged 回调报告的信息排查问题，然后重新推流。
   */
  DirectCdnStreamingStateFailed = 3,
  /*
   * 4：尝试重新连接 Agora 服务器和 CDN。最多尝试重连 10 次，如仍未成功恢复连接，则推流状态变为 DirectCdnStreamingStateFailed。
   */
  DirectCdnStreamingStateRecovering = 4,
}

/*
 * 当前 CDN 推流的统计数据。
 */
export class DirectCdnStreamingStats {
  /*
   * 视频的宽度（px）。
   */
  videoWidth?: number;
  /*
   * 视频的高度（px）。
   */
  videoHeight?: number;
  /*
   * 当前视频帧率（fps）。
   */
  fps?: number;
  /*
   * 当前视频码率（bps）。
   */
  videoBitrate?: number;
  /*
   * 当前音频码率（bps）。
   */
  audioBitrate?: number;
}

/*
 * IDirectCdnStreamingEventHandler 接口类用于 SDK 向 app 发送 CDN 推流的事件通知，app 通过继承该接口类的方法获取 SDK 的事件通知。
 */
export abstract class IDirectCdnStreamingEventHandler {
  /*
   * CDN 推流状态改变回调。
   * 主播端直接向 CDN 推流后，当推流状态改变时，SDK 会触发该回调向你报告新的状态、错误码和信息。你可以据此排查问题。
   *
   * @param state 当前推流状态。详见 DirectCdnStreamingState 。
   *
   * @param error 推流出错的原因。详见 DirectCdnStreamingError 。
   *
   * @param message 状态改变对应的信息。
   */
  onDirectCdnStreamingStateChanged?(
    state: DirectCdnStreamingState,
    error: DirectCdnStreamingError,
    message: string
  ): void;

  /*
   * CDN 推流统计数据回调。
   * 在主播直接向 CDN 推流的过程中，SDK 每隔 1 秒触发一次该回调。
   *
   * @param stats 当前推流的统计数据。详见 DirectCdnStreamingStats 。
   */
  onDirectCdnStreamingStats?(stats: DirectCdnStreamingStats): void;
}

/*
 * 主播端的媒体选项。
 */
export class DirectCdnStreamingMediaOptions {
  /*
   * 设置是否发布摄像头采集的视频。
   * true: 发布摄像头采集的视频。
   * false:（默认）不发布摄像头采集的视频。
   */
  publishCameraTrack?: boolean;
  /*
   * 设置是否发布麦克风采集的音频。
   * true: 发布麦克风采集的音频。
   * false:（默认）不发布麦克风采集的音频。
   */
  publishMicrophoneTrack?: boolean;
  /*
   * 设置是否发布自定义采集的音频。
   * true: 发布自定义采集的音频。
   * false:（默认）不发布自定义采集的音频。
   */
  publishCustomAudioTrack?: boolean;
  /*
   * 设置是否发布自定义采集的视频。 true: 发布自定义采集的视频。
   * false:（默认）不发布自定义采集的视频。
   */
  publishCustomVideoTrack?: boolean;
  /*
   * TODO(doc)
   */
  publishMediaPlayerAudioTrack?: boolean;
  /*
   * TODO(doc)
   */
  publishMediaPlayerId?: number;
}

/*
 * Agora RTC SDK 的基础接口类，实现实时音视频的主要功能。
 * IRtcEngine 提供了 app 调用的主要方法。
 * 在调用其他 API 之前，必须先调用 createAgoraRtcEngine 创建 IRtcEngine 对象。
 */
export abstract class IRtcEngine {
  /*
   * 销毁 IRtcEngine 对象。
   * 该方法释放 Agora SDK 使用的所有资源。有些 app 只在用户需要时才进行实时音视频通信，不需要时则将资源释放出来用于其他操作， 该方法适用于此类情况。
   * 调用该方法后，你将无法再使用 SDK 的其它方法和回调。如需再次使用实时音视频通信功能， 你必须依次重新调用 createAgoraRtcEngine 和 initialize 方法创建一个新的 IRtcEngine 对象。
   * 如需在销毁后再次创建 IRtcEngine 对象，需要等待 release 方法执行结束后再创建实例。
   *
   * @param sync true: 该方法为同步调用。需要等待 IRtcEngine 资源释放后才能执行其他操作，所以我们建议在子线程中调用该方法，避免主线程阻塞。此外，我们不建议在 SDK 的回调中调用 release，否则由于 SDK 要等待回调返回才能回收相关的对象资源，会造成死锁。SDK 会自动检测这种死锁并转为异步调用，但是检测本身会消耗额外的时间。
   *  false: 该方法为异步调用。不需要等待 IRtcEngine 资源释放后就能执行其他操作。使用异步调用时要注意，不要在调用该方法后立即卸载 SDK 动态库，否则可能会因为 SDK 的清理线程还没有退出而崩溃。
   */
  abstract release(sync?: boolean): void;

  /*
   * IRtcEngine 类的所有接口函数，如无特殊说明，都是异步调用，对接口的调用建议在同一个线程进行。 请确保在调用其他 API 前先调用 createAgoraRtcEngine 和 initialize 创建并初始化 IRtcEngine。
   * SDK 只支持每个 app 创建一个 IRtcEngine 实例。
   *
   * @param context  IRtcEngine 实例的配置。详见 RtcEngineContext 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   * -1: 一般性的错误（未明确归类）。
   * -2: 设置了无效的参数。
   * -7: SDK 初始化失败。
   * -22: 资源申请失败。当 app 占用资源过多，或系统资源耗尽时，SDK 分配资源失败，会返回该错误。
   * -101: App ID 无效。
   */
  abstract initialize(context: RtcEngineContext): number;

  /*
   * 获取 SDK 版本。
   */
  abstract getVersion(): SDKBuildInfo;

  /*
   * TODO(doc)
   */
  abstract getErrorDescription(code: number): string;

  /*
   * 加入频道后更新频道媒体选项。
   *
   * @param options  频道媒体选项，详见 ChannelMediaOptions 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2： ChannelMediaOptions 结构体成员值设置无效。例如，使用了不合法的 Token，设置了无效的用户角色。你需要填入有效的参数。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   * -8：IRtcEngine 对象内部状态错误。可能的原因是用户不在频道中。Agora 推荐通过 onConnectionStateChanged 回调判断用户是否在频道中。如果收到 ConnectionStateDisconnected(1) 或 ConnectionStateFailed(5)，则表示用户不在频道中。你需要在调用该方法前调用 joinChannelWithOptions 加入频道。
   */
  abstract updateChannelMediaOptions(options: ChannelMediaOptions): number;

  /*
   * 更新 Token。
   * 该方法用于更新 Token。Token 会在一定时间后失效。在以下两种情况下，app 应重新获取 Token，然后调用该方法传入新的 Token，否则 SDK 无法和服务器建立连接： 发生 onTokenPrivilegeWillExpire 回调时。
   * onConnectionStateChanged 回调报告 ConnectionChangedTokenExpired(9) 时。
   *
   * @param token 新的 Token。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2：传入的参数无效。例如，使用了不合法的 Token。你需要填入有效的参数。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   */
  abstract renewToken(token: string): number;

  /*
   * 设置频道场景。
   * 为保证实时音视频质量，相同频道内的用户必须使用同一种频道场景。
   * 该方法必须在 joinChannelWithOptions 前调用和进行设置，进入频道后无法再设置。
   * 不同的频道场景下，SDK 的默认音频路由和默认视频编码码率是不同的，详见 setDefaultAudioRouteToSpeakerphone 和 setVideoEncoderConfiguration 中的说明。
   *
   * @param profile 频道使用场景。详见 ChannelProfileType 。
   *
   * @returns
   * 0(ERR_OK) 方法调用成功。
   * < 0 方法调用失败。 -2 (ERR_INVALID_ARGUMENT): 参数无效。
   * -7(ERR_NOT_INITIALIZED): SDK 尚未初始化。
   */
  abstract setChannelProfile(profile: ChannelProfileType): number;

  /*
   *  停止语音通话回路测试。
   *
   * @returns
   * 0: 方法调用成功。 < 0: 方法调用失败。
   * -5(ERR_REFUSED): 无法启动测试，可能没有成功初始化。
   */
  abstract stopEchoTest(): number;

  /*
   * 启用视频模块。
   * 该方法可以在加入频道前或者通话中调用，在加入频道前调用则自动开启视频模块；在通话中调用则由音频模式切换为视频模式。调用 disableVideo 方法可关闭视频模式。
   * 成功调用该方法后，远端会触发 onRemoteVideoStateChanged 回调。 该方法设置的是内部引擎为启用状态，在离开频道后仍然有效。
   * 该方法重置整个引擎，响应时间较慢，因此声网建议使用如下方法来控制视频模块： enableLocalVideo : 是否启动摄像头采集并创建本地视频流。
   * muteLocalVideoStream : 是否发布本地视频流。
   * muteRemoteVideoStream : 是否接收并播放远端视频流。
   * muteAllRemoteVideoStreams : 是否接收并播放所有远端视频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableVideo(): number;

  /*
   * 关闭视频模块。
   * 该方法用于关闭视频模块，可以在加入频道前或者通话中调用，在加入频道前调用，则自动开启纯音频模式，在通话中调用则由视频模式切换为纯音频模式。 调用 enableVideo 方法可开启视频模式。
   * 成功调用该方法后，远端会触发 onUserEnableVideo (false) 回调。 该方法设置的是内部引擎为禁用状态，在离开频道后仍然有效。
   * 该方法重置整个引擎，响应时间较慢，因此声网建议使用如下方法来控制视频模块： enableLocalVideo : 是否启动摄像头采集并创建本地视频流。
   * muteLocalVideoStream : 是否发布本地视频流。
   * muteRemoteVideoStream : 是否接收并播放远端视频流。
   * muteAllRemoteVideoStreams : 是否接收并播放所有远端视频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract disableVideo(): number;

  /*
   *  开始通话前网络质量探测。
   * 开始通话前网络质量探测，向用户反馈上下行网络的带宽、丢包、网络抖动和往返时延数据。 启用该方法后，SDK 会依次返回如下 2 个回调： onLastmileQuality ，视网络情况约 2 秒内返回。该回调通过打分反馈上下行网络质量，更贴近用户的主观感受。 onLastmileProbeResult ，视网络情况约 30 秒内返回。该回调通过具体数据反馈上下行网络质量，更加客观。
   * 该方法主要用于以下两种场景： 用户加入频道前，可以调用该方法判断和预测目前的上行网络质量是否足够好。
   * 直播场景下，当用户角色想由观众切换为主播时，可以调用该方法判断和预测目前的上行网络质量是否足够好。 调用该方法后，在收到 onLastmileQuality 和 onLastmileProbeResult 回调之前请不要调用其他方法，否则可能会由于 API 操作过于频繁导致此方法无法执行。 在直播场景中，如果本地用户为主播，请勿加入频道后调用该方法。
   *
   * @param config Last mile 网络探测配置，详见 LastmileProbeConfig 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract startLastmileProbeTest(config: LastmileProbeConfig): number;

  /*
   *  停止通话前网络质量探测。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract stopLastmileProbeTest(): number;

  /*
   * 设置视频编码属性。
   * 设置本地视频的编码属性。
   * 该方法在加入频道前后都能调用。如果用户在加入频道后不需要重新设置视频编码属性，则
   * Agora 建议在 enableVideo 前调用该方法，可以加快首帧出图的时间。
   *
   * @param config 视频编码参数配置。详见 VideoEncoderConfiguration 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /*
   * 设置美颜效果选项。
   * 开启本地美颜功能，并设置美颜效果选项。
   * 开启美颜功能涉及一系列方法的调用，调用顺序如下： 在初始化 IRtcEngine 时调用 loadExtensionProvider (libagora_video_process_extension.dll)，指定动态库的路径。
   * 调用 enableExtension (agora, beauty, true)，开启插件。
   * 调用 enableVideo ，启用视频模块。
   * 调用该方法，开启美颜功能。
   *
   * @param type 媒体源类型，详见 MediaSourceType 。
   *
   * @param enabled 是否开启美颜功能： true: 开启。
   *  false:（默认）关闭。
   *
   * @param options 美颜选项，详细定义见 BeautyOptions 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 ERR_NOT_SUPPORTED(4)：当前设备版本低于 Android 5.0，不支持该操作。
   */
  abstract setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions,
    type?: MediaSourceType
  ): number;

  /*
   * 开启/关闭虚拟背景（beta 功能）。
   * 虚拟背景功能支持你使用自定义的背景图替代本地用户原来的背景图或者将背景虚化处理。成功开启虚拟背景功能后，频道内所有用户都能看到自定义的背景。
   * 开启虚拟背景功能涉及一系列方法的调用，调用顺序如下：
   * 在初始化 IRtcEngine 时调用 loadExtensionProvider (libagora_segmentation_extension.dll)，指定动态库的路径和名称。
   * 调用 enableExtension (agora_segmentation, PortraitSegmentation, true)，开启插件。
   * 调用 enableVideo ，启用视频模块。
   * 调用该方法，开启虚拟背景功能。
   * 该功能对设备性能要求较高，Agora 推荐你在搭载如下芯片的设备上使用： 骁龙 700 系列 750G 及以上
   * 骁龙 800 系列 835 及以上
   * 天玑 700 系列 720 及以上
   * 麒麟 800 系列 810 及以上
   * 麒麟 900 系列 980 及以上
   * 搭载 A9 及以上芯片的如下设备： iPhone 6S 及以上
   * iPad Air 第三代及以上
   * iPad 第五代及以上
   * iPad Pro 第一代及以上
   * iPad mini 第五代及以上 Agora 建议你在满足如下条件的场景中使用该功能： 使用高清摄像设备、摄像环境光照均匀。
   * 摄像画面中，物件较少，用户的人像为半身人像且基本无遮挡，背景色较单一且与用户着装颜色不同。
   *
   * @param enabled 是否开启虚拟背景： true: 开启。
   *  false: 关闭。
   *
   * @param backgroundSource 自定义的背景图。详见 VirtualBackgroundSource 。为将自定义背景图的分辨率与 SDK 的视频采集分辨率适配，SDK 会在保证自定义背景图不变形的前提下，对自定义背景图进行缩放和裁剪。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource
  ): number;

  /*
   * 开启或关闭远端视频超分辨率。
   * 该功能可以有效提升本地用户看到的远端视频画面的分辨率。例如远端用户视频的原始分辨率为 a < b，开启该功能后，本地设备会以 2a < 2b 的分辨率显示该远端视频。
   * 调用该方法后，通过 onRemoteVideoStats 回调中的远端视频统计数据（ RemoteVideoStats ），确认超分辨率是否成功开启：
   * 如果参数 superResolutionType >0：超分辨率已开启。
   * 如果参数 superResolutionType =0：超分辨率未开启。 超分辨率功能会额外耗费系统资源。为平衡视觉体验和系统消耗，只可以对一个远端用户开启超分辨率，并且远端用户视频的原始分辨率在设备上不能超过 640 × 360（Android）或 640 × 480（iOS）。
   * 调用该方法前，请确保你已经集成相应的动态库： Android: libagora_super_resolution_extension.so
   * iOS: AgoraSuperResolutionExtension.xcframework 该方法对用户设备具有一定要求，Agora 推荐你使用如下或更好的设备： Android: VIVO：V1821A，NEX S，1914A，1916A，1962A，1824BA，X60，X60 Pro
   * OPPO：PCCM00，Find X3
   * OnePlus：A6000
   * Xiaomi：Mi 8，Mi 9，Mi 10，Mi 11，MIX3，Redmi K20 Pro
   * SAMSUNG：SM-G9600，SM-G9650，SM-N9600，SM-G9708，SM-G960U，SM-G9750，S20，S21
   * HUAWEI：SEA-AL00，ELE-AL00，VOG-AL00，YAL-AL10，HMA-AL00，EVR-AN00，nova 4，nova 5 Pro，nova 6 5G，nova 7 5G，Mate 30，Mate 30 Pro，Mate 40，Mate 40 Pro，P40，P40 Pro，华为平板 M6，MatePad 10.8 iOS: iPhone XR
   * iPhone XS
   * iPhone XS Max
   * iPhone 11
   * iPhone 11 Pro
   * iPhone 11 Pro Max
   * iPhone 12
   * iPhone 12 mini
   * iPhone 12 Pro
   * iPhone 12 Pro Max
   * iPhone 12 SE（第二代）
   * iPad Pro 11-inch（第三代）
   * iPad Pro 12.9-inch（第三代）
   * iPad Air（第三代）
   * iPad Air（第四代）
   *
   * @param userId 远端用户 ID。
   *
   * @param enable 是否对远端视频开启超分辨率： true: 开启。
   *  false: 关闭。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract enableRemoteSuperResolution(userId: number, enable: boolean): number;

  /*
   * 初始化远端用户视图。
   * 该方法绑定远端用户和显示视图，并设置远端用户视图在本地显示时的渲染模式和镜像模式，只影响本地用户看到的视频画面。
   * 调用该方法时需要指定远端视频的用户 ID，一般可以在进频道前提前设置好。如果无法在加入频道前得到远端用户的 ID，可以在收到 onUserJoined 回调时调用该方法。
   * 如需解除某个远端用户的绑定视图，可以调用该方法并将 view 设置为空。
   * 离开频道后，SDK 会清除远端用户视图的绑定关系。 如果你希望在通话中更新远端用户视图的渲染或镜像模式，请使用 setRemoteRenderMode 方法。
   * 如果你使用了 Agora 录制服务，录制服务会作为一个哑客户端加入频道，因此也会触发 onUserJoined 回调。由于录制服务不会发送视频流，app 无需为它绑定视图。如果 app 无法识别哑客户端，可以在收到 onFirstRemoteVideoDecoded 回调时再绑定远端用户视图。
   *
   * @param canvas 远端视频显示属性。详见 VideoCanvas 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract setupRemoteVideo(canvas: VideoCanvas): number;

  /*
   * 初始化本地视图。
   * 该方法初始化本地视图并设置本地用户视频显示属性，只影响本地用户看到的视频画面，不影响本地发布视频。调用该方法绑定本地视频流的显示视窗(view)，并设置本地用户视图的渲染模式和镜像模式。
   * 在 App 开发中，通常在初始化后调用该方法进行本地视频设置，然后再加入频道。退出频道后，绑定仍然有效，如果需要解除绑定，可以调用该方法将参数 view 设为 NULL。 该方法在加入频道前后都能调用。
   * 如果你希望在通话中更新本地用户视图的渲染或镜像模式，请使用 setLocalRenderMode 方法。
   *
   * @param canvas 本地视频显示属性。详见 VideoCanvas 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract setupLocalVideo(canvas: VideoCanvas): number;

  /*
   * 启用音频模块。
   * 启用音频模块（默认为开启状态）。 该方法设置音频模块为启用状态，在频道内和频道外均可调用。在离开频道后仍然有效。
   * 该方法开启整个音频模块，响应时间较慢，因此 Agora 建议使用如下方法来控制音频模块： enableLocalAudio : 是否启动麦克风采集并创建本地音频流。
   * muteLocalAudioStream : 是否发布本地音频流。
   * muteRemoteAudioStream : 是否接收并播放远端音频流。
   * muteAllRemoteAudioStreams : 是否接收并播放所有远端音频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableAudio(): number;

  /*
   * 关闭音频模块。
   * 该方法设置内部引擎为禁用状态，在频道内和频道外均可调用。离开频道后仍然有效。
   * 该方法重置整个引擎，响应时间较慢，因此声网建议使用如下方法来控制音频模块： enableLocalAudio : 是否启动麦克风采集并创建本地音频流。
   * muteLocalAudioStream : 是否发布本地音频流。
   * muteRemoteAudioStream : 是否接收并播放远端音频流。
   * muteAllRemoteAudioStreams : 是否接收并播放所有远端音频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract disableAudio(): number;

  /*
   * 开关本地音频采集。
   * 当用户加入频道时，音频功能默认是开启的。该方法可以关闭或重新开启本地音频功能，即停止或重新开始本地音频采集。
   * 该方法不影响接收远端音频流， enableLocalAudio (false) 适用于只听不发的用户场景。
   * 音频功能关闭或重新开启后，会收到 onLocalAudioStateChanged 回调，并报告 LocalAudioStreamStateStopped(0) 或 LocalAudioStreamStateRecording(1)。 该方法与 muteLocalAudioStream 的区别在于：
   * enableLocalAudio: 开启或关闭本地音频采集及处理。使用 enableLocalAudio 关闭或开启本地采集后，本地听远端播放会有短暂中断。
   * muteLocalAudioStream: 停止或继续发送本地音频流。 该方法在加入频道前后均可调用。在加入频道前调用只能设置设备状态，在加入频道后才会立即生效。
   *
   * @param enabled  true: 重新开启本地音频功能，即开启本地音频采集（默认）；
   *  false: 关闭本地音频功能，即停止本地音频采集。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract enableLocalAudio(enabled: boolean): number;

  /*
   * 取消或恢复发布本地音频流。
   * 该方法不影响音频采集状态，因为没有禁用音频采集设备。
   *
   * @param mute 是否取消发布本地音频流。
   *  true: 取消发布。
   *  false:（默认）发布。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /*
   * 取消或恢复订阅所有远端用户的音频流。
   * 成功调用该方法后，本地用户会取消或恢复订阅所有远端用户的音频流，包括在调用该方法后加入频道的用户的音频流。 该方法需要在加入频道后调用。
   *
   * @param mute 是否取消订阅所有远端用户的音频流：
   *  true: 取消订阅所有远端用户的音频流。
   *  false:（默认）订阅所有远端用户的音频流。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /*
   * 默认取消或恢复订阅远端用户的音频流。
   * 该方法需要在加入频道后调用。调用成功后，本地用户取消或恢复订阅调用时刻之后加入频道的远端用户。 取消订阅音频流后，如果需要恢复订阅频道内的远端，可以进行如下操作： 如果需要恢复订阅单个用户的音频流，调用 muteRemoteAudioStream (false)，并指定你想要订阅的远端用户 ID。
   * 如果想恢复订阅多个用户的音频流，则需要多次调用 muteRemoteAudioStream (false)。
   *
   * @param mute 是否默认取消订阅远端用户的音频流： true：默认取消订阅远端用户的音频流。
   *  false：（默认）默认订阅远端用户的音频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setDefaultMuteAllRemoteAudioStreams(mute: boolean): number;

  /*
   * 取消或恢复订阅指定远端用户的音频流。
   * 该方法需要在加入频道后调用。
   *
   * @param uid 指定用户的用户 ID。
   *
   * @param mute 是否取消订阅指定远端用户的音频流。
   *  true: 取消订阅指定用户的音频流。
   *  false:（默认）订阅指定用户的音频流。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  /*
   * 取消或恢复发布本地视频流。
   * 成功调用该方法后，远端会触发 onUserMuteVideo 回调。 相比于 enableLocalVideo (false) 用于控制本地视频流发送的方法，该方法响应速度更快。
   * 该方法不影响视频采集状态，没有禁用摄像头。
   *
   * @param mute 是否取消发送本地视频流。 true: 取消发送本地视频流。
   *  false: （默认）发送本地视频流。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract muteLocalVideoStream(mute: boolean): number;

  /*
   * 开关本地视频采集。
   * 该方法禁用或重新启用本地视频采集，不影响接收远端视频。
   * 调用 enableVideo 后，本地视频采集即默认开启。你可以调用 enableLocalVideo (false) 关闭本地视频采集。关闭后如果想要重新开启，则可调用 enableLocalVideo(true)。
   * 成功禁用或启用本地视频采集后，远端会触发 onRemoteVideoStateChanged 回调。 该方法在加入频道前后都能调用。
   * 该方法设置内部引擎为启用状态，在离开频道后仍然有效。
   *
   * @param enabled 是否开启本地视频采集。 true:（默认）开启本地视频采集。
   *  false: 关闭本地视频采集。关闭后，远端用户会接收不到本地用户的视频流；但本地用户依然可以接收远端用户的视频流。设置为 false 时，该方法不需要本地有摄像头。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract enableLocalVideo(enabled: boolean): number;

  /*
   * 取消或恢复订阅所有远端用户的视频流。
   * 成功调用该方法后，本地用户会取消或恢复订阅所有远端用户的视频流，包括在调用该方法后加入频道的用户的视频流。 该方法需要在加入频道后调用。
   *
   * @param mute 是否取消订阅所有远端用户的视频流。 true: 取消订阅所有用户的视频流。
   *  false:（默认）订阅所有用户的视频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract muteAllRemoteVideoStreams(mute: boolean): number;

  /*
   * 默认取消或恢复订阅远端用户的视频流。
   * 该方法需要在加入频道后调用。调用成功后，本地用户取消或恢复订阅调用时刻之后加入频道的远端用户。 取消订阅视频流后，如果需要恢复订阅频道内的远端用户，可以进行如下操作： 如果需要恢复订阅单个用户的视频流，调用 muteRemoteVideoStream (false)，并指定你想要订阅的远端用户 ID。
   * 如果想恢复订阅多个用户的视频流，则需要多次调用 muteRemoteVideoStream(false)。
   *
   * @param mute 是否默认取消订阅远端用户的视频流： true: 默认取消订阅。
   *  false:（默认）默认订阅。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setDefaultMuteAllRemoteVideoStreams(mute: boolean): number;

  /*
   * 取消或恢复订阅指定远端用户的视频流。
   * 该方法需要在加入频道后调用。
   *
   * @param uid 指定用户的用户 ID。
   *
   * @param mute 是否取消订阅指定远端用户的视频流。 true: 取消订阅指定用户的视频流。
   *  false: （默认）订阅指定用户的视频流。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract muteRemoteVideoStream(uid: number, mute: boolean): number;

  /*
   *  设置订阅的视频流类型。
   * 在网络条件受限的情况下，如果发送端没有调用 enableDualStreamMode (false) 关闭双流模式，接收端可以选择接收大流还是小流。其中，大流为高分辨率高码率的视频流，小流则是低分辨率低码率的视频流。 正常情况下，用户默认接收大流。如需接收小流，可以调用本方法进行切换。SDK 会根据视频窗口的大小动态调整对应视频流的大小，以节约带宽和计算资源。视频小流默认的宽高比和视频大流的宽高比一致。根据当前大流的宽高比，系统会自动分配小流的分辨率、帧率及码率。 调用本方法的执行结果将在 onApiCallExecuted 中返回。 该方法在加入频道前后都能调用。如果既调用了 setRemoteVideoStreamType ，也调用了 setRemoteDefaultVideoStreamType ，则 SDK 以 setRemoteVideoStreamType 中的设置为准。
   *
   * @param uid 用户 ID。
   *
   * @param streamType 视频流类型: VideoStreamType 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): number;

  /*
   * 设置默认订阅的视频流类型。
   * 在网络条件受限的情况下，如果发送端没有调用 enableDualStreamMode (false) 关闭双流模式，接收端可以选择接收大流还是小流。其中，大流为高分辨率高码率的视频流，小流则是低分辨率低码率的视频流。
   * 正常情况下，用户默认接收大流。如需默认接收所有用户的视频小流，可以调用本方法进行切换。SDK 会根据视频窗口的大小动态调整对应视频流的大小，以节约带宽和计算资源。视频小流默认的宽高比和视频大流的宽高比一致。根据当前大流的宽高比，系统会自动分配小流的分辨率、帧率及码率。
   * 调用本方法的执行结果将在 onApiCallExecuted 中返回。 该方法只能在加入频道前调用。Agora 不支持你在加入频道后修改默认订阅的视频流类型。
   * 如果你既调用了该方法，也调用了 setRemoteVideoStreamType ，则 SDK 以 setRemoteVideoStreamType 中的设置为准。
   *
   * @param streamType 默认订阅的视频流类型: VideoStreamType 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number;

  /*
   * 启用用户音量提示。
   * 该方法允许 SDK 定期向 app 报告本地发流用户和瞬时音量最高的远端用户（最多 3 位）的音量相关信息。启用该方法后，只要频道内有发流用户， SDK 会在加入频道后按设置的时间间隔触发 onAudioVolumeIndication 回调。
   * 该方法在加入频道前后都能调用。
   *
   * @param interval 指定音量提示的时间间隔： ≤ 0: 禁用音量提示功能。
   *  > 0: 返回音量提示的间隔，单位为毫秒。该参数需要设为 200 的整数倍。如果取值低于 200，SDK 会自动调整为 200。
   *
   * @param smooth 平滑系数，指定音量提示的灵敏度。取值范围为 [0,10]，建议值为 3。数字越大，波动越灵敏；数字越小，波动越平滑。
   *
   * @param reportVad true：开启本地人声检测功能。开启后，onAudioVolumeIndication 回调的 vad 参数会报告是否在本地检测到人声。
   *  false：（默认）关闭本地人声检测功能。除引擎自动进行本地人声检测的场景外，onAudioVolumeIndication 回调的 vad 参数不会报告是否在本地检测到人声。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number;

  /*
   * 停止客户端录音。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract stopAudioRecording(): number;

  /*
   * 创建媒体播放器。
   *
   * @returns
   * 方法调用成功：返回 IMediaPlayer 对象。
   * 方法调用失败：返回空指针。
   */
  abstract createMediaPlayer(): IMediaPlayer;

  /*
   * 销毁媒体播放器。
   *
   * @param mediaPlayer  IMediaPlayer 对象。
   *
   * @returns
   * ≥ 0: 方法调用成功，返回媒体播放器 ID
   * < 0: 方法调用失败
   */
  abstract destroyMediaPlayer(mediaPlayer: IMediaPlayer): number;

  /*
   * 停止播放音乐文件。
   * 该方法停止播放音乐文件。请在频道内调用该方法。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract stopAudioMixing(): number;

  /*
   * TODO(doc)
   */
  abstract pauseAudioMixing(): number;

  /*
   * TODO(doc)
   */
  abstract resumeAudioMixing(): number;

  /*
   * 调节音乐文件的播放音量。
   * 该方法调节混音音乐文件在本端和远端的播放音量大小。 该方法需要在 startAudioMixing 后调用。
   *
   * @param volume 音乐文件音量范围为 0~100。100 （默认值）为原始文件音量。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract adjustAudioMixingVolume(volume: number): number;

  /*
   * 调节音乐文件远端播放音量。
   * 该方法调节混音音乐文件在远端的播放音量大小。 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @param volume 音乐文件音量。取值范围为 [0,100]，100 （默认值）为原始音量。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract adjustAudioMixingPublishVolume(volume: number): number;

  /*
   * 获取音乐文件的远端播放音量。
   * 该接口可以方便开发者排查音量相关问题。
   * 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @returns
   * ≥ 0: 方法调用成功则返回音量值，范围为 [0,100]。
   * < 0: 方法调用失败。
   */
  abstract getAudioMixingPublishVolume(): number;

  /*
   * 调节音乐文件在本地播放的音量。
   * 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @param volume 音乐文件音量。取值范围为 [0,100]，100 （默认值）为原始音量。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract adjustAudioMixingPlayoutVolume(volume: number): number;

  /*
   * 获取音乐文件的本地播放音量。
   * 该方法获取混音的音乐文件本地播放音量，方便排查音量相关问题。 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @returns
   * ≥ 0: 方法调用成功则返回音量值，范围为 [0,100]。
   * < 0: 方法调用失败。
   */
  abstract getAudioMixingPlayoutVolume(): number;

  /*
   * 获取音乐文件总时长。
   * 该方法获取音乐文件总时长，单位为毫秒。 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged (AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @returns
   * ≥ 0: 方法调用成功返回音乐文件时长。
   * < 0: 方法调用失败。
   */
  abstract getAudioMixingDuration(): number;

  /*
   * 获取音乐文件的播放进度。
   * 该方法获取当前音乐文件播放进度，单位为毫秒。 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   * 如需多次调用 getAudioMixingCurrentPosition，请确保调用间隔大于 500 ms。
   *
   * @returns
   * ≥ 0: 方法调用成功，返回当前音乐文件播放进度（ms）。0 表示当前音乐文件未开始播放。
   * < 0: 方法调用失败。
   */
  abstract getAudioMixingCurrentPosition(): number;

  /*
   * 设置音乐文件的播放位置。
   * 该方法可以设置音频文件的播放位置，这样你可以根据实际情况播放文件，而非从头到尾播放整个文件。
   * 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @param pos 整数。进度条位置，单位为毫秒。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAudioMixingPosition(pos: number): number;

  /*
   * 调整本地播放的音乐文件的音调。
   * 本地人声和播放的音乐文件混音时，调用该方法可以仅调节音乐文件的音调。
   * 你需要在调用 startAudioMixing 并收到 onAudioMixingStateChanged(AudioMixingStatePlaying) 回调后调用该方法。
   *
   * @param pitch 按半音音阶调整本地播放的音乐文件的音调，默认值为 0，即不调整音调。取值范围为 [-12,12]，每相邻两个值的音高距离相差半音。取值的绝对值越大，音调升高或降低得越多。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAudioMixingPitch(pitch: number): number;

  /*
   * 获取音效文件的播放音量。
   * 音量范围为 0~100。100 （默认值）为原始文件音量。
   * 该方法需要在 playEffect 后调用。
   */
  abstract getEffectsVolume(): number;

  /*
   * 设置音效文件的播放音量。
   * 该方法需要在 playEffect 后调用。
   *
   * @param volume 播放音量。取值范围为 [0,100]。默认值为 100，表示原始音量。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setEffectsVolume(volume: number): number;

  /*
   * 将音效文件加载至内存。
   * 为保证通信畅通，请注意控制预加载音效文件的大小，并在 joinChannelWithOptions 前就使用该方法完成音效预加载。 该方法不支持在线音频文件。
   * 该方法支持的音频文件格式见 Agora RTC SDK 支持播放哪些格式的音频文件。
   *
   * @param soundId 音效的 ID。每个音效的 ID 具有唯一性。
   *
   * @param filePath 文件路径： Android: 文件路径，需精确到文件名及后缀。支持在线文件的 URL 地址，本地文件的 URI 地址、绝对路径或以 /assets/ 开头的路径。
   *  通过绝对路径访问本地文件可能会遇到权限问题，Agora 推荐使用 URI 地址访问本地文件。例如 content://com.android.providers.media.documents/document/audio%3A14441。
   *  iOS : 音频文件的绝对路径或 URL 地址，需精确到文件名及后缀。例如 /var/mobile/Containers/Data/audio.mp4。
   *
   * @param startPos 音效文件加载的起始位置，单位为毫秒。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract preloadEffect(
    soundId: number,
    filePath: string,
    startPos?: number
  ): number;

  /*
   * 播放指定的本地或在线音效文件。
   * 你可以多次调用该方法，传入不同的 soundID 和 filePath，同时播放多个音效文件。为获得最佳用户体验，Agora 推荐同时播放的音效文件不超过 3 个。 音效文件播放结束后，SDK 会触发 onAudioEffectFinished 回调。
   * 该方法需要在加入频道后调用。
   *
   * @param soundId 音效的 ID。每个音效的 ID 具有唯一性。 如果你已通过 preloadEffect 将音效加载至内存，请确保该参数与 preloadEffect 中设置的 soundId 相同。
   *
   * @param filePath 播放文件的绝对路径或 URL 地址，需精确到文件名及后缀。例如 C:\music\audio.mp4。支持的音频格式包括 MP3、AAC、M4A、MP4、WAV、3GP。详见支持的媒体格式。
   *  如果你已通过 preloadEffect 将音效加载至内存，请确保该参数与 preloadEffect 中设置的 filePath 相同。
   *
   * @param loopCount 音效循环播放的次数。
   *  ≥ 0: 循环播放次数。例如，1 表示循环播放 1 次，即总计播放 2 次。
   *  -1: 无限循环播放。
   *
   * @param pitch 音效的音调，取值范围为 [0.5,2.0]。默认值为 1.0，表示原始音调。取值越小，则音调越低。
   *
   * @param pan 音效的空间位置。取值范围为 [-1.0,1.0]，例如：
   *  -1.0：音效出现在左边
   *  0.0：音效出现在正前方
   *  1.0：音效出现在右边
   *
   * @param gain 音效的音量。取值范围为 [0.0,100.0]。默认值为 100.0，表示原始音量。取值越小，则音量越低。
   *
   * @param publish 是否将音效发布至远端：
   *  true: 将音效发布至远端。本地用户和远端用户都能听到音效。
   *  false: 不将音效发布至远端。只有本地用户能听到音效。
   *
   * @param startPos 音效文件的播放位置，单位为毫秒。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
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

  /*
   * 播放所有音效文件。
   * 多次调用 preloadEffect 预加载多个音效文件后，你可以调用本方法播放所有预加载的音效文件。
   *
   * @param loopCount 音效文件循环播放的次数： -1: 无限循环播放音效文件，直至调用 stopEffect 或 stopAllEffects 后停止。
   *  0: 播放音效文件一次。
   *  1: 播放音效文件两次。
   *
   * @param pitch 音效的音调。取值范围为 [0.5,2.0]。默认值为 1.0，代表原始音调。取值越小，则音调越低。
   *
   * @param pan 音效的空间位置。取值范围为 [-1.0,1.0]: -1.0: 音效出现在左边。
   *  0: 音效出现在正前边。
   *  1.0: 音效出现在右边。
   *
   * @param gain 音效的音量。取值范围为 [0,100]。100 为默认值，代表原始音量。取值越小，则音量越低。
   *
   * @param publish 是否将音效发布到远端： true: 将音效发布到远端。本地和远端用户都能听到该音效。
   *  false: （默认）不将音效发布到远端。只能本地用户能听到该音效。
   */
  abstract playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean
  ): number;

  /*
   * 获取指定音效文件的播放音量。
   *
   * @param soundId 音效文件的 ID。
   *
   * @returns
   * ≥ 0: 方法调用成功，返回播放音量。音量范围为 [0,100]。100 为原始音量。
   * < 0: 方法调用失败。
   */
  abstract getVolumeOfEffect(soundId: number): number;

  /*
   * 实时调整音效文件的播放音量。
   *
   * @param soundId 指定音效的 ID。每个音效均有唯一的 ID。
   *
   * @param volume 播放音量。取值范围为 [0,100]。默认值为 100，表示原始音量。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setVolumeOfEffect(soundId: number, volume: number): number;

  /*
   * 暂停音效文件播放。
   *
   * @param soundId 音效的 ID。每个音效的 ID 具有唯一性。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract pauseEffect(soundId: number): number;

  /*
   * 暂停所有音效文件播放。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract pauseAllEffects(): number;

  /*
   * 恢复播放指定音效文件。
   *
   * @param soundId 音效的 ID。每个音效的 ID 具有唯一性。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract resumeEffect(soundId: number): number;

  /*
   * 恢复播放所有音效文件。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract resumeAllEffects(): number;

  /*
   * 停止播放指定音效文件。
   *
   * @param soundId 指定音效文件的 ID。每个音效文件均有唯一的 ID。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract stopEffect(soundId: number): number;

  /*
   * 停止播放所有音效文件。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract stopAllEffects(): number;

  /*
   * 从内存释放某个预加载的音效文件。
   *
   * @param soundId 指定音效文件的 ID。每个音效文件均有唯一的 ID。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract unloadEffect(soundId: number): number;

  /*
   * 从内存释放所有预加载音效文件。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract unloadAllEffects(): number;

  /*
   * 开启/关闭远端用户的语音立体声。
   * 如果想调用 setRemoteVoicePosition 实现听声辨位的功能，请确保在加入频道前调用该方法开启远端用户的语音立体声。
   *
   * @param enabled 是否开启远端用户语音立体声： true: 开启语音立体声。
   *  false: 关闭语音立体声。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract enableSoundPositionIndication(enabled: boolean): number;

  /*
   * 设置远端用户声音的 2D 位置，即水平面位置。
   * 设置远端用户声音的 2D 位置和音量，方便本地用户听声辨位。
   * 通过调用该接口设置远端用户声音出现的位置，左右声道的声音差异会产生声音的方位感，从而判断出远端用户的实时位置。在多人在线游戏场景，如吃鸡游戏中，该方法能有效增加游戏角色的方位感，模拟真实场景。 使用该方法需要在加入频道前调用 enableSoundPositionIndication 开启远端用户的语音立体声。
   * 为获得最佳听觉体验，我们建议使用该方法时使用有线耳机。
   * 该方法需要在加入频道后调用。
   *
   * @param uid 远端用户的 ID
   *
   * @param pan 设置远端用户声音的 2D 位置，取值范围为 [-1.0,1.0]: (默认）0.0: 声音出现在正前方。
   *  -1.0: 声音出现在左边。
   *  1.0: 声音出现在右边。
   *
   * @param gain 设置远端用户声音的音量，取值范围为 [0.0,100.0]，默认值为 100.0，表示该用户的原始音量。取值越小，则音量越低。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): number;

  /*
   * 开启或关闭空间音效。
   * 开启空间音效后，你可以调用 setRemoteUserSpatialAudioParams 设置远端用户的空间音效参数。 该方法在加入频道前后均可调用。
   *
   * @param enabled 是否开启空间音效： true: 开启空间音效。
   *  false: 关闭空间音效。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableSpatialAudio(enabled: boolean): number;

  /*
   * 设置远端用户的空间音效参数。
   * 该方法需要在 enableSpatialAudio 后调用。成功设置远端用户的空间音效参数后，本地用户听远端用户会有空间感。
   *
   * @param uid
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setRemoteUserSpatialAudioParams(
    uid: number,
    params: SpatialAudioParams
  ): number;

  /*
   * 设置预设的美声效果。
   * 调用该方法可以为本地发流用户设置预设的人声美化效果。设置美声效果后，频道内所有用户都能听到该效果。根据不同的场景，你可以为用户设置不同的美声效果。
   * 为获取更好的人声效果，Agora 推荐你在调用该方法前将 setAudioProfile 的 scenario 设为 AudioScenarioGameStreaming(3)，并将 profile 设为 AudioProfileMusicHighQuality(4) 或 AudioProfileMusicHighQualityStereo(5)。 该方法在加入频道前后都能调用。
   * 请勿将 setAudioProfile 的 profile 参数设置为 AudioProfileSpeechStandard(1) 或 AudioProfileIot(6)，否则该方法不生效。
   * 该方法对人声的处理效果最佳，Agora 不推荐调用该方法处理含音乐的音频数据。
   * 调用 setVoiceBeautifierPreset，Agora 不推荐调用以下方法，否则 setVoiceBeautifierPreset 设置的效果会被覆盖：
   * setAudioEffectPreset
   * setAudioEffectParameters
   * setLocalVoicePitch
   * setLocalVoiceEqualization
   * setLocalVoiceReverb
   * setVoiceBeautifierParameters
   * setVoiceConversionPreset
   *
   * @param preset 预设的美声效果选项，详见 VoiceBeautifierPreset 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number;

  /*
   * 设置 SDK 预设的人声音效。
   * 调用该方法可以为本地发流用户设置 SDK 预设的人声音效，且不会改变原声的性别特征。设置音效后，频道内所有用户都能听到该效果。
   * 为获取更好的人声效果，Agora 推荐你在调用该方法前将 setAudioProfile 的 scenario 设为 AudioScenarioGameStreaming(3)。 该方法在加入频道前后都能调用。
   * 请勿将 setAudioProfile 的 profile 参数设置为 AudioProfileSpeechStandard(1) 或 AudioProfileIot(6)，否则该方法不生效。
   * 该方法对人声的处理效果最佳，Agora 不推荐调用该方法处理含音乐的音频数据。
   * 如果调用 setAudioEffectPreset 并设置除 RoomAcoustics3dVoice 或 PitchCorrection 外的枚举，请勿再调用 setAudioEffectParameters ，否则 setAudioEffectPreset 设置的效果会被覆盖。
   * 调用 setAudioEffectPreset 后，Agora 不推荐调用以下方法，否则 setAudioEffectPreset 设置的效果会被覆盖： setVoiceBeautifierPreset
   * setLocalVoicePitch
   * setLocalVoiceEqualization
   * setLocalVoiceReverb
   * setVoiceBeautifierParameters
   * setVoiceConversionPreset
   *
   * @param preset 预设的音效选项，详见 AudioEffectPreset 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAudioEffectPreset(preset: AudioEffectPreset): number;

  /*
   * 设置预设的变声效果。
   * 调用该方法可以为本地发流用户设置 SDK 预设的变声效果。设置变声效果后，频道内所有用户都能听到该效果。根据不同的场景，你可以为用户设置不同的变声效果。
   * 为获取更好的人声效果，Agora 推荐你在调用该方法前将 setAudioProfile 的 profile 设为 AudioProfileMusicHighQuality(4) 或 AudioProfileMusicHighQualityStereo(5)，并将 scenario 设为 AudioScenarioGameStreaming(3)。 该方法在加入频道前后都能调用。
   * 请勿将 setAudioProfile 的 profile 参数设置为 AudioProfileSpeechStandard(1) 或 AudioProfileIot(6)，否则该方法不生效。
   * 该方法对人声的处理效果最佳，Agora 不推荐调用该方法处理含音乐的音频数据。
   * 调用 setVoiceConversionPreset 后，Agora 不推荐调用以下方法，否则 setVoiceConversionPreset 设置的效果会被覆盖： setAudioEffectPreset
   * setAudioEffectParameters
   * setVoiceBeautifierPreset
   * setVoiceBeautifierParameters
   * setLocalVoicePitch
   * setLocalVoiceEqualization
   * setLocalVoiceReverb
   *
   * @param preset 预设的变声效果选项: VoiceConversionPreset 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract setVoiceConversionPreset(preset: VoiceConversionPreset): number;

  /*
   * 设置 SDK 预设人声音效的参数。
   * 调用该方法可以对本地发流用户进行如下设置： 3D 人声音效：设置 3D 人声音效的环绕周期。
   * 电音音效：设置电音音效的基础调式和主音音高。为方便用户自行调节电音音效，Agora 推荐你将基础调式和主音音高配置选项与应用的 UI 元素绑定。 设置后，频道内所有用户都能听到该效果。 该方法在加入频道前后都能调用。
   * 为获取更好的人声效果，Agora 推荐你在调用该方法前将 setAudioProfile 的 scenario 设为 AudioScenarioGameStreaming(3)。
   * 请勿将 setAudioProfile 的 profile 参数设置为 AudioProfileSpeechStandard(1) 或 AudioProfileIot(6)，否则该方法不生效。
   * 该方法对人声的处理效果最佳，Agora 不推荐调用该方法处理含音乐的音频数据。
   * 调用 setAudioEffectParameters 后，Agora 不推荐调用以下方法，否则 setAudioEffectParameters 设置的效果会被覆盖： setAudioEffectPreset
   * setVoiceBeautifierPreset
   * setLocalVoicePitch
   * setLocalVoiceEqualization
   * setLocalVoiceReverb
   * setVoiceBeautifierParameters
   * setVoiceConversionPreset
   *
   * @param preset SDK 预设的音效，支持以下设置： RoomAcoustics3dVoice，3D 人声音效。 你需要在使用该枚举前将 setAudioProfile 的 profile 参数设置 为 AudioProfileMusicStandardStereo(3) 或 AudioProfileMusicHighQualityStereo(5)，否则该枚举设置无效。
   *  启用 3D 人声后，用户需要使用支持双声道的音频播放设备才能听到预期效果。 PitchCorrection，电音音效。为获取更好的人声效果，Agora 建议你在使用该枚举前将 setAudioProfile 的 profile 参数设置为 AudioProfileMusicHighQuality(4) 或 AudioProfileMusicHighQualityStereo(5)。
   *
   * @param param1 如果 preset 设为 RoomAcoustics3dVoice ，则 param1 表示 3D 人声音效的环绕周期。取值范围为 [1,60]，单位为秒。默认值为 10，表示人声会 10 秒环绕 360 度。
   *  如果 preset 设为 PitchCorrection，则 param1 表示电音音效的基础调式： 1: （默认）自然大调。
   *  2: 自然小调。
   *  3: 和风小调。
   *
   * @param param2 如果 preset 设为 RoomAcoustics3dVoice，你需要将 param2 设置为 0。
   *  如果 preset 设为 PitchCorrection，则 param2 表示电音音效的主音音高： 1: A
   *  2: A#
   *  3: B
   *  4: (Default) C
   *  5: C#
   *  6: D
   *  7: D#
   *  8: E
   *  9: F
   *  10: F#
   *  11: G
   *  12: G#
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number;

  /*
   * 设置预设美声效果的参数。
   * 调用该方法可以设置歌唱美声效果的性别特征和混响效果。该方法对本地发流用户进行设置。设置后，频道内所有用户都能听到该效果。
   * 为获取更好的人声效果，Agora 推荐你在调用该方法前将 setAudioProfile 的 scenario 设为 AudioScenarioGameStreaming(3)，并将 profile 设为 AudioProfileMusicHighQuality(4) 或 AudioProfileMusicHighQualityStereo(5)。 该方法在加入频道前后都能调用。
   * 请勿将 setAudioProfile 的 profile 参数设置为 AudioProfileSpeechStandard(1) 或 AudioProfileIot(6)，否则该方法不生效。
   * 该方法对人声的处理效果最佳，Agora 不推荐调用该方法处理含音乐的音频数据。
   * 调用 setVoiceBeautifierParameters，Agora 不推荐调用以下方法，否则 setVoiceBeautifierParameters 设置的效果会被覆盖： setAudioEffectPreset
   * setAudioEffectParameters
   * setVoiceBeautifierPreset
   * setLocalVoicePitch
   * setLocalVoiceEqualization
   * setLocalVoiceReverb
   * setVoiceConversionPreset
   *
   * @param preset 预设的音效： SINGING_BEAUTIFIER: 歌唱美声。
   *
   * @param param1 歌声的性别特征： 1: 男声。
   *  2: 女声。
   *
   * @param param2 歌声的混响效果： 1: 歌声在小房间的混响效果。
   *  2: 歌声在大房间的混响效果。
   *  3: 歌声在大厅的混响效果。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract setVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): number;

  /*
   * 设置本地语音音调。
   * 该方法在加入频道前后都能调用。
   *
   * @param pitch 语音频率。可以 [0.5,2.0] 范围内设置。取值越小，则音调越低。默认值为 1.0，表示不需要修改音调。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setLocalVoicePitch(pitch: number): number;

  /*
   * 设置本地语音音效均衡。
   * 该方法在加入频道前后都能调用。
   *
   * @param bandFrequency 频谱子带索引。取值范围是 [0,9]，分别代表音效的 10 个频带。对应的中心频率为 [31，62，125，250，500，1k，2k，4k，8k，16k] Hz。详见 AudioEqualizationBandFrequency 。
   *
   * @param bandGain 每个 band 的增益，单位是 dB，每一个值的范围是 [-15,15]，默认值为 0。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number;

  /*
   * 设置本地音效混响。
   * SDK 提供一个使用更为简便的方法 setAudioEffectPreset ，直接实现流行、R&B、KTV 等预置的混响效果。
   * 该方法在加入频道前后都能调用。
   *
   * @param reverbKey 混响音效 Key。该方法共有 5 个混响音效 Key，详见 AudioReverbType 。
   *
   * @param value 各混响音效 Key 所对应的值。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): number;

  /*
   * 设置日志文件
   * 弃用：
   * 此方法已废弃，请改用 initialize 中的 logConfig 参数设置日志文件路径 。 设置 SDK 的输出 log 文件。SDK 运行时产生的所有 log 将写入该文件。App 必须保证指定的目录存在而且可写。 如需调用本方法，请在调用 initialize 方法初始化 IRtcEngine 对象后立即调用，否则输出日志可能不完整。
   *
   * @param filePath 日志文件的完整路径。该日志文件为 UTF-8 编码。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setLogFile(filePath: string): number;

  /*
   * 设置日志输出等级。
   * 弃用：
   * 请改用 initialize 中的 logConfig。 该方法设置 Agora SDK 的输出日志输出等级。不同的输出等级可以单独或组合使用。日志级别顺序依次为 LogFilterOff、LogFilterCritical、LogFilterError、LogFilterWarn、LogFilterInfo 和 LogFilterDebug。
   * 选择一个级别，你就可以看到在该级别之前所有级别的日志信息。
   * 例如，你选择 LogFilterWarn 级别，就可以看到在 LogFilterCritical、LogFilterError 和 LogFilterWarn 级别的日志信息。
   *
   * @param filter 日志过滤等级。详见 LogFilterType 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLogFilter(filter: LogFilterType): number;

  /*
   * 设置 SDK 的日志输出级别。
   * 弃用：
   * 该方法已经废弃。请改用 RtcEngineContext 设置日志输出级别。 选择一个级别，你就可以看到该级别的日志信息。
   *
   * @param level 日志级别: LogLevel 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLogLevel(level: LogLevel): number;

  /*
   * 设置 SDK 输出的日志文件的大小。
   * 弃用：
   * 该方法已废弃，请改用 initialize 中的 logConfig 参数设置日志文件大小。 默认情况下，SDK 会生成 5 个 SDK 日志文件和 5 个 API 调用日志文件，规则如下： SDK 日志文件的名称分别为：agorasdk.log、agorasdk.1.log、agorasdk.2.log、agorasdk.3.log、agorasdk.4.log。
   * API 调用日志文件的名称分别为：agoraapi.log、agoraapi.1.log、agoraapi.2.log、agoraapi.3.log、agoraapi.4.log。
   * 每个 SDK 日志文件的默认大小为 1,024 KB；API 调用日志文件的默认大小为 2,048 KB。日志文件均为 UTF-8 编码。
   * 最新的日志永远写在 agorasdk.log 和 agoraapi.log 中。
   * 当 agorasdk.log 写满后，SDK 会按照以下顺序对日志文件进行操作： 删除 agorasdk.4.log 文件（如有）。
   * 将agorasdk.3.log 重命名为 agorasdk.4.log。
   * 将agorasdk.2.log 重命名为 agorasdk.3.log。
   * 将agorasdk.1.log 重命名为 agorasdk.2.log。
   * 新建 agorasdk.log 文件。 agoraapi.log 文件的覆盖规则与 agorasdk.log 相同。 该方法仅用于设置 agorasdk.log 文件的大小，对agoraapi.log不生效。
   *
   * @param fileSizeInKBytes 单个 agorasdk.log 日志文件的大小，单位为 KB，取值范围为 [128,20480]，默认值为 1,024 KB。 如果你将 fileSizeInKByte 设为小于 128 KB，SDK 会自动调整到 128 KB；如果你将 fileSizeInKByte 设为大于 20,480 KB，SDK 会自动调整到 20,480 KB。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLogFileSize(fileSizeInKBytes: number): number;

  /*
   * TODO(doc)
   */
  abstract uploadLogFile(requestId: string): number;

  /*
   * 更新远端视图显示模式。
   * 初始化远端用户视图后，你可以调用该方法更新远端用户视图在本地显示时的渲染和镜像模式。该方法只影响本地用户看到的视频画面。 请在调用 setupRemoteVideo 方法初始化远端视图后，调用该方法。
   * 你可以在通话中多次调用该方法，多次更新远端用户视图的显示模式。
   *
   * @param uid 远端用户 ID。
   *
   * @param renderMode 远端用户视图的渲染模式，详见 RenderModeType 。
   *
   * @param mirrorMode 远端用户视图的镜像模式，详见 VideoMirrorModeType 。
   */
  abstract setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number;

  /*
   * 设置本地视频镜像。
   * 弃用:
   * 该方法已废弃。
   * 请改用 setupLocalVideo 或 setLocalRenderMode 。
   *
   * @param mirrorMode 本地视频镜像模式。详见 VideoMirrorModeType 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number;

  /*
   * 开启/关闭自定义回声消除。
   * 调用该方法后，你可以将外部音频帧推送到自定义音频模块进行回声消除。
   * 你需要在调用 之后、加入频道之前调用该方法。
   *
   * @param enabled 设置是否开启自定义回声消除： true：开启。
   *  false：关闭。
   *
   * @param audioSourceDelay 设置推送音频帧到发布音频帧中间的时间（毫秒）。取值范围为 [0,30]。 如需调用 ，请确保该参数设为 0。
   *  如需调用 或处理声卡采集的音频帧，请确保该参数为 10 的整数倍。
   */
  abstract enableEchoCancellationExternal(
    enabled: boolean,
    audioSourceDelay: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract enableCustomAudioLocalPlayback(
    sourceId: number,
    enabled: boolean
  ): number;

  /*
   * TODO(doc)
   */
  abstract startPrimaryCustomAudioTrack(config: AudioTrackConfig): number;

  /*
   * TODO(doc)
   */
  abstract stopPrimaryCustomAudioTrack(): number;

  /*
   * TODO(doc)
   */
  abstract startSecondaryCustomAudioTrack(config: AudioTrackConfig): number;

  /*
   * TODO(doc)
   */
  abstract stopSecondaryCustomAudioTrack(): number;

  /*
   * TODO(doc)
   */
  abstract setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract enableAudioSpectrumMonitor(intervalInMS?: number): number;

  /*
   * TODO(doc)
   */
  abstract disableAudioSpectrumMonitor(): number;

  /*
   * 调节音频采集信号音量。
   * 该方法在加入频道前后都能调用。
   *
   * @param volume 音量，取值范围为 [0,400]。 0: 静音。
   *  100: （默认）原始音量。
   *  400: 原始音量的 4 倍，自带溢出保护。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract adjustRecordingSignalVolume(volume: number): number;

  /*
   * TODO(doc)
   */
  abstract muteRecordingSignal(mute: boolean): number;

  /*
   * 调节本地播放的所有远端用户信号音量。
   * 该方法调节的是本地播放的所有远端用户混音后的音量。
   * 该方法在加入频道前后都能调用。
   *
   * @param volume 音量，取值范围为 [0,400]。 0: 静音。
   *  100: （默认）原始音量。
   *  400: 原始音量的 4 倍，自带溢出保护。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract adjustPlaybackSignalVolume(volume: number): number;

  /*
   * 调节本地播放的指定远端用户信号音量。
   * 你可以在通话中调用该方法调节指定远端用户在本地播放的音量。如需调节多个用户在本地播放的音量，则需多次调用该方法。 该方法需要在加入频道后调用。
   * 该方法调节的是本地播放的指定远端用户混音后的音量。
   *
   * @param volume 音乐文件音量范围为 0~100。100 （默认值）为原始文件音量。
   *
   * @param uid 远端用户 ID。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract adjustUserPlaybackSignalVolume(uid: number, volume: number): number;

  /*
   * TODO(doc)
   */
  abstract setLocalPublishFallbackOption(option: StreamFallbackOptions): number;

  /*
   *  设置弱网条件下订阅的音视频流的回退选项。
   * 网络不理想的环境下，直播音视频的质量都会下降。如果你使用本方法并将 option 设置为 StreamFallbackOptionVideoStreamLow(1) 或 StreamFallbackOptionAudioOnly(2)，SDK 会在下行弱网且音视频质量严重受影响时，将视频流切换为小流，或关断视频流，从而保证或提高音频质量。
   * 同时 SDK 会持续监控网络质量，并在网络质量改善时恢复音视频流。
   * 当远端订阅流回退为音频流时，或由音频流恢复为音视频流时，SDK 会触发 onRemoteSubscribeFallbackToAudioOnly 回调。
   * 该方法需要在加入频道前调用。
   *
   * @param option 订阅音视频流的回退选项。默认值为 StreamFallbackOptionVideoStreamLow(1)。详见 StreamFallbackOptions 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): number;

  /*
   * TODO(doc)
   */
  abstract enableLoopbackRecording(
    enabled: boolean,
    deviceName?: string
  ): number;

  /*
   * TODO(doc)
   */
  abstract adjustLoopbackRecordingVolume(volume: number): number;

  /*
   * TODO(doc)
   */
  abstract getLoopbackRecordingVolume(): number;

  /*
   * 开启耳返功能。
   * 该方法打开或关闭耳返功能。
   *
   * @param enabled 开启/关闭耳返功能:
   *  true: 开启耳返功能。
   *  false: （默认）关闭耳返功能。
   *
   * @param includeAudioFilters 耳返 audio filter 类型。详见 EarMonitoringFilterType 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number;

  /*
   * 设置耳返音量。
   * 用户必须使用有线耳机才能听到耳返效果。
   * 该方法在加入频道前后都能调用。
   *
   * @param volume 设置耳返音量，取值范围在 [0,100]。默认值为 100。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setInEarMonitoringVolume(volume: number): number;

  /*
   * 将插件添加到 SDK 中。
   *
   * @param path 插件的动态库路径和名称。例如：/library/libagora_segmentation_extension.dll。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract loadExtensionProvider(path: string): number;

  /*
   * 设置插件服务商的属性。
   * 你可以调用该方法设置插件服务商的属性，并根据服务商的类型初始化相关参数。 该方法需要在 enableExtension 之后、且启用音频（ enableAudio / enableLocalAudio ）或启用视频（ enableVideo / enableLocalVideo ）之前调用。
   *
   * @param value 插件属性 Key 对应的值。
   *
   * @param key 插件属性的 Key。
   *
   * @param provider 提供插件的服务商名称。
   */
  abstract setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): number;

  /*
   * 启用/禁用插件。
   * 该方法需要在加入频道前调用。 如果要开启多个插件，需要多次调用该方法。
   * 不同插件在 SDK 中处理数据的顺序由插件的开通顺序决定。即先开启的插件会先处理数据。
   *
   * @param extension 插件的名称。
   *
   * @param provider 提供插件的服务商名称。
   *
   * @param enable 是否启用插件： true: 启用插件。
   *  false: 禁用插件。
   *
   * @param type 媒体资源类型。详见 MediaSourceType 。
   *  在该方法中，该参数仅支持以下两种设置： 默认值为 UnknownMediaSource。
   *  如果要使用第二个摄像头采集视频，将该参数设置为 SecondaryCameraSource。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract enableExtension(
    provider: string,
    extension: string,
    enable?: boolean,
    type?: MediaSourceType
  ): number;

  /*
   * 设置插件的属性。
   * 开启插件后，你可以调用该方法设置插件的属性。
   *
   * @param provider 提供插件的服务商名称。
   *
   * @param extension 插件的名称。
   *
   * @param key 插件属性的 Key。
   *
   * @param value 插件属性 Key 对应的值。
   *
   * @param type 媒体源类型，详见 MediaSourceType 。
   */
  abstract setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type?: MediaSourceType
  ): number;

  /*
   * TODO(doc)
   */
  abstract getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    bufLen: number,
    type?: MediaSourceType
  ): string;

  /*
   * 设置摄像头采集配置。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @param config 摄像头采集配置，详见 CameraCapturerConfiguration 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): number;

  /*
   * 切换前置/后置摄像头。
   * 该方法需要在相机启动（如通过调用 startPreview 或 joinChannelWithOptions 实现）后调用。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract switchCamera(): number;

  /*
   * 检测设备是否支持摄像头缩放功能。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @returns
   * true: 设备支持相机缩放功能。
   * false: 设备不支持相机缩放功能。
   */
  abstract isCameraZoomSupported(): boolean;

  /*
   * 检查设备摄像头是否支持人脸检测。
   * 该方法仅适用于 Android。
   *
   * @returns
   * true: 设备摄像头支持人脸检测。
   * false: 设备摄像头不支持人脸检测。
   */
  abstract isCameraFaceDetectSupported(): boolean;

  /*
   * 检测设备是否支持闪光灯常开。
   * 该方法需要在相机启动（如通过调用 startPreview 或 joinChannelWithOptions 实现）后调用。 一般情况下，App 默认开启前置摄像头，因此如果你的前置摄像头不支持闪光灯常开，直接使用该方法会返回 false。
   * 如果需要检查后置摄像头是否支持闪光灯常开，需要先使用 switchCamera 切换摄像头，再使用该方法。
   * 在系统版本 15 的 iPad 上，即使 isCameraTorchSupported 返回 true，也可能因系统问题导致你无法通过 setCameraTorchOn 成功开启闪光灯。
   *
   * @returns
   * true: 设备支持闪光灯常开。
   * false: 设备不支持闪光灯常开。
   */
  abstract isCameraTorchSupported(): boolean;

  /*
   * 检测设备是否支持手动对焦功能。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @returns
   * true: 设备支持手动对焦功能。
   * false: 设备不支持手动对焦功能。
   */
  abstract isCameraFocusSupported(): boolean;

  /*
   * 检测设备是否支持人脸对焦功能。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @returns
   * true: 设备支持人脸对焦功能。
   * false: 设备不支持人脸对焦功能。
   */
  abstract isCameraAutoFocusFaceModeSupported(): boolean;

  /*
   * 设置摄像头缩放比例。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @param factor 相机缩放比例，有效范围从 1.0 到最大缩放比例。你可以通过 getCameraMaxZoomFactor 方法获取设备支持的最大缩放比例。
   *
   * @returns
   * 方法调用成功: 返回设置的 factor 值。
   * 方法调用失败: 返回值 < 0。
   */
  abstract setCameraZoomFactor(factor: number): number;

  /*
   * 开启/关闭本地人脸检测。
   * 该方法在加入频道前后都能调用。
   * 开启本地人脸检测后，SDK 会触发 onFacePositionChanged 回调向你报告人脸检测的信息： 摄像头采集的画面大小
   * 人脸在 view 中的位置
   * 人脸距设备屏幕的距离 该方法需要在相机启动（如通过调用 startPreview 或 joinChannelWithOptions 实现）后调用。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract enableFaceDetection(enabled: boolean): number;

  /*
   * 获取摄像头支持最大缩放比例。
   * 请在启动摄像头之后调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之后。
   *
   * @returns
   * 设备摄像头支持的最大缩放比例。
   */
  abstract getCameraMaxZoomFactor(): number;

  /*
   * 设置手动对焦位置，并触发对焦。
   * 该方法需要在相机启动（如通过调用 startPreview 或 joinChannelWithOptions 实现）后调用。
   * 成功调用该方法后，本地会触发 onCameraFocusAreaChanged 回调。
   *
   * @param positionX 触摸点相对于视图的横坐标。
   *
   * @param positionY 触摸点相对于视图的纵坐标。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number;

  /*
   * 设置是否打开闪光灯。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @param isOn 是否打开闪光灯： true: 打开闪光灯。
   *  false:（默认）关闭闪光灯。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setCameraTorchOn(isOn: boolean): number;

  /*
   * 设置是否开启人脸对焦功能。
   * SDK 默认在 Android 平台关闭人脸自动对焦，在 iOS 平台开启人脸自动对焦。如需自行设置人脸自动对焦，请调用该方法。 该方法需在摄像头启动后调用，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之后。
   *
   * @param enabled 是否开启人脸对焦： true: 开启人脸对焦功能。
   *  false: 关闭人脸对焦功能。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setCameraAutoFocusFaceModeEnabled(enabled: boolean): number;

  /*
   * 检测设备是否支持手动曝光功能。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @returns
   * true: 设备支持手动曝光功能。
   * false: 设备不支持手动曝光功能。
   */
  abstract isCameraExposurePositionSupported(): boolean;

  /*
   * 设置手动曝光位置。
   * 该方法需要在相机启动（如通过调用 startPreview 或 joinChannelWithOptions 实现）后调用。
   * 成功调用该方法后，本地会触发 onCameraExposureAreaChanged 回调。
   *
   * @param positionXinView 触摸点相对于视图的横坐标。
   *
   * @param positionYinView 触摸点相对于视图的纵坐标。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number;

  /*
   * 检测设备是否支持自动曝光功能。
   * 该方法仅适用于 iOS。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @returns
   * true: 设备支持自动曝光功能。
   * false: 设备不支持自动曝光功能。
   */
  abstract isCameraAutoExposureFaceModeSupported(): boolean;

  /*
   * 设置是否开启自动曝光功能。
   * 请在启动摄像头之前调用该方法，如 joinChannelWithOptions 、 enableVideo 或者 enableLocalVideo 之前。
   *
   * @param enabled 是否开启自动曝光： true: 开启自动曝光。
   *  false: 关闭自动曝光。
   */
  abstract setCameraAutoExposureFaceModeEnabled(enabled: boolean): number;

  /*
   * 设置默认的音频路由
   * 手机设备一般有两个音频路由，一个是位于顶部的听筒，播放声音偏小；一个是位于底部的扬声器，播放声音偏大。设置默认的音频路由，就是在没有外接设备的前提下，设置系统使用听筒还是扬声器播放音频。
   *
   * @param defaultToSpeaker 是否使用扬声器作为默认的音频路由： true: 设置默认音频路由为扬声器。
   *  false: 设置默认音频路由为听筒。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): number;

  /*
   * 暂态设置启用或关闭扬声器。
   * 成功改变音频路由后，SDK 会触发 onAudioRoutingChanged 回调。
   * 该 API 可以在加入频道前、频道中、离开频道后调用。但是由于该 API 为暂态行为，我们推荐你在频道中调用，用来临时改变音频路由。 如无明确的暂态设置需求，Agora 推荐调用稳态 API setDefaultAudioRouteToSpeakerphone 设置音频路由。
   * 任何用户行为或者音频相关 API 的调用都有可能改变 setEnableSpeakerphone 的暂态设置。
   * 由于系统限制，在 iOS 设备上，如果用户使用了蓝牙耳机、有线耳机等外接音频播放设备，则该方法无法将音频路由设置为扬声器。
   *
   * @param speakerOn 是否使用扬声器作为当前音频路由： true: 暂时设置扬声器为音频路由。
   *  false: 不将当前音频路由设为扬声器。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setEnableSpeakerphone(speakerOn: boolean): number;

  /*
   * 检查扬声器状态启用状态。
   *
   * @returns
   * true: 扬声器已开启，语音会输出到扬声器。
   * false: 扬声器未开启，语音会输出到非扬声器（听筒，耳机等）。
   */
  abstract isSpeakerphoneEnabled(): boolean;

  /*
   * TODO(doc)
   */
  abstract getScreenCaptureSources(
    thumbSize: SIZE,
    iconSize: SIZE,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[];

  /*
   * 设置 SDK 对 Audio Session 的操作权限。
   * 默认情况下，SDK 和 app 对 Audio Session 都有操作权限。如果你只需使用 app 对 Audio Session 进行操作，你可以调用该方法限制 SDK 对 Audio Session 的操作权限。
   * 该方法在加入频道前后都能调用。一旦调用该方法限制了 SDK 对 Audio Session 的操作权限，该限制会在 SDK 需要更改 Audio Session 时生效。 该方法仅适用于 iOS 平台。
   * 该方法不会限制 app 对 Audio Session 的操作权限。
   *
   * @param restriction SDK 对 Audio Session 的操作权限，详见 AudioSessionOperationRestriction 。该参数为 Bit Mask，每个 Bit 对应一个权限。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败。
   */
  abstract setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number;

  /*
   * TODO(doc)
   */
  abstract startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /*
   * TODO(doc)
   */
  abstract startScreenCaptureByScreenRect(
    screenRect: Rectangle,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /*
   * TODO(doc)
   */
  abstract getAudioDeviceInfo(): DeviceInfo;

  /*
   * TODO(doc)
   */
  abstract startScreenCaptureByWindowId(
    windowId: any,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number;

  /*
   * TODO(doc)
   */
  abstract setScreenCaptureContentHint(contentHint: VideoContentHint): number;

  /*
   * TODO(doc)
   */
  abstract updateScreenCaptureRegion(regionRect: Rectangle): number;

  /*
   * 更新屏幕共享的参数配置。
   *
   * @param captureParams 屏幕共享的编码参数配置。默认的分辨率为 1920 x 1080，即 2073600 像素。该像素值为计费标准。详见 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract updateScreenCaptureParameters(
    captureParams: ScreenCaptureParameters
  ): number;

  /*
   * TODO(doc)
   */
  abstract stopScreenCapture(): number;

  /*
   * 获取通话 ID。
   * 客户端在每次加入频道后会生成一个对应的 callId，标识该客户端的此次通话。有些方法，如 rate 、 complain 等，
   * 需要在通话结束后调用，向 SDK 提交反馈。这些方法中需要填入指定的 callId 参数。
   * 该方法需要在加入频道后调用。
   *
   * @returns
   * 方法调用成功则返回当前的通话 ID。
   * 方法调用失败则返回空字符串。
   */
  abstract getCallId(): string;

  /*
   * 给通话评分。
   * 该方法需要在用户离开频道后调用。
   *
   * @param callId 通话 ID。你可以通过调用 getCallId 获取该参数。
   *
   * @param rating 给通话的评分，最低 1 分，最高 5 分，如超过这个范围，SDK 会返回 -2(ERR_INVALID_ARGUMENT) 错误。
   *
   * @param description
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2(ERR_INVALID_ARGUMENT)。
   * -3(ERR_NOT_READY)。
   */
  abstract rate(callId: string, rating: number, description: string): number;

  /*
   * 投诉通话质量。
   * 该方法允许用户就通话质量进行投诉。需要在离开频道后调用。
   *
   * @param callId 通话 ID。你可以通过调用 getCallId 获取该参数。
   *
   * @param description
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   * -2(ERR_INVALID_ARGUMENT)。
   * -3(ERR_NOT_READY)。
   */
  abstract complain(callId: string, description: string): number;

  /*
   *  增加旁路推流地址。
   * 弃用：
   * 该方法已废弃。请根据实际情况改用 startRtmpStreamWithoutTranscoding 或 startRtmpStreamWithTranscoding 。 调用该方法后，你可以向 CDN 推送 RTMP 或 RTMPS 协议的媒体流。SDK 会在本地触发 onRtmpStreamingStateChanged 回调，报告增加旁路推流地址的状态。 该方法需要在加入频道后调用。
   * 请确保已开通旁路推流的功能。
   * 只有直播场景中角色为主播的用户才能调用该方法。
   * 该方法每次只能增加一路旁路推流地址。若需推送多路流，则需多次调用该方法。
   *
   * @param url 旁路推流地址，格式为 RTMP 或 RTMPS。该字符长度不能超过 1024 字节，不支持中文字符等特殊字符。
   *
   * @param transcodingEnabled 是否转码。转码是指在旁路推流时对音视频流进行转码处理后再推送到其他 CDN 服务器。多适用于频道内有多个主播，需要进行混流、合图的场景。 true: 转码。
   *  false: 不转码。 如果该参数设为 true，需先调用 setLiveTranscoding 方法。
   *
   * @returns
   * 0: 方法调用成功。 < 0: 方法调用失败。 -2: 参数无效，一般是 URL 为空或是长度为 0 的字符串。
   * -7: 推流时未初始化引擎。
   */
  abstract addPublishStreamUrl(
    url: string,
    transcodingEnabled: boolean
  ): number;

  /*
   * 删除旁路推流地址。
   * 弃用：
   * 该方法已废弃。请改用 stopRtmpStream 。 调用该方法后，SDK 会在本地触发 onRtmpStreamingStateChanged 回调，报告删除旁路推流地址的状态。 调用该方法前，请确保已开通旁路推流的功能。
   * 只有直播场景中角色为主播的用户才能调用该方法。
   * 该方法需要在加入频道后调用。
   * 该方法每次只能删除一路旁路推流地址。若需删除多路流，则需多次调用该方法。
   *
   * @param url  待删除的旁路推流地址，格式为 RTMP 或 RTMPS。该字符长度不能超过 1024 字节。推流地址不支持中文等特殊字符。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract removePublishStreamUrl(url: string): number;

  /*
   * 设置直播推流转码。
   * 弃用：
   * 该方法已废弃。请根据实际情况改用 startRtmpStreamWithTranscoding 或 updateRtmpTranscoding 。 该方法用于旁路推流的视图布局及音频设置等。调用该方法更新转码设置后本地会触发 onTranscodingUpdated 回调。 只有直播场景中角色为主播的用户才能调用该方法。
   * 请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
   * 首次调用该方法更新转码设置时，不会触发 onTranscodingUpdated 回调。
   * 该方法需要在加入频道后调用。
   *
   * @param transcoding 推流转码设置。详见 LiveTranscoding。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract setLiveTranscoding(transcoding: LiveTranscoding): number;

  /*
   *  开始非转码推流。
   * 调用该方法，你可以向指定的旁路推流地址推送直播音视频流并设置转码属性。该方法每次只能向一个地址推送媒体流，如果你需要向多个地址转码推流，则需多次调用该方法。
   * 调用该方法后，SDK 会在本地触发 onRtmpStreamingStateChanged 回调，报告推流的状态。 请在加入频道后调用该方法。
   * 只有直播场景下的主播才能调用该方法。
   * 调用该方法推流失败后，如果你想要重新推流，那么请你务必先调用 stopRtmpStream ，再调用该方法重推，否则 SDK 会返回与上次推流失败时一样的错误码。
   *
   * @param url 旁路推流地址。格式为 RTMP 或 RTMPS。字符长度不能超过 1024 字节。不支持中文字符等特殊字符。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2：url 为空或为长度为 0 的字符串。
   * -7：调用该方法前，未初始化 SDK。
   */
  abstract startRtmpStreamWithoutTranscoding(url: string): number;

  /*
   *  开始旁路推流并设置转码属性。
   * 调用该方法，你可以向指定的旁路推流地址推送直播音视频流并设置转码属性。该方法每次只能向一个地址推送媒体流，如果你需要向多个地址转码推流，则需多次调用该方法。
   * 调用该方法后，SDK 会在本地触发 onRtmpStreamingStateChanged 回调，报告推流的状态。 请在加入频道后调用该方法。
   * 只有直播场景下的主播才能调用该方法。
   * 调用该方法推流失败后，如果你想要重新推流，那么请你务必先调用 stopRtmpStream ，再调用该方法重推，否则 SDK 会返回与上次推流失败时一样的错误码。
   *
   * @param url 旁路推流地址。格式为 RTMP 或 RTMPS。字符长度不能超过 1024 字节。不支持中文字符等特殊字符。
   *
   * @param transcoding 旁路推流的转码属性，详见 LiveTranscoding 类。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2：url 为空或为长度为 0 的字符串。
   * -7：调用该方法前，未初始化 SDK。
   */
  abstract startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): number;

  /*
   *  更新旁路推流转码属性。
   * 开启转码推流后，你可以根据场景需求，动态更新转码属性。转码属性更新后，SDK 会触发 onTranscodingUpdated 回调。
   *
   * @param transcoding 旁路推流的转码属性，详见 LiveTranscoding 类。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract updateRtmpTranscoding(transcoding: LiveTranscoding): number;

  /*
   *  结束旁路推流。
   * 调用该方法，你可以结束指定的旁路推流地址上的直播。该方法每次只能结束一个推流地址上的直播，如果你需要结束多个推流地址的直播，则需多次调用该方法。
   * 调用该方法后，SDK 会在本地触发 onRtmpStreamingStateChanged 回调，报告推流的状态。
   *
   * @param url 旁路推流地址。格式为 RTMP 或 RTMPS。字符长度不能超过 1024 字节。不支持中文字符等特殊字符。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract stopRtmpStream(url: string): number;

  /*
   * TODO(doc)
   */
  abstract startLocalVideoTranscoder(
    config: LocalTranscoderConfiguration
  ): number;

  /*
   * TODO(doc)
   */
  abstract updateLocalTranscoderConfiguration(
    config: LocalTranscoderConfiguration
  ): number;

  /*
   * TODO(doc)
   */
  abstract stopLocalVideoTranscoder(): number;

  /*
   * TODO(doc)
   */
  abstract startPrimaryCameraCapture(
    config: CameraCapturerConfiguration
  ): number;

  /*
   * TODO(doc)
   */
  abstract startSecondaryCameraCapture(
    config: CameraCapturerConfiguration
  ): number;

  /*
   * TODO(doc)
   */
  abstract stopPrimaryCameraCapture(): number;

  /*
   * TODO(doc)
   */
  abstract stopSecondaryCameraCapture(): number;

  /*
   * 设置采集视频的旋转角度。
   * 当视频采集设备不带重力感应功能时，你可以调用该方法手动调整采集到的视频画面的旋转角度。
   *
   * @param null 视频源类型，详见 VideoSourceType
   *
   * @param orientation 顺时针旋转角度，详见 VideoOrientation
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  /*
   * TODO(doc)
   */
  abstract setScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number;

  /*
   * TODO(doc)
   */
  abstract startPrimaryScreenCapture(
    config: ScreenCaptureConfiguration
  ): number;

  /*
   * TODO(doc)
   */
  abstract startSecondaryScreenCapture(
    config: ScreenCaptureConfiguration
  ): number;

  /*
   * TODO(doc)
   */
  abstract stopPrimaryScreenCapture(): number;

  /*
   * TODO(doc)
   */
  abstract stopSecondaryScreenCapture(): number;

  /*
   *  获取当前网络连接状态。
   * 该方法在加入频道前后都能调用。
   *
   * @returns
   * 当前网络连接状态。详见 ConnectionStateType 。
   */
  abstract getConnectionState(): ConnectionStateType;

  /*
   * 添加主回调事件。
   * IRtcEngineEventHandler 接口类用于 SDK 向 app 发送回调事件通知，app 通过继承该接口类的方法获取 SDK 的事件通知。
   * 接口类的所有方法都有缺省（空）实现，app 可以根据需要只继承关心的事件。在回调方法中，app 不应该做耗时或者调用可能会引起阻塞的 API（如 sendStreamMessage），
   * 否则可能影响 SDK 的运行。
   *
   * @param eventHandler 待添加的回调事件，详见 IRtcEngineEventHandler 。
   */
  abstract registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean;

  /*
   * 删除指定的回调句柄。
   * 该方法删除指定的回调句柄。对于某些注册的回调句柄，如果你在收到相应回调事件后无需再次接收回调消息，可以调用该方法移除回调句柄。
   *
   * @param eventHandler 待删除的回调句柄。详见 IRtcEngineEventHandler 。
   */
  abstract unregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): boolean;

  /*
   * TODO(doc)
   */
  abstract setRemoteUserPriority(
    uid: number,
    userPriority: PriorityType
  ): number;

  /*
   * 启用内置的加密方案。
   * 弃用：
   * 请改用 enableEncryption 方法。 Agora Video SDK 支持内置加密方案，默认支持 AES-128-GCM。如需采用其他加密方案，可以调用本方法。同一频道内的所有用户必须设置相同的加密方式和 secret 才能进行通话。关于这几种加密方式的区别，请参考 AES 加密算法的相关资料。
   * 在调用本方法前，请先调用 setEncryptionSecret 启用内置加密功能。
   *
   * @param encryptionMode 加密模式： "aes-128-xts": 128 位 AES 加密，XTS 模式；
   *  "aes-128-ecb": 128 位 AES 加密，ECB 模式；
   *  "aes-256-xts": 256 位 AES 加密，XTS 模式；
   *  "sm4-128-ecb": 128 位 SM4 加密，ECB 模式；
   *  "aes-128-gcm": 128 位 AES 加密，GCM 模式；
   *  "aes-256-gcm": 256 位 AES 加密，GCM 模式；
   *  "": 设置为空字符串时，默认使用加密方式 "aes-128-gcm"。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setEncryptionMode(encryptionMode: string): number;

  /*
   * 启用内置加密，并设置数据加密密码。
   * 弃用：
   * 请改用 enableEncryption 方法。 在加入频道之前， app 需调用该方法指定 secret 来启用内置的加密功能，同一频道内的所有用户应设置相同的 secret。
   * 当用户离开频道时，该频道的 secret 会自动清除。如果未指定 secret 或将 secret 设置为空，则无法激活加密功能。 请不要在旁路推流时调用此方法。
   * 为保证最佳传输效果，请确保加密后的数据大小不超过原始数据大小 + 16 字节。16 字节是 AES 通用加密模式下最大填充块大小。
   *
   * @param secret 加密密码。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setEncryptionSecret(secret: string): number;

  /*
   *  开启或关闭内置加密。
   * 在安全要求较高的场景下，Agora 建议你在加入频道前，调用本方法开启内置加密。
   * 同一频道内所有用户必须使用相同的加密模式和密钥。用户离开频道后，SDK 会自动关闭加密。如需重新开启加密，你需要在用户再次加入频道前调用该方法。
   * 如果开启了内置加密，则不能使用旁路推流功能。
   *
   * @param enabled 是否开启内置加密： true: 开启内置加密。
   *  false: 关闭内置加密。
   *
   * @param config 配置内置加密模式和密钥。详见 EncryptionConfig 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败 -2: 调用了无效的参数。需重新指定参数。
   * -4: 设置的加密模式不正确或加载外部加密库失败。需检查枚举值是否正确或重新加载外部加密库。
   * -7: SDK 尚未初始化。需在调用 API 之前已创建 IRtcEngine 对象并完成初始化。
   */
  abstract enableEncryption(enabled: boolean, config: EncryptionConfig): number;

  /*
   * 发送数据流。
   * 该方法发送数据流消息到频道内所有用户。SDK 对该方法的实现进行了如下限制： 频道内每秒最多能发送 30 个包，且每个包最大为 1 KB。
   * 每个客户端每秒最多能发送 6 KB 数据。
   * 频道内每人最多能同时有 5 个数据通道。 成功调用该方法后，远端会触发 onStreamMessage 回调，远端用户可以在该回调中获取接收到的流消息；
   * 若调用失败，远端会触发 onStreamMessageError 回调。 请确保在调用该方法前，已调用 createDataStream 创建了数据通道。
   * 直播场景下，该方法仅适用于主播用户。
   *
   * @param streamId 数据流 ID。可以通过 createDataStream 获取。
   *
   * @param data 待发送的数据。
   *
   * @param length 数据长度。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract clearVideoWatermark(): number;

  /*
   * 删除已添加的视频水印。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract clearVideoWatermarks(): number;

  /*
   * TODO(doc)
   */
  abstract addInjectStreamUrl(url: string, config: InjectStreamConfig): number;

  /*
   * TODO(doc)
   */
  abstract removeInjectStreamUrl(url: string): number;

  /*
   * 暂停播放音乐文件。
   * 请在加入频道后调用该方法。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract pauseAudio(): number;

  /*
   * 恢复播放音乐文件。
   * 该方法恢复混音，继续播放音乐文件。请在频道内调用该方法。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract resumeAudio(): number;

  /*
   * 打开与 Web SDK 的互通（仅在直播场景适用）。
   * 弃用:
   * 该方法已废弃，SDK 自动开启与 Web SDK 的互通，无需调用该方法开启。 该方法打开或关闭与 Agora Web SDK 的互通。如果有用户通过 Web SDK 加入频道，请确保调用该方法，否则 Web 端用户看 Native 端的画面会是黑屏。
   * 该方法仅在直播场景下适用，通信场景下默认互通是打开的。
   *
   * @param enabled 是否打开与 Agora Web SDK 的互通： true: 打开互通。
   *  false: (默认) 关闭互通。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableWebSdkInteroperability(enabled: boolean): number;

  /*
   * 发送自定义上报消息。
   * 声网提供自定义数据上报和分析服务。该服务当前处于免费内测期。内测期提供的能力为 6 秒内最多上报 10 条数据，每条自定义数据不能超过 256 字节，每个字符串不能超过 100 字节。如需试用该服务，请联系 开通并商定自定义数据格式。
   */
  abstract sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): number;

  /*
   * 注册媒体 metadata 观测器用于接收或发送 metadata。
   * 你需要自行实现 IMetadataObserver 类并在本方法中指定 metadata 类型。本方法允许你为视频流添加同步的 metadata，用于多样化的直播互动，如发送购物链接、电子优惠券和在线测试。
   * 请在 joinChannelWithOptions 前调用该方法。
   *
   * @param observer metadata 观测器。详见 IMetadataObserver 。
   *
   * @param type metadata 类型。目前仅支持 VideoMetadata。详见 MetadataType 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /*
   * 取消注册媒体 metadata 观测器。
   *
   * @param type metadata 类型。目前仅支持 VideoMetadata。详见 MetadataType 。
   *
   * @param observer metadata 观测器，详见 IMetadataObserver 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number;

  /*
   * TODO(doc)
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

  /*
   * TODO(doc)
   */
  abstract stopAudioFrameDump(
    channelId: string,
    userId: number,
    location: string
  ): number;

  /*
   * 注册本地用户 User Account。
   * 该方法为本地用户注册一个 User Account。注册成功后，该 User Account 即可标识该本地用户的身份，用户可以使用它加入频道。
   * 成功注册 User Account 后，本地会触发 onLocalUserRegistered 回调，告知本地用户的 UID 和 User Account。
   * 该方法为可选。如果你希望用户使用 User Account 加入频道，可以选用以下两种方式：
   * 先调用 registerLocalUserAccount 方法注册 Account，再调用 joinChannelWithUserAccount 方法加入频道。
   * 直接调用 joinChannelWithUserAccount 方法加入频道。 两种方式的区别在于，提前调用 registerLocalUserAccount，可以缩短使用 joinChannelWithUserAccount 进入频道的时间。 userAccount 不能为空，否则该方法不生效。
   * 请确保在该方法中设置的 userAccount 在频道中的唯一性。
   * 为保证通信质量，请确保频道内使用同一类型的数据标识用户身份。即同一频道内需要统一使用 UID 或 User Account。 如果有用户通过 Agora Web SDK 加入频道，请确保 Web 加入的用户也是同样类型。
   *
   * @param appId 你的项目在 Agora 控制台注册的 App ID。
   *
   * @param userAccount 用户 User Account。该参数用于标识实时音视频互动频道中的用户。你需要自行设置和管理用户的 User Account，并确保同一频道中每个用户的 User Account 是唯一的。该参数为必填，最大不超过 255 字节，不可填 NULL。以下为支持的字符集范围（共 89 个字符）： 26 个小写英文字母 a-z
   *  26 个大写英文字母 A-Z
   *  10 个数字 0-9
   *  空格
   *  "!"、"#"、"$"、"%"、"&"、"("、")"、"+"、"-"、":"、";"、"<"、"="、"."、">"、"?"、"@"、"["、"]"、"^"、"_"、"{"、"}"、"|"、"~"、","
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract registerLocalUserAccount(appId: string, userAccount: string): number;

  /*
   * TODO(doc)
   */
  abstract joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: ChannelMediaOptions
  ): number;

  /*
   * 通过 User Account 获取用户信息。
   * 远端用户加入频道后，SDK 会获取到该远端用户的 UID 和 User Account，然后缓存一个包含了远端用户 UID 和 User Account 的 Mapping 表，并在本地触发 onUserInfoUpdated 回调。收到这个回调后，你可以调用该方法，通过传入 UID 获取包含了指定用户 User Account 的 UserInfo 对象。
   *
   * @returns
   * 方法调用成功，返回 UserInfo 对象。
   * 方法调用失败，则返回 NULL。
   */
  abstract getUserInfoByUserAccount(userAccount: string): UserInfo;

  /*
   * 通过 UID 获取用户信息。
   * 远端用户加入频道后，SDK 会获取到该远端用户的 UID 和 User Account，然后缓存一个包含了远端用户 UID 和 User Account 的 Mapping 表，并在本地触发 onUserInfoUpdated 回调。收到这个回调后，你可以调用该方法，通过传入 UID 获取包含了指定用户 User Account 的 UserInfo 对象。
   *
   * @param uid
   *
   * @returns
   * 方法调用成功，返回 UserInfo 对象。
   * 方法调用失败，则返回 NULL。
   */
  abstract getUserInfoByUid(uid: number): UserInfo;

  /*
   * 开始跨频道媒体流转发。该方法可用于实现跨频道连麦等场景。
   * 成功调用该方法后，SDK 会触发 onChannelMediaRelayStateChanged 和 onChannelMediaRelayEvent 回调，并在回调中报告当前的跨频道媒体流转发状态和事件。 如果 onChannelMediaRelayStateChanged 回调报告 RelayStateRunning (2) 和 RelayOk (0)，且 onChannelMediaRelayEvent 回调报告 RelayEventPacketSentToDestChannel (4)， 则表示 SDK 开始在源频道和目标频道之间转发媒体流。
   * 如果 onChannelMediaRelayStateChanged 回调报告 RelayStateFailure (3)， 则表示跨频道媒体流转发出现异常。
   * 请在成功加入频道后调用该方法。
   * 在直播场景中，只有角色为主播的用户才能调用该方法。
   * 成功调用该方法后，若你想再次调用该方法，必须先调用 stopChannelMediaRelay 方法退出当前的转发状态。
   * 跨频道媒体流转发功能需要联系技术支持开通。
   * 该功能不支持 String 型 UID。
   *
   * @returns
   * 0：方法调用成功
   * < 0：方法调用失败
   */
  abstract startChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /*
   * 更新媒体流转发的频道。
   * 成功开始跨频道转发媒体流后，如果你希望将流转发到多个目标频道，或退出当前的转发频道，可以调用该方法。
   * 成功调用该方法后，SDK 会触发 onChannelMediaRelayEvent 回调， 并在回调中报告状态码 RelayEventPacketUpdateDestChannel (7)。
   * 请在成功调用 startChannelMediaRelay 方法并收到 onChannelMediaRelayStateChanged (RelayStateRunning, RelayOk) 后调用该方法；否则，方法调用会失败。
   *
   * @param configuration 跨频道媒体流转发参数配置。详见 ChannelMediaRelayConfiguration 。
   *
   * @returns
   * 0：方法调用成功
   * < 0：方法调用失败
   */
  abstract updateChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number;

  /*
   * 停止跨频道媒体流转发。一旦停止，主播会退出所有目标频道。
   * 成功调用该方法后，SDK 会触发 onChannelMediaRelayStateChanged 回调。如果报告 RelayStateIdle (0) 和 RelayOk (0)，则表示已停止转发媒体流。 如果该方法调用不成功，SDK 会触发 onChannelMediaRelayStateChanged 回调，并报告状态码 RelayErrorServerNoResponse (2) 或 RelayErrorServerConnectionLost (8)。你可以调用 leaveChannel 方法离开频道，跨频道媒体流转发会自动停止。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract stopChannelMediaRelay(): number;

  /*
   * 暂停向所有目标频道转发媒体流。
   * 开始跨频道转发媒体流后，如果你需要暂停向所有频道转发媒体流，可以调用该方法；暂停后，如果要恢复跨频道媒体流转发，可以调用 resumeAllChannelMediaRelay 方法。
   * 成功调用该方法后，SDK 会触发 onChannelMediaRelayEvent 回调，并在回调中报告是否成功暂停媒体流转发。
   * 该方法需要在 startChannelMediaRelay 后调用。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract pauseAllChannelMediaRelay(): number;

  /*
   * 恢复向所有目标频道转发媒体流。
   * 调用 pauseAllChannelMediaRelay 方法后，如果你需要恢复向所有目标频道转发媒体流，可以调用该方法。
   * 成功调用该方法后，SDK 会触发 onChannelMediaRelayEvent 回调，并在回调中报告是否成功恢复媒体流转发。
   * 该方法需要在 pauseAllChannelMediaRelay 后调用。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract resumeAllChannelMediaRelay(): number;

  /*
   * 设置主播端直接向 CDN 推流时的音频编码属性。
   * 该方法仅对麦克风采集或自采集的音频有效，即对在 DirectCdnStreamingMediaOptions 中设置 publishMicrophoneTrack 或 publishCustomAudioTrack 为 true 时所采集的音频有效。
   *
   * @param profile 音频编码属性，包含采样率、码率、编码模式和声道数。详见 AudioProfileType 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): number;

  /*
   * 设置主播端直接向 CDN 推流时的视频编码属性。
   * 该方法仅对摄像头采集、屏幕共享或自采集的视频有效。即对在 DirectCdnStreamingMediaOptions 中设置 publishCameraTrack 或 publishCustomVideoTrack 为 true 时所采集的视频有效。
   *
   * @param config 视频编码参数配置。详见 VideoEncoderConfiguration 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setDirectCdnStreamingVideoConfiguration(
    config: VideoEncoderConfiguration
  ): number;

  /*
   * 设置主播端开始直接向 CDN 推流。
   * Agora 不支持同一时间向同一个 URL 重复推流。
   * 媒体选项说明
   * Agora 不支持 publishCameraTrack 和 publishCustomVideoTrack 同时为 true，也不支持 publishMicrophoneTrack 和 publishCustomAudioTrack 同时为 true。你可以根据场景需求设置媒体选项 ( DirectCdnStreamingMediaOptions )。示例如下：
   * 如果你想推送主播端采集的音视频流，请将媒体选项进行如下设置： publishCameraTrack 设为 true
   * publishMicrophoneTrack 设为 true
   * 确保 publishCustomAudioTrack 为 false(默认值)
   * 确保 publishCustomVideoTrack 为 false(默认值)
   *
   * @param eventHandler 详见 onDirectCdnStreamingStateChanged 及 onDirectCdnStreamingStats 。
   *
   * @param publishUrl CDN 推流 URL。
   *
   * @param options 主播端的媒体选项。详见 DirectCdnStreamingMediaOptions 。
   */
  abstract startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number;

  /*
   * 设置主播端停止直接向 CDN 推流。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract stopDirectCdnStreaming(): number;

  /*
   * TODO(doc)
   */
  abstract updateDirectCdnStreamingMediaOptions(
    options: DirectCdnStreamingMediaOptions
  ): number;

  /*
   * 获取视频截图。
   * 该方法用于对指定用户的视频流进行截图，生成一张 JPG 格式的图片，并保存至指定的路径。
   * 该方法是异步操作，调用返回时 SDK 并没有真正获取截图。成功调用该方法后，SDK 会触发 onSnapshotTaken 回调报告截图是否成功和获取截图的详情。 该方法需要在加入频道后调用。
   * 如果用户的视频经过前处理，例如，添加了水印或美颜，生成的截图会包含前处理效果。
   *
   * @param config 截图设置，详见 SnapShotConfig 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract takeSnapshot(config: SnapShotConfig): number;

  /*
   * TODO(doc)
   */
  abstract SetContentInspect(config: ContentInspectConfig): number;

  /*
   * TODO(doc)
   */
  abstract switchChannel(token: string, channel: string): number;

  /*
   * 开启虚拟节拍器。
   * 在音乐教学、体育教学等场景中，老师通常需要使用节拍器，让学生跟着正确的节拍练习。 节拍由强拍和弱拍组成，每小节的第一拍称为强拍，其余称为弱拍。
   * 你需要在该方法中设置强拍和弱拍的文件路径、每小节的拍数、节拍速度以及是否将节拍器的声音发送至远端。 开启虚拟节拍器后，SDK 会从头开始播放指定的音频文件，并根据你在 AgoraRhythmPlayerConfig 中设置的 beatsPerMinute 控制每个文件的播放时长。例如，将 beatsPerMinute 设为 60，则 SDK 会 1 秒播放 1 个节拍。如果文件时长超过了节拍时长，则 SDK 只播放节拍时长部分的音频。
   *
   * @param sound1 强拍文件的绝对路径或 URL 地址，需精确到文件名及后缀。例如 C:\music\audio.mp4。支持的音频文件格式见 Agora RTC SDK 支持播放哪些格式的音频文件。
   *
   * @param sound2 弱拍文件的绝对路径或 URL 地址，需精确到文件名及后缀。例如 C:\music\audio.mp4。支持的音频文件格式见 Agora RTC SDK 支持播放哪些格式的音频文件。
   *
   * @param config 节拍器配置。详见 AgoraRhythmPlayerConfig 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   * -22: 无法找到音频文件。请填写正确的 sound1 和 sound2。
   */
  abstract startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: AgoraRhythmPlayerConfig
  ): number;

  /*
   * 关闭虚拟节拍器。
   * 调用 startRhythmPlayer 后，你可以调用该方法关闭虚拟节拍器。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract stopRhythmPlayer(): number;

  /*
   * 配置虚拟节拍器。
   * 开启虚拟节拍器后，SDK 会从头开始播放指定的音频文件，并根据你在 AgoraRhythmPlayerConfig 中设置的 beatsPerMinute 控制每个文件的播放时长。例如，将 beatsPerMinute 设为 60，则 SDK 会 1 秒播放 1 个节拍。如果文件时长超过了节拍时长，则 SDK 只播放节拍时长部分的音频。
   * 调用 startRhythmPlayer 后，你可以调用该方法重新配置虚拟节拍器。
   *
   * @param config 节拍器配置。详见 AgoraRhythmPlayerConfig 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract configRhythmPlayer(config: AgoraRhythmPlayerConfig): number;

  /*
   * TODO(doc)
   */
  abstract adjustCustomAudioPublishVolume(
    sourceId: number,
    volume: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract adjustCustomAudioPlayoutVolume(
    sourceId: number,
    volume: number
  ): number;

  /*
   *  设置 Agora 云代理服务。
   * 当用户的网络访问受到防火墙限制时，你需要将 Agora 提供的 IP 和端口号添加到防火墙白名单，然后调用该方法开启云代理，并通过 proxyType 参数设置云代理类型。
   * 成功连接云代理后，SDK 会触发 onConnectionStateChanged (ConnectionStateConnecting, ConnectionChangedSettingProxyServer) 回调。 如果你想关闭已设置的 Force UDP 或 Force TCP 云代理，请调用 setCloudProxy (NoneProxy)。
   * 如果你想更改已设置的云代理类型，请先调用 setCloudProxy (NoneProxy)，再调用 setCloudProxy 并传入你期望的 proxyType 值。
   * Agora 推荐你在频道外调用该方法。
   * 如果用户处于内网防火墙环境下，使用 Force UDP 云代理时，旁路推流和跨频道媒体流转发功能不可用。
   * 使用 Force UDP 云代理时，调用 startAudioMixing 方法时无法播放 HTTP 协议的在线音频文件。旁路推流和跨频道媒体流转发功能会使用 TCP 协议的云代理。
   *
   * @param proxyType 云代理类型，详见 CloudProxyType 。
   *  该参数为必填参数，如果你不赋值，SDK 会报错。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2: 传入的参数无效。
   * -7: SDK 尚未初始化。
   */
  abstract setCloudProxy(proxyType: CloudProxyType): number;

  /*
   * TODO(doc)
   */
  abstract setLocalAccessPoint(config: LocalAccessPointConfiguration): number;

  /*
   * TODO(doc)
   */
  abstract enableFishCorrection(
    enabled: boolean,
    params: FishCorrectionParams
  ): number;

  /*
   * 设置音频的高级选项。
   * 如果你对音频处理有进阶需求，例如需要采集和发送立体声，可以调用该方法设置音频的高级选项。 你需要在 joinChannelWithOptions 、 enableAudio 和 enableLocalAudio 前调用该方法。
   */
  abstract setAdvancedAudioOptions(options: AdvancedAudioOptions): number;

  /*
   *  设置发流端音画同步。
   * 同一用户可能使用两个设备分别发送音频流和视频流，为保证接收端听到和看到的音频和视频的时间同步性，你可以在视频发送端调用该方法，并传入音频发送端的频道名、用户 ID。 SDK 会以发送的音频流的时间戳为基准进行自动调节发送的视频流，以保证即使在两个发送端的上行网络情况不一致（如分别使用 Wi-Fi 和 4G 网络）的情况下，也能让接收到的音视频具有时间同步性。
   * Agora 推荐你在加入频道前调用该方法。
   *
   * @param channelId 标识音频发送端所在频道的频道名。
   *
   * @param uid 音频发送端的用户 ID。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAVSyncSource(channelId: string, uid: number): number;

  /*
   * 加入频道。
   * 在网络状况不理想的情况下，客户端可能会与 Agora 服务器失去连接；SDK 会自动尝试重连，重连成功后，本地会触发 onRejoinChannelSuccess 回调。
   * 成功调用该方法加入频道后会触发以下回调：
   * 本地会触发 onJoinChannelSuccess 和 onConnectionStateChanged 回调。
   * 通信场景下的用户和直播场景下的主播加入频道后，远端会触发 onUserJoined 回调。 该方法让用户加入通话频道，在同一个频道内的用户可以互相通话，多个用户加入同一个频道，可以群聊。 使用不同 App ID 的 app 不能互通。
   * 用户成功加入频道后，默认订阅频道内所有其他用户的音频流和视频流，因此产生用量并影响计费。如果想取消订阅，可以通过调用相应的 mute 方法实现。
   *
   * @param channelId 频道名。该参数标识用户进行实时音视频互动的频道。App ID 一致的前提下，填入相同频道名的用户会进入同一个频道进行音视频互动。该参数为长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）: 26 个小写英文字母 a~z
   *  26 个大写英文字母 A~Z
   *  10 个数字 0~9
   *  空格
   *  "!"、"#"、"$"、"%"、"&"、"("、")"、"+"、"-"、":"、";"、"<"、"="、"."、">"、"?"、"@"、"["、"]"、"^"、"_"、"{"、"}"、"|"、"~"、","
   *
   * @param token 在服务端生成的用于鉴权的动态密钥。详见
   *
   * @param info (非必选项) 预留参数。
   *
   * @param uid 用户 ID。该参数用于标识在实时音视频互动频道中的用户。你需要自行设置和管理用户 ID，并确保同一频道内的每个用户 ID 是唯一的。该参数为 32 位无符号整数。 建议设置范围：1 到 232-1。如果不指定（即设为 0），SDK 会自动分配一个，并在 onJoinChannelSuccess 回调中返回， 应用层必须记住该返回值并维护，SDK 不对该返回值进行维护。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。 -2：传入的参数无效。例如，使用了不合法的 Token，uid 参数未设置为整型， ChannelMediaOptions 结构体成员值不合法。你需要填入有效的参数，重新加入频道。
   * -3： IRtcEngine 对象初始化失败。你需要重新初始化 IRtcEngine 对象。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   * -8：IRtcEngine 对象内部状态错误。可能的原因是：调用 startEchoTest 开始通话回路测试后，未调用 stopEchoTest 停止测试就调用该方法加入频道。你需要在该方法前调用 stopEchoTest。
   * -17：加入频道被拒绝。可能的原因是用户已经在频道中。Agora 推荐通过 onConnectionStateChanged 回调判断用户是否在频道中。除收到 ConnectionStateDisconnected(1) 状态外，不要再次调用该方法加入频道。
   * -102：频道名无效。你需要在 channelId 中填入有效的频道名，重新加入频道。
   * -121：用户 ID 无效。你需要在 uid 中填入有效的用户 ID，重新加入频道。
   */
  abstract joinChannel(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): number;

  /*
   * 设置媒体选项并加入频道。
   * 该方法让用户加入通话频道，在同一个频道内的用户可以互相通话，多个用户加入同一个频道，可以群聊。 使用不同 App ID 的 app 不能互通。
   * 成功调用该方法加入频道后会触发以下回调：
   * 本地会触发 onJoinChannelSuccess 和 onConnectionStateChanged 回调。
   * 通信场景下的用户和直播场景下的主播加入频道后，远端会触发 onUserJoined 回调。 在网络状况不理想的情况下，客户端可能会与 Agora 服务器失去连接；SDK 会自动尝试重连，重连成功后，本地会触发 onRejoinChannelSuccess 回调。 该方法允许用户一次加入仅一个频道。
   * 请务必确保用于生成 Token 的 App ID 和 initialize 方法初始化引擎时用的是同一个 App ID，否则使用 Token 加入频道失败。
   *
   * @param token 在服务端生成的用于鉴权的动态密钥。详见
   *
   * @param channelId 频道名。该参数标识用户进行实时音视频互动的频道。App ID 一致的前提下，填入相同频道名的用户会进入同一个频道进行音视频互动。该参数为长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）: 26 个小写英文字母 a~z
   *  26 个大写英文字母 A~Z
   *  10 个数字 0~9
   *  空格
   *  "!"、"#"、"$"、"%"、"&"、"("、")"、"+"、"-"、":"、";"、"<"、"="、"."、">"、"?"、"@"、"["、"]"、"^"、"_"、"{"、"}"、"|"、"~"、","
   *
   * @param uid 用户 ID。该参数用于标识在实时音视频互动频道中的用户。你需要自行设置和管理用户 ID，并确保同一频道内的每个用户 ID 是唯一的。该参数为 32 位无符号整数。 建议设置范围：1 到 232-1。如果不指定（即设为 0），SDK 会自动分配一个，并在 onJoinChannelSuccess 回调中返回， app 层必须记住该返回值并维护，SDK 不对该返回值进行维护。
   *
   * @param options 频道媒体设置选项。详见 ChannelMediaOptions 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。 -2：传入的参数无效。例如，使用了不合法的 Token，uid 参数未设置为整型， ChannelMediaOptions 结构体成员值不合法。你需要填入有效的参数，重新加入频道。
   * -3： IRtcEngine 对象初始化失败。你需要重新初始化 IRtcEngine 对象。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   * -8：IRtcEngine 对象内部状态错误。可能的原因是：调用 startEchoTest 开始通话回路测试后，未调用 stopEchoTest 停止测试就调用该方法加入频道。你需要在该方法前调用 stopEchoTest。
   * -17：加入频道被拒绝。可能的原因是用户已经在频道中。Agora 推荐通过 onConnectionStateChanged 回调判断用户是否在频道中。除收到 ConnectionStateDisconnected(1) 状态外，不要再次调用该方法加入频道。
   * -102：频道名无效。你需要在 channelId 中填入有效的频道名，重新加入频道。
   * -121：用户 ID 无效。你需要在 uid 中填入有效的用户 ID，重新加入频道。
   */
  abstract joinChannelWithOptions(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number;

  /*
   * 离开频道。
   * 该方法会把会话相关的所有资源释放掉。该方法是异步操作，调用返回时并没有真正退出频道。
   * 成功调用该方法离开频道后会触发以下回调：
   * 本地： onLeaveChannel 回调。
   * 远端：通信场景下的用户和直播场景下的主播离开频道后，远端会触发 onUserOffline 回调。
   * 如果你调用了本方法后立即调用 release 方法，SDK 将无法触发 onLeaveChannel 回调。
   * 如果你在旁路推流过程中调用了本方法离开频道，SDK 将自动调用 removePublishStreamUrl 方法。
   *
   * @returns
   * 0(ERR_OK): 方法调用成功。
   * < 0: 方法调用失败。 -1(ERR_FAILED): 一般性的错误（未明确归类）。
   * -2(ERR_INVALID_ARGUMENT): 参数无效。
   * -7(ERR_NOT_INITIALIZED): SDK 尚未初始化。
   */
  abstract leaveChannel(options?: LeaveChannelOptions): number;

  /*
   * 设置直播场景下的用户角色和级别。
   * 直播场景下，SDK 会默认设置用户角色为观众，你可以调用该方法设置用户角色为主播。
   * 该方法在加入频道前后均可调用。
   * 如果你在加入频道前调用该方法设置用户角色为主播、并且通过 setupLocalVideo 方法设置了本地视频属性，则用户加入频道时会自动开启本地视频预览。
   * 如果你在加入频道后调用该方法切换用户角色，调用成功后，SDK 会自动进行如下操作： 调用 muteLocalAudioStream 和 muteLocalVideoStream 修改发布状态。
   * 本地触发 onClientRoleChanged 回调。
   * 远端触发 onUserJoined 或 onUserOffline 回调。 该方法仅适用于直播场景（ setChannelProfile 中 profile 设为 ChannelProfileLiveBroadcasting）。
   *
   * @param role 直播场景中的用户角色。详见 ClientRoleType 。
   *
   * @param options 用户具体设置，包含用户级别。详见 ClientRoleOptions 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -1: 一般性的错误（未明确归类）。
   * -2: 参数无效。
   * -5: 调用被拒绝。
   * -7: SDK 尚未初始化。
   */
  abstract setClientRole(
    role: ClientRoleType,
    options?: ClientRoleOptions
  ): number;

  /*
   *  开始语音通话回路测试。
   * 该方法启动语音通话测试，目的是测试系统的音频设备（耳麦、扬声器等）和网络连接是否正常。在测试过程中，用户先说一段话，声音会在设置的时间间隔（单位为秒）后回放出来。如果用户能正常听到自己刚才说的话，就表示系统音频设备和网络连接都是正常的。 请在加入频道前调用该方法。 调用 startEchoTest 后必须调用 stopEchoTest 以结束测试，否则不能进行下一次回声测试，也无法加入频道。 直播场景下，该方法仅能由用户角色为主播的用户调用。
   *
   * @param intervalInSeconds 设置返回语音通话回路测试结果的时间间隔，取值范围为 [2,10]，单位为秒，默认为 10 秒。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract startEchoTest(intervalInSeconds?: number): number;

  /*
   * 开启视频预览。
   * 该方法用于在进入频道前启动本地视频预览。调用该 API 前，必须：
   * 调用 enableVideo 开启视频功能。
   * 本地预览默认开启镜像功能。
   * 如果调用 leaveChannel [1/2] 退出频道，本地预览依然处于开启状态，如需要关闭本地预览，需要调用 stopPreview 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract startPreview(sourceType?: VideoSourceType): number;

  /*
   * 停止视频预览。
   * 调用 startPreview [1/2] 开启预览后，如果你想关闭本地视频预览，请调用该方法。
   * 请在加入频道前或离开频道后调用该方法。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract stopPreview(sourceType?: VideoSourceType): number;

  /*
   * 设置音频编码属性和音频场景。
   * 该方法在加入频道前后均可调用。
   * 在有高音质需求的场景（例如音乐教学场景）中，建议将 profile 设置为 AudioProfileMusicHighQuality(4)，scenario 设置为 AudioScenarioGameStreaming(3) 或 AudioScenarioHighDefinition(6)。
   *
   * @param profile 音频编码属性，包含采样率、码率、编码模式和声道数。详见 AudioProfileType 。
   *
   * @param scenario 音频场景。详见 AudioScenarioType 。不同的音频场景下，设备的音量类型是不同的。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAudioProfile(
    profile: AudioProfileType,
    scenario?: AudioScenarioType
  ): number;

  /*
   * 开始客户端录音。
   * Agora SDK 支持通话过程中在客户端进行录音。调用该方法后，你可以录制频道内用户的音频，并得到一个录音文件。录音文件格式可以为:
   * WAV: 音质保真度较高，文件较大。例如，采样率为 32000 Hz，录音时长为 10 分钟的文件大小约为 73 M。
   * AAC: 音质保真度较低，文件较小。例如，采样率为 32000 Hz，录音音质为 AudioRecordingQualityMedium，录音时长为 10 分钟的文件大小约为 2 M。 用户离开频道后，录音会自动停止。
   * 该方法需要在加入频道后调用。
   *
   * @param config 录音配置。详见 AudioRecordingConfiguration 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract startAudioRecording(config: AudioRecordingConfiguration): number;

  /*
   * 开始播放音乐文件。
   * 该方法支持将本地或在线音乐文件和麦克风采集的音频进行混音或替换。成功播放音乐文件后，本地会触发 onAudioMixingStateChanged (AudioMixingStatePlaying) 回调。播放结束后，本地会触发 onAudioMixingStateChanged(AudioMixingStateStopped) 回调。 该方法支持的音频文件格式见 Agora RTC SDK 支持播放哪些格式的音频文件。
   * 该方法在加入频道前后均调用。如需多次调用 startAudioMixing，请确保调用间隔大于 500 ms。
   * 如果本地音乐文件不存在、文件格式不支持或无法访问在线音乐文件 URL，则 SDK 会报告警告码 701。
   * 在 Android 平台上调用该方法时，请注意如下事项： 请确保使用 Android 4.2 或以上设备，且 API Level 不低于 16。
   * 如果播放的是在线音乐文件，Agora 建议不要使用重定向地址。重定向地址在某些机型上可能无法打开。
   * 如果在模拟器上调用该方法，则请确保音乐文件在 /sdcard/ 目录下，且格式为 MP3。
   *
   * @param filePath 文件路径： Android: 文件路径，需精确到文件名及后缀。支持在线文件的 URL 地址，本地文件的 URI 地址、绝对路径或以 /assets/ 开头的路径。
   *  通过绝对路径访问本地文件可能会遇到权限问题，Agora 推荐使用 URI 地址访问本地文件。例如 content://com.android.providers.media.documents/document/audio%3A14441。
   *  iOS : 音频文件的绝对路径或 URL 地址，需精确到文件名及后缀。例如 /var/mobile/Containers/Data/audio.mp4。
   *
   * @param loopback 是否只在本地播放音乐文件： true: 只在本地播放音乐文件，只有本地用户能听到音乐。
   *  false: 将本地播放的音乐文件发布至远端，本地用户和远端用户都能听到音乐。
   *
   * @param replace 是否用音乐文件替换麦克风采集的音频： true: 替换。用户只能听到音乐。
   *  false: 不替换。用户可以听到音乐和麦克风采集的音频。
   *
   * @param cycle 音乐文件的播放次数。 ≥ 0: 播放次数。例如，0 表示不播放；1 表示播放 1 次。
   *  -1: 无限循环播放。
   *
   * @param startPos 音乐文件的播放位置，单位为毫秒。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number,
    startPos?: number
  ): number;

  /*
   * 更新本地视图显示模式。
   * 初始化本地用户视图后，你可以调用该方法更新本地用户视图的渲染和镜像模式。该方法只影响本地用户看到的视频画面，不影响本地发布视频。 请在调用 setupLocalVideo 方法初始化本地视图后，调用该方法。
   * 你可以在通话中多次调用该方法，多次更新本地用户视图的显示模式。
   *
   * @param renderMode 本地视图显示模式。详见 RenderModeType 。
   *
   * @param mirrorMode 本地视图的镜像模式，详见 VideoMirrorModeType 。
   *  如果你使用前置摄像头，默认启动本地用户视图镜像模式；如果你使用后置摄像头，默认关闭本地视图镜像模式。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode?: VideoMirrorModeType
  ): number;

  /*
   * 开关双流模式。
   * 你可以在发流端调用该方法开启或关闭双流模式。双流指视频大流和视频小流： 视频大流：高分辨率、高帧率的视频流。
   * 视频小流：低分辨率、低帧率的视频流。 开启双流模式后，你可以在收流端调用 setRemoteVideoStreamType 选择接收视频大流或视频小流。 该方法可以在加入频道前后调用。
   *
   * @param sourceType 视频源的类型。详见 VideoSourceType 。
   *
   * @param enabled 是否开启双流模式： true: 开启双流模式。
   *  false: 关闭双流模式。
   *
   * @param streamConfig 视频小流的配置。详见 SimulcastStreamConfig
   *
   * @returns
   * 0: 方法调用成功
   * 0: 方法调用失败
   */
  abstract enableDualStreamMode(
    enabled: boolean,
    sourceType?: VideoSourceType,
    streamConfig?: SimulcastStreamConfig
  ): number;

  /*
   * 创建数据流。
   * 该方法用于创建数据流。每个用户在每个频道中最多只能创建 5 个数据流。
   *
   * @param config 数据流设置。详见 DataStreamConfig 。
   *
   * @returns
   * 创建的数据流的 ID：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract createDataStream(config: DataStreamConfig): number;

  /*
   * 添加本地视频水印。
   * 该方法将一张 PNG 图片作为水印添加到本地发布的直播视频流上，同一直播频道中的用户、旁路直播观众和采集设备都能看到或采集到该水印图片。
   * Agora 当前只支持在直播视频流中添加一个水印，后添加的水印会替换掉之前添加的水印。
   * 水印坐标和 setVideoEncoderConfiguration 方法中的设置有依赖关系： 如果视频编码方向（ OrientationMode ）固定为横屏或自适应模式下的横屏，那么水印使用横屏坐标。
   * 如果视频编码方向（OrientationMode）固定为竖屏或自适应模式下的竖屏，那么水印使用竖屏坐标。
   * 设置水印坐标时，水印的图像区域不能超出 setVideoEncoderConfiguration 方法中设置的视频尺寸，否则超出部分将被裁剪。
   * 你需要在调用 enableVideo 方法之后再调用该方法。
   * 如果你只是在旁路推流时添加水印，你可以使用该方法或 setLiveTranscoding 方法设置水印。
   * 待添加水印图片必须是 PNG 格式。该方法支持所有像素格式的 PNG 图片：RGBA、RGB、Palette、Gray 和 Alpha_gray。
   * 如果待添加的 PNG 图片的尺寸与你在该方法中设置的尺寸不一致，SDK 会对 PNG 图片进行缩放或裁剪，以与设置相符。
   * 如果你已经使用 startPreview 方法开启本地视频预览，那么该方法的 visibleInPreview 可设置水印在预览时是否可见。
   * 如果你已设置本地视频为镜像模式，那么此处的本地水印也为镜像。为避免本地用户看本地视频时的水印也被镜像，Agora 建议你不要对本地视频同时使用镜像和水印功能，请在应用层实现本地水印功能。
   *
   * @param watermarkUrl 待添加的水印图片的本地路径。该方法支持从本地绝对/相对路径添加水印图片。
   *
   * @param options 待添加的水印图片的设置选项，详见 WatermarkOptions 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): number;

  /*
   * 使用 User Account 加入频道，并设置是否自动订阅音频或视频流。
   * 该方法允许本地用户使用 User Account 加入频道。成功加入频道后，会触发以下回调： 本地： onLocalUserRegistered 、 onJoinChannelSuccess 和 onConnectionStateChanged 回调。
   * 远端：通信场景下的用户和直播场景下的主播加入频道后，远端会分别触发 onUserJoined 和 onUserInfoUpdated 回调。 用户成功加入频道后，默认订阅频道内所有其他用户的音频流和视频流，因此产生用量并影响计费。如果想取消订阅，可以通过调用相应的 mute 方法实现。
   * 为保证通信质量，请确保频道内使用同一类型的数据标识用户身份。即同一频道内需要统一使用 UID 或 User Account。如果有用户通过 Agora Web SDK 加入频道，请确保 Web 加入的用户也是同样类型。
   *
   * @param options 频道媒体设置选项。详见 ChannelMediaOptions 。
   *
   * @param token 在服务端生成的用于鉴权的动态密钥。详见
   *
   * @param channelId 频道名。该参数标识用户进行实时音视频互动的频道。App ID 一致的前提下，填入相同频道名的用户会进入同一个频道进行音视频互动。该参数为长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）: 26 个小写英文字母 a~z
   *  26 个大写英文字母 A~Z
   *  10 个数字 0~9
   *  空格
   *  "!"、"#"、"$"、"%"、"&"、"("、")"、"+"、"-"、":"、";"、"<"、"="、"."、">"、"?"、"@"、"["、"]"、"^"、"_"、"{"、"}"、"|"、"~"、","
   *
   * @param userAccount 用户 User Account。该参数用于标识实时音视频互动频道中的用户。你需要自行设置和管理用户的 User Account，并确保同一频道中每个用户的 User Account 是唯一的。 该参数为必填，最大不超过 255 字节，不可填 NULL。以下为支持的字符集范围（共 89 个字符）： 26 个小写英文字母 a-z
   *  26 个大写英文字母 A-Z
   *  10 个数字 0-9
   *  空格
   *  "!"、"#"、"$"、"%"、"&"、"("、")"、"+"、"-"、":"、";"、"<"、"="、"."、">"、"?"、"@"、"["、"]"、"^"、"_"、"{"、"}"、"|"、"~"、","
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。 -2：传入的参数无效。例如，使用了不合法的 Token，uid 参数未设置为整型， ChannelMediaOptions 结构体成员值不合法。你需要填入有效的参数，重新加入频道。
   * -3： IRtcEngine 对象初始化失败。你需要重新初始化 IRtcEngine 对象。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   * -8：IRtcEngine 对象内部状态错误。可能的原因是：调用 startEchoTest 开始通话回路测试后，未调用 stopEchoTest 停止测试就调用该方法加入频道。你需要在该方法前调用 stopEchoTest。
   * -17：加入频道被拒绝。可能的原因是用户已经在频道中。Agora 推荐通过 onConnectionStateChanged 回调判断用户是否在频道中。除收到 ConnectionStateDisconnected(1) 状态外，不要再次调用该方法加入频道。
   * -102：频道名无效。你需要在 channelId 中填入有效的频道名，重新加入频道。
   * -121：用户 ID 无效。你需要在 uid 中填入有效的用户 ID，重新加入频道。
   */
  abstract joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number;

  /*
   * TODO(doc)
   */
  abstract getAudioDeviceManager(): IAudioDeviceManager;

  /*
   * TODO(doc)
   */
  abstract getVideoDeviceManager(): IVideoDeviceManager;

  /*
   * 发送媒体附属信息。
   * 如果成功发送了媒体附属信息，接收端会收到 onMetadataReceived 回调。
   *
   * @param sourceType 视频源的类型，详见 VideoSourceType 。
   *
   * @param metadata 媒体附属信息。详见 Metadata 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract sendMetaData(
    metadata: Metadata,
    sourceType: VideoSourceType
  ): number;

  /*
   * 设置媒体附属信息的最大大小。
   * 调用 registerMediaMetadataObserver 后，你可以调用本方法来设置媒体附属信息的最大大小。
   *
   * @param size 媒体附属信息的最大大小。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract setMaxMetadataSize(size: number): number;
}

/*
 * 质量报告的格式。
 */
export enum QualityReportFormatType {
  /*
   * 0: 质量报告格式为 JSON。
   */
  QualityReportJson = 0,
  /*
   * 1: 质量报告格式为 HTML。
   */
  QualityReportHtml = 1,
}

/*
 * TODO(doc)
 */
export enum MediaDeviceStateType {
  /*
   * TODO(doc)
   */
  MediaDeviceStateIdle = 0,
  /*
   * TODO(doc)
   */
  MediaDeviceStateActive = 1,
  /*
   * TODO(doc)
   */
  MediaDeviceStateDisabled = 2,
  /*
   * TODO(doc)
   */
  MediaDeviceStateNotPresent = 4,
  /*
   * TODO(doc)
   */
  MediaDeviceStateUnplugged = 8,
}

/*
 * 视频属性。
 */
export enum VideoProfileType {
  /*
   * 0：分辨率 160 × 120，帧率 15 fps，码率 65 Kbps。
   */
  VideoProfileLandscape120p = 0,
  /*
   * 2：分辨率 120 × 120，帧率 15 fps，码率 50 Kbps。
   */
  VideoProfileLandscape120p3 = 2,
  /*
   * 10：分辨率 320 × 180，帧率 15 fps，码率 140 Kbps。
   */
  VideoProfileLandscape180p = 10,
  /*
   * 12：分辨率 180 × 180，帧率 15 fps，码率 100 Kbps。
   */
  VideoProfileLandscape180p3 = 12,
  /*
   * 13：分辨率 240 × 180，帧率 15 fps，码率 120 Kbps。
   */
  VideoProfileLandscape180p4 = 13,
  /*
   * 20：分辨率 320 × 240，帧率 15 fps，码率 200 Kbps。
   */
  VideoProfileLandscape240p = 20,
  /*
   * 22：分辨率 240 × 240，帧率 15 fps，码率 140 Kbps。
   */
  VideoProfileLandscape240p3 = 22,
  /*
   * 23：分辨率 424 × 240，帧率 15 fps，码率 220 Kbps。
   */
  VideoProfileLandscape240p4 = 23,
  /*
   * 30：分辨率 640 × 360，帧率 15 fps，码率 400 Kbps。
   */
  VideoProfileLandscape360p = 30,
  /*
   * 32：分辨率 360 × 360，帧率 15 fps，码率 260 Kbps。
   */
  VideoProfileLandscape360p3 = 32,
  /*
   * 33：分辨率 640 × 360，帧率 30 fps，码率 600 Kbps。
   */
  VideoProfileLandscape360p4 = 33,
  /*
   * 35：分辨率 360 × 360，帧率 30 fps，码率 400 Kbps。
   */
  VideoProfileLandscape360p6 = 35,
  /*
   * 36：分辨率 480 × 360，帧率 15 fps，码率 320 Kbps。
   */
  VideoProfileLandscape360p7 = 36,
  /*
   * 37：分辨率 480 × 360，帧率 30 fps，码率 490 Kbps。
   */
  VideoProfileLandscape360p8 = 37,
  /*
   * 38：分辨率 640 × 360，帧率 15 fps，码率 800 Kbps。
   * 该视频属性仅适用于直播频道场景。
   */
  VideoProfileLandscape360p9 = 38,
  /*
   * 39：分辨率 640 × 360，帧率 24 fps，码率 800 Kbps。
   * 该视频属性仅适用于直播频道场景。
   */
  VideoProfileLandscape360p10 = 39,
  /*
   * 100: 分辨率 640 × 360，帧率 24 fps，码率 1000 Kbps。
   * 该视频属性仅适用于直播频道场景。
   */
  VideoProfileLandscape360p11 = 100,
  /*
   * 40：分辨率 640 × 480，帧率 15 fps，码率 500 Kbps。
   */
  VideoProfileLandscape480p = 40,
  /*
   * 42：分辨率 480 × 480，帧率 15 fps，码率 400 Kbps。
   */
  VideoProfileLandscape480p3 = 42,
  /*
   * 43：分辨率 640 × 480，帧率 30 fps，码率 750 Kbps。
   */
  VideoProfileLandscape480p4 = 43,
  /*
   * 45：分辨率 480 × 480，帧率 30 fps，码率 600 Kbps。
   */
  VideoProfileLandscape480p6 = 45,
  /*
   * 47：分辨率 848 × 480，帧率 15 fps，码率 610 Kbps。
   */
  VideoProfileLandscape480p8 = 47,
  /*
   * 48：分辨率 848 × 480，帧率 30 fps，码率 930 Kbps。
   */
  VideoProfileLandscape480p9 = 48,
  /*
   * 49：分辨率 640 × 480，帧率 10 fps，码率 400 Kbps。
   */
  VideoProfileLandscape480p10 = 49,
  /*
   * 50：分辨率 1280 × 720，帧率 15 fps，码率 1130 Kbps。
   */
  VideoProfileLandscape720p = 50,
  /*
   * 52：分辨率 1280 × 720，帧率 30 fps，码率 1710 Kbps。
   */
  VideoProfileLandscape720p3 = 52,
  /*
   * 54：分辨率 960 × 720，帧率 15 fps，码率 910 Kbps。
   */
  VideoProfileLandscape720p5 = 54,
  /*
   * 55：分辨率 960 × 720，帧率 30 fps，码率 1380 Kbps。
   */
  VideoProfileLandscape720p6 = 55,
  /*
   * 60：分辨率 1920 × 1080，帧率 15 fps，码率 2080 Kbps。
   */
  VideoProfileLandscape1080p = 60,
  /*
   * 62：分辨率 1920 × 1080，帧率 30 fps，码率 3150 Kbps。
   */
  VideoProfileLandscape1080p3 = 62,
  /*
   * 64：分辨率 1920 × 1080，帧率 60 fps，码率 4780 Kbps。
   */
  VideoProfileLandscape1080p5 = 64,
  /*
   * TODO(doc)
   */
  VideoProfileLandscape1440p = 66,
  /*
   * TODO(doc)
   */
  VideoProfileLandscape1440p2 = 67,
  /*
   * TODO(doc)
   */
  VideoProfileLandscape4k = 70,
  /*
   * TODO(doc)
   */
  VideoProfileLandscape4k3 = 72,
  /*
   * 1000: 分辨率 120 × 160，帧率 15 fps，码率 65 Kbps。
   */
  VideoProfilePortrait120p = 1000,
  /*
   * 1002: 分辨率 120 × 120，帧率 15 fps，码率 50 Kbps。
   */
  VideoProfilePortrait120p3 = 1002,
  /*
   * 1010: 分辨率 180 × 320，帧率 15 fps，码率 140 Kbps。
   */
  VideoProfilePortrait180p = 1010,
  /*
   * 1012: 分辨率 180 × 180，帧率 15 fps，码率 100 Kbps。
   */
  VideoProfilePortrait180p3 = 1012,
  /*
   * 1013: 分辨率 180 × 240，帧率 15 fps，码率 120 Kbps。
   */
  VideoProfilePortrait180p4 = 1013,
  /*
   * 1020: 分辨率 240 × 320，帧率 15 fps，码率 200 Kbps。
   */
  VideoProfilePortrait240p = 1020,
  /*
   * 1022: 分辨率 240 × 240，帧率 15 fps，码率 140 Kbps。
   */
  VideoProfilePortrait240p3 = 1022,
  /*
   * 1023: 分辨率 240 × 424，帧率 15 fps，码率 220 Kbps。
   */
  VideoProfilePortrait240p4 = 1023,
  /*
   * 1030: 分辨率 360 × 640，帧率 15 fps，码率 400 Kbps。
   */
  VideoProfilePortrait360p = 1030,
  /*
   * 1032: 分辨率 360 × 360，帧率 15 fps，码率 260 Kbps。
   */
  VideoProfilePortrait360p3 = 1032,
  /*
   * 1033: 分辨率 360 × 640，帧率 30 fps，码率 600 Kbps。
   */
  VideoProfilePortrait360p4 = 1033,
  /*
   * 1035: 分辨率 360 × 360，帧率 30 fps，码率 400 Kbps。
   */
  VideoProfilePortrait360p6 = 1035,
  /*
   * 1036: 分辨率 360 × 480，帧率 15 fps，码率 320 Kbps。
   */
  VideoProfilePortrait360p7 = 1036,
  /*
   * 1037: 分辨率 360 × 480，帧率 30 fps，码率 490 Kbps。
   */
  VideoProfilePortrait360p8 = 1037,
  /*
   * 1038: 分辨率 360 × 640，帧率 15 fps，码率 800 Kbps。
   * 该视频属性仅适用于直播频道场景。
   */
  VideoProfilePortrait360p9 = 1038,
  /*
   * 1039: 分辨率 360 × 640，帧率 24 fps，码率 800 Kbps。
   * 该视频属性仅适用于直播频道场景。
   */
  VideoProfilePortrait360p10 = 1039,
  /*
   * 1100: 分辨率 360 × 640，帧率 24 fps，码率 1000 Kbps。
   * 该视频属性仅适用于直播频道场景。
   */
  VideoProfilePortrait360p11 = 1100,
  /*
   * 1040: 分辨率 480 × 640，帧率 15 fps，码率 500 Kbps。
   */
  VideoProfilePortrait480p = 1040,
  /*
   * 1042: 分辨率 480 × 480，帧率 15 fps，码率 400 Kbps。
   */
  VideoProfilePortrait480p3 = 1042,
  /*
   * 1043: 分辨率 480 × 640，帧率 30 fps，码率 750 Kbps。
   */
  VideoProfilePortrait480p4 = 1043,
  /*
   * 1045: 分辨率 480 × 480，帧率 30 fps，码率 600 Kbps。
   */
  VideoProfilePortrait480p6 = 1045,
  /*
   * 1047: 分辨率 480 × 848，帧率 15 fps，码率 610 Kbps。
   */
  VideoProfilePortrait480p8 = 1047,
  /*
   * 1048: 分辨率 480 × 848，帧率 30 fps，码率 930 Kbps。
   */
  VideoProfilePortrait480p9 = 1048,
  /*
   * 1049: 分辨率 480 × 640，帧率 10 fps，码率 400 Kbps。
   */
  VideoProfilePortrait480p10 = 1049,
  /*
   * 1050: 分辨率 分辨率 720 × 1280，帧率 15 fps，码率 1130 Kbps。
   */
  VideoProfilePortrait720p = 1050,
  /*
   * 1052: 分辨率 分辨率 720 × 1280，帧率 30 fps，码率 1710 Kbps。
   */
  VideoProfilePortrait720p3 = 1052,
  /*
   * 1054: 分辨率 720 × 960，帧率 15 fps，码率 910 Kbps。
   */
  VideoProfilePortrait720p5 = 1054,
  /*
   * 1055: 分辨率 720 × 960，帧率 30 fps，码率 1380 Kbps。
   */
  VideoProfilePortrait720p6 = 1055,
  /*
   * 1060: 分辨率 1080 × 1920，帧率 15 fps，码率 2080 Kbps。
   */
  VideoProfilePortrait1080p = 1060,
  /*
   * 1062: 分辨率 1080 × 1920，帧率 30 fps，码率 3150 Kbps。
   */
  VideoProfilePortrait1080p3 = 1062,
  /*
   * 1064: 分辨率 1080 × 1920，帧率 60 fps，码率 4780 Kbps。
   */
  VideoProfilePortrait1080p5 = 1064,
  /*
   * TODO(doc)
   */
  VideoProfilePortrait1440p = 1066,
  /*
   * TODO(doc)
   */
  VideoProfilePortrait1440p2 = 1067,
  /*
   * TODO(doc)
   */
  VideoProfilePortrait4k = 1070,
  /*
   * TODO(doc)
   */
  VideoProfilePortrait4k3 = 1072,
  /*
   * （默认）分辨率 640 × 360，帧率 15 fps，码率 400 Kbps。
   */
  VideoProfileDefault = 30,
}

/*
 * SDK 版本信息。
 */
export class SDKBuildInfo {
  /*
   * SDK 编译号。
   */
  build?: number;
  /*
   * SDK 版本号。格式为字符串，如 4.0.0。
   */
  version?: string;
}

/*
 * VideoDeviceInfo 类，包含视频设备的 ID 和设备名称。
 */
export class VideoDeviceInfo {
  /*
   * 设备 ID。
   */
  deviceId?: string;
  /*
   * 设备名称。
   */
  deviceName?: string;
}

/*
 * AudioDeviceInfo 类，包含音频设备的 ID 和设备名称。
 */
export class AudioDeviceInfo {
  /*
   * 设备 ID。
   */
  deviceId?: string;
  /*
   * 设备名称。
   */
  deviceName?: string;
}
