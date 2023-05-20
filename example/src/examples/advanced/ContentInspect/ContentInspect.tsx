import React from 'react';
import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  ContentInspectModule,
  ContentInspectResult,
  ContentInspectType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora';

import Config from '../../../config/agora.config';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from '../../../components/ui';
import { enumToItems } from '../../../utils';

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
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    this.engine.registerEventHandler(this);

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
      ]);
    }

    // Must call after initialize and before joinChannel
    if (Platform.OS === 'android') {
      this.engine?.loadExtensionProvider('agora_content_inspect_extension');
    }

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

  protected renderConfiguration(): React.ReactNode {
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
        <AgoraView style={styles.container}>
          <AgoraButton
            title={'Add'}
            onPress={() => {
              if (interval <= 0) {
                this.error('interval is invalid');
                return;
              }
              this.setState({
                modules: [...modules, { type, interval }],
              });
            }}
          />
          <AgoraButton
            title={'Remove'}
            onPress={() => {
              modules.pop();
              this.setState({
                modules: modules,
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
          keyboardType={
            Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'
          }
          placeholder={`interval (defaults: ${this.createState().interval})`}
        />
      </>
    );
  }

  protected renderAction(): React.ReactNode {
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
