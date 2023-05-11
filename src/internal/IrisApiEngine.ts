import { Buffer } from 'buffer';

import base64 from 'base64-js';
import EventEmitter from 'eventemitter3';
import JSON from 'json-bigint';
import { NativeEventEmitter } from 'react-native';

import { IAudioEncodedFrameObserver } from '../AgoraBase';
import {
  AudioFrame,
  AudioPcmFrame,
  IAudioFrameObserver,
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  IMediaRecorderObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
  VideoFrame,
} from '../AgoraMediaBase';
import {
  IMediaPlayer,
  IMediaPlayerVideoFrameObserver,
} from '../IAgoraMediaPlayer';
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import { IMusicContentCenterEventHandler } from '../IAgoraMusicContentCenter';
import {
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngineEventHandler,
  Metadata,
} from '../IAgoraRtcEngine';
import { processIAudioEncodedFrameObserver } from '../impl/AgoraBaseImpl';
import {
  processIAudioFrameObserver,
  processIAudioFrameObserverBase,
  processIAudioPcmFrameSink,
  processIAudioSpectrumObserver,
  processIMediaRecorderObserver,
  processIVideoEncodedFrameObserver,
  processIVideoFrameObserver,
} from '../impl/AgoraMediaBaseImpl';
import { processIMediaPlayerVideoFrameObserver } from '../impl/IAgoraMediaPlayerImpl';
import { processIMediaPlayerSourceObserver } from '../impl/IAgoraMediaPlayerSourceImpl';
import { processIMusicContentCenterEventHandler } from '../impl/IAgoraMusicContentCenterImpl';
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from '../impl/IAgoraRtcEngineImpl';
import AgoraRtcNg from '../specs';

import { MediaEngineInternal } from './MediaEngineInternal';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { MediaRecorderInternal } from './MediaRecorderInternal';
import {
  MusicCollectionInternal,
  MusicContentCenterInternal,
} from './MusicContentCenterInternal';
import { RtcEngineExInternal } from './RtcEngineExInternal';

export type IrisApiParam = {
  funcName: string;
  params: string;
  buffers?: string[];
};

// @ts-ignore
export const DeviceEventEmitter: EventEmitter = new EventEmitter();

const AgoraEventEmitter = new NativeEventEmitter(AgoraRtcNg);
AgoraEventEmitter.addListener('AgoraRtcNg:onEvent', handleEvent);

let debuggable = false;

/**
 * @internal
 */
export function setDebuggable(flag: boolean) {
  debuggable = flag;
}

/**
 * @internal
 */
export function isDebuggable() {
  return debuggable && __DEV__;
}

/**
 * @internal
 */
export type EventProcessor = {
  suffix: string;
  type: EVENT_TYPE;
  func: Function[];
  preprocess?: (event: string, data: any, buffers: Uint8Array[]) => void;
  handlers: (
    data: any
  ) =>
    | (
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
      )[];
};

export enum EVENT_TYPE {
  IMediaEngine,
  IMediaPlayer,
  IMediaRecorder,
  IRtcEngine,
  IMusicContentCenter,
}

/**
 * @internal
 */
