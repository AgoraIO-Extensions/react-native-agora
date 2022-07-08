/*
 * The playback state.
 */
export enum MediaPlayerState {
  /*
   * 0: The default state.
   * The media player returns this state code before you open the media resource or after you stop the playback.
   */
  PlayerStateIdle = 0,
  /*
   * Opening the media resource.
   */
  PlayerStateOpening = 1,
  /*
   * Opens the media resource successfully.
   */
  PlayerStateOpenCompleted = 2,
  /*
   * The media resource is playing.
   */
  PlayerStatePlaying = 3,
  /*
   * Pauses the playback.
   */
  PlayerStatePaused = 4,
  /*
   * The playback finishes.
   */
  PlayerStatePlaybackCompleted = 5,
  /*
   * The loop finishes.
   */
  PlayerStatePlaybackAllLoopsCompleted = 6,
  /*
   * The playback stops.
   */
  PlayerStateStopped = 7,
  /*
   * @ignore
   */
  PlayerStatePausingInternal = 50,
  /*
   * @ignore
   */
  PlayerStateStoppingInternal = 51,
  /*
   * @ignore
   */
  PlayerStateSeekingInternal = 52,
  /*
   * @ignore
   */
  PlayerStateGettingInternal = 53,
  /*
   * @ignore
   */
  PlayerStateNoneInternal = 54,
  /*
   * @ignore
   */
  PlayerStateDoNothingInternal = 55,
  /*
   * @ignore
   */
  PlayerStateSetTrackInternal = 56,
  /*
   * 100: The media player fails to play the media resource.
   */
  PlayerStateFailed = 100,
}

/*
 * Error codes of the media player.
 */
export enum MediaPlayerError {
  /*
   * 0: No error.
   */
  PlayerErrorNone = 0,
  /*
   * -1: Invalid arguments.
   */
  PlayerErrorInvalidArguments = -1,
  /*
   * @ignore
   */
  PlayerErrorInternal = -2,
  /*
   * -3: No resource.
   */
  PlayerErrorNoResource = -3,
  /*
   * -4: Invalid media resource.
   */
  PlayerErrorInvalidMediaSource = -4,
  /*
   * -5: The type of the media stream is unknown.
   */
  PlayerErrorUnknownStreamType = -5,
  /*
   * -6: The object is not initialized.
   */
  PlayerErrorObjNotInitialized = -6,
  /*
   * -7: The codec is not supported.
   */
  PlayerErrorCodecNotSupported = -7,
  /*
   * -8: Invalid renderer.
   */
  PlayerErrorVideoRenderFailed = -8,
  /*
   * -9: An error with the internal state of the player occurs.
   */
  PlayerErrorInvalidState = -9,
  /*
   * -10: The URL of the media resource can not be found.
   */
  PlayerErrorUrlNotFound = -10,
  /*
   * -11: Invalid connection between the player and Agora's server.
   */
  PlayerErrorInvalidConnectionState = -11,
  /*
   * -12: The playback buffer is insufficient.
   */
  PlayerErrorSrcBufferUnderflow = -12,
  /*
   * -13: The playback is interrupted.
   */
  PlayerErrorInterrupted = -13,
  /*
   * -14: The SDK does support the method being called.
   */
  PlayerErrorNotSupported = -14,
  /*
   * -15: The authentication information of the media resource is expired.
   */
  PlayerErrorTokenExpired = -15,
  /*
   * @ignore
   */
  PlayerErrorIpExpired = -16,
  /*
   * -17: An unknown error.
   */
  PlayerErrorUnknown = -17,
}

/*
 * The type of the media stream.
 */
export enum MediaStreamType {
  /*
   * 0: The type is unknown.
   */
  StreamTypeUnknown = 0,
  /*
   * 1: The video stream.
   */
  StreamTypeVideo = 1,
  /*
   * 2: The audio stream.
   */
  StreamTypeAudio = 2,
  /*
   * 3: The subtitle stream.
   */
  StreamTypeSubtitle = 3,
}

/*
 * Media player events.
 */
