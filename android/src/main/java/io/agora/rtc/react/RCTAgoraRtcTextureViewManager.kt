package io.agora.rtc.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import io.agora.rtc.base.RtcChannelManager
import io.agora.rtc.base.RtcEngineManager
import io.agora.rtc.base.RtcTextureView

class RCTAgoraRtcTextureViewManager : SimpleViewManager<RtcTextureView>() {
  companion object {
    const val REACT_CLASS = "RCTAgoraRtcTextureView"
  }

  private var reactContext: ThemedReactContext? = null

  override fun createViewInstance(reactContext: ThemedReactContext): RtcTextureView {
    this.reactContext = reactContext
    return RtcTextureView(reactContext)
  }

  override fun onDropViewInstance(view: RtcTextureView) {
    // getEngine()?.let { view.resetVideoRender(it) }
    super.onDropViewInstance(view)
  }

  override fun getName(): String {
    return REACT_CLASS
  }

  @ReactProp(name = "data")
  fun setData(view: RtcTextureView, data: ReadableMap) {
    data.toHashMap().let { map ->
      val channel = (map["channelId"] as? String)?.let { RtcChannelManager[it] }
      RtcEngineManager.engine?.let { view.setData(it, channel, map["uid"] as Number) }
    }
  }

  @ReactProp(name = "renderMode")
  fun setRenderMode(view: RtcTextureView, renderMode: Int) {
    RtcEngineManager.engine?.let { view.setRenderMode(it, renderMode) }
  }

  @ReactProp(name = "mirrorMode")
  fun setMirrorMode(view: RtcTextureView, mirrorMode: Int) {
    RtcEngineManager.engine?.let { view.setMirrorMode(it, mirrorMode) }
  }
}
