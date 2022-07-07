import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  DegradationPreference,
  DirectCdnStreamingError,
  DirectCdnStreamingState,
  DirectCdnStreamingStats,
  IDirectCdnStreamingEventHandler,
  IRtcEngineEventHandler,
  OrientationMode,
  RtcConnection,
  RtcStats,
  VideoCodecType,
  VideoMirrorModeType,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';
import { PickerView } from '../../../components/PickerView';

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
      codecType: VideoCodecType.VideoCodecH264,
      width: 640,
      height: 360,
      frameRate: 15,
      bitrate: 0,
      minBitrate: -1,
      orientationMode: OrientationMode.OrientationModeAdaptive,
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
    this.engine?.joinChannelWithOptions(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1: startDirectCdnStreaming
   */
  startDirectCdnStreaming = () => {
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
   * Step 3-2 (Optional): setDirectCdnStreamingVideoConfiguration
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
    const {
      url,
      codecType,
      width,
      height,
      frameRate,
      bitrate,
      minBitrate,
      orientationMode,
      degradationPreference,
      mirrorMode,
      startDirectCdnStreaming,
    } = this.state;
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
        <View style={styles.container}>
          <PickerView
            title={'codecType'}
            type={VideoCodecType}
            selectedValue={codecType}
            onValueChange={(value) => {
              this.setState({ codecType: value });
            }}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <TextInput
            style={STYLES.input}
            onChangeText={(text) => {
              this.setState({ width: +text });
            }}
            keyboardType={'numeric'}
            placeholder={`width (defaults: ${width})`}
            placeholderTextColor={'gray'}
            value={width === this.createState().width ? '' : width.toString()}
          />
          <TextInput
            style={STYLES.input}
            onChangeText={(text) => {
              this.setState({ height: +text });
            }}
            keyboardType={'numeric'}
            placeholder={`height (defaults: ${height})`}
            placeholderTextColor={'gray'}
            value={
              height === this.createState().height ? '' : height.toString()
            }
          />
        </View>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ frameRate: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`frameRate (defaults: ${frameRate})`}
          placeholderTextColor={'gray'}
          value={
            frameRate === this.createState().frameRate
              ? ''
              : frameRate.toString()
          }
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ bitrate: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`bitrate (defaults: ${bitrate})`}
          placeholderTextColor={'gray'}
          value={
            bitrate === this.createState().bitrate ? '' : bitrate.toString()
          }
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ minBitrate: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`minBitrate (defaults: ${minBitrate})`}
          placeholderTextColor={'gray'}
          value={
            minBitrate === this.createState().minBitrate
              ? ''
              : minBitrate.toString()
          }
        />
        <View style={styles.container}>
          <PickerView
            title={'orientationMode'}
            type={OrientationMode}
            selectedValue={orientationMode}
            onValueChange={(value) => {
              this.setState({ orientationMode: value });
            }}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <PickerView
            title={'degradationPreference'}
            type={DegradationPreference}
            selectedValue={degradationPreference}
            onValueChange={(value) => {
              this.setState({ degradationPreference: value });
            }}
          />
        </View>
        <Divider />
        <View style={styles.container}>
          <PickerView
            title={'mirrorMode'}
            type={VideoMirrorModeType}
            selectedValue={mirrorMode}
            onValueChange={(value) => {
              this.setState({ mirrorMode: value });
            }}
          />
        </View>
        <Divider />
        <ActionItem
          disabled={startDirectCdnStreaming}
          title={`set Direct Cdn Streaming Video Configuration`}
          onPress={this.setDirectCdnStreamingVideoConfiguration}
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { startDirectCdnStreaming } = this.state;
    return (
      <>
        <ActionItem
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
