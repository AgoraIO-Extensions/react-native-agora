package com.syan.agora;

import android.content.Context;
import android.support.v7.widget.LinearLayoutCompat;
import android.util.Log;
import android.util.SparseArray;
import android.view.SurfaceView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import io.agora.rtc.IMetadataObserver;
import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;
import io.agora.rtc.video.BeautyOptions;
import io.agora.rtc.video.VideoCanvas;
import io.agora.rtc.video.VideoEncoderConfiguration;

import static io.agora.rtc.video.VideoEncoderConfiguration.*;


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

    private FRAME_RATE getVideoEncoderEnum (int val) {
        FRAME_RATE type = FRAME_RATE.FRAME_RATE_FPS_1;
        switch (val) {
            case 1:
                type = FRAME_RATE.FRAME_RATE_FPS_1;
            case 7:
                type = FRAME_RATE.FRAME_RATE_FPS_7;
            case 10:
                type = FRAME_RATE.FRAME_RATE_FPS_10;
            case 15:
                type = FRAME_RATE.FRAME_RATE_FPS_15;
            case 24:
                type = FRAME_RATE.FRAME_RATE_FPS_24;
            case 30:
                type = FRAME_RATE.FRAME_RATE_FPS_30;
        }
        return type;
    }

    private ORIENTATION_MODE getOrientationModeEnum (int val) {
        ORIENTATION_MODE type = ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE;
        switch (val) {
            case 0:
                type = ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE;
            case 1:
                type = ORIENTATION_MODE.ORIENTATION_MODE_FIXED_LANDSCAPE;
            case 2:
                type = ORIENTATION_MODE.ORIENTATION_MODE_FIXED_PORTRAIT;
        }
        return type;
    }

    /**
     * initialize rtc engine
     */
    public int init(Context context, IRtcEngineEventHandler mRtcEventHandler, ReadableMap options) {
        //create rtcEngine instance and setup rtcEngine eventHandler
        try {
            this.context = context;
            this.mRtcEngine = RtcEngine.create(context, options.getString("appid"), mRtcEventHandler);
            if (options.hasKey("secret") && null != options.getString("secret")) {
                mRtcEngine.setEncryptionSecret(options.getString("secret"));
                if (options.hasKey("secretMode") && null != options.getString("secretMode")) {
                    mRtcEngine.setEncryptionMode(options.getString("secretMode"));
                }
            }
            if (options.hasKey("channelProfile")) {
                mRtcEngine.setChannelProfile(options.getInt("channelProfile"));
            }
            if (options.hasKey("dualStream")) {
                mRtcEngine.enableDualStreamMode(options.getBoolean("dualStream"));
            }
            if (options.hasKey("mode")) {
                Integer mode = options.getInt("mode");
                switch (mode) {
                    case 0: {
                        mRtcEngine.enableAudio();
                        mRtcEngine.disableVideo();
                        break;
                    }
                    case 1: {
                        mRtcEngine.enableVideo();
                        mRtcEngine.disableAudio();
                        break;
                    }
                }
            } else {
                mRtcEngine.enableVideo();
                mRtcEngine.enableAudio();
            }

            if (options.hasKey("beauty") && null != options.getMap("beauty")) {
                ReadableMap beauty = options.getMap("beauty");
                BeautyOptions beautyOption = new BeautyOptions();
                beautyOption.lighteningContrastLevel = beauty.getInt("lighteningContrastLevel");
                beautyOption.lighteningLevel = (float) beauty.getDouble("lighteningLevel");
                beautyOption.smoothnessLevel = (float) beauty.getDouble("smoothnessLevel");
                beautyOption.rednessLevel = (float) beauty.getDouble("rednessLevel");
                mRtcEngine.setBeautyEffectOptions(true, beautyOption);
            }

            if (options.hasKey("voice") && null != options.getMap("voice")) {
                ReadableMap voice = options.getMap("voice");
                final String voiceType = voice.getString("type");
                final Integer voiceValue = voice.getInt("value");
                if (voiceType.equals("changer")) {
                    mRtcEngine.setLocalVoiceChanger(voiceValue);
                }
                if (voiceType.equals("reverbPreset")) {
                    mRtcEngine.setLocalVoiceReverbPreset(voiceValue);
                }
            }

            if (options.hasKey("videoEncoderConfig") && null != options.getMap("videoEncoderConfig")) {
                ReadableMap config = options.getMap("videoEncoderConfig");
                VideoEncoderConfiguration encoderConfig = new VideoEncoderConfiguration(
                        config.getInt("width"),
                        config.getInt("height"),
                        getVideoEncoderEnum(config.getInt("frameRate")),
                        config.getInt("bitrate"),
                        getOrientationModeEnum(config.getInt("orientationMode"))
                );
                mRtcEngine.setVideoEncoderConfiguration(encoderConfig);
            }

            if (options.hasKey("audioProfile") &&
                options.hasKey("audioScenario")) {
                mRtcEngine.setAudioProfile(options.getInt("audioProfile"), options.getInt("audioScenario"));
            }

            if (options.hasKey("clientRole")) {
                mRtcEngine.setClientRole(options.getInt("clientRole"));
            }
            return mRtcEngine.enableWebSdkInteroperability(true);
        } catch (Exception e) {
            throw new RuntimeException("create rtc engine failed\n" + Log.getStackTraceString(e));
        }
    }

    /**
     * setupLocalVideo will render video from local side capture into ui layout
     */
    public int setupLocalVideo(Integer mode) {
        SurfaceView surfaceView = RtcEngine.CreateRendererView(context);
        mSurfaceViews.put(mLocalUid, surfaceView);
        return mRtcEngine.setupLocalVideo(new VideoCanvas(surfaceView, mode, mLocalUid));
    }

    /**
     * setupRemoteVideo will render video from remote side capture into ui layout
     */
    public int setupRemoteVideo(final int uid, final Integer mode) {
        SurfaceView surfaceView = RtcEngine.CreateRendererView(context);
        mSurfaceViews.put(uid, surfaceView);
        return mRtcEngine.setupRemoteVideo(new VideoCanvas(surfaceView, mode, uid));
    }

    /**
     * set local video render mode
     * @param Integer renderMode
     * @return result state
     */
    public int setLocalRenderMode(final Integer renderMode) {
        return mRtcEngine.setLocalRenderMode(renderMode);
    }

    /**
     * set remote video render mode
     * @param Integer uid
     * @param Integer renderMode
     * @return result state
     */
    public int setRemoteRenderMode(final Integer uid, final Integer renderMode) {
        return mRtcEngine.setRemoteRenderMode(uid, renderMode);
    }

    public int setEnableSpeakerphone(boolean enabled) {
        return mRtcEngine.setEnableSpeakerphone(enabled);
    }

    public int setDefaultAudioRouteToSpeakerphone(boolean enabled) {
        return mRtcEngine.setDefaultAudioRoutetoSpeakerphone(enabled);
    }

    public int renewToken(String token) {
        return mRtcEngine.renewToken(token);
    }

    public int setClientRole(int role) {
        return mRtcEngine.setClientRole(role);
    }

    public int enableWebSdkInteroperability(boolean enabled) {
        return mRtcEngine.enableWebSdkInteroperability(enabled);
    }

    public int getConnectionState() {
        return mRtcEngine.getConnectionState();
    }
    public int joinChannel(ReadableMap options) {
        String token = options.hasKey("token") ? options.getString("token") : null;
        String channelName = options.hasKey("channelName") ? options.getString("channelName") : null;
        String optionalInfo = options.hasKey("optionalInfo") ? options.getString("optionalInfo") : null;
        int uid = options.hasKey("uid") ? options.getInt("uid") : 0;
        this.mLocalUid = uid;
        return mRtcEngine.joinChannel(token, channelName, optionalInfo, uid);
    }

    public int enableLastmileTest() {
        return mRtcEngine.enableLastmileTest();
    }

    public int disableLastmileTest() {
        return mRtcEngine.disableLastmileTest();
    }

    public void startPreview() {
        mRtcEngine.startPreview();
    }

    public void stopPreview() {
        mRtcEngine.stopPreview();
    }

    public int leaveChannel() {
        return mRtcEngine.leaveChannel();
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
