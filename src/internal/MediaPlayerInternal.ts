import {
  ErrorCodeType,
  IMediaPlayerSourceObserver,
} from 'react-native-agora-rtc-ng';

import { IMediaPlayerImpl } from '../impl/IAgoraMediaPlayerImpl';

export class MediaPlayerInternal extends IMediaPlayerImpl {
  static _observers: Map<number, IMediaPlayerSourceObserver[]> = new Map<
    number,
    IMediaPlayerSourceObserver[]
  >();
  private readonly _mediaPlayerId: number;

  constructor(mediaPlayerId: number) {
    super();
    this._mediaPlayerId = mediaPlayerId;
  }

  getMediaPlayerId(): number {
    return this._mediaPlayerId;
  }

  registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    let observers = MediaPlayerInternal._observers.get(this._mediaPlayerId);
    if (observers === undefined) {
      observers = [];
      MediaPlayerInternal._observers.set(this._mediaPlayerId, observers);
    }
    if (!observers.find((value) => value === observer)) {
      observers.push(observer);
    }
    return ErrorCodeType.ErrOk;
  }

  unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    let observers = MediaPlayerInternal._observers.get(this._mediaPlayerId);
    if (observers === undefined) return -ErrorCodeType.ErrFailed;
    MediaPlayerInternal._observers.set(
      this._mediaPlayerId,
      observers.filter((value) => value !== observer)
    );
    return ErrorCodeType.ErrOk;
  }
}
