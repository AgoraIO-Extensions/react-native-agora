import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ErrorCodeType,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  UserOfflineReasonType,
} from 'react-native-agora';
import { StackScreenProps } from '@react-navigation/stack/src/types';

import {
  AgoraButton,
  AgoraDivider,
  AgoraStyle,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from './ui';
import { LogSink } from './LogSink';

const Header = ({ getData }: { getData: () => Array<string> }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <AgoraButton title="Logs" onPress={toggleOverlay} />
      <LogSink
        visible={visible}
        data={getData()}
        onBackdropPress={toggleOverlay}
      />
    </>
  );
};

export interface BaseComponentState {
  appId: string;
  enableVideo: boolean;
  channelId?: string;
  token?: string;
  uid?: number;
  joinChannelSuccess?: boolean;
  remoteUsers?: number[];
  startPreview?: boolean;
}

export interface BaseAudioComponentState extends BaseComponentState {
  channelId: string;
  token: string;
  uid: number;
  joinChannelSuccess: boolean;
  remoteUsers: number[];
}

export interface BaseVideoComponentState extends BaseAudioComponentState {
  startPreview: boolean;
}

export abstract class BaseComponent<
    P = {},
    S extends BaseComponentState = BaseComponentState
  >
  extends React.Component<P & StackScreenProps<{}>, S>
  implements IRtcEngineEventHandler
{
  protected engine?: IRtcEngine;
  private _data: Array<string> = [];

  protected constructor(props: P & StackScreenProps<{}>) {
    super(props);
    this.state = this.createState();
    props.navigation.setOptions({
      headerRight: () => <Header getData={() => this._data} />,
    });
  }

  componentDidMount() {
    this.initRtcEngine();
  }

  componentWillUnmount() {
    this.releaseRtcEngine();
  }

  protected abstract createState(): S;

  protected abstract initRtcEngine(): void;

  protected joinChannel() {}

  protected leaveChannel() {}

  protected abstract releaseRtcEngine(): void;

  onError(err: ErrorCodeType, msg: string) {
    this.info('onError', 'err', err, 'msg', msg);
  }

  onJoinChannelSuccess(connection: RtcConnection, elapsed: number) {
    this.info(
      'onJoinChannelSuccess',
      'connection',
      connection,
      'elapsed',
      elapsed
    );
    this.setState({ joinChannelSuccess: true });
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
    this.setState(this.createState());
  }

  onUserJoined(connection: RtcConnection, remoteUid: number, elapsed: number) {
    this.info(
      'onUserJoined',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'elapsed',
      elapsed
    );
    const { remoteUsers } = this.state;
    if (remoteUsers === undefined) return;
    this.setState({
      remoteUsers: [...remoteUsers!, remoteUid],
    });
  }

  onUserOffline(
    connection: RtcConnection,
    remoteUid: number,
    reason: UserOfflineReasonType
  ) {
    this.info(
      'onUserOffline',
      'connection',
      connection,
      'remoteUid',
      remoteUid,
      'reason',
      reason
    );
    const { remoteUsers } = this.state;
    if (remoteUsers === undefined) return;
    this.setState({
      remoteUsers: remoteUsers!.filter((value) => value !== remoteUid),
    });
  }

  render() {
    const { enableVideo } = this.state;
    const configuration = this.renderConfiguration();
    return (
      <KeyboardAvoidingView
        style={AgoraStyle.fullSize}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AgoraView style={AgoraStyle.fullWidth}>
          {this.renderChannel()}
        </AgoraView>
        {enableVideo ? (
          <AgoraView style={AgoraStyle.videoLarge}>
            {this.renderUsers()}
          </AgoraView>
        ) : undefined}
        {configuration ? (
          <>
            <AgoraDivider />
            <AgoraText style={styles.title}>
              The Configuration of {this.constructor.name}
            </AgoraText>
            <AgoraDivider />
            <ScrollView style={AgoraStyle.fullSize}>{configuration}</ScrollView>
          </>
        ) : undefined}
        <AgoraView style={AgoraStyle.float}>{this.renderAction()}</AgoraView>
      </KeyboardAvoidingView>
    );
  }

  protected renderChannel(): React.ReactNode {
    const { channelId, joinChannelSuccess } = this.state;
    return (
      <>
        <AgoraTextInput
          onChangeText={(text) => {
            this.setState({ channelId: text });
          }}
          placeholder={`channelId`}
          value={channelId}
        />
        <AgoraButton
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
      </>
    );
  }

  protected renderUsers(): React.ReactNode {
    const { startPreview, joinChannelSuccess, remoteUsers } = this.state;
    return (
      <>
        {startPreview || joinChannelSuccess ? this.renderVideo(0) : undefined}
        {remoteUsers !== undefined && remoteUsers.length > 0 ? (
          <ScrollView horizontal={true} style={AgoraStyle.videoContainer}>
            {remoteUsers.map((value, index) => (
              <AgoraView key={`${value}-${index}`}>
                {this.renderVideo(value)}
              </AgoraView>
            ))}
          </ScrollView>
        ) : undefined}
      </>
    );
  }

  protected renderVideo(uid: number): React.ReactNode {
    return (
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid }}
      />
    );
  }

  protected renderConfiguration(): React.ReactNode {
    return undefined;
  }

  protected renderAction(): React.ReactNode {
    return undefined;
  }

  private _logSink(
    level: 'debug' | 'log' | 'info' | 'warn' | 'error',
    message?: any,
    ...optionalParams: any[]
  ): string {
    if (level === 'error' && !__DEV__) {
      this.alert(message);
    } else {
      console[level](message, ...optionalParams);
    }
    const content = `${optionalParams.map((v) => JSON.stringify(v))}`;
    this._data.splice(0, 0, `[${level}] ${message} ${content}`);
    return content;
  }

  protected debug(message?: any, ...optionalParams: any[]): void {
    this.alert(message, this._logSink('debug', message, optionalParams));
  }

  protected log(message?: any, ...optionalParams: any[]): void {
    this._logSink('log', message, optionalParams);
  }

  protected info(message?: any, ...optionalParams: any[]): void {
    this._logSink('info', message, optionalParams);
  }

  protected warn(message?: any, ...optionalParams: any[]): void {
    this._logSink('warn', message, optionalParams);
  }

  protected error(message?: any, ...optionalParams: any[]): void {
    this._logSink('error', message, optionalParams);
  }

  protected alert(title: string, message?: string): void {
    Alert.alert(title, message);
  }
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
