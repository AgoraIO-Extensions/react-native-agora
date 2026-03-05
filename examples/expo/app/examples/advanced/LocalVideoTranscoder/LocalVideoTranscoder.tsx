import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import createAgoraRtcEngine, {
  ChannelProfileType,
  ClientRoleType,
  IMediaPlayer,
  IMediaPlayerSourceObserver,
  IRtcEngineEventHandler,
  LocalTranscoderConfiguration,
  MediaPlayerReason,
  MediaPlayerState,
  RenderModeType,
  RtcConnection,
  RtcStats,
  TranscodingVideoStream,
  VideoMirrorModeType,
  VideoSourceType,
  showRPSystemBroadcastPickerView,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraStyle,
  AgoraTextInput,
  RtcSurfaceView,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { getAbsolutePath, getResourcePath } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseVideoComponentState {
  startScreenCapture: boolean;
  url: string;
  open: boolean;
  imageUrl: string;
  startLocalVideoTranscoder: boolean;
  VideoInputStreams: TranscodingVideoStream[];
}

export default class LocalVideoTranscoder
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IMediaPlayerSourceObserver
{
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
      startScreenCapture: false,
      url: 'https://agora-adc-artifacts.oss-cn-beijing.aliyuncs.com/video/meta_live_mpk.mov',
      open: false,
      imageUrl: getResourcePath('agora-logo.png'),
      startLocalVideoTranscoder: false,
      VideoInputStreams: [],
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
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

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
      publishMicrophoneTrack: false,
      publishCameraTrack: false,
      publishTranscodedVideoTrack: true,
    });
  }

  /**
   * Step 3-1 (Optional): startScreenCapture
   */
  startScreenCapture = async () => {
    this.engine?.startScreenCapture({
      videoParams: {
        dimensions: { width: 1920, height: 1080 },
        bitrate: 1000,
        frameRate: 15,
      },
    });
    this.engine?.startPreview(VideoSourceType.VideoSourceScreen);
    if (Platform.OS === 'ios') {
      // Show the picker view for screen share, ⚠️ only support for iOS 12+
      await showRPSystemBroadcastPickerView(true);
    }
    this.setState({ startScreenCapture: true });
  };

  /**
   * Step 3-4 (Optional): stopScreenCapture
   */
  stopScreenCapture = () => {
    this.engine?.stopScreenCapture();
    this.setState({ startScreenCapture: false });
  };

  /**
   * Step 3-3 (Optional): createMediaPlayer
   */
  createMediaPlayer = () => {
    const { url } = this.state;

    if (!url) {
      this.error('url is invalid');
    }

    this.player = this.engine?.createMediaPlayer();
    this.player?.registerPlayerSourceObserver(this);
    this.player?.open(url, 0);
  };

  /**
   * Step 3-4 (Optional): destroyMediaPlayer
   */
  destroyMediaPlayer = () => {
    if (!this.player) {
      return;
    }

    this.engine?.destroyMediaPlayer(this.player);
    this.setState({ open: false });
  };

  /**
   * Step 3-5: startLocalVideoTranscoder
   */
  startLocalVideoTranscoder = async () => {
    const config = await this._generateLocalTranscoderConfiguration();

    this.engine?.startLocalVideoTranscoder(config);
    this.engine?.startPreview(VideoSourceType.VideoSourceTranscoded);
    this.setState({ startLocalVideoTranscoder: true });
  };

  /**
   * Step 3-6 (Optional): updateLocalTranscoderConfiguration
   */
  updateLocalTranscoderConfiguration = async () => {
    this.engine?.updateLocalTranscoderConfiguration(
      await this._generateLocalTranscoderConfiguration()
    );
  };

  /**
   * Step 3-7: stopLocalVideoTranscoder
   */
  stopLocalVideoTranscoder = () => {
    this.engine?.stopLocalVideoTranscoder();
    this.setState({ startLocalVideoTranscoder: false });
  };

  _generateLocalTranscoderConfiguration =
    async (): Promise<LocalTranscoderConfiguration> => {
      const { startScreenCapture, open, imageUrl } = this.state;
      const max_width = 1080,
        max_height = 720,
        width = 300,
        height = 300;

      const streams: TranscodingVideoStream[] = [];
      streams.push({
        sourceType: VideoSourceType.VideoSourceCamera,
      });

      if (startScreenCapture) {
        streams.push({
          sourceType: VideoSourceType.VideoSourceScreenPrimary,
        });
      }

      if (open) {
        streams.push({
          sourceType: VideoSourceType.VideoSourceMediaPlayer,
          mediaPlayerId: this.player?.getMediaPlayerId(),
        });
      }
      let imageAbsoluteUrl = await getAbsolutePath(imageUrl);
      if (imageAbsoluteUrl) {
        const getImageType = (url: string): VideoSourceType | undefined => {
          if (url.endsWith('.png')) {
            return VideoSourceType.VideoSourceRtcImagePng;
          } else if (url.endsWith('.jepg') || url.endsWith('.jpg')) {
            return VideoSourceType.VideoSourceRtcImageJpeg;
          } else if (url.endsWith('.gif')) {
            return VideoSourceType.VideoSourceRtcImageGif;
          }
          return undefined;
        };
        streams.push({
          sourceType: getImageType(imageAbsoluteUrl),
          imageUrl: imageAbsoluteUrl,
        });
      }

      streams.map((value, index) => {
        const maxNumPerRow = Math.floor(max_width / width);
        const numOfRow = Math.floor(index / maxNumPerRow);
        const numOfColumn = Math.floor(index % maxNumPerRow);
        value.x = numOfColumn * width;
        value.y = numOfRow * height;
        value.width = width;
        value.height = height;
        value.zOrder = 1;
        value.alpha = 1;
        value.mirror = false;
      });

      return {
        streamCount: streams.length,
        videoInputStreams: streams,
        videoOutputConfiguration: {
          dimensions: { width: max_width, height: max_height },
        },
      };
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
    this.engine?.release();
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
    const state = this.createState();
    this.setState(state);
  }

  onPlayerSourceStateChanged(state: MediaPlayerState, ec: MediaPlayerReason) {
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

  protected renderUsers(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess, startLocalVideoTranscoder } =
      this.state;
    return (
      <>
        {startLocalVideoTranscoder
          ? this.renderUser({
              renderMode: RenderModeType.RenderModeFit,
              uid: 0,
              sourceType: VideoSourceType.VideoSourceTranscoded,
              mirrorMode: VideoMirrorModeType.VideoMirrorModeDisabled,
            })
          : undefined}
        {startPreview || joinChannelSuccess
          ? this.renderUser({
              uid: 0,
              sourceType: VideoSourceType.VideoSourceCamera,
            })
          : undefined}
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { startScreenCapture, url, open, imageUrl } = this.state;
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
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={'url'}
          value={url}
        />
        {open ? (
          <RtcSurfaceView
            style={AgoraStyle.videoSmall}
            canvas={{
              mediaPlayerId: this.player?.getMediaPlayerId(),
              sourceType: VideoSourceType.VideoSourceMediaPlayer,
            }}
          />
        ) : undefined}
        <AgoraButton
          title={`${open ? 'destroy' : 'create'} Media Player`}
          onPress={open ? this.destroyMediaPlayer : this.createMediaPlayer}
        />
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ imageUrl: text });
          }}
          placeholder={'imageUrl'}
          value={imageUrl}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { startLocalVideoTranscoder } = this.state;
    return (
      <>
        <AgoraButton
          title={`${
            startLocalVideoTranscoder ? 'stop' : 'start'
          } Local Video Transcoder`}
          onPress={
            startLocalVideoTranscoder
              ? this.stopLocalVideoTranscoder
              : this.startLocalVideoTranscoder
          }
        />
        <AgoraButton
          disabled={!startLocalVideoTranscoder}
          title={`update Local Transcoder Configuration`}
          onPress={this.updateLocalTranscoderConfiguration}
        />
      </>
    );
  }
}
