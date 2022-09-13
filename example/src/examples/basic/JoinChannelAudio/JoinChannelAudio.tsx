import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  EarMonitoringFilterType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalAudioStreamError,
  LocalAudioStreamState,
  MediaDeviceType,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';

interface State extends BaseAudioComponentState {
  enableLocalAudio: boolean;
  muteLocalAudioStream: boolean;
  enableSpeakerphone: boolean;
  recordingSignalVolume: number;
  playbackSignalVolume: number;
  includeAudioFilters: EarMonitoringFilterType;
  enableInEarMonitoring: boolean;
  inEarMonitoringVolume: number;
}

export default class JoinChannelAudio
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: false,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      enableLocalAudio: false,
      muteLocalAudioStream: false,
      enableSpeakerphone: false,
      recordingSignalVolume: 100,
      playbackSignalVolume: 100,
      includeAudioFilters: EarMonitoringFilterType.EarMonitoringFilterNone,
      enableInEarMonitoring: false,
      inEarMonitoringVolume: 100,
    };
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      this.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      // Need granted the microphone permission
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
    }

    // Only need to enable audio on this case
    this.engine.enableAudio();
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      this.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1-1 (Optional): enableLocalAudio
   */
  enableLocalAudio = () => {
    this.engine?.enableLocalAudio(true);
    this.setState({ enableLocalAudio: true });
  };

  /**
   * Step 3-1-2 (Optional): disableLocalAudio
   */
  disableLocalAudio = () => {
    this.engine?.enableLocalAudio(false);
    this.setState({ enableLocalAudio: false });
  };

  /**
   * Step 3-2-1 (Optional): muteLocalAudioStream
   */
  muteLocalAudioStream = () => {
    this.engine?.muteLocalAudioStream(true);
    this.setState({ muteLocalAudioStream: true });
  };

  /**
   * Step 3-2-2 (Optional): unmuteLocalAudioStream
   */
  unmuteLocalAudioStream = () => {
    this.engine?.muteLocalAudioStream(false);
    this.setState({ muteLocalAudioStream: false });
  };

  /**
   * Step 3-3-1 (Optional): enableSpeakerphone
   */
  enableSpeakerphone = () => {
    this.engine?.setEnableSpeakerphone(true);
    this.setState({ enableSpeakerphone: true });
  };

  /**
   * Step 3-3-2 (Optional): disableSpeakerphone
   */
  disableSpeakerphone = () => {
    this.engine?.setEnableSpeakerphone(false);
    this.setState({ enableSpeakerphone: false });
  };

  /**
   * Step 3-4 (Optional): adjustRecordingSignalVolume
   */
  adjustRecordingSignalVolume = () => {
    const { recordingSignalVolume } = this.state;
    this.engine?.adjustRecordingSignalVolume(recordingSignalVolume);
  };

  /**
   * Step 3-5 (Optional): adjustPlaybackSignalVolume
   */
  adjustPlaybackSignalVolume = () => {
    const { playbackSignalVolume } = this.state;
    this.engine?.adjustPlaybackSignalVolume(playbackSignalVolume);
  };

  /**
   * Step 3-6-1 (Optional): enableInEarMonitoring
   */
  enableInEarMonitoring = () => {
    const { includeAudioFilters } = this.state;
    if (
      this.engine?.enableInEarMonitoring(true, includeAudioFilters) ===
      ErrorCodeType.ErrOk
    ) {
      this.setState({ enableInEarMonitoring: true });
    }
  };

  /**
   * Step 3-6-2 (Optional): setInEarMonitoringVolume
   */
  setInEarMonitoringVolume = () => {
    const { inEarMonitoringVolume } = this.state;
    this.engine?.setInEarMonitoringVolume(inEarMonitoringVolume);
  };

  /**
   * Step 3-6-3 (Optional): disableInEarMonitoring
   */
  disableInEarMonitoring = () => {
    const { includeAudioFilters } = this.state;
    if (
      this.engine?.enableInEarMonitoring(false, includeAudioFilters) ===
      ErrorCodeType.ErrOk
    ) {
      this.setState({ enableInEarMonitoring: false });
    }
  };

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel();
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.release();
  }

  onError(err: ErrorCodeType, msg: string) {
    super.onError(err, msg);
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    super.onUserJoined(connection, remoteUid, elapsed);
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    super.onUserOffline(connection, remoteUid, reason);
  }

  onAudioDeviceStateChanged(
    deviceId: string,
    deviceType: number,
    deviceState: number
  ) {
    this.info(
      'onAudioDeviceStateChanged',
      'deviceId',
      deviceId,
      'deviceType',
      deviceType,
      'deviceState',
      deviceState
    );
  }

  onAudioDeviceVolumeChanged(
    deviceType: MediaDeviceType,
    volume: number,
    muted: boolean
  ) {
    this.info(
      'onAudioDeviceVolumeChanged',
      'deviceType',
      deviceType,
      'volume',
      volume,
      'muted',
      muted
    );
  }

  onLocalAudioStateChanged(
    connection: RtcConnection,
    state: LocalAudioStreamState,
    error: LocalAudioStreamError
  ) {
    this.info(
      'onLocalAudioStateChanged',
      'connection',
      connection,
      'state',
      state,
      'error',
      error
    );
  }

  onAudioRoutingChanged(routing: number) {
    this.info('onAudioRoutingChanged', 'routing', routing);
  }

  protected renderConfiguration(): React.ReactNode {
    const {
      recordingSignalVolume,
      playbackSignalVolume,
      includeAudioFilters,
      enableInEarMonitoring,
      inEarMonitoringVolume,
    } = this.state;
    return (
      <>
        <AgoraSlider
          title={`recordingSignalVolume ${recordingSignalVolume}`}
          minimumValue={0}
          maximumValue={400}
          step={1}
          value={recordingSignalVolume}
          onSlidingComplete={(value) => {
            this.setState({ recordingSignalVolume: value });
          }}
        />
        <AgoraButton
          title={'adjust Recording Signal Volume'}
          onPress={this.adjustRecordingSignalVolume}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`playbackSignalVolume ${playbackSignalVolume}`}
          minimumValue={0}
          maximumValue={400}
          step={1}
          value={playbackSignalVolume}
          onSlidingComplete={(value) => {
            this.setState({ playbackSignalVolume: value });
          }}
        />
        <AgoraButton
          title={'adjust Playback Signal Volume'}
          onPress={this.adjustPlaybackSignalVolume}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'includeAudioFilters'}
          items={enumToItems(EarMonitoringFilterType)}
          value={includeAudioFilters}
          onValueChange={(value) => {
            this.setState({ includeAudioFilters: value });
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
            this.setState({ inEarMonitoringVolume: value });
          }}
        />
        <AgoraButton
          disabled={!enableInEarMonitoring}
          title={`set In Ear Monitoring Volume`}
          onPress={this.setInEarMonitoringVolume}
        />
        <AgoraDivider />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const {
      enableLocalAudio,
      muteLocalAudioStream,
      enableSpeakerphone,
      enableInEarMonitoring,
    } = this.state;
    return (
      <>
        <AgoraButton
          title={`${enableLocalAudio ? 'disable' : 'enable'} Local Audio`}
          onPress={
            enableLocalAudio ? this.disableLocalAudio : this.enableLocalAudio
          }
        />
        <AgoraButton
          title={`${
            muteLocalAudioStream ? 'unmute' : 'mute'
          } Local Audio Stream`}
          onPress={
            muteLocalAudioStream
              ? this.unmuteLocalAudioStream
              : this.muteLocalAudioStream
          }
        />
        <AgoraButton
          title={`${enableSpeakerphone ? 'disable' : 'enable'} Speakerphone`}
          onPress={
            enableSpeakerphone
              ? this.disableSpeakerphone
              : this.enableSpeakerphone
          }
        />
        <AgoraButton
          title={`${
            enableInEarMonitoring ? 'disable' : 'enable'
          } In Ear Monitoring`}
          onPress={
            enableInEarMonitoring
              ? this.disableInEarMonitoring
              : this.enableInEarMonitoring
          }
        />
      </>
    );
  }
}
