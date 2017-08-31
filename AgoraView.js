/**
 * Created by DB on 2017/6/23.
 */

import  React, {Component, PropTypes} from 'react'
import {
    requireNativeComponent,
    View,
    Platform
} from 'react-native'

export default class AgoraView extends Component {

    render() {
        return (
            <RCTAgoraView {...this.props}/>
        )
    }
}

AgoraView.propTypes = {
    showLocalVideo: PropTypes.bool,
    remoteUid: PropTypes.number,
    zOrderMediaOverlay: PropTypes.bool,
    ...View.propTypes
};

// AgoraView.name = "AgoraView";

const RCTAgoraView = requireNativeComponent("RCTAgoraView", AgoraView);