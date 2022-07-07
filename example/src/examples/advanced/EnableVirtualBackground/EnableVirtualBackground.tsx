import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  BackgroundBlurDegree,
  BackgroundSourceType,
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora-rtc-ng';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import {
  BaseComponent,
  BaseVideoComponentState,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { PickerView } from '../../../components/PickerView';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  background_source_type: BackgroundSourceType;
  color: number;
  source: string;
  blur_degree: BackgroundBlurDegree;
  enableVirtualBackground: boolean;
}

export default class EnableVirtualBackground
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: true,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      startPreview: false,
      background_source_type: BackgroundSourceType.BackgroundColor,
      color: 0xffffff,
      source: this.getAssetPath('agora-logo.png'),
      blur_degree: BackgroundBlurDegree.BlurDegreeMedium,
      enableVirtualBackground: false,
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
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_segmentation_extension');
    }
    this.engine?.enableExtension(
      'agora_segmentation',
      'PortraitSegmentation',
      true
    );

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // This case works if startPreview without joinChannel
    this.engine.startPreview();
    this.setState({ startPreview: true });
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
    this.engine?.joinChannelWithOptions(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1: enableVirtualBackground
   */
  enableVirtualBackground = async () => {
    const { background_source_type, color, source, blur_degree } = this.state;
    if (
      background_source_type === BackgroundSourceType.BackgroundImg &&
      !source
    ) {
      console.error('source is invalid');
      return;
    }

    this.engine?.enableVirtualBackground(true, {
      background_source_type,
      color,
      source: await this.getAbsolutePath(source),
      blur_degree,
    });
    this.setState({ enableVirtualBackground: true });
  };

  /**
   * Step 3-2: disableVirtualBackground
   */
  disableVirtualBackground = () => {
    this.engine?.enableVirtualBackground(false, {});
    this.setState({ enableVirtualBackground: false });
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
    const { background_source_type, color, source, blur_degree } = this.state;
    return (
      <>
        <View style={styles.container}>
          <PickerView
            title={'backgroundSourceType'}
            type={BackgroundSourceType}
            selectedValue={background_source_type}
            onValueChange={(value) => {
              this.setState({ background_source_type: value });
            }}
          />
        </View>
        {background_source_type === BackgroundSourceType.BackgroundColor ? (
          <ColorPicker
            style={styles.picker}
            onColorChange={(selectedColor) => {
              this.setState({
                color: +fromHsv(selectedColor).replace('#', '0x'),
              });
            }}
            color={`#${color?.toString(16)}`}
          />
        ) : undefined}
        <TextInput
          editable={
            background_source_type === BackgroundSourceType.BackgroundImg
          }
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({
              source: text,
            });
          }}
          placeholder={'source'}
          placeholderTextColor={'gray'}
          value={source}
        />
        <View style={styles.container}>
          <PickerView
            enabled={
              background_source_type === BackgroundSourceType.BackgroundBlur
            }
            title={'blurDegree'}
            type={BackgroundBlurDegree}
            selectedValue={blur_degree}
            onValueChange={(value) => {
              this.setState({ blur_degree: value });
            }}
          />
        </View>
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { startPreview, joinChannelSuccess, enableVirtualBackground } =
      this.state;
    return (
      <>
        <ActionItem
          disabled={!(startPreview || joinChannelSuccess)}
          title={`${
            enableVirtualBackground ? 'disable' : 'enable'
          } Virtual Background`}
          onPress={
            enableVirtualBackground
              ? this.disableVirtualBackground
              : this.enableVirtualBackground
          }
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 200,
  },
});
