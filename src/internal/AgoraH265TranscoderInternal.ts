import { createCheckers } from 'ts-interface-checker';

import { IH265TranscoderObserver } from '../IAgoraH265Transcoder';
import { IH265TranscoderEvent } from '../extension/IAgoraH265TranscoderExtension';
import { IH265TranscoderImpl } from '../impl/IAgoraH265TranscoderImpl';

import IAgoraH265TranscoderTI from '../ti/IAgoraH265Transcoder-ti';

const checkers = createCheckers(IAgoraH265TranscoderTI);

import {
  DeviceEventEmitter,
  EVENT_TYPE,
  EventProcessor,
} from './IrisApiEngine';

export class H265TranscoderInternal extends IH265TranscoderImpl {
  static _h265_transcoder_observers: IH265TranscoderObserver[] = [];

  _addListenerPreCheck<EventType extends keyof IH265TranscoderEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.IH265TranscoderObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (H265TranscoderInternal._h265_transcoder_observers.length === 0) {
        this.registerTranscoderObserver({});
      }
    }
    return true;
  }

  addListener<EventType extends keyof IH265TranscoderEvent>(
    eventType: EventType,
    listener: IH265TranscoderEvent[EventType]
  ): void {
    this._addListenerPreCheck(eventType);
    const callback = (eventProcessor: EventProcessor<any>, data: any) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IAgoraH265Transcoder) {
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

  removeListener<EventType extends keyof IH265TranscoderEvent>(
    eventType: EventType,
    listener?: IH265TranscoderEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      // @ts-ignore
      listener?.agoraCallback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IH265TranscoderEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  override registerTranscoderObserver(
    observer: IH265TranscoderObserver
  ): number {
    if (
      !H265TranscoderInternal._h265_transcoder_observers.find(
        (value) => value === observer
      )
    ) {
      H265TranscoderInternal._h265_transcoder_observers.push(observer);
    }
    return super.registerTranscoderObserver(observer);
  }

  override unregisterTranscoderObserver(
    observer: IH265TranscoderObserver
  ): number {
    H265TranscoderInternal._h265_transcoder_observers =
      H265TranscoderInternal._h265_transcoder_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterTranscoderObserver(observer);
  }
}
