/**
 * Represents a video stream configuration for Picture-in-Picture (PiP) mode.
 *
 * This class holds the connection and canvas settings needed to display
 * a video stream within the PiP window.
 */

import { VideoCanvas } from './AgoraBase';
import { RtcConnection } from './IAgoraRtcEngineEx';

export class AgoraPipVideoStream {
  /** The RTC connection associated with this video stream. */
  connection: RtcConnection;

  /** The video canvas configuration for rendering this stream. */
  canvas: VideoCanvas;

  /**
   * Creates an AgoraPipVideoStream instance.
   *
   * Both connection and canvas parameters are required to properly
   * configure the video stream in PiP mode.
   */
  constructor(connection: RtcConnection, canvas: VideoCanvas) {
    this.connection = connection;
    this.canvas = canvas;
  }
}

/**
 * Layout configuration for Picture-in-Picture (PiP) video streams.
 *
 * This class defines how multiple video streams should be arranged in a flow layout,
 * where streams are placed from left to right and top to bottom in sequence.
 *
 * Example layout with padding=10, spacing=5, column=3:
 * ```
 * ┌────────────────────────────────────┐
 * │                                    │
 * │  ┌────┐  ┌────┐  ┌────┐           │
 * │  │ 1  │  │ 2  │  │ 3  │           │
 * │  └────┘  └────┘  └────┘           │
 * │                                    │
 * │  ┌────┐  ┌────┐  ┌────┐           │
 * │  │ 4  │  │ 5  │  │ 6  │           │
 * │  └────┘  └────┘  └────┘           │
 * │                                    │
 * │  ┌────┐                           │
 * │  │ 7  │                           │
 * │  └────┘                           │
 * │                                    │
 * └────────────────────────────────────┘
 * ```
 */
export class AgoraPipContentViewLayout {
  /**
   * The padding around the entire layout in pixels.
   * Creates space between the layout edges and the streams.
   * If null, no padding will be applied.
   */
  padding: number;

  /**
   * The horizontal and vertical spacing between streams in pixels.
   * Creates consistent gaps between adjacent streams.
   * If null, streams will be placed directly adjacent to each other.
   */
  spacing: number;

  /**
   * Maximum number of rows allowed in the layout.
   * When reached, no more rows will be created even if more streams exist.
   * If null, rows will be created as needed to fit all streams.
   * Must be greater than 0 or null.
   */
  row: number;

  /**
   * Maximum number of streams per row.
   * When reached, a new row will be started.
   * If null, streams will flow to fill the available width.
   * Must be greater than 0 or null.
   */
  column: number;

  /**
   * Creates an AgoraPipContentViewLayout instance.
   *
   * The streams parameter is required and specifies which video streams
   * should be shown in the layout in sequential order.
   */
  constructor(padding: number, spacing: number, row: number, column: number) {
    this.padding = padding;
    this.spacing = spacing;
    this.row = row;
    this.column = column;
  }
}

/**
 * Configuration options for Agora Picture-in-Picture (PiP) mode.
 *
 * This class provides platform-specific options to configure PiP behavior
 * for both Android and iOS platforms.
 */
export class AgoraPipOptions {
  /**
   * Creates an AgoraPipOptions instance.
   *
   * All parameters are optional and platform-specific.
   */
  constructor(
    autoEnterEnabled?: boolean,
    aspectRatioX?: number,
    aspectRatioY?: number,
    sourceRectHintLeft?: number,
    sourceRectHintTop?: number,
    sourceRectHintRight?: number,
    sourceRectHintBottom?: number,
    seamlessResizeEnabled?: boolean,
    useExternalStateMonitor?: boolean,
    externalStateMonitorInterval?: number,
    sourceContentView?: number,
    contentView?: number,
    videoStreams?: AgoraPipVideoStream[],
    contentViewLayout?: AgoraPipContentViewLayout,
    preferredContentWidth?: number,
    preferredContentHeight?: number,
    controlStyle?: number
  ) {
    this.autoEnterEnabled = autoEnterEnabled;
    this.aspectRatioX = aspectRatioX;
    this.aspectRatioY = aspectRatioY;
    this.sourceRectHintLeft = sourceRectHintLeft;
    this.sourceRectHintTop = sourceRectHintTop;
    this.sourceRectHintRight = sourceRectHintRight;
    this.sourceRectHintBottom = sourceRectHintBottom;
    this.seamlessResizeEnabled = seamlessResizeEnabled;
    this.useExternalStateMonitor = useExternalStateMonitor;
    this.externalStateMonitorInterval = externalStateMonitorInterval;
    this.sourceContentView = sourceContentView;
    this.contentView = contentView;
    this.videoStreams = videoStreams;
    this.contentViewLayout = contentViewLayout;
    this.preferredContentWidth = preferredContentWidth;
    this.preferredContentHeight = preferredContentHeight;
    this.controlStyle = controlStyle;
  }

  /**
   * Whether to automatically enter PiP mode.
   *
   * Platform: Android only
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
   * Defaults to false.
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
   * Configuration for video transcoding.
   *
   * Only takes effect when contentView is set to 0.
   * When user let the SDK manage the view, all video streams will place in a root view in the PIP window.
   * Platform: iOS only
   */
  videoStreams?: AgoraPipVideoStream[];

  /**
   * Layout configuration for PiP video streams.
   *
   * Only takes effect when contentView is set to 0.
   * Platform: iOS only
   */
  contentViewLayout?: AgoraPipContentViewLayout;

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
  pipStateStarted = 1,

  /** PiP mode has been stopped. */
  pipStateStopped = 2,

  /** PiP mode failed to start or encountered an error. */
  pipStateFailed = 3,
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
  abstract dispose(): void;

  /** Registers an observer for PiP state changes. */
  abstract registerPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void;

  /** Unregister a previously registered PiP state observer. */
  abstract unregisterPipStateChangedObserver(): void;

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
