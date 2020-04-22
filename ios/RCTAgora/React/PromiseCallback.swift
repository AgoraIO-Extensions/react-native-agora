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
    typealias T = Dictionary<String, Any?>

    private var resolve: RCTPromiseResolveBlock?
    private var reject: RCTPromiseRejectBlock?

    init(_ resolve: RCTPromiseResolveBlock?, _ reject: RCTPromiseRejectBlock?) {
        self.resolve = resolve
        self.reject = reject
    }

    func resolve<E>(_ e: E?, _ data: (_ e: E) throws -> Any?) {
        if let `e` = e {
            do {
                let res = try data(e)
                if res is Void {
                    resolve?(nil)
                } else {
                    resolve?(res)
                }
            } catch let err {
                reject?(nil, nil, err)
            }
        } else {
            let code = AgoraErrorCode.notInitialized.rawValue
            failure(String(code), AgoraRtcEngineKit.getErrorDescription(code) ?? "")
        }
    }

    func success(_ data: Dictionary<String, Any?>?) {
        resolve?(data)
    }

    func failure(_ code: String, _ message: String) {
        reject?(code, message, nil)
    }
}
