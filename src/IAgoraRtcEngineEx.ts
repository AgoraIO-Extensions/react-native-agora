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
import { ContentInspectConfig, RenderModeType } from './AgoraMediaBase';
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
   * @ignore
   */
  abstract joinChannelEx(): {
    token: string;
    connection: RtcConnection;
    options: ChannelMediaOptions;
  };

  /**
   * @ignore
   */
  abstract leaveChannelEx(): {
    connection: RtcConnection;
    options: LeaveChannelOptions;
  };

  /**
   * @ignore
   */
  abstract updateChannelMediaOptionsEx(): {
    options: ChannelMediaOptions;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract setVideoEncoderConfigurationEx(): {
    config: VideoEncoderConfiguration;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract setupRemoteVideoEx(): {
    canvas: VideoCanvas;
    connection: RtcConnection;
  };

  /**
   * Stops or resumes receiving the audio stream of a specified user.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The ID of the specified user.
   * @param mute Whether to stop receiving the audio stream of the specified user: true : Stop receiving the audio stream of the specified user. false : (Default) Resume receiving the audio stream of the specified user.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract muteRemoteAudioStreamEx(uid: number, mute: boolean): RtcConnection;

  abstract muteRemoteVideoStreamEx(uid: number, mute: boolean): RtcConnection;

  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType
  ): RtcConnection;

  abstract muteLocalAudioStreamEx(mute: boolean): RtcConnection;

  abstract muteLocalVideoStreamEx(mute: boolean): RtcConnection;

  abstract muteAllRemoteAudioStreamsEx(mute: boolean): RtcConnection;

  abstract muteAllRemoteVideoStreamsEx(mute: boolean): RtcConnection;

  abstract setSubscribeAudioBlocklistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection;

  abstract setSubscribeAudioAllowlistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection;

  abstract setSubscribeVideoBlocklistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection;

  abstract setSubscribeVideoAllowlistEx(
    uidList: number[],
    uidNumber: number
  ): RtcConnection;

  abstract setRemoteVideoSubscriptionOptionsEx(uid: number): {
    options: VideoSubscriptionOptions;
    connection: RtcConnection;
  };

  /**
   * Sets the 2D position (the position on the horizontal plane) of the remote user's voice.
   *
   * This method sets the voice position and volume of a remote user. When the local user calls this method to set the voice position of a remote user, the voice difference between the left and right channels allows the local user to track the real-time position of the remote user, creating a sense of space. This method applies to massive multiplayer online games, such as Battle Royale games.
   *  For the best voice positioning, Agora recommends using a wired headset.
   *  Call this method after joining a channel.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID of the remote user.
   * @param pan The voice position of the remote user. The value ranges from -1.0 to 1.0:
   *  -1.0: The remote voice comes from the left.
   *  0.0: (Default) The remote voice comes from the front.
   *  1.0: The remote voice comes from the right.
   * @param gain The volume of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original volume of the remote user). The smaller the value, the lower the volume.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number
  ): RtcConnection;

  abstract setRemoteUserSpatialAudioParamsEx(uid: number): {
    params: SpatialAudioParams;
    connection: RtcConnection;
  };

  /**
   * Sets the video display mode of a specified remote user.
   *
   * After initializing the video view of a remote user, you can call this method to update its rendering and mirror modes. This method affects only the video view that the local user sees.
   *  Call this method after rendering the RtcSurfaceView or RtcTextureView component corresponding to the remote user ID.
   *  During a call, you can call this method as many times as necessary to update the display mode of the video view of a remote user.
   *
   * @param connection The connection information. See RtcConnection.
   * @param uid The user ID of the remote user.
   * @param renderMode The video display mode of the remote user. See RenderModeType.
   * @param mirrorMode The mirror mode of the remote user view. See VideoMirrorModeType.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType
  ): RtcConnection;

  abstract enableLoopbackRecordingEx(enabled: boolean): {
    connection: RtcConnection;
    deviceName: string;
  };

  /**
   * @ignore
   */
  abstract adjustRecordingSignalVolumeEx(volume: number): RtcConnection;

  abstract muteRecordingSignalEx(mute: boolean): RtcConnection;

  abstract adjustUserPlaybackSignalVolumeEx(
    uid: number,
    volume: number
  ): RtcConnection;

  abstract getConnectionStateEx(): {
    connection: RtcConnection;
    result: ConnectionStateType;
  };

  /**
   * @ignore
   */
  abstract enableEncryptionEx(enabled: boolean): {
    connection: RtcConnection;
    config: EncryptionConfig;
  };

  /**
   * Creates a data stream.
   *
   * Creates a data stream. Each user can create up to five data streams in a single channel.
   *
   * @param connection The connection information. See RtcConnection.
   * @param config The configurations for the data stream. See DataStreamConfig.
   *
   * @returns
   * ID of the created data stream, if the method call succeeds.
   *  < 0: Failure.
   */
  abstract createDataStreamEx(config: DataStreamConfig): {
    streamId: number;
    connection: RtcConnection;
  };

  /**
   * Sends data stream messages.
   *
   * After calling createDataStreamEx, you can call this method to send data stream messages to all users in the channel. The SDK has the following restrictions on this method:
   *  Up to 60 packets can be sent per second in a channel with each packet having a maximum size of 1 KB.
   *  Each client can send up to 30 KB of data per second.
   *  Each user can have up to five data streams simultaneously. A successful method call triggers the onStreamMessage callback on the remote client, from which the remote user gets the stream message.
   * A failed method call triggers the onStreamMessageError callback on the remote client.
   *  Ensure that you call createDataStreamEx to create a data channel before calling this method.
   *  This method applies only to the COMMUNICATION profile or to the hosts in the LIVE_BROADCASTING profile. If an audience in the LIVE_BROADCASTING profile calls this method, the audience may be switched to a host.
   *
   * @param connection The connection information. See RtcConnection.
   * @param streamId The data stream ID. You can get the data stream ID by calling createDataStreamEx.
   * @param data The message to be sent.
   * @param length The length of the data.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number
  ): RtcConnection;

  abstract addVideoWatermarkEx(): {
    watermarkUrl: string;
    options: WatermarkOptions;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract clearVideoWatermarkEx(): RtcConnection;

  abstract sendCustomReportMessageEx(value: number): {
    id: string;
    category: string;
    event: string;
    label: string;
    connection: RtcConnection;
  };

  /**
   * Enables the reporting of users' volume indication.
   *
   * This method enables the SDK to regularly report the volume information to the app of the local user who sends a stream and remote users (three users at most) whose instantaneous volumes are the highest. Once you call this method and users send streams in the channel, the SDK triggers the onAudioVolumeIndication callback at the time interval set in this method.
   *
   * @param connection The connection information. See RtcConnection.
   * @param reportVad true : Enables the voice activity detection of the local user. Once it is enabled, the vad parameter of the onAudioVolumeIndication callback reports the voice activity status of the local user. false : (Default) Disables the voice activity detection of the local user. Once it is disabled, the vad parameter of the onAudioVolumeIndication callback does not report the voice activity status of the local user, except for the scenario where the engine automatically detects the voice activity of the local user.
   * @param smooth The smoothing factor that sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The recommended value is 3. The greater the value, the more sensitive the indicator.
   * @param interval Sets the time interval between two consecutive volume indications:
   *  ≤ 0: Disables the volume indication.
   *  > 0: Time interval (ms) between two consecutive volume indications. The lowest value is 50.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean
  ): RtcConnection;

  abstract startRtmpStreamWithoutTranscodingEx(): {
    url: string;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract startRtmpStreamWithTranscodingEx(): {
    url: string;
    transcoding: LiveTranscoding;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract updateRtmpTranscodingEx(): {
    transcoding: LiveTranscoding;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract stopRtmpStreamEx(): { url: string; connection: RtcConnection };

  abstract startOrUpdateChannelMediaRelayEx(): {
    configuration: ChannelMediaRelayConfiguration;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract startChannelMediaRelayEx(): {
    configuration: ChannelMediaRelayConfiguration;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract updateChannelMediaRelayEx(): {
    configuration: ChannelMediaRelayConfiguration;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract stopChannelMediaRelayEx(): RtcConnection;

  abstract pauseAllChannelMediaRelayEx(): RtcConnection;

  abstract resumeAllChannelMediaRelayEx(): RtcConnection;

  abstract getUserInfoByUserAccountEx(): {
    userAccount: string;
    userInfo: UserInfo;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract getUserInfoByUidEx(uid: number): {
    userInfo: UserInfo;
    connection: RtcConnection;
  };

  /**
   * Enables or disables dual-stream mode on the sender side.
   *
   * After you enable dual-stream mode, you can call setRemoteVideoStreamType to choose to receive either the high-quality video stream or the low-quality video stream on the subscriber side. You can call this method to enable or disable the dual-stream mode on the publisher side. Dual streams are a pairing of a high-quality video stream and a low-quality video stream:
   *  High-quality video stream: High bitrate, high resolution.
   *  Low-quality video stream: Low bitrate, low resolution. This method is applicable to all types of streams from the sender, including but not limited to video streams collected from cameras, screen sharing streams, and custom-collected video streams.
   *
   * @param connection The connection information. See RtcConnection.
   * @param streamConfig The configuration of the low-quality video stream. See SimulcastStreamConfig.
   * @param enabled Whether to enable dual-stream mode: true : Enable dual-stream mode. false : (Default) Disable dual-stream mode.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract enableDualStreamModeEx(enabled: boolean): {
    streamConfig: SimulcastStreamConfig;
    connection: RtcConnection;
  };

  /**
   * Sets the dual-stream mode on the sender side.
   *
   * The SDK enables the low-quality video stream auto mode on the sender by default, which is equivalent to calling this method and setting the mode to AutoSimulcastStream. If you want to modify this behavior, you can call this method and modify the mode to DisableSimulcastStream (never send low-quality video streams) or EnableSimulcastStream (always send low-quality video streams). The difference and connection between this method and enableDualStreamModeEx is as follows:
   *  When calling this method and setting mode to DisableSimulcastStream, it has the same effect as enableDualStreamModeEx (false).
   *  When calling this method and setting mode to EnableSimulcastStream, it has the same effect as enableDualStreamModeEx (true).
   *  Both methods can be called before and after joining a channel. If both methods are used, the settings in the method called later takes precedence.
   *
   * @param connection The connection information. See RtcConnection.
   * @param streamConfig The configuration of the low-quality video stream. See SimulcastStreamConfig.
   * @param mode The mode in which the video stream is sent. See SimulcastStreamMode.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure.
   */
  abstract setDualStreamModeEx(mode: SimulcastStreamMode): {
    streamConfig: SimulcastStreamConfig;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract setHighPriorityUserListEx(
    uidList: number[],
    uidNum: number,
    option: StreamFallbackOptions
  ): RtcConnection;

  abstract takeSnapshotEx(uid: number): {
    connection: RtcConnection;
    filePath: string;
  };

  /**
   * @ignore
   */
  abstract enableContentInspectEx(enabled: boolean): {
    config: ContentInspectConfig;
    connection: RtcConnection;
  };

  /**
   * @ignore
   */
  abstract startMediaRenderingTracingEx(): RtcConnection;
}
