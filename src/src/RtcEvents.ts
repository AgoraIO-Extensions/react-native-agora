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
export type UidCallback = (uid: number) => void
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
 * The SDK uses the RtcEngineEvents interface class to send callbacks to the application, and the application inherits the methods of this interface class to retrieve these callbacks.
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
     * For instance, the SDK may report a {@link WarningCode.LookupChannelTimeout} warning upon disconnection with the server and tries to reconnect. For detailed warning codes, see {@link WarningCode}.
     *
     * @event Warning
     */
    Warning: WarningCallback

    /**
     * Reports an error during SDK runtime.
     *
     * In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
     *
     * For example, the SDK reports an {@link ErrorCode.StartCall} error when failing to initialize a call. The app informs the user that the call initialization failed and invokes the {@link RtcEngine.leaveChannel} method to leave the channel. For detailed error codes, see {@link ErrorCode}.
     *
     * @event Error
     */
    Error: ErrorCallback

    /**
     * Occurs when an API method is executed.
     *
     * @event ApiCallExecuted
     */
    ApiCallExecuted: ApiCallCallback

    /**
     * Occurs when the local user joins a specified channel.
     *
     * The channel name assignment is based on channelName specified in the joinChannel method.
     *
     * If the uid is not specified when {@link RtcEngine.joinChannel} is called, the server automatically assigns a uid.
     *
     * @event JoinChannelSuccess
     */
    JoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     *
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     *
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
     * @event LeaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the local user registers a user account.
     *
     * This callback is triggered when the local user successfully registers a user account by calling the {@link RtcEngine.registerLocalUserAccount} method, or joins a channel by calling the {@link RtcEngine.joinChannelWithUserAccount} method. This callback reports the user ID and user account of the local user.
     *
     * @event LocalUserRegistered
     */
    LocalUserRegistered: UserAccountCallback

    /**
     * Occurs when the SDK gets the user ID and user account of the remote user.
     *
     * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object ({@link UserInfo}), and triggers this callback on the local client.
     *
     * @event UserInfoUpdated
     */
    UserInfoUpdated: UserInfoCallback

    /**
     * Occurs when the user role switches in a live broadcast. For example, from a host to an audience or vice versa.
     *
     * The SDK triggers this callback when the local user switches the user role by calling the {@link RtcEngine.setClientRole} method after joining the channel.
     *
     * @event ClientRoleChanged
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user (Communication)/host (Live Broadcast) joins the channel.
     * - Communication profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - Live Broadcast profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel
     *
     * The SDK triggers this callback under one of the following circumstances:
     * - A remote user/host joins the channel by calling the {@link RtcEngine.joinChannel} method.
     * - A remote user switches the user role to the host by calling the {@link RtcEngine.setClientRole} method after joining the channel.
     * - A remote user/host rejoins the channel after a network interruption.
     * - The host injects an online media stream into the channel by calling the {@link RtcEngine.addInjectStreamUrl} method.
     *
     * **Note**
     * - In the Live Broadcast profile:
     *  - The host receives the onUserJoined callback when another host joins the channel.
     *  - The audience in the channel receives the onUserJoined callback when a new host joins the channel.
     *  - When a web application joins the channel, the onUserJoined callback is triggered as long as the web application publishes streams.
     *
     * @event UserJoined
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user (Communication)/host (Live Broadcast) leaves the channel.
     *
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     *
     * @event UserOffline
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     *
     * The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason to such change.
     *
     * @event ConnectionStateChanged
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the network type changes.
     *
     * The SDK returns the current network type in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
     *
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
     * @event TokenPrivilegeWillExpire
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     *
     * After a token is specified when joining the channel, the token expires after a certain period of time, and a new token is required to reconnect to the server. This callback notifies the app to generate a new token and call {@link RtcEngine.joinChannel} to rejoin the channel with the new token.
     *
     * @event RequestToken
     */
    RequestToken: EmptyCallback

    /**
     * Reports which users are speaking and the speakers' volume, and whether the local user is speaking.
     *
     * This callback reports the IDs and volumes of the loudest speakers (at most 3) at the moment in the channel, and whether the local user is speaking.
     *
     * By default, this callback is disabled. You can enable it by calling the {@link RtcEngine.enableAudioVolumeIndication} method. Once enabled, this callback is triggered at the set interval, regardless of whether a user speaks or not.
     *
     * The SDK triggers two independent onAudioVolumeIndication callbacks at one time, which separately report the volume information of the local user and all the remote speakers. For more information, see the detailed parameter descriptions.
     *
     * **Note**
     * - To enable the voice activity detection of the local user, ensure that you set report_vad(true) in the {@link RtcEngine.enableAudioVolumeIndication} method.
     * - Calling the {@link RtcEngine.muteLocalAudioStream} method affects the SDK's behavior.
     *  - If the local user calls the {@link RtcEngine.muteLocalAudioStream} method, the SDK stops triggering the local user's callback.
     *  - 20 seconds after a remote speaker calls the {@link RtcEngine.muteLocalAudioStream} method, the remote speakers' callback does not include information of this remote user; 20 seconds after all remote users call the the muteLocalAudioStream method, the SDK stops triggering the remote speakers' callback.
     *
     * @event AudioVolumeIndication
     */
    AudioVolumeIndication: AudioVolumeCallback

    /**
     * Reports which user is the loudest speaker.
     *
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling {@link RtcEngine.enableAudioVolumeIndication}, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     *
     * **Note**
     * - To receive this callback, you need to call {@link RtcEngine.enableAudioVolumeIndication}.
     * - This callback returns the user ID of the user with the highest voice volume during a period of time, instead of at the moment.
     *
     * @event ActiveSpeaker
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the first local audio frame is sent.
     *
     * @event FirstLocalAudioFrame
     */
    FirstLocalAudioFrame: ElapsedCallback

    /**
     * Occurs when the first local video frame is rendered.
     *
     * This callback is triggered after the first local video frame is rendered on the local video window.
     *
     * @event FirstLocalVideoFrame
     */
    FirstLocalVideoFrame: VideoFrameCallback

    /**
     * Occurs when a remote user stops/resumes sending the video stream.
     *
     * @deprecated This callback is deprecated. Use the {@link RemoteVideoStateChanged} callback with the following parameters for the same function:
     * - {@link VideoRemoteState.Stopped} and {@link VideoRemoteStateReason.RemoteMuted}.
     * - {@link VideoRemoteState.Decoding} and {@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user stops or resumes sending the video stream by calling the {@link RtcEngine.muteLocalVideoStream} method.
     *
     * **Note**
     * - This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     *
     * @event UserMuteVideo
     */
    UserMuteVideo: UidWithMutedCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     *
     * @event VideoSizeChanged
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     *
     * @event RemoteVideoStateChanged
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the local video state changes.
     *
     * The SDK returns the current video state in this callback. When the state is {@link LocalVideoStreamState.Failed}, see the error parameter for details.
     *
     * **Note**
     * - This callback reports the current state of the local video, which keeps changing throughout the RtcEngine life cycle. We recommend maintaining the states reported in this callback, and check the local video state before starting the local camera. If the SDK reports {@link LocalVideoStreamError.CaptureFailure}, the local camera is occupied by either the system or a third-party app. To access the camera, call {@link RtcEngine.enableLocalVideo} (false) first, and then {@link RtcEngine.enableLocalVideo} (video).
     *
     * @event LocalVideoStateChanged
     */
    LocalVideoStateChanged: LocalVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     *
     * This callback indicates the state change of the remote audio stream.
     *
     * @event RemoteAudioStateChanged
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the local audio stream state changes.
     *
     * This callback indicates the state change of the local audio stream, including the state of the audio recording and encoding, and allows you to troubleshoot issues when exceptions occur.
     *
     * **Note**
     * - When the state is {@link AudioLocalState.Failed}, see the error parameter for details.
     *
     * @event LocalAudioStateChanged
     */
    LocalAudioStateChanged: LocalAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call {@link RtcEngine.setLocalPublishFallbackOption} and set option as {@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     *
     * @event LocalPublishFallbackToAudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call {@link RtcEngine.setRemoteSubscribeFallbackOption} and set option as {@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the remotely subscribed media stream falls back to audio-only mode due to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after the uplink network condition improves.
     *
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Occurs when the local audio playback route changes.
     *
     * This callback returns that the audio route switched to an earpiece, speakerphone, headset, or Bluetooth device.
     *
     * The definition of the routing is listed as follows:
     * - {@link AudioOutputRouting}
     *
     * @event AudioRouteChanged
     */
    AudioRouteChanged: AudioRouteCallback

    /**
     * Occurs when the camera focus area is changed.
     *
     * The SDK triggers this callback when the local user changes the camera focus position by calling the {@link RtcEngine.setCameraFocusPositionInPreview} method.
     *
     * @event CameraFocusAreaChanged
     */
    CameraFocusAreaChanged: RectCallback

    /**
     * The camera exposure area has changed.
     *
     * The SDK triggers this callback when the local user changes the camera exposure position by calling the {@link RtcEngine.setCameraExposurePosition} method.
     *
     * @event CameraExposureAreaChanged
     */
    CameraExposureAreaChanged: RectCallback

    /**
     * Reports the face detection result of the local user.
     *
     * Once you enable face detection by calling {@link RtcEngine.enableFaceDetection}, you can get the following information on the local user in real-time:
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
    FacePositionChanged: FacePositionCallback

    /**
     * Reports the statistics of the {@link RtcEngine} once every two seconds.
     *
     * @event RtcStats
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of the local user once every two seconds before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server. After the application calls the {@link RtcEngine.enableLastmileTest} method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.
     *
     * @event LastmileQuality
     */
    LastmileQuality: NetworkQualityCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     *
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     *
     * @event NetworkQuality
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the last-mile network probe result.
     *
     * The SDK triggers this callback within 30 seconds after the app calls the {@link RtcEngine.startLastmileProbeTest} method.
     *
     * @event LastmileProbeResult
     */
    LastmileProbeResult: LastmileProbeCallback

    /**
     * Reports the statistics of the local video streams.
     *
     * The SDK triggers this callback once every two seconds for each user/host. If there are multiple users/hosts in the channel, the SDK triggers this callback as many times.
     *
     * @event LocalVideoStats
     */
    LocalVideoStats: LocalVideoStatsCallback

    /**
     * Reports the statistics of the local audio stream.
     *
     * @event LocalAudioStats
     */
    LocalAudioStats: LocalAudioStatsCallback

    /**
     * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
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
     * @event RemoteAudioStats
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the audio mixing file playback finishes.
     *
     * @deprecated This callback is deprecated. Use {@link AudioMixingStateChanged} instead.
     *
     * You can start an audio mixing file playback by calling the {@link RtcEngine.startAudioMixing} method. This callback is triggered when the audio mixing file playback finishes.
     *
     * If the {@link RtcEngine.startAudioMixing} method call fails, an {@link WarningCode.AudioMixingOpenError} warning returns in the {@link Warning} callback.
     *
     * @event AudioMixingFinished
     */
    AudioMixingFinished: EmptyCallback

    /**
     * Occurs when the state of the local user's audio mixing file changes.
     *
     * When you call the {@link RtcEngine.startAudioMixing} method and the state of audio mixing file changes, the Agora SDK triggers this callback.
     * - When the audio mixing file plays, pauses playing, or stops playing, this callback returns 710, 711, or 713 in state, and 0 in errorCode.
     * - When exceptions occur during playback, this callback returns 714 in state and an error in errorCode.
     * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns {@link WarningCode.AudioMixingOpenError}.
     *
     * @event AudioMixingStateChanged
     */
    AudioMixingStateChanged: AudioMixingStateCallback

    /**
     * Occurs when the audio effect file playback finishes.
     *
     * You can start a local audio effect playback by calling the {@link RtcEngine.playEffect} method. This callback is triggered when the local audio effect file playback finishes.
     *
     * @event AudioEffectFinished
     */
    AudioEffectFinished: SoundIdCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     *
     * The SDK triggers this callback to report the result of the local user calling the {@link RtcEngine.addPublishStreamUrl} or {@link RtcEngine.removePublishStreamUrl} method. This callback returns the URL and its current streaming state. When the streaming state is {@link RtmpStreamingState.Failure}, see the errCode parameter for details.
     *
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     *
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
     * @event StreamInjectedStatus
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     *
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the {@link RtcEngine.sendStreamMessage} method.
     *
     * @event StreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     *
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the {@link RtcEngine.sendStreamMessage} method.
     *
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
     * @event ChannelMediaRelayStateChanged
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     *
     * @event ChannelMediaRelayEvent
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the first remote video frame is rendered.
     *
     * @deprecated Use {@link VideoRemoteState.Starting} or {@link VideoRemoteState.Decoding} in the {@link RemoteVideoStateChanged} callback instead.
     *
     * This callback is triggered after the first frame of the remote video is rendered on the video window. The application can retrieve the data of the time elapsed from the user joining the channel until the first video frame is displayed.
     *
     * @event FirstRemoteVideoFrame
     */
    FirstRemoteVideoFrame: VideoFrameWithUidCallback

    /**
     * Occurs when the first remote audio frame is received.
     *
     * @deprecated Use {@link AudioRemoteState.Starting} in {@link RemoteAudioStateChanged} instead.
     *
     * @event FirstRemoteAudioFrame
     */
    FirstRemoteAudioFrame: UidWithElapsedCallback

    /**
     * Occurs when the engine receives the first audio frame from a specified remote user.
     *
     * @deprecated Use {@link VideoRemoteState.Decoding} in {@link RemoteAudioStateChanged} instead.
     *
     * This callback is triggered in either of the following scenarios：
     * - The remote user joins the channel and sends the audio stream.
     * - The remote user stops sending the audio stream and re-sends it after 15 seconds. Possible reasons include:
     *  - The remote user leaves channel.
     *  - The remote user drops offline.
     *  - The remote user calls the {@link RtcEngine.muteLocalAudioStream} method.
     *  - The remote user calls the {@link RtcEngine.disableAudio} method.
     *
     * @event FirstRemoteAudioDecoded
     */
    FirstRemoteAudioDecoded: UidWithElapsedCallback

    /**
     * Occurs when a remote user stops/resumes sending the audio stream.
     *
     * @deprecated Use the {@link RemoteAudioStateChanged} callback with the following parameters instead:
     * - {@link VideoRemoteState.Stopped} and {@link VideoRemoteStateReason.RemoteMuted}.
     * - {@link VideoRemoteState.Decoding} and {@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the {@link RtcEngine.muteLocalAudioStream} method.
     *
     * **Note**
     * - This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     *
     * @event UserMuteAudio
     */
    UserMuteAudio: UidWithMutedCallback

    /**
     * Reports the result of calling the {@link RtcEngine.addPublishStreamUrl} method.
     *
     * @deprecated Use {@link RtmpStreamingStateChanged} instead.
     *
     * This callback indicates whether you have successfully added an RTMP stream to the CDN.
     *
     * @event StreamPublished
     */
    StreamPublished: UrlWithErrorCallback

    /**
     * Reports the result of calling the {@link RtcEngine.removePublishStreamUrl} method.
     *
     * @deprecated Use {@link RtmpStreamingStateChanged} instead.
     *
     * This callback indicates whether you have successfully removed an RTMP stream from the CDN.
     *
     * @event StreamUnpublished
     */
    StreamUnpublished: UrlCallback

    /**
     * Reports the transport-layer statistics of each remote audio stream.
     *
     * @deprecated This callback is deprecated. Use {@link RemoteAudioStats} instead.
     *
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives an audio packet from a remote user.
     *
     * @event RemoteAudioTransportStats
     */
    RemoteAudioTransportStats: TransportStatsCallback

    /**
     * Reports the transport-layer statistics of each remote video stream.
     *
     * @deprecated This callback is deprecated. Use {@link RemoteVideoStats} instead.
     *
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives the video packet from a remote user.
     *
     * @event RemoteVideoTransportStats
     */
    RemoteVideoTransportStats: TransportStatsCallback

    /**
     * Occurs when a remote user enables/disables the video module.
     *
     * @deprecated This callback is deprecated and replaced by the {@link RemoteVideoStateChanged} callback with the following parameters:
     * - {@link VideoRemoteState.Stopped} and {@link VideoRemoteStateReason.RemoteMuted}.
     * - {@link VideoRemoteState.Decoding} and {@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * Once the video module is disabled, the remote user can only use a voice call. The remote user cannot send or receive any video from other users.
     *
     * The SDK triggers this callback when the remote user enables or disables the video module by calling the {@link RtcEngine.enableVideo} or {@link RtcEngine.disableVideo} method.
     *
     * **Note**
     * - This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     *
     * @event UserEnableVideo
     */
    UserEnableVideo: UidWithEnabledCallback

    /**
     * Occurs when a remote user enables/disables the local video capture function.
     *
     * @deprecated This callback is deprecated and replaced by the {@link RemoteVideoStateChanged} callback with the following parameters:
     * - {@link VideoRemoteState.Stopped} and {@link VideoRemoteStateReason.RemoteMuted}.
     * - {@link VideoRemoteState.Decoding} and {@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user resumes or stops capturing the video stream by calling the {@link RtcEngine.enableLocalVideo} method.
     *
     * This callback is only applicable to the scenario when the remote user only wants to watch the remote video without sending any video stream to the other user.
     *
     * @event UserEnableLocalVideo
     */
    UserEnableLocalVideo: UidWithEnabledCallback

    /**
     * Occurs when the first remote video frame is received and decoded.
     *
     * @deprecated This callback is deprecated. Use {@link VideoRemoteState.Starting} or {@link VideoRemoteState.Decoding} in the {@link RemoteVideoStateChanged} callback instead.
     *
     * This callback is triggered in either of the following scenarios:
     * - The remote user joins the channel and sends the video stream.
     * - The remote user stops sending the video stream and re-sends it after 15 seconds. Possible reasons include:
     *  - The remote user leaves channel.
     *  - The remote user drops offline.
     *  - The remote user calls the {@link RtcEngine.muteLocalVideoStream} method.
     *  - The remote user calls the {@link RtcEngine.disableVideo} method.
     *
     * @event FirstRemoteVideoDecoded
     */
    FirstRemoteVideoDecoded: VideoFrameWithUidCallback

    /**
     * Occurs when the microphone is enabled/disabled.
     *
     * @deprecated This callback is deprecated. Use {@link AudioLocalState.Stopped} or {@link AudioLocalState.Recording} in the {@link LocalAudioStateChanged} callback instead.
     *
     * The SDK triggers this callback when the local user resumes or stops capturing the local audio stream by calling the {@link RtcEngine.enableLocalAudio} method.
     *
     * @event MicrophoneEnabled
     */
    MicrophoneEnabled: EnabledCallback

    /**
     * Occurs when the connection between the SDK and the server is interrupted.
     *
     * @deprecated Use {@link ConnectionStateChanged} instead.
     *
     * The SDK triggers this callback when it loses connection to the server for more than four seconds after the connection is established. After triggering this callback, the SDK tries to reconnect to the server. You can use this callback to implement pop-up reminders. This callback is different from {@link ConnectionLost}:
     * - The SDK triggers the {@link ConnectionInterrupted} callback when the SDK loses connection with the server for more than four seconds after it joins the channel.
     * - The SDK triggers the {@link ConnectionLost} callback when it loses connection with the server for more than 10 seconds, regardless of whether it joins the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionInterrupted
     */
    ConnectionInterrupted: EmptyCallback

    /**
     * Occurs when your connection is banned by the Agora Server.
     *
     * @deprecated Use {@link ConnectionStateChanged} instead.
     *
     * @event ConnectionBanned
     */
    ConnectionBanned: EmptyCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     *
     * @deprecated Use {@link RemoteAudioStats} instead.
     *
     * The SDK triggers this callback once every two seconds to report the audio quality of each remote user/host sending an audio stream. If a channel has multiple remote users/hosts sending audio streams, the SDK trggers this callback as many times.
     *
     * @event AudioQuality
     */
    AudioQuality: AudioQualityCallback

    /**
     * Occurs when the camera is turned on and ready to capture video.
     *
     * @deprecated Use {@link LocalVideoStreamState.Capturing} in the {@link LocalVideoStateChanged} callback instead. If the camera fails to turn on, fix the error reported in the {@link Error} callback.
     *
     * @event CameraReady
     */
    CameraReady: EmptyCallback

    /**
     * Occurs when the video stops playing.
     *
     * @deprecated Use {@link LocalVideoStreamState.Stopped} in the {@link LocalVideoStateChanged} callback instead. The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops playing.
     *
     * @event VideoStopped
     */
    VideoStopped: EmptyCallback

    /**
     * Occurs when the local user receives the metadata.
     *
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
     * @event Warning
     */
    Warning: WarningCallback

    /**
     * Reports the error code of the {@link RtcChannel} instance.
     *
     * @event Error
     */
    Error: ErrorCallback

    /**
     * Occurs when the local user joins a specified channel.
     *
     * If the uid is not specified when calling {@link RtcChannel.joinChannel}, the server automatically assigns a uid.
     *
     * @event JoinChannelSuccess
     */
    JoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     *
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     *
     * @event RejoinChannelSuccess
     */
    RejoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user leaves the channel.
     *
     * When a user leaves the channel by using the {@link RtcChannel.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
     *
     * With this callback, the app retrieves the channel information, such as the call duration and statistics.
     *
     * @event LeaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the user role switches in a Live-Broadcast channel. For example, from broadcaster to audience or vice versa.
     *
     * The SDK triggers this callback when the local user switches the user role by calling the {@link RtcChannel.setClientRole} method after joining the channel.
     *
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
     * @event UserOffline
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     *
     * The Agora SDK triggers this callback to report on the current network connection state when it changes, and the reason to such change.
     *
     * @event ConnectionStateChanged
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     *
     * The SDK also triggers this callback when it cannot connect to the server 10 seconds after calling {@link RtcChannel.joinChannel}, regardless of whether it is in the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionLost
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     *
     * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires, to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call {@link RtcChannel.renewToken} to pass the new token to the SDK.
     *
     * @event TokenPrivilegeWillExpire
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     *
     * After a token is specified when joining the channel, the token expires after a certain period of time, and a new token is required to reconnect to the server. This callback notifies the app to generate a new token and call {@link RtcChannel.renewToken} to renew the token.
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
     * @event ActiveSpeaker
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     *
     * @event VideoSizeChanged
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     *
     * @event RemoteVideoStateChanged
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     *
     * This callback indicates the state change of the remote audio stream.
     *
     * @event RemoteAudioStateChanged
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call {@link RtcEngine.setLocalPublishFallbackOption} and set option as {@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     *
     * @event LocalPublishFallbackToAudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call {@link RtcEngine.setRemoteSubscribeFallbackOption} and set option as {@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the remote media stream falls back to audio-only mode due to poor uplink conditions, or when the remote media stream switches back to the video after the uplink network condition improves.
     *
     * **Note**
     * - Once the remote media stream is switched to the low stream due to poor network conditions, you can monitor the stream switch between a high and low stream in the {@link RemoteVideoStats} callback.
     *
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Reports the statistics of the {@link RtcEngine} once every two seconds.
     *
     * @event RtcStats
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     *
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     *
     * @event NetworkQuality
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the statistics of the video stream from each remote user/broadcaster. The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
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
     * @event RtmpStreamingStateChanged
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

    /**
     * Occurs when the publisher's transcoding settings are updated.
     *
     * When the LiveTranscoding class in the {@link RtcChannel.setLiveTranscoding} method updates, the SDK triggers this callback to report the update information.
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
     * @event StreamInjectedStatus
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     *
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the {@link RtcChannel.sendStreamMessage} method.
     *
     * @event StreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     *
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the {@link RtcChannel.sendStreamMessage} method.
     *
     * @event StreamMessageError
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the state of the media stream relay changes.
     *
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     *
     * @event ChannelMediaRelayStateChanged
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     *
     * @event ChannelMediaRelayEvent
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the local user receives the metadata.
     *
     * @event MetadataReceived
     */
    MetadataReceived: MetadataCallback
}
