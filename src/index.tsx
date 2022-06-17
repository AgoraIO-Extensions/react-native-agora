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

import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcEngineInternal } from './internal/RtcEngineInternal';

const instance = new RtcEngineInternal();

export function createAgoraRtcEngine(): IRtcEngine {
  return instance;
}
