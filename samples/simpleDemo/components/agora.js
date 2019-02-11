import React, {Component, PureComponent} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  Image, Dimensions, Modal, Platform, NativeModules
} from 'react-native';

import {RtcEngine, AgoraView} from 'react-native-agora';
import {
  APPID,
  isIphoneX, isIphoneXR
} from '../utils';

const {Agora} = NativeModules;

if (!Agora) {
  throw new Error("Agora load failed in react-native, please check ur compiler environments");
}

const {
  FPS30,
  FixedLandscape,
  Host,
  AudioProfileDefault,
  AudioScenarioDefault,
} = Agora;

const BtnEndCall = () => require('../assets/btn_endcall.png');
const BtnMute = () => require('../assets/btn_mute.png');
const BtnSpeaker = () => require('../assets/btn_speaker.png');
const BtnSwitchCamera = () => require('../assets/btn_switch_camera.png');
const BtnVideo = () => require('../assets/btn_video.png');
const EnableCamera = () => require('../assets/enable_camera.png');
const DisableCamera = () => require('../assets/disable_camera.png');
const EnablePhotoflash = () => require('../assets/enable_photoflash.png');
const DisablePhotoflash = () => require('../assets/disable_photoflash.png');
const IconMuted = () => require('../assets/icon_muted.png');
const IconSpeaker = () => require('../assets/icon_speaker.png');

const {width, height} = Dimensions.get('window');

const safeTop = (top) => (isIphoneX(Platform, width, height) ?
  (top + 88) :
  (isIphoneXR(Platform, width, height) ? ( top + 64 ) : top)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  absView: {
    position: 'absolute',
    top: safeTop(0),
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  videoView: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    zIndex: 100
  },
  localView: {
    flex: 1
  },
  remoteView: {
    width: (width - 40) / 3,
    height: (width - 40) / 3,
    margin: 5
  },
  bottomView: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

class OperateButton extends PureComponent {
  render() {
    const {onPress, source, style, imgStyle = {width: 50, height: 50}} = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        activeOpacity={.7}
      >
        <Image
          style={imgStyle}
          source={source}
        />
      </TouchableOpacity>
    )
  }
}

type Props = {
  channelProfile: Number,
  channelName: String,
  videoProfile: Number,
  clientRole: Number,
  onCancel: Function
}

export default class AgoraComponent extends Component<Props> {
  state = {
    peerIds: [],
    joinSucceed: false,
    isSpeak: true,
    isMute: false,
    isCameraTorch: false,
    disableVideo: false,
    hideButton: false,
    visible: false,
    selectedUid: undefined,
  };

  componentWillMount () {
    const config = {
      appid: APPID,
      channelProfile: this.props.channelProfile,
      videoProfile: this.props.videoProfile,
      clientRole: this.props.clientRole,
      videoEncoderConfig: {
        width: 360,
        height: 480,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: FixedLandscape,
      },
      clientRole: Host,
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault
    }
    console.log("[CONFIG]", JSON.stringify(config));
    console.log("[CONFIG.encoderConfig", config.videoEncoderConfig);
    RtcEngine.init(config);
  }

  componentDidMount () {
    RtcEngine.getSdkVersion((version) => {
      console.log('[RtcEngine] getSdkVersion', version);
    })

    console.log('[joinChannel] ' + this.props.channelName);
    RtcEngine.joinChannel(this.props.channelName);
    RtcEngine.enableAudioVolumeIndication(500, 3);
    RtcEngine.eventEmitter({
      FirstRemoteVideoDecodedOfUid: (data) => {
        console.log('[RtcEngine] firstRemoteVideoDecodedOfUid', data);
      },
      DidOfflineOfUid: (data) => {
        console.log('[RtcEngine] didOfflineOfUid', data);
        this.setState({
            peerIds: this.state.peerIds.filter(uid => uid !== data.uid)
        })
      },
      DidJoinChannel: (data) => {
        console.log('[RtcEngine] didJoinChannel', data);
        // RtcEngine.setShowLocalVideo()
        RtcEngine.startPreview();
        this.setState({
          joinSucceed: true
        })
        const {peerIds} = this.state;
        if (peerIds.indexOf(data.uid) !== -1) {
          this.setState({
            peerIds: [...peerIds, data.uid]
          })
        }
      },
      ReportAudioVolumeIndicationOfSpeakers: (data) => {
        console.log('[RtcEngine] reportAudioVolumeIndicationOfSpeakers', data);
      },
      DidClientRoleChanged: (data) => {
        console.log("[RtcEngine] DidClientRoleChanged", data);
      },
      // onUserJoined: (data) => {
      //   console.log('[RtcEngine] onUserJoined', data);
      //   const {peerIds} = this.state;
      //   if (peerIds.indexOf(data.uid) !== -1) {
      //     this.setState({
      //       peerIds: [...peerIds, data.uid]
      //     })
      //   }
      // },
      DidOccurError: (data) => {
        console.log('[RtcEngine] onError', data);
        if (data.error === 17) {
          RtcEngine.leaveChannel().then(_ => {
            RtcEngine.destroy();
            this.props.onCancel(data);
          });
        }
      }
    })
  }

