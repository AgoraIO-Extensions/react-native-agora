import { NativeEventEmitter } from 'react-native';

import { IMediaPlayerCacheManager } from './IAgoraMediaPlayer';
import { IRtcEngine } from './IAgoraRtcEngine';
import { handleEvent } from './internal/IrisApiEngine';
import { RtcEngineExInternal } from './internal/RtcEngineExInternal';

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
export { isDebuggable, setDebuggable } from './Utils';
export { callIrisApi } from './internal/call';

const AgoraEventEmitter = new NativeEventEmitter(AgoraRtcNg);
AgoraEventEmitter.addListener('AgoraRtcNg:onEvent', handleEvent);

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

import AgoraRtcNg from './specs';

import { IMediaPlayerCacheManagerImpl } from './impl/IAgoraMediaPlayerImpl';
