import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Alert,
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
import Item from '../component/Item';

const config = require('../../../agora.config.json');

interface State {
  role?: ClientRole;
  channelId?: string;
  isJoin: boolean;
  remoteUid?: number;
  isLowAudio: boolean;
}

export default class LiveStreaming extends Component<{}, State, any> {
  _engine?: RtcEngine;

  constructor(props: {}) {
    super(props);
    this.state = {
      isJoin: false,
      isLowAudio: true,
    };
  }

  UNSAFE_componentWillMount() {
    Alert.alert('Pick Role', 'Please choose role', [
      {
        text: 'Broadcaster',
        onPress: () => this.setState({ role: ClientRole.Broadcaster }),
      },
      {
        text: 'Audience',
        onPress: () => this.setState({ role: ClientRole.Audience }),
      },
    ]);
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    const { role } = this.state;
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

    // make this room live broadcasting room
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._updateClientRole(role!);

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
  };

  _updateClientRole = async (role: ClientRole) => {
    const { isLowAudio } = this.state;
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
      option = {
        audienceLatencyLevel: isLowAudio
          ? AudienceLatencyLevelType.LowLatency
          : AudienceLatencyLevelType.UltraLowLatency,
      };
    }
    await this._engine?.setClientRole(role, option);
  };
  onPressToggleRole = () => {
    const role =
      this.state.role === ClientRole.Audience
        ? ClientRole.Broadcaster
        : ClientRole.Audience;
    this.setState({ role }, () => {
      this._updateClientRole(this.state.role!);
    });
  };
  onPressToggleLatencyLevel = async () => {
    this.setState({ isLowAudio: !this.state.isLowAudio }, async () => {
      await this._engine?.setClientRole(ClientRole.Audience, {
        audienceLatencyLevel: this.state.isLowAudio
          ? AudienceLatencyLevelType.LowLatency
          : AudienceLatencyLevelType.UltraLowLatency,
      });
    });
  };

  render() {
    const { isJoin } = this.state;
    return (
      <View style={styles.container}>
        {!isJoin && <Button onPress={this._initEngine} title="Join channel" />}
        {isJoin && this._renderVideo()}
      </View>
    );
  }

  _renderVideo = () => {
    const { role, remoteUid } = this.state;

    return (
      <View style={styles.container}>
        {role === ClientRole.Broadcaster ? (
          // RtcLocalView.SurfaceView must render after engine init and channel join
          <RtcLocalView.SurfaceView
            style={styles.surfaceView}
            renderMode={VideoRenderMode.Hidden}
          />
        ) : (
          !!remoteUid && (
            // RtcRemoteView.SurfaceView must render after uid have value
            <RtcRemoteView.SurfaceView
              style={styles.surfaceView}
              uid={remoteUid}
            />
          )
        )}
        <View style={styles.float}>
          {role === ClientRole.Audience && (
            <Item
              title="Toggle Audience Latency Level"
              isShowSwitch
              isShowSlider={false}
              titleColor="white"
              onSwitchValueChange={this.onPressToggleLatencyLevel}
            />
          )}
          <Item
            title="Toggle Role"
            isShowSwitch
            isShowSlider={false}
            titleColor="white"
            onSwitchValueChange={this.onPressToggleRole}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  float: {
    position: 'absolute',
    left: 0,
    bottom: 20,
    backgroundColor: 'gray',
  },

  surfaceView: {
    flex: 1,
  },
});
