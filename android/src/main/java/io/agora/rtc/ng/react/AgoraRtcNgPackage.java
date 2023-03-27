package io.agora.rtc.ng.react;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.ModuleHolder;
import com.facebook.react.bridge.ModuleSpec;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AgoraRtcNgPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (name.equals(AgoraRtcNgModule.NAME)) {
      return new AgoraRtcNgModule(reactContext);
    } else {
      return null;
    }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
      boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
      moduleInfos.put(
        AgoraRtcNgModule.NAME,
        new ReactModuleInfo(
          AgoraRtcNgModule.NAME,
          AgoraRtcNgModule.NAME,
          false, // canOverrideExistingModule
          false, // needsEagerInit
          true, // hasConstants
          false, // isCxxModule
          isTurboModule // isTurboModule
        ));
      return moduleInfos;
    };
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    List<ViewManager> viewManagers = new ArrayList<>();
    viewManagers.add(new AgoraRtcSurfaceViewManager());
    viewManagers.add(new AgoraRtcTextureViewManager());
    return viewManagers;
  }
}
