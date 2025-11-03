import React, { ReactElement, useState } from 'react';
import {
  BackgroundBlurDegree,
  BackgroundSourceType,
  ClientRoleType,
} from 'react-native-agora';
import ColorPicker, { Panel1 } from 'reanimated-color-picker';

import { BaseComponent } from '../../../../src/components/hook/BaseComponent';
import BaseRenderChannel from '../../../../src/components/hook/BaseRenderChannel';
import BaseRenderUsers from '../../../../src/components/hook/BaseRenderUsers';
import {
  AgoraButton,
  AgoraDropdown,
  AgoraStyle,
  AgoraTextInput,
} from '../../../../src/components/ui';
import {
  enumToItems,
  getAbsolutePath,
  getResourcePath,
} from '../../../../src/utils';
import * as log from '../../../../src/utils/log';
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
  const [color, setColor] = useState('#ffffff');
  const [source, setSource] = useState(getResourcePath('agora-logo.png'));
  const [blur_degree, setBlur_degree] = useState(
    BackgroundBlurDegree.BlurDegreeMedium
  );
  const [enableVirtualBackground, setEnableVirtualBackground] = useState(false);

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
        color: +color.replace('#', '0x'),
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

  const onSelectColor = ({ hex }: { hex: string }) => {
    setColor(hex);
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

  function renderConfiguration(): ReactElement | undefined {
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
            onCompleteJS={onSelectColor}
            value={color}
          >
            <Panel1 />
          </ColorPicker>
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

  function renderAction(): ReactElement | undefined {
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
