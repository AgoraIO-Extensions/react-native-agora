import React, { ReactElement } from 'react';
import { NativeModules, Platform } from 'react-native';
import {
  CameraDirection,
  CameraFocalLengthType,
  ChannelProfileType,
  ClientRoleType,
  ErrorCodeType,
  IRtcEngineEventHandler,
  LocalVideoEventType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
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
  AgoraText,
  AgoraTextInput,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { enumToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

import {
  NativeCameraZoomRange,
  UltraWidePlan,
  queryUltraWidePlan,
  startUltraWidePreview,
} from './ultraWideCamera';

interface State extends BaseVideoComponentState {
  cameraDirection: CameraDirection;
  cameraFocalLengthType: CameraFocalLengthType;
  followEncodeDimensionRatio: boolean;
  formatWidth: number;
  formatHeight: number;
  formatFps: number;
  demoReady: boolean;
  demoBusy: boolean;
  demoStatus: string;
}

export default class CameraCapturerConfiguration
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  private demoGeneration = 0;
  private demoStarting = false;
  private demoPlan?: UltraWidePlan;

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
      demoReady: false,
      demoBusy: false,
      demoStatus:
        'Start the Android ultra-wide demo without joining a channel.',
    };
  }

  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      this.error('appId is invalid');
      this.setState({ demoStatus: 'Configure a valid Agora App ID first.' });
      return;
    }

    this.engine = createAgoraRtcEngine();
    const initialized = this.engine.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    if (initialized !== 0) {
      this.setState({ demoStatus: `initialize failed: ${initialized}` });
      return;
    }
    this.engine.registerEventHandler(this);

    const generation = this.demoGeneration;
    try {
      await askMediaAccess([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
      if (generation !== this.demoGeneration) return;
      const enabled = this.engine.enableVideo();
      this.setState({
        demoReady: enabled === 0,
        demoStatus:
          enabled === 0
            ? 'Ready. Use the rear camera to test ultra-wide capture.'
            : `enableVideo failed: ${enabled}`,
      });
    } catch (error) {
      if (generation === this.demoGeneration) {
        this.setState({ demoStatus: String(error) });
      }
    }
  }

  protected async startUltraWideDemo() {
    if (
      Platform.OS !== 'android' ||
      !this.engine ||
      !this.state.demoReady ||
      this.demoStarting ||
      this.state.startPreview ||
      this.state.joinChannelSuccess
    )
      return;
    this.demoStarting = true;
    const generation = ++this.demoGeneration;
    this.setState({
      demoBusy: true,
      demoStatus: 'Querying SDK rear-camera capability…',
    });
    try {
      const plan = await queryUltraWidePlan(this.engine, async () => {
        const native = NativeModules.CameraCapabilities;
        if (!native?.getRearCameraZoomRanges) {
          throw new Error(
            'Camera metadata bridge is unavailable. Rebuild the Android Demo.'
          );
        }
        const cameras: NativeCameraZoomRange[] =
          await native.getRearCameraZoomRanges();
        this.info('Camera2 rear camera zoom ranges', cameras);
        return cameras;
      });
      if (generation !== this.demoGeneration) return;
      this.demoPlan = plan;
      this.info('Ultra-wide plan', plan);
      this.setState({
        demoStatus:
          plan.mode === 'focal'
            ? 'SDK supports rear ultra-wide. Waiting for CameraFocalLengthApplied; FallbackToDefault is a failure.'
            : `SDK reports no rear ultra-wide. Native camera ${plan.configuration.cameraId} supports ${plan.zoom}x. Starting preview; no focal-length callback is required.`,
      });
      startUltraWidePreview(this.engine, plan);
      this.setState({ startPreview: true });
    } catch (error) {
      if (generation !== this.demoGeneration) return;
      this.demoPlan = undefined;
      this.engine?.stopPreview();
      this.setState({ startPreview: false, demoStatus: String(error) });
      this.error('Ultra-wide demo', error);
    } finally {
      if (generation === this.demoGeneration) {
        this.demoStarting = false;
        this.setState({ demoBusy: false });
      }
    }
  }

  protected stopUltraWideDemo() {
    ++this.demoGeneration;
    this.demoStarting = false;
    this.demoPlan = undefined;
    this.engine?.stopPreview();
    this.setState({
      startPreview: false,
      demoBusy: false,
      demoStatus: 'Stopped. Ready to query again.',
    });
  }

  protected applyDemoZoom(factor: number) {
    if (this.demoPlan?.mode !== 'zoom') return;
    const result = this.engine?.setCameraZoomFactor(factor);
    this.info('setCameraZoomFactor', factor, 'result', result);
    this.setState({
      demoStatus:
        result === 0
          ? `Zoom ${factor}x accepted (return 0). Compare the preview against 1x; no focal-length callback is required.`
          : `setCameraZoomFactor(${factor}) failed: ${result}`,
    });
  }

  onLocalVideoStateChanged(
    source: VideoSourceType,
    state: LocalVideoStreamState,
    reason: LocalVideoStreamReason
  ) {
    this.info('onLocalVideoStateChanged', source, state, reason);
    if (source !== VideoSourceType.VideoSourceCamera || !this.demoPlan) return;
    if (state === LocalVideoStreamState.LocalVideoStreamStateFailed) {
      this.setState({
        demoStatus: `Camera capture failed: ${LocalVideoStreamReason[reason]} (${reason})`,
      });
    } else if (
      state === LocalVideoStreamState.LocalVideoStreamStateCapturing &&
      this.demoPlan.mode === 'zoom'
    ) {
      // Apply once capture is ready; never wait for a focal-length callback on this path.
      this.applyDemoZoom(this.demoPlan.zoom);
    }
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
    ++this.demoGeneration;
    this.demoPlan = undefined;
    this.engine?.stopPreview();
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
    if (
      source === VideoSourceType.VideoSourceCamera &&
      this.demoPlan?.mode === 'focal'
    ) {
      if (
        event ===
        LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthApplied
      ) {
        this.setState({
          demoStatus:
            'CameraFocalLengthApplied (5): SDK confirmed rear ultra-wide was applied. Verify the preview.',
        });
      } else if (
        event ===
        LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthFallbackToDefault
      ) {
        this.setState({
          demoStatus:
            'CameraFocalLengthFallbackToDefault (6): ultra-wide failed; SDK fell back to the default camera.',
        });
      }
    }
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
          disabled={this.demoStarting || !!this.demoPlan}
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
        {Platform.OS === 'android' && (
          <>
            <AgoraText>
              {'Android ultra-wide / Pixel zoom demo (rear camera)'}
            </AgoraText>
            <AgoraText>{this.state.demoStatus}</AgoraText>
            <AgoraButton
              title={'Query capability and start ultra-wide preview'}
              disabled={
                !this.state.demoReady || this.state.demoBusy || !editable
              }
              onPress={() => this.startUltraWideDemo()}
            />
            <AgoraButton
              title={'Stop ultra-wide demo'}
              disabled={!this.state.demoBusy && !this.demoPlan}
              onPress={() => this.stopUltraWideDemo()}
            />
            {startPreview && this.demoPlan?.mode === 'zoom' && (
              <>
                <AgoraButton
                  title={'Compare: 1x'}
                  onPress={() => this.applyDemoZoom(1)}
                />
                <AgoraButton
                  title={`Apply native minimum: ${this.demoPlan.zoom}x`}
                  onPress={() => {
                    if (this.demoPlan?.mode === 'zoom')
                      this.applyDemoZoom(this.demoPlan.zoom);
                  }}
                />
              </>
            )}
            <AgoraDivider />
          </>
        )}
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
