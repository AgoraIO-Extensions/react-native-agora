export const CLEAR_VISION_EXTENSION_PROVIDER =
  'agora_video_filters_clear_vision';
export const CLEAR_VISION_EXTENSION_NAME = 'clear_vision';

export interface VideoEffectOperation {
  kind: 'bool' | 'int' | 'float';
  option: string;
  key: string;
  value: boolean | number;
}

export interface BundleTemplateOption {
  label: string;
  relativePath: string;
  templateName: string;
}

export interface BundleTemplateGroups {
  beauty: BundleTemplateOption[];
  filter: BundleTemplateOption[];
  sticker: BundleTemplateOption[];
  styleMakeup: BundleTemplateOption[];
}

export interface SdkDrivenBeautyOptions {
  smoothness: number;
  lightness: number;
  redness: number;
  eyePouch: number;
  faceStyle: number;
  faceIntensity: number;
}

export const DEFAULT_SDK_DRIVEN_BEAUTY_OPTIONS: SdkDrivenBeautyOptions = {
  smoothness: 0.5,
  lightness: 0.3,
  redness: 0,
  eyePouch: 0,
  faceStyle: -1,
  faceIntensity: 50,
};

export function findTemplateOptionByName(
  options: BundleTemplateOption[],
  templateName?: string | null
) {
  if (!templateName) {
    return null;
  }

  return options.find((option) => option.templateName === templateName) ?? null;
}

export function isSameTemplateOption(
  left?: BundleTemplateOption | null,
  right?: BundleTemplateOption | null
) {
  if (!left && !right) {
    return true;
  }
  if (!left || !right) {
    return false;
  }

  return (
    left.templateName === right.templateName &&
    left.relativePath === right.relativePath
  );
}

export function getDisplayValueForSelectedTemplate<T>(
  selectedTemplate: BundleTemplateOption | null,
  appliedTemplate: BundleTemplateOption | null,
  draftValue: T,
  appliedValue?: T | null
) {
  if (
    isSameTemplateOption(selectedTemplate, appliedTemplate) &&
    appliedValue !== undefined &&
    appliedValue !== null
  ) {
    return appliedValue;
  }

  return draftValue;
}

export function isVideoEffectSdkResultSuccess(
  result?: number | null | void
): result is 0 {
  return result === 0;
}

export function areAllVideoEffectSdkResultsSuccessful(
  results: Array<number | null | undefined | void>
) {
  return results.every((result) => isVideoEffectSdkResultSuccess(result));
}

export function isVideoEffectObjectHandleValid(videoEffectObject: unknown) {
  if (
    !videoEffectObject ||
    typeof (videoEffectObject as { getVideoEffectObjectId?: unknown })
      .getVideoEffectObjectId !== 'function'
  ) {
    return false;
  }

  const videoEffectObjectId = (
    videoEffectObject as { getVideoEffectObjectId: () => number }
  ).getVideoEffectObjectId();
  return Number.isFinite(videoEffectObjectId) && videoEffectObjectId > 0;
}

export function parseBundleUiOptions(config: {
  user_interface_option?: Record<string, string>;
}): BundleTemplateOption[] {
  return Object.entries(config.user_interface_option ?? {}).map(
    ([label, relativePath]) => ({
      label,
      relativePath,
      templateName: label,
    })
  );
}

export function classifyBundleTemplates(
  options: BundleTemplateOption[]
): BundleTemplateGroups {
  return options.reduce<BundleTemplateGroups>(
    (groups, option) => {
      if (option.templateName.startsWith('Beauty-')) {
        groups.beauty.push(option);
      } else if (option.templateName.startsWith('Makeup-')) {
        groups.styleMakeup.push(option);
      } else if (option.templateName.startsWith('Filter-')) {
        groups.filter.push(option);
      } else if (option.templateName.startsWith('Sticker-')) {
        groups.sticker.push(option);
      }
      return groups;
    },
    {
      beauty: [],
      filter: [],
      sticker: [],
      styleMakeup: [],
    }
  );
}

