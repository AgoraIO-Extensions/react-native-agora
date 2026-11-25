import React, { useEffect } from 'react';
import { NativeModules, Text } from 'react-native';
import { createAgoraRtcEngine } from 'react-native-agora';

import config from './acceptance-config.json';

const reporter = NativeModules.CustomerAcceptance;

export default function App() {
  useEffect(() => {
    const state = {
      scenario: 'bridge-smoke',
      documents: reporter.documents,
      runID: reporter.testRunID,
      processID: reporter.processID,
      bundleID: reporter.bundleID,
      newArchitecture: global.nativeFabricUIManager != null,
      cycles: [],
      errors: [],
      completed: false,
    };
    const report = () => reporter.report(state);
    const run = async () => {
      let engine;
      try {
        for (let cycle = 0; cycle < 2; cycle++) {
          engine = createAgoraRtcEngine();
          const result = {
            version: engine.getVersion(),
            initialize: engine.initialize({
              appId: config.appId,
              logConfig: { filePath: `${reporter.documents}/agora-sdk.log` },
            }),
          };
          state.cycles.push(result);
          report();
          if (result.initialize !== 0)
            throw new Error(`initialize returned ${result.initialize}`);
          engine.registerEventHandler({
            onError: (code, message) => {
              state.errors.push({ code, message });
              report();
            },
          });
          result.connectionState = engine.getConnectionState();
          engine.release(true);
          engine = undefined;
          result.released = true;
          report();
          // Let the asynchronous reporter flush between lifecycle cycles.
          await new Promise((resolve) => setImmediate(resolve));
        }
        state.completed = true;
      } catch (error) {
        state.failure = error.message;
      } finally {
        if (engine) engine.release(true);
        report();
      }
    };
    report();
    run();
  }, []);
  return <Text>Agora native bridge lifecycle test</Text>;
}
