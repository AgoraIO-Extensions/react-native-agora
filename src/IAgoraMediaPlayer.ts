import { PlayerStreamInfo, MediaPlayerState } from './AgoraMediaPlayerTypes';
import { RenderModeType, AudioDualMonoMode } from './AgoraMediaBase';
import { IMediaPlayerSourceObserver } from './IAgoraMediaPlayerSource';
import { SpatialAudioParams } from './AgoraBase';

export abstract class IMediaPlayer {
  abstract getMediaPlayerId(): number;

  abstract open(url: string, startPos: number): number;

  abstract play(): number;

  abstract pause(): number;

  abstract stop(): number;

  abstract resume(): number;

  abstract seek(newPos: number): number;

  abstract setAudioPitch(pitch: number): number;

  abstract getDuration(): number;

  abstract getPlayPosition(): number;

  abstract getStreamCount(): number;

  abstract getStreamInfo(index: number): PlayerStreamInfo;

  abstract setLoopCount(loopCount: number): number;

  abstract muteAudio(audioMute: boolean): number;

  abstract isAudioMuted(): boolean;

  abstract muteVideo(videoMute: boolean): number;

  abstract isVideoMuted(): boolean;

  abstract setPlaybackSpeed(speed: number): number;

  abstract selectAudioTrack(index: number): number;

  abstract setPlayerOption(key: string, value: number): number;

  abstract setPlayerOption2(key: string, value: string): number;

  abstract takeScreenshot(filename: string): number;

  abstract selectInternalSubtitle(index: number): number;

  abstract setExternalSubtitle(url: string): number;

  abstract getState(): MediaPlayerState;

  abstract mute(mute: boolean): number;

  abstract getMute(): boolean;

  abstract adjustPlayoutVolume(volume: number): number;

  abstract getPlayoutVolume(): number;

  abstract adjustPublishSignalVolume(volume: number): number;

  abstract getPublishSignalVolume(): number;

  abstract setView(view: any): number;

  abstract setRenderMode(renderMode: RenderModeType): number;

  abstract registerPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  abstract unregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  abstract setAudioDualMonoMode(mode: AudioDualMonoMode): number;

  abstract getPlayerSdkVersion(): string;

  abstract getPlaySrc(): string;

  abstract openWithAgoraCDNSrc(src: string, startPos: number): number;

  abstract getAgoraCDNLineCount(): number;

  abstract switchAgoraCDNLineByIndex(index: number): number;

  abstract getCurrentAgoraCDNIndex(): number;

  abstract enableAutoSwitchAgoraCDN(enable: boolean): number;

  abstract renewAgoraCDNSrcToken(token: string, ts: number): number;

  abstract switchAgoraCDNSrc(src: string, syncPts?: boolean): number;

  abstract switchSrc(src: string, syncPts?: boolean): number;

  abstract preloadSrc(src: string, startPos: number): number;

  abstract playPreloadedSrc(src: string): number;

  abstract unloadSrc(src: string): number;

  abstract setSpatialAudioParams(params: SpatialAudioParams): number;
}
