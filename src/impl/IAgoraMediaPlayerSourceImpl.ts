import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';

export function processIMediaPlayerSourceObserver(
  handler: IMediaPlayerSourceObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onPlayerSourceStateChanged':
      if (handler.onPlayerSourceStateChanged !== undefined) {
        handler.onPlayerSourceStateChanged(jsonParams.state, jsonParams.reason);
      }
      break;

    case 'onPositionChanged':
      if (handler.onPositionChanged !== undefined) {
        handler.onPositionChanged(
          jsonParams.positionMs,
          jsonParams.timestampMs
        );
      }
      break;

    case 'onPlayerEvent':
      if (handler.onPlayerEvent !== undefined) {
        handler.onPlayerEvent(
          jsonParams.eventCode,
          jsonParams.elapsedTime,
          jsonParams.message
        );
      }
      break;

    case 'onMetaData':
      if (handler.onMetaData !== undefined) {
        handler.onMetaData(jsonParams.data, jsonParams.length);
      }
      break;

    case 'onPlayBufferUpdated':
      if (handler.onPlayBufferUpdated !== undefined) {
        handler.onPlayBufferUpdated(jsonParams.playCachedBuffer);
      }
      break;

    case 'onPreloadEvent':
      if (handler.onPreloadEvent !== undefined) {
        handler.onPreloadEvent(jsonParams.src, jsonParams.event);
      }
      break;

    case 'onCompleted':
      if (handler.onCompleted !== undefined) {
        handler.onCompleted();
      }
      break;

    case 'onAgoraCDNTokenWillExpire':
      if (handler.onAgoraCDNTokenWillExpire !== undefined) {
        handler.onAgoraCDNTokenWillExpire();
      }
      break;

    case 'onPlayerSrcInfoChanged':
      if (handler.onPlayerSrcInfoChanged !== undefined) {
        handler.onPlayerSrcInfoChanged(jsonParams.from, jsonParams.to);
      }
      break;

    case 'onPlayerInfoUpdated':
      if (handler.onPlayerInfoUpdated !== undefined) {
        handler.onPlayerInfoUpdated(jsonParams.info);
      }
      break;

    case 'onPlayerCacheStats':
      if (handler.onPlayerCacheStats !== undefined) {
        handler.onPlayerCacheStats(jsonParams.stats);
      }
      break;

    case 'onPlayerPlaybackStats':
      if (handler.onPlayerPlaybackStats !== undefined) {
        handler.onPlayerPlaybackStats(jsonParams.stats);
      }
      break;

    case 'onAudioVolumeIndication':
      if (handler.onAudioVolumeIndication !== undefined) {
        handler.onAudioVolumeIndication(jsonParams.volume);
      }
      break;
  }
}
