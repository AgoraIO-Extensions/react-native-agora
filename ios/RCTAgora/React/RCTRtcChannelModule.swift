//
//  RCTRtcChannelModule.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

@objc(RCTRtcChannelModule)
class RCTRtcChannelModule: RCTEventEmitter, RtcChannelInterface {
    static let REACT_CLASS = "RCTRtcChannelModule"

    typealias Map = NSDictionary
    typealias Callback = PromiseCallback

    private lazy var manager: RtcChannelManager = {
        RtcChannelManager()
    }()
    private lazy var delegate: RtcChannelEventHandler = {
        RtcChannelEventHandler() { [weak self] (methodName, data) in
            self?.emit(methodName, data)
        }
    }()

    override class func moduleName() -> String! {
        RCTRtcChannelModule.REACT_CLASS
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        ["prefix": RtcChannelEventHandler.PREFIX]
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
        RtcChannelEventHandler.EVENTS.forEach { key, value in
            events.append("\(RtcChannelEventHandler.PREFIX)\(value)")
        }
        return events
    }

    private func emit(_ methodName: String, _ data: Dictionary<String, Any?>?) {
        sendEvent(withName: methodName, body: data)
    }

    private func engine() -> AgoraRtcEngineKit? {
        (bridge.module(for: RCTRtcEngineModule.classForCoder()) as? RCTRtcEngineModule)?.engine
    }

    func create(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.resolve(engine()) { (engine: AgoraRtcEngineKit) in
            manager.create(engine, channelId) { [weak self] (methodName, data) in
                self?.emit(methodName, data)
            }
        }
    }

    func destroy(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager.destroy(channelId))
    }

    func setClientRole(_ channelId: String, _ role: Int, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setClientRole(AgoraClientRole(rawValue: role)!))
    }

    func joinChannel(_ channelId: String, _ token: String?, _ optionalInfo: String?, _ optionalUid: Int, _ options: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.join(byToken: token, info: optionalInfo, uid: UInt(optionalUid), options: mapToChannelMediaOptions(map: options as! Dictionary<String, Any>)))
    }

    func joinChannelWithUserAccount(_ channelId: String, _ token: String?, _ userAccount: String, _ options: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.join(byUserAccount: userAccount, token: token, options: mapToChannelMediaOptions(map: options as! Dictionary<String, Any>)))
    }

    func leaveChannel(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.leave())
    }

    func renewToken(_ channelId: String, _ token: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.renewToken(token))
    }

    func getConnectionState(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.resolve(manager[channelId]) { (channel: AgoraRtcChannel) in
            channel.getConnectionState()
        }
    }

    func publish(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.publish())
    }

    func unpublish(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.unpublish())
    }

    func getCallId(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.resolve(manager[channelId]) { (channel: AgoraRtcChannel) in
            channel.getCallId()
        }
    }

    func adjustUserPlaybackSignalVolume(_ channelId: String, _ uid: Int, _ volume: Int, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.adjustUserPlaybackSignalVolume(UInt(uid), volume: Int32(volume)))
    }

    func muteRemoteAudioStream(_ channelId: String, _ uid: Int, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.muteRemoteAudioStream(UInt(uid), mute: muted))
    }

    func muteAllRemoteAudioStreams(_ channelId: String, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.muteAllRemoteAudioStreams(muted))
    }

    func setDefaultMuteAllRemoteAudioStreams(_ channelId: String, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setDefaultMuteAllRemoteAudioStreams(muted))
    }

    func muteRemoteVideoStream(_ channelId: String, _ uid: Int, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.muteRemoteVideoStream(UInt(uid), mute: muted))
    }

    func muteAllRemoteVideoStreams(_ channelId: String, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.muteAllRemoteVideoStreams(muted))
    }

    func setDefaultMuteAllRemoteVideoStreams(_ channelId: String, _ muted: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setDefaultMuteAllRemoteVideoStreams(muted))
    }

    func setRemoteVoicePosition(_ channelId: String, _ uid: Int, _ pan: Double, _ gain: Double, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setRemoteVoicePosition(UInt(uid), pan: pan, gain: gain))
    }

    func setLiveTranscoding(_ channelId: String, _ transcoding: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setLiveTranscoding(mapToLiveTranscoding(map: transcoding as! Dictionary<String, Any>)))
    }

    func addPublishStreamUrl(_ channelId: String, _ url: String, _ transcodingEnabled: Bool, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.addPublishStreamUrl(url, transcodingEnabled: transcodingEnabled))
    }

    func removePublishStreamUrl(_ channelId: String, _ url: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.removePublishStreamUrl(url))
    }

    func startChannelMediaRelay(_ channelId: String, _ channelMediaRelayConfiguration: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.startMediaRelay(mapToChannelMediaRelayConfiguration(map: channelMediaRelayConfiguration as! Dictionary<String, Any>)))
    }

    func updateChannelMediaRelay(_ channelId: String, _ channelMediaRelayConfiguration: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.updateMediaRelay(mapToChannelMediaRelayConfiguration(map: channelMediaRelayConfiguration as! Dictionary<String, Any>)))
    }

    func stopChannelMediaRelay(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.stopMediaRelay())
    }

    func setRemoteVideoStreamType(_ channelId: String, _ uid: Int, _ streamType: Int, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setRemoteVideoStream(UInt(uid), type: AgoraVideoStreamType(rawValue: streamType)!))
    }

    func setRemoteDefaultVideoStreamType(_ channelId: String, _ streamType: Int, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setRemoteDefaultVideoStreamType(AgoraVideoStreamType(rawValue: streamType)!))
    }

    func setRemoteUserPriority(_ channelId: String, _ uid: Int, _ userPriority: Int, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setRemoteUserPriority(UInt(uid), type: AgoraUserPriority(rawValue: userPriority)!))
    }

    func registerMediaMetadataObserver(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager.registerMediaMetadataObserver(channelId) { [weak self] (methodName, data) in
            self?.emit(methodName, data)
        })
    }

    func unregisterMediaMetadataObserver(_ channelId: String, _ callback: PromiseCallback?) {
        callback?.code(manager.unregisterMediaMetadataObserver(channelId))
    }

    func setMaxMetadataSize(_ channelId: String, _ size: Int, _ callback: PromiseCallback?) {
        callback?.code(manager.setMaxMetadataSize(channelId, size))
    }

    func sendMetadata(_ channelId: String, _ metadata: String, _ callback: PromiseCallback?) {
        callback?.code(manager.addMetadata(channelId, metadata))
    }

    func setEncryptionSecret(_ channelId: String, _ secret: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setEncryptionSecret(secret))
    }

    func setEncryptionMode(_ channelId: String, _ encryptionMode: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.setEncryptionMode(encryptionMode))
    }

    func addInjectStreamUrl(_ channelId: String, _ url: String, _ config: NSDictionary, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.addInjectStreamUrl(url, config: mapToLiveInjectStreamConfig(map: config as! Dictionary<String, Any>)))
    }

    func removeInjectStreamUrl(_ channelId: String, _ url: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.removeInjectStreamUrl(url))
    }

    func createDataStream(_ channelId: String, _ reliable: Bool, _ ordered: Bool, _ callback: PromiseCallback?) {
        var streamId = 0
        callback?.resolve(manager[channelId]) { (channel: AgoraRtcChannel) in
            channel.createDataStream(&streamId, reliable: reliable, ordered: ordered)
            return streamId
        }
    }

    func sendStreamMessage(_ channelId: String, _ streamId: Int, _ message: String, _ callback: PromiseCallback?) {
        callback?.code(manager[channelId]?.sendStreamMessage(streamId, data: message.data(using: .utf8)!))
    }
}

