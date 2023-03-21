import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  ErrorCodeType,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
  EarMonitoringFilterType,
  LocalAudioStreamState,
  MediaDeviceType,
  LocalAudioStreamError,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSlider,
  AgoraText,
  AgoraView,
  AgoraTextInput,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default function JoinChannelAudio() {
  const [appId] = useState(Config.appId);
  const [channelId, setChannelId] = useState(Config.channelId);
  const [token] = useState(Config.token);
  const [uid] = useState(Config.uid);
  const [joinChannelSuccess, setJoinChannelSuccess] = useState(false);
  const [enableLocalAudio, setEnableLocalAudio] = useState(false);
  const [enableSpeakerphone, setEnableSpeakerphone] = useState(false);
  const [muteLocalAudioStream, setMuteLocalAudioStream] = useState(false);
  const [enableInEarMonitoring, setEnableInEarMonitoring] = useState(false);
  const [recordingSignalVolume, setRecordingSignalVolume] = useState(100);
  const [playbackSignalVolume, setPlaybackSignalVolume] = useState(100);
  const [inEarMonitoringVolume, setInEarMonitoringVolume] = useState(100);
  const [includeAudioFilters, setIncludeAudioFilters] = useState(
    EarMonitoringFilterType.EarMonitoringFilterNone
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
      // Need granted the microphone permission
      await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
    }

    // Only need to enable audio on this case
    engine.current.enableAudio();
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
    initRtcEngine().then(() => {
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
        }
      );

      engine.current.addListener(
        'onAudioDeviceStateChanged',
        (deviceId: string, deviceType: number, deviceState: number) => {
          console.info(
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
          console.info(
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
          console.info(
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
        console.info('onAudioRoutingChanged', 'routing', routing);
      });
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
      {configuration ? (
        <>
          <AgoraDivider />
          <AgoraText style={styles.title}>
            The Configuration of JoinChannelAudio
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

  function renderConfiguration(): React.ReactNode {
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

  function renderAction(): React.ReactNode {
    return (
      <>
        <AgoraButton
          title={`${enableLocalAudio ? 'disable' : 'enable'} Local Audio`}
          onPress={() => {
            enableLocalAudio ? disableLocalAudio() : _enableLocalAudio();
          }}
        />
        <AgoraButton
          title={`${
            muteLocalAudioStream ? 'unmute' : 'mute'
          } Local Audio Stream`}
          onPress={() => {
            muteLocalAudioStream
              ? unmuteLocalAudioStream()
              : _muteLocalAudioStream();
          }}
        />
        <AgoraButton
          title={`${enableSpeakerphone ? 'disable' : 'enable'} Speakerphone`}
          onPress={() => {
            enableSpeakerphone ? disableSpeakerphone() : _enableSpeakerphone();
          }}
        />
        <AgoraButton
          title={`${
            enableInEarMonitoring ? 'disable' : 'enable'
          } In Ear Monitoring`}
          onPress={() => {
            enableInEarMonitoring
              ? disableInEarMonitoring()
              : _enableInEarMonitoring();
          }}
        />
      </>
    );
  }
}
