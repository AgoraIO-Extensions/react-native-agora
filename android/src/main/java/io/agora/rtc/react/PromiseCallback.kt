package io.agora.rtc.react

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import io.agora.rtc.Constants
import io.agora.rtc.RtcEngine
import io.agora.rtc.base.Callback

class PromiseCallback(
        private val promise: Promise?
) : Callback<Map<String, Any?>>() {
    fun <E> resolve(e: E?, data: (e: E) -> Any?) {
        if (e != null) {
            try {
                val res = data(e)
                if (res is Unit) {
                    promise?.resolve(null)
                } else {
                    promise?.resolve(res)
                }
            } catch (ex: Exception) {
                promise?.reject(ex)
            }
        } else {
            val code = Constants.ERR_NOT_INITIALIZED
            failure(code.toString(), RtcEngine.getErrorDescription(code))
        }
    }

    override fun success(data: Map<String, Any?>?) {
        promise?.resolve(Arguments.makeNativeMap(data))
    }

    override fun failure(code: String, message: String) {
        promise?.reject(code, message)
    }
}
