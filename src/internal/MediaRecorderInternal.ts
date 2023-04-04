import { createCheckers } from 'ts-interface-checker';

import { ErrorCodeType } from '../AgoraBase';
import { IMediaRecorderObserver } from '../AgoraMediaBase';

import { IMediaRecorderEvent } from '../extension/IAgoraMediaRecorderExtension';

import { processIMediaRecorderObserver } from '../impl/AgoraMediaBaseImpl';
import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';

import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
const checkers = createCheckers(AgoraMediaBaseTI);

import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';
import { EmitterSubscription } from './emitter/EventEmitter';

export class MediaRecorderInternal extends IMediaRecorderImpl {
  static _observers: Map<string, IMediaRecorderObserver> = new Map<
    string,
    IMediaRecorderObserver
  >();
  private readonly _nativeHandle: string;
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

  constructor(nativeHandle: string) {
    super();
    this._nativeHandle = nativeHandle;
  }

  release() {
    MediaRecorderInternal._observers.delete(this._nativeHandle);
    this.removeAllListeners();
  }

  get nativeHandle(): string {
    return this._nativeHandle;
  }

  setMediaRecorderObserver(callback: IMediaRecorderObserver): number {
    const key = this._nativeHandle;
    if (MediaRecorderInternal._observers.has(key)) {
      return ErrorCodeType.ErrOk;
    }
    MediaRecorderInternal._observers.set(key, callback);
    return super.setMediaRecorderObserver(callback);
  }

  _addListenerPreCheck<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.IMediaRecorderObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (
        MediaRecorderInternal._observers.get(this._nativeHandle) === undefined
      ) {
        this.setMediaRecorderObserver({});
      }
    }
    return true;
  }

  addListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener: IMediaRecorderEvent[EventType]
  ): EmitterSubscription {
    this._addListenerPreCheck(eventType);
    const callback = (...data: any[]) => {
      if (data[0] !== EVENT_TYPE.IMediaRecorder) {
        return;
      }
      processIMediaRecorderObserver(
        { [eventType]: listener },
        eventType,
        data[1]
      );
    };
    const subscription = DeviceEventEmitter.addListener(eventType, callback);
    this._events.set(listener, { eventType, subscription });
    return subscription;
  }

  removeListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener: IMediaRecorderEvent[EventType]
  ) {
    if (!this._events.has(listener)) return;
    DeviceEventEmitter.removeSubscription(
      this._events.get(listener)!.subscription
    );
    this._events.delete(listener);
  }

  removeAllListeners<EventType extends keyof IMediaRecorderEvent>(
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
