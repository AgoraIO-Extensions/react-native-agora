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
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback);
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  expect(callback).toBeCalledTimes(1);
});

test('addListenerWithSameEventTypeAndCallback', () => {
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback);
  engine.addListener('onAgoraCDNTokenWillExpire', callback);
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  expect(callback).toBeCalledTimes(2);
});

test('addListenerWithSameCallback', () => {
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback);
  engine.addListener('onFrame', callback);
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  emitEvent('onFrame', EVENT_TYPE.IMediaPlayer, JSON.stringify({}));
  expect(callback).toBeCalledTimes(2);
});

test('removeListener', () => {
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback);
  engine.removeListener('onAgoraCDNTokenWillExpire', callback);
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  expect(callback).not.toBeCalled();
});

test('removeListenerWithoutCallback', () => {
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback);
  engine.removeListener('onAgoraCDNTokenWillExpire');
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  expect(callback).not.toBeCalled();
});

test('removeAllListenersWithEventType', () => {
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback1);
  engine.addListener('onAgoraCDNTokenWillExpire', callback2);
  engine.removeAllListeners('onAgoraCDNTokenWillExpire');
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

test('removeAllListeners', () => {
  const engine = createAgoraRtcEngine().createMediaPlayer();
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  engine.addListener('onAgoraCDNTokenWillExpire', callback1);
  engine.addListener('onFrame', callback2);
  engine.removeAllListeners();
  emitEvent(
    'onAgoraCDNTokenWillExpire',
    EVENT_TYPE.IMediaPlayer,
    JSON.stringify({})
  );
  emitEvent('onFrame', EVENT_TYPE.IMediaPlayer, JSON.stringify({}));
  expect(callback1).not.toBeCalled();
  expect(callback2).not.toBeCalled();
});

import { EVENT_TYPE, emitEvent } from '../internal/IrisApiEngine';
