import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  LocalVideoStreamReason,
  LocalVideoStreamState,
  PermissionType,
  RenderModeType,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
  VideoCanvas,
  VideoContentHint,
  VideoSourceType,
  createAgoraRtcEngine,
  showRPSystemBroadcastPickerView,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
  AgoraStyle,
  AgoraSwitch,
  AgoraTextInput,
  AgoraView,
  RtcSurfaceView,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { enumToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseVideoComponentState {
  token2: string;
  uid2: number;
  captureAudio: boolean;
  sampleRate: number;
  channels: number;
  captureSignalVolume: number;
  captureVideo: boolean;
  width: number;
  height: number;
  frameRate: number;
  bitrate: number;
  contentHint: VideoContentHint;
  startScreenCapture: boolean;
  publishScreenCapture: boolean;
}

export default class ScreenShare
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  // @ts-ignore
  protected engine?: IRtcEngineEx;

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
      token2: '',
      uid2: 0,
      captureAudio: false,
      sampleRate: 16000,
      channels: 2,
      captureSignalVolume: 100,
      captureVideo: true,
      width: 1280,
      height: 720,
      frameRate: 15,
      bitrate: 0,
      contentHint: VideoContentHint.ContentHintMotion,
      startScreenCapture: false,
      publishScreenCapture: false,
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

    this.engine = createAgoraRtcEngine() as IRtcEngineEx;
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
   * Step 3-1: startScreenCapture
   */
  startScreenCapture = async () => {
    const {
      captureAudio,
      sampleRate,
      channels,
      captureSignalVolume,
      captureVideo,
      width,
      height,
      frameRate,
      bitrate,
      contentHint,
    } = this.state;
    this.engine?.startScreenCapture({
      captureAudio,
      audioParams: {
        sampleRate,
        channels,
        captureSignalVolume,
      },
      captureVideo,
      videoParams: {
        dimensions: { width, height },
        frameRate,
        bitrate,
        contentHint,
      },
    });
    this.engine?.startPreview(VideoSourceType.VideoSourceScreen);

    if (Platform.OS === 'ios') {
      // Show the picker view for screen share, ⚠️ only support for iOS 12+
      await showRPSystemBroadcastPickerView(true);
    }

    if (captureAudio && !captureVideo) {
      this.setState({ startScreenCapture: true });
    }
  };

  /**
   * Step 3-2 (Optional): updateScreenCaptureParameters
   */
  updateScreenCaptureParameters = () => {
    const {
      captureAudio,
      sampleRate,
      channels,
      captureSignalVolume,
      captureVideo,
      width,
      height,
      frameRate,
      bitrate,
      contentHint,
    } = this.state;
    this.engine?.updateScreenCapture({
      captureAudio,
      audioParams: {
        sampleRate,
        channels,
        captureSignalVolume,
      },
      captureVideo,
      videoParams: {
        dimensions: { width, height },
        frameRate,
        bitrate,
        contentHint,
      },
    });

    if (!captureAudio && !captureVideo) {
      this.setState({ startScreenCapture: false });
    } else {
      // ⚠️ You should updateChannelMediaOptionsEx if you change captureAudio or captureVideo
      const { channelId, uid2, publishScreenCapture } = this.state;
      if (publishScreenCapture) {
        this.engine?.updateChannelMediaOptionsEx(
          {
            publishScreenCaptureAudio: captureAudio,
            publishScreenCaptureVideo: captureVideo,
          },
          { channelId, localUid: uid2 }
        );
      }
    }
  };

  /**
   * Step 3-3: publishScreenCapture
   */
  publishScreenCapture = () => {
    const { channelId, token2, uid2 } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid2 <= 0) {
      this.error('uid2 is invalid');
      return;
    }

    // publish screen share stream
    this.engine?.joinChannelEx(
      token2,
      { channelId, localUid: uid2 },
      {
        autoSubscribeAudio: false,
        autoSubscribeVideo: false,
        publishMicrophoneTrack: false,
        publishCameraTrack: false,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishScreenCaptureAudio: true,
        publishScreenCaptureVideo: true,
      }
    );
  };

  /**
   * Step 3-4: stopScreenCapture
   */
  stopScreenCapture = () => {
    this.engine?.stopScreenCapture();
    this.setState({ startScreenCapture: false });
  };

  /**
   * Step 3-5: unpublishScreenCapture
   */
  unpublishScreenCapture = () => {
    const { channelId, uid2 } = this.state;
    this.engine?.leaveChannelEx({ channelId, localUid: uid2 });
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

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    const { uid2 } = this.state;
    if (connection.localUid === uid2) {
      this.info(
        'onJoinChannelSuccess',
        'connection',
        connection,
        'elapsed',
        elapsed
      );
      this.setState({ publishScreenCapture: true });
      return;
    }
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    const { uid2 } = this.state;
    if (connection.localUid === uid2) {
      this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
      this.setState({ publishScreenCapture: false });
      return;
    }
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    const { uid2 } = this.state;
    if (connection.localUid === uid2 || remoteUid === uid2) {
      // ⚠️ mute the streams from screen sharing
      this.engine?.muteRemoteAudioStream(uid2, true);
      this.engine?.muteRemoteVideoStream(uid2, true);
      return;
    }
    super.onUserJoined(connection, remoteUid, elapsed);
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    const { uid2 } = this.state;
    if (connection.localUid === uid2 || remoteUid === uid2) return;
    super.onUserOffline(connection, remoteUid, reason);
  }

  onPermissionError(permissionType: PermissionType) {
    this.info('onPermissionError', 'permissionType', permissionType);
    // ⚠️ You should call stopScreenCapture if received the event with permissionType ScreenCapture,
    // otherwise you can not startScreenCapture again
    this.stopScreenCapture();
    this.setState({
      startScreenCapture: false,
    });
  }

  onLocalVideoStateChanged(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    error: LocalVideoStreamReason
  ) {
    this.info(
      'onLocalVideoStateChanged',
      'source',
      source,
      'state',
      state,
      'error',
      error
    );
    if (source === VideoSourceType.VideoSourceScreen) {
      switch (state) {
        case LocalVideoStreamState.LocalVideoStreamStateStopped:
        case LocalVideoStreamState.LocalVideoStreamStateFailed:
          break;
        case LocalVideoStreamState.LocalVideoStreamStateCapturing:
        case LocalVideoStreamState.LocalVideoStreamStateEncoding:
          this.setState({ startScreenCapture: true });
          break;
      }
    }
  }

  protected renderUsers(): ReactElement | undefined {
    const { startScreenCapture } = this.state;
    return (
      <>
        {super.renderUsers()}
        {startScreenCapture ? (
          <RtcSurfaceView
            style={AgoraStyle.videoLarge}
            canvas={{
              uid: 0,
              sourceType: VideoSourceType.VideoSourceScreen,
              renderMode: RenderModeType.RenderModeFit,
            }}
          />
        ) : undefined}
      </>
    );
  }

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    return super.renderVideo({
      ...user,
      renderMode: RenderModeType.RenderModeFit,
    });
  }

  protected renderConfiguration(): ReactElement | undefined {
    const {
      uid2,
      captureAudio,
      captureSignalVolume,
      captureVideo,
      contentHint,
      publishScreenCapture,
    } = this.state;
    return (
      <>
        <AgoraTextInput
          editable={!publishScreenCapture}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              uid2: text === '' ? this.createState().uid2 : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`uid2 (must > 0)`}
          value={uid2 > 0 ? uid2.toString() : ''}
        />
        <AgoraSwitch
          title={`captureAudio`}
          value={captureAudio}
          onValueChange={(value) => {
            this.setState({ captureAudio: value });
          }}
        />
        <AgoraDivider />
        {captureAudio ? (
          <>
            {Platform.OS === 'android' ? (
              <>
                <AgoraTextInput
                  onChangeText={(text) => {
                    if (isNaN(+text)) return;
                    this.setState({
                      sampleRate:
                        text === '' ? this.createState().sampleRate : +text,
                    });
                  }}
                  numberKeyboard={true}
                  placeholder={`sampleRate (defaults: ${
                    this.createState().sampleRate
                  })`}
                />
                <AgoraTextInput
                  onChangeText={(text) => {
                    if (isNaN(+text)) return;
                    this.setState({
                      channels:
                        text === '' ? this.createState().channels : +text,
                    });
                  }}
                  numberKeyboard={true}
                  placeholder={`channels (defaults: ${
                    this.createState().channels
                  })`}
                />
              </>
            ) : undefined}
            <AgoraSlider
              title={`captureSignalVolume ${captureSignalVolume}`}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={captureSignalVolume}
              onSlidingComplete={(value) => {
                this.setState({ captureSignalVolume: value });
              }}
            />
            <AgoraDivider />
          </>
        ) : undefined}
        <AgoraSwitch
          title={`captureVideo`}
          value={captureVideo}
          onValueChange={(value) => {
            this.setState({ captureVideo: value });
          }}
        />
        <AgoraDivider />
        {captureVideo ? (
          <>
            <AgoraView horizontal={true}>
              <AgoraTextInput
                style={AgoraStyle.fullSize}
                onChangeText={(text) => {
                  if (isNaN(+text)) return;
                  this.setState({
                    width: text === '' ? this.createState().width : +text,
                  });
                }}
                numberKeyboard={true}
                placeholder={`width (defaults: ${this.createState().width})`}
              />
              <AgoraTextInput
                style={AgoraStyle.fullSize}
                onChangeText={(text) => {
                  if (isNaN(+text)) return;
                  this.setState({
                    height: text === '' ? this.createState().height : +text,
                  });
                }}
                numberKeyboard={true}
                placeholder={`height (defaults: ${this.createState().height})`}
              />
            </AgoraView>
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  frameRate: text === '' ? this.createState().frameRate : +text,
                });
              }}
              numberKeyboard={true}
              placeholder={`frameRate (defaults: ${
                this.createState().frameRate
              })`}
            />
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  bitrate: text === '' ? this.createState().bitrate : +text,
                });
              }}
              numberKeyboard={true}
              placeholder={`bitrate (defaults: ${this.createState().bitrate})`}
            />
            <AgoraDropdown
              title={'contentHint'}
              items={enumToItems(VideoContentHint)}
              value={contentHint}
              onValueChange={(value) => {
                this.setState({ contentHint: value });
              }}
            />
          </>
        ) : undefined}
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { startScreenCapture, publishScreenCapture } = this.state;
    return (
      <>
        <AgoraButton
          title={`${startScreenCapture ? 'stop' : 'start'} Screen Capture`}
          onPress={
            startScreenCapture
              ? this.stopScreenCapture
              : this.startScreenCapture
          }
        />
        <AgoraButton
          disabled={!startScreenCapture}
          title={'updateScreenCaptureParameters'}
          onPress={this.updateScreenCaptureParameters}
        />
        <AgoraButton
          title={`${
            publishScreenCapture ? 'unpublish' : 'publish'
          } Screen Capture`}
          onPress={
            publishScreenCapture
              ? this.unpublishScreenCapture
              : this.publishScreenCapture
          }
        />
      </>
    );
  }
}
