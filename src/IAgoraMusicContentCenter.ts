import './extension/IAgoraMusicContentCenterExtension';
import { IMediaPlayer } from './IAgoraMediaPlayer';

/**
 * @ignore
 */
export enum PreloadStatusCode {
  /**
   * @ignore
   */
  KPreloadStatusCompleted = 0,
  /**
   * @ignore
   */
  KPreloadStatusFailed = 1,
  /**
   * @ignore
   */
  KPreloadStatusPreloading = 2,
  /**
   * @ignore
   */
  KPreloadStatusRemoved = 3,
}

/**
 * @ignore
 */
export enum MusicContentCenterStatusCode {
  /**
   * @ignore
   */
  KMusicContentCenterStatusOk = 0,
  /**
   * @ignore
   */
  KMusicContentCenterStatusError = 1,
  /**
   * @ignore
   */
  KMusicContentCenterStatusGateway = 2,
  /**
   * @ignore
   */
  KMusicContentCenterStatusPermissionAndResource = 3,
  /**
   * @ignore
   */
  KMusicContentCenterStatusInternalDataParse = 4,
  /**
   * @ignore
   */
  KMusicContentCenterStatusMusicLoading = 5,
  /**
   * @ignore
   */
  KMusicContentCenterStatusMusicDecryption = 6,
  /**
   * @ignore
   */
  KMusicContentCenterStatusHttpInternalError = 7,
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
    status: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onMusicCollectionResult?(
    requestId: string,
    result: MusicCollection,
    status: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onLyricResult?(
    requestId: string,
    songCode: number,
    lyricUrl: string,
    status: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onSongSimpleInfoResult?(
    requestId: string,
    songCode: number,
    simpleInfo: string,
    status: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onPreLoadEvent?(
    requestId: string,
    songCode: number,
    percent: number,
    lyricUrl: string,
    preloadStatus: PreloadStatusCode,
    mccStatus: MusicContentCenterStatusCode
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
