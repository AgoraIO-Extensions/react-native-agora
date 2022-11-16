import './extension/IAgoraSpatialAudioExtension';
import { RtcConnection } from './IAgoraRtcEngineEx';
/**
 * The spatial position of the remote user or the media player.
 *
 */
export class RemoteVoicePositionInfo {
/**
 * The coordinates in the world coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
 */
  position?: number[];
/**
 * The unit vector of the x axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
 */
  forward?: number[];
}

  /**
   * @ignore
   */
export class SpatialAudioZone {
  /**
   * @ignore
   */
  zoneSetId?: number;
  /**
   * @ignore
   */
  position?: number[];
  /**
   * @ignore
   */
  forward?: number[];
  /**
   * @ignore
   */
  right?: number[];
  /**
   * @ignore
   */
  up?: number[];
  /**
   * @ignore
   */
  forwardLength?: number;
  /**
   * @ignore
   */
  rightLength?: number;
  /**
   * @ignore
   */
  upLength?: number;
  /**
   * @ignore
   */
  audioAttenuation?: number;
}

/**
 * This class contains some of the APIs in the ILocalSpatialAudioEngine class.
 * The ILocalSpatialAudioEngine class inherits from IBaseSpatialAudioEngine.
 */
export abstract class IBaseSpatialAudioEngine {
/**
 * Destroys IBaseSpatialAudioEngine .
 * This method releases all resources under IBaseSpatialAudioEngine. When the user does not need to use the spatial audio effect, you can call this method to release resources for other operations.After calling this method, you can no longer use any of the APIs under IBaseSpatialAudioEngine.Call this method before the release method under IRtcEngine .
 */
  abstract release(): void;

/**
 * Sets the maximum number of streams that a user can receive in a specified audio reception range.
 * If the number of receivable streams exceeds the set value, the local user receives the maxCount streams that are closest to the local user. If there are users who belong to the same team as the local user in the room, the local user receives the audio of the teammates first. For example, when maxCount is set to 3, if there are five remote users in the room, two of whom belong to the same team as the local user, and three of whom belong to different teams but are within the audio reception range of the local user, the local user can hear the two teammates and the one user from a different team closest to the local user.
 *
 * @param maxCount The maximum number of streams that a user can receive within a specified audio reception range.
 */
  abstract setMaxAudioRecvCount(maxCount: number): number;

/**
 * Sets the audio reception range of the local user.
 * After the setting is successful, the local user can only hear the remote users within the setting range or belonging to the same team. You can call this method at any time to update the audio reception range.
 *
 * @param range The maximum audio reception range. The unit is meters. The value must be greater than 0.
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract setAudioRecvRange(range: number): number;

/**
 * Sets the length (in meters) of the game engine distance per unit.
 * In a game engine, the unit of distance is customized, while in the Agora spatial audio algorithm, distance is measured in meters. By default, the SDK converts the game engine distance per unit to one meter. You can call this method to convert the game engine distance per unit to a specified number of meters.
 *
 * @param unit The number of meters that the game engine distance per unit is equal to. This parameter must be greater than 0.00. For example, setting unit as 2.00 means the game engine distance per unit equals 2 meters.The larger the value is, the faster the sound heard by the local user attenuates when the remote user moves far away from the local user.
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract setDistanceUnit(unit: number): number;

/**
 * Updates the spatial position of the local user.
 * Under the ILocalSpatialAudioEngine class, this method needs to be used with updateRemotePosition . The SDK calculates the relative position between the local and remote users according to this method and the parameter settings in updateRemotePosition, and then calculates the user's spatial audio effect parameters.
 *
 * @param position The coordinates in the world coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
 * @param axisForward The unit vector of the x axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
 * @param axisRight The unit vector of the y axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
 * @param axisUp The unit vector of the z axis in the coordinate system. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
 */
  abstract updateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): number;

  /**
   * @ignore
   */
  abstract updateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): number;

