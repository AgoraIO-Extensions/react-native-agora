import './extension/IAgoraMediaPlayerSourceExtension';
import {
  MediaPlayerError,
  MediaPlayerEvent,
  MediaPlayerState,
  PlayerPreloadEvent,
  PlayerUpdatedInfo,
  SrcInfo,
} from './AgoraMediaPlayerTypes';

/**
 * Provides callbacks for media players.
 */
export interface IMediaPlayerSourceObserver {
  /**
   * Reports the changes of playback state.
   *
   * When the state of the media player changes, the SDK triggers this callback to report the current playback state.
   *
   * @param state The playback state. See MediaPlayerState.
   * @param ec The error code. See MediaPlayerError.
   */
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    ec: MediaPlayerError
  ): void;

  /**
   * Reports current playback progress.
   *
   * When playing media files, the SDK triggers this callback every two second to report current playback progress.
   *
   * @param position The playback position (ms) of media files.
   */
  onPositionChanged?(positionMs: number): void;

  /**
   * Reports the player events.
   *
   * After calling the seek method, the SDK triggers the callback to report the results of the seek operation.
   *
   * @param eventCode The player events. See MediaPlayerEvent.
   * @param elapsedTime The time (ms) when the event occurs.
   * @param message Information about the event.
   */
  onPlayerEvent?(eventCode: MediaPlayerEvent, elapsedTime: number): string;

  /**
   * Occurs when the media metadata is received.
   *
   * The callback occurs when the player receives the media metadata and reports the detailed information of the media metadata.
   *
   * @param data The detailed data of the media metadata.
   * @param length The data length (bytes).
   */
  onMetaData?(data: Uint8Array, length: number): void;

  /**
   * Reports the playback duration that the buffered data can support.
   *
   * When playing online media resources, the SDK triggers this callback every two seconds to report the playback duration that the currently buffered data can support.
   *  When the playback duration supported by the buffered data is less than the threshold (0 by default), the SDK returns PlayerEventBufferLow.
   *  When the playback duration supported by the buffered data is greater than the threshold (0 by default), the SDK returns PlayerEventBufferRecover.
   *
   * @param playCachedBuffer The playback duration (ms) that the buffered data can support.
   */
  onPlayBufferUpdated?(playCachedBuffer: number): void;

  /**
   * Reports the events of preloaded media resources.
   *
   * @param src The URL of the media resource.
   * @param event Events that occur when media resources are preloaded. See PlayerPreloadEvent.
   */
  onPreloadEvent?(event: PlayerPreloadEvent): string;

  /**
   * @ignore
   */
  onCompleted?(): void;

  /**
   * @ignore
   */
  onAgoraCDNTokenWillExpire?(): void;

  /**
   * @ignore
   */
  onPlayerSrcInfoChanged?(): { from: SrcInfo; to: SrcInfo };

  /**
   * @ignore
   */
  onPlayerInfoUpdated?(): PlayerUpdatedInfo;

  /**
   * Reports the volume of the media player.
   *
   * The SDK triggers this callback every 200 milliseconds to report the current volume of the media player.
   *
   * @param volume The volume of the media player. The value ranges from 0 to 255.
   */
  onAudioVolumeIndication?(volume: number): void;
}
