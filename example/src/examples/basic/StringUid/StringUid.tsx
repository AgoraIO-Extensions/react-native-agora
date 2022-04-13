import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View, Alert } from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
} from 'react-native-agora';

const config = require('../../../config/agora.config.json');

interface State {
  channelId: string;
  stringUid: string;
  isJoined: boolean;
}

export default class StringUid extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      stringUid: config.stringUid,
      isJoined: false,
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

    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    this._engine?.addListener('Warning', (warningCode) => {
      console.info('Warning', warningCode);
      Alert.alert('Warning', warningCode.toString());
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
    const { channelId, stringUid } = this.state;
    await this._engine?.joinChannelWithUserAccount(
      config.token,
      channelId,
      stringUid
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
  };

  _getUserInfo = () => {
    const { stringUid } = this.state;
    this._engine
      ?.getUserInfoByUserAccount(stringUid)
      .then((userInfo) => {
        console.debug('getUserInfoByUserAccount', userInfo);
        Alert.alert(JSON.stringify(userInfo));
      })
      .catch((err) => {
        console.error('getUserInfoByUserAccount', err);
      });
  };

  render() {
    const { channelId, stringUid, isJoined } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ channelId: text })}
            placeholder={'Channel ID'}
            value={channelId}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ stringUid: text })}
            placeholder={'String User ID'}
            value={stringUid}
          />
          <Button
            onPress={isJoined ? this._leaveChannel : this._joinChannel}
            title={`${isJoined ? 'Leave' : 'Join'} channel`}
          />
        </View>
        <View style={styles.float}>
          <Button onPress={this._getUserInfo} title={'Get userInfo'} />
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
