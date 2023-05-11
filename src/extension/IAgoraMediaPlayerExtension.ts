import { IAudioPcmFrameSink, IAudioSpectrumObserver } from '../AgoraMediaBase';
import { IMediaPlayerVideoFrameObserver } from '../IAgoraMediaPlayer';
import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';

export type IMediaPlayerEvent = IMediaPlayerSourceObserver &
  IAudioPcmFrameSink &
  IMediaPlayerVideoFrameObserver &
  IAudioSpectrumObserver;

declare module '../IAgoraMediaPlayer' {
  interface IMediaPlayer {
    _addListenerPreCheck<EventType extends keyof IMediaPlayerEvent>(
      eventType: EventType
    ): boolean;

    /**
     * Adds one IMediaPlayerEvent listener.
     * After calling this method, you can listen for the corresponding events in the IMediaPlayer object and obtain data through IMediaPlayerEvent. Depending on your project needs, you can add multiple listeners for the same event.
     *
     * @param eventType The name of the target event to listen for. See IMediaPlayerEvent.
     *
     * @param listener The callback function for eventType. Take adding a listener for onPlayerSourceStateChanged as an example: // Create an onPlayerSourceStateChanged object
     * const onPlayerSourceStateChanged = (connection: RtcConnection, elapsed: number) => {};
     * // Add one onPlayerSourceStateChanged listener
     * engine.addListener('onPlayerSourceStateChanged', onPlayerSourceStateChanged);
     */
    addListener<EventType extends keyof IMediaPlayerEvent>(
      eventType: EventType,
      listener: IMediaPlayerEvent[EventType]
    ): void;

    /**
     * Removes the specified IMediaPlayerEvent listener.
     * For listened events, if you no longer need to receive the callback message, you can call this method to remove the corresponding listener.
     *
     * @param eventType The name of the target event to listen for. See IMediaPlayerEvent.
     *
     * @param listener The callback function for eventType. Must pass in the same function object in addListener . Take removing the listener for onPlayerSourceStateChanged as an example: // Create an onPlayerSourceStateChanged object
     * const onPlayerSourceStateChanged = (state: MediaPlayerState, ec: MediaPlayerError) => {};
     * // Add one onPlayerSourceStateChanged listener
     * engine.addListener('onPlayerSourceStateChanged', onPlayerSourceStateChanged);
     * // Remove the onPlayerSourceStateChanged listener
     * engine.removeListener('onPlayerSourceStateChanged', onPlayerSourceStateChanged);
     */
    removeListener<EventType extends keyof IMediaPlayerEvent>(
      eventType: EventType,
      listener: IMediaPlayerEvent[EventType]
    ): void;

    /**
     * Removes all listeners for the specified event.
     *
     * @param eventType The name of the target event to listen for. See IMediaPlayerEvent.
     */
    removeAllListeners<EventType extends keyof IMediaPlayerEvent>(
      eventType?: EventType
    ): void;

    /**
     * @ignore
     */
    release(): void;
  }
}
