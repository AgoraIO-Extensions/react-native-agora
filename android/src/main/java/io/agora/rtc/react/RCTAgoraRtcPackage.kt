package io.agora.rtc.react

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RCTAgoraRtcPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
                RCTRtcEngineModule(reactContext),
                RCTRtcChannelModule(reactContext)
        )
    }

    // Deprecated in RN 0.47
    fun createJSModules(): List<Class<out JavaScriptModule>> {
        return emptyList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
                RCTAgoraRtcSurfaceViewManager(),
                RCTAgoraRtcTextureViewManager()
        )
    }
}
