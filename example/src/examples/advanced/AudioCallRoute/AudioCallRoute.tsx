import React, { ReactElement } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import { AgoraDivider, AgoraSwitch } from '../../../components/ui';
import Config from '../../../config/agora.config';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseAudioComponentState {
  defaultToSpeaker: boolean;
  speakerOn: boolean;
}

export default class AudioCallRoute
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
      defaultToSpeaker: false,
      speakerOn: false,
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

    // Need granted the microphone permission
    await askMediaAccess(['android.permission.RECORD_AUDIO']);

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
   * Step 3-1: setDefaultAudioRouteToSpeakerphone
   */
  protected setDefaultAudioRouteToSpeakerphone() {
    const { defaultToSpeaker } = this.state;
    this.engine?.setDefaultAudioRouteToSpeakerphone(!defaultToSpeaker);
    this.setState({
      defaultToSpeaker: !defaultToSpeaker,
    });
  }

  /**
   * Step 3-2: setEnableSpeakerphone
   */
  protected setEnableSpeakerphone() {
    const { speakerOn } = this.state;
    this.engine?.setEnableSpeakerphone(!speakerOn);
    this.setState({
      speakerOn: !speakerOn,
    });
  }

  onAudioRoutingChanged(routing: number): void {
    this.info('onAudioRoutingChanged', 'routing', routing);
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

  protected renderConfiguration(): ReactElement | undefined {
    const { defaultToSpeaker, speakerOn, joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraSwitch
          title={'setDefaultAudioRouteToSpeakerphone'}
          disabled={joinChannelSuccess}
          value={defaultToSpeaker}
          onValueChange={() => {
            this.setDefaultAudioRouteToSpeakerphone();
          }}
        />
        <AgoraDivider />
        <AgoraSwitch
          title={'setEnableSpeakerphone'}
          value={speakerOn}
          disabled={!joinChannelSuccess}
          onValueChange={() => {
            this.setEnableSpeakerphone();
          }}
        />
        <AgoraDivider />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    // const { startAudioMixing, pauseAudioMixing } = this.state;
    return <></>;
  }
}
