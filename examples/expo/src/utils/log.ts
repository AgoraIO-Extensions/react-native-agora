import { Alert } from 'react-native';

class LogSink {
  _data: Array<string> = [];

  sink(
    level: 'debug' | 'log' | 'info' | 'warn' | 'error',
    message?: any,
    ...optionalParams: any[]
  ): string {
    if (level === 'error' && !__DEV__) {
      alert(message);
    } else {
      console[level](message, ...optionalParams);
    }
    const content = `${optionalParams.map((v) => JSON.stringify(v))}`;
    this._data.splice(0, 0, `[${level}] ${message} ${content}`);
    return content;
  }

  clearData() {
    this._data = [];
  }
}

export const logSink = new LogSink();

export const debug = (message?: any, ...optionalParams: any[]): void => {
  alert(message, logSink.sink('debug', message, optionalParams));
};

export const log = (message?: any, ...optionalParams: any[]): void => {
  logSink.sink('log', message, optionalParams);
};

export const info = (message?: any, ...optionalParams: any[]): void => {
  logSink.sink('info', message, optionalParams);
};

export const warn = (message?: any, ...optionalParams: any[]): void => {
  logSink.sink('warn', message, optionalParams);
};

export const error = (message?: any, ...optionalParams: any[]): void => {
  logSink.sink('error', message, optionalParams);
};

export const alert = (title: string, message?: string): void => {
  Alert.alert(title, message);
};
