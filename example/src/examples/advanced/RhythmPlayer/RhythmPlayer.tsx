import React, { ReactElement } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  RhythmPlayerReason,
  RhythmPlayerStateType,
  RtcConnection,
  RtcStats,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraSlider,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { getAbsolutePath, getResourcePath } from '../../../utils';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseAudioComponentState {
  sound1: string;
  sound2: string;
  beatsPerMeasure: number;
  beatsPerMinute: number;
  startRhythmPlayer?: boolean;
}

export default class RhythmPlayer
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
      sound1: getResourcePath('ding.mp3'),
      sound2: getResourcePath('dang.mp3'),
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

    // Need granted the microphone permission
    await askMediaAccess(['android.permission.RECORD_AUDIO']);

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
      // ⚠️ Must be true, if you want to publish to remote
      publishRhythmPlayerTrack: true,
    });
  }

  /**
   * Step 3-1: startRhythmPlayer
   */
  startRhythmPlayer = async () => {
    const { sound1, sound2, beatsPerMeasure, beatsPerMinute } = this.state;
    if (!sound1) {
      this.error('sound1 is invalid');
      return;
    }
    if (!sound2) {
      this.error('sound2 is invalid');
      return;
    }

    this.engine?.startRhythmPlayer(
      await getAbsolutePath(sound1),
      await getAbsolutePath(sound2),
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
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
    const state = this.createState();
    delete state.startRhythmPlayer;
    this.setState(state);
  }

  onRhythmPlayerStateChanged(
    state: RhythmPlayerStateType,
    errorCode: RhythmPlayerReason
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

  protected renderConfiguration(): ReactElement | undefined {
    const { sound1, sound2, beatsPerMeasure, beatsPerMinute } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ sound1: text });
          }}
          placeholder={'sound1'}
          value={sound1}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ sound2: text });
          }}
          placeholder={'sound2'}
          value={sound2}
        />
        <AgoraSlider
          title={`beatsPerMeasure ${beatsPerMeasure}`}
          minimumValue={1}
          maximumValue={9}
          step={1}
          value={beatsPerMeasure}
          onSlidingComplete={(value) => {
            this.setState({ beatsPerMeasure: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`beatsPerMinute ${beatsPerMinute}`}
          minimumValue={60}
          maximumValue={360}
          step={1}
          value={beatsPerMinute}
          onSlidingComplete={(value) => {
            this.setState({ beatsPerMinute: value });
          }}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { startRhythmPlayer } = this.state;
    return (
      <>
        <AgoraButton
          title={`${startRhythmPlayer ? 'stop' : 'start'} Rhythm Player`}
          onPress={
            startRhythmPlayer ? this.stopRhythmPlayer : this.startRhythmPlayer
          }
        />
        <AgoraButton
          disabled={!startRhythmPlayer}
          title={`config Rhythm Player`}
          onPress={this.configRhythmPlayer}
        />
      </>
    );
  }
}
