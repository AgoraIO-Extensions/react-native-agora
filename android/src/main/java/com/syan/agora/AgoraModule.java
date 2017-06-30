package com.syan.agora;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class AgoraModule extends ReactContextBaseJavaModule {

    public AgoraModule(ReactApplicationContext context) {

        super(context);
    }

    @Override
    public String getName() {
        return "RCTAgora";
    }

    private IRtcEngineEventHandler mRtcEventHandler = new IRtcEngineEventHandler() {

        /**
         * 当获取用户uid的远程视频的回调
         */
        @Override
        public void onFirstRemoteVideoDecoded(final int uid, int width, int height, int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onFirstRemoteVideoDecoded");
                    map.putInt("uid", uid);
                    commonEvent(map);
                }
            });

        }

        /**
         * 加入频道成功的回调
         */
        @Override
        public void onJoinChannelSuccess(final String channel, final int uid, int elapsed) {

            Log.i("Agora", "加入房间成功---");

            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onJoinChannelSuccess");
                    map.putString("channel", channel);
                    map.putInt("uid", uid);
                    commonEvent(map);
                }
            });
        }

        /**
         * 其他用户加入当前频道
         */
        @Override
        public void onUserJoined(final int uid, int elapsed) {

            Log.i("Agora", "有人来了----");

            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onUserJoined");
                    map.putInt("uid", uid);
                    commonEvent(map);
                }
            });

        }

        /**
         * 错误信息
         */
        @Override
        public void onError(final int err) {
            Log.i("Agora", err + "错误---");
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onError");
                    map.putInt("err", err);
                    commonEvent(map);
                }
            });
        }

        /**
         * 警告
         */
        @Override
        public void onWarning(final int warn) {
            Log.i("Agora", warn + "警告---");
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onWarning");
                    map.putInt("warn", warn);
                    commonEvent(map);
                }
            });
        }

        /**
         * 退出频道
         */
        @Override
        public void onLeaveChannel(RtcStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onLeaveChannel");
                    commonEvent(map);
                }
            });
        }

        /**
         * 用户uid离线时的回调
         */
        @Override
        public void onUserOffline(final int uid, int reason) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onUserOffline");
                    map.putInt("uid", uid);
                    commonEvent(map);
                }
            });
        }
    };

    @ReactMethod
    public void init(ReadableMap options) {
        AgoraManager.getInstance().init(getReactApplicationContext(), mRtcEventHandler, options);
        AgoraManager.getInstance().setupLocalVideo().startPreview();
    }

    //进入房间
    @ReactMethod
    public void joinChannel(String channelName) {
        AgoraManager.getInstance().joinChannel(channelName);
    }

    //退出
    @ReactMethod
    public void leaveChannel() {
        AgoraManager.getInstance().leaveChannel();
    }

    //打开音频
    @ReactMethod
    public void enableAudio() {
        AgoraManager.getInstance().mRtcEngine.enableAudio();
    }

    //关闭音频
    @ReactMethod
    public void disableAudio() {
        AgoraManager.getInstance().mRtcEngine.disableAudio();
    }

    //打开视频
    @ReactMethod
    public void enableVideo() {
        AgoraManager.getInstance().mRtcEngine.enableVideo();
    }

    //关闭视频
    @ReactMethod
    public void disableVideo() {
        AgoraManager.getInstance().mRtcEngine.disableVideo();
    }

    //切换前置/后置摄像头
    @ReactMethod
    public void switchCamera() {
        AgoraManager.getInstance().mRtcEngine.switchCamera();
    }

    //打开扬声器
    @ReactMethod
    public void setEnableSpeakerphone(boolean enabled) {
        AgoraManager.getInstance().mRtcEngine.setEnableSpeakerphone(enabled);
    }

    //将自己静音
    @ReactMethod
    public void muteLocalAudioStream(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteLocalAudioStream(muted);
    }

    //静音所有远端音频
    @ReactMethod
    public void muteAllRemoteAudioStreams(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteAllRemoteAudioStreams(muted);
    }

    //静音指定用户音频
    @ReactMethod
    public void muteRemoteAudioStream(int uid, boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteRemoteAudioStream(uid, muted);
    }

    //禁用本地视频功能
    @ReactMethod
    public void enableLocalVideo(boolean enabled) {
        AgoraManager.getInstance().mRtcEngine.enableLocalVideo(enabled);
    }

    //暂停本地视频流
    @ReactMethod
    public void muteLocalVideoStream(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteLocalVideoStream(muted);
    }

    //暂停所有远端视频流
    @ReactMethod
    public void muteAllRemoteVideoStreams(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteAllRemoteVideoStreams(muted);
    }

    //暂停指定远端视频流
    @ReactMethod
    public void muteRemoteVideoStream(int uid, boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteRemoteVideoStream(uid, muted);
    }

    //销毁引擎实例
    @ReactMethod
    public void destroy() {
        RtcEngine.destroy();
    }

    //查询 SDK 版本号
    @ReactMethod
    public void getSdkVersion(Callback callback) {
        callback.invoke( RtcEngine.getSdkVersion());
    }

    private void commonEvent(WritableMap map) {
        sendEvent(getReactApplicationContext(), "agoraEvent", map);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}