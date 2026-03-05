import './extension/IAgoraRhythmPlayerExtension';

/**
 * Virtual metronome state.
 */
export enum RhythmPlayerStateType {
  /**
   * 810: The virtual metronome is not started or has been stopped.
   */
  RhythmPlayerStateIdle = 810,
  /**
   * 811: Opening the rhythm audio file.
   */
  RhythmPlayerStateOpening = 811,
  /**
   * 812: Decoding the rhythm audio file.
   */
  RhythmPlayerStateDecoding = 812,
  /**
   * 813: Playing the rhythm audio file.
   */
  RhythmPlayerStatePlaying = 813,
  /**
   * 814: Failed to start the virtual metronome. You can troubleshoot using the reported error code errorCode or try starting the virtual metronome again.
   */
  RhythmPlayerStateFailed = 814,
}

/**
 * Error information for the virtual metronome.
 */
export enum RhythmPlayerReason {
  /**
   * 0: The metronome audio file is playing normally, no error.
   */
  RhythmPlayerReasonOk = 0,
  /**
   * 1: General error with no specific reason.
   */
  RhythmPlayerReasonFailed = 1,
  /**
   * 801: Failed to open the metronome audio file.
   */
  RhythmPlayerReasonCanNotOpen = 801,
  /**
   * 802: Failed to play the metronome audio file.
   */
  RhythmPlayerReasonCanNotPlay = 802,
  /**
   * 803: The duration of the metronome audio file exceeds the limit. The maximum duration is 1.2 seconds.
   */
  RhythmPlayerReasonFileOverDurationLimit = 803,
}

/**
 * Virtual metronome configuration.
 */
export class AgoraRhythmPlayerConfig {
  /**
   * Number of beats per measure, range [1,9]. Default is 4, which includes 1 strong beat and 3 weak beats per measure.
   */
  beatsPerMeasure?: number;
  /**
   * Tempo (beats per minute), range [60,360]. Default is 60, i.e., 60 beats per minute.
   */
  beatsPerMinute?: number;
}
