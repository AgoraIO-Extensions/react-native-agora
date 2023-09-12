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
  KMusicContentCenterStatusErr = 1,
  /**
   * @ignore
   */
  KMusicContentCenterStatusErrGateway = 2,
  /**
   * @ignore
   */
  KMusicContentCenterStatusErrPermissionAndResource = 3,
  /**
   * @ignore
   */
  KMusicContentCenterStatusErrInternalDataParse = 4,
  /**
   * @ignore
   */
  KMusicContentCenterStatusErrMusicLoading = 5,
  /**
   * @ignore
   */
  KMusicContentCenterStatusErrMusicDecryption = 6,
  /**
   * @ignore
   */
  KMusicContentCenterStatusErrHttpInternalError = 7,
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
    result: MusicChartInfo[],
    errorCode: MusicContentCenterStatusCode
  ): string;

  onMusicCollectionResult?(errorCode: MusicContentCenterStatusCode): {
    requestId: string;
    result: MusicCollection;
  };

  /**
   * @ignore
   */
  onLyricResult?(
    songCode: number,
    errorCode: MusicContentCenterStatusCode
  ): { requestId: string; lyricUrl: string };

  /**
   * @ignore
   */
  onSongSimpleInfoResult?(
    songCode: number,
    errorCode: MusicContentCenterStatusCode
  ): { requestId: string; simpleInfo: string };

  /**
   * @ignore
   */
  onPreLoadEvent?(
    songCode: number,
    percent: number,
    status: PreloadStatusCode,
    errorCode: MusicContentCenterStatusCode
  ): { requestId: string; lyricUrl: string };
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
  abstract initialize(): MusicContentCenterConfiguration;

  abstract renewToken(): string;

  abstract release(): void;

  abstract registerEventHandler(
    eventHandler: IMusicContentCenterEventHandler
  ): number;

  abstract unregisterEventHandler(): number;

  abstract createMusicPlayer(): IMusicPlayer;

  abstract getMusicCharts(): string;

  abstract getMusicCollectionByMusicChartId(
    musicChartId: number,
    page: number,
    pageSize: number
  ): { requestId: string; jsonOption: string };

  abstract searchMusic(
    page: number,
    pageSize: number
  ): { requestId: string; keyWord: string; jsonOption: string };

  abstract preload(songCode: number): string;

  abstract removeCache(songCode: number): number;

  abstract getCaches(): { cacheInfo: MusicCacheInfo[]; cacheInfoSize: number };

  abstract isPreloaded(songCode: number): boolean;

  abstract getLyric(songCode: number, lyricType?: number): string;

  abstract getSongSimpleInfo(songCode: number): string;

  abstract getInternalSongCode(songCode: number): {
    jsonOption: string;
    internalSongCode: number;
  };
}
