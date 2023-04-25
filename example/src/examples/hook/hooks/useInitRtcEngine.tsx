import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ErrorCodeType,
  IRtcEngineEx,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
} from 'react-native-agora';

import Config from '../../../config/agora.config';
import * as log from '../../../utils/log';

const useInitRtcEngine = (enableVideo: boolean) => {
  const [appId] = useState(Config.appId);
  const [channelId, setChannelId] = useState(Config.channelId);
  const [token] = useState(Config.token);
  const [uid, setUid] = useState(Config.uid);
  const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [startPreview, setStartPreview] = useState(false);

  const engine = useRef<IRtcEngineEx>(createAgoraRtcEngine() as IRtcEngineEx);

  const initRtcEngine = useCallback(async () => {
    if (!appId) {
      log.error(`appId is invalid`);
    }

    engine.current.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      if (!enableVideo) {
        // Need granted the microphone
        await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
      } else {
        // Need granted the microphone and camera permission
        await PermissionsAndroid.requestMultiple([
          'android.permission.RECORD_AUDIO',
          'android.permission.CAMERA',
        ]);
      }
    }

    // Only need to enable audio on this case
    engine.current.enableAudio();

    if (enableVideo) {
      // Need to enable video on this case
      // If you only call `enableAudio`, only relay the audio stream to the target channel
      engine.current.enableVideo();

      // Start preview before joinChannel
      engine.current.startPreview();
      setStartPreview(true);
    }
  }, [appId, enableVideo]);

  const onError = useCallback((err: ErrorCodeType, msg: string) => {
    log.info('onError', 'err', err, 'msg', msg);
  }, []);

  const onJoinChannelSuccess = useCallback(
    (connection: RtcConnection, elapsed: number) => {
      log.info(
        'onJoinChannelSuccess',
        'connection',
        connection,
        'elapsed',
        elapsed
      );
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setJoinChannelSuccess(true);
      }
    },
    [channelId, uid]
  );

  const onLeaveChannel = useCallback(
    (connection: RtcConnection, stats: RtcStats) => {
      log.info('onLeaveChannel', 'connection', connection, 'stats', stats);
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setJoinChannelSuccess(false);
        setRemoteUsers([]);
      }
    },
    [channelId, uid]
  );

  const onUserJoined = useCallback(
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
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setRemoteUsers((prev) => {
          if (prev === undefined) return [];
          return [...prev, remoteUid];
        });
      }
    },
    [channelId, uid]
  );

  const onUserOffline = useCallback(
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
      if (
        connection.channelId === channelId &&
        (connection.localUid === uid || uid === 0)
      ) {
        setRemoteUsers((prev) => {
          if (prev === undefined) return [];
          return prev!.filter((value) => value !== remoteUid);
        });
      }
    },
    [channelId, uid]
  );

  useEffect(() => {
    (async () => {
      await initRtcEngine();
    })();

    const engineCopy = engine.current;
    return () => {
      engineCopy.release();
    };
  }, [engine, initRtcEngine]);

  useEffect(() => {
    engine.current.addListener('onError', onError);
    engine.current.addListener('onJoinChannelSuccess', onJoinChannelSuccess);
    engine.current.addListener('onLeaveChannel', onLeaveChannel);
    engine.current.addListener('onUserJoined', onUserJoined);
    engine.current.addListener('onUserOffline', onUserOffline);

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeListener('onError', onError);
      engineCopy.removeListener('onJoinChannelSuccess', onJoinChannelSuccess);
      engineCopy.removeListener('onLeaveChannel', onLeaveChannel);
      engineCopy.removeListener('onUserJoined', onUserJoined);
      engineCopy.removeListener('onUserOffline', onUserOffline);
    };
  }, [
    engine,
    initRtcEngine,
    onError,
    onJoinChannelSuccess,
    onLeaveChannel,
    onUserJoined,
    onUserOffline,
  ]);

  return {
    appId,
    channelId,
    setChannelId,
    token,
    uid,
    setUid,
    joinChannelSuccess,
    setJoinChannelSuccess,
    remoteUsers,
    setRemoteUsers,
    startPreview,
    engine,
  };
};
export default useInitRtcEngine;
