import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  callApi: {
    funcName: string;
    params: string;
    buffers?: string[];
  };
}

export default codegenNativeComponent<NativeProps>(
  'AgoraRtcTextureView'
) as HostComponent<NativeProps>;
