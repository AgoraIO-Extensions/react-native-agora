import React, {Component} from "react";
import {Platform, requireNativeComponent, ViewProps} from "react-native";

import {VideoMirrorMode, VideoRenderMode} from "./Types";

/**
 * Properties of the uid.
 * @property uid: int | User ID.
 */
interface RtcUidProps {
    uid: number;
}

/**
 * Properties of the SurfaceView.
 * @property zOrderMediaOverlay: boolean | Control whether the surface view's surface is placed on top of another regular surface view in the window (but still behind the window itself).
 * @property zOrderOnTop: boolean | Control whether the surface view's surface is placed on top of its window.
 * @property renderMode: number | The rendering mode of the video view.
 * @see VideoRenderMode
 * @property channelId: string | The unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
 * - All lowercase English letters: a to z.
 * - All uppercase English letters: A to Z.
 * - All numeric characters: 0 to 9.
 * - The space character.
 * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
 * Note
 * - The default value is the empty string "". Use the default value if the user joins the channel using the joinChannel method in the RtcEngine class.
 * @see RtcEngine.joinChannel
 * - If the user joins the channel using the joinChannel method in the RtcChannel class, set this parameter as the channelId of the RtcChannel object.
 * @see RtcChannel.joinChannel
 * @property mirrorMode: number | The video mirror mode.
 * @see VideoMirrorMode
 */
interface RtcSurfaceViewProps extends ViewProps {
    zOrderMediaOverlay?: boolean;
    zOrderOnTop?: boolean;
    renderMode?: VideoRenderMode;
    channelId?: string;
    mirrorMode?: VideoMirrorMode;
}

/**
 * Properties of the TextureView.
 * @property channelId: string | The unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
 * - All lowercase English letters: a to z.
 * - All uppercase English letters: A to Z.
 * - All numeric characters: 0 to 9.
 * - The space character.
 * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
 * Note
 * - The default value is the empty string "". Use the default value if the user joins the channel using the joinChannel method in the RtcEngine class.
 * @see RtcEngine.joinChannel
 * - If the user joins the channel using the joinChannel method in the RtcChannel class, set this parameter as the channelId of the RtcChannel object.
 * @see RtcChannel.joinChannel
 * @property mirror: boolean | The video mirror.
 */
interface RtcTextureViewProps extends ViewProps {
    channelId?: string;
    mirror?: boolean;
}

const RCTRtcSurfaceView = requireNativeComponent('RCTAgoraRtcSurfaceView');

class RtcSurfaceView extends Component<RtcSurfaceViewProps & RtcUidProps, {}> {
    render() {
        return (
            <RCTRtcSurfaceView {...this.props}/>
        )
    }
}

const RCTRtcTextureView = requireNativeComponent('RCTAgoraRtcTextureView');

class RtcTextureView extends Component<RtcTextureViewProps & RtcUidProps, {}> {
    render() {
        return (
            <RCTRtcTextureView {...this.props}/>
        )
    }
}

/**
 * View for preview local video.
 */
export namespace RtcLocalView {
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

/**
 * View for render remote video.
 */
export namespace RtcRemoteView {
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
