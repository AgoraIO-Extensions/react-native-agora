import { Buffer } from 'buffer';

import JSONBigInt from 'json-bigint';

const JSON = JSONBigInt({ storeAsString: true });

import { AudioFrame, AudioPcmFrame, VideoFrame } from '../AgoraMediaBase';
import { MusicCollection } from '../IAgoraMusicContentCenter';
import { Metadata } from '../IAgoraRtcEngine';
import { debuggable } from '../Utils';
import { processIAudioEncodedFrameObserver } from '../impl/AgoraBaseImpl';
import {
  processIAudioFrameObserver,
  processIAudioFrameObserverBase,
  processIAudioPcmFrameSink,
  processIAudioSpectrumObserver,
  processIFaceInfoObserver,
  processIMediaRecorderObserver,
  processIVideoEncodedFrameObserver,
  processIVideoFrameObserver,
} from '../impl/AgoraMediaBaseImpl';
import { processIH265TranscoderObserver } from '../impl/IAgoraH265TranscoderImpl';
import { processIMediaPlayerVideoFrameObserver } from '../impl/IAgoraMediaPlayerImpl';
import { processIMediaPlayerSourceObserver } from '../impl/IAgoraMediaPlayerSourceImpl';
import { processIMusicContentCenterEventHandler } from '../impl/IAgoraMusicContentCenterImpl';
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from '../impl/IAgoraRtcEngineImpl';

import { H265TranscoderInternal } from './AgoraH265TranscoderInternal';
import { VideoFrameMetaInfoInternal } from './AgoraMediaBaseInternal';
import { AgoraPipInternal, processAgoraPipObserver } from './AgoraPipInternal';
import { MediaEngineInternal } from './MediaEngineInternal';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { MediaRecorderInternal } from './MediaRecorderInternal';
import {
  MusicCollectionInternal,
  MusicContentCenterInternal,
} from './MusicContentCenterInternal';
import { RtcEngineExInternal } from './RtcEngineExInternal';
import {
  EVENT_TYPE,
  EventProcessor,
  EventProcessors,
  emitEvent,
} from './event';

export type IrisApiParam = {
  funcName: string;
  params: string;
  buffers?: string[];
};

/**
 * @internal
 */
