import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  AgoraDivider,
  AgoraStyle,
  AgoraText,
  AgoraView,
} from '../../../components/ui';

interface Props {
  name: string;
  enableVideo: boolean;
  renderConfiguration?: () => ReactNode;
  renderChannel: () => ReactNode;
  renderUsers?: () => ReactNode;
  renderAction?: () => ReactNode;
}

export function BaseComponent({
  name,
  enableVideo,
  renderConfiguration,
  renderChannel,
  renderUsers,
  renderAction,
}: Props) {
  const configuration = renderConfiguration ? renderConfiguration() : undefined;
  return (
    <KeyboardAvoidingView
      style={AgoraStyle.fullSize}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AgoraView style={AgoraStyle.fullWidth}>{renderChannel()}</AgoraView>
      {enableVideo ? (
        <AgoraView style={AgoraStyle.videoLarge}>
          {renderUsers ? renderUsers() : undefined}
        </AgoraView>
      ) : undefined}
      {configuration ? (
        <>
          <AgoraDivider />
          <AgoraText style={styles.title}>
            The Configuration of {name}
          </AgoraText>
          <AgoraDivider />
          <ScrollView style={AgoraStyle.fullSize}>{configuration}</ScrollView>
        </>
      ) : undefined}
      <AgoraView style={AgoraStyle.float}>
        {renderAction ? renderAction() : undefined}
      </AgoraView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
