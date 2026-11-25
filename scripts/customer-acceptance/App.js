import React, { useEffect, useState } from 'react';
import { NativeModules, SafeAreaView, Text, View } from 'react-native';
import {
  RtcSurfaceView,
  ChannelProfileType,
  ClientRoleType,
  VideoBufferType,
  VideoPixelFormat,
  createAgoraRtcEngine,
} from 'react-native-agora';

import config from './acceptance-config.json';

const reporter = NativeModules.CustomerAcceptance;
const role = reporter.role;
const publisher = role === 'publisher';
const uid = publisher ? 101 : 102;
const state = {
  role,
  uid,
  newArchitecture: global.nativeFabricUIManager != null,
  bridgeless: !!global.RN$Bridgeless,
  checks: {},
  errors: [],
  pushedFrames: 0,
};

export default function App() {
  const [status, setStatus] = useState('Starting customer app');
  const [remoteUid, setRemoteUid] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let engine;
    let timer;
    let track;
    let released = false;
    const report = (patch = {}) => {
      Object.assign(state, patch);
      reporter.report(state);
      setStatus(JSON.stringify(state.checks));
    };
    const check = (name, code) => {
      state.checks[name] = code;
      if (code !== 0) throw new Error(`${name} returned ${code}`);
      report();
    };
    const handler = {
      onError: (code, message) => {
        state.errors.push({ code, message });
        report();
      },
      onJoinChannelSuccess: (connection) =>
        report({ joined: true, connection }),
      onUserJoined: (_connection, remote) => {
        setRemoteUid(remote);
        report({ remoteUid: remote });
      },
      onFirstRemoteVideoDecoded: (_connection, remote, width, height) =>
        report({ decoded: { uid: remote, width, height } }),
      onFirstRemoteVideoFrame: (_connection, remote, width, height) =>
        report({ rendered: { uid: remote, width, height } }),
      onLocalVideoStateChanged: (source, videoState, reason) =>
        report({ localVideoState: { source, videoState, reason } }),
      onRemoteVideoStateChanged: (_connection, remote, videoState, reason) =>
        report({ remoteVideoState: { remote, videoState, reason } }),
      onLocalVideoStats: (_connection, _source, stats) =>
        report({ localVideoStats: stats }),
    };
    const release = () => {
      if (released || !engine) return;
      released = true;
      clearInterval(timer);
      try {
        check('leaveChannel', engine.leaveChannel());
        if (track !== undefined)
          check(
            'destroyCustomVideoTrack',
            engine.destroyCustomVideoTrack(track)
          );
        engine.unregisterEventHandler(handler);
        engine.release();
        setReady(false);
        setTimeout(() => {
          try {
            const again = createAgoraRtcEngine();
            check('reinitialize', again.initialize({ appId: config.appId }));
            again.release();
            report({ released: true, reinitialized: true });
          } catch (error) {
            report({ failure: error.message });
          }
        }, 1500);
      } catch (error) {
        report({ failure: error.message });
      }
    };
    const commands = setInterval(() => {
      reporter.nextCommand().then((command) => {
        if (command.action === 'release') release();
      });
    }, 1000);
    try {
      report({ stage: 'createEngine' });
      engine = createAgoraRtcEngine();
      report({ stage: 'getVersion' });
      const version = engine.getVersion();
      if (!version.version.startsWith('4.6.4'))
        throw new Error(`Unexpected SDK ${version.version}`);
      report({ version });
      check(
        'initialize',
        engine.initialize({
          appId: config.appId,
          channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
          logConfig: { filePath: `${reporter.documents}/agora-sdk.log` },
        })
      );
      engine.registerEventHandler(handler);
      check('disableAudio', engine.disableAudio());
      check('enableVideo', engine.enableVideo());
      if (!publisher)
        check('enableLocalVideo(false)', engine.enableLocalVideo(false));
      check(
        'setVideoEncoderConfiguration',
        engine.setVideoEncoderConfiguration({
          dimensions: { width: 160, height: 120 },
          frameRate: 10,
          bitrate: 120,
        })
      );
      if (publisher) {
        track = engine.createCustomVideoTrack();
        if (!Number.isInteger(track) || track < 0 || track === 0xffffffff)
          throw new Error(`Invalid custom track ${track}`);
        report({ track });
      }
      setReady(true);
      report({ baseReady: true, stage: 'ready' });
      check(
        'joinChannel',
        engine.joinChannel('', reporter.channel, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          publishCameraTrack: false,
          publishMicrophoneTrack: false,
          publishCustomVideoTrack: publisher,
          customVideoTrackId: publisher ? track : 0,
          autoSubscribeVideo: true,
        })
      );
      if (publisher) {
        const pixels = new Uint8Array(160 * 120 * 4);
        for (let i = 0; i < 160 * 120; i++) {
          const x = i % 160;
          pixels[i * 4] = x < 53 ? 240 : 20;
          pixels[i * 4 + 1] = x >= 53 && x < 106 ? 240 : 20;
          pixels[i * 4 + 2] = x >= 106 ? 240 : 20;
          pixels[i * 4 + 3] = 255;
        }
        timer = setInterval(() => {
          const code = engine.getMediaEngine().pushVideoFrame(
            {
              type: VideoBufferType.VideoBufferRawData,
              format: VideoPixelFormat.VideoPixelRgba,
              buffer: pixels,
              stride: 160,
              height: 120,
              timestamp: Date.now(),
            },
            track
          );
          if (code !== 0) {
            clearInterval(timer);
            report({ failure: `pushVideoFrame returned ${code}` });
          } else {
            state.pushedFrames++;
            if (state.pushedFrames % 10 === 0) report();
          }
        }, 100);
      }
    } catch (error) {
      report({ failure: error.message });
    }
    return () => {
      clearInterval(commands);
      release();
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, padding: 16 }}>
        Agora customer acceptance · {role}
      </Text>
      <Text style={{ padding: 16 }}>{status}</Text>
      <View style={{ height: 260, margin: 16, backgroundColor: '#18202a' }}>
        {ready && !publisher && remoteUid > 0 && (
          <RtcSurfaceView
            canvas={{ uid: remoteUid }}
            style={{ flex: 1 }}
            onLayout={() => {
              state.surfaceMounted = true;
              reporter.report(state);
            }}
          />
        )}
      </View>
      <Text style={{ padding: 16 }}>
        Synthetic RGB frames · no camera or microphone capture
      </Text>
    </SafeAreaView>
  );
}
