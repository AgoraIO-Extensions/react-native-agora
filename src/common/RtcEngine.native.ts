import { NativeEventEmitter, NativeModules } from 'react-native';

import {
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
  BeautyOptions,
  CameraCapturerConfiguration,
  ChannelMediaRelayConfiguration,
  ChannelProfile,
  ClientRole,
  ConnectionStateType,
  EncryptionConfig,
  EncryptionMode,
  LastmileProbeConfig,
  LiveInjectStreamConfig,
  LiveTranscoding,
  LogFilter,
  StreamFallbackOptions,
  UserInfo,
  UserPriority,
  VideoEncoderConfiguration,
  VideoStreamType,
  VoiceBeautifierPreset,
  WatermarkOptions,
} from '../Types';
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
   * Creates an [`RtcEngine`]{@link RtcEngine} instance.
   *
   * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * **Note**
   * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
   * - You can create an [`RtcEngine`]{@link RtcEngine} instance either by calling this method or by calling [`createWithAreaCode`]{@link createWithAreaCode}. The difference between [`createWithAreaCode`]{@link createWithAreaCode} and this method is that [`createWithAreaCode`]{@link createWithAreaCode} enables you to specify the connection area.
   * - The Agora React Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app.
   * @param appId The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
   * Only users in apps with the same App ID can join the same channel and communicate with each other.
   * Use an App ID to create only one [`RtcEngine`]{@link RtcEngine} instance. To change your App ID, call [`destroy`]{@link destroy} to destroy the current [`RtcEngine`]{@link RtcEngine} instance, and after [`destroy`]{@link destroy} returns `0`,
   * call `create` to create an [`RtcEngine`]{@link RtcEngine} instance with the new App ID.
   * @returns
   * - The `RtcEngine` instance, if the method call succeeds.
   * - The error code, if the method call fails.
   */
  static async create(appId: string): Promise<RtcEngine> {
    return RtcEngine.createWithAreaCode(appId, AreaCode.GLOB);
  }

  /**
   * Creates an [`RtcEngine`]{@link RtcEngine} instance.
   *
   * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
   *
   * **Note**
   *
   * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
   * - You can create an [`RtcEngine`]{@link RtcEngine} instance either by calling this method or by calling [`create`]{@link create}. The difference between [`create`]{@link create} and this method is that this method enables you to specify the connection area.
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
   */
  static async createWithAreaCode(
    appId: string,
    areaCode: AreaCode
  ): Promise<RtcEngine> {
    if (engine) return engine;
    await RtcEngine._callMethod('create', { appId, areaCode, appType: 8 });
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
    RtcEngineEvent.addListener(Prefix + event, callback);
    map.set(listener, callback);
    return {
      remove: () => {
        this.removeListener(event, listener);
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
    listener: RtcEngineEvents[EventType]
  ) {
    const map = this._listeners.get(event);
    if (map === undefined) return;
    RtcEngineEvent.removeListener(
      Prefix + event,
      map.get(listener) as Listener
    );
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
   * The Agora [`RtcEngine`]{@link RtcEngine} differentiates channel profiles and applies different optimization algorithms accordingly.
   * For example, it prioritizes smoothness and low latency for a video call, and prioritizes video quality for live interactive video streaming.
   * @param profile The channel profile of the Agora [`RtcEngine`]{@link RtcEngine}.
   */
  setChannelProfile(profile: ChannelProfile): Promise<void> {
    return RtcEngine._callMethod('setChannelProfile', { profile });
  }

  /**
   * Sets the role of a user ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only).
   *
   * This method sets the role of a user, such as a host or an audience (default), before joining a channel.
   *
   * This method can be used to switch the user role after a user joins a channel. In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile, when a user switches user roles after joining a channel, a successful call of this method triggers the following callbacks:
   * - The local client: [`ClientRoleChanged`]{@link RtcEngineEvents.ClientRoleChanged}.
   * - The remote client: [`UserJoined`]{@link RtcEngineEvents.UserJoined} or [`UserOffline`]{@link RtcEngineEvents.UserOffline} ([`BecomeAudience`]{@link UserOfflineReason.BecomeAudience}).
   *
   * @param role Sets the role of a user.
   */
  setClientRole(role: ClientRole): Promise<void> {
    return RtcEngine._callMethod('setClientRole', { role });
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
   * **Note**
   *
   * A channel does not accept duplicate uids, such as two users with the same `uid`. If you set `uid` as `0`, the system automatically assigns a uid.
   *
   * **Warning**
   *
   * Ensure that the App ID used for creating the token is the same App ID used in the `create` method for creating an [`RtcEngine`]{@link RtcEngine} object. Otherwise, CDN live streaming may fail.
   *
   * @param token The token for authentication:
   * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#get-a-temporary-token).
   * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
   * @param channelName The unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   * @param optionalInfo Additional information about the channel. This parameter can be set as null or contain channel related information. Other users in the channel do not receive this message.
   * @param optionalUid (Optional) User ID. A 32-bit unsigned integer with a value ranging from 1 to (2^32-1). `optionalUid` must be unique. If `optionalUid` is not assigned (or set to `0`), the SDK assigns and returns `uid` in the [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callback.
   * Your app must record and maintain the returned uid since the SDK does not do so.
   *
   * The uid is represented as a 32-bit unsigned integer in the SDK. Since unsigned integers are not supported by Java, the uid is handled as a 32-bit signed integer and larger numbers are interpreted as negative numbers in Java.
   * If necessary, the uid can be converted to a 64-bit integer through “uid&0xffffffffL”.
   */
  joinChannel(
    token: string | undefined | null,
    channelName: string,
    optionalInfo: string | undefined | null,
    optionalUid: number
  ): Promise<void> {
    return RtcEngine._callMethod('joinChannel', {
      token,
      channelName,
      optionalInfo,
      optionalUid,
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
   * **Note**
   *
   * This method applies to the [`Audience`]{@link ClientRole.Audience} role in a [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} channel only.
   *
   * @param token The token for authentication:
   * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#get-a-temporary-token).
   * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
   * @param channelName Unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
   * - All lowercase English letters: a to z.
   * - All uppercase English letters: A to Z.
   * - All numeric characters: 0 to 9.
   * - The space character.
   * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
   */
  switchChannel(
    token: string | undefined | null,
    channelName: string
  ): Promise<void> {
    return RtcEngine._callMethod('switchChannel', { token, channelName });
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
   * - If you call [`leaveChannel`]{@link leaveChannel} during CDN live streaming, the SDK triggers the [`removeInjectStreamUrl`]{@link removeInjectStreamUrl} method.
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
   */
  enableWebSdkInteroperability(enabled: boolean): Promise<void> {
    return RtcEngine._callMethod('enableWebSdkInteroperability', { enabled });
  }

  /**
   * Gets the connection state of the SDK.
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
   */
  rate(callId: string, rating: Rate, description?: string): Promise<void> {
    return RtcEngine._callMethod('rate', { callId, rating, description });
  }

  /**
   * Allows a user to complain about the call quality after a call ends.
   *
   * @param callId ID of the call retrieved from the [`getCallId`]{@link getCallId} method.
   * @param description (Optional) The description of the complaint. The string length must be less than 800 bytes.
   */
  complain(callId: string, description: string): Promise<void> {
    return RtcEngine._callMethod('complain', { callId, description });
  }

  /**
   * Sets the log files that the SDK outputs.
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
   * @param filePath File path of the log file. The string of the log file is in UTF-8. The default file path is `/storage/emulated/0/Android/data/<package name>="">/files/agorasdk.log`.
   */
  setLogFile(filePath: string): Promise<void> {
    return RtcEngine._callMethod('setLogFile', { filePath });
  }

  /**
   * Sets the output log level of the SDK.
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
   * **Note**
   *
   * To ensure smooth communication, use the same parameter type to identify the user.
   * For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account.
   * If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
   * @param token The token generated at your server:
   * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#get-a-temporary-token).
   * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
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
   */
  joinChannelWithUserAccount(
    token: string | undefined | null,
    channelName: string,
    userAccount: string
  ): Promise<void> {
    return RtcEngine._callMethod('joinChannelWithUserAccount', {
      token,
      channelName,
      userAccount,
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
   * @param volume The playback volume of all remote users. The value ranges from 0 to 400:
   * - 0: Mute.
   * - 100: The original volume.
   * - 400: (Maximum) Four times the original volume with signal clipping protection. To avoid echoes and improve call quality,
   * Agora recommends setting the value of volume between 0 and 100. If you need to set the value higher than 100, contact support@agora.io first.
   */
  adjustPlaybackSignalVolume(volume: number): Promise<void> {
    return RtcEngine._callMethod('adjustPlaybackSignalVolume', { volume });
  }

  /**
   * Adjusts the recording volume.
   *
   * @param volume Recording volume. The value ranges between 0 and 400:
   * - 0: Mute.
   * - 100: Original volume.
   * - 400: (Maximum) Four times the original volume with signal-clipping protection. To avoid echoes and improve call quality, Agora recommends setting the value of volume between 0 and 100.
   * If you need to set the value higher than 100, contact support@agora.io first.
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
   * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
   * You can call this method either before or after joining a channel.
   *
   * - This method resets the engine and takes some time to take effect.
   * We recommend using the following API methods to control the audio engine modules separately:
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
   * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
   * You can call this method either before or after joining a channel.
   *
   * - This method resets the internal engine and takes some time to take effect.
   * We recommend using the following API methods to control the audio engine modules separately:
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
   * - `false`: (Default) Disable the voice activity detection of the local user. Once it is enabled, the `vad` parameter of the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback does not report the voice activity status of the local user,
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
   * This method does not affect receiving or playing the remote audio streams, and `enableLocalAudio(false)` is applicable to scenarios
   * where the user wants to receive remote audio streams without sending any audio stream to other users in the channel.
   *
   * Once the local audio function is disabled or re-enabled, the SDK triggers the [`LocalAudioStateChanged`]{@link RtcEngineEvents.LocalAudioStateChanged} callback, which reports [`Stopped`]{@link AudioLocalState.Stopped} or [`Recording`]{@link AudioLocalState.Recording}.
   * The SDK triggers the [`LocalAudioStateChanged`]{@link RtcEngineEvents.LocalAudioStateChanged} callback once the local audio function is disabled or re-enabled.
   *
   * **Note**
   *
   * - This method is different from the [`muteLocalAudioStream`]{@link muteLocalAudioStream} method:
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
   * Stops/Resumes receiving all remote audio streams.
   *
   * @param muted Sets whether to receive/stop receiving all remote audio streams:
   * - `true`: Stop receiving all remote audio streams.
   * - `false`: (Default) Receive all remote audio streams.
   */
  muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteAllRemoteAudioStreams', { muted });
  }

  /**
   * Stops/Resumes sending the local audio stream.
   * A successful [`muteLocalAudioStream`]{@link muteLocalAudioStream} method call triggers the [`UserMuteAudio`]{@link RtcEngineEvents.UserMuteAudio} callback on the remote client.
   *
   * **Note**
   *
   * - When `muted` is set as ``true``, this method does not disable the microphone and thus does not affect any ongoing recording.
   * - If you call [`setChannelProfile`]{@link setChannelProfile} after this method, the SDK resets whether to mute the local audio according to the channel profile and user role.
   * Therefore, we recommend calling this method after the [`setChannelProfile`]{@link setChannelProfile} method.
   *
   * @param muted Sets whether to send/stop sending the local audio stream:
   * - `true`: Stop sending the local audio stream.
   * - `false`: (Default) Send the local audio stream.
   */
  muteLocalAudioStream(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteLocalAudioStream', { muted });
  }

  /**
   * Stops/Resumes receiving a specified audio stream.
   *
   * **Note**
   *
   * - If you called [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams} and set `muted` as `true` to stop receiving all remote video streams,
   * ensure that the [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams} method is called and set `muted` as `false` before calling this method.
   * The [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams} method sets all remote audio streams, while the [`muteRemoteAudioStream`]{@link muteRemoteAudioStream} method sets a specified remote user's audio stream.
   *
   * @param uid ID of the specified remote user.
   * @param muted Sets whether to receive/stop receiving the specified remote user's audio stream:
   * - `true`: Stop receiving the specified remote user’s audio stream.
   * - `false`: (Default) Receive the specified remote user’s audio stream.
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
   * - In scenarios requiring high-quality audio, we recommend setting profile as [`MusicHighQuality(4)`]{@link AudioProfile.MusicHighQuality} and scenario as [`GameStreaming(3)`]{@link AudioScenario.GameStreaming}.
   * For example, for music education scenarios.
   *
   * @param profile Sets the sample rate, bitrate, encoding mode, and the number of channels.
   * @param scenario Sets the audio application scenarios. Under different audio scenarios, the device uses different volume tracks, i.e. either the in-call volume or the media volume.
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
   * You can call this method either before or after joining a channel.
   * If you call `setDefaultMuteAllRemoteAudioStreams(true)` after joining a channel, you will not receive the audio streams of any subsequent user.
   *
   * **Note**
   *
   * If you want to resume receiving audio streams, call [`muteRemoteAudioStream(false)`]{@link muteRemoteAudioStream}, and specify the ID of the remote user that you want to subscribe to.
   * To resume audio streams of multiple users, call [`muteRemoteAudioStream`]{@link muteRemoteAudioStream} as many times.
   * Calling `setDefaultMuteAllRemoteAudioStreams(false)` resumes receiving audio streams of the subsequent users only.
   *
   * @param muted Sets whether to receive/stop receiving the remote audio streams by default:
   * - `true`: Stop receiving any audio stream by default.
   * - `false`: (Default) Receive all remote audio streams by default.
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
   * Stops/Resumes receiving all remote video streams.
   *
   * @param muted Sets whether to receive/stop receiving all remote video streams:
   * - `true`: Stop receiving all remote video streams.
   * - `false`: (Default) Receive all remote video streams.
   */
  muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteAllRemoteVideoStreams', { muted });
  }

  /**
   * Stops/Resumes sending the local video stream.
   *
   * A successful [`muteLocalVideoStream`]{@link muteLocalVideoStream} method call triggers the [`UserMuteVideo`]{@link RtcEngineEvents.UserMuteVideo} callback on the remote client.
   *
   * **Note**
   *
   * - When you set `muted` as `true`, this method does not disable the camera and thus does not affect the retrieval of the local video streams.
   * This method responds faster than calling [`enableLocalVideo`]{@link enableLocalVideo} and set `muted` as `false`, which controls sending the local video stream.
   *
   * - If you call [`setChannelProfile`]{@link setChannelProfile} after this method, the SDK resets whether to mute the local video according to the channel profile and user role.
   * Therefore, we recommend calling this method after the [`setChannelProfile`]{@link setChannelProfile} method.
   *
   * @param muted Sets whether to send/stop sending the local video stream:
   * - `true`: Stop sending the local video stream.
   * - `false`: (Default) Send the local video stream.
   */
  muteLocalVideoStream(muted: boolean): Promise<void> {
    return RtcEngine._callMethod('muteLocalVideoStream', { muted });
  }

  /**
   * Stops/Resumes receiving a specified remote user's video stream.
   *
   * **Note**
   *
   * If you call [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams} and set `muted` as `true` to stop receiving all remote video streams,
   * ensure that the [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams} method is called and set `muted` as `false` before calling this method. The [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams} method sets all remote streams, while this method sets a specified remote user's stream.
   *
   * @param uid User ID of the specified remote user.
   * @param muted Sets whether to receive/stop receiving a specified remote user's video stream:
   * - `true`: Stop receiving a specified remote user’s video stream.
   * - `false`: (Default) Receive a specified remote user’s video stream.
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
   * Sets whether to receive all remote video streams by default.
   *
   * You can call this method either before or after joining a channel.
   * If you call `setDefaultMuteAllRemoteVideoStreams(true)` after joining a channel, you will not receive the video stream of any subsequent user.
   *
   * **Note**
   *
   * If you want to resume receiving video streams, call [`muteRemoteVideoStream(false)`]{@link muteRemoteVideoStream}, and specify the ID of the remote user that you want to subscribe to.
   * To resume receiving video streams of multiple users, call [`muteRemoteVideoStream`]{@link muteRemoteVideoStream} as many times. Calling `setDefaultMuteAllRemoteVideoStreams(false)` resumes receiving video streams of the subsequent users only.
   *
   * @param muted Sets whether to receive/stop receiving all remote video streams by default:
   * - `true`: Stop receiving any remote video stream by default.
   * - `false`: (Default) Receive all remote video streams by default.
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
   */
  stopPreview(): Promise<void> {
    return RtcEngine._callMethod('stopPreview');
  }

  /**
   * Adjusts the volume of audio mixing for local playback.
   *
   * **Note**
   *
   * Call this method when you are in a channel.
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
   * Call this method when you are in a channel.
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
   * - Call this method when you are in a channel.
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
   *
   * Call this method when you are in a channel.
   *
   * @returns
   * - Returns the current playback position of the audio mixing, if the method call is successful.
   * - < 0: Failure.
   */
  getAudioMixingCurrentPosition(): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingCurrentPosition');
  }

  /**
   * Gets the duration (ms) of the music file.
   *
   * **Note**
   *
   * Call this method when you are in a channel.
   *
   *  @returns
   * - Returns the audio mixing duration, if the method call is successful.
   * - < 0: Failure.
   */
  getAudioMixingDuration(): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingDuration');
  }

  /**
   * Gets the audio mixing volume for local playback.
   *
   * This method helps troubleshoot audio volume related issues.
   *
   * @returns
   * - Returns the audio mixing volume for local playback, if the method call is successful. The value range is [0,100].
   * - < 0: Failure.
   */
  getAudioMixingPlayoutVolume(): Promise<number> {
    return RtcEngine._callMethod('getAudioMixingPlayoutVolume');
  }

  /**
   * Gets the audio mixing volume for publishing.
   *
   * This method helps troubleshoot audio volume related issues.
   *
   * @returns
   * - Returns the audio mixing volume for publishing, if the method call is successful. The value range is [0,100].
   * - < 0: Failure.
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
   * Call this method after calling [`startAudioMixing`]{@link startAudioMixing}.
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
   * - Call this method when you are in the channel, otherwise it may cause issues.
   *
   * - If you want to play an online music file, ensure that the time interval between calling this method is more than 100 ms, or the [`TooFrequentCall(702)`]{@link AudioMixingErrorCode.TooFrequentCall} error occurs.
   *
   * - If you want to play an online music file, Agora does not recommend using the redirected URL address. Some Android devices may fail to open a redirected URL address.
   *
   * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns [`CanNotOpen(701)`]{@link AudioMixingErrorCode.CanNotOpen}.
   *
   * - If you call this method on an emulator, only the MP3 file format is supported.
   *
   * @param filePath Specifies the absolute path (including the suffixes of the filename) of the local or online audio file to be mixed. For example, `/sdcard/emulated/0/audio.mp4`.
   * Supported audio formats: mp3, mp4, m4a, aac, 3gp, mkv, and wav.
   * - If the path begins with /assets/, the audio file is in the /assets/ directory.
   * - Otherwise, the audio file is in the absolute path.
   * @param loopback Sets which user can hear the audio mixing:
   * - `true`: Only the local user can hear the audio mixing.
   * - `false`: Both users can hear the audio mixing.
   * @param replace Sets the audio mixing content:
   * - `true`: Only publish the specified audio file; the audio stream from the microphone is not published.
   * - `false`: The local audio file is mixed with the audio stream from the microphone.
   * @param cycle Sets the number of playback loops:
   * - Positive integer: Number of playback loops.
   * - -1: Infinite playback loops.
   */
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number
  ): Promise<void> {
    return RtcEngine._callMethod('startAudioMixing', {
      filePath,
      loopback,
      replace,
      cycle,
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
   * - < 0: Failure.
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
   * @param filePath The absolute file path (including the suffixes of the filename) of the audio effect file or
   * the URL of the online audio effect file. For example, `/sdcard/emulated/0/audio.mp4`.
   *
   * Supported audio formats: mp3, mp4, m4a, aac. 3gp, mkv, and wav.
   * @param loopCount Sets the number of times the audio effect loops:
   * - 0: Plays the audio effect once.
   * - 1: Plays the audio effect twice.
   * - -1: Plays the audio effect in a loop indefinitely, until you call the [`stopEffect`]{@link stopEffect} or [`stopAllEffects`]{@link stopAllEffects} method.
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
   */
  playEffect(
    soundId: number,
    filePath: string,
    loopCount: number,
    pitch: number,
    pan: number,
    gain: number,
    publish: Boolean
  ): Promise<void> {
    return RtcEngine._callMethod('playEffect', {
      soundId,
      filePath,
      loopCount,
      pitch,
      pan,
      gain,
      publish,
    });
  }

  /**
   * Preloads a specified audio effect file into the memory.
   *
   * Supported audio formats: mp3, aac, m4a, 3gp, wav.
   *
   * **Note**
   * - This method does not support online audio effect files.
   *
   * - To ensure smooth communication, limit the size of the audio effect file.
   * We recommend using this method to preload the audio effect before calling [`joinChannel`]{@link joinChannel}.
   *
   * @param soundId ID of the audio effect. Each audio effect has a unique ID.
   * @param filePath Absolute path of the audio effect file.
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
   * @deprecated
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
   * Adds the [`setLocalVoiceReverbPreset`]{@link setLocalVoiceReverbPreset} method, a more user-friendly method for setting the
   * local voice reverberation. You can use this method to set the local reverberation effect,
   * such as Popular, R&B, Rock, Hip-hop, and more.
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
   * @deprecated
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
   * - This method requires hardware support. For the best sound positioning, we recommend using a stereo headset.
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
   * Publishes the local stream to the CDN.
   *
   * This method call triggers the [`RtmpStreamingStateChanged`]{@link RtcEngineEvents.RtmpStreamingStateChanged} callback on the local client to report the state of adding a local stream to the CDN.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - This method applies to [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only.
   * - Ensure that the user joins a channel before calling this method.
   * - This method adds only one stream HTTP/HTTPS URL address each time it is called.
   * @param url The CDN streaming URL in the RTMP format. The maximum length of this parameter is 1024 bytes.
   * The URL address must not contain special characters, such as Chinese language characters.
   * @param transcodingEnabled Sets whether transcoding is enabled/disabled.
   * If you set this parameter as `true`, ensure that you call [`setLiveTranscoding`]{@link setLiveTranscoding} before this method.
   *
   * - `true`: Enable transcoding. To transcode the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
   * - `false`: Disable transcoding.
   */
  addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
    return RtcEngine._callMethod('addPublishStreamUrl', {
      url,
      transcodingEnabled,
    });
  }

  /**
   * Removes an RTMP stream from the CDN.
   *
   * This method removes the RTMP URL address (added by [`addPublishStreamUrl`]{@link addPublishStreamUrl}) from a CDN live stream.
   * The SDK reports the result of this method call in the [`RtmpStreamingStateChanged`]{@link RtcEngineEvents.RtmpStreamingStateChanged} callback.
   *
   * **Note**
   * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
   * - Ensure that the user joins a channel before calling this method.
   * - This method applies to [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} only.
   * - This method removes only one stream RTMP URL address each time it is called.
   * @param url The RTMP URL address to be removed. The maximum length of this parameter is 1024 bytes.
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
   * or [`ServerConnectionLost(8)`]{@link ChannelMediaRelayError.ServerConnectionLost} state code.
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
   * @returns
   * - `true`: The speakerphone is enabled, and the audio plays from the speakerphone.
   * - `false`: The speakerphone is not enabled, and the audio plays from devices other than the speakerphone. For example, the headset or earpiece.
   */
  isSpeakerphoneEnabled(): Promise<boolean> {
    return RtcEngine._callMethod('isSpeakerphoneEnabled');
  }

  /**
   * Sets the default audio playback route.
   *
   * This method sets whether the received audio is routed to the earpiece or speakerphone
   * by default before joining a channel. If a user does not call this method,
   * the audio is routed to the earpiece by default. If you need to change the default audio route after
   * joining a channel, call [`setEnableSpeakerphone`]{@link setEnableSpeakerphone}.
   *
   * The default audio route for each scenario:
   * - In the [`Communication`]{@link ChannelProfile.Communication} profile:
   *
   *  - For a voice call, the default audio route is the earpiece.
   *  - For a video call, the default audio route is the speaker. If the user disables the video
   * using [`disableVideo`]{@link disableVideo}, or [`muteLocalVideoStream`]{@link muteLocalVideoStream} and [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams}, the default audio route automatically switches back to the earpiece.
   *
   * - In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile: The default audio route is the speaker.
   *
   * **Note**
   *
   * - This method applies to the [`Communication`]{@link ChannelProfile.Communication} profile only.
   * - Call this method before the user joins a channel.
   * @param defaultToSpeaker Sets the default audio route:
   * - `true`: Route the audio to the speaker. If the playback device connects to the earpiece or Bluetooth, the audio cannot be routed to the earpiece.
   * - `false`: (Default) Route the audio to the earpiece. If a headset is plugged in, the audio is routed to the headset.
   */
  setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void> {
    return RtcEngine._callMethod('setDefaultAudioRoutetoSpeakerphone', {
      defaultToSpeaker,
    });
  }

  /**
   * Enables/Disables the audio playback route to the speakerphone.
   *
   * This method sets whether the audio is routed to the speakerphone or earpiece.
   * After calling this method, the SDK returns the [`AudioRouteChanged`]{@link RtcEngineEvents.AudioRouteChanged} callback to indicate the changes.
   *
   * **Note**
   *
   * - Ensure that you have successfully called [`joinChannel`]{@link joinChannel} before calling this method.
   *
   * - This method is invalid for audience users in the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile.
   *
   * @param enabled Sets whether to route the audio to the speakerphone or earpiece:
   * - `true`: Route the audio to the speakerphone.
   * - `false`: Route the audio to the earpiece. If the headset is plugged in, the audio is routed to the headset.
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
   * After you join the channel, whether you have called [`disableLastmileTest`]{@link disableLastmileTest} or not, the SDK automatically stops consuming the bandwidth.
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
   * @param watermarkUrl The local file path of the watermark image to be added. This method supports adding a watermark image from either the local file path or the assets file path. If you use the assets file path, you need to start with `/assets/` when filling in this parameter.
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
   * All users in the same channel must use the same encryption mode and encryption key. Once all users leave the channel, the encryption key of this channel is automatically cleared.
   *
   * **Note**
   * - If you enable the built-in encryption, you cannot use the RTMP streaming function.
   * - Agora supports four encryption modes. If you choose an encryption mode (excepting `SM4128ECB` mode), you need to add an external encryption library when integrating the SDK. For details, see the advanced guide *Channel Encryption*.
   *
   *
   * @param enabled Whether to enable the built-in encryption.
   * - `true`: Enable the built-in encryption.
   * - `false`: Disable the built-in encryption.
   * @param config Configurations of built-in encryption schemas. See [`EncryptionConfig`]{@link EncryptionConfig}.
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

  /**
   * Stops the audio recording on the client.
   *
   * **Note**
   *
   * You can call this method before calling [`leaveChannel`]{@link leaveChannel};
   * else, the recording automatically stops when you call [`leaveChannel`]{@link leaveChannel}.
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
   * @returns The maximum camera zoom factor.
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
   * - < 0: Failure. The error code is related to the integer displayed in [Error Codes]{@link ErrorCode}.
   */
  createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
    return RtcEngine._callMethod('createDataStream', { reliable, ordered });
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
   * @param id
   * @param category
   * @param event
   * @param label
   * @param value
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
   */
  getNativeHandle(): Promise<number> {
    return RtcEngine._callMethod('getNativeHandle');
  }

  /**
   * TODO
   *
   * @param preset
   * @param param1
   * @param param2
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
   * TODO
   *
   * @param preset
   */
  setAudioEffectPreset(preset: AudioEffectPreset): Promise<void> {
    return RtcEngine._callMethod('setAudioEffectPreset', { preset });
  }

  /**
   * TODO
   *
   * @param preset
   */
  setVoiceBeautifierPreset(preset: VoiceBeautifierPreset): Promise<void> {
    return RtcEngine._callMethod('setVoiceBeautifierPreset', { preset });
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

  setClientRole(role: ClientRole): Promise<void>;

  joinChannel(
    token: string | undefined | null,
    channelName: string,
    optionalInfo: string | undefined | null,
    optionalUid: number
  ): Promise<void>;

  switchChannel(
    token: string | undefined | null,
    channelName: string
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
}

/**
 * @ignore
 */
interface RtcUserInfoInterface {
  registerLocalUserAccount(appId: string, userAccount: string): Promise<void>;

  joinChannelWithUserAccount(
    token: string,
    channelName: string,
    userAccount: string
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
}

/**
 * @ignore
 */
interface RtcAudioMixingInterface {
  startAudioMixing(
    filePath: string,
    loopback: boolean,
    replace: boolean,
    cycle: number
  ): Promise<void>;

  stopAudioMixing(): Promise<void>;

  pauseAudioMixing(): Promise<void>;

  resumeAudioMixing(): Promise<void>;

  adjustAudioMixingVolume(volume: number): Promise<void>;

  adjustAudioMixingPlayoutVolume(volume: number): Promise<void>;

  adjustAudioMixingPublishVolume(volume: number): Promise<void>;

  getAudioMixingPlayoutVolume(): Promise<number>;

  getAudioMixingPublishVolume(): Promise<number>;

  getAudioMixingDuration(): Promise<number>;

  getAudioMixingCurrentPosition(): Promise<number>;

  setAudioMixingPosition(pos: number): Promise<void>;

  setAudioMixingPitch(pitch: number): Promise<void>;
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
    publish: Boolean
  ): Promise<void>;

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

  setAudioEffectParameters(
    preset: AudioEffectPreset,
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
  startEchoTest(intervalInSeconds: number): Promise<void>;

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

  sendStreamMessage(streamId: number, message: string): Promise<void>;
}
