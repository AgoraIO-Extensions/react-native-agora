import { by, device, element, expect, system } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    if (device.getPlatform() === 'ios') {
      await system.element(by.system.label('Allow')).tap();
      await system.element(by.system.label('Continue')).tap();
    }
  });

  it('should have APIExample screen', async () => {
    await expect(element(by.text('APIExample'))).toBeVisible();
  });

  it('should show JoinChannelAudio screen after tap', async () => {
    await element(by.text('JoinChannelAudio')).tap();
    await expect(element(by.text('JoinChannelAudio'))).toBeVisible();
  });

  it('should show JoinChannelVideo screen after tap', async () => {
    await element(by.text('JoinChannelVideo')).tap();
    await expect(element(by.text('JoinChannelVideo'))).toBeVisible();
  });
});
