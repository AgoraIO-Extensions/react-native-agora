//
//  AgoraViewManager.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "RCTAgoraViewManager.h"
#import "RCTAgoraVideoView.h"

@implementation RCTAgoraViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(localUid, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(remoteUid, NSInteger)

- (UIView *)view {

    return [RCTAgoraVideoView new];
}


@end