/**
 * Updates the spatial position of the media player.
 * After a successful update, the local user can hear the change in the spatial position of the media player.
 *
 * @param playerId The ID of the media player. 
 * @param positionInfo The spatial position of the media player. See RemoteVoicePositionInfo .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /**
   * @ignore
   */
  abstract setParameters(params: string): number;

/**
 * Stops or resumes publishing the local audio stream.
 * This method does not affect any ongoing audio recording, because it does not disable the audio capture device.Call this method after joinChannel [2/2] .When using the spatial audio effect, if you need to set whether to publish the local audio stream, Agora recommends calling this method instead of the muteLocalAudioStream method under IRtcEngine .
 *
 * @param mute Whether to stop publishing the local audio stream.true: Stop publishing the local audio stream.false: Publish the local audio stream.
 */
  abstract muteLocalAudioStream(mute: boolean): number;

/**
 * Stops or resumes subscribing to the audio streams of all remote users.
 * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.Call this method after joinChannel [2/2] .When using the spatial audio effect, if you need to set whether to stop subscribing to the audio streams of all remote users, Agora recommends calling this method instead of the muteAllRemoteAudioStreams method under IRtcEngine .After calling this method, you need to call updateSelfPosition and updateRemotePosition to update the spatial location of the local user and the remote user; otherwise, the settings in this method do not take effect.
 *
 * @param mute Whether to stop subscribing to the audio streams of all remote users:true: Stop subscribing to the audio streams of all remote users.false: Subscribe to the audio streams of all remote users.
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * @ignore
   */
  abstract setZones(zones: SpatialAudioZone, zoneCount: number): number;

  /**
   * @ignore
   */
  abstract setPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): number;

  /**
   * @ignore
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;
}

/**
 * This class calculates user positions through the SDK to implement the spatial audio effect.
 * This class inherits from IBaseSpatialAudioEngine . Before calling other APIs in this class, you need to call the initialize method to initialize this class.
 */
export abstract class ILocalSpatialAudioEngine extends IBaseSpatialAudioEngine {
/**
 * Initializes ILocalSpatialAudioEngine .
 * Before calling other methods of the ILocalSpatialAudioEngine class, you need to call this method to initialize ILocalSpatialAudioEngine.The SDK supports creating only one ILocalSpatialAudioEngine instance for an app.
 */
  abstract initialize(): number;

/**
 * Updates the spatial position of the specified remote user.
 * After successfully calling this method, the SDK calculates the spatial audio parameters based on the relative position of the local and remote user.Call this method after the joinChannel [2/2] method.
 *
 * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
 * @param posInfo The spatial position of the remote user. See RemoteVoicePositionInfo .
 *
 * @returns
 * 0: Success.< 0: Failure.
 */
  abstract updateRemotePosition(
    uid: number,
    posInfo: RemoteVoicePositionInfo
  ): number;

  /**
   * @ignore
   */
  abstract updateRemotePositionEx(
    uid: number,
    posInfo: RemoteVoicePositionInfo,
    connection: RtcConnection
  ): number;

/**
 * Removes the spatial position of the specified remote user.
 * After successfully calling this method, the local user no longer hears the specified remote user.After leaving the channel, to avoid wasting resources, you can also call this method to delete the spatial position of the specified remote user.
 *
 * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
 */
  abstract removeRemotePosition(uid: number): number;

  /**
   * @ignore
   */
  abstract removeRemotePositionEx(
    uid: number,
    connection: RtcConnection
  ): number;

/**
 * Removes the spatial positions of all remote users.
 * After successfully calling this method, the local user no longer hears any remote users.After leaving the channel, to avoid wasting resources, you can also call this method to delete the spatial positions of all remote users.
 */
  abstract clearRemotePositions(): number;

  /**
   * @ignore
   */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;

  /**
   * @ignore
   */
  abstract setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): number;
}