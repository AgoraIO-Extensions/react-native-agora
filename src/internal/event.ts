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
