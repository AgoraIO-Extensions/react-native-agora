import { HostComponent, requireNativeComponent } from 'react-native';

import IAgoraRtcRenderView from './internal/IAgoraRtcRenderView';
import { VideoCanvas } from './AgoraBase';
import { RtcConnection } from './IAgoraRtcEngineEx';

  /*
   * @ignore
   */
const AgoraRtcSurfaceView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcSurfaceView'
);
  /*
   * @ignore
   */
const AgoraRtcTextureView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcTextureView'
);

export interface RtcRendererViewProps {
  canvas: VideoCanvas;

  connection?: RtcConnection;
}

export interface RtcSurfaceViewProps extends RtcRendererViewProps {
  zOrderOnTop?: boolean;

  zOrderMediaOverlay?: boolean;
}

/*
 * The RtcSurfaceView class.
 * This class is used for rendering.Android: This class corresponds to the native SurfaceView.iOS: This class corresponds to the native UIView.To ensure the rendering of the image, before calling this component, you should proceed based on whether you are joining a channel:Not joining a channel: First call startPreview , and then call enableVideo .Joining a channel: First ensure capture is enabled, and then call enableVideo .
 */
export class RtcSurfaceView extends IAgoraRtcRenderView<RtcSurfaceViewProps> {
  /*
   * @ignore
   */
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcSurfaceView;
  }
}

/*
 * The RtcTextureView class.
 * This class is used for rendering and corresponds to the Android native TextureView.This class is only available for the Android platform.To ensure the rendering of the image, before calling this component, you should proceed based on whether you are joining a channel:Not joining a channel: First call startPreview , and then call enableVideo .Joining a channel: First ensure capture is enabled, and then call enableVideo .
 */
export class RtcTextureView extends IAgoraRtcRenderView<RtcRendererViewProps> {
  /*
   * @ignore
   */
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcTextureView;
  }
}