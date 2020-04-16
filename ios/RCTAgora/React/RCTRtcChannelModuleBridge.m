//
//  RCTRtcChannelModuleBridge.m
//  RCTAgora
//
//  Created by LXH on 2020/4/15.
//  Copyright (c) 2020 Syan. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RCTRtcChannelModule, NSObject)

RCT_EXTERN_METHOD(create:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(destroy:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setClientRole:
    (NSString *) channelId :(int) role :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(joinChannel:
    (NSString *) channelId :(NSString *) token :(NSString *) optionalInfo :(int) optionalUid :(NSDictionary *) options :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(joinChannelWithUserAccount:
    (NSString *) channelId :(NSString *) token :(NSString *) userAccount :(NSDictionary *) options :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(leaveChannel:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(renewToken:
    (NSString *) channelId :(NSString *) token :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getConnectionState:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(publish:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(unpublish:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getCallId:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustUserPlaybackSignalVolume:
    (NSString *) channelId :(int) uid :(int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteRemoteAudioStream:
    (NSString *) channelId :(int) uid :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteAllRemoteAudioStreams:
    (NSString *) channelId :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultMuteAllRemoteAudioStreams:
    (NSString *) channelId :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteRemoteVideoStream:
    (NSString *) channelId :(int) uid :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteAllRemoteVideoStreams:
    (NSString *) channelId :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultMuteAllRemoteVideoStreams:
    (NSString *) channelId :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteVoicePosition:
    (NSString *) channelId :(int) uid :(double) pan :(double) gain :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLiveTranscoding:
    (NSString *) channelId :(NSDictionary *) transcoding :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(addPublishStreamUrl:
    (NSString *) channelId :(NSString *) url :(BOOL) transcodingEnabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(removePublishStreamUrl:
    (NSString *) channelId :(NSString *) url :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startChannelMediaRelay:
    (NSString *) channelId :(NSDictionary *) channelMediaRelayConfiguration :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(updateChannelMediaRelay:
    (NSString *) channelId :(NSDictionary *) channelMediaRelayConfiguration :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopChannelMediaRelay:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteVideoStreamType:
    (NSString *) channelId :(int) uid :(int) streamType :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteDefaultVideoStreamType:
    (NSString *) channelId :(int) streamType :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteUserPriority:
    (NSString *) channelId :(int) uid :(int) userPriority :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(registerMediaMetadataObserver:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(unregisterMediaMetadataObserver:
    (NSString *) channelId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setMaxMetadataSize:
    (NSString *) channelId :(int) size :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(sendMetadata:
    (NSString *) channelId :(NSString *) metadata :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEncryptionSecret:
    (NSString *) channelId :(NSString *) secret :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEncryptionMode:
    (NSString *) channelId :(NSString *) encryptionMode :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(addInjectStreamUrl:
    (NSString *) channelId :(NSString *) url :(NSDictionary *) config :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(removeInjectStreamUrl:
    (NSString *) channelId :(NSString *) url :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(createDataStream:
    (NSString *) channelId :(BOOL) reliable :(BOOL) ordered :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(sendStreamMessage:
    (NSString *) channelId :(int) streamId :(NSString *) message :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

@end
