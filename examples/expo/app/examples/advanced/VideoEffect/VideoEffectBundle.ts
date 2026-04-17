import { Platform } from 'react-native';

export const VIDEO_EFFECT_RESOURCE_ROOT = 'AgoraBeautyMaterial';
export const VIDEO_EFFECT_BUNDLE_DIR = 'beauty_material_functional';

export type PreparedVideoEffectBundle = {
  preparedRoot: string;
  preparedBundlePath: string;
};

export function getPreparedVideoEffectPaths(
  cacheRoot: string
): PreparedVideoEffectBundle {
  const preparedRoot = `${cacheRoot}/${VIDEO_EFFECT_RESOURCE_ROOT}`;
  return {
    preparedRoot,
    preparedBundlePath: `${preparedRoot}/${VIDEO_EFFECT_BUNDLE_DIR}`,
  };
}

export function isPreparedVideoEffectRootValid(files: string[]) {
  const normalizedFiles = files.map((file) => file.replace(/\/+$/, ''));

  return (
    normalizedFiles.some((file) =>
      file.endsWith(
        `/${VIDEO_EFFECT_RESOURCE_ROOT}/${VIDEO_EFFECT_BUNDLE_DIR}/config.json`
      )
    ) &&
    normalizedFiles.some((file) =>
      file.endsWith(`/${VIDEO_EFFECT_RESOURCE_ROOT}/resource`)
    )
  );
}

type RNFSModule = typeof import('react-native-fs');

function getRNFS(): RNFSModule {
  const module = require('react-native-fs');
  return module.default ?? module;
}

type VideoEffectCacheRootSource = {
  ExternalCachesDirectoryPath?: string;
  CachesDirectoryPath?: string;
};

export function getCacheRootForVideoEffectBundle(
  platformOs: string,
  cacheRootSource: VideoEffectCacheRootSource
) {
  if (platformOs === 'android') {
    return (
      cacheRootSource.ExternalCachesDirectoryPath ??
      cacheRootSource.CachesDirectoryPath
    );
  }
  return cacheRootSource.CachesDirectoryPath;
}

async function resetPreparedRoot(rnfs: RNFSModule, preparedRoot: string) {
  if (await rnfs.exists(preparedRoot)) {
    await rnfs.unlink(preparedRoot);
  }
  await rnfs.mkdir(preparedRoot);
}

async function copyAndroidAssetsRecursively(
  rnfs: RNFSModule,
  assetSourceDir: string,
  destinationDir: string
) {
  const entries = await rnfs.readDirAssets(assetSourceDir);
  for (const entry of entries) {
    const sourcePath = `${assetSourceDir}/${entry.name}`;
    const destinationPath = `${destinationDir}/${entry.name}`;
    if (entry.isDirectory()) {
      await rnfs.mkdir(destinationPath);
      await copyAndroidAssetsRecursively(rnfs, sourcePath, destinationPath);
      continue;
    }
    await rnfs.copyFileAssets(sourcePath, destinationPath);
  }
}

async function copyFilesystemDirectoryRecursively(
  rnfs: RNFSModule,
  sourceDir: string,
  destinationDir: string
) {
  const entries = await rnfs.readDir(sourceDir);
  for (const entry of entries) {
    const sourcePath = entry.path;
    const destinationPath = `${destinationDir}/${entry.name}`;
    if (entry.isDirectory()) {
      await rnfs.mkdir(destinationPath);
      await copyFilesystemDirectoryRecursively(
        rnfs,
        sourcePath,
        destinationPath
      );
      continue;
    }
    await rnfs.copyFile(sourcePath, destinationPath);
  }
}

async function collectPreparedPathsRecursively(
  rnfs: RNFSModule,
  rootDir: string
): Promise<string[]> {
  const entries = await rnfs.readDir(rootDir);
  const paths: string[] = [];
  for (const entry of entries) {
    paths.push(entry.path);
    if (entry.isDirectory()) {
      paths.push(...(await collectPreparedPathsRecursively(rnfs, entry.path)));
    }
  }
  return paths;
}

export async function prepareVideoEffectBundle(): Promise<PreparedVideoEffectBundle> {
  const rnfs = getRNFS();
  const cacheRoot = getCacheRootForVideoEffectBundle(Platform.OS, rnfs);
  if (!cacheRoot) {
    throw new Error('No cache root available for video effect bundle');
  }
  const preparedPaths = getPreparedVideoEffectPaths(cacheRoot);

  await resetPreparedRoot(rnfs, preparedPaths.preparedRoot);

  if (Platform.OS === 'android') {
    await copyAndroidAssetsRecursively(
      rnfs,
      VIDEO_EFFECT_RESOURCE_ROOT,
      preparedPaths.preparedRoot
    );
  } else {
    await copyFilesystemDirectoryRecursively(
      rnfs,
      `${rnfs.MainBundlePath}/${VIDEO_EFFECT_RESOURCE_ROOT}`,
      preparedPaths.preparedRoot
    );
  }

  const preparedFiles = await collectPreparedPathsRecursively(
    rnfs,
    preparedPaths.preparedRoot
  );
  if (!isPreparedVideoEffectRootValid(preparedFiles)) {
    throw new Error('Prepared video effect bundle is invalid');
  }

  return preparedPaths;
}
