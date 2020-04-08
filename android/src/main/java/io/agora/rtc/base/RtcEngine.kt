package io.agora.rtc.base

import androidx.annotation.FloatRange
import androidx.annotation.IntRange
import io.agora.rtc.IAudioFrameObserver
import io.agora.rtc.mediaio.IVideoSink
import io.agora.rtc.mediaio.IVideoSource
import io.agora.rtc.video.AgoraVideoFrame

interface RtcEngineInterface<Map, Callback> :
        RtcEngineManager.RtcUserInfoInterface<Callback>,
        RtcEngineManager.RtcAudioInterface<Callback>,
        RtcEngineManager.RtcVideoInterface<Map, Callback>,
        RtcEngineManager.RtcAudioMixingInterface<Callback>,
        RtcEngineManager.RtcAudioEffectInterface<Callback>,
        RtcEngineManager.RtcVoiceChangerInterface<Callback>,
        RtcEngineManager.RtcVoicePositionInterface<Callback>,
        RtcEngineManager.RtcPublishStreamInterface<Map, Callback>,
        RtcEngineManager.RtcMediaRelayInterface<Map, Callback>,
        RtcEngineManager.RtcAudioRouteInterface<Callback>,
        RtcEngineManager.RtcEarMonitoringInterface<Callback>,
        RtcEngineManager.RtcDualStreamInterface<Callback>,
        RtcEngineManager.RtcFallbackInterface<Callback>,
        RtcEngineManager.RtcTestInterface<Map, Callback>,
        RtcEngineManager.RtcMediaMetadataInterface<Callback>,
        RtcEngineManager.RtcWatermarkInterface<Map, Callback>,
        RtcEngineManager.RtcEncryptionInterface<Callback>,
        RtcEngineManager.RtcAudioRecorderInterface<Callback>,
        RtcEngineManager.RtcInjectStreamInterface<Map, Callback>,
        RtcEngineManager.RtcCameraInterface<Map, Callback>,
        RtcEngineManager.RtcStreamMessageInterface<Callback> {
    fun create(appId: String, callback: Callback?)

    fun destroy(callback: Callback?)

    fun setChannelProfile(@Annotations.AgoraChannelProfile profile: Int, callback: Callback?)

    fun setClientRole(@Annotations.AgoraClientRole role: Int, callback: Callback?)

    fun joinChannel(token: String?, channelName: String, optionalInfo: String?, optionalUid: Int, callback: Callback?)

    fun switchChannel(token: String?, channelName: String, callback: Callback?)

    fun leaveChannel(callback: Callback?)

    fun renewToken(token: String, callback: Callback?)

    @Deprecated("")
    fun enableWebSdkInteroperability(enabled: Boolean, callback: Callback?)

    fun getConnectionState(callback: Callback?)

    fun getCallId(callback: Callback?)

    fun rate(callId: String, @IntRange(from = 1, to = 5) rating: Int, description: String?, callback: Callback?)

    fun complain(callId: String, description: String, callback: Callback?)

    fun setLogFile(filePath: String, callback: Callback?)

    fun setLogFilter(@Annotations.AgoraLogFilter filter: Int, callback: Callback?)

    fun setLogFileSize(fileSizeInKBytes: Int, callback: Callback?)

    fun setParameters(parameters: String, callback: Callback?)
}

class RtcEngineManager {
    interface RtcUserInfoInterface<Callback> {
        fun registerLocalUserAccount(appId: String, userAccount: String, callback: Callback?)

        fun joinChannelWithUserAccount(token: String?, channelName: String, userAccount: String, callback: Callback?)

        fun getUserInfoByUserAccount(userAccount: String, callback: Callback?)

        fun getUserInfoByUid(uid: Int, callback: Callback?)
    }

    interface RtcAudioInterface<Callback> {
        fun enableAudio(callback: Callback?)

        fun disableAudio(callback: Callback?)

        fun setAudioProfile(@Annotations.AgoraAudioProfile profile: Int, @Annotations.AgoraAudioScenario scenario: Int, callback: Callback?)

