import { callIrisApi } from '../internal/IrisApiEngine';
import { IMediaRecorder } from '../IAgoraMediaRecorder';
import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from '../AgoraMediaBase';
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
