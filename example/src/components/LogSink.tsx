import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Overlay } from '@rneui/themed';

import { Divider } from './BaseComponent';

export interface Props {
  visible: boolean;
  data?: Array<string>;
  onBackdropPress: () => void;
}

export const LogSink = ({ visible, data, onBackdropPress }: Props) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={styles.overlay}
    >
      <Text style={styles.title}>Logs</Text>
      <Divider />
      <FlatList
        data={data}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  overlay: {
    width: '100%',
    minHeight: 250,
    maxHeight: 500,
  },
});