export function extractSdkDrivenBeautyOptionsFromConfig(
  config: any,
  fallback: SdkDrivenBeautyOptions = DEFAULT_SDK_DRIVEN_BEAUTY_OPTIONS
): SdkDrivenBeautyOptions {
  return {
    smoothness: config?.beauty_effect_option?.smoothness ?? fallback.smoothness,
    lightness: config?.beauty_effect_option?.lightness ?? fallback.lightness,
    redness: config?.beauty_effect_option?.redness ?? fallback.redness,
    eyePouch: config?.face_buffing_option?.eye_pouch ?? fallback.eyePouch,
    faceStyle: config?.face_shape_beauty_option?.style ?? fallback.faceStyle,
    faceIntensity:
      config?.face_shape_beauty_option?.intensity ?? fallback.faceIntensity,
  };
}

export function buildStyleEffectOperations(
  option:
    | 'style_effect_option'
    | 'style_makeup_option'
    | 'filter_effect_option',
  value: number
): VideoEffectOperation[] {
  return [
    {
      kind: 'float',
      option,
      key: option === 'filter_effect_option' ? 'strength' : 'styleIntensity',
      value,
    },
  ];
}

type VideoEffectEngine = {
  enableExtension?: (
    provider: string,
    extension: string,
    enable?: boolean
  ) => number | void;
  destroyVideoEffectObject?: (videoEffectObject: unknown) => number | void;
};

export function destroyVideoEffectObjectResource(
  engine: VideoEffectEngine | undefined,
  videoEffectObject: unknown
) {
  if (videoEffectObject && engine?.destroyVideoEffectObject) {
    return engine.destroyVideoEffectObject(videoEffectObject);
  }
  return undefined;
}

export function setVideoEffectExtensionEnabled(
  engine: VideoEffectEngine | undefined,
  enabled: boolean
) {
  return engine?.enableExtension?.(
    CLEAR_VISION_EXTENSION_PROVIDER,
    CLEAR_VISION_EXTENSION_NAME,
    enabled
  );
}

export function enableVideoEffectExtension(
  engine: VideoEffectEngine | undefined
) {
  return setVideoEffectExtensionEnabled(engine, true);
}

export function disableVideoEffectExtension(
  engine: VideoEffectEngine | undefined
) {
  return setVideoEffectExtensionEnabled(engine, false);
}

export function releaseVideoEffectResources(
  engine: VideoEffectEngine | undefined,
  videoEffectObject: unknown
) {
  const destroyResult = destroyVideoEffectObjectResource(
    engine,
    videoEffectObject
  );
  const disableResult = disableVideoEffectExtension(engine);
  return {
    destroyResult,
    disableResult,
  };
}

type RNFSModule = typeof import('react-native-fs');

type RootBundleConfig = {
  user_interface_option?: Record<string, string>;
  beauty_config?: string;
};

export type BundleTemplateAndBeautyDefaults = {
  rootConfig: RootBundleConfig;
  templateGroups: BundleTemplateGroups;
  selectedBeautyTemplate: BundleTemplateOption | null;
  initialBeautyOptions: SdkDrivenBeautyOptions;
};

function getRNFS(): RNFSModule {
  const module = require('react-native-fs');
  return module.default ?? module;
}

async function readJsonFile<T>(
  rnfs: RNFSModule,
  absolutePath: string
): Promise<T> {
  const content = await rnfs.readFile(absolutePath, 'utf8');
  return JSON.parse(content) as T;
}

async function readJsonFileIfPresent<T>(
  rnfs: RNFSModule,
  absolutePath: string
): Promise<T | null> {
  if (!(await rnfs.exists(absolutePath))) {
    return null;
  }
  return readJsonFile<T>(rnfs, absolutePath);
}

function trimTrailingSlash(path: string) {
  return path.replace(/\/+$/, '');
}

function trimLeadingSlash(path: string) {
  return path.replace(/^\/+/, '');
}

