import { callIrisApi } from '../internal/IrisApiEngine';
import { IAudioDeviceManager } from '../IAudioDeviceManager';
import { AudioDeviceInfo } from '../IAgoraRtcEngine';

export class IAudioDeviceManagerImpl implements IAudioDeviceManager {
  enumeratePlaybackDevices(): AudioDeviceInfo[] {
    const apiType = 'AudioDeviceManager_enumeratePlaybackDevices';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enumerateRecordingDevices(): AudioDeviceInfo[] {
    const apiType = 'AudioDeviceManager_enumerateRecordingDevices';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setPlaybackDevice(deviceId: string): number {
    const apiType = 'AudioDeviceManager_setPlaybackDevice';
    const jsonParams = {
      deviceId,
      toJSON: () => {
        return { deviceId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getPlaybackDevice(): string {
    const apiType = 'AudioDeviceManager_getPlaybackDevice';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceId = jsonResults.deviceId;
    return deviceId;
  }

  getPlaybackDeviceInfo(): AudioDeviceInfo {
    const apiType = 'AudioDeviceManager_getPlaybackDeviceInfo';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setPlaybackDeviceVolume(volume: number): number {
    const apiType = 'AudioDeviceManager_setPlaybackDeviceVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getPlaybackDeviceVolume(): number {
    const apiType = 'AudioDeviceManager_getPlaybackDeviceVolume';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const volume = jsonResults.volume;
    return volume;
  }

  setRecordingDevice(deviceId: string): number {
    const apiType = 'AudioDeviceManager_setRecordingDevice';
    const jsonParams = {
      deviceId,
      toJSON: () => {
        return { deviceId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getRecordingDevice(): string {
    const apiType = 'AudioDeviceManager_getRecordingDevice';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceId = jsonResults.deviceId;
    return deviceId;
  }

  getRecordingDeviceInfo(): AudioDeviceInfo {
    const apiType = 'AudioDeviceManager_getRecordingDeviceInfo';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRecordingDeviceVolume(volume: number): number {
    const apiType = 'AudioDeviceManager_setRecordingDeviceVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getRecordingDeviceVolume(): number {
    const apiType = 'AudioDeviceManager_getRecordingDeviceVolume';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const volume = jsonResults.volume;
    return volume;
  }

  setPlaybackDeviceMute(mute: boolean): number {
    const apiType = 'AudioDeviceManager_setPlaybackDeviceMute';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getPlaybackDeviceMute(): boolean {
    const apiType = 'AudioDeviceManager_getPlaybackDeviceMute';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const mute = jsonResults.mute;
    return mute;
  }

  setRecordingDeviceMute(mute: boolean): number {
    const apiType = 'AudioDeviceManager_setRecordingDeviceMute';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getRecordingDeviceMute(): boolean {
    const apiType = 'AudioDeviceManager_getRecordingDeviceMute';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const mute = jsonResults.mute;
    return mute;
  }

  startPlaybackDeviceTest(testAudioFilePath: string): number {
    const apiType = 'AudioDeviceManager_startPlaybackDeviceTest';
    const jsonParams = {
      testAudioFilePath,
      toJSON: () => {
        return { testAudioFilePath };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopPlaybackDeviceTest(): number {
    const apiType = 'AudioDeviceManager_stopPlaybackDeviceTest';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startRecordingDeviceTest(indicationInterval: number): number {
    const apiType = 'AudioDeviceManager_startRecordingDeviceTest';
    const jsonParams = {
      indicationInterval,
      toJSON: () => {
        return { indicationInterval };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopRecordingDeviceTest(): number {
    const apiType = 'AudioDeviceManager_stopRecordingDeviceTest';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startAudioDeviceLoopbackTest(indicationInterval: number): number {
    const apiType = 'AudioDeviceManager_startAudioDeviceLoopbackTest';
    const jsonParams = {
      indicationInterval,
      toJSON: () => {
        return { indicationInterval };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopAudioDeviceLoopbackTest(): number {
    const apiType = 'AudioDeviceManager_stopAudioDeviceLoopbackTest';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  release(): void {
    const apiType = 'AudioDeviceManager_release';
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }
}
