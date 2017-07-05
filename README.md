[![QQ Group](https://img.shields.io/badge/QQ%20Group-471757030-red.svg)]()

# react-native-agora

## Installation and linking libraries

Install with npm:

 `npm install --save react-native-agora`

Or, install with yarn:

 `yarn add react-native-agora`

Either way, then link with:

 `react-native link react-native-agora`

#### iOS

TARGETS->Build Phases-> Link Binary With Libaries中点击“+”按钮，选择

    libresolv.tbd
    libc++.tbd
    AVFoundation.framework
    AudioToolbox.framework
    VideoToolbox.framework
    CoreMotion.framework
    CoreMedia.framework
    CoreTelephony.framework
    
TARGETS->Build Phases-> Link Binary With Libaries中点击“+”按钮，在弹出的窗口中点击“Add Other”按钮，选择

    node_modules/react-native-agora/ios/RCTAgora/libs/libcrypto.a
    node_modules/react-native-agora/ios/RCTAgora/libs/AgoraRtcCryptoLoader.framework
    node_modules/react-native-agora/ios/RCTAgora/libs/AgoraRtcEngineKit.framework
    
TARGETS->Build Settings->Search Paths->Framework Search Paths添加

    "$(SRCROOT)/../node_modules/react-native-agora/ios/RCTAgora/libs"
    
TARGETS->Build Settings->Search Paths->Library Search Paths添加

    "$(SRCROOT)/../node_modules/react-native-agora/ios/RCTAgora/libs"
    
TARGETS->Build Settings->Enable Bitcode设置为No

TARGETS->Capabilities->Background Modes->Modes勾选Audio,AirPlay,and Picture In Picture

项目目录->Info.plist->增加2项

    "Privacy - Camera Usage Description":"use camera to start video call"
    "Privacy - Microphone Usage Description":"use microphone to start video call"


#### Android

Add following to `AndroidManifest.xml`

    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

当您在写混淆代码时，请添加以下代码:

    -keep class io.agora.**{*;}


## Documentation

[声网API文档](https://docs.agora.io/cn/1.11.1/user_guide/API/ios_api_live_cn.html)

##### RtcEngine方法

| Property                         | Type                                     | Description                           |
| -------------------------------- | ---------------------------------------- | ------------------------------------- |
| init                             | object {appid: 'agora注册的应用id', channelProfile: '频道模式', videoProfile: '视频模式', clientRole: '角色'} | 初始化Agora引擎                            |
| joinChannel                      | string channelName （房间名称）   number uid （用户设置的uid 传0系统会自动分配） | 加入房间                                  |
| leaveChannel                     |                                          | 离开频道                                  |
| destroy                          |                                          | 销毁引擎实例                                |
| startPreview                     |                                          | 开启视频预览                                |
| stopPreview                      |                                          | 关闭视频预览                                |
| switchCamera                     |                                          | 切换前置/后置摄像头                            |
| enableVideo                      |                                          | 开启视频模式                                |
| disableVideo                     |                                          | 关闭视频                                  |
| setEnableSpeakerphone            | bool                                     | 开启扬声器  trun: 音频输出至扬声器  false: 音频输出至听筒 |
| muteLocalAudioStream             | bool (default false)                     | 将自己静音                                 |
| muteAllRemoteAudioStreams        | bool (default false)                     | 静音所有远端 音频                             |
| muteRemoteAudioStream            | number uid（用户uid） bool  mute（是否静音）       | 静音指定用户 音频                             |
| muteLocalVideoStream             | bool (default false)                     | 暂停发送本地 视频流                            |
| enableLocalVideo                 | bool (default false)                     | 禁用本地视频功能                              |
| muteAllRemoteVideoStreams        | bool (default false)                     | 暂停所有远端视频流                             |
| muteRemoteVideoStream            | number uid（用户uid） bool  mute（是否暂停）       | 暂停指定远端视频流                             |
| startRecordingService (ios only) | string  recordingKey                     | 启动服务端录制服务                             |
| stopRecordingService (ios only)  | string  recordingKey                     | 停止服务端录制服务                             |
| getSdkVersion                    | callback                                 | 获取版本号                                 |

##### 原生通知事件

```
RtcEngine.eventEmitter({
  onFirstRemoteVideoDecoded: data => {},
  onJoinChannelSuccess: data => {},
  onUserOffline: data => {},
  onUserJoined: data => {},
  onError: data => {},
  onWarning: data => {},
  onLeaveChannel: data => {}
})
```

| Name                      | Description  |
| ------------------------- | ------------ |
| onFirstRemoteVideoDecoded | 远端首帧视频接收解码回调 |
| onJoinChannelSuccess      | 加入频道成功的回调    |
| onUserOffline             | 其他用户离开当前频道   |
| onUserJoined              | 其他用户加入当前频道   |
| onError                   | 错误信息         |
| onWarning                 | 警告           |
| onLeaveChannel            | 退出频道         |

##### AgoraView 组件

| Name           | Description          |
| -------------- | -------------------- |
| showLocalVideo | 是否显示本地视频（bool）       |
| remoteUid      | 显示远程视频（number 传入uid） |

## Usage

```
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

import {RtcEngine, AgoraView} from 'react-native-agora'

export default class Meeting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remotes: [],
            isJoinSuccess: false,
            isSpeaker: false,
            isMute: false
        };
    }

    componentWillMount() {

        //初始化Agora
        const options = {
            appid: '前往Agora官网进行申请--https://www.agora.io/cn/',
            channelProfile: 1,
            videoProfile: 40,
            clientRole: 1,
        };
        RtcEngine.init(options);
    }

    componentDidMount() {

        //加入房间
        RtcEngine.joinChannel();

        //所以的原生通知统一管理
        RtcEngine.eventEmitter({
            onFirstRemoteVideoDecoded: (data) => {
                console.log(data);
                //有远程视频加入 返回重要的  uid  AgoraView 根据uid 来设置remoteUid值
                const {remotes} = this.state;

                let arr = [...remotes];
                let sign = false;
                arr.forEach(v => {
                    sign = v === data.uid
                });

                if (!sign) {
                    arr.push(data.uid)
                }

                this.setState({
                    remotes: arr
                })
            },
            onUserOffline: (data) => {
             	console.log(data);
              	//有人离开了！
                const {remotes} = this.state;

                let arr = [...remotes];

                let newArr = [];
                newArr = arr.filter(v => {
                    return v !== data.uid
                });

                this.setState({
                    remotes: newArr
                });
            },
            onJoinChannelSuccess: (data) => {
                console.log(data);
 			   //加入房间成功!
                this.setState({
                    isJoinSuccess: true
                });
            },
            onUserJoined: (data) => {
                console.log(data);
                //有人来了!
            },
            onError: (data) => {
                console.log(data);
                //错误!
                RtcEngine.leaveChannel();
            }
        })
    }

    componentWillUnmount() {
        RtcEngine.removeEmitter()
    }

    handlerCancel = () => {
        RtcEngine.leaveChannel();
    };

    handlerSwitchCamera = () => {
        RtcEngine.switchCamera();
    };

    handlerMuteAllRemoteAudioStreams = () => {
        this.setState({
            isMute: !this.state.isMute
        }, () => {
            RtcEngine.muteAllRemoteAudioStreams(this.state.isMute)
        })
    };

    handlerSetEnableSpeakerphone = () => {

        this.setState({
            isSpeaker: !this.state.isSpeaker
        }, () => {
            RtcEngine.setEnableSpeakerphone(this.state.isSpeaker)
        });

    };

    render() {

        const {isMute, isSpeaker, remotes, isJoinSuccess} = this.state;

        if (!isJoinSuccess) {
            return(
                <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
                    <Text>正在创建视频会议...</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <AgoraView style={styles.localView} showLocalVideo={true} />
                <View style={styles.absView}>
                    <View style={styles.videoView}>
                        {remotes.map((v, k) => {
                            return (
                                <AgoraView
                                    style={styles.remoteView}
                                    key={k}
                                    remoteUid={v}
                                />
                            )
                        })}
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{alignSelf: 'center'}}
                            onPress={this.handlerCancel}>
                            <Image
                                style={{width: 60, height: 60}}
                                source={require('../images/btn_endcall.png')}/>
                        </TouchableOpacity>
                        <View style={styles.bottomView}>
                            <TouchableOpacity onPress={this.handlerMuteAllRemoteAudioStreams} activeOpacity={.7}>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={ isMute ? require('../images/icon_muted.png') : require('../images/btn_mute.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.handlerSwitchCamera} activeOpacity={.7}>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={ require('../images/btn_switch_camera.png')}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.handlerSetEnableSpeakerphone} activeOpacity={.7}>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={isSpeaker ? require('../images/icon_speaker.png') : require('../images/btn_speaker.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    absView: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between'
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
```
