import { Text } from '@rneui/base';
import React, { ReactElement } from 'react';
import { Platform, View } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalAudioStats,
  LocalVideoStats,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  QualityType,
  RemoteAudioStats,
  RemoteVideoStats,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraSwitch,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { enumToItems } from '../../../utils';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  switchCamera: boolean;
  renderByTextureView: boolean;
  setupMode: VideoViewSetupMode;
  lastmileDelay?: number;
  videoSentBitrate?: number;
  encodedFrameWidth?: number;
  encodedFrameHeight?: number;
  encoderOutputFrameRate?: number;
  audioSentBitrate?: number;
  cpuAppUsage?: number;
  cpuTotalUsage?: number;
  txPacketLossRate?: number;
  remoteUserStatsList: Map<
    number,
    { remoteVideoStats: RemoteVideoStats; remoteAudioStats: RemoteAudioStats }
  >;
}

export default class JoinChannelVideo
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: true,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      remoteUserStatsList: new Map(),
      encodedFrameWidth: 0,
      encodedFrameHeight: 0,
      encoderOutputFrameRate: 0,
      lastmileDelay: 0,
      videoSentBitrate: 0,
      audioSentBitrate: 0,
      cpuAppUsage: 0,
      cpuTotalUsage: 0,
      txPacketLossRate: 0,
      startPreview: false,
      switchCamera: false,
      renderByTextureView: false,
      setupMode: VideoViewSetupMode.VideoViewSetupReplace,
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

    // Need granted the microphone and camera permission
    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // Start preview before joinChannel
    this.engine.startPreview();
    this.setState({ startPreview: true });
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
   * Step 3 (Optional): switchCamera
   */
  switchCamera = () => {
    this.engine?.switchCamera();
    this.setState((preState) => {
      return { switchCamera: !preState.switchCamera };
    });
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

  onVideoDeviceStateChanged(
    deviceId: string,
    deviceType: number,
    deviceState: number
  ) {
    this.info(
      'onVideoDeviceStateChanged',
      'deviceId',
      deviceId,
      'deviceType',
      deviceType,
      'deviceState',
      deviceState
    );
  }

  onLocalVideoStateChanged(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    error: LocalVideoStreamReason
  ) {
    this.info(
      'onLocalVideoStateChanged',
      'source',
      source,
      'state',
      state,
      'error',
      error
    );
  }

  onRtcStats(connection: RtcConnection, stats: RtcStats): void {
    this.setState({
      lastmileDelay: stats.lastmileDelay,
      cpuAppUsage: stats.cpuAppUsage,
      cpuTotalUsage: stats.cpuTotalUsage,
      txPacketLossRate: stats.txPacketLossRate,
    });
  }

  onLocalVideoStats(source: VideoSourceType, stats: LocalVideoStats): void {
    this.setState({
      videoSentBitrate: stats.sentBitrate,
      encodedFrameWidth: stats.encodedFrameWidth,
      encodedFrameHeight: stats.encodedFrameHeight,
      encoderOutputFrameRate: stats.encoderOutputFrameRate,
    });
  }

  onLocalAudioStats(connection: RtcConnection, stats: LocalAudioStats): void {
    this.setState({
      audioSentBitrate: stats.sentBitrate,
    });
  }

  onRemoteVideoStats(connection: RtcConnection, stats: RemoteVideoStats): void {
    const { remoteUserStatsList } = this.state;
    if (stats.uid) {
      remoteUserStatsList.set(stats.uid, {
        remoteVideoStats: stats,
        remoteAudioStats:
          remoteUserStatsList.get(stats.uid)?.remoteAudioStats || {},
      });
    }
  }

  onRemoteAudioStats(connection: RtcConnection, stats: RemoteAudioStats): void {
    const { remoteUserStatsList } = this.state;
    if (stats.uid) {
      remoteUserStatsList.set(stats.uid, {
        remoteVideoStats:
          remoteUserStatsList.get(stats.uid)?.remoteVideoStats || {},
        remoteAudioStats: stats,
      });
    }
  }

  protected renderUsers(): ReactElement | undefined {
    return super.renderUsers();
  }

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    const {
      renderByTextureView,
      setupMode,
      joinChannelSuccess,
      encodedFrameWidth,
      encodedFrameHeight,
      encoderOutputFrameRate,
      remoteUserStatsList,
      lastmileDelay,
      videoSentBitrate,
      audioSentBitrate,
      cpuAppUsage,
      cpuTotalUsage,
      txPacketLossRate,
    } = this.state;
    return (
      <>
        {renderByTextureView ? (
          <RtcTextureView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            canvas={{ ...user, setupMode }}
          />
        ) : (
          <RtcSurfaceView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            zOrderMediaOverlay={user.uid !== 0}
            canvas={{ ...user, setupMode }}
          />
        )}
        {joinChannelSuccess && user.sourceType === 0 && (
          <View style={AgoraStyle.statusBar}>
            <Text style={AgoraStyle.statusBarText}>
              {encodedFrameWidth}x{encodedFrameHeight},{encoderOutputFrameRate}
              fps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              LM Delay: {lastmileDelay}ms
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              VSend: {videoSentBitrate}kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              ASend: {audioSentBitrate}kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              CPU: {cpuAppUsage}%/{cpuTotalUsage}%
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              Send Loss: {txPacketLossRate}%
            </Text>
          </View>
        )}
        {joinChannelSuccess && user.sourceType !== 0 && user.uid && (
          <View style={AgoraStyle.statusBar}>
            <Text style={AgoraStyle.statusBarText}>
              VRecv:{' '}
              {
                remoteUserStatsList.get(user.uid)?.remoteVideoStats
                  .receivedBitrate
              }
              kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              ARecv:{' '}
              {
                remoteUserStatsList.get(user.uid)?.remoteAudioStats
                  .receivedBitrate
              }
              kbps
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              VLoss:{' '}
              {
                remoteUserStatsList.get(user.uid)?.remoteVideoStats
                  .packetLossRate
              }
              %
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              ALoss:{' '}
              {
                remoteUserStatsList.get(user.uid)?.remoteAudioStats
                  .audioLossRate
              }
              %
            </Text>
            <Text style={AgoraStyle.statusBarText}>
              AQuality:{' '}
              {
                QualityType[
                  remoteUserStatsList.get(user.uid)?.remoteAudioStats.quality!
                ]
              }
            </Text>
          </View>
        )}
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess, renderByTextureView, setupMode } =
      this.state;
    return (
      <>
        <AgoraSwitch
          disabled={
            (!startPreview && !joinChannelSuccess) || Platform.OS !== 'android'
          }
          title={`renderByTextureView`}
          value={renderByTextureView}
          onValueChange={(value) => {
            this.setState({ renderByTextureView: value });
          }}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'setupMode'}
          items={enumToItems(VideoViewSetupMode)}
          value={setupMode}
          onValueChange={(value) => {
            this.setState({ setupMode: value });
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

  protected renderAction(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={this.switchCamera}
        />
      </>
    );
  }
}
