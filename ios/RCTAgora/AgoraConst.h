//
//  MyAgoraRtcEngineKit.h
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import <AgoraRtcEngineKit/AgoraRtcEngineKit.h>

static NSString *AG_PREFIX = @"ag_rtc";

static NSString *RCTAgoraErrorDomain = @"RCTAgoraErrorDomain";

static NSString *AGWarning = @"warning";
static NSString *AGError = @"error";
static NSString *AGApiCallExecute = @"apiCallExecute";
static NSString *AGJoinChannelSuccess = @"joinChannelSuccess";
static NSString *AGRejoinChannelSuccess = @"rejoinChannelSuccess";
static NSString *AGLeaveChannel = @"leaveChannel";
static NSString *AGClientRoleChanged = @"clientRoleChanged";
static NSString *AGLocalUserRegistered = @"localUserRegistered";
static NSString *AGUserInfoUpdated = @"userInfoUpdated";
static NSString *AGUserJoined = @"userJoined";
static NSString *AGUserOffline = @"userOffline";
static NSString *AGConnectionStateChanged = @"connectionStateChanged";
static NSString *AGConnectionLost = @"connectionLost";
static NSString *AGTokenPrivilegeWillExpire = @"tokenPrivilegeWillExpire";
static NSString *AGRequestToken = @"requestToken";

static NSString *AGLocalAudioStateChanged = @"localAudioStateChanged";
static NSString *AGRemoteAudioStateChanged = @"remoteAudioStateChanged";
static NSString *AGLocalAudioStats = @"localAudioStats";
static NSString *AGAudioVolumeIndication = @"audioVolumeIndication";
static NSString *AGActiveSpeaker = @"activeSpeaker";
static NSString *AGFirstLocalAudioFrame = @"firstLocalAudioFrame";
static NSString *AGFirstRemoteAudioFrame = @"firstRemoteAudioFrame";
static NSString *AGFirstRemoteAudioDecoded = @"firstRemoteAudioDecoded";
static NSString *AGFirstLocalVideoFrame = @"firstLocalVideoFrame";
static NSString *AGFirstRemoteVideoFrame = @"firstRemoteVideoFrame";
static NSString *AGUserMuteAudio = @"userMuteAudio";
static NSString *AGVideoSizeChanged = @"videoSizeChanged";
static NSString *AGRemoteVideoStateChanged = @"remoteVideoStateChanged";
static NSString *AGLocalPublishFallbackToAudioOnly = @"localPublishFallbackToAudioOnly";
static NSString *AGRemoteSubscribeFallbackToAudioOnly = @"remoteSubscribeFallbackToAudioOnly";

static NSString *AGAudioRouteChanged = @"audioRouteChanged";
static NSString *AGCameraFocusAreaChanged = @"cameraFocusAreaChanged";
static NSString *AGCameraExposureAreaChanged = @"cameraExposureAreaChanged";

static NSString *AGRtcStats = @"rtcStats";
static NSString *AGLastmileQuality = @"lastmileQuality";
static NSString *AGNetworkQuality = @"networkQuality";
static NSString *AGLocalVideoStats = @"localVideoStats";
static NSString *AGRemoteVideoStats = @"remoteVideoStats";
static NSString *AGRemoteAudioStats = @"remoteAudioStats";

static NSString *AGRemoteAudioMixingStart = @"remoteAudioMixingStart";
static NSString *AGRemoteAudioMixingFinish = @"remoteAudioMixingFinish";
static NSString *AGAudioEffectFinish = @"audioEffectFinish";

static NSString *AGStreamPublished = @"streamPublished";
static NSString *AGStreamUnpublish = @"streamUnpublish";
static NSString *AGTranscodingUpdate = @"transcodingUpdate";

static NSString *AGStreamInjectedStatus = @"streamInjectedStatus";

static NSString *AGReceiveStreamMessage = @"receiveStreamMessage";
static NSString *AGOccurStreamMessageError = @"occurStreamMessageError";

static NSString *AGReceivedChannelMediaRelay = @"receivedChannelMediaRelay";
static NSString *AGMediaRelayStateChanged = @"mediaRelayStateChanged";

static NSString *AGMediaEngineLoaded = @"mediaEngineLoaded";
static NSString *AGMediaEngineStartCall = @"mediaEngineStartCall";

static NSString *AGIntervalTest = @"startEchoTestWithInterval";
static NSString *AGAudioMixingStateChanged = @"audioMixingStateChanged";
static NSString *AGLastmileProbeTestResult = @"lastmileProbeTestResult";

static NSString *AGRtmpStreamingStateChanged = @"rtmpStreamingStateChanged";
static NSString *AGLocalVideoChanged = @"localVideoChanged";
static NSString *AGNetworkTypeChanged = @"networkTypeChanged";
static NSString *AGMediaMetaDataReceived = @"mediaMetaDataReceived";

typedef NS_ENUM(NSInteger, AgoraModeType) {
  AgoraAudioMode,
  AgoraVideoMode
};

@interface AgoraConst : NSObject

@property (nonatomic, copy) NSString *appid;

@property (nonatomic, assign) NSInteger localUid;

@property (strong, nonatomic) AgoraRtcEngineKit *rtcEngine;

+ (instancetype)share;

+ (NSArray<NSString*> *) supportEvents;
@end
