import type { ViewProps } from 'react-native';

import { VideoCanvas } from './AgoraBase';
import { RtcConnection } from './IAgoraRtcEngineEx';
import IAgoraRtcRenderView from './internal/IAgoraRtcRenderView';
import AgoraRtcSurfaceViewNativeComponent from './specs/AgoraRtcSurfaceViewNativeComponent';
import AgoraRtcTextureViewNativeComponent from './specs/AgoraRtcTextureViewNativeComponent';

/**
 * Common properties of RtcSurfaceView and RtcTextureView.
 */
export interface RtcRendererViewProps extends ViewProps {
  /**
   * Local video display properties. See VideoCanvas.
   */
  canvas: VideoCanvas;

  /**
   * Connection information. See RtcConnection.
   */
  connection?: RtcConnection;
}

/**
 * Properties of RtcSurfaceView.
 */
export interface RtcSurfaceViewProps extends RtcRendererViewProps {
  /**
   * Whether to place the surface layer of the RtcSurfaceView above the window: true : Place above the window. false : Do not place above the window.
   */
  zOrderOnTop?: boolean;

  /**
   * Whether to place the surface layer of the RtcSurfaceView above another RtcSurfaceView in the window (but still below the window): true : Place above another RtcSurfaceView in the window. false : Do not place above the window.
   */
  zOrderMediaOverlay?: boolean;
}

/**
 * RtcSurfaceView class.
 *
 * This class is used for rendering:
 *  Android: Corresponds to the native SurfaceView of the Android system.
 *  iOS: Corresponds to the native UIView of the iOS system. To ensure rendering works, perform the following operations before calling this component depending on whether you have joined a channel:
 *  If not joined: Call startPreview first, then call enableVideo.
 *  If joined: Start capture first, then call enableVideo. Related references: RtcSurfaceViewProps RtcRendererViewProps
 */
export class RtcSurfaceView extends IAgoraRtcRenderView<RtcSurfaceViewProps> {
  /**
   * @ignore
   */
  get view() {
    return AgoraRtcSurfaceViewNativeComponent;
  }
}

/**
 * RtcTextureView class.
 *
 * This class is used for rendering. Corresponds to the native TextureView of the Android system.
 * To ensure rendering works, perform the following operations before calling this component depending on whether you have joined a channel:
 *  If not joined: Call startPreview first, then call enableVideo.
 *  If joined: Start capture first, then call enableVideo. Related reference: RtcRendererViewProps The RtcTextureView class is for Android only and not supported on iOS.
 */
export class RtcTextureView extends IAgoraRtcRenderView<RtcRendererViewProps> {
  /**
   * @ignore
   */
  get view() {
    return AgoraRtcTextureViewNativeComponent;
  }
}
