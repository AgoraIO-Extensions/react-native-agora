//
//  MyAgoraRtcEngineKit.h
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import <AgoraRtcEngineKit/AgoraRtcEngineKit.h>

static NSString *RCTAgoraErrorDomain = @"RCTAgoraErrorDomain";

static NSString *DidOccurWarning = @"DidOccurWarning";
static NSString *DidOccurError = @"DidOccurError";
static NSString *DidApiCallExecute = @"DidApiCallExecute";
static NSString *DidJoinChannel = @"DidJoinChannel";
static NSString *DidRejoinChannel = @"DidRejoinChannel";
static NSString *DidLeaveChannel = @"DidLeaveChannel";
static NSString *DidClientRoleChanged = @"DidClientRoleChanged";
static NSString *DidJoinedOfUid = @"DidJoinedOfUid";
static NSString *DidOfflineOfUid = @"DidOfflineOfUid";
static NSString *ConnectionChangedToState = @"ConnectionChangedToState";
static NSString *ConnectionDidLost = @"ConnectionDidLost";
static NSString *TokenPrivilegeWillExpire = @"T=okenPrivilegeWillExpire";
static NSString *RequestToken = @"RequestToken";

static NSString *DidMicrophoneEnabled = @"DidMicrophoneEnabled";
static NSString *ReportAudioVolumeIndicationOfSpeakers = @"ReportAudioVolumeIndicationOfSpeakers";
static NSString *ActiveSpeaker = @"ActiveSpeaker";
static NSString *FirstLocalAudioFrame = @"FirstLocalAudioFrame";
static NSString *FirstRemoteAudioFrameOfUid = @"FirstRemoteAudioFrameOfUid";
static NSString *VideoDidStop = @"VideoDidStop";
static NSString *FirstLocalVideoFrameWithSize = @"FirstLocalVideoFrameWithSize";
static NSString *FirstRemoteVideoDecodedOfUid = @"FirstRemoteVideoDecodedOfUid";
static NSString *FirstRemoteVideoFrameOfUid = @"FirstRemoteVideoFrameOfUid";
static NSString *DidAudioMuted = @"DidAudioMuted";
static NSString *DidVideoMuted = @"DidVideoMuted";
static NSString *DidVideoEnabled = @"DidVideoEnabled";
static NSString *DidLocalVideoEnabled = @"DidLocalVideoEnabled";
static NSString *VideoSizeChangedOfUid = @"VideoSizeChangedOfUid";
static NSString *RemoteVideoStateChangedOfUid = @"RemoteVideoStateChangedOfUid";
static NSString *DidLocalPublishFallbackToAudioOnly = @"DidLocalPublishFallbackToAudioOnly";
static NSString *DidRemoteSubscribeFallbackToAudioOnly = @"DidRemoteSubscribeFallbackToAudioOnly";

static NSString *DeviceTypeStateChanged = @"DeviceTypeStateChanged";
static NSString *DidAudioRouteChanged = @"DidAudioRouteChanged";
static NSString *CameraDidReady = @"CameraDidReady";
static NSString *CameraFocusDidChangedToRect = @"CameraFocusDidChangedToRect";
static NSString *CameraExposureDidChangedToRect = @"CameraExposureDidChangedToRect";

static NSString *ReportRtcStats = @"ReportRtcStats";
static NSString *LastmileQuality = @"LastmileQuality";
static NSString *NetworkQuality = @"NetworkQuality";
static NSString *LocalVideoStats = @"LocalVideoStats";
static NSString *RemoteVideoStats = @"RemoteVideoStats";
static NSString *RemoteAudioStats = @"RemoteAudioStats";
static NSString *AudioTransportStatsOfUid = @"AudioTransportStatsOfUid";
static NSString *VideoTransportStatsOfUid = @"VideoTransportStatsOfUid";

static NSString *LocalAudioMixingDidFinish = @"LocalAudioMixingDidFinish";
static NSString *RemoteAudioMixingDidStart = @"RemoteAudioMixingDidStart";
static NSString *RemoteAudioMixingDidFinish = @"RemoteAudioMixingDidFinish";
static NSString *DidAudioEffectFinish = @"DidAudioEffectFinish";

static NSString *StreamPublished = @"StreamPublished";
static NSString *StreamUnpublish = @"StreamUnpublish";
static NSString *TranscodingUpdated = @"TranscodingUpdated";

static NSString *StreamInjectedStatus = @"StreamInjectedStatus";

static NSString *ReceiveStreamMessage = @"ReceiveStreamMessage";
static NSString *DidOccurStreamMessageError = @"DidOccurStreamMessageError";

static NSString *MediaEngineDidLoaded = @"MediaEngineDidLoaded";
static NSString *MediaEngineDidStartCall = @"MediaEngineDidStartCall";

static NSString *ConnectionDidInterrupted = @"ConnectionDidInterrupted";
static NSString *ConnectionDidBanned = @"ConnectionDidBanned";
static NSString *AudioQualityOfUid = @"AudioQualityOfUid";

@interface AgoraConst : NSObject

@property (nonatomic, copy) NSString *appid;

@property (nonatomic, assign) NSInteger localUid;

@property (strong, nonatomic) AgoraRtcEngineKit *rtcEngine;

+ (instancetype)share;

@end
