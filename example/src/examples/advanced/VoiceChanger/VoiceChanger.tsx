import React, { Component, useState } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import RtcEngine, {
  AudioEffectPreset,
  AudioEqualizationBandFrequency,
  AudioProfile,
  AudioReverbType,
  AudioScenario,
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
  VoiceBeautifierPreset,
} from 'react-native-agora';
import Item from '../../../components/Item';

const config = require('../../../config/agora.config.json');

interface State {
  channelId: string;
  isJoined: boolean;
  isBeautifierOnly: boolean;
}

export default class VoiceChanger extends Component<{}, State, any> {
  _engine?: RtcEngine;
  _voiceBeautifierPreset: VoiceBeautifierPreset = 0;
  _audioEffectPreset: AudioEffectPreset = 0;
  _param1: number = 0;
  _param2: number = 0;
  _audioReverbType: AudioReverbType = 0;
  _audioReverbValue: number = 0;
  _audioEqualizationBandFrequency: AudioEqualizationBandFrequency = 0;
  _bandGain: number = 0;
  _localVoicePitch: number = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      channelId: config.channelId,
      isJoined: false,
      isBeautifierOnly: false,
    };
  }

  UNSAFE_componentWillMount() {
    this._initEngine();
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId)
    );
    this._addListeners();

    // Before calling the method, you need to set the profile
    // parameter of setAudioProfile to AUDIO_PROFILE_MUSIC_HIGH_QUALITY(4)
    // or AUDIO_PROFILE_MUSIC_HIGH_QUALITY_STEREO(5), and to set
    // scenario parameter to AUDIO_SCENARIO_GAME_STREAMING(3)
    await this._engine.setAudioProfile(
      AudioProfile.MusicHighQualityStereo,
      AudioScenario.GameStreaming
    );

    // make myself a broadcaster
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine?.setClientRole(ClientRole.Broadcaster);

    // disable video module
    await this._engine?.disableVideo();

    // Set audio route to speaker
    await this._engine.setDefaultAudioRoutetoSpeakerphone(true);
  };

  _addListeners = () => {
    this._engine?.addListener('Warning', (warningCode) => {
      console.info('Warning', warningCode);
    });
    this._engine?.addListener('Error', (errorCode) => {
      console.info('Error', errorCode);
    });
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      // RtcLocalView.SurfaceView must render after engine init and channel join
      this.setState({ isJoined: true });
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      // RtcLocalView.SurfaceView must render after engine init and channel join
      this.setState({ isJoined: false });
    });
  };

  _joinChannel = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    await this._engine?.joinChannel(
      config.token,
      this.state.channelId,
      null,
      config.uid
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
  };

  render() {
    const { channelId, isJoined, isBeautifierOnly } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ channelId: text })}
            placeholder={'Channel ID'}
            value={channelId}
          />
          <Item
            title={'setVoiceBeautifierPreset Only'}
            isShowSwitch
            onSwitchValueChange={(value) => {
              this.setState({ isBeautifierOnly: value });
            }}
          />
          <Button
            onPress={isJoined ? this._leaveChannel : this._joinChannel}
            title={`${isJoined ? 'Leave' : 'Join'} channel`}
          />
        </View>
        {isJoined && (
          <ScrollView>
            {isBeautifierOnly ? this._renderBeautifier() : this._renderOthers()}
          </ScrollView>
        )}
      </View>
    );
  }

  _renderBeautifier = () => {
    return (
      <View style={styles.container}>
        <PickerView
          alertTitle={'Select AudioEffectPreset:'}
          type={VoiceBeautifierPreset}
          onPress={(value: VoiceBeautifierPreset) => {
            this._voiceBeautifierPreset = value;
          }}
        />
        <Button
          title={'Set Voice Beautifier Preset'}
          onPress={() => {
            this._engine?.setVoiceBeautifierPreset(this._voiceBeautifierPreset);
          }}
        />
        <Text>{'param1'}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          onValueChange={(value) => {
            this._param1 = value;
          }}
        />
        <Text>{'param2'}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          onValueChange={(value) => {
            this._param2 = value;
          }}
        />
        <Button
          title={'Set Voice Beautifier Parameters'}
          onPress={() => {
            this._engine?.setVoiceBeautifierParameters(
              this._voiceBeautifierPreset,
              this._param1,
              this._param2
            );
          }}
        />
      </View>
    );
  };

  _renderOthers = () => {
    return (
      <View style={styles.container}>
        <View>
          <PickerView
            alertTitle={'Select AudioEffectPreset:'}
            type={AudioEffectPreset}
            onPress={(value: AudioEffectPreset) => {
              this._audioEffectPreset = value;
            }}
          />
          <Button
            title={'Set Audio Effect Preset'}
            onPress={() => {
              this._engine?.setAudioEffectPreset(this._audioEffectPreset);
            }}
          />
          <Text>{'param1'}</Text>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            onValueChange={(value) => {
              this._param1 = value;
            }}
          />
          <Text>{'param2'}</Text>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            onValueChange={(value) => {
              this._param2 = value;
            }}
          />
          <Button
            title={'Set Audio Effect Parameters'}
            onPress={() => {
              this._engine?.setAudioEffectParameters(
                this._audioEffectPreset,
                this._param1,
                this._param2
              );
            }}
          />
        </View>
        <View>
          <PickerView
            alertTitle={'Select AudioReverbType:'}
            type={AudioReverbType}
            onPress={(value: AudioReverbType) => {
              this._audioReverbType = value;
            }}
          />
          <Text>{'Select Local Voice Reverb Value:'}</Text>
          <Slider
            minimumValue={-20}
            maximumValue={10}
            step={1}
            onValueChange={(value) => {
              this._audioReverbValue = value;
            }}
          />
          <Button
            title={'Set Local Voice Reverb'}
            onPress={() => {
              this._engine?.setLocalVoiceReverb(
                this._audioReverbType,
                this._audioReverbValue
              );
            }}
          />
        </View>
        <View>
          <PickerView
            alertTitle={'Select AudioEqualizationBandFrequency:'}
            type={AudioEqualizationBandFrequency}
            onPress={(value: AudioEqualizationBandFrequency) => {
              this._audioEqualizationBandFrequency = value;
            }}
          />
          <Text>{'Select Local Voice Equalization Value:'}</Text>
          <Slider
            minimumValue={-15}
            maximumValue={15}
            step={1}
            onValueChange={(value) => {
              this._bandGain = value;
            }}
          />
          <Button
            title={'Set Local Voice Equalization'}
            onPress={() => {
              this._engine?.setLocalVoiceEqualization(
                this._audioEqualizationBandFrequency,
                this._bandGain
              );
            }}
          />
        </View>
        <View>
          <Text>{'Select Local Voice Pitch Value:'}</Text>
          <Slider
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            onValueChange={(value) => {
              this._localVoicePitch = value;
            }}
          />
          <Button
            title={'Set Local Voice Pitch'}
            onPress={() => {
              this._engine?.setLocalVoicePitch(this._localVoicePitch);
            }}
          />
        </View>
      </View>
    );
  };
}

const PickerView = ({
  alertTitle,
  type,
  onPress,
}: {
  alertTitle: string;
  type: any;
  onPress: Function;
}) => {
  const items = Object.values(type);
  const keys = items.filter((v) => typeof v === 'string') as string[];
  const values = items.filter((v) => typeof v === 'number') as number[];
  const [value, setValue] = useState(values[0]);
  return (
    <View>
      <Text>{alertTitle}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          setValue(itemValue);
          onPress(itemValue);
        }}
      >
        {keys.map((v, i) => (
          <Picker.Item key={i} label={v} value={values[i]} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
});
