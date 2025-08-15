import { NativeModules, Platform } from 'react-native';

const { AgoraServiceManager } = NativeModules;

/**
 * Agora Service Helper
 * Used to manage Android foreground service
 */
export default class AgoraServiceHelper {
  /**
   * Start foreground service
   * Should be called when using PIP feature on Android
   */
  static startForegroundService() {
    if (Platform.OS === 'android' && AgoraServiceManager) {
      console.log('[Agora] Starting foreground service');
      AgoraServiceManager.startForegroundService();
    }
  }

  /**
   * Stop foreground service
   * Should be called when the call ends
   */
  static stopForegroundService() {
    if (Platform.OS === 'android' && AgoraServiceManager) {
      console.log('[Agora] Stopping foreground service');
      AgoraServiceManager.stopForegroundService();
    }
  }
}
