import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  EncryptionErrorType,
  EncryptionMode,
  IRtcEngineEventHandler,
  RtcConnection,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { PickerView } from '../../../components/PickerView';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  encryptionMode: EncryptionMode;
  encryptionKey: string;
  encryptionKdfSalt: number[];
  enableEncryption: boolean;
}

export default class EnableEncryption
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
      encryptionMode: EncryptionMode.Aes128Xts,
      encryptionKey: '',
      encryptionKdfSalt: [],
      enableEncryption: false,
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
   * Step 3-1: enableEncryption
   */
  enableEncryption = () => {
    const { encryptionMode, encryptionKey, encryptionKdfSalt } = this.state;
    if (!encryptionKey) {
      console.error('encryptionKey is invalid');
      return;
    }

    this.engine?.enableEncryption(true, {
      encryptionMode,
      encryptionKey,
      encryptionKdfSalt,
    });
    this.setState({ enableEncryption: true });
  };

  /**
   * Step 3-2: disableEncryption
   */
  disableEncryption = () => {
    this.engine?.enableEncryption(false, {});
    this.setState({ enableEncryption: false });
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

  onEncryptionError(connection: RtcConnection, errorType: EncryptionErrorType) {
    this.error(
      'onEncryptionError',
      'connection',
      connection,
      'errorType',
      errorType
    );
  }

  protected renderBottom(): React.ReactNode {
    const { encryptionMode, encryptionKey, encryptionKdfSalt } = this.state;
    return (
      <>
        <View style={styles.container}>
          <PickerView
            title={'encryptionMode'}
            type={EncryptionMode}
            selectedValue={encryptionMode}
            onValueChange={(value) => {
              this.setState({ encryptionMode: value });
            }}
          />
        </View>
        <Divider />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ encryptionKey: text });
          }}
          placeholder={'encryptionKey'}
          placeholderTextColor={'gray'}
          value={encryptionKey}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({
              encryptionKdfSalt: text.split(' ').map((value) => +value),
            });
          }}
          keyboardType={'numeric'}
          placeholder={'encryptionKdfSalt (split by blank)'}
          placeholderTextColor={'gray'}
          value={encryptionKdfSalt.join(' ')}
        />
        <Text>{`encryptionKdfSaltLength: ${encryptionKdfSalt.length}`}</Text>
        <Divider />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess, enableEncryption } = this.state;
    return (
      <>
        <ActionItem
          disabled={joinChannelSuccess}
          title={`${enableEncryption ? 'disable' : 'enable'} Encryption`}
          onPress={
            enableEncryption ? this.disableEncryption : this.enableEncryption
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
});
