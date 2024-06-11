package io.agora.rtc.ng.react;

import android.view.SurfaceView;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.util.AttributeSet;

public class RoundedFrameLayout extends FrameLayout {
    private float cornerRadius = 18; 
  
    public RoundedFrameLayout(Context context) {
        super(context);
    }
  
    public RoundedFrameLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }
  
    public RoundedFrameLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }
  
    @Override
    protected void dispatchDraw(Canvas canvas) {
        Path path = new Path();
        float[] radii = {cornerRadius, cornerRadius, cornerRadius, cornerRadius, cornerRadius, cornerRadius, cornerRadius, cornerRadius};
        path.addRoundRect(0, 0, getWidth(), getHeight(), radii, Path.Direction.CW);
        canvas.clipPath(path);
        super.dispatchDraw(canvas);
    }

    public void setCornerRadius(float radius) {
        cornerRadius = radius;
        invalidate(); 
    }
  }
  