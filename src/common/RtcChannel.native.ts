import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import type {
  ChannelMediaOptions,
  ChannelMediaRelayConfiguration,
  ClientRoleOptions,
  DataStreamConfig,
  EncryptionConfig,
  LiveInjectStreamConfig,
  LiveTranscoding,
} from './Classes';
import type {
  ClientRole,
  ConnectionStateType,
  EncryptionMode,
  UserPriority,
  VideoStreamType,
} from './Enums';
import type { Listener, RtcChannelEvents, Subscription } from './RtcEvents';

const {
  /**
   * @ignore
   */
  AgoraRtcChannelModule,
} = NativeModules;
/**
 * @ignore
 */
const Prefix = AgoraRtcChannelModule.prefix;
/**
 * @ignore
 */
const RtcChannelEvent = new NativeEventEmitter(AgoraRtcChannelModule);

/**
 * @ignore
 */
const channels = new Map<string, RtcChannel>();

/**
 * The {@link RtcChannel} class.
 */
export default class RtcChannel implements RtcChannelInterface {
  /**
   * The ID of RtcChannel
   */
  public readonly channelId: string;
  /**
   * @ignore
   */
  private _listeners = new Map<string, Map<any, Listener>>();

  /**
   * @ignore
   */
  private constructor(channelId: string) {
    this.channelId = channelId;
  }

  /**
   * @ignore
   */
  private _callMethod<T>(method: string, args?: {}): Promise<T> {
    return AgoraRtcChannelModule.callMethod(
      method,
      args === undefined
        ? { channelId: this.channelId }
        : { channelId: this.channelId, ...args }
    );
  }

  /**
   * Creates and gets an [`RtcChannel`]{@link RtcChannel} instance.
   *
   * To join more than one channel, call this method multiple times to create as many `RtcChannel` instances as needed,
   * and call the [`joinChannel`]{@link RtcChannel.joinChannel} method of each created `RtcChannel` object.
   *
   * After joining multiple channels, you can simultaneously subscribe to streams of all the channels, but publish a stream in only one channel at one time.
   * @param channelId The unique channel name for the Agora RTC session in the string format.
   * The string length must be less than 64 bytes.
   * Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   *
   * **Note**
   * - This parameter does not have a default value. You must set it.
   * - Do not set it as the empty string "". Otherwise, the SDK returns [`Refused(-5)`]{@link ErrorCode.Refused}.
   *
   * @returns
   * - An `RtcChannel` instance, if the method call succeeds.
   * - Null, if the method call fails.
   * - [`Refused(-5)`]{@link ErrorCode.Refused}, if you set channelId as the empty string "".
   */
  static async create(channelId: string): Promise<RtcChannel> {
    if (channels.get(channelId)) return channels.get(channelId) as RtcChannel;
    await AgoraRtcChannelModule.callMethod('create', { channelId });
    channels.set(channelId, new RtcChannel(channelId));
    return channels.get(channelId) as RtcChannel;
  }

  /**
   * Destroys all [`RtcChannel`]{@link RtcChannel} instances.
   */
  static destroyAll() {
    channels.forEach(async (value) => {
      value.removeAllListeners();
      await value._callMethod('destroy');
    });
    channels.clear();
  }

  /**
   * Destroys the [`RtcChannel`]{@link RtcChannel} instance.
   *
   *  @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 7(NotInitialized): The `RtcChannel` instance is not initialized before calling this method.
   */
  destroy(): Promise<void> {
    this.removeAllListeners();
    channels.delete(this.channelId);
    return this._callMethod('destroy');
  }

  /**
   * Adds the [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
   *
   * After setting the [`RtcChannelEvents`]{@link RtcChannelEvents} handler, you can listen for channel events and receive the statistics of the corresponding [`RtcChannel`]{@link RtcChannel} instance.
   * @param event The event type.
   * @param listener The [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
   */
  addListener<EventType extends keyof RtcChannelEvents>(
    event: EventType,
    listener: RtcChannelEvents[EventType]
  ): Subscription {
    const callback = (res: any) => {
      const { channelId, data } = res;
      if (channelId === this.channelId) {
        // @ts-ignore
        listener(...data);
      }
    };
    let map = this._listeners.get(event);
    if (map === undefined) {
      map = new Map<Listener, Listener>();
      this._listeners.set(event, map);
    }
    const subscription = RtcChannelEvent.addListener(Prefix + event, callback);
    map.set(listener, callback);
    return {
      remove: () => {
        this.removeListener(event, listener, subscription);
      },
    };
  }

  /**
   * Removes the [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
   *
   * For callback events that you only want to listen for once, call this method to remove the specific [`RtcEngineEvents`]{@link RtcEngineEvents} objects after you have received them.
   * @param event The event type.
   * @param listener The [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
   */
  removeListener<EventType extends keyof RtcChannelEvents>(
    event: EventType,
    listener: RtcChannelEvents[EventType],
    subscription?: EmitterSubscription
  ) {
    const map = this._listeners.get(event);
    if (map === undefined) return;

    if (subscription && 'remove' in subscription) {
      subscription.remove();
    } else {
      RtcChannelEvent.removeListener(
        Prefix + event,
        map.get(listener) as Listener
      );
    }
    map.delete(listener);
  }

  /**
   * Removes all the [`RtcChannelEvents`]{@link RtcChannelEvents} handlers.
   * @param event The event type.
   */
  removeAllListeners<EventType extends keyof RtcChannelEvents>(
    event?: EventType
  ) {
    if (event === undefined) {
      this._listeners.forEach((_, key) => {
        RtcChannelEvent.removeAllListeners(Prefix + key);
      });
      this._listeners.clear();
      return;
    }
    RtcChannelEvent.removeAllListeners(Prefix + event);
    this._listeners.delete(event as string);
  }

  /**
   * Sets the role of a user in live interactive streaming.
   *
   * In the `LiveBroadcasting` profile, the SDK sets the user role as audience by default. You can call `setClientRole` to set the user role as host.
   *
   * You can call this method either before or after joining a channel. If you call this method to switch the user role after joining a channel, the SDK automatically does the following:
   * - Calls [`muteLocalAudioStream`]{@link RtcChannel.muteLocalAudioStream} and [`muteLocalVideoStream`]{@link RtcChannel.muteLocalVideoStream} to change the publishing state.
   * - Triggers [`ClientRoleChanged`]{@link RtcChannelEvents.ClientRoleChanged} on the local client.
   * - Triggers [`UserJoined`]{@link RtcChannelEvents.UserJoined} or [`UserOffline`]{@link RtcChannelEvents.UserOffline} ([`BecomeAudience`]{@link UserOfflineReason.BecomeAudience}) on the remote client.
   *
   * **Note**
   * - This method applies to the `LiveBroadcasting` profile only (when the `profile` parameter in `setChannelProfile` is set as `LiveBroadcasting`).
   * - As of v3.2.0, this method can set the user level in addition to the user role.
   *    - The user role determines the permissions that the SDK grants to a user, such as permission to send local streams, receive remote streams, and push streams to a CDN address.
   *    - The user level determines the level of services that a user can enjoy within the permissions of the user's role. For example, an audience member can choose to receive remote streams with low latency or ultra low latency. **User level affects the pricing of services**.
   *
   * @param role The role of a user in interactive live streaming. See {@link ClientRole}.
   * @param options The detailed options of a user, including user level. See {@link ClientRoleOptions}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 1(Failed): A general error occurs (no specified reason).
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 5(Refused): The request is rejected. In multichannel scenarios, if you have set any of the following in one channel, the SDK returns this error code when the user switches the user role to host in another channel:
   *      - Call `joinChannel` with the `options` parameter and use the default settings `publishLocalAudio = true` or `publishLocalVideo = true`.
   *      - Call `setClientRole` to set the user role as host.
   *      - Call `muteLocalAudioStream(false)` or `muteLocalVideoStream(false)`.
   *    - 7(NotInitialized): The SDK is not initialized.
   */
  setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void> {
    return this._callMethod('setClientRole', { role, options });
  }

