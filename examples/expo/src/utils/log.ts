import { Alert } from 'react-native';

export const _logSink = (
  level: 'debug' | 'log' | 'info' | 'warn' | 'error',
  message?: any,
  ...optionalParams: any[]
): string => {
  if (level === 'error' && !__DEV__) {
    alert(message);
  } else {
    console[level](message, ...optionalParams);
  }
  const content = `${optionalParams.map((v) => JSON.stringify(v))}`;
  return content;
};

export const debug = (message?: any, ...optionalParams: any[]): void => {
  alert(message, _logSink('debug', message, optionalParams));
};

export const log = (message?: any, ...optionalParams: any[]): void => {
  _logSink('log', message, optionalParams);
};

export const info = (message?: any, ...optionalParams: any[]): void => {
  _logSink('info', message, optionalParams);
};

export const warn = (message?: any, ...optionalParams: any[]): void => {
  _logSink('warn', message, optionalParams);
};

export const error = (message?: any, ...optionalParams: any[]): void => {
  _logSink('error', message, optionalParams);
};

export const alert = (title: string, message?: string): void => {
  Alert.alert(title, message);
};
