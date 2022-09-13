import { callIrisApi } from '../internal/IrisApiEngine';
import {
  IBaseSpatialAudioEngine,
  RemoteVoicePositionInfo,
  ILocalSpatialAudioEngine,
} from '../IAgoraSpatialAudio';
import { RtcConnection } from '../IAgoraRtcEngineEx';
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
    return 'BaseSpatialAudioEngine_updateSelfPositionEx';
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
    return 'BaseSpatialAudioEngine_updatePlayerPositionInfo';
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
}

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
    return 'LocalSpatialAudioEngine_updateRemotePosition';
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
    return 'LocalSpatialAudioEngine_clearRemotePositionsEx';
  }
}
