import React, {Component} from "react";
import {Platform, ViewProps} from "react-native";

import {
    RtcSurfaceView,
    RtcSurfaceViewProps,
    RtcTextureView,
    RtcTextureViewProps,
    RtcUidProps
} from "./src/RtcRenderView.native";


class SurfaceView extends Component<ViewProps & RtcSurfaceViewProps & RtcUidProps, {}> {
    render() {
        return (
            <RtcSurfaceView {...this.props}/>
        );
    }
}


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
