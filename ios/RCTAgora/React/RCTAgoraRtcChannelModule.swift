//
//  RCTAgoraRtcChannelModule.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

@objc(RCTAgoraRtcChannelModule)
class RCTAgoraRtcChannelModule: RCTEventEmitter {
    static let REACT_CLASS = "RCTAgoraRtcChannelModule"

    private var hasListeners = false

    private lazy var manager: RtcChannelManager = {
        return RtcChannelManager { [weak self] methodName, data in
            self?.emit(methodName, data)
        }
    }()

    override class func moduleName() -> String! {
        return RCTAgoraRtcChannelModule.REACT_CLASS
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        return ["prefix": RtcChannelEventHandler.PREFIX]
    }

    deinit {
        manager.Release()
    }

    override class func requiresMainQueueSetup() -> Bool {
        return true
    }

    override var methodQueue: DispatchQueue! {
        return DispatchQueue.main
    }

    override func supportedEvents() -> [String]! {
        var events = [String]()
        RtcChannelEvents.toMap().forEach { key, value in
            events.append("\(RtcChannelEventHandler.PREFIX)\(value)")
        }
        return events
    }

    override func startObserving() {
        hasListeners = true
    }

    override func stopObserving() {
        hasListeners = false
    }

    private func emit(_ methodName: String, _ data: Dictionary<String, Any?>?) {
        if hasListeners {
            sendEvent(withName: "\(RtcChannelEventHandler.PREFIX)\(methodName)", body: data)
        }
    }

    private func engine() -> AgoraRtcEngineKit? {
        return (bridge.module(for: RCTAgoraRtcEngineModule.classForCoder()) as? RCTAgoraRtcEngineModule)?.engine
    }

    func channel(_ channelId: String) -> AgoraRtcChannel? {
        return manager[channelId]
    }

    @objc func callMethod(_ methodName: String, _ params: NSDictionary?, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        if let `params` = params {
            if methodName == "create" {
                params.setValue(engine(), forKey: "engine")
            }
            manager.perform(NSSelectorFromString(methodName + "::"), with: params, with: PromiseCallback(resolve, reject))
        } else {
            manager.perform(NSSelectorFromString(methodName + ":"), with: PromiseCallback(resolve, reject))
        }
    }
}
