import './extension/IAgoraMediaPlayerSourceExtension';
import {
  CacheStatistics,
  MediaPlayerEvent,
  MediaPlayerReason,
  MediaPlayerState,
  PlayerPlaybackStats,
  PlayerPreloadEvent,
  PlayerUpdatedInfo,
  SrcInfo,
} from './AgoraMediaPlayerTypes';

/**
 * Provides callbacks for the media player.
 */
export interface IMediaPlayerSourceObserver {
  /**
   * Reports player state changes.
   *
   * When the player state changes, the SDK triggers this callback to report the new playback state.
   *
   * @param state New playback state. See MediaPlayerState.
   * @param reason Reason for the player state change. See MediaPlayerReason.
   */
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    reason: MediaPlayerReason
  ): void;

  /**
   * Reports the playback progress of the current media resource.
   *
   * While playing a media file, the SDK automatically triggers this callback every second to report the current playback progress.
   *
   * @param positionMs Current playback progress in ms.
   * @param timestampMs NTP timestamp of the current playback progress in ms.
   */
  onPositionChanged?(positionMs: number, timestampMs: number): void;

  /**
   * Reports player events.
   *
   * After calling seek to locate playback, the SDK triggers this callback to report the result of the seek operation.
   *
   * @param eventCode Player event. See MediaPlayerEvent.
   * @param elapsedTime Time of the event (in milliseconds).
   * @param message Information about the event.
   */
  onPlayerEvent?(
    eventCode: MediaPlayerEvent,
    elapsedTime: number,
    message: string
  ): void;

  /**
   * Reports received media metadata.
   *
   * After parsing the media metadata, the SDK triggers this callback to report the data type and content of the metadata.
   *
   * @param data Specific data in a user-defined format.
   * @param length Data length in bytes.
   */
  onMetaData?(data: Uint8Array, length: number): void;

  /**
   * Reports the playable duration of the current buffered data.
   *
   * While playing online media resources, the SDK triggers this callback every second to report the duration that the current buffered data can support for playback.
   *  When the playable duration of the buffered data is less than the threshold (default is 0), PlayerEventBufferLow (6) is returned.
   *  When the playable duration is greater than the threshold (default is 0), PlayerEventBufferRecover (7) is returned.
   *
   * @param playCachedBuffer The duration (in milliseconds) that the current buffered data can support for playback.
   */
  onPlayBufferUpdated?(playCachedBuffer: number): void;

  /**
   * Reports events during media resource preloading.
   *
   * @param src Path of the media resource.
   * @param event Event that occurred during media resource preloading. See PlayerPreloadEvent.
   */
  onPreloadEvent?(src: string, event: PlayerPreloadEvent): void;

  /**
   * @ignore
   */
  onCompleted?(): void;

  /**
   * @ignore
   */
  onAgoraCDNTokenWillExpire?(): void;

  /**
   * Callback when video bitrate of media resource changes.
   *
   * @param from Information about the video bitrate of the media resource before the change. See SrcInfo.
   * @param to Information about the video bitrate of the media resource after the change. See SrcInfo.
   */
  onPlayerSrcInfoChanged?(from: SrcInfo, to: SrcInfo): void;

  /**
   * Callback when media player information changes.
   *
   * When media player-related information changes, the SDK triggers this callback. You can use it for troubleshooting and diagnostics.
   *
   * @param info Media player-related information. See PlayerUpdatedInfo.
   */
  onPlayerInfoUpdated?(info: PlayerUpdatedInfo): void;

  /**
   * Reports information about the currently cached media resources.
   *
   * After calling the openWithMediaSource method and setting the enableCache member to true, the SDK triggers this callback once per second after the media file is opened, reporting statistical data of the currently cached media files.
   *
   * @param stats Information about the media resources in the cache. See CacheStatistics.
   */
  onPlayerCacheStats?(stats: CacheStatistics): void;

  /**
   * Reports information about the currently playing media resource.
   *
   * After the media resource starts playing, the SDK triggers this callback once per second to report information about the media resource.
   *
   * @param stats Information about the media resource. See PlayerPlaybackStats.
   */
  onPlayerPlaybackStats?(stats: PlayerPlaybackStats): void;

  /**
   * Audio volume indication callback for the media player.
   *
   * The SDK triggers this callback every 200 ms to report the current volume of the media player.
   *
   * @param volume The current volume of the player, ranging from [0,255].
   */
  onAudioVolumeIndication?(volume: number): void;
}
