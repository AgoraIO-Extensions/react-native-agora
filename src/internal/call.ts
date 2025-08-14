import { Buffer } from 'buffer';

import base64 from 'base64-js';

import { IMediaPlayer } from '../IAgoraMediaPlayer';
import { isDebuggable } from '../Utils';
import AgoraRtcNg from '../specs';

import { MediaRecorderInternal } from './MediaRecorderInternal';

/**
 * @internal
 */
export function callIrisApi(funcName: string, params: any): any {
  try {
    const buffers: string[] = [];

    if (funcName.startsWith('MediaEngine_')) {
      switch (funcName) {
        case 'MediaEngine_pushAudioFrame_c71f4ab':
          // frame.buffer
          buffers.push(
            base64.fromByteArray(params.frame.buffer ?? Buffer.from(''))
          );
          break;
        case 'MediaEngine_pushVideoFrame_4e544e2':
          // frame.buffer
          buffers.push(
            base64.fromByteArray(params.frame.buffer ?? Buffer.from(''))
          );
          // frame.eglContext
          buffers.push(
            base64.fromByteArray(Buffer.from('') as unknown as Uint8Array)
          );
          // frame.metadata_buffer
          buffers.push(
            base64.fromByteArray(Buffer.from('') as unknown as Uint8Array)
          );
          // frame.alphaBuffer
          buffers.push(
            base64.fromByteArray(params.frame.alphaBuffer ?? Buffer.from(''))
          );
          // frame.d3d11_texture_2d
          buffers.push(
            base64.fromByteArray(Buffer.from('') as unknown as Uint8Array)
          );
          break;
        case 'MediaEngine_pushEncodedVideoImage_e71452b':
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
        case 'RtcEngine_initialize_0320339':
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
        case 'RtcEngine_sendStreamMessage_8715a45':
        case 'RtcEngineEx_sendStreamMessageEx_0c34857':
          // data
          buffers.push(base64.fromByteArray(params.data ?? Buffer.from('')));
          break;
        case 'RtcEngine_destroyMediaPlayer_328a49b':
          params.mediaPlayerId = params.media_player.getMediaPlayerId();
          params.toJSON = function () {
            return { playerId: params.mediaPlayerId };
          };
          break;
        case 'RtcEngine_destroyMediaRecorder_95cdef5':
          // @ts-ignore
          params.nativeHandle = (
            params.mediaRecorder as MediaRecorderInternal
          ).nativeHandle;
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
    if (ret !== undefined && ret !== null && ret !== '' && ret !== 'null') {
      const retObj = JSON.parse(ret);
      if (isDebuggable()) {
        if (typeof retObj.result === 'number' && retObj.result < 0) {
          console.error('callApi', funcName, JSON.stringify(params), ret);
        } else {
          console.log('callApi', funcName, JSON.stringify(params), ret);
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
