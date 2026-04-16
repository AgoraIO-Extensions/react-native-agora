import {
  getCacheRootForVideoEffectBundle,
  getPreparedVideoEffectPaths,
  isPreparedVideoEffectRootValid,
} from './VideoEffectBundle';

describe('VideoEffectBundle', () => {
  it('returns the prepared root and bundle path under cache storage', () => {
    expect(getPreparedVideoEffectPaths('/cache')).toEqual({
      preparedRoot: '/cache/AgoraBeautyMaterial',
      preparedBundlePath: '/cache/AgoraBeautyMaterial/beauty_material_functional',
    });
  });

  it('requires both the prepared bundle config and the sibling resource directory', () => {
    expect(
      isPreparedVideoEffectRootValid([
        '/cache/AgoraBeautyMaterial/beauty_material_functional/config.json',
      ])
    ).toBe(false);
  });

  it('returns false when config.json is missing', () => {
    expect(
      isPreparedVideoEffectRootValid(['/cache/AgoraBeautyMaterial/resource'])
    ).toBe(false);
  });

  it('returns false when resource is missing', () => {
    expect(
      isPreparedVideoEffectRootValid([
        '/cache/AgoraBeautyMaterial/beauty_material_functional/config.json',
      ])
    ).toBe(false);
  });

  it('returns true when both config.json and resource directory are present', () => {
    expect(
      isPreparedVideoEffectRootValid([
        '/cache/AgoraBeautyMaterial/beauty_material_functional/config.json',
        '/cache/AgoraBeautyMaterial/resource',
      ])
    ).toBe(true);
  });

  it('chooses platform-specific cache root', () => {
    expect(
      getCacheRootForVideoEffectBundle('android', {
        ExternalCachesDirectoryPath: '/android-cache',
        CachesDirectoryPath: '/ios-cache',
      })
    ).toBe('/android-cache');

    expect(
      getCacheRootForVideoEffectBundle('ios', {
        ExternalCachesDirectoryPath: '/android-cache',
        CachesDirectoryPath: '/ios-cache',
      })
    ).toBe('/ios-cache');
  });
});
