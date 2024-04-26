package io.agora.rtc.ng.react;

import android.view.SurfaceView;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

@ReactModule(name = AgoraRtcSurfaceViewManager.NAME)
public class AgoraRtcSurfaceViewManager extends AgoraRtcSurfaceViewManagerSpec<FrameLayout> {

  public static final String NAME = "AgoraRtcSurfaceView";
  private ThemedReactContext context;

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public FrameLayout createViewInstance(ThemedReactContext context) {
    this.context = context;
    RoundedFrameLayout layout = new RoundedFrameLayout(context.getReactApplicationContext());
    layout.addView(new SurfaceView(context.getApplicationContext()));
    return layout;
  }

  @Override
  @ReactProp(name = "callApi")
  public void setCallApi(FrameLayout view, @Nullable ReadableMap arguments) {
    String funcName = arguments.getString("funcName");
    String params = arguments.getString("params");
    AgoraRtcNgModule module = context.getNativeModule(AgoraRtcNgModule.class);
    if (module != null) {
      try {
        module.irisApiEngine.callIrisApi(funcName, params, view.getChildAt(0));
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  @ReactProp(name = "zOrderOnTop")
  public void setZOrderOnTop(FrameLayout view, boolean onTop) {
    ((SurfaceView) view.getChildAt(0)).setZOrderOnTop(onTop);
  }

  @Override
  @ReactProp(name = "zOrderMediaOverlay")
  public void setZOrderMediaOverlay(FrameLayout view, boolean isMediaOverlay) {
    ((SurfaceView) view.getChildAt(0)).setZOrderMediaOverlay(isMediaOverlay);
  }

  
  @Override
  @ReactProp(name = "cornerRadius")
  public void setCornerRadius(FrameLayout view, float radius){
    ((RoundedFrameLayout) view).setCornerRadius(radius);
  }
}
