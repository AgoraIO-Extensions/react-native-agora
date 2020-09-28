//
//  RCTAgoraRtcEngineModuleBridge.m
//  RCTAgora
//
//  Created by LXH on 2020/4/14.
//  Copyright © 2020 Syan. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RCTAgoraRtcEngineModule, NSObject)

RCT_EXTERN_METHOD(callMethod:(NSString *) methodName :(NSDictionary *) params :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

@end
