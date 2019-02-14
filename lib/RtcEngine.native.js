"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { Agora } = react_native_1.NativeModules;
const AgoraEventEmitter = new react_native_1.NativeEventEmitter(Agora);
class RtcEngine {
    static init(options) {
        this.removeEmitter();
        Agora.init(options);
        this.listeners = [];
    }
    static joinChannel(channelName, uid, token, info) {
        return Agora.joinChannel({ channelName, uid, token, info });
    }
    static joinChannelWithToken(channelName, token, uid) {
        Agora.joinChannelWithToken(token, channelName, uid);
    }
    static eventEmitter(eventScheduler) {
        this.removeEmitter();
        // const events = EventSchedulerKeys;
        const events = [
            "onWarning",
            "onError",
            "onJoinChannelSuccess",
            "onRejoinChannelSuccess",
            "onLeaveChannel",
            "onClientRoleChanged",
            "onUserJoined",
            "onUserOffline",
            "onConnectionStateChanged",
            "onConnectionInterrupted",
            "onConnectionLost",
            "onConnectionBanned",
            "onApiCallExecuted",
            "onTokenPrivilegeWillExpire",
            "onRequestToken",
            "onMicrophoneEnabled",
            "onAudioVolumeIndication",
            "onActiveSpeaker",
            "onFirstLocalAudioFrame",
            "onFirstRemoteAudioFrame",
            "onVideoStopped",
            "onFirstLocalVideoFrame",
            "onFirstRemoteVideoDecoded",
            "onFirstRemoteVideoFrame",
            "onUserMuteAudio",
            "onUserMuteVideo",
            "onUserEnableVideo",
            "onUserEnableLocalVideo",
            "onVideoSizeChanged",
            "onRemoteVideoStateChanged",
            "onLocalPublishFallbackToAudioOnly",
            "onRemoteSubscribeFallbackToAudioOnly",
            "onAudioRouteChanged",
            "onCameraReady",
            "onCameraFocusAreaChanged",
            "onCameraExposureAreaChanged",
            "onAudioQuality",
            "onRtcStats",
            "onLastmileQuality",
            "onNetworkQuality",
            "onLocalVideoStats",
            "onRemoteVideoStats",
            "onRemoteAudioStats",
            "onLocalVideoStat",
            "onRemoteVideoStat",
            "onRemoteAudioTransportStats",
            "onRemoteVideoTransportStats",
            "onAudioMixingFinished",
            "onAudioEffectFinished",
            "onStreamPublished",
            "onStreamUnpublished",
            "onTranscodingUpdated",
            "onStreamInjectedStatus",
            "onStreamMessage",
            "onStreamMessageError",
            "onMediaEngineLoadSuccess",
            "onMediaEngineStartCallSuccess",
        ];
        for (let event of events) {
            const functor = eventScheduler[event];
            if (functor) {
                this.listeners.push(AgoraEventEmitter.addListener(event, msg => {
                    functor(msg);
                }));
            }
        }
    }
    static removeEmitter() {
        if (this.listeners && this.listeners.length > 0) {
            for (let listener of this.listeners) {
                listener.remove();
            }
        }
        this.listeners = [];
    }
    static enableLastmileTest() {
        Agora.enableLastmileTest();
    }
    static disableLastmileTest() {
        Agora.disableLastmileTest();
    }
    static leaveChannel() {
        return Agora.leaveChannel();
    }
    static destroy() {
        Agora.destroy();
    }
    static setupLocalVideo(options) {
        Agora.setupLocalVideo(options);
    }
    static setupRemoteVideo(options) {
        Agora.setupRemoteVideo(options);
    }
    static startPreview() {
        Agora.startPreview();
    }
    static stopPreview() {
        Agora.stopPreview();
    }
    static configPublisher(options) {
        Agora.configPublisher(options);
    }
    static setLiveTranscoding(options) {
        Agora.setLiveTranscoding(options);
    }
    static setLocalRenderMode(mode) {
        Agora.setLocalRenderMode(mode);
    }
    static setRemoteRenderMode(mode) {
        Agora.setRemoteRenderMode(mode);
    }
    static enableAudioVolumeIndication(interval, smooth) {
        Agora.enableAudioVolumeIndication(interval, smooth);
    }
    static switchCamera() {
        Agora.switchCamera();
    }
    static enableVideo() {
        Agora.enableVideo();
    }
    static disableVideo() {
        Agora.disableVideo();
    }
    static setEnableSpeakerphone(status) {
        Agora.setEnableSpeakerphone(status);
    }
    static muteLocalAudioStream(status) {
        Agora.muteLocalAudioStream(status);
    }
    static muteRemoteAudioStream(uid, status) {
        Agora.muteRemoteAudioStream(uid, status);
    }
    static muteAllRemoteAudioStreams(status) {
        Agora.muteAllRemoteAudioStreams(status);
    }
    static setCameraTorchOn(status) {
        return Agora.setCameraTorchOn(status);
    }
    static setCameraAutoFocusFaceModeEnabled(status) {
        Agora.setCameraAutoFocusFaceModeEnabled(status);
    }
    static setDefaultAudioRouteToSpeakerphone(status) {
        Agora.setDefaultAudioRouteToSpeakerphone(status);
    }
    static muteLocalVideoStream(status) {
        Agora.muteLocalVideoStream(status);
    }
    static enableLocalVideo(status) {
        Agora.enableLocalVideo(status);
    }
    static muteAllRemoteVideoStreams(status) {
        Agora.muteAllRemoteVideoStreams(status);
    }
    static muteRemoteVideoStream(uid, status) {
        Agora.muteRemoteVideoStream(uid, status);
    }
    static createDataStream(reliable, ordered, callback) {
        Agora.createDataStream(reliable, ordered, callback);
    }
    static sendStreamMessage(streamId, data, callback) {
        Agora.sendStreamMessage(streamId, data, callback);
    }
    static getSdkVersion(callback) {
        Agora.getSdkVersion().then(callback);
    }
}
exports.default = RtcEngine;
;
//# sourceMappingURL=RtcEngine.native.js.map