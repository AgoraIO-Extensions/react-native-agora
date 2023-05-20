import { createCheckers } from 'ts-interface-checker';

import {
  IAudioFrameObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from '../AgoraMediaBase';

import { IMediaEngineEvent } from '../extension/IAgoraMediaEngineExtension';

import {
  processIAudioFrameObserver,
  processIVideoEncodedFrameObserver,
  processIVideoFrameObserver,
} from '../impl/AgoraMediaBaseImpl';
import { IMediaEngineImpl } from '../impl/IAgoraMediaEngineImpl';

import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
const checkers = createCheckers(AgoraMediaBaseTI);

import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';
import { EmitterSubscription } from './emitter/EventEmitter';

export class MediaEngineInternal extends IMediaEngineImpl {
  static _audio_frame_observers: IAudioFrameObserver[] = [];
  static _video_frame_observers: IVideoFrameObserver[] = [];
  static _video_encoded_frame_observers: IVideoEncodedFrameObserver[] = [];
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

  registerAudioFrameObserver(observer: IAudioFrameObserver): number {
    if (
      !MediaEngineInternal._audio_frame_observers.find(
        (value) => value === observer
      )
    ) {
      MediaEngineInternal._audio_frame_observers.push(observer);
    }
    return super.registerAudioFrameObserver(observer);
  }

  unregisterAudioFrameObserver(observer: IAudioFrameObserver): number {
    MediaEngineInternal._audio_frame_observers =
      MediaEngineInternal._audio_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioFrameObserver(observer);
  }

  registerVideoFrameObserver(observer: IVideoFrameObserver): number {
    if (
      !MediaEngineInternal._video_frame_observers.find(
        (value) => value === observer
      )
    ) {
      MediaEngineInternal._video_frame_observers.push(observer);
    }
    return super.registerVideoFrameObserver(observer);
  }

  unregisterVideoFrameObserver(observer: IVideoFrameObserver): number {
    MediaEngineInternal._video_frame_observers =
      MediaEngineInternal._video_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterVideoFrameObserver(observer);
  }

  registerVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    if (
      !MediaEngineInternal._video_encoded_frame_observers.find(
        (value) => value === observer
      )
    ) {
      MediaEngineInternal._video_encoded_frame_observers.push(observer);
    }
    return super.registerVideoEncodedFrameObserver(observer);
  }

  unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    MediaEngineInternal._video_encoded_frame_observers =
      MediaEngineInternal._video_encoded_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterVideoEncodedFrameObserver(observer);
  }

  release() {
    MediaEngineInternal._audio_frame_observers = [];
    MediaEngineInternal._video_frame_observers = [];
    MediaEngineInternal._video_encoded_frame_observers = [];
    this.removeAllListeners();
    super.release();
  }

  _addListenerPreCheck<EventType extends keyof IMediaEngineEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.IAudioFrameObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (MediaEngineInternal._audio_frame_observers.length === 0) {
        this.registerAudioFrameObserver({});
      }
    }
    if (
      checkers.IVideoFrameObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (MediaEngineInternal._video_frame_observers.length === 0) {
        this.registerVideoFrameObserver({});
      }
    }
    if (
      checkers.IVideoEncodedFrameObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (MediaEngineInternal._video_encoded_frame_observers.length === 0) {
        this.registerVideoEncodedFrameObserver({});
      }
    }
    return true;
  }

  addListener<EventType extends keyof IMediaEngineEvent>(
    eventType: EventType,
    listener: IMediaEngineEvent[EventType]
  ): EmitterSubscription {
    this._addListenerPreCheck(eventType);
    const callback = (...data: any[]) => {
      if (data[0] !== EVENT_TYPE.IMediaEngine) {
        return;
      }
      processIAudioFrameObserver({ [eventType]: listener }, eventType, data[1]);
      processIVideoFrameObserver({ [eventType]: listener }, eventType, data[1]);
      processIVideoEncodedFrameObserver(
        { [eventType]: listener },
        eventType,
        data[1]
      );
    };
    const subscription = DeviceEventEmitter.addListener(eventType, callback);
    this._events.set(listener, { eventType, subscription });
    return subscription;
  }

  removeListener<EventType extends keyof IMediaEngineEvent>(
    eventType: EventType,
    listener: IMediaEngineEvent[EventType]
  ) {
    if (!this._events.has(listener)) return;
    DeviceEventEmitter.removeSubscription(
      this._events.get(listener)!.subscription
    );
    this._events.delete(listener);
  }

  removeAllListeners<EventType extends keyof IMediaEngineEvent>(
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
}
