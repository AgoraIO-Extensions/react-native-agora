import {
  IAudioFrameObserverBase,
  IAudioFrameObserver,
  IAudioSpectrumObserver,
  IVideoEncodedFrameObserver,
  IVideoFrameObserver,
  IMediaRecorderObserver,
} from '../AgoraMediaBase';

export function processIAudioFrameObserverBase(
  handler: IAudioFrameObserverBase,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onRecordAudioFrame':
      if (handler.onRecordAudioFrame !== undefined) {
        handler.onRecordAudioFrame(jsonParams.channelId, jsonParams.audioFrame);
      }
      break;

    case 'onPlaybackAudioFrame':
      if (handler.onPlaybackAudioFrame !== undefined) {
        handler.onPlaybackAudioFrame(
          jsonParams.channelId,
          jsonParams.audioFrame
        );
      }
      break;

    case 'onMixedAudioFrame':
      if (handler.onMixedAudioFrame !== undefined) {
        handler.onMixedAudioFrame(jsonParams.channelId, jsonParams.audioFrame);
      }
      break;

    case 'onEarMonitoringAudioFrame':
      if (handler.onEarMonitoringAudioFrame !== undefined) {
        handler.onEarMonitoringAudioFrame(jsonParams.audioFrame);
      }
      break;
  }
}

export function processIAudioFrameObserver(
  handler: IAudioFrameObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onPlaybackAudioFrameBeforeMixing':
      if (handler.onPlaybackAudioFrameBeforeMixing !== undefined) {
        handler.onPlaybackAudioFrameBeforeMixing(
          jsonParams.channelId,
          jsonParams.uid,
          jsonParams.audioFrame
        );
      }
      break;
  }
}

export function processIAudioSpectrumObserver(
  handler: IAudioSpectrumObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onLocalAudioSpectrum':
      if (handler.onLocalAudioSpectrum !== undefined) {
        handler.onLocalAudioSpectrum(jsonParams.data);
      }
      break;

    case 'onRemoteAudioSpectrum':
      if (handler.onRemoteAudioSpectrum !== undefined) {
        handler.onRemoteAudioSpectrum(
          jsonParams.spectrums,
          jsonParams.spectrumNumber
        );
      }
      break;
  }
}

export function processIVideoEncodedFrameObserver(
  handler: IVideoEncodedFrameObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onEncodedVideoFrameReceived':
      if (handler.onEncodedVideoFrameReceived !== undefined) {
        handler.onEncodedVideoFrameReceived(
          jsonParams.uid,
          jsonParams.imageBuffer,
          jsonParams.length,
          jsonParams.videoEncodedFrameInfo
        );
      }
      break;
  }
}

export function processIVideoFrameObserver(
  handler: IVideoFrameObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onCaptureVideoFrame':
      if (handler.onCaptureVideoFrame !== undefined) {
        handler.onCaptureVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onPreEncodeVideoFrame':
      if (handler.onPreEncodeVideoFrame !== undefined) {
        handler.onPreEncodeVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onSecondaryCameraCaptureVideoFrame':
      if (handler.onSecondaryCameraCaptureVideoFrame !== undefined) {
        handler.onSecondaryCameraCaptureVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onSecondaryPreEncodeCameraVideoFrame':
      if (handler.onSecondaryPreEncodeCameraVideoFrame !== undefined) {
        handler.onSecondaryPreEncodeCameraVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onScreenCaptureVideoFrame':
      if (handler.onScreenCaptureVideoFrame !== undefined) {
        handler.onScreenCaptureVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onPreEncodeScreenVideoFrame':
      if (handler.onPreEncodeScreenVideoFrame !== undefined) {
        handler.onPreEncodeScreenVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onMediaPlayerVideoFrame':
      if (handler.onMediaPlayerVideoFrame !== undefined) {
        handler.onMediaPlayerVideoFrame(
          jsonParams.videoFrame,
          jsonParams.mediaPlayerId
        );
      }
      break;

    case 'onSecondaryScreenCaptureVideoFrame':
      if (handler.onSecondaryScreenCaptureVideoFrame !== undefined) {
        handler.onSecondaryScreenCaptureVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onSecondaryPreEncodeScreenVideoFrame':
      if (handler.onSecondaryPreEncodeScreenVideoFrame !== undefined) {
        handler.onSecondaryPreEncodeScreenVideoFrame(jsonParams.videoFrame);
      }
      break;

    case 'onRenderVideoFrame':
      if (handler.onRenderVideoFrame !== undefined) {
        handler.onRenderVideoFrame(
          jsonParams.channelId,
          jsonParams.remoteUid,
          jsonParams.videoFrame
        );
      }
      break;

    case 'onTranscodedVideoFrame':
      if (handler.onTranscodedVideoFrame !== undefined) {
        handler.onTranscodedVideoFrame(jsonParams.videoFrame);
      }
      break;
  }
}

export function processIMediaRecorderObserver(
  handler: IMediaRecorderObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onRecorderStateChanged':
      if (handler.onRecorderStateChanged !== undefined) {
        handler.onRecorderStateChanged(jsonParams.state, jsonParams.error);
      }
      break;

    case 'onRecorderInfoUpdated':
      if (handler.onRecorderInfoUpdated !== undefined) {
        handler.onRecorderInfoUpdated(jsonParams.info);
      }
      break;
  }
}
