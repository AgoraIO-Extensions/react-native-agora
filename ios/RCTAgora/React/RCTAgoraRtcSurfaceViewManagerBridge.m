//
//  RCTAgoraRtcSurfaceViewManagerBridge.m
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(RCTAgoraRtcSurfaceViewManager, NSObject)

RCT_EXPORT_VIEW_PROPERTY(data, NSDictionary)

RCT_EXPORT_VIEW_PROPERTY(renderMode, NSNumber)

RCT_EXPORT_VIEW_PROPERTY(mirrorMode, NSNumber)

@end
