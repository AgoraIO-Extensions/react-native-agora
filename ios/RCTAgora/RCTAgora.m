//
//  RCTAgora.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/13.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "RCTAgora.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTView.h>
#import "AgoraConst.h"

#define MAX_DATA_LENGTH 1024

@interface RCTAgora ()
@property (strong, nonatomic) AgoraRtcEngineKit *rtcEngine;
@property (strong, nonatomic) NSString *appId;
@property (strong, nonatomic) NSData *metadata;
@end

@implementation RCTAgora {
  RCTResponseSenderBlock _block;
  bool hasListeners;
}

+(BOOL)requiresMainQueueSetup {
  return YES;
}


- (NSInteger) metadataMaxSize {
  return MAX_DATA_LENGTH;
}

- (NSData *_Nullable)readyToSendMetadataAtTimestamp:(NSTimeInterval)timestamp
{
  if (nil == _metadata) {
    return nil;
  }
  NSData *toSend = [_metadata copy];
  if ([toSend length] > MAX_DATA_LENGTH) {
    return nil;
  }
  _metadata = nil;
  return toSend;
}

- (void)receiveMetadata:(NSData *_Nonnull)data fromUser:(NSInteger)uid atTimestamp:(NSTimeInterval)timestamp {
  NSString *dataStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  [self sendEvent:AGMediaMetaDataReceived params:@{
                                                   @"uid": @(uid),
                                                   @"data": dataStr,
                                                   @"ts": @(timestamp)
                                                   }];
}


RCT_EXPORT_MODULE();

- (UIColor *) UIColorFromRGB:(NSUInteger)rgbValue {
  return [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0];
}

- (AgoraImage *) makeAgoraImage:(NSDictionary *)options {
  AgoraImage *img = [AgoraImage new];
  img.url = [NSURL URLWithString:options[@"url"]];
  
  img.rect = CGRectMake((CGFloat)[options[@"x"] floatValue],
                        (CGFloat)[options[@"y"] floatValue],
                        (CGFloat)[options[@"width"] floatValue],
                        (CGFloat)[options[@"height"] floatValue]);
  return img;
}

- (NSDictionary *)constantsToExport {
  return @{
           @"FPS1": @(AgoraVideoFrameRateFps1),
           @"FPS7": @(AgoraVideoFrameRateFps7),
           @"FPS10": @(AgoraVideoFrameRateFps10),
           @"FPS15": @(AgoraVideoFrameRateFps15),
           @"FPS24": @(AgoraVideoFrameRateFps24),
           @"FPS30": @(AgoraVideoFrameRateFps30),
           @"FPS60": @(AgoraVideoFrameRateFps60),
           @"Adaptative": @(AgoraVideoOutputOrientationModeAdaptative),
           @"FixedLandscape": @(AgoraVideoOutputOrientationModeFixedLandscape),
           @"FixedPortrait": @(AgoraVideoOutputOrientationModeFixedPortrait),
           @"Host": @(AgoraClientRoleBroadcaster),
           @"Audience": @(AgoraClientRoleAudience),
           @"UserOfflineReasonQuit": @(AgoraUserOfflineReasonQuit),
           @"UserOfflineReasonDropped": @(AgoraUserOfflineReasonDropped),
           @"UserOfflineReasonBecomeAudience": @(AgoraUserOfflineReasonBecomeAudience),
           @"CodecTypeBaseLine": @(AgoraVideoCodecProfileTypeBaseLine),
           @"CodecTypeMain": @(AgoraVideoCodecProfileTypeMain),
           @"CodecTypeHigh": @(AgoraVideoCodecProfileTypeHigh),
           @"AudioSampleRateType32000": @(AgoraAudioSampleRateType32000),
           @"AudioSampleRateType44100": @(AgoraAudioSampleRateType44100),
           @"AudioSampleRateType48000": @(AgoraAudioSampleRateType48000),
           @"QualityLow": @(AgoraAudioRecordingQualityLow),
           @"QualityMedium": @(AgoraAudioRecordingQualityMedium),
           @"QualityHigh": @(AgoraAudioRecordingQualityHigh),
           @"Disconnected": @(AgoraConnectionStateDisconnected),
           @"Connecting": @(AgoraConnectionStateConnecting),
           @"Connected": @(AgoraConnectionStateConnected),
           @"Reconnecting": @(AgoraConnectionStateReconnecting),
           @"ConnectionFailed": @(AgoraConnectionStateFailed),
           @"ConnectionChangedConnecting": @(AgoraConnectionChangedConnecting),
           @"ConnectionChangedJoinSuccess": @(AgoraConnectionChangedJoinSuccess),
           @"ConnectionChangedInterrupted": @(AgoraConnectionChangedInterrupted),
           @"ConnectionChangedBannedByServer": @(AgoraConnectionChangedBannedByServer),
           @"ConnectionChangedJoinFailed": @(AgoraConnectionChangedJoinFailed),
           @"ConnectionChangedLeaveChannel": @(AgoraConnectionChangedLeaveChannel),
           @"AudioOutputRoutingDefault": @(AgoraAudioOutputRoutingDefault),
           @"AudioOutputRoutingHeadset": @(AgoraAudioOutputRoutingHeadset),
           @"AudioOutputRoutingEarpiece": @(AgoraAudioOutputRoutingEarpiece),
           @"AudioOutputRoutingHeadsetNoMic": @(AgoraAudioOutputRoutingHeadsetNoMic),
           @"AudioOutputRoutingSpeakerphone": @(AgoraAudioOutputRoutingSpeakerphone),
           @"AudioOutputRoutingLoudspeaker": @(AgoraAudioOutputRoutingLoudspeaker),
           @"AudioOutputRoutingHeadsetBluetooth": @(AgoraAudioOutputRoutingHeadsetBluetooth),
           @"NetworkQualityUnknown": @(AgoraNetworkQualityUnknown),
           @"NetworkQualityExcellent": @(AgoraNetworkQualityExcellent),
           @"NetworkQualityGood": @(AgoraNetworkQualityGood),
           @"NetworkQualityPoor": @(AgoraNetworkQualityPoor),
           @"NetworkQualityBad": @(AgoraNetworkQualityBad),
           @"NetworkQualityVBad": @(AgoraNetworkQualityVBad),
           @"NetworkQualityDown": @(AgoraNetworkQualityDown),
           @"ErrorCodeNoError": @(AgoraErrorCodeNoError),
           @"ErrorCodeFailed": @(AgoraErrorCodeFailed),
           @"ErrorCodeInvalidArgument": @(AgoraErrorCodeInvalidArgument),
           @"ErrorCodeTimedOut": @(AgoraErrorCodeTimedOut),
           @"ErrorCodeAlreadyInUse": @(AgoraErrorCodeAlreadyInUse),
           @"ErrorCodeAbort": @(AgoraErrorCodeAbort),
           @"ErrorCodeResourceLimited": @(AgoraErrorCodeResourceLimited),
           @"AudioProfileDefault": @(AgoraAudioProfileDefault),
           @"AudioProfileSpeechStandard": @(AgoraAudioProfileSpeechStandard),
           @"AudioProfileMusicStandard": @(AgoraAudioProfileMusicStandard),
           @"AudioProfileMusicStandardStereo": @(AgoraAudioProfileMusicStandardStereo),
           @"AudioProfileMusicHighQuality": @(AgoraAudioProfileMusicHighQuality),
           @"AudioProfileMusicHighQualityStereo": @(AgoraAudioProfileMusicHighQualityStereo),
           @"AudioScenarioDefault": @(AgoraAudioScenarioDefault),
           @"AudioScenarioChatRoomEntertainment": @(AgoraAudioScenarioChatRoomEntertainment),
           @"AudioScenarioEducation": @(AgoraAudioScenarioEducation),
           @"AudioScenarioGameStreaming": @(AgoraAudioScenarioGameStreaming),
           @"AudioScenarioShowRoom": @(AgoraAudioScenarioShowRoom),
           @"AudioScenarioChatRoomGaming": @(AgoraAudioScenarioChatRoomGaming),
           @"AudioEqualizationBand31": @(AgoraAudioEqualizationBand31),
           @"AudioEqualizationBand62": @(AgoraAudioEqualizationBand62),
           @"AudioEqualizationBand125": @(AgoraAudioEqualizationBand125),
           @"AudioEqualizationBand250": @(AgoraAudioEqualizationBand250),
           @"AudioEqualizationBand500": @(AgoraAudioEqualizationBand500),
           @"AudioEqualizationBand1K": @(AgoraAudioEqualizationBand1K),
           @"AudioEqualizationBand2K": @(AgoraAudioEqualizationBand2K),
           @"AudioEqualizationBand4K": @(AgoraAudioEqualizationBand4K),
           @"AudioEqualizationBand8K": @(AgoraAudioEqualizationBand8K),
           @"AudioEqualizationBand16K": @(AgoraAudioEqualizationBand16K),
           @"AudioRawFrameOperationModeReadOnly": @(AgoraAudioRawFrameOperationModeReadOnly),
           @"AudioRawFrameOperationModeWriteOnly": @(AgoraAudioRawFrameOperationModeWriteOnly),
           @"AudioRawFrameOperationModeReadWrite": @(AgoraAudioRawFrameOperationModeReadWrite),
           @"VideoStreamTypeHigh": @(AgoraVideoStreamTypeHigh),
           @"VideoStreamTypeLow": @(AgoraVideoStreamTypeLow),
           @"VideoMirrorModeAuto": @(AgoraVideoMirrorModeAuto),
           @"VideoMirrorModeEnabled": @(AgoraVideoMirrorModeEnabled),
           @"VideoMirrorModeDisabled": @(AgoraVideoMirrorModeDisabled),
           @"ChannelProfileCommunication": @(AgoraChannelProfileCommunication),
           @"ChannelProfileLiveBroadcasting": @(AgoraChannelProfileLiveBroadcasting),
           @"ChannelProfileGame": @(AgoraChannelProfileGame),
           @"AudioMode": @(AgoraAudioMode),
           @"VideoMode": @(AgoraVideoMode),
           };
}

