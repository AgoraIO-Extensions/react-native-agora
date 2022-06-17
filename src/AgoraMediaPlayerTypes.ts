export enum MediaPlayerState {
  PlayerStateIdle = 0,
  PlayerStateOpening = 1,
  PlayerStateOpenCompleted = 2,
  PlayerStatePlaying = 3,
  PlayerStatePaused = 4,
  PlayerStatePlaybackCompleted = 5,
  PlayerStatePlaybackAllLoopsCompleted = 6,
  PlayerStateStopped = 7,
  PlayerStatePausingInternal = 50,
  PlayerStateStoppingInternal = 51,
  PlayerStateSeekingInternal = 52,
  PlayerStateGettingInternal = 53,
  PlayerStateNoneInternal = 54,
  PlayerStateDoNothingInternal = 55,
  PlayerStateSetTrackInternal = 56,
  PlayerStateFailed = 100,
}

export enum MediaPlayerError {
  PlayerErrorNone = 0,
  PlayerErrorInvalidArguments = -1,
  PlayerErrorInternal = -2,
  PlayerErrorNoResource = -3,
  PlayerErrorInvalidMediaSource = -4,
  PlayerErrorUnknownStreamType = -5,
  PlayerErrorObjNotInitialized = -6,
  PlayerErrorCodecNotSupported = -7,
  PlayerErrorVideoRenderFailed = -8,
  PlayerErrorInvalidState = -9,
  PlayerErrorUrlNotFound = -10,
  PlayerErrorInvalidConnectionState = -11,
  PlayerErrorSrcBufferUnderflow = -12,
  PlayerErrorInterrupted = -13,
  PlayerErrorNotSupported = -14,
  PlayerErrorTokenExpired = -15,
  PlayerErrorIpExpired = -16,
  PlayerErrorUnknown = -17,
}

export enum MediaStreamType {
  StreamTypeUnknown = 0,
  StreamTypeVideo = 1,
  StreamTypeAudio = 2,
  StreamTypeSubtitle = 3,
}

export enum MediaPlayerEvent {
  PlayerEventSeekBegin = 0,
  PlayerEventSeekComplete = 1,
  PlayerEventSeekError = 2,
  PlayerEventAudioTrackChanged = 5,
  PlayerEventBufferLow = 6,
  PlayerEventBufferRecover = 7,
  PlayerEventFreezeStart = 8,
  PlayerEventFreezeStop = 9,
  PlayerEventSwitchBegin = 10,
  PlayerEventSwitchComplete = 11,
  PlayerEventSwitchError = 12,
  PlayerEventFirstDisplayed = 13,
}

export enum PlayerPreloadEvent {
  PlayerPreloadEventBegin = 0,
  PlayerPreloadEventComplete = 1,
  PlayerPreloadEventError = 2,
}

export class PlayerStreamInfo {
  streamIndex?: number;
  streamType?: MediaStreamType;
  codecName?: string;
  language?: string;
  videoFrameRate?: number;
  videoBitRate?: number;
  videoWidth?: number;
  videoHeight?: number;
  videoRotation?: number;
  audioSampleRate?: number;
  audioChannels?: number;
  audioBitsPerSample?: number;
  duration?: number;
}

export class SrcInfo {
  bitrateInKbps?: number;
  name?: string;
}

export enum MediaPlayerMetadataType {
  PlayerMetadataTypeUnknown = 0,
  PlayerMetadataTypeSei = 1,
}

export class PlayerUpdatedInfo {
  playerId?: string;
  deviceId?: string;
}
