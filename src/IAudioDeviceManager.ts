import './extension/IAudioDeviceManagerExtension';
import { AudioDeviceInfo } from './IAgoraRtcEngine';

/**
 * Maximum length of device ID.
 */
export enum MaxDeviceIdLengthType {
  /**
   * The maximum length of the device ID is 512 characters.
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
   * This method tests whether the local audio playback device is working properly. After the test starts, the SDK plays the specified audio file. If the tester hears the sound, it indicates the playback device is functioning correctly.
   * After calling this method, the SDK triggers the onAudioVolumeIndication callback every 100 ms, reporting uid = 1 and the volume information of the playback device.
   * The difference between this method and startEchoTest is that this method checks whether the local audio playback device works properly, while the latter checks whether the audio/video devices and network are functioning properly. You must call this method before joining a channel. After the test is complete, if you need to join a channel, make sure to call stopPlaybackDeviceTest to stop the device test.
   *
   * @param testAudioFilePath The absolute path of the audio file. The path string must be in UTF-8 encoding.
   *  Supported file formats: wav, mp3, m4a, aac.
   *  Supported sampling rates: 8000, 16000, 32000, 44100, 48000.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startPlaybackDeviceTest(testAudioFilePath: string): number;

  /**
   * Stops the audio playback device test.
   *
   * This method stops the audio playback device test. After calling startPlaybackDeviceTest, you must call this method to stop the test. You must call this method before joining a channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
