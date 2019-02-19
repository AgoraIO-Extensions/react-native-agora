package com.syan.agora;

import android.view.SurfaceView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by DB on 2017/6/23.
 */

public class AgoraViewManage extends SimpleViewManager<AgoraVideoView> {

    public static final String REACT_CLASS = "RCTAgoraView";

    public SurfaceView surfaceView;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected AgoraVideoView createViewInstance(ThemedReactContext reactContext) {
        return new AgoraVideoView(reactContext);
    }

    @ReactProp(name = "showLocalVideo")
    public void setShowLocalVideo(final AgoraVideoView agoraVideoView, boolean showLocalVideo) {

        AgoraManager.getInstance().setupLocalVideo();
        surfaceView = AgoraManager.getInstance().getLocalSurfaceView();
        //surfaceView.setVisibility(View.VISIBLE);
        agoraVideoView.addView(surfaceView);
//        surfaceView.setZOrderMediaOverlay(true);

    }

    @ReactProp(name = "zOrderMediaOverlay")
    public void setZOrderMediaOverlay(final AgoraVideoView agoraVideoView, boolean zOrderMediaOverlay) {
        surfaceView.setZOrderMediaOverlay(zOrderMediaOverlay);
    }

    @ReactProp(name = "remoteUid")
    public void setRemoteUid(final AgoraVideoView agoraVideoView, final int remoteUid) {
        AgoraManager.getInstance().setupRemoteVideo(remoteUid);
        surfaceView = AgoraManager.getInstance().getSurfaceView(remoteUid);
        //surfaceView.setVisibility(View.VISIBLE);
        agoraVideoView.addView(surfaceView);
//        surfaceView.setZOrderMediaOverlay(true);
    }
}
