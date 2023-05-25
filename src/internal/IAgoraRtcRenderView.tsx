import React, { Component } from 'react';
import { HostComponent, StyleSheet } from 'react-native';

import { VideoSourceType } from '../AgoraMediaBase';
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
    const { canvas, connection } = props;
    let { mediaPlayerId } = canvas;
    if (
      canvas.sourceType === VideoSourceType.VideoSourceMediaPlayer &&
      canvas.mediaPlayerId === undefined
    ) {
      mediaPlayerId = canvas.uid;
    }
    return {
      funcName: this.funcName,
      params: JSON.stringify({
        canvas: {
          ...canvas,
          mediaPlayerId,
        },
        connection,
      }),
    };
  }

  render() {
    const { canvas, connection, ...others } = this.props;
    const AgoraRtcRenderer = this.view;
    return (
      <AgoraRtcRenderer
        style={styles.renderer}
        callApi={this.params({ canvas, connection })}
        {...others}
      />
    );
  }
}

const styles = StyleSheet.create({
  renderer: {
    flex: 1,
  },
});
