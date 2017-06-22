package com.syan.agora;

import android.content.Context;
import android.os.Handler;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.views.view.ReactViewGroup;

import io.agora.rtc.Constants;
import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;
import io.agora.rtc.video.VideoCanvas;

public class AgoraModule extends ReactContextBaseJavaModule {

    private RtcEngine mRtcEngine;

    private Context mContext;

    private static ReactApplicationContext mRAC;

    private IRtcEngineEventHandler mRtcEventHandler = new IRtcEngineEventHandler() {

        /**
         * 当获取用户uid的远程视频的回调
         */
        @Override
        public void onFirstRemoteVideoDecoded(final int uid, int width, int height, int elapsed) {
//            runOnUiThread(new Runnable() {
//                @Override
//                public void run() {
//                    mRAC
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit("onFirstRemoteVideoDecoded", uid);
//                }
//            });

            new Handler().post(new Runnable() {
                @Override
                public void run() {
                    mRAC.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onFirstRemoteVideoDecoded", uid);
                }
            });



        }

        /**
         * 加入频道成功的回调
         */
        @Override
        public void onJoinChannelSuccess(String channel,final int uid, int elapsed) {

            Log.i("Agora", "加入房间成功---");
            mRAC
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("onJoinChannelSuccess",uid);

//            new Handler().post(new Runnable() {
//                @Override
//                public void run() {
//                    mRAC
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit("onJoinChannelSuccess",uid);
//                }
//            });


        }

        /**
         * 其他用户加入当前频道
         */
        @Override
        public void onUserJoined(final int uid, int elapsed) {

            Log.i("Agora", "有人来了----");

            new Handler().post(new Runnable() {
                @Override
                public void run() {
                    mRAC
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("onUserJoined", uid);
                }
            });

        }

        /**
         * 错误信息
         */
        @Override
        public void onError(int err) {
            Log.i("Agora", err + "错误---");
        }

        /**
         * 警告
         */
        @Override
        public void onWarning(int warn) {
            Log.i("Agora", warn + "警告---");
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

        mContext = getCurrentActivity();
        mRAC = getReactApplicationContext();

        mRtcEngine = RtcEngine.create(mContext, options.getString("appid"), mRtcEventHandler);
        mRtcEngine.enableVideo();
//        mRtcEngine.setChannelProfile(options.getInt("channelProfile"));
//        mRtcEngine.setVideoProfile(options.getInt("videoProfile"), true);

        mRtcEngine.enableWebSdkInteroperability(true);
        mRtcEngine.setVideoProfile(Constants.VIDEO_PROFILE_360P, false);
        mRtcEngine.setChannelProfile(Constants.CHANNEL_PROFILE_LIVE_BROADCASTING);

        mRtcEngine.joinChannel(null, options.getString("channelName"), options.getString("info"), 0);



    }

    @ReactMethod
    public void setupLocalVideo(final int uid, final int tag) {

        final UIManagerModule uiManager = getReactApplicationContext().getNativeModule
                (UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {

                ReactViewGroup dView = (ReactViewGroup)nativeViewHierarchyManager.resolveView(tag);

                Log.i("Agora", dView.getWidth() + "dView");
                Log.i("Agora", dView.getHeight() + "dView");

                SurfaceView surfaceView = RtcEngine.CreateRendererView(getReactApplicationContext());

                Log.i("Agora", surfaceView.getWidth() + "surfaceView");
                Log.i("Agora", getReactApplicationContext().toString());
                Log.i("Agora", surfaceView.toString());

                dView.addView(surfaceView);

                mRtcEngine.setupLocalVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_HIDDEN, uid));
                mRtcEngine.startPreview();

            }
        });
    }


    @ReactMethod
    public void setupRemoteVideo(final int uid, final int tag) {

        final UIManagerModule uiManager = getReactApplicationContext().getNativeModule
                (UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {

                View dView = nativeViewHierarchyManager.resolveView(tag);

                SurfaceView surfaceView = RtcEngine.CreateRendererView(dView.getContext());

//                ViewGroup gView = (ViewGroup) dView;
//                gView.addView(surfaceView);

//                Log.i("Agora", surfaceView.getWidth() + "");
//                Log.i("Agora", uid+"---"+tag);
//
                mRtcEngine.setupRemoteVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_HIDDEN, uid));

            }
        });
    }
}

//                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
//                surfaceView.setZOrderOnTop(false);
//                surfaceView.setZOrderMediaOverlay(false);

//                int w = dView.getWidth();
//                int h = dView.getHeight();
//                surfaceView.measure(w, h);
//                int height =surfaceView.getMeasuredHeight();

//                ViewGroup.LayoutParams params = (ViewGroup.LayoutParams) surfaceView.getLayoutParams();
//                params.width = 120;
//                params.height = 120;
//                surfaceView.setLayoutParams(params);

//                Log.i("Agora", surfaceView.getWidth() + "surfaceView");
//                Log.i("Agora", uid+"---"+tag);

//                ViewGroup gView = (ViewGroup) dView;
//                Log.i("Agora", gView.getWidth() + "gView");
//                Log.i("Agora", gView.getHeight() + "gView");
//
//                gView.addView(surfaceView);
//Button button = new Button(dView.getContext());
//button.setText("123");
//
//        dView.addView(button);
//                ArrayList<View> list = new ArrayList<>();
//                list.add(surfaceView);
//                dView.addChildrenForAccessibility(list);