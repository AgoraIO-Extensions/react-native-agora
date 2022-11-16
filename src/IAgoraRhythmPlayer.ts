import './extension/IAgoraRhythmPlayerExtension';
  /**
   * @ignore
   */
export enum RhythmPlayerStateType {
  /**
   * @ignore
   */
  RhythmPlayerStateIdle = 810,
  /**
   * @ignore
   */
  RhythmPlayerStateOpening = 811,
  /**
   * @ignore
   */
  RhythmPlayerStateDecoding = 812,
  /**
   * @ignore
   */
  RhythmPlayerStatePlaying = 813,
  /**
   * @ignore
   */
  RhythmPlayerStateFailed = 814,
}

  /**
   * @ignore
   */
export enum RhythmPlayerErrorType {
  /**
   * @ignore
   */
  RhythmPlayerErrorOk = 0,
  /**
   * @ignore
   */
  RhythmPlayerErrorFailed = 1,
  /**
   * @ignore
   */
  RhythmPlayerErrorCanNotOpen = 801,
  /**
   * @ignore
   */
  RhythmPlayerErrorCanNotPlay = 802,
  /**
   * @ignore
   */
  RhythmPlayerErrorFileOverDurationLimit = 803,
}

/**
 * The metronome configuration.
 *
 */
export class AgoraRhythmPlayerConfig {
/**
 * The number of beats per measure, which ranges from 1 to 9. The default value is 4, which means that each measure contains one downbeat and three upbeats.
 */
  beatsPerMeasure?: number;
/**
 * The beat speed (beats/minute), which ranges from 60 to 360. The default value is 60, which means that the metronome plays 60 beats in one minute.
 */
  beatsPerMinute?: number;
}