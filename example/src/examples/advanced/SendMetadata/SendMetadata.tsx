import { Buffer } from 'buffer';

import React, { ReactElement } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  IMetadataObserver,
  IRtcEngineEventHandler,
  Metadata,
  MetadataType,
  VideoSourceType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import { AgoraButton, AgoraTextInput } from '../../../components/ui';
import Config from '../../../config/agora.config';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  metadataBuffer: string;
}

export default class SendMetadata
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IMetadataObserver
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
      metadataBuffer: '',
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

    this.registerMediaMetadataObserver();
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
   * Step 3-1: registerMediaMetadataObserver
   */
  registerMediaMetadataObserver = () => {
    this.engine?.registerMediaMetadataObserver(
      this,
      MetadataType.VideoMetadata
    );
  };

  /**
   * Step 3-2: sendMetaData
   */
  sendMetaData = () => {
    const { metadataBuffer } = this.state;
    if (!metadataBuffer) {
      this.error('metadataBuffer is invalid');
      return;
    }

    const buffer = Buffer.from(metadataBuffer);
    this.engine?.sendMetaData(
      {
        buffer: buffer,
        size: buffer.length,
      },
      VideoSourceType.VideoSourceCamera
    );
    this.setState({ metadataBuffer: '' });
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

  onMetadataReceived(metadata: Metadata) {
    this.info('onMetadataReceived', 'metadata', metadata);
    this.alert(
      `Receive from uid:${metadata.uid}`,
      `${metadata.buffer?.toString()}`
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { metadataBuffer } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ metadataBuffer: text });
          }}
          placeholder={`metadataBuffer`}
          value={metadataBuffer}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`send Metadata`}
          onPress={this.sendMetaData}
        />
      </>
    );
  }
}
