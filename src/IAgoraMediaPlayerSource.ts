import './extension/IAgoraMediaPlayerSourceExtension';
import {
  MediaPlayerState,
  MediaPlayerError,
  MediaPlayerEvent,
  PlayerPreloadEvent,
  SrcInfo,
  PlayerUpdatedInfo,
} from './AgoraMediaPlayerTypes';
/**
 * Provides callbacks for media players.
 */
export interface IMediaPlayerSourceObserver {
  /**
   * Reports the playback state change.
   * When the state of the media player changes, the SDK triggers this callback to report the current playback state.
   */
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    ec: MediaPlayerError
  ): void;

  /**
   * Reports current playback progress.
   * When playing media files, the SDK triggers this callback every one second to report current playback progress.
   */
  onPositionChanged?(positionMs: number): void;

  /**
   * Reports the playback event.
   * After calling the seek method, the SDK triggers the callback to report the results of the seek operation.
   */
  onPlayerEvent?(
    eventCode: MediaPlayerEvent,
    elapsedTime: number,
    message: string
  ): void;

  /**
   * Occurs when the media metadata is received.
   * The callback occurs when the player receives the media metadata and reports the detailed information of the media metadata.
   */
  onMetaData?(data: Uint8Array, length: number): void;

  /**
   * Reports the playback duration that the buffered data can support.
   * When playing online media resources, the SDK triggers this callback every two seconds to report the playback duration that the currently buffered data can support.When the playback duration supported by the buffered data is less than the threshold (0 by default), the SDK returns PlayerEventBufferLow.When the playback duration supported by the buffered data is greater than the threshold (0 by default), the SDK returns PlayerEventBufferRecover.
   */
  onPlayBufferUpdated?(playCachedBuffer: number): void;

  /**
   * Reports the events of preloaded media resources.
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
   * Occurs when the video bitrate of the media resource changes.
   */
  onPlayerSrcInfoChanged?(from: SrcInfo, to: SrcInfo): void;

  /**
   * Occurs when information related to the media player changes.
   * When the information about the media player changes, the SDK triggers this callback. You can use this callback for troubleshooting.
   */
  onPlayerInfoUpdated?(info: PlayerUpdatedInfo): void;

  /**
   * Reports the volume of the media player.
   * The SDK triggers this callback every 200 milliseconds to report the current volume of the media player.
   */
  onAudioVolumeIndication?(volume: number): void;
}
