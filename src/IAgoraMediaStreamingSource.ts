import './extension/IAgoraMediaStreamingSourceExtension';
/* enum_streamingsrcerr */
export enum StreamingSrcErr {
  /* enum_streamingsrcerr_StreamingSrcErrNone */
  StreamingSrcErrNone = 0,
  /* enum_streamingsrcerr_StreamingSrcErrUnknown */
  StreamingSrcErrUnknown = 1,
  /* enum_streamingsrcerr_StreamingSrcErrInvalidParam */
  StreamingSrcErrInvalidParam = 2,
  /* enum_streamingsrcerr_StreamingSrcErrBadState */
  StreamingSrcErrBadState = 3,
  /* enum_streamingsrcerr_StreamingSrcErrNoMem */
  StreamingSrcErrNoMem = 4,
  /* enum_streamingsrcerr_StreamingSrcErrBufferOverflow */
  StreamingSrcErrBufferOverflow = 5,
  /* enum_streamingsrcerr_StreamingSrcErrBufferUnderflow */
  StreamingSrcErrBufferUnderflow = 6,
  /* enum_streamingsrcerr_StreamingSrcErrNotFound */
  StreamingSrcErrNotFound = 7,
  /* enum_streamingsrcerr_StreamingSrcErrTimeout */
  StreamingSrcErrTimeout = 8,
  /* enum_streamingsrcerr_StreamingSrcErrExpired */
  StreamingSrcErrExpired = 9,
  /* enum_streamingsrcerr_StreamingSrcErrUnsupported */
  StreamingSrcErrUnsupported = 10,
  /* enum_streamingsrcerr_StreamingSrcErrNotExist */
  StreamingSrcErrNotExist = 11,
  /* enum_streamingsrcerr_StreamingSrcErrExist */
  StreamingSrcErrExist = 12,
  /* enum_streamingsrcerr_StreamingSrcErrOpen */
  StreamingSrcErrOpen = 13,
  /* enum_streamingsrcerr_StreamingSrcErrClose */
  StreamingSrcErrClose = 14,
  /* enum_streamingsrcerr_StreamingSrcErrRead */
  StreamingSrcErrRead = 15,
  /* enum_streamingsrcerr_StreamingSrcErrWrite */
  StreamingSrcErrWrite = 16,
  /* enum_streamingsrcerr_StreamingSrcErrSeek */
  StreamingSrcErrSeek = 17,
  /* enum_streamingsrcerr_StreamingSrcErrEof */
  StreamingSrcErrEof = 18,
  /* enum_streamingsrcerr_StreamingSrcErrCodecopen */
  StreamingSrcErrCodecopen = 19,
  /* enum_streamingsrcerr_StreamingSrcErrCodecclose */
  StreamingSrcErrCodecclose = 20,
  /* enum_streamingsrcerr_StreamingSrcErrCodecproc */
  StreamingSrcErrCodecproc = 21,
}

/* enum_streamingsrcstate */
export enum StreamingSrcState {
  /* enum_streamingsrcstate_StreamingSrcStateClosed */
  StreamingSrcStateClosed = 0,
  /* enum_streamingsrcstate_StreamingSrcStateOpening */
  StreamingSrcStateOpening = 1,
  /* enum_streamingsrcstate_StreamingSrcStateIdle */
  StreamingSrcStateIdle = 2,
  /* enum_streamingsrcstate_StreamingSrcStatePlaying */
  StreamingSrcStatePlaying = 3,
  /* enum_streamingsrcstate_StreamingSrcStateSeeking */
  StreamingSrcStateSeeking = 4,
  /* enum_streamingsrcstate_StreamingSrcStateEof */
  StreamingSrcStateEof = 5,
  /* enum_streamingsrcstate_StreamingSrcStateError */
  StreamingSrcStateError = 6,
}

/* class_inputseidata */
export class InputSeiData {
  /* class_inputseidata_type */
  type?: number;
  /* class_inputseidata_timestamp */
  timestamp?: number;
  /* class_inputseidata_frame_index */
  frame_index?: number;
  /* class_inputseidata_private_data */
  private_data?: Uint8Array;
  /* class_inputseidata_data_size */
  data_size?: number;
}
