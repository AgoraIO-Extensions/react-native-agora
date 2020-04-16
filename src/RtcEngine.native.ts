import {NativeEventEmitter, NativeModules} from "react-native";
import {
    AudioProfile,
    AudioRecordingQuality,
    AudioReverbPreset,
    AudioReverbType,
    AudioScenario,
    AudioVoiceChanger,
    BeautyOptions,
    CameraCapturerConfiguration,
    ChannelMediaRelayConfiguration,
    ChannelProfile,
    ClientRole,
    ConnectionStateType,
    EncryptionMode,
    LastmileProbeConfig,
    LiveInjectStreamConfig,
    LiveTranscoding,
    LogFilter,
    Rate,
    StreamFallbackOptions,
    String,
    UserInfo,
    UserPriority,
    VideoEncoderConfiguration,
    VideoStreamType,
    WatermarkOptions
} from "./Types";
import {Listener, RtcEngineEvents, Subscription} from "./RtcEvents";
import RtcChannel from "./RtcChannel.native";

const {RtcEngineModule} = NativeModules;
const Prefix = RtcEngineModule.prefix
const RtcEngineEvent = new NativeEventEmitter(RtcEngineModule);

let engine: RtcEngine | undefined;

export default class RtcEngine implements RtcUserInfoInterface, RtcAudioInterface, RtcVideoInterface, RtcAudioMixingInterface,
    RtcAudioEffectInterface, RtcVoiceChangerInterface, RtcVoicePositionInterface, RtcPublishStreamInterface,
    RtcMediaRelayInterface, RtcAudioRouteInterface, RtcEarMonitoringInterface, RtcDualStreamInterface,
    RtcFallbackInterface, RtcTestInterface, RtcMediaMetadataInterface, RtcWatermarkInterface, RtcEncryptionInterface,
    RtcAudioRecorderInterface, RtcInjectStreamInterface, RtcCameraInterface, RtcStreamMessageInterface {

    private _listeners = new Map<string, Map<Listener, Listener>>();

    static instance(): RtcEngine {
        if (engine) {
            return engine as RtcEngine;
        } else {
            throw new Error('please create RtcEngine first')
        }
    }

    static async create(appId: string): Promise<RtcEngine> {
        if (engine) return engine;
        await RtcEngineModule.create(appId);
        engine = new RtcEngine();
        return engine
    }

    destroy(): Promise<void> {
        RtcChannel.destroyAll();
        this.removeAllListeners();
        engine = undefined;
        return RtcEngineModule.destroy()
    }

    addListener<EventType extends keyof RtcEngineEvents>(event: EventType, listener: RtcEngineEvents[EventType]): Subscription {
        const callback = (res: any) => {
            const {channelId, data} = res;
            if (channelId === undefined) {
                // @ts-ignore
                listener(...data)
            }
        };
        let map = this._listeners.get(event);
        if (map === undefined) {
            map = new Map<Listener, Listener>();
            this._listeners.set(event, map)
        }
        RtcEngineEvent.addListener(Prefix + event, callback);
        map.set(listener, callback);
        return {
            remove: () => {
                this.removeListener(event, listener)
            }
        }
    }

    removeListener<EventType extends keyof RtcEngineEvents>(event: EventType, listener: RtcEngineEvents[EventType]) {
        const map = this._listeners.get(event);
        if (map === undefined) return;
        RtcEngineEvent.removeListener(Prefix + event, map.get(listener) as Listener);
        map.delete(listener)
    }

    removeAllListeners<EventType extends keyof RtcEngineEvents>(event?: EventType) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcEngineEvent.removeAllListeners(Prefix + key);
            });
            this._listeners.clear();
            return
        }
        RtcEngineEvent.removeAllListeners(Prefix + event);
        this._listeners.delete(event as string)
    }

    setChannelProfile(profile: ChannelProfile): Promise<void> {
        return RtcEngineModule.setChannelProfile(profile)
    }

    setClientRole(role: ClientRole): Promise<void> {
        return RtcEngineModule.setClientRole(role)
    }

    joinChannel(token: String, channelName: string, optionalInfo: String, optionalUid: number): Promise<void> {
        return RtcEngineModule.joinChannel(token, channelName, optionalInfo, optionalUid)
    }

    switchChannel(token: String, channelName: string): Promise<void> {
        return RtcEngineModule.switchChannel(token, channelName)
    }

    leaveChannel(): Promise<void> {
        return RtcEngineModule.leaveChannel()
    }

    renewToken(token: string): Promise<void> {
        return RtcEngineModule.renewToken(token)
    }

    /**
     * @deprecated
     */
    enableWebSdkInteroperability(enabled: boolean): Promise<void> {
        return RtcEngineModule.enableWebSdkInteroperability(enabled)
    }

    getConnectionState(): Promise<ConnectionStateType> {
        return RtcEngineModule.getConnectionState()
    }

    getCallId(): Promise<string> {
        return RtcEngineModule.getCallId()
    }

    rate(callId: string, rating: Rate, description?: string): Promise<void> {
        return RtcEngineModule.rate(callId, rating, description)
    }

    complain(callId: string, description: string): Promise<void> {
        return RtcEngineModule.complain(callId, description)
    }

    setLogFile(filePath: string): Promise<void> {
        return RtcEngineModule.setLogFile(filePath)
    }

    setLogFilter(filter: LogFilter): Promise<void> {
        return RtcEngineModule.setLogFilter(filter)
    }

    setLogFileSize(fileSizeInKBytes: number): Promise<void> {
        return RtcEngineModule.setLogFileSize(fileSizeInKBytes)
    }

    setParameters(parameters: string): Promise<void> {
        return RtcEngineModule.setParameters(parameters)
    }

    getUserInfoByUid(uid: number): Promise<UserInfo> {
        return RtcEngineModule.getUserInfoByUid(uid)
    }

    getUserInfoByUserAccount(userAccount: string): Promise<UserInfo> {
        return RtcEngineModule.getUserInfoByUserAccount(userAccount)
    }

    joinChannelWithUserAccount(token: String, channelName: string, userAccount: string): Promise<void> {
        return RtcEngineModule.joinChannelWithUserAccount(token, channelName, userAccount);
    }

    registerLocalUserAccount(appId: string, userAccount: string): Promise<void> {
        return RtcEngineModule.registerLocalUserAccount(appId, userAccount);
    }

    adjustPlaybackSignalVolume(volume: number): Promise<void> {
        return RtcEngineModule.adjustPlaybackSignalVolume(volume);
    }

    adjustRecordingSignalVolume(volume: number): Promise<void> {
        return RtcEngineModule.adjustRecordingSignalVolume(volume);
    }

    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void> {
        return RtcEngineModule.adjustUserPlaybackSignalVolume(uid, volume);
    }

    disableAudio(): Promise<void> {
        return RtcEngineModule.disableAudio();
    }

    enableAudio(): Promise<void> {
        return RtcEngineModule.enableAudio();
    }

    enableAudioVolumeIndication(interval: number, smooth: number, report_vad: boolean): Promise<void> {
        return RtcEngineModule.enableAudioVolumeIndication(interval, smooth, report_vad);
    }

    enableLocalAudio(enabled: boolean): Promise<void> {
        return RtcEngineModule.enableLocalAudio(enabled);
    }

    muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return RtcEngineModule.muteAllRemoteAudioStreams(muted);
    }

    muteLocalAudioStream(muted: boolean): Promise<void> {
        return RtcEngineModule.muteLocalAudioStream(muted);
    }

    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void> {
        return RtcEngineModule.muteRemoteAudioStream(uid, muted);
    }

    setAudioProfile(profile: AudioProfile, scenario: AudioScenario): Promise<void> {
        return RtcEngineModule.setAudioProfile(profile, scenario);
    }

    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return RtcEngineModule.setDefaultMuteAllRemoteAudioStreams(muted);
    }

    disableVideo(): Promise<void> {
        return RtcEngineModule.disableVideo();
    }

    enableLocalVideo(enabled: boolean): Promise<void> {
        return RtcEngineModule.enableLocalVideo(enabled);
    }

    enableVideo(): Promise<void> {
        return RtcEngineModule.enableVideo();
    }

    muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return RtcEngineModule.muteAllRemoteVideoStreams(muted);
    }

    muteLocalVideoStream(muted: boolean): Promise<void> {
        return RtcEngineModule.muteLocalVideoStream(muted);
    }

    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void> {
        return RtcEngineModule.muteRemoteVideoStream(uid, muted);
    }

    setBeautyEffectOptions(enabled: boolean, options: BeautyOptions): Promise<void> {
        return RtcEngineModule.setBeautyEffectOptions(enabled, options);
    }

    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return RtcEngineModule.setDefaultMuteAllRemoteVideoStreams(muted);
    }

    setVideoEncoderConfiguration(config: VideoEncoderConfiguration): Promise<void> {
        return RtcEngineModule.setVideoEncoderConfiguration(config);
    }

    adjustAudioMixingPlayoutVolume(volume: number): Promise<void> {
        return RtcEngineModule.adjustAudioMixingPlayoutVolume(volume);
    }

    adjustAudioMixingPublishVolume(volume: number): Promise<void> {
        return RtcEngineModule.adjustAudioMixingPublishVolume(volume);
    }

    adjustAudioMixingVolume(volume: number): Promise<void> {
        return RtcEngineModule.adjustAudioMixingVolume(volume);
    }

    getAudioMixingCurrentPosition(): Promise<number> {
        return RtcEngineModule.getAudioMixingCurrentPosition();
    }

    getAudioMixingDuration(): Promise<number> {
        return RtcEngineModule.getAudioMixingDuration();
    }

    getAudioMixingPlayoutVolume(): Promise<number> {
        return RtcEngineModule.getAudioMixingPlayoutVolume();
    }

    getAudioMixingPublishVolume(): Promise<number> {
        return RtcEngineModule.getAudioMixingPublishVolume();
    }

    pauseAudioMixing(): Promise<void> {
        return RtcEngineModule.pauseAudioMixing();
    }

    resumeAudioMixing(): Promise<void> {
        return RtcEngineModule.resumeAudioMixing();
    }

    setAudioMixingPosition(pos: number): Promise<void> {
        return RtcEngineModule.setAudioMixingPosition(pos);
    }

    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): Promise<void> {
        return RtcEngineModule.startAudioMixing(filePath, loopback, replace, cycle);
    }

    stopAudioMixing(): Promise<void> {
        return RtcEngineModule.stopAudioMixing();
    }

    getEffectsVolume(): Promise<number> {
        return RtcEngineModule.getEffectsVolume();
    }

    pauseAllEffects(): Promise<void> {
        return RtcEngineModule.pauseAllEffects();
    }

    pauseEffect(soundId: number): Promise<void> {
        return RtcEngineModule.pauseEffect(soundId);
    }

    playEffect(soundId: number, filePath: String, loopCount: number, pitch: number, pan: number, gain: number, publish: Boolean): Promise<void> {
        return RtcEngineModule.playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish);
    }

    preloadEffect(soundId: number, filePath: String): Promise<void> {
        return RtcEngineModule.preloadEffect(soundId, filePath);
    }

    resumeAllEffects(): Promise<void> {
        return RtcEngineModule.resumeAllEffects();
    }

    resumeEffect(soundId: number): Promise<void> {
        return RtcEngineModule.resumeEffect(soundId);
    }

    setEffectsVolume(volume: number): Promise<void> {
        return RtcEngineModule.setEffectsVolume(volume);
    }

    setVolumeOfEffect(soundId: number, volume: number): Promise<void> {
        return RtcEngineModule.setVolumeOfEffect(soundId, volume);
    }

    stopAllEffects(): Promise<void> {
        return RtcEngineModule.stopAllEffects();
    }

    stopEffect(soundId: number): Promise<void> {
        return RtcEngineModule.stopEffect(soundId);
    }

    unloadEffect(soundId: number): Promise<void> {
        return RtcEngineModule.unloadEffect(soundId);
    }

    setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void> {
        return RtcEngineModule.setLocalVoiceChanger(voiceChanger);
    }

    setLocalVoiceEqualization(bandFrequency: number, bandGain: number): Promise<void> {
        return RtcEngineModule.setLocalVoiceEqualization(bandFrequency, bandGain);
    }

    setLocalVoicePitch(pitch: number): Promise<void> {
        return RtcEngineModule.setLocalVoicePitch(pitch);
    }

    setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): Promise<void> {
        return RtcEngineModule.setLocalVoiceReverb(reverbKey, value);
    }

    setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void> {
        return RtcEngineModule.setLocalVoiceReverbPreset(preset);
    }

    enableSoundPositionIndication(enabled: boolean): Promise<void> {
        return RtcEngineModule.enableSoundPositionIndication(enabled);
    }

    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void> {
        return RtcEngineModule.setRemoteVoicePosition(uid, pan, gain);
    }

    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
        return RtcEngineModule.addPublishStreamUrl(url, transcodingEnabled);
    }

    removePublishStreamUrl(url: string): Promise<void> {
        return RtcEngineModule.removePublishStreamUrl(url);
    }

    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
        return RtcEngineModule.setLiveTranscoding(transcoding);
    }

    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return RtcEngineModule.startChannelMediaRelay(channelMediaRelayConfiguration);
    }

    stopChannelMediaRelay(): Promise<void> {
        return RtcEngineModule.stopChannelMediaRelay();
    }

    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return RtcEngineModule.updateChannelMediaRelay(channelMediaRelayConfiguration);
    }

    isSpeakerphoneEnabled(): Promise<boolean> {
        return RtcEngineModule.isSpeakerphoneEnabled();
    }

    setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void> {
        return RtcEngineModule.setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker);
    }

    setEnableSpeakerphone(enabled: boolean): Promise<void> {
        return RtcEngineModule.setEnableSpeakerphone(enabled);
    }

    enableInEarMonitoring(enabled: boolean): Promise<void> {
        return RtcEngineModule.enableInEarMonitoring(enabled);
    }

    setInEarMonitoringVolume(volume: number): Promise<void> {
        return RtcEngineModule.setInEarMonitoringVolume(volume);
    }

    enableDualStreamMode(enabled: boolean): Promise<void> {
        return RtcEngineModule.enableDualStreamMode(enabled);
    }

    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
        return RtcEngineModule.setRemoteDefaultVideoStreamType(streamType);
    }

    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void> {
        return RtcEngineModule.setRemoteVideoStreamType(uid, streamType);
    }

    setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void> {
        return RtcEngineModule.setLocalPublishFallbackOption(option);
    }

    setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): Promise<void> {
        return RtcEngineModule.setRemoteSubscribeFallbackOption(option);
    }

    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void> {
        return RtcEngineModule.setRemoteUserPriority(uid, userPriority);
    }

    disableLastmileTest(): Promise<void> {
        return RtcEngineModule.disableLastmileTest();
    }

    enableLastmileTest(): Promise<void> {
        return RtcEngineModule.enableLastmileTest();
    }

    startEchoTest(intervalInSeconds: number): Promise<void> {
        return RtcEngineModule.startEchoTest(intervalInSeconds);
    }

    startLastmileProbeTest(config: LastmileProbeConfig): Promise<void> {
        return RtcEngineModule.startLastmileProbeTest(config);
    }

    stopEchoTest(): Promise<void> {
        return RtcEngineModule.stopEchoTest();
    }

    stopLastmileProbeTest(): Promise<void> {
        return RtcEngineModule.stopLastmileProbeTest();
    }

    registerMediaMetadataObserver(): Promise<void> {
        return RtcEngineModule.registerMediaMetadataObserver();
    }

    sendMetadata(metadata: string): Promise<void> {
        return RtcEngineModule.sendMetadata(metadata);
    }

    setMaxMetadataSize(size: number): Promise<void> {
        return RtcEngineModule.setMaxMetadataSize(size);
    }

    unregisterMediaMetadataObserver(): Promise<void> {
        return RtcEngineModule.unregisterMediaMetadataObserver();
    }

    addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): Promise<void> {
        return RtcEngineModule.addVideoWatermark(watermarkUrl, options);
    }

    clearVideoWatermarks(): Promise<void> {
        return RtcEngineModule.clearVideoWatermarks();
    }

    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void> {
        return RtcEngineModule.setEncryptionMode(encryptionMode);
    }

    setEncryptionSecret(secret: string): Promise<void> {
        return RtcEngineModule.setEncryptionSecret(secret);
    }

    startAudioRecording(filePath: string, sampleRate: number, quality: AudioRecordingQuality): Promise<void> {
        return RtcEngineModule.startAudioRecording(filePath, sampleRate, quality);
    }

    stopAudioRecording(): Promise<void> {
        return RtcEngineModule.stopAudioRecording();
    }

    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void> {
        return RtcEngineModule.addInjectStreamUrl(url, config);
    }

    removeInjectStreamUrl(url: string): Promise<void> {
        return RtcEngineModule.removeInjectStreamUrl(url);
    }

    getCameraMaxZoomFactor(): Promise<number> {
        return RtcEngineModule.getCameraMaxZoomFactor();
    }

    isCameraAutoFocusFaceModeSupported(): Promise<boolean> {
        return RtcEngineModule.isCameraAutoFocusFaceModeSupported();
    }

    isCameraExposurePositionSupported(): Promise<boolean> {
        return RtcEngineModule.isCameraExposurePositionSupported();
    }

    isCameraFocusSupported(): Promise<boolean> {
        return RtcEngineModule.isCameraFocusSupported();
    }

    isCameraTorchSupported(): Promise<boolean> {
        return RtcEngineModule.isCameraTorchSupported();
    }

    isCameraZoomSupported(): Promise<boolean> {
        return RtcEngineModule.isCameraZoomSupported();
    }

    setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void> {
        return RtcEngineModule.setCameraAutoFocusFaceModeEnabled(enabled);
    }

    setCameraCapturerConfiguration(config: CameraCapturerConfiguration): Promise<void> {
        return RtcEngineModule.setCameraCapturerConfiguration(config);
    }

    setCameraExposurePosition(positionXinView: number, positionYinView: number): Promise<void> {
        return RtcEngineModule.setCameraExposurePosition(positionXinView, positionYinView);
    }

    setCameraFocusPositionInPreview(positionX: number, positionY: number): Promise<void> {
        return RtcEngineModule.setCameraFocusPositionInPreview(positionX, positionY);
    }

    setCameraTorchOn(isOn: boolean): Promise<void> {
        return RtcEngineModule.setCameraTorchOn(isOn);
    }

    setCameraZoomFactor(factor: number): Promise<void> {
        return RtcEngineModule.setCameraZoomFactor(factor);
    }

    switchCamera(): Promise<void> {
        return RtcEngineModule.switchCamera();
    }

    createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
        return RtcEngineModule.createDataStream(reliable, ordered);
    }

    sendStreamMessage(streamId: number, message: string): Promise<void> {
        return RtcEngineModule.sendStreamMessage(streamId, message);
    }
}

