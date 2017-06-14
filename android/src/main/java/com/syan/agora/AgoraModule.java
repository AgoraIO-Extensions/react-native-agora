package com.syan.agora;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class AgoraModule extends ReactContextBaseJavaModule {

    public AgoraModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RCTAgora";
    }

    @ReactMethod
    public void loadAgoraKit(ReadableMap options) {
        Log.i("Agora", options.toString());
    }

}
