import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcConnection } from './IAgoraRtcEngineEx';

export enum SaeConnectionStateType {
  SaeConnectionStateConnecting = 0,
  SaeConnectionStateConnected = 1,
  SaeConnectionStateDisconnected = 2,
  SaeConnectionStateReconnecting = 3,
  SaeConnectionStateReconnected = 4,
}

export enum SaeConnectionChangedReasonType {
  SaeConnectionChangedDefault = 0,
  SaeConnectionChangedConnecting = 1,
  SaeConnectionChangedCreateRoomFail = 2,
  SaeConnectionChangedRtmDisconnect = 3,
  SaeConnectionChangedRtmAborted = 4,
  SaeConnectionChangedLostSync = 5,
}

export enum AudioRangeModeType {
  AudioRangeModeWorld = 0,
  AudioRangeModeTeam = 1,
}

export class RemoteVoicePositionInfo {
  position?: number[];
  forward?: number[];
}

export enum SaeDeployRegion {
  SaeDeployRegionCn = 0x00000001,
  SaeDeployRegionNa = 0x00000002,
  SaeDeployRegionEu = 0x00000004,
  SaeDeployRegionAs = 0x00000008,
}

export abstract class ICloudSpatialAudioEventHandler {
  onTokenWillExpire?(): void;

  onConnectionStateChange?(
    state: SaeConnectionStateType,
    reason: SaeConnectionChangedReasonType
  ): void;

  onTeammateLeft?(uid: number): void;

  onTeammateJoined?(uid: number): void;
}

export class CloudSpatialAudioConfig {
  rtcEngine?: IRtcEngine;
  eventHandler?: ICloudSpatialAudioEventHandler;
  appId?: string;
  deployRegion?: number;
}

export class LocalSpatialAudioConfig {
  rtcEngine?: IRtcEngine;
}

export abstract class IBaseSpatialAudioEngine {
  abstract release(): void;

  abstract setMaxAudioRecvCount(maxCount: number): number;

  abstract setAudioRecvRange(range: number): number;

  abstract setDistanceUnit(unit: number): number;

  abstract updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number;

  abstract updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number;

  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  abstract setParameters(params: string): number;

  abstract muteLocalAudioStream(mute: boolean): number;

  abstract muteAllRemoteAudioStreams(mute: boolean): number;
}

export abstract class ICloudSpatialAudioEngine extends IBaseSpatialAudioEngine {
  abstract initialize(config: CloudSpatialAudioConfig): number;

  abstract addEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  abstract removeEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  abstract enableSpatializer(enable: boolean, applyToTeam: boolean): number;

  abstract setTeamId(teamId: number): number;

  abstract setAudioRangeMode(rangeMode: AudioRangeModeType): number;

  abstract enterRoom(token: string, roomName: string, uid: number): number;

  abstract renewToken(token: string): number;

  abstract exitRoom(): number;

  abstract getTeammates(uids: number[]): number;
}

export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
  abstract initialize(config: LocalSpatialAudioConfig): number;

  abstract updateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): number;

  abstract updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number;

  abstract removeRemotePosition(uid: number): number;

  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

  abstract clearRemotePositions(): number;

  abstract clearRemotePositionsEx(connection: RtcConnection): number;
}
