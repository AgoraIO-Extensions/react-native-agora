package io.agora.rtc.ng.react;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public abstract class AgoraRtcNgSpec extends ReactContextBaseJavaModule {
  AgoraRtcNgSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract boolean newIrisApiEngine();

  public abstract boolean destroyIrisApiEngine();

  public abstract String callApi(ReadableMap arguments);

  public abstract void showRPSystemBroadcastPickerView(boolean showsMicrophoneButton, Promise promise);

  public abstract void addListener(String eventName);

  public abstract void removeListeners(double count);

  public abstract boolean pipIsSupported();

  public abstract boolean pipIsAutoEnterSupported();

  public abstract boolean isPipActivated();

  public abstract boolean pipSetup(ReadableMap options);

  public abstract boolean pipStart();

  public abstract void pipStop();

  public abstract void pipDispose();

  public abstract double nativeViewCreate();

  public abstract void nativeViewDestroy(ReadableMap options);

  public abstract void nativeViewSetParent(ReadableMap options);

  public abstract void nativeViewSetLayout(ReadableMap options);

}
