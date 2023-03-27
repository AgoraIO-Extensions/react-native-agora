package io.agora.rtc.ng.react;

import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.AgoraRtcSurfaceViewManagerDelegate;
import com.facebook.react.viewmanagers.AgoraRtcSurfaceViewManagerInterface;

import javax.annotation.Nullable;

public abstract class AgoraRtcSurfaceViewManagerSpec<T extends View> extends SimpleViewManager<T> implements AgoraRtcSurfaceViewManagerInterface<T> {

  private final ViewManagerDelegate<T> mDelegate;

  public AgoraRtcSurfaceViewManagerSpec() {
    mDelegate = new AgoraRtcSurfaceViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
