//
//  RCTRtcEngineModule.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/14.
//  Copyright © 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

@objc(RCTAgoraRtcEngineModule)
class RCTAgoraRtcEngineModule: RCTEventEmitter, RtcEngineInterface {
    static let REACT_CLASS = "RCTAgoraRtcEngineModule"

    typealias Map = NSDictionary
    typealias Callback = PromiseCallback

    private lazy var manager: RtcEngineManager = {
        RtcEngineManager()
    }()

    override class func moduleName() -> String! {
        RCTAgoraRtcEngineModule.REACT_CLASS
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        ["prefix": RtcEngineEventHandler.PREFIX]
    }

    deinit {
        manager.release()
    }

    override class func requiresMainQueueSetup() -> Bool {
        true
    }

    override var methodQueue: DispatchQueue! {
        DispatchQueue.main
    }

    override func supportedEvents() -> [String]! {
        var events = [String]()
        RtcEngineEventHandler.EVENTS.forEach { key, value in
            events.append("\(RtcEngineEventHandler.PREFIX)\(value)")
        }
        return events
    }

    private func emit(_ methodName: String, _ data: Dictionary<String, Any?>?) {
        sendEvent(withName: "\(RtcEngineEventHandler.PREFIX)\(methodName)", body: data)
    }

    var engine: AgoraRtcEngineKit? {
        return manager.engine
    }

    func create(_ appId: String, _ callback: PromiseCallback?) {
        manager.create(appId) { [weak self] (methodName, data) in
            self?.emit(methodName, data)
        }
        callback?.resolve(engine) { e in nil }
    }

    func destroy(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { e in manager.destroy() }
    }

