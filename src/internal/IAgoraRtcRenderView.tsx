import React, { Component } from 'react';
import { HostComponent, StyleSheet } from 'react-native';

import { VideoCanvas } from '../AgoraBase';
import { VideoSourceType } from '../AgoraMediaBase';
import { RtcRendererViewProps } from '../AgoraRtcRenderView';

import { RtcConnection } from '../IAgoraRtcEngineEx';

import { IrisApiParam } from './IrisApiEngine';

export function getFuncName(
  canvas: VideoCanvas,
  connection?: RtcConnection
): string {
  let funcName: string;

  if (canvas.sourceType === undefined) {
    if (canvas.uid) {
      funcName = 'RtcEngine_setupRemoteVideo_acc9c38';
    } else {
      funcName = 'RtcEngine_setupLocalVideo_acc9c38';
    }
  } else if (canvas.sourceType === VideoSourceType.VideoSourceRemote) {
    funcName = 'RtcEngine_setupRemoteVideo_acc9c38';
  } else {
    funcName = 'RtcEngine_setupLocalVideo_acc9c38';
  }

  if (funcName === 'RtcEngine_setupRemoteVideo_acc9c38' && connection) {
    funcName = 'RtcEngineEx_setupRemoteVideoEx_522a409';
  }
  return funcName;
}

export function getParams(props: RtcRendererViewProps): IrisApiParam {
  const { canvas, connection } = props;
  let { mediaPlayerId } = canvas;
  if (
    canvas.sourceType === VideoSourceType.VideoSourceMediaPlayer &&
    canvas.mediaPlayerId === undefined
  ) {
    mediaPlayerId = canvas.uid;
  }
  return {
    funcName: getFuncName(canvas, connection),
    params: JSON.stringify({
      canvas: {
        ...canvas,
        mediaPlayerId,
      },
      connection,
    }),
  };
}

export default abstract class IAgoraRtcRenderView<
  T extends RtcRendererViewProps
> extends Component<T> {
  abstract get view(): HostComponent<any>;

  render(): React.ReactElement {
    const { ...others } = this.props;
    const AgoraRtcRenderer = this.view;
    return (
      <AgoraRtcRenderer
        style={styles.renderer}
        callApi={getParams(this.props)}
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
