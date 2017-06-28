package com.syan.agora;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import io.agora.rtc.IRtcEngineEventHandler;

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
        public void onJoinChannelSuccess(final String channel,final int uid, int elapsed) {

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

        }

        /**
         * 用户uid离线时的回调
         */
        @Override
        public void onUserOffline(int uid, int reason) {

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