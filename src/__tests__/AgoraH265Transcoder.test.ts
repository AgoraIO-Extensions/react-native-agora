import createAgoraRtcEngine from '../';

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
  const transcoder = createAgoraRtcEngine().getH265Transcoder();
  const callback = jest.fn();
  transcoder.addListener('onEnableTranscode', callback);
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback).toBeCalledTimes(1);
});

test('addListenerWithSameEventTypeAndCallback', () => {
  const engine = createAgoraRtcEngine().getH265Transcoder();
  const callback = jest.fn();
  engine.addListener('onEnableTranscode', callback);
  engine.addListener('onEnableTranscode', callback);
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback).toBeCalledTimes(2);
});

test('addListenerWithSameCallback', () => {
  const engine = createAgoraRtcEngine().getH265Transcoder();
  const callback = jest.fn();
  engine.addListener('onEnableTranscode', callback);
  engine.addListener('onQueryChannel', callback);
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  emitEvent('onQueryChannel', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback).toBeCalledTimes(2);
});

test('removeListener', () => {
  const engine = createAgoraRtcEngine().getH265Transcoder();
  const callback = jest.fn();
  engine.addListener('onEnableTranscode', callback);
  engine.removeListener('onEnableTranscode', callback);
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback).not.toBeCalled();
});

test('removeListenerWithoutCallback', () => {
  const engine = createAgoraRtcEngine().getH265Transcoder();
  const callback = jest.fn();
  engine.addListener('onEnableTranscode', callback);
  engine.removeListener('onEnableTranscode');
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback).not.toBeCalled();
});

test('removeAllListenersWithEventType', () => {
  const engine = createAgoraRtcEngine().getH265Transcoder();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onEnableTranscode', callback1);
  engine.addListener('onEnableTranscode', callback2);
  engine.removeAllListeners('onEnableTranscode');
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeAllListeners', () => {
  const engine = createAgoraRtcEngine().getH265Transcoder();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onEnableTranscode', callback1);
  engine.addListener('onQueryChannel', callback2);
  engine.removeAllListeners();
  emitEvent('onEnableTranscode', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  emitEvent('onQueryChannel', EVENT_PROCESSORS.IH265TranscoderObserver, {});
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

import { EVENT_PROCESSORS, emitEvent } from '../internal/IrisApiEngine';
