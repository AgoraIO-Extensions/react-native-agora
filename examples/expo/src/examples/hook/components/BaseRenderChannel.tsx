import React, { memo } from 'react';

import { AgoraButton, AgoraTextInput } from '../../../../src/components/ui';

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
  return (
    <>
      <AgoraTextInput
        onChangeText={(text) => {
          onChannelIdChange(text);
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
    </>
  );
}

export default memo(BaseRenderChannel);
