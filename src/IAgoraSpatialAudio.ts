import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcConnection } from './IAgoraRtcEngineEx';

/*
@ignore */
export enum SaeConnectionStateType {
  /*
   * 0: 建立连接中。
   */
  SaeConnectionStateConnecting = 0,
  /*
   * 1: 已连接。 该状态下， updateSelfPosition 等空间音效设置才会生效。
   */
  SaeConnectionStateConnected = 1,
  /*
   * 2: 连接断开。
   */
  SaeConnectionStateDisconnected = 2,
  /*
   * 3: 重新建立连接中。
   */
  SaeConnectionStateReconnecting = 3,
  /*
   * 4: 已重新建立连接。
   */
  SaeConnectionStateReconnected = 4,
}

/*
@ignore */
export enum SaeConnectionChangedReasonType {
  /*
   * 0: 正常。
   */
  SaeConnectionChangedDefault = 0,
  /*
   * 1: SDK 建立连接中。
   */
  SaeConnectionChangedConnecting = 1,
  /*
   * 2: SDK 创建房间失败。
   */
  SaeConnectionChangedCreateRoomFail = 2,
  /*
   * 3: SDK 与 RTM 系统连接中断。
   */
  SaeConnectionChangedRtmDisconnect = 3,
  /*
   * 4: 用户被 RTM 系统踢出。
   */
  SaeConnectionChangedRtmAborted = 4,
  /*
   * 5: SDK 超过 15 秒未收到 Agora 空间音效服务器的消息。
   */
  SaeConnectionChangedLostSync = 5,
}

/*
@ignore */
export enum AudioRangeModeType {
  /*
   * 0: Everyone mode. In this mode, whether a user can hear other users in the room depends on their settings for audio reception range, audio range mode, and team ID.
   * If both users A and B set the AudioRangeModeWorld mode, users A and B can hear each other when they are in the audio reception range of each other or belong to the same team.
   * If users A and B set the AudioRangeModeWorld and AudioRangeModeTeam mode respectively, they can only hear each other when they belong to the same team.
   */
  AudioRangeModeWorld = 0,
  /*
   * 1: Team mode. In this mode, the user can only hear other users of the same team in the room.
   */
  AudioRangeModeTeam = 1,
}

/*
@ignore */
export class RemoteVoicePositionInfo {
  /*
   * The coordinates in the world coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  position?: number[];
  /*
   * The unit vector of the x axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  forward?: number[];
}

/*
@ignore */
export enum SaeDeployRegion {
  /*
   * （默认）中国大陆。
   */
  SaeDeployRegionCn = 0x00000001,
  /*
   * North America.
   */
  SaeDeployRegionNa = 0x00000002,
  /*
   * Europe.
   */
  SaeDeployRegionEu = 0x00000004,
  /*
   * Asia, excluding Mainland China.
   */
  SaeDeployRegionAs = 0x00000008,
}

/*
@ignore */
export abstract class ICloudSpatialAudioEventHandler {
  /*
@ignore */
  onTokenWillExpire?(): void;

  /*
@ignore   */
  onConnectionStateChange?(
    state: SaeConnectionStateType,
    reason: SaeConnectionChangedReasonType
  ): void;

  /*
@ignore   */
  onTeammateLeft?(uid: number): void;

  /*
@ignore   */
  onTeammateJoined?(uid: number): void;
}

/*
@ignore */
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
@ignore */
export class LocalSpatialAudioConfig {
  /*
   * @ignore
   */
  rtcEngine?: IRtcEngine;
}

/*
@ignore */
export abstract class IBaseSpatialAudioEngine {
  /*
@ignore */
  abstract release(): void;

  /*
@ignore */
  abstract setMaxAudioRecvCount(maxCount: number): number;

  /*
@ignore */
  abstract setAudioRecvRange(range: number): number;

  /*
@ignore */
  abstract setDistanceUnit(unit: number): number;

  /*
@ignore */
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

  /*
@ignore */
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /* api_ibasespatialaudioengine_setparameters */
  abstract setParameters(params: string): number;

  /*
@ignore */
  abstract muteLocalAudioStream(mute: boolean): number;

  /*
@ignore */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;
}

/*
@ignore */
export abstract class ICloudSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /*
@ignore */
  abstract initialize(config: CloudSpatialAudioConfig): number;

  /*
@ignore */
  abstract addEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  /*
@ignore */
  abstract removeEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  /*
@ignore */
  abstract enableSpatializer(enable: boolean, applyToTeam: boolean): number;

  /*
@ignore */
  abstract setTeamId(teamId: number): number;

  /*
@ignore */
  abstract setAudioRangeMode(rangeMode: AudioRangeModeType): number;

  /*
@ignore */
  abstract enterRoom(token: string, roomName: string, uid: number): number;

  /*
@ignore */
  abstract renewToken(token: string): number;

  /*
@ignore */
  abstract exitRoom(): number;

  /*
@ignore */
  abstract getTeammates(): number[];
}

/*
@ignore */
export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /*
@ignore */
  abstract initialize(config: LocalSpatialAudioConfig): number;

  /*
@ignore */
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

  /*
@ignore */
  abstract removeRemotePosition(uid: number): number;

  /* api_ilocalspatialaudioengine_removeremotepositionex */
  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

  /*
@ignore */
  abstract clearRemotePositions(): number;

  /* api_ilocalspatialaudioengine_clearremotepositionsex */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;
}
