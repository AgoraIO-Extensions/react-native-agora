import './extension/IAgoraMediaRecorderExtension';
import { RtcConnection } from './IAgoraRtcEngineEx';
import {
  IMediaRecorderObserver,
  MediaRecorderConfiguration,
} from './AgoraMediaBase';
/**
 * Used for recording audio and video on the client.
 * IMediaRecorder can record the following:
 * The audio captured by the local microphone and encoded in AAC format.The video captured by the local camera and encoded by the SDK.
 */
export abstract class IMediaRecorder {
  /**
   * Registers one IMediaRecorderObserver object.
   * Make sure the IRtcEngine is initialized before you call this method.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param callback The callbacks for recording local audio and video streams. See IMediaRecorderObserver .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setMediaRecorderObserver(
    connection: RtcConnection,
    callback: IMediaRecorderObserver
  ): number;

  /**
   * Starts recording the local audio and video.
   * After successfully getting the IMediaRecorder object by calling getMediaRecorder , you can call this method to enable the recoridng of the local audio and video.This method can record the audio captured by the local microphone and encoded in AAC format, and the video captured by the local camera and encoded in H.264 format. The SDK can generate a recording file only when it detects audio and video streams; when there are no audio and video streams to be recorded or the audio and video streams are interrupted for more than five seconds, the SDK stops the recording and triggers the onRecorderStateChanged(RecorderStateError, RecorderErrorNoStream) callback.Once the recording is started, if the video resolution is changed, the SDK stops the recording; if the sampling rate and audio channel changes, the SDK continues recording and generates audio files respectively.Call this method after joining a channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @param config The recording configuration. See MediaRecorderConfiguration .
   *
   * @returns
   * 0: Success.< 0: Failure.2: The parameter is invalid. Ensure the following:The specified path of the recording file exists and is writable.The specified format of the recording file is supported.The maximum recording duration is correctly set.4: IRtcEngine does not support the request. The recording is ongoing or the recording stops because an error occurs.7: A method is called before IRtcEngine is initialized.
   */
  abstract startRecording(
    connection: RtcConnection,
    config: MediaRecorderConfiguration
  ): number;

  /**
   * Stops recording the local audio and video.
   * After calling startRecording , if you want to stop the recording, you must call this method; otherwise, the generated recording files may not be playable.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.-7: A method is called before IRtcEngine is initialized.
   */
  abstract stopRecording(connection: RtcConnection): number;

  /**
   * Release the IMediaRecorder object.
   * This method releases the IMediaRecorder object and all resources used by the IRtcEngine object. After calling this method, if you need to start recording again, you need to call getMediaRecorder again to get the IMediaRecorder object.
   */
  abstract release(): void;
}
