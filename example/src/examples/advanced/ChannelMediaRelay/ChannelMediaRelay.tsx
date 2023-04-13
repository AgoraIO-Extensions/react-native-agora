import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ChannelMediaRelayState,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import { AgoraButton, AgoraText, AgoraTextInput } from '../../../components/ui';
import Config from '../../../config/agora.config';

interface State extends BaseVideoComponentState {
  destChannelNames: string[];
  startChannelMediaRelay: boolean;
  pauseAllChannelMediaRelay: boolean;
}

export default class ChannelMediaRelay
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
      destChannelNames: [],
      startChannelMediaRelay: false,
      pauseAllChannelMediaRelay: false,
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

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();
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
   * Step 3-1: startChannelMediaRelay
   */
  startChannelMediaRelay = () => {
    const { channelId, token, uid, destChannelNames } = this.state;
    if (destChannelNames.length <= 0) {
      this.error('destChannelNames is invalid');
      return;
    }

    this.engine?.startChannelMediaRelay({
      // Configure src info
      // Set channel name defaults to current
      // Set uid defaults to local
      srcInfo: { channelName: channelId, uid, token },
      // Configure dest infos
      destInfos: destChannelNames.map((value) => {
        return {
          channelName: value,
          uid: 0,
          token: '',
        };
      }),
      destCount: destChannelNames.length,
    });
  };

  /**
   * Step 3-2 (Optional): updateChannelMediaRelay
   */
  updateChannelMediaRelay = () => {
    const { channelId, token, uid, destChannelNames } = this.state;
    if (destChannelNames.length <= 0) {
      this.error('destChannelNames is invalid');
      return;
    }

    this.engine?.updateChannelMediaRelay({
      // Configure src info
      // Set channel name defaults to current
      // Set uid defaults to local
      srcInfo: { channelName: channelId, uid, token },
      // Configure dest infos
      destInfos: destChannelNames.map((value) => {
        return {
          channelName: value,
          uid: 0,
          token: '',
        };
      }),
      destCount: destChannelNames.length,
    });
  };

  /**
   * Step 3-3 (Optional): pauseAllChannelMediaRelay
   */
  pauseAllChannelMediaRelay = () => {
    this.engine?.pauseAllChannelMediaRelay();
    this.setState({ pauseAllChannelMediaRelay: true });
  };

  /**
   * Step 3-4 (Optional): resumeAllChannelMediaRelay
   */
  resumeAllChannelMediaRelay = () => {
    this.engine?.resumeAllChannelMediaRelay();
    this.setState({ pauseAllChannelMediaRelay: false });
  };

  /**
   * Step 3-5: stopChannelMediaRelay
   */
  stopChannelMediaRelay = () => {
    this.engine?.stopChannelMediaRelay();
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

  onChannelMediaRelayStateChanged(
    state: ChannelMediaRelayState,
    code: ChannelMediaRelayError
  ) {
    this.info('onChannelMediaRelayStateChanged', 'state', state, 'code', code);
    switch (state) {
      case ChannelMediaRelayState.RelayStateIdle:
        this.setState({ startChannelMediaRelay: false });
        break;
      case ChannelMediaRelayState.RelayStateConnecting:
        break;
      case ChannelMediaRelayState.RelayStateRunning:
        this.setState({
          startChannelMediaRelay: true,
          pauseAllChannelMediaRelay: false,
        });
        break;
      case ChannelMediaRelayState.RelayStateFailure:
        this.setState({ startChannelMediaRelay: false });
        break;
    }
  }

  onChannelMediaRelayEvent(code: ChannelMediaRelayEvent) {
    this.info('onChannelMediaRelayEvent', 'code', code);
  }

  protected renderConfiguration(): React.ReactNode {
    const { destChannelNames } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ destChannelNames: text.split(' ') });
          }}
          placeholder={'destChannelNames (split by blank)'}
          value={destChannelNames.join(' ')}
        />
        <AgoraText>{`destCount: ${destChannelNames.length}`}</AgoraText>
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const {
      joinChannelSuccess,
      startChannelMediaRelay,
      pauseAllChannelMediaRelay,
    } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`${
            startChannelMediaRelay ? 'stop' : 'start'
          } Channel Media Relay`}
          onPress={
            startChannelMediaRelay
              ? this.stopChannelMediaRelay
              : this.startChannelMediaRelay
          }
        />
        <AgoraButton
          disabled={!startChannelMediaRelay}
          title={`updateChannelMediaRelay`}
          onPress={this.updateChannelMediaRelay}
        />
        <AgoraButton
          disabled={!startChannelMediaRelay}
          title={`${
            pauseAllChannelMediaRelay ? 'resume' : 'pause'
          } All Channel Media Relay`}
          onPress={
            pauseAllChannelMediaRelay
              ? this.resumeAllChannelMediaRelay
              : this.pauseAllChannelMediaRelay
          }
        />
      </>
    );
  }
}