interface RtcUserInfoInterface {
    registerLocalUserAccount(appId: string, userAccount: string): Promise<void>;

    joinChannelWithUserAccount(token: String, channelName: string, userAccount: string): Promise<void>;

    getUserInfoByUserAccount(userAccount: string): Promise<UserInfo>;

    getUserInfoByUid(uid: number): Promise<UserInfo>;
}

interface RtcAudioInterface {
    enableAudio(): Promise<void>;

    disableAudio(): Promise<void>;

    setAudioProfile(profile: AudioProfile, scenario: AudioScenario): Promise<void>;

    adjustRecordingSignalVolume(volume: number): Promise<void>;

    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;

    adjustPlaybackSignalVolume(volume: number): Promise<void>;

    enableLocalAudio(enabled: boolean): Promise<void>;

    muteLocalAudioStream(muted: boolean): Promise<void>;

    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;

    muteAllRemoteAudioStreams(muted: boolean): Promise<void>;

    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;

    enableAudioVolumeIndication(interval: number, smooth: number, report_vad: boolean): Promise<void>;
}

interface RtcVideoInterface {
    enableVideo(): Promise<void>;

    disableVideo(): Promise<void>;

    setVideoEncoderConfiguration(config: VideoEncoderConfiguration): Promise<void>;

