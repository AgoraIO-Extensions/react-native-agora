import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcEngineInternal } from './internal/RtcEngineInternal';

export * from './AgoraBase';
export * from './AgoraMediaBase';
export * from './AgoraMediaPlayerTypes';
export * from './IAgoraLog';
export * from './IAgoraMediaPlayer';
export * from './IAgoraMediaPlayerSource';
export * from './IAgoraRhythmPlayer';
export * from './IAgoraRtcEngine';
export * from './IAgoraRtcEngineEx';
export * from './IAudioDeviceManager';
export * from './AgoraRtcRenderView';

const instance = new RtcEngineInternal();

/*
 * 创建 IRtcEngine 对象。
 * 目前 Agora RTC SDK v4.0.0 只支持每个 app 创建一个 IRtcEngine 对象。
 *
 * @returns
 * IRtcEngine 对象。
 */
export function createAgoraRtcEngine(): IRtcEngine {
  return instance;
}
