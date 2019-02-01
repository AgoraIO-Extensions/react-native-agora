//
//  AgoraObjects.h
//  AgoraRtcEngineKit
//
//  Copyright (c) 2018 Agora. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreMedia/CoreMedia.h>
#import "AgoraEnumerates.h"

#if TARGET_OS_IPHONE
#import <UIKit/UIKit.h>
typedef UIView VIEW_CLASS;
typedef UIColor COLOR_CLASS;
#elif TARGET_OS_MAC
#import <AppKit/AppKit.h>
typedef NSView VIEW_CLASS;
typedef NSColor COLOR_CLASS;
#endif

/** Properties of the video canvas object.
 */
__attribute__((visibility("default"))) @interface AgoraRtcVideoCanvas : NSObject
/** The video display view.

 VIEW_CLASS is a general name for this property. See the following definitions for iOS and macOS:

 - iOS: UIView
 - MacOS: NSView
 */
@property (strong, nonatomic) VIEW_CLASS* _Nullable view;
/** Render mode of the view: AgoraVideoRenderMode
 */
@property (assign, nonatomic) AgoraVideoRenderMode renderMode;
/** User ID of the view.
 */
@property (assign, nonatomic) NSUInteger uid;
@end

/** Statistics of the local video stream.
 */
__attribute__((visibility("default"))) @interface AgoraRtcLocalVideoStats : NSObject
/** Data transmission bitrate (Kbps) since last count.
 */
@property (assign, nonatomic) NSUInteger sentBitrate;
/** Data transmission frame rate (fps) since last count.
 */
@property (assign, nonatomic) NSUInteger sentFrameRate;
@end

/** Statistics of the remote video stream.
 */
__attribute__((visibility("default"))) @interface AgoraRtcRemoteVideoStats : NSObject
/** User ID of the user sending the video streams.
 */
@property (assign, nonatomic) NSUInteger uid;
/** Time delay (ms).
 */
@property (assign, nonatomic) NSUInteger __deprecated delay;
/** Width (pixels) of the video stream.
 */
@property (assign, nonatomic) NSUInteger width;
/** Height (pixels) of the video stream.
 */
@property (assign, nonatomic) NSUInteger height;
/** Data receive bitrate (Kbps) since last count.
 */
@property (assign, nonatomic) NSUInteger receivedBitrate;
/** Data receive frame rate (fps) since last count.
 */
@property (assign, nonatomic) NSUInteger receivedFrameRate;
/** Video stream type (high-stream or low-stream).
 */
@property (assign, nonatomic) AgoraVideoStreamType rxStreamType;
@end

/** Statistics of the remote audio stream.
 */
__attribute__((visibility("default"))) @interface AgoraRtcRemoteAudioStats : NSObject
/** User ID of the user sending the audio streams.
 */
@property (assign, nonatomic) NSUInteger uid;
/** Audio quality received by the user.
 */
@property (assign, nonatomic) NSUInteger quality;
/** Network delay from the sender to the receiver.
 */
@property (assign, nonatomic) NSUInteger networkTransportDelay;
/** Jitter buffer delay at the receiver.
 */
@property (assign, nonatomic) NSUInteger jitterBufferDelay;
/** Packet loss rate in the reported interval.
 */
@property (assign, nonatomic) NSUInteger audioLossRate;
@end

/** Properties of the audio volume information.

An array containing the user ID and volume information for each speaker:

- uid: User ID of the speaker. The uid of the local user is 0.
- volume：Volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).
 */
__attribute__((visibility("default"))) @interface AgoraRtcAudioVolumeInfo : NSObject
/** User ID of the speaker.
 */
@property (assign, nonatomic) NSUInteger uid;
/** The volume of the speaker. The value ranges between 0 (lowest volume) to 255 (highest volume).
 */
@property (assign, nonatomic) NSUInteger volume;
@end

/** Statistics of the channel
 */
__attribute__((visibility("default"))) @interface AgoraChannelStats: NSObject
/** Call duration in seconds, represented by an aggregate value.
 */
@property (assign, nonatomic) NSInteger duration;
/** Total number of bytes transmitted, represented by an aggregate value.
 */
@property (assign, nonatomic) NSInteger txBytes;
/** Total number of bytes received, represented by an aggregate value.
 */
@property (assign, nonatomic) NSInteger rxBytes;
/** Audio transmission bitrate (Kbps), represented by an instantaneous value.
 */
