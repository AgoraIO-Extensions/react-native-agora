import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { RtcSurfaceView } from 'react-native-agora';

import { AgoraStyle, AgoraView } from '../../../components/ui';

export interface BaseRenderUsersProps {
  enableVideo: boolean;
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
}

function BaseRenderUsers({
  enableVideo,
  startPreview,
  joinChannelSuccess,
  remoteUsers,
}: BaseRenderUsersProps) {
  const renderVideo = (uid: number): ReactNode => {
    return (
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid }}
      />
    );
  };
  return (
    <>
      {enableVideo ? (
        <AgoraView style={AgoraStyle.videoLarge}>
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
        </AgoraView>
      ) : undefined}
    </>
  );
}

export default BaseRenderUsers;
