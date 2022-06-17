import React from 'react';
import { TextInput } from 'react-native';
import {
  createAgoraRtcEngine,
  IMediaPlayer,
  IMediaPlayerSourceObserver,
  IRtcEngineEventHandler,
  MediaPlayerError,
  MediaPlayerEvent,
  MediaPlayerState,
  RtcSurfaceView,
  VideoSourceType,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseComponentState,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseComponentState {
  url: string;
  open: boolean;
  play: boolean;
  pause: boolean;
  position: number;
  duration: number;
}

export default class MediaPlayer
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IMediaPlayerSourceObserver
{
  protected player?: IMediaPlayer;

  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: true,
      url: 'https://agora-adc-artifacts.oss-cn-beijing.aliyuncs.com/video/meta_live_mpk.mov',
      open: false,
      play: false,
      pause: false,
      position: 0,
      duration: 0,
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

    this.engine = createAgoraRtcEngine();
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
    });

    this.createMediaPlayer();
  }

  /**
   * Step 2: createMediaPlayer
   */
  createMediaPlayer = () => {
    this.player = this.engine?.createMediaPlayer();
    this.player?.registerPlayerSourceObserver(this);
  };

  /**
   * Step 3-1: open
   */
  open = () => {
    const { url } = this.state;
    if (!url) {
      console.error('url is invalid');
    }

    this.player?.open(url, 0);
  };

  /**
   * Step 3-2: play
   */
  play = () => {
    this.player?.play();
  };

  /**
   * Step 3-3(Optional): seek
   */
  seek = (percent: number) => {
    if (percent < 0 || percent > 1) {
      console.error(`percent is invalid`);
      return;
    }

    const { duration } = this.state;
    if (duration <= 0) {
      console.error(`duration is invalid`);
      return;
    }

    this.player?.seek(duration * percent);
  };

  /**
   * Step 3-4 (Optional): pause
   */
  pause = () => {
    this.player?.pause();
  };

  /**
   * Step 3-5 (Optional): resume
   */
  resume = () => {
    this.player?.resume();
  };

  /**
   * Step 3-6: stop
   */
  stop = () => {
    this.player?.stop();
  };

  /**
   * Step 4: destroyMediaPlayer
   */
  protected destroyMediaPlayer() {
    if (!this.player) return;
    this.engine?.destroyMediaPlayer(this.player);
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.destroyMediaPlayer();

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
        this.setState({ open: true, duration: this.player?.getDuration()! });
        break;
      case MediaPlayerState.PlayerStatePlaying:
        this.setState({ play: true, pause: false });
        break;
      case MediaPlayerState.PlayerStatePaused:
        this.setState({ pause: true });
        break;
      case MediaPlayerState.PlayerStatePlaybackCompleted:
      case MediaPlayerState.PlayerStatePlaybackAllLoopsCompleted:
      case MediaPlayerState.PlayerStateStopped:
        this.setState({ open: false, play: false });
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

  onPositionChanged(position: number) {
    this.info('onPositionChanged', 'position', position);
    this.setState({ position: position });
  }

  onPlayerEvent(
    eventCode: MediaPlayerEvent,
    elapsedTime: number,
    message: string
  ) {
    this.info(
      'onPlayerEvent',
      'eventCode',
      eventCode,
      'elapsedTime',
      elapsedTime,
      'message',
      message
    );
  }

  protected renderTop(): React.ReactNode {
    return undefined;
  }

  protected renderBottom(): React.ReactNode {
    const { url, open, position, duration } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={'url'}
          value={url}
        />
        <ActionItem
          disabled={!open}
          title={`${position} ms : ${duration} ms`}
          isShowSlider={true}
          sliderValue={duration === 0 ? 0 : position / duration}
          onSliderValueChange={(value) => {
            this.seek(value);
          }}
        />
        <Divider />
      </>
    );
  }

  protected renderVideo(): React.ReactNode {
    const { open } = this.state;
    return (
      <>
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
    const { open, play, pause } = this.state;
    return (
      <>
        <ActionItem disabled={open} title={`open`} onPress={this.open} />
        <ActionItem
          disabled={!open}
          title={`${play ? 'stop' : 'play'} Media Player`}
          onPress={play ? this.stop : this.play}
        />
        <ActionItem
          disabled={!play}
          title={`${pause ? 'resume' : 'pause'} Media Player`}
          onPress={pause ? this.resume : this.pause}
        />
      </>
    );
  }
}
