package com.reactnativeagoraexampleexpo

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import android.os.Build
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/** Demo-only Camera2 metadata bridge. Does not open or take ownership of a camera. */
class CameraCapabilitiesModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    override fun getName() = "CameraCapabilities"

    @ReactMethod
    fun getRearCameraZoomRanges(promise: Promise) {
        if (context.checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("CAMERA_PERMISSION", "Grant camera permission before querying cameras")
            return
        }
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.R) {
            promise.reject("ZOOM_RANGE_UNAVAILABLE", "Camera2 zoom ratio range requires Android 11 or later")
            return
        }
        try {
            val manager = context.getSystemService(Context.CAMERA_SERVICE) as CameraManager
            val cameras = Arguments.createArray()
            for (cameraId in manager.cameraIdList) {
                val characteristics = manager.getCameraCharacteristics(cameraId)
                if (characteristics.get(CameraCharacteristics.LENS_FACING) != CameraCharacteristics.LENS_FACING_BACK) continue
                val range = characteristics.get(CameraCharacteristics.CONTROL_ZOOM_RATIO_RANGE) ?: continue
                val camera = Arguments.createMap()
                camera.putString("cameraId", cameraId)
                camera.putDouble("minZoom", range.lower.toDouble())
                camera.putDouble("maxZoom", range.upper.toDouble())
                cameras.pushMap(camera)
            }
            promise.resolve(cameras)
        } catch (error: Exception) {
            promise.reject("CAMERA_QUERY_FAILED", "Could not read Camera2 zoom ranges", error)
        }
    }
}
