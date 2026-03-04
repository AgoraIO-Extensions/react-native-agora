import { ParamListBase } from '@react-navigation/native';
import React, { Component, ReactElement } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  AgoraPipState,
  ErrorCodeType,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
  RtcStats,
  RtcSurfaceView,
  UserOfflineReasonType,
  VideoCanvas,
  VideoSourceType,
} from 'react-native-agora';

import * as log from '../../src/utils/log';
import { PipStateConsumer } from '../context/pip';

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

export interface BaseComponentState {
  appId: string;
  enableVideo: boolean;
  channelId?: string;
  token?: string;
  uid?: number;
  joinChannelSuccess?: boolean;
  remoteUsers?: number[];
  hideAction?: boolean;
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
  extends Component<any, S>
  implements IRtcEngineEventHandler
{
  protected engine?: IRtcEngine;
  updatePipState?: (newState: AgoraPipState) => void;

  constructor(props: any) {
    super(props);
    this.state = this.createState();
  }

  componentDidMount() {
    this.initRtcEngine();
  }

  componentWillUnmount() {
    log.logSink.clearData();
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
    this.setState((preState) => {
      return {
        remoteUsers: [...(preState.remoteUsers ?? []), remoteUid],
      };
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
    this.setState((preState) => {
      return {
        remoteUsers: preState.remoteUsers?.filter((uid) => uid !== remoteUid),
      };
    });
  }

  render() {
    const users = this.renderUsers();
    const configuration = this.renderConfiguration();
    const { hideAction } = this.state;
    return (
      <PipStateConsumer>
        {(context) => {
          this.updatePipState = context.updatePipState;
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
                  <AgoraText
                    style={styles.title}
                    onPress={() => {
                      this.setState({ hideAction: !hideAction });
                    }}
                  >
                    {`The Configuration of ${this.constructor.name}`}
                  </AgoraText>
                  <AgoraDivider />
                  <ScrollView style={AgoraStyle.fullSize}>
                    {configuration}
                  </ScrollView>
                </>
              ) : undefined}
              {!hideAction ? (
                <AgoraView style={AgoraStyle.float}>
                  {this.renderAction()}
                </AgoraView>
              ) : undefined}
            </KeyboardAvoidingView>
          );
        }}
      </PipStateConsumer>
    );
  }

  protected renderChannel(): ReactElement | undefined {
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

  protected renderUsers(): ReactElement | undefined {
    const { enableVideo, startPreview, joinChannelSuccess, remoteUsers } =
      this.state;
    return enableVideo ? (
      <>
        {!!startPreview || joinChannelSuccess
          ? this.renderUser({
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
              this.renderUser({
                uid: item,
                sourceType: VideoSourceType.VideoSourceRemote,
              })!
            }
          />
        ) : undefined}
      </>
    ) : undefined;
  }

  protected renderUser(user: VideoCanvas): ReactElement | undefined {
    const video = this.renderVideo(user);
    return user.uid === 0 ? (
      video
    ) : (
      <AgoraCard
        key={`${user.uid} - ${user.sourceType}`}
        title={`${user.uid} - ${user.sourceType}`}
      >
        {video}
      </AgoraCard>
    );
  }

  protected renderVideo(user: VideoCanvas): ReactElement | undefined {
    return (
      <RtcSurfaceView
        style={user.uid === 0 ? AgoraStyle.videoLarge : AgoraStyle.videoSmall}
        zOrderMediaOverlay={user.uid !== 0}
        canvas={user}
      />
    );
  }

  protected renderConfiguration(): ReactElement | undefined {
    return undefined;
  }

  protected renderAction(): ReactElement | undefined {
    return undefined;
  }

  protected debug(message?: any, ...optionalParams: any[]): void {
    log.log(message, log.log('debug', message, optionalParams));
  }

  protected log(message?: any, ...optionalParams: any[]): void {
    log.log('log', message, optionalParams);
  }

  protected info(message?: any, ...optionalParams: any[]): void {
    log.log('info', message, optionalParams);
  }

  protected warn(message?: any, ...optionalParams: any[]): void {
    this.log('warn', message, optionalParams);
  }

  protected error(message?: any, ...optionalParams: any[]): void {
    log.log('error', message, optionalParams);
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