export const EVENT_PROCESSORS = {
  IAudioFrameObserver: {
    suffix: 'AudioFrameObserver_',
    type: EVENT_TYPE.IMediaEngine,
    func: [processIAudioFrameObserver, processIAudioFrameObserverBase],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      if (data.audioFrame) {
        (data.audioFrame as AudioFrame).buffer = buffers[0];
      }
    },
    handlers: () => MediaEngineInternal._audio_frame_observers,
  },
  IVideoFrameObserver: {
    suffix: 'VideoFrameObserver_',
    type: EVENT_TYPE.IMediaEngine,
    func: [processIVideoFrameObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      if (data.videoFrame) {
        (data.videoFrame as VideoFrame).yBuffer = buffers[0];
        (data.videoFrame as VideoFrame).uBuffer = buffers[1];
        (data.videoFrame as VideoFrame).vBuffer = buffers[2];
        (data.videoFrame as VideoFrame).metadata_buffer = buffers[3];
        (data.videoFrame as VideoFrame).alphaBuffer = buffers[4];
      }
    },
    handlers: () => MediaEngineInternal._video_frame_observers,
  },
  IAudioSpectrumObserver: {
    suffix: 'AudioSpectrumObserver_',
    type: EVENT_TYPE.IRtcEngine,
    func: [processIAudioSpectrumObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      // if (data.data) {
      //   (data.data as AudioSpectrumData).audioSpectrumData = buffers[0];
      // }
    },
    handlers: (data: any) =>
      data.playerId === 0
        ? RtcEngineExInternal._audio_spectrum_observers
        : undefined,
  },
  IMediaPlayerAudioSpectrumObserver: {
    suffix: 'AudioSpectrumObserver_',
    type: EVENT_TYPE.IMediaPlayer,
    func: [processIAudioSpectrumObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      // if (data.data) {
      //   (data.data as AudioSpectrumData).audioSpectrumData = buffers[0];
      // }
    },
    handlers: (data: any) =>
      data.playerId !== 0
        ? MediaPlayerInternal._audio_spectrum_observers.get(data.playerId)
        : undefined,
  },
  IAudioEncodedFrameObserver: {
    suffix: 'AudioEncodedFrameObserver_',
    type: EVENT_TYPE.IRtcEngine,
    func: [processIAudioEncodedFrameObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      switch (event) {
        case 'OnRecordAudioEncodedFrame':
        case 'OnPlaybackAudioEncodedFrame':
        case 'OnMixedAudioEncodedFrame':
          data.frameBuffer = buffers[0];
          break;
      }
    },
    handlers: () => RtcEngineExInternal._audio_encoded_frame_observers,
  },
  IVideoEncodedFrameObserver: {
    suffix: 'VideoEncodedFrameObserver_',
    type: EVENT_TYPE.IMediaEngine,
    func: [processIVideoEncodedFrameObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      switch (event) {
        case 'onEncodedVideoFrameReceived':
          data.imageBuffer = buffers[0];
          break;
      }
    },
    handlers: () => MediaEngineInternal._video_encoded_frame_observers,
  },
  IMediaPlayerSourceObserver: {
    suffix: 'MediaPlayerSourceObserver_',
    type: EVENT_TYPE.IMediaPlayer,
    func: [processIMediaPlayerSourceObserver],
    handlers: (data: any) =>
      MediaPlayerInternal._source_observers.get(data.playerId),
  },
  IMediaPlayerAudioFrameObserver: {
    suffix: 'AudioPcmFrameSink_',
    type: EVENT_TYPE.IMediaPlayer,
    func: [processIAudioPcmFrameSink],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      if (data.frame) {
        (data.frame as AudioPcmFrame).data_ = Array.from(buffers[0] ?? []);
      }
    },
    handlers: (data: any) =>
      MediaPlayerInternal._audio_frame_observers.get(data.playerId),
  },
  IMediaPlayerVideoFrameObserver: {
    suffix: 'MediaPlayerVideoFrameObserver_',
    type: EVENT_TYPE.IMediaPlayer,
    func: [processIMediaPlayerVideoFrameObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      if (data.frame) {
        (data.frame as VideoFrame).yBuffer = buffers[0];
        (data.frame as VideoFrame).uBuffer = buffers[1];
        (data.frame as VideoFrame).vBuffer = buffers[2];
        (data.frame as VideoFrame).metadata_buffer = buffers[3];
        (data.frame as VideoFrame).alphaBuffer = buffers[4];
      }
    },
    handlers: (data: any) =>
      MediaPlayerInternal._video_frame_observers.get(data.playerId),
  },
  IMediaRecorderObserver: {
    suffix: 'MediaRecorderObserver_',
    type: EVENT_TYPE.IMediaRecorder,
    func: [processIMediaRecorderObserver],
    handlers: (data: any) => [
      MediaRecorderInternal._observers.get(data.nativeHandle),
    ],
  },
  IMetadataObserver: {
    suffix: 'MetadataObserver_',
    type: EVENT_TYPE.IRtcEngine,
    func: [processIMetadataObserver],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      switch (event) {
        case 'onMetadataReceived':
          if (data.metadata) {
            (data.metadata as Metadata).buffer = buffers[0];
          }
          break;
      }
    },
    handlers: () => RtcEngineExInternal._metadata_observer,
  },
  IDirectCdnStreamingEventHandler: {
    suffix: 'DirectCdnStreamingEventHandler_',
    type: EVENT_TYPE.IRtcEngine,
    func: [processIDirectCdnStreamingEventHandler],
    handlers: () => RtcEngineExInternal._direct_cdn_streaming_event_handler,
  },
  IRtcEngineEventHandler: {
    suffix: 'RtcEngineEventHandler_',
    type: EVENT_TYPE.IRtcEngine,
    func: [processIRtcEngineEventHandler],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      switch (event) {
        case 'onStreamMessage':
        case 'onStreamMessageEx':
          data.data = buffers[0];
          break;
      }
    },
    handlers: () => RtcEngineExInternal._event_handlers,
  },
  IMusicContentCenterEventHandler: {
    suffix: 'MusicContentCenterEventHandler_',
    type: EVENT_TYPE.IMusicContentCenter,
    func: [processIMusicContentCenterEventHandler],
    preprocess: (event: string, data: any, buffers: Uint8Array[]) => {
      switch (event) {
        case 'onMusicCollectionResult': {
          const result = data.result;
          data.result = new MusicCollectionInternal(result);
          break;
        }
      }
    },
    handlers: () => MusicContentCenterInternal._event_handlers,
  },
};

