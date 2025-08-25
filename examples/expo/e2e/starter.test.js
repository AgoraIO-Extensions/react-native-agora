import { by, device, element, expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    const permissions = { camera: 'YES', microphone: 'YES' };
    await device.launchApp({ permissions });
  });

  beforeEach(async () => {
    if (device.getPlatform() === 'android') {
      await device.reloadReactNative();
    }
  });

  it('should have APIExample screen', async () => {
    await expect(element(by.text('API Example'))).toBeVisible();
  });

  it('should show JoinChannelAudio screen after tap', async () => {
    await element(by.text('JoinChannelAudio')).atIndex(0).tap();
    await expect(element(by.text('JoinChannelAudio'))).toBeVisible();
    if (device.getPlatform() === 'ios') {
      await element(by.text('API Example')).atIndex(0).tap();
    }
  });

  it('should show JoinChannelVideo screen after tap', async () => {
    await element(by.text('JoinChannelVideo')).atIndex(0).tap();
    await expect(element(by.text('JoinChannelVideo'))).toBeVisible();
  });
});
