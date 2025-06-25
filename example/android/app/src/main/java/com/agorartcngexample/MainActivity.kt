package com.agorartcngexample;

import android.app.PictureInPictureParams
import android.content.res.Configuration
import android.os.Build
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import io.agora.rtc.ng.react.AgoraPIPActivity
import io.agora.pip.AgoraPIPActivityProxy
import io.agora.pip.AgoraPIPActivityListener
import java.lang.ref.WeakReference

class MainActivity : AgoraPIPActivity(), AgoraPIPActivityProxy {
  private var mListener: WeakReference<AgoraPIPActivityListener>? = null

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "AgoraRtcNgExample"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun setAgoraPIPActivityListener(listener: AgoraPIPActivityListener?) {
    mListener = listener?.let { WeakReference(it) }
  }

  override fun onPictureInPictureModeChanged(isInPictureInPictureMode: Boolean, newConfig: Configuration) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig)
    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      @Suppress("DEPRECATION")
      super.onPictureInPictureModeChanged(isInPictureInPictureMode)
    }

    mListener?.get()?.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig)
  }
}
