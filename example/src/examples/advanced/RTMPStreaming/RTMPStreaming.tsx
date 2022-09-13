import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import {
  AudioCodecProfileType,
  AudioSampleRateType,
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  LiveTranscoding,
  RtmpStreamingEvent,
  RtmpStreamPublishErrorType,
  RtmpStreamPublishState,
  TranscodingUser,
  VideoCodecProfileType,
  VideoCodecTypeForStream,
} from 'react-native-agora';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
  AgoraStyle,
  AgoraSwitch,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';

interface State extends BaseVideoComponentState {
  url: string;
  startRtmpStreamWithTranscoding: boolean;
  width: number;
  height: number;
  videoBitrate: number;
  videoFramerate: number;
  videoGop: number;
  videoCodecProfile: VideoCodecProfileType;
  backgroundColor: number;
  videoCodecType: VideoCodecTypeForStream;
  transcodingUsers: TranscodingUser[];
  watermarkUrl: string;
  backgroundImageUrl: string;
  audioSampleRate: AudioSampleRateType;
  audioBitrate: number;
  audioChannels: number;
  audioCodecProfile: AudioCodecProfileType;
  startRtmpStream: boolean;
}

export default class RTMPStreaming
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
      url: 'rtmp://vid-218.push.chinanetcenter.broadcastapp.agora.io/live/test',
      startRtmpStreamWithTranscoding: false,
      width: 360,
      height: 640,
      videoBitrate: 400,
      videoFramerate: 15,
      videoGop: 30,
      videoCodecProfile: VideoCodecProfileType.VideoCodecProfileHigh,
      backgroundColor: 0x000000,
      videoCodecType: VideoCodecTypeForStream.VideoCodecH264ForStream,
      transcodingUsers: [
        {
          uid: 0,
          x: 0,
          y: 0,
          width: styles.image.width,
          height: styles.image.height,
          zOrder: 50,
        },
      ],
      watermarkUrl: 'https://web-cdn.agora.io/doc-center/image/agora-logo.png',
      backgroundImageUrl:
        'https://web-cdn.agora.io/doc-center/image/agora-logo.png',
      audioSampleRate: AudioSampleRateType.AudioSampleRate48000,
      audioBitrate: 48,
      audioChannels: 1,
      audioCodecProfile: AudioCodecProfileType.AudioCodecProfileLcAac,
      startRtmpStream: false,
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
   * Step 3-1: startRtmpStream
   */
  startRtmpStream = () => {
    const { url, startRtmpStreamWithTranscoding } = this.state;
    if (!url) {
      this.error('url is invalid');
      return;
    }

    if (startRtmpStreamWithTranscoding) {
      this.engine?.startRtmpStreamWithTranscoding(
        url,
        this._generateLiveTranscoding()
      );
    } else {
      this.engine?.startRtmpStreamWithoutTranscoding(url);
    }
  };

  /**
   * Step 3-2 (Optional): updateRtmpTranscoding
   */
  updateRtmpTranscoding = () => {
    this.engine?.updateRtmpTranscoding(this._generateLiveTranscoding());
  };

  _generateLiveTranscoding = (): LiveTranscoding => {
    const {
      remoteUsers,
      width,
      height,
      videoBitrate,
      videoFramerate,
      videoGop,
      videoCodecProfile,
      backgroundColor,
      videoCodecType,
      transcodingUsers,
      watermarkUrl,
      backgroundImageUrl,
      audioSampleRate,
      audioBitrate,
      audioChannels,
      audioCodecProfile,
    } = this.state;

    return {
      width,
      height,
      videoBitrate,
      videoFramerate,
      videoGop,
      videoCodecProfile,
      backgroundColor,
      videoCodecType,
      transcodingUsers: [
        ...transcodingUsers,
        ...remoteUsers.map((value, index) => {
          const maxNumPerRow = Math.floor(width / styles.image.width);
          const numOfRow = Math.floor((index + 1) / maxNumPerRow);
          const numOfColumn = Math.floor((index + 1) % maxNumPerRow);
          return {
            uid: value,
            x: numOfColumn * styles.image.width,
            y: numOfRow * styles.image.height,
            width: styles.image.width,
            height: styles.image.height,
            zOrder: 50,
          };
        }),
      ],
      userCount: transcodingUsers.length + remoteUsers.length,
      watermark: [
        {
          url: watermarkUrl,
          x: width - styles.image.width,
          y: height - styles.image.height,
          width: styles.image.width,
          height: styles.image.height,
          zOrder: 100,
        },
      ],
      watermarkCount: 1,
      backgroundImage: [
        {
          url: backgroundImageUrl,
          x: 0,
          y: 0,
          width,
          height,
          zOrder: 1,
        },
      ],
      backgroundImageCount: 1,
      audioSampleRate,
      audioBitrate,
      audioChannels,
      audioCodecProfile,
    };
  };

  /**
   * Step 3-3: stopRtmpStream
   */
  stopRtmpStream = () => {
    const { url } = this.state;
    if (!url) {
      this.error('url is invalid');
      return;
    }

    this.engine?.stopRtmpStream(url);
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

  onRtmpStreamingEvent(url: string, eventCode: RtmpStreamingEvent) {
    this.info('onRtmpStreamingEvent', 'url', url, 'eventCode', eventCode);
  }

  onRtmpStreamingStateChanged(
    url: string,
    state: RtmpStreamPublishState,
    errCode: RtmpStreamPublishErrorType
  ) {
    this.info(
      'onRtmpStreamingStateChanged',
      'url',
      url,
      'state',
      state,
      'errCode',
      errCode
    );
    switch (state) {
      case RtmpStreamPublishState.RtmpStreamPublishStateIdle:
        break;
      case RtmpStreamPublishState.RtmpStreamPublishStateConnecting:
        break;
      case RtmpStreamPublishState.RtmpStreamPublishStateRunning:
        this.setState({ startRtmpStream: true });
        break;
      case RtmpStreamPublishState.RtmpStreamPublishStateRecovering:
        break;
      case RtmpStreamPublishState.RtmpStreamPublishStateFailure:
      case RtmpStreamPublishState.RtmpStreamPublishStateDisconnecting:
        this.setState({ startRtmpStream: false });
        break;
    }
  }

  onTranscodingUpdated() {
    this.debug('onTranscodingUpdated');
  }

  protected renderConfiguration(): React.ReactNode {
    const {
      url,
      startRtmpStreamWithTranscoding,
      videoCodecProfile,
      backgroundColor,
      videoCodecType,
      watermarkUrl,
      backgroundImageUrl,
      audioSampleRate,
      audioChannels,
      audioCodecProfile,
      startRtmpStream,
    } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
          placeholder={`url`}
          value={url}
        />
        <AgoraSwitch
          disabled={startRtmpStream}
          title={'startRtmpStreamWithTranscoding'}
          value={startRtmpStreamWithTranscoding}
          onValueChange={(value) => {
            this.setState({ startRtmpStreamWithTranscoding: value });
          }}
        />
        {startRtmpStreamWithTranscoding ? (
          <>
            <AgoraDivider />
            <>
              <AgoraText>backgroundColor</AgoraText>
              <ColorPicker
                style={styles.picker}
                onColorChange={(selectedColor) => {
                  this.setState({
                    backgroundColor: +fromHsv(selectedColor).replace('#', '0x'),
                  });
                }}
                color={`#${backgroundColor?.toString(16)}`}
              />
            </>
            <AgoraDivider />
            <AgoraView style={styles.container}>
              <AgoraTextInput
                style={AgoraStyle.fullSize}
                onChangeText={(text) => {
                  if (isNaN(+text)) return;
                  this.setState({
                    width: text === '' ? this.createState().width : +text,
                  });
                }}
                keyboardType={
                  Platform.OS === 'android'
                    ? 'numeric'
                    : 'numbers-and-punctuation'
                }
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
                keyboardType={
                  Platform.OS === 'android'
                    ? 'numeric'
                    : 'numbers-and-punctuation'
                }
                placeholder={`height (defaults: ${this.createState().height})`}
              />
            </AgoraView>
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  videoBitrate:
                    text === '' ? this.createState().videoBitrate : +text,
                });
              }}
              keyboardType={
                Platform.OS === 'android'
                  ? 'numeric'
                  : 'numbers-and-punctuation'
              }
              placeholder={`videoBitrate (defaults: ${
                this.createState().videoBitrate
              })`}
            />
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  videoFramerate:
                    text === '' ? this.createState().videoFramerate : +text,
                });
              }}
              keyboardType={
                Platform.OS === 'android'
                  ? 'numeric'
                  : 'numbers-and-punctuation'
              }
              placeholder={`videoFramerate (defaults: ${
                this.createState().videoFramerate
              })`}
            />
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  videoGop: text === '' ? this.createState().videoGop : +text,
                });
              }}
              keyboardType={
                Platform.OS === 'android'
                  ? 'numeric'
                  : 'numbers-and-punctuation'
              }
              placeholder={`videoGop (defaults: ${
                this.createState().videoGop
              })`}
            />
            <AgoraDropdown
              title={'videoCodecProfile'}
              items={enumToItems(VideoCodecProfileType)}
              value={videoCodecProfile}
              onValueChange={(value) => {
                this.setState({ videoCodecProfile: value });
              }}
            />
            <AgoraDivider />
            <AgoraDropdown
              title={'videoCodecType'}
              items={enumToItems(VideoCodecTypeForStream)}
              value={videoCodecType}
              onValueChange={(value) => {
                this.setState({ videoCodecType: value });
              }}
            />
            <AgoraDivider />
            <AgoraTextInput
              onChangeText={(text) => {
                this.setState({ watermarkUrl: text });
              }}
              placeholder={'watermarkUrl'}
              value={watermarkUrl}
            />
            <AgoraTextInput
              onChangeText={(text) => {
                this.setState({ backgroundImageUrl: text });
              }}
              placeholder={'backgroundImageUrl'}
              value={backgroundImageUrl}
            />
            <AgoraDropdown
              title={'audioSampleRate'}
              items={enumToItems(AudioSampleRateType)}
              value={audioSampleRate}
              onValueChange={(value) => {
                this.setState({ audioSampleRate: value });
              }}
            />
            <AgoraDivider />
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                this.setState({
                  audioBitrate:
                    text === '' ? this.createState().audioBitrate : +text,
                });
              }}
              keyboardType={
                Platform.OS === 'android'
                  ? 'numeric'
                  : 'numbers-and-punctuation'
              }
              placeholder={`audioBitrate (defaults: ${
                this.createState().audioBitrate
              })`}
            />
            <AgoraSlider
              title={`audioChannels ${audioChannels}`}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={audioChannels}
              onSlidingComplete={(value) => {
                this.setState({ audioChannels: value });
              }}
            />
            <AgoraDivider />
            <AgoraDropdown
              title={'audioCodecProfile'}
              items={enumToItems(AudioCodecProfileType)}
              value={audioCodecProfile}
              onValueChange={(value) => {
                this.setState({ audioCodecProfile: value });
              }}
            />
          </>
        ) : undefined}
        <AgoraDivider />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const {
      joinChannelSuccess,
      startRtmpStreamWithTranscoding,
      startRtmpStream,
    } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`${startRtmpStream ? 'stop' : 'start'} Rtmp Stream`}
          onPress={startRtmpStream ? this.stopRtmpStream : this.startRtmpStream}
        />
        <AgoraButton
          disabled={!startRtmpStreamWithTranscoding || !startRtmpStream}
          title={`update Rtmp Transcoding`}
          onPress={this.updateRtmpTranscoding}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    width: '100%',
    height: 200,
  },
  image: {
    width: 120,
    height: 120,
  },
});
