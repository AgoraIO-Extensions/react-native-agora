import React from 'react';
import { PermissionsAndroid, Platform, TextInput } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IMediaPlayer,
  IMediaPlayerSourceObserver,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  MediaPlayerError,
  MediaPlayerState,
  RtcSurfaceView,
  VideoSourceType,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  token2: string;
  uid2: number;
  url: string;
  open: boolean;
}

export default class SendMultiVideoStream
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IMediaPlayerSourceObserver
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
      console.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine() as IRtcEngineEx;
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

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
      console.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      console.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannel2(token, channelId, uid, {
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
      console.error('url is invalid');
    }

    this.player = this.engine?.createMediaPlayer();
    this.player?.registerPlayerSourceObserver(this);
    this.player?.open(url, 0);
  };

  /**
   * Step 3-2: publishMediaPlayerTrack
   */
  publishMediaPlayerTrack = () => {
    const { channelId, token2, uid2 } = this.state;
    if (!channelId) {
      console.error('channelId is invalid');
      return;
    }
    if (uid2 <= 0) {
      console.error('uid2 is invalid');
      return;
    }

    // publish media player stream
    this.engine?.joinChannelEx(
      token2,
      { channelId, localUid: uid2 },
      {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        publishMediaPlayerAudioTrack: true,
        publishMediaPlayerVideoTrack: true,
        publishMediaPlayerId: this.player?.getMediaPlayerId(),
      }
    );
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
    this.engine?.release();
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

  protected renderBottom(): React.ReactNode {
    const { uid2, url } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ uid2: +text });
          }}
          keyboardType={'numeric'}
          placeholder={`uid2 (must > 0)`}
          placeholderTextColor={'gray'}
          value={uid2 > 0 ? uid2.toString() : ''}
        />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={`url`}
          placeholderTextColor={'gray'}
          value={url}
        />
      </>
    );
  }

  protected renderVideo(): React.ReactNode {
    const { open } = this.state;
    return (
      <>
        {super.renderVideo()}
        {open ? (
          <RtcSurfaceView
            style={STYLES.video}
            canvas={{
              uid: this.player?.getMediaPlayerId(),
              sourceType: VideoSourceType.VideoSourceMediaPlayer,
            }}
          />
        ) : undefined}
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { open } = this.state;
    return (
      <>
        <ActionItem
          title={`create Media Player`}
          onPress={this.createMediaPlayer}
        />
        <ActionItem
          disabled={!open}
          title={`publish Media Player Track`}
          onPress={this.publishMediaPlayerTrack}
        />
      </>
    );
  }
}
