import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createAgoraRtcEngine,
  SDKBuildInfo,
  isDebuggable,
  setDebuggable,
} from 'react-native-agora';

import Basic from './examples/basic';
import Advanced from './examples/advanced';
import Hooks from './examples/hooks';

const Stack = createStackNavigator();

const DATA = [Basic, Advanced, Hooks];

export default function App() {
  const [version, setVersion] = useState<SDKBuildInfo>({});

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    setVersion(engine.getVersion());
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView
        style={styles.container}
        onStartShouldSetResponder={(_) => {
          Keyboard.dismiss();
          return false;
        }}
      >
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name={'APIExample'} component={Home} />
          {DATA.map((value) =>
            value.data.map(({ name, component }) =>
              component ? (
                // @ts-ignore
                <Stack.Screen name={name} component={component} />
              ) : undefined
            )
          )}
        </Stack.Navigator>
        <TouchableOpacity
          onPress={() => {
            setDebuggable(!isDebuggable());
          }}
        >
          <Text style={styles.version}>
            Powered by Agora RTC SDK {version.version} build {version.build}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </NavigationContainer>
  );
}

// @ts-ignore
const Home = ({ navigation }) => {
  return (
    <SectionList
      // @ts-ignore
      sections={DATA}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

// @ts-ignore
const Item = ({ item, navigation }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    fontSize: 24,
    color: 'white',
    backgroundColor: 'grey',
  },
  item: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  version: {
    backgroundColor: '#ffffffdd',
    textAlign: 'center',
  },
});
