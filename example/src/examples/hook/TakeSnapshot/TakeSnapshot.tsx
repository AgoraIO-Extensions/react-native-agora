import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import {
  ClientRoleType,
  ErrorCodeType,
  RtcConnection,
} from 'react-native-agora';
import RNFS from 'react-native-fs';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraImage,
  AgoraStyle,
} from '../../../components/ui';
import { arrayToItems } from '../../../utils';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import BaseRenderUsers from '../components/BaseRenderUsers';
import useInitRtcEngine from '../hooks/useInitRtcEngine';

export default function TakeSnapshot() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    engine,
  } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(enableVideo);

  const [targetUid, setTargetUid] = useState<number>(0);
  const [osFilePath] = useState<string>(
    `${
      Platform.OS === 'android'
        ? RNFS.ExternalCachesDirectoryPath
        : RNFS.DocumentDirectoryPath
    }`
  );
  const timestamp = useRef<number>(0);
  const [takeSnapshot, setTakeSnapshot] = useState<boolean>(false);

  /**
   * Step 2: joinChannel
   */
  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    engine.current.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  /**
   * Step 3: takeSnapshot
   */
  const _takeSnapshot = () => {
    if (!osFilePath) {
      log.error('filePath is invalid');
      return;
    }
    timestamp.current = new Date().getTime();
    engine.current.takeSnapshot(
      targetUid,
      `${osFilePath}/${targetUid}-${timestamp.current}.jpg`
    );
    setTakeSnapshot(false);
  };
  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  useEffect(() => {
    engine.current.addListener(
      'onSnapshotTaken',
      (
        connection: RtcConnection,
        uid: number,
        filePath: string,
        width: number,
        height: number,
        errCode: number
      ) => {
        log.info(
          'onSnapshotTaken',
          'connection',
          connection,
          'uid',
          uid,
          'filePath',
          filePath,
          'width',
          width,
          'height',
          height,
          'errCode',
          errCode
        );
        if (
          filePath === `${osFilePath}/${targetUid}-${timestamp.current}.jpg`
        ) {
          setTakeSnapshot(errCode === ErrorCodeType.ErrOk);
        }
      }
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine, osFilePath, targetUid]);

  return (
    <BaseComponent
      name={'TakeSnapshot'}
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
          enableVideo={enableVideo}
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
        <AgoraDropdown
          title={'TakeSnapshot'}
          items={arrayToItems([0, ...remoteUsers])}
          value={targetUid}
          onValueChange={(value) => {
            setTargetUid(value);
          }}
        />
        {takeSnapshot ? (
          <>
            <AgoraDivider />
            <AgoraImage
              style={AgoraStyle.image}
              source={{
                uri: `${
                  Platform.OS === 'android' ? 'file://' : ''
                }${osFilePath}/${targetUid}-${timestamp.current}.jpg`,
              }}
            />
          </>
        ) : undefined}
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`take Snapshot`}
          onPress={_takeSnapshot}
        />
      </>
    );
  }
}
