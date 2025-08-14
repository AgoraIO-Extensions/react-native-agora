const path = require('path');

module.exports = {
  name: 'React Native Agora Example',
  slug: 'react-native-agora-example-expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'io.agora.reactnative.example',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'io.agora.reactnative.example',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          buildToolsVersion: '33.0.0',
          extraMavenRepos: ['https://jitpack.io'],
        },
        ios: {
          deploymentTarget: '13.0',
          useFrameworks: 'static',
        },
      },
    ],
  ],
  // Important for native modules
  expo: {
    jsEngine: 'hermes',
    scheme: 'agoraexpo',
  },
  scheme: 'agoraexpo',
};
