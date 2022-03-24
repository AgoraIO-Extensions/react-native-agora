import React, { Component, Fragment } from 'react';
import {
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  DataStreamConfig,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

const config = require('../../../config/agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid?: number;
  message?: string;
}

export default class StreamMessage extends Component<{}, State, any> {
  _engine?: RtcEngine;

  constructor(props: {}) {
    super(props);
    this.state = { channelId: config.channelId, isJoined: false };
  }

  UNSAFE_componentWillMount() {
    this._initEngine();
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId)
    );
    this._addListeners();

    // enable video module and set up video encoding configs
    await this._engine.enableVideo();

    // make myself a broadcaster
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);

    // Set audio route to speaker
    await this._engine.setDefaultAudioRoutetoSpeakerphone(true);
  };

  _addListeners = () => {
    this._engine?.addListener('Warning', (warningCode) => {
      console.info('Warning', warningCode);
    });
    this._engine?.addListener('Error', (errorCode) => {
      console.info('Error', errorCode);
    });
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      // RtcLocalView.SurfaceView must render after engine init and channel join
      this.setState({ isJoined: true });
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      // RtcLocalView.SurfaceView must render after engine init and channel join
      this.setState({ isJoined: false });
    });
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      this.setState({ remoteUid: uid });
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      this.setState({ remoteUid: undefined });
    });
    this._engine?.addListener('StreamMessage', (uid, streamId, data) => {
      console.info('UserOffline', uid, streamId, data);
      Alert.alert(`Receive from uid:${uid}`, `StreamId ${streamId}:${data}`, [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    });
    this._engine?.addListener(
      'StreamMessageError',
      (uid, streamId, error, missed, cached) => {
        console.info(
          'StreamMessageError',
          uid,
          streamId,
          error,
          missed,
          cached
        );
      }
    );
  };

  _joinChannel = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
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

  render() {
    const { channelId, isJoined } = this.state;
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
        {isJoined && this._renderVideo()}
        {isJoined && this._renderToolBar()}
      </View>
    );
  }

  _renderVideo = () => {
    const { remoteUid } = this.state;
    return (
      <View style={styles.videoContainer}>
        <RtcLocalView.SurfaceView
          style={styles.local}
          renderMode={VideoRenderMode.Hidden}
        />
        {!!remoteUid && (
          <RtcRemoteView.SurfaceView style={styles.remote} uid={remoteUid} />
        )}
      </View>
    );
  };

  _renderToolBar = () => {
    const { message } = this.state;
    return (
      <Fragment>
        <Text style={styles.toolBarTitle}>Send Message</Text>
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ message: text })}
            placeholder={'Input Message'}
            value={message}
          />
          <Button title="Send" onPress={this._onPressSend} />
        </View>
      </Fragment>
    );
  };

  _onPressSend = async () => {
    const { message } = this.state;
    if (!message) {
      return;
    }
    const streamId = await this._engine?.createDataStreamWithConfig(
      new DataStreamConfig(true, true)
    );

    await this._engine?.sendStreamMessage(streamId!, message);
    this.setState({ message: '' });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  videoContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  local: {
    width: '50%',
    aspectRatio: 1,
  },
  remote: {
    backgroundColor: 'green',
    width: '50%',
    aspectRatio: 1,
  },
  toolBarTitle: {
    marginTop: 48,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
  },
});
