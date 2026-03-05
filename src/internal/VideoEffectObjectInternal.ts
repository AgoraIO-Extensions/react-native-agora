import { IVideoEffectObjectImpl } from '../impl/IAgoraRtcEngineImpl';

export class VideoEffectObjectInternal extends IVideoEffectObjectImpl {
  private readonly _videoEffectObjectId: number;

  constructor(videoEffectObjectId: number) {
    super();
    this._videoEffectObjectId = videoEffectObjectId;
  }

  getVideoEffectObjectId(): number {
    return this._videoEffectObjectId;
  }
}
