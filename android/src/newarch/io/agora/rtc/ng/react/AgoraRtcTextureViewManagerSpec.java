package io.agora.rtc.ng.react;

import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.viewmanagers.AgoraRtcTextureViewManagerDelegate;
import com.facebook.react.viewmanagers.AgoraRtcTextureViewManagerInterface;

import javax.annotation.Nullable;

public abstract class AgoraRtcTextureViewManagerSpec<T extends View> extends SimpleViewManager<T> implements AgoraRtcTextureViewManagerInterface<T> {

  private final ViewManagerDelegate<T> mDelegate;

  public AgoraRtcTextureViewManagerSpec() {
    mDelegate = new AgoraRtcTextureViewManagerDelegate(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<T> getDelegate() {
    return mDelegate;
  }
}
