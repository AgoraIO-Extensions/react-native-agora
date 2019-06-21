package com.syan.agora;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.nio.charset.Charset;

import io.agora.rtc.IMetadataObserver;

public class MediaObserver implements IMetadataObserver {

    private static final Integer MAX_DATA_LENGT = 1024;

    private ReactContext reactCtx;

    public byte[] getMetadata() {
        return metadata;
    }

    public void setMetadata(byte[] metadata) {
        this.metadata = metadata;
    }

    private byte[] metadata = null;

    public MediaObserver(ReactContext reactCtx) {
        this.reactCtx = reactCtx;
    }

    @Override
    public int getMaxMetadataSize() {
        return MAX_DATA_LENGT;
    }

    @Override
    public byte[] onReadyToSendMetadata(long timeStampMs) {
        if (metadata == null) {
            return null;
        }
        byte[] toSend = metadata;
        if (toSend.length > MAX_DATA_LENGT) {
            return null;
        }
        metadata = null;
        return toSend;
    }

    @Override
    public void onMetadataReceived(byte[] buffer, int uid, long timeStampMs) {
        WritableMap map = Arguments.createMap();
        map.putString("data", new String(buffer, Charset.forName("UTF-8")));
        map.putString("uid", Integer.toString(uid));
        map.putString("ts", Long.toString(timeStampMs));
        reactCtx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("mediaMetaDataReceived", map);
    }
}
