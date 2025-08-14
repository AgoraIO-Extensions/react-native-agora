import { Stack } from 'expo-router';

import React from 'react';

import Advanced from '../src/examples/advanced';
import Basic from '../src/examples/basic';
import Hooks from '../src/examples/hook';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'API Example' }} />
      {Basic.data.map((item) => (
        <Stack.Screen
          key={item.name}
          name={`examples/basic/${item.name}/${item.name}`}
          options={{ title: item.name }}
        />
      ))}
      {Advanced.data.map((item) => (
        <Stack.Screen
          key={item.name}
          name={`examples/advanced/${item.name}/${item.name}`}
          options={{ title: item.name }}
        />
      ))}
      {Hooks.data.map((item) => (
        <Stack.Screen
          key={item.name}
          name={`examples/hook/${item.name}/${item.name}`}
          options={{ title: item.name }}
        />
      ))}
    </Stack>
  );
}
