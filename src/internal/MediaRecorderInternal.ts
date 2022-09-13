import { DeviceEventEmitter, EventSubscription } from 'react-native';

import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';
import { RtcConnection } from '../IAgoraRtcEngineEx';
import { ErrorCodeType } from '../AgoraBase';
import { IMediaRecorderObserver } from '../AgoraMediaBase';
import { IMediaRecorderEvent } from '../extension/IAgoraMediaRecorderExtension';
import { processIMediaRecorderObserver } from '../impl/AgoraMediaBaseImpl';
import { EVENT_TYPE } from './IrisApiEngine';

export class MediaRecorderInternal extends IMediaRecorderImpl {
  static _observers: Map<string, IMediaRecorderObserver> = new Map<
    string,
    IMediaRecorderObserver
  >();
  private _events: Map<
    any,
    { eventType: string; listener: (...args: any[]) => any }
  > = new Map<any, { eventType: string; listener: (...args: any[]) => any }>();

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
    this._events.forEach((value) => {
      DeviceEventEmitter.removeListener(value.eventType, value.listener);
    });
    this._events.clear();
    super.release();
  }

  addListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener: IMediaRecorderEvent[EventType]
  ): EventSubscription {
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
    this._events.set(listener, { eventType, listener: callback });
    return DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener: IMediaRecorderEvent[EventType]
  ) {
    if (!this._events.has(listener)) return;
    DeviceEventEmitter.removeListener(
      eventType,
      this._events.get(listener)!.listener
    );
  }

  removeAllListeners<EventType extends keyof IMediaRecorderEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }
}
