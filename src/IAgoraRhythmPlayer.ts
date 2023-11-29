import './extension/IAgoraRhythmPlayerExtension';
/**
 * Virtual metronome state.
 */
export enum RhythmPlayerStateType {
  /**
   * (810): The virtual metronome is not enabled or disabled already.
   */
  RhythmPlayerStateIdle = 810,
  /**
   * 811: Opening the beat files.
   */
  RhythmPlayerStateOpening = 811,
  /**
   * 812: Decoding the beat files.
   */
  RhythmPlayerStateDecoding = 812,
  /**
   * 813: The beat files are playing.
   */
  RhythmPlayerStatePlaying = 813,
  /**
   * 814: Failed to start virtual metronome. You can use the reported errorCode to troubleshoot the cause of the error, or you can try to start the virtual metronome again.
   */
  RhythmPlayerStateFailed = 814,
}

/**
 * @ignore
 */
export enum RhythmPlayerReason {
  /**
   * @ignore
   */
  RhythmPlayerReasonOk = 0,
  /**
   * @ignore
   */
  RhythmPlayerReasonFailed = 1,
  /**
   * @ignore
   */
  RhythmPlayerReasonCanNotOpen = 801,
  /**
   * @ignore
   */
  RhythmPlayerReasonCanNotPlay = 802,
  /**
   * @ignore
   */
  RhythmPlayerReasonFileOverDurationLimit = 803,
}

/**
 * The metronome configuration.
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
