import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import RtcEngine, {
  ChannelMediaOptions,
  ChannelProfile,
  ClientRole,
  RtcChannel,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
} from 'react-native-agora';

const config = require('../../../config/agora.config.json');

interface State {
  renderChannelId: string;
  isJoined0: boolean;
  isJoined1: boolean;
  remoteUid0: number[];
  remoteUid1: number[];
  startPreview: boolean;
}

const channelId0 = 'channel0';
const channelId1 = 'channel1';

export default class JoinMultipleChannel extends Component<{}, State, any> {
  _engine: RtcEngine | undefined;
  _channel0: RtcChannel | undefined;
  _channel1: RtcChannel | undefined;

  constructor(props: {}) {
    super(props);
    this.state = {
      renderChannelId: '',
      isJoined0: false,
      isJoined1: false,
      remoteUid0: [],
      remoteUid1: [],
      startPreview: false,
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

    await this._engine.enableVideo();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
    await this._engine.startPreview();
    this.setState({ startPreview: true });
  };

  _joinChannel0 = async () => {
    if (this._channel0 === undefined) {
      this._channel0 = await RtcChannel.create(channelId0);
      this._addListener(this._channel0);
    }

    await this._channel0.setClientRole(ClientRole.Broadcaster);
    await this._channel0.joinChannel(
      null,
      null,
      0,
      new ChannelMediaOptions({
        publishLocalAudio: false,
        publishLocalVideo: false,
      })
    );
  };

  _joinChannel1 = async () => {
    if (this._channel1 === undefined) {
      this._channel1 = await RtcChannel.create(channelId1);
      this._addListener(this._channel1);
    }

    await this._channel1.setClientRole(ClientRole.Broadcaster);
    await this._channel1.joinChannel(
      null,
      null,
      0,
      new ChannelMediaOptions({
        publishLocalAudio: false,
        publishLocalVideo: false,
      })
    );
  };

  _addListener = (rtcChannel: RtcChannel) => {
    const { channelId } = rtcChannel;
    rtcChannel.addListener('Warning', (warningCode) => {
      console.info('Warning', channelId, warningCode);
    });
    rtcChannel.addListener('Error', (errorCode) => {
      console.info('Error', channelId, errorCode);
    });
    rtcChannel.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      if (channelId === channelId0) {
        this.setState({ isJoined0: true });
      } else if (channelId === channelId1) {
        this.setState({ isJoined1: true });
      }
    });
    rtcChannel?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', channelId, stats);
      // RtcLocalView.SurfaceView must render after engine init and channel join
      if (channelId === channelId0) {
        this.setState({ isJoined0: false, remoteUid0: [] });
      } else if (channelId === channelId1) {
        this.setState({ isJoined1: false, remoteUid1: [] });
      }
    });
    rtcChannel.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', channelId, uid, elapsed);
    });
    rtcChannel.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', channelId, uid, reason);
    });
    rtcChannel.addListener(
      'RemoteVideoStateChanged',
      (uid, state, reason, elapsed) => {
        console.info('RemoteVideoStateChanged', uid, state, reason, elapsed);
        if (state === VideoRemoteState.Starting) {
          if (channelId === channelId0) {
            this.setState({ remoteUid0: [...this.state.remoteUid0, uid] });
          } else if (channelId === channelId1) {
            this.setState({ remoteUid1: [...this.state.remoteUid1, uid] });
          }
        } else if (state === VideoRemoteState.Stopped) {
          if (channelId === channelId0) {
            this.setState({
              remoteUid0: this.state.remoteUid0.filter(
                (value) => value !== uid
              ),
            });
          } else if (channelId === channelId1) {
            this.setState({
              remoteUid1: this.state.remoteUid1.filter(
                (value) => value !== uid
              ),
            });
          }
        }
      }
    );
  };

  _publishChannel0 = async () => {
    await this._channel1?.unpublish();
    await this._channel0?.publish();
  };

  _publishChannel1 = async () => {
    await this._channel0?.unpublish();
    await this._channel1?.publish();
  };

  _leaveChannel0 = async () => {
    await this._channel0?.leaveChannel();
  };

  _leaveChannel1 = async () => {
    await this._channel1?.leaveChannel();
  };

  render() {
    const { isJoined0, isJoined1 } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Button
            onPress={isJoined0 ? this._leaveChannel0 : this._joinChannel0}
            title={`${isJoined0 ? 'Leave' : 'Join'} ${channelId0}`}
          />
          <Button
            onPress={isJoined1 ? this._leaveChannel1 : this._joinChannel1}
            title={`${isJoined1 ? 'Leave' : 'Join'} ${channelId1}`}
          />
        </View>
        {this._renderVideo()}
        <View style={styles.float}>
          <Button
            onPress={this._publishChannel0}
            title={`Publish ${channelId0}`}
          />
          <Button
            onPress={() => {
              this.setState({ renderChannelId: channelId0 });
            }}
            title={`Render ${channelId0}`}
          />
          <Button
            onPress={this._publishChannel1}
            title={`Publish ${channelId1}`}
          />
          <Button
            onPress={() => {
              this.setState({ renderChannelId: channelId1 });
            }}
            title={`Render ${channelId1}`}
          />
        </View>
      </View>
    );
  }

  _renderVideo = () => {
    const { renderChannelId, remoteUid0, remoteUid1, startPreview } =
      this.state;
    let remoteUid: number[] | undefined;
    if (renderChannelId === channelId0) {
      remoteUid = remoteUid0;
    } else if (renderChannelId === channelId1) {
      remoteUid = remoteUid1;
    }
    return (
      <View style={styles.container}>
        {startPreview ? (
          <RtcLocalView.SurfaceView style={styles.local} />
        ) : undefined}
        {remoteUid !== undefined && (
          <ScrollView horizontal={true} style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (
              <RtcRemoteView.SurfaceView
                key={index}
                style={styles.remote}
                channelId={renderChannelId}
                uid={value}
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
