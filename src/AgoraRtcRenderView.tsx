import { HostComponent, requireNativeComponent } from '';

import IAgoraRtcRenderView from './internal/IAgoraRtcRenderView';

const AgoraRtcSurfaceView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcSurfaceView'
);
const AgoraRtcTextureView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcTextureView'
);

/*
 *  RtcSurfaceView 的属性。
 */
export interface RtcSurfaceViewProps {
  zOrderOnTop?: boolean;

  zOrderMediaOverlay?: boolean;
}

/*
 * RtcSurfaceView 类。
 * 该类用于渲染： Android: 对应 Android 系统原生的 SurfaceView。 iOS: 对应 iOS 系统原生的 UIView。
 */
export class RtcSurfaceView extends IAgoraRtcRenderView<RtcSurfaceViewProps> {
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcSurfaceView;
  }
}

/*
 * RtcTextureView 类。
 * 该类用于渲染。对应 Android 系统原生的 TextureView。
 * RtcTextureView 类仅适用于 Android 平台，不适用于 iOS 平台。
 */
export class RtcTextureView extends IAgoraRtcRenderView<object> {
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcTextureView;
  }
}
