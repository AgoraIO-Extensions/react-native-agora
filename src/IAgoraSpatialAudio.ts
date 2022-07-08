import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcConnection } from './IAgoraRtcEngineEx';

/*
 * @ignore
 */
export enum SaeConnectionStateType {
  /*
   * @ignore
   */
  SaeConnectionStateConnecting = 0,
  /*
   * @ignore
   */
  SaeConnectionStateConnected = 1,
  /*
   * @ignore
   */
  SaeConnectionStateDisconnected = 2,
  /*
   * @ignore
   */
  SaeConnectionStateReconnecting = 3,
  /*
   * @ignore
   */
  SaeConnectionStateReconnected = 4,
}

/*
 * @ignore
 */
export enum SaeConnectionChangedReasonType {
  /*
   * @ignore
   */
  SaeConnectionChangedDefault = 0,
  /*
   * @ignore
   */
  SaeConnectionChangedConnecting = 1,
  /*
   * @ignore
   */
  SaeConnectionChangedCreateRoomFail = 2,
  /*
   * @ignore
   */
  SaeConnectionChangedRtmDisconnect = 3,
  /*
   * @ignore
   */
  SaeConnectionChangedRtmAborted = 4,
  /*
   * @ignore
   */
  SaeConnectionChangedLostSync = 5,
}

/*
 * @ignore
 */
export enum AudioRangeModeType {
  /*
   * @ignore
   */
  AudioRangeModeWorld = 0,
  /*
   * @ignore
   */
  AudioRangeModeTeam = 1,
}

/*
 * @ignore
 */
export class RemoteVoicePositionInfo {
  /*
   * @ignore
   */
  position?: number[];
  /*
   * @ignore
   */
  forward?: number[];
}

/*
 * @ignore
 */
export enum SaeDeployRegion {
  /*
   * @ignore
   */
  SaeDeployRegionCn = 0x00000001,
  /*
   * @ignore
   */
  SaeDeployRegionNa = 0x00000002,
  /*
   * @ignore
   */
  SaeDeployRegionEu = 0x00000004,
  /*
   * @ignore
   */
  SaeDeployRegionAs = 0x00000008,
}

/*
 * @ignore
 */
export abstract class ICloudSpatialAudioEventHandler {
  /*
   * @ignore
   */
  onTokenWillExpire?(): void;

  /*
   * @ignore
   */
  onConnectionStateChange?(
    state: SaeConnectionStateType,
    reason: SaeConnectionChangedReasonType
  ): void;

  /*
   * @ignore
   */
  onTeammateLeft?(uid: number): void;

  /*
   * @ignore
   */
  onTeammateJoined?(uid: number): void;
}

/*
 * @ignore
 */
export class CloudSpatialAudioConfig {
  /*
   * @ignore
   */
  rtcEngine?: IRtcEngine;
  /*
   * @ignore
   */
  eventHandler?: ICloudSpatialAudioEventHandler;
  /*
   * @ignore
   */
  appId?: string;
  /*
   * @ignore
   */
  deployRegion?: number;
}

/*
 * @ignore
 */
export class LocalSpatialAudioConfig {
  /*
   * @ignore
   */
  rtcEngine?: IRtcEngine;
}

/*
 * @ignore
 */
export abstract class IBaseSpatialAudioEngine {
  /*
   * @ignore
   */
  abstract release(): void;

  /*
   * @ignore
   */
  abstract setMaxAudioRecvCount(maxCount: number): number;

  /*
   * @ignore
   */
  abstract setAudioRecvRange(range: number): number;

  /*
   * @ignore
   */
  abstract setDistanceUnit(unit: number): number;

  /*
   * @ignore
   */
  abstract updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number;

  /*
   * @ignore
   */
  abstract updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number;

  /*
   * @ignore
   */
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /*
   * @ignore
   */
  abstract setParameters(params: string): number;

  /*
   * @ignore
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /*
   * @ignore
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;
}

/*
 * @ignore
 */
export abstract class ICloudSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /*
   * @ignore
   */
  abstract initialize(config: CloudSpatialAudioConfig): number;

  /*
   * @ignore
   */
  abstract addEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  /*
   * @ignore
   */
  abstract removeEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  /*
   * @ignore
   */
  abstract enableSpatializer(enable: boolean, applyToTeam: boolean): number;

  /*
   * @ignore
   */
  abstract setTeamId(teamId: number): number;

  /*
   * @ignore
   */
  abstract setAudioRangeMode(rangeMode: AudioRangeModeType): number;

  /*
   * @ignore
   */
  abstract enterRoom(token: string, roomName: string, uid: number): number;

  /*
   * @ignore
   */
  abstract renewToken(token: string): number;

  /*
   * @ignore
   */
  abstract exitRoom(): number;

  /*
   * @ignore
   */
  abstract getTeammates(): number[];
}

/*
 * @ignore
 */
export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /*
   * @ignore
   */
  abstract initialize(config: LocalSpatialAudioConfig): number;

  /*
   * @ignore
   */
  abstract updateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): number;

  /*
   * @ignore
   */
  abstract updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number;

  /*
   * @ignore
   */
  abstract removeRemotePosition(uid: number): number;

  /*
   * @ignore
   */
  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

  /*
   * @ignore
   */
  abstract clearRemotePositions(): number;

  /*
   * @ignore
   */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;
}
