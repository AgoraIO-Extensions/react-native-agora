import React, { ReactElement, memo } from 'react';
import {
  RtcSurfaceView,
  VideoCanvas,
  VideoSourceType,
} from 'react-native-agora';

import { AgoraCard, AgoraList, AgoraStyle } from '../../../components/ui';

export interface BaseRenderUsersProps {
  enableVideo: boolean;
  startPreview?: boolean;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
  renderUser?: (user: VideoCanvas) => ReactElement;
  renderVideo?: (user: VideoCanvas) => ReactElement;
}

function BaseRenderUsers({
  enableVideo,
  startPreview,
  joinChannelSuccess,
  remoteUsers,
  renderUser = (user) => {
    const video = renderVideo(user);
    if (enableVideo && user.uid === 0) {
      return video;
    }
    return (
      <AgoraCard title={`${user.uid} - ${user.sourceType}`}>
        {enableVideo ? <>{video}</> : undefined}
      </AgoraCard>
    );
  },
  renderVideo = (user) => (
    <RtcSurfaceView
      style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
      zOrderMediaOverlay={user.uid !== 0}
      canvas={user}
    />
  ),
}: BaseRenderUsersProps) {
  return (
    <>
      {!!startPreview || joinChannelSuccess
        ? renderUser({
            uid: 0,
            sourceType: VideoSourceType.VideoSourceCamera,
          })
        : undefined}
      {!!startPreview || joinChannelSuccess ? (
        <AgoraList
          style={AgoraStyle.videoContainer}
          numColumns={undefined}
          horizontal={true}
          data={remoteUsers}
          renderItem={({ item }) =>
            renderUser({
              uid: item,
              sourceType: VideoSourceType.VideoSourceRemote,
            })
          }
        />
      ) : undefined}
    </>
  );
}

export default memo(BaseRenderUsers);
