import './extension/IAgoraMediaRecorderExtension';
/* class_imediarecorder */
export abstract class IMediaRecorder {
/* api_imediarecorder_setmediarecorderobserver */
abstract setMediaRecorderObserver(connection: RtcConnection, callback: IMediaRecorderObserver): number;

/* api_imediarecorder_startrecording */
abstract startRecording(connection: RtcConnection, config: MediaRecorderConfiguration): number;

/* api_imediarecorder_stoprecording */
abstract stopRecording(connection: RtcConnection): number;

/* api_imediarecorder_release */
abstract release(): void;
}