@property (assign, nonatomic) NSInteger txAudioKBitrate;
/** Audio receive bitrate (Kbps), represented by an instantaneous value.
 */
@property (assign, nonatomic) NSInteger rxAudioKBitrate;
/** Video transmission bitrate (Kbps), represented by an instantaneous value.
 */
@property (assign, nonatomic) NSInteger txVideoKBitrate;
/** Video receive bitrate (Kbps), represented by an instantaneous value.
 */
@property (assign, nonatomic) NSInteger rxVideoKBitrate;
/** Client-server latency (ms)
 */
@property (assign, nonatomic) NSInteger lastmileDelay;
/** Number of users in the channel.

- Communication profile: The number of users in the channel.
- Live broadcast profile:

  - If the local user is an audience: The number of hosts in the channel + 1.
  - if the user is a host: The number of hosts in the channel.
 */
@property (assign, nonatomic) NSInteger userCount;
/** Application CPU usage (%).
 */
@property (assign, nonatomic) double cpuAppUsage;
/** System CPU usage (%).
 */
@property (assign, nonatomic) double cpuTotalUsage;
@end

/** Properties of the video encoder configuration.
 */
__attribute__((visibility("default"))) @interface AgoraVideoEncoderConfiguration: NSObject
/** The video frame dimension used to specify the video quality in the total number of pixels along a frame's width and height.

You can customize the dimension, or select from the following list:

 - AgoraVideoDimension120x120
 - AgoraVideoDimension160x120
 - AgoraVideoDimension180x180
 - AgoraVideoDimension240x180
 - AgoraVideoDimension320x180
 - AgoraVideoDimension240x240
 - AgoraVideoDimension320x240
 - AgoraVideoDimension424x240
 - AgoraVideoDimension360x360
 - AgoraVideoDimension480x360
 - AgoraVideoDimension640x360
 - AgoraVideoDimension480x480
 - AgoraVideoDimension640x480
 - AgoraVideoDimension840x480
 - AgoraVideoDimension960x720
 - AgoraVideoDimension1280x720

 Note:

 - The dimension does not specify the orientation mode of the output ratio. For how to set the video orientation, see [AgoraVideoOutputOrientationMode](AgoraVideoOutputOrientationMode).
 - Whether 720p can be supported depends on the device. If the device cannot support 720p, the frame rate will be lower than the one listed in the table. Agora optimizes the video in lower-end devices.
 - iPhone does not support video frame dimensions above 720p.
 */
@property (assign, nonatomic) CGSize dimensions;

/** Frame rate of the video: AgoraVideoFrameRate

  *  AgoraVideoFrameRateFps1(1): 1 fps
  *  AgoraVideoFrameRateFps7(7): 7 fps
  *  AgoraVideoFrameRateFps10(10): 10 fps
  *  AgoraVideoFrameRateFps15(15): 15 fps
  *  AgoraVideoFrameRateFps24(24): 24 fps
  *  AgoraVideoFrameRateFps30(30): 30 fps
  *  AgoraVideoFrameRateFps60(30): 60 fps (macOS only)
 */
@property (assign, nonatomic) AgoraVideoFrameRate frameRate;

