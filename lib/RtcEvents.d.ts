import { AudioLocalError, AudioLocalState, AudioMixingErrorCode, AudioMixingStateCode, AudioOutputRouting, AudioRemoteState, AudioRemoteStateReason, AudioVolumeInfo, ChannelMediaRelayError, ChannelMediaRelayEvent, ChannelMediaRelayState, ClientRole, ConnectionChangedReason, ConnectionStateType, ErrorCode, InjectStreamStatus, LastmileProbeResult, LocalAudioStats, LocalVideoStats, LocalVideoStreamError, LocalVideoStreamState, NetworkQuality, NetworkType, Rect, RemoteAudioStats, RemoteVideoStats, RtcStats, RtmpStreamingErrorCode, RtmpStreamingState, UserInfo, UserOfflineReason, VideoRemoteState, VideoRemoteStateReason, WarningCode } from "./Types";
export declare type Listener = (...args: any[]) => any;
export interface Subscription {
    remove(): void;
}
declare type EmptyCallback = () => void;
declare type WarningCallback = (warn: WarningCode) => void;
declare type ErrorCallback = (err: ErrorCode) => void;
declare type RtcStatsCallback = (stats: RtcStats) => void;
declare type ClientRoleCallback = (oldRole: ClientRole, newRole: ClientRole) => void;
declare type UserAccountCallback = (uid: number, userAccount: string) => void;
declare type UserInfoCallback = (uid: number, userInfo: UserInfo) => void;
declare type UidWithElapsedAndChannelCallback = (channel: string, uid: number, elapsed: number) => void;
declare type UidWithElapsedCallback = (uid: number, elapsed: number) => void;
declare type UserOfflineCallback = (uid: number, reason: UserOfflineReason) => void;
declare type ConnectionStateCallback = (state: ConnectionStateType, reason: ConnectionChangedReason) => void;
declare type ApiCallCallback = (error: ErrorCode, api: string, result: string) => void;
declare type TokenCallback = (token: string) => void;
declare type AudioVolumeCallback = (speakers: [AudioVolumeInfo], totalVolume: number) => void;
declare type UidCallback = (uid: number) => void;
declare type ElapsedCallback = (elapsed: number) => void;
declare type VideoFrameCallback = (width: number, height: number, elapsed: number) => void;
declare type VideoSizeCallback = (uid: number, width: number, height: number, rotation: number) => void;
declare type AudioStateWithUidCallback = (uid: number, state: AudioRemoteState, reason: AudioRemoteStateReason, elapsed: number) => void;
declare type VideoStateWithCallback = (uid: number, state: VideoRemoteState, reason: VideoRemoteStateReason, elapsed: number) => void;
declare type MediaRelayStateCallback = (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void;
declare type MediaRelayEventCallback = (code: ChannelMediaRelayEvent) => void;
declare type FallbackCallback = (isFallbackOrRecover: boolean) => void;
declare type FallbackWithUidCallback = (uid: number, isFallbackOrRecover: boolean) => void;
declare type AudioRouteCallback = (routing: AudioOutputRouting) => void;
declare type RectCallback = (rect: Rect) => void;
declare type NetworkQualityCallback = (quality: NetworkQuality) => void;
declare type LastmileProbeCallback = (result: LastmileProbeResult) => void;
declare type NetworkQualityWithUidCallback = (uid: number, txQuality: NetworkQuality, rxQuality: NetworkQuality) => void;
declare type LocalVideoStatsCallback = (stats: LocalVideoStats) => void;
declare type RemoteVideoStatsCallback = (stats: RemoteVideoStats) => void;
declare type LocalAudioStatsCallback = (stats: LocalAudioStats) => void;
declare type RemoteAudioStatsCallback = (stats: RemoteAudioStats) => void;
declare type onAudioMixingStateChanged = (state: AudioMixingStateCode, errorCode: AudioMixingErrorCode) => void;
declare type SoundIdCallback = (soundId: number) => void;
declare type LocalAudioStateCallback = (state: AudioLocalState, error: AudioLocalError) => void;
declare type LocalVideoStateCallback = (localVideoState: LocalVideoStreamState, error: LocalVideoStreamError) => void;
declare type RtmpStreamingStateCallback = (url: string, state: RtmpStreamingState, errCode: RtmpStreamingErrorCode) => void;
declare type StreamInjectedStatusCallback = (url: string, uid: number, status: InjectStreamStatus) => void;
declare type StreamMessageCallback = (uid: number, streamId: number, data: string) => void;
declare type StreamMessageErrorCallback = (uid: number, streamId: number, error: ErrorCode, missed: number, cached: number) => void;
declare type NetworkTypeCallback = (type: NetworkType) => void;
export interface RtcEngineEvents {
    /**
     * Reports a warning during SDK runtime.
     * In most cases, the app can ignore the warning reported by the SDK because the SDK can usually fix the issue and resume running.
     * For instance, the SDK may report a LookupChannelTimeout warning upon disconnection with the server and tries to reconnect. For detailed warning codes, see Warning Codes.
     * @see WarningCode.LookupChannelTimeout
     * @see WarningCode
     */
    onWarning: WarningCallback;
    /**
     * Reports an error during SDK runtime.
     * In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
     * For example, the SDK reports an StartCall error when failing to initialize a call. The app informs the user that the call initialization failed and invokes the leaveChannel method to leave the channel. For detailed error codes, see Error Codes.
     * @see ErrorCode.StartCall
     * @see RtcEngine.leaveChannel
     * @see ErrorCode
     */
    onError: ErrorCallback;
    /**
     * Occurs when the local user joins a specified channel.
     * The channel name assignment is based on channelName specified in the joinChannel method.
     * If the uid is not specified when joinChannel is called, the server automatically assigns a uid.
     * @see RtcEngine.joinChannel
     */
    onJoinChannelSuccess: UidWithElapsedAndChannelCallback;
    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     */
    onRejoinChannelSuccess: UidWithElapsedAndChannelCallback;
    /**
     * Occurs when a user leaves the channel.
     * When the app calls the leaveChannel method, the SDK uses this callback to notify the app when the user leaves the channel.
     * With this callback, the application retrieves the channel information, such as the call duration and statistics.
     * @see RtcEngine.leaveChannel
     */
    onLeaveChannel: RtcStatsCallback;
    /**
     * Occurs when the user role switches in a live broadcast. For example, from a host to an audience or vice versa.
     * The SDK triggers this callback when the local user switches the user role by calling the setClientRole method after joining the channel.
     * @see RtcEngine.setClientRole
     */
    onClientRoleChanged: ClientRoleCallback;
    /**
     * Occurs when the local user registers a user account.
     * This callback is triggered when the local user successfully registers a user account by calling the registerLocalUserAccount method, or joins a channel by calling the joinChannelWithUserAccount method. This callback reports the user ID and user account of the local user.
     * @see RtcEngine.joinChannelWithUserAccount
     */
    onLocalUserRegistered: UserAccountCallback;
    /**
     * Occurs when the SDK gets the user ID and user account of the remote user.
     * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object (UserInfo), and triggers this callback on the local client.
     * @see UserInfo
     */
    onUserInfoUpdated: UserInfoCallback;
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
     */
    onUserJoined: UidWithElapsedCallback;
    /**
     * Occurs when a remote user (Communication)/host (Live Broadcast) leaves the channel.
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     */
    onUserOffline: UserOfflineCallback;
    /**
     * Occurs when the network connection state changes.
     * The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason to such change.
     */
    onConnectionStateChanged: ConnectionStateCallback;
    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling joinChannel(), regardless of whether it is in the channel or not.
     * @see RtcEngine.joinChannel
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     */
    onConnectionLost: EmptyCallback;
    /**
     * Occurs when an API method is executed.
     */
    onApiCallExecuted: ApiCallCallback;
    /**
     * Occurs when the token expires in 30 seconds.
     * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call renewToken to pass the new token to the SDK.
     * @see RtcEngine.renewToken
     */
    onTokenPrivilegeWillExpire: TokenCallback;
    /**
     * Occurs when the token has expired.
     * After a token is specified when joining the channel, the token expires after a certain period of time, and a new token is required to reconnect to the server. This callback notifies the app to generate a new token and call joinChannel to rejoin the channel with the new token.
     * @see RtcEngine.joinChannel
     */
    onRequestToken: EmptyCallback;
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
    onAudioVolumeIndication: AudioVolumeCallback;
    /**
     * Reports which user is the loudest speaker.
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling enableAudioVolumeIndication, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     * @see RtcEngine.enableAudioVolumeIndication
     */
    onActiveSpeaker: UidCallback;
    /**
     * Occurs when the first local audio frame is sent.
     */
    onFirstLocalAudioFrame: ElapsedCallback;
    /**
     * Occurs when the first local video frame is rendered.
     * This callback is triggered after the first local video frame is rendered on the local video window.
     */
    onFirstLocalVideoFrame: VideoFrameCallback;
    /**
     * Occurs when the video size or rotation information of a remote user changes.
     */
    onVideoSizeChanged: VideoSizeCallback;
    /**
     * Occurs when the remote audio state changes.
     * This callback indicates the state change of the remote audio stream.
     */
    onRemoteAudioStateChanged: AudioStateWithUidCallback;
    /**
     * Occurs when the remote video state changes.
     */
    onRemoteVideoStateChanged: VideoStateWithCallback;
    /**
     * Occurs when the state of the media stream relay changes.
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     */
    onChannelMediaRelayStateChanged: MediaRelayStateCallback;
    /**
     * Reports events during the media stream relay.
     */
    onChannelMediaRelayEvent: MediaRelayEventCallback;
    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setLocalPublishFallbackOption and set option as STREAM_FALLBACK_OPTION_AUDIO_ONLY(2), this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     * @see RtcEngine.setLocalPublishFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     */
    onLocalPublishFallbackToAudioOnly: FallbackCallback;
    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setRemoteSubscribeFallbackOption and set option as STREAM_FALLBACK_OPTION_AUDIO_ONLY(2), this callback is triggered when the remotely subscribed media stream falls back to audio-only mode due to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after the uplink network condition improves.
     * @see RtcEngine.setRemoteSubscribeFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     */
    onRemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback;
    /**
     * Occurs when the local audio playback route changes.
     * This callback returns that the audio route switched to an earpiece, speakerphone, headset, or Bluetooth device.
     * The definition of the routing is listed as follows:
     * @see AudioOutputRouting
     */
    onAudioRouteChanged: AudioRouteCallback;
    /**
     * Occurs when the camera focus area is changed.
     * The SDK triggers this callback when the local user changes the camera focus position by calling the setCameraFocusPositionInPreview method.
     * @see RtcEngine.setCameraFocusPositionInPreview
     */
    onCameraFocusAreaChanged: RectCallback;
    /**
     * The camera exposure area has changed.
     * The SDK triggers this callback when the local user changes the camera exposure position by calling the setCameraExposurePosition method.
     * @see RtcEngine.setCameraExposurePosition
     */
    onCameraExposureAreaChanged: RectCallback;
    /**
     * Reports the statistics of the RtcEngine once every two seconds.
     */
    onRtcStats: RtcStatsCallback;
    /**
     * Reports the last mile network quality of the local user once every two seconds before the user joins the channel. Last mile refers to the connection between the local device and Agora's edge server. After the application calls the enableLastmileTest method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.
     * @see RtcEngine.enableLastmileTest
     */
    onLastmileQuality: NetworkQualityCallback;
    /**
     * Reports the last-mile network probe result.
     * The SDK triggers this callback within 30 seconds after the app calls the startLastmileProbeTest method.
     * @see RtcEngine.startLastmileProbeTest
     */
    onLastmileProbeResult: LastmileProbeCallback;
    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     */
    onNetworkQuality: NetworkQualityWithUidCallback;
    /**
     * Reports the statistics of the local video streams.
     * The SDK triggers this callback once every two seconds for each user/host. If there are multiple users/hosts in the channel, the SDK triggers this callback as many times.
     */
    onLocalVideoStats: LocalVideoStatsCallback;
    /**
     * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     */
    onRemoteVideoStats: RemoteVideoStatsCallback;
    /**
     * Reports the statistics of the local audio stream.
     */
    onLocalAudioStats: LocalAudioStatsCallback;
    /**
     * Reports the statistics of the audio stream from each remote user/host.
     * The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     */
    onRemoteAudioStats: RemoteAudioStatsCallback;
    /**
     * Occurs when the state of the local user's audio mixing file changes.
     * When you call the startAudioMixing method and the state of audio mixing file changes, the Agora SDK triggers this callback.
     * @see RtcEngine.startAudioMixing
     * - When the audio mixing file plays, pauses playing, or stops playing, this callback returns 710, 711, or 713 in state, and 0 in errorCode.
     * - When exceptions occur during playback, this callback returns 714 in state and an error in errorCode.
     * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns AudioMixingOpenError = 701.
     * @see WarningCode.AudioMixingOpenError
     */
    onAudioMixingStateChanged: onAudioMixingStateChanged;
    /**
     * Occurs when the audio effect file playback finishes.
     * You can start a local audio effect playback by calling the playEffect method. This callback is triggered when the local audio effect file playback finishes.
     * @see RtcEngine.playEffect
     */
    onAudioEffectFinished: SoundIdCallback;
    /**
     * Occurs when the local audio stream state changes.
     * This callback indicates the state change of the local audio stream, including the state of the audio recording and encoding, and allows you to troubleshoot issues when exceptions occur.
     * Note
     * - When the state is Failed(3), see the error parameter for details.
     * @see AudioLocalState.Failed
     * @see AudioLocalError
     */
    onLocalAudioStateChanged: LocalAudioStateCallback;
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
    onLocalVideoStateChanged: LocalVideoStateCallback;
    /**
     * Occurs when the state of the RTMP streaming changes.
     * The SDK triggers this callback to report the result of the local user calling the addPublishStreamUrl or removePublishStreamUrl method. This callback returns the URL and its current streaming state. When the streaming state is Failure(4), see the errCode parameter for details.
     * @see RtcEngine.addPublishStreamUrl
     * @see RtcEngine.removePublishStreamUrl
     * @see RtmpStreamingState.Failure
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     */
    onRtmpStreamingStateChanged: RtmpStreamingStateCallback;
    /**
     * Occurs when the publisher's transcoding settings are updated.
     * When the LiveTranscoding class in the setLiveTranscoding method updates, the SDK triggers this callback to report the update information.
     * @see RtcEngine.setLiveTranscoding
     * Note
     * - If you call the setLiveTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
     */
    onTranscodingUpdated: EmptyCallback;
    /**
     * Reports the status of injecting the online media stream.
     */
    onStreamInjectedStatus: StreamInjectedStatusCallback;
    /**
     * Occurs when the local user receives a remote data stream.
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcEngine.sendStreamMessage
     */
    onStreamMessage: StreamMessageCallback;
    /**
     * Occurs when the local user fails to receive a remote data stream.
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcEngine.sendStreamMessage
     */
    onStreamMessageError: StreamMessageErrorCallback;
    /**
     * Occurs when the media engine is loaded.
     */
    onMediaEngineLoadSuccess: EmptyCallback;
    /**
     * Occurs when the media engine starts.
     */
    onMediaEngineStartCallSuccess: EmptyCallback;
    /**
     * Occurs when the network type changes.
     * The SDK returns the current network type in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
     */
    onNetworkTypeChanged: NetworkTypeCallback;
}
export interface RtcChannelEvents {
    /**
     * Reports the warning code of the RtcChannel instance.
     */
    onChannelWarning: WarningCallback;
    /**
     * Reports the error code of the RtcChannel instance.
     */
    onChannelError: ErrorCallback;
    /**
     * Occurs when the local user joins a specified channel.
     * If the uid is not specified when calling joinChannel, the server automatically assigns a uid.
     * @see RtcChannel.joinChannel
     */
    onJoinChannelSuccess: UidWithElapsedCallback;
    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     */
    onRejoinChannelSuccess: UidWithElapsedCallback;
    /**
     * Occurs when a user leaves the channel.
     * When a user leaves the channel by using the leaveChannel method, the SDK uses this callback to notify the app when the user leaves the channel.
     * @see RtcChannel.leaveChannel
     * With this callback, the app retrieves the channel information, such as the call duration and statistics.
     */
    onLeaveChannel: RtcStatsCallback;
    /**
     * Occurs when the user role switches in a Live-Broadcast channel. For example, from broadcaster to audience or vice versa.
     * The SDK triggers this callback when the local user switches the user role by calling the setClientRole method after joining the channel.
     * @see RtcChannel.setClientRole
     */
    onClientRoleChanged: ClientRoleCallback;
    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live-Broadcast) joins the channel.
     * - Communication profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - Live-Broadcast profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel.
     */
    onUserJoined: UidWithElapsedCallback;
    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live Broadcast) leaves the channel.
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/broadcaster leaves the channel, the user/broadcaster sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Go offline: When no data packet of the user or broadcaster is received for a certain period of time (around 20 seconds), the SDK assumes that the user/broadcaster drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     */
    onUserOffline: UserOfflineCallback;
    /**
     * Occurs when the network connection state changes.
     * The Agora SDK triggers this callback to report on the current network connection state when it changes, and the reason to such change.
     */
    onConnectionStateChanged: ConnectionStateCallback;
    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     * The SDK also triggers this callback when it cannot connect to the server 10 seconds after calling joinChannel, regardless of whether it is in the channel or not.
     * @see RtcChannel.joinChannel
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     */
    onConnectionLost: EmptyCallback;
    /**
     * Occurs when the token expires in 30 seconds.
     * The user becomes offline if the token used when joining the channel expires. This callback is triggered 30 seconds before the token expires, to remind the app to get a new token. Upon receiving this callback, you need to generate a new token on the server and call renewToken to pass the new token to the SDK.
     * @see RtcChannel.renewToken
     */
    onTokenPrivilegeWillExpire: TokenCallback;
    /**
     * Occurs when the token has expired.
     * After a token is specified when joining the channel, the token expires after a certain period of time, and a new token is required to reconnect to the server. This callback notifies the app to generate a new token and call renewToken to renew the token.
     * @see RtcChannel.renewToken
     */
    onRequestToken: EmptyCallback;
    /**
     * Reports the statistics of the RtcEngine once every two seconds.
     */
    onRtcStats: RtcStatsCallback;
    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     */
    onNetworkQuality: NetworkQualityWithUidCallback;
    /**
     * Reports the statistics of the video stream from each remote user/broadcaster. The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     */
    onRemoteVideoStats: RemoteVideoStatsCallback;
    /**
     * Reports the statistics of the audio stream from each remote user/broadcaster.
     * The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     */
    onRemoteAudioStats: RemoteAudioStatsCallback;
    /**
     * Occurs when the remote audio state changes.
     * This callback indicates the state change of the remote audio stream.
     */
    onRemoteAudioStateChanged: AudioStateWithUidCallback;
    /**
     * Reports which user is the loudest speaker.
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling enableAudioVolumeIndication, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     * @see RtcChannel.enableAudioVolumeIndication
     */
    onActiveSpeaker: UidCallback;
    /**
     * Occurs when the video size or rotation information of a remote user changes.
     */
    onVideoSizeChanged: VideoSizeCallback;
    /**
     * Occurs when the remote video state changes.
     */
    onRemoteVideoStateChanged: VideoStateWithCallback;
    /**
     * Occurs when the local user receives a remote data stream.
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcChannel.sendStreamMessage
     */
    onStreamMessage: StreamMessageCallback;
    /**
     * Occurs when the local user fails to receive a remote data stream.
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the sendStreamMessage method.
     * @see RtcChannel.sendStreamMessage
     */
    onStreamMessageError: StreamMessageErrorCallback;
    /**
     * Occurs when the state of the media stream relay changes.
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     */
    onChannelMediaRelayStateChanged: MediaRelayStateCallback;
    /**
     * Reports events during the media stream relay.
     */
    onChannelMediaRelayEvent: MediaRelayEventCallback;
    /**
     * Occurs when the state of the RTMP streaming changes.
     * The SDK triggers this callback to report the result of the local user calling the addPublishStreamUrl or removePublishStreamUrl method. This callback returns the URL and its current streaming state. When the streaming state is Failure(4), see the errCode parameter for details.
     * @see RtcChannel.addPublishStreamUrl
     * @see RtcChannel.removePublishStreamUrl
     * @see RtmpStreamingState.Failure
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     */
    onRtmpStreamingStateChanged: RtmpStreamingStateCallback;
    /**
     * Occurs when the publisher's transcoding settings are updated.
     * When the LiveTranscoding class in the setLiveTranscoding method updates, the SDK triggers this callback to report the update information.
     * @see RtcChannel.setLiveTranscoding
     * Note
     * - If you call the setLiveTranscoding method to set the LiveTranscoding class for the first time, the SDK does not trigger this callback.
     */
    onTranscodingUpdated: EmptyCallback;
    /**
     * Reports the status of injecting the online media stream.
     */
    onStreamInjectedStatus: StreamInjectedStatusCallback;
    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     * If you call setRemoteSubscribeFallbackOption and set option as AudioOnly(2), this callback is triggered when the remote media stream falls back to audio-only mode due to poor uplink conditions, or when the remote media stream switches back to the video after the uplink network condition improves.
     * @see RtcChannel.setRemoteSubscribeFallbackOption
     * @see StreamFallbackOptions.AudioOnly
     * Note
     * - Once the remote media stream is switched to the low stream due to poor network conditions, you can monitor the stream switch between a high and low stream in the onRemoteVideoStats callback.
     * @see onRemoteVideoStats
     */
    onRemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback;
}
export {};
