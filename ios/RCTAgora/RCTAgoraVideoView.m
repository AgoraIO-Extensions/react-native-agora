//
//  RCTAgoraVideoView.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "RCTAgoraVideoView.h"
#import <React/RCTBridgeModule.h>

@implementation RCTAgoraVideoView

- (instancetype)init{
  
  if (self == [super init]) {
    _rtcEngine = [AgoraConst share].rtcEngine;
    _renderMode = AgoraVideoRenderModeHidden;
  }
  
  return self;
}

- (void)setRenderMode:(NSInteger)renderMode {
  _renderMode = renderMode;
}

- (void)setShowLocalVideo:(BOOL)showLocalVideo {
  _showLocalVideo = showLocalVideo;
  if (_showLocalVideo) {
    AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
    canvas.uid = [AgoraConst share].localUid;
    canvas.view = self;
    canvas.renderMode = _renderMode;
    [_rtcEngine setupLocalVideo:canvas];
  }
}

-(void)setRemoteUid:(NSUInteger)remoteUid {
  _remoteUid = remoteUid;
  if (_remoteUid != 0) {
    AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
    canvas.uid = _remoteUid;
    canvas.view = self;
    canvas.renderMode = _renderMode;
    [_rtcEngine setupRemoteVideo:canvas];
  }
}

-(void) didMoveToWindow {
  [super didMoveToWindow];
  if (self.window != nil) {
    if (_remoteUid > 0) {
      [_rtcEngine setRemoteRenderMode:_remoteUid mode:_renderMode];
    } else {
      [_rtcEngine setLocalRenderMode:_renderMode];
    }
  }
}

@end
