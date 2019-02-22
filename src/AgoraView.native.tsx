import React from 'react';
import {
    requireNativeComponent,
} from 'react-native'

import {
    AgoraViewProps
} from "./types.d";

const RCTAgoraView = requireNativeComponent("RCTAgoraView");

/**
 * @class AgoraView
 */
export default class AgoraView extends React.Component<AgoraViewProps> {
    public render(): JSX.Element {
        return (
            <RCTAgoraView { ...this.getHTMLProps() } />
        )
    }

    private getHTMLProps(): AgoraViewProps {
        let htmlProps = {} as AgoraViewProps;
        for (let key in this.props) {
            htmlProps[key] = this.props[key];
        }
        return htmlProps;
    }
}

