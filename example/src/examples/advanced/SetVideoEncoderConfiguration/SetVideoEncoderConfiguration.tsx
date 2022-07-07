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
  IRtcEngineEventHandler,
  OrientationMode,
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
import { PickerView } from '../../../components/PickerView';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  codecType: VideoCodecType;
  width: number;
  height: number;
  frameRate: number;
  bitrate: number;
  minBitrate: number;
  orientationMode: OrientationMode;
  degradationPreference: DegradationPreference;
  mirrorMode: VideoMirrorModeType;
}

export default class SetVideoEncoderConfiguration
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
      startPreview: false,
      codecType: VideoCodecType.VideoCodecH264,
      width: 640,
      height: 360,
      frameRate: 15,
      bitrate: 0,
      minBitrate: -1,
      orientationMode: OrientationMode.OrientationModeAdaptive,
      degradationPreference: DegradationPreference.MaintainQuality,
      mirrorMode: VideoMirrorModeType.VideoMirrorModeDisabled,
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

    // This case works if startPreview without joinChannel
    this.engine.startPreview();
    this.setState({ startPreview: true });
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
   * Step 3: setVideoEncoderConfiguration
   */
  setVideoEncoderConfiguration = () => {
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
    this.engine?.setVideoEncoderConfiguration({
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

  protected renderBottom(): React.ReactNode {
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
    return (
      <>
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
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    return (
      <>
        <ActionItem
          title={`set Video Encoder Configuration`}
          onPress={this.setVideoEncoderConfiguration}
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