  /**
   * Joins the channel with a user ID.
   *
   * **Note**
   * - If you are already in a channel, you cannot rejoin it with the same UID.
   * - If you want to join the same channel from different devices, ensure that the UIDs in all devices are different.
   * - Ensure that the app ID you use to generate the token is the same with the app ID used when creating the [`RtcEngine`]{@link RtcEngine} instance.
   *
   * Compared with the [`joinChannel`]{@link RtcEngine.joinChannel} method in the `RtcEngine` class, this method supports joining multiple channels at a time by creating multiple IChannel objects
   * and then calling `joinChannel` in each RtcChannel object.
   *
   * Once the user joins the channel, the user publishes the local audio and video streams and automatically
   * subscribes to the audio and video streams of all the other users in the channel. Subscribing incurs all associated usage costs. To unsubscribe, set the options parameter or call the mute methods accordingly.
   *
   * @param token The token generated at your server. See [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   * @param optionalInfo Additional information about the channel. This parameter can be set as null. Other users in the channel do not receive this information.
   * @param optionalUid The user ID. A 32-bit unsigned integer with a value ranging from 1 to (232-1). This parameter must be unique. If uid is not assigned (or set as 0), the SDK assigns a uid and reports it in the [`JoinChannelSuccess`]{@link RtcChannelEvents.JoinChannelSuccess} callback. The app must maintain this user ID.
   * @param options The channel media options.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 3(NotReady): The SDK fails to be initialized. You can try re-initializing the SDK.
   *    - 5(Refused): The request is rejected. Possible reasons:
   *        - You have created an `RtcChannel` object with the same channel name.
   *        - You have joined and published a stream in a channel created by the `RtcChannel` object.
   *    - 7(NotInitialized): The SDK is not initialized.
   *    - 17(JoinChannelRejected): The request to join the channel is rejected. The SDK does not support joining the same `RtcChannel` channel repeatedly.
   * Therefore, the SDK returns this error code when a user who has already joined an `RtcChannel` channel calls the joining channel method of this `RtcChannel` object.
   */
  joinChannel(
    token: string | undefined | null,
    optionalInfo: string | undefined | null,
    optionalUid: number,
    options: ChannelMediaOptions
  ): Promise<void> {
    return this._callMethod('joinChannel', {
      token,
      optionalInfo,
      optionalUid,
      options,
    });
  }

  /**
   * Joins a channel with the user account.
   *
   * **Note**
   * - If you are already in a channel, you cannot rejoin it with the same user account.
   * - If you want to join the same channel from different devices, ensure that the user accounts in all devices are different.
   * - Ensure that the app ID you use to generate the token is the same with the app ID used when creating the [`RtcEngine`]{@link RtcEngine} instance.
   * - Before using a String user name, ensure that you read [How can I use string user names](https://docs.agora.io/en/faq/string) for getting details about the limitations and implementation steps.
   *
   * Compared with the [`joinChannelWithUserAccount`]{@link RtcEngine..joinChannelWithUserAccount} method in the `RtcEngine` class, this method supports
   * joining multiple channels at a time by creating multiple RtcChannel objects and then calling `joinChannelWithUserAccount` in each RtcChannel object.
   *
   * Once the user joins the channel, the user publishes the local audio and video streams and automatically subscribes to
   * the audio and video streams of all the other users in the channel.
   * Subscribing incurs all associated usage costs. To unsubscribe, set the options parameter or call the mute methods accordingly.
   *
   * @param token The token generated at your server. See [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   * @param userAccount The user account. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as null.
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   * @param options The channel media options.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 3(NotReady): The SDK fails to be initialized. You can try re-initializing the SDK.
   *    - 5(Refused): The request is rejected.
   *    - 17(JoinChannelRejected): The request to join the channel is rejected. The SDK does not support joining the same `RtcChannel` channel repeatedly.
   * Therefore, the SDK returns this error code when a user who has already joined an `RtcChannel` channel calls the joining channel method of this `RtcChannel` object.
   */
  joinChannelWithUserAccount(
    token: string | undefined | null,
    userAccount: string,
    options: ChannelMediaOptions
  ): Promise<void> {
    return this._callMethod('joinChannelWithUserAccount', {
      token,
      userAccount,
      options,
    });
  }

  /**
   * Leaves the current channel.
   *
   * A successful call of this method triggers the following callbacks:
   * - The local client: [`LeaveChannel`]{@link RtcChannelEvents.LeaveChannel}.
   * - The remote client: [`UserOffline`]{@link RtcChannelEvents.UserOffline}, if the user leaving the channel is in a `Communication` channel, or is a host in a `LiveBroadcasting` channel.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 1(Failed): A general error occurs (no specified reason).
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 7(NotInitialized): The SDK is not initialized.
   */
  leaveChannel(): Promise<void> {
    return this._callMethod('leaveChannel');
  }

  /**
   * Renews the token when the current token expires.
   *
   * In the following situations, the SDK decides that the current token has expired:
   * - The SDK triggers the [`TokenPrivilegeWillExpire`]{@link RtcChannelEvents.TokenPrivilegeWillExpire} callback, or
   * - The [`ConnectionStateChanged`]{@link RtcChannelEvents.ConnectionStateChanged} callback reports the [`TokenExpired(9)`]{@link ConnectionChangedReason.TokenExpired} error.
   *
   * You should get a new token from your server and call this method to renew it. Failure to do so results in the SDK disconnecting from the Agora server.
   * @param token The new token.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 1(Failed): A general error occurs (no specified reason).
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 7(NotInitialized): The SDK is not initialized.
   */
  renewToken(token: string): Promise<void> {
    return this._callMethod('renewToken', { token });
  }

  /**
   * Gets the network connection state of the SDK.
   */
  getConnectionState(): Promise<ConnectionStateType> {
    return this._callMethod('getConnectionState');
  }

