import React, { ReactElement, createRef } from 'react';
import { AppState, AppStateStatus, Platform, StyleSheet } from 'react-native';
import {
  AgoraRtcRenderViewState,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  PipState,
  RemoteVideoStats,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoCanvas,
  VideoSourceType,
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
  localViewRef = createRef<any>();
  appState: AppStateStatus = AppState.currentState;

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
      pipContentWidth: 640,
      pipContentHeight: 480,
      autoEnterPip: true,
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

    const appStateListener = (nextAppState: AppStateStatus) => {
      if (
        this.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        this.stopPip();
      }

      this.appState = nextAppState;
    };
    AppState.addEventListener('change', appStateListener);
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
  setupPip = (ref: any) => {
    const { pipContentWidth, pipContentHeight, autoEnterPip } = this.state;
    let state: AgoraRtcRenderViewState = ref.current.state;
    let contentSource = state.contentSource;
    if (this.engine?.isPipSupported()) {
      this.engine?.setupPip({
        // this is only for iOS.
        // In Android, pip mode resizes your whole app. So you need hide the content that you want to show in pip mode.
        // You can listen onPipStateChanged to do this.
        // In iOS, pip mode only resizes the video view that you pass from contentSource.
        contentSource: contentSource,
        // On Android, the width/height is used to cal the AspectRatio, but not actual width/height
        // https://developer.android.com/reference/android/app/PictureInPictureParams.Builder#setAspectRatio(android.util.Rational)
        contentWidth: pipContentWidth,
        contentHeight: pipContentHeight,
        //this is only form iOS.
        autoEnterPip: autoEnterPip,
      });
    } else {
      this.error('Picture-in-Picture is not supported on this device');
    }
  };

  /**
   * Step 3-2: startPip
   */
  startPip = (ref: any) => {
    this.setupPip(ref);
    if (this.engine?.isPipSupported()) {
      this.engine?.startPip();
    }
  };

  /**
   * Step 3-3: stopPip(iOS only)
   */
  stopPip = () => {
    if (this.engine?.isPipSupported()) {
      this.engine?.stopPip();
    }
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

  /**
   * Optional for iOS: sample will auto EnterPip mode with local view
   * you can choose the autoEnterPip view by yourself such as remote view
   */
  onFirstLocalVideoFrame(
    source: VideoSourceType,
    width: number,
    height: number,
    elapsed: number
  ): void {
    if (source === VideoSourceType.VideoSourceCamera) {
      this.setupPip(this.localViewRef);
    }
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
    this.info('onPipStateChanged', 'state', state);

    // iOS show the pip window by UIView, so you don't need to handle the UI by yourself
    // Android show the pip window by Activity, so you need to handle the UI by yourself
    if (Platform.OS === 'android') {
      if (this.updatePipState) {
        this.updatePipState(state);
      }
      // this.setState({ pipState: state });
    }
    this.setState({ pipState: state });
  }

  protected renderChannel(): ReactElement | undefined {
    const { channelId, joinChannelSuccess, pipState } = this.state;
    return Platform.OS === 'ios' ||
      (Platform.OS === 'android' && pipState !== PipState.PipStateStarted) ? (
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
    const { renderByTextureView, pipState } = this.state;
    let ref = createRef<any>();
    return renderByTextureView ? (
      <RtcTextureView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        canvas={{ ...user }}
      />
    ) : (
      <>
        {Platform.OS === 'ios' && (
          <AgoraButton
            containerStyle={styles.button}
            title={
              Platform.OS === 'ios' && pipState !== PipState.PipStateStarted
                ? `startPip`
                : `stopPip`
            }
            onPress={() =>
              Platform.OS === 'ios' && pipState !== PipState.PipStateStarted
                ? this.startPip(user.uid === 0 ? this.localViewRef : ref)
                : this.stopPip()
            }
          />
        )}
        <RtcSurfaceView
          ref={user.uid === 0 ? this.localViewRef : ref}
          style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
          zOrderMediaOverlay={user.uid !== 0}
          canvas={{ ...user }}
        />
      </>
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
    return Platform.OS === 'ios' ||
      (Platform.OS === 'android' && pipState !== PipState.PipStateStarted) ? (
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
    return Platform.OS === 'android' &&
      pipState !== PipState.PipStateStarted ? (
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
const styles = StyleSheet.create({
  button: {
    width: 100,
    position: 'absolute',
    zIndex: 9,
    top: 10,
  },
});
