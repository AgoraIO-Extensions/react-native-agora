import './extension/AgoraMediaPlayerTypesExtension';

/**
 * The state of the media player.
 */
export enum MediaPlayerState {
  /**
   * 0: Default state. The player returns this state code before you open a media file and after playback ends.
   */
  PlayerStateIdle = 0,
  /**
   * 1: Opening the media file.
   */
  PlayerStateOpening = 1,
  /**
   * 2: Media file opened successfully.
   */
  PlayerStateOpenCompleted = 2,
  /**
   * 3: Playing.
   */
  PlayerStatePlaying = 3,
  /**
   * 4: Playback paused.
   */
  PlayerStatePaused = 4,
  /**
   * 5: Playback completed.
   */
  PlayerStatePlaybackCompleted = 5,
  /**
   * 6: All loops of playback completed.
   */
  PlayerStatePlaybackAllLoopsCompleted = 6,
  /**
   * 7: Playback stopped.
   */
  PlayerStateStopped = 7,
  /**
   * @ignore
   */
  PlayerStatePausingInternal = 50,
  /**
   * @ignore
   */
  PlayerStateStoppingInternal = 51,
  /**
   * @ignore
   */
  PlayerStateSeekingInternal = 52,
  /**
   * @ignore
   */
  PlayerStateGettingInternal = 53,
  /**
   * @ignore
   */
  PlayerStateNoneInternal = 54,
  /**
   * @ignore
   */
  PlayerStateDoNothingInternal = 55,
  /**
   * @ignore
   */
  PlayerStateSetTrackInternal = 56,
  /**
   * 100: Playback failed.
   */
  PlayerStateFailed = 100,
}

/**
 * Reason for media player state change.
 */
export enum MediaPlayerReason {
  /**
   * 0: No error.
   */
  PlayerReasonNone = 0,
  /**
   * -1: Invalid arguments.
   */
  PlayerReasonInvalidArguments = -1,
  /**
   * -2: Internal error.
   */
  PlayerReasonInternal = -2,
  /**
   * -3: No resource.
   */
  PlayerReasonNoResource = -3,
  /**
   * -4: Invalid resource.
   */
  PlayerReasonInvalidMediaSource = -4,
  /**
   * -5: Unknown media stream type.
   */
  PlayerReasonUnknownStreamType = -5,
  /**
   * -6: Object not initialized.
   */
  PlayerReasonObjNotInitialized = -6,
  /**
   * -7: Codec not supported.
   */
  PlayerReasonCodecNotSupported = -7,
  /**
   * -8: Invalid renderer.
   */
  PlayerReasonVideoRenderFailed = -8,
  /**
   * -9: Invalid internal player state.
   */
  PlayerReasonInvalidState = -9,
  /**
   * -10: URL not found.
   */
  PlayerReasonUrlNotFound = -10,
  /**
   * -11: Invalid connection between the player and Agora server.
   */
  PlayerReasonInvalidConnectionState = -11,
  /**
   * -12: Insufficient data in the playback buffer.
   */
  PlayerReasonSrcBufferUnderflow = -12,
  /**
   * -13: Playback was interrupted abnormally and ended.
   */
  PlayerReasonInterrupted = -13,
  /**
   * -14: Unsupported API call by the SDK.
   */
  PlayerReasonNotSupported = -14,
  /**
   * -15: Authentication information for the media resource network path has expired.
   */
  PlayerReasonTokenExpired = -15,
  /**
   * @ignore
   */
  PlayerReasonIpExpired = -16,
  /**
   * -17: Unknown error.
   */
  PlayerReasonUnknown = -17,
}

/**
 * The type of media stream.
 */
export enum MediaStreamType {
  /**
   * 0: Unknown type.
   */
  StreamTypeUnknown = 0,
  /**
   * 1: Video stream.
   */
  StreamTypeVideo = 1,
  /**
   * 2: Audio stream.
   */
  StreamTypeAudio = 2,
  /**
   * 3: Subtitle stream.
   */
  StreamTypeSubtitle = 3,
}

