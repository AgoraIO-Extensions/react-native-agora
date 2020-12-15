import type {
  AudioVolumeInfo,
  FacePositionInfo,
  LastmileProbeResult,
  LocalAudioStats,
  LocalVideoStats,
  Rect,
  RemoteAudioStats,
  RemoteVideoStats,
  RtcStats,
  UserInfo,
} from './Classes';
import type {
  AudioLocalError,
  AudioLocalState,
  AudioMixingErrorCode,
  AudioMixingStateCode,
  AudioOutputRouting,
  AudioRemoteState,
  AudioRemoteStateReason,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ChannelMediaRelayState,
  ClientRole,
  ConnectionChangedReason,
  ConnectionStateType,
  ErrorCode,
  InjectStreamStatus,
  LocalVideoStreamError,
  LocalVideoStreamState,
  NetworkQuality,
  NetworkType,
  RtmpStreamingErrorCode,
  RtmpStreamingEvent,
  RtmpStreamingState,
  StreamPublishState,
  StreamSubscribeState,
  UserOfflineReason,
  VideoRemoteState,
  VideoRemoteStateReason,
  WarningCode,
} from './Enums';

/**
 * @internal
 * @ignore
 */

export type Listener = (...args: any[]) => any;

/**
 * @internal
 * @ignore
 */
export interface Subscription {
  remove(): void;
}

export type EmptyCallback = () => void;
export type WarningCallback =
  /**
   * @param warn Warning code.
   */
  (warn: WarningCode) => void;
export type ErrorCallback =
  /**
   * @param err Error code.
   */
  (err: ErrorCode) => void;
export type ApiCallCallback =
  /**
   * @param error [Error Code]{@link ErrorCode} that the SDK returns when the method call fails.
   * @param api The method executed by the SDK.
   * @param result The result of the method call.
   */
  (error: ErrorCode, api: string, result: string) => void;
export type UidWithElapsedAndChannelCallback =
  /**
   * @param channel Channel name.
   * @param uid User ID.
   * @param elapsed Time elapsed (ms) from the user calling [`joinChannel`]{@link RtcEngine.joinChannel} until
   * this callback is triggered.
   */
  (channel: string, uid: number, elapsed: number) => void;
export type RtcStatsCallback =
  /**
   * @param stats Statistics of the call.
   */
  (stats: RtcStats) => void;
export type UserAccountCallback =
  /**
   * @param uid The ID of the local user.
   * @param userAccount The user account of the local user.
   */
  (uid: number, userAccount: string) => void;
export type UserInfoCallback =
  /**
   * @param uid The ID of the remote user.
   * @param userInfo The `UserInfo` object that contains the user ID and user account of the remote user.
   */
  (uid: number, userInfo: UserInfo) => void;
export type ClientRoleCallback =
  /**
   * @param oldRole Role that the user switches from.
   * @param newRole Role that the user switches to.
   */
  (oldRole: ClientRole, newRole: ClientRole) => void;
export type UidWithElapsedCallback =
  /**
   * @param uid This parameter has the following definitions in different events:
   * - [`UserJoined`]{@link RtcEngineEvents.UserJoined}: ID of the user or host who joins the channel.
   * - [`FirstRemoteAudioFrame`]{@link RtcEngineEvents.FirstRemoteAudioFrame}: User ID of the remote user.
   * - [`FirstRemoteAudioDecoded`]{@link RtcEngineEvents.FirstRemoteAudioDecoded}: User ID of the remote user sending the audio stream.
   * - [`JoinChannelSuccess`]{@link RtcChannelEvents.JoinChannelSuccess}: User ID.
   * - [`RejoinChannelSuccess`]{@link RtcChannelEvents.RejoinChannelSuccess}: User ID.
   * @param elapsed This parameter has the following definitions in different events:
   * - [`UserJoined`]{@link RtcEngineEvents.UserJoined}: Time delay (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} or [`setClientRole`]{@link RtcEngine.setClientRole}
   * until this callback is triggered.
   * - [`FirstRemoteAudioFrame`]{@link RtcEngineEvents.FirstRemoteAudioFrame}: Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this callback is triggered.
   * - [`FirstRemoteAudioDecoded`]{@link RtcEngineEvents.FirstRemoteAudioDecoded}: Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until the SDK triggers this callback.
   * - [`JoinChannelSuccess`]{@link RtcChannelEvents.JoinChannelSuccess}: Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcChannel.joinChannel} until this callback is triggered.
   * - [`RejoinChannelSuccess`]{@link RtcChannelEvents.RejoinChannelSuccess}: Time elapsed (ms) from the local user starting to reconnect until this callback is triggered.
   *
   */
  (uid: number, elapsed: number) => void;
export type UserOfflineCallback =
  /**
   * @param uid ID of the user or host who leaves the channel or goes offline.
   * @param reason Reason why the user goes offline.
   */
  (uid: number, reason: UserOfflineReason) => void;
export type ConnectionStateCallback =
  /**
   * @param state The current network connection state.
   * @param reason The reason causing the change of the connection state.
   */
  (state: ConnectionStateType, reason: ConnectionChangedReason) => void;
export type NetworkTypeCallback =
  /**
   * @param type The network type.
   */
  (type: NetworkType) => void;
export type TokenCallback =
  /**
   * @param token The token that will expire in 30 seconds.
   */
  (token: string) => void;
export type AudioVolumeCallback =
  /**
   * @param speakers An array containing the user ID and volume information for each speaker.
   *
   * In the local user’s callback, this array contains the following members:
   *  - `uid` = 0,
   *  - `volume` = `totalVolume`, which reports the sum of the voice volume and audio-mixing volume of the local user, and
   *  - `vad`, which reports the voice activity status of the local user.
   *
   * In the remote speakers' callback, this array contains the following members:
   *  - `uid` of each remote speaker,
   *  - `volume`, which reports the sum of the voice volume and audio-mixing volume of each remote speaker, and
   *  - `vad` = 0.
   *
   * An empty `speakers` array in the callback indicates that no remote user is speaking at the moment.
   *
   * @param totalVolume Total volume after audio mixing. The value ranges between 0 (lowest volume) and 255 (highest volume).
   *  - In the local user’s callback, `totalVolume` is the sum of the voice volume and audio-mixing volume of the local user.
   *  - In the remote speakers' callback, `totalVolume` is the sum of the voice volume and audio-mixing
   * volume of all remote speakers.
   */
  (speakers: AudioVolumeInfo[], totalVolume: number) => void;
export type UidCallback =
  /**
   * @param uid User ID of the active speaker. A `uid` of 0 represents the local user.
   */
  (uid: number) => void;
export type ElapsedCallback =
  /**
   * @param elapsed Time elapsed (ms) from the local user calling the [`joinChannel`]{@link RtcEngine.joinChannel} until
   * this callback is triggered.
   */
  (elapsed: number) => void;
export type VideoFrameCallback =
  /**
   * @param width Width (pixels) of the first local video frame.
   * @param height Height (pixels) of the first local video frame.
   * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this
   * callback is triggered.
   * If [`startPreview`]{@link RtcEngine.startPreview} is called before [`joinChannel`]{@link RtcEngine.joinChannel}, elapsed is the
   * time elapsed (ms) from the local user calling [`startPreview`]{@link RtcEngine.startPreview} until this callback is triggered.
   */
  (width: number, height: number, elapsed: number) => void;
