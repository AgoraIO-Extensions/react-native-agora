import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora';
import * as RawData from 'react-native-agora-rawdata';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import { AgoraButton } from '../../../components/ui';

interface State extends BaseVideoComponentState {
  enablePlugin: boolean;
}

export default class ProcessVideoRawData
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
      enablePlugin: false,
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
    this.enablePlugin();
    this.engine.registerEventHandler(this);

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // Start preview before joinChannel
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
   * Step 3: enablePlugin
   */
  enablePlugin = () => {
    RawData.createPlugin(this.engine?.getNativeHandle()!);
    RawData.enablePlugin();
    this.setState({ enablePlugin: true });
  };

  /**
   * Step 4: disablePlugin
   */
  disablePlugin = () => {
    RawData.disablePlugin();
    RawData.destroyPlugin();
    this.setState({ enablePlugin: false });
  };

  /**
   * Step 5: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel();
  }

  /**
   * Step 6: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.disablePlugin();
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  protected renderAction(): React.ReactNode {
    const { enablePlugin } = this.state;
    return (
      <>
        <AgoraButton
          title={`${enablePlugin ? 'disable' : 'enable'} Plugin`}
          onPress={enablePlugin ? this.disablePlugin : this.enablePlugin}
        />
      </>
    );
  }
}