  componentWillUnmount () {
    RtcEngine.leaveChannel();
    RtcEngine.destroy();
  }

  handleCancel = () => {
    RtcEngine.leaveChannel();
    RtcEngine.destroy();
    this.props.onCancel();
  }

  switchCamera = () => {
    RtcEngine.switchCamera();
  }

  toggleAllRemoteAudioStreams = () => {
    this.setState({
      isMute: !this.state.isMute
    }, () => {
      RtcEngine.muteAllRemoteAudioStreams(this.state.isMute);
    })
  }

  toggleSpeakerPhone = () => {
    this.setState({
      isSpeak: !this.state.isSpeak
    }, () => {
      RtcEngine.setDefaultAudioRouteToSpeakerphone(this.state.isSpeak);
    })
  }

  toggleCameraTorch = () => {
    this.setState({
      isCameraTorch: !this.state.isCameraTorch
    }, () => {
      RtcEngine.setCameraTorchOn(this.state.isCameraTorch)
    })
  }

  toggleVideo = () => {
    this.setState({
      disableVideo: !this.state.videodisableVideo
    }, () => {
      this.state.disableVideo ? RtcEngine.enableVideo() : RtcEngine.disableVideo()
    });
  }

  toggleHideButtons = () => {
    this.setState({
      hideButton: !this.state.hideButton
    })
  }

  onPressVideo = (uid) => {
    this.setState({
      selectedUid: uid
    }, () => {
      this.setState({
        visible: true
      })
    })
  }

  buttonsView = ({hideButton, isCameraTorch, disableVideo, isMute, isSpeaker}) => {
    if (!hideButton) {
    return (
      <View>
        <OperateButton
          style={{alignSelf: 'center', marginBottom: -10}}
          onPress={this.handleCancel}
          imgStyle={{width: 60, height: 60}}
          source={BtnEndCall()}
      />
      <View style={styles.bottomView}>
        <OperateButton
          onPress={this.toggleCameraTorch}
          imgStyle={{width: 40, height: 40}}
          source={isCameraTorch ? EnablePhotoflash() : DisablePhotoflash()}
        />
        <OperateButton
          onPress={this.toggleVideo}
          source={disableVideo ? EnableCamera() : DisableCamera()}
        />
      </View>
      <View style={styles.bottomView}>
        <OperateButton
          onPress={this.toggleAllRemoteAudioStreams}
          source={isMute ? IconMuted() : BtnMute()}
        />
        <OperateButton
          onPress={this.switchCamera}
          source={BtnSwitchCamera()}
        />
        <OperateButton
          onPress={this.toggleSpeakerPhone}
          source={!isSpeaker ? IconSpeaker() : BtnSpeaker()}
        />
      </View>
      </View>)
    }
  }

  agoraPeerViews = ({visible, peerIds}) => {
    return (visible ? 
    <View style={styles.videoView} /> :
    <View style={styles.videoView}>{
      peerIds.map((uid, key) => (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.onPressVideo(uid)}
        key={key}>
      <AgoraView
          style={styles.remoteView}
          zOrderMediaOverlay={true}
          remoteUid={uid}
      />
      </TouchableOpacity>
      ))
      }</View>)
  }

  modalView = ({visible}) => {
    return (
    <Modal
      visible={visible}
      presentationStyle={'fullScreen'}
      animationType={'slide'}
      onRequestClose={() => {}}
      >
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => this.setState({
          visible: false
      })} >
        <AgoraView
          style={{flex: 1}}
          zOrderMediaOverlay={true}
          remoteUid={this.state.selectedUid}
        />
      </TouchableOpacity>
    </Modal>)
  }

  render () {
    if (!this.state.joinSucceed) {
      return (
      <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Creating a video conference...</Text>
      </View>
      )
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.toggleHideButtons}
        style={styles.container}
      >
        <AgoraView style={styles.localView} showLocalVideo={true} />
          <View style={styles.absView}>
            <Text>channelName: {this.props.channelName}, peers: {this.state.peerIds.length}</Text>
            {this.agoraPeerViews(this.state)}
            {this.buttonsView(this.state)}
          </View>
        {this.modalView(this.state)}
      </TouchableOpacity>
    )
  }
}
