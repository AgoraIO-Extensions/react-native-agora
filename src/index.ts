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
 * Creates the IRtcEngine object.
 * Currently, the Agora RTC SDK v4.0.0 supports creating only one IRtcEngine object for an app.
 *
 * @returns
 * IRtcEngine object.
 */
export function createAgoraRtcEngine(): IRtcEngine {
  return instance;
}
