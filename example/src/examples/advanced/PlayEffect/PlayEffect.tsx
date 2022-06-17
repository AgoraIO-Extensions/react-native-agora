import React from 'react';
import { PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora-rtc-ng';

import { ActionItem } from '../../../components/ActionItem';
import {
  BaseAudioComponentState,
  BaseComponent,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';

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
      filePath: this.getAssetPath('Sound_Horizon.mp3'),
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
      console.error('filePath is invalid');
      return;
    }
    if (startPos < 0) {
      console.error('startPos is invalid');
      return;
    }

    this.engine?.playEffect(
      soundId,
      await this.getAbsolutePath(filePath),
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
    this.engine?.release();
  }

  onAudioEffectFinished(soundId: number) {
    this.info('onAudioEffectFinished', 'soundId', soundId);
    this.setState({ playEffect: false });
  }

  protected renderBottom(): React.ReactNode {
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
              [key]: Number.parseFloat(((max - min) * value + min).toFixed(2)),
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
            this.setState({ soundId: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`soundId (defaults: ${soundId})`}
          placeholderTextColor={'gray'}
          value={
            soundId === this.createState().soundId ? '' : soundId.toString()
          }
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ filePath: text });
          }}
          placeholder={'filePath'}
          placeholderTextColor={'gray'}
          value={filePath}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ loopCount: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`loopCount (defaults: ${loopCount})`}
          placeholderTextColor={'gray'}
          value={
            loopCount === this.createState().loopCount
              ? ''
              : loopCount.toString()
          }
        />
        {renderSlider('pitch', pitch, 0.5, 2.0)}
        <Divider />
        {renderSlider('pan', pan, -1.0, 1.0)}
        <Divider />
        {renderSlider('gain', gain, 0.0, 100.0)}
        <Divider />
        <ActionItem
          title={'publish'}
          isShowSwitch={true}
          switchValue={publish}
          onSwitchValueChange={(value) => {
            this.setState({ publish: value });
          }}
        />
        <Divider />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ startPos: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`startPos (defaults: ${startPos})`}
          placeholderTextColor={'gray'}
          value={
            startPos === this.createState().startPos ? '' : startPos.toString()
          }
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { playEffect, pauseEffect } = this.state;
    return (
      <>
        <ActionItem
          title={`${playEffect ? 'stop' : 'play'} Effect`}
          onPress={playEffect ? this.stopEffect : this.playEffect}
        />
        <ActionItem
          disabled={!playEffect}
          title={`${pauseEffect ? 'resume' : 'pause'} Effect`}
          onPress={pauseEffect ? this.resumeEffect : this.pauseEffect}
        />
      </>
    );
  }
}
