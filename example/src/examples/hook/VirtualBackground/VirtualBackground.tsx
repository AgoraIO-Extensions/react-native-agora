import React, { ReactNode, useEffect, useState } from 'react';
import {
  BackgroundBlurDegree,
  BackgroundSourceType,
  ClientRoleType,
} from 'react-native-agora';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import {
  AgoraButton,
  AgoraDropdown,
  AgoraStyle,
  AgoraTextInput,
} from '../../../components/ui';
import { enumToItems, getAbsolutePath, getResourcePath } from '../../../utils';
import * as log from '../../../utils/log';
import { BaseComponent } from '../components/BaseComponent';
import BaseRenderChannel from '../components/BaseRenderChannel';
import BaseRenderUsers from '../components/BaseRenderUsers';
import useInitRtcEngine from '../hooks/useInitRtcEngine';

export default function VirtualBackground() {
  const [enableVideo] = useState<boolean>(true);
  const {
    channelId,
    setChannelId,
    token,
    uid,
    joinChannelSuccess,
    remoteUsers,
    startPreview,
    engine,
  } =
    /**
     * Step 1: initRtcEngine
     */
    useInitRtcEngine(enableVideo);

  const [background_source_type, setBackground_source_type] = useState<number>(
    BackgroundSourceType.BackgroundColor
  );
  const [color, setColor] = useState(0xffffff);
  const [source, setSource] = useState(getResourcePath('agora-logo.png'));
  const [blur_degree, setBlur_degree] = useState(
    BackgroundBlurDegree.BlurDegreeMedium
  );
  const [enableVirtualBackground, setEnableVirtualBackground] = useState(false);

  useEffect(() => {
    engine.current.enableExtension(
      'agora_video_filters_segmentation',
      'portrait_segmentation',
      true
    );
  }, [engine]);

  /**
   * Step 2: joinChannel
   */
  const joinChannel = () => {
    if (!channelId) {
      log.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      log.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    engine.current.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  };

  /**
   * Step 3-1: enableVirtualBackground
   */
  const _enableVirtualBackground = async () => {
    if (
      background_source_type === BackgroundSourceType.BackgroundImg &&
      !source
    ) {
      log.error('source is invalid');
      return;
    }

    engine.current.enableVirtualBackground(
      true,
      {
        background_source_type,
        color,
        source: await getAbsolutePath(source),
        blur_degree,
      },
      {}
    );
    setEnableVirtualBackground(true);
  };

  /**
   * Step 3-2: disableVirtualBackground
   */
  const disableVirtualBackground = () => {
    engine.current.enableVirtualBackground(false, {}, {});
    setEnableVirtualBackground(false);
  };

  /**
   * Step 4: leaveChannel
   */
  const leaveChannel = () => {
    engine.current.leaveChannel();
  };

  return (
    <BaseComponent
      name={'VirtualBackground'}
      renderConfiguration={renderConfiguration}
      renderChannel={() => (
        <BaseRenderChannel
          channelId={channelId}
          joinChannel={joinChannel}
          leaveChannel={leaveChannel}
          joinChannelSuccess={joinChannelSuccess}
          onChannelIdChange={setChannelId}
        />
      )}
      renderUsers={() => (
        <BaseRenderUsers
          enableVideo={enableVideo}
          startPreview={startPreview}
          joinChannelSuccess={joinChannelSuccess}
          remoteUsers={remoteUsers}
        />
      )}
      renderAction={renderAction}
    />
  );

  function renderConfiguration(): ReactNode {
    return (
      <>
        <AgoraDropdown
          title={'backgroundSourceType'}
          items={enumToItems(BackgroundSourceType)}
          value={background_source_type}
          onValueChange={(value) => {
            setBackground_source_type(value);
          }}
        />
        {background_source_type === BackgroundSourceType.BackgroundColor ? (
          <ColorPicker
            style={AgoraStyle.picker}
            onColorChange={(selectedColor) => {
              setColor(+fromHsv(selectedColor).replace('#', '0x'));
            }}
            color={`#${color?.toString(16)}`}
          />
        ) : undefined}
        <AgoraTextInput
          editable={
            background_source_type === BackgroundSourceType.BackgroundImg
          }
          onChangeText={(text) => {
            setSource(text);
          }}
          placeholder={'source'}
          value={source}
        />
        <AgoraDropdown
          enabled={
            background_source_type === BackgroundSourceType.BackgroundBlur
          }
          title={'blurDegree'}
          items={enumToItems(BackgroundBlurDegree)}
          value={blur_degree}
          onValueChange={(value) => {
            setBlur_degree(value);
          }}
        />
      </>
    );
  }

  function renderAction(): ReactNode {
    return (
      <>
        <AgoraButton
          disabled={!(startPreview || joinChannelSuccess)}
          title={`${
            enableVirtualBackground ? 'disable' : 'enable'
          } Virtual Background`}
          onPress={
            enableVirtualBackground
              ? disableVirtualBackground
              : _enableVirtualBackground
          }
        />
      </>
    );
  }
}
