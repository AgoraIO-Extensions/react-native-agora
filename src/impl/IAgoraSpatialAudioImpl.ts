import { callIrisApi } from '../internal/IrisApiEngine';
import {
  ICloudSpatialAudioEventHandler,
  IBaseSpatialAudioEngine,
  RemoteVoicePositionInfo,
  ICloudSpatialAudioEngine,
  CloudSpatialAudioConfig,
  AudioRangeModeType,
  ILocalSpatialAudioEngine,
  LocalSpatialAudioConfig,
} from '../IAgoraSpatialAudio';
import { RtcConnection } from '../IAgoraRtcEngineEx';

export function processICloudSpatialAudioEventHandler(
  handler: ICloudSpatialAudioEventHandler,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onTokenWillExpire':
      if (handler.onTokenWillExpire !== undefined) {
        handler.onTokenWillExpire();
      }
      break;

    case 'onConnectionStateChange':
      if (handler.onConnectionStateChange !== undefined) {
        handler.onConnectionStateChange(jsonParams.state, jsonParams.reason);
      }
      break;

    case 'onTeammateLeft':
      if (handler.onTeammateLeft !== undefined) {
        handler.onTeammateLeft(jsonParams.uid);
      }
      break;

    case 'onTeammateJoined':
      if (handler.onTeammateJoined !== undefined) {
        handler.onTeammateJoined(jsonParams.uid);
      }
      break;
  }
}

export class IBaseSpatialAudioEngineImpl implements IBaseSpatialAudioEngine {
  release(): void {
    const apiType = 'BaseSpatialAudioEngine_release';
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  setMaxAudioRecvCount(maxCount: number): number {
    const apiType = 'BaseSpatialAudioEngine_setMaxAudioRecvCount';
    const jsonParams = {
      maxCount,
      toJSON: () => {
        return { maxCount };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioRecvRange(range: number): number {
    const apiType = 'BaseSpatialAudioEngine_setAudioRecvRange';
    const jsonParams = {
      range,
      toJSON: () => {
        return { range };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDistanceUnit(unit: number): number {
    const apiType = 'BaseSpatialAudioEngine_setDistanceUnit';
    const jsonParams = {
      unit,
      toJSON: () => {
        return { unit };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number {
    const apiType = 'BaseSpatialAudioEngine_updateSelfPosition';
    const jsonParams = {
      position,
      axisForward,
      axisRight,
      axisUp,
      toJSON: () => {
        return {
          position,
          axisForward,
          axisRight,
          axisUp,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number {
    const apiType = 'BaseSpatialAudioEngine_updateSelfPositionEx';
    const jsonParams = {
      position,
      axisForward,
      axisRight,
      axisUp,
      connection,
      toJSON: () => {
        return {
          position,
          axisForward,
          axisRight,
          axisUp,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number {
    const apiType = 'BaseSpatialAudioEngine_updatePlayerPositionInfo';
    const jsonParams = {
      playerId,
      positionInfo,
      toJSON: () => {
        return {
          playerId,
          positionInfo,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setParameters(params: string): number {
    const apiType = 'BaseSpatialAudioEngine_setParameters';
    const jsonParams = {
      params,
      toJSON: () => {
        return { params };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteLocalAudioStream(mute: boolean): number {
    const apiType = 'BaseSpatialAudioEngine_muteLocalAudioStream';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteAllRemoteAudioStreams(mute: boolean): number {
    const apiType = 'BaseSpatialAudioEngine_muteAllRemoteAudioStreams';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }
}

export class ICloudSpatialAudioEngineImpl
  extends IBaseSpatialAudioEngineImpl
  implements ICloudSpatialAudioEngine
{
  initialize(config: CloudSpatialAudioConfig): number {
    const apiType = 'CloudSpatialAudioEngine_initialize';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  addEventHandler(eventHandler: ICloudSpatialAudioEventHandler): number {
    const apiType = 'CloudSpatialAudioEngine_addEventHandler';
    const jsonParams = {
      eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  removeEventHandler(eventHandler: ICloudSpatialAudioEventHandler): number {
    const apiType = 'CloudSpatialAudioEngine_removeEventHandler';
    const jsonParams = {
      eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableSpatializer(enable: boolean, applyToTeam: boolean): number {
    const apiType = 'CloudSpatialAudioEngine_enableSpatializer';
    const jsonParams = {
      enable,
      applyToTeam,
      toJSON: () => {
        return {
          enable,
          applyToTeam,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setTeamId(teamId: number): number {
    const apiType = 'CloudSpatialAudioEngine_setTeamId';
    const jsonParams = {
      teamId,
      toJSON: () => {
        return { teamId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioRangeMode(rangeMode: AudioRangeModeType): number {
    const apiType = 'CloudSpatialAudioEngine_setAudioRangeMode';
    const jsonParams = {
      rangeMode,
      toJSON: () => {
        return { rangeMode };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enterRoom(token: string, roomName: string, uid: number): number {
    const apiType = 'CloudSpatialAudioEngine_enterRoom';
    const jsonParams = {
      token,
      roomName,
      uid,
      toJSON: () => {
        return {
          token,
          roomName,
          uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  renewToken(token: string): number {
    const apiType = 'CloudSpatialAudioEngine_renewToken';
    const jsonParams = {
      token,
      toJSON: () => {
        return { token };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  exitRoom(): number {
    const apiType = 'CloudSpatialAudioEngine_exitRoom';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getTeammates(uids: number[]): number {
    const apiType = 'CloudSpatialAudioEngine_getTeammates';
    const jsonParams = {
      uids,
      toJSON: () => {
        return { uids };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userCount = jsonResults.userCount;
    return userCount;
  }
}

export class ILocalSpatialAudioEngineImpl
  extends IBaseSpatialAudioEngineImpl
  implements ILocalSpatialAudioEngine
{
  initialize(config: LocalSpatialAudioConfig): number {
    const apiType = 'LocalSpatialAudioEngine_initialize';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateRemotePosition(uid: number, posInfo: RemoteVoicePositionInfo): number {
    const apiType = 'LocalSpatialAudioEngine_updateRemotePosition';
    const jsonParams = {
      uid,
      posInfo,
      toJSON: () => {
        return {
          uid,
          posInfo,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number {
    const apiType = 'LocalSpatialAudioEngine_updateRemotePositionEx';
    const jsonParams = {
      uid,
      posInfo,
      connection,
      toJSON: () => {
        return {
          uid,
          posInfo,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  removeRemotePosition(uid: number): number {
    const apiType = 'LocalSpatialAudioEngine_removeRemotePosition';
    const jsonParams = {
      uid,
      toJSON: () => {
        return { uid };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  removeRemotePositionEx(uid: number, connection: RtcConnection): number {
    const apiType = 'LocalSpatialAudioEngine_removeRemotePositionEx';
    const jsonParams = {
      uid,
      connection,
      toJSON: () => {
        return {
          uid,
          connection,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  clearRemotePositions(): number {
    const apiType = 'LocalSpatialAudioEngine_clearRemotePositions';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  clearRemotePositionsEx(connection: RtcConnection): number {
    const apiType = 'LocalSpatialAudioEngine_clearRemotePositionsEx';
    const jsonParams = {
      connection,
      toJSON: () => {
        return { connection };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }
}
