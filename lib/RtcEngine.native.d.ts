import { AudioProfile, AudioRecordingQuality, AudioReverbPreset, AudioReverbType, AudioScenario, AudioVoiceChanger, BeautyOptions, CameraCapturerConfiguration, ChannelMediaRelayConfiguration, ChannelProfile, ClientRole, ConnectionStateType, EncryptionMode, LastmileProbeConfig, LiveInjectStreamConfig, LiveTranscoding, LogFilter, Rate, StreamFallbackOptions, String, UserInfo, UserPriority, VideoEncoderConfiguration, VideoStreamType, WatermarkOptions } from "./Types";
import { RtcEngineEvents, Subscription } from "./RtcEvents";
export default class RtcEngine implements RtcUserInfoInterface, RtcAudioInterface, RtcVideoInterface, RtcAudioMixingInterface, RtcAudioEffectInterface, RtcVoiceChangerInterface, RtcVoicePositionInterface, RtcPublishStreamInterface, RtcMediaRelayInterface, RtcAudioRouteInterface, RtcEarMonitoringInterface, RtcDualStreamInterface, RtcFallbackInterface, RtcTestInterface, RtcMediaMetadataInterface, RtcWatermarkInterface, RtcEncryptionInterface, RtcAudioRecorderInterface, RtcInjectStreamInterface, RtcCameraInterface, RtcStreamMessageInterface {
    private static engine;
    private _listeners;
    static instance(): RtcEngine;
    static create(appId: string): Promise<RtcEngine>;
    destroy(): Promise<void>;
    addListener<EventType extends keyof RtcEngineEvents>(event: EventType, listener: RtcEngineEvents[EventType]): Subscription;
    removeListener<EventType extends keyof RtcEngineEvents>(event: EventType, listener: RtcEngineEvents[EventType]): void;
    removeAllListeners<EventType extends keyof RtcEngineEvents>(event?: EventType): void;
    setChannelProfile(profile: ChannelProfile): Promise<void>;
    setClientRole(role: ClientRole): Promise<void>;
    joinChannel(token: String, channelName: string, optionalInfo: String, optionalUid: number): Promise<void>;
    switchChannel(token: String, channelName: string): Promise<void>;
    leaveChannel(): Promise<void>;
    renewToken(token: string): Promise<void>;
    /**
     * @deprecated
     */
    enableWebSdkInteroperability(enabled: boolean): Promise<void>;
    getConnectionState(): Promise<ConnectionStateType>;
    getCallId(): Promise<string>;
    rate(callId: string, rating: Rate, description?: string): Promise<void>;
    complain(callId: string, description: string): Promise<void>;
    setLogFile(filePath: string): Promise<void>;
    setLogFilter(filter: LogFilter): Promise<void>;
    setLogFileSize(fileSizeInKBytes: number): Promise<void>;
    setParameters(parameters: string): Promise<void>;
    getUserInfoByUid(uid: number): Promise<UserInfo>;
    getUserInfoByUserAccount(userAccount: string): Promise<UserInfo>;
    joinChannelWithUserAccount(token: String, channelName: string, userAccount: string): Promise<void>;
    registerLocalUserAccount(appId: string, userAccount: string): Promise<void>;
    adjustPlaybackSignalVolume(volume: number): Promise<void>;
    adjustRecordingSignalVolume(volume: number): Promise<void>;
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;
    disableAudio(): Promise<void>;
    enableAudio(): Promise<void>;
    enableAudioVolumeIndication(interval: number, smooth: number, report_vad: boolean): Promise<void>;
    enableLocalAudio(enabled: boolean): Promise<void>;
    muteAllRemoteAudioStreams(muted: boolean): Promise<void>;
    muteLocalAudioStream(muted: boolean): Promise<void>;
    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;
    setAudioProfile(profile: AudioProfile, scenario: AudioScenario): Promise<void>;
    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;
    disableVideo(): Promise<void>;
    enableLocalVideo(enabled: boolean): Promise<void>;
    enableVideo(): Promise<void>;
    muteAllRemoteVideoStreams(muted: boolean): Promise<void>;
    muteLocalVideoStream(muted: boolean): Promise<void>;
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;
    setBeautyEffectOptions(enabled: boolean, options: BeautyOptions): Promise<void>;
    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;
    setVideoEncoderConfiguration(config: VideoEncoderConfiguration): Promise<void>;
    adjustAudioMixingPlayoutVolume(volume: number): Promise<void>;
    adjustAudioMixingPublishVolume(volume: number): Promise<void>;
    adjustAudioMixingVolume(volume: number): Promise<void>;
    getAudioMixingCurrentPosition(): Promise<number>;
    getAudioMixingDuration(): Promise<number>;
    getAudioMixingPlayoutVolume(): Promise<number>;
    getAudioMixingPublishVolume(): Promise<number>;
    pauseAudioMixing(): Promise<void>;
    resumeAudioMixing(): Promise<void>;
    setAudioMixingPosition(pos: number): Promise<void>;
    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): Promise<void>;
    stopAudioMixing(): Promise<void>;
    getEffectsVolume(): Promise<number>;
    pauseAllEffects(): Promise<void>;
    pauseEffect(soundId: number): Promise<void>;
    playEffect(soundId: number, filePath: String, loopCount: number, pitch: number, pan: number, gain: number, publish: Boolean): Promise<void>;
    preloadEffect(soundId: number, filePath: String): Promise<void>;
    resumeAllEffects(): Promise<void>;
    resumeEffect(soundId: number): Promise<void>;
    setEffectsVolume(volume: number): Promise<void>;
    setVolumeOfEffect(soundId: number, volume: number): Promise<void>;
    stopAllEffects(): Promise<void>;
    stopEffect(soundId: number): Promise<void>;
    unloadEffect(soundId: number): Promise<void>;
    setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void>;
    setLocalVoiceEqualization(bandFrequency: number, bandGain: number): Promise<void>;
    setLocalVoicePitch(pitch: number): Promise<void>;
    setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): Promise<void>;
    setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void>;
    enableSoundPositionIndication(enabled: boolean): Promise<void>;
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;
    removePublishStreamUrl(url: string): Promise<void>;
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;
    stopChannelMediaRelay(): Promise<void>;
    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;
    isSpeakerphoneEnabled(): Promise<boolean>;
    setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void>;
    setEnableSpeakerphone(enabled: boolean): Promise<void>;
    enableInEarMonitoring(enabled: boolean): Promise<void>;
    setInEarMonitoringVolume(volume: number): Promise<void>;
    enableDualStreamMode(enabled: boolean): Promise<void>;
    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>;
    setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void>;
    setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): Promise<void>;
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
    disableLastmileTest(): Promise<void>;
    enableLastmileTest(): Promise<void>;
    startEchoTest(intervalInSeconds: number): Promise<void>;
    startLastmileProbeTest(config: LastmileProbeConfig): Promise<void>;
    stopEchoTest(): Promise<void>;
    stopLastmileProbeTest(): Promise<void>;
    registerMediaMetadataObserver(): Promise<void>;
    sendMetadata(metadata: string): Promise<void>;
    setMaxMetadataSize(size: number): Promise<void>;
    unregisterMediaMetadataObserver(): Promise<void>;
    addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): Promise<void>;
    clearVideoWatermarks(): Promise<void>;
    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>;
    setEncryptionSecret(secret: string): Promise<void>;
    startAudioRecording(filePath: string, sampleRate: number, quality: AudioRecordingQuality): Promise<void>;
    stopAudioRecording(): Promise<void>;
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void>;
    removeInjectStreamUrl(url: string): Promise<void>;
    getCameraMaxZoomFactor(): Promise<number>;
    isCameraAutoFocusFaceModeSupported(): Promise<boolean>;
    isCameraExposurePositionSupported(): Promise<boolean>;
    isCameraFocusSupported(): Promise<boolean>;
    isCameraTorchSupported(): Promise<boolean>;
    isCameraZoomSupported(): Promise<boolean>;
    setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void>;
    setCameraCapturerConfiguration(config: CameraCapturerConfiguration): Promise<void>;
    setCameraExposurePosition(positionXinView: number, positionYinView: number): Promise<void>;
    setCameraFocusPositionInPreview(positionX: number, positionY: number): Promise<void>;
    setCameraTorchOn(isOn: boolean): Promise<void>;
    setCameraZoomFactor(factor: number): Promise<void>;
    switchCamera(): Promise<void>;
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>;
    sendStreamMessage(streamId: number, message: string): Promise<void>;
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
export {};
