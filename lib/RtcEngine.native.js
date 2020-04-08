"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const RtcChannel_native_1 = tslib_1.__importDefault(require("./RtcChannel.native"));
const { RtcEngineModule } = react_native_1.NativeModules;
const RtcEngineEvent = new react_native_1.NativeEventEmitter(RtcEngineModule);
class RtcEngine {
    constructor() {
        this._listeners = new Map();
    }
    static instance() {
        if (RtcEngine.engine) {
            return RtcEngine.engine;
        }
        else {
            throw new Error('please create RtcEngine first');
        }
    }
    static async create(appId) {
        if (RtcEngine.engine)
            return RtcEngine.engine;
        await RtcEngineModule.create(appId);
        RtcEngine.engine = new RtcEngine();
        return RtcEngine.engine;
    }
    destroy() {
        RtcChannel_native_1.default.destroyAll();
        RtcEngine.engine?.removeAllListeners();
        RtcEngine.engine = null;
        return RtcEngineModule.destroy();
    }
    addListener(event, listener) {
        const callback = (res) => {
            if (res['channelId'] === undefined) {
                // @ts-ignore
                listener(...Object.values(res));
            }
        };
        let map = this._listeners.get(event);
        if (map === undefined) {
            map = new Map();
            this._listeners.set(event, map);
        }
        RtcEngineEvent.addListener(event, callback);
        map.set(listener, callback);
        return {
            remove: () => {
                this.removeListener(event, listener);
            }
        };
    }
    removeListener(event, listener) {
        const map = this._listeners.get(event);
        if (map === undefined)
            return;
        RtcEngineEvent.removeListener(event, map.get(listener));
        map.delete(listener);
    }
    removeAllListeners(event) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcEngineEvent.removeAllListeners(key);
            });
            this._listeners.clear();
            return;
        }
        RtcEngineEvent.removeAllListeners(event);
        this._listeners.delete(event);
    }
    setChannelProfile(profile) {
        return RtcEngineModule.setChannelProfile(profile);
    }
    setClientRole(role) {
        return RtcEngineModule.setClientRole(role);
    }
    joinChannel(token, channelName, optionalInfo, optionalUid) {
        return RtcEngineModule.joinChannel(token, channelName, optionalInfo, optionalUid);
    }
    switchChannel(token, channelName) {
        return RtcEngineModule.switchChannel(token, channelName);
    }
    leaveChannel() {
        return RtcEngineModule.leaveChannel();
    }
    renewToken(token) {
        return RtcEngineModule.renewToken(token);
    }
    /**
     * @deprecated
     */
    enableWebSdkInteroperability(enabled) {
        return RtcEngineModule.enableWebSdkInteroperability(enabled);
    }
    getConnectionState() {
        return RtcEngineModule.getConnectionState();
    }
    getCallId() {
        return RtcEngineModule.getCallId();
    }
    rate(callId, rating, description) {
        return RtcEngineModule.rate(callId, rating, description);
    }
    complain(callId, description) {
        return RtcEngineModule.complain(callId, description);
    }
    setLogFile(filePath) {
        return RtcEngineModule.setLogFile(filePath);
    }
    setLogFilter(filter) {
        return RtcEngineModule.setLogFilter(filter);
    }
    setLogFileSize(fileSizeInKBytes) {
        return RtcEngineModule.setLogFileSize(fileSizeInKBytes);
    }
    setParameters(parameters) {
        return RtcEngineModule.setParameters(parameters);
    }
    getUserInfoByUid(uid) {
        return RtcEngineModule.getUserInfoByUid(uid);
    }
    getUserInfoByUserAccount(userAccount) {
        return RtcEngineModule.getUserInfoByUserAccount(userAccount);
    }
    joinChannelWithUserAccount(token, channelName, userAccount) {
        return RtcEngineModule.joinChannelWithUserAccount(token, channelName, userAccount);
    }
    registerLocalUserAccount(appId, userAccount) {
        return RtcEngineModule.registerLocalUserAccount(appId, userAccount);
    }
    adjustPlaybackSignalVolume(volume) {
        return RtcEngineModule.adjustPlaybackSignalVolume(volume);
    }
    adjustRecordingSignalVolume(volume) {
        return RtcEngineModule.adjustRecordingSignalVolume(volume);
    }
    adjustUserPlaybackSignalVolume(uid, volume) {
        return RtcEngineModule.adjustUserPlaybackSignalVolume(uid, volume);
    }
    disableAudio() {
        return RtcEngineModule.disableAudio();
    }
    enableAudio() {
        return RtcEngineModule.enableAudio();
    }
    enableAudioVolumeIndication(interval, smooth, report_vad) {
        return RtcEngineModule.enableAudioVolumeIndication(interval, smooth, report_vad);
    }
    enableLocalAudio(enabled) {
        return RtcEngineModule.enableLocalAudio(enabled);
    }
    muteAllRemoteAudioStreams(muted) {
        return RtcEngineModule.muteAllRemoteAudioStreams(muted);
    }
    muteLocalAudioStream(muted) {
        return RtcEngineModule.muteLocalAudioStream(muted);
    }
    muteRemoteAudioStream(uid, muted) {
        return RtcEngineModule.muteRemoteAudioStream(uid, muted);
    }
    setAudioProfile(profile, scenario) {
        return RtcEngineModule.setAudioProfile(profile, scenario);
    }
    setDefaultMuteAllRemoteAudioStreams(muted) {
        return RtcEngineModule.setDefaultMuteAllRemoteAudioStreams(muted);
    }
    disableVideo() {
        return RtcEngineModule.disableVideo();
    }
    enableLocalVideo(enabled) {
        return RtcEngineModule.enableLocalVideo(enabled);
    }
    enableVideo() {
        return RtcEngineModule.enableVideo();
    }
    muteAllRemoteVideoStreams(muted) {
        return RtcEngineModule.muteAllRemoteVideoStreams(muted);
    }
    muteLocalVideoStream(muted) {
        return RtcEngineModule.muteLocalVideoStream(muted);
    }
    muteRemoteVideoStream(uid, muted) {
        return RtcEngineModule.muteRemoteVideoStream(uid, muted);
    }
    setBeautyEffectOptions(enabled, options) {
        return RtcEngineModule.setBeautyEffectOptions(enabled, options);
    }
    setDefaultMuteAllRemoteVideoStreams(muted) {
        return RtcEngineModule.setDefaultMuteAllRemoteVideoStreams(muted);
    }
    setVideoEncoderConfiguration(config) {
        return RtcEngineModule.setVideoEncoderConfiguration(config);
    }
    adjustAudioMixingPlayoutVolume(volume) {
        return RtcEngineModule.adjustAudioMixingPlayoutVolume(volume);
    }
    adjustAudioMixingPublishVolume(volume) {
        return RtcEngineModule.adjustAudioMixingPublishVolume(volume);
    }
    adjustAudioMixingVolume(volume) {
        return RtcEngineModule.adjustAudioMixingVolume(volume);
    }
    getAudioMixingCurrentPosition() {
        return RtcEngineModule.getAudioMixingCurrentPosition();
    }
    getAudioMixingDuration() {
        return RtcEngineModule.getAudioMixingDuration();
    }
    getAudioMixingPlayoutVolume() {
        return RtcEngineModule.getAudioMixingPlayoutVolume();
    }
    getAudioMixingPublishVolume() {
        return RtcEngineModule.getAudioMixingPublishVolume();
    }
    pauseAudioMixing() {
        return RtcEngineModule.pauseAudioMixing();
    }
    resumeAudioMixing() {
        return RtcEngineModule.resumeAudioMixing();
    }
    setAudioMixingPosition(pos) {
        return RtcEngineModule.setAudioMixingPosition(pos);
    }
    startAudioMixing(filePath, loopback, replace, cycle) {
        return RtcEngineModule.startAudioMixing(filePath, loopback, replace, cycle);
    }
    stopAudioMixing() {
        return RtcEngineModule.stopAudioMixing();
    }
    getEffectsVolume() {
        return RtcEngineModule.getEffectsVolume();
    }
    pauseAllEffects() {
        return RtcEngineModule.pauseAllEffects();
    }
    pauseEffect(soundId) {
        return RtcEngineModule.pauseEffect(soundId);
    }
    playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish) {
        return RtcEngineModule.playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish);
    }
    preloadEffect(soundId, filePath) {
        return RtcEngineModule.preloadEffect(soundId, filePath);
    }
    resumeAllEffects() {
        return RtcEngineModule.resumeAllEffects();
    }
    resumeEffect(soundId) {
        return RtcEngineModule.resumeEffect(soundId);
    }
    setEffectsVolume(volume) {
        return RtcEngineModule.setEffectsVolume(volume);
    }
    setVolumeOfEffect(soundId, volume) {
        return RtcEngineModule.setVolumeOfEffect(soundId, volume);
    }
    stopAllEffects() {
        return RtcEngineModule.stopAllEffects();
    }
    stopEffect(soundId) {
        return RtcEngineModule.stopEffect(soundId);
    }
    unloadEffect(soundId) {
        return RtcEngineModule.unloadEffect(soundId);
    }
    setLocalVoiceChanger(voiceChanger) {
        return RtcEngineModule.setLocalVoiceChanger(voiceChanger);
    }
    setLocalVoiceEqualization(bandFrequency, bandGain) {
        return RtcEngineModule.setLocalVoiceEqualization(bandFrequency, bandGain);
    }
    setLocalVoicePitch(pitch) {
        return RtcEngineModule.setLocalVoicePitch(pitch);
    }
    setLocalVoiceReverb(reverbKey, value) {
        return RtcEngineModule.setLocalVoiceReverb(reverbKey, value);
    }
    setLocalVoiceReverbPreset(preset) {
        return RtcEngineModule.setLocalVoiceReverbPreset(preset);
    }
    enableSoundPositionIndication(enabled) {
        return RtcEngineModule.enableSoundPositionIndication(enabled);
    }
    setRemoteVoicePosition(uid, pan, gain) {
        return RtcEngineModule.setRemoteVoicePosition(uid, pan, gain);
    }
    addPublishStreamUrl(url, transcodingEnabled) {
        return RtcEngineModule.addPublishStreamUrl(url, transcodingEnabled);
    }
    removePublishStreamUrl(url) {
        return RtcEngineModule.removePublishStreamUrl(url);
    }
    setLiveTranscoding(transcoding) {
        return RtcEngineModule.setLiveTranscoding(transcoding);
    }
    startChannelMediaRelay(channelMediaRelayConfiguration) {
        return RtcEngineModule.startChannelMediaRelay(channelMediaRelayConfiguration);
    }
    stopChannelMediaRelay() {
        return RtcEngineModule.stopChannelMediaRelay();
    }
    updateChannelMediaRelay(channelMediaRelayConfiguration) {
        return RtcEngineModule.updateChannelMediaRelay(channelMediaRelayConfiguration);
    }
    isSpeakerphoneEnabled() {
        return RtcEngineModule.isSpeakerphoneEnabled();
    }
    setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker) {
        return RtcEngineModule.setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker);
    }
    setEnableSpeakerphone(enabled) {
        return RtcEngineModule.setEnableSpeakerphone(enabled);
    }
    enableInEarMonitoring(enabled) {
        return RtcEngineModule.enableInEarMonitoring(enabled);
    }
    setInEarMonitoringVolume(volume) {
        return RtcEngineModule.setInEarMonitoringVolume(volume);
    }
    enableDualStreamMode(enabled) {
        return RtcEngineModule.enableDualStreamMode(enabled);
    }
    setRemoteDefaultVideoStreamType(streamType) {
        return RtcEngineModule.setRemoteDefaultVideoStreamType(streamType);
    }
    setRemoteVideoStreamType(uid, streamType) {
        return RtcEngineModule.setRemoteVideoStreamType(uid, streamType);
    }
    setLocalPublishFallbackOption(option) {
        return RtcEngineModule.setLocalPublishFallbackOption(option);
    }
    setRemoteSubscribeFallbackOption(option) {
        return RtcEngineModule.setRemoteSubscribeFallbackOption(option);
    }
    setRemoteUserPriority(uid, userPriority) {
        return RtcEngineModule.setRemoteUserPriority(uid, userPriority);
    }
    disableLastmileTest() {
        return RtcEngineModule.disableLastmileTest();
    }
    enableLastmileTest() {
        return RtcEngineModule.enableLastmileTest();
    }
    startEchoTest(intervalInSeconds) {
        return RtcEngineModule.startEchoTest(intervalInSeconds);
    }
    startLastmileProbeTest(config) {
        return RtcEngineModule.startLastmileProbeTest(config);
    }
    stopEchoTest() {
        return RtcEngineModule.stopEchoTest();
    }
    stopLastmileProbeTest() {
        return RtcEngineModule.stopLastmileProbeTest();
    }
    registerMediaMetadataObserver() {
        return RtcEngineModule.registerMediaMetadataObserver();
    }
    sendMetadata(metadata) {
        return RtcEngineModule.sendMetadata(metadata);
    }
    setMaxMetadataSize(size) {
        return RtcEngineModule.setMaxMetadataSize(size);
    }
    unregisterMediaMetadataObserver() {
        return RtcEngineModule.unregisterMediaMetadataObserver();
    }
    addVideoWatermark(watermarkUrl, options) {
        return RtcEngineModule.addVideoWatermark(watermarkUrl, options);
    }
    clearVideoWatermarks() {
        return RtcEngineModule.clearVideoWatermarks();
    }
    setEncryptionMode(encryptionMode) {
        return RtcEngineModule.setEncryptionMode(encryptionMode);
    }
    setEncryptionSecret(secret) {
        return RtcEngineModule.setEncryptionSecret(secret);
    }
    startAudioRecording(filePath, sampleRate, quality) {
        return RtcEngineModule.startAudioRecording(filePath, sampleRate, quality);
    }
    stopAudioRecording() {
        return RtcEngineModule.stopAudioRecording();
    }
    addInjectStreamUrl(url, config) {
        return RtcEngineModule.addInjectStreamUrl(url, config);
    }
    removeInjectStreamUrl(url) {
        return RtcEngineModule.removeInjectStreamUrl(url);
    }
    getCameraMaxZoomFactor() {
        return RtcEngineModule.getCameraMaxZoomFactor();
    }
    isCameraAutoFocusFaceModeSupported() {
        return RtcEngineModule.isCameraAutoFocusFaceModeSupported();
    }
    isCameraExposurePositionSupported() {
        return RtcEngineModule.isCameraExposurePositionSupported();
    }
    isCameraFocusSupported() {
        return RtcEngineModule.isCameraFocusSupported();
    }
    isCameraTorchSupported() {
        return RtcEngineModule.isCameraTorchSupported();
    }
    isCameraZoomSupported() {
        return RtcEngineModule.isCameraZoomSupported();
    }
    setCameraAutoFocusFaceModeEnabled(enabled) {
        return RtcEngineModule.setCameraAutoFocusFaceModeEnabled(enabled);
    }
    setCameraCapturerConfiguration(config) {
        return RtcEngineModule.setCameraCapturerConfiguration(config);
    }
    setCameraExposurePosition(positionXinView, positionYinView) {
        return RtcEngineModule.setCameraExposurePosition(positionXinView, positionYinView);
    }
    setCameraFocusPositionInPreview(positionX, positionY) {
        return RtcEngineModule.setCameraFocusPositionInPreview(positionX, positionY);
    }
    setCameraTorchOn(isOn) {
        return RtcEngineModule.setCameraTorchOn(isOn);
    }
    setCameraZoomFactor(factor) {
        return RtcEngineModule.setCameraZoomFactor(factor);
    }
    switchCamera() {
        return RtcEngineModule.switchCamera();
    }
    createDataStream(reliable, ordered) {
        return RtcEngineModule.createDataStream(reliable, ordered);
    }
    sendStreamMessage(streamId, message) {
        return RtcEngineModule.sendStreamMessage(streamId, message);
    }
}
exports.default = RtcEngine;
//# sourceMappingURL=RtcEngine.native.js.map