import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  LighteningContrastLevel,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  Divider,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { PickerView } from '../../../components/PickerView';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  lighteningContrastLevel: LighteningContrastLevel;
  lighteningLevel: number;
  smoothnessLevel: number;
  rednessLevel: number;
  sharpnessLevel: number;
  enableBeautyEffect: boolean;
}

export default class SetBeautyEffectOptions
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
      lighteningContrastLevel: LighteningContrastLevel.LighteningContrastNormal,
      lighteningLevel: 0,
      smoothnessLevel: 0,
      rednessLevel: 0,
      sharpnessLevel: 0,
      enableBeautyEffect: false,
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

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_video_process_extension');
    }
    this.engine?.enableExtension('agora', 'beauty', true);

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
   * Step 3-1: enableBeautyEffect
   */
  enableBeautyEffect = () => {
    const {
      lighteningContrastLevel,
      lighteningLevel,
      smoothnessLevel,
      rednessLevel,
      sharpnessLevel,
    } = this.state;

    this.engine?.setBeautyEffectOptions(true, {
      lighteningContrastLevel,
      lighteningLevel,
      smoothnessLevel,
      rednessLevel,
      sharpnessLevel,
    });
    this.setState({ enableBeautyEffect: true });
  };

  /**
   * Step 3-2: disableBeautyEffect
   */
  disableBeautyEffect = () => {
    this.engine?.setBeautyEffectOptions(false, {});
    this.setState({ enableBeautyEffect: false });
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
      lighteningContrastLevel,
      lighteningLevel,
      smoothnessLevel,
      rednessLevel,
      sharpnessLevel,
    } = this.state;
    return (
      <>
        <View style={styles.container}>
          <PickerView
            title={'lighteningContrastLevel'}
            type={LighteningContrastLevel}
            selectedValue={lighteningContrastLevel}
            onValueChange={(value) => {
              this.setState({ lighteningContrastLevel: value });
            }}
          />
        </View>
        <Divider />
        <ActionItem
          title={`lighteningLevel ${lighteningLevel}`}
          isShowSlider={true}
          sliderValue={lighteningLevel}
          onSliderValueChange={(value) => {
            this.setState({
              lighteningLevel: value,
            });
          }}
        />
        <Divider />
        <ActionItem
          title={`smoothnessLevel ${smoothnessLevel}`}
          isShowSlider={true}
          sliderValue={smoothnessLevel}
          onSliderValueChange={(value) => {
            this.setState({
              smoothnessLevel: value,
            });
          }}
        />
        <Divider />
        <ActionItem
          title={`rednessLevel ${rednessLevel}`}
          isShowSlider={true}
          sliderValue={rednessLevel}
          onSliderValueChange={(value) => {
            this.setState({
              rednessLevel: value,
            });
          }}
        />
        <Divider />
        <ActionItem
          title={`sharpnessLevel ${sharpnessLevel}`}
          isShowSlider={true}
          sliderValue={sharpnessLevel}
          onSliderValueChange={(value) => {
            this.setState({
              sharpnessLevel: value,
            });
          }}
        />
        <Divider />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { startPreview, joinChannelSuccess, enableBeautyEffect } = this.state;
    return (
      <>
        <ActionItem
          disabled={!(startPreview || joinChannelSuccess)}
          title={`${enableBeautyEffect ? 'disable' : 'enable'} Beauty Effect`}
          onPress={
            enableBeautyEffect
              ? this.disableBeautyEffect
              : this.enableBeautyEffect
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
