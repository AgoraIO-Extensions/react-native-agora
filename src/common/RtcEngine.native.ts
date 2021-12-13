import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import {
  AudioRecordingConfiguration,
  BeautyOptions,
  CameraCapturerConfiguration,
  ChannelMediaOptions,
  ChannelMediaRelayConfiguration,
  ClientRoleOptions,
  DataStreamConfig,
  EchoTestConfiguration,
  EncryptionConfig,
  LastmileProbeConfig,
  LiveInjectStreamConfig,
  LiveTranscoding,
  RhythmPlayerConfig,
  RtcEngineConfig,
  RtcEngineContext,
  UserInfo,
  VideoEncoderConfiguration,
  VirtualBackgroundSource,
  WatermarkOptions,
} from './Classes';
import type {
  AreaCode,
  AudioEffectPreset,
  AudioEqualizationBandFrequency,
  AudioProfile,
  AudioRecordingQuality,
  AudioReverbPreset,
  AudioReverbType,
  AudioSampleRateType,
  AudioScenario,
  AudioSessionOperationRestriction,
  AudioVoiceChanger,
  ChannelProfile,
  ClientRole,
  CloudProxyType,
  ConnectionStateType,
  EncryptionMode,
  LogFilter,
  StreamFallbackOptions,
  UserPriority,
  VideoStreamType,
  VoiceBeautifierPreset,
  VoiceConversionPreset,
  AudioMixingDualMonoMode,
} from './Enums';
import type { Listener, RtcEngineEvents, Subscription } from './RtcEvents';
import RtcChannel from './RtcChannel.native';

/**
 * @ignore
 */
type Rate = 1 | 2 | 3 | 4 | 5;

const {
  /**
   * @ignore
   */
  AgoraRtcEngineModule,
} = NativeModules;
/**
 * @ignore
 */
const Prefix = AgoraRtcEngineModule.prefix;
/**
 * @ignore
 */
const RtcEngineEvent = new NativeEventEmitter(AgoraRtcEngineModule);

/**
 * @ignore
 */
let engine: RtcEngine | undefined;

/**
 * [`RtcEngine`]{@link RtcEngine} is the main class of the Agora SDK.
 */
export default class RtcEngine implements RtcEngineInterface {
  /**
   * @ignore
   */
  private _listeners = new Map<string, Map<Listener, Listener>>();

  /**
   * @ignore
   */
  private static _callMethod<T>(method: string, args?: {}): Promise<T> {
    return AgoraRtcEngineModule.callMethod(method, args);
  }

  /**
   * Gets a created [`RtcEngine`]{@link RtcEngine} instance.
   *
   * **Note**
   *
   * Ensure that you have created an `RtcEngine`. Otherwise, the method call fails and the SDK returns an error message.
   * @returns
   * - The `RtcEngine` instance, if the method call succeeds.
   * - Returns an error when it fails to get an `RtcEngine`.
   */
  static instance(): RtcEngine {
    if (engine) {
      return engine as RtcEngine;
    } else {
      throw new Error('please create RtcEngine first');
    }
  }

  /**
   * Gets the SDK version.
   *
   * @since v3.3.1.
   *
   * You can call this method either before or after joining a channel.
   * @return The version of the current SDK in the string format. For example, 2.3.0.
   */
  static async getSdkVersion(): Promise<string> {
    return RtcEngine._callMethod('getSdkVersion');
  }

  /**
   * Gets the warning or error description.
   *
   * @since v3.3.1.
   *
   * @param error The warning or error code in [`Warning`]{@link RtcEngineEvents.Warning} or [`Error`]{@link RtcEngineEvents.Error}.
   *
   * @return The warning or error description.
   *
   */
  static async getErrorDescription(error: number): Promise<string> {
    return RtcEngine._callMethod('getErrorDescription', { error });
  }

  /**
   * Creates an [`RtcEngine`]{@link RtcEngine} instance.
   *
   * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * **Note**
   * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
   * - The Agora React Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app.
   * @param appId The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
   * Only users in apps with the same App ID can join the same channel and communicate with each other.
   * Use an App ID to create only one [`RtcEngine`]{@link RtcEngine} instance. To change your App ID, call [`destroy`]{@link destroy} to destroy the current [`RtcEngine`]{@link RtcEngine} instance, and after [`destroy`]{@link destroy} returns `0`,
   * call `create` to create an [`RtcEngine`]{@link RtcEngine} instance with the new App ID.
   * @returns
   * - The `RtcEngine` instance, if the method call succeeds.
   * - The error code, if the method call fails.
   *    - 101(InvalidAppId): The app ID is invalid. Check if it is in the correct format.
   */
  static async create(appId: string): Promise<RtcEngine> {
    return RtcEngine.createWithContext(new RtcEngineContext(appId));
  }

  /**
   * Creates an [`RtcEngine`]{@link RtcEngine} instance.
   *
   * @deprecated
   *
   * Deprecated as of v3.3.1. Use [`createWithContext`]{@link createWithContext} instead.
   *
   * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * **Note**
   *
   * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
   * - The Agora React Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app.
   * @param appId The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
   * Only users in apps with the same App ID can join the same channel and communicate with each other. Use an App ID to create only one [`RtcEngine`]{@link RtcEngine} instance.
   * To change your App ID, call [`destroy`]{@link destroy} to destroy the current [`RtcEngine`]{@link RtcEngine} instance and after [`destroy`]{@link destroy} returns `0`, call [`create`]{@link create} to create an [`RtcEngine`]{@link RtcEngine} instance with the new App ID.
   * @param areaCode The area of connection. This advanced feature applies to scenarios that have regional restrictions.
   * For details, see {@link AreaCode}.
   *
   * After specifying the region, the app that integrates the Agora SDK connects to the Agora servers within that region.
   *
   * @returns
   * - The `RtcEngine` instance, if the method call succeeds.
   * - The error code, if the method call fails.
   *   - 101(InvalidAppId): The app ID is invalid. Check if it is in the correct format.
   */
  static async createWithAreaCode(
    appId: string,
    areaCode: AreaCode
  ): Promise<RtcEngine> {
    return RtcEngine.createWithContext(
      new RtcEngineContext(appId, { areaCode: [areaCode] })
    );
  }

  /**
   * Creates an [`RtcEngine`]{@link RtcEngine} instance.
   *
   * @deprecated Deprecated as of v3.4.5. Use [`createWithContext`]{@link createWithContext} instead.
   *
   * @since v3.3.1.
   *
   * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * @note
   * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
   * - The Agora RTC Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app for now.
   *
   * @param config Configurations for the [`RtcEngine`]{@link RtcEngine} instance. For details, see [`RtcEngineConfig`]{@link RtcEngineConfig}.
   * @return
   * - The [`RtcEngine`]{@link RtcEngine} instance, if the method call succeeds.
   * - The error code, if the method call fails.
   *   - 101(InvalidAppId): The app ID is invalid. Check if it is in the correct format.
   */
  static async createWithConfig(config: RtcEngineConfig): Promise<RtcEngine> {
    return this.createWithContext(config);
  }

  /**
   * Creates an [`RtcEngine`]{@link RtcEngine} instance.
   *
   * @since v3.4.5
   *
   * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * @note
   * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
   * - The Agora RTC Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app for now.
   *
   * @param context Configurations for the [`RtcEngine`]{@link RtcEngine} instance. For details, see [`RtcEngineContext`]{@link RtcEngineContext}.
   * @return
   * - The [`RtcEngine`]{@link RtcEngine} instance, if the method call succeeds.
   * - The error code, if the method call fails.
   *   - 101(InvalidAppId): The app ID is invalid. Check if it is in the correct format.
   */
  static async createWithContext(
    context: RtcEngineContext
  ): Promise<RtcEngine> {
    if (engine) return engine;
    let areaCode: number | undefined;
    if (context.areaCode) {
      let code = 0;
      context.areaCode.forEach((value) => {
        code |= value;
      });
      areaCode = code;
    }
    await RtcEngine._callMethod('create', {
      config: {
        ...context,
        areaCode: areaCode,
      },
      appType: 8,
    });
    engine = new RtcEngine();
    return engine;
  }

  /**
   * Destroys the [`RtcEngine`]{@link RtcEngine} instance and releases all resources used by the Agora SDK.
   *
   * Use this method for apps in which users occasionally make voice or video calls. When users do not make calls, you can free up resources for other operations.
   * Once you call this method to destroy the created [`RtcEngine`]{@link RtcEngine} instance, you cannot use any method or callback in the SDK any more.
   * If you want to use the real-time communication functions again, you must call `create` to create a new [`RtcEngine`]{@link RtcEngine} instance.
   *
   * **Note**
   *
   * - Because [`destroy`]{@link destroy} is a synchronous method and the app cannot move on to another task until the execution completes,
   * Agora suggests calling this method in a sub-thread to avoid congestion in the main thread.
   * Besides, you cannot call [`destroy`]{@link destroy} in any method or callback of the SDK.
   * Otherwise, the SDK cannot release the resources occupied by the [`RtcEngine`]{@link RtcEngine} instance until the callbacks return results, which may result in a deadlock.
   * - If you want to create a new [`RtcEngine`]{@link RtcEngine} instance after destroying the current one, ensure that you wait till the [`destroy`]{@link destroy} method completes executing.
   */
  destroy(): Promise<void> {
    RtcChannel.destroyAll();
    this.removeAllListeners();
    engine = undefined;
    return RtcEngine._callMethod('destroy');
  }

  /**
   * Adds the [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
   *
   * After setting the [`RtcEngineEvents`]{@link RtcEngineEvents} handler, you can listen for `RtcEngine` events and receive the statistics of the corresponding RtcEngine instance.
   * @param event The event type.
   * @param listener The [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
   */
  addListener<EventType extends keyof RtcEngineEvents>(
    event: EventType,
    listener: RtcEngineEvents[EventType]
  ): Subscription {
    const callback = (res: any) => {
      const { channelId, data } = res;
      if (channelId === undefined) {
        // @ts-ignore
        listener(...data);
      }
    };
    let map = this._listeners.get(event);
    if (map === undefined) {
      map = new Map<Listener, Listener>();
      this._listeners.set(event, map);
    }
    const subscription = RtcEngineEvent.addListener(Prefix + event, callback);
    map.set(listener, callback);
    return {
      remove: () => {
        this.removeListener(event, listener, subscription);
      },
    };
  }

  /**
   * Removes the [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
   *
   * For callback events that you only want to listen for once, call this method to remove the specific [`RtcEngineEvents`]{@link RtcEngineEvents} objects after you have received them.
   * @param event The event type.
   * @param listener The [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
   */
  removeListener<EventType extends keyof RtcEngineEvents>(
    event: EventType,
    listener: RtcEngineEvents[EventType],
    subscription?: EmitterSubscription
  ) {
    const map = this._listeners.get(event);
    if (map === undefined) return;

    if (subscription && 'remove' in subscription) {
      subscription.remove();
    } else {
      RtcEngineEvent.removeListener(
        Prefix + event,
        map.get(listener) as Listener
      );
    }
    map.delete(listener);
  }

  /**
   * Removes all the [`RtcEngineEvents`]{@link RtcEngineEvents} handlers.
   * @param event The event type.
   */
  removeAllListeners<EventType extends keyof RtcEngineEvents>(
    event?: EventType
  ) {
    if (event === undefined) {
      this._listeners.forEach((_, key) => {
        RtcEngineEvent.removeAllListeners(Prefix + key);
      });
      this._listeners.clear();
      return;
    }
    RtcEngineEvent.removeAllListeners(Prefix + event);
    this._listeners.delete(event as string);
  }

  /**
   * Sets the channel profile of the Agora [`RtcEngine`]{@link RtcEngine}.
   *
   * After initialization, the SDK uses the communication channel profile by default. You can call `setChannelProfile` to set the channel profile.
   *
   * The Agora [`RtcEngine`]{@link RtcEngine} differentiates channel profiles and applies different optimization algorithms accordingly.
   * For example, it prioritizes smoothness and low latency for a video call, and prioritizes video quality for live interactive video streaming.
   * @param profile The channel profile of the Agora [`RtcEngine`]{@link RtcEngine}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 7(NotInitialized): The SDK is not initialized.
   */
  setChannelProfile(profile: ChannelProfile): Promise<void> {
    return RtcEngine._callMethod('setChannelProfile', { profile });
  }

  /**
   * Sets the role of a user in interactive live streaming.
   *
   * After calling [`setChannelProfile(LiveBroadcasting)`]{@link setChannelProfile}, the SDK sets the user role as audience by default. You can call `setClientRole` to set the user role as host.
   *
   * You can call this method either before or after joining a channel. If you call this method to switch the user role after joining a channel, the SDK automatically does the following:
   * - Calls [`muteLocalAudioStream`]{@link muteLocalAudioStream} and [`muteLocalVideoStream`]{@link muteLocalVideoStream} to change the publishing state.
   * - Triggers [`ClientRoleChanged`]{@link RtcEngineEvents.ClientRoleChanged} on the local client.
   * - Triggers [`UserJoined`]{@link RtcEngineEvents.UserJoined} or [`UserOffline`]{@link RtcEngineEvents.UserOffline} ([`BecomeAudience`]{@link UserOfflineReason.BecomeAudience}) on the remote client.
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
    return RtcEngine._callMethod('setClientRole', { role, options });
  }

  /**
   * Allows a user to join a channel.
   *
   * Users in the same channel can talk to each other, and multiple users in the same channel can start a group chat. Users with different App IDs cannot call each other.
   * You must call [`leaveChannel`]{@link leaveChannel} to exit the current call before joining another channel.
   *
   * A successful call of this method triggers the following callbacks:
   *
   * - The local client: [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess}.
   *
   * - The remote client: [`UserJoined`]{@link RtcEngineEvents.UserJoined}, if the user joining the channel is in the [`Communication`]{@link ChannelProfile.Communication} profile,
   * or is a [`Broadcaster`]{@link ClientRole.Broadcaster} in the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile.
   *
   * When the connection between the client and Agora server is interrupted due to poor network conditions,
   * the SDK tries reconnecting to the server. When the local client successfully rejoins the channel, the SDK triggers the [`RejoinChannelSuccess`]{@link RtcEngineEvents.RejoinChannelSuccess} callback on the local client.
   *
   * Once the user joins the channel (switches to another channel), the user publishes the local audio and video streams and automatically subscribes to the audio and video streams of all the other users in the channel.
   * Subscribing incurs all associated usage costs. To unsubscribe, set the `options` parameter or call the `mute` methods accordingly.
   *
   * **Note**
   *
   * A channel does not accept duplicate uids, such as two users with the same `uid`. If you set `uid` as `0`, the system automatically assigns a uid.
   *
   * **Warning**
   *
   * Ensure that the App ID used for creating the token is the same App ID used in the `create` method for creating an [`RtcEngine`]{@link RtcEngine} object. Otherwise, CDN live streaming may fail.
   *
   * @param token The token generated at your server. See [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   * @param channelName The unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   * @param optionalInfo (Optional) Reserved for future use.
   * @param optionalUid (Optional) User ID. A 32-bit unsigned integer with a value ranging from 1 to (2^32-1). `optionalUid` must be unique. If `optionalUid` is not assigned (or set to `0`), the SDK assigns and returns `uid` in the [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callback.
   * Your app must record and maintain the returned uid since the SDK does not do so.
   *
   * The uid is represented as a 32-bit unsigned integer in the SDK. Since unsigned integers are not supported by Java, the uid is handled as a 32-bit signed integer and larger numbers are interpreted as negative numbers in Java.
   * If necessary, the uid can be converted to a 64-bit integer through “uid&0xffffffffL”.
   *
   * @param options @since v3.3.1. (Optional) The channel media options: [`ChannelMediaOptions`]{@link ChannelMediaOptions}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 3(NotReady): The SDK fails to be initialized. You can try re-initializing the SDK.
   *    - 5(Refused): The request is rejected. Possible reasons:
   *        - You have created an `RtcChannel` object with the same channel name.
   *        - You have joined and published a stream in a channel created by the `RtcChannel` object. When you join a channel created by the RtcEngine object, the SDK publishes the local audio and video streams to that channel by default. Because the SDK does not support publishing a local stream to more than one channel simultaneously, an error occurs in this occasion.
   *    - 7(NotInitialized): The SDK is not initialized.
   */
  joinChannel(
    token: string | undefined | null,
    channelName: string,
    optionalInfo: string | undefined | null,
    optionalUid: number,
    options?: ChannelMediaOptions
  ): Promise<void> {
    return RtcEngine._callMethod('joinChannel', {
      token,
      channelName,
      optionalInfo,
      optionalUid,
      options,
    });
  }

  /**
   * Switches to a different channel.
   *
   * This method allows the audience of a [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} channel to switch to a different channel.
   *
   * After the user successfully switches to another channel, the [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel} and [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callbacks are triggered to
   * indicate that the user has left the original channel and joined a new one.
   *
   * Once the user joins the channel (switches to another channel), the user subscribes to the audio and video streams of all the other users in the channel by default, giving rise to usage and billing calculation. If you do not want to subscribe to a specified stream or all remote streams, call the `mute` methods accordingly.
   *
   * **Note**
   *
   * This method applies to the [`Audience`]{@link ClientRole.Audience} role in a [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} channel only.
   *
   * @param token The token generated at your server. See [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   * @param channelName Unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   * @param options @since v3.3.1. (Optional) The channel media options: [`ChannelMediaOptions`]{@link ChannelMediaOptions}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 1(Failed): A general error occurs (no specified reason).
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 5(Refused): The request is rejected, probably because the user is not an audience.
   *    - 7(NotInitialized): The SDK is not initialized.
   *    - 102(InvalidChannelId): The channel name is invalid.
   *    - 113(NotInChannel): The user is not in the channel.
   */
  switchChannel(
    token: string | undefined | null,
    channelName: string,
    options?: ChannelMediaOptions
  ): Promise<void> {
    return RtcEngine._callMethod('switchChannel', {
      token,
      channelName,
      options,
    });
  }

  /**
   * Allows a user to leave a channel.
   *
   * After joining a channel, the user must call this method to end the call before joining another channel.
   * This method returns `0` if the user leaves the channel and releases all resources related to the call.
   *
   * This method call is asynchronous, and the user has not exited the channel when the method call returns.
   * Once the user leaves the channel, the SDK triggers the [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel} callback.
   * A successful [`leaveChannel`]{@link leaveChannel} method call triggers the following callbacks:
   * - The local client: [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel}.
   *
   * - The remote client: [`UserOffline`]{@link RtcEngineEvents.UserOffline}, if the user leaving the channel is in the [`Communication`]{@link ChannelProfile.Communication} channel, or is a [`Broadcaster`]{@link ClientRole.Broadcaster}
   * in the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile.
   *
   * **Note**
   * - If you call [`destroy`]{@link destroy} immediately after calling [`leaveChannel`]{@link leaveChannel}, the [`leaveChannel`]{@link leaveChannel} process interrupts, and the SDK does not trigger the [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel} callback.
   *
   * - If you call [`leaveChannel`]{@link leaveChannel} during CDN live streaming, the SDK triggers the [`removePublishStreamUrl`]{@link removePublishStreamUrl} method.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 1(Failed): A general error occurs (no specified reason).
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 7(NotInitialized): The SDK is not initialized.
   */
  leaveChannel(): Promise<void> {
    return RtcEngine._callMethod('leaveChannel');
  }

