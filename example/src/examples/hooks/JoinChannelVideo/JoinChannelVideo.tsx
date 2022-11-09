import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
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

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default function JoinChannelVideo() {
  const [appId] = useState(Config.appId);
  const [enableVideo] = useState(true);
  const [channelId, setChannelId] = useState(Config.channelId);
  const [token] = useState(Config.token);
  const [uid] = useState(Config.uid);
  const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [startPreview, setStartPreview] = useState(false);
  const [switchCamera, setSwitchCamera] = useState(false);
  const [renderByTextureView, setRenderByTextureView] = useState(false);
  const [setupMode, setSetupMode] = useState(
    VideoViewSetupMode.VideoViewSetupReplace
  );

  const engine = useRef(createAgoraRtcEngine());

  /**
   * Step 1: initRtcEngine
   */
  const initRtcEngine = useCallback(async () => {
    if (!appId) {
      console.error(`appId is invalid`);
    }

    engine.current.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    engine.current.enableVideo();

    // Start preview before joinChannel
    engine.current.startPreview();
    setStartPreview(true);
  }, [appId]);

  /**
   * Step 2: joinChannel
   */
  const joinChannel = () => {
    if (!channelId) {
      console.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      console.error('uid is invalid');
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
  const updateSwitchCamera = () => {
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
    initRtcEngine().then(() => {
      /**
       * ⚠️ must call before `addListener` if you want to receive the events from {@link IRtcEngineEventHandler}
       */
      engine.current.registerEventHandler({});

      engine.current.addListener(
        'onError',
        (err: ErrorCodeType, msg: string) => {
          console.info('onError', 'err', err, 'msg', msg);
        }
      );

      engine.current.addListener(
        'onJoinChannelSuccess',
        (connection: RtcConnection, elapsed: number) => {
          console.info(
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
          console.info(
            'onLeaveChannel',
            'connection',
            connection,
            'stats',
            stats
          );
          setJoinChannelSuccess(false);
          setRemoteUsers([]);
        }
      );

      engine.current.addListener(
        'onUserJoined',
        (connection: RtcConnection, remoteUid: number, elapsed: number) => {
          console.info(
            'onUserJoined',
            'connection',
            connection,
            'remoteUid',
            remoteUid,
            'elapsed',
            elapsed
          );
          setRemoteUsers((r) => {
            if (r === undefined) return [];
            return [...r, remoteUid];
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
          console.info(
            'onUserOffline',
            'connection',
            connection,
            'remoteUid',
            remoteUid,
            'reason',
            reason
          );
          setRemoteUsers((r) => {
            if (r === undefined) return [];
            return r.filter((value) => value !== remoteUid);
          });
        }
      );

      engine.current.addListener(
        'onVideoDeviceStateChanged',
        (deviceId: string, deviceType: number, deviceState: number) => {
          console.info(
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
          console.info(
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
    });

    const engineCopy = engine.current;
    return () => {
      engineCopy.release();
    };
  }, [initRtcEngine]);

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

  function renderUsers(): React.ReactNode {
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

  function renderVideo(uid: number): React.ReactNode {
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

  function renderConfiguration(): React.ReactNode {
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

  function renderAction(): React.ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={updateSwitchCamera}
        />
      </>
    );
  }
}
