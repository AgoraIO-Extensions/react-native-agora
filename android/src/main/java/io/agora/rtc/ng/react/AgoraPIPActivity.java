package io.agora.rtc.ng.react;

import android.app.PictureInPictureParams;
import android.app.PictureInPictureUiState;
import android.content.Context;
import android.content.res.Configuration;
import android.os.Build;

import com.facebook.react.ReactActivity;

import java.lang.ref.WeakReference;

import io.agora.pip.AgoraPIPActivityProxy;
import io.agora.pip.AgoraPIPActivityListener;

public class AgoraPIPActivity extends ReactActivity implements AgoraPIPActivityProxy {
  private WeakReference<AgoraPIPActivityListener> mListener;

  @Override
  public Context getApplicationContext() {
    return super.getApplicationContext();
  }

  @Override
  public void setAgoraPIPActivityListener(AgoraPIPActivityListener listener) {
    mListener = new WeakReference<>(listener);
  }

  @Override
  public boolean isInPictureInPictureMode() {
    return super.isInPictureInPictureMode();
  }

  @Override
  public void setPictureInPictureParams(PictureInPictureParams params) {
    super.setPictureInPictureParams(params);
  }

  @Override
  public boolean enterPictureInPictureMode(PictureInPictureParams params) {
    return super.enterPictureInPictureMode(params);
  }

  @Override
  public void enterPictureInPictureMode() {
    super.enterPictureInPictureMode();
  }

  @Override
  public boolean moveTaskToBack(boolean nonRoot) {
    return super.moveTaskToBack(nonRoot);
  }

  @Override
  public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode, Configuration newConfig) {
    super.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
    if (mListener == null) {
      return;
    }

    AgoraPIPActivityListener listener = mListener.get();
    if (listener != null) {
      listener.onPictureInPictureModeChanged(isInPictureInPictureMode, newConfig);
    }
  }

  @Override
  public boolean onPictureInPictureRequested() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      if (mListener != null) {
        AgoraPIPActivityListener listener = mListener.get();
        if (listener != null) {
          return listener.onPictureInPictureRequested();
        }
      }
      return super.onPictureInPictureRequested();
    }
    return false;
  }

  @Override
  public void onPictureInPictureUiStateChanged(PictureInPictureUiState state) {
    super.onPictureInPictureUiStateChanged(state);
    if (mListener == null) {
      return;
    }

    AgoraPIPActivityListener listener = mListener.get();
    if (listener != null) {
      listener.onPictureInPictureUiStateChanged(state);
    }
  }

  @Override
  public void onUserLeaveHint() {
    super.onUserLeaveHint();
    if (mListener == null) {
      return;
    }

    AgoraPIPActivityListener listener = mListener.get();
    if (listener != null) {
      listener.onUserLeaveHint();
    }
  }

}
