import { VideoEffectNodeId } from '../../../../../../src/IAgoraRtcEngine';

import {
  buildBundleCacheSyncTargets,
  buildStyleEffectOperations,
  classifyBundleTemplates,
  disableVideoEffectExtension,
  enableVideoEffectExtension,
  extractSdkDrivenBeautyOptionsFromConfig,
  findTemplateOptionByName,
  isSameTemplateOption,
  loadBundleTemplateGroupsAndInitialBeautyOptions,
  parseBundleUiOptions,
  readBundleTemplateConfig,
  syncSavedConfigCacheForBundle,
} from './VideoEffectHelpers';

describe('VideoEffectHelpers', () => {
  it('exposes the Sticker node id for video effect object callers', () => {
    expect(VideoEffectNodeId.Sticker).toBe(8);
  });

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

  it('looks up templates by template name', () => {
    const selected = findTemplateOptionByName(
      [
        {
          label: 'Beauty-Basic',
          relativePath: 'beauty_normal_basic/',
          templateName: 'Beauty-Basic',
        },
      ],
      'Beauty-Basic'
    );

    expect(selected).toEqual({
      label: 'Beauty-Basic',
      relativePath: 'beauty_normal_basic/',
      templateName: 'Beauty-Basic',
    });
    expect(findTemplateOptionByName([], 'missing')).toBeNull();
  });

  it('distinguishes selected templates from separately applied templates', () => {
    const selectedTemplate = {
      label: 'Beauty-Natural',
      relativePath: 'beauty_natural/',
      templateName: 'Beauty-Natural',
    };
    const appliedTemplate = {
      label: 'Beauty-Basic',
      relativePath: 'beauty_normal_basic/',
      templateName: 'Beauty-Basic',
    };

    expect(isSameTemplateOption(selectedTemplate, appliedTemplate)).toBe(false);
    expect(isSameTemplateOption(appliedTemplate, { ...appliedTemplate })).toBe(
      true
    );
    expect(isSameTemplateOption(null, null)).toBe(true);
  });

  it('uses saved.json override when reading template config', async () => {
    const rnfs = {
      readFile: jest.fn(async (path: string) => {
        if (path.endsWith('/config.json')) {
          return JSON.stringify({
            beauty_effect_option: { smoothness: 0.4 },
          });
        }
        return JSON.stringify({
          beauty_effect_option: { smoothness: 0.9 },
        });
      }),
      exists: jest.fn(async (path: string) => path.endsWith('/saved.json')),
    };

    await expect(
      readBundleTemplateConfig('/bundle', 'beauty_normal_basic/', rnfs as any)
    ).resolves.toMatchObject({
      beauty_effect_option: { smoothness: 0.9 },
    });
  });

  it('falls back to config.json when saved.json is absent', async () => {
    const rnfs = {
      readFile: jest.fn(async () =>
        JSON.stringify({
          beauty_effect_option: { smoothness: 0.4 },
        })
      ),
      exists: jest.fn(async () => false),
    };

    await expect(
      readBundleTemplateConfig('/bundle', 'beauty_normal_basic/', rnfs as any)
    ).resolves.toMatchObject({
      beauty_effect_option: { smoothness: 0.4 },
    });
  });

  it('loads template groups and initial beauty defaults from selected template', async () => {
    const files: Record<string, string> = {
      '/bundle/config.json': JSON.stringify({
        user_interface_option: {
          'Beauty-Basic': 'beauty_normal_basic/',
          'Filter-Whitetea': 'filter_baicha/',
        },
        beauty_config: 'Beauty-Basic',
      }),
      '/bundle/beauty_normal_basic/config.json': JSON.stringify({
        beauty_effect_option: { smoothness: 0.7, lightness: 0.7, redness: 0.3 },
      }),
    };

    const rnfs = {
      readFile: jest.fn(async (path: string) => files[path]),
      exists: jest.fn(async () => false),
    };

    const loaded = await loadBundleTemplateGroupsAndInitialBeautyOptions(
      '/bundle',
      rnfs as any
    );

    expect(loaded.selectedBeautyTemplate?.templateName).toBe('Beauty-Basic');
    expect(loaded.templateGroups.filter).toHaveLength(1);
    expect(loaded.initialBeautyOptions.smoothness).toBe(0.7);
  });

  it('builds cache sync targets for bundle root and selected templates', () => {
    expect(
      buildBundleCacheSyncTargets('/bundle', [
        'beauty_normal_basic/',
        'filter_baicha/',
      ])
    ).toEqual([
      { cachePath: '/bundle/saved.cache', jsonPath: '/bundle/saved.json' },
      {
        cachePath: '/bundle/beauty_normal_basic/saved.cache',
        jsonPath: '/bundle/beauty_normal_basic/saved.json',
      },
      {
        cachePath: '/bundle/filter_baicha/saved.cache',
        jsonPath: '/bundle/filter_baicha/saved.json',
      },
    ]);
  });

  it('copies only existing saved.json files to saved.cache', async () => {
    const copied: Array<[string, string]> = [];
    const existing = new Set<string>([
      '/bundle/saved.json',
      '/bundle/beauty_normal_basic/saved.json',
    ]);
    const rnfs = {
      exists: jest.fn(async (path: string) => existing.has(path)),
      copyFile: jest.fn(async (from: string, to: string) => {
        copied.push([from, to]);
      }),
    };

    await expect(
      syncSavedConfigCacheForBundle(
        '/bundle',
        ['beauty_normal_basic/', 'filter_baicha/'],
        rnfs as any
      )
    ).resolves.toEqual([
      { cachePath: '/bundle/saved.cache', jsonPath: '/bundle/saved.json' },
      {
        cachePath: '/bundle/beauty_normal_basic/saved.cache',
        jsonPath: '/bundle/beauty_normal_basic/saved.json',
      },
    ]);

    expect(copied).toEqual([
      ['/bundle/saved.json', '/bundle/saved.cache'],
      [
        '/bundle/beauty_normal_basic/saved.json',
        '/bundle/beauty_normal_basic/saved.cache',
      ],
    ]);
  });

  it('unlinks an existing saved.cache before copying so repeated sync is safe', async () => {
    const existing = new Set<string>([
      '/bundle/saved.json',
      '/bundle/saved.cache',
    ]);
    const calls: string[] = [];
    const rnfs = {
      exists: jest.fn(async (path: string) => existing.has(path)),
      unlink: jest.fn(async (path: string) => {
        calls.push(`unlink:${path}`);
        existing.delete(path);
      }),
      copyFile: jest.fn(async (from: string, to: string) => {
        calls.push(`copy:${from}->${to}`);
      }),
    };

    await syncSavedConfigCacheForBundle('/bundle', [], rnfs as any);

    expect(calls).toEqual([
      'unlink:/bundle/saved.cache',
      'copy:/bundle/saved.json->/bundle/saved.cache',
    ]);
  });

  it('returns extension enable/disable SDK call results', () => {
    const engine = {
      enableExtension: jest.fn().mockReturnValueOnce(-4).mockReturnValueOnce(0),
    };

    expect(enableVideoEffectExtension(engine)).toBe(-4);
    expect(disableVideoEffectExtension(engine)).toBe(0);
  });
});
