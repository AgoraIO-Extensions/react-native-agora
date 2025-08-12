import React, { ReactElement } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  DegradationPreference,
  DirectCdnStreamingReason,
  DirectCdnStreamingState,
  DirectCdnStreamingStats,
  IDirectCdnStreamingEventHandler,
  IRtcEngineEventHandler,
  OrientationMode,
  RtcConnection,
  RtcStats,
  VideoCodecType,
  VideoMirrorModeType,
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
  AgoraTextInput,
  AgoraView,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { enumToItems } from '../../../utils';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  url: string;
  codecType: VideoCodecType;
  width: number;
  height: number;
  frameRate: number;
  bitrate: number;
  minBitrate: number;
  orientationMode: OrientationMode;
  degradationPreference: DegradationPreference;
  mirrorMode: VideoMirrorModeType;
  startDirectCdnStreaming: boolean;
}

export default class DirectCdnStreaming
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
      codecType: VideoCodecType.VideoCodecH264,
      width: 640,
      height: 360,
      frameRate: 15,
      bitrate: 0,
      minBitrate: -1,
      // ⚠️ can not set OrientationMode.OrientationModeAdaptive
      orientationMode: OrientationMode.OrientationModeFixedLandscape,
      degradationPreference: DegradationPreference.MaintainQuality,
      mirrorMode: VideoMirrorModeType.VideoMirrorModeDisabled,
      startDirectCdnStreaming: false,
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
   * Step 3-1 (Optional): setDirectCdnStreamingVideoConfiguration
   */
  setDirectCdnStreamingVideoConfiguration = () => {
    const {
      codecType,
      width,
      height,
      frameRate,
      bitrate,
      minBitrate,
      orientationMode,
      degradationPreference,
      mirrorMode,
    } = this.state;
    if (orientationMode === OrientationMode.OrientationModeAdaptive) {
      this.error(
        'orientationMode is invalid, should not be OrientationMode.OrientationModeAdaptive'
      );
      return;
    }
    this.engine?.setDirectCdnStreamingVideoConfiguration({
      codecType,
      dimensions: {
        width: width,
        height: height,
      },
      frameRate,
      bitrate,
      minBitrate,
      orientationMode,
      degradationPreference,
      mirrorMode,
    });
  };

  /**
   * Step 3-2: startDirectCdnStreaming
   */
  startDirectCdnStreaming = () => {
    const { url } = this.state;
    if (!url) {
      this.error('url is invalid');
      return;
    }

    this.engine?.startDirectCdnStreaming(this, url, {
      publishCameraTrack: true,
      publishMicrophoneTrack: true,
    });
  };

  /**
   * Step 3-3: stopDirectCdnStreaming
   */
  stopDirectCdnStreaming = () => {
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
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    const { startDirectCdnStreaming } = this.state;
    if (startDirectCdnStreaming) {
      this.stopDirectCdnStreaming();
    }
    super.onLeaveChannel(connection, stats);
  }

  onDirectCdnStreamingStateChanged(
    state: DirectCdnStreamingState,
    error: DirectCdnStreamingReason,
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

  protected renderConfiguration(): ReactElement | undefined {
    const {
      url,
      codecType,
      orientationMode,
      degradationPreference,
      mirrorMode,
    } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={`url`}
          value={url}
        />
        <AgoraDropdown
          title={'codecType'}
          items={enumToItems(VideoCodecType)}
          value={codecType}
          onValueChange={(value) => {
            this.setState({ codecType: value });
          }}
        />
        <AgoraDivider />
        <AgoraView horizontal={true}>
          <AgoraTextInput
            style={AgoraStyle.fullSize}
            onChangeText={(text) => {
              if (isNaN(+text)) return;
              this.setState({
                width: text === '' ? this.createState().width : +text,
              });
            }}
            numberKeyboard={true}
            placeholder={`width (defaults: ${this.createState().width})`}
          />
          <AgoraTextInput
            style={AgoraStyle.fullSize}
            onChangeText={(text) => {
              if (isNaN(+text)) return;
              this.setState({
                height: text === '' ? this.createState().height : +text,
              });
            }}
            numberKeyboard={true}
            placeholder={`height (defaults: ${this.createState().height})`}
          />
        </AgoraView>
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              frameRate: text === '' ? this.createState().frameRate : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`frameRate (defaults: ${this.createState().frameRate})`}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              bitrate: text === '' ? this.createState().bitrate : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`bitrate (defaults: ${this.createState().bitrate})`}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              minBitrate: text === '' ? this.createState().minBitrate : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`minBitrate (defaults: ${
            this.createState().minBitrate
          })`}
        />
        <AgoraDropdown
          title={'orientationMode'}
          items={enumToItems(OrientationMode)}
          value={orientationMode}
          onValueChange={(value) => {
            this.setState({ orientationMode: value });
          }}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'degradationPreference'}
          items={enumToItems(DegradationPreference)}
          value={degradationPreference}
          onValueChange={(value) => {
            this.setState({ degradationPreference: value });
          }}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'mirrorMode'}
          items={enumToItems(VideoMirrorModeType)}
          value={mirrorMode}
          onValueChange={(value) => {
            this.setState({ mirrorMode: value });
          }}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { startDirectCdnStreaming } = this.state;
    return (
      <>
        <AgoraButton
          disabled={startDirectCdnStreaming}
          title={`set Direct Cdn Streaming Video Configuration`}
          onPress={this.setDirectCdnStreamingVideoConfiguration}
        />
        <AgoraButton
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
