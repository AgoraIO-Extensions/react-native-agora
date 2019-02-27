//
//  MyAgoraRtcEngineKit.h
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import <AgoraRtcEngineKit/AgoraRtcEngineKit.h>

static NSString *RCTAgoraErrorDomain = @"RCTAgoraErrorDomain";

static NSString *DidOccurWarning = @"warning";
static NSString *DidOccurError = @"error";
static NSString *DidApiCallExecute = @"apiCallExecute";
static NSString *DidJoinChannel = @"joinChannelSuccess";
static NSString *DidRejoinChannel = @"rejoinChannelSuccess";
static NSString *DidLeaveChannel = @"leaveChannel";
static NSString *DidClientRoleChanged = @"clientRoleChanged";
static NSString *DidJoinedOfUid = @"userJoined";
static NSString *DidOfflineOfUid = @"userOffline";
static NSString *ConnectionChangedToState = @"connectionStateChanged";
static NSString *ConnectionDidLost = @"connectionLost";
static NSString *TokenPrivilegeWillExpire = @"tokenPrivilegeWillExpire";
static NSString *RequestToken = @"requestToken";

static NSString *DidMicrophoneEnabled = @"microphoneEnabled";
static NSString *ReportAudioVolumeIndicationOfSpeakers = @"audioVolumeIndication";
static NSString *ActiveSpeaker = @"activeSpeaker";
static NSString *FirstLocalAudioFrame = @"firstLocalAudioFrame";
static NSString *FirstRemoteAudioFrameOfUid = @"firstRemoteAudioFrame";
static NSString *VideoDidStop = @"videoStopped";
static NSString *FirstLocalVideoFrameWithSize = @"firstLocalVideoFrame";
static NSString *FirstRemoteVideoDecodedOfUid = @"firstRemoteVideoDecoded";
static NSString *FirstRemoteVideoFrameOfUid = @"firstRemoteVideoFrame";
static NSString *DidAudioMuted = @"userMuteAudio";
static NSString *DidVideoMuted = @"userMuteVideo";
static NSString *DidVideoEnabled = @"userEnableVideo";
static NSString *DidLocalVideoEnabled = @"userEnableLocalVideo";
static NSString *VideoSizeChangedOfUid = @"videoSizeChanged";
static NSString *RemoteVideoStateChangedOfUid = @"remoteVideoStateChanged";
static NSString *DidLocalPublishFallbackToAudioOnly = @"localPublishFallbackToAudioOnly";
static NSString *DidRemoteSubscribeFallbackToAudioOnly = @"remoteSubscribeFallbackToAudioOnly";

static NSString *DeviceTypeStateChanged = @"deviceTypeStateChanged";
static NSString *DidAudioRouteChanged = @"audioRouteChanged";
static NSString *CameraDidReady = @"cameraReady";
static NSString *CameraFocusDidChangedToRect = @"cameraFocusAreaChanged";
static NSString *CameraExposureDidChangedToRect = @"cameraExposureAreaChanged";

static NSString *ReportRtcStats = @"rtcStats";
static NSString *LastmileQuality = @"lastmileQuality";
static NSString *NetworkQuality = @"networkQuality";
static NSString *LocalVideoStats = @"localVideoStats";
static NSString *RemoteVideoStats = @"remoteVideoStats";
static NSString *RemoteAudioStats = @"remoteAudioStats";
static NSString *AudioTransportStatsOfUid = @"AudioTransportStatsOfUid";
static NSString *VideoTransportStatsOfUid = @"VideoTransportStatsOfUid";

static NSString *LocalAudioMixingDidFinish = @"localAudioMixingFinish";
static NSString *RemoteAudioMixingDidStart = @"remoteAudioMixingStart";
static NSString *RemoteAudioMixingDidFinish = @"remoteAudioMixingFinish";
static NSString *DidAudioEffectFinish = @"audioEffectFinish";

static NSString *StreamPublished = @"streamPublished";
static NSString *StreamUnpublish = @"streamUnpublish";
static NSString *TranscodingUpdated = @"transcodingUpdate";

static NSString *StreamInjectedStatus = @"streamInjectedStatus";

static NSString *ReceiveStreamMessage = @"receiveStreamMessage";
static NSString *DidOccurStreamMessageError = @"occurStreamMessageError";

static NSString *MediaEngineDidLoaded = @"mediaEngineLoaded";
static NSString *MediaEngineDidStartCall = @"mediaEngineStartCall";

static NSString *ConnectionDidInterrupted = @"connectionInterrupted";
static NSString *ConnectionDidBanned = @"connectionBanned";
static NSString *AudioQualityOfUid = @"audioQuality";

@interface AgoraConst : NSObject

@property (nonatomic, copy) NSString *appid;

@property (nonatomic, assign) NSInteger localUid;

@property (strong, nonatomic) AgoraRtcEngineKit *rtcEngine;

+ (instancetype)share;

@end
