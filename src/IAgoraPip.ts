import { RtcRendererViewProps } from './AgoraRtcRenderView';

/**
 * @ignore
 */
export class AgoraPipContentViewLayout {
  /**
   * @ignore
   */
  padding?: number;

  /**
   * @ignore
   */
  spacing?: number;

  /**
   * @ignore
   */
  row?: number;

  /**
   * @ignore
   */
  column?: number;
}

/**
 * @ignore
 */
export class AgoraPipOptions {
  /**
   * @ignore
   */
  autoEnterEnabled?: boolean;

  /**
   * @ignore
   */
  aspectRatioX?: number;

  /**
   * @ignore
   */
  aspectRatioY?: number;

  /**
   * @ignore
   */
  sourceRectHintLeft?: number;

  /**
   * @ignore
   */
  sourceRectHintTop?: number;

  /**
   * @ignore
   */
  sourceRectHintRight?: number;

  /**
   * @ignore
   */
  sourceRectHintBottom?: number;

  /**
   * @ignore
   */
  seamlessResizeEnabled?: boolean;

  /**
   * @ignore
   */
  useExternalStateMonitor?: boolean;

  /**
   * @ignore
   */
  externalStateMonitorInterval?: number;

  /**
   * @ignore
   */
  videoStreams?: RtcRendererViewProps[];

  /**
   * @ignore
   */
  contentViewLayout?: AgoraPipContentViewLayout;

  /**
   * @ignore
   */
  sourceContentView?: number;

  /**
   * @ignore
   */
  contentView?: number;

  /**
   * @ignore
   */
  preferredContentWidth?: number;

  /**
   * @ignore
   */
  preferredContentHeight?: number;

  /**
   * @ignore
   */
  controlStyle?: number;
}

/**
 * @ignore
 */
export enum AgoraPipState {
  /**
   * @ignore
   */
  pipStateStarted = 0,

  /**
   * @ignore
   */
  pipStateStopped = 1,

  /**
   * @ignore
   */
  pipStateFailed = 2,
}

/**
 * @ignore
 */
export interface AgoraPipStateChangedObserver {
  /**
   * @ignore
   */
  onPipStateChanged: (state: AgoraPipState, error: string | null) => void;
}

/**
 * @ignore
 */
export abstract class AgoraPip {
  /**
   * @ignore
   */
  abstract release(): void;

  /**
   * @ignore
   */
  abstract registerPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /**
   * @ignore
   */
  abstract unregisterPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /**
   * @ignore
   */
  abstract pipIsSupported(): boolean;

  /**
   * @ignore
   */
  abstract pipIsAutoEnterSupported(): boolean;

  /**
   * @ignore
   */
  abstract isPipActivated(): boolean;

  /**
   * @ignore
   */
  abstract pipSetup(options: AgoraPipOptions): boolean;

  /**
   * @ignore
   */
  abstract pipStart(): boolean;

  /**
   * @ignore
   */
  abstract pipStop(): void;

  /**
   * @ignore
   */
  abstract pipDispose(): void;
}
