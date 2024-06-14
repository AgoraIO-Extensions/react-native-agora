package com.agorartcngexample;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import io.agora.base.VideoFrame;
import io.agora.rtc2.IRtcEngineEventHandler;
import io.agora.rtc2.RtcEngine;
import io.agora.rtc2.RtcEngineConfig;
import io.agora.rtc2.video.IVideoFrameObserver;
import java.nio.ByteBuffer;


public class VideoRawDataNativeModule extends ReactContextBaseJavaModule {
  private String appId;
  private RtcEngine rtcEngine;
  private ReactApplicationContext reactContext;

  public VideoRawDataNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "VideoRawDataNativeModule";
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void initialize(String appId) {
    this.appId = appId;
    try {
      RtcEngineConfig config = new RtcEngineConfig();
      config.mAppId = appId;
      config.mContext = reactContext;
      config.mEventHandler = new IRtcEngineEventHandler() {
      };

      rtcEngine = RtcEngine.create(config);

      rtcEngine.registerVideoFrameObserver(new IVideoFrameObserver() {
        @Override
        public boolean onCaptureVideoFrame(int sourceType, VideoFrame videoFrame) {
          if (videoFrame != null) {
            VideoFrame.I420Buffer i420Buffer = videoFrame.getBuffer().toI420();
            // Make it grey: Set U and V (chroma) components to neutral value
            byte neutralValue = (byte) 128;
            ByteBuffer dataU = i420Buffer.getDataU();
            ByteBuffer dataV = i420Buffer.getDataV();

            while (dataU.hasRemaining()) {
              dataU.put(neutralValue);
            }

            while (dataV.hasRemaining()) {
              dataV.put(neutralValue);
            }

            videoFrame.replaceBuffer(i420Buffer, videoFrame.getRotation(),
                videoFrame.getTimestampNs());
          }

          return true;
        }

        @Override
        public boolean onPreEncodeVideoFrame(int sourceType, VideoFrame videoFrame) {
          return false;
        }

        @Override
        public boolean onMediaPlayerVideoFrame(VideoFrame videoFrame, int mediaPlayerId) {
          return false;
        }

        @Override
        public boolean onRenderVideoFrame(String channelId, int uid, VideoFrame videoFrame) {
          return false;
        }

        @Override
        public int getVideoFrameProcessMode() {
          return PROCESS_MODE_READ_WRITE;
        }

        @Override
        public int getVideoFormatPreference() {
          return VIDEO_PIXEL_I420;
        }

        @Override
        public boolean getRotationApplied() {
          return false;
        }

        @Override
        public boolean getMirrorApplied() {
          return false;
        }

        @Override
        public int getObservedFramePosition() {
          return POSITION_POST_CAPTURER;
        }
      });
    } catch (Exception e) {
      e.printStackTrace();
    }

  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public void releaseModule() {
    if (rtcEngine != null) {
      rtcEngine.registerVideoFrameObserver(null);
      RtcEngine.destroy();
      rtcEngine = null;
    }
  }
}
