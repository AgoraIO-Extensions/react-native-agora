import {
  queryUltraWidePlan,
  startUltraWidePreview,
} from '../../examples/expo/app/examples/advanced/CameraCapturerConfiguration/ultraWideCamera';
import { CameraFocalLengthType } from '../AgoraBase';
import { CameraDirection } from '../IAgoraRtcEngine';

jest.mock(
  'react-native-agora',
  () => ({
    ...jest.requireActual('../AgoraBase'),
    ...jest.requireActual('../IAgoraRtcEngine'),
  }),
  { virtual: true }
);

describe('CSD-80336 ultra-wide camera selection', () => {
  const unsupported = {
    queryCameraFocalLengthCapability: () => ({ focalLengthInfos: [], size: 0 }),
  };

  it('uses advertised rear ultra-wide without querying native zoom', async () => {
    const native = jest.fn();
    const plan = await queryUltraWidePlan(
      {
        queryCameraFocalLengthCapability: () => ({
          focalLengthInfos: [
            {
              cameraDirection: CameraDirection.CameraRear,
              focalLengthType: CameraFocalLengthType.CameraFocalLengthUltraWide,
            },
          ],
          size: 1,
        }),
      },
      native
    );
    expect(plan.mode).toBe('focal');
    expect(plan.configuration).toEqual({
      cameraDirection: CameraDirection.CameraRear,
      cameraFocalLengthType: CameraFocalLengthType.CameraFocalLengthUltraWide,
    });
    expect(native).not.toHaveBeenCalled();
  });

  it('does not mistake a front ultra-wide camera for rear support', async () => {
    const native = jest
      .fn()
      .mockResolvedValue([
        { cameraId: 'rear-logical', minZoom: 0.6, maxZoom: 8 },
      ]);
    const plan = await queryUltraWidePlan(
      {
        queryCameraFocalLengthCapability: () => ({
          focalLengthInfos: [
            {
              cameraDirection: CameraDirection.CameraFront,
              focalLengthType: CameraFocalLengthType.CameraFocalLengthUltraWide,
            },
          ],
          size: 1,
        }),
      },
      native
    );
    expect(native).toHaveBeenCalledTimes(1);
    expect(plan).toEqual({
      mode: 'zoom',
      zoom: 0.6,
      configuration: { cameraId: 'rear-logical' },
    });
    expect(plan.configuration.cameraDirection).toBeUndefined();
  });

  it('honors returned size and clamps native zoom to the SDK minimum', async () => {
    const plan = await queryUltraWidePlan(
      {
        queryCameraFocalLengthCapability: () => ({
          focalLengthInfos: [
            {
              cameraDirection: CameraDirection.CameraRear,
              focalLengthType: CameraFocalLengthType.CameraFocalLengthUltraWide,
            },
          ],
          size: 0,
        }),
      },
      async () => [
        { cameraId: 'tele', minZoom: 1, maxZoom: 4 },
        { cameraId: 'invalid', minZoom: 0, maxZoom: 4 },
        { cameraId: 'logical', minZoom: 0.4, maxZoom: 8 },
      ]
    );
    expect(plan).toEqual({
      mode: 'zoom',
      zoom: 0.5,
      configuration: { cameraId: 'logical' },
    });
  });

  it('reports unsupported native zoom instead of inventing 0.5x support', async () => {
    await expect(
      queryUltraWidePlan(unsupported, async () => [
        { cameraId: '0', minZoom: 1, maxZoom: 10 },
      ])
    ).rejects.toThrow('No rear camera');
  });

  it('does not treat an SDK query failure as lack of capability', async () => {
    const native = jest.fn();
    await expect(
      queryUltraWidePlan(
        {
          queryCameraFocalLengthCapability: () => ({
            focalLengthInfos: [],
            size: -1,
          }),
        },
        native
      )
    ).rejects.toThrow('query failed');
    expect(native).not.toHaveBeenCalled();
  });

  it('preserves permission/native query errors', async () => {
    await expect(
      queryUltraWidePlan(unsupported, async () => {
        throw new Error('CAMERA_PERMISSION');
      })
    ).rejects.toThrow('CAMERA_PERMISSION');
  });

  it('configures before preview and stops on SDK errors', () => {
    const calls: string[] = [];
    const engine = {
      setCameraCapturerConfiguration: jest.fn(() => {
        calls.push('configure');
        return 0;
      }),
      startPreview: jest.fn(() => {
        calls.push('preview');
        return 0;
      }),
    };
    const plan = {
      mode: 'zoom' as const,
      zoom: 0.5,
      configuration: { cameraId: '0' },
    };
    startUltraWidePreview(engine, plan);
    expect(calls).toEqual(['configure', 'preview']);
    engine.startPreview.mockClear();
    engine.setCameraCapturerConfiguration.mockReturnValue(-2);
    expect(() => startUltraWidePreview(engine, plan)).toThrow(
      'Configuration failed: -2'
    );
    expect(engine.startPreview).not.toHaveBeenCalled();
    engine.setCameraCapturerConfiguration.mockReturnValue(0);
    engine.startPreview.mockReturnValue(-4);
    expect(() => startUltraWidePreview(engine, plan)).toThrow(
      'startPreview failed: -4'
    );
  });
});
