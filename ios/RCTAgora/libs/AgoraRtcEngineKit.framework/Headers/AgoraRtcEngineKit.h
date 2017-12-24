//
//  AgoraRtcEngineKit.h
//  AgoraRtcEngineKit
//
//  Created by Sting Feng on 2015-8-11.
//  Copyright (c) 2015 Agora. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

#if TARGET_OS_IPHONE
#import <UIKit/UIKit.h>
typedef UIView VIEW_CLASS;

#elif TARGET_OS_MAC
#import <AppKit/AppKit.h>
typedef NSView VIEW_CLASS;

#endif

typedef NS_ENUM(NSInteger, AgoraRtcWarningCode) {
    AgoraRtc_Warn_InvalidView = 8,
    AgoraRtc_Warn_InitVideo = 16,
    AgoraRtc_Warn_Pending = 20,
    AgoraRtc_Warn_NoAvailableChannel = 103,
    AgoraRtc_Warn_LookupChannelTimeout = 104,
    AgoraRtc_Warn_LookupChannelRejected = 105,
    AgoraRtc_Warn_OpenChannelTimeout = 106,
    AgoraRtc_Warn_OpenChannelRejected = 107,
    AgoraRtc_Warn_SwitchLiveVideoTimeout = 111,
    // sdk:vos, callmanager, peermanager: 100~1000
    AgoraRtc_Warn_SetClientRoleTimeout = 118,
    AgoraRtc_Warn_SetClientRoleNotAuthorized = 119,
    AgoraRtc_Warn_AudioMixingOpenError = 701,

    AgoraRtc_Warn_Adm_RuntimePlayoutWarning = 1014,
    AgoraRtc_Warn_Adm_RuntimeRecordingWarning = 1016,
    AgoraRtc_Warn_Adm_RecordAudioSilence = 1019,
    AgoraRtc_Warn_Adm_PlaybackMalfunction = 1020,
    AgoraRtc_Warn_Adm_RecordMalfunction = 1021,
    AgoraRtc_Warn_Adm_Interruption = 1025,
    AgoraRtc_Warn_Apm_Howling = 1051,
};

typedef NS_ENUM(NSInteger, AgoraRtcErrorCode) {
    AgoraRtc_Error_NoError = 0,
    AgoraRtc_Error_Failed = 1,
    AgoraRtc_Error_InvalidArgument = 2,
    AgoraRtc_Error_NotReady = 3,
    AgoraRtc_Error_NotSupported = 4,
    AgoraRtc_Error_Refused = 5,
    AgoraRtc_Error_BufferTooSmall = 6,
    AgoraRtc_Error_NotInitialized = 7,
    AgoraRtc_Error_NoPermission = 9,
    AgoraRtc_Error_TimedOut = 10,
    AgoraRtc_Error_Canceled = 11,
    AgoraRtc_Error_TooOften = 12,
    AgoraRtc_Error_BindSocket = 13,
    AgoraRtc_Error_NetDown = 14,
    AgoraRtc_Error_NoBufs = 15,
    AgoraRtc_Error_JoinChannelRejected = 17,
    AgoraRtc_Error_LeaveChannelRejected = 18,
    AgoraRtc_Error_AlreadyInUse = 19,

    AgoraRtc_Error_InvalidAppId = 101,
    AgoraRtc_Error_InvalidChannelName = 102,
    AgoraRtc_Error_ChannelKeyExpired = 109,
    AgoraRtc_Error_InvalidChannelKey = 110,
    AgoraRtc_Error_ConnectionInterrupted = 111, // only used in web sdk
    AgoraRtc_Error_ConnectionLost = 112, // only used in web sdk
    AgoraRtc_Error_NotInChannel = 113,
    AgoraRtc_Error_SizeTooLarge = 114,
    AgoraRtc_Error_BitrateLimit = 115,
    AgoraRtc_Error_TooManyDataStreams = 116,
    AgoraRtc_Error_DecryptionFailed = 120,
    
    AgoraRtc_Error_LoadMediaEngine = 1001,
    AgoraRtc_Error_StartCall = 1002,
    AgoraRtc_Error_StartCamera = 1003,
    AgoraRtc_Error_StartVideoRender = 1004,
    AgoraRtc_Error_Adm_GeneralError = 1005,
    AgoraRtc_Error_Adm_JavaResource = 1006,
    AgoraRtc_Error_Adm_SampleRate = 1007,
    AgoraRtc_Error_Adm_InitPlayout = 1008,
    AgoraRtc_Error_Adm_StartPlayout = 1009,
    AgoraRtc_Error_Adm_StopPlayout = 1010,
    AgoraRtc_Error_Adm_InitRecording = 1011,
    AgoraRtc_Error_Adm_StartRecording = 1012,
    AgoraRtc_Error_Adm_StopRecording = 1013,
    AgoraRtc_Error_Adm_RuntimePlayoutError = 1015,
    AgoraRtc_Error_Adm_RuntimeRecordingError = 1017,
    AgoraRtc_Error_Adm_RecordAudioFailed = 1018,
    AgoraRtc_Error_Adm_Play_Abnormal_Frequency = 1020,
    AgoraRtc_Error_Adm_Record_Abnormal_Frequency = 1021,
    AgoraRtc_Error_Adm_Init_Loopback  = 1022,
    AgoraRtc_Error_Adm_Start_Loopback = 1023,
    // 1025, as warning for interruption of adm on ios
    // 1026, as warning for route change of adm on ios
    // VDM error code starts from 1500
    AgoraRtc_Error_Vdm_Camera_Not_Authorized = 1501,

    // VCM error code starts from 1600
    AgoraRtc_Error_Vcm_Unknown_Error = 1600,
    AgoraRtc_Error_Vcm_Encoder_Init_Error = 1601,
    AgoraRtc_Error_Vcm_Encoder_Encode_Error = 1602,
    AgoraRtc_Error_Vcm_Encoder_Set_Error = 1603,
};

typedef NS_ENUM(NSInteger, AgoraRtcChannelProfile) {
    AgoraRtc_ChannelProfile_Communication = 0,
    AgoraRtc_ChannelProfile_LiveBroadcasting = 1,
    AgoraRtc_ChannelProfile_Game = 2,
};

typedef NS_ENUM(NSInteger, AgoraRtcClientRole) {
	AgoraRtc_ClientRole_Broadcaster = 1,
	AgoraRtc_ClientRole_Audience = 2,
};

