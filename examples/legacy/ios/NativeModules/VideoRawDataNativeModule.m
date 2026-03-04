//
//  VideoRawDataNativeModule.m
//  AgoraRtcNgExample
//
//  Created by guoxianzhe on 2024/6/13.
//

#import <Foundation/Foundation.h>
#import "VideoRawDataNativeModule.h"
#import <React/RCTLog.h>

@implementation VideoRawDataNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(initialize:(NSString *)appId) {
  RCTLogInfo(@"[initialize] Initializing Agora RtcEngine with App ID: %@", appId);

  self.appId = appId;

  self.rtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:appId delegate:self];

  RCTLogInfo(@"[initialize] Agora RtcEngine created successfully.");

  [self.rtcEngine enableVideo];

  [self.rtcEngine setVideoFrameDelegate:self];

  return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(releaseModule) {
  if (self.rtcEngine) {
    [self.rtcEngine setVideoFrameDelegate:nil];
    [AgoraRtcEngineKit destroy];
    self.rtcEngine = nil;
  }

  return nil;
}

- (BOOL)onCaptureVideoFrame:(AgoraOutputVideoFrame *)videoFrame sourceType:(AgoraVideoSourceType)sourceType {
  memset(videoFrame.uBuffer, 128, (videoFrame.uStride * videoFrame.height) / 2);
  memset(videoFrame.vBuffer, 128, (videoFrame.vStride * videoFrame.height) / 2);
  return YES;
}

- (AgoraVideoFormat)getVideoFormatPreference {
  return AgoraVideoFormatI420;
}

- (AgoraVideoFrameProcessMode)getVideoFrameProcessMode {
  return AgoraVideoFrameProcessModeReadWrite;
}

@end
