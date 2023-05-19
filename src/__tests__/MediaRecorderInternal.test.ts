import createAgoraRtcEngine from '../';

const nativeHandle = 1;
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
  callApi: () => {
    return JSON.stringify({ result: nativeHandle });
  },
}));

test('addListener', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback);
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback).toBeCalledTimes(1);
});

test('addListenerWithWrongData', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback);
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle: 2,
  });
  expect(callback).not.toBeCalled();
});

test('addListenerWithSameEventTypeAndCallback', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback);
  engine.addListener('onRecorderInfoUpdated', callback);
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback).toBeCalledTimes(2);
});

test('addListenerWithSameCallback', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback);
  engine.addListener('onRecorderStateChanged', callback);
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  emitEvent('onRecorderStateChanged', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback).toBeCalledTimes(2);
});

test('removeListener', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback);
  engine.removeListener('onRecorderInfoUpdated', callback);
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback).not.toBeCalled();
});

test('removeListenerWithoutCallback', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback);
  engine.removeListener('onRecorderInfoUpdated');
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback).not.toBeCalled();
});

test('removeAllListenersWithEventType', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback1);
  engine.addListener('onRecorderInfoUpdated', callback2);
  engine.removeAllListeners('onRecorderInfoUpdated');
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeAllListeners', () => {
  const engine = createAgoraRtcEngine().createMediaRecorder({});
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onRecorderInfoUpdated', callback1);
  engine.addListener('onRecorderStateChanged', callback2);
  engine.removeAllListeners();
  emitEvent('onRecorderInfoUpdated', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  emitEvent('onRecorderStateChanged', EVENT_PROCESSORS.IMediaRecorderObserver, {
    nativeHandle,
  });
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

import { EVENT_PROCESSORS, emitEvent } from '../internal/IrisApiEngine';
