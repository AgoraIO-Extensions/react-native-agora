//
//  RCTAgoraRtcSurfaceViewManagerBridge.m
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

#import <React/RCTUIManager.h>

@interface RCT_EXTERN_MODULE(RCTAgoraRtcSurfaceViewManager, NSObject)

RCT_EXPORT_VIEW_PROPERTY(renderMode, int)

RCT_EXPORT_VIEW_PROPERTY(channelId, NSString)

RCT_EXPORT_VIEW_PROPERTY(mirrorMode, int)

RCT_EXPORT_VIEW_PROPERTY(uid, int)

@end
