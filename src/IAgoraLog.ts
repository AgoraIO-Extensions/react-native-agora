/*
 * 日志输出等级。
 */
export enum LogLevel {
  /*
   * 0: 不输出任何日志。
   */
  LogLevelNone = 0x0000,
  /*
   * 0x0001:（默认）输出 FATAL、ERROR、WARN、INFO 级别的日志。我们推荐你将日志级别设为该等级。
   */
  LogLevelInfo = 0x0001,
  /*
   * 0x0002: 仅输出 FATAL、ERROR、WARN 级别的日志。
   */
  LogLevelWarn = 0x0002,
  /*
   * 0x0004: 仅输出 FATAL、ERROR 级别的日志。
   */
  LogLevelError = 0x0004,
  /*
   * 0x0008: 仅输出 FATAL 级别的日志。
   */
  LogLevelFatal = 0x0008,
}

/*
 * 日志过滤等级。
 */
export enum LogFilterType {
  /*
   * 0: 不输出日志信息。
   */
  LogFilterOff = 0,
  /*
   * 0x080f: 输出所有 API 日志信息。如果你想获取最完整的日志，可以将日志级别设为该等级。
   */
  LogFilterDebug = 0x080f,
  /*
   * 0x000f: 输出 LogFilterCritical、LogFilterError、LogFilterWarn 和 LogFilterInfo 级别的日志信息。我们推荐你将日志级别设为该等级。
   */
  LogFilterInfo = 0x000f,
  /*
   * 0x000e: 输出 LogFilterCritical、LogFilterError 和 LogFilterWarn 级别的日志信息。
   */
  LogFilterWarn = 0x000e,
  /*
   * 0x000c: 输出 LogFilterCritical 和 LogFilterError 级别的日志信息。
   */
  LogFilterError = 0x000c,
  /*
   * 0x0008: 输出 LogFilterCritical 级别的日志信息。
   */
  LogFilterCritical = 0x0008,
  /*
   * TODO(doc)
   */
  LogFilterMask = 0x80f,
}

/*
 * Agora SDK 日志文件的配置。
 */
export class LogConfig {
  /*
   * 日志文件的完整路径。请确保你指定的目录存在且可写。你可以通过该参数修改日志文件名。
   * 默认路径为： Android：/storage/emulated/0/Android/data/<packagename>/files/agorasdk.log。
   * iOS：App Sandbox/Library/caches/agorasdk.log。
   */
  filePath?: string;
  /*
   * 单个 agorasdk.log 日志文件的大小，单位为 KB，取值范围为 [128,1024]，默认值为 1,024 KB。 如果你将 fileSizeInKByte 设为小于 128 KB，SDK 会自动调整到 128 KB；如果你将 fileSizeInKByte 设为大于 1,024 KB，SDK 会自动调整到 1,024 KB。
   */
  fileSizeInKB?: number;
  /*
   * Agora SDK 的日志输出等级，详见 LogLevel 。
   * 例如，如果你选择 WARN 级别，就可以看到在 FATAL、ERROR 和 WARN 级别上的所有日志信息。
   */
  level?: LogLevel;
}
