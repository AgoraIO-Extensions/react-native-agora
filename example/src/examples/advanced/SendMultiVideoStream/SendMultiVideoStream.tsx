import React from 'react';
import {
  AudioFrame,
  AudioPcmFrame,
  ChannelProfileType,
  ClientRoleType,
  IAudioFrameObserver,
  IAudioPcmFrameSink,
  IMediaPlayer,
  IMediaPlayerSourceObserver,
  IMediaPlayerVideoFrameObserver,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  IVideoFrameObserver,
  MediaPlayerError,
  MediaPlayerState,
  RtcConnection,
  UserOfflineReasonType,
  VideoFrame,
  VideoSourceType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraTextInput,
  RtcSurfaceView,
} from '../../../components/ui';
import Config from '../../../config/agora.config';
import { askMediaAccess } from '../../../utils/permissions';

interface State extends BaseVideoComponentState {
  token2: string;
  uid2: number;
  url: string;
  open: boolean;
}

export default class SendMultiVideoStream
  extends BaseComponent<{}, State>
  implements
    IRtcEngineEventHandler,
    IMediaPlayerSourceObserver,
    IAudioFrameObserver,
    IVideoFrameObserver,
    IAudioPcmFrameSink,
    IMediaPlayerVideoFrameObserver
{
  // @ts-ignore
  protected engine?: IRtcEngineEx;
  protected player?: IMediaPlayer;

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
      url: 'https://agora-adc-artifacts.oss-cn-beijing.aliyuncs.com/video/meta_live_mpk.mov',
      open: false,
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
    // this.engine.getMediaEngine().registerAudioFrameObserver(this);
    // this.engine.getMediaEngine().registerVideoFrameObserver(this);

    // Need granted the microphone and camera permission
    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();
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
   * Step 3-1: createMediaPlayer
   */
  createMediaPlayer = () => {
    const { url } = this.state;
    if (!url) {
      this.error('url is invalid');
    }

    this.player = this.engine?.createMediaPlayer();
    // this.player?.registerAudioFrameObserver(this);
    // this.player?.registerVideoFrameObserver(this);
    this.player?.registerPlayerSourceObserver(this);
    this.player?.open(url, 0);
  };

  /**
   * Step 3-2: publishMediaPlayerTrack
   */
  publishMediaPlayerTrack = () => {
    const { channelId, token2, uid2 } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid2 <= 0) {
      this.error('uid2 is invalid');
      return;
    }

    // publish media player stream
    this.engine?.joinChannelEx(
      token2,
      { channelId, localUid: uid2 },
      {
        autoSubscribeAudio: false,
        autoSubscribeVideo: false,
        publishMicrophoneTrack: false,
        publishCameraTrack: false,
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishMediaPlayerAudioTrack: true,
        publishMediaPlayerVideoTrack: true,
        publishMediaPlayerId: this.player?.getMediaPlayerId(),
      }
    );
  };

  /**
   * Step 3-3: destroyMediaPlayer
   */
  destroyMediaPlayer = () => {
    if (!this.player) {
      return;
    }

    // this.player?.unregisterAudioFrameObserver(this);
    // this.player?.unregisterVideoFrameObserver(this);
    this.engine?.destroyMediaPlayer(this.player);
    this.setState({ open: false });
  };

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.destroyMediaPlayer();
    this.engine?.leaveChannel();
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    // this.engine?.getMediaEngine().unregisterAudioFrameObserver(this);
    // this.engine?.getMediaEngine().unregisterVideoFrameObserver(this);
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    const { uid2 } = this.state;
    if (connection.localUid === uid2) return;
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    const { uid2 } = this.state;
    if (connection.localUid === uid2 || remoteUid === uid2) return;
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

  onPlayerSourceStateChanged(state: MediaPlayerState, ec: MediaPlayerError) {
    this.info('onPlayerSourceStateChanged', 'state', state, 'ec', ec);
    switch (state) {
      case MediaPlayerState.PlayerStateIdle:
        break;
      case MediaPlayerState.PlayerStateOpening:
        break;
      case MediaPlayerState.PlayerStateOpenCompleted:
        this.setState({ open: true });
        // Auto play on this case
        this.player?.play();
        break;
      case MediaPlayerState.PlayerStatePlaying:
        break;
      case MediaPlayerState.PlayerStatePaused:
        break;
      case MediaPlayerState.PlayerStatePlaybackCompleted:
        break;
      case MediaPlayerState.PlayerStatePlaybackAllLoopsCompleted:
        break;
      case MediaPlayerState.PlayerStateStopped:
        break;
      case MediaPlayerState.PlayerStatePausingInternal:
        break;
      case MediaPlayerState.PlayerStateStoppingInternal:
        break;
      case MediaPlayerState.PlayerStateSeekingInternal:
        break;
      case MediaPlayerState.PlayerStateGettingInternal:
        break;
      case MediaPlayerState.PlayerStateNoneInternal:
        break;
      case MediaPlayerState.PlayerStateDoNothingInternal:
        break;
      case MediaPlayerState.PlayerStateSetTrackInternal:
        break;
      case MediaPlayerState.PlayerStateFailed:
        break;
    }
  }

  onCompleted() {
    this.info('onCompleted');
    // Auto replay on this case
    this.player?.seek(0);
    this.player?.play();
  }

  onRecordAudioFrame(channelId: string, audioFrame: AudioFrame): boolean {
    this.info('onRecordAudioFrame', channelId, audioFrame);
    return true;
  }

  onCaptureVideoFrame(
    sourceType: VideoSourceType,
    videoFrame: VideoFrame
  ): boolean {
    this.info('onCaptureVideoFrame', sourceType, videoFrame);
    return true;
  }

  onMediaPlayerVideoFrame(
    videoFrame: VideoFrame,
    mediaPlayerId: number
  ): boolean {
    this.info('onMediaPlayerVideoFrame', videoFrame, mediaPlayerId);
    return true;
  }

  onFrame(frame: AudioPcmFrame | VideoFrame) {
    this.info('onFrame', frame);
  }

  protected renderConfiguration(): React.ReactNode {
    const { uid2, url } = this.state;
    return (
      <>
        <AgoraTextInput
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
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={`url`}
          value={url}
        />
      </>
    );
  }

  protected renderUsers(): React.ReactNode {
    const { open } = this.state;
    return (
      <>
        {super.renderUsers()}
        {open ? (
          <RtcSurfaceView
            canvas={{
              mediaPlayerId: this.player?.getMediaPlayerId(),
              sourceType: VideoSourceType.VideoSourceMediaPlayer,
            }}
          />
        ) : undefined}
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { open } = this.state;
    return (
      <>
        <AgoraButton
          title={`${open ? 'destroy' : 'create'} Media Player`}
          onPress={open ? this.destroyMediaPlayer : this.createMediaPlayer}
        />
        <AgoraButton
          disabled={!open}
          title={`publish Media Player Track`}
          onPress={this.publishMediaPlayerTrack}
        />
      </>
    );
  }
}