  /**
   * Renews the token when the current token expires.
   *
   * The token expires after a period of time once the token schema is enabled when:
   * - The SDK triggers the [`TokenPrivilegeWillExpire`]{@link RtcEngineEvents.TokenPrivilegeWillExpire} callback, or
   *
   * - The [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback reports the [`TokenExpired(9)`]{@link ConnectionChangedReason.TokenExpired} error.
   *
   * The app should retrieve a new token from the server and call this method to renew it. Failure to do so results in the SDK disconnecting from the server.
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
    return RtcEngine._callMethod('renewToken', { token });
  }

  /**
   * Enables interoperability with the Agora Web SDK ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only).
   *
   * @deprecated This method is deprecated. The Agora Native SDK automatically enables interoperability with the Web SDK, so you no longer need to call this method.
   *
   * If the channel has Web SDK users, ensure that you call this method, or the video of the Native user will be a black screen for the Web user.
   * Use this method when the channel profile is [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}. Interoperability with the Agora Web SDK is enabled by default when the channel profile is [`Communication`]{@link ChannelProfile.Communication}.
   * @param enabled Sets whether to enable/disable interoperability with the Agora Web SDK:
   * - `true`: Enable.
   * - `false`: (Default) Disable.
   *
   */
  enableWebSdkInteroperability(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableWebSdkInteroperability', { enabled });
  }

  /**
   * Gets the connection state of the SDK.
   *
   * @returns
   * The connection state of the SDK if the method call succeeds.
   */
  getConnectionState(): Promise<ConnectionStateType> {
    return RtcEngine._callMethod('getConnectionState');
  }

  /**
   * Gets the current call ID.
   *
   * When a user joins a channel on a client, a call ID is generated to identify the call from the client.
   * Feedback methods, such as [`rate`]{@link rate} and [`complain`]{@link complain}, must be called after the call ends to submit feedback to the SDK.
   *
   * The [`rate`]{@link rate} and [`complain`]{@link complain} methods require the `callId` parameter retrieved from the [`getCallId`]{@link getCallId} method during a call.
   * `callId` is passed as an argument into the [`rate`]{@link rate} and [`complain`]{@link complain} methods after the call ends.
   *
   * @returns
   * Current call ID.
   */
  getCallId(): Promise<string> {
    return RtcEngine._callMethod('getCallId');
  }

  /**
   * Allows the user to rate a call after the call ends.
   *
   * @param callId ID of the call retrieved from the [`getCallId`]{@link getCallId} method.
   * @param rating Rating of the call. The value is between 1 (lowest score) and 5 (highest score).
   * If you set a value out of this range, the [`InvalidArgument(-2)`]{@link ErrorCode.InvalidArgument} error occurs.
   * @param description (Optional) The description of the rating. The string length must be less than 800 bytes.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 3(NotReady): The SDK fails to be initialized. You can try re-initializing the SDK.
   */
  rate(callId: string, rating: Rate, description?: string): Promise<void> {
    return RtcEngine._callMethod('rate', { callId, rating, description });
  }

  /**
   * Allows a user to complain about the call quality after a call ends.
   *
   * @param callId ID of the call retrieved from the [`getCallId`]{@link getCallId} method.
   * @param description (Optional) The description of the complaint. The string length must be less than 800 bytes.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 3(NotReady): The SDK fails to be initialized. You can try re-initializing the SDK.
   */
  complain(callId: string, description: string): Promise<void> {
    return RtcEngine._callMethod('complain', { callId, description });
  }

  /**
   * Sets the log files that the SDK outputs.
   *
   * @deprecated
   *
   * This method is deprecated from v3.3.1. Use the `LogConfig` parameter in [`createWithConfig`]{@link createWithConfig} to set the log file path instead.
   *
   *
   * By default, the SDK outputs five log files, `agorasdk.log`, `agorasdk_1.log`, `agorasdk_2.log`, `agorasdk_3.log`, `agorasdk_4.log`, each with a default size of 1024 KB.
   * These log files are encoded in UTF-8. The SDK writes the latest logs in `agorasdk.log`. When `agorasdk.log` is full, the SDK deletes the log file with the
   * earliest modification time among the other four, renames `agorasdk.log` to the name of the deleted log file, and creates a new `agorasdk.log` to record latest logs.
   * The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.
   *
   * **Note**
   *
   * Ensure that you call this method immediately after calling the `create` method, otherwise the output log may not be complete.
   *
   * @param filePath The absolute path of log files. The default file path is as follows:
   *   - Android: `/storage/emulated/0/Android/data/<package_name>/files/agorasdk.log`
   *   - iOS: `App Sandbox/Library/caches/agorasdk.log`
   * Ensure that the directory for the log files exists and is writable. You can use this parameter to rename the log files.
   */
  setLogFile(filePath: string): Promise<void> {
    return RtcEngine._callMethod('setLogFile', { filePath });
  }

  /**
   * Sets the output log level of the SDK.
   *
   * @deprecated
   *
   * This method is deprecated from v3.3.1. Use the `LogConfig` parameter in [`createWithConfig`]{@link createWithConfig} to set the log file path instead.
   *
   * You can use one or a combination of the filters. The log level follows the sequence of `Off`, `Critical`, `Error`, `Warning`, `Info`, and `Debug`.
   * Choose a level to see the logs preceding that level. For example, if you set the log level to `Warning`, you see the logs within levels `Critical`, `Error`, and `Warning`.
   *
   * @param filter Sets the log filter level.
   */
  setLogFilter(filter: LogFilter): Promise<void> {
    return RtcEngine._callMethod('setLogFilter', { filter });
  }

  /**
   * Sets the size (KB) of a log file that the SDK outputs.
   *
   * @deprecated
   *
   * This method is deprecated from v3.3.1. Use the `LogConfig` parameter in [`createWithConfig`]{@link createWithConfig} to set the log file path instead.
   *
   * By default, the SDK outputs five log files, `agorasdk.log`, `agorasdk_1.log`, `agorasdk_2.log`, `agorasdk_3.log`, `agorasdk_4.log`, each with a default size of 1024 KB. These log files are encoded in UTF-8. The SDK writes the latest logs in `agorasdk.log`.
   * When `agorasdk.log` is full, the SDK deletes the log file with the earliest modification time among the other four, renames `agorasdk.log` to the name of the deleted log file, and create a new `agorasdk.log` to record latest logs.
   * @param fileSizeInKBytes The size (KB) of a log file. The default value is 1024 KB. If you set `fileSizeInKByte` to 1024 KB, the SDK outputs
   * at most 5 MB log files; if you set it to less than 1024 KB, the maximum size of a log file is still 1024 KB.
   */
  setLogFileSize(fileSizeInKBytes: number): Promise<void> {
    return RtcEngine._callMethod('setLogFileSize', { fileSizeInKBytes });
  }

  /**
   * @ignore
   *
   * Provides technical preview functionalities or special customizations by configuring the SDK with JSON options.
   *
   * The JSON options are not public by default. Agora is working on making commonly used JSON options public in a standard way.
   * @param parameters Sets the parameter as a JSON string in the specified format.
   */
  setParameters(parameters: string): Promise<void> {
    return RtcEngine._callMethod('setParameters', { parameters });
  }

  /**
   * Gets the user information by passing in the user ID.
   *
   * After a remote user joins the channel, the SDK gets the user ID and user account of the remote user, caches them in a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback on the local client.
   *
   * After receiving the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback, you can call this method to get the user ID of the remote user from the [`UserInfo`]{@link UserInfo} object by passing in the user account.
   * @param uid The user ID of the user. Ensure that you set this parameter.
   *
   * @returns
   * The user information if the method call succeeds.
   */
  getUserInfoByUid(uid: number): Promise<UserInfo> {
    return RtcEngine._callMethod('getUserInfoByUid', { uid });
  }

  /**
   * Gets the user information by passing in the user account.
   *
   * After a remote user joins the channel, the SDK gets the user ID and user account of the remote user, caches them in a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback on the local client.
   *
   * After receiving the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback, you can call this method to get the user ID of the remote user from the [`UserInfo`]{@link UserInfo} object by passing in the user account.
   * @param userAccount The user account of the user. Ensure that you set this parameter.
   *
   * @returns
   * The user information if the method call succeeds.
   */
  getUserInfoByUserAccount(userAccount: string): Promise<UserInfo> {
    return RtcEngine._callMethod('getUserInfoByUserAccount', { userAccount });
  }

  /**
   * Joins the channel with a user account.
   *
   * After the user successfully joins the channel, the SDK triggers the following callbacks:
   * - The local client: [`LocalUserRegistered`]{@link RtcEngineEvents.LocalUserRegistered} and [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess}.
   *
   * - The remote client: [`UserJoined`]{@link RtcEngineEvents.UserJoined} and [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated}, if the user joining the channel is in the [`Communication`]{@link ChannelProfile.Communication} profile, or is a [`Broadcaster`]{@link ClientRole.Broadcaster} in the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile.
   *
   * Once the user joins the channel, the user publishes the local audio and video streams and automatically subscribes to the audio and video streams
   * of all the other users in the channel. Subscribing incurs all associated usage costs. To unsubscribe, set the `options` parameter or call the `mute` methods accordingly.
   *
   * **Note**
   *
   * - To ensure smooth communication, use the same parameter type to identify the user.
   * For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account.
   * - If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
   * - Before using a String user name, ensure that you read [How can I use string user names](https://docs.agora.io/en/faq/string) for getting details about the limitations and implementation steps.
   *
   * @param token The token generated at your server. See [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   * @param channelName The channel name. The maximum length of this parameter is 64 bytes. Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   * @param userAccount The user account. The maximum length of this parameter is 255 bytes.
   * Ensure that you set this parameter and do not set it as null.
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   * @param options @since v3.3.1. (Optional) The channel media options: [`ChannelMediaOptions`]{@link ChannelMediaOptions}.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 2(InvalidArgument): The parameter is invalid.
   *    - 3(NotReady): The SDK fails to be initialized. You can try re-initializing the SDK.
   *    - 5(Refused): The request is rejected.
   *
   */
  joinChannelWithUserAccount(
    token: string | undefined | null,
    channelName: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): Promise<void> {
    return RtcEngine._callMethod('joinChannelWithUserAccount', {
      token,
      channelName,
      userAccount,
      options,
    });
  }

  /**
   * Registers a user account.
   *
   * Once registered, the user account can be used to identify the local user when the user joins the channel.
   * After the user successfully registers a user account, the SDK triggers the [`LocalUserRegistered`]{@link RtcEngineEvents.LocalUserRegistered} callback on the local client, reporting the user ID and user account of the local user.
   *
   * To join a channel with a user account, you can choose either of the following:
   * - Call this method to create a user account, and then [`joinChannelWithUserAccount`]{@link joinChannelWithUserAccount} to join the channel.
   *
   * - Call [`joinChannelWithUserAccount`]{@link joinChannelWithUserAccount} to join the channel.
   *
   * The difference between the two is that for the former, the time elapsed between calling the [`joinChannelWithUserAccount`]{@link joinChannelWithUserAccount} method and joining the channel is shorter than the latter.
   *
   * **Note**
   *
   * - Ensure that you set the `userAccount` parameter. Otherwise, this method does not take effect.
   * - Ensure that the value of the `userAccount` parameter is unique in the channel.
   * - To ensure smooth communication, use the same parameter type to identify the user.
   * For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too.
   * The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
   * @param appId The App ID of your project.
   * @param userAccount The user account. The maximum length of this parameter is 255 bytes.
   * Ensure that you set this parameter and do not set it as null. Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   */
  registerLocalUserAccount(appId: string, userAccount: string): Promise<void> {
    return RtcEngine._callMethod('registerLocalUserAccount', {
      appId,
      userAccount,
    });
  }

