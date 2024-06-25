package io.agora.rtc.ng.react;

import android.util.Base64;

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

import io.agora.iris.IrisApiEngine;
import io.agora.iris.IrisEventHandler;

@ReactModule(name = AgoraRtcNgModule.NAME)
public class AgoraRtcNgModule extends AgoraRtcNgSpec implements IrisEventHandler {
  public static final String NAME = "AgoraRtcNg";
  public final Object irisApiLock = new Object();
  public IrisApiEngine irisApiEngine;

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
