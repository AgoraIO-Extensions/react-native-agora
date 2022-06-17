import React from 'react';
import { PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  RhythmPlayerErrorType,
  RhythmPlayerStateType,
} from 'react-native-agora-rtc-ng';

import {
  BaseAudioComponentState,
  BaseComponent,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import { ActionItem } from '../../../components/ActionItem';
import Config from '../../../config/agora.config.json';

interface State extends BaseAudioComponentState {
  sound1: string;
  sound2: string;
  beatsPerMeasure: number;
  beatsPerMinute: number;
  startRhythmPlayer: boolean;
}

export default class StartRhythmPlayer
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
      sound1: this.getAssetPath('ding.mp3'),
      sound2: this.getAssetPath('dang.mp3'),
      beatsPerMeasure: 4,
      beatsPerMinute: 60,
      startRhythmPlayer: false,
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
   * Step 3-1: startRhythmPlayer
   */
  startRhythmPlayer = async () => {
    const { sound1, sound2, beatsPerMeasure, beatsPerMinute } = this.state;
    if (!sound1) {
      console.error('sound1 is invalid');
      return;
    }
    if (!sound2) {
      console.error('sound2 is invalid');
      return;
    }

    this.engine?.startRhythmPlayer(
      await this.getAbsolutePath(sound1),
      await this.getAbsolutePath(sound2),
      {
        beatsPerMeasure,
        beatsPerMinute,
      }
    );
  };

  /**
   * Step 3-2 (Optional): configRhythmPlayer
   */
  configRhythmPlayer = () => {
    const { beatsPerMeasure, beatsPerMinute } = this.state;
    this.engine?.configRhythmPlayer({
      beatsPerMeasure,
      beatsPerMinute,
    });
  };

  /**
   * Step 3-3: stopRhythmPlayer
   */
  stopRhythmPlayer = () => {
    this.engine?.stopRhythmPlayer();
    this.setState({ startRhythmPlayer: false });
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

  onRhythmPlayerStateChanged(
    state: RhythmPlayerStateType,
    errorCode: RhythmPlayerErrorType
  ) {
    this.info(
      'onRhythmPlayerStateChanged',
      'state',
      state,
      'errorCode',
      errorCode
    );
    switch (state) {
      case RhythmPlayerStateType.RhythmPlayerStateIdle:
        break;
      case RhythmPlayerStateType.RhythmPlayerStateOpening:
        break;
      case RhythmPlayerStateType.RhythmPlayerStateDecoding:
        break;
      case RhythmPlayerStateType.RhythmPlayerStatePlaying:
        this.setState({ startRhythmPlayer: true });
        break;
      case RhythmPlayerStateType.RhythmPlayerStateFailed:
        break;
    }
  }

  protected renderBottom(): React.ReactNode {
    const { sound1, sound2, beatsPerMeasure, beatsPerMinute } = this.state;

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
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ sound1: text });
          }}
          placeholder={'sound1'}
          placeholderTextColor={'gray'}
          value={sound1}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ sound2: text });
          }}
          placeholder={'sound2'}
          placeholderTextColor={'gray'}
          value={sound2}
        />
        {renderSlider('beatsPerMeasure', beatsPerMeasure, 1, 9)}
        <Divider />
        {renderSlider('beatsPerMinute', beatsPerMinute, 60, 360)}
        <Divider />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { startRhythmPlayer } = this.state;
    return (
      <>
        <ActionItem
          title={`${startRhythmPlayer ? 'stop' : 'start'} Rhythm Player`}
          onPress={
            startRhythmPlayer ? this.stopRhythmPlayer : this.startRhythmPlayer
          }
        />
        <ActionItem
          disabled={!startRhythmPlayer}
          title={`config Rhythm Player`}
          onPress={this.configRhythmPlayer}
        />
      </>
    );
  }
}
