import React, { ReactElement, memo } from 'react';
import { RtcSurfaceView } from 'react-native-agora';

import { AgoraCard, AgoraList, AgoraStyle } from '../../../components/ui';

export interface BaseRenderUsersProps {
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
  renderVideo?: (uid: number) => ReactElement;
}

function BaseRenderUsers({
  startPreview,
  joinChannelSuccess,
  remoteUsers,
  renderVideo = (uid) => (
    <AgoraCard
      containerStyle={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
      title={`${uid === 0 ? 'Local' : 'Remote'} Uid: ${uid}`}
    >
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid }}
      />
    </AgoraCard>
  ),
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
