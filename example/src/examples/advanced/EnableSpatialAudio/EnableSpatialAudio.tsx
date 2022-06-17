import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
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
  targetUid: number;
  speaker_azimuth: number;
  speaker_elevation: number;
  speaker_distance: number;
  speaker_orientation: number;
  enable_blur: boolean;
  enable_air_absorb: boolean;
  enableSpatialAudio: boolean;
}

export default class EnableSpatialAudio
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
      enableSpatialAudio: false,
      targetUid: 0,
      speaker_azimuth: 0,
      speaker_elevation: 0,
      speaker_distance: 1,
      speaker_orientation: 0,
      enable_blur: false,
      enable_air_absorb: true,
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
   * Step 3-1: enableSpatialAudio
   */
  enableSpatialAudio = () => {
    this.engine?.enableSpatialAudio(true);
    this.setState({ enableSpatialAudio: true });
  };

  /**
   * Step 3-2: setRemoteUserSpatialAudioParams
   */
  setRemoteUserSpatialAudioParams = () => {
    const {
      targetUid,
      speaker_azimuth,
      speaker_elevation,
      speaker_distance,
      speaker_orientation,
      enable_blur,
      enable_air_absorb,
    } = this.state;

    this.engine?.setRemoteUserSpatialAudioParams(targetUid, {
      speaker_azimuth,
      speaker_elevation,
      speaker_distance,
      speaker_orientation,
      enable_blur,
      enable_air_absorb,
    });
  };

  /**
   * Step 3-3: disableSpatialAudio
   */
  disableSpatialAudio = () => {
    this.engine?.enableSpatialAudio(false);
    this.setState({ enableSpatialAudio: false });
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
      remoteUsers,
      targetUid,
      speaker_azimuth,
      speaker_elevation,
      speaker_distance,
      speaker_orientation,
      enable_blur,
      enable_air_absorb,
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
        <View style={styles.container}>
          <PickerView
            title={'targetUid'}
            type={[
              ...remoteUsers.map((value) => value.toString()),
              ...remoteUsers,
            ]}
            selectedValue={targetUid}
            onValueChange={(value) => {
              this.setState({ targetUid: value });
            }}
          />
        </View>
        <Divider />
        {renderSlider('speaker_azimuth', speaker_azimuth, 0, 360)}
        <Divider />
        {renderSlider('speaker_elevation', speaker_elevation, -90, 90)}
        <Divider />
        {renderSlider('speaker_distance', speaker_distance, 1, 50)}
        <Divider />
        {renderSlider('speaker_orientation', speaker_orientation, 0, 180)}
        <Divider />
        <ActionItem
          title={`enable_blur`}
          isShowSwitch={true}
          switchValue={enable_blur}
          onSwitchValueChange={(value) => {
            this.setState({
              enable_blur: value,
            });
          }}
        />
        <Divider />
        <ActionItem
          title={`enable_air_absorb`}
          isShowSwitch={true}
          switchValue={enable_air_absorb}
          onSwitchValueChange={(value) => {
            this.setState({
              enable_air_absorb: value,
            });
          }}
        />
        <Divider />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess, enableSpatialAudio } = this.state;
    return (
      <>
        <ActionItem
          disabled={!joinChannelSuccess}
          title={`${enableSpatialAudio ? 'disable' : 'enable'} Spatial Audio`}
          onPress={
            enableSpatialAudio
              ? this.disableSpatialAudio
              : this.enableSpatialAudio
          }
        />
        <ActionItem
          disabled={!enableSpatialAudio}
          title={`set Remote User Spatial Audio Params`}
          onPress={this.setRemoteUserSpatialAudioParams}
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
