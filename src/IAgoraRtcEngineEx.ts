import './extension/IAgoraRtcEngineExExtension';
import {
  ChannelMediaRelayConfiguration,
  ConnectionStateType,
  DataStreamConfig,
  EncryptionConfig,
  LiveTranscoding,
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
 * Contains connection information.
 */
export class RtcConnection {
  /**
   * The channel name.
   */
  channelId?: string;
  /**
   * The ID of the local user.
   */
  localUid?: number;
}

/**
 * This interface class contains multi-channel methods.
 *
 * Inherited from IRtcEngine.
 */
export abstract class IRtcEngineEx extends IRtcEngine {
  /**
   * Joins a channel.
   *
   * You can call this method multiple times to join more than one channel. If you want to join the same channel from different devices, ensure that the user IDs are different for all devices.
   *
   * @param token The token generated on your server for authentication.
   *  (Recommended) If your project has enabled the security mode (using APP ID and Token for authentication), this parameter is required.
   *  If you have only enabled the testing mode (using APP ID for authentication), this parameter is optional. You will automatically exit the channel 24 hours after successfully joining in.
   *  If you need to join different channels at the same time or switch between channels, Agora recommends using a wildcard token so that you don't need to apply for a new token every time joining a channel.
   * @param connection The connection information. See RtcConnection.
   * @param options The channel media options. See ChannelMediaOptions.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in ChannelMediaOptions is invalid. You need to pass in a valid parameter and join the channel again.
   *  -3: Fails to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.
   *  -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is wrong. The typical cause is that after calling startEchoTest to start a call loop test, you call this method to join the channel without calling stopEchoTest to stop the test. You need to call stopEchoTest before calling this method.
   *  -17: The request to join the channel is rejected. The typical cause is that the user is already in the channel. Agora recommends that you use the onConnectionStateChanged callback to see whether the user is in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected (1) state.
   *  -102: The channel name is invalid. You need to pass in a valid channel name in channelId to rejoin the channel.
   *  -121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  /**
   * Sets channel options and leaves the channel.
   *
   * After calling this method, the SDK terminates the audio and video interaction, leaves the current channel, and releases all resources related to the session. After calling joinChannelEx to join a channel, you must call this method to end the call, otherwise, the next call cannot be started.
   *  This method call is asynchronous. When this method returns, it does not necessarily mean that the user has left the channel.
   *  If you call leaveChannel, you will leave all the channels you have joined by calling joinChannel or joinChannelEx.
   *
   * @param connection The connection information. See RtcConnection.
   * @param options The options for leaving the channel. See LeaveChannelOptions. This parameter only supports the stopMicrophoneRecording member in the LeaveChannelOptions settings; setting other members does not take effect.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Updates the channel media options after joining the channel.
   *
   * @param options The channel media options. See ChannelMediaOptions.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The value of a member in ChannelMediaOptions is invalid. For example, the token or the user ID is invalid. You need to fill in a valid parameter.
   *  -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is wrong. The possible reason is that the user is not in the channel. Agora recommends that you use the onConnectionStateChanged callback to see whether the user is in the channel. If you receive the ConnectionStateDisconnected (1) or ConnectionStateFailed (5) state, the user is not in the channel. You need to call joinChannel to join a channel before calling this method.
   */
  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  /**
   * Sets the video encoder configuration.
   *
   * Sets the encoder configuration for the local video. Each configuration profile corresponds to a set of video parameters, including the resolution, frame rate, and bitrate.
   *
   * @param config Video profile. See VideoEncoderConfiguration.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Stops or resumes receiving the audio stream of a specified user.
   *
   * @param uid The ID of the specified user.
   * @param mute Whether to stop receiving the audio stream of the specified user: true : Stop receiving the audio stream of the specified user. false : (Default) Resume receiving the audio stream of the specified user.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes receiving the video stream of a specified user.
   *
   * This method is used to stop or resume receiving the video stream of a specified user. You can call this method before or after joining a channel. If a user leaves a channel, the settings in this method become invalid.
   *
   * @param uid The user ID of the remote user.
   * @param mute Whether to stop receiving the video stream of the specified user: true : Stop receiving the video stream of the specified user. false : (Default) Resume receiving the video stream of the specified user.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Sets the video stream type to subscribe to.
   *
   * The SDK will dynamically adjust the size of the corresponding video stream based on the size of the video window to save bandwidth and computing resources. The default aspect ratio of the low-quality video stream is the same as that of the high-quality video stream. According to the current aspect ratio of the high-quality video stream, the system will automatically allocate the resolution, frame rate, and bitrate of the low-quality video stream. Depending on the default behavior of the sender and the specific settings when calling setDualStreamMode, the scenarios for the receiver calling this method are as follows:
   *  The SDK enables low-quality video stream adaptive mode (AutoSimulcastStream) on the sender side by default, meaning only the high-quality video stream is transmitted. Only the receiver with the role of the host can call this method to initiate a low-quality video stream request. Once the sender receives the request, it starts automatically sending the low-quality video stream. At this point, all users in the channel can call this method to switch to low-quality video stream subscription mode.
   *  If the sender calls setDualStreamMode and sets mode to DisableSimulcastStream (never send low-quality video stream), then calling this method will have no effect.
   *  If the sender calls setDualStreamMode and sets mode to EnableSimulcastStream (always send low-quality video stream), both the host and audience receivers can call this method to switch to low-quality video stream subscription mode.
   *  If the publisher has already called setDualStreamModeEx and set mode to DisableSimulcastStream (never send low-quality video stream), calling this method will not take effect, you should call setDualStreamModeEx again on the sending end and adjust the settings.
   *  Calling this method on the receiving end of the audience role will not take effect.
   *
   * @param uid The user ID.
   * @param streamType The video stream type, see VideoStreamType.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes publishing the local audio stream.
   *
   * This method does not affect any ongoing audio recording, because it does not disable the audio capture device. A successful call of this method triggers the onUserMuteAudio and onRemoteAudioStateChanged callbacks on the remote client.
   *
   * @param mute Whether to stop publishing the local audio stream: true : Stops publishing the local audio stream. false : (Default) Resumes publishing the local audio stream.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteLocalAudioStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes publishing the local video stream.
   *
   * A successful call of this method triggers the onUserMuteVideo callback on the remote client.
   *  This method does not affect any ongoing video recording, because it does not disable the camera.
   *
   * @param mute Whether to stop publishing the local video stream. true : Stop publishing the local video stream. false : (Default) Publish the local video stream.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteLocalVideoStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to the audio streams of all remote users.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including the ones join the channel subsequent to this call.
   *  Call this method after joining a channel.
   *  If you do not want to subscribe the audio streams of remote users before joining a channel, you can set autoSubscribeAudio as false when calling joinChannel.
   *
   * @param mute Whether to stop subscribing to the audio streams of all remote users: true : Stops subscribing to the audio streams of all remote users. false : (Default) Subscribes to the audio streams of all remote users by default.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to the video streams of all remote users, including all subsequent users.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users. true : Stop subscribing to the video streams of all remote users. false : (Default) Subscribe to the video streams of all remote users by default.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Set the blocklist of subscriptions for audio streams.
   *
   * You can call this method to specify the audio streams of a user that you do not want to subscribe to.
   *  You can call this method either before or after joining a channel.
   *  The blocklist is not affected by the setting in muteRemoteAudioStream, muteAllRemoteAudioStreams, and autoSubscribeAudio in ChannelMediaOptions.
   *  Once the blocklist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.
   *
   * @param uidList The user ID list of users that you do not want to subscribe to. If you want to specify the audio streams of a user that you do not want to subscribe to, add the user ID in this list. If you want to remove a user from the blocklist, you need to call the setSubscribeAudioBlocklist method to update the user ID list; this means you only add the uid of users that you do not want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Sets the allowlist of subscriptions for audio streams.
   *
   * You can call this method to specify the audio streams of a user that you want to subscribe to.
   *  If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.
   *  You can call this method either before or after joining a channel.
   *  The allowlist is not affected by the setting in muteRemoteAudioStream, muteAllRemoteAudioStreams and autoSubscribeAudio in ChannelMediaOptions.
   *  Once the allowlist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *
   * @param uidList The user ID list of users that you want to subscribe to. If you want to specify the audio streams of a user for subscription, add the user ID in this list. If you want to remove a user from the allowlist, you need to call the setSubscribeAudioAllowlist method to update the user ID list; this means you only add the uid of users that you want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Set the blocklist of subscriptions for video streams.
   *
   * You can call this method to specify the video streams of a user that you do not want to subscribe to.
   *  If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.
   *  Once the blocklist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  You can call this method either before or after joining a channel.
   *  The blocklist is not affected by the setting in muteRemoteVideoStream, muteAllRemoteVideoStreams and autoSubscribeAudio in ChannelMediaOptions.
   *
   * @param uidList The user ID list of users that you do not want to subscribe to. If you want to specify the video streams of a user that you do not want to subscribe to, add the user ID of that user in this list. If you want to remove a user from the blocklist, you need to call the setSubscribeVideoBlocklist method to update the user ID list; this means you only add the uid of users that you do not want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Set the allowlist of subscriptions for video streams.
   *
   * You can call this method to specify the video streams of a user that you want to subscribe to.
   *  If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.
   *  Once the allowlist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  You can call this method either before or after joining a channel.
   *  The allowlist is not affected by the setting in muteRemoteVideoStream, muteAllRemoteVideoStreams and autoSubscribeAudio in ChannelMediaOptions.
   *
   * @param uidList The user ID list of users that you want to subscribe to. If you want to specify the video streams of a user for subscription, add the user ID of that user in this list. If you want to remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method to update the user ID list; this means you only add the uid of users that you want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Options for subscribing to remote video streams.
   *
   * When a remote user has enabled dual-stream mode, you can call this method to choose the option for subscribing to the video streams sent by the remote user.
   *
   * @param uid The user ID of the remote user.
   * @param options The video subscription options. See VideoSubscriptionOptions.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): number;

  /**
   * Sets the 2D position (the position on the horizontal plane) of the remote user's voice.
   *
   * This method sets the voice position and volume of a remote user. When the local user calls this method to set the voice position of a remote user, the voice difference between the left and right channels allows the local user to track the real-time position of the remote user, creating a sense of space. This method applies to massive multiplayer online games, such as Battle Royale games.
   *  For the best voice positioning, Agora recommends using a wired headset.
   *  Call this method after joining a channel.
   *
   * @param uid The user ID of the remote user.
   * @param pan The voice position of the remote user. The value ranges from -1.0 to 1.0:
   *  -1.0: The remote voice comes from the left.
   *  0.0: (Default) The remote voice comes from the front.
   *  1.0: The remote voice comes from the right.
   * @param gain The volume of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original volume of the remote user). The smaller the value, the lower the volume.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Sets the video display mode of a specified remote user.
   *
   * After initializing the video view of a remote user, you can call this method to update its rendering and mirror modes. This method affects only the video view that the local user sees.
   *  Call this method after rendering the RtcSurfaceView or RtcTextureView component corresponding to the remote user ID.
   *  During a call, you can call this method as many times as necessary to update the display mode of the video view of a remote user.
   *
   * @param uid The user ID of the remote user.
   * @param renderMode The video display mode of the remote user. See RenderModeType.
   * @param mirrorMode The mirror mode of the remote user view. See VideoMirrorModeType.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Adjusts the playback signal volume of a specified remote user.
   *
   * You can call this method to adjust the playback volume of a specified remote user. To adjust the playback volume of different remote users, call the method as many times, once for each remote user.
   *
   * @param uid The user ID of the remote user.
   * @param volume The volume of the user. The value range is [0,400].
   *  0: Mute.
   *  100: (Default) The original volume.
   *  400: Four times the original volume (amplifying the audio signals by four times).
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): number;

  /**
   * Gets the current connection state of the SDK.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * The current connection state. See ConnectionStateType.
   */
  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  /**
   * Enables or disables the built-in encryption.
   *
   * After the user leaves the channel, the SDK automatically disables the built-in encryption. To enable the built-in encryption, call this method before the user joins the channel again.
   *
   * @param connection The connection information. See RtcConnection.
   * @param enabled Whether to enable built-in encryption: true : Enable the built-in encryption. false : (Default) Disable the built-in encryption.
   * @param config Built-in encryption configurations. See EncryptionConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  /**
   * Creates a data stream.
   *
   * @param config The configurations for the data stream. See DataStreamConfig.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * ID of the created data stream, if the method call succeeds.
   *  < 0: Failure.
   */
  abstract createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * Sends data stream messages.
   *
   * A successful method call triggers the onStreamMessage callback on the remote client, from which the remote user gets the stream message. A failed method call triggers the onStreamMessageError callback on the remote client. The SDK has the following restrictions on this method:
   *  Each client within the channel can have up to 5 data channels simultaneously, with a total shared packet bitrate limit of 30 KB/s for all data channels.
   *  Each data channel can send up to 60 packets per second, with each packet being a maximum of 1 KB. After calling createDataStreamEx, you can call this method to send data stream messages to all users in the channel.
   *  Call this method after joinChannelEx.
   *  Ensure that you call createDataStreamEx to create a data channel before calling this method.
   *  This method applies only to the COMMUNICATION profile or to the hosts in the LIVE_BROADCASTING profile. If an audience in the LIVE_BROADCASTING profile calls this method, the audience may be switched to a host.
   *
   * @param streamId The data stream ID. You can get the data stream ID by calling createDataStreamEx.
   * @param data The message to be sent.
   * @param length The length of the data.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  /**
   * Adds a watermark image to the local video.
   *
   * This method adds a PNG watermark image to the local video in the live streaming. Once the watermark image is added, all the audience in the channel (CDN audience included), and the capturing device can see and capture it. The Agora SDK supports adding only one watermark image onto a local video or CDN live stream. The newly added watermark image replaces the previous one. The watermark coordinates are dependent on the settings in the setVideoEncoderConfigurationEx method:
   *  If the orientation mode of the encoding video (OrientationMode) is fixed landscape mode or the adaptive landscape mode, the watermark uses the landscape orientation.
   *  If the orientation mode of the encoding video (OrientationMode) is fixed portrait mode or the adaptive portrait mode, the watermark uses the portrait orientation.
   *  When setting the watermark position, the region must be less than the dimensions set in the setVideoEncoderConfigurationEx method; otherwise, the watermark image will be cropped.
   *  Ensure that you have called enableVideo before calling this method.
   *  This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.
   *  If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.
   *  If you have enabled the local video preview by calling the startPreview method, you can use the visibleInPreview member to set whether or not the watermark is visible in the preview.
   *  If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time. You can implement the watermark function in your application layer.
   *
   * @param watermarkUrl The local file path of the watermark image to be added. This method supports adding a watermark image from the local absolute or relative file path.
   * @param options The options of the watermark image to be added. See WatermarkOptions.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  /**
   * Removes the watermark image from the video stream.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  /**
   * Agora supports reporting and analyzing customized messages.
   *
   * Agora supports reporting and analyzing customized messages. This function is in the beta stage with a free trial. The ability provided in its beta test version is reporting a maximum of 10 message pieces within 6 seconds, with each message piece not exceeding 256 bytes and each string not exceeding 100 bytes. To try out this function, contact and discuss the format of customized messages with us.
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
   * Enables the reporting of users' volume indication.
   *
   * This method enables the SDK to regularly report the volume information to the app of the local user who sends a stream and remote users (three users at most) whose instantaneous volumes are the highest.
   *
   * @param interval Sets the time interval between two consecutive volume indications:
   *  ≤ 0: Disables the volume indication.
   *  > 0: Time interval (ms) between two consecutive volume indications. Ensure this parameter is set to a value greater than 10, otherwise you will not receive the onAudioVolumeIndication callback. Agora recommends that this value is set as greater than 100.
   * @param smooth The smoothing factor that sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The recommended value is 3. The greater the value, the more sensitive the indicator.
   * @param reportVad true : Enables the voice activity detection of the local user. Once it is enabled, the vad parameter of the onAudioVolumeIndication callback reports the voice activity status of the local user. false : (Default) Disables the voice activity detection of the local user. Once it is disabled, the vad parameter of the onAudioVolumeIndication callback does not report the voice activity status of the local user, except for the scenario where the engine automatically detects the voice activity of the local user.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Starts pushing media streams to a CDN without transcoding.
   *
   * Call this method after joining a channel.
   *  Only hosts in the LIVE_BROADCASTING profile can call this method.
   *  If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push. Agora recommends that you use the server-side Media Push function. You can call this method to push an audio or video stream to the specified CDN address. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times. After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The URL or configuration of transcoding is invalid; check your URL and transcoding configurations.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The Media Push URL is already in use; use another URL instead.
   */
  abstract startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: RtcConnection
  ): number;

  /**
   * Starts Media Push and sets the transcoding configuration.
   *
   * Agora recommends that you use the server-side Media Push function. You can call this method to push a live audio-and-video stream to the specified CDN address and set the transcoding configuration. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times. After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *  Ensure that you enable the Media Push service before using this function.
   *  Call this method after joining a channel.
   *  Only hosts in the LIVE_BROADCASTING profile can call this method.
   *  If you want to retry pushing streams after a failed push, make sure to call stopRtmpStreamEx first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param transcoding The transcoding configuration for Media Push. See LiveTranscoding.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The URL or configuration of transcoding is invalid; check your URL and transcoding configurations.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The Media Push URL is already in use; use another URL instead.
   */
  abstract startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /**
   * Updates the transcoding configuration.
   *
   * Agora recommends that you use the server-side Media Push function. After you start pushing media streams to CDN with transcoding, you can dynamically update the transcoding configuration according to the scenario. The SDK triggers the onTranscodingUpdated callback after the transcoding configuration is updated.
   *
   * @param transcoding The transcoding configuration for Media Push. See LiveTranscoding.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract updateRtmpTranscodingEx(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /**
   * Stops pushing media streams to a CDN.
   *
   * Agora recommends that you use the server-side Media Push function. You can call this method to stop the live stream on the specified CDN address. This method can stop pushing media streams to only one CDN address at a time, so if you need to stop pushing streams to multiple addresses, call this method multiple times. After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract stopRtmpStreamEx(url: string, connection: RtcConnection): number;

  /**
   * Starts relaying media streams across channels or updates channels for media relay.
   *
   * The first successful call to this method starts relaying media streams from the source channel to the destination channels. To relay the media stream to other channels, or exit one of the current media relays, you can call this method again to update the destination channels. This feature supports relaying media streams to a maximum of six destination channels. After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback, and this callback returns the state of the media stream relay. Common states are as follows:
   *  If the onChannelMediaRelayStateChanged callback returns RelayStateRunning (2) and RelayOk (0), it means that the SDK starts relaying media streams from the source channel to the destination channel.
   *  If the onChannelMediaRelayStateChanged callback returns RelayStateFailure (3), an exception occurs during the media stream relay.
   *  Call this method after joining the channel.
   *  This method takes effect only when you are a host in a live streaming channel.
   *  The relaying media streams across channels function needs to be enabled by contacting.
   *  Agora does not support string user accounts in this API.
   *
   * @param configuration The configuration of the media stream relay. See ChannelMediaRelayConfiguration.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -1: A general error occurs (no specified reason).
   *  -2: The parameter is invalid.
   *  -8: Internal state error. Probably because the user is not a broadcaster.
   */
  abstract startOrUpdateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * Stops the media stream relay. Once the relay stops, the host quits all the target channels.
   *
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback. If the callback reports RelayStateIdle (0) and RelayOk (0), the host successfully stops the relay. If the method call fails, the SDK triggers the onChannelMediaRelayStateChanged callback with the RelayErrorServerNoResponse (2) or RelayErrorServerConnectionLost (8) status code. You can call the leaveChannel method to leave the channel, and the media stream relay automatically stops.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -5: The method call was rejected. There is no ongoing channel media relay.
   */
  abstract stopChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * Pauses the media stream relay to all target channels.
   *
   * After the cross-channel media stream relay starts, you can call this method to pause relaying media streams to all target channels; after the pause, if you want to resume the relay, call resumeAllChannelMediaRelay. Call this method after startOrUpdateChannelMediaRelayEx.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -5: The method call was rejected. There is no ongoing channel media relay.
   */
  abstract pauseAllChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * Resumes the media stream relay to all target channels.
   *
   * After calling the pauseAllChannelMediaRelayEx method, you can call this method to resume relaying media streams to all destination channels. Call this method after pauseAllChannelMediaRelayEx.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -5: The method call was rejected. There is no paused channel media relay.
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
   * Enables or disables dual-stream mode on the sender side.
   *
   * After you enable dual-stream mode, you can call setRemoteVideoStreamType to choose to receive either the high-quality video stream or the low-quality video stream on the subscriber side. You can call this method to enable or disable the dual-stream mode on the publisher side. Dual streams are a pairing of a high-quality video stream and a low-quality video stream:
   *  High-quality video stream: High bitrate, high resolution.
   *  Low-quality video stream: Low bitrate, low resolution. Deprecated: This method is deprecated as of v4.2.0. Use setDualStreamModeEx instead. This method is applicable to all types of streams from the sender, including but not limited to video streams collected from cameras, screen sharing streams, and custom-collected video streams.
   *
   * @param enabled Whether to enable dual-stream mode: true : Enable dual-stream mode. false : (Default) Disable dual-stream mode.
   * @param streamConfig The configuration of the low-quality video stream. See SimulcastStreamConfig. When setting mode to DisableSimulcastStream, setting streamConfig will not take effect.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * Sets the dual-stream mode on the sender side.
   *
   * The SDK defaults to enabling low-quality video stream adaptive mode (AutoSimulcastStream) on the sender side, which means the sender does not actively send low-quality video stream. The receiving end with the role of the host can initiate a low-quality video stream request by calling setRemoteVideoStreamTypeEx, and upon receiving the request, the sending end automatically starts sending low-quality stream.
   *  If you want to modify this behavior, you can call this method and set mode to DisableSimulcastStream (never send low-quality video streams) or EnableSimulcastStream (always send low-quality video streams).
   *  If you want to restore the default behavior after making changes, you can call this method again with mode set to AutoSimulcastStream. The difference and connection between this method and enableDualStreamModeEx is as follows:
   *  When calling this method and setting mode to DisableSimulcastStream, it has the same effect as enableDualStreamModeEx (false).
   *  When calling this method and setting mode to EnableSimulcastStream, it has the same effect as enableDualStreamModeEx (true).
   *  Both methods can be called before and after joining a channel. If both methods are used, the settings in the method called later takes precedence.
   *
   * @param mode The mode in which the video stream is sent. See SimulcastStreamMode.
   * @param streamConfig The configuration of the low-quality video stream. See SimulcastStreamConfig. When setting mode to DisableSimulcastStream, setting streamConfig will not take effect.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Takes a snapshot of a video stream using connection ID.
   *
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image, and saves it to the specified path.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID. Set uid as 0 if you want to take a snapshot of the local user's video.
   * @param filePath The local path (including filename extensions) of the snapshot. For example:
   *  iOS: /App Sandbox/Library/Caches/example.jpg
   *  Android: /storage/emulated/0/Android/data/<package name>/files/example.jpg Ensure that the path you specify exists and is writable.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract takeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): number;

  /**
   * Enables or disables video screenshot and upload.
   *
   * This method can take screenshots for multiple video streams and upload them. When video screenshot and upload function is enabled, the SDK takes screenshots and uploads videos sent by local users based on the type and frequency of the module you set in ContentInspectConfig. After video screenshot and upload, the Agora server sends the callback notification to your app server in HTTPS requests and sends all screenshots to the third-party cloud storage service.
   *
   * @param enabled Whether to enalbe video screenshot and upload: true : Enables video screenshot and upload. false : Disables video screenshot and upload.
   * @param config Screenshot and upload configuration. See ContentInspectConfig.
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableContentInspectEx(
    enabled: boolean,
    config: ContentInspectConfig,
    connection: RtcConnection
  ): number;

  /**
   * Enables tracing the video frame rendering process.
   *
   * The SDK automatically starts tracking the rendering events of the video from the moment that you call joinChannel to join the channel. You can call this method at an appropriate time according to the actual application scenario to customize the tracing process.
   *  After the local user leaves the current channel, the SDK automatically resets the time point to the next time when the user successfully joins the channel. The SDK starts tracing the rendering status of the video frames in the channel from the moment this method is successfully called and reports information about the event through the onVideoRenderingTracingResult callback.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
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
   * Gets the call ID with the connection ID.
   *
   * When a user joins a channel on a client, a callId is generated to identify the call from the client. You can call this method to get callId, and pass it in when calling methods such as rate and complain.
   *
   * @param connection The connection information. See RtcConnection.
   *
   * @returns
   * The current call ID, if the method succeeds.
   *  An empty string, if the method call fails.
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
   * Gets a video screenshot of the specified observation point using the connection ID.
   *
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image, and saves it to the specified path.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID. Set uid as 0 if you want to take a snapshot of the local user's video.
   * @param config The configuration of the snaptshot. See SnapshotConfig.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract takeSnapshotWithConfigEx(
    connection: RtcConnection,
    uid: number,
    config: SnapshotConfig
  ): number;
}
