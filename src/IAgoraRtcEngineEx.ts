import './extension/IAgoraRtcEngineExExtension';
import {
  ChannelMediaRelayConfiguration,
  ConnectionStateType,
  DataStreamConfig,
  EncryptionConfig,
  LiveTranscoding,
  RdtStreamType,
  SimulcastConfig,
  SimulcastStreamConfig,
  SimulcastStreamMode,
  SpatialAudioParams,
  UserInfo,
  VideoCanvas,
  VideoEncoderConfiguration,
  VideoMirrorModeType,
  VideoStreamType,
  VideoSubscriptionOptions,
  WatermarkConfig,
  WatermarkOptions,
} from './AgoraBase';
import {
  ContentInspectConfig,
  RenderModeType,
  SnapshotConfig,
} from './AgoraMediaBase';
import {
  ChannelMediaOptions,
  IRtcEngine,
  LeaveChannelOptions,
  StreamFallbackOptions,
} from './IAgoraRtcEngine';

/**
 * Class containing connection information.
 */
export class RtcConnection {
  /**
   * Channel name.
   */
  channelId?: string;
  /**
   * Local user ID.
   */
  localUid?: number;
}

/**
 * Interface class that provides multi-channel methods.
 *
 * Inherits from IRtcEngine.
 */
export abstract class IRtcEngineEx extends IRtcEngine {
  /**
   * Joins a channel.
   *
   * Call this method to join multiple channels simultaneously. If you want to join the same channel on different devices, make sure the user IDs used on each device are different. If you are already in a channel, you cannot use the same user ID to join the same channel again.
   * Before joining a channel, make sure the App ID used to generate the Token is the same as the one used in the initialize method to initialize the engine, otherwise joining the channel with the Token will fail.
   *
   * @param token A dynamic key generated on your server for authentication. See [Use Token Authentication](https://doc.shengwang.cn/doc/rtc/rn/basic-features/token-authentication).
   *  (Recommended) If your project enables the security mode, i.e., uses APP ID + Token for authentication, this parameter is required.
   *  If your project only enables debug mode, i.e., uses only the APP ID for authentication, you can join the channel without a Token. The user will automatically leave the channel 24 hours after successfully joining.
   *  If you need to join multiple channels simultaneously or switch channels frequently, Agora recommends using a wildcard Token to avoid requesting a new Token from the server each time. See [Use Wildcard Token](https://doc.shengwang.cn/doc/rtc/rn/best-practice/wildcard-token).
   * @param connection Connection information. See RtcConnection.
   * @param options Channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: Invalid parameter. For example, an invalid Token is used, uid is not an integer, or a ChannelMediaOptions member is invalid. You need to provide valid parameters and rejoin the channel.
   *  -3: IRtcEngine object initialization failed. You need to reinitialize the IRtcEngine object.
   *  -7: IRtcEngine object is not initialized. You must initialize the IRtcEngine object before calling this method.
   *  -8: Internal state error of the IRtcEngine object. Possible reason: startEchoTest was called to start an echo test, but stopEchoTest was not called before calling this method. You must call stopEchoTest before this method.
   *  -17: Join channel request is rejected. Possible reason: the user is already in the channel. Use the onConnectionStateChanged callback to check if the user is in the channel. Do not call this method again unless you receive the ConnectionStateDisconnected (1) state.
   *  -102: Invalid channel name. You must provide a valid channel name in channelId and rejoin the channel.
   *  -121: Invalid user ID. You must provide a valid user ID in uid and rejoin the channel.
   */
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  /**
   * Sets channel options and leaves the channel.
   *
   * After calling this method, the SDK stops all audio and video interactions, leaves the current channel, and releases all session-related resources.
   * You must call this method after successfully joining a channel using joinChannelEx to end the call; otherwise, you cannot start a new call.
   *  This method is asynchronous. When the call returns, the channel has not actually been left.
   *  If you call leaveChannel, it leaves both joinChannel and joinChannelEx channels. If you call release immediately after this method, the SDK will not trigger the onLeaveChannel callback.
   *
   * @param connection Connection information. See RtcConnection.
   * @param options Options for leaving the channel. See LeaveChannelOptions. This parameter only supports setting the stopMicrophoneRecording member in LeaveChannelOptions. Other members are not effective.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract leaveChannelEx(
    connection: RtcConnection,
    options?: LeaveChannelOptions
  ): number;

  /**
   * @ignore
   */
  abstract leaveChannelWithUserAccountEx(
    channelId: string,
    userAccount: string,
    options?: LeaveChannelOptions
  ): number;

