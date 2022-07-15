import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
} from 'react-native-agora';
import Item from '../../../components/Item';

const config = require('../../../config/agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number[];
  enableSpatialAudio: boolean;
}

export default class SpatialAudio extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      remoteUid: [],
      enableSpatialAudio: false,
    };
  }

  UNSAFE_componentWillMount() {
    this._initEngine();
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
    }

    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId)
    );
    this._addListeners();

    await this._engine.enableAudio();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
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
      this.setState({ isJoined: true });
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      this.setState({ isJoined: false, enableSpatialAudio: false });
    });
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      if (this.state.enableSpatialAudio) {
        // You can special your params, here is just for example
        this._engine?.setRemoteUserSpatialAudioParams(uid, {
          speaker_azimuth: 90,
          speaker_elevation: -90,
          speaker_distance: 25,
          speaker_orientation: 180,
          enable_blur: true,
          enable_air_absorb: true,
        });
      }
      this.setState({ remoteUid: [...this.state.remoteUid, uid] });
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      this.setState({
        remoteUid: this.state.remoteUid.filter((value) => value !== uid),
      });
    });
  };

  _joinChannel = async () => {
    await this._engine?.joinChannel(
      config.token,
      this.state.channelId,
      null,
      config.uid
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
    this.setState({
      isJoined: false,
      enableSpatialAudio: true,
    });
  };

  _enableSpatialAudio = () => {
    const { enableSpatialAudio } = this.state;
    this._engine
      ?.enableSpatialAudio(!enableSpatialAudio)
      .then(() => {
        if (!enableSpatialAudio) {
          this.state.remoteUid.map((value) => {
            // You can special your params, here is just for example
            this._engine?.setRemoteUserSpatialAudioParams(value, {
              speaker_azimuth: 90,
              speaker_elevation: -90,
              speaker_distance: 25,
              speaker_orientation: 180,
              enable_blur: true,
              enable_air_absorb: true,
            });
          });
        }
        this.setState({ enableSpatialAudio: !enableSpatialAudio });
      })
      .catch((err) => {
        console.warn('enableSpatialAudio', err);
      });
  };

  render() {
    const { channelId, isJoined, enableSpatialAudio } = this.state;
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
        <View style={styles.float}>
          <Item
            title={`SpatialAudio ${enableSpatialAudio ? 'on' : 'off'}`}
            btnOnPress={this._enableSpatialAudio}
          />
        </View>
      </View>
    );
  }
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
    color: 'black',
  },
});