typedef NS_ENUM(NSInteger, AgoraRtcVideoProfile) {
                                            // res       fps  kbps
    AgoraRtc_VideoProfile_Invalid = -1,
    AgoraRtc_VideoProfile_120P = 0,         // 160x120   15   65
#if TARGET_OS_IPHONE
	AgoraRtc_VideoProfile_120P_3 = 2,		// 120x120   15   50
    AgoraRtc_VideoProfile_180P = 10,		// 320x180   15   140
    AgoraRtc_VideoProfile_180P_3 = 12,		// 180x180   15   100
    AgoraRtc_VideoProfile_180P_4 = 13,		// 240x180   15   120
#endif
    AgoraRtc_VideoProfile_240P = 20,		// 320x240   15   200
#if TARGET_OS_IPHONE
    AgoraRtc_VideoProfile_240P_3 = 22,		// 240x240   15   140
    AgoraRtc_VideoProfile_240P_4 = 23,		// 424x240   15   220
#endif
    AgoraRtc_VideoProfile_360P = 30,		// 640x360   15   400
#if TARGET_OS_IPHONE
	AgoraRtc_VideoProfile_360P_3 = 32,		// 360x360   15   260
#endif
    AgoraRtc_VideoProfile_360P_4 = 33,		// 640x360   30   600
    AgoraRtc_VideoProfile_360P_6 = 35,		// 360x360   30   400
    AgoraRtc_VideoProfile_360P_7 = 36,		// 480x360   15   320
    AgoraRtc_VideoProfile_360P_8 = 37,		// 480x360   30   490
    AgoraRtc_VideoProfile_360P_9 = 38,      // 640x360   15   800
    AgoraRtc_VideoProfile_360P_10 = 39,     // 640x360   24   800
    AgoraRtc_VideoProfile_360P_11 = 100,    // 640x360   24   1000
    AgoraRtc_VideoProfile_480P = 40,		// 640x480   15   500
#if TARGET_OS_IPHONE
	AgoraRtc_VideoProfile_480P_3 = 42,		// 480x480   15   400
#endif
    AgoraRtc_VideoProfile_480P_4 = 43,		// 640x480   30   750
    AgoraRtc_VideoProfile_480P_6 = 45,		// 480x480   30   600
    AgoraRtc_VideoProfile_480P_8 = 47,		// 848x480   15   610
    AgoraRtc_VideoProfile_480P_9 = 48,		// 848x480   30   930
    AgoraRtc_VideoProfile_480P_10 = 49,		// 640x480   10   400
    AgoraRtc_VideoProfile_720P = 50,		// 1280x720  15   1130
    AgoraRtc_VideoProfile_720P_3 = 52,		// 1280x720  30   1710
    AgoraRtc_VideoProfile_720P_5 = 54,		// 960x720   15   910
    AgoraRtc_VideoProfile_720P_6 = 55,		// 960x720   30   1380
    AgoraRtc_VideoProfile_1080P = 60,		// 1920x1080 15   2080
    AgoraRtc_VideoProfile_1080P_3 = 62,		// 1920x1080 30   3150
    AgoraRtc_VideoProfile_1080P_5 = 64,		// 1920x1080 60   4780
    AgoraRtc_VideoProfile_1440P = 66,		// 2560x1440 30   4850
    AgoraRtc_VideoProfile_1440P_2 = 67,		// 2560x1440 60   7350
    AgoraRtc_VideoProfile_4K = 70,			// 3840x2160 30   8190
    AgoraRtc_VideoProfile_4K_3 = 72,		// 3840x2160 60   13500
    AgoraRtc_VideoProfile_DEFAULT = AgoraRtc_VideoProfile_360P,
};

typedef NS_ENUM(NSInteger, AgoraRtcAudioProfile) {
                                                      // sample rate, bit rate, mono/stereo, speech/music codec
    AgoraRtc_AudioProfile_Default = 0,                // use default settings
    AgoraRtc_AudioProfile_SpeechStandard = 1,         // 32Khz, 18kbps, mono, speech
    AgoraRtc_AudioProfile_MusicStandard = 2,          // 48Khz, 50kbps, mono, music
    AgoraRtc_AudioProfile_MusicStandardStereo = 3,    // 48Khz, 50kbps, stereo, music
    AgoraRtc_AudioProfile_MusicHighQuality = 4,       // 48Khz, 128kbps, mono, music
    AgoraRtc_AudioProfile_MusicHighQualityStereo = 5, // 48Khz, 128kbps, stereo, music
};

typedef NS_ENUM(NSInteger, AgoraRtcAudioScenario) {
    AgoraRtc_AudioScenario_Default = 0,
    AgoraRtc_AudioScenario_ChatRoom = 1,
    AgoraRtc_AudioScenario_Education = 2,
    AgoraRtc_AudioScenario_GameStreaming = 3,
    AgoraRtc_AudioScenario_ShowRoom = 4,
};

typedef NS_ENUM(NSUInteger, AgoraRtcQuality) {
    AgoraRtc_Quality_Unknown = 0,
    AgoraRtc_Quality_Excellent = 1,
    AgoraRtc_Quality_Good = 2,
    AgoraRtc_Quality_Poor = 3,
    AgoraRtc_Quality_Bad = 4,
    AgoraRtc_Quality_VBad = 5,
    AgoraRtc_Quality_Down = 6,
};

typedef NS_ENUM(NSUInteger, AgoraRtcUserOfflineReason) {
    AgoraRtc_UserOffline_Quit = 0,
    AgoraRtc_UserOffline_Dropped = 1,
    AgoraRtc_UserOffline_BecomeAudience = 2,
};

typedef NS_ENUM(NSInteger, AgoraRtcVideoStreamType) {
    AgoraRtc_VideoStream_High = 0,
    AgoraRtc_VideoStream_Low = 1,
};

typedef NS_ENUM(NSInteger, AgoraRtcAudioOutputRouting)
{
    AgoraRtc_AudioOutputRouting_Default = -1,
    AgoraRtc_AudioOutputRouting_Headset = 0,
    AgoraRtc_AudioOutputRouting_Earpiece = 1,
    AgoraRtc_AudioOutputRouting_HeadsetNoMic = 2,
    AgoraRtc_AudioOutputRouting_Speakerphone = 3,
    AgoraRtc_AudioOutputRouting_Loudspeaker = 4,
    AgoraRtc_AudioOutputRouting_HeadsetBluetooth = 5
};

typedef NS_ENUM(NSInteger, AgoraRtcAudioRecordingQuality) {
    AgoraRtc_AudioRecordingQuality_Low = 0,
    AgoraRtc_AudioRecordingQuality_Medium = 1,
    AgoraRtc_AudioRecordingQuality_High = 2
};

typedef NS_ENUM(NSUInteger, AgoraRtcLogFilter) {
    AgoraRtc_LogFilter_Off = 0,
    AgoraRtc_LogFilter_Debug = 0x080f,
    AgoraRtc_LogFilter_Info = 0x000f,
    AgoraRtc_LogFilter_Warn = 0x000e,
    AgoraRtc_LogFilter_Error = 0x000c,
    AgoraRtc_LogFilter_Critical = 0x0008,
};

typedef NS_ENUM(NSInteger, AgoraRtmpStreamLifeCycle) {
    RtmpStream_LifeCycle_Bind2Channel = 1,
    RtmpStream_LifeCycle_Bind2Ownner = 2,
};

typedef NS_ENUM(NSUInteger, AgoraRtcRenderMode) {
    /**
     Hidden(1): If the video size is different than that of the display window, crops the borders of the video (if the video is bigger) or stretch the video (if the video is smaller) to fit it in the window.
     */
    AgoraRtc_Render_Hidden = 1,
    
    /**
     AgoraRtc_Render_Fit(2): If the video size is different than that of the display window, resizes the video proportionally to fit the window.
     */
    AgoraRtc_Render_Fit = 2,
    
    /**
     AgoraRtc_Render_Adaptive(3)：If both callers use the same screen orientation, i.e., both use vertical screens or both use horizontal screens, the AgoraRtc_Render_Hidden mode applies; if they use different screen orientations, i.e., one vertical and one horizontal, the AgoraRtc_Render_Fit mode applies.
     */
    AgoraRtc_Render_Adaptive = 3,
};

typedef NS_ENUM(NSUInteger, AgoraRtcVideoMirrorMode) {
    AgoraRtc_Video_Mirror_Auto = 0,
    AgoraRtc_Video_Mirror_Enabled = 1,
    AgoraRtc_Video_Mirror_Disabled = 2,
};

typedef NS_ENUM(NSUInteger, AgoraRtcQualityReportFormat) {
    AgoraRtc_QualityReportFormat_Json = 0,
    AgoraRtc_QualityReportFormat_Html = 1,
};

typedef NS_ENUM(NSInteger, AgoraRtcRawAudioFrameOpMode) {
    AgoraRtc_RawAudioFrame_OpMode_ReadOnly = 0,
    AgoraRtc_RawAudioFrame_OpMode_WriteOnly = 1,
    AgoraRtc_RawAudioFrame_OpMode_ReadWrite = 2,
};

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
typedef NS_ENUM(NSInteger, AgoraRtcDeviceType) {
    AgoraRtc_DeviceType_Audio_Unknown = -1,
    AgoraRtc_DeviceType_Audio_Recording = 0,
    AgoraRtc_DeviceType_Audio_Playout = 1,
    AgoraRtc_DeviceType_Video_Render = 2,
    AgoraRtc_DeviceType_Video_Capture = 3,
};