        fun adjustRecordingSignalVolume(@IntRange(from = 0, to = 400) volume: Int, callback: Callback?)

        fun adjustUserPlaybackSignalVolume(uid: Int, @IntRange(from = 0, to = 100) volume: Int, callback: Callback?)

        fun adjustPlaybackSignalVolume(@IntRange(from = 0, to = 400) volume: Int, callback: Callback?)

        fun enableLocalAudio(enabled: Boolean, callback: Callback?)

        fun muteLocalAudioStream(muted: Boolean, callback: Callback?)

        fun muteRemoteAudioStream(uid: Int, muted: Boolean, callback: Callback?)

        fun muteAllRemoteAudioStreams(muted: Boolean, callback: Callback?)

        fun setDefaultMuteAllRemoteAudioStreams(muted: Boolean, callback: Callback?)

        fun enableAudioVolumeIndication(interval: Int, @IntRange(from = 0, to = 10) smooth: Int, report_vad: Boolean, callback: Callback?)
    }

    interface RtcVideoInterface<Map, Callback> {
        fun enableVideo(callback: Callback?)

        fun disableVideo(callback: Callback?)

        fun setVideoEncoderConfiguration(config: Map, callback: Callback?)

        fun enableLocalVideo(enabled: Boolean, callback: Callback?)

        fun muteLocalVideoStream(muted: Boolean, callback: Callback?)

        fun muteRemoteVideoStream(uid: Int, muted: Boolean, callback: Callback?)

        fun muteAllRemoteVideoStreams(muted: Boolean, callback: Callback?)

        fun setDefaultMuteAllRemoteVideoStreams(muted: Boolean, callback: Callback?)

        fun setBeautyEffectOptions(enabled: Boolean, options: Map, callback: Callback?)
    }

    interface RtcAudioMixingInterface<Callback> {
        fun startAudioMixing(filePath: String, loopback: Boolean, replace: Boolean, cycle: Int, callback: Callback?)

        fun stopAudioMixing(callback: Callback?)

        fun pauseAudioMixing(callback: Callback?)

        fun resumeAudioMixing(callback: Callback?)

        fun adjustAudioMixingVolume(@IntRange(from = 0, to = 100) volume: Int, callback: Callback?)

        fun adjustAudioMixingPlayoutVolume(@IntRange(from = 0, to = 400) volume: Int, callback: Callback?)

        fun adjustAudioMixingPublishVolume(@IntRange(from = 0, to = 100) volume: Int, callback: Callback?)

        fun getAudioMixingPlayoutVolume(callback: Callback?)

        fun getAudioMixingPublishVolume(callback: Callback?)

        fun getAudioMixingDuration(callback: Callback?)

        fun getAudioMixingCurrentPosition(callback: Callback?)

        fun setAudioMixingPosition(pos: Int, callback: Callback?)
    }

    interface RtcAudioEffectInterface<Callback> {
        fun getEffectsVolume(callback: Callback?)

        fun setEffectsVolume(@FloatRange(from = 0.0, to = 100.0) volume: Double, callback: Callback?)

        fun setVolumeOfEffect(soundId: Int, @FloatRange(from = 0.0, to = 100.0) volume: Double, callback: Callback?)

        fun playEffect(soundId: Int, filePath: String, loopCount: Int, @FloatRange(from = 0.5, to = 2.0) pitch: Double, @FloatRange(from = -1.0, to = 1.0) pan: Double, @FloatRange(from = 0.0, to = 100.0) gain: Double, publish: Boolean, callback: Callback?)

        fun stopEffect(soundId: Int, callback: Callback?)

        fun stopAllEffects(callback: Callback?)

        fun preloadEffect(soundId: Int, filePath: String, callback: Callback?)

        fun unloadEffect(soundId: Int, callback: Callback?)

        fun pauseEffect(soundId: Int, callback: Callback?)

        fun pauseAllEffects(callback: Callback?)

        fun resumeEffect(soundId: Int, callback: Callback?)

