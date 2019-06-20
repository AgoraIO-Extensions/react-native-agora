package com.syan.agora;

import android.content.Context;
import android.util.AttributeSet;
import android.view.SurfaceView;
import android.view.View;
import android.widget.LinearLayout;

import io.agora.rtc.mediaio.AgoraSurfaceView;

/**
 * Created by DB on 2017/6/27.
 */

public class AgoraVideoView extends LinearLayout {
    public boolean isShowLocalVideo() {
        return showLocalVideo;
    }

    public void setShowLocalVideo(boolean showLocalVideo) {
        this.showLocalVideo = showLocalVideo;
    }

    public Integer getRenderMode() {
        return renderMode;
    }

    public void setRenderMode(Integer renderMode) {
        this.renderMode = renderMode;

    }

    public Integer getRemoteUid() {
        return remoteUid;
    }

    public void setRemoteUid(Integer remoteUid) {
        this.remoteUid = remoteUid;
    }

    public boolean getZOrderMediaOverlay() {
        return zOrderMediaOverlay;
    }

    public void setZOrderMediaOverlay(boolean zOrderMediaOverlay) {
        this.zOrderMediaOverlay = zOrderMediaOverlay;
    }

    private boolean showLocalVideo;
    private Integer renderMode = 1;
    private Integer remoteUid;
    private boolean zOrderMediaOverlay;
    private SurfaceView surfaceView;

    public AgoraVideoView(Context context) {
        super(context);
    }

    public AgoraVideoView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }


    public AgoraVideoView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    protected void onVisibilityChanged(View changedView, int visibility) {
        super.onVisibilityChanged(changedView, visibility);
        if (changedView == this) {
            if (null != remoteUid) {
                AgoraManager.getInstance().setRemoteRenderMode(remoteUid, renderMode);
            } else {
                AgoraManager.getInstance().setLocalRenderMode(renderMode);
            }
        }
    }
}
