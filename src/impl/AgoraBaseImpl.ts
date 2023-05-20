import { IAudioEncodedFrameObserver } from '../AgoraBase';

export function processIAudioEncodedFrameObserver(
  handler: IAudioEncodedFrameObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'OnRecordAudioEncodedFrame':
      if (handler.onRecordAudioEncodedFrame !== undefined) {
        handler.onRecordAudioEncodedFrame(
          jsonParams.frameBuffer,
          jsonParams.length,
          jsonParams.audioEncodedFrameInfo
        );
      }
      break;

    case 'OnPlaybackAudioEncodedFrame':
      if (handler.onPlaybackAudioEncodedFrame !== undefined) {
        handler.onPlaybackAudioEncodedFrame(
          jsonParams.frameBuffer,
          jsonParams.length,
          jsonParams.audioEncodedFrameInfo
        );
      }
      break;

    case 'OnMixedAudioEncodedFrame':
      if (handler.onMixedAudioEncodedFrame !== undefined) {
        handler.onMixedAudioEncodedFrame(
          jsonParams.frameBuffer,
          jsonParams.length,
          jsonParams.audioEncodedFrameInfo
        );
      }
      break;
  }
}
