import { createCheckers } from 'ts-interface-checker';

import {
  AgoraPip,
  AgoraPipOptions,
  AgoraPipStateChangedObserver,
} from '../IAgoraPip';
import { IAgoraPipEvent } from '../extension/IAgoraPipExtension';
import AgoraRtcNg from '../specs';
import IAgoraPipTI from '../ti/IAgoraPip-ti';

import {
  DeviceEventEmitter,
  EVENT_TYPE,
  EventProcessor,
} from './IrisApiEngine';

const checkers = createCheckers(IAgoraPipTI);

export function processAgoraPipObserver(
  handler: AgoraPipStateChangedObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onPipStateChanged':
      if (handler.onPipStateChanged !== undefined) {
        handler.onPipStateChanged(jsonParams.state, jsonParams.error);
      }
      break;
  }
}

export class AgoraPipInternal implements AgoraPip {
  static _agora_pip_observers: AgoraPipStateChangedObserver[] = [];

  pipIsSupported(): boolean {
    return AgoraRtcNg.pipIsSupported();
  }
  pipIsAutoEnterSupported(): boolean {
    return AgoraRtcNg.pipIsAutoEnterSupported();
  }
  isPipActivated(): boolean {
    return AgoraRtcNg.isPipActivated();
  }
  pipSetup(options: AgoraPipOptions): boolean {
    return AgoraRtcNg.pipSetup(options);
  }
  pipStart(): boolean {
    return AgoraRtcNg.pipStart();
  }
  pipStop(): void {
    AgoraRtcNg.pipStop();
  }
  pipDispose(): void {
    AgoraRtcNg.pipDispose();
  }

  release() {
    AgoraPipInternal._agora_pip_observers = [];
    this.removeAllListeners();
  }

  _addListenerPreCheck<EventType extends keyof IAgoraPipEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.AgoraPipStateChangedObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (AgoraPipInternal._agora_pip_observers.length === 0) {
        console.error(
          'Please call `registerPipObserver` before you want to receive event by `addListener`'
        );
        return false;
      }
    }
    return true;
  }

  addListener<EventType extends keyof IAgoraPipEvent>(
    eventType: EventType,
    listener: IAgoraPipEvent[EventType]
  ): void {
    this._addListenerPreCheck(eventType);
    const callback = (eventProcessor: EventProcessor<any>, data: any) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IAgoraPip) {
        return;
      }
      eventProcessor.func.map((it) => {
        it({ [eventType]: listener }, eventType, data);
      });
    };
    // @ts-ignore
    listener!.agoraCallback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IAgoraPipEvent>(
    eventType: EventType,
    listener?: IAgoraPipEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      // @ts-ignore
      listener?.agoraCallback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IAgoraPipEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  registerPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void {
    if (
      !AgoraPipInternal._agora_pip_observers.find((value) => value === observer)
    ) {
      AgoraPipInternal._agora_pip_observers.push(observer);
    }
  }

  unregisterPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void {
    AgoraPipInternal._agora_pip_observers =
      AgoraPipInternal._agora_pip_observers.filter(
        (value) => value !== observer
      );
  }
}
