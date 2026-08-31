import React, { ReactElement } from 'react';
import {
  CameraDirection,
  CameraFocalLengthType,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalVideoEventType,
  RtcConnection,
  RtcStats,
  UserOfflineReasonType,
  VideoSourceType,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraSwitch,
  AgoraTextInput,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { enumToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseVideoComponentState {
  cameraDirection: CameraDirection;
  cameraFocalLengthType: CameraFocalLengthType;
  followEncodeDimensionRatio: boolean;
  formatWidth: number;
  formatHeight: number;
  formatFps: number;
}

export default class CameraCapturerConfiguration
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
      cameraDirection: CameraDirection.CameraFront,
      cameraFocalLengthType: CameraFocalLengthType.CameraFocalLengthDefault,
      followEncodeDimensionRatio: true,
      formatWidth: 960,
      formatHeight: 540,
      formatFps: 15,
    };
  }

  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      this.error('appId is invalid');
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);
    this.engine.enableVideo();
  }

  protected joinChannel() {
    const {
      cameraDirection,
      cameraFocalLengthType,
      channelId,
      followEncodeDimensionRatio,
      formatFps,
      formatHeight,
      formatWidth,
      token,
      uid,
    } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      this.error('uid is invalid');
      return;
    }

    const configuration = {
      cameraDirection,
      cameraFocalLengthType,
      followEncodeDimensionRatio,
      format: {
        width: formatWidth,
        height: formatHeight,
        fps: formatFps,
      },
    };
    const result = this.engine?.setCameraCapturerConfiguration(configuration);
    this.info(
      'setCameraCapturerConfiguration',
      'configuration',
      configuration,
      'result',
      result
    );

    this.engine?.startPreview();
    this.setState({ startPreview: true });
    this.engine?.joinChannel(token, channelId, uid, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  protected leaveChannel() {
    this.engine?.stopPreview();
    this.engine?.leaveChannel();
    this.setState({ startPreview: false });
  }

  protected releaseRtcEngine() {
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onError(err: ErrorCodeType, msg: string) {
    super.onError(err, msg);
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    super.onJoinChannelSuccess(connection, elapsed);
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    super.onLeaveChannel(connection, stats);
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    super.onUserJoined(connection, remoteUid, elapsed);
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    super.onUserOffline(connection, remoteUid, reason);
  }

  onLocalVideoEvent(source: VideoSourceType, event: LocalVideoEventType) {
    this.info(
      'onLocalVideoEvent',
      'source',
      source,
      'sourceName',
      VideoSourceType[source],
      'event',
      event,
      'eventName',
      LocalVideoEventType[event]
    );
  }

  protected renderChannel(): ReactElement | undefined {
    const { channelId, joinChannelSuccess, uid } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ channelId: text });
          }}
          placeholder={'channelId'}
          value={channelId}
        />
        <AgoraTextInput
          editable={!joinChannelSuccess}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              uid: text === '' ? this.createState().uid : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={'uid'}
          value={uid.toString()}
        />
        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
      </>
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    const {
      cameraDirection,
      cameraFocalLengthType,
      followEncodeDimensionRatio,
      joinChannelSuccess,
      startPreview,
    } = this.state;
    const editable = !startPreview && !joinChannelSuccess;
    return (
      <>
        <AgoraDropdown
          enabled={editable}
          title={'cameraDirection'}
          items={enumToItems(CameraDirection)}
          value={cameraDirection}
          onValueChange={(value) => {
            this.setState({ cameraDirection: value });
          }}
        />
        <AgoraDivider />
        <AgoraDropdown
          enabled={editable}
          title={'cameraFocalLengthType'}
          items={enumToItems(CameraFocalLengthType)}
          value={cameraFocalLengthType}
          onValueChange={(value) => {
            this.setState({ cameraFocalLengthType: value });
          }}
        />
        <AgoraDivider />
        <AgoraSwitch
          disabled={!editable}
          title={'followEncodeDimensionRatio'}
          value={followEncodeDimensionRatio}
          onValueChange={(value) => {
            this.setState({ followEncodeDimensionRatio: value });
          }}
        />
        <AgoraDivider />
        <AgoraTextInput
          editable={editable}
          numberKeyboard={true}
          placeholder={`format.width (default: ${
            this.createState().formatWidth
          })`}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              formatWidth: text === '' ? this.createState().formatWidth : +text,
            });
          }}
        />
        <AgoraTextInput
          editable={editable}
          numberKeyboard={true}
          placeholder={`format.height (default: ${
            this.createState().formatHeight
          })`}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              formatHeight:
                text === '' ? this.createState().formatHeight : +text,
            });
          }}
        />
        <AgoraTextInput
          editable={editable}
          numberKeyboard={true}
          placeholder={`format.fps (default: ${this.createState().formatFps})`}
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              formatFps: text === '' ? this.createState().formatFps : +text,
            });
          }}
        />
      </>
    );
  }
}
