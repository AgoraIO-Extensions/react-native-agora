import React, { ReactNode, useEffect, useState } from 'react';
import {
  ClientRoleType,
  EarMonitoringFilterType,
  ErrorCodeType,
  LocalAudioStreamError,
  LocalAudioStreamState,
  MediaDeviceType,
  RtcConnection,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import BaseRenderUsers from '../components/BaseRenderUsers';
import { useInitRtcEngine } from '../hooks/useInitRtcEngine';

export default function JoinChannelAudio() {
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
    useInitRtcEngine(false);

  const [enableLocalAudio, setEnableLocalAudio] = useState(true);
  const [muteLocalAudioStream, setMuteLocalAudioStream] = useState(false);
  const [enableSpeakerphone, setEnableSpeakerphone] = useState(false);
  const [recordingSignalVolume, setRecordingSignalVolume] = useState(100);
  const [playbackSignalVolume, setPlaybackSignalVolume] = useState(100);
  const [includeAudioFilters, setIncludeAudioFilters] = useState(
    EarMonitoringFilterType.EarMonitoringFilterNone
  );
  const [enableInEarMonitoring, setEnableInEarMonitoring] = useState(false);
  const [inEarMonitoringVolume, setInEarMonitoringVolume] = useState(100);

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
   * Step 3-1-1 (Optional): enableLocalAudio
   */
  const _enableLocalAudio = () => {
    engine.current.enableLocalAudio(true);
    setEnableLocalAudio(true);
  };

  /**
   * Step 3-1-2 (Optional): disableLocalAudio
   */
  const disableLocalAudio = () => {
    engine.current.enableLocalAudio(false);
    setEnableLocalAudio(false);
  };

  /**
   * Step 3-2-1 (Optional): muteLocalAudioStream
   */
  const _muteLocalAudioStream = () => {
    engine.current.muteLocalAudioStream(true);
    setMuteLocalAudioStream(true);
  };

  /**
   * Step 3-2-2 (Optional): unmuteLocalAudioStream
   */
  const unmuteLocalAudioStream = () => {
    engine.current.muteLocalAudioStream(false);
    setMuteLocalAudioStream(false);
  };

  /**
   * Step 3-3-1 (Optional): enableSpeakerphone
   */
  const _enableSpeakerphone = () => {
    engine.current.setEnableSpeakerphone(true);
    setEnableSpeakerphone(true);
  };

  /**
   * Step 3-3-2 (Optional): disableSpeakerphone
   */
  const disableSpeakerphone = () => {
    engine.current.setEnableSpeakerphone(false);
    setEnableSpeakerphone(false);
  };

  /**
   * Step 3-4 (Optional): adjustRecordingSignalVolume
   */
  const adjustRecordingSignalVolume = () => {
    engine.current.adjustRecordingSignalVolume(recordingSignalVolume);
  };

  /**
   * Step 3-5 (Optional): adjustPlaybackSignalVolume
   */
  const adjustPlaybackSignalVolume = () => {
    engine.current.adjustPlaybackSignalVolume(playbackSignalVolume);
  };

  /**
   * Step 3-6-1 (Optional): enableInEarMonitoring
   */
  const _enableInEarMonitoring = () => {
    if (
      engine.current.enableInEarMonitoring(true, includeAudioFilters) ===
      ErrorCodeType.ErrOk
    ) {
      setEnableInEarMonitoring(true);
    }
  };

  /**
   * Step 3-6-2 (Optional): setInEarMonitoringVolume
   */
  const _setInEarMonitoringVolume = () => {
    engine.current.setInEarMonitoringVolume(inEarMonitoringVolume);
  };

  /**
   * Step 3-6-3 (Optional): disableInEarMonitoring
   */
  const disableInEarMonitoring = () => {
    if (
      engine.current.enableInEarMonitoring(false, includeAudioFilters) ===
      ErrorCodeType.ErrOk
    ) {
      setEnableInEarMonitoring(false);
    }
  };

  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  useEffect(() => {
    engine.current.addListener(
      'onAudioDeviceStateChanged',
      (deviceId: string, deviceType: number, deviceState: number) => {
        log.info(
          'onAudioDeviceStateChanged',
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
      'onAudioDeviceVolumeChanged',
      (deviceType: MediaDeviceType, volume: number, muted: boolean) => {
        log.info(
          'onAudioDeviceVolumeChanged',
          'deviceType',
          deviceType,
          'volume',
          volume,
          'muted',
          muted
        );
      }
    );

    engine.current.addListener(
      'onLocalAudioStateChanged',
      (
        connection: RtcConnection,
        state: LocalAudioStreamState,
        error: LocalAudioStreamError
      ) => {
        log.info(
          'onLocalAudioStateChanged',
          'connection',
          connection,
          'state',
          state,
          'error',
          error
        );
      }
    );

    engine.current.addListener('onAudioRoutingChanged', (routing: number) => {
      log.info('onAudioRoutingChanged', 'routing', routing);
    });

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine]);

  return (
    <BaseComponent
      name={'JoinChannelAudio'}
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
          enableVideo={false}
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
        <AgoraSlider
          title={`recordingSignalVolume ${recordingSignalVolume}`}
          minimumValue={0}
          maximumValue={400}
          step={1}
          value={recordingSignalVolume}
          onSlidingComplete={(value) => {
            setRecordingSignalVolume(value);
          }}
        />
        <AgoraButton
          title={'adjust Recording Signal Volume'}
          onPress={adjustRecordingSignalVolume}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`playbackSignalVolume ${playbackSignalVolume}`}
          minimumValue={0}
          maximumValue={400}
          step={1}
          value={playbackSignalVolume}
          onSlidingComplete={(value) => {
            setPlaybackSignalVolume(value);
          }}
        />
        <AgoraButton
          title={'adjust Playback Signal Volume'}
          onPress={adjustPlaybackSignalVolume}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'includeAudioFilters'}
          items={enumToItems(EarMonitoringFilterType)}
          value={includeAudioFilters}
          onValueChange={(value) => {
            setIncludeAudioFilters(value);
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`inEarMonitoringVolume ${inEarMonitoringVolume}`}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={inEarMonitoringVolume}
          onSlidingComplete={(value) => {
            setInEarMonitoringVolume(value);
          }}
        />
        <AgoraButton
          disabled={!enableInEarMonitoring}
          title={`set In Ear Monitoring Volume`}
          onPress={_setInEarMonitoringVolume}
        />
        <AgoraDivider />
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          title={`${enableLocalAudio ? 'disable' : 'enable'} Local Audio`}
          onPress={enableLocalAudio ? disableLocalAudio : _enableLocalAudio}
        />
        <AgoraButton
          title={`${
            muteLocalAudioStream ? 'unmute' : 'mute'
          } Local Audio Stream`}
          onPress={
            muteLocalAudioStream
              ? unmuteLocalAudioStream
              : _muteLocalAudioStream
          }
        />
        <AgoraButton
          title={`${enableSpeakerphone ? 'disable' : 'enable'} Speakerphone`}
          onPress={
            enableSpeakerphone ? disableSpeakerphone : _enableSpeakerphone
          }
        />
        <AgoraButton
          title={`${
            enableInEarMonitoring ? 'disable' : 'enable'
          } In Ear Monitoring`}
          onPress={
            enableInEarMonitoring
              ? disableInEarMonitoring
              : _enableInEarMonitoring
          }
        />
      </>
    );
  }
}
