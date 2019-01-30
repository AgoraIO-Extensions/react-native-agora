import {
    NativeModules,
    NativeAppEventEmitter,
    EmitterSubscription
} from 'react-native';

import {
    Option, VideoOption,
    EventScheduler, PublisherConfig,
    LiveTranscoding, Callback,
    String, Number
} from "./types.d";

const { Agora } = NativeModules;

export default class RtcEngine {

    private static listener: EmitterSubscription;
    static init(options: Option): void {
        this.removeEmitter();
        Agora.init(options);
    }

    static joinChannel(channelName: String, uid?: Number): void {
        Agora.joinChannel(channelName, uid);
    }

    static joinChannelWithToken(
        channelName: string, token?: String, uid?: Number): void {
        Agora.joinChannelWithToken(token, channelName, uid);
    }

    static eventEmitter(eventScheduler: EventScheduler) {
        this.listener && this.listener.remove();
        this.listener = NativeAppEventEmitter.addListener('agoraEvent', event => {
            const functor = (eventScheduler as any)[event['type']];
            functor && functor(event);
        });
    }

    static removeEmitter() {
        this.listener && this.listener.remove();
    }

    static enableLastmileTest() {
        Agora.enableLastmileTest();
    }

    static disableLastmileTest() {
        Agora.disableLastmileTest();
    }

    static leaveChannel() {
        Agora.leaveChannel();
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

    static setCameraTorchOn(status: boolean) {
        Agora.setCameraTorchOn(status);
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

    static muteRemoteVideoStream(status: boolean) {
        Agora.muteAllRemoteVideoStreams(status);
    }

    static createDataStream(reliable: boolean, ordered: boolean, callback: Callback<void>) {
        Agora.createDataStream(reliable, ordered, callback);
    }

    static sendStreamMessage(streamId: number, data: any, callback: Callback<void>) {
        Agora.sendStreamMessage(streamId, data, callback);
    }

    static getSdkVersion(callback: Callback<void>) {
        Agora.getSdkVersion(callback);
    }
};
