/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput,
  PermissionsAndroid
} from 'react-native';
import AgoraRTCView from './components/agora';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 44,
    paddingHorizontal:20,
    backgroundColor:'#6A71DD',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 10
  }
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showLive: false,
      error: undefined,
      channelProfile: 1,
      videoProfile: 40,
      clientRole: 1,
      uid: 0,
      swapWidthAndHeight: true,
      channelName: null
    };
  }

  joinChannel = () => {
    this.setState({
      showLive: true
    })
  }

  onCancel = (error) => {
    this.setState({
      showLive: false,
      error: JSON.stringify(error)
    })
  }

  async requestCameraAndAudioAndroidPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillMount () {
    this.requestCameraAndAudioAndroidPermission().then(_ => {});
  }

  render() {
    if (this.state.showLive) {
      console.log('channelName', this.state.channelName);
      return (<AgoraRTCView
        channelProfile={this.state.channelProfile}
        channelName={this.state.channelName}
        videoProfile={this.state.videoProfile}
        clientRole={this.state.clientRole}
        uid={this.state.uid}
        onCancel={this.onCancel}
      ></AgoraRTCView>);
    }
    return (
      <View style={styles.container}>
        {this.state.error ? <Text>Error Message: {this.state.error}</Text> : null}
        <TextInput
          style={{height: 40}}
          keyboardType='numeric'
          placeholder="Enter channelProfile (numeric)"
          onChangeText={(text) => {
            let matched = text.match(/\d+/g) && text.match(/\d+/g)[0]
            if (matched) {
              this.setState({channelProfile: +matched})
            }
          }
        } />
        <TextInput
          style={{height: 40}}
          keyboardType='numeric'
          placeholder="Enter videoProfile (numeric)"
          onChangeText={(text) => {
            let matched = text.match(/\d+/g) && text.match(/\d+/g)[0]
            if (matched) {
              this.setState({videoProfile: +matched})
            }          }
        } />
        <TextInput
          style={{height: 40}}
          keyboardType='numeric'
          placeholder="Enter clientRole (numeric)"
          onChangeText={(text) => {
            let matched = text.match(/\d+/g) && text.match(/\d+/g)[0]
            if (matched) {
              this.setState({clientRole: +matched})
            }
          }
        } />
        <TextInput
          style={{height: 40}}
          placeholder="Enter channelName"
          onChangeText={
            (text) => {
              this.setState({channelName: text}) 
            }
          }
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter uid"
          onChangeText={
            (uid) => {
              this.setState({uid: +uid}) 
            }
          }
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.joinChannel}
        >
          <Text style={{color: "#fff"}}>join room</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