/**
 * Media player events.
 */
export enum MediaPlayerEvent {
  /**
   * 0: Seek started.
   */
  PlayerEventSeekBegin = 0,
  /**
   * 1: Seek completed.
   */
  PlayerEventSeekComplete = 1,
  /**
   * 2: Seek error.
   */
  PlayerEventSeekError = 2,
  /**
   * 5: Current audio track changed.
   */
  PlayerEventAudioTrackChanged = 5,
  /**
   * 6: Current buffer is insufficient for playback.
   */
  PlayerEventBufferLow = 6,
  /**
   * 7: Current buffer is just enough for playback.
   */
  PlayerEventBufferRecover = 7,
  /**
   * 8: Audio or video stutter occurred.
   */
  PlayerEventFreezeStart = 8,
  /**
   * 9: Audio and video stutter stopped.
   */
  PlayerEventFreezeStop = 9,
  /**
   * 10: Media resource switching started.
   */
  PlayerEventSwitchBegin = 10,
  /**
   * 11: Media resource switching completed.
   */
  PlayerEventSwitchComplete = 11,
  /**
   * 12: Media resource switching error.
   */
  PlayerEventSwitchError = 12,
  /**
   * 13: First video frame displayed.
   */
  PlayerEventFirstDisplayed = 13,
  /**
   * 14: Reached the maximum number of cacheable files.
   */
  PlayerEventReachCacheFileMaxCount = 14,
  /**
   * 15: Reached the maximum size of cacheable files.
   */
  PlayerEventReachCacheFileMaxSize = 15,
  /**
   * @ignore
   */
  PlayerEventTryOpenStart = 16,
  /**
   * @ignore
   */
  PlayerEventTryOpenSucceed = 17,
  /**
   * @ignore
   */
  PlayerEventTryOpenFailed = 18,
  /**
   * @ignore
   */
  PlayerEventHttpRedirect = 19,
}

/**
 * Events that occur when preloading media resources.
 */
export enum PlayerPreloadEvent {
  /**
   * 0: Start preloading media resources.
   */
  PlayerPreloadEventBegin = 0,
  /**
   * 1: Preloading of media resources completed.
   */
  PlayerPreloadEventComplete = 1,
  /**
   * 2: Error occurred while preloading media resources.
   */
  PlayerPreloadEventError = 2,
}

/**
 * All information about the player media stream.
 */
export class PlayerStreamInfo {
  /**
   * The index of the media stream.
   */
  streamIndex?: number;
  /**
   * The type of the media stream. See MediaStreamType.
   */
  streamType?: MediaStreamType;
  /**
   * The codec specification of the media stream.
   */
  codecName?: string;
  /**
   * The language of the media stream.
   */
  language?: string;
  /**
   * Applies to video streams only. Indicates the video frame rate (fps).
   */
  videoFrameRate?: number;
  /**
   * Applies to video streams only. Indicates the video bitrate (bps).
   */
  videoBitRate?: number;
  /**
   * Applies to video streams only. Indicates the video width (px).
   */
  videoWidth?: number;
  /**
   * Applies to video streams only. Indicates the video height (px).
   */
  videoHeight?: number;
  /**
   * Applies to video streams only. Indicates the rotation angle.
   */
  videoRotation?: number;
  /**
   * Applies to audio streams only. Indicates the audio sample rate (Hz).
   */
  audioSampleRate?: number;
  /**
   * Applies to audio streams only. Indicates the number of audio channels.
   */
  audioChannels?: number;
  /**
   * Applies to audio streams only. Indicates the number of bits per audio sample (bit).
   */
  audioBitsPerSample?: number;
  /**
   * The duration of the media stream (milliseconds).
   */
  duration?: number;
}

/**
 * Video bitrate information during media playback.
 */
export class SrcInfo {
  /**
   * Video bitrate (Kbps) during media playback.
   */
  bitrateInKbps?: number;
  /**
   * Name of the media resource.
   */
  name?: string;
}

/**
 * Media metadata type.
 */
