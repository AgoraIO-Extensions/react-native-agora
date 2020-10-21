import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RtcEngine, { RtcChannel } from 'react-native-agora';

export default function App() {
  const [result, setResult] = React.useState<string>();

  React.useEffect(() => {
    RtcEngine.create('2b4b76e458cf439aa7cd313b9504f0a4').then(() => {
      RtcChannel.create('xxx').then((channel: RtcChannel) => {
        setResult(channel.channelId);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
