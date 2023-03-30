import './extension/IAgoraMediaPlayerSourceExtension';
import {
  MediaPlayerState,
  MediaPlayerError,
  MediaPlayerEvent,
  PlayerPreloadEvent,
  SrcInfo,
  PlayerUpdatedInfo,
} from './AgoraMediaPlayerTypes';
/* class_imediaplayersourceobserver */
export interface IMediaPlayerSourceObserver {
  /* callback_imediaplayersourceobserver_onplayersourcestatechanged */
  onPlayerSourceStateChanged?(
    state: MediaPlayerState,
    ec: MediaPlayerError
  ): void;

  /* callback_imediaplayersourceobserver_onpositionchanged */
  onPositionChanged?(positionMs: number): void;

  /* callback_imediaplayersourceobserver_onplayerevent */
  onPlayerEvent?(
    eventCode: MediaPlayerEvent,
    elapsedTime: number,
    message: string
  ): void;

  /* callback_imediaplayersourceobserver_onmetadata */
  onMetaData?(data: Uint8Array, length: number): void;

  /* callback_imediaplayersourceobserver_onplaybufferupdated */
  onPlayBufferUpdated?(playCachedBuffer: number): void;

  /* callback_imediaplayersourceobserver_onpreloadevent */
  onPreloadEvent?(src: string, event: PlayerPreloadEvent): void;

  /* callback_imediaplayersourceobserver_oncompleted */
  onCompleted?(): void;

  /* callback_imediaplayersourceobserver_onagoracdntokenwillexpire */
  onAgoraCDNTokenWillExpire?(): void;

  /* callback_imediaplayersourceobserver_onplayersrcinfochanged */
  onPlayerSrcInfoChanged?(from: SrcInfo, to: SrcInfo): void;

  /* callback_imediaplayersourceobserver_onplayerinfoupdated */
  onPlayerInfoUpdated?(info: PlayerUpdatedInfo): void;

  /* callback_imediaplayersourceobserver_onaudiovolumeindication */
  onAudioVolumeIndication?(volume: number): void;
}
