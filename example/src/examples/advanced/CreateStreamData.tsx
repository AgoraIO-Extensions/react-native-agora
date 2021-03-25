import React, { Component, Fragment } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineConfig,
  RtcLocalView,
  VideoFrameRate,
  VideoOutputOrientationMode,
  VideoRenderMode,
  AudienceLatencyLevelType,
  RtcRemoteView,
} from 'react-native-agora';

const config = require('../../../agora.config.json');

interface State {
  channelId?: string;
  isJoin: boolean;
  remoteUid?: number;
  message?: string;
}

export default class LiveStreaming extends Component<{}, State, any> {
  _engine?: RtcEngine;

  constructor(props: {}) {
    super(props);
    this.state = { isJoin: false };
  }
  onPressSend = async () => {
    const { message } = this.state;
    if (!message) {
      return;
    }
    const streamId = await this._engine?.createDataStreamWithConfig({});

    await this._engine?.sendStreamMessage(streamId!, message);
    this.setState({ message: '' });
  };

  UNSAFE_componentWillMount() {}

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    this._engine = await RtcEngine.createWithConfig(
      new RtcEngineConfig(config.appId)
    );
    this._addListeners();

    // enable video module and set up video encoding configs
    await this._engine.enableVideo();

    // make myself a broadcaster
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._updateClientRole(ClientRole.Broadcaster);

    // Set audio route to speaker
    await this._engine.setDefaultAudioRoutetoSpeakerphone(true);

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    await this._engine.joinChannel(
      config.token,
      config.channelId,
      null,
      0,
      undefined
    );
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
      this.setState({ isJoin: true });
    });
    this._engine?.addListener('UserJoined', async (uid, elapsed) => {
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

  _updateClientRole = async (role: ClientRole) => {
    let option;
    if (role === ClientRole.Broadcaster) {
      await this._engine?.setVideoEncoderConfiguration({
        dimensions: {
          width: 640,
          height: 360,
        },
        frameRate: VideoFrameRate.Fps30,
        orientationMode: VideoOutputOrientationMode.Adaptative,
      });
      // enable camera/mic, this will bring up permission dialog for first time
      await this._engine?.enableLocalAudio(true);
      await this._engine?.enableLocalVideo(true);
    } else {
      // You have to provide client role options if set to audience
      option = { audienceLatencyLevel: AudienceLatencyLevelType.LowLatency };
    }
    await this._engine?.setClientRole(role, option);
  };

  render() {
    const { isJoin } = this.state;
    return (
      <View style={styles.container}>
        {!isJoin && <Button onPress={this._initEngine} title="Join channel" />}
        {isJoin && this._renderVideo()}
        {isJoin && this._renderToolBar()}
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
          <Button title="Send" onPress={this.onPressSend} />
        </View>
      </Fragment>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
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
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
  },
});