  /**
   * Adjusts the playback volume of all remote users.
   *
   * **Note**
   *
   * - This method adjusts the playback volume which is mixed volume of all remote users.
   * - To mute the local audio playback, call both this method and [`adjustAudioMixingVolume`]{@link adjustAudioMixingVolume}, and set `volume` as `0`.
   *
   * @param volume The playback volume.
   * The range is 0 to 100. The default value is 100, which represents the original volume.
   */
  adjustPlaybackSignalVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustPlaybackSignalVolume', { volume });
  }

  /**
   * Adjusts the volume of the signal captured by the microphone
   *
   * @param volume The volume of the signal captured by the microphone.
   * The range is 0 to 100. The default value is 100, which represents the original volume.
   */
  adjustRecordingSignalVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustRecordingSignalVolume', { volume });
  }

  /**
   * Adjusts the playback volume of a specified remote user.
   *
   * You can call this method as many times as necessary to adjust the playback volume of different remote users, or to repeatedly adjust the playback volume of the same remote user.
   *
   * **Note**
   * - Call this method after joining a channel.
   * - The playback volume here refers to the mixed volume of a specified remote user.
   * - This method can only adjust the playback volume of one specified remote user at a time. To adjust the playback volume of different remote users, call the method as many times, once for each remote user.
   * @param uid ID of the remote user.
   * @param volume The playback volume of the specified remote user. The value ranges from 0 to 100:
   * - 0: Mute.
   * - 100: The original volume.
   */
  adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustUserPlaybackSignalVolume', {
      uid,
      volume,
    });
  }

  /**
   * Disables the audio module.
   *
   * **Note**
   *
   * - This method affects the audio module and can be called after calling [`leaveChannel`]{@link leaveChannel}.
   * You can call this method either before or after joining a channel.
   *
   * - This method enables/disables the audio module and takes some time to take effect.
   * We recommend using the following API methods to control the audio module separately:
   *
   *  - [`enableLocalAudio`]{@link enableLocalAudio}: Whether to enable the microphone to create the local audio stream.
   *
   *  - [`muteLocalAudioStream`]{@link muteLocalAudioStream}: Whether to publish the local audio stream.
   *
   *  - [`muteRemoteAudioStream`]{@link muteRemoteAudioStream}: Whether to subscribe to and play the remote audio stream.
   *
   *  - [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams}: Whether to subscribe to and play all remote audio streams.
   */
  disableAudio(): Promise<void> {
    return RtcEngine._callMethod('disableAudio');
  }

  /**
   * Enables the audio module.
   *
   * The audio module is enabled by default.
   *
   * **Note**
   *
   * - This method affects the audio module and can be called after calling [`leaveChannel`]{@link leaveChannel}.
   * You can call this method either before or after joining a channel.
   *
   * - This method enables/disables the audio module and takes some time to take effect.
   * We recommend using the following API methods to control the audio module separately:
   *
   *  - [`enableLocalAudio`]{@link enableLocalAudio}: Whether to enable the microphone to create the local audio stream.
   *
   *  - [`muteLocalAudioStream`]{@link muteLocalAudioStream}: Whether to publish the local audio stream.
   *
   *  - [`muteRemoteAudioStream`]{@link muteRemoteAudioStream}: Whether to subscribe to and play the remote audio stream.
   *
   *  - [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams}: Whether to subscribe to and play all remote audio streams.
   */
  enableAudio(): Promise<void> {
    return RtcEngine._callMethod('enableAudio');
  }

  /**
   * Enables the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback at a set time interval to
   * report on which users are speaking and the speakers' volume.
   *
   * Once this method is enabled, the SDK returns the volume indication in the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback at the set time interval,
   * regardless of whether any user is speaking in the channel.
   * @param interval Sets the time interval between two consecutive volume indications:
   * - ≤ 0: Disables the volume indication.
   * - &gt; 0: Time interval (ms) between two consecutive volume indications. Agora recommends setting interval ≥ 200 ms.
   * @param smooth The smoothing factor sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The greater the value, the more sensitive the indicator.
   * The recommended value is 3.
   * @param report_vad
   * - `true`: Enable the voice activity detection of the local user. Once it is enabled, the `vad` parameter of the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback reports the voice activity status of the local user.
   * - `false`: (Default) Disable the voice activity detection of the local user. Once it is disabled, the `vad` parameter of the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback does not report the voice activity status of the local user,
   * except for scenarios where the engine automatically detects the voice activity of the local user.
   */
  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    report_vad: boolean
  ): Promise<void> {
    return RtcEngine._callMethod('enableAudioVolumeIndication', {
      interval,
      smooth,
      report_vad,
    });
  }

  /**
   * Enables/Disables the local audio capture.
   *
   * The audio function is enabled by default. This method disables/re-enables the local audio function, that is,
   * to stop or restart local audio capture and processing.
   *
   * This method does not affect receiving the remote audio streams, and `enableLocalAudio(false)` is applicable to scenarios
   * where the user wants to receive remote audio streams without sending any audio stream to other users in the channel.
   *
   * Once the local audio function is disabled or re-enabled, the SDK triggers the [`LocalAudioStateChanged`]{@link RtcEngineEvents.LocalAudioStateChanged} callback, which reports [`Stopped`]{@link AudioLocalState.Stopped} or [`Recording`]{@link AudioLocalState.Recording}.
   * The SDK triggers the [`LocalAudioStateChanged`]{@link RtcEngineEvents.LocalAudioStateChanged} callback once the local audio function is disabled or re-enabled.
   *
   * **Note**
   *
   * This method is different from the [`muteLocalAudioStream`]{@link muteLocalAudioStream} method:
   *
   *  - [`enableLocalAudio`]{@link enableLocalAudio}: Disables/Re-enables the local audio capture and processing.
   * If you disable or re-enable local audio recording using [`enableLocalAudio`]{@link enableLocalAudio}, the local user may hear a pause in the remote audio playback.
   *
   *  - [`muteLocalAudioStream`]{@link muteLocalAudioStream}: Stops/Continues sending the local audio streams.
   *
   * @param enabled Sets whether to disable/re-enable the local audio function:
   * - `true`: (Default) Re-enable the local audio function, that is, to start local audio capture and processing.
   * - `false`: Disable the local audio function, that is, to stop local audio capture and processing.
   */
  enableLocalAudio(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableLocalAudio', { enabled });
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
    return RtcEngine._callMethod('muteAllRemoteAudioStreams', { muted });
  }

  /**
   * Stops or resumes publishing the local audio stream.
   *
   * As of v3.4.5, this method only sets the publishing state of the audio stream in the channel of `RtcEngine`.
   *
   * A successful method call triggers the [`UserMuteAudio`]{@link RtcEngineEvents.UserMuteAudio} callback on the remote client.
   *
   * You can only publish the local stream in one channel at a time. If you create multiple channels,
   * ensure that you only call `muteLocalAudioStream(false)` in one channel; otherwise, the method call fails,
   * and the SDK returns `-5 (ERR_REFUSED)`.
   *
   * **Note**
   * - This method does not change the usage state of the audio-capturing device.
   * - Whether this method call takes effect is affected by the [`joinChannel`]{@link joinChannel} and [`setClientRole`]{@link setClientRole} methods. For details, see Set the Publishing State.
   *
   *
   * @param muted Sets whether to stop publishing the local audio stream.
   *  - `true`: Stop publishing the local audio stream.
   *  - `false`: Resume publishing the local audio stream.
   *
   * @return
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *   - `-5 (ERR_REFUSED)`: The request is rejected.
   */
  muteLocalAudioStream(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteLocalAudioStream', { muted });
  }

  /**
   * Stops or resumes subscribing to the audio stream of a specified user.
   *
   * **Note**
   * - Call this method after joining a channel.
   * - See recommended settings in *Set the Subscribing State*.
   *
   * @param uid The user ID of the specified remote user.
   * @param muted Sets whether to stop subscribing to the audio stream of a specified user.
   *  - `true`: Stop subscribing to the audio stream of a specified user.
   *  - `false`: (Default) Resume subscribing to the audio stream of a specified user.
   */
  muteRemoteAudioStream(uid: number, muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteRemoteAudioStream', { uid, muted });
  }

  /**
   * Sets the audio parameters and application scenarios.
   *
   * **Note**
   *
   * - You must call this method before calling [`joinChannel`]{@link joinChannel}.
   * - In the [`Communication`]{@link ChannelProfile.Communication} and [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profiles, the bitrates may be different from your settings due to network self-adaptation.
   * - In scenarios requiring high-quality audio, we recommend setting profile as `MusicHighQuality(4)` and scenario as `GameStreaming(3)`. For example, for music education scenarios.
   *
   * @param profile Sets the sample rate, bitrate, encoding mode, and the number of channels. See [`AudioProfile`]{@link AudioProfile}.
   * @param scenario Sets the audio application scenarios. See [`AudioScenario`]{@link AudioScenario}. Under different audio scenarios, the device uses different volume tracks, i.e. either the in-call volume or the media volume.
   * For details, see [What is the difference between the in-call volume and the media volume?](https://docs.agora.io/en/Voice/faq/system_volume).
   */
  setAudioProfile(
    profile: AudioProfile,
    scenario: AudioScenario
  ): Promise<void> {
    return RtcEngine._callMethod('setAudioProfile', { profile, scenario });
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
   * @note
   * If you need to resume subscribing to the audio streams of remote users in the channel after calling `setDefaultMuteAllRemoteAudioStreams(true)`, do the following:
   *   - If you need to resume subscribing to the audio stream of a specified user, call [`muteRemoteAudioStream(false)`]{@link muteRemoteAudioStream}, and specify the user ID.
   *   - If you need to resume subscribing to the audio streams of multiple remote users, call [`muteRemoteAudioStream(false)`]{@link muteRemoteAudioStream} multiple times.
   *
   * @param muted Sets whether to stop subscribing to the audio streams of all remote users by default.
   *   - `true`: Stop subscribing to the audio streams of all remote users by default.
   *   - `false`: (Default) Resume subscribing to the audio streams of all remote users by default.
   *
   */
  setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('setDefaultMuteAllRemoteAudioStreams', {
      muted,
    });
  }

  /**
   * Disables the video module.
   *
   * You can call this method before joining a channel or during a call:
   *
   * - If you call this method before joining a channel, the service starts in audio mode.
   * - If you call this method during a video call, the video mode switches to the audio mode.
   *
   * A successful call of this method triggers the [`UserEnableVideo(false)`]{@link RtcEngineEvents.UserEnableVideo} callback on the remote client.
   *
   * To enable the video mode, call  [`enableVideo`]{@link enableVideo}.
   *
   * **Note**
   *
   * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
   * You can call this method either before or after joining a channel.
   *
   * - This method resets the internal engine and takes some time to take effect.
   * We recommend using the following API methods to control the video engine modules separately:
   *
   *  - [`enableLocalVideo`]{@link enableLocalVideo}: Whether to enable the camera to create the local video stream.
   *
   *  - [`muteLocalVideoStream`]{@link muteLocalVideoStream}: Whether to publish the local video stream.
   *
   *  - [`muteRemoteVideoStream`]{@link muteRemoteVideoStream}: Whether to subscribe to and play the remote video stream.
   *
   *  - [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams}: Whether to subscribe to and play all remote video streams.
   */
  disableVideo(): Promise<void> {
    return RtcEngine._callMethod('disableVideo');
  }

  /**
   * Disables/Re-enables the local video capture.
   *
   * This method disables or re-enables the local video capturer, and does not affect receiving the remote video stream.
   *
   * After you call [`enableVideo`]{@link enableVideo}, the local video capturer is enabled by default.
   * You can call `enableLocalVideo(false)` to disable the local video capturer. If you want to re-enable it,
   * call `enableLocalVideo(true)`.
   *
   * After the local video capturer is successfully disabled or re-enabled, the SDK triggers the [`UserEnableLocalVideo`]{@link RtcEngineEvents.UserEnableLocalVideo} callback on the remote client.
   *
   * **Note**
   *
   * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
   * @param enabled Sets whether to disable/re-enable the local video, including the capturer, renderer, and sender:
   * - `true`: (Default) Re-enable the local video.
   * - `false`: Disable the local video. Once the local video is disabled, the remote users can no longer receive the video stream of this user, while this user can still receive the video streams of other remote users.
   * When you set `enabled` as `false`, this method does not require a local camera.
   */
  enableLocalVideo(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableLocalVideo', { enabled });
  }

  /**
   * Enables the video module.
   *
   * You can call this method either before joining a channel or during a call:
   *
   * - If you call this method before joining a channel,
   * the service starts in the video mode.
   * - If you call this method during an audio call, the audio mode switches to the video mode.
   *
   * A successful call of this method triggers the [`UserEnableVideo(true)`]{@link RtcEngineEvents.UserEnableVideo} callback on the remote client.
   *
   * To disable the video, call the [`disableVideo`]{@link disableVideo} method.
   *
   * **Note**
   *
   * - This method affects the internal engine and can be called after calling the [`leaveChannel`]{@link leaveChannel} method. You can call this method either before or after joining a channel.
   *
   * - This method resets the internal engine and takes some time to take effect.
   * We recommend using the following API methods to control the video engine modules separately:
   *
   *  - [`enableLocalVideo`]{@link enableLocalVideo}: Whether to enable the camera to create the local video stream.
   *
   *  - [`muteLocalVideoStream`]{@link muteLocalVideoStream}: Whether to publish the local video stream.
   *
   *  - [`muteRemoteVideoStream`]{@link muteRemoteVideoStream}: Whether to subscribe to and play the remote video stream.
   *
   *  - [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams}: Whether to subscribe to and play all remote video streams.
   */
  enableVideo(): Promise<void> {
    return RtcEngine._callMethod('enableVideo');
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
    return RtcEngine._callMethod('muteAllRemoteVideoStreams', { muted });
  }

  /**
   * Stops or resumes publishing the local video stream.
   *
   * As of v3.4.5, this method only sets the publishing state of the video stream in the channel of `RtcEngine`.
   *
   * A successful method call triggers the [`UserMuteVideo`]{@link RtcEngineEvents.UserMuteVideo} callback on the remote client.
   *
   * You can only publish the local stream in one channel at a time. If you create multiple channels,
   * ensure that you only call `muteLocalVideoStream(false)` in one channel; otherwise,
   * the method call fails, and the SDK returns `-5 (ERR_REFUSED)`.
   *
   *
   * **Note**
   * - This method does not change the usage state of the video-capturing device.
   * - Whether this method call takes effect is affected by the [`joinChannel`]{@link joinChannel} and [`setClientRole`]{@link setClientRole} methods. For details, see Set the Publishing State.
   *
   * @param muted Sets whether to stop publishing the local video stream.
   *  - `true`: Stop publishing the local video stream.
   *  - `false`: Resume publishing the local video stream.
   *
   * @return
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *   - `-5 (ERR_REFUSED)`: The request is rejected.
   */
  muteLocalVideoStream(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteLocalVideoStream', { muted });
  }

  /**
   * Stops or resumes subscribing to the video stream of a specified user.
   *
   * **Note**
   * - Call this method after joining a channel.
   * - See recommended settings in *Set the Subscribing State*.
   *
   * @param uid The user ID of the specified remote user.
   * @param muted Sets whether to stop subscribing to the video stream of a specified user.
   *  - `true`: Stop subscribing to the video stream of a specified user.
   *  - `false`: (Default) Resume subscribing to the video stream of a specified user.
   */
  muteRemoteVideoStream(uid: number, muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteRemoteVideoStream', { uid, muted });
  }

  /**
   * Enables/Disables image enhancement and sets the options.
   *
   * **Note**
   *
   * - Call this method after calling [`enableVideo`]{@link enableVideo}.
   * - On Android，this method applies to Android 4.4 or later.
   *
   * @param enabled Sets whether to enable image enhancement:
   * - `true`: Enable image enhancement.
   * - `false`: Disable image enhancement.
   * @param options The image enhancement options.
   *
   * @returns
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *    - 4(NotSupported): The system version is earlier than Android 4.4, which does not support this function.
   *
   */
  setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions
  ): Promise<void> {
    return RtcEngine._callMethod('setBeautyEffectOptions', {
      enabled,
      options,
    });
  }

  /**
   * @ignore
   *
   * Enables/Disables the super-resolution algorithm for a remote user's video stream.
   *
   * @since v3.3.1 (later)
   *
   * The algorithm effectively improves the resolution of the specified remote user's video stream. When the original resolution of the remote video stream is a × b pixels, you can receive and render the stream at a higher resolution (2a × 2b pixels) by enabling the algorithm.
   *
   * After calling this method, the SDK triggers the [`UserSuperResolutionEnabled`]{@link RtcEngineEvents.UserSuperResolutionEnabled} callback to report whether you have successfully enabled the super-resolution algorithm.
   *
   * @warning
   * The super-resolution algorithm requires extra system resources. To balance the visual experience and system usage, the SDK poses the following restrictions:
   * - The algorithm can only be used for a single user at a time.
   * - On the Android platform, the original resolution of the remote video must not exceed 640 × 360 pixels.
   * - On the iOS platform, the original resolution of the remote video must not exceed 640 × 480 pixels.
   *
   * If you exceed these limitations, the SDK triggers the `Warning` callback with the corresponding warning codes:
   * - `SuperResolutionStreamOverLimitation(1610)`: The origin resolution of the remote video is beyond the range where the super-resolution algorithm can be applied.
   * - `SuperResolutionUserCountOverLimitation(1611)`: Another user is already using the super-resolution algorithm.
   * - `SuperResolutionDeviceNotSupported(1612)`: The device does not support the super-resolution algorithm.
   *
   * @note
   * Requirements for the user's device:
   * - Android: The following devices are known to support the method:
   *   - VIVO: V1821A, NEX S, 1914A, 1916A, and 1824BA
   *   - OPPO: PCCM00
   *   - OnePlus: A6000
   *   - Xiaomi: Mi 8, Mi 9, MIX3, and Redmi K20 Pro
   *   - SAMSUNG: SM-G9600, SM-G9650, SM-N9600, SM-G9708, SM-G960U, and SM-G9750
   *   - HUAWEI: SEA-AL00, ELE-AL00, VOG-AL00, YAL-AL10, HMA-AL00, and EVR-AN00
   * - iOS: This method is supported on devices running iOS 12.0 or later. The following device models are known to support the method:
   *   - iPhone XR
   *   - iPhone XS
   *   - iPhone XS Max
   *   - iPhone 11
   *   - iPhone 11 Pro
   *   - iPhone 11 Pro Max
   *   - iPad Pro 11-inch (3rd Generation)
   *   - iPad Pro 12.9-inch (3rd Generation)
   *   - iPad Air 3 (3rd Generation)
   * @param uid The ID of the remote user.
   * @param enable Whether to enable the super-resolution algorithm:
   *   - `true`: Enable the super-resolution algorithm.
   *   - `false`: Disable the super-resolution algorithm.
   *
   */
  enableRemoteSuperResolution(uid: number, enable: boolean): Promise<void> {
    return RtcEngine._callMethod('enableRemoteSuperResolution', {
      uid,
      enable,
    });
  }

  /**
   * Sets whether to receive all remote video streams by default.
   *
   * @deprecated
   *
   * This method is deprecated from v3.3.1.
   *
   * Stops or resumes subscribing to the video streams of all remote users by default.
   *
   * Call this method after joining a channel. After successfully calling this method, the local user stops or resumes subscribing to the video streams of all subsequent users.
   *
   * @note
   * If you need to resume subscribing to the video streams of remote users in the channel after calling `setDefaultMuteAllRemoteVideoStreams(true)`, do the following:
   *   - If you need to resume subscribing to the video stream of a specified user, call [`muteRemoteVideoStream(false)`]{@link muteRemoteVideoStream}, and specify the user ID.
   *   - If you need to resume subscribing to the video streams of multiple remote users, call [`muteRemoteVideoStream(false)`]{@link muteRemoteVideoStream} multiple times.
   *
   * @param muted Sets whether to stop subscribing to the video streams of all remote users by default.
   *  - `true`: Stop subscribing to the video streams of all remote users by default.
   *  - `false`: (Default) Resume subscribing to the video streams of all remote users by default.
   *
   */
  setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('setDefaultMuteAllRemoteVideoStreams', {
      muted,
    });
  }

  /**
   * Sets the video encoder configuration.
   *
   * Each video encoder configuration corresponds to a set of video parameters, including the resolution, frame rate, bitrate, and video orientation.
   * The parameters specified in this method are the maximum values under ideal network conditions.
   * If the video engine cannot render the video using the specified parameters due to poor network conditions, the parameters further down the list are considered until a successful configuration is found.
   * If you do not set the video encoder configuration after joining the channel, you can call this method before calling [`enableVideo`]{@link enableVideo} to reduce the render time of the first video frame.
   *
   * @param config The local video encoder configuration.
   */
  setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): Promise<void> {
    return RtcEngine._callMethod('setVideoEncoderConfiguration', { config });
  }

  /**
   * Starts the local video preview before joining a channel.
   *
   * Before calling this method, you must call the [`enableVideo`]{@link enableVideo} method to enable the video.
   *
   * **Note**
   *
   * - By default, the local preview enables the mirror mode.
   * - Once you call this method to start the local video preview, if you leave the channel by calling [`leaveChannel`]{@link leaveChannel},
   * the local video preview remains until you call [`stopPreview`]{@link stopPreview} to disable it.
   */
  startPreview(): Promise<void> {
    return RtcEngine._callMethod('startPreview');
  }

  /**
   * Stops the local video preview and the video.
   *
   * **Note**
   *
   * Call this method after you start the local video preview and before you join the channel.
   */
  stopPreview(): Promise<void> {
    return RtcEngine._callMethod('stopPreview');
  }

  /**
   * Adjusts the volume of audio mixing for local playback.
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * @param volume Audio mixing volume for local playback. The value ranges between 0 and 100 (default).
   */
  adjustAudioMixingPlayoutVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustAudioMixingPlayoutVolume', { volume });
  }

  /**
   * Adjusts the volume of audio mixing for publishing (sending to other users).
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * @param volume Audio mixing volume for publishing. The value ranges between 0 and 100 (default).
   */
  adjustAudioMixingPublishVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustAudioMixingPublishVolume', { volume });
  }

  /**
   * Adjusts the volume of audio mixing.
   *
   * **Note**
   *
   * - Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * - Calling this method does not affect the volume of the audio effect file playback invoked by the [`playEffect`]{@link playEffect} method.
   *
   * @param volume Audio mixing volume. The value ranges between 0 and 100 (default).
   */
  adjustAudioMixingVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustAudioMixingVolume', { volume });
  }

  /**
   * Gets the playback position (ms) of the music file.
   *
   * **Note**
   * - Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   * - If you need to call `getAudioMixingCurrentPosition` multiple times, ensure that the call interval is longer than 500 ms.
   * @returns
   * - The current playback position of the audio mixing, if the method call is successful.
   * - An error code if the method call fails.
   */
  getAudioMixingCurrentPosition(): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingCurrentPosition');
  }

  /**
   * Gets the duration (ms) of the music file.
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * @param filePath @since v3.4.2 The file path, including the filename extensions.
   * - On Android: Agora supports using a URI address, an absolute path, or a path that starts with /assets/.
   * Note: You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead.
   * For example: "content://com.android.providers.media.documents/document/audio%3A14441".
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Media Formats Supported by Android](https://developer.android.com/guide/topics/media/media-formats).
   * - On iOS: Agora supports using an absolute path. For example: "/var/mobile/Containers/Data/audio.mp4".
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   *  @returns
   * - The audio mixing duration, if the method call is successful.
   * - An error code if the method call fails.
   */
  getAudioMixingDuration(filePath?: string): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingDuration', { filePath });
  }

  /**
   * Gets the audio mixing volume for local playback.
   *
   * This method helps troubleshoot audio volume related issues.
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   *
   * @returns
   * - The audio mixing volume for local playback, if the method call is successful. The value range is [0,100].
   * - An error code if the method call fails.
   */
  getAudioMixingPlayoutVolume(): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingPlayoutVolume');
  }

  /**
   * Gets the audio mixing volume for publishing.
   *
   * This method helps troubleshoot audio volume related issues.
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * @returns
   * - The audio mixing volume for publishing, if the method call is successful. The value range is [0,100].
   * - An error code if the method call fails.
   */
  getAudioMixingPublishVolume(): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingPublishVolume');
  }

  /**
   * Pauses playing and mixing the music file.
   *
   * Call this method when you are in a channel.
   */
  pauseAudioMixing(): Promise<void> {
    return RtcEngine._callMethod('pauseAudioMixing');
  }

  /**
   * Resumes playing and mixing the music file.
   *
   * Call this method when you are in a channel.
   */
  resumeAudioMixing(): Promise<void> {
    return RtcEngine._callMethod('resumeAudioMixing');
  }

  /**
   * Sets the pitch of the local music file.
   *
   * When a local music file is mixed with a local human voice, call this method to
   * set the pitch of the local music file only.
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * @param pitch Sets the pitch of the local music file by chromatic scale.
   * The default value is 0, which means keep the original pitch.
   * The value ranges from -12 to 12, and the pitch value between consecutive values is a chromatic value.
   * The greater the absolute value of this parameter, the higher or lower the pitch of the local music file.
   */
  setAudioMixingPitch(pitch: number): Promise<void> {
    return RtcEngine._callMethod('setAudioMixingPitch', { pitch });
  }

  /**
   * Sets the playback position (ms) of the music file to a different starting position (the default plays from the beginning).
   *
   * **Note**
   *
   * Call this method after calling `startAudioMixing` and receiving the `AudioMixingStateChanged(Playing)` callback.
   *
   * @param pos The playback starting position (ms) of the audio mixing file.
   */
  setAudioMixingPosition(pos: number): Promise<void> {
    return RtcEngine._callMethod('setAudioMixingPosition', { pos });
  }

  /**
   * Starts playing and mixing the music file.
   *
   * This method mixes the specified local or online audio file with the audio stream from the microphone,
   * or replaces the microphone’s audio stream with the specified local or remote audio file.
   * You can choose whether the other user can hear the local audio playback and specify the number of playback loops.
   * When the audio mixing file playback finishes after calling this method, the SDK triggers the [`AudioMixingFinished`]{@link RtcEngineEvents.AudioMixingFinished} callback.
   *
   * A successful call of this method triggers the [`AudioMixingStateChanged`]{@link RtcEngineEvents.AudioMixingStateChanged} callback and reports [`Playing`]{@link AudioMixingStateCode.Playing} on the local client.
   *
   * When the audio mixing file playback finishes, the SDK triggers the [`AudioMixingStateChanged`]{@link RtcEngineEvents.AudioMixingStateChanged} callback and reports [`Stopped`]{@link AudioMixingStateCode.Stopped} on the local client.
   *
   * **Note**
   *
   * - To use this method on Android, ensure that the Android device is v4.2 or later, and the API version is v16 or later.
   *
   * - If you want to play an online music file, ensure that the time interval between calling this method is more than 100 ms, or the [`TooFrequentCall(702)`]{@link AudioMixingReason.TooFrequentCall} error occurs.
   *
   * - If you want to play an online music file, Agora does not recommend using the redirected URL address. Some Android devices may fail to open a redirected URL address.
   *
   * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns [`CanNotOpen(701)`]{@link AudioMixingReason.CanNotOpen}.
   *
   * - If you call this method on an emulator, only the MP3 file format is supported.
   *
   * @param filePath The file path, including the filename extensions.
   * - On Android: To access an online file, Agora supports using a URL address; to access a local file, Agora supports using a URI address, an absolute path, or a path that starts with /assets/.
   * Note: You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead. For example: "content://com.android.providers.media.documents/document/audio%3A14441".
   * Supported audio formats: mp3, mp4, m4a, aac, 3gp, mkv and wav. See [Supported Media Formats](https://developer.android.com/guide/topics/media/media-formats) for details.
   * - On iOS: To access an online file, Agora supports using a URL address; to access a local file, Agora supports using an absolute path. For example: /var/mobile/Containers/Data/audio.mp4.
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   * @param loopback Sets which user can hear the audio mixing:
   * - `true`: Only the local user can hear the audio mixing.
   * - `false`: Both users can hear the audio mixing.
   * @param replace Sets the audio mixing content:
   * - `true`: Only publish the specified audio file; the audio stream from the microphone is not published.
   * - `false`: The local audio file is mixed with the audio stream from the microphone.
   * @param cycle Sets the number of playback loops:
   * - Positive integer: Number of playback loops.
   * - -1: Infinite playback loops.
   * @param startPos @since v3.4.2 The playback position (ms) of the music file.
   */
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number,
    startPos?: number
  ): Promise<void> {
    return RtcEngine._callMethod('startAudioMixing', {
      filePath,
      loopback,
      replace,
      cycle,
      startPos,
    });
  }

  /**
   * Stops playing or mixing the music file.
   *
   * Call this method when you are in a channel.
   */
  stopAudioMixing(): Promise<void> {
    return RtcEngine._callMethod('stopAudioMixing');
  }

  /**
   * Gets the volume of the audio effects.
   *
   * The value ranges between 0.0 and 100.0.
   *
   * @returns
   * - Returns the volume, if the method call is successful.
   * - Error codes: Failure.
   */
  getEffectsVolume(): Promise<number> {
    return RtcEngine._callMethod('getEffectsVolume');
  }

  /**
   * Pauses all audio effects.
   */
  pauseAllEffects(): Promise<void> {
    return RtcEngine._callMethod('pauseAllEffects');
  }

  /**
   * Pauses a specified audio effect.
   * @param soundId ID of the audio effect. Each audio effect has a unique ID.
   */
  pauseEffect(soundId: number): Promise<void> {
    return RtcEngine._callMethod('pauseEffect', { soundId });
  }

  /**
   * Plays a specified local or online audio effect file.
   *
   * With this method, you can set the loop count, pitch, pan, and gain of the audio effect file and whether the remote user can hear the audio effect.
   * To play multiple audio effect files simultaneously, call this method multiple times with different `soundId` and `filePath`.
   * We recommend playing no more than three audio effect files at the same time.
   * When the audio effect file playback is finished, the SDK triggers the [`AudioEffectFinished`]{@link RtcEngineEvents.AudioEffectFinished} callback.
   *
   * @param soundId ID of the specified audio effect. Each audio effect has a unique ID. If you preloaded the audio effect into the memory
   * through the [`preloadEffect`]{@link preloadEffect} method, ensure that the `soundID` value is set to the same value as in the [`preloadEffect`]{@link preloadEffect} method.
   *
   * @param filePath The file path, including the filename extensions.
   * - On Android: To access an online file, Agora supports using a URL address; to access a local file, Agora supports using a URI address, an absolute path, or a path that starts with /assets/.
   * Note: You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead. For example: "content://com.android.providers.media.documents/document/audio%3A14441".
   * Supported audio formats: mp3, mp4, m4a, aac, 3gp, mkv and wav. See [Supported Media Formats](https://developer.android.com/guide/topics/media/media-formats) for details.
   * - On iOS: To access an online file, Agora supports using a URL address; to access a local file, Agora supports using an absolute path. For example: /var/mobile/Containers/Data/audio.mp4.
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   *
   * @param loopCount The number of times the audio effect loops:
   * - &ge; 0: The number of loops. For example, `1` means loop one time, which means play the audio effect two times in total.
   * - -1: Play the audio effect in an indefinite loop.
   * @param pitch Sets the pitch of the audio effect. The value ranges between 0.5 and 2.
   * The default value is 1 (no change to the pitch). The lower the value, the lower the pitch.
   * @param pan Sets the spatial position of the audio effect. The value ranges between -1.0 and 1.0.
   * - 0.0: The audio effect shows ahead.
   * - 1.0: The audio effect shows on the right.
   * - -1.0: The audio effect shows on the left.
   * @param gain Sets the volume of the audio effect. The value ranges between 0.0 and 100,0.
   * The default value is 100.0. The lower the value, the lower the volume of the audio effect.
   * @param publish Set whether to publish the specified audio effect to the remote stream:
   * - `true`: The locally played audio effect is published to the Agora Cloud and the remote users can hear it.
   * - `false`: The locally played audio effect is not published to the Agora Cloud and the remote users cannot hear it.
   * @param startPos @since v3.4.2 The playback position (ms) of the audio effect file.
   */
  playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: Boolean,
    startPos?: number
  ): Promise<void> {
    return RtcEngine._callMethod('playEffect', {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
      startPos,
    });
  }

  /**
   * Sets the playback position of an audio effect file.
   *
   * @since v3.4.2
   *
   * After a successful setting, the local audio effect file starts playing at the specified position.
   *
   * @note Call this method after `playEffect`.
   *
   * @param soundId Audio effect ID. Ensure that this parameter is set to the same value as in `playEffect`.
   * @param pos The playback position (ms) of the audio effect file.
   */
  setEffectPosition(soundId: number, pos: number): Promise<void> {
    return RtcEngine._callMethod('setEffectPosition', {
      soundId,
      pos,
    });
  }

  /**
   * Gets the duration of the audio effect file.
   *
   * @since v3.4.2
   *
   * @note Call this method after joining a channel.
   *
   * @param filePath The file path, including the filename extensions.
   * - On Android: Agora supports using a URI address, an absolute path, or a path that starts with /assets/.
   * Note: You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead.
   * For example: "content://com.android.providers.media.documents/document/audio%3A14441".
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Media Formats Supported by Android](https://developer.android.com/guide/topics/media/media-formats).
   * - On iOS: Agora supports using an absolute path. For example: "/var/mobile/Containers/Data/audio.mp4".
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   *
   * @return
   * - The total duration (ms) of the specified audio effect file, if the method call succeeds.
   * - An error code if the method call fails.
   */
  getEffectDuration(filePath: string): Promise<number> {
    return RtcEngine._callMethod('getEffectDuration', { filePath });
  }

  /**
   * Gets the playback position of the audio effect file.
   *
   * @since v3.4.2
   *
   * @note Call this method after `playEffect`.
   *
   * @param soundId Audio effect ID. Ensure that this parameter is set to the same value as in `playEffect`.
   *
   * @return
   * - The playback position (ms) of the specified audio effect file, if the method call succeeds.
   * - An error code if the method call fails.
   *
   */
  getEffectCurrentPosition(soundId: number): Promise<number> {
    return RtcEngine._callMethod('getEffectCurrentPosition', {
      soundId,
    });
  }

  /**
   * Preloads a specified audio effect file into the memory.
   *
   * **Note**
   * - This method does not support online audio effect files.
   * - To ensure smooth communication, limit the size of the audio effect file.
   * We recommend using this method to preload the audio effect before calling [`joinChannel`]{@link joinChannel}.
   *
   * @param soundId ID of the audio effect. Each audio effect has a unique ID.
   * @param filePath The file path, including the filename extensions.
   * - On Android: Agora supports using a URI address, an absolute path, or a path that starts with /assets/.
   * Note: You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead.
   * For example: "content://com.android.providers.media.documents/document/audio%3A14441".
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Media Formats Supported by Android](https://developer.android.com/guide/topics/media/media-formats).
   * - On iOS: Agora supports using an absolute path. For example: "/var/mobile/Containers/Data/audio.mp4".
   * Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   *
   */
  preloadEffect(soundId: number, filePath: string): Promise<void> {
    return RtcEngine._callMethod('preloadEffect', { soundId, filePath });
  }

  /**
   * Resumes playing all audio effects.
   */
  resumeAllEffects(): Promise<void> {
    return RtcEngine._callMethod('resumeAllEffects');
  }

  /**
   * Resumes playing a specified audio effect.
   * @param soundId ID of the audio effect. Each audio effect has a unique ID.
   */
  resumeEffect(soundId: number): Promise<void> {
    return RtcEngine._callMethod('resumeEffect', { soundId });
  }

  /**
   * Sets the volume of the audio effects.
   * @param volume Volume of the audio effects. The value ranges between 0.0 and 100.0 (default).
   */
  setEffectsVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('setEffectsVolume', { volume });
  }

  /**
   * Sets the volume of a specified audio effect.
   * @param soundId ID of the audio effect. Each audio effect has a unique ID.
   * @param volume Volume of the audio effect. The value ranges between 0.0 and 100.0 (default).
   */
  setVolumeOfEffect(soundId: number, volume: number): Promise<void> {
    return RtcEngine._callMethod('setVolumeOfEffect', { soundId, volume });
  }

  /**
   * Stops playing all audio effects.
   */
  stopAllEffects(): Promise<void> {
    return RtcEngine._callMethod('stopAllEffects');
  }

  /**
   * Stops playing a specified audio effect.
   *
   * **Note**
   *
   * If you preloaded the audio effect into the memory through the [`preloadEffect`]{@link preloadEffect} method,
   * ensure that the `soundID` value is set to the same value as in the [`preloadEffect`]{@link preloadEffect} method.
   *
   * @param soundId ID of the specified audio effect. Each audio effect has a unique ID.
   */
  stopEffect(soundId: number): Promise<void> {
    return RtcEngine._callMethod('stopEffect', { soundId });
  }

  /**
   * Releases a specified preloaded audio effect from the memory.
   * @param soundId ID of the audio effect. Each audio effect has a unique ID.
   */
  unloadEffect(soundId: number): Promise<void> {
    return RtcEngine._callMethod('unloadEffect', { soundId });
  }

  /**
   * Sets the local voice changer option.
   *
   * @deprecated Deprecated as of v3.2.0. Use the following methods instead:
   * - setAudioEffectPreset: Audio effects.
   * - setVoiceBeautifierPreset: Voice beautifier effects.
   * - setVoiceConversionPreset: Voice conversion effects.
   *
   * **Note**
   *
   * Do not use this method together with [`setLocalVoiceReverbPreset`]{@link setLocalVoiceReverbPreset}, or the method called earlier does not take effect.
   *
   * @param voiceChanger The local voice changer option.
   */
  setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void> {
    return RtcEngine._callMethod('setLocalVoiceChanger', { voiceChanger });
  }

  /**
   * Sets the local voice equalization effect.
   *
   * @param bandFrequency Sets the band frequency. The value ranges between 0 and 9; representing the respective 10-band center frequencies of the voice effects, including 31, 62, 125, 500, 1k, 2k, 4k, 8k, and 16k Hz.
   *
   * @param bandGain Sets the gain of each band (dB). The value ranges between -15 and 15. The default value is 0.
   */
  setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): Promise<void> {
    return RtcEngine._callMethod('setLocalVoiceEqualization', {
      bandFrequency,
      bandGain,
    });
  }

  /**
   * Changes the voice pitch of the local speaker.
   * @param pitch Sets the voice pitch. The value ranges between 0.5 and 2.0.
   * The lower the value, the lower the voice pitch. The default value is 1.0 (no change to the local voice pitch).
   */
  setLocalVoicePitch(pitch: number): Promise<void> {
    return RtcEngine._callMethod('setLocalVoicePitch', { pitch });
  }

  /**
   * Sets the local voice reverberation.
   *
   * **Note**
   *
   * As of v3.2.1, the SDK provides a more convenient method [`setAudioEffectPreset`]{@link setAudioEffectPreset}, which directly implements the popular music, R&B music, KTV and other preset reverb effects.
   *
   * @param reverbKey The reverberation key: [`AudioReverbType`]{@link AudioReverbType}
   *
   * @param value The local voice reverberation value.
   */
  setLocalVoiceReverb(
    reverbKey: AudioReverbType,
    value: number
  ): Promise<void> {
    return RtcEngine._callMethod('setLocalVoiceReverb', { reverbKey, value });
  }

  /**
   * Sets the preset local voice reverberation effect.
   *
   * @deprecated Deprecated as of v3.2.0. Use `setAudioEffectPreset` or `setVoiceBeautifierPreset` instead.
   *
   * **Note**
   *
   * - Do not use this method together with [`setLocalVoiceReverb`]{@link setLocalVoiceReverb}.
   *
   * - Do not use this method together with [`setLocalVoiceChanger`]{@link setLocalVoiceChanger}, or the method called earlier does not take effect.
   *
   * @param preset The local voice reverberation preset.
   */
  setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void> {
    return RtcEngine._callMethod('setLocalVoiceReverbPreset', { preset });
  }

  /**
   * Enables/Disables stereo panning for remote users.
   *
   * Ensure that you call this method before calling [`joinChannel`]{@link joinChannel} to enable stereo panning for remote users so that
   * the local user can track the position of a remote user by calling [`setRemoteVoicePosition`]{@link setRemoteVoicePosition}.
   *
   * @param enabled Sets whether to enable stereo panning for remote users:
   * - `true`: Enable stereo panning.
   * - `false`: Disable stereo panning.
   */
  enableSoundPositionIndication(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableSoundPositionIndication', { enabled });
  }

  /**
   * Sets the sound position of a remote user.
   *
   * When the local user calls this method to set the sound position of a remote user,
   * the sound difference between the left and right channels allows the local user to track the real-time
   * position of the remote user, creating a real sense of space.
   * This method applies to massively multiplayer online games, such as Battle Royale games.
   *
   * **Note**
   *
   * - For this method to work, enable stereo panning for remote users by calling the [`enableSoundPositionIndication`]{@link enableSoundPositionIndication} method before joining a channel.
   *
   * - This method requires hardware support. For the best sound positioning, we recommend using a wired headset.
   *
   * @param uid The ID of the remote user.
   * @param pan The sound position of the remote user.
   * The value ranges from -1.0 to 1.0:
   * - 0.0: The remote sound comes from the front.
   * - -1.0: The remote sound comes from the left.
   * - 1.0: The remote sound comes from the right.
   * @param gain Gain of the remote user. The value ranges from 0.0 to 100.0.
   * The default value is 100.0 (the original gain of the remote user). The smaller the value, the less the gain.
   */
  setRemoteVoicePosition(
    uid: number,
    pan: number,
    gain: number
  ): Promise<void> {
    return RtcEngine._callMethod('setRemoteVoicePosition', { uid, pan, gain });
  }

  /**
   * Publishes the local stream to a specified CDN streaming URL.
   *
   * After calling this method, you can push media streams in RTMP or RTMPS protocol to the CDN.
   *
   * This SDK triggers the [`RtmpStreamingStateChanged`]{@link RtcEngineEvents.RtmpStreamingStateChanged} callback on the local client to report the state of adding a local stream to the CDN.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - This method applies to [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only.
   * - Ensure that the user joins a channel before calling this method.
   * - This method adds only one CDN streaming URL each time it is called.
   * - Agora supports pushing media streams in RTMPS protocol to the CDN only when you enable transcoding.
   *
   * @param url The CDN streaming URL in the RTMP or RTMPS format. The maximum length of this parameter is 1024 bytes.
   * The URL address must not contain special characters, such as Chinese language characters.
   * @param transcodingEnabled Whether to enable transcoding.
   * If you set this parameter as `true`, ensure that you call [`setLiveTranscoding`]{@link setLiveTranscoding} before this method.
   *
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
    return RtcEngine._callMethod('addPublishStreamUrl', {
      url,
      transcodingEnabled,
    });
  }

  /**
   * Removes an RTMP or RTMPS stream from the CDN.
   *
   * This method removes the CDN streaming URL (added by [`addPublishStreamUrl`]{@link addPublishStreamUrl}) from a CDN live stream.
   * The SDK reports the result of this method call in the [`RtmpStreamingStateChanged`]{@link RtcEngineEvents.RtmpStreamingStateChanged} callback.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - Ensure that the user joins a channel before calling this method.
   * - This method applies to [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only.
   * - This method removes only one CDN streaming URL each time it is called.
   *
   * @param url The CDN streaming URL to be removed. The maximum length of this parameter is 1024 bytes.
   * The URL address must not contain special characters, such as Chinese language characters.
   */
  removePublishStreamUrl(url: string): Promise<void> {
    return RtcEngine._callMethod('removePublishStreamUrl', { url });
  }

  /**
   * Sets the video layout and audio settings for CDN live.
   *
   * The SDK triggers the [`TranscodingUpdated`]{@link RtcEngineEvents.TranscodingUpdated} callback when you call this method to update the [`LiveTranscoding`]{@link LiveTranscoding} class.
   * If you call this method to set the [`LiveTranscoding`]{@link LiveTranscoding} class for the first time,
   * the SDK does not trigger the [`TranscodingUpdated`]{@link RtcEngineEvents.TranscodingUpdated} callback.
   *
   * **Note**
   *
   * - This method applies to [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only.
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in Push Streams to CDN.
   * - Ensure that you call [`setClientRole`]{@link setClientRole} and set the user role as the host.
   * - Ensure that you call [`setLiveTranscoding`]{@link setLiveTranscoding} before calling  [`addPublishStreamUrl`]{@link addPublishStreamUrl}.
   * - Agora supports pushing media streams in RTMPS protocol to the CDN only when you enable transcoding.
   *
   * @param transcoding Sets the CDN live audio/video transcoding settings.
   */
  setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
    return RtcEngine._callMethod('setLiveTranscoding', { transcoding });
  }

  /**
   * Starts to relay media streams across channels.
   *
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} and [`ChannelMediaRelayEvent`]{@link RtcEngineEvents.ChannelMediaRelayEvent} callbacks, and these
   * callbacks return the state and events of the media stream relay.
   *
   * If the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback returns [`Running(2)`]{@link ChannelMediaRelayState.Running} and [`None(0)`]{@link ChannelMediaRelayError.None},
   * and the [`ChannelMediaRelayEvent`]{@link RtcEngineEvents.ChannelMediaRelayEvent} callback returns [`SentToDestinationChannel(4)`]{@link ChannelMediaRelayEvent.SentToDestinationChannel}, the SDK starts relaying media streams between the original and the destination channel.
   *
   * If the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback returns [`Failure(3)`]{@link ChannelMediaRelayState.Failure}, an exception occurs during the media stream relay.
   *
   * **Note**
   *
   * - Contact sales-us@agora.io before implementing this function.
   * - We do not support string user accounts in this API.
   * - Call this method after the [`joinChannel`]{@link joinChannel} method.
   * - This method takes effect only when you are a [`Broadcaster`]{@link ClientRole.Broadcaster}
   *  in a [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} channel.
   * - After a successful method call, if you want to call this method again, ensure that you call [`stopChannelMediaRelay`]{@link stopChannelMediaRelay} to quit the current relay.
   *
   * @param channelMediaRelayConfiguration The configuration of the media stream relay.
   */
  startChannelMediaRelay(
    channelMediaRelayConfiguration: ChannelMediaRelayConfiguration
  ): Promise<void> {
    return RtcEngine._callMethod('startChannelMediaRelay', {
      channelMediaRelayConfiguration,
    });
  }

  /**
   * Stops the media stream relay.
   *
   * Once the relay stops, the host quits all the destination channels.
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback.
   * If the callback returns [`Idle(0)`]{@link ChannelMediaRelayState.Idle} and [`None(0)`]{@link ChannelMediaRelayError.None}, the host successfully stops the relay.
   *
   * **Note**
   *
   * If the method call fails, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback with the [`ServerNoResponse(2)`]{@link ChannelMediaRelayError.ServerNoResponse}
   * or [`ServerConnectionLost(8)`]{@link ChannelMediaRelayError.ServerConnectionLost} error code.
   * You can leave the channel by calling [`leaveChannel`]{@link leaveChannel}, and the media stream relay automatically stops.
   */
  stopChannelMediaRelay(): Promise<void> {
    return RtcEngine._callMethod('stopChannelMediaRelay');
  }

  /**
   * Updates the channels for media relay.
   *
   * After the channel media relay starts, if you want to relay the media stream to more channels,
   * or leave the current relay channel, you can call [`updateChannelMediaRelay`]{@link updateChannelMediaRelay}.
   *
   * After a successful method call, the SDK triggers the [`ChannelMediaRelayEvent`]{@link RtcEngineEvents.ChannelMediaRelayEvent} callback with the [`UpdateDestinationChannel(7)`]{@link ChannelMediaRelayEvent.UpdateDestinationChannel} state code.
   *
   * **Note**
   *
   * - Call this method after the [`startChannelMediaRelay`]{@link startChannelMediaRelay} method to update the destination channel.
   *
   * - This method supports adding at most four destination channels in the relay. If there are already four destination channels in the relay.
   * @param channelMediaRelayConfiguration The media stream relay configuration
   */
  updateChannelMediaRelay(
    channelMediaRelayConfiguration: ChannelMediaRelayConfiguration
  ): Promise<void> {
    return RtcEngine._callMethod('updateChannelMediaRelay', {
      channelMediaRelayConfiguration,
    });
  }

  /**
   * Checks whether the speakerphone is enabled.
   *
   * **Note**
   *
   * You can call this method either before or after joining a channel.
   *
   * @returns
   * - `true`: The speakerphone is enabled, and the audio plays from the speakerphone.
   * - `false`: The speakerphone is not enabled, and the audio plays from devices other than the speakerphone. For example, the headset or earpiece.
   */
  isSpeakerphoneEnabled(): Promise<boolean> {
    return RtcEngine._callMethod('isSpeakerphoneEnabled');
  }

  /**
   * Sets the default audio route.
   *
   * If the default audio route of the SDK (see [Set the Audio Route](https://docs.agora.io/en/Video/set_audio_route_android?platform=Android) ) cannot meet your requirements,
   * you can call this method to switch the default audio route. After successfully switching the audio route,
   * the SDK triggers the [`AudioRouteChanged`]{@link AudioRouteChanged} callback to indicate the changes.
   *
   * **Note**
   *
   * - Call this method before calling `joinChannel`. If you need to switch the audio route after joining a channel, call [`setEnableSpeakerphone`]{@link setEnableSpeakerphone}.
   * - If the user uses an external audio playback device such as a Bluetooth or wired headset, this method does not take effect, and the SDK plays audio through the external device. When the user uses multiple external devices, the SDK plays audio through the last connected device.
   *
   * @param defaultToSpeaker Sets the default audio route as follows:
   * - `true`: Set to the speakerphone.
   * - `false`: Set to the earpiece.
   */
  setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void> {
    return RtcEngine._callMethod('setDefaultAudioRoutetoSpeakerphone', {
      defaultToSpeaker,
    });
  }

  /**
   * Enables/Disables the audio route to the speakerphone.
   *
   * If the default audio route of the SDK (see [Set the Audio Route](https://docs.agora.io/en/Video/set_audio_route_android?platform=Android) ) or
   * the setting in [`setDefaultAudioRoutetoSpeakerphone`]{@link setDefaultAudioRoutetoSpeakerphone} cannot meet your requirements,
   * you can call this method to switch the current audio route. After successfully switching the audio route, the SDK triggers the [`AudioRouteChanged`]{@link RtcEngineEvents.AudioRouteChanged} callback to indicate the changes.
   *
   * This method only sets the audio route in the current channel and does not influence the default audio route. If the user leaves the current channel and joins another channel, the default audio route is used.
   *
   * **Note**
   *
   * - Call this method after calling `joinChannel`.
   * - If the user uses an external audio playback device such as a Bluetooth or wired headset, this method does not take effect, and the SDK plays audio through the external device. When the user uses multiple external devices, the SDK plays audio through the last connected device.
   *
   * @param enabled Sets whether to enable the speakerphone or earpiece
   * - `true`: Enable the speakerphone. The audio route is the speakerphone.
   * - `false`: Disable the speakerphone. The audio route is the earpiece.
   */
  setEnableSpeakerphone(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('setEnableSpeakerphone', { enabled });
  }

  /**
   * Enables in-ear monitoring.
   * @param enabled Sets whether to enable/disable in-ear monitoring:
   * - `true`: Enable.
   * - `false`: (Default) Disable.
   */
  enableInEarMonitoring(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableInEarMonitoring', { enabled });
  }

  /**
   * Sets the volume of the in-ear monitor.
   * @param volume Sets the volume of the in-ear monitor. The value ranges between 0 and 100 (default).
   */
  setInEarMonitoringVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('setInEarMonitoringVolume', { volume });
  }

  /**
   * Enables/Disables the dual video stream mode.
   *
   * If dual-stream mode is enabled, the receiver can choose to receive the high stream (high-resolution high-bitrate video stream) or
   * low stream (low-resolution low-bitrate video stream) video.
   *
   * @param enabled Sets the stream mode:
   * - `true`: Dual-stream mode.
   * - `false`: (Default) Single-stream mode.
   */
  enableDualStreamMode(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableDualStreamMode', { enabled });
  }

  /**
   * Sets the default video-stream type of the remotely subscribed video stream
   * when the remote user sends dual streams.
   *
   * **Note**
   * You can call this method either before or after joining a channel. If you call both `setRemoteVideoStreamType` and `setRemoteDefaultVideoStreamType`, the SDK applies the settings in the `setRemoteVideoStreamType` method.
   *
   * @param streamType Sets the default video-stream type.
   */
  setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
    return RtcEngine._callMethod('setRemoteDefaultVideoStreamType', {
      streamType,
    });
  }

  /**
   * Sets the stream type of the remote video.
   *
   * Under limited network conditions, if the publisher has not disabled the
   * dual-stream mode using [`enableDualStreamMode(false)`]{@link RtcEngine.enableDualStreamMode}, the receiver can choose to receive
   * either the high-video stream (the high resolution, and high bitrate video stream) or the low-video stream (the low resolution, and low bitrate video stream).
   *
   * By default, users receive the high-video stream. Call this method if you want to switch to the low-video stream. This method allows the app to adjust the corresponding video stream type
   * based on the size of the video window to reduce the bandwidth and resources.
   *
   * The aspect ratio of the low-video stream is the same as the high-video stream. Once the resolution of the high-video stream is set,
   * the system automatically sets the resolution, frame rate, and bitrate of the low-video stream.
   *
   * The SDK reports the result of calling this method in the [`ApiCallExecuted`]{@link RtcEngineEvents.ApiCallExecuted} callback.
   *
   * **Note**
   *
   * You can call this method either before or after joining a channel. If you call both `setRemoteVideoStreamType` and `setRemoteDefaultVideoStreamType`, the SDK applies the settings in the `setRemoteVideoStreamType` method.
   *
   * @param uid ID of the remote user sending the video stream.
   * @param streamType Sets the video-stream type.
   */
  setRemoteVideoStreamType(
    uid: number,
    streamType: VideoStreamType
  ): Promise<void> {
    return RtcEngine._callMethod('setRemoteVideoStreamType', {
      uid,
      streamType,
    });
  }

  /**
   * Sets the fallback option for the locally published video stream based on the network conditions.
   *
   * If `option` is set as [`AudioOnly(2)`]{@link StreamFallbackOptions.AudioOnly}, the SDK will:
   *
   * - Disable the upstream video but enable audio only when the network conditions deteriorate and cannot support both video and audio.
   *
   * - Re-enable the video when the network conditions improve.
   *
   * When the locally published video stream falls back to audio only or when the audio-only stream
   * switches back to the video, the SDK triggers the [`LocalPublishFallbackToAudioOnly`]{@link RtcEngineEvents.LocalPublishFallbackToAudioOnly}.
   *
   * **Note**
   *
   * Agora does not recommend using this method for CDN live streaming, because the remote CDN live user will have a noticeable lag when the locally published video stream falls back to audio only.
   * @param option Sets the fallback option for the locally published video stream.
   */
  setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void> {
    return RtcEngine._callMethod('setLocalPublishFallbackOption', { option });
  }

  /**
   * Sets the fallback option for the remotely subscribed video stream based on the network conditions.
   *
   * If `option` is set as [`AudioOnly(2)`]{@link StreamFallbackOptions.AudioOnly}, the SDK automatically switches
   * the video from a high-stream to a low-stream, or disables the video when the downlink network condition cannot support
   * both audio and video to guarantee the quality of the audio.
   * The SDK monitors the network quality and restores the video stream when the network conditions improve.
   * When the remotely subscribed video stream falls back to audio only, or the audio-only stream switches back to the video,
   * the SDK triggers the [`RemoteSubscribeFallbackToAudioOnly`]{@link RtcEngineEvents.RemoteSubscribeFallbackToAudioOnly} callback.
   *
   * @param option Sets the fallback option for the remotely subscribed video stream.
   */
  setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): Promise<void> {
    return RtcEngine._callMethod('setRemoteSubscribeFallbackOption', {
      option,
    });
  }

  /**
   * Sets the priority of a remote user's media stream.
   *
   * Use this method with the [`setRemoteSubscribeFallbackOption`]{@link setRemoteSubscribeFallbackOption} method.
   * If the fallback function is enabled for a subscribed stream, the SDK ensures the high-priority user gets the best possible stream quality.
   *
   * **Note**
   *
   * The Agora SDK supports setting `userPriority` as high for one user only.
   *
   * @param uid The ID of the remote user.
   * @param userPriority The priority of the remote user.
   */
  setRemoteUserPriority(
    uid: number,
    userPriority: UserPriority
  ): Promise<void> {
    return RtcEngine._callMethod('setRemoteUserPriority', {
      uid,
      userPriority,
    });
  }

  /**
   * Disables the network connection quality test.
   */
  disableLastmileTest(): Promise<void> {
    return RtcEngine._callMethod('disableLastmileTest');
  }

  /**
   * Enables the network connection quality test.
   *
   * This method tests the quality of the users' network connections and is disabled by default.
   *
   * Before users join a channel or before an audience switches to a host, call this method to check the
   * uplink network quality. This method consumes additional network traffic, which may affect the communication quality.
   * Call [`disableLastmileTest`]{@link disableLastmileTest} to disable this test after receiving the [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} callback,
   * and before the user joins a channel or switches the user role.
   *
   * **Note**
   *
   * - Do not use this method with the [`startLastmileProbeTest`]{@link startLastmileProbeTest} method.
   *
   * - Do not call any other methods before receiving the [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} callback. Otherwise, the callback may be interrupted by other methods and may not execute.
   *
   * - In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile, a host should not call this method after joining a channel.
   * - If you call this method to test the last-mile quality, the SDK consumes the bandwidth of a video stream, whose bitrate corresponds to the bitrate you set in the [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration} method.
   * - After you join the channel, whether you have called [`disableLastmileTest`]{@link disableLastmileTest} or not, the SDK automatically stops consuming the bandwidth.
   */
  enableLastmileTest(): Promise<void> {
    return RtcEngine._callMethod('enableLastmileTest');
  }

  /**
   * Starts an audio call test.
   *
   * In the audio call test, you record your voice. If the recording plays back within the set time interval, the audio devices and the network connection are working properly.
   *
   * **Note**
   *
   * - Call this method before joining a channel.
   *
   * - After calling this method, call [`stopEchoTest`]{@link stopEchoTest} to end the test.
   * Otherwise, the app cannot run the next echo test, or call [`joinChannel`]{@link joinChannel}.
   *
   * - In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile, only a host can call this method.
   * @param intervalInSeconds The time interval (s) between when you speak and when the recording plays back.
   */
  startEchoTest(intervalInSeconds: number): Promise<void> {
    return RtcEngine._callMethod('startEchoTest', { intervalInSeconds });
  }

  /**
   * Starts the last-mile network probe test before joining a channel to get the uplink and downlink last-mile network statistics,
   * including the bandwidth, packet loss, jitter, and round-trip time (RTT).
   *
   * Once this method is enabled, the SDK returns the following callbacks:
   * - [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality}: the SDK triggers this callback within two seconds depending on the network conditions.
   * This callback rates the network conditions with a score and is more closely linked to the user experience.
   *
   * - [`LastmileProbeResult`]{@link RtcEngineEvents.LastmileProbeResult}: the SDK triggers this callback within 30 seconds depending on the network conditions.
   * This callback returns the real-time statistics of the network conditions and is more objective.
   *
   * Call this method to check the uplink network quality before users join a channel or before an audience switches to a host.
   *
   * **Note**
   *
   * - This method consumes extra network traffic and may affect communication quality. We do not recommend calling this method together with [`enableLastmileTest`]{@link enableLastmileTest}.
   * - Do not call other methods before receiving the [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} and [`LastmileProbeResult`]{@link RtcEngineEvents.LastmileProbeResult} callbacks. Otherwise, the callbacks may be interrupted by other methods.
   * - In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile, a host should not call this method after joining a channel.
   *
   * @param config The configurations of the last-mile network probe test.
   */
  startLastmileProbeTest(config: LastmileProbeConfig): Promise<void> {
    return RtcEngine._callMethod('startLastmileProbeTest', { config });
  }

  /**
   * Stops the audio call test.
   */
  stopEchoTest(): Promise<void> {
    return RtcEngine._callMethod('stopEchoTest');
  }

  /**
   * Stops the last-mile network probe test.
   */
  stopLastmileProbeTest(): Promise<void> {
    return RtcEngine._callMethod('stopLastmileProbeTest');
  }

  /**
   * Registers the metadata observer.
   *
   * This method enables you to add synchronized metadata in the video stream for more diversified live streaming interactions,
   * such as sending shopping links, digital coupons, and online quizzes.
   *
   * **Note**
   *
   * Call this method before the [`joinChannel`]{@link joinChannel} method.
   */
  registerMediaMetadataObserver(): Promise<void> {
    return RtcEngine._callMethod('registerMediaMetadataObserver');
  }

  /**
   * Sends the metadata.
   *
   * @param metadata The metadata to be sent.
   */
  sendMetadata(metadata: string): Promise<void> {
    return RtcEngine._callMethod('sendMetadata', { metadata });
  }

  /**
   * Sets the maximum size of the metadata.
   *
   * @param size Buffer size of the sent or received metadata.
   */
  setMaxMetadataSize(size: number): Promise<void> {
    return RtcEngine._callMethod('setMaxMetadataSize', { size });
  }

  /**
   * Unregisters the metadata observer.
   */
  unregisterMediaMetadataObserver(): Promise<void> {
    return RtcEngine._callMethod('unregisterMediaMetadataObserver');
  }

  /**
   * Adds a watermark image to the local video.
   *
   * This method adds a PNG watermark image to the local video stream in a live interactive streaming.
   * Once the watermark image is added, all the audience in the channel (CDN audience included), and the recording device can see and capture it.
   *
   * Agora supports adding only one watermark image onto the local video, and the newly-added watermark image replaces the previous one.
   * The watermark position depends on the settings in the [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration} method:
   *
   * - If the orientation mode of the encoding video is [`FixedLandscape`]{@link VideoOutputOrientationMode.FixedLandscape}, or the landscape mode in [`Adaptative`]{@link VideoOutputOrientationMode.Adaptative}, the watermark uses the landscape orientation.
   *
   * - If the orientation mode of the encoding video is [`FixedPortrait`]{@link VideoOutputOrientationMode.FixedPortrait}, or the portrait mode in [`Adaptative`]{@link VideoOutputOrientationMode.Adaptative}, the watermark uses the portrait orientation.
   *
   * - When setting the watermark position, the region must be less than the dimensions set in the [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration} method.
   * Otherwise, the watermark image will be cropped.
   *
   * **Note**
   *
   * - Ensure that you have called [`enableVideo`]{@link enableVideo} to enable the video module before calling this method.
   *
   * - If you only want to add a watermark image to the local video for the audience in the CDN live interactive streaming channel to see and capture, you can call this method or the [`setLiveTranscoding`]{@link setLiveTranscoding} method.
   *
   * - This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.
   *
   * - If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.
   *
   * - If you have enabled the local video preview by calling [`startPreview`]{@link startPreview}, you can use the `visibleInPreview` member in the [`WatermarkOptions`]{@link WatermarkOptions} class to set whether the watermark is visible in preview.
   *
   * - If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time.
   * You can implement the watermark function in your application layer.
   * @param watermarkUrl The local file path of the watermark image to be added.
   * - On Android: Agora supports using a URI address, an absolute path, or a path that starts with `/assets/` to access a local file.
   * **Note** You might encounter permission issues if you use an absolute path to access a local file, so Agora recommends using a URI address instead.
   * - On iOS: This method supports adding a watermark image from the local file path.
   * If the watermark image to be added is in the project file, you need to change the image’s Type from PNG image to Data in the Xcode property; otherwise, the Agora Native SDK cannot recognize the image.
   * @param options The options of the watermark image to be added.
   */
  addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): Promise<void> {
    return RtcEngine._callMethod('addVideoWatermark', {
      watermarkUrl,
      options,
    });
  }

  /**
   * Removes the watermark image from the video stream added by [`addVideoWatermark`]{@link addVideoWatermark}.
   */
  clearVideoWatermarks(): Promise<void> {
    return RtcEngine._callMethod('clearVideoWatermarks');
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
    return RtcEngine._callMethod('enableEncryption', { enabled, config });
  }

  /**
   * Sets the built-in encryption mode.
   *
   * @deprecated
   * Deprecated as of v3.1.2. Use [`enableEncryption`]{@link enableEncryption} instead.
   *
   * The Agora SDK supports built-in encryption, which is set to `AES128XTS` mode by default.
   * Call this method to set the encryption mode to use other encryption modes.
   * All users in the same channel must use the same encryption mode and password.
   *
   * Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.
   *
   * **Note**
   *
   * Call [`setEncryptionSecret`]{@link setEncryptionSecret} before calling this method.
   *
   * @param encryptionMode Sets the encryption mode.
   */
  setEncryptionMode(encryptionMode: EncryptionMode): Promise<void> {
    return RtcEngine._callMethod('setEncryptionMode', { encryptionMode });
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
   *
   * - For optimal transmission, ensure that the encrypted data size does not exceed the original data size + 16 bytes. 16 bytes is the maximum padding size for AES encryption.
   * - Do not use this method for CDN live streaming.
   * @param secret The encryption password.
   */
  setEncryptionSecret(secret: string): Promise<void> {
    return RtcEngine._callMethod('setEncryptionSecret', { secret });
  }

  /**
   * Starts an audio recording on the client.
   *
   * @deprecated Deprecated from v3.4.2. Use [`startAudioRecordingWithConfig`]{@link startAudioRecordingWithConfig} instead.
   *
   * The SDK allows recording during a call. After successfully calling this method,
   * you can record the audio of all the users in the channel and get an audio recording file.
   *
   * Supported formats of the recording file are as follows:
   * - .wav: Large file size with high fidelity.
   * - .aac: Small file size with low fidelity.
   *
   * **Note**
   *
   * - Ensure that the directory to save the recording file exists and is writable.
   * - This method is usually called after calling [`joinChannel`]{@link joinChannel}. The recording automatically stops when you call [`leaveChannel`]{@link leaveChannel}.
   * - For better recording effects, set quality as [`Medium`]{@link AudioRecordingQuality.Medium} or [`High`]{@link AudioRecordingQuality.High} when sampleRate is 44.1 kHz or 48 kHz.
   *
   * @param filePath Absolute file path (including the suffixes of the filename) of the recording file. The string of the file name is in UTF-8. For example, `/sdcard/emulated/0/audio/aac`.
   * @param sampleRate Sample rate (Hz) of the recording file.
   * @param quality The audio recording quality.
   */
  startAudioRecording(
    filePath: string,
    sampleRate: AudioSampleRateType,
    quality: AudioRecordingQuality
  ): Promise<void> {
    return RtcEngine._callMethod('startAudioRecording', {
      filePath,
      sampleRate,
      quality,
    });
  }

  /** Starts an audio recording on the client.
   *
   * @since v3.4.2
   *
   * The SDK allows recording audio during a call. After successfully calling this method, you can record the audio of users in the channel and get an audio recording file. Supported file formats are as follows:
   * - WAV: High-fidelity files with typically larger file sizes. For example, if the sample rate is 32,000 Hz, the file size for 10-minute recording is approximately 73 MB.
   * - AAC: Low-fidelity files with typically smaller file sizes. For example, if the sample rate is 32,000 Hz and the recording quality is `Medium`, the file size for 10-minute recording is approximately 2 MB.
   *
   * Once the user leaves the channel, the recording automatically stops.
   *
   * @note
   * Call this method after joining a channel.
   *
   * @param config Recording configuration. See [`AudioRecordingConfiguration`]{@link AudioRecordingConfiguration}.
   */
  startAudioRecordingWithConfig(
    config: AudioRecordingConfiguration
  ): Promise<void> {
    return RtcEngine._callMethod('startAudioRecording', {
      config,
    });
  }

  /**
   * Enables the virtual metronome.
   *
   * @since v3.4.2
   *
   * In music education, physical education, and other scenarios, teachers often need to use a metronome so that students can practice at the correct tempo.
   * A meter is composed of a downbeat and some number of upbeats (including zero).
   * The first beat of each measure is called the downbeat, and the rest are called the upbeats.
   * In this method, you need to set the paths of the upbeat and downbeat files, the number of beats per measure, the tempo, and whether to send the sound of the metronome to remote users.
   *
   * @note
   * After enabling the virtual metronome, the SDK plays the specified files from the beginning and controls the beat duration according to the value you set in `beatsPerMinute`.
   * If the file duration exceeds the beat duration, the SDK only plays the audio within the beat duration.
   *
   * @param sound1 The absolute path or URL address (including the filename extensions) of the file for the downbeat.
   * - Android: For example: `/sdcard/emulated/0/audio.mp4`. Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Media Formats Supported by Android](https://developer.android.com/guide/topics/media/media-formats).
   * - iOS: For example: `/var/mobile/Containers/Data/audio.mp4`. Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   * @param sound2 The absolute path or URL address (including the filename extensions) of the file for the upbeats.
   * - Android: For example: `/sdcard/emulated/0/audio.mp4`. Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Media Formats Supported by Android](https://developer.android.com/guide/topics/media/media-formats).
   * - iOS: For example: `/var/mobile/Containers/Data/audio.mp4`. Supported audio formats include MP3, AAC, M4A, MP4, WAV, and 3GP. For more information, see [Best Practices for iOS Audio](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/MultimediaPG/UsingAudio/UsingAudio.html#//apple_ref/doc/uid/TP40009767-CH2-SW28).
   * @param config The metronome configuration. See [`RhythmPlayerConfig`]{@link RhythmPlayerConfig}.
   *
   */
  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: RhythmPlayerConfig
  ): Promise<void> {
    return RtcEngine._callMethod('startRhythmPlayer', {
      sound1,
      sound2,
      config,
    });
  }

  /**
   * Disables the virtual metronome.
   *
   * @since v3.4.2
   *
   * After calling [`startRhythmPlayer`]{@link startRhythmPlayer}, you can call this method to disable the virtual metronome.
   *
   */
  stopRhythmPlayer(): Promise<void> {
    return RtcEngine._callMethod('stopRhythmPlayer');
  }

  /**
   * Configures the virtual metronome.
   *
   * @since v3.4.2
   *
   * After calling [`startRhythmPlayer`]{@link startRhythmPlayer}, you can call this method to reconfigure the virtual metronome.
   *
   * @note
   * After reconfiguring the virtual metronome, the SDK plays the specified files from the beginning and controls the beat duration
   * according to the value you set in `beatsPerMinute`.
   * If the file duration exceeds the beat duration, the SDK only plays the audio within the beat duration.
   *
   * @param config The metronome configuration. See [`RhythmPlayerConfig`]{@link RhythmPlayerConfig}.
   *
   */
  configRhythmPlayer(config: RhythmPlayerConfig): Promise<void> {
    return RtcEngine._callMethod('configRhythmPlayer', config);
  }

  /**
   * Stops the audio recording on the client.
   *
   */
  stopAudioRecording(): Promise<void> {
    return RtcEngine._callMethod('stopAudioRecording');
  }

  /**
   * Injects an online media stream to live interactive streaming.
   *
   * If this method call is successful, the server pulls the voice or video stream and injects it into
   * a live channel. This is applicable to scenarios where all audience members in the channel can watch a live show and interact with each other.
   *
   * This method call triggers the following callbacks:
   * - The local client:
   *  - [`StreamInjectedStatus`]{@link RtcEngineEvents.StreamInjectedStatus}, with the state of the injecting the online stream.
   *
   *  - [`UserJoined`]{@link RtcEngineEvents.UserJoined}(uid: 666), if the method call is successful and the online media stream is injected into the channel.
   *
   * - The remote client:
   *  - [`UserJoined`]{@link RtcEngineEvents.UserJoined}(uid: 666), if the method call is successful and the online media stream is injected into the channel.
   *
   * **Warning**
   *
   * Agora will soon stop the service for injecting online media streams on the client. If you have not implemented this service, Agora recommends that you do not use it.
   *
   * **Note**
   *
   * - This method applies to the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile only.
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - You can inject only one media stream into the channel at the same time.
   *
   * @param url The URL address to be added to the ongoing live interactive streaming. Valid protocols are RTMP, HLS, and HTTP-FLV.
   * - Supported audio codec type: AAC.
   * - Supported video codec type: H264(AVC).
   * @param config The `LiveInjectStreamConfig` object which contains the configuration information for the added voice or video stream.
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
    return RtcEngine._callMethod('addInjectStreamUrl', { url, config });
  }

  /**
   * Removes the injected online media stream from live interactive streaming.
   *
   * This method removes the URL address (added by [`addInjectStreamUrl`]{@link addInjectStreamUrl}) from interactive streaming.
   *
   * If this method call is successful, the SDK triggers the [`UserOffline`]{@link RtcEngineEvents.UserOffline} callback and returns a stream uid of 666.
   *
   * **Warning**
   *
   * Agora will soon stop the service for injecting online media streams on the client. If you have not implemented this service, Agora recommends that you do not use it.
   *
   * @param url HTTP/HTTPS URL address of the added stream to be removed.
   */
  removeInjectStreamUrl(url: string): Promise<void> {
    return RtcEngine._callMethod('removeInjectStreamUrl', { url });
  }

  /**
   * Enables/Disables face detection for the local user.
   *
   * Once face detection is enabled, the SDK triggers the [`FacePositionChanged`]{@link RtcEngineEvents.FacePositionChanged} callback to report the face information of the local user, which includes the following aspects:
   *
   * - The width and height of the local video.
   * - The position of the human face in the local video.
   * - The distance between the human face and the device screen.
   *
   * @note
   * You can call this method either before or after joining a channel.
   *
   * @param enable Determines whether to enable the face detection function for the local user:
   * - `true`: Enable face detection.
   * - `false`: (Default) Disable face detection.
   */
  enableFaceDetection(enable: boolean): Promise<void> {
    return RtcEngine._callMethod('enableFaceDetection', { enable });
  }

  /**
   * Gets the maximum zoom ratio supported by the camera.
   *
   * This method applies to Android only.
   * @returns The maximum camera zoom factor if the method call succeeds.
   */
  getCameraMaxZoomFactor(): Promise<number> {
    return RtcEngine._callMethod('getCameraMaxZoomFactor');
  }

  /**
   * Checks whether the camera auto-face focus function is supported.
   *
   * @returns
   *
   * - `true`: The device supports the camera auto-face focus function.
   * - `false`: The device does not support the camera auto-face focus function.
   */
  isCameraAutoFocusFaceModeSupported(): Promise<boolean> {
    return RtcEngine._callMethod('isCameraAutoFocusFaceModeSupported');
  }

  /**
   * Checks whether the camera exposure function is supported.
   *
   * @returns
   *
   * - `true`: The device supports the camera exposure function.
   * - `false`: The device does not support the camera exposure function.
   */
  isCameraExposurePositionSupported(): Promise<boolean> {
    return RtcEngine._callMethod('isCameraExposurePositionSupported');
  }

  /**
   * Checks whether the camera manual focus function is supported.
   *
   * @returns
   *
   * - `true`: The device supports the camera manual focus function.
   * - `false`: The device does not support the camera manual focus function.
   */
  isCameraFocusSupported(): Promise<boolean> {
    return RtcEngine._callMethod('isCameraFocusSupported');
  }

  /**
   * Checks whether the camera flash function is supported.
   *
   * @returns
   *
   * - `true`: The device supports the camera flash function.
   * - `false`: The device does not the support camera flash function.
   */
  isCameraTorchSupported(): Promise<boolean> {
    return RtcEngine._callMethod('isCameraTorchSupported');
  }

  /**
   * Checks whether the camera zoom function is supported.
   *
   * @returns
   *
   * - `true`: The device supports the camera zoom function.
   * - `false`: The device does not support the camera zoom function.
   */
  isCameraZoomSupported(): Promise<boolean> {
    return RtcEngine._callMethod('isCameraZoomSupported');
  }

  /**
   * Enables the camera auto-face focus function.
   *
   * @param enabled Sets whether to enable/disable the camera auto-face focus function:
   * - `true`: Enable the camera auto-face focus function.
   * - `false`: (Default) Disable the camera auto-face focus function.
   */
  setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('setCameraAutoFocusFaceModeEnabled', {
      enabled,
    });
  }

  /**
   * Sets the camera capturer configuration.
   *
   * For a video call or live interactive video streaming, generally the SDK controls the camera output parameters.
   * When the default camera capture settings do not meet special requirements or cause performance problems,
   * we recommend using this method to set the camera capturer configuration:
   *
   * - If the resolution or frame rate of the captured raw video data are higher than those set by [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration}, processing video frames requires extra CPU and RAM usage and degrades performance.
   * We recommend setting `config` as [`Performance(1)`]{@link CameraCaptureOutputPreference.Performance} to avoid such problems.
   *
   * - If you do not need local video preview or are willing to sacrifice preview quality, we recommend setting `config` as [`Performance(1)`]{@link CameraCaptureOutputPreference.Performance} to optimize CPU and RAM usage.
   *
   * - If you want better quality for the local video preview, we recommend setting `config` as [`Preview(2)`]{@link CameraCaptureOutputPreference.Preview}.
   *
   * - To customize the width and height of the video image captured by the local camera, set the camera capture configuration as [`Manual(3)`]{@link CameraCaptureOutputPreference.Manual}.
   *
   * **Note**
   *
   * Call this method before enabling the local camera. That said, you can call this method before calling [`joinChannel`]{@link joinChannel}, [`enableVideo`]{@link enableVideo}, or [`enableLocalVideo`]{@link enableLocalVideo}, depending on which method you use to turn on your local camera.
   *
   * @param config The camera capturer configuration.
   */
  setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): Promise<void> {
    return RtcEngine._callMethod('setCameraCapturerConfiguration', { config });
  }

  /**
   * Sets the camera exposure position.
   *
   * A successful [`setCameraExposurePosition`]{@link setCameraExposurePosition} method call triggers the [`CameraExposureAreaChanged`]{@link RtcEngineEvents.CameraExposureAreaChanged} callback on the local client.
   *
   * @param positionXinView The horizontal coordinate of the touch point in the view.
   * @param positionYinView The vertical coordinate of the touch point in the view.
   */
  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): Promise<void> {
    return RtcEngine._callMethod('setCameraExposurePosition', {
      positionXinView,
      positionYinView,
    });
  }

  /**
   * Sets the camera manual focus position.
   *
   * A successful [`setCameraFocusPositionInPreview`]{@link setCameraFocusPositionInPreview} method call triggers the [`CameraFocusAreaChanged`]{@link RtcEngineEvents.CameraFocusAreaChanged} callback on the local client.
   *
   * @param positionX The horizontal coordinate of the touch point in the view.
   * @param positionY The vertical coordinate of the touch point in the view.
   */
  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): Promise<void> {
    return RtcEngine._callMethod('setCameraFocusPositionInPreview', {
      positionX,
      positionY,
    });
  }

  /**
   * Enables the camera flash function.
   * @param isOn Sets whether to enable/disable the camera flash function:
   * - `true`: Enable the camera flash function.
   * - `false`: Disable the camera flash function.
   */
  setCameraTorchOn(isOn: boolean): Promise<void> {
    return RtcEngine._callMethod('setCameraTorchOn', { isOn });
  }

  /**
   * Sets the camera zoom ratio.
   * @param factor Sets the camera zoom factor. The value ranges between 1.0 and the maximum zoom supported by the device.
   */
  setCameraZoomFactor(factor: number): Promise<void> {
    return RtcEngine._callMethod('setCameraZoomFactor', { factor });
  }

  /**
   * Switches between front and rear cameras.
   */
  switchCamera(): Promise<void> {
    return RtcEngine._callMethod('switchCamera');
  }

  /**
   * Creates a data stream.
   *
   * @deprecated
   *
   * This method is deprecated from v3.3.1. Use the [`createDataStreamWithConfig`]{@link createDataStreamWithConfig} method instead.
   *
   * Ensure that you call this method after joining a channel.
   *
   * Each user can create up to five data streams during the lifecycle of the [`RtcEngine`]{@link RtcEngine}.
   *
   * **Note**
   *
   * Set both the `reliable` and `ordered` parameters to `true` or `false`. Do not set one as `true` and the other as `false`.
   * @param reliable Sets whether the recipients are guaranteed to receive the data stream from the sender within five seconds:
   * - `true`: The recipients receive the data from the sender within five seconds.
   * If the recipient does not receive the data within five seconds, the SDK triggers the [`StreamMessageError`]{@link RtcEngineEvents.StreamMessageError} callback and returns an error code.
   *
   * - `false`: There is no guarantee that the recipients receive the data stream within five seconds and no error message is reported for any delay or missing data stream.
   * @param ordered Sets whether the recipients receive the data stream in the sent order:
   * - `true`: The recipients receive the data in the sent order.
   * - `false`: The recipients do not receive the data in the sent order.
   *
   * @return
   * - Returns the stream ID, if the method call is successful.
   * - Error codes: Failure. The error code is related to the integer displayed in [Error Codes]{@link ErrorCode}.
   */
  createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
    return RtcEngine._callMethod('createDataStream', { reliable, ordered });
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
   * @param config The configurations for the data stream.
   *
   * @return
   * - Returns the stream ID if you successfully create the data stream.
   * - An error code if the method call fails.
   */
  createDataStreamWithConfig(config: DataStreamConfig): Promise<number> {
    return RtcEngine._callMethod('createDataStream', { config });
  }

  /**
   * Sends data stream messages.
   *
   * The SDK has the following restrictions on this method:
   *
   * - Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 kB.
   * - Each client can send up to 6 kB of data per second.
   * - Each user can have up to five data channels simultaneously.
   *
   * A successful [`sendStreamMessage`]{@link sendStreamMessage} method call triggers the [`StreamMessage`]{@link RtcEngineEvents.StreamMessage} callback on the remote client, from which the remote user gets the stream message.
   *
   * A failed [`sendStreamMessage`]{@link sendStreamMessage} method call triggers the [`StreamMessageError`]{@link RtcEngineEvents.StreamMessageError} callback on the remote client.
   *
   * **Note**
   *
   * - Ensure that you have created the data stream using [`createDataStream`]{@link createDataStream} before calling this method.
   *
   * - This method applies only to the [`Communication`]{@link ChannelProfile.Communication} profile or to hosts in the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile.
   * @param streamId ID of the sent data stream returned by the [`createDataStream`]{@link createDataStream} method.
   * @param message Sent data.
   */
  sendStreamMessage(streamId: number, message: string): Promise<void> {
    return RtcEngine._callMethod('sendStreamMessage', { streamId, message });
  }

  /**
   * This function is in the beta stage with a free trial. The ability provided in its beta test version is reporting a maximum of 10 message pieces within 6 seconds, with each message piece not exceeding 256 bytes and each string not exceeding 100 bytes. To try out this function, contact support@agora.io and discuss the format of customized messages with us.
   */
  sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): Promise<void> {
    return RtcEngine._callMethod('sendCustomReportMessage', {
      id,
      category,
      event,
      label,
      value,
    });
  }

  /**
   * The method applies to the iOS platform only. You can call this method either before or after joining a channel.
   *
   * The SDK and the app can both configure the audio session by default. The app may occasionally use other apps or third-party components to manipulate the audio session and restrict the SDK from doing so. This method allows the app to restrict the SDK’s manipulation of the audio session.
   *
   * You can call this method at any time to return the control of the audio sessions to the SDK.
   *
   * **Note**
   * - This method restricts the SDK’s manipulation of the audio session. Any operation to the audio session relies solely on the app, other apps, or third-party components.
   *
   * @param restriction The operational restriction (bit mask) of the SDK on the audio session. See [`AudioSessionOperationRestriction`]{@link AudioSessionOperationRestriction}.
   */
  setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): Promise<void> {
    return RtcEngine._callMethod('setAudioSessionOperationRestriction', {
      restriction,
    });
  }

  /**
   * Gets the native handle of the SDK engine.
   *
   * This interface is used to retrieve the native C++ handle of the SDK engine used in special scenarios, such as registering the audio and video frame observer.
   *
   * @returns
   * The native handle of the SDK engine if the method call succeeds.
   */
  getNativeHandle(): Promise<number> {
    return RtcEngine._callMethod('getNativeHandle');
  }

  /**
   * Enables or disables deep-learning noise reduction.
   *
   * @since v3.3.1.
   *
   * The SDK enables traditional noise reduction mode by default to reduce most of the stationary background noise. If you need to reduce most of the non-stationary background noise, Agora recommends enabling deep-learning noise reduction as follows:
   * - 1. Integrate the following file under the `libs` folder to your project:
   *    - Android: `libagora_ai_denoise_extension.so`
   *    - iOS: `AgoraAIDenoiseExtension.xcframework`
   * - 2. Call `enableDeepLearningDenoise(true)`.
   *
   * Deep-learning noise reduction requires high-performance devices.
   *
   * After successfully enabling deep-learning noise reduction, if the SDK detects that the device performance is not sufficient, it automatically disables deep-learning noise reduction and enables traditional noise reduction.
   *
   * If you call `enableDeepLearningDenoise(false)` or the SDK automatically disables deep-learning noise reduction in the channel, when you need to re-enable deep-learning noise reduction, you need to call `leaveChannel` first, and then call `enableDeepLearningDenoise(true)`.
   *
   * @note
   * - This method dynamically loads `libagora_ai_denoise_extension.so` on Android or `AgoraAIDenoiseExtension.xcframework` on iOS, so Agora recommends calling this method before joining a channel.
   * - This method works best with the human voice. Agora does not recommend using this method for audio containing music.
   * @param enabled Sets whether to enable deep-learning noise reduction.
   *   - `true`: (Default) Enables deep-learning noise reduction.
   *   - `false`: Disables deep-learning noise reduction.
   * @return
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *   - 157(ModuleNotFound): The library for enabling deep-learning noise reduction is not integrated.
   */
  enableDeepLearningDenoise(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableDeepLearningDenoise', { enabled });
  }

  /**
   * Sets the Agora cloud proxy service.
   *
   * @since v3.3.1.
   *
   * When the user's firewall restricts the IP address and port, refer to *Use Cloud Proxy* to add the specific IP addresses and ports to the firewall whitelist; then, call this method to enable the cloud proxy and set the `proxyType` parameter as `UDP(1)`, which is the cloud proxy for the UDP protocol.
   *
   * After a successfully cloud proxy connection, the SDK triggers the [`ConnectionStateChanged(Connecting, SettingProxyServer)`]{@link RtcEngineEvents.ConnectionStateChanged} callback.
   *
   * To disable the cloud proxy that has been set, call `setCloudProxy(None)`. To change the cloud proxy type that has been set, call `setCloudProxy(None)` first, and then call `setCloudProxy`, and pass the value that you expect in `proxyType`.
   *
   * @note
   * - Agora recommends that you call this method before joining the channel or after leaving the channel.
   * - When you use the cloud proxy for the UDP protocol, the services for pushing streams to CDN and co-hosting across channels are not available.
   *
   * @param proxyType The cloud proxy type. This parameter is required, and the SDK reports an error if you do not pass in a value. See [`CloudProxyType`]{@link CloudProxyType}.
   *
   * @return
   * - Void if the method call succeeds.
   * - An error code if the method call fails. Possible errors include:
   *   - `2(InvalidArgument)`: The parameter is invalid.
   *   - `7(NotInitialized)`: The SDK is not initialized.
   */
  setCloudProxy(proxyType: CloudProxyType): Promise<void> {
    return RtcEngine._callMethod('setCloudProxy', { proxyType });
  }

  /**
   * @ignore
   *
   * Uploads all local SDK log files.
   * @since v3.3.1. (later)
   *
   * Uploads all SDK log files from the client to the Agora server. After a successful method call, the SDK triggers the `[UploadLogResult]`{@link RtcEngineEvents.UploadLogResult} callback to report whether the log files are successfully uploaded to the Agora server.
   *
   * Do not call this method more than once per minute, otherwise the SDK returns `null`.
   *
   * For easier debugging, Agora recommends that you bind this method to the UI element of your App, so as to instruct the user to upload a log file when a quality issue occurs.
   *  @return
   *  - The request ID. This request ID is the same as `requestId` in the `onUploadLogResult` callback, and you can use the request ID to match a specific upload with a callback.
   *  - `null`: The method call fails. It may be because the call frequency exceeds the limit.
   */
  uploadLogFile(): Promise<string> {
    return RtcEngine._callMethod('uploadLogFile');
  }

  /**
   * @ignore
   */
  setLocalAccessPoint(ips: string[], domain: string): Promise<void> {
    return RtcEngine._callMethod('setLocalAccessPoint', { ips, domain });
  }

  /**
   * Sets parameters for SDK preset audio effects.
   *
   * @since v3.2.0.
   *
   * Call this method to set the following parameters for the local user who sends an audio stream:
   * - 3D voice effect: Sets the cycle period of the 3D voice effect.
   * - Pitch correction effect: Sets the basic mode and tonic pitch of the pitch correction effect. Different songs have different modes and tonic pitches.
   * Agora recommends bounding this method with interface elements to enable users to adjust the pitch correction interactively.
   *
   * After setting parameters, all users in the channel can hear the relevant effect.
   *
   * **Note**
   * - To achieve better audio effect quality, Agora recommends calling `setAudioProfile` and setting the scenario parameter
   * to `GameStreaming(3)` before calling this method.
   * - Do not set the `profile` parameter of `setAudioProfile` to `SpeechStandard(1)`; otherwise, this method call does not take effect.
   * - This method works best with the human voice. Agora does not recommend using this method for audio containing music.
   * - After calling this method, Agora recommends not calling the following methods, because they can override `setAudioEffectParameters`:
   *   - `setAudioEffectPreset`
   *   - `setVoiceBeautifierPreset`
   *   - `setLocalVoiceReverbPreset`
   *   - `setLocalVoiceChanger`
   *   - `setLocalVoicePitch`
   *   - `setLocalVoiceEqualization`
   *   - `setLocalVoiceReverb`
   *   - `setVoiceConversionPreset`
   *
   * @param preset The options for SDK preset audio effects:
   * - 3D voice effect: `RoomAcoustics3DVoice`.
   *   - Call `setAudioProfile` and set the profile parameter to `MusicStandardStereo(3)` or `MusicHighQualityStereo(5)` before setting this enumerator;
   * otherwise, the enumerator setting does not take effect.
   *   - If the 3D voice effect is enabled, users need to use stereo audio playback devices to hear the anticipated voice effect.
   * - Pitch correction effect: `PitchCorrection`. To achieve better audio effect quality, Agora recommends calling `setAudioProfile` and setting the profile parameter to `MusicHighQuality(4)` or `MusicHighQualityStereo(5)` before setting this enumerator.
   *
   * @param param1
   * - If you set preset to `RoomAcoustics3DVoice`, the `param1` sets the cycle period of the 3D voice effect.
   * The value range is [1,60] and the unit is a second. The default value is 10 seconds, indicating that the voice moves around you every 10 seconds.
   * - If you set preset to `PitchCorrection`, `param1` sets the basic mode of the pitch correction effect:
   *   - 1: (Default) Natural major scale.
   *   - 2: Natural minor scale.
   *   - 3: Japanese pentatonic scale.
   *
   * @param param2
   * - If you set `preset` to `RoomAcoustics3DVoice`, you need to set `param2` to `0`.
   * - If you set `preset` to `PitchCorrection`, `param2` sets the tonic pitch of the pitch correction effect:
   *   - 1: A
   *   - 2: A#
   *   - 3: B
   *   - 4: (Default) C
   *   - 5: C#
   *   - 6: D
   *   - 7: D#
   *   - 8: E
   *   - 9: F
   *   - 10: F#
   *   - 11: G
   *   - 12: G#
   *
   */
  setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): Promise<void> {
    return RtcEngine._callMethod('setAudioEffectParameters', {
      preset,
      param1,
      param2,
    });
  }

  /**
   * Sets parameters for SDK preset voice beautifier effects.
   *
   * @since 3.3.1.
   *
   * Call this method to set a gender characteristic and a reverberation effect for the singing beautifier effect. This method sets parameters for the local user who sends an audio stream.
   *
   * After you call this method successfully, all users in the channel can hear the relevant effect.
   *
   * To achieve better audio effect quality, before you call this method, Agora recommends calling [`setAudioProfile`]{@link setAudioProfile}, and setting the `scenario` parameter to `GameStreaming(3)` and the profile parameter to `MusicHighQuality(4)` or `MusicHighQualityStereo(5)`.
   *
   * @note
   * - You can call this method either before or after joining a channel.
   * - Do not set the `profile` parameter of `setAudioProfile` to `SpeechStandard(1)`; otherwise, this method call does not take effect.
   * - This method works best with the human voice. Agora does not recommend using this method for audio containing music.
   * - After you call this method, Agora recommends not calling the following methods, because they can override `setVoiceBeautifierParameters`:
   *   - `setAudioEffectPreset`
   *   - `setAudioEffectParameters`
   *   - `setVoiceBeautifierPreset`
   *   - `setLocalVoiceReverbPreset`
   *   - `setLocalVoiceChanger`
   *   - `setLocalVoicePitch`
   *   - `setLocalVoiceEqualization`
   *   - `setLocalVoiceReverb`
   *   - `setVoiceConversionPreset`
   * @param preset The options for SDK preset voice beautifier effects:
   *               - `SingingBeautifier`: Singing beautifier effect.
   * @param param1 The gender characteristics options for the singing voice:
   *               - `1`: A male-sounding voice.
   *               - `2`: A female-sounding voice.
   * @param param2 The reverberation effects options:
   *               - `1`: The reverberation effect sounds like singing in a small room.
   *               - `2`: The reverberation effect sounds like singing in a large room.
   *               - `3`: The reverberation effect sounds like singing in a hall.
   */
  setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): Promise<void> {
    return RtcEngine._callMethod('setVoiceBeautifierParameters', {
      preset,
      param1,
      param2,
    });
  }

  /**
   * Sets an SDK preset audio effect.
   *
   * @since v3.2.0.
   *
   * Call this method to set an SDK preset audio effect for the local user who sends an audio stream.
   * This audio effect does not change the gender characteristics of the original voice. After setting an audio effect, all users in the channel can hear the effect.
   *
   * You can set different audio effects for different scenarios.
   *
   * To achieve better audio effect quality, Agora recommends calling `setAudioProfile` and setting the scenario parameter to `GameStreaming(3)` before calling this method.
   *
   * **Note**
   * - You can call this method either before or after joining a channel.
   * - Do not set the `profile` parameter of `setAudioProfile` to `SpeechStandard(1)`; otherwise, this method call does not take effect.
   * - This method works best with the human voice. Agora does not recommend using this method for audio containing music.
   * - If you call this method and set the preset parameter to enumerators except `RoomAcoustics3DVoice` or `PitchCorrection`, do not call `setAudioEffectParameters`; otherwise, `setAudioEffectParameters` overrides this method.
   * - After calling this method, Agora recommends not calling the following methods, because they can override `setAudioEffectPreset`:
   *    - `setVoiceBeautifierPreset`
   *    - `setLocalVoiceReverbPreset`
   *    - `setLocalVoiceChanger`
   *    - `setLocalVoicePitch`
   *    - `setLocalVoiceEqualization`
   *    - `setLocalVoiceReverb`
   *    - `setVoiceConversionPreset`
   *
   * @param preset The options for SDK preset audio effects. See [`AudioEffectPreset`]{@link AudioEffectPreset}.
   *
   */
  setAudioEffectPreset(preset: AudioEffectPreset): Promise<void> {
    return RtcEngine._callMethod('setAudioEffectPreset', { preset });
  }

  /**
   * Sets an SDK preset voice beautifier effect.
   *
   * @since v3.2.0.
   *
   * Call this method to set an SDK preset voice beautifier effect for the local user who sends an audio stream.
   * After setting a voice beautifier effect, all users in the channel can hear the effect.
   *
   * You can set different voice beautifier effects for different scenarios.
   *
   * To achieve better audio effect quality, Agora recommends calling `setAudioProfile` and setting the scenario parameter to `GameStreaming(3)` and the profile parameter to `MusicHighQuality(4)` or `MusicHighQualityStereo(5)` before calling this method.
   *
   * **Note**
   * - You can call this method either before or after joining a channel.
   * - Do not set the `profile` parameter of `setAudioProfile` to `SpeechStandard(1)`; otherwise, this method call does not take effect.
   * - This method works best with the human voice. Agora does not recommend using this method for audio containing music.
   * - After calling this method, Agora recommends not calling the following methods, because they can override `setVoiceBeautifierPreset`:
   *    - `setAudioEffectPreset`
   *    - `setAudioEffectParameters`
   *    - `setLocalVoiceReverbPreset`
   *    - `setLocalVoiceChanger`
   *    - `setLocalVoicePitch`
   *    - `setLocalVoiceEqualization`
   *    - `setLocalVoiceReverb`
   *    - `setVoiceConversionPreset`
   *
   * @param preset The options for SDK preset voice beautifier effects. See [`VoiceBeautifierPreset`]{@link VoiceBeautifierPreset}.
   *
   */
  setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): Promise<void> {
    return RtcEngine._callMethod('setVoiceBeautifierPreset', { preset });
  }

  /**
   * Sets an SDK preset voice conversion effect.
   *
   * @since v3.3.1
   *
   * Call this method to set an SDK preset voice conversion effect for the local user who sends an audio stream. After setting a voice conversion effect, all users in the channel can hear the effect.
   *
   * You can set different voice conversion effects for different scenarios. See *Set the Voice Effect*.
   *
   * To achieve better audio effect quality, Agora recommends calling [`setAudioProfile`]{@link setAudioProfile} and setting the `scenario` parameter to `GameStreaming(3)` and the `profile` parameter to `MusicHighQuality(4)` or `MusicHighQualityStereo(5)` before calling this method.
   *
   * @note
   * - You can call this method either before or after joining a channel.
   * - Do not set the `profile` parameter of `setAudioProfile` to `SpeechStandard(1)`; otherwise, this method call does not take effect.
   * - This method works best with the human voice. Agora does not recommend using this method for audio containing music.
   * - After calling this method, Agora recommends not calling the following methods, because they can override [`setVoiceConversionPreset`]{@link setVoiceConversionPreset}:
   *   - `setAudioEffectPreset`
   *   - `setAudioEffectParameters`
   *   - `setVoiceBeautifierPreset`
   *   - `setVoiceBeautifierParameters`
   *   - `setLocalVoiceReverbPreset`
   *   - `setLocalVoiceChanger`
   *   - `setLocalVoicePitch`
   *   - `setLocalVoiceEqualization`
   *   - `setLocalVoiceReverb`
   *
   * @param preset The options for SDK preset voice conversion effects. See [`VoiceConversionPreset`]{@link VoiceConversionPreset}.
   *
   */
  setVoiceConversionPreset(preset: VoiceConversionPreset): Promise<void> {
    return RtcEngine._callMethod('setVoiceConversionPreset', { preset });
  }

  /**
   * Pauses the media stream relay to all destination channels.
   *
   * @since v3.5.1
   *
   * After the cross-channel media stream relay starts, you can call this method
   * to pause relaying media streams to all destination channels; after the pause,
   * if you want to resume the relay, call \ref IRtcEngine::resumeAllChannelMediaRelay "resumeAllChannelMediaRelay".
   *
   * After a successful method call, the SDK triggers the
   * \ref IRtcEngineEventHandler::onChannelMediaRelayEvent "onChannelMediaRelayEvent"
   * callback to report whether the media stream relay is successfully paused.
   *
   * @note Call this method after the \ref IRtcEngine::startChannelMediaRelay "startChannelMediaRelay" method.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  pauseAllChannelMediaRelay(): Promise<void> {
    return RtcEngine._callMethod('pauseAllChannelMediaRelay');
  }

  /** Resumes the media stream relay to all destination channels.
   *
   * @since v3.5.1
   *
   * After calling the \ref IRtcEngine::pauseAllChannelMediaRelay "pauseAllChannelMediaRelay" method,
   * you can call this method to resume relaying media streams to all destination channels.
   *
   * After a successful method call, the SDK triggers the
   * \ref IRtcEngineEventHandler::onChannelMediaRelayEvent "onChannelMediaRelayEvent"
   * callback to report whether the media stream relay is successfully resumed.
   *
   * @note Call this method after the \ref IRtcEngine::pauseAllChannelMediaRelay "pauseAllChannelMediaRelay" method.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  resumeAllChannelMediaRelay(): Promise<void> {
    return RtcEngine._callMethod('resumeAllChannelMediaRelay');
  }

  /**
   * Enables/Disables the virtual background function. (beta function)
   *
   * @since v3.5.0.3
   *
   * After enabling the virtual background function, you can replace the original background image of the local user with a custom background image.
   * After the replacement, all users in the channel can see the custom background image. You can find out from the
   * [`VirtualBackgroundSourceEnabled`]{@link RtcChannelEvents.VirtualBackgroundSourceEnabled} callback whether the virtual background is successfully enabled or the cause of any errors.
   *
   * **Note**
   * - Call this method after [`enableVideo`]{@link enableVideo}.
   * - This functions requires a high-performance device. Agora recommends that you use this function on the following devices:
   *   - Android: Devices with the following chips:
   *     - Snapdragon 700 series 750G and later
   *     - Snapdragon 800 series 835 and later
   *     - Dimensity 700 series 720 and later
   *     - Kirin 800 series 810 and later
   *     - Kirin 900 series 980 and later
   *   - iOS: Devices with an A9 chip and better, as follows:
   *     - iPhone 6S and later
   *     - iPad Air (3rd generation) and later
   *     - iPad (5th generation) and later
   *     - iPad Pro (1st generation) and later
   *     - iPad mini (5th generation) and later
   * - Agora recommends that you use this function in scenarios that meet the following conditions:
   *   - A high-definition camera device is used, and the environment is uniformly lit.
   *   - The captured video image is uncluttered, the user's portrait is half-length and largely unobstructed, and the background is a single color that differs from the color of the user's clothing.
   *
   * @param enabled Sets whether to enable the virtual background:
   * - `true`: Enable.
   * - `false`: Disable.
   * @param backgroundSource The custom background image. See [`VirtualBackgroundSource`]{@link VirtualBackgroundSource}.
   * Note: To adapt the resolution of the custom background image to the resolution of the SDK capturing video, the SDK scales and crops the custom background image while ensuring that the content of the custom background image is not distorted.
   *
   */
  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource
  ): Promise<void> {
    return RtcEngine._callMethod('enableVirtualBackground', {
      enabled,
      backgroundSource,
    });
  }

  /** Gets the information of a specified audio file.
   *
   * @since v3.5.1
   *
   * After calling this method successfully, the SDK triggers the
   * \ref IRtcEngineEventHandler::onRequestAudioFileInfo "onRequestAudioFileInfo"
   * callback to report the information of an audio file, such as audio duration.
   * You can call this method multiple times to get the information of multiple audio files.
   *
   * @note
   * - Call this method after joining a channel.
   * - For the audio file formats supported by this method, see [What formats of audio files does the Agora RTC SDK support](https://docs.agora.io/en/faq/audio_format).
   *
   * @param filePath The file path:
   * - Windows: The absolute path or URL address (including the filename extensions) of
   * the audio file. For example: `C:\music\audio.mp4`.
   * - Android: The file path, including the filename extensions. To access an online file,
   * Agora supports using a URL address; to access a local file, Agora supports using a URI
   * address, an absolute path, or a path that starts with `/assets/`. You might encounter
   * permission issues if you use an absolute path to access a local file, so Agora recommends
   * using a URI address instead. For example: `content://com.android.providers.media.documents/document/audio%3A14441`.
   * - iOS or macOS: The absolute path or URL address (including the filename extensions) of the audio file.
   * For example: `/var/mobile/Containers/Data/audio.mp4`.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  getAudioFileInfo(filePath: string): Promise<void> {
    return RtcEngine._callMethod('getAudioFileInfo', {
      filePath,
    });
  }

  /**
   * Gets the audio track index of the current music file.
   *
   * @since v3.5.1
   *
   * @note
   * - This method is for Android, iOS, and Windows only.
   * - Call this method after calling \ref IRtcEngine::startAudioMixing(const char*,bool,bool,int,int) "startAudioMixing" [2/2]
   * and receiving the \ref IRtcEngineEventHandler::onAudioMixingStateChanged "onAudioMixingStateChanged" (AUDIO_MIXING_STATE_PLAYING) callback.
   * - For the audio file formats supported by this method, see [What formats of audio files does the Agora RTC SDK support](https://docs.agora.io/en/faq/audio_format).
   *
   * @return
   * - ≥ 0: The audio track index of the current music file, if this method call succeeds.
   * - < 0: Failure.
   */
  getAudioTrackCount(): Promise<number> {
    return RtcEngine._callMethod('getAudioTrackCount');
  }

  /**
   * Specifies the playback track of the current music file.
   *
   * @since v3.5.1
   *
   * After getting the audio track index of the current music file, call this
   * method to specify any audio track to play. For example, if different tracks
   * of a multitrack file store songs in different languages, you can call this
   * method to set the language of the music file to play.
   *
   * @note
   * - This method is for Android, iOS, and Windows only.
   * - Call this method after calling \ref IRtcEngine::startAudioMixing(const char*,bool,bool,int,int) "startAudioMixing" [2/2]
   * and receiving the \ref IRtcEngineEventHandler::onAudioMixingStateChanged "onAudioMixingStateChanged" (AUDIO_MIXING_STATE_PLAYING) callback.
   * - For the audio file formats supported by this method, see [What formats of audio files does the Agora RTC SDK support](https://docs.agora.io/en/faq/audio_format).
   *
   * @param index The specified playback track. This parameter must be less than or equal to the return value
   * of \ref IRtcEngine::getAudioTrackCount "getAudioTrackCount".
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  selectAudioTrack(index: number): Promise<void> {
    return RtcEngine._callMethod('selectAudioTrack', {
      index,
    });
  }

  /**
   * Sets the channel mode of the current music file.
   *
   * @since v3.5.1
   *
   * In a stereo music file, the left and right channels can store different audio data.
   * According to your needs, you can set the channel mode to original mode, left channel mode,
   * right channel mode, or mixed channel mode. For example, in the KTV scenario, the left
   * channel of the music file stores the musical accompaniment, and the right channel
   * stores the singing voice. If you only need to listen to the accompaniment, call this
   * method to set the channel mode of the music file to left channel mode; if you need to
   * listen to the accompaniment and the singing voice at the same time, call this method
   * to set the channel mode to mixed channel mode.
   *
   * @note
   * - Call this method after calling \ref IRtcEngine::startAudioMixing(const char*,bool,bool,int,int) "startAudioMixing" [2/2]
   * and receiving the \ref IRtcEngineEventHandler::onAudioMixingStateChanged "onAudioMixingStateChanged" (AUDIO_MIXING_STATE_PLAYING) callback.
   * - This method only applies to stereo audio files.
   *
   * @param mode The channel mode. See \ref agora::media::AUDIO_MIXING_DUAL_MONO_MODE "AUDIO_MIXING_DUAL_MONO_MODE".
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): Promise<void> {
    return RtcEngine._callMethod('setAudioMixingDualMonoMode', {
      mode,
    });
  }

  /**
   * Sets the playback speed of the current music file.
   *
   * @since v3.5.1
   *
   * @note Call this method after calling \ref IRtcEngine::startAudioMixing(const char*,bool,bool,int,int) "startAudioMixing" [2/2]
   * and receiving the \ref IRtcEngineEventHandler::onAudioMixingStateChanged "onAudioMixingStateChanged" (AUDIO_MIXING_STATE_PLAYING) callback.
   *
   * @param speed The playback speed. Agora recommends that you limit this value to between 50 and 400, defined as follows:
   * - 50: Half the original speed.
   * - 100: The original speed.
   * - 400: 4 times the original speed.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  setAudioMixingPlaybackSpeed(speed: number): Promise<void> {
    return RtcEngine._callMethod('setAudioMixingPlaybackSpeed', {
      speed,
    });
  }

  /**
   * Takes a snapshot of a video stream.
   *
   * @since v3.5.2
   *
   * This method takes a snapshot of a video stream from the specified user, generates a JPG image,
   * and saves it to the specified path.
   *
   * The method is asynchronous, and the SDK has not taken the snapshot when the method call returns.
   * After a successful method call, the SDK triggers the \ref IRtcEngineEventHandler::onSnapshotTaken "onSnapshotTaken"
   * callback to report whether the snapshot is successfully taken as well as the details of the snapshot taken.
   *
   * @note
   * - Call this method after joining a channel.
   * - If the video of the specified user is pre-processed, for example, added with watermarks or image enhancement
   * effects, the generated snapshot also includes the pre-processing effects.
   *
   * @param channel The channel name.
   * @param uid The user ID of the user. Set `uid` as 0 if you want to take a snapshot of the local user's video.
   * @param filePath The local path (including the filename extensions) of the snapshot. For example,
   * `C:\Users\<user_name>\AppData\Local\Agora\<process_name>\example.jpg` on Windows,
   * `/App Sandbox/Library/Caches/example.jpg` on iOS, `～/Library/Logs/example.jpg` on macOS, and
   * `/storage/emulated/0/Android/data/<package name>/files/example.jpg` on Android. Ensure that the path you specify
   * exists and is writable.
   *
   * @return
   * - 0: Success.
   * - < 0: Failure.
   */
  takeSnapshot(channel: string, uid: number, filePath: string): Promise<void> {
    return RtcEngine._callMethod('takeSnapshot', {
      channel,
      uid,
      filePath,
    });
  }
}

