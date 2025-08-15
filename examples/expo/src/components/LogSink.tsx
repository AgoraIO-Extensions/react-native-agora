import { Overlay } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import * as log from '../utils/log';

import { AgoraButton, AgoraDivider, AgoraText } from './ui';

export interface Props {
  onBackdropPress: () => void;
}

export const LogSink = ({ onBackdropPress }: Props) => {
  const [data, setData] = useState<Array<string> | undefined>(
    log.logSink._data
  );

  useEffect(() => {
    setData(log.logSink._data);
  }, [data]);

  return (
    <Overlay
      isVisible
      onBackdropPress={onBackdropPress}
      overlayStyle={styles.overlay}
    >
      <AgoraText style={styles.title}>Logs</AgoraText>
      <AgoraButton
        title={'clear'}
        onPress={() => {
          log.logSink.clearData();
          setData([]);
        }}
      />
      <AgoraDivider />
      <FlatList
        data={data}
        inverted={true}
        scrollEnabled
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
