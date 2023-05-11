import { IAudioEncodedFrameObserver } from '../AgoraBase';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';
import {
  IDirectCdnStreamingEventHandler,
  IMetadataObserver,
  IRtcEngineEventHandler,
} from '../IAgoraRtcEngine';

export type IRtcEngineEvent = IRtcEngineEventHandler &
  IDirectCdnStreamingEventHandler &
  IMetadataObserver &
  IAudioEncodedFrameObserver &
  IAudioSpectrumObserver;

declare module '../IAgoraRtcEngine' {
  interface IRtcEngine {
    _addListenerPreCheck<EventType extends keyof IRtcEngineEvent>(
      eventType: EventType
    ): boolean;

    /**
     * Adds one IRtcEngineEvent listener.
     * After calling this method, you can listen for the corresponding events in the IRtcEngine object and obtain data through IRtcEngineEvent. Depending on your project needs, you can add multiple listeners for the same event.
     *
     * @param eventType The name of the target event to listen for. See IRtcEngineEvent.
     *
     * @param listener The callback function for eventType. Take adding a listener for onJoinChannelSuccess as an example: // Create an onJoinChannelSuccess object
     * const onJoinChannelSuccess = (connection: RtcConnection, elapsed: number) => {};
     * // Add one onJoinChannelSuccess listener
     * engine.addListener('onJoinChannelSuccess', onJoinChannelSuccess);
     */
    addListener<EventType extends keyof IRtcEngineEvent>(
      eventType: EventType,
      listener: IRtcEngineEvent[EventType]
    ): void;

    /**
     * Removes the specified IRtcEngineEvent listener.
     * For listened events, if you no longer need to receive the callback message, you can call this method to remove the corresponding listener.
     *
     * @param eventType The name of the target event to listen for. See IRtcEngineEvent.
     *
     * @param listener The callback function for eventType. Must pass in the same function object in addListener . Take removing the listener for onJoinChannelSuccess as an example: // Create an onJoinChannelSuccess object
     * const onJoinChannelSuccess = (connection: RtcConnection, elapsed: number) => {};
     * // Add one onJoinChannelSuccess listener
     * engine.addListener('onJoinChannelSuccess', onJoinChannelSuccess);
     * // Remove the onJoinChannelSuccess listener
     * engine.removeListener('onJoinChannelSuccess', onJoinChannelSuccess);
     */
    removeListener<EventType extends keyof IRtcEngineEvent>(
      eventType: EventType,
      listener: IRtcEngineEvent[EventType]
    ): void;

    /**
     * Removes all listeners for the specified event.
     *
     * @param eventType The name of the target event to listen for. See IRtcEngineEvent.
     */
    removeAllListeners<EventType extends keyof IRtcEngineEvent>(
      eventType?: EventType
    ): void;
  }
}
