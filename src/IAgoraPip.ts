import { RtcRendererViewProps } from './AgoraRtcRenderView';

/**
 * Layout configuration for picture-in-picture video streams.
 *
 * Since Available since v4.6.2. This class defines how multiple video streams are arranged in a flowing layout, from left to right and top to bottom.
 */
export class AgoraPipContentViewLayout {
  /**
   * Padding around the entire layout in pixels. Used to create space between the layout edge and video streams. If null, no padding is applied.
   */
  padding?: number;

  /**
   * Horizontal and vertical spacing between video streams in pixels. Used to create consistent spacing between adjacent video streams. If null, video streams are placed directly adjacent.
   */
  spacing?: number;

  /**
   * Maximum number of rows allowed in the layout. Once the maximum is reached, no new rows are created even if more video streams exist. If null, rows are created as needed to accommodate all streams. Must be greater than 0 or null.
   */
  row?: number;

  /**
   * Maximum number of video streams per row. Once the maximum is reached, a new row starts. If null, video streams flow to fill the available width. Must be greater than 0 or null.
   */
  column?: number;
}

/**
 * Configuration options for Agora picture-in-picture mode.
 *
 * Since Available since v4.6.2. This class provides platform-specific options to configure picture-in-picture behavior on Android and iOS.
 */
export class AgoraPipOptions {
  /**
   * Whether to automatically enter picture-in-picture mode.
   */
  autoEnterEnabled?: boolean;

  /**
   * Horizontal aspect ratio of the picture-in-picture window.
   *
   * (Android only)
   */
  aspectRatioX?: number;

  /**
   * Vertical aspect ratio of the picture-in-picture window.
   *
   * (Android only)
   */
  aspectRatioY?: number;

  /**
   * Left coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the picture-in-picture window.
   * (Android only)
   */
  sourceRectHintLeft?: number;

  /**
   * Top coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the picture-in-picture window.
   * (Android only)
   */
  sourceRectHintTop?: number;

  /**
   * Right coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the picture-in-picture window.
   * (Android only)
   */
  sourceRectHintRight?: number;

  /**
   * Bottom coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the picture-in-picture window.
   * (Android only)
   */
  sourceRectHintBottom?: number;

  /**
   * Whether to enable seamless resizing of the picture-in-picture window.
   *
   * When enabled, the window resizes smoothly.
   * Default is false.
   * (Android only)
   */
  seamlessResizeEnabled?: boolean;

  /**
   * Whether to use an external state monitor.
   *
   * When enabled, a dedicated thread is created to monitor the state of the picture-in-picture window. Use externalStateMonitorInterval to configure the monitoring frequency.
   * Default is true.
   * (Android only)
   */
  useExternalStateMonitor?: boolean;

  /**
   * Interval for external state monitoring, in milliseconds.
   *
   * Takes effect only when useExternalStateMonitor is true.
   * Default is 100ms.
   * (Android only)
   */
  externalStateMonitorInterval?: number;

  /**
   * Video transcoding configuration.
   *
   * Takes effect only when contentView is set to 0. When the SDK manages the views, all video streams are placed in the root view of the picture-in-picture window.
   * (iOS only)
   */
  videoStreams?: RtcRendererViewProps[];

  /**
   * Layout configuration for picture-in-picture video streams.
   *
   * Takes effect only when contentView is set to 0.
   * (iOS only)
   */
  contentViewLayout?: AgoraPipContentViewLayout;

  /**
   * sourceContentView determines the source frame and restore target for picture-in-picture animation. Pass 0 to use the app's root view. For best animation experience, set this to the view containing video content. The system uses this view for enter/exit animations and as the restore target when returning to the app or stopping picture-in-picture.
   */
  sourceContentView?: number;

  /**
   * contentView determines which view will be displayed in the picture-in-picture window. If 0 is passed, the picture-in-picture controller automatically manages and displays all video streams. If a specific view ID is passed, you are responsible for managing the content displayed in the picture-in-picture window.
   */
  contentView?: number;

