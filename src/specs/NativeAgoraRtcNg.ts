import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';

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

  pipIsSupported(): boolean;

  pipIsAutoEnterSupported(): boolean;

  isPipActivated(): boolean;

  pipSetup(options: Object): boolean;

  pipStart(): boolean;

  pipStop(): void;

  pipDispose(): void;

  nativeViewCreate(): number;

  nativeViewDestroy(options: Object): void;

  nativeViewSetParent(options: Object): void;

  nativeViewSetLayout(options: Object): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('AgoraRtcNg');
