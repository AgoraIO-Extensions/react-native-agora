import './extension/IAgoraLogExtension';
/*
 * The output log level of the SDK.
 *
 */
export enum LogLevel {
/*
 * 0: Do not output any log information.
 */
  LogLevelNone = 0x0000,
/*
 * 0x0001: (Default) Output FATAL, ERROR, WARN, and INFO level log information. We recommend setting your log filter to this level.
 */
  LogLevelInfo = 0x0001,
/*
 * 0x0002: Output FATAL, ERROR, and WARN level log information.
 */
  LogLevelWarn = 0x0002,
/*
 * 0x0004: Output FATAL and ERROR level log information.
 */
  LogLevelError = 0x0004,
/*
 * 0x0008: Output FATAL level log information.
 */
  LogLevelFatal = 0x0008,
  /*
   * @ignore
   */
  LogLevelApiCall = 0x0010,
}

/*
 * The output log level of the SDK.
 *
 */
export enum LogFilterType {
/*
 * 0: Do not output any log information.
 */
  LogFilterOff = 0,
/*
 * 0x080f: Output all log information. Set your log filter to this level if you want to get the most complete log file.
 */
  LogFilterDebug = 0x080f,
/*
 * 0x000f: Output LogFilterCritical, LogFilterError, LogFilterWarn, and LogFilterInfo level log information. We recommend setting your log filter to this level.
 */
  LogFilterInfo = 0x000f,
/*
 * 0x000e: Output LogFilterCritical, LogFilterError, and LogFilterWarn level log information.
 */
  LogFilterWarn = 0x000e,
/*
 * 0x000c: Output LogFilterCritical and LogFilterError level log information.
 */
  LogFilterError = 0x000c,
/*
 * 0x0008: Output LogFilterCritical level log information.
 */
  LogFilterCritical = 0x0008,
  /*
   * @ignore
   */
  LogFilterMask = 0x80f,
}

/*
 * Configuration of Agora SDK log files.
 *
 */
export class LogConfig {
/*
 * The complete path of the log files. Ensure that the path for the log file exists and is writable. You can use this parameter to rename the log files.The default file path is:Android：/storage/emulated/0/Android/data/<packagename>/files/agorasdk.log.iOS：App Sandbox/Library/caches/agorasdk.log.
 */
  filePath?: string;
/*
 * The size (KB) of an agorasdk.log file. The value range is [128,1024]. The default value is 1,024 KB. If you set fileSizeInKByte to a value lower than 128 KB, the SDK adjusts it to 128 KB. If you set fileSizeInKBytes to a value higher than 1,024 KB, the SDK adjusts it to 1,024 KB.
 */
  fileSizeInKB?: number;
/*
 * The output level of the SDK log file. See LogLevel .For example, if you set the log level to WARN, the SDK outputs the logs within levels FATAL, ERROR, and WARN.
 */
  level?: LogLevel;
}