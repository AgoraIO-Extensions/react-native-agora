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

@interface RCTAgora ()
@property (strong, nonatomic) AgoraRtcEngineKit *rtcEngine;

@end

@implementation RCTAgora {
  RCTResponseSenderBlock _block;
  bool hasListeners;
}

+(BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_MODULE();

- (NSError *) makeNSError:(NSDictionary *)options {
  NSError *error = [NSError errorWithDomain:RCTAgoraErrorDomain
                                       code:[options[@"code"] integerValue]
                                   userInfo:options[@"message"]];
  return error;
}

- (AgoraImage *) makeAgoraImage:(NSDictionary *)options {
  AgoraImage *img = [AgoraImage new];
  img.url = [NSURL URLWithString:[options[@"url"] stringValue]];
  
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
           @"AgoraVideoMirrorModeAuto": @(AgoraVideoMirrorModeAuto),
           @"AgoraVideoMirrorModeEnabled": @(AgoraVideoMirrorModeEnabled),
           @"AgoraVideoMirrorModeDisabled": @(AgoraVideoMirrorModeDisabled),
           @"AgoraChannelProfileCommunication": @(AgoraChannelProfileCommunication),
           @"AgoraChannelProfileLiveBroadcasting": @(AgoraChannelProfileLiveBroadcasting),
           @"AgoraChannelProfileGame": @(AgoraChannelProfileGame),
           @"AgoraAudioMode": @(AgoraAudioMode),
           @"AgoraVideoMode": @(AgoraVideoMode),
         };
}

// init
RCT_EXPORT_METHOD(init:(NSDictionary *)options) {
  [self startObserving];
  NSLog(@"startObserving events");
  [AgoraConst share].appid = options[@"appid"];
  
  self.rtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:options[@"appid"] delegate:self];
  
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
    resolve(@{@"success": @(YES)});
  } else {
    reject(@"131002", @"renew token failed", [self makeNSError:@{
                                                                 @"code": @(131002),
                                                                 @"message":@{
                                                                     @"success": @(NO),
                                                                     @"value":[NSNumber numberWithInteger:res]
                                                                     }
                                                                 }]);
  }
}

// enable websdk interoperability
RCT_EXPORT_METHOD(enableWebSdkInteroperability: (BOOL)enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableWebSdkInteroperability:enabled];
  if (res == 0) {
    resolve(@{@"success": @(YES)});
  } else {
    reject(@"131003", @"renew token failed", [self makeNSError:@{
                                                                 @"code": @(131003),
                                                                 @"message":@{
                                                                     @"success": @(NO),
                                                                     @"value":[NSNumber numberWithInteger:res]
                                                                     }
                                                                 }]);
  }
}

// get agora connection state
RCT_EXPORT_METHOD(getConnectionState
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  resolve(@{@"success": @(YES), @"state": @([self.rtcEngine getConnectionState])});
}

// set client role
RCT_EXPORT_METHOD(setClientRole:(NSInteger) role) {
  [self.rtcEngine setClientRole:(AgoraClientRole)role];
}

// join channel
RCT_EXPORT_METHOD(joinChannel:(NSDictionary *) options) {
  [AgoraConst share].localUid = [options[@"uid"] integerValue];
  [self.rtcEngine joinChannelByToken:options[@"token"] channelId:options[@"channelName"] info:options[@"info"] uid:[AgoraConst share].localUid joinSuccess:nil];
}

