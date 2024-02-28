import './extension/IAudioDeviceManagerExtension';
import { AudioDeviceInfo } from './IAgoraRtcEngine';

/**
 * The maximum length of the device ID.
 */
export enum MaxDeviceIdLengthType {
  /**
   * The maximum length of the device ID is 512 bytes.
   */
  MaxDeviceIdLength = 512,
}

/**
 * Audio device management methods.
 */
export abstract class IAudioDeviceManager {
  /**
   * @ignore
   */
  abstract enumeratePlaybackDevices(): AudioDeviceInfo[];

  /**
   * @ignore
   */
  abstract enumerateRecordingDevices(): AudioDeviceInfo[];

  /**
   * @ignore
   */
  abstract setPlaybackDevice(deviceId: string): number;

  /**
   * @ignore
   */
  abstract getPlaybackDevice(): string;

  /**
   * @ignore
   */
  abstract getPlaybackDeviceInfo(): AudioDeviceInfo;

  /**
   * @ignore
   */
  abstract setPlaybackDeviceVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract getPlaybackDeviceVolume(): number;

  /**
   * @ignore
   */
  abstract setRecordingDevice(deviceId: string): number;

  /**
   * @ignore
   */
  abstract getRecordingDevice(): string;

  /**
   * @ignore
   */
  abstract getRecordingDeviceInfo(): AudioDeviceInfo;

  /**
   * @ignore
   */
  abstract setRecordingDeviceVolume(volume: number): number;

  /**
   * @ignore
   */
  abstract getRecordingDeviceVolume(): number;

  /**
   * @ignore
   */
  abstract setLoopbackDevice(deviceId: string): number;

  /**
   * @ignore
   */
  abstract getLoopbackDevice(): string;

  /**
   * @ignore
   */
  abstract setPlaybackDeviceMute(mute: boolean): number;

  /**
   * @ignore
   */
  abstract getPlaybackDeviceMute(): boolean;

  /**
   * @ignore
   */
  abstract setRecordingDeviceMute(mute: boolean): number;

  /**
   * @ignore
   */
  abstract getRecordingDeviceMute(): boolean;

  /**
   * Starts the audio playback device test.
   *
   * This method tests whether the audio device for local playback works properly. Once a user starts the test, the SDK plays an audio file specified by the user. If the user can hear the audio, the playback device works properly. After calling this method, the SDK triggers the onAudioVolumeIndication callback every 100 ms, reporting uid = 1 and the volume information of the playback device. The difference between this method and the startEchoTest method is that the former checks if the local audio playback device is working properly, while the latter can check the audio and video devices and network conditions. Ensure that you call this method before joining a channel. After the test is completed, call stopPlaybackDeviceTest to stop the test before joining a channel.
   *
   * @param testAudioFilePath The path of the audio file. The data format is string in UTF-8.
   *  Supported file formats: wav, mp3, m4a, and aac.
   *  Supported file sample rates: 8000, 16000, 32000, 44100, and 48000 Hz.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract startPlaybackDeviceTest(testAudioFilePath: string): number;

  /**
   * Stops the audio playback device test.
   *
   * This method stops the audio playback device test. You must call this method to stop the test after calling the startPlaybackDeviceTest method. Ensure that you call this method before joining a channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopPlaybackDeviceTest(): number;

  /**
   * @ignore
   */
  abstract startRecordingDeviceTest(indicationInterval: number): number;

  /**
   * @ignore
   */
  abstract stopRecordingDeviceTest(): number;

  /**
   * @ignore
   */
  abstract startAudioDeviceLoopbackTest(indicationInterval: number): number;

  /**
   * @ignore
   */
  abstract stopAudioDeviceLoopbackTest(): number;

  /**
   * @ignore
   */
  abstract followSystemPlaybackDevice(enable: boolean): number;

  /**
   * @ignore
   */
  abstract followSystemRecordingDevice(enable: boolean): number;

  /**
   * @ignore
   */
  abstract followSystemLoopbackDevice(enable: boolean): number;

  /**
   * @ignore
   */
  abstract release(): void;

  /**
   * @ignore
   */
  abstract getPlaybackDefaultDevice(): AudioDeviceInfo;

  /**
   * @ignore
   */
  abstract getRecordingDefaultDevice(): AudioDeviceInfo;
}
