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
   * Gets the detailed information of the media stream.
   * Call this method after calling getStreamCount .
   *
   * @param index The index of the media stream.
   *
   * @returns
   * If the call succeeds, returns the detailed information of the media stream. See PlayerStreamInfo .If the call fails, returns NULL.
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
    errorCode: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onMusicCollectionResult?(
    requestId: string,
    result: MusicCollection,
    errorCode: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onLyricResult?(
    requestId: string,
    lyricUrl: string,
    errorCode: MusicContentCenterStatusCode
  ): void;

  /**
   * @ignore
   */
  onPreLoadEvent?(
    songCode: number,
    percent: number,
    lyricUrl: string,
    status: PreloadStatusCode,
    errorCode: MusicContentCenterStatusCode
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
    requestId: string,
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): number;

  /**
   * @ignore
   */
  abstract preload(songCode: number, jsonOption?: string): number;

  /**
   * 删除已缓存的音乐资源。
   * 你可以调用该方法删除某一已缓存的音乐资源，如需删除多个音乐资源，你可以多次调用该方法。 The cached media file currently being played will not be deleted.
   *
   * @param songCode 待删除的音乐资源的编号。
   *
   * @returns
   * 0: 方法调用成功，音乐资源已删除。< 0: Failure.
   */
  abstract removeCache(songCode: number): number;

  /**
   * 获取已缓存的音乐资源信息。
   * 当你不再需要使用已缓存的音乐资源时，你需要及时释放内存以防止内存泄漏。
   */
  abstract getCaches(): { cacheInfo: MusicCacheInfo[]; cacheInfoSize: number };

  /**
   * @ignore
   */
  abstract isPreloaded(songCode: number): number;

  /**
   * @ignore
   */
  abstract getLyric(songCode: number, lyricType?: number): string;
}
