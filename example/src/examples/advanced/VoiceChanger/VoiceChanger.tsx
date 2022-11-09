import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  AudioEffectPreset,
  AudioEqualizationBandFrequency,
  AudioReverbType,
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  VoiceBeautifierPreset,
  VoiceConversionPreset,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import {
  AudioEffectPresetParam1Limit,
  AudioEffectPresetParam2Limit,
  AudioReverbTypeValueLimit,
  VoiceBeautifierPresetParam1Limit,
  VoiceBeautifierPresetParam2Limit,
} from './VoiceChangerConfig';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';

interface State extends BaseAudioComponentState {
  voiceBeautifierPreset: VoiceBeautifierPreset;
  audioEffectPreset: AudioEffectPreset;
  param1: number;
  param2: number;
  reverbKey: AudioReverbType;
  value: number;
  bandFrequency: AudioEqualizationBandFrequency;
  bandGain: number;
  pitch: number;
  voiceConversionPreset: VoiceConversionPreset;
}

export default class VoiceChanger
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
      voiceBeautifierPreset: VoiceBeautifierPreset.VoiceBeautifierOff,
      audioEffectPreset: AudioEffectPreset.AudioEffectOff,
      param1: 0,
      param2: 0,
      reverbKey: AudioReverbType.AudioReverbDryLevel,
      value: 0,
      bandFrequency: AudioEqualizationBandFrequency.AudioEqualizationBand31,
      bandGain: 0,
      pitch: 1.0,
      voiceConversionPreset: VoiceConversionPreset.VoiceConversionOff,
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

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_audio_beauty_extension');
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
   * Step 3-1 (Optional): setVoiceBeautifierPreset
   */
  setVoiceBeautifierPreset = () => {
    const { voiceBeautifierPreset } = this.state;
    this.engine?.setVoiceBeautifierPreset(voiceBeautifierPreset);
  };

  /**
   * Step 3-2 (Optional): setVoiceBeautifierParameters
   */
  setVoiceBeautifierParameters = () => {
    const { voiceBeautifierPreset, param1, param2 } = this.state;
    this.engine?.setVoiceBeautifierParameters(
      voiceBeautifierPreset,
      param1,
      param2
    );
  };

  /**
   * Step 3-3 (Optional): setAudioEffectPreset
   */
  setAudioEffectPreset = () => {
    const { audioEffectPreset } = this.state;
    this.engine?.setAudioEffectPreset(audioEffectPreset);
  };

  /**
   * Step 3-4 (Optional): setAudioEffectParameters
   */
  setAudioEffectParameters = () => {
    const { audioEffectPreset, param1, param2 } = this.state;
    this.engine?.setAudioEffectParameters(audioEffectPreset, param1, param2);
  };

  /**
   * Step 3-5 (Optional): setLocalVoiceReverb
   */
  setLocalVoiceReverb = () => {
    const { reverbKey, value } = this.state;
    this.engine?.setLocalVoiceReverb(reverbKey, value);
  };

  /**
   * Step 3-6 (Optional): setLocalVoiceEqualization
   */
  setLocalVoiceEqualization = () => {
    const { bandFrequency, bandGain } = this.state;
    this.engine?.setLocalVoiceEqualization(bandFrequency, bandGain);
  };

  /**
   * Step 3-7 (Optional): setLocalVoicePitch
   */
  setLocalVoicePitch = () => {
    const { pitch } = this.state;
    this.engine?.setLocalVoicePitch(pitch);
  };

  /**
   * Step 3-8 (Optional): setVoiceConversionPreset
   */
  setVoiceConversionPreset = () => {
    const { voiceConversionPreset } = this.state;
    this.engine?.setVoiceConversionPreset(voiceConversionPreset);
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
    return (
      <>
        {this._renderVoiceBeautifierPreset()}
        <AgoraDivider />
        {this._renderAudioEffectPreset()}
        <AgoraDivider />
        {this._renderAudioReverbType()}
        <AgoraDivider />
        {this._renderAudioEqualizationBandFrequency()}
        <AgoraDivider />
        {this._renderLocalVoicePitch()}
        <AgoraDivider />
        {this._renderVoiceConversionPreset()}
        <AgoraDivider />
      </>
    );
  }

  _renderVoiceBeautifierPreset = () => {
    const { voiceBeautifierPreset, param1, param2 } = this.state;
    const limit1 = VoiceBeautifierPresetParam1Limit.get(voiceBeautifierPreset);
    const limit2 = VoiceBeautifierPresetParam2Limit.get(voiceBeautifierPreset);
    return (
      <>
        <AgoraDropdown
          title={'voiceBeautifierPreset'}
          items={enumToItems(VoiceBeautifierPreset)}
          value={voiceBeautifierPreset}
          onValueChange={(value) => {
            this.setState({ voiceBeautifierPreset: value });
          }}
        />
        <AgoraButton
          title={'set Voice Beautifier Preset'}
          onPress={this.setVoiceBeautifierPreset}
        />
        {limit1 !== undefined ? (
          <AgoraSlider
            title={`param1 ${param1}`}
            minimumValue={limit1.min}
            maximumValue={limit1.max}
            step={1}
            value={param1}
            onSlidingComplete={(value) => {
              this.setState({ param1: value });
            }}
          />
        ) : undefined}
        {limit2 !== undefined ? (
          <AgoraSlider
            title={`param2 ${param2}`}
            minimumValue={limit2.min}
            maximumValue={limit2.max}
            step={1}
            value={param2}
            onSlidingComplete={(value) => {
              this.setState({ param2: value });
            }}
          />
        ) : undefined}
        {limit1 !== undefined && limit2 !== undefined ? (
          <AgoraButton
            title={'set Voice Beautifier Parameters'}
            onPress={this.setVoiceBeautifierParameters}
          />
        ) : undefined}
      </>
    );
  };

  _renderAudioEffectPreset = () => {
    const { audioEffectPreset, param1, param2 } = this.state;
    const limit1 = AudioEffectPresetParam1Limit.get(audioEffectPreset);
    const limit2 = AudioEffectPresetParam2Limit.get(audioEffectPreset);
    return (
      <>
        <AgoraDropdown
          title={'audioEffectPreset'}
          items={enumToItems(AudioEffectPreset)}
          value={audioEffectPreset}
          onValueChange={(value) => {
            this.setState({ audioEffectPreset: value });
          }}
        />
        <AgoraButton
          title={'set Audio Effect Preset'}
          onPress={this.setAudioEffectPreset}
        />
        {limit1 !== undefined ? (
          <AgoraSlider
            title={`param1 ${param1}`}
            minimumValue={limit1.min}
            maximumValue={limit1.max}
            step={1}
            value={param1}
            onSlidingComplete={(value) => {
              this.setState({ param1: value });
            }}
          />
        ) : undefined}
        {limit2 !== undefined ? (
          <AgoraSlider
            title={`param2 ${param2}`}
            minimumValue={limit2.min}
            maximumValue={limit2.max}
            step={1}
            value={param2}
            onSlidingComplete={(value) => {
              this.setState({ param2: value });
            }}
          />
        ) : undefined}
        {limit1 !== undefined && limit2 !== undefined ? (
          <AgoraButton
            title={'set Audio Effect Parameters'}
            onPress={this.setAudioEffectParameters}
          />
        ) : undefined}
      </>
    );
  };

  _renderAudioReverbType = () => {
    const { reverbKey, value } = this.state;
    const limit = AudioReverbTypeValueLimit.get(reverbKey);
    return (
      <>
        <AgoraDropdown
          title={'reverbKey'}
          items={enumToItems(AudioReverbType)}
          value={reverbKey}
          onValueChange={(v) => {
            this.setState({ reverbKey: v });
          }}
        />
        {limit !== undefined ? (
          <AgoraSlider
            title={`value ${value}`}
            minimumValue={limit.min}
            maximumValue={limit.max}
            step={1}
            value={value}
            onSlidingComplete={(v) => {
              this.setState({ value: v });
            }}
          />
        ) : undefined}
        {limit !== undefined ? (
          <AgoraButton
            title={'set Local Voice Reverb'}
            onPress={this.setLocalVoiceReverb}
          />
        ) : undefined}
      </>
    );
  };

  _renderAudioEqualizationBandFrequency = () => {
    const { bandFrequency, bandGain } = this.state;
    const min = -15;
    const max = 15;
    return (
      <>
        <AgoraDropdown
          title={'bandFrequency'}
          items={enumToItems(AudioEqualizationBandFrequency)}
          value={bandFrequency}
          onValueChange={(value) => {
            this.setState({ bandFrequency: value });
          }}
        />
        <AgoraSlider
          title={`bandGain ${bandGain}`}
          minimumValue={min}
          maximumValue={max}
          step={1}
          value={bandGain}
          onSlidingComplete={(value) => {
            this.setState({ bandGain: value });
          }}
        />
        <AgoraButton
          title={'set Local Voice Equalization'}
          onPress={this.setLocalVoiceEqualization}
        />
      </>
    );
  };

  _renderLocalVoicePitch = () => {
    const { pitch } = this.state;
    const min = 0.5;
    const max = 2.0;
    return (
      <>
        <AgoraSlider
          title={`pitch ${pitch}`}
          minimumValue={min}
          maximumValue={max}
          step={0.1}
          value={pitch}
          onSlidingComplete={(value) => {
            this.setState({ pitch: value });
          }}
        />
        <AgoraButton
          title={'set Local Voice Pitch'}
          onPress={this.setLocalVoicePitch}
        />
      </>
    );
  };

  _renderVoiceConversionPreset = () => {
    const { voiceConversionPreset } = this.state;
    return (
      <>
        <AgoraDropdown
          title={'voiceConversionPreset'}
          items={enumToItems(VoiceConversionPreset)}
          value={voiceConversionPreset}
          onValueChange={(value) => {
            this.setState({ voiceConversionPreset: value });
          }}
        />
        <AgoraButton
          title={'set Voice Conversion Preset'}
          onPress={this.setVoiceConversionPreset}
        />
      </>
    );
  };
}
