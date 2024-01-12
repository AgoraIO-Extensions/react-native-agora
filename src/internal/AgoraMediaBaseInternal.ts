import { IVideoFrameMetaInfo, MetaInfoKey } from '../AgoraMediaBase';
import { IVideoFrameMetaInfoImpl } from '../impl/AgoraMediaBaseImpl';

export class VideoFrameMetaInfoInternal extends IVideoFrameMetaInfoImpl {
  private _videoFrameMetaInfo: IVideoFrameMetaInfo | undefined;
  constructor(videoFrameMetaInfo: IVideoFrameMetaInfo | undefined) {
    super();
    this._videoFrameMetaInfo = videoFrameMetaInfo;
  }

  override getMetaInfoStr(key: MetaInfoKey): string {
    // @ts-ignore
    return this._videoFrameMetaInfo?.[key];
  }
}
