import { IMediaRecorderObserver } from '../AgoraMediaBase';
import { EmitterSubscription } from '../internal/emitter/EventEmitter';

export type IMediaRecorderEvent = IMediaRecorderObserver;

declare module '../IAgoraMediaRecorder' {
  interface IMediaRecorder {
    _addListenerPreCheck<EventType extends keyof IMediaRecorderEvent>(
      eventType: EventType
    ): boolean;

    /**
     * Adds one IMediaRecorderEvent listener.
     * After calling this method, you can listen for the corresponding events in the IMediaRecorder object and obtain data through IMediaRecorderEvent. Depending on your project needs, you can add multiple listeners for the same event.
     *
     * @param eventType The name of the target event to listen for. See IMediaRecorderEvent.
     *
     * @param listener The callback function for eventType. Take adding a listener for onRecorderStateChanged as an example: // Create an onRecorderStateChanged object
     * const onRecorderStateChanged = (state: RecorderState, error: RecorderErrorCode) => {};
     * // Add one onRecorderStateChanged listener
     * engine.addListener('onRecorderStateChanged', onRecorderStateChanged);
     *
     * @returns
     * The native interface EventSubscription in React Native API.
     */
    addListener<EventType extends keyof IMediaRecorderEvent>(
      eventType: EventType,
      listener: IMediaRecorderEvent[EventType]
    ): EmitterSubscription;

    /**
     * Removes the specified IMediaRecorderEvent listener.
     * For listened events, if you no longer need to receive the callback message, you can call this method to remove the corresponding listener.
     *
     * @param eventType The name of the target event to listen for. See IMediaRecorderEvent.
     *
     * @param listener The callback function for eventType. Must pass in the same function object in addListener . Take removing the listener for onRecorderStateChanged as an example: // Create an onRecorderStateChanged object
     * const onRecorderStateChanged = (state: RecorderState, error: RecorderErrorCode) => {};
     * // Add one onRecorderStateChanged listener
     * engine.addListener('onRecorderStateChanged', onRecorderStateChanged);
     * // Remove the onRecorderStateChanged listener
     * engine.removeListener('onRecorderStateChanged', onRecorderStateChanged);
     */
    removeListener<EventType extends keyof IMediaRecorderEvent>(
      eventType: EventType,
      listener: IMediaRecorderEvent[EventType]
    ): void;

    /**
     * Removes all listeners for the specified event.
     *
     * @param eventType The name of the target event to listen for. See IMediaRecorderEvent.
     */
    removeAllListeners<EventType extends keyof IMediaRecorderEvent>(
      eventType?: EventType
    ): void;
  }
}
