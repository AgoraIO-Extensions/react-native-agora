import React, {Component} from "react";
import {Platform, ViewProps} from "react-native";

import {
    RtcSurfaceView,
    RtcSurfaceViewProps,
    RtcTextureView,
    RtcTextureViewProps,
    RtcUidProps
} from "./src/RtcRenderView.native";

/**
 * Use SurfaceView in Android.
 * Use UIView in iOS.
 */
class SurfaceView extends Component<ViewProps & RtcSurfaceViewProps & RtcUidProps, {}> {
    render() {
        return (
            <RtcSurfaceView {...this.props}/>
        );
    }
}

/**
 * Use TextureView in Android.
 * Not support for iOS.
 */
class TextureView extends Component<ViewProps & RtcTextureViewProps & RtcUidProps, {}> {
    render() {
        if (Platform.OS === 'ios')
            throw new Error('TextureView not support for iOS')
        return (
            <RtcTextureView {...this.props}/>
        );
    }
}

/**
 * View for render remote video.
 */
export default {
    SurfaceView,
    TextureView
}