__attribute__((visibility("default"))) @interface AgoraRtcDeviceInfo : NSObject
@property (assign, nonatomic) int index;
@property (assign, nonatomic) AgoraRtcDeviceType type;
@property (copy, nonatomic) NSString * _Nullable deviceId;
@property (copy, nonatomic) NSString * _Nullable deviceName;
@end
#endif

__attribute__((visibility("default"))) @interface AgoraRtcVideoCanvas : NSObject
/**
 *  The video display view. The SDK does not maintain the lifecycle of the view.
    The view can be safely released after calling leaveChannel with a returned value. 
    The SDK keeps a cache of the view value, so 'setupLocalVideo' to set the view value to nil could be able to clear cache before switching or releasing view.
 */
@property (strong, nonatomic) VIEW_CLASS* _Nullable view;
@property (assign, nonatomic) AgoraRtcRenderMode renderMode; // the render mode of view: hidden, fit and adaptive
@property (assign, nonatomic) NSUInteger uid; // the user id of view
@end

/**
 * For AgoraVideoFrame: color format field
 */
typedef NS_ENUM(NSUInteger, AgoraVideoFormat) {
    AgoraRtc_FrameFormat_texture = 12,
    AgoraRtc_FrameFormat_I420 = 1,
    AgoraRtc_FrameFormat_RGBA = 4,
    AgoraRtc_FrameFormat_IMC2 = 5,
};

__attribute__((visibility("default"))) @interface AgoraVideoFrame : NSObject
@property (assign, nonatomic) NSInteger format; /* 10: android texture (GL_TEXTURE_2D)
                                                 11: android texture (OES, typically from camera)
                                                 12: ios texture (CVPixelBufferRef)
                                                 1: I420
                                                 2: BGRA
                                                 3: NV21
                                                 4: RGBA
                                                 5: IMC2
                                                 6: BGRA (same as 2)
                                                 7: ARGB
                                                 8: NV12
                                                 */
@property (assign, nonatomic) CMTime time; // time for this frame.
@property (assign, nonatomic) int stride DEPRECATED_MSG_ATTRIBUTE("use strideInPixels instead");
@property (assign, nonatomic) int strideInPixels; // how many pixels between 2 consecutive rows. Note: in pixel, not byte.
                                                  // in case of ios texture, it is not used
@property (assign, nonatomic) int height; // how many rows of pixels, in case of ios texture, it is not used

@property (assign, nonatomic) CVPixelBufferRef _Nullable textureBuf;

@property (strong, nonatomic) NSData * _Nullable dataBuf;  // raw data buffer. in case of ios texture, it is not used
@property (assign, nonatomic) int cropLeft;   // how many pixels to crop on the left boundary
@property (assign, nonatomic) int cropTop;    // how many pixels to crop on the top boundary
@property (assign, nonatomic) int cropRight;  // how many pixels to crop on the right boundary
@property (assign, nonatomic) int cropBottom; // how many pixels to crop on the bottom boundary
@property (assign, nonatomic) int rotation;   // 0, 90, 180, 270. See document for rotation calculation
/* Note
 * 1. strideInPixels
 *    Stride is in unit of pixel, not byte
 * 2. About frame width and height
 *    No field defined for width. However, it can be deduced by:
 *       croppedWidth = (strideInPixels - cropLeft - cropRight)
 *    And
 *       croppedHeight = (height - cropTop - cropBottom)
 * 3. About crop
 *    _________________________________________________________________.....
 *    |                        ^                                      |  ^
 *    |                        |                                      |  |
 *    |                     cropTop                                   |  |
 *    |                        |                                      |  |
 *    |                        v                                      |  |
 *    |                ________________________________               |  |
 *    |                |                              |               |  |
 *    |                |                              |               |  |
 *    |<-- cropLeft -->|          valid region        |<- cropRight ->|
 *    |                |                              |               | height
 *    |                |                              |               |
 *    |                |_____________________________ |               |  |
 *    |                        ^                                      |  |
 *    |                        |                                      |  |
 *    |                     cropBottom                                |  |
 *    |                        |                                      |  |
 *    |                        v                                      |  v
 *    _________________________________________________________________......
 *    |                                                               |
 *    |<---------------- strideInPixels ----------------------------->|
 *
 *    If your buffer contains garbage data, you can crop them. E.g. frame size is
 *    360 x 640, often the buffer stride is 368, i.e. there extra 8 pixels on the
 *    right are for padding, and should be removed. In this case, you can set:
 *    strideInPixels = 368;
 *    height = 640;
 *    cropRight = 8;
 *    // cropLeft, cropTop, cropBottom are default to 0
 */
@end

__attribute__((visibility("default"))) @interface AgoraRtcStats : NSObject
@property (assign, nonatomic) NSUInteger duration;
@property (assign, nonatomic) NSUInteger txBytes;
@property (assign, nonatomic) NSUInteger rxBytes;
@property (assign, nonatomic) NSUInteger txAudioKBitrate;
@property (assign, nonatomic) NSUInteger rxAudioKBitrate;
@property (assign, nonatomic) NSUInteger txVideoKBitrate;
@property (assign, nonatomic) NSUInteger rxVideoKBitrate;
@property (assign, nonatomic) NSUInteger users;
@property (assign, nonatomic) double cpuAppUsage;
@property (assign, nonatomic) double cpuTotalUsage;
@end

__attribute__((visibility("default"))) @interface AgoraRtcLocalVideoStats : NSObject
@property (assign, nonatomic) NSUInteger sentBitrate;
@property (assign, nonatomic) NSUInteger sentFrameRate;
@end

__attribute__((visibility("default"))) @interface AgoraRtcRemoteVideoStats : NSObject
@property (assign, nonatomic) NSUInteger uid;
@property (assign, nonatomic) NSUInteger delay;
@property (assign, nonatomic) NSUInteger width;
@property (assign, nonatomic) NSUInteger height;
@property (assign, nonatomic) NSUInteger receivedBitrate;
@property (assign, nonatomic) NSUInteger receivedFrameRate;
@property (assign, nonatomic) AgoraRtcVideoStreamType rxStreamType;
@end

__attribute__((visibility("default"))) @interface AgoraRtcAudioVolumeInfo : NSObject
@property (assign, nonatomic) NSUInteger uid;
@property (assign, nonatomic) NSUInteger volume;
@end

__attribute__((visibility("default"))) @interface AgoraRtcVideoCompositingRegion : NSObject
@property (assign, nonatomic) NSUInteger uid;
@property (assign, nonatomic) CGFloat x;
@property (assign, nonatomic) CGFloat y;
@property (assign, nonatomic) CGFloat width;
@property (assign, nonatomic) CGFloat height;
@property (assign, nonatomic) NSInteger zOrder; //optional, [0, 100] //0 (default): bottom most, 100: top most
@property (assign, nonatomic) CGFloat alpha; //optional, [0, 1.0] where 0 denotes throughly transparent, 1.0 opaque
@property (assign, nonatomic) AgoraRtcRenderMode renderMode;
@end

__attribute__((visibility("default"))) @interface AgoraRtcVideoCompositingLayout : NSObject
@property (assign, nonatomic) NSInteger canvasWidth;
@property (assign, nonatomic) NSInteger canvasHeight;
@property (copy, nonatomic) NSString * _Nullable backgroundColor;//e.g. "#c0c0c0"
@property (copy, nonatomic) NSArray<AgoraRtcVideoCompositingRegion *> * _Nullable regions;
@property (copy, nonatomic) NSString * _Nullable appData;//app defined data
@end

