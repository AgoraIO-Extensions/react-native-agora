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
   * Sets the volume of the audio effects.
   * Call this method after the playEffect method.
   *
   * @param volume The playback volume. The value range is [0, 100]. The default value is 100, which represents the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
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
   * Sets the volume of the audio effects.
   * Call this method after the playEffect method.
   *
   * @param volume The playback volume. The value range is [0, 100]. The default value is 100, which represents the original volume.
   *
   * @returns
   * 0: Success.< 0: Failure.
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
   * Stops or resumes publishing the local video stream.
   * A successful call of this method triggers the onUserMuteVideo callback on the remote client.This method executes faster than the enableLocalVideo (false) method, which controls the sending of the local video stream.This method does not affect any ongoing video recording, because it does not disable the camera.
   *
   * @param mute Whether to stop publishing the local video stream.true: Stop publishing the local video stream.false: (Default) Publish the local video stream.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setPlaybackDeviceMute(mute: boolean): number;

  /**
   * @ignore
   */
  abstract getPlaybackDeviceMute(): boolean;

  /**
   * Stops or resumes publishing the local video stream.
   * A successful call of this method triggers the onUserMuteVideo callback on the remote client.This method executes faster than the enableLocalVideo (false) method, which controls the sending of the local video stream.This method does not affect any ongoing video recording, because it does not disable the camera.
   *
   * @param mute Whether to stop publishing the local video stream.true: Stop publishing the local video stream.false: (Default) Publish the local video stream.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRecordingDeviceMute(mute: boolean): number;

  /**
   * @ignore
   */
  abstract getRecordingDeviceMute(): boolean;

  /**
   * @ignore
   */
  abstract startPlaybackDeviceTest(testAudioFilePath: string): number;

  /**
   * @ignore
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
   * Sets whether to delete cached media files automatically.
   * If you enable this function to remove cached media files automatically, when the cached media files exceed either the number or size limit you set, the SDK automatically deletes the least recently used cache file.
   *
   * @param enable Whether to enable the SDK to delete cached media files automatically:true: Delete cached media files automatically.false: (Default) Do not delete cached media files automatically.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract followSystemPlaybackDevice(enable: boolean): number;

  /**
   * Sets whether to delete cached media files automatically.
   * If you enable this function to remove cached media files automatically, when the cached media files exceed either the number or size limit you set, the SDK automatically deletes the least recently used cache file.
   *
   * @param enable Whether to enable the SDK to delete cached media files automatically:true: Delete cached media files automatically.false: (Default) Do not delete cached media files automatically.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract followSystemRecordingDevice(enable: boolean): number;

  /**
   * Sets whether to delete cached media files automatically.
   * If you enable this function to remove cached media files automatically, when the cached media files exceed either the number or size limit you set, the SDK automatically deletes the least recently used cache file.
   *
   * @param enable Whether to enable the SDK to delete cached media files automatically:true: Delete cached media files automatically.false: (Default) Do not delete cached media files automatically.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
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
