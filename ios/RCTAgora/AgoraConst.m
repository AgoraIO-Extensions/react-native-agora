//
//  MyAgoraRtcEngineKit.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "AgoraConst.h"

@implementation AgoraConst

static AgoraConst *_person;
+ (instancetype)allocWithZone:(struct _NSZone *)zone{
  static dispatch_once_t predicate;
  dispatch_once(&predicate, ^{
    _person = [super allocWithZone:zone];
  });
  return _person;
}

+ (instancetype)share {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _person = [[self alloc]init];
  });
  return _person;
}

+ (NSArray<NSString*>*) supportEvents {
    NSArray<NSString*>* array = @[AGWarning,
                                  AGError,
                                  AGApiCallExecute,
                                  AGJoinChannelSuccess,
                                  AGRejoinChannelSuccess,
                                  AGLeaveChannel,
                                  AGClientRoleChanged,
                                  AGLocalUserRegistered,
                                  AGUserInfoUpdated,
                                  AGUserJoined,
                                  AGUserOffline,
                                  AGConnectionStateChanged,
                                  AGConnectionLost,
                                  AGTokenPrivilegeWillExpire,
                                  AGRequestToken,
                                  
                                  AGLocalAudioStateChanged,
                                  AGRemoteAudioStateChanged,
                                  AGLocalAudioStats,
                                  AGAudioVolumeIndication,
                                  AGActiveSpeaker,
                                  AGFirstLocalAudioFrame,
                                  AGFirstRemoteAudioFrame,
                                  AGFirstRemoteAudioDecoded,
                                  AGFirstLocalVideoFrame,
                                  AGFirstRemoteVideoFrame,
                                  AGUserMuteAudio,
                                  AGVideoSizeChanged,
                                  AGRemoteVideoStateChanged,
                                  AGLocalPublishFallbackToAudioOnly,
                                  AGRemoteSubscribeFallbackToAudioOnly,
                                  
                                  AGAudioRouteChanged,
                                  AGCameraFocusAreaChanged,
                                  AGCameraExposureAreaChanged,
                                  
                                  AGRtcStats,
                                  AGLastmileQuality,
                                  AGNetworkQuality,
                                  AGLocalVideoStats,
                                  AGRemoteVideoStats,
                                  AGRemoteAudioStats,
                                  
                                  AGAudioMixingStateChanged,
                                  AGRemoteAudioMixingStart,
                                  AGRemoteAudioMixingFinish,
                                  AGAudioEffectFinish,
                                  
                                  AGStreamPublished,
                                  AGStreamUnpublish,
                                  AGTranscodingUpdate,
                                  
                                  AGStreamInjectedStatus,
                                  
                                  AGReceiveStreamMessage,
                                  AGOccurStreamMessageError,
                                  
                                  AGMediaEngineLoaded,
                                  AGMediaEngineStartCall,
                                  AGIntervalTest,
                                  AGLastmileProbeTestResult,
                                  AGRtmpStreamingStateChanged,
                                  AGLocalVideoChanged,
                                  AGNetworkTypeChanged,
                                  AGFirstRemoteAudioFrame,
                                  AGMediaMetaDataReceived];
  
  NSMutableArray<NSString *> *eventList = [NSMutableArray arrayWithCapacity:[array count]];
  [array enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    id mapObj = [NSString stringWithFormat:@"%@%@", AG_PREFIX, obj];
    [eventList addObject:mapObj];
  }];
  return eventList;
}

- (id)copyWithZone:(NSZone *)zone {
  return _person;
}

@end
