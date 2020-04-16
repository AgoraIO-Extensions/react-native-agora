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
        view.setEngine(getEngine: engine)
        return view
    }

    override class func requiresMainQueueSetup() -> Bool {
        true
    }

    override var methodQueue: DispatchQueue! {
        DispatchQueue.main
    }

    private func engine() -> AgoraRtcEngineKit? {
        (bridge.module(for: RCTRtcEngineModule.classForCoder()) as? RCTRtcEngineModule)?.engine
    }
}

@objc(RtcView)
class RtcView: RtcSurfaceView {
    private var getEngine: (() -> AgoraRtcEngineKit?)?

    func setEngine(getEngine: @escaping () -> AgoraRtcEngineKit?) {
        self.getEngine = getEngine
    }

    @objc func setRenderMode(_ renderMode: Int) {
        if let engine = getEngine?() {
            setRenderMode(engine, renderMode)
        }
    }

    @objc func setChannelId(_ channelId: String) {
        if let engine = getEngine?() {
            setChannelId(engine, channelId)
        }
    }

    @objc func setMirroMode(_ mirrorMode: Int) {
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
