import {
  IH265Transcoder,
  IH265TranscoderObserver,
} from '../IAgoraH265Transcoder';
import { callIrisApi } from '../internal/call';

export function processIH265TranscoderObserver(
  handler: IH265TranscoderObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onEnableTranscode':
      if (handler.onEnableTranscode !== undefined) {
        handler.onEnableTranscode(jsonParams.result);
      }
      break;

    case 'onQueryChannel':
      if (handler.onQueryChannel !== undefined) {
        handler.onQueryChannel(
          jsonParams.result,
          jsonParams.originChannel,
          jsonParams.transcodeChannel
        );
      }
      break;

    case 'onTriggerTranscode':
      if (handler.onTriggerTranscode !== undefined) {
        handler.onTriggerTranscode(jsonParams.result);
      }
      break;
  }
}

// @ts-ignore
export class IH265TranscoderImpl implements IH265Transcoder {
  enableTranscode(token: string, channel: string, uid: number): number {
    const apiType = this.getApiTypeFromEnableTranscode(token, channel, uid);
    const jsonParams = {
      token: token,
      channel: channel,
      uid: uid,
      toJSON: () => {
        return {
          token: token,
          channel: channel,
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromEnableTranscode(
    token: string,
    channel: string,
    uid: number
  ): string {
    return 'H265Transcoder_enableTranscode_a0779eb';
  }

  queryChannel(token: string, channel: string, uid: number): number {
    const apiType = this.getApiTypeFromQueryChannel(token, channel, uid);
    const jsonParams = {
      token: token,
      channel: channel,
      uid: uid,
      toJSON: () => {
        return {
          token: token,
          channel: channel,
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromQueryChannel(
    token: string,
    channel: string,
    uid: number
  ): string {
    return 'H265Transcoder_queryChannel_a0779eb';
  }

  triggerTranscode(token: string, channel: string, uid: number): number {
    const apiType = this.getApiTypeFromTriggerTranscode(token, channel, uid);
    const jsonParams = {
      token: token,
      channel: channel,
      uid: uid,
      toJSON: () => {
        return {
          token: token,
          channel: channel,
          uid: uid,
        };
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromTriggerTranscode(
    token: string,
    channel: string,
    uid: number
  ): string {
    return 'H265Transcoder_triggerTranscode_a0779eb';
  }

  registerTranscoderObserver(observer: IH265TranscoderObserver): number {
    const apiType = this.getApiTypeFromRegisterTranscoderObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromRegisterTranscoderObserver(
    observer: IH265TranscoderObserver
  ): string {
    return 'H265Transcoder_registerTranscoderObserver_e1ee996';
  }

  unregisterTranscoderObserver(observer: IH265TranscoderObserver): number {
    const apiType = this.getApiTypeFromUnregisterTranscoderObserver(observer);
    const jsonParams = {
      observer: observer,
      toJSON: () => {
        return {};
      },
    };
    const jsonResults = callIrisApi.call(this, apiType, jsonParams);
    return jsonResults.result;
  }

  protected getApiTypeFromUnregisterTranscoderObserver(
    observer: IH265TranscoderObserver
  ): string {
    return 'H265Transcoder_unregisterTranscoderObserver_e1ee996';
  }
}
