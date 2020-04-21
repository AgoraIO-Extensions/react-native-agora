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
} from "./Types"

export type Listener = (...args: any[]) => any

export interface Subscription {
    remove(): void
}

type EmptyCallback = () => void
type WarningCallback = (warn: WarningCode) => void
type ErrorCallback = (err: ErrorCode) => void
type ApiCallCallback = (error: ErrorCode, api: string, result: string) => void
type UidWithElapsedAndChannelCallback = (channel: string, uid: number, elapsed: number) => void
type RtcStatsCallback = (stats: RtcStats) => void
type UserAccountCallback = (uid: number, userAccount: string) => void
type UserInfoCallback = (uid: number, userInfo: UserInfo) => void
type ClientRoleCallback = (oldRole: ClientRole, newRole: ClientRole) => void
type UidWithElapsedCallback = (uid: number, elapsed: number) => void
type UserOfflineCallback = (uid: number, reason: UserOfflineReason) => void
type ConnectionStateCallback = (state: ConnectionStateType, reason: ConnectionChangedReason) => void
type NetworkTypeCallback = (type: NetworkType) => void
type TokenCallback = (token: string) => void
type AudioVolumeCallback = (speakers: [AudioVolumeInfo], totalVolume: number) => void
type UidCallback = (uid: number) => void
type ElapsedCallback = (elapsed: number) => void
type VideoFrameCallback = (width: number, height: number, elapsed: number) => void
type UidWithMutedCallback = (uid: number, muted: boolean) => void
type VideoSizeCallback = (uid: number, width: number, height: number, rotation: number) => void
type RemoteVideoStateCallback = (uid: number, state: VideoRemoteState, reason: VideoRemoteStateReason, elapsed: number) => void
type LocalVideoStateCallback = (localVideoState: LocalVideoStreamState, error: LocalVideoStreamError) => void
type RemoteAudioStateCallback = (uid: number, state: AudioRemoteState, reason: AudioRemoteStateReason, elapsed: number) => void
type LocalAudioStateCallback = (state: AudioLocalState, error: AudioLocalError) => void
type FallbackCallback = (isFallbackOrRecover: boolean) => void
type FallbackWithUidCallback = (uid: number, isFallbackOrRecover: boolean) => void
type AudioRouteCallback = (routing: AudioOutputRouting) => void
type RectCallback = (rect: Rect) => void
type NetworkQualityCallback = (quality: NetworkQuality) => void
type NetworkQualityWithUidCallback = (uid: number, txQuality: NetworkQuality, rxQuality: NetworkQuality) => void
type LastmileProbeCallback = (result: LastmileProbeResult) => void
type LocalVideoStatsCallback = (stats: LocalVideoStats) => void
type LocalAudioStatsCallback = (stats: LocalAudioStats) => void
type RemoteVideoStatsCallback = (stats: RemoteVideoStats) => void
type RemoteAudioStatsCallback = (stats: RemoteAudioStats) => void
type AudioMixingStateCallback = (state: AudioMixingStateCode, errorCode: AudioMixingErrorCode) => void
type SoundIdCallback = (soundId: number) => void
type RtmpStreamingStateCallback = (url: string, state: RtmpStreamingState, errCode: RtmpStreamingErrorCode) => void
type StreamInjectedStatusCallback = (url: string, uid: number, status: InjectStreamStatus) => void
type StreamMessageCallback = (uid: number, streamId: number, data: string) => void
type StreamMessageErrorCallback = (uid: number, streamId: number, error: ErrorCode, missed: number, cached: number) => void
type MediaRelayStateCallback = (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void
type MediaRelayEventCallback = (code: ChannelMediaRelayEvent) => void
type VideoFrameWithUidCallback = (uid: number, width: number, height: number, elapsed: number) => void
type UrlWithErrorCallback = (url: string, error: ErrorCode) => void
type UrlCallback = (url: string) => void
type TransportStatsCallback = (uid: number, delay: number, lost: number, rxKBitRate: number) => void
type UidWithEnabledCallback = (uid: number, enabled: boolean) => void
type EnabledCallback = (enabled: boolean) => void
type AudioQualityCallback = (uid: number, quality: number, delay: number, lost: number) => void
type MetadataCallback = (buffer: string, uid: number, timeStampMs: number) => void

export interface RtcEngineEvents {
    /**
     * Reports a warning during SDK runtime.
     * In most cases, the app can ignore the warning reported by the SDK because the SDK can usually fix the issue and resume running.
     * For instance, the SDK may report a LookupChannelTimeout warning upon disconnection with the server and tries to reconnect. For detailed warning codes, see Warning Codes.
     * @see WarningCode.LookupChannelTimeout
     * @see WarningCode
     */
    Warning: WarningCallback

    /**
     * Reports an error during SDK runtime.
     * In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
     * For example, the SDK reports an StartCall error when failing to initialize a call. The app informs the user that the call initialization failed and invokes the leaveChannel method to leave the channel. For detailed error codes, see Error Codes.
     * @see ErrorCode.StartCall
     * @see RtcEngine.leaveChannel
     * @see ErrorCode
     */
    Error: ErrorCallback

    /**
     * Occurs when an API method is executed.
     */
    ApiCallExecuted: ApiCallCallback

    /**
     * Occurs when the local user joins a specified channel.
     * The channel name assignment is based on channelName specified in the joinChannel method.
     * If the uid is not specified when joinChannel is called, the server automatically assigns a uid.
     * @see RtcEngine.joinChannel
     */
    JoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     */
    RejoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user leaves the channel.
     * When the app calls the leaveChannel method, the SDK uses this callback to notify the app when the user leaves the channel.
     * With this callback, the application retrieves the channel information, such as the call duration and statistics.
     * @see RtcEngine.leaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the local user registers a user account.
     * This callback is triggered when the local user successfully registers a user account by calling the registerLocalUserAccount method, or joins a channel by calling the joinChannelWithUserAccount method. This callback reports the user ID and user account of the local user.
     * @see RtcEngine.joinChannelWithUserAccount
     */
    LocalUserRegistered: UserAccountCallback

    /**
     * Occurs when the SDK gets the user ID and user account of the remote user.
     * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object (UserInfo), and triggers this callback on the local client.
     * @see UserInfo
     */
    UserInfoUpdated: UserInfoCallback

    /**
     * Occurs when the user role switches in a live broadcast. For example, from a host to an audience or vice versa.
     * The SDK triggers this callback when the local user switches the user role by calling the setClientRole method after joining the channel.
     * @see RtcEngine.setClientRole
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user (Communication)/host (Live Broadcast) joins the channel.
     * - Communication profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - Live Broadcast profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel
     * The SDK triggers this callback under one of the following circumstances:
     * - A remote user/host joins the channel by calling the joinChannel method.
     * @see RtcEngine.joinChannel
     * - A remote user switches the user role to the host by calling the setClientRole method after joining the channel.
     * @see RtcEngine.setClientRole
     * - A remote user/host rejoins the channel after a network interruption.
     * - The host injects an online media stream into the channel by calling the addInjectStreamUrl method.
     * @see RtcEngine.addInjectStreamUrl
     * Note
     * - In the Live Broadcast profile:
     * -- The host receives the onUserJoined callback when another host joins the channel.
     * -- The audience in the channel receives the onUserJoined callback when a new host joins the channel.
     * -- When a web application joins the channel, the onUserJoined callback is triggered as long as the web application publishes streams.
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user (Communication)/host (Live Broadcast) leaves the channel.
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     * The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason to such change.
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the network type changes.
     * The SDK returns the current network type in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
     */
    NetworkTypeChanged: NetworkTypeCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling joinChannel(), regardless of whether it is in the channel or not.
     * @see RtcEngine.joinChannel
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call renewToken to pass the new token to the SDK.
     * @see RtcEngine.renewToken
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     * After a token is specified when joining the channel, the token expires after a certain period of time, and a new token is required to reconnect to the server. This callback notifies the app to generate a new token and call joinChannel to rejoin the channel with the new token.
     * @see RtcEngine.joinChannel
     */
    RequestToken: EmptyCallback

    /**
     * Reports which users are speaking and the speakers' volume, and whether the local user is speaking.
     * This callback reports the IDs and volumes of the loudest speakers (at most 3) at the moment in the channel, and whether the local user is speaking.
     * By default, this callback is disabled. You can enable it by calling the enableAudioVolumeIndication method. Once enabled, this callback is triggered at the set interval, regardless of whether a user speaks or not.
     * @see RtcEngine.enableAudioVolumeIndication
     * The SDK triggers two independent onAudioVolumeIndication callbacks at one time, which separately report the volume information of the local user and all the remote speakers. For more information, see the detailed parameter descriptions.
     * Note
     * - To enable the voice activity detection of the local user, ensure that you set report_vad(true) in the enableAudioVolumeIndication method.
     * @see RtcEngine.enableAudioVolumeIndication
     * - Calling the muteLocalAudioStream method affects the SDK's behavior.
     * @see RtcEngine.muteLocalAudioStream
     * -- If the local user calls the muteLocalAudioStream method, the SDK stops triggering the local user's callback.
     * @see RtcEngine.muteLocalAudioStream
     * -- 20 seconds after a remote speaker calls the muteLocalAudioStream method, the remote speakers' callback does not include information of this remote user; 20 seconds after all remote users call the the muteLocalAudioStream method, the SDK stops triggering the remote speakers' callback.
     * @see RtcEngine.muteLocalAudioStream
     */
    AudioVolumeIndication: AudioVolumeCallback

    /**
     * Reports which user is the loudest speaker.
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling enableAudioVolumeIndication, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     * @see RtcEngine.enableAudioVolumeIndication
     * Note
     * - To receive this callback, you need to call enableAudioVolumeIndication.
     * @see RtcEngine.enableAudioVolumeIndication
     * - This callback returns the user ID of the user with the highest voice volume during a period of time, instead of at the moment.
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the first local audio frame is sent.
     */
    FirstLocalAudioFrame: ElapsedCallback

    /**
     * Occurs when the first local video frame is rendered.
     * This callback is triggered after the first local video frame is rendered on the local video window.
     */
    FirstLocalVideoFrame: VideoFrameCallback

    /**
     * Occurs when a remote user stops/resumes sending the video stream.
     * @deprecated This callback is deprecated. Use the onRemoteVideoStateChanged callback with the following parameters for the same function:
     * @see RemoteVideoStateChanged
     * - Stopped(0) and RemoteMuted(5).
     * @see VideoRemoteState.Stopped
     * @see VideoRemoteStateReason.RemoteMuted
     * - Decoding(2) and RemoteUnmuted(6).
     * @see VideoRemoteState.Decoding
     * @see VideoRemoteStateReason.RemoteUnmuted
     * The SDK triggers this callback when the remote user stops or resumes sending the video stream by calling the muteLocalVideoStream method.
     * @see RtcEngine.muteLocalVideoStream
     * Note
     * - This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     */
    UserMuteVideo: UidWithMutedCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the local video state changes.
     * The SDK returns the current video state in this callback. When the state is Failed(3), see the error parameter for details.
     * @see LocalVideoStreamState.Failed
     * @see LocalVideoStreamError
     * Note
     * - This callback reports the current state of the local video, which keeps changing throughout the RtcEngine life cycle. We recommend maintaining the states reported in this callback, and check the local video state before starting the local camera. If the SDK reports CaptureFailure(4), the local camera is occupied by either the system or a third-party app. To access the camera, call enableLocalVideo (false) first, and then enableLocalVideo (video).
     * @see LocalVideoStreamError.CaptureFailure
     * @see RtcEngine.enableLocalVideo
     */
    LocalVideoStateChanged: LocalVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     * This callback indicates the state change of the remote audio stream.
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the local audio stream state changes.
     * This callback indicates the state change of the local audio stream, including the state of the audio recording and encoding, and allows you to troubleshoot issues when exceptions occur.
     * Note
     * - When the state is Failed(3), see the error parameter for details.
     * @see AudioLocalState.Failed
     * @see AudioLocalError
     */
    LocalAudioStateChanged: LocalAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setLocalPublishFallbackOption and set option as AudioOnly(2), this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     * @see RtcEngine.setLocalPublishFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setRemoteSubscribeFallbackOption and set option as AudioOnly(2), this callback is triggered when the remotely subscribed media stream falls back to audio-only mode due to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after the uplink network condition improves.
     * @see RtcEngine.setRemoteSubscribeFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Occurs when the local audio playback route changes.
     * This callback returns that the audio route switched to an earpiece, speakerphone, headset, or Bluetooth device.
     * The definition of the routing is listed as follows:
     * @see AudioOutputRouting
     */
    AudioRouteChanged: AudioRouteCallback

    /**
     * Occurs when the camera focus area is changed.
     * The SDK triggers this callback when the local user changes the camera focus position by calling the setCameraFocusPositionInPreview method.
     * @see RtcEngine.setCameraFocusPositionInPreview
     */
    CameraFocusAreaChanged: RectCallback

    /**
     * The camera exposure area has changed.
     * The SDK triggers this callback when the local user changes the camera exposure position by calling the setCameraExposurePosition method.
     * @see RtcEngine.setCameraExposurePosition
     */
    CameraExposureAreaChanged: RectCallback

    /**
     * Reports the statistics of the RtcEngine once every two seconds.
     * @see RtcEngine
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of the local user once every two seconds before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server. After the application calls the enableLastmileTest method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.
     * @see RtcEngine.enableLastmileTest
     */
    LastmileQuality: NetworkQualityCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the last-mile network probe result.
     * The SDK triggers this callback within 30 seconds after the app calls the startLastmileProbeTest method.
     * @see RtcEngine.startLastmileProbeTest
     */
    LastmileProbeResult: LastmileProbeCallback

    /**
     * Reports the statistics of the local video streams.
     * The SDK triggers this callback once every two seconds for each user/host. If there are multiple users/hosts in the channel, the SDK triggers this callback as many times.
     */
    LocalVideoStats: LocalVideoStatsCallback

    /**
     * Reports the statistics of the local audio stream.
     */
    LocalAudioStats: LocalAudioStatsCallback

    /**
     * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     */
    RemoteVideoStats: RemoteVideoStatsCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     * The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the audio mixing file playback finishes.
     * @deprecated This callback is deprecated. Use onAudioMixingStateChanged instead.
     * @see AudioMixingStateChanged
     * You can start an audio mixing file playback by calling the startAudioMixing method. This callback is triggered when the audio mixing file playback finishes.
     * @see RtcEngine.startAudioMixing
     * If the startAudioMixing method call fails, an AudioMixingOpenError warning returns in the onWarning callback.
     * @see RtcEngine.startAudioMixing
     * @see WarningCode.AudioMixingOpenError
     * @see Warning
     */
    AudioMixingFinished: EmptyCallback

    /**
     * Occurs when the state of the local user's audio mixing file changes.
     * When you call the startAudioMixing method and the state of audio mixing file changes, the Agora SDK triggers this callback.
     * @see RtcEngine.startAudioMixing
     * - When the audio mixing file plays, pauses playing, or stops playing, this callback returns 710, 711, or 713 in state, and 0 in errorCode.
     * - When exceptions occur during playback, this callback returns 714 in state and an error in errorCode.
     * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns AudioMixingOpenError = 701.
     * @see WarningCode.AudioMixingOpenError
     */
    AudioMixingStateChanged: AudioMixingStateCallback

    /**
     * Occurs when the audio effect file playback finishes.
     * You can start a local audio effect playback by calling the playEffect method. This callback is triggered when the local audio effect file playback finishes.
     * @see RtcEngine.playEffect
     */
    AudioEffectFinished: SoundIdCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     * The SDK triggers this callback to report the result of the local user calling the addPublishStreamUrl or removePublishStreamUrl method. This callback returns the URL and its current streaming state. When the streaming state is Failure(4), see the errCode parameter for details.
     * @see RtcEngine.addPublishStreamUrl
     * @see RtcEngine.removePublishStreamUrl
     * @see RtmpStreamingState.Failure
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

    /**
     * Occurs when the publisher's transcoding settings are updated.
     * When the LiveTranscoding class in the setLiveTranscoding method updates, the SDK triggers this callback to report the update information.
     * @see RtcEngine.setLiveTranscoding
     * Note
     * - If you call the setLiveTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
     */
    TranscodingUpdated: EmptyCallback

    /**
     * Reports the status of injecting the online media stream.
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcEngine.sendStreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcEngine.sendStreamMessage
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the media engine is loaded.
     */
    MediaEngineLoadSuccess: EmptyCallback

    /**
     * Occurs when the media engine starts.
     */
    MediaEngineStartCallSuccess: EmptyCallback

    /**
     * Occurs when the state of the media stream relay changes.
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the first remote video frame is rendered.
     * @deprecated Use Starting(1) or Decoding(2) in the onRemoteVideoStateChanged callback instead.
     * @see VideoRemoteState.Starting
     * @see VideoRemoteState.Decoding
     * @see RemoteVideoStateChanged
     * This callback is triggered after the first frame of the remote video is rendered on the video window. The application can retrieve the data of the time elapsed from the user joining the channel until the first video frame is displayed.
     */
    FirstRemoteVideoFrame: VideoFrameWithUidCallback

    /**
     * Occurs when the first remote audio frame is received.
     * @deprecated Use Starting(1) in onRemoteAudioStateChanged instead.
     * @see AudioRemoteState.Starting
     * @see RemoteAudioStateChanged
     */
    FirstRemoteAudioFrame: UidWithElapsedCallback

    /**
     * Occurs when the engine receives the first audio frame from a specified remote user.
     * @deprecated Use Decoding(2) in onRemoteAudioStateChanged instead.
     * @see VideoRemoteState.Decoding
     * @see RemoteAudioStateChanged
     * This callback is triggered in either of the following scenarios：
     * - The remote user joins the channel and sends the audio stream.
     * - The remote user stops sending the audio stream and re-sends it after 15 seconds. Possible reasons include:
     * -- The remote user leaves channel.
     * -- The remote user drops offline.
     * -- The remote user calls the muteLocalAudioStream method.
     * @see RtcEngine.muteLocalAudioStream
     * -- The remote user calls the disableAudio method.
     * @see RtcEngine.disableAudio
     */
    FirstRemoteAudioDecoded: UidWithElapsedCallback

    /**
     * Occurs when a remote user stops/resumes sending the audio stream.
     * @deprecated Use the onRemoteAudioStateChanged callback with the following parameters instead:
     * @see RemoteAudioStateChanged
     * - Stopped(0) and RemoteMuted(5).
     * @see VideoRemoteState.Stopped
     * @see VideoRemoteStateReason.RemoteMuted
     * - Decoding(2) and RemoteUnmuted(6).
     * @see VideoRemoteState.Decoding
     * @see VideoRemoteStateReason.RemoteUnmuted
     * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the muteLocalAudioStream method.
     * @see RtcEngine.muteLocalAudioStream
     * Note
     * - This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     */
    UserMuteAudio: UidWithMutedCallback

    /**
     * Reports the result of calling the addPublishStreamUrl method.
     * @see RtcEngine.addPublishStreamUrl
     * @deprecated Use onRtmpStreamingStateChanged instead.
     * @see RtmpStreamingStateChanged
     * This callback indicates whether you have successfully added an RTMP stream to the CDN.
     */
    StreamPublished: UrlWithErrorCallback

    /**
     * Reports the result of calling the removePublishStreamUrl method.
     * @see RtcEngine.removePublishStreamUrl
     * @deprecated Use onRtmpStreamingStateChanged instead.
     * @see RtmpStreamingStateChanged
     * This callback indicates whether you have successfully removed an RTMP stream from the CDN.
     */
    StreamUnpublished: UrlCallback

    /**
     * Reports the transport-layer statistics of each remote audio stream.
     * @deprecated This callback is deprecated. Use onRemoteAudioStats instead.
     * @see RemoteAudioStats
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives an audio packet from a remote user.
     */
    RemoteAudioTransportStats: TransportStatsCallback

    /**
     * Reports the transport-layer statistics of each remote video stream.
     * @deprecated This callback is deprecated. Use onRemoteVideoStats instead.
     * @see RemoteVideoStats
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay, once every two seconds after the local user receives the video packet from a remote user.
     */
    RemoteVideoTransportStats: TransportStatsCallback

    /**
     * Occurs when a remote user enables/disables the video module.
     * @deprecated This callback is deprecated and replaced by the onRemoteVideoStateChanged callback with the following parameters:
     * @see RemoteVideoStateChanged
     * - Stopped(0) and RemoteMuted(5).
     * @see VideoRemoteState.Stopped
     * @see VideoRemoteStateReason.RemoteMuted
     * - Decoding(2) and RemoteUnmuted(6).
     * @see VideoRemoteState.Decoding
     * @see VideoRemoteStateReason.RemoteUnmuted
     * Once the video module is disabled, the remote user can only use a voice call. The remote user cannot send or receive any video from other users.
     * The SDK triggers this callback when the remote user enables or disables the video module by calling the enableVideo or disableVideo method.
     * @see RtcEngine.enableVideo
     * @see RtcEngine.disableVideo
     * Note
     * - This callback is invalid when the number of users or broadcasters in the channel exceeds 20.
     */
    UserEnableVideo: UidWithEnabledCallback

    /**
     * Occurs when a remote user enables/disables the local video capture function.
     * @deprecated This callback is deprecated and replaced by the onRemoteVideoStateChanged callback with the following parameters:
     * @see RemoteVideoStateChanged
     * - Stopped(0) and RemoteMuted(5).
     * @see VideoRemoteState.Stopped
     * @see VideoRemoteStateReason.RemoteMuted
     * - Decoding(2) and RemoteUnmuted(6).
     * @see VideoRemoteState.Decoding
     * @see VideoRemoteStateReason.RemoteUnmuted
     * The SDK triggers this callback when the remote user resumes or stops capturing the video stream by calling the enableLocalVideo method.
     * @see RtcEngine.enableLocalVideo
     * This callback is only applicable to the scenario when the remote user only wants to watch the remote video without sending any video stream to the other user.
     */
    UserEnableLocalVideo: UidWithEnabledCallback

    /**
     * Occurs when the first remote video frame is received and decoded.
     * @deprecated This callback is deprecated. Use Starting(1) or Decoding(2) in the onRemoteVideoStateChanged callback instead.
     * @see VideoRemoteState.Starting
     * @see VideoRemoteState.Decoding
     * @see RemoteVideoStateChanged
     * This callback is triggered in either of the following scenarios:
     * - The remote user joins the channel and sends the video stream.
     * - The remote user stops sending the video stream and re-sends it after 15 seconds. Possible reasons include:
     * -- The remote user leaves channel.
     * -- The remote user drops offline.
     * -- The remote user calls the muteLocalVideoStream method.
     * @see RtcEngine.muteLocalVideoStream
     * -- The remote user calls the disableVideo method.
     * @see RtcEngine.disableVideo
     */
    FirstRemoteVideoDecoded: VideoFrameWithUidCallback

    /**
     * Occurs when the microphone is enabled/disabled.
     * @deprecated This callback is deprecated. Use Stopped(0) or Recording(1) in the onLocalAudioStateChanged callback instead.
     * @see AudioLocalState.Stopped
     * @see AudioLocalState.Recording
     * @see LocalAudioStateChanged
     * The SDK triggers this callback when the local user resumes or stops capturing the local audio stream by calling the enableLocalAudio method.
     * @see RtcEngine.enableLocalAudio
     */
    MicrophoneEnabled: EnabledCallback

    /**
     * Occurs when the connection between the SDK and the server is interrupted.
     * @deprecated Use onConnectionStateChanged instead.
     * @see ConnectionStateChanged
     * The SDK triggers this callback when it loses connection to the server for more than four seconds after the connection is established. After triggering this callback, the SDK tries to reconnect to the server. You can use this callback to implement pop-up reminders. This callback is different from onConnectionLost:
     * @see ConnectionLost
     * - The SDK triggers the onConnectionInterrupted callback when the SDK loses connection with the server for more than four seconds after it joins the channel.
     * @see ConnectionInterrupted
     * - The SDK triggers the onConnectionLost callback when it loses connection with the server for more than 10 seconds, regardless of whether it joins the channel or not.
     * @see ConnectionLost
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     */
    ConnectionInterrupted: EmptyCallback

    /**
     * Occurs when your connection is banned by the Agora Server.
     * @deprecated Use onConnectionStateChanged instead.
     * @see ConnectionStateChanged
     */
    ConnectionBanned: EmptyCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     * @deprecated Use onRemoteAudioStats instead.
     * @see RemoteAudioStats
     * The SDK triggers this callback once every two seconds to report the audio quality of each remote user/host sending an audio stream. If a channel has multiple remote users/hosts sending audio streams, the SDK trggers this callback as many times.
     */
    AudioQuality: AudioQualityCallback

    /**
     * Occurs when the camera is turned on and ready to capture video.
     * @deprecated Use Capturing(1) in the onLocalVideoStateChanged callback instead. If the camera fails to turn on, fix the error reported in the onError callback.
     * @see LocalVideoStreamState.Capturing
     * @see LocalVideoStateChanged
     * @see Error
     */
    CameraReady: EmptyCallback

    /**
     * Occurs when the video stops playing.
     * @deprecated Use Stopped(0) in the onLocalVideoStateChanged callback instead. The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops playing.
     * @see LocalVideoStreamState.Stopped
     * @see LocalVideoStateChanged
     */
    VideoStopped: EmptyCallback

    /**
     * Occurs when the local user receives the metadata.
     */
    MetadataReceived: MetadataCallback
}

export interface RtcChannelEvents {
    /**
     * Reports the warning code of the RtcChannel instance.
     * @see RtcChannel
     */
    Warning: WarningCallback

    /**
     * Reports the error code of the RtcChannel instance.
     * @see RtcChannel
     */
    Error: ErrorCallback

    /**
     * Occurs when the local user joins a specified channel.
     * If the uid is not specified when calling joinChannel, the server automatically assigns a uid.
     * @see RtcChannel.joinChannel
     */
    JoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     */
    RejoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user leaves the channel.
     * When a user leaves the channel by using the leaveChannel method, the SDK uses this callback to notify the app when the user leaves the channel.
     * @see RtcChannel.leaveChannel
     * With this callback, the app retrieves the channel information, such as the call duration and statistics.
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the user role switches in a Live-Broadcast channel. For example, from broadcaster to audience or vice versa.
     * The SDK triggers this callback when the local user switches the user role by calling the setClientRole method after joining the channel.
     * @see RtcChannel.setClientRole
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live-Broadcast) joins the channel.
     * - Communication profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - Live-Broadcast profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel.
     * Note
     * - In the Live-Broadcast profile:
     * -- The host receives this callback when another host joins the channel.
     * -- The audience in the channel receives this callback when a new host joins the channel.
     * -- When a web app joins the channel, this callback is triggered as long as the web app publishes streams.
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live Broadcast) leaves the channel.
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/broadcaster leaves the channel, the user/broadcaster sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Go offline: When no data packet of the user or broadcaster is received for a certain period of time (around 20 seconds), the SDK assumes that the user/broadcaster drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     * The Agora SDK triggers this callback to report on the current network connection state when it changes, and the reason to such change.
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     * The SDK also triggers this callback when it cannot connect to the server 10 seconds after calling joinChannel, regardless of whether it is in the channel or not.
     * @see RtcChannel.joinChannel
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires, to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call renewToken to pass the new token to the SDK.
     * @see RtcChannel.renewToken
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     * After a token is specified when joining the channel, the token expires after a certain period of time, and a new token is required to reconnect to the server. This callback notifies the app to generate a new token and call renewToken to renew the token.
     * @see RtcChannel.renewToken
     */
    RequestToken: EmptyCallback

    /**
     * Reports which user is the loudest speaker.
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling enableAudioVolumeIndication, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     * @see RtcChannel.enableAudioVolumeIndication
     * Note
     * - To receive this callback, you need to call enableAudioVolumeIndication.
     * @see RtcEngine.enableAudioVolumeIndication
     * - This callback reports the ID of the user with the highest voice volume during a period of time, instead of at the moment.
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     * This callback indicates the state change of the remote audio stream.
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setLocalPublishFallbackOption and set option as AudioOnly(2), this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     * @see RtcEngine.setLocalPublishFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setRemoteSubscribeFallbackOption and set option as AudioOnly(2), this callback is triggered when the remote media stream falls back to audio-only mode due to poor uplink conditions, or when the remote media stream switches back to the video after the uplink network condition improves.
     * @see RtcEngine.setRemoteSubscribeFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     * Note
     * - Once the remote media stream is switched to the low stream due to poor network conditions, you can monitor the stream switch between a high and low stream in the onRemoteVideoStats callback.
     * @see onRemoteVideoStats
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Reports the statistics of the RtcEngine once every two seconds.
     * @see RtcEngine
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the statistics of the video stream from each remote user/broadcaster. The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     */
    RemoteVideoStats: RemoteVideoStatsCallback

    /**
     * Reports the statistics of the audio stream from each remote user/broadcaster.
     * The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     * The SDK triggers this callback to report the result of the local user calling the addPublishStreamUrl or removePublishStreamUrl method. This callback returns the URL and its current streaming state. When the streaming state is Failure(4), see the errCode parameter for details.
     * @see RtcChannel.addPublishStreamUrl
     * @see RtcChannel.removePublishStreamUrl
     * @see RtmpStreamingState.Failure
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

    /**
     * Occurs when the publisher's transcoding settings are updated.
     * When the LiveTranscoding class in the setLiveTranscoding method updates, the SDK triggers this callback to report the update information.
     * @see RtcChannel.setLiveTranscoding
     * Note
     * - If you call the setLiveTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
     */
    TranscodingUpdated: EmptyCallback

    /**
     * Reports the status of injecting the online media stream.
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcChannel.sendStreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcChannel.sendStreamMessage
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the state of the media stream relay changes.
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the local user receives the metadata.
     */
    MetadataReceived: MetadataCallback
}
