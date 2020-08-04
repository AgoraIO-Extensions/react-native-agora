package io.agora.rtc.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import io.agora.rtc.RtcChannel
import io.agora.rtc.RtcEngine
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
        val channel = data.getString("channelId")?.let { getChannel(it) }
        getEngine()?.let { view.setData(it, channel, data.getInt("uid")) }
    }

    @ReactProp(name = "mirror")
    fun setMirror(view: RtcTextureView, mirror: Boolean) {
        getEngine()?.let { view.setMirror(it, mirror) }
    }

    private fun getEngine(): RtcEngine? {
        return reactContext?.getNativeModule(RCTAgoraRtcEngineModule::class.java)?.engine()
    }

    private fun getChannel(channelId: String): RtcChannel? {
        return reactContext?.getNativeModule(RCTAgoraRtcChannelModule::class.java)?.channel(channelId)
    }
}