__attribute__((visibility("default"))) @interface AgoraPublisherConfiguration : NSObject
@property (assign, nonatomic) BOOL owner;
@property (assign, nonatomic) NSInteger width;
@property (assign, nonatomic) NSInteger height;
@property (assign, nonatomic) NSInteger framerate;
@property (assign, nonatomic) NSInteger bitrate;
@property (assign, nonatomic) NSInteger defaultLayout;
@property (assign, nonatomic) AgoraRtmpStreamLifeCycle lifeCycle;
@property (assign, nonatomic) NSInteger injectStreamWidth;
@property (assign, nonatomic) NSInteger injectStreamHeight;
@property (copy, nonatomic) NSString * _Nullable injectStreamUrl;
@property (copy, nonatomic) NSString * _Nullable publishUrl;
@property (copy, nonatomic) NSString * _Nullable rawStreamUrl;
@property (copy, nonatomic) NSString * _Nullable extraInfo;
-(BOOL) validate;
@end

__attribute__((visibility("default"))) @interface AgoraPublisherConfigurationBuilder : NSObject
- (AgoraPublisherConfigurationBuilder * _Nonnull)setOwner:(BOOL)isOwner;
- (AgoraPublisherConfigurationBuilder * _Nonnull)setWidth:(NSInteger)width
                                                   height:(NSInteger)height
                                                framerate:(NSInteger)framerate
                                                  bitrate:(NSInteger)bitrate;
- (AgoraPublisherConfigurationBuilder * _Nonnull)setDefaultLayout:(NSInteger)layoutStyle;
- (AgoraPublisherConfigurationBuilder * _Nonnull)setLifeCycle:(AgoraRtmpStreamLifeCycle)lifecycle;
- (AgoraPublisherConfigurationBuilder * _Nonnull)setPublisherUrl:(NSString * _Nullable)url;
- (AgoraPublisherConfigurationBuilder * _Nonnull)setRawStreamUrl:(NSString * _Nullable)url;
- (AgoraPublisherConfigurationBuilder * _Nonnull)setExtraInfo:(NSString * _Nullable)info;
- (AgoraPublisherConfigurationBuilder * _Nonnull)injectStream:(NSString * _Nullable)url
                                                        width:(NSInteger)width
                                                       height:(NSInteger)height;
- (AgoraPublisherConfiguration * _Nonnull) build;
@end

@class AgoraRtcEngineKit;
@protocol AgoraRtcEngineDelegate <NSObject>
@optional
#pragma mark SDK common delegates
/**
 *  The warning occurred in SDK. The APP could igonre the warning, and the SDK could try to resume automically.
 *
 *  @param engine      The engine kit
 *  @param warningCode The warning code
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOccurWarning:(AgoraRtcWarningCode)warningCode;

/**
 *  The error occurred in SDK. The SDK couldn't resume to normal state, and the app need to handle it.
 *
 *  @param engine    The engine kit
 *  @param errorCode The error code
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOccurError:(AgoraRtcErrorCode)errorCode;

/**
 *  Event of load media engine success
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineMediaEngineDidLoaded:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of media engine start call success
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineMediaEngineDidStartCall:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 * when channel key is enabled, and specified channel key is invalid or expired, this function will be called.
 * APP should generate a new channel key and call renewChannelKey() to refresh the key.
 * NOTE: to be compatible with previous version, ERR_CHANNEL_KEY_EXPIRED and ERR_INVALID_CHANNEL_KEY are also reported via onError() callback.
 * You should move renew of channel key logic into this callback.
 *  @param engine The engine kit
 */
- (void)rtcEngineRequestChannelKey:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of disconnected with server. This event is reported at the moment SDK loses connection with server.
 *  In the mean time SDK automatically tries to reconnect with the server until APP calls leaveChannel.
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineConnectionDidInterrupted:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of loss connection with server. This event is reported after the connection is interrupted and exceed the retry period (10 seconds by default).
 *  In the mean time SDK automatically tries to reconnect with the server until APP calls leaveChannel.
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineConnectionDidLost:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of connection banned by server. This event is reported after the connection is banned by server.
 *  In the mean time SDK will not try to reconnect the server.
 */
- (void)rtcEngineConnectionDidBanned:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Statistics of rtc engine status. Updated every two seconds.
 *
 *  @param engine The engine kit
 *  @param stats  The statistics of rtc status, including duration, sent bytes and received bytes
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine reportRtcStats:(AgoraRtcStats * _Nonnull)stats;

/**
 *  The network quality of lastmile test.
 *
 *  @param engine  The engine kit
 *  @param quality The network quality
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine lastmileQuality:(AgoraRtcQuality)quality;

/**
 *  Event of API call executed
 *
 *  @param engine The engine kit
 *  @param api    The API description
 *  @param error  The error code
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didApiCallExecute:(NSString * _Nonnull)api error:(NSInteger)error;

/**
 *  This callback returns the status code after executing the refreshRecordingServiceStatus method successfully.
 *
 *  @param engine The engine kit
 *  @param status 0：Recording is stopped. 1：Recording is ongoing.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didRefreshRecordingServiceStatus:(NSInteger)status;

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
/**
 *  the notificaitoin of device added removed
 *
 *  @param engine The engine kit
 *  @param deviceId   the identification of device
 *  @param deviceType type of device: -1: audio unknown; 0: audio recording ; 1: audio playout ; 2: render; 4: capture
 *  @param state      state of device: 0: added; 1: removed
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine device:(NSString * _Nonnull) deviceId type:(AgoraRtcDeviceType) deviceType stateChanged:(NSInteger) state;

#endif

#pragma mark Local user common delegates
/**
 *  Event of the user joined the channel.
 *
 *  @param engine  The engine kit
 *  @param channel The channel name
 *  @param uid     The remote user id
 *  @param elapsed The elapsed time (ms) from session beginning
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didJoinChannel:(NSString * _Nonnull)channel withUid:(NSUInteger)uid elapsed:(NSInteger) elapsed;

/**
 *  Event of the user rejoined the channel
 *
 *  @param engine  The engine kit
 *  @param channel The channel name
 *  @param uid     The user id
 *  @param elapsed The elapsed time (ms) from session beginning
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didRejoinChannel:(NSString * _Nonnull)channel withUid:(NSUInteger)uid elapsed:(NSInteger) elapsed;

/**
 *  Event of cient role change. only take effect under broadcasting mode
 *
 *  @param engine The engine kit
 *  @param oldRole the previous role
 *  @param newRole the new role
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didClientRoleChanged:(AgoraRtcClientRole)oldRole newRole:(AgoraRtcClientRole)newRole;

/**
 *  The statistics of the call when leave channel
 *
 *  @param engine The engine kit
 *  @param stats  The statistics of the call, including duration, sent bytes and received bytes
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didLeaveChannelWithStats:(AgoraRtcStats * _Nonnull)stats;

/**
 *  The network quality of local user.
 *
 *  @param engine  The engine kit
 *  @param uid     The id of user
 *  @param txQuality The sending network quality
 *  @param rxQuality The receiving network quality
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine networkQuality:(NSUInteger)uid txQuality:(AgoraRtcQuality)txQuality rxQuality:(AgoraRtcQuality)rxQuality;

#pragma mark Local user audio delegates
/**
 *  Event of the first audio frame is sent.
 *
 *  @param engine  The engine kit
 *  @param elapsed The elapsed time(ms) from the beginning of the session.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstLocalAudioFrame:(NSInteger)elapsed;

/**
 *  Event of local audio route changed
 *
 *  @param engine The engine kit
 *  @param routing the current audio output routing
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didAudioRouteChanged:(AgoraRtcAudioOutputRouting)routing;

/**
 *  Event of finish audio mixing.
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineLocalAudioMixingDidFinish:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of finish audio effect.
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineDidAudioEffectFinish:(AgoraRtcEngineKit * _Nonnull)engine soundId:(NSInteger)soundId;


#pragma mark Local user video delegates
/**
 *  Event of camera opened
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineCameraDidReady:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of camera stopped
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineVideoDidStop:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of the first local frame starts rendering on the screen.
 *
 *  @param engine  The engine kit
 *  @param size    The size of local video stream
 *  @param elapsed The elapsed time(ms) from the beginning of the session.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstLocalVideoFrameWithSize:(CGSize)size elapsed:(NSInteger)elapsed;

/**
 *  The statistics of local video stream. Update every two seconds.
 *
 *  @param engine        The engine kit
 *  @param stats         The statistics of local video, including sent bitrate, sent framerate
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine localVideoStats:(AgoraRtcLocalVideoStats * _Nonnull)stats;

#pragma mark Remote user common delegates
/**
 *  Event of remote user joined
 *
 *  @param engine  The engine kit
 *  @param uid     The remote user id
 *  @param elapsed The elapsed time(ms) from the beginning of the session.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didJoinedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed;

/**
 *  Event of remote user offlined
 *
 *  @param engine The engine kit
 *  @param uid    The remote user id
 *  @param reason Reason of user offline, quit, drop or became audience
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOfflineOfUid:(NSUInteger)uid reason:(AgoraRtcUserOfflineReason)reason;

/**
 *  receive custom data from remote user
 *
 *  @param engine The engine kit
 *  @param uid    The remote user id
 *  @param streamId The stream id
 *  @param data   The user defined data
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine receiveStreamMessageFromUid:(NSUInteger)uid streamId:(NSInteger)streamId data:(NSData * _Nonnull)data;

/**
 *  the local user has not received the data stream from the other user within 5 seconds.
 *
 *  @param engine The engine kit
 *  @param uid    The remote user id
 *  @param streamId The stream id
 *  @param error    The error code
 *  @param missed   The number of lost messages
 *  @param cached   The number of incoming cached messages when the data stream is interrupted
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOccurStreamMessageErrorFromUid:(NSUInteger)uid streamId:(NSInteger)streamId error:(NSInteger)error missed:(NSInteger)missed cached:(NSInteger)cached;

#pragma mark Remote user audio delegates
/**
 *  Event of the first audio frame from remote user is received.
 *
 *  @param engine  The engine kit
 *  @param uid     The remote user id
 *  @param elapsed The elapsed time(ms) from the beginning of the session.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstRemoteAudioFrameOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed;

/**
 *  Event of remote user audio muted or unmuted
 *
 *  @param engine The engine kit
 *  @param muted  Muted or unmuted
 *  @param uid    The remote user id
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didAudioMuted:(BOOL)muted byUid:(NSUInteger)uid;

/**
 *  The sdk reports the volume of a speaker. The interface is disable by default, and it could be enable by API "enableAudioVolumeIndication"
 *
 *  @param engine      The engine kit
 *  @param speakers    AgoraRtcAudioVolumeInfo array
 *  @param totalVolume The total volume of speakers
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine reportAudioVolumeIndicationOfSpeakers:(NSArray<AgoraRtcAudioVolumeInfo *> * _Nonnull)speakers totalVolume:(NSInteger)totalVolume;

/**
 *  The sdk reports who is active speaker in the channel
 *
 *  @param engine      The engine kit
 *  @param speakerUid  The speaker who is talking
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine activeSpeaker:(NSUInteger)speakerUid;

/**
 *  Event of remote start audio mixing.
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineRemoteAudioMixingDidStart:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  Event of remote finish audio mixing.
 *
 *  @param engine The engine kit
 */
