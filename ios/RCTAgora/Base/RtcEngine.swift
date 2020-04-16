//
//  RtcEngine.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/13.
//  Copyright (c) 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

protocol RtcEngineInterface:
        RtcEngineUserInfoInterface,
        RtcEngineAudioInterface,
        RtcEngineVideoInterface,
        RtcEngineAudioMixingInterface,
        RtcEngineAudioEffectInterface,
        RtcEngineVoiceChangerInterface,
        RtcEngineVoicePositionInterface,
        RtcEnginePublishStreamInterface,
        RtcEngineMediaRelayInterface,
        RtcEngineAudioRouteInterface,
        RtcEngineEarMonitoringInterface,
        RtcEngineDualStreamInterface,
        RtcEngineFallbackInterface,
        RtcEngineTestInterface,
        RtcEngineMediaMetadataInterface,
        RtcEngineWatermarkInterface,
        RtcEngineEncryptionInterface,
        RtcEngineAudioRecorderInterface,
        RtcEngineInjectStreamInterface,
        RtcEngineCameraInterface,
        RtcEngineStreamMessageInterface {
    associatedtype Map
    associatedtype Callback

    func create(_ appId: String, _ callback: Callback?)

    func destroy(_ callback: Callback?)

    func setChannelProfile(_ profile: Int, _ callback: Callback?)

    func setClientRole(_ role: Int, _ callback: Callback?)

    func joinChannel(_ token: String?, _ channelName: String, _ optionalInfo: String?, _ optionalUid: Int, _ callback: Callback?)

    func switchChannel(_ token: String?, _ channelName: String, _ callback: Callback?)

    func leaveChannel(_ callback: Callback?)

    func renewToken(_ token: String, _ callback: Callback?)

    @available(*, deprecated)
    func enableWebSdkInteroperability(_ enabled: Bool, _ callback: Callback?)

    func getConnectionState(_ callback: Callback?)

    func getCallId(_ callback: Callback?)

    func rate(_ callId: String, _ rating: Int, _ description: String?, _ callback: Callback?)

    func complain(_ callId: String, _ description: String, _ callback: Callback?)

    func setLogFile(_ filePath: String, _ callback: Callback?)

    func setLogFilter(_ filter: Int, _ callback: Callback?)

    func setLogFileSize(_ fileSizeInKBytes: Int, _ callback: Callback?)

    func setParameters(_ parameters: String, _ callback: Callback?)
}

protocol RtcEngineUserInfoInterface {
    associatedtype Callback

    func registerLocalUserAccount(_ appId: String, _ userAccount: String, _ callback: Callback?)

    func joinChannelWithUserAccount(_ token: String?, _ channelName: String, _ userAccount: String, _ callback: Callback?)

    func getUserInfoByUserAccount(_ userAccount: String, _ callback: Callback?)

    func getUserInfoByUid(_ uid: Int, _ callback: Callback?)
}

protocol RtcEngineAudioInterface {
    associatedtype Callback

    func enableAudio(_ callback: Callback?)

    func disableAudio(_ callback: Callback?)

    func setAudioProfile(_ profile: Int, _ scenario: Int, _ callback: Callback?)

    func adjustRecordingSignalVolume(_ volume: Int, _ callback: Callback?)

    func adjustUserPlaybackSignalVolume(_ uid: Int, _ volume: Int, _ callback: Callback?)

    func adjustPlaybackSignalVolume(_ volume: Int, _ callback: Callback?)

    func enableLocalAudio(_ enabled: Bool, _ callback: Callback?)

    func muteLocalAudioStream(_ muted: Bool, _ callback: Callback?)

    func muteRemoteAudioStream(_ uid: Int, _ muted: Bool, _ callback: Callback?)

    func muteAllRemoteAudioStreams(_ muted: Bool, _ callback: Callback?)

    func setDefaultMuteAllRemoteAudioStreams(_ muted: Bool, _ callback: Callback?)

    func enableAudioVolumeIndication(_ interval: Int, _ smooth: Int, _ report_vad: Bool, _ callback: Callback?)
}

protocol RtcEngineVideoInterface {
    associatedtype Map
    associatedtype Callback

    func enableVideo(_ callback: Callback?)

    func disableVideo(_ callback: Callback?)

    func setVideoEncoderConfiguration(_ config: Map, _ callback: Callback?)

    func enableLocalVideo(_ enabled: Bool, _ callback: Callback?)

