import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  BackgroundBlurDegree,
  BackgroundSourceType,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDropdown,
  AgoraStyle,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { enumToItems, getAbsolutePath, getAssetPath } from '../../../utils';

interface State extends BaseVideoComponentState {
  background_source_type: BackgroundSourceType;
  color: number;
  source: string;
  blur_degree: BackgroundBlurDegree;
  enableVirtualBackground: boolean;
}

export default class VirtualBackground
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
      source: getAssetPath('agora-logo.png'),
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
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_segmentation_extension');
    }
    this.engine?.enableExtension(
      'agora_video_filters_segmentation',
      'portrait_segmentation',
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
   * Step 3-1: enableVirtualBackground
   */
  enableVirtualBackground = async () => {
    const { background_source_type, color, source, blur_degree } = this.state;
    if (
      background_source_type === BackgroundSourceType.BackgroundImg &&
      !source
    ) {
      this.error('source is invalid');
      return;
    }

    this.engine?.enableVirtualBackground(
      true,
      {
        background_source_type,
        color,
        source: await getAbsolutePath(source),
        blur_degree,
      },
      {}
    );
    this.setState({ enableVirtualBackground: true });
  };

  /**
   * Step 3-2: disableVirtualBackground
   */
  disableVirtualBackground = () => {
    this.engine?.enableVirtualBackground(false, {}, {});
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
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  protected renderConfiguration(): React.ReactNode {
    const { background_source_type, color, source, blur_degree } = this.state;
    return (
      <>
        <AgoraDropdown
          title={'backgroundSourceType'}
          items={enumToItems(BackgroundSourceType)}
          value={background_source_type}
          onValueChange={(value) => {
            this.setState({ background_source_type: value });
          }}
        />
        {background_source_type === BackgroundSourceType.BackgroundColor ? (
          <ColorPicker
            style={AgoraStyle.picker}
            onColorChange={(selectedColor) => {
              this.setState({
                color: +fromHsv(selectedColor).replace('#', '0x'),
              });
            }}
            color={`#${color?.toString(16)}`}
          />
        ) : undefined}
        <AgoraTextInput
          editable={
            background_source_type === BackgroundSourceType.BackgroundImg
          }
          onChangeText={(text) => {
            this.setState({
              source: text,
            });
          }}
          placeholder={'source'}
          value={source}
        />
        <AgoraDropdown
          enabled={
            background_source_type === BackgroundSourceType.BackgroundBlur
          }
          title={'blurDegree'}
          items={enumToItems(BackgroundBlurDegree)}
          value={blur_degree}
          onValueChange={(value) => {
            this.setState({ blur_degree: value });
          }}
        />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { startPreview, joinChannelSuccess, enableVirtualBackground } =
      this.state;
    return (
      <>
        <AgoraButton
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
