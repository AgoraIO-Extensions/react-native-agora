package com.reactnativeagoraexampleexpo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import io.agora.base.VideoFrame
import io.agora.rtc2.IRtcEngineEventHandler
import io.agora.rtc2.RtcEngine
import io.agora.rtc2.RtcEngineConfig
import io.agora.rtc2.video.IVideoFrameObserver

class VideoRawDataNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private var rtcEngine: RtcEngine? = null
  private val appContext = reactContext

  override fun getName(): String = "VideoRawDataNativeModule"

  @ReactMethod
  fun initialize(appId: String) {
    try {
      val config =
        RtcEngineConfig().apply {
          mAppId = appId
          mContext = appContext
          mEventHandler = object : IRtcEngineEventHandler() {}
        }

      rtcEngine = RtcEngine.create(config)
      rtcEngine?.registerVideoFrameObserver(
        object : IVideoFrameObserver {
          override fun onCaptureVideoFrame(sourceType: Int, videoFrame: VideoFrame): Boolean {
            val i420Buffer = videoFrame.buffer.toI420()
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
            return true
          }

          override fun onPreEncodeVideoFrame(
            sourceType: Int,
            videoFrame: VideoFrame
          ): Boolean = false

          override fun onMediaPlayerVideoFrame(
            videoFrame: VideoFrame,
            mediaPlayerId: Int
          ): Boolean = false

          override fun onRenderVideoFrame(
            channelId: String,
            uid: Int,
            videoFrame: VideoFrame
          ): Boolean = false

          override fun getVideoFrameProcessMode(): Int =
            IVideoFrameObserver.PROCESS_MODE_READ_WRITE

          override fun getVideoFormatPreference(): Int =
            IVideoFrameObserver.VIDEO_PIXEL_I420

          override fun getRotationApplied(): Boolean = false

          override fun getMirrorApplied(): Boolean = false

          override fun getObservedFramePosition(): Int =
            IVideoFrameObserver.POSITION_POST_CAPTURER
        }
      )
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  fun releaseModule() {
    rtcEngine?.let {
      it.registerVideoFrameObserver(null)
      RtcEngine.destroy()
      rtcEngine = null
    }
  }
}
