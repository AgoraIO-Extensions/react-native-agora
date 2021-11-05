import React, { Component, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
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
import VoiceChangeConfig, {
  FreqOptions,
  ReverbKeyOptions,
} from './VoiceChangerConfig';

const config = require('../../../config/agora.config.json');

interface State {
  channelId?: string;
  isJoin: boolean;
  remoteUids: Array<number>;
  uidMySelf?: number;
  selectedVoiceToolBtn?: number;
  isEnableSlider1: boolean;
  isEnableSlider2: boolean;
  sliderTitle1?: string;
  sliderTitle2?: string;
  minimumValue1?: number;
  maximumValue1?: number;
  minimumValue2?: number;
  maximumValue2?: number;
  sliderValue1?: number;
  sliderValue2?: number;
  currentAudioEffectPreset?: AudioEffectPreset;
  selectedFreq: { text: string; type: AudioEqualizationBandFrequency };
  selectedReverbKey: {
    text: string;
    type: AudioReverbType;
    min: number;
    max: number;
  };
  bandGainValue: number;
  reverbValue?: number;
}

export default class VoiceChanger extends Component<{}, State, any> {
  _engine?: RtcEngine;

  constructor(props: {}) {
    super(props);
    this.state = {
      isJoin: false,
      remoteUids: [],
      isEnableSlider1: false,
      isEnableSlider2: false,
      selectedFreq: FreqOptions[0],
      selectedReverbKey: ReverbKeyOptions[0],
      bandGainValue: 0,
    };
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
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

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    await this._engine.joinChannel(
      config.token,
      config.channelId,
      null,
      0,
      undefined
    );
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
      this.setState({ isJoin: true, uidMySelf: uid });
    });
    this._engine?.addListener('UserJoined', async (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);

      this.setState({ remoteUids: [...this.state.remoteUids, uid] });
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      this.setState({
        remoteUids: this.state.remoteUids.filter((value) => value !== uid),
      });
    });
  };

  onPressBFButtonn = async (
    type: VoiceBeautifierPreset | AudioEffectPreset,
    index: number
  ) => {
    switch (index) {
      case 0:
      case 1:
        await this._engine?.setVoiceBeautifierPreset(
          type as VoiceBeautifierPreset
        );
        this.updateSliderUI(AudioEffectPreset.AudioEffectOff);
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        await this._engine?.setAudioEffectPreset(type as AudioEffectPreset);
        this.updateSliderUI(type as AudioEffectPreset);
        break;
      default:
        break;
    }
  };

  updateSliderUI = (type: AudioEffectPreset) => {
    this.setState({ currentAudioEffectPreset: type });
    switch (type) {
      case AudioEffectPreset.RoomAcoustics3DVoice:
        this.setState({
          isEnableSlider1: true,
          isEnableSlider2: false,
          sliderTitle1: 'Cycle',
          minimumValue1: 1,
          maximumValue1: 3,
        });
        break;
      case AudioEffectPreset.PitchCorrection:
        this.setState({
          isEnableSlider1: true,
          isEnableSlider2: true,
          sliderTitle1: 'Tonic Mode',
          sliderTitle2: 'Tonic Pitch',
          minimumValue1: 1,
          maximumValue1: 3,
          minimumValue2: 1,
          maximumValue2: 12,
        });
        break;
      default:
        this.setState({
          isEnableSlider1: false,
          isEnableSlider2: false,
        });
        break;
    }
  };
  onAudioEffectUpdate = ({
    value1,
    value2,
  }: {
    value1?: number;
    value2?: number;
  }) => {
    this.setState(
      {
        sliderValue1: value1 ? value1 : this.state.sliderValue1,
        sliderValue2: value2 ? value2 : this.state.sliderValue2,
      },
      async () => {
        const {
          isEnableSlider1,
          isEnableSlider2,
          sliderValue1,
          sliderValue2,
          minimumValue1,
          minimumValue2,
          currentAudioEffectPreset,
        } = this.state;
        await this._engine?.setAudioEffectParameters(
          currentAudioEffectPreset!,
          isEnableSlider1 ? sliderValue1 ?? minimumValue1! : 0,
          isEnableSlider2 ? sliderValue2 ?? minimumValue2! : 0
        );
      }
    );
  };
  onPressChangeFreq = () => {
    Alert.alert(
      'Set Band Frequency',
      undefined,
      FreqOptions.map((selectedFreq) => ({
        text: selectedFreq.text,
        onPress: () => {
          this.setState({ selectedFreq }, async () => {
            await this._engine?.setLocalVoiceEqualization(
              this.state.selectedFreq.type,
              this.state.bandGainValue
            );
          });
        },
      }))
    );
  };
  onPressChangeReverbKey = () => {
    Alert.alert(
      'Set Reverb Key',
      undefined,
      ReverbKeyOptions.map((selectedReverbKey) => ({
        text: selectedReverbKey.text,
        onPress: async () => {
          this.setState({ selectedReverbKey });
        },
      }))
    );
  };
  keyExtractor = (_item: any, index: number) => `${_item}${index}`;

  render() {
    const { isJoin } = this.state;

    return (
      <View style={styles.container}>
        {!isJoin && <Button onPress={this._initEngine} title="Join channel" />}
        {isJoin && this._renderUserUid()}
        {isJoin && this._renderToolContainer()}
      </View>
    );
  }

  _renderUserUid = () => {
    const { remoteUids, uidMySelf } = this.state;
    return (
      <FlatList
        data={[uidMySelf!, ...remoteUids]}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  };
  renderItem = ({ item, index }: { item: number; index: number }) => {
    return (
      <View style={styles.listItem}>
        <Text>
          {`AUDIO ONLY ${index ? 'REMOTE' : 'LOCAL'} UID: `}
          <Text style={styles.boldTxt}>{item}</Text>
        </Text>
      </View>
    );
  };
  _renderToolContainer = () => {
    const {
      selectedVoiceToolBtn,
      isEnableSlider1,
      isEnableSlider2,
      sliderTitle1,
      sliderTitle2,
      minimumValue1,
      maximumValue1,
      minimumValue2,
      maximumValue2,
      selectedFreq,
      selectedReverbKey,
    } = this.state;
    return (
      <View style={styles.toolContainer}>
        <Text style={styles.boldTxt}>Voice Beautifier & Effects Preset</Text>
        <View style={styles.voiceToolContainer}>
          {VoiceChangeConfig.map(({ alertTitle, options }, index) => (
            <CusBtn
              key={alertTitle}
              isOff={selectedVoiceToolBtn !== index}
              alertTitle={alertTitle}
              options={options}
              onPress={(type: VoiceBeautifierPreset | AudioEffectPreset) => {
                this.setState({ selectedVoiceToolBtn: index });
                this.onPressBFButtonn(type, index);
              }}
            />
          ))}
        </View>
        <View>
          {isEnableSlider1 && (
            <View>
              <Text>{sliderTitle1}</Text>
              <Slider
                minimumValue={minimumValue1}
                maximumValue={maximumValue1}
                onValueChange={(value1) => this.onAudioEffectUpdate({ value1 })}
              />
            </View>
          )}
          {isEnableSlider2 && (
            <View>
              <Text>{sliderTitle2}</Text>
              <Slider
                minimumValue={minimumValue2}
                maximumValue={maximumValue2}
                onValueChange={(value2) => this.onAudioEffectUpdate({ value2 })}
              />
            </View>
          )}
        </View>
        <Text style={styles.boldTxt}>Voice Beautifier & Effects Preset</Text>
        <View>
          <View style={styles.customToolItem}>
            <Text>Pitch</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2}
              onValueChange={async (value) => {
                await this._engine?.setLocalVoicePitch(value);
              }}
            />
          </View>
          <View style={styles.customToolItem}>
            <Text>BandFreq</Text>
            <Button
              title={selectedFreq.text}
              onPress={this.onPressChangeFreq}
            />
          </View>
          <View style={styles.customToolItem}>
            <Text>BandGain</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={9}
              onValueChange={(bandGainValue) => {
                this.setState({ bandGainValue }, async () => {
                  await this._engine?.setLocalVoiceEqualization(
                    this.state.selectedFreq.type,
                    this.state.bandGainValue
                  );
                });
              }}
            />
          </View>
          <View style={styles.customToolItem}>
            <Text>ReverbKey</Text>
            <Button
              title={selectedReverbKey.text}
              onPress={this.onPressChangeReverbKey}
            />
          </View>
          <View style={styles.customToolItem}>
            <Text>ReverbValue</Text>
            <Slider
              style={styles.slider}
              minimumValue={selectedReverbKey.min}
              maximumValue={selectedReverbKey.max}
              onValueChange={(reverbValue) => {
                this.setState({ reverbValue }, async () => {
                  await this._engine?.setLocalVoiceReverb(
                    this.state.selectedReverbKey.type,
                    this.state.reverbValue!
                  );
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  };
}

const CusBtn = ({
  isOff = true,
  alertTitle,
  options,
  onPress,
}: {
  isOff: boolean;
  alertTitle: string;
  options: Array<{
    text: string;
    type: VoiceBeautifierPreset | AudioEffectPreset;
  }>;
  onPress: Function;
}) => {
  const [isEnable, setIsEnable] = useState(!isOff);
  const [title, setTitle] = useState('Off');
  useEffect(() => {
    setIsEnable(!isOff);
  }, [isOff]);

  const customOnPress = () => {
    Alert.alert(
      alertTitle,
      undefined,
      options.map(({ text, type }) => ({
        text,
        onPress: () => {
          setIsEnable(true);
          setTitle(text);
          onPress && onPress(type);
        },
      }))
    );
  };
  return <Button title={isEnable ? title : 'Off'} onPress={customOnPress} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  toolBarTitle: {
    marginTop: 48,
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldTxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  listItem: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  toolContainer: {
    flex: 5,
    paddingHorizontal: 16,
  },
  voiceToolContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slider: {
    width: '50%',
  },
  customToolItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});
