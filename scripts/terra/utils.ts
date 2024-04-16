import {
  CXXFile,
  CXXTYPE,
  Clazz,
  Enumz,
  Struct,
} from '@agoraio-extensions/cxx-parser';
import { ParseResult } from '@agoraio-extensions/terra-core';

let regMap: any = {
  isCallback: '.*(Observer|Handler|Callback|Receiver|Sink).*',
};

export function isMatch(str: string, type: string): boolean {
  let result = false;
  if (regMap[type]) {
    result = new RegExp(regMap[type]).test(str);
  }
  return result;
}

export function lowerFirstWord(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function upperFirstWord(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertToCamelCase(str: string, upperCamelCase = true): string {
  if (/^[A-Z]+$/.test(str)) {
    return str
      .split(' ')
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  if (str.indexOf('_') === -1) {
    if (!upperCamelCase) {
      return lowerFirstWord(str);
    } else {
      return str;
    }
  }
  let words = str.replace(/[-_]/g, ' ').split(' ');

  let camelCaseStr = words
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  if (!upperCamelCase) {
    camelCaseStr = lowerFirstWord(camelCaseStr);
  }

  return camelCaseStr;
}

export function deepClone(obj: any, skipKeys?: string[]) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (skipKeys?.includes(key)) {
      continue;
    }
    if (obj.hasOwnProperty(key)) {
      (clone as any)[key] = deepClone(obj[key], skipKeys);
    }
  }

  return clone;
}

export function findClazz(value: string, parseResult: ParseResult) {
  return (
    parseResult?.nodes.flatMap((f) => {
      let file = f as CXXFile;
      return file.nodes.filter((node) => node.__TYPE === CXXTYPE.Clazz);
    }) as Clazz[]
  ).filter((clazz: Clazz) => clazz.name === value);
}

export function findEnumz(value: string, parseResult: ParseResult) {
  return (
    parseResult?.nodes.flatMap((f) => {
      let file = f as CXXFile;
      return file.nodes.filter((node) => node.__TYPE === CXXTYPE.Enumz);
    }) as Enumz[]
  ).filter((enumz: Enumz) => enumz.name === value);
}

export function findStruct(value: string, parseResult: ParseResult) {
  return (
    parseResult?.nodes.flatMap((f) => {
      let file = f as CXXFile;
      return file.nodes.filter((node) => node.__TYPE === CXXTYPE.Struct);
    }) as Struct[]
  ).filter((struct: Struct) => struct.name === value);
}
