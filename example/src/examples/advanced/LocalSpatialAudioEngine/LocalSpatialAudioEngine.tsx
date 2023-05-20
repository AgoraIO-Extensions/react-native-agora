import React from 'react';
import {
  AudioScenarioType,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraTextInput,
  AgoraView,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { arrayToItems } from '../../../utils';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseAudioComponentState {
  range: number;
  targetUid: number;
  position: number[];
  axisForward: number[];
  axisRight: number[];
  axisUp: number[];
}

export default class LocalSpatialAudioEngine
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
      range: 50,
      targetUid: 0,
      position: [0, 0, 0],
      axisForward: [1, 0, 0],
      axisRight: [0, 1, 0],
      axisUp: [0, 0, 1],
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
      // ⚠️ Must use AudioScenarioGameStreaming on this case
      audioScenario: AudioScenarioType.AudioScenarioGameStreaming,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone permission
    await askMediaAccess(['android.permission.RECORD_AUDIO']);

    // Only need to enable audio on this case
    this.engine.enableAudio();

    this.engine.setParameters(
      JSON.stringify({ 'rtc.audio.force_bluetooth_a2dp': true })
    );

    this.initializeLocalSpatialAudioEngine();
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
      // ⚠️ Must set autoSubscribeAudio to false
      autoSubscribeAudio: false,
    });
  }

  /**
   * Step 3-1: initializeLocalSpatialAudioEngine
   */
  initializeLocalSpatialAudioEngine = () => {
    this.engine?.getLocalSpatialAudioEngine().initialize();
  };

  /**
   * Step 3-2: setAudioRecvRange
   */
  setAudioRecvRange = () => {
    const { range } = this.state;
    this.engine?.getLocalSpatialAudioEngine().setAudioRecvRange(range);
  };

  /**
   * Step 3-3: setAudioRecvRange
   */
  updateSelfPosition = () => {
    const { position, axisForward, axisRight, axisUp } = this.state;
    this.engine
      ?.getLocalSpatialAudioEngine()
      .updateSelfPosition(position, axisForward, axisRight, axisUp);
  };

  /**
   * Step 3-4: updateRemotePosition
   */
  updateRemotePosition = () => {
    const { targetUid, position, axisForward } = this.state;
    this.engine?.getLocalSpatialAudioEngine().updateRemotePosition(targetUid, {
      position,
      forward: axisForward,
    });
  };

  /**
   * Step 3-5: releaseLocalSpatialAudioEngine
   */
  releaseLocalSpatialAudioEngine = () => {
    this.engine?.getLocalSpatialAudioEngine().release();
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
    this.releaseLocalSpatialAudioEngine();
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  protected renderConfiguration(): React.ReactNode {
    const {
      joinChannelSuccess,
      remoteUsers,
      targetUid,
      position,
      axisForward,
      axisRight,
      axisUp,
    } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              range: text === '' ? this.createState().range : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`range (defaults: ${this.createState().range})`}
        />
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`set Audio Recv Range`}
          onPress={this.setAudioRecvRange}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'targetUid'}
          items={arrayToItems([0, ...remoteUsers])}
          value={targetUid}
          onValueChange={(value) => {
            this.setState({ targetUid: value });
          }}
        />
        <AgoraDivider />
        <AgoraView horizontal={true}>
          {position.map((value, index) => (
            <AgoraTextInput
              key={`position-${index}`}
              style={AgoraStyle.fullSize}
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                position[index] = +text;
                this.setState({ position });
              }}
              numberKeyboard={true}
              placeholder={`position (defaults: ${
                this.createState().position[index]
              })`}
            />
          ))}
        </AgoraView>
        <AgoraDivider />
        <AgoraView horizontal={true}>
          {axisForward.map((value, index) => (
            <AgoraTextInput
              key={`axisForward-${index}`}
              style={AgoraStyle.fullSize}
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                axisForward[index] = +text;
                this.setState({ axisForward });
              }}
              numberKeyboard={true}
              placeholder={`axisForward (defaults: ${
                this.createState().axisForward[index]
              })`}
            />
          ))}
        </AgoraView>
        <AgoraDivider />
        <AgoraView horizontal={true}>
          {axisRight.map((value, index) => (
            <AgoraTextInput
              key={`axisRight-${index}`}
              style={AgoraStyle.fullSize}
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                axisRight[index] = +text;
                this.setState({ axisRight });
              }}
              numberKeyboard={true}
              placeholder={`axisRight (defaults: ${
                this.createState().axisRight[index]
              })`}
            />
          ))}
        </AgoraView>
        <AgoraDivider />
        <AgoraView horizontal={true}>
          {axisUp.map((value, index) => (
            <AgoraTextInput
              key={`axisUp-${index}`}
              style={AgoraStyle.fullSize}
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                axisUp[index] = +text;
                this.setState({ axisUp });
              }}
              numberKeyboard={true}
              placeholder={`axisUp (defaults: ${
                this.createState().axisUp[index]
              })`}
            />
          ))}
        </AgoraView>
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { joinChannelSuccess, targetUid } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`update ${targetUid === 0 ? 'Self' : 'Remote'} Position`}
          onPress={
            targetUid === 0
              ? this.updateSelfPosition
              : this.updateRemotePosition
          }
        />
      </>
    );
  }
}
