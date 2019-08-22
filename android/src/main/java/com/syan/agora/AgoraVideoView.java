package com.syan.agora;

import android.content.Context;
import android.media.MediaCodec;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.media.MediaFormat;
import android.media.MediaMuxer;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;

import com.syan.agora.media.MediaDataAudioObserver;
import com.syan.agora.media.MediaDataVideoObserver;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static android.media.MediaCodecInfo.CodecCapabilities.COLOR_FormatYUV420SemiPlanar;
import static android.media.MediaFormat.KEY_BIT_RATE;
import static android.media.MediaFormat.KEY_COLOR_FORMAT;
import static android.media.MediaFormat.KEY_FRAME_RATE;
import static android.media.MediaFormat.KEY_I_FRAME_INTERVAL;

/**
 * Created by DB on 2017/6/27.
 */

public class AgoraVideoView extends LinearLayout implements MediaDataAudioObserver, MediaDataVideoObserver {

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

    @Override
    public void onRecordAudioFrame(byte[] data, int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength) {

    }

    @Override
    public void onPlaybackAudioFrame(byte[] data, int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength) {

    }

    @Override
    public void onPlaybackAudioFrameBeforeMixing(int uid, byte[] data, int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength) {

    }

    @Override
    public void onMixedAudioFrame(byte[] data, int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength) {

    }

    @Override
    public void onCaptureVideoFrame(byte[] data, int frameType, int width, int height, int bufferLength, int yStride, int uStride, int vStride, int rotation, long renderTimeMs) {

    }

    @Override
    public void onRenderVideoFrame(int uid, byte[] data, int frameType, int width, int height, int bufferLength, int yStride, int uStride, int vStride, int rotation, long renderTimeMs) {

    }
}
