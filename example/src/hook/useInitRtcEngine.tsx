import React, { useCallback, useEffect, useState } from 'react';
import Config from '../config/agora.config';
import { ChannelProfileType, IRtcEngine } from 'react-native-agora';
import * as log from '../utils/log';
import { PermissionsAndroid, Platform } from 'react-native';

export interface InitRtcEngineReturn {
  appId: string;
  token: string;
  startPreview: boolean;
  initRtcEngine: () => Promise<void>;
}

export interface InitRtcEngineProps {
  enableAudio: boolean;
  enableVideo: boolean;
  enablePreview: boolean;
  engine: IRtcEngine;
  setupOtherExtension?: () => void;
}

export function useInitRtcEngine({
  enableAudio,
  enableVideo,
  enablePreview,
  engine,
  setupOtherExtension,
}: InitRtcEngineProps): InitRtcEngineReturn {
  const [appId] = useState<string>(Config.appId);
  const [token] = useState<string>(Config.token);
  const [startPreview, setStartPreview] = useState<boolean>(false);
  const initRtcEngine = useCallback(async () => {
    if (!appId) {
      log.error(`appId is invalid`);
    }
    engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (enableAudio) {
      if (Platform.OS === 'android') {
        // Need granted the microphone
        await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
      }
      // Only need to enable audio on this case
      engine.enableAudio();
    }

    if (enableVideo) {
      if (Platform.OS === 'android') {
        // Need granted the microphone and camera permission
        await PermissionsAndroid.requestMultiple([
          'android.permission.RECORD_AUDIO',
          'android.permission.CAMERA',
        ]);
      }
      // Need to enable video on this case
      // If you only call `enableAudio`, only relay the audio stream to the target channel
      engine.enableVideo();
    }

    if (enablePreview) {
      // Need to startPreview before joinChannelEx
      engine.startPreview();
      setStartPreview(true);
    }
    typeof setupOtherExtension === 'function' && setupOtherExtension();
  }, [appId]);

  useEffect(() => {
    (async () => {
      await initRtcEngine();
    })();

    const engineCopy = engine;
    return () => {
      engineCopy.release();
    };
  }, [initRtcEngine]);

  return {
    appId,
    token,
    startPreview,
    initRtcEngine,
  };
}
