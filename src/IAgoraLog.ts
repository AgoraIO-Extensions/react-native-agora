import './extension/IAgoraLogExtension';
/* enum_loglevel */
export enum LogLevel {
/* enum_loglevel_LogLevelNone */
LogLevelNone = 0x0000,
/* enum_loglevel_LogLevelInfo */
LogLevelInfo = 0x0001,
/* enum_loglevel_LogLevelWarn */
LogLevelWarn = 0x0002,
/* enum_loglevel_LogLevelError */
LogLevelError = 0x0004,
/* enum_loglevel_LogLevelFatal */
LogLevelFatal = 0x0008,
/* enum_loglevel_LogLevelApiCall */
LogLevelApiCall = 0x0010,
}

/* enum_logfiltertype */
export enum LogFilterType {
/* enum_logfiltertype_LogFilterOff */
LogFilterOff = 0,
/* enum_logfiltertype_LogFilterDebug */
LogFilterDebug = 0x080f,
/* enum_logfiltertype_LogFilterInfo */
LogFilterInfo = 0x000f,
/* enum_logfiltertype_LogFilterWarn */
LogFilterWarn = 0x000e,
/* enum_logfiltertype_LogFilterError */
LogFilterError = 0x000c,
/* enum_logfiltertype_LogFilterCritical */
LogFilterCritical = 0x0008,
/* enum_logfiltertype_LogFilterMask */
LogFilterMask = 0x80f,
}

/* class_logconfig */
export class LogConfig {
  /* class_logconfig_filePath */
  filePath?: string
  /* class_logconfig_fileSizeInKB */
  fileSizeInKB?: number
  /* class_logconfig_level */
  level?: LogLevel
}
