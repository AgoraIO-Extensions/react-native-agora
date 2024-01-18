import './extension/IAgoraH265TranscoderExtension';

/* enum_H265TranscodeResult */
export enum H265TranscodeResult {
  /* enum_H265TranscodeResult_H265TranscodeResultUnknown */
  H265TranscodeResultUnknown = -1,
  /* enum_H265TranscodeResult_H265TranscodeResultSuccess */
  H265TranscodeResultSuccess = 0,
  /* enum_H265TranscodeResult_H265TranscodeResultRequestInvalid */
  H265TranscodeResultRequestInvalid = 1,
  /* enum_H265TranscodeResult_H265TranscodeResultUnauthorized */
  H265TranscodeResultUnauthorized = 2,
  /* enum_H265TranscodeResult_H265TranscodeResultTokenExpired */
  H265TranscodeResultTokenExpired = 3,
  /* enum_H265TranscodeResult_H265TranscodeResultForbidden */
  H265TranscodeResultForbidden = 4,
  /* enum_H265TranscodeResult_H265TranscodeResultNotFound */
  H265TranscodeResultNotFound = 5,
  /* enum_H265TranscodeResult_H265TranscodeResultConflicted */
  H265TranscodeResultConflicted = 6,
  /* enum_H265TranscodeResult_H265TranscodeResultNotSupported */
  H265TranscodeResultNotSupported = 7,
  /* enum_H265TranscodeResult_H265TranscodeResultTooOften */
  H265TranscodeResultTooOften = 8,
  /* enum_H265TranscodeResult_H265TranscodeResultServerInternalError */
  H265TranscodeResultServerInternalError = 9,
  /* enum_H265TranscodeResult_H265TranscodeResultServiceUnavailable */
  H265TranscodeResultServiceUnavailable = 10,
}

/* class_IH265TranscoderObserver */
export interface IH265TranscoderObserver {
  /* callback_IH265TranscoderObserver_onEnableTranscode */

  onEnableTranscode?(result: H265TranscodeResult): void;
  /* callback_IH265TranscoderObserver_onQueryChannel */

  onQueryChannel?(
    result: H265TranscodeResult,
    originChannel: string,
    transcodeChannel: string
  ): void;
  /* callback_IH265TranscoderObserver_onTriggerTranscode */

  onTriggerTranscode?(result: H265TranscodeResult): void;
}

/* class_IH265Transcoder */
export abstract class IH265Transcoder {
  /* api_IH265Transcoder_enableTranscode */

  abstract enableTranscode(token: string, channel: string, uid: number): number;
  /* api_IH265Transcoder_queryChannel */

  abstract queryChannel(token: string, channel: string, uid: number): number;
  /* api_IH265Transcoder_triggerTranscode */

  abstract triggerTranscode(
    token: string,
    channel: string,
    uid: number
  ): number;
  /* api_IH265Transcoder_registerTranscoderObserver */

  abstract registerTranscoderObserver(
    observer: IH265TranscoderObserver
  ): number;
  /* api_IH265Transcoder_unregisterTranscoderObserver */

  abstract unregisterTranscoderObserver(
    observer: IH265TranscoderObserver
  ): number;
}
