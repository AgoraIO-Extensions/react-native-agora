//
//  AgoraRtcEngineKit.h
//  AgoraRtcEngineKit
//
//  Copyright (c) 2018 Agora. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AgoraConstants.h"
#import "AgoraObjects.h"
#import "AgoraMediaIO.h"

/** Agora provides ensured quality of experience (QoE) for worldwide Internet-based voice and video communications through a virtual global network optimized for real-time web and mobile-to-mobile applications.

 The AgoraRtcEngineKit class is the entry point of the Agora SDK providing API methods for apps to easily start voice and video communication.
 */
@class AgoraRtcEngineKit;

/** The AgoraRtcEngineDelegate protocol enables callbacks to your app.

 The SDK uses delegate callbacks in the AgoraRtcEngineDelegate protocol to report runtime events to the app.
 From v1.1, some block callbacks in the SDK are replaced with delegate callbacks. The old block callbacks are therefore deprecated, but can still be used in the current version. However, Agora recommends replacing block callbacks with delegate callbacks. The SDK calls the block callback if a callback is defined in both the block and delegate callbacks.
 */
@protocol AgoraRtcEngineDelegate <NSObject>
@optional

#pragma mark Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Delegate Methods

 The SDK uses delegate callbacks in the AgoraRtcEngineDelegate protocol to report runtime events to the app.
 From v1.1, some block callbacks in the SDK are replaced with delegate callbacks. The old block callbacks are therefore deprecated, but can still be used in the current version. However, Agora recommends replacing block callbacks with delegate callbacks. The SDK calls the block callback if a callback is defined in both the block and delegate callbacks.
 * -----------------------------------------------------------------------------
 */

#pragma mark Core Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Core Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Reports a warning during SDK runtime.

 In most cases, the app can ignore the warning reported by the SDK because the SDK can usually fix the issue and resume running.

 For instance, the SDK may report an AgoraWarningCodeOpenChannelTimeout(106) warning upon disconnection from the server and attempts to reconnect.

 See [AgoraWarningCode](AgoraWarningCode) for details.

 @param engine      AgoraRtcEngineKit object
 @param warningCode Warning code: AgoraWarningCode
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOccurWarning:(AgoraWarningCode)warningCode;

/** Reports an error during SDK runtime.

In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.

For example, the SDK reports an AgoraErrorCodeStartCall = 1002 error when failing to initialize a call. The app informs the user that the call initialization failed and invokes the [leaveChannel]([AgoraRtcEngineKit leaveChannel:]) method to leave the channel.

See [AgoraErrorCode](AgoraErrorCode) for details.

 @param engine    AgoraRtcEngineKit object
 @param errorCode AgoraErrorCode
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOccurError:(AgoraErrorCode)errorCode;

/** Occurs when a method is executed by the SDK.

 @param engine AgoraRtcEngineKit object.
 @param error  The error code (AgoraErrorCode) returned by the SDK when the method fails. If the SDK returns 0, then the SDK call was successful.
 @param api    The method executed by the SDK.
 @param result The result of the method call.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didApiCallExecute:(NSInteger)error api:(NSString * _Nonnull)api result:(NSString * _Nonnull)result;

/** Occurs when a user joins a specified channel.

 Same as `joinSuccessBlock` in the [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) method.

 @param engine  AgoraRtcEngineKit object
 @param channel Channel name
 @param uid     User ID. If the `uid` is specified in the [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) method, the specified ID is returned. If the user ID is not specified when joinChannel is called, the server automatically assigns a `uid`.
 @param elapsed Time elapsed (ms) from the user calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didJoinChannel:(NSString * _Nonnull)channel withUid:(NSUInteger)uid elapsed:(NSInteger) elapsed;

/** Occurs when a user rejoins the channel.

 If the client loses connection with the server because of network problems, the SDK automatically attempts to reconnect and then triggers this callback upon reconnection, indicating that the user rejoins the channel with the assigned channel ID and user ID.

 @param engine  AgoraRtcEngineKit object.
 @param channel Channel name.
 @param uid     User ID. If the `uid` is specified in the [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) method, the specified ID is returned. If the user ID is not specified when joinChannel is called, the server automatically assigns a `uid`.
 @param elapsed Time elapsed (ms) from starting to reconnect to successful reconnection.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didRejoinChannel:(NSString * _Nonnull)channel withUid:(NSUInteger)uid elapsed:(NSInteger) elapsed;

/** Occurs when the user leaves the channel.

 When the app calls the [leaveChannel]([AgoraRtcEngineKit leaveChannel:]) method, this callback notifies the app that the user leaves the channel.

 With this callback, the app retrieves information, such as the call duration and the statistics of the data received/transmitted by [audioQualityOfUid]([AgoraRtcEngineDelegate rtcEngine:audioQualityOfUid:quality:delay:lost:]).

 @param engine AgoraRtcEngineKit object
 @param stats  Statistics of the call: AgoraChannelStats
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didLeaveChannelWithStats:(AgoraChannelStats * _Nonnull)stats;

/** Occurs when the user role switches in a live broadcast. For example, from a host to an audience or vice versa.

 @param engine  AgoraRtcEngineKit object.
 @param oldRole Role that the user switches from: AgoraClientRole.
 @param newRole Role that the user switches to: AgoraClientRole.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didClientRoleChanged:(AgoraClientRole)oldRole newRole:(AgoraClientRole)newRole;

/** Occurs when a user or host joins the channel. Same as [userJoinedBlock]([AgoraRtcEngineKit userJoinedBlock:]).

 - Communication channel: This callback notifies the app that another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
 - Live-broadcast channel: This callback notifies the app that the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. Agora recommends limiting the number of hosts to 17.

 **Note:**

 In the live broadcast channels:

 * The host receives the callback when another host joins the channel.
 * The audience in the channel receives the callback when a new host joins the channel.
 * When a web application joins the channel, this callback is triggered as long as the web application publishes streams.

 @param engine  AgoraRtcEngineKit object.
 @param uid     ID of the user or host who joins the channel. If the `uid` is specified in the [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) method, the specified ID is returned. If the `uid` is not specified in the joinChannelByToken method, the Agora server automatically assigns a `uid`.
 @param elapsed Time elapsed (ms) from the newly joined user/host calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) or [setClientRole]([AgoraRtcEngineKit setClientRole:]) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didJoinedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed;

/** Occurs when a remote user (Communication)/host (Live Broadcast) leaves the channel. Same as [userOfflineBlock]([AgoraRtcEngineKit userOfflineBlock:]).

There are two reasons for users to be offline:

- Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When the message is received, the SDK assumes that the user/host leaves the channel.
- Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. Unreliable network connections may lead to false detection, so Agora recommends using a signaling system for more reliable offline detection.

 @param engine AgoraRtcEngineKit object
 @param uid    ID of the user or host who leaves the channel or goes offline.
 @param reason Reason why the user goes offline, see AgoraUserOfflineReason for details.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOfflineOfUid:(NSUInteger)uid reason:(AgoraUserOfflineReason)reason;

/** Occurs when the network connection state changes.

The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason of the change.

@param state The current network connection state, see AgoraConnectionStateType for details.
@param reason The reason causing the change of the connection state, see AgoraConnectionChangedReason for details.
*/
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine connectionChangedToState:(AgoraConnectionStateType)state reason:(AgoraConnectionChangedReason)reason;

/** Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.

This callback is triggered when the SDK cannot connect to the server 10 seconds after calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]), regardless of whether the SDK is in the channel or not.

This callback is different from [rtcEngineConnectionDidInterrupted]([AgoraRtcEngineDelegate rtcEngineConnectionDidInterrupted:]):

- The [rtcEngineConnectionDidInterrupted]([AgoraRtcEngineDelegate rtcEngineConnectionDidInterrupted:]) callback is triggered when the SDK loses connection with the server for more than four seconds after the SDK successfully joins the channel.
- The [rtcEngineConnectionDidLost]([AgoraRtcEngineDelegate rtcEngineConnectionDidLost:]) callback is triggered when the SDK loses connection with the server for more than 10 seconds, regardless of whether the SDK joins the channel or not.

For both callbacks, the SDK tries to reconnect to the server until the app calls [leaveChannel]([AgoraRtcEngineKit leaveChannel:]).

@param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineConnectionDidLost:(AgoraRtcEngineKit * _Nonnull)engine;

/** Occurs when the token expires in 30 seconds.

 The user becomes offline if the `token` used in [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) expires. This callback is triggered 30 seconds before the `token` expires to remind the app to get a new `token`.
 Upon receiving this callback, generate a new `token` on the server and call [renewToken]([AgoraRtcEngineKit renewToken:]) to pass the new `token` to the SDK.

 @param engine AgoraRtcEngineKit object.
 @param token  The `token` that expires in 30 seconds.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine tokenPrivilegeWillExpire:(NSString *_Nonnull)token;

/** Occurs when the token expires.

 After a `token` is specified by calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]), if the SDK losses connection with the Agora server due to network issues, the `token` may expire after a certain period of time and a new `token` may be required to reconnect to the server.

 This callback notifies the app to generate a new `token`. Call [renewToken]([AgoraRtcEngineKit renewToken:]) to renew the `token`.

In previous SDKs, this notification was provided in the [didOccurError]([AgoraRtcEngineDelegate rtcEngine:didOccurError:]) callback as the AgoraErrorCodeTokenExpired(-109),
 AgoraErrorCodeInvalidToken(-110) errors. Starting from v1.7.3, the old method is still valid, but it is recommended to use this callback.

 @param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineRequestToken:(AgoraRtcEngineKit * _Nonnull)engine;


#pragma mark Media Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Media Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when the microphone is enabled/disabled.

 @param enabled  Whether the microphone is enabled/disabled:

 * YES: Enabled.
 * NO: Disabled.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didMicrophoneEnabled:(BOOL)enabled;

/** Reports which users are speaking and the speakers' volume.

 Same as [audioVolumeIndicationBlock]([AgoraRtcEngineKit audioVolumeIndicationBlock:]).

 This callback reports the ID and volume of the loudest speakers at the moment in the channel.

 This callback is disabled by default and can be enabled by the [enableAudioVolumeIndication]([AgoraRtcEngineKit enableAudioVolumeIndication:smooth:]) method.

 The local user and the remote speakers are reported in separate callbacks:

 - In the local user's callback, the `speakers` array contains a `uid` 0 and a `volume` that equals to the `totalVolume` regardless of whether the local user speaks or not.
 - In the remote speakers' callback, the `speakers` array contains the user ID and volume of each speaker.

**Note:**

- Calling [muteLocalAudioStream]([AgoraRtcEngineKit muteLocalAudioStream:]) affects the behavior of the SDK:
    - If the local user calls [muteLocalAudioStream]([AgoraRtcEngineKit muteLocalAudioStream:]), the SDK stops returning the local user's callback immediately.
    - 15 seconds after a remote speaker calls [muteLocalAudioStream]([AgoraRtcEngineKit muteLocalAudioStream:]), the remote speakers' callback excludes information of this user; 15 seconds after all remote users call [muteLocalAudioStream]([AgoraRtcEngineKit muteLocalAudioStream:]), the SDK stops triggering the remote speakers' callback.
- An empty `speakers` array in the callback indicates that no remote user is speaking at the moment.

 @param engine      AgoraRtcEngineKit object.
 @param speakers    An array containing the user ID and volume information for each speaker: AgoraRtcAudioVolumeInfo

- uid: User ID of the speaker.
- volume: Volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).

 @param totalVolume Total volume of all speakers. The value ranges between 0 (lowest volume) and 255 (highest volume).
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine reportAudioVolumeIndicationOfSpeakers:(NSArray<AgoraRtcAudioVolumeInfo *> * _Nonnull)speakers totalVolume:(NSInteger)totalVolume;

/** Reports which user is the loudest speaker.

If the user enables the audio volume indication by calling [enableAudioVolumeIndication](enableAudioVolumeIndication:smooth:), this callback returns the user ID of the active speaker whose voice is detected by the audio volume detection module of the SDK.

**Note:**

* To receive this callback, you need to call [enableAudioVolumeIndication](enableAudioVolumeIndication:smooth:).
* This callback returns the user ID of the user with the highest voice volume during a period of time, instead of at the moment.
 @param engine     AgoraRtcEngineKit object.
 @param speakerUid The user ID of the active speaker. A `speakerUid` of 0 represents the local user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine activeSpeaker:(NSUInteger)speakerUid;

/** Occurs when the engine sends the first local audio frame.

 @param engine  AgoraRtcEngineKit object
 @param elapsed Time elapsed (ms) from the local user calling [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstLocalAudioFrame:(NSInteger)elapsed;

/** Occurs when the engine receives the first audio frame from a specified remote user.

 @param engine  AgoraRtcEngineKit object.
 @param uid     User ID of the remote user.
 @param elapsed Time elapsed (ms) from the remote user calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstRemoteAudioFrameOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed;

/** Occurs when the video stops playing.

 The app can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops.

 @param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineVideoDidStop:(AgoraRtcEngineKit * _Nonnull)engine;

 /** Occurs when the engine sends the first local video frame.

 Same as [firstLocalVideoFrameBlock]([AgoraRtcEngineKit firstLocalVideoFrameBlock:]).
 @param engine  AgoraRtcEngineKit object.
 @param size    Size of the first local video frame (width and height).
 @param elapsed Time elapsed (ms) from the local user calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) until this callback is triggered.

 If [startPreview]([AgoraRtcEngineKit startPreview]) is called before [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]), then `elapsed` is the time elapsed from [startPreview]([AgoraRtcEngineKit startPreview]) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstLocalVideoFrameWithSize:(CGSize)size elapsed:(NSInteger)elapsed;

/** Occurs when the engine decodes the first video frame from a specified remote user.

 Same as [firstRemoteVideoDecodedBlock]([AgoraRtcEngineKit firstRemoteVideoDecodedBlock:]).

 @param engine  AgoraRtcEngineKit object.
 @param uid     User ID of the remote user sending the video stream.
 @param size    Size of the video frame (width and height).
 @param elapsed Time elapsed (ms) from the remote user calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstRemoteVideoDecodedOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed;

/** Occurs when the first remote video frame is rendered.

Same as [firstRemoteVideoFrameBlock]([AgoraRtcEngineKit firstRemoteVideoFrameBlock:]).

 @param engine  AgoraRtcEngineKit object.
 @param uid     User ID of the remote user sending the video stream.
 @param size    Size of the video frame (width and height).
 @param elapsed Time elapsed (ms) from the remote user calling [joinChannelByToken]([AgoraRtcEngineKit joinChannelByToken:channelId:info:uid:joinSuccess:]) until this callback is triggered.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine firstRemoteVideoFrameOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed;

/** Occurs when a remote user's audio stream is muted/unmuted.

 @param engine AgoraRtcEngineKit object
 @param muted  Whether the remote user's audio stream is muted/unmuted:

 * YES: Muted.
 * NO: Unmuted.
 @param uid  ID of the remote user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didAudioMuted:(BOOL)muted byUid:(NSUInteger)uid;

/** Occurs when a remote user's video stream playback pauses/resumes. Same as [userMuteVideoBlock]([AgoraRtcEngineKit userMuteVideoBlock:]).

 **Note:**

 Invalid when the number of users in a channel exceeds 20.

 @param engine AgoraRtcEngineKit object.
 @param muted  A remote user's video stream playback pauses/resumes:

 * YES: Pause.
 * NO: Resume.

 @param uid    User ID of the remote user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didVideoMuted:(BOOL)muted byUid:(NSUInteger)uid;

/** Occurs when a specific remote user enables/disables the video module.

 Once the video module is disabled, the remote user can only use a voice call. The remote user cannot send or receive any video from other users.

 @param engine  AgoraRtcEngineKit object.
 @param enabled Whether the remote user enables/disables the video module:

 * YES: Enable. The remote user can enter a video session.
 * NO: Disable. The remote user can only enter a voice session, and cannot send or receive any video stream.

 @param uid  User ID of the remote user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didVideoEnabled:(BOOL)enabled byUid:(NSUInteger)uid;

/** Occurs when a specific remote user enables/disables the local video capturing function.

This callback is only applicable to the scenario when the user only wants to watch the remote video without sending any video stream to the other user.

 @param engine  AgoraRtcEngineKit object.
 @param enabled Whether the specific remote user enables/disables the local video capturing function:

 * YES: Enabled. Other users in the channel can see the video of this remote user.
 * NO: Disabled. Other users in the channel do not receive the video stream from this remote user, while this remote user can still receive the video streams from other users.

 @param uid  User ID of the remote user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didLocalVideoEnabled:(BOOL)enabled byUid:(NSUInteger)uid;

/** Occurs when the video size or rotation of a specific remote user changes.

 @param engine   AgoraRtcEngineKit object
 @param uid      User ID of the remote user or local user (0) whose video size or rotation changes.
 @param size     New video size.
 @param rotation New rotation of the video (0 to 360).
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine videoSizeChangedOfUid:(NSUInteger)uid size:(CGSize)size rotation:(NSInteger)rotation;

/** Occurs when the remote video stream state changes.

This callback is triggered when the time interval between two video frames equals or exceeds 600 ms.

 @param engine AgoraRtcEngineKit object
 @param uid    ID of the user whose video state changes.
 @param state  State of the remote video: Stopped playing, playing normally, or frozen. See AgoraVideoRemoteState for details.

 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine remoteVideoStateChangedOfUid:(NSUInteger)uid state:(AgoraVideoRemoteState)state;


#pragma mark Fallback Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Fallback Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when the published media stream falls back to an audio-only stream due to unreliable network conditions or switches back to the video when the network conditions improve.

 If you call [setLocalPublishFallbackOption]([AgoraRtcEngineKit setLocalPublishFallbackOption:]) and set `option` as AgoraStreamFallbackOptionAudioOnly, this callback is triggered when the published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video when the uplink network condition improves.

 **Note:**

 Once the published stream falls back to audio only, the remote app receives the [userMuteVideoBlock]([AgoraRtcEngineKit userMuteVideoBlock:]) callback.

 @param engine              AgoraRtcEngineKit object.
 @param isFallbackOrRecover Whether the published stream falls back to audio-only or switches back to the video:

 * YES: The published stream falls back to audio-only due to unreliable network conditions.
 * NO: The published stream switches back to the video after the network conditions improve.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didLocalPublishFallbackToAudioOnly:(BOOL)isFallbackOrRecover;

 /** Occurs when the remote media stream falls back to an audio-only stream due to unreliable network conditions or switches back to the video after the network conditions improve.

 If you call [setRemoteSubscribeFallbackOption]([AgoraRtcEngineKit setRemoteSubscribeFallbackOption:]) and set option to `AgoraStreamFallbackOptionAudioOnly`, this callback is triggered when the remote media stream falls back to audio only due to unreliable network conditions or switches back to the video after the network condition improves.

 **Note:**

 Once the remote media stream is switched to the low stream due to unreliable network conditions, you can monitor the stream switch between a high and low stream in the [remoteVideoStats]([AgoraRtcEngineDelegate rtcEngine:remoteVideoStats:]) callback.

 @param engine              AgoraRtcEngineKit object.
 @param isFallbackOrRecover Whether the remote media stream falls back to audio-only or switches back to the video:

 * YES: The remote media stream falls back to audio-only due to unreliable network conditions.
 * NO: The remote media stream switches back to the video stream after the network conditions improve.
 @param uid                 ID of the remote user sending the stream.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didRemoteSubscribeFallbackToAudioOnly:(BOOL)isFallbackOrRecover byUid:(NSUInteger)uid;


#pragma mark Device Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Device Delegate Methods
 * -----------------------------------------------------------------------------
 */

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))

