package com.example.reactnativeagora;

import android.os.Bundle;

import com.example.plugin.Plugin;
import com.facebook.react.ReactActivity;

import io.agora.rtc.base.RtcEnginePlugin;

public class MainActivity extends ReactActivity {

  private Plugin plugin = new Plugin();

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AgoraExample";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RtcEnginePlugin.Registrant.register(plugin);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    RtcEnginePlugin.Registrant.unregister(plugin);
  }

}
