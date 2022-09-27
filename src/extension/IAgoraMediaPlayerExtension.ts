import { EventSubscription } from 'react-native';

import { IMediaPlayerSourceObserver } from '../IAgoraMediaPlayerSource';
import {
  IMediaPlayerAudioFrameObserver,
  IMediaPlayerVideoFrameObserver,
} from '../IAgoraMediaPlayer';
import { IAudioSpectrumObserver } from '../AgoraMediaBase';

export type IMediaPlayerEvent = IMediaPlayerSourceObserver &
  IMediaPlayerAudioFrameObserver &
  IMediaPlayerVideoFrameObserver &
  IAudioSpectrumObserver;

declare module '../IAgoraMediaPlayer' {
  interface IMediaPlayer {
    addListener<EventType extends keyof IMediaPlayerEvent>(
      eventType: EventType,
      listener: IMediaPlayerEvent[EventType]
    ): EventSubscription;

    removeListener<EventType extends keyof IMediaPlayerEvent>(
      eventType: EventType,
      listener: IMediaPlayerEvent[EventType]
    ): void;

    removeAllListeners<EventType extends keyof IMediaPlayerEvent>(
      eventType?: EventType
    ): void;

    release(): void;
  }
}
