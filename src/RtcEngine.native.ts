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

/**
 * @class RtcEngine
 */
export default class RtcEngine {

    private static listeners: Array<EmitterSubscription>;
    /**
     * init AgoraRtcEngine
     * @param options: Option
     */
    static init(options: Option): void {
        this.removeEmitter();
        Agora.init(options);
        this.listeners = [];
    }

    /**
     * join channel
     * @param channelName String for channel name
     * @param uid Number user id is optional
     * @param token String secure token
     * @param info Object extra info
     * @return Promise
     */
    static joinChannel(channelName: String, uid?: Number, token?: String, info?: Object): void {
        return Agora.joinChannel({channelName, uid, token, info});
    }

    /**
     * RtcEngine events register
     * @param eventScheduler EventScheduler
     */
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

    /**
     * remove emitter
     */
    static removeEmitter() {
        if (this.listeners && this.listeners.length > 0) {
            for (let listener of this.listeners) {
                listener.remove();
                this.listeners = [];
            }
        }
    }

    /**
     * enableLastmileTest
     * @return Promise
     */
    static enableLastmileTest() {
        return Agora.enableLastmileTest();
    }

    /**
     * disableLastmileTest
     * @return Promise
     */
    static disableLastmileTest() {
        return Agora.disableLastmileTest();
    }

    /**
     * leaveChannel
     * @return Promise
     */  
    static leaveChannel() {
        return Agora.leaveChannel();
    }

    /**
     * destroy AgoraRtcEngine
     */  
    static destroy() {
        Agora.destroy();
    }
    
    /**
     * setupLocalVideo
     * @param options: VideoOption
     */  
    static setupLocalVideo(options: VideoOption) {
        Agora.setupLocalVideo(options);
    }

    /**
     * setupRemoteVideo
     * @param options: VideoOption
     */  
    static setupRemoteVideo(options: VideoOption) {
        Agora.setupRemoteVideo(options);
    }

    /**
     * start AgoraRtcEngine preview
     */
    static startPreview() {
        Agora.startPreview();
    }

    /**
     * stop AgoraRtcEngine preview
     */
    static stopPreview() {
        Agora.stopPreview();
    }

    /**
     * start live trancoding
     * @param options LiveTranscoding
     */
    static setLiveTranscoding(options: LiveTranscoding) {
        Agora.setLiveTranscoding(options);
    }

    /**
     * setLocalRenderMode
     * @param mode Number
     */
    static setLocalRenderMode(mode: number) {
        Agora.setLocalRenderMode(mode);
    }

    /**
     * setRemoteRenderMode
     * @param uid Number
     * @param mode Number
     */
    static setRemoteRenderMode(uid: number, mode: number) {
        Agora.setRemoteRenderMode(uid, mode);
    }

    /**
     * enableAudioVolumeIndication
     * @param interval Number
     * @param smooth Number
     */
    static enableAudioVolumeIndication(interval: number, smooth: number) {
        Agora.enableAudioVolumeIndication(interval, smooth);
    }

    /**
     * switch camera
     * @return Promise
     */
    static switchCamera() {
        return Agora.switchCamera();
    }

    static enableVideo() {
        Agora.enableVideo();
    }

    static disableVideo() {
        Agora.disableVideo();
    }

    /**
     * setEnableSpeakerphone
     * @param status Boolena
     */
    static setEnableSpeakerphone(status: boolean) {
        Agora.setEnableSpeakerphone(status);
    }

    /**
     * muteLocalAudioStream
     * @param status Boolena
     */
    static muteLocalAudioStream(status: boolean) {
        Agora.muteLocalAudioStream(status);
    }

    /**
     * muteRemoteAudioStream
     * @param uid Number
     * @param status Boolean
     */
    static muteRemoteAudioStream(uid: number, status: boolean) {
        Agora.muteRemoteAudioStream(uid, status);
    }

    /**
     * muteAllRemoteAudioStreams
     * @param status Boolean
     */
    static muteAllRemoteAudioStreams(status: boolean) {
        Agora.muteAllRemoteAudioStreams(status);
    }

    /**
     * setCameraTorchOn
     * @param status Boolean
     * @return Promise
     */
    static setCameraTorchOn(status: boolean) {
        return Agora.setCameraTorchOn(status);
    }

    /**
     * setCameraAutoFocusFaceModeEnabled
     * @param status Boolean
     * @return Promise
     */
    static setCameraAutoFocusFaceModeEnabled(status: boolean) {
        return Agora.setCameraAutoFocusFaceModeEnabled(status);
    }

    /**
     * setDefaultAudioRouteToSpeakerphone
     * @param status Boolean
     * @return Promise
     */
    static setDefaultAudioRouteToSpeakerphone(status: boolean) {
        Agora.setDefaultAudioRouteToSpeakerphone(status);
    }

    /**
     * muteLocalVideoStream
     * @param status Boolean
     */
    static muteLocalVideoStream(status: boolean) {
        Agora.muteLocalVideoStream(status);
    }

    /**
     * enableLocalVideo
     * @param status Boolean
     */
    static enableLocalVideo(status: boolean) {
        Agora.enableLocalVideo(status);
    }

    /**
     * muteAllRemoteVideoStreams
     * @param status Boolean
     */
    static muteAllRemoteVideoStreams(status: boolean) {
        Agora.muteAllRemoteVideoStreams(status);
    }

    /**
     * muteRemoteVideoStream
     * @param status Boolean
     */
    static muteRemoteVideoStream(uid: number, status: boolean) {
        Agora.muteRemoteVideoStream(uid, status);
    }

    /**
     * createDataStream
     * @param reliable Boolean
     * @param ordered Boolean
     * @return Promise
     */
    static createDataStream(reliable: boolean, ordered: boolean) {
        return Agora.createDataStream({reliable, ordered});
    }

    /**
     * sendStreamMessage
     * @param reliable Boolean
     * @param ordered Boolean
     * @return Promise
     */
    static sendStreamMessage(streamId: number, data: any) {
        return Agora.sendStreamMessage(streamId, data);
    }

    /**
     * getSdkVersion
     * @param callback Function
     */
    static getSdkVersion(callback: Callback<void>) {
        Agora.getSdkVersion().then(callback);
    }
};
