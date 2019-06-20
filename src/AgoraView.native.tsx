import React from 'react';
import {
    requireNativeComponent,
} from 'react-native'

import {
    AgoraViewProps
} from "./types";

/**
 * Import RCTAgoraView from native binding.
 *
 * This @object is used to bridge native layer between react layer.
 */

const RCTAgoraView = requireNativeComponent("RCTAgoraVideoView");

/**
 * AgoraView is the render layer for rendering video stream
 *
 * This class is used to rendering native sdk stream
 *
 * @props {@link AgoraViewProps}
 * 
 * @descrption AgoraViewProps has four properties.
 * @property number: mode, this property will setup video render mode. there is two avaliable mode {hidden: 1, fit: 2}, you could see more details [https://docs.agora.io/en/Interactive%20Broadcast/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#ac08882c4d0ec47b329900df169493673](#here)
 * @property boolean: showLocalVideo, this property will render local video, NOTICE: IF YOU SET showLocalVideo YOU CANNOT SET remoteUid
 * @property number: remoteUid, this property will render video with remote uid, NOTICE: IF YOU SET remoteUid YOU CANNOT SET showLocalVideo
 * @property boolean: zOrderMediaOverlay, this property will working for android side and it likes zIndex behaviour on web side.
 */
export default class AgoraView extends React.Component<AgoraViewProps> {
    /**
     * render
     *
     * It would render view for VideoStream
     */
    public render(): JSX.Element {
        return (
            <RCTAgoraView { ...this.getHTMLProps() } />
        )
    }

    /**
     * getHTMLProps
     *
     * get agora view props
     */
    private getHTMLProps(): AgoraViewProps {
        let htmlProps = {} as AgoraViewProps;
        for (let key in this.props) {
            htmlProps[key] = this.props[key];
        }
        return htmlProps;
    }
}

