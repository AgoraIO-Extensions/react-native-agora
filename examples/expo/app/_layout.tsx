import { Stack } from 'expo-router';

import React, { useState } from 'react';

import { Keyboard, StyleSheet } from 'react-native';
import { AgoraPipState } from 'react-native-agora';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LogSink } from '../src/components/LogSink';

import { AgoraText } from '../src/components/ui';

import { PipStateConsumer, PipStateProvider } from '../src/context/pip';

import Advanced from './examples/advanced';
import Basic from './examples/basic';
import Hooks from './examples/hook';

const Header = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <AgoraText onPress={toggleOverlay}>Logs</AgoraText>
      {visible && <LogSink onBackdropPress={toggleOverlay} />}
    </>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PipStateProvider>
        <PipStateConsumer>
          {(context) => (
            <SafeAreaView
              style={styles.container}
              onStartShouldSetResponder={(_) => {
                Keyboard.dismiss();
                return false;
              }}
            >
              <Stack>
                <Stack.Screen name="index" options={{ title: 'API Example' }} />
                {Basic.data.map((item) => (
                  <Stack.Screen
                    key={item.name}
                    name={`examples/basic/${item.name}/${item.name}`}
                    options={{
                      title: item.name,
                      headerRight: () => <Header />,
                      headerShown:
                        context.pipState !== AgoraPipState.pipStateStarted,
                    }}
                  />
                ))}
                {Advanced.data.map((item) => (
                  <Stack.Screen
                    key={item.name}
                    name={`examples/advanced/${item.name}/${item.name}`}
                    options={{
                      title: item.name,
                      headerRight: () => <Header />,
                      headerShown:
                        context.pipState !== AgoraPipState.pipStateStarted,
                    }}
                  />
                ))}
                {Hooks.data.map((item) => (
                  <Stack.Screen
                    key={item.name}
                    name={`examples/hook/${item.name}/${item.name}`}
                    options={{
                      title: item.name,
                      headerRight: () => <Header />,
                      headerShown:
                        context.pipState !== AgoraPipState.pipStateStarted,
                    }}
                  />
                ))}
              </Stack>
            </SafeAreaView>
          )}
        </PipStateConsumer>
      </PipStateProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