extension RCTRtcChannelModule {
    @objc func create(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        create(channelId, PromiseCallback(resolve, reject))
    }

    @objc func destroy(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        destroy(channelId, PromiseCallback(resolve, reject))
    }

    @objc func setClientRole(_ channelId: String, _ role: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setClientRole(channelId, role, PromiseCallback(resolve, reject))
    }

    @objc func joinChannel(_ channelId: String, _ token: String?, _ optionalInfo: String?, _ optionalUid: Int, _ options: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        joinChannel(channelId, token, optionalInfo, optionalUid, options, PromiseCallback(resolve, reject))
    }

    @objc func joinChannelWithUserAccount(_ channelId: String, _ token: String?, _ userAccount: String, _ options: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        joinChannelWithUserAccount(channelId, token, userAccount, options, PromiseCallback(resolve, reject))
    }

    @objc func leaveChannel(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        leaveChannel(channelId, PromiseCallback(resolve, reject))
    }

    @objc func renewToken(_ channelId: String, _ token: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        renewToken(channelId, token, PromiseCallback(resolve, reject))
    }

    @objc func getConnectionState(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getConnectionState(channelId, PromiseCallback(resolve, reject))
    }

    @objc func publish(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        publish(channelId, PromiseCallback(resolve, reject))
    }

    @objc func unpublish(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        unpublish(channelId, PromiseCallback(resolve, reject))
    }

    @objc func getCallId(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        getCallId(channelId, PromiseCallback(resolve, reject))
    }

    @objc func adjustUserPlaybackSignalVolume(_ channelId: String, _ uid: Int, _ volume: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        adjustUserPlaybackSignalVolume(channelId, uid, volume, PromiseCallback(resolve, reject))
    }

