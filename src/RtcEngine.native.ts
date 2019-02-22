import {
    NativeModules,
    NativeEventEmitter,
    EmitterSubscription
} from 'react-native';

import {
    Option, VideoOption,
    EventScheduler,
    PublisherConfig,
    LiveTranscoding, Callback,
    String, Number
} from "./types.d";


const { Agora } = NativeModules;
const AgoraEventEmitter = new NativeEventEmitter(Agora);

export default class RtcEngine {

    private static listeners: Array<EmitterSubscription>;
    static init(options: Option): void {
        this.removeEmitter();
        Agora.init(options);
        this.listeners = [];
    }

    static joinChannel(channelName: String, uid?: Number, token?: String, info?: Object): void {
        return Agora.joinChannel({channelName, uid, token, info});
    }

    static eventEmitter(eventScheduler: EventScheduler) {
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
            const functor = (eventScheduler as any)[event];
            if (functor) {
                this.listeners.push(
                    AgoraEventEmitter.addListener(event, msg => {
                        functor(msg);
                    })
                );
            }
        }
    }

    static removeEmitter() {
        if (this.listeners && this.listeners.length > 0) {
            for (let listener of this.listeners) {
                listener.remove();
                this.listeners = [];
            }
        }
    }

    static enableLastmileTest() {
        return Agora.enableLastmileTest();
    }

    static disableLastmileTest() {
        return Agora.disableLastmileTest();
    }

    static leaveChannel() {
        return Agora.leaveChannel();
    }

    static destroy() {
        Agora.destroy();
    }
    
    static setupLocalVideo(options: VideoOption) {
        Agora.setupLocalVideo(options);
    }

    static setupRemoteVideo(options: VideoOption) {
        Agora.setupRemoteVideo(options);
    }

    static startPreview() {
        Agora.startPreview();
    }

    static stopPreview() {
        Agora.stopPreview();
    }

    static setLiveTranscoding(options: LiveTranscoding) {
        Agora.setLiveTranscoding(options);
    }

    static setLocalRenderMode(mode: number) {
        Agora.setLocalRenderMode(mode);
    }

    static setRemoteRenderMode(uid: number, mode: number) {
        Agora.setRemoteRenderMode(uid, mode);
    }

    static enableAudioVolumeIndication(interval: number, smooth: number) {
        Agora.enableAudioVolumeIndication(interval, smooth);
    }

    static switchCamera() {
        return Agora.switchCamera();
    }

    static enableVideo() {
        Agora.enableVideo();
    }

    static disableVideo() {
        Agora.disableVideo();
    }

    static setEnableSpeakerphone(status: boolean) {
        Agora.setEnableSpeakerphone(status);
    }

    static muteLocalAudioStream(status: boolean) {
        Agora.muteLocalAudioStream(status);
    }

    static muteRemoteAudioStream(uid: number, status: boolean) {
        Agora.muteRemoteAudioStream(uid, status);
    }

    static muteAllRemoteAudioStreams(status: boolean) {
        Agora.muteAllRemoteAudioStreams(status);
    }

    static setCameraTorchOn(status: boolean) {
        return Agora.setCameraTorchOn(status);
    }

    static setCameraAutoFocusFaceModeEnabled(status: boolean) {
        return Agora.setCameraAutoFocusFaceModeEnabled(status);
    }

    static setDefaultAudioRouteToSpeakerphone(status: boolean) {
        Agora.setDefaultAudioRouteToSpeakerphone(status);
    }

    static muteLocalVideoStream(status: boolean) {
        Agora.muteLocalVideoStream(status);
    }

    static enableLocalVideo(status: boolean) {
        Agora.enableLocalVideo(status);
    }

    static muteAllRemoteVideoStreams(status: boolean) {
        Agora.muteAllRemoteVideoStreams(status);
    }

    static muteRemoteVideoStream(uid: number, status: boolean) {
        Agora.muteRemoteVideoStream(uid, status);
    }

    static createDataStream(reliable: boolean, ordered: boolean) {
        return Agora.createDataStream(reliable, ordered);
    }

    static sendStreamMessage(streamId: number, data: any) {
        return Agora.sendStreamMessage(streamId, data);
    }

    static getSdkVersion(callback: Callback<void>) {
        Agora.getSdkVersion().then(callback);
    }
};