    enableLocalVideo(enabled: boolean): Promise<void>;

    muteLocalVideoStream(muted: boolean): Promise<void>;

    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;

    muteAllRemoteVideoStreams(muted: boolean): Promise<void>;

    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;

    setBeautyEffectOptions(enabled: boolean, options: BeautyOptions): Promise<void>;
}

interface RtcAudioMixingInterface {
    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): Promise<void>;

    stopAudioMixing(): Promise<void>;

    pauseAudioMixing(): Promise<void>;

    resumeAudioMixing(): Promise<void>;

    adjustAudioMixingVolume(volume: number): Promise<void>;

    adjustAudioMixingPlayoutVolume(volume: number): Promise<void>;

    adjustAudioMixingPublishVolume(volume: number): Promise<void>;

    getAudioMixingPlayoutVolume(): Promise<number>;

    getAudioMixingPublishVolume(): Promise<number>;

    getAudioMixingDuration(): Promise<number>;

    getAudioMixingCurrentPosition(): Promise<number>;

    setAudioMixingPosition(pos: number): Promise<void>;
}

interface RtcAudioEffectInterface {
    getEffectsVolume(): Promise<number>;

    setEffectsVolume(volume: number): Promise<void>;

    setVolumeOfEffect(soundId: number, volume: number): Promise<void>;

