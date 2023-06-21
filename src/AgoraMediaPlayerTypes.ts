import './extension/AgoraMediaPlayerTypesExtension';
/**
 * The playback state.
 */
export enum MediaPlayerState {
  /**
   * 0: The default state. The media player returns this state code before you open the media resource or after you stop the playback.
   */
  PlayerStateIdle = 0,
  /**
   * 1: Opening the media resource.
   */
  PlayerStateOpening = 1,
  /**
   * 2: Opens the media resource successfully.
   */
  PlayerStateOpenCompleted = 2,
  /**
   * 3: The media resource is playing.
   */
  PlayerStatePlaying = 3,
  /**
   * 4: Pauses the playback.
   */
  PlayerStatePaused = 4,
  /**
   * 5: The playback is complete.
   */
  PlayerStatePlaybackCompleted = 5,
  /**
   * 6: The loop is complete.
   */
  PlayerStatePlaybackAllLoopsCompleted = 6,
  /**
   * 7: The playback stops.
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
   * 100: The media player fails to play the media resource.
   */
  PlayerStateFailed = 100,
}

/**
 * Error codes of the media player.
 */
export enum MediaPlayerError {
  /**
   * 0: No error.
   */
  PlayerErrorNone = 0,
  /**
   * -1: Invalid arguments.
   */
  PlayerErrorInvalidArguments = -1,
  /**
   * -2: Internal error.
   */
  PlayerErrorInternal = -2,
  /**
   * -3: No resource.
   */
  PlayerErrorNoResource = -3,
  /**
   * -4: Invalid media resource.
   */
  PlayerErrorInvalidMediaSource = -4,
  /**
   * -5: The media stream type is unknown.
   */
  PlayerErrorUnknownStreamType = -5,
  /**
   * -6: The object is not initialized.
   */
  PlayerErrorObjNotInitialized = -6,
  /**
   * -7: The codec is not supported.
   */
  PlayerErrorCodecNotSupported = -7,
  /**
   * -8: Invalid renderer.
   */
  PlayerErrorVideoRenderFailed = -8,
  /**
   * -9: An error with the internal state of the player occurs.
   */
  PlayerErrorInvalidState = -9,
  /**
   * -10: The URL of the media resource cannot be found.
   */
  PlayerErrorUrlNotFound = -10,
  /**
   * -11: Invalid connection between the player and the Agora Server.
   */
  PlayerErrorInvalidConnectionState = -11,
  /**
   * -12: The playback buffer is insufficient.
   */
  PlayerErrorSrcBufferUnderflow = -12,
  /**
   * -13: The playback is interrupted.
   */
  PlayerErrorInterrupted = -13,
  /**
   * -14: The SDK does not support the method being called.
   */
  PlayerErrorNotSupported = -14,
  /**
   * -15: The authentication information of the media resource is expired.
   */
  PlayerErrorTokenExpired = -15,
  /**
   * @ignore
   */
  PlayerErrorIpExpired = -16,
  /**
   * -17: An unknown error.
   */
  PlayerErrorUnknown = -17,
}

/**
 * The type of the media stream.
 */
export enum MediaStreamType {
  /**
   * 0: The type is unknown.
   */
  StreamTypeUnknown = 0,
  /**
   * 1: The video stream.
   */
  StreamTypeVideo = 1,
  /**
   * 2: The audio stream.
   */
  StreamTypeAudio = 2,
  /**
   * 3: The subtitle stream.
   */
  StreamTypeSubtitle = 3,
}

/**
 * Media player events.
 */
