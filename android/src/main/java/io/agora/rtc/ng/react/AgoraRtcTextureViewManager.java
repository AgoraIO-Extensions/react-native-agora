package io.agora.rtc.ng.react;

import android.view.TextureView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

@ReactModule(name = AgoraRtcTextureViewManager.NAME)
public class AgoraRtcTextureViewManager extends AgoraRtcTextureViewManagerSpec<TextureView> {

  public static final String NAME = "AgoraRtcTextureView";
  private ThemedReactContext context;

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public TextureView createViewInstance(ThemedReactContext context) {
    this.context = context;
    return new TextureView(context.getApplicationContext());
  }

  @Override
  @ReactProp(name = "callApi")
  public void setCallApi(TextureView view, @Nullable ReadableMap arguments) {
    String funcName = arguments.getString("funcName");
    String params = arguments.getString("params");
    AgoraRtcNgModule module = context.getNativeModule(AgoraRtcNgModule.class);
    synchronized (module.irisApiLock) {
      if (module != null) {
        try {
          module.irisApiEngine.callIrisApi(funcName, params, view);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    }
  }
}
