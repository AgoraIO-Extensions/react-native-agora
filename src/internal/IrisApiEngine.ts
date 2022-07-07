import { NativeEventEmitter, NativeModules } from 'react-native';

import {
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngineEventHandler,
} from '../IAgoraRtcEngine';
import { IMediaPlayer } from '../IAgoraMediaPlayer';
import { RtcEngineInternal } from './RtcEngineInternal';
import {
  processIDirectCdnStreamingEventHandler,
  processIMetadataObserver,
  processIRtcEngineEventHandler,
} from '../impl/IAgoraRtcEngineImpl';
import { MediaPlayerInternal } from './MediaPlayerInternal';
import { processIMediaPlayerSourceObserver } from '../impl/IAgoraMediaPlayerSourceImpl';
import { Buffer } from 'buffer';

const base64 = require('base-64');
const utf8 = require('utf8');

const {
  /**
   * @ignore
   */
  ReactNativeAgoraRtcNg,
} = NativeModules;
/**
 * @ignore
 */
const EventEmitter = new NativeEventEmitter(ReactNativeAgoraRtcNg);

EventEmitter.addListener('onEvent', function (args) {
  // console.info('onEvent', args);
  let event = args.event;
  let data: any;
  try {
    data = JSON.parse(args.data);
  } catch (e) {
    data = {};
  }
  const buffers = args.buffers;

  if (event.startsWith('MediaPlayerSourceObserver_')) {
    event = event.replace('MediaPlayerSourceObserver_', '');
    MediaPlayerInternal._observers.get(data.playerId)?.forEach((value) => {
      processIMediaPlayerSourceObserver(value, event, data);
    });
  } else if (event.startsWith('MetadataObserver_')) {
    event = event.replace('MetadataObserver_', '');
    switch (event) {
      case 'onMetadataReceived':
        data.metadata.buffer = Buffer.from(
          utf8.decode(base64.decode(buffers[0]))
        );
        break;
    }
    RtcEngineInternal._handlers.forEach((value) => {
      processIMetadataObserver(value as IMetadataObserver, event, data);
    });
  } else if (event.startsWith('DirectCdnStreamingEventHandler_')) {
    event = event.replace('DirectCdnStreamingEventHandler_', '');
    RtcEngineInternal._handlers.forEach((value) => {
      processIDirectCdnStreamingEventHandler(
        value as IDirectCdnStreamingEventHandler,
        event,
        data
      );
    });
  } else {
    switch (event) {
      case 'onStreamMessage':
      case 'onStreamMessageEx':
        data.data = Buffer.from(utf8.decode(base64.decode(buffers[0])));
        break;
    }
    RtcEngineInternal._handlers.forEach((value) => {
      if (event.endsWith('Ex')) {
        event = event.replace('Ex', '');
      }
      processIRtcEngineEventHandler(
        value as IRtcEngineEventHandler,
        event,
        data
      );
    });
  }
});

export function callIrisApi<T>(funcName: string, params: any): any {
  try {
    const buffers: string[] = [];

    if (funcName.startsWith('MediaPlayer_')) {
      // @ts-ignore
      params.mediaPlayerId = (this as IMediaPlayer).getMediaPlayerId();
      const json = params.toJSON?.call();
      params.toJSON = function () {
        return { ...json, playerId: params.mediaPlayerId };
      };
    } else if (funcName.startsWith('RtcEngine_')) {
      switch (funcName) {
        case 'RtcEngine_initialize':
          ReactNativeAgoraRtcNg.newIrisApiEngine();
          break;
        case 'RtcEngine_release':
          ReactNativeAgoraRtcNg.callApi({
            funcName,
            params: JSON.stringify(params),
            buffers,
          });
          ReactNativeAgoraRtcNg.destroyIrisApiEngine();
          return;
        case 'RtcEngine_sendMetaData':
          // metadata.buffer
          buffers.push(
            base64.encode(utf8.encode(params.metadata.buffer.toString()))
          );
          break;
        case 'RtcEngine_sendStreamMessage':
        case 'RtcEngine_sendStreamMessageEx':
          // data
          buffers.push(base64.encode(utf8.encode(params.data.toString())));
          break;
        case 'RtcEngine_destroyMediaPlayer':
          // @ts-ignore
          params.mediaPlayerId = params.media_player.getMediaPlayerId();
          params.toJSON = function () {
            return { playerId: params.mediaPlayerId };
          };
          break;
      }
    }

    let ret = ReactNativeAgoraRtcNg.callApi({
      funcName,
      params: JSON.stringify(params),
      buffers,
    });
    if (ret) {
      ret = JSON.parse(ret);
      if (typeof ret.result === 'number' && ret.result < 0) {
        console.error('callApi', funcName, JSON.stringify(params), ret);
      } else {
        console.debug('callApi', funcName, JSON.stringify(params), ret);
      }
      return ret;
    }
  } catch (e) {
    console.error(e);
  }
}
