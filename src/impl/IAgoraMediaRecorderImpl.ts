import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from '../AgoraMediaBase';
import { IMediaRecorder } from '../IAgoraMediaRecorder';
import { callIrisApi } from '../index';

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
    return 'MediaRecorder_setMediaRecorderObserver_e1f7340';
  }

  startRecording(config: MediaRecorderConfiguration): number {
    const apiType = this.getApiTypeFromStartRecording(config);
    const jsonParams = {
      config: config,
      toJSON: () => {
        return {
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartRecording(
    config: MediaRecorderConfiguration
  ): string {
    return 'MediaRecorder_startRecording_94480b3';
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
