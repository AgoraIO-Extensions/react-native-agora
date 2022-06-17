import React from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
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
} from 'react-native-agora-rtc-ng';

import {
  BaseAudioComponentState,
  BaseComponent,
  Divider,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';
import { PickerView } from '../../../components/PickerView';

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
      console.error(`appId is invalid`);
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
    this.engine?.joinChannel2(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1: startAudioMixing
   */
  enableLocalAudio = () => {
    this.engine?.enableLocalAudio(true);
    this.setState({ enableLocalAudio: true });
  };

  disableLocalAudio = () => {
    this.engine?.enableLocalAudio(false);
    this.setState({ enableLocalAudio: false });
  };

  muteLocalAudioStream = () => {
    this.engine?.muteLocalAudioStream(true);
    this.setState({ muteLocalAudioStream: true });
  };

  unmuteLocalAudioStream = () => {
    this.engine?.muteLocalAudioStream(false);
    this.setState({ muteLocalAudioStream: false });
  };

  enableSpeakerphone = () => {
    this.engine?.setEnableSpeakerphone(true);
    this.setState({ enableSpeakerphone: true });
  };

  disableSpeakerphone = () => {
    this.engine?.setEnableSpeakerphone(false);
    this.setState({ enableSpeakerphone: false });
  };

  adjustRecordingSignalVolume = () => {
    const { recordingSignalVolume } = this.state;
    this.engine?.adjustRecordingSignalVolume(recordingSignalVolume);
  };

  adjustPlaybackSignalVolume = () => {
    const { playbackSignalVolume } = this.state;
    this.engine?.adjustPlaybackSignalVolume(playbackSignalVolume);
  };

  enableInEarMonitoring = () => {
    const { includeAudioFilters } = this.state;
    if (
      this.engine?.enableInEarMonitoring(true, includeAudioFilters) ===
      ErrorCodeType.ErrOk
    ) {
      this.setState({ enableInEarMonitoring: true });
    }
  };

  setInEarMonitoringVolume = () => {
    const { inEarMonitoringVolume } = this.state;
    this.engine?.setInEarMonitoringVolume(inEarMonitoringVolume);
  };

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

  protected renderBottom(): React.ReactNode {
    const {
      recordingSignalVolume,
      playbackSignalVolume,
      includeAudioFilters,
      enableInEarMonitoring,
      inEarMonitoringVolume,
    } = this.state;

    const renderSlider = (
      key: string,
      value: number,
      min: number,
      max: number
    ) => {
      return (
        <ActionItem
          title={`${key} ${value}`}
          isShowSlider={true}
          sliderValue={(value - min) / (max - min)}
          onSliderValueChange={(value) => {
            // @ts-ignore
            this.setState({
              [key]: +((max - min) * value + min).toFixed(0),
            });
          }}
        />
      );
    };

    return (
      <>
        {renderSlider('recordingSignalVolume', recordingSignalVolume, 0, 400)}
        <Button
          title={'adjust Recording Signal Volume'}
          onPress={this.adjustRecordingSignalVolume}
        />
        <Divider />
        {renderSlider('playbackSignalVolume', playbackSignalVolume, 0, 400)}
        <Button
          title={'adjust Playback Signal Volume'}
          onPress={this.adjustPlaybackSignalVolume}
        />
        <Divider />
        <View style={styles.container}>
          <PickerView
            title={'includeAudioFilters'}
            type={EarMonitoringFilterType}
            selectedValue={includeAudioFilters}
            onValueChange={(value: EarMonitoringFilterType) => {
              this.setState({ includeAudioFilters: value });
            }}
          />
        </View>
        <Divider />
        {renderSlider('inEarMonitoringVolume', inEarMonitoringVolume, 0, 100)}
        <Button
          disabled={!enableInEarMonitoring}
          title={`set In Ear Monitoring Volume`}
          onPress={this.setInEarMonitoringVolume}
        />
        <Divider />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const {
      enableLocalAudio,
      muteLocalAudioStream,
      enableSpeakerphone,
      enableInEarMonitoring,
    } = this.state;
    return (
      <>
        <ActionItem
          title={`${enableLocalAudio ? 'disable' : 'enable'} Local Audio`}
          onPress={
            enableLocalAudio ? this.disableLocalAudio : this.enableLocalAudio
          }
        />
        <ActionItem
          title={`${
            muteLocalAudioStream ? 'unmute' : 'mute'
          } Local Audio Stream`}
          onPress={
            muteLocalAudioStream
              ? this.unmuteLocalAudioStream
              : this.muteLocalAudioStream
          }
        />
        <ActionItem
          title={`${enableSpeakerphone ? 'disable' : 'enable'} Speakerphone`}
          onPress={
            enableSpeakerphone
              ? this.disableSpeakerphone
              : this.enableSpeakerphone
          }
        />
        <ActionItem
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
