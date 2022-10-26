import { ErrorCodeType } from '../AgoraBase';
import { IMediaRecorderObserver } from '../AgoraMediaBase';
import { RtcConnection } from '../IAgoraRtcEngineEx';

import { IMediaRecorderEvent } from '../extension/IAgoraMediaRecorderExtension';

import { processIMediaRecorderObserver } from '../impl/AgoraMediaBaseImpl';
import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';

import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';
import { EmitterSubscription } from './emitter/EventEmitter';

export class MediaRecorderInternal extends IMediaRecorderImpl {
  static _observers: Map<string, IMediaRecorderObserver> = new Map<
    string,
    IMediaRecorderObserver
  >();
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

  setMediaRecorderObserver(
    connection: RtcConnection,
    callback: IMediaRecorderObserver
  ): number {
    const key = (connection.channelId ?? '') + connection.localUid;
    if (MediaRecorderInternal._observers.has(key)) {
      return ErrorCodeType.ErrOk;
    }
    MediaRecorderInternal._observers.set(key, callback);
    return super.setMediaRecorderObserver(connection, callback);
  }

  release() {
    MediaRecorderInternal._observers.clear();
    this.removeAllListeners();
    super.release();
  }

  addListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener: IMediaRecorderEvent[EventType]
  ): EmitterSubscription {
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