/** Bitrate of the video.

 Sets the video bitrate (Kbps). Refer to the table below and set your bitrate. If the bitrate you set is beyond the proper range, the SDK automatically adjusts it to a value within the range. You can also choose from the following options:

 - AgoraVideoBitrateStandard: (Recommended) The standard bitrate mode. In this mode, the bitrates differ between the live broadcast and communication profiles:

     - Communication profile: The video bitrate is the same as the base bitrate.
     - Live broadcast profile: The video bitrate is twice the base bitrate.

 - AgoraVideoBitrateCompatible: The compatible bitrate mode. In this mode, the bitrate stays the same regardless of the profile. In a live broadcast profile, if you choose this mode, the video frame rate may be lower than the set value.

Agora uses different video codecs for different profiles to optimize the user experience. For example, a communication profile prioritizes the smoothness while a live broadcast profile prioritizes the video quality (a higher bitrate). Therefore, Agora recommends setting this parameter as AgoraVideoBitrateStandard.

**Video Bitrate Table**

| Resolution        	| Frame Rate (fps) 	| Base Bitrate (Kbps, for Communication) 	| Live Bitrate (Kbps, for Live Broadcast) 	|
|-------------------	|------------------	|----------------------------------------	|-----------------------------------------	|
| 160 &times; 120   	| 15               	| 65                                     	| 130                                     	|
| 120 &times; 120   	| 15               	| 50                                     	| 100                                     	|
| 320 &times; 180   	| 15               	| 140                                    	| 280                                     	|
| 180 &times; 180   	| 15               	| 100                                    	| 200                                     	|
| 240 &times; 180   	| 15               	| 120                                    	| 240                                     	|
| 320 &times; 240   	| 15               	| 200                                    	| 400                                     	|
| 240 &times; 240   	| 15               	| 140                                    	| 280                                     	|
| 424 &times; 240   	| 15               	| 220                                    	| 440                                     	|
| 640 &times; 360   	| 15               	| 400                                    	| 800                                     	|
| 360 &times; 360   	| 15               	| 260                                    	| 520                                     	|
| 640 &times; 360   	| 30               	| 600                                    	| 1200                                    	|
| 360 &times; 360   	| 30               	| 400                                    	| 800                                     	|
| 480 &times; 360   	| 15               	| 320                                    	| 640                                     	|
| 480 &times; 360   	| 30               	| 490                                    	| 980                                     	|
| 640 &times; 480   	| 15               	| 500                                    	| 1000                                    	|
| 480 &times; 480   	| 15               	| 400                                    	| 800                                     	|
| 640 &times; 480   	| 30               	| 750                                    	| 1500                                    	|
| 480 &times; 480   	| 30               	| 600                                    	| 1200                                    	|
| 848 &times; 480   	| 15               	| 610                                    	| 1220                                    	|
| 848 &times; 480   	| 30               	| 930                                    	| 1860                                    	|
| 640 &times; 480   	| 10               	| 400                                    	| 800                                     	|
| 1280 &times; 720  	| 15               	| 1130                                   	| 2260                                    	|
| 1280 &times; 720  	| 30               	| 1710                                   	| 3420                                    	|
| 960 &times; 720   	| 15               	| 910                                    	| 1820                                    	|
| 960 &times; 720   	| 30               	| 1380                                   	| 2760                                    	|
| 1920 &times; 1080 	| 15               	| 2080                                   	| 4160                                    	|
| 1920 &times; 1080 	| 30               	| 3150                                   	| 6300                                    	|
| 1920 &times; 1080 	| 60               	| 4780                                   	| 6500                                    	|
| 2560 &times; 1440 	| 30               	| 4850                                   	| 6500                                    	|
| 2560 &times; 1440 	| 60               	| 6500                                   	| 6500                                    	|
| 3840 &times; 2160 	| 30               	| 6500                                   	| 6500                                    	|
| 3840 &times; 2160 	| 60               	| 6500                                   	| 6500                                    	|


**Note:**

The base bitrate in this table applies to a communication profile. A live broadcast profile generally requires a higher bitrate for better video quality. Agora recommends setting the bitrate mode as AgoraVideoBitrateStandard. You can also set the bitrate as twice the base bitrate.


*/
@property (assign, nonatomic) NSInteger bitrate;

/** The minimum encoding bitrate.

Sets the minimum encoding bitrate, in Kbps.

The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. Unless you have special requirements for image quality, Agora does not recommend changing this value.

**Note:**

This parameter applies only to the live broadcast profile.*/
@property (assign, nonatomic) NSInteger minBitrate;

/** Video orientation mode of the video: AgoraVideoOutputOrientationMode

 * AgoraVideoOutputOrientationModeAdaptative(0): (Default) The output video always follows the orientation of the captured video, because the receiver takes the rotational information passed on from the video encoder.
   - If the captured video is in landscape mode, the output video is in landscape mode.
   - If the captured video is in portrait mode, the output video is in portrait mode.
 * AgoraVideoOutputOrientationModeFixedLandscape(1): The output video is always in landscape mode. If the captured video is in portrait mode, the video encoder crops it to fit the output. This applies to situations where the receiver cannot process the rotational information. For example, CDN live streaming.
 * AgoraVideoOutputOrientationModeFixedPortrait(2): The output video is always in portrait mode. If the captured video is in landscape mode, the video encoder crops it to fit the output. This applies to situations where the receiver cannot process the rotational information. For example, CDN live streaming.

For scenarios with video rotation, Agora provides [Basic: Video Rotation Guide](https://docs.agora.io/en/2.3/product/Interactive%20Broadcast/Quickstart%20Guide/rotation_guide_ios) to guide users on how to set this parameter to get the video orientation that they want.

 */
