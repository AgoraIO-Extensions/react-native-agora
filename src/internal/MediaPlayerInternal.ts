import { createCheckers } from 'ts-interface-checker';

import { ErrorCodeType } from '../AgoraBase';
import {
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  RawAudioFrameOpModeType,
} from '../AgoraMediaBase';
import { IMediaPlayerVideoFrameObserver } from '../IAgoraMediaPlayer';
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';

import { IMediaPlayerEvent } from '../extension/IAgoraMediaPlayerExtension';

import {
  processIAudioPcmFrameSink,
  processIAudioSpectrumObserver,
} from '../impl/AgoraMediaBaseImpl';
import {
  IMediaPlayerImpl,
  processIMediaPlayerVideoFrameObserver,
} from '../impl/IAgoraMediaPlayerImpl';
import { processIMediaPlayerSourceObserver } from '../impl/IAgoraMediaPlayerSourceImpl';

import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
import IAgoraMediaPlayerTI from '../ti/IAgoraMediaPlayer-ti';
import IAgoraMediaPlayerSourceTI from '../ti/IAgoraMediaPlayerSource-ti';
const checkers = createCheckers(
  AgoraMediaBaseTI,
  IAgoraMediaPlayerTI,
  IAgoraMediaPlayerSourceTI
);

import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';
import type { EmitterSubscription } from './emitter/EventEmitter';

export class MediaPlayerInternal extends IMediaPlayerImpl {
  static _source_observers: Map<number, IMediaPlayerSourceObserver[]> = new Map<
    number,
    IMediaPlayerSourceObserver[]
  >();
  static _audio_frame_observers: Map<number, IAudioPcmFrameSink[]> = new Map<
    number,
    IAudioPcmFrameSink[]
  >();
  static _video_frame_observers: Map<number, IMediaPlayerVideoFrameObserver[]> =
    new Map<number, IMediaPlayerVideoFrameObserver[]>();
  static _audio_spectrum_observers: Map<number, IAudioSpectrumObserver[]> =
    new Map<number, IAudioSpectrumObserver[]>();
  private readonly _mediaPlayerId: number;
  private _events: Map<
    any,
    {
      eventType: string;
      subscription: EmitterSubscription;
    }
  > = new Map<
    any,
    {
      eventType: string;
      subscription: EmitterSubscription;
    }
  >();

  constructor(mediaPlayerId: number) {
    super();
    this._mediaPlayerId = mediaPlayerId;
  }

  release() {
    MediaPlayerInternal._source_observers.delete(this._mediaPlayerId);
    MediaPlayerInternal._audio_frame_observers.delete(this._mediaPlayerId);
    MediaPlayerInternal._video_frame_observers.delete(this._mediaPlayerId);
    MediaPlayerInternal._audio_spectrum_observers.delete(this._mediaPlayerId);
    this.removeAllListeners();
  }

  _addListenerPreCheck<EventType extends keyof IMediaPlayerEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.IMediaPlayerSourceObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (
        MediaPlayerInternal._source_observers.get(this._mediaPlayerId)
          ?.length === 0
      ) {
        this.registerPlayerSourceObserver({});
      }
    }
    if (
      checkers.IMediaPlayerAudioFrameObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (
        MediaPlayerInternal._audio_frame_observers.get(this._mediaPlayerId)
          ?.length === 0
      ) {
        this.registerAudioFrameObserver({});
      }
    }
    if (
      checkers.IMediaPlayerVideoFrameObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (
        MediaPlayerInternal._video_frame_observers.get(this._mediaPlayerId)
          ?.length === 0
      ) {
        this.registerVideoFrameObserver({});
      }
    }
    if (
      checkers.IAudioSpectrumObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (
        MediaPlayerInternal._audio_spectrum_observers.get(this._mediaPlayerId)
          ?.length === 0
      ) {
        console.error(
          'Please call `registerMediaPlayerAudioSpectrumObserver` before you want to receive event by `addListener`'
        );
        return false;
      }
    }
    return true;
  }

  addListener<EventType extends keyof IMediaPlayerEvent>(
    eventType: EventType,
    listener: IMediaPlayerEvent[EventType]
  ): EmitterSubscription {
    this._addListenerPreCheck(eventType);
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
        processIAudioPcmFrameSink(
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
    const subscription = DeviceEventEmitter.addListener(eventType, callback);
    this._events.set(listener, { eventType, subscription });
    return subscription;
  }

  removeListener<EventType extends keyof IMediaPlayerEvent>(
    eventType: EventType,
    listener: IMediaPlayerEvent[EventType]
  ) {
    if (!this._events.has(listener)) return;
    this._events.get(listener)!.subscription.remove();
    this._events.delete(listener);
  }

  removeAllListeners<EventType extends keyof IMediaPlayerEvent>(
    eventType?: EventType
  ) {
    if (eventType === undefined) {
      this._events.forEach((value) => {
        DeviceEventEmitter.removeAllListeners(value.eventType);
      });
      this._events.clear();
    } else {
      DeviceEventEmitter.removeAllListeners(eventType);
      this._events.forEach((value, key) => {
        if (value.eventType === eventType) {
          this._events.delete(key);
        }
      });
    }
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

  registerAudioFrameObserver(
    observer: IAudioPcmFrameSink,
    mode: RawAudioFrameOpModeType = RawAudioFrameOpModeType.RawAudioFrameOpModeReadOnly
  ): number {
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
    return super.registerAudioFrameObserver(observer, mode);
  }

  unregisterAudioFrameObserver(observer: IAudioPcmFrameSink): number {
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
