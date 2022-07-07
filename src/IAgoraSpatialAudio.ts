import { IRtcEngine } from './IAgoraRtcEngine';
import { RtcConnection } from './IAgoraRtcEngineEx';

/*
 * SDK 与 Agora 空间音效服务器的连接状态。
 */
export enum SaeConnectionStateType {
  /*
   * 0: 建立连接中。
   */
  SaeConnectionStateConnecting = 0,
  /*
   * 1: 已连接。该状态下， updateSelfPosition 等空间音效设置才会生效。
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
 * SDK 与 Agora 空间音效服务器连接状态发生改变的原因。
 */
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
 * 音频范围模式。
 */
export enum AudioRangeModeType {
  /*
   * 0: 所有人模式。该模式下，用户能否和房间内其他用户互相听见取决于双方设置的音频接收范围、音频范围模式和队伍 ID。 如果用户 A 和 B 都设置了 AudioRangeModeWorld 模式，当用户 A 和 B 互相在音频接收范围内或属于同一队伍时，A 和 B 可以互相听见。
   * 如果用户 A 和 B 分别设置了 AudioRangeModeWorld 和 AudioRangeModeTeam 模式，只有当 A 和 B 属于同一队伍时才能互相听见。
   */
  AudioRangeModeWorld = 0,
  /*
   * 1: 队伍模式。该模式下，用户只能和房间内同一队伍的其他用户互相听见。
   */
  AudioRangeModeTeam = 1,
}

/*
 * 远端用户或媒体播放器的空间位置信息。
 */
export class RemoteVoicePositionInfo {
  /*
   * 在世界坐标系中的坐标。该参数是长度为 3 的数组，三个值依次表示前、右、上的坐标值。
   */
  position?: number[];
  /*
   * 在世界坐标系前轴的单位向量。该参数是长度为 3 的数组，三个值依次表示前、右、上的坐标值。
   */
  forward?: number[];
}

/*
 * Agora 空间音效服务器的访问区域。
 */
export enum SaeDeployRegion {
  /*
   * （默认）中国大陆。
   */
  SaeDeployRegionCn = 0x00000001,
  /*
   * 北美区域。
   */
  SaeDeployRegionNa = 0x00000002,
  /*
   * 欧洲区域。
   */
  SaeDeployRegionEu = 0x00000004,
  /*
   * 除中国以外的亚洲区域。
   */
  SaeDeployRegionAs = 0x00000008,
}

/*
 * 空间音效事件通知回调类。
 */
export abstract class ICloudSpatialAudioEventHandler {
  /*
   * RTM Token 已过期回调。
   * 如果 RTM Token 已过期，SDK 会触发该回调，提醒 app 更新 RTM Token。
   */
  onTokenWillExpire?(): void;

  /*
   * SDK 与 Agora 空间音效服务器连接状态已改变回调。
   * 该回调在 SDK 与 Agora 空间音效服务器连接状态发生改变时触发，并告知用户当前的连接状态和引起连接状态改变的原因。
   *
   * @param state SDK 与 Agora 空间音效服务器的连接状态。
   *
   * @param reason SDK 与 Agora 空间音效服务器连接状态发生改变的原因。
   */
  onConnectionStateChange?(
    state: SaeConnectionStateType,
    reason: SaeConnectionChangedReasonType
  ): void;

  /*
   * 用户离开当前队伍回调。
   * 当同一队伍的远端用户调用 exitRoom 离开当前房间时，本地用户会收到该回调。
   *
   * @param uid 离开队伍的远端用户 ID。
   */
  onTeammateLeft?(uid: number): void;

