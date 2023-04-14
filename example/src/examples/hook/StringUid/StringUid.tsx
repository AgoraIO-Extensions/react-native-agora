import React, { ReactNode, useEffect, useState } from 'react';
import { ClientRoleType } from 'react-native-agora';

import { AgoraButton, AgoraTextInput } from '../../../components/ui';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import BaseRenderUsers from '../components/BaseRenderUsers';
import { useInitRtcEngine } from '../hooks/useInitRtcEngine';

export default function StringUid() {
  const {
    channelId,
    setChannelId,
    token,
    joinChannelSuccess,
    remoteUsers,
    engine,
  } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(false);

  const [userAccount, setUserAccount] = useState<string>('');

  /**
   * Step 2: joinChannel
   */
  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (!userAccount) {
      log.error('userAccount is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    engine.current.joinChannelWithUserAccount(token, channelId, userAccount, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  /**
   * Step 3 (Optional): getUserInfoByUserAccount
   */
  const getUserInfoByUserAccount = () => {
    const userInfo = engine.current.getUserInfoByUserAccount(userAccount);
    if (userInfo) {
      log.debug('getUserInfoByUserAccount', userInfo);
    } else {
      log.error('getUserInfoByUserAccount');
    }
  };

  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  useEffect(() => {
    engine.current.addListener(
      'onLocalUserRegistered',
      (uid: number, userAccount: string) => {
        log.info('LocalUserRegistered', 'uid', uid, 'userAccount', userAccount);
      }
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine]);

  return (
    <BaseComponent
      name={'StringUid'}
      renderConfiguration={renderConfiguration}
      renderChannel={() => (
        <BaseRenderChannel
          channelId={channelId}
          joinChannel={joinChannel}
          leaveChannel={leaveChannel}
          joinChannelSuccess={joinChannelSuccess}
          onChannelIdChange={setChannelId}
        />
      )}
      renderUsers={() => (
        <BaseRenderUsers
          joinChannelSuccess={joinChannelSuccess}
          remoteUsers={remoteUsers}
        />
      )}
      renderAction={renderAction}
    />
  );

  function renderConfiguration(): ReactNode {
    return (
      <>
        <AgoraTextInput
          editable={!joinChannelSuccess}
          onChangeText={(text) => {
            setUserAccount(text);
          }}
          placeholder={`userAccount`}
          value={userAccount}
        />
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`get User Info By User Account`}
          onPress={getUserInfoByUserAccount}
        />
      </>
    );
  }
}
