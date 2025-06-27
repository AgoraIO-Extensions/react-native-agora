import React, { ReactElement } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import {
  AgoraPipContentViewLayout,
  AgoraPipOptions,
  AgoraPipState,
  AgoraPipStateChangedObserver,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  RenderModeType,
  RtcConnection,
  RtcRendererViewProps,
  RtcStats,
  RtcSurfaceView,
  RtcTextureView,
  UserOfflineReasonType,
  VideoCanvas,
  VideoSourceType,
  VideoViewSetupMode,
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
  AgoraList,
  AgoraStyle,
  AgoraSwitch,
  AgoraTextInput,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import AgoraServiceHelper from '../../../utils/AgoraServiceHelper';
import { error } from '../../../utils/log';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  pipContentWidth: number;
  pipContentHeight: number;
  pipState: number;
  renderByTextureView: boolean;
  isPipAutoEnterSupported: boolean;
  isPipSupported: boolean;
  isPipDisposed: boolean;
  pipContentRow: number;
  pipContentCol: number;
}

export default class PictureInPicture
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, AgoraPipStateChangedObserver
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
      startPreview: false,
      pipContentWidth: 960,
      pipContentHeight: 540,
      pipState: AgoraPipState.pipStateStopped,
      renderByTextureView: false,
      isPipAutoEnterSupported: true,
      isPipSupported: true,
      isPipDisposed: false,
      pipContentRow: 1,
      pipContentCol: 0,
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
    this.engine.getAgoraPip().registerPipStateChangedObserver(this);

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
        JSON.stringify({ 'che.video.render.mode': 22 })
      );
    }

    this.setState({
      isPipAutoEnterSupported: this.engine
        .getAgoraPip()
        .pipIsAutoEnterSupported(),
      isPipSupported: this.engine.getAgoraPip().pipIsSupported(),
    });

    const appStateListener = (nextAppState: AppStateStatus) => {
      if (
        this.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        this.setState({ pipState: AgoraPipState.pipStateStopped });
        if (Platform.OS === 'android') {
          if (this.updatePipState) {
            this.updatePipState(AgoraPipState.pipStateStopped);
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
  setupPip = () => {
    const {
      isPipSupported,
      pipContentWidth,
      pipContentHeight,
      isPipAutoEnterSupported,
      remoteUsers,
      pipContentRow,
      pipContentCol,
    } = this.state;

    if (!isPipSupported) {
      return this.error('Picture-in-Picture is not supported on this device');
    }

    let options: AgoraPipOptions = {
      // Setting autoEnterEnabled to true enables seamless transition to PiP mode when the app enters background,
      // providing the best user experience recommended by both Android and iOS platforms.
      autoEnterEnabled: isPipAutoEnterSupported,
    };
    if (Platform.OS === 'android') {
      options = {
        // Keep the aspect ratio same as the video view. The aspectRatioX and aspectRatioY values
        // should match your video dimensions for optimal display. For example, for 1080p video,
        // use 16:9 ratio (1920:1080 simplified to 16:9).
        aspectRatioX: pipContentWidth,
        aspectRatioY: pipContentHeight,

        // According to https://developer.android.com/develop/ui/views/picture-in-picture#set-sourcerecthint
        // The sourceRectHint defines the initial position and size of the PiP window during the transition animation.
        // Setting proper values helps create a smooth animation from your video view to the PiP window.
        // If not set correctly, the system may apply a default content overlay, resulting in a jarring transition.
        sourceRectHintLeft: 0,
        sourceRectHintTop: 0,
        sourceRectHintRight: 0,
        sourceRectHintBottom: 0,

        // According to https://developer.android.com/develop/ui/views/picture-in-picture#seamless-resizing
        // The seamlessResizeEnabled flag enables smooth resizing of the PiP window.
        // Set this to true for video content to allow continuous playback during resizing.
        // Set this to false for non-video content where seamless resizing isn't needed.
        seamlessResizeEnabled: true,

        // The external state monitor checks the PiP view state at the interval specified by externalStateMonitorInterval (100ms).
        useExternalStateMonitor: true,
        externalStateMonitorInterval: 100,
      };
    } else {
      let contentViewLayout: AgoraPipContentViewLayout = {
        padding: 0,
        spacing: 2,
        row: pipContentRow,
        column: pipContentCol,
      };

      let videoStreams: RtcRendererViewProps[] = [
        //this is the local user, please do not set uid for it
        {
          canvas: {
            sourceType: VideoSourceType.VideoSourceCamera,
            setupMode: VideoViewSetupMode.VideoViewSetupAdd, //please use VideoViewSetupAdd only
            renderMode: RenderModeType.RenderModeHidden,
          },
        },
        ...remoteUsers.map((userUid) => {
          return {
            //this is the remote user, please set uid for it
            canvas: {
              uid: userUid,
              sourceType: VideoSourceType.VideoSourceRemote,
              setupMode: VideoViewSetupMode.VideoViewSetupAdd, //please use VideoViewSetupAdd only
              renderMode: RenderModeType.RenderModeHidden,
            },
          };
        }),
      ];

      options = {
        // Use preferredContentWidth and preferredContentHeight to set the size of the PIP window.
        // These values determine the initial dimensions and can be adjusted while PIP is active.
        // For optimal user experience, we recommend matching these dimensions to your video view size.
        // The system may adjust the final window size to maintain system constraints.
        preferredContentWidth: pipContentWidth,
        preferredContentHeight: pipContentHeight,

        // The contentViewLayout determines the layout of video streams in the PIP window.
        // You can customize the grid layout by specifying:
        // - padding: Space between the window edge and content (in pixels)
        // - spacing: Space between video streams (in pixels)
        // - row: Number of rows in the grid layout
        // - column: Number of columns in the grid layout
        //
        // The SDK provides a basic grid layout system that arranges video streams in a row x column matrix.
        // For example:
        // - row=2, column=2: Up to 4 video streams in a 2x2 grid
        // - row=1, column=2: Up to 2 video streams side by side
        // - row=2, column=1: Up to 2 video streams stacked vertically
        //
        // Note:
        // - This layout configuration only takes effect when contentView is 0 (using native view)
        // - The grid layout is filled from left-to-right, top-to-bottom
        // - Empty cells will be left blank if there are fewer streams than grid spaces
        // - For custom layouts beyond the grid system, set contentView to your own view ID
        contentViewLayout,

        // The videoStreams array specifies which video streams to display in the PIP window.
        // Each stream can be configured with properties like uid, sourceType, setupMode, and renderMode.
        // Note:
        // - This configuration only takes effect when contentView is set to 0 (native view mode).
        // - The streams will be laid out according to the contentViewLayout grid configuration.
        // - The order of the video streams in the array determines the display order in the PIP window.
        // - The SDK will automatically create and manage native views for each video stream.
        // - The view property in VideoCanvas will be replaced by the SDK-managed native view.
        // - You can customize the rendering of each stream using properties like renderMode and mirrorMode.
        videoStreams,

        // The controlStyle property determines which controls are visible in the PiP window.
        // Available styles:
        // * 0: Show all system controls (default) - includes play/pause, forward/backward, close and restore buttons
        // * 1: Hide forward and backward buttons - shows only play/pause, close and restore buttons
        // * 2: Hide play/pause button and progress bar - shows only close and restore buttons (recommended)
        // * 3: Hide all system controls - no buttons visible, including close and restore
        //
        // Note: For most video conferencing use cases, style 2 is recommended since playback controls
        // are not relevant and may confuse users. The close and restore buttons provide essential
        // window management functionality.
        // Note: We do not handle the event of other controls, so the recommended style is 2 or 3.
        controlStyle: 2, // only show close and restore button
      };
    }
    this.info(`[setupPip] options: ${JSON.stringify(options)}`);
    this.engine?.getAgoraPip().pipSetup(options);
  };

  /**
   * Step 3-2: startPip
   */
  startPip = () => {
    this.engine?.getAgoraPip().pipStart();
  };

  /**
   * Step 3-3: stopPip
   */
  stopPip = () => {
    if (
      Platform.OS !== 'android' &&
      this.engine?.getAgoraPip().pipIsSupported()
    ) {
      this.engine?.getAgoraPip().pipStop();
    }
  };

  /**
   * Step 3-4: pipDispose
   */
  pipDispose = () => {
    this.engine?.getAgoraPip().pipDispose();
    this.setState({
      isPipDisposed: true,
      pipState: AgoraPipState.pipStateStopped,
    });
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
    this.engine?.getAgoraPip().unregisterPipStateChangedObserver(this);
    this.engine?.getAgoraPip().release();
    this.pipDispose();
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
    this.pipDispose();
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    this.setState(
      (preState) => {
        return {
          remoteUsers: [...(preState.remoteUsers ?? []), remoteUid],
        };
      },
      () => {
        // Because the window rendering and pip setup are asynchronous, we need to ensure that the window rendering is prioritized,
        // so we need to use setTimeout to ensure that the window rendering is completed before the pip setup.
        setTimeout(() => {
          this.setupPip();
        }, 0);
      }
    );
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    this.setState(
      (preState) => {
        return {
          remoteUsers: preState.remoteUsers?.filter((uid) => uid !== remoteUid),
        };
      },
      () => {
        this.setupPip();
      }
    );
  }

  onPipStateChanged(state: AgoraPipState, error: string | null): void {
    this.info('onPipStateChanged', 'state', state, 'error', error);

    // iOS show the pip window by UIView, so you don't need to handle the UI by yourself
    // Android show the pip window by Activity, so you need to handle the UI by yourself
    if (Platform.OS === 'android') {
      if (this.updatePipState) {
        this.updatePipState(state);
      }
    }

    if (state === AgoraPipState.pipStateFailed) {
      // if you destroy the source view of pip controller, some error may happen,
      // so we need to dispose the pip controller here.
      this.pipDispose();
    }

    this.setState({ pipState: state });
  }

  componentDidMount() {
    super.componentDidMount();
    if (Platform.OS === 'android') {
      AgoraServiceHelper.startForegroundService();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    if (Platform.OS === 'android') {
      AgoraServiceHelper.stopForegroundService();
    }
  }

  protected renderChannel(): ReactElement | undefined {
    const { channelId, joinChannelSuccess, pipState } = this.state;
    const isAndroidAndInPip =
      Platform.OS === 'android' && pipState === AgoraPipState.pipStateStarted;

    return !isAndroidAndInPip ? (
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
              Platform.OS === 'android' &&
              pipState === AgoraPipState.pipStateStarted
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

    const isAndroidAndInPip =
      Platform.OS === 'android' && pipState === AgoraPipState.pipStateStarted;

    return user.uid === 0 || isAndroidAndInPip ? (
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
    const { renderByTextureView, pipState } = this.state;
    return renderByTextureView ? (
      <RtcTextureView
        style={
          user.uid === 0
            ? AgoraStyle.videoLarge
            : Platform.OS === 'android' &&
              pipState === AgoraPipState.pipStateStarted
            ? AgoraStyle.videoPip
            : AgoraStyle.videoSmall
        }
        canvas={{ ...user }}
      />
    ) : (
      <>
        <RtcSurfaceView
          style={
            user.uid === 0
              ? AgoraStyle.videoLarge
              : Platform.OS === 'android' &&
                pipState === AgoraPipState.pipStateStarted
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
    const { startPreview, joinChannelSuccess, renderByTextureView, pipState } =
      this.state;

    const isAndroidAndInPip =
      Platform.OS === 'android' && pipState === AgoraPipState.pipStateStarted;

    return !isAndroidAndInPip ? (
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
            <AgoraTextInput
              style={AgoraStyle.fullSize}
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  pipContentRow:
                    text === '' ? this.createState().pipContentRow : +text,
                });
              }}
              numberKeyboard={true}
              placeholder={`pipContentRow (defaults: ${
                this.createState().pipContentRow
              })`}
            />
            <AgoraTextInput
              style={AgoraStyle.fullSize}
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  pipContentCol:
                    text === '' ? this.createState().pipContentCol : +text,
                });
              }}
              numberKeyboard={true}
              placeholder={`pipContentCol (defaults: ${
                this.createState().pipContentCol
              })`}
            />
          </>
        )}
      </>
    ) : undefined;
  }

  protected renderAction(): ReactElement | undefined {
    const { pipState, isPipSupported } = this.state;
    const isAndroidAndInPip =
      Platform.OS === 'android' && pipState === AgoraPipState.pipStateStarted;

    return isPipSupported && !isAndroidAndInPip ? (
      <>
        <AgoraButton
          title={`setup pip`}
          onPress={() => {
            this.setupPip();
          }}
        />
        <AgoraButton
          title={`${
            pipState === AgoraPipState.pipStateStarted ? 'stop' : 'start'
          } pip`}
          onPress={() => {
            if (pipState === AgoraPipState.pipStateStarted) {
              this.stopPip();
            } else {
              this.startPip();
            }
          }}
        />
        <AgoraButton
          title={`dispose pip`}
          onPress={() => {
            this.pipDispose();
          }}
        />
      </>
    ) : undefined;
  }
}
