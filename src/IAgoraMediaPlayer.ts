import './extension/IAgoraMediaPlayerExtension';
/* class_imediaplayer */
export abstract class IMediaPlayer {
/* api_imediaplayer_getmediaplayerid */
abstract getMediaPlayerId(): number;

/* api_imediaplayer_open */
abstract open(url: string, startPos: number): number;

/* api_imediaplayer_openwithmediasource */
abstract openWithMediaSource(source: MediaSource): number;

/* api_imediaplayer_play */
abstract play(): number;

/* api_imediaplayer_pause */
abstract pause(): number;

/* api_imediaplayer_stop */
abstract stop(): number;

/* api_imediaplayer_resume */
abstract resume(): number;

/* api_imediaplayer_seek */
abstract seek(newPos: number): number;

/* api_imediaplayer_setaudiopitch */
abstract setAudioPitch(pitch: number): number;

/* api_imediaplayer_getduration */
abstract getDuration(): number;

/* api_imediaplayer_getplayposition */
abstract getPlayPosition(): number;

/* api_imediaplayer_getstreamcount */
abstract getStreamCount(): number;

/* api_imediaplayer_getstreaminfo */
abstract getStreamInfo(index: number): PlayerStreamInfo;

/* api_imediaplayer_setloopcount */
abstract setLoopCount(loopCount: number): number;

/* api_imediaplayer_setplaybackspeed */
abstract setPlaybackSpeed(speed: number): number;

/* api_imediaplayer_selectaudiotrack */
abstract selectAudioTrack(index: number): number;

/* api_imediaplayer_setplayeroptioninint */
abstract setPlayerOptionInInt(key: string, value: number): number;

/* api_imediaplayer_setplayeroptioninstring */
abstract setPlayerOptionInString(key: string, value: string): number;

/* api_imediaplayer_takescreenshot */
abstract takeScreenshot(filename: string): number;

/* api_imediaplayer_selectinternalsubtitle */
abstract selectInternalSubtitle(index: number): number;

/* api_imediaplayer_setexternalsubtitle */
abstract setExternalSubtitle(url: string): number;

/* api_imediaplayer_getstate */
abstract getState(): MediaPlayerState;

/* api_imediaplayer_mute */
abstract mute(muted: boolean): number;

/* api_imediaplayer_getmute */
abstract getMute(): boolean;

/* api_imediaplayer_adjustplayoutvolume */
abstract adjustPlayoutVolume(volume: number): number;

/* api_imediaplayer_getplayoutvolume */
abstract getPlayoutVolume(): number;

/* api_imediaplayer_adjustpublishsignalvolume */
abstract adjustPublishSignalVolume(volume: number): number;

/* api_imediaplayer_getpublishsignalvolume */
abstract getPublishSignalVolume(): number;

/* api_imediaplayer_setview */
abstract setView(view: any): number;

/* api_imediaplayer_setrendermode */
abstract setRenderMode(renderMode: RenderModeType): number;

/* api_imediaplayer_registerplayersourceobserver */
abstract registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number;

/* api_imediaplayer_unregisterplayersourceobserver */
abstract unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number;

/* api_imediaplayer_registermediaplayeraudiospectrumobserver */
abstract registerMediaPlayerAudioSpectrumObserver(observer: IAudioSpectrumObserver, intervalInMS: number): number;

/* api_imediaplayer_unregistermediaplayeraudiospectrumobserver */
abstract unregisterMediaPlayerAudioSpectrumObserver(observer: IAudioSpectrumObserver): number;

/* api_imediaplayer_setaudiodualmonomode */
abstract setAudioDualMonoMode(mode: AudioDualMonoMode): number;

/* api_imediaplayer_getplayersdkversion */
abstract getPlayerSdkVersion(): string;

/* api_imediaplayer_getplaysrc */
abstract getPlaySrc(): string;

/* api_imediaplayer_openwithagoracdnsrc */
abstract openWithAgoraCDNSrc(src: string, startPos: number): number;

/* api_imediaplayer_getagoracdnlinecount */
abstract getAgoraCDNLineCount(): number;

/* api_imediaplayer_switchagoracdnlinebyindex */
abstract switchAgoraCDNLineByIndex(index: number): number;

/* api_imediaplayer_getcurrentagoracdnindex */
abstract getCurrentAgoraCDNIndex(): number;

/* api_imediaplayer_enableautoswitchagoracdn */
abstract enableAutoSwitchAgoraCDN(enable: boolean): number;

/* api_imediaplayer_renewagoracdnsrctoken */
abstract renewAgoraCDNSrcToken(token: string, ts: number): number;

/* api_imediaplayer_switchagoracdnsrc */
abstract switchAgoraCDNSrc(src: string, syncPts?: boolean): number;

/* api_imediaplayer_switchsrc */
abstract switchSrc(src: string, syncPts?: boolean): number;

/* api_imediaplayer_preloadsrc */
abstract preloadSrc(src: string, startPos: number): number;

/* api_imediaplayer_playpreloadedsrc */
abstract playPreloadedSrc(src: string): number;

/* api_imediaplayer_unloadsrc */
abstract unloadSrc(src: string): number;

/* api_imediaplayer_setspatialaudioparams */
abstract setSpatialAudioParams(params: SpatialAudioParams): number;

/* api_imediaplayer_setsoundpositionparams */
abstract setSoundPositionParams(pan: number, gain: number): number;

/* api_imediaplayer_registeraudioframeobserver */
abstract registerAudioFrameObserver(observer: IMediaPlayerAudioFrameObserver): number;

/* api_imediaplayer_unregisteraudioframeobserver */
abstract unregisterAudioFrameObserver(observer: IMediaPlayerAudioFrameObserver): number;

/* api_imediaplayer_registervideoframeobserver */
abstract registerVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number;

/* api_imediaplayer_unregistervideoframeobserver */
abstract unregisterVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number;
}

/* class_imediaplayercachemanager */
export abstract class IMediaPlayerCacheManager {
/* api_imediaplayercachemanager_removeallcaches */
abstract removeAllCaches(): number;

/* api_imediaplayercachemanager_removeoldcache */
abstract removeOldCache(): number;

/* api_imediaplayercachemanager_removecachebyuri */
abstract removeCacheByUri(uri: string): number;

/* api_imediaplayercachemanager_setcachedir */
abstract setCacheDir(path: string): number;

/* api_imediaplayercachemanager_setmaxcachefilecount */
abstract setMaxCacheFileCount(count: number): number;

/* api_imediaplayercachemanager_setmaxcachefilesize */
abstract setMaxCacheFileSize(cacheSize: number): number;

/* api_imediaplayercachemanager_enableautoremovecache */
abstract enableAutoRemoveCache(enable: boolean): number;

/* api_imediaplayercachemanager_getcachedir */
abstract getCacheDir(length: number): string;

/* api_imediaplayercachemanager_getmaxcachefilecount */
abstract getMaxCacheFileCount(): number;

/* api_imediaplayercachemanager_getmaxcachefilesize */
abstract getMaxCacheFileSize(): number;

/* api_imediaplayercachemanager_getcachefilecount */
abstract getCacheFileCount(): number;
}

/* class_imediaplayeraudioframeobserver */
export interface IMediaPlayerAudioFrameObserver {
  /* callback_imediaplayeraudioframeobserver_onframe */
  onFrame?(frame: AudioPcmFrame): void;
}

/* class_imediaplayervideoframeobserver */
export interface IMediaPlayerVideoFrameObserver {
  /* callback_imediaplayervideoframeobserver_onframe */
  onFrame?(frame: VideoFrame): void;
}
