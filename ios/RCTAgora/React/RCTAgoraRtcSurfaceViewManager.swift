//
//  RCTAgoraRtcSurfaceViewManager.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

@objc(RCTAgoraRtcSurfaceViewManager)
class RCTAgoraRtcSurfaceViewManager: RCTViewManager {
    override func view() -> UIView! {
        let view = RtcView()
        view.setEngine(engine)
        view.setChannel(channel(_:))
        return view
    }

    override class func requiresMainQueueSetup() -> Bool {
        return true
    }

    override var methodQueue: DispatchQueue! {
        return DispatchQueue.main
    }

    private func engine() -> AgoraRtcEngineKit? {
        return (bridge.module(for: RCTAgoraRtcEngineModule.classForCoder()) as? RCTAgoraRtcEngineModule)?.engine
    }

    private func channel(_ channelId: String) -> AgoraRtcChannel? {
        return (bridge.module(for: RCTAgoraRtcChannelModule.classForCoder()) as? RCTAgoraRtcChannelModule)?.channel(channelId)
    }
}

@objc(RtcView)
class RtcView: RtcSurfaceView {
    private var getEngine: (() -> AgoraRtcEngineKit?)?
    private var getChannel: ((_ channelId: String) -> AgoraRtcChannel?)?

    func setEngine(_ getEngine: @escaping () -> AgoraRtcEngineKit?) {
        self.getEngine = getEngine
    }

    func setChannel(_ getChannel: @escaping (_ channelId: String) -> AgoraRtcChannel?) {
        self.getChannel = getChannel
    }

    override func observerForKeyPath() -> String {
        return "bounds"
    }

    @objc func setRenderMode(_ renderMode: NSNumber) {
        if let engine = getEngine?() {
            setRenderMode(engine, renderMode.uintValue)
        }
    }

    @objc func setData(_ data: NSDictionary) {
        var channel: AgoraRtcChannel? = nil
        if let channelId = data["channelId"] as? String {
            channel = getChannel?(channelId)
        }
        if let engine = getEngine?() {
            setData(engine, channel, (data["uid"] as! NSNumber).uintValue)
        }
    }

    @objc func setMirrorMode(_ mirrorMode: NSNumber) {
        if let engine = getEngine?() {
            setMirrorMode(engine, mirrorMode.uintValue)
        }
    }
}
