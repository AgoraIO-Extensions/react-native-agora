import { RtcConnection } from '../IAgoraRtcEngineEx';
import {
  IBaseSpatialAudioEngine,
  ILocalSpatialAudioEngine,
  RemoteVoicePositionInfo,
  SpatialAudioZone,
} from '../IAgoraSpatialAudio';

// @ts-ignore
export class IBaseSpatialAudioEngineImpl implements IBaseSpatialAudioEngine {
  release(): void {
    const apiType = this.getApiTypeFromRelease();
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(): string {
    return 'BaseSpatialAudioEngine_release';
  }

  setMaxAudioRecvCount(maxCount: number): number {
    const apiType = this.getApiTypeFromSetMaxAudioRecvCount(maxCount);
    const jsonParams = {
      maxCount: maxCount,
      toJSON: () => {
        return {
          maxCount: maxCount,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetMaxAudioRecvCount(maxCount: number): string {
    return 'BaseSpatialAudioEngine_setMaxAudioRecvCount';
  }

  setAudioRecvRange(range: number): number {
    const apiType = this.getApiTypeFromSetAudioRecvRange(range);
    const jsonParams = {
      range: range,
      toJSON: () => {
        return {
          range: range,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioRecvRange(range: number): string {
    return 'BaseSpatialAudioEngine_setAudioRecvRange';
  }

  setDistanceUnit(unit: number): number {
    const apiType = this.getApiTypeFromSetDistanceUnit(unit);
    const jsonParams = {
      unit: unit,
      toJSON: () => {
        return {
          unit: unit,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDistanceUnit(unit: number): string {
    return 'BaseSpatialAudioEngine_setDistanceUnit';
  }

  updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number {
    const apiType = this.getApiTypeFromUpdateSelfPosition(
      position,
      axisForward,
      axisRight,
      axisUp
    );
    const jsonParams = {
      position: position,
      axisForward: axisForward,
      axisRight: axisRight,
      axisUp: axisUp,
      toJSON: () => {
        return {
          position: position,
          axisForward: axisForward,
          axisRight: axisRight,
          axisUp: axisUp,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): string {
    return 'BaseSpatialAudioEngine_updateSelfPosition';
  }

  updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): RtcConnection {
    const apiType = this.getApiTypeFromUpdateSelfPositionEx(
      position,
      axisForward,
      axisRight,
      axisUp
    );
    const jsonParams = {
      position: position,
      axisForward: axisForward,
      axisRight: axisRight,
      axisUp: axisUp,
      toJSON: () => {
        return {
          position: position,
          axisForward: axisForward,
          axisRight: axisRight,
          axisUp: axisUp,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromUpdateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): string {
    return 'BaseSpatialAudioEngine_updateSelfPositionEx';
  }

  updatePlayerPositionInfo(playerId: number): RemoteVoicePositionInfo {
    const apiType = this.getApiTypeFromUpdatePlayerPositionInfo(playerId);
    const jsonParams = {
      playerId: playerId,
      toJSON: () => {
        return {
          playerId: playerId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const positionInfo = jsonResults.positionInfo;
    return positionInfo;
  }

  protected getApiTypeFromUpdatePlayerPositionInfo(playerId: number): string {
    return 'BaseSpatialAudioEngine_updatePlayerPositionInfo';
  }

  setParameters(): string {
    const apiType = this.getApiTypeFromSetParameters();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const params = jsonResults.params;
    return params;
  }

  protected getApiTypeFromSetParameters(): string {
    return 'BaseSpatialAudioEngine_setParameters';
  }

  muteLocalAudioStream(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteLocalAudioStream(mute);
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

  protected getApiTypeFromMuteLocalAudioStream(mute: boolean): string {
    return 'BaseSpatialAudioEngine_muteLocalAudioStream';
  }

  muteAllRemoteAudioStreams(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteAllRemoteAudioStreams(mute);
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

  protected getApiTypeFromMuteAllRemoteAudioStreams(mute: boolean): string {
    return 'BaseSpatialAudioEngine_muteAllRemoteAudioStreams';
  }

  setZones(zones: SpatialAudioZone[], zoneCount: number): number {
    const apiType = this.getApiTypeFromSetZones(zones, zoneCount);
    const jsonParams = {
      zones: zones,
      zoneCount: zoneCount,
      toJSON: () => {
        return {
          zones: zones,
          zoneCount: zoneCount,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetZones(
    zones: SpatialAudioZone[],
    zoneCount: number
  ): string {
    return 'BaseSpatialAudioEngine_setZones';
  }

  setPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): number {
    const apiType = this.getApiTypeFromSetPlayerAttenuation(
      playerId,
      attenuation,
      forceSet
    );
    const jsonParams = {
      playerId: playerId,
      attenuation: attenuation,
      forceSet: forceSet,
      toJSON: () => {
        return {
          playerId: playerId,
          attenuation: attenuation,
          forceSet: forceSet,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): string {
    return 'BaseSpatialAudioEngine_setPlayerAttenuation';
  }

  muteRemoteAudioStream(uid: number, mute: boolean): number {
    const apiType = this.getApiTypeFromMuteRemoteAudioStream(uid, mute);
    const jsonParams = {
      uid: uid,
      mute: mute,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRemoteAudioStream(
    uid: number,
    mute: boolean
  ): string {
    return 'BaseSpatialAudioEngine_muteRemoteAudioStream';
  }
}

// @ts-ignore
export class ILocalSpatialAudioEngineImpl
  extends IBaseSpatialAudioEngineImpl
  implements ILocalSpatialAudioEngine
{
  initialize(): number {
    const apiType = this.getApiTypeFromInitialize();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromInitialize(): string {
    return 'LocalSpatialAudioEngine_initialize';
  }

  updateRemotePosition(uid: number): RemoteVoicePositionInfo {
    const apiType = this.getApiTypeFromUpdateRemotePosition(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const posInfo = jsonResults.posInfo;
    return posInfo;
  }

  protected getApiTypeFromUpdateRemotePosition(uid: number): string {
    return 'LocalSpatialAudioEngine_updateRemotePosition';
  }

  updateRemotePositionEx(uid: number): {
    posInfo: RemoteVoicePositionInfo;
    connection: RtcConnection;
  } {
    const apiType = this.getApiTypeFromUpdateRemotePositionEx(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const posInfo = jsonResults.posInfo;
    const connection = jsonResults.connection;
    return {
      posInfo,
      connection,
    };
  }

  protected getApiTypeFromUpdateRemotePositionEx(uid: number): string {
    return 'LocalSpatialAudioEngine_updateRemotePositionEx';
  }

  removeRemotePosition(uid: number): number {
    const apiType = this.getApiTypeFromRemoveRemotePosition(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRemoveRemotePosition(uid: number): string {
    return 'LocalSpatialAudioEngine_removeRemotePosition';
  }

  removeRemotePositionEx(uid: number): RtcConnection {
    const apiType = this.getApiTypeFromRemoveRemotePositionEx(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromRemoveRemotePositionEx(uid: number): string {
    return 'LocalSpatialAudioEngine_removeRemotePositionEx';
  }

  clearRemotePositions(): number {
    const apiType = this.getApiTypeFromClearRemotePositions();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromClearRemotePositions(): string {
    return 'LocalSpatialAudioEngine_clearRemotePositions';
  }

  clearRemotePositionsEx(): RtcConnection {
    const apiType = this.getApiTypeFromClearRemotePositionsEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const connection = jsonResults.connection;
    return connection;
  }

  protected getApiTypeFromClearRemotePositionsEx(): string {
    return 'LocalSpatialAudioEngine_clearRemotePositionsEx';
  }

  setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): number {
    const apiType = this.getApiTypeFromSetRemoteAudioAttenuation(
      uid,
      attenuation,
      forceSet
    );
    const jsonParams = {
      uid: uid,
      attenuation: attenuation,
      forceSet: forceSet,
      toJSON: () => {
        return {
          uid: uid,
          attenuation: attenuation,
          forceSet: forceSet,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): string {
    return 'LocalSpatialAudioEngine_setRemoteAudioAttenuation';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
