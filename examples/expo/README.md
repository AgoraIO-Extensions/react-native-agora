# React Native Agora Expo Example

## Overview

This guide will walk you through simple instructions to create a real-time communication app using Agora SDK with Expo and test it using an emulator or your mobile device. The example demonstrates how to implement voice and video calling, stream sharing, and various advanced features using Agora's React Native SDK in an Expo-managed application.

## Getting Started

This section contains instructions to create a simple Expo app with Agora integration. We'll help you understand the project setup and provide complete code samples to implement functionality quickly.

### Prerequisites

- An Agora account - [Sign up](https://console.agora.io/) if you don't have one
- Working Expo development environment
- Familiarity with React Native basics
- VS Code or any other IDE / code editor

### Setup Your Agora App

1. Create a project in the [Agora Console](https://console.agora.io/)
2. Obtain your App ID from the Agora Console
3. For token-based authentication (recommended for production), generate a temporary token or set up an authentication server

### Create an Expo App

1. Open your Terminal and navigate to the directory where you'd like to create your app
2. Run the following command to create an Expo app:

```bash
npx create-expo-app my-agora-app && cd my-agora-app
```

3. Install expo-dev-client to enable native module usage:

```bash
npx expo install expo-dev-client
```

4. Test run your app:

**Android**

```bash
npx expo run:android
```

**iOS**

```bash
npx expo run:ios
```

The above commands compile your project into a debug build of your app using locally installed Android SDK or Xcode.

### Install Agora SDK and Dependencies

After successfully testing your app, install the React Native Agora package:

```bash
npx expo install react-native-agora
```

### Configure App Permissions

1. Set up necessary permissions in your app.json:

```json
{
  "expo": {
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.MODIFY_AUDIO_SETTINGS",
        "android.permission.ACCESS_WIFI_STATE",
        "android.permission.ACCESS_NETWORK_STATE",
        "android.permission.BLUETOOTH",
        "android.permission.FOREGROUND_SERVICE"
      ]
    }
  }
}
```

2. For iOS, add the following to your app.json to configure the permission request messages:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera for video calls",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone for audio calls"
        }
      ]
    ]
  }
}
```

### Setup Minimum Deployment Targets

Agora SDK requires minimum SDK versions:

- Android: minSdkVersion = 24
- iOS: iOS 13.0+

Install expo-build-properties to configure these:

```bash
npx expo install expo-build-properties --save-dev
```

Add the following to your app.json:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 24 // depends on react-native and expo version that you choose
          },
          "ios": {
            "deploymentTarget": "12.4" // depends on react-native and expo version that you choose
          }
        }
      ]
    ]
  }
}
```

### Configure Your Agora App ID

Create a configuration file to store your Agora credentials:

1. Create a file at `src/config/appID.js`:

```javascript
export const appId = 'YOUR_AGORA_APP_ID';
```

2. Make sure to add this file to your .gitignore to avoid exposing your App ID

### Basic Integration Example

Here's a simple example of how to implement a basic video call:

```javascript
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
  RtcSurfaceView,
  VideoSourceType,
} from 'react-native-agora';

import Config from '../config/agora.config';
import { askMediaAccess } from '../utils/permissions';

export default function BasicVideoCall() {
  const [engine, setEngine] = useState(undefined);
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);

  useEffect(() => {
    // Initialize Agora engine when component mounts
    const init = async () => {
      if (!Config.appId) {
        console.error('App ID is missing');
        return;
      }

      // Create Agora engine instance
      const rtcEngine = createAgoraRtcEngine();
      setEngine(rtcEngine);

      // Initialize the engine
      rtcEngine.initialize({
        appId: Config.appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      // Request permissions and enable video
      await askMediaAccess([
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
      ]);
      rtcEngine.enableVideo();

      // Register event handlers
      rtcEngine.addListener('onJoinChannelSuccess', () => {
        setIsJoined(true);
        console.log('Successfully joined the channel');
      });

      rtcEngine.addListener('onUserJoined', (connection, uid) => {
        console.log('Remote user joined:', uid);
        setRemoteUsers((prev) => [...prev, uid]);
      });

      rtcEngine.addListener('onUserOffline', (connection, uid) => {
        console.log('Remote user left:', uid);
        setRemoteUsers((prev) => prev.filter((id) => id !== uid));
      });
    };

    init();
    return () => {
      // Clean up
      engine?.leaveChannel();
      engine?.unregisterEventHandler({});
    };
  }, []);

  const joinChannel = async () => {
    if (!engine) return;

    // Join a channel
    engine.joinChannel(Config.token, Config.channelId, 0, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  const leaveChannel = () => {
    if (!engine) return;
    engine.leaveChannel();
    setIsJoined(false);
    setRemoteUsers([]);
  };

  return (
    <View style={styles.container}>
      {isJoined && (
        <View style={styles.videoContainer}>
          {/* Local video */}
          <RtcSurfaceView
            style={styles.localVideo}
            canvas={{
              uid: 0,
              sourceType: VideoSourceType.VideoSourceCamera,
            }}
          />

          {/* Remote videos */}
          {remoteUsers.map((uid) => (
            <RtcSurfaceView
              key={uid}
              style={styles.remoteVideo}
              canvas={{
                uid,
                sourceType: VideoSourceType.VideoSourceRemote,
              }}
            />
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        {!isJoined ? (
          <Button title="Join Channel" onPress={joinChannel} />
        ) : (
          <Button title="Leave Channel" onPress={leaveChannel} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    width: '100%',
  },
  localVideo: {
    width: '100%',
    height: 300,
  },
  remoteVideo: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
  },
});
```

### Apply Changes in Native Platform Folders

After making these configuration changes, you'll need to rebuild your project:

```bash
npx expo prebuild
```

## Available Examples

The Agora React Native Expo sample app includes various examples organized in three categories:

### Basic Examples

- JoinChannelAudio: Simple voice call implementation
- JoinChannelVideo: Basic video calling functionality
- StringUid: Using string user IDs instead of integers

### Advanced Examples

- AudioCallRoute: Control audio route settings
- AudioMixing: Mix audio during calls
- BeautyEffect: Implement video beauty effects
- ChannelMediaRelay: Stream across multiple channels
- Encryption: Secure communications with encryption
- JoinMultipleChannel: Join multiple channels simultaneously
- MediaPlayer: Play media during calls
- PictureInPicture: Enable Picture-in-Picture mode
- ScreenShare: Share device screen
- And many more...

### Hook-based Examples

- Implementation using React hooks for cleaner, more functional code
- Examples include all basic features plus several advanced ones

## Running the Sample App

To run the full example app:

```bash
# For Android
npx expo run:android

# For iOS
npx expo run:ios
```

## Additional Resources

- [Agora API Reference](https://docs.agora.io/en/video-calling/reference/api-ref)
- [Agora Developer Center](https://www.agora.io/en/developer-center/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