/** Occurs when the device state changes. (macOS only.)

 @param engine     AgoraRtcEngineKit object.
 @param deviceId   Device ID.
 @param deviceType Device type: AgoraMediaDeviceType.
 @param state      State of the device:

 * 0: Added.
 * 1: Removed.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine device:(NSString * _Nonnull)deviceId type:(AgoraMediaDeviceType)deviceType stateChanged:(NSInteger) state;

#endif

/** Occurs when the local audio route changes.

This callback returns that the local audio route switches to an earpiece, speakerphone, headset, or Bluetooth device.

 @param engine  AgoraRtcEngineKit object.
 @param routing Audio route: AgoraAudioOutputRouting.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didAudioRouteChanged:(AgoraAudioOutputRouting)routing;

/** Occurs when the camera turns on and is ready to capture video.

 Same as [cameraReadyBlock]([AgoraRtcEngineKit cameraReadyBlock:]).

 @param engine AgoraRtcEngineKit object.
 */
- (void)rtcEngineCameraDidReady:(AgoraRtcEngineKit * _Nonnull)engine;

#if TARGET_OS_IPHONE

/** Occurs when a camera focus area changes. (iOS only.)

 @param engine AgoraRtcEngineKit object.
 @param rect   Rectangular area in the camera zoom specifying the focus area.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine cameraFocusDidChangedToRect:(CGRect)rect;
#endif

#if TARGET_OS_IPHONE
/** The camera exposure area changes. (iOS only)

@param engine AgoraRtcEngineKit object.
@param rect   Rectangular area in the camera zoom specifying the exposure area.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine cameraExposureDidChangedToRect:(CGRect)rect;
#endif


#pragma mark Statistics Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Statistics Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Reports the statistics of the current call session once every two seconds.

 Same as [rtcStatsBlock]([AgoraRtcEngineKit rtcStatsBlock:]).

 @param engine AgoraRtcEngineKit object
 @param stats  RTC engine statistics: [AgoraChannelStats](AgoraChannelStats).
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine reportRtcStats:(AgoraChannelStats * _Nonnull)stats;

/** Reports the last mile network quality of the local user once every two seconds before the user joins the channel.

Last mile refers to the connection between the local device and Agora's edge server. After the application calls the [enableLastmileTest]([AgoraRtcEngineKit enableLastmileTest]) method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.

 @param engine  AgoraRtcEngineKit object
 @param quality The last mile network quality based on the uplink and dowlink packet loss rate and jitter. See AgoraNetworkQuality.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine lastmileQuality:(AgoraNetworkQuality)quality;

/** Reports the last mile network quality of each user in the channel once every two seconds.

 Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the uplink last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.

 @param engine    AgoraRtcEngineKit object.
 @param uid       User ID. The network quality of the user with this `uid` is reported. If the `uid` is 0, the local network quality is reported.
 @param txQuality Uplink transmission quality of the user in terms of the transmission bitrate, packet loss rate, average RTT (Round-Trip Time), and jitter of the uplink network. `txQuality` is a quality rating helping you understand how well the current uplink network conditions can support the selected AgoraVideoEncoderConfiguration. For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution of 640 &times; 480 and a frame rate of 15 fps in the live broadcast profile, but may be inadequate for resolutions higher than 1280 &times; 720. See  AgoraNetworkQuality.
 @param rxQuality Downlink network quality rating of the user in terms of packet loss rate, average RTT, and jitter of the downlink network.  See AgoraNetworkQuality.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine networkQuality:(NSUInteger)uid txQuality:(AgoraNetworkQuality)txQuality rxQuality:(AgoraNetworkQuality)rxQuality;

/** Reports the statistics of the uploading local video streams once every two seconds. Same as [localVideoStatBlock]([AgoraRtcEngineKit localVideoStatBlock:]).

 @param engine AgoraRtcEngineKit object.
 @param stats  Statistics of the uploading local video streams: AgoraRtcLocalVideoStats.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine localVideoStats:(AgoraRtcLocalVideoStats * _Nonnull)stats;

/** Reports the statistics of the remote video streams from each user/host.

This callback is triggered once every two seconds for each user/host. If a channel includes multiple users, then this callback is triggered as many times.

 The statistics that this callback reports are more closely linked to the real user experience of the video transmission quality than the statistics that the [videoTransportStatsOfUid]([AgoraRtcEngineDelegate rtcEngine:videoTransportStatsOfUid:delay:lost:rxKBitRate:]) callback reports. This callback reports more about media layer statistics such as the frame loss rate, and the [videoTransportStatsOfUid]([AgoraRtcEngineDelegate rtcEngine:videoTransportStatsOfUid:delay:lost:rxKBitRate:]) callback reports more about the transport layer statistics such as the packet loss rate.

 Schemes such as FEC (Forward Error Correction) or retransmission can keep the frame loss rate at the lowest level even when the packet loss rate is high.

 @param engine AgoraRtcEngineKit object.
 @param stats  Statistics of the received remote video streams, see AgoraRtcRemoteVideoStats.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine remoteVideoStats:(AgoraRtcRemoteVideoStats * _Nonnull)stats;

/** Reports the statistics of the remote audio streams from each user/host.

 This callback replaces the [audioQualityOfUid]([AgoraRtcEngineDelegate rtcEngine:audioQualityOfUid:quality:delay:lost:]) callback.

 This callback is triggered once every two seconds for each user/host. If a channel includes multiple users, then this callback is triggered as many times.

 The statistics that this callback reports are more closely linked to the real user experience of the audio transmission quality than the statistics that the [audioTransportStatsOfUid]([AgoraRtcEngineDelegate rtcEngine:audioTransportStatsOfUid:delay:lost:rxKBitRate:]) callback reports. This callback reports more about media layer statistics such as the frame loss rate, while the [audioTransportStatsOfUid]([AgoraRtcEngineDelegate rtcEngine:audioTransportStatsOfUid:delay:lost:rxKBitRate:]) callback reports more about the transport layer statistics such as the packet loss rate.

 Schemes such as FEC (Forward Error Correction) or retransmission can keep the frame loss rate at the lowest level even when the packet loss rate is high.

 @param engine AgoraRtcEngineKit object.
 @param stats  Statistics of the receiving remote Audio streams, see AgoraRtcRemoteAudioStats.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine remoteAudioStats:(AgoraRtcRemoteAudioStats * _Nonnull)stats;

/** Reports the statistics of the remote audio transmission.

This callback reports the transport layer statistics such as the packet loss rate and network time delay once every two seconds after the local user receives the audio packet from a remote user.

 @param engine     AgoraRtcEngineKit object.
 @param uid        User ID of the remote user sending the audio packet.
 @param delay      Network time delay (ms) from the remote user sending the audio packet to the local user.
 @param lost       Packet loss rate (%) of the audio packet sent from the remote user.
 @param rxKBitRate Received bitrate (Kbps) of the audio packet sent from the remote user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine audioTransportStatsOfUid:(NSUInteger)uid delay:(NSUInteger)delay lost:(NSUInteger)lost rxKBitRate:(NSUInteger)rxKBitRate;

/** Reports the statistics of the remote video transmission.

This callback reports the transport layer statistics such as the packet loss rate and network time delay once every two seconds after the local user receives the video packet from a remote user.

 @param engine     AgoraRtcEngineKit object.
 @param uid        User ID of the remote user sending the video packet.
 @param delay      Network time delay (ms) from the remote user sending the video packet to the local user.
 @param lost       Packet loss rate (%) of the video packet sent from the remote user.
 @param rxKBitRate Received bitrate (Kbps) of the video packet sent from the remote user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine videoTransportStatsOfUid:(NSUInteger)uid delay:(NSUInteger)delay lost:(NSUInteger)lost rxKBitRate:(NSUInteger)rxKBitRate;


#pragma mark Audio Player Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Audio Player Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when the audio mixing file playback finishes.

You can start an audio mixing file playback by calling the [startAudioMixing]([AgoraRtcEngineKit startAudioMixing:loopback:replace:cycle:]) method. This callback is triggered when the audio mixing file playback finishes.

 If the [startAudioMixing]([AgoraRtcEngineKit startAudioMixing:loopback:replace:cycle:]) method call fails, a warning code, AgoraWarningCodeAudioMixingOpenError, returns in the [didOccurWarning]([AgoraRtcEngineDelegate rtcEngine:didOccurWarning:]) callback.

 @param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineLocalAudioMixingDidFinish:(AgoraRtcEngineKit * _Nonnull)engine;

/** Occurs when a remote user starts audio mixing.

 This callback is triggered when a remote user calls [startAudioMixing]([AgoraRtcEngineKit startAudioMixing:loopback:replace:cycle:]).

 @param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineRemoteAudioMixingDidStart:(AgoraRtcEngineKit * _Nonnull)engine;

/** Occurs when a remote user finishes audio mixing.

 @param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineRemoteAudioMixingDidFinish:(AgoraRtcEngineKit * _Nonnull)engine;

/** Occurs when the local audio effect playback finishes.

 You can start a local audio effect playback by calling the [playEffect]([AgoraRtcEngineKit playEffect:filePath:loopCount:pitch:pan:gain:publish:]) method. This callback is triggered when the local audio effect file playback finishes.

 @param engine  AgoraRtcEngineKit object.
 @param soundId ID of the local audio effect. Each local audio effect has a unique ID.
 */
- (void)rtcEngineDidAudioEffectFinish:(AgoraRtcEngineKit * _Nonnull)engine soundId:(NSInteger)soundId;


#pragma mark CDN Publisher Delegate Methods

/**-----------------------------------------------------------------------------
 * @name CDN Live Streaming Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when a stream is published. (CDN live only.)

 @param engine    AgoraRtcEngineKit object.
 @param url       RTMP URL address, to which the publisher publishes the stream.
 @param errorCode Error code: [AgoraErrorCode](AgoraErrorCode). Main errors include:

 - AgoraErrorCodeNoError(0): The publishing succeeded.
 - AgoraErrorCodeFailed(1): The publishing failed.
 - AgoraErrorCodeInvalidArgument(2): Invalid argument used. If, for example, you do not call [setLiveTranscoding]([AgoraRtcEngineKit setLiveTranscoding:]) to configure AgoraLiveTranscoding before calling [addPublishStreamUrl]([AgoraRtcEngineKit addInjectStreamUrl:config:]), the SDK reports this error.
 - AgoraErrorCodeTimedOut(10): The publishing timed out.
 - AgoraErrorCodeAlreadyInUse(19): The chosen RTMP URL address is already in use for CDN live streaming.
 - AgoraErrorCodeAbort(20): The SDK is disconnected from the CDN streaming server, and the CDN live streaming stops.
 - AgoraErrorCodeResourceLimited(22): The backend system does not have enough resources for the CDN live streaming.
 - AgoraErrorCodeEncryptedStreamNotAllowedPublish(130): You cannot publish an encrypted stream.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine streamPublishedWithUrl:(NSString * _Nonnull)url errorCode:(AgoraErrorCode)errorCode;

/** Occurs when a stream is unpublished. (CDN live only.)

This callback notifies the host that the CDN live stream is unpublished.

 @param engine AgoraRtcEngineKit object.
 @param url    RTMP URL address, from which the publisher unpublished the stream.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine streamUnpublishedWithUrl:(NSString * _Nonnull)url;

/** CDN live streaming settings are updated.

 @param engine AgoraRtcEngineKit object.
 */
- (void)rtcEngineTranscodingUpdated:(AgoraRtcEngineKit * _Nonnull)engine;


#pragma mark Inject Stream URL Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Inject Online Stream Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when a voice or video stream HTTP/HTTPS URL address is added to a live broadcast.

@param engine  AgoraRtcEngineKit object.
@param url     HTTP/HTTPS URL address of the externally injected stream.
@param uid     User ID
@param status  State of the externally injected stream. See AgoraInjectStreamStatus.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine streamInjectedStatusOfUrl:(NSString * _Nonnull)url uid:(NSUInteger)uid status:(AgoraInjectStreamStatus)status;

#pragma mark Stream Message Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Stream Message Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when the local user receives the data stream from a remote user within five seconds.

 @param engine   AgoraRtcEngineKit object.
 @param uid      User ID of the remote user sending the message.
 @param streamId Stream ID.
 @param data     Data received by the local user.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine receiveStreamMessageFromUid:(NSUInteger)uid streamId:(NSInteger)streamId data:(NSData * _Nonnull)data;

/** Occurs when the local user does not receive the data stream from the remote user within five seconds.

 @param engine   AgoraRtcEngineKit object.
 @param uid      User ID of the remote user sending the message.
 @param streamId Stream ID.
 @param error    Error code. See AgoraErrorCode.
 @param missed Number of lost messages.
 @param cached Number of incoming cached messages when the data stream is interrupted.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine didOccurStreamMessageErrorFromUid:(NSUInteger)uid streamId:(NSInteger)streamId error:(NSInteger)error missed:(NSInteger)missed cached:(NSInteger)cached;


#pragma mark Miscellaneous Delegate Methods

/**-----------------------------------------------------------------------------
 * @name Miscellaneous Delegate Methods
 * -----------------------------------------------------------------------------
 */

/** Occurs when the media engine is loaded.

 @param engine AgoraRtcEngineKit object.
 */
- (void)rtcEngineMediaEngineDidLoaded:(AgoraRtcEngineKit * _Nonnull)engine;

/** Occurs when the media engine call starts.

 @param engine AgoraRtcEngineKit object.
 */
- (void)rtcEngineMediaEngineDidStartCall:(AgoraRtcEngineKit * _Nonnull)engine;


#pragma mark Deprecated Delegates

/**-----------------------------------------------------------------------------
 * @name Deprecated Delegates
 * -----------------------------------------------------------------------------
 */

/** Occurs when the connection between the SDK and the server is interrupted.

**DEPRECATED** from v2.3.2, use [connectionChangedToState]([AgoraRtcEngineDelegate rtcEngine:connectionChangedToState:reason:]) instead.

This callback is triggered when the SDK loses connection with the server for more than 4 seconds after the connection is established.

After triggering this callback, the SDK tries reconnecting to the server. You can use this callback to implement pop-up reminders.

This callback event is different from [rtcEngineConnectionDidLost]([AgoraRtcEngineDelegate rtcEngineConnectionDidLost:]):

- The [rtcEngineConnectionDidInterrupted]([AgoraRtcEngineDelegate rtcEngineConnectionDidInterrupted:]) callback is triggered when the SDK loses connection with the server for more than 4 seconds, after the SDK successfully joins the channel.
- The [rtcEngineConnectionDidLost]([AgoraRtcEngineDelegate rtcEngineConnectionDidLost:]) callback is triggered when the SDK loses connection with the server for more than 10 seconds, regardless of whether the SDK joins the channel or not.

Whichever callback is triggered, the SDK tries reconnecting to the server until the app calls [leaveChannel]([AgoraRtcEngineKit leaveChannel:]).
 @param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineConnectionDidInterrupted:(AgoraRtcEngineKit * _Nonnull)engine;

/** Occurs when your connection is banned by the Agora Server.

**DEPRECATED** from v2.3.2, use [connectionChangedToState]([AgoraRtcEngineDelegate rtcEngine:connectionChangedToState:reason:]) instead.

@param engine AgoraRtcEngineKit object
 */
- (void)rtcEngineConnectionDidBanned:(AgoraRtcEngineKit * _Nonnull)engine;

