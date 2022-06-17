import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  LocalVideoStreamError,
  LocalVideoStreamState,
  RtcConnection,
  RtcSurfaceView,
  RtcTextureView,
  VideoViewSetupMode,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import Config from '../../../config/agora.config.json';
import { PickerView } from '../../../components/PickerView';
import { ActionItem } from '../../../components/ActionItem';

interface State extends BaseVideoComponentState {
  switchCamera: boolean;
  renderByTextureView: boolean;
  setupMode: VideoViewSetupMode;
}

export default class JoinChannelVideo
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
      setupMode: VideoViewSetupMode.VideoViewSetupReplace,
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
   * Step 3 (Optional): switchCamera
   */
  switchCamera = () => {
    const { switchCamera } = this.state;
    this.engine?.switchCamera();
    this.setState({ switchCamera: !switchCamera });
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

  onVideoDeviceStateChanged(
    deviceId: string,
    deviceType: number,
    deviceState: number
  ) {
    this.info(
      'onVideoDeviceStateChanged',
      'deviceId',
      deviceId,
      'deviceType',
      deviceType,
      'deviceState',
      deviceState
    );
  }

  onLocalVideoStateChanged(
    connection: RtcConnection,
    state: LocalVideoStreamState,
    errorCode: LocalVideoStreamError
  ) {
    this.info(
      'onLocalVideoStateChanged',
      'connection',
      connection,
      'state',
      state,
      'errorCode',
      errorCode
    );
  }

  protected renderVideo(): React.ReactNode {
    const {
      startPreview,
      joinChannelSuccess,
      remoteUsers,
      renderByTextureView,
      setupMode,
    } = this.state;

    return (
      <>
        {startPreview || joinChannelSuccess ? (
          renderByTextureView ? (
            <RtcTextureView
              style={STYLES.video}
              canvas={{ uid: 0, setupMode }}
            />
          ) : (
            <RtcSurfaceView
              style={STYLES.video}
              canvas={{ uid: 0, setupMode }}
            />
          )
        ) : undefined}
        {remoteUsers !== undefined && remoteUsers.length > 0 ? (
          <ScrollView horizontal={true} style={STYLES.videoContainer}>
            {remoteUsers.map((value, index) =>
              renderByTextureView ? (
                <RtcTextureView
                  key={`${value}-${index}`}
                  style={STYLES.videoSmall}
                  canvas={{ uid: value, setupMode }}
                />
              ) : (
                <RtcSurfaceView
                  key={`${value}-${index}`}
                  style={STYLES.videoSmall}
                  canvas={{ uid: value, setupMode }}
                />
              )
            )}
          </ScrollView>
        ) : undefined}
      </>
    );
  }

  protected renderBottom(): React.ReactNode {
    const { startPreview, joinChannelSuccess, renderByTextureView, setupMode } =
      this.state;
    return (
      <>
        <ActionItem
          disabled={!startPreview && !joinChannelSuccess}
          title={`renderByTextureView`}
          isShowSwitch={true}
          switchValue={renderByTextureView}
          onSwitchValueChange={(value) => {
            this.setState({ renderByTextureView: value });
          }}
        />
        <Divider />
        <View style={styles.container}>
          <PickerView
            title={'setupMode'}
            type={VideoViewSetupMode}
            selectedValue={setupMode}
            onValueChange={(value: VideoViewSetupMode) => {
              this.setState({ setupMode: value });
            }}
          />
        </View>
        {setupMode === VideoViewSetupMode.VideoViewSetupAdd ? (
          <>
            <Divider />
            {renderByTextureView ? (
              <RtcTextureView
                style={STYLES.videoSmall}
                canvas={{ uid: 0, setupMode }}
              />
            ) : (
              <RtcSurfaceView
                style={STYLES.videoSmall}
                canvas={{ uid: 0, setupMode }}
              />
            )}
          </>
        ) : undefined}
        <Divider />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { startPreview, joinChannelSuccess } = this.state;
    return (
      <>
        <ActionItem
          disabled={!startPreview && !joinChannelSuccess}
          title={`switchCamera`}
          onPress={this.switchCamera}
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
  },
});
