import './extension/IAgoraH265TranscoderExtension';
/* enum_h265transcoderesult */
export enum H265TranscodeResult {
  /* enum_h265transcoderesult_H265TranscodeResultUnknown */
  H265TranscodeResultUnknown = -1,
  /* enum_h265transcoderesult_H265TranscodeResultSuccess */
  H265TranscodeResultSuccess = 0,
  /* enum_h265transcoderesult_H265TranscodeResultRequestInvalid */
  H265TranscodeResultRequestInvalid = 1,
  /* enum_h265transcoderesult_H265TranscodeResultUnauthorized */
  H265TranscodeResultUnauthorized = 2,
  /* enum_h265transcoderesult_H265TranscodeResultTokenExpired */
  H265TranscodeResultTokenExpired = 3,
  /* enum_h265transcoderesult_H265TranscodeResultForbidden */
  H265TranscodeResultForbidden = 4,
  /* enum_h265transcoderesult_H265TranscodeResultNotFound */
  H265TranscodeResultNotFound = 5,
  /* enum_h265transcoderesult_H265TranscodeResultConflicted */
  H265TranscodeResultConflicted = 6,
  /* enum_h265transcoderesult_H265TranscodeResultNotSupported */
  H265TranscodeResultNotSupported = 7,
  /* enum_h265transcoderesult_H265TranscodeResultTooOften */
  H265TranscodeResultTooOften = 8,
  /* enum_h265transcoderesult_H265TranscodeResultServerInternalError */
  H265TranscodeResultServerInternalError = 9,
  /* enum_h265transcoderesult_H265TranscodeResultServiceUnavailable */
  H265TranscodeResultServiceUnavailable = 10,
}

/* class_ih265transcoderobserver */
export interface IH265TranscoderObserver {
  /* callback_ih265transcoderobserver_onenabletranscode */
  onEnableTranscode?(result: H265TranscodeResult): void;

  /* callback_ih265transcoderobserver_onquerychannel */
  onQueryChannel?(
    result: H265TranscodeResult,
    originChannel: string,
    transcodeChannel: string
  ): void;

  /* callback_ih265transcoderobserver_ontriggertranscode */
  onTriggerTranscode?(result: H265TranscodeResult): void;
}

/* class_ih265transcoder */
export abstract class IH265Transcoder {
  /* api_ih265transcoder_enabletranscode */
  abstract enableTranscode(token: string, channel: string, uid: number): number;

  /* api_ih265transcoder_querychannel */
  abstract queryChannel(token: string, channel: string, uid: number): number;

  /* api_ih265transcoder_triggertranscode */
  abstract triggerTranscode(
    token: string,
    channel: string,
    uid: number
  ): number;

  /* api_ih265transcoder_registertranscoderobserver */
  abstract registerTranscoderObserver(
    observer: IH265TranscoderObserver
  ): number;

  /* api_ih265transcoder_unregistertranscoderobserver */
  abstract unregisterTranscoderObserver(
    observer: IH265TranscoderObserver
  ): number;
}
