package com.example.plugin;

import io.agora.rtc.RtcEngine;
import io.agora.rtc.base.RtcEnginePlugin;
import io.agora.rtc.video.VideoEncoderConfiguration;

public class Plugin implements RtcEnginePlugin {
  @Override
  public void onRtcEngineCreated(RtcEngine rtcEngine) {
    if (rtcEngine != null) {
      rtcEngine.setVideoEncoderConfiguration(new VideoEncoderConfiguration() {{
        frameRate = 2;
      }});
    }
  }

  @Override
  public void onRtcEngineDestroyed() {

  }
}
