package io.agora.rtc.base

import androidx.annotation.IntRange
import io.agora.rtc.IRtcChannelEventHandler
import io.agora.rtc.IRtcEngineEventHandler
import io.agora.rtc.RtcChannel

class RtcChannelEventHandler(
        private val callback: (methodName: String, data: Map<String, Any?>?) -> Unit
) : IRtcChannelEventHandler() {
    private fun callback(data: Map<String, Any?>?) {
        val methodName = Thread.currentThread().stackTrace[3].methodName
        callback(methodName, data)
    }

    override fun onActiveSpeaker(rtcChannel: RtcChannel, uid: Int) {
        super.onActiveSpeaker(rtcChannel, uid)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid
        ))
    }

    override fun onRemoteVideoStateChanged(rtcChannel: RtcChannel, uid: Int, @Annotations.AgoraVideoRemoteState state: Int, @Annotations.AgoraVideoRemoteStateReason reason: Int, elapsed: Int) {
        super.onRemoteVideoStateChanged(rtcChannel, uid, state, reason, elapsed)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "state" to state,
                "reason" to reason,
                "elapsed" to elapsed
        ))
    }

    override fun onRemoteSubscribeFallbackToAudioOnly(rtcChannel: RtcChannel, uid: Int, isFallbackOrRecover: Boolean) {
        super.onRemoteSubscribeFallbackToAudioOnly(rtcChannel, uid, isFallbackOrRecover)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "isFallbackOrRecover" to isFallbackOrRecover
        ))
    }

    override fun onRtcStats(rtcChannel: RtcChannel, stats: IRtcEngineEventHandler.RtcStats?) {
        super.onRtcStats(rtcChannel, stats)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "stats" to stats?.toMap()
        ))
    }

    override fun onConnectionLost(rtcChannel: RtcChannel) {
        super.onConnectionLost(rtcChannel)
        callback(hashMapOf("channelId" to rtcChannel.channelId()))
    }

    override fun onChannelError(rtcChannel: RtcChannel, @Annotations.AgoraErrorCode err: Int) {
        super.onChannelError(rtcChannel, err)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "err" to err
        ))
    }

    override fun onRemoteVideoStats(rtcChannel: RtcChannel, stats: IRtcEngineEventHandler.RemoteVideoStats?) {
        super.onRemoteVideoStats(rtcChannel, stats)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "stats" to stats?.toMap()
        ))
    }

    override fun onStreamMessage(rtcChannel: RtcChannel, uid: Int, streamId: Int, data: ByteArray?) {
        super.onStreamMessage(rtcChannel, uid, streamId, data)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "streamId" to streamId,
                "data" to data?.let { String(it, Charsets.UTF_8) }
        ))
    }

    override fun onChannelWarning(rtcChannel: RtcChannel, @Annotations.AgoraWarningCode warn: Int) {
        super.onChannelWarning(rtcChannel, warn)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "warn" to warn
        ))
    }

    override fun onChannelMediaRelayStateChanged(rtcChannel: RtcChannel, @Annotations.AgoraChannelMediaRelayState state: Int, @Annotations.AgoraChannelMediaRelayError code: Int) {
        super.onChannelMediaRelayStateChanged(rtcChannel, state, code)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "state" to state,
                "code" to code
        ))
    }

    override fun onRequestToken(rtcChannel: RtcChannel) {
        super.onRequestToken(rtcChannel)
        callback(hashMapOf("channelId" to rtcChannel.channelId()))
    }

    override fun onTranscodingUpdated(rtcChannel: RtcChannel) {
        super.onTranscodingUpdated(rtcChannel)
        callback(hashMapOf("channelId" to rtcChannel.channelId()))
    }

    override fun onClientRoleChanged(rtcChannel: RtcChannel, @Annotations.AgoraClientRole oldRole: Int, @Annotations.AgoraClientRole newRole: Int) {
        super.onClientRoleChanged(rtcChannel, oldRole, newRole)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "oldRole" to oldRole,
                "newRole" to newRole
        ))
    }

    override fun onRtmpStreamingStateChanged(rtcChannel: RtcChannel, url: String?, @Annotations.AgoraRtmpStreamingState state: Int, @Annotations.AgoraRtmpStreamingErrorCode errCode: Int) {
        super.onRtmpStreamingStateChanged(rtcChannel, url, state, errCode)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "url" to url,
                "state" to state,
                "errCode" to errCode
        ))
    }

    override fun onRemoteAudioStats(rtcChannel: RtcChannel, stats: IRtcEngineEventHandler.RemoteAudioStats?) {
        super.onRemoteAudioStats(rtcChannel, stats)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "stats" to stats?.toMap()
        ))
    }

    override fun onRejoinChannelSuccess(rtcChannel: RtcChannel, uid: Int, elapsed: Int) {
        super.onRejoinChannelSuccess(rtcChannel, uid, elapsed)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onUserJoined(rtcChannel: RtcChannel, uid: Int, elapsed: Int) {
        super.onUserJoined(rtcChannel, uid, elapsed)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onStreamMessageError(rtcChannel: RtcChannel, uid: Int, streamId: Int, @Annotations.AgoraErrorCode error: Int, missed: Int, cached: Int) {
        super.onStreamMessageError(rtcChannel, uid, streamId, error, missed, cached)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "streamId" to streamId,
                "error" to error,
                "missed" to missed,
                "cached" to cached
        ))
    }

    override fun onTokenPrivilegeWillExpire(rtcChannel: RtcChannel, token: String?) {
        super.onTokenPrivilegeWillExpire(rtcChannel, token)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "token" to token
        ))
    }

    override fun onUserOffline(rtcChannel: RtcChannel, uid: Int, @Annotations.AgoraUserOfflineReason reason: Int) {
        super.onUserOffline(rtcChannel, uid, reason)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "reason" to reason
        ))
    }

    override fun onNetworkQuality(rtcChannel: RtcChannel, uid: Int, @Annotations.AgoraNetworkQuality txQuality: Int, @Annotations.AgoraNetworkQuality rxQuality: Int) {
        super.onNetworkQuality(rtcChannel, uid, txQuality, rxQuality)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "txQuality" to txQuality,
                "rxQuality" to rxQuality
        ))
    }

    override fun onStreamInjectedStatus(rtcChannel: RtcChannel, url: String?, uid: Int, @Annotations.AgoraInjectStreamStatus status: Int) {
        super.onStreamInjectedStatus(rtcChannel, url, uid, status)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "url" to url,
                "uid" to uid,
                "status" to status
        ))
    }

    override fun onVideoSizeChanged(rtcChannel: RtcChannel, uid: Int, width: Int, height: Int, @IntRange(from = 0, to = 360) rotation: Int) {
        super.onVideoSizeChanged(rtcChannel, uid, width, height, rotation)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "width" to width,
                "height" to height,
                "rotation" to rotation
        ))
    }

    override fun onChannelMediaRelayEvent(rtcChannel: RtcChannel, @Annotations.AgoraChannelMediaRelayEvent code: Int) {
        super.onChannelMediaRelayEvent(rtcChannel, code)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "code" to code
        ))
    }

    override fun onJoinChannelSuccess(rtcChannel: RtcChannel, uid: Int, elapsed: Int) {
        super.onJoinChannelSuccess(rtcChannel, uid, elapsed)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onLeaveChannel(rtcChannel: RtcChannel, stats: IRtcEngineEventHandler.RtcStats?) {
        super.onLeaveChannel(rtcChannel, stats)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "stats" to stats?.toMap()
        ))
    }

    override fun onConnectionStateChanged(rtcChannel: RtcChannel, @Annotations.AgoraConnectionStateType state: Int, @Annotations.AgoraConnectionChangedReason reason: Int) {
        super.onConnectionStateChanged(rtcChannel, state, reason)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "state" to state,
                "reason" to reason
        ))
    }

    override fun onRemoteAudioStateChanged(rtcChannel: RtcChannel, uid: Int, @Annotations.AgoraAudioRemoteState state: Int, @Annotations.AgoraAudioRemoteStateReason reason: Int, elapsed: Int) {
        super.onRemoteAudioStateChanged(rtcChannel, uid, state, reason, elapsed)
        callback(hashMapOf(
                "channelId" to rtcChannel.channelId(),
                "uid" to uid,
                "state" to state,
                "reason" to reason,
                "elapsed" to elapsed
        ))
    }
}
