import createAgoraRtcEngine from '../';
import { emitEvent } from '../internal/event';

import { EVENT_PROCESSORS } from '../internal/IrisApiEngine';
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: () => {},
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  return {
    default: function () {
      return { addListener: () => {} };
    },
  };
});
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  create: () => {},
}));
jest.mock('../specs', () => ({
  showRPSystemBroadcastPickerView: () => {},
  callApi: () => {},
}));

test('addListener', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback);
  engine.addListener('onFaceInfo', callback2);
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  emitEvent('onFaceInfo', EVENT_PROCESSORS.IFaceInfoObserver, {});
  expect(callback).toBeCalledTimes(1);
  expect(callback2).toBeCalledTimes(1);
});

test('addListenerWithSameEventTypeAndCallback', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback);
  engine.addListener('onCaptureVideoFrame', callback);
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  expect(callback).toBeCalledTimes(2);
});

test('addListenerWithSameCallback', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback);
  engine.addListener('onRecordAudioFrame', callback);
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  emitEvent('onRecordAudioFrame', EVENT_PROCESSORS.IAudioFrameObserver, {});
  expect(callback).toBeCalledTimes(2);
});

test('removeListener', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback);
  engine.addListener('onFaceInfo', callback2);
  engine.removeListener('onCaptureVideoFrame', callback);
  engine.removeListener('onFaceInfo', callback2);
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  emitEvent('onFaceInfo', EVENT_PROCESSORS.IFaceInfoObserver, {});
  expect(callback).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeListenerWithoutCallback', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback);
  engine.removeListener('onCaptureVideoFrame');
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  expect(callback).not.toBeCalled();
});

test('removeAllListenersWithEventType', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback1);
  engine.addListener('onCaptureVideoFrame', callback2);
  engine.removeAllListeners('onCaptureVideoFrame');
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeAllListeners', () => {
  const engine = createAgoraRtcEngine().getMediaEngine();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  const callback3 = jest.fn();
  engine.addListener('onCaptureVideoFrame', callback1);
  engine.addListener('onRecordAudioFrame', callback2);
  engine.addListener('onFaceInfo', callback3);
  engine.removeAllListeners();
  emitEvent('onCaptureVideoFrame', EVENT_PROCESSORS.IVideoFrameObserver, {});
  emitEvent('onRecordAudioFrame', EVENT_PROCESSORS.IAudioFrameObserver, {});
  emitEvent('onFaceInfo', EVENT_PROCESSORS.IFaceInfoObserver, {});
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
  expect(callback3).not.toBeCalled();
});
