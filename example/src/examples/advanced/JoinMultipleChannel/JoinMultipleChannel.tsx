import React, { ReactElement } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  RemoteVideoState,
  RemoteVideoStateReason,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  UserOfflineReasonType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraCard,
  AgoraList,
  AgoraStyle,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';

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
      this.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine() as IRtcEngineEx;
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
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
   * Step 2-1: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid <= 0) {
      this.error('uid is invalid');
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
        publishMicrophoneTrack: false,
        publishCameraTrack: false,
      }
    );
  }

  /**
   * Step 2-2: joinChannel2
   */
  protected joinChannel2() {
    const { channelId2, token2, uid2 } = this.state;
    if (!channelId2) {
      this.error('channelId2 is invalid');
      return;
    }
    if (uid2 <= 0) {
      this.error('uid2 is invalid');
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
        publishMicrophoneTrack: false,
        publishCameraTrack: false,
      }
    );
  }

  /**
   * Step 3-1: publishStreamToChannel
   */
  publishStreamToChannel = () => {
    const { channelId, channelId2, uid, uid2 } = this.state;
    this.engine?.updateChannelMediaOptionsEx(
      { publishMicrophoneTrack: false, publishCameraTrack: false },
      {
        channelId: channelId2,
        localUid: uid2,
      }
    );
    this.engine?.updateChannelMediaOptionsEx(
      { publishMicrophoneTrack: true, publishCameraTrack: true },
      {
        channelId,
        localUid: uid,
      }
    );
  };

  /**
   * Step 3-2: publishStreamToChannel2
   */
  publishStreamToChannel2 = () => {
    const { channelId, channelId2, uid, uid2 } = this.state;
    this.engine?.updateChannelMediaOptionsEx(
      { publishMicrophoneTrack: false, publishCameraTrack: false },
      {
        channelId,
        localUid: uid,
      }
    );
    this.engine?.updateChannelMediaOptionsEx(
      { publishMicrophoneTrack: true, publishCameraTrack: true },
      {
        channelId: channelId2,
        localUid: uid2,
      }
    );
  };

  /**
   * Step 4-1: leaveChannel
   */
  protected leaveChannel() {
    const { channelId, uid } = this.state;
    this.engine?.leaveChannelEx({
      channelId,
      localUid: uid,
    });
  }

  /**
   * Step 4-2: leaveChannel2
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
    this.engine?.unregisterEventHandler(this);
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
    const { channelId, channelId2, uid, uid2 } = this.state;
    if (connection.channelId === channelId && connection.localUid === uid) {
      this.setState({
        joinChannelSuccess: true,
      });
    } else if (
      connection.channelId === channelId2 &&
      connection.localUid === uid2
    ) {
      this.setState({
        joinChannelSuccess2: true,
      });
    }
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
    const { channelId, channelId2, uid, uid2 } = this.state;
    if (connection.channelId === channelId && connection.localUid === uid) {
      this.setState({
        joinChannelSuccess: false,
        remoteUsers: [],
      });
    } else if (
      connection.channelId === channelId2 &&
      connection.localUid === uid2
    ) {
      this.setState({
        joinChannelSuccess2: false,
        remoteUsers2: [],
      });
    }
    // Keep preview after leave channel
    this.engine?.startPreview();
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
    const { channelId, channelId2, uid, uid2, remoteUsers, remoteUsers2 } =
      this.state;
    if (state === RemoteVideoState.RemoteVideoStateStarting) {
      if (connection.channelId === channelId && connection.localUid === uid) {
        this.setState({ remoteUsers: [...remoteUsers, remoteUid] });
      } else if (
        connection.channelId === channelId2 &&
        connection.localUid === uid2
      ) {
        this.setState({ remoteUsers2: [...remoteUsers2, remoteUid] });
      }
    } else if (state === RemoteVideoState.RemoteVideoStateStopped) {
      if (connection.channelId === channelId && connection.localUid === uid) {
        this.setState({
          remoteUsers: remoteUsers.filter((value) => value !== remoteUid),
        });
      } else if (
        connection.channelId === channelId2 &&
        connection.localUid === uid2
      ) {
        this.setState({
          remoteUsers2: remoteUsers2.filter((value) => value !== remoteUid),
        });
      }
    }
  }

  protected renderChannel(): React.ReactNode {
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
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ channelId: text });
          }}
          placeholder={`channelId`}
          value={channelId}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              uid: text === '' ? this.createState().uid : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`uid (must > 0)`}
          value={uid > 0 ? uid.toString() : ''}
        />
        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ channelId2: text });
          }}
          placeholder={`channelId2`}
          value={channelId2}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              uid2: text === '' ? this.createState().uid2 : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`uid2 (must > 0)`}
          value={uid2 > 0 ? uid2.toString() : ''}
        />
        <AgoraButton
          title={`${joinChannelSuccess2 ? 'leave' : 'join'} Channel2`}
          onPress={() => {
            joinChannelSuccess2 ? this.leaveChannel2() : this.joinChannel2();
          }}
        />
      </>
    );
  }

  protected renderUsers(): React.ReactNode {
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
          <AgoraList
            data={[0, ...remoteUsers, ...remoteUsers2]}
            renderItem={({ item }) => {
              return this.renderVideo(
                item,
                remoteUsers2.indexOf(item) === -1 ? channelId : channelId2,
                remoteUsers2.indexOf(item) === -1 ? uid : uid2
              );
            }}
          />
        ) : undefined}
      </>
    );
  }

  protected renderVideo(
    uid: number,
    channelId?: string,
    localUid?: number
  ): ReactElement {
    return (
      <AgoraCard title={`ChannelId: ${channelId} Uid: ${uid}`}>
        <RtcSurfaceView
          style={AgoraStyle.videoSmall}
          canvas={{ uid }}
          connection={{ channelId, localUid }}
        />
      </AgoraCard>
    );
  }

  protected renderAction(): React.ReactNode {
    const { joinChannelSuccess, joinChannelSuccess2 } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`publish Stream To Channel`}
          onPress={this.publishStreamToChannel}
        />
        <AgoraButton
          disabled={!joinChannelSuccess2}
          title={`publish Stream To Channel2`}
          onPress={this.publishStreamToChannel2}
        />
      </>
    );
  }
}
