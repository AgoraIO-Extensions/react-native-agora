import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  LocalVideoStreamError,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

const config = require('../../../config/agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  remoteUid: number[];
  isScreenSharing: boolean;
}

export default class JoinChannelVideo extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      remoteUid: [],
      isScreenSharing: false,
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

    await this._engine.enableVideo();
    await this._engine.startPreview();
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
    this._engine?.addListener(
      'LocalVideoStateChanged',
      (localVideoState, error) => {
        console.info('LocalVideoStateChanged', localVideoState, error);
        switch (error) {
          case LocalVideoStreamError.ExtensionCaptureStarted:
            this.setState({ isScreenSharing: true });
            break;
          case LocalVideoStreamError.ExtensionCaptureStoped:
          case LocalVideoStreamError.ExtensionCaptureDisconnected:
          case LocalVideoStreamError.ScreenCapturePermissionDenied:
            this.setState({ isScreenSharing: false });
            break;
          default:
            break;
        }
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

  _startScreenShare = async () => {
    const { isScreenSharing } = this.state;
    if (isScreenSharing) {
      await this._engine?.stopScreenCapture();
    } else {
      await this._engine?.startScreenCapture({
        captureAudio: true,
        captureVideo: true,
      });
    }
    if (Platform.OS === 'android') {
      this.setState({ isScreenSharing: !isScreenSharing });
    }
  };

  render() {
    const { channelId, isJoined, isScreenSharing } = this.state;
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
          <Button
            title={`${isScreenSharing ? 'Stop' : 'Start'} screen sharing`}
            onPress={this._startScreenShare}
          />
        </View>
        {this._renderVideo()}
      </View>
    );
  }

  _renderVideo = () => {
    const { remoteUid } = this.state;
    return (
      <View style={styles.container}>
        <RtcLocalView.SurfaceView
          style={styles.local}
          renderMode={VideoRenderMode.Fit}
        />
        {remoteUid !== undefined && (
          <ScrollView horizontal={true} style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (
              <RtcRemoteView.SurfaceView
                key={index}
                style={styles.remote}
                uid={value}
                zOrderMediaOverlay={true}
                renderMode={VideoRenderMode.Fit}
              />
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
