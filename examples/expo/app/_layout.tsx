import { Stack } from 'expo-router';

import React, { useState } from 'react';

import { Keyboard, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LogSink } from '../src/components/LogSink';

import { AgoraText } from '../src/components/ui';

import { PipStateProvider } from '../src/context/pip';

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
                options={{ title: item.name, headerRight: () => <Header /> }}
              />
            ))}
            {Advanced.data.map((item) => (
              <Stack.Screen
                key={item.name}
                name={`examples/advanced/${item.name}/${item.name}`}
                options={{ title: item.name, headerRight: () => <Header /> }}
              />
            ))}
            {Hooks.data.map((item) => (
              <Stack.Screen
                key={item.name}
                name={`examples/hook/${item.name}/${item.name}`}
                options={{ title: item.name, headerRight: () => <Header /> }}
              />
            ))}
          </Stack>
        </SafeAreaView>
      </PipStateProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
