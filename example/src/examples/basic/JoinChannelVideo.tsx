import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineConfig,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';

const config = require('../../../agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number[];
  switchCamera: boolean;
  switchRender: boolean;
}

export default class JoinChannelAudio extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      remoteUid: [],
      switchCamera: true,
      switchRender: true,
    };
  }

  UNSAFE_componentWillMount() {
    this._initEngine();
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithConfig(
      new RtcEngineConfig(config.appId)
    );
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
      this.setState({ remoteUid: [...this.state.remoteUid, uid] });
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      this.setState({
        remoteUid: this.state.remoteUid.filter((value) => value !== uid),
      });
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      this.setState({ isJoined: false, remoteUid: [] });
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
      config.uid
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

  _switchRender = () => {
    const { switchRender, remoteUid } = this.state;
    this.setState({
      switchRender: !switchRender,
      remoteUid: remoteUid.reverse(),
    });
  };

  render() {
    const { channelId, isJoined, switchCamera } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
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
          <ScrollView horizontal={true} style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={styles.remote}
                onPress={this._switchRender}
              >
                <RtcRemoteView.SurfaceView
                  style={styles.container}
                  uid={value}
                  zOrderMediaOverlay={true}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  local: {
    flex: 1,
  },
  remoteContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  remote: {
    width: 120,
    height: 120,
  },
});
