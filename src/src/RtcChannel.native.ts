import {NativeEventEmitter, NativeModules} from "react-native"

import {
    ChannelMediaOptions,
    ChannelMediaRelayConfiguration,
    ClientRole,
    ConnectionStateType,
    EncryptionMode,
    LiveInjectStreamConfig,
    LiveTranscoding,
    UserPriority,
    VideoStreamType
} from "../Types"
import {Listener, RtcChannelEvents, Subscription} from "./RtcEvents"

const {
    /**
     * @ignore
     */
    AgoraRtcChannelModule
} = NativeModules
/**
 * @ignore
 */
const Prefix = AgoraRtcChannelModule.prefix
/**
 * @ignore
 */
const RtcChannelEvent = new NativeEventEmitter(AgoraRtcChannelModule)

/**
 * @ignore
 */
const channels = new Map<string, RtcChannel>()

/**
 * The {@link RtcChannel} class.
 */
export default class RtcChannel implements RtcAudioInterface, RtcVideoInterface, RtcVoicePositionInterface,
    RtcPublishStreamInterface, RtcMediaRelayInterface, RtcDualStreamInterface, RtcFallbackInterface,
    RtcMediaMetadataInterface, RtcEncryptionInterface, RtcInjectStreamInterface, RtcStreamMessageInterface {
    /**
     * @ignore
     */
    private readonly _channelId: string
    /**
     * @ignore
     */
    private _listeners = new Map<string, Map<any, Listener>>()

    /**
     * @ignore
     */
    private constructor(channelId: string) {
        this._channelId = channelId
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
        if (channels.get(channelId)) return channels.get(channelId) as RtcChannel
        await AgoraRtcChannelModule.create(channelId)
        channels.set(channelId, new RtcChannel(channelId))
        return channels.get(channelId) as RtcChannel
    }

    /**
     * Destroys all [`RtcChannel`]{@link RtcChannel} instances.
     */
    static destroyAll() {
        channels.forEach(async (value) => {
            await value.destroy()
        })
        channels.clear()
    }

    /**
     * Destroys the [`RtcChannel`]{@link RtcChannel} instance.
     */
    destroy(): Promise<void> {
        this.removeAllListeners()
        channels.delete(this._channelId)
        return AgoraRtcChannelModule.destroy(this._channelId)
    }

    /**
     * Adds the [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
     *
     * After setting the [`RtcChannelEvents`]{@link RtcChannelEvents} handler, you can listen for channel events and receive the statistics of the corresponding [`RtcChannel`]{@link RtcChannel} instance.
     * @param event The event type.
     * @param listener The [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
     */
    addListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]): Subscription {
        const callback = (res: any) => {
            const {channelId, data} = res
            if (channelId === this._channelId) {
                // @ts-ignore
                listener(...data)
            }
        }
        let map = this._listeners.get(event)
        if (map === undefined) {
            map = new Map<Listener, Listener>()
            this._listeners.set(event, map)
        }
        RtcChannelEvent.addListener(Prefix + event, callback)
        map.set(listener, callback)
        return {
            remove: () => {
                this.removeListener(event, listener)
            }
        }
    }

    /**
     * Removes the [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
     *
     * For callback events that you only want to listen for once, call this method to remove the specific [`RtcEngineEvents`]{@link RtcEngineEvents} objects after you have received them.
     * @param event The event type.
     * @param listener The [`RtcChannelEvents`]{@link RtcChannelEvents} handler.
     */
    removeListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]) {
        const map = this._listeners.get(event)
        if (map === undefined) return
        RtcChannelEvent.removeListener(Prefix + event, map.get(listener) as Listener)
        map.delete(listener)
    }

    /**
     * Removes all the [`RtcChannelEvents`]{@link RtcChannelEvents} handlers.
     * @param event The event type.
     */
    removeAllListeners<EventType extends keyof RtcChannelEvents>(event?: EventType) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcChannelEvent.removeAllListeners(Prefix + key)
            })
            this._listeners.clear()
            return
        }
        RtcChannelEvent.removeAllListeners(Prefix + event)
        this._listeners.delete(event as string)
    }

    /**
     * Sets the role of a user.
     *
     * This method sets the role of a user, such as a host or an audience member. In a `LiveBroadcasting` channel,
     * only a host can call the [`publish`]{@link publish} method in the [`RtcChannel`]{@link RtcChannel} class.
     *
     * A successful call of this method triggers the following callbacks:
     * - The local client: [`ClientRoleChanged`]{@link RtcChannelEvents.ClientRoleChanged}.
     * - The remote client: [`UserJoined`]{@link RtcChannelEvents.UserJoined}
     * or [`UserOffline(BecomeAudience)`]{@link UserOfflineReason.BecomeAudience}.
     * @param role The role of the user.
     */
    setClientRole(role: ClientRole): Promise<void> {
        return AgoraRtcChannelModule.setClientRole(this._channelId, role)
    }

    /**
     * Joins the channel with a user ID.
     *
     * **Note**
     * - If you are already in a channel, you cannot rejoin it with the same UID.
     * - We recommend using different UIDs for different channels.
     * - If you want to join the same channel from different devices, ensure that the UIDs in all devices are different.
     * - Ensure that the app ID you use to generate the token is the same with the app ID used when creating the [`RtcEngine`]{@link RtcEngine} instance.
     *
     * @param token The token generated at your server.
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#get-a-temporary-token).
     * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
     * @param optionalInfo Additional information about the channel. This parameter can be set as null. Other users in the channel do not receive this information.
     * @param optionalUid The user ID. A 32-bit unsigned integer with a value ranging from 1 to (232-1). This parameter must be unique. If uid is not assigned (or set as 0), the SDK assigns a uid and reports it in the [`JoinChannelSuccess`]{@link RtcChannelEvents.JoinChannelSuccess} callback. The app must maintain this user ID.
     * @param options The channel media options.
     */
    joinChannel(token: string | null, optionalInfo: string | null, optionalUid: number, options: ChannelMediaOptions): Promise<void> {
        return AgoraRtcChannelModule.joinChannel(this._channelId, token, optionalInfo, optionalUid, options)
    }

    /**
     * Joins a channel with the user account.
     *
     * **Note**
     * - If you are already in a channel, you cannot rejoin it with the same user account.
     * - We recommend using different user accounts for different channels.
     * - If you want to join the same channel from different devices, ensure that the user accounts in all devices are different.
     * - Ensure that the app ID you use to generate the token is the same with the app ID used when creating the [`RtcEngine`]{@link RtcEngine} instance.
     *
     * @param token The token generated at your server.
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#get-a-temporary-token).
     * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
     * @param userAccount The user account. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as null.
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     * @param options The channel media options.
     */
    joinChannelWithUserAccount(token: string | null, userAccount: string, options: ChannelMediaOptions): Promise<void> {
        return AgoraRtcChannelModule.joinChannelWithUserAccount(this._channelId, token, userAccount, options)
    }

    /**
     * Leaves the current channel.
     *
     * A successful call of this method triggers the following callbacks:
     * - The local client: [`LeaveChannel`]{@link RtcChannelEvents.LeaveChannel}.
     * - The remote client: [`UserOffline`]{@link RtcChannelEvents.UserOffline}, if the user leaving the channel is in a `Communication` channel, or is a host in a `LiveBroadcasting` channel.
     */
    leaveChannel(): Promise<void> {
        return AgoraRtcChannelModule.leaveChannel(this._channelId)
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
     */
    renewToken(token: string): Promise<void> {
        return AgoraRtcChannelModule.renewToken(this._channelId, token)
    }

    /**
     * Gets the network connection state of the SDK.
     */
    getConnectionState(): Promise<ConnectionStateType> {
        return AgoraRtcChannelModule.getConnectionState(this._channelId)
    }

    /**
     * Publishes the local stream to the channel.
     * You must keep the following restrictions in mind when calling this method.
     * Otherwise, the SDK returns the [`Refused(-5)`]{@link ErrorCode.Refused}:
     * - This method publishes one stream only to the channel corresponding to the current [`RtcChannel`]{@link RtcChannel} instance.
     * - In a `LiveBroadcasting` channel, only a host can call this method. To switch the client role, call [`setClientRole`]{@link RtcChannel.setClientRole} of the current [`RtcChannel`]{@link RtcChannel} instance.
     * - You can publish a stream to only one channel at a time. For details, see the advanced guide *Join Multiple Channels*.
     */
    publish(): Promise<void> {
        return AgoraRtcChannelModule.publish(this._channelId)
    }

    /**
     * Stops publishing a stream to the channel.
     *
     * If you call this method in a channel where you are not publishing streams, the SDK returns [`Refused(-5)`]{@link ErrorCode.Refused}.
     */
    unpublish(): Promise<void> {
        return AgoraRtcChannelModule.unpublish(this._channelId)
    }

    /**
     * Gets the current call ID.
     *
     * @returns
     * - The current call ID, if the method call succeeds.
     * - The empty string "", if the method call fails.
     */
    getCallId(): Promise<string> {
        return AgoraRtcChannelModule.getCallId(this._channelId)
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
        return AgoraRtcChannelModule.adjustUserPlaybackSignalVolume(this._channelId, uid, volume)
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
        return AgoraRtcChannelModule.muteRemoteAudioStream(this._channelId, uid, muted)
    }

    /**
     * Stops/Resumes receiving all remote audio streams.
     *
     * @param muted Determines whether to receive/stop receiving all remote audio streams:
     * - `true`: Stop receiving all remote audio streams.
     * - `false`: (Default) Receive all remote audio streams.
     */
    muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.muteAllRemoteAudioStreams(this._channelId, muted)
    }

    /**
     * Sets whether to receive all remote audio streams by default.
     *
     * @param muted Determines whether to receive/stop receiving all remote audio streams by default:
     * - `true`: Stop receiving all remote audio streams by default.
     * - `false`: (Default) Receive all remote audio streams by default.
     */
    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.setDefaultMuteAllRemoteAudioStreams(this._channelId, muted)
    }

    /**
     * Stops/Resumes receiving all remote video streams.
     *
     * @param muted Determines whether to receive/stop receiving all remote video streams:
     * - `true`: Stop receiving all remote video streams.
     * - `false`: (Default) Receive all remote video streams.
     */
    muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.muteAllRemoteVideoStreams(this._channelId, muted)
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
        return AgoraRtcChannelModule.muteRemoteVideoStream(this._channelId, uid, muted)
    }

    /**
     * Sets whether to receive all remote video streams by default.
     *
     * @param muted Determines whether to receive/stop receiving all remote video streams by default:
     * - `true`: Stop receiving all remote video streams by default.
     * - `false`: (Default) Receive all remote video streams by default.
     */
    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.setDefaultMuteAllRemoteVideoStreams(this._channelId, muted)
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
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void> {
        return AgoraRtcChannelModule.setRemoteVoicePosition(this._channelId, uid, pan, gain)
    }

    /**
     * Publishes the local stream to the CDN.
     *
     * This method call triggers the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged}
     * callback on the local client to report the state of adding a local stream to the CDN.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - Ensure that the user joins a channel before calling this method.
     * - This method can only be called by a host in a `LiveBroadcasting` channel.
     * - This method adds only one stream HTTP/HTTPS URL address each time it is called.
     *
     * @param url The CDN streaming URL in the RTMP format. The maximum length of this parameter is 1024 bytes. The URL address must not contain special characters, such as Chinese language characters.
     * @param transcodingEnabled Sets whether transcoding is enabled/disabled. If you set this parameter as true,
     * ensure that you call the [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} method before this method.
     * - `true`: Enable transcoding. To transcode the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
     * - `false`: Disable transcoding.
     */
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
        return AgoraRtcChannelModule.addPublishStreamUrl(this._channelId, url, transcodingEnabled)
    }

    /**
     * Removes an RTMP stream from the CDN.
     *
     * This method removes the RTMP URL address (added by [`addPublishStreamUrl`]{@link RtcChannel.addPublishStreamUrl}) from a CDN live stream.
     * The SDK reports the result of this method call in the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} callback.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - This method can only be called by a host in a `LiveBroadcasting` channel.
     * - This method removes only one stream HTTP/HTTPS URL address each time it is called.
     *
     * @param url The RTMP URL address to be removed. The maximum length of this parameter is 1024 bytes. The URL address must not contain special characters,
     * such as Chinese language characters.
     */
    removePublishStreamUrl(url: string): Promise<void> {
        return AgoraRtcChannelModule.removePublishStreamUrl(this._channelId, url)
    }

    /**
     * Sets the video layout and audio settings for CDN live.
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
     *
     * @param transcoding Sets the CDN live audio/video transcoding settings.
     */
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
        return AgoraRtcChannelModule.setLiveTranscoding(this._channelId, transcoding)
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
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return AgoraRtcChannelModule.startChannelMediaRelay(this._channelId, channelMediaRelayConfiguration)
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
        return AgoraRtcChannelModule.stopChannelMediaRelay(this._channelId)
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
    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return AgoraRtcChannelModule.updateChannelMediaRelay(this._channelId, channelMediaRelayConfiguration)
    }

    /**
     * Sets the default video-stream type of the remote video stream when the remote user sends dual streams.
     *
     * @param streamType Sets the default video-stream type.
     */
    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
        return AgoraRtcChannelModule.setRemoteDefaultVideoStreamType(this._channelId, streamType)
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
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void> {
        return AgoraRtcChannelModule.setRemoteVideoStreamType(this._channelId, uid, streamType)
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
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void> {
        return AgoraRtcChannelModule.setRemoteUserPriority(this._channelId, uid, userPriority)
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
        return AgoraRtcChannelModule.registerMediaMetadataObserver(this._channelId)
    }

    /**
     * Sends the metadata.
     *
     * @param metadata The metadata to be sent.
     */
    sendMetadata(metadata: string): Promise<void> {
        return AgoraRtcChannelModule.sendMetadata(this._channelId, metadata)
    }

    /**
     * Sets the maximum size of the metadata.
     *
     * @param size Buffer size of the sent or received metadata.
     */
    setMaxMetadataSize(size: number): Promise<void> {
        return AgoraRtcChannelModule.setMaxMetadataSize(this._channelId, size)
    }

    /**
     * Unregisters the metadata observer.
     */
    unregisterMediaMetadataObserver(): Promise<void> {
        return AgoraRtcChannelModule.unregisterMediaMetadataObserver(this._channelId)
    }

    /**
     * Sets the built-in encryption mode.
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
        return AgoraRtcChannelModule.setEncryptionMode(this._channelId, encryptionMode)
    }

    /**
     * Enables built-in encryption with an encryption password before joining a channel.
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
        return AgoraRtcChannelModule.setEncryptionSecret(this._channelId, secret)
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
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - This method can only be called by a host in a `LiveBroadcasting` channel.
     *
     * @param url The URL address to be added to the ongoing live interactive streaming. Valid protocols are RTMP, HLS, and FLV.
     * - Supported FLV audio codec type: AAC.
     * - Supported FLV video codec type: H264 (AVC).
     * @param config The [`LiveInjectStreamConfig`]{@link LiveInjectStreamConfig} object, which contains the configuration information for the added voice or video stream.
     */
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void> {
        return AgoraRtcChannelModule.addInjectStreamUrl(this._channelId, url, config)
    }

    /**
     * Removes the injected online media stream from a `LiveBroadcasting` channel.
     *
     * This method removes the URL address added by [`addInjectStreamUrl`]{@link RtcChannel.addInjectStreamUrl}.
     *
     * If you successfully remove the URL address from the live interactive streaming, the SDK triggers the
     * [`UserJoined`]{@link RtcChannelEvents.UserJoined} callback, with the stream uid of 666.
     *
     * @param url The URL address to be removed.
     */
    removeInjectStreamUrl(url: string): Promise<void> {
        return AgoraRtcChannelModule.removeInjectStreamUrl(this._channelId, url)
    }

    /**
     * Creates a data stream.
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
     * - < 0: Failure. The error code is related to the integer displayed in [Error Codes]{@link ErrorCode}.
     */
    createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
        return AgoraRtcChannelModule.createDataStream(this._channelId, reliable, ordered)
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
        return AgoraRtcChannelModule.sendStreamMessage(this._channelId, streamId, message)
    }
}

