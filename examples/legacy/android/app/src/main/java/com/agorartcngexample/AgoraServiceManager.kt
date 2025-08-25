package com.agorartcngexample

import android.content.Context
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AgoraServiceManager(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule() {

    override fun getName(): String = "AgoraServiceManager"

    @ReactMethod
    fun startForegroundService() {
        val context = reactContext.applicationContext
        val serviceIntent = Intent(context, AgoraForegroundService::class.java)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent)
        } else {
            context.startService(serviceIntent)
        }
    }

    @ReactMethod
    fun stopForegroundService() {
        val context = reactContext.applicationContext
        val serviceIntent = Intent(context, AgoraForegroundService::class.java)
        context.stopService(serviceIntent)
    }
}