// init
RCT_EXPORT_METHOD(init:(NSDictionary *)options) {
  [self startObserving];
  [AgoraConst share].appid = options[@"appid"];
  
  self.rtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:options[@"appid"] delegate:self];
  self.appId = options[@"appid"];
  
  [AgoraConst share].rtcEngine = self.rtcEngine;
  
  //channel mode
  [self.rtcEngine setChannelProfile:[options[@"channelProfile"] integerValue]];
  //enable dual stream
  if ([options objectForKey:@"dualStream"]) {
    [self.rtcEngine enableDualStreamMode:[options[@"dualStream"] boolValue]];
  }
  dispatch_sync(dispatch_get_main_queue(), ^{
    [self.rtcEngine enableVideo];
    [self.rtcEngine enableAudio];
  });
  if ([options objectForKey:@"mode"]) {
    switch([options[@"mode"] integerValue]) {
      case AgoraAudioMode: {
        [self.rtcEngine enableLocalAudio:true];
        [self.rtcEngine enableLocalVideo:false];
        break;
      }
      case AgoraVideoMode: {
        [self.rtcEngine enableLocalVideo:true];
        [self.rtcEngine enableLocalAudio:false];
        break;
      }
    }
  } else {
    [self.rtcEngine enableLocalVideo:true];
    [self.rtcEngine enableLocalAudio:true];
  }
  
  if ([options objectForKey:@"beauty"]) {
    AgoraBeautyOptions *beautyOption = [[AgoraBeautyOptions alloc] init];
    beautyOption.lighteningContrastLevel = [options[@"beauty"][@"lighteningContrastLevel"] integerValue];
    beautyOption.lighteningLevel = [options[@"beauty"][@"lighteningLevel"] floatValue];
    beautyOption.smoothnessLevel = [options[@"beauty"][@"smoothnessLevel"] floatValue];
    beautyOption.rednessLevel = [options[@"beauty"][@"rednessLevel"] floatValue];
    [self.rtcEngine setBeautyEffectOptions:true options:beautyOption];
  }
  if ([options objectForKey:@"voice"]) {
    NSInteger voiceValue = [options[@"voice"][@"value"] integerValue];
    NSString *voiceType = options[@"voice"][@"type"];
    if ([voiceType isEqualToString: @"changer"]) {
      [self.rtcEngine setLocalVoiceChanger:(AgoraAudioVoiceChanger)voiceValue];
    }
    if ([voiceType isEqualToString: @"reverbPreset"]) {
      [self.rtcEngine setLocalVoiceReverbPreset:(AgoraAudioReverbPreset)voiceValue];
    }
  }
  if (options[@"secret"] != nil) {
    [self.rtcEngine setEncryptionSecret:[options[@"secret"] stringValue]];
    if (options[@"secretMode"] != nil) {
      [self.rtcEngine setEncryptionMode:[options[@"secretMode"] stringValue]];
    }
  }
  
  AgoraVideoEncoderConfiguration *video_encoder_config = [[AgoraVideoEncoderConfiguration new] initWithWidth:[options[@"videoEncoderConfig"][@"width"] integerValue] height:[options[@"videoEncoderConfig"][@"height"] integerValue] frameRate:[options[@"videoEncoderConfig"][@"frameRate"] integerValue] bitrate:[options[@"videoEncoderConfig"][@"bitrate"] integerValue] orientationMode: (AgoraVideoOutputOrientationMode)[options[@"videoEncoderConfig"][@"orientationMode"] integerValue]];
  [self.rtcEngine setVideoEncoderConfiguration:video_encoder_config];
  [self.rtcEngine setClientRole:(AgoraClientRole)[options[@"clientRole"] integerValue]];
  [self.rtcEngine setAudioProfile:(AgoraAudioProfile)[options[@"audioProfile"] integerValue]
                         scenario:(AgoraAudioScenario)[options[@"audioScenario"] integerValue]];
  
  //Enable Agora Native SDK be Interoperable with Agora Web SDK
  [self.rtcEngine enableWebSdkInteroperability:YES];
}

// renew token
RCT_EXPORT_METHOD(renewToken
                  :(NSString *)token
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine renewToken:token];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable websdk interoperability
RCT_EXPORT_METHOD(enableWebSdkInteroperability: (BOOL)enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableWebSdkInteroperability:enabled];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// get agora connection state
RCT_EXPORT_METHOD(getConnectionState
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  resolve(@{@"state": @([self.rtcEngine getConnectionState])});
}

