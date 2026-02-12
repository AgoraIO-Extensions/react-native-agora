import './extension/IAgoraSpatialAudioExtension';
import { RtcConnection } from './IAgoraRtcEngineEx';

/**
 * Spatial position information of the remote user or media player.
 */
export class RemoteVoicePositionInfo {
  /**
   * Coordinates in the world coordinate system. This parameter is an array of length 3, representing the coordinates in the forward, right, and up directions respectively.
   */
  position?: number[];
  /**
   * Unit vector of the forward axis in the world coordinate system. This parameter is an array of length 3, representing the directions in the forward, right, and up axes respectively.
   */
  forward?: number[];
}

/**
 * Sound isolation zone settings.
 */
export class SpatialAudioZone {
  /**
   * ID of the sound isolation zone.
   */
  zoneSetId?: number;
  /**
   * The spatial center point of the sound isolation zone. This parameter is an array of length 3, representing coordinates in the forward, right, and up directions respectively.
   */
  position?: number[];
  /**
   * Unit vector pointing forward from position. This parameter is an array of length 3, representing coordinates in the forward, right, and up directions respectively.
   */
  forward?: number[];
  /**
   * Unit vector pointing right from position. This parameter is an array of length 3, representing coordinates in the forward, right, and up directions respectively.
   */
  right?: number[];
  /**
   * Unit vector pointing upward from position. This parameter is an array of length 3, representing coordinates in the forward, right, and up directions respectively.
   */
  up?: number[];
  /**
   * Treating the entire sound isolation zone as a cube, this represents the length of the forward edge, in game engine units.
   */
  forwardLength?: number;
  /**
   * Treating the entire sound isolation zone as a cube, this represents the length of the right edge, in game engine units.
   */
  rightLength?: number;
  /**
   * Treating the entire sound isolation zone as a cube, this represents the length of the upward edge, in game engine units.
   */
  upLength?: number;
  /**
   * Sound attenuation coefficient when users inside and outside the sound isolation zone communicate. Value range: [0,1]. Where:
   *  0: Broadcast mode, volume and timbre do not attenuate with distance; the local user hears no change regardless of distance.
   *  (0,0.5): Weak attenuation mode; volume and timbre attenuate slightly, allowing sound to travel farther than in real environments.
   *  0.5: Simulates real-world volume attenuation, equivalent to not setting audioAttenuation.
   *  (0.5,1]: Strong attenuation mode (default is 1); volume and timbre attenuate rapidly.
   */
  audioAttenuation?: number;
}

/**
 * This class implements spatial audio by calculating user coordinates through the SDK.
 *
 * This class inherits from IBaseSpatialAudioEngine. Before calling other APIs under this class, you need to call the initialize method to initialize it.
 */
export abstract class ILocalSpatialAudioEngine {
  /**
   * @ignore
   */
  abstract release(): void;

  /**
   * Initializes ILocalSpatialAudioEngine.
   *
   * You need to call this method to initialize ILocalSpatialAudioEngine before calling other methods of the ILocalSpatialAudioEngine class.
   *  The SDK only supports creating one instance of ILocalSpatialAudioEngine per app.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract initialize(): number;

  /**
   * Updates the spatial position information of a remote user.
   *
   * After successfully calling this method, the SDK calculates spatial audio parameters based on the relative positions of the local and remote users. This method must be called after joinChannel.
   *
   * @param uid User ID. Must be the same as the user ID used when the user joined the channel.
   * @param posInfo Spatial position information of the remote user. See RemoteVoicePositionInfo.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Deletes the spatial position information of the specified remote user.
   *
   * After this method is successfully called, the local user will no longer hear the specified remote user.
   * To avoid wasting computational resources after leaving the channel, you need to call this method to remove the spatial position information of the specified remote user. Otherwise, the spatial position information of that user will be retained. When the number of remote users exceeds the maximum number of audio streams that can be received as set in setMaxAudioRecvCount, the SDK will automatically unsubscribe from the audio streams of the farthest users based on relative distance.
   *
   * @param uid User ID. Must match the user ID used when the user joined the channel.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
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
   * Sets the audio attenuation effect for the specified user.
   *
   * @param uid User ID. Must be the same as the user ID used when joining the channel.
   * @param attenuation The audio attenuation coefficient for the user. The range is [0,1].
   * @param forceSet Whether to force the audio attenuation effect for the user: true : Forces the use of attenuation to set the user's audio attenuation effect. In this case, the audioAttenuation set in SpatialAudioZone does not take effect for this user. false : Does not force the use of attenuation to set the user's audio attenuation effect. There are two cases:
   *  If the audio source and listener are inside and outside the sound insulation zone respectively, the attenuation effect is determined by audioAttenuation in SpatialAudioZone.
   *  If the audio source and listener are both inside the same sound insulation zone or both outside, the attenuation effect is determined by attenuation in this method.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteAudioAttenuation(
    uid: number,
    attenuation: number,
    forceSet: boolean
  ): number;

  /**
   * @ignore
   */
  abstract setZones(zones: SpatialAudioZone[], zoneCount: number): number;

  /**
   * @ignore
   */
  abstract setPlayerAttenuation(
    playerId: number,
    attenuation: number,
    forceSet: boolean
  ): number;

  /**
   * Deletes the spatial position information of all remote users.
   *
   * After successfully calling this method, the local user will no longer hear any remote users.
   * After leaving the channel, you can also call this method to delete all remote users' spatial position information to avoid wasting computing resources.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract clearRemotePositions(): number;
}
