import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalVideoStreamError,
  LocalVideoStreamState,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoSourceType,
  VideoViewSetupMode,
  IRtcEngine,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSwitch,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';
import { LogSink } from '../../../components/LogSink';
import { StackScreenProps } from '@react-navigation/stack/src/types';

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default function JoinChannelVideo(props: {} & StackScreenProps<{}>) {
  const [appId] = useState(Config.appId);
  const [token] = useState(Config.token);
  const [uid] = useState(Config.uid);
  const [engine] = useState(createAgoraRtcEngine());

  const [enableVideo, setEnableVideo] = useState(true);
  const [channelId, setChannelId] = useState(Config.channelId);
  const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [startPreview, setStartPreview] = useState(false);
  const [switchCamera, setSwitchCamera] = useState(false);
  const [renderByTextureView, setSrenderByTextureView] = useState(false);

  const [setupMode, setSetupMode] = useState(
    VideoViewSetupMode.VideoViewSetupReplace
  );

  const initRtcEngine = async () => {
    if (!appId) {
      console.log(`appId is invalid`);
    }

    engine.initialize({
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

    engine.enableVideo();
    engine.startPreview();
    setStartPreview(true);
  };

  const leaveChannel = () => {
    engine.leaveChannel();
  };

  const joinChannel = () => {
    if (!channelId) {
      console.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      console.error('uid is invalid');
      return;
    }
    engine.joinChannel(token, channelId, uid, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  useEffect(() => {
    initRtcEngine();

    engine.addListener?.('onError', (err: ErrorCodeType, msg: string) => {
      console.log('onError', 'err', err, 'msg', msg);
    });

    engine.addListener?.(
      'onJoinChannelSuccess',
      (connection: RtcConnection, elapsed: number) => {
        setJoinChannelSuccess(true);
        console.log('addListener:onJoinChannelSuccess', {
          connection,
          elapsed,
        });
      }
    );

    engine.addListener?.(
      'onLeaveChannel',
      (connection: RtcConnection, stats: RtcStats) => {
        setJoinChannelSuccess(false);
        console.log(
          'addListener:onLeaveChannel==>',
          'connection',
          connection,
          'stats',
          stats
        );
      }
    );

    engine.addListener?.(
      'onUserJoined',
      (connection: RtcConnection, remoteUid: number, elapsed: number) => {
        console.log(
          'onUserJoined',
          'connection',
          connection,
          'remoteUid',
          remoteUid,
          'elapsed',
          elapsed
        );

        if (remoteUsers === undefined) return;
        setRemoteUsers([...remoteUsers!, remoteUid]);
      }
    );

    engine.addListener?.(
      'onUserOffline',
      (
        connection: RtcConnection,
        remoteUid: number,
        reason: UserOfflineReasonType
      ) => {
        console.log(
          'onUserOffline',
          'connection',
          connection,
          'remoteUid',
          remoteUid,
          'reason',
          reason
        );
        if (remoteUsers === undefined) return;
        setRemoteUsers([...remoteUsers!, remoteUid]);
      }
    );
    engine.addListener?.(
      'onVideoDeviceStateChanged',
      (deviceId: string, deviceType: number, deviceState: number) => {
        console.log(
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
    engine.addListener?.(
      'onLocalVideoStateChanged',
      (
        source: VideoSourceType,
        state: LocalVideoStreamState,
        error: LocalVideoStreamError
      ) => {
        console.log(
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

    return () => {
      engine.removeAllListeners?.('onError');
      engine.removeAllListeners?.('onJoinChannelSuccess');
      engine.removeAllListeners?.('onLeaveChannel');
      engine.removeAllListeners?.('onUserJoined');
      engine.removeAllListeners?.('onUserOffline');
      engine.release();
    };
  }, []);

  const configuration = renderConfiguration();
  return (
    <KeyboardAvoidingView
      style={AgoraStyle.fullSize}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AgoraView style={AgoraStyle.fullWidth}>{renderChannel()}</AgoraView>
      {enableVideo ? (
        <AgoraView style={AgoraStyle.videoLarge}>{renderUsers()}</AgoraView>
      ) : undefined}

      {configuration ? (
        <>
          <AgoraDivider />
          <AgoraText style={styles.title}>
            The Configuration of JoinChannelVideo
          </AgoraText>
          <AgoraDivider />
          <ScrollView style={AgoraStyle.fullSize}>{configuration}</ScrollView>
        </>
      ) : undefined}
      <AgoraView style={AgoraStyle.float}>{renderAction()}</AgoraView>
    </KeyboardAvoidingView>
  );

  function renderChannel() {
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            setChannelId(text);
          }}
          placeholder={`channelId`}
          value={channelId}
        />

        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? leaveChannel() : joinChannel();
          }}
        />
      </>
    );
  }

  function renderUsers() {
    return (
      <>
        {startPreview || joinChannelSuccess ? renderVideo(0) : undefined}
        {remoteUsers !== undefined && remoteUsers.length > 0 ? (
          <ScrollView horizontal={true} style={AgoraStyle.videoContainer}>
            {remoteUsers.map((value, index) => (
              <AgoraView key={`${value}-${index}`}>
                {renderVideo(value)}
              </AgoraView>
            ))}
          </ScrollView>
        ) : undefined}
      </>
    );
  }

  function renderVideo(uid: number) {
    return (
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid }}
      />
    );
  }

  function renderConfiguration() {
    return (
      <>
        <AgoraSwitch
          disabled={
            (!startPreview && !joinChannelSuccess) || Platform.OS !== 'android'
          }
          title={`renderByTextureView`}
          value={renderByTextureView}
          onValueChange={(value) => {
            setSrenderByTextureView(value);
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

  function renderAction() {
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={() => {
            engine.switchCamera();
            setSwitchCamera(!switchCamera);
          }}
        />
      </>
    );
  }
}
