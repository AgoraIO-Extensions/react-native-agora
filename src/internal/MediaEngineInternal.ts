import { createCheckers } from 'ts-interface-checker';

import {
  IAudioFrameObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from '../AgoraMediaBase';

import { IMediaEngineEvent } from '../extension/IAgoraMediaEngineExtension';

import AgoraMediaBaseTI from '../ti/AgoraMediaBase-ti';
const checkers = createCheckers(AgoraMediaBaseTI);

import { DeviceEventEmitter, EVENT_TYPE } from './IrisApiEngine';

export class MediaEngineInternal extends IMediaEngineImpl {
  static _audio_frame_observers: IAudioFrameObserver[] = [];
  static _video_frame_observers: IVideoFrameObserver[] = [];
  static _video_encoded_frame_observers: IVideoEncodedFrameObserver[] = [];

  override registerAudioFrameObserver(observer: IAudioFrameObserver): number {
    if (
      !MediaEngineInternal._audio_frame_observers.find(
        (value) => value === observer
      )
    ) {
      MediaEngineInternal._audio_frame_observers.push(observer);
    }
    return super.registerAudioFrameObserver(observer);
  }

  override unregisterAudioFrameObserver(observer: IAudioFrameObserver): number {
    MediaEngineInternal._audio_frame_observers =
      MediaEngineInternal._audio_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterAudioFrameObserver(observer);
  }

  override registerVideoFrameObserver(observer: IVideoFrameObserver): number {
    if (
      !MediaEngineInternal._video_frame_observers.find(
        (value) => value === observer
      )
    ) {
      MediaEngineInternal._video_frame_observers.push(observer);
    }
    return super.registerVideoFrameObserver(observer);
  }

  override unregisterVideoFrameObserver(observer: IVideoFrameObserver): number {
    MediaEngineInternal._video_frame_observers =
      MediaEngineInternal._video_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterVideoFrameObserver(observer);
  }

  override registerVideoEncodedFrameObserver(
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

  override unregisterVideoEncodedFrameObserver(
    observer: IVideoEncodedFrameObserver
  ): number {
    MediaEngineInternal._video_encoded_frame_observers =
      MediaEngineInternal._video_encoded_frame_observers.filter(
        (value) => value !== observer
      );
    return super.unregisterVideoEncodedFrameObserver(observer);
  }

  override release() {
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
  ) {
    this._addListenerPreCheck(eventType);
    const callback = (...data: any[]) => {
      if (data[0] !== EVENT_TYPE.IMediaEngine) {
        return;
      }
      processIAudioFrameObserver({ [eventType]: listener }, eventType, data[1]);
      processIAudioFrameObserverBase(
        { [eventType]: listener },
        eventType,
        data[1]
      );
      processIVideoFrameObserver({ [eventType]: listener }, eventType, data[1]);
      processIVideoEncodedFrameObserver(
        { [eventType]: listener },
        eventType,
        data[1]
      );
    };
    listener!.prototype.callback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IMediaEngineEvent>(
    eventType: EventType,
    listener?: IMediaEngineEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      listener?.prototype.callback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IMediaEngineEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }
}

import {
  processIAudioFrameObserver,
  processIAudioFrameObserverBase,
  processIVideoEncodedFrameObserver,
  processIVideoFrameObserver,
} from '../impl/AgoraMediaBaseImpl';
import { IMediaEngineImpl } from '../impl/IAgoraMediaEngineImpl';
