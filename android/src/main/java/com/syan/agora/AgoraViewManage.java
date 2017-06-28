package com.syan.agora;

import android.view.SurfaceView;
import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by DB on 2017/6/23.
 */

public class AgoraViewManage extends SimpleViewManager<AgoraVideoView> {

    ThemedReactContext context;

    private AgoraVideoView agoraVideoView;

    @Override
    public String getName() {
        return "AgoraView";
    }

    @Override
    protected AgoraVideoView createViewInstance(ThemedReactContext reactContext) {
        this.context = reactContext;

        agoraVideoView = new AgoraVideoView(reactContext);

        return agoraVideoView;
    }

    @ReactProp(name = "localUid")
    public void setLocalUid(final AgoraVideoView agoraVideoView, int localUid) {

        if (localUid == 0) {
            SurfaceView surfaceView = AgoraManager.getInstance().getLocalSurfaceView();
            surfaceView.setZOrderMediaOverlay(true);
            surfaceView.setVisibility(View.VISIBLE);
            agoraVideoView.addView(surfaceView);
        }

    }

    @ReactProp(name = "remoteUid")
    public void setRemoteUid(final AgoraVideoView agoraVideoView, int remoteUid) {

        if (remoteUid != 0) {
            AgoraManager.getInstance().setupRemoteVideo(remoteUid);
            SurfaceView surfaceView = AgoraManager.getInstance().getSurfaceView(remoteUid);
            surfaceView.setZOrderMediaOverlay(true);
            surfaceView.setVisibility(View.VISIBLE);
            agoraVideoView.addView(surfaceView);
        }
    }
}
