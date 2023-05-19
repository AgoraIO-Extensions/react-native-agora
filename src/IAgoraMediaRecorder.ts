import './extension/IAgoraMediaRecorderExtension';
import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from './AgoraMediaBase';

/**
 * @ignore
 */
export abstract class IMediaRecorder {
  /**
   * @ignore
   */
  abstract setMediaRecorderObserver(callback: IMediaRecorderObserver): number;

  /**
   * @ignore
   */
  abstract startRecording(config: MediaRecorderConfiguration): number;

  /**
   * @ignore
   */
  abstract stopRecording(): number;
}
