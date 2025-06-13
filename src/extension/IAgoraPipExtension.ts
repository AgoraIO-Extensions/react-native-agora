import { AgoraPipStateChangedObserver } from '../IAgoraPip';

export type IAgoraPipEvent = AgoraPipStateChangedObserver;

declare module '../IAgoraPip' {
  interface AgoraPip {
    /**
     * @ignore
     */
    _addListenerPreCheck<EventType extends keyof IAgoraPipEvent>(
      eventType: EventType
    ): boolean;

    /**
     * @ignore
     */
    addListener<EventType extends keyof IAgoraPipEvent>(
      eventType: EventType,
      listener: IAgoraPipEvent[EventType]
    ): void;

    /**
     * @ignore
     */
    removeListener<EventType extends keyof IAgoraPipEvent>(
      eventType: EventType,
      listener?: IAgoraPipEvent[EventType]
    ): void;

    /**
     * @ignore
     */
    removeAllListeners<EventType extends keyof IAgoraPipEvent>(
      eventType?: EventType
    ): void;
  }
}
