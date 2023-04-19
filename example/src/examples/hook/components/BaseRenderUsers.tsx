import React, { ReactElement, memo } from 'react';
import { RtcSurfaceView } from 'react-native-agora';

import { AgoraCard, AgoraList, AgoraStyle } from '../../../components/ui';

export interface BaseRenderUsersProps {
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
  renderUser?: (uid: number) => ReactElement;
  renderVideo?: (uid: number) => ReactElement;
}

function BaseRenderUsers({
  startPreview,
  joinChannelSuccess,
  remoteUsers,
  renderUser = (uid) => {
    const video = renderVideo(uid);
    return uid === 0 ? video : <AgoraCard title={`${uid}`}>{video}</AgoraCard>;
  },
  renderVideo = (uid) => (
    <RtcSurfaceView
      style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
      zOrderMediaOverlay={uid !== 0}
      canvas={{ uid }}
    />
  ),
}: BaseRenderUsersProps) {
  return (
    <>
      {!!startPreview || joinChannelSuccess ? renderUser(0) : undefined}
      {!!startPreview || joinChannelSuccess ? (
        <AgoraList
          style={AgoraStyle.videoContainer}
          numColumns={undefined}
          horizontal={true}
          data={remoteUsers}
          renderItem={({ item }) => renderUser(item)}
        />
      ) : undefined}
    </>
  );
}

export default memo(BaseRenderUsers);
