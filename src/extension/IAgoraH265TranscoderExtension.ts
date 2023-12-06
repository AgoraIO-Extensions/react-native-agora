import { IH265TranscoderObserver } from '../IAgoraH265Transcoder';

export type IH265TranscoderEvent = IH265TranscoderObserver;

declare module '../IAgoraH265Transcoder' {
  interface IH265Transcoder {
    _addListenerPreCheck<EventType extends keyof IH265TranscoderEvent>(
      eventType: EventType
    ): boolean;

    /**
     * @ignore
     */
    addListener<EventType extends keyof IH265TranscoderEvent>(
      eventType: EventType,
      listener: IH265TranscoderEvent[EventType]
    ): void;

    /**
     * @ignore
     */
    removeListener<EventType extends keyof IH265TranscoderEvent>(
      eventType: EventType,
      listener?: IH265TranscoderEvent[EventType]
    ): void;

    /**
     * @ignore
     */
    removeAllListeners<EventType extends keyof IH265TranscoderEvent>(
      eventType?: EventType
    ): void;
  }
}
