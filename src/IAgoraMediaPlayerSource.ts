import {
  MediaPlayerState,
  MediaPlayerError,
  MediaPlayerEvent,
  PlayerPreloadEvent,
  SrcInfo,
  PlayerUpdatedInfo,
} from './AgoraMediaPlayerTypes';

export abstract class IMediaPlayerSourceObserver {
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    ec: MediaPlayerError
  ): void;

  onPositionChanged?(position: number): void;

  onPlayerEvent?(
    eventCode: MediaPlayerEvent,
    elapsedTime: number,
    message: string
  ): void;

  onMetaData?(data: Uint8Array, length: number): void;

  onPlayBufferUpdated?(playCachedBuffer: number): void;

  onPreloadEvent?(src: string, event: PlayerPreloadEvent): void;

  onCompleted?(): void;

  onAgoraCDNTokenWillExpire?(): void;

  onPlayerSrcInfoChanged?(from: SrcInfo, to: SrcInfo): void;

  onPlayerInfoUpdated?(info: PlayerUpdatedInfo): void;

  onAudioVolumeIndication?(volume: number): void;
}
