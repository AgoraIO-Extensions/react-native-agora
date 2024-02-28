import './extension/IAgoraMediaStreamingSourceExtension';

/* enum_StreamingSrcErr */
export enum StreamingSrcErr {
  /* enum_StreamingSrcErr_StreamingSrcErrNone */
  StreamingSrcErrNone = 0,
  /* enum_StreamingSrcErr_StreamingSrcErrUnknown */
  StreamingSrcErrUnknown = 1,
  /* enum_StreamingSrcErr_StreamingSrcErrInvalidParam */
  StreamingSrcErrInvalidParam = 2,
  /* enum_StreamingSrcErr_StreamingSrcErrBadState */
  StreamingSrcErrBadState = 3,
  /* enum_StreamingSrcErr_StreamingSrcErrNoMem */
  StreamingSrcErrNoMem = 4,
  /* enum_StreamingSrcErr_StreamingSrcErrBufferOverflow */
  StreamingSrcErrBufferOverflow = 5,
  /* enum_StreamingSrcErr_StreamingSrcErrBufferUnderflow */
  StreamingSrcErrBufferUnderflow = 6,
  /* enum_StreamingSrcErr_StreamingSrcErrNotFound */
  StreamingSrcErrNotFound = 7,
  /* enum_StreamingSrcErr_StreamingSrcErrTimeout */
  StreamingSrcErrTimeout = 8,
  /* enum_StreamingSrcErr_StreamingSrcErrExpired */
  StreamingSrcErrExpired = 9,
  /* enum_StreamingSrcErr_StreamingSrcErrUnsupported */
  StreamingSrcErrUnsupported = 10,
  /* enum_StreamingSrcErr_StreamingSrcErrNotExist */
  StreamingSrcErrNotExist = 11,
  /* enum_StreamingSrcErr_StreamingSrcErrExist */
  StreamingSrcErrExist = 12,
  /* enum_StreamingSrcErr_StreamingSrcErrOpen */
  StreamingSrcErrOpen = 13,
  /* enum_StreamingSrcErr_StreamingSrcErrClose */
  StreamingSrcErrClose = 14,
  /* enum_StreamingSrcErr_StreamingSrcErrRead */
  StreamingSrcErrRead = 15,
  /* enum_StreamingSrcErr_StreamingSrcErrWrite */
  StreamingSrcErrWrite = 16,
  /* enum_StreamingSrcErr_StreamingSrcErrSeek */
  StreamingSrcErrSeek = 17,
  /* enum_StreamingSrcErr_StreamingSrcErrEof */
  StreamingSrcErrEof = 18,
  /* enum_StreamingSrcErr_StreamingSrcErrCodecopen */
  StreamingSrcErrCodecopen = 19,
  /* enum_StreamingSrcErr_StreamingSrcErrCodecclose */
  StreamingSrcErrCodecclose = 20,
  /* enum_StreamingSrcErr_StreamingSrcErrCodecproc */
  StreamingSrcErrCodecproc = 21,
}

/* enum_StreamingSrcState */
export enum StreamingSrcState {
  /* enum_StreamingSrcState_StreamingSrcStateClosed */
  StreamingSrcStateClosed = 0,
  /* enum_StreamingSrcState_StreamingSrcStateOpening */
  StreamingSrcStateOpening = 1,
  /* enum_StreamingSrcState_StreamingSrcStateIdle */
  StreamingSrcStateIdle = 2,
  /* enum_StreamingSrcState_StreamingSrcStatePlaying */
  StreamingSrcStatePlaying = 3,
  /* enum_StreamingSrcState_StreamingSrcStateSeeking */
  StreamingSrcStateSeeking = 4,
  /* enum_StreamingSrcState_StreamingSrcStateEof */
  StreamingSrcStateEof = 5,
  /* enum_StreamingSrcState_StreamingSrcStateError */
  StreamingSrcStateError = 6,
}

/* class_InputSeiData */
export class InputSeiData {
  /* class_InputSeiData_type */
  type?: number;
  /* class_InputSeiData_timestamp */
  timestamp?: number;
  /* class_InputSeiData_frame_index */
  frame_index?: number;
  /* class_InputSeiData_private_data */
  private_data?: Uint8Array;
  /* class_InputSeiData_data_size */
  data_size?: number;
}
