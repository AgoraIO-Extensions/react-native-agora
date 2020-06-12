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
    (NSString *) appId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(destroy:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setChannelProfile:
    (int) profile :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setClientRole:
    (int) role :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(joinChannel:
    (NSString *) token :(NSString *) channelName :(NSString *) optionalInfo :(int) optionalUid :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(switchChanne:
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
    (NSString *) callId :(int) rating :(NSString *) description :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(complain:
    (NSString *) callId :(NSString *) description :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLogFile:
    (NSString *) filePath :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLogFilter:
    (int) filter :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLogFileSize:
    (int) fileSizeInKBytes :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setParameters:
    (NSString *) parameters :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(registerLocalUserAccount:
    (NSString *) appId :(NSString *) userAccount :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(joinChannelWithUserAccount:
    (NSString *) token :(NSString *) channelName :(NSString *) userAccount :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getUserInfoByUserAccount:
    (NSString *) userAccount :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getUserInfoByUid:
    (int) uid :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableAudio:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(disableAudio:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAudioProfile:
    (int) profile :(int) scenario :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustRecordingSignalVolume:
    (int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustUserPlaybackSignalVolume:
    (int) uid :(int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustPlaybackSignalVolume:
    (int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableLocalAudio:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteLocalAudioStream:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteRemoteAudioStream:
    (int) uid :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteAllRemoteAudioStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultMuteAllRemoteAudioStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableAudioVolumeIndication:
    (int) interval :(int) smooth :(BOOL) report_vad :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

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
    (int) uid :(BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(muteAllRemoteVideoStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setDefaultMuteAllRemoteVideoStreams:
    (BOOL) muted :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setBeautyEffectOptions:
    (BOOL) enabled :(NSDictionary *) options :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startAudioMixing:
    (NSString *) filePath :(BOOL) loopback :(BOOL) replace :(int) cycle :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopAudioMixing:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(pauseAudioMixing:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(resumeAudioMixing:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustAudioMixingVolume:
    (int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustAudioMixingPlayoutVolume:
    (int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(adjustAudioMixingPublishVolume:
    (int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingPlayoutVolume:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingPublishVolume:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingDuration:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getAudioMixingCurrentPosition:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAudioMixingPosition:
    (int) pos :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setAudioMixingPitch:
    (int) pitch :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getEffectsVolume:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEffectsVolume:
    (double) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setVolumeOfEffect:
    (int) soundId :(double) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(playEffect:
    (int) soundId :(NSString *) filePath :(int) loopCount :(double) pitch :(double) pan :(double) gain :(BOOL) publish :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopEffect:
    (int) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(stopAllEffects:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(preloadEffect:
    (int) soundId :(NSString *) filePath :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(unloadEffect:
    (int) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(pauseEffect:
    (int) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(pauseAllEffects:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(resumeEffect:
    (int) soundId :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(resumeAllEffects:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceChanger:
    (int) voiceChanger :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceReverbPreset:
    (int) preset :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoicePitch:
    (double) pitch :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceEqualization:
    (int) bandFrequency :(int) bandGain :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalVoiceReverb:
    (int) reverbKey :(int) value :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableSoundPositionIndication:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteVoicePosition:
    (int) uid :(double) pan :(double) gain :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

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
    (int) volume :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(enableDualStreamMode:
    (BOOL) enabled :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteVideoStreamType:
    (int) uid :(int) streamType :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteDefaultVideoStreamType:
    (int) streamType :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setLocalPublishFallbackOption:
    (int) option :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteSubscribeFallbackOption:
    (int) option :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setRemoteUserPriority:
    (int) uid :(int) userPriority :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startEchoTest:
    (int) intervalInSeconds :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

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
    (int) size :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(sendMetadata:
    (int) metadata :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(addVideoWatermark:
    (NSString *) watermarkUrl :(NSDictionary *) options :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(clearVideoWatermarks:
    (RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEncryptionSecret:
    (NSString *) secret :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(setEncryptionMode:
    (NSString *) encryptionMode :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(startAudioRecording:
    (NSString *) filePath :(int) sampleRate :(int) quality :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

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
    (int) streamId :(NSString *) message :(RCTPromiseResolveBlock) resolve :(RCTPromiseRejectBlock) reject)

@end