  /**
   * Preferred width of the picture-in-picture content.
   *
   * (iOS only)
   */
  preferredContentWidth?: number;

  /**
   * Preferred height of the picture-in-picture content.
   *
   * (iOS only)
   */
  preferredContentHeight?: number;

  /**
   * Control style of the picture-in-picture window.
   * Available styles:
   *  0: Show all system controls (default)
   *  1: Hide forward and back buttons
   *  2: Hide play/pause button and progress bar (recommended)
   *  3: Hide all system controls, including close and restore buttons (iOS only)
   */
  controlStyle?: number;
}

/**
 * Represents the current state of Picture-in-Picture mode.
 *
 * Since Available since v4.6.2.
 */
export enum AgoraPipState {
  /**
   * 0: Picture-in-Picture mode has started successfully.
   */
  pipStateStarted = 0,

  /**
   * 1: Picture-in-Picture mode has stopped.
   */
  pipStateStopped = 1,

  /**
   * 2: Failed to start Picture-in-Picture mode or encountered an error.
   */
  pipStateFailed = 2,
}

/**
 * Observer for picture-in-picture state changes.
 *
 * Since Available since v4.6.2. Implement this class to receive notifications of picture-in-picture state transitions and potential errors.
 */
export interface AgoraPipStateChangedObserver {
  /**
   * @ignore
   */
  onPipStateChanged: (state: AgoraPipState, error: string | null) => void;
}

/**
 * Controller interface for managing picture-in-picture functionality.
 *
 * Since Available since v4.6.2. This abstract class defines methods required to control picture-in-picture mode, including setup, state management, and lifecycle operations.
 */
export abstract class AgoraPip {
  /**
   * Releases resources related to picture-in-picture.
   *
   * Since Available since v4.6.2.
   */
  abstract release(): void;

  /**
   * Registers a picture-in-picture state change observer.
   *
   * @param observer Picture-in-picture state change observer. See AgoraPipStateChangedObserver.
   */
  abstract registerPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /**
   * Unregisters the picture-in-picture state change observer.
   *
   * @param observer The picture-in-picture state change observer. See AgoraPipStateChangedObserver.
   */
  abstract unregisterPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /**
   * Checks whether the current device supports picture-in-picture mode.
   *
   * Since Available since v4.6.2.
   *
   * @returns
   * true : The current device supports picture-in-picture mode. false : The current device does not support picture-in-picture mode.
   */
  abstract pipIsSupported(): boolean;

  /**
   * Checks whether auto-entering picture-in-picture mode is supported.
   *
   * Since Available since v4.6.2.
   *
   * @returns
   * true : Auto-entering picture-in-picture mode is supported. false : Auto-entering picture-in-picture mode is not supported.
   */
  abstract pipIsAutoEnterSupported(): boolean;

  /**
   * Checks whether picture-in-picture mode is activated.
   *
   * Since Available since v4.6.2.
   *
   * @returns
   * true : Picture-in-picture mode is activated. false : Picture-in-picture mode is not activated.
   */
  abstract isPipActivated(): boolean;

  /**
   * Configures picture-in-picture mode.
   *
   * Since Available since v4.6.2.
   *
   * @param options Picture-in-picture configuration options. See AgoraPipOptions.
   *
   * @returns
   * true : The method call succeeds. false : The method call fails.
   */
  abstract pipSetup(options: AgoraPipOptions): boolean;

  /**
   * Starts picture-in-picture mode.
   *
   * Since Available since v4.6.2.
   *
   * @returns
   * true : The method call succeeds. false : The method call fails.
   */
  abstract pipStart(): boolean;

  /**
   * Stops picture-in-picture mode.
   *
   * Since Available since v4.6.2.
   */
  abstract pipStop(): void;

  /**
   * Releases resources related to picture-in-picture.
   *
   * Since Available since v4.6.2.
   */
  abstract pipDispose(): void;
}
