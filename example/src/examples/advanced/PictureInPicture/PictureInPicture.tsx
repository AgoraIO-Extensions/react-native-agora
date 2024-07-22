import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  PipState,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoCanvas,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraStyle,
  AgoraSwitch,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  pipContentSource: any;
  pipContentWidth: number;
  pipContentHeight: number;
  autoEnterPip: boolean;
  pipState: number;
  renderByTextureView: boolean;
}

export default class PictureInPicture
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
      pipContentSource: '',
      pipContentWidth: 640,
      pipContentHeight: 480,
      autoEnterPip: false,
      pipState: PipState.PipStateStopped,
      renderByTextureView: false,
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
   * Step 3-1: setupPip
   */
  setupPip = () => {
    const {
      autoEnterPip,
      pipContentSource,
      pipContentWidth,
      pipContentHeight,
    } = this.state;
    this.engine?.setupPip({
      // this is only for iOS.
      // In Android, pip mode resizes your whole app. So you need hide the content that you want to show in pip mode.
      // You can listen onPipStateChanged to do this.
      // In iOS, pip mode only resizes the video view that you pass from contentSource.
      contentSource: pipContentSource,
      contentWidth: pipContentWidth,
      contentHeight: pipContentHeight,
      autoEnterPip, // this is only for iOS
    });
  };

  /**
   * Step 3-2: startPip
   */
  startPip = () => {
    this.setupPip();
    this.engine?.startPip();
  };

  /**
   * Step 3-2: stopPip, iOS only
   */
  stopPip = () => {
    this.engine?.stopPip();
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

  onError(err: ErrorCodeType, msg: string) {
    super.onError(err, msg);
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    super.onUserJoined(connection, remoteUid, elapsed);
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    super.onUserOffline(connection, remoteUid, reason);
  }

  onPipStateChanged(state: PipState): void {
    this.log(`onPipStateChanged: ${state}`);
    if (this.updatePipState) {
      this.updatePipState(state);
    }
    this.setState({ pipState: state });
  }

  protected renderChannel(): ReactElement | undefined {
    const { channelId, joinChannelSuccess, pipState } = this.state;
    return pipState !== PipState.PipStateStarted ? (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ channelId: text });
          }}
          placeholder={`channelId`}
          value={channelId}
        />
        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
      </>
    ) : undefined;
  }

  protected renderUsers(): ReactElement | undefined {
    return super.renderUsers();
  }

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    const { renderByTextureView } = this.state;
    return renderByTextureView ? (
      <RtcTextureView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        canvas={{ ...user }}
      />
    ) : (
      <RtcSurfaceView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={{ ...user }}
      />
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const {
      startPreview,
      joinChannelSuccess,
      renderByTextureView,
      autoEnterPip,
      pipState,
    } = this.state;
    return pipState !== PipState.PipStateStarted ? (
      <>
        <AgoraSwitch
          disabled={
            (!startPreview && !joinChannelSuccess) || Platform.OS !== 'android'
          }
          title={`renderByTextureView`}
          value={renderByTextureView}
          onValueChange={(value) => {
            this.setState({ renderByTextureView: value });
          }}
        />
        <AgoraDivider />
        <AgoraTextInput
          style={AgoraStyle.fullSize}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              pipContentWidth:
                text === '' ? this.createState().pipContentWidth : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`pipContentWidth (defaults: ${
            this.createState().pipContentWidth
          })`}
        />
        <AgoraTextInput
          style={AgoraStyle.fullSize}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              pipContentHeight:
                text === '' ? this.createState().pipContentHeight : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`pipContentHeight (defaults: ${
            this.createState().pipContentHeight
          })`}
        />
        {Platform.OS === 'ios' && (
          <>
            <AgoraSwitch
              disabled={pipState === PipState.PipStateStarted}
              title={`autoEnterPip`}
              value={autoEnterPip}
              onValueChange={(value) => {
                this.setState({ autoEnterPip: value });
              }}
            />
            <AgoraDivider />
          </>
        )}
      </>
    ) : undefined;
  }

  protected renderAction(): ReactElement | undefined {
    const { pipState } = this.state;
    return pipState !== PipState.PipStateStarted ? (
      <>
        <AgoraButton
          disabled={pipState === PipState.PipStateStarted}
          title={`startPip`}
          onPress={this.startPip}
        />
      </>
    ) : undefined;
  }
}