@property (assign, nonatomic) AgoraVideoOutputOrientationMode orientationMode;

/** Initializes and returns a newly allocated AgoraVideoEncoderConfiguration object with the specified video resolution.

 @param size Video resolution.
 @param frameRate Video frame rate.
 @param bitrate Video bitrate.
 @param orientationMode AgoraVideoOutputOrientationMode.
 @return An initialized AgoraVideoEncoderConfiguration object.
 */
- (instancetype _Nonnull)initWithSize:(CGSize)size
                            frameRate:(AgoraVideoFrameRate)frameRate
                              bitrate:(NSInteger)bitrate
                      orientationMode:(AgoraVideoOutputOrientationMode)orientationMode;

/** Initializes and returns a newly allocated AgoraVideoEncoderConfiguration object with the specified video width and height.

 @param width Width of the video.
 @param height Height of the video.
 @param frameRate Video frame rate.
 @param bitrate Video bitrate.
 @param orientationMode AgoraVideoOutputOrientationMode.
 @return An initialized AgoraVideoEncoderConfiguration object.
 */
- (instancetype _Nonnull)initWithWidth:(NSInteger)width
                                height:(NSInteger)height
                             frameRate:(AgoraVideoFrameRate)frameRate
                               bitrate:(NSInteger)bitrate
                       orientationMode:(AgoraVideoOutputOrientationMode)orientationMode;
@end

/** A class for providing user-specific CDN live audio/video transcoding settings.
 */
__attribute__((visibility("default"))) @interface AgoraLiveTranscodingUser: NSObject
/** User ID of the CDN live host.
 */
@property (assign, nonatomic) NSUInteger uid;
/** Position and size of the video frame.
 */
@property (assign, nonatomic) CGRect rect;
/**  Layer position of the video frame. The value ranges between 0 and 100.

From v2.3.0, the Agora SDK supports setting zOrder as 0.

    - 0: (Default) Lowest.
    - 100: Highest.

 Note: If the value is set to < 0 or > 100, the ERR_INVALID_ARGUMENT error occurs.
 */
@property (assign, nonatomic) NSInteger zOrder;
/** Transparency of the video frame.

 The value ranges between 0.0 and 1.0:

 * 0.0: Completely transparent.
 * 1.0: (Default) Opaque.
 */
@property (assign, nonatomic) double alpha;
/** The audio channel of the sound.

 The default value is 0:

    - 0: (Default) Supports dual channels. Depends on the upstream of the broadcaster.
    - 1: The audio stream of the broadcaster uses the FL audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
    - 2: The audio stream of the broadcaster uses the FC audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
    - 3: The audio stream of the broadcaster uses the FR audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
    - 4: The audio stream of the broadcaster uses the BL audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
    - 5: The audio stream of the broadcaster uses the BR audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.

Note: If your setting is not 0, you may need a specialized player.
 */
@property (assign, nonatomic) NSInteger audioChannel;
@end

/** Image properties.

 A class for setting the properties of the watermark and background images in live broadcasting.
 */
__attribute__((visibility("default"))) @interface AgoraImage: NSObject
/** HTTP/HTTPS address of the image on the broadcasting video.
 */
@property (strong, nonatomic) NSURL *_Nonnull url;
/** Position and size of the image on the broadcasting video in CGRect.
 */
@property (assign, nonatomic) CGRect rect;
@end

/** A class for managing user-specific CDN live audio/video transcoding settings.
 */
__attribute__((visibility("default"))) @interface AgoraLiveTranscoding: NSObject
/** Size of the video (width and height).
 */
@property (assign, nonatomic) CGSize size;
/** Bitrate of the CDN live output video stream. The default value is 400 Kbps.
 */
@property (assign, nonatomic) NSInteger videoBitrate;
/** Frame rate of the CDN live output video stream. The default value is 15 fps.
 */
@property (assign, nonatomic) NSInteger videoFramerate;
/** Latency mode:

 * YES: Low latency with unassured quality.
 * NO:（Default）High latency with assured quality.
 */
@property (assign, nonatomic) BOOL lowLatency;
/** Video GOP in frames. The default value is 30 fps. */
@property (assign, nonatomic) NSInteger videoGop;
/** Video codec profile type: AgoraVideoCodecProfileType.
 */
@property (assign, nonatomic) AgoraVideoCodecProfileType videoCodecProfile;

