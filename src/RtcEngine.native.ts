import {
    NativeModules,
    NativeEventEmitter,
    EmitterSubscription
} from 'react-native';

import {
    Option, VideoOption,
    EventScheduler, PublisherConfig,
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
        Agora.joinChannel({channelName, uid, token, info});
    }

    static joinChannelWithToken(
        channelName: string, token?: String, uid?: Number): void {
        Agora.joinChannelWithToken(token, channelName, uid);
    }

    static eventEmitter(eventScheduler: EventScheduler) {
        this.removeEmitter();
        const events = [
            "DidOccurWarning",
            "DidOccurError",
            "DidApiCallExecute",
            "DidJoinChannel",
            "DidRejoinChannel",
            "DidLeaveChannel",
            "LeaveChannel",
            "DidClientRoleChanged",
            "DidJoinedOfUid",
            "DidOfflineOfUid",
            "ConnectionChangedToState",
            "ConnectionDidLost",
            "TokenPrivilegeWillExpire",
            "RequestToken",
            
            "DidMicrophoneEnabled",
            "ReportAudioVolumeIndicationOfSpeakers",
            "ActiveSpeaker",
            "FirstLocalAudioFrame",
            "FirstRemoteAudioFrameOfUid",
            "VideoDidStop",
            "FirstLocalVideoFrameWithSize",
            "FirstRemoteVideoDecodedOfUid",
            "FirstRemoteVideoFrameOfUid",
            "DidAudioMuted",
            "DidVideoMuted",
            "DidVideoEnabled",
            "DidLocalVideoEnabled",
            "VideoSizeChangedOfUid",
            "RemoteVideoStateChangedOfUid",
            "DidLocalPublishFallbackToAudioOnly",
            "DidRemoteSubscribeFallbackToAudioOnly",
            
            "DeviceTypeStateChanged",
            "DidAudioRouteChanged",
            "CameraDidReady",
            "CameraFocusDidChangedToRect",
            "CameraExposureDidChangedToRect",
            
            "ReportRtcStats",
            "LastmileQuality",
            "NetworkQuality",
            "LocalVideoStats",
            "RemoteVideoStats",
            "RemoteAudioStats",
            "AudioTransportStatsOfUid",
            "VideoTransportStatsOfUid",
            
            "LocalAudioMixingDidFinish",
            "RemoteAudioMixingDidStart",
            "RemoteAudioMixingDidFinish",
            "DidAudioEffectFinish",
            
            "StreamPublished",
            "StreamUnpublish",
            "TranscodingUpdated",
            
            "StreamInjectedStatus",
            
            "ReceiveStreamMessage",
            "DidOccurStreamMessageError",
            
            "MediaEngineDidLoaded",
            "MediaEngineDidStartCall",
            
            "ConnectionDidInterrupted",
            "ConnectionDidBanned",
            "AudioQualityOfUid"
        ];
        for (let event of events) {
            this.listeners.push(
                AgoraEventEmitter.addListener(event, msg => {
                    const functor = (eventScheduler as any)[event];
                    functor && functor(msg);
                })
            );
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

    static configPublisher(options: PublisherConfig) {
        Agora.configPublisher(options);
    }

    static setLiveTranscoding(options: LiveTranscoding) {
        Agora.setLiveTranscoding(options);
    }

    static setLocalRenderMode(mode: number) {
        Agora.setLocalRenderMode(mode);
    }

    static setRemoteRenderMode(mode: number) {
        Agora.setRemoteRenderMode(mode);
    }

    static enableAudioVolumeIndication(interval: number, smooth: number) {
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
        Agora.setCameraAutoFocusFaceModeEnabled(status);
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

    static createDataStream(reliable: boolean, ordered: boolean, callback: Callback<void>) {
        Agora.createDataStream(reliable, ordered, callback);
    }

    static sendStreamMessage(streamId: number, data: any, callback: Callback<void>) {
        Agora.sendStreamMessage(streamId, data, callback);
    }

    static getSdkVersion(callback: Callback<void>) {
        Agora.getSdkVersion().then(callback);
    }
};
