/**
 * Represents a video stream configuration for Picture-in-Picture (PiP) mode.
 *
 * This class holds the connection and canvas settings needed to display
 * a video stream within the PiP window.
 */

/**
 * Configuration options for Agora Picture-in-Picture (PiP) mode.
 *
 * This class provides platform-specific options to configure PiP behavior
 * for both Android and iOS platforms.
 */
export class AgoraPipOptions {
  /**
   * Whether to automatically enter PiP mode.
   *
   */
  autoEnterEnabled?: boolean;

  /**
   * The horizontal aspect ratio of the PiP window.
   *
   * Platform: Android only
   */
  aspectRatioX?: number;

  /**
   * The vertical aspect ratio of the PiP window.
   *
   * Platform: Android only
   */
  aspectRatioY?: number;

  /**
   * The left coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the PiP window.
   * Platform: Android only
   */
  sourceRectHintLeft?: number;

  /**
   * The top coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the PiP window.
   * Platform: Android only
   */
  sourceRectHintTop?: number;

  /**
   * The right coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the PiP window.
   * Platform: Android only
   */
  sourceRectHintRight?: number;

  /**
   * The bottom coordinate of the source rectangle hint.
   *
   * Used to specify the initial position of the PiP window.
   * Platform: Android only
   */
  sourceRectHintBottom?: number;

  /**
   * Whether to enable seamless resize for the PiP window.
   *
   * When enabled, the PiP window will resize smoothly.
   * Defaults to false.
   * Platform: Android only
   */
  seamlessResizeEnabled?: boolean;

  /**
   * Whether to use external state monitoring.
   *
   * When enabled, creates a dedicated thread to monitor PiP window state.
   * Use externalStateMonitorInterval to configure monitoring frequency.
   * Defaults to true.
   * Platform: Android only
   */
  useExternalStateMonitor?: boolean;

  /**
   * The interval for external state monitoring in milliseconds.
   *
   * Only takes effect when useExternalStateMonitor is true.
   * Defaults to 100ms.
   * Platform: Android only
   */
  externalStateMonitorInterval?: number;

  /**
   * The source content view identifier.
   *
   * Set to 0 to use the root view as the source.
   * Platform: iOS only
   */
  sourceContentView?: number;

  /**
   * The content view identifier for video rendering.
   *
   * Set to 0 to let the SDK manage the view.
   * When set to 0, you must provide video sources through videoStreams.
   * Platform: iOS only
   */
  contentView?: number;

  /**
   * The preferred width of the PiP content.
   *
   * Platform: iOS only
   */
  preferredContentWidth?: number;

  /**
   * The preferred height of the PiP content.
   *
   * Platform: iOS only
   */
  preferredContentHeight?: number;

  /**
   * The control style for the PiP window.
   *
   * Available styles:
   * * 0: Show all system controls (default)
   * * 1: Hide forward and backward buttons
   * * 2: Hide play/pause button and progress bar (recommended)
   * * 3: Hide all system controls including close and restore buttons
   *
   * Platform: iOS only
   */
  controlStyle?: number;
}

/** Represents the current state of Picture-in-Picture mode. */
export enum AgoraPipState {
  /** PiP mode has been successfully started. */
  pipStateStarted = 0,

  /** PiP mode has been stopped. */
  pipStateStopped = 1,

  /** PiP mode failed to start or encountered an error. */
  pipStateFailed = 2,
}

/**
 * Observer for Picture-in-Picture state changes.
 *
 * Implement this class to receive notifications about PiP state transitions
 * and potential errors.
 */
export interface AgoraPipStateChangedObserver {
  /**
   * Callback function for PiP state changes.
   *
   * @param state - The new PiP state
   * @param error - Error message if the state change failed, null otherwise
   */
  onPipStateChanged: (state: AgoraPipState, error: string | null) => void;
}

/**
 * Controller interface for managing Picture-in-Picture functionality.
 *
 * This abstract class defines the methods required to control PiP mode,
 * including setup, state management, and lifecycle operations.
 */
export abstract class AgoraPip {
  /** Releases resources associated with PiP mode. */
  abstract release(): void;

  /** Registers an observer for PiP state changes. */
  abstract registerPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /** Unregister an observer PiP state observer. */
  abstract unregisterPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /** Checks if PiP mode is supported on the current device. */
  abstract pipIsSupported(): boolean;

  /** Checks if automatic PiP mode entry is supported. */
  abstract pipIsAutoEnterSupported(): boolean;

  /** Checks if PiP mode is currently active. */
  abstract isPipActivated(): boolean;

  /** Configures PiP mode with the specified options. */
  abstract pipSetup(options: AgoraPipOptions): boolean;

  /** Starts PiP mode with the current configuration. */
  abstract pipStart(): boolean;

  /** Stops PiP mode. */
  abstract pipStop(): void;

  /** Releases resources associated with PiP mode. */
  abstract pipDispose(): void;
}
