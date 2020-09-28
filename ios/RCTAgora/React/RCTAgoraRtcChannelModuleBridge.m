//
//  RCTAgoraRtcChannelModuleBridge.m
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RCTAgoraRtcChannelModule, NSObject)

RCT_EXTERN_METHOD(callMethod:
    (NSString *) methodName :(NSDictionary *) params :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

@end
