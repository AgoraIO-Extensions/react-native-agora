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
  const items = Object.values(enumType);
  const keys = items.filter((v) => typeof v === 'string') as string[];
  const values = items.filter((v) => typeof v === 'number') as number[];
  return keys.map((value, index) => ({
    label: value,
    value: values[index],
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
