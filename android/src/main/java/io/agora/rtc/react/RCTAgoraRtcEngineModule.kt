package io.agora.rtc.react

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import io.agora.rtc.RtcEngine
import io.agora.rtc.base.RtcEngineEventHandler
import io.agora.rtc.base.RtcEngineManager
import io.agora.rtc.react.RCTAgoraRtcEngineModule.Companion.REACT_CLASS
import kotlin.reflect.full.declaredMemberFunctions
import kotlin.reflect.jvm.javaMethod

@ReactModule(name = REACT_CLASS)
class RCTAgoraRtcEngineModule(
        reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val REACT_CLASS = "RCTAgoraRtcEngineModule"
    }

    private val manager = RtcEngineManager { methodName, data -> emit(methodName, data) }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun getConstants(): MutableMap<String, Any> {
        return mutableMapOf(
                "prefix" to RtcEngineEventHandler.PREFIX
        )
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        manager.release()
    }

    private fun emit(methodName: String, data: Map<String, Any?>?) {
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("${RtcEngineEventHandler.PREFIX}$methodName", Arguments.makeNativeMap(data))
    }

    fun engine(): RtcEngine? {
        return manager.engine
    }

    @ReactMethod
    fun callMethod(methodName: String, params: ReadableMap?, callback: Promise?) {
        manager::class.declaredMemberFunctions.find { it.name == methodName }?.let { function ->
            function.javaMethod?.let { method ->
                try {
                    val parameters = mutableListOf<Any?>()
                    params?.toHashMap()?.toMutableMap()?.let {
                        if (methodName == "create") {
                            it["context"] = reactApplicationContext.applicationContext
                        }
                        parameters.add(it)
                    }
                    method.invoke(manager, *parameters.toTypedArray(), PromiseCallback(callback))
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }
}
