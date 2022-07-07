import { callIrisApi } from '../internal/IrisApiEngine';
import {
  IRtcEngineEventHandler,
  IVideoDeviceManager,
  VideoDeviceInfo,
  IMetadataObserver,
  IDirectCdnStreamingEventHandler,
  IRtcEngine,
  RtcEngineContext,
  SDKBuildInfo,
  ChannelMediaOptions,
  AudioEqualizationBandFrequency,
  AudioReverbType,
  AudioTrackConfig,
  StreamFallbackOptions,
  CameraCapturerConfiguration,
  SIZE,
  ScreenCaptureSourceInfo,
  ScreenCaptureConfiguration,
  PriorityType,
  InjectStreamConfig,
  MetadataType,
  DirectCdnStreamingMediaOptions,
  CloudProxyType,
  LocalAccessPointConfiguration,
  LeaveChannelOptions,
  Metadata,
} from '../IAgoraRtcEngine';
import {
  ChannelProfileType,
  LastmileProbeConfig,
  VideoEncoderConfiguration,
  BeautyOptions,
  VirtualBackgroundSource,
  VideoCanvas,
  VideoStreamType,
  SpatialAudioParams,
  VoiceBeautifierPreset,
  AudioEffectPreset,
  VoiceConversionPreset,
  VideoMirrorModeType,
  EarMonitoringFilterType,
  AudioSessionOperationRestriction,
  Rectangle,
  ScreenCaptureParameters,
  DeviceInfo,
  VideoContentHint,
  LiveTranscoding,
  LocalTranscoderConfiguration,
  VideoSourceType,
  VideoOrientation,
  ConnectionStateType,
  EncryptionConfig,
  UserInfo,
  ChannelMediaRelayConfiguration,
  AudioProfileType,
  FishCorrectionParams,
  ClientRoleType,
  ClientRoleOptions,
  AudioScenarioType,
  AudioRecordingConfiguration,
  SimulcastStreamConfig,
  DataStreamConfig,
  WatermarkOptions,
} from '../AgoraBase';
import {
  MediaSourceType,
  RenderModeType,
  RawAudioFrameOpModeType,
  SnapShotConfig,
  ContentInspectConfig,
  AdvancedAudioOptions,
} from '../AgoraMediaBase';
import { IMediaPlayer } from '../IAgoraMediaPlayer';
import { LogFilterType, LogLevel } from '../IAgoraLog';
import { AgoraRhythmPlayerConfig } from '../IAgoraRhythmPlayer';
import { IAudioDeviceManager } from '../IAudioDeviceManager';

