import './extension/IAgoraRhythmPlayerExtension';
/* enum_rhythmplayerstatetype */
export enum RhythmPlayerStateType {
/* enum_rhythmplayerstatetype_RhythmPlayerStateIdle */
RhythmPlayerStateIdle = 810,
/* enum_rhythmplayerstatetype_RhythmPlayerStateOpening */
RhythmPlayerStateOpening = 811,
/* enum_rhythmplayerstatetype_RhythmPlayerStateDecoding */
RhythmPlayerStateDecoding = 812,
/* enum_rhythmplayerstatetype_RhythmPlayerStatePlaying */
RhythmPlayerStatePlaying = 813,
/* enum_rhythmplayerstatetype_RhythmPlayerStateFailed */
RhythmPlayerStateFailed = 814,
}

/* enum_rhythmplayererrortype */
export enum RhythmPlayerErrorType {
/* enum_rhythmplayererrortype_RhythmPlayerErrorOk */
RhythmPlayerErrorOk = 0,
/* enum_rhythmplayererrortype_RhythmPlayerErrorFailed */
RhythmPlayerErrorFailed = 1,
/* enum_rhythmplayererrortype_RhythmPlayerErrorCanNotOpen */
RhythmPlayerErrorCanNotOpen = 801,
/* enum_rhythmplayererrortype_RhythmPlayerErrorCanNotPlay */
RhythmPlayerErrorCanNotPlay = 802,
/* enum_rhythmplayererrortype_RhythmPlayerErrorFileOverDurationLimit */
RhythmPlayerErrorFileOverDurationLimit = 803,
}

/* class_agorarhythmplayerconfig */
export class AgoraRhythmPlayerConfig {
  /* class_agorarhythmplayerconfig_beatsPerMeasure */
  beatsPerMeasure?: number
  /* class_agorarhythmplayerconfig_beatsPerMinute */
  beatsPerMinute?: number
}
