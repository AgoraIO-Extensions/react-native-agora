//
//  PromiseCallback.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/13.
//  Copyright (c) 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

@objc(PromiseCallback)
class PromiseCallback: NSObject, Callback {
    private var resolve: RCTPromiseResolveBlock?
    private var reject: RCTPromiseRejectBlock?

    init(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        self.resolve = resolve
        self.reject = reject
    }

    func success(_ data: Any?) {
        resolve?(data)
    }

    func failure(_ code: String, _ message: String) {
        reject?(code, message, nil)
    }
}
