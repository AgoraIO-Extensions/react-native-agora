//
//  MyAgoraRtcEngineKit.h
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import <AgoraRtcEngineKit/AgoraRtcEngineKit.h>

static NSString *RCTAgoraErrorDomain = @"RCTAgoraErrorDomain";

static NSString *DidOccurWarning = @"onWarning";
static NSString *DidOccurError = @"onError";
static NSString *DidApiCallExecute = @"onApiCallExecute";
static NSString *DidJoinChannel = @"onJoinChannelSuccess";
static NSString *DidRejoinChannel = @"onRejoinChannelSuccess";
static NSString *DidLeaveChannel = @"onLeaveChannel";
static NSString *DidClientRoleChanged = @"onClientRoleChanged";
static NSString *DidJoinedOfUid = @"onUserJoined";
static NSString *DidOfflineOfUid = @"onUserOffline";
static NSString *ConnectionChangedToState = @"onConnectionStateChanged";
static NSString *ConnectionDidLost = @"onConnectionLost";
static NSString *TokenPrivilegeWillExpire = @"onTokenPrivilegeWillExpire";
static NSString *RequestToken = @"onRequestToken";

static NSString *DidMicrophoneEnabled = @"onMicrophoneEnabled";
static NSString *ReportAudioVolumeIndicationOfSpeakers = @"onAudioVolumeIndication";
static NSString *ActiveSpeaker = @"onActiveSpeaker";
static NSString *FirstLocalAudioFrame = @"onFirstLocalAudioFrame";
static NSString *FirstRemoteAudioFrameOfUid = @"onFirstRemoteAudioFrame";
static NSString *VideoDidStop = @"onVideoStopped";
static NSString *FirstLocalVideoFrameWithSize = @"onFirstLocalVideoFrame";
static NSString *FirstRemoteVideoDecodedOfUid = @"onFirstRemoteVideoDecoded";
static NSString *FirstRemoteVideoFrameOfUid = @"onFirstRemoteVideoFrame";
static NSString *DidAudioMuted = @"onUserMuteAudio";
static NSString *DidVideoMuted = @"onUserMuteVideo";
static NSString *DidVideoEnabled = @"onUserEnableVideo";
static NSString *DidLocalVideoEnabled = @"onUserEnableLocalVideo";
static NSString *VideoSizeChangedOfUid = @"onVideoSizeChanged";
static NSString *RemoteVideoStateChangedOfUid = @"onRemoteVideoStateChanged";
static NSString *DidLocalPublishFallbackToAudioOnly = @"onLocalPublishFallbackToAudioOnly";
static NSString *DidRemoteSubscribeFallbackToAudioOnly = @"onRemoteSubscribeFallbackToAudioOnly";

static NSString *DeviceTypeStateChanged = @"DeviceTypeStateChanged";
static NSString *DidAudioRouteChanged = @"onAudioRouteChanged";
static NSString *CameraDidReady = @"onCameraReady";
static NSString *CameraFocusDidChangedToRect = @"onCameraFocusAreaChanged";
static NSString *CameraExposureDidChangedToRect = @"onCameraExposureAreaChanged";

static NSString *ReportRtcStats = @"onRtcStats";
static NSString *LastmileQuality = @"onLastmileQuality";
static NSString *NetworkQuality = @"onNetworkQuality";
static NSString *LocalVideoStats = @"onLocalVideoStats";
static NSString *RemoteVideoStats = @"onRemoteVideoStats";
static NSString *RemoteAudioStats = @"onRemoteAudioStats";
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
