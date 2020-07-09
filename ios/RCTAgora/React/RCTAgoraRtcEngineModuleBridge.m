//
//  RCTAgoraRtcEngineModuleBridge.m
//  RCTAgora
//
//  Created by LXH on 2020/4/14.
//  Copyright © 2020 Syan. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(RCTAgoraRtcEngineModule, NSObject)

RCT_EXTERN_METHOD(create:
    (NSString *) appId :(NSInteger) areaCode :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(destroy:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setChannelProfile:
    (NSInteger) profile :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setClientRole:
    (NSInteger) role :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(joinChannel:
    (NSString *) token :(NSString *) channelName :(NSString *) optionalInfo :(NSInteger) optionalUid :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(switchChannel:
    (NSString *) token :(NSString *) channelName :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(leaveChannel:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(renewToken:
    (NSString *) token :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableWebSdkInteroperability:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getConnectionState:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getCallId:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(rate:
    (NSString *) callId :(NSInteger) rating :(NSString *) description :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(complain:
    (NSString *) callId :(NSString *) description :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLogFile:
    (NSString *) filePath :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLogFilter:
    (NSInteger) filter :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLogFileSize:
    (NSInteger) fileSizeInKBytes :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setParameters:
    (NSString *) parameters :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(registerLocalUserAccount:
    (NSString *) appId :(NSString *) userAccount :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(joinChannelWithUserAccount:
    (NSString *) token :(NSString *) channelName :(NSString *) userAccount :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getUserInfoByUserAccount:
    (NSString *) userAccount :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getUserInfoByUid:
    (NSInteger) uid :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableAudio:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(disableAudio:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAudioProfile:
    (NSInteger) profile :(NSInteger) scenario :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustRecordingSignalVolume:
    (NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustUserPlaybackSignalVolume:
    (NSInteger) uid :(NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustPlaybackSignalVolume:
    (NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableLocalAudio:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteLocalAudioStream:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteRemoteAudioStream:
    (NSInteger) uid :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteAllRemoteAudioStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultMuteAllRemoteAudioStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableAudioVolumeIndication:
    (NSInteger) interval :(NSInteger) smooth :(BOOL) report_vad :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableVideo:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(disableVideo:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setVideoEncoderConfiguration:
    (NSDictionary *) config :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableLocalVideo:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteLocalVideoStream:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteRemoteVideoStream:
    (NSInteger) uid :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteAllRemoteVideoStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultMuteAllRemoteVideoStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setBeautyEffectOptions:
    (BOOL) enabled :(NSDictionary *) options :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startAudioMixing:
    (NSString *) filePath :(BOOL) loopback :(BOOL) replace :(NSInteger) cycle :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopAudioMixing:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(pauseAudioMixing:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(resumeAudioMixing:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustAudioMixingVolume:
    (NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustAudioMixingPlayoutVolume:
    (NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustAudioMixingPublishVolume:
    (NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingPlayoutVolume:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingPublishVolume:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingDuration:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingCurrentPosition:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAudioMixingPosition:
    (NSInteger) pos :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAudioMixingPitch:
    (NSInteger) pitch :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getEffectsVolume:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEffectsVolume:
    (double) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setVolumeOfEffect:
    (NSInteger) soundId :(double) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(playEffect:
    (NSInteger) soundId :(NSString *) filePath :(NSInteger) loopCount :(double) pitch :(double) pan :(double) gain :(BOOL) publish :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopEffect:
    (NSInteger) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopAllEffects:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(preloadEffect:
    (NSInteger) soundId :(NSString *) filePath :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(unloadEffect:
    (NSInteger) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(pauseEffect:
    (NSInteger) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(pauseAllEffects:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(resumeEffect:
    (NSInteger) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(resumeAllEffects:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceChanger:
    (NSInteger) voiceChanger :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceReverbPreset:
    (NSInteger) preset :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoicePitch:
    (double) pitch :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceEqualization:
    (NSInteger) bandFrequency :(NSInteger) bandGain :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceReverb:
    (NSInteger) reverbKey :(NSInteger) value :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableSoundPositionIndication:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteVoicePosition:
    (NSInteger) uid :(double) pan :(double) gain :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLiveTranscoding:
    (NSDictionary *) transcoding :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(addPublishStreamUrl:
    (NSString *) url :(BOOL) transcodingEnabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(removePublishStreamUrl:
    (NSString *) url :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startChannelMediaRelay:
    (NSDictionary *) channelMediaRelayConfiguration :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(updateChannelMediaRelay:
    (NSDictionary *) channelMediaRelayConfiguration :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopChannelMediaRelay:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultAudioRoutetoSpeakerphone:
    (BOOL) defaultToSpeaker :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEnableSpeakerphone:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(isSpeakerphoneEnabled:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableInEarMonitoring:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setInEarMonitoringVolume:
    (NSInteger) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableDualStreamMode:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteVideoStreamType:
    (NSInteger) uid :(NSInteger) streamType :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteDefaultVideoStreamType:
    (NSInteger) streamType :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalPublishFallbackOption:
    (NSInteger) option :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteSubscribeFallbackOption:
    (NSInteger) option :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteUserPriority:
    (NSInteger) uid :(NSInteger) userPriority :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startEchoTest:
    (NSInteger) intervalInSeconds :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopEchoTest:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableLastmileTest:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(disableLastmileTest:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startLastmileProbeTest:
    (NSDictionary *) config :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopLastmileProbeTest:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(registerMediaMetadataObserver:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(unregisterMediaMetadataObserver:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setMaxMetadataSize:
    (NSInteger) size :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(sendMetadata:
    (NSString *) metadata :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(addVideoWatermark:
    (NSString *) watermarkUrl :(NSDictionary *) options :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(clearVideoWatermarks:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEncryptionSecret:
    (NSString *) secret :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEncryptionMode:
    (NSString *) encryptionMode :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startAudioRecording:
    (NSString *) filePath :(NSInteger) sampleRate :(NSInteger) quality :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopAudioRecording:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(addInjectStreamUrl:
    (NSString *) url :(NSDictionary *) config :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(removeInjectStreamUrl:
    (NSString *) url :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(switchCamera:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(isCameraZoomSupported:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(isCameraTorchSupported:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(isCameraFocusSupported:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(isCameraExposurePositionSupported:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(isCameraAutoFocusFaceModeSupported:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setCameraZoomFactor:
    (float) factor :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getCameraMaxZoomFactor:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setCameraFocusPositionInPreview:
    (float) positionX :(float) positionY :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setCameraExposurePosition:
    (float) positionXinView :(float) positionYinView :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableFaceDetection:
    (BOOL) enable :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setCameraTorchOn:
    (BOOL) isOn :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setCameraAutoFocusFaceModeEnabled:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setCameraCapturerConfiguration:
    (NSDictionary *) config :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(createDataStream:
    (BOOL) reliable :(BOOL) ordered :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(sendStreamMessage:
    (NSInteger) streamId :(NSString *) message :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

@end
