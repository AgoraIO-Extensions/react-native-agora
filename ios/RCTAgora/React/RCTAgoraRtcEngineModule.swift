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
class RCTAgoraRtcEngineModule: RCTEventEmitter {
    static let REACT_CLASS = "RCTAgoraRtcEngineModule"

    private var hasListeners = false

    private lazy var manager: RtcEngineManager = {
        return RtcEngineManager() { [weak self] methodName, data in
            self?.emit(methodName, data)
        }
    }()

    override class func moduleName() -> String! {
        return RCTAgoraRtcEngineModule.REACT_CLASS
    }

    override func constantsToExport() -> [AnyHashable: Any]! {
        return ["prefix": RtcEngineEventHandler.PREFIX]
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
        RtcEngineEvents.toMap().forEach { key, value in
            events.append("\(RtcEngineEventHandler.PREFIX)\(value)")
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
            sendEvent(withName: "\(RtcEngineEventHandler.PREFIX)\(methodName)", body: data)
        }
    }

    var engine: AgoraRtcEngineKit? {
        return manager.engine
    }

    @objc func callMethod(_ methodName: String, _ params: NSDictionary?, _ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        if let `params` = params {
            manager.perform(NSSelectorFromString(methodName + "::"), with: params, with: PromiseCallback(resolve, reject))
        } else {
            manager.perform(NSSelectorFromString(methodName + ":"), with: PromiseCallback(resolve, reject))
        }
    }
}
