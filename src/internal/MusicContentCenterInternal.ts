import { createCheckers } from 'ts-interface-checker';

import {
  IMusicContentCenterEventHandler,
  IMusicPlayer,
  Music,
  MusicCollection,
  MusicPlayMode,
} from '../IAgoraMusicContentCenter';
import { IMusicContentCenterEvent } from '../extension/IAgoraMusicContentCenterExtension';
import {
  IMusicContentCenterImpl,
  IMusicPlayerImpl,
  MusicCollectionImpl,
} from '../impl/IAgoraMusicContentCenterImpl';
import IAgoraMusicContentCenterTI from '../ti/IAgoraMusicContentCenter-ti';
const checkers = createCheckers(IAgoraMusicContentCenterTI);

import {
  DeviceEventEmitter,
  EVENT_TYPE,
  EventProcessor,
} from './IrisApiEngine';
import { MediaPlayerInternal } from './MediaPlayerInternal';

export class MusicContentCenterInternal extends IMusicContentCenterImpl {
  static _event_handlers: IMusicContentCenterEventHandler[] = [];

  _addListenerPreCheck<EventType extends keyof IMusicContentCenterEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.IMusicContentCenterEventHandler?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (MusicContentCenterInternal._event_handlers.length === 0) {
        this.registerEventHandler({});
      }
    }
    return true;
  }

  addListener<EventType extends keyof IMusicContentCenterEvent>(
    eventType: EventType,
    listener: IMusicContentCenterEvent[EventType]
  ): void {
    this._addListenerPreCheck(eventType);
    const callback = (eventProcessor: EventProcessor<any>, data: any) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IMusicContentCenter) {
        return;
      }
      eventProcessor.func.map((it) => {
        it({ [eventType]: listener }, eventType, data);
      });
    };
    // @ts-ignore
    listener!.agoraCallback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IMusicContentCenterEvent>(
    eventType: EventType,
    listener?: IMusicContentCenterEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      // @ts-ignore
      listener?.agoraCallback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IMusicContentCenterEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  override registerEventHandler(
    eventHandler: IMusicContentCenterEventHandler
  ): number {
    if (
      !MusicContentCenterInternal._event_handlers.find(
        (value) => value === eventHandler
      )
    ) {
      MusicContentCenterInternal._event_handlers.push(eventHandler);
    }
    return super.registerEventHandler(eventHandler);
  }

  override unregisterEventHandler(): number {
    MusicContentCenterInternal._event_handlers = [];
    return super.unregisterEventHandler();
  }

  override release() {
    MusicContentCenterInternal._event_handlers = [];
    this.removeAllListeners();
    super.release();
  }

  override createMusicPlayer(): IMusicPlayer {
    // @ts-ignore
    const mediaPlayerId = super.createMusicPlayer() as number;
    return new MusicPlayerInternal(mediaPlayerId);
  }
}

class _MusicPlayerInternal extends IMusicPlayerImpl {
  private readonly _mediaPlayerId: number;

  constructor(mediaPlayerId: number) {
    super();
    this._mediaPlayerId = mediaPlayerId;
  }

  override getMediaPlayerId(): number {
    return this._mediaPlayerId;
  }
}

export class MusicPlayerInternal
  extends MediaPlayerInternal
  implements IMusicPlayer
{
  private readonly _musicPlayer: IMusicPlayer;

  constructor(mediaPlayerId: number) {
    super(mediaPlayerId);
    // @ts-ignore
    this._musicPlayer = new _MusicPlayerInternal(mediaPlayerId);
  }

  setPlayMode(mode: MusicPlayMode): number {
    return this._musicPlayer.setPlayMode(mode);
  }

  openWithSongCode(songCode: number, startPos?: number): number {
    return this._musicPlayer.openWithSongCode(songCode, startPos);
  }
}

class _MusicCollection extends MusicCollection {
  count: number;
  music: Music[];
  page: number;
  pageSize: number;
  total: number;

  constructor(collection: any | _MusicCollection) {
    super();
    this.count = collection.count;
    this.music = collection.music;
    this.page = collection.page;
    this.pageSize = collection.pageSize;
    this.total = collection.total;
  }

  getCount(): number {
    return this.count;
  }

  getMusic(index: number): Music {
    return this.music[index] ?? {};
  }

  getPage(): number {
    return this.page;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getTotal(): number {
    return this.total;
  }
}

export class MusicCollectionInternal extends MusicCollectionImpl {
  private readonly _musicCollection: MusicCollection;

  constructor(musicCollection: MusicCollection) {
    super();
    this._musicCollection = new _MusicCollection(musicCollection);
  }

  override getCount(): number {
    return this._musicCollection.getCount();
  }

  override getMusic(index: number): Music {
    return this._musicCollection.getMusic(index);
  }

  override getPage(): number {
    return this._musicCollection.getPage();
  }

  override getPageSize(): number {
    return this._musicCollection.getPageSize();
  }

  override getTotal(): number {
    return this._musicCollection.getTotal();
  }
}
