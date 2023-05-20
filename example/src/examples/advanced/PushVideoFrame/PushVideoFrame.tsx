import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  ExternalVideoSourceType,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  VideoBufferType,
  VideoPixelFormat,
} from 'react-native-agora';
// @ts-ignore
import ImageTools from 'react-native-image-tool';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraImage,
  AgoraTextInput,
} from '../../../components/ui';
import { getAbsolutePath, getAssetPath } from '../../../utils';

interface State extends BaseVideoComponentState {
  filePath: string;
}

export default class PushVideoFrame
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  // @ts-ignore
  protected engine?: IRtcEngineEx;

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
      filePath: getAssetPath('agora-logo.png'),
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
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    this.setExternalVideoSource();
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
      publishCameraTrack: false,
      publishEncodedVideoTrack: true,
    });
  }

  /**
   * Step 3-1: setExternalVideoSource
   */
  setExternalVideoSource = () => {
    this.engine
      ?.getMediaEngine()
      .setExternalVideoSource(true, false, ExternalVideoSourceType.VideoFrame);
  };

  /**
   * Step 3-2: pushVideoFrame
   */
  pushVideoFrame = () => {
    const { filePath } = this.state;
    if (!filePath) {
      this.error('filePath is invalid');
      return;
    }

    getAbsolutePath(filePath).then((path) => {
      ImageTools.GetImageRGBAs(path).then((value: any) => {
        console.log(value);
        this.engine?.getMediaEngine().pushVideoFrame({
          type: VideoBufferType.VideoBufferRawData,
          format: VideoPixelFormat.VideoPixelRgba,
          buffer: value.rgba,
          stride: value.width,
          height: value.height,
        });
      });
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
    this.engine?.release();
  }

  protected renderConfiguration(): React.ReactNode {
    const { filePath } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ filePath: text });
          }}
          placeholder={`filePath`}
          value={filePath}
        />
        <AgoraImage
          style={styles.image}
          source={{
            uri: `${
              Platform.OS === 'android'
                ? filePath.replace('/assets/', 'asset:/')
                : filePath
            }`,
          }}
        />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
    const { joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`push Video Frame`}
          onPress={this.pushVideoFrame}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
  },
});
