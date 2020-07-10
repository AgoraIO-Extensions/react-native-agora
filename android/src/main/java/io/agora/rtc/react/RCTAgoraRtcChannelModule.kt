package io.agora.rtc.react

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.agora.rtc.RtcChannel
import io.agora.rtc.RtcEngine
import io.agora.rtc.base.*
import io.agora.rtc.react.RCTAgoraRtcChannelModule.Companion.REACT_CLASS

@ReactModule(name = REACT_CLASS)
class RCTAgoraRtcChannelModule(
        reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext),
        RtcChannelInterface<ReadableMap, Promise> {
    companion object {
        const val REACT_CLASS = "RCTAgoraRtcChannelModule"
    }

    private val manager = RtcChannelManager()

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getConstants(): MutableMap<String, Any> {
        return mutableMapOf(
                "prefix" to RtcChannelEventHandler.PREFIX
        )
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        manager.release()
    }

    private fun emit(methodName: String, data: Map<String, Any?>?) {
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("${RtcChannelEventHandler.PREFIX}$methodName", Arguments.makeNativeMap(data))
    }

    private fun engine(): RtcEngine? {
        return reactApplicationContext.getNativeModule(RCTAgoraRtcEngineModule::class.java).engine()
    }

    fun channel(channelId: String): RtcChannel? {
        return manager[channelId]
    }

    @ReactMethod
    override fun create(channelId: String, callback: Promise?) {
        PromiseCallback(callback).resolve(engine()) {
            manager.create(it, channelId) { methodName, data ->
                emit(methodName, data)
            }
        }
    }

    @ReactMethod
    override fun destroy(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(manager.destroy(channelId))
    }

    @ReactMethod
    override fun setClientRole(channelId: String, role: Int, callback: Promise?) {
        PromiseCallback(callback).code(manager[channelId]?.setClientRole(role))
    }

    @ReactMethod
    override fun joinChannel(channelId: String, token: String?, optionalInfo: String?, optionalUid: Int, options: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.joinChannel(token, optionalInfo, optionalUid, mapToChannelMediaOptions(options.toHashMap())))
    }

    @ReactMethod
    override fun joinChannelWithUserAccount(channelId: String, token: String?, userAccount: String, options: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.joinChannelWithUserAccount(token, userAccount, mapToChannelMediaOptions(options.toHashMap())))
    }

    @ReactMethod
    override fun leaveChannel(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.leaveChannel())
    }

    @ReactMethod
    override fun renewToken(channelId: String, token: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.renewToken(token))
    }

    @ReactMethod
    override fun getConnectionState(channelId: String, callback: Promise?) {
        PromiseCallback(callback).resolve(channel(channelId)) { it.connectionState }
    }

    @ReactMethod
    override fun publish(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.publish())
    }

    @ReactMethod
    override fun unpublish(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.unpublish())
    }

    @ReactMethod
    override fun getCallId(channelId: String, callback: Promise?) {
        PromiseCallback(callback).resolve(channel(channelId)) { it.callId }
    }

    @ReactMethod
    override fun setLiveTranscoding(channelId: String, transcoding: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setLiveTranscoding(mapToLiveTranscoding(transcoding.toHashMap())))
    }

    @ReactMethod
    override fun addPublishStreamUrl(channelId: String, url: String, transcodingEnabled: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.addPublishStreamUrl(url, transcodingEnabled))
    }

    @ReactMethod
    override fun removePublishStreamUrl(channelId: String, url: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.removePublishStreamUrl(url))
    }

    @ReactMethod
    override fun startChannelMediaRelay(channelId: String, channelMediaRelayConfiguration: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.startChannelMediaRelay(mapToChannelMediaRelayConfiguration(channelMediaRelayConfiguration.toHashMap())))
    }

    @ReactMethod
    override fun updateChannelMediaRelay(channelId: String, channelMediaRelayConfiguration: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.updateChannelMediaRelay(mapToChannelMediaRelayConfiguration(channelMediaRelayConfiguration.toHashMap())))
    }

    @ReactMethod
    override fun stopChannelMediaRelay(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.stopChannelMediaRelay())
    }

    @ReactMethod
    override fun registerMediaMetadataObserver(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(manager.registerMediaMetadataObserver(channelId) { methodName, data -> emit(methodName, data) })
    }

    @ReactMethod
    override fun unregisterMediaMetadataObserver(channelId: String, callback: Promise?) {
        PromiseCallback(callback).code(manager.unregisterMediaMetadataObserver(channelId))
    }

    @ReactMethod
    override fun setMaxMetadataSize(channelId: String, size: Int, callback: Promise?) {
        PromiseCallback(callback).code(manager.setMaxMetadataSize(channelId, size))
    }

    @ReactMethod
    override fun sendMetadata(channelId: String, metadata: String, callback: Promise?) {
        PromiseCallback(callback).code(manager.addMetadata(channelId, metadata))
    }

    @ReactMethod
    override fun setEncryptionSecret(channelId: String, secret: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setEncryptionSecret(secret))
    }

    @ReactMethod
    override fun setEncryptionMode(channelId: String, encryptionMode: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setEncryptionMode(encryptionMode))
    }

    @ReactMethod
    override fun addInjectStreamUrl(channelId: String, url: String, config: ReadableMap, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.addInjectStreamUrl(url, mapToLiveInjectStreamConfig(config.toHashMap())))
    }

    @ReactMethod
    override fun removeInjectStreamUrl(channelId: String, url: String, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.removeInjectStreamUrl(url))
    }

    @ReactMethod
    override fun createDataStream(channelId: String, reliable: Boolean, ordered: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(manager.createDataStream(channelId, reliable, ordered)) { it }
    }

    @ReactMethod
    override fun sendStreamMessage(channelId: String, streamId: Int, message: String, callback: Promise?) {
        PromiseCallback(callback).code(manager.sendStreamMessage(channelId, streamId, message))
    }

    @ReactMethod
    override fun adjustUserPlaybackSignalVolume(channelId: String, uid: Int, volume: Int, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.adjustUserPlaybackSignalVolume(uid, volume))
    }

    @ReactMethod
    override fun muteRemoteAudioStream(channelId: String, uid: Int, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.muteRemoteAudioStream(uid, muted))
    }

    @ReactMethod
    override fun muteAllRemoteAudioStreams(channelId: String, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.muteAllRemoteAudioStreams(muted))
    }

    @ReactMethod
    override fun setDefaultMuteAllRemoteAudioStreams(channelId: String, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setDefaultMuteAllRemoteAudioStreams(muted))
    }

    @ReactMethod
    override fun muteRemoteVideoStream(channelId: String, uid: Int, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.muteRemoteVideoStream(uid, muted))
    }

    @ReactMethod
    override fun muteAllRemoteVideoStreams(channelId: String, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.muteAllRemoteVideoStreams(muted))
    }

    @ReactMethod
    override fun setDefaultMuteAllRemoteVideoStreams(channelId: String, muted: Boolean, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setDefaultMuteAllRemoteVideoStreams(muted))
    }

    @ReactMethod
    override fun setRemoteVoicePosition(channelId: String, uid: Int, pan: Double, gain: Double, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setRemoteVoicePosition(uid, pan, gain))
    }

    @ReactMethod
    override fun setRemoteVideoStreamType(channelId: String, uid: Int, streamType: Int, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setRemoteVideoStreamType(uid, streamType))
    }

    @ReactMethod
    override fun setRemoteDefaultVideoStreamType(channelId: String, streamType: Int, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setRemoteDefaultVideoStreamType(streamType))
    }

    @ReactMethod
    override fun setRemoteUserPriority(channelId: String, uid: Int, userPriority: Int, callback: Promise?) {
        PromiseCallback(callback).code(channel(channelId)?.setRemoteUserPriority(uid, userPriority))
    }
}
