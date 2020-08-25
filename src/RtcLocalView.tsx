import React, {Component} from "react";
import {Platform, ViewProps} from "react-native";

import {RtcSurfaceView, RtcSurfaceViewProps, RtcTextureView, RtcTextureViewProps} from "./src/RtcRenderView.native";

/**
 * Use SurfaceView in Android.
 * Use UIView in iOS.
 */
class SurfaceView extends Component<ViewProps & RtcSurfaceViewProps, {}> {
    render() {
        return (
            <RtcSurfaceView
                {...this.props}
                uid={0}/>
        );
    }
}

/**
 * Use TextureView in Android.
 * Not support for iOS.
 */
class TextureView extends Component<ViewProps & RtcTextureViewProps, {}> {
    render() {
        if (Platform.OS === 'ios')
            throw new Error('TextureView not support for iOS')
        return (
            <RtcTextureView
                {...this.props}
                uid={0}/>
        );
    }
}

/**
 * View for preview local video.
 */
export default {
    SurfaceView,
    TextureView
}
