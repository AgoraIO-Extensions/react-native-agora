/*
 * 播放器的状态。
 */
export enum MediaPlayerState {
  /*
   * 0: 默认状态。播放器会在你打开媒体文件之前和结束播放之后返回该状态码。
   */
  PlayerStateIdle = 0,
  /*
   * 正在打开媒体文件。
   */
  PlayerStateOpening = 1,
  /*
   * 成功打开媒体文件。
   */
  PlayerStateOpenCompleted = 2,
  /*
   * 正在播放。
   */
  PlayerStatePlaying = 3,
  /*
   * 暂停播放。
   */
  PlayerStatePaused = 4,
  /*
   * 播放完毕。
   */
  PlayerStatePlaybackCompleted = 5,
  /*
   * 循环播放已结束。
   */
  PlayerStatePlaybackAllLoopsCompleted = 6,
  /*
   * 播放已停止。
   */
  PlayerStateStopped = 7,
  /*
   * TODO(doc)
   */
  PlayerStatePausingInternal = 50,
  /*
   * TODO(doc)
   */
  PlayerStateStoppingInternal = 51,
  /*
   * TODO(doc)
   */
  PlayerStateSeekingInternal = 52,
  /*
   * TODO(doc)
   */
  PlayerStateGettingInternal = 53,
  /*
   * TODO(doc)
   */
  PlayerStateNoneInternal = 54,
  /*
   * TODO(doc)
   */
  PlayerStateDoNothingInternal = 55,
  /*
   * TODO(doc)
   */
  PlayerStateSetTrackInternal = 56,
  /*
   * 100: 播放失败。
   */
  PlayerStateFailed = 100,
}

/*
 * 播放器的错误码。
 */
export enum MediaPlayerError {
  /*
   * 0: 没有错误。
   */
  PlayerErrorNone = 0,
  /*
   * -1: 不正确的参数。
   */
  PlayerErrorInvalidArguments = -1,
  /*
   * TODO(doc)
   */
  PlayerErrorInternal = -2,
  /*
   * -3: 没有 resource。
   */
  PlayerErrorNoResource = -3,
  /*
   * -4: 无效的 resource。
   */
  PlayerErrorInvalidMediaSource = -4,
  /*
   * -5: 未知的媒体流类型。
   */
  PlayerErrorUnknownStreamType = -5,
  /*
   * -6: 对象没有初始化。
   */
  PlayerErrorObjNotInitialized = -6,
  /*
   * -7: 解码器不支持该 codec。
   */
  PlayerErrorCodecNotSupported = -7,
  /*
   * -8: 无效的 renderer。
   */
  PlayerErrorVideoRenderFailed = -8,
  /*
   * -9: 播放器内部状态错误。
   */
  PlayerErrorInvalidState = -9,
  /*
   * -10: 未找到该 URL。
   */
  PlayerErrorUrlNotFound = -10,
  /*
   * -11: 播放器与 Agora 服务器的连接无效。
   */
  PlayerErrorInvalidConnectionState = -11,
  /*
   * -12: 播放缓冲区数据不足。
   */
  PlayerErrorSrcBufferUnderflow = -12,
  /*
   * -13: 播放被异常打断而结束。
   */
  PlayerErrorInterrupted = -13,
  /*
   * -14: SDK 不支持的接口调用。
   */
  PlayerErrorNotSupported = -14,
  /*
   * -15: 媒体资源网络路径的鉴权信息已过期。
   */
  PlayerErrorTokenExpired = -15,
  /*
   * TODO(doc)
   */
  PlayerErrorIpExpired = -16,
  /*
   * -17：未知错误。
   */
  PlayerErrorUnknown = -17,
}

/*
 * 媒体流的类型。
 */
export enum MediaStreamType {
  /*
   * 0: 未知类型。
   */
  StreamTypeUnknown = 0,
  /*
   * 1: 视频流。
   */
  StreamTypeVideo = 1,
  /*
   * 2: 音频流。
   */
  StreamTypeAudio = 2,
  /*
   * 3: 字幕流。
   */
  StreamTypeSubtitle = 3,
}

/*
 * 播放器事件。
 */
