package io.agora.rtc.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import io.agora.rtc.RtcChannel
import io.agora.rtc.RtcEngine
import io.agora.rtc.base.RtcTextureView
import io.agora.rtc.base.toSDKUInt

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
            val channel = (map["channelId"] as? String)?.let { getChannel(it) }
            getEngine()?.let { view.setData(it, channel, map["uid"]?.toSDKUInt()!!) }
        }
    }

    @ReactProp(name = "renderMode")
    fun setRenderMode(view: RtcTextureView, renderMode: Int) {
        getEngine()?.let { view.setRenderMode(it, renderMode) }
    }

    @ReactProp(name = "mirrorMode")
    fun setMirrorMode(view: RtcTextureView, mirrorMode: Int) {
        getEngine()?.let { view.setMirrorMode(it, mirrorMode) }
    }

    private fun getEngine(): RtcEngine? {
        return reactContext?.getNativeModule(RCTAgoraRtcEngineModule::class.java)?.engine()
    }

    private fun getChannel(channelId: String): RtcChannel? {
        return reactContext?.getNativeModule(RCTAgoraRtcChannelModule::class.java)?.channel(channelId)
    }
}