  /**
   * Publishes the local stream to the channel.
   *
   * @deprecated This method is deprecated as of v3.4.5.
   * Use [`muteLocalAudioStream(false)`]{@link muteLocalAudioStream} or [`muteLocalVideoStream(false)`]{@link muteLocalVideoStream} instead.
   *
   * You must keep the following restrictions in mind when calling this method.
   * Otherwise, the SDK returns the [`Refused(-5)`]{@link ErrorCode.Refused}:
   * - This method publishes one stream only to the channel corresponding to the current [`RtcChannel`]{@link RtcChannel} instance.
   * - In a `LiveBroadcasting` channel, only a host can call this method. To switch the client role, call [`setClientRole`]{@link RtcChannel.setClientRole} of the current [`RtcChannel`]{@link RtcChannel} instance.
   * - You can publish a stream to only one channel at a time. For details, see the advanced guide *Join Multiple Channels*.
   */
  publish(): Promise<void> {
    return this._callMethod('publish');
  }

  /**
   * Stops publishing a stream to the channel.
   *
   * @deprecated This method is deprecated as of v3.4.5.
   * Use [`muteLocalAudioStream(true)`]{@link muteLocalAudioStream} or [`muteLocalVideoStream(true)`]{@Link muteLocalVideoStream} instead.
   *
   * If you call this method in a channel where you are not publishing streams, the SDK returns [`Refused(-5)`]{@link ErrorCode.Refused}.
   */
  unpublish(): Promise<void> {
    return this._callMethod('unpublish');
  }

  /**
   * Gets the current call ID.
   *
   * @returns
   * - The current call ID, if the method call succeeds.
   * - The empty string "", if the method call fails.
   */
  getCallId(): Promise<string> {
    return this._callMethod('getCallId');
  }

  /**
   * Adjusts the playback volume of a specified remote user.
   *
   * You can call this method as many times as necessary to adjust the playback volume of different remote
   * users, or to repeatedly adjust the playback volume of the same remote user.
   *
   * **Note**
   * - Call this method after joining a channel.
   * - The playback volume here refers to the mixed volume of a specified remote user.
   * - This method can only adjust the playback volume of one specified remote user at a time.
   * To adjust the playback volume of different remote users, call the method as many times, once for each remote user.
   *
   * @param uid ID of the remote user.
   * @param volume The playback volume of the specified remote user. The value ranges from 0 to 100:
   * - 0: Mute.
   * - 100: The original volume.
   */
  adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void> {
    return this._callMethod('adjustUserPlaybackSignalVolume', { uid, volume });
  }

  /**
   * Stops/Resumes receiving the audio stream of the specified user.
   *
   * @param uid ID of the remote user whose audio stream you want to mute.
   * @param muted Determines whether to receive/stop receiving the audio stream of the specified user:
   * - `true`: Stop receiving the audio stream of the user.
   * - `false`: (Default) Receive the audio stream of the user.
   */
  muteRemoteAudioStream(uid: number, muted: boolean): Promise<void> {
    return this._callMethod('muteRemoteAudioStream', { uid, muted });
  }