    func muteLocalVideoStream(_ muted: Bool, _ callback: Callback?)

    func muteRemoteVideoStream(_ uid: Int, _ muted: Bool, _ callback: Callback?)

    func muteAllRemoteVideoStreams(_ muted: Bool, _ callback: Callback?)

    func setDefaultMuteAllRemoteVideoStreams(_ muted: Bool, _ callback: Callback?)

    func setBeautyEffectOptions(_ enabled: Bool, _ options: Map, _ callback: Callback?)
}

protocol RtcEngineAudioMixingInterface {
    associatedtype Callback

    func startAudioMixing(_ filePath: String, _ loopback: Bool, _ replace: Bool, _ cycle: Int, _ callback: Callback?)

    func stopAudioMixing(_ callback: Callback?)

    func pauseAudioMixing(_ callback: Callback?)

    func resumeAudioMixing(_ callback: Callback?)

    func adjustAudioMixingVolume(_ volume: Int, _ callback: Callback?)

    func adjustAudioMixingPlayoutVolume(_ volume: Int, _ callback: Callback?)

    func adjustAudioMixingPublishVolume(_ volume: Int, _ callback: Callback?)

    func getAudioMixingPlayoutVolume(_ callback: Callback?)

    func getAudioMixingPublishVolume(_ callback: Callback?)

    func getAudioMixingDuration(_ callback: Callback?)

    func getAudioMixingCurrentPosition(_ callback: Callback?)

    func setAudioMixingPosition(_ pos: Int, _ callback: Callback?)
}

protocol RtcEngineAudioEffectInterface {
    associatedtype Callback

    func getEffectsVolume(_ callback: Callback?)

    func setEffectsVolume(_ volume: Double, _ callback: Callback?)

    func setVolumeOfEffect(_ soundId: Int, _ volume: Double, _ callback: Callback?)

    func playEffect(_ soundId: Int, _ filePath: String, _ loopCount: Int, _ pitch: Double, _ pan: Double, _ gain: Double, _ publish: Bool, _ callback: Callback?)

    func stopEffect(_ soundId: Int, _ callback: Callback?)

    func stopAllEffects(_ callback: Callback?)

    func preloadEffect(_ soundId: Int, _ filePath: String, _ callback: Callback?)

    func unloadEffect(_ soundId: Int, _ callback: Callback?)

    func pauseEffect(_ soundId: Int, _ callback: Callback?)

    func pauseAllEffects(_ callback: Callback?)

    func resumeEffect(_ soundId: Int, _ callback: Callback?)

    func resumeAllEffects(_ callback: Callback?)
}

protocol RtcEngineVoiceChangerInterface {
    associatedtype Callback

    func setLocalVoiceChanger(_ voiceChanger: Int, _ callback: Callback?)

    func setLocalVoiceReverbPreset(_ preset: Int, _ callback: Callback?)

    func setLocalVoicePitch(_ pitch: Double, _ callback: Callback?)

    func setLocalVoiceEqualization(_ bandFrequency: Int, _ bandGain: Int, _ callback: Callback?)

    func setLocalVoiceReverb(_ reverbKey: Int, _ value: Int, _ callback: Callback?)
}

protocol RtcEngineVoicePositionInterface {
    associatedtype Callback

    func enableSoundPositionIndication(_ enabled: Bool, _ callback: Callback?)

    func setRemoteVoicePosition(_ uid: Int, _ pan: Double, _ gain: Double, _ callback: Callback?)
}

protocol RtcEnginePublishStreamInterface {
    associatedtype Map
    associatedtype Callback

    func setLiveTranscoding(_ transcoding: Map, _ callback: Callback?)

    func addPublishStreamUrl(_ url: String, _ transcodingEnabled: Bool, _ callback: Callback?)

    func removePublishStreamUrl(_ url: String, _ callback: Callback?)
}

protocol RtcEngineMediaRelayInterface {
    associatedtype Map
    associatedtype Callback

    func startChannelMediaRelay(_ channelMediaRelayConfiguration: Map, _ callback: Callback?)

    func updateChannelMediaRelay(_ channelMediaRelayConfiguration: Map, _ callback: Callback?)

    func stopChannelMediaRelay(_ callback: Callback?)
}

protocol RtcEngineAudioRouteInterface {
    associatedtype Callback

    func setDefaultAudioRoutetoSpeakerphone(_ defaultToSpeaker: Bool, _ callback: Callback?)

