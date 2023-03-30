import './extension/AgoraMediaPlayerTypesExtension';
/* enum_mediaplayerstate */
export enum MediaPlayerState {
  /* enum_mediaplayerstate_PlayerStateIdle */
  PlayerStateIdle = 0,
  /* enum_mediaplayerstate_PlayerStateOpening */
  PlayerStateOpening = 1,
  /* enum_mediaplayerstate_PlayerStateOpenCompleted */
  PlayerStateOpenCompleted = 2,
  /* enum_mediaplayerstate_PlayerStatePlaying */
  PlayerStatePlaying = 3,
  /* enum_mediaplayerstate_PlayerStatePaused */
  PlayerStatePaused = 4,
  /* enum_mediaplayerstate_PlayerStatePlaybackCompleted */
  PlayerStatePlaybackCompleted = 5,
  /* enum_mediaplayerstate_PlayerStatePlaybackAllLoopsCompleted */
  PlayerStatePlaybackAllLoopsCompleted = 6,
  /* enum_mediaplayerstate_PlayerStateStopped */
  PlayerStateStopped = 7,
  /* enum_mediaplayerstate_PlayerStatePausingInternal */
  PlayerStatePausingInternal = 50,
  /* enum_mediaplayerstate_PlayerStateStoppingInternal */
  PlayerStateStoppingInternal = 51,
  /* enum_mediaplayerstate_PlayerStateSeekingInternal */
  PlayerStateSeekingInternal = 52,
  /* enum_mediaplayerstate_PlayerStateGettingInternal */
  PlayerStateGettingInternal = 53,
  /* enum_mediaplayerstate_PlayerStateNoneInternal */
  PlayerStateNoneInternal = 54,
  /* enum_mediaplayerstate_PlayerStateDoNothingInternal */
  PlayerStateDoNothingInternal = 55,
  /* enum_mediaplayerstate_PlayerStateSetTrackInternal */
  PlayerStateSetTrackInternal = 56,
  /* enum_mediaplayerstate_PlayerStateFailed */
  PlayerStateFailed = 100,
}

/* enum_mediaplayererror */
export enum MediaPlayerError {
  /* enum_mediaplayererror_PlayerErrorNone */
  PlayerErrorNone = 0,
  /* enum_mediaplayererror_PlayerErrorInvalidArguments */
  PlayerErrorInvalidArguments = -1,
  /* enum_mediaplayererror_PlayerErrorInternal */
  PlayerErrorInternal = -2,
  /* enum_mediaplayererror_PlayerErrorNoResource */
  PlayerErrorNoResource = -3,
  /* enum_mediaplayererror_PlayerErrorInvalidMediaSource */
  PlayerErrorInvalidMediaSource = -4,
  /* enum_mediaplayererror_PlayerErrorUnknownStreamType */
  PlayerErrorUnknownStreamType = -5,
  /* enum_mediaplayererror_PlayerErrorObjNotInitialized */
  PlayerErrorObjNotInitialized = -6,
  /* enum_mediaplayererror_PlayerErrorCodecNotSupported */
  PlayerErrorCodecNotSupported = -7,
  /* enum_mediaplayererror_PlayerErrorVideoRenderFailed */
  PlayerErrorVideoRenderFailed = -8,
  /* enum_mediaplayererror_PlayerErrorInvalidState */
  PlayerErrorInvalidState = -9,
  /* enum_mediaplayererror_PlayerErrorUrlNotFound */
  PlayerErrorUrlNotFound = -10,
  /* enum_mediaplayererror_PlayerErrorInvalidConnectionState */
  PlayerErrorInvalidConnectionState = -11,
  /* enum_mediaplayererror_PlayerErrorSrcBufferUnderflow */
  PlayerErrorSrcBufferUnderflow = -12,
  /* enum_mediaplayererror_PlayerErrorInterrupted */
  PlayerErrorInterrupted = -13,
  /* enum_mediaplayererror_PlayerErrorNotSupported */
  PlayerErrorNotSupported = -14,
  /* enum_mediaplayererror_PlayerErrorTokenExpired */
  PlayerErrorTokenExpired = -15,
  /* enum_mediaplayererror_PlayerErrorIpExpired */
  PlayerErrorIpExpired = -16,
  /* enum_mediaplayererror_PlayerErrorUnknown */
  PlayerErrorUnknown = -17,
}

/* enum_mediastreamtype */
export enum MediaStreamType {
  /* enum_mediastreamtype_StreamTypeUnknown */
  StreamTypeUnknown = 0,
  /* enum_mediastreamtype_StreamTypeVideo */
  StreamTypeVideo = 1,
  /* enum_mediastreamtype_StreamTypeAudio */
  StreamTypeAudio = 2,
  /* enum_mediastreamtype_StreamTypeSubtitle */
  StreamTypeSubtitle = 3,
}