/**
 * @ignore
 */
interface RtcAudioInterface {
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>

    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>

    muteAllRemoteAudioStreams(muted: boolean): Promise<void>

    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>
}

/**
 * @ignore
 */
interface RtcVideoInterface {
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>

    muteAllRemoteVideoStreams(muted: boolean): Promise<void>

    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>
}

/**
 * @ignore
 */
interface RtcVoicePositionInterface {
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>
}

/**
 * @ignore
 */
interface RtcPublishStreamInterface {
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>

    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>

    removePublishStreamUrl(url: string): Promise<void>
}

/**
 * @ignore
 */
interface RtcMediaRelayInterface {
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>

    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>

    stopChannelMediaRelay(): Promise<void>
}

/**
 * @ignore
 */
interface RtcDualStreamInterface {
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>

    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>
}

/**
 * @ignore
 */
interface RtcFallbackInterface {
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>
}

/**
 * @ignore
 */
interface RtcMediaMetadataInterface {
    registerMediaMetadataObserver(): Promise<void>

    unregisterMediaMetadataObserver(): Promise<void>

    setMaxMetadataSize(size: number): Promise<void>

    sendMetadata(metadata: string): Promise<void>
}

/**
 * @ignore
 */
interface RtcEncryptionInterface {
    setEncryptionSecret(secret: string): Promise<void>

    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>
}

/**
 * @ignore
 */
interface RtcInjectStreamInterface {
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void>

    removeInjectStreamUrl(url: string): Promise<void>
}

/**
 * @ignore
 */
interface RtcStreamMessageInterface {
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>

    sendStreamMessage(streamId: number, message: string): Promise<void>
}
