import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from '../AgoraMediaBase';
import { IMediaRecorder } from '../IAgoraMediaRecorder';

// @ts-ignore
export class IMediaRecorderImpl implements IMediaRecorder {
  setMediaRecorderObserver(callback: IMediaRecorderObserver): number {
    const apiType = this.getApiTypeFromSetMediaRecorderObserver(callback);
    const jsonParams = {
      callback: callback,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetMediaRecorderObserver(
    callback: IMediaRecorderObserver
  ): string {
    return 'MediaRecorder_setMediaRecorderObserver';
  }

  startRecording(): MediaRecorderConfiguration {
    const apiType = this.getApiTypeFromStartRecording();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartRecording(): string {
    return 'MediaRecorder_startRecording';
  }

  stopRecording(): number {
    const apiType = this.getApiTypeFromStopRecording();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopRecording(): string {
    return 'MediaRecorder_stopRecording';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