/** An AgoraLiveTranscodingUser object managing the user layout configuration in the CDN live stream. Agora supports a maximum of 17 transcoding users in a CDN live stream channel. See AgoraLiveTranscodingUser for details.
 */
@property (copy, nonatomic) NSArray<AgoraLiveTranscodingUser *> *_Nullable transcodingUsers;
/** Reserved property. Extra user-defined information to send SEI for the H.264/H.265 video stream to the CDN live client.
 */
@property (copy, nonatomic) NSString *_Nullable transcodingExtraInfo;
/** The watermark image added to the CDN live publishing stream.

The audience of the CDN live publishing stream can see the watermark. See AgoraImage for the definition of the watermark.
 */
@property (strong, nonatomic) AgoraImage *_Nullable watermark;
/** The background image added to the CDN live publishing stream.

The audience of the CDN live publishing stream can see the background image. See AgoraImage for the definition of the background image.
 */
@property (strong, nonatomic) AgoraImage *_Nullable backgroundImage;
/** The background color in RGB hex value. Value only, do not include a #.

COLOR_CLASS is a general name for the type:

* iOS: UIColor
* MacOS: NSColor
 */
@property (strong, nonatomic) COLOR_CLASS *_Nullable backgroundColor;

/** Self-defined audio sampling rate: AgoraAudioSampleRateType.
 */
@property (assign, nonatomic) AgoraAudioSampleRateType audioSampleRate;
/** Bitrate (Kbps) of the CDN live audio output stream. The default value is 48, and the highest value is 128.
 */
@property (assign, nonatomic) NSInteger audioBitrate;
/** Agora’s self-defined audio channel type. Agora recommends choosing 1 or 2. Special players are required if you choose 3, 4 or 5:

 * 1: (Default) Mono
 * 2: Two-channel stereo
 * 3: Three-channel stereo
 * 4: Four-channel stereo
 * 5: Five-channel stereo
 */
@property (assign, nonatomic) NSInteger audioChannels;

/** Creates a default transcoding object.

 @return Default AgoraLiveTranscoding object.
 */
+(AgoraLiveTranscoding *_Nonnull) defaultTranscoding;

-(int)addUser:(AgoraLiveTranscodingUser * _Nonnull)user;

-(int)removeUser:(NSUInteger)uid;
@end

/** Configuration of the imported live broadcast voice or video stream.
 */
__attribute__((visibility("default"))) @interface AgoraLiveInjectStreamConfig: NSObject
/** Size of the added stream to the broadcast.

The default value is 0; same size as the original stream.
 */
@property (assign, nonatomic) CGSize size;
/** Video GOP of the added stream to the broadcast.

The default value is 30 fps.
 */
@property (assign, nonatomic) NSInteger videoGop;
/** Video frame rate of the added stream to the broadcast.

The default value is 15 fps.
 */
@property (assign, nonatomic) NSInteger videoFramerate;
/** Video bitrate of the added stream to the broadcast.

The default value is 400 Kbps.

The setting of the video bitrate is closely linked to the resolution. If the video bitrate you set is beyond a reasonable range, the SDK will set it within a reasonable range instead.
 */
@property (assign, nonatomic) NSInteger videoBitrate;

/** Audio sampling rate of the added stream to the broadcast.

The default value is 48000. See AgoraAudioSampleRateType for details.

**Note:**

Agora recommends using the default value.
 */
@property (assign, nonatomic) AgoraAudioSampleRateType audioSampleRate;
/** Audio bitrate of the added stream to the broadcast.

The default value is 48 Kbps.

**Note:**

Agora recommends using the default value.
 */
@property (assign, nonatomic) NSInteger audioBitrate;
/** Number of audio channels to add to the broadcast. The values are 1 and 2.

The default value is 1.

**Note:**

Agora recommends using the default value.
 */
@property (assign, nonatomic) NSInteger audioChannels;

/** Creates a default stream configuration object.

 @return Default stream configuration object.
 */
+(AgoraLiveInjectStreamConfig *_Nonnull) defaultConfig;
@end

__deprecated

/** Defines the region to show the video on the screen for each host in the channel.

**DEPRECATED**

 */
