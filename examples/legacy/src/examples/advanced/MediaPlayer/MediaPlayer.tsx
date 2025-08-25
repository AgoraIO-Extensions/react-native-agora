import React, { ReactElement } from 'react';
import {
  IMediaPlayer,
  IMediaPlayerSourceObserver,
  IRtcEngineEventHandler,
  MediaPlayerEvent,
  MediaPlayerReason,
  MediaPlayerState,
  VideoSourceType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraSlider,
  AgoraTextInput,
  RtcSurfaceView,
} from '../../../components/ui';
import Config from '../../../config/agora.config';

interface State extends BaseComponentState {
  url: string;
  open: boolean;
  play: boolean;
  pause: boolean;
  position: number;
  duration: number;
  mute: boolean;
  playoutVolume: number;
  loopCount: number;
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
      mute: false,
      playoutVolume: 100,
      loopCount: 1,
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
    });
    this.engine.registerEventHandler(this);

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
      this.error('url is invalid');
    }

    this.player?.open(url, 0);
  };

  /**
   * Step 3-2: play
   */
  play = () => {
    const { position, duration } = this.state;
    if (position === duration && duration !== 0) {
      this.player?.seek(0);
    } else {
      this.player?.play();
    }
  };

  /**
   * Step 3-3 (Optional): seek
   */
  seek = (position: number) => {
    const { duration } = this.state;

    if (duration <= 0) {
      this.error(`duration is invalid`);
      return;
    }

    if (position < 0 || position > duration) {
      this.error(`percent is invalid`);
      return;
    }

    this.player?.seek(position);
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
   * Step 3-6 (Optional): mute
   */
  mute = () => {
    this.player?.mute(true);
    this.setState({ mute: true });
  };

  /**
   * Step 3-7 (Optional): unmute
   */
  unmute = () => {
    this.player?.mute(false);
    this.setState({ mute: false });
  };

  /**
   * Step 3-8 (Optional): adjustPlayoutVolume
   */
  adjustPlayoutVolume = () => {
    const { playoutVolume } = this.state;
    this.player?.adjustPlayoutVolume(playoutVolume);
  };

  /**
   * Step 3-9 (Optional): setLoopCount
   */
  setLoopCount = () => {
    const { loopCount } = this.state;
    this.player?.setLoopCount(loopCount);
  };

  /**
   * Step 3-10 (Optional): getStreamInfo
   */
  getStreamInfo = () => {
    const streamCount = this.player?.getStreamCount();
    if (streamCount === undefined || streamCount <= 0) {
      this.error(`streamCount is invalid`);
    }

    const streamInfo = this.player?.getStreamInfo(0);
    if (streamInfo) {
      this.debug('getStreamInfo', 'streamInfo', streamInfo);
    } else {
      this.error('getStreamInfo');
    }
  };

  /**
   * Step 3-11: stop
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
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onPlayerSourceStateChanged(state: MediaPlayerState, ec: MediaPlayerReason) {
    this.info('onPlayerSourceStateChanged', 'state', state, 'ec', ec);
    switch (state) {
      case MediaPlayerState.PlayerStateIdle:
        break;
      case MediaPlayerState.PlayerStateOpening:
        break;
      case MediaPlayerState.PlayerStateOpenCompleted: {
        const duration = this.player?.getDuration()!;
        this.setState({
          open: true,
          duration: duration < 0 ? 0 : duration,
        });
        break;
      }
      case MediaPlayerState.PlayerStatePlaying:
        this.setState({ play: true, pause: false });
        break;
      case MediaPlayerState.PlayerStatePaused:
        this.setState({ pause: true });
        break;
      case MediaPlayerState.PlayerStatePlaybackCompleted:
      case MediaPlayerState.PlayerStatePlaybackAllLoopsCompleted:
        this.setState({ play: false });
        break;
      case MediaPlayerState.PlayerStateStopped:
        this.setState({ open: false, play: false, pause: false, mute: false });
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

  protected renderChannel(): ReactElement | undefined {
    return undefined;
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { url, open, position, duration, playoutVolume } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={'url'}
          value={url}
        />
        <AgoraSlider
          disabled={!open}
          title={`${position} ms : ${duration} ms`}
          minimumValue={0}
          maximumValue={duration}
          step={1000}
          value={position}
          onSlidingComplete={(value) => {
            this.seek(value);
          }}
        />
        <AgoraDivider />
        <AgoraSlider
          title={`playoutVolume ${playoutVolume}`}
          minimumValue={0}
          maximumValue={400}
          step={1}
          value={playoutVolume}
          onSlidingComplete={(value) => {
            this.setState({ playoutVolume: value });
          }}
        />
        <AgoraButton
          disabled={!open}
          title={'adjust Playout Volume'}
          onPress={this.adjustPlayoutVolume}
        />
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              loopCount: text === '' ? this.createState().loopCount : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`loopCount (defaults: ${this.createState().loopCount})`}
        />
        <AgoraButton
          disabled={!open}
          title={'set Loop Count'}
          onPress={this.setLoopCount}
        />
      </>
    );
  }

  protected renderUsers(): ReactElement | undefined {
    const { open } = this.state;
    return (
      <>
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

  protected renderAction(): ReactElement | undefined {
    const { open, play, pause, mute } = this.state;
    return (
      <>
        <AgoraButton disabled={open} title={`open`} onPress={this.open} />
        <AgoraButton
          disabled={!open}
          title={`${play ? 'stop' : 'play'} Media Player`}
          onPress={play ? this.stop : this.play}
        />
        <AgoraButton
          disabled={!play}
          title={`${pause ? 'resume' : 'pause'} Media Player`}
          onPress={pause ? this.resume : this.pause}
        />
        <AgoraButton
          disabled={!open}
          title={`${mute ? 'un' : ''}mute`}
          onPress={mute ? this.unmute : this.mute}
        />
        <AgoraButton
          disabled={!open}
          title={`get Stream Info`}
          onPress={this.getStreamInfo}
        />
      </>
    );
  }
}