    playEffect(soundId: number, filePath: String, loopCount: number, pitch: number, pan: number, gain: number, publish: Boolean): Promise<void>;

    stopEffect(soundId: number): Promise<void>;

    stopAllEffects(): Promise<void>;

    preloadEffect(soundId: number, filePath: String): Promise<void>;

    unloadEffect(soundId: number): Promise<void>;

    pauseEffect(soundId: number): Promise<void>;

    pauseAllEffects(): Promise<void>;

    resumeEffect(soundId: number): Promise<void>;

    resumeAllEffects(): Promise<void>;
}

interface RtcVoiceChangerInterface {
    setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void>;

    setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void>;

    setLocalVoicePitch(pitch: number): Promise<void>;

    setLocalVoiceEqualization(bandFrequency: number, bandGain: number): Promise<void>;

    setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): Promise<void>;
}

interface RtcVoicePositionInterface {
    enableSoundPositionIndication(enabled: boolean): Promise<void>;

    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
}

interface RtcPublishStreamInterface {
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;

    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;

    removePublishStreamUrl(url: string): Promise<void>;
}

interface RtcMediaRelayInterface {
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;

    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;

    stopChannelMediaRelay(): Promise<void>;
}

interface RtcAudioRouteInterface {
    setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void>;

    setEnableSpeakerphone(enabled: boolean): Promise<void>;

