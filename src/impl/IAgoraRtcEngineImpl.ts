import {
  AudioAinsMode,
  AudioEffectPreset,
  AudioEncodedFrameObserverConfig,
  AudioProfileType,
  AudioRecordingConfiguration,
  AudioScenarioType,
  AudioSessionOperationRestriction,
  BeautyOptions,
  ChannelMediaRelayConfiguration,
  ChannelProfileType,
  ClientRoleOptions,
  ClientRoleType,
  CodecCapInfo,
  ColorEnhanceOptions,
  ConnectionStateType,
  DataStreamConfig,
  DeviceInfo,
  EarMonitoringFilterType,
  EchoTestConfiguration,
  EncryptionConfig,
  HeadphoneEqualizerPreset,
  IAudioEncodedFrameObserver,
  LastmileProbeConfig,
  LiveTranscoding,
  LocalAccessPointConfiguration,
  LocalTranscoderConfiguration,
  LowlightEnhanceOptions,
  RecorderStreamInfo,
  Rectangle,
  ScreenCaptureParameters,
  ScreenCaptureParameters2,
  ScreenScenarioType,
  SegmentationProperty,
  SenderOptions,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  SpatialAudioParams,
  UserInfo,
  VideoApplicationScenarioType,
  VideoCanvas,
  VideoContentHint,
  VideoDenoiserOptions,
  VideoEncoderConfiguration,
  VideoFormat,
  VideoMirrorModeType,
  VideoOrientation,
  VideoStreamType,
  VideoSubscriptionOptions,
  VirtualBackgroundSource,
  VoiceBeautifierPreset,
  VoiceConversionPreset,
  WatermarkOptions,
} from '../AgoraBase';
import {
  ContentInspectConfig,
  IAudioSpectrumObserver,
  MediaSourceType,
  RawAudioFrameOpModeType,
  RenderModeType,
  VideoSourceType,
} from '../AgoraMediaBase';
import { LogFilterType, LogLevel } from '../IAgoraLog';
import { AudioMixingDualMonoMode, IMediaEngine } from '../IAgoraMediaEngine';
import { IMediaPlayer } from '../IAgoraMediaPlayer';
import { IMediaRecorder } from '../IAgoraMediaRecorder';
import { IMusicContentCenter } from '../IAgoraMusicContentCenter';
import { AgoraRhythmPlayerConfig } from '../IAgoraRhythmPlayer';
import {
  AdvancedAudioOptions,
  AudioEqualizationBandFrequency,
  AudioReverbType,
  CameraCapturerConfiguration,
  ChannelMediaOptions,
  CloudProxyType,
  DirectCdnStreamingMediaOptions,
  FeatureType,
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngine,
  IRtcEngineEventHandler,
  IVideoDeviceManager,
  ImageTrackOptions,
  LeaveChannelOptions,
  Metadata,
  MetadataType,
  PriorityType,
  RtcEngineContext,
  SDKBuildInfo,
  ScreenCaptureConfiguration,
  ScreenCaptureSourceInfo,
  Size,
  StreamFallbackOptions,
  VideoDeviceInfo,
} from '../IAgoraRtcEngine';
import { ILocalSpatialAudioEngine } from '../IAgoraSpatialAudio';
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

    case 'onProxyConnected':
      if (handler.onProxyConnected !== undefined) {
        handler.onProxyConnected(
          jsonParams.channel,
          jsonParams.uid,
          jsonParams.proxyType,
          jsonParams.localProxyIp,
          jsonParams.elapsed
        );
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

    case 'onAudioMixingPositionChanged':
      if (handler.onAudioMixingPositionChanged !== undefined) {
        handler.onAudioMixingPositionChanged(jsonParams.position);
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
          jsonParams.source,
          jsonParams.width,
          jsonParams.height,
          jsonParams.elapsed
        );
      }
      break;

    case 'onFirstLocalVideoFramePublished':
      if (handler.onFirstLocalVideoFramePublished !== undefined) {
        handler.onFirstLocalVideoFramePublished(
          jsonParams.source,
          jsonParams.elapsed
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
          jsonParams.sourceType,
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
          jsonParams.source,
          jsonParams.state,
          jsonParams.error
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
        handler.onLocalVideoStats(jsonParams.source, jsonParams.stats);
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
        handler.onAudioMixingStateChanged(jsonParams.state, jsonParams.reason);
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

    case 'onLicenseValidationFailure':
      if (handler.onLicenseValidationFailure !== undefined) {
        handler.onLicenseValidationFailure(
          jsonParams.connection,
          jsonParams.reason
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
          jsonParams.uid,
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
          jsonParams.newRole,
          jsonParams.newRoleOptions
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

    case 'onWlAccMessage':
      if (handler.onWlAccMessage !== undefined) {
        handler.onWlAccMessage(
          jsonParams.connection,
          jsonParams.reason,
          jsonParams.action,
          jsonParams.wlAccMsg
        );
      }
      break;

    case 'onWlAccStats':
      if (handler.onWlAccStats !== undefined) {
        handler.onWlAccStats(
          jsonParams.connection,
          jsonParams.currentStats,
          jsonParams.averageStats
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
          jsonParams.source,
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
          jsonParams.extension,
          jsonParams.key,
          jsonParams.value
        );
      }
      break;

    case 'onExtensionStarted':
      if (handler.onExtensionStarted !== undefined) {
        handler.onExtensionStarted(jsonParams.provider, jsonParams.extension);
      }
      break;

    case 'onExtensionStopped':
      if (handler.onExtensionStopped !== undefined) {
        handler.onExtensionStopped(jsonParams.provider, jsonParams.extension);
      }
      break;

    case 'onExtensionError':
      if (handler.onExtensionError !== undefined) {
        handler.onExtensionError(
          jsonParams.provider,
          jsonParams.extension,
          jsonParams.error,
          jsonParams.message
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

    case 'onLocalVideoTranscoderError':
      if (handler.onLocalVideoTranscoderError !== undefined) {
        handler.onLocalVideoTranscoderError(
          jsonParams.stream,
          jsonParams.error
        );
      }
      break;

    case 'onVideoRenderingTracingResult':
      if (handler.onVideoRenderingTracingResult !== undefined) {
        handler.onVideoRenderingTracingResult(
          jsonParams.connection,
          jsonParams.uid,
          jsonParams.currentEvent,
          jsonParams.tracingInfo
        );
      }
      break;
  }
}

// @ts-ignore
export class IVideoDeviceManagerImpl implements IVideoDeviceManager {
  enumerateVideoDevices(): VideoDeviceInfo[] {
    const apiType = this.getApiTypeFromEnumerateVideoDevices();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnumerateVideoDevices(): string {
    return 'VideoDeviceManager_enumerateVideoDevices';
  }

  setDevice(): string {
    const apiType = this.getApiTypeFromSetDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceIdUTF8 = jsonResults.deviceIdUTF8;
    return deviceIdUTF8;
  }

  protected getApiTypeFromSetDevice(): string {
    return 'VideoDeviceManager_setDevice';
  }

  getDevice(): string {
    const apiType = this.getApiTypeFromGetDevice();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceIdUTF8 = jsonResults.deviceIdUTF8;
    return deviceIdUTF8;
  }

  protected getApiTypeFromGetDevice(): string {
    return 'VideoDeviceManager_getDevice';
  }

  numberOfCapabilities(deviceIdUTF8: string): number {
    const apiType = this.getApiTypeFromNumberOfCapabilities(deviceIdUTF8);
    const jsonParams = {
      deviceIdUTF8: deviceIdUTF8,
      toJSON: () => {
        return {
          deviceIdUTF8: deviceIdUTF8,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromNumberOfCapabilities(deviceIdUTF8: string): string {
    return 'VideoDeviceManager_numberOfCapabilities';
  }

  getCapability(deviceCapabilityNumber: number): {
    deviceIdUTF8: string;
    capability: VideoFormat;
  } {
    const apiType = this.getApiTypeFromGetCapability(deviceCapabilityNumber);
    const jsonParams = {
      deviceCapabilityNumber: deviceCapabilityNumber,
      toJSON: () => {
        return {
          deviceCapabilityNumber: deviceCapabilityNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceIdUTF8 = jsonResults.deviceIdUTF8;
    const capability = jsonResults.capability;
    return {
      deviceIdUTF8,
      capability,
    };
  }

  protected getApiTypeFromGetCapability(
    deviceCapabilityNumber: number
  ): string {
    return 'VideoDeviceManager_getCapability';
  }

  startDeviceTest(hwnd: any): number {
    const apiType = this.getApiTypeFromStartDeviceTest(hwnd);
    const jsonParams = {
      hwnd: hwnd,
      toJSON: () => {
        return {
          hwnd: hwnd,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartDeviceTest(hwnd: any): string {
    return 'VideoDeviceManager_startDeviceTest';
  }

  stopDeviceTest(): number {
    const apiType = this.getApiTypeFromStopDeviceTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopDeviceTest(): string {
    return 'VideoDeviceManager_stopDeviceTest';
  }

  release(): void {
    const apiType = this.getApiTypeFromRelease();
    const jsonParams = {};
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(): string {
    return 'VideoDeviceManager_release';
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

// @ts-ignore
export class IRtcEngineImpl implements IRtcEngine {
  release(sync: boolean = false): void {
    const apiType = this.getApiTypeFromRelease(sync);
    const jsonParams = {
      sync: sync,
      toJSON: () => {
        return {
          sync: sync,
        };
      },
    };
    callIrisApi.call(this, apiType, jsonParams);
  }

  protected getApiTypeFromRelease(sync: boolean = false): string {
    return 'RtcEngine_release';
  }

  initialize(): RtcEngineContext {
    const apiType = this.getApiTypeFromInitialize();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const context = jsonResults.context;
    return context;
  }

  protected getApiTypeFromInitialize(): string {
    return 'RtcEngine_initialize';
  }

  getVersion(): SDKBuildInfo {
    const apiType = this.getApiTypeFromGetVersion();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetVersion(): string {
    return 'RtcEngine_getVersion';
  }

  getErrorDescription(code: number): string {
    const apiType = this.getApiTypeFromGetErrorDescription(code);
    const jsonParams = {
      code: code,
      toJSON: () => {
        return {
          code: code,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetErrorDescription(code: number): string {
    return 'RtcEngine_getErrorDescription';
  }

  queryCodecCapability(): { codecInfo: CodecCapInfo[]; size: number } {
    const apiType = this.getApiTypeFromQueryCodecCapability();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const codecInfo = jsonResults.codecInfo;
    const size = jsonResults.size;
    return {
      codecInfo,
      size,
    };
  }

  protected getApiTypeFromQueryCodecCapability(): string {
    return 'RtcEngine_queryCodecCapability';
  }

  preloadChannel(uid: number): { token: string; channelId: string } {
    const apiType = this.getApiTypeFromPreloadChannel(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    const channelId = jsonResults.channelId;
    return {
      token,
      channelId,
    };
  }

  protected getApiTypeFromPreloadChannel(uid: number): string {
    return 'RtcEngine_preloadChannel';
  }

  preloadChannelWithUserAccount(): {
    token: string;
    channelId: string;
    userAccount: string;
  } {
    const apiType = this.getApiTypeFromPreloadChannelWithUserAccount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    const channelId = jsonResults.channelId;
    const userAccount = jsonResults.userAccount;
    return {
      token,
      channelId,
      userAccount,
    };
  }

  protected getApiTypeFromPreloadChannelWithUserAccount(): string {
    return 'RtcEngine_preloadChannelWithUserAccount';
  }

  updatePreloadChannelToken(): string {
    const apiType = this.getApiTypeFromUpdatePreloadChannelToken();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    return token;
  }

  protected getApiTypeFromUpdatePreloadChannelToken(): string {
    return 'RtcEngine_updatePreloadChannelToken';
  }

  joinChannel(uid: number): {
    token: string;
    channelId: string;
    options: ChannelMediaOptions;
  } {
    const apiType = this.getApiTypeFromJoinChannel(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    const channelId = jsonResults.channelId;
    const options = jsonResults.options;
    return {
      token,
      channelId,
      options,
    };
  }

  protected getApiTypeFromJoinChannel(uid: number): string {
    return 'RtcEngine_joinChannel';
  }

  updateChannelMediaOptions(): ChannelMediaOptions {
    const apiType = this.getApiTypeFromUpdateChannelMediaOptions();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromUpdateChannelMediaOptions(): string {
    return 'RtcEngine_updateChannelMediaOptions';
  }

  leaveChannel(): LeaveChannelOptions {
    const apiType = this.getApiTypeFromLeaveChannel();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromLeaveChannel(): string {
    return 'RtcEngine_leaveChannel';
  }

  renewToken(): string {
    const apiType = this.getApiTypeFromRenewToken();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    return token;
  }

  protected getApiTypeFromRenewToken(): string {
    return 'RtcEngine_renewToken';
  }

  setChannelProfile(profile: ChannelProfileType): number {
    const apiType = this.getApiTypeFromSetChannelProfile(profile);
    const jsonParams = {
      profile: profile,
      toJSON: () => {
        return {
          profile: profile,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetChannelProfile(
    profile: ChannelProfileType
  ): string {
    return 'RtcEngine_setChannelProfile';
  }

  setClientRole(role: ClientRoleType): ClientRoleOptions {
    const apiType = this.getApiTypeFromSetClientRole(role);
    const jsonParams = {
      role: role,
      toJSON: () => {
        return {
          role: role,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromSetClientRole(role: ClientRoleType): string {
    return 'RtcEngine_setClientRole';
  }

  startEchoTest(): EchoTestConfiguration {
    const apiType = this.getApiTypeFromStartEchoTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartEchoTest(): string {
    return 'RtcEngine_startEchoTest';
  }

  stopEchoTest(): number {
    const apiType = this.getApiTypeFromStopEchoTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopEchoTest(): string {
    return 'RtcEngine_stopEchoTest';
  }

  enableMultiCamera(enabled: boolean): CameraCapturerConfiguration {
    const apiType = this.getApiTypeFromEnableMultiCamera(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromEnableMultiCamera(enabled: boolean): string {
    return 'RtcEngine_enableMultiCamera';
  }

  enableVideo(): number {
    const apiType = this.getApiTypeFromEnableVideo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableVideo(): string {
    return 'RtcEngine_enableVideo';
  }

  disableVideo(): number {
    const apiType = this.getApiTypeFromDisableVideo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDisableVideo(): string {
    return 'RtcEngine_disableVideo';
  }

  startPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): number {
    const apiType = this.getApiTypeFromStartPreview(sourceType);
    const jsonParams = {
      sourceType: sourceType,
      toJSON: () => {
        return {
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_startPreview';
  }

  stopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): number {
    const apiType = this.getApiTypeFromStopPreview(sourceType);
    const jsonParams = {
      sourceType: sourceType,
      toJSON: () => {
        return {
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopPreview(
    sourceType: VideoSourceType = VideoSourceType.VideoSourceCameraPrimary
  ): string {
    return 'RtcEngine_stopPreview';
  }

  startLastmileProbeTest(): LastmileProbeConfig {
    const apiType = this.getApiTypeFromStartLastmileProbeTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartLastmileProbeTest(): string {
    return 'RtcEngine_startLastmileProbeTest';
  }

  stopLastmileProbeTest(): number {
    const apiType = this.getApiTypeFromStopLastmileProbeTest();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopLastmileProbeTest(): string {
    return 'RtcEngine_stopLastmileProbeTest';
  }

  setVideoEncoderConfiguration(): VideoEncoderConfiguration {
    const apiType = this.getApiTypeFromSetVideoEncoderConfiguration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromSetVideoEncoderConfiguration(): string {
    return 'RtcEngine_setVideoEncoderConfiguration';
  }

  setBeautyEffectOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): BeautyOptions {
    const apiType = this.getApiTypeFromSetBeautyEffectOptions(enabled, type);
    const jsonParams = {
      enabled: enabled,
      type: type,
      toJSON: () => {
        return {
          enabled: enabled,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromSetBeautyEffectOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): string {
    return 'RtcEngine_setBeautyEffectOptions';
  }

  setLowlightEnhanceOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): LowlightEnhanceOptions {
    const apiType = this.getApiTypeFromSetLowlightEnhanceOptions(enabled, type);
    const jsonParams = {
      enabled: enabled,
      type: type,
      toJSON: () => {
        return {
          enabled: enabled,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromSetLowlightEnhanceOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): string {
    return 'RtcEngine_setLowlightEnhanceOptions';
  }

  setVideoDenoiserOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): VideoDenoiserOptions {
    const apiType = this.getApiTypeFromSetVideoDenoiserOptions(enabled, type);
    const jsonParams = {
      enabled: enabled,
      type: type,
      toJSON: () => {
        return {
          enabled: enabled,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromSetVideoDenoiserOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): string {
    return 'RtcEngine_setVideoDenoiserOptions';
  }

  setColorEnhanceOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): ColorEnhanceOptions {
    const apiType = this.getApiTypeFromSetColorEnhanceOptions(enabled, type);
    const jsonParams = {
      enabled: enabled,
      type: type,
      toJSON: () => {
        return {
          enabled: enabled,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromSetColorEnhanceOptions(
    enabled: boolean,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): string {
    return 'RtcEngine_setColorEnhanceOptions';
  }

  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): number {
    const apiType = this.getApiTypeFromEnableVirtualBackground(
      enabled,
      backgroundSource,
      segproperty,
      type
    );
    const jsonParams = {
      enabled: enabled,
      backgroundSource: backgroundSource,
      segproperty: segproperty,
      type: type,
      toJSON: () => {
        return {
          enabled: enabled,
          backgroundSource: backgroundSource,
          segproperty: segproperty,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource,
    segproperty: SegmentationProperty,
    type: MediaSourceType = MediaSourceType.PrimaryCameraSource
  ): string {
    return 'RtcEngine_enableVirtualBackground';
  }

  setupRemoteVideo(): VideoCanvas {
    const apiType = this.getApiTypeFromSetupRemoteVideo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const canvas = jsonResults.canvas;
    return canvas;
  }

  protected getApiTypeFromSetupRemoteVideo(): string {
    return 'RtcEngine_setupRemoteVideo';
  }

  setupLocalVideo(): VideoCanvas {
    const apiType = this.getApiTypeFromSetupLocalVideo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const canvas = jsonResults.canvas;
    return canvas;
  }

  protected getApiTypeFromSetupLocalVideo(): string {
    return 'RtcEngine_setupLocalVideo';
  }

  setVideoScenario(scenarioType: VideoApplicationScenarioType): number {
    const apiType = this.getApiTypeFromSetVideoScenario(scenarioType);
    const jsonParams = {
      scenarioType: scenarioType,
      toJSON: () => {
        return {
          scenarioType: scenarioType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVideoScenario(
    scenarioType: VideoApplicationScenarioType
  ): string {
    return 'RtcEngine_setVideoScenario';
  }

  enableAudio(): number {
    const apiType = this.getApiTypeFromEnableAudio();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableAudio(): string {
    return 'RtcEngine_enableAudio';
  }

  disableAudio(): number {
    const apiType = this.getApiTypeFromDisableAudio();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDisableAudio(): string {
    return 'RtcEngine_disableAudio';
  }

  setAudioProfile(
    profile: AudioProfileType,
    scenario: AudioScenarioType = AudioScenarioType.AudioScenarioDefault
  ): number {
    const apiType = this.getApiTypeFromSetAudioProfile(profile, scenario);
    const jsonParams = {
      profile: profile,
      scenario: scenario,
      toJSON: () => {
        return {
          profile: profile,
          scenario: scenario,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioProfile(
    profile: AudioProfileType,
    scenario: AudioScenarioType = AudioScenarioType.AudioScenarioDefault
  ): string {
    return 'RtcEngine_setAudioProfile';
  }

  setAudioScenario(scenario: AudioScenarioType): number {
    const apiType = this.getApiTypeFromSetAudioScenario(scenario);
    const jsonParams = {
      scenario: scenario,
      toJSON: () => {
        return {
          scenario: scenario,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioScenario(
    scenario: AudioScenarioType
  ): string {
    return 'RtcEngine_setAudioScenario';
  }

  enableLocalAudio(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableLocalAudio(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableLocalAudio(enabled: boolean): string {
    return 'RtcEngine_enableLocalAudio';
  }

  muteLocalAudioStream(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteLocalAudioStream(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteLocalAudioStream(mute: boolean): string {
    return 'RtcEngine_muteLocalAudioStream';
  }

  muteAllRemoteAudioStreams(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteAllRemoteAudioStreams(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteAllRemoteAudioStreams(mute: boolean): string {
    return 'RtcEngine_muteAllRemoteAudioStreams';
  }

  setDefaultMuteAllRemoteAudioStreams(mute: boolean): number {
    const apiType =
      this.getApiTypeFromSetDefaultMuteAllRemoteAudioStreams(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDefaultMuteAllRemoteAudioStreams(
    mute: boolean
  ): string {
    return 'RtcEngine_setDefaultMuteAllRemoteAudioStreams';
  }

  muteRemoteAudioStream(uid: number, mute: boolean): number {
    const apiType = this.getApiTypeFromMuteRemoteAudioStream(uid, mute);
    const jsonParams = {
      uid: uid,
      mute: mute,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRemoteAudioStream(
    uid: number,
    mute: boolean
  ): string {
    return 'RtcEngine_muteRemoteAudioStream';
  }

  muteLocalVideoStream(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteLocalVideoStream(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteLocalVideoStream(mute: boolean): string {
    return 'RtcEngine_muteLocalVideoStream';
  }

  enableLocalVideo(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableLocalVideo(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableLocalVideo(enabled: boolean): string {
    return 'RtcEngine_enableLocalVideo';
  }

  muteAllRemoteVideoStreams(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteAllRemoteVideoStreams(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteAllRemoteVideoStreams(mute: boolean): string {
    return 'RtcEngine_muteAllRemoteVideoStreams';
  }

  setDefaultMuteAllRemoteVideoStreams(mute: boolean): number {
    const apiType =
      this.getApiTypeFromSetDefaultMuteAllRemoteVideoStreams(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDefaultMuteAllRemoteVideoStreams(
    mute: boolean
  ): string {
    return 'RtcEngine_setDefaultMuteAllRemoteVideoStreams';
  }

  muteRemoteVideoStream(uid: number, mute: boolean): number {
    const apiType = this.getApiTypeFromMuteRemoteVideoStream(uid, mute);
    const jsonParams = {
      uid: uid,
      mute: mute,
      toJSON: () => {
        return {
          uid: uid,
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRemoteVideoStream(
    uid: number,
    mute: boolean
  ): string {
    return 'RtcEngine_muteRemoteVideoStream';
  }

  setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): number {
    const apiType = this.getApiTypeFromSetRemoteVideoStreamType(
      uid,
      streamType
    );
    const jsonParams = {
      uid: uid,
      streamType: streamType,
      toJSON: () => {
        return {
          uid: uid,
          streamType: streamType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): string {
    return 'RtcEngine_setRemoteVideoStreamType';
  }

  setRemoteVideoSubscriptionOptions(uid: number): VideoSubscriptionOptions {
    const apiType = this.getApiTypeFromSetRemoteVideoSubscriptionOptions(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromSetRemoteVideoSubscriptionOptions(
    uid: number
  ): string {
    return 'RtcEngine_setRemoteVideoSubscriptionOptions';
  }

  setRemoteDefaultVideoStreamType(streamType: VideoStreamType): number {
    const apiType =
      this.getApiTypeFromSetRemoteDefaultVideoStreamType(streamType);
    const jsonParams = {
      streamType: streamType,
      toJSON: () => {
        return {
          streamType: streamType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteDefaultVideoStreamType(
    streamType: VideoStreamType
  ): string {
    return 'RtcEngine_setRemoteDefaultVideoStreamType';
  }

  setSubscribeAudioBlocklist(uidList: number[], uidNumber: number): number {
    const apiType = this.getApiTypeFromSetSubscribeAudioBlocklist(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeAudioBlocklist(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngine_setSubscribeAudioBlocklist';
  }

  setSubscribeAudioAllowlist(uidList: number[], uidNumber: number): number {
    const apiType = this.getApiTypeFromSetSubscribeAudioAllowlist(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeAudioAllowlist(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngine_setSubscribeAudioAllowlist';
  }

  setSubscribeVideoBlocklist(uidList: number[], uidNumber: number): number {
    const apiType = this.getApiTypeFromSetSubscribeVideoBlocklist(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeVideoBlocklist(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngine_setSubscribeVideoBlocklist';
  }

  setSubscribeVideoAllowlist(uidList: number[], uidNumber: number): number {
    const apiType = this.getApiTypeFromSetSubscribeVideoAllowlist(
      uidList,
      uidNumber
    );
    const jsonParams = {
      uidList: uidList,
      uidNumber: uidNumber,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNumber: uidNumber,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetSubscribeVideoAllowlist(
    uidList: number[],
    uidNumber: number
  ): string {
    return 'RtcEngine_setSubscribeVideoAllowlist';
  }

  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): number {
    const apiType = this.getApiTypeFromEnableAudioVolumeIndication(
      interval,
      smooth,
      reportVad
    );
    const jsonParams = {
      interval: interval,
      smooth: smooth,
      reportVad: reportVad,
      toJSON: () => {
        return {
          interval: interval,
          smooth: smooth,
          reportVad: reportVad,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableAudioVolumeIndication(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): string {
    return 'RtcEngine_enableAudioVolumeIndication';
  }

  startAudioRecording(): AudioRecordingConfiguration {
    const apiType = this.getApiTypeFromStartAudioRecording();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartAudioRecording(): string {
    return 'RtcEngine_startAudioRecording';
  }

  registerAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): number {
    const apiType = this.getApiTypeFromRegisterAudioEncodedFrameObserver(
      config,
      observer
    );
    const jsonParams = {
      config: config,
      observer: observer,
      toJSON: () => {
        return {
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterAudioEncodedFrameObserver(
    config: AudioEncodedFrameObserverConfig,
    observer: IAudioEncodedFrameObserver
  ): string {
    return 'RtcEngine_registerAudioEncodedFrameObserver';
  }

  stopAudioRecording(): number {
    const apiType = this.getApiTypeFromStopAudioRecording();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopAudioRecording(): string {
    return 'RtcEngine_stopAudioRecording';
  }

  createMediaPlayer(): IMediaPlayer {
    const apiType = this.getApiTypeFromCreateMediaPlayer();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromCreateMediaPlayer(): string {
    return 'RtcEngine_createMediaPlayer';
  }

  destroyMediaPlayer(): IMediaPlayer {
    const apiType = this.getApiTypeFromDestroyMediaPlayer();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const mediaPlayer = jsonResults.media_player;
    return mediaPlayer;
  }

  protected getApiTypeFromDestroyMediaPlayer(): string {
    return 'RtcEngine_destroyMediaPlayer';
  }

  createMediaRecorder(): { info: RecorderStreamInfo; result: IMediaRecorder } {
    const apiType = this.getApiTypeFromCreateMediaRecorder();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const info = jsonResults.info;
    const result = jsonResults.result;
    return {
      info,
      result,
    };
  }

  protected getApiTypeFromCreateMediaRecorder(): string {
    return 'RtcEngine_createMediaRecorder';
  }

  destroyMediaRecorder(): IMediaRecorder {
    const apiType = this.getApiTypeFromDestroyMediaRecorder();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const mediaRecorder = jsonResults.mediaRecorder;
    return mediaRecorder;
  }

  protected getApiTypeFromDestroyMediaRecorder(): string {
    return 'RtcEngine_destroyMediaRecorder';
  }

  startAudioMixing(
    loopback: boolean,
    cycle: number,
    startPos: number = 0
  ): string {
    const apiType = this.getApiTypeFromStartAudioMixing(
      loopback,
      cycle,
      startPos
    );
    const jsonParams = {
      loopback: loopback,
      cycle: cycle,
      startPos: startPos,
      toJSON: () => {
        return {
          loopback: loopback,
          cycle: cycle,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const filePath = jsonResults.filePath;
    return filePath;
  }

  protected getApiTypeFromStartAudioMixing(
    loopback: boolean,
    cycle: number,
    startPos: number = 0
  ): string {
    return 'RtcEngine_startAudioMixing';
  }

  stopAudioMixing(): number {
    const apiType = this.getApiTypeFromStopAudioMixing();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopAudioMixing(): string {
    return 'RtcEngine_stopAudioMixing';
  }

  pauseAudioMixing(): number {
    const apiType = this.getApiTypeFromPauseAudioMixing();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPauseAudioMixing(): string {
    return 'RtcEngine_pauseAudioMixing';
  }

  resumeAudioMixing(): number {
    const apiType = this.getApiTypeFromResumeAudioMixing();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResumeAudioMixing(): string {
    return 'RtcEngine_resumeAudioMixing';
  }

  selectAudioTrack(index: number): number {
    const apiType = this.getApiTypeFromSelectAudioTrack(index);
    const jsonParams = {
      index: index,
      toJSON: () => {
        return {
          index: index,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSelectAudioTrack(index: number): string {
    return 'RtcEngine_selectAudioTrack';
  }

  getAudioTrackCount(): number {
    const apiType = this.getApiTypeFromGetAudioTrackCount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAudioTrackCount(): string {
    return 'RtcEngine_getAudioTrackCount';
  }

  adjustAudioMixingVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustAudioMixingVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustAudioMixingVolume(volume: number): string {
    return 'RtcEngine_adjustAudioMixingVolume';
  }

  adjustAudioMixingPublishVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustAudioMixingPublishVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustAudioMixingPublishVolume(
    volume: number
  ): string {
    return 'RtcEngine_adjustAudioMixingPublishVolume';
  }

  getAudioMixingPublishVolume(): number {
    const apiType = this.getApiTypeFromGetAudioMixingPublishVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAudioMixingPublishVolume(): string {
    return 'RtcEngine_getAudioMixingPublishVolume';
  }

  adjustAudioMixingPlayoutVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustAudioMixingPlayoutVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustAudioMixingPlayoutVolume(
    volume: number
  ): string {
    return 'RtcEngine_adjustAudioMixingPlayoutVolume';
  }

  getAudioMixingPlayoutVolume(): number {
    const apiType = this.getApiTypeFromGetAudioMixingPlayoutVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAudioMixingPlayoutVolume(): string {
    return 'RtcEngine_getAudioMixingPlayoutVolume';
  }

  getAudioMixingDuration(): number {
    const apiType = this.getApiTypeFromGetAudioMixingDuration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAudioMixingDuration(): string {
    return 'RtcEngine_getAudioMixingDuration';
  }

  getAudioMixingCurrentPosition(): number {
    const apiType = this.getApiTypeFromGetAudioMixingCurrentPosition();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAudioMixingCurrentPosition(): string {
    return 'RtcEngine_getAudioMixingCurrentPosition';
  }

  setAudioMixingPosition(pos: number): number {
    const apiType = this.getApiTypeFromSetAudioMixingPosition(pos);
    const jsonParams = {
      pos: pos,
      toJSON: () => {
        return {
          pos: pos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioMixingPosition(pos: number): string {
    return 'RtcEngine_setAudioMixingPosition';
  }

  setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): number {
    const apiType = this.getApiTypeFromSetAudioMixingDualMonoMode(mode);
    const jsonParams = {
      mode: mode,
      toJSON: () => {
        return {
          mode: mode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioMixingDualMonoMode(
    mode: AudioMixingDualMonoMode
  ): string {
    return 'RtcEngine_setAudioMixingDualMonoMode';
  }

  setAudioMixingPitch(pitch: number): number {
    const apiType = this.getApiTypeFromSetAudioMixingPitch(pitch);
    const jsonParams = {
      pitch: pitch,
      toJSON: () => {
        return {
          pitch: pitch,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioMixingPitch(pitch: number): string {
    return 'RtcEngine_setAudioMixingPitch';
  }

  getEffectsVolume(): number {
    const apiType = this.getApiTypeFromGetEffectsVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetEffectsVolume(): string {
    return 'RtcEngine_getEffectsVolume';
  }

  setEffectsVolume(volume: number): number {
    const apiType = this.getApiTypeFromSetEffectsVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetEffectsVolume(volume: number): string {
    return 'RtcEngine_setEffectsVolume';
  }

  preloadEffect(soundId: number, startPos: number = 0): string {
    const apiType = this.getApiTypeFromPreloadEffect(soundId, startPos);
    const jsonParams = {
      soundId: soundId,
      startPos: startPos,
      toJSON: () => {
        return {
          soundId: soundId,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const filePath = jsonResults.filePath;
    return filePath;
  }

  protected getApiTypeFromPreloadEffect(
    soundId: number,
    startPos: number = 0
  ): string {
    return 'RtcEngine_preloadEffect';
  }

  playEffect(
    soundId: number,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean = false,
    startPos: number = 0
  ): string {
    const apiType = this.getApiTypeFromPlayEffect(
      soundId,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos
    );
    const jsonParams = {
      soundId: soundId,
      loopCount: loopCount,
      pitch: pitch,
      pan: pan,
      gain: gain,
      publish: publish,
      startPos: startPos,
      toJSON: () => {
        return {
          soundId: soundId,
          loopCount: loopCount,
          pitch: pitch,
          pan: pan,
          gain: gain,
          publish: publish,
          startPos: startPos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const filePath = jsonResults.filePath;
    return filePath;
  }

  protected getApiTypeFromPlayEffect(
    soundId: number,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean = false,
    startPos: number = 0
  ): string {
    return 'RtcEngine_playEffect';
  }

  playAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean = false
  ): number {
    const apiType = this.getApiTypeFromPlayAllEffects(
      loopCount,
      pitch,
      pan,
      gain,
      publish
    );
    const jsonParams = {
      loopCount: loopCount,
      pitch: pitch,
      pan: pan,
      gain: gain,
      publish: publish,
      toJSON: () => {
        return {
          loopCount: loopCount,
          pitch: pitch,
          pan: pan,
          gain: gain,
          publish: publish,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPlayAllEffects(
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: boolean = false
  ): string {
    return 'RtcEngine_playAllEffects';
  }

  getVolumeOfEffect(soundId: number): number {
    const apiType = this.getApiTypeFromGetVolumeOfEffect(soundId);
    const jsonParams = {
      soundId: soundId,
      toJSON: () => {
        return {
          soundId: soundId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetVolumeOfEffect(soundId: number): string {
    return 'RtcEngine_getVolumeOfEffect';
  }

  setVolumeOfEffect(soundId: number, volume: number): number {
    const apiType = this.getApiTypeFromSetVolumeOfEffect(soundId, volume);
    const jsonParams = {
      soundId: soundId,
      volume: volume,
      toJSON: () => {
        return {
          soundId: soundId,
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVolumeOfEffect(
    soundId: number,
    volume: number
  ): string {
    return 'RtcEngine_setVolumeOfEffect';
  }

  pauseEffect(soundId: number): number {
    const apiType = this.getApiTypeFromPauseEffect(soundId);
    const jsonParams = {
      soundId: soundId,
      toJSON: () => {
        return {
          soundId: soundId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPauseEffect(soundId: number): string {
    return 'RtcEngine_pauseEffect';
  }

  pauseAllEffects(): number {
    const apiType = this.getApiTypeFromPauseAllEffects();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPauseAllEffects(): string {
    return 'RtcEngine_pauseAllEffects';
  }

  resumeEffect(soundId: number): number {
    const apiType = this.getApiTypeFromResumeEffect(soundId);
    const jsonParams = {
      soundId: soundId,
      toJSON: () => {
        return {
          soundId: soundId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResumeEffect(soundId: number): string {
    return 'RtcEngine_resumeEffect';
  }

  resumeAllEffects(): number {
    const apiType = this.getApiTypeFromResumeAllEffects();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResumeAllEffects(): string {
    return 'RtcEngine_resumeAllEffects';
  }

  stopEffect(soundId: number): number {
    const apiType = this.getApiTypeFromStopEffect(soundId);
    const jsonParams = {
      soundId: soundId,
      toJSON: () => {
        return {
          soundId: soundId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopEffect(soundId: number): string {
    return 'RtcEngine_stopEffect';
  }

  stopAllEffects(): number {
    const apiType = this.getApiTypeFromStopAllEffects();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopAllEffects(): string {
    return 'RtcEngine_stopAllEffects';
  }

  unloadEffect(soundId: number): number {
    const apiType = this.getApiTypeFromUnloadEffect(soundId);
    const jsonParams = {
      soundId: soundId,
      toJSON: () => {
        return {
          soundId: soundId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnloadEffect(soundId: number): string {
    return 'RtcEngine_unloadEffect';
  }

  unloadAllEffects(): number {
    const apiType = this.getApiTypeFromUnloadAllEffects();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnloadAllEffects(): string {
    return 'RtcEngine_unloadAllEffects';
  }

  getEffectDuration(): string {
    const apiType = this.getApiTypeFromGetEffectDuration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const filePath = jsonResults.filePath;
    return filePath;
  }

  protected getApiTypeFromGetEffectDuration(): string {
    return 'RtcEngine_getEffectDuration';
  }

  setEffectPosition(soundId: number, pos: number): number {
    const apiType = this.getApiTypeFromSetEffectPosition(soundId, pos);
    const jsonParams = {
      soundId: soundId,
      pos: pos,
      toJSON: () => {
        return {
          soundId: soundId,
          pos: pos,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetEffectPosition(
    soundId: number,
    pos: number
  ): string {
    return 'RtcEngine_setEffectPosition';
  }

  getEffectCurrentPosition(soundId: number): number {
    const apiType = this.getApiTypeFromGetEffectCurrentPosition(soundId);
    const jsonParams = {
      soundId: soundId,
      toJSON: () => {
        return {
          soundId: soundId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetEffectCurrentPosition(soundId: number): string {
    return 'RtcEngine_getEffectCurrentPosition';
  }

  enableSoundPositionIndication(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableSoundPositionIndication(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableSoundPositionIndication(
    enabled: boolean
  ): string {
    return 'RtcEngine_enableSoundPositionIndication';
  }

  setRemoteVoicePosition(uid: number, pan: number, gain: number): number {
    const apiType = this.getApiTypeFromSetRemoteVoicePosition(uid, pan, gain);
    const jsonParams = {
      uid: uid,
      pan: pan,
      gain: gain,
      toJSON: () => {
        return {
          uid: uid,
          pan: pan,
          gain: gain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): string {
    return 'RtcEngine_setRemoteVoicePosition';
  }

  enableSpatialAudio(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableSpatialAudio(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableSpatialAudio(enabled: boolean): string {
    return 'RtcEngine_enableSpatialAudio';
  }

  setRemoteUserSpatialAudioParams(uid: number): SpatialAudioParams {
    const apiType = this.getApiTypeFromSetRemoteUserSpatialAudioParams(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const params = jsonResults.params;
    return params;
  }

  protected getApiTypeFromSetRemoteUserSpatialAudioParams(uid: number): string {
    return 'RtcEngine_setRemoteUserSpatialAudioParams';
  }

  setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): number {
    const apiType = this.getApiTypeFromSetVoiceBeautifierPreset(preset);
    const jsonParams = {
      preset: preset,
      toJSON: () => {
        return {
          preset: preset,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVoiceBeautifierPreset(
    preset: VoiceBeautifierPreset
  ): string {
    return 'RtcEngine_setVoiceBeautifierPreset';
  }

  setAudioEffectPreset(preset: AudioEffectPreset): number {
    const apiType = this.getApiTypeFromSetAudioEffectPreset(preset);
    const jsonParams = {
      preset: preset,
      toJSON: () => {
        return {
          preset: preset,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioEffectPreset(
    preset: AudioEffectPreset
  ): string {
    return 'RtcEngine_setAudioEffectPreset';
  }

  setVoiceConversionPreset(preset: VoiceConversionPreset): number {
    const apiType = this.getApiTypeFromSetVoiceConversionPreset(preset);
    const jsonParams = {
      preset: preset,
      toJSON: () => {
        return {
          preset: preset,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVoiceConversionPreset(
    preset: VoiceConversionPreset
  ): string {
    return 'RtcEngine_setVoiceConversionPreset';
  }

  setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): number {
    const apiType = this.getApiTypeFromSetAudioEffectParameters(
      preset,
      param1,
      param2
    );
    const jsonParams = {
      preset: preset,
      param1: param1,
      param2: param2,
      toJSON: () => {
        return {
          preset: preset,
          param1: param1,
          param2: param2,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): string {
    return 'RtcEngine_setAudioEffectParameters';
  }

  setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): number {
    const apiType = this.getApiTypeFromSetVoiceBeautifierParameters(
      preset,
      param1,
      param2
    );
    const jsonParams = {
      preset: preset,
      param1: param1,
      param2: param2,
      toJSON: () => {
        return {
          preset: preset,
          param1: param1,
          param2: param2,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): string {
    return 'RtcEngine_setVoiceBeautifierParameters';
  }

  setVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): number {
    const apiType = this.getApiTypeFromSetVoiceConversionParameters(
      preset,
      param1,
      param2
    );
    const jsonParams = {
      preset: preset,
      param1: param1,
      param2: param2,
      toJSON: () => {
        return {
          preset: preset,
          param1: param1,
          param2: param2,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetVoiceConversionParameters(
    preset: VoiceConversionPreset,
    param1: number,
    param2: number
  ): string {
    return 'RtcEngine_setVoiceConversionParameters';
  }

  setLocalVoicePitch(pitch: number): number {
    const apiType = this.getApiTypeFromSetLocalVoicePitch(pitch);
    const jsonParams = {
      pitch: pitch,
      toJSON: () => {
        return {
          pitch: pitch,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalVoicePitch(pitch: number): string {
    return 'RtcEngine_setLocalVoicePitch';
  }

  setLocalVoiceFormant(formantRatio: number): number {
    const apiType = this.getApiTypeFromSetLocalVoiceFormant(formantRatio);
    const jsonParams = {
      formantRatio: formantRatio,
      toJSON: () => {
        return {
          formantRatio: formantRatio,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalVoiceFormant(formantRatio: number): string {
    return 'RtcEngine_setLocalVoiceFormant';
  }

  setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): number {
    const apiType = this.getApiTypeFromSetLocalVoiceEqualization(
      bandFrequency,
      bandGain
    );
    const jsonParams = {
      bandFrequency: bandFrequency,
      bandGain: bandGain,
      toJSON: () => {
        return {
          bandFrequency: bandFrequency,
          bandGain: bandGain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): string {
    return 'RtcEngine_setLocalVoiceEqualization';
  }

  setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): number {
    const apiType = this.getApiTypeFromSetLocalVoiceReverb(reverbKey, value);
    const jsonParams = {
      reverbKey: reverbKey,
      value: value,
      toJSON: () => {
        return {
          reverbKey: reverbKey,
          value: value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): string {
    return 'RtcEngine_setLocalVoiceReverb';
  }

  setHeadphoneEQPreset(preset: HeadphoneEqualizerPreset): number {
    const apiType = this.getApiTypeFromSetHeadphoneEQPreset(preset);
    const jsonParams = {
      preset: preset,
      toJSON: () => {
        return {
          preset: preset,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetHeadphoneEQPreset(
    preset: HeadphoneEqualizerPreset
  ): string {
    return 'RtcEngine_setHeadphoneEQPreset';
  }

  setHeadphoneEQParameters(lowGain: number, highGain: number): number {
    const apiType = this.getApiTypeFromSetHeadphoneEQParameters(
      lowGain,
      highGain
    );
    const jsonParams = {
      lowGain: lowGain,
      highGain: highGain,
      toJSON: () => {
        return {
          lowGain: lowGain,
          highGain: highGain,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetHeadphoneEQParameters(
    lowGain: number,
    highGain: number
  ): string {
    return 'RtcEngine_setHeadphoneEQParameters';
  }

  setLogFile(): string {
    const apiType = this.getApiTypeFromSetLogFile();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const filePath = jsonResults.filePath;
    return filePath;
  }

  protected getApiTypeFromSetLogFile(): string {
    return 'RtcEngine_setLogFile';
  }

  setLogFilter(filter: LogFilterType): number {
    const apiType = this.getApiTypeFromSetLogFilter(filter);
    const jsonParams = {
      filter: filter,
      toJSON: () => {
        return {
          filter: filter,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLogFilter(filter: LogFilterType): string {
    return 'RtcEngine_setLogFilter';
  }

  setLogLevel(level: LogLevel): number {
    const apiType = this.getApiTypeFromSetLogLevel(level);
    const jsonParams = {
      level: level,
      toJSON: () => {
        return {
          level: level,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLogLevel(level: LogLevel): string {
    return 'RtcEngine_setLogLevel';
  }

  setLogFileSize(fileSizeInKBytes: number): number {
    const apiType = this.getApiTypeFromSetLogFileSize(fileSizeInKBytes);
    const jsonParams = {
      fileSizeInKBytes: fileSizeInKBytes,
      toJSON: () => {
        return {
          fileSizeInKBytes: fileSizeInKBytes,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLogFileSize(fileSizeInKBytes: number): string {
    return 'RtcEngine_setLogFileSize';
  }

  uploadLogFile(): string {
    const apiType = this.getApiTypeFromUploadLogFile();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const requestId = jsonResults.requestId;
    return requestId;
  }

  protected getApiTypeFromUploadLogFile(): string {
    return 'RtcEngine_uploadLogFile';
  }

  setLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType = VideoMirrorModeType.VideoMirrorModeAuto
  ): number {
    const apiType = this.getApiTypeFromSetLocalRenderMode(
      renderMode,
      mirrorMode
    );
    const jsonParams = {
      renderMode: renderMode,
      mirrorMode: mirrorMode,
      toJSON: () => {
        return {
          renderMode: renderMode,
          mirrorMode: mirrorMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalRenderMode(
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType = VideoMirrorModeType.VideoMirrorModeAuto
  ): string {
    return 'RtcEngine_setLocalRenderMode';
  }

  setRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): number {
    const apiType = this.getApiTypeFromSetRemoteRenderMode(
      uid,
      renderMode,
      mirrorMode
    );
    const jsonParams = {
      uid: uid,
      renderMode: renderMode,
      mirrorMode: mirrorMode,
      toJSON: () => {
        return {
          uid: uid,
          renderMode: renderMode,
          mirrorMode: mirrorMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteRenderMode(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): string {
    return 'RtcEngine_setRemoteRenderMode';
  }

  setLocalVideoMirrorMode(mirrorMode: VideoMirrorModeType): number {
    const apiType = this.getApiTypeFromSetLocalVideoMirrorMode(mirrorMode);
    const jsonParams = {
      mirrorMode: mirrorMode,
      toJSON: () => {
        return {
          mirrorMode: mirrorMode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalVideoMirrorMode(
    mirrorMode: VideoMirrorModeType
  ): string {
    return 'RtcEngine_setLocalVideoMirrorMode';
  }

  enableDualStreamMode(enabled: boolean): SimulcastStreamConfig {
    const apiType = this.getApiTypeFromEnableDualStreamMode(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamConfig = jsonResults.streamConfig;
    return streamConfig;
  }

  protected getApiTypeFromEnableDualStreamMode(enabled: boolean): string {
    return 'RtcEngine_enableDualStreamMode';
  }

  setDualStreamMode(mode: SimulcastStreamMode): SimulcastStreamConfig {
    const apiType = this.getApiTypeFromSetDualStreamMode(mode);
    const jsonParams = {
      mode: mode,
      toJSON: () => {
        return {
          mode: mode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamConfig = jsonResults.streamConfig;
    return streamConfig;
  }

  protected getApiTypeFromSetDualStreamMode(mode: SimulcastStreamMode): string {
    return 'RtcEngine_setDualStreamMode';
  }

  enableCustomAudioLocalPlayback(trackId: number, enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableCustomAudioLocalPlayback(
      trackId,
      enabled
    );
    const jsonParams = {
      trackId: trackId,
      enabled: enabled,
      toJSON: () => {
        return {
          trackId: trackId,
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableCustomAudioLocalPlayback(
    trackId: number,
    enabled: boolean
  ): string {
    return 'RtcEngine_enableCustomAudioLocalPlayback';
  }

  setRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number {
    const apiType = this.getApiTypeFromSetRecordingAudioFrameParameters(
      sampleRate,
      channel,
      mode,
      samplesPerCall
    );
    const jsonParams = {
      sampleRate: sampleRate,
      channel: channel,
      mode: mode,
      samplesPerCall: samplesPerCall,
      toJSON: () => {
        return {
          sampleRate: sampleRate,
          channel: channel,
          mode: mode,
          samplesPerCall: samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRecordingAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): string {
    return 'RtcEngine_setRecordingAudioFrameParameters';
  }

  setPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number {
    const apiType = this.getApiTypeFromSetPlaybackAudioFrameParameters(
      sampleRate,
      channel,
      mode,
      samplesPerCall
    );
    const jsonParams = {
      sampleRate: sampleRate,
      channel: channel,
      mode: mode,
      samplesPerCall: samplesPerCall,
      toJSON: () => {
        return {
          sampleRate: sampleRate,
          channel: channel,
          mode: mode,
          samplesPerCall: samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlaybackAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): string {
    return 'RtcEngine_setPlaybackAudioFrameParameters';
  }

  setMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): number {
    const apiType = this.getApiTypeFromSetMixedAudioFrameParameters(
      sampleRate,
      channel,
      samplesPerCall
    );
    const jsonParams = {
      sampleRate: sampleRate,
      channel: channel,
      samplesPerCall: samplesPerCall,
      toJSON: () => {
        return {
          sampleRate: sampleRate,
          channel: channel,
          samplesPerCall: samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetMixedAudioFrameParameters(
    sampleRate: number,
    channel: number,
    samplesPerCall: number
  ): string {
    return 'RtcEngine_setMixedAudioFrameParameters';
  }

  setEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): number {
    const apiType = this.getApiTypeFromSetEarMonitoringAudioFrameParameters(
      sampleRate,
      channel,
      mode,
      samplesPerCall
    );
    const jsonParams = {
      sampleRate: sampleRate,
      channel: channel,
      mode: mode,
      samplesPerCall: samplesPerCall,
      toJSON: () => {
        return {
          sampleRate: sampleRate,
          channel: channel,
          mode: mode,
          samplesPerCall: samplesPerCall,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetEarMonitoringAudioFrameParameters(
    sampleRate: number,
    channel: number,
    mode: RawAudioFrameOpModeType,
    samplesPerCall: number
  ): string {
    return 'RtcEngine_setEarMonitoringAudioFrameParameters';
  }

  setPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): number {
    const apiType =
      this.getApiTypeFromSetPlaybackAudioFrameBeforeMixingParameters(
        sampleRate,
        channel
      );
    const jsonParams = {
      sampleRate: sampleRate,
      channel: channel,
      toJSON: () => {
        return {
          sampleRate: sampleRate,
          channel: channel,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetPlaybackAudioFrameBeforeMixingParameters(
    sampleRate: number,
    channel: number
  ): string {
    return 'RtcEngine_setPlaybackAudioFrameBeforeMixingParameters';
  }

  enableAudioSpectrumMonitor(intervalInMS: number = 100): number {
    const apiType = this.getApiTypeFromEnableAudioSpectrumMonitor(intervalInMS);
    const jsonParams = {
      intervalInMS: intervalInMS,
      toJSON: () => {
        return {
          intervalInMS: intervalInMS,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableAudioSpectrumMonitor(
    intervalInMS: number = 100
  ): string {
    return 'RtcEngine_enableAudioSpectrumMonitor';
  }

  disableAudioSpectrumMonitor(): number {
    const apiType = this.getApiTypeFromDisableAudioSpectrumMonitor();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDisableAudioSpectrumMonitor(): string {
    return 'RtcEngine_disableAudioSpectrumMonitor';
  }

  registerAudioSpectrumObserver(observer: IAudioSpectrumObserver): number {
    const apiType = this.getApiTypeFromRegisterAudioSpectrumObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): string {
    return 'RtcEngine_registerAudioSpectrumObserver';
  }

  unregisterAudioSpectrumObserver(observer: IAudioSpectrumObserver): number {
    const apiType =
      this.getApiTypeFromUnregisterAudioSpectrumObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): string {
    return 'RtcEngine_unregisterAudioSpectrumObserver';
  }

  adjustRecordingSignalVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustRecordingSignalVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustRecordingSignalVolume(volume: number): string {
    return 'RtcEngine_adjustRecordingSignalVolume';
  }

  muteRecordingSignal(mute: boolean): number {
    const apiType = this.getApiTypeFromMuteRecordingSignal(mute);
    const jsonParams = {
      mute: mute,
      toJSON: () => {
        return {
          mute: mute,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromMuteRecordingSignal(mute: boolean): string {
    return 'RtcEngine_muteRecordingSignal';
  }

  adjustPlaybackSignalVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustPlaybackSignalVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustPlaybackSignalVolume(volume: number): string {
    return 'RtcEngine_adjustPlaybackSignalVolume';
  }

  adjustUserPlaybackSignalVolume(uid: number, volume: number): number {
    const apiType = this.getApiTypeFromAdjustUserPlaybackSignalVolume(
      uid,
      volume
    );
    const jsonParams = {
      uid: uid,
      volume: volume,
      toJSON: () => {
        return {
          uid: uid,
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustUserPlaybackSignalVolume(
    uid: number,
    volume: number
  ): string {
    return 'RtcEngine_adjustUserPlaybackSignalVolume';
  }

  setLocalPublishFallbackOption(option: StreamFallbackOptions): number {
    const apiType = this.getApiTypeFromSetLocalPublishFallbackOption(option);
    const jsonParams = {
      option: option,
      toJSON: () => {
        return {
          option: option,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetLocalPublishFallbackOption(
    option: StreamFallbackOptions
  ): string {
    return 'RtcEngine_setLocalPublishFallbackOption';
  }

  setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): number {
    const apiType = this.getApiTypeFromSetRemoteSubscribeFallbackOption(option);
    const jsonParams = {
      option: option,
      toJSON: () => {
        return {
          option: option,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): string {
    return 'RtcEngine_setRemoteSubscribeFallbackOption';
  }

  setHighPriorityUserList(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): number {
    const apiType = this.getApiTypeFromSetHighPriorityUserList(
      uidList,
      uidNum,
      option
    );
    const jsonParams = {
      uidList: uidList,
      uidNum: uidNum,
      option: option,
      toJSON: () => {
        return {
          uidList: uidList,
          uidNum: uidNum,
          option: option,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetHighPriorityUserList(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): string {
    return 'RtcEngine_setHighPriorityUserList';
  }

  enableLoopbackRecording(enabled: boolean): string {
    const apiType = this.getApiTypeFromEnableLoopbackRecording(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceName = jsonResults.deviceName;
    return deviceName;
  }

  protected getApiTypeFromEnableLoopbackRecording(enabled: boolean): string {
    return 'RtcEngine_enableLoopbackRecording';
  }

  adjustLoopbackSignalVolume(volume: number): number {
    const apiType = this.getApiTypeFromAdjustLoopbackSignalVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustLoopbackSignalVolume(volume: number): string {
    return 'RtcEngine_adjustLoopbackSignalVolume';
  }

  getLoopbackRecordingVolume(): number {
    const apiType = this.getApiTypeFromGetLoopbackRecordingVolume();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetLoopbackRecordingVolume(): string {
    return 'RtcEngine_getLoopbackRecordingVolume';
  }

  enableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): number {
    const apiType = this.getApiTypeFromEnableInEarMonitoring(
      enabled,
      includeAudioFilters
    );
    const jsonParams = {
      enabled: enabled,
      includeAudioFilters: includeAudioFilters,
      toJSON: () => {
        return {
          enabled: enabled,
          includeAudioFilters: includeAudioFilters,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableInEarMonitoring(
    enabled: boolean,
    includeAudioFilters: EarMonitoringFilterType
  ): string {
    return 'RtcEngine_enableInEarMonitoring';
  }

  setInEarMonitoringVolume(volume: number): number {
    const apiType = this.getApiTypeFromSetInEarMonitoringVolume(volume);
    const jsonParams = {
      volume: volume,
      toJSON: () => {
        return {
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetInEarMonitoringVolume(volume: number): string {
    return 'RtcEngine_setInEarMonitoringVolume';
  }

  loadExtensionProvider(unloadAfterUse: boolean = false): string {
    const apiType = this.getApiTypeFromLoadExtensionProvider(unloadAfterUse);
    const jsonParams = {
      unload_after_use: unloadAfterUse,
      toJSON: () => {
        return {
          unload_after_use: unloadAfterUse,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const path = jsonResults.path;
    return path;
  }

  protected getApiTypeFromLoadExtensionProvider(
    unloadAfterUse: boolean = false
  ): string {
    return 'RtcEngine_loadExtensionProvider';
  }

  setExtensionProviderProperty(): {
    provider: string;
    key: string;
    value: string;
  } {
    const apiType = this.getApiTypeFromSetExtensionProviderProperty();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const provider = jsonResults.provider;
    const key = jsonResults.key;
    const value = jsonResults.value;
    return {
      provider,
      key,
      value,
    };
  }

  protected getApiTypeFromSetExtensionProviderProperty(): string {
    return 'RtcEngine_setExtensionProviderProperty';
  }

  registerExtension(
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): { provider: string; extension: string } {
    const apiType = this.getApiTypeFromRegisterExtension(type);
    const jsonParams = {
      type: type,
      toJSON: () => {
        return {
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const provider = jsonResults.provider;
    const extension = jsonResults.extension;
    return {
      provider,
      extension,
    };
  }

  protected getApiTypeFromRegisterExtension(
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): string {
    return 'RtcEngine_registerExtension';
  }

  enableExtension(
    enable: boolean = true,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): { provider: string; extension: string } {
    const apiType = this.getApiTypeFromEnableExtension(enable, type);
    const jsonParams = {
      enable: enable,
      type: type,
      toJSON: () => {
        return {
          enable: enable,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const provider = jsonResults.provider;
    const extension = jsonResults.extension;
    return {
      provider,
      extension,
    };
  }

  protected getApiTypeFromEnableExtension(
    enable: boolean = true,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): string {
    return 'RtcEngine_enableExtension';
  }

  setExtensionProperty(
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): { provider: string; extension: string; key: string; value: string } {
    const apiType = this.getApiTypeFromSetExtensionProperty(type);
    const jsonParams = {
      type: type,
      toJSON: () => {
        return {
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const provider = jsonResults.provider;
    const extension = jsonResults.extension;
    const key = jsonResults.key;
    const value = jsonResults.value;
    return {
      provider,
      extension,
      key,
      value,
    };
  }

  protected getApiTypeFromSetExtensionProperty(
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): string {
    return 'RtcEngine_setExtensionProperty';
  }

  getExtensionProperty(
    bufLen: number,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): { provider: string; extension: string; key: string; value: string } {
    const apiType = this.getApiTypeFromGetExtensionProperty(bufLen, type);
    const jsonParams = {
      buf_len: bufLen,
      type: type,
      toJSON: () => {
        return {
          buf_len: bufLen,
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const provider = jsonResults.provider;
    const extension = jsonResults.extension;
    const key = jsonResults.key;
    const value = jsonResults.value;
    return {
      provider,
      extension,
      key,
      value,
    };
  }

  protected getApiTypeFromGetExtensionProperty(
    bufLen: number,
    type: MediaSourceType = MediaSourceType.UnknownMediaSource
  ): string {
    return 'RtcEngine_getExtensionProperty';
  }

  setCameraCapturerConfiguration(): CameraCapturerConfiguration {
    const apiType = this.getApiTypeFromSetCameraCapturerConfiguration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromSetCameraCapturerConfiguration(): string {
    return 'RtcEngine_setCameraCapturerConfiguration';
  }

  createCustomVideoTrack(): number {
    const apiType = this.getApiTypeFromCreateCustomVideoTrack();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromCreateCustomVideoTrack(): string {
    return 'RtcEngine_createCustomVideoTrack';
  }

  createCustomEncodedVideoTrack(): {
    senderOption: SenderOptions;
    result: number;
  } {
    const apiType = this.getApiTypeFromCreateCustomEncodedVideoTrack();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const senderOption = jsonResults.sender_option;
    const result = jsonResults.result;
    return {
      senderOption,
      result,
    };
  }

  protected getApiTypeFromCreateCustomEncodedVideoTrack(): string {
    return 'RtcEngine_createCustomEncodedVideoTrack';
  }

  destroyCustomVideoTrack(videoTrackId: number): number {
    const apiType = this.getApiTypeFromDestroyCustomVideoTrack(videoTrackId);
    const jsonParams = {
      video_track_id: videoTrackId,
      toJSON: () => {
        return {
          video_track_id: videoTrackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDestroyCustomVideoTrack(
    videoTrackId: number
  ): string {
    return 'RtcEngine_destroyCustomVideoTrack';
  }

  destroyCustomEncodedVideoTrack(videoTrackId: number): number {
    const apiType =
      this.getApiTypeFromDestroyCustomEncodedVideoTrack(videoTrackId);
    const jsonParams = {
      video_track_id: videoTrackId,
      toJSON: () => {
        return {
          video_track_id: videoTrackId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromDestroyCustomEncodedVideoTrack(
    videoTrackId: number
  ): string {
    return 'RtcEngine_destroyCustomEncodedVideoTrack';
  }

  switchCamera(): number {
    const apiType = this.getApiTypeFromSwitchCamera();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSwitchCamera(): string {
    return 'RtcEngine_switchCamera';
  }

  isCameraZoomSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraZoomSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraZoomSupported(): string {
    return 'RtcEngine_isCameraZoomSupported';
  }

  isCameraFaceDetectSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraFaceDetectSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraFaceDetectSupported(): string {
    return 'RtcEngine_isCameraFaceDetectSupported';
  }

  isCameraTorchSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraTorchSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraTorchSupported(): string {
    return 'RtcEngine_isCameraTorchSupported';
  }

  isCameraFocusSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraFocusSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraFocusSupported(): string {
    return 'RtcEngine_isCameraFocusSupported';
  }

  isCameraAutoFocusFaceModeSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraAutoFocusFaceModeSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraAutoFocusFaceModeSupported(): string {
    return 'RtcEngine_isCameraAutoFocusFaceModeSupported';
  }

  setCameraZoomFactor(factor: number): number {
    const apiType = this.getApiTypeFromSetCameraZoomFactor(factor);
    const jsonParams = {
      factor: factor,
      toJSON: () => {
        return {
          factor: factor,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraZoomFactor(factor: number): string {
    return 'RtcEngine_setCameraZoomFactor';
  }

  enableFaceDetection(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableFaceDetection(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableFaceDetection(enabled: boolean): string {
    return 'RtcEngine_enableFaceDetection';
  }

  getCameraMaxZoomFactor(): number {
    const apiType = this.getApiTypeFromGetCameraMaxZoomFactor();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetCameraMaxZoomFactor(): string {
    return 'RtcEngine_getCameraMaxZoomFactor';
  }

  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): number {
    const apiType = this.getApiTypeFromSetCameraFocusPositionInPreview(
      positionX,
      positionY
    );
    const jsonParams = {
      positionX: positionX,
      positionY: positionY,
      toJSON: () => {
        return {
          positionX: positionX,
          positionY: positionY,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): string {
    return 'RtcEngine_setCameraFocusPositionInPreview';
  }

  setCameraTorchOn(isOn: boolean): number {
    const apiType = this.getApiTypeFromSetCameraTorchOn(isOn);
    const jsonParams = {
      isOn: isOn,
      toJSON: () => {
        return {
          isOn: isOn,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraTorchOn(isOn: boolean): string {
    return 'RtcEngine_setCameraTorchOn';
  }

  setCameraAutoFocusFaceModeEnabled(enabled: boolean): number {
    const apiType =
      this.getApiTypeFromSetCameraAutoFocusFaceModeEnabled(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraAutoFocusFaceModeEnabled(
    enabled: boolean
  ): string {
    return 'RtcEngine_setCameraAutoFocusFaceModeEnabled';
  }

  isCameraExposurePositionSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraExposurePositionSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraExposurePositionSupported(): string {
    return 'RtcEngine_isCameraExposurePositionSupported';
  }

  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): number {
    const apiType = this.getApiTypeFromSetCameraExposurePosition(
      positionXinView,
      positionYinView
    );
    const jsonParams = {
      positionXinView: positionXinView,
      positionYinView: positionYinView,
      toJSON: () => {
        return {
          positionXinView: positionXinView,
          positionYinView: positionYinView,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): string {
    return 'RtcEngine_setCameraExposurePosition';
  }

  isCameraExposureSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraExposureSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraExposureSupported(): string {
    return 'RtcEngine_isCameraExposureSupported';
  }

  setCameraExposureFactor(factor: number): number {
    const apiType = this.getApiTypeFromSetCameraExposureFactor(factor);
    const jsonParams = {
      factor: factor,
      toJSON: () => {
        return {
          factor: factor,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraExposureFactor(factor: number): string {
    return 'RtcEngine_setCameraExposureFactor';
  }

  isCameraAutoExposureFaceModeSupported(): boolean {
    const apiType = this.getApiTypeFromIsCameraAutoExposureFaceModeSupported();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsCameraAutoExposureFaceModeSupported(): string {
    return 'RtcEngine_isCameraAutoExposureFaceModeSupported';
  }

  setCameraAutoExposureFaceModeEnabled(enabled: boolean): number {
    const apiType =
      this.getApiTypeFromSetCameraAutoExposureFaceModeEnabled(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraAutoExposureFaceModeEnabled(
    enabled: boolean
  ): string {
    return 'RtcEngine_setCameraAutoExposureFaceModeEnabled';
  }

  setDefaultAudioRouteToSpeakerphone(defaultToSpeaker: boolean): number {
    const apiType =
      this.getApiTypeFromSetDefaultAudioRouteToSpeakerphone(defaultToSpeaker);
    const jsonParams = {
      defaultToSpeaker: defaultToSpeaker,
      toJSON: () => {
        return {
          defaultToSpeaker: defaultToSpeaker,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDefaultAudioRouteToSpeakerphone(
    defaultToSpeaker: boolean
  ): string {
    return 'RtcEngine_setDefaultAudioRouteToSpeakerphone';
  }

  setEnableSpeakerphone(speakerOn: boolean): number {
    const apiType = this.getApiTypeFromSetEnableSpeakerphone(speakerOn);
    const jsonParams = {
      speakerOn: speakerOn,
      toJSON: () => {
        return {
          speakerOn: speakerOn,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetEnableSpeakerphone(speakerOn: boolean): string {
    return 'RtcEngine_setEnableSpeakerphone';
  }

  isSpeakerphoneEnabled(): boolean {
    const apiType = this.getApiTypeFromIsSpeakerphoneEnabled();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsSpeakerphoneEnabled(): string {
    return 'RtcEngine_isSpeakerphoneEnabled';
  }

  setRouteInCommunicationMode(route: number): number {
    const apiType = this.getApiTypeFromSetRouteInCommunicationMode(route);
    const jsonParams = {
      route: route,
      toJSON: () => {
        return {
          route: route,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRouteInCommunicationMode(route: number): string {
    return 'RtcEngine_setRouteInCommunicationMode';
  }

  getScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): ScreenCaptureSourceInfo[] {
    const apiType = this.getApiTypeFromGetScreenCaptureSources(
      thumbSize,
      iconSize,
      includeScreen
    );
    const jsonParams = {
      thumbSize: thumbSize,
      iconSize: iconSize,
      includeScreen: includeScreen,
      toJSON: () => {
        return {
          thumbSize: thumbSize,
          iconSize: iconSize,
          includeScreen: includeScreen,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetScreenCaptureSources(
    thumbSize: Size,
    iconSize: Size,
    includeScreen: boolean
  ): string {
    return 'RtcEngine_getScreenCaptureSources';
  }

  setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): number {
    const apiType =
      this.getApiTypeFromSetAudioSessionOperationRestriction(restriction);
    const jsonParams = {
      restriction: restriction,
      toJSON: () => {
        return {
          restriction: restriction,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): string {
    return 'RtcEngine_setAudioSessionOperationRestriction';
  }

  startScreenCaptureByDisplayId(displayId: number): {
    regionRect: Rectangle;
    captureParams: ScreenCaptureParameters;
  } {
    const apiType = this.getApiTypeFromStartScreenCaptureByDisplayId(displayId);
    const jsonParams = {
      displayId: displayId,
      toJSON: () => {
        return {
          displayId: displayId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const regionRect = jsonResults.regionRect;
    const captureParams = jsonResults.captureParams;
    return {
      regionRect,
      captureParams,
    };
  }

  protected getApiTypeFromStartScreenCaptureByDisplayId(
    displayId: number
  ): string {
    return 'RtcEngine_startScreenCaptureByDisplayId';
  }

  startScreenCaptureByScreenRect(): {
    screenRect: Rectangle;
    regionRect: Rectangle;
    captureParams: ScreenCaptureParameters;
  } {
    const apiType = this.getApiTypeFromStartScreenCaptureByScreenRect();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const screenRect = jsonResults.screenRect;
    const regionRect = jsonResults.regionRect;
    const captureParams = jsonResults.captureParams;
    return {
      screenRect,
      regionRect,
      captureParams,
    };
  }

  protected getApiTypeFromStartScreenCaptureByScreenRect(): string {
    return 'RtcEngine_startScreenCaptureByScreenRect';
  }

  getAudioDeviceInfo(): DeviceInfo {
    const apiType = this.getApiTypeFromGetAudioDeviceInfo();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const deviceInfo = jsonResults.deviceInfo;
    return deviceInfo;
  }

  protected getApiTypeFromGetAudioDeviceInfo(): string {
    return 'RtcEngine_getAudioDeviceInfo';
  }

  startScreenCaptureByWindowId(windowId: any): {
    regionRect: Rectangle;
    captureParams: ScreenCaptureParameters;
  } {
    const apiType = this.getApiTypeFromStartScreenCaptureByWindowId(windowId);
    const jsonParams = {
      windowId: windowId,
      toJSON: () => {
        return {
          windowId: windowId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const regionRect = jsonResults.regionRect;
    const captureParams = jsonResults.captureParams;
    return {
      regionRect,
      captureParams,
    };
  }

  protected getApiTypeFromStartScreenCaptureByWindowId(windowId: any): string {
    return 'RtcEngine_startScreenCaptureByWindowId';
  }

  setScreenCaptureContentHint(contentHint: VideoContentHint): number {
    const apiType = this.getApiTypeFromSetScreenCaptureContentHint(contentHint);
    const jsonParams = {
      contentHint: contentHint,
      toJSON: () => {
        return {
          contentHint: contentHint,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetScreenCaptureContentHint(
    contentHint: VideoContentHint
  ): string {
    return 'RtcEngine_setScreenCaptureContentHint';
  }

  updateScreenCaptureRegion(): Rectangle {
    const apiType = this.getApiTypeFromUpdateScreenCaptureRegion();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const regionRect = jsonResults.regionRect;
    return regionRect;
  }

  protected getApiTypeFromUpdateScreenCaptureRegion(): string {
    return 'RtcEngine_updateScreenCaptureRegion';
  }

  updateScreenCaptureParameters(): ScreenCaptureParameters {
    const apiType = this.getApiTypeFromUpdateScreenCaptureParameters();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const captureParams = jsonResults.captureParams;
    return captureParams;
  }

  protected getApiTypeFromUpdateScreenCaptureParameters(): string {
    return 'RtcEngine_updateScreenCaptureParameters';
  }

  startScreenCapture(): ScreenCaptureParameters2 {
    const apiType = this.getApiTypeFromStartScreenCapture();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const captureParams = jsonResults.captureParams;
    return captureParams;
  }

  protected getApiTypeFromStartScreenCapture(): string {
    return 'RtcEngine_startScreenCapture';
  }

  startScreenCaptureBySourceType(
    sourceType: VideoSourceType
  ): ScreenCaptureConfiguration {
    const apiType =
      this.getApiTypeFromStartScreenCaptureBySourceType(sourceType);
    const jsonParams = {
      sourceType: sourceType,
      toJSON: () => {
        return {
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartScreenCaptureBySourceType(
    sourceType: VideoSourceType
  ): string {
    return 'RtcEngine_startScreenCaptureBySourceType';
  }

  updateScreenCapture(): ScreenCaptureParameters2 {
    const apiType = this.getApiTypeFromUpdateScreenCapture();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const captureParams = jsonResults.captureParams;
    return captureParams;
  }

  protected getApiTypeFromUpdateScreenCapture(): string {
    return 'RtcEngine_updateScreenCapture';
  }

  queryScreenCaptureCapability(): number {
    const apiType = this.getApiTypeFromQueryScreenCaptureCapability();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromQueryScreenCaptureCapability(): string {
    return 'RtcEngine_queryScreenCaptureCapability';
  }

  setScreenCaptureScenario(screenScenario: ScreenScenarioType): number {
    const apiType = this.getApiTypeFromSetScreenCaptureScenario(screenScenario);
    const jsonParams = {
      screenScenario: screenScenario,
      toJSON: () => {
        return {
          screenScenario: screenScenario,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetScreenCaptureScenario(
    screenScenario: ScreenScenarioType
  ): string {
    return 'RtcEngine_setScreenCaptureScenario';
  }

  stopScreenCapture(): number {
    const apiType = this.getApiTypeFromStopScreenCapture();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopScreenCapture(): string {
    return 'RtcEngine_stopScreenCapture';
  }

  stopScreenCaptureBySourceType(sourceType: VideoSourceType): number {
    const apiType =
      this.getApiTypeFromStopScreenCaptureBySourceType(sourceType);
    const jsonParams = {
      sourceType: sourceType,
      toJSON: () => {
        return {
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopScreenCaptureBySourceType(
    sourceType: VideoSourceType
  ): string {
    return 'RtcEngine_stopScreenCaptureBySourceType';
  }

  getCallId(): string {
    const apiType = this.getApiTypeFromGetCallId();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const callId = jsonResults.callId;
    return callId;
  }

  protected getApiTypeFromGetCallId(): string {
    return 'RtcEngine_getCallId';
  }

  rate(rating: number): { callId: string; description: string } {
    const apiType = this.getApiTypeFromRate(rating);
    const jsonParams = {
      rating: rating,
      toJSON: () => {
        return {
          rating: rating,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const callId = jsonResults.callId;
    const description = jsonResults.description;
    return {
      callId,
      description,
    };
  }

  protected getApiTypeFromRate(rating: number): string {
    return 'RtcEngine_rate';
  }

  complain(): { callId: string; description: string } {
    const apiType = this.getApiTypeFromComplain();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const callId = jsonResults.callId;
    const description = jsonResults.description;
    return {
      callId,
      description,
    };
  }

  protected getApiTypeFromComplain(): string {
    return 'RtcEngine_complain';
  }

  startRtmpStreamWithoutTranscoding(): string {
    const apiType = this.getApiTypeFromStartRtmpStreamWithoutTranscoding();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const url = jsonResults.url;
    return url;
  }

  protected getApiTypeFromStartRtmpStreamWithoutTranscoding(): string {
    return 'RtcEngine_startRtmpStreamWithoutTranscoding';
  }

  startRtmpStreamWithTranscoding(): {
    url: string;
    transcoding: LiveTranscoding;
  } {
    const apiType = this.getApiTypeFromStartRtmpStreamWithTranscoding();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const url = jsonResults.url;
    const transcoding = jsonResults.transcoding;
    return {
      url,
      transcoding,
    };
  }

  protected getApiTypeFromStartRtmpStreamWithTranscoding(): string {
    return 'RtcEngine_startRtmpStreamWithTranscoding';
  }

  updateRtmpTranscoding(): LiveTranscoding {
    const apiType = this.getApiTypeFromUpdateRtmpTranscoding();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const transcoding = jsonResults.transcoding;
    return transcoding;
  }

  protected getApiTypeFromUpdateRtmpTranscoding(): string {
    return 'RtcEngine_updateRtmpTranscoding';
  }

  stopRtmpStream(): string {
    const apiType = this.getApiTypeFromStopRtmpStream();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const url = jsonResults.url;
    return url;
  }

  protected getApiTypeFromStopRtmpStream(): string {
    return 'RtcEngine_stopRtmpStream';
  }

  startLocalVideoTranscoder(): LocalTranscoderConfiguration {
    const apiType = this.getApiTypeFromStartLocalVideoTranscoder();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartLocalVideoTranscoder(): string {
    return 'RtcEngine_startLocalVideoTranscoder';
  }

  updateLocalTranscoderConfiguration(): LocalTranscoderConfiguration {
    const apiType = this.getApiTypeFromUpdateLocalTranscoderConfiguration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromUpdateLocalTranscoderConfiguration(): string {
    return 'RtcEngine_updateLocalTranscoderConfiguration';
  }

  stopLocalVideoTranscoder(): number {
    const apiType = this.getApiTypeFromStopLocalVideoTranscoder();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopLocalVideoTranscoder(): string {
    return 'RtcEngine_stopLocalVideoTranscoder';
  }

  startCameraCapture(sourceType: VideoSourceType): CameraCapturerConfiguration {
    const apiType = this.getApiTypeFromStartCameraCapture(sourceType);
    const jsonParams = {
      sourceType: sourceType,
      toJSON: () => {
        return {
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromStartCameraCapture(
    sourceType: VideoSourceType
  ): string {
    return 'RtcEngine_startCameraCapture';
  }

  stopCameraCapture(sourceType: VideoSourceType): number {
    const apiType = this.getApiTypeFromStopCameraCapture(sourceType);
    const jsonParams = {
      sourceType: sourceType,
      toJSON: () => {
        return {
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopCameraCapture(
    sourceType: VideoSourceType
  ): string {
    return 'RtcEngine_stopCameraCapture';
  }

  setCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number {
    const apiType = this.getApiTypeFromSetCameraDeviceOrientation(
      type,
      orientation
    );
    const jsonParams = {
      type: type,
      orientation: orientation,
      toJSON: () => {
        return {
          type: type,
          orientation: orientation,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCameraDeviceOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): string {
    return 'RtcEngine_setCameraDeviceOrientation';
  }

  setScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): number {
    const apiType = this.getApiTypeFromSetScreenCaptureOrientation(
      type,
      orientation
    );
    const jsonParams = {
      type: type,
      orientation: orientation,
      toJSON: () => {
        return {
          type: type,
          orientation: orientation,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetScreenCaptureOrientation(
    type: VideoSourceType,
    orientation: VideoOrientation
  ): string {
    return 'RtcEngine_setScreenCaptureOrientation';
  }

  getConnectionState(): ConnectionStateType {
    const apiType = this.getApiTypeFromGetConnectionState();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetConnectionState(): string {
    return 'RtcEngine_getConnectionState';
  }

  registerEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    const apiType = this.getApiTypeFromRegisterEventHandler(eventHandler);
    const jsonParams = {
      eventHandler: eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): string {
    return 'RtcEngine_registerEventHandler';
  }

  unregisterEventHandler(eventHandler: IRtcEngineEventHandler): boolean {
    const apiType = this.getApiTypeFromUnregisterEventHandler(eventHandler);
    const jsonParams = {
      eventHandler: eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterEventHandler(
    eventHandler: IRtcEngineEventHandler
  ): string {
    return 'RtcEngine_unregisterEventHandler';
  }

  setRemoteUserPriority(uid: number, userPriority: PriorityType): number {
    const apiType = this.getApiTypeFromSetRemoteUserPriority(uid, userPriority);
    const jsonParams = {
      uid: uid,
      userPriority: userPriority,
      toJSON: () => {
        return {
          uid: uid,
          userPriority: userPriority,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetRemoteUserPriority(
    uid: number,
    userPriority: PriorityType
  ): string {
    return 'RtcEngine_setRemoteUserPriority';
  }

  setEncryptionMode(): string {
    const apiType = this.getApiTypeFromSetEncryptionMode();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const encryptionMode = jsonResults.encryptionMode;
    return encryptionMode;
  }

  protected getApiTypeFromSetEncryptionMode(): string {
    return 'RtcEngine_setEncryptionMode';
  }

  setEncryptionSecret(): string {
    const apiType = this.getApiTypeFromSetEncryptionSecret();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const secret = jsonResults.secret;
    return secret;
  }

  protected getApiTypeFromSetEncryptionSecret(): string {
    return 'RtcEngine_setEncryptionSecret';
  }

  enableEncryption(enabled: boolean): EncryptionConfig {
    const apiType = this.getApiTypeFromEnableEncryption(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromEnableEncryption(enabled: boolean): string {
    return 'RtcEngine_enableEncryption';
  }

  createDataStream(config: DataStreamConfig): number {
    const apiType = this.getApiTypeFromCreateDataStream(config);
    const jsonParams = {
      config: config,
      toJSON: () => {
        return {
          config: config,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const streamId = jsonResults.streamId;
    return streamId;
  }

  protected getApiTypeFromCreateDataStream(config: DataStreamConfig): string {
    return 'RtcEngine_createDataStream';
  }

  sendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): number {
    const apiType = this.getApiTypeFromSendStreamMessage(
      streamId,
      data,
      length
    );
    const jsonParams = {
      streamId: streamId,
      data: data,
      length: length,
      toJSON: () => {
        return {
          streamId: streamId,
          length: length,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSendStreamMessage(
    streamId: number,
    data: Uint8Array,
    length: number
  ): string {
    return 'RtcEngine_sendStreamMessage';
  }

  addVideoWatermark(): { watermarkUrl: string; options: WatermarkOptions } {
    const apiType = this.getApiTypeFromAddVideoWatermark();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const watermarkUrl = jsonResults.watermarkUrl;
    const options = jsonResults.options;
    return {
      watermarkUrl,
      options,
    };
  }

  protected getApiTypeFromAddVideoWatermark(): string {
    return 'RtcEngine_addVideoWatermark';
  }

  clearVideoWatermarks(): number {
    const apiType = this.getApiTypeFromClearVideoWatermarks();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromClearVideoWatermarks(): string {
    return 'RtcEngine_clearVideoWatermarks';
  }

  pauseAudio(): number {
    const apiType = this.getApiTypeFromPauseAudio();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPauseAudio(): string {
    return 'RtcEngine_pauseAudio';
  }

  resumeAudio(): number {
    const apiType = this.getApiTypeFromResumeAudio();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResumeAudio(): string {
    return 'RtcEngine_resumeAudio';
  }

  enableWebSdkInteroperability(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableWebSdkInteroperability(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableWebSdkInteroperability(
    enabled: boolean
  ): string {
    return 'RtcEngine_enableWebSdkInteroperability';
  }

  sendCustomReportMessage(value: number): {
    id: string;
    category: string;
    event: string;
    label: string;
  } {
    const apiType = this.getApiTypeFromSendCustomReportMessage(value);
    const jsonParams = {
      value: value,
      toJSON: () => {
        return {
          value: value,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const id = jsonResults.id;
    const category = jsonResults.category;
    const event = jsonResults.event;
    const label = jsonResults.label;
    return {
      id,
      category,
      event,
      label,
    };
  }

  protected getApiTypeFromSendCustomReportMessage(value: number): string {
    return 'RtcEngine_sendCustomReportMessage';
  }

  registerMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    const apiType = this.getApiTypeFromRegisterMediaMetadataObserver(
      observer,
      type
    );
    const jsonParams = {
      observer: observer,
      type: type,
      toJSON: () => {
        return {
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): string {
    return 'RtcEngine_registerMediaMetadataObserver';
  }

  unregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): number {
    const apiType = this.getApiTypeFromUnregisterMediaMetadataObserver(
      observer,
      type
    );
    const jsonParams = {
      observer: observer,
      type: type,
      toJSON: () => {
        return {
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterMediaMetadataObserver(
    observer: IMetadataObserver,
    type: MetadataType
  ): string {
    return 'RtcEngine_unregisterMediaMetadataObserver';
  }

  startAudioFrameDump(
    userId: number,
    durationMs: number,
    autoUpload: boolean
  ): { channelId: string; location: string; uuid: string; passwd: string } {
    const apiType = this.getApiTypeFromStartAudioFrameDump(
      userId,
      durationMs,
      autoUpload
    );
    const jsonParams = {
      user_id: userId,
      duration_ms: durationMs,
      auto_upload: autoUpload,
      toJSON: () => {
        return {
          user_id: userId,
          duration_ms: durationMs,
          auto_upload: autoUpload,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const channelId = jsonResults.channel_id;
    const location = jsonResults.location;
    const uuid = jsonResults.uuid;
    const passwd = jsonResults.passwd;
    return {
      channelId,
      location,
      uuid,
      passwd,
    };
  }

  protected getApiTypeFromStartAudioFrameDump(
    userId: number,
    durationMs: number,
    autoUpload: boolean
  ): string {
    return 'RtcEngine_startAudioFrameDump';
  }

  stopAudioFrameDump(userId: number): { channelId: string; location: string } {
    const apiType = this.getApiTypeFromStopAudioFrameDump(userId);
    const jsonParams = {
      user_id: userId,
      toJSON: () => {
        return {
          user_id: userId,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const channelId = jsonResults.channel_id;
    const location = jsonResults.location;
    return {
      channelId,
      location,
    };
  }

  protected getApiTypeFromStopAudioFrameDump(userId: number): string {
    return 'RtcEngine_stopAudioFrameDump';
  }

  setAINSMode(enabled: boolean, mode: AudioAinsMode): number {
    const apiType = this.getApiTypeFromSetAINSMode(enabled, mode);
    const jsonParams = {
      enabled: enabled,
      mode: mode,
      toJSON: () => {
        return {
          enabled: enabled,
          mode: mode,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAINSMode(
    enabled: boolean,
    mode: AudioAinsMode
  ): string {
    return 'RtcEngine_setAINSMode';
  }

  registerLocalUserAccount(): { appId: string; userAccount: string } {
    const apiType = this.getApiTypeFromRegisterLocalUserAccount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const appId = jsonResults.appId;
    const userAccount = jsonResults.userAccount;
    return {
      appId,
      userAccount,
    };
  }

  protected getApiTypeFromRegisterLocalUserAccount(): string {
    return 'RtcEngine_registerLocalUserAccount';
  }

  joinChannelWithUserAccount(): {
    token: string;
    channelId: string;
    userAccount: string;
    options: ChannelMediaOptions;
  } {
    const apiType = this.getApiTypeFromJoinChannelWithUserAccount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    const channelId = jsonResults.channelId;
    const userAccount = jsonResults.userAccount;
    const options = jsonResults.options;
    return {
      token,
      channelId,
      userAccount,
      options,
    };
  }

  protected getApiTypeFromJoinChannelWithUserAccount(): string {
    return 'RtcEngine_joinChannelWithUserAccount';
  }

  joinChannelWithUserAccountEx(): {
    token: string;
    channelId: string;
    userAccount: string;
    options: ChannelMediaOptions;
  } {
    const apiType = this.getApiTypeFromJoinChannelWithUserAccountEx();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const token = jsonResults.token;
    const channelId = jsonResults.channelId;
    const userAccount = jsonResults.userAccount;
    const options = jsonResults.options;
    return {
      token,
      channelId,
      userAccount,
      options,
    };
  }

  protected getApiTypeFromJoinChannelWithUserAccountEx(): string {
    return 'RtcEngine_joinChannelWithUserAccountEx';
  }

  getUserInfoByUserAccount(): { userAccount: string; userInfo: UserInfo } {
    const apiType = this.getApiTypeFromGetUserInfoByUserAccount();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userAccount = jsonResults.userAccount;
    const userInfo = jsonResults.userInfo;
    return {
      userAccount,
      userInfo,
    };
  }

  protected getApiTypeFromGetUserInfoByUserAccount(): string {
    return 'RtcEngine_getUserInfoByUserAccount';
  }

  getUserInfoByUid(uid: number): UserInfo {
    const apiType = this.getApiTypeFromGetUserInfoByUid(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const userInfo = jsonResults.userInfo;
    return userInfo;
  }

  protected getApiTypeFromGetUserInfoByUid(uid: number): string {
    return 'RtcEngine_getUserInfoByUid';
  }

  startOrUpdateChannelMediaRelay(): ChannelMediaRelayConfiguration {
    const apiType = this.getApiTypeFromStartOrUpdateChannelMediaRelay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const configuration = jsonResults.configuration;
    return configuration;
  }

  protected getApiTypeFromStartOrUpdateChannelMediaRelay(): string {
    return 'RtcEngine_startOrUpdateChannelMediaRelay';
  }

  startChannelMediaRelay(): ChannelMediaRelayConfiguration {
    const apiType = this.getApiTypeFromStartChannelMediaRelay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const configuration = jsonResults.configuration;
    return configuration;
  }

  protected getApiTypeFromStartChannelMediaRelay(): string {
    return 'RtcEngine_startChannelMediaRelay';
  }

  updateChannelMediaRelay(): ChannelMediaRelayConfiguration {
    const apiType = this.getApiTypeFromUpdateChannelMediaRelay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const configuration = jsonResults.configuration;
    return configuration;
  }

  protected getApiTypeFromUpdateChannelMediaRelay(): string {
    return 'RtcEngine_updateChannelMediaRelay';
  }

  stopChannelMediaRelay(): number {
    const apiType = this.getApiTypeFromStopChannelMediaRelay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopChannelMediaRelay(): string {
    return 'RtcEngine_stopChannelMediaRelay';
  }

  pauseAllChannelMediaRelay(): number {
    const apiType = this.getApiTypeFromPauseAllChannelMediaRelay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromPauseAllChannelMediaRelay(): string {
    return 'RtcEngine_pauseAllChannelMediaRelay';
  }

  resumeAllChannelMediaRelay(): number {
    const apiType = this.getApiTypeFromResumeAllChannelMediaRelay();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromResumeAllChannelMediaRelay(): string {
    return 'RtcEngine_resumeAllChannelMediaRelay';
  }

  setDirectCdnStreamingAudioConfiguration(profile: AudioProfileType): number {
    const apiType =
      this.getApiTypeFromSetDirectCdnStreamingAudioConfiguration(profile);
    const jsonParams = {
      profile: profile,
      toJSON: () => {
        return {
          profile: profile,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetDirectCdnStreamingAudioConfiguration(
    profile: AudioProfileType
  ): string {
    return 'RtcEngine_setDirectCdnStreamingAudioConfiguration';
  }

  setDirectCdnStreamingVideoConfiguration(): VideoEncoderConfiguration {
    const apiType =
      this.getApiTypeFromSetDirectCdnStreamingVideoConfiguration();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromSetDirectCdnStreamingVideoConfiguration(): string {
    return 'RtcEngine_setDirectCdnStreamingVideoConfiguration';
  }

  startDirectCdnStreaming(eventHandler: IDirectCdnStreamingEventHandler): {
    publishUrl: string;
    options: DirectCdnStreamingMediaOptions;
  } {
    const apiType = this.getApiTypeFromStartDirectCdnStreaming(eventHandler);
    const jsonParams = {
      eventHandler: eventHandler,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const publishUrl = jsonResults.publishUrl;
    const options = jsonResults.options;
    return {
      publishUrl,
      options,
    };
  }

  protected getApiTypeFromStartDirectCdnStreaming(
    eventHandler: IDirectCdnStreamingEventHandler
  ): string {
    return 'RtcEngine_startDirectCdnStreaming';
  }

  stopDirectCdnStreaming(): number {
    const apiType = this.getApiTypeFromStopDirectCdnStreaming();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopDirectCdnStreaming(): string {
    return 'RtcEngine_stopDirectCdnStreaming';
  }

  updateDirectCdnStreamingMediaOptions(): DirectCdnStreamingMediaOptions {
    const apiType = this.getApiTypeFromUpdateDirectCdnStreamingMediaOptions();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromUpdateDirectCdnStreamingMediaOptions(): string {
    return 'RtcEngine_updateDirectCdnStreamingMediaOptions';
  }

  startRhythmPlayer(): {
    sound1: string;
    sound2: string;
    config: AgoraRhythmPlayerConfig;
  } {
    const apiType = this.getApiTypeFromStartRhythmPlayer();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const sound1 = jsonResults.sound1;
    const sound2 = jsonResults.sound2;
    const config = jsonResults.config;
    return {
      sound1,
      sound2,
      config,
    };
  }

  protected getApiTypeFromStartRhythmPlayer(): string {
    return 'RtcEngine_startRhythmPlayer';
  }

  stopRhythmPlayer(): number {
    const apiType = this.getApiTypeFromStopRhythmPlayer();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStopRhythmPlayer(): string {
    return 'RtcEngine_stopRhythmPlayer';
  }

  configRhythmPlayer(): AgoraRhythmPlayerConfig {
    const apiType = this.getApiTypeFromConfigRhythmPlayer();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromConfigRhythmPlayer(): string {
    return 'RtcEngine_configRhythmPlayer';
  }

  takeSnapshot(uid: number): string {
    const apiType = this.getApiTypeFromTakeSnapshot(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const filePath = jsonResults.filePath;
    return filePath;
  }

  protected getApiTypeFromTakeSnapshot(uid: number): string {
    return 'RtcEngine_takeSnapshot';
  }

  enableContentInspect(enabled: boolean): ContentInspectConfig {
    const apiType = this.getApiTypeFromEnableContentInspect(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromEnableContentInspect(enabled: boolean): string {
    return 'RtcEngine_enableContentInspect';
  }

  adjustCustomAudioPublishVolume(trackId: number, volume: number): number {
    const apiType = this.getApiTypeFromAdjustCustomAudioPublishVolume(
      trackId,
      volume
    );
    const jsonParams = {
      trackId: trackId,
      volume: volume,
      toJSON: () => {
        return {
          trackId: trackId,
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustCustomAudioPublishVolume(
    trackId: number,
    volume: number
  ): string {
    return 'RtcEngine_adjustCustomAudioPublishVolume';
  }

  adjustCustomAudioPlayoutVolume(trackId: number, volume: number): number {
    const apiType = this.getApiTypeFromAdjustCustomAudioPlayoutVolume(
      trackId,
      volume
    );
    const jsonParams = {
      trackId: trackId,
      volume: volume,
      toJSON: () => {
        return {
          trackId: trackId,
          volume: volume,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromAdjustCustomAudioPlayoutVolume(
    trackId: number,
    volume: number
  ): string {
    return 'RtcEngine_adjustCustomAudioPlayoutVolume';
  }

  setCloudProxy(proxyType: CloudProxyType): number {
    const apiType = this.getApiTypeFromSetCloudProxy(proxyType);
    const jsonParams = {
      proxyType: proxyType,
      toJSON: () => {
        return {
          proxyType: proxyType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetCloudProxy(proxyType: CloudProxyType): string {
    return 'RtcEngine_setCloudProxy';
  }

  setLocalAccessPoint(): LocalAccessPointConfiguration {
    const apiType = this.getApiTypeFromSetLocalAccessPoint();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const config = jsonResults.config;
    return config;
  }

  protected getApiTypeFromSetLocalAccessPoint(): string {
    return 'RtcEngine_setLocalAccessPoint';
  }

  setAdvancedAudioOptions(
    options: AdvancedAudioOptions,
    sourceType: number = 0
  ): number {
    const apiType = this.getApiTypeFromSetAdvancedAudioOptions(
      options,
      sourceType
    );
    const jsonParams = {
      options: options,
      sourceType: sourceType,
      toJSON: () => {
        return {
          options: options,
          sourceType: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetAdvancedAudioOptions(
    options: AdvancedAudioOptions,
    sourceType: number = 0
  ): string {
    return 'RtcEngine_setAdvancedAudioOptions';
  }

  setAVSyncSource(uid: number): string {
    const apiType = this.getApiTypeFromSetAVSyncSource(uid);
    const jsonParams = {
      uid: uid,
      toJSON: () => {
        return {
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const channelId = jsonResults.channelId;
    return channelId;
  }

  protected getApiTypeFromSetAVSyncSource(uid: number): string {
    return 'RtcEngine_setAVSyncSource';
  }

  enableVideoImageSource(enable: boolean): ImageTrackOptions {
    const apiType = this.getApiTypeFromEnableVideoImageSource(enable);
    const jsonParams = {
      enable: enable,
      toJSON: () => {
        return {
          enable: enable,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const options = jsonResults.options;
    return options;
  }

  protected getApiTypeFromEnableVideoImageSource(enable: boolean): string {
    return 'RtcEngine_enableVideoImageSource';
  }

  getCurrentMonotonicTimeInMs(): number {
    const apiType = this.getApiTypeFromGetCurrentMonotonicTimeInMs();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetCurrentMonotonicTimeInMs(): string {
    return 'RtcEngine_getCurrentMonotonicTimeInMs';
  }

  enableWirelessAccelerate(enabled: boolean): number {
    const apiType = this.getApiTypeFromEnableWirelessAccelerate(enabled);
    const jsonParams = {
      enabled: enabled,
      toJSON: () => {
        return {
          enabled: enabled,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableWirelessAccelerate(enabled: boolean): string {
    return 'RtcEngine_enableWirelessAccelerate';
  }

  getNetworkType(): number {
    const apiType = this.getApiTypeFromGetNetworkType();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetNetworkType(): string {
    return 'RtcEngine_getNetworkType';
  }

  setParameters(): string {
    const apiType = this.getApiTypeFromSetParameters();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const parameters = jsonResults.parameters;
    return parameters;
  }

  protected getApiTypeFromSetParameters(): string {
    return 'RtcEngine_setParameters';
  }

  startMediaRenderingTracing(): number {
    const apiType = this.getApiTypeFromStartMediaRenderingTracing();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromStartMediaRenderingTracing(): string {
    return 'RtcEngine_startMediaRenderingTracing';
  }

  enableInstantMediaRendering(): number {
    const apiType = this.getApiTypeFromEnableInstantMediaRendering();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableInstantMediaRendering(): string {
    return 'RtcEngine_enableInstantMediaRendering';
  }

  getNtpWallTimeInMs(): number {
    const apiType = this.getApiTypeFromGetNtpWallTimeInMs();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetNtpWallTimeInMs(): string {
    return 'RtcEngine_getNtpWallTimeInMs';
  }

  isFeatureAvailableOnDevice(type: FeatureType): boolean {
    const apiType = this.getApiTypeFromIsFeatureAvailableOnDevice(type);
    const jsonParams = {
      type: type,
      toJSON: () => {
        return {
          type: type,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromIsFeatureAvailableOnDevice(
    type: FeatureType
  ): string {
    return 'RtcEngine_isFeatureAvailableOnDevice';
  }

  getAudioDeviceManager(): IAudioDeviceManager {
    const apiType = this.getApiTypeFromGetAudioDeviceManager();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetAudioDeviceManager(): string {
    return 'RtcEngine_getAudioDeviceManager';
  }

  getVideoDeviceManager(): IVideoDeviceManager {
    const apiType = this.getApiTypeFromGetVideoDeviceManager();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetVideoDeviceManager(): string {
    return 'RtcEngine_getVideoDeviceManager';
  }

  getMusicContentCenter(): IMusicContentCenter {
    const apiType = this.getApiTypeFromGetMusicContentCenter();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetMusicContentCenter(): string {
    return 'RtcEngine_getMusicContentCenter';
  }

  getMediaEngine(): IMediaEngine {
    const apiType = this.getApiTypeFromGetMediaEngine();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetMediaEngine(): string {
    return 'RtcEngine_getMediaEngine';
  }

  getLocalSpatialAudioEngine(): ILocalSpatialAudioEngine {
    const apiType = this.getApiTypeFromGetLocalSpatialAudioEngine();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetLocalSpatialAudioEngine(): string {
    return 'RtcEngine_getLocalSpatialAudioEngine';
  }

  sendMetaData(sourceType: VideoSourceType): Metadata {
    const apiType = this.getApiTypeFromSendMetaData(sourceType);
    const jsonParams = {
      source_type: sourceType,
      toJSON: () => {
        return {
          source_type: sourceType,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    const metadata = jsonResults.metadata;
    return metadata;
  }

  protected getApiTypeFromSendMetaData(sourceType: VideoSourceType): string {
    return 'RtcEngine_sendMetaData';
  }

  setMaxMetadataSize(size: number): number {
    const apiType = this.getApiTypeFromSetMaxMetadataSize(size);
    const jsonParams = {
      size: size,
      toJSON: () => {
        return {
          size: size,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromSetMaxMetadataSize(size: number): string {
    return 'RtcEngine_setMaxMetadataSize';
  }

  unregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): number {
    const apiType =
      this.getApiTypeFromUnregisterAudioEncodedFrameObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterAudioEncodedFrameObserver(
    observer: IAudioEncodedFrameObserver
  ): string {
    return 'RtcEngine_unregisterAudioEncodedFrameObserver';
  }

  getNativeHandle(): number {
    const apiType = this.getApiTypeFromGetNativeHandle();
    const jsonParams = {};
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromGetNativeHandle(): string {
    return 'RtcEngine_getNativeHandle';
  }
}

import { callIrisApi } from '../internal/IrisApiEngine';
