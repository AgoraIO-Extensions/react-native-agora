import { RtcConnection } from '../IAgoraRtcEngineEx';
import {
  ILocalSpatialAudioEngine,
  RemoteVoicePositionInfo,
  SpatialAudioZone,
} from '../IAgoraSpatialAudio';
import { callIrisApi } from '../internal/call';

// @ts-ignore
export class ILocalSpatialAudioEngineImpl implements ILocalSpatialAudioEngine {
  release(): void {
    const apiType = this.getApiTypeFromRelease();
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(): string {
    return 'LocalSpatialAudioEngine_release';
  }

  initialize(): number {
    const apiType = this.getApiTypeFromInitialize();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromInitialize(): string {
    return 'LocalSpatialAudioEngine_initialize_cf94fbf';
  }

  updateRemotePosition(uid: number, posInfo: RemoteVoicePositionInfo): number {
    const apiType = this.getApiTypeFromUpdateRemotePosition(uid, posInfo);
    const jsonParams = {
      uid: uid,
      posInfo: posInfo,
      toJSON: () => {
        return {
          uid: uid,
          posInfo: posInfo,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): string {
    return 'LocalSpatialAudioEngine_updateRemotePosition_adc0909';
  }

  updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromUpdateRemotePositionEx(
      uid,
      posInfo,
      connection
    );
    const jsonParams = {
      uid: uid,
      posInfo: posInfo,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          posInfo: posInfo,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): string {
    return 'LocalSpatialAudioEngine_updateRemotePositionEx_f0252d9';
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
    return 'LocalSpatialAudioEngine_removeRemotePosition_c8d091a';
  }

  removeRemotePositionEx(uid: number, connection: RtcConnection): number {
    const apiType = this.getApiTypeFromRemoveRemotePositionEx(uid, connection);
    const jsonParams = {
      uid: uid,
      connection: connection,
      toJSON: () => {
        return {
          uid: uid,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRemoveRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): string {
    return 'LocalSpatialAudioEngine_removeRemotePositionEx_58a9850';
  }

  clearRemotePositionsEx(connection: RtcConnection): number {
    const apiType = this.getApiTypeFromClearRemotePositionsEx(connection);
    const jsonParams = {
      connection: connection,
      toJSON: () => {
        return {
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromClearRemotePositionsEx(
    connection: RtcConnection
  ): string {
    return 'LocalSpatialAudioEngine_clearRemotePositionsEx_c81e1a4';
  }

  updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number {
    const apiType = this.getApiTypeFromUpdateSelfPositionEx(
      position,
      axisForward,
      axisRight,
      axisUp,
      connection
    );
    const jsonParams = {
      position: position,
      axisForward: axisForward,
      axisRight: axisRight,
      axisUp: axisUp,
      connection: connection,
      toJSON: () => {
        return {
          position: position,
          axisForward: axisForward,
          axisRight: axisRight,
          axisUp: axisUp,
          connection: connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): string {
    return 'LocalSpatialAudioEngine_updateSelfPositionEx_502183a';
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
    return 'LocalSpatialAudioEngine_setMaxAudioRecvCount_46f8ab7';
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
    return 'LocalSpatialAudioEngine_setAudioRecvRange_685e803';
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
    return 'LocalSpatialAudioEngine_setDistanceUnit_685e803';
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
    return 'LocalSpatialAudioEngine_updateSelfPosition_9c9930f';
  }

  updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number {
    const apiType = this.getApiTypeFromUpdatePlayerPositionInfo(
      playerId,
      positionInfo
    );
    const jsonParams = {
      playerId: playerId,
      positionInfo: positionInfo,
      toJSON: () => {
        return {
          playerId: playerId,
          positionInfo: positionInfo,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUpdatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): string {
    return 'LocalSpatialAudioEngine_updatePlayerPositionInfo_b37c59d';
  }

  setParameters(params: string): number {
    const apiType = this.getApiTypeFromSetParameters(params);
    const jsonParams = {
      params: params,
      toJSON: () => {
        return {
          params: params,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetParameters(params: string): string {
    return 'LocalSpatialAudioEngine_setParameters_3a2037f';
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
    return 'LocalSpatialAudioEngine_muteLocalAudioStream_5039d15';
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
    return 'LocalSpatialAudioEngine_muteAllRemoteAudioStreams_5039d15';
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
    return 'LocalSpatialAudioEngine_muteRemoteAudioStream_dbdc15a';
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
    return 'LocalSpatialAudioEngine_setRemoteAudioAttenuation_74c3e98';
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
    return 'LocalSpatialAudioEngine_setZones_414a27e';
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
    return 'LocalSpatialAudioEngine_setPlayerAttenuation_a15bc51';
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
}
