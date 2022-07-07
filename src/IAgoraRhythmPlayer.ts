/*
 * TODO(doc)
 */
export enum RhythmPlayerStateType {
  /*
   * TODO(doc)
   */
  RhythmPlayerStateIdle = 810,
  /*
   * TODO(doc)
   */
  RhythmPlayerStateOpening = 811,
  /*
   * TODO(doc)
   */
  RhythmPlayerStateDecoding = 812,
  /*
   * TODO(doc)
   */
  RhythmPlayerStatePlaying = 813,
  /*
   * TODO(doc)
   */
  RhythmPlayerStateFailed = 814,
}

/*
 * TODO(doc)
 */
export enum RhythmPlayerErrorType {
  /*
   * TODO(doc)
   */
  RhythmPlayerErrorOk = 0,
  /*
   * TODO(doc)
   */
  RhythmPlayerErrorFailed = 1,
  /*
   * TODO(doc)
   */
  RhythmPlayerErrorCanNotOpen = 801,
  /*
   * TODO(doc)
   */
  RhythmPlayerErrorCanNotPlay = 802,
  /*
   * TODO(doc)
   */
  RhythmPlayerErrorFileOverDurationLimit = 803,
}

/*
 *  虚拟节拍器配置。
 */
export class AgoraRhythmPlayerConfig {
  /*
   * 每小节的拍数，取值范围为 [1,9]。默认值为 4，即每小节包含 1 个强拍和 3 个弱拍。
   */
  beatsPerMeasure?: number;
  /*
   * 节拍速度（拍/分钟），取值范围为 [60,360]。默认值为 60，即 1 分钟有 60 拍。
   */
  beatsPerMinute?: number;
}
