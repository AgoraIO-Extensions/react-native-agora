import {
  buildStyleEffectOperations,
  classifyBundleTemplates,
  extractSdkDrivenBeautyOptionsFromConfig,
  parseBundleUiOptions,
} from './VideoEffectHelpers';

describe('VideoEffectHelpers', () => {
  it('parses bundle UI options into label/relativePath/templateName triples', () => {
    expect(
      parseBundleUiOptions({
        user_interface_option: {
          'Beauty-Basic': 'beauty_normal_basic/',
        },
      })
    ).toEqual([
      {
        label: 'Beauty-Basic',
        relativePath: 'beauty_normal_basic/',
        templateName: 'Beauty-Basic',
      },
    ]);
  });

  it('classifies templates by effect type prefix', () => {
    const groups = classifyBundleTemplates([
      {
        label: 'Filter-Whitetea',
        relativePath: 'filter_baicha/',
        templateName: 'Filter-Whitetea',
      },
    ]);

    expect(groups.filter).toHaveLength(1);
    expect(groups.beauty).toHaveLength(0);
    expect(groups.sticker).toHaveLength(0);
    expect(groups.styleMakeup).toHaveLength(0);
  });

  it('extracts Beauty defaults from template config', () => {
    expect(
      extractSdkDrivenBeautyOptionsFromConfig({
        beauty_effect_option: { smoothness: 0.7, lightness: 0.7, redness: 0.3 },
        face_buffing_option: { eye_pouch: 0.8 },
        face_shape_beauty_option: { style: -1, intensity: 50 },
      })
    ).toMatchObject({
      smoothness: 0.7,
      lightness: 0.7,
      redness: 0.3,
      eyePouch: 0.8,
      faceStyle: -1,
      faceIntensity: 50,
    });
  });

  it('builds style/filter strength operations with the correct keys', () => {
    expect(buildStyleEffectOperations('filter_effect_option', 0.5)).toEqual([
      {
        kind: 'float',
        option: 'filter_effect_option',
        key: 'strength',
        value: 0.5,
      },
    ]);

    expect(buildStyleEffectOperations('style_effect_option', 0.75)).toEqual([
      {
        kind: 'float',
        option: 'style_effect_option',
        key: 'styleIntensity',
        value: 0.75,
      },
    ]);
  });
});