/** Reports the audio quality of the remote user. Same as [audioQualityBlock]([AgoraRtcEngineKit audioQualityBlock:]).

**DEPRECATED** from v2.3.2, use [remoteAudioStats]([AgoraRtcEngineDelegate rtcEngine:remoteAudioStats:]) instead.

Triggered once every two seconds, this callback reports the audio quality of each remote user/host sending the audio stream. If a channel has multiple users/hosts sending audio streams, then this callback will be triggered as many times.

 @see [remoteAudioStats]([AgoraRtcEngineDelegate rtcEngine:remoteAudioStats:])
 @param engine  AgoraRtcEngineKit object.
 @param uid     User ID of the speaker.
 @param quality Audio quality of the user, see AgoraNetworkQuality.
 @param delay   Time delay (ms) of the audio packet from the sender to the receiver, including the time delay from audio sampling pre-processing, transmission, and the jitter buffer.
 @param lost    Packet loss rate (%) of the audio packet sent from the sender to the receiver.
 */
- (void)rtcEngine:(AgoraRtcEngineKit * _Nonnull)engine audioQualityOfUid:(NSUInteger)uid quality:(AgoraNetworkQuality)quality delay:(NSUInteger)delay lost:(NSUInteger)lost;

@end


#pragma mark - AgoraRtcEngineKit

/** The AgoraRtcEngineKit class provides all methods invoked by your app.

 Agora provides ensured quality of experience (QoE) for worldwide Internet-based voice and video communications through a virtual global network optimized for real-time web and mobile-to-mobile apps.

 AgoraRtcEngineKit is the basic interface class of the Agora SDK. Creating an AgoraRtcEngineKit object and then calling the methods of this object enables the use of the Agora SDK’s communication functionality.
*/
__attribute__((visibility("default"))) @interface AgoraRtcEngineKit : NSObject

#pragma mark Core Service

/**-----------------------------------------------------------------------------
 * @name Core Service
 * -----------------------------------------------------------------------------
 */

/** Initializes the AgoraRtcEngineKit object.

 Call this method to initialize the service before using AgoraRtcEngineKit.
 @warning Only users with the same App ID can call each other.
 @warning One AgoraRtcEngineKit can use only one App ID. If you need to change the App ID, call [destroy](destroy) to release the current instance first, and then call this method to create a new instance.
 @param appId    App ID issued to the application developers by Agora. Apply for a new one from Agora if the key is missing in your kit. Each project is assigned a unique App ID. The App ID identifies your project and organization in the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method to access the Agora Global Network, and enable one-to-one or one-to-more communication or live-broadcast sessions using a unique channel name for your App ID.
 @param delegate AgoraRtcEngineDelegate

 @return An object of the AgoraRtcEngineKit class.
 */
+ (instancetype _Nonnull)sharedEngineWithAppId:(NSString * _Nonnull)appId
                                      delegate:(id<AgoraRtcEngineDelegate> _Nullable)delegate;

/** Destroys the RtcEngine instance and releases all resources used by the Agora SDK.

 This method is useful for apps that occasionally make voice or video calls, to free up resources for other operations when not making calls.

 Once the app calls this method to release the created RtcEngine instance, no other methods in the SDK can be used and no callbacks can occur. To start communications again, initialize [sharedEngineWithappId](sharedEngineWithAppId:delegate:) to establish a new AgoraRtcEngineKit instance.

 **Note:**

 - Call this method in the subthread.
 - This method call is synchronous. The result returns after the AgoraRtcEngineKit object resources are released. The app should not call this interface in the callback generated by the SDK. Otherwise, the SDK must wait for the callback to return before it can reclaim the related object resources, causing a deadlock.
 */
+ (void)destroy;

/** Sets the channel profile.

The SDK needs to know the application scenario to set the appropriate channel profile to apply different optimization methods.

The Agora Native SDK supports the following channel profiles:

- Communication
- Live Broadcast
- Gaming (for the Agora Gaming SDK only)

**Note:**

* Users in the same channel must use the same channel profile.
* Before calling this method to set a new channel profile, [destroy](destroy) the current engine and create a new engine using [sharedEngineWithAppId](AgoraRtcEngine sharedEngineWithAppId).
* Call this method before a user [joins a channel](joinChannelByToken:channelId:info:uid:joinSuccess:) because you cannot configure the channel profile when the channel is in use.
* In the communication profile, the Agora SDK supports encoding only in raw data, not in texture.

 @param profile Channel profile: [AgoraChannelProfile](AgoraChannelProfile).

 @return * 0: Success. * < 0: Failure.
 */
- (int)setChannelProfile:(AgoraChannelProfile)profile;

/** Sets the role of the user.

This method is applicable only to the live broadcast profile.

Sets the role of the user such as a host or an audience (default), before joining a channel.

This method can be used to switch the user role after the user joins a channel.

 @param role Role of the client: AgoraClientRole.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setClientRole:(AgoraClientRole)role;

/** Allows a user to join a channel.

Users in the same channel can talk to each other, and multiple users in the same channel can start a group chat. Users with different App IDs cannot call each other even if they join the same channel.

You must call the [leaveChannel](leaveChannel:) method to exit the current call before entering another channel. This method call is asynchronous; therefore, you can call this method in the main user interface thread.

 The SDK uses the OS X’s AVAudioSession shared object for audio recording and playback, so using this object may affect the SDK’s audio functions.
 If the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method call is successful, the `joinSuccessBlock` callback is triggered. If you implement both `joinSuccessBlock` and [didJoinChannel]([AgoraRtcEngineDelegate rtcEngine:didJoinChannel:withUid:elapsed:]), `joinSuccessBlock` takes higher priority than [didJoinChannel]([AgoraRtcEngineDelegate rtcEngine:didJoinChannel:withUid:elapsed:]). If you want to use [didJoinChannel]([AgoraRtcEngineDelegate rtcEngine:didJoinChannel:withUid:elapsed:]), set `joinSuccessBlock` as nil.

 **Note:**

 A channel does not accept duplicate uids, such as two users with the same `uid`. If you set `uid` as 0, the system automatically assigns a `uid`.

 @param token A `token` generated by the app server. In most circumstances, the static App ID suffices. For added security, use a `token`.

 * If the user uses a static App ID, `token` is optional and can be set as nil.
 * If the user uses a `token`, Agora issues an additional App Certificate for developers to generate a token based on the algorithm and App Certificate for user authentication on the server.
 * Ensure that the App ID used for creating the `token` is the same App ID used by [sharedEngineWithAppId](sharedEngineWithAppId:delegate:) for initializing the RTC engine. Otherwise, the CDN live streaming may fail.

 @param channelId Unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes.
 Supported character scopes are:

 * 26 lowercase English letters a-z
 * 26 uppercase English letters A-Z
 * 10 numbers 0-9
 * Space
 * "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", "{", "}", "|", "~", ","

 @param info (Optional) Additional information about the channel. This parameter can be set to nil or contain channel related information. Other users in the channel do not receive this message.

 **Note:** When joining a channel, the SDK calls `setCategory(AVAudioSessionCategoryPlayAndRecord)` to set `AVAudioSession` to `PlayAndRecord` mode. When setting `AVAudioSession` to `PlayAndRecord` mode, the sound played (for example a ringtone) is interrupted. The app should not set `AVAudioSession` to any other mode.

 @param uid User ID. A 32-bit unsigned integer with a value ranging from 1 to (2^32-1). The `uid` must be unique. If a `uid` is not assigned (or set to 0), the SDK assigns and returns a `uid` in  `joinSuccessBlock`. Your app must record and maintain the returned `uid` since the SDK does not do so.
 @param joinSuccessBlock Returns that the user joins the specified channel. Same as [didJoinChannel]([AgoraRtcEngineDelegate rtcEngine:didJoinChannel:withUid:elapsed:]). If `joinSuccessBlock` is nil, the [didJoinChannel]([AgoraRtcEngineDelegate rtcEngine:didJoinChannel:withUid:elapsed:]) callback is triggered.

 @return * 0: Success. * < 0: Failure.
 */
- (int)joinChannelByToken:(NSString * _Nullable)token
                channelId:(NSString * _Nonnull)channelId
                     info:(NSString * _Nullable)info
                      uid:(NSUInteger)uid
              joinSuccess:(void(^ _Nullable)(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed))joinSuccessBlock;

/** Allows a user to leave a channel, such as hanging up or exiting a call.

After joining a channel, the user must call the leaveChannel method to end the call before joining another channel.

This method returns 0 if the user leaves the channel and releases all resources related to the call.

This method call is asynchronous, and the user has not exited the channel when the method call returns. Once the user leaves the channel, the SDK triggers the [didLeaveChannelWithStats]([AgoraRtcEngineDelegate rtcEngine:didLeaveChannelWithStats:]) callback.

 **Note:**

- If you call [destroy](destroy) immediately after leaveChannel, the leaveChannel process interrupts, and the [didLeaveChannelWithStats]([AgoraRtcEngineDelegate rtcEngine:didLeaveChannelWithStats:]) callback is not triggered.

- If you call this method during a CDN live streaming, the [removePublishStreamUrl](removePublishStreamUrl:) method is triggered.

- When you call this method, the SDK deactivates the audio session on iOS by default, and may affect other apps. If you do not want this default behavior, use [setAudioSessionOperationRestriction](setAudioSessionOperationRestriction:) to set `AgoraAudioSessionOperationRestrictionDeactivateSession` so that when you call [leaveChannel](leaveChannel:), the SDK does not deactivate the audio session.

 @param leaveChannelBlock The callback indicates that a user leaves the channel, and provides the statistics of this call. See [AgoraChannelStats](AgoraChannelStats) for details.

 @return * 0: Success. * < 0: Failure.
 */
- (int)leaveChannel:(void(^ _Nullable)(AgoraChannelStats * _Nonnull stat))leaveChannelBlock;

/** Gets a new token when the current token expires after a period of time.

The `token` expires after a period of time once the token schema is enabled when:

  - The [tokenPrivilegeWillExpire]([AgoraRtcEngineDelegate rtcEngine:tokenPrivilegeWillExpire:]) callback is triggered, or
  - The [didOccurError]([AgoraRtcEngineDelegate rtcEngine:didOccurError:]) callback reports the AgoraErrorCodeTokenExpired(-109) error, or
  - The [rtcEngineRequestToken]([AgoraRtcEngineDelegate rtcEngineRequestToken:]) callback reports the AgoraErrorCodeTokenExpired(-109) error.

 **Note:**

 Agora recommends using the [rtcEngineRequestToken]([AgoraRtcEngineDelegate rtcEngineRequestToken:]) callback to report the AgoraErrorCodeTokenExpired(-109) error, not using the [didOccurError]([AgoraRtcEngineDelegate rtcEngine:didOccurError:]) callback.

 The app should call this method to get the `token`. Failure to do so results in the SDK disconnecting from the server.

 @param token The new token.

 @return * 0: Success. * < 0: Failure.
 */
- (int)renewToken:(NSString * _Nonnull)token;

/** Enables interoperability with the Agora Web SDK.

 This method is applicable to the live broadcast profile only. In the communication profile, the SDK is interoperable with the Web SDK by default.

 @param enabled Sets whether to enable/disable interoperability with the Agora Web SDK:

 * YES: Enable.
 * NO: (Default) Disable.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableWebSdkInteroperability:(BOOL)enabled;

/** Gets the connection state of the app.

@return The connection state, see [AgoraConnectionStateType](AgoraConnectionStateType) for details.
*/
- (AgoraConnectionStateType)getConnectionState;


#pragma mark Core Audio

/**-----------------------------------------------------------------------------
 * @name Core Audio
 * -----------------------------------------------------------------------------
 */

/** Enables the audio module.

 The audio module is enabled by default.

 **Note:**

- This method affects the internal engine and can be called after [leaveChannel]([AgoraRtcEngineKit leaveChannel:]). You can call this method either before or after joining a channel.
- This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the audio engine modules separately:

    * [enableLocalAudio](enableLocalAudio:): Whether to enable the microphone to create the local audio stream.
    * [muteLocalAudioStream](muteLocalAudioStream:): Whether to publish the local audio stream.
    * [muteRemoteAudioStream](muteRemoteAudioStream:mute:): Whether to subscribe to and play the remote audio stream.
    * [muteAllRemoteAudioStreams](muteAllRemoteAudioStreams:): Whether to subscribe to and play all remote audio streams.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableAudio;

/** Disables the audio module.

 **Note:**

- This method affects the internal engine and can be called after [leaveChannel]([AgoraRtcEngineKit leaveChannel:]). You can call this method either before or after joining a channel.
- This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the audio engine modules separately:

    * [enableLocalAudio](enableLocalAudio:): Whether to enable the microphone to create the local audio stream.
    * [muteLocalAudioStream](muteLocalAudioStream:): Whether to publish the local audio stream.
    * [muteRemoteAudioStream](muteRemoteAudioStream:mute:): Whether to subscribe to and play the remote audio stream.
    * [muteAllRemoteAudioStreams](muteAllRemoteAudioStreams:): Whether to subscribe to and play all remote audio streams.

 @return * 0: Success. * < 0: Failure.
 */
- (int)disableAudio;

/** Sets the audio parameters and application scenarios.

 **Note:**

 * You must call setAudioProfile before [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:).
 * In the communication profile, you can set the profile but not the scenario.
 * In the communication and live-broadcast profiles, the bitrate may be different from your settings due to network self-adaptation.
 * In scenarios involving music education, Agora recommends setting `profile` as AgoraAudioProfileMusicHighQuality(4) and `scenario` as AgoraAudioScenarioGameStreaming(3) in AgoraAudioScenario.

 @param profile  Sets the sampling rate, bitrate, encoding mode, and the number of channels. See AgoraAudioProfile.
 @param scenario Sets the audio application scenario. See AgoraAudioScenario.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setAudioProfile:(AgoraAudioProfile)profile
              scenario:(AgoraAudioScenario)scenario;

/** Adjusts the recording volume.

 @param volume Recording volume. The value ranges between 0 and 400:

 * 0: Mute
 * 100: Original volume
 * 400: (Maximum) Four times the original volume with signal clipping protection

 @return * 0: Success. * < 0: Failure.
 */
- (int)adjustRecordingSignalVolume:(NSInteger)volume;

/** Adjusts the playback volume.

 @param volume Playback volume. The value ranges between 0 and 400:

 * 0: Mute
 * 100: Original volume
 * 400: (Maximum) Four times the original volume with signal clipping protection

 @return * 0: Success. * < 0: Failure.
 */
- (int)adjustPlaybackSignalVolume:(NSInteger)volume;

/** Enables the SDK to regularly report to the app on which user is speaking and the speaker's volume.

 @param interval Sets the time interval between two consecutive volume indications:

 * &le; 0: Disables the volume indication.
 * &gt; 0: The time interval (ms) between two consecutive volume indications. Agora recommends setting `interval` &ge; 200 ms. Once the method is enabled, the SDK returns the volume indications at the set time interval in the [reportAudioVolumeIndicationOfSpeakers]([AgoraRtcEngineDelegate rtcEngine:reportAudioVolumeIndicationOfSpeakers:totalVolume:]) and [audioVolumeIndicationBlock](audioVolumeIndicationBlock:) callbacks, regardless of whether any user is speaking in the channel.

 @param smooth The smoothing factor sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The greater the value, the more sensitive the indicator. The recommended value is 3.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableAudioVolumeIndication:(NSInteger)interval
                            smooth:(NSInteger)smooth;

/** Enables/Disables the local audio capture.

When an app joins a channel, the audio module is enabled by default. This method disables or re-enables the local audio capture, that is, to stop or restart local audio capturing and processing.

This method does not affect receiving or playing the remote audio streams, and is applicable to scenarios where the user wants to receive remote audio streams without sending any audio stream to other users in the channel.

The [didMicrophoneEnabled]([AgoraRtcEngineDelegate rtcEngine:didMicrophoneEnabled:]) callback is triggered once the local audio module is disabled or re-enabled.

**Note:**

Call this method after [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:).

This method is different from [muteLocalAudioStream](muteLocalAudioStream:):

- [enableLocalAudio](enableLocalAudio:): Disables/Re-enables the local audio capturing and processing.
- [muteLocalAudioStream](muteLocalAudioStream:): Stops/Continues sending the local audio streams.

 @param enabled * YES: (Default) Enable the local audio module, that is, to start local audio capturing and processing.
 * NO: Disable the local audio module, that is, to stop local audio capturing and processing.
 @return * 0: Success. * < 0: Failure.
 */
- (int)enableLocalAudio:(BOOL)enabled;

/** Sends/Stops sending the local audio stream.

 Use this method to stop/start sending the local audio stream.

 **Note:**

 When set to YES, this method does not disable the microphone and thus does not affect any ongoing recording.

 @param mute Sets whether to send/stop sending the local audio stream:

 * YES: Stops sending the local audio stream.
 * NO: (Default) Sends the local audio stream.

 @return * 0: Success. * < 0: Failure.
 */
- (int)muteLocalAudioStream:(BOOL)mute;

/** Receives/Stops receiving a specified remote user’s audio stream.

 **Note:**

 If you have called [muteAllRemoteAudioStreams](muteAllRemoteAudioStreams:)(YES) to mute all remote audio streams, please call [muteAllRemoteAudioStreams](muteAllRemoteAudioStreams:)(NO) before calling this method. [muteAllRemoteAudioStreams](muteAllRemoteAudioStreams:) sets all the remote streams, while [muteRemoteAudioStream](muteRemoteAudioStream:mute:) sets a specified stream.

 @param uid  User ID of the specified remote user.
 @param mute Sets whether to receive/stop receiving a specified remote user’s audio stream:

 * YES: Stop receiving a specified remote user’s audio stream.
 * NO: (Default) Receive a specified remote user’s audio stream.

 @return * 0: Success. * < 0: Failure.
 */
- (int)muteRemoteAudioStream:(NSUInteger)uid mute:(BOOL)mute;

/** Receives/Stops receiving all remote users' audio streams.

 @param mute Sets whether to receive/stop receiving all remote users' audio streams:

 * YES: Stop receiving all remote users' audio streams.
 * NO: (Default) Receive all remote users' audio streams.

 @return * 0: Success. * < 0: Failure.
 */
