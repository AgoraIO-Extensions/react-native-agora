import React, { Component } from 'react';
import { Platform, ViewProps } from 'react-native';

import {
  RtcSurfaceView,
  RtcSurfaceViewProps,
  RtcTextureView,
  RtcTextureViewProps,
} from './common/RtcRenderView.native';

/**
 * The SurfaceView class.
 *
 * **Note**
 *
 * SurfaceView is supported on Android only. Use [UIView](https://developer.apple.com/documentation/uikit/uiview) on iOS.
 *
 * @noInheritDoc
 */
class SurfaceView extends Component<ViewProps & RtcSurfaceViewProps, {}> {
  render() {
    return <RtcSurfaceView {...this.props} uid={0} />;
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
class TextureView extends Component<ViewProps & RtcTextureViewProps, {}> {
  render() {
    if (Platform.OS === 'ios')
      throw new Error('TextureView not support for iOS');
    return <RtcTextureView {...this.props} uid={0} />;
  }
}

/**
 * View for previewing local video.
 */
export default {
  SurfaceView,
  TextureView,
};