    @objc func muteRemoteAudioStream(_ channelId: String, _ uid: Int, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteRemoteAudioStream(channelId, uid, muted, PromiseCallback(resolve, reject))
    }

    @objc func muteAllRemoteAudioStreams(_ channelId: String, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultMuteAllRemoteAudioStreams(channelId, muted, PromiseCallback(resolve, reject))
    }

    @objc func setDefaultMuteAllRemoteAudioStreams(_ channelId: String, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultMuteAllRemoteAudioStreams(channelId, muted, PromiseCallback(resolve, reject))
    }

    @objc func muteRemoteVideoStream(_ channelId: String, _ uid: Int, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        muteRemoteVideoStream(channelId, uid, muted, PromiseCallback(resolve, reject))
    }

    @objc func muteAllRemoteVideoStreams(_ channelId: String, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultMuteAllRemoteVideoStreams(channelId, muted, PromiseCallback(resolve, reject))
    }

    @objc func setDefaultMuteAllRemoteVideoStreams(_ channelId: String, _ muted: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setDefaultMuteAllRemoteVideoStreams(channelId, muted, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteVoicePosition(_ channelId: String, _ uid: Int, _ pan: Double, _ gain: Double, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteVoicePosition(channelId, uid, pan, gain, PromiseCallback(resolve, reject))
    }

    @objc func setLiveTranscoding(_ channelId: String, _ transcoding: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setLiveTranscoding(channelId, transcoding, PromiseCallback(resolve, reject))
    }

    @objc func addPublishStreamUrl(_ channelId: String, _ url: String, _ transcodingEnabled: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        addPublishStreamUrl(channelId, url, transcodingEnabled, PromiseCallback(resolve, reject))
    }

    @objc func removePublishStreamUrl(_ channelId: String, _ url: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        removePublishStreamUrl(channelId, url, PromiseCallback(resolve, reject))
    }

    @objc func startChannelMediaRelay(_ channelId: String, _ channelMediaRelayConfiguration: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        startChannelMediaRelay(channelId, channelMediaRelayConfiguration, PromiseCallback(resolve, reject))
    }

    @objc func updateChannelMediaRelay(_ channelId: String, _ channelMediaRelayConfiguration: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        updateChannelMediaRelay(channelId, channelMediaRelayConfiguration, PromiseCallback(resolve, reject))
    }

    @objc func stopChannelMediaRelay(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        stopChannelMediaRelay(channelId, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteVideoStreamType(_ channelId: String, _ uid: Int, _ streamType: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteVideoStreamType(channelId, uid, streamType, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteDefaultVideoStreamType(_ channelId: String, _ streamType: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteDefaultVideoStreamType(channelId, streamType, PromiseCallback(resolve, reject))
    }

    @objc func setRemoteUserPriority(_ channelId: String, _ uid: Int, _ userPriority: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setRemoteUserPriority(channelId, uid, userPriority, PromiseCallback(resolve, reject))
    }

    @objc func registerMediaMetadataObserver(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        registerMediaMetadataObserver(channelId, PromiseCallback(resolve, reject))
    }

    @objc func unregisterMediaMetadataObserver(_ channelId: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        unregisterMediaMetadataObserver(channelId, PromiseCallback(resolve, reject))
    }

    @objc func setMaxMetadataSize(_ channelId: String, _ size: Int, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setMaxMetadataSize(channelId, size, PromiseCallback(resolve, reject))
    }

    @objc func sendMetadata(_ channelId: String, _ metadata: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        sendMetadata(channelId, metadata, PromiseCallback(resolve, reject))
    }

    @objc func setEncryptionSecret(_ channelId: String, _ secret: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setEncryptionSecret(channelId, secret, PromiseCallback(resolve, reject))
    }

    @objc func setEncryptionMode(_ channelId: String, _ encryptionMode: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        setEncryptionMode(channelId, encryptionMode, PromiseCallback(resolve, reject))
    }

    @objc func addInjectStreamUrl(_ channelId: String, _ url: String, _ config: NSDictionary, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        addInjectStreamUrl(channelId, url, config, PromiseCallback(resolve, reject))
    }

    @objc func removeInjectStreamUrl(_ channelId: String, _ url: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        removeInjectStreamUrl(channelId, url, PromiseCallback(resolve, reject))
    }

    @objc func createDataStream(_ channelId: String, _ reliable: Bool, _ ordered: Bool, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        createDataStream(channelId, reliable, ordered, PromiseCallback(resolve, reject))
    }

    @objc func sendStreamMessage(_ channelId: String, _ streamId: Int, _ message: String, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        sendStreamMessage(channelId, streamId, message, PromiseCallback(resolve, reject))
    }
}
