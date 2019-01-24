import {
    NativeModules,
    NativeAppEventEmitter,
    EmitterSubscription
} from 'react-native';

import {
    IOption, IVideoOption,
    IEventScheduler, IPublisherConfig,
    ILiveTranscoding, ICallback,
    String, Number
} from "./types.d";

const { Agora } = NativeModules;

export default class RtcEngine {

    private static listener: EmitterSubscription  = null;
    static init(options: IOption): void {
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

    static eventEmitter(eventScheduler: IEventScheduler) {
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
    
    static setupLocalVideo(options: IVideoOption) {
        Agora.setupLocalVideo(options);
    }

    static setupRemoteVideo(options: IVideoOption) {
        Agora.setupRemoteVideo(options);
    }

    static startPreview() {
        Agora.startPreview();
    }

    static stopPreview() {
        Agora.stopPreview();
    }

    static configPublisher(options: IPublisherConfig) {
        Agora.configPublisher(options);
    }

    static setLiveTranscoding(options: ILiveTranscoding) {
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

    static createDataStream(reliable: boolean, ordered: boolean, callback: ICallback<void>) {
        Agora.createDataStream(reliable, ordered, callback);
    }

    static sendStreamMessage(streamId: number, data: any, callback: ICallback<void>) {
        Agora.sendStreamMessage(streamId, data, callback);
    }

    static getSdkVersion(callback: ICallback<void>) {
        Agora.getSdkVersion(callback);
    }
};
