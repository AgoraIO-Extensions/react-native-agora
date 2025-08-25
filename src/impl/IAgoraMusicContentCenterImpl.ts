import {
  IMusicContentCenter,
  IMusicContentCenterEventHandler,
  IMusicPlayer,
  Music,
  MusicCacheInfo,
  MusicChartCollection,
  MusicChartInfo,
  MusicCollection,
  MusicContentCenterConfiguration,
  MusicPlayMode,
} from '../IAgoraMusicContentCenter';
import { callIrisApi } from '../internal/call';

import { IMediaPlayerImpl } from './IAgoraMediaPlayerImpl';

// @ts-ignore
export class MusicChartCollectionImpl implements MusicChartCollection {
  getCount(): number {
    const apiType = this.getApiTypeFromGetCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetCount(): string {
    return 'MusicChartCollection_getCount';
  }

  get(index: number): MusicChartInfo {
    const apiType = this.getApiTypeFromGet(index);
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

  protected getApiTypeFromGet(index: number): string {
    return 'MusicChartCollection_get_46f8ab7';
  }
}

// @ts-ignore
export class MusicCollectionImpl implements MusicCollection {
  getCount(): number {
    const apiType = this.getApiTypeFromGetCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetCount(): string {
    return 'MusicCollection_getCount';
  }

  getTotal(): number {
    const apiType = this.getApiTypeFromGetTotal();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetTotal(): string {
    return 'MusicCollection_getTotal';
  }

  getPage(): number {
    const apiType = this.getApiTypeFromGetPage();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetPage(): string {
    return 'MusicCollection_getPage';
  }

  getPageSize(): number {
    const apiType = this.getApiTypeFromGetPageSize();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetPageSize(): string {
    return 'MusicCollection_getPageSize';
  }

  getMusic(index: number): Music {
    const apiType = this.getApiTypeFromGetMusic(index);
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

  protected getApiTypeFromGetMusic(index: number): string {
    return 'MusicCollection_getMusic_8fcdcef';
  }
}

export function processIMusicContentCenterEventHandler(
  handler: IMusicContentCenterEventHandler,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onMusicChartsResult':
      if (handler.onMusicChartsResult !== undefined) {
        handler.onMusicChartsResult(
          jsonParams.requestId,
          jsonParams.result,
          jsonParams.reason
        );
      }
      break;

    case 'onMusicCollectionResult':
      if (handler.onMusicCollectionResult !== undefined) {
        handler.onMusicCollectionResult(
          jsonParams.requestId,
          jsonParams.result,
          jsonParams.reason
        );
      }
      break;

    case 'onLyricResult':
      if (handler.onLyricResult !== undefined) {
        handler.onLyricResult(
          jsonParams.requestId,
          jsonParams.songCode,
          jsonParams.lyricUrl,
          jsonParams.reason
        );
      }
      break;

    case 'onSongSimpleInfoResult':
      if (handler.onSongSimpleInfoResult !== undefined) {
        handler.onSongSimpleInfoResult(
          jsonParams.requestId,
          jsonParams.songCode,
          jsonParams.simpleInfo,
          jsonParams.reason
        );
      }
      break;

    case 'onPreLoadEvent':
      if (handler.onPreLoadEvent !== undefined) {
        handler.onPreLoadEvent(
          jsonParams.requestId,
          jsonParams.songCode,
          jsonParams.percent,
          jsonParams.lyricUrl,
          jsonParams.state,
          jsonParams.reason
        );
      }
      break;
  }
}

// @ts-ignore
export class IMusicPlayerImpl extends IMediaPlayerImpl implements IMusicPlayer {
  setPlayMode(mode: MusicPlayMode): number {
    const apiType = this.getApiTypeFromSetPlayMode(mode);
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

  protected getApiTypeFromSetPlayMode(mode: MusicPlayMode): string {
    return 'MusicPlayer_setPlayMode_748bee0';
  }

  openWithSongCode(songCode: number, startPos: number = 0): number {
    const apiType = this.getApiTypeFromOpenWithSongCode(songCode, startPos);
    const jsonParams = {
      songCode: songCode,
      startPos: startPos,
      toJSON: () => {
        return {
          songCode: songCode,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromOpenWithSongCode(
    songCode: number,
    startPos: number = 0
  ): string {
    return 'MusicPlayer_open_303b92e';
  }
}

// @ts-ignore
export class IMusicContentCenterImpl implements IMusicContentCenter {
  initialize(configuration: MusicContentCenterConfiguration): number {
    const apiType = this.getApiTypeFromInitialize(configuration);
    const jsonParams = {
      configuration: configuration,
      toJSON: () => {
        return {
          configuration: configuration,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromInitialize(
    configuration: MusicContentCenterConfiguration
  ): string {
    return 'MusicContentCenter_initialize_df70304';
  }

  renewToken(token: string): number {
    const apiType = this.getApiTypeFromRenewToken(token);
    const jsonParams = {
      token: token,
      toJSON: () => {
        return {
          token: token,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRenewToken(token: string): string {
    return 'MusicContentCenter_renewToken_3a2037f';
  }

  release(): void {
    const apiType = this.getApiTypeFromRelease();
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(): string {
    return 'MusicContentCenter_release';
  }

  registerEventHandler(eventHandler: IMusicContentCenterEventHandler): number {
    const apiType = this.getApiTypeFromRegisterEventHandler(eventHandler);
    const jsonParams = {
      eventHandler: eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterEventHandler(
    eventHandler: IMusicContentCenterEventHandler
  ): string {
    return 'MusicContentCenter_registerEventHandler_ae49451';
  }

  unregisterEventHandler(): number {
    const apiType = this.getApiTypeFromUnregisterEventHandler();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterEventHandler(): string {
    return 'MusicContentCenter_unregisterEventHandler';
  }

  createMusicPlayer(): IMusicPlayer {
    const apiType = this.getApiTypeFromCreateMusicPlayer();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromCreateMusicPlayer(): string {
    return 'MusicContentCenter_createMusicPlayer';
  }

  destroyMusicPlayer(musicPlayer: IMusicPlayer): number {
    const apiType = this.getApiTypeFromDestroyMusicPlayer(musicPlayer);
    const jsonParams = {
      music_player: musicPlayer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDestroyMusicPlayer(
    musicPlayer: IMusicPlayer
  ): string {
    return 'MusicContentCenter_destroyMusicPlayer_876d086';
  }

  getMusicCharts(): string {
    const apiType = this.getApiTypeFromGetMusicCharts();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromGetMusicCharts(): string {
    return 'MusicContentCenter_getMusicCharts_66d4ecd';
  }

  getMusicCollectionByMusicChartId(
    musicChartId: number,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string {
    const apiType = this.getApiTypeFromGetMusicCollectionByMusicChartId(
      musicChartId,
      page,
      pageSize,
      jsonOption
    );
    const jsonParams = {
      musicChartId: musicChartId,
      page: page,
      pageSize: pageSize,
      jsonOption: jsonOption,
      toJSON: () => {
        return {
          musicChartId: musicChartId,
          page: page,
          pageSize: pageSize,
          jsonOption: jsonOption,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromGetMusicCollectionByMusicChartId(
    musicChartId: number,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string {
    return 'MusicContentCenter_getMusicCollectionByMusicChartId_8cd0b4d';
  }

  searchMusic(
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string {
    const apiType = this.getApiTypeFromSearchMusic(
      keyWord,
      page,
      pageSize,
      jsonOption
    );
    const jsonParams = {
      keyWord: keyWord,
      page: page,
      pageSize: pageSize,
      jsonOption: jsonOption,
      toJSON: () => {
        return {
          keyWord: keyWord,
          page: page,
          pageSize: pageSize,
          jsonOption: jsonOption,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromSearchMusic(
    keyWord: string,
    page: number,
    pageSize: number,
    jsonOption?: string
  ): string {
    return 'MusicContentCenter_searchMusic_3f8cf09';
  }

  preload(songCode: number): string {
    const apiType = this.getApiTypeFromPreload(songCode);
    const jsonParams = {
      songCode: songCode,
      toJSON: () => {
        return {
          songCode: songCode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromPreload(songCode: number): string {
    return 'MusicContentCenter_preload_d3baeab';
  }

  removeCache(songCode: number): number {
    const apiType = this.getApiTypeFromRemoveCache(songCode);
    const jsonParams = {
      songCode: songCode,
      toJSON: () => {
        return {
          songCode: songCode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRemoveCache(songCode: number): string {
    return 'MusicContentCenter_removeCache_f631116';
  }

  getCaches(): { cacheInfo: MusicCacheInfo[]; cacheInfoSize: number } {
    const apiType = this.getApiTypeFromGetCaches();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const cacheInfo = jsonResults.cacheInfo;
    const cacheInfoSize = jsonResults.cacheInfoSize;
    return {
      cacheInfo,
      cacheInfoSize,
    };
  }

  protected getApiTypeFromGetCaches(): string {
    return 'MusicContentCenter_getCaches_c4f9978';
  }

  isPreloaded(songCode: number): boolean {
    const apiType = this.getApiTypeFromIsPreloaded(songCode);
    const jsonParams = {
      songCode: songCode,
      toJSON: () => {
        return {
          songCode: songCode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsPreloaded(songCode: number): string {
    return 'MusicContentCenter_isPreloaded_f631116';
  }

  getLyric(songCode: number, lyricType: number = 0): string {
    const apiType = this.getApiTypeFromGetLyric(songCode, lyricType);
    const jsonParams = {
      songCode: songCode,
      lyricType: lyricType,
      toJSON: () => {
        return {
          songCode: songCode,
          lyricType: lyricType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromGetLyric(
    songCode: number,
    lyricType: number = 0
  ): string {
    return 'MusicContentCenter_getLyric_5ab5efd';
  }

  getSongSimpleInfo(songCode: number): string {
    const apiType = this.getApiTypeFromGetSongSimpleInfo(songCode);
    const jsonParams = {
      songCode: songCode,
      toJSON: () => {
        return {
          songCode: songCode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromGetSongSimpleInfo(songCode: number): string {
    return 'MusicContentCenter_getSongSimpleInfo_d3baeab';
  }

  getInternalSongCode(songCode: number, jsonOption: string): number {
    const apiType = this.getApiTypeFromGetInternalSongCode(
      songCode,
      jsonOption
    );
    const jsonParams = {
      songCode: songCode,
      jsonOption: jsonOption,
      toJSON: () => {
        return {
          songCode: songCode,
          jsonOption: jsonOption,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const internalSongCode = jsonResults.internalSongCode;
    return internalSongCode;
  }

  protected getApiTypeFromGetInternalSongCode(
    songCode: number,
    jsonOption: string
  ): string {
    return 'MusicContentCenter_getInternalSongCode_3a3d1e7';
  }
}
