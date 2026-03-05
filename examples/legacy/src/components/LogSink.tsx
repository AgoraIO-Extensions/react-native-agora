import { Overlay } from '@rneui/themed';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { AgoraDivider, AgoraText } from './ui';

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
      <AgoraText style={styles.title}>Logs</AgoraText>
      <AgoraDivider />
      <FlatList
        data={data}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <AgoraText>{item}</AgoraText>}
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