- (int)muteAllRemoteAudioStreams:(BOOL)mute;

/** Sets whether to receive audio streams by default.

This method can be called either before or after joining the channel. If you call this method after joining the channel, then the audio streams of all the users joining after this are not received.

 @param mute Sets whether to receive/stop receiving all remote users' audio streams by default:

 * YES: Stop receiving all remote users' audio streams by default.
 * NO: (Default) Receive all remote users' audio streams by default.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setDefaultMuteAllRemoteAudioStreams:(BOOL)mute;


#pragma mark Core Video

/**-----------------------------------------------------------------------------
 * @name Core Video
 * -----------------------------------------------------------------------------
 */

/** Enables the video module.

The app can call this method either before entering a channel or during a call. If this method is called before entering a channel, the service starts in the video mode. If this method is called during an audio call, the audio mode switches to the video mode.

To disable the video, call the disableVideo method.

**Note:**

- This method affects the internal engine and can be called after [leaveChannel]([AgoraRtcEngineKit leaveChannel:]).
- This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the video engine modules separately:

    * [enableLocalVideo](enableLocalVideo:): Whether to enable the camera to create the local video stream.
    * [muteLocalVideoStream](muteLocalVideoStream:): Whether to publish the local video stream.
    * [muteRemoteVideoStream](muteRemoteVideoStream:mute:): Whether to subscribe to and play the remote video stream.
    * [muteAllRemoteVideoStreams](muteAllRemoteVideoStreams:): Whether to subscribe to and play all remote video streams.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableVideo;

/** Disables the video module.

   The app may call this method before entering a channel or during a call. If this method is called before entering a channel, the service starts in the audio mode. If this method is called during a video call, the video mode switches to the audio mode. To enable the video module, call the [enableVideo](enableVideo) method.

 **Note:**

- This method affects the internal engine and can be called after [leaveChannel]([AgoraRtcEngineKit leaveChannel:]).
- This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the video engine modules separately:

    * [enableLocalVideo](enableLocalVideo:): Whether to enable the camera to create the local video stream.
    * [muteLocalVideoStream](muteLocalVideoStream:): Whether to publish the local video stream.
    * [muteRemoteVideoStream](muteRemoteVideoStream:mute:): Whether to subscribe to and play the remote video stream.
    * [muteAllRemoteVideoStreams](muteAllRemoteVideoStreams:): Whether to subscribe to and play all remote video streams.

 @return * 0: Success. * < 0: Failure.
 */
- (int)disableVideo;

/** Sets the video encoder configuration.

Each video encoder configuration corresponds to a set of video parameters, including the resolution, frame rate, bitrate, and video orientation.

The parameters specified in this method are the maximum values under ideal network conditions. If the video engine cannot render the video using the specified parameters due to unreliable network conditions, the parameters further down the list are considered until a successful configuration is found.

 If you do not need to set the video encoder configuration after joining the channel, you can call this method before enableVideo to reduce the render time of the first video frame.

 **Note:**

 Since v2.3.0, the following API methods are deprecated:

 - [setVideoProfile](setVideoProfile:swapWidthAndHeight:)
 - [setVideoResolution](setVideoResolution:andFrameRate:bitrate:)

 @param config Video encoder configuration: AgoraVideoEncoderConfiguration
 @return * 0: Success. * < 0: Failure.
 */
- (int)setVideoEncoderConfiguration:(AgoraVideoEncoderConfiguration * _Nonnull)config;

/** Sets the local video view and configures the video display settings on the local machine.

The app calls this method to bind each video window (view) of the local video streams and configures the video display settings. Call this method after initialization to configure the local video display settings before entering a channel. The binding is still valid after the user leaves the channel, which means the window still displays. To unbind the view, set the `view` in AgoraRtcVideoCanvas to nil.

 @param local Sets the local video view and settings. See AgoraRtcVideoCanvas.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setupLocalVideo:(AgoraRtcVideoCanvas * _Nullable)local;

/** Sets the remote video view.

This method binds the remote user to the video display window (sets the view for the user of the specified uid).

The app specifies the uid of the remote video in the method call before the user joins a channel.

If the remote uid is unknown to the app, set it after the app receives the [userJoinedBlock]([AgoraRtcEngineKit userJoinedBlock:]) event.

If the Video Recording function is enabled, the Video Recording Service joins the channel as a dummy client, causing other clients to also receive the [didJoinedOfUid]([AgoraRtcEngineDelegate rtcEngine:didJoinedOfUid:elapsed:]) event. Do not bind the dummy client to the app view because the dummy client does not send any video streams. If your app does not recognize the dummy client, bind the remote user to the view when the [firstRemoteVideoDecodedOfUid]([AgoraRtcEngineDelegate rtcEngine:firstRemoteVideoDecodedOfUid:size:elapsed:]) callback is triggered.

  To unbind the remote user from the view, set the `view` in AgoraRtcVideoCanvas to nil. Once the remote user leaves the channel, the SDK unbinds the remote user.

 @param remote Sets the remote video view and settings. See AgoraRtcVideoCanvas.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setupRemoteVideo:(AgoraRtcVideoCanvas * _Nonnull)remote;

/** Sets the local video display mode.

 This method may be invoked multiple times during a call to change the display mode.

 @param mode Sets the local video display mode. See AgoraVideoRenderMode.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setLocalRenderMode:(AgoraVideoRenderMode)mode;

/** Sets the remote video display mode.

This method can be invoked multiple times during a call to change the display mode.

 @param uid  User ID of the remote user sending the video streams.
 @param mode Sets the video display mode. See AgoraVideoRenderMode.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setRemoteRenderMode:(NSUInteger)uid
                      mode:(AgoraVideoRenderMode)mode;

/** Starts the local video preview before joining the channel.

 Before calling this method, you must:

 - Call [setupLocalVideo](setupLocalVideo:) to set up the local preview window and configure the attributes.
 - Call [enableVideo](enableVideo) to enable video.

**Note:**

 Once startPreview is called to start the local video preview, if you leave the channel by calling [leaveChannel](leaveChannel:), the local video preview remains until you call stopPreview to disable it.

 @return * 0: Success. * < 0: Failure.
 */
- (int)startPreview;

/** Stops the local video preview and the video.

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopPreview;

/** Disables the local video.

This method disables the local video and is only applicable when the user wants to watch the remote video without sending any video stream to the other user.

Call this method after [enableVideo](enableVideo), otherwise, this method may not work properly.

 After enableVideo is called, the local video is enabled by default. This method is used to disable the local video while the remote video remains unaffected.

 **Note:**

 This method enables the internal engine and can be called after [leaveChannel]([AgoraRtcEngineKit leaveChannel:]).

 @param enabled Sets whether to enable/disable the local video, including the capturer, renderer, and sender:

 * YES: (Default) Enable the local video.
 * NO: Disable the local video. Once the local video is disabled, the remote users can no longer receive the video stream of this user, while this user can still receive the video streams of other remote users.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableLocalVideo:(BOOL)enabled;

/** Sends/Stops sending the local video stream.

 When set to `YES`, this method does not disable the camera, and thus does not affect the retrieval of the local video stream. This method responds faster compared to [enableLocalVideo](enableLocalVideo:) which controls the sending of local video streams.

 @param mute Sets whether to send/stop sending the local video stream:

 * YES: Stop sending the local video stream.
 * NO: (Default) Send the local video stream.

 @return * 0: Success. * < 0: Failure.
 */
- (int)muteLocalVideoStream:(BOOL)mute;

/** Receives/Stops receiving all remote users' video streams.

 @param mute Sets whether to receive/stop receiving the local video stream:

 * YES: Stops receiving all remote users' video streams.
 * NO: (Default) Receives all remote users' video streams.

 @return * 0: Success. * < 0: Failure.
 */
- (int)muteAllRemoteVideoStreams:(BOOL)mute;

/** Receives/Stops receiving a specified remote user’s video stream.

**Note:**

 If you called [muteAllRemoteVideoStreams](muteAllRemoteVideoStreams:) and set to `YES` to stop receiving all remote video streams, ensure that muteAllRemoteVideoStreams is called and set to `NO` before calling this method.

 @param uid  User ID of the specified remote user.
 @param mute Sets whether to receive/stop receiving a specified remote user’s video stream.

 * YES: Stops receiving a specified remote user’s video stream.
 * NO: (Default) Receives a specified remote user’s video stream.

 @return * 0: Success. * < 0: Failure.
 */
- (int)muteRemoteVideoStream:(NSUInteger)uid
                        mute:(BOOL)mute;

/** Sets whether to receive video streams by default.

 @param mute Sets whether to receive/stop receiving all remote users' video streams by default.

 * YES: Stop receiving all remote users' video streams by default.
 * NO: (Default) Receive all remote users' video streams by default.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setDefaultMuteAllRemoteVideoStreams:(BOOL)mute;


#pragma mark Audio Routing Controller

/**-----------------------------------------------------------------------------
 * @name Audio Routing Controller
 * -----------------------------------------------------------------------------
 */

#if TARGET_OS_IPHONE
/** Sets the default audio route. (iOS only.)

 This method sets whether the received audio is routed to the earpiece or speakerphone by default before joining the channel. If the user does not call this method, the audio is routed to the earpiece by default.

 If you need to change the default audio route after joining the channel, call [setEnableSpeakerphone](setEnableSpeakerphone:).

 **Note:**

 * This method only works in audio mode.
 * Call this method before calling [joinChannel](joinChannelByToken:channelId:info:uid:joinSuccess:).

 The default settings for each mode:

 * Voice: Earpiece.
 * Video: Speakerphone. If the user in a communication channel calls [disableVideo](disableVideo) or if the user calls [muteLocalVideoStream](muteLocalVideoStream:) and [muteAllRemoteVideoStreams](muteAllRemoteVideoStreams:), the default audio route is switched to the earpiece automatically.
 * Live Broadcast: Speakerphone.
 * Gaming Voice: Speakerphone.

 @param defaultToSpeaker Sets the default audio route:

 * YES: Speakerphone.
 * NO: (Default) Earpiece.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setDefaultAudioRouteToSpeakerphone:(BOOL)defaultToSpeaker;

/** Enables/Disables the audio routing to the speakerphone. (iOS only.)

 This method sets whether the audio is routed to the speakerphone.

 **Note:**

 * Ensure that you have successfully called the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method before calling this method.
 * The SDK calls setCategory(AVAudioSessionCategoryPlayAndRecord) with options to configure the headset/speakerphone, so this method applies to all audio playback in the system.
 * After this method is called, the SDK returns the [didAudioRouteChanged]([AgoraRtcEngineDelegate rtcEngine:didAudioRouteChanged:]) callback, indicating that the audio route changes.
 * This method does not take effect when using a headset.

 @param enableSpeaker Sets whether to route the audio to the speakerphone or earpiece:

 * YES: Route the audio to the speakerphone.
 * NO: Route the audio to the earpiece.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setEnableSpeakerphone:(BOOL)enableSpeaker;

/** Checks whether the speakerphone is enabled. (iOS only.)

 @return * YES: The speakerphone is enabled, and the audio plays from the speakerphone.
 * NO: The speakerphone is not enabled, and the audio plays from devices other than the speakerphone. For example, the headset or earpiece.
 */
- (BOOL)isSpeakerphoneEnabled;
#endif


#pragma mark In Ear Monitor

/**-----------------------------------------------------------------------------
 * @name In-ear Monitor
 * -----------------------------------------------------------------------------
 */

#if TARGET_OS_IPHONE

/** Enables the in-ear monitoring function. (iOS only.)

 @param enabled Sets whether to enable/disable the in-ear monitoring function.

 * YES: Enable.
 * NO: (Default) Disable.

 @return * 0: Success. * < 0: Failure.
  */
- (int)enableInEarMonitoring:(BOOL)enabled;

/** Sets the volume of the in-ear monitor. (iOS only.)

 @param volume Sets the volume of the in-ear monitor. The value ranges between 0 and 100 (default).

 @return * 0: Success. * < 0: Failure.
 */
- (int)setInEarMonitoringVolume:(NSInteger)volume;
#endif


#pragma mark Audio Sound Effect

/**-----------------------------------------------------------------------------
 * @name Audio Sound Effect
 * -----------------------------------------------------------------------------
 */

/** Changes the voice pitch of the local speaker.

 @param pitch Sets the voice pitch. The value ranges between 0.5 and 2.0. The lower the value, the lower the voice pitch. The default value is 1.0 (no change to the local voice pitch).

 @return * 0: Success. * -1: Failure.
 */
- (int)setLocalVoicePitch:(double)pitch;

/** Sets the local voice equalization effect.

 @param bandFrequency Sets the band frequency. The value ranges between 0 and 9, representing the respective 10-band center frequencies of the voice effects, including 31, 62, 125, 500, 1k, 2k, 4k, 8k, and 16k Hz. See AgoraAudioEqualizationBandFrequency for details.
 @param gain          Sets the gain of each band in dB. The value ranges between -15 and 15. The default value is 0.

 @return * 0: Success. * -1: Failure.
*/
- (int)setLocalVoiceEqualizationOfBandFrequency:(AgoraAudioEqualizationBandFrequency)bandFrequency withGain:(NSInteger)gain;

/** Sets the local voice reverberation.

 @param reverbType Sets the reverberation type. See AgoraAudioReverbType.
 @param value      Sets the effect of the reverberation type. See AgoraAudioReverbType for the value range.

 @return * 0: Success. * -1: Failure.
 */
- (int)setLocalVoiceReverbOfType:(AgoraAudioReverbType)reverbType withValue:(NSInteger)value;


#pragma mark Music File Playback and Mixing

/**-----------------------------------------------------------------------------
 * @name Music File Playback and Mixing
 * -----------------------------------------------------------------------------
 */

/** Starts audio mixing.

  This method mixes the specified local audio file with the audio stream from the microphone, or replaces the microphone's audio stream with the specified local audio file. You can choose whether the other user can hear the local audio playback and specify the number of playback loops. This method also supports online music playback.

 When the audio mixing file playback finishes after calling this method, the [rtcEngineLocalAudioMixingDidFinish]([AgoraRtcEngineDelegate rtcEngineLocalAudioMixingDidFinish:]) callback is triggered.

 **Note:**

 * To use this method, ensure that the iOS device version is 8.0+.
 * Call this method when you are in a channel.
 * If you want to play an online music file, ensure that the time interval between calling this API is greater than 100 ms, or the AudioFileOpenTooFrequent(702) warning occurs.

 @param filePath The absolute path of the local or online audio file to be mixed. Supported audio formats: mp3, aac, m4a, 3gp, and wav.

 @param loopback Sets which user can hear the audio mixing:

 * YES: Only the local user can hear the audio mixing.
 * NO: Both users can hear the audio mixing.

 @param replace Sets the audio mixing content:

 * YES: Only the specified audio file is published; the audio stream received by the microphone is not published.
 * NO: Local audio file mixed with the audio stream from the microphone.

 @param cycle Sets the number of playback loops:

 * Positive integer: Number of playback loops.
 * -1：Infinite playback loops.

 @return * 0: Success. * < 0: Failure.
 */
- (int)startAudioMixing:(NSString *  _Nonnull)filePath
               loopback:(BOOL)loopback
                replace:(BOOL)replace
                  cycle:(NSInteger)cycle;

/** Stops audio mixing.

 Call this method when you are in a channel.

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopAudioMixing;

/** Pauses audio mixing.

 Call this method when you are in a channel.

 @return * 0: Success. * < 0: Failure.
 */
- (int)pauseAudioMixing;

/** Resumes audio mixing.

 Call this method when you are in a channel.

 @return * 0: Success. * < 0: Failure.
 */
- (int)resumeAudioMixing;

/** Adjusts the volume of audio mixing.

 Call this method when you are in a channel.

 @param volume Audio mixing volume. The value ranges between 0 and 100 (default).
 @return * 0: Success. * < 0: Failure.
 */
- (int)adjustAudioMixingVolume:(NSInteger)volume;

/** Adjusts the volume of audio mixing for local playback.

 Call this method when you are in a channel.

 @param volume Audio mixing volume for local playback. The value ranges between 0 and 100 (default).
 @return * 0: Success.
       * < 0: Failure.
 */
- (int)adjustAudioMixingPlayoutVolume:(NSInteger)volume;

/** Adjusts the volume of audio mixing for publishing (sending to other users).

 Call this method when you are in a channel.

 @param volume Audio mixing volume for publishing. The value ranges between 0 and 100 (default).
 @return * 0: Success.
       * < 0: Failure.
 */
- (int)adjustAudioMixingPublishVolume:(NSInteger)volume;

/** Retrieves the duration (ms) of audio mixing.

 Call this method when you are in a channel.

 @return * &ge; 0: The audio mixing duration, if this method call is successful.
  * < 0: Failure.
 */
- (int)getAudioMixingDuration;

/** Retrieves the playback position (ms) of the audio mixing.

 Call this method when you are in a channel.

 @return * &ge; 0: The current playback position of the audio mixing, if this method call is successful.
 * < 0: Failure.
 */
- (int)getAudioMixingCurrentPosition;

/** Sets the playback position of the audio mixing file to a different starting position (the default plays from the beginning).

 @param pos The starting playback position (ms) of the audio mixing file.

 @return * 0: Success. * < 0: Failure.

 */
- (int)setAudioMixingPosition:(NSInteger)pos;


#pragma mark Audio Effect File Playback

/**-----------------------------------------------------------------------------
 * @name Audio Effect File Playback
 * -----------------------------------------------------------------------------
 */

/** Retrieves the volume of the audio effects.

The value ranges between 0.0 and 100.0.

@return * &ge; 0: Volume of the audio effects, if this method call is successful. 
* < 0: Failure.
 */
- (double)getEffectsVolume;

