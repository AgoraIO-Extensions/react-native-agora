import { RtcConnection } from '../IAgoraRtcEngineEx';
import {
  RemoteVoicePositionInfo,
  SpatialAudioZone,
} from '../IAgoraSpatialAudio';

export class LocalSpatialAudioEngineInternal extends ILocalSpatialAudioEngineImpl {
  protected override getApiTypeFromRelease(): string {
    return 'LocalSpatialAudioEngine_release';
  }

  protected override getApiTypeFromSetMaxAudioRecvCount(
    maxCount: number
  ): string {
    return 'LocalSpatialAudioEngine_setMaxAudioRecvCount';
  }

  protected override getApiTypeFromSetAudioRecvRange(range: number): string {
    return 'LocalSpatialAudioEngine_setAudioRecvRange';
  }

  protected override getApiTypeFromSetDistanceUnit(unit: number): string {
    return 'LocalSpatialAudioEngine_setDistanceUnit';
  }

  protected override getApiTypeFromUpdateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): string {
    return 'LocalSpatialAudioEngine_updateSelfPosition';
  }

  protected override getApiTypeFromUpdateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): string {
    return 'LocalSpatialAudioEngine_updateSelfPositionEx';
  }

  protected override getApiTypeFromUpdatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): string {
    return 'LocalSpatialAudioEngine_updatePlayerPositionInfo';
  }

  protected override getApiTypeFromSetParameters(params: string): string {
    return 'LocalSpatialAudioEngine_setParameters';
  }

  protected override getApiTypeFromMuteLocalAudioStream(mute: boolean): string {
    return 'LocalSpatialAudioEngine_muteLocalAudioStream';
  }

  protected override getApiTypeFromMuteAllRemoteAudioStreams(
    mute: boolean
  ): string {
    return 'LocalSpatialAudioEngine_muteAllRemoteAudioStreams';
  }

  protected override getApiTypeFromSetZones(
    zones: SpatialAudioZone[],
    zoneCount: number
  ): string {
    return 'LocalSpatialAudioEngine_setZones';
  }

  protected override getApiTypeFromSetPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): string {
    return 'LocalSpatialAudioEngine_setPlayerAttenuation';
  }

  protected override getApiTypeFromMuteRemoteAudioStream(
    uid: number,
    mute: boolean
  ): string {
    return 'LocalSpatialAudioEngine_muteRemoteAudioStream';
  }
}

import { ILocalSpatialAudioEngineImpl } from '../impl/IAgoraSpatialAudioImpl';
