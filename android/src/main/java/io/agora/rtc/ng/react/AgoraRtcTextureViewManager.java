package io.agora.rtc.ng.react;

import android.view.TextureView;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class AgoraRtcTextureViewManager extends SimpleViewManager<TextureView> {
  private ThemedReactContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "AgoraRtcTextureView";
  }

  @NonNull
  @Override
  protected TextureView
  createViewInstance(@NonNull ThemedReactContext reactContext) {
    this.reactContext = reactContext;
    return new TextureView(reactContext.getApplicationContext());
  }

  @ReactProp(name = "callApi")
  public void callApi(TextureView view, ReadableMap arguments) {
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
}
