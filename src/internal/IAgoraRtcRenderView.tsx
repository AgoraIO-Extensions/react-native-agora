import React, { Component } from 'react';
import { HostComponent, ViewProps } from 'react-native';

import { VideoSourceType } from '../AgoraBase';
import { RtcRendererViewProps } from '../AgoraRtcRenderView';

export default abstract class IAgoraRtcRenderView<
  T extends RtcRendererViewProps
> extends Component<ViewProps & T, object> {
  abstract get view(): HostComponent<{ callApi: object }>;

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

  params(props: RtcRendererViewProps): object {
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
      // @ts-ignore
      <AgoraRtcRenderer
        callApi={this.params({ canvas, connection })}
        {...others}
      />
    );
  }
}