- (void)rtcEngineRemoteAudioMixingDidFinish:(AgoraRtcEngineKit * _Nonnull)engine;

/**
 *  The audio quality of the user. updated every two seconds.
 *
 *  @param engine  The engine kit
 *  @param uid     The id of user
 *  @param quality The audio quality
 *  @param delay   The delay from the remote user
 *  @param lost    The percentage of lost packets
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine audioQualityOfUid:(NSUInteger)uid quality:(AgoraRtcQuality)quality delay:(NSUInteger)delay lost:(NSUInteger)lost;

#pragma mark Remote user video delegates
/**
 *  Event of the first frame of remote user is decoded successfully.
 *
 *  @param engine  The engine kit
 *  @param uid     The remote user id
 *  @param size    The size of video stream
 *  @param elapsed The elapsed time(ms) from the beginning of the session.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstRemoteVideoDecodedOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed;

/**
 *  Event of the first frame of remote user is rendering on the screen.
 *
 *  @param engine  The engine kit
 *  @param uid     The remote user id
 *  @param size    The size of video stream
 *  @param elapsed The elapsed time(ms) from the beginning of the session.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstRemoteVideoFrameOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed;

/**
 *  Event of video size changed for local or remote user
 *
 *  @param engine  The engine kit
 *  @param uid     The user id
 *  @param size    The new size of video
 *  @param rotation  The new rotate of video
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine videoSizeChangedOfUid:(NSUInteger)uid size:(CGSize)size rotation:(NSInteger)rotation;

/**
 *  Event of remote user video muted or unmuted
 *
 *  @param engine The engine kit
 *  @param muted  Muted or unmuted
 *  @param uid    The remote user id
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didVideoMuted:(BOOL)muted byUid:(NSUInteger)uid;

/**
 *  Event of remote user video enabled or disabled
 *
 *  @param engine The engine kit
 *  @param enabled  Enabled or disabled
 *  @param uid    The remote user id
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didVideoEnabled:(BOOL)enabled byUid:(NSUInteger)uid;

/**
 *  Event of remote user local video enabled or disabled
 *
 *  @param engine The engine kit
 *  @param enabled  Enabled or disabled
 *  @param uid    The remote user id
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didLocalVideoEnabled:(BOOL)enabled byUid:(NSUInteger)uid;

/**
 *  The statistics of remote video stream. Update every two seconds.
 *
 *  @param engine            The engine kit
 *  @param stats             The statistics of remote video, including user id, delay, resolution, received bitrate, received framerate, video stream type
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine remoteVideoStats:(AgoraRtcRemoteVideoStats * _Nonnull)stats;
@end

__attribute__((visibility("default"))) @interface AgoraRtcEngineKit : NSObject
/**
 *  Set / Get the AgoraRtcEngineDelegate
 */
@property (nonatomic, weak) id<AgoraRtcEngineDelegate> _Nullable delegate;

/**
 *  Initializes the AgoraRtcEngineKit object.
 *
 *  @param appId The appId is issued to the application developers by Agora.
 *  @param delegate The AgoraRtcEngineDelegate
 *
 *  @return an object of AgoraRtcEngineKit class
 */
+ (instancetype _Nonnull)sharedEngineWithAppId:(NSString * _Nonnull)appId
                                      delegate:(id<AgoraRtcEngineDelegate> _Nullable)delegate;

/**
 *  deprecated
 */
+ (instancetype _Nonnull)sharedEngineWithAppId:(NSString * _Nonnull)AppId error:(void(^ _Nullable)(AgoraRtcErrorCode errorCode))errorBlock __deprecated;

+ (void)destroy;

/**
 *  Get the version of Agora SDK.
 *
 *  @return string, sdk version
 */
+ (NSString * _Nonnull)getSdkVersion;

/**
 *  Get the version of Media Engine
 *
 *  @return string, engine version
 */
+ (NSString * _Nonnull)getMediaEngineVersion;

/**
 *  Get the native handler of sdk Engine
 */
- (void * _Nullable)getNativeHandle;

#pragma mark Common methods
/**
 *  Create an open UDP socket to the AgoraRtcEngineKit cloud service to join a channel.
    Users in the same channel can talk to each other with same vendor key.
    Users using different vendor keys cannot call each other.
    The method is asynchronous.
 *
 *  @param channelKey        Channel key generated by APP using sign certificate.
 *  @param channelName       Joining in the same channel indicates those clients have entered in one room.
 *  @param info              Optional, this argument can be whatever the programmer likes personally.
 *  @param uid               Optional, this argument is the unique ID for each member in one channel.
                             If not specified, or set to 0, the SDK automatically allocates an ID, and the id could be gotten in onJoinChannelSuccess.
 *  @param joinSuccessBlock  This callback indicates that the user has successfully joined the specified channel. Same as rtcEngine:didJoinChannel:withUid:elapsed:. If nil, the callback rtcEngine:didJoinChannel:withUid:elapsed: will works.
 *
 *  @return 0 when executed successfully, and return negative value when failed.
 */
