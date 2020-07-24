import React, {Component} from "react";
import {Platform} from "react-native";

import {RtcSurfaceView, RtcSurfaceViewProps, RtcTextureView, RtcTextureViewProps} from "./src/RtcRenderView.native";

namespace RtcLocalView {
    /**
     * Use SurfaceView in Android.
     * Use UIView in iOS.
     */
    export class SurfaceView extends Component<RtcSurfaceViewProps, {}> {
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
    export class TextureView extends Component<RtcTextureViewProps, {}> {
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
}

export default RtcLocalView
