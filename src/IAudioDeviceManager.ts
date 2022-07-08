import { AudioDeviceInfo } from './IAgoraRtcEngine';

/*
 * The maximum length of the device ID.
 */
export enum MaxDeviceIdLengthType {
  /*
   * The maximum length of the device ID is 512 bytes.
   */
  MaxDeviceIdLength = 512,
}

/*
 * @ignore
 */
export abstract class IAudioDeviceManager {
  /* api_iaudiodevicemanager_enumerateplaybackdevices */
  abstract enumeratePlaybackDevices(): AudioDeviceInfo[];

  /* api_iaudiodevicemanager_enumeraterecordingdevices */
  abstract enumerateRecordingDevices(): AudioDeviceInfo[];

  /* api_iaudiodevicemanager_setplaybackdevice */
  abstract setPlaybackDevice(deviceId: string): number;

  /* api_iaudiodevicemanager_getplaybackdevice */
  abstract getPlaybackDevice(): string;

  /* api_iaudiodevicemanager_getplaybackdeviceinfo */
  abstract getPlaybackDeviceInfo(): AudioDeviceInfo;

  /* api_iaudiodevicemanager_setplaybackdevicevolume */
  abstract setPlaybackDeviceVolume(volume: number): number;

  /* api_iaudiodevicemanager_getplaybackdevicevolume */
  abstract getPlaybackDeviceVolume(): number;

  /* api_iaudiodevicemanager_setrecordingdevice */
  abstract setRecordingDevice(deviceId: string): number;

  /* api_iaudiodevicemanager_getrecordingdevice */
  abstract getRecordingDevice(): string;

  /* api_iaudiodevicemanager_getrecordingdeviceinfo */
  abstract getRecordingDeviceInfo(): AudioDeviceInfo;

  /* api_iaudiodevicemanager_setrecordingdevicevolume */
  abstract setRecordingDeviceVolume(volume: number): number;

  /* api_iaudiodevicemanager_getrecordingdevicevolume */
  abstract getRecordingDeviceVolume(): number;

  /* api_iaudiodevicemanager_setplaybackdevicemute */
  abstract setPlaybackDeviceMute(mute: boolean): number;

  /* api_iaudiodevicemanager_getplaybackdevicemute */
  abstract getPlaybackDeviceMute(): boolean;

  /* api_iaudiodevicemanager_setrecordingdevicemute */
  abstract setRecordingDeviceMute(mute: boolean): number;

  /* api_iaudiodevicemanager_getrecordingdevicemute */
  abstract getRecordingDeviceMute(): boolean;

  /* api_iaudiodevicemanager_startplaybackdevicetest */
  abstract startPlaybackDeviceTest(testAudioFilePath: string): number;

  /* api_iaudiodevicemanager_stopplaybackdevicetest */
  abstract stopPlaybackDeviceTest(): number;

  /* api_iaudiodevicemanager_startrecordingdevicetest */
  abstract startRecordingDeviceTest(indicationInterval: number): number;

  /* api_iaudiodevicemanager_stoprecordingdevicetest */
  abstract stopRecordingDeviceTest(): number;

  /* api_iaudiodevicemanager_startaudiodeviceloopbacktest */
  abstract startAudioDeviceLoopbackTest(indicationInterval: number): number;

  /* api_iaudiodevicemanager_stopaudiodeviceloopbacktest */
  abstract stopAudioDeviceLoopbackTest(): number;

  /* api_iaudiodevicemanager_release */
  abstract release(): void;
}
