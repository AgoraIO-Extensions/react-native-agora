import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  ExtensionContext,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import { AgoraButton, AgoraTextInput } from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseVideoComponentState {
  path: string;
  provider: string;
  extension: string;
  enableExtension: boolean;
}

export default class Extension
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
      path: '',
      provider: '',
      extension: '',
      enableExtension: false,
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
      logConfig: { filePath: Config.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone and camera permission
    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();
  }

  /**
   * Step 2-1: enableExtension
   */
  enableExtension = () => {
    const { path, provider, extension } = this.state;
    if (!path) {
      this.error('path is invalid');
      return;
    }
    if (!provider) {
      this.error('provider is invalid');
      return;
    }
    if (!extension) {
      this.error('extension is invalid');
      return;
    }

    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider(path);
    }

    let result = this.engine?.enableExtension(provider, extension, true);
    if (result && result < 0) {
      this.error(`enableExtension failed: ${result}`);
    }
  };

  /**
   * Step 2-2: disableExtension
   */
  disableExtension = () => {
    const { provider, extension } = this.state;
    let result = this.engine?.enableExtension(provider, extension, false);
    if (result && result < 0) {
      this.error(`enableExtension failed: ${result}`);
    }
  };

  /**
   * Step 3: joinChannel
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

  onExtensionErrorWithContext(
    context: ExtensionContext,
    error: number,
    msg: string
  ) {
    this.error(
      'onExtensionErrorWithContext',
      'context',
      context,
      'error',
      error,
      'msg',
      msg
    );
  }

  onExtensionEventWithContext(
    context: ExtensionContext,
    key: string,
    value: string
  ) {
    this.info(
      'onExtensionEventWithContext',
      'context',
      context,
      'key',
      key,
      'value',
      value
    );
  }

  onExtensionStartedWithContext(context: ExtensionContext) {
    this.info('onExtensionStartedWithContext', 'context', context);
    if (
      context.providerName === this.state.provider &&
      context.extensionName === this.state.extension
    ) {
      this.setState({ enableExtension: true });
    }
  }

  onExtensionStoppedWithContext(context: ExtensionContext) {
    this.info('onExtensionStoppedWithContext', 'context', context);
    if (
      context.providerName === this.state.provider &&
      context.extensionName === this.state.extension
    ) {
      this.setState({ enableExtension: false });
    }
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { path, provider, extension } = this.state;
    return (
      <>
        {Platform.OS === 'android' ? (
          <AgoraTextInput
            onChangeText={(text) => {
              this.setState({
                path: text,
              });
            }}
            placeholder={'path'}
            value={path}
          />
        ) : undefined}
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({
              provider: text,
            });
          }}
          placeholder={'provider'}
          value={provider}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({
              extension: text,
            });
          }}
          placeholder={'extension'}
          value={extension}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { enableExtension } = this.state;
    return (
      <>
        <AgoraButton
          title={`${enableExtension ? 'disable' : 'enable'} Extension`}
          onPress={
            enableExtension ? this.disableExtension : this.enableExtension
          }
        />
      </>
    );
  }
}
