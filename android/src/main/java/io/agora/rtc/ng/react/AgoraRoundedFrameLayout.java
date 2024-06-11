package io.agora.rtc.ng.react;

import android.view.SurfaceView;
import android.widget.FrameLayout;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Path;
import android.util.AttributeSet;

public class AgoraRoundedFrameLayout extends FrameLayout {
    private float borderRadius = 0;

    public AgoraRoundedFrameLayout(Context context) {
        super(context);
        setWillNotDraw(false);
    }

    public AgoraRoundedFrameLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        setWillNotDraw(false);
    }

    public AgoraRoundedFrameLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        setWillNotDraw(false);
    }

    @Override
    protected void dispatchDraw(Canvas canvas) {

        int saveCount = canvas.save();

        Path path = new Path();
        float[] radii = {borderRadius, borderRadius, borderRadius, borderRadius, borderRadius, borderRadius, borderRadius, borderRadius};
        path.addRoundRect(0, 0, getWidth(), getHeight(), radii, Path.Direction.CW);
        canvas.clipPath(path);

        super.dispatchDraw(canvas);

        canvas.restoreToCount(saveCount);
    }

    public void setBorderRadius(float radius) {
        if (borderRadius != radius) {
            borderRadius = radius;
            invalidate();
            requestLayout();
        }
    }
}
