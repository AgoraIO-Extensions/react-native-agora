import React, { Component } from 'react';
import {
  View,
  PermissionsAndroid,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';

import RtcEngine, {
  RtcChannel,
  RtcLocalView,
  RtcRemoteView,
  ChannelProfile,
  ClientRole,
  ChannelMediaOptions,
} from 'react-native-agora';

const config = require('../../../agora.config.json');

interface State {
  renderChannelId: string;
  isJoined0: boolean;
  isJoined1: boolean;
  remoteUid0: number | undefined;
  remoteUid1: number | undefined;
}

const channelId0 = 'channel0';
const channelId1 = 'channel1';

export default class MultiChannel extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;
  _channel0: RtcChannel | undefined;
  _channel1: RtcChannel | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      renderChannelId: channelId0,
      isJoined0: false,
      isJoined1: false,
      remoteUid0: undefined,
      remoteUid1: undefined,
    };
  }

  UNSAFE_componentWillMount() {
    this._initEngine();
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.create(config.appId);

    await this._engine.enableVideo();
    await this._engine.startPreview();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
  };

  _joinChannel0 = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    this._channel0 = await RtcChannel.create(channelId0);
    this._addListener(this._channel0);

    await this._channel0.setClientRole(ClientRole.Broadcaster);
    await this._channel0.joinChannel(
      null,
      null,
      0,
      new ChannelMediaOptions(true, true)
    );
  };

  _joinChannel1 = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    this._channel1 = await RtcChannel.create(channelId1);
    this._addListener(this._channel1);

    await this._channel1.setClientRole(ClientRole.Broadcaster);
    await this._channel1.joinChannel(
      null,
      null,
      0,
      new ChannelMediaOptions(true, true)
    );
  };

  _addListener = (rtcChannel: RtcChannel) => {
    const { channelId } = rtcChannel;
    rtcChannel.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      if (channelId === channelId0) {
        this.setState({ isJoined0: true });
      } else if (channelId === channelId1) {
        this.setState({ isJoined1: true });
      }
    });
    rtcChannel.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', channelId, uid, elapsed);
      if (channelId === channelId0) {
        this.setState({ remoteUid0: uid });
      } else if (channelId === channelId1) {
        this.setState({ remoteUid1: uid });
      }
    });
    rtcChannel.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', channelId, uid, reason);
      if (channelId === channelId0) {
        if (uid === this.state.remoteUid0) {
          this.setState({ remoteUid0: undefined });
        }
      } else if (channelId === channelId1) {
        if (uid === this.state.remoteUid1) {
          this.setState({ remoteUid1: undefined });
        }
      }
    });
    rtcChannel.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', channelId, stats);
      if (channelId === channelId0) {
        this.setState({ isJoined0: false, remoteUid0: undefined });
      } else if (channelId === channelId1) {
        this.setState({ isJoined1: false, remoteUid1: undefined });
      }
    });
  };

  _publishChannel0 = async () => {
    await this._channel1?.unpublish();
    await this._channel0?.publish();
  };

  _publishChannel1 = async () => {
    await this._channel0?.unpublish();
    await this._channel1?.publish();
  };

  _leaveChannel0 = async () => {
    await this._channel0?.leaveChannel();
  };

  _leaveChannel1 = async () => {
    await this._channel1?.leaveChannel();
  };

  render() {
    const { isJoined0, isJoined1 } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.bottom}>
          <Button
            onPress={isJoined0 ? this._leaveChannel0 : this._joinChannel0}
            title={`${isJoined0 ? 'Leave' : 'Join'} ${channelId0}`}
          />
          <Button
            onPress={isJoined1 ? this._leaveChannel1 : this._joinChannel1}
            title={`${isJoined1 ? 'Leave' : 'Join'} ${channelId1}`}
          />
        </View>
        {this._renderVideo()}
        <View style={styles.float}>
          <Button
            onPress={this._publishChannel0}
            title={`Pulish ${channelId0}`}
          />
          <Button
            onPress={() => {
              this.setState({ renderChannelId: channelId0 });
            }}
            title={`Render ${channelId0}`}
          />
          <Button
            onPress={this._publishChannel1}
            title={`Pulish ${channelId1}`}
          />
          <Button
            onPress={() => {
              this.setState({ renderChannelId: channelId1 });
            }}
            title={`Render ${channelId1}`}
          />
        </View>
      </View>
    );
  }

  _renderVideo = () => {
    const { renderChannelId, remoteUid0, remoteUid1 } = this.state;
    let remoteUid: number | undefined;
    if (renderChannelId === channelId0) {
      remoteUid = remoteUid0;
    } else if (renderChannelId === channelId1) {
      remoteUid = remoteUid1;
    }
    return (
      <View style={styles.container}>
        <RtcLocalView.SurfaceView
          style={styles.local}
          channelId={renderChannelId}
        />
        {remoteUid !== undefined && (
          <RtcRemoteView.SurfaceView
            style={styles.remote}
            channelId={renderChannelId}
            uid={remoteUid}
          />
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    width: '30%',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  bottom: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  local: {
    flex: 1,
  },
  remote: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
