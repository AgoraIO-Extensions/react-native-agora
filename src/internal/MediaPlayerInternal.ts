import {
  ErrorCodeType,
  IMediaPlayerSourceObserver,
} from 'react-native-agora-rtc-ng';

import { IMediaPlayerImpl } from '../impl/IAgoraMediaPlayerImpl';
import { callIrisApi } from './IrisApiEngine';

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

  setPlayerOptionInInt(key: string, value: number): number {
    const apiType = 'MediaPlayer_setPlayerOption';
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setPlayerOptionInString(key: string, value: string): number {
    const apiType = 'MediaPlayer_setPlayerOption2';
    const jsonParams = {
      key,
      value,
      toJSON: () => {
        return {
          key,
          value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }
}
