import React, { ReactElement, createRef } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import {
  AgoraRtcRenderViewState,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  PipOptions,
  PipState,
  RenderModeType,
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
  AgoraCard,
  AgoraDivider,
  AgoraDropdown,
  AgoraList,
  AgoraStyle,
  AgoraSwitch,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { arrayToItems } from '../../../utils';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  pipContentWidth: number;
  pipContentHeight: number;
  autoEnterPip: boolean;
  pipState: number;
  renderByTextureView: boolean;
  userRefList: { ref: React.RefObject<any>; canvas: VideoCanvas }[];
  selectUser: number;
}

export default class PictureInPicture
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
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
      userRefList: [
        {
          ref: createRef<any>(),
          canvas: { uid: 0, renderMode: RenderModeType.RenderModeHidden },
        },
      ],
      selectUser: 0,
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

    if (Platform.OS === 'ios') {
      // You should call this method when you want to use the pip feature in iOS background mode.
      this.engine.setParameters(
        JSON.stringify({ 'che.video.render.type': 22 })
      );
    }

    const appStateListener = (nextAppState: AppStateStatus) => {
      if (
        this.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        this.stopPip();
        this.setState({ pipState: PipState.PipStateStopped });
        if (Platform.OS === 'android') {
          if (this.updatePipState) {
            this.updatePipState(PipState.PipStateStopped);
          }
        }
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
  setupPip = (uid: number) => {
    if (!this.engine?.isPipSupported()) {
      return this.error('Picture-in-Picture is not supported on this device');
    }
    const { pipContentWidth, pipContentHeight, autoEnterPip, userRefList } =
      this.state;
    let pipOptions: PipOptions = {};
    if (Platform.OS === 'ios') {
      // iOS pip mode parameters
      let user = userRefList.find((item) => item.canvas.uid === uid)?.canvas;
      if (user) {
        const ref = userRefList.find((item) => item.canvas.uid === uid)?.ref;
        if (ref) {
          let state: AgoraRtcRenderViewState = ref.current.state;
          pipOptions = {
            contentWidth: pipContentWidth,
            contentHeight: pipContentHeight,
            autoEnterPip: autoEnterPip,
          };
          // you should use the pip feature by VideoCanvas in iOS.
          if (user) {
            pipOptions = {
              ...pipOptions,
              // On iOS, the contentSource is same as the VideoCanvas.view
              contentSource: state.contentSource,
              canvas: { ...user, view: state.contentSource },
            };
          }
          console.log('pipOptions', pipOptions);
          this.engine?.setupPip(pipOptions);
        }
      }
    } else {
      // android pip mode parameters
      pipOptions = {
        // On Android, the width/height is used to cal the AspectRatio, but not actual width/height
        // https://developer.android.com/reference/android/app/PictureInPictureParams.Builder#setAspectRatio(android.util.Rational)
        contentWidth: pipContentWidth,
        contentHeight: pipContentHeight,
      };
      this.engine?.setupPip(pipOptions);
    }
  };

  /**
   * Step 3-2: startPip
   */
  startPip = () => {
    this.engine?.startPip();
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

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    super.onUserJoined(connection, remoteUid, elapsed);
    const { userRefList } = this.state;
    if (userRefList.findIndex((item) => item.canvas.uid === remoteUid) === -1) {
      userRefList.push({
        ref: createRef<any>(),
        canvas: { uid: remoteUid, renderMode: RenderModeType.RenderModeHidden },
      });
      this.setState({ userRefList });
    }
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    super.onUserOffline(connection, remoteUid, reason);
    const { userRefList } = this.state;
    const index = userRefList.findIndex(
      (item) => item.canvas.uid === remoteUid
    );
    if (index !== -1) {
      userRefList.splice(index, 1);
      this.setState({ userRefList });
    }
  }

  onPipStateChanged(state: PipState): void {
    this.info('onPipStateChanged', 'state', state);

    // iOS show the pip window by UIView, so you don't need to handle the UI by yourself
    // Android show the pip window by Activity, so you need to handle the UI by yourself
    if (Platform.OS === 'android') {
      if (this.updatePipState) {
        this.updatePipState(state);
      }
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
    const {
      enableVideo,
      startPreview,
      joinChannelSuccess,
      remoteUsers,
      pipState,
    } = this.state;
    return enableVideo ? (
      <>
        {!!startPreview || joinChannelSuccess
          ? this.renderUser({
              uid: 0,
              sourceType: VideoSourceType.VideoSourceCamera,
            })
          : undefined}
        {!!startPreview || joinChannelSuccess ? (
          <AgoraList
            style={
              Platform.OS === 'android' && pipState === PipState.PipStateStarted
                ? AgoraStyle.videoPipContainer
                : AgoraStyle.videoContainer
            }
            numColumns={undefined}
            horizontal={true}
            data={remoteUsers}
            renderItem={({ item }) =>
              this.renderUser({
                uid: item,
                sourceType: VideoSourceType.VideoSourceRemote,
              })!
            }
          />
        ) : undefined}
      </>
    ) : undefined;
  }

  protected renderUser(user: VideoCanvas): ReactElement | undefined {
    const video = this.renderVideo(user);
    const { pipState } = this.state;
    return user.uid === 0 ||
      (Platform.OS === 'android' && pipState === PipState.PipStateStarted) ? (
      video
    ) : (
      <AgoraCard
        key={`${user.uid} - ${user.sourceType}`}
        title={`${user.uid} - ${user.sourceType}`}
      >
        {video}
      </AgoraCard>
    );
  }

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    const { renderByTextureView, userRefList, pipState } = this.state;
    return renderByTextureView ? (
      <RtcTextureView
        ref={userRefList.find((item) => item.canvas.uid === user.uid)?.ref}
        style={
          user.uid === 0
            ? AgoraStyle.videoLarge
            : Platform.OS === 'android' && pipState === PipState.PipStateStarted
            ? AgoraStyle.videoPip
            : AgoraStyle.videoSmall
        }
        canvas={{ ...user }}
      />
    ) : (
      <>
        <RtcSurfaceView
          ref={userRefList.find((item) => item.canvas.uid === user.uid)?.ref}
          style={
            user.uid === 0
              ? AgoraStyle.videoLarge
              : Platform.OS === 'android' &&
                pipState === PipState.PipStateStarted
              ? AgoraStyle.videoPip
              : AgoraStyle.videoSmall
          }
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
      selectUser,
      remoteUsers,
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
            <AgoraDropdown
              title={'Select User to Setup Pip'}
              items={arrayToItems(remoteUsers.concat([0]))}
              value={selectUser}
              onValueChange={(value) => {
                this.setState({ selectUser: value });
              }}
            />
            <AgoraDivider />
            <AgoraSwitch
              disabled={pipState === PipState.PipStateStarted}
              title={`autoEnterPip`}
              value={autoEnterPip}
              onValueChange={(value) => {
                this.setState({ autoEnterPip: value });
              }}
            />
          </>
        )}
      </>
    ) : undefined;
  }

  protected renderAction(): ReactElement | undefined {
    const { pipState, selectUser } = this.state;
    return (Platform.OS === 'android' &&
      pipState !== PipState.PipStateStarted) ||
      Platform.OS === 'ios' ? (
      <>
        <AgoraButton
          disabled={pipState === PipState.PipStateStarted}
          title={`setup pip`}
          onPress={() => {
            this.setupPip(selectUser);
          }}
        />
        <AgoraButton
          title={`${
            pipState === PipState.PipStateStarted ? 'stop' : 'start'
          } pip`}
          onPress={() => {
            if (Platform.OS === 'android') {
              this.startPip();
            } else {
              this.startPip();
            }
          }}
        />
      </>
    ) : undefined;
  }
}
