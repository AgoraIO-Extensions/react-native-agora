import React, { ReactElement } from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  ContentInspectModule,
  ContentInspectResult,
  ContentInspectType,
  IRtcEngineEventHandler,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { enumToItems } from '../../../../src/utils';
import { askMediaAccess } from '../../../../src/utils/permissions';

interface State extends BaseVideoComponentState {
  modules: ContentInspectModule[];
  type: ContentInspectType;
  interval: number;
  enableContentInspect: boolean;
}

export default class ContentInspect
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  protected createState(): State {
    return {
      appId: Config.appId,
      enableVideo: true,
      channelId: Config.channelId,
      token: Config.token,
      uid: Config.uid,
      joinChannelSuccess: false,
      remoteUsers: [],
      startPreview: false,
      modules: [],
      type: ContentInspectType.ContentInspectModeration,
      interval: 1,
      enableContentInspect: false,
    };
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      this.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
      logConfig: { filePath: Config.logFilePath },
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    // Need granted the microphone and camera permission
    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);

    // Need to enable video on this case
    // If you only call `enableAudio`, only relay the audio stream to the target channel
    this.engine.enableVideo();

    // This case works if startPreview without joinChannel
    this.engine.startPreview();
    this.setState({ startPreview: true });
  }

  /**
   * Step 2: joinChannel
   */
  protected joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      this.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannel(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1: enableContentInspect
   */
  enableContentInspect = () => {
    const { modules } = this.state;
    if (modules.length <= 0 || modules.length > 32) {
      this.error('modules length is invalid');
      return;
    }

    this.engine?.enableContentInspect(true, {
      modules,
      moduleCount: modules.length,
    });
    this.setState({ enableContentInspect: true });
  };

  /**
   * Step 3-2: disableContentInspect
   */
  disableContentInspect = () => {
    this.engine?.enableContentInspect(false, {});
    this.setState({ enableContentInspect: false });
  };

  /**
   * Step 4: leaveChannel
   */
  protected leaveChannel() {
    this.engine?.leaveChannel();
  }

  /**
   * Step 5: releaseRtcEngine
   */
  protected releaseRtcEngine() {
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onContentInspectResult(result: ContentInspectResult) {
    this.info('onContentInspectResult', 'result', result);
  }

  protected renderConfiguration(): ReactElement | undefined {
    const { modules, type, interval } = this.state;
    return (
      <>
        <AgoraDropdown
          title={'type'}
          items={enumToItems(ContentInspectType)}
          value={type}
          onValueChange={(value) => {
            this.setState({ type: value });
          }}
        />
        <AgoraView horizontal={true}>
          <AgoraButton
            title={'Add'}
            onPress={() => {
              if (interval <= 0) {
                this.error('interval is invalid');
                return;
              }
              this.setState((preState) => {
                return {
                  modules: [
                    ...preState.modules,
                    { type: preState.type, interval: preState.interval },
                  ],
                };
              });
            }}
          />
          <AgoraButton
            title={'Remove'}
            onPress={() => {
              this.setState((preState) => {
                preState.modules.pop();
                return {
                  modules: preState.modules,
                };
              });
            }}
          />
        </AgoraView>
        <AgoraDivider />
        <AgoraText>{`moduleCount: ${modules.length}`}</AgoraText>
        <AgoraDivider />
        <AgoraTextInput
          onChangeText={(text) => {
            if (isNaN(+text)) return;
            this.setState({
              interval: text === '' ? this.createState().interval : +text,
            });
          }}
          numberKeyboard={true}
          placeholder={`interval (defaults: ${this.createState().interval})`}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    const { startPreview, joinChannelSuccess, enableContentInspect } =
      this.state;
    return (
      <>
        <AgoraButton
          disabled={!(startPreview || joinChannelSuccess)}
          onPress={
            enableContentInspect
              ? this.disableContentInspect
              : this.enableContentInspect
          }
          title={`${
            enableContentInspect ? 'disable' : 'enable'
          } Content Inspect`}
        />
      </>
    );
  }
}