  /*
   * 用户加入当前队伍回调。
   * 当同一队伍 ID 的远端用户调用 enterRoom 进入当前房间时，本地用户会收到该回调。
   *
   * @param uid 新加入队伍的远端用户 ID。
   */
  onTeammateJoined?(uid: number): void;
}

/*
 *  ICloudSpatialAudioEngine 的配置。
 */
export class CloudSpatialAudioConfig {
  /*
   * TODO(doc)
   */
  rtcEngine?: IRtcEngine;
  /*
   * TODO(doc)
   */
  eventHandler?: ICloudSpatialAudioEventHandler;
  /*
   * TODO(doc)
   */
  appId?: string;
  /*
   * TODO(doc)
   */
  deployRegion?: number;
}

/*
 * ILocalSpatialAudioEngine 的配置。
 */
export class LocalSpatialAudioConfig {
  /*
   * TODO(doc)
   */
  rtcEngine?: IRtcEngine;
}

/*
 * 该类包含 ICloudSpatialAudioEngine 和 ILocalSpatialAudioEngine 类共用的 API。
 * ICloudSpatialAudioEngine 和 ILocalSpatialAudioEngine 类继承自 IBaseSpatialAudioEngine。
 */
export abstract class IBaseSpatialAudioEngine {
  /*
   * 销毁 IBaseSpatialAudioEngine 。
   * 该方法释放 IBaseSpatialAudioEngine 下的所有资源。当用户不需要使用空间音效时，你可以调用该方法将资源释放出来用于其他操作。
   * 调用该方法后，你将无法再使用 IBaseSpatialAudioEngine 下的任何 API。 该方法需要在 IRtcEngine 的 release 方法前调用。
   */
  abstract release(): void;

  /*
   * 设置音频接收范围内最多可接收的音频流数。
   * 如果在音频接收范围内可接收的音频流数超过设置的值，则本地用户会接收音源距离较近的 maxCount 路音频。如果房间里有和本地用户属于同一队伍的用户，则本地用户会优先接收队员的音频。例如，当 maxCount 设为 3 时，如果房间里有 5 位远端用户，其中 2 位和本地用户属于同一队伍、3 位和本地用户属于不同队伍但在本地用户的音频接收范围内，则本地用户可以听到 2 位队友和 1 位离自己最近的不同队伍的用户。
   *
   * @param maxCount 音频接收范围内最多可接收的音频流数。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setMaxAudioRecvCount(maxCount: number): number;

  /*
   * 设置本地用户的音频接收范围。
   * 设置成功后，用户只能听见设置范围内或属于同一队伍的远端用户。你可以随时调用该方法更新音频的接收范围。
   *
   * @param range 可接收音频的最大范围，单位为米。取值需大于 0。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setAudioRecvRange(range: number): number;

  /*
   * 设置游戏引擎单位距离的长度（米）。
   * 游戏引擎里的距离单位是游戏引擎自定义的，而 Agora 空间音效算法的距离单位为米。默认情况下，SDK 会将每单位的游戏引擎距离换算为一米。你可以调用该方法，将游戏引擎里的单位距离换算为指定的米数。
   *
   * @param unit 每单位游戏引擎距离转换后的米数，取值需大于 0.00。例如，将 unit 设为 2.00，表示每单位的游戏引擎距离等于 2 米。 该值越大，当远端用户远离本地用户时，本地用户听到的声音衰减速度越快。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setDistanceUnit(unit: number): number;

  /*
   * 更新本地用户的空间位置。
   * 在不同类下调用该方法时，作用不同： 在 ILocalSpatialAudioEngine 类下，该方法需要和 updateRemotePosition 搭配使用。SDK 会根据该方法和 updateRemotePosition 设置的参数计算本地和远端用户之间的相对位置，从而计算用户的空间音效参数。
   *
   * @param position 在世界坐标系中的坐标。该参数是长度为 3 的数组，三个值依次表示前、右、上的坐标值。
   *
   * @param axisForward 在世界坐标系前轴的单位向量。该参数是长度为 3 的数组，三个值依次表示前、右、上的坐标值。
   *
   * @param axisRight 在世界坐标系右轴的单位向量。该参数是长度为 3 的数组，三个值依次表示前、右、上的坐标值。
   *
   * @param axisUp 在世界坐标系上轴的单位向量。该参数是长度为 3 的数组，三个值依次表示前、右、上的坐标值。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number;

  /*
   * TODO(doc)
   */
  abstract updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number;

  /*
   * 更新媒体播放器的空间位置。
   * 成功更新后，本地用户可以听到媒体播放器空间位置的变化。
   *
   * @param playerId 媒体播放器 ID。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /*
   * TODO(doc)
   */
  abstract setParameters(params: string): number;

