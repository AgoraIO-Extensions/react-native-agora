import './extension/IAgoraLogExtension';

/**
 * Log output level.
 */
export enum LogLevel {
  /**
   * 0: No log output.
   */
  LogLevelNone = 0x0000,
  /**
   * 0x0001: (Default) Outputs logs at FATAL, ERROR, WARN, and INFO levels. It is recommended to set the log level to this.
   */
  LogLevelInfo = 0x0001,
  /**
   * 0x0002: Outputs logs at FATAL, ERROR, and WARN levels only.
   */
  LogLevelWarn = 0x0002,
  /**
   * 0x0004: Outputs logs at FATAL and ERROR levels only.
   */
  LogLevelError = 0x0004,
  /**
   * 0x0008: Outputs logs at FATAL level only.
   */
  LogLevelFatal = 0x0008,
  /**
   * @ignore
   */
  LogLevelApiCall = 0x0010,
  /**
   * @ignore
   */
  LogLevelDebug = 0x0020,
}

/**
 * Log filter level.
 */
export enum LogFilterType {
  /**
   * 0: No log output.
   */
  LogFilterOff = 0,
  /**
   * 0x080f: Outputs all API log information. Set the log level to this if you want the most complete logs.
   */
  LogFilterDebug = 0x080f,
  /**
   * 0x000f: Outputs logs at LogFilterCritical, LogFilterError, LogFilterWarn, and LogFilterInfo levels. It is recommended to set the log level to this.
   */
  LogFilterInfo = 0x000f,
  /**
   * 0x000e: Outputs logs at LogFilterCritical, LogFilterError, and LogFilterWarn levels.
   */
  LogFilterWarn = 0x000e,
  /**
   * 0x000c: Outputs logs at LogFilterCritical and LogFilterError levels.
   */
  LogFilterError = 0x000c,
  /**
   * 0x0008: Outputs logs at LogFilterCritical level only.
   */
  LogFilterCritical = 0x0008,
  /**
   * @ignore
   */
  LogFilterMask = 0x80f,
}

/**
 * Configuration of the SDK log file.
 */
export class LogConfig {
  /**
   * Full path of the log file. Agora recommends using the default log path. If you need to change the default path, make sure the specified path exists and is writable.
   * Default paths:
   *  Android: /storage/emulated/0/Android/data/<packagename>/files/agorasdk.log
   *  iOS: App Sandbox/Library/caches/agorasdk.log
   */
  filePath?: string;
  /**
   * Size of a single agorasdk.log log file in KB. The value range is [128, 20480], and the default is 2,048 KB. If you set fileSizeInKByte to less than 128 KB, the SDK automatically adjusts it to 128 KB; if you set it to more than 20,480 KB, the SDK adjusts it to 20,480 KB.
   */
  fileSizeInKB?: number;
  /**
   * Log output level of the SDK. See LogLevel.
   * For example, if you choose the WARN level, you will see all logs at FATAL, ERROR, and WARN levels.
   */
  level?: LogLevel;
}
