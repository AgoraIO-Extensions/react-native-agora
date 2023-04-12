import React, { ReactNode, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  ClientRoleType,
  ErrorCodeType,
  LocalVideoStreamError,
  LocalVideoStreamState,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoSourceType,
  VideoViewSetupMode,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSwitch,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';
import { useInitRtcEngine } from '../hooks/useInitRtcEngine';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import BaseRenderUsers from '../components/BaseRenderUsers';

export default function JoinChannelVideo() {
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    setJoinChannelSuccess,
    remoteUsers,
    setRemoteUsers,
    startPreview,
    engine,
  } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(true);
  const [switchCamera, setSwitchCamera] = useState(false);
  const [renderByTextureView, setRenderByTextureView] = useState(false);
  const [setupMode, setSetupMode] = useState(
    VideoViewSetupMode.VideoViewSetupReplace
  );

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
   * Step 3 (Optional): switchCamera
   */
  const _switchCamera = () => {
    engine.current.switchCamera();
    setSwitchCamera(!switchCamera);
  };

  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  useEffect(() => {
    engine.current.addListener('onError', (err: ErrorCodeType, msg: string) => {
      log.info('onError', 'err', err, 'msg', msg);
    });

    engine.current.addListener(
      'onJoinChannelSuccess',
      (connection: RtcConnection, elapsed: number) => {
        log.info(
          'onJoinChannelSuccess',
          'connection',
          connection,
          'elapsed',
          elapsed
        );
        setJoinChannelSuccess(true);
      }
    );

    engine.current.addListener(
      'onLeaveChannel',
      (connection: RtcConnection, stats: RtcStats) => {
        log.info('onLeaveChannel', 'connection', connection, 'stats', stats);
        setJoinChannelSuccess(false);
        setRemoteUsers([]);
      }
    );

    engine.current.addListener(
      'onUserJoined',
      (connection: RtcConnection, remoteUid: number, elapsed: number) => {
        log.info(
          'onUserJoined',
          'connection',
          connection,
          'remoteUid',
          remoteUid,
          'elapsed',
          elapsed
        );
        setRemoteUsers((prev) => {
          if (prev === undefined) return [];
          return [...prev, remoteUid];
        });
      }
    );

    engine.current.addListener(
      'onUserOffline',
      (
        connection: RtcConnection,
        remoteUid: number,
        reason: UserOfflineReasonType
      ) => {
        log.info(
          'onUserOffline',
          'connection',
          connection,
          'remoteUid',
          remoteUid,
          'reason',
          reason
        );
        setRemoteUsers((prev) => {
          if (prev === undefined) return [];
          return prev.filter((value) => value !== remoteUid);
        });
      }
    );

    engine.current.addListener(
      'onVideoDeviceStateChanged',
      (deviceId: string, deviceType: number, deviceState: number) => {
        log.info(
          'onVideoDeviceStateChanged',
          'deviceId',
          deviceId,
          'deviceType',
          deviceType,
          'deviceState',
          deviceState
        );
      }
    );

    engine.current.addListener(
      'onLocalVideoStateChanged',
      (
        source: VideoSourceType,
        state: LocalVideoStreamState,
        error: LocalVideoStreamError
      ) => {
        log.info(
          'onLocalVideoStateChanged',
          'source',
          source,
          'state',
          state,
          'error',
          error
        );
      }
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine, setJoinChannelSuccess, setRemoteUsers]);

  return (
    <BaseComponent
      name={'JoinChannelVideo'}
      enableVideo={true}
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
          renderVideo={renderVideo}
          startPreview={startPreview}
          joinChannelSuccess={joinChannelSuccess}
          remoteUsers={remoteUsers}
        />
      )}
      renderAction={renderAction}
    />
  );

  function renderVideo(uid: number): ReactNode {
    return renderByTextureView ? (
      <RtcTextureView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        canvas={{ uid, setupMode }}
      />
    ) : (
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid, setupMode }}
      />
    );
  }

  function renderConfiguration(): ReactNode {
    return (
      <>
        <AgoraSwitch
          disabled={
            (!startPreview && !joinChannelSuccess) || Platform.OS !== 'android'
          }
          title={`renderByTextureView`}
          value={renderByTextureView}
          onValueChange={(value) => {
            setRenderByTextureView(value);
          }}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'setupMode'}
          items={enumToItems(VideoViewSetupMode)}
          value={setupMode}
          onValueChange={(value) => {
            setSetupMode(value);
          }}
        />
        {setupMode === VideoViewSetupMode.VideoViewSetupAdd ? (
          <>
            <AgoraDivider />
            {renderByTextureView ? (
              <RtcTextureView
                style={AgoraStyle.videoSmall}
                canvas={{ uid: 0, setupMode }}
              />
            ) : (
              <RtcSurfaceView
                style={AgoraStyle.videoSmall}
                canvas={{ uid: 0, setupMode }}
              />
            )}
          </>
        ) : undefined}
        <AgoraDivider />
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={_switchCamera}
        />
      </>
    );
  }
}