export enum MediaPlayerEvent {
  /*
   * 0: The player begins to seek to a new playback position.
   */
  PlayerEventSeekBegin = 0,
  /*
   * 1: The player finishes seeking to a new playback position.
   */
  PlayerEventSeekComplete = 1,
  /*
   * 2: An error occurs when seeking to a new playback position.
   */
  PlayerEventSeekError = 2,
  /*
   * 5: The audio track used by the player has been changed.
   */
  PlayerEventAudioTrackChanged = 5,
  /*
   * 6: The currently buffered data is not enough to support playback.
   */
  PlayerEventBufferLow = 6,
  /*
   * 7: The currently buffered data is just enough to support playback.
   */
  PlayerEventBufferRecover = 7,
  /*
   * 8: The audio or video playback freezes.
   */
  PlayerEventFreezeStart = 8,
  /*
   * 9: The audio or video playback resumes without freezing.
   */
  PlayerEventFreezeStop = 9,
  /*
   * 10: The player starts switching the media resource.
   */
  PlayerEventSwitchBegin = 10,
  /*
   * 11: Media resource switching is complete.
   */
  PlayerEventSwitchComplete = 11,
  /*
   * 12: Media resource switching error.
   */
  PlayerEventSwitchError = 12,
  /*
   * 13: The first video frame is rendered.
   */
  PlayerEventFirstDisplayed = 13,
}

/*
 * Events that occur when media resources are preloaded.
 */
export enum PlayerPreloadEvent {
  /*
   * 0: Starts preloading media resources.
   */
  PlayerPreloadEventBegin = 0,
  /*
   * 1: Preloading media resources is complete.
   */
  PlayerPreloadEventComplete = 1,
  /*
   * 2: An error occurs when preloading media resources.
   */
  PlayerPreloadEventError = 2,
}

/*
 * The detailed information of the media stream.
 */
export class PlayerStreamInfo {
  /*
   * The index of the media stream.
   */
  streamIndex?: number;
  /*
   * The type of the media stream. See MediaStreamType .
   */
  streamType?: MediaStreamType;
  /*
   * The codec of the media stream.
   */
  codecName?: string;
  /*
   * The language of the media stream.
   */
  language?: string;
  /*
   * This parameter only takes effect for video streams, and indicates the video frame rate (fps).
   */
  videoFrameRate?: number;
  /*
   * @ignore
   */
  videoBitRate?: number;
  /*
   * This parameter only takes effect for video streams, and indicates the video width (pixel).
   */
  videoWidth?: number;
  /*
   * This parameter only takes effect for video streams, and indicates the video height (pixel).
   */
  videoHeight?: number;
  /*
   * This parameter only takes effect for video streams, and indicates the video rotation angle.
   */
  videoRotation?: number;
  /*
   * This parameter only takes effect for audio streams, and indicates the audio sample rate (Hz).
   */
  audioSampleRate?: number;
  /*
   * This parameter only takes effect for audio streams, and indicates the audio channel number.
   */
  audioChannels?: number;
  /*
   * This parameter only takes effect for audio streams, and indicates the bit number of each audio sample.
   */
  audioBitsPerSample?: number;
  /*
   * The total duration (s) of the media stream.
   */
  duration?: number;
}

/*
 * Information about the video bitrate of the media resource being played.
 */
export class SrcInfo {
  /*
   * The video bitrate (Kbps) of the media resource being played.
   */
  bitrateInKbps?: number;
  /*
   * The name of the media resource.
   */
  name?: string;
}

/*
 * The type of media metadata.
 */
export enum MediaPlayerMetadataType {
  /*
   * 0: The type is unknown.
   */
  PlayerMetadataTypeUnknown = 0,
  /*
   * 1: The type is SEI.
   */
  PlayerMetadataTypeSei = 1,
}

/*
 * Information related to the media player.
 */
export class PlayerUpdatedInfo {
  /*
   * The ID of a media player.
   */
  playerId?: string;
  /*
   * The ID of a deivce.
   */
  deviceId?: string;
}
