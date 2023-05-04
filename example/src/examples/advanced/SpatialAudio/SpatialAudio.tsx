import React from 'react';
import {
  AudioScenarioType,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
  AgoraSwitch,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { arrayToItems } from '../../../utils';
import { askMediaAccess } from '../../../utils/permissions';

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

export default class SpatialAudio
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
      this.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      audioScenario: AudioScenarioType.AudioScenarioGameStreaming,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone permission
    await askMediaAccess(['android.permission.RECORD_AUDIO']);

    this.engine.setParameters(
      JSON.stringify({ 'rtc.audio.force_bluetooth_a2dp': true })
    );

    // Only need to enable audio on this case
    this.engine.enableAudio();
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
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  protected renderConfiguration(): React.ReactNode {
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
    return (
      <>
        <AgoraDropdown
          title={'targetUid'}
          items={arrayToItems(remoteUsers)}
          value={targetUid}
          onValueChange={(value) => {
            this.setState({ targetUid: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`speaker_azimuth ${speaker_azimuth}`}
          minimumValue={0}
          maximumValue={360}
          step={1}
          value={speaker_azimuth}
          onSlidingComplete={(value) => {
            this.setState({ speaker_azimuth: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`speaker_elevation ${speaker_elevation}`}
          minimumValue={-90}
          maximumValue={90}
          step={1}
          value={speaker_elevation}
          onSlidingComplete={(value) => {
            this.setState({ speaker_elevation: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`speaker_distance ${speaker_distance}`}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={speaker_distance}
          onSlidingComplete={(value) => {
            this.setState({ speaker_distance: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`speaker_orientation ${speaker_orientation}`}
          minimumValue={0}
          maximumValue={180}
          step={1}
          value={speaker_orientation}
          onSlidingComplete={(value) => {
            this.setState({ speaker_orientation: value });
          }}
        />
        <AgoraDivider />
        <AgoraSwitch
          title={`enable_blur`}
          value={enable_blur}
          onValueChange={(value) => {
            this.setState({
              enable_blur: value,
            });
          }}
        />
        <AgoraDivider />
        <AgoraSwitch
          title={`enable_air_absorb`}
          value={enable_air_absorb}
          onValueChange={(value) => {
            this.setState({
              enable_air_absorb: value,
            });
          }}
        />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { joinChannelSuccess, enableSpatialAudio } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`${enableSpatialAudio ? 'disable' : 'enable'} Spatial Audio`}
          onPress={
            enableSpatialAudio
              ? this.disableSpatialAudio
              : this.enableSpatialAudio
          }
        />
        <AgoraButton
          disabled={!enableSpatialAudio}
          title={`set Remote User Spatial Audio Params`}
          onPress={this.setRemoteUserSpatialAudioParams}
        />
      </>
    );
  }
}
