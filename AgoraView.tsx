import React from 'react';
import {
    requireNativeComponent,
} from 'react-native'

import {
    IAgoraViewProps
} from "./types.d";


export default class AgoraView extends React.Component<IAgoraViewProps> {
    render() {
        return (
            <RCTAgoraView {...this.props}/>
        )
    }
}

const RCTAgoraView = requireNativeComponent("RCTAgoraView");
