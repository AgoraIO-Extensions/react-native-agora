import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
} from 'react-native-agora-rtc-ng';
import { Buffer } from 'buffer';

import {
  BaseAudioComponentState,
  BaseComponent,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseAudioComponentState {
  syncWithAudio: boolean;
  ordered: boolean;
  streamId?: number;
  data: string;
}

export default class StreamMessage
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
      syncWithAudio: false,
      ordered: false,
      streamId: undefined,
      data: '',
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
      // Need granted the microphone permission
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
    }

    // Only need to enable audio on this case
    this.engine.enableAudio();
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
   * Step 3-1: createDataStream
   */
  createDataStream = () => {
    const { syncWithAudio, ordered, streamId } = this.state;
    if (streamId === undefined) {
      this.setState({
        streamId: this.engine?.createDataStream({
          syncWithAudio,
          ordered,
        }),
      });
    }
  };

  /**
   * Step 3-2: sendStreamMessage
   */
  sendStreamMessage = () => {
    const { streamId, data } = this.state;
    if (!data) {
      console.error('data is invalid');
      return;
    }

    const buffer = Buffer.from(data);
    this.engine?.sendStreamMessage(streamId!, buffer, buffer.length);
    this.setState({ data: '' });
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

  onStreamMessage(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    data: Uint8Array,
    length: number,
    sentTs: number
  ) {
    this.info(
      'onStreamMessage',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'streamId',
      streamId,
      'data',
      data,
      'length',
      length,
      'sentTs',
      sentTs
    );
    Alert.alert(
      `Receive from uid:${remoteUid}`,
      `StreamId ${streamId}: ${data.toString()}`,
      [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]
    );
  }

  onStreamMessageError(
    connection: RtcConnection,
    remoteUid: number,
    streamId: number,
    code: number,
    missed: number,
    cached: number
  ) {
    this.error(
      'onStreamMessageError',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'streamId',
      streamId,
      'code',
      code,
      'missed',
      missed,
      'cached',
      cached
    );
  }

  protected renderBottom(): React.ReactNode {
    const { syncWithAudio, ordered, streamId, data } = this.state;
    return (
      <>
        <ActionItem
          disabled={streamId !== undefined}
          title={`syncWithAudio`}
          isShowSwitch={true}
          switchValue={syncWithAudio}
          onSwitchValueChange={(value) => {
            this.setState({ syncWithAudio: value });
          }}
        />
        <Divider />
        <ActionItem
          disabled={streamId !== undefined}
          title={`ordered`}
          isShowSwitch={true}
          switchValue={ordered}
          onSwitchValueChange={(value) => {
            this.setState({ ordered: value });
          }}
        />
        <Divider />
        <Text>{`streamId: ${streamId}`}</Text>
        <Divider />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ data: text });
          }}
          placeholder={`data`}
          placeholderTextColor={'gray'}
          value={data}
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { joinChannelSuccess, streamId } = this.state;
    return (
      <>
        <ActionItem
          disabled={!joinChannelSuccess}
          title={`create Data Stream`}
          onPress={this.createDataStream}
        />
        <ActionItem
          disabled={streamId === undefined}
          title={`send Stream Message`}
          onPress={this.sendStreamMessage}
        />
      </>
    );
  }
}
