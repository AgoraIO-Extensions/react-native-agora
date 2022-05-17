//
//  File.swift
//  AgoraExample
//

import Foundation
import react_native_agora

@objc
class Plugin: NSObject, RtcEnginePlugin {
  @objc
  func onRtcEngineCreated(_ rtcEngine: AgoraRtcEngineKit?) {
    let config = AgoraVideoEncoderConfiguration()
    config.frameRate = 2
    rtcEngine?.setVideoEncoderConfiguration(config)
  }
  
  @objc
  func onRtcEngineDestroyed() {
    
  }
  
  @objc
  static func register(plugin: RtcEnginePlugin) {
    RtcEnginePluginRegistrant.register(plugin)
  }
  
  @objc
  static func unregister(plugin: RtcEnginePlugin) {
    RtcEnginePluginRegistrant.unregister(plugin)
  }
}
