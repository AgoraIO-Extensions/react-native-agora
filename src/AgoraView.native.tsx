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

const RCTAgoraView = requireNativeComponent("RCTAgoraView");

/**
 * AgoraView is the render layer for rendering video stream
 *
 * This class is used to rendering native sdk stream
 *
 * @props {@link AgoraViewProps}
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

