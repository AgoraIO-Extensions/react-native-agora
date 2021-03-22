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
  RtcEngineConfig,
} from 'react-native-agora';

import RNFS from 'react-native-fs';

const config = require('../../../agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
  playEffect: boolean;
}

export default class JoinChannelAudio extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      openMicrophone: true,
      enableSpeakerphone: true,
      playEffect: false,
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

    await this._engine.enableAudio();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      this.setState({ isJoined: true });
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      this.setState({ isJoined: false });
    });
  };

  _joinChannel = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
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

  _switchMicrophone = () => {
    const { openMicrophone } = this.state;
    this._engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({ openMicrophone: !openMicrophone });
      })
      .catch((err) => {
        console.warn('enableLocalAudio', err);
      });
  };

  _switchSpeakerphone = () => {
    const { enableSpeakerphone } = this.state;
    this._engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        this.setState({ enableSpeakerphone: !enableSpeakerphone });
      })
      .catch((err) => {
        console.warn('setEnableSpeakerphone', err);
      });
  };

  _switchEffect = () => {
    const { playEffect } = this.state;
    if (playEffect) {
      this._engine
        ?.stopEffect(1)
        .then(() => {
          this.setState({ playEffect: false });
        })
        .catch((err) => {
          console.warn('stopEffect', err);
        });
    } else {
      this._engine
        ?.playEffect(
          1,
          Platform.OS === 'ios'
            ? `${RNFS.MainBundlePath}/Sound_Horizon.mp3`
            : '/assets/Sound_Horizon.mp3',
          -1,
          1,
          1,
          100,
          true
        )
        .then(() => {
          this.setState({ playEffect: true });
        })
        .catch((err) => {
          console.warn('playEffect', err);
        });
    }
  };

  render() {
    const {
      channelId,
      isJoined,
      openMicrophone,
      enableSpeakerphone,
      playEffect,
    } = this.state;
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
          <Button
            onPress={this._switchMicrophone}
            title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
          />
          <Button
            onPress={this._switchSpeakerphone}
            title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
          />
          <Button
            onPress={this._switchEffect}
            title={`${playEffect ? 'Stop' : 'Play'} effect`}
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
  },
});
