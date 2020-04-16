//
//  Callback.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/9.
//  Copyright © 2020 Syan. All rights reserved.
//

import Foundation
import AgoraRtcKit

protocol Callback: class {
    associatedtype T

    func success(_ data: Self.T?)

    func failure(_ code: String, _ message: String)
}

extension Callback {
    func code(_ code: Int32?, _ data: (() -> Self.T?)? = nil) {
        let newCode: Int = Int(code ?? Int32(AgoraErrorCode.notInitialized.rawValue))
        if newCode == 0 {
            success(data?())
        } else {
            failure(String(newCode), AgoraRtcEngineKit.getErrorDescription(abs(newCode)) ?? "")
        }
    }
}
