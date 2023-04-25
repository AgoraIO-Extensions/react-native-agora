import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Platform } from 'react-native';
import {
  ClientRoleType,
  LocalVideoStreamError,
  LocalVideoStreamState,
  PermissionType,
  RenderModeType,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  UserOfflineReasonType,
  VideoCanvas,
  VideoContentHint,
  VideoSourceType,
  showRPSystemBroadcastPickerView,
} from 'react-native-agora';

import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSlider,
  AgoraStyle,
  AgoraSwitch,
  AgoraTextInput,
  AgoraView,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import BaseRenderUsers from '../components/BaseRenderUsers';
import useInitRtcEngine from '../hooks/useInitRtcEngine';

export default function ScreenShare() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(enableVideo);
  const [token2] = useState<string>('');
  const [uid2, setUid2] = useState<number>(0);
  const [captureAudio, setCaptureAudio] = useState<boolean>(false);
  const [sampleRate, setSampleRate] = useState<number>(16000);
  const [channels, setChannels] = useState<number>(2);
  const [captureSignalVolume, setCaptureSignalVolume] = useState<number>(100);
  const [captureVideo, setCaptureVideo] = useState<boolean>(true);

  const [width, setWidth] = useState<number>(1280);
  const [height, setHeight] = useState<number>(720);
  const [frameRate, setFrameRate] = useState<number>(15);
  const [bitrate, setBitrate] = useState<number>(0);
  const [contentHint, setContentHint] = useState<VideoContentHint>(
    VideoContentHint.ContentHintMotion
  );
  const [startScreenCapture, setStartScreenCapture] = useState<boolean>(false);
  const [publishScreenCapture, setPublishScreenCapture] =
    useState<boolean>(false);

  /**
   * Step 2: joinChannel
   */
  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    engine.current.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  /**
   * Step 3-1: startScreenCapture
   */
  const _startScreenCapture = async () => {
    engine.current.startScreenCapture({
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
    engine.current.startPreview(VideoSourceType.VideoSourceScreen);

    if (Platform.OS === 'ios') {
      // Show the picker view for screen share, ⚠️ only support for iOS 12+
      await showRPSystemBroadcastPickerView(true);
    }

    if (captureAudio && !captureVideo) {
      setStartScreenCapture(true);
    }
  };

  /**
   * Step 3-2 (Optional): updateScreenCaptureParameters
   */
  const updateScreenCaptureParameters = () => {
    engine.current.updateScreenCapture({
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
      setStartScreenCapture(false);
    } else {
      // ⚠️ You should updateChannelMediaOptionsEx if you change captureAudio or captureVideo
      if (publishScreenCapture) {
        engine.current.updateChannelMediaOptionsEx(
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
  const _publishScreenCapture = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid2 <= 0) {
      log.error('uid2 is invalid');
      return;
    }

    // publish screen share stream
    engine.current.joinChannelEx(
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
  const stopScreenCapture = useCallback(() => {
    engine.current.stopScreenCapture();
    setStartScreenCapture(false);
  }, [engine]);

  /**
   * Step 3-5: unpublishScreenCapture
   */
  const unpublishScreenCapture = () => {
    engine.current.leaveChannelEx({ channelId, localUid: uid2 });
  };

  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  useEffect(() => {
    engine.current.addListener(
      'onJoinChannelSuccess',
      (connection: RtcConnection, elapsed: number) => {
        if (connection.localUid === uid2) {
          log.info(
            'onJoinChannelSuccess',
            'connection',
            connection,
            'elapsed',
            elapsed
          );
          setPublishScreenCapture(true);
          return;
        }
      }
    );

    engine.current.addListener(
      'onLeaveChannel',
      (connection: RtcConnection, stats: RtcStats) => {
        log.info('onLeaveChannel', 'connection', connection, 'stats', stats);
        if (connection.localUid === uid2) {
          setPublishScreenCapture(false);
          return;
        }
      }
    );

    engine.current.addListener(
      'onUserJoined',
      (connection: RtcConnection, remoteUid: number, elapsed: number) => {
        if (connection.localUid === uid2 || remoteUid === uid2) {
          // ⚠️ mute the streams from screen sharing
          engine.current.muteRemoteAudioStream(uid2, true);
          engine.current.muteRemoteVideoStream(uid2, true);
          return;
        }
      }
    );

    engine.current.addListener(
      'onUserOffline',
      (
        connection: RtcConnection,
        remoteUid: number,
        reason: UserOfflineReasonType
      ) => {
        if (connection.localUid === uid2 || remoteUid === uid2) return;
      }
    );

    engine.current.addListener(
      'onPermissionError',
      (permissionType: PermissionType) => {
        log.info('onPermissionError', 'permissionType', permissionType);
        // ⚠️ You should call stopScreenCapture if received the event with permissionType ScreenCapture,
        // otherwise you can not startScreenCapture again
        stopScreenCapture();
        setStartScreenCapture(false);
      }
    );

    engine.current.addListener(
      'onLocalVideoStateChanged',
      (
        source: VideoSourceType,
        state: LocalVideoStreamState,
        error: LocalVideoStreamError
      ) => {
        log.info(
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
              setStartScreenCapture(true);
              break;
          }
        }
      }
    );

    const engineCopy = engine.current;
    return () => {
      engineCopy.removeAllListeners();
    };
  }, [engine, stopScreenCapture, uid2]);

  return (
    <BaseComponent
      name={'ScreenShare'}
      renderConfiguration={renderConfiguration}
      renderChannel={() => (
        <BaseRenderChannel
          channelId={channelId}
          joinChannel={joinChannel}
          leaveChannel={leaveChannel}
          joinChannelSuccess={joinChannelSuccess}
          onChannelIdChange={setChannelId}
        />
      )}
      renderUsers={renderUsers}
      renderAction={renderAction}
    />
  );

  function renderUsers(): ReactNode {
    return (
      <>
        <BaseRenderUsers
          enableVideo={enableVideo}
          joinChannelSuccess={joinChannelSuccess}
          remoteUsers={remoteUsers}
          renderVideo={renderVideo}
          startPreview={startPreview}
        />
        {startScreenCapture ? (
          <RtcSurfaceView
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

  function renderVideo(user: VideoCanvas): ReactElement {
    return (
      <RtcSurfaceView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={{ ...user, renderMode: RenderModeType.RenderModeFit }}
      />
    );
  }

  function renderConfiguration(): ReactNode {
    return (
      <>
        <AgoraTextInput
          editable={!publishScreenCapture}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            setUid2(text === '' ? uid2 : +text);
          }}
          numberKeyboard={true}
          placeholder={`uid2 (must > 0)`}
          value={uid2 > 0 ? uid2.toString() : ''}
        />
        <AgoraSwitch
          title={`captureAudio`}
          value={captureAudio}
          onValueChange={(value) => {
            setCaptureAudio(value);
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
                    setSampleRate(text === '' ? sampleRate : +text);
                  }}
                  numberKeyboard={true}
                  placeholder={`sampleRate (defaults: ${sampleRate})`}
                />
                <AgoraTextInput
                  onChangeText={(text) => {
                    if (isNaN(+text)) return;
                    setChannels(text === '' ? channels : +text);
                  }}
                  numberKeyboard={true}
                  placeholder={`channels (defaults: ${channels})`}
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
                setCaptureSignalVolume(value);
              }}
            />
            <AgoraDivider />
          </>
        ) : undefined}
        <AgoraSwitch
          title={`captureVideo`}
          value={captureVideo}
          onValueChange={(value) => {
            setCaptureVideo(value);
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
                  setWidth(text === '' ? width : +text);
                }}
                numberKeyboard={true}
                placeholder={`width (defaults: ${width})`}
              />
              <AgoraTextInput
                style={AgoraStyle.fullSize}
                onChangeText={(text) => {
                  if (isNaN(+text)) return;
                  setHeight(text === '' ? height : +text);
                }}
                numberKeyboard={true}
                placeholder={`height (defaults: ${height})`}
              />
            </AgoraView>
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                setFrameRate(text === '' ? frameRate : +text);
              }}
              numberKeyboard={true}
              placeholder={`frameRate (defaults: ${frameRate})`}
            />
            <AgoraTextInput
              onChangeText={(text) => {
                if (isNaN(+text)) return;
                setBitrate(text === '' ? bitrate : +text);
              }}
              numberKeyboard={true}
              placeholder={`bitrate (defaults: ${bitrate})`}
            />
            <AgoraDropdown
              title={'contentHint'}
              items={enumToItems(VideoContentHint)}
              value={contentHint}
              onValueChange={(value) => {
                setContentHint(value);
              }}
            />
          </>
        ) : undefined}
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          title={`${startScreenCapture ? 'stop' : 'start'} Screen Capture`}
          onPress={startScreenCapture ? stopScreenCapture : _startScreenCapture}
        />
        <AgoraButton
          disabled={!startScreenCapture}
          title={'updateScreenCaptureParameters'}
          onPress={updateScreenCaptureParameters}
        />
        <AgoraButton
          title={`${
            publishScreenCapture ? 'unpublish' : 'publish'
          } Screen Capture`}
          onPress={
            publishScreenCapture
              ? unpublishScreenCapture
              : _publishScreenCapture
          }
        />
      </>
    );
  }
}