- (int)joinChannelByKey:(NSString * _Nullable)channelKey
            channelName:(NSString * _Nonnull)channelName
                   info:(NSString * _Nullable)info
                    uid:(NSUInteger)uid
            joinSuccess:(void(^ _Nullable)(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed))joinSuccessBlock;

/**
 *  lets the user leave a channel, i.e., hanging up or exiting a call.
    After joining a channel, the user must call the leaveChannel method to end the call before joining another one.
    It is synchronous, i.e., it only returns until the call ends and all resources are released.
 *  @param leaveChannelBlock indicate the statistics of this call, from joinChannel to leaveChannel, including duration, tx bytes and rx bytes in the call.
 *
 *  @return 0 if executed successfully, or return negative value if failed.
 */
- (int)leaveChannel:(void(^ _Nullable)(AgoraRtcStats * _Nonnull stat))leaveChannelBlock;

/**
 *  Set the channel profile: such as communication, live broadcasting
 *
 *  @param profile the channel profile
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setChannelProfile:(AgoraRtcChannelProfile)profile;

/**
 *  Set the role of user: such as broadcaster, audience
 *
 *  @param role the role of client
 *  @param permissionKey the permission key of role change
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setClientRole:(AgoraRtcClientRole)role
             withKey:(NSString * _Nullable)permissionKey;

/**
 *  Renew channel key, refresh the new key into agora engine. APP should call this API when SDK reports error ERR_CHANNEL_KEY_EXPIRED.
 *
 *  @param channelKey new channel key
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)renewChannelKey:(NSString * _Nonnull)channelKey;

- (int)enableWebSdkInteroperability:(BOOL)enabled;

/**
 *  Enables the network quality test. When enabled, the callback 'networkQualityBlock' notifies the application about the user's network connection quality.
 Note: Once the network test is enabled, it uses the network bandwidth even when the application is not in a call.
 Recommandation: When the application is foreground, enable the network connection test; and when the application is switched to background, disable network test  in order to reduce network traffic.
 By default, the network test is disabled
 *
 *  @return 0 when executed successfully, and return negative value when failed.
 */
- (int)enableLastmileTest;

/**
 *  Disables the network quality test.
 *
 *  @return 0 when executed successfully, and return negative value when failed.
 */
- (int)disableLastmileTest;

/**
 *  Specify sdk parameters
 *
 *  @param options sdk options in json format.
 */
- (int)setParameters:(NSString * _Nonnull)options;

- (NSString * _Nullable)getParameter:(NSString * _Nonnull)parameter
                                args:(NSString * _Nullable)args;

/**
 *  Specifies the SDK output log file.
 *
 *  @param filePath The full file path of the log file.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setLogFile:(NSString * _Nonnull)filePath;

/**
 *  Specifiy the log level of output
 *
 *  @param filter The log level
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setLogFilter:(NSUInteger)filter;

/**
 *  The call id of current client. The call id could be used in 'rate' and 'complain' method.
 *
 *  @return The current call id.
 */
- (NSString * _Nullable)getCallId;

/**
 *  Let user rate the call. Often called after the call ends.
 *
 *  @param callId      The call ID retrieved from the 'getCallId' method.
 *  @param rating      The rating for the call between 1 (lowest score) to 10 (highest score).
 *  @param description Optional, decribed by user for the call with a length less than 800 bytes.
 *
 *  @return 0 when executed successfully. return ERR_INVALID_ARGUMENT (-2)：The passed argument is invalid, e.g., callId invalid. return ERR_NOT_READY (-3)：The SDK status is incorrect, e.g., initialization failed.
 */
- (int)rate:(NSString * _Nonnull)callId
     rating:(NSInteger)rating
description:(NSString * _Nullable)description;

/**
 *  Let user complain the quality of the call. Often called after the call ends.
 *
 *  @param callId      The call ID retrieved from the 'getCallId' method.
 *  @param description Optional, decribed by user for the call with a length less than 800 bytes.
 *
 *  @return 0 when executed successfully. return ERR_INVALID_ARGUMENT (-2)：The passed argument is invalid, e.g., callId invalid. return ERR_NOT_READY (-3)：The SDK status is incorrect, e.g., initialization failed.
 */
- (int)complain:(NSString * _Nonnull)callId
    description:(NSString * _Nullable)description;

/**
 *  Enable / Disable dispatching delegate to main queue. if disable, the app should dispatch UI operating to main queue by himself.
 *
 *  @param enabled YES: dispatch delegate method to main queue. NO: not dispatch delegate methods to main queue
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)enableMainQueueDispatch:(BOOL)enabled;

#pragma mark Video common
/**
 *  Enables video mode.  Switches from audio to video mode. It could be called during a call and before entering a channel.
 *
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)enableVideo;

/**
 *  Disable video mode. Switch from video to audio mode. It could be called during a call and before entering a channel.
 *
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)disableVideo;

/**
 *  Enables local video.
 *
 *  @param enabled YES to enabled local video capture and render (by default), NO to disable using local camera device.
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)enableLocalVideo:(BOOL)enabled;

/**
 *  set video profile, including resolution, fps, kbps
 *
 *  @param profile enumeration definition about the video resolution, fps and max kbps
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setVideoProfile:(AgoraRtcVideoProfile)profile
    swapWidthAndHeight:(BOOL)swapWidthAndHeight;

- (int)setVideoQualityParameters:(BOOL)preferFrameRateOverImageQuality;

/**
 *  Set up the local video view. The video canvus is initialized with video display setting. And it could be called before entering a channel.
 *
 *  @param local the canvas is composed of view, renderMode and uid. How to initialize 'local'? please take a look at 'AgoraRtcVideoCanvas'
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setupLocalVideo:(AgoraRtcVideoCanvas * _Nullable)local;

/**
 *  Configure display setting of local view. And it could be called mutiple times during a call.
 *
 *  @param mode There are Hidden(1), Fit(2) and Adaptive(3) mode. Please take a look at definition of enum AgoraRtcRenderMode
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setLocalRenderMode:(AgoraRtcRenderMode) mode;

/**
 *  Configure setting of local video mirror. And it should be set before open of preview.
 *  If the setting is after the open of preview, it needs reopen the preview to make the setting take effect.
 *  @param mode There are Default(0), Enabled(1) and Disabled(2) mode. Please take a look at definition of enum AgoraRtcVideoMirrorMode
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setLocalVideoMirrorMode:(AgoraRtcVideoMirrorMode) mode;

/**
 *  start local video preview, while not sending data to server
 *
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)startPreview;

/**
 *  stop local video preview
 *
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)stopPreview;

/**
 *  Switches between front and back cameras.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)switchCamera;

/**
 *  Set up the remote video view. The video canvus is initialized with video display setting. It could be called after receiving the remote video streams to configure the video settings.
 *
 *  @param remote the canvas is composed of view, renderMode and uid. How to initialize 'remote'? please take a look at 'AgoraRtcVideoCanvas'
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setupRemoteVideo:(AgoraRtcVideoCanvas * _Nonnull)remote;

/**
 *  Configure display setting of remote view. And it could be called mutiple times during a call.
 *
 *  @param uid  The user id of remote view.
 *  @param mode There are Hidden(1), Fit(2) and Adaptive(3) mode. Please take a look at definition of enum AgoraRtcRenderMode
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setRemoteRenderMode:(NSUInteger)uid
                      mode:(AgoraRtcRenderMode) mode;

/**
 *  Enable / disable sending local video streams to the network.
 *
 *  @param mute YES: stop sending local video stream to the network, NO: start sending local video stream.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)muteLocalVideoStream:(BOOL)mute;

/**
 *  Enables / disables playing all remote callers’ video streams.
 *
 *  @param mute YES: stop playing, NO: start playing.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)muteAllRemoteVideoStreams:(BOOL)mute;

/**
 *  Enable / disable a remote user's video stream
 *
 *  @param uid  The remote user id
 *  @param mute YES: discard the video stream from remote user, NO: start receiving remote video stream.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)muteRemoteVideoStream:(NSUInteger)uid
                        mute:(BOOL)mute;

/**
 *  API deprecated. Please refer to open source https://github.com/AgoraLab/AgoraDemo, the function "onSwitchRemoteUsers" in demo agora-easycall-ios-oc
 *   Switches between video display views of two different users.
 *
 *  @param uid1 The user ID of the user whose video is to be switched.
 *  @param uid2 The user ID of another user whose video is to be switched.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)switchView:(NSUInteger)uid1
       andAnother:(NSUInteger)uid2 __deprecated;

#pragma mark Video dual stream
- (int)enableDualStreamMode:(BOOL)enabled;
- (int)setRemoteVideoStream:(NSUInteger)uid
                       type:(AgoraRtcVideoStreamType)streamType;
- (int)setRemoteDefaultVideoStreamType:(AgoraRtcVideoStreamType)streamType;

#if TARGET_OS_IPHONE
#pragma mark Video camera control
- (BOOL)isCameraZoomSupported;
- (CGFloat)setCameraZoomFactor:(CGFloat)zoomFactor;

- (BOOL)isCameraFocusPositionInPreviewSupported;
- (BOOL)setCameraFocusPositionInPreview:(CGPoint)position;

- (BOOL)isCameraTorchSupported;
- (BOOL)setCameraTorchOn:(BOOL)isOn;

- (BOOL)isCameraAutoFocusFaceModeSupported;
- (BOOL)setCameraAutoFocusFaceModeEnabled:(BOOL)enable;
#endif

#pragma mark Audio common
/**
 *  Enables audio function, which is enabled by default.
 *
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)enableAudio;

/**
 *  Disable audio function.
 *
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)disableAudio;

/**
 *  Pause audio function in channel.
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)pauseAudio;

/**
 *  Resume audio function in channel.
 *  @return 0 when this method is called successfully, or negative value when this method failed.
 */