  /*
   * 取消或恢复发布本地音频流。
   * 该方法不影响音频采集状态，因为没有禁用音频采集设备。
   * 该方法需要在 joinChannelWithOptions 后调用。
   * 在使用空间音效时，如需设置是否发布本地音频流，Agora 推荐调用该方法替代 IRtcEngine 的 muteLocalAudioStream 方法。
   *
   * @param mute 是否取消发布本地音频流。 true: 取消发布本地音频流。
   *  false: 发布本地音频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /*
   * 取消或恢复订阅所有远端用户的音频流。
   * 成功调用该方法后，本地用户会取消或恢复订阅所有远端用户的音频流，包括在调用该方法后加入频道的用户的音频流。 该方法需要在 joinChannelWithOptions 后调用。
   * 在使用空间音效时，如需设置是否订阅所有远端用户的音频流，Agora 推荐调用该方法替代 IRtcEngine 的 muteAllRemoteAudioStreams 方法。
   *
   * @param mute 是否取消订阅所有远端用户的音频流： true: 取消订阅所有远端用户的音频流。
   *  false: 订阅所有远端用户的音频流。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;
}

/*
 * 该类通过 Agora 空间音效服务器计算用户坐标，实现空间音效。
 * 调用该类下其他 API 前，你需要调用 initialize 方法初始化该类。
 */
export abstract class ICloudSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /*
   * 初始化 ICloudSpatialAudioEngine 。
   * 在调用 ICloudSpatialAudioEngine 类的其他方法前，你需要先调用该方法初始化 ICloudSpatialAudioEngine。
   * SDK 只支持每个 app 创建一个 ICloudSpatialAudioEngine 实例。
   *
   * @param config ICloudSpatialAudioEngine 的配置。详见 CloudSpatialAudioConfig 。
   */
  abstract initialize(config: CloudSpatialAudioConfig): number;

