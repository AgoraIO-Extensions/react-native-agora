//
//  AgoraLiveSubscriber.h
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

/** A class for managing actions related to live subscribing.
 */
@class AgoraLiveSubscriber;

/** Protocol providing the AgoraLiveSubscriber class with callbacks.
 */
@protocol AgoraLiveSubscriberDelegate <NSObject>
@optional

// Subscriber

/**
 A stream was published by a specified host.

 @param subscriber AgoraLiveSubscriber
 @param uid User ID of the host
 @param type Stream type: AgoraMediaType
 */
- (void)subscriber: (AgoraLiveSubscriber *_Nonnull)subscriber publishedByHostUid:(NSUInteger)uid streamType:(AgoraMediaType) type;

/**
 The stream type was changed by a specified host.

 @param subscriber AgoraLiveSubscriber
 @param type AgoraMediaType
 @param uid User ID of the host
 */
- (void)subscriber: (AgoraLiveSubscriber *_Nonnull)subscriber streamTypeChangedTo:(AgoraMediaType) type byHostUid:(NSUInteger)uid;

// Unmute, offline

/**
 A stream was unpublished by a specified host.

 @param subscriber AgoraLiveSubscriber
 @param uid User ID of the host
 */
- (void)subscriber: (AgoraLiveSubscriber *_Nonnull)subscriber unpublishedByHostUid:(NSUInteger)uid;

// Video
/** The first frame of the specified remote user was displayed successfully.
 *
 *  @param subscriber     Live subscriber.
 *  @param uid     Remote user id.
 *  @param size    Size of video stream.
 *  @param elapsed Time elapsed (ms) from the beginning of the session.
 */
- (void)subscriber:(AgoraLiveSubscriber *_Nonnull)subscriber firstRemoteVideoDecodedOfHostUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed;

/**
 *  The video size and rotational change of the specified user.
 *
 *  @param subscriber     Live subscriber
 *  @param uid     User ID
 *  @param size    New video size
 *  @param rotation  New video rotation
 */
- (void)subscriber:(AgoraLiveSubscriber *_Nonnull)subscriber videoSizeChangedOfHostUid:(NSUInteger)uid size:(CGSize)size rotation:(NSInteger)rotation;
@end


/**
 The AgoraLiveSubscriber class manages all actions related to live broadcast subscribing.

 */
__attribute__((visibility("default"))) @interface AgoraLiveSubscriber: NSObject // AgoraLiveSubscriber

/**
 Initializes an AgoraLiveSubscriber object.

 @param kit AgoraLiveKit
 @return AgoraLiveSubscriber object.
 */
-(instancetype _Nonnull)initWithLiveKit:(AgoraLiveKit * _Nonnull)kit;


/**
 Sets the delegate.

 @param delegate AgoraLiveSubscriberDelegate
 */
-(void)setDelegate:(_Nullable id<AgoraLiveSubscriberDelegate>)delegate;

/**
 Subscribes to a host.

 @param uid User ID of the host
 @param mediaType Media type: AgoraMediaType
 @param view View to render
 @param mode Video display mode: AgoraVideoRenderMode
 @param videoType AgoraVideoStreamType
 */
- (void)subscribeToHostUid:(NSUInteger)uid
             mediaType:(AgoraMediaType)mediaType
                  view:(VIEW_CLASS *_Nullable)view
            renderMode:(AgoraVideoRenderMode)mode
             videoType:(AgoraVideoStreamType)videoType;

/**
 Unsubscribes from a host.

 @param uid User ID of the host
 */
-(void)unsubscribeToHostUid:(NSUInteger)uid;

@end
