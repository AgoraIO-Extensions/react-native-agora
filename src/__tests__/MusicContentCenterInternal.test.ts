import createAgoraRtcEngine from '../';

jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: () => {},
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => ({
  default: () => ({ addListener: () => {} }),
}));
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  create: () => {},
}));
jest.mock('../specs', () => ({
  showRPSystemBroadcastPickerView: () => {},
  callApi: () => {},
}));

test('addListener', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback = jest.fn();
  engine.addListener('onMusicChartsResult', callback);
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback).toBeCalledTimes(1);
});

test('addListenerWithSameEventTypeAndCallback', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback = jest.fn();
  engine.addListener('onMusicChartsResult', callback);
  engine.addListener('onMusicChartsResult', callback);
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback).toBeCalledTimes(2);
});

test('addListenerWithSameCallback', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback = jest.fn();
  engine.addListener('onMusicChartsResult', callback);
  engine.addListener('onMusicCollectionResult', callback);
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  emitEvent(
    'onMusicCollectionResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback).toBeCalledTimes(2);
});

test('removeListener', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback = jest.fn();
  engine.addListener('onMusicChartsResult', callback);
  engine.removeListener('onMusicChartsResult', callback);
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback).not.toBeCalled();
});

test('removeListenerWithoutCallback', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback = jest.fn();
  engine.addListener('onMusicChartsResult', callback);
  engine.removeListener('onMusicChartsResult');
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback).not.toBeCalled();
});

test('removeAllListenersWithEventType', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onMusicChartsResult', callback1);
  engine.addListener('onMusicChartsResult', callback2);
  engine.removeAllListeners('onMusicChartsResult');
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeAllListeners', () => {
  const engine = createAgoraRtcEngine().getMusicContentCenter();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onMusicChartsResult', callback1);
  engine.addListener('onMusicCollectionResult', callback2);
  engine.removeAllListeners();
  emitEvent(
    'onMusicChartsResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  emitEvent(
    'onMusicCollectionResult',
    EVENT_TYPE.IMusicContentCenter,
    JSON.stringify({})
  );
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

import { EVENT_TYPE, emitEvent } from '../internal/IrisApiEngine';
