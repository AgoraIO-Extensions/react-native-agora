import { AudioDeviceInfo } from './IAgoraRtcEngine';

/*
 * 设备 ID 的最大长度。
 */
export enum MaxDeviceIdLengthType {
  /*
   * 设备 ID 的最大长度为 512 个字符。
   */
  MaxDeviceIdLength = 512,
}

/*
 * TODO(doc)
 */
export abstract class IAudioDeviceManager {
  /*
   * TODO(doc)
   */
  abstract enumeratePlaybackDevices(): AudioDeviceInfo[];

  /*
   * TODO(doc)
   */
  abstract enumerateRecordingDevices(): AudioDeviceInfo[];

  /*
   * TODO(doc)
   */
  abstract setPlaybackDevice(deviceId: string): number;

  /*
   * TODO(doc)
   */
  abstract getPlaybackDevice(): string;

  /*
   * TODO(doc)
   */
  abstract getPlaybackDeviceInfo(): AudioDeviceInfo;

  /*
   * TODO(doc)
   */
  abstract setPlaybackDeviceVolume(volume: number): number;

  /*
   * TODO(doc)
   */
  abstract getPlaybackDeviceVolume(): number;

  /*
   * TODO(doc)
   */
  abstract setRecordingDevice(deviceId: string): number;

  /*
   * TODO(doc)
   */
  abstract getRecordingDevice(): string;

  /*
   * TODO(doc)
   */
  abstract getRecordingDeviceInfo(): AudioDeviceInfo;

  /*
   * TODO(doc)
   */
  abstract setRecordingDeviceVolume(volume: number): number;

  /*
   * TODO(doc)
   */
  abstract getRecordingDeviceVolume(): number;

  /*
   * TODO(doc)
   */
  abstract setPlaybackDeviceMute(mute: boolean): number;

  /*
   * TODO(doc)
   */
  abstract getPlaybackDeviceMute(): boolean;

  /*
   * TODO(doc)
   */
  abstract setRecordingDeviceMute(mute: boolean): number;

  /*
   * TODO(doc)
   */
  abstract getRecordingDeviceMute(): boolean;

  /*
   * TODO(doc)
   */
  abstract startPlaybackDeviceTest(testAudioFilePath: string): number;

  /*
   * TODO(doc)
   */
  abstract stopPlaybackDeviceTest(): number;

  /*
   * TODO(doc)
   */
  abstract startRecordingDeviceTest(indicationInterval: number): number;

  /*
   * 停止音频采集设备测试。
   * 该方法停止音频采集设备测试。调用 后，必须调用该方法停止测试。
   * 该方法需要在加入频道前调用。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract stopRecordingDeviceTest(): number;

  /*
   * TODO(doc)
   */
  abstract startAudioDeviceLoopbackTest(indicationInterval: number): number;

  /*
   * TODO(doc)
   */
  abstract stopAudioDeviceLoopbackTest(): number;

  /*
   * TODO(doc)
   */
  abstract release(): void;
}
