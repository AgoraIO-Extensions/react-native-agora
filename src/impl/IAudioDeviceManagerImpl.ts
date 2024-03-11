import { AudioDeviceInfo } from '../AgoraMediaBase';
import { IAudioDeviceManager } from '../IAudioDeviceManager';

// @ts-ignore
export class IAudioDeviceManagerImpl implements IAudioDeviceManager {
  enumeratePlaybackDevices(): AudioDeviceInfo[] {
    const apiType = this.getApiTypeFromEnumeratePlaybackDevices();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnumeratePlaybackDevices(): string {
    return 'AudioDeviceManager_enumeratePlaybackDevices';
  }

  enumerateRecordingDevices(): AudioDeviceInfo[] {
    const apiType = this.getApiTypeFromEnumerateRecordingDevices();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnumerateRecordingDevices(): string {
    return 'AudioDeviceManager_enumerateRecordingDevices';
  }

  setPlaybackDevice(deviceId: string): number {
    const apiType = this.getApiTypeFromSetPlaybackDevice(deviceId);
    const jsonParams = {
      deviceId: deviceId,
      toJSON: () => {
        return {
          deviceId: deviceId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlaybackDevice(deviceId: string): string {
    return 'AudioDeviceManager_setPlaybackDevice';
  }

  getPlaybackDevice(): string {
    const apiType = this.getApiTypeFromGetPlaybackDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceId = jsonResults.deviceId;
    return deviceId;
  }

  protected getApiTypeFromGetPlaybackDevice(): string {
    return 'AudioDeviceManager_getPlaybackDevice';
  }

  getPlaybackDeviceInfo(): AudioDeviceInfo {
    const apiType = this.getApiTypeFromGetPlaybackDeviceInfo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetPlaybackDeviceInfo(): string {
    return 'AudioDeviceManager_getPlaybackDeviceInfo';
  }

  setPlaybackDeviceVolume(volume: number): number {
    const apiType = this.getApiTypeFromSetPlaybackDeviceVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlaybackDeviceVolume(volume: number): string {
    return 'AudioDeviceManager_setPlaybackDeviceVolume';
  }

  getPlaybackDeviceVolume(): number {
    const apiType = this.getApiTypeFromGetPlaybackDeviceVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const volume = jsonResults.volume;
    return volume;
  }

  protected getApiTypeFromGetPlaybackDeviceVolume(): string {
    return 'AudioDeviceManager_getPlaybackDeviceVolume';
  }

  setRecordingDevice(deviceId: string): number {
    const apiType = this.getApiTypeFromSetRecordingDevice(deviceId);
    const jsonParams = {
      deviceId: deviceId,
      toJSON: () => {
        return {
          deviceId: deviceId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRecordingDevice(deviceId: string): string {
    return 'AudioDeviceManager_setRecordingDevice';
  }

  getRecordingDevice(): string {
    const apiType = this.getApiTypeFromGetRecordingDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceId = jsonResults.deviceId;
    return deviceId;
  }

  protected getApiTypeFromGetRecordingDevice(): string {
    return 'AudioDeviceManager_getRecordingDevice';
  }

  getRecordingDeviceInfo(): AudioDeviceInfo {
    const apiType = this.getApiTypeFromGetRecordingDeviceInfo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetRecordingDeviceInfo(): string {
    return 'AudioDeviceManager_getRecordingDeviceInfo';
  }

  setRecordingDeviceVolume(volume: number): number {
    const apiType = this.getApiTypeFromSetRecordingDeviceVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRecordingDeviceVolume(volume: number): string {
    return 'AudioDeviceManager_setRecordingDeviceVolume';
  }

  getRecordingDeviceVolume(): number {
    const apiType = this.getApiTypeFromGetRecordingDeviceVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const volume = jsonResults.volume;
    return volume;
  }

  protected getApiTypeFromGetRecordingDeviceVolume(): string {
    return 'AudioDeviceManager_getRecordingDeviceVolume';
  }

  setLoopbackDevice(deviceId: string): number {
    const apiType = this.getApiTypeFromSetLoopbackDevice(deviceId);
    const jsonParams = {
      deviceId: deviceId,
      toJSON: () => {
        return {
          deviceId: deviceId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLoopbackDevice(deviceId: string): string {
    return 'AudioDeviceManager_setLoopbackDevice';
  }

  getLoopbackDevice(): string {
    const apiType = this.getApiTypeFromGetLoopbackDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceId = jsonResults.deviceId;
    return deviceId;
  }

  protected getApiTypeFromGetLoopbackDevice(): string {
    return 'AudioDeviceManager_getLoopbackDevice';
  }

  setPlaybackDeviceMute(mute: boolean): number {
    const apiType = this.getApiTypeFromSetPlaybackDeviceMute(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlaybackDeviceMute(mute: boolean): string {
    return 'AudioDeviceManager_setPlaybackDeviceMute';
  }

  getPlaybackDeviceMute(): boolean {
    const apiType = this.getApiTypeFromGetPlaybackDeviceMute();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const mute = jsonResults.mute;
    return mute;
  }

  protected getApiTypeFromGetPlaybackDeviceMute(): string {
    return 'AudioDeviceManager_getPlaybackDeviceMute';
  }

  setRecordingDeviceMute(mute: boolean): number {
    const apiType = this.getApiTypeFromSetRecordingDeviceMute(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRecordingDeviceMute(mute: boolean): string {
    return 'AudioDeviceManager_setRecordingDeviceMute';
  }

  getRecordingDeviceMute(): boolean {
    const apiType = this.getApiTypeFromGetRecordingDeviceMute();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const mute = jsonResults.mute;
    return mute;
  }

  protected getApiTypeFromGetRecordingDeviceMute(): string {
    return 'AudioDeviceManager_getRecordingDeviceMute';
  }

  startPlaybackDeviceTest(testAudioFilePath: string): number {
    const apiType =
      this.getApiTypeFromStartPlaybackDeviceTest(testAudioFilePath);
    const jsonParams = {
      testAudioFilePath: testAudioFilePath,
      toJSON: () => {
        return {
          testAudioFilePath: testAudioFilePath,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartPlaybackDeviceTest(
    testAudioFilePath: string
  ): string {
    return 'AudioDeviceManager_startPlaybackDeviceTest';
  }

  stopPlaybackDeviceTest(): number {
    const apiType = this.getApiTypeFromStopPlaybackDeviceTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopPlaybackDeviceTest(): string {
    return 'AudioDeviceManager_stopPlaybackDeviceTest';
  }

  startRecordingDeviceTest(indicationInterval: number): number {
    const apiType =
      this.getApiTypeFromStartRecordingDeviceTest(indicationInterval);
    const jsonParams = {
      indicationInterval: indicationInterval,
      toJSON: () => {
        return {
          indicationInterval: indicationInterval,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartRecordingDeviceTest(
    indicationInterval: number
  ): string {
    return 'AudioDeviceManager_startRecordingDeviceTest';
  }

  stopRecordingDeviceTest(): number {
    const apiType = this.getApiTypeFromStopRecordingDeviceTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopRecordingDeviceTest(): string {
    return 'AudioDeviceManager_stopRecordingDeviceTest';
  }

  startAudioDeviceLoopbackTest(indicationInterval: number): number {
    const apiType =
      this.getApiTypeFromStartAudioDeviceLoopbackTest(indicationInterval);
    const jsonParams = {
      indicationInterval: indicationInterval,
      toJSON: () => {
        return {
          indicationInterval: indicationInterval,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartAudioDeviceLoopbackTest(
    indicationInterval: number
  ): string {
    return 'AudioDeviceManager_startAudioDeviceLoopbackTest';
  }

  stopAudioDeviceLoopbackTest(): number {
    const apiType = this.getApiTypeFromStopAudioDeviceLoopbackTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopAudioDeviceLoopbackTest(): string {
    return 'AudioDeviceManager_stopAudioDeviceLoopbackTest';
  }

  followSystemPlaybackDevice(enable: boolean): number {
    const apiType = this.getApiTypeFromFollowSystemPlaybackDevice(enable);
    const jsonParams = {
      enable: enable,
      toJSON: () => {
        return {
          enable: enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromFollowSystemPlaybackDevice(enable: boolean): string {
    return 'AudioDeviceManager_followSystemPlaybackDevice';
  }

  followSystemRecordingDevice(enable: boolean): number {
    const apiType = this.getApiTypeFromFollowSystemRecordingDevice(enable);
    const jsonParams = {
      enable: enable,
      toJSON: () => {
        return {
          enable: enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromFollowSystemRecordingDevice(enable: boolean): string {
    return 'AudioDeviceManager_followSystemRecordingDevice';
  }

  followSystemLoopbackDevice(enable: boolean): number {
    const apiType = this.getApiTypeFromFollowSystemLoopbackDevice(enable);
    const jsonParams = {
      enable: enable,
      toJSON: () => {
        return {
          enable: enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromFollowSystemLoopbackDevice(enable: boolean): string {
    return 'AudioDeviceManager_followSystemLoopbackDevice';
  }

  release(): void {
    const apiType = this.getApiTypeFromRelease();
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(): string {
    return 'AudioDeviceManager_release';
  }

  getPlaybackDefaultDevice(): AudioDeviceInfo {
    const apiType = this.getApiTypeFromGetPlaybackDefaultDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetPlaybackDefaultDevice(): string {
    return 'AudioDeviceManager_getPlaybackDefaultDevice';
  }

  getRecordingDefaultDevice(): AudioDeviceInfo {
    const apiType = this.getApiTypeFromGetRecordingDefaultDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetRecordingDefaultDevice(): string {
    return 'AudioDeviceManager_getRecordingDefaultDevice';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