    isSpeakerphoneEnabled(): Promise<boolean>;
}

interface RtcEarMonitoringInterface {
    enableInEarMonitoring(enabled: boolean): Promise<void>;

    setInEarMonitoringVolume(volume: number): Promise<void>;
}

interface RtcDualStreamInterface {
    enableDualStreamMode(enabled: boolean): Promise<void>;

    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>;

    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
}

interface RtcFallbackInterface {
    setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void>;

    setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): Promise<void>;

    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
}

interface RtcTestInterface {
    startEchoTest(intervalInSeconds: number): Promise<void>;

    stopEchoTest(): Promise<void>;

    enableLastmileTest(): Promise<void>;

    disableLastmileTest(): Promise<void>;

    startLastmileProbeTest(config: LastmileProbeConfig): Promise<void>;

    stopLastmileProbeTest(): Promise<void>;
}

interface RtcMediaMetadataInterface {
    registerMediaMetadataObserver(): Promise<void>;

    unregisterMediaMetadataObserver(): Promise<void>;

    setMaxMetadataSize(size: number): Promise<void>;

    sendMetadata(metadata: string): Promise<void>;
}

interface RtcWatermarkInterface {
    addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): Promise<void>;

    clearVideoWatermarks(): Promise<void>;
}

interface RtcEncryptionInterface {
    setEncryptionSecret(secret: string): Promise<void>;

    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>;
}

