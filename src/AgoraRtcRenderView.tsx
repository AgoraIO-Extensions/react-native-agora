import { HostComponent, requireNativeComponent } from 'react-native';

import IAgoraRtcRenderView from './internal/IAgoraRtcRenderView';

const AgoraRtcSurfaceView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcSurfaceView'
);
const AgoraRtcTextureView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcTextureView'
);

export interface RtcSurfaceViewProps {
  zOrderOnTop?: boolean;

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
