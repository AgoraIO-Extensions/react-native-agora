import './extension/IAgoraRtcEngineExExtension';
import {
  ChannelMediaRelayConfiguration,
  ConnectionStateType,
  DataStreamConfig,
  EncryptionConfig,
  LiveTranscoding,
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
import { RenderModeType } from './AgoraMediaBase';
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
 * Inherited from IRtcEngine .
 */
export abstract class IRtcEngineEx extends IRtcEngine {
  /**
   * Joins a channel with the connection ID.
   * You can call this method multiple times to join more than one channel.If you are already in a channel, you cannot rejoin it with the same user ID.If you want to join the same channel from different devices, ensure that the user IDs are different for all devices.Ensure that the app ID you use to generate the token is the same as the app ID used when creating the IRtcEngine instance.
   *
   * @param token The token generated on your server for authentication.
   * @param connection The connection information. See RtcConnection .
   * @param options The channel media options. See ChannelMediaOptions .
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The parameter is invalid. For example, the token is invalid, the uid parameter is not set to an integer, or the value of a member in ChannelMediaOptions is invalid. You need to pass in a valid parameter and join the channel again.
   *  -3: Failes to initialize the IRtcEngine object. You need to reinitialize the IRtcEngine object.
   *  -7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.
   *  -8: The internal state of the IRtcEngine object is wrong. The typical cause is that you call this method to join the channel without calling startEchoTest to stop the test after calling stopEchoTest to start a call loop test. You need to call stopEchoTest before calling this method.
   *  -17: The request to join the channel is rejected. The typical cause is that the user is in the channel. Agora recomments that you can use the onConnectionStateChanged callback to determine whether the user exists in the channel. Do not call this method to join the channel unless you receive the ConnectionStateDisconnected(1) state.
   *  -102: The channel name is invalid. You need to pass in a valid channelname in channelId to rejoin the channel.
   *  -121: The user ID is invalid. You need to pass in a valid user ID in uid to rejoin the channel.
   */
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  /**
   * Sets channel options and leaves the channel.
   * This method lets the user leave the channel, for example, by hanging up or exiting the call.After calling joinChannelEx to join the channel, this method must be called to end the call before starting the next call.This method can be called whether or not a call is currently in progress. This method releases all resources related to the session.Calling this method does not necessarily mean that the user has left the channel. After you leave the channel, the SDK triggers the onLeaveChannel callback.After actually leaving the channel, the local user triggers the onLeaveChannel callback; after the user in the communication scenario and the host in the live streaming scenario leave the channel, the remote user triggers the onUserOffline callback.If you call release immediately after calling this method, the SDK does not trigger the onLeaveChannel callback.Calling leaveChannel [1/2] will leave the channels when calling joinChannel and joinChannelEx at the same time.
   *
   * @param connection The connection information. See RtcConnection .
   * @param options The options for leaving the channel. See LeaveChannelOptions .This parameter only supports the stopMicrophoneRecording member in the LeaveChannelOptions settings; setting other members does not take effect.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract leaveChannelEx(
    connection: RtcConnection,
    options?: LeaveChannelOptions
  ): number;

  /**
   * Updates the channel media options after joining the channel.
   *
   * @param options The channel media options. See ChannelMediaOptions .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The value of a member in the ChannelMediaOptions structure is invalid. For example, the token or the user ID is invalid. You need to fill in a valid parameter.-7: The IRtcEngine object has not been initialized. You need to initialize the IRtcEngine object before calling this method.-8: The internal state of the IRtcEngine object is wrong. The possible reason is that the user is not in the channel. Agora recomments that you can use the onConnectionStateChanged callback to determine whether the user exists in the channel. If you receive the ConnectionStateDisconnected (1) or ConnectionStateFailed (5) state, the user is not in the channel. You need to call joinChannel to join a channel before calling this method.
   */
  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  /**
   * Creates a data stream.
   * Creates a data stream. Each user can create up to five data streams in a single channel.Compared with createDataStreamEx , this method does not support data reliability. If a data packet is not received five seconds after it was sent, the SDK directly discards the data.
   *
   * @param config The configurations for the data stream. See DataStreamConfig .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * ID of the created data stream, if the method call succeeds.< 0: Failure.
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
   * @param mute Whether to stop receiving the audio stream of the specified user:true: Stop receiving the audio stream of the specified user.false: (Default) Resume receiving the audio stream of the specified user.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes receiving the audio stream of a specified user.
   *
   * @param uid The ID of the specified user.
   * @param mute Whether to stop receiving the audio stream of the specified user:true: Stop receiving the audio stream of the specified user.false: (Default) Resume receiving the audio stream of the specified user.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Sets the stream type of the remote video.
   * Under limited network conditions, if the publisher has not disabled the dual-stream mode using enableDualStreamModeEx (false), the receiver can choose to receive either the high-quality video stream or the low-quality video stream. The high-quality video stream has a higher resolution and bitrate, and the low-quality video stream has a lower resolution and bitrate.By default, users receive the high-quality video stream. Call this method if you want to switch to the low-quality video stream. This method allows the app to adjust the corresponding video stream type based on the size of the video window to reduce the bandwidth and resources. The aspect ratio of the low-quality video stream is the same as the high-quality video stream. Once the resolution of the high-quality video stream is set, the system automatically sets the resolution, frame rate, and bitrate of the low-quality video stream.The SDK enables the low-quality video stream auto mode on the sender by default (not actively sending low-quality video streams). The host at the receiving end can call this method to initiate a low-quality video stream stream request on the receiving end, and the sender automatically switches to the low-quality video stream mode after receiving the request.The result of this method returns in the onApiCallExecuted callback.
   *
   * @param uid The user ID.
   * @param streamType The video stream type: VideoStreamType .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users.true: Stop subscribing to the video streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteLocalAudioStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users.true: Stop subscribing to the video streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteLocalVideoStreamEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users.true: Stop subscribing to the video streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteAllRemoteAudioStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users.true: Stop subscribing to the video streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteAllRemoteVideoStreamsEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Set the allowlist of subscriptions for video streams.
   * You can call this method to specify the video streams of a user that you want to subscribe to.If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.Once the allowlist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  You can call this method either before or after joining a channel.The allowlist is not affected by the setting in muteRemoteVideoStream , muteAllRemoteVideoStreams and autoSubscribeAudio in ChannelMediaOptions .
   *
   * @param uidList The user ID list of users that you want to subscribe to.If you want to specify the video streams of a user for subscription, add the user ID of that user in this list. If you want to remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method to update the user ID list; this means you only add the uid of users that you want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Set the allowlist of subscriptions for video streams.
   * You can call this method to specify the video streams of a user that you want to subscribe to.If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.Once the allowlist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  You can call this method either before or after joining a channel.The allowlist is not affected by the setting in muteRemoteVideoStream , muteAllRemoteVideoStreams and autoSubscribeAudio in ChannelMediaOptions .
   *
   * @param uidList The user ID list of users that you want to subscribe to.If you want to specify the video streams of a user for subscription, add the user ID of that user in this list. If you want to remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method to update the user ID list; this means you only add the uid of users that you want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Set the allowlist of subscriptions for video streams.
   * You can call this method to specify the video streams of a user that you want to subscribe to.If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.Once the allowlist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  You can call this method either before or after joining a channel.The allowlist is not affected by the setting in muteRemoteVideoStream , muteAllRemoteVideoStreams and autoSubscribeAudio in ChannelMediaOptions .
   *
   * @param uidList The user ID list of users that you want to subscribe to.If you want to specify the video streams of a user for subscription, add the user ID of that user in this list. If you want to remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method to update the user ID list; this means you only add the uid of users that you want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Set the allowlist of subscriptions for video streams.
   * You can call this method to specify the video streams of a user that you want to subscribe to.If a user is added in the allowlist and blocklist at the same time, only the blocklist takes effect.Once the allowlist of subscriptions is set, it is effective even if you leave the current channel and rejoin the channel.
   *  You can call this method either before or after joining a channel.The allowlist is not affected by the setting in muteRemoteVideoStream , muteAllRemoteVideoStreams and autoSubscribeAudio in ChannelMediaOptions .
   *
   * @param uidList The user ID list of users that you want to subscribe to.If you want to specify the video streams of a user for subscription, add the user ID of that user in this list. If you want to remove a user from the allowlist, you need to call the setSubscribeVideoAllowlist method to update the user ID list; this means you only add the uid of users that you want to subscribe to in the new user ID list.
   * @param uidNumber The number of users in the user ID list.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number,
    connection: RtcConnection
  ): number;

  /**
   * Options for subscribing to remote video streams.
   * When a remote user has enabled dual-stream mode, you can call this method to choose the option for subscribing to the video streams sent by the remote user.
   *
   * @param uid The user ID of the remote user.
   * @param options The video subscription options. See VideoSubscriptionOptions .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setRemoteVideoSubscriptionOptionsEx(
    uid: number,
    options: VideoSubscriptionOptions,
    connection: RtcConnection
  ): number;

  /**
   * Sets the 2D position (the position on the horizontal plane) of the remote user's voice.
   * This method sets the voice position and volume of a remote user.When the local user calls this method to set the voice position of a remote user, the voice difference between the left and right channels allows the local user to track the real-time position of the remote user, creating a sense of space. This method applies to massive multiplayer online games, such as Battle Royale games.For the best voice positioning, Agora recommends using a wired headset.Call this method after joining a channel.
   *
   * @param uid The user ID of the remote user.
   * @param pan The voice position of the remote user. The value ranges from -1.0 to 1.0:-1.0: The remote voice comes from the left.0.0: (Default) The remote voice comes from the front.1.0: The remote voice comes from the right.
   * @param gain The volume of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original volume of the remote user). The smaller the value, the lower the volume.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
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
   * @ignore
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
   * Stops or resumes subscribing to the video streams of all remote users.
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.
   *
   * @param mute Whether to stop subscribing to the video streams of all remote users.true: Stop subscribing to the video streams of all remote users.false: (Default) Subscribe to the audio streams of all remote users by default.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract muteRecordingSignalEx(
    mute: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Adjusts the playback signal volume of a specified remote user.
   * You can call this method to adjust the playback volume of a specified remote user. To adjust the playback volume of different remote users, call the method as many times, once for each remote user.Call this method after joining a channel.The playback volume here refers to the mixed volume of a specified remote user.
   *
   * @param uid The user ID of the remote user.
   * @param volume Audio mixing volume. The value ranges between 0 and 100. The default value is 100, which means the original volume.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number,
    connection: RtcConnection
  ): number;

  /**
   * Gets the current connection state of the SDK.
   * You can call this method either before or after joining a channel.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * The current connection state.
   */
  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  /**
   * @ignore
   */
  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  /**
   * Creates a data stream.
   * Creates a data stream. Each user can create up to five data streams in a single channel.Compared with createDataStreamEx , this method does not support data reliability. If a data packet is not received five seconds after it was sent, the SDK directly discards the data.
   *
   * @param config The configurations for the data stream. See DataStreamConfig .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * ID of the created data stream, if the method call succeeds.< 0: Failure.
   */
  abstract createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * Sends data stream messages.
   * After calling createDataStreamEx , you can call this method to send data stream messages to all users in the channel.The SDK has the following restrictions on this method:Up to 60 packets can be sent per second in a channel with each packet having a maximum size of 1 KB.Each client can send up to 30 KB of data per second.Each user can have up to five data streams simultaneously.A successful method call triggers the onStreamMessage callback on the remote client, from which the remote user gets the stream message.
   * A failed method call triggers the onStreamMessageError callback on the remote client.Ensure that you call createDataStreamEx to create a data channel before calling this method.This method applies only to the COMMUNICATION profile or to the hosts in the LIVE_BROADCASTING profile. If an audience in the LIVE_BROADCASTING profile calls this method, the audience may be switched to a host.
   *
   * @param streamId The data stream ID. You can get the data stream ID by calling createDataStreamEx.
   * @param data The message to be sent.
   * @param length The length of the data.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  /**
   * Adds a watermark image to the local video.
   * This method adds a PNG watermark image to the local video in the live streaming. Once the watermark image is added, all the audience in the channel (CDN audience included), and the capturing device can see and capture it. The Agora SDK supports adding only one watermark image onto a local video or CDN live stream. The newly added watermark image replaces the previous one.The watermark coordinates are dependent on the settings in the setVideoEncoderConfigurationEx method:If the orientation mode of the encoding video ( OrientationMode ) is fixed landscape mode or the adaptive landscape mode, the watermark uses the landscape orientation.If the orientation mode of the encoding video (OrientationMode) is fixed portrait mode or the adaptive portrait mode, the watermark uses the portrait orientation.When setting the watermark position, the region must be less than the dimensions set in the setVideoEncoderConfigurationEx method; otherwise, the watermark image will be cropped.Ensure that you have called enableVideo before calling this method.This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.If you have enabled the local video preview by calling the startPreview method, you can use the visibleInPreview member to set whether or not the watermark is visible in the preview.If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time. You can implement the watermark function in your application layer.
   *
   * @param watermarkUrl The local file path of the watermark image to be added. This method supports adding a watermark image from the local absolute or relative file path.
   * @param options The options of the watermark image to be added. See WatermarkOptions .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  /**
   * Removes the watermark image from the video stream.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  /**
   * Agora supports reporting and analyzing customized messages.
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
   * This method enables the SDK to regularly report the volume information to the app of the local user who sends a stream and remote users (three users at most) whose instantaneous volumes are the highest. Once you call this method and users send streams in the channel, the SDK triggers the onAudioVolumeIndication callback at the time interval set in this method.
   *
   * @param interval Sets the time interval between two consecutive volume indications:
   *  ≤ 0: Disables the volume indication.
   *  > 0: Time interval (ms) between two consecutive volume indications. The lowest value is 50.
   *
   * @param smooth The smoothing factor that sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The recommended value is 3. The greater the value, the more sensitive the indicator.
   * @param reportVad true: Enables the voice activity detection of the local user. Once it is enabled, the vad parameter of the onAudioVolumeIndication callback reports the voice activity status of the local user.
   *  false: (Default) Disables the voice activity detection of the local user. Once it is disabled, the vad parameter of the onAudioVolumeIndication callback does not report the voice activity status of the local user, except for the scenario where the engine automatically detects the voice activity of the local user.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  /**
   * Starts pushing media streams to a CDN without transcoding.
   * Ensure that you enable the Media Push service before using this function. See Enable Media Push.
   *  Call this method after joining a channel.
   *  Only hosts in the LIVE_BROADCASTING profile can call this method.
   *  If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *  Agora recommends that you use the server-side Media Push function. You can call this method to push an audio or video stream to the specified CDN address. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times.After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The URL is null or the string length is 0.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The Media Push URL is already in use, use another URL instead.
   */
  abstract startRtmpStreamWithoutTranscodingEx(
    url: string,
    connection: RtcConnection
  ): number;

  /**
   * Starts Media Push and sets the transcoding configuration.
   * Agora recommends that you use the server-side Media Push function. You can call this method to push a live audio-and-video stream to the specified CDN address and set the transcoding configuration. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times.After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.Ensure that you enable the Media Push service before using this function. Call this method after joining a channel.Only hosts in the LIVE_BROADCASTING profile can call this method.If you want to retry pushing streams after a failed push, make sure to call stopRtmpStreamEx first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param transcoding The transcoding configuration for Media Push. See LiveTranscoding .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.-2: The URL is null or the string length is 0.-7: The SDK is not initialized before calling this method.-19: The Media Push URL is already in use, use another URL instead.
   */
  abstract startRtmpStreamWithTranscodingEx(
    url: string,
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /**
   * Updates the transcoding configuration.
   * Agora recommends that you use the server-side Media Push function. After you start pushing media streams to CDN with transcoding, you can dynamically update the transcoding configuration according to the scenario. The SDK triggers the onTranscodingUpdated callback after the transcoding configuration is updated.
   *
   * @param transcoding The transcoding configuration for Media Push. See LiveTranscoding .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateRtmpTranscodingEx(
    transcoding: LiveTranscoding,
    connection: RtcConnection
  ): number;

  /**
   * Starts pushing media streams to a CDN without transcoding.
   * Ensure that you enable the Media Push service before using this function. See Enable Media Push.
   *  Call this method after joining a channel.
   *  Only hosts in the LIVE_BROADCASTING profile can call this method.
   *  If you want to retry pushing streams after a failed push, make sure to call stopRtmpStream first, then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *  Agora recommends that you use the server-side Media Push function. You can call this method to push an audio or video stream to the specified CDN address. This method can push media streams to only one CDN address at a time, so if you need to push streams to multiple addresses, call this method multiple times.After you call this method, the SDK triggers the onRtmpStreamingStateChanged callback on the local client to report the state of the streaming.
   *
   * @param url The address of Media Push. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   *  -2: The URL is null or the string length is 0.
   *  -7: The SDK is not initialized before calling this method.
   *  -19: The Media Push URL is already in use, use another URL instead.
   */
  abstract stopRtmpStreamEx(url: string, connection: RtcConnection): number;

  /**
   * @ignore
   */
  abstract startOrUpdateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * Starts relaying media streams across channels. This method can be used to implement scenarios such as co-host across channels.
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged and onChannelMediaRelayEvent callbacks, and these callbacks return the state and events of the media stream relay.If the onChannelMediaRelayStateChanged callback returns RelayStateRunning (2) and RelayOk (0), and the onChannelMediaRelayEvent callback returns RelayEventPacketSentToDestChannel (4), it means that the SDK starts relaying media streams between the source channel and the target channel.If the onChannelMediaRelayStateChanged callback returnsRelayStateFailure (3), an exception occurs during the media stream relay.Call this method after joining the channel.This method takes effect only when you are a host in a live streaming channel.After a successful method call, if you want to call this method again, ensure that you call the stopChannelMediaRelayEx method to quit the current relay.The relaying media streams across channels function needs to be enabled by contacting .We do not support string user accounts in this API.
   *
   * @returns
   * 0: Success.< 0: Failure.-1: A general error occurs (no specified reason).-2: The parameter is invalid.-7: The method call was rejected. It may be because the SDK has not been initialized successfully, or the user role is not an host.-8: Internal state error. Probably because the user is not an audience member.
   */
  abstract startChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * Updates the channels for media stream relay.
   * After the media relay starts, if you want to relay the media stream to more channels, or leave the current relay channel, you can call this method.After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback with the RelayEventPacketUpdateDestChannel (7) state code.Call the method after successfully calling the startChannelMediaRelayEx method and receiving onChannelMediaRelayStateChanged (RelayStateRunning, RelayOk); otherwise, the method call fails.
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract updateChannelMediaRelayEx(
    configuration: ChannelMediaRelayConfiguration,
    connection: RtcConnection
  ): number;

  /**
   * Stops the media stream relay. Once the relay stops, the host quits all the target channels.
   * After a successful method call, the SDK triggers the onChannelMediaRelayStateChanged callback. If the callback reports RelayStateIdle (0) and RelayOk (0), the host successfully stops the relay.If the method call fails, the SDK triggers the onChannelMediaRelayStateChanged callback with the RelayErrorServerNoResponse (2) or RelayErrorServerConnectionLost (8) status code. You can call the leaveChannel method to leave the channel, and the media stream relay automatically stops.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract stopChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * Pauses the media stream relay to all target channels.
   * After the cross-channel media stream relay starts, you can call this method to pause relaying media streams to all target channels; after the pause, if you want to resume the relay, call resumeAllChannelMediaRelay .After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback to report whether the media stream relay is successfully paused.Call this method after startChannelMediaRelayEx .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract pauseAllChannelMediaRelayEx(connection: RtcConnection): number;

  /**
   * Resumes the media stream relay to all target channels.
   * After calling the pauseAllChannelMediaRelayEx method, you can call this method to resume relaying media streams to all destination channels.After a successful method call, the SDK triggers the onChannelMediaRelayEvent callback to report whether the media stream relay is successfully resumed.Call this method after pauseAllChannelMediaRelayEx .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
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
   * Occurs when the most active remote speaker is detected.
   * After a successful call of enableAudioVolumeIndication , the SDK continuously detects which remote user has the loudest volume. During the current period, the remote user, who is detected as the loudest for the most times, is the most active user.When the number of users is no less than two and an active remote speaker exists, the SDK triggers this callback and reports the uid of the most active remote speaker.If the most active remote speaker is always the same user, the SDK triggers the onActiveSpeaker callback only once.If the most active remote speaker changes to another user, the SDK triggers this callback again and reports the uid of the new active remote speaker.
   *
   * @param uid The user ID of the most active remote speaker.
   * @param connection The connection information. See RtcConnection .
   */
  abstract getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo;

  /**
   * Enables or disables dual-stream mode on the sender side.
   * After you enable dual-stream mode, you can call setRemoteVideoStreamType to choose to receive either the high-quality video stream or the low-quality video stream on the subscriber side.You can call this method to enable or disable the dual-stream mode on the publisher side. Dual streams are a pairing of a high-quality video stream and a low-quality video stream:High-quality video stream: High bitrate, high resolution.Low-quality video stream: Low bitrate, low resolution.This method is applicable to all types of streams from the sender, including but not limited to video streams collected from cameras, screen sharing streams, and custom-collected video streams.
   *
   * @param enabled Whether to enable dual-stream mode:true: Enable dual-stream mode.false: (Default) Disable dual-stream mode.
   * @param streamConfig The configuration of the low-quality video stream. See SimulcastStreamConfig .
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract enableDualStreamModeEx(
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /**
   * Sets dual-stream mode on the sender side.
   * The SDK enables the low-quality video stream auto mode on the sender by default, which is equivalent to calling this method and setting the mode to AutoSimulcastStream. If you want to modify this behavior, you can call this method and modify the mode to DisableSimulcastStream(never send low-quality video streams) or EnableSimulcastStream (always send low-quality video streams).The difference and connection between this method and enableDualStreamModeEx is as follows:When calling this method and setting mode to DisableSimulcastStream, it has the same effect as enableDualStreamModeEx(false).When calling this method and setting mode to EnableSimulcastStream, it has the same effect as enableDualStreamModeEx(true).Both methods can be called before and after joining a channel. If they are used at the same time, the settings in the method called later shall prevail.
   *
   * @param mode The mode in which the video stream is sent. See SimulcastStreamMode .
   * @param streamConfig The configuration of the low-quality video stream. See SimulcastStreamConfig .
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract setDualStreamModeEx(
    mode: SimulcastStreamMode,
    streamConfig: SimulcastStreamConfig,
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
   * Takes a snapshot of a video stream.
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image, and saves it to the specified path.
   *  The SDK has not taken the snapshot when the method call returns. After a successful method call, the SDK triggers the onSnapshotTaken callback to report whether the snapshot is successfully taken, as well as the details for that snapshot.Call this method after the joinChannelEx method.This method takes a snapshot of the published video stream specified in ChannelMediaOptions .If the user's video has been preprocessed, for example, watermarked or beautified, the resulting snapshot includes the pre-processing effect.
   *
   * @param connection The connection information. See RtcConnection .
   * @param uid The user ID. Set uid as 0 if you want to take a snapshot of the local user's video.
   * @param filePath The local path (including filename extensions) of the snapshot. For example:
   *  iOS: /App Sandbox/Library/Caches/example.jpg
   *  Android: /storage/emulated/0/Android/data/<package name>/files/example.jpg
   *  Ensure that the path you specify exists and is writable.
   *
   *
   * @returns
   * 0: Success.< 0: Failure.
   */
  abstract takeSnapshotEx(
    connection: RtcConnection,
    uid: number,
    filePath: string
  ): number;

  /**
   * Stops recording the local audio and video.
   * After calling startRecording , if you want to stop the recording, you must call this method; otherwise, the generated recording files may not be playable.
   *
   * @param connection The connection information. See RtcConnection .
   *
   * @returns
   * 0: Success.< 0: Failure.-7: The method is called before IRtcEngine is initialized.
   */
  abstract startMediaRenderingTracingEx(connection: RtcConnection): number;
}
