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
     * add event listener
     *
     * This method subscribes specified eventType and run listener. You should call this method at first.
     * @param eventType
     * @param listener
     */
    static on(eventType, listener) {
        AgoraEventEmitter.addListener(`${RtcEngine.AG_PREFIX}${eventType}`, listener);
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
     * @returns Promise<{success, value}>
     */
    static enableWebSdkInteroperability(enabled) {
        return Agora.enableWebSdkInteroperability(enabled);
    }
    /**
     * get agora native sdk connection state
     *
     * This method gets agora native sdk connection state
     * @returns Promise<{success: true, state: (connection state)}>
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
        Agora.setClientRole(role);
    }
    /**
     * leave channel
     *
     * This method leaves the joined channel, then your video view will not render ever.
     * You should call it, when you dont need render video stream.
     *
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
     */
    static destroy() {
        return Agora.destroy();
    }
    /**
     * set local video render mode
     *
     * This method calls native sdk render mode for local video.
     * @param mode
     */
    static setLocalRenderMode(mode) {
        Agora.setLocalRenderMode(mode);
    }
    /**
     * set the specified remote video render mode
     *
     * This method calls native sdk render mode for the specified remote video.
     *
     * @param uid
     * @param mode
     */
    static setRemoteRenderMode(uid, mode) {
        Agora.setRemoteRenderMode(uid, mode);
    }
    /**
     * start video preview
     *
     * This method start video preview for video.
     */
    static startPreview() {
        Agora.startPreview();
    }
    /**
     * stop video preview
     *
     * This method stops video preview for video.
     */
    static stopPreview() {
        Agora.stopPreview();
    }
    /**
     * set enable speaker phone
     *
     * This method set the speaker phone enable or disable by pass boolean parameter.
     * @param enabled
     */
    static setEnableSpeakerphone(enabled) {
        Agora.setEnableSpeakerphone(enabled);
    }
    /**
     * set default audio speaker
     *
     * This method set the default audio speaker enable or disable by pass boolean parameter.
     * @param enabled
     */
    static setDefaultAudioRouteToSpeakerphone(enabled) {
        Agora.setDefaultAudioRouteToSpeakerphone(enabled);
    }
    /**
     * set default mute all remote audio streams
     *
     * This method set default mute all remote audio streams enable or not by pass boolean parameter.
     * @param enabled
     */
    static setDefaultMuteAllRemoteAudioStreams(enabled) {
        Agora.setDefaultMuteAllRemoteAudioStreams(enabled);
    }
    /**
     * enable video
     *
     * This method enables video.
     */
    static enableVideo() {
        Agora.enableVideo();
    }
    /**
     * disable video
     *
     * This method disables video.
     */
    static disableVideo() {
        Agora.disableVideo();
    }
    /**
     * enable local video
     *
     * This method enables the local video by the boolean parameter.
     * @param enabled
     */
    static enableLocalVideo(enabled) {
        Agora.enableLocalVideo(enabled);
    }
    /**
     * mute local video stream
     *
     * This method mutes video stream by the boolean parameter.
     * @param muted
     */
    static muteLocalVideoStream(muted) {
        Agora.muteLocalVideoStream(muted);
    }
    /**
     * mute all remote video streams
     *
     * This method mutes all remote streams by the boolean parameter.
     * @param muted
     */
    static muteAllRemoteVideoStreams(muted) {
        Agora.muteAllRemoteVideoStreams(muted);
    }
    /**
     * mute specified remote video stream.
     *
     * This method mutes remote video stream by the number of uid and boolean parameter.
     * @param uid
     * @param muted
     */
    static muteRemoteVideoStream(uid, muted) {
        Agora.muteRemoteVideoStream(uid, muted);
    }
    /**
     * set default mute all remote video stream
     *
     * This method mutes all remote video stream default by the boolean parameter.
     * @param muted
     */
    static setDefaultMuteAllRemoteVideoStreams(muted) {
        Agora.setDefaultMuteAllRemoteVideoStreams(muted);
    }
    /**
     * enable audio
     *
     * This method enables audio
     */
    static enableAudio() {
        Agora.enableAudio();
    }
    /**
     * disable audio
     *
     * This method disables audio
     */
    static disableAudio() {
        Agora.disableAudio();
    }
    /**
     * enable local audio
     *
     * This method enables local audio by the boolean parameter.
     * @param enabled
     */
    static enableLocalAudio(enabled) {
        Agora.enableLocalAudio(enabled);
    }
    /**
     * mute local audio stream
     *
     * This method mutes the local audio stream by muted.
     * @param muted
     */
    static disableLocalAudio(muted) {
        Agora.disableLocalAudio(muted);
    }
    /**
     * mute all remote audio streams
     *
     * This method mutes all remote audio streams by muted
     */
    static muteAllRemoteAudioStreams(muted) {
        Agora.muteAllRemoteAudioStreams(muted);
    }
    /**
     * mute specified remote audio stream by muted
     *
     * This method mutes specified remote audio stream by number uid and boolean muted.
     * @param uid
     * @param muted
     */
    static muteRemoteAudioStream(uid, muted) {
        Agora.muteRemoteAudioStream(uid, muted);
    }
    /**
     * adjust recording signal volume
     *
     * This method adjusts recording your signal by volume.
     * @param volume
     */
    static adjustRecordingSignalVolume(volume) {
        Agora.adjustRecordingSignalVolume(volume);
    }
    /**
     * adjust playback signal volume
     *
     * This method adjusts playback signal by volume.
     * @param volume
     */
    static adjustPlaybackSignalVolume(volume) {
        Agora.adjustPlaybackSignalVolume(volume);
    }
    /**
     * enable audio volume indication
     *
     * This method enables audio volume by interval and smooth
     * @param interval
     * @param smooth
     */
    static enableAudioVolumeIndication(interval, smooth) {
        Agora.enableAudioVolumeIndication(interval, smooth);
    }
    /**
     * check for mobile phone speaker enabled
     *
     * This method checks the phone speaker is enabled
     * @param callback
     */
    static methodisSpeakerphoneEnabled(callback) {
        Agora.methodisSpeakerphoneEnabled(callback);
    }
    /**
     * enable in-ear monitor
     *
     * This method enables in-ear monitoring by boolean parameter enabled
     *
     * @param enabled
     */
    static enableInEarMonitoring(enabled) {
        Agora.enableInEarMonitoring(enabled);
    }
    /**
     * set in-ear monitoring volume
     *
     * This method sets the in-ear-monitoring volume by number parameter volume
     *
     * @param volume
     */
    static setInEarMonitoringVolume(volume) {
        Agora.setInEarMonitoringVolume(volume);
    }
    /**
     * set local voice pitch
     *
     * This method sets the local voice pitch by float parameter pitch
     *
     * @param pitch
     */
    static setLocalVoicePitch(pitch) {
        Agora.setLocalVoicePitch(pitch);
    }
    /**
     * set local voice equalization
     *
     * This method set local video equalization of band frequency by enum band number and number of gain
     *
     * @param band
     * @param gain
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
     * @returns Promise<{success, value}>
     */
    static getAudioMixingDuration() {
        return Agora.getAudioMixingDuration();
    }
    /**
     * get audio mixing current position
     *
     * This method gets audio mixing current position value.
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
     */
    static getEffectsVolume() {
        return Agora.getEffectsVolume();
    }
    /**
     * set effects volume
     *
     * This methods set audio mixing effects volume by float parameter.
     * @param volume
     * @returns Promise<{success, value}>
     */
    static setEffectsVolume(volume) {
        return Agora.setEffectsVolume(volume);
    }
    /**
     * set volume for playing effects.
     *
     * This methods set for playing audio mixing effects
     * @returns Promise<{success, value}>
     */
    static setVolumeOfEffect(volume) {
        return Agora.setVolumeOfEffect(volume);
    }
    /**
     * play specified effect for audio mixing
     *
     * This methos plays the specified effect of audio mixing file by option config.
     * @param options {@link PlayEffectOption}
     * @returns Promise<{success, value}>
     */
    static playEffect(options) {
        return Agora.playEffect(options);
    }
    /**
     * stop play effect for audio mixing
     *
     * This methods stops the specified effect for audio mixing file by soundid.
     * @param sounid
     * @returns Promise<{success, value}>
     */
    static stopEffect(soundId) {
        return Agora.stopEffect(soundId);
    }
    /**
     * stop play all for effect audio mixing.
     *
     * This methods stops all effect audio mixing.
     * @returns Promise<{success, value}>
     */
    static stopAllEffects() {
        return Agora.stopAllEffects();
    }
    /**
     * preload effect for audio mixing file.
     *
     * This methods preloads the specified audio mixing file to memory by the soundid
     * @param soundid
     * @param filepath
     * @returns Promise<{success, value}>
     */
    static preloadEffect(soundId, filepath) {
        return Agora.preloadEffect(soundId, filepath);
    }
    /**
     * unload effect
     *
     * This methods unload the already loaded audio mixing file from memory by the soundid.
     * @param soundid
     * @returns Promise<{success, value}>
     */
    static unloadEffect(soundId) {
        return Agora.unloadEffect(soundId);
    }
    /**
     * pause the specified effect for audio mixing by soundid
     *
     * This method pauses the specified effect for audio mixing by soundid.
     * @param soundid
     * @returns Promise<{success, value}>
     */
    static pauseEffect(soundId) {
        return Agora.pauseEffect(soundId);
    }
    /**
     * pause all effects for audio mixing
     *
     * This method pause all effects for audio mixing.
     * @param soundid
     * @returns Promise<{success, value}>
     */
    static pauseAllEffects() {
        return Agora.pauseAllEffects();
    }
    /**
     * resume audio mixing effect by the specified soundid
     *
     * This method resumes audio mixing effect by the specified soundid
     * @param soundid
     * @returns Promise<{success, value}>
     */
    static resumeEffect(soundId) {
        return Agora.resumeEffect(soundId);
    }
    /**
     * resume all audio mixing effects.
     *
     * This method resumes all audio mixing effects.
     * @returns Promise<{success, value}>
     */
    static resumeAllEffects() {
        return Agora.resumeAllEffects();
    }
    /**
     * start audio recording by quality
     *
     * This method start audio recording by quality config
     * @param options {@link AudioRecordingOption}
     * @returns Promise<{success, value}>
     */
    static startAudioRecording(options) {
        return Agora.startAudioRecording(options);
    }
    /**
     * stop audio recording
     *
     * This method stops audio recording.
     * @returns Promise<{success, value}>
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
     * stop echo test
     *
     * This method stop launched an audio call test.
     * @returns Promise<{success, value}>
     */
    static stopEchoTest() {
        return Agora.stopEchoTest();
    }
    /**
     * enable lastmile test
     *
     * This method enables the network connection qualit test.
     *
     * @returns Promise<{success, value}>
     */
    static enableLastmileTest() {
        return Agora.enableLastmileTest();
    }
    /**
     * disable lastmile test
     *
     * This method disable the network connection qualit test.
     *
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
     */
    static addVideoWatermark(options) {
        return Agora.addVideoWatermark(options);
    }
    /**
     * clear video watermarks
     *
     * This method removes the watermark image from the video stream added by addVideoWatermark.
     *
     * @returns Promise<{success, value}>
     */
    static removclearVideoWatermarkse() {
        return Agora.clearVideoWatermarks();
    }
    /**
     * set local publish fallback
     *
     * This method sets the fallback option for the locally published video stream based on the network conditions.
     *
     * @param option {0, 1, 2}  [more details](https://docs.agora.io/en/Video/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_constants.html#a3e453c93766e783a7e5eca05b1776238)
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
     */
    static removeInjectStreamUrl(options) {
        return Agora.removeInjectStreamUrl(options);
    }
    /**
     * @deprecated sendMessage
     * sendMessage
     */
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
     * @returns Promise<{success, value}>
     */
    static setLocalVideoMirrorMode(mode) {
        return Agora.setLocalVideoMirrorMode(mode);
    }
    /**
     * switch camera
     *
     * This method switches camera between front and rear.
     *
     * @returns Promise<{success, value}>
     */
    static switchCamera() {
        return Agora.switchCamera();
    }
    /**
     * is camera zoom supported
     *
     * This method checks whether the camera zoom function is supported.
     *
     * @returns Promise<{success, value}>
     */
    static isCameraZoomSupported() {
        return Agora.isCameraZoomSupported();
    }
    /**
     * is camera torch supported
     *
     * This method checks whether the camera flash function is supported.
     *
     * @returns Promise<{success, value}>
     */
    static isCameraTorchSupported() {
        return Agora.isCameraTorchSupported();
    }
    /**
     * is camera focus supported
     *
     * This method checks whether the camera mannual focus function is supported.
     *
     * @returns Promise<{success, value}>
     */
    static isCameraFocusSupported() {
        return Agora.isCameraFocusSupported();
    }
    /**
     * is camera exposure position supported
     *
     * This method checks whether the camera mannual exposure function is supported.
     *
     * @returns Promise<{success, value}>
     */
    static isCameraExposurePositionSupported() {
        return Agora.isCameraExposurePositionSupported();
    }
    /**
     * is camera auto focus face mode supported
     *
     * This method checks whether the camera mannual auto-face focus function is supported.
     *
     * @returns Promise<{success, value}>
     */
    static isCameraAutoFocusFaceModeSupported() {
        return Agora.isCameraAutoFocusFaceModeSupported();
    }
    /**
     * set camera zoom ratio
     *
     * This method sets the camera zoom ratio.
     *
     * @param zoomFactor
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
     */
    static setCameraAutoFocusFaceModeEnabled(enabled) {
        return Agora.setCameraAutoFocusFaceModeEnabled(enabled);
    }
    /**
     * get call id
     *
     * This method is used to get call id.
     *
     * @returns Promise<{success, value}>
     */
    static getCallId() {
        return Agora.getCallId();
    }
    /**
     * set log file and log filter
     *
     * This method sets the log file generated path and specified the log level.
     *
     * @param filepath string
     * @param level enum
     * @param maxfileSize integer (KB)
     * @returns Promise<{success, value}>
     */
    static setLog(filepath, level, maxfileSize) {
        return Agora.setLog(filepath, level, maxfileSize);
    }
    /**
     * add publish stream url
     *
     * This method add publish stream by option.
     *
     * @param options {@link PublishStreamOption}
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     */
    static muteLocalAudioStream(enabled) {
        Agora.muteLocalAudioStream(enabled);
    }
    /**
     * video pre-process/post-process
     *
     * This method enables/disables image enhancement and sets the options.
     *
     * @param enable boolean
     * @param options {@link BeautyOptions}
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
     */
    static setRemoteVoicePosition(uid, pan, gain) {
        return Agora.setRemoteVoicePosition(uid, pan, gain);
    }
    /**
     * start the lastmile probe test
     *
     * This method start the last-mile network probe test before joining a channel to get the uplink and downlink last-mile network statistics, including the bandwidth, packet loss, jitter, and round-trip time (RTT).
     *
     * @param config LastmileProbeConfig {@link LastmileProbeConfig}
     *
     * @event onLastmileQuality: the SDK triggers this callback within two seconds depending on the network conditions. This callback rates the network conditions with a score and is more closely linked to the user experience.
     * @event onLastmileProbeResult: the SDK triggers this callback within 30 seconds depending on the network conditions. This callback returns the real-time statistics of the network conditions and is more objective.
     * @returns Promise<{success, value}>
     */
    static startLastmileProbeTest(config) {
        return Agora.startLastmileProbeTest(config);
    }
    /**
     * stop the lastmile probe test
     *
     * This method stop the lastmile probe test.
     *
     * @returns Promise<{success, value}>
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
     * @param userPriority number | The value range is  [50 is "user's priority is hgih", 100 is "the default user's priority is normal"]
     *
     * @returns Promise<{success, value}>
     */
    static setRemoteUserPriority(uid, userPrority) {
        return Agora.setRemoteUserPriority(uid, userPrority);
    }
    /**
     * start an audio call test.
     *
     * note:
     *   Call this method before joining a channel.
     *   After calling this method, call the stopEchoTest method to end the test. Otherwise, the app cannot run the next echo test, or call the joinchannel method.
     *   In the Live-broadcast profile, only a host can call this method.
     * This method will start an audio call test with interval parameter.
     * In the audio call test, you record your voice. If the recording plays back within the set time interval, the audio devices and the network connection are working properly.
     *
     * @param interval number
     *
     * @returns Promise<{success, value}>
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
     * @returns Promise<{success, value}>
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
     * @returns Promise{<success, value}>
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
     * @returns Promise{<success, value}>
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
     * @returns Promise<{success}>
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
     * @returns Promise{<success, value}>
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
     * @returns Promise{cameraSupportInfo}>
     */
    static getCameraInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let zoomSupported = yield this.isCameraZoomSupported();
            let torchSupported = yield this.isCameraTorchSupported();
            let focusSupported = yield this.isCameraFocusSupported();
            let exposurePositionSupported = yield this.isCameraExposurePositionSupported();
            let autoFocusFaceModeSupported = yield this.isCameraAutoFocusFaceModeSupported();
            let maxZoomFactor = yield this.getCameraMaxZoomFactor();
            return {
                zoomSupported,
                torchSupported,
                focusSupported,
                exposurePositionSupported,
                autoFocusFaceModeSupported,
                maxZoomFactor
            };
        });
    }
}
RtcEngine.AG_PREFIX = 'ag_rtc';
exports.default = RtcEngine;
//# sourceMappingURL=RtcEngine.native.js.map