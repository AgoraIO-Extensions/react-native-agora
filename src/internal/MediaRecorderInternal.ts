import { createCheckers } from 'ts-interface-checker';

import { ErrorCodeType } from '../AgoraBase';
import { IMediaRecorderObserver } from '../AgoraMediaBase';
import { IMediaRecorderEvent } from '../extension/IAgoraMediaRecorderExtension';
import { IMediaRecorderImpl } from '../impl/IAgoraMediaRecorderImpl';
import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
const checkers = createCheckers(AgoraMediaBaseTI);

import {
  EVENT_TYPE,
  EventProcessor,
  addScopedEventListener,
  removeAllScopedEventListeners,
  removeScopedEventListener,
} from './event';

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
    if (MediaRecorderInternal._observers.get(key) === callback) {
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
    const callback = (eventProcessor: EventProcessor<any>, data: any) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IMediaRecorder) {
        return;
      }
      if (data.nativeHandle !== this._nativeHandle) {
        return;
      }
      eventProcessor.func.map((it) => {
        it({ [eventType]: listener }, eventType, data);
      });
    };
    // @ts-ignore
    listener!.agoraCallback = callback;
    addScopedEventListener(this, eventType as string, callback);
  }

  removeListener<EventType extends keyof IMediaRecorderEvent>(
    eventType: EventType,
    listener?: IMediaRecorderEvent[EventType]
  ) {
    removeScopedEventListener(
      this,
      eventType as string,
      // @ts-ignore
      listener?.agoraCallback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IMediaRecorderEvent>(
    eventType?: EventType
  ) {
    removeAllScopedEventListeners(this, eventType as string | undefined);
  }
}