  /**
   * Updates the channel media options after joining a channel.
   *
   * @param options The channel media options. See ChannelMediaOptions.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The value of a ChannelMediaOptions member is invalid. For example, an illegal token is used or an invalid user role is set. You need to provide valid parameters.
   *  -7: The IRtcEngine object is not initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is incorrect. A possible reason is that the user is not in a channel. It is recommended to determine whether the user is in a channel through the onConnectionStateChanged callback. If you receive ConnectionStateDisconnected (1) or ConnectionStateFailed (5), it means the user is not in a channel. You need to call joinChannel before calling this method.
   */
  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  /**
   * Sets video encoding properties.
   *
   * Sets the encoding properties for local video. Each video encoding configuration corresponds to a series of video-related parameter settings, including resolution, frame rate, and bitrate. The config parameter of this method sets the maximum values achievable under ideal network conditions. If the network is poor, the video engine will not use this config to render local video and will automatically downgrade to suitable video parameters.
   *
   * @param config Video encoding parameter configuration. See VideoEncoderConfiguration.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setupRemoteVideoEx(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes receiving the specified audio stream.
   *
   * This method stops or resumes receiving the audio stream from a specified remote user. It can be called before or after joining a channel. The setting is reset after leaving the channel.
   *
   * @param uid The ID of the specified user.
   * @param mute Whether to stop receiving the specified audio stream: true : Stop receiving the specified audio stream. false : (Default) Continue receiving the specified audio stream.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes receiving a specified video stream.
   *
   * This method stops or resumes receiving the video stream of a specified remote user. You can call this method either before or after joining a channel. The settings of this method are reset once you leave the channel.
   *
   * @param uid The user ID of the remote user.
   * @param mute Whether to stop receiving the video stream of a remote user: true : Stop receiving. false : (Default) Resume receiving.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Code](https://doc.shengwang.cn/api-ref/rtc/rn/error-code) for details and resolution suggestions.
   */
  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Sets the type of video stream to subscribe to.
   *
   * Depending on the default behavior of the sender and the specific settings of setDualStreamMode, the receiver can use this method in the following situations:
   *  By default, the SDK enables the low stream adaptive mode (AutoSimulcastStream) on the sender, meaning the sender only sends the high stream. Only receivers with host role can call this method to request the low stream. Once the sender receives the request, it starts sending the low stream automatically. At this point, all users in the channel can call this method to switch to low stream subscription mode.
   *  If the sender calls setDualStreamMode and sets mode to DisableSimulcastStream (never send low stream), this method has no effect.
   *  If the sender calls setDualStreamMode and sets mode to EnableSimulcastStream (always send low stream), both hosts and audience can call this method to switch to low stream subscription mode. When receiving the low video stream, the SDK dynamically adjusts the video stream size based on the size of the video window to save bandwidth and computing resources. The aspect ratio of the low stream is the same as that of the high stream. Based on the current aspect ratio of the high stream, the system automatically allocates the resolution, frame rate, and bitrate of the low stream. If the sender has already called setDualStreamModeEx and set mode to DisableSimulcastStream (never send low stream), this method has no effect. You need to call setDualStreamModeEx again on the sender to change the setting.
   *
   * @param uid User ID.
   * @param streamType Video stream type: VideoStreamType.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes publishing the local audio stream.
   *
   * After this method is successfully called, the remote user triggers the onUserMuteAudio and onRemoteAudioStateChanged callbacks. This method does not affect the audio capture status because it does not disable the audio capturing device.
   *
   * @param mute Whether to stop publishing the local audio stream. true : Stop publishing. false : (Default) Publish.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteLocalAudioStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes publishing the local video stream.
   *
   * After this method is successfully called, the remote user triggers the onUserMuteVideo callback.
   *  This method does not affect the video capture status and does not disable the camera.
   *
   * @param mute Whether to stop sending the local video stream. true : Stop sending the local video stream. false : (Default) Send the local video stream.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteLocalVideoStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to all remote users' audio streams.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to remote users' audio streams, including those who join the channel after the method is called.
   *  This method must be called after joining a channel.
   *  To set the default behavior to not subscribe to remote users' audio streams before joining a channel, set autoSubscribeAudio to false when calling joinChannel.
   *
   * @param mute Whether to stop subscribing to all remote users' audio streams: true : Stop subscribing to all remote users' audio streams. false : (Default) Subscribe to all remote users' audio streams.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to all remote users' video streams.
   *
   * After this method is successfully called, the local user stops or resumes subscribing to all remote users' video streams, including those who join the channel after this method is called.
   *
   * @param mute Whether to stop subscribing to all remote users' video streams. true : Stop subscribing to all users' video streams. false : (Default) Subscribe to all users' video streams.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Sets the audio subscription blocklist.
   *
   * You can call this method to specify the audio streams you do not want to subscribe to.
   *  You can call this method either before or after joining a channel.
   *  The audio subscription blocklist is not affected by muteRemoteAudioStream, muteAllRemoteAudioStreams, or autoSubscribeAudio in ChannelMediaOptions.
   *  After setting the blocklist, if you leave and rejoin the channel, the blocklist remains effective.
   *  If a user is in both the audio subscription blocklist and allowlist, only the blocklist takes effect.
   *
   * @param uidList User ID list of the audio subscription blocklist.
   * If you want to exclude a specific user's audio stream from being subscribed to, add that user's ID to this list. To remove a user from the blocklist, you need to call the setSubscribeAudioBlocklist method again and update the user ID list to exclude the uid of the user you want to remove.
   * @param uidNumber The number of users in the blocklist.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Sets the audio subscription allowlist.
   *
   * You can call this method to specify the audio streams you want to subscribe to.
   *  This method can be called before or after joining a channel.
   *  The audio subscription allowlist is not affected by muteRemoteAudioStream, muteAllRemoteAudioStreams, or the autoSubscribeAudio setting in ChannelMediaOptions.
   *  After setting the allowlist, if you leave and rejoin the channel, the allowlist remains effective.
   *  If a user is included in both the audio subscription allowlist and blocklist, only the blocklist takes effect.
   *
   * @param uidList List of user IDs in the audio subscription allowlist.
   * If you want to subscribe to a specific user's audio stream, add that user's ID to this list. To remove a user from the allowlist, call setSubscribeAudioAllowlist again with an updated list that excludes the uid of the user you want to remove.
   * @param uidNumber Number of users in the allowlist.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Sets the video subscription blocklist.
   *
   * You can call this method to specify the video streams you do not want to subscribe to.
   *  You can call this method either before or after joining a channel.
   *  The video subscription blocklist is not affected by muteRemoteVideoStream, muteAllRemoteVideoStreams, or autoSubscribeVideo in ChannelMediaOptions.
   *  After setting the blocklist, if you leave and rejoin the channel, the blocklist remains effective.
   *  If a user is in both the audio subscription blocklist and allowlist, only the blocklist takes effect.
   *
   * @param uidList User ID list of the video subscription blocklist.
   * If you want to exclude a specific user's video stream from being subscribed to, add that user's ID to this list. To remove a user from the blocklist, you need to call the setSubscribeVideoBlocklist method again and update the user ID list to exclude the uid of the user you want to remove.
   * @param uidNumber The number of users in the blocklist.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Sets the video subscription allowlist.
   *
   * You can call this method to specify the video streams you want to subscribe to.
   *  You can call this method either before or after joining a channel.
   *  The video subscription allowlist is not affected by muteRemoteVideoStream, muteAllRemoteVideoStreams, or autoSubscribeVideo in ChannelMediaOptions.
   *  After setting the allowlist, if you leave and rejoin the channel, the allowlist remains effective.
   *  If a user is in both the audio subscription blocklist and allowlist, only the blocklist takes effect.
   *
   * @param uidList User ID list of the video subscription allowlist.
   * If you want to subscribe only to a specific user's video stream, add that user's ID to this list. To remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method again and update the video subscription allowlist to exclude the uid of the user you want to remove.
   * @param uidNumber The number of users in the allowlist.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Sets the subscription options for remote video streams.
   *
   * When the remote user sends dual streams, you can call this method to set the subscription options for the remote video stream.
   *
   * @param uid Remote user ID.
   * @param options Subscription settings for the video stream. See VideoSubscriptionOptions.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): number;

  /**
   * Sets the 2D position of a remote user's voice, i.e., horizontal position.
   *
   * Sets the spatial position and volume of a remote user's voice to help the local user locate the sound source.
   * By calling this method, you can set the position where the remote user's voice appears. The difference between the left and right channels creates a sense of direction, allowing the user to determine the real-time position of the remote user. In multiplayer online games such as battle royale, this method can effectively enhance the sense of direction of game characters and simulate a real environment.
   *  For the best audio experience, it is recommended that users wear wired headphones.
   *  This method must be called after joining a channel.
   *
   * @param uid The ID of the remote user.
   * @param pan Sets the spatial position of the remote user's voice. The range is [-1.0, 1.0]:
   *  -1.0: Voice appears on the left.
   *  (Default) 0.0: Voice appears in the center.
   *  1.0: Voice appears on the right.
   * @param gain Sets the volume of the remote user's voice. The range is [0.0, 100.0], with a default of 100.0, representing the original volume. The smaller the value, the lower the volume.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number;

  /**
   * Sets the remote view display mode.
   *
   * After initializing the remote user view, you can call this method to update the rendering and mirror mode of the remote user view as displayed locally. This method only affects the video image seen by the local user.
   *
   * @param uid Remote user ID.
   * @param renderMode The display mode of the remote view. See RenderModeType.
   * @param mirrorMode The mirror mode of the remote user view. See VideoMirrorModeType.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number;

  /**
   * @ignore
   */
  abstract adjustRecordingSignalVolumeEx(
    volume: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract muteRecordingSignalEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Adjusts the playback volume of a specified remote user locally.
   *
   * You can call this method during a call to adjust the playback volume of a specified remote user locally. To adjust the playback volume of multiple users locally, call this method multiple times.
   *
   * @param uid Remote user ID.
   * @param volume Volume. The range is [0,400].
   *  0: Mute.
   *  100: (Default) Original volume.
   *  400: Four times the original volume with built-in overflow protection.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): number;

  /**
   * Gets the current network connection state.
   *
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * The current network connection state. See ConnectionStateType.
   */
  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  /**
   * Enable or disable built-in encryption.
   *
   * After the user leaves the channel, the SDK automatically disables encryption. To re-enable encryption, you need to call this method before the user joins the channel again.
   *  All users in the same channel must use the same encryption mode and key when calling this method.
   *  If built-in encryption is enabled, you cannot use the CDN streaming feature.
   *
   * @param connection Connection information. See RtcConnection.
   * @param enabled Whether to enable built-in encryption: true : Enable built-in encryption. false : (default) Disable built-in encryption.
   * @param config Configure the built-in encryption mode and key. See EncryptionConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  /**
   * Creates a data stream.
   *
   * Within the lifecycle of IRtcEngine, each user can create up to 5 data streams. The data streams are destroyed when leaving the channel. You need to recreate them to use again.
   *
   * @param config Data stream configuration. See DataStreamConfig.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * The ID of the created data stream: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * Sends a data stream.
   *
   * After calling createDataStreamEx, you can call this method to send data stream messages to all users in the channel.
   * The SDK imposes the following restrictions on this method:
   *  Each client in the channel can have up to 5 data channels simultaneously, and the total sending bitrate of all data channels is limited to 30 KB/s.
   *  Each data channel can send up to 60 packets per second, with a maximum size of 1 KB per packet. After the method is successfully called, the remote end triggers the onStreamMessage callback, where the remote user can retrieve the received stream message. If the call fails, the remote end triggers the onStreamMessageError callback.
   *  This method must be called after joinChannelEx.
   *  Make sure to call createDataStreamEx to create a data channel before calling this method.
   *
   * @param streamId Data stream ID. Obtained via createDataStreamEx.
   * @param data Data to be sent.
   * @param length Length of the data.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract sendRdtMessageEx(
    uid: number,
    type: RdtStreamType,
    data: string,
    length: number,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract sendMediaControlMessageEx(
    uid: number,
    data: string,
    length: number,
    connection: RtcConnection
  ): number;

  /**
   * Adds a local video watermark.
   *
   * Deprecated Deprecated: This method is deprecated. Use addVideoWatermarkWithConfigEx instead. This method adds a PNG image as a watermark to the local published live video stream. Users in the same live channel, audience of the CDN live stream, and capture devices can all see or capture the watermark image. Currently, only one watermark can be added to the live video stream. A newly added watermark replaces the previous one.
   * The watermark coordinates depend on the settings in the setVideoEncoderConfigurationEx method:
   *  If the video encoding orientation (OrientationMode) is fixed to landscape or landscape in adaptive mode, landscape coordinates are used for the watermark.
   *  If the video encoding orientation (OrientationMode) is fixed to portrait or portrait in adaptive mode, portrait coordinates are used.
   *  When setting the watermark coordinates, the image area of the watermark must not exceed the video dimensions set in the setVideoEncoderConfigurationEx method. Otherwise, the exceeding part will be cropped.
   *  You must call this method after calling enableVideo.
   *  The watermark image must be in PNG format. This method supports all pixel formats of PNG: RGBA, RGB, Palette, Gray, and Alpha_gray.
   *  If the size of the PNG image to be added does not match the size you set in this method, the SDK will scale or crop the PNG image to match the setting.
   *  If you have already called startPreview to start local video preview, the visibleInPreview parameter in this method determines whether the watermark is visible in the preview.
   *  If local video is set to mirror mode, the local watermark will also be mirrored. To avoid the watermark being mirrored when local users view the local video, it is recommended not to use both mirror and watermark features for local video. Implement the local watermark feature at the application level.
   *
   * @param watermarkUrl The local path of the watermark image to be added. This method supports adding watermark images from local absolute/relative paths.
   * @param options Settings for the watermark image to be added. See WatermarkOptions.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  /**
   * Removes the specified watermark image from the local or remote video stream.
   *
   * Since Available since v4.6.2.
   *
   * @param id Watermark ID.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract removeVideoWatermarkEx(
    id: string,
    connection: RtcConnection
  ): number;

  /**
   * Removes added video watermarks.
   *
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  /**
   * Custom data reporting and analytics service.
   *
   * Agora provides custom data reporting and analytics services. This service is currently in a free beta period. During the beta, you can send up to 10 custom data messages within 6 seconds. Each message must not exceed 256 bytes, and each string must not exceed 100 bytes. To try this service, please [contact sales](https://www.shengwang.cn/contact-sales/) to enable it and agree on the custom data format.
   */
  abstract sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number;

  /**
   * Enables audio volume indication.
   *
   * This method allows the SDK to periodically report the volume information of the local user who is sending audio and up to three remote users with the highest instantaneous volume to the app.
   *
   * @param interval Sets the time interval between two consecutive volume indications:
   *  ≤ 0: Disables the volume indication.
   *  > 0: The time interval (ms) between volume indications. We recommend setting it to greater than 100 ms; it must not be less than 10 ms, or you will not receive the onAudioVolumeIndication callback.
   * @param smooth The smoothing factor that sets the sensitivity of the volume indication. The range is [0,10], and the recommended value is 3. The larger the value, the more sensitive the volume fluctuation; the smaller the value, the smoother the fluctuation.
   * @param reportVad true : Enables the local voice activity detection. Once enabled, the vad parameter in the onAudioVolumeIndication callback indicates whether the local user is speaking. false : (Default) Disables the local voice activity detection. Unless the engine automatically detects local voice activity, the vad parameter in the onAudioVolumeIndication callback does not indicate whether the local user is speaking.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Starts RTMP streaming without transcoding.
   *
   * Agora recommends using the more advanced server-side streaming feature. See [Implement server-side streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * Call this method to push live audio and video streams to the specified RTMP streaming URL. This method can push to only one URL at a time. To push to multiple URLs, call this method multiple times.
   * After calling this method, the SDK triggers the onRtmpStreamingStateChanged callback locally to report the streaming status.
   *  Call this method after joining a channel.
   *  Only hosts in live streaming scenarios can call this method.
   *  If the streaming fails and you want to restart it, make sure to call stopRtmpStream first before calling this method again. Otherwise, the SDK will return the same error code as the previous failed attempt.
   *
   * @param url The RTMP or RTMPS streaming URL. The maximum length is 1024 bytes. Chinese characters and special characters are not supported.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -2: Invalid URL or transcoding parameter. Check your URL or parameter settings.
   *  -7: SDK not initialized before calling this method.
   *  -19: The RTMP streaming URL is already in use. Use a different URL.
   */
  abstract startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: RtcConnection
  ): number;

  /**
   * Starts pushing media streams to a CDN and sets the transcoding configuration.
   *
   * Agora recommends using the more comprehensive server-side CDN streaming service. See [Implement server-side CDN streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * Call this method to push live audio and video streams to the specified CDN streaming URL and set the transcoding configuration. This method can only push media streams to one URL at a time. To push to multiple URLs, call this method multiple times.
   * After calling this method, the SDK triggers the onRtmpStreamingStateChanged callback locally to report the streaming status.
   *  Make sure the CDN streaming service is enabled.
   *  Call this method after joining a channel.
   *  Only hosts in a live streaming scenario can call this method.
   *  If the streaming fails and you want to restart it, you must call stopRtmpStreamEx before calling this method again. Otherwise, the SDK returns the same error code as the previous failure.
   *
   * @param url The CDN streaming URL. The format must be RTMP or RTMPS. The character length must not exceed 1024 bytes. Chinese characters and other special characters are not supported.
   * @param transcoding The transcoding configuration for CDN streaming. See LiveTranscoding.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -2: The URL or transcoding parameter is invalid. Check your URL or parameter settings.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The CDN streaming URL is already in use. Use another CDN streaming URL.
   */
  abstract startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /**
   * Updates the transcoding configuration for CDN streaming.
   *
   * Agora recommends using the more comprehensive server-side CDN streaming service. See [Implement server-side CDN streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * After enabling transcoding streaming, you can dynamically update the transcoding configuration based on your scenario. After the update, the SDK triggers the onTranscodingUpdated callback.
   *
   * @param transcoding The transcoding configuration for CDN streaming. See LiveTranscoding.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract updateRtmpTranscodingEx(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /**
   * Stops CDN streaming.
   *
   * Agora recommends using the more comprehensive server-side CDN streaming service. See [Implement server-side CDN streaming](https://doc.shengwang.cn/doc/media-push/restful/landing-page).
   * Call this method to stop the live streaming to the specified CDN streaming URL. This method can only stop streaming to one URL at a time. To stop streaming to multiple URLs, call this method multiple times.
   * After calling this method, the SDK triggers the onRtmpStreamingStateChanged callback locally to report the streaming status.
   *
   * @param url The CDN streaming URL. The format must be RTMP or RTMPS. The character length must not exceed 1024 bytes. Chinese characters and other special characters are not supported.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: The method call succeeds.
   *  < 0: The method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract stopRtmpStreamEx(url: string, connection: RtcConnection): number;

  /**
   * Starts or updates the media stream relay across channels.
   *
   * When you call this method for the first time, it starts to relay media streams across channels. To relay to multiple destination channels or to stop relaying to a specific channel, you can call this method again to add or remove destination channels. This function supports relaying to up to six destination channels.
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback to report the current state of the media stream relay across channels. Common states include:
   *  If onChannelMediaRelayStateChanged reports RelayStateRunning (2) and RelayOk (0), it means the SDK has started relaying media streams between the source and destination channels.
   *  If onChannelMediaRelayStateChanged reports RelayStateFailure (3), it means an error occurred during the media stream relay across channels.
   *  Call this method after successfully joining a channel.
   *  In a live streaming scenario, only users with the host role can call this method.
   *  To enable media stream relay across channels, [contact technical support](https://ticket.shengwang.cn/).
   *  This function does not support string-type UIDs.
   *
   * @param configuration The configuration for media stream relay across channels. See ChannelMediaRelayConfiguration.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -1: General error (not categorized).
   *  -2: Invalid parameter.
   *  -8: Internal state error. Possibly because the user is not a host.
   */
  abstract startOrUpdateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * Stops the media stream relay across channels. Once stopped, the host leaves all destination channels.
   *
   * After a successful call, the SDK triggers the onChannelMediaRelayStateChanged callback. If it reports RelayStateIdle (0) and RelayOk (0), it indicates that the media stream relay has stopped. If the method call fails, the SDK triggers the onChannelMediaRelayStateChanged callback and reports error codes RelayErrorServerNoResponse (2) or RelayErrorServerConnectionLost (8). You can call the leaveChannel method to leave the channel, and the media stream relay will automatically stop.
   *
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and troubleshooting.
   *  -5: The method call is rejected. There is no ongoing media stream relay across channels.
   */
  abstract stopChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * Pauses media stream forwarding to all destination channels.
   *
   * After starting media stream forwarding across channels, you can call this method to pause forwarding to all channels. To resume forwarding, call the resumeAllChannelMediaRelay method. You must call this method after calling startOrUpdateChannelMediaRelayEx to start media stream forwarding across channels.
   *
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -5: This method call was rejected. No ongoing cross-channel media stream forwarding exists.
   */
  abstract pauseAllChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * Resumes media stream forwarding to all destination channels.
   *
   * After calling the pauseAllChannelMediaRelayEx method, you can call this method to resume media stream forwarding to all destination channels. You must call this method after pauseAllChannelMediaRelayEx.
   *
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: The method call was successful.
   *  < 0: The method call failed. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   *  -5: This method call was rejected. No paused cross-channel media stream forwarding exists.
   */
  abstract resumeAllChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * @ignore
   */
  abstract getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo;

  /**
   * @ignore
   */
  abstract getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo;

  /**
   * Enables or disables the dual-stream mode on the sender side.
   *
   * Deprecated Deprecated: Deprecated since v4.2.0. Use setDualStreamModeEx instead. You can call this method on the sender side to enable or disable dual-stream mode. Dual-stream refers to high-quality and low-quality video streams:
   *  High-quality stream: High resolution and high frame rate video stream.
   *  Low-quality stream: Low resolution and low frame rate video stream. After enabling dual-stream mode, you can call setRemoteVideoStreamType on the receiver side to choose to receive either the high-quality or low-quality video stream. This method applies to all types of streams sent by the sender, including but not limited to camera-captured video, screen sharing, and custom video streams.
   *
   * @param enabled Whether to enable dual-stream mode: true : Enable dual-stream mode. false : (Default) Disable dual-stream mode.
   * @param streamConfig Configuration for the low-quality video stream. See SimulcastStreamConfig. When mode is set to DisableSimulcastStream, setting streamConfig has no effect.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Method call succeeds.
   *  < 0: Method call fails. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * Sets the dual-stream mode on the sender side.
   *
   * By default, the SDK enables the adaptive low-quality stream mode (AutoSimulcastStream) on the sender side, meaning the sender does not actively send the low-quality stream. A receiver with host role can call setRemoteVideoStreamTypeEx to request the low-quality stream, and the sender starts sending it automatically upon receiving the request.
   *  To change this behavior, call this method and set mode to DisableSimulcastStream (never send low-quality stream) or EnableSimulcastStream (always send low-quality stream).
   *  To revert to the default behavior after making changes, call this method again and set mode to AutoSimulcastStream. The differences and similarities between this method and enableDualStreamModeEx are as follows:
   *  Calling this method with mode set to DisableSimulcastStream is equivalent to enableDualStreamModeEx(false).
   *  Calling this method with mode set to EnableSimulcastStream is equivalent to enableDualStreamModeEx(true).
   *  Both methods can be called before or after joining a channel. If both are used, the settings from the later call take precedence.
   *
   * @param mode The mode for sending video streams. See SimulcastStreamMode.
   * @param streamConfig Configuration for the low-quality video stream. See SimulcastStreamConfig. When mode is set to DisableSimulcastStream, streamConfig has no effect.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Code](https://doc.shengwang.cn/api-ref/rtc/rn/error-code) for details and resolution suggestions.
   */
  abstract setDualStreamModeEx(
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setSimulcastConfigEx(
    simulcastConfig: SimulcastConfig,
    connection: RtcConnection
  ): number;

  /**
   * @ignore
   */
  abstract setHighPriorityUserListEx(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions,
    connection: RtcConnection
  ): number;

  /**
   * Takes a snapshot of the video using the connection ID.
   *
   * This method takes a snapshot of the specified user's video stream, generates a JPG image, and saves it to the specified path.
   *  When this method returns, the SDK has not actually taken the snapshot.
   *  When used for local video snapshot, it captures the video stream specified in ChannelMediaOptions.
   *  If the video has been pre-processed, such as with watermarking or beautification, the snapshot will include the effects of the pre-processing.
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid User ID. Set to 0 to capture the local user's video.
   * @param filePath Make sure the directory exists and is writable. The local path where the snapshot is saved, including the file name and format. For example:
   *  iOS: /App Sandbox/Library/Caches/example.jpg
   *  Android: /storage/emulated/0/Android/data/<package name>/files/example.jpg
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract takeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): number;

  /**
   * Enables/disables local snapshot upload.
   *
   * This method allows capturing and uploading snapshots of multiple video streams. After local snapshot upload is enabled, the SDK captures and uploads snapshots of the video sent by the local user based on the module type and frequency you set in ContentInspectConfig. Once the snapshot is complete, the Agora server sends a callback notification to your server via HTTPS and uploads all snapshots to your specified third-party cloud storage. Before calling this method, make sure you have [contacted technical support](https://ticket.shengwang.cn/) to enable the local snapshot upload service.
   *
   * @param enabled Specifies whether to enable local snapshot upload: true : Enable local snapshot upload. false : Disable local snapshot upload.
   * @param config Configuration for local snapshot upload. See ContentInspectConfig.
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract enableContentInspectEx(
    enabled: boolean,
    config: ContentInspectConfig,
    connection: RtcConnection
  ): number;

  /**
   * Starts video frame rendering tracing.
   *
   * After this method is successfully called, the SDK uses the time of the call as the starting point and reports video frame rendering information through the onVideoRenderingTracingResult callback.
   *  If you do not call this method, the SDK uses the time of calling joinChannel to join the channel as the default starting point and automatically starts tracing video rendering events. You can call this method at an appropriate time based on your business scenario to customize the tracing point.
   *  After leaving the current channel, the SDK automatically resets the tracing point to the next time you join a channel.
   *
   * @param connection Connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract startMediaRenderingTracingEx(connection: RtcConnection): number;

  /**
   * @ignore
   */
  abstract setParametersEx(
    connection: RtcConnection,
    parameters: string
  ): number;

  /**
   * Get the call ID using the connection ID.
   *
   * Each time the client joins a channel, a corresponding callId is generated to identify the call session. You can call this method to obtain the callId parameter, then pass it to methods like rate and complain.
   *
   * @param connection Connection information. See RtcConnection.
   */
  abstract getCallIdEx(connection: RtcConnection): string;

  /**
   * @ignore
   */
  abstract sendAudioMetadataEx(
    connection: RtcConnection,
    metadata: string,
    length: number
  ): number;

  /**
   * Preloads the specified sound effect into the channel.
   *
   * Since Available since v4.6.2. Each time you call this method, only one sound effect file can be preloaded into memory. To preload multiple sound effect files, call this method multiple times. After preloading, you can call playEffect to play the preloaded sound effect, or call playAllEffects to play all preloaded sound effects.
   *  To ensure a smooth experience, the size of the sound effect file should not exceed the limit.
   *  Agora recommends calling this method before joining a channel.
   *  If preloadEffectEx is called before playEffectEx, then after playEffectEx is executed, the file resource is not released. The next playEffectEx call will start playback from the beginning.
   *  If preloadEffectEx is not called before playEffectEx, then after playEffectEx is executed, the resource is destroyed. The next playEffectEx call will attempt to reopen the file and play from the beginning.
   *
   * @param connection Connection information. See RtcConnection.
   * @param soundId Sound effect ID.
   * @param filePath Absolute path of the local file or URL of the online file. Supported audio formats include: mp3, mp4, m4a, aac, 3gp, mkv, and wav.
   * @param startPos Start position for playing the sound effect file (in milliseconds).
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract preloadEffectEx(
    connection: RtcConnection,
    soundId: number,
    filePath: string,
    startPos?: number
  ): number;

  /**
   * Plays the specified sound effect in the channel.
   *
   * Since Available since v4.6.2. You can call this method to play the specified sound effect to all users in the channel. Each call can only play one sound effect. To play multiple sound effects simultaneously, use different soundId and filePath values and call this method multiple times. You can also set whether to publish the sound effect in the channel.
   *  Agora recommends not playing more than three sound effects simultaneously.
   *  The sound effect ID and file path in this method must match those used in the preloadEffectEx method.
   *  If preloadEffectEx is called before playEffectEx, then after playEffectEx is executed, the file resource is not released. The next playEffectEx call will start playback from the beginning.
   *  If preloadEffectEx is not called before playEffectEx, then after playEffectEx is executed, the resource is destroyed. The next playEffectEx call will attempt to reopen the file and play from the beginning.
   *
   * @param connection RtcConnection object. See RtcConnection.
   * @param soundId Sound effect ID.
   * @param filePath Absolute path of the local file or URL of the online file. Supported audio formats include mp3, mp4, m4a, aac, 3gp, mkv, and wav.
   * @param loopCount Number of times to loop the sound effect: -1 : Infinite loop until stopEffect or stopAllEffects is called. 0 : Play once. 1 : Play twice.
   * @param pitch Pitch of the sound effect. Range: 0.5 to 2.0. Default is 1.0 (original pitch). The smaller the value, the lower the pitch.
   * @param pan Spatial position of the sound effect. Range: -1.0 to 1.0: -1.0 : Sound comes from the left. 0.0 : Sound comes from the front. 1.0 : Sound comes from the right.
   * @param gain Volume of the sound effect. Range: 0 to 100. Default is 100 (original volume). The smaller the value, the lower the volume.
   * @param publish Whether to publish the sound effect in the channel: true : Publish the sound effect in the channel. false : (Default) Do not publish the sound effect in the channel.
   * @param startPos Start position for playing the sound effect file, in milliseconds.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract playEffectEx(
    connection: RtcConnection,
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish?: boolean,
    startPos?: number
  ): number;

  /**
   * Takes a snapshot of the video at a specified observation point using the connection ID.
   *
   * This method takes a snapshot of the specified user's video stream, generates a JPG image, and saves it to the specified path.
   *  When this method returns, the SDK has not actually taken the snapshot.
   *  When used for local video snapshot, it captures the video stream specified in ChannelMediaOptions.
   *  If the video has been pre-processed, such as with watermarking or beautification, the snapshot will include the effects of the pre-processing.
   *
   * @param connection Connection information. See RtcConnection.
   * @param uid User ID. Set to 0 to capture the local user's video.
   * @param config Snapshot configuration. See SnapshotConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See [Error Codes](https://docs.agora.io/en/video-calling/troubleshooting/error-codes) for details and resolution suggestions.
   */
  abstract takeSnapshotWithConfigEx(
    connection: RtcConnection,
    uid: number,
    config: SnapshotConfig
  ): number;

  /**
   * Adds a watermark image to the local video.
   *
   * Since Available since v4.6.2.
   *
   * @param config Watermark configuration. See WatermarkConfig.
   * @param connection RtcConnection object. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract addVideoWatermarkWithConfigEx(
    config: WatermarkConfig,
    connection: RtcConnection
  ): number;
}
