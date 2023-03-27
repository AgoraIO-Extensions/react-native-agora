import React, { Component } from 'react';
import { HostComponent } from 'react-native';

import { VideoSourceType } from '../AgoraBase';
import { RtcRendererViewProps } from '../AgoraRtcRenderView';
import { IrisApiParam } from './IrisApiEngine';

export default abstract class IAgoraRtcRenderView<
  T extends RtcRendererViewProps
> extends Component<T> {
  abstract get view(): HostComponent<any>;

  get funcName(): string {
    let funcName: string;

    const { canvas, connection } = this.props;
    if (canvas.sourceType === undefined) {
      if (canvas.uid) {
        funcName = 'RtcEngine_setupRemoteVideo';
      } else {
        funcName = 'RtcEngine_setupLocalVideo';
      }
    } else if (canvas.sourceType === VideoSourceType.VideoSourceMediaPlayer) {
      funcName = 'MediaPlayer_setView';
    } else if (canvas.sourceType === VideoSourceType.VideoSourceRemote) {
      funcName = 'RtcEngine_setupRemoteVideo';
    } else {
      funcName = 'RtcEngine_setupLocalVideo';
    }

    if (funcName === 'RtcEngine_setupRemoteVideo' && connection) {
      funcName = 'RtcEngineEx_setupRemoteVideoEx';
    }
    return funcName;
  }

  params(props: RtcRendererViewProps): IrisApiParam {
    return {
      funcName: this.funcName,
      params: JSON.stringify({
        canvas: props.canvas,
        connection: props.connection,
        playerId: props.canvas.uid,
      }),
    };
  }

  render() {
    const { canvas, connection, ...others } = this.props;
    const AgoraRtcRenderer = this.view;
    return (
      <AgoraRtcRenderer
        callApi={this.params({ canvas, connection })}
        {...others}
      />
    );
  }
}