export enum MediaPlayerEvent {
  /*
   * 0: 开始定位。
   */
  PlayerEventSeekBegin = 0,
  /*
   * 1: 完成定位。
   */
  PlayerEventSeekComplete = 1,
  /*
   * 2: 定位出错。
   */
  PlayerEventSeekError = 2,
  /*
   * 5: 当前音轨发生改变。
   */
  PlayerEventAudioTrackChanged = 5,
  /*
   * 6: 当前缓冲的数据不足以支持播放。
   */
  PlayerEventBufferLow = 6,
  /*
   * 7: 当前缓冲的数据刚好能支持播放。
   */
  PlayerEventBufferRecover = 7,
  /*
   * 8: 音频或视频出现卡顿。
   */
  PlayerEventFreezeStart = 8,
  /*
   * 9: 音频和视频均停止卡顿。
   */
  PlayerEventFreezeStop = 9,
  /*
   * 10: 开始切换媒体资源。
   */
  PlayerEventSwitchBegin = 10,
  /*
   * 11: 媒体资源切换完成。
   */
  PlayerEventSwitchComplete = 11,
  /*
   * 12: 媒体资源切换出错。
   */
  PlayerEventSwitchError = 12,
  /*
   * 13: 视频首帧出图。
   */
  PlayerEventFirstDisplayed = 13,
}

/*
 * 预加载媒体资源时发生的事件。
 */
export enum PlayerPreloadEvent {
  /*
   * 0: 开始预加载媒体资源。
   */
  PlayerPreloadEventBegin = 0,
  /*
   * 1: 预加载媒体资源完成。
   */
  PlayerPreloadEventComplete = 1,
  /*
   * 2: 预加载媒体资源出错。
   */
  PlayerPreloadEventError = 2,
}

/*
 * 播放器媒体流的所有信息。
 */
export class PlayerStreamInfo {
  /*
   * 媒体流的索引值。
   */
  streamIndex?: number;
  /*
   * 此条媒体流的类型。详见 MediaStreamType 。
   */
  streamType?: MediaStreamType;
  /*
   * 此条媒体流的编码规格。
   */
  codecName?: string;
  /*
   * 此条媒体流的语言。
   */
  language?: string;
  /*
   * 该参数仅对视频流生效，表示视频帧率 (fps)。
   */
  videoFrameRate?: number;
  /*
   * 该参数仅对视频流生效，表示视频码率 (bps)。
   */
  videoBitRate?: number;
  /*
   * 该参数仅对视频流生效，表示视频宽度 (pixel)。
   */
  videoWidth?: number;
  /*
   * 该参数仅对视频流生效，表示视频高度 (pixel)。
   */
  videoHeight?: number;
  /*
   * 该参数仅对视频流生效，表示旋转角度。
   */
  videoRotation?: number;
  /*
   * 该参数仅对音频流生效，表示音频采样率 (Hz)。
   */
  audioSampleRate?: number;
  /*
   * 该参数仅对音频流生效，表示声道数。
   */
  audioChannels?: number;
  /*
   * 该参数仅对音频流生效，表示每个音频采样点的位数 (bit)。
   */
  audioBitsPerSample?: number;
  /*
   * 媒体流的时长（秒）。
   */
  duration?: number;
}

/*
 * 媒体资源播放时的视频码率相关信息。
 */
export class SrcInfo {
  /*
   * 媒体资源播放时的视频码率（Kbps）。
   */
  bitrateInKbps?: number;
  /*
   * 媒体资源的名字。
   */
  name?: string;
}

/*
 * 媒体附属信息数据类型。
 */
export enum MediaPlayerMetadataType {
  /*
   * 0: 未知类型。
   */
  PlayerMetadataTypeUnknown = 0,
  /*
   * 1: SEI （补充增强信息）类型。
   */
  PlayerMetadataTypeSei = 1,
}

/*
 * 媒体播放器相关信息。
 */
export class PlayerUpdatedInfo {
  /*
   * 播放器 ID，标识一个播放器。
   */
  playerId?: string;
  /*
   * 设备 ID，标识一个设备。
   */
  deviceId?: string;
}
