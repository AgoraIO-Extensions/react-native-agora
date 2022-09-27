import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  EncodedVideoFrameInfo,
  ExternalVideoSourceType,
  IRtcEngineEventHandler,
  IRtcEngineEx,
  IVideoEncodedFrameObserver,
  RtcConnection,
  VideoCodecType,
  VideoFrameType,
} from 'react-native-agora';
import { Buffer } from 'buffer';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import { AgoraButton, AgoraTextInput } from '../../../components/ui';

interface State extends BaseVideoComponentState {
  imageBuffer: string;
}

export default class EncodedVideoFrame
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler, IVideoEncodedFrameObserver
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
      imageBuffer: '',
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
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_screen_capture_extension');
    }

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    this.registerVideoEncodedFrameObserver();
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
   * Step 3-1: registerVideoEncodedFrameObserver
   */
  registerVideoEncodedFrameObserver = () => {
    this.engine?.getMediaEngine().registerVideoEncodedFrameObserver(this);
  };

  /**
   * Step 3-2: setExternalVideoSource
   */
  setExternalVideoSource = () => {
    this.engine
      ?.getMediaEngine()
      .setExternalVideoSource(
        true,
        false,
        ExternalVideoSourceType.EncodedVideoFrame,
        {
          codecType: VideoCodecType.VideoCodecGeneric,
        }
      );
  };

  /**
   * Step 3-3: pushEncodedVideoImage
   */
  pushEncodedVideoImage = () => {
    const { imageBuffer } = this.state;
    if (!imageBuffer) {
      this.error('imageBuffer is invalid');
      return;
    }

    const buffer = Buffer.from(imageBuffer);
    this.engine?.getMediaEngine().pushEncodedVideoImage(buffer, buffer.length, {
      framesPerSecond: 60,
      codecType: VideoCodecType.VideoCodecGeneric,
      frameType: VideoFrameType.VideoFrameTypeKeyFrame,
    });
  };

  /**
   * Step 3-4: unregisterVideoEncodedFrameObserver
   */
  unregisterVideoEncodedFrameObserver = () => {
    this.engine?.getMediaEngine().unregisterVideoEncodedFrameObserver(this);
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
    this.unregisterVideoEncodedFrameObserver();
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    super.onUserJoined(connection, remoteUid, elapsed);
    // ⚠️ subscribe encoded frame only
    this.engine?.setRemoteVideoSubscriptionOptions(remoteUid, {
      encodedFrameOnly: true,
    });
  }

  onEncodedVideoFrameReceived(
    uid: number,
    imageBuffer: Uint8Array,
    length: number,
    videoEncodedFrameInfo: EncodedVideoFrameInfo
  ): boolean {
    this.info(
      'OnEncodedVideoFrameReceived',
      'uid',
      uid,
      'imageBuffer',
      imageBuffer,
      'length',
      length,
      'videoEncodedFrameInfo',
      videoEncodedFrameInfo
    );
    if (videoEncodedFrameInfo.codecType === VideoCodecType.VideoCodecGeneric) {
      this.alert(`Receive from uid:${uid}`, `${imageBuffer.toString()}`);
    }
    return true;
  }

  protected renderConfiguration(): React.ReactNode {
    const { imageBuffer } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ imageBuffer: text });
          }}
          placeholder={`imageBuffer`}
          value={imageBuffer}
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
          title={`push Encoded Video Image`}
          onPress={this.pushEncodedVideoImage}
        />
      </>
    );
  }
}
