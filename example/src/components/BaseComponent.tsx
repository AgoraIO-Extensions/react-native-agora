import React, { Component, ReactNode, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  UserOfflineReasonType,
} from 'react-native-agora-rtc-ng';
import {
  copyFileAssets,
  exists,
  ExternalCachesDirectoryPath,
  MainBundlePath,
} from 'react-native-fs';
import * as RNEUI from '@rneui/base';
import { StackScreenProps } from '@react-navigation/stack/src/types';

import { LogSink } from './LogSink';

export const Divider = () => {
  return <RNEUI.Divider width={1} color={'grey'} />;
};

const Header = ({ getData }: { getData: () => Array<string> }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button title="Logs" onPress={toggleOverlay} />
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
  extends Component<P & StackScreenProps<{}>, S>
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

  onWarning(warn: number, msg: string) {
    this.warn('onWarning', 'warn', warn, 'msg', msg);
  }

  onError(err: number, msg: string) {
    this.error('onError', 'err', err, 'msg', msg);
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
    const { route } = this.props;
    const { enableVideo } = this.state;
    const bottom = this.renderBottom();
    return (
      <>
        <View style={STYLES.top}>{this.renderTop()}</View>
        {enableVideo ? (
          <View style={STYLES.video}>{this.renderVideo()}</View>
        ) : undefined}
        {bottom ? (
          <>
            <Divider />
            <Text style={STYLES.title}>The Configuration of {route.name}</Text>
            <Divider />
            <ScrollView style={STYLES.bottom}>{bottom}</ScrollView>
          </>
        ) : undefined}
        <View style={STYLES.float}>{this.renderFloat()}</View>
      </>
    );
  }

  protected renderTop(): ReactNode {
    const { channelId, joinChannelSuccess } = this.state;
    return (
      <>
        <TextInput
          style={STYLES.input}
          onChangeText={(text) => this.setState({ channelId: text })}
          placeholder={`channelId`}
          value={channelId}
        />
        <Button
          title={`${joinChannelSuccess ? 'leave' : 'join'} Channel`}
          onPress={() => {
            joinChannelSuccess ? this.leaveChannel() : this.joinChannel();
          }}
        />
      </>
    );
  }

  protected renderVideo(): ReactNode {
    const { startPreview, joinChannelSuccess, remoteUsers } = this.state;
    return (
      <>
        {startPreview || joinChannelSuccess ? (
          <RtcSurfaceView style={STYLES.video} canvas={{ uid: 0 }} />
        ) : undefined}
        {remoteUsers !== undefined && remoteUsers.length > 0 ? (
          <ScrollView horizontal={true} style={STYLES.videoContainer}>
            {remoteUsers.map((value, index) => (
              <RtcSurfaceView
                key={`${value}-${index}`}
                style={STYLES.videoSmall}
                canvas={{ uid: value }}
              />
            ))}
          </ScrollView>
        ) : undefined}
      </>
    );
  }

  protected renderBottom(): ReactNode {
    return undefined;
  }

  protected renderFloat(): ReactNode {
    return undefined;
  }

  private _logSink(
    level: 'debug' | 'log' | 'info' | 'warn' | 'error',
    message?: any,
    ...optionalParams: any[]
  ): string {
    console[level](message, optionalParams);
    const content = `${optionalParams.map((v) => JSON.stringify(v))}`;
    this._data.splice(0, 0, `[${level}] ${message} ${content}`);
    return content;
  }

  protected debug(message?: any, ...optionalParams: any[]): void {
    Alert.alert(message, this._logSink('debug', message, optionalParams));
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

  protected getAssetPath(fileName: string): string {
    if (Platform.OS === 'android') {
      return `/assets/${fileName}`;
    }
    return `${MainBundlePath}/${fileName}`;
  }

  protected async getAbsolutePath(filePath: string): Promise<string> {
    if (Platform.OS === 'android') {
      if (filePath.startsWith('/assets/')) {
        // const fileName = filePath;
        const fileName = filePath.replace('/assets/', '');
        const destPath = `${ExternalCachesDirectoryPath}/${fileName}`;
        if (!(await exists(destPath))) {
          await copyFileAssets(fileName, destPath);
        }
        return destPath;
      }
    }
    return filePath;
  }
}

export const STYLES = StyleSheet.create({
  top: {
    width: '100%',
  },
  input: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    color: 'black',
  },
  video: {
    flex: 1,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoSmall: {
    width: 120,
    height: 120,
  },
  bottom: {
    flex: 1,
  },
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
  },
});
