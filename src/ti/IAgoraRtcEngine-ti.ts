/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const IRtcEngineEventHandler = t.iface([], {
  "onJoinChannelSuccess": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("elapsed", "number"))),
  "onRejoinChannelSuccess": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("elapsed", "number"))),
  "onProxyConnected": t.opt(t.func("void", t.param("channel", "string"), t.param("uid", "number"), t.param("proxyType", "ProxyType"), t.param("localProxyIp", "string"), t.param("elapsed", "number"))),
  "onError": t.opt(t.func("void", t.param("err", "ErrorCodeType"), t.param("msg", "string"))),
  "onAudioQuality": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("quality", "QualityType"), t.param("delay", "number"), t.param("lost", "number"))),
  "onLastmileProbeResult": t.opt(t.func("void", t.param("result", "LastmileProbeResult"))),
  "onAudioVolumeIndication": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("speakers", t.array("AudioVolumeInfo")), t.param("speakerNumber", "number"), t.param("totalVolume", "number"))),
  "onLeaveChannel": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("stats", "RtcStats"))),
  "onRtcStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("stats", "RtcStats"))),
  "onAudioDeviceStateChanged": t.opt(t.func("void", t.param("deviceId", "string"), t.param("deviceType", "MediaDeviceType"), t.param("deviceState", "MediaDeviceStateType"))),
  "onAudioMixingPositionChanged": t.opt(t.func("void", t.param("position", "number"))),
  "onAudioMixingFinished": t.opt(t.func("void")),
  "onAudioEffectFinished": t.opt(t.func("void", t.param("soundId", "number"))),
  "onVideoDeviceStateChanged": t.opt(t.func("void", t.param("deviceId", "string"), t.param("deviceType", "MediaDeviceType"), t.param("deviceState", "MediaDeviceStateType"))),
  "onNetworkQuality": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("txQuality", "QualityType"), t.param("rxQuality", "QualityType"))),
  "onIntraRequestReceived": t.opt(t.func("void", t.param("connection", "RtcConnection"))),
  "onUplinkNetworkInfoUpdated": t.opt(t.func("void", t.param("info", "UplinkNetworkInfo"))),
  "onDownlinkNetworkInfoUpdated": t.opt(t.func("void", t.param("info", "DownlinkNetworkInfo"))),
  "onLastmileQuality": t.opt(t.func("void", t.param("quality", "QualityType"))),
  "onFirstLocalVideoFrame": t.opt(t.func("void", t.param("source", "VideoSourceType"), t.param("width", "number"), t.param("height", "number"), t.param("elapsed", "number"))),
  "onFirstLocalVideoFramePublished": t.opt(t.func("void", t.param("source", "VideoSourceType"), t.param("elapsed", "number"))),
  "onFirstRemoteVideoDecoded": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("width", "number"), t.param("height", "number"), t.param("elapsed", "number"))),
  "onVideoSizeChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("sourceType", "VideoSourceType"), t.param("uid", "number"), t.param("width", "number"), t.param("height", "number"), t.param("rotation", "number"))),
  "onLocalVideoStateChanged": t.opt(t.func("void", t.param("source", "VideoSourceType"), t.param("state", "LocalVideoStreamState"), t.param("reason", "LocalVideoStreamReason"))),
  "onRemoteVideoStateChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("state", "RemoteVideoState"), t.param("reason", "RemoteVideoStateReason"), t.param("elapsed", "number"))),
  "onFirstRemoteVideoFrame": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("width", "number"), t.param("height", "number"), t.param("elapsed", "number"))),
  "onUserJoined": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("elapsed", "number"))),
  "onUserOffline": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("reason", "UserOfflineReasonType"))),
  "onUserMuteAudio": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("muted", "boolean"))),
  "onUserMuteVideo": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("muted", "boolean"))),
  "onUserEnableVideo": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("enabled", "boolean"))),
  "onUserStateChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("state", "number"))),
  "onUserEnableLocalVideo": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("enabled", "boolean"))),
  "onRemoteAudioStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("stats", "RemoteAudioStats"))),
  "onLocalAudioStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("stats", "LocalAudioStats"))),
  "onLocalVideoStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("stats", "LocalVideoStats"))),
  "onRemoteVideoStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("stats", "RemoteVideoStats"))),
  "onCameraReady": t.opt(t.func("void")),
  "onCameraFocusAreaChanged": t.opt(t.func("void", t.param("x", "number"), t.param("y", "number"), t.param("width", "number"), t.param("height", "number"))),
  "onCameraExposureAreaChanged": t.opt(t.func("void", t.param("x", "number"), t.param("y", "number"), t.param("width", "number"), t.param("height", "number"))),
  "onFacePositionChanged": t.opt(t.func("void", t.param("imageWidth", "number"), t.param("imageHeight", "number"), t.param("vecRectangle", t.array("Rectangle")), t.param("vecDistance", t.array("number")), t.param("numFaces", "number"))),
  "onVideoStopped": t.opt(t.func("void")),
  "onAudioMixingStateChanged": t.opt(t.func("void", t.param("state", "AudioMixingStateType"), t.param("reason", "AudioMixingReasonType"))),
  "onRhythmPlayerStateChanged": t.opt(t.func("void", t.param("state", "RhythmPlayerStateType"), t.param("reason", "RhythmPlayerReason"))),
  "onConnectionLost": t.opt(t.func("void", t.param("connection", "RtcConnection"))),
  "onConnectionInterrupted": t.opt(t.func("void", t.param("connection", "RtcConnection"))),
  "onConnectionBanned": t.opt(t.func("void", t.param("connection", "RtcConnection"))),
  "onStreamMessage": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("streamId", "number"), t.param("data", "Uint8Array"), t.param("length", "number"), t.param("sentTs", "number"))),
  "onStreamMessageError": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("streamId", "number"), t.param("code", "ErrorCodeType"), t.param("missed", "number"), t.param("cached", "number"))),
  "onRequestToken": t.opt(t.func("void", t.param("connection", "RtcConnection"))),
  "onTokenPrivilegeWillExpire": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("token", "string"))),
  "onLicenseValidationFailure": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("reason", "LicenseErrorType"))),
  "onFirstLocalAudioFramePublished": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("elapsed", "number"))),
  "onFirstRemoteAudioDecoded": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("uid", "number"), t.param("elapsed", "number"))),
  "onFirstRemoteAudioFrame": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("userId", "number"), t.param("elapsed", "number"))),
  "onLocalAudioStateChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("state", "LocalAudioStreamState"), t.param("reason", "LocalAudioStreamReason"))),
  "onRemoteAudioStateChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("state", "RemoteAudioState"), t.param("reason", "RemoteAudioStateReason"), t.param("elapsed", "number"))),
  "onActiveSpeaker": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("uid", "number"))),
  "onContentInspectResult": t.opt(t.func("void", t.param("result", "ContentInspectResult"))),
  "onSnapshotTaken": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("uid", "number"), t.param("filePath", "string"), t.param("width", "number"), t.param("height", "number"), t.param("errCode", "number"))),
  "onClientRoleChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("oldRole", "ClientRoleType"), t.param("newRole", "ClientRoleType"), t.param("newRoleOptions", "ClientRoleOptions"))),
  "onClientRoleChangeFailed": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("reason", "ClientRoleChangeFailedReason"), t.param("currentRole", "ClientRoleType"))),
  "onAudioDeviceVolumeChanged": t.opt(t.func("void", t.param("deviceType", "MediaDeviceType"), t.param("volume", "number"), t.param("muted", "boolean"))),
  "onRtmpStreamingStateChanged": t.opt(t.func("void", t.param("url", "string"), t.param("state", "RtmpStreamPublishState"), t.param("reason", "RtmpStreamPublishReason"))),
  "onRtmpStreamingEvent": t.opt(t.func("void", t.param("url", "string"), t.param("eventCode", "RtmpStreamingEvent"))),
  "onTranscodingUpdated": t.opt(t.func("void")),
  "onAudioRoutingChanged": t.opt(t.func("void", t.param("routing", "number"))),
  "onChannelMediaRelayStateChanged": t.opt(t.func("void", t.param("state", "ChannelMediaRelayState"), t.param("code", "ChannelMediaRelayError"))),
  "onLocalPublishFallbackToAudioOnly": t.opt(t.func("void", t.param("isFallbackOrRecover", "boolean"))),
  "onRemoteSubscribeFallbackToAudioOnly": t.opt(t.func("void", t.param("uid", "number"), t.param("isFallbackOrRecover", "boolean"))),
  "onRemoteAudioTransportStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("delay", "number"), t.param("lost", "number"), t.param("rxKBitRate", "number"))),
  "onRemoteVideoTransportStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("delay", "number"), t.param("lost", "number"), t.param("rxKBitRate", "number"))),
  "onConnectionStateChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("state", "ConnectionStateType"), t.param("reason", "ConnectionChangedReasonType"))),
  "onWlAccMessage": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("reason", "WlaccMessageReason"), t.param("action", "WlaccSuggestAction"), t.param("wlAccMsg", "string"))),
  "onWlAccStats": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("currentStats", "WlAccStats"), t.param("averageStats", "WlAccStats"))),
  "onNetworkTypeChanged": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("type", "NetworkType"))),
  "onEncryptionError": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("errorType", "EncryptionErrorType"))),
  "onPermissionError": t.opt(t.func("void", t.param("permissionType", "PermissionType"))),
  "onLocalUserRegistered": t.opt(t.func("void", t.param("uid", "number"), t.param("userAccount", "string"))),
  "onUserInfoUpdated": t.opt(t.func("void", t.param("uid", "number"), t.param("info", "UserInfo"))),
  "onUserAccountUpdated": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("remoteUid", "number"), t.param("remoteUserAccount", "string"))),
  "onVideoRenderingTracingResult": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("uid", "number"), t.param("currentEvent", "MediaTraceEvent"), t.param("tracingInfo", "VideoRenderingTracingInfo"))),
  "onLocalVideoTranscoderError": t.opt(t.func("void", t.param("stream", "TranscodingVideoStream"), t.param("error", "VideoTranscoderError"))),
  "onUploadLogResult": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("requestId", "string"), t.param("success", "boolean"), t.param("reason", "UploadErrorReason"))),
  "onAudioSubscribeStateChanged": t.opt(t.func("void", t.param("channel", "string"), t.param("uid", "number"), t.param("oldState", "StreamSubscribeState"), t.param("newState", "StreamSubscribeState"), t.param("elapseSinceLastState", "number"))),
  "onVideoSubscribeStateChanged": t.opt(t.func("void", t.param("channel", "string"), t.param("uid", "number"), t.param("oldState", "StreamSubscribeState"), t.param("newState", "StreamSubscribeState"), t.param("elapseSinceLastState", "number"))),
  "onAudioPublishStateChanged": t.opt(t.func("void", t.param("channel", "string"), t.param("oldState", "StreamPublishState"), t.param("newState", "StreamPublishState"), t.param("elapseSinceLastState", "number"))),
  "onVideoPublishStateChanged": t.opt(t.func("void", t.param("source", "VideoSourceType"), t.param("channel", "string"), t.param("oldState", "StreamPublishState"), t.param("newState", "StreamPublishState"), t.param("elapseSinceLastState", "number"))),
  "onTranscodedStreamLayoutInfo": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("uid", "number"), t.param("width", "number"), t.param("height", "number"), t.param("layoutCount", "number"), t.param("layoutlist", t.array("VideoLayout")))),
  "onAudioMetadataReceived": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("uid", "number"), t.param("metadata", "string"), t.param("length", "number"))),
  "onExtensionEvent": t.opt(t.func("void", t.param("provider", "string"), t.param("extension", "string"), t.param("key", "string"), t.param("value", "string"))),
  "onExtensionStarted": t.opt(t.func("void", t.param("provider", "string"), t.param("extension", "string"))),
  "onExtensionStopped": t.opt(t.func("void", t.param("provider", "string"), t.param("extension", "string"))),
  "onExtensionError": t.opt(t.func("void", t.param("provider", "string"), t.param("extension", "string"), t.param("error", "number"), t.param("message", "string"))),
  "onSetRtmFlagResult": t.opt(t.func("void", t.param("connection", "RtcConnection"), t.param("code", "number"))),
});

export const IMetadataObserver = t.iface([], {
  "onMetadataReceived": t.opt(t.func("void", t.param("metadata", "Metadata"))),
});

export const IDirectCdnStreamingEventHandler = t.iface([], {
  "onDirectCdnStreamingStateChanged": t.opt(t.func("void", t.param("state", "DirectCdnStreamingState"), t.param("reason", "DirectCdnStreamingReason"), t.param("message", "string"))),
  "onDirectCdnStreamingStats": t.opt(t.func("void", t.param("stats", "DirectCdnStreamingStats"))),
});

const exportedTypeSuite: t.ITypeSuite = {
  IRtcEngineEventHandler,
  IMetadataObserver,
  IDirectCdnStreamingEventHandler,
};
export default exportedTypeSuite;
