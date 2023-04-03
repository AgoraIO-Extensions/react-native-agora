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
   * Sets the video encoder configuration.
   * Sets the encoder configuration for the local video.Call this method before joining a channel. Agora recommends calling this method before enableVideo to reduce the time to render the first video frame.
   *
   * @param config Video profile. See VideoEncoderConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract startRecording(config: MediaRecorderConfiguration): number;

  /**
   * @ignore
   */
  abstract stopRecording(): number;
}
