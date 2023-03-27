package io.agora.rtc.ng.react;

import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;

public abstract class AgoraRtcSurfaceViewManagerSpec<T extends View> extends SimpleViewManager<T> {
  public abstract void setCallApi(T view, @Nullable ReadableMap arguments);

  public abstract void setZOrderOnTop(T view, boolean onTop);

  public abstract void setZOrderMediaOverlay(T view, boolean isMediaOverlay);
}
