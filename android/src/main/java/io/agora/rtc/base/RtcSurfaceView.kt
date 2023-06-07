package io.agora.rtc.base

import android.content.Context
import android.view.SurfaceView
import android.widget.FrameLayout
import io.agora.rtc.RtcChannel
import io.agora.rtc.RtcEngine
import io.agora.rtc.video.VideoCanvas
import java.lang.ref.WeakReference

class RtcSurfaceView(
  context: Context
) : FrameLayout(context) {
  private var surface: SurfaceView
  private var canvas: VideoCanvas? = null
  private var isMediaOverlay = false
  private var onTop = false
  private var channel: WeakReference<RtcChannel>? = null

  init {
    try {
      surface = RtcEngine.CreateRendererView(context)
    } catch (e: UnsatisfiedLinkError) {
      throw RuntimeException("Please init RtcEngine first!")
    }
    addView(surface)
  }

  fun setZOrderMediaOverlay(isMediaOverlay: Boolean) {
    this.isMediaOverlay = isMediaOverlay
    try {
      removeView(surface)
      surface.setZOrderMediaOverlay(isMediaOverlay)
      addView(surface)
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  fun setZOrderOnTop(onTop: Boolean) {
    this.onTop = onTop
    try {
      removeView(surface)
      surface.setZOrderOnTop(onTop)
      addView(surface)
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  fun setData(engine: RtcEngine, channel: RtcChannel?, uid: Number) {
    this.channel = if (channel != null) WeakReference(channel) else null
    canvas = canvas ?: VideoCanvas(surface)
    canvas?.channelId = this.channel?.get()?.channelId()
    canvas?.uid = uid.toNativeUInt()
    setupVideoCanvas(engine)
  }

  fun resetVideoCanvas(engine: RtcEngine) {
    canvas?.let {
      val canvas =
        VideoCanvas(null, it.renderMode, it.channelId, it.uid, it.mirrorMode)
      if (canvas.uid == 0) {
        engine.setupLocalVideo(canvas)
      } else {
        engine.setupRemoteVideo(canvas)
      }
    }
  }

  private fun setupVideoCanvas(engine: RtcEngine) {
    removeAllViews()
    surface = RtcEngine.CreateRendererView(context.applicationContext)
    surface.setZOrderMediaOverlay(isMediaOverlay)
    surface.setZOrderOnTop(onTop)
    addView(surface)
    surface.layout(0, 0, width, height)
    canvas?.let { canvas ->
      canvas.view = surface
      if (canvas.uid == 0) {
        engine.setupLocalVideo(canvas)
      } else {
        engine.setupRemoteVideo(canvas)
      }
    }
  }

  fun setRenderMode(engine: RtcEngine, @Annotations.AgoraVideoRenderMode renderMode: Int) {
    canvas?.renderMode = renderMode
    setupRenderMode(engine)
  }

  fun setMirrorMode(engine: RtcEngine, @Annotations.AgoraVideoMirrorMode mirrorMode: Int) {
    canvas?.mirrorMode = mirrorMode
    setupRenderMode(engine)
  }

  private fun setupRenderMode(engine: RtcEngine) {
    canvas?.let { canvas ->
      if (canvas.uid == 0) {
        engine.setLocalRenderMode(canvas.renderMode, canvas.mirrorMode)
      } else {
        channel?.get()?.let {
          it.setRemoteRenderMode(canvas.uid, canvas.renderMode, canvas.mirrorMode)
          return@setupRenderMode
        }
        engine.setRemoteRenderMode(canvas.uid, canvas.renderMode, canvas.mirrorMode)
      }
    }
  }

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    val width: Int = MeasureSpec.getSize(widthMeasureSpec)
    val height: Int = MeasureSpec.getSize(heightMeasureSpec)
    surface.layout(0, 0, width, height)
    super.onMeasure(widthMeasureSpec, heightMeasureSpec)
  }
}
