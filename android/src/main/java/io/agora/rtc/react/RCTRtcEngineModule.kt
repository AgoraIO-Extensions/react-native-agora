package io.agora.rtc.react

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.agora.rtc.IMetadataObserver
import io.agora.rtc.RtcEngine
import io.agora.rtc.base.*
import io.agora.rtc.models.UserInfo
import io.agora.rtc.react.RCTRtcEngineModule.Companion.REACT_CLASS

@ReactModule(name = REACT_CLASS)
class RCTRtcEngineModule(
        reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext),
        RtcEngineInterface<ReadableMap, Promise> {
    companion object {
        const val REACT_CLASS = "RCTRtcEngineModule"
    }

    var engine: RtcEngine? = null
    private var mediaObserver: MediaObserver? = null

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getConstants(): MutableMap<String, Any> {
        return mutableMapOf(
                "prefix" to RtcEngineEventHandler.PREFIX
        )
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        destroy(null)
    }

    private fun emit(methodName: String, data: Map<String, Any?>?) {
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("${RtcEngineEventHandler.PREFIX}$methodName", Arguments.makeNativeMap(data))
    }

    @ReactMethod
    override fun create(appId: String, callback: Promise?) {
        try {
            engine = RtcEngine.create(reactApplicationContext.applicationContext, appId, RtcEngineEventHandler { methodName, data ->
                emit(methodName, data)
            })
            callback?.resolve(null)
        } catch (ex: Exception) {
            callback?.reject(ex)
        }
    }

    @ReactMethod
    override fun destroy(callback: Promise?) {
        RtcEngine.destroy()
        engine = null
        callback?.resolve(null)
    }

    @ReactMethod
    override fun setChannelProfile(profile: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setChannelProfile(profile))
    }

    @ReactMethod
    override fun setClientRole(role: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setClientRole(role))
    }

    @ReactMethod
    override fun joinChannel(token: String?, channelName: String, optionalInfo: String?, optionalUid: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.joinChannel(token, channelName, optionalInfo, optionalUid))
    }

    @ReactMethod
    override fun switchChannel(token: String?, channelName: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.switchChannel(token, channelName))
    }

    @ReactMethod
    override fun leaveChannel(callback: Promise?) {
        PromiseCallback(callback).code(engine?.leaveChannel())
    }

    @ReactMethod
    override fun renewToken(token: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.renewToken(token))
    }

    @ReactMethod
    override fun getConnectionState(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.connectionState }
    }

    @ReactMethod
    override fun getCallId(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.callId }
    }

    @ReactMethod
    override fun rate(callId: String, rating: Int, description: String?, callback: Promise?) {
        PromiseCallback(callback).code(engine?.rate(callId, rating, description))
    }

    @ReactMethod
    override fun complain(callId: String, description: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.complain(callId, description))
    }

    @ReactMethod
    override fun setLogFile(filePath: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLogFile(filePath))
    }

    @ReactMethod
    override fun setLogFilter(filter: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLogFilter(filter))
    }

    @ReactMethod
    override fun setLogFileSize(fileSizeInKBytes: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLogFileSize(fileSizeInKBytes))
    }

    @ReactMethod
    override fun setParameters(parameters: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setParameters(parameters))
    }

    @ReactMethod
    override fun enableWebSdkInteroperability(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableWebSdkInteroperability(enabled))
    }

    @ReactMethod
    override fun registerLocalUserAccount(appId: String, userAccount: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.registerLocalUserAccount(appId, userAccount))
    }

    @ReactMethod
    override fun joinChannelWithUserAccount(token: String?, channelName: String, userAccount: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.joinChannelWithUserAccount(token, channelName, userAccount))
    }

    @ReactMethod
    override fun getUserInfoByUserAccount(userAccount: String, callback: Promise?) {
        val userInfo = UserInfo()
        PromiseCallback(callback).code(engine?.getUserInfoByUserAccount(userAccount, userInfo)) {
            userInfo.toMap()
        }
    }

    @ReactMethod
    override fun getUserInfoByUid(uid: Int, callback: Promise?) {
        val userInfo = UserInfo()
        PromiseCallback(callback).code(engine?.getUserInfoByUid(uid, userInfo)) {
            userInfo.toMap()
        }
    }

    @ReactMethod
    override fun enableAudio(callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableAudio())
    }

    @ReactMethod
    override fun disableAudio(callback: Promise?) {
        PromiseCallback(callback).code(engine?.disableAudio())
    }

    @ReactMethod
    override fun setAudioProfile(profile: Int, scenario: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setAudioProfile(profile, scenario))
    }

    @ReactMethod
    override fun adjustRecordingSignalVolume(volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.adjustRecordingSignalVolume(volume))
    }

    @ReactMethod
    override fun adjustUserPlaybackSignalVolume(uid: Int, volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.adjustUserPlaybackSignalVolume(uid, volume))
    }

    @ReactMethod
    override fun adjustPlaybackSignalVolume(volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.adjustPlaybackSignalVolume(volume))
    }

    @ReactMethod
    override fun enableLocalAudio(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableLocalAudio(enabled))
    }

    @ReactMethod
    override fun muteLocalAudioStream(muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.muteLocalAudioStream(muted))
    }

    @ReactMethod
    override fun muteRemoteAudioStream(uid: Int, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.muteRemoteAudioStream(uid, muted))
    }

    @ReactMethod
    override fun muteAllRemoteAudioStreams(muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.muteAllRemoteAudioStreams(muted))
    }

    @ReactMethod
    override fun setDefaultMuteAllRemoteAudioStreams(muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setDefaultMuteAllRemoteAudioStreams(muted))
    }

    @ReactMethod
    override fun enableAudioVolumeIndication(interval: Int, smooth: Int, report_vad: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableAudioVolumeIndication(interval, smooth, report_vad))
    }

    @ReactMethod
    override fun enableVideo(callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableVideo())
    }

    @ReactMethod
    override fun disableVideo(callback: Promise?) {
        PromiseCallback(callback).code(engine?.disableVideo())
    }

    @ReactMethod
    override fun setVideoEncoderConfiguration(config: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setVideoEncoderConfiguration(mapToVideoEncoderConfiguration(config.toHashMap())))
    }

    @ReactMethod
    override fun enableLocalVideo(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableLocalVideo(enabled))
    }

    @ReactMethod
    override fun muteLocalVideoStream(muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.muteLocalVideoStream(muted))
    }

    @ReactMethod
    override fun muteRemoteVideoStream(uid: Int, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.muteRemoteVideoStream(uid, muted))
    }

    @ReactMethod
    override fun muteAllRemoteVideoStreams(muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.muteAllRemoteVideoStreams(muted))
    }

    @ReactMethod
    override fun setDefaultMuteAllRemoteVideoStreams(muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setDefaultMuteAllRemoteVideoStreams(muted))
    }

    @ReactMethod
    override fun setBeautyEffectOptions(enabled: Boolean, options: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setBeautyEffectOptions(enabled, mapToBeautyOptions(options.toHashMap())))
    }

    @ReactMethod
    override fun startAudioMixing(filePath: String, loopback: Boolean, replace: Boolean, cycle: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.startAudioMixing(filePath, loopback, replace, cycle))
    }

    @ReactMethod
    override fun stopAudioMixing(callback: Promise?) {
        PromiseCallback(callback).code(engine?.stopAudioMixing())
    }

    @ReactMethod
    override fun pauseAudioMixing(callback: Promise?) {
        PromiseCallback(callback).code(engine?.pauseAudioMixing())
    }

    @ReactMethod
    override fun resumeAudioMixing(callback: Promise?) {
        PromiseCallback(callback).code(engine?.resumeAudioMixing())
    }

    @ReactMethod
    override fun adjustAudioMixingVolume(volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.adjustAudioMixingVolume(volume))
    }

    @ReactMethod
    override fun adjustAudioMixingPlayoutVolume(volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.adjustAudioMixingPlayoutVolume(volume))
    }

    @ReactMethod
    override fun adjustAudioMixingPublishVolume(volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.adjustAudioMixingPublishVolume(volume))
    }

    @ReactMethod
    override fun getAudioMixingPlayoutVolume(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.audioMixingPlayoutVolume }
    }

    @ReactMethod
    override fun getAudioMixingPublishVolume(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.audioMixingPublishVolume }
    }

    @ReactMethod
    override fun getAudioMixingDuration(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.audioMixingDuration }
    }

    @ReactMethod
    override fun getAudioMixingCurrentPosition(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.audioMixingCurrentPosition }
    }

    @ReactMethod
    override fun setAudioMixingPosition(pos: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setAudioMixingPosition(pos))
    }

    @ReactMethod
    override fun getEffectsVolume(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.audioEffectManager.effectsVolume }
    }

    @ReactMethod
    override fun setEffectsVolume(volume: Double, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.setEffectsVolume(volume))
    }

    @ReactMethod
    override fun setVolumeOfEffect(soundId: Int, volume: Double, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.setVolumeOfEffect(soundId, volume))
    }

    @ReactMethod
    override fun playEffect(soundId: Int, filePath: String, loopCount: Int, pitch: Double, pan: Double, gain: Double, publish: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish))
    }

    @ReactMethod
    override fun stopEffect(soundId: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.stopEffect(soundId))
    }

    @ReactMethod
    override fun stopAllEffects(callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.stopAllEffects())
    }

    @ReactMethod
    override fun preloadEffect(soundId: Int, filePath: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.preloadEffect(soundId, filePath))
    }

    @ReactMethod
    override fun unloadEffect(soundId: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.unloadEffect(soundId))
    }

    @ReactMethod
    override fun pauseEffect(soundId: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.pauseEffect(soundId))
    }

    @ReactMethod
    override fun pauseAllEffects(callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.pauseAllEffects())
    }

    @ReactMethod
    override fun resumeEffect(soundId: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.resumeEffect(soundId))
    }

    @ReactMethod
    override fun resumeAllEffects(callback: Promise?) {
        PromiseCallback(callback).code(engine?.audioEffectManager?.resumeAllEffects())
    }

    @ReactMethod
    override fun setLocalVoiceChanger(voiceChanger: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLocalVoiceChanger(voiceChanger))
    }

    @ReactMethod
    override fun setLocalVoiceReverbPreset(preset: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLocalVoiceReverbPreset(preset))
    }

    @ReactMethod
    override fun setLocalVoicePitch(pitch: Double, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLocalVoicePitch(pitch))
    }

    @ReactMethod
    override fun setLocalVoiceEqualization(bandFrequency: Int, bandGain: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLocalVoiceEqualization(bandFrequency, bandGain))
    }

    @ReactMethod
    override fun setLocalVoiceReverb(reverbKey: Int, value: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLocalVoiceReverb(reverbKey, value))
    }

    @ReactMethod
    override fun enableSoundPositionIndication(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableSoundPositionIndication(enabled))
    }

    @ReactMethod
    override fun setRemoteVoicePosition(uid: Int, pan: Double, gain: Double, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setRemoteVoicePosition(uid, pan, gain))
    }

    @ReactMethod
    override fun setLiveTranscoding(transcoding: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLiveTranscoding(mapToLiveTranscoding(transcoding.toHashMap())))
    }

    @ReactMethod
    override fun addPublishStreamUrl(url: String, transcodingEnabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.addPublishStreamUrl(url, transcodingEnabled))
    }

    @ReactMethod
    override fun removePublishStreamUrl(url: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.removePublishStreamUrl(url))
    }

    @ReactMethod
    override fun startChannelMediaRelay(channelMediaRelayConfiguration: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.startChannelMediaRelay(mapToChannelMediaRelayConfiguration(channelMediaRelayConfiguration.toHashMap())))
    }

    @ReactMethod
    override fun updateChannelMediaRelay(channelMediaRelayConfiguration: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.updateChannelMediaRelay(mapToChannelMediaRelayConfiguration(channelMediaRelayConfiguration.toHashMap())))
    }

    @ReactMethod
    override fun stopChannelMediaRelay(callback: Promise?) {
        PromiseCallback(callback).code(engine?.stopChannelMediaRelay())
    }

    @ReactMethod
    override fun setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker))
    }

    @ReactMethod
    override fun setEnableSpeakerphone(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setEnableSpeakerphone(enabled))
    }

    @ReactMethod
    override fun isSpeakerphoneEnabled(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.isSpeakerphoneEnabled }
    }

    @ReactMethod
    override fun enableInEarMonitoring(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableInEarMonitoring(enabled))
    }

    @ReactMethod
    override fun setInEarMonitoringVolume(volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setInEarMonitoringVolume(volume))
    }

    @ReactMethod
    override fun enableDualStreamMode(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableDualStreamMode(enabled))
    }

    @ReactMethod
    override fun setRemoteVideoStreamType(uid: Int, streamType: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setRemoteVideoStreamType(uid, streamType))
    }

    @ReactMethod
    override fun setRemoteDefaultVideoStreamType(streamType: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setRemoteDefaultVideoStreamType(streamType))
    }

    @ReactMethod
    override fun setLocalPublishFallbackOption(option: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setLocalPublishFallbackOption(option))
    }

    @ReactMethod
    override fun setRemoteSubscribeFallbackOption(option: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setRemoteSubscribeFallbackOption(option))
    }

    @ReactMethod
    override fun setRemoteUserPriority(uid: Int, userPriority: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setRemoteUserPriority(uid, userPriority))
    }

    @ReactMethod
    override fun startEchoTest(intervalInSeconds: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.startEchoTest(intervalInSeconds))
    }

    @ReactMethod
    override fun stopEchoTest(callback: Promise?) {
        PromiseCallback(callback).code(engine?.stopEchoTest())
    }

    @ReactMethod
    override fun enableLastmileTest(callback: Promise?) {
        PromiseCallback(callback).code(engine?.enableLastmileTest())
    }

    @ReactMethod
    override fun disableLastmileTest(callback: Promise?) {
        PromiseCallback(callback).code(engine?.disableLastmileTest())
    }

    @ReactMethod
    override fun startLastmileProbeTest(config: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.startLastmileProbeTest(mapToLastmileProbeConfig(config.toHashMap())))
    }

    @ReactMethod
    override fun stopLastmileProbeTest(callback: Promise?) {
        PromiseCallback(callback).code(engine?.stopLastmileProbeTest())
    }

    @ReactMethod
    override fun registerMediaMetadataObserver(callback: Promise?) {
        mediaObserver = MediaObserver { methodName, data -> emit(methodName, data) }
        PromiseCallback(callback).code(engine?.registerMediaMetadataObserver(mediaObserver, IMetadataObserver.VIDEO_METADATA))
    }

    @ReactMethod
    override fun unregisterMediaMetadataObserver(callback: Promise?) {
        mediaObserver = null
        PromiseCallback(callback).code(engine?.registerMediaMetadataObserver(mediaObserver, IMetadataObserver.VIDEO_METADATA))
    }

    @ReactMethod
    override fun setMaxMetadataSize(size: Int, callback: Promise?) {
        PromiseCallback(callback).resolve(mediaObserver) { it.setMaxMetadataSize(size) }
    }

    @ReactMethod
    override fun sendMetadata(metadata: String, callback: Promise?) {
        PromiseCallback(callback).resolve(mediaObserver) { it.addMetadata(metadata) }
    }

    @ReactMethod
    override fun addVideoWatermark(watermarkUrl: String, options: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.addVideoWatermark(watermarkUrl, mapToWatermarkOptions(options.toHashMap())))
    }

    @ReactMethod
    override fun clearVideoWatermarks(callback: Promise?) {
        PromiseCallback(callback).code(engine?.clearVideoWatermarks())
    }

    @ReactMethod
    override fun setEncryptionSecret(secret: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setEncryptionSecret(secret))
    }

    @ReactMethod
    override fun setEncryptionMode(encryptionMode: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setEncryptionMode(encryptionMode))
    }

    @ReactMethod
    override fun startAudioRecording(filePath: String, sampleRate: Int, quality: Int, callback: Promise?) {
        PromiseCallback(callback).code(engine?.startAudioRecording(filePath, sampleRate, quality))
    }

    @ReactMethod
    override fun stopAudioRecording(callback: Promise?) {
        PromiseCallback(callback).code(engine?.stopAudioRecording())
    }

    @ReactMethod
    override fun addInjectStreamUrl(url: String, config: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.addInjectStreamUrl(url, mapToLiveInjectStreamConfig(config.toHashMap())))
    }

    @ReactMethod
    override fun removeInjectStreamUrl(url: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.removeInjectStreamUrl(url))
    }

    @ReactMethod
    override fun switchCamera(callback: Promise?) {
        PromiseCallback(callback).code(engine?.switchCamera())
    }

    @ReactMethod
    override fun isCameraZoomSupported(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.isCameraZoomSupported }
    }

    @ReactMethod
    override fun isCameraTorchSupported(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.isCameraTorchSupported }
    }

    @ReactMethod
    override fun isCameraFocusSupported(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.isCameraFocusSupported }
    }

    @ReactMethod
    override fun isCameraExposurePositionSupported(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.isCameraExposurePositionSupported }
    }

    @ReactMethod
    override fun isCameraAutoFocusFaceModeSupported(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.isCameraAutoFocusFaceModeSupported }
    }

    @ReactMethod
    override fun setCameraZoomFactor(factor: Float, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setCameraZoomFactor(factor))
    }

    @ReactMethod
    override fun getCameraMaxZoomFactor(callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.cameraMaxZoomFactor }
    }

    @ReactMethod
    override fun setCameraFocusPositionInPreview(positionX: Float, positionY: Float, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setCameraFocusPositionInPreview(positionX, positionY))
    }

    @ReactMethod
    override fun setCameraExposurePosition(positionXinView: Float, positionYinView: Float, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setCameraExposurePosition(positionXinView, positionYinView))
    }

    @ReactMethod
    override fun setCameraTorchOn(isOn: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setCameraTorchOn(isOn))
    }

    @ReactMethod
    override fun setCameraAutoFocusFaceModeEnabled(enabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setCameraAutoFocusFaceModeEnabled(enabled))
    }

    @ReactMethod
    override fun setCameraCapturerConfiguration(config: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(engine?.setCameraCapturerConfiguration(mapToCameraCapturerConfiguration(config.toHashMap())))
    }

    @ReactMethod
    override fun createDataStream(reliable: Boolean, ordered: Boolean, callback: Promise?) {
        PromiseCallback(callback).resolve(engine) { it.createDataStream(reliable, ordered) }
    }

    @ReactMethod
    override fun sendStreamMessage(streamId: Int, message: String, callback: Promise?) {
        PromiseCallback(callback).code(engine?.sendStreamMessage(streamId, message.toByteArray()))
    }
}
