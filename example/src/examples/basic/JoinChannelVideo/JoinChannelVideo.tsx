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
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import Item from '../../../components/Item';

const config = require('../../../config/agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number[];
  startPreview: boolean;
  switchCamera: boolean;
  switchRender: boolean;
  isRenderTextureView: boolean;
}

export default class JoinChannelVideo extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      remoteUid: [],
      startPreview: false,
      switchCamera: true,
      switchRender: true,
      isRenderTextureView: false,
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
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId)
    );
    this._addListeners();

    await this._engine.enableVideo();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
    await this._engine.startPreview();
    this.setState({ startPreview: true });
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
      this.setState({ isJoined: false, remoteUid: [] });
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

  _switchRenderView = (value: boolean) => {
    this.setState({
      isRenderTextureView: value,
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
        {Platform.OS === 'android' && (
          <Item
            title={'Rendered By TextureView (Default SurfaceView):'}
            isShowSwitch
            onSwitchValueChange={this._switchRenderView}
          />
        )}
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
    const { startPreview, isRenderTextureView, remoteUid } = this.state;
    return (
      <View style={styles.container}>
        {startPreview ? (
          <>
            {isRenderTextureView ? (
              <RtcLocalView.TextureView style={styles.local} />
            ) : (
              <RtcLocalView.SurfaceView style={styles.local} />
            )}
          </>
        ) : undefined}
        {remoteUid !== undefined && (
          <ScrollView horizontal={true} style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={styles.remote}
                onPress={this._switchRender}
              >
                {isRenderTextureView ? (
                  <RtcRemoteView.TextureView
                    style={styles.container}
                    uid={value}
                  />
                ) : (
                  <RtcRemoteView.SurfaceView
                    style={styles.container}
                    uid={value}
                    zOrderMediaOverlay={true}
                  />
                )}
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
    color: 'black',
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