/** Sets the volume of the audio effects.

 @param volume Volume of the audio effects. The value ranges between 0.0 and 100.0 (default).

 @return * 0: Success. * < 0: Failure.
 */
- (int)setEffectsVolume:(double)volume;

/** Sets the volume of a specified audio effect.

 @param soundId ID of the audio effect. Each audio effect has a unique ID.
 @param volume Volume of the audio effect. The value ranges between 0.0 and 100.0 (default).

 @return * 0: Success. * < 0: Failure.
 */
- (int)setVolumeOfEffect:(int)soundId
              withVolume:(double)volume;

/** Plays a specified audio effect.

You can use this method to add specific audio effects for specific scenarios, for example, gaming. When the audio effect file playback is finished, the [rtcEngineDidAudioEffectFinish]([AgoraRtcEngineDelegate rtcEngineDidAudioEffectFinish:soundId:]) callback is triggered。

 @param soundId ID of the specified audio effect. Each audio effect has a unique ID.
 If the audio effect is preloaded into the memory through [preloadEffect](preloadEffect:filePath:), ensure that the `soundId` value is set to the same value as in [preloadEffect](preloadEffect:filePath:).
 @param filePath The absolute path of the audio effect file.
 @param loopCount Sets the number of times the audio effect loops:

 * 0: Play the audio effect once.
 * 1: Play the audio effect twice.
 * -1: Play the audio effect in an indefinite loop until [stopEffect](stopEffect:) or [stopAllEffects](stopAllEffects) is called.

 @param pitch Sets the pitch of the audio effect. The value ranges between 0.5 and 2. The default value is 1 (no change to the pitch). The lower the value, the lower the pitch.
 @param pan Sets the spatial position of the audio effect. The value ranges between -1.0 and 1.0.

 * 0.0: The audio effect displays ahead.
 * 1.0: The audio effect displays to the right.
 * -1.0: The audio effect displays to the left.

 @param gain Sets the volume of the audio effect. The value ranges between 0.0 and 100.0 (default). The lower the value, the lower the volume of the audio effect.
 @param publish Sets whether or not to publish the specified audio effect to the remote stream:

 * YES: The played audio effect is published to the Agora Cloud and the remote users can hear it.
 * NO: The played audio effect is not published to the Agora Cloud and the remote users cannot hear it.

 @return * 0: Success. * < 0: Failure.
 */
- (int)playEffect:(int)soundId
         filePath:(NSString * _Nullable)filePath
        loopCount:(int)loopCount
            pitch:(double)pitch
              pan:(double)pan
             gain:(double)gain
          publish:(BOOL)publish;

/** Stops playing a specified audio effect.

 @param soundId ID of the audio effect. Each audio effect has a unique ID.

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopEffect:(int)soundId;

/** Stops playing all audio effects.
 */
- (int)stopAllEffects;

/** Preloads a specified audio effect file into the memory.

To ensure smooth communication, limit the size of the audio effect file. Agora recommends using this method to preload the audio effect before calling [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:).

Supported audio formats: mp3, aac, m4a, 3gp, and wav.

 @param soundId  ID of the audio effect. Each audio effect has a unique ID.
 @param filePath Absolute path of the audio effect file.

 @return * 0: Success. * < 0: Failure.
 */
- (int)preloadEffect:(int)soundId
            filePath:(NSString * _Nullable)filePath;

/** Releases a specified preloaded audio effect from the memory.

 @param soundId ID of the audio effect. Each audio effect has a unique ID.

 @return * 0: Success. * < 0: Failure.
 */
- (int)unloadEffect:(int)soundId;

/** Pauses a specified audio effect.

 @param soundId ID of the audio effect. Each audio effect has a unique ID.

 @return * 0: Success. * < 0: Failure.
 */
- (int)pauseEffect:(int)soundId;

/** Pauses all audio effects.

 @return * 0: Success. * < 0: Failure.
 */
- (int)pauseAllEffects;

/** Resumes playing a specified audio effect.

 @param soundId ID of the audio effect. Each audio effect has a unique ID.

 @return * 0: Success. * < 0: Failure.
 */
- (int)resumeEffect:(int)soundId;

/** Resumes playing all audio effects.

 @return * 0: Success. * < 0: Failure.
 */
- (int)resumeAllEffects;


#pragma mark Audio Recorder

/**-----------------------------------------------------------------------------
 * @name Audio Recorder
 * -----------------------------------------------------------------------------
 */

/** Starts an audio recording.

 The SDK allows recording during a call. Supported formats:

 * .wav: Large file size with high fidelity
 * .aac: Small file size with low fidelity

 Ensure that the directory to save the recording file exists and is writable. This method is usually called after the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method. The recording automatically stops when the [leaveChannel](leaveChannel:) method is called.

 @param filePath Absolute file path of the recording file. The string of the file name is in UTF-8.
 @param quality  Sets the audio recording quality. See AgoraAudioRecordingQuality.

 @return * 0: Success. * < 0: Failure.
 */
- (int)startAudioRecording:(NSString * _Nonnull)filePath
                   quality:(AgoraAudioRecordingQuality)quality;

/** Stops an audio recording on the client.

 **Note:**

 You can call this method before calling [leaveChannel](leaveChannel:) else, the recording automatically stops when the leaveChannel method is called.

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopAudioRecording;

#pragma mark Loopback Recording

/**-----------------------------------------------------------------------------
 * @name Loopback Recording
 * -----------------------------------------------------------------------------
 */

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
/** Enables loopback recording. (macOS only)

 If you enable loopback recording, the output of the sound card is mixed into the audio stream sent to the other end.

 **Note:**

 macOS does not support loopback of the default sound card. If you need to use this method, please use a virtual sound card and pass its name to the `deviceName` parameter. Agora has tested and recommends using soundflower.

 @param enabled Sets whether to enable/disable loopback recording.

 * YES: Enable loopback recording.
 * NO: (Default) Disable loopback recording.

 @param deviceName Pointer to the device name of the sound card. The default value is nil, meaning the default sound card. If you are using a virtual sound card for example the "Soundflower", set this parameter as the name of the sound card "Soundflower", and the SDK will find the corresponding sound card and start capturing the audio.
 @return * 0: Success. * < 0: Failure.
 */
-(int)enableLoopbackRecording:(BOOL)enabled
                   deviceName:(NSString * _Nullable)deviceName;
#endif


#pragma mark Miscellaneous Audio Control

/**-----------------------------------------------------------------------------
 * @name Miscellaneous Audio Control
 * -----------------------------------------------------------------------------
 */

#if TARGET_OS_IPHONE
/** Sets the audio session's operational restriction. (iOS only.)

 The SDK and the app can both configure the audio session by default. The app may occasionally use other apps or third-party components to manipulate the audio session and restrict the SDK from doing so. This method allows the app to restrict the SDK's manipulation of the audio session.

 You can call this method at any time to return the control of the audio sessions to the SDK.

 **Note:**

 This method restricts the SDK's manipulation of the audio session. Any operation to the audio session relies solely on the app, other apps, or third-party components.

 @param restriction The operational restriction (bit mask) of the SDK on the audio session. See [AgoraAudioSessionOperationRestriction](AgoraAudioSessionOperationRestriction) for details.

 */
- (void)setAudioSessionOperationRestriction:(AgoraAudioSessionOperationRestriction)restriction;
#endif


#pragma mark Network-related Test

/**-----------------------------------------------------------------------------
 * @name Network-related Test
 * -----------------------------------------------------------------------------
 */

/** Starts an audio call test.

This method launches an audio call test to determine whether the audio devices (for example, headset and speaker) and the network connection are working properly.

To conduct the test:

- The user speaks and the recording is played back within 10 seconds.
- If the user can hear the recording within 10 seconds, the audio devices and network connection are working properly.

 **Note:**

 * After calling this method, always call stopEchoTest to end the test. Otherwise, the app cannot run the next echo test, nor can it call the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method to start a new call.
 * In the live broadcast profile, only the hosts can call this method. If the user switches from a communication to live broadcast channel, the user must call [setClientRole](setClientRole:) to change the user role from the audience (default) to the host before calling this method.
 @param successBlock The `successBlock` callback is triggered if this method call is successful.

 @return * 0: Success. * < 0: Failure.
 */
- (int)startEchoTest:(void(^ _Nullable)(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed))successBlock;

/** Stops the audio call test.

 @return * 0: Success. * < 0: Failure. For example, AgoraErrorCodeRefused(-5)：Failed to stop the echo test. The echo test may not be running.
 */
- (int)stopEchoTest;

/** Enables the network connection quality test.

  This method tests the quality of the user’s network connection and is disabled by default.

 Before users join a channel or before an audience switches to a host, call this method to check the uplink network quality.

 This method consumes additional network traffic, which may affect the communication quality.

 Call [disableLastmileTest](disableLastmileTest) to disable the test immediately after receiving the [lastmileQuality]([AgoraRtcEngineDelegate rtcEngine:lastmileQuality:]) callback, and before the user joins the channel or switches the user role.

 **Note:**

 - Do not call any other methods before receiving the [lastmileQuality]([AgoraRtcEngineDelegate rtcEngine:lastmileQuality:]) callback. Otherwise, the callback may be interrupted by other methods and may not execute.

 - In the Live Broadcast profile, a host should not call this method.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableLastmileTest;

/** Disables the network connection quality test.

 @return * 0: Success. * < 0: Failure.
 */
- (int)disableLastmileTest;

#pragma mark Custom Video Module

/**-----------------------------------------------------------------------------
 * @name Custom Video Module
 * -----------------------------------------------------------------------------
 */

/** Sets the video source.

In real-time communications, the Agora SDK uses the default video input source (the built-in camera) to publish streams. To use the external video source, call AgoraVideoSourceProtocol to set the custom video source and then use this method to add the external video source into the SDK.

 @param videoSource AgoraVideoSourceProtocol
 */
- (void)setVideoSource:(id<AgoraVideoSourceProtocol> _Nullable)videoSource;

/** Sets the local video renderer.

In real-time communications, the Agora SDK uses the default video renderer to render the video. To use the external video renderer, call AgoraVideoSinkProtocol to set the custom local video renderer and then use this method to add the external renderer into the SDK.

 @param videoRenderer Sets the local video renderer. See AgoraVideoSinkProtocol.
 */
- (void)setLocalVideoRenderer:(id<AgoraVideoSinkProtocol> _Nullable)videoRenderer;

/** Sets the remote video renderer.

 This method sets the remote local renderer. In real-time communications, the Agora SDK uses the default video renderer to render the video. To use the external video renderer, call AgoraVideoSinkProtocol to set the custom remote video renderer and then use this method to add the external renderer into the SDK.

  @param videoRenderer Sets the video renderer of the remote user. See AgoraVideoSinkProtocol.
 @param userId ID of the remote user.
*/
- (void)setRemoteVideoRenderer:(id<AgoraVideoSinkProtocol> _Nullable)videoRenderer forUserId:(NSUInteger)userId;

/** Retrieves the video source.

  @return Video source. See AgoraVideoSourceProtocol.
 */
- (id<AgoraVideoSourceProtocol> _Nullable)videoSource;

/** Retrieves the local video renderer.

 @return Local video renderer. See AgoraVideoSinkProtocol.
 */
- (id<AgoraVideoSinkProtocol> _Nullable)localVideoRenderer;

/** Retrieves the video renderer of a specified remote user.

 @param userId ID of the remote user.
 @return Video renderer of the remote user. See AgoraVideoSinkProtocol.
 */
- (id<AgoraVideoSinkProtocol> _Nullable)remoteVideoRendererOfUserId:(NSUInteger)userId;


#pragma mark External Audio Data

/**-----------------------------------------------------------------------------
 * @name External Audio Data (push-mode only)
 * -----------------------------------------------------------------------------
 */

/** Enables the external audio source.

 @param sampleRate       Sets the sampling rate of the external audio source: 8000, 16000, 44100 or 48000.
 @param channelsPerFrame Sets the number of the external audio source channels (two channels maximum).
 */
- (void)enableExternalAudioSourceWithSampleRate:(NSUInteger)sampleRate
                               channelsPerFrame:(NSUInteger)channelsPerFrame;

/** Disables the external audio source.
 */
- (void)disableExternalAudioSource;

/** Pushes the external raw data audio frame to the Agora SDK for encoding.

 @param data      External audio data to be pushed.
 @param samples   Sampling point for the push.
 @param timestamp Timestamp of the external audio frame to be synchronized with the external video source.
 @return * 0: Success. * < 0: Failure.
 */
- (BOOL)pushExternalAudioFrameRawData:(void * _Nonnull)data
                              samples:(NSUInteger)samples
                            timestamp:(NSTimeInterval)timestamp;

/** Pushes the external CMSampleBuffer audio frame to the Agora SDK for encoding.

 @param sampleBuffer Sample buffer for the push.
 @return * YES: Success. * NO: Failure.
 */
- (BOOL)pushExternalAudioFrameSampleBuffer:(CMSampleBufferRef _Nonnull)sampleBuffer;


#pragma mark External Video Data

/**-----------------------------------------------------------------------------
 * @name External Video Data (push-mode only)
 * -----------------------------------------------------------------------------
 */

/** Configures the external video source.

 If an external video source is used, call this method before [enableVideo](enableVideo) or [startPreview](startPreview).

 @param enable Sets whether or not to use an external video source:

 * YES: Use an external video source.
 * NO: (Default) Do not use an external video source.

 @param useTexture Sets whether or not to use texture as an input:

 * YES: Use texture as an input.
 * NO: Do not use texture as an input.

 @param pushMode Sets whether or not the external video source needs to call [pushExternalVideoFrame](pushExternalVideoFrame:) to send the video frame to the Agora SDK:

 * YES: Use the push mode.
 * NO: Use the pull mode (not supported yet).
 */
- (void)setExternalVideoSource:(BOOL)enable useTexture:(BOOL)useTexture pushMode:(BOOL)pushMode;

/** Pushes the external video frame.

This method pushes the video frame using the AgoraVideoFrame class and passes the video frame to the Agora SDK with the input `format` found in AgoraVideoFrame.
Call [setExternalVideoSource](setExternalVideoSource:useTexture:pushMode:) and set the `pushMode` parameter as YES before calling this method. Otherwise, a failure returns after calling this method.

**Note:**

 This method supports pushing textured video frames in the live-broadcast profile only, not in the communication profile.

 @param frame Video frame containing the Agora SDK's encoded video data to be pushed. See AgoraVideoFrame for details.
 @return * YES: The frame is pushed successfully.
 * NO: Failed to push the frame.
 */
- (BOOL)pushExternalVideoFrame:(AgoraVideoFrame * _Nonnull)frame;


#pragma mark Raw Audio Data

/**-----------------------------------------------------------------------------
 * @name Raw Audio Data
 * -----------------------------------------------------------------------------
 */

/** Sets the audio recording format for the `onRecordAudioFrame` callback.

See [Modify Raw Data](https://docs.agora.io/en/Interactive%20Broadcast/rawdata_ios?platform=iOS) for details.

 @param sampleRate     Sets the sampling rate (`samplesPerSec`) returned in `onRecordAudioFrame`, which can be set as 8000, 16000, 32000, 44100, or 48000.
 @param channel        Sets the number of audio channels (`channels`) returned in `onRecordAudioFrame`, which can be set as 1 or 2:

- 1: Mono
- 2: Stereo
 @param mode      Sets the use mode of the `onRecordAudioFrame` callback. See AgoraAudioRawFrameOperationMode.
 @param samplesPerCall Sets the sample points (`samples`) returned in `onRecordAudioFrame`. samplesPerCall is usually set as 1024 for stream pushing. samplesPerCall = (int)(sampleRate × sampleInterval), where sampleInterval &ge; 0.01 in seconds.

 @return * 0: Success.
 * < 0: Failure.
 */
- (int)setRecordingAudioFrameParametersWithSampleRate:(NSInteger)sampleRate
                                              channel:(NSInteger)channel
                                                 mode:(AgoraAudioRawFrameOperationMode)mode
                                       samplesPerCall:(NSInteger)samplesPerCall;
/** Sets the audio playback format for the `onPlaybackAudioFrame` callback.

See [Modify Raw Data](https://docs.agora.io/en/Interactive%20Broadcast/rawdata_ios?platform=iOS) for details.

 @param sampleRate     Sets the sampling rate (`samplesPerSec`) returned in `onPlaybackAudioFrame`, which can set be as 8000, 16000, 32000, 44100 or 48000.
 @param channel        Sets the number of audio channels (`channels`) returned in `onPlaybackAudioFrame`, which can be set as 1 or 2:

  * 1: Mono
  * 2: Stereo
 @param mode           Sets the use mode of the `onPlaybackAudioFrame` callback. See AgoraAudioRawFrameOperationMode.
 @param samplesPerCall Sets the sample points (`samples`) returned in `onPlaybackAudioFrame`. samplesPerCall is usually set as 1024 for stream pushing. samplesPerCall = (int)(sampleRate × sampleInterval), where sampleInterval &ge; 0.01 in seconds.

 @return * 0: Success.
 * < 0: Failure.
 */
- (int)setPlaybackAudioFrameParametersWithSampleRate:(NSInteger)sampleRate
                                             channel:(NSInteger)channel
                                                mode:(AgoraAudioRawFrameOperationMode)mode
                                      samplesPerCall:(NSInteger)samplesPerCall;