- (int)resumeAudio;

/**
 *  Enable / Disable speaker of device
 *
 *  @param enableSpeaker YES: Switches to speakerphone. NO: Switches to headset.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setEnableSpeakerphone:(BOOL)enableSpeaker;

/**
 *  test if the speakerphone is enabled or not.
 *
 *  @return YES when speakerphone is enabled. NO when speakerphone is not enabled.
 */
- (BOOL)isSpeakerphoneEnabled;

/**
 *  Set default audio route to Speakerphone
 *
 *  @param defaultToSpeaker YES: default to speakerphone. NO: default to earpiece for voice chat, speaker for video chat.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setDefaultAudioRouteToSpeakerphone:(BOOL)defaultToSpeaker;

/**
 *  set audio profile and scenario
 *  including sample rate, bit rate, mono/stereo, speech/music codec
 *
 *  @param profile enumeration definition about the audio's samplerate, bitrate, mono/stereo, speech/music codec
 *  @param scenario enumeration definition about the audio scenario
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setAudioProfile:(AgoraRtcAudioProfile)profile
              scenario:(AgoraRtcAudioScenario)scenario;

/**
 *  deprecated, use setAudioProfile:scenario: insted
 */
- (int)setHighQualityAudioParametersWithFullband:(BOOL)fullband
                                          stereo:(BOOL)stereo
                                     fullBitrate:(BOOL)fullBitrate __deprecated;

/**
 * adjust recording signal volume
 *
 * @param [in] volume range from 0 to 400
 *
 * @return return 0 if success or an error code
 */
- (int)adjustRecordingSignalVolume:(NSInteger)volume;

/**
 * adjust playback signal volume
 *
 * @param [in] volume range from 0 to 400
 *
 * @return return 0 if success or an error code
 */
- (int)adjustPlaybackSignalVolume:(NSInteger)volume;

/**
 *  Sets the speakerphone volume. The speaker volume could be adjust by MPMusicPlayerController and other iOS API easily.
 *
 *  @param volume between 0 (lowest volume) to 255 (highest volume).
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)setSpeakerphoneVolume:(NSUInteger)volume __deprecated;

/**
 *  Enables to report to the application about the volume of the speakers.
 *
 *  @param interval Specifies the time interval between two consecutive volume indications.
                    <=0: Disables volume indication.
                    >0 : The volume indication interval in milliseconds. Recommandation: >=200ms.
 *  @param smooth   The smoothing factor. Recommended: 3.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)enableAudioVolumeIndication:(NSInteger)interval
                            smooth:(NSInteger)smooth;

/**
 *  Mutes / Unmutes local audio.
 *
 *  @param mute true: Mutes the local audio. false: Unmutes the local audio.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)muteLocalAudioStream:(BOOL)mute;

- (int)muteRemoteAudioStream:(NSUInteger)uid mute:(BOOL)mute;

/**
 *  Mutes / Unmutes all remote audio.
 *
 *  @param mute true: Mutes all remote received audio. false: Unmutes all remote received audio.
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)muteAllRemoteAudioStreams:(BOOL)mute;

#if TARGET_OS_IPHONE
- (int)enableInEarMonitoring:(BOOL)enabled;
/**
 * Set the audio ears back's volume and effect
 * @param [in] volume
 *        set volume of audio ears back, in the range of [0..100], default value is 100
 *
 * @return return 0 if success or an error code
 */
- (int)setInEarMonitoringVolume:(NSInteger)volume;
#endif

/**
 * Change the pitch of local speaker's voice
 * @param [in] pitch
 *        frequency, in the range of [0.5..2.0], default value is 1.0
 *
 * @return return 0 if success or an error code
 */
- (int)setLocalVoicePitch:(double) pitch;

#pragma mark Audio mixing
- (int)startAudioMixing:(NSString *  _Nonnull)filePath
               loopback:(BOOL)loopback
                replace:(BOOL)replace
                  cycle:(NSInteger)cycle;
- (int)stopAudioMixing;
- (int)pauseAudioMixing;
- (int)resumeAudioMixing;
- (int)adjustAudioMixingVolume:(NSInteger)volume;
- (int)getAudioMixingDuration;
- (int)getAudioMixingCurrentPosition;
- (int)setAudioMixingPosition:(NSInteger)pos;

#pragma mark Audio effect
- (double)getEffectsVolume;
- (int)setEffectsVolume:(double)volume;
- (int)setVolumeOfEffect:(int)soundId
               withVolume:(double)volume;
- (int)playEffect:(int)soundId
         filePath:(NSString * _Nullable)filePath
             loop:(BOOL)loop
            pitch:(double)pitch
              pan:(double)pan
             gain:(double)gain;
- (int)stopEffect:(int)soundId;
- (int)stopAllEffects;
- (int)preloadEffect:(int)soundId
            filePath:(NSString * _Nullable) filePath;
- (int)unloadEffect:(int)soundId;
- (int)pauseEffect:(int)soundId;
- (int)pauseAllEffects;
- (int)resumeEffect:(int)soundId;
- (int)resumeAllEffects;

#pragma mark Audio local recording
/**
 *  Start recording conversation to file specified by the file path.
 *
 *  @param filePath file path to save recorded conversation.
 *  @param quality  encode quality for the record file
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)startAudioRecording:(NSString * _Nonnull)filePath
                   quality:(AgoraRtcAudioRecordingQuality)quality;

/**
 *  Stop conversation recording
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)stopAudioRecording;

#pragma mark Audio echo test
/**
 *  Launches an echo test to test if the audio devices (e.g., headset and speaker) and the network connection work properly. In the test, the user speaks first, and the recording will be played back in 10 seconds. If the user can hear what he said in 10 seconds, it indicates that the audio devices and network connection work properly.
 Notes: Must call stopEchoTest to end the test, or won't start new test or join channel.
 *
 *  @param successBlock The callback indicates that the user has successfully joined the specified channel.
 *
 *  @return 0 when executed successfully. return negative value if failed. e.g. ERR_REFUSED (-5)：Failed to launch the echo test, e.g., initialization failed.
 */