  /**
   * Stops or resumes subscribing to the audio streams of all remote users.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all remote users, including all subsequent users.
   *
   * **Note**
   * - Call this method after joining a channel.
   * - As of v3.3.1, this method contains the function of [`setDefaultMuteAllRemoteAudioStreams`]{@link setDefaultMuteAllRemoteAudioStreams}.
   * Agora recommend not calling `muteAllRemoteAudioStreams` and `setDefaultMuteAllRemoteAudioStreams` together;
   * otherwise, the settings may not take effect. See *Set the Subscribing State*.
   *
   * @param muted Sets whether to stop subscribing to the audio streams of all remote users.
   *  - `true`: Stop subscribing to the audio streams of all remote users.
   *  - `false`: (Default) Resume subscribing to the audio streams of all remote users.
   */
  muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
    return this._callMethod('muteAllRemoteAudioStreams', { muted });
  }

  /**
   * Sets whether to receive all remote audio streams by default.
   *
   * @deprecated This method is deprecated from v3.3.1.
   *
   * Stops or resumes subscribing to the audio streams of all remote users by default.
   *
   * Call this method after joining a channel. After successfully calling this method, the local user stops or resumes subscribing to the audio streams of all subsequent users.
   *
   * **Note**
   * If you need to resume subscribing to the audio streams of remote users in the channel after calling `setDefaultMuteAllRemoteAudioStreams(true)`, do the following:
   *   - If you need to resume subscribing to the audio stream of a specified user, call [`muteRemoteAudioStream(false)`]{@link muteRemoteAudioStream}, and specify the user ID.
   *   - If you need to resume subscribing to the audio streams of multiple remote users, call [`muteRemoteAudioStream(false)`]{@link muteRemoteAudioStream} multiple times.
   *
   * @param muted Sets whether to stop subscribing to the audio streams of all remote users by default.
   *              - `true`: Stop subscribing to the audio streams of all remote users by default.
   *              - `false`: (Default) Resume subscribing to the audio streams of all remote users by default.
   *
   */
  setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
    return this._callMethod('setDefaultMuteAllRemoteAudioStreams', { muted });
  }

  /**
   * Stops or resumes subscribing to the video streams of all remote users.
   *
   * After successfully calling this method, the local user stops or resumes subscribing to the video streams of all remote users, including all subsequent users.
   *
   * **Note**
   * - Call this method after joining a channel.
   * - As of v3.3.1, this method contains the function of [`setDefaultMuteAllRemoteVideoStreams`]{@link setDefaultMuteAllRemoteVideoStreams}.
   * Agora recommend not calling `muteAllRemoteVideoStreams` and `setDefaultMuteAllRemoteVideoStreams` together;
   * otherwise, the settings may not take effect. See *Set the Subscribing State*.
   *
   * @param muted Sets whether to stop subscribing to the video streams of all remote users.
   *   - `true`: Stop subscribing to the video streams of all remote users.
   *   - `false`: (Default) Resume subscribing to the video streams of all remote users.
   */
  muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
    return this._callMethod('muteAllRemoteVideoStreams', { muted });
  }

  /**
   * Stops/Resumes receiving the video stream of the specified user.
   *
   * @param uid ID of the remote user whose video stream you want to mute.
   * @param muted Determines whether to receive/stop receiving the video stream of the specified user:
   * - `true`: Stop receiving the video stream of the user.
   * - `false`: (Default) Receive the video stream of the user.
   */
  muteRemoteVideoStream(uid: number, muted: boolean): Promise<void> {
    return this._callMethod('muteRemoteVideoStream', { uid, muted });
  }

  /**
   * Sets whether to receive all remote video streams by default.
   *
   * @deprecated This method is deprecated from v3.3.1.
   *
   * Stops or resumes subscribing to the video streams of all remote users by default.
   *
   * Call this method after joining a channel. After successfully calling this method, the local user stops or resumes subscribing to the video streams of all subsequent users.
   *
   * **Note**
   * If you need to resume subscribing to the video streams of remote users in the channel after calling `setDefaultMuteAllRemoteVideoStreams(true)`, do the following:
   *   - If you need to resume subscribing to the video stream of a specified user, call `muteRemoteVideoStream(false)`, and specify the user ID.
   *   - If you need to resume subscribing to the video streams of multiple remote users, call `muteRemoteVideoStream(false)` multiple times.
   *
   * @param muted Sets whether to stop subscribing to the video streams of all remote users by default.
   *              - `true`: Stop subscribing to the video streams of all remote users by default.
   *              - `false`: (Default) Resume subscribing to the video streams of all remote users by default.
   *
   */
  setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
    return this._callMethod('setDefaultMuteAllRemoteVideoStreams', { muted });
  }

  /** Enables/Disables the super-resolution algorithm for a remote user's video stream.
   *
   * @since v3.5.2
   *
   * This feature effectively boosts the resolution of a remote user's video seen by the local user.
   * If the original resolution of a remote user's video is a × b, the local user's device can render the remote video at a resolution of 2a × 2b after you enable this feature.
   *
   * After calling this method, the SDK triggers the [`UserSuperResolutionEnabled`]{@link RtcChannelEvents.UserSuperResolutionEnabled} callback to report whether you have successfully enabled super resolution.
   *
   * **Warning**
   * The original resolution of the remote user's video cannot exceed a certain range.
   * If the local user use super resolution on Android, the original resolution of the remote user's video
   * cannot exceed 640 × 360 pixels; if the local user use super resolution on iOS, the original resolution
   * of the remote user's video cannot exceed 640 × 480 pixels.
   *
   * If you exceed these limitations, the SDK triggers the {@link IRtcEngineEventHandler#onWarning onWarning} callback and returns the corresponding warning codes:
   *  - `SuperResolutionStreamOverLimitation(1610)`: The original resolution of the remote user's video is beyond the range where super resolution can be applied.
   *  - `SuperResolutionUserCountOverLimitation(1611)`: Super resolution is already being used to boost another remote user's video.
   *  - `SuperResolutionDeviceNotSupported(1612)`: The device does not support using super resolution.
   *
   * **Note**
   * Because this method has certain system performance requirements, Agora recommends that you use the following devices or better:
   * - Android:
   *   - VIVO: V1821A, NEX S, 1914A, 1916A, 1962A, 1824BA, X60, X60 Pro
   *   - OPPO: PCCM00, Find X3
   *   - OnePlus: A6000
   *   - Xiaomi: Mi 8, Mi 9, Mi 10, Mi 11, MIX3, Redmi K20 Pro
   *   - SAMSUNG: SM-G9600, SM-G9650, SM-N9600, SM-G9708, SM-G960U, SM-G9750, S20, S21
   *   - HUAWEI: SEA-AL00, ELE-AL00, VOG-AL00, YAL-AL10, HMA-AL00, EVR-AN00, nova 4, nova 5 Pro, nova 6 5G, nova 7 5G, Mate 30, Mate 30 Pro, Mate 40, Mate 40 Pro, P40 P40 Pro, HUAWEI MediaPad M6, MatePad 10.8
   * - iOS (iOS 12.0 or later):
   *   - iPhone XR
   *   - iPhone XS
   *   - iPhone XS Max
   *   - iPhone 11
   *   - iPhone 11 Pro
   *   - iPhone 11 Pro Max
   *   - iPhone 12
   *   - iPhone 12 mini
   *   - iPhone 12 Pro
   *   - iPhone 12 Pro Max
   *   - iPhone 12 SE (2nd generation)
   *   - iPad Pro 11-inch (3rd generation)
   *   - iPad Pro 12.9-inch (3rd generation)
   *   - iPad Air (3rd generation)
   *   - iPad Air (4th generation)
   *
   * @param uid The user ID of the remote user.
   * @param enabled Determines whether to enable super resolution for the remote user's video:
   *   - `true`: Enable super resolution.
   *   - `false`: Do not enable super resolution.
   */
  enableRemoteSuperResolution(uid: number, enabled: boolean): Promise<void> {
    return this._callMethod('enableRemoteSuperResolution', { uid, enabled });
  }

  /**
   * Sets the sound position of a remote user.
   *
   * When the local user calls this method to set the sound position of a remote user, the sound difference between the left and right channels allows the local user to track the real-time position of the remote user, creating a real sense of space. This method applies to massively multiplayer online games, such as Battle Royale games.
   *
   * **Note**
   * - For this method to work, enable stereo panning for remote users by calling the [`enableSoundPositionIndication`]{@link RtcEngine.enableSoundPositionIndication} method before joining a channel.
   * - This method requires hardware support. For the best sound positioning, we recommend using a stereo headset.
   *
   * @param uid The ID of the remote user.
   * @param pan The sound position of the remote user. The value ranges from -1.0 to 1.0:
   * - 0.0: (default) The remote sound comes from the front.
   * - -1.0: The remote sound comes from the left.
   * - 1.0: The remote sound comes from the right.
   * @param gain Gain of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original gain of the remote user). The smaller the value, the less the gain.
   */
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): Promise<void> {
    return this._callMethod('setRemoteVoicePosition', { uid, pan, gain });
  }

  /**
   * Publishes the local stream to a specified CDN streaming URL.
   *
   * @deprecated
   *
   * This method is deprecated as of v3.6.2. See [Release Notes](https://docs.agora.io/en/Video/release_react_native_video?platform=React%20Native) for an alternative solution.
   *
   * After calling this method, you can push media streams in RTMP or RTMPS protocol to the CDN.
   *
   * This method call triggers the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged}
   * callback on the local client to report the state of adding a local stream to the CDN.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - Ensure that the user joins a channel before calling this method.
   * - This method can only be called by a host in a `LiveBroadcasting` channel.
   * - This method adds only one CDN streaming URL each time it is called.
   * - Agora supports pushing media streams in RTMPS protocol to the CDN only when you enable transcoding.
   *
   * @param url The CDN streaming URL in the RTMP or RTMPS format. The maximum length of this parameter is 1024 bytes. The URL address must not contain special characters, such as Chinese language characters.
   * @param transcodingEnabled Whether to enable transcoding. If you set this parameter as true,
   * ensure that you call the [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} method before this method.
   * - `true`: Enable transcoding. To transcode the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
   * - `false`: Disable transcoding.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): Invalid parameter, usually because the URL address is null or the string length is 0.
   *    - 7(NotInitialized): You have not initialized `RtcEngine` when publishing the stream.
   */
  addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
    return this._callMethod('addPublishStreamUrl', { url, transcodingEnabled });
  }

  /**
   * Removes an RTMP or RTMPS stream from the CDN.
   *
   * @deprecated
   *
   * This method is deprecated as of v3.6.2. See [Release Notes](https://docs.agora.io/en/Video/release_react_native_video?platform=React%20Native) for an alternative solution.
   *
   * This method removes the CDN streaming URL (added by [`addPublishStreamUrl`]{@link RtcChannel.addPublishStreamUrl}) from a CDN live stream.
   * The SDK reports the result of this method call in the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} callback.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - This method can only be called by a host in a `LiveBroadcasting` channel.
   * - This method removes only one CDN streaming URL each time it is called.
   *
   * @param url The CDN streaming URL to be removed. The maximum length of this parameter is 1024 bytes. The URL address must not contain special characters,
   * such as Chinese language characters.
   */
  removePublishStreamUrl(url: string): Promise<void> {
    return this._callMethod('removePublishStreamUrl', { url });
  }

  /**
   * Sets the video layout and audio settings for CDN live.
   *
   * @deprecated
   *
   * This method is deprecated as of v3.6.2. See [Release Notes](https://docs.agora.io/en/Video/release_react_native_video?platform=React%20Native) for an alternative solution.
   *
   * The SDK triggers the [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} callback when you
   * call this method to update the [`LiveTranscoding`]{@link LiveTranscoding} class. If you call this method to set the [`LiveTranscoding`]{@link LiveTranscoding}
   * class for the first time, the SDK does not trigger the [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} callback.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - Ensure that the user joins a channel before calling this method.
   * - This method can only be called by a host in a `LiveBroadcasting` channel.
   * - Ensure that you call this method before calling the [`addPublishStreamUrl`]{@link RtcChannel.addPublishStreamUrl} method.
   * - Agora supports pushing media streams in RTMPS protocol to the CDN only when you enable transcoding.
   *
   * @param transcoding Sets the CDN live audio/video transcoding settings.
   */
  setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
    return this._callMethod('setLiveTranscoding', { transcoding });
  }

  /**
   * Starts to relay media streams across channels.
   *
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} and [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callbacks,
   * and these callbacks report the state and events of the media stream relay.
   *
   * - If the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback reports [`Running(2)`]{@link ChannelMediaRelayState.Running} and [`None(0)`]{@link ChannelMediaRelayError.None}, and
   * the [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callback
   * reports [`SentToDestinationChannel(4)`]{@link ChannelMediaRelayEvent.SentToDestinationChannel}, the SDK starts relaying media streams between the original and the destination channel.
   *
   * - If the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback returns [`Failure(3)`]{@link ChannelMediaRelayState.Failure}, an exception occurs during the media stream relay.
   *
   * **Note**
   * - Contact support@agora.io before implementing this function.
   * - We do not support string user accounts in this API.
   * - Call this method after joining the channel.
   * - This method can only be called by a host in a `LiveBroadcasting` channel.
   * - After a successful method call, if you want to call this method again, ensure that you call the [`stopChannelMediaRelay`]{@link RtcChannel.stopChannelMediaRelay} method to quit the current relay.
   *
   * @param channelMediaRelayConfiguration The configuration of the media stream relay.
   */
  startChannelMediaRelay(
    channelMediaRelayConfiguration: ChannelMediaRelayConfiguration
  ): Promise<void> {
    return this._callMethod('startChannelMediaRelay', {
      channelMediaRelayConfiguration,
    });
  }

  /**
   * Stops the media stream relay.
   *
   * Once the relay stops, the host quits all the destination channels.
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback. If the callback reports [`Idle(0)`]{@link ChannelMediaRelayState.Idle} and
   * [`None(0)`]{@link ChannelMediaRelayError.None}, the host successfully stops the relay.
   *
   * **Note**
   * - If the method call fails, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback with
   * the [`ServerNoResponse(2)`]{@link ChannelMediaRelayError.ServerNoResponse} or [`ServerConnectionLost(8)`]{@link ChannelMediaRelayError.ServerConnectionLost} state code.
   * You can leave the channel using [`leaveChannel`]{@link RtcChannel.leaveChannel}, and the media stream relay automatically stops.
   */
  stopChannelMediaRelay(): Promise<void> {
    return this._callMethod('stopChannelMediaRelay');
  }

  /**
   * Updates the channels for media relay.
   *
   * After the channel media relay starts, if you want to relay the media stream to more channels, or leave the current relay channel, you can call this method.
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callback with
   * the [`UpdateDestinationChannel(7)`]{@link ChannelMediaRelayEvent.UpdateDestinationChannel} state code.
   *
   * **Note**
   * - Call this method after the [`startChannelMediaRelay`]{@link RtcChannel.startChannelMediaRelay} method to update the destination channel.
   * - This method supports adding at most four destination channels in the relay.
   *
   * @param channelMediaRelayConfiguration The media stream relay configuration.
   */
  updateChannelMediaRelay(
    channelMediaRelayConfiguration: ChannelMediaRelayConfiguration
  ): Promise<void> {
    return this._callMethod('updateChannelMediaRelay', {
      channelMediaRelayConfiguration,
    });
  }

  /**
   * Sets the default video-stream type of the remotely subscribed video stream
   * when the remote user sends dual streams.
   *
   * **Note**
   * - This method can only be called before joining a channel. Agora does not support you to change the default subscribed video stream type after joining a channel.
   * - If you call both this method and [`setRemoteVideoStreamType`]{@link setRemoteVideoStreamType}, the SDK applies the settings in the `setRemoteVideoStreamType` method.
   *
   * @param streamType Sets the default video-stream type.
   */
  setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
    return this._callMethod('setRemoteDefaultVideoStreamType', { streamType });
  }

  /**
   * Sets the video stream type of the remote video stream when the remote user sends dual streams.
   * This method allows the app to adjust the corresponding video-stream type based on the size of the
   * video window to reduce the bandwidth and resources.
   * - If the remote user enables the dual-stream mode by calling the [`enableDualStreamMode`]{@link RtcEngine.enableDualStreamMode} method,
   * the SDK receives the high-video stream by default. You can use this method to switch to the low-video stream.
   * - If dual-stream mode is not enabled, the SDK receives the high-stream video by default.
   * By default, the aspect ratio of the low-video stream is the same as the high-video stream. Once the resolution of the high-video stream is set,
   * the system automatically sets the resolution, frame rate, and bitrate of the low-video stream.
   *
   * @param uid ID of the remote user sending the video stream.
   * @param streamType Sets the video-stream type.
   */
  setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): Promise<void> {
    return this._callMethod('setRemoteVideoStreamType', { uid, streamType });
  }

  /**
   * Sets the priority of a remote user's media stream.
   *
   * Use this method with the [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} method.
   * If a remote video stream experiences the fallback, the SDK ensures the high-priority user gets the best possible stream quality.
   *
   * **Note**
   * The Agora SDK supports setting userPriority as high for one user only.
   *
   * @param uid The ID of the remote user.
   * @param userPriority The priority of the remote user.
   */
  setRemoteUserPriority(
    uid: number,
    userPriority: UserPriority
  ): Promise<void> {
    return this._callMethod('setRemoteUserPriority', { uid, userPriority });
  }

  /**
   * Registers the metadata observer.
   *
   * A successful call of this method triggers the [`setMaxMetadataSize`]{@link RtcChannel.setMaxMetadataSize} method.
   *
   * This method enables you to add synchronized metadata in the video stream for more diversified live streaming interactions,
   * such as sending shopping links, digital coupons, and online quizzes.
   *
   * **Note**
   * - Call this method before the [`joinChannel`]{@link RtcChannel.joinChannel} method.
   * - This method applies to the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile only.
   */
  registerMediaMetadataObserver(): Promise<void> {
    return this._callMethod('registerMediaMetadataObserver');
  }

  /**
   * Sends the metadata.
   *
   * @param metadata The metadata to be sent.
   */
  sendMetadata(metadata: string): Promise<void> {
    return this._callMethod('sendMetadata', { metadata });
  }

  /**
   * Sets the maximum size of the metadata.
   *
   * @param size Buffer size of the sent or received metadata.
   */
  setMaxMetadataSize(size: number): Promise<void> {
    return this._callMethod('setMaxMetadataSize', { size });
  }

  /**
   * Unregisters the metadata observer.
   */
  unregisterMediaMetadataObserver(): Promise<void> {
    return this._callMethod('unregisterMediaMetadataObserver');
  }

  /**
   * Enables/Disables the built-in encryption.
   *
   * @since v3.1.2.
   *
   * In scenarios requiring high security, Agora recommends calling `enableEncryption` to enable the built-in encryption before joining a channel.
   *
   * After a user leaves the channel, the SDK automatically disables the built-in encryption. To re-enable the built-in encryption, call this method before the user joins the channel again.
   *
   * As of v3.4.5, Agora recommends using either the `AES128GCM2` or `AES256GCM2` encryption mode, both of which support adding a salt and are more secure.
   * For details, see *Media Stream Encryption*.
   *
   * **Warning**
   * All users in the same channel must use the same encryption mode, encryption key, and salt; otherwise, users cannot communicate with each other.
   *
   * **Note**
   * - If you enable the built-in encryption, you cannot use the RTMP or RTMPS streaming function.
   * - To enhance security, Agora recommends using a new key and salt every time you enable the media stream encryption.
   *
   * @param enabled Whether to enable the built-in encryption.
   * - `true`: Enable the built-in encryption.
   * - `false`: Disable the built-in encryption.
   * @param config Configurations of built-in encryption schemas. See [`EncryptionConfig`]{@link EncryptionConfig}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): An invalid parameter is used. Set the parameter with a valid value.
   *    - 4(NotSupported):  The encryption mode is incorrect or the SDK fails to load the external encryption library. Check the enumeration or reload the external encryption library.
   *    - 7(NotInitialized): The SDK is not initialized. Initialize the `RtcEngine` instance before calling this method.
   */
  enableEncryption(enabled: boolean, config: EncryptionConfig): Promise<void> {
    return this._callMethod('enableEncryption', { enabled, config });
  }

  /**
   * Sets the built-in encryption mode.
   *
   * @deprecated
   * Deprecated as of v3.1.2. Use [`enableEncryption`]{@link enableEncryption} instead.
   *
   * The Agora SDK supports built-in encryption, which is set to aes-128-xts mode by default.
   * Call this method to set the encryption mode to use other encryption modes.
   * All users in the same channel must use the same encryption mode and password.
   * Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.
   *
   * **Note**
   * - Do not use this method for CDN streaming.
   * - Before calling this method, ensure that you have called [`setEncryptionSecret`]{@link RtcChannel.setEncryptionSecret} to enable encryption.
   *
   * @param encryptionMode Sets the encryption mode.
   */
  setEncryptionMode(encryptionMode: EncryptionMode): Promise<void> {
    return this._callMethod('setEncryptionMode', { encryptionMode });
  }

  /**
   * Enables built-in encryption with an encryption password before joining a channel.
   *
   * @deprecated
   * Deprecated as of v3.1.2. Use [`enableEncryption`]{@link enableEncryption} instead.
   *
   * All users in a channel must set the same encryption password.
   * The encryption password is automatically cleared once a user leaves the channel.
   * If the encryption password is not specified or set to empty, the encryption functionality is disabled.
   *
   * **Note**
   * - For optimal transmission, ensure that the encrypted data size does not exceed the original data size + 16 bytes. 16 bytes is the maximum padding size for AES encryption.
   * - Do not use this method for CDN live streaming.
   *
   * @param secret The encryption password.
   */
  setEncryptionSecret(secret: string): Promise<void> {
    return this._callMethod('setEncryptionSecret', { secret });
  }

  /**
   * Injects an online media stream to live interactive streaming.
   *
   * If this method call succeeds, the server pulls the voice or video stream and injects it into a live channel. This applies to scenarios where all audience members in the channel can watch a live show and interact with each other.
   *
   * Calling this method triggers the following callbacks:
   * - The local client:
   *  - [`StreamInjectedStatus`]{@link RtcChannelEvents.StreamInjectedStatus}, with the state of injecting the media stream.
   *  - [`UserJoined`]{@link RtcChannelEvents.UserJoined}(uid: 666), if the method call succeeds and the online
   * media stream is injected into the channel.
   * - The remote client:
   *  - [`UserJoined`]{@link RtcChannelEvents.UserJoined}(uid: 666), if the method call succeeds and the online
   * media stream is injected into the channel.
   *
   * **Warning**
   *
   * Agora will soon stop the service for injecting online media streams on the client. If you have not implemented this service, Agora recommends that you do not use it.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - This method can only be called by a host in a `LiveBroadcasting` channel.
   *
   * @param url The URL address to be added to the ongoing live interactive streaming. Valid protocols are RTMP, HLS, and FLV.
   * - Supported FLV audio codec type: AAC.
   * - Supported FLV video codec type: H264 (AVC).
   * @param config The [`LiveInjectStreamConfig`]{@link LiveInjectStreamConfig} object, which contains the configuration information for the added voice or video stream.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The injected URL does not exist. Call this method again to inject the stream and ensure that the URL is valid.
   *    - 3(NotReady): The user is not in the channel.
   *    - 4(NotSupported): The channel profile is not `LiveBroadcasting`. Call the `setChannelProfile` method and set the channel profile to `LiveBroadcasting` before calling this method.
   *    - 7(NotInitialized): The SDK is not initialized. Initialize the `RtcEngine` instance before calling this method.
   */
  addInjectStreamUrl(
    url: string,
    config: LiveInjectStreamConfig
  ): Promise<void> {
    return this._callMethod('addInjectStreamUrl', { url, config });
  }

  /**
   * Removes the injected online media stream from a `LiveBroadcasting` channel.
   *
   * This method removes the URL address added by [`addInjectStreamUrl`]{@link RtcChannel.addInjectStreamUrl}.
   *
   * If you successfully remove the URL address from the live interactive streaming, the SDK triggers the
   * [`UserJoined`]{@link RtcChannelEvents.UserJoined} callback, with the stream uid of 666.
   *
   * **Warning**
   *
   * Agora will soon stop the service for injecting online media streams on the client. If you have not implemented this service, Agora recommends that you do not use it.
   *
   * @param url The URL address to be removed.
   */
  removeInjectStreamUrl(url: string): Promise<void> {
    return this._callMethod('removeInjectStreamUrl', { url });
  }

  /**
   * Creates a data stream.
   *
   * @deprecated
   *
   * This method is deprecated from v3.3.1. Use the [`createDataStreamWithConfig`]{@link createDataStreamWithConfig} method instead.
   *
   * Each user can create up to five data streams during the life cycle of the [`RtcChannel`]{@link RtcChannel} instance.
   *
   * **Note**
   *
   * Set both the `reliable` and `ordered` parameters to `true` or `false`. Do not set one as `true`
   * and the other as `false`.
   * @param reliable Sets whether the recipients are guaranteed to receive the data stream from the
   * sender within five seconds.
   * - `true`: The recipients receive the data from the sender within five seconds. If the recipient does
   * not receive the data within five seconds, the SDK triggers the [`StreamMessageError`]{@link RtcChannelEvents.StreamMessageError} callback and returns an error code.
   * - `false`: There is no guarantee that the recipients receive the data stream within five seconds and no error message is reported for any delay or missing data stream.
   * @param ordered Determines whether the recipients receive the data stream in the sent order.
   * - `true`: The recipients receive the data in the sent order.
   * - `false`: The recipients do not receive the data in the sent order.
   * @returns
   * - Returns the stream ID, if the method call is successful.
   * - An error code if the method call fails.
   */
  createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
    return this._callMethod('createDataStream', { reliable, ordered });
  }

  /**
   * Creates a data stream.
   *
   * @since v3.3.1.
   *
   * Each user can create up to five data streams in a single channel.
   *
   * This method does not support data reliability. If the receiver receives a data packet five seconds or more after it was sent, the SDK directly discards the data.
   *
   * @param config The configurations for the data stream. See [`DataStreamConfig`]{@link DataStreamConfig}。
   *
   *
   * @return
   * - The stream ID if the method call succeeds.
   * - An error code if the method call fails.
   */
  createDataStreamWithConfig(config: DataStreamConfig): Promise<number> {
    return this._callMethod('createDataStream', { config });
  }

  /**
   * Sends the data stream message.
   *
   * The SDK has the following restrictions on this method:
   * - Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 KB.
   * - Each client can send up to 6 KB of data per second.
   * - Each user can have up to five data channels simultaneously.
   *
   * A successful call of this method triggers the [`StreamMessage`]{@link RtcChannelEvents.StreamMessage} callback on the remote client, from which the remote user gets the stream message.
   *
   * A failed call of this method triggers the [`StreamMessageError`]{@link RtcChannelEvents.StreamMessageError} callback on the remote client.
   *
   * @param streamId ID of the sent data stream returned by the [`createDataStream`]{@link RtcChannel.createDataStream} method.
   *
   * @param message The message data.
   */
  sendStreamMessage(streamId: number, message: string): Promise<void> {
    return this._callMethod('sendStreamMessage', { streamId, message });
  }

  /**
   * Stops or resumes publishing the local audio stream.
   *
   * @since v3.4.5
   *
   * This method only sets the publishing state of the audio stream in the channel of `RtcChannel`.
   * A successful method call triggers the [`RemoteAudioStateChanged`]{@link RtcChannelEvents.RemoteAudioStateChanged} callback on the remote client.
   *
   * You can only publish the local stream in one channel at a time.
   * If you create multiple channels, ensure that you only call `muteLocalAudioStream(false)` in one channel;
   * otherwise, the method call fails, and the SDK returns `-5 (ERR_REFUSED)`.
   *
   * **Note**
   * - This method does not change the usage state of the audio-capturing device.
   * - Whether this method call takes effect is affected by the [`joinChannel`]{@link RtcChannel.joinChannel} and [`setClientRole`]{@link RtcChannel.setClientRole} methods.
   * For details, see *Set the Publishing State*.
   *
   * @param muted Sets whether to stop publishing the local audio stream:
   * - true: Stop publishing the local audio stream.
   * - false: Resume publishing the local audio stream.
   *
   * @return
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *   - `-5 (ERR_REFUSED)`: The request is rejected.
   */
  muteLocalAudioStream(muted: boolean): Promise<void> {
    return this._callMethod('muteLocalAudioStream', { muted });
  }

  /**
   * Stops or resumes publishing the local video stream.
   *
   * @since v3.4.5
   *
   * This method only sets the publishing state of the video stream in the channel of RtcChannel.
   *
   * A successful method call triggers the [`RemoteVideoStateChanged`]{@link RtcChannelEvents.RemoteVideoStateChanged} callback on the remote client.
   *
   * You can only publish the local stream in one channel at a time. If you create multiple channels,
   * ensure that you only call `muteLocalVideoStream(false)` in one channel; otherwise, the method call fails,
   * and the SDK returns `-5 (ERR_REFUSED)`.
   *
   * **Note**
   * - This method does not change the usage state of the video-capturing device.
   * - Whether this method call takes effect is affected by the [`joinChannel`]{@link RtcChannel.joinChannel} and [`setClientRole`]{@link RtcChannel.setClientRole} methods.
   * For details, see *Set the Publishing State*.
   *
   * @param muted Sets whether to stop publishing the local video stream:
   * - true: Stop publishing the local video stream.
   * - false: Resume publishing the local video stream.
   *
   * @return
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *   - `-5 (ERR_REFUSED)`: The request is rejected.
   */
  muteLocalVideoStream(muted: boolean): Promise<void> {
    return this._callMethod('muteLocalVideoStream', { muted });
  }

  /**
   * Pauses the media stream relay to all destination channels.
   *
   * @since v3.5.2
   *
   * After the cross-channel media stream relay starts, you can call this method to pause relaying media streams to all destination channels; after the pause,
   * if you want to resume the relay, call [`resumeAllChannelMediaRelay`]{@link resumeAllChannelMediaRelay}.
   *
   * After a successful method call, the SDK triggers the
   * [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callback to report whether the media stream relay is successfully paused.
   *
   * **Note**
   * Call this method after the [`startChannelMediaRelay`]{@link startChannelMediaRelay} method.
   *
   */
  pauseAllChannelMediaRelay(): Promise<void> {
    return this._callMethod('pauseAllChannelMediaRelay');
  }

  /**
   * Resumes the media stream relay to all destination channels.
   *
   * @since v3.5.2
   *
   * After calling the [`pauseAllChannelMediaRelay`]{@link pauseAllChannelMediaRelay} method, you can call this method to resume relaying media streams to all destination channels.
   *
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callback
   * to report whether the media stream relay is successfully resumed.
   *
   * **Note**
   * Call this method after the [`pauseAllChannelMediaRelay`]{@link pauseAllChannelMediaRelay} method.
   *
   */
  resumeAllChannelMediaRelay(): Promise<void> {
    return this._callMethod('resumeAllChannelMediaRelay');
  }

  /**
   * @ignore For future use
   */
  setAVSyncSource(channelId: string, uid: number): Promise<void> {
    return this._callMethod('setAVSyncSource', { channelId, uid });
  }

  /**
   * Starts pushing media streams to a CDN and sets the transcoding configuration.
   *
   * @since v3.6.2
   *
   * You can call this method to push a live audio-and-video stream to the specified CDN address and set
   * the transcoding configuration. This method can push media streams to only one CDN address at a time,
   * so if you need to push streams to multiple addresses, call this method multiple times.
   *
   * After you call this method, the SDK triggers the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} callback
   * on the local client to report the state of the streaming.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function.
   * See Prerequisites in [Media Push](https://docs.agora.io/en/Interactive%20Broadcast/cdn_streaming_android?platform=Android).
   * - Call this method after joining a channel.
   * - Only hosts in the `LiveBroadcasting` profile can call this method.
   * - If you want to retry pushing streams after a failed push, make sure to call [`stopRtmpStream`]{@link stopRtmpStream} first,
   * then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *
   * @param url The address of the CDN live streaming. The format is RTMP or RTMPS.
   * The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   * @param transcoding The transcoding configuration for CDN live streaming. See [`LiveTranscoding`]{@link LiveTranscoding}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): `url` is null or the string length is 0.
   *    - 7(NotInitialized): The SDK is not initialized before calling this method.
   */
  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): Promise<void> {
    return this._callMethod('startRtmpStreamWithTranscoding', {
      url,
      transcoding,
    });
  }

  /**
   * Starts pushing media streams to a CDN without transcoding.
   *
   * @since v3.6.2
   *
   * You can call this method to push a live audio-and-video stream to the specified CDN address.
   * This method can push media streams to only one CDN address at a time, so if you need to push streams
   * to multiple addresses, call this method multiple times.
   *
   * After you call this method, the SDK triggers the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} callback
   * on the local client to report the state of the streaming.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function.
   * See Prerequisites in [Media Push](https://docs.agora.io/en/Interactive%20Broadcast/cdn_streaming_android?platform=Android).
   * - Call this method after joining a channel.
   * - Only hosts in the `LiveBroadcasting` profile can call this method.
   * - If you want to retry pushing streams after a failed push, make sure to call [`stopRtmpStream`]{@link stopRtmpStream} first,
   * then call this method to retry pushing streams; otherwise, the SDK returns the same error code as the last failed push.
   *
   * @param url The address of the CDN live streaming. The format is RTMP or RTMPS.
   * The character length cannot exceed 1024 bytes. Special characters such as Chinese characters are not supported.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): `url` is null or the string length is 0.
   *    - 7(NotInitialized): The SDK is not initialized before calling this method.
   */
  startRtmpStreamWithoutTranscoding(url: string): Promise<void> {
    return this._callMethod('startRtmpStreamWithoutTranscoding', { url });
  }

  /**
   * Stops pushing media streams to a CDN.
   *
   * @since v3.6.2
   *
   * You can call this method to stop the live stream on the specified CDN address.
   * This method can stop pushing media streams to only one CDN address at a time,
   * so if you need to stop pushing streams to multiple addresses, call this method multiple times.
   *
   * After you call this method, the SDK triggers the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} callback
   * on the local client to report the state of the streaming.
   *
   * @param url The address of the CDN live streaming. The format is RTMP or RTMPS. The character length cannot exceed 1024 bytes.
   * Special characters such as Chinese characters are not supported.
   */
  stopRtmpStream(url: string): Promise<void> {
    return this._callMethod('stopRtmpStream', { url });
  }

  /**
   * Updates the transcoding configuration.
   *
   * @since v3.6.2
   *
   * After you start pushing media streams to CDN with transcoding, you can dynamically update the
   * transcoding configuration according to the scenario. The SDK triggers the [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} callback
   * after the transcoding configuration is updated.
   *
   * @param transcoding The transcoding configuration for CDN live streaming. See [`LiveTranscoding`]{@link LiveTranscoding}.
   */
  updateRtmpTranscoding(transcoding: LiveTranscoding): Promise<void> {
    return this._callMethod('updateRtmpTranscoding', { transcoding });
  }
}

