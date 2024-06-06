import './extension/IAgoraMusicContentCenterExtension';
import { IMediaPlayer } from './IAgoraMediaPlayer';

/**
 * @ignore
 */
export enum MusicPlayMode {
  /**
   * @ignore
   */
  KMusicPlayModeOriginal = 0,
  /**
   * @ignore
   */
  KMusicPlayModeAccompany = 1,
  /**
   * @ignore
   */
  KMusicPlayModeLeadSing = 2,
}

/**
 * @ignore
 */
export enum PreloadState {
  /**
   * @ignore
   */
  KPreloadStateCompleted = 0,
  /**
   * @ignore
   */
  KPreloadStateFailed = 1,
  /**
   * @ignore
   */
  KPreloadStatePreloading = 2,
  /**
   * @ignore
   */
  KPreloadStateRemoved = 3,
}

/**
 * @ignore
 */
export enum MusicContentCenterStateReason {
  /**
   * @ignore
   */
  KMusicContentCenterReasonOk = 0,
  /**
   * @ignore
   */
  KMusicContentCenterReasonError = 1,
  /**
   * @ignore
   */
  KMusicContentCenterReasonGateway = 2,
  /**
   * @ignore
   */
  KMusicContentCenterReasonPermissionAndResource = 3,
  /**
   * @ignore
   */
  KMusicContentCenterReasonInternalDataParse = 4,
  /**
   * @ignore
   */
  KMusicContentCenterReasonMusicLoading = 5,
  /**
   * @ignore
   */
  KMusicContentCenterReasonMusicDecryption = 6,
  /**
   * @ignore
   */
  KMusicContentCenterReasonHttpInternalError = 7,
}

/**
 * @ignore
 */
export class MusicChartInfo {
  /**
   * @ignore
   */
  chartName?: string;
  /**
   * @ignore
   */
  id?: number;
}

/**
 * @ignore
 */
export enum MusicCacheStatusType {
  /**
   * @ignore
   */
  MusicCacheStatusTypeCached = 0,
  /**
   * @ignore
   */
  MusicCacheStatusTypeCaching = 1,
}

/**
 * @ignore
 */
export class MusicCacheInfo {
  /**
   * @ignore
   */
  songCode?: number;
  /**
   * @ignore
   */
  status?: MusicCacheStatusType;
}

/**
 * @ignore
 */
export abstract class MusicChartCollection {
  /**
   * @ignore
   */
  abstract getCount(): number;

  /**
   * @ignore
   */
  abstract get(index: number): MusicChartInfo;
}

/**
 * @ignore
 */
export class MvProperty {
  /**
   * @ignore
   */
  resolution?: string;
  /**
   * @ignore
   */
  bandwidth?: string;
}

/**
 * The climax parts of the music.
 */
export class ClimaxSegment {
  /**
   * The time (ms) when the climax part begins.
   */
  startTimeMs?: number;
  /**
   * The time (ms) when the climax part ends.
   */
  endTimeMs?: number;
}

/**
 * @ignore
 */
export class Music {
  /**
   * @ignore
   */
  songCode?: number;
  /**
   * @ignore
   */
  name?: string;
  /**
   * @ignore
   */
  singer?: string;
  /**
   * @ignore
   */
  poster?: string;
  /**
   * @ignore
   */
  releaseTime?: string;
  /**
   * @ignore
   */
  durationS?: number;
  /**
   * @ignore
   */
  type?: number;
  /**
   * @ignore
   */
  pitchType?: number;
  /**
   * @ignore
   */
  lyricCount?: number;
  /**
   * @ignore
   */
  lyricList?: number[];
  /**
   * @ignore
   */
  climaxSegmentCount?: number;
  /**
   * @ignore
   */
  climaxSegmentList?: ClimaxSegment[];
  /**
   * @ignore
   */
  mvPropertyCount?: number;
  /**
   * @ignore
   */
  mvPropertyList?: MvProperty[];
}

