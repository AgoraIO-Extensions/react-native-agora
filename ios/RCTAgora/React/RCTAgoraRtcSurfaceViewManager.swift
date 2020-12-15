//
//  RCTAgoraRtcSurfaceViewManager.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

fileprivate struct AssociatedKeys {
    static var view: UInt8 = 0
}

@objc(AgoraRtcVideoCanvas)
public extension AgoraRtcVideoCanvas {
    @objc weak var view: UIView? {
        get {
            return objc_getAssociatedObject(self, &AssociatedKeys.view) as? UIView
        }
        set {
            objc_setAssociatedObject(self, &AssociatedKeys.view, newValue, .OBJC_ASSOCIATION_ASSIGN)
        }
    }
}

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
    
    deinit {
        destroy()
        // if let engine = getEngine?() {
            // resetVideoCanvas(engine)
        // }
    }

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

    @objc func setData(_ data: NSDictionary) {
        var channel: AgoraRtcChannel? = nil
        if let channelId = data["channelId"] as? String {
            channel = getChannel?(channelId)
        }
        if let engine = getEngine?() {
            setData(engine, channel, data["uid"] as! Int)
        }
    }

    @objc func setMirrorMode(_ mirrorMode: Int) {
        if let engine = getEngine?() {
            setMirrorMode(engine, mirrorMode)
        }
    }
}
