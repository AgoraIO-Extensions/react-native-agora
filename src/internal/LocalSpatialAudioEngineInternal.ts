import { RtcConnection } from '../IAgoraRtcEngineEx';
import { RemoteVoicePositionInfo } from '../IAgoraSpatialAudio';

import { ILocalSpatialAudioEngineImpl } from '../impl/IAgoraSpatialAudioImpl';

export class LocalSpatialAudioEngineInternal extends ILocalSpatialAudioEngineImpl {
  protected getApiTypeFromRelease(): string {
    return 'LocalSpatialAudioEngine_release';
  }

  protected getApiTypeFromSetMaxAudioRecvCount(maxCount: number): string {
    return 'LocalSpatialAudioEngine_setMaxAudioRecvCount';
  }

  protected getApiTypeFromSetAudioRecvRange(range: number): string {
    return 'LocalSpatialAudioEngine_setAudioRecvRange';
  }

  protected getApiTypeFromSetDistanceUnit(unit: number): string {
    return 'LocalSpatialAudioEngine_setDistanceUnit';
  }

  protected getApiTypeFromUpdateSelfPosition(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[]
  ): string {
    return 'LocalSpatialAudioEngine_updateSelfPosition';
  }

  protected getApiTypeFromUpdateSelfPositionEx(
    position: number[],
    axisForward: number[],
    axisRight: number[],
    axisUp: number[],
    connection: RtcConnection
  ): string {
    return 'LocalSpatialAudioEngine_updateSelfPositionEx';
  }

  protected getApiTypeFromUpdatePlayerPositionInfo(
    playerId: number,
    positionInfo: RemoteVoicePositionInfo
  ): string {
    return 'LocalSpatialAudioEngine_updatePlayerPositionInfo';
  }

  protected getApiTypeFromSetParameters(params: string): string {
    return 'LocalSpatialAudioEngine_setParameters';
  }

  protected getApiTypeFromMuteLocalAudioStream(mute: boolean): string {
    return 'LocalSpatialAudioEngine_muteLocalAudioStream';
  }

  protected getApiTypeFromMuteAllRemoteAudioStreams(mute: boolean): string {
    return 'LocalSpatialAudioEngine_muteAllRemoteAudioStreams';
  }
}
