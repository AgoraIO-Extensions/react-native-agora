import { DeviceEventEmitter, EventSubscription } from 'react-native';

import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import { ErrorCodeType } from '../AgoraBase';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';
import {
  IMediaPlayerImpl,
  processIMediaPlayerAudioFrameObserver,
  processIMediaPlayerVideoFrameObserver,
} from '../impl/IAgoraMediaPlayerImpl';
import {
  IMediaPlayerAudioFrameObserver,
  IMediaPlayerVideoFrameObserver,
} from '../IAgoraMediaPlayer';
import { processIMediaPlayerSourceObserver } from '../impl/IAgoraMediaPlayerSourceImpl';
import { IMediaPlayerEvent } from '../extension/IAgoraMediaPlayerExtension';
import { processIAudioSpectrumObserver } from '../impl/AgoraMediaBaseImpl';
import { EVENT_TYPE } from './IrisApiEngine';

export class MediaPlayerInternal extends IMediaPlayerImpl {
  static _source_observers: Map<number, IMediaPlayerSourceObserver[]> = new Map<
    number,
    IMediaPlayerSourceObserver[]
  >();
  static _audio_frame_observers: Map<number, IMediaPlayerAudioFrameObserver[]> =
    new Map<number, IMediaPlayerAudioFrameObserver[]>();
  static _video_frame_observers: Map<number, IMediaPlayerVideoFrameObserver[]> =
    new Map<number, IMediaPlayerVideoFrameObserver[]>();
  static _audio_spectrum_observers: Map<number, IAudioSpectrumObserver[]> =
    new Map<number, IAudioSpectrumObserver[]>();
  private readonly _mediaPlayerId: number;
  private _events: Map<
    any,
    { eventType: string; listener: (...args: any[]) => any }
  > = new Map<any, { eventType: string; listener: (...args: any[]) => any }>();

  constructor(mediaPlayerId: number) {
    super();
    this._mediaPlayerId = mediaPlayerId;
  }

  release() {
    MediaPlayerInternal._source_observers.delete(this._mediaPlayerId);
    MediaPlayerInternal._audio_frame_observers.delete(this._mediaPlayerId);
    MediaPlayerInternal._video_frame_observers.delete(this._mediaPlayerId);
    MediaPlayerInternal._audio_spectrum_observers.delete(this._mediaPlayerId);
    this._events.forEach((value) => {
      DeviceEventEmitter.removeListener(value.eventType, value.listener);
    });
    this._events.clear();
  }

  addListener<EventType extends keyof IMediaPlayerEvent>(
    eventType: EventType,
    listener: IMediaPlayerEvent[EventType]
  ): EventSubscription {
    const callback = (...data: any[]) => {
      if (data[0] !== EVENT_TYPE.IMediaPlayer) {
        return;
      }
      if (data[1].playerId === this._mediaPlayerId) {
        processIMediaPlayerSourceObserver(
          { [eventType]: listener },
          eventType,
          data[1]
        );
        processIMediaPlayerAudioFrameObserver(
          { [eventType]: listener },
          eventType,
          data[1]
        );
        processIMediaPlayerVideoFrameObserver(
          { [eventType]: listener },
          eventType,
          data[1]
        );
        processIAudioSpectrumObserver(
          { [eventType]: listener },
          eventType,
          data[1]
        );
      }
    };
    this._events.set(listener, { eventType, listener: callback });
    return DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IMediaPlayerEvent>(
    eventType: EventType,
    listener: IMediaPlayerEvent[EventType]
  ) {
    if (!this._events.has(listener)) return;
    DeviceEventEmitter.removeListener(
      eventType,
      this._events.get(listener)!.listener
    );
  }

  removeAllListeners<EventType extends keyof IMediaPlayerEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  getMediaPlayerId(): number {
    return this._mediaPlayerId;
  }

  registerPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    let observers = MediaPlayerInternal._source_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) {
      observers = [];
      MediaPlayerInternal._source_observers.set(this._mediaPlayerId, observers);
    }
    if (!observers.find((value) => value === observer)) {
      observers.push(observer);
    }
    return super.registerPlayerSourceObserver(observer);
  }

  unregisterPlayerSourceObserver(observer: IMediaPlayerSourceObserver): number {
    let observers = MediaPlayerInternal._source_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) return -ErrorCodeType.ErrFailed;
    MediaPlayerInternal._source_observers.set(
      this._mediaPlayerId,
      observers.filter((value) => value !== observer)
    );
    return super.unregisterPlayerSourceObserver(observer);
  }

  registerAudioFrameObserver(observer: IMediaPlayerAudioFrameObserver): number {
    let observers = MediaPlayerInternal._audio_frame_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) {
      observers = [];
      MediaPlayerInternal._audio_frame_observers.set(
        this._mediaPlayerId,
        observers
      );
    }
    if (!observers.find((value) => value === observer)) {
      observers.push(observer);
    }
    return super.registerAudioFrameObserver(observer);
  }

  unregisterAudioFrameObserver(
    observer: IMediaPlayerAudioFrameObserver
  ): number {
    let observers = MediaPlayerInternal._audio_frame_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) return -ErrorCodeType.ErrFailed;
    MediaPlayerInternal._audio_frame_observers.set(
      this._mediaPlayerId,
      observers.filter((value) => value !== observer)
    );
    return super.unregisterAudioFrameObserver(observer);
  }

  registerVideoFrameObserver(observer: IMediaPlayerVideoFrameObserver): number {
    let observers = MediaPlayerInternal._video_frame_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) {
      observers = [];
      MediaPlayerInternal._video_frame_observers.set(
        this._mediaPlayerId,
        observers
      );
    }
    if (!observers.find((value) => value === observer)) {
      observers.push(observer);
    }
    return super.registerVideoFrameObserver(observer);
  }

  unregisterVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): number {
    let observers = MediaPlayerInternal._video_frame_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) return -ErrorCodeType.ErrFailed;
    MediaPlayerInternal._video_frame_observers.set(
      this._mediaPlayerId,
      observers.filter((value) => value !== observer)
    );
    return super.unregisterVideoFrameObserver(observer);
  }

  registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): number {
    let observers = MediaPlayerInternal._audio_spectrum_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) {
      observers = [];
      MediaPlayerInternal._audio_spectrum_observers.set(
        this._mediaPlayerId,
        observers
      );
    }
    if (!observers.find((value) => value === observer)) {
      observers.push(observer);
    }
    return super.registerMediaPlayerAudioSpectrumObserver(
      observer,
      intervalInMS
    );
  }

  unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number {
    let observers = MediaPlayerInternal._audio_spectrum_observers.get(
      this._mediaPlayerId
    );
    if (observers === undefined) return -ErrorCodeType.ErrFailed;
    MediaPlayerInternal._audio_spectrum_observers.set(
      this._mediaPlayerId,
      observers.filter((value) => value !== observer)
    );
    return super.unregisterMediaPlayerAudioSpectrumObserver(observer);
  }

  protected getApiTypeFromSetPlayerOptionInInt(
    key: string,
    value: number
  ): string {
    return 'MediaPlayer_setPlayerOption';
  }

  protected getApiTypeFromSetPlayerOptionInString(
    key: string,
    value: string
  ): string {
    return 'MediaPlayer_setPlayerOption2';
  }
}