- (int)startEchoTest:(void(^ _Nullable)(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed))successBlock;

/**
 *  Stop echo test.
 *
 *  @return 0 when executed successfully. return negative value if failed. e.g. ERR_REFUSED(-5)：Failed to stop the echo test. It could be that the echo test is not running.
 */
- (int)stopEchoTest;

#pragma mark External media source
// If external video source is to use, call this API before enableVideo/startPreview
- (void)setExternalVideoSource:(BOOL)enable useTexture:(BOOL)useTexture pushMode:(BOOL)pushMode;
// Push a video frame to SDK
- (BOOL)pushExternalVideoFrame:(AgoraVideoFrame * _Nonnull)frame;

- (void)enableExternalAudioSourceWithSampleRate:(NSUInteger)sampleRate
                               channelsPerFrame:(NSUInteger)channelsPerFrame;
- (void)disableExternalAudioSource;
- (BOOL)pushExternalAudioFrameRawData:(void * _Nonnull)data
                              samples:(NSUInteger)samples
                            timestamp:(NSTimeInterval)timestamp;
- (BOOL)pushExternalAudioFrameSampleBuffer:(CMSampleBufferRef _Nonnull)sampleBuffer;

- (int)setRecordingAudioFrameParametersWithSampleRate:(NSInteger)sampleRate
                                              channel:(NSInteger)channel
                                                 mode:(AgoraRtcRawAudioFrameOpMode)mode
                                       samplesPerCall:(NSInteger)samplesPerCall;
- (int)setPlaybackAudioFrameParametersWithSampleRate:(NSInteger)sampleRate
                                             channel:(NSInteger)channel
                                                mode:(AgoraRtcRawAudioFrameOpMode)mode
                                      samplesPerCall:(NSInteger)samplesPerCall;
- (int)setMixedAudioFrameParametersWithSampleRate:(NSInteger)sampleRate
                                   samplesPerCall:(NSInteger)samplesPerCall;

#pragma mark Encryption
/**
 * Specify encryption mode of AES encryption algorithm.
 * @param [in] encryptionMode
 *        encryption mode of AES algorithm, could be one of the following:
 *          "aes-128-xts", "aes-256-xts".
 *          The default value is "aes-128-xts". specify NULL value will use default encryption mode.
 * @return return 0 if success or an error code
 */
- (int)setEncryptionMode:(NSString * _Nullable)encryptionMode;

/**
 * Specifying encryption secret enables built-in AES-128 encryption. Leaving channel will clear the secret specified in last channel
 * @param [in] secret
 *        secret to enable encryption
 * @return return 0 if success or an error code
 */
- (int)setEncryptionSecret:(NSString * _Nullable)secret;

#pragma mark Data channel
- (int)createDataStream:(NSInteger * _Nonnull)streamId
               reliable:(BOOL)reliable
                ordered:(BOOL)ordered;
- (int)sendStreamMessage:(NSInteger)streamId
                    data:(NSData * _Nonnull)data;

#pragma mark Stream publish
- (int)configPublisher:(AgoraPublisherConfiguration * _Nonnull)config;
- (int)setVideoCompositingLayout:(AgoraRtcVideoCompositingLayout * _Nonnull)layout;
- (int)clearVideoCompositingLayout;

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
#pragma mark Screen capture
/**
 *  Start screen capture
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)startScreenCapture:(NSUInteger)windowId
          withCaptureFreq:(int)captureFreq
                  andRect:(CGRect)rect;

/**
 *  Stop screen capture
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)stopScreenCapture;

/**
 *  Update screen capture Region
 *
 *  @return 0 when executed successfully. return negative value if failed.
 */
- (int)updateScreenCaptureRegion:(CGRect)rect;

#pragma mark Device test
- (void)monitorDeviceChange:(BOOL)enabled;
- (NSArray<AgoraRtcDeviceInfo *> * _Nullable)enumerateDevices:(AgoraRtcDeviceType)type;
- (NSString * _Nullable)getDeviceId:(AgoraRtcDeviceType)type;
- (int)setDevice:(AgoraRtcDeviceType)type deviceId:(NSString * _Nonnull)deviceId;
- (int)getDeviceVolume:(AgoraRtcDeviceType)type;
- (int)setDeviceVolume:(AgoraRtcDeviceType)type volume:(int)volume;

- (int)startRecordingDeviceTest:(int)indicationInterval;
- (int)stopRecordingDeviceTest;

- (int)startPlaybackDeviceTest:(NSString * _Nonnull)audioFileName;
- (int)stopPlaybackDeviceTest;

- (int)startCaptureDeviceTest:(NSView * _Nonnull)view;
- (int)stopCaptureDeviceTest;
#endif

#pragma mark Server recording
- (int)startRecordingService:(NSString * _Nonnull)recordingKey;
- (int)stopRecordingService:(NSString * _Nonnull)recordingKey;
- (int)refreshRecordingServiceStatus;

#pragma mark Deprecated blocks
- (void)audioVolumeIndicationBlock:(void(^ _Nullable)(NSArray * _Nonnull speakers, NSInteger totalVolume))audioVolumeIndicationBlock __deprecated;
- (void)firstLocalVideoFrameBlock:(void(^ _Nullable)(NSInteger width, NSInteger height, NSInteger elapsed))firstLocalVideoFrameBlock __deprecated;
- (void)firstRemoteVideoDecodedBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger width, NSInteger height, NSInteger elapsed))firstRemoteVideoDecodedBlock __deprecated;
- (void)firstRemoteVideoFrameBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger width, NSInteger height, NSInteger elapsed))firstRemoteVideoFrameBlock __deprecated;
- (void)userJoinedBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger elapsed))userJoinedBlock __deprecated;
- (void)userOfflineBlock:(void(^ _Nullable)(NSUInteger uid))userOfflineBlock __deprecated;
- (void)userMuteAudioBlock:(void(^ _Nullable)(NSUInteger uid, BOOL muted))userMuteAudioBlock __deprecated;
- (void)userMuteVideoBlock:(void(^ _Nullable)(NSUInteger uid, BOOL muted))userMuteVideoBlock __deprecated;
- (void)localVideoStatBlock:(void(^ _Nullable)(NSInteger sentBitrate, NSInteger sentFrameRate))localVideoStatBlock __deprecated;
- (void)remoteVideoStatBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger delay, NSInteger receivedBitrate, NSInteger receivedFrameRate))remoteVideoStatBlock __deprecated;
- (void)cameraReadyBlock:(void(^ _Nullable)())cameraReadyBlock __deprecated;
- (void)connectionLostBlock:(void(^ _Nullable)())connectionLostBlock __deprecated;
- (void)rejoinChannelSuccessBlock:(void(^ _Nullable)(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed))rejoinChannelSuccessBlock __deprecated;
- (void)rtcStatsBlock:(void(^ _Nullable)(AgoraRtcStats * _Nonnull stat))rtcStatsBlock __deprecated;
- (void)leaveChannelBlock:(void(^ _Nullable)(AgoraRtcStats * _Nonnull stat))leaveChannelBlock __deprecated;
- (void)audioQualityBlock:(void(^ _Nullable)(NSUInteger uid, AgoraRtcQuality quality, NSUInteger delay, NSUInteger lost))audioQualityBlock __deprecated;
- (void)networkQualityBlock:(void(^ _Nullable)(NSUInteger uid, AgoraRtcQuality txQuality, AgoraRtcQuality rxQuality))networkQualityBlock __deprecated;
- (void)lastmileQualityBlock:(void(^ _Nullable)(AgoraRtcQuality quality))lastmileQualityBlock __deprecated;
- (void)mediaEngineEventBlock:(void(^ _Nullable)(NSInteger code))mediaEngineEventBlock __deprecated;
@end
