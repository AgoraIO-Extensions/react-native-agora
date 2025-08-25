import React, { ReactElement } from 'react';
import {
  AreaCode,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDropdown,
  AgoraTextInput,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { enumToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseAudioComponentState {
  userAccount: string;
  isInitialized: boolean;
  selectedAreaCode: number;
}

export default class StringUid
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: false,
      isInitialized: false,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      userAccount: '',
      selectedAreaCode: AreaCode.AreaCodeGlob,
    };
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    this.engine = createAgoraRtcEngine();
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, userAccount } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (!userAccount) {
      this.error('userAccount is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannelWithUserAccount(token, channelId, userAccount, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3 (Optional): getUserInfoByUserAccount
   */
  getUserInfoByUserAccount = () => {
    const { userAccount } = this.state;
    const userInfo = this.engine?.getUserInfoByUserAccount(userAccount);
    if (userInfo) {
      this.debug('getUserInfoByUserAccount', 'userInfo', userInfo);
    } else {
      this.error('getUserInfoByUserAccount');
    }
  };

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel();
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
    this.setState({ isInitialized: false });
  }

  onError(err: ErrorCodeType, msg: string) {
    super.onError(err, msg);
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.releaseRtcEngine();
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    super.onUserJoined(connection, remoteUid, elapsed);
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    super.onUserOffline(connection, remoteUid, reason);
  }

  onLocalUserRegistered(uid: number, userAccount: string) {
    this.info('LocalUserRegistered', uid, userAccount);
  }

  protected async initializeEngine() {
    const { appId } = this.state;
    if (!appId) {
      this.error(`appId is invalid`);
    }
    this.engine!.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      areaCode: this.state.selectedAreaCode,
    });
    this.engine!.registerEventHandler(this);

    // Need granted the microphone permission
    await askMediaAccess(['android.permission.RECORD_AUDIO']);

    // Only need to enable audio on this case
    this.engine!.enableAudio();
    this.setState({ isInitialized: true });
  }

  protected renderChannel(): ReactElement | undefined {
    const { channelId, joinChannelSuccess, isInitialized, selectedAreaCode } =
      this.state;
    return (
      <>
        <AgoraDropdown
          title={'Select Area Code'}
          items={enumToItems(AreaCode)}
          value={selectedAreaCode}
          onValueChange={(value) => {
            this.setState({ selectedAreaCode: value });
          }}
        />
        <AgoraButton
          title={`${isInitialized ? 'release' : 'initialize'} engine`}
          disabled={joinChannelSuccess}
          onPress={() => {
            isInitialized ? this.releaseRtcEngine() : this.initializeEngine();
          }}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ channelId: text });
          }}
          placeholder={`channelId`}
          value={channelId}
        />
        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          disabled={!isInitialized}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { userAccount, joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraTextInput
          editable={!joinChannelSuccess}
          onChangeText={(text) => {
            this.setState({ userAccount: text });
          }}
          placeholder={`userAccount`}
          value={userAccount}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`get User Info By User Account`}
          onPress={this.getUserInfoByUserAccount}
        />
      </>
    );
  }
}
