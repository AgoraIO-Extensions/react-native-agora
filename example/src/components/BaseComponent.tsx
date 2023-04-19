import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { Component, ReactElement, ReactNode, useState } from 'react';
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

import { LogSink } from './LogSink';
import {
  AgoraButton,
  AgoraCard,
  AgoraDivider,
  AgoraList,
  AgoraStyle,
  AgoraText,
  AgoraTextInput,
  AgoraView,
} from './ui';

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
    P extends ParamListBase,
    S extends BaseComponentState = BaseComponentState
  >
  extends Component<StackScreenProps<{ [T in keyof P]: P[T] }, string>, S>
  implements IRtcEngineEventHandler
{
  protected engine?: IRtcEngine;
  private _data: Array<string> = [];

  constructor(props: StackScreenProps<{ [T in keyof P]: P[T] }, string>) {
    super(props);
    this.state = this.createState();
    const headerRight = () => <Header getData={() => this._data} />;
    props.navigation.setOptions({ headerRight });
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
    const users = this.renderUsers();
    const configuration = this.renderConfiguration();
    return (
      <KeyboardAvoidingView
        style={AgoraStyle.fullSize}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AgoraView style={AgoraStyle.fullWidth}>
          {this.renderChannel()}
        </AgoraView>
        {users ? (
          <AgoraView style={AgoraStyle.fullSize}>{users}</AgoraView>
        ) : undefined}
        {configuration ? (
          <>
            <AgoraDivider />
            <AgoraText style={styles.title}>
              {`The Configuration of ${this.constructor.name}`}
            </AgoraText>
            <AgoraDivider />
            <ScrollView style={AgoraStyle.fullSize}>{configuration}</ScrollView>
          </>
        ) : undefined}
        <AgoraView style={AgoraStyle.float}>{this.renderAction()}</AgoraView>
      </KeyboardAvoidingView>
    );
  }

  protected renderChannel(): ReactNode {
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

  protected renderUsers(): ReactNode {
    const { enableVideo, startPreview, joinChannelSuccess, remoteUsers } =
      this.state;
    return enableVideo ? (
      <>
        {!!startPreview || joinChannelSuccess ? this.renderUser(0) : undefined}
        {!!startPreview || joinChannelSuccess ? (
          <AgoraList
            style={AgoraStyle.videoContainer}
            numColumns={undefined}
            horizontal={true}
            data={remoteUsers}
            renderItem={({ item }) => {
              return this.renderUser(item);
            }}
          />
        ) : undefined}
      </>
    ) : undefined;
  }

  private renderUser(uid: number): ReactElement {
    const video = this.renderVideo(uid);
    return uid === 0 ? video : <AgoraCard title={`${uid}`}>{video}</AgoraCard>;
  }

  protected renderVideo(uid: number): ReactElement {
    return (
      <RtcSurfaceView
        style={uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={uid !== 0}
        canvas={{ uid }}
      />
    );
  }

  protected renderConfiguration(): ReactNode {
    return undefined;
  }

  protected renderAction(): ReactNode {
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
