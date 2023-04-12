import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import createAgoraRtcEngine, {
  ChannelProfileType,
  IRtcEngineEx,
} from 'react-native-agora';

import * as log from '../../../utils/log';

import Config from '../../../config/agora.config';

export function useInitRtcEngine(enableVideo: boolean) {
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

    if (enableVideo) {
      // Start preview before joinChannel
      engine.current.startPreview();
      setStartPreview(true);
    }
  }, [appId, enableVideo]);

  useEffect(() => {
    (async () => {
      await initRtcEngine();
    })();

    const engineCopy = engine.current;
    return () => {
      engineCopy.release();
    };
  }, [engine, initRtcEngine]);

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
}