/** Sets the mixed audio format for the `onMixedAudioFrame` callback.

See [Modify Raw Data](https://docs.agora.io/en/Interactive%20Broadcast/rawdata_ios?platform=iOS) for details.

 @param sampleRate     Sets the sampling rate (`samplesPerSec`) returned in `onMixedAudioFrame`, which can set be as 8000, 16000, 32000, 44100, or 48000.
 @param samplesPerCall Sets the sample points (`samples`) returned in `onMixedAudioFrame`. samplesPerCall is usually set as 1024 for stream pushing. samplesPerCall = (int)(sampleRate × sampleInterval), where sampleInterval &ge; 0.01 in seconds.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setMixedAudioFrameParametersWithSampleRate:(NSInteger)sampleRate
                                   samplesPerCall:(NSInteger)samplesPerCall;


#pragma mark Watermark

/**-----------------------------------------------------------------------------
 * @name Watermark
 * -----------------------------------------------------------------------------
 */

/** Adds a watermark image to the local video or CDN live stream.

This method adds a PNG watermark to the local video stream for the recording device, channel audience, and CDN live audience to see and capture.

 To add the PNG file onto a CDN live publishing stream only, see the  [setLiveTranscoding](setLiveTranscoding:) method.

**Note:**

* The URL descriptions are different for the local video and CDN live streams:
  * In a local video stream, `url` in AgoraImage refers to the absolute path of the added watermark image file in the local video stream.
  * In a CDN live stream, `url` in AgoraImage refers to the HTTP/HTTPS URL address of the added watermark image in the CDN live broadcast.
* The source file of the watermark image must be in the PNG file format. If the width and height of the PNG file differ from your settings in this method, the PNG file is cropped to conform to your settings.
* The Agora SDK supports adding only one watermark image onto a local video or CDN live stream. The newly added watermark image replaces the previous one.
* If you set `orientationMode` as `Adaptive` in the [setVideoEncoderConfiguration](setVideoEncoderConfiguration:) method, the watermark image rotates with the video frame and rotates around the upper left corner of the watermark image.

@param watermark Watermark image to be added to the local video stream. See AgoraImage.

@return * 0: Success. * < 0: Failure.
 */
- (int)addVideoWatermark:(AgoraImage * _Nonnull)watermark NS_SWIFT_NAME(addVideoWatermark(_:));

/** Removes the watermark image from the video stream added by [addVideoWatermark](addVideoWatermark:).

 @return * 0: Success. * < 0: Failure.
 */
- (int)clearVideoWatermarks;


#pragma mark Stream Fallback

/**-----------------------------------------------------------------------------
 * @name Stream Fallback
 * -----------------------------------------------------------------------------
 */

/** Sets the fallback option for the published local stream based on the network conditions.

The default setting for `option` is `AgoraStreamFallbackOptionDisabled`, where there is no fallback for the published video stream when the uplink network conditions are unreliable.

If `option` is set to `AgoraStreamFallbackOptionAudioOnly`, the SDK will:

 * Disable the upstream video but enable audio only when the network conditions deteriorate and cannot support both video and audio.
 * Re-enable the video when the network conditions improve.

 When the published stream falls back to audio-only or when the audio stream switches back to the video, the [didLocalPublishFallbackToAudioOnly]([AgoraRtcEngineDelegate rtcEngine:didLocalPublishFallbackToAudioOnly:]) callback is triggered.

 **Note:**

 Agora does not recommend using this method for CDN live streaming, because the remote CDN live user will have a noticeable lag when the published stream falls back to audio-only.

 @param option Sets the fallback option for the published video stream. The default value is AgoraStreamFallbackOptionDisabled. See AgoraStreamFallbackOptions for details.
 @return * 0: Success. * < 0: Failure.
 */
- (int)setLocalPublishFallbackOption:(AgoraStreamFallbackOptions)option;

/** Sets the fallback option for the remote stream based on the network conditions.

The default setting for `option` is `AgoraStreamFallbackOptionVideoStreamLow`, where the remote stream falls back to the low-video stream (low resolution and low bitrate) under unreliable downlink network conditions.

If `option` is set to `AgoraStreamFallbackOptionAudioOnly`, the SDK automatically switches the video from a high stream to a low stream, or disable the video when the downlink network conditions cannot support both audio and video to guarantee the quality of the audio. The SDK monitors the network quality and re-enables the video stream when the network conditions improve.
 Once the published stream falls back to audio only, or the audio stream switches back to the video stream, the [didRemoteSubscribeFallbackToAudioOnly]([AgoraRtcEngineDelegate  rtcEngine:didRemoteSubscribeFallbackToAudioOnly:byUid:]) callback is triggered.

 @param option Sets the fallback option for the remote stream. The default value is `AgoraStreamFallbackOptionVideoStreamLow`. See AgoraStreamFallbackOptions for details.
 @return * 0: Success. * < 0: Failure.
 */
- (int)setRemoteSubscribeFallbackOption:(AgoraStreamFallbackOptions)option;


#pragma mark Dual-stream Mode

/**-----------------------------------------------------------------------------
 * @name Dual-stream Mode
 * -----------------------------------------------------------------------------
 */

/** Enables/Disables the dual-stream mode. (Live broadcast only.)

If dual-stream mode is enabled, the receiver can choose to receive the high stream (high-resolution high-bitrate video stream), or low stream (low-resolution low-bitrate video stream).

 @param enabled Sets the stream mode:

 * YES: Dual-stream mode.
 * NO: (Default) Single-stream mode.

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableDualStreamMode:(BOOL)enabled;

/** Sets the remote user’s video stream type received by the local user when the remote user sends dual streams.

This method allows the app to adjust the corresponding video-stream type based on the size of the video window to reduce the bandwidth and resources.

 * If the remote user enables the dual-stream mode by calling [enableDualStreamMode](enableDualStreamMode:), the SDK receives the high-video stream by default. You can use this method to switch to the low-video stream type.
 * If the dual-stream mode is not enabled, the SDK receives the high-video stream by default.

 The method result returns in the [didApiCallExecute]([AgoraRtcEngineDelegate rtcEngine:didApiCallExecute:api:result:]) callback. The Agora SDK receives the high-video stream by default to save the bandwidth. If needed, users may use this method to switch to the low-video stream.

 By default, the aspect ratio of the low-video stream is the same as the high-video stream. Once the resolution of the high-video stream is set, the system automatically sets the resolution, frame rate, and bitrate for the low-video stream.

 @param uid        ID of the remote user sending the video stream.
 @param streamType  Sets the video-stream type. See AgoraVideoStreamType.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setRemoteVideoStream:(NSUInteger)uid
                       type:(AgoraVideoStreamType)streamType;

/** Sets the default video-stream type for the video received by the local user when the remote user sends dual streams.

 @param streamType Sets the default video-stream type. See AgoraVideoStreamType.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setRemoteDefaultVideoStreamType:(AgoraVideoStreamType)streamType;


#pragma mark Encryption

/**-----------------------------------------------------------------------------
 * @name Encryption
 * -----------------------------------------------------------------------------
 */

/** Enables built-in encryption with an encryption password before joining a channel.

All users in a channel must set the same encryption password. The encryption password is automatically cleared once a user leaves the channel.

  If the encryption password is not specified or set to empty, the encryption functionality is disabled.

 **Note:**

 Do not use this method for CDN live streaming.

 @param secret Encryption password.
 @return * 0: Success. * < 0: Failure.
 */
- (int)setEncryptionSecret:(NSString * _Nullable)secret;

/** Sets the built-in encryption mode.

 The Agora SDK supports built-in encryption, which is set to the `AgoraEncryptionModeAES128XTS` mode by default. Call this method to use other encryption modes.

 All users in the same channel must use the same encryption mode and password.

 Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.

 **Note:**

 - Call [setEncryptionSecret](setEncryptionSecret:) to enable the built-in encryption function before calling this method.
 - Do not use this method for CDN live streaming.

 @param encryptionMode Sets the encryption mode. See AgoraEncryptionMode.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setEncryptionMode:(NSString * _Nullable)encryptionMode;


#pragma mark Inject an Online Media Stream

/**-----------------------------------------------------------------------------
 * @name Inject an Online Media Stream
 * -----------------------------------------------------------------------------
 */

/** Adds a voice or video stream HTTP/HTTPS URL address to a live broadcast.

 The [streamPublishedWithUrl]([AgoraRtcEngineDelegate rtcEngine:streamPublishedWithUrl:errorCode:]) callback returns the inject stream status.

 If this method call is successful, the server pulls the voice or video stream and injects it into a live channel. This is applicable to scenarios where all the audience members in the channel can watch a live show and interact with each other.

 The [didJoinedOfUid]([AgoraRtcEngineDelegate rtcEngine:didJoinedOfUid:elapsed:]) and [firstRemoteVideoDecodedOfUid]([AgoraRtcEngineDelegate rtcEngine:firstRemoteVideoFrameOfUid:size:elapsed:]) callbacks are triggered and a stream uid of 666 is returned.

 @param url    HTTP/HTTPS URL address to be added to the ongoing live broadcast. Valid protocols are RTMP, HLS, and FLV.

- Supported FLV audio codec type: AAC.
- Supported FLV video codec type: H264 (AVC).
 @param config AgoraLiveInjectStreamConfig object which contains the configuration information for the added voice or video stream.
 @return
  * 0: Success. 
  * < 0: Failure.
    - AgoraErrorCodeInvalidArgument(2): The injected URL does not exist. Call this method again to inject the stream and ensure that the URL is valid.
    - AgoraErrorCodeNotReady(3): The user is not in the channel.
    - AgoraErrorCodeNotSupported(4): The channel profile is not live broadcast. Call [setChannelProfile]([AgoraRtcEngineKit setChannelProfile:]) and set the channel profile to live broadcast before calling this method.
    - AgoraErrorCodeNotInitialized(7): The SDK is not initialized. Ensure that the RtcEngine object is initialized before using this method.

*/
- (int)addInjectStreamUrl:(NSString * _Nonnull)url config:(AgoraLiveInjectStreamConfig * _Nonnull)config;

/** Removes the voice or video stream HTTP/HTTPS URL address from a live broadcast.

 This method removes the HTTP/HTTPS URL address (added by [addInjectStreamUrl](addInjectStreamUrl:config:)) from a live broadcast.

 If this method call is successful, the [didOfflineOfUid]([AgoraRtcEngineDelegate rtcEngine:didOfflineOfUid:reason:]) callback is triggered and a stream uid of 666 is returned.

 @param url HTTP/HTTPS URL address of the added stream to be removed.
 @return * 0: Success. * < 0: Failure.
 */
- (int)removeInjectStreamUrl:(NSString * _Nonnull)url;


#pragma mark CDN Live Streaming

/**-----------------------------------------------------------------------------
 * @name CDN Live Streaming
 * -----------------------------------------------------------------------------
 */

/** Adds a stream RTMP URL address, to which the host publishes the stream. (CDN live only.)

The host publishes the stream to the specified CDN live RTMP URL address. This method triggers the [streamPublishedWithUrl]([AgoraRtcEngineDelegate rtcEngine:streamPublishedWithUrl:errorCode:]) callback.

 **Note:**

 - Ensure that the user joins the channel before calling this method.
 - This method adds only one stream URL each time it is called.
 - The URL must not contain special characters, such as Chinese language characters.

 @param url  RTMP URL address, to which the host publishes the stream.
 @param transcodingEnabled Sets whether transcoding is enabled/disabled:

 - YES: Enable transcoding. To [transcode](https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#transcoding) the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
 - NO: Disable transcoding.

 @return * 0: Success. * < 0: Failure.

  - AgoraErrorCodeInvalidArgument(2): Invalid parameter. The URL is nil or the string length is 0.
  - AgoraErrorCodeNotInitialized(7): You have not initialized the RTC Engine when publishing the stream.
 */
- (int)addPublishStreamUrl:(NSString * _Nonnull)url transcodingEnabled:(BOOL)transcodingEnabled;

/** Removes a stream RTMP URL address. (CDN live only.)

This method removes the RTMP URL address added by [addPublishStreamUrl](addPublishStreamUrl:transcodingEnabled:) from a CDN live stream.

 **Note:**

 * This method removes only one URL each time it is called.
 * The URL must not contain special characters such as Chinese language characters.

 @param url RTMP URL address to be removed.

 @return * 0: Success. * < 0: Failure.
 */
- (int)removePublishStreamUrl:(NSString * _Nonnull)url;

/** Sets the video layout and audio settings for CDN live. (CDN live only.)

 @param transcoding Sets the CDN live audio/video transcoding settings. See AgoraLiveTranscoding.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setLiveTranscoding:(AgoraLiveTranscoding *_Nullable)transcoding;


#pragma mark Data Stream

/**-----------------------------------------------------------------------------
 * @name Data Stream
 * -----------------------------------------------------------------------------
 */

/** Creates a data stream.

 Each user can have up to five simultaneous data channels.

 **Note:**

 Set both the `reliable` and `ordered` parameters to `YES` or `NO`. Do not set one as `YES` and the other as `NO`.

 @param streamId ID of the created data stream.
 @param reliable Sets whether or not the recipients are guaranteed to receive the data stream from the sender within five seconds:

 * YES: The recipients receive the data stream from the sender within five seconds. If the recipient does not receive the data stream within five seconds, an error is reported to the app.
 * NO: There is no guarantee that the recipients receive the data stream within five seconds and no error message is reported for any delay or missing data stream.

 @param ordered  Sets whether or not the recipients receive the data stream in the sent order:

 * YES: The recipients receive the data stream in the sent order.
 * NO: The recipients do not receive the data stream in the sent order.

 @return * Returns the ID of the data stream, if this method call is successful.
 * < 0: Failure.
*/
- (int)createDataStream:(NSInteger * _Nonnull)streamId
               reliable:(BOOL)reliable
                ordered:(BOOL)ordered;

/** Sends data stream messages to all users in a channel.

The SDK has the following restrictions on this method:

* Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 kB.
* Each client can send up to 6 kB of data per second.
* Each user can have up to five data streams simultaneously.

 **Note:**

 This method applies only to the communication profile or to the hosts in the live broadcast profile. If an audience in the live broadcast profile calls this method, the audience role may be changed to a host.

 @param streamId ID of the sent data stream, returned in  [createDataStream](createDataStream:reliable:ordered:).
 @param data   Sent data.

 @return * 0: Success.
 * < 0: Failure.
*/
- (int)sendStreamMessage:(NSInteger)streamId
                    data:(NSData * _Nonnull)data;


#pragma mark Miscellaneous Video Control

/**-----------------------------------------------------------------------------
 * @name Miscellaneous Video Control
 * -----------------------------------------------------------------------------
 */

/** Sets the preferences for the video quality. (Live broadcast only).

Under unreliable network connections or the device's CPU is overloaded, the video quality may be affected. You can use this method to choose the video smoothness (frame rate) over the image quality or vice versa.

 @param preferFrameRateOverImageQuality Sets the video quality preference:

 * YES: Frame rate over image quality.
 * NO: (Default) Image quality over frame rate.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setVideoQualityParameters:(BOOL)preferFrameRateOverImageQuality;

/** Sets the local video mirror mode.

 Use this method before startPreview, or the mirror mode does not take effect until you re-enable startPreview.

 @param mode Sets the local video mirror mode. See AgoraVideoMirrorMode.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setLocalVideoMirrorMode:(AgoraVideoMirrorMode)mode;


#if TARGET_OS_IPHONE
#pragma mark Camera Control

/**-----------------------------------------------------------------------------
 * @name Camera Control
 * -----------------------------------------------------------------------------
 */

/** Switches between the front and rear cameras. (iOS only)

 @return * 0: Success. * < 0: Failure.
 */
- (int)switchCamera;

/** Checks whether the camera zoom function is supported. (iOS only.)

 @return * YES: The device supports the camera zoom function.
 * NO: The device does not support the camera zoom function.
 */
- (BOOL)isCameraZoomSupported;

/** Checks whether the camera flash function is supported. (iOS only.)

 **Note:**

 The app generally enables the front camera by default. If your front camera flash is not supported, this method returns `NO`. If you want to check if the rear camera flash is supported, call switchCamera before calling this method.

 @return * YES: The device supports the camera flash function.
 * NO: The device does not support the camera flash function.
 */
- (BOOL)isCameraTorchSupported;

/** Checks whether the camera manual focus function is supported. (iOS only)

 @return * YES: The device supports the camera manual focus function.
 * NO: The device does not support the camera manual focus function.
 */
- (BOOL)isCameraFocusPositionInPreviewSupported;

/** Checks whether the camera manual exposure function is supported. (iOS only)

 @return * YES: The device supports manual exposure.
 * NO: The device does not support manual exposure.
 */
- (BOOL)isCameraExposurePositionSupported;

/** Checks whether the camera auto-face focus function is supported. (iOS only)

 @return * YES: The device supports the camera auto-face focus function.
 * NO: The device does not support the camera auto-face focus function.
 */
- (BOOL)isCameraAutoFocusFaceModeSupported;

/** Sets the camera zoom ratio. (iOS only)

 @param zoomFactor Sets the camera zoom factor. The value ranges between 1.0 and the maximum zoom supported by the device.

 @return * The set camera zoom factor, if this method call is successful.
 * < 0: Failure.
 */
- (CGFloat)setCameraZoomFactor:(CGFloat)zoomFactor;

/** Sets the manual focus position. (iOS only)

 @param position Coordinates of the touch point in the view.

 @return * YES: Success. * NO: Failure.
 */
- (BOOL)setCameraFocusPositionInPreview:(CGPoint)position;

/** Sets the camera exposure position. (iOS only)

 @param positionInView Coordinates of the touch point in the view.

 @return * YES: Success. 
 * NO: Failure.
 */
- (BOOL)setCameraExposurePosition:(CGPoint)positionInView;

/** Enables the camera flash function. (iOS only.)

 @param isOn * YES: Enable the camera flash function.
 * NO: Disable the camera flash function.

 @return * YES: Success. * NO: Failure.
 */
- (BOOL)setCameraTorchOn:(BOOL)isOn;