        fun resumeAllEffects(callback: Callback?)
    }

    interface RtcVoiceChangerInterface<Callback> {
        fun setLocalVoiceChanger(@Annotations.AgoraAudioVoiceChanger voiceChanger: Int, callback: Callback?)

        fun setLocalVoiceReverbPreset(@Annotations.AgoraAudioReverbPreset preset: Int, callback: Callback?)

        fun setLocalVoicePitch(@FloatRange(from = 0.5, to = 2.0) pitch: Double, callback: Callback?)

        fun setLocalVoiceEqualization(@IntRange(from = 0, to = 9) bandFrequency: Int, @IntRange(from = -15, to = 15) bandGain: Int, callback: Callback?)

        fun setLocalVoiceReverb(@Annotations.AgoraAudioReverbType reverbKey: Int, value: Int, callback: Callback?)
    }

    interface RtcVoicePositionInterface<Callback> {
        fun enableSoundPositionIndication(enabled: Boolean, callback: Callback?)

        fun setRemoteVoicePosition(uid: Int, @FloatRange(from = -1.0, to = 1.0) pan: Double, @FloatRange(from = 0.0, to = 100.0) gain: Double, callback: Callback?)
    }

    interface RtcPublishStreamInterface<Map, Callback> {
        fun setLiveTranscoding(transcoding: Map, callback: Callback?)

        fun addPublishStreamUrl(url: String, transcodingEnabled: Boolean, callback: Callback?)

        fun removePublishStreamUrl(url: String, callback: Callback?)
    }

    interface RtcMediaRelayInterface<Map, Callback> {
        fun startChannelMediaRelay(channelMediaRelayConfiguration: Map, callback: Callback?)

        fun updateChannelMediaRelay(channelMediaRelayConfiguration: Map, callback: Callback?)

        fun stopChannelMediaRelay(callback: Callback?)
    }

    interface RtcAudioRouteInterface<Callback> {
        fun setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: Boolean, callback: Callback?)

        fun setEnableSpeakerphone(enabled: Boolean, callback: Callback?)

