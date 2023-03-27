import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps, HostComponent } from 'react-native';

export interface NativeProps extends ViewProps {
  callApi: {
    funcName: string;
    params: string;
    buffers?: string[];
  };
  zOrderOnTop?: boolean;
  zOrderMediaOverlay?: boolean;
}

export default codegenNativeComponent<NativeProps>(
  'AgoraRtcSurfaceView'
) as HostComponent<NativeProps>;