// leave channel
RCT_EXPORT_METHOD(leaveChannel
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  int res = [self.rtcEngine leaveChannel:^(AgoraChannelStats * _Nonnull stat) {
    [self sendEvent:AGLeaveChannel params:@{
                                             @"message": @"leaveChannel",
                                             @"duration": @(stat.duration),
                                             @"txBytes": @(stat.txBytes),
                                             @"rxBytes": @(stat.rxBytes),
                                             @"txAudioKBitrate": @(stat.txAudioKBitrate),
                                             @"rxAudioKBitrate": @(stat.rxAudioKBitrate),
                                             @"txVideoKBitrate": @(stat.txVideoKBitrate),
                                             @"rxVideoKBitrate": @(stat.rxVideoKBitrate),
                                             @"lastmileDelay": @(stat.lastmileDelay),
                                             @"userCount": @(stat.userCount),
                                             @"cpuAppUsage": @(stat.cpuAppUsage),
                                             @"cpuTotalUsage": @(stat.cpuTotalUsage)
                                             }];
  }];
  if (res != 0) {
    reject(@"131038", @"leaveChannel failed", [self makeNSError:@{
                                                                  @"code": @(131038),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":[NSNumber numberWithInteger:res]
                                                                      }
                                                                  }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// destroy
RCT_EXPORT_METHOD(destroy) {
  [self stopObserving];
  [AgoraRtcEngineKit destroy];
}

// set local video canvas
RCT_EXPORT_METHOD(setupLocalVideo:(NSDictionary *)options){
  AgoraRtcVideoCanvas *canvas = [AgoraRtcVideoCanvas new];
  canvas.uid = [AgoraConst share].localUid;
  canvas.view = [self.bridge.uiManager viewForReactTag:options[@"reactTag"]];
  canvas.renderMode = [options[@"renderMode"] integerValue];
  [self.rtcEngine setupLocalVideo:canvas];
}

// set remote video canvas
RCT_EXPORT_METHOD(setupRemoteVideo:(NSDictionary *) options) {
  AgoraRtcVideoCanvas *canvas = [AgoraRtcVideoCanvas new];
  canvas.uid = [options[@"uid"] integerValue];
  canvas.view = [self.bridge.uiManager viewForReactTag:options[@"reactTag"]];
  canvas.renderMode = [options[@"renderMode"] integerValue];
  [self.rtcEngine setupRemoteVideo:canvas];
}

// set local video render mode
RCT_EXPORT_METHOD(setLocalRenderMode:(NSInteger) mode) {
  [self.rtcEngine setLocalRenderMode:mode];
}

// set remote video render mode
RCT_EXPORT_METHOD(setRemoteRenderMode:(NSInteger) uid
                  mode:(NSInteger) mode) {
  [self.rtcEngine setRemoteRenderMode:uid mode:mode];
}

// start video preview
RCT_EXPORT_METHOD(startPreview) {
  [self.rtcEngine startPreview];
}

// stop video preview
RCT_EXPORT_METHOD(stopPreview){
  [self.rtcEngine stopPreview];
}

/* enable speaker phone
 * @params enableSpeaker: BOOL
 YES: Audio output to speaker
 No: Audio output to the handset
 */
RCT_EXPORT_METHOD(setEnableSpeakerphone:(BOOL)enableSpeaker){
  [self.rtcEngine setEnableSpeakerphone: enableSpeaker];
}

/* set default audio speaker
 * @params defaultToSpeaker: BOOL
 YES: Audio output to speaker
 No: Audio output to the handset
 */
RCT_EXPORT_METHOD(setDefaultAudioRouteToSpeakerphone:(BOOL)defaultToSpeaker){
  [self.rtcEngine setDefaultAudioRouteToSpeakerphone:defaultToSpeaker];
}

RCT_EXPORT_METHOD(setDefaultMuteAllRemoteAudioStreams:(BOOL)defaultToSpeaker){
  [self.rtcEngine setDefaultMuteAllRemoteAudioStreams:defaultToSpeaker];
}

// enable video
RCT_EXPORT_METHOD(enableVideo) {
  [self.rtcEngine enableVideo];
}

// disable Video
RCT_EXPORT_METHOD(disableVideo) {
  [self.rtcEngine disableVideo];
}

// enable local video
RCT_EXPORT_METHOD(enableLocalVideo:(BOOL)enabled){
  [self.rtcEngine enableLocalVideo:enabled];
}

// mute local video stream
RCT_EXPORT_METHOD(muteLocalVideoStream:(BOOL)muted) {
  [self.rtcEngine muteLocalVideoStream:muted];
}

// mute all remote video streams
RCT_EXPORT_METHOD(muteAllRemoteVideoStreams:(BOOL)muted){
  [self.rtcEngine muteAllRemoteVideoStreams:muted];
}

// mute video stream by uid
RCT_EXPORT_METHOD(muteRemoteVideoStream:(NSUInteger)uid mute:(BOOL)mute){
  [self.rtcEngine muteRemoteVideoStream:uid mute:mute];
}

RCT_EXPORT_METHOD(setDefaultMuteAllRemoteVideoStreams:(BOOL)mute) {
  [self.rtcEngine setDefaultMuteAllRemoteVideoStreams:mute];
}

// enable audio
RCT_EXPORT_METHOD(enableAudio) {
  [self.rtcEngine enableAudio];
}

// disable audio
RCT_EXPORT_METHOD(disableAudio) {
  [self.rtcEngine disableAudio];
}

// enable local audio
RCT_EXPORT_METHOD(enableLocalAudio:(BOOL)enabled){
  [self.rtcEngine enableLocalAudio:enabled];
}

// mute local audio stream
RCT_EXPORT_METHOD(muteLocalAudioStream:(BOOL)mute){
  [self.rtcEngine muteLocalAudioStream:mute];
}

// mute all remote audio stream
RCT_EXPORT_METHOD(muteAllRemoteAudioStreams:(BOOL)mute){
  [self.rtcEngine muteAllRemoteAudioStreams:mute];
}

// mute one remote audio stream by uid
RCT_EXPORT_METHOD(muteRemoteAudioStream:(NSUInteger)uid muted:(BOOL)mute){
  [self.rtcEngine muteRemoteAudioStream:uid mute:mute];
}

// adjust recorcding signal volume
RCT_EXPORT_METHOD(adjustRecordingSignalVolume: (NSInteger) volume){
  [self.rtcEngine adjustRecordingSignalVolume:volume];
}

// adjust playback signal volume
RCT_EXPORT_METHOD(adjustPlaybackSignalVolume: (NSInteger) volume) {
  [self.rtcEngine adjustPlaybackSignalVolume:volume];
}

// enable audio volume indication
RCT_EXPORT_METHOD(enableAudioVolumeIndication: (NSInteger) interval smooth:(NSInteger)smooth) {
  [self.rtcEngine enableAudioVolumeIndication:interval smooth:smooth];
}

RCT_EXPORT_METHOD(sendMessage
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger uid = 0;
  if (options[@"streamID"] != nil) {
    uid = [options[@"streamID"] integerValue];
  }
  NSInteger streamID = [self.rtcEngine createDataStream:&uid reliable:[options[@"reliable"] boolValue] ordered:[options[@"ordered"] boolValue]];
  if (streamID < 0) {
    reject(@"131001", @"createDataStream failed", [self makeNSError:@{
                                                                      @"code": @(131001),
                                                                      @"message":@{
                                                                        @"success": @(NO),
                                                                        @"value":[NSNumber numberWithInteger:uid]
                                                                        }
                                                                    }]);
  }
  NSString *dataStr = options[@"data"];
  NSData *data = [dataStr dataUsingEncoding:NSUTF8StringEncoding];
  NSInteger res = [self.rtcEngine sendStreamMessage:uid data:data];
  if (res == 0) {
    resolve(@{@"success": @(YES), @"streamID": @(uid)});
  } else {
    reject(@"131001", @"sendStreamMessage failed", [self makeNSError:@{
                                                                       @"code": @(131001),
                                                                       @"message":@{
                                                                         @"success": @(NO),
                                                                         @"value":[NSNumber numberWithInteger:res]
                                                                         }
                                                                     }]);
  }
}


// is speaker phone enabled
RCT_EXPORT_METHOD(methodisSpeakerphoneEnabled:(RCTResponseSenderBlock)callback) {
  callback(@[@{@"status": @([self.rtcEngine isSpeakerphoneEnabled])}]);
}

// enable in ear monitoring
RCT_EXPORT_METHOD(enableInEarMonitoring:(BOOL)enabled) {
  [self.rtcEngine enableInEarMonitoring:enabled];
}

// set in ear monitoring
RCT_EXPORT_METHOD(setInEarMonitoringVolume:(NSInteger) volume) {
  [self.rtcEngine setInEarMonitoringVolume:volume];
}

// set local voice pitch
RCT_EXPORT_METHOD(setLocalVoicePitch:(double) pitch) {
  [self.rtcEngine setLocalVoicePitch:pitch];
}

// set local video equalization of band frequency
RCT_EXPORT_METHOD(setLocalVoiceEqualization:(NSInteger)band gain:(NSInteger)gain) {
  AgoraAudioEqualizationBandFrequency bandType = AgoraAudioEqualizationBand31;
  switch (band) {
    case AgoraAudioEqualizationBand31:
      bandType = AgoraAudioEqualizationBand31;
      break;
    case AgoraAudioEqualizationBand62:
      bandType = AgoraAudioEqualizationBand62;
      break;
    case AgoraAudioEqualizationBand125:
      bandType = AgoraAudioEqualizationBand125;
      break;
    case AgoraAudioEqualizationBand250:
      bandType = AgoraAudioEqualizationBand250;
      break;
    case AgoraAudioEqualizationBand500:
      bandType = AgoraAudioEqualizationBand500;
      break;
    case AgoraAudioEqualizationBand1K:
      bandType = AgoraAudioEqualizationBand1K;
      break;
    case AgoraAudioEqualizationBand2K:
      bandType = AgoraAudioEqualizationBand2K;
      break;
    case AgoraAudioEqualizationBand4K:
      bandType = AgoraAudioEqualizationBand4K;
      break;
    case AgoraAudioEqualizationBand8K:
      bandType = AgoraAudioEqualizationBand8K;
      break;
    case AgoraAudioEqualizationBand16K:
      bandType = AgoraAudioEqualizationBand16K;
      break;
  }
  [self.rtcEngine setLocalVoiceEqualizationOfBandFrequency:bandType withGain:gain];
}

// set local voice reverb of type
RCT_EXPORT_METHOD(setLocalVoiceReverb:(NSInteger)reverb value:(NSInteger)value) {
  AgoraAudioReverbType reverbType = AgoraAudioReverbDryLevel;
  switch (reverb) {
    case AgoraAudioReverbDryLevel:
      reverbType = AgoraAudioReverbDryLevel;
      break;
    case AgoraAudioReverbWetLevel:
      reverbType = AgoraAudioReverbWetLevel;
      break;
    case AgoraAudioReverbRoomSize:
      reverbType = AgoraAudioReverbRoomSize;
      break;
    case AgoraAudioReverbWetDelay:
      reverbType = AgoraAudioReverbWetDelay;
      break;
    case AgoraAudioReverbStrength:
      reverbType = AgoraAudioReverbStrength;
      break;
  }
  [self.rtcEngine setLocalVoiceReverbOfType:reverb withValue:value];
}

// start audio mixing
RCT_EXPORT_METHOD(startAudioMixing:(NSDictionary *) options) {
  [self.rtcEngine startAudioMixing:[options[@"filepath"] stringValue]
                          loopback:[options[@"loopback"] boolValue]
                           replace:[options[@"replace"] boolValue]
                             cycle:[options[@"cycle"] integerValue]];
}

// stop audio mixing
RCT_EXPORT_METHOD(stopAudioMixing) {
  [self.rtcEngine stopAudioMixing];
}

// pause audio mixing
RCT_EXPORT_METHOD(pauseAudioMixing) {
  [self.rtcEngine pauseAudioMixing];
}

// resume audio mixing
RCT_EXPORT_METHOD(resumeAudioMixing) {
  [self.rtcEngine resumeAudioMixing];
}

// adjust audio mixing volume
RCT_EXPORT_METHOD(adjustAudioMixingVolume:(NSInteger) volume) {
  [self.rtcEngine adjustAudioMixingVolume:volume];
}

// adjust audio mixing playout volume
RCT_EXPORT_METHOD(adjustAudioMixingPlayoutVolume:(NSInteger) volume) {
  [self.rtcEngine adjustAudioMixingPlayoutVolume:volume];
}

// adjust audio mixing publish volume
RCT_EXPORT_METHOD(adjustAudioMixingPublishVolume:(NSInteger) volume) {
  [self.rtcEngine adjustAudioMixingPublishVolume:volume];
}

// get audio mixing duration
RCT_EXPORT_METHOD(getAudioMixingDuration
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine getAudioMixingDuration];
  if (res != 0) {
    reject(@"131004", @"getAudioMixingDuration failed", [self makeNSError:@{
                                                                            @"code": @(131004),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// get audio mixing current position
RCT_EXPORT_METHOD(getAudioMixingCurrentPosition
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine getAudioMixingDuration];
  if (res != 0) {
    reject(@"131005", @"getAudioMixingCurrentPosition failed", [self makeNSError:@{
                                                                                   @"code": @(131005),
                                                                                   @"message":@{
                                                                                       @"success": @(NO),
                                                                                       @"value":[NSNumber numberWithInteger:res]
                                                                                       }
                                                                                   }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set audio mixing position
RCT_EXPORT_METHOD(setAudioMixingPosition
                  :(NSInteger) pos
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setAudioMixingPosition:pos];
  if (res != 0) {
    reject(@"131006", @"setAudioMixingPosition failed", [self makeNSError:@{
                                                                            @"code": @(131006),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  } else {
    resolve(@{
              @"success": @(YES)
              });
  }
}

// get effects volume
RCT_EXPORT_METHOD(getEffectsVolume
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  double res = [self.rtcEngine getEffectsVolume];
  if (res != 0) {
    reject(@"131007", @"getEffectsVolume failed", [self makeNSError:@{
                                                                      @"code": @(131007),
                                                                      @"message":@{
                                                                          @"success": @(NO),
                                                                          @"value":@(res)
                                                                          }
                                                                      }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set effects volume
RCT_EXPORT_METHOD(setEffectsVolume
                  :(double) volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setEffectsVolume:volume];
  if (res != 0) {
    reject(@"131008", @"setEffectsVolume failed", [self makeNSError:@{
                                                                      @"code": @(131008),
                                                                      @"message":@{
                                                                          @"success": @(NO),
                                                                          @"value":@(res)
                                                                          }
                                                                      }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set volume of effect
RCT_EXPORT_METHOD(setVolumeOfEffect
                  :(NSInteger) soundId
                  volume:(double)volume
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setVolumeOfEffect:soundId withVolume:volume];
  if (res != 0) {
    reject(@"131009", @"setVolumeOfEffect failed", [self makeNSError:@{
                                                                       @"code": @(131009),
                                                                       @"message":@{
                                                                           @"success": @(NO),
                                                                           @"value":@(res)
                                                                           }
                                                                       }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// play effect
RCT_EXPORT_METHOD(playEffect
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine playEffect:(int)[options[@"soundid"] integerValue]
                                    filePath:[options[@"filepath"] stringValue]
                                   loopCount:(int)[options[@"loopcount"] integerValue]
                                       pitch:[options[@"pitch"] doubleValue]
                                         pan:[options[@"pan"] doubleValue]
                                        gain:[options[@"gain"] doubleValue]
                                     publish:[options[@"publish"] boolValue]];
  if (res != 0) {
    reject(@"131010", @"playEffect failed", [self makeNSError:@{
                                                                @"code": @(131010),
                                                                @"message":@{
                                                                    @"success": @(NO),
                                                                    @"value":@(res)
                                                                    }
                                                                }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// stop effect by soundId
RCT_EXPORT_METHOD(stopEffect
                  :(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopEffect:(int)soundId];
  if (res != 0) {
    reject(@"131011", @"stopEffect failed", [self makeNSError:@{
                                                                @"code": @(131011),
                                                                @"message":@{
                                                                    @"success": @(NO),
                                                                    @"value":@(res)
                                                                    }
                                                                }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// stopAllEffects
RCT_EXPORT_METHOD(stopAllEffects
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopAllEffects];
  if (res != 0) {
    reject(@"131012", @"stopAllEffects failed", [self makeNSError:@{
                                                                    @"code": @(131012),
                                                                    @"message":@{
                                                                        @"success": @(NO),
                                                                        @"value":@(res)
                                                                        }
                                                                    }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// preloadEffect
RCT_EXPORT_METHOD(preloadEffect
                  :(NSInteger) soundId
                  filePath:(NSString *)filePath
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine preloadEffect:(int)soundId filePath:filePath];
  if (res != 0) {
    reject(@"131013", @"preloadEffect failed", [self makeNSError:@{
                                                                   @"code": @(131013),
                                                                   @"message":@{
                                                                       @"success": @(NO),
                                                                       @"value":@(res)
                                                                       }
                                                                   }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// unload effect
RCT_EXPORT_METHOD(unloadEffect
                  :(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine unloadEffect:(int)soundId];
  if (res != 0) {
    reject(@"131014", @"unloadEffect failed", [self makeNSError:@{
                                                                  @"code": @(131014),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":@(res)
                                                                      }
                                                                  }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// pause effect by id
RCT_EXPORT_METHOD(pauseEffect
                  :(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine pauseEffect:(int)soundId];
  if (res != 0) {
    reject(@"131014", @"pauseEffect failed", [self makeNSError:@{
                                                                 @"code": @(131014),
                                                                 @"message":@{
                                                                     @"success": @(NO),
                                                                     @"value":@(res)
                                                                     }
                                                                 }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// pause all effects
RCT_EXPORT_METHOD(pauseAllEffects
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine pauseAllEffects];
  if (res != 0) {
    reject(@"131014", @"pauseAllEffects failed", [self makeNSError:@{
                                                                     @"code": @(131014),
                                                                     @"message":@{
                                                                         @"success": @(NO),
                                                                         @"value":@(res)
                                                                         }
                                                                     }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// resume effect by id
RCT_EXPORT_METHOD(resumeEffect:(NSInteger) soundId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine resumeEffect:(int)soundId];
  if (res != 0) {
    reject(@"131015", @"resumeEffect failed", [self makeNSError:@{
                                                                  @"code": @(131015),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":@(res)
                                                                      }
                                                                  }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// resume all effect
RCT_EXPORT_METHOD(resumeAllEffects
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine resumeAllEffects];
  if (res != 0) {
    reject(@"131016", @"resumeAllEffects failed", [self makeNSError:@{
                                                                      @"code": @(131016),
                                                                      @"message":@{
                                                                          @"success": @(NO),
                                                                          @"value":@(res)
                                                                          }
                                                                      }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// start audio recording quality
RCT_EXPORT_METHOD(startAudioRecording:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  AgoraAudioRecordingQuality qualityType = AgoraAudioRecordingQualityLow;
  switch ([options[@"quality"] integerValue]) {
    case AgoraAudioRecordingQualityLow:
      qualityType = AgoraAudioRecordingQualityLow;
      break;
    case AgoraAudioRecordingQualityHigh:
      qualityType = AgoraAudioRecordingQualityHigh;
      break;
    case AgoraAudioRecordingQualityMedium:
      qualityType = AgoraAudioRecordingQualityMedium;
      break;
  }
  NSInteger res = [self.rtcEngine startAudioRecording:[options[@"filepath"] stringValue] quality:qualityType];
  if (res != 0) {
    reject(@"131017", @"startAudioRecording failed", [self makeNSError:@{
                                                                         @"code": @(131017),
                                                                         @"message":@{
                                                                             @"success": @(NO),
                                                                             @"value":@(res)
                                                                             }
                                                                         }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// stop audio recording
RCT_EXPORT_METHOD(stopAudioRecording
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopAudioRecording];
  if (res != 0) {
    reject(@"131018", @"stopAudioRecording failed", [self makeNSError:@{
                                                                        @"code": @(131018),
                                                                        @"message":@{
                                                                            @"success": @(NO),
                                                                            @"value":@(res)
                                                                            }
                                                                        }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set audio session operation restriction
RCT_EXPORT_METHOD(setAudioSessionOperationRestriction
                  :(NSInteger) restriction) {
  AgoraAudioSessionOperationRestriction restrictionType = AgoraAudioSessionOperationRestrictionNone;
  switch (restriction) {
    case AgoraAudioSessionOperationRestrictionNone:
      restrictionType = AgoraAudioSessionOperationRestrictionNone;
      break;
    case AgoraAudioSessionOperationRestrictionSetCategory:
      restrictionType = AgoraAudioSessionOperationRestrictionSetCategory;
      break;
    case AgoraAudioSessionOperationRestrictionConfigureSession:
      restrictionType = AgoraAudioSessionOperationRestrictionConfigureSession;
      break;
    case AgoraAudioSessionOperationRestrictionDeactivateSession:
      restrictionType = AgoraAudioSessionOperationRestrictionDeactivateSession;
      break;
    case AgoraAudioSessionOperationRestrictionAll:
      restrictionType = AgoraAudioSessionOperationRestrictionAll;
      break;
  }
  [self.rtcEngine setAudioSessionOperationRestriction:restrictionType];
}

// deprecated
// gateway test start echo
//RCT_EXPORT_METHOD(startEchoTest
//                  :(RCTPromiseResolveBlock)resolve
//                  reject:(RCTPromiseRejectBlock)reject) {
//  NSInteger res = [self.rtcEngine startEchoTest:^(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed) {
//    _block(@{
//             @"channel": channel,
//             @"uid": @(uid),
//             @"elapsed": @(elapsed)
//             });
//  }];
//  if (res != 0) {
//    reject(@"131019", @"startEchoTest failed", [self makeNSError:@{
//                                                                   @"code": @(131019),
//                                                                   @"message":@{
//                                                                       @"success": @(NO),
//                                                                       @"value":@(res)
//                                                                       }
//                                                                   }]);
//  } else {
//    resolve(@{
//              @"success": @(YES),
//              @"value": @(res)
//              });
//  }
//}

// gateway test stop echo
RCT_EXPORT_METHOD(stopEchoTest
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine stopEchoTest];
  if (res != 0) {
    reject(@"131020", @"stopEchoTest failed", [self makeNSError:@{
                                                                  @"code": @(131020),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":@(res)
                                                                      }
                                                                  }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// enable last mile test
RCT_EXPORT_METHOD(enableLastmileTest
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableLastmileTest];
  if (res != 0) {
    reject(@"131021", @"enableLastmileTest failed", [self makeNSError:@{
                                                                        @"code": @(131021),
                                                                        @"message":@{
                                                                            @"success": @(NO),
                                                                            @"value":@(res)
                                                                            }
                                                                        }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// disable last mile test
RCT_EXPORT_METHOD(disableLastmileTest
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine disableLastmileTest];
  if (res != 0) {
    reject(@"131022", @"disableLastmileTest failed", [self makeNSError:@{
                                                                         @"code": @(131022),
                                                                         @"message":@{
                                                                             @"success": @(NO),
                                                                             @"value":@(res)
                                                                             }
                                                                         }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
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
  if (res != 0) {
    reject(@"131023", @"setRecordingAudioFrameParameters failed", [self makeNSError:@{
                                                                                                    @"code": @(131023),
                                                                                                    @"message":@{
                                                                                                        @"success": @(NO),
                                                                                                        @"value":@(res)
                                                                                                        }
                                                                                                    }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
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
  if (res != 0) {
    reject(@"131024", @"setPlaybackAudioFrameParameters failed", [self makeNSError:@{
                                                                                                   @"code": @(131024),
                                                                                                   @"message":@{
                                                                                                       @"success":@(NO),
                                                                                                       @"value":@(res)
                                                                                                       }
                                                                                                   }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set mixed audio frame parameters with sample rate
RCT_EXPORT_METHOD(setMixedAudioFrameParametersWithSampleRate
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setMixedAudioFrameParametersWithSampleRate:[options[@"sampleRate"] integerValue] samplesPerCall:[options[@"samplesPerCall"] integerValue]];
  if (res != 0) {
    reject(@"131025", @"setMixedAudioFrameParametersWithSampleRate failed", [self makeNSError:@{
                                                                                                @"code": @(131025),
                                                                                                @"message":@{
                                                                                                    @"success":@(NO),
                                                                                                    @"value":@(res)
                                                                                                    }
                                                                                                }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
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
  if (res != 0) {
    reject(@"131026", @"addVideoWatermark failed", [self makeNSError:@{
                                                                       @"code": @(131026),
                                                                       @"message":@{
                                                                           @"success":@(NO),
                                                                           @"value":@(res)
                                                                           }
                                                                       }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// clear video watermark
RCT_EXPORT_METHOD(clearVideoWatermarks
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine clearVideoWatermarks];
  if (res != 0) {
    reject(@"131027", @"clearVideoWatermarks failed", [self makeNSError:@{
                                                                          @"code": @(131027),
                                                                          @"message":@{
                                                                              @"success":@(NO),
                                                                              @"value":@(res)
                                                                              }
                                                                          }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set local publish fallback option
RCT_EXPORT_METHOD(setLocalPublishFallbackOption:(NSInteger)option
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalPublishFallbackOption:option];
  if (res != 0) {
    reject(@"131039", @"setLocalPublishFallbackOption failed", [self makeNSError:@{
                                                                          @"code": @(131039),
                                                                          @"message":@{
                                                                              @"success":@(NO),
                                                                              @"value":@(res)
                                                                              }
                                                                          }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set remote subscribe fallback option
RCT_EXPORT_METHOD(setRemoteSubscribeFallbackOption:(NSInteger)option
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteSubscribeFallbackOption:option];
  if (res != 0) {
    reject(@"131040", @"setRemoteSubscribeFallbackOption failed", [self makeNSError:@{
                                                                                   @"code": @(131040),
                                                                                   @"message":@{
                                                                                       @"success":@(NO),
                                                                                       @"value":@(res)
                                                                                       }
                                                                                   }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}


// enable dual stream mode
RCT_EXPORT_METHOD(enableDualStreamMode
                  :(BOOL) enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine enableDualStreamMode:enabled];
  if (res != 0) {
    reject(@"131028", @"enableDualStreamMode failed", [self makeNSError:@{
                                                                          @"code": @(131028),
                                                                          @"message":@{
                                                                              @"success":@(NO),
                                                                              @"value":@(res)
                                                                              }
                                                                          }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set remote video stream
RCT_EXPORT_METHOD(setRemoteVideoStreamType
                  :(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteVideoStream:[options[@"uid"] integerValue]
                                                  type:(AgoraVideoStreamType)[options[@"streamType"] integerValue]];
  if (res != 0) {
    reject(@"131029", @"setRemoteVideoStreamType failed", [self makeNSError:@{
                                                                          @"code": @(131029),
                                                                          @"message":@{
                                                                              @"success":@(NO),
                                                                              @"value":@(res)
                                                                              }
                                                                          }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// set remote default video stream
RCT_EXPORT_METHOD(setRemoteDefaultVideoStreamType
                  :(NSDictionary *) options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setRemoteDefaultVideoStreamType:(AgoraVideoStreamType)[options[@"streamType"] integerValue]];
  if (res != 0) {
    reject(@"131030", @"setRemoteDefaultVideoStreamType failed", [self makeNSError:@{
                                                                                     @"code": @(131030),
                                                                                     @"message":@{
                                                                                         @"success":@(NO),
                                                                                         @"value":@(res)
                                                                                         }
                                                                                     }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
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
  if (res != 0) {
    reject(@"131031", @"addInjectStreamUrl failed", [self makeNSError:@{
                                                                        @"code": @(131031),
                                                                        @"message":@{
                                                                            @"success":@(NO),
                                                                            @"value":@(res)
                                                                            }
                                                                        }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// remove injection stream url
RCT_EXPORT_METHOD(removeInjectStreamUrl
                  :(NSString *)url
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  NSInteger res = [self.rtcEngine removeInjectStreamUrl:url];
  if (res != 0) {
    reject(@"131032", @"removeInjectStreamUrl failed", [self makeNSError:@{
                                                                           @"code": @(131032),
                                                                           @"message":@{
                                                                               @"success":@(NO),
                                                                               @"value":@(res)
                                                                               }
                                                                           }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// deprecated
// set video quality
//RCT_EXPORT_METHOD(setVideoQualityParameters
//                  :(BOOL) quality
//                  resolve:(RCTPromiseResolveBlock)resolve
//                  reject:(RCTPromiseRejectBlock)reject) {
//  NSInteger res = [self.rtcEngine setVideoQualityParameters:quality];
//  if (res == 0) {
//    resolve(@{@"success": @(YES)});
//  } else {
//    reject(@"131033", @"setVideoQualityParameters failed", [self makeNSError:@{
//                                                                               @"code": @(131033),
//                                                                               @"message":@{
//                                                                                   @"success": @(NO),
//                                                                                   @"value":[NSNumber numberWithInteger:res]
//                                                                                   }
//                                                                               }]);
//  }
//}

// set local video mirror mode
RCT_EXPORT_METHOD(setLocalVideoMirrorMode
                  :(NSInteger) mode
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine setLocalVideoMirrorMode:(AgoraVideoMirrorMode) mode];
  if (res == 0) {
    resolve(@{@"success": @(YES)});
  } else {
    reject(@"131034", @"setLocalVideoMirroMode failed", [self makeNSError:@{
                                                                            @"code": @(131034),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  }
}

// switchCamera
RCT_EXPORT_METHOD(switchCamera
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  NSInteger res = [self.rtcEngine switchCamera];
  if (res == 0) {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  } else {
    reject(@"131035", @"switchCamera failed", [self makeNSError:@{
                                                                  @"code": @(131035),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":[NSNumber numberWithInteger:res]
                                                                      }
                                                                  }]);
  }
}

// isCameraZoomSupported
RCT_EXPORT_METHOD(isCameraZoomSupported
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine isCameraZoomSupported];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
  
}

// isCameraTorchSupported
RCT_EXPORT_METHOD(isCameraTorchSupported
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine isCameraTorchSupported];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// isCameraFocusSupported
RCT_EXPORT_METHOD(isCameraFocusSupported
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine isCameraFocusPositionInPreviewSupported];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// isCameraExposurePositionSupported
RCT_EXPORT_METHOD(isCameraExposurePositionSupported
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine isCameraExposurePositionSupported];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// isCameraAutoFocusFaceModeSupported
RCT_EXPORT_METHOD(isCameraAutoFocusFaceModeSupported
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine isCameraAutoFocusFaceModeSupported];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// setCameraZoomFactor
RCT_EXPORT_METHOD(setCameraZoomFactor
                  :(float)zoomFactor
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraZoomFactor:(CGFloat)zoomFactor];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// setCameraFocusPositionInPreview
RCT_EXPORT_METHOD(setCameraFocusPositionInPreview
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  dispatch_sync(dispatch_get_main_queue(), ^{
    BOOL res = [self.rtcEngine setCameraFocusPositionInPreview:CGPointMake((CGFloat)[options[@"x"] floatValue], (CGFloat)[options[@"y"] floatValue])];
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  });
}

// setCameraExposurePosition
RCT_EXPORT_METHOD(setCameraExposurePosition
                  :(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraExposurePosition:CGPointMake((CGFloat)[options[@"x"] floatValue], (CGFloat)[options[@"y"] floatValue])];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// enable camera torch
RCT_EXPORT_METHOD(setCameraTorchOn:(BOOL)isOn
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraTorchOn:isOn];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// enable auto focus face mode
RCT_EXPORT_METHOD(setCameraAutoFocusFaceModeEnabled:(BOOL)enable
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  BOOL res = [self.rtcEngine setCameraAutoFocusFaceModeEnabled:enable];
  resolve(@{
            @"success": @(YES),
            @"value": @(res)
            });
}

// getCallId
RCT_EXPORT_METHOD(getCallId
                  :(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  resolve(@{
            @"success": @(YES),
            @"value": [self.rtcEngine getCallId]
            });
}

// setLogFile and setLogFilter
RCT_EXPORT_METHOD(setLog
                  :(NSString *)filePath
                    level:(NSUInteger)level
                    size:(NSUInteger)size
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine setLogFileSize:size];
  if (res != 0) {
    reject(@"131036", @"setLogFileSize failed", [self makeNSError:@{
                                                                  @"code": @(131036),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":[NSNumber numberWithInteger:res]
                                                                      }
                                                                  }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
  
  res = [self.rtcEngine setLogFilter:level];
  if (res != 0) {
    reject(@"131036", @"setLogFilter failed", [self makeNSError:@{
                                                                  @"code": @(131036),
                                                                  @"message":@{
                                                                      @"success": @(NO),
                                                                      @"value":[NSNumber numberWithInteger:res]
                                                                      }
                                                                  }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
  res = [self.rtcEngine setLogFile:filePath];
  if (res != 0) {
    reject(@"131037", @"setLogFile failed", [self makeNSError:@{
                                                                @"code": @(131037),
                                                                @"message":@{
                                                                    @"success": @(NO),
                                                                    @"value":[NSNumber numberWithInteger:res]
                                                                    }
                                                                }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

// get sdk version
RCT_EXPORT_METHOD(getSdkVersion
                  :(RCTPromiseResolveBlock) resolve
                  reject:(RCTPromiseRejectBlock) reject) {
  resolve(@[[AgoraRtcEngineKit getSdkVersion]]);
}

// add publish stream url
RCT_EXPORT_METHOD(addPublishStreamUrl:(NSDictionary *)options) {
  [self.rtcEngine addPublishStreamUrl:options[@"url"] transcodingEnabled:[options[@"enable"] boolValue]];
}

// remove publish stream url
RCT_EXPORT_METHOD(removePublishStreamUrl:(NSDictionary *)options) {
  [self.rtcEngine removePublishStreamUrl:options[@"url"]];
}

// set living transcoding
RCT_EXPORT_METHOD(setLiveTranscoding:(NSDictionary *)options) {
  AgoraLiveTranscoding *transcoding = AgoraLiveTranscoding.defaultTranscoding;
  if (options[@"size"] != nil) {
    transcoding.size = CGSizeMake([options[@"size"][@"width"] doubleValue], [options[@"size"][@"height"] doubleValue]);
  }
  if (options[@"videoBitrate"] != nil) {
    transcoding.videoBitrate = [options[@"videoBitrate"] integerValue];
  }
  if (options[@"videoFramerate"] != nil) {
    transcoding.videoFramerate = [options[@"videoFramerate"] integerValue];
  }
  if (options[@"lowLatency"] != nil) {
    transcoding.lowLatency = [options[@"lowLatancy"] boolValue];
  }
  if (options[@"videoGop"] != nil) {
    transcoding.videoGop = [options[@"videoGop"] integerValue];
  }
  if (options[@"videoCodecProfile"] != nil) {
    transcoding.videoCodecProfile = (AgoraVideoCodecProfileType)[options[@"videoCodecProfile"] integerValue];
  }
  if (options[@"transcodingUsers"] != nil) {
    NSMutableArray<AgoraLiveTranscodingUser*> *transcodingUsers = [NSMutableArray new];
    for (NSDictionary *optionUser in options[@"users"]) {
      AgoraLiveTranscodingUser *liveUser = [AgoraLiveTranscodingUser new];
      liveUser.uid = (NSUInteger)[optionUser[@"uid"] integerValue];
      liveUser.rect = CGRectMake((CGFloat)[options[@"backgroundColor"][@"x"] floatValue], (CGFloat)[options[@"backgroundColor"][@"y"] floatValue], (CGFloat)[options[@"backgroundColor"][@"width"] floatValue], (CGFloat)[options[@"backgroundColor"][@"height"] floatValue]);
      liveUser.zOrder = [optionUser[@"zOrder"] integerValue];
      liveUser.alpha = [optionUser[@"alpha"] doubleValue];
      liveUser.audioChannel = [optionUser[@"audioChannel"] integerValue];
      [transcodingUsers addObject:liveUser];
    }
    transcoding.transcodingUsers = transcodingUsers;
  }
  if (options[@"transcodingExtraInfo"] != nil) {
    transcoding.transcodingExtraInfo = [options[@"transcodingExtraInfo"] stringValue];
  }
  if (options[@"watermark"] != nil) {
    transcoding.watermark = [self makeAgoraImage:@{
                                                   @"url": options[@"watermark"][@"url"],
                                                   @"x": options[@"watermark"][@"x"],
                                                   @"y": options[@"watermark"][@"y"],
                                                   @"width": options[@"watermark"][@"width"],
                                                   @"height": options[@"watermark"][@"height"]
                                                   }];
  }
  if (options[@"backgroundImage"] != nil) {
    transcoding.backgroundImage = [self makeAgoraImage:@{
                                                         @"url": options[@"backgroundImage"][@"url"],
                                                         @"x": options[@"backgroundImage"][@"x"],
                                                         @"y": options[@"backgroundImage"][@"y"],
                                                         @"width": options[@"backgroundImage"][@"width"],
                                                         @"height": options[@"backgroundImage"][@"height"]
                                                         }];
  }
  if (options[@"backgroundColor"] != nil) {
    transcoding.backgroundColor = [[UIColor new] initWithRed:(CGFloat)[options[@"backgroundColor"][@"red"] floatValue] green:(CGFloat)[options[@"backgroundColor"][@"green"] floatValue] blue:(CGFloat)[options[@"backgroundColor"][@"blue"] floatValue] alpha:(CGFloat)[options[@"backgroundColor"][@"alpha"] floatValue]];
  }
  if (options[@"audioSampleRate"] != nil) {
    transcoding.audioSampleRate = (AgoraAudioSampleRateType)[options[@"audioSampleRate"] integerValue];
  }
  if (options[@"audioBitrate"] != nil) {
    transcoding.audioBitrate = [options[@"audioBitrate"] integerValue];
  }
  if (options[@"audioChannels"] != nil) {
    transcoding.audioChannels = [options[@"audioChannels"] integerValue];
  }
  
  [self.rtcEngine setLiveTranscoding:transcoding];
}

RCT_EXPORT_METHOD(setBeautyEffectOptions:(bool) enabled
                  options:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine setBeautyEffectOptions:enabled options:options];
  if (res != 0) {
    reject(@"131037", @"setBeautyEffectOptions failed", [self makeNSError:@{
                                                                @"code": @(131037),
                                                                @"message":@{
                                                                    @"success": @(NO),
                                                                    @"value":[NSNumber numberWithInteger:res]
                                                                    }
                                                                }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

RCT_EXPORT_METHOD(setLocalVoiceChanger:(NSInteger) voiceChanger
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine setLocalVoiceChanger:(AgoraAudioVoiceChanger)voiceChanger];
  if (res != 0) {
    reject(@"131037", @"setBeautyEffectOptions failed", [self makeNSError:@{
                                                                            @"code": @(131037),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

RCT_EXPORT_METHOD(setLocalVoiceReverbPreset:(NSInteger) reverbPreset
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine setLocalVoiceReverbPreset:(AgoraAudioReverbPreset)reverbPreset];
  if (res != 0) {
    reject(@"131037", @"setLocalVoiceReverbPreset failed", [self makeNSError:@{
                                                                            @"code": @(131037),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

RCT_EXPORT_METHOD(enableSoundPositionIndication:(bool) enabled
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine enableSoundPositionIndication:enabled];
  if (res != 0) {
    reject(@"131037", @"enableSoundPositionIndication failed", [self makeNSError:@{
                                                                               @"code": @(131037),
                                                                               @"message":@{
                                                                                   @"success": @(NO),
                                                                                   @"value":[NSNumber numberWithInteger:res]
                                                                                   }
                                                                               }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

RCT_EXPORT_METHOD(setRemoteVoicePosition:(NSInteger) uid
                  pan:(float)pan
                  gain:(float)gain
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  int res = [self.rtcEngine setRemoteVoicePosition:uid pan:pan gain: gain];
  if (res != 0) {
    reject(@"131037", @"setRemoteVoicePosition failed", [self makeNSError:@{
                                                                                   @"code": @(131037),
                                                                                   @"message":@{
                                                                                       @"success": @(NO),
                                                                                       @"value":[NSNumber numberWithInteger:res]
                                                                                       }
                                                                                   }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
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

  int res = [self.rtcEngine startLastmileProbeTest:probeConfig];
  if (res != 0) {
    reject(@"131037", @"startLastmileProbeTest failed", [self makeNSError:@{
                                                                            @"code": @(131037),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}


RCT_EXPORT_METHOD(setRemoteUserPriority:(NSUInteger)uid
                  userPriority:(NSInteger)userPriority
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
 
  int res = [self.rtcEngine setRemoteUserPriority:uid type:(AgoraUserPriority)userPriority];
  if (res != 0) {
    reject(@"131037", @"setRemoteUserPriority failed", [self makeNSError:@{
                                                                            @"code": @(131037),
                                                                            @"message":@{
                                                                                @"success": @(NO),
                                                                                @"value":[NSNumber numberWithInteger:res]
                                                                                }
                                                                            }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

RCT_EXPORT_METHOD(startEchoTestWithInterval:(NSInteger)interval
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  int res = [self.rtcEngine startEchoTestWithInterval:interval successBlock:^(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed) {
    [self sendEvent:AGIntervalTest params:@{
                                            @"message": @"StartEchoTestWithInterval",
                                            @"channel": channel,
                                            @"uid": @(uid),
                                            @"elapsed": @(elapsed),
                                            }];
  }];
  if (res != 0) {
    reject(@"131037", @"startEchoTestWithInterval failed", [self makeNSError:@{
                                                                           @"code": @(131037),
                                                                           @"message":@{
                                                                               @"success": @(NO),
                                                                               @"value":[NSNumber numberWithInteger:res]
                                                                               }
                                                                           }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

RCT_EXPORT_METHOD(setCameraCapturerConfiguration:(NSDictionary *)config
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  
  AgoraCameraCapturerConfiguration* configuration = [[AgoraCameraCapturerConfiguration alloc] init];
  configuration.preference = [config[@"preference"] integerValue];
  
  int res = [self.rtcEngine setCameraCapturerConfiguration:configuration];
  if (res != 0) {
    reject(@"131037", @"setCameraCapturerConfiguration failed", [self makeNSError:@{
                                                                               @"code": @(131037),
                                                                               @"message":@{
                                                                                   @"success": @(NO),
                                                                                   @"value":[NSNumber numberWithInteger:res]
                                                                                   }
                                                                               }]);
  } else {
    resolve(@{
              @"success": @(YES),
              @"value": @(res)
              });
  }
}

- (NSArray<NSString *> *)supportedEvents {
  return @[
           AGWarning,
           AGError,
           AGApiCallExecute,
           AGJoinChannelSuccess,
           AGRejoinChannelSuccess,
           AGLeaveChannel,
           AGClientRoleChanged,
           AGUserJoined,
           AGUserOffline,
           AGConnectionStateChanged,
           AGConnectionLost,
           AGTokenPrivilegeWillExpire,
           AGRequestToken,
           
           AGMicrophoneEnabled,
           AGAudioVolumeIndication,
           AGActiveSpeaker,
           AGFirstLocalAudioFrame,
           AGFirstRemoteAudioFrame,
           AGVideoStopped,
           AGFirstLocalVideoFrame,
           AGFirstRemoteVideoDecoded,
           AGFirstRemoteVideoFrame,
           AGUserMuteAudio,
           AGUserMuteVideo,
           AGUserEnableVideo,
           AGUserEnableLocalVideo,
           AGVideoSizeChanged,
           AGRemoteVideoStateChanged,
           AGLocalPublishFallbackToAudioOnly,
           AGRemoteSubscribeFallbackToAudioOnly,
           
           AGAudioRouteChanged,
           AGCameraReady,
           AGCameraFocusAreaChanged,
           AGCameraExposureAreaChanged,
           
           AGRtcStats,
           AGLastmileQuality,
           AGNetworkQuality,
           AGLocalVideoStats,
           AGRemoteVideoStats,
           AGRemoteAudioStats,
           AGAudioTransportStatsOfUid,
           AGVideoTransportStatsOfUid,
           
           AGLocalAudioMixingFinish,
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
           AGAudioMixingStateChanged,
           AGLastmileProbeTestResult
           ];
}

- (void) sendEvent:(NSString *)msg params:(NSDictionary *)params {
  if (hasListeners) {
    [self sendEventWithName:msg body:params];
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
  [self sendEvent:AGWarning params:@{@"message": @"AgoraWarning", @"code": @(warningCode)}];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOccurError:(AgoraErrorCode)errorCode {
  [self sendEvent:AGError params:@{@"message": @"AgoraError", @"code": @(errorCode)}];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didApiCallExecute:(NSInteger)error api:(NSString *_Nonnull)api result:(NSString *_Nonnull)result {
  if (error != 0) {
    [self sendEvent:AGError  params:@{
                                            @"api": api,
                                            @"result": result,
                                            @"error": @(error)
                                            }];
  } else {
    [self sendEvent:AGApiCallExecute  params:@{
                                            @"api": api,
                                            @"result": result,
                                            @"error": @(error)
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

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOfflineOfUid:(NSUInteger)uid reason:(AgoraUserOfflineReason)reason {
  [self sendEvent:AGUserOffline params:@{
                                           @"uid": @(uid),
                                           @"reason": @(reason)
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

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didMicrophoneEnabled:(BOOL)enabled {
  [self sendEvent:AGMicrophoneEnabled params:@{
                                                @"enabled": @(enabled)
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

- (void)rtcEngineVideoDidStop:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGVideoStopped params:@{
                                        @"message": @"VideoStopped"
                                        }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstLocalVideoFrameWithSize:(CGSize)size elapsed:(NSInteger)elapsed {
  [self sendEvent:AGFirstLocalVideoFrame params:@{
                                                        @"width": @(size.width),
                                                        @"height": @(size.height),
                                                        @"elapsed": @(elapsed)
                                                        }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine firstRemoteVideoDecodedOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed {
  [self sendEvent:AGFirstRemoteVideoDecoded params:@{
                                                        @"uid": @(uid),
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

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didVideoMuted:(BOOL)muted byUid:(NSUInteger)uid {
  [self sendEvent:AGUserMuteVideo params:@{
                                         @"muted": @(muted),
                                         @"uid": @(uid)
                                         }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didVideoEnabled:(BOOL)enabled byUid:(NSUInteger)uid {
  [self sendEvent:AGUserEnableVideo params:@{
                                           @"enabled": @(enabled),
                                           @"uid": @(uid)
                                           }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didLocalVideoEnabled:(BOOL)enabled byUid:(NSUInteger)uid {
  [self sendEvent:AGUserEnableLocalVideo params:@{
                                                @"enabled": @(enabled),
                                                @"uid": @(uid)
                                                }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine videoSizeChangedOfUid:(NSUInteger)uid size:(CGSize)size rotation:(NSInteger)rotation {
  [self sendEvent:AGVideoSizeChanged params:@{
                                                 @"uid": @(uid),
                                                 @"width": @(size.width),
                                                 @"height": @(size.height),
                                                 @"roration": @(rotation)
                                                 }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine remoteVideoStateChangedOfUid:(NSUInteger)uid state:(AgoraVideoRemoteState)state {
  [self sendEvent:AGRemoteVideoStateChanged params:@{
                                                        @"uid": @(uid),
                                                        @"state": @(state)
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

- (void)rtcEngineCameraDidReady:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGCameraReady params:@{
                                          @"message": @"CameraDidReady"
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
                                                @"audioLossRate": @(stats.audioLossRate)
                                                }
                                            }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine reportRtcStats:(AgoraChannelStats *_Nonnull)stats {
  [self sendEvent:AGRtcStats params:@{
                                          @"stats": @{
                                              @"duration": @(stats.duration),
                                              @"txBytes": @(stats.txBytes),
                                              @"rxBytes": @(stats.rxBytes),
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
                                               }
                                           }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine remoteVideoStats:(AgoraRtcRemoteVideoStats *_Nonnull)stats {
  [self sendEvent:AGRemoteVideoStats params:@{
                                            @"stats": @{
                                                @"uid": @(stats.uid),
                                                @"width": @(stats.width),
                                                @"height": @(stats.height),
                                                @"receivedBitrate": @(stats.receivedBitrate),
                                                @"receivedFrameRate": @(stats.receivedFrameRate),
                                                @"rxStreamType": @(stats.rxStreamType)
                                                }
                                            }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine audioTransportStatsOfUid:(NSUInteger)uid delay:(NSUInteger)delay lost:(NSUInteger)lost rxKBitRate:(NSUInteger)rxKBitRate {
  [self sendEvent:AGAudioTransportStatsOfUid params:@{
                                                    @"uid": @(uid),
                                                    @"delay": @(delay),
                                                    @"lost": @(lost),
                                                    @"rxKBitrate": @(rxKBitRate)
                                                    }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine videoTransportStatsOfUid:(NSUInteger)uid delay:(NSUInteger)delay lost:(NSUInteger)lost rxKBitRate:(NSUInteger)rxKBitRate {
  [self sendEvent:AGVideoTransportStatsOfUid params:@{
                                                    @"uid": @(uid),
                                                    @"delay": @(delay),
                                                    @"lost": @(lost),
                                                    @"rxKBitrate": @(rxKBitRate)
                                                    }];
}

- (void)rtcEngineLocalAudioMixingDidFinish:(AgoraRtcEngineKit *_Nonnull)engine {
  [self sendEvent:AGLocalAudioMixingFinish params:@{
                                                     @"message": @"LocalAudioMixingSucceedFinish"
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
                                           @"code": @(errorCode)
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

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine streamInjectedStatusOfUrl:(NSString *_Nonnull)url uid:(NSUInteger)uid status:(AgoraInjectStreamStatus)status {
  [self sendEvent:AGStreamInjectedStatus params:@{
                                                @"uid": @(uid),
                                                @"url": url,
                                                @"status": @(status)
                                                }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine receiveStreamMessageFromUid:(NSUInteger)uid streamId:(NSInteger)streamId data:(NSData *_Nonnull)data {
  [self sendEvent:AGReceiveStreamMessage params:@{
                                                @"uid": @(uid),
                                                @"streamId": @(streamId),
                                                @"data": data
                                                }];
}

- (void)rtcEngine:(AgoraRtcEngineKit *_Nonnull)engine didOccurStreamMessageErrorFromUid:(NSUInteger)uid streamId:(NSInteger)streamId error:(NSInteger)error missed:(NSInteger)missed cached:(NSInteger)cached {
  [self sendEvent:AGOccurStreamMessageError params:@{
                                                      @"uid": @(uid),
                                                      @"streamId": @(streamId),
                                                      @"error": @(error),
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