__attribute__((visibility("default"))) @interface AgoraRtcVideoCompositingRegion : NSObject
/** ID of the user whose video is displayed on the screen. */
@property (assign, nonatomic) NSUInteger uid;
/** Horizontal position of the region on the screen. The value ranges between 0.0 and 1.0. */
@property (assign, nonatomic) CGFloat x;
/** Vertical position of the region on the screen. The value ranges between 0.0 and 1.0. */
@property (assign, nonatomic) CGFloat y;
/** Actual width of the region. The value ranges between 0.0 and 1.0. For example, if the width of the screen is 360, and the width of the region is 120, set the width value as 0.33. */
@property (assign, nonatomic) CGFloat width;
/** Actual height of the region. The value ranges between 0.0 and 1.0. For example, if the height of the screen is 240, and the height of the region is 120, set the height value as 0.5. */
@property (assign, nonatomic) CGFloat height;
/** Layer position of the region. The value ranges between 0 and 100:

- 0: The region is at the bottom layer.
- 100: The region is at the top layer.

From v2.3.0, the Agora SDK supports setting zOrder as 0.
 */
@property (assign, nonatomic) NSInteger zOrder;
/** The transparency of the region. The value ranges between 0.0 and 1.0:

- 0: The region is transparent.
- 1: (Default) The region is opaque.
*/
@property (assign, nonatomic) CGFloat alpha;
/** Please ignore this property. Setting this property will not take effect. */
@property (assign, nonatomic) AgoraVideoRenderMode renderMode;
@end

__deprecated
/** Rtc video compositing layout.

**DEPRECATED**
 */
__attribute__((visibility("default"))) @interface AgoraRtcVideoCompositingLayout : NSObject
/** Please ignore this property.

Width of the entire canvas (display window or screen).
 */
@property (assign, nonatomic) NSInteger canvasWidth;
/** Please ignore this property.

Height of the entire canvas (display window or screen).
 */
@property (assign, nonatomic) NSInteger canvasHeight;
/** The background color in RGB hex value. Value only, do not include a #.
 */
@property (copy, nonatomic) NSString * _Nullable backgroundColor;
/** Screen display region information.

Sets the screen display region of a host or a delegated host in a CDN live stream. See AgoraRtcVideoCompositingRegion for details.
 */
@property (copy, nonatomic) NSArray<AgoraRtcVideoCompositingRegion *> * _Nullable regions;
/** Application defined data. Maximum size of 2048 bytes. */
@property (copy, nonatomic) NSString * _Nullable appData;
@end

/** CDN live stream settings.

 **DEPRECATED**

 Agora recommends using [setLiveTranscoding]([AgoraRtcEngineKit setLiveTranscoding:]) to set the CDN live stream settings.
 */
__deprecated
__attribute__((visibility("default"))) @interface AgoraPublisherConfiguration : NSObject
/** Sets whether or not the current host is the RTMP stream owner.

 - YES: (Default) The current host is the RTMP stream owner and the push-stream configuration is enabled.
 - NO: The current host is not the RTMP stream owner and the push-stream configuration is disabled.
 */
@property (assign, nonatomic) BOOL owner;

/** Width of the CDN live output data stream. The default value is 360.
 */
@property (assign, nonatomic) NSInteger width;
/** Height of the CDN live output data stream. The default value is 640.
 */
@property (assign, nonatomic) NSInteger height;
/** Frame rate of the CDN live output data stream. The default value is 15 fps.
 */
@property (assign, nonatomic) NSInteger framerate;
/** Bitrate of the CDN live output data stream. The default value is 500 Kbps.
 */
@property (assign, nonatomic) NSInteger bitrate;
/** Audio sample rate of the CDN live output data stream. The default value is 48000.
 */
@property (assign, nonatomic) NSInteger audiosamplerate;
/** Audio bitrate of the CDN live output data stream.  The default value is 48.
 */
@property (assign, nonatomic) NSInteger audiobitrate;
/** Audio channels of the CDN live output data stream. The default value is 1.
 */
@property (assign, nonatomic) NSInteger audiochannels;
/**

* 0: Tile horizontally.
* 1: Layered windows.
* 2: Tile vertically.
 */
@property (assign, nonatomic) NSInteger defaultLayout;
/** CDN live video stream lifecycle: AgoraRtmpStreamLifeCycle.
 */
@property (assign, nonatomic) AgoraRtmpStreamLifeCycle lifeCycle;

/** Width of the injected stream. Set it as 0.
 */
@property (assign, nonatomic) NSInteger injectStreamWidth;

/** Height of the injected stream. Set it as 0.
 */
@property (assign, nonatomic) NSInteger injectStreamHeight;

