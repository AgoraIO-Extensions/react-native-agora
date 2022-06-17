import React from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
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
} from 'react-native-agora-rtc-ng';

import { ActionItem } from '../../../components/ActionItem';
import {
  BaseAudioComponentState,
  BaseComponent,
  Divider,
} from '../../../components/BaseComponent';
import { PickerView } from '../../../components/PickerView';
import Config from '../../../config/agora.config.json';
import {
  AudioEffectPresetParam1Limit,
  AudioEffectPresetParam2Limit,
  AudioReverbTypeValueLimit,
  VoiceBeautifierPresetParam1Limit,
  VoiceBeautifierPresetParam2Limit,
} from './VoiceChangerConfig';

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
    this.engine?.release();
  }

  protected renderBottom(): React.ReactNode {
    return (
      <>
        {this._renderVoiceBeautifierPreset()}
        <Divider />
        {this._renderAudioEffectPreset()}
        <Divider />
        {this._renderAudioReverbType()}
        <Divider />
        {this._renderAudioEqualizationBandFrequency()}
        <Divider />
        {this._renderLocalVoicePitch()}
        <Divider />
        {this._renderVoiceConversionPreset()}
        <Divider />
      </>
    );
  }

  _renderVoiceBeautifierPreset = () => {
    const { voiceBeautifierPreset, param1, param2 } = this.state;
    const limit1 = VoiceBeautifierPresetParam1Limit.get(voiceBeautifierPreset);
    const limit2 = VoiceBeautifierPresetParam2Limit.get(voiceBeautifierPreset);
    return (
      <>
        <View style={styles.container}>
          <PickerView
            title={'voiceBeautifierPreset'}
            type={VoiceBeautifierPreset}
            selectedValue={voiceBeautifierPreset}
            onValueChange={(value: VoiceBeautifierPreset) => {
              this.setState({ voiceBeautifierPreset: value });
            }}
          />
        </View>
        <Button
          title={'set Voice Beautifier Preset'}
          onPress={this.setVoiceBeautifierPreset}
        />
        {limit1 !== undefined ? (
          <ActionItem
            title={`param1 ${param1}`}
            isShowSlider={true}
            sliderValue={(param1 - limit1.min) / (limit1.max - limit1.min)}
            onSliderValueChange={(value) => {
              this.setState({
                param1: +(
                  (limit1.max - limit1.min) * value +
                  limit1.min
                ).toFixed(0),
              });
            }}
          />
        ) : undefined}
        {limit2 !== undefined ? (
          <ActionItem
            title={`param2 ${param2}`}
            isShowSlider={true}
            sliderValue={(param2 - limit2.min) / (limit2.max - limit2.min)}
            onSliderValueChange={(value) => {
              this.setState({
                param2: +(
                  (limit2.max - limit2.min) * value +
                  limit2.min
                ).toFixed(0),
              });
            }}
          />
        ) : undefined}
        {limit1 !== undefined && limit2 !== undefined ? (
          <Button
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
        <View style={styles.container}>
          <PickerView
            title={'audioEffectPreset'}
            type={AudioEffectPreset}
            selectedValue={audioEffectPreset}
            onValueChange={(value: AudioEffectPreset) => {
              this.setState({ audioEffectPreset: value });
            }}
          />
        </View>
        <Button
          title={'set Audio Effect Preset'}
          onPress={this.setAudioEffectPreset}
        />
        {limit1 !== undefined ? (
          <ActionItem
            title={`param1 ${param1}`}
            isShowSlider={true}
            sliderValue={(param1 - limit1.min) / (limit1.max - limit1.min)}
            onSliderValueChange={(value) => {
              this.setState({
                param1: +(
                  (limit1.max - limit1.min) * value +
                  limit1.min
                ).toFixed(0),
              });
            }}
          />
        ) : undefined}
        {limit2 !== undefined ? (
          <ActionItem
            title={`param2 ${param2}`}
            isShowSlider={true}
            sliderValue={(param2 - limit2.min) / (limit2.max - limit2.min)}
            onSliderValueChange={(value) => {
              this.setState({
                param2: +(
                  (limit2.max - limit2.min) * value +
                  limit2.min
                ).toFixed(0),
              });
            }}
          />
        ) : undefined}
        {limit1 !== undefined && limit2 !== undefined ? (
          <Button
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
        <View style={styles.container}>
          <PickerView
            title={'reverbKey'}
            type={AudioReverbType}
            selectedValue={reverbKey}
            onValueChange={(value: AudioReverbType) => {
              this.setState({ reverbKey: value });
            }}
          />
        </View>
        {limit !== undefined ? (
          <ActionItem
            title={`value ${value}`}
            isShowSlider={true}
            sliderValue={(value - limit.min) / (limit.max - limit.min)}
            onSliderValueChange={(value) => {
              this.setState({
                value: +((limit.max - limit.min) * value + limit.min).toFixed(
                  0
                ),
              });
            }}
          />
        ) : undefined}
        {limit !== undefined ? (
          <Button
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
        <View style={styles.container}>
          <PickerView
            title={'bandFrequency'}
            type={AudioEqualizationBandFrequency}
            selectedValue={bandFrequency}
            onValueChange={(value: AudioEqualizationBandFrequency) => {
              this.setState({ bandFrequency: value });
            }}
          />
        </View>
        <ActionItem
          title={`bandGain ${bandGain}`}
          isShowSlider={true}
          sliderValue={(bandGain - min) / (max - min)}
          onSliderValueChange={(value) => {
            this.setState({
              bandGain: +((max - min) * value + min).toFixed(0),
            });
          }}
        />
        <Button
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
        <ActionItem
          title={`pitch ${pitch}`}
          isShowSlider={true}
          sliderValue={(pitch - min) / (max - min)}
          onSliderValueChange={(value) => {
            this.setState({
              pitch: +((max - min) * value + min).toFixed(0),
            });
          }}
        />
        <Button
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
        <View style={styles.container}>
          <PickerView
            title={'voiceConversionPreset'}
            type={VoiceConversionPreset}
            selectedValue={voiceConversionPreset}
            onValueChange={(value: VoiceConversionPreset) => {
              this.setState({ voiceConversionPreset: value });
            }}
          />
        </View>
        <Button
          title={'set Voice Conversion Preset'}
          onPress={this.setVoiceConversionPreset}
        />
      </>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
