package io.agora.rtc.ng.react;

import android.app.Activity;
import android.util.Base64;
import android.graphics.Rect;
import android.os.Build;
import android.util.Rational;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import io.agora.iris.IrisApiEngine;
import io.agora.iris.IrisEventHandler;

import io.agora.pip.AgoraPIPActivityProxy;
import io.agora.pip.AgoraPIPController;

@ReactModule(name = AgoraRtcNgModule.NAME)
public class AgoraRtcNgModule extends AgoraRtcNgSpec implements IrisEventHandler {
  public static final String NAME = "AgoraRtcNg";
  public final Object irisApiLock = new Object();
  public IrisApiEngine irisApiEngine;
  private AgoraPIPController pipController;

  AgoraRtcNgModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean newIrisApiEngine() {
    synchronized (irisApiLock) {
      if (irisApiEngine == null) {
        IrisApiEngine.enableUseJsonArray(true);
        irisApiEngine = new IrisApiEngine(getReactApplicationContext());
        irisApiEngine.setEventHandler(this);
        Activity currentActivity = getReactApplicationContext().getCurrentActivity();
        if (currentActivity != null) {
          initPipController(currentActivity);
        }
        return true;
      }
    }
    return false;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean destroyIrisApiEngine() {
    synchronized (irisApiLock) {
      if (irisApiEngine != null) {
        irisApiEngine.setEventHandler(null);
        irisApiEngine.destroy();
        irisApiEngine = null;
        pipController = null;
        return true;
      }
    }
    return false;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String callApi(ReadableMap args) {
    synchronized (irisApiLock) {
      String funcName = args.getString("funcName");
      String params = args.getString("params");
      List<byte[]> buffers = null;

      ReadableArray array = args.getArray("buffers");
      if (array != null) {
        buffers = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
          buffers.add(Base64.decode(array.getString(i), Base64.DEFAULT));
        }
      }

      try {
        newIrisApiEngine();
        return irisApiEngine.callIrisApi(funcName, params, buffers);
      } catch (Exception e) {
        e.printStackTrace();
        try {
          return new JSONObject().put("result", e.getMessage()).toString();
        } catch (JSONException ex) {
          throw new RuntimeException(ex);
        }
      }
    }
  }

  private void initPipController(@NonNull Activity activity) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

      if (!(activity instanceof AgoraPIPActivityProxy)) {
        return;
      }

      if (pipController != null) {
        pipController.dispose();
      }

      pipController = new AgoraPIPController(
          (AgoraPIPActivityProxy) activity,
          new AgoraPIPController.PIPStateChangedListener() {
            @Override
            public void onPIPStateChangedListener(
                AgoraPIPController.PIPState state, String error) {
              try {
                OnEvent("AgoraPip_onPipStateChanged",
                    new JSONObject().put("state", state.getValue()).put("error", error).toString(), null);
              } catch (JSONException e) {
                throw new RuntimeException(e);
              }
            }
          });
    }
  }

  @ReactMethod
  public void showRPSystemBroadcastPickerView(boolean showsMicrophoneButton, Promise promise) {
    promise.reject("", "not support");
  }

  @ReactMethod
  public void addListener(String eventName) {

  }

  @ReactMethod
  public void removeListeners(double count) {

  }

  private boolean checkPipIsReady() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      return false;
    }
    if (pipController == null) {
      return false;
    }
    return true;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean pipIsSupported() {
    synchronized (irisApiLock) {
      return checkPipIsReady() && pipController.isSupported();
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean pipIsAutoEnterSupported() {
    synchronized (irisApiLock) {
      return checkPipIsReady() && pipController.isAutoEnterSupported();
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean isPipActivated() {
    synchronized (irisApiLock) {
      return checkPipIsReady() && pipController.isActivated();
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean pipSetup(ReadableMap options) {
    synchronized (irisApiLock) {
      if (!checkPipIsReady()) {
        return false;
      }
      Rational aspectRatio = null;
      if (options.hasKey("aspectRatioX") && options.hasKey("aspectRatioY")) {
        aspectRatio = new Rational(options.getInt("aspectRatioX"),
            options.getInt("aspectRatioY"));
      }
      Boolean autoEnterEnabled = null;
      if (options.hasKey("autoEnterEnabled")) {
        autoEnterEnabled = options.getBoolean("autoEnterEnabled");
      }
      Rect sourceRectHint = null;
      if (options.hasKey("sourceRectHintLeft") &&
          options.hasKey("sourceRectHintTop") &&
          options.hasKey("sourceRectHintRight") &&
          options.hasKey("sourceRectHintBottom")) {
        sourceRectHint = new Rect(
            options.getInt("sourceRectHintLeft"),
            options.getInt("sourceRectHintTop"),
            options.getInt("sourceRectHintRight"),
            options.getInt("sourceRectHintBottom"));
      }
      Boolean seamlessResizeEnabled = null;
      if (options.hasKey("seamlessResizeEnabled")) {
        seamlessResizeEnabled = options.getBoolean("seamlessResizeEnabled");
      }
      Boolean useExternalStateMonitor = null;
      if (options.hasKey("useExternalStateMonitor")) {
        useExternalStateMonitor = options.getBoolean("useExternalStateMonitor");
      } else {
        useExternalStateMonitor = true;
      }
      Integer externalStateMonitorInterval = null;
      if (options.hasKey("externalStateMonitorInterval")) {
        externalStateMonitorInterval = options.getInt("externalStateMonitorInterval");
      } else {
        externalStateMonitorInterval = 100;
      }
      boolean result = pipController.setup(
          aspectRatio, autoEnterEnabled, sourceRectHint,
          seamlessResizeEnabled, useExternalStateMonitor,
          externalStateMonitorInterval);
      return result;
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean pipStart() {
    synchronized (irisApiLock) {
      return checkPipIsReady() && pipController.start();
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void pipStop() {
    synchronized (irisApiLock) {
      if (checkPipIsReady()) {
        pipController.stop();
      }
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void pipDispose() {
    synchronized (irisApiLock) {
      if (checkPipIsReady()) {
        pipController.dispose();
      }
    }
  }

  @Override
  public void OnEvent(String event, String data, List<byte[]> buffers) {
    final WritableMap map = Arguments.createMap();
    map.putString("event", event);
    map.putString("data", data);
    if (buffers != null) {
      WritableArray array = Arguments.createArray();
      for (byte[] buffer : buffers) {
        String base64 = Base64.encodeToString(buffer, Base64.DEFAULT);
        array.pushString(base64);
      }
      map.putArray("buffers", array);
    }
    getReactApplicationContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("AgoraRtcNg:onEvent", map);
  }
}
