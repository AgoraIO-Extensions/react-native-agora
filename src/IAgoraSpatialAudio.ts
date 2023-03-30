import './extension/IAgoraSpatialAudioExtension';
import { RtcConnection } from './IAgoraRtcEngineEx';
/* class_remotevoicepositioninfo */
export class RemoteVoicePositionInfo {
  /* class_remotevoicepositioninfo_position */
  position?: number[];
  /* class_remotevoicepositioninfo_forward */
  forward?: number[];
}

/* class_spatialaudiozone */
export class SpatialAudioZone {
  /* class_spatialaudiozone_zoneSetId */
  zoneSetId?: number;
  /* class_spatialaudiozone_position */
  position?: number[];
  /* class_spatialaudiozone_forward */
  forward?: number[];
  /* class_spatialaudiozone_right */
  right?: number[];
  /* class_spatialaudiozone_up */
  up?: number[];
  /* class_spatialaudiozone_forwardLength */
  forwardLength?: number;
  /* class_spatialaudiozone_rightLength */
  rightLength?: number;
  /* class_spatialaudiozone_upLength */
  upLength?: number;
  /* class_spatialaudiozone_audioAttenuation */
  audioAttenuation?: number;
}

/* class_ibasespatialaudioengine */
export abstract class IBaseSpatialAudioEngine {
  /* api_ibasespatialaudioengine_release */
  abstract release(): void;

  /* api_ibasespatialaudioengine_setmaxaudiorecvcount */
  abstract setMaxAudioRecvCount(maxCount: number): number;

  /* api_ibasespatialaudioengine_setaudiorecvrange */
  abstract setAudioRecvRange(range: number): number;

  /* api_ibasespatialaudioengine_setdistanceunit */
  abstract setDistanceUnit(unit: number): number;

  /* api_ibasespatialaudioengine_updateselfposition */
  abstract updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number;

  /* api_ibasespatialaudioengine_updateselfpositionex */
  abstract updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number;

  /* api_ibasespatialaudioengine_updateplayerpositioninfo */
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /* api_ibasespatialaudioengine_setparameters */
  abstract setParameters(params: string): number;

  /* api_ibasespatialaudioengine_mutelocalaudiostream */
  abstract muteLocalAudioStream(mute: boolean): number;

  /* api_ibasespatialaudioengine_muteallremoteaudiostreams */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /* api_ibasespatialaudioengine_setzones */
  abstract setZones(zones: SpatialAudioZone[], zoneCount: number): number;

  /* api_ibasespatialaudioengine_setplayerattenuation */
  abstract setPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): number;

  /* api_ibasespatialaudioengine_muteremoteaudiostream */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;
}

/* class_ilocalspatialaudioengine */
export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /* api_ilocalspatialaudioengine_initialize */
  abstract initialize(): number;

  /* api_ilocalspatialaudioengine_updateremoteposition */
  abstract updateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): number;

  /* api_ilocalspatialaudioengine_updateremotepositionex */
  abstract updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number;

  /* api_ilocalspatialaudioengine_removeremoteposition */
  abstract removeRemotePosition(uid: number): number;

  /* api_ilocalspatialaudioengine_removeremotepositionex */
  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

  /* api_ilocalspatialaudioengine_clearremotepositions */
  abstract clearRemotePositions(): number;

  /* api_ilocalspatialaudioengine_clearremotepositionsex */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;

  /* api_ilocalspatialaudioengine_setremoteaudioattenuation */
  abstract setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): number;
}