/** Enables the camera auto-face focus function. (iOS only.)

 @param enable * YES: Enable the camera auto-face focus function.
 * NO: (Default) Disable the camera auto-face focus function.

 @return * YES: Success. * NO: Failure.
 */
- (BOOL)setCameraAutoFocusFaceModeEnabled:(BOOL)enable;

#endif


#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
#pragma mark Screen Sharing

/**-----------------------------------------------------------------------------
 * @name Screen Sharing
 * -----------------------------------------------------------------------------
 */

/** Starts screen sharing. (macOS only.)

 @param windowId Sets to share the whole screen, a specified window, or a specified region:

 * Share the whole screen: Set `windowId` as 0 and set `rect` as nil.
 * Share the specified window: Set `windowId` not as 0. Each window has a `windowId` that is not 0.
 * Share the specified region: Set `windowId` as 0 and set `rect` not as nil. You can share the specified region, for example by dragging the mouse (the logic is implemented by yourself). The specified region is a region on the whole screen. Currently, sharing a specified region in a specific window is not supported.
 @param captureFreq (Mandatory) The captured frame rate. The value ranges between 1 fps and 15 fps.
 @param bitRate The captured bitrate.
 @param rect Specifies the screen-sharing region. `rect` is valid when `windowsId` is set as 0. When you set `rect` as nil, the whole screen is shared.
 @return * 0: Success. * < 0: Failure.
 */
- (int)startScreenCapture:(NSUInteger)windowId
          withCaptureFreq:(NSInteger)captureFreq
                  bitRate:(NSInteger)bitRate
                  andRect:(CGRect)rect;

/** Stops screen sharing. (macOS only.)

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopScreenCapture;

/** Updates the screen-sharing region. (macOS only.)

 @param rect Specifies the screen-sharing region. `rect` is valid when `windowsId` is set as 0, and when you set `rect`  as nil, then the whole screen is shared.

 @return * 0: Success. * < 0: Failure.
 */
- (int)updateScreenCaptureRegion:(CGRect)rect;
#endif


#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
#pragma mark Device Manager (macOS)
/**-----------------------------------------------------------------------------
 * @name Device Manager (macOS only)
 * -----------------------------------------------------------------------------
 */

/** Monitors the change of a device state. (macOS only.)

 Use this method to monitor the plugging and swapping of external audio/video devices, for example, an external camera.

 @param enabled - YES: Enable the monitoring of a device state change.
 - NO: Disable the monitoring of a device state change.
 */
- (void)monitorDeviceChange:(BOOL)enabled;

/** Retrieves all the devices in the system. (macOS only.)

 **Note:**

 Do not call this method in the main thread.

 This method returns an NSArray object, including all the audio/video devices in the system.
 Your app can use the AgoraRtcDeviceInfo array object to enumerate the devices.

 @param type Device type: AgoraMediaDeviceType.
 @return An AgoraRtcDeviceInfo NSArray object including all the devices, if this method call is successful.
 */
- (NSArray<AgoraRtcDeviceInfo *> * _Nullable)enumerateDevices:(AgoraMediaDeviceType)type;

/** Retrieves the device information; such as a recording, playback, or video capture device. (macOS only.)

 @param type Device type: AgoraMediaDeviceType.
 @return * The device information (AgoraRtcDeviceInfo), if this method call is successful.
 * nil: Failure.
 */
- (AgoraRtcDeviceInfo * _Nullable)getDeviceInfo:(AgoraMediaDeviceType)type;

/** Sets the playback, recording, or audio-sampling device. (macOS only.)

 @param type    Device type: AgoraMediaDeviceType.
 @param deviceId Device ID of the device, which can be retrieved by calling [enumerateDevices](enumerateDevices:). `deviceId` does not change when the device is plugged or unplugged.
 @return * 0: Success. * < 0: Failure.
 */

- (int)setDevice:(AgoraMediaDeviceType)type deviceId:(NSString * _Nonnull)deviceId;

/** Retrieves the specified device's volume. (macOS only.)

 @param type Device type: AgoraMediaDeviceType.
 @return * Returns the volume, if this method call is successful.
 * < 0: Failure.
 */
- (int)getDeviceVolume:(AgoraMediaDeviceType)type;

/** Sets the specified device's volume. (macOS only.)

 @param type   Device type: AgoraMediaDeviceType
 @param volume Sets the specified device's volume. The value ranges between 0 and 100.
 @return * 0: Success. * < 0: Failure.
 */
- (int)setDeviceVolume:(AgoraMediaDeviceType)type volume:(int)volume;

/** Starts the microphone test. (macOS only.)

 This method tests whether the microphone works properly. Once the test starts, the SDK reports the volume information by using the [reportAudioVolumeIndicationOfSpeakers]([AgoraRtcEngineDelegate rtcEngine:reportAudioVolumeIndicationOfSpeakers:totalVolume:]) callback.

 @param indicationInterval Interval period (ms) of the [reportAudioVolumeIndicationOfSpeakers]([AgoraRtcEngineDelegate rtcEngine:reportAudioVolumeIndicationOfSpeakers:totalVolume:]) callback cycle.

 @return * 0: Success. * < 0: Failure.
 */
- (int)startRecordingDeviceTest:(int)indicationInterval;

/** Stops the microphone test. (macOS only.)

 This method stops testing the microphone. You must call this method to stop the test after calling the [startRecordingDeviceTest](startRecordingDeviceTest:) method.

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopRecordingDeviceTest;

 /** Starts an audio playback device test. (macOS only.)

 This method tests whether the audio playback device works properly with a specified playback audio file.

 @param audioFileName Absolute path of the audio file for the test in UTF-8:

 - Supported file formats: wav, mp3, m4a, and aac.
 - Supported file sampling rates: 8000, 16000, 32000, 44100, and 48000.

 @return * 0: Success, and you can hear the sound of the specified audio file. * < 0: Failure.
 */
- (int)startPlaybackDeviceTest:(NSString * _Nonnull)audioFileName;

/** Stops the audio playback device test. (macOS only.)

 This method stops testing the audio playback device. You must call this method to stop the test after calling [startPlaybackDeviceTest](startPlaybackDeviceTest:).

 @return * 0: Success. * < 0: Failure.
 */
- (int)stopPlaybackDeviceTest;

/** Starts the capture device test. (macOS only.)

 This method tests whether the current video capture device works properly. Ensure that you have called [enableVideo](enableVideo) before calling this method and that the parameter view window is valid.

 @param view Input parameter, for displaying the video window.

 @return * 0: Success. * < 0: Failure.

 */
- (int)startCaptureDeviceTest:(NSView * _Nonnull)view;

/** Stops the capture device test. (macOS only.)

 This method stops testing the capture device. You must call this method to stop the test after calling [startCaptureDeviceTest](startCaptureDeviceTest:).

 @return * 0: Success. * < 0: Failure.

 */
- (int)stopCaptureDeviceTest;
#endif


#pragma mark Miscellaneous Methods

/**-----------------------------------------------------------------------------
 * @name Miscellaneous Methods
 * -----------------------------------------------------------------------------
 */

/** Retrieves the current call ID.

 When a user joins a channel on a client, a `callId` is generated to identify the call from the client. Feedback methods, such as the [rate](rate:rating:description:) and [complain](complain:description:) methods, must be called after the call ends to submit feedback to the SDK.

 The [rate](rate:rating:description:) and [complain](complain:description:) methods require the `callId` parameter retrieved from the `getCallId` method during a call. *callId* is passed as an argument into the [rate](rate:rating:description:) and [complain](complain:description:) methods after the call ends.

 @return callId The current call ID.
 */
- (NSString * _Nullable)getCallId;

/** Allows a user to rate a call after the call ends.

 @param callId      Call ID retrieved from the [getCallId]([AgoraRtcEngineKit getCallId]) method.
 @param rating      Rating of the call. The value is between 1 (lowest score) and 5 (highest score). If you set a value out of this range, the AgoraErrorCodeInvalidArgument(-2) error occurs.
 @param description (Optional) Description of the rating. The string length must be less than 800 bytes.

 @return * 0: Success.
 * < 0: Failure.

     * Return AgoraErrorCodeInvalidArgument(-2)：The passed argument is invalid. For example, `callId` is invalid.
     * Return AgoraErrorCodeNotReady(-3)：The SDK status is incorrect. For example, initialization fails.
 */
- (int)rate:(NSString * _Nonnull)callId
     rating:(NSInteger)rating
description:(NSString * _Nullable)description;

/** Allows a user to complain about the call quality after a call ends.

 @param callId      Call ID retrieved from the getCallId method.
 @param description (Optional) Description of the complaint. The character length must be less than 800 bytes.

 @return * 0: Success.
 * < 0: Failure.
 */
- (int)complain:(NSString * _Nonnull)callId
    description:(NSString * _Nullable)description;

/** Enables/Disables dispatching the delegate to the main queue.

 If disabled, the app should dispatch the UI operating to the main queue.

 @param enabled Sets whether or not to dispatch the delegate to the main queue:

 * YES: Dispatch the delegate method to the main queue.
 * NO: Do not dispatch the delegate methods to the main queue

 @return * 0: Success. * < 0: Failure.
 */
- (int)enableMainQueueDispatch:(BOOL)enabled;

/** Retrieves the Agora SDK version.

 This method returns the string of the version number.

 @return The version of the current SDK in the string format. For example, 2.3.0
 */
+ (NSString * _Nonnull)getSdkVersion;

/** Specifies an SDK output log file.

The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.

 **Note:**

 The default log file location is at Library/caches/agorasdk.log.

 @param filePath Absolute path of the log file. The string of the log file is in UTF-8.

 @return * 0: Success.
 * < 0: Failure.
 */
- (int)setLogFile:(NSString * _Nonnull)filePath;

/** Sets the output log level of the SDK.

You can use one or a combination of the filters. The log level follows the sequence of OFF, CRITICAL, ERROR, WARNING, INFO, and DEBUG. Choose a level to see the logs preceding that level.

For example, if you set the log level to WARNING, you see the logs within levels CRITICAL, ERROR, and WARNING.

 @param filter Log filter level: AgoraLogFilter.

 @return * 0: Success.
 * < 0: Failure.
 */
- (int)setLogFilter:(NSUInteger)filter;

/** Returns the native handler of the SDK engine.

 This interface is used to get the native C++ handler of the SDK engine used in special scenarios, such as registering the audio and video frame observer.
 */
- (void * _Nullable)getNativeHandle;

/** Sets and retrieves the SDK delegate.

 The SDK uses the delegate to inform the app on engine runtime events. All methods defined in the delegate are optional implementation methods.

 */
@property (nonatomic, weak) id<AgoraRtcEngineDelegate> _Nullable delegate;


#pragma mark Customized Methods (Technical Preview)

/**-----------------------------------------------------------------------------
 * @name Customized Methods (Technical Preview)
 * -----------------------------------------------------------------------------
 */

/** Provides the technical preview functionalities or special customizations by configuring the SDK with JSON options.

 **Note:**

 The JSON options are not public by default. Agora is working on making commonly used JSON options public in a standard way. Contact [support@agora.io](mailto:support@agora.io) for more information.

 @param options SDK options in JSON format.
 */
- (int)setParameters:(NSString * _Nonnull)options;

/** Retrieves the Agora SDK's parameters for customization purposes.

 **Note:**

 This method is not public. Contact support@agora.io for more information.

 */
- (NSString * _Nullable)getParameter:(NSString * _Nonnull)parameter
                                args:(NSString * _Nullable)args;


#pragma mark Deprecated Methods

/**-----------------------------------------------------------------------------
 * @name Deprecated Methods
 * -----------------------------------------------------------------------------
 */

/** Initializes the AgoraRtcEngineKit object.

 **DEPRECATED** from v2.3.

 @see [sharedEngineWithAppId](sharedEngineWithAppId:delegate:)
 @param AppId    App ID issued to the developers by Agora. Apply for a new App ID from Agora if it is missing from your kit. Each project is assigned a unique App ID. The App ID identifies your project and organization in the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method to access the Agora Global Network, and enable one-to-one or one-to-more communication or live-broadcast sessions using a unique channel name for your App ID.
 @param errorBlock Error code: AgoraErrorCode.
 */
+ (instancetype _Nonnull)sharedEngineWithAppId:(NSString * _Nonnull)AppId
                                         error:(void(^ _Nullable)(AgoraErrorCode errorCode))errorBlock __deprecated_msg("use sharedEngineWithAppId:delegate: instead.");

/** Disables the audio function in the channel.

**DEPRECATED** from v2.3

 @see disableAudio
 @return * 0: Success. * < 0: Failure.
 */
- (int)pauseAudio __deprecated_msg("use disableAudio instead.");

/** Resumes the audio in the channel.

 **DEPRECATED** from v2.3

 @see enableAudio
 @return * 0: Success. * < 0: Failure.
 */
- (int)resumeAudio __deprecated_msg("use enableAudio instead.");

/** Sets the high-quality audio parameters.

 Replaced with [setAudioProfile](setAudioProfile:scenario:).

**DEPRECATED** from v2.3.

 @see [setAudioProfile](setAudioProfile:scenario:)
 @param fullband Sets whether to enable/disable full-band codec (48 kHz sampling rate). Not compatible with versions before v1.7.4.

  * YES: Enable full-band codec.
  * NO: Disable full-band codec.
 @param stereo Sets whether to enable/disable stereo codec. Not compatible with versions before v1.7.4.

  * YES: Enable stereo codec.
  * NO: Disable stereo codec.
 @param fullBitrate Sets whether to enable/disable high-bitrate mode. Recommended in voice-only mode.

  * YES: Enable high-bitrate mode.
  * NO: Disable high-bitrate mode.
 @return * 0: Success.
 * < 0: Failure.
 */
- (int)setHighQualityAudioParametersWithFullband:(BOOL)fullband
                                          stereo:(BOOL)stereo
                                     fullBitrate:(BOOL)fullBitrate __deprecated_msg("use setAudioProfile:scenario: instead.");

#if (!(TARGET_OS_IPHONE) && (TARGET_OS_MAC))
/** Sets the speakerphone volume. (macOS only.)

 **DEPRECATED** from v2.3.

 @see [setDeviceVolume](setDeviceVolume:volume:).
 @param volume Sets the speakerphone volume. The value ranges between 0 (lowest volume) and 255 (highest volume).

 @return * 0: Success. * < 0: Failure.
 */
- (int)setSpeakerphoneVolume:(NSUInteger)volume __deprecated_msg("use setDeviceVolume:volume: instead.");
#endif

/** Sets the video profile.

 **DEPRECATED** from v2.3.

 Each video profile includes a set of parameters, such as the resolution, frame rate, and bitrate. If the camera device does not support the specified resolution, the SDK  automatically chooses a suitable camera resolution, keeping the encoder resolution specified by setVideoProfile.

 **Note:**

 * Always set the video profile after calling the [enableVideo](enableVideo) method.
 * Always set the video profile before calling the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) or [startPreview](startPreview) method.
 * If you do not need to set the video profile after joining the channel, call this method before enableVideo to reduce the render time of the first video frame.

 @see [setVideoEncoderConfiguration](setVideoEncoderConfiguration:)
 @param profile    Sets the video profile. See AgoraVideoProfile.
 @param swapWidthAndHeight Sets whether or not to swap the width and height of the video:

 * YES: Swap the width and height. The video is in portrait mode.
 * NO: (Default) Do not swap the width and height. The video remains in landscape mode.

 The width and height of the output video are consistent with the set video profile.

 @return * 0: Success. * < 0: Failure.
 */
- (int)setVideoProfile:(AgoraVideoProfile)profile
    swapWidthAndHeight:(BOOL)swapWidthAndHeight __deprecated_msg("use setVideoEncoderConfiguration: instead.");

/** Sets the video encoding profile manually.

 **DEPRECATED** from v2.3.

 If you do not need to change the video profile after joining the channel, Agora recommends calling this method before enableVideo to reduce the render time of the first video frame.

 @see setVideoEncoderConfiguration:
 @param size      Sets the size of the video. The highest value is 1280 &times; 720.
 @param frameRate Sets the frame rate of the video. The highest value is 30. You can set it to 5, 10, 15, 24, 30, and so on.
 @param bitrate   Sets the bitrate of the video. You need to manually work out the bitrate according to the width, height, and frame rate. See the bitrate table in AgoraVideoEncoderConfiguration. With the same width and height, the bitrate varies with the change of the frame rate:

 * If the frame rate is 5 fps, divide the recommended bitrate by 2.
 * If the frame rate is 15 fps, use the recommended bitrate.
 * If the frame rate is 30 fps, multiply the recommended bitrate by 1.5.
 * Calculate your bitrate with the ratio if you choose other frame rates.

 For example, the resolution is 320 &times; 240 and the frame rate is 15 fps, hence, the bitrate is 200:

 * If the frame rate is 5 fps, the bitrate is 100.
 * If the frame rate is 30 fps, the bitrate is 300.
 * If the bitrate you set is beyond the proper range, the SDK automatically adjusts the bitrate to a value within the proper range.
 */
- (int)setVideoResolution:(CGSize)size andFrameRate:(NSInteger)frameRate bitrate:(NSInteger)bitrate __deprecated_msg("use setVideoEncoderConfiguration: instead.");

/** Configures the CDN live streaming before joining a channel.

 **DEPRECATED**

 This method is deprecated. Agora recommends using the following methods instead:

 * [addPublishStreamUrl](addPublishStreamUrl:transcodingEnabled:)
 * [removePublishStreamUrl](removePublishStreamUrl:)
 * [setLiveTranscoding](setLiveTranscoding:)

 @param config CDN live streaming settings: AgoraPublisherConfiguration

 */
- (int)configPublisher:(AgoraPublisherConfiguration * _Nonnull)config __deprecated;

