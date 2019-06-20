import {
    NativeModules,
    NativeEventEmitter,
    Platform
} from 'react-native';

import {
    Option, Callback,
    VideoOption,
    AudioMixingOption,
    DataStreamOption,
    PlayEffectOption,
    AudioRecordingOption,
    AudioFrameOption,
    MixedAudioFrameOption,
    ImageOption,
    VideoStreamOption,
    DefaultVideoStreamOption,
    InjectStreamOption,
    RemoveInjectStreamOption,
    PublishStreamOption,
    RemovePublishStreamOption,
    LiveTranscodingOption,
    PositionOption,
    BeautyOption,
    LastmileProbeConfig,
    CameraCapturerConfiguration
} from "./types";


const { Agora } = NativeModules;
const AgoraEventEmitter = new NativeEventEmitter(Agora);

/**
 * RtcEngine is the javascript object for control agora native sdk through react native bridge.
 *
 * You can use the RtcEngine methods to create {@link init}
 *
 * Other methods of the RtcEngine object serve for agora native sdk and set up error logging.
 */
class RtcEngine {

    private static eventTypes: Set<string> = new Set<string>();

    /**
     * Creates a RtcEngine Object internal.
     *
     * This method creates and start event observer. You should call this method once.
     * @example `RtcEngine.init(option)`
     * @param options Defines the property of the client, see {@link Option} for details.
     */
    public static init(options: Option): void {
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
    public static joinChannel(channelName: string, uid?: number, token?: string, info?: Object): void {
        return Agora.joinChannel({channelName, uid, token, info});
    }

    /**
     * add event listener
     *
     * This method subscribes specified eventType and run listener. You should call this method at first.
     * @param eventType
     * @param listener
     */
    public static on(eventType: string, listener: (...args: any[]) => any) {
        this.eventTypes.add(eventType);
        AgoraEventEmitter.addListener(eventType, listener);
    }

    /**
     * remove event listeners
     *
     * This method unsubscribes specified eventType related all listeners. You should call this method when you want to unsubscribe some eventType.
     * @param eventType
     */
    public static off(eventType: string) {
        AgoraEventEmitter.removeAllListeners(eventType);
        this.eventTypes.delete(eventType);
    }

    /**
     * remove all events listeners
     *
     * This method unsubscribes all eventTypes related listeners.
     *
     * @param token
     */
    public static removeAllListeners() {
        for (let eventType of this.eventTypes) {
            AgoraEventEmitter.removeAllListeners(eventType);
        }
        this.eventTypes.clear();
    }

    /**
     * renew token
     *
     * This method renews a new token.
     * @param token
     */
    public static renewToken(token: string) {
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
    public static enableWebSdkInteroperability(enabled: boolean): Promise<any> {
        return Agora.enableWebSdkInteroperability(enabled);
    }

    /**
     * get agora native sdk connection state
     *
     * This method gets agora native sdk connection state
     * @returns Promise<{success: true, state: (connection state)}>
     */
    public static getConnectionState() {
        return Agora.getConnectionState();
    }

    /**
     * change the client role
     *
     * This method changes the client of role.
     * @param role (audience: 0, host: 1)
     */
    public static setClientRole(role: number) {
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
    public static leaveChannel(): Promise<any> {
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
    public static destroy(): Promise<any> {
        return Agora.destroy();
    }

    /**
     * set local video render mode
     *
     * This method calls native sdk render mode for local video.
     * @param mode
     */
    public static setLocalRenderMode(mode: number) {
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
    public static setRemoteRenderMode(uid: number, mode: number) {
        Agora.setRemoteRenderMode(uid, mode);
    }

    /**
     * start video preview
     *
     * This method start video preview for video.
     */
    public static startPreview() {
        Agora.startPreview();
    }


    /**
     * stop video preview
     *
     * This method stops video preview for video.
     */
    public static stopPreview() {
        Agora.stopPreview();
    }

    /**
     * set enable speaker phone
     *
     * This method set the speaker phone enable or disable by pass boolean parameter.
     * @param enabled
     */
    public static setEnableSpeakerphone(enabled: boolean) {
        Agora.setEnableSpeakerphone(enabled);
    }

    /**
     * set default audio speaker
     *
     * This method set the default audio speaker enable or disable by pass boolean parameter.
     * @param enabled
     */
    public static setDefaultAudioRouteToSpeakerphone(enabled: boolean) {
        Agora.setDefaultAudioRouteToSpeakerphone(enabled);
    }


    /**
     * set default mute all remote audio streams
     *
     * This method set default mute all remote audio streams enable or not by pass boolean parameter.
     * @param enabled
     */
    public static setDefaultMuteAllRemoteAudioStreams(enabled: boolean) {
        Agora.setDefaultMuteAllRemoteAudioStreams(enabled);
    }

    /**
     * enable video
     *
     * This method enables video.
     */
    public static enableVideo() {
        Agora.enableVideo();
    }

    /**
     * disable video
     *
     * This method disables video.
     */
    public static disableVideo() {
        Agora.disableVideo();
    }

    /**
     * enable local video
     *
     * This method enables the local video by the boolean parameter.
     * @param enabled
     */
    public static enableLocalVideo(enabled: boolean) {
        Agora.enableLocalVideo(enabled);
    }

    /**
     * mute local video stream
     *
     * This method mutes video stream by the boolean parameter.
     * @param muted
     */
    public static muteLocalVideoStream(muted: boolean) {
        Agora.muteLocalVideoStream(muted);
    }

    /**
     * mute all remote video streams
     *
     * This method mutes all remote streams by the boolean parameter.
     * @param muted
     */
    public static muteAllRemoteVideoStreams(muted: boolean) {
        Agora.muteAllRemoteVideoStreams(muted);
    }

    /**
     * mute specified remote video stream.
     *
     * This method mutes remote video stream by the number of uid and boolean parameter.
     * @param uid
     * @param muted
     */
    public static muteRemoteVideoStream(uid: number, muted: boolean) {
        Agora.muteRemoteVideoStream(uid, muted);
    }

    /**
     * set default mute all remote video stream
     *
     * This method mutes all remote video stream default by the boolean parameter.
     * @param muted
     */
    public static setDefaultMuteAllRemoteVideoStreams(muted: boolean) {
        Agora.setDefaultMuteAllRemoteVideoStreams(muted);
    }

    /**
     * enable audio
     *
     * This method enables audio
     */
    public static enableAudio() {
        Agora.enableAudio();
    }

    /**
     * disable audio
     *
     * This method disables audio
     */
    public static disableAudio() {
        Agora.disableAudio();
    }

    /**
     * enable local audio
     *
     * This method enables local audio by the boolean parameter.
     * @param enabled
     */
    public static enableLocalAudio(enabled: boolean) {
        Agora.enableLocalAudio(enabled);
    }

    /**
     * mute local audio stream
     *
     * This method mutes the local audio stream by muted.
     * @param muted
     */
    public static disableLocalAudio(muted: boolean) {
        Agora.disableLocalAudio(muted);
    }

    /**
     * mute all remote audio streams
     *
     * This method mutes all remote audio streams by muted
     */
    public static muteAllRemoteAudioStreams(muted: boolean) {
        Agora.muteAllRemoteAudioStreams(muted);
    }

    /**
     * mute specified remote audio stream by muted
     *
     * This method mutes specified remote audio stream by number uid and boolean muted.
     * @param uid
     * @param muted
     */
    public static muteRemoteAudioStream(uid: number, muted: boolean) {
        Agora.muteRemoteAudioStream(uid, muted);
    }

    /**
     * adjust recording signal volume
     *
     * This method adjusts recording your signal by volume.
     * @param volume
     */
    public static adjustRecordingSignalVolume(volume: number) {
        Agora.adjustRecordingSignalVolume(volume);
    }

    /**
     * adjust playback signal volume
     *
     * This method adjusts playback signal by volume.
     * @param volume
     */
    public static adjustPlaybackSignalVolume(volume: number) {
        Agora.adjustPlaybackSignalVolume(volume);
    }

    /**
     * enable audio volume indication
     *
     * This method enables audio volume by interval and smooth
     * @param interval
     * @param smooth
     */
    public static enableAudioVolumeIndication(interval: number, smooth: number) {
        Agora.enableAudioVolumeIndication(interval, smooth);
    }

    /**
     * create data stream
     *
     * This method creates data stream with options
     *
     * @param options {@link DataStreamOption}
     */
    public static createDataStream(options: DataStreamOption) {
        return Agora.createDataStream(options);
    }

    /**
     * check for mobile phone speaker enabled
     *
     * This method checks the phone speaker is enabled
     * @param callback
     */
    public static methodisSpeakerphoneEnabled(callback: Callback<any>) {
        Agora.methodisSpeakerphoneEnabled(callback);
    }

    /**
     * enable in-ear monitor
     *
     * This method enables in-ear monitoring by boolean parameter enabled
     *
     * @param enabled
     */
    public static enableInEarMonitoring(enabled: boolean) {
        Agora.enableInEarMonitoring(enabled);
    }

    /**
     * set in-ear monitoring volume
     *
     * This method sets the in-ear-monitoring volume by number parameter volume
     *
     * @param volume
     */
    public static setInEarMonitoringVolume(volume: number) {
        Agora.setInEarMonitoringVolume(volume);
    }

    /**
     * set local voice pitch
     *
     * This method sets the local voice pitch by float parameter pitch
     *
     * @param pitch
     */
    public static setLocalVoicePitch(pitch: number) {
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
    public static setLocalVoiceEqualization(band: number, gain: number) {
        Agora.setLocalVoiceEqualization(band ,gain);
    }

    /**
     * set local voice reverb
     *
     * This method sets local voice by reverb and value
     * @param reverb
     * @param value
     */
    public static setLocalVoiceReverb(reverb: number, value: number) {
        Agora.setLocalVoiceReverb(reverb, value);
    }

    /**
     * start audio mixing
     *
     * This method will start audio mixing by option config
     *
     * @param options {@link AudioMixingOption}
     */
    public static startAudioMixing(options: AudioMixingOption) {
        Agora.startAudioMixing(options);
    }

    /**
     * stop audio mixing
     *
     * This methods stops for audio mixing.
     */
    public static stopAudioMixing() {
        Agora.stopAudioMixing();
    }

    /**
     * pause audio mixing
     *
     * This method pauses for audio mixing.
     */
    public static pauseAudioMixing() {
        Agora.pauseAudioMixing();
    }

    /**
     * resume audio mixing
     *
     * This method resumes for audio mixing.
     */
    public static resumeAudioMixing() {
        Agora.resumeAudioMixing();
    }

    /**
     * adjust audio mixing volume
     *
     * This method adjusts audio mixing volume by the volume number parameter
     * @param volume
     */
    public static adjustAudioMixingVolume(volume: number) {
        Agora.adjustAudioMixingVolume(volume);
    }

    /**
     * adjust audio mixing playout volume
     *
     * This method adjusts audio mixing playout by the volume parameter
     * @param volume
     */
    public static adjustAudioMixingPlayoutVolume(volume: number) {
        Agora.adjustAudioMixingPlayoutVolume(volume);
    }

    /**
     * adjust audio mixing publish volume
     *
     * This method adjusts audio mixing publish by the volume paraemter
     * @param volume
     */
    public static adjustAudioMixingPublishVolume(volume: number) {
        Agora.adjustAudioMixingPublishVolume(volume);
    }

    /**
     * get audio mixing duration
     *
     * This method gets the audio mixing duration
     * @returns Promise<{success, value}>
     */
    public static getAudioMixingDuration(): Promise<any> {
        return Agora.getAudioMixingDuration();
    }

    /**
     * get audio mixing current position
     *
     * This method gets audio mixing current position value.
     * @returns Promise<{success, value}>
     */
    public static getAudioMixingCurrentPosition(): Promise<any> {
        return Agora.getAudioMixingCurrentPosition();
    }

    /**
     * set audio mixing position
     *
     * This method sets audio mixing position by the parameter pos
     * @param pos
     */
     public static setAudioMixingPosition(pos: number): Promise<any> {
         return Agora.setAudioMixingPosition(pos);
     }

     /**
      * get effects of volume
      *
      * This methods get audio mixing effects volume value.
      * @returns Promise<{success, value}>
      */
     public static getEffectsVolume(): Promise<any> {
         return Agora.getEffectsVolume();
     }

     /**
      * set effects volume
      *
      * This methods set audio mixing effects volume by float parameter.
      * @param volume
      * @returns Promise<{success, value}>
      */
     public static setEffectsVolume(volume: number): Promise<any> {
        return Agora.setEffectsVolume(volume);
     }

     /**
      * set volume for playing effects.
      *
      * This methods set for playing audio mixing effects
      * @returns Promise<{success, value}>
      */
     public static setVolumeOfEffect(volume: number): Promise<any> {
        return Agora.setVolumeOfEffect(volume);
     }

     /**
      * play specified effect for audio mixing
      *
      * This methos plays the specified effect of audio mixing file by option config.
      * @param options {@link PlayEffectOption}
      * @returns Promise<{success, value}>
      */
     public static playEffect(options: PlayEffectOption): Promise<any> {
        return Agora.playEffect(options);
     }

     /**
      * stop play effect for audio mixing
      *
      * This methods stops the specified effect for audio mixing file by soundid.
      * @param sounid
      * @returns Promise<{success, value}>
      */
     public static stopEffect(soundId: number): Promise<any> {
        return Agora.stopEffect(soundId);
     }

     /**
      * stop play all for effect audio mixing.
      *
      * This methods stops all effect audio mixing.
      * @returns Promise<{success, value}>
      */
     public static stopAllEffects(): Promise<any> {
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
     public static preloadEffect(soundId: number, filepath: string): Promise<any> {
        return Agora.preloadEffect(soundId, filepath);
     }

     /**
      * unload effect
      *
      * This methods unload the already loaded audio mixing file from memory by the soundid.
      * @param soundid
      * @returns Promise<{success, value}>
      */
     public static unloadEffect(soundId: number): Promise<any> {
         return Agora.unloadEffect(soundId);
     }

     /**
      * pause the specified effect for audio mixing by soundid
      *
      * This method pauses the specified effect for audio mixing by soundid.
      * @param soundid
      * @returns Promise<{success, value}>
      */
     public static pauseEffect(soundId: number): Promise<any> {
        return Agora.pauseEffect(soundId);
     }

     /**
      * pause all effects for audio mixing
      *
      * This method pause all effects for audio mixing.
      * @param soundid
      * @returns Promise<{success, value}>
      */
     public static pauseAllEffects(): Promise<any> {
        return Agora.pauseAllEffects();
     }

     /**
      * resume audio mixing effect by the specified soundid
      *
      * This method resumes audio mixing effect by the specified soundid
      * @param soundid
      * @returns Promise<{success, value}>
      */
     public static resumeEffect(soundId: number): Promise<any> {
        return Agora.resumeEffect(soundId);
     }

     /**
      * resume all audio mixing effects.
      *
      * This method resumes all audio mixing effects.
      * @returns Promise<{success, value}>
      */
     public static resumeAllEffects(): Promise<any> {
        return Agora.resumeAllEffects();
     }

     /**
      * start audio recording by quality
      *
      * This method start audio recording by quality config
      * @param options {@link AudioRecordingOption}
      * @returns Promise<{success, value}>
      */
     public static startAudioRecording(options: AudioRecordingOption): Promise<any> {
        return Agora.startAudioRecording(options);
     }

     /**
      * stop audio recording
      *
      * This method stops audio recording.
      * @returns Promise<{success, value}>
      */
     public static stopAudioRecording(): Promise<any> {
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
     public static setAudioSessionOperationRestriction() {
         if (Platform.OS != 'ios') throw Error(`setAudioSessionOperationRestriction is not support on your platform. Please check the details in react-native-agora docs`);
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
    public static stopEchoTest(): Promise<any> {
        return Agora.stopEchoTest();
    }

    /**
     * enable lastmile test
     *
     * This method enables the network connection qualit test.
     *
     * @returns Promise<{success, value}>
     */
    public static enableLastmileTest(): Promise<any> {
        return Agora.enableLastmileTest();
    }

    /**
     * disable lastmile test
     *
     * This method disable the network connection qualit test.
     *
     * @returns Promise<{success, value}>
     */
    public static disableLastmileTest(): Promise<any> {
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
    public static setRecordingAudioFrameParameters(options: AudioFrameOption): Promise<any> {
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
    public static setPlaybackAudioFrameParameters(options: AudioFrameOption): Promise<any> {
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
    public static setMixedAudioFrameParameters(options: MixedAudioFrameOption): Promise<any> {
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
    public static addVideoWatermark(options: ImageOption): Promise<any> {
        return Agora.addVideoWatermark(options);
    }

    /**
     * clear video watermarks
     *
     * This method removes the watermark image from the video stream added by addVideoWatermark.
     *
     * @returns Promise<{success, value}>
     */
    public static removclearVideoWatermarkse(): Promise<any> {
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
    public static setLocalPublishFallbackOption(option: number): Promise<any> {
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
    public static setRemoteSubscribeFallbackOption(option: number): Promise<any> {
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
    public static enableDualStreamMode(enabled: boolean): Promise<any> {
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
    public static setRemoteVideoStreamType(options: VideoStreamOption): Promise<any> {
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
    public static setRemoteDefaultVideoStreamType(options: DefaultVideoStreamOption): Promise<any> {
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
    public static addInjectStreamUrl(options: InjectStreamOption): Promise<any> {
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
    public static removeInjectStreamUrl(options: RemoveInjectStreamOption): Promise<any> {
        return Agora.removeInjectStreamUrl(options);
    }

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
    public static setLocalVideoMirrorMode(mode: number): Promise<any> {
        return Agora.setLocalVideoMirrorMode(mode);
    }

    /**
     * switch camera
     *
     * This method switches camera between front and rear.
     *
     * @returns Promise<{success, value}>
     */
    public static switchCamera(): Promise<any> {
        return Agora.switchCamera();
    }

    /**
     * is camera zoom supported
     *
     * This method checks whether the camera zoom function is supported.
     *
     * @returns Promise<{success, value}>
     */
    public static isCameraZoomSupported(): Promise<any> {
        return Agora.isCameraZoomSupported();
    }

    /**
     * is camera torch supported
     *
     * This method checks whether the camera flash function is supported.
     *
     * @returns Promise<{success, value}>
     */
    public static isCameraTorchSupported(): Promise<any> {
        return Agora.isCameraTorchSupported();
    }

    /**
     * is camera focus supported
     *
     * This method checks whether the camera mannual focus function is supported.
     *
     * @returns Promise<{success, value}>
     */
    public static isCameraFocusSupported(): Promise<any> {
        return Agora.isCameraFocusSupported();
    }

    /**
     * is camera exposure position supported
     *
     * This method checks whether the camera mannual exposure function is supported.
     *
     * @returns Promise<{success, value}>
     */
    public static isCameraExposurePositionSupported(): Promise<any> {
        return Agora.isCameraExposurePositionSupported();
    }

    /**
     * is camera auto focus face mode supported
     *
     * This method checks whether the camera mannual auto-face focus function is supported.
     *
     * @returns Promise<{success, value}>
     */
    public static isCameraAutoFocusFaceModeSupported(): Promise<any> {
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
    public static setCameraZoomFactor(zoomFactor: number): Promise<any> {
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
    public static getCameraMaxZoomFactor(): Promise<any> {
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
    public static setCameraFocusPositionInPreview(options: PositionOption): Promise<any> {
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
    public static setCameraExposurePosition(options: PositionOption): Promise<any> {
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
    public static setCameraTorchOn(enabled: boolean): Promise<any> {
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
    public static setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<any> {
        return Agora.setCameraAutoFocusFaceModeEnabled(enabled);
    }

    /**
     * get call id
     *
     * This method is used to get call id.
     *
     * @returns Promise<{success, value}>
     */
    public static getCallId(): Promise<any> {
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
    public static setLog(filepath: string, level: number, maxfileSize: number): Promise<any> {
        return Agora.setLog(filepath, level, maxfileSize)
    }

    /**
     * send stream message
     *
     * This method sends stream message by specified uid
     *
     * @param uid
     * @param data
     * @returns Promise<{success, value}>
     */
    public static sendMessage(streamID: number, data: any, reliable: boolean, ordered: boolean): Promise<any> {
        return Agora.sendMessage({streamID, data, reliable, ordered});
    }

    /**
     * add publish stream url
     *
     * This method add publish stream by option.
     *
     * @param options {@link PublishStreamOption}
     * @returns Promise<{success, value}>
     */
    public static addPublishStreamUrl(options: PublishStreamOption): Promise<any> {
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
    public static removePublishStreamUrl(options: RemovePublishStreamOption): Promise<any> {
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
    public static setLiveTranscoding(options: LiveTranscodingOption): Promise<any> {
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
    public static getSdkVersion(callback: Callback<any>, errorHandler?: Callback<any>) {
        return Agora.getSdkVersion().then(callback).catch(errorHandler);
    }

    /**
     * mute local audio stream
     *
     * This method sends/stops sending the local audio.
     *
     * @param enabled
     */

     public static muteLocalAudioStream(enabled: boolean) {
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
    static setBeautyEffectOptions(enabled: boolean, options: BeautyOption): Promise<any> {
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
    static setLocalVoiceChanger(voiceChanger: number): Promise<any> {
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
    static setLocalVoiceReverbPreset(preset: number): Promise<any> {
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
    static enableSoundPositionIndication(enabled: boolean): Promise<any> {
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
    static setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<any> {
        return Agora.setRemoteVoicePosition(uid, pan, gain)
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
    static startLastmileProbeTest(config: LastmileProbeConfig): Promise<any> {
        return Agora.startLastmileProbeTest(config);
    }

    /**
     * stop the lastmile probe test
     *
     * This method stop the lastmile probe test.
     *
     * @returns Promise<{success, value}>
     */
    static stopLastmileProbeTest(): Promise<any> {
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
    static setRemoteUserPriority(uid: number, userPrority: number): Promise<any> {
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
    static startEchoTestWithInterval(interval: number): Promise<any> {
        return Agora.startEchoTestWithInterval(interval)
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
    static setCameraCapturerConfiguration(config: CameraCapturerConfiguration): Promise<any> {
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
    static getAudioMixingPlayoutVolume(): Promise<any> {
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
    static getAudioMixingPublishVolume(): Promise<any> {
        return Agora.getAudioMixingPublishVolume();
    }

    /**
     * sendMediaData for media observer.
     * 
     * note:
     * This method needs you invoke registerMediaMetadataObserver success first and you could send media data through interval media observer feature.
     * The data have limit length is 1024 bytes, if you pass data length bigger than limit it will failed.
     * @param data String: 1024 bytes limit
     */
    static sendMediaData(data: String): void {
        return Agora.sendMediaData(data);
    }

    /**
     * Registers the metadata observer.
     * 
     * note:
     * This method only work in live mode
     * This method enables you to add synchronized metadata in the video stream for more diversified live broadcast interactions, such as sending shopping links, digital coupons, and online quizzes.
     * This method trigger 'metaMediaDataRecevied' event, here is example:
     * ```javascript
     *      RtcEngine.on("metaMediaDataRecevied", (data) => {
     *        console.log("metaMediaDataRecevied", data);
     *      })
     * ```
     * @returns Promise{<success, value}>
     */
    static registerMediaMetadataObserver(): Promise<any> {
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
    static async getCameraInfo(): Promise<any> {
        let zoomSupported = await this.isCameraZoomSupported();
        let torchSupported = await this.isCameraTorchSupported();
        let focusSupported = await this.isCameraFocusSupported();
        let exposurePositionSupported = await this.isCameraExposurePositionSupported();
        let autoFocusFaceModeSupported = await this.isCameraAutoFocusFaceModeSupported();
        let maxZoomFactor = await this.getCameraMaxZoomFactor();
        return {
            zoomSupported,
            torchSupported,
            focusSupported,
            exposurePositionSupported,
            autoFocusFaceModeSupported,
            maxZoomFactor
        }
    }

}




export default RtcEngine;
