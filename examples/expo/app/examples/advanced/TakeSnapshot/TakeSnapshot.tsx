import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  RtcConnection,
  createAgoraRtcEngine,
} from 'react-native-agora';
import RNFS from 'react-native-fs';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraImage,
  AgoraStyle,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { arrayToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseVideoComponentState {
  targetUid: number;
  filePath: string;
  takeSnapshot: boolean;
}

export default class TakeSnapshot
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  _timestamp: number = 0;

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
      targetUid: 0,
      filePath: `${
        Platform.OS === 'android'
          ? RNFS.ExternalCachesDirectoryPath
          : RNFS.DocumentDirectoryPath
      }`,
      takeSnapshot: false,
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
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone and camera permission
    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);

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
   * Step 3: takeSnapshot
   */
  takeSnapshot = () => {
    const { targetUid, filePath } = this.state;
    if (!filePath) {
      this.error('filePath is invalid');
      return;
    }

    this._timestamp = new Date().getTime();
    this.engine?.takeSnapshot(
      targetUid,
      `${filePath}/${targetUid}-${this._timestamp}.jpg`
    );
    this.setState({ takeSnapshot: false });
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

  onSnapshotTaken(
    connection: RtcConnection,
    uid: number,
    filePath: string,
    width: number,
    height: number,
    errCode: number
  ) {
    this.info(
      'onSnapshotTaken',
      'connection',
      connection,
      'uid',
      uid,
      'filePath',
      filePath,
      'width',
      width,
      'height',
      height,
      'errCode',
      errCode
    );
    const { targetUid, filePath: path } = this.state;
    if (filePath === `${path}/${targetUid}-${this._timestamp}.jpg`) {
      this.setState({ takeSnapshot: errCode === ErrorCodeType.ErrOk });
    }
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { remoteUsers, targetUid, filePath, takeSnapshot } = this.state;
    return (
      <>
        <AgoraDropdown
          title={'targetUid'}
          items={arrayToItems([0, ...remoteUsers])}
          value={targetUid}
          onValueChange={(value) => {
            this.setState({ targetUid: value, takeSnapshot: false });
          }}
        />
        {takeSnapshot ? (
          <>
            <AgoraDivider />
            <AgoraImage
              style={AgoraStyle.image}
              source={{
                uri: `${
                  Platform.OS === 'android' ? 'file://' : ''
                }${filePath}/${targetUid}-${this._timestamp}.jpg`,
              }}
            />
          </>
        ) : undefined}
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraButton
          disabled={!joinChannelSuccess}
          title={`take Snapshot`}
          onPress={this.takeSnapshot}
        />
      </>
    );
  }
}
