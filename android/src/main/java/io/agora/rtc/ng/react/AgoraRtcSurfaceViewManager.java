package io.agora.rtc.ng.react;

import android.view.SurfaceView;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class AgoraRtcSurfaceViewManager extends SimpleViewManager<SurfaceView> {
  private ThemedReactContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "AgoraRtcSurfaceView";
  }

  @NonNull
  @Override
  protected SurfaceView
  createViewInstance(@NonNull ThemedReactContext reactContext) {
    this.reactContext = reactContext;
    return new SurfaceView(reactContext.getApplicationContext());
  }

  @ReactProp(name = "callApi")
  public void callApi(SurfaceView view, ReadableMap arguments) {
    String funcName = arguments.getString("funcName");
    String params = arguments.getString("params");
    ReactNativeAgoraRtcNgModule module =
      reactContext.getNativeModule(ReactNativeAgoraRtcNgModule.class);
    if (module != null) {
      try {
        module.irisApiEngine.callIrisApi(funcName, params, view);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  @ReactProp(name = "zOrderOnTop")
  public void setZOrderOnTop(SurfaceView view, boolean onTop) {
    view.setZOrderOnTop(onTop);
  }

  @ReactProp(name = "zOrderMediaOverlay")
  public void setZOrderMediaOverlay(SurfaceView view, boolean isMediaOverlay) {
    view.setZOrderMediaOverlay(isMediaOverlay);
  }
}