export type UidWithMutedCallback =
  /**
   * @param uid ID of the remote user.
   * @param muted Whether the remote user's video stream playback pauses/resumes:
   *
   *  - `true`: Pause.
   *  - `false`: Resume.
   */
  (uid: number, muted: boolean) => void;
export type VideoSizeCallback =
  /**
   * @param uid User ID of the remote user or local user (0) whose video size or rotation changes.
   * @param width New width (pixels) of the video.
   * @param height New height (pixels) of the video.
   * @param rotation New rotation of the video [0 to 360).
   */
  (uid: number, width: number, height: number, rotation: number) => void;
export type RemoteVideoStateCallback =
  /**
   * @param uid ID of the remote user whose video state changes.
   * @param state State of the remote video.
   * @param reason The reason of the remote video state change.
   * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until the SDK
   * triggers this callback.
   */
  (
    uid: number,
    state: VideoRemoteState,
    reason: VideoRemoteStateReason,
    elapsed: number
  ) => void;
export type LocalVideoStateCallback =
  /**
   * @param localVideoState The local video state.
   * @param error The detailed error information of the local video.
   */
  (
    localVideoState: LocalVideoStreamState,
    error: LocalVideoStreamError
  ) => void;
export type RemoteAudioStateCallback =
  /**
   * @param uid ID of the user whose audio state changes.
   * @param state State of the remote audio.
   * @param reason The reason of the remote audio state change.
   * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until the
   * SDK triggers this callback.
   */
  (
    uid: number,
    state: AudioRemoteState,
    reason: AudioRemoteStateReason,
    elapsed: number
  ) => void;
export type LocalAudioStateCallback =
  /**
   * @param state State of the local audio.
   * @param error The error information of the local audio.
   */
  (state: AudioLocalState, error: AudioLocalError) => void;
export type FallbackCallback =
  /**
   * @param isFallbackOrRecover Whether the published stream fell back to audio-only or switched back to the video:
   *
   *  - `true`: The published stream fell back to audio-only due to poor network conditions.
   *  - `false`: The published stream switched back to the video after the network conditions improved.
   */
  (isFallbackOrRecover: boolean) => void;
export type FallbackWithUidCallback =
  /**
   * @param uid ID of the remote user sending the stream.
   * @param isFallbackOrRecover Whether the remote media stream fell back to audio-only or
   * switched back to the video:
   *
   *  - `true`: The remote media stream fell back to audio-only due to poor network conditions.
   *  - `false`: The remote media stream switched back to the video stream after the network conditions improved.
   */
  (uid: number, isFallbackOrRecover: boolean) => void;
export type AudioRouteCallback =
  /**
   * @param routing Audio output routing.
   */
  (routing: AudioOutputRouting) => void;
export type RectCallback =
  /**
   * @param rect Rectangular area in the camera zoom specifying the focus area.
   */

  (rect: Rect) => void;
export type NetworkQualityCallback =
  /**
   * @param quality The last mile network quality based on the uplink and downlink packet loss rate and jitter.
   */
  (quality: NetworkQuality) => void;
export type NetworkQualityWithUidCallback =
  /**
   * @param uid User ID. The network quality of the user with this uid is reported.
   * @param txQuality Uplink transmission quality of the user in terms of the transmission bitrate, packet loss rate, average RTT (Round-Trip Time)
   * and jitter of the uplink network. `txQuality` is a quality rating helping you understand how well the current uplink
   * network conditions can support the selected VideoEncoderConfiguration.
   * For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution
   * of 680 × 480 and a frame rate of 30 fps, but may be inadequate for resolutions higher than 1280 × 720.
   * @param rxQuality Downlink network quality rating of the user in terms of packet loss rate, average RTT, and
   * jitter of the downlink network.
   */
  (uid: number, txQuality: NetworkQuality, rxQuality: NetworkQuality) => void;
export type LastmileProbeCallback =
  /**
   * @param result The uplink and downlink last-mile network probe test result.
   */
  (result: LastmileProbeResult) => void;
export type LocalVideoStatsCallback =
  /**
   * @param stats The statistics of the local video stream.
   */
  (stats: LocalVideoStats) => void;
export type LocalAudioStatsCallback =
  /**
   * @param stats The statistics of the local audio stream.
   */
  (stats: LocalAudioStats) => void;
export type RemoteVideoStatsCallback =
  /**
   * @param stats Statistics of the received remote video streams.
   */
  (stats: RemoteVideoStats) => void;
export type RemoteAudioStatsCallback =
  /**
   * @param stats Statistics of the received remote audio streams.
   */
  (stats: RemoteAudioStats) => void;
export type AudioMixingStateCallback =
  /**
   * @param state The state code.
   * @param errorCode The error code.
   */
  (state: AudioMixingStateCode, errorCode: AudioMixingErrorCode) => void;
export type SoundIdCallback =
  /**
   * @param soundId ID of the local audio effect. Each local audio effect has a unique ID.
   */
  (soundId: number) => void;
export type RtmpStreamingStateCallback =
  /**
   * @param url The RTMP URL address.
   * @param state The RTMP streaming state.
   * @param errCode The detailed error information for streaming.
   */
  (
    url: string,
    state: RtmpStreamingState,
    errCode: RtmpStreamingErrorCode
  ) => void;
export type StreamInjectedStatusCallback =
  /**
   * @param url The URL address of the externally injected stream.
   * @param uid User ID.
   * @param status State of the externally injected stream.
   */
  (url: string, uid: number, status: InjectStreamStatus) => void;
export type StreamMessageCallback =
  /**
   * @param uid User ID of the remote user sending the data stream.
   * @param streamId Stream ID.
   * @param data Data received by the local user.
   */
  (uid: number, streamId: number, data: string) => void;
export type StreamMessageErrorCallback =
  /**
   * @param uid User ID of the remote user sending the data stream.
   * @param streamId Stream ID.
   * @param error Error code.
   * @param missed The number of lost messages.
   * @param cached The number of incoming cached messages when the data stream is interrupted.
   */
  (
    uid: number,
    streamId: number,
    error: ErrorCode,
    missed: number,
    cached: number
  ) => void;
