/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'example/ios/build/Build/Products/Debug-iphonesimulator/AgoraRtcNgExample.app',
      build: 'xcodebuild -workspace example/ios/AgoraRtcNgExample.xcworkspace -scheme AgoraRtcNgExample -configuration Debug -sdk iphonesimulator -derivedDataPath example/ios/build'
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath: 'example/ios/build/Build/Products/Release-iphonesimulator/AgoraRtcNgExample.app',
      build: 'xcodebuild -workspace example/ios/AgoraRtcNgExample.xcworkspace -scheme AgoraRtcNgExample -configuration Release -sdk iphonesimulator -derivedDataPath example/ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'example/android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd example/android ; ENTRY_FILE=index.js ./gradlew assembleDebug assembleAndroidTest -d -DtestBuildType=debug ; cd -',
      reversePorts: [
        8081
      ]
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'example/android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd example/android ; ENTRY_FILE=index.js ./gradlew assembleRelease assembleAndroidTest -d -DtestBuildType=release ; cd -'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'emulator'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.att.debug': {
      device: 'attached',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'attached',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
};
