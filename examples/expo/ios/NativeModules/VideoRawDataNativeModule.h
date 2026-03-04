//
//  VideoRawDataNativeModule.h
//  AgoraRtcNgExample
//
//  Created by guoxianzhe on 2024/6/13.
//
#import <React/RCTBridgeModule.h>
#import <AgoraRtcKit/AgoraRtcEngineKit.h>

@interface VideoRawDataNativeModule : NSObject <RCTBridgeModule, AgoraVideoFrameDelegate>
@property (nonatomic, strong) AgoraRtcEngineKit *rtcEngine;
@property (nonatomic, strong) NSString *appId;
@end
