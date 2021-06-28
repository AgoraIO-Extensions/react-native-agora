import React, { Component, Fragment } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import RtcEngine, {
  AudienceLatencyLevelType,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ChannelMediaRelayState,
  ChannelProfile,
  ClientRole,
  RtcEngineConfig,
  RtcLocalView,
  RtcRemoteView,
  VideoFrameRate,
  VideoOutputOrientationMode,
  VideoRenderMode,
} from 'react-native-agora';

const config = require('../../../agora.config.json');

interface State {
  channelId?: string;
  isJoin: boolean;
  remoteUid?: number;
  anotherChannelName?: string;
  isRelaying: boolean;
}

export default class MediaChannelRelay extends Component<{}, State, any> {
  _engine?: RtcEngine;

  constructor(props: {}) {
    super(props);
    this.state = { isJoin: false, isRelaying: false };
  }

  onPressRelay = async () => {
    const { anotherChannelName } = this.state;
    if (!anotherChannelName) {
      return;
    }

    await this._engine?.startChannelMediaRelay({
      // configure source info, channel name defaults to current, and uid defaults to local
      srcInfo: { channelName: config.channelId, uid: 0, token: config.token },
      // configure target channel info
      destInfos: [
        {
          channelName: '',
          uid: 0,
          token: '',
        },
      ],
    });
    this.setState({ anotherChannelName: '' });
  };
  onPressStop = async () => {
    await this._engine?.stopChannelMediaRelay();
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

    this._engine?.addListener(
      'ChannelMediaRelayStateChanged',
      (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => {
        switch (state) {
          case ChannelMediaRelayState.Idle:
            console.info('ChannelMediaRelayState.Idle', code);
            this.setState({ isRelaying: false });
            break;
          case ChannelMediaRelayState.Connecting:
            console.info('ChannelMediaRelayState.Connecting', code);
            break;
          case ChannelMediaRelayState.Running:
            console.info('ChannelMediaRelayState.Running', code);
            this.setState({ isRelaying: true });
            break;
          case ChannelMediaRelayState.Failure:
            console.info('ChannelMediaRelayState.Failure', code);
            this.setState({ isRelaying: false });
            break;
          default:
            console.info('default', code);
            break;
        }
      }
    );
    this._engine?.addListener(
      'ChannelMediaRelayEvent',
      (code: ChannelMediaRelayEvent) => {
        console.info('ChannelMediaRelayEvent', code);
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
    const { anotherChannelName, isRelaying } = this.state;
    return (
      <Fragment>
        <Text style={styles.toolBarTitle}>Send stream to another channel</Text>
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ anotherChannelName: text })}
            placeholder={'Enter target relay channel name'}
            value={anotherChannelName}
          />
          <Button
            title={!isRelaying ? 'Relay' : 'Stop'}
            onPress={!isRelaying ? this.onPressRelay : this.onPressStop}
          />
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
