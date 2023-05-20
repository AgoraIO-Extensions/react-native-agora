import React from 'react';
import { Dimensions } from 'react-native';
import {
  AudioSpectrumData,
  ChannelProfileType,
  ClientRoleType,
  IAudioSpectrumObserver,
  IRtcEngineEventHandler,
  UserAudioSpectrumInfo,
  createAgoraRtcEngine,
} from 'react-native-agora';
import { LineChart } from 'react-native-chart-kit';

import {
  BaseAudioComponentState,
  BaseComponent,
} from '../../../components/BaseComponent';
import { AgoraButton, AgoraTextInput } from '../../../components/ui';
import Config from '../../../config/agora.config';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseAudioComponentState {
  intervalInMS: number;
  enableAudioSpectrumMonitor: boolean;
  audioSpectrumData: number[];
}

export default class AudioSpectrum
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IAudioSpectrumObserver
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
      intervalInMS: 500,
      enableAudioSpectrumMonitor: false,
      audioSpectrumData: [],
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

    this.registerAudioSpectrumObserver();
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
   * Step 3-1: registerAudioSpectrumObserver
   */
  registerAudioSpectrumObserver = () => {
    this.engine?.registerAudioSpectrumObserver(this);
  };

  /**
   * Step 3-2: enableAudioSpectrumMonitor
   */
  enableAudioSpectrumMonitor = () => {
    const { intervalInMS } = this.state;
    this.engine?.enableAudioSpectrumMonitor(intervalInMS);
    this.setState({ enableAudioSpectrumMonitor: true });
  };

  /**
   * Step 3-3: disableAudioSpectrumMonitor
   */
  disableAudioSpectrumMonitor = () => {
    this.engine?.disableAudioSpectrumMonitor();
    this.setState({ enableAudioSpectrumMonitor: false });
  };

  /**
   * Step 3-4: unregisterAudioSpectrumObserver
   */
  unregisterAudioSpectrumObserver = () => {
    this.engine?.unregisterAudioSpectrumObserver(this);
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
    this.unregisterAudioSpectrumObserver();
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onLocalAudioSpectrum(data: AudioSpectrumData): boolean {
    this.info('onLocalAudioSpectrum', 'data', data);
    this.setState({ audioSpectrumData: data.audioSpectrumData ?? [] });
    return true;
  }

  onRemoteAudioSpectrum(
    spectrums: UserAudioSpectrumInfo[],
    spectrumNumber: number
  ): boolean {
    this.info(
      'onRemoteAudioSpectrum',
      'spectrums',
      spectrums,
      'spectrumNumber',
      spectrumNumber
    );
    return true;
  }

  protected renderConfiguration(): React.ReactNode {
    const { enableAudioSpectrumMonitor, audioSpectrumData } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              intervalInMS:
                text === '' ? this.createState().intervalInMS : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`intervalInMS (defaults: ${
            this.createState().intervalInMS
          })`}
        />
        {enableAudioSpectrumMonitor && audioSpectrumData.length > 0 ? (
          <>
            <LineChart
              data={{
                labels: [],
                datasets: [{ data: audioSpectrumData }],
              }}
              width={Dimensions.get('window').width}
              height={220}
              withDots={false}
              withShadow={false}
              withInnerLines={false}
              fromZero
              chartConfig={{
                strokeWidth: 1,
                color: () => 'white',
              }}
              bezier
            />
          </>
        ) : undefined}
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { enableAudioSpectrumMonitor } = this.state;
    return (
      <>
        <AgoraButton
          title={`${
            enableAudioSpectrumMonitor ? 'disable' : 'enable'
          } Audio Spectrum Monitor`}
          onPress={
            enableAudioSpectrumMonitor
              ? this.disableAudioSpectrumMonitor
              : this.enableAudioSpectrumMonitor
          }
        />
      </>
    );
  }
}