    func setChannelProfile(_ profile: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setChannelProfile(AgoraChannelProfile(rawValue: profile)!))
    }

    func setClientRole(_ role: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setClientRole(AgoraClientRole(rawValue: role)!))
    }

    func joinChannel(_ token: String?, _ channelName: String, _ optionalInfo: String?, _ optionalUid: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.joinChannel(byToken: token, channelId: channelName, info: optionalInfo, uid: UInt(optionalUid)))
    }

    func switchChannel(_ token: String?, _ channelName: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.switchChannel(byToken: token, channelId: channelName))
    }

    func leaveChannel(_ callback: PromiseCallback?) {
        callback?.code(engine?.leaveChannel())
    }

    func renewToken(_ token: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.renewToken(token))
    }

    func enableWebSdkInteroperability(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enableWebSdkInteroperability(enabled))
    }

    func getConnectionState(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getConnectionState()
        }
    }

    func getCallId(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getCallId()
        }
    }

    func rate(_ callId: String, _ rating: Int, _ description: String?, _ callback: PromiseCallback?) {
        callback?.code(engine?.rate(callId, rating: rating, description: description))
    }

    func complain(_ callId: String, _ description: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.complain(callId, description: description))
    }

    func setLogFile(_ filePath: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLogFile(filePath))
    }

    func setLogFilter(_ filter: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLogFilter(UInt(filter)))
    }

    func setLogFileSize(_ fileSizeInKBytes: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLogFileSize(UInt(fileSizeInKBytes)))
    }

    func setParameters(_ parameters: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.setParameters(parameters))
    }

    func registerLocalUserAccount(_ appId: String, _ userAccount: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.registerLocalUserAccount(userAccount, appId: appId))
    }

    func joinChannelWithUserAccount(_ token: String?, _ channelName: String, _ userAccount: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.joinChannel(byUserAccount: userAccount, token: token, channelId: channelName, joinSuccess: nil))
    }

    func getUserInfoByUserAccount(_ userAccount: String, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            manager.getUserInfoByUserAccount(userAccount)
        }
    }

    func getUserInfoByUid(_ uid: Int, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            manager.getUserInfoByUid(uid)
        }
    }

    func enableAudio(_ callback: PromiseCallback?) {
        callback?.code(engine?.enableAudio())
    }

    func disableAudio(_ callback: PromiseCallback?) {
        callback?.code(engine?.disableAudio())
    }

    func setAudioProfile(_ profile: Int, _ scenario: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setAudioProfile(AgoraAudioProfile(rawValue: profile)!, scenario: AgoraAudioScenario(rawValue: scenario)!))
    }

    func adjustRecordingSignalVolume(_ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.adjustRecordingSignalVolume(volume))
    }

    func adjustUserPlaybackSignalVolume(_ uid: Int, _ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.adjustUserPlaybackSignalVolume(UInt(uid), volume: Int32(volume)))
    }

    func adjustPlaybackSignalVolume(_ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.adjustPlaybackSignalVolume(volume))
    }

    func enableLocalAudio(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enableLocalAudio(enabled))
    }

    func muteLocalAudioStream(_ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.muteLocalAudioStream(muted))
    }

    func muteRemoteAudioStream(_ uid: Int, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.muteRemoteAudioStream(UInt(uid), mute: muted))
    }

    func muteAllRemoteAudioStreams(_ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.muteAllRemoteAudioStreams(muted))
    }

    func setDefaultMuteAllRemoteAudioStreams(_ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.setDefaultMuteAllRemoteAudioStreams(muted))
    }

    func enableAudioVolumeIndication(_ interval: Int, _ smooth: Int, _ report_vad: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enableAudioVolumeIndication(interval, smooth: smooth, report_vad: report_vad))
    }

    func enableVideo(_ callback: PromiseCallback?) {
        callback?.code(engine?.enableVideo())
    }

    func disableVideo(_ callback: PromiseCallback?) {
        callback?.code(engine?.disableVideo())
    }

    func setVideoEncoderConfiguration(_ config: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.setVideoEncoderConfiguration(mapToVideoEncoderConfiguration(map: config as! Dictionary<String, Any>)))
    }

    func enableLocalVideo(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enableLocalVideo(enabled))
    }

    func muteLocalVideoStream(_ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.muteLocalVideoStream(muted))
    }

    func muteRemoteVideoStream(_ uid: Int, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.muteRemoteVideoStream(UInt(uid), mute: muted))
    }

    func muteAllRemoteVideoStreams(_ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.muteAllRemoteVideoStreams(muted))
    }

    func setDefaultMuteAllRemoteVideoStreams(_ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.setDefaultMuteAllRemoteVideoStreams(muted))
    }

    func setBeautyEffectOptions(_ enabled: Bool, _ options: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.setBeautyEffectOptions(enabled, options: mapToBeautyOptions(map: options as! Dictionary<String, Any>)))
    }

    func startAudioMixing(_ filePath: String, _ loopback: Bool, _ replace: Bool, _ cycle: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.startAudioMixing(filePath, loopback: loopback, replace: replace, cycle: cycle))
    }

    func stopAudioMixing(_ callback: PromiseCallback?) {
        callback?.code(engine?.stopAudioMixing())
    }

    func pauseAudioMixing(_ callback: PromiseCallback?) {
        callback?.code(engine?.pauseAudioMixing())
    }

    func resumeAudioMixing(_ callback: PromiseCallback?) {
        callback?.code(engine?.resumeAudioMixing())
    }

    func adjustAudioMixingVolume(_ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.adjustAudioMixingVolume(volume))
    }

    func adjustAudioMixingPlayoutVolume(_ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.adjustAudioMixingPlayoutVolume(volume))
    }

    func adjustAudioMixingPublishVolume(_ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.adjustAudioMixingPublishVolume(volume))
    }

    func getAudioMixingPlayoutVolume(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getAudioMixingPlayoutVolume()
        }
    }

    func getAudioMixingPublishVolume(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getAudioMixingPublishVolume()
        }
    }

    func getAudioMixingDuration(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getAudioMixingDuration()
        }
    }

    func getAudioMixingCurrentPosition(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getAudioMixingCurrentPosition()
        }
    }

    func setAudioMixingPosition(_ pos: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setAudioMixingPosition(pos))
    }

    func getEffectsVolume(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.getEffectsVolume()
        }
    }

    func setEffectsVolume(_ volume: Double, _ callback: PromiseCallback?) {
        callback?.code(engine?.setEffectsVolume(volume))
    }

    func setVolumeOfEffect(_ soundId: Int, _ volume: Double, _ callback: PromiseCallback?) {
        callback?.code(engine?.setVolumeOfEffect(Int32(soundId), withVolume: volume))
    }

    func playEffect(_ soundId: Int, _ filePath: String, _ loopCount: Int, _ pitch: Double, _ pan: Double, _ gain: Double, _ publish: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.playEffect(Int32(soundId), filePath: filePath, loopCount: Int32(loopCount), pitch: pitch, pan: pan, gain: gain, publish: publish))
    }

    func stopEffect(_ soundId: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.stopEffect(Int32(soundId)))
    }

    func stopAllEffects(_ callback: PromiseCallback?) {
        callback?.code(engine?.stopAllEffects())
    }

    func preloadEffect(_ soundId: Int, _ filePath: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.preloadEffect(Int32(soundId), filePath: filePath))
    }

    func unloadEffect(_ soundId: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.unloadEffect(Int32(soundId)))
    }

    func pauseEffect(_ soundId: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.pauseEffect(Int32(soundId)))
    }

    func pauseAllEffects(_ callback: PromiseCallback?) {
        callback?.code(engine?.pauseAllEffects())
    }

    func resumeEffect(_ soundId: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.resumeEffect(Int32(soundId)))
    }

    func resumeAllEffects(_ callback: PromiseCallback?) {
        callback?.code(engine?.resumeAllEffects())
    }

    func setLocalVoiceChanger(_ voiceChanger: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLocalVoiceChanger(AgoraAudioVoiceChanger(rawValue: voiceChanger)!))
    }

    func setLocalVoiceReverbPreset(_ preset: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLocalVoiceReverbPreset(AgoraAudioReverbPreset(rawValue: preset)!))
    }

    func setLocalVoicePitch(_ pitch: Double, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLocalVoicePitch(pitch))
    }

    func setLocalVoiceEqualization(_ bandFrequency: Int, _ bandGain: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLocalVoiceEqualizationOf(AgoraAudioEqualizationBandFrequency(rawValue: bandFrequency)!, withGain: bandGain))
    }

    func setLocalVoiceReverb(_ reverbKey: Int, _ value: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLocalVoiceReverbOf(AgoraAudioReverbType(rawValue: reverbKey)!, withValue: value))
    }

    func enableSoundPositionIndication(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enableSoundPositionIndication(enabled))
    }

    func setRemoteVoicePosition(_ uid: Int, _ pan: Double, _ gain: Double, _ callback: PromiseCallback?) {
        callback?.code(engine?.setRemoteVoicePosition(UInt(uid), pan: pan, gain: gain))
    }

    func setLiveTranscoding(_ transcoding: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLiveTranscoding(mapToLiveTranscoding(map: transcoding as! Dictionary<String, Any>)))
    }

    func addPublishStreamUrl(_ url: String, _ transcodingEnabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.addPublishStreamUrl(url, transcodingEnabled: transcodingEnabled))
    }

    func removePublishStreamUrl(_ url: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.removePublishStreamUrl(url))
    }

    func startChannelMediaRelay(_ channelMediaRelayConfiguration: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.startChannelMediaRelay(mapToChannelMediaRelayConfiguration(map: channelMediaRelayConfiguration as! Dictionary<String, Any>)))
    }

    func updateChannelMediaRelay(_ channelMediaRelayConfiguration: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.updateChannelMediaRelay(mapToChannelMediaRelayConfiguration(map: channelMediaRelayConfiguration as! Dictionary<String, Any>)))
    }

    func stopChannelMediaRelay(_ callback: PromiseCallback?) {
        callback?.code(engine?.stopChannelMediaRelay())
    }

    func setDefaultAudioRoutetoSpeakerphone(_ defaultToSpeaker: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.setDefaultAudioRouteToSpeakerphone(defaultToSpeaker))
    }

    func setEnableSpeakerphone(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.setEnableSpeakerphone(enabled))
    }

    func isSpeakerphoneEnabled(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.isSpeakerphoneEnabled()
        }
    }

    func enableInEarMonitoring(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enable(inEarMonitoring: enabled))
    }

    func setInEarMonitoringVolume(_ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setInEarMonitoringVolume(volume))
    }

    func enableDualStreamMode(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(engine?.enableDualStreamMode(enabled))
    }

    func setRemoteVideoStreamType(_ uid: Int, _ streamType: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setRemoteVideoStream(UInt(uid), type: AgoraVideoStreamType(rawValue: streamType)!))
    }

    func setRemoteDefaultVideoStreamType(_ streamType: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setRemoteDefaultVideoStreamType(AgoraVideoStreamType(rawValue: streamType)!))
    }

    func setLocalPublishFallbackOption(_ option: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setLocalPublishFallbackOption(AgoraStreamFallbackOptions(rawValue: option)!))
    }

    func setRemoteSubscribeFallbackOption(_ option: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setRemoteSubscribeFallbackOption(AgoraStreamFallbackOptions(rawValue: option)!))
    }

    func setRemoteUserPriority(_ uid: Int, _ userPriority: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.setRemoteUserPriority(UInt(uid), type: AgoraUserPriority(rawValue: userPriority)!))
    }

    func startEchoTest(_ intervalInSeconds: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.startEchoTest(withInterval: intervalInSeconds))
    }

    func stopEchoTest(_ callback: PromiseCallback?) {
        callback?.code(engine?.stopEchoTest())
    }

    func enableLastmileTest(_ callback: PromiseCallback?) {
        callback?.code(engine?.enableLastmileTest())
    }

    func disableLastmileTest(_ callback: PromiseCallback?) {
        callback?.code(engine?.disableLastmileTest())
    }

    func startLastmileProbeTest(_ config: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.startLastmileProbeTest(mapToLastmileProbeConfig(map: config as! Dictionary<String, Any>)))
    }

    func stopLastmileProbeTest(_ callback: PromiseCallback?) {
        callback?.code(engine?.stopLastmileProbeTest())
    }

    func registerMediaMetadataObserver(_ callback: PromiseCallback?) {
        callback?.code(manager.registerMediaMetadataObserver() { [weak self] (methodName, data) in
            self?.emit(methodName, data)
        })
    }

    func unregisterMediaMetadataObserver(_ callback: PromiseCallback?) {
        callback?.code(manager.unregisterMediaMetadataObserver())
    }

    func setMaxMetadataSize(_ size: Int, _ callback: PromiseCallback?) {
        callback?.code(manager.setMaxMetadataSize(size))
    }

    func sendMetadata(_ metadata: String, _ callback: PromiseCallback?) {
        callback?.code(manager.addMetadata(metadata))
    }

    func addVideoWatermark(_ watermarkUrl: String, _ options: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.addVideoWatermark(URL(string: watermarkUrl)!, options: mapToWatermarkOptions(map: options as! Dictionary<String, Any>)))
    }

    func clearVideoWatermarks(_ callback: PromiseCallback?) {
        callback?.code(engine?.clearVideoWatermarks())
    }

    func setEncryptionSecret(_ secret: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.setEncryptionSecret(secret))
    }

    func setEncryptionMode(_ encryptionMode: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.setEncryptionMode(encryptionMode))
    }

    func startAudioRecording(_ filePath: String, _ sampleRate: Int, _ quality: Int, _ callback: PromiseCallback?) {
        callback?.code(engine?.startAudioRecording(filePath, sampleRate: sampleRate, quality: AgoraAudioRecordingQuality(rawValue: quality)!))
    }

    func stopAudioRecording(_ callback: PromiseCallback?) {
        callback?.code(engine?.stopAudioRecording())
    }

    func addInjectStreamUrl(_ url: String, _ config: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.addInjectStreamUrl(url, config: mapToLiveInjectStreamConfig(map: config as! Dictionary<String, Any>)))
    }

    func removeInjectStreamUrl(_ url: String, _ callback: PromiseCallback?) {
        callback?.code(engine?.removeInjectStreamUrl(url))
    }

    func switchCamera(_ callback: PromiseCallback?) {
        callback?.code(engine?.switchCamera())
    }

    func isCameraZoomSupported(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.isCameraZoomSupported()
        }
    }

    func isCameraTorchSupported(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.isCameraTorchSupported()
        }
    }

    func isCameraFocusSupported(_ callback: PromiseCallback?) {

    }

    func isCameraExposurePositionSupported(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.isCameraExposurePositionSupported()
        }
    }

    func isCameraAutoFocusFaceModeSupported(_ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.isCameraAutoFocusFaceModeSupported()
        }
    }

    func setCameraZoomFactor(_ factor: Float, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.setCameraZoomFactor(CGFloat(factor))
        }
    }

    func getCameraMaxZoomFactor(_ callback: PromiseCallback?) {

    }

    func setCameraFocusPositionInPreview(_ positionX: Float, _ positionY: Float, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.setCameraFocusPositionInPreview(CGPoint(x: CGFloat(positionX), y: CGFloat(positionY)))
        }
    }

    func setCameraExposurePosition(_ positionXinView: Float, _ positionYinView: Float, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.setCameraExposurePosition(CGPoint(x: CGFloat(positionXinView), y: CGFloat(positionYinView)))
        }
    }

    func setCameraTorchOn(_ isOn: Bool, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.setCameraTorchOn(isOn)
        }
    }

    func setCameraAutoFocusFaceModeEnabled(_ enabled: Bool, _ callback: PromiseCallback?) {
        callback?.resolve(engine) { (engine: AgoraRtcEngineKit) in
            engine.setCameraAutoFocusFaceModeEnabled(enabled)
        }
    }

    func setCameraCapturerConfiguration(_ config: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(engine?.setCameraCapturerConfiguration(mapToCameraCapturerConfiguration(map: config as! Dictionary<String, Any>)))
    }

    func createDataStream(_ reliable: Bool, _ ordered: Bool, _ callback: PromiseCallback?) {
        let streamId = manager.createDataStream(reliable, ordered)
        if streamId <= 0 {
            callback?.code(streamId)
        } else {
            callback?.resolve(engine, { e in streamId})
        }
    }

    func sendStreamMessage(_ streamId: Int, _ message: String, _ callback: PromiseCallback?) {
        callback?.code(manager.sendStreamMessage(streamId, message))
    }
}

