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
        true
    }

    override var methodQueue: DispatchQueue! {
        DispatchQueue.main
    }

    private func engine() -> AgoraRtcEngineKit? {
        (bridge.module(for: RCTAgoraRtcEngineModule.classForCoder()) as? RCTAgoraRtcEngineModule)?.engine
    }

    private func channel(_ channelId: String) -> AgoraRtcChannel? {
        (bridge.module(for: RCTAgoraRtcChannelModule.classForCoder()) as? RCTAgoraRtcChannelModule)?.channel(channelId)
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

    @objc func setRenderMode(_ renderMode: Int) {
        if let engine = getEngine?() {
            setRenderMode(engine, renderMode)
        }
    }

    @objc func setChannelId(_ channelId: String) {
        if let engine = getEngine?(), let channel = getChannel?(channelId) {
            setChannel(engine, channel)
        }
    }

    @objc func setMirrorMode(_ mirrorMode: Int) {
        if let engine = getEngine?() {
            setMirroMode(engine, mirrorMode)
        }
    }

    @objc func setUid(_ uid: Int) {
        if let engine = getEngine?() {
            setUid(engine, uid)
        }
    }
}
