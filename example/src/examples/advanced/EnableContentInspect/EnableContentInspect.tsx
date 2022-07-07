import React from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  ContentInspectDeviceType,
  ContentInspectResult,
  ContentInspectType,
  createAgoraRtcEngine,
  IRtcEngineEventHandler,
} from 'react-native-agora-rtc-ng';

import {
  BaseComponent,
  BaseVideoComponentState,
  Divider,
  STYLES,
} from '../../../components/BaseComponent';
import { ActionItem } from '../../../components/ActionItem';
import Config from '../../../config/agora.config.json';
import { PickerView } from '../../../components/PickerView';

interface State extends BaseVideoComponentState {
  DeviceWork: boolean;
  DeviceworkType: ContentInspectDeviceType;
  CloudWork: boolean;
  moduleTypes: ContentInspectType[];
  frequency: number;
  enableContentInspect: boolean;
}

export default class EnableContentInspect
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  private _moduleType: ContentInspectType =
    ContentInspectType.ContentInspectModeration;

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
      DeviceWork: true,
      DeviceworkType: ContentInspectDeviceType.ContentInspectDeviceAgora,
      CloudWork: false,
      moduleTypes: [],
      frequency: 1,
      enableContentInspect: false,
    };
  }

  /**
   * Step 1: initRtcEngine
   */
  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      console.error(`appId is invalid`);
    }

    this.engine = createAgoraRtcEngine();
    this.engine.registerEventHandler(this);
    this.engine.initialize({
      appId,
      // Should use ChannelProfileLiveBroadcasting on most of cases
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });

    if (Platform.OS === 'android') {
      // Need granted the microphone and camera permission
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
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
      console.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      console.error('uid is invalid');
      return;
    }

    // start joining channel
    // 1. Users can only see each other after they join the
    // same channel successfully using the same app id.
    // 2. If app certificate is turned on at dashboard, token is needed
    // when joining channel. The channel name and uid used to calculate
    // the token has to match the ones used for channel join
    this.engine?.joinChannelWithOptions(token, channelId, uid, {
      // Make myself as the broadcaster to send stream to remote
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  /**
   * Step 3-1: enableContentInspect
   */
  enableContentInspect = () => {
    const { DeviceWork, DeviceworkType, CloudWork, moduleTypes, frequency } =
      this.state;
    if (moduleTypes.length <= 0) {
      console.error('moduleTypes is not enough');
      return;
    }
    if (frequency <= 0) {
      console.error('frequency is invalid');
      return;
    }

    this.engine?.SetContentInspect({
      enable: true,
      DeviceWork,
      DeviceworkType,
      CloudWork,
      modules: moduleTypes.map((value) => {
        return { type: value, frequency };
      }),
      moduleCount: moduleTypes.length,
    });
    // ContentInspectType.ContentInspectModeration
    this.setState({ enableContentInspect: true });
  };

  /**
   * Step 3-2: disableContentInspect
   */
  disableContentInspect = () => {
    this.engine?.SetContentInspect({
      enable: false,
    });
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
    this.engine?.release();
  }

  onContentInspectResult(result: ContentInspectResult) {
    this.info('onContentInspectResult', 'result', result);
  }

  protected renderBottom(): React.ReactNode {
    const { DeviceWork, DeviceworkType, CloudWork, moduleTypes, frequency } =
      this.state;
    return (
      <>
        <ActionItem
          title={'DeviceWork'}
          isShowSwitch={true}
          onSwitchValueChange={(value) => {
            this.setState({ DeviceWork: value });
          }}
          switchValue={DeviceWork}
        />
        <Divider />
        <View style={styles.container}>
          <PickerView
            title={'DeviceworkType'}
            type={ContentInspectDeviceType}
            selectedValue={DeviceworkType}
            onValueChange={(value) => {
              this.setState({ DeviceworkType: value });
            }}
          />
        </View>
        <Divider />
        <ActionItem
          title={'CloudWork'}
          isShowSwitch={true}
          onSwitchValueChange={(value) => {
            this.setState({ CloudWork: value });
          }}
          switchValue={CloudWork}
        />
        <Divider />
        <View style={styles.container}>
          <PickerView
            title={'moduleTypes'}
            type={ContentInspectType}
            selectedValue={this._moduleType}
            onValueChange={(value) => {
              this._moduleType = value;
            }}
          />
          <Button
            title={'Add'}
            onPress={() => {
              this.setState({
                moduleTypes: [...moduleTypes, this._moduleType!],
              });
            }}
          />
          <Button
            title={'Remove'}
            onPress={() => {
              this.setState({
                moduleTypes: moduleTypes.filter(
                  (value) => value !== this._moduleType
                ),
              });
            }}
          />
        </View>
        <Divider />
        <Text>{`moduleCount: ${moduleTypes.length}`}</Text>
        <Divider />
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => this.setState({ frequency: +text })}
          keyboardType={'numeric'}
          placeholder={`frequency (defaults: ${frequency})`}
          placeholderTextColor={'gray'}
          value={
            frequency === this.createState().frequency
              ? ''
              : frequency.toString()
          }
        />
      </>
    );
  }

  protected renderFloat(): React.ReactNode {
    const { startPreview, joinChannelSuccess, enableContentInspect } =
      this.state;
    return (
      <>
        <ActionItem
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
