import React, { Component, useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
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
interface ItemProps {
  title: string;
  btnOnPress?: any;
  onSliderValueChange?: (value: number) => void;
  onSwitchValueChange?: (value: boolean) => void;
  isShowSlider?: boolean;
  isShowSwitch?: boolean;
}
const Item = ({
  title,
  btnOnPress = () => {},
  onSliderValueChange,
  onSwitchValueChange,
  isShowSlider = false,
  isShowSwitch = false,
}: ItemProps) => {
  const [isEnabled, setIsEnabled] = useState(isShowSwitch || isShowSlider);
  return (
    <View style={styles.item}>
      <View>
        <Button onPress={btnOnPress} title={title} />
        {isShowSwitch && (
          <Switch
            onValueChange={(value: boolean) => {
              onSwitchValueChange && onSwitchValueChange(value);
              setIsEnabled((previousState) => !previousState);
            }}
            value={isEnabled}
          />
        )}
      </View>
      {isEnabled && (
        <Slider
          style={{ width: '35%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={onSliderValueChange}
        />
      )}
    </View>
  );
};
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
  _onChangeRecordingVolume = (value: number) => {
    this._engine?.adjustRecordingSignalVolume(value * 400);
  };

  _onChangePlaybackVolume = (value: number) => {
    this._engine?.adjustPlaybackSignalVolume(value * 400);
  };

  _toggleInEarMonitoring = (isEnabled: boolean) => {
    this._engine?.enableInEarMonitoring(isEnabled);
  };

  _onChangeInEarMonitoringVolume = (value: number) => {
    this._engine?.setInEarMonitoringVolume(value * 400);
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
        {isJoined && (
          <View style={styles.float}>
            <Item
              title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
              btnOnPress={this._switchMicrophone}
            />
            <Item
              title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
              btnOnPress={this._switchSpeakerphone}
            />
            <Item
              title={`${playEffect ? 'Stop' : 'Play'} effect`}
              btnOnPress={this._switchEffect}
            />
            <Item
              title={'RecordingVolume'}
              isShowSlider
              onSliderValueChange={this._onChangeRecordingVolume}
            />
            <Item
              title={'PlaybackVolume'}
              isShowSlider={true}
              onSliderValueChange={this._onChangePlaybackVolume}
            />
            <Item
              title={'InEar Monitoring Volume'}
              isShowSlider
              isShowSwitch
              onSwitchValueChange={this._toggleInEarMonitoring}
              onSliderValueChange={this._onChangeInEarMonitoringVolume}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    marginTop: 10,
  },
  float: {
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-start',
    bottom: 20,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});
