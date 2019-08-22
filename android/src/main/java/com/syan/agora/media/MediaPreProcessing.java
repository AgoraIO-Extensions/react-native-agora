package com.syan.agora.media;

import java.nio.ByteBuffer;

public class MediaPreProcessing {
    static {
        System.loadLibrary("apm-plugin-raw-data-api-java");
    }

    public interface ProgressCallback {
        void onCaptureVideoFrame(int videoFrameType, int width, int height, int bufferLength, int yStride, int uStride, int vStride, int rotation, long renderTimeMs);

        void onRenderVideoFrame(int uid, int videoFrameType, int width, int height, int bufferLength, int yStride, int uStride, int vStride, int rotation, long renderTimeMs);

        void onRecordAudioFrame(int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength);

        void onPlaybackAudioFrame(int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength);

        void onPlaybackAudioFrameBeforeMixing(int uid, int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength);

        void onMixedAudioFrame(int audioFrameType, int samples, int bytesPerSample, int channels, int samplesPerSec, long renderTimeMs, int bufferLength);
    }

    public static native void setCallback(ProgressCallback callback);

    public static native void setVideoCaptureByteBuffer(ByteBuffer byteBuffer);

    public static native void setAudioRecordByteBuffer(ByteBuffer byteBuffer);

    public static native void setAudioPlayByteBuffer(ByteBuffer byteBuffer);

    public static native void setBeforeAudioMixByteBuffer(ByteBuffer byteBuffer);

    public static native void setAudioMixByteBuffer(ByteBuffer byteBuffer);

    public static native void setVideoDecodeByteBuffer(int uid, ByteBuffer byteBuffer);

    public static native void releasePoint();
}