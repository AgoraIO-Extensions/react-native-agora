import { HostComponent, requireNativeComponent } from 'react-native';

import IAgoraRtcRenderView from './internal/IAgoraRtcRenderView';

const AgoraRtcSurfaceView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcSurfaceView'
);
const AgoraRtcTextureView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcTextureView'
);

/*
 * Properties of the RtcSurfaceView.
 */
export interface RtcSurfaceViewProps {
  /*
   * Controls whether to place the surface of the RtcSurfaceView on top of the window: true: Place it on top of the window.
   * false: Do not place it on top of another RtcSurfaceView in the window.
   */
  zOrderOnTop?: boolean;

  /*
   * Controls whether to place the surface of the RtcSurfaceView on top of another RtcSurfaceView in the window (but still behind the window): true: Place it on top of another RtcSurfaceView in the window.
   * false: Do not place it on top of another RtcSurfaceView in the window.
   */
  zOrderMediaOverlay?: boolean;
}

export class RtcSurfaceView extends IAgoraRtcRenderView<RtcSurfaceViewProps> {
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcSurfaceView;
  }
}

export class RtcTextureView extends IAgoraRtcRenderView<object> {
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcTextureView;
  }
}
