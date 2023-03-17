package io.agora.rtc.ng.react;

import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;

public abstract class AgoraRtcTextureViewManagerSpec<T extends View> extends SimpleViewManager<T> {
  public abstract void setCallApi(T view, @Nullable ReadableMap arguments);
}