/* enum_mediaplayerevent */
export enum MediaPlayerEvent {
  /* enum_mediaplayerevent_PlayerEventSeekBegin */
  PlayerEventSeekBegin = 0,
  /* enum_mediaplayerevent_PlayerEventSeekComplete */
  PlayerEventSeekComplete = 1,
  /* enum_mediaplayerevent_PlayerEventSeekError */
  PlayerEventSeekError = 2,
  /* enum_mediaplayerevent_PlayerEventAudioTrackChanged */
  PlayerEventAudioTrackChanged = 5,
  /* enum_mediaplayerevent_PlayerEventBufferLow */
  PlayerEventBufferLow = 6,
  /* enum_mediaplayerevent_PlayerEventBufferRecover */
  PlayerEventBufferRecover = 7,
  /* enum_mediaplayerevent_PlayerEventFreezeStart */
  PlayerEventFreezeStart = 8,
  /* enum_mediaplayerevent_PlayerEventFreezeStop */
  PlayerEventFreezeStop = 9,
  /* enum_mediaplayerevent_PlayerEventSwitchBegin */
  PlayerEventSwitchBegin = 10,
  /* enum_mediaplayerevent_PlayerEventSwitchComplete */
  PlayerEventSwitchComplete = 11,
  /* enum_mediaplayerevent_PlayerEventSwitchError */
  PlayerEventSwitchError = 12,
  /* enum_mediaplayerevent_PlayerEventFirstDisplayed */
  PlayerEventFirstDisplayed = 13,
  /* enum_mediaplayerevent_PlayerEventReachCacheFileMaxCount */
  PlayerEventReachCacheFileMaxCount = 14,
  /* enum_mediaplayerevent_PlayerEventReachCacheFileMaxSize */
  PlayerEventReachCacheFileMaxSize = 15,
  /* enum_mediaplayerevent_PlayerEventTryOpenStart */
  PlayerEventTryOpenStart = 16,
  /* enum_mediaplayerevent_PlayerEventTryOpenSucceed */
  PlayerEventTryOpenSucceed = 17,
  /* enum_mediaplayerevent_PlayerEventTryOpenFailed */
  PlayerEventTryOpenFailed = 18,
}

/* enum_playerpreloadevent */
export enum PlayerPreloadEvent {
  /* enum_playerpreloadevent_PlayerPreloadEventBegin */
  PlayerPreloadEventBegin = 0,
  /* enum_playerpreloadevent_PlayerPreloadEventComplete */
  PlayerPreloadEventComplete = 1,
  /* enum_playerpreloadevent_PlayerPreloadEventError */
  PlayerPreloadEventError = 2,
}

/* class_playerstreaminfo */
export class PlayerStreamInfo {
  /* class_playerstreaminfo_streamIndex */
  streamIndex?: number;
  /* class_playerstreaminfo_streamType */
  streamType?: MediaStreamType;
  /* class_playerstreaminfo_codecName */
  codecName?: string;
  /* class_playerstreaminfo_language */
  language?: string;
  /* class_playerstreaminfo_videoFrameRate */
  videoFrameRate?: number;
  /* class_playerstreaminfo_videoBitRate */
  videoBitRate?: number;
  /* class_playerstreaminfo_videoWidth */
  videoWidth?: number;
  /* class_playerstreaminfo_videoHeight */
  videoHeight?: number;
  /* class_playerstreaminfo_videoRotation */
  videoRotation?: number;
  /* class_playerstreaminfo_audioSampleRate */
  audioSampleRate?: number;
  /* class_playerstreaminfo_audioChannels */
  audioChannels?: number;
  /* class_playerstreaminfo_audioBitsPerSample */
  audioBitsPerSample?: number;
  /* class_playerstreaminfo_duration */
  duration?: number;
}

/* class_srcinfo */
export class SrcInfo {
  /* class_srcinfo_bitrateInKbps */
  bitrateInKbps?: number;
  /* class_srcinfo_name */
  name?: string;
}

/* enum_mediaplayermetadatatype */
export enum MediaPlayerMetadataType {
  /* enum_mediaplayermetadatatype_PlayerMetadataTypeUnknown */
  PlayerMetadataTypeUnknown = 0,
  /* enum_mediaplayermetadatatype_PlayerMetadataTypeSei */
  PlayerMetadataTypeSei = 1,
}

/* class_cachestatistics */
export class CacheStatistics {
  /* class_cachestatistics_fileSize */
  fileSize?: number;
  /* class_cachestatistics_cacheSize */
  cacheSize?: number;
  /* class_cachestatistics_downloadSize */
  downloadSize?: number;
}

/* class_playerupdatedinfo */
export class PlayerUpdatedInfo {
  /* class_playerupdatedinfo_playerId */
  playerId?: string;
  /* class_playerupdatedinfo_deviceId */
  deviceId?: string;
  /* class_playerupdatedinfo_cacheStatistics */
  cacheStatistics?: CacheStatistics;
}

/* class_mediasource */
export class MediaSource {
  /* class_mediasource_url */
  url?: string;
  /* class_mediasource_uri */
  uri?: string;
  /* class_mediasource_startPos */
  startPos?: number;
  /* class_mediasource_autoPlay */
  autoPlay?: boolean;
  /* class_mediasource_enableCache */
  enableCache?: boolean;
  /* class_mediasource_isAgoraSource */
  isAgoraSource?: boolean;
  /* class_mediasource_isLiveSource */
  isLiveSource?: boolean;
}
