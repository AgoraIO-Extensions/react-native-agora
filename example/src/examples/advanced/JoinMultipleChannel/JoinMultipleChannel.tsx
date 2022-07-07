import React from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  RemoteVideoState,
  RemoteVideoStateReason,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  UserOfflineReasonType,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  STYLES,
} from '../../../components/BaseComponent';
import { ActionItem } from '../../../components/ActionItem';
import Config from '../../../config/agora.config.json';

interface State extends BaseVideoComponentState {
  channelId2: string;
  token2: string;
  uid2: number;
  joinChannelSuccess2: boolean;
  remoteUsers2: number[];
}

export default class JoinMultipleChannel
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  // @ts-ignore
  protected engine?: IRtcEngineEx;

  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: true,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      startPreview: false,
      channelId2: '',
      token2: '',
      uid2: 0,
      joinChannelSuccess2: false,
      remoteUsers2: [],
    };
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      console.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine() as IRtcEngineEx;
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // Need to startPreview before joinChannelEx
    this.engine.startPreview();
    this.setState({ startPreview: true });
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      console.error('channelId is invalid');
      return;
    }
    if (uid <= 0) {
      console.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannelEx(
      token,
      {
        channelId,
        localUid: uid,
      },
      {
        // Make myself as the broadcaster to send stream to remote
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishAudioTrack: false,
        publishCameraTrack: false,
      }
    );
  }

  /**
   * Step 2: joinChannel2
   */
  protected joinChannel2() {
    const { channelId2, token2, uid2 } = this.state;
    if (!channelId2) {
      console.error('channelId2 is invalid');
      return;
    }
    if (uid2 <= 0) {
      console.error('uid2 is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannelEx(
      token2,
      {
        channelId: channelId2,
        localUid: uid2,
      },
      {
        // Make myself as the broadcaster to send stream to remote
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishAudioTrack: false,
        publishCameraTrack: false,
      }
    );
  }

  /**
   * Step 3: publishStreamToChannel
   */
  publishStreamToChannel = () => {
    const { channelId, channelId2, uid, uid2 } = this.state;
    this.engine?.updateChannelMediaOptionsEx(
      { publishAudioTrack: false, publishCameraTrack: false },
      {
        channelId: channelId2,
        localUid: uid2,
      }
    );
    this.engine?.updateChannelMediaOptionsEx(
      { publishAudioTrack: true, publishCameraTrack: true },
      {
        channelId,
        localUid: uid,
      }
    );
  };

  /**
   * Step 3: publishStreamToChannel2
   */
  publishStreamToChannel2 = () => {
    const { channelId, channelId2, uid, uid2 } = this.state;
    this.engine?.updateChannelMediaOptionsEx(
      { publishAudioTrack: false, publishCameraTrack: false },
      {
        channelId,
        localUid: uid,
      }
    );
    this.engine?.updateChannelMediaOptionsEx(
      { publishAudioTrack: true, publishCameraTrack: true },
      {
        channelId: channelId2,
        localUid: uid2,
      }
    );
  };

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    const { channelId, uid } = this.state;
    this.engine?.leaveChannelEx({
      channelId,
      localUid: uid,
    });
  }

  /**
   * Step 4: leaveChannel2
   */
  protected leaveChannel2() {
    const { channelId2, uid2 } = this.state;
    this.engine?.leaveChannelEx({
      channelId: channelId2,
      localUid: uid2,
    });
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.release();
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    this.info(
      'onJoinChannelSuccess',
      'connection',
      connection,
      'elapsed',
      elapsed
    );
    const { channelId, channelId2 } = this.state;
    if (connection.channelId === channelId) {
      this.setState({
        joinChannelSuccess: true,
      });
    } else if (connection.channelId === channelId2) {
      this.setState({
        joinChannelSuccess2: true,
      });
    }
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
    const { channelId, channelId2 } = this.state;
    if (connection.channelId === channelId) {
      this.setState({
        joinChannelSuccess: false,
        remoteUsers: [],
      });
    } else if (connection.channelId === channelId2) {
      this.setState({
        joinChannelSuccess2: false,
        remoteUsers2: [],
      });
    }
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    this.info(
      'onUserJoined',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'elapsed',
      elapsed
    );
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    this.info(
      'onUserOffline',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'reason',
      reason
    );
  }

  onRemoteVideoStateChanged(
    connection: RtcConnection,
    remoteUid: number,
    state: RemoteVideoState,
    reason: RemoteVideoStateReason,
    elapsed: number
  ) {
    this.info(
      'onRemoteVideoStateChanged',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'state',
      state,
      'reason',
      reason,
      'elapsed',
      elapsed
    );
    const { channelId, channelId2, remoteUsers, remoteUsers2 } = this.state;
    if (state === RemoteVideoState.RemoteVideoStateStarting) {
      if (connection.channelId === channelId) {
        this.setState({ remoteUsers: [...remoteUsers, remoteUid] });
      } else if (connection.channelId === channelId2) {
        this.setState({ remoteUsers2: [...remoteUsers2, remoteUid] });
      }
    } else if (state === RemoteVideoState.RemoteVideoStateStopped) {
      if (connection.channelId === channelId) {
        this.setState({
          remoteUsers: remoteUsers.filter((value) => value !== remoteUid),
        });
      } else if (connection.channelId === channelId2) {
        this.setState({
          remoteUsers2: remoteUsers2.filter((value) => value !== remoteUid),
        });
      }
    }
  }

  protected renderTop(): React.ReactNode {
    const {
      channelId,
      channelId2,
      uid,
      uid2,
      joinChannelSuccess,
      joinChannelSuccess2,
    } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ channelId: text });
          }}
          placeholder={`channelId`}
          value={channelId}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ uid: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`uid (must > 0)`}
          placeholderTextColor={'gray'}
          value={uid > 0 ? uid.toString() : ''}
        />
        <Button
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ channelId2: text });
          }}
          placeholder={`channelId2`}
          value={channelId2}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ uid2: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`uid2 (must > 0)`}
          placeholderTextColor={'gray'}
          value={uid2 > 0 ? uid2.toString() : ''}
        />
        <Button
          title={`${joinChannelSuccess2 ? 'leave' : 'join'} Channel2`}
          onPress={() => {
            joinChannelSuccess2 ? this.leaveChannel2() : this.joinChannel2();
          }}
        />
      </>
    );
  }

  protected renderVideo(): React.ReactNode {
    const {
      startPreview,
      channelId,
      channelId2,
      uid,
      uid2,
      joinChannelSuccess,
      joinChannelSuccess2,
      remoteUsers,
      remoteUsers2,
    } = this.state;
    return (
      <>
        {startPreview || joinChannelSuccess || joinChannelSuccess2 ? (
          <RtcSurfaceView style={STYLES.video} canvas={{ uid: 0 }} />
        ) : undefined}
        {remoteUsers.length > 0 ? (
          <ScrollView horizontal={true} style={STYLES.videoContainer}>
            {remoteUsers.map((value, index) => (
              <RtcSurfaceView
                key={`${value}-${index}`}
                style={STYLES.videoSmall}
                canvas={{ uid: value }}
                zOrderMediaOverlay={true}
                connection={{ channelId, localUid: uid }}
              />
            ))}
          </ScrollView>
        ) : undefined}
        {remoteUsers2.length > 0 ? (
          <ScrollView horizontal={true} style={styles.videoContainer2}>
            {remoteUsers2.map((value, index) => (
              <RtcSurfaceView
                key={`${value}-${index}`}
                style={STYLES.videoSmall}
                canvas={{ uid: value }}
                connection={{ channelId: channelId2, localUid: uid2 }}
              />
            ))}
          </ScrollView>
        ) : undefined}
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess, joinChannelSuccess2 } = this.state;
    return (
      <>
        <ActionItem
          disabled={!joinChannelSuccess}
          title={`publish Stream To Channel`}
          onPress={this.publishStreamToChannel}
        />
        <ActionItem
          disabled={!joinChannelSuccess2}
          title={`publish Stream To Channel2`}
          onPress={this.publishStreamToChannel2}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  videoContainer2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
