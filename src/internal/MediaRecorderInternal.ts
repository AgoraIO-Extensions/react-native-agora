import { createCheckers } from 'ts-interface-checker';

import { ErrorCodeType } from '../AgoraBase';
import { IMediaRecorderObserver } from '../AgoraMediaBase';

import { IMediaRecorderEvent } from '../extension/IAgoraMediaRecorderExtension';

import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
const checkers = createCheckers(AgoraMediaBaseTI);

import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';

export class MediaRecorderInternal extends IMediaRecorderImpl {
  static _observers: Map<string, IMediaRecorderObserver> = new Map<
    string,
    IMediaRecorderObserver
  >();
  private readonly _nativeHandle: string;

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

  override setMediaRecorderObserver(callback: IMediaRecorderObserver): number {
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
  ): void {
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
    listener!.prototype.callback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener?: IMediaRecorderEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      listener?.prototype.callback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IMediaRecorderEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }
}

import { processIMediaRecorderObserver } from '../impl/AgoraMediaBaseImpl';
import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';
