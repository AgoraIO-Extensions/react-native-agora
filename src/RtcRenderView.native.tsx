import React, {Component} from "react";
import {requireNativeComponent, ViewProps} from "react-native";

export interface RtcSurfaceViewProps extends ViewProps {
    zOrderMediaOverlay?: boolean;
    zOrderOnTop?: boolean;
    renderMode?: number;
    channelId?: string;
    mirrorMode?: number;
    uid?: number;
}

const RCTRtcSurfaceView = requireNativeComponent('RCTAgoraRtcSurfaceView');

class RtcSurfaceView extends Component<RtcSurfaceViewProps, {}> {
    render() {
        return (
            <RCTRtcSurfaceView {...this.props}/>
        )
    }
}

export interface RtcTextureViewProps extends ViewProps {
    mirror?: number;
    uid?: number;
}

const RCTRtcTextureView = requireNativeComponent('RCTAgoraRtcTextureView');

class RtcTextureView extends Component<RtcTextureViewProps, {}> {
    render() {
        return (
            <RCTRtcTextureView {...this.props}/>
        )
    }
}

export namespace RtcPreviewView {
    export class SurfaceView extends Component<RtcSurfaceViewProps, {}> {
        render() {
            return (
                <RtcSurfaceView
                    {...this.props}
                    uid={0}/>
            );
        }
    }

    export class TextureView extends Component<RtcTextureViewProps, {}> {
        render() {
            return (
                <RtcTextureView
                    {...this.props}
                    uid={0}/>
            );
        }
    }
}

export namespace RtcRemoteView {
    export class SurfaceView extends Component<RtcSurfaceViewProps, {}> {
        render() {
            return (
                <RtcSurfaceView {...this.props}/>
            );
        }
    }

    export class TextureView extends Component<RtcTextureViewProps, {}> {
        render() {
            return (
                <RtcTextureView {...this.props}/>
            );
        }
    }
}
