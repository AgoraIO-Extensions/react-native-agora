import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import {
  IMediaPlayerAudioFrameObserver,
  IMediaPlayerVideoFrameObserver,
} from '../IAgoraMediaPlayer';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';
import { EmitterSubscription } from '../internal/emitter/EventEmitter';

export type IMediaPlayerEvent = IMediaPlayerSourceObserver &
  IMediaPlayerAudioFrameObserver &
  IMediaPlayerVideoFrameObserver &
  IAudioSpectrumObserver;

declare module '../IAgoraMediaPlayer' {
  interface IMediaPlayer {
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
     *
     * @returns
     * The native interface EventSubscription in React Native API.
     */
    addListener<EventType extends keyof IMediaPlayerEvent>(
      eventType: EventType,
      listener: IMediaPlayerEvent[EventType]
    ): EmitterSubscription;

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
