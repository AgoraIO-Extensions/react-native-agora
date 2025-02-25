package com.agorartcngexample

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import io.agora.base.VideoFrame
import io.agora.rtc2.IRtcEngineEventHandler
import io.agora.rtc2.RtcEngine
import io.agora.rtc2.RtcEngineConfig
import io.agora.rtc2.video.IVideoFrameObserver
import java.nio.ByteBuffer

class VideoRawDataNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var appId: String? = null
    private var rtcEngine: RtcEngine? = null
    private val reactContext: ReactApplicationContext = reactContext

    override fun getName(): String {
        return "VideoRawDataNativeModule"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun initialize(appId: String) {
        this.appId = appId
        try {
            val config = RtcEngineConfig()
            config.mAppId = appId
            config.mContext = reactContext
            config.mEventHandler = object : IRtcEngineEventHandler() {}

            rtcEngine = RtcEngine.create(config)

            rtcEngine?.registerVideoFrameObserver(object : IVideoFrameObserver {
                override fun onCaptureVideoFrame(sourceType: Int, videoFrame: VideoFrame): Boolean {
                    videoFrame?.apply {
                        val i420Buffer = buffer.toI420()
                        // Make it grey: Set U and V (chroma) components to neutral value
                        val neutralValue: Byte = 128.toByte()
                        val dataU = i420Buffer.dataU
                        val dataV = i420Buffer.dataV

                        while (dataU.hasRemaining()) {
                            dataU.put(neutralValue)
                        }

                        while (dataV.hasRemaining()) {
                            dataV.put(neutralValue)
                        }

                        videoFrame.replaceBuffer(i420Buffer, videoFrame.rotation, videoFrame.timestampNs)
                    }
                    return true
                }

                override fun onPreEncodeVideoFrame(sourceType: Int, videoFrame: VideoFrame): Boolean {
                    return false
                }

                override fun onMediaPlayerVideoFrame(videoFrame: VideoFrame, mediaPlayerId: Int): Boolean {
                    return false
                }

                override fun onRenderVideoFrame(channelId: String, uid: Int, videoFrame: VideoFrame): Boolean {
                    return false
                }

                override fun getVideoFrameProcessMode(): Int {
                    return IVideoFrameObserver.PROCESS_MODE_READ_WRITE
                }

                override fun getVideoFormatPreference(): Int {
                    return IVideoFrameObserver.VIDEO_PIXEL_I420
                }

                override fun getRotationApplied(): Boolean {
                    return false
                }

                override fun getMirrorApplied(): Boolean {
                    return false
                }

                override fun getObservedFramePosition(): Int {
                    return IVideoFrameObserver.POSITION_POST_CAPTURER
                }
            })
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun releaseModule() {
        rtcEngine?.let {
            it.registerVideoFrameObserver(null)
            RtcEngine.destroy()
            rtcEngine = null
        }
    }
}
