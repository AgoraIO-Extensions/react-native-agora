import './extension/IAgoraSpatialAudioExtension';
import { RtcConnection } from './IAgoraRtcEngineEx';

/**
 * The spatial position of the remote user or the media player.
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
 * Sound insulation area settings.
 */
export class SpatialAudioZone {
  /**
   * The ID of the sound insulation area.
   */
  zoneSetId?: number;
  /**
   * The spatial center point of the sound insulation area. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  position?: number[];
  /**
   * Starting at position, the forward unit vector. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  forward?: number[];
  /**
   * Starting at position, the right unit vector. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  right?: number[];
  /**
   * Starting at position, the up unit vector. This parameter is an array of length 3, and the three values represent the front, right, and top coordinates in turn.
   */
  up?: number[];
  /**
   * The entire sound insulation area is regarded as a cube; this represents the length of the forward side in the unit length of the game engine.
   */
  forwardLength?: number;
  /**
   * The entire sound insulation area is regarded as a cube; this represents the length of the right side in the unit length of the game engine.
   */
  rightLength?: number;
  /**
   * The entire sound insulation area is regarded as a cube; this represents the length of the up side in the unit length of the game engine.
   */
  upLength?: number;
  /**
   * The sound attenuation coefficient when users within the sound insulation area communicate with external users. The value range is [0,1]. The values are as follows:
   *  0: Broadcast mode, where the volume and timbre are not attenuated with distance, and the volume and timbre heard by local users do not change regardless of distance.
   *  (0,0.5): Weak attenuation mode, that is, the volume and timbre are only weakly attenuated during the propagation process, and the sound can travel farther than the real environment.
   *  0.5: (Default) simulates the attenuation of the volume in the real environment; the effect is equivalent to not setting the audioAttenuation parameter.
   *  (0.5,1]: Strong attenuation mode (default value is 1), that is, the volume and timbre attenuate rapidly during propagation.
   */
  audioAttenuation?: number;
}

/**
 * This class calculates user positions through the SDK to implement the spatial audio effect.
 *
 * This class inherits from IBaseSpatialAudioEngine. Before calling other APIs in this class, you need to call the initialize method to initialize this class.
 */
export abstract class ILocalSpatialAudioEngine {
  /**
   * @ignore
   */
  abstract release(): void;

  /**
   * Initializes ILocalSpatialAudioEngine.
   *
   * Before calling other methods of the ILocalSpatialAudioEngine class, you need to call this method to initialize ILocalSpatialAudioEngine.
   *  The SDK supports creating only one ILocalSpatialAudioEngine instance for an app.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract initialize(): number;

  /**
   * Updates the spatial position of the specified remote user.
   *
   * After successfully calling this method, the SDK calculates the spatial audio parameters based on the relative position of the local and remote user. Call this method after joinChannel.
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   * @param posInfo The spatial position of the remote user. See RemoteVoicePositionInfo.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   *
   * After successfully calling this method, the local user no longer hears the specified remote user. After leaving the channel, to avoid wasting resources, you can also call this method to delete the spatial position of the specified remote user.
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * @ignore
   */
  abstract clearRemotePositionsEx(connection: RtcConnection): number;

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
   * @ignore
   */
  abstract setMaxAudioRecvCount(maxCount: number): number;

  /**
   * @ignore
   */
  abstract setAudioRecvRange(range: number): number;

  /**
   * @ignore
   */
  abstract setDistanceUnit(unit: number): number;

  /**
   * @ignore
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
  abstract updatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): number;

  /**
   * @ignore
   */
  abstract setParameters(params: string): number;

  /**
   * @ignore
   */
  abstract muteLocalAudioStream(mute: boolean): number;

  /**
   * @ignore
   */
  abstract muteAllRemoteAudioStreams(mute: boolean): number;

  /**
   * @ignore
   */
  abstract muteRemoteAudioStream(uid: number, mute: boolean): number;

  /**
   * Sets the sound attenuation effect for the specified user.
   *
   * @param uid The user ID. This parameter must be the same as the user ID passed in when the user joined the channel.
   * @param attenuation For the user's sound attenuation coefficient, the value range is [0,1]. The values are as follows:
   *  0: Broadcast mode, where the volume and timbre are not attenuated with distance, and the volume and timbre heard by local users do not change regardless of distance.
   *  (0,0.5): Weak attenuation mode, that is, the volume and timbre are only weakly attenuated during the propagation process, and the sound can travel farther than the real environment.
   *  0.5: (Default) simulates the attenuation of the volume in the real environment; the effect is equivalent to not setting the speaker_attenuation parameter.
   *  (0.5,1]: Strong attenuation mode, that is, the volume and timbre attenuate rapidly during the propagation process.
   * @param forceSet Whether to force the user's sound attenuation effect: true : Force attenuation to set the sound attenuation of the user. At this time, the attenuation coefficient of the sound insulation area set in the audioAttenuation of the SpatialAudioZone does not take effect for the user.
   *  If the sound source and listener are inside and outside the sound isolation area, the sound attenuation effect is determined by the audioAttenuation in SpatialAudioZone.
   *  If the sound source and the listener are in the same sound insulation area or outside the same sound insulation area, the sound attenuation effect is determined by attenuation in this method. false : Do not force attenuation to set the user's sound attenuation effect, as shown in the following two cases.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): number;

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
   * Removes the spatial positions of all remote users.
   *
   * After successfully calling this method, the local user no longer hears any remote users. After leaving the channel, to avoid wasting resources, you can also call this method to delete the spatial positions of all remote users.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract clearRemotePositions(): number;
}
