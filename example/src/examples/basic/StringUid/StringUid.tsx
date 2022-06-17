import React from 'react';
import { PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora-rtc-ng';

import {
  BaseAudioComponentState,
  BaseComponent,
  STYLES,
} from '../../../components/BaseComponent';
import { ActionItem } from '../../../components/ActionItem';

const Config = require('../../../config/agora.config.json');

interface State extends BaseAudioComponentState {
  userAccount: string;
}

export default class StringUid
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: false,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      userAccount: '',
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

    this.engine = createAgoraRtcEngine();
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      // Need granted the microphone permission
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
    }

    // Only need to enable audio on this case
    this.engine.enableAudio();
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, userAccount } = this.state;
    if (!channelId) {
      console.error('channelId is invalid');
      return;
    }
    if (!userAccount) {
      console.error('userAccount is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannelWithUserAccount2(token, channelId, userAccount, {
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
    this.engine?.release();
  }

  onLocalUserRegistered(uid: number, userAccount: string) {
    this.info('LocalUserRegistered', uid, userAccount);
  }

  protected renderBottom(): React.ReactNode {
    const { userAccount } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => this.setState({ userAccount: text })}
          placeholder={`userAccount`}
          value={userAccount}
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess } = this.state;
    return (
      <>
        <ActionItem
          disabled={!joinChannelSuccess}
          title={`get User Info By User Account`}
          onPress={this.getUserInfoByUserAccount}
        />
      </>
    );
  }
}
