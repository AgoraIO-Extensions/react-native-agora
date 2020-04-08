import { Component } from "react";
import { ViewProps } from "react-native";
export interface RtcSurfaceViewProps extends ViewProps {
    zOrderMediaOverlay?: boolean;
    zOrderOnTop?: boolean;
    renderMode?: number;
    channelId?: string;
    mirrorMode?: number;
    uid?: number;
}
export interface RtcTextureViewProps extends ViewProps {
    mirror?: number;
    uid?: number;
}
export declare namespace RtcPreviewView {
    class SurfaceView extends Component<RtcSurfaceViewProps, {}> {
        render(): JSX.Element;
    }
    class TextureView extends Component<RtcTextureViewProps, {}> {
        render(): JSX.Element;
    }
}
export declare namespace RtcRemoteView {
    class SurfaceView extends Component<RtcSurfaceViewProps, {}> {
        render(): JSX.Element;
    }
    class TextureView extends Component<RtcTextureViewProps, {}> {
        render(): JSX.Element;
    }
}
