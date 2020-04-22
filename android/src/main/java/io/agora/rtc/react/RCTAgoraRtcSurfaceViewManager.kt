package io.agora.rtc.react

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import io.agora.rtc.RtcEngine
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

    @ReactProp(name = "renderMode")
    fun setRenderMode(view: RtcSurfaceView, mirrorMode: Int) {
        getEngine()?.let { view.setRenderMode(it, mirrorMode) }
    }

    @ReactProp(name = "channelId")
    fun setChannelId(view: RtcSurfaceView, channelId: String) {
        getEngine()?.let { view.setChannelId(it, channelId) }
    }

    @ReactProp(name = "mirrorMode")
    fun setMirrorMode(view: RtcSurfaceView, mirrorMode: Int) {
        getEngine()?.let { view.setMirrorMode(it, mirrorMode) }
    }

    @ReactProp(name = "uid")
    fun setUid(view: RtcSurfaceView, uid: Int) {
        getEngine()?.let { view.setUid(it, uid) }
    }

    private fun getEngine(): RtcEngine? {
        return reactContext?.getNativeModule(RCTAgoraRtcEngineModule::class.java)?.engine()
    }
}