// set client role
RCT_EXPORT_METHOD(setClientRole:(NSInteger)role
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setClientRole:(AgoraClientRole)role];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// join channel
RCT_EXPORT_METHOD(joinChannel:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  [AgoraConst share].localUid = (NSUInteger)[options[@"uid"] integerValue];
  NSInteger res = [self.rtcEngine joinChannelByToken:options[@"token"] channelId:options[@"channelName"] info:options[@"info"] uid:[AgoraConst share].localUid joinSuccess:nil];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// switch channel
RCT_EXPORT_METHOD(switchChannel:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine switchChannelByToken:options[@"token"] channelId:options[@"channelName"] joinSuccess:nil];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// startChannelMediaRelay
RCT_EXPORT_METHOD(startChannelMediaRelay:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraChannelMediaRelayConfiguration *config = [[AgoraChannelMediaRelayConfiguration alloc] init];
  AgoraChannelMediaRelayInfo *src = [config sourceInfo];
  NSDictionary *srcOption = options[@"src"];
  if (srcOption != nil) {
    src.channelName = srcOption[@"channelName"];
    src.uid = [srcOption[@"uid"] integerValue];
    src.token = srcOption[@"token"];
  }
  NSArray *channels = options[@"channels"];
  for (NSDictionary *channel in channels) {
    AgoraChannelMediaRelayInfo *dst = [[AgoraChannelMediaRelayInfo alloc] init];
    dst.channelName = channel[@"channelName"];
    dst.uid = [channel[@"uid"] integerValue];
    dst.token = channel[@"token"];
    [config setDestinationInfo:dst forChannelName:dst.channelName];
  }
  NSInteger res = [self.rtcEngine startChannelMediaRelay:config];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// updateChannelMediaRelay
RCT_EXPORT_METHOD(updateChannelMediaRelay:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraChannelMediaRelayConfiguration *config = [[AgoraChannelMediaRelayConfiguration alloc] init];
  AgoraChannelMediaRelayInfo *src = [config sourceInfo];
  NSDictionary *srcOption = options[@"src"];
  if (srcOption != nil) {
    src.channelName = srcOption[@"channelName"];
    src.uid = [srcOption[@"uid"] integerValue];
    src.token = srcOption[@"token"];
  }
  NSArray *channels = options[@"channels"];
  for (NSDictionary *channel in channels) {
    AgoraChannelMediaRelayInfo *dst = [[AgoraChannelMediaRelayInfo alloc] init];
    dst.channelName = channel[@"channelName"];
    dst.uid = [channel[@"uid"] integerValue];
    dst.token = channel[@"token"];
    [config setDestinationInfo:dst forChannelName:dst.channelName];
  }
  NSInteger res = [self.rtcEngine updateChannelMediaRelay:config];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// removeChannelMediaRelay
RCT_EXPORT_METHOD(removeChannelMediaRelay:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraChannelMediaRelayConfiguration *config = [[AgoraChannelMediaRelayConfiguration alloc] init];
  AgoraChannelMediaRelayInfo *src = [config sourceInfo];
  NSDictionary *srcOption = options[@"src"];
  if (srcOption != nil) {
    src.channelName = srcOption[@"channelName"];
    src.uid = [srcOption[@"uid"] integerValue];
    src.token = srcOption[@"token"];
  }
  NSArray *channels = options[@"channels"];
  for (NSDictionary *channel in channels) {
    if (channel[@"channelName"] != nil) {
      [config removeDestinationInfoForChannelName:channel[@"channelName"]];
    }
  }
  NSInteger res = [self.rtcEngine updateChannelMediaRelay:config];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// stopChannelMediaRelay
RCT_EXPORT_METHOD(stopChannelMediaRelay:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopChannelMediaRelay];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// register user account
RCT_EXPORT_METHOD(registerLocalUserAccount:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine registerLocalUserAccount:options[@"userAccount"] appId:self.appId];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// join channel with user account
RCT_EXPORT_METHOD(joinChannelWithUserAccount:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSString *token = [options objectForKey:@"token"] != nil ? options[@"token"] : nil;
  NSInteger res = [self.rtcEngine joinChannelByUserAccount:options[@"userAccount"] token:token channelId:options[@"channelName"] joinSuccess:nil];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// get user info by uid
RCT_EXPORT_METHOD(getUserInfoByUid:(NSUInteger)uid
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraErrorCode code = 0;
  AgoraUserInfo *info = [self.rtcEngine getUserInfoByUid:uid withError:&code];
  if ((int)code == 0) {
    resolve(@{
              @"uid": @(info.uid),
              @"userAccount": info.userAccount
              });
  } else {
    reject(@(-1).stringValue, @((int)code).stringValue, nil);
  }
}

// get user info by user account
RCT_EXPORT_METHOD(getUserInfoByUserAccount:(NSString *)userAccount
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraErrorCode code = 0;
  AgoraUserInfo *info = [self.rtcEngine getUserInfoByUserAccount:userAccount withError:&code];
  if ((int)code == 0) {
    resolve(@{
              @"uid": @(info.uid),
              @"userAccount": info.userAccount
              });
  } else {
    reject(@(-1).stringValue, @((int)code).stringValue, nil);
  }
}

// leave channel
RCT_EXPORT_METHOD(leaveChannel
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine leaveChannel:^(AgoraChannelStats * _Nonnull stats) {
    [self sendEvent:AGLeaveChannel params:@{
                                            @"message": @"leaveChannel",
                                            @"duration": @(stats.duration),
                                            @"txBytes": @(stats.txBytes),
                                            @"rxBytes": @(stats.rxBytes),
                                            @"txAudioBytes": @(stats.txAudioBytes),
                                            @"txVideoBytes": @(stats.txVideoBytes),
                                            @"rxAudioBytes": @(stats.rxAudioBytes),
                                            @"rxVideoBytes": @(stats.rxVideoBytes),
                                            @"txPacketLossRate": @(stats.txPacketLossRate),
                                            @"rxPacketLossRate": @(stats.rxPacketLossRate),
                                            @"txAudioKBitrate": @(stats.txAudioKBitrate),
                                            @"rxAudioKBitrate": @(stats.rxAudioKBitrate),
                                            @"txVideoKBitrate": @(stats.txVideoKBitrate),
                                            @"rxVideoKBitrate": @(stats.rxVideoKBitrate),
                                            @"lastmileDelay": @(stats.lastmileDelay),
                                            @"userCount": @(stats.userCount),
                                            @"cpuAppUsage": @(stats.cpuAppUsage),
                                            @"cpuTotalUsage": @(stats.cpuTotalUsage)
                                            }];
  }];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// destroy
RCT_EXPORT_METHOD(destroy) {
  [self stopObserving];
  [AgoraRtcEngineKit destroy];
}

// set local video render mode
RCT_EXPORT_METHOD(setLocalRenderMode:(NSInteger) mode
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine setLocalRenderMode:mode];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set remote video render mode
RCT_EXPORT_METHOD(setRemoteRenderMode:(NSUInteger) uid
                  mode:(NSInteger) mode
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine setRemoteRenderMode:uid mode:mode];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// start video preview
RCT_EXPORT_METHOD(startPreview
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine startPreview];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// stop video preview
RCT_EXPORT_METHOD(stopPreview
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine stopPreview];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

/* enable speaker phone
 * @params enableSpeaker: BOOL
 YES: Audio output to speaker
 No: Audio output to the handset
 */
RCT_EXPORT_METHOD(setEnableSpeakerphone:(BOOL)enableSpeaker
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine setEnableSpeakerphone: enableSpeaker];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

/* set default audio speaker
 * @params defaultToSpeaker: BOOL
 YES: Audio output to speaker
 No: Audio output to the handset
 */
RCT_EXPORT_METHOD(setDefaultAudioRouteToSpeakerphone:(BOOL)defaultToSpeaker
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine setDefaultAudioRouteToSpeakerphone:defaultToSpeaker];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setDefaultMuteAllRemoteAudioStreams:(BOOL)defaultToSpeaker
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine setDefaultMuteAllRemoteAudioStreams:defaultToSpeaker];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable video
RCT_EXPORT_METHOD(enableVideo:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine enableVideo];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// disable Video
RCT_EXPORT_METHOD(disableVideo:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine disableVideo];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable local video
RCT_EXPORT_METHOD(enableLocalVideo:(BOOL)enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableLocalVideo:enabled];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// mute local video stream
RCT_EXPORT_METHOD(muteLocalVideoStream:(BOOL)muted
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine muteLocalVideoStream:muted];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// mute all remote video streams
RCT_EXPORT_METHOD(muteAllRemoteVideoStreams:(BOOL)muted
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine muteAllRemoteVideoStreams:muted];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// mute video stream by uid
RCT_EXPORT_METHOD(muteRemoteVideoStream:(NSUInteger)uid mute:(BOOL)mute
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine muteRemoteVideoStream:uid mute:mute];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setDefaultMuteAllRemoteVideoStreams:(BOOL)mute
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setDefaultMuteAllRemoteVideoStreams:mute];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable audio
RCT_EXPORT_METHOD(enableAudio:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableAudio];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// disable audio
RCT_EXPORT_METHOD(disableAudio:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine disableAudio];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable local audio
RCT_EXPORT_METHOD(enableLocalAudio:(BOOL)enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableLocalAudio:enabled];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// mute local audio stream
RCT_EXPORT_METHOD(muteLocalAudioStream:(BOOL)mute
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine muteLocalAudioStream:mute];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// mute all remote audio stream
RCT_EXPORT_METHOD(muteAllRemoteAudioStreams:(BOOL)mute
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine muteAllRemoteAudioStreams:mute];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// mute one remote audio stream by uid
RCT_EXPORT_METHOD(muteRemoteAudioStream:(NSUInteger)uid muted:(BOOL)mute
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine muteRemoteAudioStream:uid mute:mute];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// adjust recorcding signal volume
RCT_EXPORT_METHOD(adjustRecordingSignalVolume: (NSInteger) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine adjustRecordingSignalVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// adjust playback signal volume
RCT_EXPORT_METHOD(adjustPlaybackSignalVolume: (NSInteger) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine adjustPlaybackSignalVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable audio volume indication
RCT_EXPORT_METHOD(enableAudioVolumeIndication: (NSInteger) interval smooth:(NSInteger)smooth
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableAudioVolumeIndication:interval smooth:smooth];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// is speaker phone enabled
RCT_EXPORT_METHOD(isSpeakerphoneEnabled:(RCTResponseSenderBlock)callback) {
  callback(@[@{@"status": @([self.rtcEngine isSpeakerphoneEnabled])}]);
}

// enable in ear monitoring
RCT_EXPORT_METHOD(enableInEarMonitoring:(BOOL)enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableInEarMonitoring:enabled];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set in ear monitoring
RCT_EXPORT_METHOD(setInEarMonitoringVolume:(NSInteger) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setInEarMonitoringVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set local voice pitch
RCT_EXPORT_METHOD(setLocalVoicePitch:(double) pitch
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVoicePitch:pitch];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set local video equalization of band frequency
RCT_EXPORT_METHOD(setLocalVoiceEqualization:(NSInteger)band
                  gain:(NSInteger)gain
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVoiceEqualizationOfBandFrequency:(AgoraAudioEqualizationBandFrequency)band withGain:gain];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set local voice reverb of type
RCT_EXPORT_METHOD(setLocalVoiceReverb:(NSInteger)reverb value:(NSInteger)value
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVoiceReverbOfType:(AgoraAudioReverbType)reverb withValue:value];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// start audio mixing
RCT_EXPORT_METHOD(startAudioMixing:(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine startAudioMixing:[options[@"filepath"]]
                                          loopback:[options[@"loopback"] boolValue]
                                           replace:[options[@"replace"] boolValue]
                                             cycle:[options[@"cycle"] integerValue]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// stop audio mixing
RCT_EXPORT_METHOD(stopAudioMixing:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopAudioMixing];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// pause audio mixing
RCT_EXPORT_METHOD(pauseAudioMixing:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine pauseAudioMixing];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// resume audio mixing
RCT_EXPORT_METHOD(resumeAudioMixing:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine resumeAudioMixing];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// adjust audio mixing volume
RCT_EXPORT_METHOD(adjustAudioMixingVolume:(NSInteger) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine adjustAudioMixingVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// adjust audio mixing playout volume
RCT_EXPORT_METHOD(adjustAudioMixingPlayoutVolume:(NSInteger) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine adjustAudioMixingPlayoutVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// adjust audio mixing publish volume
RCT_EXPORT_METHOD(adjustAudioMixingPublishVolume:(NSInteger) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine adjustAudioMixingPublishVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// get audio mixing duration
RCT_EXPORT_METHOD(getAudioMixingDuration
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine getAudioMixingDuration];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// get the volume of local audio mixing
RCT_EXPORT_METHOD(getAudioMixingPlayoutVolume
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine getAudioMixingPlayoutVolume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// get the volume of remote audio mixing
RCT_EXPORT_METHOD(getAudioMixingPublishVolume
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [_rtcEngine getAudioMixingPublishVolume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}


// get audio mixing current position
RCT_EXPORT_METHOD(getAudioMixingCurrentPosition
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine getAudioMixingDuration];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set audio mixing position
RCT_EXPORT_METHOD(setAudioMixingPosition
                  :(NSInteger) pos
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setAudioMixingPosition:pos];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// get effects volume
RCT_EXPORT_METHOD(getEffectsVolume
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  double res = [self.rtcEngine getEffectsVolume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set effects volume
RCT_EXPORT_METHOD(setEffectsVolume
                  :(double) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setEffectsVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set volume of effect
RCT_EXPORT_METHOD(setVolumeOfEffect
                  :(int) soundId
                  volume:(double)volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setVolumeOfEffect:soundId withVolume:volume];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// play effect
RCT_EXPORT_METHOD(playEffect
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine playEffect:(int)[options[@"soundid"] integerValue]
                                    filePath:[options[@"filepath"]]
                                   loopCount:(int)[options[@"loopcount"] integerValue]
                                       pitch:[options[@"pitch"] doubleValue]
                                         pan:[options[@"pan"] doubleValue]
                                        gain:[options[@"gain"] doubleValue]
                                     publish:[options[@"publish"] boolValue]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// stop effect by soundId
RCT_EXPORT_METHOD(stopEffect
                  :(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopEffect:(int)soundId];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// stopAllEffects
RCT_EXPORT_METHOD(stopAllEffects
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopAllEffects];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// preloadEffect
RCT_EXPORT_METHOD(preloadEffect
                  :(NSInteger) soundId
                  filePath:(NSString *)filePath
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine preloadEffect:(int)soundId filePath:filePath];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// unload effect
RCT_EXPORT_METHOD(unloadEffect
                  :(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine unloadEffect:(int)soundId];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// pause effect by id
RCT_EXPORT_METHOD(pauseEffect
                  :(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine pauseEffect:(int)soundId];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// pause all effects
RCT_EXPORT_METHOD(pauseAllEffects
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine pauseAllEffects];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// resume effect by id
RCT_EXPORT_METHOD(resumeEffect:(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine resumeEffect:(int)soundId];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// resume all effect
RCT_EXPORT_METHOD(resumeAllEffects
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine resumeAllEffects];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// start audio recording quality
RCT_EXPORT_METHOD(startAudioRecording:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraAudioRecordingQuality qualityType = (AgoraAudioRecordingQuality)[options[@"quality"] integerValue];
  NSInteger res = [self.rtcEngine startAudioRecording:[options[@"filepath"]] quality:qualityType];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// stop audio recording
RCT_EXPORT_METHOD(stopAudioRecording
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopAudioRecording];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set audio session operation restriction
RCT_EXPORT_METHOD(setAudioSessionOperationRestriction
                  :(NSInteger) restriction) {
  AgoraAudioSessionOperationRestriction restrictionType = (AgoraAudioSessionOperationRestriction)restriction;
  [self.rtcEngine setAudioSessionOperationRestriction:restrictionType];
}

// gateway test stop echo
RCT_EXPORT_METHOD(stopEchoTest
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopEchoTest];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable last mile test
RCT_EXPORT_METHOD(enableLastmileTest
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableLastmileTest];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// disable last mile test
RCT_EXPORT_METHOD(disableLastmileTest
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine disableLastmileTest];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set recording audioframe parameters with samplerate
RCT_EXPORT_METHOD(setRecordingAudioFrameParameters:(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRecordingAudioFrameParametersWithSampleRate:[options[@"sampleRate"] integerValue]
                                                                         channel:[options[@"channel"] integerValue]
                                                                            mode:(AgoraAudioRawFrameOperationMode)[options[@"mode"] integerValue]
                                                                  samplesPerCall:[options[@"samplesPerCall"] integerValue]
                   ];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set playback audioframe parameters with samplerate
RCT_EXPORT_METHOD(setPlaybackAudioFrameParameters:(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setPlaybackAudioFrameParametersWithSampleRate:[options[@"sampleRate"] integerValue]
                                                                        channel:[options[@"channel"] integerValue]
                                                                           mode:(AgoraAudioRawFrameOperationMode)[options[@"mode"] integerValue]
                                                                 samplesPerCall:[options[@"samplesPerCall"] integerValue]
                   ];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set mixed audio frame parameters with sample rate
RCT_EXPORT_METHOD(setMixedAudioFrameParametersWithSampleRate
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setMixedAudioFrameParametersWithSampleRate:[options[@"sampleRate"] integerValue] samplesPerCall:[options[@"samplesPerCall"] integerValue]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// add video watermark
RCT_EXPORT_METHOD(addVideoWatermark:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine addVideoWatermark:[self makeAgoraImage:@{
                                                                           @"url": options[@"url"],
                                                                           @"x": options[@"x"],
                                                                           @"y": options[@"y"],
                                                                           @"width": options[@"width"],
                                                                           @"height": options[@"height"]
                                                                           }]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// clear video watermark
RCT_EXPORT_METHOD(clearVideoWatermarks
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine clearVideoWatermarks];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set local publish fallback option
RCT_EXPORT_METHOD(setLocalPublishFallbackOption:(NSInteger)option
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalPublishFallbackOption:option];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set remote subscribe fallback option
RCT_EXPORT_METHOD(setRemoteSubscribeFallbackOption:(NSInteger)option
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteSubscribeFallbackOption:option];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}


// enable dual stream mode
RCT_EXPORT_METHOD(enableDualStreamMode
                  :(BOOL) enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableDualStreamMode:enabled];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set remote video stream
RCT_EXPORT_METHOD(setRemoteVideoStreamType
                  :(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteVideoStream:[options[@"uid"] integerValue]
                                                  type:(AgoraVideoStreamType)[options[@"streamType"] integerValue]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set remote default video stream
RCT_EXPORT_METHOD(setRemoteDefaultVideoStreamType
                  :(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteDefaultVideoStreamType:(AgoraVideoStreamType)[options[@"streamType"] integerValue]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// add injection stream url
RCT_EXPORT_METHOD(addInjectStreamUrl
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraLiveInjectStreamConfig *config = [AgoraLiveInjectStreamConfig new];
  config.size = CGSizeMake([options[@"config"][@"size"][@"width"] floatValue], [options[@"config"][@"size"][@"height"] floatValue]);
  config.videoGop = [options[@"config"][@"videoGop"] integerValue];
  config.videoFramerate = [options[@"config"][@"videoFramerate"] integerValue];
  config.videoBitrate = [options[@"config"][@"videoBitrate"] integerValue];
  config.audioSampleRate = (AgoraAudioSampleRateType)[options[@"config"][@"audioSampleRate"] integerValue];
  config.audioBitrate = [options[@"config"][@"audioBitrate"] integerValue];
  config.audioChannels = [options[@"config"][@"audioChannels"] integerValue];
  
  NSInteger res = [self.rtcEngine addInjectStreamUrl:[options[@"url"] stringValue]
                                              config:config];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// remove injection stream url
RCT_EXPORT_METHOD(removeInjectStreamUrl
                  :(NSString *)url
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  NSInteger res = [self.rtcEngine removeInjectStreamUrl:url];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set local video mirror mode
RCT_EXPORT_METHOD(setLocalVideoMirrorMode
                  :(NSInteger) mode
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVideoMirrorMode:(AgoraVideoMirrorMode) mode];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// switchCamera
RCT_EXPORT_METHOD(switchCamera
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine switchCamera];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// getCameraInfo
RCT_EXPORT_METHOD(getCameraInfo
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  resolve(@{
            @"support": @{
                @"zoom": @([self.rtcEngine isCameraZoomSupported]),
                @"torch": @([self.rtcEngine isCameraTorchSupported]),
                @"focusPositionInPreview": @([self.rtcEngine isCameraFocusPositionInPreviewSupported]),
                @"exposurePosition": @([self.rtcEngine isCameraExposurePositionSupported]),
                @"autoFocusFaceMode": @([self.rtcEngine isCameraAutoFocusFaceModeSupported])
                }
            });
}

// setCameraZoomFactor
RCT_EXPORT_METHOD(setCameraZoomFactor
                  :(float)zoomFactor
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraZoomFactor:(CGFloat)zoomFactor];
  if (res) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// setCameraFocusPositionInPreview
RCT_EXPORT_METHOD(setCameraFocusPositionInPreview
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraFocusPositionInPreview:CGPointMake((CGFloat)[options[@"x"] floatValue], (CGFloat)[options[@"y"] floatValue])];
  if (res) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// setCameraExposurePosition
RCT_EXPORT_METHOD(setCameraExposurePosition
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraExposurePosition:CGPointMake((CGFloat)[options[@"x"] floatValue], (CGFloat)[options[@"y"] floatValue])];
  if (res == YES) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable camera torch
RCT_EXPORT_METHOD(setCameraTorchOn:(BOOL)isOn
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraTorchOn:isOn];
  if (res == YES) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// enable auto focus face mode
RCT_EXPORT_METHOD(setCameraAutoFocusFaceModeEnabled:(BOOL)enable
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraAutoFocusFaceModeEnabled:enable];
  if (res == YES) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// getCallId
RCT_EXPORT_METHOD(getCallId
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  resolve(@{
            @"id": [self.rtcEngine getCallId]
            });
}

// setLogFile and setLogFilter
RCT_EXPORT_METHOD(setLog
                  :(NSString *)filePath
                  level:(NSUInteger)level
                  size:(NSUInteger)size
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLogFileSize:size];
  if (res < 0) return reject(@(-1).stringValue, @(res).stringValue, nil);
  res = [self.rtcEngine setLogFilter:level];
  if (res < 0) return reject(@(-1).stringValue, @(res).stringValue, nil);
  res = [self.rtcEngine setLogFile:filePath];
  if (res < 0) return reject(@(-1).stringValue, @(res).stringValue, nil);
  resolve(nil);
}

// get sdk version
RCT_EXPORT_METHOD(getSdkVersion
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  resolve(@[[AgoraRtcEngineKit getSdkVersion]]);
}

// add publish stream url
RCT_EXPORT_METHOD(addPublishStreamUrl:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine addPublishStreamUrl:options[@"url"] transcodingEnabled:[options[@"enable"] boolValue]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// remove publish stream url
RCT_EXPORT_METHOD(removePublishStreamUrl:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  NSInteger res = [self.rtcEngine removePublishStreamUrl:options[@"url"]];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

// set living transcoding
RCT_EXPORT_METHOD(setLiveTranscoding:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  AgoraLiveTranscoding *transcoding = AgoraLiveTranscoding.defaultTranscoding;
  if ([options objectForKey:@"size"]) {
    transcoding.size = CGSizeMake([options[@"size"][@"width"] doubleValue], [options[@"size"][@"height"] doubleValue]);
  }
  if ([options objectForKey:@"videoBitrate"]) {
    transcoding.videoBitrate = [options[@"videoBitrate"] integerValue];
  }
  if ([options objectForKey:@"videoFramerate"]) {
    transcoding.videoFramerate = [options[@"videoFramerate"] integerValue];
  }
  if ([options objectForKey:@"videoGop"]) {
    transcoding.videoGop = [options[@"videoGop"] integerValue];
  }
  if ([options objectForKey:@"videoCodecProfile"]) {
    transcoding.videoCodecProfile = (AgoraVideoCodecProfileType)[options[@"videoCodecProfile"] integerValue];
  }
  if ([options objectForKey:@"audioCodecProfile"]) {
    transcoding.audioCodecProfile = (AgoraAudioCodecProfileType)[options[@"audioCodecProfile"] integerValue];
  }
  if ([options objectForKey:@"audioSampleRate"]) {
    transcoding.audioSampleRate = (AgoraAudioSampleRateType)[options[@"audioSampleRate"] integerValue];
  }
  if ([options objectForKey:@"watermark"]) {
    transcoding.watermark = [self makeAgoraImage:@{
                                                   @"url": options[@"watermark"][@"url"],
                                                   @"x": options[@"watermark"][@"x"],
                                                   @"y": options[@"watermark"][@"y"],
                                                   @"width": options[@"watermark"][@"width"],
                                                   @"height": options[@"watermark"][@"height"]
                                                   }];
  }
  if ([options objectForKey:@"backgroundImage"]) {
    transcoding.backgroundImage = [self makeAgoraImage:@{
                                                         @"url": options[@"backgroundImage"][@"url"],
                                                         @"x": options[@"backgroundImage"][@"x"],
                                                         @"y": options[@"backgroundImage"][@"y"],
                                                         @"width": options[@"backgroundImage"][@"width"],
                                                         @"height": options[@"backgroundImage"][@"height"]
                                                         }];
  }
  
  if ([options objectForKey:@"backgroundColor"]) {
    transcoding.backgroundColor = [self UIColorFromRGB:(NSUInteger)[options[@"backgroundColor"] integerValue]];
  }
  
  if ([options objectForKey:@"audioBitrate"]) {
    transcoding.audioBitrate = [options[@"audioBitrate"] integerValue];
  }
  
  if ([options objectForKey:@"audioChannels"]) {
    transcoding.audioChannels = [options[@"audioChannels"] integerValue];
  }
  
  if ([options objectForKey:@"transcodingUsers"]) {
    NSMutableArray<AgoraLiveTranscodingUser*> *transcodingUsers = [NSMutableArray new];
    for (NSDictionary *optionUser in options[@"transcodingUsers"]) {
      AgoraLiveTranscodingUser *liveUser = [AgoraLiveTranscodingUser new];
      liveUser.uid = (NSUInteger)[optionUser[@"uid"] integerValue];
      liveUser.rect = CGRectMake((CGFloat)[optionUser[@"x"] floatValue],
                                 (CGFloat)[optionUser[@"y"] floatValue],
                                 (CGFloat)[optionUser[@"width"] floatValue],
                                 (CGFloat)[optionUser[@"height"] floatValue]);
      liveUser.zOrder = [optionUser[@"zOrder"] integerValue];
      liveUser.alpha = [optionUser[@"alpha"] doubleValue];
      liveUser.audioChannel = [optionUser[@"audioChannel"] integerValue];
      [transcodingUsers addObject:liveUser];
    }
    transcoding.transcodingUsers = transcodingUsers;
  }
  if ([options objectForKey:@"transcodingExtraInfo"]) {
    transcoding.transcodingExtraInfo = [options[@"transcodingExtraInfo"] stringValue];
  }
  
  NSInteger res = [self.rtcEngine setLiveTranscoding:transcoding];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setBeautyEffectOptions:(bool) enabled
                  options:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine setBeautyEffectOptions:enabled options:options];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setLocalVoiceChanger:(NSInteger) voiceChanger
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVoiceChanger:(AgoraAudioVoiceChanger)voiceChanger];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setLocalVoiceReverbPreset:(NSInteger) reverbPreset
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVoiceReverbPreset:(AgoraAudioReverbPreset)reverbPreset];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(enableSoundPositionIndication:(bool) enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableSoundPositionIndication:enabled];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setRemoteVoicePosition:(NSUInteger) uid
                  pan:(float)pan
                  gain:(float)gain
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteVoicePosition:uid pan:pan gain: gain];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(startLastmileProbeTest:(NSDictionary*)config
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraLastmileProbeConfig* probeConfig = [[AgoraLastmileProbeConfig alloc] init];
  probeConfig.probeUplink = [config[@"probeUplink"] boolValue];
  probeConfig.probeDownlink = [config[@"probeDownlink"] boolValue];
  probeConfig.expectedUplinkBitrate = [config[@"expectedUplinkBitrate"] integerValue];
  probeConfig.expectedDownlinkBitrate = [config[@"expectedDownlinkBitrate"] integerValue];
  
  NSInteger res = [self.rtcEngine startLastmileProbeTest:probeConfig];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}


RCT_EXPORT_METHOD(setRemoteUserPriority:(NSUInteger)uid
                  userPriority:(NSInteger)userPriority
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  NSInteger res = [self.rtcEngine setRemoteUserPriority:uid type:(AgoraUserPriority)userPriority];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(startEchoTestWithInterval:(NSInteger)interval
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  NSInteger res = [self.rtcEngine startEchoTestWithInterval:interval successBlock:^(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed) {
    [self sendEvent:AGIntervalTest params:@{
                                            @"message": @"StartEchoTestWithInterval",
                                            @"channel": channel,
                                            @"uid": @(uid),
                                            @"elapsed": @(elapsed),
                                            }];
  }];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(setCameraCapturerConfiguration:(NSDictionary *)config
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  AgoraCameraCapturerConfiguration* configuration = [[AgoraCameraCapturerConfiguration alloc] init];
  configuration.preference = [config[@"preference"] integerValue];
  
  NSInteger res = [self.rtcEngine setCameraCapturerConfiguration:configuration];
  if (res == 0) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(sendMediaData:(NSString *)dataStr
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self respondsToSelector:@selector(readyToSendMetadataAtTimestamp:)];
  if (res == YES) {
    self.metadata = [dataStr dataUsingEncoding:NSUTF8StringEncoding];
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(res).stringValue, nil);
  }
}

RCT_EXPORT_METHOD(registerMediaMetadataObserver
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  if (YES == [_rtcEngine setMediaMetadataDataSource:self withType:AgoraMetadataTypeVideo] &&
      YES == [_rtcEngine setMediaMetadataDelegate:self withType:AgoraMetadataTypeVideo]
      ) {
    resolve(nil);
  } else {
    reject(@(-1).stringValue, @(-1).stringValue, nil);
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return [AgoraConst supportEvents];
}

- (void) sendEvent:(NSString *)msg params:(NSDictionary *)params {
  if (hasListeners) {
    NSString *evtName = [NSString stringWithFormat:@"%@%@", AG_PREFIX, msg];
    [self sendEventWithName:evtName body:params];
  }
}

- (void) startObserving {
  hasListeners = YES;
}

- (void) stopObserving {
  hasListeners = NO;
}

#pragma mark - <AgoraRtcEngineDelegate>
// EVENT CALLBACKS
- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOccurWarning:(AgoraWarningCode)warningCode {
  [self sendEvent:AGWarning params:@{@"message": @"AgoraWarning", @"errorCode": @(warningCode)}];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOccurError:(AgoraErrorCode)errorCode {
  [self sendEvent:AGError params:@{@"message": @"AgoraError", @"errorCode": @(errorCode)}];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didApiCallExecute:(NSInteger)error api:(NSString *_Nonnull)api result:(NSString *_Nonnull)result {
  if (error != 0) {
    [self sendEvent:AGError  params:@{
                                      @"api": api,
                                      @"result": result,
                                      @"errorCode": @(error)
                                      }];
  } else {
    [self sendEvent:AGApiCallExecute  params:@{
                                               @"api": api,
                                               @"result": result,
                                               @"errorCode": @(error)
                                               }];
  }
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didJoinChannel:(NSString *_Nonnull)channel withUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
  [self sendEvent:AGJoinChannelSuccess params:@{
                                                @"channel": channel,
                                                @"uid": @(uid),
                                                @"elapsed": @(elapsed)
                                                }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didRejoinChannel:(NSString *_Nonnull)channel withUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
  [self sendEvent:AGRejoinChannelSuccess params:@{
                                                  @"channel": channel,
                                                  @"uid": @(uid),
                                                  @"elapsed": @(elapsed)
                                                  }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didLeaveChannelWithStats:(AgoraChannelStats *_Nonnull)stats {
  [self sendEvent:AGLeaveChannel params:@{
                                          @"stats": @{
                                              @"duration": @(stats.duration),
                                              @"txBytes": @(stats.txBytes),
                                              @"rxBytes": @(stats.rxBytes),
                                              @"txAudioBytes": @(stats.txAudioBytes),
                                              @"txVideoBytes": @(stats.txVideoBytes),
                                              @"rxAudioBytes": @(stats.rxAudioBytes),
                                              @"rxVideoBytes": @(stats.rxVideoBytes),
                                              @"txPacketLossRate": @(stats.txPacketLossRate),
                                              @"rxPacketLossRate": @(stats.rxPacketLossRate),
                                              @"txAudioKBitrate": @(stats.txAudioKBitrate),
                                              @"rxAudioKBitrate": @(stats.rxVideoKBitrate),
                                              @"txVideoKBitrate": @(stats.txVideoKBitrate),
                                              @"rxVideoKBitrate": @(stats.rxVideoKBitrate),
                                              @"lastmileDelay": @(stats.lastmileDelay),
                                              @"userCount": @(stats.userCount),
                                              @"cpuAppUsage": @(stats.cpuAppUsage),
                                              @"cpuTotalUsage": @(stats.cpuTotalUsage)
                                              }
                                          }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didClientRoleChanged:(AgoraClientRole)oldRole newRole:(AgoraClientRole)newRole {
  [self sendEvent:AGClientRoleChanged params:@{
                                               @"oldRole": @(oldRole),
                                               @"newRole": @(newRole)
                                               }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didJoinedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
  [self sendEvent:AGUserJoined params:@{
                                        @"uid": @(uid),
                                        @"elapsed": @(elapsed)
                                        }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didRegisteredLocalUser:(NSString *_Nonnull)userAccount withUid:(NSUInteger)uid {
  [self sendEvent:AGLocalUserRegistered params:@{
                                                 @"uid": @(uid),
                                                 @"userAccount": userAccount
                                                 }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didUpdatedUserInfo:(AgoraUserInfo *_Nonnull)userInfo withUid:(NSUInteger)uid {
  [self sendEvent:AGUserInfoUpdated params:@{
                                             @"uid": @(uid),
                                             @"peer": @{
                                                 @"uid": @(userInfo.uid),
                                                 @"userAccount": userInfo.userAccount
                                                 }}];
}


- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOfflineOfUid:(NSUInteger)uid reason:(AgoraUserOfflineReason)reason {
  [self sendEvent:AGUserOffline params:@{
                                         @"uid": @(uid),
                                         @"reason": @(reason)
                                         }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine networkTypeChangedToType:(AgoraNetworkType)type {
  [self sendEvent:AGNetworkTypeChanged params:@{
                                                @"type": @(type)
                                                }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine connectionChangedToState:(AgoraConnectionStateType)state reason:(AgoraConnectionChangedReason)reason {
  [self sendEvent:AGConnectionStateChanged params:@{
                                                    @"state": @(state),
                                                    @"reason": @(reason)
                                                    }];
}

- (void)rtcEngineConnectionDidLost:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGConnectionLost params:@{
                                            @"message": @"connectionLost"
                                            }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine tokenPrivilegeWillExpire:(NSString *_Nonnull)token {
  [self sendEvent:AGTokenPrivilegeWillExpire params:@{
                                                      @"token": token
                                                      }];
}

- (void)rtcEngineRequestToken:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGRequestToken params:@{
                                          @"message": @"RequestToken"
                                          }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine localAudioStateChange:(AgoraAudioLocalState)state error:(AgoraAudioLocalError)error {
  [self sendEvent:AGLocalAudioStateChanged params:@{
                                                    @"state": @(state),
                                                    @"errorCode": @(error)
                                                    }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine remoteAudioStateChangedOfUid:(NSUInteger)uid state:(AgoraAudioRemoteState)state reason:(AgoraAudioRemoteStateReason)reason elapsed:(NSInteger)elapsed {
  [self sendEvent:AGRemoteAudioStateChanged params:@{
                                                     @"uid": @(uid),
                                                     @"state": @(state),
                                                     @"reason": @(reason),
                                                     @"elapsed": @(elapsed)
                                                     }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine localAudioStats:(AgoraRtcLocalAudioStats *_Nonnull)stats {
  [self sendEvent:AGLocalAudioStats params:@{
                                             @"numChannels": @(stats.numChannels),
                                             @"sentSampleRate": @(stats.sentSampleRate),
                                             @"sentBitrate": @(stats.sentBitrate),
                                             }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine reportAudioVolumeIndicationOfSpeakers:(NSArray<AgoraRtcAudioVolumeInfo*> *_Nonnull)speakers totalVolume:(NSInteger)totalVolume {
  NSMutableArray *result = [NSMutableArray new];
  for (AgoraRtcAudioVolumeInfo *speaker in speakers) {
    [result addObject:@{
                        @"uid": @(speaker.uid),
                        @"volume": @(speaker.volume)
                        }];
  }
  [self sendEvent:AGAudioVolumeIndication params:@{
                                                   @"speakers": result,
                                                   @"totalVolume": @(totalVolume)
                                                   }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine activeSpeaker:(NSUInteger)speakerUid {
  [self sendEvent:AGActiveSpeaker params:@{
                                           @"uid": @(speakerUid)
                                           }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstLocalAudioFrame:(NSInteger)elapsed {
  [self sendEvent:AGFirstLocalAudioFrame params:@{
                                                  @"elapsed": @(elapsed)
                                                  }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstRemoteAudioFrameOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
  [self sendEvent:AGFirstRemoteAudioFrame params:@{
                                                   @"uid": @(uid),
                                                   @"elapsed": @(elapsed)
                                                   }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstRemoteAudioFrameDecodedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
  [self sendEvent:AGFirstRemoteAudioDecoded params:@{
                                                     @"uid": @(uid),
                                                     @"elapsed": @(elapsed)
                                                     }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstLocalVideoFrameWithSize:(CGSize)size elapsed:(NSInteger)elapsed {
  [self sendEvent:AGFirstLocalVideoFrame params:@{
                                                  @"width": @(size.width),
                                                  @"height": @(size.height),
                                                  @"elapsed": @(elapsed)
                                                  }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstRemoteVideoFrameOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed {
  [self sendEvent:AGFirstRemoteVideoFrame params:@{
                                                   @"uid": @(uid),
                                                   @"width": @(size.width),
                                                   @"height": @(size.height),
                                                   @"elapsed": @(elapsed)}];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didAudioMuted:(BOOL)muted byUid:(NSUInteger)uid {
  [self sendEvent:AGUserMuteAudio params:@{
                                           @"muted": @(muted),
                                           @"uid": @(uid)
                                           }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine videoSizeChangedOfUid:(NSUInteger)uid size:(CGSize)size rotation:(NSInteger)rotation {
  [self sendEvent:AGVideoSizeChanged params:@{
                                              @"uid": @(uid),
                                              @"width": @(size.width),
                                              @"height": @(size.height),
                                              @"rotation": @(rotation)
                                              }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine remoteVideoStateChangedOfUid:(NSUInteger)uid state:(AgoraVideoRemoteState)state reason:(AgoraVideoRemoteStateReason)reason elapsed:(NSInteger)elapsed {
  [self sendEvent:AGRemoteVideoStateChanged params:@{
                                                     @"uid": @(uid),
                                                     @"state": @(state),
                                                     @"reason": @(reason),
                                                     @"elapsed": @(elapsed)
                                                     }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didLocalPublishFallbackToAudioOnly:(BOOL)isFallbackOrRecover {
  [self sendEvent:AGLocalPublishFallbackToAudioOnly params:@{
                                                             @"isFallbackOrRecover": @(isFallbackOrRecover)
                                                             }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didRemoteSubscribeFallbackToAudioOnly:(BOOL)isFallbackOrRecover byUid:(NSUInteger)uid {
  [self sendEvent:AGRemoteSubscribeFallbackToAudioOnly params:@{
                                                                @"isFallbackOrRecover": @(isFallbackOrRecover),
                                                                @"uid": @(uid)
                                                                }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didAudioRouteChanged:(AgoraAudioOutputRouting)routing {
  [self sendEvent:AGAudioRouteChanged params:@{
                                               @"routing": @(routing)
                                               }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine cameraFocusDidChangedToRect:(CGRect)rect {
  [self sendEvent:AGCameraFocusAreaChanged params:@{
                                                    @"rect": @(rect)
                                                    }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine cameraExposureDidChangedToRect:(CGRect)rect {
  [self sendEvent:AGCameraExposureAreaChanged params:@{
                                                       @"rect": @(rect)
                                                       }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine remoteAudioStats:(AgoraRtcRemoteAudioStats *_Nonnull)stats {
  [self sendEvent:AGRemoteAudioStats params:@{
                                              @"stats": @{
                                                  @"uid": @(stats.uid),
                                                  @"quality": @(stats.quality),
                                                  @"networkTransportDelay": @(stats.networkTransportDelay),
                                                  @"jitterBufferDelay": @(stats.jitterBufferDelay),
                                                  @"audioLossRate": @(stats.audioLossRate),
                                                  @"totalFrozenTime": @(stats.totalFrozenTime),
                                                  @"frozenRate": @(stats.frozenRate),
                                                  @"numChannels": @(stats.numChannels),
                                                  @"receivedSampleRate": @(stats.receivedSampleRate),
                                                  @"receivedBitrate": @(stats.receivedBitrate),
                                                  }
                                              }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine reportRtcStats:(AgoraChannelStats *_Nonnull)stats {
  [self sendEvent:AGRtcStats params:@{
                                      @"stats": @{
                                          @"duration": @(stats.duration),
                                          @"txBytes": @(stats.txBytes),
                                          @"rxBytes": @(stats.rxBytes),
                                          @"txAudioBytes": @(stats.txAudioBytes),
                                          @"txVideoBytes": @(stats.txVideoBytes),
                                          @"rxAudioBytes": @(stats.rxAudioBytes),
                                          @"rxVideoBytes": @(stats.rxVideoBytes),
                                          @"txPacketLossRate": @(stats.txPacketLossRate),
                                          @"rxPacketLossRate": @(stats.rxPacketLossRate),
                                          @"txAudioKBitrate": @(stats.txAudioKBitrate),
                                          @"rxAudioKBitrate": @(stats.rxAudioKBitrate),
                                          @"txVideoKBitrate": @(stats.txVideoKBitrate),
                                          @"rxVideoKBitrate": @(stats.rxVideoKBitrate),
                                          @"lastmileDelay": @(stats.lastmileDelay),
                                          @"userCount": @(stats.userCount),
                                          @"cpuAppUsage": @(stats.cpuAppUsage),
                                          @"cpuTotalUsage": @(stats.cpuTotalUsage)
                                          }
                                      }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine lastmileQuality:(AgoraNetworkQuality)quality {
  [self sendEvent:AGLastmileQuality params:@{
                                             @"quality": @(quality)
                                             }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine networkQuality:(NSUInteger)uid txQuality:(AgoraNetworkQuality)txQuality rxQuality:(AgoraNetworkQuality)rxQuality {
  [self sendEvent:AGNetworkQuality params:@{
                                            @"uid": @(uid),
                                            @"txQuality": @(txQuality),
                                            @"rxQuality": @(rxQuality)
                                            }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine localVideoStats:(AgoraRtcLocalVideoStats *_Nonnull)stats {
  [self sendEvent:AGLocalVideoStats params:@{
                                             @"stats": @{
                                                 @"sentBitrate": @(stats.sentBitrate),
                                                 @"sentFrameRate": @(stats.sentFrameRate)
                                                 },
                                             @"encoderOutputFrameRate": @(stats.encoderOutputFrameRate),
                                             @"rendererOutputFrameRate":
                                               @(stats.rendererOutputFrameRate)
                                             }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine remoteVideoStats:(AgoraRtcRemoteVideoStats *_Nonnull)stats {
  [self sendEvent:AGRemoteVideoStats params:@{
                                              @"stats": @{
                                                  @"uid": @(stats.uid),
                                                  @"width": @(stats.width),
                                                  @"height": @(stats.height),
                                                  @"receivedBitrate": @(stats.receivedBitrate),
                                                  @"rendererOutputFrameRate": @(stats.rendererOutputFrameRate),
                                                  @"rxStreamType": @(stats.rxStreamType),
                                                  @"decoderOutputFrameRate": @(stats.decoderOutputFrameRate),
                                                  @"totalFrozenTime": @(stats.totalFrozenTime),
                                                  @"frozenRate": @(stats.frozenRate)
                                                  }
                                              }];
}

- (void)rtcEngineRemoteAudioMixingDidStart:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGRemoteAudioMixingStart params:@{
                                                    @"message": @"RemoteAudioMixingStarted"
                                                    }];
}

- (void)rtcEngineRemoteAudioMixingDidFinish:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGRemoteAudioMixingFinish params:@{
                                                     @"message": @"RemoteAudioMixingFinish"
                                                     }];
}

- (void)rtcEngineDidAudioEffectFinish:(AgoraRtcEngineKit *_Nonnull)engine soundId:(NSInteger)soundId {
  [self sendEvent:AGAudioEffectFinish params:@{
                                               @"soundid": @(soundId)
                                               }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine streamPublishedWithUrl:(NSString *_Nonnull)url errorCode:(AgoraErrorCode)errorCode {
  [self sendEvent:AGStreamPublished params:@{
                                             @"url": url,
                                             @"errorCode": @(errorCode)
                                             }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine rtmpStreamingChangedToState:(NSString *_Nonnull)url state:(AgoraRtmpStreamingState)state errorCode:(AgoraRtmpStreamingErrorCode)errorCode {
  [self sendEvent:AGRtmpStreamingStateChanged params:@{
                                                       @"url": url,
                                                       @"state": @(state),
                                                       @"errorCode": @(errorCode)
                                                       }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine streamUnpublishedWithUrl:(NSString *_Nonnull)url {
  [self sendEvent:AGStreamUnpublish params:@{
                                             @"url": url,
                                             }];
}

- (void)rtcEngineTranscodingUpdated:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGTranscodingUpdate params:@{
                                               @"message": @"AGTranscodingUpdate"
                                               }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine localVideoStateChange:(AgoraLocalVideoStreamState)state error:(AgoraLocalVideoStreamError)error {
  [self sendEvent:AGLocalVideoChanged params:@{
                                               @"state": @(state),
                                               @"errorCode": @(error)
                                               }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine streamInjectedStatusOfUrl:(NSString *_Nonnull)url uid:(NSUInteger)uid status:(AgoraInjectStreamStatus)status {
  [self sendEvent:AGStreamInjectedStatus params:@{
                                                  @"uid": @(uid),
                                                  @"url": url,
                                                  @"status": @(status)
                                                  }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine channelMediaRelayStateDidChange:(AgoraChannelMediaRelayState)state error:(AgoraChannelMediaRelayError)error {
  [self sendEvent:AGMediaRelayStateChanged params:@{
                                                    @"state": @(state),
                                                    @"errorCode": @(error),
                                                    }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didReceiveChannelMediaRelayEvent:(AgoraChannelMediaRelayEvent)event {
  [self sendEvent:AGReceivedChannelMediaRelay params:@{
                                                       @"event": @(event),
                                                       }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine receiveStreamMessageFromUid:(NSUInteger)uid streamId:(NSInteger)streamId data:(NSData *_Nonnull)data {
  NSString *_data = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  [self sendEvent:AGReceiveStreamMessage params:@{
                                                  @"uid": @(uid),
                                                  @"streamId": @(streamId),
                                                  @"data": _data}];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOccurStreamMessageErrorFromUid:(NSUInteger)uid streamId:(NSInteger)streamId error:(NSInteger)error missed:(NSInteger)missed cached:(NSInteger)cached {
  [self sendEvent:AGOccurStreamMessageError params:@{
                                                     @"uid": @(uid),
                                                     @"streamId": @(streamId),
                                                     @"errorCode": @(error),
                                                     @"missed": @(missed),
                                                     @"cached": @(cached)
                                                     }];
}

- (void)rtcEngineMediaEngineDidLoaded:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGMediaEngineLoaded params:@{
                                               @"message": @"MediaEngineLoaded"
                                               }];
}

- (void)rtcEngineMediaEngineDidStartCall:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGMediaEngineStartCall params:@{
                                                  @"message": @"AGMediaEngineStartCall"
                                                  }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine localAudioMixingStateDidChanged:(AgoraAudioMixingStateCode)state errorCode:(AgoraAudioMixingErrorCode)errorCode {
  [self sendEvent:AGAudioMixingStateChanged params:@{
                                                     @"message": @"AudioMixingStateChanged",
                                                     @"state": @(state),
                                                     @"errorCode": @(errorCode)
                                                     }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine lastmileProbeTestResult:(AgoraLastmileProbeResult *_Nonnull)result {
  [self sendEvent:AGLastmileProbeTestResult params:@{
                                                     @"message":@"LastmileProbeTestResult",
                                                     @"result": @{
                                                         @"state": @(result.state),
                                                         @"rtt": @(result.rtt),
                                                         @"uplinkReport": @{
                                                             @"packetLossRate": @(result.uplinkReport.packetLossRate),
                                                             @"jitter": @(result.uplinkReport.jitter),
                                                             @"availableBandwidth": @(result.uplinkReport.availableBandwidth),
                                                             },
                                                         @"downlinkReport": @{
                                                             @"packetLossRate": @(result.downlinkReport.packetLossRate),
                                                             @"jitter": @(result.downlinkReport.jitter),
                                                             @"availableBandwidth": @(result.downlinkReport.availableBandwidth),
                                                             }
                                                         }
                                                     }];
}

@end
