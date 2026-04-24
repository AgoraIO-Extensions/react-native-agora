import EventEmitter from 'eventemitter3';

import { IAudioEncodedFrameObserver } from '../AgoraBase';
import {
  IAudioFrameObserver,
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  IFaceInfoObserver,
  IMediaRecorderObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
} from '../AgoraMediaBase';
import { IH265TranscoderObserver } from '../IAgoraH265Transcoder';
import { IMediaPlayerVideoFrameObserver } from '../IAgoraMediaPlayer';
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import { IMusicContentCenterEventHandler } from '../IAgoraMusicContentCenter';
import { AgoraPipStateChangedObserver } from '../IAgoraPip';
import {
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngineEventHandler,
} from '../IAgoraRtcEngine';

export type IrisApiParam = {
  funcName: string;
  params: string;
  buffers?: string[];
};

// @ts-ignore
export const DeviceEventEmitter: EventEmitter = new EventEmitter();

type ScopedEventListener = (...args: any[]) => void;

const scopedDeviceEventListeners: Map<
  object,
  Map<string, Set<ScopedEventListener>>
> = new Map();

function getOwnerScopedEventListeners(
  owner: object,
  create: boolean = false
): Map<string, Set<ScopedEventListener>> | undefined {
  let ownerScopedEventListeners = scopedDeviceEventListeners.get(owner);
  if (ownerScopedEventListeners === undefined && create) {
    ownerScopedEventListeners = new Map<string, Set<ScopedEventListener>>();
    scopedDeviceEventListeners.set(owner, ownerScopedEventListeners);
  }
  return ownerScopedEventListeners;
}

function getScopedEventListeners(
  owner: object,
  eventType: string,
  create: boolean = false
): Set<ScopedEventListener> | undefined {
  const ownerScopedEventListeners = getOwnerScopedEventListeners(owner, create);
  if (ownerScopedEventListeners === undefined) {
    return undefined;
  }

  let scopedEventListeners = ownerScopedEventListeners.get(eventType);
  if (scopedEventListeners === undefined && create) {
    scopedEventListeners = new Set<ScopedEventListener>();
    ownerScopedEventListeners.set(eventType, scopedEventListeners);
  }

  return scopedEventListeners;
}

function cleanupScopedEventListeners(owner: object, eventType: string): void {
  const ownerScopedEventListeners = getOwnerScopedEventListeners(owner);
  if (ownerScopedEventListeners === undefined) {
    return;
  }

  const scopedEventListeners = ownerScopedEventListeners.get(eventType);
  if (scopedEventListeners?.size === 0) {
    ownerScopedEventListeners.delete(eventType);
  }

  if (ownerScopedEventListeners.size === 0) {
    scopedDeviceEventListeners.delete(owner);
  }
}

export function addScopedEventListener(
  owner: object,
  eventType: string,
  listener: ScopedEventListener
): void {
  getScopedEventListeners(owner, eventType, true)?.add(listener);
  DeviceEventEmitter.addListener(eventType, listener);
}

export function removeScopedEventListener(
  owner: object,
  eventType: string,
  listener?: ScopedEventListener
): void {
  const scopedEventListeners = getScopedEventListeners(owner, eventType);
  if (scopedEventListeners === undefined) {
    return;
  }

  const listenersToRemove =
    listener !== undefined ? [listener] : Array.from(scopedEventListeners);
  listenersToRemove.forEach((it) => {
    DeviceEventEmitter.removeListener(eventType, it);
    scopedEventListeners.delete(it);
  });

  cleanupScopedEventListeners(owner, eventType);
}

export function removeAllScopedEventListeners(
  owner: object,
  eventType?: string
): void {
  if (eventType !== undefined) {
    removeScopedEventListener(owner, eventType);
    return;
  }

  const ownerScopedEventListeners = getOwnerScopedEventListeners(owner);
  if (ownerScopedEventListeners === undefined) {
    return;
  }

  ownerScopedEventListeners.forEach((scopedEventListeners, registeredEvent) => {
    scopedEventListeners.forEach((listener) => {
      DeviceEventEmitter.removeListener(registeredEvent, listener);
    });
  });
  scopedDeviceEventListeners.delete(owner);
}

export function removeAllEventListeners(): void {
  DeviceEventEmitter.removeAllListeners();
  scopedDeviceEventListeners.clear();
}

/**
 * @internal
 */
export type EventProcessor<T extends ProcessorType> = {
  suffix: string;
  type: (data: any) => EVENT_TYPE;
  func: Function[];
  preprocess?: (event: string, data: any, buffers: Uint8Array[]) => void;
  handlers: (data: any) => (T | undefined)[] | undefined;
};

export enum EVENT_TYPE {
  IMediaEngine,
  IMediaPlayer,
  IMediaRecorder,
  IRtcEngine,
  IMusicContentCenter,
  IAgoraH265Transcoder,
  IAgoraPip,
}

export type ProcessorType =
  | IAudioFrameObserver
  | IVideoFrameObserver
  | IAudioSpectrumObserver
  | IAudioEncodedFrameObserver
  | IVideoEncodedFrameObserver
  | IMediaPlayerSourceObserver
  | IAudioPcmFrameSink
  | IMediaPlayerVideoFrameObserver
  | IMediaRecorderObserver
  | IMetadataObserver
  | IDirectCdnStreamingEventHandler
  | IRtcEngineEventHandler
  | IMusicContentCenterEventHandler
  | IH265TranscoderObserver
  | IFaceInfoObserver
  | AgoraPipStateChangedObserver;

export type EventProcessors = {
  IAudioFrameObserver: EventProcessor<IAudioFrameObserver>;
  IVideoFrameObserver: EventProcessor<IVideoFrameObserver>;
  IAudioSpectrumObserver: EventProcessor<IAudioSpectrumObserver>;
  IAudioEncodedFrameObserver: EventProcessor<IAudioEncodedFrameObserver>;
  IVideoEncodedFrameObserver: EventProcessor<IVideoEncodedFrameObserver>;
  IMediaPlayerSourceObserver: EventProcessor<IMediaPlayerSourceObserver>;
  IAudioPcmFrameSink: EventProcessor<IAudioPcmFrameSink>;
  IMediaPlayerVideoFrameObserver: EventProcessor<IMediaPlayerVideoFrameObserver>;
  IMediaRecorderObserver: EventProcessor<IMediaRecorderObserver>;
  IMetadataObserver: EventProcessor<IMetadataObserver>;
  IDirectCdnStreamingEventHandler: EventProcessor<IDirectCdnStreamingEventHandler>;
  IRtcEngineEventHandler: EventProcessor<IRtcEngineEventHandler>;
  IMusicContentCenterEventHandler: EventProcessor<IMusicContentCenterEventHandler>;
  IH265TranscoderObserver: EventProcessor<IH265TranscoderObserver>;
  IFaceInfoObserver: EventProcessor<IFaceInfoObserver>;
  AgoraPipStateChangedObserver: EventProcessor<AgoraPipStateChangedObserver>;
};

/**
 * @internal
 */
export function emitEvent<EventType extends keyof T, T extends ProcessorType>(
  eventType: EventType,
  eventProcessor: EventProcessor<T>,
  data: any
): void {
  DeviceEventEmitter.emit(eventType as string, eventProcessor, data);
}