    func setEnableSpeakerphone(_ enabled: Bool, _ callback: Callback?)

    func isSpeakerphoneEnabled(_ callback: Callback?)
}

protocol RtcEngineEarMonitoringInterface {
    associatedtype Callback

    func enableInEarMonitoring(_ enabled: Bool, _ callback: Callback?)

    func setInEarMonitoringVolume(_ volume: Int, _ callback: Callback?)
}

protocol RtcEngineDualStreamInterface {
    associatedtype Callback

    func enableDualStreamMode(_ enabled: Bool, _ callback: Callback?)

    func setRemoteVideoStreamType(_ uid: Int, _ streamType: Int, _ callback: Callback?)

    func setRemoteDefaultVideoStreamType(_ streamType: Int, _ callback: Callback?)
}

protocol RtcEngineFallbackInterface {
    associatedtype Callback

    func setLocalPublishFallbackOption(_ option: Int, _ callback: Callback?)

    func setRemoteSubscribeFallbackOption(_ option: Int, _ callback: Callback?)

    func setRemoteUserPriority(_ uid: Int, _ userPriority: Int, _ callback: Callback?)
}

protocol RtcEngineTestInterface {
    associatedtype Map
    associatedtype Callback

    func startEchoTest(_ intervalInSeconds: Int, _ callback: Callback?)

    func stopEchoTest(_ callback: Callback?)

    func enableLastmileTest(_ callback: Callback?)

    func disableLastmileTest(_ callback: Callback?)

    func startLastmileProbeTest(_ config: Map, _ callback: Callback?)

    func stopLastmileProbeTest(_ callback: Callback?)
}

protocol RtcEngineMediaMetadataInterface {
    associatedtype Callback

    func registerMediaMetadataObserver(_ callback: Callback?)

    func unregisterMediaMetadataObserver(_ callback: Callback?)

    func setMaxMetadataSize(_ size: Int, _ callback: Callback?)

    func sendMetadata(_ metadata: String, _ callback: Callback?)
}

protocol RtcEngineWatermarkInterface {
    associatedtype Map
    associatedtype Callback

    func addVideoWatermark(_ watermarkUrl: String, _ options: Map, _ callback: Callback?)

    func clearVideoWatermarks(_ callback: Callback?)
}

protocol RtcEngineEncryptionInterface {
    associatedtype Callback

    func setEncryptionSecret(_ secret: String, _ callback: Callback?)

    func setEncryptionMode(_ encryptionMode: String, _ callback: Callback?)
}

protocol RtcEngineAudioRecorderInterface {
    associatedtype Callback

    func startAudioRecording(_ filePath: String, _ sampleRate: Int, _ quality: Int, _ callback: Callback?)

    func stopAudioRecording(_ callback: Callback?)
}

protocol RtcEngineInjectStreamInterface {
    associatedtype Map
    associatedtype Callback

    func addInjectStreamUrl(_ url: String, _ config: Map, _ callback: Callback?)

    func removeInjectStreamUrl(_ url: String, _ callback: Callback?)
}

protocol RtcEngineCameraInterface {
    associatedtype Map
    associatedtype Callback

    func switchCamera(_ callback: Callback?)

    func isCameraZoomSupported(_ callback: Callback?)

    func isCameraTorchSupported(_ callback: Callback?)

    func isCameraFocusSupported(_ callback: Callback?)

    func isCameraExposurePositionSupported(_ callback: Callback?)

    func isCameraAutoFocusFaceModeSupported(_ callback: Callback?)

    func setCameraZoomFactor(_ factor: Float, _ callback: Callback?)

    func getCameraMaxZoomFactor(_ callback: Callback?)

    func setCameraFocusPositionInPreview(_ positionX: Float, _ positionY: Float, _ callback: Callback?)

    func setCameraExposurePosition(_ positionXinView: Float, _ positionYinView: Float, _ callback: Callback?)

    func setCameraTorchOn(_ isOn: Bool, _ callback: Callback?)

    func setCameraAutoFocusFaceModeEnabled(_ enabled: Bool, _ callback: Callback?)

    func setCameraCapturerConfiguration(_ config: Map, _ callback: Callback?)
}

protocol RtcEngineStreamMessageInterface {
    associatedtype Callback

    func createDataStream(_ reliable: Bool, _ ordered: Bool, _ callback: Callback?)

    func sendStreamMessage(_ streamId: Int, _ message: String, _ callback: Callback?)
}
