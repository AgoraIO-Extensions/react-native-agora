import { LocalVideoEventType } from '../AgoraBase';

describe('LocalVideoEventType', () => {
  it('exposes camera focal length events', () => {
    expect(
      LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthApplied
    ).toBe(5);
    expect(
      LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthFallbackToDefault
    ).toBe(6);
  });
});
