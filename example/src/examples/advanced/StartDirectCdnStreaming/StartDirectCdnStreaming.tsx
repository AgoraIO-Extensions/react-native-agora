import React from 'react';
import { PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  DirectCdnStreamingError,
  DirectCdnStreamingState,
  DirectCdnStreamingStats,
  IDirectCdnStreamingEventHandler,
  IRtcEngineEventHandler,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  url: string;
  startDirectCdnStreaming: boolean;
}

export default class StartDirectCdnStreaming
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IDirectCdnStreamingEventHandler
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
      startPreview: false,
      url: 'rtmp://vid-218.push.chinanetcenter.broadcastapp.agora.io/live/test',
      startDirectCdnStreaming: false,
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
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();
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
   * Step 3-1: startDirectCdnStreaming
   */
  startDirectCdnStreaming = async () => {
    const { url } = this.state;
    if (!url) {
      console.error('url is invalid');
      return;
    }

    this.engine?.startDirectCdnStreaming(this, url, {
      publishCameraTrack: true,
      publishMicrophoneTrack: true,
    });
  };

  /**
   * Step 3-2: stopDirectCdnStreaming
   */
  stopDirectCdnStreaming = async () => {
    this.engine?.stopDirectCdnStreaming();
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

  onDirectCdnStreamingStateChanged(
    state: DirectCdnStreamingState,
    error: DirectCdnStreamingError,
    message: string
  ) {
    this.info(
      'onDirectCdnStreamingStateChanged',
      'state',
      state,
      'error',
      error,
      'message',
      message
    );
    switch (state) {
      case DirectCdnStreamingState.DirectCdnStreamingStateIdle:
        break;
      case DirectCdnStreamingState.DirectCdnStreamingStateRunning:
        this.setState({ startDirectCdnStreaming: true });
        break;
      case DirectCdnStreamingState.DirectCdnStreamingStateStopped:
      case DirectCdnStreamingState.DirectCdnStreamingStateFailed:
        this.setState({ startDirectCdnStreaming: false });
        break;
      case DirectCdnStreamingState.DirectCdnStreamingStateRecovering:
        break;
    }
  }

  onDirectCdnStreamingStats(stats: DirectCdnStreamingStats) {
    this.info('onDirectCdnStreamingStats', 'stats', stats);
  }

  protected renderBottom(): React.ReactNode {
    const { url } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={`url`}
          placeholderTextColor={'gray'}
          value={url}
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess, startDirectCdnStreaming } = this.state;
    return (
      <>
        <ActionItem
          disabled={!joinChannelSuccess}
          title={`${
            startDirectCdnStreaming ? 'stop' : 'start'
          } Direct Cdn Streaming`}
          onPress={
            startDirectCdnStreaming
              ? this.stopDirectCdnStreaming
              : this.startDirectCdnStreaming
          }
        />
      </>
    );
  }
}
