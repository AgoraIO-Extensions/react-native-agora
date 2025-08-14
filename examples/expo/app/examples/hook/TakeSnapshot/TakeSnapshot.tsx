import RNFS from 'expo-file-system';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';
import {
  ClientRoleType,
  ErrorCodeType,
  RtcConnection,
} from 'react-native-agora';

import { BaseComponent } from '../../../../src/components/hook/BaseComponent';
import BaseRenderChannel from '../../../../src/components/hook/BaseRenderChannel';
import BaseRenderUsers from '../../../../src/components/hook/BaseRenderUsers';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraImage,
  AgoraStyle,
} from '../../../../src/components/ui';
import { arrayToItems } from '../../../../src/utils';
import * as log from '../../../../src/utils/log';
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
      Platform.OS === 'android' ? RNFS.cacheDirectory : RNFS.documentDirectory
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

  const onSnapshotTaken = useCallback(
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
      if (filePath === `${osFilePath}/${targetUid}-${timestamp.current}.jpg`) {
        setTakeSnapshot(errCode === ErrorCodeType.ErrOk);
      }
    },
    [osFilePath, targetUid]
  );

  useEffect(() => {
    engine.current.addListener('onSnapshotTaken', onSnapshotTaken);

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeListener('onSnapshotTaken', onSnapshotTaken);
    };
  }, [engine, onSnapshotTaken]);

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

  function renderConfiguration(): ReactElement | undefined {
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

  function renderAction(): ReactElement | undefined {
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
