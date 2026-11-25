import { Buffer } from 'buffer';

import createAgoraRtcEngine, { VideoBufferType, VideoPixelFormat } from '../';
import { emitEvent } from '../internal/event';
import AgoraRtcNg from '../specs';

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
  callApi: jest.fn(),
}));

test('pushVideoFrame sends pixels only through binary buffers', () => {
  const callApi = jest.mocked(AgoraRtcNg.callApi);
  callApi.mockClear().mockReturnValue('{"result":0}');
  const pixels = new Uint8Array(160 * 120 * 4).fill(240);
  const alpha = new Uint8Array(160 * 120).fill(127);
  const matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const frame = Object.freeze({
    type: VideoBufferType.VideoBufferRawData,
    format: VideoPixelFormat.VideoPixelRgba,
    buffer: pixels,
    alphaBuffer: alpha,
    stride: 160,
    height: 120,
    timestamp: 123,
    matrix,
  });

  expect(createAgoraRtcEngine().getMediaEngine().pushVideoFrame(frame, 7)).toBe(
    0
  );
  expect(callApi).toHaveBeenCalledTimes(1);
  const request = callApi.mock.calls[0][0];
  expect(request.buffers).toHaveLength(5);
  expect(
    Buffer.from(request.buffers![0], 'base64').equals(Buffer.from(pixels))
  ).toBe(true);
  expect(
    Buffer.from(request.buffers![3], 'base64').equals(Buffer.from(alpha))
  ).toBe(true);
  expect([
    request.buffers![1],
    request.buffers![2],
    request.buffers![4],
  ]).toEqual(['', '', '']);
  expect(request.params.length).toBeLessThan(400);
  expect(JSON.parse(request.params)).toEqual({
    frame: {
      type: frame.type,
      format: frame.format,
      stride: 160,
      height: 120,
      timestamp: 123,
      matrix,
    },
    videoTrackId: 7,
  });
  expect(frame.buffer).toBe(pixels);
  expect(frame.alphaBuffer).toBe(alpha);
});

test('pushVideoFrame preserves empty binary slots', () => {
  const callApi = jest.mocked(AgoraRtcNg.callApi);
  callApi.mockClear().mockReturnValue('{"result":0}');
  expect(createAgoraRtcEngine().getMediaEngine().pushVideoFrame({}, 0)).toBe(0);
  expect(callApi.mock.calls[0][0].buffers).toEqual(['', '', '', '', '']);
});

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