/**
 * @ignore
 */
interface RtcChannelInterface
  extends RtcAudioInterface,
    RtcVideoInterface,
    RtcVoicePositionInterface,
    RtcPublishStreamInterface,
    RtcMediaRelayInterface,
    RtcDualStreamInterface,
    RtcFallbackInterface,
    RtcMediaMetadataInterface,
    RtcEncryptionInterface,
    RtcInjectStreamInterface,
    RtcStreamMessageInterface {
  destroy(): Promise<void>;

  setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void>;

  joinChannel(
    token: string | undefined | null,
    optionalInfo: string | undefined | null,
    optionalUid: number,
    options: ChannelMediaOptions
  ): Promise<void>;

  joinChannelWithUserAccount(
    token: string | undefined | null,
    userAccount: string,
    options: ChannelMediaOptions
  ): Promise<void>;

  leaveChannel(): Promise<void>;

  renewToken(token: string): Promise<void>;

  getConnectionState(): Promise<ConnectionStateType>;

  publish(): Promise<void>;

  unpublish(): Promise<void>;

  getCallId(): Promise<string>;

  setAVSyncSource(channelId: string, uid: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcAudioInterface {
  adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;

  muteLocalAudioStream(muted: boolean): Promise<void>;

  muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;

  muteAllRemoteAudioStreams(muted: boolean): Promise<void>;

  setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVideoInterface {
  muteLocalVideoStream(muted: boolean): Promise<void>;

  muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;

  muteAllRemoteVideoStreams(muted: boolean): Promise<void>;

  setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;

  enableRemoteSuperResolution(uid: number, enabled: boolean): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVoicePositionInterface {
  setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcPublishStreamInterface {
  setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;

  addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;

  removePublishStreamUrl(url: string): Promise<void>;

  startRtmpStreamWithoutTranscoding(url: string): Promise<void>;

  startRtmpStreamWithTranscoding(
    url: string,
    transcoding: LiveTranscoding
  ): Promise<void>;

  updateRtmpTranscoding(transcoding: LiveTranscoding): Promise<void>;

  stopRtmpStream(url: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcMediaRelayInterface {
  startChannelMediaRelay(
    channelMediaRelayConfiguration: ChannelMediaRelayConfiguration
  ): Promise<void>;

  updateChannelMediaRelay(
    channelMediaRelayConfiguration: ChannelMediaRelayConfiguration
  ): Promise<void>;

  pauseAllChannelMediaRelay(): Promise<void>;

  resumeAllChannelMediaRelay(): Promise<void>;

  stopChannelMediaRelay(): Promise<void>;
}

/**
 * @ignore
 */
interface RtcDualStreamInterface {
  setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): Promise<void>;

  setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
}

/**
 * @ignore
 */
interface RtcFallbackInterface {
  setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
}

/**
 * @ignore
 */
interface RtcMediaMetadataInterface {
  registerMediaMetadataObserver(): Promise<void>;

  unregisterMediaMetadataObserver(): Promise<void>;

  setMaxMetadataSize(size: number): Promise<void>;

  sendMetadata(metadata: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcEncryptionInterface {
  setEncryptionSecret(secret: string): Promise<void>;

  setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>;

  enableEncryption(enabled: boolean, config: EncryptionConfig): Promise<void>;
}

/**
 * @ignore
 */
interface RtcInjectStreamInterface {
  addInjectStreamUrl(
    url: string,
    config: LiveInjectStreamConfig
  ): Promise<void>;

  removeInjectStreamUrl(url: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcStreamMessageInterface {
  createDataStream(reliable: boolean, ordered: boolean): Promise<number>;

  createDataStreamWithConfig(config: DataStreamConfig): Promise<number>;

  sendStreamMessage(streamId: number, message: string): Promise<void>;
}