export type MediaRelayStateCallback =
  /**
   * @param state The state code.
   * @param code The error code.
   */
  (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void;
export type MediaRelayEventCallback =
  /**
   * @param code The event code for media stream relay.
   */
  (code: ChannelMediaRelayEvent) => void;
export type VideoFrameWithUidCallback =
  /**
   * @param uid User ID of the remote user sending the video streams.
   * @param width Width (pixels) of the video stream.
   * @param height Height (pixels) of the video stream.
   * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this
   * callback is triggered.
   */
  (uid: number, width: number, height: number, elapsed: number) => void;
export type UrlWithErrorCallback =
  /**
   * @param url The RTMP streaming URL.
   * @param error The detailed error information.
   */
  (url: string, error: ErrorCode) => void;
export type UrlCallback =
  /**
   * @param url The RTMP URL address.
   */
  (url: string) => void;
export type TransportStatsCallback =
  /**
   * @param uid User ID of the remote user sending the audio packet/video packet.
   * @param delay Network time delay (ms) from the remote user sending the audio packet/video packet to the local user.
   * @param lost Packet loss rate (%) of the audio packet/video packet sent from the remote user.
   * @param rxKBitRate Received bitrate (Kbps) of the audio packet/video packet sent from the remote user.
   */
  (uid: number, delay: number, lost: number, rxKBitRate: number) => void;
export type UidWithEnabledCallback =
  /**
   * @param uid User ID of the remote user.
   * @param enabled Whether the specific remote user enables/disables the video module:
   *
   *  - `true`: Enabled. The remote user can enter a video session.
   *  - `false`: Disabled. The remote user can only enter a voice session, and cannot send or receive
   * any video stream.
   */
  (uid: number, enabled: boolean) => void;
export type EnabledCallback =
  /**
   * @param enabled Whether the microphone is enabled/disabled:
   *  - `true`: Enabled.
   *  - `false`: Disabled.
   */
  (enabled: boolean) => void;
export type AudioQualityCallback =
  /**
   * @param uid User ID of the speaker.
   * @param quality Audio quality of the user.
   * @param delay Time delay (ms) of the audio packet from the sender to the receiver, including the time delay
   * from audio sampling pre-processing, transmission, and the jitter buffer.
   * @param lost Packet loss rate (%) of the audio packet sent from the sender to the receiver.
   */
  (uid: number, quality: number, delay: number, lost: number) => void;
export type MetadataCallback =
  /**
   * @param buffer The received metadata.
   * @param uid The ID of the user who sent the metadata.
   * @param timeStampMs The timestamp (ms) of the received metadata.
   */
  (buffer: string, uid: number, timeStampMs: number) => void;
export type FacePositionCallback =
  /**
   * @param imageWidth The width (px) of the local video.
   * @param imageHeight The height (px) of the local video.
   * @param faces The information of the detected human face. For details, see [`FacePositionInfo`]{@link FacePositionInfo}.
   * The number of the `FacePositionInfo` array depends on the number of human faces detected.
   * If the array length is 0, it means that no human face is detected.
   */
  (imageWidth: number, imageHeight: number, faces: FacePositionInfo[]) => void;
export type StreamPublishStateCallback =
  /**
   * @param channel The channel name.
   * @param oldState The previous publishing state. See [`StreamPublishState`]{@link StreamPublishState}.
   * @param newState The current publishing state. See [`StreamPublishState`]{@link StreamPublishState}.
   * @param elapseSinceLastState The time elapsed (ms) from the previous state to the current state.
   */
  (
    channel: string,
    oldState: StreamPublishState,
    newState: StreamPublishState,
    elapseSinceLastState: number
  ) => void;
export type StreamSubscribeStateCallback =
  /**
   * @param channel The channel name.
   * @param uid The ID of the remote user whose subscribe state changes.
   * @param oldState The previous publishing state. See [`StreamPublishState`]{@link StreamPublishState}.
   * @param newState The current publishing state. See [`StreamPublishState`]{@link StreamPublishState}.
   * @param elapseSinceLastState The time elapsed (ms) from the previous state to the current state.
   */
  (
    channel: string,
    uid: number,
    oldState: StreamSubscribeState,
    newState: StreamSubscribeState,
    elapseSinceLastState: number
  ) => void;
export type RtmpStreamingEventCallback =
  /**
   * @param url The RTMP streaming URL.
   * @param eventCode The event code. See [`RtmpStreamingEvent`]{@link RtmpStreamingEvent}.
   */
  (url: string, eventCode: RtmpStreamingEvent) => void;

/**
 * Callbacks.
 *
 * The SDK uses the [`RtcEngineEvents`]{@link RtcEngineEvents} interface class to send callbacks to the application, and the application inherits the methods of this interface class to retrieve these callbacks.
 * All methods in this interface class have their (empty) default implementations, and the application can inherit only some of the required events instead of all of them.
 * In the callbacks, the application should avoid time-consuming tasks or call blocking APIs (such as SendMessage), otherwise, the SDK may not work properly.
 */
export interface RtcEngineEvents {
  /**
   * Reports a warning during SDK runtime.
   *
   * In most cases, the app can ignore the warning reported by the SDK because the SDK can usually fix the issue and resume running.
   *
   * For instance, the SDK may report a [`LookupChannelTimeout`]{@link WarningCode.LookupChannelTimeout} warning upon disconnection with the server and tries to reconnect. For detailed warning codes, see [`WarningCode`]{@link WarningCode}.
   *
   * @event Warning
   */
  Warning: WarningCallback;

  /**
   * Reports an error during SDK runtime.
   *
   * In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
   *
   * For example, the SDK reports a [`StartCall`]{@link ErrorCode.StartCall} error when failing to initialize a call. The app informs the user that the call initialization failed and invokes the [`leaveChannel`]{@link RtcEngine.leaveChannel} method to leave the channel. For detailed error codes, see {@link ErrorCode}.
   *
   * @event Error
   */
  Error: ErrorCallback;

  /**
   * Occurs when an API method is executed.
   *
   * @event ApiCallExecuted
   */
  ApiCallExecuted: ApiCallCallback;

  /**
   * Occurs when the local user joins a specified channel.
   *
   * The channel name assignment is based on channelName specified in the joinChannel method.
   *
   * If the uid is not specified when [`joinChannel`]{@link RtcEngine.joinChannel} is called, the server automatically assigns a uid.
   *
   * @event JoinChannelSuccess
   */
  JoinChannelSuccess: UidWithElapsedAndChannelCallback;

  /**
   * Occurs when a user rejoins the channel after being disconnected due to network problems.
   *
   * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
   *
   * @event RejoinChannelSuccess
   */
  RejoinChannelSuccess: UidWithElapsedAndChannelCallback;

  /**
   * Occurs when a user leaves the channel.
   *
   * When the app calls the [`leaveChannel`]{@link RtcEngine.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
   *
   * With this callback, the application retrieves the channel information, such as the call duration and statistics.
   *
   * @event LeaveChannel
   */
  LeaveChannel: RtcStatsCallback;

  /**
   * Occurs when the local user registers a user account.
   *
   * This callback is triggered when the local user successfully registers a user account by calling [`registerLocalUserAccount`]{@link RtcEngine.registerLocalUserAccount}, or joins a channel by calling [`joinChannelWithUserAccount`]{@link RtcEngine.joinChannelWithUserAccount}.
   * This callback reports the user ID and user account of the local user.
   *
   * @event LocalUserRegistered
   */
  LocalUserRegistered: UserAccountCallback;

  /**
   * Occurs when the SDK gets the user ID and user account of the remote user.
   *
   * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers this callback on the local client.
   *
   * @event UserInfoUpdated
   */
  UserInfoUpdated: UserInfoCallback;

  /**
   * Occurs when the user role switches in live interactive streaming. For example, from a host to an audience or vice versa.
   *
   * The SDK triggers this callback when the local user switches the user role by calling [`setClientRole`]{@link RtcEngine.setClientRole} after joining the channel.
   *
   * @event ClientRoleChanged
   */
  ClientRoleChanged: ClientRoleCallback;

  /**
   * Occurs when a remote user ([`Communication`]{@link ChannelProfile.Communication})/host ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}) joins the channel.
   * - [`Communication`]{@link ChannelProfile.Communication} profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
   * - [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel.
   *
   * The SDK triggers this callback under one of the following circumstances:
   * - A remote user/host joins the channel by calling [`joinChannel`]{@link RtcEngine.joinChannel}.
   * - A remote user switches the user role to the host by calling [`setClientRole`]{@link RtcEngine.setClientRole} after joining the channel.
   * - A remote user/host rejoins the channel after a network interruption.
   * - The host injects an online media stream into the channel by calling [`addInjectStreamUrl`]{@link RtcEngine.addInjectStreamUrl}.
   *
   * **Note**
   * In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile:
   *  - The host receives the [`UserJoined`]{@link UserJoined} callback when another host joins the channel.
   *  - The audience in the channel receives the [`UserJoined`]{@link UserJoined} callback when a new host joins the channel.
   *  - When a web application joins the channel, the [`UserJoined`]{@link UserJoined} callback is triggered as long as the web application publishes streams.
   *
   * @event UserJoined
   */
  UserJoined: UidWithElapsedCallback;

  /**
   * Occurs when a remote user ([`Communication`]{@link ChannelProfile.Communication})/host ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}) leaves the channel.
   *
   * There are two reasons for users to become offline:
   * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
   * - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the [`Communication`]{@link ChannelProfile.Communication} profile, and more for the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
   *
   * @event UserOffline
   */
  UserOffline: UserOfflineCallback;

  /**
   * Occurs when the network connection state changes.
   *
   * The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason to such change.
   *
   * @event ConnectionStateChanged
   */
  ConnectionStateChanged: ConnectionStateCallback;

  /**
   * Occurs when the network type changes.
   *
   * The SDK returns the current network type in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
   *
   * @event NetworkTypeChanged
   */
  NetworkTypeChanged: NetworkTypeCallback;

  /**
   * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
   *
   * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling [`joinChannel`]{@link RtcEngine.joinChannel}, regardless of whether it is in the channel or not.
   *
   * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
   *
   * @event ConnectionLost
   */
  ConnectionLost: EmptyCallback;

  /**
   * Occurs when the token expires in 30 seconds.
   *
   * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call [`renewToken`]{@link RtcEngine.renewToken} to pass the new token to the SDK.
   *
   * @event TokenPrivilegeWillExpire
   */
  TokenPrivilegeWillExpire: TokenCallback;

  /**
   * Occurs when the token has expired.
   *
   * After a token is specified when joining the channel, the token expires after a certain period of time,
   * and a new token is required to reconnect to the server. This callback notifies the app to generate a
   * new token and call [`joinChannel`]{@link RtcEngine.joinChannel} to rejoin the channel with the new token.
   *
   * @event RequestToken
   */
  RequestToken: EmptyCallback;

  /**
   * Reports which users are speaking and the speakers' volume, and whether the local user is speaking.
   *
   * This callback reports the IDs and volumes of the loudest speakers (at most 3) at the moment in the channel, and whether the local user is speaking.
   *
   * By default, this callback is disabled. You can enable it by calling [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}. Once enabled, this callback is triggered at the set interval, regardless of whether a user speaks or not.
   *
   * The SDK triggers two independent `AudioVolumeIndication` callbacks at one time, which separately report the volume information of the local user and all the remote speakers. For more information, see the detailed parameter descriptions.
   *
   * **Note**
   * - To enable the voice activity detection of the local user, ensure that you set `report_vad(true)` in the [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} method.
   * - Calling [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} affects the SDK's behavior.
   *  - If the local user calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}, the SDK stops triggering the local user's callback.
   *  - 20 seconds after a remote speaker calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}, the remote speakers' callback does not include information of this remote user; 20 seconds after all remote users call the the [`muteLocalAudioStream`]{@link muteLocalAudioStream} method, the SDK stops triggering the remote speakers' callback.
   *
   * @event AudioVolumeIndication
   */
  AudioVolumeIndication: AudioVolumeCallback;

  /**
   * Reports which user is the loudest speaker.
   *
   * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by
   * calling [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
   *
   * **Note**
   * - To receive this callback, you need to call [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}.
   * - This callback returns the user ID of the user with the highest voice volume during a period of time, instead of at the moment.
   *
   * @event ActiveSpeaker
   */
  ActiveSpeaker: UidCallback;

  /**
   * Occurs when the first local audio frame is sent.
   *
   * @deprecated Deprecated as of v3.1.2. Use [`FirstLocalAudioFramePublished`]{@link RtcEngineEvents.FirstLocalAudioFramePublished} instead.
   *
   * @event FirstLocalAudioFrame
   */
  FirstLocalAudioFrame: ElapsedCallback;

  /**
   * Occurs when the first local video frame is rendered.
   *
   * This callback is triggered after the first local video frame is rendered on the local video window.
   *
   * @event FirstLocalVideoFrame
   */
  FirstLocalVideoFrame: VideoFrameCallback;

  /**
   * Occurs when a remote user stops/resumes sending the video stream.
   *
   * @deprecated
   *
   * This callback is deprecated. Use the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters for the same function:
   * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
   * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
   *
   * The SDK triggers this callback when the remote user stops or resumes sending the video stream by calling the [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream} method.
   *
   * **Note**
   *
   * This callback is invalid when the number of users or hosts in the channel exceeds 17.
   *
   * @event UserMuteVideo
   */
  UserMuteVideo: UidWithMutedCallback;

  /**
   * Occurs when the video size or rotation information of a remote user changes.
   *
   * @event VideoSizeChanged
   */
  VideoSizeChanged: VideoSizeCallback;

  /**
   * Occurs when the remote video state changes.
   *
   * @event RemoteVideoStateChanged
   */
  RemoteVideoStateChanged: RemoteVideoStateCallback;

  /**
   * Occurs when the local video state changes.
   *
   * The SDK returns the current video state in this callback.
   * This callback indicates the state of the local video stream, including camera capturing and video encoding, and allows you to troubleshoot issues when exceptions occur.
   * When the state is [`Failed`]{@link LocalVideoStreamState.Failed}, see the error parameter for details.
   *
   * @event LocalVideoStateChanged
   */
  LocalVideoStateChanged: LocalVideoStateCallback;

  /**
   * Occurs when the remote audio state changes.
   *
   * This callback indicates the state change of the remote audio stream.
   *
   * **Note**
   *
   * This callback does not work properly when the number of users (in the [`Communication`] profile) or hosts (in the [`LiveBroadcasting`] profile) in the channel exceeds 17.
   *
   * @event RemoteAudioStateChanged
   */
  RemoteAudioStateChanged: RemoteAudioStateCallback;

  /**
   * Occurs when the local audio stream state changes.
   *
   * This callback indicates the state change of the local audio stream, including the state of the audio recording and encoding, and allows you to troubleshoot issues when exceptions occur.
   *
   * **Note**
   *
   * When the state is [`Failed`]{@link AudioLocalState.Failed}, see the error parameter for details.
   *
   * @event LocalAudioStateChanged
   */
  LocalAudioStateChanged: LocalAudioStateCallback;

  /**
   * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions
   * or switches back to video stream after the network conditions improve.
   *
   * If you call [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly},
   * this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions,
   * or when the audio stream switches back to the video after the uplink network condition improves. Once the published stream falls back to audio only,
   * the remote app receives the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback.
   *
   * @event LocalPublishFallbackToAudioOnly
   */
  LocalPublishFallbackToAudioOnly: FallbackCallback;

  /**
   * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
   *
   * If you call [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} and set
   * option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly},
   * this callback is triggered when the remotely subscribed media stream falls back to audio-only mode due
   * to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after
   * the uplink network condition improves.
   *
   * @event RemoteSubscribeFallbackToAudioOnly
   */
  RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback;

  /**
   * Occurs when the local audio playback route changes.
   *
   * This callback returns that the audio route switched to an earpiece, speakerphone, headset, or Bluetooth device.
   *
   * The definition of the routing is listed in [`AudioOutputRouting`]{@link AudioOutputRouting}.
   *
   * @event AudioRouteChanged
   */
  AudioRouteChanged: AudioRouteCallback;

  /**
   * Occurs when the camera focus area is changed.
   *
   * The SDK triggers this callback when the local user changes the camera focus position by
   * calling [`setCameraFocusPositionInPreview`]{@link RtcEngine.setCameraFocusPositionInPreview}.
   *
   * @event CameraFocusAreaChanged
   */
  CameraFocusAreaChanged: RectCallback;

  /**
   * The camera exposure area has changed.
   *
   * The SDK triggers this callback when the local user changes the camera exposure position by calling [`setCameraExposurePosition`]{@link RtcEngine.setCameraExposurePosition}.
   *
   * @event CameraExposureAreaChanged
   */
  CameraExposureAreaChanged: RectCallback;

  /**
   * Reports the face detection result of the local user.
   *
   * Once you enable face detection by calling [`enableFaceDetection`]{@link RtcEngine.enableFaceDetection}, you can get the following information on the local user in real-time:
   * - The width and height of the local video.
   * - The position of the human face in the local video.
   * - The distance between the human face and the device screen. This value is based on the fitting calculation of the local video size and the position of the human face.
   *
   * **Note**
   * - If the SDK does not detect a face, it reduces the frequency of this callback to reduce power consumption on the local device.
   * - The SDK stops triggering this callback when a human face is in close proximity to the screen.
   * - On Android, the distance value reported in this callback may be slightly different from the actual distance. Therefore, Agora does not recommend using it for accurate calculation.
   *
   * @event FacePositionChanged
   */
  FacePositionChanged: FacePositionCallback;

  /**
   * Reports the statistics of the [`RtcEngine`]{@link RtcEngine} once every two seconds.
   *
   * @event RtcStats
   */
  RtcStats: RtcStatsCallback;

  /**
   * Reports the last mile network quality of the local user once every two seconds before the user joins the channel.
   * Last mile refers to the connection between the local device and Agora's edge server. After the application calls the [`enableLastmileTest`]{@link RtcEngine.enableLastmileTest} method,
   * this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.
   *
   * @event LastmileQuality
   */
  LastmileQuality: NetworkQualityCallback;

  /**
   * Reports the last mile network quality of each user in the channel once every two seconds.
   *
   * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
   *
   * @event NetworkQuality
   */
  NetworkQuality: NetworkQualityWithUidCallback;

  /**
   * Reports the last-mile network probe result.
   *
   * The SDK triggers this callback within 30 seconds after the app calls [`startLastmileProbeTest`]{@link RtcEngine.startLastmileProbeTest}.
   *
   * @event LastmileProbeResult
   */
  LastmileProbeResult: LastmileProbeCallback;

  /**
   * Reports the statistics of the local video streams.
   *
   * The SDK triggers this callback once every two seconds for each user/host. If there are multiple users/hosts in the channel, the SDK triggers this callback as many times.
   *
   * @event LocalVideoStats
   */
  LocalVideoStats: LocalVideoStatsCallback;

  /**
   * Reports the statistics of the local audio stream.
   *
   * @event LocalAudioStats
   */
  LocalAudioStats: LocalAudioStatsCallback;

  /**
   * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
   *
   * @event RemoteVideoStats
   */
  RemoteVideoStats: RemoteVideoStatsCallback;

  /**
   * Reports the statistics of the audio stream from each remote user/host.
   *
   * The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
   *
   * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
   *
   * @event RemoteAudioStats
   */
  RemoteAudioStats: RemoteAudioStatsCallback;

  /**
   * Occurs when the audio mixing file playback finishes.
   *
   * @deprecated
   *
   * This callback is deprecated.
   * Use [`AudioMixingStateChanged`]{@link AudioMixingStateChanged} instead.
   *
   * You can start an audio mixing file playback by calling [`startAudioMixing`]{@link RtcEngine.startAudioMixing}. This callback is triggered when the audio mixing file playback finishes.
   *
   * If the [`startAudioMixing`]{@link RtcEngine.startAudioMixing} method call fails, an [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError} warning returns in the [`Warning`]{@link Warning} callback.
   *
   * @event AudioMixingFinished
   */
  AudioMixingFinished: EmptyCallback;

  /**
   * Occurs when the state of the local user's audio mixing file changes.
   *
   * When you call [`startAudioMixing`]{@link RtcEngine.startAudioMixing} and the state of audio mixing file changes, the Agora SDK triggers this callback.
   * - When the audio mixing file plays, pauses playing, or stops playing, this callback returns `710`, `711`, or `713` in state, and `0` in errorCode.
   * - When exceptions occur during playback, this callback returns `714` in state and an error in errorCode.
   * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError}.
   *
   * @event AudioMixingStateChanged
   */
  AudioMixingStateChanged: AudioMixingStateCallback;

  /**
   * Occurs when the audio effect file playback finishes.
   *
   * You can start a local audio effect playback by calling [`playEffect`]{@link RtcEngine.playEffect}. This callback is triggered when the local audio effect file playback finishes.
   *
   * @event AudioEffectFinished
   */
  AudioEffectFinished: SoundIdCallback;

  /**
   * Occurs when the state of the RTMP streaming changes.
   *
   * The SDK triggers this callback to report the result of the local user calling [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} or [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
   * This callback returns the URL and its current streaming state. When the streaming state is [`Failure`]{@link RtmpStreamingState.Failure}, see the errCode parameter for details.
   *
   * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the `errCode` parameter.
   *
   * @event RtmpStreamingStateChanged
   */
  RtmpStreamingStateChanged: RtmpStreamingStateCallback;

  /**
   * Occurs when the publisher's transcoding settings are updated.
   *
   * When the `LiveTranscoding` class in the [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} method updates, the SDK triggers this callback to report the update information.
   *
   * **Note**
   * - If you call [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} to set the `LiveTranscoding` class for the first time, the SDK does not trigger this callback.
   *
   * @event TranscodingUpdated
   */
  TranscodingUpdated: EmptyCallback;

  /**
   * Reports the status of injecting the online media stream.
   *
   * @event StreamInjectedStatus
   */
  StreamInjectedStatus: StreamInjectedStatusCallback;

  /**
   * Occurs when the local user receives a remote data stream.
   *
   * The SDK triggers this callback when the local user receives the stream message that the remote user sends
   * by calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
   *
   * @event StreamMessage
   */
  StreamMessage: StreamMessageCallback;

  /**
   * Occurs when the local user fails to receive a remote data stream.
   *
   * The SDK triggers this callback when the local user fails to receive the stream message that the remote
   * user sends by calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
   *
   * @event StreamMessageError
   */
  StreamMessageError: StreamMessageErrorCallback;

  /**
   * Occurs when the media engine is loaded.
   *
   * @event MediaEngineLoadSuccess
   */
  MediaEngineLoadSuccess: EmptyCallback;

  /**
   * Occurs when the media engine starts.
   *
   * @event MediaEngineStartCallSuccess
   */
  MediaEngineStartCallSuccess: EmptyCallback;

  /**
   * Occurs when the state of the media stream relay changes.
   *
   * The SDK reports the state of the current media relay and possible error messages in this callback.
   *
   * @event ChannelMediaRelayStateChanged
   */
  ChannelMediaRelayStateChanged: MediaRelayStateCallback;

  /**
   * Reports events during the media stream relay.
   *
   * @event ChannelMediaRelayEvent
   */
  ChannelMediaRelayEvent: MediaRelayEventCallback;

  /**
   * Occurs when the first remote video frame is rendered.
   *
   * @deprecated
   *
   * Use [`Starting`]{@link VideoRemoteState.Starting} or [`Decoding`]{@link VideoRemoteState.Decoding} in the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback instead.
   *
   * This callback is triggered after the first frame of the remote video is rendered on the video window. The application can retrieve the data of the time elapsed from the user joining the channel until the first video frame is displayed.
   *
   * @event FirstRemoteVideoFrame
   */
  FirstRemoteVideoFrame: VideoFrameWithUidCallback;

  /**
   * Occurs when the first remote audio frame is received.
   *
   * @deprecated
   *
   * Use [`Starting`]{@link AudioRemoteState.Starting} in [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} instead.
   *
   * @event FirstRemoteAudioFrame
   */
  FirstRemoteAudioFrame: UidWithElapsedCallback;

  /**
   * Occurs when the engine receives the first audio frame from a specified remote user.
   *
   * @deprecated
   *
   * Use [`Decoding`]{@link VideoRemoteState.Decoding} in [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} instead.
   *
   * This callback is triggered in either of the following scenarios:
   * - The remote user joins the channel and sends the audio stream.
   * - The remote user stops sending the audio stream and re-sends it after 15 seconds. Possible reasons include:
   *  - The remote user leaves channel.
   *  - The remote user drops offline.
   *  - The remote user calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}.
   *  - The remote user calls [`disableAudio`]{@link RtcEngine.disableAudio}.
   *
   * @event FirstRemoteAudioDecoded
   */
  FirstRemoteAudioDecoded: UidWithElapsedCallback;

  /**
   * Occurs when a remote user stops/resumes sending the audio stream.
   *
   * @deprecated
   * Use the [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} callback with the following parameters instead:
   * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
   * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
   *
   * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} method.
   *
   * **Note**
   *
   * This callback is invalid when the number of users or hosts in the channel exceeds 17.
   *
   * @event UserMuteAudio
   */
  UserMuteAudio: UidWithMutedCallback;

  /**
   * Reports the result of calling [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl}.
   *
   * @deprecated
   *
   * Use [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged} instead.
   *
   * This callback indicates whether you have successfully added an RTMP stream to the CDN.
   *
   * @event StreamPublished
   */
  StreamPublished: UrlWithErrorCallback;

  /**
   * Reports the result of calling [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
   *
   * @deprecated
   *
   * Use [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged} instead.
   *
   * This callback indicates whether you have successfully removed an RTMP stream from the CDN.
   *
   * @event StreamUnpublished
   */
  StreamUnpublished: UrlCallback;

  /**
   * Reports the transport-layer statistics of each remote audio stream.
   *
   * @deprecated
   *
   * This callback is deprecated. Use [`RemoteAudioStats`]{@link RemoteAudioStats} instead.
   *
   * This callback reports the transport-layer statistics, such as the packet loss rate and time delay,
   * once every two seconds after the local user receives an audio packet from a remote user.
   *
   * @event RemoteAudioTransportStats
   */
  RemoteAudioTransportStats: TransportStatsCallback;

  /**
   * Reports the transport-layer statistics of each remote video stream.
   *
   * @deprecated
   *
   * This callback is deprecated. Use [`RemoteVideoStats`]{@link RemoteVideoStats} instead.
   *
   * This callback reports the transport-layer statistics, such as the packet loss rate and time delay,
   * once every two seconds after the local user receives the video packet from a remote user.
   *
   * @event RemoteVideoTransportStats
   */
  RemoteVideoTransportStats: TransportStatsCallback;

  /**
   * Occurs when a remote user enables/disables the video module.
   *
   * @deprecated
   * This callback is deprecated and replaced by the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters:
   * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
   * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
   *
   * Once the video module is disabled, the remote user can only use a voice call. The remote user cannot send or receive any video from other users.
   *
   * The SDK triggers this callback when the remote user enables or disables the video module by calling the [`enableVideo`]{@link RtcEngine.enableVideo} or [`disableVideo`]{@link RtcEngine.disableVideo} method.
   *
   * **Note**
   *
   * This callback is invalid when the number of users or hosts in the channel exceeds 17.
   *
   * @event UserEnableVideo
   */
  UserEnableVideo: UidWithEnabledCallback;

  /**
   * Occurs when a remote user enables/disables the local video capture function.
   *
   * @deprecated
   *
   * This callback is deprecated and replaced by the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters:
   * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
   * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
   *
   * The SDK triggers this callback when the remote user resumes or stops capturing the video stream by
   * calling [`enableLocalVideo`]{@link RtcEngine.enableLocalVideo}.
   *
   * This callback is only applicable to the scenario when the remote user only wants to watch the remote video without sending any video stream to the other user.
   *
   * @event UserEnableLocalVideo
   */
  UserEnableLocalVideo: UidWithEnabledCallback;

  /**
   * Occurs when the first remote video frame is received and decoded.
   *
   * @deprecated
   *
   * This callback is deprecated. Use [`Starting`]{@link VideoRemoteState.Starting} or [`Decoding`]{@link VideoRemoteState.Decoding} in the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback instead.
   *
   * This callback is triggered in either of the following scenarios:
   * - The remote user joins the channel and sends the video stream.
   * - The remote user stops sending the video stream and re-sends it after 15 seconds. Possible reasons include:
   *  - The remote user leaves channel.
   *  - The remote user drops offline.
   *  - The remote user calls [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream}.
   *  - The remote user calls [`disableVideo`]{@link RtcEngine.disableVideo}.
   *
   * @event FirstRemoteVideoDecoded
   */
  FirstRemoteVideoDecoded: VideoFrameWithUidCallback;

  /**
   * Occurs when the microphone is enabled/disabled.
   *
   * @deprecated
   *
   * This callback is deprecated. Use [`Stopped`]{@link AudioLocalState.Stopped} or [`Recording`]{@link AudioLocalState.Recording} in the [`LocalAudioStateChanged`]{@link LocalAudioStateChanged} callback instead.
   *
   * The SDK triggers this callback when the local user resumes or stops capturing the local audio stream by calling [`enableLocalAudio`]{@link RtcEngine.enableLocalAudio}.
   *
   * @event MicrophoneEnabled
   */
  MicrophoneEnabled: EnabledCallback;

  /**
   * Occurs when the connection between the SDK and the server is interrupted.
   *
   * @deprecated
   *
   * Use {@link ConnectionStateChanged} instead.
   *
   * The SDK triggers this callback when it loses connection to the server for more than four seconds after
   * the connection is established. After triggering this callback, the SDK tries to reconnect to the server.
   * You can use this callback to implement pop-up reminders. This callback is different from [`ConnectionLost`]{@link ConnectionLost}:
   * - The SDK triggers the [`ConnectionInterrupted`]{@link ConnectionInterrupted} callback when the SDK loses
   * connection with the server for more than four seconds after it joins the channel.
   * - The SDK triggers the [`ConnectionLost`]{@link ConnectionLost} callback when it loses connection with
   * the server for more than 10 seconds, regardless of whether it joins the channel or not.
   *
   * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
   *
   * @event ConnectionInterrupted
   */
  ConnectionInterrupted: EmptyCallback;

  /**
   * Occurs when your connection is banned by the Agora Server.
   *
   * @deprecated
   *
   * Use [`ConnectionStateChanged`]{@link ConnectionStateChanged} instead.
   *
   * @event ConnectionBanned
   */
  ConnectionBanned: EmptyCallback;

  /**
   * Reports the statistics of the audio stream from each remote user/host.
   *
   * @deprecated
   *
   * Use [`RemoteAudioStats`]{@link RemoteAudioStats} instead.
   *
   * The SDK triggers this callback once every two seconds to report the audio quality of each remote user/host sending an audio stream. If a channel has multiple remote users/hosts sending audio streams, the SDK trggers this callback as many times.
   *
   * @event AudioQuality
   */
  AudioQuality: AudioQualityCallback;

  /**
   * Occurs when the camera is turned on and ready to capture video.
   *
   * @deprecated
   *
   * Use [`Capturing`]{@link LocalVideoStreamState.Capturing} in the [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} callback instead.
   * If the camera fails to turn on, fix the error reported in the [`Error`]{@link Error} callback.
   *
   * @event CameraReady
   */
  CameraReady: EmptyCallback;

  /**
   * Occurs when the video stops playing.
   *
   * @deprecated
   *
   * Use [`Stopped`]{@link LocalVideoStreamState.Stopped} in the [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} callback instead.
   * The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view)
   * after the video stops playing.
   *
   * @event VideoStopped
   */
  VideoStopped: EmptyCallback;

  /**
   * Occurs when the local user receives the metadata.
   *
   * @event MetadataReceived
   */
  MetadataReceived: MetadataCallback;

  /**
   * Occurs when the first audio frame is published.
   *
   * @since v3.1.2.
   *
   * The SDK triggers this callback under one of the following circumstances:
   * - The local client enables the audio module and calls [`joinChannel`]{@link joinChannel} successfully.
   * - The local client calls [`muteLocalAudioStream(true)`]{@link RtcEngine.muteLocalAudioStream} and [`muteLocalAudioStream(false)`]{@link RtcEngine.muteLocalAudioStream} in sequence.
   * - The local client calls [`disableAudio`]{@link RtcEngine.disableAudio} and [`enableAudio`]{@link RtcEngine.enableAudio} in sequence.
   *
   * @event FirstLocalAudioFramePublished
   */
  FirstLocalAudioFramePublished: ElapsedCallback;

  /**
   * Occurs when the first video frame is published.
   *
   * @since v3.1.2.
   *
   * The SDK triggers this callback under one of the following circumstances:
   * - The local client enables the video module and calls [`joinChannel`]{@link joinChannel} successfully.
   * - The local client calls [`muteLocalVideoStream(true)`]{@link RtcEngine.muteLocalVideoStream} and [`muteLocalVideoStream(false)`]{@link RtcEngine.muteLocalVideoStream} in sequence.
   * - The local client calls [`disableVideo`]{@link RtcEngine.disableVideo} and [`enableVideo`]{@link RtcEngine.enableVideo} in sequence.
   *
   * @event FirstLocalVideoFramePublished
   */
  FirstLocalVideoFramePublished: ElapsedCallback;

  /**
   * Occurs when the audio publishing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the publishing state change of the local audio stream.
   *
   * @event AudioPublishStateChanged
   */
  AudioPublishStateChanged: StreamPublishStateCallback;

  /**
   * Occurs when the video publishing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the publishing state change of the local video stream.
   *
   * @event VideoPublishStateChanged
   */
  VideoPublishStateChanged: StreamPublishStateCallback;

  /**
   * Occurs when the audio subscribing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the subscribing state change of a remote audio stream.
   *
   * @event AudioSubscribeStateChanged
   */
  AudioSubscribeStateChanged: StreamSubscribeStateCallback;

  /**
   * Occurs when the video subscribing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the subscribing state change of a remote video stream.
   *
   * @event VideoSubscribeStateChanged
   */
  VideoSubscribeStateChanged: StreamSubscribeStateCallback;

  /**
   * Reports events during the RTMP streaming.
   *
   * @since v3.1.2.
   *
   * @event RtmpStreamingEvent
   */
  RtmpStreamingEvent: RtmpStreamingEventCallback;
}

/**
 * The [`RtcChannelEvents`]{@link RtcChannelEvents} interface.
 */
export interface RtcChannelEvents {
  /**
   * Reports the warning code of the [`RtcChannel`]{@link RtcChannel} instance.
   *
   * @event Warning
   */
  Warning: WarningCallback;

  /**
   * Reports the error code of the [`RtcChannel`]{@link RtcChannel} instance.
   *
   * @event Error
   */
  Error: ErrorCallback;

  /**
   * Occurs when the local user joins a specified channel.
   *
   * If the uid is not specified when calling [`joinChannel`]{@link RtcChannel.joinChannel}, the
   * server automatically assigns a uid.
   *
   * @event JoinChannelSuccess
   */
  JoinChannelSuccess: UidWithElapsedAndChannelCallback;

  /**
   * Occurs when a user rejoins the channel after being disconnected due to network problems.
   *
   * When a user loses connection with the server because of network problems, the SDK automatically tries
   * to reconnect and triggers this callback upon reconnection.
   *
   * @event RejoinChannelSuccess
   */
  RejoinChannelSuccess: UidWithElapsedAndChannelCallback;

  /**
   * Occurs when a user leaves the channel.
   *
   * When a user leaves the channel by using the [`leaveChannel`]{@link RtcChannel.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
   *
   * With this callback, the app retrieves the channel information, such as the call duration and statistics.
   *
   * @event LeaveChannel
   */
  LeaveChannel: RtcStatsCallback;

  /**
   * Occurs when the user role switches in a live interactive streaming channel. For example, from a host to an audience member or vice versa.
   *
   * The SDK triggers this callback when the local user switches the user role by calling the [`setClientRole`]{@link RtcChannel.setClientRole} method after joining the channel.
   *
   * @event ClientRoleChanged
   */
  ClientRoleChanged: ClientRoleCallback;

  /**
   * Occurs when a remote user (`Communication`) or a host (`LiveBroadcasting`) joins the channel.
   * - `Communication` profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
   * - `LiveBroadcasting` profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel.
   *
   * The SDK triggers this callback under one of the following circumstances:
   * - A remote user/host joins the channel by calling [`joinChannel`]{@link RtcChannel.joinChannel}.
   * - A remote user switches the user role to the host by calling [`setClientRole`]{@link RtcChannel.setClientRole} after joining the channel.
   * - A remote user/host rejoins the channel after a network interruption.
   * - The host injects an online media stream into the channel by calling [`addInjectStreamUrl`]{@link RtcChannel.addInjectStreamUrl}.
   *
   * **Note**
   * - In the `LiveBroadcasting` profile:
   *  - The host receives this callback when another host joins the channel.
   *  - The audience in the channel receives this callback when a new host joins the channel.
   *  - When a web app joins the channel, this callback is triggered as long as the web app publishes streams.
   *
   * @event UserJoined
   */
  UserJoined: UidWithElapsedCallback;

  /**
   * Occurs when a remote user (`Communication`) or a host (`LiveBroadcasting`) leaves the channel.
   *
   * There are two reasons for users to become offline:
   * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
   * - Go offline: When no data packet of the user or host is received for a certain period of time (around 20 seconds), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
   *
   * @event UserOffline
   */
  UserOffline: UserOfflineCallback;

  /**
   * Occurs when the network connection state changes.
   *
   * The Agora SDK triggers this callback to report on the current network connection state when it changes,
   * and the reason to such change.
   *
   * @event ConnectionStateChanged
   */
  ConnectionStateChanged: ConnectionStateCallback;

  /**
   * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
   *
   * The SDK also triggers this callback when it cannot connect to the server 10 seconds after calling [`joinChannel`]{@link RtcChannel.joinChannel}, regardless of whether it is in the channel or not.
   *
   * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
   *
   * @event ConnectionLost
   */
  ConnectionLost: EmptyCallback;

  /**
   * Occurs when the token expires in 30 seconds.
   *
   * The user becomes offline if the token used when joining the channel expires. This callback is
   * triggered 30 seconds before the token expires, to remind the app to get a new token. Upon receiving this callback,
   * you need to generate a new token on the server and call [`renewToken`]{@link RtcChannel.renewToken} to pass the new token to the SDK.
   *
   * @event TokenPrivilegeWillExpire
   */
  TokenPrivilegeWillExpire: TokenCallback;

  /**
   * Occurs when the token has expired.
   *
   * After a token is specified when joining the channel, the token expires after a certain period of time,
   * and a new token is required to reconnect to the server.
   * This callback notifies the app to generate a new token and call [`renewToken`]{@link RtcChannel.renewToken} to renew the token.
   *
   * @event RequestToken
   */
  RequestToken: EmptyCallback;

  /**
   * Reports which user is the loudest speaker.
   *
   * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
   *
   * **Note**
   * - To receive this callback, you need to call [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}.
   * - This callback reports the ID of the user with the highest voice volume during a period of time, instead of at the moment.
   *
   * @event ActiveSpeaker
   */
  ActiveSpeaker: UidCallback;

  /**
   * Occurs when the video size or rotation information of a remote user changes.
   *
   * @event VideoSizeChanged
   */
  VideoSizeChanged: VideoSizeCallback;

  /**
   * Occurs when the remote video state changes.
   *
   * @event RemoteVideoStateChanged
   */
  RemoteVideoStateChanged: RemoteVideoStateCallback;

  /**
   * Occurs when the remote audio state changes.
   *
   * This callback indicates the state change of the remote audio stream.
   *
   * @event RemoteAudioStateChanged
   */
  RemoteAudioStateChanged: RemoteAudioStateCallback;

  /**
   * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
   *
   * If you call [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} and set `option` as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
   *
   * @event LocalPublishFallbackToAudioOnly
   */
  LocalPublishFallbackToAudioOnly: FallbackCallback;

  /**
   * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
   *
   * If you call [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the remote media stream falls back to audio-only mode due to poor uplink conditions, or when the remote media stream switches back to the video after the uplink network condition improves.
   *
   * **Note**
   *
   * Once the remote media stream is switched to the low stream due to poor network conditions,
   * you can monitor the stream switch between a high and low stream in the [`RemoteVideoStats`]{@link RemoteVideoStats} callback.
   *
   * @event RemoteSubscribeFallbackToAudioOnly
   */
  RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback;

  /**
   * Reports the statistics of the [`RtcEngine`]{@link RtcEngine} once every two seconds.
   *
   * @event RtcStats
   */
  RtcStats: RtcStatsCallback;

  /**
   * Reports the last mile network quality of each user in the channel once every two seconds.
   *
   * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
   *
   * @event NetworkQuality
   */
  NetworkQuality: NetworkQualityWithUidCallback;

  /**
   * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
   *
   * @event RemoteVideoStats
   */
  RemoteVideoStats: RemoteVideoStatsCallback;

  /**
   * Reports the statistics of the audio stream from each remote user/host.
   *
   * The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
   *
   * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
   *
   * @event RemoteAudioStats
   */
  RemoteAudioStats: RemoteAudioStatsCallback;

  /**
   * Occurs when the state of the RTMP streaming changes.
   *
   * The SDK triggers this callback to report the result of the local user calling the [`addPublishStreamUrl`]{@link RtcChannel.addPublishStreamUrl} or [`removePublishStreamUrl`]{@link RtcChannel.removePublishStreamUrl} method. This callback returns the URL and its current streaming state. When the streaming state is [`Failure`]{@link RtmpStreamingState.Failure}, see the errCode parameter for details.
   *
   * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
   *
   * @event RtmpStreamingStateChanged
   */
  RtmpStreamingStateChanged: RtmpStreamingStateCallback;

  /**
   * Occurs when the publisher's transcoding settings are updated.
   *
   * When the `LiveTranscoding` class in the [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} method updates, the SDK triggers this callback to report the update information.
   *
   * **Note**
   *
   * If you call [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} to set the `LiveTranscoding` class for the first time, the SDK does not trigger this callback.
   *
   * @event TranscodingUpdated
   */
  TranscodingUpdated: EmptyCallback;

  /**
   * Reports the status of injecting the online media stream.
   *
   * @event StreamInjectedStatus
   */
  StreamInjectedStatus: StreamInjectedStatusCallback;

  /**
   * Occurs when the local user receives a remote data stream.
   *
   * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the [`sendStreamMessage`]{@link RtcChannel.sendStreamMessage} method.
   *
   * @event StreamMessage
   */
  StreamMessage: StreamMessageCallback;

  /**
   * Occurs when the local user fails to receive a remote data stream.
   *
   * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the [`sendStreamMessage`]{@link RtcChannel.sendStreamMessage} method.
   *
   * @event StreamMessageError
   */
  StreamMessageError: StreamMessageErrorCallback;

  /**
   * Occurs when the state of the media stream relay changes.
   *
   * The SDK reports the state of the current media relay and possible error messages in this callback.
   *
   * @event ChannelMediaRelayStateChanged
   */
  ChannelMediaRelayStateChanged: MediaRelayStateCallback;

  /**
   * Reports events during the media stream relay.
   *
   * @event ChannelMediaRelayEvent
   */
  ChannelMediaRelayEvent: MediaRelayEventCallback;

  /**
   * Occurs when the local user receives the metadata.
   *
   * @event MetadataReceived
   */
  MetadataReceived: MetadataCallback;

  /**
   * Occurs when the audio publishing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the publishing state change of the local audio stream.
   *
   * @event AudioPublishStateChanged
   */
  AudioPublishStateChanged: StreamPublishStateCallback;

  /**
   * Occurs when the video publishing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the publishing state change of the local video stream.
   *
   * @event VideoPublishStateChanged
   */
  VideoPublishStateChanged: StreamPublishStateCallback;

  /**
   * Occurs when the audio subscribing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the subscribing state change of a remote audio stream.
   *
   * @event AudioSubscribeStateChanged
   */
  AudioSubscribeStateChanged: StreamSubscribeStateCallback;

  /**
   * Occurs when the video subscribing state changes.
   *
   * @since v3.1.2.
   *
   * This callback indicates the subscribing state change of a remote video stream.
   *
   * @event VideoSubscribeStateChanged
   */
  VideoSubscribeStateChanged: StreamSubscribeStateCallback;

  /**
   * Reports events during the RTMP streaming.
   *
   * @since v3.1.2.
   *
   * @event RtmpStreamingEvent
   */
  RtmpStreamingEvent: RtmpStreamingEventCallback;
}
