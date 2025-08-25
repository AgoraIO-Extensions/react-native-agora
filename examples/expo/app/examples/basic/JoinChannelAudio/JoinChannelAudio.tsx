import { Text } from '@rneui/base';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import {
  AudioVolumeInfo,
  ChannelProfileType,
  ClientRoleType,
  EarMonitoringFilterType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalAudioStats,
  LocalAudioStreamReason,
  LocalAudioStreamState,
  MediaDeviceType,
  QualityType,
  RemoteAudioStats,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraCard,
  AgoraDivider,
  AgoraDropdown,
  AgoraList,
  AgoraSlider,
  AgoraStyle,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { enumToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseAudioComponentState {
  enableLocalAudio: boolean;
  muteLocalAudioStream: boolean;
  enableSpeakerphone: boolean;
  recordingSignalVolume: number;
  playbackSignalVolume: number;
  localVolume?: number;
  lastmileDelay?: number;
  audioSentBitrate?: number;
  cpuAppUsage?: number;
  cpuTotalUsage?: number;
  txPacketLossRate?: number;
  remoteUserStatsList: Map<
    number,
    { volume: number; remoteAudioStats: RemoteAudioStats }
  >;
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
      enableLocalAudio: true,
      muteLocalAudioStream: false,
      enableSpeakerphone: true,
      recordingSignalVolume: 100,
      playbackSignalVolume: 100,
      includeAudioFilters: EarMonitoringFilterType.EarMonitoringFilterNone,
      enableInEarMonitoring: false,
      inEarMonitoringVolume: 100,
      remoteUserStatsList: new Map(),
      localVolume: 0,
      lastmileDelay: 0,
      audioSentBitrate: 0,
      cpuAppUsage: 0,
      cpuTotalUsage: 0,
      txPacketLossRate: 0,
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
    this.engine.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone permission
    await askMediaAccess(['android.permission.RECORD_AUDIO']);

    // Only need to enable audio on this case
    this.engine.enableAudio();
    this.engine.enableAudioVolumeIndication(200, 3, true);
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
    this.engine?.unregisterEventHandler(this);
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
    error: LocalAudioStreamReason
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

  onAudioVolumeIndication(
    connection: RtcConnection,
    speakers: AudioVolumeInfo[],
    speakerNumber: number,
    totalVolume: number
  ): void {
    speakers.map((speaker) => {
      if (speaker.uid === 0) {
        this.setState({ localVolume: speaker.volume });
      } else {
        if (!speaker.uid) return;
        const { remoteUserStatsList } = this.state;
        remoteUserStatsList.set(speaker.uid, {
          volume: speaker.volume!,
          remoteAudioStats:
            remoteUserStatsList.get(speaker.uid)?.remoteAudioStats || {},
        });
      }
    });
  }

  onRtcStats(connection: RtcConnection, stats: RtcStats): void {
    this.setState({
      lastmileDelay: stats.lastmileDelay,
      cpuAppUsage: stats.cpuAppUsage,
      cpuTotalUsage: stats.cpuTotalUsage,
      txPacketLossRate: stats.txPacketLossRate,
    });
  }

  onLocalAudioStats(connection: RtcConnection, stats: LocalAudioStats): void {
    this.setState({
      audioSentBitrate: stats.sentBitrate,
    });
  }

  onRemoteAudioStats(connection: RtcConnection, stats: RemoteAudioStats): void {
    const { remoteUserStatsList } = this.state;
    if (stats.uid) {
      remoteUserStatsList.set(stats.uid, {
        volume: remoteUserStatsList.get(stats.uid)?.volume || 0,
        remoteAudioStats: stats,
      });
    }
  }

  protected renderUsers(): ReactElement | undefined {
    const {
      joinChannelSuccess,
      remoteUsers,
      localVolume,
      lastmileDelay,
      audioSentBitrate,
      cpuAppUsage,
      cpuTotalUsage,
      txPacketLossRate,
      remoteUserStatsList,
    } = this.state;
    return (
      <>
        {joinChannelSuccess ? (
          <>
            <AgoraCard title={`local`}>
              <>
                <Text>Volume: {localVolume}</Text>
                <Text>LM Delay: {lastmileDelay}ms</Text>
                <Text>ASend: {audioSentBitrate}kbps</Text>
                <Text>
                  CPU: {cpuAppUsage}%/{cpuTotalUsage}%
                </Text>
                <Text>Send Loss: {txPacketLossRate}%</Text>
              </>
            </AgoraCard>
            <AgoraList
              style={AgoraStyle.videoContainer}
              numColumns={undefined}
              horizontal={true}
              data={remoteUsers}
              renderItem={({ item }) => (
                <AgoraCard key={`${item}`} title={`${item}`}>
                  {joinChannelSuccess ? (
                    <View>
                      <Text>
                        Volume: {remoteUserStatsList.get(item)?.volume}
                      </Text>
                      <Text>
                        ARecv:{' '}
                        {
                          remoteUserStatsList.get(item)?.remoteAudioStats
                            .receivedBitrate
                        }
                        kbps
                      </Text>
                      <Text>
                        ALoss:{' '}
                        {
                          remoteUserStatsList.get(item)?.remoteAudioStats
                            .audioLossRate
                        }
                        %
                      </Text>
                      <Text>
                        AQuality:{' '}
                        {
                          QualityType[
                            remoteUserStatsList.get(item)?.remoteAudioStats
                              .quality!
                          ]
                        }
                      </Text>
                    </View>
                  ) : undefined}
                </AgoraCard>
              )}
            />
          </>
        ) : undefined}
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
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

  protected renderAction(): ReactElement | undefined {
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
