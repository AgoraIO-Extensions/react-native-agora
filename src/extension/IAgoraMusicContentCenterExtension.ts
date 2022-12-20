import { IMusicContentCenterEventHandler } from '../IAgoraMusicContentCenter';
import { EmitterSubscription } from '../internal/emitter/EventEmitter';

export type IMusicContentCenterEvent = IMusicContentCenterEventHandler;

declare module '../IAgoraMusicContentCenter' {
  interface IMusicContentCenter {
    _addListenerPreCheck<EventType extends keyof IMusicContentCenterEvent>(
      eventType: EventType
    ): boolean;

    /**
     * @ignore
     */
    addListener<EventType extends keyof IMusicContentCenterEvent>(
      eventType: EventType,
      listener: IMusicContentCenterEvent[EventType]
    ): EmitterSubscription;

    /**
     * @ignore
     */
    removeListener<EventType extends keyof IMusicContentCenterEvent>(
      eventType: EventType,
      listener: IMusicContentCenterEvent[EventType]
    ): void;

    /**
     * @ignore
     */
    removeAllListeners<EventType extends keyof IMusicContentCenterEvent>(
      eventType?: EventType
    ): void;
  }
}
