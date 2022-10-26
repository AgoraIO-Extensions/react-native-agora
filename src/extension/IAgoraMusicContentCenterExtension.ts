import { IMusicContentCenterEventHandler } from '../IAgoraMusicContentCenter';
import { EmitterSubscription } from '../internal/emitter/EventEmitter';

export type IMusicContentCenterEvent = IMusicContentCenterEventHandler;

declare module '../IAgoraMusicContentCenter' {
  interface IMusicContentCenter {
    addListener<EventType extends keyof IMusicContentCenterEvent>(
      eventType: EventType,
      listener: IMusicContentCenterEvent[EventType]
    ): EmitterSubscription;

    removeListener<EventType extends keyof IMusicContentCenterEvent>(
      eventType: EventType,
      listener: IMusicContentCenterEvent[EventType]
    ): void;

    removeAllListeners<EventType extends keyof IMusicContentCenterEvent>(
      eventType?: EventType
    ): void;
  }
}
