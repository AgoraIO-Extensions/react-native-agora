import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  newIrisApiEngine(): boolean;

  destroyIrisApiEngine(): boolean;

  callApi(args: {
    funcName: string;
    params: string;
    buffers?: string[];
  }): string;

  showRPSystemBroadcastPickerView(
    showsMicrophoneButton: boolean
  ): Promise<void>;

  // Keep: Required for RN built in Event Emitter Calls.
  addListener(eventName: string): void;

  // Keep: Required for RN built in Event Emitter Calls.
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AgoraRtcNg');