/** Sets the picture-in-picture layout for the CDN live broadcast.

 **DEPRECATED**

This method is deprecated and Agora recommends using the [setLiveTranscoding](setLiveTranscoding:) method.

This method sets the picture-in-picture layouts for live broadcasts. This method is only applicable when you want to push streams to the Agora server. When you push the stream to the server:

 1. Define a canvas, its width and height (video resolution), background color, and the total number of video streams you want to display.
 2. Define the position and size for each video stream on the canvas, and indicate whether the view is cropped or zoomed to fit.

 The push stream application formats the information of the customized layouts as JSON and packages it
 in the Supplemental Enhancement Information (SEI) of each keyframe when generating the H.264 video stream and pushing it to the CDN live vendors through the RTMP protocol.

 **Note:**

 - Call this method after joining a channel.
 - The app should only allow one user to call this method in the same channel. Call [clearVideoCompositingLayout]([AgoraRtcEngineKit clearVideoCompositingLayout]) to remove the settings.

 @see [setLiveTranscoding](setLiveTranscoding:)
 @param layout Sets the picture-in-picture layout. See AgoraRtcVideoCompositingLayout.

*/
- (int)setVideoCompositingLayout:(AgoraRtcVideoCompositingLayout * _Nonnull)layout __deprecated;

/** Removes the picture-in-picture layout settings.

 **DEPRECATED**

 Removes the picture-in-picture layout settings created by [setVideoCompositingLayout]([AgoraRtcEngineKit setVideoCompositingLayout:]).
 */
- (int)clearVideoCompositingLayout __deprecated;

/** Retrieves the device type; such as a recording, playback, or video capture device. (macOS only.)

 **DEPRECATED**  from v2.3.

 @see [getDeviceInfo](getDeviceInfo:).
 @param type Device type: AgoraMediaDeviceType.
 @return * Returns the device ID of the device, if this method call is successful.
 * nil: Failure.
 */
- (NSString * _Nullable)getDeviceId:(AgoraMediaDeviceType)type __deprecated_msg("use getDeviceInfo: instead.");

/** Plays a specified audio effect.

 **DEPRECATED** from v2.3.

 @see [playEffect](playEffect:filePath:loopCount:pitch:pan:gain:publish:)
 @param soundId ID of the audio effect. Each audio effect has a unique ID.

 **Note:** If you preloaded the audio effect into the memory through [preloadEffect]([AgoraRtcEngineKit preloadEffect:filePath:]), ensure that the `soundID` value is set to the same value as in preloadEffect.
 @param filePath Absolute path of the audio effect file.
 @param loopCount Sets the number of times looping the audio effect:

 * 0: Play the audio effect once.
 * 1: Play the audio effect twice.
 * -1: Play the audio effect in an indefinite loop until [stopEffect]([AgoraRtcEngineKit stopEffect:]) or [stopAllEffects]([AgoraRtcEngineKit stopAllEffects]) is called.

 @param pitch Sets whether to change the pitch of the audio effect. The value ranges between 0.5 and 2.
 The default value is 1 (no change to the pitch). The lower the value, the lower the pitch.
 @param pan Sets the spatial position of the audio effect. The value ranges between -1.0 and 1.0.

 * 0.0: The audio effect displays ahead.
 * 1.0: The audio effect displays to the right.
 * -1.0: The audio effect displays to the left.

 @param gain Sets the volume of the sound effect. The value ranges between 0.0 and 100.0 (default). The lower the value, the lower the volume of the sound effect.
 @return * 0: Success. * < 0: Failure.
 */
- (int)playEffect:(int)soundId
         filePath:(NSString * _Nullable)filePath
        loopCount:(int)loopCount
            pitch:(double)pitch
              pan:(double)pan
             gain:(double)gain __deprecated_msg("use playEffect:filePath:loopCount:pitch:pan:gain:publish: instead.");

/** Returns the Media Engine version.

 **DEPRECATED** from v2.3.

 @see getSdkVersion

 @return string, Media engine version
 */
+ (NSString * _Nonnull)getMediaEngineVersion __deprecated;


#pragma mark Deprecated Blocks

/**-----------------------------------------------------------------------------
 * @name Deprecated Blocks
 * -----------------------------------------------------------------------------
 */

/** Reports which users are speaking and the speakers' volume.

 **DEPRECATED** from v1.1.

 This callback is disabled by default and can be enabled by the [enableAudioVolumeIndication]([AgoraRtcEngineKit enableAudioVolumeIndication:smooth:]) method.

 In the returned speaker's array:

 * If the `uid` is 0 (the local user is the speaker), the returned volume is the `totalVolume`.
 * If the `uid` is not 0 and the `volume` is 0, the specified user did not speak.
 * If a `uid` is found in the previous speaker's array but not in the current speaker's array, the specified user did not speak.

@see [reportAudioVolumeIndicationOfSpeakers]([AgoraRtcEngineDelegate rtcEngine:reportAudioVolumeIndicationOfSpeakers:totalVolume:])

@param audioVolumeIndicationBlock This block includes:

- speakers: An array containing the user ID and volume information for each speaker.

   - uid: User ID of the speaker.
   - volume：Volume of the speaker. The value ranges between 0 (lowest volume) to 255 (highest volume).
- totalVolume: Total volume after audio mixing between 0 (lowest volume) to 255 (highest volume).
 */
- (void)audioVolumeIndicationBlock:(void(^ _Nullable)(NSArray * _Nonnull speakers, NSInteger totalVolume))audioVolumeIndicationBlock __deprecated_msg("use delegate instead.");

/** Occurs when the engine renders the first local video frame on the video window.

 **DEPRECATED** from v1.1.

 @see [firstLocalVideoFrameWithSize]([AgoraRtcEngineDelegate rtcEngine:firstLocalVideoFrameWithSize:elapsed:])

 @param firstLocalVideoFrameBlock This block includes:

 - width: Width (pixels) of the video stream.
 - height: Height (pixels) of the video stream.
 - elapsed: Time elapsed (ms) from the local user calling [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) until this callback is triggered.
 */
- (void)firstLocalVideoFrameBlock:(void(^ _Nullable)(NSInteger width, NSInteger height, NSInteger elapsed))firstLocalVideoFrameBlock __deprecated_msg("use delegate instead.");

/** Occurs when the engine decodes the first video frame from a specific remote user.

 **DEPRECATED** from v1.1.

 @see [firstRemoteVideoFrameOfUid]([AgoraRtcEngineDelegate rtcEngine:firstRemoteVideoFrameOfUid:size:elapsed:])

 @param firstRemoteVideoDecodedBlock This block includes:

 - uid:     User ID of the user sending the video streams.
 - width:   Width (pixels) of the video stream.
 - height:  Height (pixels) of the video stream.
 - elapsed: Time elapsed (ms) from the remote user calling [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) until this callback is triggered.
 */
- (void)firstRemoteVideoDecodedBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger width, NSInteger height, NSInteger elapsed))firstRemoteVideoDecodedBlock __deprecated_msg("use delegate instead.");

/** Occurs when the first remote video frame is rendered.

 **DEPRECATED** from v1.1.

 @see [firstRemoteVideoDecodedOfUid]([AgoraRtcEngineDelegate rtcEngine:firstRemoteVideoDecodedOfUid:size:elapsed:])

 @param firstRemoteVideoFrameBlock This block includes:

 - uid:     User ID of the remote user sending the video streams.
 - width:   Width (pixels) of the video stream.
 - height:  Height (pixels) of the video stream.
 - elapsed: Time elapsed (ms) from the local user calling [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) until this callback is triggered.
 */
- (void)firstRemoteVideoFrameBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger width, NSInteger height, NSInteger elapsed))firstRemoteVideoFrameBlock __deprecated_msg("use delegate instead.");

/** Occurs when a user joins the channel.

 **DEPRECATED** from v1.1.

 If there are other users in the channel when this user joins, the SDK also reports to the app on the existing users who are already in the channel.

 @see [didJoinedOfUid]([AgoraRtcEngineDelegate rtcEngine:didJoinedOfUid:elapsed:])

 @param userJoinedBlock This block includes:

 - uid:     User ID. If the `uid` is specified in the [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) method, the specified ID is returned. If the user ID is not specified when joinChannel is called, the server automatically assigns a `uid`.
 - elapsed: Time elapsed (ms) from the user calling  [joinChannelByToken](joinChannelByToken:channelId:info:uid:joinSuccess:) until this callback is triggered.
 */
- (void)userJoinedBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger elapsed))userJoinedBlock __deprecated_msg("use delegate instead.");

/** Occurs when a user leaves the call or goes offline.

 **DEPRECATED** from v1.1.

 The SDK reads the timeout data to determine if a user leaves the channel (or goes offline). If no data packet is received from the user within 15 seconds, the SDK assumes the user is offline. Sometimes a weak network connection may lead to false detections; therefore, Agora recommends using signaling for reliable offline detection.

 @see [didOfflineOfUid]([AgoraRtcEngineDelegate rtcEngine:didOfflineOfUid:reason:])
 @param userOfflineBlock This block includes the user ID, `uid`.
 */
- (void)userOfflineBlock:(void(^ _Nullable)(NSUInteger uid))userOfflineBlock __deprecated_msg("use delegate instead.");

/** Occurs when a remote user's audio stream is muted/unmuted.

 **DEPRECATED** from v1.1.

 @see [didAudioMuted]([AgoraRtcEngineDelegate rtcEngine:didAudioMuted:byUid:])

 @param userMuteAudioBlock This block includes:

 - uid:   ID of the remote user whose audio stream is muted/unmuted.
 - muted: Whether the remote user's audio stream is muted/unmuted:

     - YES: Muted.
     - NO: Unmuted.
 */
- (void)userMuteAudioBlock:(void(^ _Nullable)(NSUInteger uid, BOOL muted))userMuteAudioBlock __deprecated_msg("use delegate instead.");

/** Occurs when a remote user's video stream pauses/resumes playing.

 **DEPRECATED** from v1.1.

 @see [didVideoMuted]([AgoraRtcEngineDelegate rtcEngine:didVideoMuted:byUid:])
 @param userMuteVideoBlock This block includes:

 - uid:   ID of the remote user whose video stream pauses/resumes playing:
 - muted: Whether the remote user's video pauses/resumes playing:

     - YES: Pause.
     - NO: Resume.
 */
- (void)userMuteVideoBlock:(void(^ _Nullable)(NSUInteger uid, BOOL muted))userMuteVideoBlock __deprecated_msg("use delegate instead.");

/** Reports the statistics of the uploading local video streams once every two seconds.

 **DEPRECATED** from v1.1.

 @see [localVideoStats]([AgoraRtcEngineDelegate rtcEngine:localVideoStats:])
 @param localVideoStatBlock This block includes:

 - sentBitrate:  Bitrate sent since last count.
 - sentFrameRate: Frame rate sent since last count.
 */
- (void)localVideoStatBlock:(void(^ _Nullable)(NSInteger sentBitrate, NSInteger sentFrameRate))localVideoStatBlock __deprecated_msg("use delegate instead.");

/** Reports the statistics of receiving remote video streams once every two seconds.

 **DEPRECATED** from v1.1.

  @see [remoteVideoStats]([AgoraRtcEngineDelegate rtcEngine:remoteVideoStats:])

 @param remoteVideoStatBlock This block includes:

 - uid:                   User ID of the remote user sending the video streams.
 - delay:                 Time delay (ms).
 - receivedBitrate:       Bitrate received since last count.
 - receivedFrameRate:     Frame rate received since last count.
 */
- (void)remoteVideoStatBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger delay, NSInteger receivedBitrate, NSInteger receivedFrameRate))remoteVideoStatBlock __deprecated_msg("use delegate instead.");

/** Reports the statistics of receiving remote audio streams once every two seconds.

 **DEPRECATED** from v1.1.

 @see [remoteAudioStats]([AgoraRtcEngineDelegate rtcEngine:remoteAudioStats:])

 @param remoteAudioStatBlock This block includes:

 - uid:                    User ID of the user sending the audio streams.
 - quality:                Audio receiving quality of the user
 - networkTransportDelay:  Delay in network from audio sender to receiver.
 - jitterBufferDelay:      Jitter Buffer Delay in receiver side.
 - audioLossRate:          The fraction of Audio packet lost in the report interval.
 */
- (void)remoteAudioStatBlock:(void(^ _Nullable)(NSUInteger uid, NSInteger quality, NSInteger networkTransportDelay, NSInteger jitterBufferDelay, NSInteger audioLossRate))remoteAudioStatBlock __deprecated_msg("use delegate instead.");

/** Occurs when the camera turns on and is ready to capture the video.

 **DEPRECATED** from v1.1.

 @see [rtcEngineCameraDidReady]([AgoraRtcEngineDelegate rtcEngineCameraDidReady:])
 */
- (void)cameraReadyBlock:(void(^ _Nullable)(void))cameraReadyBlock __deprecated_msg("use delegate instead.");

/** Occurs when the connection between the SDK and the server is lost.

 **DEPRECATED** from v1.1.

 @see [rtcEngineConnectionDidInterrupted]([AgoraRtcEngineDelegate rtcEngineConnectionDidInterrupted:])
 @see [rtcEngineConnectionDidLost]([AgoraRtcEngineDelegate rtcEngineConnectionDidLost:])
 */
- (void)connectionLostBlock:(void(^ _Nullable)(void))connectionLostBlock __deprecated_msg("use delegate instead.");

/** Occurs when a user rejoins the channel after disconnection due to network problems.

When the client loses connection with the server because of network problems, the SDK automatically attempts to reconnect and triggers this callback upon reconnection.

 **DEPRECATED** from v1.1.

 @see [didRejoinChannel]([AgoraRtcEngineDelegate rtcEngine:didRejoinChannel:withUid:elapsed:])
 @param rejoinChannelSuccessBlock This block includes:

 - channel: Channel name.
 - uid:     User ID.
 - elapsed: Time elapsed (ms) from starting to reconnect until this event occurs.
 */
- (void)rejoinChannelSuccessBlock:(void(^ _Nullable)(NSString * _Nonnull channel, NSUInteger uid, NSInteger elapsed))rejoinChannelSuccessBlock __deprecated_msg("use delegate instead.");

/** Reports the RtcEngine runtime statistics once every two seconds.

 **DEPRECATED** from v1.1.

 @see [reportRtcStats]([AgoraRtcEngineDelegate rtcEngine:reportRtcStats:])
 @param rtcStatsBlock RtcEngine runtime statistics. See [AgoraChannelStats](AgoraChannelStats).
 */
- (void)rtcStatsBlock:(void(^ _Nullable)(AgoraChannelStats * _Nonnull stat))rtcStatsBlock __deprecated_msg("use delegate instead.");

/** Occurs when a user leaves the channel.

 **DEPRECATED** from v1.1.

 When the app calls the [leaveChannel]([AgoraRtcEngineKit leaveChannel:]) method, the SDK uses this callback to notify the app that a user leaves the channel.

 With this callback, the app retrieves information, such as the call duration and the statistics of the data received/transmitted by [audioQualityOfUid]([AgoraRtcEngineDelegate rtcEngine:audioQualityOfUid:quality:delay:lost:]).

 @see [didLeaveChannelWithStats]([AgoraRtcEngineDelegate rtcEngine:didLeaveChannelWithStats:])
 @param leaveChannelBlock Statistics of the call. See [AgoraChannelStats](AgoraChannelStats).
 */
- (void)leaveChannelBlock:(void(^ _Nullable)(AgoraChannelStats * _Nonnull stat))leaveChannelBlock __deprecated_msg("use delegate instead.");

/** Reports the audio quality of the current call once every two seconds.

 **DEPRECATED** from v1.1.

 @see [audioQualityOfUid]([AgoraRtcEngineDelegate rtcEngine:audioQualityOfUid:quality:delay:lost:])
 @param audioQualityBlock This block includes:

 - uid:     User ID of the speaker.
 - quality: Audio quality of the user: AgoraNetworkQuality.
 - delay:   Time delay (ms).
 - lost:    Audio packet loss rate (%).
 */
- (void)audioQualityBlock:(void(^ _Nullable)(NSUInteger uid, AgoraNetworkQuality quality, NSUInteger delay, NSUInteger lost))audioQualityBlock __deprecated_msg("use delegate instead.");

/** Reports the network quality of a specified user in a communication or live broadcast channel once every two seconds.

 **DEPRECATED** from v1.1.

 @see [networkQuality]([AgoraRtcEngineDelegate rtcEngine:networkQuality:txQuality:rxQuality:])
 @param networkQualityBlock This block includes:

 - uid:       User ID. The network quality of the user with this `uid` is reported. If `uid` is 0, the local network quality is reported.
 - txQuality: The transmission quality of the user: AgoraNetworkQuality.
 - rxQuality: The receiving quality of the user: AgoraNetworkQuality.
 */
- (void)networkQualityBlock:(void(^ _Nullable)(NSUInteger uid, AgoraNetworkQuality txQuality, AgoraNetworkQuality rxQuality))networkQualityBlock __deprecated_msg("use delegate instead.");

/** Reports the last mile network quality of the local user once every two seconds before the user joins the channel.

 **DEPRECATED** from v1.1.

Last mile refers to the connection between the local device and Agora's edge server. After the app calls the [enableLastmileTest]([AgoraRtcEngineKit enableLastmileTest]) method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.

 @param lastmileQualityBlock Network quality. See [AgoraNetworkQuality](AgoraNetworkQuality).
 */
- (void)lastmileQualityBlock:(void(^ _Nullable)(AgoraNetworkQuality quality))lastmileQualityBlock __deprecated_msg("use delegate instead.");

/** Reports a media engine event.

 **DEPRECATED** from v1.1.
 */
- (void)mediaEngineEventBlock:(void(^ _Nullable)(NSInteger code))mediaEngineEventBlock __deprecated_msg("use delegate instead.");



@end