        fun isSpeakerphoneEnabled(callback: Callback?)
    }

    interface RtcEarMonitoringInterface<Callback> {
        fun enableInEarMonitoring(enabled: Boolean, callback: Callback?)

        fun setInEarMonitoringVolume(@IntRange(from = 0, to = 100) volume: Int, callback: Callback?)
    }

    interface RtcDualStreamInterface<Callback> {
        fun enableDualStreamMode(enabled: Boolean, callback: Callback?)

        fun setRemoteVideoStreamType(uid: Int, @Annotations.AgoraVideoStreamType streamType: Int, callback: Callback?)

        fun setRemoteDefaultVideoStreamType(@Annotations.AgoraVideoStreamType streamType: Int, callback: Callback?)
    }

    interface RtcFallbackInterface<Callback> {
        fun setLocalPublishFallbackOption(@Annotations.AgoraStreamFallbackOptions option: Int, callback: Callback?)

        fun setRemoteSubscribeFallbackOption(@Annotations.AgoraStreamFallbackOptions option: Int, callback: Callback?)

        fun setRemoteUserPriority(uid: Int, @Annotations.AgoraUserPriority userPriority: Int, callback: Callback?)
    }

    interface RtcTestInterface<Map, Callback> {
        fun startEchoTest(@IntRange(from = 2, to = 10) intervalInSeconds: Int, callback: Callback?)

        fun stopEchoTest(callback: Callback?)

        fun enableLastmileTest(callback: Callback?)

        fun disableLastmileTest(callback: Callback?)

        fun startLastmileProbeTest(config: Map, callback: Callback?)

        fun stopLastmileProbeTest(callback: Callback?)
    }

    interface RtcCustomVideoInterface {
        fun setVideoSource(source: IVideoSource?): Int

        fun setLocalVideoRenderer(render: IVideoSink?): Int

        fun setRemoteVideoRenderer(uid: Int, render: IVideoSink?): Int
    }

    interface RtcExternalVideoInterface {
        fun setExternalVideoSource(enable: Boolean, useTexture: Boolean, pushMode: Boolean)

        fun pushExternalVideoFrame(frame: AgoraVideoFrame?): Boolean

        fun isTextureEncodeSupported(): Boolean
    }

    interface RtcExternalAudioInterface {
        fun setExternalAudioSource(enabled: Boolean, sampleRate: Int, channels: Int): Int

        fun pushExternalAudioFrame(data: ByteArray?, timestamp: Long): Int
    }

    interface RtcCustomAudioInterface {
        fun setExternalAudioSink(enabled: Boolean, sampleRate: Int, channels: Int): Int

        fun pullPlaybackAudioFrame(data: ByteArray?, lengthInByte: Int): Int
    }

    interface RtcAudioRawDataInterface {
        fun registerAudioFrameObserver(observer: IAudioFrameObserver?): Int

        fun setRecordingAudioFrameParameters(sampleRate: Int, channel: Int, @Annotations.AgoraAudioRawFrameOperationMode mode: Int, samplesPerCall: Int): Int

        fun setPlaybackAudioFrameParameters(sampleRate: Int, channel: Int, @Annotations.AgoraAudioRawFrameOperationMode mode: Int, samplesPerCall: Int): Int

        fun setMixedAudioFrameParameters(sampleRate: Int, samplesPerCall: Int): Int
    }

    interface RtcMediaMetadataInterface<Callback> {
        fun registerMediaMetadataObserver(callback: Callback?)

        fun unregisterMediaMetadataObserver(callback: Callback?)

        fun setMaxMetadataSize(@IntRange(from = 0, to = 1024) size: Int, callback: Callback?)

        fun sendMetadata(metadata: String, callback: Callback?)
    }

    interface RtcWatermarkInterface<Map, Callback> {
        fun addVideoWatermark(watermarkUrl: String, options: Map, callback: Callback?)

        fun clearVideoWatermarks(callback: Callback?)
    }

    interface RtcEncryptionInterface<Callback> {
        fun setEncryptionSecret(secret: String, callback: Callback?)

        fun setEncryptionMode(@Annotations.AgoraEncryptionMode encryptionMode: String, callback: Callback?)
    }

    interface RtcAudioRecorderInterface<Callback> {
        fun startAudioRecording(filePath: String, sampleRate: Int, @Annotations.AgoraAudioRecordingQuality quality: Int, callback: Callback?)

        fun stopAudioRecording(callback: Callback?)
    }

    interface RtcInjectStreamInterface<Map, Callback> {
        fun addInjectStreamUrl(url: String, config: Map, callback: Callback?)

        fun removeInjectStreamUrl(url: String, callback: Callback?)
    }

    interface RtcCameraInterface<Map, Callback> {
        fun switchCamera(callback: Callback?)

        fun isCameraZoomSupported(callback: Callback?)

        fun isCameraTorchSupported(callback: Callback?)

        fun isCameraFocusSupported(callback: Callback?)

        fun isCameraExposurePositionSupported(callback: Callback?)

        fun isCameraAutoFocusFaceModeSupported(callback: Callback?)

        fun setCameraZoomFactor(@FloatRange(from = 1.0) factor: Float, callback: Callback?)

        fun getCameraMaxZoomFactor(callback: Callback?)

        fun setCameraFocusPositionInPreview(positionX: Float, positionY: Float, callback: Callback?)

        fun setCameraExposurePosition(positionXinView: Float, positionYinView: Float, callback: Callback?)

        fun setCameraTorchOn(isOn: Boolean, callback: Callback?)

        fun setCameraAutoFocusFaceModeEnabled(enabled: Boolean, callback: Callback?)

        fun setCameraCapturerConfiguration(config: Map, callback: Callback?)
    }

    interface RtcStreamMessageInterface<Callback> {
        fun createDataStream(reliable: Boolean, ordered: Boolean, callback: Callback?)

        fun sendStreamMessage(streamId: Int, message: String, callback: Callback?)
    }
}
