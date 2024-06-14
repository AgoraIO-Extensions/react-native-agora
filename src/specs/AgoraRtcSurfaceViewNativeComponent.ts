import type { HostComponent, ViewProps } from 'react-native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  callApi: {
    funcName: string;
    params: string;
    buffers?: string[];
  };
  zOrderOnTop?: boolean;
  zOrderMediaOverlay?: boolean;
  borderRadius?: Float;
}

export default codegenNativeComponent<NativeProps>(
  'AgoraRtcSurfaceView'
) as HostComponent<NativeProps>;