/** Address of the injected stream into the channel.
 */
@property (copy, nonatomic) NSString * _Nullable injectStreamUrl;

/** The push-stream address for the picture-in-picture layouts. The default value is nil.
 */
@property (copy, nonatomic) NSString * _Nullable publishUrl;

/** The push-stream HTTP/HTTPS URL address of the original stream not requiring picture-blending. The default value is nil.
 */
@property (copy, nonatomic) NSString * _Nullable rawStreamUrl;

/** Reserved field. The default value is nil.
 */
@property (copy, nonatomic) NSString * _Nullable extraInfo;

/** Whether or not the configuration is validated.
 */
-(BOOL) validate;
@end

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))

/** AgoraRtcDeviceInfo array.
 */
__attribute__((visibility("default"))) @interface AgoraRtcDeviceInfo : NSObject
@property (assign, nonatomic) int __deprecated index;

/** Device type: AgoraMediaDeviceType.
 */
@property (assign, nonatomic) AgoraMediaDeviceType type;

/** Device ID.
 */
@property (copy, nonatomic) NSString * _Nullable deviceId;

/** Device name.
 */
@property (copy, nonatomic) NSString * _Nullable deviceName;
@end
#endif

/** Video frame containing the Agora SDK's encoded video data.
 */
__attribute__((visibility("default"))) @interface AgoraVideoFrame : NSObject
/** Video format:

 * 1: I420
 * 2: BGRA
 * 3: NV21
 * 4: RGBA
 * 5: IMC2
 * 7: ARGB
 * 8: NV12
 * 12: iOS texture (CVPixelBufferRef)
 */
@property (assign, nonatomic) NSInteger format;

/** Timestamp of the incoming video frame (ms).

An incorrect timestamp results in frame loss or unsynchronized audio and video.

 */
@property (assign, nonatomic) CMTime time; // Time for this frame.

@property (assign, nonatomic) int stride DEPRECATED_MSG_ATTRIBUTE("use strideInPixels instead");

/** Line spacing of the incoming video frame, which must be in pixels instead of bytes. For textures, it is the width of the texture.
 */
@property (assign, nonatomic) int strideInPixels; // Number of pixels between two consecutive rows. Note: in pixel, not byte. Not used for iOS textures.

/** Height of the incoming video frame
 */
@property (assign, nonatomic) int height; // Number of rows of pixels. Not used for iOS textures.

/** CVPixelBuffer
 */
@property (assign, nonatomic) CVPixelBufferRef _Nullable textureBuf;

/** Raw data buffer
 */
@property (strong, nonatomic) NSData * _Nullable dataBuf;  // Raw data buffer. Not used for iOS textures.

/** (Optional) The number of pixels trimmed from the left. The default value is 0.
 */
@property (assign, nonatomic) int cropLeft;   // Number of pixels to crop on the left boundary.
/** (Optional) The number of pixels trimmed from the top. The default value is 0.
 */
@property (assign, nonatomic) int cropTop;    // Number of pixels to crop on the top boundary.
/** (Optional) The number of pixels trimmed from the right. The default value is 0.
 */
@property (assign, nonatomic) int cropRight;  // Number of pixels to crop on the right boundary.
/** (Optional) The number of pixels trimmed from the bottom. The default value is 0.
 */
@property (assign, nonatomic) int cropBottom; // Number of pixels to crop on the bottom boundary.
/** (Optional) The clockwise rotation of the incoming video frame.

Optional values: 0, 90, 180, or 270. The default value is 0.
 */
@property (assign, nonatomic) int rotation;   // 0, 90, 180, 270. See document for rotation calculation.
/* Note
 * 1. strideInPixels
 *    Stride is in pixels, not bytes.
 * 2. About the frame width and height.
 *    No field is defined for the width. However, it can be deduced by:
 *       croppedWidth = (strideInPixels - cropLeft - cropRight)
 *    And
 *       croppedHeight = (height - cropTop - cropBottom)
 * 3. About crop.
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
 *    If your buffer contains garbage data, you can crop them. For example, the frame size is
 *    360 &times; 640, often the buffer stride is 368, that is, the extra 8 pixels on the
 *    right are for padding, and should be removed. In this case, you can set:
 *    strideInPixels = 368;
 *    height = 640;
 *    cropRight = 8;
 *    // cropLeft, cropTop, cropBottom are set to a default of 0
 */
@end
