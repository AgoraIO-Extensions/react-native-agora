package com.syan.agora;

import android.content.Context;
import android.widget.RelativeLayout;

import com.facebook.react.uimanager.ThemedReactContext;

/**
 * Created by DB on 2017/6/27.
 */

public class AgoraVideoView extends RelativeLayout {

    Context context;

    public AgoraVideoView(ThemedReactContext context) {
        super(context);

        this.context = context;

    }

}
