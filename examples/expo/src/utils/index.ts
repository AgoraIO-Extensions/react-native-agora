import { Platform } from 'react-native';
import {
  ExternalCachesDirectoryPath,
  MainBundlePath,
  copyFileAssets,
  exists,
} from 'react-native-fs';

import { AgoraDropdownItem } from '../components/ui';

export const objectToItems = (object: any): AgoraDropdownItem[] => {
  return Object.keys(object).map((value) => {
    return {
      label: value,
      value: object[value],
    };
  });
};

export const arrayToItems = (array: any[]): AgoraDropdownItem[] => {
  return array.map((value) => {
    return {
      label: value.toString(),
      value: value,
    };
  });
};

export const enumToItems = (enumType: any): AgoraDropdownItem[] => {
  const entries = Object.entries(enumType);
  const items = entries.filter(([, value]) => typeof value === 'number');
  items.sort((a: any, b: any) => a[1] - b[1]);
  return items.map(([key, value]) => ({
    label: key,
    value: value,
  }));
};

export function getResourcePath(fileName: string): string {
  if (Platform.OS === 'android') {
    return `/assets/${fileName}`;
  }
  return `${MainBundlePath}/${fileName}`;
}

export async function getAbsolutePath(filePath: string): Promise<string> {
  if (Platform.OS === 'android') {
    if (filePath.startsWith('/assets/')) {
      // const fileName = filePath;
      const fileName = filePath.replace('/assets/', '');
      const destPath = `${ExternalCachesDirectoryPath}/${fileName}`;
      if (!(await exists(destPath))) {
        await copyFileAssets(fileName, destPath);
      }
      return destPath;
    }
  }
  return filePath;
}
