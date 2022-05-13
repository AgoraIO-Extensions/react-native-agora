package io.agora.rtc.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import io.agora.rtc.base.RtcChannelManager
import io.agora.rtc.base.RtcEngineManager
import io.agora.rtc.base.RtcSurfaceView

class RCTAgoraRtcSurfaceViewManager : SimpleViewManager<RtcSurfaceView>() {
  companion object {
    const val REACT_CLASS = "RCTAgoraRtcSurfaceView"
  }

  private var reactContext: ThemedReactContext? = null

  override fun createViewInstance(reactContext: ThemedReactContext): RtcSurfaceView {
    this.reactContext = reactContext
    return RtcSurfaceView(reactContext)
  }

  override fun onDropViewInstance(view: RtcSurfaceView) {
    // getEngine()?.let { view.resetVideoCanvas(it) }
    super.onDropViewInstance(view)
  }

  override fun getName(): String {
    return REACT_CLASS
  }

  @ReactProp(name = "zOrderMediaOverlay")
  fun setZOrderMediaOverlay(view: RtcSurfaceView, isMediaOverlay: Boolean) {
    view.setZOrderMediaOverlay(isMediaOverlay)
  }

  @ReactProp(name = "zOrderOnTop")
  fun setZOrderOnTop(view: RtcSurfaceView, onTop: Boolean) {
    view.setZOrderOnTop(onTop)
  }

  @ReactProp(name = "data")
  fun setData(view: RtcSurfaceView, data: ReadableMap) {
    data.toHashMap().let { map ->
      val channel = (map["channelId"] as? String)?.let { RtcChannelManager[it] }
      RtcEngineManager.engine?.let { view.setData(it, channel, map["uid"] as Number) }
    }
  }

  @ReactProp(name = "renderMode")
  fun setRenderMode(view: RtcSurfaceView, renderMode: Int) {
    RtcEngineManager.engine?.let { view.setRenderMode(it, renderMode) }
  }

  @ReactProp(name = "mirrorMode")
  fun setMirrorMode(view: RtcSurfaceView, mirrorMode: Int) {
    RtcEngineManager.engine?.let { view.setMirrorMode(it, mirrorMode) }
  }
}
