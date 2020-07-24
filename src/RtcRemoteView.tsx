import React, {Component} from "react";
import {Platform} from "react-native";

import {
    RtcSurfaceView,
    RtcSurfaceViewProps,
    RtcTextureView,
    RtcTextureViewProps,
    RtcUidProps
} from "./src/RtcRenderView.native";

namespace RtcRemoteView {
    /**
     * Use SurfaceView in Android.
     * Use UIView in iOS.
     */
    export class SurfaceView extends Component<RtcSurfaceViewProps & RtcUidProps, {}> {
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
    export class TextureView extends Component<RtcTextureViewProps & RtcUidProps, {}> {
        render() {
            if (Platform.OS === 'ios')
                throw new Error('TextureView not support for iOS')
            return (
                <RtcTextureView {...this.props}/>
            );
        }
    }
}

export default RtcRemoteView