  /*
   * 添加 ICloudSpatialAudioEventHandler 回调。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract addEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  /*
   * 删除 ICloudSpatialAudioEventHandler 中指定的回调。
   * 对于某些已添加的回调，如果你在收到相应回调后无需再次接收该回调，可以调用该方法删除该回调。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract removeEventHandler(
    eventHandler: ICloudSpatialAudioEventHandler
  ): number;

  /*
   * 开启或关闭 Agora 空间音效服务器对空间音效参数的计算。
   * 开启后，用户可以听到远端用户的空间音效及其空间位置的变化。 该方法在 enterRoom 前后均可调用，区别如下：
   * 如果在 enterRoom 之前调用，该方法会在进入房间时生效。
   * 如果在 enterRoom 之后调用，该方法立即生效。
   *
   * @param enable 是否在音频接收范围内开启空间音效参数的计算：
   *  true: 开启计算。
   *  false: 关闭计算。
   *
   * @param applyToTeam 是否在队伍内开启空间音效参数的计算：
   *  true: 开启计算。
   *  false: 关闭计算。
   *  该参数仅在 enable 参数为 true 时生效。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableSpatializer(enable: boolean, applyToTeam: boolean): number;

  /*
   * 设置队伍 ID。
   * 在同一个房间内，相同队伍 ID 的用户不受音频范围模式和音频接收范围的影响，都能相互听见；不同队伍 ID 的用户，需要根据设置的音频范围模式和音频接收范围来决定是否相互可以听到。
   * 该方法需要在 enterRoom 前调用。一位用户在一个房间里只能有一个队伍 ID，加入房间后无法修改队伍 ID。
   *
   * @param teamId 队伍 ID，取值需大于 0。默认值为 0，表示不和其他用户组队。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setTeamId(teamId: number): number;

  /*
   * 设置音频范围模式。
   * 音频范围模式分为所有人模式和队伍模式。SDK 默认使用所有人模式，如需改为队伍模式，你可以调用该方法。
   * 一位用户在一个房间里只能同时使用一种模式。
   * 该方法在 enterRoom 前后均可调用，区别如下：
   * 如果在 enterRoom 之前调用，该方法会在进入房间时生效。
   * 如果在 enterRoom 之后调用，该方法立即生效，即改变当前的音频范围模式。
   *
   * @param rangeMode 音频范围模式。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setAudioRangeMode(rangeMode: AudioRangeModeType): number;

  /*
   * 进入房间。
   * 进入房间后，空间音效才会生效。调用该方法后，SDK 会触发 onConnectionStateChange 回调。
   * 该方法需要在 joinChannelWithOptions 后调用。
   *
   * @param uid 用户 ID。需与用户加入频道时填写的用户 ID 一致。
   *
   * @param token 用于鉴权的 RTM Token。你可以通过以下方式生成 RTM Token：
   *  使用 ，生成临时 Token。
   *  自行部署服务器签发 Token，详见。
   *  生成 RTM Token 时填入的 uid 或 userAccount 等于 enterRoom 中设置的 roomName 加 uid。例如，如果 roomName 为 test，uid 为 123，则生成 RTM Token 时填入的 uid 或 userAccount 为 test123。
   *
   * @param roomName 房间名。需与加入频道时填写的频道名一致。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enterRoom(token: string, roomName: string, uid: number): number;

  /*
   * 更新 RTM Token。
   * RTM Token 的有效时长为 24 小时。当 SDK 触发 onTokenWillExpire 回调时，app 应重新获取 RTM Token，然后调用该方法传入新的 RTM Token，否则 SDK 无法和 Agora 空间音效服务器建立连接。
   *
   * @param token 用于鉴权的 RTM Token。你可以通过以下方式生成 RTM Token：
   *  使用 ，生成临时 Token。
   *  自行部署服务器签发 Token，详见。
   *  生成 RTM Token 时填入的 uid 或 userAccount 等于 enterRoom 中设置的 roomName 加 uid。例如，如果 roomName 为 test，uid 为 123，则生成 RTM Token 时填入的 uid 或 userAccount 为 test123。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract renewToken(token: string): number;

  /*
   * 离开房间。
   * 用户离开房间后，空间音效会立即消失。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract exitRoom(): number;

  /*
   * 获取队员信息。
   * 调用 setTeamId 设置队伍 ID 并调用 enterRoom 加入房间后，你可以调用该方法获取同一队伍的远端用户（队友）信息。
   *
   * @param uids 输出参数。队友的用户 ID。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract getTeammates(): number[];
}

/*
 * 该类通过 SDK 计算用户坐标，实现空间音效。
 * 调用该类下其他 API 前，你需要调用 initialize 方法初始化该类。
 */
export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
  /*
   * 初始化 ILocalSpatialAudioEngine 。
   * 在调用 ILocalSpatialAudioEngine 类的其他方法前，你需要先调用该方法初始化 ILocalSpatialAudioEngine。
   * SDK 只支持每个 app 创建一个 ILocalSpatialAudioEngine 实例。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract initialize(config: LocalSpatialAudioConfig): number;

  /*
   * 更新远端用户的空间位置信息。
   * 成功调用该方法后，SDK 会根据本地和远端用户的相对位置计算空间音效参数。
   * 该方法需要在 joinChannelWithOptions 后调用。
   *
   * @param uid 用户 ID。需与用户加入频道时填写的用户 ID 一致。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract updateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): number;

  /*
   * TODO(doc)
   */
  abstract updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number;

  /*
   * 删除指定远端用户的空间位置信息。
   * 成功调用该方法后，本地用户将听不到指定的远端用户。
   * 离开频道后，为避免计算资源的浪费，你也可以调用该方法删除指定远端用户的空间位置信息。
   *
   * @param uid 用户 ID。需与用户加入频道时填写的用户 ID 一致。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract removeRemotePosition(uid: number): number;

  /*
   * TODO(doc)
   */
  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

  /*
   * 删除所有远端用户的空间位置信息。
   * 成功调用该方法后，本地用户将听不到所有远端用户。
   * 离开频道后，为避免计算资源的浪费，你也可以调用该方法删除所有远端用户的空间位置信息。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract clearRemotePositions(): number;

  /*
   * TODO(doc)
   */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;
}
