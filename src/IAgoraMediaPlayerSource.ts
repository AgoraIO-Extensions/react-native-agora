import {
  MediaPlayerState,
  MediaPlayerError,
  MediaPlayerEvent,
  PlayerPreloadEvent,
  SrcInfo,
  PlayerUpdatedInfo,
} from './AgoraMediaPlayerTypes';

/*
 * Provides callbacks for media players.
 */
export abstract class IMediaPlayerSourceObserver {
  /*
   * Reports the playback state change.
   * When the state of the media player changes, the SDK triggers this callback to report the current playback state.
   *
   * @param state The playback state, see MediaPlayerState .
   *
   * @param ec The error code. See MediaPlayerError .
   */
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    ec: MediaPlayerError
  ): void;

  /*
   * Reports the current playback progress.
   * When playing media files, the SDK triggers this callback every one second to report current playback progress.
   *
   * @param position The playback position (ms) of media files.
   */
  onPositionChanged?(position: number): void;

  /*
   * Reports the playback event.
   * After calling the seek method, the SDK triggers the callback to report the results of the seek operation.
   *
   * @param eventCode The playback event. See MediaPlayerEvent .
   *
   * @param elapsedTime The time (ms) when the event occurs.
   *
   * @param message Information about the event.
   */
  onPlayerEvent?(
    eventCode: MediaPlayerEvent,
    elapsedTime: number,
    message: string
  ): void;

  /*
   * Occurs when the media metadata is received.
   * The callback occurs when the player receives the media metadata and reports the detailed information of the media metadata.
   *
   * @param data The detailed data of the media metadata.
   *
   * @param length The data length (bytes).
   */
  onMetaData?(data: Uint8Array, length: number): void;

  /*
   * Reports the playback duration that the buffered data can support.
   * When playing online media resources, the SDK triggers this callback every two seconds to report the playback duration that the currently buffered data can support.
   * When the playback duration supported by the buffered data is less than the threshold (0 by default), the SDK returns PlayerEventBufferLow.
   * When the playback duration supported by the buffered data is greater than the threshold (0 by default), the SDK returns PlayerEventBufferRecover.
   *
   * @param playCachedBuffer The playback duration (ms) that the buffered data can support.
   */
  onPlayBufferUpdated?(playCachedBuffer: number): void;

  /*
   * Reports the events of preloaded media resources.
   *
   * @param event Events that occur when media resources are preloaded. See PlayerPreloadEvent .
   */
  onPreloadEvent?(src: string, event: PlayerPreloadEvent): void;

  /*
   * @ignore
   */
  onCompleted?(): void;

  /*
   * Occurs when the token is about to expire.
   * If the ts is about to expire when you call the switchAgoraCDNLineByIndex method to switch the CDN route for playing the media resource, the SDK triggers this callback to remind you to renew the authentication information. You need to call the renewAgoraCDNSrcToken method to pass in the updated authentication information to update the authentication information of the media resource URL. After updating the authentication information, you need to call switchAgoraCDNLineByIndex to complete the route switching.
   */
  onAgoraCDNTokenWillExpire?(): void;

  /*
   * Occurs when the video bitrate of the media resource changes.
   *
   * @param from Information about the video bitrate of the media resource being played. See SrcInfo .
   *
   * @param to Information about the changed video bitrate of media resource being played. See SrcInfo .
   */
  onPlayerSrcInfoChanged?(from: SrcInfo, to: SrcInfo): void;

  /*
   * Occurs when information related to the media player changes.
   * When the information about the media player changes, the SDK triggers this callback. You can use this callback for troubleshooting.
   *
   * @param info Information related to the media player. See PlayerUpdatedInfo .
   */
  onPlayerInfoUpdated?(info: PlayerUpdatedInfo): void;

  /*
@ignore   */
  onAudioVolumeIndication?(volume: number): void;
}
