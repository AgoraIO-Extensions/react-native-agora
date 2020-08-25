import React, {Component} from "react";
import {requireNativeComponent, ViewProps} from "react-native";

import {VideoMirrorMode, VideoRenderMode} from "./Enums";

/**
 * Properties of the uid.
 */
export interface RtcUidProps {
    /** User ID. */
    uid: number;
}

<<<<<<< HEAD
export interface RtcSurfaceViewProps extends ViewProps {
    /**
     * Controls whether the surface view's surface is placed on top of another regular surface
     * view in the window (but still behind the window itself).
     */
=======
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
export interface RtcSurfaceViewProps {
>>>>>>> rc/3.0.1
    zOrderMediaOverlay?: boolean;
    /**
     * Controls whether the surface view's surface is placed on top of its window.
     */
    zOrderOnTop?: boolean;
    /**
     * The rendering mode of the video view.
     */
    renderMode?: VideoRenderMode;
    /**
     * The unique channel name for the AgoraRTC session in the string format.
     * The string length must be less than 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     *
     * **Note**
     * - The default value is the empty string "". Use the default value if the user joins the channel using the [`joinChannel`]{@link RtcChannel.joinChannel} method in the `RtcEngine` class.
     * - If the user joins the channel using the [`joinChannel`]{@link RtcChannel.joinChannel} method in the `RtcChannel` class, set this parameter as the `channelId` of the `RtcChannel object.
     */
    channelId?: string;
    /** The video mirror mode. */
    mirrorMode?: VideoMirrorMode;
}

/**
 * Properties of the TextureView.
 */
<<<<<<< HEAD
export interface RtcTextureViewProps extends ViewProps {
    /**
     * The unique channel name for the AgoraRTC session in the string format.
     * The string length must be less than 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     *
     * **Note**
     * - The default value is the empty string "". Use the default value if the user joins the channel using the [`joinChannel`]{@link RtcChannel.joinChannel} method in the RtcEngine class.
     * - If the user joins the channel using the [`joinChannel`]{@link RtcChannel.joinChannel} method in the `RtcChannel` class, set this parameter as the `channelId` of the `RtcChannel object.
     */
=======
export interface RtcTextureViewProps {
>>>>>>> rc/3.0.1
    channelId?: string;
    /** The video mirror. */
    mirror?: boolean;
}

/**
 * @ignore
 */
const RCTRtcSurfaceView = requireNativeComponent('RCTAgoraRtcSurfaceView');

/**
 * @ignore
 */
export class RtcSurfaceView extends Component<ViewProps & RtcSurfaceViewProps & RtcUidProps, {}> {
    render() {
        const {channelId = null, uid, ...others} = this.props
        return (
            <RCTRtcSurfaceView
                key={`surface-${channelId}-${uid}`}
                data={{channelId, uid}}
                {...others}/>
        )
    }
}

/**
 * @ignore
 */
const RCTRtcTextureView = requireNativeComponent('RCTAgoraRtcTextureView');

/**
 * @ignore
 */
export class RtcTextureView extends Component<ViewProps & RtcTextureViewProps & RtcUidProps, {}> {
    render() {
        const {channelId = null, uid, ...others} = this.props
        return (
            <RCTRtcTextureView
                key={`texture-${channelId}-${uid}`}
                data={{channelId, uid}}
                {...others}/>
        )
    }
}
