import React, { Component } from 'react';
import {
  View,
  TextInput,
  PermissionsAndroid,
  StyleSheet,
  Button,
  Platform,
} from 'react-native';

import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  ChannelProfile,
  ClientRole,
} from 'react-native-agora';

const config = require('../../../agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number | undefined;
  switchCamera: boolean;
}

export default class JoinChannelAudio extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      remoteUid: undefined,
      switchCamera: false,
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
    this._addListeners();

    await this._engine.enableVideo();
    await this._engine.startPreview();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      this.setState({ isJoined: true });
    });
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      this.setState({ remoteUid: uid });
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      if (uid === this.state.remoteUid) {
        this.setState({ remoteUid: undefined });
      }
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      this.setState({ isJoined: false, remoteUid: undefined });
    });
  };

  _joinChannel = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    await this._engine?.joinChannel(
      config.token,
      this.state.channelId,
      null,
      0
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
  };

  _switchCamera = () => {
    const { switchCamera } = this.state;
    this._engine
      ?.switchCamera()
      .then(() => {
        this.setState({ switchCamera: !switchCamera });
      })
      .catch((err) => {
        console.warn('switchCamera', err);
      });
  };

  render() {
    const { channelId, isJoined, switchCamera } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.bottom}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ channelId: text })}
            placeholder={'Channel ID'}
            value={channelId}
          />
          <Button
            onPress={isJoined ? this._leaveChannel : this._joinChannel}
            title={`${isJoined ? 'Leave' : 'Join'} channel`}
          />
        </View>
        {this._renderVideo()}
        <View style={styles.float}>
          <Button
            onPress={this._switchCamera}
            title={`Camera ${switchCamera ? 'front' : 'rear'}`}
          />
        </View>
      </View>
    );
  }

  _renderVideo = () => {
    const { remoteUid } = this.state;
    return (
      <View style={styles.container}>
        <RtcLocalView.SurfaceView style={styles.local} />
        {remoteUid !== undefined && (
          <RtcRemoteView.SurfaceView
            style={styles.remote}
            uid={remoteUid}
            zOrderMediaOverlay={true}
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