/**
 * @ignore
 */
export abstract class MusicCollection {
  /**
   * @ignore
   */
  abstract getCount(): number;

  /**
   * @ignore
   */
  abstract getTotal(): number;

  /**
   * @ignore
   */
  abstract getPage(): number;

  /**
   * @ignore
   */
  abstract getPageSize(): number;

  /**
   * @ignore
   */
  abstract getMusic(index: number): Music;
}

/**
 * @ignore
 */
export interface IMusicContentCenterEventHandler {
  /**
   * @ignore
   */
  onMusicChartsResult?(
    requestId: string,
    result: MusicChartInfo[],
    reason: MusicContentCenterStateReason
  ): void;

  /**
   * @ignore
   */
  onMusicCollectionResult?(
    requestId: string,
    result: MusicCollection,
    reason: MusicContentCenterStateReason
  ): void;

  /**
   * @ignore
   */
  onLyricResult?(
    requestId: string,
    songCode: number,
    lyricUrl: string,
    reason: MusicContentCenterStateReason
  ): void;

  /**
   * @ignore
   */
  onSongSimpleInfoResult?(
    requestId: string,
    songCode: number,
    simpleInfo: string,
    reason: MusicContentCenterStateReason
  ): void;

  /**
   * @ignore
   */
  onPreLoadEvent?(
    requestId: string,
    songCode: number,
    percent: number,
    lyricUrl: string,
    state: PreloadState,
    reason: MusicContentCenterStateReason
  ): void;
}

/**
 * @ignore
 */
export class MusicContentCenterConfiguration {
  /**
   * @ignore
   */
  appId?: string;
  /**
   * @ignore
   */
  token?: string;
  /**
   * @ignore
   */
  mccUid?: number;
  /**
   * @ignore
   */
  maxCacheSize?: number;
  /**
   * @ignore
   */
  mccDomain?: string;
}

/**
 * @ignore
 */
export abstract class IMusicPlayer extends IMediaPlayer {
  /**
   * @ignore
   */
  abstract setPlayMode(mode: MusicPlayMode): number;

  /**
   * @ignore
   */
  abstract openWithSongCode(songCode: number, startPos?: number): number;
}

/**
 * @ignore
 */
export abstract class IMusicContentCenter {
  /**
   * @ignore
   */
  abstract initialize(configuration: MusicContentCenterConfiguration): number;

  /**
   * @ignore
   */
  abstract renewToken(token: string): number;

  /**
   * @ignore
   */
  abstract release(): void;

  /**
   * @ignore
   */
  abstract registerEventHandler(
    eventHandler: IMusicContentCenterEventHandler
  ): number;

  /**
   * @ignore
   */
  abstract unregisterEventHandler(): number;

  /**
   * @ignore
   */
  abstract createMusicPlayer(): IMusicPlayer;

  /**
   * @ignore
   */
  abstract destroyMusicPlayer(musicPlayer: IMusicPlayer): number;

  /**
   * @ignore
   */
  abstract getMusicCharts(): string;

  /**
   * @ignore
   */
  abstract getMusicCollectionByMusicChartId(
    musicChartId: number,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string;

  /**
   * @ignore
   */
  abstract searchMusic(
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string;

  /**
   * @ignore
   */
  abstract preload(songCode: number): string;

  /**
   * @ignore
   */
  abstract removeCache(songCode: number): number;

  /**
   * @ignore
   */
  abstract getCaches(): { cacheInfo: MusicCacheInfo[]; cacheInfoSize: number };

  /**
   * @ignore
   */
  abstract isPreloaded(songCode: number): boolean;

  /**
   * @ignore
   */
  abstract getLyric(songCode: number, lyricType?: number): string;

  /**
   * @ignore
   */
  abstract getSongSimpleInfo(songCode: number): string;

  /**
   * @ignore
   */
  abstract getInternalSongCode(songCode: number, jsonOption: string): number;
}
