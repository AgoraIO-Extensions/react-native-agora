import { IVideoFrameMetaInfo, MetaInfoKey } from '../AgoraMediaBase';
import { IVideoFrameMetaInfoImpl } from '../impl/AgoraMediaBaseImpl';

export class VideoFrameMetaInfoInternal extends IVideoFrameMetaInfoImpl {
  private _VideoFrameMetaInfo: IVideoFrameMetaInfo | undefined;
  constructor(videoFrameMetaInfo: IVideoFrameMetaInfo | undefined) {
    super();
    this._VideoFrameMetaInfo = videoFrameMetaInfo;
  }

  override getMetaInfoStr(key: MetaInfoKey): string {
    // @ts-ignore
    return this._VideoFrameMetaInfo?.[key];
  }
}
