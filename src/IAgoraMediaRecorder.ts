import './extension/IAgoraMediaRecorderExtension';
import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from './AgoraMediaBase';
/**
 * Used for recording audio and video on the client.
 * IMediaRecorder can record the following:
 *  The audio captured by the local microphone and encoded in AAC format.The video captured by the local camera and encoded by the SDK.
 */
export abstract class IMediaRecorder {
  /**
   * Registers one IMediaRecorderObserver object.
   * Make sure that IRtcEngine is initialized before you call this method.
   *
   * @param connection The connection information. See RtcConnection .
   * @param callback The callbacks for recording local audio and video streams. See IMediaRecorderObserver .
   *
   * @returns
   * 0: Success.< 0: Failure.
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
