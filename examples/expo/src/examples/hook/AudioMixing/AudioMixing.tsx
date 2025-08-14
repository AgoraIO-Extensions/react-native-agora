import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  AudioMixingReasonType,
  AudioMixingStateType,
  ClientRoleType,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraDivider,
  AgoraSwitch,
  AgoraTextInput,
} from '../../../../src/components/ui';
import { getResourcePath } from '../../../../src/utils';
import * as log from '../../../../src/utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import useInitRtcEngine from '../hooks/useInitRtcEngine';

export default function AudioMixing() {
  const [enableVideo] = useState<boolean>(false);
  const { channelId, setChannelId, token, uid, joinChannelSuccess, engine } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(enableVideo);

  const [filePath, setFilePath] = useState<string>(
    getResourcePath('effect.mp3')
  );
  const [loopback, setLoopback] = useState<boolean>(false);
  const [cycle, setCycle] = useState<number>(-1);
  const [startPos, setStartPos] = useState<number>(0);
  const [startAudioMixing, setStartAudioMixing] = useState<boolean>(false);
  const [pauseAudioMixing, setPauseAudioMixing] = useState<boolean>(false);

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
   * Step 3-1: startAudioMixing
   */
  const _startAudioMixing = () => {
    if (!filePath) {
      log.error('filePath is invalid');
      return;
    }
    if (cycle < -1) {
      log.error('cycle is invalid');
      return;
    }
    if (startPos < 0) {
      log.error('startPos is invalid');
      return;
    }

    engine.current.startAudioMixing(filePath, loopback, cycle, startPos);
  };

  /**
   * Step 3-2 (Optional): pauseAudioMixing
   */
  const _pauseAudioMixing = () => {
    engine.current.pauseAudioMixing();
  };

  /**
   * Step 3-3 (Optional): resumeAudioMixing
   */
  const resumeAudioMixing = () => {
    engine.current.resumeAudioMixing();
  };

  /**
   * Step 3-4 (Optional): getAudioMixingCurrentPosition
   */
  const getAudioMixingCurrentPosition = () => {
    const position = engine.current.getAudioMixingCurrentPosition();
    const duration = engine.current.getAudioMixingDuration();
    log.debug(
      'getAudioMixingCurrentPosition',
      'position',
      position,
      'duration',
      duration
    );
  };

  /**
   * Step 3-5: stopAudioMixing
   */
  const stopAudioMixing = () => {
    engine.current.stopAudioMixing();
  };

  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  const onAudioMixingStateChanged = useCallback(
    (state: AudioMixingStateType, reason: AudioMixingReasonType) => {
      log.info('onAudioMixingStateChanged', 'state', state, 'reason', reason);
      switch (state) {
        case AudioMixingStateType.AudioMixingStatePlaying:
          setStartAudioMixing(true);
          setPauseAudioMixing(false);
          break;
        case AudioMixingStateType.AudioMixingStatePaused:
          setPauseAudioMixing(true);
          break;
        case AudioMixingStateType.AudioMixingStateStopped:
        case AudioMixingStateType.AudioMixingStateFailed:
          setStartAudioMixing(false);
          break;
      }
    },
    []
  );

  const onAudioMixingFinished = useCallback(() => {
    log.info('AudioMixingFinished');
  }, []);

  const onAudioRoutingChanged = useCallback((routing: number) => {
    log.info('onAudioRoutingChanged', 'routing', routing);
  }, []);

  useEffect(() => {
    engine.current.addListener(
      'onAudioMixingStateChanged',
      onAudioMixingStateChanged
    );
    engine.current.addListener('onAudioMixingFinished', onAudioMixingFinished);
    engine.current.addListener('onAudioRoutingChanged', onAudioRoutingChanged);

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeListener(
        'onAudioMixingStateChanged',
        onAudioMixingStateChanged
      );
      engineCopy.removeListener('onAudioMixingFinished', onAudioMixingFinished);
      engineCopy.removeListener('onAudioRoutingChanged', onAudioRoutingChanged);
    };
  }, [
    engine,
    onAudioMixingFinished,
    onAudioMixingStateChanged,
    onAudioRoutingChanged,
  ]);

  return (
    <BaseComponent
      name={'AudioMixing'}
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
      renderAction={renderAction}
    />
  );

  function renderConfiguration(): ReactElement | undefined {
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            setFilePath(text);
          }}
          placeholder={'filePath'}
          value={filePath}
        />
        <AgoraSwitch
          title={'loopback'}
          value={loopback}
          onValueChange={(value) => {
            setLoopback(value);
          }}
        />
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            setCycle((prev) => (text === '' ? prev : +text));
          }}
          numberKeyboard={true}
          placeholder={`cycle (defaults: ${cycle})`}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            setStartPos((prev) => (text === '' ? prev : +text));
          }}
          numberKeyboard={true}
          placeholder={`startPos (defaults: ${startPos})`}
        />
      </>
    );
  }

  function renderAction(): ReactElement | undefined {
    return (
      <>
        <AgoraButton
          title={`${startAudioMixing ? 'stop' : 'start'} Audio Mixing`}
          onPress={startAudioMixing ? stopAudioMixing : _startAudioMixing}
        />
        <AgoraButton
          disabled={!startAudioMixing}
          title={`${pauseAudioMixing ? 'resume' : 'pause'} Audio Mixing`}
          onPress={pauseAudioMixing ? resumeAudioMixing : _pauseAudioMixing}
        />
        <AgoraButton
          disabled={!startAudioMixing}
          title={`get Audio Mixing Current Position`}
          onPress={getAudioMixingCurrentPosition}
        />
      </>
    );
  }
}
