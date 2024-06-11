import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {
  callApi: {
    funcName: string;
    params: string;
    buffers?: string[];
  };
  zOrderOnTop?: boolean;
  zOrderMediaOverlay?: boolean;
  cornerRadius?: Float;
}

export default codegenNativeComponent<NativeProps>(
  'AgoraRtcSurfaceView'
) as HostComponent<NativeProps>;