function toTemplateRootPath(bundlePath: string, relativePath: string) {
  const normalizedRelativePath = trimLeadingSlash(
    trimTrailingSlash(relativePath)
  );
  return `${trimTrailingSlash(bundlePath)}/${normalizedRelativePath}`;
}

export type BundleCacheSyncTarget = {
  cachePath: string;
  jsonPath: string;
};

export function buildBundleCacheSyncTargets(
  bundlePath: string,
  relativePaths: string[]
): BundleCacheSyncTarget[] {
  const normalizedBundlePath = trimTrailingSlash(bundlePath);
  const normalizedRelativePaths = relativePaths
    .map((relativePath) => trimLeadingSlash(trimTrailingSlash(relativePath)))
    .filter((relativePath) => Boolean(relativePath))
    .filter(
      (relativePath, index, array) => array.indexOf(relativePath) === index
    );

  return [
    {
      cachePath: `${normalizedBundlePath}/saved.cache`,
      jsonPath: `${normalizedBundlePath}/saved.json`,
    },
    ...normalizedRelativePaths.map((relativePath) => ({
      cachePath: `${normalizedBundlePath}/${relativePath}/saved.cache`,
      jsonPath: `${normalizedBundlePath}/${relativePath}/saved.json`,
    })),
  ];
}

export async function syncSavedConfigCacheForBundle(
  bundlePath: string,
  relativePaths: string[],
  rnfs: RNFSModule = getRNFS()
): Promise<BundleCacheSyncTarget[]> {
  const copiedTargets: BundleCacheSyncTarget[] = [];
  const targets = buildBundleCacheSyncTargets(bundlePath, relativePaths);
  for (const target of targets) {
    if (!(await rnfs.exists(target.jsonPath))) {
      continue;
    }
    if (await rnfs.exists(target.cachePath)) {
      await rnfs.unlink(target.cachePath);
    }
    await rnfs.copyFile(target.jsonPath, target.cachePath);
    copiedTargets.push(target);
  }
  return copiedTargets;
}

export async function readBundleRootConfig(
  bundlePath: string,
  rnfs: RNFSModule = getRNFS()
): Promise<RootBundleConfig> {
  return readJsonFile<RootBundleConfig>(
    rnfs,
    `${trimTrailingSlash(bundlePath)}/config.json`
  );
}

export async function readBundleTemplateConfig(
  bundlePath: string,
  relativePath: string,
  rnfs: RNFSModule = getRNFS()
): Promise<Record<string, unknown>> {
  const templateRootPath = toTemplateRootPath(bundlePath, relativePath);
  const config = await readJsonFile<Record<string, unknown>>(
    rnfs,
    `${templateRootPath}/config.json`
  );
  const savedOverride = await readJsonFileIfPresent<Record<string, unknown>>(
    rnfs,
    `${templateRootPath}/saved.json`
  );
  return savedOverride ?? config;
}

export async function loadBundleTemplateGroupsAndInitialBeautyOptions(
  bundlePath: string,
  rnfs: RNFSModule = getRNFS()
): Promise<BundleTemplateAndBeautyDefaults> {
  const rootConfig = await readBundleRootConfig(bundlePath, rnfs);
  const templateGroups = classifyBundleTemplates(
    parseBundleUiOptions(rootConfig)
  );
  const selectedBeautyTemplate =
    findTemplateOptionByName(templateGroups.beauty, rootConfig.beauty_config) ??
    templateGroups.beauty[0] ??
    null;

  if (!selectedBeautyTemplate) {
    return {
      rootConfig,
      templateGroups,
      selectedBeautyTemplate,
      initialBeautyOptions: DEFAULT_SDK_DRIVEN_BEAUTY_OPTIONS,
    };
  }

  const beautyTemplateConfig = await readBundleTemplateConfig(
    bundlePath,
    selectedBeautyTemplate.relativePath,
    rnfs
  );

  return {
    rootConfig,
    templateGroups,
    selectedBeautyTemplate,
    initialBeautyOptions:
      extractSdkDrivenBeautyOptionsFromConfig(beautyTemplateConfig),
  };
}
