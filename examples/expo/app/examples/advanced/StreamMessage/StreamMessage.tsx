import { Buffer } from 'buffer';

import React, { ReactElement } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  RtcConnection,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraSwitch,
  AgoraText,
  AgoraTextInput,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { askMediaAccess } from '../../../../src/utils/permissions';

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
      this.error('data is invalid');
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
    this.engine?.unregisterEventHandler(this);
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
    this.alert(
      `Receive from uid:${remoteUid}`,
      `StreamId ${streamId}: ${data.toString()}`
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

  protected renderConfiguration(): ReactElement | undefined {
    const { syncWithAudio, ordered, streamId, data } = this.state;
    return (
      <>
        <AgoraSwitch
          disabled={streamId !== undefined}
          title={`syncWithAudio`}
          value={syncWithAudio}
          onValueChange={(value) => {
            this.setState({ syncWithAudio: value });
          }}
        />
        <AgoraDivider />
        <AgoraSwitch
          disabled={streamId !== undefined}
          title={`ordered`}
          value={ordered}
          onValueChange={(value) => {
            this.setState({ ordered: value });
          }}
        />
        <AgoraDivider />
        <AgoraText>{`streamId: ${streamId}`}</AgoraText>
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ data: text });
          }}
          placeholder={`data`}
          value={data}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { joinChannelSuccess, streamId } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`create Data Stream`}
          onPress={this.createDataStream}
        />
        <AgoraButton
          disabled={streamId === undefined}
          title={`send Stream Message`}
          onPress={this.sendStreamMessage}
        />
      </>
    );
  }
}