export function processIRtcEngineEventHandler(
  handler: IRtcEngineEventHandler,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onJoinChannelSuccess':
      if (handler.onJoinChannelSuccess !== undefined) {
        handler.onJoinChannelSuccess(jsonParams.connection, jsonParams.elapsed);
      }
      break;

    case 'onRejoinChannelSuccess':
      if (handler.onRejoinChannelSuccess !== undefined) {
        handler.onRejoinChannelSuccess(
          jsonParams.connection,
          jsonParams.elapsed
        );
      }
      break;

    case 'onWarning':
      if (handler.onWarning !== undefined) {
        handler.onWarning(jsonParams.warn, jsonParams.msg);
      }
      break;

    case 'onError':
      if (handler.onError !== undefined) {
        handler.onError(jsonParams.err, jsonParams.msg);
      }
      break;

    case 'onAudioQuality':
      if (handler.onAudioQuality !== undefined) {
        handler.onAudioQuality(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.quality,
          jsonParams.delay,
          jsonParams.lost
        );
      }
      break;

    case 'onLastmileProbeResult':
      if (handler.onLastmileProbeResult !== undefined) {
        handler.onLastmileProbeResult(jsonParams.result);
      }
      break;

    case 'onAudioVolumeIndication':
      if (handler.onAudioVolumeIndication !== undefined) {
        handler.onAudioVolumeIndication(
          jsonParams.connection,
          jsonParams.speakers,
          jsonParams.speakerNumber,
          jsonParams.totalVolume
        );
      }
      break;

    case 'onLeaveChannel':
      if (handler.onLeaveChannel !== undefined) {
        handler.onLeaveChannel(jsonParams.connection, jsonParams.stats);
      }
      break;

    case 'onRtcStats':
      if (handler.onRtcStats !== undefined) {
        handler.onRtcStats(jsonParams.connection, jsonParams.stats);
      }
      break;

    case 'onAudioDeviceStateChanged':
      if (handler.onAudioDeviceStateChanged !== undefined) {
        handler.onAudioDeviceStateChanged(
          jsonParams.deviceId,
          jsonParams.deviceType,
          jsonParams.deviceState
        );
      }
      break;

    case 'onAudioMixingFinished':
      if (handler.onAudioMixingFinished !== undefined) {
        handler.onAudioMixingFinished();
      }
      break;

    case 'onAudioEffectFinished':
      if (handler.onAudioEffectFinished !== undefined) {
        handler.onAudioEffectFinished(jsonParams.soundId);
      }
      break;

    case 'onVideoDeviceStateChanged':
      if (handler.onVideoDeviceStateChanged !== undefined) {
        handler.onVideoDeviceStateChanged(
          jsonParams.deviceId,
          jsonParams.deviceType,
          jsonParams.deviceState
        );
      }
      break;

    case 'onMediaDeviceChanged':
      if (handler.onMediaDeviceChanged !== undefined) {
        handler.onMediaDeviceChanged(jsonParams.deviceType);
      }
      break;

    case 'onNetworkQuality':
      if (handler.onNetworkQuality !== undefined) {
        handler.onNetworkQuality(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.txQuality,
          jsonParams.rxQuality
        );
      }
      break;

    case 'onIntraRequestReceived':
      if (handler.onIntraRequestReceived !== undefined) {
        handler.onIntraRequestReceived(jsonParams.connection);
      }
      break;

    case 'onUplinkNetworkInfoUpdated':
      if (handler.onUplinkNetworkInfoUpdated !== undefined) {
        handler.onUplinkNetworkInfoUpdated(jsonParams.info);
      }
      break;

    case 'onDownlinkNetworkInfoUpdated':
      if (handler.onDownlinkNetworkInfoUpdated !== undefined) {
        handler.onDownlinkNetworkInfoUpdated(jsonParams.info);
      }
      break;

    case 'onLastmileQuality':
      if (handler.onLastmileQuality !== undefined) {
        handler.onLastmileQuality(jsonParams.quality);
      }
      break;

    case 'onFirstLocalVideoFrame':
      if (handler.onFirstLocalVideoFrame !== undefined) {
        handler.onFirstLocalVideoFrame(
          jsonParams.connection,
          jsonParams.width,
          jsonParams.height,
          jsonParams.elapsed
        );
      }
      break;

    case 'onFirstLocalVideoFramePublished':
      if (handler.onFirstLocalVideoFramePublished !== undefined) {
        handler.onFirstLocalVideoFramePublished(
          jsonParams.connection,
          jsonParams.elapsed
        );
      }
      break;

    case 'onVideoSourceFrameSizeChanged':
      if (handler.onVideoSourceFrameSizeChanged !== undefined) {
        handler.onVideoSourceFrameSizeChanged(
          jsonParams.connection,
          jsonParams.sourceType,
          jsonParams.width,
          jsonParams.height
        );
      }
      break;

    case 'onFirstRemoteVideoDecoded':
      if (handler.onFirstRemoteVideoDecoded !== undefined) {
        handler.onFirstRemoteVideoDecoded(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.width,
          jsonParams.height,
          jsonParams.elapsed
        );
      }
      break;

    case 'onVideoSizeChanged':
      if (handler.onVideoSizeChanged !== undefined) {
        handler.onVideoSizeChanged(
          jsonParams.connection,
          jsonParams.uid,
          jsonParams.width,
          jsonParams.height,
          jsonParams.rotation
        );
      }
      break;

    case 'onLocalVideoStateChanged':
      if (handler.onLocalVideoStateChanged !== undefined) {
        handler.onLocalVideoStateChanged(
          jsonParams.connection,
          jsonParams.state,
          jsonParams.errorCode
        );
      }
      break;

    case 'onRemoteVideoStateChanged':
      if (handler.onRemoteVideoStateChanged !== undefined) {
        handler.onRemoteVideoStateChanged(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.state,
          jsonParams.reason,
          jsonParams.elapsed
        );
      }
      break;

    case 'onFirstRemoteVideoFrame':
      if (handler.onFirstRemoteVideoFrame !== undefined) {
        handler.onFirstRemoteVideoFrame(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.width,
          jsonParams.height,
          jsonParams.elapsed
        );
      }
      break;

    case 'onUserJoined':
      if (handler.onUserJoined !== undefined) {
        handler.onUserJoined(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.elapsed
        );
      }
      break;

    case 'onUserOffline':
      if (handler.onUserOffline !== undefined) {
        handler.onUserOffline(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.reason
        );
      }
      break;

    case 'onUserMuteAudio':
      if (handler.onUserMuteAudio !== undefined) {
        handler.onUserMuteAudio(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.muted
        );
      }
      break;

    case 'onUserMuteVideo':
      if (handler.onUserMuteVideo !== undefined) {
        handler.onUserMuteVideo(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.muted
        );
      }
      break;

    case 'onUserEnableVideo':
      if (handler.onUserEnableVideo !== undefined) {
        handler.onUserEnableVideo(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.enabled
        );
      }
      break;

    case 'onUserStateChanged':
      if (handler.onUserStateChanged !== undefined) {
        handler.onUserStateChanged(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.state
        );
      }
      break;

    case 'onUserEnableLocalVideo':
      if (handler.onUserEnableLocalVideo !== undefined) {
        handler.onUserEnableLocalVideo(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.enabled
        );
      }
      break;

    case 'onApiCallExecuted':
      if (handler.onApiCallExecuted !== undefined) {
        handler.onApiCallExecuted(
          jsonParams.err,
          jsonParams.api,
          jsonParams.result
        );
      }
      break;

    case 'onLocalAudioStats':
      if (handler.onLocalAudioStats !== undefined) {
        handler.onLocalAudioStats(jsonParams.connection, jsonParams.stats);
      }
      break;

    case 'onRemoteAudioStats':
      if (handler.onRemoteAudioStats !== undefined) {
        handler.onRemoteAudioStats(jsonParams.connection, jsonParams.stats);
      }
      break;

    case 'onLocalVideoStats':
      if (handler.onLocalVideoStats !== undefined) {
        handler.onLocalVideoStats(jsonParams.connection, jsonParams.stats);
      }
      break;

    case 'onRemoteVideoStats':
      if (handler.onRemoteVideoStats !== undefined) {
        handler.onRemoteVideoStats(jsonParams.connection, jsonParams.stats);
      }
      break;

    case 'onCameraReady':
      if (handler.onCameraReady !== undefined) {
        handler.onCameraReady();
      }
      break;

    case 'onCameraFocusAreaChanged':
      if (handler.onCameraFocusAreaChanged !== undefined) {
        handler.onCameraFocusAreaChanged(
          jsonParams.x,
          jsonParams.y,
          jsonParams.width,
          jsonParams.height
        );
      }
      break;

    case 'onCameraExposureAreaChanged':
      if (handler.onCameraExposureAreaChanged !== undefined) {
        handler.onCameraExposureAreaChanged(
          jsonParams.x,
          jsonParams.y,
          jsonParams.width,
          jsonParams.height
        );
      }
      break;

    case 'onFacePositionChanged':
      if (handler.onFacePositionChanged !== undefined) {
        handler.onFacePositionChanged(
          jsonParams.imageWidth,
          jsonParams.imageHeight,
          jsonParams.vecRectangle,
          jsonParams.vecDistance,
          jsonParams.numFaces
        );
      }
      break;

    case 'onVideoStopped':
      if (handler.onVideoStopped !== undefined) {
        handler.onVideoStopped();
      }
      break;

    case 'onAudioMixingStateChanged':
      if (handler.onAudioMixingStateChanged !== undefined) {
        handler.onAudioMixingStateChanged(
          jsonParams.state,
          jsonParams.errorCode
        );
      }
      break;

    case 'onRhythmPlayerStateChanged':
      if (handler.onRhythmPlayerStateChanged !== undefined) {
        handler.onRhythmPlayerStateChanged(
          jsonParams.state,
          jsonParams.errorCode
        );
      }
      break;

    case 'onConnectionLost':
      if (handler.onConnectionLost !== undefined) {
        handler.onConnectionLost(jsonParams.connection);
      }
      break;

    case 'onConnectionInterrupted':
      if (handler.onConnectionInterrupted !== undefined) {
        handler.onConnectionInterrupted(jsonParams.connection);
      }
      break;

    case 'onConnectionBanned':
      if (handler.onConnectionBanned !== undefined) {
        handler.onConnectionBanned(jsonParams.connection);
      }
      break;

    case 'onStreamMessage':
      if (handler.onStreamMessage !== undefined) {
        handler.onStreamMessage(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.streamId,
          jsonParams.data,
          jsonParams.length,
          jsonParams.sentTs
        );
      }
      break;

    case 'onStreamMessageError':
      if (handler.onStreamMessageError !== undefined) {
        handler.onStreamMessageError(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.streamId,
          jsonParams.code,
          jsonParams.missed,
          jsonParams.cached
        );
      }
      break;

    case 'onRequestToken':
      if (handler.onRequestToken !== undefined) {
        handler.onRequestToken(jsonParams.connection);
      }
      break;

    case 'onTokenPrivilegeWillExpire':
      if (handler.onTokenPrivilegeWillExpire !== undefined) {
        handler.onTokenPrivilegeWillExpire(
          jsonParams.connection,
          jsonParams.token
        );
      }
      break;

    case 'onFirstLocalAudioFramePublished':
      if (handler.onFirstLocalAudioFramePublished !== undefined) {
        handler.onFirstLocalAudioFramePublished(
          jsonParams.connection,
          jsonParams.elapsed
        );
      }
      break;

    case 'onFirstRemoteAudioFrame':
      if (handler.onFirstRemoteAudioFrame !== undefined) {
        handler.onFirstRemoteAudioFrame(
          jsonParams.connection,
          jsonParams.userId,
          jsonParams.elapsed
        );
      }
      break;

    case 'onFirstRemoteAudioDecoded':
      if (handler.onFirstRemoteAudioDecoded !== undefined) {
        handler.onFirstRemoteAudioDecoded(
          jsonParams.connection,
          jsonParams.uid,
          jsonParams.elapsed
        );
      }
      break;

    case 'onLocalAudioStateChanged':
      if (handler.onLocalAudioStateChanged !== undefined) {
        handler.onLocalAudioStateChanged(
          jsonParams.connection,
          jsonParams.state,
          jsonParams.error
        );
      }
      break;

    case 'onRemoteAudioStateChanged':
      if (handler.onRemoteAudioStateChanged !== undefined) {
        handler.onRemoteAudioStateChanged(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.state,
          jsonParams.reason,
          jsonParams.elapsed
        );
      }
      break;

    case 'onActiveSpeaker':
      if (handler.onActiveSpeaker !== undefined) {
        handler.onActiveSpeaker(jsonParams.connection, jsonParams.uid);
      }
      break;

    case 'onContentInspectResult':
      if (handler.onContentInspectResult !== undefined) {
        handler.onContentInspectResult(jsonParams.result);
      }
      break;

    case 'onSnapshotTaken':
      if (handler.onSnapshotTaken !== undefined) {
        handler.onSnapshotTaken(
          jsonParams.connection,
          jsonParams.filePath,
          jsonParams.width,
          jsonParams.height,
          jsonParams.errCode
        );
      }
      break;

    case 'onClientRoleChanged':
      if (handler.onClientRoleChanged !== undefined) {
        handler.onClientRoleChanged(
          jsonParams.connection,
          jsonParams.oldRole,
          jsonParams.newRole
        );
      }
      break;

    case 'onClientRoleChangeFailed':
      if (handler.onClientRoleChangeFailed !== undefined) {
        handler.onClientRoleChangeFailed(
          jsonParams.connection,
          jsonParams.reason,
          jsonParams.currentRole
        );
      }
      break;

    case 'onAudioDeviceVolumeChanged':
      if (handler.onAudioDeviceVolumeChanged !== undefined) {
        handler.onAudioDeviceVolumeChanged(
          jsonParams.deviceType,
          jsonParams.volume,
          jsonParams.muted
        );
      }
      break;

    case 'onRtmpStreamingStateChanged':
      if (handler.onRtmpStreamingStateChanged !== undefined) {
        handler.onRtmpStreamingStateChanged(
          jsonParams.url,
          jsonParams.state,
          jsonParams.errCode
        );
      }
      break;

    case 'onRtmpStreamingEvent':
      if (handler.onRtmpStreamingEvent !== undefined) {
        handler.onRtmpStreamingEvent(jsonParams.url, jsonParams.eventCode);
      }
      break;

    case 'onStreamPublished':
      if (handler.onStreamPublished !== undefined) {
        handler.onStreamPublished(jsonParams.url, jsonParams.error);
      }
      break;

    case 'onStreamUnpublished':
      if (handler.onStreamUnpublished !== undefined) {
        handler.onStreamUnpublished(jsonParams.url);
      }
      break;

    case 'onTranscodingUpdated':
      if (handler.onTranscodingUpdated !== undefined) {
        handler.onTranscodingUpdated();
      }
      break;

    case 'onAudioRoutingChanged':
      if (handler.onAudioRoutingChanged !== undefined) {
        handler.onAudioRoutingChanged(jsonParams.routing);
      }
      break;

    case 'onChannelMediaRelayStateChanged':
      if (handler.onChannelMediaRelayStateChanged !== undefined) {
        handler.onChannelMediaRelayStateChanged(
          jsonParams.state,
          jsonParams.code
        );
      }
      break;

    case 'onChannelMediaRelayEvent':
      if (handler.onChannelMediaRelayEvent !== undefined) {
        handler.onChannelMediaRelayEvent(jsonParams.code);
      }
      break;

    case 'onLocalPublishFallbackToAudioOnly':
      if (handler.onLocalPublishFallbackToAudioOnly !== undefined) {
        handler.onLocalPublishFallbackToAudioOnly(
          jsonParams.isFallbackOrRecover
        );
      }
      break;

    case 'onRemoteSubscribeFallbackToAudioOnly':
      if (handler.onRemoteSubscribeFallbackToAudioOnly !== undefined) {
        handler.onRemoteSubscribeFallbackToAudioOnly(
          jsonParams.uid,
          jsonParams.isFallbackOrRecover
        );
      }
      break;

    case 'onRemoteAudioTransportStats':
      if (handler.onRemoteAudioTransportStats !== undefined) {
        handler.onRemoteAudioTransportStats(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.delay,
          jsonParams.lost,
          jsonParams.rxKBitRate
        );
      }
      break;

    case 'onRemoteVideoTransportStats':
      if (handler.onRemoteVideoTransportStats !== undefined) {
        handler.onRemoteVideoTransportStats(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.delay,
          jsonParams.lost,
          jsonParams.rxKBitRate
        );
      }
      break;

    case 'onConnectionStateChanged':
      if (handler.onConnectionStateChanged !== undefined) {
        handler.onConnectionStateChanged(
          jsonParams.connection,
          jsonParams.state,
          jsonParams.reason
        );
      }
      break;

    case 'onNetworkTypeChanged':
      if (handler.onNetworkTypeChanged !== undefined) {
        handler.onNetworkTypeChanged(jsonParams.connection, jsonParams.type);
      }
      break;

    case 'onEncryptionError':
      if (handler.onEncryptionError !== undefined) {
        handler.onEncryptionError(jsonParams.connection, jsonParams.errorType);
      }
      break;

    case 'onPermissionError':
      if (handler.onPermissionError !== undefined) {
        handler.onPermissionError(jsonParams.permissionType);
      }
      break;

    case 'onLocalUserRegistered':
      if (handler.onLocalUserRegistered !== undefined) {
        handler.onLocalUserRegistered(jsonParams.uid, jsonParams.userAccount);
      }
      break;

    case 'onUserInfoUpdated':
      if (handler.onUserInfoUpdated !== undefined) {
        handler.onUserInfoUpdated(jsonParams.uid, jsonParams.info);
      }
      break;

    case 'onUploadLogResult':
      if (handler.onUploadLogResult !== undefined) {
        handler.onUploadLogResult(
          jsonParams.connection,
          jsonParams.requestId,
          jsonParams.success,
          jsonParams.reason
        );
      }
      break;

    case 'onAudioSubscribeStateChanged':
      if (handler.onAudioSubscribeStateChanged !== undefined) {
        handler.onAudioSubscribeStateChanged(
          jsonParams.channel,
          jsonParams.uid,
          jsonParams.oldState,
          jsonParams.newState,
          jsonParams.elapseSinceLastState
        );
      }
      break;

    case 'onVideoSubscribeStateChanged':
      if (handler.onVideoSubscribeStateChanged !== undefined) {
        handler.onVideoSubscribeStateChanged(
          jsonParams.channel,
          jsonParams.uid,
          jsonParams.oldState,
          jsonParams.newState,
          jsonParams.elapseSinceLastState
        );
      }
      break;

    case 'onAudioPublishStateChanged':
      if (handler.onAudioPublishStateChanged !== undefined) {
        handler.onAudioPublishStateChanged(
          jsonParams.channel,
          jsonParams.oldState,
          jsonParams.newState,
          jsonParams.elapseSinceLastState
        );
      }
      break;

    case 'onVideoPublishStateChanged':
      if (handler.onVideoPublishStateChanged !== undefined) {
        handler.onVideoPublishStateChanged(
          jsonParams.channel,
          jsonParams.oldState,
          jsonParams.newState,
          jsonParams.elapseSinceLastState
        );
      }
      break;

    case 'onExtensionEvent':
      if (handler.onExtensionEvent !== undefined) {
        handler.onExtensionEvent(
          jsonParams.provider,
          jsonParams.ext_name,
          jsonParams.key,
          jsonParams.value
        );
      }
      break;

    case 'onExtensionStarted':
      if (handler.onExtensionStarted !== undefined) {
        handler.onExtensionStarted(jsonParams.provider, jsonParams.ext_name);
      }
      break;

    case 'onExtensionStopped':
      if (handler.onExtensionStopped !== undefined) {
        handler.onExtensionStopped(jsonParams.provider, jsonParams.ext_name);
      }
      break;

    case 'onExtensionErrored':
      if (handler.onExtensionErrored !== undefined) {
        handler.onExtensionErrored(
          jsonParams.provider,
          jsonParams.ext_name,
          jsonParams.error,
          jsonParams.msg
        );
      }
      break;

    case 'onUserAccountUpdated':
      if (handler.onUserAccountUpdated !== undefined) {
        handler.onUserAccountUpdated(
          jsonParams.connection,
          jsonParams.remoteUid,
          jsonParams.userAccount
        );
      }
      break;
  }
}

