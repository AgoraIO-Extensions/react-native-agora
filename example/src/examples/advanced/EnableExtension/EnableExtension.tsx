import React from 'react';
import { PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  provider: string;
  extension: string;
  enableExtension: boolean;
}

export default class EnableExtension
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
      provider: 'agora_segmentation',
      extension: 'PortraitSegmentation',
      enableExtension: false,
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

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();
  }

  /**
   * Step 2-1: enableExtension
   */
  enableExtension = () => {
    const { provider, extension } = this.state;
    if (!provider) {
      console.error('provider is invalid');
      return;
    }
    if (!extension) {
      console.error('extension is invalid');
      return;
    }

    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider(`${provider}_extension`);
    }
    this.engine?.enableExtension(provider, extension, true);
    this.setState({ enableExtension: true });
  };

  /**
   * Step 2-2: disableExtension
   */
  disableExtension = () => {
    const { provider, extension } = this.state;
    this.engine?.enableExtension(provider, extension, false);
    this.setState({ enableExtension: false });
  };

  /**
   * Step 3: joinChannel
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

  onExtensionErrored(
    provider: string,
    extName: string,
    error: number,
    msg: string
  ) {
    this.error(
      'onExtensionErrored',
      'provider',
      provider,
      'extName',
      extName,
      'error',
      error,
      'msg',
      msg
    );
  }

  onExtensionEvent(
    provider: string,
    extName: string,
    key: string,
    value: string
  ) {
    this.info(
      'onExtensionEvent',
      'provider',
      provider,
      'extName',
      extName,
      'key',
      key,
      'value',
      value
    );
  }

  onExtensionStarted(provider: string, extName: string) {
    this.info('onExtensionStarted', 'provider', provider, 'extName', extName);
    this.setState({ enableExtension: true });
  }

  onExtensionStopped(provider: string, extName: string) {
    this.info('onExtensionStopped', 'provider', provider, 'extName', extName);
    this.setState({ enableExtension: false });
  }

  protected renderBottom(): React.ReactNode {
    const { provider, extension } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({
              provider: text,
            });
          }}
          placeholder={'provider'}
          placeholderTextColor={'gray'}
          value={provider}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({
              extension: text,
            });
          }}
          placeholder={'extension'}
          placeholderTextColor={'gray'}
          value={extension}
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess, enableExtension } = this.state;
    return (
      <>
        <ActionItem
          disabled={joinChannelSuccess}
          title={`${enableExtension ? 'disable' : 'enable'} Encryption`}
          onPress={
            enableExtension ? this.disableExtension : this.enableExtension
          }
        />
      </>
    );
  }
}
