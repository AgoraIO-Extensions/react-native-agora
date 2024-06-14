import React, { ReactElement } from 'react';
import { NativeModules, Platform } from 'react-native';

import {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
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
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { askMediaAccess } from '../../../utils/permissions';

const { VideoRawDataNativeModule } = NativeModules;

interface State extends BaseVideoComponentState {
  switchCamera: boolean;
  renderByTextureView: boolean;
}

export default class ProcessVideoRawData
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
      switchCamera: false,
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
    VideoRawDataNativeModule.initialize(appId);
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
   * Step 3 (Optional): switchCamera
   */
  switchCamera = () => {
    this.engine?.switchCamera();
    this.setState((preState) => {
      return { switchCamera: !preState.switchCamera };
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
    VideoRawDataNativeModule.releaseModule();
    this.engine?.release();
  }

  protected renderUsers(): ReactElement | undefined {
    return super.renderUsers();
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

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    const { renderByTextureView } = this.state;
    return (
      <>
        {renderByTextureView ? (
          <RtcTextureView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            canvas={{
              ...user,
            }}
          />
        ) : (
          <RtcSurfaceView
            style={
              user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall
            }
            zOrderMediaOverlay={user.uid !== 0}
            canvas={{
              ...user,
            }}
          />
        )}
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess, renderByTextureView } =
      this.state;
    return (
      <>
        {Platform.OS === 'android' && (
          <AgoraSwitch
            disabled={!startPreview && !joinChannelSuccess}
            title={`renderByTextureView`}
            value={renderByTextureView}
            onValueChange={(value) => {
              this.setState({ renderByTextureView: value });
            }}
          />
        )}
        <AgoraDivider />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={this.switchCamera}
        />
      </>
    );
  }
}
