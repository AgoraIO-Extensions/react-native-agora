import React, { ReactNode, useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import {
  BackgroundBlurDegree,
  BackgroundSourceType,
  ClientRoleType,
  ErrorCodeType,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraDropdown,
  AgoraTextInput,
} from '../../../components/ui';
import * as log from '../../../utils/log';
import { useInitRtcEngine } from '../hooks/useInitRtcEngine';
import { enumToItems, getAbsolutePath, getAssetPath } from '../../../utils';
import BaseRenderChannel from '../components/BaseRenderChannel';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderUsers from '../components/BaseRenderUsers';

export default function VirtualBackground() {
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

  const [background_source_type, setBackground_source_type] = useState<number>(
    BackgroundSourceType.BackgroundColor
  );
  const [color, setColor] = useState(0xffffff);
  const [source, setSource] = useState(getAssetPath('agora-logo.png'));
  const [blur_degree, setBlur_degree] = useState(
    BackgroundBlurDegree.BlurDegreeMedium
  );
  const [enableVirtualBackground, setEnableVirtualBackground] = useState(false);

  useEffect(() => {
    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      engine.current.loadExtensionProvider('agora_segmentation_extension');
    }
    engine.current.enableExtension(
      'agora_video_filters_segmentation',
      'portrait_segmentation',
      true
    );
  }, [engine]);

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
   * Step 3-1: enableVirtualBackground
   */
  const _enableVirtualBackground = async () => {
    if (
      background_source_type === BackgroundSourceType.BackgroundImg &&
      !source
    ) {
      log.error('source is invalid');
      return;
    }

    engine.current.enableVirtualBackground(
      true,
      {
        background_source_type,
        color,
        source: await getAbsolutePath(source),
        blur_degree,
      },
      {}
    );
    setEnableVirtualBackground(true);
  };

  /**
   * Step 3-2: disableVirtualBackground
   */
  const disableVirtualBackground = () => {
    engine.current.enableVirtualBackground(false, {}, {});
    setEnableVirtualBackground(false);
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

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine, setJoinChannelSuccess, setRemoteUsers]);

  return (
    <BaseComponent
      name={'VirtualBackground'}
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
          startPreview={startPreview}
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
          title={'backgroundSourceType'}
          items={enumToItems(BackgroundSourceType)}
          value={background_source_type}
          onValueChange={(value) => {
            setBackground_source_type(value);
          }}
        />
        {background_source_type === BackgroundSourceType.BackgroundColor ? (
          <ColorPicker
            style={styles.picker}
            onColorChange={(selectedColor) => {
              setColor(+fromHsv(selectedColor).replace('#', '0x'));
            }}
            color={`#${color?.toString(16)}`}
          />
        ) : undefined}
        <AgoraTextInput
          editable={
            background_source_type === BackgroundSourceType.BackgroundImg
          }
          onChangeText={(text) => {
            setSource(text);
          }}
          placeholder={'source'}
          value={source}
        />
        <AgoraDropdown
          enabled={
            background_source_type === BackgroundSourceType.BackgroundBlur
          }
          title={'blurDegree'}
          items={enumToItems(BackgroundBlurDegree)}
          value={blur_degree}
          onValueChange={(value) => {
            setBlur_degree(value);
          }}
        />
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!(startPreview || joinChannelSuccess)}
          title={`${
            enableVirtualBackground ? 'disable' : 'enable'
          } Virtual Background`}
          onPress={
            enableVirtualBackground
              ? disableVirtualBackground
              : _enableVirtualBackground
          }
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 200,
  },
});
