"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const { Agora } = react_native_1.NativeModules;
const AgoraEventEmitter = new react_native_1.NativeEventEmitter(Agora);
/**
 * RtcEngine is the javascript object for control agora native sdk through react native bridge.
 *
 * You can use the RtcEngine methods to create {@link init}
 *
 * Other methods of the RtcEngine object serve for agora native sdk and set up error logging.
 */
class RtcEngine {
    /**
     * Creates a RtcEngine Object internal.
     *
     * This method creates and start event observer. You should call this method once.
     * @example `RtcEngine.init(option)`
     * @param options Defines the property of the client, see {@link Option} for details.
     */
    static init(options) {
        Agora.init(options);
    }
    /**
     * join specified channel
     *
     * This method joins and begin rendering the video stream. when join succeeds.
     * Otherwise, it will invoke error by the event
     * @param channelName
     * @param uid
     * @param token
     * @param info
     */
    static joinChannel(channelName, uid, token, info) {
        return Agora.joinChannel({ channelName, uid, token, info });
    }
    /**
     * switch to specified channel
     *
     * This method will switch channel smoothly than you invoke leaveChannel & joinChannel.
     * Otherwise, it will invoke error by the event
     * It will occurs two events:
     * Occurs leaveChannel when achieve leaving stage
     * Occurs joinChannelSuccess when achieve joining stage
     * @param channelName
     * @param token
     */
    static switchChannel(channelName, token) {
        return Agora.switchChannel({ channelName, token });
    }
    /**
     * Starts to relay media streams across channels.
     *
     * This method will start relay media stream across specified channels. (maximum support 4 channels)
     * It will occurs event:
     *  Occurs onChannelMediaRelayStateChanged
     * @param config
     */
    static startChannelMediaRelay(config) {
        return Agora.startChannelMediaRelay(config);
    }
    /**
     * Remove to relay media streams across channels.
     *
     * This method will remove & update relay media stream across specified channels. (maximum support relay 4 channels)
     * It will occurs event:
     *  Occurs onChannelMediaRelayStateChanged
     * @param config
     */
    static removeChannelMediaRelay(config) {
        return Agora.removeChannelMediaRelay(config);
    }
    /**
     * Updates to relay media streams across channels.
     *
     * This method will update relay media stream across specified channels. (maximum support 4 channels)
     * It will occurs event:
     *  Occurs onChannelMediaRelayStateChanged
     * @param config
     */
    static updateChannelMediaRelay(config) {
        return Agora.updateChannelMediaRelay(config);
    }
    /**
     * Stop to relay media streams across channels.
     *
     * This method will stop relay media stream across specified channels.
     * It will occurs event:
     *  Occurs onChannelMediaRelayStateChanged
     * @param config
     */
    static stopChannelMediaRelay() {
        return Agora.stopChannelMediaRelay();
    }
    /**
     * Registers a user account.
     *
     * Once registered, the user account can be used to identify the local user when the user joins the channel. After the user successfully registers a user account, the SDK triggers the `on("localUserRegistered", callback)` on the local client, reporting the user ID and user account of the local user.
     * To join a channel with a user account, you can choose either of the following:
     * Call the {@link registerLocalUserAccount} method to create a user account, and then the {@link joinChannelWithUserAccount} method to join the channel.
     * Call the {@link joinChannelWithUserAccount} method to join the channel.
     *
     * @note To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
     *
     * @param userAccount
     * @returns Promise<any>
     */
    static registerLocalUserAccount(userAccount) {
        return Agora.registerLocalUserAccount({ userAccount });
    }
    /**
     * Joins the channel with a user account.
     *
     * After the user successfully joins the channel, the SDK triggers the following callbacks:
     *
     * The local client: `on("localUserRegistered", callback)` and `on("joinChannelSuccess", callback)`.
     * The remote client: `on("userJoined", callback)` and `on("userInfoUpdated", callback)`, if the user joining the channel is in the Communication profile, or is a BROADCASTER in the Live Broadcast profile.
     *
     * @note To ensure smooth communication, use the same parameter type to identify the user. For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
     *
     * @param channelName
     * @param userAccount
     * @param token
     * @returns Promise<any>
     */
    static joinChannelWithUserAccount(channelName, userAccount, token) {
        return Agora.joinChannelWithUserAccount({ channelName, userAccount, token });
    }
    /**
     * Gets the user information by passing in the user account.
     *
     * After receiving the "userInfoUpdated" callback, you can call this method to get the user ID of the remote user from the {@link AgoraUserInfo} object by passing in the userAccount.
     * @param uid
     * @returns Promise<{@link AgoraUserInfo}>
     */
    static getUserInfoByUid(uid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (react_native_1.Platform.OS === 'android') {
                const _uid = this.Uint32ToInt32(uid);
                let result = yield Agora.getUserInfoByUid(_uid);
                result.uid = this.Int32ToUint32(result.uid);
                return result;
            }
            return Agora.getUserInfoByUid(uid);
        });
    }
    /**
     * Gets the user information by passing in the user account.
     *
     * After receiving the "userInfoUpdated" callback, you can call this method to get the user ID of the remote user from the {@link AgoraUserInfo} object by passing in the userAccount.
     * @param userAccount
     * @returns Promise<{@link AgoraUserInfo}>
     */
    static getUserInfoByUserAccount(userAccount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (react_native_1.Platform.OS === 'android') {
                let result = yield Agora.getUserInfoByUserAccount(userAccount);
                result.uid = this.Int32ToUint32(result.uid);
                return result;
            }
            return Agora.getUserInfoByUserAccount(userAccount);
        });
    }
    /**
     * add event listener
     *
     * This method subscribes specified eventType and run listener. You should call this method at first.
     *
     * @event listener
     *
     * ---
     * name | description | usage |
     * error | occurs when emit error  | on("error", evt) |
     * warning | occurs when emit warning | on("warning", evt) |
     * messageReceived | occurs when message received | on("messageReceived", evt) |
     * localInvitationReceivedByPeer | occurs when local inviation received by peer | on("localInvitationReceivedByPeer", evt) |
     * localInvitationAccepted | occurs when local invitation accepted | on("localInvitationAccepted", evt) |
     * localInvitationRefused | occurs when local invitation refused | on("localInvitationRefused", evt) |
     * localInvitationCanceled | occurs when local invitation canceled | on("localInvitationCanceled", evt) |
     * localInvitationFailure | occurs when local invitation failure | on("localInvitationFailure", evt) |
     * remoteInvitationFailure | occurs when remote invitation failure | on("remoteInvitationFailure", evt) |
     * remoteInvitationReceived | occurs when remote invitation received | on("remoteInvitationReceived", evt) |
     * remoteInvitationAccepted | occurs when remote invitation accepted | on("remoteInvitationAccepted", evt) |
     * remoteInvitationRefused | occurs when remote invitation refused | on("remoteInvitationRefused", evt) |
     * remoteInvitationCanceled | occurs when remote invitation canceled | on("remoteInvitationCanceled", evt) |
     * channelMessageReceived | occurs when received channel message | on("channelMessageReceived", evt) |
     * channelMemberJoined | occurs when some one joined in the subscribed channel | on("channelMemberJoined", evt) |
     * channelMemberLeft | occurs when sone one left from u subscribed channel | on("channelMemberLeft", evt) |
     * tokenExpired | occurs when token has expired | on("tokenExpired", evt) |
     * apiCallExecute | occurs when apiCallExecute emit, this event is api call monitor | on("apiCallExecute", evt) |
     * joinChannelSuccess | occurs when joinChannel success | on("joinChannelSuccess", evt) |
     * rejoinChannelSuccess | occurs when rejoinChannel success | on("rejoinChannelSuccess", evt) |
     * leaveChannel | occurs when leaveChannel success | on("leaveChannel", evt) |
     * clientRoleChanged | occurs when setClientRole changed | on("clientRoleChanged", evt) |
     * userJoined | occurs when remote user joined | on("userJoined", evt) |
     * userOffline | this event occurs when remote user offline in rtc mode, this events only occurs host user offline in live mode | on("userOffline", evt) |
     * connectionStateChanged | occurs when sdk connection changed state | on("connectionStateChanged", evt) |
     * connectionLost | occurs when sdk connection lost | on("connectionLost", evt) |
     * tokenPrivilegeWillExpire | occurs when token will expire | on("tokenPrivilegeWillExpire", evt) |
     * requestToken | occurs when token expired | on("requestToken") |
     * localAudioStateChanged | occurs when local audio device state changed | on("localAudioStateChanged", (state, errorCode) => {}) |
     * audioVolumeIndication | occurs when audio volume indication changed | on("audioVolumeIndication", evt) |
     * activeSpeaker | occurs when detect active speaker | on("activeSpeaker", evt) |
     * firstLocalAudioFrame | occurs when sent first audio frame on local | on("firstLocalAudioFrame", evt) |
     * firstRemoteAudioFrame | occurs when received first audio frame from remote side | on("firstRemoteAudioFrame", evt) |
     * firstRemoteAudioDecoded | occurs when first remote audio decoded | on("firstRemoteAudioDecoded", evt) |
     * firstLocalVideoFrame | occurs when sent first video frame on local | on("firstLocalVideoFrame", evt) |
     * firstRemoteVideoFrame | occurs when received first video frame from remote side | on("firstRemoteVideoFrame", evt) |
     * userMuteAudio | occurs when user mute audio | on("userMuteAudio", evt) |
     * videoSizeChanged | occurs when change local or remote side video size or rotation | on("videoSizeChanged", evt) |
     * remoteVideoStateChanged | occurs when remote video state has any changed | on("remoteVideoStateChanged", evt) |
     * remoteAudioStateChanged | occurs when remote audio state has any changed | on("remoteAudioStateChanged", evt) |
     * localAudioStats | occurs when engine start to report local audio stats | on("localAudioStats", evt) |
     * localPublishFallbackToAudioOnly | occurs when published stream from local side fallback to audio stream | on("localPublishFallbackToAudioOnly", evt) |
     * remoteSubscribeFallbackToAudioOnly | occurs when subscribed side's stream fallback to audio stream | on("remoteSubscribeFallbackToAudioOnly", evt) |
     * audioRouteChanged | occurs when local audio route changed | on("audioRouteChanged", evt) |
     * cameraFocusAreaChanged | occurs when a camera focus area changed | on("cameraFocusAreaChanged", evt) |
     * cameraExposureAreaChanged | occurs when a camera exposure area changed | on("cameraExposureAreaChanged", evt) |
     * rtcStats | occurs when reports the statistics of the current call session once every two seconds. | on("rtcStats", evt) |
     * lastmileQuality | occurs when reports the last mile network quality of the local user once every two seconds before the user joins a channel.| on("lastmileQuality", evt) |
     * networkQuality | occurs when reports the last mile network quality of each user in the channel once every two seconds.| on("networkQuality", evt) |
     * localVideoStats | occurs when reports local video statistics | on("localVideoStats", evt) |
     * remoteVideoStats | occurs when reports remote video statistics| on("remoteVideoStats", evt) |
     * remoteAudioStats | occurs when reports remote audio statistics| on("remoteAudioStats", evt) |
     * audioEffectFinish | occurs when the local audio effect playback finishes. | on("audioEffectFinish", evt) |
     * streamPublished | occurs when addPublishStreamUrl success| on("streamPublished", evt) |
     * streamUnpublish | occurs when removePublishStreamUrl success| on("streamUnpublish", evt) |
     * transcodingUpdate | occurs when the cdn live streaming settings are updated | on("transcodingUpdate", evt) |
     * streamInjectedStatus | occurs when report the status of online injecting stream to a live broadcast | on("streamInjectedStatus", evt) |
     * mediaEngineLoaded | occurs when the media engine loaded | on("mediaEngineLoaded", evt) |
     * mediaEngineStartCall | occurs when the media engine call starts | on("mediaEngineStartCall", evt) |
     * startEchoTestWithInterval | occurs when startEchoTestWithInterval success | on("startEchoTestWithInterval", evt) |
     * audioMixingStateChanged | occurs when reports the local audio mixing state changed | on("audioMixingStateChanged", evt) |
     * lastmileProbeTestResult | occurs when reports the last-mile network probe result.| on("lastmileProbeTestResult", evt) |
     * rtmpStreamingStateChanged | occurs when reports the rtmp injecting stream state changed | on("rtmpStreamingStateChanged", evt) |
     * localVideoChanged | occurs when the local video changed  | on("localVideoChanged", evt) |
     * networkTypeChanged | occurs when the device network type changed | on("networkTypeChanged", evt) |
     * mediaMetaDataReceived | occurs when you received media meta data from the remote side through sendMediaData | on("mediaMetaDataReceived", evt) |
     * localUserRegistered | occurs when you register user account success | on("localUserRegistered", evt) |
     * userInfoUpdated | occurs when you peer side using user account join channel | on("userInfoUpdated", evt) |
     * receivedChannelMediaRelay | occurs when you received channel media relay | on('receivedChannelMediaRelay", evt)|
     * mediaRelayStateChanged | occurs when you received remote media relay state changed | on('mediaRelayStateChanged", evt)|
     * ---
     *
     * @param eventType
     * @param listener
     * @return any
     */
    static on(eventType, listener) {
        this._eventTypes.add(`${RtcEngine.AG_PREFIX}${eventType}`);
        // convert int32 to uint32
        if ([
            'joinChannelSuccess',
            'rejoinChannelSuccess',
            'userJoined',
            'userOffline',
            'occurStreamMessageError',
            'receiveStreamMessage',
            'activeSpeaker',
            'firstRemoteAudioFrame',
            'firstRemoteVideoFrame',
            'userMuteAudio',
            'videoSizeChanged',
            'remoteVideoStateChanged',
            'remoteAudioStateChanged',
            'remoteSubscribeFallbackToAudioOnly',
            'networkQuality',
            'streamInjectedStatus',
            'localUserRegistered'
        ].indexOf(eventType) != -1) {
            AgoraEventEmitter.addListener(`${RtcEngine.AG_PREFIX}${eventType}`, (args) => {
                args.uid = this.Int32ToUint32(args.uid);
                // convert int32 streamId to uint32 
                if (args.streamId) {
                    args.streamId = this.Int32ToUint32(args.streamId);
                }
                listener(args);
            });
            return;
        }
        if (['userInfoUpdated'].indexOf(eventType) != -1) {
            AgoraEventEmitter.addListener(`${RtcEngine.AG_PREFIX}${eventType}`, (args) => {
                args.uid = this.Int32ToUint32(args.uid);
                args.peer.uid = this.Int32ToUint32(args.peer.uid);
                listener(args);
            });
            return;
        }
        if (['audioVolumeIndication'].indexOf(eventType) != -1) {
            AgoraEventEmitter.addListener(`${RtcEngine.AG_PREFIX}${eventType}`, (args) => {
                args.speakers.map((speaker) => {
                    const uid = this.Int32ToUint32(speaker.uid);
                    return Object.assign({}, speaker, { uid });
                });
                listener(args);
            });
            return;
        }
        if ([
            'remoteAudioStats',
            'remoteVideoStats',
        ].indexOf(eventType) != -1) {
            AgoraEventEmitter.addListener(`${RtcEngine.AG_PREFIX}${eventType}`, (args) => {
                args.stats.uid = this.Int32ToUint32(args.stats.uid);
                listener(args);
            });
            return;
        }
        AgoraEventEmitter.addListener(`${RtcEngine.AG_PREFIX}${eventType}`, listener);
    }
    /**
     * @deprecated removeAllListeners
     */
    static removeAllListeners() {
        console.warn("removeAllListeners method already deprecated");
    }
    /**
     * @deprecated off
     * @param mode
     */
    static off(evt) {
        console.warn("off method already deprecated");
    }
    /**
     * renew token
     *
     * This method renews a new token.
     * @param token
     */
    static renewToken(token) {
        return Agora.renewToken(token);
    }
    /**
     * enable websdk interoperability
     *
     * This method used to enable websdk interoperability, so that it can connect with agora websdk apps.
     *
     * @param enabled
     * @return Promise<{success, value}>
     */
    static enableWebSdkInteroperability(enabled) {
        return Agora.enableWebSdkInteroperability(enabled);
    }
    /**
     * get agora native sdk connection state
     *
     * This method gets agora native sdk connection state
     * @return Promise<{state: (connection state)}>
     */
    static getConnectionState() {
        return Agora.getConnectionState();
    }
    /**
     * change the client role
     *
     * This method changes the client of role.
     * @param role (audience: 0, host: 1)
     */
    static setClientRole(role) {
        return Agora.setClientRole(role);
    }
    /**
     * leave channel
     *
     * This method leaves the joined channel, then your video view will not render ever.
     * You should call it, when you dont need render video stream.
     *
     * @return Promise<null>
     */
    static leaveChannel() {
        return Agora.leaveChannel();
    }
    /**
     * destroy
     *
     * This method stops event subscribe and destroy the RtcEngine instance's.
     * You should call it, when you want to destroy the engine.
     *
     * @return void
     */
    static destroy() {
        if (this._eventTypes.size) {
            for (let eventType of this._eventTypes) {
                AgoraEventEmitter.removeAllListeners(eventType);
            }
            this._eventTypes.clear();
        }
        return Agora.destroy();
    }
    /**
     * set local video render mode
     *
     * This method calls native sdk render mode for local video.
     * @param mode
     * @return Promise<any>
     */
    static setLocalRenderMode(mode) {
        return Agora.setLocalRenderMode(mode);
    }
    /**
     * set the specified remote video render mode
     *
     * This method calls native sdk render mode for the specified remote video.
     *
     * @param uid
     * @param mode
     * @return Promise<any>
     */
    static setRemoteRenderMode(uid, mode) {
        let uint32 = react_native_1.Platform.OS === 'android' ? this.Uint32ToInt32(uid) : uid;
        return Agora.setRemoteRenderMode(uint32, mode);
    }
    /**
     * start video preview
     *
     * This method start video preview for video.
     * @return Promise<any>
     */
    static startPreview() {
        return Agora.startPreview();
    }
    /**
     * stop video preview
     *
     * This method stops video preview for video.
     * @return Promise<any>
     */
    static stopPreview() {
        return Agora.stopPreview();
    }
    /**
     * set enable speaker phone
     *
     * This method set the speaker phone enable or disable by pass boolean parameter.
     * @param enabled
     * @return Promise<any>
     */
    static setEnableSpeakerphone(enabled) {
        return Agora.setEnableSpeakerphone(enabled);
    }
    /**
     * set default audio speaker
     *
     * This method set the default audio speaker enable or disable by pass boolean parameter.
     * @param enabled
     * @return Promise<any>
     */
    static setDefaultAudioRouteToSpeakerphone(enabled) {
        return Agora.setDefaultAudioRouteToSpeakerphone(enabled);
    }
    /**
     * set default mute all remote audio streams
     *
     * This method set default mute all remote audio streams enable or not by pass boolean parameter.
     * @param enabled
     * @return Promise<any>
     */
    static setDefaultMuteAllRemoteAudioStreams(enabled) {
        return Agora.setDefaultMuteAllRemoteAudioStreams(enabled);
    }
    /**
     * enable video
     *
     * This method enables video.
     * @return Promise<any>
     */
    static enableVideo() {
        return Agora.enableVideo();
    }
    /**
     * disable video
     *
     * This method disables video.
     * @return Promise<any>
     */
    static disableVideo() {
        return Agora.disableVideo();
    }
    /**
     * enable local video
     *
     * This method enables the local video by the boolean parameter.
     * @param enabled
     * @return Promise<any>
     */
    static enableLocalVideo(enabled) {
        return Agora.enableLocalVideo(enabled);
    }
    /**
     * mute local video stream
     *
     * This method mutes video stream by the boolean parameter.
     * @param muted
     * @return Promise<any>
     */
    static muteLocalVideoStream(muted) {
        return Agora.muteLocalVideoStream(muted);
    }
    /**
     * mute all remote video streams
     *
     * This method mutes all remote streams by the boolean parameter.
     * @param muted
     * @return Promise<any>
     */
    static muteAllRemoteVideoStreams(muted) {
        return Agora.muteAllRemoteVideoStreams(muted);
    }
    /**
     * @ignore Uint32ToInt32
     */
    static Uint32ToInt32(num) {
        const int32 = new Int32Array(1);
        int32[0] = num;
        return int32[0];
    }
    /**
     * @ignore Int32ToUint32
     */
    static Int32ToUint32(num) {
        const uint32 = new Uint32Array(1);
        uint32[0] = num;
        return uint32[0];
    }
    /**
     * mute specified remote video stream.
     *
     * This method mutes remote video stream by the number of uid and boolean parameter.
     * @param uid
     * @param muted
     * @return Promise<any>
     */
    static muteRemoteVideoStream(uid, muted) {
        let uint32 = react_native_1.Platform.OS === 'android' ? this.Uint32ToInt32(uid) : uid;
        return Agora.muteRemoteVideoStream(uint32, muted);
    }
    /**
     * set default mute all remote video stream
     *
     * This method mutes all remote video stream default by the boolean parameter.
     * @param muted
     * @return Promise<any>
     */
    static setDefaultMuteAllRemoteVideoStreams(muted) {
        return Agora.setDefaultMuteAllRemoteVideoStreams(muted);
    }
    /**
     * enable audio
     *
     * This method enables audio
     * @return Promise<any>
     */
    static enableAudio() {
        return Agora.enableAudio();
    }
    /**
     * disable audio
     *
     * This method disables audio
     * @return Promise<any>
     */
    static disableAudio() {
        return Agora.disableAudio();
    }
    /**
     * enable local audio
     *
     * This method enables local audio by the boolean parameter.
     * @param enabled
     * @return Promise<any>
     */
    static enableLocalAudio(enabled) {
        return Agora.enableLocalAudio(enabled);
    }
    /**
     * mute local audio stream
     *
     * This method mutes the local audio stream by muted.
     * @param muted
     * @return Promise<any>
     */
    static disableLocalAudio(muted) {
        return Agora.disableLocalAudio(muted);
    }
    /**
     * mute all remote audio streams
     *
     * This method mutes all remote audio streams by muted
     * @param muted boolean
     * @return Promise<any>
     */
    static muteAllRemoteAudioStreams(muted) {
        return Agora.muteAllRemoteAudioStreams(muted);
    }
    /**
     * mute specified remote audio stream by muted
     *
     * This method mutes specified remote audio stream by number uid and boolean muted.
     * @param uid
     * @param muted
     * @return Promise<any>
     */
    static muteRemoteAudioStream(uid, muted) {
        let uint32 = react_native_1.Platform.OS === 'android' ? this.Uint32ToInt32(uid) : uid;
        return Agora.muteRemoteAudioStream(uint32, muted);
    }
    /**
     * adjust recording signal volume
     *
     * This method adjusts recording your signal by volume.
     * @param volume
     * @return Promise<any>
     */
    static adjustRecordingSignalVolume(volume) {
        return Agora.adjustRecordingSignalVolume(volume);
    }
    /**
     * adjust playback signal volume
     *
     * This method adjusts playback signal by volume.
     * @param volume
     * @return Promise<any>
     */
    static adjustPlaybackSignalVolume(volume) {
        return Agora.adjustPlaybackSignalVolume(volume);
    }
    /**
     * enable audio volume indication
     *
     * This method enables audio volume by interval and smooth
     * @param interval
     * @param smooth
     * @return Promise<any>
     */
    static enableAudioVolumeIndication(interval, smooth) {
        return Agora.enableAudioVolumeIndication(interval, smooth);
    }
    /**
     * check for mobile phone speaker enabled
     *
     * This method checks the phone speaker is enabled
     * @param callback
     * @return any
     */
    static isSpeakerphoneEnabled(callback) {
        return Agora.isSpeakerphoneEnabled(callback);
    }
    /**
     * enable in-ear monitor
     *
     * This method enables in-ear monitoring by boolean parameter enabled
     *
     * @param enabled
     * @return Promise<any>
     */
    static enableInEarMonitoring(enabled) {
        return Agora.enableInEarMonitoring(enabled);
    }
    /**
     * set in-ear monitoring volume
     *
     * This method sets the in-ear-monitoring volume by number parameter volume
     *
     * @param volume
     * @return Promise<any>
     */
    static setInEarMonitoringVolume(volume) {
        return Agora.setInEarMonitoringVolume(volume);
    }
    /**
     * set local voice pitch
     *
     * This method sets the local voice pitch by float parameter pitch
     *
     * @param pitch
     * @return Promise<any>
     */
    static setLocalVoicePitch(pitch) {
        return Agora.setLocalVoicePitch(pitch);
    }
    /**
     * set local voice equalization
     *
     * This method set local video equalization of band frequency by enum band number and number of gain
     *
     * @param band
     * @param gain
     * @return Promise<any>
     */
    static setLocalVoiceEqualization(band, gain) {
        Agora.setLocalVoiceEqualization(band, gain);
    }
    /**
     * set local voice reverb
     *
     * This method sets local voice by reverb and value
     * @param reverb
     * @param value
     */
    static setLocalVoiceReverb(reverb, value) {
        Agora.setLocalVoiceReverb(reverb, value);
    }
    /**
     * start audio mixing
     *
     * This method will start audio mixing by option config
     *
     * @param options {@link AudioMixingOption}
     */
    static startAudioMixing(options) {
        Agora.startAudioMixing(options);
    }
    /**
     * stop audio mixing
     *
     * This methods stops for audio mixing.
     */
    static stopAudioMixing() {
        Agora.stopAudioMixing();
    }
    /**
     * pause audio mixing
     *
     * This method pauses for audio mixing.
     */
    static pauseAudioMixing() {
        Agora.pauseAudioMixing();
    }
    /**
     * resume audio mixing
     *
     * This method resumes for audio mixing.
     */
    static resumeAudioMixing() {
        Agora.resumeAudioMixing();
    }
    /**
     * adjust audio mixing volume
     *
     * This method adjusts audio mixing volume by the volume number parameter
     * @param volume
     */
    static adjustAudioMixingVolume(volume) {
        Agora.adjustAudioMixingVolume(volume);
    }
    /**
     * adjust audio mixing playout volume
     *
     * This method adjusts audio mixing playout by the volume parameter
     * @param volume
     */
    static adjustAudioMixingPlayoutVolume(volume) {
        Agora.adjustAudioMixingPlayoutVolume(volume);
    }
    /**
     * adjust audio mixing publish volume
     *
     * This method adjusts audio mixing publish by the volume paraemter
     * @param volume
     */
    static adjustAudioMixingPublishVolume(volume) {
        Agora.adjustAudioMixingPublishVolume(volume);
    }
    /**
     * get audio mixing duration
     *
     * This method gets the audio mixing duration
     * @return Promise<{success, value}>
     */
    static getAudioMixingDuration() {
        return Agora.getAudioMixingDuration();
    }
    /**
     * get audio mixing current position
     *
     * This method gets audio mixing current position value.
     * @return Promise<{success, value}>
     */
    static getAudioMixingCurrentPosition() {
        return Agora.getAudioMixingCurrentPosition();
    }
    /**
     * set audio mixing position
     *
     * This method sets audio mixing position by the parameter pos
     * @param pos
     */
    static setAudioMixingPosition(pos) {
        return Agora.setAudioMixingPosition(pos);
    }
    /**
     * get effects of volume
     *
     * This methods get audio mixing effects volume value.
     * @return Promise<{success, value}>
     */
    static getEffectsVolume() {
        return Agora.getEffectsVolume();
    }
    /**
     * set effects volume
     *
     * This methods set audio mixing effects volume by float parameter.
     * @param volume
     * @return Promise<{success, value}>
     */
    static setEffectsVolume(volume) {
        return Agora.setEffectsVolume(volume);
    }
    /**
     * set volume for playing effects.
     *
     * This methods set for playing audio mixing effects
     * @return Promise<{success, value}>
     */
    static setVolumeOfEffect(volume) {
        return Agora.setVolumeOfEffect(volume);
    }
    /**
     * play specified effect for audio mixing
     *
     * This methos plays the specified effect of audio mixing file by option config.
     * @param options {@link PlayEffectOption}
     * @return Promise<{success, value}>
     */
    static playEffect(options) {
        return Agora.playEffect(options);
    }
    /**
     * stop play effect for audio mixing
     *
     * This methods stops the specified effect for audio mixing file by soundId.
     * @param sounid
     * @return Promise<{success, value}>
     */
    static stopEffect(soundId) {
        return Agora.stopEffect(soundId);
    }
    /**
     * stop play all for effect audio mixing.
     *
     * This methods stops all effect audio mixing.
     * @return Promise<{success, value}>
     */
    static stopAllEffects() {
        return Agora.stopAllEffects();
    }
    /**
     * preload effect for audio mixing file.
     *
     * This methods preloads the specified audio mixing file to memory by the soundId
     * @param soundId
     * @param filePath
     * @return Promise<{success, value}>
     */
    static preloadEffect(soundId, filePath) {
        return Agora.preloadEffect(soundId, filePath);
    }
    /**
     * unload effect
     *
     * This methods unload the already loaded audio mixing file from memory by the soundId.
     * @param soundId
     * @return Promise<{success, value}>
     */
    static unloadEffect(soundId) {
        return Agora.unloadEffect(soundId);
    }
    /**
     * pause the specified effect for audio mixing by soundId
     *
     * This method pauses the specified effect for audio mixing by soundId.
     * @param soundId
     * @return Promise<{success, value}>
     */
    static pauseEffect(soundId) {
        return Agora.pauseEffect(soundId);
    }
    /**
     * pause all effects for audio mixing
     *
     * This method pause all effects for audio mixing.
     * @param soundId
     * @return Promise<{success, value}>
     */
    static pauseAllEffects() {
        return Agora.pauseAllEffects();
    }
    /**
     * resume audio mixing effect by the specified soundId
     *
     * This method resumes audio mixing effect by the specified soundId
     * @param soundId
     * @return Promise<{success, value}>
     */
    static resumeEffect(soundId) {
        return Agora.resumeEffect(soundId);
    }
    /**
     * resume all audio mixing effects.
     *
     * This method resumes all audio mixing effects.
     * @return Promise<{success, value}>
     */
    static resumeAllEffects() {
        return Agora.resumeAllEffects();
    }
    /**
     * start audio recording by quality
     *
     * This method start audio recording by quality config
     * @param options {@link AudioRecordingOption}
     * @return Promise<{success, value}>
     */
    static startAudioRecording(options) {
        return Agora.startAudioRecording(options);
    }
    /**
     * stop audio recording
     *
     * This method stops audio recording.
     * @return Promise<{success, value}>
     */
    static stopAudioRecording() {
        return Agora.stopAudioRecording();
    }
    /**
     * set audio session operation restriction
     *
     * The SDK and the app can both configure the audio session by default. The app may occasionally use other apps or third-party components to manipulate the audio session and restrict the SDK from doing so. This method allows the app to restrict the SDK’s manipulation of the audio session.
     * You can call this method at any time to return the control of the audio sessions to the SDK.
     * This method restricts the SDK’s manipulation of the audio session. Any operation to the audio session relies solely on the app, other apps, or third-party components.
     * @notice iOS support only
     */
    static setAudioSessionOperationRestriction() {
        if (react_native_1.Platform.OS != 'ios')
            throw Error(`setAudioSessionOperationRestriction is not support on your platform. Please check the details in react-native-agora docs`);
        Agora.setAudioSessionOperationRestriction();
    }
    /**
     * @deprecated startEchoTest
     * startEchoTest
     */
    /**
     * @deprecated isCameraAutoFocusFaceModeSupported
     * @deprecated isCameraExposurePositionSupported
     * @deprecated isCameraFocusSupported
     * @deprecated isCameraTorchSupported
     * @deprecated isCameraZoomSupported
     * instead use {@method getCameraInfo}
     */
    /**
     * stop echo test
     *
     * This method stop launched an audio call test.
     * @return Promise<{success, value}>
     */
    static stopEchoTest() {
        return Agora.stopEchoTest();
    }
    /**
     * enable lastmile test
     *
     * This method enables the network connection qualit test.
     *
     * @return Promise<{success, value}>
     */
    static enableLastmileTest() {
        return Agora.enableLastmileTest();
    }
    /**
     * disable lastmile test
     *
     * This method disable the network connection qualit test.
     *
     * @return Promise<{success, value}>
     */
    static disableLastmileTest() {
        return Agora.disableLastmileTest();
    }
    /**
     * set recording audio frame parameters
     *
     * This method Sets the audio recording format for the audioFrame callback.
     *
     * @param options {@link RecordingAudioFrameOption}
     * @return Promise<{success, value}>
     */
    static setRecordingAudioFrameParameters(options) {
        return Agora.setRecordingAudioFrameParameters(options);
    }
    /**
     * set playback audio frame parameters
     *
     * This method Sets the audio frame format for the playbackFrame callback.
     *
     * @param options {@link AudioFrameOption}
     * @return Promise<{success, value}>
     */
    static setPlaybackAudioFrameParameters(options) {
        return Agora.setPlaybackAudioFrameParameters(options);
    }
    /**
     * set mixed audio frame parameters
     *
     * This method Sets the audio frame format for the mixedAudioFrame callback.
     *
     * @param options {@link MixedAudioFrameOption}
     * @return Promise<{success, value}>
     */
    static setMixedAudioFrameParameters(options) {
        return Agora.setMixedAudioFrameParameters(options);
    }
    /**
     * add video watermark
     *
     * This method adds video watermark to the local video.
     *
     * @param options {@link ImageOption}
     * @return Promise<{success, value}>
     */
    static addVideoWatermark(options) {
        return Agora.addVideoWatermark(options);
    }
    /**
     * clear video watermarks
     *
     * This method removes the watermark image from the video stream added by addVideoWatermark.
     *
     * @return Promise<{success, value}>
     */
    static clearVideoWatermarks() {
        return Agora.clearVideoWatermarks();
    }
    /**
     * set local publish fallback
     *
     * This method sets the fallback option for the locally published video stream based on the network conditions.
     *
     * @param option {0, 1, 2}  [more details](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_constants.html#a3e453c93766e783a7e5eca05b1776238)
     * @return Promise<{success, value}>
     */
    static setLocalPublishFallbackOption(option) {
        return Agora.setLocalPublishFallbackOption(option);
    }
    /**
     * set remote publish fallback
     *
     * This method sets the fallback option for the remotely subscribed video stream based on the network conditions.
     *
     * @param option {0, 1, 2} [more details](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_constants.html#a3e453c93766e783a7e5eca05b1776238)
     * @return Promise<{success, value}>
     */
    static setRemoteSubscribeFallbackOption(option) {
        return Agora.setRemoteSubscribeFallbackOption(option);
    }
    /**
     * enable dual stream mode
     *
     * This method enables the dual stream by parameter mode.
     *
     * @param enabled
     * @return Promise<{success, value}>
     */
    static enableDualStreamMode(enabled) {
        return Agora.enableDualStreamMode(enabled);
    }
    /**
     * set remote video stream type
     *
     * This method sets the remote video stream type by uid and streamType.
     *
     * @param options {@link VideoStreamOption}
     * @return Promise<{success, value}>
     */
    static setRemoteVideoStreamType(options) {
        return Agora.setRemoteVideoStreamType(options);
    }
    /**
     * set remote default video stream type
     *
     * This method sets the default video stream type.
     *
     * @param options {@link DefaultVideoStreamOption}
     * @return Promise<{success, value}>
     */
    static setRemoteDefaultVideoStreamType(options) {
        return Agora.setRemoteDefaultVideoStreamType(options);
    }
    /**
     * add inject stream url
     *
     * This method injects an online media stream to a live broadcast.
     *
     * @param options {@link InjectStreamOption}
     * @return Promise<{success, value}>
     */
    static addInjectStreamUrl(options) {
        return Agora.addInjectStreamUrl(options);
    }
    /**
     * remove inject stream url
     *
     * This method removes stream by addInjectsStreamUrl.
     *
     * @param options {@link RemoveInjectStreamOption}
     * @return Promise<{success, value}>
     */
    static removeInjectStreamUrl(options) {
        return Agora.removeInjectStreamUrl(options);
    }
    /**
     * @deprecated sendMessage
     * sendMessage
     */
    static sendMessage() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return console.warn("sendMessage already deprecated");
        });
    }
    /**
     * @deprecated createDataStream
     * createDataStream
     */
    /**
     * @deprecated setupLocalVideo
     * setupLocalVideo
     */
    /**
     * @deprecated setupRemoteVideo
     * setupRemoteVideo
     */
    /**
     * @deprecated setVideoQualityParameters
     * setVideoQualityParameters
     */
    /**
     * set local video mirror mode
     *
     * This method sets local video mirror mode
     *
     * @param mode
     * @return Promise<{success, value}>
     */
    static setLocalVideoMirrorMode(mode) {
        return Agora.setLocalVideoMirrorMode(mode);
    }
    /**
     * switch camera
     *
     * This method switches camera between front and rear.
     *
     * @return Promise<{success, value}>
     */
    static switchCamera() {
        return Agora.switchCamera();
    }
    /**
     * set camera zoom ratio
     *
     * This method sets the camera zoom ratio.
     *
     * @param zoomFactor
     * @return Promise<{success, value}>
     */
    static setCameraZoomFactor(zoomFactor) {
        return Agora.setCameraZoomFactor(zoomFactor);
    }
    /**
     * get camera max zoom ratio
     *
     * This method gets the camera maximum zoom ratio.
     *
     * @notice Android Only
     * @return Promise<{success, value}>
     */
    static getCameraMaxZoomFactor() {
        return Agora.getCameraMaxZoomFactor();
    }
    /**
     * set camera focus position in preview
     *
     * This method sets the mannual focus position.
     *
     * @param options {@link PositionOption}
     * @return Promise<{success, value}>
     */
    static setCameraFocusPositionInPreview(options) {
        return Agora.setCameraFocusPositionInPreview(options);
    }
    /**
     * set camera exposure position
     *
     * This method sets the mannual exposure position.
     *
     * @param options {@link PositionOption}
     * @return Promise<{success, value}>
     */
    static setCameraExposurePosition(options) {
        return Agora.setCameraExposurePosition(options);
    }
    /**
     * set camera torch on
     *
     * This method enables the camera flash function.
     *
     * @param enabled
     * @return Promise<{success, value}>
     */
    static setCameraTorchOn(enabled) {
        return Agora.setCameraTorchOn(enabled);
    }
    /**
     * set enable auto focus face mode
     *
     * This method enables auto-focus face mode function.
     *
     * @param enabled boolean
     * @return Promise<{success, value}>
     */
    static setCameraAutoFocusFaceModeEnabled(enabled) {
        return Agora.setCameraAutoFocusFaceModeEnabled(enabled);
    }
    /**
     * get call id
     *
     * This method is used to get call id.
     *
     * @return Promise<{success, value}>
     */
    static getCallId() {
        return Agora.getCallId();
    }
    /**
     * set log file and log filter
     *
     * This method sets the log file generated path and specified the log level.
     *
     * @param filePath string
     * @param level enum
     * @param maxfileSize integer (KB)
     * @return Promise<{success, value}>
     */
    static setLog(filePath, level, maxfileSize) {
        return Agora.setLog(filePath, level, maxfileSize);
    }
    /**
     * add publish stream url
     *
     * This method add publish stream by option.
     *
     * @param options {@link PublishStreamOption}
     * @return Promise<{success, value}>
     */
    static addPublishStreamUrl(options) {
        return Agora.addPublishStreamUrl(options);
    }
    /**
     * remove publish stream url
     *
     * This method remove publish stream by options.
     *
     * @param options {@link RemovePublishStreamOption}
     * @return Promise<{success, value}>
     */
    static removePublishStreamUrl(options) {
        return Agora.removePublishStreamUrl(options);
    }
    /**
     * set live transcoding
     *
     * This method sets the video layout and audio settings for CDN live.
     *
     * @param options {@link LiveTranscoding}
     * @return Promise<{success, value}>
     */
    static setLiveTranscoding(options) {
        return Agora.setLiveTranscoding(options);
    }
    /**
     * get sdk version
     *
     * This method gets the sdk version details and passed it into callback function
     *
     * @param callback to handle resolve from getSdkVersion
     * @param errorHandler to handle reject error from getSdkVersion
     * @return any
     */
    static getSdkVersion(callback, errorHandler) {
        return Agora.getSdkVersion().then(callback).catch(errorHandler);
    }
    /**
     * mute local audio stream
     *
     * This method sends/stops sending the local audio.
     *
     * @param enabled
     * @return Promise<any>
     */
    static muteLocalAudioStream(enabled) {
        return Agora.muteLocalAudioStream(enabled);
    }
    /**
     * video pre-process/post-process
     *
     * This method enables/disables image enhancement and sets the options.
     *
     * @param enable boolean
     * @param options {@link BeautyOptions}
     * @return Promise<any>
     */
    static setBeautyEffectOptions(enabled, options) {
        return Agora.setBeautyEffectOptions(enabled, options);
    }
    /**
     * set local voice change
     *
     * This method changes local speaker voice with voiceChanger
     *
     * @param voiceChanger integer
     * @voiceChanger value ranges [
     *          0: "The original voice",
     *          1: "An old man’s voice",
     *          2: "A little boy’s voice.",
     *          3: "A little girl’s voice.",
     *          4: "TBD",
     *          5: "Ethereal vocal effects.",
     *          6: "Hulk’s voice."
     *      ]
     * @return Promise<any>
     */
    static setLocalVoiceChanger(voiceChanger) {
        return Agora.setLocalVoiceChanger(voiceChanger);
    }
    /**
     * set the preset local voice reverberation effect.
     *
     * This method sets the preset local voice reverberation effect.
     *
     * @param preset integer
     * @return Promise<any>
     */
    static setLocalVoiceReverbPreset(preset) {
        return Agora.setLocalVoiceReverbPreset(preset);
    }
    /**
     * control stereo panning for remote users
     *
     * This method enables/disables stereo panning for remote users.
     *
     * @param enabled boolean
     * @return Promise<any>
     */
    static enableSoundPositionIndication(enabled) {
        return Agora.enableSoundPositionIndication(enabled);
    }
    /**
     * set the sound position of a remote user
     *
     * This method sets the sound position of a remote user by uid
     *
     * @param uid number | The ID of the remote user
     * @param pan float | The sound position of the remote user. The value ranges from -1.0 to 1.0
     * @pan
     *  0.0: the remote sound comes from the front.
     *  -1.0: the remote sound comes from the left.
     *  1.0: the remote sound comes from the right.
     * @param gain float | Gain of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original gain of the remote user). The smaller the value, the less the gain.
     * @return Promise<any>
     */
    static setRemoteVoicePosition(uid, pan, gain) {
        let uint32 = react_native_1.Platform.OS === 'android' ? this.Uint32ToInt32(uid) : uid;
        return Agora.setRemoteVoicePosition(uint32, pan, gain);
    }
    /**
     * start the lastmile probe test
     *
     * This method start the last-mile network probe test before joining a channel to get the uplink and downlink last-mile network statistics, including the bandwidth, packet loss, jitter, and round-trip time (RTT).
     *
     * @param config LastmileProbeConfig {@link LastmileProbeConfig}
     *
     * event onLastmileQuality: the SDK triggers this callback within two seconds depending on the network conditions. This callback rates the network conditions with a score and is more closely linked to the user experience.
     * event onLastmileProbeResult: the SDK triggers this callback within 30 seconds depending on the network conditions. This callback returns the real-time statistics of the network conditions and is more objective.
     * @return Promise<any>
     */
    static startLastmileProbeTest(config) {
        return Agora.startLastmileProbeTest(config);
    }
    /**
     * stop the lastmile probe test
     *
     * This method stop the lastmile probe test.
     *
     * @return Promise<any>
     */
    static stopLastmileProbeTest() {
        return Agora.stopLastmileProbeTest();
    }
    /**
     * sets the priority of a remote user's media stream.
     *
     * note: Use this method with the setRemoteSubscribeFallbackOption method. If the fallback function is enabled for a subscribed stream, the SDK ensures the high-priority user gets the best possible stream quality.
     *
     * This method sets the priority of a remote user's media stream.
     * @param uid number
     * @param userPriority number | The value range is  [50 is "user's priority is high", 100 is "the default user's priority is normal"]
     *
     * @return Promise<any>
     */
    static setRemoteUserPriority(uid, userPriority) {
        let uint32 = react_native_1.Platform.OS === 'android' ? this.Uint32ToInt32(uid) : uid;
        return Agora.setRemoteUserPriority(uint32, userPriority);
    }
    /**
     * start an audio call test.
     *
     * note:
     *   Call this method before joining a channel.
     *   After calling this method, call the stopEchoTest method to end the test. Otherwise, the app cannot run the next echo test, or call the joinChannel method.
     *   In the Live-broadcast profile, only a host can call this method.
     * This method will start an audio call test with interval parameter.
     * In the audio call test, you record your voice. If the recording plays back within the set time interval, the audio devices and the network connection are working properly.
     *
     * @param interval number
     *
     * @return Promise<any>
     */
    static startEchoTestWithInterval(interval) {
        return Agora.startEchoTestWithInterval(interval);
    }
    /**
     * set the camera capture preference.
     *
     * note:
     *  For a video call or live broadcast, generally the SDK controls the camera output parameters. When the default camera capture settings do not meet special requirements or cause performance problems, we recommend using this method to set the camera capture preference:
     *  If the resolution or frame rate of the captured raw video data are higher than those set by setVideoEncoderConfiguration, processing video frames requires extra CPU and RAM usage and degrades performance. We recommend setting config as CAPTURER_OUTPUT_PREFERENCE_PERFORMANCE(1) to avoid such problems.
     *  If you do not need local video preview or are willing to sacrifice preview quality, we recommend setting config as CAPTURER_OUTPUT_PREFERENCE_PERFORMANCE(1) to optimize CPU and RAM usage.
     *  If you want better quality for the local video preview, we recommend setting config as CAPTURER_OUTPUT_PREFERENCE_PREVIEW(2).
     *
     * This method will set the camera capture preference.
     *
     * @param config {@link CameraCapturerConfiguration}
     *
     * @return Promise<any>
     */
    static setCameraCapturerConfiguration(config) {
        return Agora.setCameraCapturerConfiguration(config);
    }
    /**
     * Gets the audio mixing volume for local playback.
     *
     * note:
     * This method helps troubleshoot audio volume related issues.
     *
     * @return Promise<any>
     */
    static getAudioMixingPlayoutVolume() {
        return Agora.getAudioMixingPlayoutVolume();
    }
    /**
     * Gets the audio mixing volume for publishing.
     *
     * note:
     * This method helps troubleshoot audio volume related issues.
     *
     * @return Promise<any>
     */
    static getAudioMixingPublishVolume() {
        return Agora.getAudioMixingPublishVolume();
    }
    /**
     * sendMediaData for media observer.
     *
     * note:
     * This method needs you invoke registerMediaMetadataObserver success first and you could send media data through interval media observer feature.
     * The data have limit length is 1024 bytes, if you pass data length bigger than limit it will failed.
     * @param data String: 1024 bytes limit
     * @return Promise<any>
     */
    static sendMediaData(data) {
        return Agora.sendMediaData(data);
    }
    /**
     * Registers the metadata observer.
     *
     * note:
     * This method only work in live mode
     * This method enables you to add synchronized metadata in the video stream for more diversified live broadcast interactions, such as sending shopping links, digital coupons, and online quizzes.
     * This method trigger 'mediaMetaDataReceived' event, here is example:
     * ```javascript
     *      RtcEngine.on("mediaMetaDataReceived", (data) => {
     *        console.log("mediaMetaDataReceived", data);
     *      })
     * ```
     * @return Promise<any>
     */
    static registerMediaMetadataObserver() {
        return Agora.registerMediaMetadataObserver();
    }
    /**
     * Get local device camera support info
     *
     * note:
     * This method returns your current device camera support info.
     * ```javascript
     *      RtcEngine.getCameraInfo().then(info => {
     *         console.log("your currrent camera", info);
     *      })
     * ```
     * @return Promise{cameraSupportInfo}>
     */
    static getCameraInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Agora.getCameraInfo();
        });
    }
}
/**
 * @ignore eventTypes
 */
RtcEngine._eventTypes = new Set();
/**
 * @ignore AG_PREFIX
 */
RtcEngine.AG_PREFIX = 'ag_rtc';
exports.default = RtcEngine;
//# sourceMappingURL=RtcEngine.native.js.map