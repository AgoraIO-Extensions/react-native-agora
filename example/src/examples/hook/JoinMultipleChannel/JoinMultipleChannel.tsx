import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ClientRoleType,
  RemoteVideoState,
  RemoteVideoStateReason,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraCard,
  AgoraList,
  AgoraStyle,
  AgoraTextInput,
} from '../../../components/ui';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import { useInitRtcEngine } from '../hooks/useInitRtcEngine';

export default function JoinMultipleChannel() {
  const {
    channelId,
    setChannelId,
    token,
    uid,
    setUid,
    joinChannelSuccess,
    remoteUsers,
    setRemoteUsers,
    startPreview,
    engine,
  } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(true);

  const [channelId2, setChannelId2] = useState<string>('');
  const [token2] = useState<string>('');
  const [uid2, setUid2] = useState<number>(0);
  const [joinChannelSuccess2, setJoinChannelSuccess2] =
    useState<boolean>(false);
  const [remoteUsers2, setRemoteUsers2] = useState<number[]>([]);

  /**
   * Step 2-1: joinChannel
   */
  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid <= 0) {
      log.error('uid is invalid');
      return;
    }
    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    engine.current.joinChannelEx(
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
  };

  /**
   * Step 2-2: joinChannel2
   */
  const joinChannel2 = () => {
    if (!channelId2) {
      log.error('channelId2 is invalid');
      return;
    }
    if (uid2 < 0) {
      log.error('uid2 is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    engine.current.joinChannelEx(
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
  };

  /**
   * Step 3-1: publishStreamToChannel
   */
  const publishStreamToChannel = () => {
    engine.current.updateChannelMediaOptionsEx(
      { publishMicrophoneTrack: false, publishCameraTrack: false },
      {
        channelId: channelId2,
        localUid: uid2,
      }
    );
    engine.current.updateChannelMediaOptionsEx(
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
  const publishStreamToChannel2 = () => {
    engine.current.updateChannelMediaOptionsEx(
      { publishMicrophoneTrack: false, publishCameraTrack: false },
      {
        channelId,
        localUid: uid,
      }
    );
    engine.current.updateChannelMediaOptionsEx(
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
  const leaveChannel = () => {
    engine.current.leaveChannelEx({
      channelId,
      localUid: uid,
    });
  };

  /**
   * Step 4-2: leaveChannel2
   */
  const leaveChannel2 = () => {
    engine.current.leaveChannelEx({
      channelId: channelId2,
      localUid: uid2,
    });
  };

  const onJoinChannelSuccess = useCallback(
    (connection: RtcConnection, elapsed: number) => {
      if (connection.channelId === channelId2 && connection.localUid === uid2) {
        setJoinChannelSuccess2(true);
      }
    },
    [channelId2, uid2]
  );

  const onLeaveChannel = useCallback(
    (connection: RtcConnection, stats: RtcStats) => {
      if (connection.channelId === channelId2 && connection.localUid === uid2) {
        setJoinChannelSuccess2(false);
        setRemoteUsers2([]);
      }
      // Keep preview after leave channel
      engine.current.startPreview();
    },
    [channelId2, engine, uid2]
  );

  const onRemoteVideoStateChanged = useCallback(
    (
      connection: RtcConnection,
      remoteUid: number,
      state: RemoteVideoState,
      reason: RemoteVideoStateReason,
      elapsed: number
    ) => {
      log.info(
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
      if (state === RemoteVideoState.RemoteVideoStateStarting) {
        if (connection.channelId === channelId && connection.localUid === uid) {
          setRemoteUsers((prev) => {
            return [...prev, remoteUid];
          });
        } else if (
          connection.channelId === channelId2 &&
          connection.localUid === uid2
        ) {
          setRemoteUsers2((prev) => {
            return [...prev, remoteUid];
          });
        }
      } else if (state === RemoteVideoState.RemoteVideoStateStopped) {
        if (connection.channelId === channelId && connection.localUid === uid) {
          setRemoteUsers((prev) => {
            return prev.filter((value) => value !== remoteUid);
          });
        } else if (
          connection.channelId === channelId2 &&
          connection.localUid === uid2
        ) {
          setRemoteUsers2((prev) => {
            return prev.filter((value) => value !== remoteUid);
          });
        }
      }
    },
    [channelId, channelId2, setRemoteUsers, uid, uid2]
  );

  useEffect(() => {
    engine.current.addListener('onJoinChannelSuccess', onJoinChannelSuccess);
    engine.current.addListener('onLeaveChannel', onLeaveChannel);
    engine.current.addListener(
      'onRemoteVideoStateChanged',
      onRemoteVideoStateChanged
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine, onJoinChannelSuccess, onLeaveChannel, onRemoteVideoStateChanged]);

  return (
    <BaseComponent
      name={'JoinMultipleChannel'}
      renderChannel={renderChannel}
      renderUsers={renderUsers}
      renderAction={renderAction}
    />
  );

  function renderChannel(): ReactNode {
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            setChannelId(text);
          }}
          placeholder={`channelId`}
          value={channelId}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            setUid(+text);
          }}
          numberKeyboard={true}
          placeholder={`uid (must > 0)`}
          value={uid > 0 ? uid.toString() : ''}
        />
        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? leaveChannel() : joinChannel();
          }}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            setChannelId2(text);
          }}
          placeholder={`channelId2`}
          value={channelId2}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            setUid2(+text);
          }}
          numberKeyboard={true}
          placeholder={`uid2 (must > 0)`}
          value={uid2 > 0 ? uid2.toString() : ''}
        />
        <AgoraButton
          title={`${joinChannelSuccess2 ? 'leave' : 'join'} Channel2`}
          onPress={() => {
            joinChannelSuccess2 ? leaveChannel2() : joinChannel2();
          }}
        />
      </>
    );
  }

  function renderUsers(): ReactNode {
    return (
      <>
        {startPreview || joinChannelSuccess || joinChannelSuccess2 ? (
          <AgoraList
            data={[0, ...remoteUsers, ...remoteUsers2]}
            renderItem={({ item }) => {
              return renderVideo(
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

  function renderVideo(
    uid: number,
    channelId?: string,
    localUid?: number
  ): ReactElement {
    return (
      <AgoraCard title={`${channelId} - ${uid}`}>
        <RtcSurfaceView
          style={AgoraStyle.videoSmall}
          canvas={{ uid }}
          connection={{ channelId, localUid }}
        />
      </AgoraCard>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`publish Stream To Channel`}
          onPress={publishStreamToChannel}
        />
        <AgoraButton
          disabled={!joinChannelSuccess2}
          title={`publish Stream To Channel2`}
          onPress={publishStreamToChannel2}
        />
      </>
    );
  }
}
