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
import RNFS from 'react-native-fs';
import Item from '../../../components/Item';

const config = require('../../../config/agora.config.json');

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
    this.setState({
      isJoined: false,
      openMicrophone: true,
      enableSpeakerphone: true,
      playEffect: false,
    });
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
          1,
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

  _onChangeRecordingVolume = (value: number) => {
    this._engine?.adjustRecordingSignalVolume(value * 400);
  };

  _onChangePlaybackVolume = (value: number) => {
    this._engine?.adjustPlaybackSignalVolume(value * 400);
  };

  _onChangeInEarMonitoringVolume = (value: number) => {
    this._engine?.setInEarMonitoringVolume(value * 400);
  };

  _toggleInEarMonitoring = (isEnabled: boolean) => {
    this._engine?.enableInEarMonitoring(isEnabled);
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
          <Item
            title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
            btnOnPress={this._switchMicrophone}
          />
          <Item
            disabled={!isJoined}
            title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
            btnOnPress={this._switchSpeakerphone}
          />
          <Item
            disabled={!isJoined}
            title={`${playEffect ? 'Stop' : 'Play'} effect`}
            btnOnPress={this._switchEffect}
          />
          <Item
            disabled={!isJoined}
            title={'RecordingVolume'}
            isShowSlider
            onSliderValueChange={this._onChangeRecordingVolume}
          />
          <Item
            disabled={!isJoined}
            title={'PlaybackVolume'}
            isShowSlider
            onSliderValueChange={this._onChangePlaybackVolume}
          />
          <Item
            disabled={!isJoined}
            title={'InEar Monitoring Volume'}
            isShowSlider
            isShowSwitch
            onSwitchValueChange={this._toggleInEarMonitoring}
            onSliderValueChange={this._onChangeInEarMonitoringVolume}
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
