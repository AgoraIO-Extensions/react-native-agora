package io.agora.rtc.ng.react;

import android.view.SurfaceView;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class AgoraRtcSurfaceViewManager extends SimpleViewManager<FrameLayout> {
  public static final String REACT_CLASS = "AgoraRtcSurfaceView";
  private ThemedReactContext reactContext;

  @Override
  @NonNull
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  @NonNull
  protected FrameLayout
  createViewInstance(@NonNull ThemedReactContext reactContext) {
    this.reactContext = reactContext;
    FrameLayout layout = new FrameLayout(reactContext.getReactApplicationContext());
    layout.addView(new SurfaceView(reactContext.getApplicationContext()));
    return layout;
  }

  @ReactProp(name = "callApi")
  public void callApi(FrameLayout view, ReadableMap arguments) {
    String funcName = arguments.getString("funcName");
    String params = arguments.getString("params");
    AgoraRtcNgModule module = reactContext.getNativeModule(AgoraRtcNgModule.class);
    if (module != null) {
      try {
        module.irisApiEngine.callIrisApi(funcName, params, view.getChildAt(0));
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  @ReactProp(name = "zOrderOnTop")
  public void setZOrderOnTop(FrameLayout view, boolean onTop) {
    ((SurfaceView) view.getChildAt(0)).setZOrderOnTop(onTop);
  }

  @ReactProp(name = "zOrderMediaOverlay")
  public void setZOrderMediaOverlay(FrameLayout view, boolean isMediaOverlay) {
    ((SurfaceView) view.getChildAt(0)).setZOrderMediaOverlay(isMediaOverlay);
  }
}
