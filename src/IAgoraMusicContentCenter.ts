import './extension/IAgoraMusicContentCenterExtension';
import { IMediaPlayer } from './IAgoraMediaPlayer';
/* enum_preloadstatuscode */
export enum PreloadStatusCode {
  /* enum__KPreloadStatusCompleted */
  KPreloadStatusCompleted = 0,
  /* enum__KPreloadStatusFailed */
  KPreloadStatusFailed = 1,
  /* enum__KPreloadStatusPreloading */
  KPreloadStatusPreloading = 2,
}

/* enum_musiccontentcenterstatuscode */
export enum MusicContentCenterStatusCode {
  /* enum__KMusicContentCenterStatusOk */
  KMusicContentCenterStatusOk = 0,
  /* enum__KMusicContentCenterStatusErr */
  KMusicContentCenterStatusErr = 1,
}

/* class_musicchartinfo */
export class MusicChartInfo {
  /* class_musicchartinfo_chartName */
  chartName?: string;
  /* class_musicchartinfo_id */
  id?: number;
}

/* class_musicchartcollection */
export abstract class MusicChartCollection {
  /* api_musicchartcollection_getcount */
  abstract getCount(): number;

  /* api_musicchartcollection_get */
  abstract get(index: number): MusicChartInfo;
}

/* class_mvproperty */
export class MvProperty {
  /* class_mvproperty_resolution */
  resolution?: string;
  /* class_mvproperty_bandwidth */
  bandwidth?: string;
}

/* class_climaxsegment */
export class ClimaxSegment {
  /* class_climaxsegment_startTimeMs */
  startTimeMs?: number;
  /* class_climaxsegment_endTimeMs */
  endTimeMs?: number;
}

/* class_music */
export class Music {
  /* class_music_songCode */
  songCode?: number;
  /* class_music_name */
  name?: string;
  /* class_music_singer */
  singer?: string;
  /* class_music_poster */
  poster?: string;
  /* class_music_releaseTime */
  releaseTime?: string;
  /* class_music_durationS */
  durationS?: number;
  /* class_music_type */
  type?: number;
  /* class_music_pitchType */
  pitchType?: number;
  /* class_music_lyricCount */
  lyricCount?: number;
  /* class_music_lyricList */
  lyricList?: number[];
  /* class_music_climaxSegmentCount */
  climaxSegmentCount?: number;
  /* class_music_climaxSegmentList */
  climaxSegmentList?: ClimaxSegment[];
  /* class_music_mvPropertyCount */
  mvPropertyCount?: number;
  /* class_music_mvPropertyList */
  mvPropertyList?: MvProperty[];
}

/* class_musiccollection */
export abstract class MusicCollection {
  /* api_musiccollection_getcount */
  abstract getCount(): number;

  /* api_musiccollection_gettotal */
  abstract getTotal(): number;

  /* api_musiccollection_getpage */
  abstract getPage(): number;

  /* api_musiccollection_getpagesize */
  abstract getPageSize(): number;

  /* api_musiccollection_getmusic */
  abstract getMusic(index: number): Music;
}

/* class_imusiccontentcentereventhandler */
export interface IMusicContentCenterEventHandler {
  /* callback_imusiccontentcentereventhandler_onmusicchartsresult */
  onMusicChartsResult?(
    requestId: string,
    status: MusicContentCenterStatusCode,
    result: MusicChartInfo[]
  ): void;

  /* callback_imusiccontentcentereventhandler_onmusiccollectionresult */
  onMusicCollectionResult?(
    requestId: string,
    status: MusicContentCenterStatusCode,
    result: MusicCollection
  ): void;

  /* callback_imusiccontentcentereventhandler_onlyricresult */
  onLyricResult?(requestId: string, lyricUrl: string): void;

  /* callback_imusiccontentcentereventhandler_onpreloadevent */
  onPreLoadEvent?(
    songCode: number,
    percent: number,
    status: PreloadStatusCode,
    msg: string,
    lyricUrl?: string
  ): void;
}

/* class_musiccontentcenterconfiguration */
export class MusicContentCenterConfiguration {
  /* class_musiccontentcenterconfiguration_appId */
  appId?: string;
  /* class_musiccontentcenterconfiguration_token */
  token?: string;
  /* class_musiccontentcenterconfiguration_mccUid */
  mccUid?: number;
}

/* class_imusicplayer */
export abstract class IMusicPlayer extends IMediaPlayer {
  /* api_imusicplayer_openwithsongcode */
  abstract openWithSongCode(songCode: number, startPos?: number): number;
}

/* class_imusiccontentcenter */
export abstract class IMusicContentCenter {
  /* api_imusiccontentcenter_initialize */
  abstract initialize(configuration: MusicContentCenterConfiguration): number;

  /* api_imusiccontentcenter_renewtoken */
  abstract renewToken(token: string): number;

  /* api_imusiccontentcenter_release */
  abstract release(): void;

  /* api_imusiccontentcenter_registereventhandler */
  abstract registerEventHandler(
    eventHandler: IMusicContentCenterEventHandler
  ): number;

  /* api_imusiccontentcenter_unregistereventhandler */
  abstract unregisterEventHandler(): number;

  /* api_imusiccontentcenter_createmusicplayer */
  abstract createMusicPlayer(): IMusicPlayer;

  /* api_imusiccontentcenter_getmusiccharts */
  abstract getMusicCharts(): string;

  /* api_imusiccontentcenter_getmusiccollectionbymusicchartid */
  abstract getMusicCollectionByMusicChartId(
    musicChartId: number,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string;

  /* api_imusiccontentcenter_searchmusic */
  abstract searchMusic(
    requestId: string,
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): number;

  /* api_imusiccontentcenter_preload */
  abstract preload(songCode: number, jsonOption?: string): number;

  /* api_imusiccontentcenter_ispreloaded */
  abstract isPreloaded(songCode: number): number;

  /* api_imusiccontentcenter_getlyric */
  abstract getLyric(songCode: number, lyricType?: number): string;
}
