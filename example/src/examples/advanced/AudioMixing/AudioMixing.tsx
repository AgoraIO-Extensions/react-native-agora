import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  AudioMixingReasonType,
  AudioMixingStateType,
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
  AgoraSwitch,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';

import { getAssetPath } from '../../../utils';

interface State extends BaseAudioComponentState {
  filePath: string;
  loopback: boolean;
  cycle: number;
  startPos: number;
  startAudioMixing: boolean;
  pauseAudioMixing: boolean;
}

export default class AudioMixing
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
      filePath: getAssetPath('Sound_Horizon.mp3'),
      loopback: false,
      cycle: -1,
      startPos: 0,
      startAudioMixing: false,
      pauseAudioMixing: false,
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
      // Need granted the microphone permission
      await PermissionsAndroid.request('android.permission.RECORD_AUDIO');
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
   * Step 3-1: startAudioMixing
   */
  startAudioMixing = () => {
    const { filePath, loopback, cycle, startPos } = this.state;
    if (!filePath) {
      this.error('filePath is invalid');
      return;
    }
    if (cycle < -1) {
      this.error('cycle is invalid');
      return;
    }
    if (startPos < 0) {
      this.error('startPos is invalid');
      return;
    }

    this.engine?.startAudioMixing(filePath, loopback, cycle, startPos);
  };

  /**
   * Step 3-2 (Optional): pauseAudioMixing
   */
  pauseAudioMixing = () => {
    this.engine?.pauseAudioMixing();
  };

  /**
   * Step 3-3 (Optional): resumeAudioMixing
   */
  resumeAudioMixing = () => {
    this.engine?.resumeAudioMixing();
  };

  /**
   * Step 3-4 (Optional): getAudioMixingCurrentPosition
   */
  getAudioMixingCurrentPosition = () => {
    const position = this.engine?.getAudioMixingCurrentPosition();
    const duration = this.engine?.getAudioMixingDuration();
    this.debug(
      'getAudioMixingCurrentPosition',
      'position',
      position,
      'duration',
      duration
    );
  };

  /**
   * Step 3-5: stopAudioMixing
   */
  stopAudioMixing = () => {
    this.engine?.stopAudioMixing();
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

  onAudioMixingStateChanged(
    state: AudioMixingStateType,
    reason: AudioMixingReasonType
  ) {
    this.info('onAudioMixingStateChanged', 'state', state, 'reason', reason);
    switch (state) {
      case AudioMixingStateType.AudioMixingStatePlaying:
        this.setState({ startAudioMixing: true, pauseAudioMixing: false });
        break;
      case AudioMixingStateType.AudioMixingStatePaused:
        this.setState({ pauseAudioMixing: true });
        break;
      case AudioMixingStateType.AudioMixingStateStopped:
      case AudioMixingStateType.AudioMixingStateFailed:
        this.setState({ startAudioMixing: false });
        break;
    }
  }

  onAudioMixingFinished() {
    this.info('AudioMixingFinished');
  }

  protected renderConfiguration(): React.ReactNode {
    const { filePath, loopback } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ filePath: text });
          }}
          placeholder={'filePath'}
          value={filePath}
        />
        <AgoraSwitch
          title={'loopback'}
          value={loopback}
          onValueChange={(value) => {
            this.setState({ loopback: value });
          }}
        />
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              cycle: text === '' ? this.createState().cycle : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`cycle (defaults: ${this.createState().cycle})`}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              startPos: text === '' ? this.createState().startPos : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`startPos (defaults: ${this.createState().startPos})`}
        />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { startAudioMixing, pauseAudioMixing } = this.state;
    return (
      <>
        <AgoraButton
          title={`${startAudioMixing ? 'stop' : 'start'} Audio Mixing`}
          onPress={
            startAudioMixing ? this.stopAudioMixing : this.startAudioMixing
          }
        />
        <AgoraButton
          disabled={!startAudioMixing}
          title={`${pauseAudioMixing ? 'resume' : 'pause'} Audio Mixing`}
          onPress={
            pauseAudioMixing ? this.resumeAudioMixing : this.pauseAudioMixing
          }
        />
        <AgoraButton
          disabled={!startAudioMixing}
          title={`get Audio Mixing Current Position`}
          onPress={this.getAudioMixingCurrentPosition}
        />
      </>
    );
  }
}
