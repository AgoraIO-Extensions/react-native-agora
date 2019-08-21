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

    private static final String VCODEC_MIME = "video/avc";

    private String audioFilePath;
    private String videoFilePath;

    private Future<Void> audioFuture = null;
    private Future<Void> videoFuture = null;
    private int colorFormat;
    private MediaCodec vencoder;

    private ExecutorService executor = Executors.newSingleThreadExecutor();

    public void setAudioFilePath(String path) {
        audioFilePath = path;
    }

    public void setVideoFilePath(String path) {
        videoFilePath = path;
    }

    private static MediaCodecInfo selectCodec(String mimeType) {
        int numCodecs = MediaCodecList.getCodecCount();
        for (int i = 0; i < numCodecs; i++) {
            MediaCodecInfo codecInfo = MediaCodecList.getCodecInfoAt(i);

            if (!codecInfo.isEncoder()) {
                continue;
            }
            String[] types = codecInfo.getSupportedTypes();
            for (int j = 0; j < types.length; j++) {
                if (types[j].equalsIgnoreCase(mimeType)) {
                    return codecInfo;
                }
            }
        }
        return null;
    }

    private void logColorFormatName(int format) {
        switch (format) {
            case MediaCodecInfo.CodecCapabilities.COLOR_FormatYUV420Flexible:
                Log.d("video", "COLOR_FormatYUV420Flexible");
                break;
            case MediaCodecInfo.CodecCapabilities.COLOR_FormatYUV420PackedPlanar:
                Log.d("video", "COLOR_FormatYUV420PackedPlanar");
                break;
            case MediaCodecInfo.CodecCapabilities.COLOR_FormatYUV420Planar:
                Log.d("video", "COLOR_FormatYUV420Planar");
                break;
            case MediaCodecInfo.CodecCapabilities.COLOR_FormatYUV420PackedSemiPlanar:
                Log.d("video", "COLOR_FormatYUV420PackedSemiPlanar");
                break;
            case COLOR_FormatYUV420SemiPlanar:
                Log.d("video", "COLOR_FormatYUV420SemiPlanar");
                break;
        }
    }


    private int getColorFormat(MediaCodecInfo mediaCodecInfo) {
        int matchedFormat = 0;
        MediaCodecInfo.CodecCapabilities codecCapabilities =
                mediaCodecInfo.getCapabilitiesForType(VCODEC_MIME);
        for (int i = 0; i < codecCapabilities.colorFormats.length; i++) {
            int format = codecCapabilities.colorFormats[i];
            if (format >= codecCapabilities.COLOR_FormatYUV420Planar &&
                    format <= codecCapabilities.COLOR_FormatYUV420PackedSemiPlanar) {
                if (format >= matchedFormat) {
                    matchedFormat = format;
                    logColorFormatName(format);
                    break;
                }
            }
        }
        return matchedFormat;
    }


    private void initVideoEncoder() {
        MediaCodecInfo mediaCodecInfo = selectCodec(VCODEC_MIME);
        colorFormat = getColorFormat(mediaCodecInfo);

        String TAG = remoteUid.toString();
        try {
            vencoder = MediaCodec.createByCodecName(mediaCodecInfo.getName());
            Log.d(TAG, "编码器:" + mediaCodecInfo.getName() + "创建完成!");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("vencodec初始化失败！", e);
        }
        MediaFormat mediaFormat = MediaFormat
                .createVideoFormat(MediaFormat.MIMETYPE_VIDEO_AVC, this.getWidth(), this.getHeight());
        mediaFormat.setInteger(MediaFormat.KEY_MAX_INPUT_SIZE, 0);
        mediaFormat.setInteger(KEY_BIT_RATE, 300 * 1000);
        mediaFormat.setInteger(KEY_COLOR_FORMAT, colorFormat);
        mediaFormat.setInteger(KEY_FRAME_RATE, 30);
        mediaFormat.setInteger(KEY_I_FRAME_INTERVAL, 5);
        vencoder.configure(mediaFormat, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE);
        vencoder.start();
    }

    private MediaMuxer vmuxer = null;

    private int videoTrackIndex;

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
    public void startMuxerVideo () {
        try {
            vmuxer = new MediaMuxer(videoFilePath,
                    MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
            videoTrackIndex = vmuxer.addTrack(vencoder.getOutputFormat());
            vmuxer.start();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