function handleEvent({ event, data, buffers }: any) {
  if (debuggable) {
    console.info('onEvent', event, data, buffers);
  }

  let _data: any;
  try {
    _data = JSON.parse(data) ?? {};
  } catch (e) {
    _data = {};
  }

  let _event: string = event;
  let processor: EventProcessor = EVENT_PROCESSORS.IRtcEngineEventHandler;

  Object.values(EVENT_PROCESSORS).some((it) => {
    const p = it as EventProcessor;
    if (
      _event.startsWith(p.suffix) &&
      processor.handlers(_data) !== undefined
    ) {
      processor = p;
      const reg = new RegExp(`^${processor.suffix}`, 'g');
      _event = _event.replace(reg, '');
      return true;
    }
    return false;
  });

  if (_event.endsWith('Ex')) {
    _event = _event.replace(/Ex$/g, '');
  }

  const _buffers: Uint8Array[] = (buffers as string[])?.map((value) => {
    return Buffer.from(value, 'base64');
  });
  if (processor.preprocess) processor.preprocess!(_event, _data, _buffers);

  processor.handlers(_data)?.map((value) => {
    if (value) {
      processor.func.map((it) => {
        it(value, _event, _data);
      });
    }
  });

  emitEvent(_event, processor.type, _data);
}

/**
 * @internal
 */
export function callIrisApi(funcName: string, params: any): any {
  try {
    const buffers: string[] = [];

    if (funcName.startsWith('MediaEngine_')) {
      switch (funcName) {
        case 'MediaEngine_pushAudioFrame':
        case 'MediaEngine_pushCaptureAudioFrame':
        case 'MediaEngine_pushReverseAudioFrame':
        case 'MediaEngine_pushDirectAudioFrame':
          // frame.buffer
          buffers.push(
            base64.fromByteArray(params.frame.buffer ?? Buffer.from(''))
          );
          break;
        case 'MediaEngine_pushVideoFrame':
          // frame.buffer
          buffers.push(
            base64.fromByteArray(params.frame.buffer ?? Buffer.from(''))
          );
          // frame.eglContext
          buffers.push(base64.fromByteArray(Buffer.from('')));
          // frame.metadata_buffer
          buffers.push(base64.fromByteArray(Buffer.from('')));
          // frame.alphaBuffer
          buffers.push(
            base64.fromByteArray(params.frame.alphaBuffer ?? Buffer.from(''))
          );
          break;
        case 'MediaEngine_pushEncodedVideoImage':
          // imageBuffer
          buffers.push(
            base64.fromByteArray(params.imageBuffer ?? Buffer.from(''))
          );
          break;
      }
    } else if (
      funcName.startsWith('MediaPlayer_') ||
      funcName.startsWith('MusicPlayer_')
    ) {
      // @ts-ignore
      params.mediaPlayerId = (this as IMediaPlayer).getMediaPlayerId();
      const json = params.toJSON?.call();
      params.toJSON = function () {
        return { ...json, playerId: params.mediaPlayerId };
      };
    } else if (funcName.startsWith('MediaRecorder_')) {
      // @ts-ignore
      params.nativeHandle = (this as MediaRecorderInternal).nativeHandle;
      const json = params.toJSON?.call();
      params.toJSON = function () {
        return { ...json, nativeHandle: params.nativeHandle };
      };
    } else if (funcName.startsWith('RtcEngine_')) {
      switch (funcName) {
        case 'RtcEngine_initialize':
          AgoraRtcNg.newIrisApiEngine();
          break;
        case 'RtcEngine_release':
          AgoraRtcNg.callApi({
            funcName,
            params: JSON.stringify(params),
            buffers,
          });
          AgoraRtcNg.destroyIrisApiEngine();
          return;
        case 'RtcEngine_sendMetaData':
          // metadata.buffer
          buffers.push(
            base64.fromByteArray(params.metadata.buffer ?? Buffer.from(''))
          );
          break;
        case 'RtcEngine_sendStreamMessage':
        case 'RtcEngine_sendStreamMessageEx':
          // data
          buffers.push(base64.fromByteArray(params.data ?? Buffer.from('')));
          break;
        case 'RtcEngine_destroyMediaPlayer':
          params.mediaPlayerId = params.media_player.getMediaPlayerId();
          params.toJSON = function () {
            return { playerId: params.mediaPlayerId };
          };
          break;
        case 'RtcEngine_destroyMediaRecorder':
          // @ts-ignore
          params.nativeHandle = (this as MediaRecorderInternal).nativeHandle;
          params.toJSON = function () {
            return { nativeHandle: params.nativeHandle };
          };
          break;
      }
    }

    let ret = AgoraRtcNg.callApi({
      funcName,
      params: JSON.stringify(params),
      buffers,
    });
    if (ret !== undefined && ret !== null && ret !== '') {
      const retObj = JSON.parse(ret);
      if (isDebuggable()) {
        if (typeof retObj.result === 'number' && retObj.result < 0) {
          console.error('callApi', funcName, JSON.stringify(params), ret);
        } else {
          console.debug('callApi', funcName, JSON.stringify(params), ret);
        }
      }
      return retObj;
    }
  } catch (e) {
    if (isDebuggable()) {
      console.error('callApi', funcName, JSON.stringify(params), e);
    } else {
      console.warn('callApi', funcName, JSON.stringify(params), e);
    }
  }
  return {};
}

/**
 * @internal
 */
export function emitEvent(eventType: string, ...params: any[]): void {
  DeviceEventEmitter.emit(eventType, ...params);
}
