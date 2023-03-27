import React, { memo } from 'react';
import {
  AgoraButton,
  AgoraTextInput,
  AgoraStyle,
  AgoraView,
} from '../../../components/ui';

export interface BaseRenderChannelProps {
  channelId: string;
  joinChannel: () => void;
  leaveChannel: () => void;
  joinChannelSuccess: boolean;
  onChannelIdChange: (text: string) => void;
}

function BaseRenderChannel({
  channelId,
  joinChannel,
  leaveChannel,
  joinChannelSuccess,
  onChannelIdChange,
}: BaseRenderChannelProps) {
  const handleChannelIdChange = (text: string) => {
    onChannelIdChange(text);
  };
  return (
    <AgoraView style={AgoraStyle.fullWidth}>
      <AgoraTextInput
        onChangeText={(text) => {
          handleChannelIdChange(text);
        }}
        placeholder={`channelId`}
        value={channelId}
      />
      <AgoraButton
        title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
        onPress={() => {
          joinChannelSuccess ? leaveChannel() : joinChannel();
        }}
      />
    </AgoraView>
  );
}

export default memo(BaseRenderChannel);
