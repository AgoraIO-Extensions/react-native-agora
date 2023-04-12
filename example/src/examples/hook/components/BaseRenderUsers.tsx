import React, { memo, ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { RtcSurfaceView } from 'react-native-agora';

import { AgoraStyle, AgoraView } from '../../../components/ui';

export interface BaseRenderUsersProps {
  renderVideo?: (uid: number) => ReactNode;
  startPreview: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
}

function BaseRenderUsers({
  renderVideo = (uid) => (
    <RtcSurfaceView
      style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
      zOrderMediaOverlay={uid !== 0}
      canvas={{ uid }}
    />
  ),
  startPreview,
  joinChannelSuccess,
  remoteUsers,
}: BaseRenderUsersProps) {
  return (
    <>
      {startPreview || joinChannelSuccess ? renderVideo(0) : undefined}
      {remoteUsers !== undefined && remoteUsers.length > 0 ? (
        <ScrollView horizontal={true} style={AgoraStyle.videoContainer}>
          {remoteUsers.map((value, index) => (
            <AgoraView key={`${value}-${index}`}>
              {renderVideo(value)}
            </AgoraView>
          ))}
        </ScrollView>
      ) : undefined}
    </>
  );
}

export default memo(BaseRenderUsers);
