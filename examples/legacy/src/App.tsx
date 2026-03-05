import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  AgoraPipState,
  SDKBuildInfo,
  createAgoraRtcEngine,
  isDebuggable,
  setDebuggable,
} from 'react-native-agora';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PipStateConsumer, PipStateProvider } from './context/pip';
import Advanced from './examples/advanced';
import Basic from './examples/basic';
import Hooks from './examples/hook';

const RootStack = createNativeStackNavigator<any>();

const DATA = [Basic, Advanced, Hooks];

export default function App() {
  const [version, setVersion] = useState<SDKBuildInfo>({});

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    setVersion(engine.getVersion());
  }, []);

  return (
    <NavigationContainer>
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
                <RootStack.Navigator
                  screenOptions={{
                    gestureEnabled: false,
                    headerShown:
                      context.pipState !== AgoraPipState.pipStateStarted,
                  }}
                >
                  <RootStack.Screen name={'APIExample'} component={Home} />
                  {DATA.map((value) =>
                    value.data.map(({ name, component }) => {
                      return component ? (
                        <RootStack.Screen name={name} component={component} />
                      ) : undefined;
                    })
                  )}
                </RootStack.Navigator>
                {context.pipState !== AgoraPipState.pipStateStarted && (
                  <TouchableOpacity
                    onPress={() => {
                      setDebuggable(!isDebuggable());
                    }}
                  >
                    <Text style={styles.version}>
                      Powered by Agora RTC SDK {version.version} build{' '}
                      {version.build}
                    </Text>
                  </TouchableOpacity>
                )}
              </SafeAreaView>
            )}
          </PipStateConsumer>
        </PipStateProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const AppSectionList = SectionList<any>;

const Home = ({ navigation }: StackScreenProps<any>) => {
  return (
    <AppSectionList
      sections={DATA}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

const Item = ({
  item,
  navigation,
}: Omit<StackScreenProps<any>, 'route'> & { item: any }) => (
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
