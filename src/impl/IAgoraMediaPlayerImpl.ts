import { SpatialAudioParams } from '../AgoraBase';
import {
  AudioDualMonoMode,
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  RawAudioFrameOpModeType,
  RenderModeType,
} from '../AgoraMediaBase';
import {
  MediaPlayerState,
  MediaSource,
  PlayerStreamInfo,
} from '../AgoraMediaPlayerTypes';
import {
  IMediaPlayer,
  IMediaPlayerCacheManager,
  IMediaPlayerVideoFrameObserver,
} from '../IAgoraMediaPlayer';
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import { callIrisApi } from '../index';

// @ts-ignore
export class IMediaPlayerImpl implements IMediaPlayer {
  getMediaPlayerId(): number {
    const apiType = this.getApiTypeFromGetMediaPlayerId();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetMediaPlayerId(): string {
    return 'MediaPlayer_getMediaPlayerId';
  }

  open(url: string, startPos: number): number {
    const apiType = this.getApiTypeFromOpen(url, startPos);
    const jsonParams = {
      url: url,
      startPos: startPos,
      toJSON: () => {
        return {
          url: url,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromOpen(url: string, startPos: number): string {
    return 'MediaPlayer_open_e43f201';
  }

  openWithMediaSource(source: MediaSource): number {
    const apiType = this.getApiTypeFromOpenWithMediaSource(source);
    const jsonParams = {
      source: source,
      toJSON: () => {
        return {
          source: source,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromOpenWithMediaSource(source: MediaSource): string {
    return 'MediaPlayer_openWithMediaSource_3c11499';
  }

  play(): number {
    const apiType = this.getApiTypeFromPlay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPlay(): string {
    return 'MediaPlayer_play';
  }

  pause(): number {
    const apiType = this.getApiTypeFromPause();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPause(): string {
    return 'MediaPlayer_pause';
  }

  stop(): number {
    const apiType = this.getApiTypeFromStop();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStop(): string {
    return 'MediaPlayer_stop';
  }

  resume(): number {
    const apiType = this.getApiTypeFromResume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResume(): string {
    return 'MediaPlayer_resume';
  }

  seek(newPos: number): number {
    const apiType = this.getApiTypeFromSeek(newPos);
    const jsonParams = {
      newPos: newPos,
      toJSON: () => {
        return {
          newPos: newPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSeek(newPos: number): string {
    return 'MediaPlayer_seek_f631116';
  }

  setAudioPitch(pitch: number): number {
    const apiType = this.getApiTypeFromSetAudioPitch(pitch);
    const jsonParams = {
      pitch: pitch,
      toJSON: () => {
        return {
          pitch: pitch,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioPitch(pitch: number): string {
    return 'MediaPlayer_setAudioPitch_46f8ab7';
  }

  getDuration(): number {
    const apiType = this.getApiTypeFromGetDuration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const duration = jsonResults.duration;
    return duration;
  }

  protected getApiTypeFromGetDuration(): string {
    return 'MediaPlayer_getDuration_b12f121';
  }

  getPlayPosition(): number {
    const apiType = this.getApiTypeFromGetPlayPosition();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const pos = jsonResults.pos;
    return pos;
  }

  protected getApiTypeFromGetPlayPosition(): string {
    return 'MediaPlayer_getPlayPosition_b12f121';
  }

  getStreamCount(): number {
    const apiType = this.getApiTypeFromGetStreamCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const count = jsonResults.count;
    return count;
  }

  protected getApiTypeFromGetStreamCount(): string {
    return 'MediaPlayer_getStreamCount_b12f121';
  }

  getStreamInfo(index: number): PlayerStreamInfo {
    const apiType = this.getApiTypeFromGetStreamInfo(index);
    const jsonParams = {
      index: index,
      toJSON: () => {
        return {
          index: index,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const info = jsonResults.info;
    return info;
  }

  protected getApiTypeFromGetStreamInfo(index: number): string {
    return 'MediaPlayer_getStreamInfo_0fa63fa';
  }

  setLoopCount(loopCount: number): number {
    const apiType = this.getApiTypeFromSetLoopCount(loopCount);
    const jsonParams = {
      loopCount: loopCount,
      toJSON: () => {
        return {
          loopCount: loopCount,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLoopCount(loopCount: number): string {
    return 'MediaPlayer_setLoopCount_46f8ab7';
  }

  setPlaybackSpeed(speed: number): number {
    const apiType = this.getApiTypeFromSetPlaybackSpeed(speed);
    const jsonParams = {
      speed: speed,
      toJSON: () => {
        return {
          speed: speed,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlaybackSpeed(speed: number): string {
    return 'MediaPlayer_setPlaybackSpeed_46f8ab7';
  }

  selectAudioTrack(index: number): number {
    const apiType = this.getApiTypeFromSelectAudioTrack(index);
    const jsonParams = {
      index: index,
      toJSON: () => {
        return {
          index: index,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSelectAudioTrack(index: number): string {
    return 'MediaPlayer_selectAudioTrack_46f8ab7';
  }

  selectMultiAudioTrack(
    playoutTrackIndex: number,
    publishTrackIndex: number
  ): number {
    const apiType = this.getApiTypeFromSelectMultiAudioTrack(
      playoutTrackIndex,
      publishTrackIndex
    );
    const jsonParams = {
      playoutTrackIndex: playoutTrackIndex,
      publishTrackIndex: publishTrackIndex,
      toJSON: () => {
        return {
          playoutTrackIndex: playoutTrackIndex,
          publishTrackIndex: publishTrackIndex,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSelectMultiAudioTrack(
    playoutTrackIndex: number,
    publishTrackIndex: number
  ): string {
    return 'MediaPlayer_selectMultiAudioTrack_4e92b3c';
  }

  takeScreenshot(filename: string): number {
    const apiType = this.getApiTypeFromTakeScreenshot(filename);
    const jsonParams = {
      filename: filename,
      toJSON: () => {
        return {
          filename: filename,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromTakeScreenshot(filename: string): string {
    return 'MediaPlayer_takeScreenshot_3a2037f';
  }

  selectInternalSubtitle(index: number): number {
    const apiType = this.getApiTypeFromSelectInternalSubtitle(index);
    const jsonParams = {
      index: index,
      toJSON: () => {
        return {
          index: index,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSelectInternalSubtitle(index: number): string {
    return 'MediaPlayer_selectInternalSubtitle_46f8ab7';
  }

  setExternalSubtitle(url: string): number {
    const apiType = this.getApiTypeFromSetExternalSubtitle(url);
    const jsonParams = {
      url: url,
      toJSON: () => {
        return {
          url: url,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetExternalSubtitle(url: string): string {
    return 'MediaPlayer_setExternalSubtitle_3a2037f';
  }

  getState(): MediaPlayerState {
    const apiType = this.getApiTypeFromGetState();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetState(): string {
    return 'MediaPlayer_getState';
  }

  mute(muted: boolean): number {
    const apiType = this.getApiTypeFromMute(muted);
    const jsonParams = {
      muted: muted,
      toJSON: () => {
        return {
          muted: muted,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMute(muted: boolean): string {
    return 'MediaPlayer_mute_5039d15';
  }

  getMute(): boolean {
    const apiType = this.getApiTypeFromGetMute();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const muted = jsonResults.muted;
    return muted;
  }

  protected getApiTypeFromGetMute(): string {
    return 'MediaPlayer_getMute_c93e9d4';
  }

  adjustPlayoutVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustPlayoutVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustPlayoutVolume(volume: number): string {
    return 'MediaPlayer_adjustPlayoutVolume_46f8ab7';
  }

  getPlayoutVolume(): number {
    const apiType = this.getApiTypeFromGetPlayoutVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const volume = jsonResults.volume;
    return volume;
  }

  protected getApiTypeFromGetPlayoutVolume(): string {
    return 'MediaPlayer_getPlayoutVolume_9cfaa7e';
  }

  adjustPublishSignalVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustPublishSignalVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustPublishSignalVolume(volume: number): string {
    return 'MediaPlayer_adjustPublishSignalVolume_46f8ab7';
  }

  getPublishSignalVolume(): number {
    const apiType = this.getApiTypeFromGetPublishSignalVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const volume = jsonResults.volume;
    return volume;
  }

  protected getApiTypeFromGetPublishSignalVolume(): string {
    return 'MediaPlayer_getPublishSignalVolume_9cfaa7e';
  }

  setView(view: any): number {
    const apiType = this.getApiTypeFromSetView(view);
    const jsonParams = {
      view: view,
      toJSON: () => {
        return {
          view: view,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetView(view: any): string {
    return 'MediaPlayer_setView_cb1a81f';
  }

  setRenderMode(renderMode: RenderModeType): number {
    const apiType = this.getApiTypeFromSetRenderMode(renderMode);
    const jsonParams = {
      renderMode: renderMode,
      toJSON: () => {
        return {
          renderMode: renderMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRenderMode(renderMode: RenderModeType): string {
    return 'MediaPlayer_setRenderMode_bedb5ae';
  }

  registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    const apiType = this.getApiTypeFromRegisterPlayerSourceObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): string {
    return 'MediaPlayer_registerPlayerSourceObserver_15621d7';
  }

  unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    const apiType = this.getApiTypeFromUnregisterPlayerSourceObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): string {
    return 'MediaPlayer_unregisterPlayerSourceObserver_15621d7';
  }

  registerAudioFrameObserver(
    observer: IAudioPcmFrameSink,
    mode: RawAudioFrameOpModeType = RawAudioFrameOpModeType.RawAudioFrameOpModeReadOnly
  ): number {
    const apiType = this.getApiTypeFromRegisterAudioFrameObserver(
      observer,
      mode
    );
    const jsonParams = {
      observer: observer,
      mode: mode,
      toJSON: () => {
        return {
          mode: mode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterAudioFrameObserver(
    observer: IAudioPcmFrameSink,
    mode: RawAudioFrameOpModeType = RawAudioFrameOpModeType.RawAudioFrameOpModeReadOnly
  ): string {
    return 'MediaPlayer_registerAudioFrameObserver_a5b510b';
  }

  unregisterAudioFrameObserver(observer: IAudioPcmFrameSink): number {
    const apiType = this.getApiTypeFromUnregisterAudioFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterAudioFrameObserver(
    observer: IAudioPcmFrameSink
  ): string {
    return 'MediaPlayer_unregisterAudioFrameObserver_89ab9b5';
  }

  registerVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number {
    const apiType = this.getApiTypeFromRegisterVideoFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): string {
    return 'MediaPlayer_registerVideoFrameObserver_833bd8d';
  }

  unregisterVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): number {
    const apiType = this.getApiTypeFromUnregisterVideoFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): string {
    return 'MediaPlayer_unregisterVideoFrameObserver_5165d4c';
  }

  registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): number {
    const apiType = this.getApiTypeFromRegisterMediaPlayerAudioSpectrumObserver(
      observer,
      intervalInMS
    );
    const jsonParams = {
      observer: observer,
      intervalInMS: intervalInMS,
      toJSON: () => {
        return {
          intervalInMS: intervalInMS,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): string {
    return 'MediaPlayer_registerMediaPlayerAudioSpectrumObserver_226bb48';
  }

  unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number {
    const apiType =
      this.getApiTypeFromUnregisterMediaPlayerAudioSpectrumObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): string {
    return 'MediaPlayer_unregisterMediaPlayerAudioSpectrumObserver_09064ce';
  }

  setAudioDualMonoMode(mode: AudioDualMonoMode): number {
    const apiType = this.getApiTypeFromSetAudioDualMonoMode(mode);
    const jsonParams = {
      mode: mode,
      toJSON: () => {
        return {
          mode: mode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioDualMonoMode(
    mode: AudioDualMonoMode
  ): string {
    return 'MediaPlayer_setAudioDualMonoMode_30c9672';
  }

  getPlayerSdkVersion(): string {
    const apiType = this.getApiTypeFromGetPlayerSdkVersion();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetPlayerSdkVersion(): string {
    return 'MediaPlayer_getPlayerSdkVersion';
  }

  getPlaySrc(): string {
    const apiType = this.getApiTypeFromGetPlaySrc();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetPlaySrc(): string {
    return 'MediaPlayer_getPlaySrc';
  }

  openWithAgoraCDNSrc(src: string, startPos: number): number {
    const apiType = this.getApiTypeFromOpenWithAgoraCDNSrc(src, startPos);
    const jsonParams = {
      src: src,
      startPos: startPos,
      toJSON: () => {
        return {
          src: src,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromOpenWithAgoraCDNSrc(
    src: string,
    startPos: number
  ): string {
    return 'MediaPlayer_openWithAgoraCDNSrc_e43f201';
  }

  getAgoraCDNLineCount(): number {
    const apiType = this.getApiTypeFromGetAgoraCDNLineCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAgoraCDNLineCount(): string {
    return 'MediaPlayer_getAgoraCDNLineCount';
  }

  switchAgoraCDNLineByIndex(index: number): number {
    const apiType = this.getApiTypeFromSwitchAgoraCDNLineByIndex(index);
    const jsonParams = {
      index: index,
      toJSON: () => {
        return {
          index: index,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSwitchAgoraCDNLineByIndex(index: number): string {
    return 'MediaPlayer_switchAgoraCDNLineByIndex_46f8ab7';
  }

  getCurrentAgoraCDNIndex(): number {
    const apiType = this.getApiTypeFromGetCurrentAgoraCDNIndex();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetCurrentAgoraCDNIndex(): string {
    return 'MediaPlayer_getCurrentAgoraCDNIndex';
  }

  enableAutoSwitchAgoraCDN(enable: boolean): number {
    const apiType = this.getApiTypeFromEnableAutoSwitchAgoraCDN(enable);
    const jsonParams = {
      enable: enable,
      toJSON: () => {
        return {
          enable: enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableAutoSwitchAgoraCDN(enable: boolean): string {
    return 'MediaPlayer_enableAutoSwitchAgoraCDN_5039d15';
  }

  renewAgoraCDNSrcToken(token: string, ts: number): number {
    const apiType = this.getApiTypeFromRenewAgoraCDNSrcToken(token, ts);
    const jsonParams = {
      token: token,
      ts: ts,
      toJSON: () => {
        return {
          token: token,
          ts: ts,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRenewAgoraCDNSrcToken(
    token: string,
    ts: number
  ): string {
    return 'MediaPlayer_renewAgoraCDNSrcToken_e43f201';
  }

  switchAgoraCDNSrc(src: string, syncPts: boolean = false): number {
    const apiType = this.getApiTypeFromSwitchAgoraCDNSrc(src, syncPts);
    const jsonParams = {
      src: src,
      syncPts: syncPts,
      toJSON: () => {
        return {
          src: src,
          syncPts: syncPts,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSwitchAgoraCDNSrc(
    src: string,
    syncPts: boolean = false
  ): string {
    return 'MediaPlayer_switchAgoraCDNSrc_7a174df';
  }

  switchSrc(src: string, syncPts: boolean = true): number {
    const apiType = this.getApiTypeFromSwitchSrc(src, syncPts);
    const jsonParams = {
      src: src,
      syncPts: syncPts,
      toJSON: () => {
        return {
          src: src,
          syncPts: syncPts,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSwitchSrc(
    src: string,
    syncPts: boolean = true
  ): string {
    return 'MediaPlayer_switchSrc_7a174df';
  }

  preloadSrc(src: string, startPos: number): number {
    const apiType = this.getApiTypeFromPreloadSrc(src, startPos);
    const jsonParams = {
      src: src,
      startPos: startPos,
      toJSON: () => {
        return {
          src: src,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPreloadSrc(src: string, startPos: number): string {
    return 'MediaPlayer_preloadSrc_e43f201';
  }

  playPreloadedSrc(src: string): number {
    const apiType = this.getApiTypeFromPlayPreloadedSrc(src);
    const jsonParams = {
      src: src,
      toJSON: () => {
        return {
          src: src,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPlayPreloadedSrc(src: string): string {
    return 'MediaPlayer_playPreloadedSrc_3a2037f';
  }

  unloadSrc(src: string): number {
    const apiType = this.getApiTypeFromUnloadSrc(src);
    const jsonParams = {
      src: src,
      toJSON: () => {
        return {
          src: src,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnloadSrc(src: string): string {
    return 'MediaPlayer_unloadSrc_3a2037f';
  }

  setSpatialAudioParams(params: SpatialAudioParams): number {
    const apiType = this.getApiTypeFromSetSpatialAudioParams(params);
    const jsonParams = {
      params: params,
      toJSON: () => {
        return {
          params: params,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSpatialAudioParams(
    params: SpatialAudioParams
  ): string {
    return 'MediaPlayer_setSpatialAudioParams_5035667';
  }

  setSoundPositionParams(pan: number, gain: number): number {
    const apiType = this.getApiTypeFromSetSoundPositionParams(pan, gain);
    const jsonParams = {
      pan: pan,
      gain: gain,
      toJSON: () => {
        return {
          pan: pan,
          gain: gain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSoundPositionParams(
    pan: number,
    gain: number
  ): string {
    return 'MediaPlayer_setSoundPositionParams_f282d50';
  }

  setPlayerOptionInInt(key: string, value: number): number {
    const apiType = this.getApiTypeFromSetPlayerOptionInInt(key, value);
    const jsonParams = {
      key: key,
      value: value,
      toJSON: () => {
        return {
          key: key,
          value: value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlayerOptionInInt(
    key: string,
    value: number
  ): string {
    return 'MediaPlayer_setPlayerOption_4d05d29';
  }

  setPlayerOptionInString(key: string, value: string): number {
    const apiType = this.getApiTypeFromSetPlayerOptionInString(key, value);
    const jsonParams = {
      key: key,
      value: value,
      toJSON: () => {
        return {
          key: key,
          value: value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlayerOptionInString(
    key: string,
    value: string
  ): string {
    return 'MediaPlayer_setPlayerOption_ccad422';
  }
}

// @ts-ignore
export class IMediaPlayerCacheManagerImpl implements IMediaPlayerCacheManager {
  removeAllCaches(): number {
    const apiType = this.getApiTypeFromRemoveAllCaches();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRemoveAllCaches(): string {
    return 'MediaPlayerCacheManager_removeAllCaches';
  }

  removeOldCache(): number {
    const apiType = this.getApiTypeFromRemoveOldCache();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRemoveOldCache(): string {
    return 'MediaPlayerCacheManager_removeOldCache';
  }

  removeCacheByUri(uri: string): number {
    const apiType = this.getApiTypeFromRemoveCacheByUri(uri);
    const jsonParams = {
      uri: uri,
      toJSON: () => {
        return {
          uri: uri,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRemoveCacheByUri(uri: string): string {
    return 'MediaPlayerCacheManager_removeCacheByUri_3a2037f';
  }

  setCacheDir(path: string): number {
    const apiType = this.getApiTypeFromSetCacheDir(path);
    const jsonParams = {
      path: path,
      toJSON: () => {
        return {
          path: path,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCacheDir(path: string): string {
    return 'MediaPlayerCacheManager_setCacheDir_3a2037f';
  }

  setMaxCacheFileCount(count: number): number {
    const apiType = this.getApiTypeFromSetMaxCacheFileCount(count);
    const jsonParams = {
      count: count,
      toJSON: () => {
        return {
          count: count,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetMaxCacheFileCount(count: number): string {
    return 'MediaPlayerCacheManager_setMaxCacheFileCount_46f8ab7';
  }

  setMaxCacheFileSize(cacheSize: number): number {
    const apiType = this.getApiTypeFromSetMaxCacheFileSize(cacheSize);
    const jsonParams = {
      cacheSize: cacheSize,
      toJSON: () => {
        return {
          cacheSize: cacheSize,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetMaxCacheFileSize(cacheSize: number): string {
    return 'MediaPlayerCacheManager_setMaxCacheFileSize_f631116';
  }

  enableAutoRemoveCache(enable: boolean): number {
    const apiType = this.getApiTypeFromEnableAutoRemoveCache(enable);
    const jsonParams = {
      enable: enable,
      toJSON: () => {
        return {
          enable: enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableAutoRemoveCache(enable: boolean): string {
    return 'MediaPlayerCacheManager_enableAutoRemoveCache_5039d15';
  }

  getCacheDir(length: number): string {
    const apiType = this.getApiTypeFromGetCacheDir(length);
    const jsonParams = {
      length: length,
      toJSON: () => {
        return {
          length: length,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const path = jsonResults.path;
    return path;
  }

  protected getApiTypeFromGetCacheDir(length: number): string {
    return 'MediaPlayerCacheManager_getCacheDir_c9551e8';
  }

  getMaxCacheFileCount(): number {
    const apiType = this.getApiTypeFromGetMaxCacheFileCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetMaxCacheFileCount(): string {
    return 'MediaPlayerCacheManager_getMaxCacheFileCount';
  }

  getMaxCacheFileSize(): number {
    const apiType = this.getApiTypeFromGetMaxCacheFileSize();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetMaxCacheFileSize(): string {
    return 'MediaPlayerCacheManager_getMaxCacheFileSize';
  }

  getCacheFileCount(): number {
    const apiType = this.getApiTypeFromGetCacheFileCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetCacheFileCount(): string {
    return 'MediaPlayerCacheManager_getCacheFileCount';
  }
}

export function processIMediaPlayerVideoFrameObserver(
  handler: IMediaPlayerVideoFrameObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onFrame':
      if (handler.onFrame !== undefined) {
        handler.onFrame(jsonParams.frame);
      }
      break;
  }
}