export enum MediaPlayerEvent {
  /**
   * 0: The player begins to seek to a new playback position.
   */
  PlayerEventSeekBegin = 0,
  /**
   * 1: The player finishes seeking to a new playback position.
   */
  PlayerEventSeekComplete = 1,
  /**
   * 2: An error occurs when seeking to a new playback position.
   */
  PlayerEventSeekError = 2,
  /**
   * 5: The audio track used by the player has been changed.
   */
  PlayerEventAudioTrackChanged = 5,
  /**
   * 6: The currently buffered data is not enough to support playback.
   */
  PlayerEventBufferLow = 6,
  /**
   * 7: The currently buffered data is just enough to support playback.
   */
  PlayerEventBufferRecover = 7,
  /**
   * 8: The audio or video playback freezes.
   */
  PlayerEventFreezeStart = 8,
  /**
   * 9: The audio or video playback resumes without freezing.
   */
  PlayerEventFreezeStop = 9,
  /**
   * 10: The player starts switching the media resource.
   */
  PlayerEventSwitchBegin = 10,
  /**
   * 11: Media resource switching is complete.
   */
  PlayerEventSwitchComplete = 11,
  /**
   * 12: Media resource switching error.
   */
  PlayerEventSwitchError = 12,
  /**
   * 13: The first video frame is rendered.
   */
  PlayerEventFirstDisplayed = 13,
  /**
   * 14: The cached media files reach the limit in number.
   */
  PlayerEventReachCacheFileMaxCount = 14,
  /**
   * 15: The cached media files reach the limit in aggregate storage space.
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
}

/**
 * Events that occur when media resources are preloaded.
 */
export enum PlayerPreloadEvent {
  /**
   * 0: Starts preloading media resources.
   */
  PlayerPreloadEventBegin = 0,
  /**
   * 1: Preloading media resources is complete.
   */
  PlayerPreloadEventComplete = 1,
  /**
   * 2: An error occurs when preloading media resources.
   */
  PlayerPreloadEventError = 2,
}

/**
 * The detailed information of the media stream.
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
   * The codec of the media stream.
   */
  codecName?: string;
  /**
   * The language of the media stream.
   */
  language?: string;
  /**
   * This parameter only takes effect for video streams, and indicates the video frame rate (fps).
   */
  videoFrameRate?: number;
  /**
   * This parameter only takes effect for video streams, and indicates the video bitrate (bps).
   */
  videoBitRate?: number;
  /**
   * This parameter only takes effect for video streams, and indicates the video width (pixel).
   */
  videoWidth?: number;
  /**
   * This parameter only takes effect for video streams, and indicates the video height (pixel).
   */
  videoHeight?: number;
  /**
   * This parameter only takes effect for video streams, and indicates the video rotation angle.
   */
  videoRotation?: number;
  /**
   * This parameter only takes effect for audio streams, and indicates the audio sample rate (Hz).
   */
  audioSampleRate?: number;
  /**
   * This parameter only takes effect for audio streams, and indicates the audio channel number.
   */
  audioChannels?: number;
  /**
   * This parameter only takes effect for audio streams, and indicates the bit number of each audio sample.
   */
  audioBitsPerSample?: number;
  /**
   * The total duration (ms) of the media stream.
   */
  duration?: number;
}

/**
 * Information about the video bitrate of the media resource being played.
 */
export class SrcInfo {
  /**
   * The video bitrate (Kbps) of the media resource being played.
   */
  bitrateInKbps?: number;
  /**
   * The name of the media resource.
   */
  name?: string;
}

/**
 * The type of media metadata.
 */
export enum MediaPlayerMetadataType {
  /**
   * 0: The type is unknown.
   */
  PlayerMetadataTypeUnknown = 0,
  /**
   * 1: The type is SEI.
   */
  PlayerMetadataTypeSei = 1,
}

/**
 * Statistics about the media files being cached.
 */
export class CacheStatistics {
  /**
   * The size (bytes) of the media file being played.
   */
  fileSize?: number;
  /**
   * The size (bytes) of the media file that you want to cache.
   */
  cacheSize?: number;
  /**
   * The size (bytes) of the media file that has been downloaded.
   */
  downloadSize?: number;
}

/**
 * Information related to the media player.
 */
export class PlayerUpdatedInfo {
  /**
   * The ID of a media player.
   */
  playerId?: string;
  /**
   * The ID of a deivce.
   */
  deviceId?: string;
  /**
   * The statistics about the media file being cached.If you call the openWithMediaSource method and set enableCache as true, the statistics about the media file being cached is updated every second after the media file is played. See CacheStatistics.
   */
  cacheStatistics?: CacheStatistics;
}

/**
 * Information related to the media file to be played and the playback scenario configurations.
 */
export class MediaSource {
  /**
   * The URL of the media file to be played.
   */
  url?: string;
  /**
   * The URI (Uniform Resource Identifier) of the media file.
   */
  uri?: string;
  /**
   * The starting position (ms) for playback. The default value is 0.
   */
  startPos?: number;
  /**
   * Whether to enable autoplay once the media file is opened:true: (Default) Enables autoplay.false: Disables autoplay.If autoplay is disabled, you need to call the play method to play a media file after it is opened.
   */
  autoPlay?: boolean;
  /**
   * Whether to cache the media file when it is being played:true:Enables caching.false: (Default) Disables caching.Agora only supports caching on-demand audio and video streams that are not transmitted in HLS protocol.If you need to enable caching, pass in a value to uri; otherwise, caching is based on the url of the media file.If you enable this function, the Media Player caches part of the media file being played on your local device, and you can play the cached media file without internet connection. The statistics about the media file being cached are updated every second after the media file is played. See CacheStatistics.
   */
  enableCache?: boolean;
  /**
   * Whether the media resource to be opened is a live stream or on-demand video distributed through Media Broadcast service:true: The media resource to be played is a live or on-demand video distributed through Media Broadcast service.false: (Default) The media resource is not a live stream or on-demand video distributed through Media Broadcast service.If you need to open a live stream or on-demand video distributed through Broadcast Streaming service, pass in the URL of the media resource to url, and set isAgoraSource as true; otherwise, you don't need to set the isAgoraSource parameter.
   */
  isAgoraSource?: boolean;
  /**
   * Whether the media resource to be opened is a live stream:true: The media resource is a live stream.false: (Default) The media resource is not a live stream.If the media resource you want to open is a live stream, Agora recommends that you set this parameter as true so that the live stream can be loaded more quickly.If the media resource you open is not a live stream, but you set isLiveSource as true, the media resource is not to be loaded more quickly.
   */
  isLiveSource?: boolean;
}
