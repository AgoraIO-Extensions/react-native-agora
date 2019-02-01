//
//  AgoraLivePublisher.h
//  AgoraLiveKit
//
//  Created by Sting Feng on 2015-8-11.
//  Copyright (c) 2015 Agora. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AgoraObjects.h"

/** The base class for managing a live broadcast.  AgoraLiveKit manages the channel and all actions apart from publishing and subscribing.
 */
@class AgoraLiveKit;

/** A class for managing the actions related to live publishing.
 */
@class AgoraLivePublisher;

/** Protocol providing the AgoraLivePublisher class with callbacks.
 */
@protocol AgoraLivePublisherDelegate <NSObject>
@optional

/**
 A stream was published.

 @param publisher AgoraRtcEngineKit object.
 @param url Address to which the publisher publishes the stream.
 @param error AgoraErrorCode
 */
-(void)publisher:(AgoraLivePublisher *_Nonnull)publisher streamPublishedWithUrl:(NSString *_Nonnull)url error:(AgoraErrorCode)error;

/**
 A stream was unpublished.

 @param publisher AgoraRtcEngineKit object.
 @param url Address to which the publisher unpublishes the stream.
 */
-(void)publisher:(AgoraLivePublisher *_Nonnull)publisher streamUnpublishedWithUrl:(NSString *_Nonnull)url;

/**
 The publisher transcoding was updated.

 @param publisher AgoraRtcEngineKit object
 */
-(void)publisherTranscodingUpdated: (AgoraLivePublisher *_Nonnull)publisher;

/**
 The state of the imported external video stream.

 @param publisher AgoraRtcEngineKit object.
 @param url URL address of the imported external video stream added to the live broadcast.
 @param uid User ID.
 @param status State of the externally injected video stream: AgoraInjectStreamStatus.
 */
-(void)publisher:(AgoraLivePublisher *_Nonnull)publisher streamInjectedStatusOfUrl:(NSString *_Nonnull)url uid:(NSUInteger)uid status:(AgoraInjectStreamStatus)status;
@end


/**
 The AgoraLivePublisher class manages all actions related to live broadcast publishing.

 */
__attribute__((visibility("default"))) @interface AgoraLivePublisher: NSObject

/**
 Sets the delegate.

 @param delegate AgoraLivePublisherDelegate
 */
-(void)setDelegate:(_Nullable id<AgoraLivePublisherDelegate>)delegate;

/**
 Initializes the publisher.

 @param kit AgoraLiveKit
 @return AgoraLivePublisher object
 */
-(instancetype _Nonnull)initWithLiveKit:(AgoraLiveKit *_Nonnull)kit;

/**  Sets the video encoding profile manually.

 @param resolution Resolution of the video. The highest value is 1280 &times; 720.
 @param frameRate Frame rate of the video. The highest value is 30. You can set it to 5, 10, 15, 24, 30, and so on.
 @param bitrate Bitrate of the video. You need to manually work out the frame rate according to the width, height, and frame rate. With the same width and height, the bitrate varies with the change of the frame rate:

* If the frame rate is 5 fps, divide the recommended bitrate by 2.
* If the frame rate is 15 fps, use the recommended bitrate.
* If the frame rate is 30 fps, multiply the recommended bitrate by 1.5.
* Calculate your bitrate with the ratio if you choose other frame rates.

 If the bitrate you set is beyond the proper range, the SDK will automatically adjust it to a value within the range.
 */
- (void)setVideoResolution:(CGSize)resolution andFrameRate:(NSInteger)frameRate bitrate:(NSInteger)bitrate;

/**
Sets live transcoding.

 This method is used for CDN live. It sets the video layout and audio for CDN live.

 @param transcoding AgoraLiveTranscoding object.
 */
-(void)setLiveTranscoding:(AgoraLiveTranscoding *_Nullable)transcoding;


/**
 Adds a watermark to the local video stream.

 This method adds a watermark in the PNG file format onto the local video stream for the recording device and the audience in the channel and CDN live to see or capture it.
 To add the PNG file onto a CDN live publishing stream only, see [setLiveTranscoding](setLiveTranscoding:).


 @param watermark AgoraImage
 @return Name of the watermark image.
 */
-(int)addVideoWatermark:(AgoraImage * _Nonnull)watermark  NS_SWIFT_NAME(addVideoWatermark(_:));

/**
Removes the watermark from the video stream.
 */
-(void)clearVideoWatermarks;

/** Sets the media type.

 @param mediaType AgoraMediaType
 */
-(void)setMediaType:(AgoraMediaType)mediaType;

/** Adds a stream URL.

 This method is used for CDN live. It adds the URL to which the host publishes the stream.
 Note: This method only adds one URL each time it is called.

 @param url URL to which the host publishes the stream.
 @param transcodingEnabled * YES: Enable transcoding.
 * NO: Disable transcoding.

 */
-(void)addStreamUrl:(NSString *_Nullable)url transcodingEnabled:(BOOL)transcodingEnabled;

/** Removes a stream URL.

 This method is used for CDN live. It removes the URL to which the host publishes the stream.
 Note: This method only removes one URL each time it is called.

 @param url URL to which the host publishes the stream.
 */
-(void)removeStreamUrl:(NSString *_Nullable)url;

/** Publishes a stream.
 */
-(void)publish;

/** Stops stream publishing.
 */
-(void)unpublish;

#if TARGET_OS_IPHONE
/**
 Switches between front and rear cameras.
 */
-(void)switchCamera;
#endif

/**
Adds a URL address of the added stream into the live broadcast channel.

 @param url URL address to add to the ongoing live broadcast. Valid protocols are RTMP, HLS, and FLV live streaming protocols and the MP3/MP4 streams.
 @param config AgoraLiveInjectStreamConfig
 */
- (void)addInjectStreamUrl:(NSString *_Nonnull)url config:(AgoraLiveInjectStreamConfig * _Nonnull)config;

/**
 Removes the URL from the live broadcast.

 @param url URL address of the added stream to remove.
 */
- (void)removeInjectStreamUrl:(NSString *_Nonnull)url;

@end
