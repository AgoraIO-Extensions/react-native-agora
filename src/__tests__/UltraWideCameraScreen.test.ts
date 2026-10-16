import CameraScreen from '../../examples/expo/app/examples/advanced/CameraCapturerConfiguration/CameraCapturerConfiguration';
import {
  LocalVideoEventType,
  LocalVideoStreamReason,
  LocalVideoStreamState,
} from '../AgoraBase';
import { VideoSourceType } from '../AgoraMediaBase';
import { CameraDirection, IRtcEngine } from '../IAgoraRtcEngine';

// The Expo workspace uses a different RN version from the root Jest preset.
jest.mock(
  require.resolve('react-native', {
    paths: [require('path').resolve(__dirname, '../../examples/expo')],
  }),
  () => ({
    NativeModules: {},
    Platform: { OS: 'android' },
  })
);

jest.mock(
  'react-native-agora',
  () => ({
    ...jest.requireActual('../AgoraBase'),
    ...jest.requireActual('../AgoraMediaBase'),
    ...jest.requireActual('../IAgoraRtcEngine'),
  }),
  { virtual: true }
);
jest.mock('../../examples/expo/src/components/BaseComponent', () => ({
  BaseComponent: class extends require('react').Component {
    constructor(props: unknown) {
      super(props);
      this.state = this.createState();
    }
    info() {}
    error() {}
  },
}));
jest.mock('../../examples/expo/src/components/ui', () => ({}));
jest.mock('../../examples/expo/src/config/agora.config', () => ({
  appId: 'test',
}));
jest.mock('../../examples/expo/src/utils', () => ({}));
jest.mock('../../examples/expo/src/utils/permissions', () => ({}));

const { NativeModules } = jest.requireMock(
  require.resolve('react-native', {
    paths: [require('path').resolve(__dirname, '../../examples/expo')],
  })
);

class CameraDemo extends CameraScreen {
  prepare(engine: IRtcEngine) {
    this.engine = engine;
    Object.assign(this.state, { demoReady: true });
    this.setState = (update) => {
      if (update && typeof update !== 'function')
        Object.assign(this.state, update);
    };
  }
  start() {
    return this.startUltraWideDemo();
  }
  stop() {
    this.stopUltraWideDemo();
  }
}

describe('Ultra-wide screen workflow', () => {
  function setup() {
    const engine = {
      queryCameraFocalLengthCapability: jest
        .fn()
        .mockReturnValue({ focalLengthInfos: [], size: 0 }),
      setCameraCapturerConfiguration: jest.fn().mockReturnValue(0),
      startPreview: jest.fn().mockReturnValue(0),
      stopPreview: jest.fn().mockReturnValue(0),
      setCameraZoomFactor: jest.fn().mockReturnValue(0),
    };
    const screen = new CameraDemo({});
    screen.prepare(engine as unknown as IRtcEngine);
    NativeModules.CameraCapabilities = {
      getRearCameraZoomRanges: jest
        .fn()
        .mockResolvedValue([{ cameraId: '0', minZoom: 0.6, maxZoom: 8 }]),
    };
    return { screen, engine };
  }

  it('only confirms the focal path when event 5 arrives, and exposes event 6 as failure', async () => {
    const { screen, engine } = setup();
    engine.queryCameraFocalLengthCapability.mockReturnValue({
      focalLengthInfos: [
        { cameraDirection: CameraDirection.CameraRear, focalLengthType: 2 },
      ],
      size: 1,
    });
    await screen.start();
    expect(screen.state.demoStatus).toContain('Waiting');
    screen.onLocalVideoEvent(
      VideoSourceType.VideoSourceCamera,
      LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthApplied
    );
    expect(screen.state.demoStatus).toContain('SDK confirmed');
    screen.onLocalVideoEvent(
      VideoSourceType.VideoSourceCamera,
      LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthFallbackToDefault
    );
    expect(screen.state.demoStatus).toContain('ultra-wide failed');
    expect(
      NativeModules.CameraCapabilities.getRearCameraZoomRanges
    ).not.toHaveBeenCalled();
  });

  it('applies native zoom on capture readiness without a focal-length callback', async () => {
    const { screen, engine } = setup();
    await screen.start();
    expect(engine.setCameraCapturerConfiguration).toHaveBeenCalledWith({
      cameraId: '0',
    });
    expect(engine.setCameraZoomFactor).not.toHaveBeenCalled();
    screen.onLocalVideoStateChanged(
      VideoSourceType.VideoSourceCamera,
      LocalVideoStreamState.LocalVideoStreamStateCapturing,
      LocalVideoStreamReason.LocalVideoStreamReasonOk
    );
    expect(engine.setCameraZoomFactor).toHaveBeenCalledWith(0.6);
    expect(screen.state.demoStatus).toContain('accepted');
    screen.onLocalVideoEvent(
      VideoSourceType.VideoSourceCamera,
      LocalVideoEventType.LocalVideoEventTypeCameraFocalLengthFallbackToDefault
    );
    expect(screen.state.demoStatus).toContain('accepted');
  });

  it('does not restart a stopped Demo when the native query completes late', async () => {
    const { screen, engine } = setup();
    let resolveQuery!: (
      value: { cameraId: string; minZoom: number; maxZoom: number }[]
    ) => void;
    NativeModules.CameraCapabilities.getRearCameraZoomRanges.mockReturnValue(
      new Promise((resolve) => {
        resolveQuery = resolve;
      })
    );
    const starting = screen.start();
    screen.stop();
    resolveQuery([{ cameraId: '0', minZoom: 0.5, maxZoom: 8 }]);
    await starting;
    expect(engine.startPreview).not.toHaveBeenCalled();
    expect(screen.state.startPreview).toBe(false);
    expect(screen.state.demoStatus).toContain('Stopped');
  });
});
