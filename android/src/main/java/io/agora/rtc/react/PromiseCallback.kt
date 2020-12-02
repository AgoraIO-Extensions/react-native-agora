package io.agora.rtc.react

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import io.agora.rtc.base.Callback

class PromiseCallback(
  private val promise: Promise?
) : Callback() {
  override fun success(data: Any?) {
    if (data is Map<*, *>) {
      val map = mutableMapOf<String, Any?>()
      data.forEach {
        if (it.key is String) {
          map[it.key as String] = it.value
        }
      }
      promise?.resolve(Arguments.makeNativeMap(map))
    } else {
      promise?.resolve(data)
    }
  }

  override fun failure(code: String, message: String) {
    promise?.reject(code, message)
  }
}
