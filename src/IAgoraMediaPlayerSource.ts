import './extension/IAgoraMediaPlayerSourceExtension';
import {
  MediaPlayerState,
  MediaPlayerError,
  MediaPlayerEvent,
  PlayerPreloadEvent,
  SrcInfo,
  PlayerUpdatedInfo,
} from './AgoraMediaPlayerTypes';
export interface IMediaPlayerSourceObserver {
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    ec: MediaPlayerError
  ): void;

  onPositionChanged?(positionMs: number): void;

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