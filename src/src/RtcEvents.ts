import {
    AudioLocalError,
    AudioLocalState,
    AudioMixingErrorCode,
    AudioMixingStateCode,
    AudioOutputRouting,
    AudioRemoteState,
    AudioRemoteStateReason,
    AudioVolumeInfo,
    ChannelMediaRelayError,
    ChannelMediaRelayEvent,
    ChannelMediaRelayState,
    ClientRole,
    ConnectionChangedReason,
    ConnectionStateType,
    ErrorCode,
    FacePositionInfo,
    InjectStreamStatus,
    LastmileProbeResult,
    LocalAudioStats,
    LocalVideoStats,
    LocalVideoStreamError,
    LocalVideoStreamState,
    NetworkQuality,
    NetworkType,
    Rect,
    RemoteAudioStats,
    RemoteVideoStats,
    RtcStats,
    RtmpStreamingErrorCode,
    RtmpStreamingState,
    UserInfo,
    UserOfflineReason,
    VideoRemoteState,
    VideoRemoteStateReason,
    WarningCode
} from "../Types"


/**
 * @internal
 */
export type Listener = (...args: any[]) => any

/**
 * @internal
 */
export interface Subscription {
    remove(): void
}


export type EmptyCallback = () => void
export type WarningCallback = (warn: WarningCode) => void
export type ErrorCallback = (err: ErrorCode) => void
export type ApiCallCallback = (error: ErrorCode, api: string, result: string) => void
export type UidWithElapsedAndChannelCallback = (channel: string, uid: number, elapsed: number) => void
export type RtcStatsCallback = (stats: RtcStats) => void
export type UserAccountCallback = (uid: number, userAccount: string) => void
export type UserInfoCallback = (uid: number, userInfo: UserInfo) => void
export type ClientRoleCallback = (oldRole: ClientRole, newRole: ClientRole) => void
export type UidWithElapsedCallback = (uid: number, elapsed: number) => void
export type UserOfflineCallback = (uid: number, reason: UserOfflineReason) => void
export type ConnectionStateCallback = (state: ConnectionStateType, reason: ConnectionChangedReason) => void
export type NetworkTypeCallback = (type: NetworkType) => void
export type TokenCallback = (token: string) => void
export type AudioVolumeCallback = (speakers: AudioVolumeInfo[], totalVolume: number) => void
export type UidCallback = ( uid: number) => void
export type ElapsedCallback = (elapsed: number) => void
export type VideoFrameCallback = (width: number, height: number, elapsed: number) => void
export type UidWithMutedCallback = (uid: number, muted: boolean) => void
export type VideoSizeCallback = (uid: number, width: number, height: number, rotation: number) => void
export type RemoteVideoStateCallback = (uid: number, state: VideoRemoteState, reason: VideoRemoteStateReason, elapsed: number) => void
export type LocalVideoStateCallback = (localVideoState: LocalVideoStreamState, error: LocalVideoStreamError) => void
export type RemoteAudioStateCallback = (uid: number, state: AudioRemoteState, reason: AudioRemoteStateReason, elapsed: number) => void
export type LocalAudioStateCallback = (state: AudioLocalState, error: AudioLocalError) => void
export type FallbackCallback = (isFallbackOrRecover: boolean) => void
export type FallbackWithUidCallback = (uid: number, isFallbackOrRecover: boolean) => void
export type AudioRouteCallback = (routing: AudioOutputRouting) => void
export type RectCallback = (rect: Rect) => void
export type NetworkQualityCallback = (quality: NetworkQuality) => void
export type NetworkQualityWithUidCallback = (uid: number, txQuality: NetworkQuality, rxQuality: NetworkQuality) => void
export type LastmileProbeCallback = (result: LastmileProbeResult) => void
export type LocalVideoStatsCallback = (stats: LocalVideoStats) => void
export type LocalAudioStatsCallback = (stats: LocalAudioStats) => void
export type RemoteVideoStatsCallback = (stats: RemoteVideoStats) => void
export type RemoteAudioStatsCallback = (stats: RemoteAudioStats) => void
export type AudioMixingStateCallback = (state: AudioMixingStateCode, errorCode: AudioMixingErrorCode) => void
export type SoundIdCallback = (soundId: number) => void
export type RtmpStreamingStateCallback = (url: string, state: RtmpStreamingState, errCode: RtmpStreamingErrorCode) => void
export type StreamInjectedStatusCallback = (url: string, uid: number, status: InjectStreamStatus) => void
export type StreamMessageCallback = (uid: number, streamId: number, data: string) => void
export type StreamMessageErrorCallback = (uid: number, streamId: number, error: ErrorCode, missed: number, cached: number) => void
export type MediaRelayStateCallback = (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void
export type MediaRelayEventCallback = (code: ChannelMediaRelayEvent) => void
export type VideoFrameWithUidCallback = (uid: number, width: number, height: number, elapsed: number) => void
export type UrlWithErrorCallback = (url: string, error: ErrorCode) => void
export type UrlCallback = (url: string) => void
export type TransportStatsCallback = (uid: number, delay: number, lost: number, rxKBitRate: number) => void
export type UidWithEnabledCallback = (uid: number, enabled: boolean) => void
export type EnabledCallback = (enabled: boolean) => void
export type AudioQualityCallback = (uid: number, quality: number, delay: number, lost: number) => void
export type MetadataCallback = (buffer: string, uid: number, timeStampMs: number) => void
export type FacePositionCallback = (imageWidth: number, imageHeight: number, faces: FacePositionInfo[]) => void

/**
 * The SDK uses the [`RtcEngineEvents`]{@link RtcEngineEvents} interface class to send callbacks to the application, and the application inherits the methods of this interface class to retrieve these callbacks.
 *
 * All methods in this interface class have their (empty) default implementations, and the application can inherit only some of the required events instead of all of them.
 *
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
     * [`WarningCallback`]{@link WarningCallback} has the following parameters:
     * - `warn`: [`WarningCode`]{@link WarningCode}
     *  Warning code. See [`WarningCode`]{@link WarningCode}.
     *
     * @event Warning
     */
    Warning: WarningCallback

    /**
     * Reports an error during SDK runtime.
     *
     * In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
     *
     * For example, the SDK reports a [`StartCall`]{@link ErrorCode.StartCall} error when failing to initialize a call. The app informs the user that the call initialization failed and invokes the [`leaveChannel`]{@link RtcEngine.leaveChannel} method to leave the channel. For detailed error codes, see {@link ErrorCode}.
     *
     * [`ErrorCallback`]{@link ErrorCallback} has the following parameters:
     * - `err`: [`ErrorCode`]{@link ErrorCode}
     *
     *  Error code. See [`ErrorCode`]{@link ErrorCode}.
     * @event Error
     */
    Error: ErrorCallback

    /**
     * Occurs when an API method is executed.
     *
     * [`ApiCallCallback`]{@link ApiCallCallback} has the following parameters:
     * - `error`: [`ErrorCode`]{@link ErrorCode}
     *
     *  [Error Code]{@link ErrorCode} that the SDK returns when the method call fails.
     * If the SDK returns 0, then the method call was successful.
     * - `api`: *string*
     *
     *  The method executed by the SDK.
     * - `result`: *string*
     *
     *  The result of the method call.
     *
     * @event ApiCallExecuted
     */
    ApiCallExecuted: ApiCallCallback

    /**
     * Occurs when the local user joins a specified channel.
     *
     * The channel name assignment is based on channelName specified in the joinChannel method.
     *
     * If the uid is not specified when [`joinChannel`]{@link RtcEngine.joinChannel} is called, the server automatically assigns a uid.
     *
     * [`UidWithElapsedAndChannelCallback`]{@link UidWithElapsedAndChannelCallback} has the following parameters:
     * - `channel`: *string*
     *
     *  Channel name.
     * - `uid`: *number*
     *
     *  User ID.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this callback is triggered.
     *
     * @event JoinChannelSuccess
     */
    JoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     *
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     *
     * [`UidWithElapsedAndChannelCallback`]{@link UidWithElapsedAndChannelCallback} has the following parameters:
     * - `channel`: *string*
     *
     *  Channel name.
     * - `uid`: *number*
     *
     *  User ID.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from starting to reconnect until this callback is triggered.
     * @event RejoinChannelSuccess
     */
    RejoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user leaves the channel.
     *
     * When the app calls the {@link RtcEngine.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
     *
     * With this callback, the application retrieves the channel information, such as the call duration and statistics.
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} has the following parameters:
     * - `RtcStats`：[`RtcStats`]{@link RtcStats}
     *
     *  Statistics of the call.
     * @event LeaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the local user registers a user account.
     *
     * This callback is triggered when the local user successfully registers a user account by calling [`registerLocalUserAccount`]{@link RtcEngine.registerLocalUserAccount}, or joins a channel by calling [`joinChannelWithUserAccount`]{@link RtcEngine.joinChannelWithUserAccount}.
     * This callback reports the user ID and user account of the local user.
     * [`UserAccountCallback`]{@link UserAccountCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  The ID of the local user.
     * - `userAccount`: *string*
     *
     *  The user account of the local user.
     * @event LocalUserRegistered
     */
    LocalUserRegistered: UserAccountCallback

    /**
     * Occurs when the SDK gets the user ID and user account of the remote user.
     *
     * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers this callback on the local client.
     *
     * [`UserInfoCallback`]{@link UserInfoCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  The ID of the remote user.
     * - `userInfo`: [`UserInfo`]{@link UserInfo}
     *
     *  The `UserInfo` object that contains the user ID and user account of the remote user.
     * @event UserInfoUpdated
     */
    UserInfoUpdated: UserInfoCallback

    /**
     * Occurs when the user role switches in live interactive streaming. For example, from a host to an audience or vice versa.
     *
     * The SDK triggers this callback when the local user switches the user role by calling [`setClientRole`]{@link RtcEngine.setClientRole} after joining the channel.
     *
     * [`ClientRoleCallback`]{@link ClientRoleCallback} has the following parameters:
     * - `oldRole`: [`ClientRole`]{@link ClientRole}
     *
     *  Role that the user switches from.
     * - `newRole`: [`ClientRole`]{@link ClientRole}
     *
     *  Role that the user switches to.
     * @event ClientRoleChanged
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user ([`Communication`]{@link ChannelProfile.Communication})/host ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}) joins the channel.
     * - [`Communication`]{@link ChannelProfile.Communication} profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel
     *
     * The SDK triggers this callback under one of the following circumstances:
     * - A remote user/host joins the channel by calling [`joinChannel`]{@link RtcEngine.joinChannel}.
     * - A remote user switches the user role to the host by calling [`setClientRole`]{@link RtcEngine.setClientRole}after joining the channel.
     * - A remote user/host rejoins the channel after a network interruption.
     * - The host injects an online media stream into the channel by calling [`addInjectStreamUrl`]{@link RtcEngine.addInjectStreamUrl}.
     *
     * **Note**
     * - In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile:
     *  - The host receives the [`UserJoined`]{@link UserJoined} callback when another host joins the channel.
     *  - The audience in the channel receives the [`UserJoined`]{@link UserJoined} callback when a new host joins the channel.
     *  - When a web application joins the channel, the [`UserJoined`]{@link UserJoined} callback is triggered as long as the web application publishes streams.
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user or host who joins the channel.
     * - `elapsed`: *number*
     *
     *  Time delay (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel}/[`setClientRole`]{@link RtcEngine.setClientRole}setClientRole
     * until this callback is triggered.
     * @event UserJoined
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user ([`Communication`]{@link ChannelProfile.Communication})/host ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}) leaves the channel.
     *
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the [`Communication`]{@link ChannelProfile.Communication} profile, and more for the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     *
     * [`UserOfflineCallback`]{@link UserOfflineCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user or host who leaves the channel or goes offline.
     * -` reason`: [`UserOfflineReason`]{@link UserOfflineReason}
     *
     * - Reason why the user goes offline.
     * @event UserOffline
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     *
     * The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason to such change.
     *
     * [`ConnectionStateCallback`]{@link ConnectionStateCallback} has the following parameters:
     * - `state`: [`ConnectionStateType`][@link ConnectionStateType]
     *
     *  The current network connection state.
     * - `reason`: [`ConnectionChangedReason`]{@link ConnectionChangedReason}
     *
     *  The reason causing the change of the connection state.
     * @event ConnectionStateChanged
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the network type changes.
     *
     * The SDK returns the current network type in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
     *
     * [`NetworkTypeCallback`]{@link NetworkTypeCallback} has the following parameters:
     * - `type`: [`NetworkType`]{@link NetworkType}
     *
     *  The network type.
     * @event NetworkTypeChanged
     */
    NetworkTypeChanged: NetworkTypeCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     *
     * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling {@link RtcEngine.joinChannel}, regardless of whether it is in the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionLost
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     *
     * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call {@link RtcEngine.renewToken} to pass the new token to the SDK.
     *
     * [`TokenCallback`]{@link TokenCallback} has the following parameters:
     * - `token`: *string*
     *
     *  The token that will expire in 30 seconds.
     * @event TokenPrivilegeWillExpire
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     *
     * After a token is specified when joining the channel, the token expires after a certain period of time,
     * and a new token is required to reconnect to the server. This callback notifies the app to generate a
     * new token and call [`joinChannel`]{@link RtcEngine.joinChannel} to rejoin the channel with the new token.
     *
     * @event RequestToken
     */
    RequestToken: EmptyCallback

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
     * [`AudioVolumeCallback`]{@link AudioVolumeCallback} has the following parameters:
     * - `speakers`: [`AudioVolumeInfo`]{@link AudioVolumeInfo}[]
     *
     *  An array containing the user ID and volume information for each speaker.
     *
     *  In the local user’s callback, this array contains the following members:
     *  - `uid` = 0,
     *  - `volume` = `totalVolume`, which reports the sum of the voice volume and audio-mixing volume of the local user, and
     *  - `vad`, which reports the voice activity status of the local user.
     *
     *  In the remote speakers' callback, this array contains the following members:
     *  - `uid` of each remote speaker,
     *  - `volume`, which reports the sum of the voice volume and audio-mixing volume of each remote speaker, and
     *  - `vad` = 0.
     *
     *  An empty `speakers` array in the callback indicates that no remote user is speaking at the moment.
     * - `totalVolume`: *number*
     *
     *  Total volume after audio mixing. The value ranges between 0 (lowest volume) and 255 (highest volume).
     *  - In the local user’s callback, `totalVolume` is the sum of the voice volume and audio-mixing volume of the local user.
     *  - In the remote speakers' callback, `totalVolume` is the sum of the voice volume and audio-mixing volume of all remote speakers.
     * @event AudioVolumeIndication
     */
    AudioVolumeIndication: AudioVolumeCallback

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
     * [`UidCallback`]{@link UidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the active speaker. A `uid` of 0 represents the local user.
     * @event ActiveSpeaker
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the first local audio frame is sent.
     *
     * [`ElapsedCallback`]{@link ElapsedCallback} has the following parameters:
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling the [`joinChannel`]{@ink RtcEngine.joinChannel} until this callback is triggered.
     * @event FirstLocalAudioFrame
     */
    FirstLocalAudioFrame: ElapsedCallback

    /**
     * Occurs when the first local video frame is rendered.
     *
     * This callback is triggered after the first local video frame is rendered on the local video window.
     *
     * [`VideoFrameCallback`]{@link VideoFrameCallback} has the following parameters:
     * - `width`: *number*
     *
     *  Width (pixels) of the first local video frame.
     * - `height`: *number*
     *
     *  Height (pixels) of the first local video frame.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@ink RtcEngine.joinChannel} until this callback is triggered.
     * If [`startPreview`]{@link RtcEngine.startPreview} is called before `joinChannel`, elapsed is the time elapsed (ms) from the local user calling `startPreview` until this callback is triggered.
     * @event FirstLocalVideoFrame
     */
    FirstLocalVideoFrame: VideoFrameCallback

    /**
     * Occurs when a remote user stops/resumes sending the video stream.
     *
     * **Deprecated**
     * This callback is deprecated. Use the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters for the same function:
     * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
     * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user stops or resumes sending the video stream by calling the [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream} method.
     *
     * **Note**
     *
     * This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     *
     * [`UidWithMutedCallback`]{@link UidWithMutedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the remote user.
     * - `muted`: *boolean*
     *
     *  Whether the remote user's video stream playback pauses/resumes:
     *  - true: Pause.
     *  - false: Resume.
     * @event UserMuteVideo
     */
    UserMuteVideo: UidWithMutedCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     *
     * [`VideoSizeCallback`]{@link VideoSizeCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user or local user (0) whose video size or rotation changes.
     * - `width`: *number*
     *
     *  New width (pixels) of the video.
     * - `height`: *number*
     *
     *  New height (pixels) of the video.
     * - `rotation`: *number*
     *
     *  New rotation of the video [0 to 360).
     * @event VideoSizeChanged
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     *
     * [`RemoteVideoStateCallback`]{@link RemoteVideoStateCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the remote user whose video state changes.
     * - `state`: [`VideoRemoteState`]{@link VideoRemoteState}
     *
     *  State of the remote video.
     * - `reason`: [`VideoRemoteStateReason`]{@link VideoRemoteStateReason}
     *
     *  The reason of the remote video state change.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@ink RtcEngine.joinChannel} until the SDK triggers this callback.
     *
     * @event RemoteVideoStateChanged
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the local video state changes.
     *
     * The SDK returns the current video state in this callback. When the state is [`Failed`]{@link LocalVideoStreamState.Failed}, see the error parameter for details.
     *
     * **Note**
     *
     * This callback reports the current state of the local video,
     * which keeps changing throughout the RtcEngine life cycle. We recommend maintaining the states reported
     * in this callback, and check the local video state before starting the local camera.
     * If the SDK reports [`CaptureFailure`]{@link LocalVideoStreamError.CaptureFailure}, the local camera is occupied by either the system or a third-party app.
     * To access the camera, call [`enableLocalVideo`]{@link RtcEngine.enableLocalVideo} (false) first, and then [`enableLocalVideo`]{@link RtcEngine.enableLocalVideo} (video).
     *
     * [`LocalVideoStateCallback`]{@link LocalVideoStateCallback} has the following parameters:
     * - localVideoState: [`LocalVideoStreamState`]{@link LocalVideoStreamState}
     *
     *  The local video state.
     * - error: [`LocalVideoStreamError`]{@link LocalVideoStreamError}
     *
     *  The detailed error information of the local video.
     *
     * @event LocalVideoStateChanged
     */
    LocalVideoStateChanged: LocalVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     *
     * This callback indicates the state change of the remote audio stream.
     *
     * [`RemoteAudioStateCallback`]{@link RemoteAudioStateCallback } has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user whose audio state changes.
     * - `state`: [`AudioRemoteState`]{@link AudioRemoteState}
     *
     *  State of the remote audio.
     * - `reason`: [`AudioRemoteStateReason`]{@link AudioRemoteStateReason}
     *
     *  The reason of the remote audio state change.
     * - `elapsed`: number
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@ink RtcEngine.joinChannel} until the SDK triggers this callback.
     * @event RemoteAudioStateChanged
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the local audio stream state changes.
     *
     * This callback indicates the state change of the local audio stream, including the state of the audio recording and encoding, and allows you to troubleshoot issues when exceptions occur.
     *
     * **Note**
     *
     * When the state is [`Failed`]{@link AudioLocalState.Failed}, see the error parameter for details.
     *
     * [`LocalAudioStateCallback`]{@link LocalAudioStateCallback} has the following parameters:
     * - state: [`AudioLocalState`]{@link AudioLocalState}
     *
     *  State of the local audio.
     * - error: [`AudioLocalError`]{@link AudioLocalError}
     *
     *  The error information of the local audio.
     * @event LocalAudioStateChanged
     */
    LocalAudioStateChanged: LocalAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly},
     * this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions,
     * or when the audio stream switches back to the video after the uplink network condition improves.
     *
     * [`FallbackCallback`]{@link FallbackCallback} has the following parameters:
     * - `isFallbackOrRecover`: *boolean*
     *
     *  Whether the published stream fell back to audio-only or switched back to the video:
     *  - true: The published stream fell back to audio-only due to poor network conditions.
     *  - false: The published stream switched back to the video after the network conditions improved.
     * @event LocalPublishFallbackToAudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly},
     * this callback is triggered when the remotely subscribed media stream falls back to audio-only mode due to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after the uplink network condition improves.
     *
     * [`FallbackWithUidCallback`]{@link FallbackWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     * ID of the remote user sending the stream.
     * - `isFallbackOrRecover`: *boolean*
     *
     *  Whether the remote media stream fell back to audio-only or switched back to the video:
     *  - true: The remote media stream fell back to audio-only due to poor network conditions.
     *  - false: The remote media stream switched back to the video stream after the network conditions improved.
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Occurs when the local audio playback route changes.
     *
     * This callback returns that the audio route switched to an earpiece, speakerphone, headset, or Bluetooth device.
     *
     * The definition of the routing is listed in [`AudioOutputRouting`]{@link AudioOutputRouting}.
     *
     * [`AudioRouteCallback`]{@link AudioRouteCallback} has the following parameters:
     * - `routing`: [`AudioOutputRouting`]{@link AudioOutputRouting}.
     * @event AudioRouteChanged
     */
    AudioRouteChanged: AudioRouteCallback

    /**
     * Occurs when the camera focus area is changed.
     *
     * The SDK triggers this callback when the local user changes the camera focus position by calling [`setCameraFocusPositionInPreview`]{@link RtcEngine.setCameraFocusPositionInPreview}.
     *
     * [`RectCallback`]{@link RectCallback} has the following parameters:
     * - rect: [`Rect`]{@link rect: Rect}
     *
     *  Rectangular area in the camera zoom specifying the focus area.
     * @event CameraFocusAreaChanged
     */
    CameraFocusAreaChanged: RectCallback

    /**
     * The camera exposure area has changed.
     *
     * The SDK triggers this callback when the local user changes the camera exposure position by calling [`setCameraExposurePosition`]{@link RtcEngine.setCameraExposurePosition}.
     *
     * [`RectCallback`]{@link RectCallback} has the following parameters:
     * - rect: [`Rect`]{@link rect: Rect}
     *
     *  Rectangular area in the camera zoom specifying the exposure area.
     * @event CameraExposureAreaChanged
     */
    CameraExposureAreaChanged: RectCallback

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
     * [`FacePositionCallback`]{@link FacePositionCallback} has the following parameters:
     * - `imageWidth`: *number*
     *
     *  The width (px) of the local video.
     * - `imageHeight`: *number*
     *
     *  The height (px) of the local video.
     * - `faces`: [`FacePositionInfo`]{@link FacePositionInfo}[]
     *
     *  The information of the detected human face. For details, see [`FacePositionInfo`]{@link FacePositionInfo}.
     * The number of the `FacePositionInfo` array depends on the number of human faces detected.
     * If the array length is 0, it means that no human face is detected.
     * @event FacePositionChanged
     */
    FacePositionChanged: FacePositionCallback

    /**
     * Reports the statistics of the [`RtcEngine`]{@link RtcEngine} once every two seconds.
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} has the following parameters:
     * - `stats`: [`RtcStats`]{@link RtcStats}
     *
     *  RTC engine statistics.
     * @event RtcStats
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of the local user once every two seconds before the user joins the channel.
     * Last mile refers to the connection between the local device and Agora's edge server. After the application calls the [`enableLastmileTest`]{@link RtcEngine.enableLastmileTest} method,
     * this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.
     *
     * [`NetworkQualityCallback`]{@link NetworkQualityCallback} has the following parameters:
     * - `quality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *  The last mile network quality based on the uplink and downlink packet loss rate and jitter.
     * @event LastmileQuality
     */
    LastmileQuality: NetworkQualityCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     *
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     *
     * [`NetworkQualityWithUidCallback`]{@link NetworkQualityWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID. The network quality of the user with this uid is reported.
     * If `uid` is 0, the local network quality is reported.
     * - `txQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *   Uplink transmission quality of the user in terms of the transmission bitrate, packet loss rate, average RTT (Round-Trip Time)
     * and jitter of the uplink network. `txQuality` is a quality rating helping you understand how well the current uplink
     * network conditions can support the selected VideoEncoderConfiguration. For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution of 680 × 480 and a frame rate of 30 fps, but may be inadequate for resolutions higher than 1280 × 720.
     * - `rxQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *  Downlink network quality rating of the user in terms of packet loss rate, average RTT, and jitter of the downlink network.
     * @event NetworkQuality
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the last-mile network probe result.
     *
     * The SDK triggers this callback within 30 seconds after the app calls [`startLastmileProbeTest`]{@link RtcEngine.startLastmileProbeTest}.
     *
     * [`LastmileProbeCallback`]{@link LastmileProbeCallback} has the following parameters:
     * - `result`: [`LastmileProbeResult`]{@link LastmileProbeResult}
     *
     *  The uplink and downlink last-mile network probe test result.
     * @event LastmileProbeResult
     */
    LastmileProbeResult: LastmileProbeCallback

    /**
     * Reports the statistics of the local video streams.
     *
     * The SDK triggers this callback once every two seconds for each user/host. If there are multiple users/hosts in the channel, the SDK triggers this callback as many times.
     *
     * [`LocalVideoStatsCallback`]{@link LocalVideoStatsCallback} has the following parameters:
     * - `stats`: [`LocalVideoStats`]{@link LocalVideoStats}
     *
     *  The statistics of the local video stream.
     * @event LocalVideoStats
     */
    LocalVideoStats: LocalVideoStatsCallback

    /**
     * Reports the statistics of the local audio stream.
     *
     * [`LocalAudioStatsCallback`]{@link LocalAudioStatsCallback} has the following parameters:
     * - `stats`: [`LocalAudioStats`]{@link LocalAudioStats}
     *
     *  The statistics of the local audio stream.
     * @event LocalAudioStats
     */
    LocalAudioStats: LocalAudioStatsCallback

    /**
     * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * [`RemoteVideoStatsCallback`]{@link RemoteVideoStatsCallback} has the following parameters:
     * - `stats`: [`RemoteVideoStats`]{@link RemoteVideoStats}
     *
     *  Statistics of the received remote video streams.
     * @event RemoteVideoStats
     */
    RemoteVideoStats: RemoteVideoStatsCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     *
     * The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     *
     * [`RemoteAudioStatsCallback`]{@link RemoteAudioStatsCallback} has the following parameters:
     * - `stats`: [`RemoteAudioStats`]{@link RemoteAudioStats}
     *
     *  Statistics of the received remote audio streams.
     * @event RemoteAudioStats
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the audio mixing file playback finishes.
     *
     * **Deprecated**
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
    AudioMixingFinished: EmptyCallback

    /**
     * Occurs when the state of the local user's audio mixing file changes.
     *
     * When you call [`startAudioMixing`]{@link RtcEngine.startAudioMixing} and the state of audio mixing file changes, the Agora SDK triggers this callback.
     * - When the audio mixing file plays, pauses playing, or stops playing, this callback returns [`710`]{@link AudioMixingStateCode.Playing}, `711`, or `713` in state, and `0` in errorCode.
     * - When exceptions occur during playback, this callback returns `714` in state and an error in errorCode.
     * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError}.
     *
     * [`AudioMixingStateCallback`]{@link AudioMixingStateCallback} has the following parameters:
     * - `state`: [`AudioMixingStateCode`]{@link AudioMixingStateCode}
     *
     *  The state code.
     * - `errorCode`: [`AudioMixingErrorCode`]{@link AudioMixingErrorCode}
     *
     *  The error code.
     * @event AudioMixingStateChanged
     */
    AudioMixingStateChanged: AudioMixingStateCallback

    /**
     * Occurs when the audio effect file playback finishes.
     *
     * You can start a local audio effect playback by calling [`playEffect`]{@link RtcEngine.playEffect}. This callback is triggered when the local audio effect file playback finishes.
     *
     * [`SoundIdCallback`]{@link SoundIdCallback} has the following parameters:
     * - `soundId`: *number*
     *
     *  ID of the local audio effect. Each local audio effect has a unique ID.
     * @event AudioEffectFinished
     */
    AudioEffectFinished: SoundIdCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     *
     * The SDK triggers this callback to report the result of the local user calling [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} or [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
     * This callback returns the URL and its current streaming state. When the streaming state is [`Failure`]{@link RtmpStreamingState.Failure}, see the errCode parameter for details.
     *
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     *
     * [`RtmpStreamingStateCallback`]{@link RtmpStreamingStateCallback} has the following parameters:
     * - `url`: *string*
     *
     *  The RTMP URL address.
     * - `state`: *RtmpStreamingState*
     *
     *  The RTMP streaming state.
     * - `errCode`: *RtmpStreamingErrorCode*
     *
     *  The detailed error information for streaming.
     * @event RtmpStreamingStateChanged
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

    /**
     * Occurs when the publisher's transcoding settings are updated.
     *
     * When the LiveTranscoding class in the {@link RtcEngine.setLiveTranscoding} method updates, the SDK triggers this callback to report the update information.
     *
     * **Note**
     * - If you call the setLiveTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
     *
     * @event TranscodingUpdated
     */
    TranscodingUpdated: EmptyCallback

    /**
     * Reports the status of injecting the online media stream.
     *
     * [`StreamInjectedStatusCallback`]{@link StreamInjectedStatusCallback} has the following parameters:
     * - `url`: *string*
     *
     *  The URL address of the externally injected stream.
     * - `uid`: *number*
     *
     *  User ID.
     * - `status`: [`InjectStreamStatus`]{@link InjectStreamStatus}
     *
     *  State of the externally injected stream.
     * @event StreamInjectedStatus
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     *
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends
     * by calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     *
     * [`StreamMessageCallback`]{@link StreamMessageCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the data stream.
     * - `streamId`: *number*
     *
     *  Stream ID.
     * - `data`: *string*
     *
     *  Data received by the local user.
     * @event StreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     *
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote
     * user sends by calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     *
     * [`StreamMessageErrorCallback`]{@link StreamMessageErrorCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the data stream.
     * - `streamId`: *number*
     *
     *  Stream ID.
     * - `error`: [`ErrorCode`]{@link ErrorCode}
     *  Error code.
     * - `missed`: *number*
     *
     *  The number of lost messages.
     * - `cached`: *number*
     *
     *  The number of incoming cached messages when the data stream is interrupted.
     * @event StreamMessageError
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the media engine is loaded.
     *
     * @event MediaEngineLoadSuccess
     */
    MediaEngineLoadSuccess: EmptyCallback

    /**
     * Occurs when the media engine starts.
     *
     * @event MediaEngineStartCallSuccess
     */
    MediaEngineStartCallSuccess: EmptyCallback

    /**
     * Occurs when the state of the media stream relay changes.
     *
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     *
     * [`MediaRelayStateCallback`]{@link MediaRelayStateCallback} has the following parameters:
     * - `state`: [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}
     *
     *  The state code.
     * - `code`: [`ChannelMediaRelayError`]{@link ChannelMediaRelayError}
     *
     *  The error code.
     * @event ChannelMediaRelayStateChanged
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     *
     * [`MediaRelayEventCallback`]{@link MediaRelayEventCallback} has the following parameters:
     * - `code`: [`ChannelMediaRelayEvent`]{@link ChannelMediaRelayEvent}
     *
     *  The event code for media stream relay.
     * @event ChannelMediaRelayEvent
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the first remote video frame is rendered.
     *
     * **Deprecated**
     *
     * Use [`Starting`]{@link VideoRemoteState.Starting} or [`Decoding`]{@link VideoRemoteState.Decoding} in the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback instead.
     *
     * This callback is triggered after the first frame of the remote video is rendered on the video window. The application can retrieve the data of the time elapsed from the user joining the channel until the first video frame is displayed.
     *
     * [`VideoFrameWithUidCallback`]{@link VideoFrameWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the video streams.
     * - `width`: *number*
     *
     *  Width (pixels) of the video stream.
     * - `height`: *number*
     *
     *  Height (pixels) of the video stream.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this callback is triggered.
     * @event FirstRemoteVideoFrame
     */
    FirstRemoteVideoFrame: VideoFrameWithUidCallback

    /**
     * Occurs when the first remote audio frame is received.
     *
     * **Deprecated**
     *
     * Use [`Starting`]{@link AudioRemoteState.Starting} in [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} instead.
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this callback is triggered.
     * @event FirstRemoteAudioFrame
     */
    FirstRemoteAudioFrame: UidWithElapsedCallback

    /**
     * Occurs when the engine receives the first audio frame from a specified remote user.
     *
     * **Deprecated**
     *
     * Use [`Decoding`]{@link VideoRemoteState.Decoding} in [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} instead.
     *
     * This callback is triggered in either of the following scenarios：
     * - The remote user joins the channel and sends the audio stream.
     * - The remote user stops sending the audio stream and re-sends it after 15 seconds. Possible reasons include:
     *  - The remote user leaves channel.
     *  - The remote user drops offline.
     *  - The remote user calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}.
     *  - The remote user calls [`disableAudio`]{@link RtcEngine.disableAudio}.
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the audio stream.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this callback is triggered.
     * @event FirstRemoteAudioDecoded
     */
    FirstRemoteAudioDecoded: UidWithElapsedCallback

    /**
     * Occurs when a remote user stops/resumes sending the audio stream.
     *
     * **Deprecated**
     * Use the [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} callback with the following parameters instead:
     * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
     * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} method.
     *
     * **Note**
     *
     * This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     *
     * [`UidWithMutedCallback`]{@link UidWithMutedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the remote user.
     * - `muted`: *boolean*
     *
     *  Whether the remote user's audio stream is muted/unmuted:
     *  - true: Muted.
     *  - false: Unmuted.
     * @event UserMuteAudio
     */
    UserMuteAudio: UidWithMutedCallback

    /**
     * Reports the result of calling [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl}.
     *
     * **Deprecated**
     *
     * Use [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged} instead.
     *
     * This callback indicates whether you have successfully added an RTMP stream to the CDN.
     *
     * [`UrlWithErrorCallback`]{@link UrlWithErrorCallback} has the following parameters:
     * - `url`: *string*
     *
     *   The RTMP URL address.
     * - `error`: *ErrorCode*
     *
     *  The detailed error information.
     * @event StreamPublished
     */
    StreamPublished: UrlWithErrorCallback

    /**
     * Reports the result of calling [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
     *
     * **Deprecated**
     *
     * Use [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged} instead.
     *
     * This callback indicates whether you have successfully removed an RTMP stream from the CDN.
     *
     * [`UrlCallback`]{@link UrlCallback} has the following parameters:
     * - `url`: *string*
     *
     *  The RTMP URL address.
     * @event StreamUnpublished
     */
    StreamUnpublished: UrlCallback

    /**
     * Reports the transport-layer statistics of each remote audio stream.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`RemoteAudioStats`]{@link RemoteAudioStats} instead.
     *
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives an audio packet from a remote user.
     *
     * [`TransportStatsCallback`]{@link TransportStatsCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the audio packet.
     * - `delay`: *number*
     *
     *  Network time delay (ms) from the remote user sending the audio packet to the local user.
     * - `lost`: *number*
     *
     *  Packet loss rate (%) of the audio packet sent from the remote user.
     * - `rxKBitRate`: *number*
     *
     *  Received bitrate (Kbps) of the audio packet sent from the remote user.
     * @event RemoteAudioTransportStats
     */
    RemoteAudioTransportStats: TransportStatsCallback

    /**
     * Reports the transport-layer statistics of each remote video stream.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`RemoteVideoStats`]{@link RemoteVideoStats} instead.
     *
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay,
     * once every two seconds after the local user receives the video packet from a remote user.
     *
     * [`TransportStatsCallback`]{@link TransportStatsCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the audio packet.
     * - `delay`: *number*
     *
     *  Network time delay (ms) from the remote user sending the video packet to the local user.
     * - `lost`: *number*
     *
     *  Packet loss rate (%) of the video packet sent from the remote user.
     * - `rxKBitRate`: *number*
     *
     *  Received bitrate (Kbps) of the video packet sent from the remote user.
     * @event RemoteVideoTransportStats
     */
    RemoteVideoTransportStats: TransportStatsCallback

    /**
     * Occurs when a remote user enables/disables the video module.
     *
     * **Deprecated**
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
     * This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     *
     * [`UidWithEnabledCallback`]{@link UidWithEnabledCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user.
     * - `enabled`: *boolean*
     *
     *  Whether the specific remote user enables/disables the video module:
     *  - true: Enable. The remote user can enter a video session.
     *  - false: Disable. The remote user can only enter a voice session, and cannot send or receive any video stream.
     * @event UserEnableVideo
     */
    UserEnableVideo: UidWithEnabledCallback

    /**
     * Occurs when a remote user enables/disables the local video capture function.
     *
     * **Deprecated**
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
     * [`UidWithEnabledCallback`]{@link UidWithEnabledCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user.
     * - `enabled`: *boolean*
     *
     *  Whether the specific remote user enables/disables the local video capturing function:
     *  - true: Enabled. Other users in the channel can see the video of this remote user.
     *  - false: Disabled. Other users in the channel can no longer receive the video stream from this remote user, while this remote user can still receive the video streams from other users.
     * @event UserEnableLocalVideo
     */
    UserEnableLocalVideo: UidWithEnabledCallback

    /**
     * Occurs when the first remote video frame is received and decoded.
     *
     * **Deprecated**
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
     * [`VideoFrameWithUidCallback`]{@link VideoFrameWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the video streams.
     * - `width`: *number*
     *
     *  Width (pixels) of the video stream.
     * - `height`: *number*
     *
     *  Height (pixels) of the video stream.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@link joinChannel} until this callback is triggered.
     * @event FirstRemoteVideoDecoded
     */
    FirstRemoteVideoDecoded: VideoFrameWithUidCallback

    /**
     * Occurs when the microphone is enabled/disabled.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`Stopped`]{@link AudioLocalState.Stopped} or [`Recording`]{@link AudioLocalState.Recording} in the [`LocalAudioStateChanged`]{@link LocalAudioStateChanged} callback instead.
     *
     * The SDK triggers this callback when the local user resumes or stops capturing the local audio stream by calling [`enableLocalAudio`]{@link RtcEngine.enableLocalAudio}.
     *
     *
     * @event MicrophoneEnabled
     */
    MicrophoneEnabled: EnabledCallback

    /**
     * Occurs when the connection between the SDK and the server is interrupted.
     *
     * **Deprecated**
     *
     * Use {@link ConnectionStateChanged} instead.
     *
     * The SDK triggers this callback when it loses connection to the server for more than four seconds after
     * the connection is established. After triggering this callback, the SDK tries to reconnect to the server.
     * You can use this callback to implement pop-up reminders. This callback is different from [`ConnectionLost`]{@link ConnectionLost}:
     * - The SDK triggers the [`ConnectionInterrupted`]{@link ConnectionInterrupted} callback when the SDK loses connection with the server for more than four seconds after it joins the channel.
     * - The SDK triggers the [`ConnectionLost`]{@link ConnectionLost} callback when it loses connection with the server for more than 10 seconds, regardless of whether it joins the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionInterrupted
     */
    ConnectionInterrupted: EmptyCallback

    /**
     * Occurs when your connection is banned by the Agora Server.
     *
     * **Deprecated**
     *
     * Use {@link ConnectionStateChanged} instead.
     *
     * @event ConnectionBanned
     */
    ConnectionBanned: EmptyCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     *
     * **Deprecated**
     *
     * Use [`RemoteAudioStats`]{@link RemoteAudioStats} instead.
     *
     * The SDK triggers this callback once every two seconds to report the audio quality of each remote user/host sending an audio stream. If a channel has multiple remote users/hosts sending audio streams, the SDK trggers this callback as many times.
     *
     * [`AudioQualityCallback`]{@link AudioQualityCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the speaker.
     * - `quality`: *number*
     *
     *  Time delay (ms) of the audio packet from the sender to the receiver, including the time delay from audio sampling pre-processing, transmission, and the jitter buffer.
     * Audio quality of the user.
     * - `delay`: *number*
     *
     *  Packet loss rate (%) of the audio packet sent from the sender to the receiver.
     * - `lost`: *number*
     * @event AudioQuality
     */
    AudioQuality: AudioQualityCallback

    /**
     * Occurs when the camera is turned on and ready to capture video.
     *
     * **Deprecated**
     *
     * Use [`Capturing`]{@link LocalVideoStreamState.Capturing} in the [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} callback instead.
     * If the camera fails to turn on, fix the error reported in the [`Error`]{@link Error} callback.
     *
     * @event CameraReady
     */
    CameraReady: EmptyCallback

    /**
     * Occurs when the video stops playing.
     *
     * **Deprecated**
     *
     * Use [`Stopped`]{@link LocalVideoStreamState.Stopped} in the [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} callback instead. The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops playing.
     *
     * @event VideoStopped
     */
    VideoStopped: EmptyCallback

    /**
     * Occurs when the local user receives the metadata.
     *
     * [`MetadataCallback`]{@link MetadataCallback} has the following parameters:
     * - `buffer`: *string*
     *
     *  The received metadata.
     * - `uid`: *number*
     *
     *  The ID of the user who sent the metadata.
     * - `timeStampMs`: *number*
     *
     *  The timestamp (ms) of the received metadata.
     * @event MetadataReceived
     */
    MetadataReceived: MetadataCallback
}

/**
 * The RtcChannelEvents interface.
 */
export interface RtcChannelEvents {
    /**
     * Reports the warning code of the {@link RtcChannel} instance.
     *
     * [`WarningCallback`]{@link WarningCallback} has the following parameters:
     * - `warn`: [`WarningCode`]{@link WarningCode}.
     *
     *  Warning code.
     * @event Warning
     */
    Warning: WarningCallback

    /**
     * Reports the error code of the {@link RtcChannel} instance.
     *
     * [`ErrorCallback`]{@link ErrorCallback} has the following parameters:
     * - `err`: [`ErrorCode`]{@link ErrorCode}
     *
     *  Error code.
     * @event Error
     */
    Error: ErrorCallback

    /**
     * Occurs when the local user joins a specified channel.
     *
     * If the uid is not specified when calling [`joinChannel`]{@link RtcChannel.joinChannel}, the server automatically assigns a uid.
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this callback is triggered.
     *
     *
     * @event JoinChannelSuccess
     */
    JoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     *
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from starting to reconnect until this callback is triggered.
     *
     * @event RejoinChannelSuccess
     */
    RejoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user leaves the channel.
     *
     * When a user leaves the channel by using the [`leaveChannel`]{@link RtcChannel.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
     *
     * With this callback, the app retrieves the channel information, such as the call duration and statistics.
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} has the following parameters:
     * - `RtcStats`：[`RtcStats`]{@link RtcStats}
     *
     *  Statistics of the call.
     * @event LeaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the user role switches in a Live-Broadcast channel. For example, from broadcaster to audience or vice versa.
     *
     * The SDK triggers this callback when the local user switches the user role by calling the {@link RtcChannel.setClientRole} method after joining the channel.
     *
     * [`ClientRoleCallback`]{@link ClientRoleCallback} has the following parameters:
     * - `oldRole`: [`ClientRole`]{@link ClientRole}
     *
     *  Role that the user switches from.
     * - `newRole`: [`ClientRole`]{@link ClientRole}
     *
     *  Role that the user switches to.
     * @event ClientRoleChanged
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live-Broadcast) joins the channel.
     * - Communication profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - Live-Broadcast profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel.
     *
     * **Note**
     * - In the Live-Broadcast profile:
     *  - The host receives this callback when another host joins the channel.
     *  - The audience in the channel receives this callback when a new host joins the channel.
     *  - When a web app joins the channel, this callback is triggered as long as the web app publishes streams.
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user or host who joins the channel.
     * - `elapsed`: *number*
     *
     *  Time delay (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel}/[`setClientRole`]{@link RtcEngine.setClientRole}setClientRole
     * until this callback is triggered.
     * @event UserJoined
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live Broadcast) leaves the channel.
     *
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/broadcaster leaves the channel, the user/broadcaster sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Go offline: When no data packet of the user or broadcaster is received for a certain period of time (around 20 seconds), the SDK assumes that the user/broadcaster drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     *
     * [`UserOfflineCallback`]{@link UserOfflineCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user or host who leaves the channel or goes offline.
     * -` reason`: [`UserOfflineReason`]{@link UserOfflineReason}
     *
     * - Reason why the user goes offline.
     * @event UserOffline
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     *
     * The Agora SDK triggers this callback to report on the current network connection state when it changes, and the reason to such change.
     *
     * [`ConnectionStateCallback`]{@link ConnectionStateCallback} has the following parameters:
     * - `state`: [`ConnectionStateType`][@link ConnectionStateType]
     *
     *  The current network connection state.
     * - `reason`: [`ConnectionChangedReason`]{@link ConnectionChangedReason}
     *
     *  The reason causing the change of the connection state.
     * @event ConnectionStateChanged
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     *
     * The SDK also triggers this callback when it cannot connect to the server 10 seconds after calling [`joinChannel`]{@link RtcChannel.joinChannel}, regardless of whether it is in the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionLost
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     *
     * The user becomes offline if the token used when joining the channel expires. This callback is
     * triggered 30 seconds before the token expires, to remind the app to get a new token. Upon receiving this callback,
     * you need to generate a new token on the server and call [`renewToken`]{@link RtcChannel.renewToken} to pass the new token to the SDK.
     *
     * [`TokenCallback`]{@link TokenCallback} has the following parameters:
     * - `token`: *string*
     *
     *  The token that will expire in 30 seconds.
     * @event TokenPrivilegeWillExpire
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     *
     * After a token is specified when joining the channel, the token expires after a certain period of time,
     * and a new token is required to reconnect to the server.
     * This callback notifies the app to generate a new token and call [`renewToken`]{@link RtcChannel.renewToken} to renew the token.
     *
     * @event RequestToken
     */
    RequestToken: EmptyCallback

    /**
     * Reports which user is the loudest speaker.
     *
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling {@link RtcEngine.enableAudioVolumeIndication}, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     *
     * **Note**
     * - To receive this callback, you need to call {@link RtcEngine.enableAudioVolumeIndication}.
     * - This callback reports the ID of the user with the highest voice volume during a period of time, instead of at the moment.
     *
     * [`UidCallback`]{@link UidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the active speaker. A `uid` of 0 represents the local user.
     * @event ActiveSpeaker
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     *
     * [`VideoSizeCallback`]{@link VideoSizeCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user or local user (0) whose video size or rotation changes.
     * - `width`: *number*
     *
     *  New width (pixels) of the video.
     * - `height`: *number*
     *
     *  New height (pixels) of the video.
     * - `rotation`: *number*
     *
     *  New rotation of the video [0 to 360).
     * @event VideoSizeChanged
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     *
     * [`RemoteVideoStateCallback`]{@link RemoteVideoStateCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the remote user whose video state changes.
     * - `state`: [`VideoRemoteState`]{@link VideoRemoteState}
     *
     *  State of the remote video.
     * - `reason`: [`VideoRemoteStateReason`]{@link VideoRemoteStateReason}
     *
     *  The reason of the remote video state change.
     * - `elapsed`: *number*
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@ink RtcEngine.joinChannel} until the SDK triggers this callback.
     *
     * @event RemoteVideoStateChanged
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     *
     * This callback indicates the state change of the remote audio stream.
     *
     * [`RemoteAudioStateCallback`]{@link RemoteAudioStateCallback } has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user whose audio state changes.
     * - `state`: [`AudioRemoteState`]{@link AudioRemoteState}
     *
     *  State of the remote audio.
     * - `reason`: [`AudioRemoteStateReason`]{@link AudioRemoteStateReason}
     *
     *  The reason of the remote audio state change.
     * - `elapsed`: number
     *
     *  Time elapsed (ms) from the local user calling [`joinChannel`]{@ink RtcEngine.joinChannel} until the SDK triggers this callback.
     * @event RemoteAudioStateChanged
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call {@link RtcEngine.setLocalPublishFallbackOption} and set option as {@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     *
     * [`FallbackCallback`]{@link FallbackCallback} has the following parameters:
     * - `isFallbackOrRecover`: *boolean*
     *
     *  Whether the published stream fell back to audio-only or switched back to the video:
     *  - true: The published stream fell back to audio-only due to poor network conditions.
     *  - false: The published stream switched back to the video after the network conditions improved.
     * @event LocalPublishFallbackToAudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the remote media stream falls back to audio-only mode due to poor uplink conditions, or when the remote media stream switches back to the video after the uplink network condition improves.
     *
     * **Note**
     * - Once the remote media stream is switched to the low stream due to poor network conditions, you can monitor the stream switch between a high and low stream in the {@link RemoteVideoStats} callback.
     *
     * [`FallbackWithUidCallback`]{@link FallbackWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     * ID of the remote user sending the stream.
     * - `isFallbackOrRecover`: *boolean*
     *
     *  Whether the remote media stream fell back to audio-only or switched back to the video:
     *  - true: The remote media stream fell back to audio-only due to poor network conditions.
     *  - false: The remote media stream switched back to the video stream after the network conditions improved.
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Reports the statistics of the {@link RtcEngine} once every two seconds.
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} has the following parameters:
     * - `stats`: [`RtcStats`]{@link RtcStats}
     *
     *  RTC engine statistics.
     * @event RtcStats
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     *
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     *
     * [`NetworkQualityWithUidCallback`]{@link NetworkQualityWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID. The network quality of the user with this uid is reported.
     * If `uid` is 0, the local network quality is reported.
     * - `txQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *   Uplink transmission quality of the user in terms of the transmission bitrate, packet loss rate, average RTT (Round-Trip Time)
     * and jitter of the uplink network. `txQuality` is a quality rating helping you understand how well the current uplink
     * network conditions can support the selected VideoEncoderConfiguration. For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution of 680 × 480 and a frame rate of 30 fps, but may be inadequate for resolutions higher than 1280 × 720.
     * - `rxQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *  Downlink network quality rating of the user in terms of packet loss rate, average RTT, and jitter of the downlink network.
     * @event NetworkQuality
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the statistics of the video stream from each remote user/broadcaster. The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * [`RemoteVideoStatsCallback`]{@link RemoteVideoStatsCallback} has the following parameters:
     * - `stats`: [`RemoteVideoStats`]{@link RemoteVideoStats}
     *
     *  Statistics of the received remote video streams.
     * @event RemoteVideoStats
     */
    RemoteVideoStats: RemoteVideoStatsCallback

    /**
     * Reports the statistics of the audio stream from each remote user/broadcaster.
     *
     * The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     *
     * [`RemoteAudioStatsCallback`]{@link RemoteAudioStatsCallback} has the following parameters:
     * - `stats`: [`RemoteAudioStats`]{@link RemoteAudioStats}
     *
     *  Statistics of the received remote audio streams.
     * @event RemoteAudioStats
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     *
     * The SDK triggers this callback to report the result of the local user calling the {@link RtcChannel.addPublishStreamUrl} or {@link RtcChannel.removePublishStreamUrl} method. This callback returns the URL and its current streaming state. When the streaming state is {@link RtmpStreamingState.Failure}, see the errCode parameter for details.
     *
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     *
     * [`RtmpStreamingStateCallback`]{@link RtmpStreamingStateCallback} has the following parameters:
     * - `url`: *string*
     *
     *  The RTMP URL address.
     * - `state`: *RtmpStreamingState*
     *
     *  The RTMP streaming state.
     * - `errCode`: *RtmpStreamingErrorCode*
     *
     *  The detailed error information for streaming.
     * @event RtmpStreamingStateChanged
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

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
    TranscodingUpdated: EmptyCallback

    /**
     * Reports the status of injecting the online media stream.
     *
     * [`StreamInjectedStatusCallback`]{@link StreamInjectedStatusCallback} has the following parameters:
     * - `url`: *string*
     *
     *  The URL address of the externally injected stream.
     * - `uid`: *number*
     *
     *  User ID.
     * - `status`: [`InjectStreamStatus`]{@link InjectStreamStatus}
     *
     *  State of the externally injected stream.
     * @event StreamInjectedStatus
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     *
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the {@link RtcChannel.sendStreamMessage} method.
     *
     * [`StreamMessageCallback`]{@link StreamMessageCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the data stream.
     * - `streamId`: *number*
     *
     *  Stream ID.
     * - `data`: *string*
     *
     *  Data received by the local user.
     * @event StreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     *
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the {@link RtcChannel.sendStreamMessage} method.
     *
     * [`StreamMessageErrorCallback`]{@link StreamMessageErrorCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  User ID of the remote user sending the data stream.
     * - `streamId`: *number*
     *
     *  Stream ID.
     * - `error`: [`ErrorCode`]{@link ErrorCode}
     *  Error code.
     * - `missed`: *number*
     *
     *  The number of lost messages.
     * - `cached`: *number*
     *
     *  The number of incoming cached messages when the data stream is interrupted.
     * @event StreamMessageError
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the state of the media stream relay changes.
     *
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     *
     * [`MediaRelayStateCallback`]{@link MediaRelayStateCallback} has the following parameters:
     * - `state`: [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}
     *
     *  The state code.
     * - `code`: [`ChannelMediaRelayError`]{@link ChannelMediaRelayError}
     *
     *  The error code.
     * @event ChannelMediaRelayStateChanged
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     *
     * [`MediaRelayEventCallback`]{@link MediaRelayEventCallback} has the following parameters:
     * - `code`: [`ChannelMediaRelayEvent`]{@link ChannelMediaRelayEvent}
     *
     *  The event code for media stream relay.
     * @event ChannelMediaRelayEvent
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the local user receives the metadata.
     *
     * [`MetadataCallback`]{@link MetadataCallback} has the following parameters:
     * - `buffer`: *string*
     *
     *  The received metadata.
     * - `uid`: *number*
     *
     *  The ID of the user who sent the metadata.
     * - `timeStampMs`: *number*
     *
     *  The timestamp (ms) of the received metadata.
     * @event MetadataReceived
     */
    MetadataReceived: MetadataCallback
}
