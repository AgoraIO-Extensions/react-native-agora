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

RCT_EXPORT_MODULE(RCTAgoraVideoView)

RCT_CUSTOM_VIEW_PROPERTY(mode, NSInteger, RCTAgoraVideoView) {
  view.renderMode = [RCTConvert NSInteger:json];
}

RCT_CUSTOM_VIEW_PROPERTY(showLocalVideo, BOOL, RCTAgoraVideoView) {
  view.showLocalVideo = [RCTConvert BOOL:json];
}

RCT_CUSTOM_VIEW_PROPERTY(remoteUid, NSInteger, RCTAgoraVideoView) {
  if ([json isKindOfClass:[NSString class]]) {
    view.remoteUid = [[RCTConvert NSString:json] integerValue];
  } else {
    view.remoteUid = [RCTConvert NSInteger:json];
  }
}

- (UIView *)view {
  return [RCTAgoraVideoView new];
}


@end
