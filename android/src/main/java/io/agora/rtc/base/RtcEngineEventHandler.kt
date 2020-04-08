package io.agora.rtc.base

import android.graphics.Rect
import androidx.annotation.IntRange
import io.agora.rtc.IRtcEngineEventHandler
import io.agora.rtc.models.UserInfo

class RtcEngineEventHandler(
        private val callback: (methodName: String, data: Map<String, Any?>?) -> Unit
) : IRtcEngineEventHandler() {
    private fun callback(data: Map<String, Any?>?) {
        val methodName = Thread.currentThread().stackTrace[3].methodName
        callback(methodName, data)
    }

    override fun onActiveSpeaker(uid: Int) {
        super.onActiveSpeaker(uid)
        callback(hashMapOf("uid" to uid))
    }

    override fun onLocalAudioStats(stats: LocalAudioStats?) {
        super.onLocalAudioStats(stats)
        callback(stats?.let {
            hashMapOf("stats" to it.toMap())
        })
    }

    override fun onRemoteSubscribeFallbackToAudioOnly(uid: Int, isFallbackOrRecover: Boolean) {
        super.onRemoteSubscribeFallbackToAudioOnly(uid, isFallbackOrRecover)
        callback(hashMapOf(
                "uid" to uid,
                "isFallbackOrRecover" to isFallbackOrRecover
        ))
    }

    override fun onAudioMixingStateChanged(@Annotations.AgoraAudioMixingStateCode state: Int, @Annotations.AgoraAudioMixingErrorCode errorCode: Int) {
        super.onAudioMixingStateChanged(state, errorCode)
        callback(hashMapOf(
                "state" to state,
                "errorCode" to errorCode
        ))
    }

    override fun onRtcStats(stats: RtcStats?) {
        super.onRtcStats(stats)
        callback(hashMapOf("stats" to stats?.toMap()))
    }

    @Deprecated("", ReplaceWith("onRemoteAudioStateChanged"))
    override fun onFirstRemoteAudioFrame(uid: Int, elapsed: Int) {
        super.onFirstRemoteAudioFrame(uid, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onAudioRouteChanged(@Annotations.AgoraAudioOutputRouting routing: Int) {
        super.onAudioRouteChanged(routing)
        callback(hashMapOf("routing" to routing))
    }

    @Deprecated("", ReplaceWith("onLocalVideoStats"))
    override fun onLocalVideoStat(sentBitrate: Int, sentFrameRate: Int) {
        super.onLocalVideoStat(sentBitrate, sentFrameRate)
        callback(hashMapOf(
                "sentBitrate" to sentBitrate,
                "sentFrameRate" to sentFrameRate
        ))
    }

    @Deprecated("", ReplaceWith("onRemoteAudioStats"))
    override fun onAudioQuality(uid: Int, @Annotations.AgoraNetworkQuality quality: Int, delay: Short, lost: Short) {
        super.onAudioQuality(uid, quality, delay, lost)
        callback(hashMapOf(
                "uid" to uid,
                "quality" to quality,
                "delay" to delay,
                "lost" to lost
        ))
    }

    override fun onNetworkTypeChanged(@Annotations.AgoraNetworkType type: Int) {
        super.onNetworkTypeChanged(type)
        callback(hashMapOf("type" to type))
    }

    override fun onLocalAudioStateChanged(@Annotations.AgoraAudioLocalState state: Int, @Annotations.AgoraAudioLocalError error: Int) {
        super.onLocalAudioStateChanged(state, error)
        callback(hashMapOf(
                "state" to state,
                "error" to error
        ))
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStateChanged"))
    override fun onFirstRemoteVideoFrame(uid: Int, width: Int, height: Int, elapsed: Int) {
        super.onFirstRemoteVideoFrame(uid, width, height, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "width" to width,
                "height" to height,
                "elapsed" to elapsed
        ))
    }

    override fun onLastmileQuality(@Annotations.AgoraNetworkQuality quality: Int) {
        super.onLastmileQuality(quality)
        callback(hashMapOf("quality" to quality))
    }

    override fun onCameraExposureAreaChanged(rect: Rect?) {
        super.onCameraExposureAreaChanged(rect)
        callback(rect?.let {
            hashMapOf("rect" to it.toMap())
        })
    }

    @Deprecated("", ReplaceWith("onRemoteAudioStats"))
    override fun onRemoteAudioTransportStats(uid: Int, delay: Int, lost: Int, rxKBitRate: Int) {
        super.onRemoteAudioTransportStats(uid, delay, lost, rxKBitRate)
        callback(hashMapOf(
                "uid" to uid,
                "delay" to delay,
                "lost" to lost,
                "rxKBitRate" to rxKBitRate
        ))
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStateChanged"))
    override fun onFirstRemoteVideoDecoded(uid: Int, width: Int, height: Int, elapsed: Int) {
        super.onFirstRemoteVideoDecoded(uid, width, height, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "width" to width,
                "height" to height,
                "elapsed" to elapsed
        ))
    }

    override fun onLocalVideoStateChanged(@Annotations.AgoraLocalVideoStreamState localVideoState: Int, @Annotations.AgoraLocalVideoStreamError error: Int) {
        super.onLocalVideoStateChanged(localVideoState, error)
        callback(hashMapOf(
                "localVideoState" to localVideoState,
                "error" to error
        ))
    }

    override fun onTranscodingUpdated() {
        super.onTranscodingUpdated()
        callback(null)
    }

    override fun onClientRoleChanged(@Annotations.AgoraClientRole oldRole: Int, @Annotations.AgoraClientRole newRole: Int) {
        super.onClientRoleChanged(oldRole, newRole)
        callback(hashMapOf(
                "oldRole" to oldRole,
                "newRole" to newRole
        ))
    }

    override fun onApiCallExecuted(@Annotations.AgoraErrorCode error: Int, api: String?, result: String?) {
        super.onApiCallExecuted(error, api, result)
        callback(hashMapOf(
                "error" to error,
                "api" to api,
                "result" to result
        ))
    }

    override fun onFirstLocalAudioFrame(elapsed: Int) {
        super.onFirstLocalAudioFrame(elapsed)
        callback(hashMapOf("elapsed" to elapsed))
    }

    override fun onRemoteAudioStats(stats: RemoteAudioStats?) {
        super.onRemoteAudioStats(stats)
        callback(hashMapOf("stats" to stats?.toMap()))
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStats"))
    override fun onRemoteVideoTransportStats(uid: Int, delay: Int, lost: Int, rxKBitRate: Int) {
        super.onRemoteVideoTransportStats(uid, delay, lost, rxKBitRate)
        callback(hashMapOf(
                "uid" to uid,
                "delay" to delay,
                "lost" to lost,
                "rxKBitRate" to rxKBitRate
        ))
    }

    @Deprecated("", ReplaceWith("onRtmpStreamingStateChanged"))
    override fun onStreamUnpublished(url: String?) {
        super.onStreamUnpublished(url)
        callback(hashMapOf("url" to url))
    }

    override fun onRejoinChannelSuccess(channel: String?, uid: Int, elapsed: Int) {
        super.onRejoinChannelSuccess(channel, uid, elapsed)
        callback(hashMapOf(
                "channel" to channel,
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    @Deprecated("", ReplaceWith("onLocalVideoStateChanged"))
    override fun onVideoStopped() {
        super.onVideoStopped()
        callback(null)
    }

    override fun onLocalVideoStats(stats: LocalVideoStats?) {
        super.onLocalVideoStats(stats)
        callback(stats?.let {
            hashMapOf("stats" to it.toMap())
        })
    }

    override fun onStreamMessageError(uid: Int, streamId: Int, @Annotations.AgoraErrorCode error: Int, missed: Int, cached: Int) {
        super.onStreamMessageError(uid, streamId, error, missed, cached)
        callback(hashMapOf(
                "uid" to uid,
                "streamId" to streamId,
                "error" to error,
                "missed" to missed,
                "cached" to cached
        ))
    }

    override fun onWarning(@Annotations.AgoraWarningCode warn: Int) {
        super.onWarning(warn)
        callback(hashMapOf("warn" to warn))
    }

    override fun onLocalPublishFallbackToAudioOnly(isFallbackOrRecover: Boolean) {
        super.onLocalPublishFallbackToAudioOnly(isFallbackOrRecover)
        callback(hashMapOf("isFallbackOrRecover" to isFallbackOrRecover))
    }

    @Deprecated("", ReplaceWith("onRtmpStreamingStateChanged"))
    override fun onStreamPublished(url: String?, @Annotations.AgoraErrorCode error: Int) {
        super.onStreamPublished(url, error)
        callback(hashMapOf(
                "url" to url,
                "error" to error
        ))
    }

    override fun onMediaEngineStartCallSuccess() {
        super.onMediaEngineStartCallSuccess()
        callback(null)
    }

    override fun onStreamInjectedStatus(url: String?, uid: Int, @Annotations.AgoraInjectStreamStatus status: Int) {
        super.onStreamInjectedStatus(url, uid, status)
        callback(hashMapOf(
                "url" to url,
                "uid" to uid,
                "status" to status
        ))
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStateChanged"))
    override fun onUserMuteVideo(uid: Int, muted: Boolean) {
        super.onUserMuteVideo(uid, muted)
        callback(hashMapOf(
                "uid" to uid,
                "muted" to muted
        ))
    }

    override fun onJoinChannelSuccess(channel: String?, uid: Int, elapsed: Int) {
        super.onJoinChannelSuccess(channel, uid, elapsed)
        callback(hashMapOf(
                "channel" to channel,
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onLeaveChannel(stats: RtcStats?) {
        super.onLeaveChannel(stats)
        callback(hashMapOf("stats" to stats?.toMap()))
    }

    override fun onConnectionStateChanged(@Annotations.AgoraConnectionStateType state: Int, @Annotations.AgoraConnectionChangedReason reason: Int) {
        super.onConnectionStateChanged(state, reason)
        callback(hashMapOf(
                "state" to state,
                "reason" to reason
        ))
    }

    @Deprecated("", ReplaceWith("onLocalAudioStateChanged"))
    override fun onMicrophoneEnabled(enabled: Boolean) {
        super.onMicrophoneEnabled(enabled)
        callback(hashMapOf("enabled" to enabled))
    }

    override fun onRemoteVideoStateChanged(uid: Int, @Annotations.AgoraVideoRemoteState state: Int, @Annotations.AgoraVideoRemoteStateReason reason: Int, elapsed: Int) {
        super.onRemoteVideoStateChanged(uid, state, reason, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "state" to state,
                "reason" to reason,
                "elapsed" to elapsed
        ))
    }

    override fun onConnectionLost() {
        super.onConnectionLost()
        callback(null)
    }

    @Deprecated("", ReplaceWith("onConnectionStateChanged"))
    override fun onConnectionBanned() {
        super.onConnectionBanned()
        callback(null)
    }

    override fun onRemoteVideoStats(stats: RemoteVideoStats?) {
        super.onRemoteVideoStats(stats)
        callback(hashMapOf("stats" to stats?.toMap()))
    }

    override fun onFirstLocalVideoFrame(width: Int, height: Int, elapsed: Int) {
        super.onFirstLocalVideoFrame(width, height, elapsed)
        callback(hashMapOf(
                "width" to width,
                "height" to height,
                "elapsed" to elapsed
        ))
    }

    @Deprecated("", ReplaceWith("onLocalVideoStateChanged"))
    override fun onCameraReady() {
        super.onCameraReady()
        callback(null)
    }

    override fun onAudioEffectFinished(soundId: Int) {
        super.onAudioEffectFinished(soundId)
        callback(hashMapOf("soundId" to soundId))
    }

    override fun onStreamMessage(uid: Int, streamId: Int, data: ByteArray?) {
        super.onStreamMessage(uid, streamId, data)
        callback(hashMapOf(
                "uid" to uid,
                "streamId" to streamId,
                "data" to data?.let { String(it, Charsets.UTF_8) }
        ))
    }

    override fun onCameraFocusAreaChanged(rect: Rect?) {
        super.onCameraFocusAreaChanged(rect)
        callback(rect?.let {
            hashMapOf("rect" to it.toMap())
        })
    }

    override fun onMediaEngineLoadSuccess() {
        super.onMediaEngineLoadSuccess()
        callback(null)
    }

    override fun onChannelMediaRelayStateChanged(@Annotations.AgoraChannelMediaRelayState state: Int, @Annotations.AgoraChannelMediaRelayError code: Int) {
        super.onChannelMediaRelayStateChanged(state, code)
        callback(hashMapOf(
                "state" to state,
                "code" to code
        ))
    }

    override fun onRequestToken() {
        super.onRequestToken()
        callback(null)
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStateChanged"))
    override fun onUserEnableLocalVideo(uid: Int, enabled: Boolean) {
        super.onUserEnableLocalVideo(uid, enabled)
        callback(hashMapOf(
                "uid" to uid,
                "enabled" to enabled
        ))
    }

    @Deprecated("", ReplaceWith("onConnectionStateChanged"))
    override fun onConnectionInterrupted() {
        super.onConnectionInterrupted()
        callback(null)
    }

    override fun onRtmpStreamingStateChanged(url: String?, @Annotations.AgoraRtmpStreamingState state: Int, @Annotations.AgoraRtmpStreamingErrorCode errCode: Int) {
        super.onRtmpStreamingStateChanged(url, state, errCode)
        callback(hashMapOf(
                "url" to url,
                "state" to state,
                "errCode" to errCode
        ))
    }

    override fun onAudioVolumeIndication(speakers: Array<out AudioVolumeInfo>?, @IntRange(from = 0, to = 255) totalVolume: Int) {
        super.onAudioVolumeIndication(speakers, totalVolume)
        callback(hashMapOf(
                "speakers" to speakers?.toMapList(),
                "totalVolume" to totalVolume
        ))
    }

    @Deprecated("", ReplaceWith("onAudioMixingStateChanged"))
    override fun onAudioMixingFinished() {
        super.onAudioMixingFinished()
        callback(null)
    }

    override fun onUserJoined(uid: Int, elapsed: Int) {
        super.onUserJoined(uid, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onTokenPrivilegeWillExpire(token: String?) {
        super.onTokenPrivilegeWillExpire(token)
        callback(hashMapOf("token" to token))
    }

    override fun onUserOffline(uid: Int, @Annotations.AgoraUserOfflineReason reason: Int) {
        super.onUserOffline(uid, reason)
        callback(hashMapOf(
                "uid" to uid,
                "reason" to reason
        ))
    }

    override fun onNetworkQuality(uid: Int, @Annotations.AgoraNetworkQuality txQuality: Int, @Annotations.AgoraNetworkQuality rxQuality: Int) {
        super.onNetworkQuality(uid, txQuality, rxQuality)
        callback(hashMapOf(
                "uid" to uid,
                "txQuality" to txQuality,
                "rxQuality" to rxQuality
        ))
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStats"))
    override fun onRemoteVideoStat(uid: Int, delay: Int, receivedBitrate: Int, receivedFrameRate: Int) {
        super.onRemoteVideoStat(uid, delay, receivedBitrate, receivedFrameRate)
        callback(hashMapOf(
                "uid" to uid,
                "delay" to delay,
                "receivedBitrate" to receivedBitrate,
                "receivedFrameRate" to receivedFrameRate
        ))
    }

    override fun onVideoSizeChanged(uid: Int, width: Int, height: Int, @IntRange(from = 0, to = 360) rotation: Int) {
        super.onVideoSizeChanged(uid, width, height, rotation)
        callback(hashMapOf(
                "uid" to uid,
                "width" to width,
                "height" to height,
                "rotation" to rotation
        ))
    }

    override fun onLastmileProbeResult(result: LastmileProbeResult?) {
        super.onLastmileProbeResult(result)
        callback(result?.let {
            hashMapOf("result" to it.toMap())
        })
    }

    override fun onChannelMediaRelayEvent(@Annotations.AgoraChannelMediaRelayEvent code: Int) {
        super.onChannelMediaRelayEvent(code)
        callback(hashMapOf("code" to code))
    }

    @Deprecated("", ReplaceWith("onRemoteAudioStateChanged"))
    override fun onUserMuteAudio(uid: Int, muted: Boolean) {
        super.onUserMuteAudio(uid, muted)
        callback(hashMapOf(
                "uid" to uid,
                "muted" to muted
        ))
    }

    @Deprecated("", ReplaceWith("onRemoteAudioStateChanged"))
    override fun onFirstRemoteAudioDecoded(uid: Int, elapsed: Int) {
        super.onFirstRemoteAudioDecoded(uid, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "elapsed" to elapsed
        ))
    }

    override fun onLocalUserRegistered(uid: Int, userAccount: String?) {
        super.onLocalUserRegistered(uid, userAccount)
        callback(hashMapOf(
                "uid" to uid,
                "userAccount" to userAccount
        ))
    }

    override fun onError(@Annotations.AgoraErrorCode err: Int) {
        super.onError(err)
        callback(hashMapOf("err" to err))
    }

    @Deprecated("", ReplaceWith("onRemoteVideoStateChanged"))
    override fun onUserEnableVideo(uid: Int, enabled: Boolean) {
        super.onUserEnableVideo(uid, enabled)
        callback(hashMapOf(
                "uid" to uid,
                "enabled" to enabled
        ))
    }

    override fun onUserInfoUpdated(uid: Int, userInfo: UserInfo?) {
        super.onUserInfoUpdated(uid, userInfo)
        callback(hashMapOf(
                "uid" to uid,
                "userInfo" to userInfo?.toMap()
        ))
    }

    override fun onRemoteAudioStateChanged(uid: Int, @Annotations.AgoraAudioRemoteState state: Int, @Annotations.AgoraAudioRemoteStateReason reason: Int, elapsed: Int) {
        super.onRemoteAudioStateChanged(uid, state, reason, elapsed)
        callback(hashMapOf(
                "uid" to uid,
                "state" to state,
                "reason" to reason,
                "elapsed" to elapsed
        ))
    }
}
