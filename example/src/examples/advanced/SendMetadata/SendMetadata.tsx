import React from 'react';
import { Alert, PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IMetadataObserver,
  IRtcEngineEventHandler,
  Metadata,
  MetadataType,
  VideoSourceType,
} from 'react-native-agora-rtc-ng';
import { Buffer } from 'buffer';

import {
  BaseComponent,
  BaseVideoComponentState,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';

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

    this.registerMediaMetadataObserver();
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
      console.error('metadataBuffer is invalid');
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
    this.engine?.release();
  }

  onMetadataReceived(metadata: Metadata) {
    this.info('onMetadataReceived', 'metadata', metadata);
    Alert.alert(
      `Receive from uid:${metadata.uid}`,
      `${metadata.buffer?.toString()}`,
      [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]
    );
  }

  protected renderBottom(): React.ReactNode {
    const { metadataBuffer } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ metadataBuffer: text });
          }}
          placeholder={`metadataBuffer`}
          placeholderTextColor={'gray'}
          value={metadataBuffer}
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess } = this.state;
    return (
      <>
        <ActionItem
          disabled={!joinChannelSuccess}
          title={`send Metadata`}
          onPress={this.sendMetaData}
        />
      </>
    );
  }
}
