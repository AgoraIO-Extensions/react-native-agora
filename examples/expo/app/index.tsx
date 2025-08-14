import { Link } from 'expo-router';
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

import { PipStateConsumer, PipStateProvider } from '../src/context/pip';

import Advanced from '../src/examples/advanced';
import Basic from '../src/examples/basic';
import Hooks from '../src/examples/hook';

const DATA = [Basic, Advanced, Hooks];
const AppSectionList = SectionList<any>;

export default function Index() {
  const [version, setVersion] = useState<SDKBuildInfo>({});

  useEffect(() => {
    const engine = createAgoraRtcEngine();
    setVersion(engine.getVersion());
  }, []);

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
              <AppSectionList
                sections={DATA}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item, section }) => (
                  <View style={styles.item}>
                    <Link
                      style={styles.title}
                      href={`examples/${section.title}/${item.name}/${item.name}`}
                    >
                      {item.name}
                    </Link>
                  </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
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
  );
}

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
