import { HostComponent, requireNativeComponent } from 'react-native';

import IAgoraRtcRenderView from './internal/IAgoraRtcRenderView';
import { VideoCanvas } from './AgoraBase';
import { RtcConnection } from './IAgoraRtcEngineEx';

const AgoraRtcSurfaceView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcSurfaceView'
);
const AgoraRtcTextureView = requireNativeComponent<{ callApi: object }>(
  'AgoraRtcTextureView'
);

/**
 * A common property for RtcSurfaceView and RtcTextureView .
 */
export interface RtcRendererViewProps {
  /**
   * The local video view and settings. See VideoCanvas .
   */
  canvas: VideoCanvas;

  /**
   * The connection infomation. See RtcConnection .
   */
  connection?: RtcConnection;
}

/**
 * Properties of the RtcSurfaceView.
 */
export interface RtcSurfaceViewProps extends RtcRendererViewProps {
  /**
   * Controls whether to place the surface of the RtcSurfaceView on top of the window:true: Place it on top of the window.false: Do not place it on top of another RtcSurfaceView in the window.
   */
  zOrderOnTop?: boolean;

  /**
   * Controls whether to place the surface of the RtcSurfaceView on top of another RtcSurfaceView in the window (but still behind the window):true: Place it on top of another RtcSurfaceView in the window.false: Do not place it on top of another RtcSurfaceView in the window.
   */
  zOrderMediaOverlay?: boolean;
}

/**
 * The RtcSurfaceView class.
 * This class is used for rendering.Android: This class corresponds to the native SurfaceView.iOS: This class corresponds to the native UIView.To ensure the rendering of the image, before calling this component, you should proceed based on whether you are joining a channel:Not joining a channel: First call startPreview , and then call enableVideo .Joining a channel: First ensure capture is enabled, and then call enableVideo .
 */
export class RtcSurfaceView extends IAgoraRtcRenderView<RtcSurfaceViewProps> {
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcSurfaceView;
  }
}

/**
 * The RtcTextureView class.
 * This class is used for rendering and corresponds to the Android native TextureView.This class is only available for the Android platform.To ensure the rendering of the image, before calling this component, you should proceed based on whether you are joining a channel:Not joining a channel: First call startPreview , and then call enableVideo .Joining a channel: First ensure capture is enabled, and then call enableVideo .
 */
export class RtcTextureView extends IAgoraRtcRenderView<RtcRendererViewProps> {
  get view(): HostComponent<{ callApi: object }> {
    return AgoraRtcTextureView;
  }
}
