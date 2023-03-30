import { callIrisApi } from '../internal/IrisApiEngine'
// @ts-ignore
export class IMediaRecorderImpl implements IMediaRecorder {
  setMediaRecorderObserver (connection: RtcConnection, callback: IMediaRecorderObserver): number {
    const apiType = this.getApiTypeFromSetMediaRecorderObserver(connection, callback)
    const jsonParams = {
      'connection': connection, 
      'callback': callback,
      toJSON: () => {
        return {
          'connection': connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromSetMediaRecorderObserver (connection: RtcConnection, callback: IMediaRecorderObserver): string {
    return 'MediaRecorder_setMediaRecorderObserver'
  }

  startRecording (connection: RtcConnection, config: MediaRecorderConfiguration): number {
    const apiType = this.getApiTypeFromStartRecording(connection, config)
    const jsonParams = {
      'connection': connection, 
      'config': config,
      toJSON: () => {
        return {
          'connection': connection, 
          'config': config
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromStartRecording (connection: RtcConnection, config: MediaRecorderConfiguration): string {
    return 'MediaRecorder_startRecording'
  }

  stopRecording (connection: RtcConnection): number {
    const apiType = this.getApiTypeFromStopRecording(connection)
    const jsonParams = {
      'connection': connection,
      toJSON: () => {
        return {
          'connection': connection
        }
      }
    }
    const jsonResults = callIrisApi.call(this, apiType, jsonParams)
    return jsonResults.result
  }

  protected getApiTypeFromStopRecording (connection: RtcConnection): string {
    return 'MediaRecorder_stopRecording'
  }

  release (): void {
    const apiType = this.getApiTypeFromRelease()
    const jsonParams = {
    }
    callIrisApi.call(this, apiType, jsonParams)
  }

  protected getApiTypeFromRelease (): string {
    return 'MediaRecorder_release'
  }
}