extension RCTAgoraRtcEngineModule {
    @objc func create(_ appId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        create(appId, PromiseCallback(resolve, reject))
    }

    @objc func destroy(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        destroy(PromiseCallback(resolve, reject))
    }

    @objc func setChannelProfile(_ profile: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setChannelProfile(profile, PromiseCallback(resolve, reject))
    }

    @objc func setClientRole(_ role: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setClientRole(role, PromiseCallback(resolve, reject))
    }

    @objc func joinChannel(_ token: String?, _ channelName: String, _ optionalInfo: String?, _ optionalUid: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        joinChannel(token, channelName, optionalInfo, optionalUid, PromiseCallback(resolve, reject))
    }

    @objc func switchChannel(_ token: String?, _ channelName: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        switchChannel(token, channelName, PromiseCallback(resolve, reject))
    }

    @objc func leaveChannel(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        leaveChannel(PromiseCallback(resolve, reject))
    }

    @objc func renewToken(_ token: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        renewToken(token, PromiseCallback(resolve, reject))
    }

    @objc func enableWebSdkInteroperability(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableWebSdkInteroperability(enabled, PromiseCallback(resolve, reject))
    }

    @objc func getConnectionState(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getConnectionState(PromiseCallback(resolve, reject))
    }

    @objc func getCallId(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getCallId(PromiseCallback(resolve, reject))
    }