export const EVENT_PROCESSORS: EventProcessors = {
  IAudioFrameObserver: {
    suffix: 'AudioFrameObserver_',
    type: () => EVENT_TYPE.IMediaEngine,
    func: [processIAudioFrameObserver, processIAudioFrameObserverBase],
    preprocess: (
      event: string,
      data: { audioFrame?: AudioFrame },
      buffers: Uint8Array[]
    ) => {
      if (data.audioFrame) {
        data.audioFrame.buffer = buffers[0];
      }
    },
    handlers: () => MediaEngineInternal._audio_frame_observers,
  },
  IVideoFrameObserver: {
    suffix: 'VideoFrameObserver_',
    type: () => EVENT_TYPE.IMediaEngine,
    func: [processIVideoFrameObserver],
    preprocess: (
      event: string,
      data: { videoFrame?: VideoFrame },
      buffers: Uint8Array[]
    ) => {
      if (data.videoFrame) {
        data.videoFrame.yBuffer = buffers[0];
        data.videoFrame.uBuffer = buffers[1];
        data.videoFrame.vBuffer = buffers[2];
        data.videoFrame.metadata_buffer = buffers[3];
        data.videoFrame.alphaBuffer = buffers[4];
        let metaInfo = data.videoFrame.metaInfo;
        data.videoFrame.metaInfo = new VideoFrameMetaInfoInternal(metaInfo);
      }
    },
    handlers: () => MediaEngineInternal._video_frame_observers,
  },
  IAudioSpectrumObserver: {
    suffix: 'AudioSpectrumObserver_',
    type: (data: any) =>
      data.playerId === 0 ? EVENT_TYPE.IRtcEngine : EVENT_TYPE.IMediaPlayer,
    func: [processIAudioSpectrumObserver],
    handlers: (data: any) =>
      data.playerId === 0
        ? RtcEngineExInternal._audio_spectrum_observers
        : MediaPlayerInternal._audio_spectrum_observers.get(data.playerId),
  },
  IAudioEncodedFrameObserver: {
    suffix: 'AudioEncodedFrameObserver_',
    type: () => EVENT_TYPE.IRtcEngine,
    func: [processIAudioEncodedFrameObserver],
    preprocess: (
      event: string,
      data: {
        frameBuffer?: Uint8Array;
      },
      buffers: Uint8Array[]
    ) => {
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
    type: () => EVENT_TYPE.IMediaEngine,
    func: [processIVideoEncodedFrameObserver],
    preprocess: (
      event: string,
      data: {
        imageBuffer?: Uint8Array;
      },
      buffers: Uint8Array[]
    ) => {
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
    type: () => EVENT_TYPE.IMediaPlayer,
    func: [processIMediaPlayerSourceObserver],
    handlers: (data: any) =>
      MediaPlayerInternal._source_observers.get(data.playerId),
  },
  IAudioPcmFrameSink: {
    suffix: 'AudioPcmFrameSink_',
    type: () => EVENT_TYPE.IMediaPlayer,
    func: [processIAudioPcmFrameSink],
    preprocess: (
      event: string,
      data: { frame?: AudioPcmFrame },
      buffers: Uint8Array[]
    ) => {
      if (data.frame) {
        data.frame.data_ = Array.from(buffers[0] ?? []);
      }
    },
    handlers: (data: any) =>
      MediaPlayerInternal._audio_frame_observers.get(data.playerId),
  },
  IMediaPlayerVideoFrameObserver: {
    suffix: 'MediaPlayerVideoFrameObserver_',
    type: () => EVENT_TYPE.IMediaPlayer,
    func: [processIMediaPlayerVideoFrameObserver],
    preprocess: (
      event: string,
      data: { frame?: VideoFrame },
      buffers: Uint8Array[]
    ) => {
      if (data.frame) {
        data.frame.yBuffer = buffers[0];
        data.frame.uBuffer = buffers[1];
        data.frame.vBuffer = buffers[2];
        data.frame.metadata_buffer = buffers[3];
        data.frame.alphaBuffer = buffers[4];
        let metaInfo = data.frame.metaInfo;
        data.frame.metaInfo = new VideoFrameMetaInfoInternal(metaInfo);
      }
    },
    handlers: (data: any) =>
      MediaPlayerInternal._video_frame_observers.get(data.playerId),
  },
  IMediaRecorderObserver: {
    suffix: 'MediaRecorderObserver_',
    type: () => EVENT_TYPE.IMediaRecorder,
    func: [processIMediaRecorderObserver],
    handlers: (data: any) => [
      MediaRecorderInternal._observers.get(data.nativeHandle),
    ],
  },
  IMetadataObserver: {
    suffix: 'MetadataObserver_',
    type: () => EVENT_TYPE.IRtcEngine,
    func: [processIMetadataObserver],
    preprocess: (
      event: string,
      data: { metadata?: Metadata },
      buffers: Uint8Array[]
    ) => {
      switch (event) {
        case 'onMetadataReceived':
          if (data.metadata) {
            data.metadata.buffer = buffers[0];
          }
          break;
      }
    },
    handlers: () => RtcEngineExInternal._metadata_observer,
  },
  IDirectCdnStreamingEventHandler: {
    suffix: 'DirectCdnStreamingEventHandler_',
    type: () => EVENT_TYPE.IRtcEngine,
    func: [processIDirectCdnStreamingEventHandler],
    handlers: () => RtcEngineExInternal._direct_cdn_streaming_event_handler,
  },
  IRtcEngineEventHandler: {
    suffix: 'RtcEngineEventHandler_',
    type: () => EVENT_TYPE.IRtcEngine,
    func: [processIRtcEngineEventHandler],
    preprocess: (
      event: string,
      data: { data?: Uint8Array },
      buffers: Uint8Array[]
    ) => {
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
    type: () => EVENT_TYPE.IMusicContentCenter,
    func: [processIMusicContentCenterEventHandler],
    preprocess: (
      event: string,
      data: { result: MusicCollection },
      buffers: Uint8Array[]
    ) => {
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
  IH265TranscoderObserver: {
    suffix: 'H265TranscoderObserver_',
    type: () => EVENT_TYPE.IAgoraH265Transcoder,
    func: [processIH265TranscoderObserver],
    handlers: () => H265TranscoderInternal._h265_transcoder_observers,
  },
  IFaceInfoObserver: {
    suffix: 'FaceInfoObserver_',
    type: () => EVENT_TYPE.IMediaEngine,
    func: [processIFaceInfoObserver],
    handlers: () => MediaEngineInternal._face_info_observers,
  },
  AgoraPipStateChangedObserver: {
    suffix: 'AgoraPip_',
    type: () => EVENT_TYPE.IAgoraPip,
    func: [processAgoraPipObserver],
    handlers: () => AgoraPipInternal._agora_pip_observers,
  },
};

export function handleEvent({ event, data, buffers }: any) {
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
  let processor: EventProcessor<any> = EVENT_PROCESSORS.IRtcEngineEventHandler;

  Object.values(EVENT_PROCESSORS).some((it) => {
    const p = it as EventProcessor<any>;
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

  // for new IrisType, but this is temporary
  if (_event.includes('_')) {
    _event = _event.substring(0, _event.indexOf('_'));
  }

  const _buffers: Uint8Array[] = (buffers as string[])?.map((value) => {
    return Buffer.from(value, 'base64') as unknown as Uint8Array;
  });
  if (processor.preprocess) {
    processor.preprocess(_event, _data, _buffers);
  }

  if (processor.handlers) {
    processor.handlers(_data)?.map((value) => {
      if (value) {
        processor.func.map((it) => {
          it(value, _event, _data);
        });
      }
    });
  }

  emitEvent(_event, processor, _data);
}
