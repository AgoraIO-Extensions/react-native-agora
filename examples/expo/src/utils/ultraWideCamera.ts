import {
  CameraCapturerConfiguration,
  CameraDirection,
  CameraFocalLengthType,
  IRtcEngine,
} from 'react-native-agora';

export interface NativeCameraZoomRange {
  cameraId: string;
  minZoom: number;
  maxZoom: number;
}

export type UltraWidePlan = {
  configuration: CameraCapturerConfiguration;
} & ({ mode: 'focal' } | { mode: 'zoom'; zoom: number });

export async function queryUltraWidePlan(
  engine: Pick<IRtcEngine, 'queryCameraFocalLengthCapability'>,
  getRearCameraZoomRanges: () => Promise<NativeCameraZoomRange[]>
): Promise<UltraWidePlan> {
  const capability = engine.queryCameraFocalLengthCapability();
  if (
    !Array.isArray(capability?.focalLengthInfos) ||
    !Number.isInteger(capability.size) ||
    capability.size < 0 ||
    capability.size > capability.focalLengthInfos.length
  ) {
    throw new Error('SDK focal-length capability query failed');
  }
  const supportsUltraWide = capability.focalLengthInfos
    .slice(0, capability.size)
    .some(
      (info) =>
        info.cameraDirection === CameraDirection.CameraRear &&
        info.focalLengthType ===
          CameraFocalLengthType.CameraFocalLengthUltraWide
    );
  if (supportsUltraWide) {
    return {
      mode: 'focal',
      configuration: {
        cameraDirection: CameraDirection.CameraRear,
        cameraFocalLengthType: CameraFocalLengthType.CameraFocalLengthUltraWide,
      },
    };
  }

  const cameras = await getRearCameraZoomRanges();
  const camera = cameras
    .filter(
      ({ cameraId, minZoom, maxZoom }) =>
        cameraId.length > 0 &&
        Number.isFinite(minZoom) &&
        Number.isFinite(maxZoom) &&
        minZoom > 0 &&
        minZoom < 1 &&
        maxZoom >= 1
    )
    .sort((a, b) => a.minZoom - b.minZoom)[0];
  if (!camera) {
    throw new Error('No rear camera exposes a native zoom range below 1x');
  }
  return {
    mode: 'zoom',
    // SDK supports a minimum of 0.5x. Never go below the native camera minimum.
    zoom: Math.max(0.5, camera.minZoom),
    // Match the queried logical camera. cameraId and cameraDirection are exclusive.
    configuration: { cameraId: camera.cameraId },
  };
}

export function startUltraWidePreview(
  engine: Pick<IRtcEngine, 'setCameraCapturerConfiguration' | 'startPreview'>,
  plan: UltraWidePlan
) {
  const configured = engine.setCameraCapturerConfiguration(plan.configuration);
  if (configured !== 0) {
    throw new Error(`setCameraCapturerConfiguration failed: ${configured}`);
  }
  const started = engine.startPreview();
  if (started !== 0) {
    throw new Error(`startPreview failed: ${started}`);
  }
}
