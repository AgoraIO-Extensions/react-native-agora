import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  LighteningContrastLevel,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';

interface State extends BaseVideoComponentState {
  lighteningContrastLevel: LighteningContrastLevel;
  lighteningLevel: number;
  smoothnessLevel: number;
  rednessLevel: number;
  sharpnessLevel: number;
  enableBeautyEffect: boolean;
}

export default class BeautyEffect
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
      this.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_clear_vision_extension');
    }
    this.engine?.enableExtension(
      'agora_video_filters_clear_vision',
      'clear_vision',
      true
    );

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
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  protected renderConfiguration(): React.ReactNode {
    const {
      lighteningContrastLevel,
      lighteningLevel,
      smoothnessLevel,
      rednessLevel,
      sharpnessLevel,
    } = this.state;
    return (
      <>
        <AgoraDropdown
          title={'lighteningContrastLevel'}
          items={enumToItems(LighteningContrastLevel)}
          value={lighteningContrastLevel}
          onValueChange={(value) => {
            this.setState({ lighteningContrastLevel: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`lighteningLevel ${lighteningLevel}`}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={lighteningLevel}
          onSlidingComplete={(value) => {
            this.setState({
              lighteningLevel: value,
            });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`smoothnessLevel ${smoothnessLevel}`}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={smoothnessLevel}
          onSlidingComplete={(value) => {
            this.setState({
              smoothnessLevel: value,
            });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`rednessLevel ${rednessLevel}`}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={rednessLevel}
          onSlidingComplete={(value) => {
            this.setState({
              rednessLevel: value,
            });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`sharpnessLevel ${sharpnessLevel}`}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={sharpnessLevel}
          onSlidingComplete={(value) => {
            this.setState({
              sharpnessLevel: value,
            });
          }}
        />
        <AgoraDivider />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { startPreview, joinChannelSuccess, enableBeautyEffect } = this.state;
    return (
      <>
        <AgoraButton
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