    @objc func rate(_ callId: String, _ rating: Int, _ description: String?, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        rate(callId, rating, description, PromiseCallback(resolve, reject))
    }

    @objc func complain(_ callId: String, _ description: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        complain(callId, description, PromiseCallback(resolve, reject))
    }

    @objc func setLogFile(_ filePath: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLogFile(filePath, PromiseCallback(resolve, reject))
    }

    @objc func setLogFilter(_ filter: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLogFilter(filter, PromiseCallback(resolve, reject))
    }

    @objc func setLogFileSize(_ fileSizeInKBytes: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLogFileSize(fileSizeInKBytes, PromiseCallback(resolve, reject))
    }

    @objc func setParameters(_ parameters: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setParameters(parameters, PromiseCallback(resolve, reject))
    }

    @objc func registerLocalUserAccount(_ appId: String, _ userAccount: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        registerLocalUserAccount(appId, userAccount, PromiseCallback(resolve, reject))
    }

    @objc func joinChannelWithUserAccount(_ token: String?, _ channelName: String, _ userAccount: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        joinChannelWithUserAccount(token, channelName, userAccount, PromiseCallback(resolve, reject))
    }

    @objc func getUserInfoByUserAccount(_ userAccount: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getUserInfoByUserAccount(userAccount, PromiseCallback(resolve, reject))
    }

