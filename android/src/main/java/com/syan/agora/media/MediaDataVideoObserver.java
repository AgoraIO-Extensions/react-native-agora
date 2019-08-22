package com.syan.agora.media;

public interface MediaDataVideoObserver {

    void onCaptureVideoFrame(byte[] data, int frameType, int width, int height, int bufferLength, int yStride, int uStride, int vStride, int rotation, long renderTimeMs);

    void onRenderVideoFrame(int uid, byte[] data, int frameType, int width, int height, int bufferLength, int yStride, int uStride, int vStride, int rotation, long renderTimeMs);
}