export class IVideoDeviceManagerImpl implements IVideoDeviceManager {
  enumerateVideoDevices(): VideoDeviceInfo[] {
    const apiType = 'VideoDeviceManager_enumerateVideoDevices';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDevice(deviceIdUTF8: string): number {
    const apiType = 'VideoDeviceManager_setDevice';
    const jsonParams = {
      deviceIdUTF8,
      toJSON: () => {
        return { deviceIdUTF8 };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getDevice(): string {
    const apiType = 'VideoDeviceManager_getDevice';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceIdUTF8 = jsonResults.deviceIdUTF8;
    return deviceIdUTF8;
  }

  startDeviceTest(hwnd: any): number {
    const apiType = 'VideoDeviceManager_startDeviceTest';
    const jsonParams = {
      hwnd,
      toJSON: () => {
        return { hwnd };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopDeviceTest(): number {
    const apiType = 'VideoDeviceManager_stopDeviceTest';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  release(): void {
    const apiType = 'VideoDeviceManager_release';
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }
}

export function processIMetadataObserver(
  handler: IMetadataObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onMetadataReceived':
      if (handler.onMetadataReceived !== undefined) {
        handler.onMetadataReceived(jsonParams.metadata);
      }
      break;
  }
}

export function processIDirectCdnStreamingEventHandler(
  handler: IDirectCdnStreamingEventHandler,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onDirectCdnStreamingStateChanged':
      if (handler.onDirectCdnStreamingStateChanged !== undefined) {
        handler.onDirectCdnStreamingStateChanged(
          jsonParams.state,
          jsonParams.error,
          jsonParams.message
        );
      }
      break;

    case 'onDirectCdnStreamingStats':
      if (handler.onDirectCdnStreamingStats !== undefined) {
        handler.onDirectCdnStreamingStats(jsonParams.stats);
      }
      break;
  }
}

export class IRtcEngineImpl implements IRtcEngine {
  release(sync = false): void {
    const apiType = 'RtcEngine_release';
    const jsonParams = {
      sync,
      toJSON: () => {
        return { sync };
      },
    };
    callIrisApi.call(this, apiType, jsonParams);
  }

  initialize(context: RtcEngineContext): number {
    const apiType = 'RtcEngine_initialize';
    const jsonParams = {
      context,
      toJSON: () => {
        return { context };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getVersion(): SDKBuildInfo {
    const apiType = 'RtcEngine_getVersion';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getErrorDescription(code: number): string {
    const apiType = 'RtcEngine_getErrorDescription';
    const jsonParams = {
      code,
      toJSON: () => {
        return { code };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateChannelMediaOptions(options: ChannelMediaOptions): number {
    const apiType = 'RtcEngine_updateChannelMediaOptions';
    const jsonParams = {
      options,
      toJSON: () => {
        return { options };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  renewToken(token: string): number {
    const apiType = 'RtcEngine_renewToken';
    const jsonParams = {
      token,
      toJSON: () => {
        return { token };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setChannelProfile(profile: ChannelProfileType): number {
    const apiType = 'RtcEngine_setChannelProfile';
    const jsonParams = {
      profile,
      toJSON: () => {
        return { profile };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopEchoTest(): number {
    const apiType = 'RtcEngine_stopEchoTest';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableVideo(): number {
    const apiType = 'RtcEngine_enableVideo';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  disableVideo(): number {
    const apiType = 'RtcEngine_disableVideo';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startLastmileProbeTest(config: LastmileProbeConfig): number {
    const apiType = 'RtcEngine_startLastmileProbeTest';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopLastmileProbeTest(): number {
    const apiType = 'RtcEngine_stopLastmileProbeTest';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVideoEncoderConfiguration(config: VideoEncoderConfiguration): number {
    const apiType = 'RtcEngine_setVideoEncoderConfiguration';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): number {
    const apiType = 'RtcEngine_setBeautyEffectOptions';
    const jsonParams = {
      enabled,
      options,
      type,
      toJSON: () => {
        return {
          enabled,
          options,
          type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource
  ): number {
    const apiType = 'RtcEngine_enableVirtualBackground';
    const jsonParams = {
      enabled,
      backgroundSource,
      toJSON: () => {
        return {
          enabled,
          backgroundSource,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableRemoteSuperResolution(userId: number, enable: boolean): number {
    const apiType = 'RtcEngine_enableRemoteSuperResolution';
    const jsonParams = {
      userId,
      enable,
      toJSON: () => {
        return {
          userId,
          enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setupRemoteVideo(canvas: VideoCanvas): number {
    const apiType = 'RtcEngine_setupRemoteVideo';
    const jsonParams = {
      canvas,
      toJSON: () => {
        return { canvas };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setupLocalVideo(canvas: VideoCanvas): number {
    const apiType = 'RtcEngine_setupLocalVideo';
    const jsonParams = {
      canvas,
      toJSON: () => {
        return { canvas };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableAudio(): number {
    const apiType = 'RtcEngine_enableAudio';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  disableAudio(): number {
    const apiType = 'RtcEngine_disableAudio';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableLocalAudio(enabled: boolean): number {
    const apiType = 'RtcEngine_enableLocalAudio';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteLocalAudioStream(mute: boolean): number {
    const apiType = 'RtcEngine_muteLocalAudioStream';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteAllRemoteAudioStreams(mute: boolean): number {
    const apiType = 'RtcEngine_muteAllRemoteAudioStreams';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDefaultMuteAllRemoteAudioStreams(mute: boolean): number {
    const apiType = 'RtcEngine_setDefaultMuteAllRemoteAudioStreams';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteRemoteAudioStream(uid: number, mute: boolean): number {
    const apiType = 'RtcEngine_muteRemoteAudioStream';
    const jsonParams = {
      uid,
      mute,
      toJSON: () => {
        return {
          uid,
          mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteLocalVideoStream(mute: boolean): number {
    const apiType = 'RtcEngine_muteLocalVideoStream';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableLocalVideo(enabled: boolean): number {
    const apiType = 'RtcEngine_enableLocalVideo';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteAllRemoteVideoStreams(mute: boolean): number {
    const apiType = 'RtcEngine_muteAllRemoteVideoStreams';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDefaultMuteAllRemoteVideoStreams(mute: boolean): number {
    const apiType = 'RtcEngine_setDefaultMuteAllRemoteVideoStreams';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteRemoteVideoStream(uid: number, mute: boolean): number {
    const apiType = 'RtcEngine_muteRemoteVideoStream';
    const jsonParams = {
      uid,
      mute,
      toJSON: () => {
        return {
          uid,
          mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): number {
    const apiType = 'RtcEngine_setRemoteVideoStreamType';
    const jsonParams = {
      uid,
      streamType,
      toJSON: () => {
        return {
          uid,
          streamType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number {
    const apiType = 'RtcEngine_setRemoteDefaultVideoStreamType';
    const jsonParams = {
      streamType,
      toJSON: () => {
        return { streamType };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number {
    const apiType = 'RtcEngine_enableAudioVolumeIndication';
    const jsonParams = {
      interval,
      smooth,
      reportVad,
      toJSON: () => {
        return {
          interval,
          smooth,
          reportVad,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopAudioRecording(): number {
    const apiType = 'RtcEngine_stopAudioRecording';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  createMediaPlayer(): IMediaPlayer {
    const apiType = 'RtcEngine_createMediaPlayer';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  destroyMediaPlayer(mediaPlayer: IMediaPlayer): number {
    const apiType = 'RtcEngine_destroyMediaPlayer';
    const jsonParams = {
      media_player: mediaPlayer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopAudioMixing(): number {
    const apiType = 'RtcEngine_stopAudioMixing';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  pauseAudioMixing(): number {
    const apiType = 'RtcEngine_pauseAudioMixing';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  resumeAudioMixing(): number {
    const apiType = 'RtcEngine_resumeAudioMixing';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustAudioMixingVolume(volume: number): number {
    const apiType = 'RtcEngine_adjustAudioMixingVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustAudioMixingPublishVolume(volume: number): number {
    const apiType = 'RtcEngine_adjustAudioMixingPublishVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getAudioMixingPublishVolume(): number {
    const apiType = 'RtcEngine_getAudioMixingPublishVolume';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustAudioMixingPlayoutVolume(volume: number): number {
    const apiType = 'RtcEngine_adjustAudioMixingPlayoutVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getAudioMixingPlayoutVolume(): number {
    const apiType = 'RtcEngine_getAudioMixingPlayoutVolume';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getAudioMixingDuration(): number {
    const apiType = 'RtcEngine_getAudioMixingDuration';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getAudioMixingCurrentPosition(): number {
    const apiType = 'RtcEngine_getAudioMixingCurrentPosition';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioMixingPosition(pos: number): number {
    const apiType = 'RtcEngine_setAudioMixingPosition';
    const jsonParams = {
      pos,
      toJSON: () => {
        return { pos };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioMixingPitch(pitch: number): number {
    const apiType = 'RtcEngine_setAudioMixingPitch';
    const jsonParams = {
      pitch,
      toJSON: () => {
        return { pitch };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getEffectsVolume(): number {
    const apiType = 'RtcEngine_getEffectsVolume';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setEffectsVolume(volume: number): number {
    const apiType = 'RtcEngine_setEffectsVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  preloadEffect(soundId: number, filePath: string, startPos = 0): number {
    const apiType = 'RtcEngine_preloadEffect';
    const jsonParams = {
      soundId,
      filePath,
      startPos,
      toJSON: () => {
        return {
          soundId,
          filePath,
          startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish = false,
    startPos = 0
  ): number {
    const apiType = 'RtcEngine_playEffect';
    const jsonParams = {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos,
      toJSON: () => {
        return {
          soundId,
          filePath,
          loopCount,
          pitch,
          pan,
          gain,
          publish,
          startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish = false
  ): number {
    const apiType = 'RtcEngine_playAllEffects';
    const jsonParams = {
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      toJSON: () => {
        return {
          loopCount,
          pitch,
          pan,
          gain,
          publish,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getVolumeOfEffect(soundId: number): number {
    const apiType = 'RtcEngine_getVolumeOfEffect';
    const jsonParams = {
      soundId,
      toJSON: () => {
        return { soundId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVolumeOfEffect(soundId: number, volume: number): number {
    const apiType = 'RtcEngine_setVolumeOfEffect';
    const jsonParams = {
      soundId,
      volume,
      toJSON: () => {
        return {
          soundId,
          volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  pauseEffect(soundId: number): number {
    const apiType = 'RtcEngine_pauseEffect';
    const jsonParams = {
      soundId,
      toJSON: () => {
        return { soundId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  pauseAllEffects(): number {
    const apiType = 'RtcEngine_pauseAllEffects';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  resumeEffect(soundId: number): number {
    const apiType = 'RtcEngine_resumeEffect';
    const jsonParams = {
      soundId,
      toJSON: () => {
        return { soundId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  resumeAllEffects(): number {
    const apiType = 'RtcEngine_resumeAllEffects';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopEffect(soundId: number): number {
    const apiType = 'RtcEngine_stopEffect';
    const jsonParams = {
      soundId,
      toJSON: () => {
        return { soundId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopAllEffects(): number {
    const apiType = 'RtcEngine_stopAllEffects';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  unloadEffect(soundId: number): number {
    const apiType = 'RtcEngine_unloadEffect';
    const jsonParams = {
      soundId,
      toJSON: () => {
        return { soundId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  unloadAllEffects(): number {
    const apiType = 'RtcEngine_unloadAllEffects';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableSoundPositionIndication(enabled: boolean): number {
    const apiType = 'RtcEngine_enableSoundPositionIndication';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteVoicePosition(uid: number, pan: number, gain: number): number {
    const apiType = 'RtcEngine_setRemoteVoicePosition';
    const jsonParams = {
      uid,
      pan,
      gain,
      toJSON: () => {
        return {
          uid,
          pan,
          gain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableSpatialAudio(enabled: boolean): number {
    const apiType = 'RtcEngine_enableSpatialAudio';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteUserSpatialAudioParams(
    uid: number,
    params: SpatialAudioParams
  ): number {
    const apiType = 'RtcEngine_setRemoteUserSpatialAudioParams';
    const jsonParams = {
      uid,
      params,
      toJSON: () => {
        return {
          uid,
          params,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number {
    const apiType = 'RtcEngine_setVoiceBeautifierPreset';
    const jsonParams = {
      preset,
      toJSON: () => {
        return { preset };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioEffectPreset(preset: AudioEffectPreset): number {
    const apiType = 'RtcEngine_setAudioEffectPreset';
    const jsonParams = {
      preset,
      toJSON: () => {
        return { preset };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVoiceConversionPreset(preset: VoiceConversionPreset): number {
    const apiType = 'RtcEngine_setVoiceConversionPreset';
    const jsonParams = {
      preset,
      toJSON: () => {
        return { preset };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number {
    const apiType = 'RtcEngine_setAudioEffectParameters';
    const jsonParams = {
      preset,
      param1,
      param2,
      toJSON: () => {
        return {
          preset,
          param1,
          param2,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): number {
    const apiType = 'RtcEngine_setVoiceBeautifierParameters';
    const jsonParams = {
      preset,
      param1,
      param2,
      toJSON: () => {
        return {
          preset,
          param1,
          param2,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): number {
    const apiType = 'RtcEngine_setVoiceConversionParameters';
    const jsonParams = {
      preset,
      param1,
      param2,
      toJSON: () => {
        return {
          preset,
          param1,
          param2,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalVoicePitch(pitch: number): number {
    const apiType = 'RtcEngine_setLocalVoicePitch';
    const jsonParams = {
      pitch,
      toJSON: () => {
        return { pitch };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number {
    const apiType = 'RtcEngine_setLocalVoiceEqualization';
    const jsonParams = {
      bandFrequency,
      bandGain,
      toJSON: () => {
        return {
          bandFrequency,
          bandGain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): number {
    const apiType = 'RtcEngine_setLocalVoiceReverb';
    const jsonParams = {
      reverbKey,
      value,
      toJSON: () => {
        return {
          reverbKey,
          value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLogFile(filePath: string): number {
    const apiType = 'RtcEngine_setLogFile';
    const jsonParams = {
      filePath,
      toJSON: () => {
        return { filePath };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLogFilter(filter: LogFilterType): number {
    const apiType = 'RtcEngine_setLogFilter';
    const jsonParams = {
      filter,
      toJSON: () => {
        return { filter };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLogLevel(level: LogLevel): number {
    const apiType = 'RtcEngine_setLogLevel';
    const jsonParams = {
      level,
      toJSON: () => {
        return { level };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLogFileSize(fileSizeInKBytes: number): number {
    const apiType = 'RtcEngine_setLogFileSize';
    const jsonParams = {
      fileSizeInKBytes,
      toJSON: () => {
        return { fileSizeInKBytes };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  uploadLogFile(requestId: string): number {
    const apiType = 'RtcEngine_uploadLogFile';
    const jsonParams = {
      requestId,
      toJSON: () => {
        return { requestId };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number {
    const apiType = 'RtcEngine_setRemoteRenderMode';
    const jsonParams = {
      uid,
      renderMode,
      mirrorMode,
      toJSON: () => {
        return {
          uid,
          renderMode,
          mirrorMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number {
    const apiType = 'RtcEngine_setLocalVideoMirrorMode';
    const jsonParams = {
      mirrorMode,
      toJSON: () => {
        return { mirrorMode };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableEchoCancellationExternal(
    enabled: boolean,
    audioSourceDelay: number
  ): number {
    const apiType = 'RtcEngine_enableEchoCancellationExternal';
    const jsonParams = {
      enabled,
      audioSourceDelay,
      toJSON: () => {
        return {
          enabled,
          audioSourceDelay,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableCustomAudioLocalPlayback(sourceId: number, enabled: boolean): number {
    const apiType = 'RtcEngine_enableCustomAudioLocalPlayback';
    const jsonParams = {
      sourceId,
      enabled,
      toJSON: () => {
        return {
          sourceId,
          enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startPrimaryCustomAudioTrack(config: AudioTrackConfig): number {
    const apiType = 'RtcEngine_startPrimaryCustomAudioTrack';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopPrimaryCustomAudioTrack(): number {
    const apiType = 'RtcEngine_stopPrimaryCustomAudioTrack';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startSecondaryCustomAudioTrack(config: AudioTrackConfig): number {
    const apiType = 'RtcEngine_startSecondaryCustomAudioTrack';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopSecondaryCustomAudioTrack(): number {
    const apiType = 'RtcEngine_stopSecondaryCustomAudioTrack';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number {
    const apiType = 'RtcEngine_setRecordingAudioFrameParameters';
    const jsonParams = {
      sampleRate,
      channel,
      mode,
      samplesPerCall,
      toJSON: () => {
        return {
          sampleRate,
          channel,
          mode,
          samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number {
    const apiType = 'RtcEngine_setPlaybackAudioFrameParameters';
    const jsonParams = {
      sampleRate,
      channel,
      mode,
      samplesPerCall,
      toJSON: () => {
        return {
          sampleRate,
          channel,
          mode,
          samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number {
    const apiType = 'RtcEngine_setMixedAudioFrameParameters';
    const jsonParams = {
      sampleRate,
      channel,
      samplesPerCall,
      toJSON: () => {
        return {
          sampleRate,
          channel,
          samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): number {
    const apiType = 'RtcEngine_setPlaybackAudioFrameBeforeMixingParameters';
    const jsonParams = {
      sampleRate,
      channel,
      toJSON: () => {
        return {
          sampleRate,
          channel,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableAudioSpectrumMonitor(intervalInMS = 100): number {
    const apiType = 'RtcEngine_enableAudioSpectrumMonitor';
    const jsonParams = {
      intervalInMS,
      toJSON: () => {
        return { intervalInMS };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  disableAudioSpectrumMonitor(): number {
    const apiType = 'RtcEngine_disableAudioSpectrumMonitor';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustRecordingSignalVolume(volume: number): number {
    const apiType = 'RtcEngine_adjustRecordingSignalVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  muteRecordingSignal(mute: boolean): number {
    const apiType = 'RtcEngine_muteRecordingSignal';
    const jsonParams = {
      mute,
      toJSON: () => {
        return { mute };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustPlaybackSignalVolume(volume: number): number {
    const apiType = 'RtcEngine_adjustPlaybackSignalVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustUserPlaybackSignalVolume(uid: number, volume: number): number {
    const apiType = 'RtcEngine_adjustUserPlaybackSignalVolume';
    const jsonParams = {
      uid,
      volume,
      toJSON: () => {
        return {
          uid,
          volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalPublishFallbackOption(option: StreamFallbackOptions): number {
    const apiType = 'RtcEngine_setLocalPublishFallbackOption';
    const jsonParams = {
      option,
      toJSON: () => {
        return { option };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): number {
    const apiType = 'RtcEngine_setRemoteSubscribeFallbackOption';
    const jsonParams = {
      option,
      toJSON: () => {
        return { option };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableLoopbackRecording(enabled: boolean, deviceName?: string): number {
    const apiType = 'RtcEngine_enableLoopbackRecording';
    const jsonParams = {
      enabled,
      deviceName,
      toJSON: () => {
        return {
          enabled,
          deviceName,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustLoopbackRecordingVolume(volume: number): number {
    const apiType = 'RtcEngine_adjustLoopbackRecordingVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getLoopbackRecordingVolume(): number {
    const apiType = 'RtcEngine_getLoopbackRecordingVolume';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number {
    const apiType = 'RtcEngine_enableInEarMonitoring';
    const jsonParams = {
      enabled,
      includeAudioFilters,
      toJSON: () => {
        return {
          enabled,
          includeAudioFilters,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setInEarMonitoringVolume(volume: number): number {
    const apiType = 'RtcEngine_setInEarMonitoringVolume';
    const jsonParams = {
      volume,
      toJSON: () => {
        return { volume };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  loadExtensionProvider(path: string): number {
    const apiType = 'RtcEngine_loadExtensionProvider';
    const jsonParams = {
      path,
      toJSON: () => {
        return { path };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setExtensionProviderProperty(
    provider: string,
    key: string,
    value: string
  ): number {
    const apiType = 'RtcEngine_setExtensionProviderProperty';
    const jsonParams = {
      provider,
      key,
      value,
      toJSON: () => {
        return {
          provider,
          key,
          value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableExtension(
    provider: string,
    extension: string,
    enable = true,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): number {
    const apiType = 'RtcEngine_enableExtension';
    const jsonParams = {
      provider,
      extension,
      enable,
      type,
      toJSON: () => {
        return {
          provider,
          extension,
          enable,
          type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    value: string,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): number {
    const apiType = 'RtcEngine_setExtensionProperty';
    const jsonParams = {
      provider,
      extension,
      key,
      value,
      type,
      toJSON: () => {
        return {
          provider,
          extension,
          key,
          value,
          type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getExtensionProperty(
    provider: string,
    extension: string,
    key: string,
    bufLen: number,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): string {
    const apiType = 'RtcEngine_getExtensionProperty';
    const jsonParams = {
      provider,
      extension,
      key,
      buf_len: bufLen,
      type,
      toJSON: () => {
        return {
          provider,
          extension,
          key,
          buf_len: bufLen,
          type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const value = jsonResults.value;
    return value;
  }

  setCameraCapturerConfiguration(config: CameraCapturerConfiguration): number {
    const apiType = 'RtcEngine_setCameraCapturerConfiguration';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  switchCamera(): number {
    const apiType = 'RtcEngine_switchCamera';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraZoomSupported(): boolean {
    const apiType = 'RtcEngine_isCameraZoomSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraFaceDetectSupported(): boolean {
    const apiType = 'RtcEngine_isCameraFaceDetectSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraTorchSupported(): boolean {
    const apiType = 'RtcEngine_isCameraTorchSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraFocusSupported(): boolean {
    const apiType = 'RtcEngine_isCameraFocusSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraAutoFocusFaceModeSupported(): boolean {
    const apiType = 'RtcEngine_isCameraAutoFocusFaceModeSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraZoomFactor(factor: number): number {
    const apiType = 'RtcEngine_setCameraZoomFactor';
    const jsonParams = {
      factor,
      toJSON: () => {
        return { factor };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableFaceDetection(enabled: boolean): number {
    const apiType = 'RtcEngine_enableFaceDetection';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getCameraMaxZoomFactor(): number {
    const apiType = 'RtcEngine_getCameraMaxZoomFactor';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number {
    const apiType = 'RtcEngine_setCameraFocusPositionInPreview';
    const jsonParams = {
      positionX,
      positionY,
      toJSON: () => {
        return {
          positionX,
          positionY,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraTorchOn(isOn: boolean): number {
    const apiType = 'RtcEngine_setCameraTorchOn';
    const jsonParams = {
      isOn,
      toJSON: () => {
        return { isOn };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraAutoFocusFaceModeEnabled(enabled: boolean): number {
    const apiType = 'RtcEngine_setCameraAutoFocusFaceModeEnabled';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraExposurePositionSupported(): boolean {
    const apiType = 'RtcEngine_isCameraExposurePositionSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number {
    const apiType = 'RtcEngine_setCameraExposurePosition';
    const jsonParams = {
      positionXinView,
      positionYinView,
      toJSON: () => {
        return {
          positionXinView,
          positionYinView,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isCameraAutoExposureFaceModeSupported(): boolean {
    const apiType = 'RtcEngine_isCameraAutoExposureFaceModeSupported';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraAutoExposureFaceModeEnabled(enabled: boolean): number {
    const apiType = 'RtcEngine_setCameraAutoExposureFaceModeEnabled';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): number {
    const apiType = 'RtcEngine_setDefaultAudioRouteToSpeakerphone';
    const jsonParams = {
      defaultToSpeaker,
      toJSON: () => {
        return { defaultToSpeaker };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setEnableSpeakerphone(speakerOn: boolean): number {
    const apiType = 'RtcEngine_setEnableSpeakerphone';
    const jsonParams = {
      speakerOn,
      toJSON: () => {
        return { speakerOn };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  isSpeakerphoneEnabled(): boolean {
    const apiType = 'RtcEngine_isSpeakerphoneEnabled';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getScreenCaptureSources(
    thumbSize: SIZE,
    iconSize: SIZE,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[] {
    const apiType = 'RtcEngine_getScreenCaptureSources';
    const jsonParams = {
      thumbSize,
      iconSize,
      includeScreen,
      toJSON: () => {
        return {
          thumbSize,
          iconSize,
          includeScreen,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number {
    const apiType = 'RtcEngine_setAudioSessionOperationRestriction';
    const jsonParams = {
      restriction,
      toJSON: () => {
        return { restriction };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startScreenCaptureByDisplayId(
    displayId: number,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number {
    const apiType = 'RtcEngine_startScreenCaptureByDisplayId';
    const jsonParams = {
      displayId,
      regionRect,
      captureParams,
      toJSON: () => {
        return {
          displayId,
          regionRect,
          captureParams,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startScreenCaptureByScreenRect(
    screenRect: Rectangle,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number {
    const apiType = 'RtcEngine_startScreenCaptureByScreenRect';
    const jsonParams = {
      screenRect,
      regionRect,
      captureParams,
      toJSON: () => {
        return {
          screenRect,
          regionRect,
          captureParams,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getAudioDeviceInfo(): DeviceInfo {
    const apiType = 'RtcEngine_getAudioDeviceInfo';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceInfo = jsonResults.deviceInfo;
    return deviceInfo;
  }

  startScreenCaptureByWindowId(
    windowId: any,
    regionRect: Rectangle,
    captureParams: ScreenCaptureParameters
  ): number {
    const apiType = 'RtcEngine_startScreenCaptureByWindowId';
    const jsonParams = {
      windowId,
      regionRect,
      captureParams,
      toJSON: () => {
        return {
          windowId,
          regionRect,
          captureParams,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setScreenCaptureContentHint(contentHint: VideoContentHint): number {
    const apiType = 'RtcEngine_setScreenCaptureContentHint';
    const jsonParams = {
      contentHint,
      toJSON: () => {
        return { contentHint };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateScreenCaptureRegion(regionRect: Rectangle): number {
    const apiType = 'RtcEngine_updateScreenCaptureRegion';
    const jsonParams = {
      regionRect,
      toJSON: () => {
        return { regionRect };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateScreenCaptureParameters(
    captureParams: ScreenCaptureParameters
  ): number {
    const apiType = 'RtcEngine_updateScreenCaptureParameters';
    const jsonParams = {
      captureParams,
      toJSON: () => {
        return { captureParams };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopScreenCapture(): number {
    const apiType = 'RtcEngine_stopScreenCapture';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getCallId(): string {
    const apiType = 'RtcEngine_getCallId';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const callId = jsonResults.callId;
    return callId;
  }

  rate(callId: string, rating: number, description: string): number {
    const apiType = 'RtcEngine_rate';
    const jsonParams = {
      callId,
      rating,
      description,
      toJSON: () => {
        return {
          callId,
          rating,
          description,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  complain(callId: string, description: string): number {
    const apiType = 'RtcEngine_complain';
    const jsonParams = {
      callId,
      description,
      toJSON: () => {
        return {
          callId,
          description,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  addPublishStreamUrl(url: string, transcodingEnabled: boolean): number {
    const apiType = 'RtcEngine_addPublishStreamUrl';
    const jsonParams = {
      url,
      transcodingEnabled,
      toJSON: () => {
        return {
          url,
          transcodingEnabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  removePublishStreamUrl(url: string): number {
    const apiType = 'RtcEngine_removePublishStreamUrl';
    const jsonParams = {
      url,
      toJSON: () => {
        return { url };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLiveTranscoding(transcoding: LiveTranscoding): number {
    const apiType = 'RtcEngine_setLiveTranscoding';
    const jsonParams = {
      transcoding,
      toJSON: () => {
        return { transcoding };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startRtmpStreamWithoutTranscoding(url: string): number {
    const apiType = 'RtcEngine_startRtmpStreamWithoutTranscoding';
    const jsonParams = {
      url,
      toJSON: () => {
        return { url };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): number {
    const apiType = 'RtcEngine_startRtmpStreamWithTranscoding';
    const jsonParams = {
      url,
      transcoding,
      toJSON: () => {
        return {
          url,
          transcoding,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateRtmpTranscoding(transcoding: LiveTranscoding): number {
    const apiType = 'RtcEngine_updateRtmpTranscoding';
    const jsonParams = {
      transcoding,
      toJSON: () => {
        return { transcoding };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopRtmpStream(url: string): number {
    const apiType = 'RtcEngine_stopRtmpStream';
    const jsonParams = {
      url,
      toJSON: () => {
        return { url };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startLocalVideoTranscoder(config: LocalTranscoderConfiguration): number {
    const apiType = 'RtcEngine_startLocalVideoTranscoder';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateLocalTranscoderConfiguration(
    config: LocalTranscoderConfiguration
  ): number {
    const apiType = 'RtcEngine_updateLocalTranscoderConfiguration';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopLocalVideoTranscoder(): number {
    const apiType = 'RtcEngine_stopLocalVideoTranscoder';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startPrimaryCameraCapture(config: CameraCapturerConfiguration): number {
    const apiType = 'RtcEngine_startPrimaryCameraCapture';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startSecondaryCameraCapture(config: CameraCapturerConfiguration): number {
    const apiType = 'RtcEngine_startSecondaryCameraCapture';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopPrimaryCameraCapture(): number {
    const apiType = 'RtcEngine_stopPrimaryCameraCapture';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopSecondaryCameraCapture(): number {
    const apiType = 'RtcEngine_stopSecondaryCameraCapture';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number {
    const apiType = 'RtcEngine_setCameraDeviceOrientation';
    const jsonParams = {
      type,
      orientation,
      toJSON: () => {
        return {
          type,
          orientation,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number {
    const apiType = 'RtcEngine_setScreenCaptureOrientation';
    const jsonParams = {
      type,
      orientation,
      toJSON: () => {
        return {
          type,
          orientation,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startPrimaryScreenCapture(config: ScreenCaptureConfiguration): number {
    const apiType = 'RtcEngine_startPrimaryScreenCapture';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startSecondaryScreenCapture(config: ScreenCaptureConfiguration): number {
    const apiType = 'RtcEngine_startSecondaryScreenCapture';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopPrimaryScreenCapture(): number {
    const apiType = 'RtcEngine_stopPrimaryScreenCapture';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopSecondaryScreenCapture(): number {
    const apiType = 'RtcEngine_stopSecondaryScreenCapture';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getConnectionState(): ConnectionStateType {
    const apiType = 'RtcEngine_getConnectionState';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    const apiType = 'RtcEngine_registerEventHandler';
    const jsonParams = {
      eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  unregisterEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    const apiType = 'RtcEngine_unregisterEventHandler';
    const jsonParams = {
      eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setRemoteUserPriority(uid: number, userPriority: PriorityType): number {
    const apiType = 'RtcEngine_setRemoteUserPriority';
    const jsonParams = {
      uid,
      userPriority,
      toJSON: () => {
        return {
          uid,
          userPriority,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setEncryptionMode(encryptionMode: string): number {
    const apiType = 'RtcEngine_setEncryptionMode';
    const jsonParams = {
      encryptionMode,
      toJSON: () => {
        return { encryptionMode };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setEncryptionSecret(secret: string): number {
    const apiType = 'RtcEngine_setEncryptionSecret';
    const jsonParams = {
      secret,
      toJSON: () => {
        return { secret };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableEncryption(enabled: boolean, config: EncryptionConfig): number {
    const apiType = 'RtcEngine_enableEncryption';
    const jsonParams = {
      enabled,
      config,
      toJSON: () => {
        return {
          enabled,
          config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number {
    const apiType = 'RtcEngine_sendStreamMessage';
    const jsonParams = {
      streamId,
      data,
      length,
      toJSON: () => {
        return {
          streamId,
          length,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  clearVideoWatermark(): number {
    const apiType = 'RtcEngine_clearVideoWatermark';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  clearVideoWatermarks(): number {
    const apiType = 'RtcEngine_clearVideoWatermarks';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  addInjectStreamUrl(url: string, config: InjectStreamConfig): number {
    const apiType = 'RtcEngine_addInjectStreamUrl';
    const jsonParams = {
      url,
      config,
      toJSON: () => {
        return {
          url,
          config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  removeInjectStreamUrl(url: string): number {
    const apiType = 'RtcEngine_removeInjectStreamUrl';
    const jsonParams = {
      url,
      toJSON: () => {
        return { url };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  pauseAudio(): number {
    const apiType = 'RtcEngine_pauseAudio';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  resumeAudio(): number {
    const apiType = 'RtcEngine_resumeAudio';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableWebSdkInteroperability(enabled: boolean): number {
    const apiType = 'RtcEngine_enableWebSdkInteroperability';
    const jsonParams = {
      enabled,
      toJSON: () => {
        return { enabled };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): number {
    const apiType = 'RtcEngine_sendCustomReportMessage';
    const jsonParams = {
      id,
      category,
      event,
      label,
      value,
      toJSON: () => {
        return {
          id,
          category,
          event,
          label,
          value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    const apiType = 'RtcEngine_registerMediaMetadataObserver';
    const jsonParams = {
      observer,
      type,
      toJSON: () => {
        return { type };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    const apiType = 'RtcEngine_unregisterMediaMetadataObserver';
    const jsonParams = {
      observer,
      type,
      toJSON: () => {
        return { type };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startAudioFrameDump(
    channelId: string,
    userId: number,
    location: string,
    uuid: string,
    passwd: string,
    durationMs: number,
    autoUpload: boolean
  ): number {
    const apiType = 'RtcEngine_startAudioFrameDump';
    const jsonParams = {
      channel_id: channelId,
      user_id: userId,
      location,
      uuid,
      passwd,
      duration_ms: durationMs,
      auto_upload: autoUpload,
      toJSON: () => {
        return {
          channel_id: channelId,
          user_id: userId,
          location,
          uuid,
          passwd,
          duration_ms: durationMs,
          auto_upload: autoUpload,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopAudioFrameDump(
    channelId: string,
    userId: number,
    location: string
  ): number {
    const apiType = 'RtcEngine_stopAudioFrameDump';
    const jsonParams = {
      channel_id: channelId,
      user_id: userId,
      location,
      toJSON: () => {
        return {
          channel_id: channelId,
          user_id: userId,
          location,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  registerLocalUserAccount(appId: string, userAccount: string): number {
    const apiType = 'RtcEngine_registerLocalUserAccount';
    const jsonParams = {
      appId,
      userAccount,
      toJSON: () => {
        return {
          appId,
          userAccount,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  joinChannelWithUserAccountEx(
    token: string,
    channelId: string,
    userAccount: string,
    options: ChannelMediaOptions
  ): number {
    const apiType = 'RtcEngine_joinChannelWithUserAccountEx';
    const jsonParams = {
      token,
      channelId,
      userAccount,
      options,
      toJSON: () => {
        return {
          token,
          channelId,
          userAccount,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getUserInfoByUserAccount(userAccount: string): UserInfo {
    const apiType = 'RtcEngine_getUserInfoByUserAccount';
    const jsonParams = {
      userAccount,
      toJSON: () => {
        return { userAccount };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  getUserInfoByUid(uid: number): UserInfo {
    const apiType = 'RtcEngine_getUserInfoByUid';
    const jsonParams = {
      uid,
      toJSON: () => {
        return { uid };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  startChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number {
    const apiType = 'RtcEngine_startChannelMediaRelay';
    const jsonParams = {
      configuration,
      toJSON: () => {
        return { configuration };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateChannelMediaRelay(
    configuration: ChannelMediaRelayConfiguration
  ): number {
    const apiType = 'RtcEngine_updateChannelMediaRelay';
    const jsonParams = {
      configuration,
      toJSON: () => {
        return { configuration };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopChannelMediaRelay(): number {
    const apiType = 'RtcEngine_stopChannelMediaRelay';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  pauseAllChannelMediaRelay(): number {
    const apiType = 'RtcEngine_pauseAllChannelMediaRelay';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  resumeAllChannelMediaRelay(): number {
    const apiType = 'RtcEngine_resumeAllChannelMediaRelay';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDirectCdnStreamingAudioConfiguration(profile: AudioProfileType): number {
    const apiType = 'RtcEngine_setDirectCdnStreamingAudioConfiguration';
    const jsonParams = {
      profile,
      toJSON: () => {
        return { profile };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setDirectCdnStreamingVideoConfiguration(
    config: VideoEncoderConfiguration
  ): number {
    const apiType = 'RtcEngine_setDirectCdnStreamingVideoConfiguration';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler,
    publishUrl: string,
    options: DirectCdnStreamingMediaOptions
  ): number {
    const apiType = 'RtcEngine_startDirectCdnStreaming';
    const jsonParams = {
      eventHandler,
      publishUrl,
      options,
      toJSON: () => {
        return {
          publishUrl,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopDirectCdnStreaming(): number {
    const apiType = 'RtcEngine_stopDirectCdnStreaming';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  updateDirectCdnStreamingMediaOptions(
    options: DirectCdnStreamingMediaOptions
  ): number {
    const apiType = 'RtcEngine_updateDirectCdnStreamingMediaOptions';
    const jsonParams = {
      options,
      toJSON: () => {
        return { options };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  takeSnapshot(config: SnapShotConfig): number {
    const apiType = 'RtcEngine_takeSnapshot';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  SetContentInspect(config: ContentInspectConfig): number {
    const apiType = 'RtcEngine_SetContentInspect';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  switchChannel(token: string, channel: string): number {
    const apiType = 'RtcEngine_switchChannel';
    const jsonParams = {
      token,
      channel,
      toJSON: () => {
        return {
          token,
          channel,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: AgoraRhythmPlayerConfig
  ): number {
    const apiType = 'RtcEngine_startRhythmPlayer';
    const jsonParams = {
      sound1,
      sound2,
      config,
      toJSON: () => {
        return {
          sound1,
          sound2,
          config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopRhythmPlayer(): number {
    const apiType = 'RtcEngine_stopRhythmPlayer';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  configRhythmPlayer(config: AgoraRhythmPlayerConfig): number {
    const apiType = 'RtcEngine_configRhythmPlayer';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustCustomAudioPublishVolume(sourceId: number, volume: number): number {
    const apiType = 'RtcEngine_adjustCustomAudioPublishVolume';
    const jsonParams = {
      sourceId,
      volume,
      toJSON: () => {
        return {
          sourceId,
          volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  adjustCustomAudioPlayoutVolume(sourceId: number, volume: number): number {
    const apiType = 'RtcEngine_adjustCustomAudioPlayoutVolume';
    const jsonParams = {
      sourceId,
      volume,
      toJSON: () => {
        return {
          sourceId,
          volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setCloudProxy(proxyType: CloudProxyType): number {
    const apiType = 'RtcEngine_setCloudProxy';
    const jsonParams = {
      proxyType,
      toJSON: () => {
        return { proxyType };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalAccessPoint(config: LocalAccessPointConfiguration): number {
    const apiType = 'RtcEngine_setLocalAccessPoint';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableFishCorrection(enabled: boolean, params: FishCorrectionParams): number {
    const apiType = 'RtcEngine_enableFishCorrection';
    const jsonParams = {
      enabled,
      params,
      toJSON: () => {
        return {
          enabled,
          params,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAdvancedAudioOptions(options: AdvancedAudioOptions): number {
    const apiType = 'RtcEngine_setAdvancedAudioOptions';
    const jsonParams = {
      options,
      toJSON: () => {
        return { options };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAVSyncSource(channelId: string, uid: number): number {
    const apiType = 'RtcEngine_setAVSyncSource';
    const jsonParams = {
      channelId,
      uid,
      toJSON: () => {
        return {
          channelId,
          uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  joinChannel(
    token: string,
    channelId: string,
    info: string,
    uid: number
  ): number {
    const apiType = 'RtcEngine_joinChannel';
    const jsonParams = {
      token,
      channelId,
      info,
      uid,
      toJSON: () => {
        return {
          token,
          channelId,
          info,
          uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  joinChannelWithOptions(
    token: string,
    channelId: string,
    uid: number,
    options: ChannelMediaOptions
  ): number {
    const apiType = 'RtcEngine_joinChannelWithOptions';
    const jsonParams = {
      token,
      channelId,
      uid,
      options,
      toJSON: () => {
        return {
          token,
          channelId,
          uid,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  leaveChannel(options?: LeaveChannelOptions): number {
    const apiType = 'RtcEngine_leaveChannel';
    const jsonParams = {
      options,
      toJSON: () => {
        return { options };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setClientRole(role: ClientRoleType, options?: ClientRoleOptions): number {
    const apiType = 'RtcEngine_setClientRole';
    const jsonParams = {
      role,
      options,
      toJSON: () => {
        return {
          role,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startEchoTest(intervalInSeconds = 10): number {
    const apiType = 'RtcEngine_startEchoTest';
    const jsonParams = {
      intervalInSeconds,
      toJSON: () => {
        return { intervalInSeconds };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): number {
    const apiType = 'RtcEngine_startPreview';
    const jsonParams = {
      sourceType,
      toJSON: () => {
        return { sourceType };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  stopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): number {
    const apiType = 'RtcEngine_stopPreview';
    const jsonParams = {
      sourceType,
      toJSON: () => {
        return { sourceType };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setAudioProfile(
    profile: AudioProfileType,
    scenario: AudioScenarioType = AudioScenarioType.AudioScenarioDefault
  ): number {
    const apiType = 'RtcEngine_setAudioProfile';
    const jsonParams = {
      profile,
      scenario,
      toJSON: () => {
        return {
          profile,
          scenario,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startAudioRecording(config: AudioRecordingConfiguration): number {
    const apiType = 'RtcEngine_startAudioRecording';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number,
    startPos = 0
  ): number {
    const apiType = 'RtcEngine_startAudioMixing';
    const jsonParams = {
      filePath,
      loopback,
      replace,
      cycle,
      startPos,
      toJSON: () => {
        return {
          filePath,
          loopback,
          replace,
          cycle,
          startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType = VideoMirrorModeType.VideoMirrorModeAuto
  ): number {
    const apiType = 'RtcEngine_setLocalRenderMode';
    const jsonParams = {
      renderMode,
      mirrorMode,
      toJSON: () => {
        return {
          renderMode,
          mirrorMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  enableDualStreamMode(
    enabled: boolean,
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary,
    streamConfig?: SimulcastStreamConfig
  ): number {
    const apiType = 'RtcEngine_enableDualStreamMode';
    const jsonParams = {
      enabled,
      sourceType,
      streamConfig,
      toJSON: () => {
        return {
          enabled,
          sourceType,
          streamConfig,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  createDataStream(config: DataStreamConfig): number {
    const apiType = 'RtcEngine_createDataStream';
    const jsonParams = {
      config,
      toJSON: () => {
        return { config };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamId = jsonResults.streamId;
    return streamId;
  }

  addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): number {
    const apiType = 'RtcEngine_addVideoWatermark';
    const jsonParams = {
      watermarkUrl,
      options,
      toJSON: () => {
        return {
          watermarkUrl,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  joinChannelWithUserAccount(
    token: string,
    channelId: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): number {
    const apiType = 'RtcEngine_joinChannelWithUserAccount';
    const jsonParams = {
      token,
      channelId,
      userAccount,
      options,
      toJSON: () => {
        return {
          token,
          channelId,
          userAccount,
          options,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getAudioDeviceManager(): IAudioDeviceManager {
    const apiType = 'RtcEngine_getAudioDeviceManager';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  getVideoDeviceManager(): IVideoDeviceManager {
    const apiType = 'RtcEngine_getVideoDeviceManager';
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  sendMetaData(metadata: Metadata, sourceType: VideoSourceType): number {
    const apiType = 'RtcEngine_sendMetaData';
    const jsonParams = {
      metadata,
      source_type: sourceType,
      toJSON: () => {
        return {
          metadata,
          source_type: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  setMaxMetadataSize(size: number): number {
    const apiType = 'RtcEngine_setMaxMetadataSize';
    const jsonParams = {
      size,
      toJSON: () => {
        return { size };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }
}