interface RtcAudioRecorderInterface {
    startAudioRecording(filePath: string, sampleRate: number, quality: AudioRecordingQuality): Promise<void>;

    stopAudioRecording(): Promise<void>;
}

interface RtcInjectStreamInterface {
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void>;

    removeInjectStreamUrl(url: string): Promise<void>;
}

interface RtcCameraInterface {
    switchCamera(): Promise<void>;

    isCameraZoomSupported(): Promise<boolean>;

    isCameraTorchSupported(): Promise<boolean>;

    isCameraFocusSupported(): Promise<boolean>;

    isCameraExposurePositionSupported(): Promise<boolean>;

    isCameraAutoFocusFaceModeSupported(): Promise<boolean>;

    setCameraZoomFactor(factor: number): Promise<void>;

    getCameraMaxZoomFactor(): Promise<number>;

    setCameraFocusPositionInPreview(positionX: number, positionY: number): Promise<void>;

    setCameraExposurePosition(positionXinView: number, positionYinView: number): Promise<void>;

    setCameraTorchOn(isOn: boolean): Promise<void>;

    setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void>;

    setCameraCapturerConfiguration(config: CameraCapturerConfiguration): Promise<void>;
}

interface RtcStreamMessageInterface {
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>;

    sendStreamMessage(streamId: number, message: string): Promise<void>;
}