    @objc func getUserInfoByUid(_ uid: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getUserInfoByUid(uid, PromiseCallback(resolve, reject))
    }

    @objc func enableAudio(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableAudio(PromiseCallback(resolve, reject))
    }

    @objc func disableAudio(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        disableAudio(PromiseCallback(resolve, reject))
    }

    @objc func setAudioProfile(_ profile: Int, _ scenario: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setAudioProfile(profile, scenario, PromiseCallback(resolve, reject))
    }

    @objc func adjustRecordingSignalVolume(_ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustRecordingSignalVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func adjustUserPlaybackSignalVolume(_ uid: Int, _ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustUserPlaybackSignalVolume(uid, volume, PromiseCallback(resolve, reject))
    }

    @objc func adjustPlaybackSignalVolume(_ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustPlaybackSignalVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func enableLocalAudio(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableLocalAudio(enabled, PromiseCallback(resolve, reject))
    }

    @objc func muteLocalAudioStream(_ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteLocalAudioStream(muted, PromiseCallback(resolve, reject))
    }

    @objc func muteRemoteAudioStream(_ uid: Int, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteRemoteAudioStream(uid, muted, PromiseCallback(resolve, reject))
    }

    @objc func muteAllRemoteAudioStreams(_ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteAllRemoteAudioStreams(muted, PromiseCallback(resolve, reject))
    }

    @objc func setDefaultMuteAllRemoteAudioStreams(_ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultMuteAllRemoteAudioStreams(muted, PromiseCallback(resolve, reject))
    }

    @objc func enableAudioVolumeIndication(_ interval: Int, _ smooth: Int, _ report_vad: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableAudioVolumeIndication(interval, smooth, report_vad, PromiseCallback(resolve, reject))
    }

    @objc func enableVideo(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableVideo(PromiseCallback(resolve, reject))
    }

    @objc func disableVideo(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        disableVideo(PromiseCallback(resolve, reject))
    }

    @objc func setVideoEncoderConfiguration(_ config: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setVideoEncoderConfiguration(config, PromiseCallback(resolve, reject))
    }

    @objc func enableLocalVideo(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableLocalVideo(enabled, PromiseCallback(resolve, reject))
    }

    @objc func muteLocalVideoStream(_ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteLocalVideoStream(muted, PromiseCallback(resolve, reject))
    }

    @objc func muteRemoteVideoStream(_ uid: Int, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteRemoteVideoStream(uid, muted, PromiseCallback(resolve, reject))
    }

    @objc func muteAllRemoteVideoStreams(_ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteAllRemoteVideoStreams(muted, PromiseCallback(resolve, reject))
    }

    @objc func setDefaultMuteAllRemoteVideoStreams(_ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultMuteAllRemoteVideoStreams(muted, PromiseCallback(resolve, reject))
    }

    @objc func setBeautyEffectOptions(_ enabled: Bool, _ options: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setBeautyEffectOptions(enabled, options, PromiseCallback(resolve, reject))
    }

    @objc func startAudioMixing(_ filePath: String, _ loopback: Bool, _ replace: Bool, _ cycle: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        startAudioMixing(filePath, loopback, replace, cycle, PromiseCallback(resolve, reject))
    }

    @objc func stopAudioMixing(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopAudioMixing(PromiseCallback(resolve, reject))
    }

    @objc func pauseAudioMixing(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        pauseAudioMixing(PromiseCallback(resolve, reject))
    }

    @objc func resumeAudioMixing(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        resumeAudioMixing(PromiseCallback(resolve, reject))
    }

    @objc func adjustAudioMixingVolume(_ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustAudioMixingVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func adjustAudioMixingPlayoutVolume(_ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustAudioMixingPlayoutVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func adjustAudioMixingPublishVolume(_ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustAudioMixingPublishVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func getAudioMixingPlayoutVolume(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getAudioMixingPlayoutVolume(PromiseCallback(resolve, reject))
    }

    @objc func getAudioMixingPublishVolume(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getAudioMixingPublishVolume(PromiseCallback(resolve, reject))
    }

    @objc func getAudioMixingDuration(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getAudioMixingDuration(PromiseCallback(resolve, reject))
    }

    @objc func getAudioMixingCurrentPosition(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getAudioMixingCurrentPosition(PromiseCallback(resolve, reject))
    }

    @objc func setAudioMixingPosition(_ pos: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setAudioMixingPosition(pos, PromiseCallback(resolve, reject))
    }

    @objc func getEffectsVolume(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getEffectsVolume(PromiseCallback(resolve, reject))
    }

    @objc func setEffectsVolume(_ volume: Double, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setEffectsVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func setVolumeOfEffect(_ soundId: Int, _ volume: Double, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setVolumeOfEffect(soundId, volume, PromiseCallback(resolve, reject))
    }

    @objc func playEffect(_ soundId: Int, _ filePath: String, _ loopCount: Int, _ pitch: Double, _ pan: Double, _ gain: Double, _ publish: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish, PromiseCallback(resolve, reject))
    }

    @objc func stopEffect(_ soundId: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopEffect(soundId, PromiseCallback(resolve, reject))
    }

    @objc func stopAllEffects(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopAllEffects(PromiseCallback(resolve, reject))
    }

    @objc func preloadEffect(_ soundId: Int, _ filePath: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        preloadEffect(soundId, filePath, PromiseCallback(resolve, reject))
    }

    @objc func unloadEffect(_ soundId: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        unloadEffect(soundId, PromiseCallback(resolve, reject))
    }

    @objc func pauseEffect(_ soundId: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        pauseEffect(soundId, PromiseCallback(resolve, reject))
    }

    @objc func pauseAllEffects(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        pauseAllEffects(PromiseCallback(resolve, reject))
    }

    @objc func resumeEffect(_ soundId: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        resumeEffect(soundId, PromiseCallback(resolve, reject))
    }

    @objc func resumeAllEffects(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        resumeAllEffects(PromiseCallback(resolve, reject))
    }

    @objc func setLocalVoiceChanger(_ voiceChanger: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLocalVoiceChanger(voiceChanger, PromiseCallback(resolve, reject))
    }

    @objc func setLocalVoiceReverbPreset(_ preset: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLocalVoiceReverbPreset(preset, PromiseCallback(resolve, reject))
    }

    @objc func setLocalVoicePitch(_ pitch: Double, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLocalVoicePitch(pitch, PromiseCallback(resolve, reject))
    }

    @objc func setLocalVoiceEqualization(_ bandFrequency: Int, _ bandGain: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLocalVoiceEqualization(bandFrequency, bandGain, PromiseCallback(resolve, reject))
    }

    @objc func setLocalVoiceReverb(_ reverbKey: Int, _ value: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLocalVoiceReverb(reverbKey, value, PromiseCallback(resolve, reject))
    }

    @objc func enableSoundPositionIndication(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableSoundPositionIndication(enabled, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteVoicePosition(_ uid: Int, _ pan: Double, _ gain: Double, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteVoicePosition(uid, pan, gain, PromiseCallback(resolve, reject))
    }

    @objc func setLiveTranscoding(_ transcoding: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLiveTranscoding(transcoding, PromiseCallback(resolve, reject))
    }

    @objc func addPublishStreamUrl(_ url: String, _ transcodingEnabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        addPublishStreamUrl(url, transcodingEnabled, PromiseCallback(resolve, reject))
    }

    @objc func removePublishStreamUrl(_ url: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        removePublishStreamUrl(url, PromiseCallback(resolve, reject))
    }

    @objc func startChannelMediaRelay(_ channelMediaRelayConfiguration: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        startChannelMediaRelay(channelMediaRelayConfiguration, PromiseCallback(resolve, reject))
    }

    @objc func updateChannelMediaRelay(_ channelMediaRelayConfiguration: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        updateChannelMediaRelay(channelMediaRelayConfiguration, PromiseCallback(resolve, reject))
    }

    @objc func stopChannelMediaRelay(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopChannelMediaRelay(PromiseCallback(resolve, reject))
    }

    @objc func setDefaultAudioRoutetoSpeakerphone(_ defaultToSpeaker: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker, PromiseCallback(resolve, reject))
    }

    @objc func setEnableSpeakerphone(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setEnableSpeakerphone(enabled, PromiseCallback(resolve, reject))
    }

    @objc func isSpeakerphoneEnabled(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        isSpeakerphoneEnabled(PromiseCallback(resolve, reject))
    }

    @objc func enableInEarMonitoring(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableInEarMonitoring(enabled, PromiseCallback(resolve, reject))
    }

    @objc func setInEarMonitoringVolume(_ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setInEarMonitoringVolume(volume, PromiseCallback(resolve, reject))
    }

    @objc func enableDualStreamMode(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableDualStreamMode(enabled, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteVideoStreamType(_ uid: Int, _ streamType: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteVideoStreamType(uid, streamType, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteDefaultVideoStreamType(_ streamType: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteDefaultVideoStreamType(streamType, PromiseCallback(resolve, reject))
    }

    @objc func setLocalPublishFallbackOption(_ option: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLocalPublishFallbackOption(option, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteSubscribeFallbackOption(_ option: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteSubscribeFallbackOption(option, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteUserPriority(_ uid: Int, _ userPriority: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteUserPriority(uid, userPriority, PromiseCallback(resolve, reject))
    }

    @objc func startEchoTest(_ intervalInSeconds: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        startEchoTest(intervalInSeconds, PromiseCallback(resolve, reject))
    }

    @objc func stopEchoTest(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopEchoTest(PromiseCallback(resolve, reject))
    }

    @objc func enableLastmileTest(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        enableLastmileTest(PromiseCallback(resolve, reject))
    }

    @objc func disableLastmileTest(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        disableLastmileTest(PromiseCallback(resolve, reject))
    }

    @objc func startLastmileProbeTest(_ config: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        startLastmileProbeTest(config, PromiseCallback(resolve, reject))
    }

    @objc func stopLastmileProbeTest(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopLastmileProbeTest(PromiseCallback(resolve, reject))
    }

    @objc func registerMediaMetadataObserver(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        registerMediaMetadataObserver(PromiseCallback(resolve, reject))
    }

    @objc func unregisterMediaMetadataObserver(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        unregisterMediaMetadataObserver(PromiseCallback(resolve, reject))
    }

    @objc func setMaxMetadataSize(_ size: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setMaxMetadataSize(size, PromiseCallback(resolve, reject))
    }

    @objc func sendMetadata(_ metadata: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        sendMetadata(metadata, PromiseCallback(resolve, reject))
    }

    @objc func addVideoWatermark(_ watermarkUrl: String, _ options: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        addVideoWatermark(watermarkUrl, options, PromiseCallback(resolve, reject))
    }

    @objc func clearVideoWatermarks(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        clearVideoWatermarks(PromiseCallback(resolve, reject))
    }

    @objc func setEncryptionSecret(_ secret: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setEncryptionSecret(secret, PromiseCallback(resolve, reject))
    }

    @objc func setEncryptionMode(_ encryptionMode: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setEncryptionMode(encryptionMode, PromiseCallback(resolve, reject))
    }

    @objc func startAudioRecording(_ filePath: String, _ sampleRate: Int, _ quality: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        startAudioRecording(filePath, sampleRate, quality, PromiseCallback(resolve, reject))
    }

    @objc func stopAudioRecording(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopAudioRecording(PromiseCallback(resolve, reject))
    }

    @objc func addInjectStreamUrl(_ url: String, _ config: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        addInjectStreamUrl(url, config, PromiseCallback(resolve, reject))
    }

    @objc func removeInjectStreamUrl(_ url: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        removeInjectStreamUrl(url, PromiseCallback(resolve, reject))
    }

    @objc func switchCamera(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        switchCamera(PromiseCallback(resolve, reject))
    }

    @objc func isCameraZoomSupported(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        isCameraZoomSupported(PromiseCallback(resolve, reject))
    }

    @objc func isCameraTorchSupported(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        isCameraTorchSupported(PromiseCallback(resolve, reject))
    }

    @objc func isCameraFocusSupported(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {

    }

    @objc func isCameraExposurePositionSupported(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        isCameraExposurePositionSupported(PromiseCallback(resolve, reject))
    }

    @objc func isCameraAutoFocusFaceModeSupported(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        isCameraAutoFocusFaceModeSupported(PromiseCallback(resolve, reject))
    }

    @objc func setCameraZoomFactor(_ factor: Float, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setCameraZoomFactor(factor, PromiseCallback(resolve, reject))
    }

    @objc func getCameraMaxZoomFactor(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {

    }

    @objc func setCameraFocusPositionInPreview(_ positionX: Float, _ positionY: Float, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setCameraFocusPositionInPreview(positionX, positionY, PromiseCallback(resolve, reject))
    }

    @objc func setCameraExposurePosition(_ positionXinView: Float, _ positionYinView: Float, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setCameraExposurePosition(positionXinView, positionYinView, PromiseCallback(resolve, reject))
    }

    @objc func setCameraTorchOn(_ isOn: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setCameraTorchOn(isOn, PromiseCallback(resolve, reject))
    }

    @objc func setCameraAutoFocusFaceModeEnabled(_ enabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setCameraAutoFocusFaceModeEnabled(enabled, PromiseCallback(resolve, reject))
    }

    @objc func setCameraCapturerConfiguration(_ config: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setCameraCapturerConfiguration(config, PromiseCallback(resolve, reject))
    }

    @objc func createDataStream(_ reliable: Bool, _ ordered: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        createDataStream(reliable, ordered, PromiseCallback(resolve, reject))
    }

    @objc func sendStreamMessage(_ streamId: Int, _ message: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        sendStreamMessage(streamId, message, PromiseCallback(resolve, reject))
    }
}
