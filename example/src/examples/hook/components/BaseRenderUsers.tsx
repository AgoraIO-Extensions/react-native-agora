import React, { ReactElement, memo } from 'react';
import { RtcSurfaceView } from 'react-native-agora';

import { AgoraCard, AgoraList, AgoraStyle } from '../../../components/ui';

export interface BaseRenderUsersProps {
  renderVideo?: (uid: number) => ReactElement;
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
}

function BaseRenderUsers({
  renderVideo = (uid) => (
    <AgoraCard title={`${uid === 0 ? 'Local' : 'Remote'} Uid: ${uid}`}>
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid }}
      />
    </AgoraCard>
  ),
  startPreview,
  joinChannelSuccess,
  remoteUsers,
}: BaseRenderUsersProps) {
  return (
    <>
      {!!startPreview || joinChannelSuccess ? renderVideo(0) : undefined}
      {!!startPreview || joinChannelSuccess ? (
        <AgoraList
          style={AgoraStyle.videoContainer}
          numColumns={undefined}
          horizontal={true}
          data={remoteUsers}
          renderItem={({ item }) => {
            return renderVideo(item);
          }}
        />
      ) : undefined}
    </>
  );
}

export default memo(BaseRenderUsers);