/**
 * @ignore
 */
interface RtcEngineInterface
  extends RtcUserInfoInterface,
    RtcAudioInterface,
    RtcVideoInterface,
    RtcAudioMixingInterface,
    RtcAudioEffectInterface,
    RtcVoiceChangerInterface,
    RtcVoicePositionInterface,
    RtcPublishStreamInterface,
    RtcMediaRelayInterface,
    RtcAudioRouteInterface,
    RtcEarMonitoringInterface,
    RtcDualStreamInterface,
    RtcFallbackInterface,
    RtcTestInterface,
    RtcMediaMetadataInterface,
    RtcWatermarkInterface,
    RtcEncryptionInterface,
    RtcAudioRecorderInterface,
    RtcInjectStreamInterface,
    RtcCameraInterface,
    RtcStreamMessageInterface {
  destroy(): Promise<void>;

  setChannelProfile(profile: ChannelProfile): Promise<void>;

  setClientRole(role: ClientRole, options?: ClientRoleOptions): Promise<void>;

  joinChannel(
    token: string | undefined | null,
    channelName: string,
    optionalInfo: string | undefined | null,
    optionalUid: number,
    options?: ChannelMediaOptions
  ): Promise<void>;

  switchChannel(
    token: string | undefined | null,
    channelName: string,
    options?: ChannelMediaOptions
  ): Promise<void>;

  leaveChannel(): Promise<void>;

  renewToken(token: string): Promise<void>;

  enableWebSdkInteroperability(enabled: boolean): Promise<void>;

  getConnectionState(): Promise<ConnectionStateType>;

  sendCustomReportMessage(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number
  ): Promise<void>;

  getCallId(): Promise<string>;

  rate(callId: string, rating: Rate, description?: string): Promise<void>;

  complain(callId: string, description: string): Promise<void>;

  setLogFile(filePath: string): Promise<void>;

  setLogFilter(filter: LogFilter): Promise<void>;

  setLogFileSize(fileSizeInKBytes: number): Promise<void>;

  setParameters(parameters: string): Promise<void>;

  getNativeHandle(): Promise<number>;

  enableDeepLearningDenoise(enabled: boolean): Promise<void>;

  setCloudProxy(proxyType: CloudProxyType): Promise<void>;

  uploadLogFile(): Promise<string>;

  setLocalAccessPoint(ips: string[], domain: string): Promise<void>;

  enableVirtualBackground(
    enabled: boolean,
    backgroundSource: VirtualBackgroundSource
  ): Promise<void>;

  takeSnapshot(channel: string, uid: number, filePath: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcUserInfoInterface {
  registerLocalUserAccount(appId: string, userAccount: string): Promise<void>;

  joinChannelWithUserAccount(
    token: string,
    channelName: string,
    userAccount: string,
    options?: ChannelMediaOptions
  ): Promise<void>;

  getUserInfoByUserAccount(userAccount: string): Promise<UserInfo>;

  getUserInfoByUid(uid: number): Promise<UserInfo>;
}

/**
 * @ignore
 */
interface RtcAudioInterface {
  enableAudio(): Promise<void>;

  disableAudio(): Promise<void>;

  setAudioProfile(
    profile: AudioProfile,
    scenario: AudioScenario
  ): Promise<void>;

  adjustRecordingSignalVolume(volume: number): Promise<void>;

  adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;

  adjustPlaybackSignalVolume(volume: number): Promise<void>;

  enableLocalAudio(enabled: boolean): Promise<void>;

  muteLocalAudioStream(muted: boolean): Promise<void>;

  muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;

  muteAllRemoteAudioStreams(muted: boolean): Promise<void>;

  setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;

  enableAudioVolumeIndication(
    interval: number,
    smooth: number,
    report_vad: boolean
  ): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVideoInterface {
  enableVideo(): Promise<void>;

  disableVideo(): Promise<void>;

  setVideoEncoderConfiguration(
    config: VideoEncoderConfiguration
  ): Promise<void>;

  startPreview(): Promise<void>;

  stopPreview(): Promise<void>;

  enableLocalVideo(enabled: boolean): Promise<void>;

  muteLocalVideoStream(muted: boolean): Promise<void>;

  muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;

  muteAllRemoteVideoStreams(muted: boolean): Promise<void>;

  setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;

  setBeautyEffectOptions(
    enabled: boolean,
    options: BeautyOptions
  ): Promise<void>;

  enableRemoteSuperResolution(uid: number, enable: boolean): Promise<void>;
}

/**
 * @ignore
 */
interface RtcAudioMixingInterface {
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number,
    startPos?: number
  ): Promise<void>;

  stopAudioMixing(): Promise<void>;

  pauseAudioMixing(): Promise<void>;

  resumeAudioMixing(): Promise<void>;

  adjustAudioMixingVolume(volume: number): Promise<void>;

  adjustAudioMixingPlayoutVolume(volume: number): Promise<void>;

  adjustAudioMixingPublishVolume(volume: number): Promise<void>;

  getAudioMixingPlayoutVolume(): Promise<number>;

  getAudioMixingPublishVolume(): Promise<number>;

  getAudioMixingDuration(filePath?: string): Promise<number>;

  getAudioMixingCurrentPosition(): Promise<number>;

  setAudioMixingPosition(pos: number): Promise<void>;

  setAudioMixingPitch(pitch: number): Promise<void>;

  getAudioFileInfo(filePath: string): Promise<void>;

  setAudioMixingPlaybackSpeed(speed: number): Promise<void>;

  getAudioTrackCount(): Promise<number>;

  selectAudioTrack(audioIndex: number): Promise<void>;

  setAudioMixingDualMonoMode(mode: AudioMixingDualMonoMode): Promise<void>;
}

/**
 * @ignore
 */
interface RtcAudioEffectInterface {
  getEffectsVolume(): Promise<number>;

  setEffectsVolume(volume: number): Promise<void>;

  setVolumeOfEffect(soundId: number, volume: number): Promise<void>;

  playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: Boolean,
    startPos?: number
  ): Promise<void>;

  setEffectPosition(soundId: number, pos: number): Promise<void>;

  getEffectDuration(filePath: string): Promise<number>;

  getEffectCurrentPosition(soundId: number): Promise<number>;

  stopEffect(soundId: number): Promise<void>;

  stopAllEffects(): Promise<void>;

  preloadEffect(soundId: number, filePath: string): Promise<void>;

  unloadEffect(soundId: number): Promise<void>;

  pauseEffect(soundId: number): Promise<void>;

  pauseAllEffects(): Promise<void>;

  resumeEffect(soundId: number): Promise<void>;

  resumeAllEffects(): Promise<void>;

  setAudioSessionOperationRestriction(
    restriction: AudioSessionOperationRestriction
  ): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVoiceChangerInterface {
  setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void>;

  setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void>;

  setLocalVoicePitch(pitch: number): Promise<void>;

  setLocalVoiceEqualization(
    bandFrequency: AudioEqualizationBandFrequency,
    bandGain: number
  ): Promise<void>;

  setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): Promise<void>;

  setAudioEffectPreset(preset: AudioEffectPreset): Promise<void>;

  setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): Promise<void>;

  setVoiceConversionPreset(preset: VoiceConversionPreset): Promise<void>;

  setAudioEffectParameters(
    preset: AudioEffectPreset,
    param1: number,
    param2: number
  ): Promise<void>;

  setVoiceBeautifierParameters(
    preset: VoiceBeautifierPreset,
    param1: number,
    param2: number
  ): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVoicePositionInterface {
  enableSoundPositionIndication(enabled: boolean): Promise<void>;

  setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcPublishStreamInterface {
  setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;

  addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;

  removePublishStreamUrl(url: string): Promise<void>;
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
interface RtcAudioRouteInterface {
  setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void>;

  setEnableSpeakerphone(enabled: boolean): Promise<void>;

  isSpeakerphoneEnabled(): Promise<boolean>;
}

/**
 * @ignore
 */
interface RtcEarMonitoringInterface {
  enableInEarMonitoring(enabled: boolean): Promise<void>;

  setInEarMonitoringVolume(volume: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcDualStreamInterface {
  enableDualStreamMode(enabled: boolean): Promise<void>;

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
  setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void>;

  setRemoteSubscribeFallbackOption(
    option: StreamFallbackOptions
  ): Promise<void>;

  setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
}

/**
 * @ignore
 */
interface RtcTestInterface {
  startEchoTest(
    intervalInSeconds?: number,
    config?: EchoTestConfiguration
  ): Promise<void>;

  stopEchoTest(): Promise<void>;

  enableLastmileTest(): Promise<void>;

  disableLastmileTest(): Promise<void>;

  startLastmileProbeTest(config: LastmileProbeConfig): Promise<void>;

  stopLastmileProbeTest(): Promise<void>;
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
interface RtcWatermarkInterface {
  addVideoWatermark(
    watermarkUrl: string,
    options: WatermarkOptions
  ): Promise<void>;

  clearVideoWatermarks(): Promise<void>;
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
interface RtcAudioRecorderInterface {
  startAudioRecording(
    filePath: string,
    sampleRate: AudioSampleRateType,
    quality: AudioRecordingQuality
  ): Promise<void>;

  startAudioRecordingWithConfig(
    config: AudioRecordingConfiguration
  ): Promise<void>;

  startRhythmPlayer(
    sound1: string,
    sound2: string,
    config: RhythmPlayerConfig
  ): Promise<void>;

  stopRhythmPlayer(): Promise<void>;

  configRhythmPlayer(config: RhythmPlayerConfig): Promise<void>;

  stopAudioRecording(): Promise<void>;
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
interface RtcCameraInterface {
  switchCamera(): Promise<void>;

  isCameraZoomSupported(): Promise<boolean>;

  isCameraTorchSupported(): Promise<boolean>;

  isCameraFocusSupported(): Promise<boolean>;

  isCameraExposurePositionSupported(): Promise<boolean>;

  isCameraAutoFocusFaceModeSupported(): Promise<boolean>;

  setCameraZoomFactor(factor: number): Promise<void>;

  getCameraMaxZoomFactor(): Promise<number>;

  setCameraFocusPositionInPreview(
    positionX: number,
    positionY: number
  ): Promise<void>;

  setCameraExposurePosition(
    positionXinView: number,
    positionYinView: number
  ): Promise<void>;

  enableFaceDetection(enable: boolean): Promise<void>;

  setCameraTorchOn(isOn: boolean): Promise<void>;

  setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void>;

  setCameraCapturerConfiguration(
    config: CameraCapturerConfiguration
  ): Promise<void>;
}

/**
 * @ignore
 */
interface RtcStreamMessageInterface {
  createDataStream(reliable: boolean, ordered: boolean): Promise<number>;

  createDataStreamWithConfig(config: DataStreamConfig): Promise<number>;

  sendStreamMessage(streamId: number, message: string): Promise<void>;
}
