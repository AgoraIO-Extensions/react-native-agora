package io.agora.rtc.ng.react;

import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
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
public class AgoraRtcNgModule extends ReactContextBaseJavaModule implements IrisEventHandler {
  public static final String NAME = "AgoraRtcNg";
  public IrisApiEngine irisApiEngine;

  public AgoraRtcNgModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void newIrisApiEngine() {
    if (irisApiEngine == null) {
      IrisApiEngine.enableUseJsonArray(true);
      irisApiEngine = new IrisApiEngine(getReactApplicationContext());
      irisApiEngine.setEventHandler(this);
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void destroyIrisApiEngine() {
    if (irisApiEngine != null) {
      irisApiEngine.setEventHandler(null);
      irisApiEngine.destroy();
      irisApiEngine = null;
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String callApi(ReadableMap arguments) throws JSONException {
    String funcName = arguments.getString("funcName");
    String params = arguments.getString("params");
    List<byte[]> buffers = null;

    ReadableArray array = arguments.getArray("buffers");
    if (array != null) {
      buffers = new ArrayList<>();
      for (int i = 0; i < array.size(); i++) {
        buffers.add(Base64.decode(array.getString(i), Base64.DEFAULT));
      }
    }

    try {
      return irisApiEngine.callIrisApi(funcName, params, buffers);
    } catch (Exception e) {
      e.printStackTrace();
      return new JSONObject().put("result", e.getMessage()).toString();
    }
  }

  @ReactMethod
  public void addListener(String eventName) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // Keep: Required for RN built in Event Emitter Calls.
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
