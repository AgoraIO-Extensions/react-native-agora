import React, { Component } from 'react';
import { Platform, ViewProps } from 'react-native';

import {
  RtcSurfaceView,
  RtcSurfaceViewProps,
  RtcTextureView,
  RtcTextureViewProps,
  RtcUidProps,
} from './common/RtcRenderView.native';

/**
 * The SurfaceView class.
 *
 * @noInheritDoc
 */
class SurfaceView extends Component<
  ViewProps & RtcSurfaceViewProps & RtcUidProps,
  {}
> {
  render() {
    return <RtcSurfaceView {...this.props} />;
  }
}

/**
 * The TextureView class.
 *
 * **Note**
 *
 * TextureView is supported on Android only. iOS does not support TextureView.
 * @noInheritDoc
 */
class TextureView extends Component<
  ViewProps & RtcTextureViewProps & RtcUidProps,
  {}
> {
  render() {
    if (Platform.OS === 'ios')
      throw new Error('TextureView not support for iOS');
    return <RtcTextureView {...this.props} />;
  }
}

/**
 * View for rendering remote video.
 */
export default {
  SurfaceView,
  TextureView,
};
