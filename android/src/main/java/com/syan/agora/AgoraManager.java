package com.syan.agora;

import android.content.Context;
import android.util.Log;
import android.util.SparseArray;
import android.view.SurfaceView;

import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;
import io.agora.rtc.video.VideoCanvas;

/**
 * Created by Leon on 2017/4/9.
 */

public class AgoraManager {

    public static AgoraManager sAgoraManager;

    public RtcEngine mRtcEngine;

    private Context context;

    private int mLocalUid = 0;

    private AgoraManager() {
        mSurfaceViews = new SparseArray<SurfaceView>();
    }

    private SparseArray<SurfaceView> mSurfaceViews;

    public static AgoraManager getInstance() {
        if (sAgoraManager == null) {
            synchronized (AgoraManager.class) {
                if (sAgoraManager == null) {
                    sAgoraManager = new AgoraManager();
                }
            }
        }
        return sAgoraManager;
    }

    /**
     * 初始化RtcEngine
     */
    public void init(Context context, IRtcEngineEventHandler mRtcEventHandler, ReadableMap options) {
        this.context = context;

        //创建RtcEngine对象，mRtcEventHandler为RtcEngine的回调
        try {
            mRtcEngine = RtcEngine.create(context, options.getString("appid"), mRtcEventHandler);

        } catch (Exception e) {
            throw new RuntimeException("NEED TO check rtc sdk init fatal error\n" + Log.getStackTraceString(e));
        }
        //开启视频功能
        mRtcEngine.enableVideo();
        mRtcEngine.setVideoProfile(options.getInt("videoProfile"), options.getBoolean("swapWidthAndHeight")); //视频配置，
        mRtcEngine.enableWebSdkInteroperability(true);  //设置和web通信
        mRtcEngine.setChannelProfile(options.getInt("channelProfile")); //设置模式
        mRtcEngine.setClientRole(options.getInt("clientRole"), null); //设置角色
    }

    /**
     * 设置本地视频，即前置摄像头预览
     */
    public AgoraManager setupLocalVideo() {
        //创建一个SurfaceView用作视频预览
        SurfaceView surfaceView = RtcEngine.CreateRendererView(context);
        //将SurfaceView保存起来在SparseArray中，后续会将其加入界面。key为视频的用户id，这里是本地视频, 默认id是0

        mSurfaceViews.put(mLocalUid, surfaceView);

        //设置本地视频，渲染模式选择VideoCanvas.RENDER_MODE_HIDDEN，如果选其他模式会出现视频不会填充满整个SurfaceView的情况，
        //具体渲染模式参考官方文档https://docs.agora.io/cn/user_guide/API/android_api.html#set-local-video-view-setuplocalvideo
        mRtcEngine.setupLocalVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_HIDDEN, mLocalUid));
        return this;//返回AgoraManager以作链式调用
    }

    public AgoraManager setupRemoteVideo(int uid) {

        SurfaceView surfaceView = RtcEngine.CreateRendererView(context);
        mSurfaceViews.put(uid, surfaceView);
        mRtcEngine.setupRemoteVideo(new VideoCanvas(surfaceView, VideoCanvas.RENDER_MODE_HIDDEN, uid));
        return this;
    }

    public AgoraManager joinChannel(String channel, int uid) {
        mRtcEngine.joinChannel(null, channel, null, uid);
        return this;
    }

    public void startPreview() {
        mRtcEngine.startPreview();
    }

    public void stopPreview() {
        mRtcEngine.stopPreview();
    }

    public void leaveChannel() {
        mRtcEngine.leaveChannel();
    }

    public void removeSurfaceView(int uid) {
        mSurfaceViews.remove(uid);
    }

    public List<SurfaceView> getSurfaceViews() {
        List<SurfaceView> list = new ArrayList<SurfaceView>();
        for (int i = 0; i < mSurfaceViews.size(); i++) {
            SurfaceView surfaceView = mSurfaceViews.valueAt(i);
            list.add(surfaceView);
        }
        return list;
    }

    public SurfaceView getLocalSurfaceView() {
        return mSurfaceViews.get(mLocalUid);
    }

    public SurfaceView getSurfaceView(int uid) {
        return mSurfaceViews.get(uid);
    }


}