export enum MediaPlayerMetadataType {
  /**
   * 0: Unknown type.
   */
  PlayerMetadataTypeUnknown = 0,
  /**
   * 1: SEI (Supplemental Enhancement Information) type.
   */
  PlayerMetadataTypeSei = 1,
}

/**
 * Statistics of cached files.
 */
export class CacheStatistics {
  /**
   * Size of the media file played this time, in bytes.
   */
  fileSize?: number;
  /**
   * Size of the cached data of the media file played this time, in bytes.
   */
  cacheSize?: number;
  /**
   * Size of the downloaded media file played this time, in bytes.
   */
  downloadSize?: number;
}

/**
 * Information about the currently playing media resource.
 */
export class PlayerPlaybackStats {
  /**
   * Video frame rate, in fps.
   */
  videoFps?: number;
  /**
   * Video bitrate, in kbps.
   */
  videoBitrateInKbps?: number;
  /**
   * Audio bitrate, in kbps.
   */
  audioBitrateInKbps?: number;
  /**
   * Total bitrate of the media stream, in kbps.
   */
  totalBitrateInKbps?: number;
}

/**
 * Information related to the media player.
 */
export class PlayerUpdatedInfo {
  /**
   * @ignore
   */
  internalPlayerUuid?: string;
  /**
   * Device ID that identifies a device.
   */
  deviceId?: string;
  /**
   * Video height (pixels).
   */
  videoHeight?: number;
  /**
   * Video width (pixels).
   */
  videoWidth?: number;
  /**
   * Audio sample rate (Hz).
   */
  audioSampleRate?: number;
  /**
   * Number of audio channels.
   */
  audioChannels?: number;
  /**
   * Number of bits per audio sample (bit).
   */
  audioBitsPerSample?: number;
}

/**
 * Information and playback settings for the media file to be played.
 */
export class MediaSource {
  /**
   * URL of the media resource to be played.
   */
  url?: string;
  /**
   * URI (Uniform Resource Identifier) of the media file, used to identify the media file.
   */
  uri?: string;
  /**
   * Start playback position in milliseconds. Default is 0.
   */
  startPos?: number;
  /**
   * If you disable auto-play, call the play method after opening the media file to start playback. Whether to enable auto-play after opening the media file: true : (Default) Enable auto-play. false : Disable auto-play.
   */
  autoPlay?: boolean;
  /**
   * The SDK currently only supports caching for on-demand streams, not for on-demand streams transmitted via HLS.
   *  Set a value for uri before enabling caching; otherwise, the player uses the media file's url as the cache index.
   *  When real-time caching is enabled, the player preloads part of the media file to local storage. When you play the file again, the player loads data from the cache to save bandwidth. The statistics of the cached media file update every second after playback starts. See CacheStatistics. Whether to enable real-time caching for this playback: true : Enable real-time caching. false : (Default) Disable real-time caching.
   */
  enableCache?: boolean;
  /**
   * Whether to allow selecting different audio tracks for this playback: true : Allow selecting different audio tracks. false : (Default) Do not allow selecting different audio tracks. If you need to set different audio tracks for local playback and publishing to remote, set this parameter to true and then call the selectMultiAudioTrack method to set the audio track.
   */
  enableMultiAudioTrack?: boolean;
  /**
   * If the media resource you want to open is a live or on-demand stream distributed via Agora's CDN, pass the stream URL to url and set isAgoraSource to true. Otherwise, you do not need to set isAgoraSource. Whether the opened media resource is a live or on-demand stream distributed via Agora's CDN: true : The media resource is distributed via Agora's CDN. false : (Default) The media resource is not distributed via Agora's CDN.
   */
  isAgoraSource?: boolean;
  /**
   * Only when the media resource is a live stream, setting isLiveSource to true can speed up the opening of the media resource. Whether the opened media resource is a live stream: true : Live stream. false : (Default) Not a live stream. If the media resource is a live stream, it is recommended to set this parameter to true to speed up the opening of the live stream.
   */
  isLiveSource?: boolean;
}
