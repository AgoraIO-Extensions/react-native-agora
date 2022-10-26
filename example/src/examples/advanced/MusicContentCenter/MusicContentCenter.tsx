import React from 'react';
import {
  createAgoraRtcEngine,
  IMediaPlayerSourceObserver,
  IMusicContentCenter,
  IMusicContentCenterEventHandler,
  IMusicPlayer,
  MediaPlayerError,
  MediaPlayerEvent,
  MediaPlayerState,
  Music,
  MusicChartInfo,
  MusicCollection,
  MusicContentCenterStatusCode,
  PreloadStatusCode,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraImage,
  AgoraSlider,
  AgoraTextInput,
} from '../../../components/ui';

interface State extends BaseComponentState {
  rtmToken: string; // generate for test https://webdemo.agora.io/token-builder/
  mccUid: number;
  musicChartInfos: MusicChartInfo[];
  musicChartId: number;
  page: number;
  pageSize: number;
  musicCollection?: MusicCollection;
  musics: Music[];
  songCode: number;
  preload: boolean;
  open: boolean;
  play: boolean;
  pause: boolean;
  position: number;
  duration: number;
}

export default class MusicContentCenter
  extends BaseComponent<{}, State>
  implements IMusicContentCenterEventHandler, IMediaPlayerSourceObserver
{
  protected musicContentCenter?: IMusicContentCenter;
  protected player?: IMusicPlayer;

  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: false,
      rtmToken: '',
      mccUid: 0,
      musicChartInfos: [],
      musicChartId: -1,
      page: 0,
      pageSize: 20,
      musicCollection: undefined,
      musics: [],
      songCode: -1,
      preload: false,
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
      this.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
    });
  }

  /**
   * Step 2: initMusicContentCenter
   */
  initMusicContentCenter = () => {
    const { appId, rtmToken, mccUid } = this.state;
    if (!appId) {
      this.error(`appId is invalid`);
    }
    if (!rtmToken) {
      this.error(`rtmToken is invalid`);
    }
    if (!mccUid) {
      this.error(`mccUid is invalid`);
    }

    this.musicContentCenter = this.engine?.getMusicContentCenter();
    this.musicContentCenter?.registerEventHandler(this);

    this.musicContentCenter?.initialize({
      appId,
      rtmToken,
      mccUid,
    });

    this.getMusicCharts();
  };

  /**
   * Step 3: getMusicCharts
   */
  getMusicCharts = () => {
    this.musicContentCenter?.getMusicCharts();
  };

  /**
   * Step 4: getMusicCollectionByMusicChartId
   */
  getMusicCollectionByMusicChartId = () => {
    const { musicChartId, page, pageSize } = this.state;
    if (!musicChartId) {
      this.error(`musicChartId is invalid`);
    }

    this.musicContentCenter?.getMusicCollectionByMusicChartId(
      musicChartId!,
      page,
      pageSize
    );
  };

  /**
   * Step 5: preload
   */
  preload = () => {
    const { songCode } = this.state;
    if (!songCode) {
      this.error(`songCode is invalid`);
    }

    this.musicContentCenter?.preload(songCode!);
  };

  /**
   * Step 6: createMusicPlayer
   */
  createMusicPlayer = () => {
    if (this.player) return;
    this.player = this.musicContentCenter?.createMusicPlayer();
    this.player?.registerPlayerSourceObserver(this);
  };

  /**
   * Step 7-1: openWithSongCode
   */
  openWithSongCode = () => {
    const { songCode } = this.state;
    if (!songCode) {
      this.error('songCode is invalid');
    }

    this.createMusicPlayer();
    this.player?.openWithSongCode(songCode!, 0);
  };

  /**
   * Step 7-2: play
   */
  play = () => {
    const { position, duration } = this.state;
    if (position === duration) {
      this.player?.seek(0);
    } else {
      this.player?.play();
    }
  };

  /**
   * Step 7-3 (Optional): seek
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
   * Step 7-4 (Optional): pause
   */
  pause = () => {
    this.player?.pause();
  };

  /**
   * Step 7-5 (Optional): resume
   */
  resume = () => {
    this.player?.resume();
  };

  /**
   * Step 7-6: stop
   */
  stop = () => {
    this.player?.stop();
  };

  /**
   * Step 8: destroyMediaPlayer
   */
  protected destroyMediaPlayer() {
    if (!this.player) return;
    this.engine?.destroyMediaPlayer(this.player);
  }

  /**
   * Step 9: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.destroyMediaPlayer();
    this.musicContentCenter?.release();
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onMusicChartsResult(
    requestId: string,
    status: MusicContentCenterStatusCode,
    result: MusicChartInfo[]
  ) {
    this.info('onMusicChartsResult', requestId, status, result);
    this.setState({ musicChartInfos: result });
  }

  onMusicCollectionResult(
    requestId: string,
    status: MusicContentCenterStatusCode,
    result: MusicCollection
  ) {
    this.info('onMusicCollectionResult', requestId, status, result);
    this.setState({
      musicCollection: result,
      musics: Array.from({ length: result.getCount() }, (value, index) => {
        return result.getMusic(index);
      }),
    });
  }

  onPreLoadEvent(
    songCode: number,
    percent: number,
    status: PreloadStatusCode,
    msg: string,
    lyricUrl?: string
  ) {
    this.info('onPreLoadEvent', songCode, percent, status, msg, lyricUrl);
    if (songCode === this.state.songCode) {
      this.setState({
        preload: status === PreloadStatusCode.KPreloadStatusCompleted,
      });
    }
  }

  onLyricResult(requestId: string, lyricUrl: string) {
    this.info('onLyricResult', requestId, lyricUrl);
  }

  onPlayerSourceStateChanged(state: MediaPlayerState, ec: MediaPlayerError) {
    this.info('onPlayerSourceStateChanged', 'state', state, 'ec', ec);
    switch (state) {
      case MediaPlayerState.PlayerStateIdle:
        break;
      case MediaPlayerState.PlayerStateOpening:
        break;
      case MediaPlayerState.PlayerStateOpenCompleted:
        this.setState({
          open: true,
          duration: this.player?.getDuration()!,
        });
        break;
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
        this.setState({
          open: false,
          play: false,
          pause: false,
        });
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

  protected renderChannel(): React.ReactNode {
    return undefined;
  }

  protected renderConfiguration(): React.ReactNode {
    const {
      rtmToken,
      musicChartInfos,
      musicChartId,
      musics,
      songCode,
      open,
      preload,
      position,
      duration,
    } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ rtmToken: text });
          }}
          placeholder={`rtmToken`}
          value={rtmToken}
        />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              mccUid: text === '' ? this.createState().mccUid : +text,
            });
          }}
          placeholder={`mccUid (defaults: ${this.createState().mccUid})`}
        />
        <AgoraButton
          title={`init Music Content Center`}
          onPress={this.initMusicContentCenter}
        />
        <AgoraDivider />
        <AgoraDropdown
          title={'musicChartInfos:'}
          items={musicChartInfos?.map((value) => {
            return {
              value: value.id!,
              label: value.chartName!,
            };
          })}
          value={musicChartId}
          onValueChange={(value) => {
            this.setState({ musicChartId: value });
          }}
        />
        <AgoraDivider />
        {musicChartId >= 0 ? (
          <>
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  page: text === '' ? this.createState().page : +text,
                });
              }}
              placeholder={`page (defaults: ${this.createState().page})`}
            />
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  pageSize: text === '' ? this.createState().pageSize : +text,
                });
              }}
              placeholder={`pageSize (defaults: ${
                this.createState().pageSize
              })`}
            />
            <AgoraButton
              title={`get Music Collection`}
              onPress={this.getMusicCollectionByMusicChartId}
            />
            <AgoraDivider />
            <AgoraDropdown
              title={'musics:'}
              items={musics?.map((value) => {
                return {
                  value: value.songCode!,
                  label: `${value.name}-${value.singer}`,
                };
              })}
              value={songCode}
              onValueChange={(value) => {
                this.setState({ songCode: value, preload: false }, () => {
                  setTimeout(() => {
                    this.stop();
                    this.preload();
                  });
                });
              }}
            />
            <AgoraDivider />
          </>
        ) : undefined}
        {songCode >= 0 ? (
          <>
            <AgoraButton
              disabled={open}
              title={`openWithSongCode`}
              onPress={this.openWithSongCode}
            />
            <AgoraDivider />
          </>
        ) : undefined}
        {preload ? (
          <>
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
          </>
        ) : undefined}
      </>
    );
  }

  protected renderUsers(): React.ReactNode {
    const { musics, songCode } = this.state;
    return (
      <>
        {songCode >= 0 ? (
          <AgoraImage
            source={{
              uri: musics.find((value) => {
                return value.songCode === songCode;
              })?.poster,
            }}
          />
        ) : undefined}
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { open, play, pause } = this.state;
    return (
      <>
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
      </>
    );
  }
}
