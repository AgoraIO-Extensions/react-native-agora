import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
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
  AgoraSlider,
  AgoraSwitch,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { getAbsolutePath, getAssetPath } from '../../../utils';

interface State extends BaseAudioComponentState {
  soundId: number;
  filePath: string;
  loopCount: number;
  pitch: number;
  pan: number;
  gain: number;
  publish: boolean;
  startPos: number;
  playEffect: boolean;
  pauseEffect: boolean;
}

export default class PlayEffect
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
      soundId: 0,
      filePath: getAssetPath('Sound_Horizon.mp3'),
      loopCount: 1,
      pitch: 1.0,
      pan: 0,
      gain: 100,
      publish: false,
      startPos: 0,
      playEffect: false,
      pauseEffect: false,
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
   * Step 3-1: playEffect
   */
  playEffect = async () => {
    const {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos,
    } = this.state;
    if (!filePath) {
      this.error('filePath is invalid');
      return;
    }
    if (startPos < 0) {
      this.error('startPos is invalid');
      return;
    }

    this.engine?.playEffect(
      soundId,
      await getAbsolutePath(filePath),
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos
    );
    this.setState({ playEffect: true, pauseEffect: false });
  };

  /**
   * Step 3-2 (Optional): pauseEffect
   */
  pauseEffect = () => {
    const { soundId } = this.state;
    this.engine?.pauseEffect(soundId);
    this.setState({ pauseEffect: true });
  };

  /**
   * Step 3-3 (Optional): resumeEffect
   */
  resumeEffect = () => {
    const { soundId } = this.state;
    this.engine?.resumeEffect(soundId);
    this.setState({ pauseEffect: false });
  };

  /**
   * Step 3-4: stopEffect
   */
  stopEffect = () => {
    const { soundId } = this.state;
    this.engine?.stopEffect(soundId);
    this.setState({ playEffect: false });
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

  onAudioEffectFinished(soundId: number) {
    this.info('onAudioEffectFinished', 'soundId', soundId);
    this.setState({ playEffect: false });
  }

  protected renderConfiguration(): React.ReactNode {
    const { filePath, pitch, pan, gain, publish } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              soundId: text === '' ? this.createState().soundId : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`soundId (defaults: ${this.createState().soundId})`}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ filePath: text });
          }}
          placeholder={'filePath'}
          value={filePath}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              loopCount: text === '' ? this.createState().loopCount : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`loopCount (defaults: ${this.createState().loopCount})`}
        />
        <AgoraSlider
          title={`pitch ${pitch}`}
          minimumValue={0.5}
          maximumValue={2.0}
          step={0.1}
          value={pitch}
          onSlidingComplete={(value) => {
            this.setState({ pitch: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`pan ${pan}`}
          minimumValue={-1.0}
          maximumValue={1.0}
          step={0.1}
          value={pan}
          onSlidingComplete={(value) => {
            this.setState({ pan: value });
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`gain ${gain}`}
          minimumValue={0}
          maximumValue={100}
          step={0.1}
          value={gain}
          onSlidingComplete={(value) => {
            this.setState({ gain: value });
          }}
        />
        <AgoraDivider />
        <AgoraSwitch
          title={'publish'}
          value={publish}
          onValueChange={(value) => {
            this.setState({ publish: value });
          }}
        />
        <AgoraDivider />
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
    const { playEffect, pauseEffect } = this.state;
    return (
      <>
        <AgoraButton
          title={`${playEffect ? 'stop' : 'play'} Effect`}
          onPress={playEffect ? this.stopEffect : this.playEffect}
        />
        <AgoraButton
          disabled={!playEffect}
          title={`${pauseEffect ? 'resume' : 'pause'} Effect`}
          onPress={pauseEffect ? this.resumeEffect : this.pauseEffect}
        />
      </>
    );
  }
}
