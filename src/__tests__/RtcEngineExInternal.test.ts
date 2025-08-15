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
  const engine = createAgoraRtcEngine();
  const callback = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback);
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback).toBeCalledTimes(1);
});

test('addListenerWithSameEventTypeAndCallback', () => {
  const engine = createAgoraRtcEngine();
  const callback = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback);
  engine.addListener('onJoinChannelSuccess', callback);
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback).toBeCalledTimes(2);
});

test('addListenerWithSameCallback', () => {
  const engine = createAgoraRtcEngine();
  const callback = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback);
  engine.addListener('onRejoinChannelSuccess', callback);
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  emitEvent(
    'onRejoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback).toBeCalledTimes(2);
});

test('removeListener', () => {
  const engine = createAgoraRtcEngine();
  const callback = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback);
  engine.removeListener('onJoinChannelSuccess', callback);
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback).not.toBeCalled();
});

test('removeListenerWithoutCallback', () => {
  const engine = createAgoraRtcEngine();
  const callback = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback);
  engine.removeListener('onJoinChannelSuccess');
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback).not.toBeCalled();
});

test('removeListenerWithDifferentCallback', () => {
  const engine = createAgoraRtcEngine();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback1);
  engine.removeListener('onJoinChannelSuccess', callback2);
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback1).toBeCalledTimes(1);
});

test('removeAllListenersWithEventType', () => {
  const engine = createAgoraRtcEngine();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback1);
  engine.addListener('onJoinChannelSuccess', callback2);
  engine.removeAllListeners('onJoinChannelSuccess');
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeAllListeners', () => {
  const engine = createAgoraRtcEngine();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onJoinChannelSuccess', callback1);
  engine.addListener('onRejoinChannelSuccess', callback2);
  engine.removeAllListeners();
  emitEvent(
    'onJoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  emitEvent(
    'onRejoinChannelSuccess',
    EVENT_PROCESSORS.IRtcEngineEventHandler,
    {}
  );
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});
