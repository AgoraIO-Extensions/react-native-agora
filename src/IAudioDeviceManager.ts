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
   * Sets the volume of the in-ear monitor.
   * Users must use wired earphones to hear their own voices.You can call this method either before or after joining a channel.
   *
   * @param volume The volume of the in-ear monitor. The value ranges between 0 and 100. The default value is 100.
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
   * Sets the volume of the in-ear monitor.
   * Users must use wired earphones to hear their own voices.You can call this method either before or after joining a channel.
   *
   * @param volume The volume of the in-ear monitor. The value ranges between 0 and 100. The default value is 100.
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
   * Stops or resumes subscribing to the audio streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.Call this method after joinChannel .When using the spatial audio effect, if you need to set whether to stop subscribing to the audio streams of all remote users, Agora recommends calling this method instead of the muteAllRemoteAudioStreams method in IRtcEngine .After calling this method, you need to call updateSelfPosition and updateRemotePosition to update the spatial location of the local user and the remote user; otherwise, the settings in this method do not take effect.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users:true: Stop subscribing to the audio streams of all remote users.false: Subscribe to the audio streams of all remote users.
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
   * Stops or resumes subscribing to the audio streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.Call this method after joinChannel .When using the spatial audio effect, if you need to set whether to stop subscribing to the audio streams of all remote users, Agora recommends calling this method instead of the muteAllRemoteAudioStreams method in IRtcEngine .After calling this method, you need to call updateSelfPosition and updateRemotePosition to update the spatial location of the local user and the remote user; otherwise, the settings in this method do not take effect.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users:true: Stop subscribing to the audio streams of all remote users.false: Subscribe to the audio streams of all remote users.
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
