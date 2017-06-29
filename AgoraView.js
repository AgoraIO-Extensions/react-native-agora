/**
 * Created by DB on 2017/6/23.
 */

import  React, {Component, PropTypes} from 'react'
import {
    requireNativeComponent,
    View
} from 'react-native'

export default class AgoraView extends Component {

    render() {
        return (
            <RCTAgoraView {...this.props}/>
        )
    }
}

AgoraView.propTypes = {
    localUid: PropTypes.number,
    remoteUid: PropTypes.number,
    ...View.propTypes
};

// AgoraView.name = "AgoraView";

const RCTAgoraView = requireNativeComponent("RCTAgoraView", AgoraView);