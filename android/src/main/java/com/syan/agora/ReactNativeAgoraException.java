package com.syan.agora;

public class ReactNativeAgoraException extends Exception {

    private int code;

    public ReactNativeAgoraException(String message, final int code) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

}
