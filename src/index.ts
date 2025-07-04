import { IMediaPlayerCacheManager } from './IAgoraMediaPlayer';
import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcEngineExInternal } from './internal/RtcEngineExInternal';
import AgoraRtcNg from './specs';

export const showRPSystemBroadcastPickerView =
  AgoraRtcNg.showRPSystemBroadcastPickerView;

export * from './AgoraBase';
export * from './AgoraMediaBase';
export * from './AgoraMediaPlayerTypes';
export * from './IAgoraLog';
export * from './IAgoraMediaEngine';
export * from './IAgoraMediaPlayer';
export * from './IAgoraMediaPlayerSource';
export * from './IAgoraMediaRecorder';
export * from './IAgoraMusicContentCenter';
export * from './IAgoraRhythmPlayer';
export * from './IAgoraRtcEngine';
export * from './IAgoraRtcEngineEx';
export * from './IAgoraSpatialAudio';
export * from './IAudioDeviceManager';
export * from './AgoraRtcRenderView';
export * from './IAgoraPip';
export {
  isDebuggable,
  setDebuggable,
  callIrisApi,
} from './internal/IrisApiEngine';

const instance = new RtcEngineExInternal();

/**
 * Creates one IRtcEngine object.
 *
 * Currently, the Agora RTC SDK v4.x supports creating only one IRtcEngine object for each app.
 *
 * @returns
 * One IRtcEngine object.
 */
export function createAgoraRtcEngine(): IRtcEngine {
  return instance;
}

/**
 * Gets one IMediaPlayerCacheManager instance.
 *
 * Before calling any APIs in the IMediaPlayerCacheManager class, you need to call this method to get a cache manager instance of a media player.
 *
 * @returns
 * The IMediaPlayerCacheManager instance.
 */
export function getMediaPlayerCacheManager(): IMediaPlayerCacheManager {
  return new IMediaPlayerCacheManagerImpl();
}

export default createAgoraRtcEngine;

import { IMediaPlayerCacheManagerImpl } from './impl/IAgoraMediaPlayerImpl';
